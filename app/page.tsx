import HomePageClient from "./HomePageClient";
import PremiumHomeEnhancements from "./components/PremiumHomeEnhancements";
import { getHomePageContent } from "@/sanity/lib/siteContent";
import { getFeaturedProjects } from "@/sanity/lib/projects";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [content, featuredProjects] = await Promise.all([
    getHomePageContent(),
    getFeaturedProjects(3),
  ]);

  return (
    <>
      <HomePageClient content={content} featuredProjects={featuredProjects} />
      <PremiumHomeEnhancements />
    </>
  );
}
