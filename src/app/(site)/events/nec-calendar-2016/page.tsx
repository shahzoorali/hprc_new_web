"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { ImageLightbox } from "@/components/ui/image-lightbox";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { necCalendar2016 } from "@/content/nec-calendar-2016";

export default function NecCalendar2016Page() {
  const { hero, overview, gallery } = necCalendar2016;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryImages = gallery.images.map((src, index) => ({
    src,
    alt: `National Equestrian Championship Calendar 2016 - Image ${index + 1}`,
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
                  src="/documents/gallery/events/nec-calendar-2016/001.jpg"
                  alt="National Equestrian Championship Calendar 2016"
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
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-white">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 md:h-6 md:w-6 text-brand-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-semibold text-base md:text-lg">{hero.dates}</span>
                    </div>
                    <div className="h-6 w-px bg-white/30"></div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 md:h-6 md:w-6 text-brand-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="font-semibold text-base md:text-lg">{hero.venue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Overview */}
        <section className="container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-50/80 via-white to-brand-50/60 p-8 md:p-12 lg:p-16 border-2 border-brand-100/70 shadow-xl">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="Event Overview"
                title="National Equestrian Championship Calendar 2016"
                description={overview.description}
                align="center"
              />
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="container">
          <SectionHeading
            eyebrow="Event Gallery"
            title={gallery.title}
            description={gallery.description}
            align="center"
          />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {gallery.images.map((imageSrc, index) => (
              <div
                key={index}
                onClick={() => {
                  setLightboxIndex(index);
                  setLightboxOpen(true);
                }}
                className="relative h-48 sm:h-64 lg:h-80 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={imageSrc}
                  alt={`${gallery.title} - Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
