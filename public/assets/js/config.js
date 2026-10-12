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
    about: "assets/photos/clinic-building.jpg",
    // Photo tiles in the Specialties section (optional)
    services: {
      cardiac: "assets/photos/cardiac-care.jpg",
      nephrology: "assets/photos/dialysis-unit.jpg",
      orthopedic: "assets/photos/orthopedic-care.jpg",
      gynecological: "assets/photos/gynecological-care.jpg",
      hematology: "assets/photos/hematology-care.jpg",
      urology: "assets/photos/urology-care.jpg",
      internal: "assets/photos/internal-care.jpg",
      physician: "assets/photos/physician-care.jpg",
      laboratory: "assets/photos/laboratory-care.jpg"
    },
    gallery: ["assets/photos/corridor.jpg", "assets/photos/dialysis-unit.jpg"]
  },

  // Latest updates (section is hidden until you add at least one)
  // { title: "Headline", tag: "Notice", image: "assets/photos/x.jpg", date: "12 Oct 2026", url: "https://optional-link" }
  // date, tag and url are optional. Clicking a card opens url, or the full-size image.
  news: [
    { title: "Hypertension: the silent killer", tag: "Health awareness", image: "assets/photos/news-hypertension.jpg" },
    { title: "Nephrology service", tag: "Clinic days: Saturdays at 10:00 AM", image: "assets/photos/news-nephrology.jpg" },
    { title: "Know when you need a gynecologist", tag: "Clinic days: Fridays", image: "assets/photos/news-gynecology.jpg" },
    { title: "Hematology services", tag: "Specialist-led care", image: "assets/photos/news-hematology.jpg" },
    { title: "Urology clinic", tag: "Urinary and men's health", image: "assets/photos/news-urology.jpg" },
    { title: "Live a healthy lifestyle with your family", tag: "From the clinic", image: "assets/photos/news-family.jpg" }
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
