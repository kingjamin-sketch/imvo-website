import ProjectsPageClient from "./ProjectsPageClient";
import { getAllProjects } from "@/sanity/lib/projects";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return <ProjectsPageClient projects={projects} />;
}