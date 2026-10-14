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
      dialysisAccess: "assets/photos/dialysis-access.jpg",
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
    {
      type: "insight", id: "kidney-failure-guide", date: "2026-10-11", service: "nephrology",
      title: "Kidney failure: causes, warning signs and treatment",
      summary: "What the kidneys do, how they can fail, how kidney failure is found and the treatments available: dialysis and kidney transplant.",
      body: [
        "This guide explains in plain language what the kidneys do, what can damage them, how kidney failure is found and how it is treated. It does not replace the advice of your own doctor.",
        "## What do the kidneys do?",
        "The kidneys are a pair of bean-shaped organs in the abdomen, near the back. Each is slightly smaller than a clenched fist. They filter the blood, removing waste products and extra fluid, which leave the body as urine. Urine passes from each kidney down a tube called the ureter to the bladder, and out through the urethra.",
        "## What is kidney failure?",
        "Kidney failure means the kidneys are no longer working well enough. It can come on very quickly, over a few days, which is called acute kidney failure. More often it develops slowly, over weeks, months or years, which is called chronic kidney failure.",
        "## What causes kidney failure?",
        "- High blood pressure that is not controlled: blood reaches the kidneys with too much force and slowly damages them. Without treatment it is one of the most common causes",
        "- Diabetes that is not controlled: high sugar levels damage the small blood vessels inside the kidneys",
        "- Infections: an infection in the kidneys, or an infection elsewhere in the body that is not treated properly, such as a bad sore throat, can damage the kidneys",
        "- Some medicines: painkillers such as diclofenac and ibuprofen can harm the kidneys when they are taken on your own, in large amounts or for a long time. Please take medicines only as advised",
        "- Some herbal preparations, which can damage the kidneys either through the herb itself or the way it is prepared",
        "## Warning signs",
        "Early kidney failure often causes no symptoms at all. Later, signs can include:",
        "- Getting tired easily",
        "- Swelling of the feet and legs, or of the whole body",
        "- Passing urine less often, or not at all",
        "- High blood pressure",
        "- A low blood count (anaemia)",
        "- Weakness of the bones",
        "## How is kidney failure found?",
        "It is diagnosed with a kidney function test, a blood test that measures waste products such as urea and creatinine and gives a figure called the eGFR, which shows how well the kidneys are filtering. When the kidneys are failing, waste products are high in the blood and the eGFR is low. If your result is below normal, see a kidney specialist for follow-up so that it does not get worse.",
        "Your doctor may also request other tests depending on your situation, for example a chest X-ray, an ECG, an echocardiogram (a heart scan), and for men a PSA blood test.",
        "## How can kidney failure be prevented?",
        "The causes of kidney failure can often be prevented or controlled, which is much easier than treating kidney failure once it is established.",
        "- Control high blood pressure: take your medicines as prescribed and keep your regular check-ups. High blood pressure becomes more common as we grow older, especially after the age of 35, and it is usually defined as 140/90 mmHg or above",
        "- Keep diabetes under control if you have it",
        "- Have infections treated properly, including sore throats",
        "- Avoid taking painkillers and other medicines on your own for long periods",
        "- Be careful with herbal products",
        "- Have your kidney function checked if you have diabetes, high blood pressure or a family history of kidney disease",
        "## How is kidney failure treated?",
        "Kidney failure is treated in two main ways: dialysis and kidney transplant.",
        "## Dialysis",
        "Dialysis does part of the work of the failed kidneys, filtering waste products out of the blood. There are two types.",
        "- Peritoneal dialysis (tummy dialysis): a soft tube is placed into the abdomen and a special solution is passed through it. The solution collects the waste products and is then drained away",
        "- Haemodialysis (blood dialysis): blood is taken through a tube or a fistula to a dialysis machine, which removes the waste products and returns the cleaned blood to the body",
        "Haemodialysis is the most common form. Each session lasts about 3 hours, and two to three sessions a week are usually needed. For most people, dialysis is needed for the long term. Our dialysis service and the procedures that make dialysis possible are described on their own pages.",
        "## Kidney transplant",
        "In a kidney transplant, one healthy kidney from a donor is placed in a patient whose kidneys have failed. The donor can live a normal life with the one remaining healthy kidney. The person who receives the kidney needs medicines for the long term to help the new kidney to keep working. A transplanted kidney can work for many years. If it eventually stops working, the person goes back on dialysis.",
        "## When to see a specialist",
        "- You have diabetes, high blood pressure or a family history of kidney disease",
        "- Your legs, feet or face are swollen, or you are passing less urine",
        "- You are tired all the time and cannot say why",
        "- A kidney test from another clinic was abnormal",
        "- You have been taking painkillers or herbal products for a long time"
      ]
    },
    {
      type: "insight", id: "av-fistula-guide", date: "2026-10-10", service: "dialysis-access",
      title: "AV fistula: what to know before and after the operation",
      summary: "A patient guide to the AV fistula, the long-lasting access for haemodialysis: how it works, how it is made and how to look after it.",
      body: [
        "An AV fistula is the preferred long-term access for haemodialysis. This guide explains what it is, how the operation works, what helps it to work well and what to watch for afterwards. It does not replace the advice of your own surgeon or nephrologist.",
        "## What is an AV fistula?",
        "Arteries carry blood from the heart to the body, quickly and under pressure. Veins carry it back, slowly and close to the skin. Usually the two are not directly joined. In an arterio-venous (AV) fistula, a surgeon connects an artery to a vein.",
        "The reason is simple. Blood from the artery now flows through the vein at high speed and pressure, and over several weeks the vein grows larger and stronger. It becomes big enough for the dialysis needles to be placed in it and connected to the dialysis machine.",
        "## Fistula or dialysis line?",
        "Some patients start dialysis through a dialysis line (a central venous catheter) while a fistula is being made and is maturing. The two are different:",
        "- A dialysis line is a soft tube placed in a large vein deep in the body, in one of a few possible sites. It can be used straight away, but it cannot stay in for long and tends to develop problems after a few months.",
        "- A fistula uses your own blood vessels, in the arm. It cannot be used straight away, because it needs at least 6 to 8 weeks to mature, but if it is looked after well it can last several years.",
        "## Where is a fistula made?",
        "A fistula is made in the upper limbs, so there are only two places to choose from: the left arm and the right arm. There may be two or three usable points on each arm.",
        "## The operation",
        "The operation is done under local anaesthesia. You stay awake throughout, and it takes about an hour. In outline:",
        "- You lie down",
        "- The area is cleaned",
        "- You are covered with sterile drapes, leaving only the area to be used",
        "- An injection numbs the area",
        "- The skin is opened and the surgeon connects the artery and the vein",
        "## What helps a fistula to mature",
        "Several things decide whether a fistula works out well. Your surgeon will assess them with you:",
        "- A healthy artery that is wide enough. A healthy artery carries blood easily, while one with hardened, narrowed walls carries much less",
        "- A healthy vein that is wide enough, with a thin wall that can expand over time",
        "- No blockage in the veins along the way",
        "- Enough blood pressure to push blood through the fistula. Low blood pressure can make it harder for a fistula to mature, so please follow your doctor's advice and never change your medicines on your own",
        "## Protect your veins",
        "Frequent blood tests and drip lines left in a vein for many days can damage it and make its wall thick, so that it no longer expands well. If you may need a fistula, ask for blood samples and drips to be taken from the other arm or from the back of the hand, and tell the staff that you need to protect your veins.",
        "## When the operation is more difficult",
        "- Higher body weight: the vessels may lie deeper under the skin, and sometimes a second small operation is needed later to bring the fistula closer to the surface so that it can be used easily",
        "- Small or very slim build: the vessels in the arm are smaller",
        "- Young patients: in teenagers and children the vessels are small, and a fistula operation is often not possible",
        "## Early problems after the operation",
        "Most problems that happen in the first 6 to 8 weeks, while the fistula is maturing, can be treated if they are noticed early.",
        "- Bleeding: some bleeding from the wound can occur in the first few days. Your care team will tell you how often to change the dressing",
        "- Infection: the area becomes painful and bleeds, or produces a yellowish or creamy discharge",
        "- Swelling of the whole arm: the arm becomes swollen and tense, which can happen when a vein further up is narrowed, for example after an earlier dialysis line",
        "## A fistula that is ready to use",
        "Once it has matured, a fistula usually feels like a firm, pen-sized vein just under the skin, and you can feel a gentle buzzing over it. A matured fistula is the one your dialysis nurses will use for the needles.",
        "## Problems once the fistula is in use",
        "Problems that happen after the fistula has matured and is in use for dialysis, usually from about 2 months onwards, include:",
        "- Bleeding after dialysis: a lot of blood can come out of the needle sites if they are not pressed properly afterwards. If the bleeding has not stopped before you leave the dialysis unit, or it restarts at home, go back to the hospital",
        "- A blocked fistula: a blood clot can form inside the fistula so that blood no longer flows well, and the dialysis machine cannot draw blood properly. This usually happens after the fistula has been used for a while, often when too much pressure is applied to it after dialysis. Careful handling by you and by the nurses each time lowers the risk",
        "- A ballooned fistula: a part of the fistula wall becomes thin and balloons out into a swelling that keeps getting bigger. This must be reviewed by the surgeon within days, because if it is left it can burst and cause serious blood loss. It is usually treated in theatre",
        "- Needle problems: if a dialysis needle goes into the artery lying beside the fistula, there can be heavy bleeding and the arm becomes very painful. Tell the dialysis staff at once if you have sudden, severe pain in the arm during dialysis",
        "## When to go back to the doctor",
        "- The dressing is soaked with blood, or the wound keeps bleeding",
        "- Bleeding from the needle sites does not stop",
        "- Pain, redness or discharge at the wound",
        "- The arm becomes swollen and tense",
        "- A swelling that is growing along the fistula",
        "- You can no longer feel the buzzing in the fistula, or dialysis is not running well",
        "- You are worried about your fistula for any other reason",
        "If you have heavy bleeding that does not stop, go to the nearest hospital or clinic immediately."
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
