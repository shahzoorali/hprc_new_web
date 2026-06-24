// 2nd HPRC Equestrian Challenge 2026 — August Season — Content Data
// Source: "HPRC Equestrian Challenge Aug 2026 Prospectus v1-2.pdf" (14–16 August 2026)
//
// NOTE: This is the August edition. The inaugural (May) edition lives in
// equestrian-challenge-2026.ts. This file is fully self-contained so the two
// events stay independent (separate slug, separate payment backend: ecaug2026).

export const equestrianChallengeAug2026 = {
  meta: {
    title: "2nd HPRC Equestrian Challenge 2026 — August Season | Hyderabad Polo & Riding Club",
    description:
      "Register for the 2nd HPRC Equestrian Challenge 2026 (August Season) — 14th to 16th August 2026 at Hyderabad Polo & Riding Club, Gandipet. Hacks, Dressage & Show Jumping across all age categories, with a beginner-friendly 40 cm class.",
  },

  event: {
    name: "2nd HPRC Equestrian Challenge 2026",
    tagline: "The 2nd HPRC Equestrian Challenge — August Season",
    dates: "14th to 16th August 2026",
    dateRange: { start: "2026-08-14T17:00:00+05:30", end: "2026-08-16T20:00:00+05:30" },
    venue: "Hyderabad Polo & Riding Club, Gandipet, Moinabad, Ranga Reddy",
    venueAddress: "Moinabad Road, Aziznagar, Hyderabad, Telangana 500075",
    govBody: "Organised by HPRC",
    contact: ["+91 9949000085", "+91 7799259000"],
    email: "ridingschool@bbin.in",
    showSecretary: { name: "Vinitha Venkateswarulu", phone: "+91 9100033323" },
    sessions: {
      morning: "7:00 AM to 9:00 AM",
      evening: "5:00 PM to 8:00 PM (Under Floodlights)",
    },
    grounds: {
      ground1: "Ground 1 — Hacks & Dressage",
      mainArena: "Main Arena — Practice Round & Show Jumping (40–110 cm)",
    },
  },

  stats: [
    { value: "3", label: "Disciplines" },
    { value: "15", label: "Classes" },
    { value: "3", label: "Days" },
    { value: "₹25K", label: "Top Prize" },
  ],

  schedule: [
    {
      day: "Day 1",
      date: "Friday, 14 August 2026",
      sessions: [
        {
          time: "Evening · 5:00 PM",
          venue: "Main Arena",
          events: "Practice (Clear) Round — 80–90 cm. Two minutes from entering the course; jump in any order.",
        },
      ],
    },
    {
      day: "Day 2",
      date: "Saturday, 15 August 2026",
      sessions: [
        {
          time: "Morning · 7:00 AM",
          venue: "Ground 1",
          events: "Hacks — 12 years & Under, 13 to 16 years",
        },
        {
          time: "Followed By",
          venue: "Ground 1",
          events: "Dressage — Children II, Children I, Juniors",
        },
        {
          time: "Evening · 5:00 PM",
          venue: "Main Arena",
          events: "Show Jumping — 80 cm, 90 cm",
        },
      ],
    },
    {
      day: "Day 3",
      date: "Sunday, 16 August 2026",
      sessions: [
        {
          time: "Morning · 7:00 AM",
          venue: "Main Arena",
          events: "Show Jumping — 60 cm",
        },
        {
          time: "Evening · 5:00 PM",
          venue: "Main Arena",
          events: "Show Jumping — 40 cm, 105–110 cm (Two-phase)",
        },
        {
          time: "~7:00 PM",
          venue: "Main Arena",
          events: "Prize Ceremony — On arrival of the Chief Guest",
        },
      ],
    },
  ],

  // Each event has: fee (standard) and postFee (post-entry). Surcharge = postFee - fee.
  events: [
    // HACKS — open ONLY to riders not participating in any other event/discipline
    { id: 1, discipline: "HACKS", category: "12 years & Under", date: "15 Aug", fee: 1500, postFee: 2000, minAge: 0, maxAge: 12 },
    { id: 2, discipline: "HACKS", category: "13 to 16 years", date: "15 Aug", fee: 1500, postFee: 2000, minAge: 13, maxAge: 16 },
    // DRESSAGE — per EFI National Qualifier Guidelines for JNEC 2026
    { id: 3, discipline: "DRESSAGE", category: "Children II (10 - 12 years)", date: "15 Aug", fee: 2000, postFee: 2500, minAge: 10, maxAge: 12 },
    { id: 4, discipline: "DRESSAGE", category: "Children I (12 - 14 years)", date: "15 Aug", fee: 2000, postFee: 2500, minAge: 12, maxAge: 14 },
    { id: 5, discipline: "DRESSAGE", category: "Juniors (14 - 18 years)", date: "15 Aug", fee: 2000, postFee: 2500, minAge: 14, maxAge: 18 },
    // SHOW JUMPING 40 cm
    { id: 6, discipline: "SHOW JUMPING", category: "Under 12 years (40 cm)", date: "16 Aug", fee: 2000, postFee: 2500, minAge: 0, maxAge: 11 },
    { id: 7, discipline: "SHOW JUMPING", category: "Open (40 cm)", date: "16 Aug", fee: 2000, postFee: 2500, minAge: 0, maxAge: 99 },
    // SHOW JUMPING 60 cm
    { id: 8, discipline: "SHOW JUMPING", category: "Under 14 years (60 cm)", date: "16 Aug", fee: 2000, postFee: 2500, minAge: 0, maxAge: 14 },
    { id: 9, discipline: "SHOW JUMPING", category: "Open (60 cm)", date: "16 Aug", fee: 2000, postFee: 2500, minAge: 0, maxAge: 99 },
    // SHOW JUMPING 80 cm (clear rounds stay in arena for an immediate jump-off)
    { id: 10, discipline: "SHOW JUMPING", category: "Children II (10 - 12 years) (80 cm)", date: "15 Aug", fee: 2000, postFee: 2500, minAge: 10, maxAge: 12 },
    { id: 11, discipline: "SHOW JUMPING", category: "Open (80 cm)", date: "15 Aug", fee: 2000, postFee: 2500, minAge: 0, maxAge: 99 },
    // SHOW JUMPING 90 cm (clear rounds stay in arena for an immediate jump-off)
    { id: 12, discipline: "SHOW JUMPING", category: "Children I (12 - 14 years) (90 cm)", date: "15 Aug", fee: 2000, postFee: 2500, minAge: 12, maxAge: 14 },
    { id: 13, discipline: "SHOW JUMPING", category: "Open (90 cm)", date: "15 Aug", fee: 2000, postFee: 2500, minAge: 0, maxAge: 99 },
    // SHOW JUMPING 105–110 cm (Two-phase)
    { id: 14, discipline: "SHOW JUMPING", category: "Juniors (14 - 18 years) (105 - 110 cm)", date: "16 Aug", fee: 2000, postFee: 2500, minAge: 14, maxAge: 18 },
    { id: 15, discipline: "SHOW JUMPING", category: "Open (105 - 110 cm) (Two-phase)", date: "16 Aug", fee: 2000, postFee: 2500, minAge: 0, maxAge: 99 },
    // PRACTICE ROUND
    { id: 16, discipline: "PRACTICE ROUND", category: "80 - 90 cm (Main Arena)", date: "14 Aug", fee: 1000, postFee: 1000, minAge: 0, maxAge: 99 },
  ],

  // Height-based concurrency: the age category and the Open category at the same
  // height run concurrently — a rider in both jumps a single round scored for both.
  prizeMoney: {
    note: "Prize money is awarded to Open category participants only in the 80 cm, 90 cm and 105–110 cm Show Jumping classes, provided there are a minimum of six riders in that category. The 40 cm and 60 cm classes and all age-category classes (Children I, Children II, Junior) receive medals and certificates only.",
    table: [
      { height: "105 - 110 cm (Open)", gold: 25000, silver: 15000, bronze: 10000, fourth: 5000 },
      { height: "90 cm (Open)", gold: 10000, silver: 7500, bronze: 5000, fourth: 2500 },
      { height: "80 cm (Open)", gold: 7500, silver: 5000, bronze: 3000, fourth: 1500 },
    ],
  },

  requirements: [
    "Closing Date: Entries close at 18:00 hrs (6 PM) on Thursday, 13 August 2026. Entries after this time are treated as Post-Entries.",
    "Post-Entries: Accepted only until 12:00 hrs (noon) on Friday, 14 August 2026, at the higher Post-Entry fee.",
    "Age-specific Categories: A copy of the rider's birth certificate is mandatory and must be uploaded with the entry form. Entries without it will not be accepted.",
    "Age Rule: A rider competes as the age they are turning in the calendar year (2026), regardless of birth month.",
    "Entry Forms along with full entry fees must be submitted online.",
    "Entries received without supporting documents or fees will not be accepted.",
    "Entry fees are non-refundable if the horse does not participate in the class.",
  ],

  // Two stabling packages per the prospectus. Date windows are fixed per package.
  stabling: {
    heading: "Stabling / Camp Details",
    description:
      "The Camp opens at noon (12:00 pm) on 14th August and closes at noon (12:00 pm) on 17th August 2026. All stable requests must be submitted via the Entry Form before 10th August 2026 along with the relevant fees. Stables are limited and allocated on a first-come, first-served basis.",
    permanentAvailable: 30,
    packages: {
      PER_DAY: {
        label: "Per-Day Stabling",
        window: "14th – 17th August",
        ratePerDay: 2500,
        total: 7500,
        from: "2026-08-14",
        to: "2026-08-17",
        note: "₹2,500 per stable per day (14th–17th August).",
      },
      FULL_CAMP: {
        label: "Full Camp",
        window: "12th – 17th August",
        ratePerDay: 2000,
        total: 10000,
        from: "2026-08-12",
        to: "2026-08-17",
        note: "₹2,000 per stable per day (12th–17th August) — covers the National Qualifier 2026 + the Equestrian Challenge.",
      },
    },
    details: [
      "Per-Day Stabling (14–17 Aug): ₹2,500 per stable per day — ₹7,500 per stable total.",
      "Full Camp (12–17 Aug): ₹2,000 per stable per day — ₹10,000 per stable total (National Qualifier + Equestrian Challenge).",
      "Bookings are confirmed only after full charges are received for the intended number of days.",
      "Self-Containment: bring your own rations, grass, straw, fodder, and camping equipment.",
      "Teams must make their own arrangements for staff stay and food.",
    ],
  },

  declaration:
    "I declare that the details furnished above are correct to the best of my knowledge. I undertake no responsibility for any loss, damage or injury that may occur for me / my son, daughter, during the course of the event/s directly or indirectly from accident or any other causes. The Hyderabad Polo & Riding Club will not be held responsible for any first aid or other medical treatment provided.",

  importantNotes: [
    "Number of Entries\n\nA horse may participate only once in each category within a given event or discipline.\nDay 1 & Day 3: maximum two (2) entries per horse per day.\nDay 2: up to three (3) entries per horse — 2 Dressage & 1 Show Jumping, or 2 Show Jumping & 1 Dressage — plus one (1) additional Hacks entry is permitted on the horse.",
    "Hacks classes are open ONLY to riders who are not participating in any other event or discipline.",
    "If more than 30 entries are received in any class, that class will be conducted in the Two-phase format.",
    "Appropriate EFI dress code must be followed for all events. Non-compliance may result in disqualification.",
    "Negative Coggins (Equine Infectious Anaemia) and Glanders test certificates (CFT or Mallein) — valid for a minimum of 15 days prior to arrival — are mandatory for all horses. Entry will be strictly denied without them.",
    "Appeals / objections: a deposit of ₹2,000 must be lodged with the Show Secretary; it is refunded if the appeal is upheld.",
    "Prize Distribution Ceremony: Sunday, 16th August at ~7:00 PM, on arrival of the Chief Guest.",
    "The rights of admission are reserved.",
  ],
};

export type EquestrianAugEvent = (typeof equestrianChallengeAug2026.events)[number];
