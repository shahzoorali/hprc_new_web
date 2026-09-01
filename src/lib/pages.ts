import config from "@payload-config";
import { getPayload } from "payload";
import "server-only";

import type { About, Hospitality, Media, Membership, Person } from "@/payload-types";

// Reads the About / Hospitality / Membership globals and the People collection
// back in the shapes content/about.ts, content/hospitality.ts and
// content/membership.ts exposed, so the bespoke pages that render them swap a
// data source without markup changes.
//
// These pages are heavily designed and do not reduce to blocks; the trade made
// here is the one set out in the migration plan — editable content, fixed
// layout.

function url(upload: unknown, legacyPath?: string | null): string | undefined {
  if (upload && typeof upload === "object") {
    const m = upload as Media;
    if (m.url) return m.url;
  }
  return legacyPath ?? undefined;
}

const texts = (rows?: Array<{ text: string }> | null): string[] => (rows ?? []).map((r) => r.text);

// ---------- About ----------

export interface AboutData {
  hero: { eyebrow?: string; title: string; description: string };
  overview: string[];
  mission: string;
  vision: string;
  values: Array<{ title: string; description: string }>;
  facilities: string[];
  heritage: Array<{ year: string; summary: string }>;
}

export async function getAbout(): Promise<AboutData> {
  const payload = await getPayload({ config });
  const doc = (await payload.findGlobal({ slug: "about", depth: 1 })) as About;
  return {
    hero: {
      eyebrow: doc.hero?.eyebrow ?? undefined,
      title: doc.hero?.title ?? "",
      description: doc.hero?.description ?? "",
    },
    overview: texts(doc.overview),
    mission: doc.mission ?? "",
    vision: doc.vision ?? "",
    values: (doc.values ?? []).map((v) => ({ title: v.title, description: v.description })),
    facilities: texts(doc.facilities),
    heritage: (doc.heritage ?? []).map((h) => ({ year: h.year, summary: h.summary })),
  };
}

// ---------- People ----------

export interface PersonData {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
}

export interface CommitteeData {
  leadership: PersonData[];
  subCommittees: {
    equestrian: PersonData[];
    polo: PersonData[];
    sportsArena: PersonData[];
  };
}

export async function getCommittee(): Promise<CommitteeData> {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "people",
    sort: "displayOrder",
    limit: 200,
    depth: 1,
  });

  const pick = (group: string): PersonData[] =>
    res.docs
      .filter((p: Person) => p.group === group)
      .map((p: Person) => ({
        name: p.name,
        role: p.role,
        bio: p.bio ?? undefined,
        photo: url(p.photo?.image, p.photo?.imagePath),
      }));

  return {
    leadership: pick("leadership"),
    subCommittees: {
      equestrian: pick("equestrian"),
      polo: pick("polo"),
      sportsArena: pick("sportsArena"),
    },
  };
}

// ---------- Hospitality ----------

export interface VenueData {
  name: string;
  description: string;
  fullDescription?: string;
  highlights: string[];
  menuLinks?: Array<{ label: string; href: string }>;
  menuPackages?: Array<{ name: string; price: string; gst?: string; features: string[] }>;
  image?: string;
  logo?: string;
}

export interface HospitalityData {
  hero: { eyebrow?: string; title: string; description: string };
  venues: VenueData[];
  experiences: Array<{ title: string; description: string }>;
}

export async function getHospitality(): Promise<HospitalityData> {
  const payload = await getPayload({ config });
  const doc = (await payload.findGlobal({ slug: "hospitality", depth: 1 })) as Hospitality;
  return {
    hero: {
      eyebrow: doc.hero?.eyebrow ?? undefined,
      title: doc.hero?.title ?? "",
      description: doc.hero?.description ?? "",
    },
    venues: (doc.venues ?? []).map((v) => ({
      name: v.name,
      description: v.description,
      fullDescription: v.fullDescription ?? undefined,
      highlights: texts(v.highlights),
      menuLinks: (v.menuLinks ?? []).map((m) => ({ label: m.label, href: m.href })),
      menuPackages: (v.menuPackages ?? []).map((p) => ({
        name: p.name,
        price: p.price,
        gst: p.gst ?? undefined,
        features: texts(p.features),
      })),
      image: url(v.photo?.image, v.photo?.imagePath),
      logo: url(v.brand?.image, v.brand?.imagePath),
    })),
    experiences: (doc.experiences ?? []).map((e) => ({
      title: e.title,
      description: e.description,
    })),
  };
}

// ---------- Membership ----------

export interface MembershipData {
  hero: { eyebrow?: string; title: string; description: string };
  steps: Array<{ title: string; description: string }>;
  benefits: string[];
  services: Array<{ label: string; href: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export async function getMembership(): Promise<MembershipData> {
  const payload = await getPayload({ config });
  const doc = (await payload.findGlobal({ slug: "membership", depth: 1 })) as Membership;
  return {
    hero: {
      eyebrow: doc.hero?.eyebrow ?? undefined,
      title: doc.hero?.title ?? "",
      description: doc.hero?.description ?? "",
    },
    steps: (doc.steps ?? []).map((s) => ({ title: s.title, description: s.description })),
    benefits: texts(doc.benefits),
    services: (doc.services ?? []).map((s) => ({ label: s.label, href: s.href })),
    faqs: (doc.faqs ?? []).map((f) => ({ question: f.question, answer: f.answer })),
  };
}
