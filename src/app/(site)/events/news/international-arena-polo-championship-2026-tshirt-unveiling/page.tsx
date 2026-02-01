"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ImageLightbox } from "@/components/ui/image-lightbox";
import { SectionHeading } from "@/components/ui/section-heading";

export default function InternationalArenaPoloChampionship2026TshirtUnveilingPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryImages = [
    {
      src: "/documents/news/azharuddin-2026/frame-unveiling.png",
      alt: "Mohammed Azharuddin with Chaitania Kumar and Arsalan Khan at the unveiling of the event invitation and framed horseshoe at Telangana Secretariat",
    },
    {
      src: "/documents/news/azharuddin-2026/tshirt-unveiling.png",
      alt: "Mohammed Azharuddin unveils the official tournament T-shirt for International Arena Polo Championship 2026 with HPRC representatives",
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
                  src="/documents/news/azharuddin-2026/tshirt-unveiling.png"
                  alt="International Arena Polo Championship 2026: Official tournament T-shirt unveiling"
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
                    International Arena Polo Championship 2026: HPRC Unveils Official Tournament
                    T-Shirt
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
                    Minister Mohammed Azharuddin unveils official T-shirt and accepts invitation at
                    Telangana Secretariat
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
                eyebrow="30 January, 2026"
                title="Official T-Shirt & Invitation Unveiled"
                description="HPRC advances preparations for the International Arena Polo Championship 2026 with the unveiling of the official tournament T-shirt and formal presentation of the event invitation to key dignitaries."
                align="center"
              />
              <div className="prose prose-lg max-w-none mt-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  The Hyderabad Polo & Riding Club (HPRC) has advanced its preparations for the
                  International Arena Polo Championship 2026 with the unveiling of the official
                  tournament T-shirt and the formal presentation of the event invitation to key
                  dignitaries.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The official T-shirt was unveiled by Mohammed Azharuddin, Hon&apos;ble Minister for
                  Public Enterprises and Minority Affairs, Government of Telangana, at the Telangana
                  Secretariat. During the meeting, the Minister accepted the invitation to attend the
                  championship and conveyed his encouragement for initiatives that promote sport and
                  equestrian excellence in the State. He appreciated HPRC&apos;s continued efforts to
                  bring international-standard sporting events to Hyderabad and to elevate the
                  city&apos;s global sporting presence.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The unveiling was attended by Chaitania Kumar, Founder-President of HPRC, Arsalan
                  Khan, and other representatives of the club.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The International Arena Polo Championship 2026 will be held from 11–18 February
                  2026 at the Hyderabad Polo & Riding Club. The tournament will host teams from the
                  USA, Germany, France, Luxembourg, and India, setting the stage for a week of
                  high-quality competition and international sporting camaraderie.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  As part of the preparations, HPRC officials also met with Gotte Sudheer Babu, IPS,
                  Commissioner of Police, Future City, to brief him on the championship and to
                  coordinate arrangements for the smooth and secure conduct of the event.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The championship reflects HPRC&apos;s commitment to developing equestrian sport in India
                  while positioning Hyderabad as a destination for premier international polo events.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="container">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Unveiling at Telangana Secretariat</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                onClick={() => {
                  setLightboxIndex(index);
                  setLightboxOpen(true);
                }}
                className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden group cursor-pointer"
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
        </section>

        <section className="container">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/events/world-arena-polo-championship-2026"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Championship 2026 Details
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
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
              Back to News
            </Link>
          </div>
        </section>
      </div>

      <ImageLightbox
        images={galleryImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
