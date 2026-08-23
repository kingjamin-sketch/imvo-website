import ProjectDetailClient from "./ProjectDetailClient";
import { getAllProjects } from "@/sanity/lib/projects";

export const revalidate = 300;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getAllProjects();
  const project = projects.find((item) => item.slug === slug) || null;

  return <ProjectDetailClient project={project} allProjects={projects} />;
}