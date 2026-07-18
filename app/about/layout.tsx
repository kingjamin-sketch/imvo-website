import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About the Studio",
  description:
    "Meet IMVO Group, a Kigali-based built-environment design and development consultancy shaped by contextual thinking, technical discipline, and execution awareness.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "About IMVO Group",
    description:
      "A Kigali-based built-environment design and development consultancy serving Rwanda and selected East and Central African markets.",
    images: ["/about-hero.png"],
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
