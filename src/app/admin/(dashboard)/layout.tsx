import Image from "next/image";
import Link from "next/link";

import { LogoutButton } from "@/components/admin/logout-button";

// Minimal admin shell: top bar with the HPRC logo, section links, and a logout
// button. No public site header/footer. Wraps every authenticated dashboard
// page (the login page lives outside this group, so it stays chrome-free).
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="container flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2 hover:no-underline">
              <Image
                src="/hprc_logo.png"
                alt="HPRC"
                width={36}
                height={31}
                className="h-8 w-auto"
              />
              <span className="font-display text-sm font-bold text-neutral-900">Admin</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-neutral-600">
              <Link href="/admin" className="hover:text-brand-700">
                Overview
              </Link>
              <Link href="/admin/nq" className="hover:text-brand-700">
                NQ 2026
              </Link>
              <Link href="/admin/ec" className="hover:text-brand-700">
                EC August
              </Link>
            </nav>
          </div>
          <LogoutButton />
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">{children}</div>
      </main>
    </div>
  );
}
