"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { primaryNavigation, type NavChild } from "@/content/navigation";

function NavLink({ href, label, isActive }: { href: string; label: string; isActive?: boolean }) {
  return (
    <Link
      href={href}
      className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold transition-all lg:px-3 lg:py-2 lg:text-sm ${
        isActive
          ? "bg-brand-600 text-white shadow-sm"
          : "text-gray-800 hover:bg-brand-50 hover:text-brand-700"
      }`}
    >
      {label}
    </Link>
  );
}

function Submenu({ items }: { items: NavChild[] }) {
  return (
    <ul className="grid gap-1 p-3 sm:min-w-[220px]">
      {items.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function DesktopNav() {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-1 lg:gap-1.5 xl:gap-2 lg:flex" role="list">
      {primaryNavigation.map((item) => {
        const isActive = pathname === item.href;

        if (!item.children?.length) {
          return (
            <li key={item.href}>
              <NavLink href={item.href} label={item.label} isActive={isActive} />
            </li>
          );
        }

        return (
          <li key={item.href} className="group relative">
            <NavLink href={item.href} label={item.label} isActive={isActive} />
            <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 w-max opacity-0 shadow-xl transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="rounded-2xl border border-brand-200/50 bg-white/98 backdrop-blur-md shadow-lg">
                <Submenu items={item.children} />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="relative lg:hidden">
      <details className="group">
        <summary className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-700">
          <svg
            className="h-5 w-5 transition-transform group-open:rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span>Menu</span>
        </summary>
        <div className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-brand-200/50 bg-white/98 p-4 shadow-xl backdrop-blur-md z-50">
          <div className="space-y-1">
            {primaryNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-brand-50 text-brand-700"
                        : "text-gray-800 hover:bg-brand-50 hover:text-brand-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children?.length ? (
                    <ul className="mt-1 space-y-0.5 pl-4">
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`block rounded-lg px-3 py-1.5 text-xs transition-colors ${
                                isChildActive
                                  ? "bg-brand-50 text-brand-700 font-medium"
                                  : "text-gray-600 hover:bg-brand-50/50 hover:text-brand-700"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </details>
    </nav>
  );
}

export function MainNav() {
  return (
    <div className="flex w-full items-center justify-end gap-4">
      <DesktopNav />
      <MobileNav />
    </div>
  );
}
