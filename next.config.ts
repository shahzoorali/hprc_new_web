import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "telanganatoday.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.telanganatoday.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "newsmeter.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.newsmeter.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hprc.in",
        pathname: "/**",
      },
    ],
    unoptimized: false,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
