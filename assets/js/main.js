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

  /* ---------- Contact details: bind, link and hide anything empty ---------- */
  var hours = Array.isArray(C.hours) ? C.hours : [];
  var has = {
    phone: !!C.phone, whatsapp: !!C.whatsapp, email: !!C.email,
    address: !!C.address, hours: hours.length > 0, maps: !!C.mapsUrl,
    announcement: !!C.announcement, rating: !!(C.googleRating && C.googleRating.score)
  };
  var hrefs = {
    tel: C.phone ? "tel:" + digits(C.phone) : "",
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
    if (h) { el.setAttribute("href", h); }
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

  // Hide the whole top bar when it has nothing to show
  var tb = $(".topbar");
  if (tb && !$$(".topbar__item", tb).some(function (e) { return !e.hidden; }) && !socialHtml) tb.hidden = true;

  // Map embed (optional)
  if (C.mapEmbedUrl) {
    var f = $("#mapFrame");
    f.src = C.mapEmbedUrl; f.hidden = false; $("#mapFallback").hidden = true;
  }

  /* ---------- Photos: only shown when they actually load ---------- */
  function tryImage(src, ok) {
    if (!src) return;
    var i = new Image();
    i.onload = function () { ok(src); };
    i.src = src;
  }
  var P = C.photos || {};
  tryImage(P.hero, function (s) { $("#heroBg").style.backgroundImage = "url('" + s + "')"; });
  tryImage(P.about, function (s) {
    var a = $("#aboutImg"); a.style.backgroundImage = "url('" + s + "')"; a.classList.add("has-photo");
  });
  // Photo tiles in the Specialties section
  $$("[data-photo]").forEach(function (tile) {
    var src = (P.services || {})[tile.getAttribute("data-photo")];
    tryImage(src, function (s) { tile.style.backgroundImage = "url('" + s + "')"; tile.classList.add("has-photo"); });
  });
  var gal = $("#galleryGrid"), shown = 0;
  (P.gallery || []).forEach(function (src, n) {
    tryImage(src, function () {
      var a = document.createElement("a");
      a.href = src; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("aria-label", "View clinic photo " + (n + 1));
      a.innerHTML = '<img loading="lazy" alt="ADMed Specialist Clinic photo ' + (n + 1) + '" src="' + esc(src) + '">';
      gal.appendChild(a); shown++;
      $("#gallery").hidden = false; observe(a);
    });
  });

  /* ---------- Doctors & reviews (render only if provided) ---------- */
  var docs = Array.isArray(C.doctors) ? C.doctors : [];
  var navHide = function (sec) { $$('[data-need-section="' + sec + '"]').forEach(function (a) { a.hidden = true; }); };
  if (docs.length) {
    $("#team").hidden = false;
    $("#teamGrid").innerHTML = docs.map(function (d) {
      var bg = d.photo ? ' style="background-image:url(\'' + esc(d.photo) + '\')"' : "";
      return '<article class="doc reveal"><div class="doc__photo"' + bg + '></div><div class="doc__body"><h3>' + esc(d.name) + "</h3><p>" + esc(d.role) + "</p></div></article>";
    }).join("");
  } else navHide("doctors");

  var revs = Array.isArray(C.reviews) ? C.reviews : [];
  if (revs.length) {
    $("#reviews").hidden = false;
    $("#reviewGrid").innerHTML = revs.map(function (r) {
      var n = Math.max(1, Math.min(5, Math.round(r.rating || 5))), stars = "";
      for (var i = 0; i < n; i++) stars += '<svg class="ic"><use href="#i-star"/></svg>';
      return '<figure class="rev reveal" style="margin:0"><div class="rev__stars" role="img" aria-label="' + n + ' out of 5 stars">' + stars + "</div><p>“" + esc(r.text) + "”</p><strong>" + esc(r.name) + "</strong></figure>";
    }).join("");
  } else navHide("reviews");

  /* ---------- Specialty selects & footer list from the cards ---------- */
  var specs = $$("[data-specialty]").map(function (e) { return e.getAttribute("data-specialty").replace(/&amp;/g, "&"); });
  $$("[data-specialty-select]").forEach(function (sel) {
    sel.innerHTML = '<option value="">Select a service</option>' +
      specs.map(function (s) { return "<option>" + esc(s) + "</option>"; }).join("") +
      "<option>Not sure</option>";
  });
  $("#footerSpecs").innerHTML = specs.slice(0, 6).map(function (s) {
    return '<li><a href="#specialties">' + esc(s) + "</a></li>";
  }).join("");

  // Clicking a specialty card pre-selects it in the booking form
  $$("[data-specialty]").forEach(function (card) {
    card.addEventListener("click", function () {
      var v = card.getAttribute("data-specialty").replace(/&amp;/g, "&");
      $$("[data-specialty-select]").forEach(function (sel) { sel.value = v; });
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

      var lines = ["Appointment request: ADMed Specialist Clinic",
        "Name: " + f.name.value.trim(), "Phone: " + f.phone.value.trim()];
      if (f.email && f.email.value.trim()) lines.push("Email: " + f.email.value.trim());
      if (f.specialty.value) lines.push("Specialty: " + f.specialty.value);
      if (f.date && f.date.value) lines.push("Preferred date: " + f.date.value);
      if (f.time && f.time.value) lines.push("Preferred time: " + f.time.value);
      if (f.message && f.message.value.trim()) lines.push("Notes: " + f.message.value.trim());
      var body = lines.join("\n");

      if (hrefs.wa) {
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
    if (metaTheme) metaTheme.setAttribute("content", t === "dark" ? "#0a0c1f" : "#FCA901");
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

  $("#year").textContent = new Date().getFullYear();
})();
