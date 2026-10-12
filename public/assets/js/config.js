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
  phone: "+233 55 699 6422",     // clinic
  phone2: { label: "Specialist line", number: "+233 24 356 0080" },  // optional second number
  whatsapp: "",         // digits only with country code, e.g. "233243560080" (adds a WhatsApp button + sends booking requests there)
  email: "medspecialistsconnect@gmail.com",  // booking form sends requests here when WhatsApp is not set
  address: "Worship Curve, Accra, Ghana",
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
      { label: "Book an appointment or ask the clinic", hint: "Clinic reception", number: "+233 55 699 6422",
        message: "Hello ADMed Specialist Clinic, I would like to book an appointment." },
      { label: "Speak to a specialist", hint: "Specialist line", number: "+233 24 356 0080",
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
    services: { cardiac: "", nephrology: "", orthopedic: "", gynecological: "", hematology: "", urology: "" },
    gallery: []         // e.g. ["assets/photos/1.jpg", "assets/photos/2.jpg"]
  },

  // Latest updates (section is hidden until you add at least one)
  // { date: "12 Oct 2026", title: "Headline", tag: "Notice", url: "https://optional-link" }
  news: [],

  // Specialists (section is hidden until you add at least one) --------------
  // { name: "Dr. Full Name", role: "Consultant Nephrologist", photo: "assets/photos/dr-name.jpg" }
  doctors: [],

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
