"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Project, ProjectCategory } from "./projectsData";

const FILTERS: Array<ProjectCategory | "All"> = [
  "All",
  "Residential",
  "Commercial",
  "Institutional",
  "Urban",
  "Hospitality",
];

const transition = {
  duration: 1,
  ease: [0.16, 1, 0.3, 1] as const,
};

export default function ProjectsMasonry({
  projects: allProjects,
}: {
  projects: Project[];
}) {
  const [active, setActive] = useState<ProjectCategory | "All">("All");

  const projects = useMemo(() => {
    if (active === "All") return allProjects;
    return allProjects.filter((project) => project.category === active);
  }, [active, allProjects]);

  return (
    <section className="projects-index-section mobilePad">
      <style>{`
        .projects-index-section {
          padding: 82px 0 110px;
          background: #050505;
          color: #fff;
        }

        .projects-index-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 36px;
          align-items: end;
          padding-bottom: 34px;
          border-bottom: 1px solid rgba(255,255,255,0.14);
        }

        .projects-index-kicker {
          color: rgba(255,255,255,0.44);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .projects-index-heading {
          max-width: 760px;
          margin: 14px 0 0;
          font-size: clamp(42px, 5.4vw, 78px);
          font-weight: 900;
          letter-spacing: -0.065em;
          line-height: 0.96;
        }

        .projects-index-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 8px;
          max-width: 620px;
        }

        .projects-index-filter {
          min-height: 38px;
          padding: 0 15px;
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 2px;
          background: transparent;
          color: rgba(255,255,255,0.72);
          cursor: pointer;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          transition: background 220ms ease, color 220ms ease, border-color 220ms ease;
        }

        .projects-index-filter:hover,
        .projects-index-filter.is-active {
          border-color: #fff;
          background: #fff;
          color: #050505;
        }

        .projects-index-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1px;
          width: 100%;
          margin-top: 48px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.12);
        }

        .projects-index-card {
          display: grid;
          grid-template-columns: minmax(0, 1.04fr) minmax(0, 0.96fr);
          width: 100%;
          min-height: clamp(330px, 24vw, 410px);
          background: #090909;
          overflow: hidden;
        }

        .projects-index-card--reverse {
          grid-template-columns: minmax(0, 0.96fr) minmax(0, 1.04fr);
        }

        .projects-index-card--reverse .projects-index-info {
          order: 1;
        }

        .projects-index-card--reverse .projects-index-media {
          order: 2;
        }

        .projects-index-media {
          position: relative;
          display: block;
          min-height: 100%;
          overflow: hidden;
          background: #111;
        }

        .projects-index-media img {
          filter: grayscale(100%) brightness(0.78) contrast(1.04);
          transition: transform 900ms cubic-bezier(0.16,1,0.3,1), filter 600ms ease;
        }

        .projects-index-card:hover .projects-index-media img {
          transform: scale(1.035);
          filter: grayscale(0%) brightness(0.88) contrast(1.03);
        }

        .projects-index-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.34), transparent 56%);
          pointer-events: none;
        }

        .projects-index-info {
          position: relative;
          min-width: 0;
          padding: clamp(24px, 2.4vw, 38px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #0b0b0b;
          transition: background 280ms ease;
        }

        .projects-index-card:hover .projects-index-info {
          background: #111;
        }

        .projects-index-number {
          color: rgba(255,255,255,0.88);
          font-size: clamp(48px, 4.4vw, 74px);
          font-weight: 300;
          letter-spacing: -0.08em;
          line-height: 0.9;
        }

        .projects-index-meta {
          margin-top: 20px;
          color: rgba(255,255,255,0.42);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.12em;
          line-height: 1.5;
          text-transform: uppercase;
        }

        .projects-index-title {
          max-width: 440px;
          margin: 11px 0 0;
          color: #fff;
          font-size: clamp(21px, 2vw, 32px);
          font-weight: 850;
          letter-spacing: -0.045em;
          line-height: 1.02;
        }

        .projects-index-summary {
          display: -webkit-box;
          max-width: 460px;
          margin: 14px 0 0;
          overflow: hidden;
          color: rgba(255,255,255,0.58);
          font-size: 12px;
          line-height: 1.65;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }

        .projects-index-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          text-decoration: none;
          font-size: 10px;
          font-weight: 850;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .projects-index-link span:last-child {
          font-size: 16px;
          transition: transform 260ms cubic-bezier(0.16,1,0.3,1);
        }

        .projects-index-card:hover .projects-index-link span:last-child {
          transform: translate(4px, -3px);
        }

        @media (max-width: 1180px) {
          .projects-index-header {
            grid-template-columns: 1fr;
            align-items: start;
          }

          .projects-index-filters {
            justify-content: flex-start;
            max-width: none;
          }

          .projects-index-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .projects-index-card,
          .projects-index-card--reverse {
            grid-template-columns: minmax(0, 1.12fr) minmax(300px, 0.88fr);
            min-height: 420px;
          }
        }

        @media (max-width: 700px) {
          .projects-index-section {
            padding: 64px 0 82px;
          }

          .projects-index-header {
            padding-bottom: 26px;
          }

          .projects-index-grid {
            margin-top: 32px;
          }

          .projects-index-card,
          .projects-index-card--reverse {
            grid-template-columns: minmax(0, 1fr);
            min-height: 0;
          }

          .projects-index-card--reverse .projects-index-media {
            order: 0;
          }

          .projects-index-card--reverse .projects-index-info {
            order: 1;
          }

          .projects-index-media {
            min-height: 0;
            aspect-ratio: 16 / 10;
          }

          .projects-index-info {
            min-height: 270px;
            padding: 22px 20px 24px;
          }

          .projects-index-number {
            font-size: 48px;
          }
        }
      `}</style>

      <div className="containerWide">
        <motion.header
          className="projects-index-header"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          <div>
            <div className="projects-index-kicker">Project Index</div>
            <h2 className="projects-index-heading">Selected work, indexed.</h2>
          </div>

          <div className="projects-index-filters" aria-label="Project categories">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`projects-index-filter${active === filter ? " is-active" : ""}`}
                onClick={() => setActive(filter)}
                aria-pressed={active === filter}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.header>

        <div className="projects-index-grid">
          {projects.map((project, index) => {
            const number = String(index + 1).padStart(2, "0");
            const reverse = index % 4 === 1 || index % 4 === 2;

            return (
              <motion.article
                key={project.slug}
                className={`projects-index-card${reverse ? " projects-index-card--reverse" : ""}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...transition, delay: (index % 4) * 0.06 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="projects-index-media imvo-public-watermark"
                  aria-label={`View ${project.title}`}
                >
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1180px) 60vw, 27vw"
                    style={{ objectFit: "cover" }}
                  />
                </Link>

                <div className="projects-index-info">
                  <div>
                    <div className="projects-index-number">{number}</div>
                    <div className="projects-index-meta">
                      {project.category} · {project.location} · {project.year}
                    </div>
                    <h3 className="projects-index-title">{project.title}</h3>
                    <p className="projects-index-summary">{project.summary}</p>
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="projects-index-link"
                    aria-label={`Open ${project.title}`}
                  >
                    <span>View project</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
