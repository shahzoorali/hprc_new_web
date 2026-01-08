"use client";

import Image from "next/image";
import { useState } from "react";

import { ImageLightbox } from "@/components/ui/image-lightbox";
import { PageHero } from "@/components/ui/page-hero";
import { PricingTable } from "@/components/ui/pricing-table";
import { RulesSection } from "@/components/ui/rules-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { saunaContent } from "@/content/sauna";

export default function SaunaPage() {
  const galleryImages = [
    {
      src: "/documents/gallery/sauna/Sauna.jpg",
      alt: "HPRC Sauna Facility",
    },
    {
      src: "/documents/gallery/sauna/Sauna_2.jpg",
      alt: "HPRC Sauna Room",
    },
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <div className="space-y-10 sm:space-y-16 pb-10 sm:pb-16">
      {/* Hero Section */}
      <div className="container pt-12">
        <PageHero
          eyebrow={saunaContent.hero.eyebrow}
          title={saunaContent.hero.title}
          description={saunaContent.hero.description}
          actions={[
            { label: "Book a Session", href: "/contact", variant: "primary" },
            { label: "View All Facilities", href: "/sports-centre", variant: "outline" },
          ]}
          backgroundImage="/documents/gallery/sauna/Bg-Home-020.jpg"
        />
      </div>

      {/* Overview */}
      <section className="container space-y-6">
        <p className="text-sm text-gray-700 md:text-base leading-relaxed">
          Fill out the form to enroll and enjoy the benefits of our sauna facility.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Click here to download the form
        </a>
      </section>

      {/* Timings Section */}
      <section className="container space-y-8 sm:space-y-12">
        <SectionHeading
          eyebrow="Operating Hours"
          title="Sauna Timings"
          description="Plan your visit according to our schedule. Morning and evening sessions available."
          align="left"
        />
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {saunaContent.timings.map((timing) => (
            <div
              key={timing.label}
              className="p-6 rounded-2xl border-2 border-brand-200 bg-gradient-to-br from-brand-50/30 to-white hover:border-brand-300 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-2 text-brand-900">{timing.label}</h3>
              <p className="text-sm text-gray-700">{timing.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container space-y-8">
        <SectionHeading
          eyebrow="Membership"
          title={saunaContent.pricing.heading}
          description="Choose from per-day options for members and guests."
          align="left"
        />
        <PricingTable heading={saunaContent.pricing.heading} rows={saunaContent.pricing.rows} />
        <ul className="space-y-3 text-sm text-gray-600">
          {saunaContent.pricing.notes.map((note) => (
            <li key={note} className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Rules Section */}
      <RulesSection
        categories={saunaContent.rules}
        eyebrow="Safety First"
        title="Sauna Rules & Etiquette"
        description="Please follow these important safety guidelines to ensure a safe and enjoyable experience."
      />

      {/* Gallery Section */}
      <section className="container space-y-8">
        <SectionHeading
          eyebrow="Gallery"
          title={saunaContent.gallery.heading}
          description={saunaContent.gallery.description}
          align="left"
        />
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
        <ImageLightbox
          images={galleryImages}
          initialIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      </section>

      {/* CTA Section */}
      <section className="container">
        <div className="rounded-3xl bg-gradient-to-r from-brand-600 to-brand-700 p-8 sm:p-12 text-center text-white shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Relax?</h2>
          <p className="text-sm sm:text-base text-white/90 mb-6 max-w-2xl mx-auto">
            Contact us to book a session or learn more about our sauna facilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
            >
              Contact Us
            </a>
            <a
              href="/membership"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Apply for Membership
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
