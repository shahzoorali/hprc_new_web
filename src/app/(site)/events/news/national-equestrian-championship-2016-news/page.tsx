"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { ImageLightbox } from "@/components/ui/image-lightbox";

export default function NationalEquestrianChampionship2016NewsPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Gallery images from the source page (same as press coverage)
  const galleryImages = [];
  for (let i = 1; i <= 14; i++) {
    const num = i.toString().padStart(3, "0");
    galleryImages.push({
      src: `/documents/gallery/news/nec-press-coverage/${num}.png`,
      alt: `National Equestrian Championship 2016 - Image ${i}`,
    });
  }

  return (
    <>
      <div className="space-y-16 pb-16">
        <div className="relative overflow-hidden">
          <div className="container pt-12">
            <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-200/50 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)]">
              <div className="absolute inset-0">
                <Image
                  src="/documents/news/national-equestrian-championship16.jpg"
                  alt="National Equestrian Championship, 2016"
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
                    National Equestrian Championship, 2016
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
                    A landmark national championship
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
                eyebrow="Championship"
                title="National Equestrian Championship, 2016"
                description="HPRC and TSEA co-hosted a landmark national championship with 200 horses and the country's leading riders competing across five categories."
                align="center"
              />
              <div className="prose prose-lg max-w-none mt-8">
                <p className="text-gray-700 leading-relaxed">
                  The National Equestrian Championship 2016 was a landmark event co-hosted by Hyderabad Polo & 
                  Riding Club and the Telangana State Equestrian Association. The championship featured 200 
                  horses and brought together the country's leading equestrian riders.
                </p>
                <p className="text-gray-700 leading-relaxed mt-6">
                  Competitions were held across five categories, showcasing the diversity and excellence of 
                  equestrian sports in India. The event demonstrated HPRC's capability to host major national 
                  championships and its commitment to promoting equestrian sports.
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
              title="Championship Photos"
              description="Browse through images from the National Equestrian Championship 2016."
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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
