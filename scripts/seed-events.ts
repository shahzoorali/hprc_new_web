// Seeds the Events collection from the hand-maintained lists in
// content/events.ts (`upcoming` and `pastHighlights`).
//
// Run with:  npx payload run ./scripts/seed-events.ts
//
// This is the migration that removes a recurring developer task: those two
// arrays had to be edited by hand whenever an event finished. Afterwards a
// single `status` field moves an event between the two listings.
//
// Only listing metadata moves here. The eleven bespoke event pages under
// app/(site)/events/ keep rendering from code — they are static routes and win
// over the CMS /events/[slug] route, so each can be rebuilt from blocks later
// without a cutover.
import config from "@payload-config";
import { getPayload } from "payload";

import { eventsContent } from "../src/content/events";

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

// Derive a slug from the destination link where it points at an event page,
// otherwise from the title. The slug is only the CMS identity — the card still
// links wherever it did before, via linkOverride.
function slugFor(title: string, link?: string): string {
  const m = link ? /^\/events\/([^/?#]+)$/.exec(link) : null;
  if (m) return m[1];
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Pull a year out of the title so ordering is roughly right; the exact day is
// not recoverable from the listing data and is not displayed anywhere.
function startDateFor(title: string, description: string): Date {
  const y = /\b(20\d{2})\b/.exec(title) ?? /\b(20\d{2})\b/.exec(description);
  return y ? new Date(Number(y[1]), 6, 1) : new Date(2015, 0, 1);
}

const run = async () => {
  const payload = await getPayload({ config });

  const rows: Array<{
    title: string;
    excerpt: string;
    link?: string;
    image?: string;
    status: "upcoming" | "completed";
    dateLabel?: string;
  }> = [];

  for (const e of eventsContent.upcoming) {
    rows.push({
      title: e.title,
      excerpt: e.description,
      link: e.link,
      status: "upcoming",
      dateLabel: e.date,
    });
  }
  for (const e of eventsContent.pastHighlights) {
    rows.push({
      title: e.title,
      excerpt: e.description,
      link: e.link,
      image: e.image,
      status: "completed",
    });
  }

  console.log(`Seeding ${rows.length} events…\n`);
  let created = 0;
  let skipped = 0;

  for (const [i, row] of rows.entries()) {
    const slug = slugFor(row.title, row.link);

    const existing = await withRetry(slug, () =>
      payload.find({
        collection: "events",
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
        draft: true,
      }),
    );
    if (existing.docs.length > 0) {
      console.log(`  = skip (exists)  ${row.title}`);
      skipped++;
      continue;
    }

    // Keep the card pointing exactly where it points today.
    const linkOverride = row.link && row.link !== `/events/${slug}` ? row.link : undefined;

    await withRetry(slug, () =>
      payload.create({
        collection: "events",
        data: {
          title: row.title,
          slug,
          status: row.status,
          startDate: startDateFor(row.title, row.excerpt).toISOString(),
          dateLabel: row.dateLabel,
          excerpt: row.excerpt,
          cardImage: row.image ? { imagePath: row.image } : undefined,
          linkOverride,
          _status: "published",
        },
        ...ctx,
      }),
    );

    console.log(
      `  + [${row.status.padEnd(9)}] ${row.title.slice(0, 52).padEnd(52)} -> ${linkOverride ?? "/events/" + slug}`,
    );
    created++;
    if (i % 4 === 3) await sleep(250);
    else await sleep(200);
  }

  console.log(`\nDone. ${created} created, ${skipped} skipped.`);
  process.exit(0);
};

await run();
