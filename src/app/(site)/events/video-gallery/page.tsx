import { getVideoGallery } from "@/lib/galleries";

import { VideoGalleryClient } from "./video-gallery-client";

// Server wrapper — the video grid keeps client-side state for the active
// category and the selected video, so the interactive part stays a client
// component and only the data source moves.
export default async function VideoGalleryPage() {
  const { featuredVideos, videoCategories } = await getVideoGallery();
  return <VideoGalleryClient featuredVideos={featuredVideos} videoCategories={videoCategories} />;
}
