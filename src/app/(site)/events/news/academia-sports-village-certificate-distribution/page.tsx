"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { ImageLightbox } from "@/components/ui/image-lightbox";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";

export default function AcademiaSportsVillageCertificatePage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Gallery images from the source page
  const galleryImages = [
    {
      src: "/documents/gallery/news/academia-certificate-distribution/academia-Sports-Village-Certificate-Distribution-Ceremony01.png",
      alt: "Academia Sports Village Certificate Distribution Ceremony - Image 1",
    },
    {
      src: "/documents/gallery/news/academia-certificate-distribution/academia-Sports-Village-Certificate-Distribution-Ceremony-02.png",
      alt: "Academia Sports Village Certificate Distribution Ceremony - Image 2",
    },
  ];

  return (
    <>
      <div className="space-y-16 pb-16">
        <div className="relative overflow-hidden">
          <div className="container pt-12">
            <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-200/50 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)]">
              <div className="absolute inset-0">
                <Image
                  src="/documents/news/academia-Sports-Village-Certificate-Distribution-Ceremony01.png"
                  alt="Academia Sports Village Certificate Distribution Ceremony"
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
                    Academia Sports Village Certificate Distribution Ceremony
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
                    Celebrating achievements of young athletes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-50/80 via-white to-brand-50/60 p-8 md:p-12 lg:p-16 border-2 border-brand-100/70 shadow-xl">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="Ceremony"
                title="Academia Sports Village Certificate Distribution Ceremony"
                description="Certificate distribution ceremony for Junior Camp Workshop participants at Academia Sports Village, celebrating the achievements of young athletes."
                align="center"
              />
              <div className="prose prose-lg max-w-none mt-8">
                <p className="text-gray-700 leading-relaxed">
                  The Academia Sports Village Certificate Distribution Ceremony was held to
                  recognize and celebrate the achievements of participants in the Junior Camp
                  Workshop. Young athletes were honored for their dedication, progress, and
                  commitment to their sports training.
                </p>

                <p className="text-gray-700 leading-relaxed mt-6">
                  The ceremony highlighted the successful partnership between HPRC and Academia
                  Sports Village, showcasing the positive impact of collaborative sports development
                  programs on young athletes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {galleryImages.length > 0 && (
          <section className="container">
            <SectionHeading
              eyebrow="Event Gallery"
              title="Ceremony Photos"
              description="Browse through images from the Certificate Distribution Ceremony."
              align="center"
            />
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                  className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 50vw"
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
        )}

        <section className="container">
          <div className="text-center">
            <Link
              href="/events/news"
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
              <span>Back to News</span>
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
