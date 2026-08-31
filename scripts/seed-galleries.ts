// Seeds the phase-2 collections from the hardcoded arrays that were extracted
// out of the three gallery pages.
//
// Run with:  npx payload run ./scripts/seed-galleries.ts
//
// Idempotent — existing docs are matched by slug/youtubeId/title and skipped, so
// re-running is safe.
import config from "@payload-config";
import { getPayload } from "payload";

import { galleryCategories } from "../src/content/_migration/gallery";
import { newsletters } from "../src/content/_migration/newsletters";
import { featuredVideos, videoCategories } from "../src/content/_migration/videos";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Atlas M0 checks its storage quota on every write and intermittently times that
// check out; it also cannot create a collection inside a transaction on first
// write. Both are transient and retryable.
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

const run = async () => {
  const payload = await getPayload({ config });

  // ---------- Gallery categories + albums ----------
  console.log("Gallery categories & albums");
  const categoryIds = new Map<string, string>();

  for (const [ci, cat] of galleryCategories.entries()) {
    const found = await withRetry(cat.id, () =>
      payload.find({
        collection: "gallery-categories",
        where: { slug: { equals: cat.id } },
        limit: 1,
        depth: 0,
      }),
    );

    if (found.docs.length > 0) {
      categoryIds.set(cat.id, String(found.docs[0].id));
      console.log(`  = category exists  ${cat.name}`);
    } else {
      const doc = await withRetry(cat.id, () =>
        payload.create({
          collection: "gallery-categories",
          data: {
            name: cat.name,
            slug: cat.id,
            description: cat.description,
            displayOrder: ci,
          },
          ...ctx,
        }),
      );
      categoryIds.set(cat.id, String(doc.id));
      console.log(`  + category  ${cat.name}`);
      await sleep(200);
    }
  }

  let albumsCreated = 0;
  let albumsSkipped = 0;
  let photoCount = 0;

  for (const cat of galleryCategories) {
    const categoryId = categoryIds.get(cat.id)!;
    for (const [ai, album] of cat.albums.entries()) {
      const found = await withRetry(album.id, () =>
        payload.find({
          collection: "albums",
          where: { slug: { equals: album.id } },
          limit: 1,
          depth: 0,
        }),
      );
      if (found.docs.length > 0) {
        albumsSkipped++;
        continue;
      }

      const a = album as typeof album & { year?: string; date?: string };
      await withRetry(album.id, () =>
        payload.create({
          collection: "albums",
          data: {
            title: album.title,
            slug: album.id,
            category: categoryId,
            year: a.year ?? undefined,
            date: a.date ?? undefined,
            cover: { imagePath: album.coverImage },
            images: album.images.map((src: string) => ({
              imagePath: src,
              imageAlt: album.title,
            })),
            displayOrder: ai,
          },
          ...ctx,
        }),
      );
      albumsCreated++;
      photoCount += album.images.length;
      console.log(`  + album  ${album.title} (${album.images.length} photos)`);
      await sleep(220);
    }
  }
  console.log(
    `  albums: ${albumsCreated} created, ${albumsSkipped} skipped, ${photoCount} photos\n`,
  );

  // ---------- Video categories + videos ----------
  console.log("Video categories & videos");
  const videoCatIds = new Map<string, string>();

  for (const [ci, cat] of videoCategories.entries()) {
    const found = await withRetry(cat.id, () =>
      payload.find({
        collection: "video-categories",
        where: { slug: { equals: cat.id } },
        limit: 1,
        depth: 0,
      }),
    );
    if (found.docs.length > 0) {
      videoCatIds.set(cat.id, String(found.docs[0].id));
      continue;
    }
    const doc = await withRetry(cat.id, () =>
      payload.create({
        collection: "video-categories",
        data: { name: cat.name, slug: cat.id, icon: cat.icon, displayOrder: ci },
        ...ctx,
      }),
    );
    videoCatIds.set(cat.id, String(doc.id));
    console.log(`  + category  ${cat.icon} ${cat.name}`);
    await sleep(200);
  }

  let videosCreated = 0;
  let videosSkipped = 0;

  const allVideos: Array<{
    title: string;
    description?: string;
    youtubeId: string;
    duration?: string;
    views?: string;
    categorySlug?: string;
    featured: boolean;
    order: number;
  }> = [];

  for (const [i, v] of featuredVideos.entries()) {
    allVideos.push({
      title: v.title,
      description: v.description,
      youtubeId: v.youtubeId,
      duration: v.duration,
      featured: true,
      order: i,
    });
  }
  for (const cat of videoCategories) {
    for (const [i, v] of cat.videos.entries()) {
      const vv = v as typeof v & { views?: string };
      allVideos.push({
        title: v.title,
        description: v.description,
        youtubeId: v.youtubeId,
        duration: v.duration,
        views: vv.views,
        categorySlug: cat.id,
        featured: false,
        order: i,
      });
    }
  }

  for (const v of allVideos) {
    // Four videos are deliberately cross-listed in the source data: the same
    // YouTube id appears under a different title in a second category (e.g.
    // -N4h3tTNhKo is both "…Championship 2025" in Polo and "…Championship
    // Venue" in Club & Facilities). Deduping on youtubeId alone would collapse
    // them and leave the Club & Facilities tab nearly empty, so the identity of
    // a video row is its id AND its title.
    const found = await withRetry(v.title, () =>
      payload.find({
        collection: "videos",
        where: {
          youtubeId: { equals: v.youtubeId },
          title: { equals: v.title },
          featured: { equals: v.featured },
        },
        limit: 1,
        depth: 0,
      }),
    );
    if (found.docs.length > 0) {
      videosSkipped++;
      continue;
    }
    await withRetry(v.title, () =>
      payload.create({
        collection: "videos",
        data: {
          title: v.title,
          description: v.description,
          youtubeId: v.youtubeId,
          duration: v.duration,
          views: v.views,
          category: v.categorySlug ? videoCatIds.get(v.categorySlug) : undefined,
          featured: v.featured,
          displayOrder: v.order,
        },
        ...ctx,
      }),
    );
    videosCreated++;
    console.log(`  + video  ${v.title.slice(0, 58)}`);
    await sleep(220);
  }
  console.log(`  videos: ${videosCreated} created, ${videosSkipped} skipped\n`);

  // ---------- Newsletters ----------
  console.log("Newsletters");
  let nlCreated = 0;
  let nlSkipped = 0;

  for (const [i, n] of newsletters.entries()) {
    const found = await withRetry(n.title, () =>
      payload.find({
        collection: "newsletters",
        where: { pdfPath: { equals: n.pdfUrl } },
        limit: 1,
        depth: 0,
      }),
    );
    if (found.docs.length > 0) {
      nlSkipped++;
      continue;
    }
    await withRetry(n.title, () =>
      payload.create({
        collection: "newsletters",
        data: {
          title: n.title,
          date: n.date,
          description: n.description,
          pdfPath: n.pdfUrl,
          cover: { imagePath: n.featuredImage },
          displayOrder: i,
        },
        ...ctx,
      }),
    );
    nlCreated++;
    console.log(`  + ${n.title.slice(0, 58)}`);
    await sleep(220);
  }
  console.log(`  newsletters: ${nlCreated} created, ${nlSkipped} skipped\n`);

  console.log("Done.");
  process.exit(0);
};

await run();
