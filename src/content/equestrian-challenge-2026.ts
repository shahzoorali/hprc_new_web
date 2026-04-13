// HPRC Equestrian Challenge 2026 — Content Data
// Source: Entry Form, External Notice, Member Notice (rfq-2 folder)

export const equestrianChallenge2026 = {
  meta: {
    title: "HPRC Equestrian Challenge 2026 | Hyderabad Polo & Riding Club",
    description:
      "Register for the inaugural HPRC Equestrian Challenge 2026 — 16th & 17th May 2026 at Hyderabad Polo & Riding Club, Gandipet. Hacks, Dressage, Show Jumping & Top Score events. Open to all EFI-affiliated riders.",
  },

  event: {
    name: "HPRC Equestrian Challenge 2026",
    tagline: "The Inaugural HPRC Equestrian Challenge",
    dates: "16th & 17th May 2026",
    dateRange: { start: "2026-05-16T07:00:00+05:30", end: "2026-05-17T20:00:00+05:30" },
    venue: "Hyderabad Polo & Riding Club, Gandipet, Moinabad, Ranga Reddy",
    venueAddress: "Aziznagar Survey No. 177, Gandipet, Moinabad, Ranga Reddy District, Telangana – 500074",
    govBody: "Organised under the aegis of EFI & TSEA",
    contact: ["+91 9949000085", "+91 9177000056", "+91 7799259000"],
    email: "ridingschool@bbin.in",
    sessions: {
      morning: "7:00 AM – 9:00 AM",
      evening: "5:00 PM – 8:00 PM (Floodlit)",
    },
    grounds: {
      ground1: "Ground 1 — Hacks & Dressage",
      mainArena: "Main HPRC Arena — Show Jumping & Top Score",
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
          events: "Hacks — Under 10 yrs & Under 14 yrs",
        },
        {
          time: "Evening · 5:00 PM (Floodlit)",
          venue: "Ground 1",
          events: "Dressage — Children I, Children II & Junior",
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
          events: "Show Jumping — 40 cm, 60 cm & 80 cm Classes",
        },
        {
          time: "Evening · 5:00 PM (Floodlit)",
          venue: "Main Arena",
          events: "Show Jumping — 90 cm & 105 cm · Top Score · Prize Distribution Ceremony",
        },
      ],
    },
  ],

  events: [
    // HACKS
    { id: 1, discipline: "HACKS", category: "Under 10 years", date: "16 May · AM", fee: 1500 },
    { id: 2, discipline: "HACKS", category: "Under 14 years", date: "16 May · AM", fee: 1500 },
    // DRESSAGE
    { id: 3, discipline: "DRESSAGE", category: "Children I (10–12 yrs)", date: "16 May · PM", fee: 2000 },
    { id: 4, discipline: "DRESSAGE", category: "Children II (12–14 yrs)", date: "16 May · PM", fee: 2000 },
    { id: 5, discipline: "DRESSAGE", category: "Junior (14–18 yrs)", date: "16 May · PM", fee: 2000 },
    // SHOW JUMPING
    { id: 6, discipline: "SHOW JUMPING", category: "Children II – 40 cm (10–12 yrs)", date: "17 May · AM", fee: 2000 },
    { id: 7, discipline: "SHOW JUMPING", category: "Children I – 40 cm (12–14 yrs)", date: "17 May · AM", fee: 2000 },
    { id: 8, discipline: "SHOW JUMPING", category: "40 cm Open", date: "17 May · AM", fee: 2000 },
    { id: 9, discipline: "SHOW JUMPING", category: "Children II – 60 cm (10–12 yrs)", date: "17 May · AM", fee: 2000 },
    { id: 10, discipline: "SHOW JUMPING", category: "Children I – 60 cm (12–14 yrs)", date: "17 May · AM", fee: 2000 },
    { id: 11, discipline: "SHOW JUMPING", category: "60 cm Open", date: "17 May · AM", fee: 2000 },
    { id: 12, discipline: "SHOW JUMPING", category: "Children II – 80 cm (10–12 yrs)", date: "17 May · AM", fee: 2000 },
    { id: 13, discipline: "SHOW JUMPING", category: "80 cm Open", date: "17 May · AM", fee: 2000 },
    { id: 14, discipline: "SHOW JUMPING", category: "Children I – 90 cm (12–14 yrs)", date: "17 May · PM", fee: 2000 },
    { id: 15, discipline: "SHOW JUMPING", category: "90 cm Open", date: "17 May · PM", fee: 2000 },
    { id: 16, discipline: "SHOW JUMPING", category: "Junior – 105 cm (14–18 yrs)", date: "17 May · PM", fee: 2000 },
    { id: 17, discipline: "SHOW JUMPING", category: "105 cm Open", date: "17 May · PM", fee: 2000 },
    // TOP SCORE OPEN
    { id: 18, discipline: "TOP SCORE", category: "Children (Below 14 yrs)", date: "17 May · PM", fee: 2000 },
    { id: 19, discipline: "TOP SCORE", category: "Open (14 yrs & above)", date: "17 May · PM", fee: 2000 },
  ],

  prizeMoney: {
    note: "Cash prizes for Open category participants only in 80 cm, 90 cm & 105 cm Show Jumping. Age-category class winners receive Medals & Certificates.",
    table: [
      { height: "80 cm (Open)", gold: 10000, silver: 7500, bronze: 5000, fourth: 2500 },
      { height: "90 cm (Open)", gold: 10000, silver: 7500, bronze: 5000, fourth: 2500 },
      { height: "105 cm (Open)", gold: 10000, silver: 7500, bronze: 5000, fourth: 2500 },
    ],
  },

  requirements: [
    "Valid EFI Membership / Licence — EFI Membership Number must be stated on the Entry Form",
    "Horses must have a valid EFI Registration Number",
    "Birth Certificate is mandatory for all participants — must be submitted with the entry form",
    "All riders must comply with EFI Dress Code Regulations at all times during the event",
    "Entry Forms along with full entry fees must be submitted to the HPRC Riding School office",
    "Entries received without supporting documents or fees will not be accepted",
    "Entries once submitted and fees paid are non-refundable",
  ],

  stabling: {
    heading: "Stabling & Logistics",
    description:
      "Stabling for outstation horses is available at HPRC subject to advance request and availability. A nominal stabling charge may apply. Please indicate your stabling requirements at the time of submitting entries so that arrangements can be confirmed in advance. Refreshments will be available at the Club for participants and officials.",
  },

  coachingProgramme: {
    heading: "Advance Coaching Programme",
    subheading: "Exclusively for HPRC Members",
    period: "15th April 2026 to 15th May 2026",
    steps: [
      "Collect the Advance Coaching Course Coupon from the HPRC Riding School office",
      "Horses will be allotted by draw (out-of-the-hat) within each rider's competition category",
      "Training will be conducted on the allotted horse by the Club's qualified coaches",
      "Coaching covers all competition disciplines — Hacks, Dressage, and Show Jumping",
      "Enrol early to make full use of the 30-day preparation window",
    ],
  },

  declaration:
    "I declare that the details furnished above are correct to the best of my knowledge. I undertake no responsibility for any loss, damage or injury that may occur for me / my son, daughter, during the course of the event/s directly or indirectly from accident or any other causes. Neither the Hyderabad Polo & Riding Club nor the Telangana State Equestrian Association / Equestrian Federation of India will be held responsible for any first aid or other medical treatment provided.",

  importantNotes: [
    "Dress Code must be strictly followed for all events as per EFI Guidelines",
    "Birth Certificate is mandatory for all participants",
    "Medals & Certificates will be awarded to Winners",
    "The Club reserves the right to alter the order or timing of any event",
    "Both morning sessions begin sharp at 7:00 AM — please plan accordingly",
    "Evening sessions (5:00 PM – 8:00 PM) will be conducted under floodlights at the Main Arena",
    "Prize Distribution Ceremony on the evening of Day 2 (17th May) following the events",
  ],
};

export type EquestrianEvent = (typeof equestrianChallenge2026.events)[number];
