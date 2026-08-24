import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import { getAboutPageContent } from "@/sanity/lib/siteContent";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet IMVO Group, a Kigali-based built-environment design and development consultancy working across Rwanda and East Africa.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: "About IMVO Group",
    description:
      "A Kigali-based built-environment studio combining design, development consultancy, and site coordination.",
    images: [{ url: "/about-hero.png", alt: "IMVO Group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About IMVO Group",
    description:
      "A Kigali-based built-environment studio combining design, development consultancy, and site coordination.",
    images: ["/about-hero.png"],
  },
};

export default async function AboutPage() {
  const content = await getAboutPageContent();
  return <AboutPageClient content={content} />;
}
