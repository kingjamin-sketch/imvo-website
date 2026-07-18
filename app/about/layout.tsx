import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About the Studio",
  description:
    "Meet IMVO Group, a Kigali-based architecture studio shaped by contextual design, technical discipline, and execution awareness.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "About IMVO Group",
    description:
      "A Kigali-based architecture studio serving Rwanda and selected East and Central African markets.",
    images: ["/about-hero.png"],
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
