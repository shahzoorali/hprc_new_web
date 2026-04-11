import type { PricingRow } from "@/components/ui/pricing-table";

type SportFacility = {
  id: string;
  name: string;
  description: string;
  image: string;
  timings: string;
  highlights: string[];
};

const standardPricing: PricingRow[] = [
  { label: "Adults (Per Day)", price: "₹236 (Member)", total: "₹472 (Guest)" },
  { label: "Adults (Monthly)", price: "₹1,770", total: "—" },
  { label: "Adults (Yearly)", price: "₹15,000", total: "—" },
  { label: "Kids (Per Day)", price: "₹236 (Member)", total: "₹472 (Guest)" },
  { label: "Kids (Monthly)", price: "₹1,500", total: "—" },
  { label: "Kids (Yearly)", price: "₹13,000", total: "—" },
  { label: "Coaching (Adults & Kids)", price: "₹2,500", total: "3 classes per week" },
];

export const sportsContent = {
  hero: {
    eyebrow: "Sports Centre",
    title: "Elite multi-sport facilities for year-round play",
    description:
      "From tennis and squash to swimming and futsal, HPRC’s Sports Centre delivers premium infrastructure, professional coaching, and spirited community leagues.",
  },
  overview:
    "The Sports Centre is designed for high-performance athletes and recreational members alike. Each facility features professional-grade surfaces, lighting, and maintenance standards. Visiting coaches and partner academies deliver camps across the calendar, supported by booking and membership packages tailored to families and corporate groups.",
  facilities: [
    {
      id: "tennis",
      name: "Tennis",
      description:
        "Synthetic courts, year-round camps with Academia Sports Village, and international guest coaches delivering clinics and matchplay strategy.",
      image: "/images/sports/tennis.png",
      timings: "Daily • 6:00 – 10:00 AM & 4:00 – 9:00 PM",
      highlights: [
        "ITF-compliant surfaces with LED floodlighting.",
        "Personal or group coaching itineraries throughout the year.",
        "Tournament hosting capability for club and corporate events.",
      ],
    },
    {
      id: "badminton",
      name: "Badminton",
      description:
        "Indoor courts with shock-absorbent flooring, optimised lighting, and coaching pathways for beginners to state-level aspirants.",
      image: "/images/sports/badminton.png",
      timings: "Daily • 6:00 – 10:00 AM & 4:00 – 9:00 PM",
      highlights: [
        "Feather and synthetic shuttle stock with on-site pro shop.",
        "Video-assisted coaching feedback for technique refinement.",
        "League nights for doubles, mixed doubles, and junior play.",
      ],
    },
    {
      id: "squash",
      name: "Squash",
      description:
        "Premium courts engineered for consistent bounce and visibility, paired with specialised conditioning programmes.",
      image: "/images/sports/squash.png",
      timings: "Daily • 6:00 – 10:00 AM & 4:00 – 9:00 PM",
      highlights: [
        "Glass-back viewing for coaching and spectators.",
        "Racket stringing and grip services via club desk.",
        "Endurance and reflex clinics designed by visiting pros.",
      ],
    },
    {
      id: "swimming",
      name: "Swimming Pool",
      description:
        "Covered temperature-controlled pool ideal for lap training, aqua fitness, and family recreation regardless of season.",
      image: "/images/sports/swimming.png",
      timings: "Daily • 6:00 – 10:00 AM & 4:00 – 9:00 PM",
      highlights: [
        "Certified lifeguards and safety protocols on duty.",
        "Dedicated lanes for training squads and leisure swimmers.",
        "Aquatic therapy and fitness sessions on request.",
      ],
    },
    {
      id: "basketball",
      name: "Basketball",
      description:
        "Full-sized court with professional glass boards, line markings, and evening league runs for all age groups.",
      image: "/images/sports/basketball.png",
      timings: "Daily • 6:00 – 10:00 AM & 4:00 – 9:00 PM",
      highlights: [
        "Skill development clinics from partner academies.",
        "Corporate and inter-school tournaments hosted quarterly.",
        "Strength and conditioning support from club trainers.",
      ],
    },
    {
      id: "futsal",
      name: "Futsal",
      description:
        "Multipurpose synthetic turf configured for futsal, cricket nets, and small-sided soccer matches.",
      image: "/images/sports/futsal.png",
      timings: "Daily • 6:00 – 10:00 AM & 4:00 – 9:00 PM",
      highlights: [
        "Five-a-side leagues, youth development squads, and weekend drop-ins.",
        "Ball machine rentals and agility training gear available.",
        "Flexible bookings for corporate team-building fixtures.",
      ],
    },
    {
      id: "gym",
      name: "Gym",
      description:
        "Air-conditioned fitness studio with strength, cardio, and functional training zones plus personalised coaching.",
      image: "/images/sports/gym.png",
      timings: "Daily • 6:00 – 10:00 AM & 4:00 – 9:00 PM",
      highlights: [
        "TRX, free weights, and endurance equipment curated for riders and athletes.",
        "Nutrition and recovery consultations on appointment.",
        "Small-group workouts and flexibility classes.",
      ],
    },
    {
      id: "sauna",
      name: "Sauna",
      description:
        "Relaxation suite complementing the gym and pool, ideal for post-workout recovery and wellness routines.",
      image: "/images/sports/sauna.png",
      timings: "Daily • 6:00 – 10:00 AM & 9:00 PM",
      highlights: [
        "Temperature-controlled environment with aromatherapy options.",
        "Guided recovery protocols for riders and sportspersons.",
        "Private slots available upon request.",
      ],
    },
  ] satisfies SportFacility[],
  pricing: {
    heading: "Sports Centre Tariffs",
    rows: standardPricing,
    notes: [
      "Guest access subject to member accompaniment and court availability.",
      "Court etiquette: warm up courteously, respect officials, maintain quiet during points, and protect playing surfaces.",
      "Safety: hydrate responsibly, report injuries immediately, and use sport-specific footwear.",
    ],
  },
  packages: [
    {
      name: "Gold Package",
      description:
        "Comprehensive membership tier granting full access to sports facilities, coaching priority, and exclusive club hospitality privileges.",
      benefits: [
        "Unlimited court bookings with advance reservation windows.",
        "Preferential rates on coaching clinics and private lessons.",
        "Complimentary guest passes for select events.",
      ],
    },
    {
      name: "Platinum Package",
      description:
        "Premium lifestyle experience combining sports access with bespoke concierge services, private event privileges, and personalised fitness planning.",
      benefits: [
        "Dedicated relationship manager for bookings and experiences.",
        "Tailored wellness plans incorporating spa, sauna, and nutrition.",
        "Priority seating at tournaments, dining events, and banquets.",
      ],
    },
  ],
  upcoming: {
    title: "Upcoming Sports Events",
    description:
      "HPRC curates leagues, inter-club championships, and community tournaments throughout the year. Members receive advance notice and registration priority for tennis showdowns, squash ladders, futsal nights, and swimming galas.",
  },
};
