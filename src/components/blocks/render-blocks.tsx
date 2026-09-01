import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import Link from "next/link";

import { ResultsBoard } from "@/components/results/results-board";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { EventSchedule } from "@/components/ui/event-schedule";
import { HeroVideo } from "@/components/ui/hero-video";
import { PageHero } from "@/components/ui/page-hero";
import { PricingTable } from "@/components/ui/pricing-table";
import { RulesSection } from "@/components/ui/rules-section";
import { Timeline } from "@/components/ui/timeline";
import { getResultSetById } from "@/lib/results";
import type { Event, Media, News } from "@/payload-types";

import { BlockGallery } from "./block-gallery";

// The single renderer for every CMS `body` field — news articles, blog posts and
// event pages. Each case hands off to the component that already draws that
// section on the hand-built pages, so a CMS-built page produces the same markup
// as a coded one.
//
// Article bodies are offered a smaller set of blocks than pages (see
// src/blocks/index.ts), but the generated block interfaces are shared, so one
// renderer covers both and there is no second copy to keep in sync.

type PageBlock = NonNullable<Event["body"]>[number] | NonNullable<News["body"]>[number];

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

// The results board needs the classes behind a result set, so this block is
// resolved on the server before rendering.
async function ResultsBoardFromSet({ setId }: { setId: string }) {
  const data = await getResultSetById(setId);
  if (!data) return null;
  return <ResultsBoard classes={data.classes} showPhotos={data.showPhotos} />;
}

export async function RenderBlocks({ blocks }: { blocks?: PageBlock[] | null }) {
  if (!blocks || blocks.length === 0) return null;

  const rendered = await Promise.all(
    blocks.map(async (block, i) => {
      const key = `${block.blockType}-${i}`;

      switch (block.blockType) {
        case "pageHero":
          return (
            <PageHero
              key={key}
              eyebrow={block.eyebrow ?? undefined}
              title={block.title}
              description={block.description}
              backgroundImage={
                mediaUrl(block.background?.image, block.background?.imagePath) ?? undefined
              }
              actions={(block.actions ?? []).map((a) => ({
                label: a.label,
                href: a.href,
                variant: a.variant ?? "primary",
              }))}
            />
          );

        case "heroVideo":
          return (
            <HeroVideo
              key={key}
              videoUrl={block.videoUrl}
              fallbackImage={
                mediaUrl(block.fallback?.image, block.fallback?.imagePath) ?? undefined
              }
              imageAlt={block.imageAlt ?? undefined}
            />
          );

        case "countdown":
          return (
            <div key={key} className="my-12">
              {block.heading ? (
                <h2 className="font-display mb-4 text-center text-2xl font-bold text-neutral-900">
                  {block.heading}
                </h2>
              ) : null}
              <CountdownTimer targetDate={new Date(block.targetDate)} />
            </div>
          );

        case "pricingTable":
          return (
            <div key={key} className="my-10">
              <PricingTable
                heading={block.heading}
                rows={(block.rows ?? []).map((r) => ({
                  label: r.label,
                  price: r.price,
                  gst: r.gst ?? undefined,
                  total: r.total ?? undefined,
                }))}
              />
            </div>
          );

        case "eventSchedule":
          return (
            <div key={key} className="my-12">
              <EventSchedule
                schedule={(block.schedule ?? []).map((d) => ({
                  day: d.day,
                  date: d.date,
                  dateFull: d.dateFull,
                  activities: (d.activities ?? []).map((a) => ({
                    time: a.time ?? undefined,
                    activity: a.activity,
                    type: a.type,
                  })),
                }))}
              />
            </div>
          );

        case "rules":
          return (
            <div key={key} className="my-12">
              <RulesSection
                eyebrow={block.eyebrow ?? undefined}
                title={block.title}
                description={block.description ?? undefined}
                categories={(block.categories ?? []).map((c) => ({
                  category: c.category,
                  items: (c.items ?? []).map((it) => it.text),
                }))}
              />
            </div>
          );

        case "timeline":
          return (
            <div key={key} className="my-12">
              <Timeline
                items={(block.items ?? []).map((it) => ({ year: it.year, summary: it.summary }))}
              />
            </div>
          );

        case "resultsBoard": {
          const setId =
            typeof block.resultSet === "object" && block.resultSet !== null
              ? String(block.resultSet.id)
              : String(block.resultSet);
          return <ResultsBoardFromSet key={key} setId={setId} />;
        }

        case "stats":
          return (
            <div key={key} className="my-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {(block.stats ?? []).map((s, j) => (
                <div key={j} className="border border-neutral-200 bg-white p-5 text-center">
                  <div className="font-display text-3xl font-bold text-neutral-900">{s.value}</div>
                  <div className="mt-1 text-sm text-neutral-500">{s.label}</div>
                </div>
              ))}
            </div>
          );

        case "mediaText": {
          const src = mediaUrl(block.media?.image, block.media?.imagePath);
          const imageLeft = block.imagePosition === "left";
          return (
            <div key={key} className="my-12 grid items-center gap-8 md:grid-cols-2">
              <div className={imageLeft ? "md:order-2" : ""}>
                {block.heading ? (
                  <h2 className="font-display mb-3 text-2xl font-bold text-neutral-900">
                    {block.heading}
                  </h2>
                ) : null}
                <div className="prose prose-neutral max-w-none">
                  <RichText data={block.body} />
                </div>
              </div>
              {src ? (
                <div
                  className={`relative aspect-[4/3] overflow-hidden ${imageLeft ? "md:order-1" : ""}`}
                >
                  <Image
                    src={src}
                    alt={mediaAlt(block.media?.image, block.media?.imageAlt)}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
            </div>
          );
        }

        case "richText":
          return (
            <div
              key={key}
              className="prose prose-neutral prose-headings:font-display prose-a:text-brand-700 mx-auto my-8 max-w-3xl"
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

        case "embed":
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
                  <figcaption className="mt-2 text-sm text-neutral-500">{block.caption}</figcaption>
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

        case "cta":
          return (
            <section
              key={key}
              className="from-brand-900 via-brand-800 to-brand-900 my-12 bg-gradient-to-br p-10 text-center text-white"
            >
              <h2 className="font-display text-2xl font-bold sm:text-3xl">{block.heading}</h2>
              {block.description ? (
                <p className="mx-auto mt-3 max-w-2xl text-white/80">{block.description}</p>
              ) : null}
              {(block.actions ?? []).length > 0 ? (
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {(block.actions ?? []).map((a, j) => (
                    <Link
                      key={j}
                      href={a.href}
                      className={
                        a.variant === "outline"
                          ? "border border-white/70 px-6 py-3 text-sm font-semibold hover:bg-white/10"
                          : "bg-white px-6 py-3 text-sm font-semibold text-brand-800 hover:bg-white/90"
                      }
                    >
                      {a.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </section>
          );

        default:
          return null;
      }
    }),
  );

  return <>{rendered}</>;
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
