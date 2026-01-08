// Generate gallery image paths - files are named 01.jpg, 02.jpg, etc., plus 010.jpg, 011-019.jpg, events-02.png, gallery-01.jpg
const generateGalleryImages = () => {
  const images: string[] = [];
  // Main gallery images from hprc_sport folder (01-09, then 010-019)
  for (let i = 1; i <= 9; i++) {
    const num = i.toString().padStart(2, "0");
    images.push(`/documents/gallery/events/hprc-sport-complex/${num}.jpg`);
  }
  // 010-019
  for (let i = 10; i <= 19; i++) {
    images.push(
      `/documents/gallery/events/hprc-sport-complex/${i.toString().padStart(3, "0")}.jpg`,
    );
  }
  // Additional images
  images.push(`/documents/gallery/events/hprc-sport-complex/events-02.png`);
  images.push(`/documents/gallery/events/hprc-sport-complex/gallery-01.jpg`);
  return images;
};

export const hprcSportComplex = {
  hero: {
    title: "HPRC Sport Complex",
    subtitle: "Hyderabad Polo & Riding Club",
    dates: "2016",
    venue: "Hyderabad Polo & Riding Club",
    address: "Gandipet, Hyderabad",
  },
  overview: {
    description:
      "The HPRC Sport Complex features world-class facilities for various sports and recreational activities.",
  },
  gallery: {
    title: "Event Gallery",
    description: "Browse through images of the HPRC Sport Complex facilities.",
    images: generateGalleryImages(),
  },
};

export type HprcSportComplex = typeof hprcSportComplex;
