import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact & Project Inquiry",
  description:
    "Contact IMVO Group in Kigali to discuss architectural design, feasibility, consultancy, supervision, or a new development opportunity.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "/contact",
    title: "Start a Project Conversation with IMVO",
    description:
      "Share your location, project type, timeline, and priorities with the IMVO Group team.",
    images: ["/contact-hero.png"],
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
