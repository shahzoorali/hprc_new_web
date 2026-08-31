import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleHero, RenderBlocks } from "@/components/blocks/render-blocks";
import { getNewsArticleBySlug, getRenderableNewsSlugs } from "@/lib/news";

// CMS-backed news articles.
//
// The 19 hand-built article pages under this directory are static routes, and
// Next resolves those ahead of this dynamic one — so they keep serving exactly
// as before and nothing about them changes. This route handles two cases:
//
//   1. Brand-new articles written in the CMS, which have no page of their own.
//   2. Existing articles as they are migrated — delete the static page and this
//      takes over, one article at a time, with no big-bang cutover.

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getRenderableNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
    },
  };
}

function displayDate(dateLabel?: string | null, publishedDate?: string | null): string {
  if (dateLabel) return dateLabel;
  if (!publishedDate) return "";
  const d = new Date(publishedDate);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  // No CMS article, and no static page matched either — genuinely not found.
  if (!article || !article.body || article.body.length === 0) {
    notFound();
  }

  return (
    <article className="bg-white">
      <div className="container max-w-3xl px-4 py-12">
        <Link
          href="/events/news"
          className="text-brand-700 hover:text-brand-800 mb-6 inline-block text-sm font-semibold"
        >
          ← All news
        </Link>

        <header className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
            {article.category ? (
              <span className="bg-brand-50 text-brand-700 px-2.5 py-1 text-xs font-semibold tracking-wide uppercase">
                {article.category}
              </span>
            ) : null}
            <time className="text-neutral-500">
              {displayDate(article.dateLabel, article.publishedDate)}
            </time>
            {article.source ? <span className="text-neutral-400">· {article.source}</span> : null}
          </div>

          <h1 className="font-display text-3xl leading-tight font-bold text-neutral-900 sm:text-4xl">
            {article.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-neutral-600">{article.excerpt}</p>
        </header>

        <ArticleHero
          image={article.heroImage}
          legacyPath={article.heroImagePath}
          title={article.title}
        />

        <RenderBlocks blocks={article.body} />
      </div>
    </article>
  );
}
