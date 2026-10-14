(function () {
  "use strict";
  var C = window.ADMED || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var digits = function (v) { return String(v || "").replace(/[^\d+]/g, ""); };
  var esc = function (v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  document.documentElement.classList.remove("no-js");
  var base = document.body.getAttribute("data-base") || "";   // "../index.html" on service pages

  /* ---------- Contact details: bind, link and hide anything empty ---------- */
  var hours = Array.isArray(C.hours) ? C.hours : [];
  var has = {
    phone: !!C.phone, phone2: !!(C.phone2 && C.phone2.number), whatsapp: !!C.whatsapp, email: !!C.email,
    address: !!C.address, hours: hours.length > 0, maps: !!C.mapsUrl,
    announcement: !!C.announcement, rating: !!(C.googleRating && C.googleRating.score)
  };
  var hrefs = {
    tel: C.phone ? "tel:" + digits(C.phone) : "",
    tel2: C.phone2 && C.phone2.number ? "tel:" + digits(C.phone2.number) : "",
    mail: C.email ? "mailto:" + C.email : "",
    maps: C.mapsUrl || "",
    wa: C.whatsapp ? "https://wa.me/" + digits(C.whatsapp).replace("+", "") : ""
  };

  $$("[data-need]").forEach(function (el) {
    if (!has[el.getAttribute("data-need")]) el.hidden = true;
  });
  $$("[data-show-without]").forEach(function (el) {
    if (has[el.getAttribute("data-show-without")]) el.hidden = true;
  });
  $$("[data-href]").forEach(function (el) {
    var h = hrefs[el.getAttribute("data-href")];
    if (h) {
      var subj = el.getAttribute("data-subject");
      if (subj && el.getAttribute("data-href") === "mail") h += "?subject=" + encodeURIComponent(subj);
      el.setAttribute("href", h);
    }
    else if (!el.hasAttribute("href")) { el.hidden = true; }
  });
  $$("[data-bind]").forEach(function (el) {
    var k = el.getAttribute("data-bind");
    if (k === "hoursShort") {
      if (hours[0]) el.textContent = hours[0].days + ": " + hours[0].time;
    } else if (k === "hoursList") {
      el.className = "hours";
      el.innerHTML = hours.map(function (h) {
        return "<span><span>" + esc(h.days) + "</span><b>" + esc(h.time) + "</b></span>";
      }).join("");
    } else if (k === "phone2") {
      el.textContent = C.phone2 ? C.phone2.number : "";
    } else if (k === "phone2Label") {
      el.textContent = C.phone2 ? C.phone2.label : "";
    } else if (k === "ratingScore") {
      el.textContent = C.googleRating ? C.googleRating.score : "";
    } else if (k === "ratingCount") {
      el.textContent = C.googleRating ? C.googleRating.count : "";
    } else if (C[k]) {
      el.textContent = C[k];
    }
  });

  // Social icons
  var socialIcons = { facebook: "i-facebook", instagram: "i-instagram", x: "i-x", youtube: "i-youtube", tiktok: "i-tiktok" };
  var socialHtml = Object.keys(socialIcons).filter(function (k) { return C.social && C.social[k]; }).map(function (k) {
    return '<a href="' + esc(C.social[k]) + '" target="_blank" rel="noopener" aria-label="' + k + '"><svg class="ic"><use href="#' + socialIcons[k] + '"/></svg></a>';
  }).join("");
  $$("[data-social]").forEach(function (el) { el.innerHTML = socialHtml; if (!socialHtml) el.hidden = true; });

  // Map embed (optional)
  /* ---------- Cookie notice and consent ---------- */
  var CONSENT_KEY = "admed-consent";
  var getConsent = function () { try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; } };
  var setConsent = function (v) { try { localStorage.setItem(CONSENT_KEY, v); } catch (e) {} };
  var cookiePage = (base ? base.replace("index.html", "") : "") + "cookies.html";
  function loadMap() {
    if (!C.mapEmbedUrl || !$("#mapFrame")) return;
    var f = $("#mapFrame");
    if (!f.src) f.src = C.mapEmbedUrl;
    f.hidden = false; $("#mapFallback").hidden = true;
  }
  function applyConsent() {
    if (getConsent() === "all") loadMap();
    else if ($("#mapFrame")) { $("#mapFrame").hidden = true; $("#mapFallback").hidden = false; }
  }
  var banner = null;
  function closeBanner() { if (banner) { banner.remove(); banner = null; } }
  function openBanner() {
    if (banner) return;
    banner = document.createElement("div");
    banner.className = "cookie-banner"; banner.setAttribute("role", "dialog"); banner.setAttribute("aria-label", "Cookie notice");
    banner.innerHTML = '<p><strong>Cookies and third-party content.</strong> We remember your day or night choice on this device. Google Maps and Google Fonts are provided by Google, which may set cookies. Accept to show the map on this page. <a href="' + cookiePage + '">Read our Cookie Policy</a>.</p>' +
      '<div class="cookie-banner__btns"><button type="button" class="btn btn--outline btn--sm" data-consent="essential">Necessary only</button><button type="button" class="btn btn--primary btn--sm" data-consent="all">Accept</button></div>';
    document.body.appendChild(banner);
    $$("button[data-consent]", banner).forEach(function (b) {
      b.addEventListener("click", function () { setConsent(b.getAttribute("data-consent")); closeBanner(); applyConsent(); });
    });
  }
  applyConsent();
  if (!getConsent()) openBanner();
  $$("[data-cookie-settings]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); openBanner(); }); });
  $$("[data-show-map]").forEach(function (b) { b.addEventListener("click", function () { setConsent("all"); closeBanner(); applyConsent(); }); });

  /* ---------- Photos: only shown when they actually load ---------- */
  function tryImage(src, ok) {
    if (!src) return;
    var i = new Image();
    i.onload = function () { ok(src); };
    i.src = src;
  }
  var P = C.photos || {};
  if ($("#heroBg")) tryImage(P.hero, function (s) { $("#heroBg").style.backgroundImage = "url('" + s + "')"; });
  if ($("#aboutImg")) tryImage(P.about, function (s) {
    var a = $("#aboutImg"); a.style.backgroundImage = "url('" + s + "')"; a.classList.add("has-photo");
  });
  // Photo tiles in the Specialties section
  $$("[data-photo]").forEach(function (tile) {
    var src = (P.services || {})[tile.getAttribute("data-photo")];
    tryImage(src, function (s) { tile.style.backgroundImage = "url('" + s + "')"; tile.classList.add("has-photo"); });
  });
  var gal = $("#galleryGrid"), shown = 0;
  (gal ? (P.gallery || []) : []).forEach(function (item, n) {
    var src = typeof item === "string" ? item : item.src;
    var alt = (item && item.alt) || "ADMed Specialist Clinic photo " + (n + 1);
    tryImage(src, function () {
      var a = document.createElement("a");
      a.href = src; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("aria-label", "View photo: " + alt);
      a.style.order = n;
      a.innerHTML = '<img loading="lazy" alt="' + esc(alt) + '" src="' + esc(src) + '">';
      gal.appendChild(a); shown++;
      $("#gallery").hidden = false; observe(a);
    });
  });

  var fa = $("#founderAvatar");
  if (fa && C.founderPhoto) tryImage(C.founderPhoto, function (s) { fa.style.backgroundImage = "url('" + s + "')"; fa.classList.add("has-photo"); });

  /* ---------- Doctors & reviews (render only if provided) ---------- */
  var docs = Array.isArray(C.doctors) ? C.doctors : [];
  var navHide = function (sec) { $$('[data-need-section="' + sec + '"]').forEach(function (a) { a.hidden = true; }); };
  if (docs.length && $("#doctors")) {
    $("#doctors").hidden = false;
    var initials = function (n) {
      var w = String(n || "").replace(/^(dr|prof|mr|mrs|ms)\.?\s+/i, "").split(/\s+/).filter(Boolean);
      return w.length ? (w[0][0] + (w.length > 1 ? w[w.length - 1][0] : "")).toUpperCase() : "";
    };
    $("#teamGrid").innerHTML = docs.map(function (d) {
      var photo = d.photo
        ? '<div class="doc__photo" style="background-image:url(\'' + esc(d.photo) + '\')" role="img" aria-label="' + esc(d.name) + '"></div>'
        : '<div class="doc__photo doc__photo--initials" aria-hidden="true">' + esc(initials(d.name)) + "</div>";
      return '<article class="doc">' + photo + "<h3>" + esc(d.name) + '</h3><p class="doc__role">' + esc(d.role) + "</p>" +
        (d.detail ? '<p class="doc__detail">' + esc(d.detail) + "</p>" : "") +
        (d.bio ? '<p class="doc__bio">' + esc(d.bio) + "</p>" : "") +
        '<a class="btn btn--outline btn--sm" href="#book">Book a Consultation</a></article>';
    }).join("");
  } else if (!docs.length) navHide("doctors");

  var revs = Array.isArray(C.reviews) ? C.reviews : [];
  if (revs.length && $("#reviews")) {
    $("#reviews").hidden = false;
    $("#reviewGrid").innerHTML = revs.map(function (r) {
      var n = Math.max(1, Math.min(5, Math.round(r.rating || 5))), stars = "";
      for (var i = 0; i < n; i++) stars += '<svg class="ic"><use href="#i-star"/></svg>';
      return '<figure class="rev"><div class="rev__stars" role="img" aria-label="' + n + ' out of 5 stars">' + stars + "</div><blockquote>“" + esc(r.text) + "”</blockquote><figcaption>" + esc(r.name) + " · Google review</figcaption></figure>";
    }).join("");
  } else if (!revs.length) navHide("reviews");

  /* ---------- Specialty selects & footer list from the cards ---------- */
  var specs = $$("[data-specialty]").map(function (e) { return e.getAttribute("data-specialty").replace(/&amp;/g, "&"); });
  $$("[data-specialty-select]").forEach(function (sel) {
    sel.innerHTML = '<option value="">Select a service</option>' +
      specs.map(function (s) { return "<option>" + esc(s) + "</option>"; }).join("") +
      "<option>Not sure</option>";
  });
  if (specs.length && $("#footerSpecs")) $("#footerSpecs").innerHTML = specs.map(function (s) {
    return '<li><a href="#services">' + esc(s) + "</a></li>";
  }).join("");
  var media = [];
  if (revs.length) media.push('<li><a href="' + base + '#reviews">Patient reviews</a></li>');
  Object.keys(C.social || {}).forEach(function (k) {
    if (C.social[k]) media.push('<li><a href="' + esc(C.social[k]) + '" target="_blank" rel="noopener">' + k.charAt(0).toUpperCase() + k.slice(1) + "</a></li>");
  });
  if (hrefs.maps) media.push('<li><a href="' + esc(hrefs.maps) + '" target="_blank" rel="noopener">Google Maps</a></li>');
  if ($("#footerMedia")) $("#footerMedia").innerHTML = media.join("");

  // Arriving from a service page: pre-select that service in the booking form
  try {
    var wanted = new URLSearchParams(window.location.search).get("service");
    if (wanted) $$("[data-specialty-select]").forEach(function (sel) {
      Array.prototype.some.call(sel.options, function (o) { if (o.text === wanted) { sel.value = o.value || o.text; return true; } });
    });
  } catch (e) {}

  // Clicking a specialty card pre-selects it in the booking form
  $$("[data-specialty]").forEach(function (card) {
    card.addEventListener("click", function () {
      var v = card.getAttribute("data-specialty").replace(/&amp;/g, "&");
      $$("[data-specialty-select]").forEach(function (sel) { sel.value = v; });
    });
  });

  /* ---------- Hero search: jump to the matching service ---------- */
  var keywords = {
    "Cardiac": ["cardiac", "heart", "chest", "blood pressure", "palpitation", "cardiology"],
    "Nephrology": ["nephrology", "kidney", "renal", "urine test"],
    "Dialysis Treatment": ["dialysis", "dialyse", "haemodialysis", "hemodialysis", "kidney failure", "renal failure", "fistula", "graft", "catheter", "venous"],
    "Orthopaedic": ["orthopedic", "orthopaedic", "bone", "joint", "fracture", "knee", "back pain", "spine", "muscle"],
    "Gynaecology": ["gynecolog", "gynaecolog", "women", "pregnan", "antenatal", "period", "pap", "uterus"],
    "Haematology": ["hematolog", "haematolog", "blood", "anemia", "anaemia", "sickle", "clot"],
    "Urology": ["urolog", "urinary", "bladder", "prostate", "urine", "stone"],
    "Internal Medicine": ["internal", "medicine", "diabet", "fever", "general", "check-up", "checkup", "hypertension", "malaria"],
    "Physician Specialist": ["physician", "specialist", "consultant", "second opinion"],
    "Medical Laboratory": ["laborator", "lab", "test", "scan", "sample", "culture", "screening"]
  };
  var sList = $("#searchList");
  if (sList) sList.innerHTML = specs.map(function (s) { return '<option value="' + esc(s) + '">'; }).join("");
  var sForm = $("#heroSearch");
  if (sForm) sForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var q = $("#searchInput").value.trim().toLowerCase(), hit = "";
    if (q) {
      specs.forEach(function (s) { if (!hit && s.toLowerCase().indexOf(q) > -1) hit = s; });
      Object.keys(keywords).forEach(function (s) {
        if (!hit && keywords[s].some(function (k) { return q.indexOf(k) > -1 || k.indexOf(q) > -1 && q.length > 2; })) hit = s;
      });
    }
    var target;
    if (hit) {
      $$("[data-specialty-select]").forEach(function (sel) { sel.value = hit; });
      target = $("#book");
    } else target = $("#services");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ---------- Services: live search and sort ---------- */
  var tilesEl = $$(".tile"), svcInput = $("#svcInput"), sortMode = "default", svcQuery = "";
  var tileInfo = tilesEl.map(function (t, i) {
    var name = $("h3", t).textContent.trim();
    return { el: t, i: i, name: name, text: (name + " " + $("p", t).textContent + " " + (t.getAttribute("data-specialty") || "")).toLowerCase() };
  });
  function tileMatches(info, q) {
    if (!q) return true;
    if (info.text.indexOf(q) > -1) return true;
    var key = info.el.getAttribute("data-specialty") || "";
    return (keywords[key] || []).some(function (k) { return k.indexOf(q) > -1 || (q.length > 2 && q.indexOf(k) > -1); });
  }
  function renderTiles() {
    var list = tileInfo.slice();
    if (sortMode === "az") list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    if (sortMode === "za") list.sort(function (a, b) { return b.name.localeCompare(a.name); });
    var shown = 0;
    list.forEach(function (info, pos) {
      info.el.style.order = pos;
      var ok = tileMatches(info, svcQuery);
      info.el.hidden = !ok;
      info.el.classList.remove("tile--down");
      if (ok) { if (shown % 2 === 1) info.el.classList.add("tile--down"); shown++; }
    });
    var empty = $("#svcEmpty");
    if (empty) {
      empty.hidden = shown > 0;
      if (!shown) empty.innerHTML = "No service found for “" + esc(svcInput.value.trim()) + "”. " +
        (hrefs.tel ? 'Call <a href="' + esc(hrefs.tel) + '">' + esc(C.phone) + "</a> and we will direct you to the right specialist." : "Please contact the clinic and we will direct you to the right specialist.");
    }
  }
  if (svcInput) svcInput.addEventListener("input", function () { svcQuery = svcInput.value.trim().toLowerCase(); renderTiles(); });
  var sBtn = $("#sortBtn"), sMenu = $("#sortMenu");
  if (sBtn && sMenu) {
    var setSort = function (open) { sMenu.classList.toggle("open", open); sBtn.setAttribute("aria-expanded", open); };
    sBtn.addEventListener("click", function (e) { e.stopPropagation(); setSort(!sMenu.classList.contains("open")); });
    $$("button[data-sort]", sMenu).forEach(function (b) {
      b.addEventListener("click", function () {
        sortMode = b.getAttribute("data-sort");
        $$("button[data-sort]", sMenu).forEach(function (x) { x.classList.toggle("on", x === b); });
        setSort(false); renderTiles();
      });
    });
    document.addEventListener("click", function (e) { if (!sMenu.contains(e.target)) setSort(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setSort(false); });
  }
  renderTiles();

  /* ---------- Patient Information dropdown ---------- */
  var hm = $(".has-menu"), hb = $("#infoBtn");
  if (hm && hb) {
    var setMenu = function (open) { hm.classList.toggle("open", open); hb.setAttribute("aria-expanded", open); };
    hb.addEventListener("click", function (e) {
      e.stopPropagation();
      var desk = window.matchMedia("(min-width:901px)").matches;
      setMenu(desk ? true : !hm.classList.contains("open"));
    });
    var closeTimer = null, desktop = function () { return window.matchMedia("(min-width:901px)").matches; };
    hm.addEventListener("mouseenter", function () { if (desktop()) { clearTimeout(closeTimer); setMenu(true); } });
    hm.addEventListener("mouseleave", function () { if (desktop()) { clearTimeout(closeTimer); closeTimer = setTimeout(function () { setMenu(false); }, 250); } });
    document.addEventListener("click", function (e) { if (!hm.contains(e.target)) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    $$(".menu a", hm).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  }

  /* ---------- Reviews slider arrows ---------- */
  var track = $("#reviewGrid"), prev = $("#revPrev"), next = $("#revNext");
  if (track && prev && next) {
    var step = function () { var c = track.firstElementChild; return c ? c.getBoundingClientRect().width + 22 : 300; };
    var sync = function () {
      var arrows = prev.parentNode; arrows.hidden = track.scrollWidth <= track.clientWidth + 4;
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      prev.classList.toggle("arrow--on", !prev.disabled); next.classList.toggle("arrow--on", !next.disabled);
    };
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    track.addEventListener("scroll", sync, { passive: true }); window.addEventListener("resize", sync); sync();
  }

  /* ---------- News, Updates & Health Insights (render only if provided) ---------- */
  var TYPES = { clinic: "Clinic Updates", insight: "Health Insights", local: "Local Health News" };
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function niceDate(d) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(d || ""));
    return m ? parseInt(m[3], 10) + " " + MONTHS[parseInt(m[2], 10) - 1] + " " + m[1] : String(d || "");
  }
  var newsAll = (Array.isArray(C.news) ? C.news : []).filter(function (n) { return n && n.title; }).map(function (n, i) {
    n._i = i;
    n._type = TYPES[n.type] ? n.type : "clinic";
    return n;
  });
  // Newest dated first; undated entries keep their written order after the dated ones
  newsAll.sort(function (a, b) {
    if (a.date && b.date) return a.date < b.date ? 1 : a.date > b.date ? -1 : a._i - b._i;
    if (a.date) return -1;
    if (b.date) return 1;
    return a._i - b._i;
  });
  if (newsAll.length && $("#updates")) {
    $("#updates").hidden = false;
    var linkOf = function (n) {
      if (n._type === "insight" && n.id) return { href: "insight.html?id=" + encodeURIComponent(n.id), ext: false, label: "Read the full article" };
      if (n.link) return { href: n.link, ext: true, label: n._type === "local" && n.source ? "Read at " + n.source : "Learn more" };
      if (n.image) return { href: n.image, ext: true, label: "View full size" };
      return null;
    };
    var aAttr = function (l) { return ' href="' + esc(l.href) + '"' + (l.ext ? ' target="_blank" rel="noopener"' : ""); };
    var arrow = ' <span aria-hidden="true">&rarr;</span>';
    var when = function (n) { return n.date ? "<time>" + esc(niceDate(n.date)) + "</time>" : ""; };
    var renderers = {
      insight: function (list, shown) {
        var first = list[0], rest = list.slice(1, shown);
        var fl = linkOf(first);
        var feat = '<article class="nx__feature">' + when(first) + "<h4>" + esc(first.title) + "</h4>" +
          (first.summary ? "<p>" + esc(first.summary) + "</p>" : "") +
          (fl ? '<a class="news__more"' + aAttr(fl) + ">" + esc(fl.label) + arrow + "</a>" : "") + "</article>";
        var side = rest.map(function (n) {
          var l = linkOf(n);
          return '<li class="nx__item">' + when(n) + "<h4>" + (l ? "<a" + aAttr(l) + ">" + esc(n.title) + "</a>" : esc(n.title)) + "</h4>" +
            (n.summary ? "<p>" + esc(n.summary) + "</p>" : "") + "</li>";
        }).join("");
        return feat + (side ? '<ul class="nx__side">' + side + "</ul>" : "");
      },
      clinic: function (list, shown) {
        return list.slice(0, shown).map(function (n) {
          var l = linkOf(n);
          var img = n.image ? '<img loading="lazy" src="' + esc(n.image) + '" alt="' + esc(n.title) + '">' : "";
          if (img && l) img = "<a" + aAttr(l) + ' tabindex="-1" aria-hidden="true">' + img + "</a>";
          return '<article class="news__item">' + img + '<div class="news__body">' + when(n) + "<h4>" + esc(n.title) + "</h4>" +
            (n.summary ? "<p>" + esc(n.summary) + "</p>" : "") +
            (l ? '<a class="news__more"' + aAttr(l) + ">" + esc(l.label) + arrow + "</a>" : "") + "</div></article>";
        }).join("");
      },
      local: function (list, shown) {
        return list.slice(0, shown).map(function (n) {
          var l = linkOf(n);
          return '<li class="nx__row"><div class="nx__when">' + (n.date ? esc(niceDate(n.date)) : "") + '</div><div><h4>' + esc(n.title) + "</h4>" +
            (n.summary ? "<p>" + esc(n.summary) + "</p>" : "") +
            (l ? '<a class="news__more"' + aAttr(l) + ">" + esc(l.label) + arrow + "</a>" : "") + "</div></li>";
        }).join("");
      }
    };
    var ids = { insight: ["#nxInsight", "#nxInsightBody"], clinic: ["#nxClinic", "#nxClinicBody"], local: ["#nxLocal", "#nxLocalBody"] };
    var step = { insight: 4, clinic: 3, local: 5 }, shownOf = { insight: 4, clinic: 3, local: 5 };
    var drawGroup = function (t) {
      var list = newsAll.filter(function (n) { return n._type === t; });
      var box = $(ids[t][0]);
      if (!box) return;
      box.hidden = !list.length;
      if (!list.length) return;
      $(ids[t][1]).innerHTML = renderers[t](list, shownOf[t]);
      var more = $(".nx__more", box);
      if (more) more.hidden = list.length <= shownOf[t];
    };
    Object.keys(ids).forEach(drawGroup);
    $$("[data-more]").forEach(function (b) {
      b.addEventListener("click", function () {
        var t = b.getAttribute("data-more"); shownOf[t] += step[t]; drawGroup(t);
      });
    });
  } else if (!newsAll.length) navHide("updates");

  /* ---------- Live health news: ticker under the banner + list in the news section ---------- */
  if (C.whoNews !== false && (location.protocol === "https:" || location.protocol === "http:") && ($("#whoTicker") || $("#nxWho"))) {
    fetch("/api/health-news", { headers: { accept: "application/json" } }).then(function (r) { return r.ok ? r.json() : null; }).then(function (data) {
      var items = data && Array.isArray(data.items) ? data.items.filter(function (n) {
        return n && n.title && /^https:\/\//i.test(n.link || "");
      }) : [];
      if (!items.length) return;

      var now = Date.now();
      var ageH = function (n) {
        var t = Date.parse(n.published || "");
        return isNaN(t) ? null : (now - t) / 3600000;
      };
      var isNew = function (n) { var h = ageH(n); return h !== null && h >= -1 && h <= 24; };
      var ago = function (n) {
        var h = ageH(n);
        if (h === null) return "";
        if (h < 1) return "Just now";
        return Math.floor(h) + "h ago";
      };

      // Ticker: only headlines published within the last whoTickerHours (24 by default)
      var tk = $("#whoTicker");
      var limit = Number(C.whoTickerHours) > 0 ? Number(C.whoTickerHours) : 24;
      var fresh = items.filter(function (n) { var h = ageH(n); return h !== null && h >= -1 && h <= limit; });
      if (tk && fresh.length) {
        var one = fresh.slice(0, 10).map(function (n) {
          return '<a href="' + esc(n.link) + '" target="_blank" rel="noopener"><time>' + esc(ago(n)) + "</time> " + esc(n.title) + (n.source ? ' <span class="ticker__src">' + esc(n.source) + "</span>" : "") + "</a>";
        }).join("");
        var run = $("#whoRun");
        run.innerHTML = one + '<span class="ticker__dup" aria-hidden="true">' + one.replace(/<a /g, '<a tabindex="-1" ') + "</span>";
        run.style.animationDuration = Math.max(40, Math.min(fresh.length, 10) * 12) + "s";
        tk.hidden = false;
        var pb = $("#whoPause");
        if (pb) pb.addEventListener("click", function () {
          var on = tk.classList.toggle("paused");
          pb.setAttribute("aria-pressed", on);
          pb.setAttribute("aria-label", on ? "Play the news ticker" : "Pause the news ticker");
          pb.innerHTML = '<svg class="ic"><use href="#' + (on ? "i-arrow" : "i-pause") + '"/></svg>';
        });
      }

      var box = $("#nxWho");
      if (box) {
        var shown = 5;
        var draw = function () {
          $("#nxWhoBody").innerHTML = items.slice(0, shown).map(function (n) {
            return '<li class="nx__row"><div class="nx__when">' + (n.date ? esc(niceDate(n.date)) : "") + "</div><div><h4>" + (isNew(n) ? '<span class="tag tag--new">New</span> ' : "") + esc(n.title) +
              '</h4><a class="news__more" href="' + esc(n.link) + '" target="_blank" rel="noopener">' + (n.source ? "Read at " + esc(n.source) : "Read the story") + ' <span aria-hidden="true">&rarr;</span></a></div></li>';
          }).join("");
          var more = $(".nx__more", box); if (more) more.hidden = items.length <= shown;
        };
        draw();
        box.hidden = false;
        $("#updates").hidden = false;
        $$('[data-need-section="updates"]').forEach(function (a) { a.hidden = false; });
        var mb = $("[data-more=who]", box);
        if (mb) mb.addEventListener("click", function () { shown += 5; draw(); });
      }
    }).catch(function () { /* feed unavailable: the ticker and block simply stay hidden */ });
  }

  /* ---------- Health Insights article page ---------- */
  var art = $("#insightBody");
  if (art) {
    var wanted = new URLSearchParams(location.search).get("id");
    var item = newsAll.filter(function (n) { return n._type === "insight" && n.id === wanted && n.body; })[0];
    if (!item) {
      $("#insightTitle").textContent = "Article not found";
      art.innerHTML = '<p>We could not find that article. It may have been moved or removed.</p><p><a class="more-link" href="' + esc(base) + '#updates">See all news and health insights &rarr;</a></p>';
    } else {
      document.title = item.title + " | ADMed Specialist Clinic";
      $("#insightTitle").textContent = item.title;
      $("#insightCrumb").textContent = item.title;
      if (item.summary) $("#insightLead").textContent = item.summary; else $("#insightLead").hidden = true;
      if (item.date) $("#insightDate").textContent = niceDate(item.date); else $("#insightDate").hidden = true;
      var html = "", inList = false;
      item.body.forEach(function (t) {
        t = String(t);
        var li = t.indexOf("- ") === 0;
        if (inList && !li) { html += "</ul>"; inList = false; }
        if (li) { if (!inList) { html += '<ul class="dots">'; inList = true; } html += "<li>" + esc(t.slice(2)) + "</li>"; }
        else if (t.indexOf("## ") === 0) html += "<h2>" + esc(t.slice(3)) + "</h2>";
        else html += "<p>" + esc(t) + "</p>";
      });
      if (inList) html += "</ul>";
      if (item.service) html += '<p><a class="more-link" href="services/' + esc(item.service) + '.html">Learn more about this service &rarr;</a></p>';
      html += '<p class="small-print">This article gives general information and does not replace advice from a doctor. To discuss your own situation, please book a consultation.</p>';
      art.innerHTML = html;
    }
  }

  /* ---------- Careers page: vacancies list and application form ---------- */
  var vList = $("#vacancyList");
  if (vList) {
    var today = new Date().toISOString().slice(0, 10);
    var vacs = (Array.isArray(C.vacancies) ? C.vacancies : []).filter(function (v) { return v && v.title && (!v.deadline || v.deadline >= today); });
    if (vacs.length) {
      vList.innerHTML = vacs.map(function (v) {
        var meta = [v.department, v.type, v.deadline ? "Apply by " + niceDate(v.deadline) : ""].filter(Boolean).map(esc).join(" · ");
        return '<article class="vacancy"><h3>' + esc(v.title) + "</h3>" + (meta ? '<p class="vacancy__meta">' + meta + "</p>" : "") +
          (v.summary ? "<p>" + esc(v.summary) + "</p>" : "") +
          '<p><a class="btn btn--primary btn--sm" href="#apply" data-vacancy="' + esc(v.title) + '">Apply for this role</a>' +
          (v.link ? ' <a class="news__more" href="' + esc(v.link) + '" target="_blank" rel="noopener">Full advert <span aria-hidden="true">&rarr;</span></a>' : "") + "</p></article>";
      }).join("");
      var sel = $("#careerPosition");
      if (sel) vacs.slice().reverse().forEach(function (v) {
        var o = document.createElement("option"); o.textContent = v.title;
        sel.insertBefore(o, sel.options[1] || null);
      });
      $$("[data-vacancy]", vList).forEach(function (a) {
        a.addEventListener("click", function () { if (sel) sel.value = a.getAttribute("data-vacancy"); });
      });
    } else {
      vList.innerHTML = '<p class="vacancy vacancy--none"><strong>There are no published vacancies at the moment.</strong> You are welcome to send an expression of interest using the form below.</p>';
    }
  }

  $$("form[data-careers]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = $(".form-note", form);
      var set = function (msg, ok) { note.textContent = msg; note.className = "form-note " + (ok ? "ok" : "bad"); };
      var f = form.elements, bad = false;
      ["name", "email", "phone", "position"].forEach(function (k) {
        var empty = !f[k].value.trim();
        f[k].classList.toggle("err", empty); if (empty) bad = true;
      });
      if (bad) return set("Please fill in your name, email address, phone number and the position.", false);
      if (!/^\S+@\S+\.\S+$/.test(f.email.value.trim())) { f.email.classList.add("err"); return set("Please enter a valid email address.", false); }
      if (f.consent && !f.consent.checked) return set("Please tick the box to confirm before sending.", false);
      var cv = f.cv_link ? f.cv_link.value.trim() : "";
      if (cv && !/^https?:\/\//i.test(cv)) { f.cv_link.classList.add("err"); return set("The CV link should start with https://", false); }

      var lines = ["Job application: ADMed Specialist Clinic",
        "Position: " + f.position.value, "Name: " + f.name.value.trim(), "Email: " + f.email.value.trim(), "Phone: " + f.phone.value.trim()];
      if (f.registration.value.trim()) lines.push("Registration or licence number: " + f.registration.value.trim());
      if (cv) lines.push("CV and documents: " + cv);
      if (f.message.value.trim()) lines.push("Message: " + f.message.value.trim());

      if (C.formAccessKey) {
        if (f.botcheck && f.botcheck.checked) return;
        var btn = $('button[type="submit"]', form), label = btn.innerHTML;
        btn.disabled = true; btn.textContent = "Sending...";
        set("", true);
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: C.formAccessKey,
            subject: "Job application: " + f.position.value,
            from_name: "ADMed Specialist Clinic website",
            replyto: f.email.value.trim(),
            name: f.name.value.trim(), email: f.email.value.trim(), phone: f.phone.value.trim(),
            position: f.position.value,
            registration_number: f.registration.value.trim(),
            cv_link: cv,
            message: f.message.value.trim(),
            botcheck: false
          })
        }).then(function (r) { return r.json(); }).then(function (res) {
          if (!res.success) throw new Error(res.message || "failed");
          form.reset();
          set("Thank you. Your application has been sent. Only shortlisted candidates will be contacted.", true);
        }).catch(function () {
          note.className = "form-note bad";
          note.innerHTML = "Your application could not be sent. Please email " + (hrefs.mail ? '<a href="' + esc(hrefs.mail) + '"><strong>' + esc(C.email) + "</strong></a>" : "the clinic") + " instead.";
        }).then(function () { btn.disabled = false; btn.innerHTML = label; });
      } else if (hrefs.mail) {
        window.location.href = hrefs.mail + "?subject=" + encodeURIComponent("Job application: " + f.position.value) + "&body=" + encodeURIComponent(lines.join("\n"));
        set("Your application is ready to send by email.", true);
      } else {
        set("Online applications are not available yet. Please contact the clinic.", false);
      }
    });
  });

  /* ---------- Booking forms ---------- */
  $$("form[data-booking]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = $(".form-note", form);
      var set = function (msg, ok) { note.textContent = msg; note.className = "form-note " + (ok ? "ok" : "bad"); };
      var f = form.elements, bad = false;
      ["name", "phone"].forEach(function (k) {
        var empty = !f[k].value.trim();
        f[k].classList.toggle("err", empty); if (empty) bad = true;
      });
      if (bad) return set("Please enter your name and phone number.", false);
      if (f.consent && !f.consent.checked) return set("Please tick the box to agree before sending.", false);

      var lines = ["Appointment request: ADMed Specialist Clinic",
        "Name: " + f.name.value.trim(), "Phone: " + f.phone.value.trim()];
      if (f.email && f.email.value.trim()) lines.push("Email: " + f.email.value.trim());
      if (f.specialty.value) lines.push("Specialty: " + f.specialty.value);
      if (f.date && f.date.value) lines.push("Preferred date: " + f.date.value);
      if (f.time && f.time.value) lines.push("Preferred time: " + f.time.value);
      if (f.message && f.message.value.trim()) lines.push("Notes: " + f.message.value.trim());
      var body = lines.join("\n");

      if (C.formAccessKey) {
        if (f.botcheck && f.botcheck.checked) return;
        var btn = $('button[type="submit"]', form), label = btn.innerHTML;
        btn.disabled = true; btn.textContent = "Sending...";
        set("", true);
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: C.formAccessKey,
            subject: "Appointment request: " + (f.specialty.value || "General"),
            from_name: "ADMed Specialist Clinic website",
            name: f.name.value.trim(), phone: f.phone.value.trim(),
            email: f.email ? f.email.value.trim() : "",
            service: f.specialty.value,
            preferred_date: f.date ? f.date.value : "",
            preferred_time: f.time ? f.time.value : "",
            message: f.message ? f.message.value.trim() : "",
            botcheck: false
          })
        }).then(function (r) { return r.json(); }).then(function (res) {
          if (!res.success) throw new Error(res.message || "failed");
          form.reset();
          set("Thank you. Your request has been sent and we will call you to confirm.", true);
        }).catch(function () {
          note.className = "form-note bad";
          note.innerHTML = "Your request could not be sent. Please call " + (hrefs.tel ? '<a href="' + esc(hrefs.tel) + '"><strong>' + esc(C.phone) + "</strong></a>" : "the clinic") + ".";
        }).then(function () { btn.disabled = false; btn.innerHTML = label; });
      } else if (hrefs.wa) {
        window.open(hrefs.wa + "?text=" + encodeURIComponent(body), "_blank", "noopener");
        set("Your request is ready to send on WhatsApp.", true);
      } else if (hrefs.mail) {
        window.location.href = hrefs.mail + "?subject=" + encodeURIComponent("Appointment request") + "&body=" + encodeURIComponent(body);
        set("Your request is ready to send by email.", true);
      } else if (hrefs.tel) {
        note.className = "form-note ok";
        note.innerHTML = 'To book, please call <a href="' + esc(hrefs.tel) + '"><strong>' + esc(C.phone) + "</strong></a>.";
      } else {
        set("Online booking is not available yet. Please call the clinic.", false);
      }
    });
  });

  /* ---------- Chat: route visitors to the right number ---------- */
  var chatCfg = C.chat || {}, routes = (chatCfg.routes || []).filter(function (r) { return r && (r.number || r.whatsapp || r.call); });
  if (routes.length) {
    var chat = $("#chat"), panel = $("#chatPanel"), tgl = $("#chatToggle"), go = $("#chatGo"), callA = $("#chatCall"), msg = $("#chatMsg"), box = $("#chatRoutes");
    chat.hidden = false;
    if (chatCfg.title) $("#chatTitle").textContent = chatCfg.title;
    box.innerHTML = routes.map(function (r, i) {
      return '<label class="route"><input type="radio" name="route" value="' + i + '"' + (i === 0 ? " checked" : "") + "><span>" + esc(r.label) + (r.hint ? "<small>" + esc(r.hint) + "</small>" : "") + "</span></label>";
    }).join("");
    var current = function () {
      var c = $('input[name="route"]:checked', box);
      return routes[c ? +c.value : 0];
    };
    var refresh = function () {
      var r = current(), text = msg.value.trim() || r.message || "";
      $$(".route", box).forEach(function (l) { l.classList.toggle("on", $("input", l).checked); });
      var wa = r.whatsapp || r.number, cl = r.call || r.number;
      go.href = "https://wa.me/" + digits(wa).replace("+", "") + (text ? "?text=" + encodeURIComponent(text) : "");
      callA.href = "tel:" + digits(cl);
      callA.textContent = "Or call " + cl;
    };
    box.addEventListener("change", refresh); msg.addEventListener("input", refresh); refresh();
    var toggleChat = function (open) {
      panel.hidden = !open; tgl.setAttribute("aria-expanded", open);
      if (open) { var first = $('input[name="route"]:checked', box); if (first) first.focus(); }
    };
    tgl.addEventListener("click", function () { toggleChat(panel.hidden); });
    $("#chatClose").addEventListener("click", function () { toggleChat(false); tgl.focus(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) { toggleChat(false); tgl.focus(); } });
  }

  /* ---------- Header, nav, back-to-top ---------- */
  var header = $(".header"), toTop = $("#toTop"), nav = $("#nav"), burger = $("#burger");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 10);
    toTop.classList.toggle("show", window.scrollY > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  function setNav(open) {
    nav.classList.toggle("open", open);
    document.documentElement.classList.toggle("nav-open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    burger.innerHTML = '<svg class="ic"><use href="#' + (open ? "i-close" : "i-menu") + '"/></svg>';
  }
  burger.addEventListener("click", function () { setNav(!nav.classList.contains("open")); });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { setNav(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setNav(false); });

  /* ---------- Day / night mode ---------- */
  var root = document.documentElement, tt = $("#themeToggle"), metaTheme = $('meta[name="theme-color"]');
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    tt.setAttribute("aria-label", t === "dark" ? "Switch to day mode" : "Switch to night mode");
    tt.setAttribute("aria-pressed", t === "dark");
    if (metaTheme) metaTheme.setAttribute("content", t === "dark" ? "#171c4a" : "#FCA901");
  }
  var stored = null;
  try { stored = localStorage.getItem("admed-theme"); } catch (e) {}
  var mq = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : null;
  applyTheme(root.getAttribute("data-theme") || stored || (mq && mq.matches ? "dark" : "light"));
  tt.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("admed-theme", next); } catch (e) {}
  });
  if (mq && mq.addEventListener) mq.addEventListener("change", function (e) {
    var saved = null; try { saved = localStorage.getItem("admed-theme"); } catch (x) {}
    if (!saved) applyTheme(e.matches ? "dark" : "light");
  });

  /* ---------- Scroll reveal ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (en) {
    en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
  }, { threshold: 0.12 }) : null;
  function observe(el) { if (io) io.observe(el); else el.classList.add("in"); }
  $$(".reveal").forEach(observe);

  /* ---------- Announcement pop-up: once per visit, with a close button ---------- */
  (function () {
    var box = $("#promo");
    if (!box) return;
    var seen = false;
    try { seen = sessionStorage.getItem("admed-promo") === "1"; } catch (e) {}
    if (seen) return;
    var opener = null;
    function close() {
      box.hidden = true;
      document.body.classList.remove("promo-open");
      document.removeEventListener("keydown", onKey);
      try { sessionStorage.setItem("admed-promo", "1"); } catch (e) {}
      if (opener && opener.focus) opener.focus();
    }
    function onKey(ev) {
      if (ev.key === "Escape") { close(); return; }
      if (ev.key !== "Tab") return;
      var f = $$("a[href], button", box).filter(function (x) { return !x.disabled && x.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
      else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
    }
    function open() {
      opener = document.activeElement;
      box.hidden = false;
      document.body.classList.add("promo-open");
      document.addEventListener("keydown", onKey);
      var x = $(".promo__x", box); if (x) x.focus();
    }
    $$("[data-promo-close]", box).forEach(function (b) { b.addEventListener("click", close); });
    box.addEventListener("click", function (ev) { if (ev.target === box) close(); });
    var book = $("[data-promo-book]", box);
    if (book) book.addEventListener("click", function () {
      $$("[data-specialty-select]").forEach(function (sel) { sel.value = "Dialysis Treatment"; });
      opener = null; close();
    });
    setTimeout(open, 800);
  })();

  $("#year").textContent = new Date().getFullYear();
})();
