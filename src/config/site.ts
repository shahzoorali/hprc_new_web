export const siteConfig = {
  name: "Hyderabad Polo & Riding Club",
  shortName: "HPRC",
  description:
    "Hyderabad Polo & Riding Club (HPRC) is the premier destination for riding, polo, sports, and lifestyle experiences in Hyderabad.",
  contact: {
    phone: "+91 9177 00 00 56",
    email: "info@hprc.co.in",
    membershipEmail: "reaz@hprc.co.in",
    address:
      "Near Mrugavani Resort and Spa, Aziz Nagar Village, Gandipet, Ranga Reddy District, Hyderabad, Telangana, India - 500075",
  },
  social: {
    facebook: "https://www.facebook.com/hydprc",
    instagram: "https://www.instagram.com/hydprc?igsh=aWtteGJhOHU2Mmxl",
    youtube: "https://www.youtube.com/channel/UC40silYJ07LvOjP4bnuRTqg",
    twitter: "https://x.com/hydpolorc",
  },
  primaryActions: [
    { label: "Apply for Membership", href: "/membership", variant: "primary" },
    { label: "Explore Programmes", href: "/programmes", variant: "outline" },
  ],
};

export type SiteConfig = typeof siteConfig;
