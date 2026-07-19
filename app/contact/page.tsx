import ContactPageClient from "./ContactPageClient";
import { getContactPageContent } from "@/sanity/lib/siteContent";

export default async function ContactPage() {
  const content = await getContactPageContent();
  return <ContactPageClient content={content} />;
}
