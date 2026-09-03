import config from "@payload-config";
import { getPayload } from "payload";
import "server-only";

import { eventsContent } from "@/content/events";
import type { EventHighlight, UpcomingEvent } from "@/content/events";
import type { Event, Media } from "@/payload-types";

// Reads events from the CMS in the shapes the listing pages already use
// (UpcomingEvent and EventHighlight from content/events.ts), so /events,
// /events/upcoming and /events/past swap a data source without markup changes.
//
// The point of this collection is that `status` now drives those listings. The
// two arrays it replaces had to be hand-edited by a developer whenever an event
// finished.

function imageUrl(upload: unknown, legacyPath?: string | null): string | undefined {
  if (upload && typeof upload === "object") {
    const m = upload as Media;
    if (m.url) return m.url;
  }
  return legacyPath ?? undefined;
}

function href(doc: Event): string {
  return doc.linkOverride || `/events/${doc.slug}`;
}

function label(doc: Event): string {
  if (doc.dateLabel) return doc.dateLabel;
  const d = new Date(doc.startDate);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

const UPCOMING_STATUSES = ["upcoming", "registration-open", "in-progress"];

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "events",
    where: { _status: { equals: "published" }, status: { in: UPCOMING_STATUSES } },
    sort: "startDate",
    limit: 100,
    depth: 1,
  });
  const cmsDocs: UpcomingEvent[] = res.docs.map((doc) => ({
    title: doc.title,
    date: label(doc),
    description: doc.excerpt,
    link: href(doc),
  }));

  // Combine with static upcoming events, filtering out duplicates by link or title
  const staticDocs = eventsContent.upcoming || [];
  const combined = [...cmsDocs];
  for (const item of staticDocs) {
    if (!combined.some((c) => (c.link && c.link === item.link) || c.title === item.title)) {
      combined.push(item);
    }
  }
  return combined;
}

export async function getPastEvents(): Promise<EventHighlight[]> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "events",
    where: { _status: { equals: "published" }, status: { equals: "completed" } },
    sort: "-startDate",
    limit: 100,
    depth: 1,
  });
  return res.docs.map((doc) => ({
    title: doc.title,
    description: doc.excerpt,
    link: href(doc),
    image: imageUrl(doc.cardImage?.image, doc.cardImage?.imagePath),
  }));
}

// A single CMS-built event page. Returns null for the events still rendered
// from their own hand-built page under app/(site)/events/.
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "events",
    where: { slug: { equals: slug }, _status: { equals: "published" } },
    limit: 1,
    depth: 2,
  });
  return (res.docs[0] as Event | undefined) ?? null;
}

export async function getRenderableEventSlugs(): Promise<string[]> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "events",
    where: { _status: { equals: "published" } },
    limit: 200,
    depth: 0,
  });
  return res.docs
    .filter((d) => Array.isArray(d.body) && d.body.length > 0)
    .map((d) => d.slug)
    .filter((s): s is string => Boolean(s));
}
