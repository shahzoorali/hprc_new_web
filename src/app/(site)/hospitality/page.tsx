import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { hospitalityContent } from "@/content/hospitality";

export default function HospitalityPage() {
  return (
    <div className="space-y-20 pb-20">
      <div className="container pt-12">
        <PageHero
          eyebrow={hospitalityContent.hero.eyebrow}
          title={hospitalityContent.hero.title}
          description={hospitalityContent.hero.description}
          actions={[{ label: "Plan an Event", href: "/contact", variant: "primary" }]}
        />
      </div>

      {/* Restaurants Section - Creative Layout */}
      <section className="container space-y-16">
        <SectionHeading
          eyebrow="Our Restaurants"
          title="Exquisite dining experiences"
          description="Choose from our two premier dining venues, each offering a unique atmosphere and exceptional cuisine."
          align="center"
        />
        
        {/* Chukkers Restaurant - Featured */}
        <article className="group relative overflow-hidden rounded-3xl border border-brand-200/50 bg-white shadow-xl">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-96 lg:h-auto overflow-hidden order-2 lg:order-1">
              <Image
                src={hospitalityContent.venues[0].image || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80"}
                alt={hospitalityContent.venues[0].name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent lg:bg-gradient-to-t lg:from-black/60 lg:via-transparent lg:to-transparent"></div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2 bg-gradient-to-br from-brand-50/30 to-white">
              <div className="flex items-center gap-4 mb-4">
                {(hospitalityContent.venues[0] as any).logo && (
                  <div className="relative h-16 w-16 flex-shrink-0">
                  <Image
                      src={(hospitalityContent.venues[0] as any).logo}
                      alt={`${hospitalityContent.venues[0].name} Logo`}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                )}
                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
                  {hospitalityContent.venues[0].name}
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {hospitalityContent.venues[0].description}
              </p>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                {hospitalityContent.venues[0].fullDescription}
              </p>
              <ul className="space-y-3 mb-6">
                {hospitalityContent.venues[0].highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-brand-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
              {hospitalityContent.venues[0].menuLinks && (
                <div className="flex flex-wrap gap-3">
                  {hospitalityContent.venues[0].menuLinks.map((menu, idx) => (
                    <Link
                      key={idx}
                      href={menu.href}
                      className="inline-flex items-center rounded-full border-2 border-brand-500 bg-white px-6 py-2.5 text-sm font-bold text-brand-600 transition-all duration-300 hover:bg-brand-500 hover:text-white hover:shadow-lg"
                    >
                      {menu.label}
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Snaffles Bistro - Featured (Reversed) */}
        <article className="group relative overflow-hidden rounded-3xl border border-brand-200/50 bg-white shadow-xl">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-96 lg:h-auto overflow-hidden order-1 lg:order-2">
              <Image
                src={hospitalityContent.venues[1].image || "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80"}
                alt={hospitalityContent.venues[1].name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/20 to-transparent lg:bg-gradient-to-t lg:from-black/60 lg:via-transparent lg:to-transparent"></div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1 bg-gradient-to-br from-white to-brand-50/30">
              <div className="flex items-center gap-4 mb-4">
                {(hospitalityContent.venues[1] as any).logo && (
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={(hospitalityContent.venues[1] as any).logo}
                      alt={`${hospitalityContent.venues[1].name} Logo`}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                )}
                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
                  {hospitalityContent.venues[1].name}
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {hospitalityContent.venues[1].description}
              </p>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                {hospitalityContent.venues[1].fullDescription}
              </p>
              <ul className="space-y-3 mb-6">
                {hospitalityContent.venues[1].highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-brand-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
              {hospitalityContent.venues[1].menuLinks && (
                <div className="flex flex-wrap gap-3">
                  {hospitalityContent.venues[1].menuLinks.map((menu, idx) => (
                    <Link
                      key={idx}
                      href={menu.href}
                      className="inline-flex items-center rounded-full border-2 border-brand-500 bg-white px-6 py-2.5 text-sm font-bold text-brand-600 transition-all duration-300 hover:bg-brand-500 hover:text-white hover:shadow-lg"
                    >
                      {menu.label}
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
            </div>
                </div>
              </article>
      </section>

      {/* Banquets Section with Packages */}
      {hospitalityContent.venues[2] && (
        <section className="bg-gradient-to-br from-brand-50/30 via-white to-brand-50/20 py-20">
          <div className="container space-y-12">
            <div className="text-center space-y-4">
              {(hospitalityContent.venues[2] as any).logo && (
                <div className="flex justify-center mb-4">
                  <div className="relative h-20 w-20">
                    <Image
                      src={(hospitalityContent.venues[2] as any).logo}
                      alt={`${hospitalityContent.venues[2].name} Logo`}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                </div>
              )}
              <SectionHeading
                eyebrow="Banquets & Events"
                title={hospitalityContent.venues[2].name}
                description={hospitalityContent.venues[2].fullDescription || hospitalityContent.venues[2].description}
                align="center"
              />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose HPRC Banquets?</h3>
                <ul className="space-y-3">
                  {hospitalityContent.venues[2].highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="h-6 w-6 text-brand-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-lg">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-80 lg:h-full rounded-2xl overflow-hidden">
                <Image
                  src={hospitalityContent.venues[2].image || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80"}
                  alt={hospitalityContent.venues[2].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Menu Packages */}
            {hospitalityContent.venues[2].menuPackages && (
              <div>
                <h3 className="text-3xl font-extrabold text-center text-gray-900 mb-10">Menu Packages</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {hospitalityContent.venues[2].menuPackages.map((pkg, idx) => (
                    <div
                      key={idx}
                      className={`relative overflow-hidden rounded-2xl border-2 ${
                        idx === 1
                          ? "border-brand-500 bg-white shadow-2xl scale-105 lg:scale-110"
                          : "border-brand-200 bg-white/95 shadow-lg"
                      } transition-all duration-300 hover:shadow-xl`}
                    >
                      {idx === 1 && (
                        <div className="absolute top-0 right-0 bg-brand-500 text-white px-4 py-1 rounded-bl-lg text-xs font-bold">
                          POPULAR
                        </div>
                      )}
                      <div className="p-6">
                        <h4 className="text-2xl font-extrabold text-gray-900 mb-2">{pkg.name}</h4>
                        <div className="mb-6">
                          <span className="text-3xl font-bold text-brand-600">{pkg.price}</span>
                          <span className="text-sm text-gray-600 ml-1">{pkg.gst}</span>
                        </div>
                        <ul className="space-y-2">
                          {pkg.features.map((feature, featureIdx) => (
                            <li key={featureIdx} className="flex items-start gap-2 text-sm text-gray-700">
                              <svg className="h-4 w-4 text-brand-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-sm text-gray-600 mt-6">
                  <strong>Note:</strong> Kindly choose & select items from the menu. Plain rice, Sambar, Mirchi ka salan, Raitha, Curd, Papad, pickles are accompaniments.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Experiences Section */}
      <section className="container space-y-10">
        <SectionHeading
          eyebrow="Experiences"
          title="Curated hospitality for members and guests"
          description="Personalise your visit with culinary journeys, wellness add-ons, and signature celebrations."
          align="center"
        />
        <div className="grid gap-8 md:grid-cols-3">
          {hospitalityContent.experiences.map((experience, index) => {
            const experienceImages = [
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
              "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
            ];
            return (
              <div
                key={experience.title}
                className="group relative overflow-hidden rounded-2xl border border-brand-200/50 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={experienceImages[index % experienceImages.length]}
                    alt={experience.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{experience.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
