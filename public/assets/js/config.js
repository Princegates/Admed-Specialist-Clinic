/* ==========================================================================
   ADMed Specialist Clinic — site configuration
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to update the clinic's details.
   Anything left empty ("" or []) is hidden automatically — nothing on the
   site is ever shown as an empty box.
   Source of the details below: the clinic's public Google Maps listing.
   ========================================================================== */
window.ADMED = {
  // Contact ---------------------------------------------------------------
  phone: "+233 24 356 0080",     // main number for calls
  phone2: { label: "Booking & WhatsApp", number: "+233 55 699 6422" },  // optional second number
  whatsapp: "233556996422",  // digits only with country code (used when the form key is not set)
  email: "medspecialistsconnect@gmail.com",  // booking form sends requests here when WhatsApp is not set
  address: "Spintex Road, Worship Curve (Off Coca Cola Roundabout), Accra",
  plusCode: "JVRV+3G Accra, Ghana",

  // Google Maps
  mapsUrl: "https://maps.app.goo.gl/TjCBQmsAGRaL31dE7?g_st=ic",
  mapEmbedUrl: "https://maps.google.com/maps?q=5.6402194,-0.1061823&z=16&output=embed",

  // Appointment forms ------------------------------------------------------
  // Requests are emailed to the address above through Web3Forms (free).
  // 1) Go to https://web3forms.com, enter medspecialistsconnect@gmail.com
  // 2) Copy the access key they email you and paste it here.
  // Until a key is added, the form opens the visitor's email app instead.
  formAccessKey: "854b631a-56b3-4f7e-8823-79fc038c3daa",

  // Chat button: sends visitors to the right number for what they need.
  // Each route opens WhatsApp (with their message) or lets them call.
  chat: {
    title: "How can we help?",
    routes: [
      // whatsapp: number the chat opens in WhatsApp. call: number for the "Or call" link.
      { label: "Book an appointment or ask the clinic", hint: "Clinic reception", whatsapp: "+233 55 699 6422", call: "+233 24 356 0080",
        message: "Hello ADMed Specialist Clinic, I would like to book an appointment." },
      { label: "Speak to a specialist", hint: "We will connect you with the right specialist", whatsapp: "+233 55 699 6422", call: "+233 24 356 0080",
        message: "Hello, I would like to speak to a specialist." }
    ]
  },

  // Short notice shown in the strip at the very top of the site
  announcement: "Specialist consultations Monday to Saturday, 6 AM to 6 PM",

  // Opening hours — e.g. [{ days: "Monday – Friday", time: "8:00 AM – 6:00 PM" }]
  hours: [
    { days: "Monday – Saturday", time: "6:00 AM – 6:00 PM" },
    { days: "Sunday", time: "Closed" }
  ],

  // Google rating shown on the site (update when it changes)
  googleRating: { score: "4.9", count: 17 },

  // Social links (full URLs)
  social: { facebook: "https://web.facebook.com/admedspcecialistshospital", instagram: "https://www.instagram.com/a.dmedspecialists/", x: "", youtube: "", tiktok: "" },

  // Photos -----------------------------------------------------------------
  // Put image files in /assets/photos/ and list them here.
  photos: {
    hero: "assets/photos/clinic-building-full.jpg",
    about: "assets/photos/about-corridor.jpg",
    // Photo tiles in the Specialties section (optional)
    services: {
      cardiac: "assets/photos/cardiac-care.jpg",
      nephrology: "assets/photos/nephrology-care.jpg",
      dialysis: "assets/photos/dialysis-machine.jpg",
      orthopedic: "assets/photos/orthopedic-care.jpg",
      gynecological: "assets/photos/gynecological-care.jpg",
      hematology: "assets/photos/hematology-care.jpg",
      urology: "assets/photos/urology-care.jpg",
      internal: "assets/photos/internal-care.jpg",
      physician: "assets/photos/physician-consult.jpg",
      laboratory: "assets/photos/laboratory-care.jpg"
    },
    // Each entry: a file path, or { src, alt } to describe the photo
    gallery: [
      { src: "assets/photos/theatre-team.jpg", alt: "Theatre team preparing for a procedure at ADMed Specialist Clinic" },
      { src: "assets/photos/theatre-prep.jpg", alt: "Staff preparing the operating theatre" },
      { src: "assets/photos/dialysis-unit.jpg", alt: "Dialysis unit with patient chairs and dialysis machines" },
      { src: "assets/photos/corridor.jpg", alt: "Clinic corridor with hand hygiene and standard precautions posters" }
    ]
  },

  // Founder photo (optional). Without one, the card shows initials.
  founderPhoto: "assets/photos/founder.jpg",

  // Vacancies shown on the Careers page. Leave the list empty when there are none: the page then
  // invites expressions of interest. Each vacancy:
  // { title: "Registered Nurse (Dialysis)", department: "Dialysis unit", type: "Full-time",
  //   deadline: "2026-11-30", summary: "Two or three sentences about the role and requirements.",
  //   link: "https://optional-link-to-the-full-advert" }
  // deadline, type, department, summary and link are optional. Vacancies past their deadline are hidden.
  vacancies: [],

  // Live health news (ticker under the banner and a Health News list in the news section).
  // It is read by the site's server from the World Health Organization's public feed. Set to false to switch it off.
  whoNews: true,
  // The ticker under the header only shows WHO headlines published within this many hours.
  whoTickerHours: 24,

  // News, Updates & Health Insights --------------------------------------------
  // The section is hidden until there is at least one entry. Newest dated entries show first;
  // entries without a date follow in the order written here. Copy an entry, change it, save.
  //
  //   type    "clinic"   Clinic Updates     (notices, new services, clinic days, posters)
  //           "insight"  Health Insights    (articles written by the clinic, opens its own page)
  //           "local"    Local Health News  (a short summary in your own words + link to the source)
  //   title   headline (required)
  //   date    "2026-10-14" (year-month-day). Optional, but it keeps the section looking current.
  //   summary one or two sentences shown on the card
  //   image   optional, e.g. "assets/photos/my-poster.jpg"
  //   link    "clinic" and "local" entries: where the card opens (optional for "clinic": defaults to the image)
  //   source  "local" entries: the publisher, e.g. "Ghana Health Service"
  //   id      "insight" entries: a short web-safe name, e.g. "blood-pressure-checks" (must be unique)
  //   body    "insight" entries: the article. One text per paragraph. Start a text with
  //           "## " for a sub-heading, or with "- " for a bullet point.
  //   service optional, "insight" entries: a service page to point to, e.g. "nephrology"
  //           (cardiac, nephrology, dialysis, orthopaedic, gynaecology, haematology, urology,
  //            internal-medicine, physician-specialist, medical-laboratory)
  //
  // Local news tips: summarise in your own words, never paste the article, always name the source
  // and link to it. Have a doctor check anything medical before it goes live.
  news: [
    {
      type: "insight", id: "blood-pressure-checks", date: "2026-10-14", service: "cardiac",
      title: "High blood pressure: why a regular check matters",
      summary: "High blood pressure often has no symptoms. A quick check is the only way to know.",
      body: [
        "High blood pressure (hypertension) usually causes no pain and no obvious symptoms, which is why it is often called a silent condition. Over time it can strain the heart and damage the blood vessels, the brain and the kidneys.",
        "## Who should get checked",
        "- Adults who have never had their blood pressure measured, or have not had it measured in the last year",
        "- Anyone with diabetes, kidney disease or a family history of high blood pressure, stroke or heart disease",
        "- Anyone who has been told before that their reading was high",
        "## What you can do",
        "Have your blood pressure measured regularly, take any medicines exactly as prescribed, and speak to a doctor before stopping or changing them. Reducing salt, staying active and avoiding tobacco all help.",
        "If you have chest pain, sudden breathlessness, fainting or signs of a stroke, go to the nearest hospital or clinic immediately."
      ]
    },
    {
      type: "insight", id: "kidney-health-basics", date: "2026-10-13", service: "nephrology",
      title: "Kidney health: who should be tested and why",
      summary: "Early kidney disease is often silent. Simple urine and blood tests can find it sooner.",
      body: [
        "The kidneys filter waste and extra fluid from the blood. Chronic kidney disease develops slowly and often causes no symptoms until the kidneys are already badly affected, so testing matters.",
        "## Who should be tested",
        "- People with diabetes or high blood pressure, the two most common causes of kidney disease",
        "- People with a family history of kidney disease",
        "- Anyone with swelling of the legs or around the eyes, foamy or blood-stained urine, or changes in how often they pass urine",
        "## How it is checked",
        "Kidney function is usually checked with a urine test and a blood test. Your specialist will explain the results and what to do next.",
        "Finding kidney disease early gives you the best chance of slowing it down and avoiding complications."
      ]
    },
    {
      type: "insight", id: "when-to-see-a-specialist", date: "2026-10-12", service: "physician-specialist",
      title: "When to see a specialist, not only your general doctor",
      summary: "A specialist can help when a condition is complex, long-standing or has not improved.",
      body: [
        "A specialist is a doctor with extra training in one area of medicine. Many health concerns are well managed by a general doctor, but a specialist can help in some situations.",
        "## Consider a specialist if",
        "- Your doctor has referred you",
        "- A condition is long-standing or has not improved with treatment",
        "- You would like a second opinion",
        "- You need a clear explanation of test results or a diagnosis",
        "## What to bring",
        "Bring any referral letter, your earlier records, test results and imaging, and a list of the medicines you take. This helps your specialist see the full picture and avoids repeating tests."
      ]
    },
    { type: "clinic", title: "Hypertension: the silent killer", summary: "Health awareness from the clinic.", image: "assets/photos/news-hypertension.jpg" },
    { type: "clinic", title: "Nephrology service", summary: "Clinic days: Saturdays at 10:00 AM.", image: "assets/photos/news-nephrology.jpg" },
    { type: "clinic", title: "Know when you need a gynaecologist", summary: "Clinic days: Fridays.", image: "assets/photos/news-gynecology.jpg" },
    { type: "clinic", title: "Haematology services", summary: "Specialist-led care.", image: "assets/photos/news-hematology.jpg" },
    { type: "clinic", title: "Urology clinic", summary: "Urinary and men's health.", image: "assets/photos/news-urology.jpg" },
    { type: "clinic", title: "Live a healthy lifestyle with your family", summary: "From the clinic.", image: "assets/photos/news-family.jpg" }
    // Local news example (remove the // to use):
    // { type: "local", date: "2026-10-14", title: "Short headline in your own words", summary: "One or two sentences summarising the story.", source: "Ghana Health Service", link: "https://example.com/the-article" }
  ],

  // Specialists (section is hidden until you add at least one) --------------
  // { name, role, detail (optional line under the role), bio (optional), photo (optional) }
  // Without a photo the card shows the doctor's initials.
  doctors: [
    {
      name: "Dr. Kwame Acheampong Adomako",
      role: "Consultant Cardiothoracic Surgeon",
      detail: "Head of the Cardiothoracic Unit, 37 Military Hospital, Accra, Ghana",
      bio: "Under his leadership, the hospital achieved its first dual-chamber pacemaker implantation at the Cardiothoracic Centre. He advances cardiothoracic care and the delivery of specialised cardiac procedures in Ghana.",
      photo: ""
    },
    {
      name: "Prof. Martin Tamatey",
      role: "Consultant Cardiothoracic Surgeon",
      detail: "National Cardiothoracic Centre, Korle Bu Teaching Hospital, Accra",
      bio: "Associate Professor at the University of Health and Allied Sciences (UHAS), where he has also served as Head of the Department of Surgery, School of Medicine. His work covers clinical practice, medical education and research in cardiothoracic surgery.",
      photo: ""
    }
  ],

  // Patient reviews — real Google reviews, shown with attribution -----------
  reviews: [
    {
      name: "Ewuraekua Budu",
      text: "Had a great experience at Admed Specialist Hospital. Had to go there for my mum's AV fistula for her hemodialysis and subsequently for her renal consultation. The docs and nurses were super professional and caring. Facilities were clean, and treatment was on point. Highly recommend for anyone needing kidney care.",
      rating: 5
    },
    {
      name: "Quagraine Judith",
      text: "I would like to sincerely appreciate the excellent care and dedication shown by the gynecologist. From the very first consultation, the doctor demonstrated professionalism, patience, and genuine concern for my well-being. Every step of the …",
      rating: 5
    }
  ]
};
