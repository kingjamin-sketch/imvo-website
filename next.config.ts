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
  ["/p01-01.png", "/p01-01.webp"],
  ["/p01-02.jpg", "/p01-02.webp"],
  ["/p01-03.jpg", "/p01-03.webp"],
  ["/p02-1.png", "/p02-1.webp"],
  ["/p03-1.png", "/p03-1.webp"],
  ["/p04-1.png", "/p04-1.webp"],
  ["/p05-1.png", "/p05-1.webp"],
  ["/p06-1.png", "/p06-1.webp"],
  ["/p07-1.png", "/p07-1.webp"],
  ["/p08-1.jpg", "/p08-1.webp"],
  ["/p09-1.jpg", "/p09-1-jpg.webp"],
  ["/p09-1.png", "/p09-1-png.webp"],
  ["/p10-1.png", "/p10-1.webp"],
  ["/p11-1.png", "/p11-1.webp"],
  ["/project-12.jpg", "/project-12.webp"],
  ["/p13-1.png", "/p13-1.webp"],
  ["/p14-1.png", "/p14-1.webp"],
  ["/p15-1.png", "/p15-1.webp"],
  ["/p16-1.png", "/p16-1.webp"],
  ["/project-100.png", "/project-100.webp"],
  ["/project-80.png", "/project-80.webp"],
  ["/project-90.png", "/project-90.webp"],
  ["/p20-1.png", "/p20-1.webp"],
  ["/p21-1.jpg", "/p21-1.webp"],
  ["/p22-1.jpg", "/p22-1.webp"],
  ["/p23-1.jpg", "/p23-1.webp"],
  ["/p24-1.jpg", "/p24-1.webp"],
  ["/p25-1.jpg", "/p25-1.webp"],
  ["/p26-1.png", "/p26-1.webp"],
  ["/p27-1.png", "/p27-1.webp"],
  ["/p28-1.jpg", "/p28-1.webp"],
  ["/project-44.jpg", "/project-44.webp"],
  ["/project-030.jpg", "/project-030.webp"],
  ["/p31-1.png", "/p31-1.webp"],
  ["/project-14.jpg", "/project-14.webp"],
  ["/project-22.jpg", "/project-22.webp"],
  ["/project-10.png", "/project-10.webp"],
  ["/project-36.png", "/project-36.webp"],
  ["/project-23.png", "/project-23.webp"],
  ["/project-46.jpg", "/project-46.webp"],
  ["/project-30.jpg", "/project-30.webp"],
  // DŌMICILE: keep the stable public URLs used by the component, but serve
  // the verified estate AVIF assets already committed to the repository.
  ["/domicile/exact/estate-hero.jpg", "/domicile/award/estate-main.avif"],
  ["/domicile/exact/estate-c1.jpg", "/domicile/award/estate-c1.avif"],
  ["/domicile/exact/estate-street.jpg", "/domicile/award/estate-street.avif"],
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
