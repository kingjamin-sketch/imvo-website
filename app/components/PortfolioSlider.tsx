"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const projects = [
  { image: "/project-01.png", title: "Casa Lume", location: "Modern Villa | Rwanda" },
  { image: "/project-02.png", title: "Green Residence", location: "Kigali, Rwanda" },
  { image: "/project-3.png", title: "Urban Villa", location: "East Africa" },
  { image: "/project-4.png", title: "Private Estate", location: "Rwanda" },
  { image: "/project-5.png", title: "Casa 88", location: "Urban Residence" },
  { image: "/project-6.png", title: "Mixed-use Study", location: "Africa" },
  // Adding 4 more to make it 10 total
  { image: "/project-7.png", title: "Hill View House", location: "Rwanda" },
  { image: "/project-8.png", title: "Commercial Block", location: "Kigali, Rwanda" },
  { image: "/project-9.png", title: "Institutional Study", location: "Rwanda" },
  { image: "/project-10.png", title: "Hospitality Concept", location: "Regional" },
];

const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const };

export default function PortfolioSlider() {
  const [index, setIndex] = useState(0);

  function next() {
    setIndex((prev) => (prev + 1) % projects.length);
  }

  function prev() {
    setIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ backgroundColor: "#050505", color: "white", padding: "120px 0", overflow: "hidden" }}>
      <div 
        className="containerWide" 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "0.65fr 1.35fr", // Gives the image column much more space
          gap: "60px", 
          alignItems: "center" 
        }}
      >
        
        {/* LEFT COLUMN: Fixed Text & Controls */}
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
              <Link href="/projects" style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.05em", textDecoration: "none", color: "white", borderBottom: "1px solid white", paddingBottom: "4px", transition: "opacity 0.3s ease" }} onMouseEnter={(e) => e.currentTarget.style.opacity = "0.6"} onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
                VIEW ALL ↗
              </Link>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "60px" }}>
            <button onClick={prev} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: "48px", height: "48px", color: "white", cursor: "pointer", transition: "background 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              ←
            </button>
            <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em", opacity: 0.8 }}>
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <button onClick={next} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: "48px", height: "48px", color: "white", cursor: "pointer", transition: "background 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              →
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: The Physical Sliding Track */}
        <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
          
          {/* Filmstrip Track */}
          <motion.div
            animate={{ x: `calc(-${index * 100}%)` }}
            transition={transition}
            style={{ display: "flex", width: "100%" }}
          >
            {projects.map((proj, i) => (
              <div
                key={i}
                style={{
                  flex: "0 0 100%", // Forces every slide to strictly take up the full container width
                  paddingRight: "40px", // Creates the visual gap between sliding photos
                  position: "relative"
                }}
              >
                {/* Changed aspectRatio from 16/9 to 16/10 to make the photos much taller and larger */}
                <Link href="/projects" style={{ display: "block", position: "relative", width: "100%", aspectRatio: "16/10", background: "#111", overflow: "hidden" }}>
                  <motion.div
                    animate={{ scale: index === i ? 1 : 1.05 }} 
                    transition={transition}
                    style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
                  >
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 70vw"
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>
                  
                  {/* Text Overlay inside the slide */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", bottom: "40px", left: "40px", right: "40px", pointerEvents: "none" }}>
                    <h3 style={{ margin: 0, fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em" }}>{proj.title}</h3>
                    <p style={{ margin: "8px 0 0", fontSize: "16px", opacity: 0.8, fontWeight: 500 }}>{proj.location}</p>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}