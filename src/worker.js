// ADMed Specialist Clinic: Cloudflare Worker.
// Serves the static site (public/) and one small API, /api/health-news (also reachable as
// /api/who-news), which returns the latest health headlines from a few public news feeds:
// the World Health Organization, allAfrica (Health and Medicine) and Graphic Online (Ghana health).
// Only headline, link, source and time are passed on. The feeds are read on the server and cached,
// so visitors' browsers never contact them and no keys are needed.
//
// To add or remove a source, edit SOURCES below: a name, the feed address, the web domains its
// links may point to, and an optional filter for headlines to skip.

const SOURCES = [
  { name: "WHO", url: "https://www.who.int/rss-feeds/news-english.xml", hosts: ["who.int"], max: 10 },
  { name: "allAfrica", url: "https://allafrica.com/tools/headlines/rdf/health/headlines.rdf", hosts: ["allafrica.com"], max: 25,
    skip: (t) => /^Africa: All of Africa Today/i.test(t) },
  { name: "Graphic Online", url: "https://www.graphic.com.gh/news/health.feed?type=rss", hosts: ["graphic.com.gh"], max: 15 }
];
const FRESH_SECONDS = 20 * 60;          // refresh from the sources at most every 20 minutes
const STALE_SECONDS = 7 * 24 * 60 * 60; // keep a copy to fall back on if the sources are unreachable
const MAX_ITEMS = 40;

const MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };

function decode(s) {
  return String(s || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&")
    .replace(/\s+/g, " ").trim();
}

function tag(block, name) {
  const m = new RegExp("<" + name + "(?:\\s[^>]*)?>([\\s\\S]*?)</" + name + ">", "i").exec(block);
  return m ? decode(m[1]) : "";
}

// "Wed, 25 Feb 2026 18:06:55 Z" -> "2026-02-25"
function isoDate(s) {
  const m = /(\d{1,2})\s+([A-Za-z]{3})[a-z]*\s+(\d{4})/.exec(s || "");
  if (!m) return "";
  const mon = MONTHS[m[2].toLowerCase()];
  if (!mon) return "";
  return m[3] + "-" + String(mon).padStart(2, "0") + "-" + String(parseInt(m[1], 10)).padStart(2, "0");
}

// Full publication time as an ISO string ("" if it cannot be read)
function isoTime(s) {
  const t = Date.parse(String(s || "").replace(/\s+Z$/i, " GMT"));
  return isNaN(t) ? "" : new Date(t).toISOString();
}

function safeLink(link, hosts) {
  try {
    const u = new URL(link);
    if (u.protocol !== "https:") return "";
    const ok = hosts.some((h) => u.hostname === h || u.hostname.endsWith("." + h));
    return ok ? u.toString() : "";
  } catch (e) { return ""; }
}

export function parseFeed(xml, source) {
  const src = source || { name: "WHO", hosts: ["who.int"], max: 10 };
  const items = [];
  const parts = String(xml || "").split(/<item[\s>]/i).slice(1);
  for (const part of parts) {
    const title = tag(part, "title");
    const link = safeLink(tag(part, "link"), src.hosts);
    if (!title || !link) continue;
    if (src.skip && src.skip(title)) continue;
    const pub = tag(part, "pubDate");
    items.push({ title, link, source: src.name, date: isoDate(pub), published: isoTime(pub) });
    if (items.length >= (src.max || 10)) break;
  }
  return items;
}

async function readSource(src) {
  const res = await fetch(src.url, { headers: { "user-agent": "ADMedSpecialistClinicWebsite/1.0", accept: "application/rss+xml, application/xml, text/xml" } });
  if (!res.ok) throw new Error(src.name + " feed " + res.status);
  return parseFeed(await res.text(), src);
}

function json(body, seconds) {
  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=300, s-maxage=" + seconds,
      "x-content-type-options": "nosniff"
    }
  });
}

async function healthNews(ctx) {
  const cache = caches.default;
  const freshKey = new Request("https://cache.admed.internal/v3/health-news");
  const staleKey = new Request("https://cache.admed.internal/v3/health-news-stale");

  const hit = await cache.match(freshKey);
  if (hit) return hit;

  const results = await Promise.allSettled(SOURCES.map(readSource));
  const seen = new Set();
  const items = [];
  for (const r of results) {
    if (r.status !== "fulfilled") continue;
    for (const it of r.value) {
      if (seen.has(it.link)) continue;
      seen.add(it.link);
      items.push(it);
    }
  }
  items.sort((a, b) => (b.published || "").localeCompare(a.published || ""));

  if (items.length) {
    const body = { items: items.slice(0, MAX_ITEMS), fetchedAt: new Date().toISOString() };
    const fresh = json(body, FRESH_SECONDS);
    ctx.waitUntil(cache.put(freshKey, fresh.clone()));
    ctx.waitUntil(cache.put(staleKey, json(body, STALE_SECONDS)));
    return fresh;
  }
  const stale = await cache.match(staleKey);
  if (stale) return stale;
  return json({ items: [] }, 300);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/health-news" || url.pathname === "/api/who-news") {
      if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405 });
      return healthNews(ctx);
    }
    return env.ASSETS.fetch(request);
  }
};
