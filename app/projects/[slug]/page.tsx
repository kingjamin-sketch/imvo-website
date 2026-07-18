"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { PROJECTS } from "../projectsData";

const transition = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const };

type ProjectSpecIcon =
  | "status"
  | "scope"
  | "area"
  | "bedrooms"
  | "bathrooms"
  | "year";

const galleryLayouts = ["wide", "half", "half", "wide", "tall", "large"];

export default function ProjectDetailPage() {
  const params = useParams<{ slug?: string | string[] }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const project = PROJECTS.find((p) => p.slug === slug);
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  if (!project) {
    return (
      <section
        className="section"
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          background: "#050505",
          color: "white",
        }}
      >
        <div className="containerWide">
          <h1 className="h2">Project not found</h1>

          <Link
            className="btn btnPrimary"
            href="/projects"
            style={{ marginTop: 24 }}
          >
            ← Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  const galleryImages = Array.from(new Set([project.cover, ...project.images]));

  const floorPlans =
    project.drawings && project.drawings.length > 0
      ? project.drawings
      : project.drawing
        ? [project.drawing]
        : [];

  const sameCategoryProjects = PROJECTS.filter(
    (item) => item.slug !== project.slug && item.category === project.category
  );

  const fallbackProjects = PROJECTS.filter(
    (item) => item.slug !== project.slug && item.category !== project.category
  );

  const relatedProjects = [...sameCategoryProjects, ...fallbackProjects].slice(
    0,
    3
  );

  return (
    <div ref={container} style={{ background: "#050505", color: "white" }}>
      <style>
        {`
          .project-gallery-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 24px;
          }

          .project-gallery-item {
            position: relative;
            border: none;
            padding: 0;
            background: #111;
            color: white;
            overflow: hidden;
            cursor: pointer;
            text-align: left;
          }

          .project-gallery-item.wide {
            grid-column: 1 / -1;
            aspect-ratio: 16 / 9;
          }

          .project-gallery-item.half {
            grid-column: span 6;
            aspect-ratio: 4 / 3;
          }

          .project-gallery-item.tall {
            grid-column: span 5;
            aspect-ratio: 4 / 5;
          }

          .project-gallery-item.large {
            grid-column: span 7;
            aspect-ratio: 16 / 11;
          }

          .project-gallery-image {
            filter: grayscale(100%) brightness(0.82);
            transform: scale(1);
            transition: filter 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .project-gallery-item:hover .project-gallery-image {
            filter: grayscale(0%) brightness(1);
            transform: scale(1.055);
          }

          .project-gallery-view {
            position: absolute;
            right: 24px;
            bottom: 24px;
            z-index: 4;
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: black;
            background: white;
            border-radius: 999px;
            padding: 10px 14px;
            opacity: 0;
            transform: translateY(8px);
            transition: opacity 0.35s ease, transform 0.35s ease;
          }

          .project-gallery-item:hover .project-gallery-view {
            opacity: 1;
            transform: translateY(0);
          }

          .related-card .related-image {
            filter: grayscale(100%) brightness(0.82);
            transform: scale(1);
            transition: filter 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .related-card:hover .related-image {
            filter: grayscale(0%) brightness(1);
            transform: scale(1.06);
          }

          .related-card .related-title {
            transition: transform 0.4s ease, opacity 0.4s ease;
          }

          .related-card:hover .related-title {
            transform: translateY(-2px);
            opacity: 1;
          }

          .timeline-scroll::-webkit-scrollbar {
            height: 5px;
          }

          .timeline-scroll::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.05);
          }

          .timeline-scroll::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.28);
            border-radius: 999px;
          }

          @media (max-width: 800px) {
            .project-gallery-grid {
              grid-template-columns: 1fr;
            }

            .project-gallery-item.wide,
            .project-gallery-item.half,
            .project-gallery-item.tall,
            .project-gallery-item.large {
              grid-column: 1 / -1;
              aspect-ratio: 4 / 5;
            }
          }
        `}
      </style>

      {/* 1. HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <BackButton />

        <motion.div
          style={{
            y: heroY,
            width: "100%",
            height: "120%",
            position: "absolute",
            inset: 0,
          }}
        >
          <Image
            src={project.cover}
            alt={project.title}
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </motion.div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(5,5,5,0.94), rgba(5,5,5,0.35), transparent)",
            pointerEvents: "none",
          }}
        />

        <div
          className="containerWide mobileHeroText"
          style={{
            position: "relative",
            zIndex: 10,
            paddingBottom: 80,
            width: "100%",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.1 }}
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontSize: 12,
              opacity: 0.6,
            }}
          >
            {project.category}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.2 }}
            style={{
              margin: "16px 0 0",
              fontSize: "clamp(46px, 6vw, 110px)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              fontWeight: 900,
            }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...transition, delay: 0.4 }}
            style={{
              marginTop: 24,
              fontSize: 18,
              color: "rgba(255,255,255,0.68)",
            }}
          >
            {project.location} · {project.year}
          </motion.p>

          {project.status && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...transition, delay: 0.55 }}
              style={{
                marginTop: 24,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 16px",
                borderRadius: 99,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(10px)",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontWeight: 800,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "white",
                  display: "inline-block",
                }}
              />
              {project.status}
            </motion.div>
          )}
        </div>
      </section>

      {/* 2. SUMMARY & SPECS */}
      <section className="mobilePad" style={{ padding: "96px 0" }}>
        <div className="containerWide">
          <motion.div
            className="mobileStack"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={transition}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: 80,
              alignItems: "start",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: 40,
            }}
          >
            <div>
              <div
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: 12,
                  opacity: 0.6,
                }}
              >
                Project Summary
              </div>

              <h2
                style={{
                  marginTop: 16,
                  fontSize: 32,
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                }}
              >
                {project.title}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                  marginTop: 40,
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  paddingTop: 30,
                }}
              >
                {project.status && (
                  <Spec icon="status" label="Status" value={project.status} />
                )}

                {project.scope && (
                  <Spec icon="scope" label="Scope" value={project.scope} />
                )}

                {project.area && (
                  <Spec icon="area" label="Gross Area" value={project.area} />
                )}

                {project.bedrooms && (
                  <Spec
                    icon="bedrooms"
                    label="Bedrooms"
                    value={String(project.bedrooms)}
                  />
                )}

                {project.bathrooms && (
                  <Spec
                    icon="bathrooms"
                    label="Bathrooms"
                    value={String(project.bathrooms)}
                  />
                )}

                <Spec icon="year" label="Year" value={project.year} />
              </div>
            </div>

            <div>
              <div
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: 12,
                  opacity: 0.45,
                  marginBottom: 18,
                }}
              >
                Design Intent
              </div>

              <p
                style={{
                  fontSize: 20,
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.8)",
                  margin: 0,
                }}
              >
                {project.summary}
              </p>
            </div>
          </motion.div>

          {/* 3. GALLERY */}
          <ProjectGallery images={galleryImages} title={project.title} />
        </div>
      </section>

      {/* 4. SELECTED FLOOR PLANS */}
      {floorPlans.length > 0 && (
        <section className="mobilePad" style={{ padding: "0 0 96px" }}>
          <div className="containerWide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={transition}
              style={{
                borderTop: "1px solid rgba(255,255,255,0.1)",
                paddingTop: 40,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  gap: 24,
                  marginBottom: 28,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div
                    style={{
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontSize: 12,
                      opacity: 0.6,
                    }}
                  >
                    Selected Floor Plans
                  </div>

                  <p
                    style={{
                      margin: "12px 0 0",
                      maxWidth: 520,
                      color: "rgba(255,255,255,0.48)",
                      fontSize: 14,
                      lineHeight: 1.7,
                    }}
                  >
                    Preview-only architectural drawings. Detailed technical
                    documentation remains protected.
                  </p>
                </div>

                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.42)",
                    fontWeight: 900,
                  }}
                >
                  IMVO · Preview Only
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    floorPlans.length === 1
                      ? "1fr"
                      : "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: 24,
                }}
              >
                {floorPlans.map((plan, index) => (
                  <div
                    key={plan}
                    onContextMenu={(event) => event.preventDefault()}
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16/10",
                      background:
                        "radial-gradient(circle at center, rgba(255,255,255,0.045), #090909 68%)",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.08)",
                      userSelect: "none",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 18,
                        left: 18,
                        zIndex: 4,
                        padding: "8px 12px",
                        borderRadius: 99,
                        background: "rgba(0,0,0,0.55)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        backdropFilter: "blur(10px)",
                        fontSize: 11,
                        fontWeight: 900,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.72)",
                      }}
                    >
                      {floorPlans.length === 1
                        ? "Floor Plan"
                        : index === 0
                          ? "Ground Floor"
                          : index === 1
                            ? "Upper Floor"
                            : `Plan ${index + 1}`}
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        inset: 34,
                        pointerEvents: "none",
                      }}
                    >
                      <Image
                        src={plan}
                        alt={`${project.title} floor plan ${index + 1}`}
                        fill
                        draggable={false}
                        sizes="100vw"
                        style={{
                          objectFit: "contain",
                          pointerEvents: "none",
                        }}
                      />
                    </div>

                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 5,
                        pointerEvents: "auto",
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.015), transparent 45%, rgba(255,255,255,0.02))",
                      }}
                      onContextMenu={(event) => event.preventDefault()}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 5. TIMELINE */}
      {project.timeline && project.timeline.length > 0 && (
        <section className="mobilePad" style={{ padding: "0 0 96px" }}>
          <div className="containerWide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={transition}
              style={{
                borderTop: "1px solid rgba(255,255,255,0.1)",
                paddingTop: 40,
              }}
            >
              <div
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: 12,
                  opacity: 0.6,
                  marginBottom: 38,
                }}
              >
                Project Timeline
              </div>

              <div
                className="timeline-scroll"
                style={{
                  position: "relative",
                  overflowX: "auto",
                  padding: "20px 0 8px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 41,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "rgba(255,255,255,0.14)",
                    minWidth: project.timeline.length * 230,
                  }}
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${project.timeline.length}, minmax(220px, 1fr))`,
                    gap: 24,
                    minWidth: project.timeline.length * 230,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  {project.timeline.map((item, index) => (
                    <div key={`${item.year}-${item.title}-${index}`}>
                      <div
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          background: "#050505",
                          border: "2px solid white",
                          boxShadow: "0 0 18px rgba(255,255,255,0.22)",
                          marginBottom: 28,
                        }}
                      />

                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 900,
                          color: "rgba(255,255,255,0.48)",
                          marginBottom: 10,
                        }}
                      >
                        {item.year}
                      </div>

                      <div
                        style={{
                          fontSize: 22,
                          fontWeight: 900,
                          letterSpacing: "-0.04em",
                          lineHeight: 1.1,
                          maxWidth: 210,
                        }}
                      >
                        {item.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 6. MAP LOCATION */}
      <section style={{ padding: "0 0 120px 0" }}>
        <div className="containerWide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition}
            style={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: 40,
            }}
          >
            <div
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontSize: 12,
                opacity: 0.6,
                marginBottom: 24,
              }}
            >
              Project Location
            </div>

            <div
              style={{
                position: "relative",
                height: 500,
                background: "#111",
                overflow: "hidden",
                filter: "grayscale(100%) contrast(1.2)",
              }}
            >
              {project.mapUrl ? (
                <iframe
                  src={project.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  Location data not available
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. RELATED PROJECTS */}
      <section className="mobilePad" style={{ padding: "0 0 96px" }}>
        <div className="containerWide">
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: 40,
            }}
          >
            <div
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontSize: 12,
                opacity: 0.6,
                marginBottom: 36,
              }}
            >
              Related Projects
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 28,
              }}
            >
              {relatedProjects.map((related) => (
                <Link
                  key={related.slug}
                  href={`/projects/${related.slug}`}
                  className="related-card"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "4/3",
                      background: "#111",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={related.cover}
                      alt={related.title}
                      fill
                      sizes="33vw"
                      className="related-image"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div style={{ marginTop: 18 }}>
                    <div
                      style={{
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "rgba(255,255,255,0.45)",
                      }}
                    >
                      {related.category}
                    </div>

                    <h3
                      className="related-title"
                      style={{
                        margin: "8px 0 0",
                        fontSize: 22,
                        fontWeight: 900,
                        letterSpacing: "-0.04em",
                        opacity: 0.86,
                      }}
                    >
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section
        className="mobilePad"
        style={{
          padding: "96px 0",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          background: "#050505",
        }}
      >
        <CTALines />

        <div
          className="containerWide"
          style={{ position: "relative", zIndex: 4 }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(38px,5vw,72px)",
              lineHeight: 1,
              letterSpacing: "-0.05em",
              fontWeight: 900,
            }}
          >
            Discuss a similar project.
          </h2>

          <p
            style={{
              margin: "24px auto 0",
              maxWidth: 560,
              fontSize: 18,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.62)",
            }}
          >
            Start a conversation with IMVO about design, consultancy,
            supervision, or development guidance.
          </p>

          <Link
            href="/contact#quote"
            style={{
              display: "inline-block",
              marginTop: 42,
              background: "white",
              color: "black",
              padding: "18px 38px",
              borderRadius: 99,
              fontWeight: 900,
              textDecoration: "none",
            }}
          >
            Start a Conversation ↗
          </Link>
        </div>
      </section>
    </div>
  );
}

function BackButton() {
  const router = useRouter();

  return (
    <motion.button
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transition, delay: 0.35 }}
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back();
        } else {
          router.push("/projects");
        }
      }}
      style={{
        position: "absolute",
        top: 112,
        left: "max(24px, calc((100vw - 1440px) / 2 + 32px))",
        zIndex: 40,
        height: 44,
        padding: "0 18px",
        borderRadius: 99,
        border: "1px solid rgba(255,255,255,0.18)",
        background: "rgba(5,5,5,0.35)",
        color: "white",
        backdropFilter: "blur(14px)",
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 800,
        letterSpacing: "0.02em",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.background = "rgba(255,255,255,0.12)";
        event.currentTarget.style.borderColor = "rgba(255,255,255,0.36)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.background = "rgba(5,5,5,0.35)";
        event.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
      }}
    >
      ← Back
    </motion.button>
  );
}

function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? 0 : (current + 1) % images.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? 0
            : (current - 1 + images.length) % images.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images.length]);

  return (
    <>
      <div style={{ marginTop: 120 }}>
        <div className="project-gallery-grid">
          {images.map((src, index) => {
            const layout = galleryLayouts[index % galleryLayouts.length];

            return (
              <motion.button
                key={`${src}-${index}`}
                type="button"
                className={`project-gallery-item ${layout}`}
                onClick={() => setActiveIndex(index)}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  ...transition,
                  delay: index % 2 === 0 ? 0 : 0.15,
                }}
              >
                <Image
                  src={src}
                  alt={`${title} image ${index + 1}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 80vw"
                  className="project-gallery-image"
                  style={{ objectFit: "cover" }}
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.28), transparent 55%)",
                    pointerEvents: "none",
                  }}
                />

                <span className="project-gallery-view">View Image</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setActiveIndex(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              background: "rgba(5,5,5,0.94)",
              backdropFilter: "blur(14px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 32,
            }}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setActiveIndex(null);
              }}
              style={{
                position: "absolute",
                top: 28,
                right: 28,
                width: 46,
                height: 46,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.08)",
                color: "white",
                fontSize: 22,
                cursor: "pointer",
              }}
            >
              ×
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveIndex((current) =>
                      current === null
                        ? 0
                        : (current - 1 + images.length) % images.length
                    );
                  }}
                  style={{
                    position: "absolute",
                    left: 28,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.08)",
                    color: "white",
                    cursor: "pointer",
                    fontSize: 22,
                  }}
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveIndex((current) =>
                      current === null ? 0 : (current + 1) % images.length
                    );
                  }}
                  style={{
                    position: "absolute",
                    right: 28,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.08)",
                    color: "white",
                    cursor: "pointer",
                    fontSize: 22,
                  }}
                >
                  →
                </button>
              </>
            )}

            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={transition}
              onClick={(event) => event.stopPropagation()}
              style={{
                position: "relative",
                width: "min(1200px, 92vw)",
                height: "min(760px, 78vh)",
                background: "#111",
              }}
            >
              <Image
                src={activeImage}
                alt={`${title} enlarged image`}
                fill
                sizes="100vw"
                style={{ objectFit: "contain" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: ProjectSpecIcon;
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "34px 1fr",
        gap: 12,
        alignItems: "start",
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.14)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.78)",
          background: "rgba(255,255,255,0.035)",
        }}
      >
        <SpecIcon type={icon} />
      </div>

      <div>
        <div
          style={{
            fontSize: 11,
            opacity: 0.5,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {label}
        </div>

        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            marginTop: 6,
            lineHeight: 1.2,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function SpecIcon({ type }: { type: ProjectSpecIcon }) {
  const common = {
    width: 17,
    height: 17,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "status") {
    return (
      <svg {...common}>
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );
  }

  if (type === "scope") {
    return (
      <svg {...common}>
        <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" />
        <path d="M4 12l8 4.5 8-4.5" />
        <path d="M4 16.5l8 4.5 8-4.5" />
      </svg>
    );
  }

  if (type === "area") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="16" height="16" />
        <path d="M4 20L20 4" />
      </svg>
    );
  }

  if (type === "bedrooms") {
    return (
      <svg {...common}>
        <path d="M4 11V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
        <path d="M12 11h8a2 2 0 0 1 2 2v6" />
        <path d="M4 19v-8h18v8" />
        <path d="M4 15h18" />
      </svg>
    );
  }

  if (type === "bathrooms") {
    return (
      <svg {...common}>
        <path d="M7 10V5a3 3 0 0 1 6 0" />
        <path d="M5 11h16v3a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5v-3z" />
        <path d="M8 21h8" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="4" y="5" width="16" height="15" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M4 10h16" />
    </svg>
  );
}

function CTALines() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.45,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1600 520"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0 }}
      >
        <pattern
          id="project-cta-grid"
          width="90"
          height="90"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M90 0 L0 0 0 90"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        </pattern>

        <rect width="100%" height="100%" fill="url(#project-cta-grid)" />

        {[
          "M-100 360 H420 V250 H720 V330 H1180 V210 H1700",
          "M-100 260 H260 V160 H560 V250 H900 V120 H1700",
          "M120 520 V330 H420 V180 H760 V260 H1120 V80",
          "M280 520 V380 H620 V300 H980 V190 H1450",
        ].map((path, index) => (
          <motion.path
            key={path}
            d={path}
            fill="none"
            stroke="rgba(255,255,255,0.65)"
            strokeWidth={index === 0 ? 1.6 : 1.1}
            strokeLinecap="round"
            strokeDasharray="120 900"
            initial={{ strokeDashoffset: 900, opacity: 0 }}
            animate={{
              strokeDashoffset: [900, 0, -900],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 7 + index * 1.3,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.8,
            }}
          />
        ))}

        {[
          [420, 250],
          [720, 330],
          [1180, 210],
          [560, 250],
          [900, 120],
          [620, 300],
          [980, 190],
        ].map(([cx, cy], index) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="3"
            fill="white"
            animate={{
              opacity: [0.25, 1, 0.25],
              scale: [1, 1.35, 1],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.25,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
