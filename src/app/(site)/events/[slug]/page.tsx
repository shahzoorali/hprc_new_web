import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RenderBlocks } from "@/components/blocks/render-blocks";
import { getEventBySlug, getRenderableEventSlugs } from "@/lib/events";

// CMS-built event pages.
//
// The eleven hand-built event pages in this directory are static routes and
// Next resolves them ahead of this one, so they keep rendering exactly as
// before. This route covers new events created in the CMS, and takes over an
// existing event the moment its coded page is deleted — one at a time, no
// cutover.

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getRenderableEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.excerpt,
    openGraph: { title: event.title, description: event.excerpt, type: "website" },
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  // Nothing in the CMS and no coded page matched either.
  if (!event || !event.body || event.body.length === 0) {
    notFound();
  }

  return (
    <div className="pb-16">
      <div className="container pt-8">
        <RenderBlocks blocks={event.body} />
      </div>
    </div>
  );
}
