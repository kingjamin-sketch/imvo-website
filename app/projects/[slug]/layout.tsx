import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getProjectBySlug } from "@/sanity/lib/projects";

type ProjectLayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Omit<ProjectLayoutProps, "children">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: true },
    };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      title: project.title,
      description: project.summary,
      images: [{ url: project.cover, alt: project.title }],
    },
  };
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  return children;
}
