import config from "@payload-config";
import { getPayload } from "payload";
import "server-only";

import type { Album, GalleryCategory, Media, Newsletter, Video } from "@/payload-types";

// Reads the phase-2 collections and returns them in the exact shapes the three
// gallery pages already use, so those pages swap a data source without touching
// their JSX. Same tactic as lib/news.ts and lib/blogs.ts.

function fileUrl(upload: unknown, legacyPath?: string | null): string {
  if (upload && typeof upload === "object") {
    const m = upload as Media;
    if (m.url) return m.url;
  }
  return legacyPath ?? "";
}

// ---------- Photo gallery ----------

export interface LegacyAlbum {
  id: string;
  title: string;
  coverImage: string;
  images: string[];
  year?: string;
  date?: string;
}

export interface LegacyGalleryCategory {
  id: string;
  name: string;
  description: string;
  albums: LegacyAlbum[];
}

function toLegacyAlbum(doc: Album): LegacyAlbum {
  const images = (doc.images ?? [])
    .map((row) => fileUrl(row.image, row.imagePath))
    .filter((src) => src.length > 0);

  return {
    id: doc.slug,
    title: doc.title,
    // Fall back to the first photo so an album without an explicit cover still
    // renders — the old data always had one, new albums might not.
    coverImage: fileUrl(doc.cover?.image, doc.cover?.imagePath) || images[0] || "",
    images,
    year: doc.year ?? undefined,
    date: doc.date ?? undefined,
  };
}

export async function getGalleryCategories(): Promise<LegacyGalleryCategory[]> {
  const payload = await getPayload({ config });

  const [cats, albums] = await Promise.all([
    payload.find({ collection: "gallery-categories", sort: "displayOrder", limit: 50, depth: 0 }),
    payload.find({ collection: "albums", sort: "displayOrder", limit: 500, depth: 1 }),
  ]);

  return cats.docs.map((cat: GalleryCategory) => ({
    id: cat.slug,
    name: cat.name,
    description: cat.description ?? "",
    albums: albums.docs
      .filter((a) => {
        const c = a.category;
        const id = typeof c === "object" && c !== null ? c.id : c;
        return String(id) === String(cat.id);
      })
      .map(toLegacyAlbum),
  }));
}

// ---------- Video gallery ----------

export interface LegacyVideo {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  views?: string;
  category?: string;
  featured?: boolean;
}

export interface LegacyVideoCategory {
  id: string;
  name: string;
  icon: string;
  videos: LegacyVideo[];
}

function toLegacyVideo(doc: Video): LegacyVideo {
  return {
    id: String(doc.id),
    title: doc.title,
    description: doc.description ?? "",
    youtubeId: doc.youtubeId,
    duration: doc.duration ?? "",
    views: doc.views ?? undefined,
  };
}

export async function getVideoGallery(): Promise<{
  featuredVideos: LegacyVideo[];
  videoCategories: LegacyVideoCategory[];
}> {
  const payload = await getPayload({ config });

  const [cats, vids] = await Promise.all([
    payload.find({ collection: "video-categories", sort: "displayOrder", limit: 50, depth: 0 }),
    payload.find({ collection: "videos", sort: "displayOrder", limit: 500, depth: 1 }),
  ]);

  const featuredVideos = vids.docs
    .filter((v) => v.featured)
    .map((v) => ({ ...toLegacyVideo(v), featured: true }));

  const videoCategories = cats.docs.map((cat) => ({
    id: cat.slug,
    name: cat.name,
    icon: cat.icon ?? "",
    videos: vids.docs
      .filter((v) => {
        if (v.featured) return false;
        const c = v.category;
        const id = typeof c === "object" && c !== null ? c.id : c;
        return String(id) === String(cat.id);
      })
      .map(toLegacyVideo),
  }));

  return { featuredVideos, videoCategories };
}

// ---------- Newsletters ----------

export interface LegacyNewsletter {
  filename?: string;
  title: string;
  date: string;
  /** "pdf" opens in the flipbook viewer; "html" routes to its own reader page. */
  format: "pdf" | "html";
  pdfUrl?: string;
  href?: string;
  featuredImage: string;
  description: string;
  imagePosition?: string;
}

export async function getNewsletters(): Promise<LegacyNewsletter[]> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "newsletters",
    sort: "displayOrder",
    limit: 100,
    depth: 1,
  });

  return res.docs.map((doc: Newsletter) => {
    const format = doc.format === "html" ? "html" : "pdf";
    const pdfUrl = format === "pdf" ? fileUrl(doc.pdf, doc.pdfPath) : "";
    return {
      filename: pdfUrl ? (pdfUrl.split("/").pop() ?? "") : undefined,
      title: doc.title,
      date: doc.date,
      format,
      pdfUrl: pdfUrl || undefined,
      href: doc.href ?? undefined,
      featuredImage: fileUrl(doc.cover?.image, doc.cover?.imagePath),
      description: doc.description ?? "",
      imagePosition: doc.imagePosition ?? undefined,
    };
  });
}
