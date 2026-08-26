import type { Metadata } from "next";
import LegalContentPage from "@/app/components/LegalContentPage";
import { getLegalPageContent } from "@/sanity/lib/siteContent";
import { getSeoEntry } from "@/sanity/lib/cmsBackend";
import { mergeCmsMetadata } from "@/app/lib/cmsMetadata";

const fallbackMetadata: Metadata = {
  title: "Privacy Policy",
  description: "How IMVO Group collects, uses, and protects information submitted through imvogroup.com.",
  alternates: { canonical: "/privacy" },
};

export async function generateMetadata(): Promise<Metadata> {
  return mergeCmsMetadata(fallbackMetadata, await getSeoEntry("/privacy"), "/privacy");
}

const fallback = {
  kicker: "Legal",
  title: "Privacy Policy.",
  intro: "IMVO Group respects your privacy. This Privacy Policy explains how we collect, use, and protect information submitted through our website.",
  sections: [
    { heading: "Information We Collect", body: "We may collect information you voluntarily provide through inquiry forms, email, WhatsApp, or direct communication. This may include your name, email address, phone number, project location, project details, budget range, and requested services." },
    { heading: "How We Use Information", body: "We use submitted information to respond to inquiries, understand project requirements, prepare consultations, coordinate services, and improve our communication process." },
    { heading: "Form Submissions", body: "Website inquiry submissions may be processed through third-party form delivery tools for the purpose of sending your inquiry to our studio email." },
    { heading: "Analytics & Cookies", body: "Optional analytics are loaded only after a visitor accepts analytics in the website privacy preferences. Essential website functionality remains available without analytics consent." },
    { heading: "Data Protection", body: "We take reasonable steps to protect information submitted through the website. However, no online transmission or storage method is fully secure." },
    { heading: "Contact", body: "For privacy-related questions, contact us at info@imvogroup.com." },
  ],
  lastUpdated: "Last updated: 2026",
};

export default async function PrivacyPage() {
  return <LegalContentPage content={await getLegalPageContent("privacy")} fallback={fallback} />;
}
