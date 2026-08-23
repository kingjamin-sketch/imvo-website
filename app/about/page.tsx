import AboutPageClient from "./AboutPageClient";
import { getAboutPageContent } from "@/sanity/lib/siteContent";

export const revalidate = 300;

export default async function AboutPage() {
  const content = await getAboutPageContent();
  return <AboutPageClient content={content} />;
}