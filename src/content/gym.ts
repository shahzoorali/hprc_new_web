import type { PricingRow } from "@/components/ui/pricing-table";

export const gymContent = {
  hero: {
    eyebrow: "Sports Centre",
    title: "Gym",
    description:
      "Our gymnasium boasts state-of-the-art equipment and cutting-edge training methods. Whether you're looking to engage in a rigorous workout or prefer a more relaxed session of stretching and TRX, our spacious facility caters to all fitness needs. Additionally, we offer professional instructors who are available upon request to provide personalised guidance tailored to all experience levels.",
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
        price: "₹200",
      },
      {
        label: "Adults - Per Day (Guest)",
        price: "₹590",
      },
      {
        label: "Adults - Monthly (No Guests allowed)",
        price: "₹1,500",
      },
      {
        label: "Adults - Yearly (No Guests allowed)",
        price: "₹12,000",
      },
      {
        label: "Kids - Per Day (Member)",
        price: "₹200",
      },
      {
        label: "Kids - Per Day (Guest)",
        price: "₹590",
      },
      {
        label: "Kids - Monthly (No Guests allowed)",
        price: "₹1,500",
      },
      {
        label: "Kids - Yearly (No Guests allowed)",
        price: "₹12,000",
      },
      {
        label: "Coaching (Adults & Kids) - 3 Classes per week",
        price: "₹2,500",
      },
    ] satisfies PricingRow[],
    notes: [
      "Guest access subject to member accompaniment and facility availability.",
      "Dependent: Under 18",
      "For Coaching: 3 Classes per week",
    ],
  },
  rules: [
    {
      category: "General Conduct",
      items: [
        "Respect others be courteous to other gym members and staff",
        "Any form of harassment, bullying, or inappropriate behavior is strictly prohibited",
        "Use of offensive language is not allowed",
      ],
    },
    {
      category: "Equipment Use",
      items: [
        "Re-rack weights and return all equipment to its designated place",
        "Be mindful of time limits on machines, especially during peak hours",
        "Avoid dropping weights to prevent damage to equipment and flooring",
      ],
    },
    {
      category: "Safety",
      items: [
        "Wear appropriate gym clothing and footwear",
        "Use a spotter when lifting heavy weights",
        "Keep exits and walkways clear of equipment and personal items",
        "Inform staff of any broken equipment or safety hazards",
      ],
    },
    {
      category: "Cleanliness",
      items: [
        "Bring a towel to wipe off sweat from your body and equipment",
        "Maintain good personal hygiene to ensure a pleasant environment for everyone",
        "Food is not allowed in the gym but water or sports drinks are permitted",
      ],
    },
    {
      category: "Membership and Access",
      items: [
        "Always check in at the front desk or use your membership card",
      ],
    },
  ],
  gallery: {
    heading: "GYM Gallery",
    description: "Explore our state-of-the-art gym facilities",
  },
};
