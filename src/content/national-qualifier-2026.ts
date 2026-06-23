// National Qualifier (NQ) 2026 — Content Data
// Source: "National Qualifier (NQ) 2026 - Prospectus v1.pdf" (12–14 August 2026)
//
// Held alongside the 2nd HPRC Equestrian Challenge (14–16 Aug). Stabling is shared
// across both events (see InventoryManagerCamp). EFI-governed qualifier — Dressage
// & Show Jumping only, all classes age-bracketed, no Open category, no prize money.

export const nationalQualifier2026 = {
  meta: {
    title: "National Qualifier (NQ) 2026 | HPRC × TSEA — under EFI",
    description:
      "Register for the National Qualifier (NQ) 2026 — 12th to 14th August 2026 at Hyderabad Polo & Riding Club, Gandipet. Dressage & Show Jumping qualifier for JNEC 2026, under the aegis of the Equestrian Federation of India (EFI), in association with TSEA.",
  },

  event: {
    name: "National Qualifier (NQ) 2026",
    tagline: "Qualifier for JNEC 2026 — under the aegis of EFI",
    dates: "12th to 14th August 2026",
    dateRange: { start: "2026-08-12T17:00:00+05:30", end: "2026-08-14T18:00:00+05:30" },
    venue: "Hyderabad Polo & Riding Club, Gandipet, Moinabad, Ranga Reddy",
    venueAddress: "Aziznagar Survey No. 177, Gandipet, Moinabad, Ranga Reddy District, Telangana – 500074",
    govBody: "Organised by HPRC, in association with TSEA, under the aegis of EFI",
    contact: ["+91 9949000085", "+91 7799259000"],
    email: "info@hprc.co.in",
    showSecretary: { name: "Vinitha Venkateswarulu", phone: "+91 9100033323" },
    officials: [
      { role: "President (OC)", name: "Mr. Chaitania Kumar", phone: "+91 9949000085" },
      { role: "Show Secretary (OC)", name: "Ms. Vinitha Venkateswarulu", phone: "+91 9100033323" },
      { role: "TSEA Secretary", name: "Mr. Raghu Panchakarla", phone: "+91 8008213330" },
    ],
    sessions: {
      morning: "7:30 AM onwards",
      evening: "5:00 PM onwards (Under Floodlights)",
    },
    grounds: {
      ground1: "Ground 1 — Dressage",
      mainArena: "Main Arena — Practice Round & Show Jumping",
    },
  },

  stats: [
    { value: "2", label: "Disciplines" },
    { value: "8", label: "Classes" },
    { value: "3", label: "Days" },
    { value: "JNEC", label: "Qualifier for JNEC" },
  ],

  schedule: [
    {
      day: "Day 1",
      date: "Wednesday, 12 August 2026",
      sessions: [
        {
          time: "Evening · 5:00 PM",
          venue: "Main Arena",
          events: "Practice Round — 0.80–0.90 m. Two minutes from entering the course; jump in any order.",
        },
      ],
    },
    {
      day: "Day 2",
      date: "Thursday, 13 August 2026",
      sessions: [
        {
          time: "Morning · 7:30 AM",
          venue: "Ground opp. indoor riding arena",
          events: "Veterinary Check — all NQ horses (mandatory)",
        },
        {
          time: "Morning · 9:00 AM",
          venue: "Ground 1",
          events: "Dressage — Junior, Young Rider",
        },
        {
          time: "Evening · 5:00 PM",
          venue: "Main Arena",
          events: "Show Jumping — Children II, Children I, Young Rider",
        },
      ],
    },
    {
      day: "Day 3",
      date: "Friday, 14 August 2026",
      sessions: [
        {
          time: "Morning · 7:30 AM",
          venue: "Ground 1",
          events: "Dressage — Children II, Children I",
        },
        {
          time: "Followed By",
          venue: "Main Arena",
          events: "Show Jumping — Junior",
        },
      ],
    },
  ],

  // All classes are age-bracketed (no Open). `postFee` mirrors `fee` because NQ has
  // NO post-entry / spot entries — kept for structural parity with the shared form.
  events: [
    // DRESSAGE (Snaffle only — tests per EFI NQ Guidelines for JNEC 2026)
    { id: 1, discipline: "DRESSAGE", category: "Children II (10 - 12 years)", date: "14 Aug", fee: 3000, postFee: 3000, minAge: 10, maxAge: 12 },
    { id: 2, discipline: "DRESSAGE", category: "Children I (12 - 14 years)", date: "14 Aug", fee: 3000, postFee: 3000, minAge: 12, maxAge: 14 },
    { id: 3, discipline: "DRESSAGE", category: "Junior (14 - 18 years)", date: "13 Aug", fee: 3000, postFee: 3000, minAge: 14, maxAge: 18 },
    { id: 4, discipline: "DRESSAGE", category: "Young Rider (18 - 21 years)", date: "13 Aug", fee: 3000, postFee: 3000, minAge: 18, maxAge: 21 },
    // SHOW JUMPING (H/S per EFI NQ Guidelines for JNEC 2026)
    { id: 5, discipline: "SHOW JUMPING", category: "Children II (H 0.80 m / S 0.90 m)", date: "13 Aug", fee: 3000, postFee: 3000, minAge: 10, maxAge: 12 },
    { id: 6, discipline: "SHOW JUMPING", category: "Children I (H 0.90 m / S 1.05 m)", date: "13 Aug", fee: 3000, postFee: 3000, minAge: 12, maxAge: 14 },
    { id: 7, discipline: "SHOW JUMPING", category: "Junior (H 1.05 m / S 1.15 m)", date: "14 Aug", fee: 3000, postFee: 3000, minAge: 14, maxAge: 18 },
    { id: 8, discipline: "SHOW JUMPING", category: "Young Rider (H 1.15 m / S 1.30 m)", date: "13 Aug", fee: 3000, postFee: 3000, minAge: 18, maxAge: 21 },
    // PRACTICE ROUND
    { id: 9, discipline: "PRACTICE ROUND", category: "0.80 - 0.90 m (Main Arena)", date: "12 Aug", fee: 1000, postFee: 1000, minAge: 0, maxAge: 99 },
  ],

  requirements: [
    "EFI Rider ID is mandatory — entries will not be accepted without a valid EFI Rider registration.",
    "Horse EFI Passport / Registration Number is mandatory for every horse entered.",
    "Foreign nationals and OCI cardholders are NOT eligible to participate in the National Qualifier 2026.",
    "Age & Nationality Proof — Indian passport, or birth certificate + Aadhaar — must be uploaded with the entry. Entries without it will not be accepted.",
    "Entries are online only. Manual entries, post-entries and spot entries are NOT accepted.",
    "Closing Date: Entries close at 12:00 hrs (noon) on Wednesday, 12 August 2026 — the form deactivates automatically and no entries are accepted thereafter.",
    "Entry fees are non-refundable if the horse does not participate in the class.",
  ],

  // Shared camp stabling. Per-Day covers the NQ days (12–14 Aug); Full Camp (12–17
  // Aug) covers BOTH the NQ and the Equestrian Challenge in a single booking.
  stabling: {
    heading: "Stabling / Camp Details",
    description:
      "The Camp opens at noon (12:00 pm) on 12th August and closes at noon (12:00 pm) on 14th August 2026. All stable requests must be submitted via the Entry Form before 10th August 2026 along with the relevant fees. Stables are limited and allocated first-come, first-served.",
    permanentAvailable: 30,
    packages: {
      PER_DAY: {
        label: "Per-Day Stabling",
        window: "12th – 14th August",
        ratePerDay: 2500,
        total: 5000,
        from: "2026-08-12",
        to: "2026-08-14",
        note: "₹2,500 per stable per day (12th–14th August).",
      },
      FULL_CAMP: {
        label: "Full Camp",
        window: "12th – 17th August",
        ratePerDay: 2000,
        total: 10000,
        from: "2026-08-12",
        to: "2026-08-17",
        note: "₹2,000 per stable per day (12th–17th August) — covers the National Qualifier + the HPRC Equestrian Challenge together.",
      },
    },
    details: [
      "Per-Day Stabling (12–14 Aug): ₹2,500 per stable per day — ₹5,000 per stable total.",
      "Full Camp (12–17 Aug): ₹2,000 per stable per day — ₹10,000 per stable total (covers National Qualifier (NQ) + the HPRC Equestrian Challenge).",
      "Bookings are confirmed only after full charges are received for the intended number of days.",
      "Self-Containment: bring your own rations, grass, straw, fodder, and camping equipment.",
      "Teams must make their own arrangements for staff stay and food.",
    ],
  },

  declaration:
    "I declare that the details furnished above are correct to the best of my knowledge, and that the rider is an Indian national (not a foreign national or OCI cardholder). I undertake no responsibility for any loss, damage or injury that may occur for me / my son, daughter, during the course of the event/s directly or indirectly from accident or any other causes. The Hyderabad Polo & Riding Club, TSEA and EFI will not be held responsible for any first aid or other medical treatment provided.",

  importantNotes: [
    "Mandatory Veterinary Check: all NQ horses must present for the Vet Check on Thursday, 13 August at 7:30 AM (ground opposite the indoor riding arena).",
    "Horse Eligibility: horses of any grade EXCEPT Grade 1 & above in Show Jumping and Grand Prix in Dressage are eligible.",
    "Number of Entries\n\nA horse may participate only once in each category of any discipline.\nIn a day, a horse can be used in a maximum of three (3) events — 2 Dressage & 1 Show Jumping, or 2 Show Jumping & 1 Dressage.",
    "Dressage Bitting: Snaffle only, for all categories.",
    "No medals or prizes are awarded in the National Qualifier. Riders qualifying for further stages will be notified directly by EFI.",
    "Negative Coggins (Equine Infectious Anaemia) and Glanders certificates (CFT or Mallein) — valid for a minimum of 15 days prior to arrival — are mandatory. Entry is strictly denied without them.",
    "Appeals / objections: a deposit of ₹2,000 must be lodged with the Show Secretary; it is refunded if upheld.",
    "The rights of admission are reserved.",
  ],
};

export type NationalQualifierEvent = (typeof nationalQualifier2026.events)[number];
