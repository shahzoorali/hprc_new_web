// Seeds the News collection from the existing content/events.ts `news[]` array.
//
// Run with:  npx payload run ./scripts/seed-news.ts
//
// Idempotent: an article whose slug (internal) or externalUrl (external) is
// already present is skipped, so re-running after adding entries is safe.
//
// Display fidelity matters here. The hand-written date strings are inconsistent
// ("2024", "18 August, 2026", "October 6, 2024") and the site prints them
// verbatim, so every original string is preserved in `dateLabel` while
// `publishedDate` carries a real parsed date for ordering. Nothing on the
// rendered page changes.
import config from "@payload-config";
import { getPayload } from "payload";

import { eventsContent } from "../src/content/events";

// "18 August, 2026" -> Date. Falls back to 1 Jan for bare years like "2024".
function parseDate(label: string): Date {
  const bareYear = /^\s*(\d{4})\s*$/.exec(label);
  if (bareYear) return new Date(Number(bareYear[1]), 0, 1);

  const parsed = new Date(label.replace(/,\s*(\d{4})/, " $1"));
  if (!Number.isNaN(parsed.getTime())) return parsed;

  const yearOnly = /(\d{4})/.exec(label);
  if (yearOnly) return new Date(Number(yearOnly[1]), 0, 1);

  console.warn(`  ! could not parse date "${label}" — using today`);
  return new Date();
}

function slugFromUrl(url: string): string | null {
  const m = /^\/events\/news\/([^/?#]+)/.exec(url);
  return m ? m[1] : null;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// The CMS runs on an Atlas M0 (free) cluster, which checks the 512 MB storage
// quota on every write and intermittently times that check out
// ("Error determining if update will go over space quota"), and which cannot
// create a collection inside a transaction on first write. Both failures are
// transient, so retry with backoff rather than aborting a partial migration.
async function withRetry<T>(label: string, fn: () => Promise<T>, attempts = 6): Promise<T> {
  let lastErr: unknown;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const msg = err instanceof Error ? err.message : String(err);
      const transient =
        /space quota|catalog changes|WriteConflict|TransientTransactionError|MaxTimeMSExpired|connection|timed out/i.test(
          msg,
        );
      if (!transient || i === attempts) break;
      const wait = 400 * 2 ** (i - 1);
      console.log(`    … ${label}: transient Atlas error, retry ${i}/${attempts - 1} in ${wait}ms`);
      await sleep(wait);
    }
  }
  throw lastErr;
}

const run = async () => {
  const payload = await getPayload({ config });
  const articles = eventsContent.news;

  console.log(`Seeding ${articles.length} news entries…\n`);
  let created = 0;
  let skipped = 0;

  for (const a of articles) {
    const slug = slugFromUrl(a.url);
    const isInternal = slug !== null;

    const existing = await withRetry(a.title, () =>
      payload.find({
        collection: "news",
        where: isInternal ? { slug: { equals: slug } } : { externalUrl: { equals: a.url } },
        limit: 1,
        depth: 0,
        draft: true,
      }),
    );

    if (existing.docs.length > 0) {
      console.log(`  = skip (exists)  ${a.title.slice(0, 62)}`);
      skipped++;
      continue;
    }

    await withRetry(a.title, () =>
      payload.create({
        collection: "news",
        data: {
          title: a.title,
          publishedDate: parseDate(a.date).toISOString(),
          dateLabel: a.date,
          source: a.source ?? undefined,
          category: a.category ?? undefined,
          excerpt: a.excerpt,
          linkType: isInternal ? "internal" : "external",
          ...(isInternal ? { slug } : { externalUrl: a.url }),
          heroImagePath: a.imageUrl ?? undefined,
          _status: "published",
        },
      }),
    );

    console.log(`  + ${isInternal ? "article " : "link    "} ${a.title.slice(0, 62)}`);
    created++;
    // Breathe between writes — M0 dislikes sustained bursts.
    await sleep(250);
  }

  console.log(`\nDone. ${created} created, ${skipped} skipped.`);
  process.exit(0);
};

await run();
