import HomePageClient from "./HomePageClient";
import HomeSectionVisibility from "./components/HomeSectionVisibility";
import styles from "./home-lcp.module.css";
import { getHomePageContent } from "@/sanity/lib/siteContent";
import { getFeaturedProjects } from "@/sanity/lib/projects";
import { getHomePageControls, getTeamMembers } from "@/sanity/lib/cmsBackend";
import type { HomePageContent } from "@/sanity/types/siteContent";

export const revalidate = 300;

export default async function HomePage() {
  const [content, featuredProjects, structuredTeam, controls] = await Promise.all([
    getHomePageContent(),
    getFeaturedProjects(3),
    getTeamMembers(),
    getHomePageControls(),
  ]);

  const resolvedContent: HomePageContent | null = structuredTeam.length
    ? { ...(content || {}), teamMembers: structuredTeam }
    : content;

  return (
    <div className={styles.homePageFirstPaint}>
      <HomePageClient content={resolvedContent} featuredProjects={featuredProjects} />
      <HomeSectionVisibility controls={controls} content={resolvedContent} />
    </div>
  );
}
