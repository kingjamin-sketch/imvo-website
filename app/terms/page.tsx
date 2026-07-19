import LegalContentPage from "@/app/components/LegalContentPage";
import { getLegalPageContent } from "@/sanity/lib/siteContent";

const fallback = {
  kicker: "Legal",
  title: "Terms & Conditions.",
  intro: "By using this website, you agree to the following terms. The website is provided for general information about IMVO Group, our services, and our work.",
  sections: [
    { heading: "Website Content", body: "All text, imagery, layouts, project descriptions, graphics, and visual materials on this website are provided for informational and presentation purposes." },
    { heading: "No Professional Agreement", body: "Submitting an inquiry, sending an email, or using this website does not create a client relationship, consultancy agreement, professional appointment, or site-coordination agreement with IMVO Group." },
    { heading: "Project Services", body: "All design, consultancy, site coordination, planning, or development guidance services are subject to separate written agreements, scope definitions, timelines, fees, and professional terms. Where professional registration is legally required, statutory submissions, certifications, and professional sign-off are undertaken only by appropriately registered practitioners." },
    { heading: "Accuracy", body: "We aim to keep website information accurate and current, but we do not guarantee that all content is complete, error-free, or continuously updated." },
    { heading: "Intellectual Property", body: "Website content, visual identity, drawings, renders, layouts, and project materials remain the property of IMVO Group or their respective rights holders unless otherwise stated." },
    { heading: "External Links", body: "This website may contain links to third-party websites. IMVO Group is not responsible for the content, policies, or practices of external websites." },
    { heading: "Contact", body: "For questions about these terms, contact us at info@imvogroup.com." },
  ],
  lastUpdated: "Last updated: 2026",
};

export default async function TermsPage() {
  return <LegalContentPage content={await getLegalPageContent("terms")} fallback={fallback} />;
}
