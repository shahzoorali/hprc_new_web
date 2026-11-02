// Seeds the HPRC Arena Polo Tournament 2026 report news entry.
//
// Run with:  npx payload run ./scripts/seed-arena-polo-2026-news.ts
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
  const slug = "artists-crowned-champions-arena-polo-2026";

  const data = {
    title: "Artists crowned champions as arena polo comes of age at HPRC",
    publishedDate: new Date("2026-11-02").toISOString(),
    dateLabel: "2 November 2026",
    source: "HPRC",
    category: "Results",
    excerpt:
      "HPRC Arena Polo Tournament 2026: how it unfolded, the Final, the awards, and the way forward for arena polo at the Hyderabad Polo & Riding Club.",
    featured: true,
    linkType: "internal" as const,
    slug,
    heroImagePath: "/events/arena-polo-2026/hero.jpg",
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
