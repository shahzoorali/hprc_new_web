"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { primaryNavigation, type NavChild } from "@/content/navigation";

function NavLink({ href, label, isActive }: { href: string; label: string; isActive?: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-brand-700 text-white"
          : "text-gray-800 hover:bg-brand-100 hover:text-brand-900"
      }`}
    >
      {label}
    </Link>
  );
}

function Submenu({ items }: { items: NavChild[] }) {
  return (
    <ul className="grid gap-2 p-4 sm:min-w-[220px]">
      {items.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            className="block rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-900"
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
    <ul className="hidden items-center gap-2 lg:flex" role="list">
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
              <div className="rounded-2xl border border-gray-200 bg-white/95 backdrop-blur">
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
  return (
    <nav className="lg:hidden">
      <details className="w-full rounded-2xl border border-gray-200 bg-white/90 p-4 text-gray-800 shadow-sm backdrop-blur">
        <summary className="cursor-pointer text-sm font-semibold">Menu</summary>
        <div className="mt-3 space-y-4">
          {primaryNavigation.map((item) => (
            <div key={item.href}>
              <Link href={item.href} className="block text-base font-semibold text-brand-900">
                {item.label}
              </Link>
              {item.children?.length ? (
                <ul className="mt-2 space-y-2 pl-3">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block text-sm text-gray-600 transition-colors hover:text-brand-900"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
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
