// Seeds the Equestrian Challenge 2026 (August) photo gallery — one category and
// three albums covering 236 photos from the 15–16 August shoot.
//
// Run with:  npx payload run ./scripts/seed-ecaug2026-gallery.ts
//
// Idempotent: the category and each album are matched on slug, so re-running
// updates the photo rows in place rather than duplicating albums.
//
// The images live in S3 (s3://hprc.in/media/gallery/ecaug2026), not in /public,
// so every row uses `imagePath` with an absolute URL. Note the path-style URL in
// the manifest's baseUrl: the bucket name contains dots, which breaks TLS against
// the *.s3.<region> wildcard certificate on the virtual-hosted form.
import config from "@payload-config";
import { getPayload } from "payload";

import manifest from "./data/ecaug2026-gallery.json";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Same transient-error guard as seed-news.ts — the CMS runs on an Atlas M0 tier
// that intermittently fails writes while checking its storage quota.
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
  const { baseUrl, category, albums } = manifest;

  const existingCat = await withRetry(category.slug, () =>
    payload.find({
      collection: "gallery-categories",
      where: { slug: { equals: category.slug } },
      limit: 1,
      depth: 0,
    }),
  );

  let categoryId: string | number;
  if (existingCat.docs.length > 0) {
    categoryId = existingCat.docs[0].id;
    console.log(`= category exists  ${category.name}`);
  } else {
    const created = await withRetry(category.slug, () =>
      payload.create({ collection: "gallery-categories", data: category }),
    );
    categoryId = created.id;
    console.log(`+ category created ${category.name}`);
  }

  for (const album of albums) {
    const images = album.files.map((file) => ({
      imagePath: `${baseUrl}/${album.dir}/${file}`,
      imageAlt: `${album.title} — HPRC Equestrian Challenge 2026`,
    }));

    const data = {
      title: album.title,
      slug: album.slug,
      category: categoryId,
      year: album.year,
      date: album.date,
      cover: {
        imagePath: `${baseUrl}/${album.dir}/${album.cover}`,
        imageAlt: `${album.title} — HPRC Equestrian Challenge 2026`,
      },
      images,
      displayOrder: album.displayOrder,
    };

    const existing = await withRetry(album.slug, () =>
      payload.find({
        collection: "albums",
        where: { slug: { equals: album.slug } },
        limit: 1,
        depth: 0,
      }),
    );

    if (existing.docs.length > 0) {
      await withRetry(album.slug, () =>
        payload.update({ collection: "albums", id: existing.docs[0].id, data }),
      );
      console.log(`~ album updated   ${album.title}  (${images.length} photos)`);
    } else {
      await withRetry(album.slug, () => payload.create({ collection: "albums", data }));
      console.log(`+ album created   ${album.title}  (${images.length} photos)`);
    }
  }

  console.log(`\nDone — ${albums.reduce((n, a) => n + a.files.length, 0)} photos across ${albums.length} albums.`);
  process.exit(0);
};

await run();
