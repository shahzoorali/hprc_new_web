import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

// Publishing in the CMS has to invalidate the rendered pages, otherwise editors
// save a change and the site keeps serving the cached version. Before the CMS a
// content change meant `next build`; these hooks are what replace that.
//
// Paths are revalidated rather than tags because the same article appears in
// several places — its own page, the news index, the events page and the
// homepage strip — and all of them must update together.

// revalidatePath() only works inside a Next.js request context. Payload writes
// also happen outside one — seed scripts, `payload run`, cron jobs — where it
// throws "static generation store missing". Revalidation is best-effort cache
// housekeeping, so a failure must never abort the write that triggered it, or an
// editor's save would fail with an unexplained error.
function safeRevalidate(path: string): boolean {
  try {
    revalidatePath(path);
    return true;
  } catch {
    return false;
  }
}

function pathsForNews(slug?: string | null): string[] {
  const paths = ["/", "/events", "/events/news"];
  if (slug) paths.push(`/events/news/${slug}`);
  return paths;
}

export const revalidateNews: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (req.context?.skipRevalidate) return doc;
  const slugs = new Set<string>();
  if (typeof doc?.slug === "string") slugs.add(doc.slug);
  // A renamed slug must also clear the old URL.
  if (typeof previousDoc?.slug === "string") slugs.add(previousDoc.slug);

  const paths = new Set<string>(pathsForNews());
  for (const s of slugs) paths.add(`/events/news/${s}`);

  let done = 0;
  for (const p of paths) if (safeRevalidate(p)) done++;

  if (done > 0) {
    req.payload.logger.info(`Revalidated ${done} path(s) for news "${doc?.title ?? ""}"`);
  }
  return doc;
};

export const revalidateNewsAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (req.context?.skipRevalidate) return doc;
  for (const p of pathsForNews(doc?.slug)) safeRevalidate(p);
  return doc;
};

export const revalidateBlogPost: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (req.context?.skipRevalidate) return doc;
  const paths = new Set<string>(["/events/blogs"]);
  if (typeof doc?.slug === "string") paths.add(`/events/blogs/${doc.slug}`);
  if (typeof previousDoc?.slug === "string") paths.add(`/events/blogs/${previousDoc.slug}`);
  for (const p of paths) safeRevalidate(p);
  return doc;
};

export const revalidateBlogPostAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (req.context?.skipRevalidate) return doc;
  safeRevalidate("/events/blogs");
  if (doc?.slug) safeRevalidate(`/events/blogs/${doc.slug}`);
  return doc;
};
