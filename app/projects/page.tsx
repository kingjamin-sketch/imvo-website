import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";
import { getAllProjects } from "@/sanity/lib/projects";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore selected IMVO Group residential, commercial, hospitality, institutional, and urban projects across Rwanda and East Africa.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: "/projects",
    title: "Projects | IMVO Group",
    description:
      "Selected built-environment work by IMVO Group across design, development consultancy, and site coordination.",
    images: [{ url: "/chosen/urban-villa.png", alt: "Selected IMVO Group project" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | IMVO Group",
    description:
      "Selected built-environment work by IMVO Group across Rwanda and East Africa.",
    images: ["/chosen/urban-villa.png"],
  },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return <ProjectsPageClient projects={projects} />;
}
