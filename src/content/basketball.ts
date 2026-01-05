import type { PricingRow } from "@/components/ui/pricing-table";

export const basketballContent = {
  hero: {
    eyebrow: "Sports Centre",
    title: "Basketball",
    description:
      "For all basketball enthusiasts, HPRC offers a fully equipped court built to international standards. We regularly conduct training sessions in collaboration with Academia Sports Village, featuring esteemed international coaches who lead camps throughout the year.",
  },
  timings: [
    {
      label: "Morning",
      time: "6:00 AM to 10:00 AM",
    },
    {
      label: "Evening",
      time: "4:00 PM to 9:00 PM",
    },
  ],
  pricing: {
    heading: "CHARGES",
    rows: [
      {
        label: "Adults - Per Day (Member)",
        price: "₹100",
      },
      {
        label: "Adults - Per Day (Guest)",
        price: "₹200",
      },
      {
        label: "Adults - Monthly (No Guests allowed)",
        price: "₹1,000",
      },
      {
        label: "Kids - Per Day (Member)",
        price: "₹100",
      },
      {
        label: "Kids - Per Day (Guest)",
        price: "₹200",
      },
      {
        label: "Kids - Monthly (No Guests allowed)",
        price: "₹1,000",
      },
      {
        label: "Day Time",
        price: "₹1,500",
      },
      {
        label: "Under Lights",
        price: "₹2,000",
      },
    ] satisfies PricingRow[],
    notes: [
      "Guest access subject to member accompaniment and court availability.",
      "Dependent: Under 18",
    ],
  },
  rules: [
    {
      category: "Ground Etiquette",
      items: [
        "Allocate time for warm-up before the game starts",
        "Show respect to referees, opponents, and teammates",
        "Avoid aggressive behavior and maintain sportsmanship",
        "Keep the playing area clean and free of personal belongings",
      ],
    },
    {
      category: "Equipment",
      items: [
        "Use a standard basketball suitable for the playing surface",
        "Wear appropriate basketball shoes with good support and traction",
      ],
    },
    {
      category: "Safety",
      items: [
        "Stay hydrated with water, but keep bottles off the playing area",
        "Stop play immediately if an injury occurs and seek medical help",
        "Consider protective gear such as mouthguards and ankle supports",
        "Be aware of your surroundings to prevent collisions and injuries",
      ],
    },
  ],
  gallery: {
    heading: "Basketball Court Gallery",
    description: "Explore our international standard basketball facilities",
  },
};
