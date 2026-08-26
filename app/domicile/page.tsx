import type { Metadata } from "next";
import DomicileEditorial from "./DomicileEditorial";
import DomicileCmsHydratorSafe from "./DomicileCmsHydratorSafe";
import ImvoReturnWidget from "./ImvoReturnWidget";
import { getDomicilePageContent, getFaqs, getSeoEntry } from "@/sanity/lib/cmsBackend";
import { mergeCmsMetadata } from "@/app/lib/cmsMetadata";
import type { SeoEntry } from "@/sanity/types/cmsBackend";
import "./direct-photo-fix.css";

export const revalidate = 300;

const fallbackMetadata: Metadata = {
  title: "DŌMICILE | Property Management",
  description:
    "DŌMICILE is property management by IMVO Group for owners who want one reliable point of contact for the ongoing care, maintenance and coordination of their property in Kigali, Rwanda.",
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
    title: "DŌMICILE | Your property, handled.",
    description:
      "Property management by IMVO Group. One reliable point of contact for the ongoing care, maintenance and coordination of your property.",
    siteName: "IMVO Group",
    locale: "en_RW",
    images: [
      {
        url: "/domicile/exact/estate-hero.png",
        alt: "DŌMICILE property management in Kigali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DŌMICILE | Your property, handled.",
    description:
      "Property management by IMVO Group for property owners in Kigali, Rwanda.",
    images: ["/domicile/exact/estate-hero.png"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const [content, routeSeo] = await Promise.all([
    getDomicilePageContent(),
    getSeoEntry("/domicile"),
  ]);

  const domicileSeo: SeoEntry | null = content
    ? {
        routePath: "/domicile",
        title: content.seoTitle,
        description: content.seoDescription,
        shareImage: content.shareImage,
        noIndex: content.noIndex,
      }
    : null;

  return mergeCmsMetadata(
    fallbackMetadata,
    routeSeo || domicileSeo,
    "https://www.imvogroup.com/domicile",
  );
}

export default async function DomicilePage() {
  const [content, faqs] = await Promise.all([
    getDomicilePageContent(),
    getFaqs("domicile"),
  ]);

  return (
    <>
      <DomicileEditorial />
      <DomicileCmsHydratorSafe content={content} faqs={faqs} />
      <ImvoReturnWidget />
    </>
  );
}
