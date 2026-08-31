import config from "@payload-config";
import { getPayload } from "payload";
import "server-only";

import type { NewsArticle } from "@/content/events";
import type { Media, News } from "@/payload-types";

// Reads news from the CMS and returns it in the SAME shape the site already
// used (`NewsArticle` from content/events.ts).
//
// This is deliberate: the news index, the /events page and the homepage strip
// all render that shape today. Returning it unchanged means those pages swap one
// import and stay otherwise untouched — no JSX changes, so no chance of a visual
// regression while the data source moves underneath them.

function resolveImage(doc: News): string | undefined {
  if (doc.heroImage && typeof doc.heroImage === "object") {
    const media = doc.heroImage as Media;
    if (media.url) return media.url;
  }
  return doc.heroImagePath ?? undefined;
}

function resolveDate(doc: News): string {
  // Editors can pin an exact display string; otherwise format the real date.
  if (doc.dateLabel) return doc.dateLabel;
  const d = new Date(doc.publishedDate);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function resolveUrl(doc: News): string {
  if (doc.linkType === "external") return doc.externalUrl ?? "#";
  return `/events/news/${doc.slug}`;
}

export function toNewsArticle(doc: News): NewsArticle {
  return {
    title: doc.title,
    date: resolveDate(doc),
    source: doc.source ?? "",
    excerpt: doc.excerpt,
    url: resolveUrl(doc),
    category: doc.category ?? undefined,
    imageUrl: resolveImage(doc),
  };
}

// All published news, newest first.
export async function getNewsArticles(limit = 100): Promise<NewsArticle[]> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "news",
    where: { _status: { equals: "published" } },
    sort: ["-featured", "-publishedDate"],
    limit,
    depth: 1,
  });
  return res.docs.map(toNewsArticle);
}

// A single article by slug, for /events/news/[slug]. Returns null when the slug
// belongs to one of the pages still rendered from code.
export async function getNewsArticleBySlug(slug: string, draft = false): Promise<News | null> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "news",
    where: {
      slug: { equals: slug },
      linkType: { equals: "internal" },
      ...(draft ? {} : { _status: { equals: "published" } }),
    },
    limit: 1,
    depth: 2,
    draft,
  });
  return (res.docs[0] as News | undefined) ?? null;
}

// Slugs of CMS articles that actually have a body worth rendering. Used by
// generateStaticParams so migrated articles prerender.
export async function getRenderableNewsSlugs(): Promise<string[]> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "news",
    where: {
      _status: { equals: "published" },
      linkType: { equals: "internal" },
    },
    limit: 200,
    depth: 0,
  });
  return res.docs
    .filter((d) => Array.isArray(d.body) && d.body.length > 0)
    .map((d) => d.slug)
    .filter((s): s is string => Boolean(s));
}
