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
    fragment = fragment.replace('href="cookies.html"', 'href="../cookies.html"')
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
    if s.get("figure"):
        out.append('<figure class="svc-fig"><img src="../assets/photos/%s" alt="%s" width="1080" height="810" loading="lazy"></figure>' % (e(s["figure"][0]), e(s["figure"][1])))
    out.append("<h2>%s</h2>" % e(s.get("offers_h", "What we offer")) + bullets(s["offers"]))
    for sec in s["sections"]:
        out.append('<h2%s>%s</h2>' % (' id="%s"' % sec["id"] if sec.get("id") else "", e(sec["h"])))
        for p in sec.get("p", []):
            out.append("<p>%s</p>" % e(p))
        if sec.get("jump"):
            out.append('<ul class="dots">%s</ul>' % "".join('<li><a class="more-link" href="#%s">%s</a></li>' % (e(i), e(h)) for h, i in sec["jump"]))
        if sec.get("bullets"):
            out.append(bullets(sec["bullets"], "dots"))
        if sec.get("link"):
            out.append('<p><a class="more-link" href="%s">%s &rarr;</a></p>' % (e(sec["link"][1]), e(sec["link"][0])))
    if s.get("see"):
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
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
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


# ---------------------------------------------------------------- cookie policy (site root)
COOKIE_TABLE = [
    ("Day / night mode choice", "Local storage in your browser (admed-theme)", "Remembers whether you chose day or night mode.", "Until you clear your browser data", "Our site"),
    ("Google Fonts", "Fonts loaded from Google servers", "Displays the site's typeface. Google receives your IP address and browser details when the font files load.", "Set by Google", "Google"),
    ("Your cookie choice", "Local storage in your browser (admed-consent)", "Remembers whether you accepted third-party content or chose necessary only, so we do not ask on every visit.", "Until you clear your browser data", "Our site"),
    ("Google Maps", "Embedded map on the Contact section", "Shows our location. The map only loads after you accept. Google may then set cookies and receive data about your visit.", "Set by Google", "Google"),
    ("Appointment request form", "Form data sent when you press Send Request", "Delivers your request to the clinic by email. The details you type are passed to our form service, Web3Forms, for that purpose only.", "Not stored in your browser", "Web3Forms"),
]
COOKIE_SECTIONS = [
    ("What are cookies?", [
        "Cookies are small text files that a website places on your device. Websites also use similar technologies, such as your browser's local storage, to remember choices you make. They are widely used to make websites work and to give site owners information about how they are used."]),
    ("How we use cookies and similar technologies", [
        "This website does not set advertising or analytics cookies of its own. It uses your browser's local storage to remember your day or night mode and your cookie choice, and it relies on a few services provided by other companies. These are listed in the table below."]),
    ("Services from other companies", [
        "When you use our website, content from other companies may load, and those companies may use cookies or collect information according to their own policies. We do not control this. Please read their policies for details:"]),
    ("Links to other websites", [
        "Our pages link to WhatsApp, Facebook, Instagram, Google Maps and our website developer. These sites have their own cookie and privacy policies, which apply once you leave our website."]),
    ("Your choices", [
        "The first time you visit, a notice asks whether to accept third-party content or use necessary storage only. You can change your choice at any time with the Cookie settings link at the bottom of every page.",
        "You can also delete cookies and site data, or block them, in your browser settings. If you clear this site's data, the site will forget your day or night mode and cookie choices.",
        "Most browsers explain how to manage cookies in their Help or Settings pages."]),
    ("Changes to this policy", [
        "We may update this policy if the way the website works changes. The date at the top of the page shows when it was last updated."]),
]


def cookie_page():
    def to_root(fragment):
        fragment = fragment.replace('href="#', 'href="index.html#')
        fragment = fragment.replace('<use href="index.html#', '<use href="#')
        return fragment

    tmpl = PAGE.replace("../", "")
    head = tmpl[: tmpl.index('<main id="main">')]
    tail = tmpl[tmpl.index("</main>"):]
    rows = "".join(
        "<tr><td data-label=\"Item\"><strong>%s</strong></td><td data-label=\"Type\">%s</td><td data-label=\"Purpose\">%s</td><td data-label=\"How long\">%s</td><td data-label=\"Provider\">%s</td></tr>"
        % tuple(e(c) for c in row)
        for row in COOKIE_TABLE
    )
    table = (
        '<div class="policy-table-wrap"><table class="policy-table"><thead><tr><th>Item</th><th>Type</th><th>Purpose</th><th>How long</th><th>Provider</th></tr></thead><tbody>%s</tbody></table></div>' % rows
    )
    links = (
        '<ul class="dots"><li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy Policy</a></li>'
        '<li><a href="https://web3forms.com/privacy" target="_blank" rel="noopener">Web3Forms privacy information</a></li></ul>'
    )
    body = []
    for h, paras in COOKIE_SECTIONS:
        body.append("<h2>%s</h2>" % e(h))
        for p in paras:
            body.append("<p>%s</p>" % e(p))
        if h.startswith("How we use"):
            body.append(table)
        if h.startswith("Services from"):
            body.append(links)
    body.append('<h2>Contact us</h2><p>If you have a question about this policy, contact us at <a data-href="mail" data-bind="email"></a> or call <a data-href="tel" data-bind="phone"></a>.</p>')
    main = """<main id="main">
<section class="svc-banner svc-banner--plain">
  <div class="container svc-banner__in">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">Cookie Policy</span></nav>
    <h1>Cookie Policy</h1>
    <p class="lead">How ADMed Specialist Clinic's website uses cookies and similar technologies.</p>
  </div>
</section>
<section class="section">
  <div class="container">
    <article class="svc-article policy">
      <p class="small-print" style="border:0;padding:0;margin:0 0 1.4em">Last updated: %(updated)s</p>
      %(body)s
    </article>
  </div>
</section>
"""
    page = head % {
        "title": "Cookie Policy",
        "desc": "How ADMed Specialist Clinic's website uses cookies, local storage and services from other companies.",
    } if False else None
    return head, tail, main, body, to_root


head_t, tail_t, main_t, body_t, to_root = cookie_page()
import datetime
updated = datetime.date.today().strftime("%d %B %Y").lstrip("0")
sprite_r, header_r, chat_r = sprite, to_root(between("<!-- Top bar -->", '<main id="main">')), to_root(between("<!-- Chat -->", '<script src="assets/js/config.js">'))
foot_r = to_root(between("<!-- Footer -->", "<!-- Chat -->"))
foot_r = re.sub(r'<ul id="footerSpecs"></ul>', '<ul id="footerSpecs">%s</ul>' % "".join('<li><a href="services/%s.html">%s</a></li>' % (s["slug"], e(s["name"])) for s in SERVICES), foot_r)
head_filled = head_t % {"title": "Cookie Policy", "desc": "How ADMed Specialist Clinic's website uses cookies, local storage and services from other companies.", "sprite": sprite_r, "header": header_r}
page = head_filled + (main_t % {"updated": updated, "body": "\n      ".join(body_t)}) + "\n</main>\n\n" + foot_r + "\n" + chat_r + '\n<script src="assets/js/config.js"></script>\n<script src="assets/js/main.js"></script>\n</body>\n</html>\n'
with open(os.path.join(PUBLIC, "cookies.html"), "w", encoding="utf-8") as f:
    f.write(page)
print("wrote cookies.html")
