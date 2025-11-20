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
    ],
    unoptimized: false,
  },
};

export default nextConfig;
