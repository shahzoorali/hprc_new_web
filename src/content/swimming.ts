import type { PricingRow } from "@/components/ui/pricing-table";

export const swimmingContent = {
  hero: {
    eyebrow: "Sports Centre",
    title: "Swimming Pool",
    description:
      "HPRC has a well maintained swimming pool that is open for all members and guests. Swimming lessons from expert coaches are available for all age groups. Changing rooms and Restroom facilities for ladies and gents are also provided for the members.",
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
    {
      label: "Ladies Only",
      time: "9:00 AM - 10:00 AM (Morning) & 4:00 PM - 5:00 PM (Evening)",
    },
    {
      label: "For All",
      time: "6:00 AM - 9:00 AM (Morning) & 5:00 PM - 9:00 PM (Evening)",
    },
    {
      label: "Closed on Mondays",
      time: "The pool will be closed on all Mondays",
    },
  ],
  pricing: {
    heading: "CHARGES",
    rows: [
      {
        label: "Adults - Max 3 Dips per month (Member)",
        price: "₹295",
      },
      {
        label: "Adults - Per Dip/Day (Guest)",
        price: "₹590",
      },
      {
        label: "Adults - Monthly (No Guests allowed)",
        price: "₹2,950",
      },
      {
        label: "Adults - Yearly (No Guests allowed)",
        price: "₹25,000",
      },
      {
        label: "Kids - Max 3 Dips per month (Member)",
        price: "₹295",
      },
      {
        label: "Kids - Per Dip/Day (Guest)",
        price: "₹590",
      },
      {
        label: "Kids - Monthly (No Guests allowed)",
        price: "₹1,950",
      },
      {
        label: "Kids - Yearly (No Guests allowed)",
        price: "₹15,000",
      },
      {
        label: "Coaching (Adults & Kids) - 3 Classes per week",
        price: "₹3,500",
      },
    ] satisfies PricingRow[],
    notes: [
      "Guest access subject to member accompaniment and pool availability.",
      "Dependent: Under 18 - Max 3 Dips per month",
      "For Coaching: 3 Classes per week",
    ],
  },
  rules: [
    {
      category: "General",
      items: [
        "Beginners to always use the shallow end of the pool",
        "Never squeeze your wet clothes in changing area",
        "Never smoke or consume alcohol/ tobacco in or near the pool",
        "Please use safety lockers and vacate after every use",
        "Diving/ shouting and playing with ball is strictly prohibited",
      ],
    },
    {
      category: "Hygiene",
      items: [
        "Always shower thoroughly before and after using the pool",
        "Swimming costume with head cap is compulsory",
        "Inner wear of any types is not allowed along with swim costume",
        "T-shirts, leggings & tights, shorts, frocks and hosiery are not allowed",
        "Never swim with contagious/ skin diseases or open wounds",
        "Keep your nails clean and do not spit or urinate in the pool",
      ],
    },
    {
      category: "Important Guidelines",
      items: [
        "The pool is strictly for the use of members of HPRC",
        "Guests must be accompanied by the member after approval from the management",
        "Kindly sign in the register before using the pool",
        "Render a fitness certificate certified by a licenced Medical Practitioner",
        "Photography & videos are strictly prohibited in or near the Pool area",
        "Pets are not allowed",
        "Always close all taps after using the showers, flush & toilets",
        "Children below the age of 12 years should be accompanied by an adult",
        "While using the pool children below 4 years must wear swim-wear nappies",
        "Do not entertain tips / donations to the swimming pool staff",
        "Kindly maintain discipline in the pool area",
        "ACCOMPANYING GUARDIANS/ PARENTS MUST BE IN THE VIEWING GALLERY ONLY TO OBSERVE THEIR WARDS",
        "THE MANAGEMENT IS NOT RESPONSIBLE FOR ANY LOSS/ DAMAGE TO YOUR PERSON, PROPERTY, CASH/ VALUABLES",
      ],
    },
  ],
  gallery: {
    heading: "Swimming Pool Gallery",
    description: "Explore our swimming pool facilities",
  },
};
