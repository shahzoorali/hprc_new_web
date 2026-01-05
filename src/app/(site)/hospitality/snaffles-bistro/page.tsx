import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { hospitalityContent } from "@/content/hospitality";
import { MenuSection } from "./menu-section";

export default function SnafflesBistroPage() {
  const venue = hospitalityContent.venues[1]; // Snaffles Bistro

  return (
    <div className="space-y-16 sm:space-y-20 pb-16 sm:pb-20">
      <div className="container pt-12 sm:pt-16">
        <PageHero
          eyebrow="Dining"
          title={venue.name}
          description={venue.description}
          actions={[{ label: "View Menu", href: venue.menuLinks?.[0]?.href || "#", variant: "primary" }]}
        />
      </div>

      {/* Main Content */}
      <section className="container space-y-8 sm:space-y-12">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="relative h-80 sm:h-96 lg:h-[500px]  overflow-hidden order-2 lg:order-1">
            <Image
              src={venue.image || "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80"}
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
                <h3 className="text-xl sm:text-2xl font-semibold text-brand-900 mb-4">Menu</h3>
                <div className="flex flex-wrap gap-3">
                  {venue.menuLinks.map((menu, idx) => (
                    <Link
                      key={idx}
                      href={menu.href}
                      target={menu.href.startsWith('http') || menu.href.endsWith('.pdf') ? '_blank' : undefined}
                      className="inline-flex items-center gap-2  border-2 border-brand-500 bg-white px-6 py-3 text-sm font-bold text-brand-600 transition-all duration-300 hover:bg-brand-500 hover:text-white hover:shadow-lg"
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

      {/* Menu Section */}
      <MenuSection />

      {/* CTA Section */}
      <section className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className=" bg-gradient-to-br from-brand-50 to-brand-100/50 p-8 sm:p-12 border border-brand-200/60 shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-900 mb-4 sm:mb-6 font-display">
              Visit Snaffles Bistro
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              Join us for a casual and relaxed dining experience. Perfect for family gatherings and friendly meet-ups.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2  bg-gradient-to-r from-brand-500 to-brand-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-brand-500/30 transition-all duration-300 hover:from-brand-600 hover:to-brand-700 hover:shadow-2xl hover:-translate-y-1"
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
                className="inline-flex items-center justify-center  border-2 border-brand-500 bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-brand-600 shadow-lg transition-all duration-300 hover:bg-brand-50 hover:border-brand-600"
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

