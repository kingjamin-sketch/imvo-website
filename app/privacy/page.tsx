import LegalContentPage from "@/app/components/LegalContentPage";
import { getLegalPageContent } from "@/sanity/lib/siteContent";

const fallback = {
  kicker: "Legal",
  title: "Privacy Policy.",
  intro: "IMVO Group respects your privacy. This Privacy Policy explains how we collect, use, and protect information submitted through our website.",
  sections: [
    { heading: "Information We Collect", body: "We may collect information you voluntarily provide through inquiry forms, email, WhatsApp, or direct communication. This may include your name, email address, phone number, project location, project details, budget range, and requested services." },
    { heading: "How We Use Information", body: "We use submitted information to respond to inquiries, understand project requirements, prepare consultations, coordinate services, and improve our communication process." },
    { heading: "Form Submissions", body: "Website inquiry submissions may be processed through third-party form delivery tools for the purpose of sending your inquiry to our studio email." },
    { heading: "Analytics & Cookies", body: "We may use basic analytics tools to understand website traffic, performance, and visitor behavior. These tools may use cookies or similar technologies." },
    { heading: "Data Protection", body: "We take reasonable steps to protect information submitted through the website. However, no online transmission or storage method is fully secure." },
    { heading: "Contact", body: "For privacy-related questions, contact us at info@imvogroup.com." },
  ],
  lastUpdated: "Last updated: 2026",
};

export default async function PrivacyPage() {
  return <LegalContentPage content={await getLegalPageContent("privacy")} fallback={fallback} />;
}
