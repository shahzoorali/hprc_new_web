import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { LogoutButton } from "@/components/admin/logout-button";
import { requireCmsUser } from "@/lib/cms-auth";

import "../globals.css";

// Root layout for the registrations dashboard.
//
// This is the THIRD root layout in the app, alongside (site) and (payload).
// It exists so these screens keep the site's Tailwind styling and fonts rather
// than inheriting Payload's admin CSS — the dashboard is unchanged from what it
// looked like before the CMS landed.
//
// It serves /admin/registrations/* while Payload's [[...segments]] catch-all
// serves the rest of /admin. Next resolves the more specific static segments
// here ahead of Payload's catch-all, so the two coexist.
//
// Authentication is Payload's: one login at /admin covers both.

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});
const inter = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Registrations — HPRC",
  robots: { index: false, follow: false },
};

export default async function ManageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireCmsUser("/admin/registrations");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${inter.variable} bg-neutral-50 antialiased`}
        suppressHydrationWarning
      >
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-neutral-200 bg-white">
            <div className="container flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-6">
                <Link
                  href="/admin/registrations"
                  className="flex items-center gap-2 hover:no-underline"
                >
                  <Image
                    src="/hprc_logo.png"
                    alt="HPRC"
                    width={36}
                    height={31}
                    className="h-8 w-auto"
                  />
                  <span className="font-display text-sm font-bold text-neutral-900">
                    Registrations
                  </span>
                </Link>
                <nav className="flex items-center gap-4 text-sm font-medium text-neutral-600">
                  <Link href="/admin/registrations" className="hover:text-brand-700">
                    Overview
                  </Link>
                  <Link href="/admin/registrations/nq" className="hover:text-brand-700">
                    NQ 2026
                  </Link>
                  <Link href="/admin/registrations/ec" className="hover:text-brand-700">
                    EC August
                  </Link>
                  <span className="text-neutral-300">|</span>
                  <Link href="/admin" className="hover:text-brand-700">
                    ← Back to CMS
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-neutral-500">
                  Signed in as{" "}
                  <strong className="text-neutral-700">{user.name || user.email}</strong>
                </span>
                <LogoutButton />
              </div>
            </div>
          </header>
          <main className="flex-1">
            <div className="container py-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
