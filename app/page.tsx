import HomePageClient from "./HomePageClient";
import HomeSectionVisibility from "./components/HomeSectionVisibility";
import HomeWelcomeEnhancements from "./components/HomeWelcomeEnhancements";
import styles from "./home-lcp.module.css";
import { getHomePageContent } from "@/sanity/lib/siteContent";
import { getAllProjects } from "@/sanity/lib/projects";
import { getHomePageControls, getTeamMembers } from "@/sanity/lib/cmsBackend";
import type { HomePageContent } from "@/sanity/types/siteContent";

export const revalidate = 300;

export default async function HomePage() {
  const [content, allProjects, structuredTeam, controls] = await Promise.all([
    getHomePageContent(),
    getAllProjects(),
    getTeamMembers(),
    getHomePageControls(),
  ]);

  const resolvedContent: HomePageContent | null = structuredTeam.length
    ? { ...(content || {}), teamMembers: structuredTeam }
    : content;
  const welcomeProjects = allProjects.slice(0, 10);

  return (
    <div className={styles.homePageFirstPaint}>
      <HomePageClient content={resolvedContent} featuredProjects={welcomeProjects} />
      <HomeWelcomeEnhancements content={resolvedContent} projects={welcomeProjects} />
      <HomeSectionVisibility controls={controls} content={resolvedContent} />
    </div>
  );
}
