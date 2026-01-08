// Generate gallery image paths - 125 images from nec folder
// Files 001-102 are .jpeg, files 103-122 are .jpg
const generateGalleryImages = () => {
  const images: string[] = [];
  // Main gallery images from nec folder (001-102 are .jpeg)
  for (let i = 1; i <= 102; i++) {
    const num = i.toString().padStart(3, "0");
    images.push(`/documents/gallery/events/hprc-international-arena-polo-championship/${num}.jpeg`);
  }
  // Files 103-122 are .jpg
  for (let i = 103; i <= 122; i++) {
    const num = i.toString().padStart(3, "0");
    images.push(`/documents/gallery/events/hprc-international-arena-polo-championship/${num}.jpg`);
  }
  // Additional images
  images.push(`/documents/gallery/events/hprc-international-arena-polo-championship/events-02.png`);
  images.push(`/documents/gallery/events/hprc-international-arena-polo-championship/gallery-01.jpg`);
  return images;
};

export const hprcInternationalArenaPoloChampionship = {
  hero: {
    title: "HPRC International Arena Polo Championship",
    subtitle: "Hyderabad Polo & Riding Club",
    dates: "2016",
    venue: "Hyderabad Polo & Riding Club",
    address: "Gandipet, Hyderabad",
  },
  overview: {
    description:
      "The HPRC International Arena Polo Championship brought together elite polo players from around the world for an unforgettable competition.",
  },
  gallery: {
    title: "Event Gallery",
    description:
      "Browse through images from the HPRC International Arena Polo Championship event.",
    images: generateGalleryImages(),
  },
};

export type HprcInternationalArenaPoloChampionship = typeof hprcInternationalArenaPoloChampionship;
