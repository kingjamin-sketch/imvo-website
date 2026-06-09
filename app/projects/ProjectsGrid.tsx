"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import ProjectLightbox from "./ProjectLightbox";
import { PROJECTS, type Project } from "./projectsData";

const FILTERS: Array<Project["category"] | "All"> = [
  "All",
  "Residential",
  "Commercial",
  "Institutional",
  "Urban",
  "Hospitality",
];

export default function ProjectsGrid() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{
    title: string;
    images: string[];
    startIndex: number;
  } | null>(null);

  const list = useMemo(() => {
    if (active === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === active);
  }, [active]);

  return (
    <>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`pill ${active === f ? "pillActive" : ""}`}
            onClick={() => setActive(f)}
            type="button"
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid3" style={{ marginTop: 18 }}>
        {list.map((p) => (
          <article key={p.slug} className="card projectCard" style={{ overflow: "hidden" }}>
            <button
              type="button"
              onClick={() => {
                setLightbox({ title: p.title, images: p.images, startIndex: 0 });
                setOpen(true);
              }}
              style={{
                padding: 0,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
              }}
              aria-label={`Open gallery for ${p.title}`}
            >
              <div className="projectMedia">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <div className="projectOverlay">
                  <div className="projectMeta">
                    <div className="projectTitle">{p.title}</div>
                    <div className="projectSub">
                      {p.category} · {p.location} · {p.year}
                    </div>
                    <div className="projectHint">Click to open gallery</div>
                  </div>
                </div>
              </div>
            </button>

            <div
              style={{
                padding: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 900,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.title}
                </div>
                <div style={{ opacity: 0.65, fontSize: 13, marginTop: 4 }}>
                  {p.category} · {p.year}
                </div>
              </div>

              <Link href={`/projects/${p.slug}`} className="btn" style={{ padding: "10px 12px" }}>
                Details
              </Link>
            </div>
          </article>
        ))}
      </div>

      <ProjectLightbox
        open={open}
        onClose={() => setOpen(false)}
        title={lightbox?.title || "Project"}
        images={lightbox?.images || []}
        startIndex={lightbox?.startIndex || 0}
      />
    </>
  );
}