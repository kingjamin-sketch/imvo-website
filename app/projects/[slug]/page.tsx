import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailClient from "./ProjectDetailClient";
import { getAllProjects } from "@/sanity/lib/projects";

export const revalidate = 300;

const siteUrl = "https://www.imvogroup.com";

function absoluteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  return `${siteUrl}${value.startsWith("/") ? value : `/${value}`}`;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getAllProjects();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `/projects/${project.slug}`;
  const description = project.summary;

  return {
    title: project.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${project.title} | IMVO Group`,
      description,
      images: [
        {
          url: project.cover,
          alt: `${project.title} — ${project.category} project by IMVO Group`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | IMVO Group`,
      description,
      images: [project.cover],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getAllProjects();
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  const projectUrl = `${siteUrl}/projects/${project.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${siteUrl}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: projectUrl,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `${projectUrl}#project`,
        url: projectUrl,
        name: project.title,
        headline: project.title,
        description: project.summary,
        image: absoluteUrl(project.cover),
        genre: project.category,
        dateCreated: project.year,
        locationCreated: {
          "@type": "Place",
          name: project.location,
        },
        creator: {
          "@type": "Organization",
          name: "IMVO Group",
          url: siteUrl,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <ProjectDetailClient project={project} allProjects={projects} />
    </>
  );
}
