import type { PricingRow } from "@/components/ui/pricing-table";

export const squashContent = {
  hero: {
    eyebrow: "Sports Centre",
    title: "Squash",
    description:
      "Discover premium Squash facilities at HPRC, where our courts are crafted for excellence. With top-tier surfaces and optimal lighting, you'll experience the best in squash play, whether for a casual game or a serious match. Our expert coaches are on hand to provide personalised training, helping you elevate your skills. HPRC caters to all levels, ensuring a welcoming environment for everyone. Plus, we supply premium rackets and balls, so you're always game-ready. Come and experience squash like never before at HPRC.",
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
        "Allow time for both sides to warm up before the match",
        "Show respect to opponents, partners, and officials",
        "Avoid aggressive or inappropriate behavior",
        "Do not misuse or damage the court or equipment",
      ],
    },
    {
      category: "Equipment",
      items: [
        "Standard squash rackets must be used",
        "Use a squash ball which is suitable for your level",
      ],
    },
    {
      category: "Safety",
      items: [
        "Wear appropriate non-marking indoor court shoes",
        "Bring water to stay hydrated, but keep bottles off the playing area",
        "Stop playing immediately if an injury occurs and seek medical help",
        "Protective eye wear is worth considering even as an adult",
      ],
    },
  ],
  gallery: {
    heading: "Squash Court",
    description: "Explore our premium squash facilities",
  },
};
