# Content for the service pages (British spelling).
# Facts about the clinic (services, clinic days) come from the clinic's Google listing and flyers.
# Everything else is general patient information, kept deliberately plain and non-specific.
#
# Each service:
#   slug, name, select (booking dropdown value, must match data-specialty on the home tiles),
#   icon, photo (file in assets/photos), banner (tagline), intro (paragraphs),
#   offers (what the clinic lists), sections (heading + paragraphs and/or bullets),
#   see (when to book), emergency (optional), day (optional clinic day)

SERVICES = [
 {
  "slug": "cardiac", "name": "Cardiac", "select": "Cardiac", "icon": "pulse",
  "photo": "cardiac-care.jpg", "tile": "Cardiac clinic (cardiologist), thoracic conditions, pacemaker implantation and IVC filter placement.",
  "banner": "Cardiac clinic, thoracic care, pacemaker implantation and IVC filters",
  "intro": [
   "The cardiac service at ADMed Specialist Clinic offers a cardiac clinic with a cardiologist, care for thoracic conditions, pacemaker implantation and IVC filter placement. It supports people with heart, chest and blood pressure concerns. A specialist listens to your symptoms, reviews your history and any earlier results, and explains what is happening and what the next step is.",
   "Heart conditions are common, and many develop quietly. Seeing a specialist early gives you the best chance of keeping a problem under control.",
  ],
  "offers": ["Cardiac Clinic (Cardiologist)", "Thoracic Conditions", "Pacemaker Implantation", "IVC Filter Placement"],
  "sections": [
   {"h": "What is cardiology?", "p": ["Cardiology is the branch of medicine that looks after the heart and the blood vessels. A cardiologist assesses how well your heart is working and treats conditions that affect it, including problems with blood pressure and heart rhythm."]},
   {"h": "High blood pressure: no pain, no warning", "p": [
     "High blood pressure (hypertension) often causes no pain and no obvious symptoms. Over time it puts extra pressure on the blood vessels and can harm the heart, the brain and the kidneys.",
     "Because it is usually silent, the only way to know is to have your blood pressure measured. If you have not had a check recently, or if high blood pressure, stroke or heart disease runs in your family, book a consultation. Get checked. Get treated. Live better."]},
   {"h": "Thoracic conditions", "p": ["The thorax is the chest, which holds the heart and the lungs. Thoracic conditions are problems affecting the organs and structures in the chest. If you have chest symptoms that are persistent or unexplained, a specialist can examine you, arrange the tests you need and advise on treatment."]},
   {"h": "Pacemaker implantation", "p": ["A pacemaker is a small device placed under the skin of the chest that helps the heart keep a steady rhythm when it beats too slowly or irregularly. Your specialist will assess whether a pacemaker is right for you, explain the procedure and talk through what follow-up you will need afterwards."]},
   {"h": "IVC filter placement", "p": ["An IVC filter is a small device placed in the inferior vena cava, the large vein that carries blood from the lower body back to the heart. It is used to catch blood clots travelling from the legs towards the lungs, in people who cannot take or are not protected by blood-thinning medicines. Your specialist will explain whether it is needed and what to expect."]},
   {"h": "What to expect at your visit", "p": ["Your specialist will ask about your symptoms, your family history and the medicines you take, and will examine you and measure your blood pressure. If tests are needed they will explain which ones and why, and talk you through the results and your treatment options."]},
  ],
  "see": ["Chest pain or tightness, or chest symptoms that do not go away", "Shortness of breath, especially with light activity or when lying flat", "A racing, pounding or irregular heartbeat", "Dizziness or fainting", "Swollen ankles or legs", "High blood pressure readings, or a family history of heart disease, stroke or diabetes"],
  "emergency": "Severe chest pain, sudden breathlessness, fainting, or signs of a stroke are emergencies. Call your local emergency number or go to the nearest hospital or clinic. Do not wait for an appointment.",
 },
 {
  "slug": "nephrology", "name": "Nephrology", "select": "Nephrology", "icon": "kidney",
  "photo": "nephrology-care.jpg", "pos": "center 45%", "tile": "Kidney disease consultation, chronic kidney disease management, blood pressure care and kidney function tests.",
  "banner": "Specialist kidney care, from consultation to dialysis",
  "day": "Saturdays at 10:00 AM",
  "intro": [
   "The nephrology service at ADMed Specialist Clinic provides specialist kidney care, from your first consultation to dialysis and the procedures that make dialysis possible. Our clinic runs on Saturdays at 10:00 AM, and weekend dialysis sessions may be available on Saturday or Sunday, subject to scheduling and clinical assessment.",
   "Your kidneys matter. Early diagnosis can protect your kidneys and your life.",
  ],
  "offers": ["Kidney disease consultation", "Chronic kidney disease (CKD) management", "Hypertension and kidney-related blood pressure care", "Dialysis (see our Dialysis Treatment service)", "AV-Fistula Creation, Central Venous Catheter insertion and AV-Graft Creation (see our Dialysis Access Procedures service)", "Kidney function tests"],
  "sections": [
   {"h": "What is chronic kidney disease (CKD)?", "p": [
     "Chronic kidney disease is a long-term condition in which the kidneys slowly lose their ability to filter waste and extra fluid from the blood. It usually progresses in stages, and early on it often causes no symptoms at all.",
     "Fatigue, swelling and changes in urination tend to appear only when kidney function has already fallen. Finding the problem early, and managing it, helps slow its progress and prevent complications."]},
   {"h": "What causes kidney disease?", "p": ["Two of the most common causes are:"], "bullets": ["Diabetes, which over time can damage the small blood vessels in the kidneys", "High blood pressure (hypertension), which can damage and narrow the blood vessels that supply the kidneys"]},
   {"h": "Getting tested", "p": ["Because early kidney disease is often silent, testing matters, especially if you have diabetes, high blood pressure or a family history of kidney disease. Kidney function is checked with simple tests, usually a urine test and a blood test. Your specialist will tell you which tests you need."]},
   {"h": "Dialysis and vascular access", "p": ["When the kidneys can no longer do their job, dialysis takes over part of that work. To receive dialysis, many patients need a vascular access, such as an AV fistula, an AV graft or a central venous catheter. Our team can discuss which option suits you and arrange the procedure. Weekend dialysis sessions may be available on Saturday or Sunday, subject to scheduling and clinical assessment; please call to arrange a time."], "links": [["Learn more about our Dialysis Treatment service", "dialysis.html"], ["Learn more about our Dialysis Access Procedures", "dialysis-access.html"]]},
  ],
  "see": ["Swelling of the legs, ankles or around the eyes", "Tiredness that does not improve", "Changes in how often you pass urine, or foamy or blood-stained urine", "High blood pressure that is hard to control", "Diabetes, or a family history of kidney disease", "Abnormal kidney test results from another clinic"],
 },
 {
  "slug": "dialysis", "name": "Dialysis Treatment", "select": "Dialysis Treatment", "icon": "kidney",
  "photo": "dialysis-unit-wide.jpg", "pos": "center 55%", "tile": "Dialysis sessions with monthly specialist consults, a doctor available during treatment, renal nutrition guidance and monthly laboratory monitoring.",
  "banner": "Compassionate Care. Advanced Treatment. Better Living.",
  "figure": ["dialysis-unit-wide.jpg", "The ADMed dialysis unit, with dialysis machines and reclining patient chairs"],
  "intro": [
   "At ADMed Specialist Clinic, our dialysis service is built around you. We provide compassionate, patient-centred dialysis care in a professional and supportive environment for people living with kidney failure or other conditions that need dialysis, in line with their clinical needs and the recommendations of their treating healthcare professionals.",
   "Our dialysis unit is equipped with dialysis machines and reclining patient chairs to support your comfort during treatment. Weekend dialysis appointments may be available, subject to scheduling and clinical assessment.",
  ],
  "cards_h": "Our Comprehensive Service Package",
  "cards": [
   ["Monthly Specialist Consult", "Regular assessment and personalised care by our experienced nephrologist to monitor your progress and well-being."],
   ["Available Medical Doctor During Treatment", "A medical doctor is available throughout your treatment for immediate attention and medical preparedness."],
   ["Renal Nutrition", "Guidance on a kidney-friendly diet and nutrition to support your health, energy and overall recovery."],
   ["Iron Sucrose Therapy (prescribed when appropriate)", "Iron sucrose therapy to help manage anaemia, boost energy and improve your quality of life."],
   ["Transparent Patient Monitoring", "Your monthly laboratory investigations are performed by our independent partner, Lancet Laboratories Ghana, providing objective results that help guide your treatment and monitor your progress."],
  ],
  "poster": ["dialysis-flyer.jpg", "ADMed Specialist Clinic dialysis services flyer: monthly specialist consult, a medical doctor available during treatment, renal nutrition, iron sucrose therapy when appropriate and transparent patient monitoring. Call 024 356 0080 to book."],
  "sections": [
   {"h": "More Than Dialysis. We Care for the Whole You.", "p": [
     "Dialysis is one part of looking after your kidneys. Our team strives to treat every patient with dignity, respect, confidentiality and compassion while supporting informed decisions about their care."],
    "bullets": ["Compassionate care", "An experienced team", "Safe and reliable treatment", "Patient-centred service"]},
   {"h": "Dialysis access procedures", "p": ["Many patients need a vascular access before they can start dialysis. Our access procedures are described on their own page."], "link": ["Learn more about our Dialysis Access Procedures", "dialysis-access.html"]},
   {"h": "Your Care, Our Commitment", "p": [
     "We recognise that living with kidney disease can be challenging, and we are here to support you at every step.",
     "To enquire about our dialysis services, appointment availability, or referral requirements, please contact our clinic. All treatment arrangements are subject to clinical assessment and the availability of appropriate services and resources."]},
  ],
 },
 {
  "slug": "dialysis-access", "name": "Dialysis Access Procedures", "select": "Dialysis Access Procedures", "icon": "drop",
  "photo": "dialysis-access.jpg", "pos": "center 45%", "tile": "AV-Fistula Creation, Central Venous Catheter insertion and AV-Graft Creation for patients who need dialysis.",
  "banner": "Vascular access for dialysis: fistula, graft and catheter",
  "intro": [
   "ADMed Specialist Clinic provides the following access services for patients who need or receive haemodialysis.",
   "A vascular access is the route that lets blood leave your body and return to it during dialysis. The right choice depends on your health, your blood vessels and how soon you need treatment. Our team can explain your options and arrange the procedure at the clinic, subject to clinical assessment.",
  ],
  "offers_h": "Our access procedures include:",
  "offers": ["Central Venous Catheter (CVC) insertion", "AV Fistula (AVF) creation", "AV Graft (AVG) creation"],
  "offers_ids": ["cvc", "avf", "avg"],
  "sections": [
   {"h": "Central Venous Catheter (CVC) insertion", "id": "cvc", "p": [
     "A central venous catheter is a soft tube placed into a large vein, usually in the neck, so that blood can be taken to the dialysis machine and returned. It can be used for dialysis straight away, which makes it useful when treatment is needed urgently.",
     "Catheters are generally used for a limited time, for example while a fistula or graft is healing, or when other forms of access are not possible. Because the tube sits in a large vein, it needs to be kept clean and dry and checked regularly to lower the risk of infection."]},
   {"h": "AV Fistula (AVF) creation", "id": "avf", "p": [
     "An AV fistula is made by a small operation that joins an artery to a vein, usually in the arm. The extra blood flow makes the vein larger and stronger, so that dialysis needles can be placed in it regularly and blood can flow fast enough for effective treatment.",
     "A fistula needs several weeks to mature before it can be used, so it is best planned well before dialysis is due to start. Compared with a catheter or a graft, a fistula generally lasts longer and carries a lower risk of infection and clotting, which is why it is often called the lifeline of a dialysis patient.",
     "After the operation, a fistula should be reviewed regularly to make sure it keeps working well."], "link": ["Read our patient guide to the AV fistula", "../insight.html?id=av-fistula-guide"]},
   {"h": "AV Graft (AVG) creation", "id": "avg", "p": [
     "An AV graft works in a similar way to a fistula, but a soft artificial tube, called a graft, is used to connect the artery and the vein. The dialysis needles are placed into the graft.",
     "A graft may be considered when a patient's own blood vessels are not suitable for a fistula. Like a fistula, it needs time to heal before use and regular follow-up."]},
   {"h": "Planning your access with us", "p": [
     "If you are starting dialysis, please bring your earlier test results, any referral letter from your doctor and a list of the medicines you take, and speak to us early, as planning ahead gives you more choice."], "link": ["Learn more about our Dialysis Treatment service", "dialysis.html"]},
  ],
  "see": ["Your doctor has said you may need dialysis", "You are already on dialysis and need a new or better access", "Your current access is not working well", "You would like to understand the difference between a catheter, a fistula and a graft"],
  "emergency": "Fever, redness, swelling, severe pain or bleeding at a catheter, fistula or graft site needs urgent attention. Go to the nearest hospital or clinic.",
 },
 {
  "slug": "orthopaedic", "name": "Orthopaedic", "select": "Orthopaedic", "icon": "bone",
  "photo": "orthopedic-care.jpg", "tile": "Orthopaedic consultation for bones, joints and muscles.",
  "banner": "Orthopaedic consultation for bones, joints and muscles",
  "intro": [
   "The orthopaedic service at ADMed Specialist Clinic offers consultation for problems affecting your bones, joints and muscles. Whether the pain started with an injury or has built up over time, a specialist can find the cause and talk you through your options.",
  ],
  "offers": ["Orthopaedic consultation"],
  "sections": [
   {"h": "What is orthopaedics?", "p": ["Orthopaedics is the branch of medicine that deals with the musculoskeletal system: the bones, joints, ligaments, tendons and muscles that let you move. An orthopaedic specialist diagnoses and treats injuries and long-term conditions that affect them."]},
   {"h": "What to expect at your visit", "p": ["Your specialist will ask how the problem started and how it affects you, and will examine the affected area. If an X-ray or other tests are needed, they will explain why and what the results mean. Please bring any earlier scans, reports or medicines you take."]},
  ],
  "see": ["Joint pain, swelling or stiffness", "Pain after a fall or injury, or a suspected broken bone", "Back or neck pain that does not settle", "Difficulty walking, or reduced movement in a joint", "Muscle or tendon pain that is not improving"],
  "emergency": "A serious injury, a visibly deformed limb, or heavy bleeding needs emergency care. Go to the nearest hospital or clinic.",
 },
 {
  "slug": "gynaecology", "name": "Gynaecology", "select": "Gynaecology", "icon": "woman",
  "photo": "gynecological-care.jpg", "tile": "Gynaecology consultation: breast lumps, irregular or heavy periods, abnormal discharge, pelvic pain and painful intercourse.",
  "banner": "Know when you need a gynaecologist",
  "day": "Fridays",
  "intro": [
   "The gynaecology service at ADMed Specialist Clinic offers private, respectful consultation for women's health concerns. Our gynaecology clinic runs on Fridays.",
   "Many gynaecological problems are easier to treat when they are found early. If something is worrying you, you do not need to wait or feel embarrassed.",
  ],
  "offers": ["Gynaecology consultation", "Assessment of breast lumps", "Irregular or heavy periods", "Abnormal vaginal discharge", "Pelvic pain", "Painful intercourse"],
  "sections": [
   {"h": "What is gynaecology?", "p": ["Gynaecology is the branch of medicine that looks after the female reproductive system. A gynaecologist assesses symptoms, makes a diagnosis, and recommends treatment or further tests."]},
   {"h": "What to expect at your visit", "p": ["Your consultation is private. The specialist will ask about your symptoms and your health history, and will explain anything they would like to examine or test before going ahead. You are welcome to ask questions at any point."]},
  ],
  "see": ["A lump or change in the breast", "Irregular periods", "Heavy periods", "Abnormal discharge", "Pelvic pain", "Pain during intercourse"],
 },
 {
  "slug": "haematology", "name": "Haematology", "select": "Haematology", "icon": "drop",
  "photo": "hematology-care.jpg", "tile": "Haematologist service: anaemia, sickle cell disease, bleeding and clotting disorders, blood cancers, transfusions and iron infusions.",
  "banner": "Haematologist service",
  "intro": [
   "The haematology service at ADMed Specialist Clinic provides specialist care for conditions of the blood. Our approach is specialist-led care, accurate diagnosis and compassionate service.",
  ],
  "offers": ["Anaemia diagnosis and treatment", "Sickle cell disease management", "Bleeding and clotting disorders", "Blood cancers care", "Blood transfusion and iron infusions", "Comprehensive blood investigations"],
  "sections": [
   {"h": "What is haematology?", "p": ["Haematology is the branch of medicine that deals with the blood and the tissues that make it. A haematologist investigates blood test results and treats conditions such as anaemia, sickle cell disease, and bleeding or clotting problems."]},
   {"h": "What to expect at your visit", "p": ["Your specialist will ask about your symptoms, your family history and your treatment so far. Blood tests are often part of the assessment. Please bring any earlier blood results and a list of your medicines."]},
  ],
  "see": ["Constant tiredness, looking pale, or becoming breathless easily", "Sickle cell disease, or its pain and complications", "Easy bruising, nosebleeds or bleeding that is hard to stop", "A blood clot, or unexplained swelling in a leg", "Abnormal blood test results that need explaining", "A family history of a blood disorder"],
 },
 {
  "slug": "urology", "name": "Urology", "select": "Urology", "icon": "stetho",
  "photo": "urology-care.jpg", "tile": "Urology consultation: prostate conditions, urinary tract infections, kidney stones, painful or frequent urination, blood in urine and male sexual health.",
  "banner": "Expert care for urinary and men's health",
  "intro": [
   "The urology service at ADMed Specialist Clinic provides expert care for urinary and men's health. Many urinary problems are uncomfortable to talk about, but they are common and treatable, and our specialist consultation is private and respectful.",
  ],
  "offers": ["Urology consultation", "Prostate conditions", "Urinary tract infections (UTI)", "Kidney stones", "Painful or frequent urination", "Blood in the urine", "Male sexual health issues"],
  "sections": [
   {"h": "What is urology?", "p": ["Urology is the branch of medicine that deals with the urinary tract, in men and women, and with the male reproductive system. A urologist diagnoses and treats problems of the kidneys, bladder, prostate and related organs."]},
   {"h": "Do not ignore blood in the urine", "p": ["Seeing blood in your urine, even once and even without pain, should always be checked. It has several possible causes, and some of them need treatment."]},
   {"h": "What to expect at your visit", "p": ["Your specialist will ask about your symptoms and health history and may ask for a urine test or other investigations. They will explain the results and the treatment options in plain language."]},
  ],
  "see": ["Pain or burning when passing urine", "Passing urine very often, or a weak flow", "Blood in the urine", "Pain in the side or lower back that may be a kidney stone", "Prostate concerns", "Concerns about male sexual health"],
  "emergency": "If you cannot pass urine at all, or you have severe pain with fever, go to the nearest hospital or clinic.",
 },
 {
  "slug": "internal-medicine", "name": "Internal Medicine", "select": "Internal Medicine", "icon": "clip",
  "photo": "internal-care.jpg", "tile": "Internal medicine consultation for adults.",
  "banner": "Internal medicine consultation for adults",
  "intro": [
   "The internal medicine service at ADMed Specialist Clinic offers consultation with a physician for adults. It is a good place to start if you are unwell, if you want a general check-up, or if you are not sure which specialist you need.",
  ],
  "offers": ["Internal medicine consultation"],
  "sections": [
   {"h": "What is internal medicine?", "p": ["Internal medicine is the branch of medicine that cares for adults and the conditions that affect their organs and body systems. An internal medicine physician looks at the whole picture, diagnoses illness, manages long-term conditions, and refers you to another specialist when that is the right step."]},
   {"h": "What to expect at your visit", "p": ["Your physician will ask about your symptoms and health history, examine you, and explain what they think is going on. Please bring your ID, any previous records or test results, and a list of the medicines you take."]},
  ],
  "see": ["A fever or illness that is not getting better", "Ongoing tiredness, weight change or other symptoms you cannot explain", "A check on your blood pressure, blood sugar or general health", "Follow-up for a long-term condition", "You are not sure which specialist you need"],
 },
 {
  "slug": "physician-specialist", "name": "Physician Specialist", "select": "Physician Specialist", "icon": "users",
  "photo": "physician-consult.jpg", "pos": "center 45%", "tile": "Consultation with a physician specialist.",
  "banner": "Consultation with a physician specialist",
  "intro": [
   "The physician specialist service at ADMed Specialist Clinic gives you a consultation with a physician who has specialist training. It suits complex or long-standing conditions, referrals from another doctor, and second opinions.",
  ],
  "offers": ["Physician specialist consultation"],
  "sections": [
   {"h": "What is a physician specialist?", "p": ["A physician specialist is a doctor with additional training in a particular area of adult medicine. They take a detailed look at your condition, review your earlier results, and plan your care or refer you on when you need another service."]},
   {"h": "What to expect at your visit", "p": ["Bring any referral letter, your earlier records, test results and imaging, and a list of your medicines. These help your specialist see the full picture and avoid repeating tests."]},
  ],
  "see": ["Your doctor has referred you to a specialist", "A condition that is complex or has not improved with treatment", "You would like a second opinion", "You need an explanation of test results or a diagnosis"],
 },
 {
  "slug": "medical-laboratory", "name": "Medical Laboratory", "select": "Medical Laboratory", "icon": "flask",
  "photo": "laboratory-care.jpg", "tile": "Medical laboratory services to support your consultation.",
  "banner": "Medical laboratory services",
  "intro": [
   "The medical laboratory service at ADMed Specialist Clinic supports your care with laboratory investigations. Accurate tests help your doctor reach a diagnosis, choose the right treatment and check how well it is working.",
  ],
  "offers": ["Medical laboratory services", "Laboratory investigations requested by your doctor"],
  "sections": [
   {"h": "Getting ready for a test", "p": ["Some tests need preparation, such as not eating for a number of hours beforehand. Ask when you book, or follow the instructions your doctor gives you. Bring your test request and your ID, and let the team know about any medicines you take."]},
   {"h": "Your results", "p": ["Your doctor will explain your results and what they mean for your care. If you have a question about a result, please ask your doctor or call the clinic."]},
  ],
  "see": ["Your doctor has asked you to have laboratory tests", "You are following up on a condition and need regular monitoring", "You need tests to support a specialist consultation"],
 },
]
