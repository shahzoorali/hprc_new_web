// Lists the October 2026 events (National Qualifier, II Telangana State Championship) as completed
// so they move from Upcoming to /events/past.
//
// Run with:  npx payload run ./scripts/seed-oct2026-events.ts
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

const EVENTS = [
  {
    title: "II Telangana State Equestrian Championship 2026",
    slug: "ii-telangana-state-equestrian-championship-2026",
    startDate: new Date("2026-10-17").toISOString(),
    dateLabel: "17 – 18 October 2026",
    venue: "Gandipet, Moinabad",
    excerpt:
      "The II Telangana State Equestrian Championship concluded 17–18 October with sixteen state titles decided across Hacks, Dressage and Show Jumping. Pothuraju Sridhar on Dilano won the 110–115 cm Open. View the official results.",
    linkOverride: "/events/news/tsec-2026-results",
    cardImage: { imagePath: "/images/ec2026/action-1.jpg" },
  },
  {
    title: "National Qualifier (NQ) — October 2026",
    slug: "national-qualifier-nq-october-2026",
    startDate: new Date("2026-10-14").toISOString(),
    dateLabel: "14 – 16 October 2026",
    venue: "Gandipet, Moinabad",
    excerpt:
      "The October National Qualifier, the Junior National Equestrian Championship (JNEC) qualifier under the aegis of EFI, concluded 14–16 October at Gandipet.",
    linkOverride: "/events/oct-nq-2026",
    cardImage: { imagePath: "/images/ec2026/aamir-shahnawaz-1.jpg" },
  },
];

const run = async () => {
  const payload = await getPayload({ config });

  for (const ev of EVENTS) {
    const data = { ...ev, status: "completed" as const, featured: false, _status: "published" as const };
    const existing = await withRetry(ev.slug, () =>
      payload.find({ collection: "events", where: { slug: { equals: ev.slug } }, limit: 1, depth: 0, draft: true }),
    );
    if (existing.docs.length > 0) {
      await withRetry(ev.slug, () =>
        payload.update({ collection: "events", id: existing.docs[0].id, data }),
      );
      console.log(`~ updated  ${ev.title}`);
    } else {
      await withRetry(ev.slug, () => payload.create({ collection: "events", data }));
      console.log(`+ created  ${ev.title}`);
    }
  }

  console.log("Done.");
  process.exit(0);
};

await run();
