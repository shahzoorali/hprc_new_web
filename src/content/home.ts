import type { HeroAction } from "@/components/ui/page-hero";

export type EventItem = {
  title: string;
  description: string;
  href: string;
  iconName: string;
};

export const homeContent = {
  hero: {
    eyebrow: "Hyderabad Polo & Riding Club",
    title: "Equestrian excellence, vibrant sport, and timeless hospitality",
    description:
      "Discover a 10-acre equestrian estate where riders, athletes, and families come together for polo, riding programmes, sports, dining, and celebrations.",
    actions: [
      { label: "Apply for Membership", href: "/membership", variant: "primary" },
      { label: "Explore Programmes", href: "/programmes", variant: "outline" },
    ] satisfies HeroAction[],
  },
  pillars: [
    {
      title: "Riding & Polo",
      description:
        "From beginner riding camps to advanced polo chukkers, HPRC develops talent with expert coaches, quality horses, and a structured curriculum.",
      href: "/programmes",
    },
    {
      title: "Sports Centre",
      description:
        "Synthetic courts, indoor arenas, and coaching tie-ups create the perfect setting for year-round tennis, badminton, squash, swimming, and more.",
      href: "/sports-centre",
    },
    {
      title: "Hospitality",
      description:
        "Chukkers Restaurant, Snaffles Bistro, banquets, and luxury rooms offer curated experiences for members, guests, and visiting teams.",
      href: "/hospitality",
    },
  ],
  highlights: [
    {
      title: "Tournaments & Achievements",
      description:
        "HPRC teams have clinched prestigious titles including the Arena Polo Championship, Mumbai Polo Season, and the Indian Open.",
    },
    {
      title: "Community & Heritage",
      description:
        "Rooted in Hyderabad’s storied polo legacy dating back to 1877, the club preserves tradition while inspiring new generations of riders.",
    },
    {
      title: "Partnerships",
      description:
        "Associations with Telangana State Equestrian Association and global sport academies bring international expertise to members.",
    },
  ],
  spotlight: {
    title: "International Arena Polo Cup",
    description:
      "Elite teams from India, USA, Luxembourg, and Spain headlined this marquee event, demonstrating HPRC’s capability to host world-class tournaments.",
    cta: { label: "View Events Calendar", href: "/events" },
  },
  testimonials: [
    {
      quote:
        "HPRC has redefined the riding experience in Hyderabad—superb horses, structured training, and a community that welcomes every rider.",
      author: "Member since 2012",
    },
    {
      quote:
        "The Sports Centre rivals leading metropolitan clubs. Our family enjoys weekend tennis clinics while the kids attend riding camp.",
      author: "Family Membership",
    },
  ],
  events: [
    {
      title: "Learn Riding",
      description:
        "HPRC conducts various training events in riding for members of all age groups in order to help you excel at the sport.",
      href: "/programmes/beginners",
      iconName: "book",
    },
    {
      title: "Weekend Getaway",
      description:
        "We are coming up with Rooms very soon, that may be booked by our members and their guests for the perfect weekend getaways.",
      href: "/hospitality/luxury-rooms",
      iconName: "home",
    },
    {
      title: "Banquet Hall",
      description:
        "Elegantly designed to provide a luxurious setting and impeccable service for your special occasions. Perfect for hosting weddings, corporate events and social gatherings.",
      href: "/hospitality/banquets",
      iconName: "building",
    },
    {
      title: "Polo",
      description:
        "Lose yourself in the glamorous world of polo at the exclusive Hyderabad Polo & Riding Club. Even complete novices are given the strong foundations to excel.",
      href: "/programmes/polo",
      iconName: "lightning",
    },
    {
      title: "Sports Center",
      description:
        "HPRC has many options for a sports enthusiast to stay engaged. Besides Polo, equestrian and riding facilities we offer Basketball, Tennis, Squash, Badminton, Swimming and Futsal.",
      href: "/sports-centre",
      iconName: "check",
    },
    {
      title: "Restaurants",
      description:
        "HPRC features two exquisite dining options where members can enjoy a culinary experience. Elegant dining experience at Chukkers and a more relaxed & casual atmosphere at Snaffles Bistro, both offering delicious cuisines.",
      href: "/hospitality",
      iconName: "utensils",
    },
  ],
};
