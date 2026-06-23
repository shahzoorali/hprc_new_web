import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { LogoutButton } from "@/components/admin/logout-button";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-session";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  const username = await verifySessionToken(token);

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
          <div className="flex items-center gap-3">
            {username ? (
              <span className="text-sm text-neutral-500">
                Signed in as <strong className="text-neutral-700">{username}</strong>
              </span>
            ) : null}
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">{children}</div>
      </main>
    </div>
  );
}
