"use client";

// Newsletter archive. Kept as a client component because the PDF flipbook loads
// client-side (canvas dependency) and HTML editions route on click.
//
// The list comes from the CMS via the server page.tsx alongside this file.
// Editions come in two formats: "pdf" opens in the flipbook, "html" is a full
// reader page of its own — Hoofbeats Vol-02 is the first of those.

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";

// Dynamically import PDF viewer only on client side to avoid canvas dependency issue
const PDFFlipbookViewer = dynamic(
  () => import("@/components/ui/pdf-flipbook-viewer").then((mod) => mod.PDFFlipbookViewer),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
        <div className="text-white">Loading PDF viewer...</div>
      </div>
    ),
  },
);

export type Newsletter = {
  title: string;
  date: string;
  featuredImage: string;
  description: string;
  /** "pdf" editions open in the flipbook viewer, "html" editions open on their own reader page. */
  format: "pdf" | "html";
  /** Set for PDF editions. */
  pdfUrl?: string;
  /** Set for HTML editions. */
  href?: string;
  filename?: string;
  /** object-position for the featured image; cover scans read better anchored to the top. */
  imagePosition?: string;
};

export function NewslettersClient({ newsletters }: { newsletters: Newsletter[] }) {
  const router = useRouter();
  const [selectedNewsletter, setSelectedNewsletter] = useState<{
    title: string;
    pdfUrl: string;
  } | null>(null);

  // newsletters arrive as a prop from the server page

  const handleOpenNewsletter = (newsletter: Newsletter) => {
    if (newsletter.format === "html") {
      if (newsletter.href) router.push(newsletter.href);
      return;
    }
    if (newsletter.pdfUrl) {
      setSelectedNewsletter({
        title: newsletter.title,
        pdfUrl: newsletter.pdfUrl,
      });
    }
  };

  return (
    <>
      <div className="space-y-16 pb-16">
        <div className="container pt-12">
          <PageHero
            eyebrow="Media"
            title="Newsletters"
            description="Hoofbeats and the HPRC newsletter archive — event recaps, results, and member updates from 2014 to today."
            actions={[{ label: "Subscribe", href: "/contact", variant: "primary" }]}
            backgroundImage="/hero-horse.png"
          />
        </div>

        <section className="container space-y-8">
          <SectionHeading
            eyebrow="Newsletter Archive"
            title="HPRC Newsletters"
            description="Read the latest Hoofbeats edition online, or browse past newsletters in flipbook format."
            align="left"
          />

          {/* Newsletter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {newsletters.map((newsletter, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handleOpenNewsletter(newsletter)}
              >
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={newsletter.featuredImage}
                    alt={newsletter.title}
                    fill
                    className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                      newsletter.imagePosition ?? ""
                    }`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  {index === 0 && (
                    <span className="absolute left-4 top-4 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
                      Latest issue
                    </span>
                  )}

                  {/* Overlay Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
                      <svg
                        className="h-8 w-8 text-brand-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Newsletter Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-900 mb-2">{newsletter.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{newsletter.date}</p>
                  {newsletter.description && (
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                      {newsletter.description}
                    </p>
                  )}

                  {/* View Button */}
                  {newsletter.format === "html" && newsletter.href ? (
                    <Link
                      href={newsletter.href}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-brand-500 text-white hover:bg-brand-600 cursor-pointer transition-colors w-full justify-center"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <span>Read the edition</span>
                    </Link>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenNewsletter(newsletter);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-brand-500 text-white hover:bg-brand-600 cursor-pointer transition-colors w-full justify-center"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span>View in Flipbook</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="container">
          <div className="bg-brand-50 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="h-5 w-5 text-brand-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h7a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v7z"
                />
              </svg>
              <span className="text-sm font-semibold text-gray-700">
                Current editions are published as readable web pages; the 2014-2016 archive is
                available as flipbooks.
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Click the latest Hoofbeats to read it page by page in your browser. Older editions
              open in an interactive flipbook viewer where you can navigate, zoom, and download.
            </p>
          </div>
        </section>
      </div>

      {/* PDF Flipbook Viewer Modal */}
      {selectedNewsletter && (
        <PDFFlipbookViewer
          pdfUrl={selectedNewsletter.pdfUrl}
          title={selectedNewsletter.title}
          onClose={() => setSelectedNewsletter(null)}
        />
      )}
    </>
  );
}
