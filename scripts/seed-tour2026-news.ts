// Seeds a single news entry for the HPRC International Tour 2026 article.
//
// Run with:  npx payload run ./scripts/seed-tour2026-news.ts
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

const S3_BASE = "https://s3.ap-south-1.amazonaws.com/hprc.in/media/gallery/tour2026";

const run = async () => {
  const payload = await getPayload({ config });
  const slug = "hprc-international-tour-2026-spain-usa";

  const data = {
    title: "HPRC to fly the flag for Indian polo in Spain and the United States",
    publishedDate: new Date("2026-09-21").toISOString(),
    dateLabel: "21 September 2026",
    source: "HPRC",
    category: "International",
    excerpt:
      "HPRC India takes on Madrid Polo Club and Commonwealth Polo Club, Kentucky — the club's third international tour, and the latest step in its drive to make Hyderabad a polo destination for the world.",
    featured: true,
    linkType: "internal" as const,
    slug,
    heroImagePath: `${S3_BASE}/team_mounted.jpg`,
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
