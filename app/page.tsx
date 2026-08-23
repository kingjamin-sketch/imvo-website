import HomePageClient from "./HomePageClient";
import { getHomePageContent } from "@/sanity/lib/siteContent";
import { getFeaturedProjects } from "@/sanity/lib/projects";

export const revalidate = 300;

export default async function HomePage() {
  const [content, featuredProjects] = await Promise.all([
    getHomePageContent(),
    getFeaturedProjects(3),
  ]);

  return (
    <HomePageClient content={content} featuredProjects={featuredProjects} />
  );
}