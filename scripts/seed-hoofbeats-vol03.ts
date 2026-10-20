// Adds Hoofbeats Vol-03 (October 2026) to the newsletter archive at /events/newsletters.
// The edition HTML ships verbatim from public/newsletters/; the reader page is at
// /events/newsletters/hoofbeats-vol-03-october-2026.
//
// Run with:  npx payload run ./scripts/seed-hoofbeats-vol03.ts
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

  const data = {
    title: "HOOFBEATS Vol-03 — The State Title, Kept at Home",
    date: "October 2026",
    description:
      "The October 2026 edition of Hoofbeats, covering the 2nd Telangana State Equestrian Championship, National Qualifier II and the HPRC International Polo Tour to Madrid and Kentucky.",
    format: "html" as const,
    href: "/events/newsletters/hoofbeats-vol-03-october-2026",
    cover: { imagePath: "/documents/newsletters/images/hoofbeats-vol-03.png" },
    // Sorts ahead of Vol-02 (0) so the archive lists the newest edition first.
    displayOrder: -1,
  };

  const existing = await withRetry("vol-03", () =>
    payload.find({ collection: "newsletters", where: { href: { equals: data.href } }, limit: 1, depth: 0 }),
  );
  if (existing.docs.length > 0) {
    await withRetry("vol-03", () =>
      payload.update({ collection: "newsletters", id: existing.docs[0].id, data }),
    );
    console.log(`~ updated  ${data.title}`);
  } else {
    await withRetry("vol-03", () => payload.create({ collection: "newsletters", data }));
    console.log(`+ created  ${data.title}`);
  }

  console.log("Done.");
  process.exit(0);
};

await run();
