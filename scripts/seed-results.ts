// Seeds result sets and classes from content/results-nq.ts and results-ec.ts.
//
// Run with:  npx payload run ./scripts/seed-results.ts
//
// Idempotent — sets are matched by slug, classes by set + slug.
import config from "@payload-config";
import { getPayload } from "payload";

import { ecAugResults } from "../src/content/results-ec";
import { nqResults } from "../src/content/results-nq";
import type { ResultClass } from "../src/content/results-types";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Atlas M0 checks its storage quota on every write and intermittently times that
// check out; it also cannot create a collection inside a transaction on first
// write. Both are transient.
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

const SETS: Array<{
  title: string;
  slug: string;
  eventDate: string;
  showPhotos: boolean;
  classes: ResultClass[];
}> = [
  {
    title: "National Qualifier 2026",
    slug: "nq-2026",
    eventDate: "12–14 August 2026 · Gandipet",
    // The NQ page renders with showPhotos={false} — most riders entered offline
    // and have no photo on file.
    showPhotos: false,
    classes: nqResults,
  },
  {
    title: "2nd HPRC Equestrian Challenge 2026",
    slug: "ec-aug-2026",
    eventDate: "14–16 August 2026 · Gandipet",
    showPhotos: true,
    classes: ecAugResults,
  },
];

const run = async () => {
  const payload = await getPayload({ config });

  for (const set of SETS) {
    console.log(`\n${set.title}`);

    let setId: string;
    const foundSet = await withRetry(set.slug, () =>
      payload.find({
        collection: "result-sets",
        where: { slug: { equals: set.slug } },
        limit: 1,
        depth: 0,
      }),
    );

    if (foundSet.docs.length > 0) {
      setId = String(foundSet.docs[0].id);
      console.log("  = set exists");
    } else {
      const doc = await withRetry(set.slug, () =>
        payload.create({
          collection: "result-sets",
          data: {
            title: set.title,
            slug: set.slug,
            eventDate: set.eventDate,
            showPhotos: set.showPhotos,
          },
          ...ctx,
        }),
      );
      setId = String(doc.id);
      console.log("  + set created");
      await sleep(200);
    }

    let created = 0;
    let skipped = 0;
    let entryCount = 0;

    for (const [i, cls] of set.classes.entries()) {
      const found = await withRetry(cls.slug, () =>
        payload.find({
          collection: "result-classes",
          where: { slug: { equals: cls.slug }, resultSet: { equals: setId } },
          limit: 1,
          depth: 0,
        }),
      );
      if (found.docs.length > 0) {
        skipped++;
        continue;
      }

      await withRetry(cls.slug, () =>
        payload.create({
          collection: "result-classes",
          data: {
            resultSet: setId,
            title: cls.title,
            slug: cls.slug,
            discipline: cls.discipline,
            category: cls.category,
            // The source type uses null for "judged directly"; the CMS uses the
            // explicit value "none" so the select always has a value.
            metric: cls.metric ?? "none",
            displayOrder: i,
            entries: cls.entries.map((e) => ({
              pos: e.pos ?? undefined,
              rider: e.rider,
              horse: e.horse,
              club: e.club ?? undefined,
              ageGroup: e.ageGroup ?? undefined,
              score: e.score ?? undefined,
              penalties: e.penalties ?? undefined,
              prize: e.prize ?? undefined,
              photoPath: e.photo ?? undefined,
            })),
          },
          ...ctx,
        }),
      );
      created++;
      entryCount += cls.entries.length;
      console.log(`  + ${cls.title} (${cls.entries.length})`);
      await sleep(220);
    }

    console.log(`  classes: ${created} created, ${skipped} skipped, ${entryCount} entries`);
  }

  console.log("\nDone.");
  process.exit(0);
};

await run();
