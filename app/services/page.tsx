import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";
import { getServicesPageContent } from "@/sanity/lib/siteContent";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore IMVO Group services in built-environment design, feasibility and development consultancy, and site coordination across Rwanda and East Africa.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "/services",
    title: "Built-Environment Services | IMVO Group",
    description:
      "Design, consultancy, feasibility, and site coordination for residential, commercial, institutional, and development projects.",
    images: [{ url: "/services-hero.png", alt: "IMVO Group built-environment services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Built-Environment Services | IMVO Group",
    description:
      "Design, consultancy, feasibility, and site coordination for projects across Rwanda and East Africa.",
    images: ["/services-hero.png"],
  },
};

export default async function ServicesPage() {
  const content = await getServicesPageContent();
  return <ServicesPageClient content={content} />;
}
