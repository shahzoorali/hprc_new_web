import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { PricingTable } from "@/components/ui/pricing-table";
import { hospitalityContent } from "@/content/hospitality";

export default function BanquetsPage() {
  const venue = hospitalityContent.venues[2]; // Banquets & Events

  return (
    <div className="space-y-16 sm:space-y-20 pb-16 sm:pb-20">
      <div className="container pt-12 sm:pt-16">
        <PageHero
          eyebrow="Events"
          title={venue.name}
          description={venue.description}
          actions={[{ label: "Plan an Event", href: "/contact", variant: "primary" }]}
        />
      </div>

      {/* Main Content */}
      <section className="container space-y-8 sm:space-y-12">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-900 mb-4 font-display">About Our Banquet Facilities</h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                {venue.fullDescription || venue.description}
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-brand-900 mb-4">Why Choose HPRC Banquets?</h3>
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
          </div>

          <div className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={venue.image || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80"}
              alt={venue.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Menu Packages */}
      {venue.menuPackages && venue.menuPackages.length > 0 && (
        <section className="container">
          <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
            <SectionHeading
              eyebrow="Pricing"
              title="Menu Packages"
              description="Choose from our curated menu packages for your event"
              align="center"
            />

            <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3">
              {venue.menuPackages.map((pkg, idx) => (
                <div
                  key={idx}
                  className={`relative overflow-hidden rounded-2xl border-2 ${
                    idx === 1
                      ? "border-brand-500 bg-white shadow-2xl scale-105 lg:scale-110"
                      : "border-brand-200 bg-white/95 shadow-lg"
                  } transition-all duration-300 hover:shadow-xl`}
                >
                  {idx === 1 && (
                    <div className="absolute top-0 right-0 bg-brand-500 text-white px-3 sm:px-4 py-1 rounded-bl-lg text-[10px] sm:text-xs font-bold">
                      POPULAR
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                    <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">{pkg.name}</h4>
                    <div className="mb-4 sm:mb-6">
                      <span className="text-2xl sm:text-3xl font-bold text-brand-600">{pkg.price}</span>
                      <span className="text-xs sm:text-sm text-gray-600 ml-1">{pkg.gst}</span>
                    </div>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {pkg.features.map((feature, featureIdx) => (
                        <li
                          key={featureIdx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-gray-700"
                        >
                          <svg
                            className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-500 mt-0.5 flex-shrink-0"
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
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs sm:text-sm text-gray-600 mt-4 sm:mt-6">
              <strong>Note:</strong> Kindly choose & select items from the menu. Plain rice,
              Sambar, Mirchi ka salan, Raitha, Curd, Papad, pickles are accompaniments.
            </p>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl bg-gradient-to-br from-brand-50 to-brand-100/50 p-8 sm:p-12 border border-brand-200/60 shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-900 mb-4 sm:mb-6 font-display">
              Plan Your Event at HPRC
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              Contact us to discuss your event requirements and let us create a memorable celebration for you.
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

