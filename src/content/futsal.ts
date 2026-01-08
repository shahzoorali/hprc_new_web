import type { PricingRow } from "@/components/ui/pricing-table";

export const futsalContent = {
  hero: {
    eyebrow: "Sports Centre",
    title: "Futsal",
    description:
      "Futsal, a variant of association football, is played on a smaller hard court and primarily indoors, resembling five-a-side football. At HPRC, we have developed top-tier infrastructure to offer an unparalleled experience for futsal enthusiasts. Our facilities are designed to meet the highest standards, ensuring a safe and enjoyable environment. We regularly host futsal tournaments and training sessions, fostering a vibrant community of players and fans. Whether you're a seasoned player or just starting out, HPRC provides the perfect setting to hone your skills and enjoy the game.",
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
        label: "Futsal (Per Hour) - Day Time",
        price: "₹1,500",
      },
      {
        label: "Futsal (Per Hour) - Under Lights",
        price: "₹2,000",
      },
    ] satisfies PricingRow[],
    notes: ["Booking subject to court availability.", "Rates are per hour."],
  },
  rules: [
    {
      category: "Ground Etiquette",
      items: [
        "Initiate with a brief warm-up before the game commences",
        "Demonstrate respect towards referees, opponents, and teammates",
        "Avoid any aggressive conduct or unsportsmanlike behavior",
      ],
    },
    {
      category: "Equipment",
      items: [
        "Utilize appropriate footwear designed for futsal grounds to maintain the surface",
        "Use futsal balls suitable for the ground conditions and size",
      ],
    },
    {
      category: "Safety",
      items: [
        "Stay hydrated with water, ensuring bottles are kept away from the playing area",
        "Immediately halt play for injuries and seek necessary medical attention",
        "Consider the use of shin guards or other protective gear for personal safety",
      ],
    },
  ],
  gallery: {
    heading: "Futsal Court Gallery",
    description: "Explore our top-tier futsal facilities",
  },
};
