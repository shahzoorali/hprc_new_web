// Seeds a single news entry covering HPRC's feature in Clickpolo magazine,
// issue #745 (28 September 2026), covering the Madrid leg of the 2026
// International Tour.
//
// Run with:  npx payload run ./scripts/seed-clickpolo-745-news.ts
//
// Idempotent: if the slug already exists the script updates the existing doc
// rather than creating a duplicate.
import config from "@payload-config";
import { getPayload } from "payload";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Same transient-error guard as seed-news.ts — the CMS runs on an Atlas M0
// tier that intermittently fails writes while checking its storage quota.
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

// Minimal Lexical paragraph node — matches the shape Payload's
// richtext-lexical editor produces for plain prose.
function paragraph(text: string) {
  return {
    type: "paragraph",
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr" as const,
    children: [
      {
        type: "text",
        text,
        format: 0,
        detail: 0,
        mode: "normal",
        style: "",
        version: 1,
      },
    ],
  };
}

function richText(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: paragraphs.map(paragraph),
    },
  };
}

const IMG_BASE = "/documents/news/clickpolo-745";

const run = async () => {
  const payload = await getPayload({ config });
  const slug = "hprc-featured-clickpolo-745";

  const data = {
    title: "HPRC Featured in Clickpolo Magazine, Issue #745",
    publishedDate: new Date("2026-09-28").toISOString(),
    dateLabel: "28 September 2026",
    source: "Clickpolo",
    category: "International",
    excerpt:
      "Argentina's leading virtual polo magazine dedicates a feature to HPRC's Madrid leg of the 2026 International Tour, with words from Chaitania Kumar, Arsalan Khan, Saif Attari and Madrid Polo Club's Lorenzo Soriano.",
    featured: true,
    linkType: "internal" as const,
    slug,
    heroImagePath: `${IMG_BASE}/action-shot.jpg`,
    _status: "published" as const,
    body: [
      {
        blockType: "richText",
        content: richText([
          'Clickpolo — Argentina’s largest virtual polo magazine — has featured Hyderabad Polo and Riding Club’s Madrid leg of its 2026 International Tour in Issue #745 (28 September 2026), under the headline "España - India."',
          "The feature runs across several pages and includes photography from the Clubs Cup and Friendship Cup fixtures against Madrid Polo Club, alongside quotes from the HPRC team and their hosts.",
        ]),
      },
      {
        blockType: "imageGallery",
        heading: "From the Clubs Cup, Madrid",
        columns: "2",
        images: [
          {
            legacyPath: `${IMG_BASE}/action-shot.jpg`,
            alt: "HPRC and Madrid Polo Club players in action during the Clubs Cup — photo by Diego Bisquerra, Clickpolo #745",
          },
          {
            legacyPath: `${IMG_BASE}/team-photo.jpg`,
            alt: "HPRC players at Madrid Polo Club — photo by Diego Bisquerra, Clickpolo #745",
          },
        ],
      },
      {
        blockType: "quote",
        quote:
          "It’s one of the most fascinating and fabulous experiences we’ve had. I’d like to thank Madrid Polo Club for the horses and the hospitality they’ve shown us throughout. We really enjoyed the sounds and sights of Madrid. This tour gives you the purest essence of polo.",
        attribution: "Chaitania Kumar, HPRC",
      },
      {
        blockType: "quote",
        quote:
          "This is the first time we’ve come to Madrid as a team. We’ve been in touch with them for a while, and Ivan and Lorenzo made this happen — coming from so far away to play polo. Given the distance, it’s one of the best experiences I’ve had playing polo. The ground and the horses are excellent. It was great fun.",
        attribution: "Arsalan Khan, HPRC",
      },
      {
        blockType: "quote",
        quote:
          "Excellent ground, excellent horses, excellent hospitality and a fantastic club — Madrid Polo Club. We had a great time playing here in Spain.",
        attribution: "Saif Attari, HPRC",
      },
      {
        blockType: "quote",
        quote:
          "I’ve known the members of Hyderabad Polo & Riding Club for three or four years now. They’ve invited us to the tournament they hold every January a couple of times, and it was time to reciprocate — invite them over and let them get to know polo in Madrid.",
        attribution: "Lorenzo Soriano, Polo Manager, Madrid Polo Club",
      },
      {
        blockType: "cta",
        heading: "Read the Full Feature",
        description: "Clickpolo Issue #745, pages 88–91.",
        actions: [
          {
            label: "Read on Clickpolo",
            href: "https://online.flippingbook.com/view/935575255/90/",
            variant: "primary",
          },
        ],
      },
    ],
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
    await withRetry(slug, () => payload.update({ collection: "news", id: existing.docs[0].id, data }));
    console.log(`~ updated  ${data.title}`);
  } else {
    await withRetry(slug, () => payload.create({ collection: "news", data }));
    console.log(`+ created  ${data.title}`);
  }

  console.log("\nDone.");
  process.exit(0);
};

await run();
