import ProjectsPageClient from "./ProjectsPageClient";
import styles from "./projects-lcp.module.css";
import { getAllProjects } from "@/sanity/lib/projects";

export const revalidate = 300;

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className={styles.projectsPageFirstPaint}>
      <ProjectsPageClient projects={projects} />
    </div>
  );
}
