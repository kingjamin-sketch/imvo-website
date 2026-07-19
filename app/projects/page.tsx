import ProjectsPageClient from "./ProjectsPageClient";
import { getAllProjects } from "@/sanity/lib/projects";

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return <ProjectsPageClient projects={projects} />;
}
