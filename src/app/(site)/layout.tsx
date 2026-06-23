import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

// Layout for the public marketing site. Wraps every (site) page with the shared
// header + footer chrome. The /admin route group lives outside this group and
// renders its own minimal shell, so the dashboard never shows site chrome.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
