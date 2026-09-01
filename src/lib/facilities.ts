import config from "@payload-config";
import { getPayload } from "payload";
import "server-only";

import type { PricingRow } from "@/components/ui/pricing-table";
import type { Facility, Media, Programme } from "@/payload-types";

// Data access for the sports centre and programmes sections.

function url(upload: unknown, legacyPath?: string | null): string | undefined {
  if (upload && typeof upload === "object") {
    const m = upload as Media;
    if (m.url) return m.url;
  }
  return legacyPath ?? undefined;
}

function alt(upload: unknown, fallback?: string | null): string {
  if (upload && typeof upload === "object") {
    const m = upload as Media;
    if (m.alt) return m.alt;
  }
  return fallback ?? "";
}

function toPricingRows(
  rows?: Array<{ label: string; price: string; gst?: string | null; total?: string | null }> | null,
): PricingRow[] {
  return (rows ?? []).map((r) => ({
    label: r.label,
    price: r.price,
    gst: r.gst ?? undefined,
    total: r.total ?? undefined,
  }));
}

// ---------- Sports centre index ----------

export interface FacilitySummary {
  id: string;
  name: string;
  description: string;
  image: string;
  timings: string;
  highlights: string[];
}

export async function getFacilitySummaries(): Promise<FacilitySummary[]> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "facilities",
    where: { _status: { equals: "published" } },
    sort: "displayOrder",
    limit: 100,
    depth: 1,
  });

  return res.docs.map((doc: Facility) => ({
    id: doc.slug,
    name: doc.name,
    description: doc.cardDescription,
    image: url(doc.cardImage?.image, doc.cardImage?.imagePath) ?? "",
    timings: doc.timingsSummary ?? "",
    highlights: (doc.highlights ?? []).map((h) => h.text),
  }));
}

// ---------- Facility page ----------

export interface FacilityPageData {
  name: string;
  slug: string;
  hero: { eyebrow: string; title: string; description: string; backgroundImage?: string };
  overviewText?: string;
  formUrl?: string;
  timingsTitle?: string;
  timings: Array<{ label: string; time: string }>;
  pricingHeading: string;
  pricingDescription?: string;
  pricingRows: PricingRow[];
  pricingNotes: string[];
  rulesEyebrow?: string;
  rulesTitle?: string;
  rulesDescription?: string;
  rules: Array<{ category: string; items: string[] }>;
  galleryHeading?: string;
  galleryDescription?: string;
  galleryImages: Array<{ src: string; alt: string }>;
}

function toFacilityPage(doc: Facility): FacilityPageData {
  return {
    name: doc.name,
    slug: doc.slug,
    hero: {
      eyebrow: doc.hero?.eyebrow ?? "Sports Centre",
      title: doc.hero?.title ?? doc.name,
      description: doc.hero?.description ?? doc.cardDescription,
      backgroundImage: url(doc.hero?.background, doc.hero?.backgroundPath),
    },
    overviewText: doc.overviewText ?? undefined,
    formUrl: doc.formUrl ?? undefined,
    timingsTitle: doc.timingsTitle ?? undefined,
    timings: (doc.timings ?? []).map((t) => ({ label: t.label, time: t.time })),
    pricingHeading: doc.pricingHeading ?? "CHARGES",
    pricingDescription: doc.pricingDescription ?? undefined,
    pricingRows: toPricingRows(doc.pricingRows),
    pricingNotes: (doc.pricingNotes ?? []).map((n) => n.text),
    rulesEyebrow: doc.rulesEyebrow ?? undefined,
    rulesTitle: doc.rulesTitle ?? undefined,
    rulesDescription: doc.rulesDescription ?? undefined,
    rules: (doc.rules ?? []).map((c) => ({
      category: c.category,
      items: (c.items ?? []).map((i) => i.text),
    })),
    galleryHeading: doc.galleryHeading ?? undefined,
    galleryDescription: doc.galleryDescription ?? undefined,
    galleryImages: (doc.galleryImages ?? [])
      .map((g) => {
        const src = url(g.image, g.imagePath);
        return src ? { src, alt: alt(g.image, g.imageAlt) } : null;
      })
      .filter((v): v is { src: string; alt: string } => v !== null),
  };
}

export async function getFacility(slug: string): Promise<FacilityPageData | null> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "facilities",
    where: { slug: { equals: slug }, _status: { equals: "published" } },
    limit: 1,
    depth: 2,
  });
  const doc = res.docs[0];
  return doc ? toFacilityPage(doc) : null;
}

export async function getFacilitySlugs(): Promise<string[]> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "facilities",
    where: { _status: { equals: "published" } },
    limit: 100,
    depth: 0,
  });
  return res.docs.map((d) => d.slug).filter((s): s is string => Boolean(s));
}

// ---------- Programmes ----------

export interface ProgrammeData {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  schedule: string;
  highlights: string[];
  pricingTables?: Array<{ heading: string; rows: PricingRow[] }>;
}

function toProgramme(doc: Programme): ProgrammeData {
  return {
    id: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    image: url(doc.cardImage?.image, doc.cardImage?.imagePath) ?? "",
    schedule: doc.schedule ?? "",
    highlights: (doc.highlights ?? []).map((h) => h.text),
    pricingTables: (doc.pricingTables ?? []).map((t) => ({
      heading: t.heading,
      rows: toPricingRows(t.rows),
    })),
  };
}

export async function getProgrammes(): Promise<ProgrammeData[]> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "programmes",
    where: { _status: { equals: "published" } },
    sort: "displayOrder",
    limit: 100,
    depth: 1,
  });
  return res.docs.map(toProgramme);
}

export async function getProgramme(slug: string): Promise<ProgrammeData | null> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "programmes",
    where: { slug: { equals: slug }, _status: { equals: "published" } },
    limit: 1,
    depth: 1,
  });
  const doc = res.docs[0];
  return doc ? toProgramme(doc) : null;
}

export async function getProgrammeSlugs(): Promise<string[]> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "programmes",
    where: { _status: { equals: "published" } },
    limit: 100,
    depth: 0,
  });
  return res.docs.map((d) => d.slug).filter((s): s is string => Boolean(s));
}
