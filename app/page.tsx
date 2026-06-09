"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroRotatingVideo from "./components/HeroRotatingVideo";
import PortfolioSlider from "./components/PortfolioSlider";

// --- CLIENT-ONLY WRAPPER ---
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  return hasMounted ? <>{children}</> : null;
};

const teamMembers = [
  {
    name: "Arch. ASINGIZWE BENJAMIN MARIE MERCI",
    role: "Architecture & Design",
    image: "/team1.png",
    description: "Experienced in architectural design, urbanism, and environmentally responsive development — focused on spatial clarity, sustainable thinking, contextual integration, and long-term architectural value.",
  },
  {
    name: "SHEMA BAMBI Antonella M.",
    role: "Consultancy & Strategy",
    image: "/team2.png",
    description: "Combines expertise in IT development, strategic consultancy, and project coordination — supporting digital systems, operational planning, client advisory, and development-focused decision-making.",
  },
  {
    name: "Phd. Eng. RUKUNDO Prince",
    role: "Supervision & Execution",
    image: "/team3.png",
    description: "PhD holder in Civil Engineering with expertise in roads, infrastructure systems, and urbanism — contributing technical supervision, execution coordination, and planning-oriented engineering insight.",
  },
  {
    name: "KANGWAGYE Sharon",
    role: "Project Coordination",
    image: "/team4.png",
    description: "Experienced in digital commerce, market strategy, and growth coordination — supporting project organization through strategic planning, market understanding, and operational communication.",
  }
];

const inProgressProjects = [
  { title: "Golden Hill Estate", type: "Residential Masterplan", concept: "Elevated foundations responding to wetland topography.", image: "/project-22.png" },
  { title: "Rayon Sports FC Arena", type: "Sports Infrastructure", concept: "Crown-themed stadium concept and spatial identity.", image: "/project-10.png" },
  { title: "AMAKUZA Experience", type: "Commercial Environment", concept: "Integrated spatial branding and hospitality flow.", image: "/project-36.png" }
];

const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const };

function AnimatedNumber({ from, to, suffix = "", pad = false }: { from: number; to: number; suffix?: string; pad?: boolean }) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    const duration = 1600;
    const start = performance.now();
    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [from, to]);

  const formatted = pad ? String(value).padStart(2, "0") : String(value);

  return (
    <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-0.04em" }}>
      {formatted}{suffix}
    </div>
  );
}

// --- THE NEW NATIVE STICKY HERO ---
function CinematicHero() {
  const scenes = [
    {
      label: "DESIGN",
      title: "Spatial clarity before form.",
      text: "Every line begins with purpose, proportion, context, and buildable intent.",
      image: "/project-10.png",
      zIndex: 2,
    },
    {
      label: "STRATEGY",
      title: "Better decisions before construction.",
      text: "We connect design ambition with feasibility, planning, risk, and development value.",
      image: "/project-22.png",
      zIndex: 3,
    },
    {
      label: "EXECUTION",
      title: "Design value protected on site.",
      text: "From concept to supervision, IMVO keeps the work disciplined, coordinated, and accountable.",
      image: "/project-36.png",
      zIndex: 4,
    },
  ];

  return (
    <div style={{ position: "relative" }}>
      
      {/* BASE LAYER: VIDEO (Sticks to the top at zIndex 1) */}
      <section style={{ position: "sticky", top: 0, height: "100vh", width: "100%", zIndex: 1, background: "#050505", overflow: "hidden" }}>
        <HeroRotatingVideo />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.92), rgba(5,5,5,0.35), rgba(5,5,5,0.05))", pointerEvents: "none" }} />
        
        <div className="containerWide" style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "10vh" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.2 }} style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, opacity: 0.8 }}>
            INTELLECTU · MENS · VISIO · ORIGO
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.4 }} style={{ marginTop: 24, maxWidth: 800, fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.6, color: "rgba(255,255,255,0.82)" }}>
            IMVO develops residential, commercial, and institutional environments
            through architectural design, consultancy, supervision, and
            execution-aware planning — balancing spatial clarity, contextual
            sensitivity, technical discipline, and long-term architectural value.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.6 }} style={{ marginTop: 40 }}>
            <Link href="/projects" style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.05em", textDecoration: "none", color: "white", borderBottom: "1px solid white", paddingBottom: 4 }}>
              EXPLORE WORK ↗
            </Link>
          </motion.div>
        </div>
      </section>

      {/* OVERLAY LAYERS: IMAGES (Scroll up naturally and stick on top of each other) */}
      {scenes.map((scene) => (
        <section key={scene.label} style={{ position: "sticky", top: 0, height: "100vh", width: "100%", zIndex: scene.zIndex, background: "#050505", overflow: "hidden" }}>
          <Image src={scene.image} alt={scene.title} fill priority sizes="100vw" style={{ objectFit: "cover", filter: "grayscale(100%) brightness(0.78)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.88), rgba(5,5,5,0.42), rgba(5,5,5,0.08))" }} />
          
          <div className="containerWide" style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", alignItems: "flex-end", paddingBottom: "12vh" }}>
            <div style={{ maxWidth: 780 }}>
              <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 800, color: "rgba(255,255,255,0.65)" }}>
                {scene.label}
              </div>
              <h1 style={{ margin: "18px 0 0", fontSize: "clamp(54px, 7vw, 118px)", lineHeight: 0.88, letterSpacing: "-0.08em", fontWeight: 900 }}>
                {scene.title}
              </h1>
              <p style={{ marginTop: 28, maxWidth: 620, fontSize: "clamp(18px, 2vw, 23px)", lineHeight: 1.65, color: "rgba(255,255,255,0.76)" }}>
                {scene.text}
              </p>
            </div>
          </div>
        </section>
      ))}

    </div>
  );
}

export default function HomePage() {
  return (
    <div style={{ background: "#050505", color: "white", overflow: "hidden" }}>
      
      {/* 1. NATIVE STICKY HERO */}
      <ClientOnly>
        <CinematicHero />
      </ClientOnly>

      {/* The rest of the page flows naturally underneath */}
      <div style={{ position: "relative", zIndex: 10, background: "#050505" }}>
        
        {/* 1.5 DUAL INFINITE MARQUEE */}
        <section style={{ padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", overflow: "hidden", background: "#050505", display: "flex", flexDirection: "column", gap: "14px" }}>
          <motion.div animate={{ x: [0, "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 40 }} style={{ display: "flex", whiteSpace: "nowrap", width: "fit-content" }}>
            {[...Array(2)].map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "4vw", paddingRight: "4vw" }}>
                {["SPATIAL CLARITY", "CONTEXTUAL SENSITIVITY", "TECHNICAL DISCIPLINE", "EXECUTION AWARENESS", "LONG-TERM VALUE", "PURPOSEFUL DEVELOPMENT"].map((word, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: "4vw" }}>
                    <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.25em", color: "rgba(255,255,255,0.5)" }}>{word}</span>
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.15)" }}>✦</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>

          <motion.div animate={{ x: ["-50%", 0] }} transition={{ repeat: Infinity, ease: "linear", duration: 50 }} style={{ display: "flex", whiteSpace: "nowrap", width: "fit-content" }}>
            {[...Array(2)].map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "4vw", paddingRight: "4vw" }}>
                {["RESIDENTIAL", "COMMERCIAL", "INSTITUTIONAL", "LIFESTYLE-CENTRIC AESTHETICS", "HOSPITALITY", "URBANISM"].map((word, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: "4vw" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)" }}>{word}</span>
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.1)" }}>✦</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </section>

        {/* 2. MANIFESTO */}
        <section className="mobilePad" style={{ padding: "80px 0 120px 0" }}>
          <div className="containerWide">
            <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={transition}>
                <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6 }}>Architectural Approach</div>
                <h2 style={{ marginTop: 20, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 900 }}>
                  Architecture is not decoration.<br />It is structure, context,<br />proportion, and long-term value.
                </h2>
                <p style={{ margin: "30px auto 0", maxWidth: 700, fontSize: 18, lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}>
                  IMVO develops environments through disciplined design thinking, technical coordination, and construction awareness.
                </p>
              </motion.div>

              <motion.div className="mobileStackCenter" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ ...transition, delay: 0.2 }} style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap", marginTop: 80, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 60 }}>
                {[
                  { from: 2000, to: 2017, suffix: "", label: "Founded" },
                  { from: 0, to: 40, suffix: "+", label: "Projects" },
                  { from: 0, to: 4, suffix: "", label: "Core disciplines", pad: true }
                ].map((item) => (
                  <div key={item.label} style={{ textAlign: "center", minWidth: 140 }}>
                    <AnimatedNumber from={item.from} to={item.to} suffix={item.suffix} pad={item.pad} />
                    <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", marginTop: 8 }}>{item.label}</div>
                  </div>
                ))}

                <div style={{ textAlign: "center", minWidth: 140 }}>
                  <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-0.04em" }}>RW / EA</div>
                  <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", marginTop: 8 }}>Regional focus</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. PORTFOLIO SLIDER */}
        <ClientOnly>
          <PortfolioSlider />
        </ClientOnly>

        {/* 3.5 ON THE BOARDS */}
        <section className="mobilePad" style={{ padding: "120px 0", background: "#080808", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="containerWide">
            <motion.div className="mobileStack" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={transition} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 30 }}>
              <div>
                <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 700 }}>In Progress</div>
                <h2 style={{ fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 900, letterSpacing: "-0.04em", margin: "10px 0 0" }}>On the boards.</h2>
              </div>
              <p style={{ maxWidth: 400, margin: 0, fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                A look at conceptual studies, wireframes, and developments currently taking shape in the studio.
              </p>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40, marginTop: 60 }}>
              {inProgressProjects.map((project, index) => (
                <motion.div key={project.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ ...transition, delay: index * 0.15 }}>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "#111" }}>
                    <Image src={project.image} alt={project.title} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: "cover", filter: "grayscale(100%) contrast(1.1) brightness(0.8)", transition: "filter 0.5s ease, transform 0.5s ease" }} onMouseEnter={(e) => { e.currentTarget.style.filter = "grayscale(0%) contrast(1) brightness(1)"; e.currentTarget.style.transform = "scale(1.05)"; }} onMouseLeave={(e) => { e.currentTarget.style.filter = "grayscale(100%) contrast(1.1) brightness(0.8)"; e.currentTarget.style.transform = "scale(1)"; }} />
                    <div style={{ position: "absolute", top: 20, left: 20, background: "rgba(0,0,0,0.8)", padding: "6px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", backdropFilter: "blur(4px)" }}>Active Study</div>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>{project.type}</div>
                    <h3 style={{ margin: "8px 0", fontSize: 22, fontWeight: 800 }}>{project.title}</h3>
                    <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{project.concept}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. SERVICES */}
        <section className="mobilePad" style={{ padding: "120px 0", background: "#0a0a0a" }}>
          <div className="containerWide">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={transition} style={{ maxWidth: 800 }}>
              <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6 }}>Services</div>
              <h2 style={{ marginTop: 20, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 900 }}>Three pillars from vision to execution.</h2>
            </motion.div>

            <div style={{ marginTop: 80, display: "flex", flexDirection: "column", gap: 40 }}>
              {[
                ["01", "Architectural Design", "Concept development, spatial planning, residential and commercial design, documentation, and planning-oriented architectural solutions."],
                ["02", "Consultancy", "Feasibility guidance, architectural advisory, project development support, regulatory awareness, and strategic decision-making."],
                ["03", "Supervision", "Site monitoring, quality assurance, design implementation oversight, and coordination between client, consultants, and contractors."],
              ].map(([number, title, text], index) => (
                <motion.div key={title} className="mobileStack" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ ...transition, delay: index * 0.1 }} style={{ display: "grid", gridTemplateColumns: "80px 1fr 1.5fr", gap: 40, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 40, alignItems: "start" }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "rgba(255,255,255,0.3)" }}>{number}</div>
                  <h3 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>{title}</h3>
                  <p style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.6)", margin: 0 }}>{text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginTop: 60 }}>
              <Link href="/services" style={{ background: "white", color: "black", padding: "14px 28px", borderRadius: 99, fontWeight: 700, fontSize: 14, textDecoration: "none", display: "inline-block" }}>Explore Services</Link>
            </motion.div>
          </div>
        </section>

        {/* 5. TEAM */}
        <section className="mobilePad" style={{ padding: "120px 0" }}>
          <div className="containerWide">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={transition}>
              <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6 }}>Team</div>
              <h2 style={{ marginTop: 20, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 900 }}>A studio shaped by collaboration,<br />technical focus, and shared responsibility.</h2>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={transition} style={{ position: "relative", width: "100%", aspectRatio: "21/9", marginTop: 60, overflow: "hidden", background: "#111" }}>
              <Image src="/team.png" alt="IMVO office team photo" fill sizes="100vw" style={{ objectFit: "contain", filter: "grayscale(100%)" }} />
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40, marginTop: 40 }}>
              {teamMembers.map((member, index) => (
                <motion.div key={member.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ ...transition, delay: index * 0.1 }}>
                  <div style={{ position: "relative", aspectRatio: "3/4", background: "#111", overflow: "hidden" }}>
                    <Image src={member.image} alt={member.name} fill sizes="(max-width: 768px) 100vw, 25vw" style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(5,5,5,0.9)", padding: 30, opacity: 0, transition: "opacity 0.3s ease", display: "flex", flexDirection: "column", justifyContent: "center" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}>
                      <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.8)" }}>{member.description}</p>
                    </div>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>{member.name}</h3>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "4px 0 0" }}>{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CTA */}
        <section className="mobilePad" style={{ padding: "100px 0", background: "#111", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="containerWide mobileStack" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 40 }}>
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={transition} style={{ maxWidth: 600 }}>
              <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6 }}>Start a conversation</div>
              <h2 style={{ marginTop: 16, fontSize: "clamp(36px, 4vw, 54px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 900 }}>Let’s shape an environment that endures.</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ ...transition, delay: 0.2 }}>
              <Link href="/contact#quote" style={{ background: "white", color: "black", padding: "16px 32px", borderRadius: 99, fontWeight: 800, fontSize: 15, textDecoration: "none", display: "inline-block" }}>
                Request a Quote
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
}