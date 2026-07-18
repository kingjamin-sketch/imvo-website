import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Architecture, Consultancy & Supervision Services",
  description:
    "Explore IMVO Group services across architectural design, feasibility and development consultancy, site supervision, and coordinated project delivery.",
  alternates: { canonical: "/services" },
  openGraph: {
    url: "/services",
    title: "IMVO Group Services",
    description:
      "Architectural design, consultancy, supervision, and development guidance from vision to execution.",
    images: ["/services-hero.webp"],
  },
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children;
}
