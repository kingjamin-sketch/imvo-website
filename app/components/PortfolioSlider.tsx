"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

const projects = [
  { image: "/project-00.jpg", title: "Casa Lume", location: "Modern Villa | Rwanda" },
  { image: "/project-20.jpg", title: "Green Residence", location: "Kigali, Rwanda" },
  { image: "/project-03.png", title: "Urban Villa", location: "East Africa" },
  { image: "/project-4.jpg", title: "Private Estate", location: "Rwanda" },
  { image: "/project-5.jpg", title: "Casa 88", location: "Urban Residence" },
  { image: "/project-60.jpg", title: "Mixed-use Study", location: "Africa" },
  { image: "/project-7.jpg", title: "Hill View House", location: "Rwanda" },
  { image: "/project-08.png", title: "Commercial Block", location: "Kigali, Rwanda" },
  { image: "/project-09.png", title: "Institutional Study", location: "Rwanda" },
  { image: "/project-100.png", title: "Hospitality Concept", location: "Regional" },
];

const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const };

export default function PortfolioSlider() {
  const [index, setIndex] = useState(0);

  const goNext = useCallback(() => {
    setIndex((current) => (current + 1) % projects.length);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((current) => (current - 1 + projects.length) % projects.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext, index]);

  const activeProject = projects[index];

  return (
    <section style={{ backgroundColor: "#050505", color: "white", padding: "120px 0", overflow: "hidden" }}>
      <div
        className="containerWide"
        style={{
          display: "grid",
          gridTemplateColumns: "0.65fr 1.35fr",
          gap: "60px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", minHeight: "500px" }}>
          <div>
            <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6 }}>
              Selected Work
            </div>

            <h2 style={{ margin: "20px 0 0", fontSize: "clamp(46px, 6vw, 84px)", lineHeight: 0.9, letterSpacing: "-0.04em", fontWeight: 900 }}>
              PORT
              <br />
              FOLIO
            </h2>

            <p style={{ marginTop: "30px", maxWidth: "380px", fontSize: "18px", lineHeight: 1.8, color: "rgba(255,255,255,0.7)" }}>
              A curated view of IMVO’s residential, commercial,
              institutional, and urban work — developed through
              clarity, proportion, context, and execution-aware
              architectural thinking.
            </p>

            <div style={{ marginTop: "40px" }}>
              <Link
                href="/projects"
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textDecoration: "none",
                  color: "white",
                  borderBottom: "1px solid white",
                  paddingBottom: "4px",
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                VIEW ALL ↗
              </Link>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "60px" }}>
            <button
              onClick={goPrev}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                color: "white",
                cursor: "pointer",
                transition: "background 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              ←
            </button>

            <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em", opacity: 0.8 }}>
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>

            <button
              onClick={goNext}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                color: "white",
                cursor: "pointer",
                transition: "background 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              →
            </button>
          </div>
        </div>

        <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 80, scale: 0.985 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -80 }}
            transition={transition}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/10",
              background: "#111",
              overflow: "hidden",
            }}
          >
            <Link href="/projects" style={{ display: "block", position: "relative", width: "100%", height: "100%" }}>
              <motion.div
                key={activeProject.image}
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={transition}
                style={{ position: "absolute", inset: 0 }}
              >
                <Image
                  src={activeProject.image}
                  alt={activeProject.title}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 70vw"
                  style={{ objectFit: "cover" }}
                />
              </motion.div>

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ position: "absolute", bottom: "40px", left: "40px", right: "40px", pointerEvents: "none" }}>
                <h3 style={{ margin: 0, fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  {activeProject.title}
                </h3>
                <p style={{ margin: "8px 0 0", fontSize: "16px", opacity: 0.8, fontWeight: 500 }}>
                  {activeProject.location}
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}