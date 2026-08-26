import type { MetadataRoute } from "next";
import { getAllProjects } from "@/sanity/lib/projects";
import { getGrowthSettings } from "@/sanity/lib/cmsBackend";

const siteUrl = "https://www.imvogroup.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, growth] = await Promise.all([
    getAllProjects(),
    getGrowthSettings(),
  ]);

  if (growth?.siteIndexingEnabled === false) return [];

  const hiddenRoutes = new Set(
    (growth?.seoPages || [])
      .filter((entry) => entry.noIndex === true && entry.routePath)
      .map((entry) => entry.routePath as string),
  );

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/projects`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/services/design`, changeFrequency: "monthly", priority: 0.86 },
    { url: `${siteUrl}/services/consultancy`, changeFrequency: "monthly", priority: 0.86 },
    { url: `${siteUrl}/services/site-coordination`, changeFrequency: "monthly", priority: 0.86 },
    { url: `${siteUrl}/domicile`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/careers`, changeFrequency: "weekly", priority: 0.65 },
  ].filter((entry) => {
    const path = new URL(entry.url).pathname || "/";
    return !hiddenRoutes.has(path);
  });

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter(
      (project) =>
        typeof project.slug === "string" &&
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(project.slug) &&
        !hiddenRoutes.has(`/projects/${project.slug}`),
    )
    .map((project) => ({
      url: `${siteUrl}/projects/${encodeURIComponent(project.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [...coreRoutes, ...projectRoutes];
}
