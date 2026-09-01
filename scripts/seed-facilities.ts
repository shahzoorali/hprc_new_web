// Seeds Facilities and Programmes.
//
// Run with:  npx payload run ./scripts/seed-facilities.ts
//
// Facility data comes from three places, which is exactly why this was worth
// consolidating: the per-facility content modules (content/tennis.ts etc.), the
// listing entries in content/sports.ts, and data that only existed inside the
// page files themselves — gallery arrays, hero background images and section
// headings — extracted to _migration/facility-pages.json.
import config from "@payload-config";
import { getPayload } from "payload";

import { badmintonContent } from "../src/content/badminton";
import { basketballContent } from "../src/content/basketball";
import { futsalContent } from "../src/content/futsal";
import { gymContent } from "../src/content/gym";
import { programmesContent } from "../src/content/programmes";
import { saunaContent } from "../src/content/sauna";
import { sportsContent } from "../src/content/sports";
import { squashContent } from "../src/content/squash";
import { swimmingContent } from "../src/content/swimming";
import { tennisContent } from "../src/content/tennis";
import pageData from "../src/content/_migration/facility-pages.json";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function withRetry<T>(label: string, fn: () => Promise<T>, attempts = 6): Promise<T> {
  let lastErr: unknown;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const msg = err instanceof Error ? err.message : String(err);
      if (
        !/space quota|catalog changes|WriteConflict|TransientTransactionError|MaxTimeMSExpired|connection|timed out/i.test(
          msg,
        ) ||
        i === attempts
      ) {
        break;
      }
      const wait = 400 * 2 ** (i - 1);
      console.log(`    … ${label}: transient Atlas error, retry ${i} in ${wait}ms`);
      await sleep(wait);
    }
  }
  throw lastErr;
}

const ctx = { context: { skipRevalidate: true } };

type FacilityContent = {
  hero: { eyebrow?: string; title: string; description: string };
  timings: Array<{ label: string; time: string }>;
  pricing: { heading: string; rows: Array<Record<string, string | undefined>>; notes?: string[] };
  rules: Array<{ category: string; items: string[] }>;
  gallery: { heading?: string; description?: string };
};

const MODULES: Record<string, FacilityContent> = {
  tennis: tennisContent as FacilityContent,
  badminton: badmintonContent as FacilityContent,
  squash: squashContent as FacilityContent,
  basketball: basketballContent as FacilityContent,
  swimming: swimmingContent as FacilityContent,
  futsal: futsalContent as FacilityContent,
  gym: gymContent as FacilityContent,
  sauna: saunaContent as FacilityContent,
};

type PageExtras = {
  gallery: Array<{ src: string; alt: string }>;
  background: string | null;
  timingsTitle: string | null;
  pricingDescription: string | null;
  overviewText: string | null;
};

const run = async () => {
  const payload = await getPayload({ config });

  // ---------- Facilities ----------
  console.log("Facilities");
  let created = 0;
  let skipped = 0;

  const order = sportsContent.facilities.map((f) => f.id);
  const slugs = [...new Set([...order, ...Object.keys(MODULES)])];

  for (const [i, slug] of slugs.entries()) {
    const mod = MODULES[slug];
    const listing = sportsContent.facilities.find((f) => f.id === slug);
    const extras = (pageData as Record<string, PageExtras>)[slug];

    if (!mod && !listing) continue;

    const found = await withRetry(slug, () =>
      payload.find({
        collection: "facilities",
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
        draft: true,
      }),
    );
    if (found.docs.length > 0) {
      console.log(`  = skip (exists)  ${slug}`);
      skipped++;
      continue;
    }

    await withRetry(slug, () =>
      payload.create({
        collection: "facilities",
        data: {
          name: listing?.name ?? mod?.hero.title ?? slug,
          slug,
          displayOrder: i,

          // Listing (index page)
          cardDescription: listing?.description ?? mod?.hero.description ?? "",
          timingsSummary: listing?.timings,
          highlights: (listing?.highlights ?? []).map((text) => ({ text })),
          cardImage: listing?.image ? { imagePath: listing.image } : undefined,

          // Page
          hero: mod
            ? {
                eyebrow: mod.hero.eyebrow ?? "Sports Centre",
                title: mod.hero.title,
                description: mod.hero.description,
                backgroundPath: extras?.background ?? undefined,
              }
            : undefined,
          overviewText: extras?.overviewText ?? undefined,

          timingsTitle: extras?.timingsTitle ?? undefined,
          timings: (mod?.timings ?? []).map((t) => ({ label: t.label, time: t.time })),

          pricingHeading: mod?.pricing.heading ?? "CHARGES",
          pricingDescription: extras?.pricingDescription ?? undefined,
          pricingRows: (mod?.pricing.rows ?? []).map((r) => ({
            label: String(r.label ?? ""),
            price: String(r.price ?? ""),
            gst: r.gst ?? undefined,
            total: r.total ?? undefined,
          })),
          pricingNotes: (mod?.pricing.notes ?? []).map((text) => ({ text })),

          rules: (mod?.rules ?? []).map((c) => ({
            category: c.category,
            items: c.items.map((text) => ({ text })),
          })),

          galleryHeading: mod?.gallery.heading ?? undefined,
          galleryDescription: mod?.gallery.description ?? undefined,
          galleryImages: (extras?.gallery ?? []).map((g) => ({
            imagePath: g.src,
            imageAlt: g.alt,
          })),

          _status: "published",
        },
        ...ctx,
      }),
    );

    console.log(
      `  + ${slug.padEnd(11)} ${(extras?.gallery.length ?? 0)} photos, ${mod?.pricing.rows.length ?? 0} price rows, ${mod?.rules.length ?? 0} rule groups`,
    );
    created++;
    await sleep(230);
  }
  console.log(`  facilities: ${created} created, ${skipped} skipped\n`);

  // ---------- Programmes ----------
  console.log("Programmes");
  let pCreated = 0;
  let pSkipped = 0;

  for (const [i, prog] of programmesContent.programmes.entries()) {
    const found = await withRetry(prog.id, () =>
      payload.find({
        collection: "programmes",
        where: { slug: { equals: prog.id } },
        limit: 1,
        depth: 0,
        draft: true,
      }),
    );
    if (found.docs.length > 0) {
      pSkipped++;
      continue;
    }

    await withRetry(prog.id, () =>
      payload.create({
        collection: "programmes",
        data: {
          title: prog.title,
          slug: prog.id,
          excerpt: prog.excerpt,
          schedule: prog.schedule,
          cardImage: prog.image ? { imagePath: prog.image } : undefined,
          highlights: (prog.highlights ?? []).map((text) => ({ text })),
          pricingTables: (prog.pricingTables ?? []).map((t) => ({
            heading: t.heading,
            rows: t.rows.map((r) => ({
              label: r.label,
              price: r.price,
              gst: r.gst ?? undefined,
              total: r.total ?? undefined,
            })),
          })),
          displayOrder: i,
          _status: "published",
        },
        ...ctx,
      }),
    );
    console.log(`  + ${prog.title}`);
    pCreated++;
    await sleep(230);
  }
  console.log(`  programmes: ${pCreated} created, ${pSkipped} skipped`);

  console.log("\nDone.");
  process.exit(0);
};

await run();
