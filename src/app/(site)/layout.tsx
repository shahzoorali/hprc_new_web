import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getSiteConfig } from "@/lib/site";

import "../globals.css";

// Root layout for the public marketing site.
//
// This is one of TWO root layouts in the app — the other is (payload)/layout.tsx,
// which renders the CMS admin. Next.js only allows multiple root layouts when
// there is no src/app/layout.tsx, so the html/body/fonts/metadata that used to
// live there were merged into this file. Without that split, Payload's admin
// shell renders its own <html> inside the site's <html> and the page breaks.
//
// Anything added here applies to the public site only — the CMS deliberately
// does not inherit the site's fonts, Tailwind preflight or analytics.

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Sophisticated font pairing
const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-accent",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return {
    title: {
      default: `${siteConfig.name} | Equestrian, Polo & Sports Club in Hyderabad`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    metadataBase: new URL("https://www.hprc.in"),
    icons: {
      icon: [
        { url: "/icon.png", sizes: "512x512", type: "image/png" },
        { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      ],
      shortcut: "/favicon.png",
      apple: "/apple-icon.png",
    },
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.description,
      type: "website",
      url: "https://www.hprc.in",
      locale: "en_IN",
      siteName: siteConfig.name,
      images: [
        {
          url: "/hprc_logo.png",
          width: 527,
          height: 457,
          alt: "HPRC Logo",
        },
      ],
    },
    verification: {
      google: "fKPeTpFmYjXGifr5MlL4B0OIjwJCxuqXxj1XEcYEE24",
    },
    other: {
      "theme-color": "#e31e24",
    },
  };
}

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wotx268kq9");
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}
                  ${playfairDisplay.variable} ${inter.variable} ${cormorantGaramond.variable}
                  bg-background antialiased text-foreground`}
        suppressHydrationWarning
      >
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
