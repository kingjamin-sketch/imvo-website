import type { Metadata } from "next";
import LegalContentPage from "@/app/components/LegalContentPage";
import { getLegalPageContent } from "@/sanity/lib/siteContent";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How cookies and similar technologies may be used on the IMVO Group website.",
  alternates: { canonical: "/cookies" },
};

const fallback = {
  kicker: "Legal",
  title: "Cookie Policy.",
  intro: "This Cookie Policy explains how IMVO Group may use cookies and similar technologies on our website.",
  sections: [
    { heading: "What Cookies Are", body: "Cookies are small files stored on your device to help websites function, remember preferences, improve performance, and understand visitor activity." },
    { heading: "Types of Cookies We May Use", body: "We may use essential cookies for website functionality, performance cookies to improve the browsing experience, and analytics cookies to understand how visitors interact with the website." },
    { heading: "Analytics", body: "If analytics tools are enabled, they may collect general information such as page visits, device type, browser type, and approximate location. This helps us improve the website and user experience." },
    { heading: "Managing Cookies", body: "You can control or disable cookies through your browser settings. Some website features may not function as intended if cookies are disabled." },
    { heading: "Third-Party Services", body: "Some services used on this website, such as embedded maps, analytics tools, or form delivery providers, may use their own cookies or tracking technologies." },
    { heading: "Contact", body: "For cookie-related questions, contact us at info@imvogroup.com." },
  ],
  lastUpdated: "Last updated: 2026",
};

export default async function CookiesPage() {
  return <LegalContentPage content={await getLegalPageContent("cookies")} fallback={fallback} />;
}
