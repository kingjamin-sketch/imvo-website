import type { MetadataRoute } from "next";
import { getGrowthSettings } from "@/sanity/lib/cmsBackend";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const growth = await getGrowthSettings();

  if (growth?.siteIndexingEnabled === false) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: "https://www.imvogroup.com/sitemap.xml",
      host: "https://www.imvogroup.com",
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/studio/"],
    },
    sitemap: "https://www.imvogroup.com/sitemap.xml",
    host: "https://www.imvogroup.com",
  };
}
