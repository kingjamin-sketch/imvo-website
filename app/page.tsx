import HomePageClient from "./HomePageClient";
import styles from "./home-lcp.module.css";
import { getHomePageContent } from "@/sanity/lib/siteContent";
import { getFeaturedProjects } from "@/sanity/lib/projects";

export const revalidate = 300;

export default async function HomePage() {
  const [content, featuredProjects] = await Promise.all([
    getHomePageContent(),
    getFeaturedProjects(3),
  ]);

  return (
    <div className={styles.homePageFirstPaint}>
      <HomePageClient content={content} featuredProjects={featuredProjects} />
    </div>
  );
}
