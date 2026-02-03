export type Country = {
  name: string;
  code: string;
  flag?: string;
};

export type Tournament = {
  id: string;
  name: string;
  dates: string;
  format: string;
  teams: string[];
  description: string;
  goal: string;
};

export type ScheduleActivity = {
  time?: string;
  activity: string;
  type: "arrival" | "practice" | "match" | "ceremony" | "hospitality" | "media" | "final";
};

export type ScheduleDay = {
  day: string;
  date: string;
  dateFull: string;
  activities: ScheduleActivity[];
};

export type Official = {
  name: string;
  role: string;
};

export type HospitalityFeature = {
  title: string;
  description: string;
};

export type MediaOpportunity = {
  title: string;
  description: string;
};

export const worldArenaPoloChampionship2026 = {
  hero: {
    title: "HPRC World Arena Polo Championship 2026",
    subtitle: "Hyderabad",
    dates: "11th – 18th February 2026",
    venue: "Hyderabad Polo & Riding Club (HPRC) – Arena Polo Stadium",
    description:
      "A week-long celebration of world-class arena polo, international sporting camaraderie, and sports tourism for Telangana.",
  },
  overview: {
    background:
      "Hyderabad Polo & Riding Club (HPRC) has emerged as one of India's leading centres for arena polo, hosting national and international events and nurturing new talent. Building on this foundation, HPRC proposes to host the HPRC World Arena Polo Championship 2026 in Hyderabad as a week-long celebration of world-class arena polo, international sporting camaraderie, and sports tourism for Telangana.",
    rationale:
      "The Championship will bring together top arena polo players and teams from multiple countries, positioning Hyderabad as a key destination on the international polo calendar and providing a strong platform for youth development, women's polo, and global partnerships.",
  },
  keyInfo: {
    dates: "11th – 18th February 2026",
    venue: "HPRC Arena Polo Stadium, Hyderabad Polo & Riding Club, Hyderabad, India",
    timings: "Primarily evening matches under floodlights (approximately 6:00–9:00 pm)",
    format:
      "Multiple tournaments including 4 Goal and 6 Goal competitions, plus exhibition matches",
  },
  countries: [
    { name: "India", code: "IND" },
    { name: "United States of America", code: "USA" },
    { name: "Germany", code: "GER" },
    { name: "France", code: "FRA" },
    { name: "Luxembourg", code: "LUX" },
  ] satisfies Country[],
  tournaments: [
    {
      id: "4-goal-cup",
      name: "HPRC International Arena Polo Cup 2026",
      dates: "12th – 15th February 2026",
      format: "League matches followed by a final",
      goal: "4 Goal",
      teams: ["USA", "India", "Luxembourg", "France"],
      description:
        "The opening tournament featuring four international teams competing in 4-goal arena polo.",
    },
    {
      id: "6-goal-cup",
      name: "Telangana Tourism International Arena Polo Cup 2026",
      dates: "16th – 18th February 2026",
      format: "League matches followed by a final",
      goal: "6 Goal",
      teams: ["USA", "India", "Germany", "France"],
      description:
        "The premier tournament showcasing higher-level polo with six-goal teams competing for the Telangana Tourism Cup.",
    },
    {
      id: "womens-match",
      name: "All-Women's International Arena Polo Exhibition Match",
      dates: "14th February 2026",
      format: "Exhibition match",
      goal: "Exhibition",
      teams: ["International Women Players"],
      description:
        "An international exhibition featuring leading women polo players from India and abroad, promoting women's participation in equestrian sport.",
    },
    {
      id: "best-of-best",
      name: '"Best of the Best" International Arena Polo Exhibition Match',
      dates: "14th February 2026",
      format: "Exhibition match",
      goal: "Exhibition",
      teams: ["Top Players from Participating Countries"],
      description:
        "A showcase match featuring some of the finest arena polo players from participating countries, designed as a spectator and media highlight.",
    },
  ] satisfies Tournament[],
  schedule: [
    {
      day: "Day 1",
      date: "12 Feb",
      dateFull: "Thursday, 12 February 2026",
      activities: [
        {
          time: "6:00–6:45 PM",
          activity: "Opening League Match",
          type: "match",
        },
      ],
    },
    {
      day: "Day 2",
      date: "13 Feb",
      dateFull: "Friday, 13 February 2026",
      activities: [
        {
          time: "5:00–5:45 PM",
          activity: "Exhibition Match",
          type: "match",
        },
        {
          time: "6:00–6:45 PM",
          activity: "Knockout League Match",
          type: "match",
        },
      ],
    },
    {
      day: "Day 3",
      date: "14 Feb",
      dateFull: "Saturday, 14 February 2026",
      activities: [
        {
          time: "4:15 PM",
          activity: "Horse Breeds Parade",
          type: "ceremony",
        },
        {
          time: "5:00–5:45 PM",
          activity: "Ladies Exhibition Match",
          type: "match",
        },
        {
          time: "5:45–6:00 PM",
          activity: "Tractor Stunt Show",
          type: "ceremony",
        },
        {
          time: "6:15–7:00 PM",
          activity: "“Best of the Best” Match",
          type: "match",
        },
        {
          time: "7:30–8:00 PM",
          activity: "Prize Distribution Ceremony",
          type: "ceremony",
        },
        {
          activity: "Valentine’s Special Polo Evening (marketing highlight)",
          type: "hospitality",
        },
      ],
    },
    {
      day: "Day 4",
      date: "15 Feb",
      dateFull: "Sunday, 15 February 2026",
      activities: [
        {
          time: "1:00 PM",
          activity: "Public entry for Car Show",
          type: "hospitality",
        },
        {
          time: "3:00 PM",
          activity: "Car Show Memento Ceremony",
          type: "ceremony",
        },
        {
          time: "5:00–5:30 PM",
          activity: "Tractor Stunt Show",
          type: "ceremony",
        },
        {
          time: "6:00–7:00 PM",
          activity: "Main Polo Match (4 chukkers)",
          type: "match",
        },
        {
          time: "7:30–8:00 PM",
          activity: "Prize Distribution",
          type: "ceremony",
        },
      ],
    },
    {
      day: "Day 5",
      date: "16 Feb",
      dateFull: "Monday, 16 February 2026",
      activities: [
        {
          time: "6:00–7:00 PM",
          activity: "League Match (6 goal)",
          type: "match",
        },
      ],
    },
    {
      day: "Day 6",
      date: "17 Feb",
      dateFull: "Tuesday, 17 February 2026",
      activities: [
        {
          time: "5:00–6:00 PM",
          activity: "Exhibition Match",
          type: "match",
        },
        {
          time: "6:00–7:00 PM",
          activity: "League Match",
          type: "match",
        },
      ],
    },
    {
      day: "Day 7",
      date: "18 Feb",
      dateFull: "Wednesday, 18 February 2026",
      activities: [
        {
          time: "5:00 PM",
          activity: "Public entry + Teams Parade",
          type: "ceremony",
        },
        {
          time: "5:45 PM",
          activity: "National Anthem",
          type: "ceremony",
        },
        {
          time: "6:00–7:00 PM",
          activity: "FINAL Match",
          type: "final",
        },
        {
          activity: "Post-match — Firecracker / Laser Show",
          type: "ceremony",
        },
        {
          time: "7:00–8:00 PM",
          activity: "Grand Prize Distribution",
          type: "ceremony",
        },
      ],
    },
  ] satisfies ScheduleDay[],
  officials: {
    chiefUmpire: {
      name: "Robin Sanchez",
      role: "Chief Umpire & Head of Technical Committee",
    },
    committee: [
      { name: "Chaitania Kumar", role: "Tournament Committee" },
      { name: "Arsalan Khan", role: "Tournament Committee" },
      { name: "Saif Attari", role: "Tournament Committee" },
      { name: "Robin Sanchez", role: "Tournament Committee" },
      { name: "Ed Armstrong", role: "Tournament Committee" },
      { name: "Alexander Ludorf", role: "Tournament Committee" },
    ],
  },
  hospitality: {
    features: [
      {
        title: "VIP and Sponsor Boxes",
        description:
          "Premium viewing experience at the HPRC Arena Polo Stadium with exclusive access to VIP and sponsor boxes.",
      },
      {
        title: "Curated Hospitality at Snaffles",
        description:
          "Enjoy exceptional dining and hospitality experiences at Snaffles and other HPRC facilities throughout the championship.",
      },
      {
        title: "Cultural & Entertainment Elements",
        description:
          "Integrated cultural and entertainment elements on select evenings, especially during finals and exhibition matches.",
      },
      {
        title: "Interactive Experiences",
        description:
          "Merchandise, photo opportunities and interactive experiences to engage families, youth and first-time spectators.",
      },
    ],
  },
  media: {
    opportunities: [
      {
        title: "Arena Branding",
        description:
          "Branding opportunities across arena boards, hoardings and grandstand facias for maximum visibility.",
      },
      {
        title: "Team Branding",
        description:
          "Team jerseys and saddle cloths branding (as permitted by regulations) for close-up media coverage.",
      },
      {
        title: "Digital & Print Collaterals",
        description:
          "Branding on invitations, digital creatives, social media campaigns and print collaterals.",
      },
      {
        title: "Media Coverage",
        description:
          "Official press conference, live or delayed streaming/telecast options, and strong digital presence through social media campaigns.",
      },
    ],
  },
  objectives: [
    "Establish Hyderabad and HPRC as a premier global destination for arena polo",
    "Promote sports tourism in Telangana through a high-profile international equestrian event",
    "Provide competitive exposure for Indian players against top international teams",
    "Showcase and encourage women's participation in polo through a dedicated international women's match",
    "Create a festival of polo that engages players, sponsors, media, and the local community",
  ],
  legacy: [
    "Establishment of the HPRC World Arena Polo Championship as an annual / biennial landmark on the international arena polo circuit",
    "Strengthening Hyderabad's image as a cosmopolitan sports and lifestyle destination",
    "Long-term relationships with international polo clubs, federations and sponsors",
    "Inspiration for young riders and aspirants in Telangana and across India to take up polo and equestrian sports",
  ],
};

export type WorldArenaPoloChampionship2026 = typeof worldArenaPoloChampionship2026;
