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
  phone: "+233 24 356 0080",
  whatsapp: "",         // digits only with country code, e.g. "233243560080" (adds a WhatsApp button + sends booking requests there)
  email: "",            // e.g. "info@yourdomain.com" (booking form falls back to this)
  address: "Worship Curve, Accra, Ghana",
  plusCode: "JVRV+3G Accra, Ghana",

  // Google Maps
  mapsUrl: "https://maps.app.goo.gl/TjCBQmsAGRaL31dE7?g_st=ic",
  mapEmbedUrl: "https://maps.google.com/maps?q=5.6402194,-0.1061823&z=16&output=embed",

  // Latest notice from the clinic's Google listing (shown in the top strip)
  announcement: "Weekend dialysis available on Saturday or Sunday",

  // Opening hours — e.g. [{ days: "Monday – Friday", time: "8:00 AM – 6:00 PM" }]
  hours: [
    { days: "Monday – Saturday", time: "6:00 AM – 6:00 PM" },
    { days: "Sunday", time: "Closed" }
  ],

  // Google rating shown on the site (update when it changes)
  googleRating: { score: "4.9", count: 17 },

  // Social links (full URLs)
  social: { facebook: "", instagram: "", x: "", youtube: "", tiktok: "" },

  // Photos -----------------------------------------------------------------
  // Put image files in /assets/photos/ and list them here.
  photos: {
    hero: "",           // e.g. "assets/photos/hero.jpg"
    about: "",          // e.g. "assets/photos/building.jpg"
    // Photo tiles in the Specialties section (optional)
    services: { cardiac: "", nephrology: "", orthopedic: "", gynecological: "", hematology: "", urology: "" },
    gallery: []         // e.g. ["assets/photos/1.jpg", "assets/photos/2.jpg"]
  },

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
