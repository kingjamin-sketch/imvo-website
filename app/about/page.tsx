import AboutPageClient from "./AboutPageClient";
import { getAboutPageContent } from "@/sanity/lib/siteContent";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const content = await getAboutPageContent();
  return <AboutPageClient content={content} />;
}