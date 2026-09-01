// Seeds the About / Hospitality / Membership globals and the People collection
// from content/about.ts, content/hospitality.ts and content/membership.ts.
//
// Run with:  npx payload run ./scripts/seed-pages.ts
//
// Globals are idempotent by nature (there is only one document), so this
// overwrites them. People are matched by name + group and skipped if present.
import config from "@payload-config";
import { getPayload } from "payload";

import { aboutContent } from "../src/content/about";
import { hospitalityContent } from "../src/content/hospitality";
import { membershipContent } from "../src/content/membership";

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

const run = async () => {
  const payload = await getPayload({ config });

  // ---------- About ----------
  console.log("About global");
  await withRetry("about", () =>
    payload.updateGlobal({
      slug: "about",
      data: {
        hero: aboutContent.hero,
        overview: (aboutContent.overview ?? []).map((text: string) => ({ text })),
        mission: aboutContent.mission,
        vision: aboutContent.vision,
        values: aboutContent.values,
        facilities: (aboutContent.facilities ?? []).map((text: string) => ({ text })),
        heritage: aboutContent.heritage,
      },
      ...ctx,
    }),
  );
  console.log(
    `  + hero, ${aboutContent.overview.length} paragraphs, ${aboutContent.values.length} values, ` +
      `${aboutContent.facilities.length} facilities, ${aboutContent.heritage.length} milestones`,
  );

  // ---------- People ----------
  console.log("\nPeople");
  const groups: Array<{ key: string; rows: Array<{ name: string; role: string; bio?: string }> }> = [
    { key: "leadership", rows: aboutContent.leadership },
    { key: "equestrian", rows: aboutContent.subCommittees.equestrian },
    { key: "polo", rows: aboutContent.subCommittees.polo },
    { key: "sportsArena", rows: aboutContent.subCommittees.sportsArena },
  ];

  let created = 0;
  let skipped = 0;
  for (const g of groups) {
    for (const [i, person] of (g.rows ?? []).entries()) {
      const found = await withRetry(person.name, () =>
        payload.find({
          collection: "people",
          where: { name: { equals: person.name }, group: { equals: g.key } },
          limit: 1,
          depth: 0,
        }),
      );
      if (found.docs.length > 0) {
        skipped++;
        continue;
      }
      await withRetry(person.name, () =>
        payload.create({
          collection: "people",
          data: {
            name: person.name,
            role: person.role,
            group: g.key as "leadership" | "equestrian" | "polo" | "sportsArena",
            bio: person.bio,
            displayOrder: i,
          },
          ...ctx,
        }),
      );
      created++;
      await sleep(180);
    }
    console.log(`  ${g.key.padEnd(12)} ${(g.rows ?? []).length}`);
  }
  console.log(`  people: ${created} created, ${skipped} skipped`);

  // ---------- Hospitality ----------
  console.log("\nHospitality global");
  await withRetry("hospitality", () =>
    payload.updateGlobal({
      slug: "hospitality",
      data: {
        hero: hospitalityContent.hero,
        venues: hospitalityContent.venues.map(
          (v: {
            name: string;
            description: string;
            fullDescription?: string;
            highlights?: string[];
            menuLinks?: Array<{ label: string; href: string }>;
            menuPackages?: Array<{
              name: string;
              price: string;
              gst?: string;
              features?: string[];
            }>;
            image?: string;
            logo?: string;
          }) => ({
            name: v.name,
            description: v.description,
            fullDescription: v.fullDescription,
            highlights: (v.highlights ?? []).map((text) => ({ text })),
            menuLinks: v.menuLinks ?? [],
            menuPackages: (v.menuPackages ?? []).map((mp) => ({
              name: mp.name,
              price: mp.price,
              gst: mp.gst,
              features: (mp.features ?? []).map((text) => ({ text })),
            })),
            photo: v.image ? { imagePath: v.image } : undefined,
            brand: v.logo ? { imagePath: v.logo } : undefined,
          }),
        ),
        experiences: hospitalityContent.experiences,
      },
      ...ctx,
    }),
  );
  console.log(
    `  + ${hospitalityContent.venues.length} venues, ${hospitalityContent.experiences.length} experiences`,
  );

  // ---------- Membership ----------
  console.log("\nMembership global");
  await withRetry("membership", () =>
    payload.updateGlobal({
      slug: "membership",
      data: {
        hero: membershipContent.hero,
        steps: membershipContent.steps,
        benefits: (membershipContent.benefits ?? []).map((text: string) => ({ text })),
        services: membershipContent.services,
        faqs: membershipContent.faqs,
      },
      ...ctx,
    }),
  );
  console.log(
    `  + ${membershipContent.steps.length} steps, ${membershipContent.benefits.length} benefits, ` +
      `${membershipContent.services.length} links, ${membershipContent.faqs.length} FAQs`,
  );

  console.log("\nDone.");
  process.exit(0);
};

await run();
