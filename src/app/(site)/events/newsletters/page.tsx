"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
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
  }
);

export default function NewslettersPage() {
  const [selectedNewsletter, setSelectedNewsletter] = useState<{
    title: string;
    pdfUrl: string;
  } | null>(null);

  // Newsletter data from source page https://hprc.in/newsletters.html
  // Featured images mapped to each newsletter
  const newsletters = [
    {
      filename: "NATIONAL-EQUESTRIAN-CHAMPIONSHIP-2016.pdf",
      title: "NATIONAL EQUESTRIAN CHAMPIONSHIP 2016",
      date: "2016",
      pdfUrl: "/documents/newsletters/NATIONAL-EQUESTRIAN-CHAMPIONSHIP-2016.pdf",
      featuredImage: "/documents/newsletters/images/NewsLetter02.jpg",
      description:
        "Comprehensive coverage of the National Equestrian Championship 2016, featuring competition results, highlights, and achievements.",
    },
    {
      filename: "4th-HYDERABAD-HORSE-SHOW-OCTOBER-2015-EDITION.pdf",
      title: "4th HYDERABAD HORSE SHOW OCTOBER 2015 EDITION",
      date: "October 2015",
      pdfUrl: "/documents/newsletters/4th-HYDERABAD-HORSE-SHOW-OCTOBER-2015-EDITION.pdf",
      featuredImage: "/documents/newsletters/images/NewsLetter03.jpg",
      description:
        "The 4th edition of the Hyderabad Horse Show held in October 2015, showcasing equestrian excellence and competition highlights.",
    },
    {
      filename: "HPRC-NEWSLETTER-18th-MAY-2015-EDITION.pdf",
      title: "HPRC NEWSLETTER 18th MAY 2015 EDITION",
      date: "May 2015",
      pdfUrl: "/documents/newsletters/HPRC-NEWSLETTER-18th-MAY-2015-EDITION.pdf",
      featuredImage: "/documents/newsletters/images/NewsLetter04.jpg",
      description:
        "Monthly newsletter from May 2015 featuring club events, member achievements, and upcoming tournaments.",
    },
    {
      filename: "HPRC-NEWSLETTER-20th-MARCH-2015-EDITION.pdf",
      title: "HPRC NEWSLETTER 20th MARCH 2015 EDITION",
      date: "March 2015",
      pdfUrl: "/documents/newsletters/HPRC-NEWSLETTER-20th-MARCH-2015-EDITION.pdf",
      featuredImage: "/documents/newsletters/images/NewsLetter05.jpg",
      description:
        "March 2015 newsletter covering club activities, equestrian events, and member updates.",
    },
    {
      filename: "EQUESTRIAN-ESSENTIALITY-JANUARY-2015-EDITION.pdf",
      title: "EQUESTRIAN ESSENTIALITY JANUARY 2015 EDITION",
      date: "January 2015",
      pdfUrl: "/documents/newsletters/EQUESTRIAN-ESSENTIALITY-JANUARY-2015-EDITION.pdf",
      featuredImage: "/documents/newsletters/images/NewsLetter06.jpg",
      description:
        "January 2015 edition focusing on essential equestrian updates, training programs, and competition announcements.",
    },
    {
      filename: "THE-FIRST-HYDERABAD-HORSE-SHOW-DECEMBER-2014-EDITION.pdf",
      title: "THE FIRST HYDERABAD HORSE SHOW DECEMBER 2014 EDITION",
      date: "December 2014",
      pdfUrl: "/documents/newsletters/THE-FIRST-HYDERABAD-HORSE-SHOW-DECEMBER-2014-EDITION.pdf",
      featuredImage: "/documents/newsletters/images/NewsLetter01.jpg",
      description:
        "The inaugural Hyderabad Horse Show held in December 2014, marking a significant milestone in HPRC's equestrian history.",
    },
  ];

  const handleOpenFlipbook = (newsletter: (typeof newsletters)[0]) => {
    setSelectedNewsletter({
      title: newsletter.title,
      pdfUrl: newsletter.pdfUrl,
    });
  };

  return (
    <>
      <div className="space-y-16 pb-16">
        <div className="container pt-12">
          <PageHero
            eyebrow="Media"
            title="Newsletters"
            description="Monthly recaps, highlights, and member updates from HPRC spanning 2014-2016."
            actions={[{ label: "Subscribe", href: "/contact", variant: "primary" }]}
            backgroundImage="https://images.unsplash.com/photo-15504236404362540-800?q=80"
          />
        </div>

        <section className="container space-y-8">
          <SectionHeading
            eyebrow="Newsletter Archive"
            title="HPRC Newsletters"
            description="Browse through past newsletter editions, view in flipbook format, and stay informed about equestrian events and club activities."
            align="left"
          />

          {/* Newsletter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {newsletters.map((newsletter, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handleOpenFlipbook(newsletter)}
              >
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={newsletter.featuredImage}
                    alt={newsletter.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenFlipbook(newsletter);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-brand-500 text-white hover:bg-brand-600 cursor-pointer transition-colors w-full justify-center"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                All newsletters are archived from 2014-2016 with featured images and flipbook
                viewing.
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Click on any newsletter card to open it in an interactive flipbook viewer. Navigate
              through pages, zoom, and download directly from the viewer.
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
