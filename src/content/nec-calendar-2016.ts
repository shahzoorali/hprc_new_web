// Generate gallery image paths
const generateGalleryImages = () => {
  const images: string[] = [];
  // Main gallery images from nec-2016 folder
  for (let i = 1; i <= 12; i++) {
    const num = i.toString().padStart(3, "0");
    images.push(`/documents/gallery/events/nec-calendar-2016/${num}.jpg`);
  }
  // Additional images
  images.push(`/documents/gallery/events/nec-calendar-2016/events-02.png`);
  images.push(`/documents/gallery/events/nec-calendar-2016/gallery-01.jpg`);
  return images;
};

export const necCalendar2016 = {
  hero: {
    title: "National Equestrian Championship Calendar 2016",
    subtitle: "Hyderabad Polo & Riding Club",
    dates: "2016",
    venue: "Hyderabad Polo & Riding Club",
    address: "Gandipet, Hyderabad",
  },
  overview: {
    description:
      "The National Equestrian Championship Calendar 2016 featured comprehensive equestrian competitions and events throughout the year.",
  },
  gallery: {
    title: "Event Gallery",
    description:
      "Browse through images from the National Equestrian Championship Calendar 2016.",
    images: generateGalleryImages(),
  },
};

export type NecCalendar2016 = typeof necCalendar2016;
