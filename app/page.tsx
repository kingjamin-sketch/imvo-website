import HomePageClient from "./HomePageClient";
import { getHomePageContent } from "@/sanity/lib/siteContent";

export default async function HomePage() {
  const content = await getHomePageContent();
  return <HomePageClient content={content} />;
}
