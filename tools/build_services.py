#!/usr/bin/env python3
"""Builds public/services/<slug>.html from tools/services_content.py.

The header, top bar, footer, chat widget and icon sprite are copied from public/index.html
so the service pages always match the home page. Run after changing either file:

    python3 tools/build_services.py
"""
import html
import os
import re
import sys
from urllib.parse import quote

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
PUBLIC = os.path.join(ROOT, "public")
sys.path.insert(0, HERE)
from services_content import SERVICES  # noqa: E402

home = open(os.path.join(PUBLIC, "index.html"), encoding="utf-8").read()


def between(start, end):
    a = home.index(start)
    b = home.index(end, a)
    return home[a:b]


def to_sub(fragment):
    """Rewrite links copied from the home page so they work from /services/."""
    fragment = fragment.replace('href="#', 'href="../index.html#')
    fragment = fragment.replace('src="assets/', 'src="../assets/')
    fragment = fragment.replace('<use href="../index.html#', '<use href="#')   # icon references stay local
    return fragment


sprite = between("<!-- Icon sprite -->", '<a class="skip"')
header = to_sub(between("<!-- Top bar -->", '<main id="main">'))
chat = to_sub(between("<!-- Chat -->", '<script src="assets/js/config.js">'))
e = html.escape

SELECT_QS = {s["slug"]: "../index.html?service=" + quote(s["select"]) + "#book" for s in SERVICES}


def footer(current):
    foot = to_sub(between("<!-- Footer -->", "<!-- Chat -->"))
    items = "".join(
        '<li><a href="%s.html">%s</a></li>' % (s["slug"], e(s["name"])) for s in SERVICES
    )
    foot = re.sub(r'<ul id="footerSpecs"></ul>', '<ul id="footerSpecs">%s</ul>' % items, foot)
    return foot


def bullets(items, cls="checks"):
    return '<ul class="%s">%s</ul>' % (cls, "".join("<li>%s</li>" % e(i) for i in items))


def article(s):
    out = []
    for p in s["intro"]:
        out.append('<p class="lead-p">%s</p>' % e(p))
    if s.get("day"):
        out.append('<p class="day"><svg class="ic"><use href="#i-calendar"/></svg> <strong>Clinic day:</strong> %s</p>' % e(s["day"]))
    out.append("<h2>What we offer</h2>" + bullets(s["offers"]))
    for sec in s["sections"]:
        out.append("<h2>%s</h2>" % e(sec["h"]))
        for p in sec.get("p", []):
            out.append("<p>%s</p>" % e(p))
        if sec.get("bullets"):
            out.append(bullets(sec["bullets"], "dots"))
    out.append("<h2>When should I book?</h2><p>Consider booking a consultation if you have:</p>" + bullets(s["see"], "dots"))
    if s.get("emergency"):
        out.append('<div class="emergency-note"><svg class="ic"><use href="#i-alert"/></svg><p><strong>Emergency?</strong> %s</p></div>' % e(s["emergency"]))
    out.append(
        '<p class="small-print">This page gives general information and does not replace advice from a doctor. '
        "To discuss your own situation, please book a consultation.</p>"
    )
    return "\n        ".join(out)


def aside(current):
    links = "".join(
        '<li><a href="%s.html"%s>%s</a></li>'
        % (s["slug"], ' class="on" aria-current="page"' if s["slug"] == current else "", e(s["name"]))
        for s in SERVICES
    )
    return """
      <aside class="svc-aside">
        <div class="aside-card aside-card--cta">
          <h3>Book an appointment</h3>
          <p>Send a request and we will call you to confirm a time.</p>
          <a class="btn btn--primary btn--block" href="%s">Book an Appointment</a>
          <a class="aside-call" data-need="phone" data-href="tel"><svg class="ic"><use href="#i-phone"/></svg> Call <span data-bind="phone"></span></a>
        </div>
        <div class="aside-card">
          <h3>Our services</h3>
          <ul class="aside-list">%s</ul>
        </div>
        <div class="aside-card" data-need="hours">
          <h3>Opening hours</h3>
          <div data-bind="hoursList"></div>
        </div>
      </aside>""" % ("%(book)s", links)


PAGE = """<!doctype html>
<html lang="en" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>%(title)s | ADMed Specialist Clinic</title>
  <meta name="description" content="%(desc)s">
  <meta name="theme-color" content="#FCA901">
  <script>
    (function(){try{var t=localStorage.getItem("admed-theme");if(!t&&window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches)t="dark";if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();
  </script>
  <link rel="icon" type="image/png" href="../assets/img/favicon.png">
  <link rel="apple-touch-icon" href="../assets/img/apple-touch-icon.png">
  <meta property="og:type" content="website">
  <meta property="og:title" content="%(title)s | ADMed Specialist Clinic">
  <meta property="og:description" content="%(desc)s">
  <meta property="og:image" content="../assets/img/og.jpg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body data-base="../index.html">

<!-- Icon sprite -->
%(sprite)s
<a class="skip" href="#main">Skip to content</a>

%(header)s
<main id="main">

<section class="svc-banner">
  <div class="svc-banner__img" style="background-image:url('../assets/photos/%(photo)s');background-position:%(pos)s" role="img" aria-label="%(title)s"></div>
  <div class="container svc-banner__in">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span aria-hidden="true">/</span><a href="../index.html#services">Services</a><span aria-hidden="true">/</span><span aria-current="page">%(name)s</span></nav>
    <h1>%(title)s</h1>
    <p class="lead">%(banner)s</p>
    <div class="svc-banner__cta">
      <a class="btn btn--primary" href="%(book)s"><svg class="ic"><use href="#i-calendar"/></svg> Book an Appointment</a>
      <a class="btn btn--light" data-need="phone" data-href="tel"><svg class="ic"><use href="#i-phone"/></svg> Call us</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container svc-layout">
    <article class="svc-article">
        %(article)s
    </article>%(aside)s
  </div>
</section>

</main>

%(footer)s
%(chat)s
<script src="../assets/js/config.js"></script>
<script src="../assets/js/main.js"></script>
</body>
</html>
"""

out_dir = os.path.join(PUBLIC, "services")
os.makedirs(out_dir, exist_ok=True)
for s in SERVICES:
    title = s["name"] + (" Service" if s["slug"] in ("nephrology",) else "")
    title = s["name"]
    desc = re.sub(r"\s+", " ", s["intro"][0])[:155].rstrip(" ,.") + "."
    book = SELECT_QS[s["slug"]]
    page = PAGE % {
        "title": e(title),
        "name": e(s["name"]),
        "desc": e(desc),
        "sprite": sprite,
        "header": header,
        "photo": s["photo"],
        "pos": s.get("pos", "center top"),
        "banner": e(s["banner"]),
        "book": book,
        "article": article(s),
        "aside": aside(s["slug"]).replace("%(book)s", book),
        "footer": footer(s["slug"]),
        "chat": chat,
    }
    with open(os.path.join(out_dir, s["slug"] + ".html"), "w", encoding="utf-8") as f:
        f.write(page)
    print("wrote services/%s.html" % s["slug"])
