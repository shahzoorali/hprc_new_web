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
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex justify-center">
            <div className="relative h-[165px] w-[165px] flex-shrink-0">
              <Image src="/hprc_logo.png" alt="HPRC Logo" fill className="object-contain" />
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">{siteConfig.description}</p>
          <div className="mt-4 space-y-1 text-sm text-gray-600">
            <p>{siteConfig.contact.address}</p>
            <p>{siteConfig.contact.phone}</p>
            <p>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-brand-900">
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
          
          <div className="mt-10 w-full">
            <div className="group relative overflow-hidden rounded-[1.5rem] border border-neutral-800 bg-gradient-to-b from-[#2b2626] to-[#1a1919] p-6 shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury">
              {/* Subtle light effects */}
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#d97706] opacity-[0.08] blur-2xl transition-opacity duration-500 group-hover:opacity-20" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-brand-500 opacity-[0.05] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.15]" />
              
              <div className="relative z-10 flex flex-col items-center justify-center space-y-5 text-center">
                <div className="relative h-20 w-36 flex-shrink-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image 
                    src="/TIPA.png" 
                    alt="The Indian Polo Awards" 
                    fill 
                    className="object-contain drop-shadow-2xl" 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-px w-4 bg-[#d97706]/50"></span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#d97706]">
                      Winner • Season V
                    </span>
                    <span className="h-px w-4 bg-[#d97706]/50"></span>
                  </div>
                  <h4 className="font-display text-base font-medium tracking-wide text-[#faf9f7] leading-snug">
                    Arena Polo Club <br /> Of The Season
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-900">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand-900">
                  {item.label}
                </Link>
              </li>
            ))}
            {utilityNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand-900">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/pay-now" className="hover:text-brand-900">
                Pay Now
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-900">
            Programmes
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            {programmeLinks.map((child) => (
              <li key={child.href}>
                <Link href={child.href} className="hover:text-brand-900">
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-900">
            Stay Connected
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-900"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-900"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-900"
              >
                YouTube
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-900"
              >
                X (Twitter)
              </a>
            </li>
          </ul>
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
