/* ==========================================================================
   ADMed Specialist Clinic — site configuration
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to add the clinic's real details.
   Anything left empty ("" or []) is hidden automatically — nothing on the
   site is ever shown as a fake placeholder.
   ========================================================================== */
window.ADMED = {
  // Contact ---------------------------------------------------------------
  phone: "",            // e.g. "+233 24 000 0000"  (shows call buttons + top bar)
  whatsapp: "",         // digits only with country code, e.g. "233240000000"
  email: "",            // e.g. "info@admedclinic.com" (booking form falls back to this)
  address: "",          // e.g. "12 Example Road, Town, Region"

  // Google Maps link supplied by the clinic
  mapsUrl: "https://maps.app.goo.gl/TjCBQmsAGRaL31dE7?g_st=ic",
  // Optional: paste the "Embed a map" src URL from Google Maps → Share → Embed
  mapEmbedUrl: "",

  // Opening hours — shown in the top bar and contact section
  // e.g. [{ days: "Monday – Friday", time: "8:00 AM – 6:00 PM" }]
  hours: [],

  // Social links (full URLs)
  social: { facebook: "", instagram: "", x: "", youtube: "", tiktok: "" },

  // Photos -----------------------------------------------------------------
  // Drop image files into /assets/photos/ and list them here.
  // hero / about are single images; gallery is a list.
  photos: {
    hero: "",           // e.g. "assets/photos/hero.jpg"
    about: "",          // e.g. "assets/photos/about.jpg"
    gallery: []         // e.g. ["assets/photos/1.jpg", "assets/photos/2.jpg"]
  },

  // Specialists (section is hidden until you add at least one) --------------
  // { name: "Dr. Full Name", role: "Consultant Cardiologist", photo: "assets/photos/dr-name.jpg" }
  doctors: [],

  // Patient reviews (section is hidden until you add at least one) ----------
  // { name: "Patient name", text: "Review text…", rating: 5 }
  reviews: []
};
