// ADMed Specialist Clinic: Cloudflare Worker.
// Serves the static site (public/) and one small API, /api/who-news, which returns the latest
// headlines from the World Health Organization's public news feed. The feed is read on the server
// and cached, so visitors' browsers never contact WHO and no keys are needed.

const FEED = "https://www.who.int/rss-feeds/news-english.xml";
const FRESH_SECONDS = 3 * 60 * 60;      // refresh from WHO at most every 3 hours
const STALE_SECONDS = 7 * 24 * 60 * 60; // keep a copy to fall back on if WHO is unreachable
const MAX_ITEMS = 10;

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

function safeWhoLink(link) {
  try {
    const u = new URL(link);
    if (u.protocol !== "https:") return "";
    if (u.hostname !== "who.int" && !u.hostname.endsWith(".who.int")) return "";
    return u.toString();
  } catch (e) { return ""; }
}

export function parseFeed(xml) {
  const items = [];
  const parts = String(xml || "").split(/<item[\s>]/i).slice(1);
  for (const part of parts) {
    const title = tag(part, "title");
    const link = safeWhoLink(tag(part, "link"));
    if (!title || !link) continue;
    const pub = tag(part, "pubDate");
    items.push({ title, link, date: isoDate(pub), published: isoTime(pub) });
    if (items.length >= MAX_ITEMS) break;
  }
  return items;
}

function json(body, seconds) {
  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=900, s-maxage=" + seconds,
      "x-content-type-options": "nosniff"
    }
  });
}

async function whoNews(ctx) {
  const cache = caches.default;
  const freshKey = new Request("https://cache.admed.internal/v2/who-news");
  const staleKey = new Request("https://cache.admed.internal/v2/who-news-stale");

  const hit = await cache.match(freshKey);
  if (hit) return hit;

  try {
    const res = await fetch(FEED, { headers: { "user-agent": "ADMedSpecialistClinicWebsite/1.0", accept: "application/rss+xml, application/xml" } });
    if (!res.ok) throw new Error("WHO feed " + res.status);
    const items = parseFeed(await res.text());
    if (!items.length) throw new Error("WHO feed had no items");
    const body = { source: "World Health Organization", items, fetchedAt: new Date().toISOString() };
    const fresh = json(body, FRESH_SECONDS);
    ctx.waitUntil(cache.put(freshKey, fresh.clone()));
    ctx.waitUntil(cache.put(staleKey, json(body, STALE_SECONDS)));
    return fresh;
  } catch (e) {
    const stale = await cache.match(staleKey);
    if (stale) return stale;
    return json({ source: "World Health Organization", items: [] }, 300);
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/who-news") {
      if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405 });
      return whoNews(ctx);
    }
    return env.ASSETS.fetch(request);
  }
};
