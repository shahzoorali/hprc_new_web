import type { PricingRow } from "@/components/ui/pricing-table";

export const badmintonContent = {
  hero: {
    eyebrow: "Sports Centre",
    title: "Badminton",
    description:
      "At HPRC, our Badminton courts are designed to provide an optimal playing experience for all skill levels. Equipped with professional-grade flooring and lighting, our spacious courts ensure a top-notch environment for both casual games and serious matches. Players can also benefit from our on-site coaches, available for personalised training sessions. Whether you're playing for fun or looking to improve your technique, HPRC offers the perfect setting to enjoy the sport. Additionally, we provide quality rackets and shuttlecocks, ensuring you have everything you need for a great game.",
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
        "Standard badminton rackets must be used",
        "Either feathered or synthetic shuttlecocks are allowed",
      ],
    },
    {
      category: "Safety",
      items: [
        "Wear appropriate non-marking indoor court shoes",
        "Bring water to stay hydrated, but keep bottles off the playing area",
        "Stop playing immediately if an injury occurs",
      ],
    },
  ],
  gallery: {
    heading: "Badminton Court",
    description: "Explore our professional badminton facilities",
  },
};
