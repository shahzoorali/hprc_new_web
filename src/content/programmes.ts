import type { PricingRow } from "@/components/ui/pricing-table";

export type Programme = {
  id: string;
  title: string;
  excerpt: string;
  schedule: string;
  highlights: string[];
  pricingTables?: { heading: string; rows: PricingRow[] }[];
};

export const programmesContent = {
  hero: {
    eyebrow: "Riding & Polo Programmes",
    title: "Structured pathways for every rider",
    description:
      "From first-time riders to competitive polo athletes, HPRC’s programmes are designed to build confidence, technique, and sporting spirit. Each pathway is led by expert instructors and supported by world-class facilities.",
  },
  overview: [
    "HPRC conducts regular coaching camps and bespoke training plans across beginners, intermediate, advanced polo, and equestrian disciplines. Riders train in a flood-lit arena with access to more than 50 well-schooled horses, ensuring a safe and uplifting experience.",
    "Members can explore riding, polo, show jumping, or leisurely cross-country hacks bordering the serene Himayatsagar Lake. Certification pathways reward progression with practical assessments and the opportunity to compete at national events.",
  ],
  programmes: [
    {
      id: "start-riding",
      title: "Start Riding",
      excerpt:
        "An introductory journey covering horse handling, posture, balance, and safety to unlock the joy of riding.",
      schedule: "Four-week curriculum • Timings: 6:00 – 10:00 AM & 4:00 – 9:00 PM",
      highlights: [
        "Week 1: Approaching, handling, mounting, dismounting, walking with assistance, grooming & tack care.",
        "Week 2: Balancing aids, walk–halt–walk transitions, steering in circles, introduction to trotting with side reins.",
        "Week 3: Independent trotting, tempo control, rising trot fundamentals.",
        "Week 4: Mastering reins and leg aids, introduction to canter based on rider readiness. Certification assessment available (₹1,000).",
      ],
      pricingTables: [
        {
          heading: "Basic Level Riding Course",
          rows: [
            { label: "24 Riding Coupon", price: "₹6,000", gst: "₹1,080", total: "₹7,080" },
            { label: "Coaching", price: "₹2,000", gst: "₹360", total: "₹2,360" },
          ],
        },
        {
          heading: "Basic Level Riding Course — Guest",
          rows: [
            { label: "12 Riding Coupons", price: "₹12,000", gst: "₹2,160", total: "₹14,160" },
            { label: "Coaching", price: "₹2,400", gst: "₹432", total: "₹2,832" },
          ],
        },
      ],
    },
    {
      id: "intermediate",
      title: "Intermediate Riding Programme",
      excerpt:
        "For riders consolidating control, rhythm, and independence in the saddle while preparing for advanced aids.",
      schedule: "Four-week curriculum • Timings: 6:00 – 10:00 AM & 4:00 – 9:00 PM",
      highlights: [
        "Independent trotting with transitions and tempo control.",
        "Improved seat, rein, and leg coordination for lateral movements.",
        "Confidence-building exercises across arenas and varied footing.",
        "Progressive introduction to advanced paces and schooling patterns.",
      ],
      pricingTables: [
        {
          heading: "Intermediate Level Riding Course",
          rows: [
            { label: "24 Riding Coupon", price: "₹6,000", gst: "₹1,080", total: "₹7,080" },
            { label: "Coaching", price: "₹4,000", gst: "₹720", total: "₹4,720" },
          ],
        },
      ],
    },
    {
      id: "polo",
      title: "Advanced Polo Programme",
      excerpt:
        "High-performance coaching for riders pursuing competitive polo, focusing on mallet work, strategy, and teamwork.",
      schedule: "Monthly packages • Timings: 6:00 – 10:00 AM & 4:00 – 9:00 PM",
      highlights: [
        "Advanced riding drills tailored to polo dynamics and match fitness.",
        "Shot accuracy, stick & ball practice, and tactical chukker simulations.",
        "Team coordination, set plays, and game analysis with professional mentors.",
      ],
      pricingTables: [
        {
          heading: "Polo Riding & Coaching Fees",
          rows: [
            {
              label: "Riding Fee",
              price: "12 rides / month @ ₹295 per ride",
              total: "₹3,540",
            },
            {
              label: "Coaching Fee",
              price: "Monthly coaching package",
              total: "₹5,900",
            },
          ],
        },
      ],
    },
    {
      id: "equestrian",
      title: "Equestrian Programme",
      excerpt:
        "Show jumping, dressage, and tent pegging training in association with Telangana State Equestrian Association (TSEA).",
      schedule: "Year-round coaching • Timings: 6:00 – 10:00 AM & 4:00 – 9:00 PM",
      highlights: [
        "Talent identification and preparation for EFI-recognised competitions.",
        "Arena schooling, course design familiarisation, and performance analytics.",
        "Access to national championship exposure and visiting international coaches.",
      ],
    },
    {
      id: "stick-and-ball",
      title: "Stick & Ball",
      excerpt:
        "Focused sessions to refine mallet control, agility, and accuracy for aspiring and experienced polo players.",
      schedule: "8 sessions / month • Timings: 6:00 – 10:00 AM & 4:00 – 9:00 PM",
      highlights: [
        "Structured drills covering forehand, backhand, nearside, and offsides.",
        "Horse agility exercises for quick directional changes and shot setups.",
        "Small-sided games to apply technique under match-like pressure.",
      ],
      pricingTables: [
        {
          heading: "Stick & Ball Sessions",
          rows: [
            {
              label: "8 Sessions per month",
              price: "₹590 per session",
              total: "₹4,720",
            },
          ],
        },
      ],
    },
    {
      id: "chukkers",
      title: "Chukkers",
      excerpt:
        "Explore the artistry of chukkers at HPRC Club, where riders and horses engage in dynamic play across immaculate fields.",
      schedule: "2 chukkers per week • Timings: 6:00 AM – 10:00 AM & 4:00 PM – 9:00 PM",
      highlights: [
        "Strategize plays and execute precise shots in fast-paced match settings.",
        "Experience the thrill and camaraderie of polo with seasoned players.",
        "Facilities designed for dynamic chukker play and competitive readiness.",
      ],
      pricingTables: [
        {
          heading: "Chukkers Charges",
          rows: [
            {
              label: "2 chukkers per week x 4 weeks (8 chukkers p.m.)",
              price: "₹1,180 per chukker",
              total: "₹9,440",
            },
          ],
        },
      ],
    },
  ] satisfies Programme[],
  knowledge: {
    title: "Ride with confidence",
    summary:
      "Every rider, instructor, and trainer has unique methods, yet certain universal principles ensure safety, respect, and harmony between horse and rider.",
    etiquette: [
      "Keep hands soft—avoid balancing on the reins or causing discomfort to the horse’s mouth.",
      "Maintain heels down and shoulders back for balance, posture, and awareness.",
      "Use reins as a communication line while relying on seat and legs for stability.",
      "Greets horses with a calm presence; a ‘horseman’s handshake’ (offering the back of your hand) helps build trust.",
      "Respect spacing on trail rides, yield to the trail boss, and never gallop past other riders.",
      "Carry in what you carry out—keep arenas and trails free of litter.",
    ],
    gear: [
      "Always wear certified riding helmets and proper boots with heels.",
      "Choose fitted clothing that doesn’t snag; opt for breeches or close-fitting trousers.",
      "Half chaps provide grip and protect legs during schooling sessions.",
      "Riding gloves improve rein control and comfort over extended periods.",
      "Whips and crops are supportive aids—use responsibly with instructor guidance.",
    ],
  },
};
