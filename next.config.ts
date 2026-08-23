import type { NextConfig } from "next";

const lightweightFallbackRewrites = [
  ["/contact-hero.png", "/contact-hero.webp"],
  ["/about-hero.png", "/about-hero.webp"],
  ["/regional-map.png", "/regional-map.webp"],
  ["/services-hero.png", "/services-hero.webp"],
  ["/service-planning.png", "/service-planning.webp"],
  ["/service-process.png", "/service-process.webp"],
  ["/service-site-1.png", "/service-site-1.webp"],
  ["/team.png", "/team.webp"],
  ["/team1.png", "/team1.webp"],
  ["/team2.png", "/team2.webp"],
  ["/team3.png", "/team3.webp"],
  ["/team4.png", "/team4.webp"],
] as const;

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: lightweightFallbackRewrites.map(([source, destination]) => ({
        source,
        destination,
      })),
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
