import type { Metadata } from "next";
import DomicileCmsBridge from "./DomicileCmsBridge";
import DomicileEditorial from "./DomicileEditorial";
import DomicileFormAccessibility from "./DomicileFormAccessibility";
import ImvoReturnWidget from "./ImvoReturnWidget";
import { getDomicilePageContent } from "@/sanity/lib/siteContent";
import "./direct-photo-fix.css";

export const revalidate = 300;

const defaultDescription =
  "DŌMICILE is property management by IMVO Group for owners who want one reliable point of contact for the ongoing care, maintenance and coordination of their property in Kigali, Rwanda.";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getDomicilePageContent();
  const title = content?.seoTitle || "DŌMICILE | Property Management";
  const description = content?.seoDescription || defaultDescription;
  const shareImage = content?.shareImage?.url || "/domicile/exact/estate-hero.png";

  return {
    title,
    description,
    category: "Property Management",
    keywords: [
      "property management Kigali",
      "property management Rwanda",
      "property care Kigali",
      "property maintenance Kigali",
      "property inspection Kigali",
      "diaspora property management Rwanda",
      "DŌMICILE",
      "Domicile by IMVO Group",
    ],
    alternates: {
      canonical: "https://www.imvogroup.com/domicile",
    },
    openGraph: {
      type: "website",
      url: "https://www.imvogroup.com/domicile",
      title,
      description,
      siteName: "IMVO Group",
      locale: "en_RW",
      images: [
        {
          url: shareImage,
          alt: content?.shareImage?.alt || "DŌMICILE property management in Kigali",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}

export default async function DomicilePage() {
  const content = await getDomicilePageContent();

  return (
    <>
      <DomicileEditorial />
      <DomicileCmsBridge content={content} />
      <DomicileFormAccessibility />
      <ImvoReturnWidget />
    </>
  );
}
