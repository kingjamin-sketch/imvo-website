"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROJECTS } from "../projectsData";

const transition = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const };

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  if (!project) {
    return (
      <section className="section" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div className="containerWide">
          <h1 className="h2">Project not found</h1>
          <Link className="btn btnPrimary" href="/projects" style={{ marginTop: 24 }}>← Back to Projects</Link>
        </div>
      </section>
    );
  }

  return (
    <div ref={container} style={{ background: "#050505", color: "white" }}>
      {/* 1. HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <motion.div style={{ y: heroY, width: "100%", height: "120%", position: "absolute", inset: 0 }}>
          <Image src={project.cover} alt={project.title} fill priority style={{ objectFit: "cover" }} />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.9), transparent)", pointerEvents: "none" }} />
        <div className="containerWide mobileHeroText" style={{ position: "relative", zIndex: 10, paddingBottom: 80, width: "100%" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.1 }} style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6 }}>
            {project.category}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.2 }} style={{ margin: "16px 0 0", fontSize: "clamp(46px, 6vw, 110px)", lineHeight: 0.9, letterSpacing: "-0.04em", fontWeight: 900 }}>
            {project.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...transition, delay: 0.4 }} style={{ marginTop: 24, fontSize: 18, color: "rgba(255,255,255,0.6)" }}>
            {project.location} · {project.year}
          </motion.p>
        </div>
      </section>

      {/* 2. SUMMARY & SPECS */}
      <section className="mobilePad" style={{ padding: "120px 0" }}>
        <div className="containerWide">
          <motion.div className="mobileStack" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={transition} style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 40 }}>
            <div>
              <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6 }}>Project Summary</div>
              <h2 style={{ marginTop: 16, fontSize: 32, fontWeight: 900, letterSpacing: "-0.02em" }}>{project.title}</h2>
              
              {/* ARCHITECTURAL SPECS GRID */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 40, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 30 }}>
                {project.area && (
                  <div><div style={{ fontSize: 11, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>Gross Area</div><div style={{ fontSize: 20, fontWeight: 800 }}>{project.area}</div></div>
                )}
                {project.bedrooms && (
                  <div><div style={{ fontSize: 11, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>Bedrooms</div><div style={{ fontSize: 20, fontWeight: 800 }}>{project.bedrooms}</div></div>
                )}
                {project.bathrooms && (
                  <div><div style={{ fontSize: 11, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>Bathrooms</div><div style={{ fontSize: 20, fontWeight: 800 }}>{project.bathrooms}</div></div>
                )}
              </div>
            </div>
            <p style={{ fontSize: 20, lineHeight: 1.8, color: "rgba(255,255,255,0.8)" }}>{project.summary}</p>
          </motion.div>

          {/* 3. GALLERY */}
          <div style={{ marginTop: 120, display: "grid", gap: 24 }}>
            {project.images.map((src, index) => (
              <motion.div key={`${src}-${index}`} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ ...transition, delay: index % 2 === 0 ? 0 : 0.15 }} style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9", background: "#111" }}>
                <motion.div initial={{ scale: 1.15 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={transition} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                  <Image src={src} alt={`${project.title} render ${index + 1}`} fill sizes="(max-width: 900px) 100vw, 80vw" style={{ objectFit: "cover" }} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MAP LOCATION */}
      <section style={{ padding: "0 0 120px 0" }}>
        <div className="containerWide">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={transition} style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 40 }}>
            <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6, marginBottom: 24 }}>Project Location</div>
            <div style={{ position: "relative", height: 500, background: "#111", overflow: "hidden", filter: "grayscale(100%) contrast(1.2)" }}>
              {project.mapUrl ? (
                <iframe src={project.mapUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "rgba(255,255,255,0.3)" }}>Location data not available</div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}