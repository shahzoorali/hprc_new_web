import config from "@payload-config";
import { getPayload } from "payload";
import "server-only";

import type { NavChild, NavItem } from "@/content/navigation";
import type { Homepage, Media, Navigation, SiteSetting } from "@/payload-types";

// Site-wide chrome and the homepage, read back in the shapes
// src/config/site.ts, src/content/navigation.ts and src/content/home.ts
// exposed — so the header, footer, nav and homepage swap a data source without
// markup changes.

function url(upload: unknown, legacyPath?: string | null): string | undefined {
  if (upload && typeof upload === "object") {
    const m = upload as Media;
    if (m.url) return m.url;
  }
  return legacyPath ?? undefined;
}

// ---------- Site settings ----------

export interface SiteConfigData {
  name: string;
  shortName: string;
  description: string;
  contact: { phone: string; email: string; membershipEmail: string; address: string };
  social: { facebook: string; instagram: string; youtube: string; twitter: string };
  primaryActions: Array<{ label: string; href: string; variant: "primary" | "outline" }>;
}

export async function getSiteConfig(): Promise<SiteConfigData> {
  const payload = await getPayload({ config });
  const doc = (await payload.findGlobal({ slug: "site-settings", depth: 0 })) as SiteSetting;
  return {
    name: doc.name ?? "",
    shortName: doc.shortName ?? "",
    description: doc.description ?? "",
    contact: {
      phone: doc.phone ?? "",
      email: doc.email ?? "",
      membershipEmail: doc.membershipEmail ?? doc.email ?? "",
      address: doc.address ?? "",
    },
    social: {
      facebook: doc.facebook ?? "",
      instagram: doc.instagram ?? "",
      youtube: doc.youtube ?? "",
      twitter: doc.twitter ?? "",
    },
    primaryActions: (doc.primaryActions ?? []).map((a) => ({
      label: a.label,
      href: a.href,
      variant: a.variant === "outline" ? "outline" : "primary",
    })),
  };
}

// ---------- Navigation ----------

export async function getNavigation(): Promise<{ primary: NavItem[]; utility: NavChild[] }> {
  const payload = await getPayload({ config });
  const doc = (await payload.findGlobal({ slug: "navigation", depth: 1 })) as Navigation;

  const primary: NavItem[] = (doc.primary ?? []).map((item) => {
    const sections = (item.sections ?? []).map((sec) => ({
      title: sec.title ?? undefined,
      description: sec.description ?? undefined,
      image: url(sec.image, sec.imagePath),
      items: (sec.items ?? []).map((i) => ({ label: i.label, href: i.href })),
    }));

    const featuredTitle = item.featured?.title;
    return {
      label: item.label,
      href: item.href,
      description: item.description ?? undefined,
      // A plain link has no columns; the menu component checks for absence.
      sections: sections.length > 0 ? sections : undefined,
      featured: featuredTitle
        ? {
            title: featuredTitle,
            description: item.featured?.description ?? "",
            href: item.featured?.href ?? "#",
            label: item.featured?.label ?? undefined,
            image: url(item.featured?.image, item.featured?.imagePath),
          }
        : undefined,
    };
  });

  return {
    primary,
    utility: (doc.utility ?? []).map((u) => ({ label: u.label, href: u.href })),
  };
}

// ---------- Homepage ----------

export interface HomeData {
  heroSlides: Array<{
    video?: string;
    image?: string;
    imageAlt: string;
    title: string;
    titleHighlight?: string;
    description: string;
    actions: Array<{ label: string; href: string; variant: "primary" | "outline" }>;
  }>;
  pillars: Array<{ title: string; description: string; href?: string }>;
  highlights: Array<{ title: string; description: string }>;
  events: Array<{ title: string; description: string; href: string; iconName: string }>;
  spotlight: { title: string; description: string; cta: { label: string; href: string } };
  testimonials: Array<{ quote: string; author: string }>;
}

export async function getHomeContent(): Promise<HomeData> {
  const payload = await getPayload({ config });
  const doc = (await payload.findGlobal({ slug: "homepage", depth: 1 })) as Homepage;

  return {
    heroSlides: (doc.heroSlides ?? []).map((s) => ({
      video: s.video ?? undefined,
      image: url(s.image, s.imagePath),
      imageAlt: s.imageAlt ?? "",
      title: s.title,
      titleHighlight: s.titleHighlight ?? undefined,
      description: s.description,
      actions: (s.actions ?? []).map((a) => ({
        label: a.label,
        href: a.href,
        variant: a.variant === "outline" ? "outline" : "primary",
      })),
    })),
    pillars: (doc.pillars ?? []).map((p) => ({
      title: p.title,
      description: p.description,
      href: p.href ?? undefined,
    })),
    highlights: (doc.highlights ?? []).map((h) => ({
      title: h.title,
      description: h.description,
    })),
    events: (doc.events ?? []).map((e) => ({
      title: e.title,
      description: e.description,
      href: e.href ?? "",
      iconName: e.iconName ?? "",
    })),
    spotlight: {
      title: doc.spotlight?.title ?? "",
      description: doc.spotlight?.description ?? "",
      cta: {
        label: doc.spotlight?.cta?.label ?? "",
        href: doc.spotlight?.cta?.href ?? "",
      },
    },
    testimonials: (doc.testimonials ?? []).map((t) => ({ quote: t.quote, author: t.author })),
  };
}
