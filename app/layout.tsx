import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import IntroLoader from "./components/IntroLoader";

const siteUrl = "https://www.imvogroup.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "IMVO Group | Architecture, Consultancy & Supervision",
    template: "%s | IMVO Group",
  },
  description:
    "Kigali-based architecture studio delivering architectural design, feasibility consultancy, project supervision, and development guidance across Rwanda and East Africa.",
  applicationName: "IMVO Group",
  authors: [{ name: "IMVO Group", url: siteUrl }],
  creator: "IMVO Group",
  publisher: "IMVO Group",
  category: "Architecture",
  keywords: [
    "architecture Rwanda",
    "architect Kigali",
    "architectural design",
    "construction consultancy",
    "project supervision",
    "feasibility studies Rwanda",
    "East Africa architecture",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_RW",
    url: siteUrl,
    siteName: "IMVO Group",
    title: "IMVO Group | Architecture, Consultancy & Supervision",
    description:
      "Design, strategy, and execution for enduring environments across Rwanda and East Africa.",
    images: [
      {
        url: "/about-hero.png",
        alt: "IMVO Group architecture and design studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IMVO Group | Architecture, Consultancy & Supervision",
    description:
      "Design, strategy, and execution for enduring environments across Rwanda and East Africa.",
    images: ["/about-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "IMVO Group",
      alternateName: "IMVO Design Group",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
      name: "IMVO Group",
      url: `${siteUrl}/`,
      logo: `${siteUrl}/imvo-black.png`,
      image: `${siteUrl}/about-hero.png`,
      description:
        "Architecture, consultancy, supervision, and development guidance from Kigali, Rwanda.",
      areaServed: [
        "Rwanda",
        "Uganda",
        "Kenya",
        "Tanzania",
        "Burundi",
        "Democratic Republic of the Congo",
        "Zambia",
        "Angola",
        "Mozambique",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kigali",
        addressCountry: "RW",
      },
      sameAs: [
        "https://www.linkedin.com/company/imvo-design-group",
        "https://www.instagram.com/imvo_group/",
        "https://x.com/Imvogroupafrica",
        "https://www.facebook.com/people/IMVO-GROUP-Africa/100087615605183/",
        "https://www.youtube.com/@Imvogroupafrica",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#050505",
          color: "white",
        }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <SmoothScrollProvider>
          <IntroLoader />

          <SiteHeader />

          <main>{children}</main>

          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
