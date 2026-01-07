import Image from "next/image";
import Link from "next/link";

import { eventsContent } from "@/content/events";

export default function NewsPage() {
  const featuredArticle = eventsContent.news[0];
  const otherArticles = eventsContent.news.slice(1);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 pt-20 pb-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="container px-4 relative">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-brand-500" />
              <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">
                News & Press
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              HPRC in the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-cyan-400">
                Headlines
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
              Stay updated with the latest news, tournament results, and achievements 
              from Hyderabad Polo & Riding Club.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="container px-4 -mt-20 relative z-10 mb-16">
        <article className="group relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Image Side */}
            <div className="relative h-72 sm:h-96 lg:h-auto lg:min-h-[500px]">
              <Image
                src={featuredArticle.imageUrl || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"}
                alt={featuredArticle.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/10" />
              
              {/* Featured Badge */}
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured Story
                </span>
              </div>

              {/* Category Badge - Mobile */}
              <div className="absolute bottom-6 left-6 lg:hidden">
                {featuredArticle.category && (
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {featuredArticle.category}
                  </span>
                )}
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {featuredArticle.category && (
                  <span className="hidden lg:inline-block bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {featuredArticle.category}
                  </span>
                )}
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={featuredArticle.date}>{featuredArticle.date}</time>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                {featuredArticle.title}
              </h2>

              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {featuredArticle.excerpt}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <span className="font-medium">{featuredArticle.source}</span>
                </div>

                <a
                  href={featuredArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg group/btn"
                >
                  Read Full Story
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* More News Grid */}
      {otherArticles.length > 0 && (
        <section className="container px-4 pb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">More Stories</h2>
              <p className="text-slate-600">Latest updates from HPRC</p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-slate-500">{eventsContent.news.length} articles</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {otherArticles.map((article, index) => (
              <article
                key={index}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={article.imageUrl || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category */}
                  {article.category && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                        {article.category}
                      </span>
                    </div>
                  )}

                  {/* Date on Image */}
                  <div className="absolute bottom-4 left-4">
                    <time className="text-white/90 text-sm font-medium" dateTime={article.date}>
                      {article.date}
                    </time>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      <span>{article.source}</span>
                    </div>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 text-sm font-semibold transition-colors group/link"
                    >
                      Read
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter & Media CTA */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Newsletter Signup */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center">
                  <svg className="h-6 w-6 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Stay Updated</h3>
              </div>
              <p className="text-slate-400 mb-6">
                Subscribe to our newsletter for the latest news, events, and exclusive updates from HPRC.
              </p>
              <Link
                href="/events/newsletters"
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300"
              >
                View Newsletters
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Media Inquiries */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                  <svg className="h-6 w-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Media Inquiries</h3>
              </div>
              <p className="text-slate-400 mb-6">
                For press releases, interview requests, or media partnerships, please contact our team.
              </p>
              <a
                href="mailto:info@hprc.co.in"
                className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@hprc.co.in
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="bg-white py-16">
        <div className="container px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Explore More</h2>
            <p className="text-slate-600">Discover more about HPRC events and media</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { label: "Photo Gallery", href: "/events/photo-gallery", icon: "📷" },
              { label: "Video Gallery", href: "/events/video-gallery", icon: "🎬" },
              { label: "Upcoming Events", href: "/events/upcoming", icon: "📅" },
              { label: "Past Events", href: "/events/past", icon: "🏆" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group flex items-center gap-4 bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-200 rounded-xl p-5 transition-all duration-300"
              >
                <span className="text-3xl">{link.icon}</span>
                <div>
                  <span className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {link.label}
                  </span>
                  <svg
                    className="inline-block ml-2 h-4 w-4 text-slate-400 group-hover:text-brand-500 transition-all duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
