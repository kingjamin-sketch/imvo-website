import ServicesPageClient from "./ServicesPageClient";
import { getServicesPageContent } from "@/sanity/lib/siteContent";

export default async function ServicesPage() {
  const content = await getServicesPageContent();
  return <ServicesPageClient content={content} />;
}
