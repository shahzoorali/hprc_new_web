import type { PricingRow } from "@/components/ui/pricing-table";

export const tennisContent = {
  hero: {
    eyebrow: "Sports Centre",
    title: "Tennis",
    description:
      "We have world-class Tennis courts at HPRC with complete training facility. Our top-notch courts give you the opportunity to learn and play the sport. We also conduct training sessions in partnership with Academia Sports Village and have international coaches coming down to conduct camps all around the year.",
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
        price: "₹236",
      },
      {
        label: "Adults - Per Day (Guest)",
        price: "₹472",
      },
      {
        label: "Adults - Monthly (No Guests allowed)",
        price: "₹1,770",
      },
      {
        label: "Adults - Yearly (No Guests allowed)",
        price: "₹15,000",
      },
      {
        label: "Kids - Per Day (Member)",
        price: "₹236",
      },
      {
        label: "Kids - Per Day (Guest)",
        price: "₹472",
      },
      {
        label: "Kids - Monthly (No Guests allowed)",
        price: "₹1,500",
      },
      {
        label: "Kids - Yearly (No Guests allowed)",
        price: "₹13,000",
      },
      {
        label: "Coaching (Adults & Kids) - 3 Classes per week",
        price: "₹2,500",
      },
    ] satisfies PricingRow[],
    notes: [
      "Guest access subject to member accompaniment and court availability.",
      "Dependent: Under 18",
      "For Coaching: 3 Classes per week",
    ],
  },
  rules: [
    {
      category: "Court Etiquette",
      items: [
        "Begin with a courteous warm-up before starting the match",
        "Demonstrate sportsmanship towards opponents, partners, and officials",
        "Adhere to the rules and decisions made by the umpire or referee",
        "Maintain a quiet environment during points to avoid distractions",
      ],
    },
    {
      category: "Equipment",
      items: [
        "Utilize standard tennis rackets and appropriate tennis balls for the court type",
        "Wear tennis shoes with non-marking soles to preserve the court surface",
      ],
    },
    {
      category: "Safety",
      items: [
        "Keep hydrated with water, while ensuring bottles are kept off the playing area",
        "Cease play immediately if injured and seek prompt medical assistance",
        "Consider protective eyewear for added safety, particularly for those at risk of eye injuries",
      ],
    },
  ],
  gallery: {
    heading: "Tennis Courts",
    description: "Explore our world-class tennis facilities",
  },
};
