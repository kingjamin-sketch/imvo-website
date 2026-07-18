import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Design, Development & Project Consultancy Services",
  description:
    "Explore IMVO Group services across built-environment design, feasibility and development consultancy, site coordination, and project delivery support.",
  alternates: { canonical: "/services" },
  openGraph: {
    url: "/services",
    title: "IMVO Group Services",
    description:
      "Built-environment design, consultancy, site coordination, and development guidance from vision to execution.",
    images: ["/services-hero.png"],
  },
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children;
}
