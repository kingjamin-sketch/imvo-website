import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Selected Built Environment Projects",
  description:
    "Explore selected IMVO Group residential, commercial, institutional, hospitality, and urban design work across Rwanda and East Africa.",
  alternates: { canonical: "/projects" },
  openGraph: {
    url: "/projects",
    title: "Selected Projects | IMVO Group",
    description:
      "Built environments developed through context, proportion, technical coordination, and execution-aware thinking.",
    images: ["/chosen/verdea-hotel.png"],
  },
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return children;
}
