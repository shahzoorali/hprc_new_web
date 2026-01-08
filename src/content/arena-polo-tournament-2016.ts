export type DownloadLink = {
  label: string;
  url: string;
  type: "prospectus" | "brochure";
};

// Generate gallery image paths
const generateGalleryImages = () => {
  const images: string[] = [];
  // Main gallery images from nec-2016 folder
  for (let i = 1; i <= 12; i++) {
    const num = i.toString().padStart(3, "0");
    images.push(`/documents/gallery/events/arena-polo-tournament-2016/${num}.jpg`);
  }
  // Additional images
  images.push(`/documents/gallery/events/arena-polo-tournament-2016/events-01.png`);
  images.push(`/documents/gallery/events/arena-polo-tournament-2016/gallery-01.jpg`);
  return images;
};

export const arenaPoloTournament2016 = {
  hero: {
    title: "Arena Polo Tournament 2016",
    subtitle: "Hyderabad Polo & Riding Club",
    dates: "11th to 17th April, 2016",
    venue: "Hyderabad Polo & Riding Club",
    address: "Gandipet, Hyderabad",
  },
  overview: {
    description:
      "The Arena Polo Tournament 2016 featured multiple exciting tournaments and exhibition matches showcasing world-class arena polo competition.",
  },
  tournaments: [
    {
      name: "HPRC Rolling Trophy",
      dates: "11th to 13th April",
      goal: "4 Goal Tournament",
      description: "Competitive 4-goal arena polo tournament.",
    },
    {
      name: "Telangana Cup",
      dates: "14th to 17th April",
      goal: "6 Goal Tournament",
      description: "Premier 6-goal arena polo championship.",
    },
    {
      name: "Sponsor's Exhibition Match",
      dates: "17th April",
      goal: "Exhibition",
      description: "Special exhibition match for sponsors and guests.",
    },
  ],
  results: {
    status: "Event Successfully Completed",
    summary:
      "The Arena Polo Tournament 2016 was successfully completed with exceptional participation and competitive matches.",
  },
  downloads: [
    {
      label: "Download Prospectus",
      url: "/documents/events/arena-polo-tournament-2016/HPRC-Arena-Polo-Prospectus-2016.pdf",
      type: "prospectus",
    },
    {
      label: "Download Final Brochure",
      url: "/documents/events/arena-polo-tournament-2016/final-brochure.pdf",
      type: "brochure",
    },
  ] satisfies DownloadLink[],
  gallery: {
    title: "Event Gallery",
    description: "Browse through images from the Arena Polo Tournament 2016 event.",
    images: generateGalleryImages(),
  },
};

export type ArenaPoloTournament2016 = typeof arenaPoloTournament2016;
