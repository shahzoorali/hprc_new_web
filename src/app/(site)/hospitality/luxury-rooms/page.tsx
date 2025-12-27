import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";

export default function LuxuryRoomsPage() {
  return (
    <div className="space-y-16 sm:space-y-20 pb-16 sm:pb-20">
      <div className="container pt-12 sm:pt-16">
        <PageHero
          eyebrow="Accommodation"
          title="Luxury Rooms"
          description="Experience the perfect weekend getaway at HPRC. Our luxury rooms offer a serene retreat with modern amenities, elegant decor, and breathtaking views of the club grounds."
          actions={[{ label: "Book Now", href: "/contact", variant: "primary" }]}
        />
      </div>

      {/* Main Content */}
      <section className="container space-y-8 sm:space-y-12">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80"
              alt="Luxury Rooms at HPRC"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-900 mb-4 font-display">Luxury Accommodation</h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                We are coming up with Rooms very soon, that may be booked by our members and their guests for the perfect weekend getaways. 
                Our luxury rooms will feature modern amenities, elegant furnishings, and stunning views of the club's beautiful grounds.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Whether you're visiting for a polo tournament, a family celebration, or simply to enjoy the club's facilities, 
                our accommodation will provide a comfortable and memorable stay.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-brand-900 mb-4">Coming Soon</h3>
              <ul className="space-y-3">
                {[
                  "Elegant and spacious rooms with modern amenities",
                  "Stunning views of the club grounds and polo fields",
                  "Complimentary access to club facilities",
                  "Perfect for weekend getaways and extended stays",
                  "Priority booking for members and their guests"
                ].map((feature, idx) => (
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
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl bg-gradient-to-br from-brand-50 to-brand-100/50 p-8 sm:p-12 border border-brand-200/60 shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-900 mb-4 sm:mb-6 font-display">
              Stay Updated
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              Our luxury rooms are coming soon! Contact us to be notified when bookings open and to learn more about our accommodation options.
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

