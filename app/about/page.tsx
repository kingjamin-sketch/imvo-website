import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import AboutTestimonialsController from "./AboutTestimonialsController";
import { getAboutPageContent } from "@/sanity/lib/siteContent";
import { getSeoEntry, getTeamMembers, getTestimonials } from "@/sanity/lib/cmsBackend";
import { mergeCmsMetadata } from "@/app/lib/cmsMetadata";
import type { AboutPageContent } from "@/sanity/types/siteContent";

export const revalidate = 300;

const fallbackMetadata: Metadata = {
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

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoEntry("/about");
  return mergeCmsMetadata(fallbackMetadata, seo, "/about");
}

export default async function AboutPage() {
  const [content, structuredTeam, structuredTestimonials] = await Promise.all([
    getAboutPageContent(),
    getTeamMembers(),
    getTestimonials(),
  ]);

  const testimonials = structuredTestimonials.map((item) => ({
    text: item.quote,
    author: item.author,
    date: [item.role, item.company, item.source || item.date]
      .filter(Boolean)
      .join(" · "),
  }));

  const resolvedContent: AboutPageContent = {
    ...(content || {}),
    teamMembers: structuredTeam.length ? structuredTeam : content?.teamMembers,
    testimonials,
  };

  return (
    <>
      <AboutPageClient content={resolvedContent} />
      <AboutTestimonialsController hasTestimonials={testimonials.length > 0} />
    </>
  );
}
