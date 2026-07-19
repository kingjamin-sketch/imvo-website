"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Project, ProjectCategory } from "./projectsData";

const FILTERS: Array<ProjectCategory | "All"> = ["All", "Residential", "Commercial", "Institutional", "Urban", "Hospitality"];
const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const };

export default function ProjectsMasonry({ projects: allProjects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory | "All">("All");

  const projects = useMemo(() => {
    if (active === "All") return allProjects;
    return allProjects.filter((project) => project.category === active);
  }, [active, allProjects]);

  return (
    <section className="mobilePad" style={{ paddingBottom: 96, paddingTop: 72, backgroundColor: "#050505", color: "white" }}>
      <div className="containerWide">
        <motion.div className="mobileStack" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={transition} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 30 }}>
          <div>
            <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.5)" }}>Archive</div>
            <h2 style={{ fontSize: "clamp(34px, 4vw, 54px)", fontWeight: 900, letterSpacing: "-0.04em", margin: "10px 0 0", color: "white" }}>Selected project studies.</h2>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {FILTERS.map((filter) => (
              <button key={filter} type="button" onClick={() => setActive(filter)} style={{ padding: "8px 16px", borderRadius: 99, border: "1px solid rgba(255,255,255,0.2)", background: active === filter ? "white" : "transparent", color: active === filter ? "black" : "white", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.3s ease" }}>
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mobileGrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))", gap: "50px 40px", marginTop: "60px" }}>
          {projects.map((project, index) => (
            <motion.article key={project.slug} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ ...transition, delay: (index % 2) * 0.1 }} style={{ display: "flex", flexDirection: "column" }}>
              <Link href={`/projects/${project.slug}`} style={{ overflow: "hidden", display: "block", position: "relative", width: "100%", aspectRatio: "16/9", background: "#111" }}>
                <motion.div initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={transition} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
                  <Image src={project.cover} alt={project.title} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover", transition: "transform 0.5s ease" }} />
                </motion.div>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "30px", color: "white", opacity: 0, transition: "opacity 0.4s ease" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}>
                  <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>View Project</div>
                </div>
              </Link>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "20px" }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em", color: "white" }}>{project.title}</h4>
                  <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,0.6)", fontSize: 15, fontWeight: 500 }}>{project.category} · {project.location}</p>
                </div>
                <Link href={`/projects/${project.slug}`} style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", textDecoration: "none", color: "white", borderBottom: "2px solid white", paddingBottom: "2px", marginTop: "6px", transition: "opacity 0.2s ease" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                  Details
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
