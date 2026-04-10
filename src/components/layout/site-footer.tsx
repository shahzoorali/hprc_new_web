import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { primaryNavigation, utilityNavigation } from "@/content/navigation";

const quickLinks = primaryNavigation.filter((item) => item.label !== "Home").slice(0, 5);

export function SiteFooter() {
  const programmesNav = primaryNavigation.find((item) => item.label === "Programmes");
  const programmeLinks =
    programmesNav?.sections?.[0]?.items ?? programmesNav?.children ?? [];

  return (
    <footer className="mt-16 border-t border-gray-200 bg-gradient-to-b from-white to-brand-50/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-5">
        {/* Column 1: Logo & Info */}
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex justify-center sm:justify-start">
            <div className="relative h-[120px] w-[120px] flex-shrink-0">
              <Image src="/hprc_logo.png" alt="HPRC Logo" fill className="object-contain" />
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600 sm:text-left">{siteConfig.description}</p>
          <div className="mt-4 space-y-1 text-center text-sm text-gray-600 sm:text-left">
            <p>{siteConfig.contact.address}</p>
            <p>{siteConfig.contact.phone}</p>
            <p>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-brand-900">
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-900 border-b-2 border-brand-500 pb-1 mb-4">
            Navigation
          </h3>
          <ul className="space-y-2 text-center text-sm text-gray-600 sm:text-left">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand-900 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
            {utilityNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand-900 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Instagram Feed (Center) */}
        <div className="flex flex-col items-center sm:col-span-2 lg:col-span-1">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-900 border-b-2 border-brand-500 pb-1 mb-4">
            Instagram @hydprc
          </h3>
          <div className="grid grid-cols-3 gap-1.5 w-full max-w-[240px]">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <a
                key={i}
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square overflow-hidden rounded-md shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <Image
                  src={`/images/instagram/feed-${i}.png`}
                  alt={`Instagram feed ${i}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-900/0 transition-colors duration-300 group-hover:bg-brand-900/20" />
              </a>
            ))}
          </div>
          <Link
            href={siteConfig.social.instagram}
            target="_blank"
            className="mt-4 text-xs font-bold uppercase tracking-tighter text-brand-600 hover:text-brand-700 transition-colors"
          >
            Follow our journey →
          </Link>
        </div>

        {/* Column 4: Programmes */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-900 border-b-2 border-brand-500 pb-1 mb-4">
            Programmes
          </h3>
          <ul className="space-y-2 text-center text-sm text-gray-600 sm:text-left">
            {programmeLinks.map((child) => (
              <li key={child.href}>
                <Link href={child.href} className="hover:text-brand-900 transition-colors">
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5: Magazine & Awards */}
        <div className="flex flex-col items-center sm:items-start lg:items-end">
          <div className="w-full max-w-[180px]">
            <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-brand-900 sm:text-left lg:text-right border-b-2 border-brand-500 pb-1 inline-block w-full">
              The Chukker
            </h3>
            <Link
              href="https://heyzine.com/flip-book/212e8e98e4.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury"
            >
              <div className="relative aspect-[3/4.2]">
                <Image
                  src="/images/chukker-2026.png"
                  alt="Chukker 2026 Magazine Cover"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute -right-12 top-5 w-[180px] rotate-45 bg-[#d97706] py-1 text-center shadow-lg ring-1 ring-white/20 z-10">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white leading-none">
                    2026
                  </p>
                </div>
              </div>
              <div className="bg-brand-900 py-2 text-center transition-colors duration-300 group-hover:bg-brand-800">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                  Read Issue
                </span>
              </div>
            </Link>
          </div>

          <div className="mt-8 group relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-b from-[#2b2626] to-[#1a1919] p-4 shadow-xl transition-all duration-500 hover:shadow-luxury w-full max-w-[180px]">
            <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#d97706] opacity-[0.08] blur-xl" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative h-12 w-24 mb-2">
                <Image src="/TIPA.png" alt="TIPA Award" fill className="object-contain" />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-widest text-[#d97706] mb-1">
                Winner Season V
              </span>
              <h4 className="text-[10px] font-medium text-white leading-tight">
                Arena Polo Club <br /> Of The Season
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Hyderabad Polo & Riding Club. All rights reserved.
          </p>
          <div className="space-x-4">
            <Link href="/terms" className="hover:text-brand-900">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-brand-900">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
