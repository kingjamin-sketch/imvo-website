import type { Metadata } from "next";
import LegalContentPage from "@/app/components/LegalContentPage";
import { getLegalPageContent } from "@/sanity/lib/siteContent";
import { getSeoEntry } from "@/sanity/lib/cmsBackend";
import { mergeCmsMetadata } from "@/app/lib/cmsMetadata";

const fallbackMetadata: Metadata = {
  title: "Cookie Policy",
  description: "How cookies and similar technologies may be used on the IMVO Group website.",
  alternates: { canonical: "/cookies" },
};

export async function generateMetadata(): Promise<Metadata> {
  return mergeCmsMetadata(fallbackMetadata, await getSeoEntry("/cookies"), "/cookies");
}

const fallback = {
  kicker: "Legal",
  title: "Cookie Policy.",
  intro: "This Cookie Policy explains how IMVO Group may use cookies and similar technologies on our website.",
  sections: [
    { heading: "What Cookies Are", body: "Cookies are small files stored on your device to help websites function, remember preferences, improve performance, and understand visitor activity." },
    { heading: "Types of Cookies We Use", body: "The website may use essential technologies required for normal operation. Optional analytics are used only when analytics is enabled by IMVO and the visitor has accepted analytics through the privacy-preferences banner." },
    { heading: "Analytics", body: "When enabled and accepted, Google Analytics may collect general usage information such as page visits, device and browser information, and approximate geographic information. IMVO uses this information to understand website performance and improve the visitor experience." },
    { heading: "Your Choice", body: "You can choose Essential only or Accept analytics when the privacy-preferences banner appears. If analytics is not accepted, the analytics script is not loaded by the website." },
    { heading: "Third-Party Services", body: "Some third-party services used on this website, such as embedded maps or external links, may operate under their own privacy or cookie policies." },
    { heading: "Contact", body: "For cookie-related questions, contact us at info@imvogroup.com." },
  ],
  lastUpdated: "Last updated: 2026",
};

export default async function CookiesPage() {
  return <LegalContentPage content={await getLegalPageContent("cookies")} fallback={fallback} />;
}
