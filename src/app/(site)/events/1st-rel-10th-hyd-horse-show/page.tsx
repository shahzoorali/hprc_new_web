"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { firstRelTenthHydHorseShow } from "@/content/1st-rel-10th-hyd-horse-show";

export default function FirstRelTenthHydHorseShowPage() {
  const { hero, overview, disciplines, categories, results, downloads, gallery } =
    firstRelTenthHydHorseShow;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Gallery images - combining images from Event Gallery section and portfolio grid
  const galleryImages = [
    // From portfolio grid section
    "/documents/gallery/events/1st-rel-portfolio-gallery/rel-10th-show-01.png",
    // From Event Gallery section
    "/documents/gallery/events/1st-rel-gallery/gallery-001.jpg",
    "/documents/gallery/events/1st-rel-gallery/gallery-002.jpg",
    "/documents/gallery/events/1st-rel-gallery/gallery-003.jpg",
    "/documents/gallery/events/1st-rel-gallery/gallery-004.jpg",
    "/documents/gallery/events/1st-rel-gallery/gallery-005.jpg",
    "/documents/gallery/events/1st-rel-gallery/gallery-006.jpg",
    "/documents/gallery/events/1st-rel-gallery/gallery-007.jpg",
  ].map((src, index) => ({
    src,
    alt: `1st Regional Equestrian League & 10th Hyderabad Horse Show - Image ${index + 1}`,
  }));

  return (
    <>
      <div className="space-y-16 pb-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="container pt-12">
            <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-200/50 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)]">
              <div className="absolute inset-0">
                <Image
                  src="/documents/gallery/events/1st-rel/001.jpg"
                  alt="1st Regional Equestrian League & 10th Hyderabad Horse Show"
                  fill
                  className="object-cover"
                  quality={90}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-900/85 via-brand-800/80 to-brand-900/85"></div>
              </div>

              <div className="relative z-10 p-8 md:p-16 lg:p-20">
                <div className="space-y-6 text-center">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
                    {hero.title}
                  </h1>

                  <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
                    {hero.subtitle}
                    <br />
                    <span className="text-white/80">{hero.association}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Overview */}
        <section className="container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-50/80 via-white to-brand-50/60 p-8 md:p-12 lg:p-16 border-2 border-brand-100/70 shadow-xl">
            <div className="space-y-8">
              <p className="text-lg text-gray-700 leading-relaxed font-light">
                {overview.description}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-light">
                {overview.eventDetails}
              </p>
              <p className="text-base text-gray-600 leading-relaxed italic">
                {overview.significance}
              </p>
            </div>
          </div>
        </section>

        {/* Event Details Table */}
        <section className="container">
          <SectionHeading
            eyebrow="Event Details"
            title="Event Information"
            description="Complete details about the event schedule and venue"
            align="center"
          />
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-[2rem] border-2 border-brand-100/80 bg-gradient-to-br from-white via-white to-brand-50/50 shadow-lg">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-6 font-bold text-gray-900 bg-gray-50 min-w-[120px]">
                      Date :
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {hero.dates}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-6 font-bold text-gray-900 bg-gray-50 min-w-[120px]">
                      Time :
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {hero.time}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-6 font-bold text-gray-900 bg-gray-50 min-w-[120px]">
                      Address :
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      <div className="mb-1">
                        {hero.venue}, {hero.address}
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">Mob:</span> {hero.phone}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Event Result */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-50/60 via-white to-brand-50/40 py-16">
          <div className="container relative">
            <SectionHeading
              eyebrow="Event Result"
              title={results.status}
              description={results.summary}
              align="center"
            />
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-200/80 bg-gradient-to-br from-white via-white to-brand-50/60 p-8 md:p-12 shadow-xl">
                <div className="space-y-6">
                  <p className="text-base text-gray-600 leading-relaxed italic mb-4">
                    {results.significance}
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    {results.details}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-brand-200">
                    <div className="text-center">
                      <p className="text-3xl md:text-4xl font-extrabold text-brand-600 font-display">
                        {results.statistics.totalParticipations}
                      </p>
                      <p className="text-sm font-semibold text-gray-600 mt-2 uppercase tracking-wider">
                        Participations
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl md:text-4xl font-extrabold text-brand-600 font-display">
                        {results.statistics.qualifiedRiders}
                      </p>
                      <p className="text-sm font-semibold text-gray-600 mt-2 uppercase tracking-wider">
                        Riders Qualified
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl md:text-4xl font-extrabold text-brand-600 font-display">
                        {results.statistics.qualifiedParticipations}
                      </p>
                      <p className="text-sm font-semibold text-gray-600 mt-2 uppercase tracking-wider">
                        Participations Qualified
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl md:text-4xl font-extrabold text-brand-600 font-display">
                        {results.statistics.categoriesQualified}
                      </p>
                      <p className="text-sm font-semibold text-gray-600 mt-2 uppercase tracking-wider">
                        Categories Qualified
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Downloads Section */}
        {downloads.length > 0 && (
          <section className="container">
            <SectionHeading
              eyebrow="Downloads"
              title="Please download the Prospectus for enrollment here –"
              description="Access event documents and dressage test information"
              align="center"
            />
            <div className="mt-8 space-y-4 max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-[1.5rem] border-2 border-brand-200/80 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.15),transparent_70%)]"></div>
                <div className="relative p-8 md:p-12">
                  <h3 className="text-2xl font-extrabold text-white mb-6 font-display">
                    Download Prospectus
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {downloads.map((download, index) => (
                      <a
                        key={index}
                        href={download.url}
                        target={download.url !== "#" ? "_blank" : undefined}
                        rel={download.url !== "#" ? "noopener noreferrer" : undefined}
                        className="group relative overflow-hidden rounded-[1.25rem] border-2 border-white/20 bg-white/10 backdrop-blur-md p-5 shadow-lg transition-all duration-300 hover:bg-white/20 hover:shadow-xl hover:-translate-y-1"
                      >
                        <div className="mb-3 flex h-10 w-10 items-center justify-center bg-gradient-to-br from-brand-500 to-brand-600 text-xl shadow-md">
                          <svg
                            className="h-5 w-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-base font-bold text-white mb-1 font-display group-hover:text-brand-200 transition-colors">
                          {download.label}
                        </h3>
                        <p className="text-xs text-brand-200 uppercase tracking-wider">
                          {download.type === "prospectus" ? "PDF Document" : "Dressage Test"}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Gallery Section with 7 Images */}
        <section className="container">
          <SectionHeading
            eyebrow="Event Gallery"
            title="Event Gallery"
            description={gallery.description}
            align="center"
          />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                onClick={() => {
                  setLightboxIndex(index);
                  setLightboxOpen(true);
                }}
                className="relative h-48 sm:h-64 lg:h-80 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Click indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="rounded-full bg-white/20 backdrop-blur-sm p-3">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Click on any image to view in full size
          </p>
        </section>

        {/* Back to Events */}
        <section className="container">
          <div className="text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to All Events</span>
            </Link>
          </div>
        </section>
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        images={galleryImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
