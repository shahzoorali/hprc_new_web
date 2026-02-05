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
