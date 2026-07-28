"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RollingText from "../components/RollingText";
import type { Project, ProjectCategory } from "./projectsData";

const FILTERS: Array<ProjectCategory | "All"> = [
  "All",
  "Residential",
  "Commercial",
  "Institutional",
  "Urban",
  "Hospitality",
];

const transition = { duration: 1.05, ease: [0.16, 1, 0.3, 1] as const };

export default function ProjectsMasonry({ projects: allProjects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory | "All">("All");

  const projects = useMemo(() => {
    if (active === "All") return allProjects;
    return allProjects.filter((project) => project.category === active);
  }, [active, allProjects]);

  const counts = useMemo(() => {
    return FILTERS.reduce<Record<string, number>>((result, filter) => {
      result[filter] =
        filter === "All"
          ? allProjects.length
          : allProjects.filter((project) => project.category === filter).length;
      return result;
    }, {});
  }, [allProjects]);

  return (
    <section
      className="mobilePad"
      style={{
        paddingBottom: 110,
        paddingTop: 72,
        backgroundColor: "#050505",
        color: "white",
      }}
    >
      <div className="containerWide">
        <div className="imvo-project-archive-layout">
          <aside className="imvo-project-filter-panel">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
            >
              <div
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.13em",
                  fontSize: 11,
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.42)",
                }}
              >
                Project archive
              </div>

              <h2
                style={{
                  fontSize: "clamp(38px, 4.6vw, 64px)",
                  fontWeight: 900,
                  letterSpacing: "-0.055em",
                  lineHeight: 0.96,
                  margin: "18px 0 0",
                  color: "white",
                }}
              >
                Selected
                <br />
                project studies.
              </h2>

              <p
                style={{
                  margin: "24px 0 0",
                  maxWidth: 360,
                  color: "rgba(255,255,255,0.58)",
                  fontSize: 15,
                  lineHeight: 1.75,
                }}
              >
                Filter the studio archive by project type while the work remains the main focus.
              </p>
            </motion.div>

            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.12 }}
              className="imvo-project-filter-list"
              aria-label="Filter projects by category"
            >
              {FILTERS.map((filter, index) => {
                const isActive = active === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActive(filter)}
                    className={`imvo-project-filter-button ${isActive ? "is-active" : ""}`}
                    aria-pressed={isActive}
                  >
                    <span className="imvo-project-filter-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="imvo-project-filter-name">{filter}</span>
                    <span className="imvo-project-filter-count">
                      {String(counts[filter] || 0).padStart(2, "0")}
                    </span>
                    {isActive ? (
                      <motion.span
                        layoutId="imvo-project-filter-line"
                        className="imvo-project-filter-line"
                        transition={transition}
                      />
                    ) : null}
                  </button>
                );
              })}
            </motion.nav>
          </aside>

          <div className="imvo-project-results">
            <div className="imvo-project-results-topline">
              <span>{active === "All" ? "All disciplines" : active}</span>
              <span>
                {String(projects.length).padStart(2, "0")} project{projects.length === 1 ? "" : "s"}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={transition}
                className="imvo-project-grid"
              >
                {projects.map((project, index) => (
                  <motion.article
                    key={project.slug}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ ...transition, delay: (index % 2) * 0.08 }}
                    className="imvo-project-card"
                    layout
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="imvo-public-watermark imvo-project-card-media"
                    >
                      <motion.div
                        initial={{ scale: 1.055 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={transition}
                        className="imvo-project-card-image"
                      >
                        <Image
                          src={project.cover}
                          alt={project.title}
                          fill
                          sizes="(max-width: 900px) 100vw, 52vw"
                          style={{ objectFit: "cover" }}
                        />
                      </motion.div>

                      <div className="imvo-project-card-overlay">
                        <span>View project</span>
                      </div>
                    </Link>

                    <div className="imvo-project-card-meta">
                      <div>
                        <h3>{project.title}</h3>
                        <p>
                          {project.category} · {project.location}
                        </p>
                      </div>

                      <motion.span initial="initial" whileHover="hover">
                        <Link href={`/projects/${project.slug}`} className="imvo-project-detail-link">
                          <RollingText text="Details ↗" />
                        </Link>
                      </motion.span>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .imvo-project-archive-layout {
          display: grid;
          grid-template-columns: minmax(250px, 0.56fr) minmax(0, 1.44fr);
          gap: clamp(42px, 6vw, 92px);
          align-items: start;
        }

        .imvo-project-filter-panel {
          position: sticky;
          top: 110px;
          align-self: start;
        }

        .imvo-project-filter-list {
          display: flex;
          flex-direction: column;
          margin-top: 54px;
          border-top: 1px solid rgba(255,255,255,0.12);
        }

        .imvo-project-filter-button {
          position: relative;
          display: grid;
          grid-template-columns: 36px 1fr auto;
          gap: 12px;
          align-items: center;
          width: 100%;
          padding: 16px 0;
          border: 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(255,255,255,0.44);
          text-align: left;
          cursor: pointer;
          transition: color 300ms ease, padding-left 300ms ease;
        }

        .imvo-project-filter-button:hover,
        .imvo-project-filter-button.is-active {
          color: white;
          padding-left: 7px;
        }

        .imvo-project-filter-index,
        .imvo-project-filter-count {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .imvo-project-filter-index {
          color: rgba(255,255,255,0.28);
        }

        .imvo-project-filter-name {
          font-size: 17px;
          font-weight: 750;
          letter-spacing: -0.025em;
        }

        .imvo-project-filter-count {
          color: rgba(255,255,255,0.32);
        }

        .imvo-project-filter-line {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          height: 1px;
          background: white;
        }

        .imvo-project-results-topline {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding-bottom: 17px;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.45);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .imvo-project-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 52px 34px;
          margin-top: 34px;
        }

        .imvo-project-card {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .imvo-project-card:nth-child(4n + 2),
        .imvo-project-card:nth-child(4n + 3) {
          margin-top: 54px;
        }

        .imvo-project-card-media {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #111;
        }

        .imvo-project-card-image {
          position: absolute;
          inset: 0;
          filter: grayscale(32%) brightness(0.86);
          transition: filter 800ms cubic-bezier(0.16,1,0.3,1), transform 1000ms cubic-bezier(0.16,1,0.3,1);
        }

        .imvo-project-card-media:hover .imvo-project-card-image {
          filter: grayscale(0%) brightness(0.96);
          transform: scale(1.025);
        }

        .imvo-project-card-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          padding: 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.72), transparent 48%);
          color: white;
          opacity: 0;
          transition: opacity 420ms ease;
        }

        .imvo-project-card-media:hover .imvo-project-card-overlay {
          opacity: 1;
        }

        .imvo-project-card-overlay span {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .imvo-project-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 22px;
          margin-top: 20px;
        }

        .imvo-project-card-meta h3 {
          margin: 0;
          color: white;
          font-size: clamp(19px, 2vw, 24px);
          font-weight: 900;
          letter-spacing: -0.035em;
        }

        .imvo-project-card-meta p {
          margin: 7px 0 0;
          color: rgba(255,255,255,0.52);
          font-size: 14px;
          font-weight: 550;
          line-height: 1.45;
        }

        .imvo-project-detail-link {
          display: inline-flex;
          margin-top: 4px;
          color: white;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.7);
          padding-bottom: 4px;
        }

        @media (max-width: 980px) {
          .imvo-project-archive-layout {
            grid-template-columns: 1fr;
          }

          .imvo-project-filter-panel {
            position: sticky;
            top: 72px;
            z-index: 15;
            margin: 0 -24px;
            padding: 22px 24px 0;
            background: rgba(5,5,5,0.94);
            backdrop-filter: blur(18px);
          }

          .imvo-project-filter-panel > div:first-child {
            display: none;
          }

          .imvo-project-filter-list {
            flex-direction: row;
            gap: 24px;
            margin-top: 0;
            padding-bottom: 2px;
            overflow-x: auto;
            border-top: 0;
            scrollbar-width: none;
          }

          .imvo-project-filter-list::-webkit-scrollbar {
            display: none;
          }

          .imvo-project-filter-button {
            display: flex;
            flex: 0 0 auto;
            width: auto;
            gap: 8px;
            padding: 13px 0 15px;
            border-bottom: 0;
          }

          .imvo-project-filter-button:hover,
          .imvo-project-filter-button.is-active {
            padding-left: 0;
          }

          .imvo-project-filter-index,
          .imvo-project-filter-count {
            display: none;
          }
        }

        @media (max-width: 720px) {
          .imvo-project-grid {
            grid-template-columns: 1fr;
            gap: 42px;
          }

          .imvo-project-card:nth-child(4n + 2),
          .imvo-project-card:nth-child(4n + 3) {
            margin-top: 0;
          }

          .imvo-project-card-overlay {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .imvo-project-card-image,
          .imvo-project-filter-button {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
