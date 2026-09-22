// IInd Telangana State Equestrian Championship — Content Data
// Source: "IInd Telangana State Equestrian Championship - Prospectus" (16–18 October 2026)
//
// Hosted by HPRC in association with the Telangana State Equestrian Association (TSEA),
// immediately following the National Qualifier (NQ) October 2026 (14–16 Oct) at the same
// venue. Stabling shares the October camp ledger — see InventoryManagerOctCamp on the
// backend and oct-national-qualifier-2026.ts's FULL_CAMP package for the combined dates.

export const telanganaStateChampionship2026 = {
  meta: {
    title: "IInd Telangana State Equestrian Championship | Hyderabad Polo & Riding Club",
    description:
      "Register for the IInd Telangana State Equestrian Championship — 16th to 18th October 2026 at Hyderabad Polo & Riding Club, Gandipet. Hacks, Dressage & Show Jumping, hosted by HPRC in association with TSEA.",
  },

  event: {
    name: "IInd Telangana State Equestrian Championship",
    tagline: "Hosted by HPRC in association with TSEA",
    dates: "16th to 18th October 2026",
    dateRange: { start: "2026-10-16T17:00:00+05:30", end: "2026-10-18T20:00:00+05:30" },
    venue: "Hyderabad Polo & Riding Club, Gandipet, Moinabad, Ranga Reddy",
    venueAddress: "Aziznagar Sy. No. 177, Gandipet, Moinabad, Ranga Reddy, Telangana – 500074",
    govBody: "Hyderabad Polo & Riding Club (HPRC), in association with the Telangana State Equestrian Association (TSEA)",
    contact: ["+91 9949000085", "+91 7799259000"],
    email: "ridingschool@bbin.in",
    showSecretary: { name: "Vinitha Venkateswarulu", phone: "+91 9100033323" },
    sessions: {
      morning: "7:00 AM to 9:00 AM",
      evening: "4:00 PM to 8:00 PM",
    },
    grounds: {
      ground1: "Ground 1 — Hacks & Dressage",
      mainArena: "Main Arena — Practice Round & Show Jumping (40–115 cm)",
    },
  },

  // Age-as-on-calendar-year categories — per prospectus §6f. Identical table to the
  // October NQ and the Aug 2026 Equestrian Challenge (same calendar year, 2026).
  ageCategories: [
    { years: "10 - 12 years", born: "2014 - 2016", category: "Children II & Open" },
    { years: "12 - 14 years", born: "2012 - 2014", category: "Children I & Open" },
    { years: "14 - 18 years", born: "2008 - 2012", category: "Junior & Open" },
    { years: "18+ years", born: "2008 & earlier", category: "Open" },
  ],

  stats: [
    { value: "3", label: "Disciplines" },
    { value: "16", label: "Classes" },
    { value: "3", label: "Days" },
    { value: "₹20K", label: "Top Prize" },
  ],

  schedule: [
    {
      day: "Day 1",
      date: "Friday, 16 October 2026",
      sessions: [
        {
          time: "Evening · 5:00 PM",
          venue: "Main Arena",
          events: "Practice (Clear) Round — 80-90 cm. Two minutes from entering the course; riders may jump in any order.",
        },
      ],
    },
    {
      day: "Day 2",
      date: "Saturday, 17 October 2026",
      sessions: [
        {
          time: "Morning · 7:30 AM",
          venue: "Ground 1",
          events: "Dressage — Children II, Children I, Juniors",
        },
        {
          time: "Followed By",
          venue: "Ground 1",
          events: "Hacks — 12 years & Under, 13 to 16 years",
        },
        {
          time: "Evening · 4:00 PM",
          venue: "Main Arena",
          events: "Show Jumping — 40-45 cms, 100-105 cms",
        },
        {
          time: "~7:00 PM",
          venue: "Main Arena",
          events: "Prize Ceremony — On arrival of the Chief Guest",
        },
      ],
    },
    {
      day: "Day 3",
      date: "Sunday, 18 October 2026",
      sessions: [
        {
          time: "Morning · 7:00 AM",
          venue: "Main Arena",
          events: "Show Jumping — 60 cms",
        },
        {
          time: "Evening · 4:00 PM",
          venue: "Main Arena",
          events: "Show Jumping — 80-90 cms, 110-115 cms",
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
    { id: 1, discipline: "HACKS", category: "12 years & Under", date: "17 Oct", fee: 1500, postFee: 2000, minAge: 0, maxAge: 12 },
    { id: 2, discipline: "HACKS", category: "13 to 16 years", date: "17 Oct", fee: 1500, postFee: 2000, minAge: 13, maxAge: 16 },
    // DRESSAGE — per EFI National Qualifier Guidelines for JNEC 2026
    { id: 3, discipline: "DRESSAGE", category: "Children II (10 - 12 years)", date: "17 Oct", fee: 2000, postFee: 2500, minAge: 10, maxAge: 12 },
    { id: 4, discipline: "DRESSAGE", category: "Children I (12 - 14 years)", date: "17 Oct", fee: 2000, postFee: 2500, minAge: 12, maxAge: 14 },
    { id: 5, discipline: "DRESSAGE", category: "Juniors (14 - 18 years)", date: "17 Oct", fee: 2000, postFee: 2500, minAge: 14, maxAge: 18 },
    // SHOW JUMPING 40-45 cm (Table A Against the Clock, Without Jump-Off)
    { id: 6, discipline: "SHOW JUMPING", category: "Under 12 years (40-45 cm)", date: "17 Oct", fee: 2000, postFee: 2500, minAge: 0, maxAge: 11 },
    { id: 7, discipline: "SHOW JUMPING", category: "Open (40-45 cm)", date: "17 Oct", fee: 2000, postFee: 2500, minAge: 0, maxAge: 99 },
    // SHOW JUMPING 60 cm (Table A Against the Clock, Without Jump-Off)
    { id: 8, discipline: "SHOW JUMPING", category: "Under 14 years (60 cm)", date: "18 Oct", fee: 2000, postFee: 2500, minAge: 0, maxAge: 14 },
    { id: 9, discipline: "SHOW JUMPING", category: "Open (60 cm)", date: "18 Oct", fee: 2000, postFee: 2500, minAge: 0, maxAge: 99 },
    // SHOW JUMPING 80-90 cm (clear rounds stay in arena for an immediate jump-off)
    { id: 10, discipline: "SHOW JUMPING", category: "Children II (10 - 12 years) (80-90 cm)", date: "18 Oct", fee: 2000, postFee: 2500, minAge: 10, maxAge: 12 },
    { id: 11, discipline: "SHOW JUMPING", category: "Open (80-90 cm)", date: "18 Oct", fee: 2000, postFee: 2500, minAge: 0, maxAge: 99 },
    // SHOW JUMPING 100-105 cm (clear rounds stay in arena for an immediate jump-off)
    { id: 12, discipline: "SHOW JUMPING", category: "Children I (12 - 14 years) (100-105 cm)", date: "17 Oct", fee: 2000, postFee: 2500, minAge: 12, maxAge: 14 },
    { id: 13, discipline: "SHOW JUMPING", category: "Open (100-105 cm)", date: "17 Oct", fee: 2000, postFee: 2500, minAge: 0, maxAge: 99 },
    // SHOW JUMPING 110-115 cm (clear rounds stay in arena for an immediate jump-off)
    { id: 14, discipline: "SHOW JUMPING", category: "Juniors (14 - 18 years) (110-115 cm)", date: "18 Oct", fee: 2000, postFee: 2500, minAge: 14, maxAge: 18 },
    { id: 15, discipline: "SHOW JUMPING", category: "Open (110-115 cm)", date: "18 Oct", fee: 2000, postFee: 2500, minAge: 0, maxAge: 99 },
    // PRACTICE ROUND
    { id: 16, discipline: "PRACTICE ROUND", category: "80-90 cm (Main Arena)", date: "16 Oct", fee: 1000, postFee: 1000, minAge: 0, maxAge: 99 },
  ],

  // Height-based concurrency: the age category and the Open category at the same
  // height run concurrently — a rider in both jumps a single round scored for both.
  prizeMoney: {
    note: "Prize money is awarded to Open category participants only in the 80-90 cms, 100-105 cms and 110-115 cms Show Jumping classes, provided there are a minimum of six riders in that category. The 40-45 cms and 60 cms classes and all age-category classes (Children I, Children II, Junior) receive medals and certificates only.",
    table: [
      { height: "110-115 cms (Open)", gold: 20000, silver: 10000, bronze: 7500, fourth: 5000 },
      { height: "100-105 cms (Open)", gold: 15000, silver: 7500, bronze: 5000, fourth: 2500 },
      { height: "80-90 cms (Open)", gold: 15000, silver: 7500, bronze: 5000, fourth: 2500 },
    ],
  },

  requirements: [
    "Closing Date: Entries close at 18:00 hrs (6 pm) on Thursday, 15 October 2026, after which entries are considered Post-Entries.",
    "Post-Entries: Accepted until 12:00 hrs (noon) on Friday, 16 October 2026. Spot entries are accepted no later than one hour before the start of the event.",
    "Age-specific Categories: A copy of the rider's birth certificate is mandatory, with the rider's age clearly indicated on the entry form. Entries for age-specific categories will not be accepted without it.",
    "Age Rule: A rider competes as the age they are turning in the calendar year (2026), regardless of birth month.",
    "Entry Forms along with full entry fees must be submitted online.",
    "Entries received without supporting documents or fees will not be accepted.",
    "Entry fees are non-refundable if the horse does not participate in the class.",
  ],

  // Three packages sharing the October camp ledger with the National Qualifier
  // (InventoryManagerOctCamp, 14–19 Oct window). FULL_CAMP mirrors the NQ page's
  // own Full Camp package exactly (same total, same dates) — booking either one
  // covers both events, and a confirmed NQ Full Camp booking is recalled on this
  // page so riders aren't charged twice.
  stabling: {
    heading: "Stabling / Camp Details",
    description:
      "Stables are limited and allocated on a first-come, first-served basis. All teams must be self-contained — bring your own rations, grass, straw, fodder and camping equipment, and make your own arrangements for staff stay and food.",
    permanentAvailable: 30,
    packages: {
      PERMANENT: {
        label: "Permanent Stable · 16–19 Oct",
        window: "16th – 19th October",
        ratePerDay: null,
        total: 7500,
        from: "2026-10-16",
        to: "2026-10-19",
        note: "₹7,500 per stable for the Championship dates.",
      },
      TEMPORARY: {
        label: "Temporary Stable · 16–19 Oct",
        window: "16th – 19th October",
        ratePerDay: null,
        total: 3000,
        from: "2026-10-16",
        to: "2026-10-19",
        note: "₹3,000 per stable for the Championship dates.",
      },
      FULL_CAMP: {
        label: "NQ + Championship · 14–19 Oct",
        window: "14th – 19th October",
        ratePerDay: null,
        total: 10000,
        from: "2026-10-14",
        to: "2026-10-19",
        note: "₹10,000 per stable — covers the National Qualifier 2026 and the State Championship, combined.",
      },
    },
    details: [
      "Permanent Stable (16–19 Oct): ₹7,500 per stable for the Championship dates.",
      "Temporary Stable (16–19 Oct): ₹3,000 per stable for the Championship dates.",
      "NQ + Championship Full Camp (14–19 Oct): ₹10,000 per stable — covers both events combined.",
      "Stable bookings are confirmed only after receiving the full charges for the intended number of days.",
      "Self-Containment: bring your own rations, grass, straw, fodder, and equipment for camping.",
      "Teams must make their own arrangements for staff stay and food.",
    ],
  },

  declaration:
    "I declare that the details furnished above are correct to the best of my knowledge. I undertake no responsibility for any loss, damage or injury that may occur for me / my son, daughter, during the course of the event/s directly or indirectly from accident or any other causes. The Hyderabad Polo & Riding Club will not be held responsible for any first aid or other medical treatment provided.",

  importantNotes: [
    "Number of Entries\n\nA horse may participate only once in each category within a given event or discipline.\nDay 1 & Day 3: maximum two (2) entries per horse per day.\nDay 2: up to three (3) entries per horse — 2 Dressage & 1 Show Jumping, or 2 Show Jumping & 1 Dressage — plus one (1) additional Hacks entry is permitted on the horse.",
    "Hacks classes are open ONLY to riders who are not participating in any other event or discipline.",
    "40-45 cms and 60 cms classes are conducted in the Table A Against the Clock, Without Jump-Off (FEI Art. 238.2.1) format.",
    "80-90 cms, 100-105 cms and 110-115 cms: clear rounds stay in the arena for an immediate jump-off. If more than 30 entries are received in any class, that class will instead be conducted in the Table A Against the Clock, Without Jump-Off format.",
    "The age and Open categories at the same height run concurrently — riders entering both jump a single round, scored in both categories.",
    "Teams must collect their assigned HPRC Horse ID tags upon arrival. This tag must be visibly displayed on the horse throughout the event and returned prior to the issuance of the Clearance Certificate. Unreturned or lost tags will incur a replacement fee.",
    "Appropriate EFI dress code must be followed for all events. Non-compliance may result in disqualification.",
    "Negative Coggins (Equine Infectious Anaemia) and Glanders test certificates (CFT or Mallein) — valid for a minimum of 15 days prior to arrival — are mandatory for all horses. Entry will be strictly denied without them.",
    "Appeals / objections: a deposit of ₹2,000 must be lodged with the Show Secretary; it is refunded if the appeal is upheld.",
    "Prize Distribution Ceremony: Saturday & Sunday at ~7:00 PM, on arrival of the Chief Guest.",
    "The rights of admission are reserved.",
  ],
};

export type TelanganaChampionshipEvent = (typeof telanganaStateChampionship2026.events)[number];
