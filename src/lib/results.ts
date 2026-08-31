import config from "@payload-config";
import { getPayload } from "payload";
import "server-only";

import type { ResultClass, ResultEntry } from "@/content/results-types";
import type { Media, ResultClass as ResultClassDoc } from "@/payload-types";

// Reads published results from the CMS in the ResultClass shape that
// components/results/results-board.tsx already renders, so the results pages
// swap a data source without touching their markup.

function photoUrl(upload: unknown, legacyPath?: string | null): string | undefined {
  if (upload && typeof upload === "object") {
    const m = upload as Media;
    if (m.url) return m.url;
  }
  return legacyPath ?? undefined;
}

function toResultClass(doc: ResultClassDoc): ResultClass {
  return {
    title: doc.title,
    discipline: doc.discipline,
    category: doc.category,
    slug: doc.slug,
    // The CMS stores "none" for a directly-judged class; the render type uses null.
    metric: doc.metric === "none" ? null : doc.metric,
    entries: (doc.entries ?? []).map(
      (e): ResultEntry => ({
        pos: e.pos ?? undefined,
        rider: e.rider,
        horse: e.horse,
        club: e.club ?? undefined,
        ageGroup: e.ageGroup ?? undefined,
        score: e.score ?? undefined,
        penalties: e.penalties ?? undefined,
        prize: e.prize ?? undefined,
        photo: photoUrl(e.photo, e.photoPath),
      }),
    ),
  };
}

export interface ResultSetData {
  title: string;
  eventDate?: string;
  showPhotos: boolean;
  classes: ResultClass[];
}

// Look up a result set and its classes by set slug (e.g. "nq-2026").
export async function getResultSet(slug: string): Promise<ResultSetData | null> {
  const payload = await getPayload({ config });

  const sets = await payload.find({
    collection: "result-sets",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  });
  const set = sets.docs[0];
  if (!set) return null;

  const classes = await payload.find({
    collection: "result-classes",
    where: { resultSet: { equals: set.id } },
    sort: "displayOrder",
    limit: 500,
    depth: 1,
  });

  return {
    title: set.title,
    eventDate: set.eventDate ?? undefined,
    showPhotos: Boolean(set.showPhotos),
    classes: classes.docs.map(toResultClass),
  };
}
