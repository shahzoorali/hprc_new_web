import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Standard crawlers — full access ──────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/membership/login",
          "/membership/pay-now",
          "/pay-now",
          "/pay-now/success",
          "/events/*/success",  // payment success/confirmation pages
          "/api/",
        ],
      },

      // ── AI crawlers — explicitly allow for AISEO ─────────────────────────
      // Allowing AI crawlers helps surface HPRC content in AI search answers
      // (ChatGPT, Perplexity, Claude, Gemini, etc.)
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/membership/login", "/membership/pay-now", "/pay-now"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/membership/login", "/membership/pay-now", "/pay-now"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/membership/login", "/membership/pay-now", "/pay-now"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/membership/login", "/membership/pay-now", "/pay-now"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/membership/login", "/membership/pay-now", "/pay-now"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/membership/login", "/membership/pay-now", "/pay-now"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/membership/login", "/membership/pay-now", "/pay-now"],
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
      },
      // Google's AI-specific crawlers
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      // Meta AI
      {
        userAgent: "meta-externalagent",
        allow: "/",
        disallow: ["/membership/login", "/membership/pay-now", "/pay-now"],
      },
      // Apple
      {
        userAgent: "Applebot",
        allow: "/",
      },
      // Amazon Alexa
      {
        userAgent: "Amazonbot",
        allow: "/",
        disallow: ["/membership/login", "/membership/pay-now", "/pay-now"],
      },
    ],
    sitemap: "https://www.hprc.in/sitemap.xml",
    host: "https://www.hprc.in",
  };
}
