"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { MenuSection } from "@/app/(site)/hospitality/chukkers/menu-section";
import { hospitalityContent } from "@/content/hospitality";

export default function ChukkersPage() {
  const venue = hospitalityContent.venues[0]; // Chukkers Restaurant
  
  const galleryImages = [
    {
      src: "/documents/gallery/chukkers/cha01.jpeg",
      alt: "Chukkers Restaurant Interior",
    },
    {
      src: "/documents/gallery/chukkers/cha4.jpeg",
      alt: "Chukkers Restaurant Dining Area",
    },
    {
      src: "/documents/gallery/chukkers/cha5.jpeg",
      alt: "Chukkers Restaurant Ambiance",
    },
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <div className="space-y-16 sm:space-y-20 pb-16 sm:pb-20">
      <div className="container pt-12 sm:pt-16">
        <PageHero
          eyebrow="Dining"
          title={venue.name}
          description={venue.description}
          actions={[
            { label: "View Gallery", href: "#menu-section", variant: "outline" },
            { label: "View Menu", href: "#menu-section", variant: "primary" }
          ]}
        />
      </div>

      {/* About Section */}
      <section className="container space-y-8 sm:space-y-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 mb-4 font-display">About {venue.name}</h2>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                <strong>Opening Hours:</strong>
              </div>
              <div className="text-sm sm:text-base text-brand-600 font-semibold">
                Lunch: 12:00 PM - 3:30 PM
              </div>
              <div className="text-sm sm:text-base text-brand-600 font-semibold">
                Dinner: 7:30 PM - 11:00 PM
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <strong>Cuisine:</strong>
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Multi-Cuisine featuring authentic Indian, Continental, and Asian specialties
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <strong>Seating Capacity:</strong>
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Elegant indoor dining with options for intimate gatherings to large celebrations
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <strong>Ambiance:</strong>
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Refined decor with elegant lighting and sophisticated atmosphere
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container space-y-8 sm:space-y-12">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={venue.image || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80"}
              alt={venue.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-900 mb-4 font-display">About {venue.name}</h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                {venue.fullDescription || venue.description}
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-brand-900 mb-4">Highlights</h3>
              <ul className="space-y-3">
                {venue.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="h-5 w-5 text-brand-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {venue.menuLinks && venue.menuLinks.length > 0 && (
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-brand-900 mb-4">Menus</h3>
                <div className="flex flex-wrap gap-3">
                  {venue.menuLinks.map((menu, idx) => (
                    <Link
                      key={idx}
                      href={menu.href}
                      target={menu.href.startsWith('http') ? '_blank' : undefined}
                      className="inline-flex items-center gap-2 rounded-full border-2 border-brand-500 bg-white px-6 py-3 text-sm font-bold text-brand-600 transition-all duration-300 hover:bg-brand-500 hover:text-white hover:shadow-lg"
                    >
                      {menu.label}
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
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container space-y-8 sm:space-y-12">
        <SectionHeading
          eyebrow="Gallery"
          title="Experience Chukkers"
          description="Take a visual journey through our elegant dining space and sophisticated ambiance."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
      </section>

      {/* Lightbox */}
      <ImageLightbox
        images={galleryImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      {/* Menu Section */}
      <MenuSection />

      {/* CTA Section */}
      <section className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl bg-gradient-to-br from-brand-50 to-brand-100/50 p-8 sm:p-12 border border-brand-200/60 shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-900 mb-4 sm:mb-6 font-display">
              Ready to Dine at Chukkers?
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              Make a reservation or contact us for more information about our dining experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-brand-500/30 transition-all duration-300 hover:from-brand-600 hover:to-brand-700 hover:shadow-2xl hover:-translate-y-1"
              >
                Contact Us
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/hospitality"
                className="inline-flex items-center justify-center rounded-full border-2 border-brand-500 bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-brand-600 shadow-lg transition-all duration-300 hover:bg-brand-50 hover:border-brand-600"
              >
                View All Venues
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
