// Seeds the TSEC 2026 results news entry (links to /events/news/tsec-2026-results).
//
// Run with:  npx payload run ./scripts/seed-tsec2026-results-news.ts
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
  const slug = "tsec-2026-results";

  const data = {
    title: "Results — II Telangana State Equestrian Championship 2026",
    publishedDate: new Date("2026-10-18").toISOString(),
    dateLabel: "18 October, 2026",
    source: "HPRC",
    category: "Results",
    excerpt:
      "Pothuraju Sridhar on Dilano wins the 110–115 cm Open as the 2nd Telangana State Equestrian Championship closes at HPRC. Sixteen state titles decided across Hacks, Dressage and Show Jumping, with full results.",
    featured: true,
    linkType: "internal" as const,
    slug,
    heroImagePath: "/images/ec2026/action-1.jpg",
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
    await withRetry(slug, () => payload.create({ collection: "news", data }));
    console.log(`+ created  ${data.title}`);
  }

  console.log("Done.");
  process.exit(0);
};

await run();
