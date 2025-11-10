import { siteConfig } from "@/config/site";

export const contactContent = {
  hero: {
    eyebrow: "Contact",
    title: "Plan your visit to HPRC",
    description:
      "Our membership and events teams are here to help you schedule tours, riding assessments, sports bookings, and celebrations across the club.",
  },
  address: siteConfig.contact.address,
  phone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  membershipEmail: siteConfig.contact.membershipEmail,
  hours: [
    { label: "Riding Arenas", value: "6:00 – 10:00 AM & 4:00 – 9:00 PM" },
    { label: "Sports Centre", value: "6:00 – 10:00 AM & 4:00 – 9:00 PM" },
    { label: "Hospitality Venues", value: "7:00 AM – 11:00 PM" },
    { label: "Administration Office", value: "10:00 AM – 6:00 PM (Mon – Sat)" },
  ],
  mapUrl:
    "https://www.google.com/maps?ll=17.352588,78.339242&z=15&t=m&hl=en-US&gl=IN&mapclient=embed&cid=8606793467653630286",
  enquiryNotes: [
    "For riding trials, please share your current experience level and preferred timings.",
    "Event enquiries should include tentative dates, number of guests, and any thematic requirements.",
    "Corporate and school group visits can be customised with equestrian demonstrations and sports centre access.",
  ],
};
