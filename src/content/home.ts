import type { HeroAction } from "@/components/ui/page-hero";

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
};
