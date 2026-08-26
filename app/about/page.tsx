import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import AboutTestimonialsController from "./AboutTestimonialsController";
import { getAboutPageContent } from "@/sanity/lib/siteContent";
import { getSeoEntry, getTeamMembers } from "@/sanity/lib/cmsBackend";
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
  const [content, structuredTeam] = await Promise.all([
    getAboutPageContent(),
    getTeamMembers(),
  ]);

  const testimonials = (content?.testimonials || [])
    .map((item, index) => ({ ...item, __index: index }))
    .filter((item) => item.active !== false)
    .sort((a, b) => {
      const featuredDelta = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      if (featuredDelta) return featuredDelta;
      const orderDelta = (a.order ?? 100) - (b.order ?? 100);
      return orderDelta || a.__index - b.__index;
    })
    .map((item) => ({
      text: item.text,
      author: item.author,
      date: [item.role, item.company, item.source || item.date]
        .filter(Boolean)
        .join(" · "),
    }));

  // AboutPageClient has a historical hard-coded fallback when its testimonials
  // array is empty. Supply one blank item only in the zero-review state so
  // those legacy quotes never reappear in rendered HTML; the controller then
  // hides the entire Client Perspectives section.
  const renderedTestimonials = testimonials.length
    ? testimonials
    : [{ text: "", author: "", date: "" }];

  const resolvedContent: AboutPageContent = {
    ...(content || {}),
    teamMembers: structuredTeam.length ? structuredTeam : content?.teamMembers,
    testimonials: renderedTestimonials,
  };

  return (
    <>
      <AboutPageClient content={resolvedContent} />
      <AboutTestimonialsController hasTestimonials={testimonials.length > 0} />
    </>
  );
}
