// HPRC Equestrian Challenge 2026 — Content Data
// Source: Entry Form, External Notice, Member Notice (rfq-2 folder)

export const equestrianChallenge2026 = {
  meta: {
    title: "HPRC Equestrian Challenge 2026 | Hyderabad Polo & Riding Club",
    description:
      "Register for the inaugural HPRC Equestrian Challenge 2026 — 16th & 17th May 2026 at Hyderabad Polo & Riding Club, Gandipet. Hacks, Dressage, Show Jumping & Top Score events.",
  },

  event: {
    name: "HPRC Equestrian Challenge 2026",
    tagline: "The Inaugural HPRC Equestrian Challenge",
    dates: "16th & 17th May 2026",
    dateRange: { start: "2026-05-16T07:00:00+05:30", end: "2026-05-17T20:00:00+05:30" },
    venue: "Hyderabad Polo & Riding Club, Gandipet, Moinabad, Ranga Reddy",
    venueAddress: "Aziznagar Survey No. 177, Gandipet, Moinabad, Ranga Reddy District, Telangana – 500074",
    govBody: "Organised by HPRC",
    contact: ["+91 9949000085", "+91 9177000056", "+91 7799259000"],
    email: "ridingschool@bbin.in",
    sessions: {
      morning: "7:00 AM to 9:00 AM",
      evening: "5:00 PM to 8:00 PM (Under Floodlights)",
    },
    grounds: {
      ground1: "Ground 1 — Hacks, Dressage, 40 cm and 60 cm Show Jumping",
      mainArena: "Main Arena — 80 cm, 90 cm, 105 cm Show Jumping, Two-Phase (105-110 cm) & Top Score",
    },
  },

  stats: [
    { value: "4", label: "Disciplines" },
    { value: "19", label: "Classes" },
    { value: "2", label: "Days" },
    { value: "₹10K", label: "Top Prize" },
  ],

  schedule: [
    {
      day: "Day 1",
      date: "Saturday, 16 May 2026",
      sessions: [
        {
          time: "Morning · 7:00 AM",
          venue: "Ground 1",
          events: "Hacks — 10 years & Under, 11 to 15 years",
        },
        {
          time: "Followed By",
          venue: "Ground 1",
          events: "Dressage — Children II, Children I, Juniors",
        },
        {
          time: "Evening · 5:00 PM",
          venue: "Ground 1",
          events: "Show Jumping — 40 cm, 60 cm",
        },
        {
          time: "Followed By",
          venue: "Main Arena",
          events: "Show Jumping — 80 cm",
        },
      ],
    },
    {
      day: "Day 2",
      date: "Sunday, 17 May 2026",
      sessions: [
        {
          time: "Morning · 7:00 AM",
          venue: "Main Arena",
          events: "Show Jumping — 90 cm, 105 cm",
        },
        {
          time: "Evening · 5:00 PM",
          venue: "Main Arena",
          events: "Show Jumping — Two-Phase (105 - 110 cm)",
        },
        {
          time: "Followed By",
          venue: "Main Arena",
          events: "Top Score — 14 years & Below, 14+ years (Open)",
        },
        {
          time: "~7:30 PM",
          venue: "Main Arena",
          events: "Prize Ceremony — Upon Arrival of the Chief Guest",
        },
      ],
    },
  ],

  events: [
    // HACKS
    { id: 1, discipline: "HACKS", category: "10 years & Under", date: "16 May", fee: 1500, minAge: 0, maxAge: 10 },
    { id: 2, discipline: "HACKS", category: "11 to 15 years", date: "16 May", fee: 1500, minAge: 11, maxAge: 15 },
    // DRESSAGE
    { id: 3, discipline: "DRESSAGE", category: "Children II (10 - 12 years)", date: "16 May", fee: 2000, minAge: 10, maxAge: 12 },
    { id: 4, discipline: "DRESSAGE", category: "Children I (12 - 14 years)", date: "16 May", fee: 2000, minAge: 12, maxAge: 14 },
    { id: 5, discipline: "DRESSAGE", category: "Juniors (14 - 18 years)", date: "16 May", fee: 2000, minAge: 14, maxAge: 18 },
    // SHOW JUMPING 40 cm
    { id: 6, discipline: "SHOW JUMPING", category: "Under 12 years (40 cm)", date: "16 May", fee: 2000, minAge: 0, maxAge: 11 },
    { id: 8, discipline: "SHOW JUMPING", category: "Open (40 cm)", date: "16 May", fee: 2000, minAge: 0, maxAge: 99 },
    // SHOW JUMPING 60 cm
    { id: 9, discipline: "SHOW JUMPING", category: "Under 14 years (60 cm)", date: "16 May", fee: 2000, minAge: 0, maxAge: 13 },
    { id: 11, discipline: "SHOW JUMPING", category: "Open (60 cm)", date: "16 May", fee: 2000, minAge: 0, maxAge: 99 },
    // SHOW JUMPING 80 cm
    { id: 12, discipline: "SHOW JUMPING", category: "Children II (10 - 12 years) (80 cm)", date: "16 May", fee: 2000, minAge: 10, maxAge: 12 },
    { id: 13, discipline: "SHOW JUMPING", category: "Open (80 cm)", date: "16 May", fee: 2000, minAge: 0, maxAge: 99 },
    // SHOW JUMPING 90 cm
    { id: 14, discipline: "SHOW JUMPING", category: "Children I (12 - 14 years) (90 cm)", date: "17 May", fee: 2000, minAge: 12, maxAge: 14 },
    { id: 15, discipline: "SHOW JUMPING", category: "Open (90 cm)", date: "17 May", fee: 2000, minAge: 0, maxAge: 99 },
    // SHOW JUMPING 105 cm
    { id: 16, discipline: "SHOW JUMPING", category: "Juniors (14 - 18 years) (105 cm)", date: "17 May", fee: 2000, minAge: 14, maxAge: 18 },
    { id: 17, discipline: "SHOW JUMPING", category: "Open (105 cm)", date: "17 May", fee: 2000, minAge: 0, maxAge: 99 },
    // SHOW JUMPING Two-Phase
    { id: 20, discipline: "SHOW JUMPING", category: "Two-Phase (105 - 110 cm) (Open)", date: "17 May", fee: 2000, minAge: 0, maxAge: 99 },
    // TOP SCORE
    { id: 18, discipline: "TOP SCORE", category: "14 years & Below", date: "17 May", fee: 2000, minAge: 0, maxAge: 14 },
    { id: 19, discipline: "TOP SCORE", category: "14+ years (Open)", date: "17 May", fee: 2000, minAge: 14, maxAge: 99 },
  ],


  prizeMoney: {
    note: "Cash prizes for Open category participants only in 80 cm, 90 cm, 105 cm Show Jumping & Two-Phase. Age-category class winners (Children I, Children II, Junior) receive Medals & Certificates.",
    table: [
      { height: "80 cm (Open)", gold: 10000, silver: 7500, bronze: 5000, fourth: 2500 },
      { height: "90 cm (Open)", gold: 10000, silver: 7500, bronze: 5000, fourth: 2500 },
      { height: "105 cm (Open)", gold: 10000, silver: 7500, bronze: 5000, fourth: 2500 },
      { height: "Two-Phase (105-110 cm) (Open)", gold: 10000, silver: 7500, bronze: 5000, fourth: 2500 },
    ],
  },

  requirements: [
    "Age Proof Document (Aadhaar, Passport, or Birth Certificate) is mandatory for riders participating in age-category events — must be uploaded with the entry form.",
    "Entry Forms along with full entry fees must be submitted online.",
    "Entries received without supporting documents or fees will not be accepted.",
    "Note: We will not accept any Spot Entries.",
    "Entries once submitted and fees paid are non-refundable.",
    "Rights of admission are reserved."
  ],

  stabling: {
    heading: "Stabling / Camp Details",
    description:
      "The Camp will open on 13th May and close on 18th May 2026. All stable requests must be submitted via the HPRC Equestrian Challenge – Stabling Form before 10th May 2026 along with the relevant fees. Note that permanent stables are not available; only temporary stables are provided.",
    details: [
      "Stable fee: Stable fee will be Rs 600 per stable per day for temporary stables, depending on availability.",
      "Stable bookings will be confirmed only after receiving the full charges for the intended number of days.",
      "Self-Containment: All teams must bring their own rations, grass, straw, fodder, and equipment",
      "Staff: Teams must make their own arrangements for staff stay and food"
    ],
  },

  declaration:
    "I declare that the details furnished above are correct to the best of my knowledge. I undertake no responsibility for any loss, damage or injury that may occur for me / my son, daughter, during the course of the event/s directly or indirectly from accident or any other causes. The Hyderabad Polo & Riding Club will not be held responsible for any first aid or other medical treatment provided.",

  importantNotes: [
    "Closing Date: Entries close at 18:00 hrs on Thursday, May 14, 2026. Entries thereafter are considered Post-Entries.",
    "Post-Entries: Accepted via Post Entry Form until 18:00 hrs on Friday, May 15, 2026. Fees apply.",
    "No Spot Entries will be accepted under any circumstances.",
    "Age Proof Document is mandatory for all age-category participants.",
    "Appropriate Riding Dress Code must be followed for all events.",
    "Medals & Certificates will be awarded to Category Winners.",
    "Prize Distribution Ceremony: Sunday, 17th May at ~7:30 PM.",
    "Number of entries: A horse can participate only once in each category of an event / discipline. On Day 1, a horse can have no more than three entries. On Day 2, a horse is allowed only two entries per session (morning / evening) and is limited to three entries for the day.",
    "The rights of admission are reserved."
  ],
};

export type EquestrianEvent = (typeof equestrianChallenge2026.events)[number];
