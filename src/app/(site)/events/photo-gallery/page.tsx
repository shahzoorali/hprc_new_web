import { getGalleryCategories } from "@/lib/galleries";

import { PhotoGalleryClient } from "./photo-gallery-client";

// Server wrapper: the gallery UI is heavily interactive (album selection,
// lightbox, category tabs) so it stays a client component. This fetches the
// albums and hands them down, which is the only change from the old page.
export default async function PhotoGalleryPage() {
  const galleryCategories = await getGalleryCategories();
  return <PhotoGalleryClient galleryCategories={galleryCategories} />;
}
