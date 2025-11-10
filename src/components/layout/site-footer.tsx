import Link from "next/link";

import { siteConfig } from "@/config/site";
import { primaryNavigation, utilityNavigation } from "@/content/navigation";

const quickLinks = primaryNavigation.filter((item) => item.label !== "Home").slice(0, 5);

export function SiteFooter() {
  const programmeLinks =
    primaryNavigation.find((item) => item.label === "Programmes")?.children ?? [];

  return (
    <footer className="mt-16 border-t border-gray-200 bg-gradient-to-b from-white to-brand-50/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-800 text-lg font-semibold text-white shadow-md shadow-brand-900/20">
            HP
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
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-900">
            Programmes
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            {programmeLinks.slice(0, 6).map((child) => (
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
