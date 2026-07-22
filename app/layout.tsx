import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import ImageCopyProtection from "./components/ImageCopyProtection";
import SiteShell from "./components/SiteShell";
import { getSiteSettings } from "@/sanity/lib/siteContent";

const siteUrl = "https://www.imvogroup.com";

const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "IMVO Group | Built Environment Design & Development",
    template: "%s | IMVO Group",
  },
  description:
    "A Kigali-based built-environment design and development consultancy supporting spatial design, feasibility, site coordination, and project direction across Rwanda and East Africa.",
  applicationName: "IMVO Group",
  authors: [{ name: "IMVO Group", url: siteUrl }],
  creator: "IMVO Group",
  publisher: "IMVO Group",
  category: "Built Environment Design & Development",
  keywords: [
    "built environment design Rwanda",
    "spatial design Kigali",
    "development consultancy Rwanda",
    "construction coordination",
    "project delivery support",
    "feasibility studies Rwanda",
    "East Africa built environment",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_RW",
    url: siteUrl,
    siteName: "IMVO Group",
    title: "IMVO Group | Built Environment Design & Development",
    description:
      "Design, strategy, and execution for enduring environments across Rwanda and East Africa.",
    images: [
      {
        url: "/about-hero.png",
        alt: "IMVO Group built-environment design and development consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IMVO Group | Built Environment Design & Development",
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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.seoTitle || "IMVO Group | Built Environment Design & Development";
  const description = settings?.seoDescription || defaultMetadata.description;
  const shareImage = settings?.shareImage?.url || "/about-hero.png";

  return {
    ...defaultMetadata,
    title: {
      default: title,
      template: `%s | ${settings?.companyName || "IMVO Group"}`,
    },
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description: typeof description === "string" ? description : undefined,
      images: [{ url: shareImage, alt: settings?.shareImage?.alt || "IMVO Group" }],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description: typeof description === "string" ? description : undefined,
      images: [shareImage],
    },
  };
}

const structuredData = (settings: Awaited<ReturnType<typeof getSiteSettings>>) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: settings?.companyName || "IMVO Group",
      alternateName: "IMVO Design Group",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
      name: settings?.companyName || "IMVO Group",
      url: `${siteUrl}/`,
      logo: `${siteUrl}/imvo-black.png`,
      image: `${siteUrl}/about-hero.png`,
      description:
        settings?.tagline || "A built-environment design and development consultancy based in Kigali, Rwanda.",
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
      sameAs: settings?.socialLinks?.map((item) => item.url).filter(Boolean) || [
        "https://www.linkedin.com/company/imvo-design-group",
        "https://www.instagram.com/imvo_group/",
        "https://x.com/Imvogroupafrica",
        "https://www.facebook.com/people/IMVO-GROUP-Africa/100087615605183/",
        "https://www.youtube.com/@Imvogroupafrica",
      ],
    },
  ],
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const settings = await getSiteSettings();

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
            __html: JSON.stringify(structuredData(settings)).replace(/</g, "\\u003c"),
          }}
        />
        <ImageCopyProtection />
        <SiteShell settings={settings}>{children}</SiteShell>
      </body>
    </html>
  );
}
