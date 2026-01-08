export type EventCategory = {
  name: string;
  ageRange: string;
  description: string;
};

export type EventDiscipline = {
  name: string;
  description: string;
};

export type DownloadLink = {
  label: string;
  url: string;
  type: "prospectus" | "dressage-test";
};

// Gallery link - no images on the page, just a link to explore
const galleryLink = "/events/photo-gallery";

export const firstRelTenthHydHorseShow = {
  hero: {
    title: "1st Regional Equestrian League & 10th Hyderabad Horse Show",
    subtitle: "Organised By Telangana State Equestrian Association (TSEA)",
    association: "In Association with Hyderabad Polo and Riding Club (HPRC)",
    dates: "22nd - 23rd September, 2018",
    time: "Time: 09:00 hrs to 18:00 hrs",
    venue: "HYDERABAD POLO & RIDING CLUB",
    address:
      "Aziz Nagar, Moinabad Road, Near Mrugavani National Park (Deer Park), Hyderabad, Telangana India, 5000075",
    phone: "+91 9177000056",
  },
  overview: {
    description:
      "Organised By Telangana State Equestrian Association (TSEA). In Association with Hyderabad Polo and Riding Club (HPRC). Please download the Prospectus for the enrollment here –",
    eventDetails:
      "Events such as Dressage, Show Jumping & Tent Pegging in different categories viz., children II (for 10 to 12 years), Juniors (for 14 to 18 Years), Seniors (for above 18 years) were conducted.",
    significance:
      "For taking part in Nationals. Riders must qualify In two RELs as per the rules of the Equestrian Federation of India (EFI).",
  },
  disciplines: [
    {
      name: "Dressage",
      description:
        "A discipline where horse and rider perform a series of predetermined movements from memory, demonstrating harmony, precision, and elegance.",
    },
    {
      name: "Show Jumping",
      description:
        "A timed event where horse and rider navigate a course of obstacles, testing the combination's speed, accuracy, and jumping ability.",
    },
    {
      name: "Tent Pegging",
      description:
        "A traditional equestrian sport where riders attempt to pick up small targets (tent pegs) from the ground while riding at speed.",
    },
  ] satisfies EventDiscipline[],
  categories: [
    {
      name: "Children II",
      ageRange: "for 10 to 12 years",
      description: "Young riders competing in their first major equestrian competitions.",
    },
    {
      name: "Juniors",
      ageRange: "for 14 to 18 Years",
      description: "Teenage riders demonstrating advanced skills and competitive experience.",
    },
    {
      name: "Seniors",
      ageRange: "for above 18 years",
      description: "Adult riders showcasing professional-level equestrian expertise.",
    },
  ] satisfies EventCategory[],
  results: {
    status: "Event Successfully Completed",
    summary:
      "Hyderabad Polo & Riding Club hosted the 1st REGIONAL EQUESTRIAN LEAGUE (REL) in association with the TELANGANA STATE EQUESTRIAN ASSOCIATION (TSEA). on 22nd & 23rd September, 2018. Events such as Dressage, Show Jumping & Tent Pegging in different categories viz., children II (for 10 to 12 years), Juniors (for 14 to 18 Years), Seniors(for above 18 years) were conducted.",
    significance:
      "For taking part in Nationals. Riders must qualify In two RELs as per the rules of the Equestrian federation of India (EFI).",
    statistics: {
      totalParticipations: 157,
      qualifiedRiders: 9,
      qualifiedParticipations: 10,
      categoriesQualified: 7,
    },
    details:
      "As many as 157 participations were there, from which 9 riders (10 Participations) were qualified in 7 different categories during 1st REL.",
  },
  downloads: [
    {
      label: "Download Prospectus",
      url: "/documents/events/1st-rel-10th-hyd-horse-show/prospectus-1st-rel-10th-horse-show.pdf",
      type: "prospectus",
    },
    {
      label: "Dressage Test for Children I",
      url: "/documents/events/1st-rel-10th-hyd-horse-show/dressage-test-children-i.pdf",
      type: "dressage-test",
    },
    {
      label: "Dressage Test for Children II",
      url: "/documents/events/1st-rel-10th-hyd-horse-show/dressage-test-children-ii.pdf",
      type: "dressage-test",
    },
    {
      label: "Dressage Test for Junior Riders",
      url: "/documents/events/1st-rel-10th-hyd-horse-show/dressage-test-junior-riders.pdf",
      type: "dressage-test",
    },
  ] satisfies DownloadLink[],
  gallery: {
    title: "Event Gallery",
    description:
      "Explore through images from the 1st Regional Equestrian League & 10th Hyderabad Horse Show event.",
    href: galleryLink,
  },
};

export type FirstRelTenthHydHorseShow = typeof firstRelTenthHydHorseShow;
