import type { PricingRow } from "@/components/ui/pricing-table";

export const saunaContent = {
  hero: {
    eyebrow: "Sports Centre",
    title: "Sauna",
    description:
      "At HPRC, our Sauna facility is designed to offer a relaxing and rejuvenating experience for all members. Featuring state-of-the-art sauna rooms with adjustable temperature controls, our facility ensures a soothing environment for stress relief and detoxification. Members can enjoy the benefits of improved circulation, muscle relaxation, and overall wellness. Our sauna rooms are meticulously maintained for cleanliness and comfort, providing the perfect space to unwind after a workout or a long day. Additionally, we offer complimentary towels and water, ensuring you have everything you need for a refreshing session. Whether you're seeking relaxation or health benefits, HPRC's sauna facility provides the ultimate setting for a serene and invigorating experience.",
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
        label: "Sauna - Per Day (Member)",
        price: "₹500",
      },
      {
        label: "Sauna - Per Day (Guest)",
        price: "₹750",
      },
    ] satisfies PricingRow[],
    notes: [
      "Guest access subject to member accompaniment and facility availability.",
    ],
  },
  rules: [
    {
      category: "Safety Guidelines",
      items: [
        "Use by anyone under 16 years of age is prohibited",
        "Pregnant women should not use the sauna",
        "Elderly or persons with heart disease, lung disease, inflammation, high or low blood pressure, kidney disease, epilepsy, hyperthyroidism are recommended not to use the sauna",
        "Do not use the sauna while under the influence of alcohol, drugs or medication",
        "Food especially cold drink are not allowed inside the sauna",
        "A maximum of 10 min of the sauna is recommended extensive exposure may result in dizziness or fainting",
        "Remove clothing and jewelry, wear a loose towel while in the sauna",
        "Pets are not allowed in the sauna",
        "Dress only when completely dry after the perspiration stops, or chilling may occur",
        "All persons using the sauna do so at their own risk and sole responsibility",
        "HPRC will not be responsible for injury, death or any loss associated with the use of these facilities",
      ],
    },
  ],
  gallery: {
    heading: "Sauna Gallery",
    description: "Explore our relaxing sauna facilities",
  },
};
