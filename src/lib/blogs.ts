import config from "@payload-config";
import { getPayload } from "payload";
import "server-only";

import type { BlogPost, Media } from "@/payload-types";

// Reads blog posts from the CMS in the shape the two blog pages already use.
//
// Same tactic as lib/news.ts: return the legacy object shape so the pages swap
// a data source without touching their JSX. Here it also removes a real bug —
// the blogPosts array was duplicated across blogs/page.tsx and
// blogs/[slug]/page.tsx and the two copies had drifted out of sync.

export interface BlogSummary {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  featured: boolean;
}

function resolveImage(doc: BlogPost): string {
  if (doc.heroImage && typeof doc.heroImage === "object") {
    const media = doc.heroImage as Media;
    if (media.url) return media.url;
  }
  return doc.heroImagePath ?? "/hero-horse.png";
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function toBlogSummary(doc: BlogPost): BlogSummary {
  return {
    id: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    image: resolveImage(doc),
    category: doc.category ?? "",
    readTime: doc.readTime ?? "",
    date: formatDate(doc.publishedDate),
    author: doc.author ?? "HPRC Team",
    featured: Boolean(doc.featured),
  };
}

export async function getBlogSummaries(): Promise<BlogSummary[]> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "blog-posts",
    where: { _status: { equals: "published" } },
    sort: "-publishedDate",
    limit: 100,
    depth: 1,
  });
  return res.docs.map(toBlogSummary);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "blog-posts",
    where: { slug: { equals: slug }, _status: { equals: "published" } },
    limit: 1,
    depth: 2,
  });
  return (res.docs[0] as BlogPost | undefined) ?? null;
}

export async function getBlogSlugs(): Promise<string[]> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "blog-posts",
    where: { _status: { equals: "published" } },
    limit: 200,
    depth: 0,
  });
  return res.docs.map((d) => d.slug).filter((s): s is string => Boolean(s));
}
