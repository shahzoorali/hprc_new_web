// Seeds the HPRC Tour 2026 Highlights (Madrid and Kentucky) news entry and un-features the earlier tour announcement.
//
// Run with:  npx payload run ./scripts/seed-tour2026-highlights-news.ts
//
// Idempotent: if the slug already exists the script updates the existing doc
// rather than creating a duplicate.
import config from "@payload-config";
import { getPayload } from "payload";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
  const slug = "hprc-tour-2026-highlights-madrid-kentucky";

  const data = {
    title: "Tour highlights: HPRC in Madrid and Kentucky",
    publishedDate: new Date("2026-10-05").toISOString(),
    dateLabel: "5 October 2026",
    source: "HPRC",
    category: "International",
    excerpt:
      "A mixed-teams win in the Friendship Cup, a one-goal defeat in the Clubs Cup, a 10-10 draw with the USA under lights, and a Grade 1 trophy presentation at Keeneland: twelve days, two clubs, three matches, in pictures.",
    featured: true,
    linkType: "internal" as const,
    slug,
    heroImagePath: "/events/tour2026-highlights/hero-clubs-cup-lineup.jpg",
    _status: "published" as const,
  };

  const existing = await withRetry(slug, () =>
    payload.find({
      collection: "news",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
      draft: true,
    }),
  );

  if (existing.docs.length > 0) {
    await withRetry(slug, () =>
      payload.update({ collection: "news", id: existing.docs[0].id, data }),
    );
    console.log(`~ updated  ${data.title}`);
  } else {
    await withRetry(slug, () =>
      payload.create({ collection: "news", data }),
    );
    console.log(`+ created  ${data.title}`);
  }

  console.log("\nDone.");
  process.exit(0);
};

await run();
