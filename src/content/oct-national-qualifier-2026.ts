// National Qualifier (NQ) October 2026 — Content Data
// Source: Official October 2026 Prospectus (14–16 October 2026)
//
// EFI-governed qualifier — Dressage & Show Jumping only, all classes age-bracketed,
// no Open category, no prize money. Isolated stabling camp for October 2026.

export const nationalQualifierOct2026 = {
  meta: {
    title: "National Qualifier (NQ) October 2026 | HPRC × TSEA — under EFI",
    description:
      "Register for the National Qualifier (NQ) 2026 — 14th to 16th October 2026 at Hyderabad Polo & Riding Club, Gandipet. Dressage & Show Jumping qualifier for JNEC 2026, under the aegis of the Equestrian Federation of India (EFI), in association with TSEA.",
  },

  event: {
    name: "National Qualifier (NQ) October 2026",
    tagline: "Qualifier for JNEC 2026 — under the aegis of EFI",
    dates: "14th to 16th October 2026",
    dateRange: { start: "2026-10-14T17:00:00+05:30", end: "2026-10-16T18:00:00+05:30" },
    closingDate: "2026-10-13T23:59:59+05:30",
    venue: "Hyderabad Polo & Riding Club, Gandipet, Moinabad, Ranga Reddy",
    venueAddress: "Aziznagar Survey No. 177, Gandipet, Moinabad, Ranga Reddy, Telangana 500074",
    govBody: "Organised by HPRC, in association with TSEA, under the aegis of EFI",
    contact: ["+91 9949000085", "+91 7799259000"],
    email: "info@hprc.co.in",
    showSecretary: { name: "Ms. Vinitha Venkateswarulu", phone: "+91 9100033323" },
    officials: [
      { role: "President (OC)", name: "Mr. Chaitania Kumar", phone: "+91 9949000085" },
      { role: "Show Secretary (OC)", name: "Ms. Vinitha Venkateswarulu", phone: "+91 9100033323" },
      { role: "TSEA Secretary", name: "Mr. Raghu Panchakarla", phone: "+91 8008213330" },
    ],
    sessions: {
      morning: "7:30 AM onwards",
      evening: "5:00 PM onwards",
    },
    grounds: {
      ground1: "Ground 1 — Dressage",
      mainArena: "Main Arena — Practice Round & Show Jumping",
    },
  },

  // Age-as-on-1-Jan (FEI-style) categories — per prospectus §2.
  ageCategories: [
    { years: "10 - 12 years", born: "2014 - 2016", category: "Children II" },
    { years: "12 - 14 years", born: "2012 - 2014", category: "Children I" },
    { years: "14 - 18 years", born: "2008 - 2012", category: "Junior" },
    { years: "16 - 21 years", born: "2005 - 2010", category: "Young Rider" },
  ],

  stats: [
    { value: "2", label: "Disciplines" },
    { value: "8", label: "Classes" },
    { value: "3", label: "Days" },
    { value: "JNEC", label: "Qualifier for JNEC" },
  ],

  schedule: [
    {
      day: "Day 1",
      date: "Wednesday, 14 October 2026",
      sessions: [
        {
          time: "Evening · 5:00 PM",
          venue: "Main Arena",
          events: "Practice (Clear) Round — 0.80–0.90 m. Two minutes from entering the course; jump in any order.",
        },
      ],
    },
    {
      day: "Day 2",
      date: "Thursday, 15 October 2026",
      sessions: [
        {
          time: "Morning · 7:30 AM",
          venue: "Ground opp. indoor riding arena",
          events: "Horse Inspection — all NQ horses (mandatory)",
        },
        {
          time: "Morning · 9:00 AM",
          venue: "Ground 1",
          events: "Dressage — Junior, Young Rider",
        },
        {
          time: "Evening · 5:00 PM",
          venue: "Main Arena",
          events: "Show Jumping — Children II, Children I",
        },
      ],
    },
    {
      day: "Day 3",
      date: "Friday, 16 October 2026",
      sessions: [
        {
          time: "Morning · 7:30 AM",
          venue: "Ground 1",
          events: "Dressage — Children II, Children I",
        },
        {
          time: "Followed By",
          venue: "Main Arena",
          events: "Show Jumping — Young Rider, Junior",
        },
      ],
    },
  ],

  events: [
    // DRESSAGE (Snaffle only — tests per EFI NQ Guidelines for JNEC 2026)
    { id: 1, discipline: "DRESSAGE", category: "Children II (10 - 12 years)", date: "16 Oct", fee: 3000, postFee: 3000, minAge: 10, maxAge: 12, ageGroup: "CHILD_II" },
    { id: 2, discipline: "DRESSAGE", category: "Children I (12 - 14 years)", date: "16 Oct", fee: 3000, postFee: 3000, minAge: 12, maxAge: 14, ageGroup: "CHILD_I" },
    { id: 3, discipline: "DRESSAGE", category: "Junior (14 - 18 years)", date: "15 Oct", fee: 3000, postFee: 3000, minAge: 14, maxAge: 18, ageGroup: "JUNIOR" },
    { id: 4, discipline: "DRESSAGE", category: "Young Rider (16 - 21 years)", date: "15 Oct", fee: 3000, postFee: 3000, minAge: 16, maxAge: 21, ageGroup: "YOUNG_RIDER" },
    // SHOW JUMPING (H/S per EFI NQ Guidelines for JNEC 2026)
    { id: 5, discipline: "SHOW JUMPING", category: "Children II (H 0.80 m / S 0.90 m)", date: "15 Oct", fee: 3000, postFee: 3000, minAge: 10, maxAge: 12, ageGroup: "CHILD_II" },
    { id: 6, discipline: "SHOW JUMPING", category: "Children I (H 0.90 m / S 1.05 m)", date: "15 Oct", fee: 3000, postFee: 3000, minAge: 12, maxAge: 14, ageGroup: "CHILD_I" },
    { id: 7, discipline: "SHOW JUMPING", category: "Junior (H 1.05 m / S 1.15 m)", date: "16 Oct", fee: 3000, postFee: 3000, minAge: 14, maxAge: 18, ageGroup: "JUNIOR" },
    { id: 8, discipline: "SHOW JUMPING", category: "Young Rider (H 1.15 m / S 1.30 m)", date: "16 Oct", fee: 3000, postFee: 3000, minAge: 16, maxAge: 21, ageGroup: "YOUNG_RIDER" },
    // PRACTICE ROUND
    { id: 9, discipline: "PRACTICE ROUND", category: "0.80 - 0.90 m (Main Arena)", date: "14 Oct", fee: 1000, postFee: 1000, minAge: 0, maxAge: 99 },
  ],

  requirements: [
    "EFI Rider ID is mandatory — entries will not be accepted without a valid EFI Rider registration.",
    "Horse EFI Passport / Registration Number is mandatory for every horse entered.",
    "Foreign nationals and OCI cardholders are NOT eligible to participate in the National Qualifier 2026.",
    "Age & Nationality Proof — Indian passport, or birth certificate + Aadhaar — must be uploaded with the entry. Entries without it will not be accepted.",
    "Entries are online only. Manual entries, post-entries and spot entries are NOT accepted.",
    "Closing Date: Entries close at 23:59 hrs on Tuesday, 13 October 2026 — the form deactivates automatically and no entries are accepted thereafter.",
    "Entry fees are non-refundable if the horse does not participate in the class.",
  ],

  stabling: {
    heading: "Permanent Stable Fee per horse",
    description:
      "The Camp will open at noon (12:00 pm) on October 14th and close at noon (12:00 pm) on October 16th, 2026. All stable requests must be submitted before October 12th, 2026 along with the relevant stable fees. Stables are limited and will be allocated on a first-come, first-served basis.",
    permanentAvailable: 30,
    packages: {
      EARLY_ARRIVAL: {
        label: "Earlier than October 14th",
        window: "Before 14th October",
        ratePerDay: 2500,
        total: null,
        from: "",
        to: "2026-10-14",
        note: "₹2,500 per stable per day.",
      },
      NQ_DATES: {
        label: "NQ Dates",
        window: "14th to 16th October",
        ratePerDay: null,
        total: 4000,
        from: "2026-10-14",
        to: "2026-10-16",
        note: "₹4,000 per stable for the duration.",
      },
      FULL_CAMP: {
        label: "Full Camp",
        window: "14th – 19th October",
        ratePerDay: null,
        total: 10000,
        from: "2026-10-14",
        to: "2026-10-19",
        note: "₹10,000 per stable for the duration — covers the National Qualifier 2026 & the TSEA State Equestrian Championship (from 16th to 18th October), combined.",
      },
    },
    details: [
      "Earlier than October 14th, 2026: ₹2,500 per stable per day.",
      "NQ Dates (October 14th to 16th, 2026): ₹4,000 for duration.",
      "Full Camp (October 14th to 19th, 2026): ₹10,000 for duration — covers the National Qualifier 2026 & the TSEA State Equestrian Championship (from 16th to 18th October), combined.",
      "Bookings are confirmed only after full charges are received for the intended number of days.",
      "Self-Containment: bring your own rations, grass, straw, fodder, and camping equipment.",
      "Teams must make their own arrangements for staff stay and food.",
    ],
  },

  declaration:
    "I declare that the details furnished above are correct to the best of my knowledge, and that the rider is an Indian national (not a foreign national or OCI cardholder). I undertake no responsibility for any loss, damage or injury that may occur for me / my son, daughter, during the course of the event/s directly or indirectly from accident or any other causes. The Hyderabad Polo & Riding Club, TSEA and EFI will not be held responsible for any first aid or other medical treatment provided.",

  importantNotes: [
    "Mandatory Horse Inspection: all NQ horses must present for the Horse Inspection on Thursday, 15 October at 7:30 AM (ground opposite the indoor riding arena). Following completion of the Horse Inspection, only the registered participant may ride or mount the horse for the remainder of the event.",
    "Horse Eligibility: horses from any grade except for Grade 1 and above in Show Jumping and Grand Prix in Dressage are eligible for entering NQs.",
    "Number of Entries\n\nA horse can participate only once in each category of any discipline.\nIn a day, a horse can be used in a total of three (3) events only — 2 Dressage & 1 Show Jumping, or 2 Show Jumping & 1 Dressage.",
    "Riders may enter up to two horses in each NQ event (Dressage or Show Jumping).",
    "Age Category Overlap: riders can choose to compete in only one of the categories for which they are eligible based on their age — e.g. a 12-year-old may compete in Children I or Children II, but not both, and a 16–18-year-old may compete in Junior or Young Rider, but not both. Once chosen, riders must stay in that ONE category for every event they enter — mixing categories across disciplines is not permitted.",
    "Dressage Bitting: Snaffle only, for all categories.",
    "Show Jumping Course Walk: the course will be closed for walk by riders and their coaches 20 minutes before the start of the category.",
    "Reporting for Each Class: the first two riders in the event / category must report to the Arena Steward at least five (5) minutes before the scheduled start of that event. Any horse not reported in time can be eliminated unless the rider shows good cause for the delay.",
    "Whips/Spurs/Bits: as per EFI and relevant FEI rules.",
    "Apparel: all riders must comply with EFI and FEI Dress Code Regulations for that discipline during the event. Non-compliance will result in disqualification.",
    "No medals or prizes are awarded in the National Qualifier. Riders qualifying for further stages will be notified directly by EFI.",
    "Negative Coggins (Equine Infectious Anemia) and Glanders certificates (CFT or Mallein) — valid for a minimum of 15 days prior to arrival — are mandatory. Entry is strictly denied without them.",
    "Appeals / objections: a deposit of ₹2,000 must be lodged with the Show Secretary; it is refunded if upheld.",
    "The rights of admission are reserved.",
  ],
};

export type NationalQualifierOctEvent = (typeof nationalQualifierOct2026.events)[number];
