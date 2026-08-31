import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";

import type { Media, News } from "@/payload-types";

import { BlockGallery } from "./block-gallery";

// Dispatches a document's `body` blocks to their renderers. Phase 1 covers the
// four blocks news and blog bodies use; event-page blocks land in phase 3.

type BodyBlock = NonNullable<News["body"]>[number];

function mediaUrl(image: unknown, legacyPath?: string | null): string | null {
  if (image && typeof image === "object") {
    const m = image as Media;
    if (m.url) return m.url;
  }
  return legacyPath ?? null;
}

function mediaAlt(image: unknown, fallback?: string | null): string {
  if (image && typeof image === "object") {
    const m = image as Media;
    if (m.alt) return m.alt;
  }
  return fallback ?? "";
}

export function RenderBlocks({ blocks }: { blocks?: BodyBlock[] | null }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, i) => {
        const key = `${block.blockType}-${i}`;

        switch (block.blockType) {
          case "richText":
            return (
              <div
                key={key}
                className="prose prose-neutral max-w-none prose-headings:font-display prose-a:text-brand-700"
              >
                <RichText data={block.content} />
              </div>
            );

          case "quote":
            return (
              <blockquote
                key={key}
                className="border-brand-500 my-8 border-l-4 pl-5 text-lg italic text-neutral-700"
              >
                <p>{block.quote}</p>
                {block.attribution ? (
                  <footer className="mt-2 text-sm not-italic text-neutral-500">
                    — {block.attribution}
                  </footer>
                ) : null}
              </blockquote>
            );

          case "imageGallery": {
            const images = (block.images ?? [])
              .map((row) => {
                const src = mediaUrl(row.image, row.legacyPath);
                return src ? { src, alt: mediaAlt(row.image, row.alt) } : null;
              })
              .filter((v): v is { src: string; alt: string } => v !== null);

            return (
              <BlockGallery
                key={key}
                heading={block.heading ?? undefined}
                columns={block.columns ?? "3"}
                images={images}
              />
            );
          }

          case "embed": {
            if (block.provider === "youtube") {
              return (
                <figure key={key} className="my-10">
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${block.embedId}`}
                      title={block.caption || "Video"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                  {block.caption ? (
                    <figcaption className="mt-2 text-sm text-neutral-500">
                      {block.caption}
                    </figcaption>
                  ) : null}
                </figure>
              );
            }
            return (
              <figure key={key} className="my-10 text-center">
                <a
                  href={`https://www.instagram.com/p/${block.embedId}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 font-semibold hover:underline"
                >
                  {block.caption || "View on Instagram"}
                </a>
              </figure>
            );
          }

          default:
            return null;
        }
      })}
    </>
  );
}

// Hero image for an article header, tolerating both uploads and legacy paths.
export function ArticleHero({
  image,
  legacyPath,
  title,
}: {
  image: unknown;
  legacyPath?: string | null;
  title: string;
}) {
  const src = mediaUrl(image, legacyPath);
  if (!src) return null;
  return (
    <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden bg-neutral-100">
      <Image
        src={src}
        alt={mediaAlt(image, title)}
        fill
        priority
        sizes="(min-width: 1024px) 900px, 100vw"
        className="object-cover"
      />
    </div>
  );
}
