"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const transition = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const };

const BlueprintBackground = () => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.42 }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: 0 }}>
      <pattern id="services-grid" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#services-grid)" />
      <motion.path d="M -100 260 L 3000 260" stroke="rgba(255,255,255,0.28)" strokeWidth="1.4" fill="transparent" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }} />
      <motion.path d="M 420 -100 L 420 3000" stroke="rgba(255,255,255,0.22)" strokeWidth="1.4" strokeDasharray="15, 15" fill="transparent" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 13, repeat: Infinity, ease: "linear", delay: 1 }} />
      <motion.circle cx="520" cy="460" r="150" stroke="rgba(255,255,255,0.28)" strokeWidth="1.3" strokeDasharray="5, 10" fill="transparent" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
      <motion.rect x="520" y="330" width="460" height="280" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" fill="transparent" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
    </svg>
  </div>
);

const OrbitBackground = () => {
  const orbits = [
    { d: "M -200,200 C 400,-100 1000,900 2200,300", delay: 0, duration: 12, length: 0.1 },
    { d: "M -100,800 C 500,1100 1200,0 2200,600", delay: 3, duration: 15, length: 0.08 },
    { d: "M 400,-200 C 300,500 1400,800 1800,1200", delay: 1.5, duration: 10, length: 0.12 },
    { d: "M 2200,-100 C 1400,300 400,800 -200,900", delay: 5, duration: 14, length: 0.07 },
    { d: "M 0,500 C 600,500 1000,100 2200,900", delay: 2, duration: 11, length: 0.09 },
    { d: "M -300,0 C 200,800 1500,-200 2500,500", delay: 7, duration: 18, length: 0.05 },
    { d: "M 800,1200 C 900,400 1200,200 2000,-200", delay: 4, duration: 13, length: 0.15 },
    { d: "M 2500,800 C 1500,1000 800,-100 -200,200", delay: 1, duration: 16, length: 0.08 },
    { d: "M 100,-300 C 500,200 1800,1000 2400,800", delay: 6, duration: 14, length: 0.1 },
    { d: "M -200,1000 C 800,900 1600,100 2500,-100", delay: 2.5, duration: 12, length: 0.11 },
    { d: "M 1200,-300 C 1000,400 800,900 -100,1100", delay: 8, duration: 17, length: 0.06 }
  ];

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
      <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0 }}>
        {orbits.map((orbit, i) => (
          <React.Fragment key={i}>
            <path d={orbit.d} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
            <motion.path
              d={orbit.d} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"
              initial={{ pathLength: orbit.length, pathOffset: 0, opacity: 0 }}
              animate={{ pathOffset: [0, 1], opacity: [0, 1, 1, 0] }}
              transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear", delay: orbit.delay, times: [0, 0.1, 0.9, 1] }}
            />
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
};

const SERVICES_DATA = [
  {
    number: "01",
    title: "Architectural Design",
    description: "We translate ambition into buildable architecture through concept design, spatial planning, technical documentation, and execution-aware detailing.",
    icon: "M10 10 L50 10 L50 50 L10 50 Z M25 10 L25 50 M10 25 L50 25",
    bricks: ["Concept Design", "Schematic Design", "Detailed Design", "Construction Documentation", "Design Development", "Architectural Renovation & Extensions", "Interior Architecture", "Interior Space Planning", "Workplace Design", "Hospitality Interiors", "Residential Interiors", "Material & Finish Selection", "Digital Design & Visualization", "BIM Modeling", "3D Visualization", "Photorealistic Rendering", "Virtual Walkthroughs", "Design Coordination", "Sustainable Design", "Climate-Responsive Design", "Wellbeing-Oriented Environments", "Daylighting Strategies", "Passive Design Solutions", "Landscape Integration", "Site Design", "Outdoor Space Planning", "Landscape Coordination"],
  },
  {
    number: "02",
    title: "Consultancy & Strategy",
    description: "Strategic guidance that reduces risk and unlocks development value — from site feasibility to zoning, development logic, and project positioning.",
    icon: "M10 20 L50 20 M30 10 L30 30 M10 42 L50 42 M10 58 L50 58",
    bricks: ["Property Development Advisory", "Property Development Guidance", "Development Feasibility Studies", "Highest & Best Use Analysis", "Development Strategy", "Project Phasing", "Development Risk Assessment", "Property Acquisition Advisory", "Site Due Diligence", "Property Acquisition Guidance", "Land Potential Assessment", "Development Suitability Reviews", "Site Constraint Analysis", "Urban Planning & Master Planning", "Urban Planning", "Master Planning", "Land Use Planning", "Site Planning", "Density & Development Analysis", "Infrastructure Integration", "Construction Permit Applications", "Permit Documentation Preparation", "Approval Process Coordination", "Regulatory Compliance Reviews", "Authority Liaison & Follow-Up", "Development Compliance Advisory", "Project Planning", "Consultant Coordination", "Procurement Advisory", "Sustainability Consulting", "Technical Due Diligence", "Investment Support"],
  },
  {
    number: "03",
    title: "Supervision & Execution",
    description: "We protect design intent through disciplined site observation, contractor coordination, quality control, and implementation oversight.",
    icon: "M30 10 L30 60 M15 25 L45 25 M15 45 L45 45 M10 60 L50 60",
    bricks: ["Construction Supervision", "Site Supervision", "Construction Monitoring", "Design Compliance Verification", "Technical Site Inspections", "Quality Assurance", "Quality Control Reviews", "Material Compliance Checks", "Workmanship Assessment", "Defect Identification", "Contract Administration", "Progress Certification", "Payment Certification", "Variation Assessment", "Claims Review", "Contractor Performance Monitoring", "Project Delivery Oversight", "Construction Progress Reporting", "Schedule Monitoring", "Budget Monitoring", "Stakeholder Coordination", "Risk Management", "Snagging Inspections", "Practical Completion Reviews", "Final Compliance Verification", "Handover Coordination", "As-Built Documentation Review"],
  },
];

const processSteps = [
  ["01", "Discover", "We study goals, site conditions, constraints, budget realities, and stakeholder priorities."],
  ["02", "Define", "We clarify project direction, scope, planning logic, risks, and the strategic path forward."],
  ["03", "Develop", "We translate direction into spatial concepts, documentation, and buildable design."],
  ["04", "Deliver", "We support implementation through supervision, coordination, and execution discipline."],
];

const strategicPartners = [
  {
    name: "Qonics Inc",
    logo: "/partners/partner-1.png",
    href: "https://www.qonics.com",
  },
  {
    name: "BM Engineering",
    logo: "/partners/partner-2.png",
    href: "https://bminvestmentsltd.com/",
  },
  {
    name: "Show Makerz",
    logo: "/partners/partner-3.png",
    href: "https://showmakerzpaint.rw/",
  },
  {
    name: "Optimus Anchor",
    logo: "/partners/partner-4.png",
    href: "https://YOUR-LINK-HERE.com",
  },
  {
    name: "Operra",
    logo: "/partners/partner-5.png",
    href: "https://YOUR-LINK-HERE.com",
  },
  {
    name: "Select food africa",
    logo: "/partners/partner-6.png",
    href: "https://YOUR-LINK-HERE.com",
  },
  {
    name: "Ad Agency",
    logo: "/partners/partner-7.png",
    href: "https://YOUR-LINK-HERE.com",
  },
  {
    name: "Baho holdings",
    logo: "/partners/partner-8.png",
    href: "https://YOUR-LINK-HERE.com",
  },
  {
    name: "Mette",
    logo: "/partners/partner-9.png",
    href: "https://YOUR-LINK-HERE.com",
  },
];

const hoverImageStyle = {
  objectFit: "cover" as const,
  filter: "grayscale(100%) contrast(1.05)",
  transition: "filter 0.8s ease, transform 0.8s ease",
};

const AnimatedBrick = ({ brick, index }: { brick: string, index: number }) => {
  const isCheckered = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.035, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.5)", zIndex: 20 }}
      style={{
        padding: "14px 22px",
        border: isCheckered ? "1px solid rgba(255,255,255,0.15)" : "1px solid transparent",
        background: isCheckered ? "rgba(5,5,5,0.6)" : "rgba(255,255,255,0.06)",
        backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.8)", borderRadius: "4px", fontSize: "14px", fontWeight: 800, cursor: "default", position: "relative", zIndex: 10, whiteSpace: "nowrap",
      }}
    >
      {brick}
    </motion.div>
  );
};

const StrategicPartners = () => {
  const partnersLoop = [...strategicPartners, ...strategicPartners];

  return (
    <section
      className="mobilePad"
      style={{
        padding: "110px 0 0",
        background: "#050505",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        overflow: "hidden",
      }}
    >
      <style>
        {`
          @keyframes partners-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }

          .partners-track {
            animation: partners-scroll 42s linear infinite;
          }

          .partners-band:hover .partners-track {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="containerWide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={transition}
          style={{ maxWidth: 760 }}
        >
          <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6, fontWeight: 800 }}>
            Strategic Partners
          </div>

          <h2 style={{ margin: "18px 0 0", fontSize: "clamp(34px, 4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 900 }}>
            A trusted network supporting responsible project delivery.
          </h2>

          <p style={{ marginTop: 22, maxWidth: 680, fontSize: 17, lineHeight: 1.8, color: "rgba(255,255,255,0.62)" }}>
            IMVO works with selected collaborators, technical specialists, suppliers, and industry partners who help strengthen project execution from planning through delivery.
          </p>
        </motion.div>
      </div>

      <div
        className="partners-band"
        style={{
          marginTop: 70,
          overflow: "hidden",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="partners-track"
          style={{
            display: "flex",
            width: "fit-content",
          }}
        >
          {partnersLoop.map((partner, index) => (
            <a
              key={`${partner.name}-${index}`}
              href={partner.href}
              target={partner.href === "#" ? undefined : "_blank"}
              rel={partner.href === "#" ? undefined : "noopener noreferrer"}
              style={{
                width: 240,
                height: 130,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRight: "1px solid rgba(255,255,255,0.06)",
                opacity: 0.5,
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.5";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={220}
                height={105}
                style={{
                  objectFit: "contain",
                  maxWidth: "84%",
                  maxHeight: "78%",
                  filter: "grayscale(100%) brightness(1.9)",
                  transition: "filter 0.35s ease, transform 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "grayscale(0%) brightness(1)";
                  e.currentTarget.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "grayscale(100%) brightness(1.9)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function ServicesPage() {
  const [activePillar, setActivePillar] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePillar((current) => (current + 1) % SERVICES_DATA.length);
    }, 14000);
    return () => clearInterval(interval);
  }, []);

  const currentPillar = SERVICES_DATA[activePillar];
  const total = currentPillar.bricks.length;
  const sideCount = Math.floor(total * 0.4); 
  const centerTotal = total - (sideCount * 2);
  const topCount = Math.ceil(centerTotal / 2);

  const leftBricks = currentPillar.bricks.slice(0, sideCount);
  const rightBricks = currentPillar.bricks.slice(sideCount, sideCount * 2);
  const topBricks = currentPillar.bricks.slice(sideCount * 2, sideCount * 2 + topCount);
  const bottomBricks = currentPillar.bricks.slice(sideCount * 2 + topCount);

  return (
    <div style={{ background: "#050505", color: "white", minHeight: "100vh", overflow: "hidden" }}>
            <section className="mobileStack" style={{ minHeight: "calc(100vh - 88px)", display: "grid", gridTemplateColumns: "0.92fr 1.08fr", background: "#050505", color: "white", overflow: "hidden" }}>
        <div style={{ padding: "90px max(32px, calc((100vw - 1440px) / 2 + 32px)) 70px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.1 }} style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.65, fontWeight: 800 }}>
            IMVO Services
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.2 }} style={{ margin: "24px 0 0", fontSize: "clamp(54px,7vw,118px)", lineHeight: 0.88, letterSpacing: "-0.08em", fontWeight: 900 }}>
            Design.<br />Consult.<br />Supervise.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.35 }} style={{ marginTop: 30, maxWidth: 720, fontSize: 19, lineHeight: 1.8, color: "rgba(255,255,255,0.72)" }}>
            IMVO guides purposeful development through architectural design, strategic consultancy, and disciplined supervision — connecting vision, planning, technical clarity, and execution.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.45 }} style={{ marginTop: 38, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/contact#quote" style={{ background: "white", color: "black", padding: "16px 30px", borderRadius: 99, fontWeight: 800, textDecoration: "none", transition: "transform 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
              REQUEST A QUOTE ↗
            </Link>

            <Link href="/projects" style={{ color: "white", padding: "16px 30px", borderRadius: 99, fontWeight: 800, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)", transition: "background 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
              VIEW PROJECTS
            </Link>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...transition, delay: 0.25 }} style={{ position: "relative", minHeight: "calc(100vh - 88px)", overflow: "hidden" }}>
          <Image
            src="/services-hero.png"
            alt="IMVO architectural services"
            fill
            priority
            style={{ objectFit: "cover", filter: "grayscale(100%) brightness(0.75)", transition: "filter 0.8s ease, transform 0.8s ease" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "grayscale(0%) brightness(0.9)";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "grayscale(100%) brightness(0.75)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        </motion.div>
      </section>

      <section className="mobilePad" style={{ padding: "160px 0", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
        <div className="containerWide" style={{ display: "flex", justifyContent: "center" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={transition} style={{ maxWidth: 1000, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6, fontWeight: 800 }}>
              Purposeful Development
            </div>

            <h2 style={{ marginTop: 18, fontSize: "clamp(38px, 5vw, 72px)", lineHeight: 1.02, letterSpacing: "-0.05em", fontWeight: 900 }}>
              Architecture should do more than occupy land.
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 32, alignItems: "center" }}>
              <p style={{ margin: "0 auto", maxWidth: 820, fontSize: 19, lineHeight: 1.8, color: "rgba(255,255,255,0.8)" }}>
                It should organize experience, respond to context, support human wellbeing, and create lasting environmental and economic value through disciplined planning and thoughtful execution.
              </p>

              <p style={{ margin: "0 auto", maxWidth: 820, fontSize: 19, lineHeight: 1.8, color: "rgba(255,255,255,0.65)" }}>
                A successful project begins long before the first line is drawn. It starts by listening to the site—understanding the topography, the climate, and the specific rhythm of the surrounding community. Whether navigating complex topographical constraints like designing elevated foundations near sensitive wetland boundaries, or conducting feasibility analyses for expansive multi-use parcels, our approach remains deeply analytical.
              </p>

              <p style={{ margin: "0 auto", maxWidth: 820, fontSize: 19, lineHeight: 1.8, color: "rgba(255,255,255,0.65)" }}>
                We believe that true spatial clarity emerges when a building feels inevitable to its location. By merging rigorous technical discipline with modern, lifestyle-centric aesthetics, we ensure that every structure not only meets the immediate functional needs of its users but contributes to a broader, forward-looking architectural narrative.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mobilePad" style={{ padding: "140px 0", background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden", minHeight: "850px", display: "flex", alignItems: "center" }}>
        <OrbitBackground />

        <div className="containerWide" style={{ position: "relative", zIndex: 10, maxWidth: "1500px" }}>
          <AnimatePresence mode="wait">
            <motion.div key={activePillar} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px", width: "100%" }}>
              <div style={{ flex: "1 1 300px", display: "flex", flexWrap: "wrap", gap: "14px", alignContent: "center", justifyContent: "flex-end" }}>
                {leftBricks.map((brick, i) => <AnimatedBrick brick={brick} index={i} key={brick} />)}
              </div>

              <div style={{ flex: "0 1 640px", display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", justifyContent: "center" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px", width: "100%" }}>
                  {topBricks.map((brick, i) => <AnimatedBrick brick={brick} index={leftBricks.length + i} key={brick} />)}
                </div>

                <motion.div initial={{ scale: 0.95, opacity: 0, y: 15 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }} style={{ width: "100%", padding: "60px 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)", backdropFilter: "blur(12px)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)", zIndex: 20 }}>
                  <div style={{ textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 900, marginBottom: 24 }}>
                    Core Pillar 0{activePillar + 1}
                  </div>

                  <svg width="60" height="60" viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 24 }}>
                    <path d={currentPillar.icon} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                  <h2 style={{ margin: 0, fontSize: "clamp(38px, 4vw, 56px)", lineHeight: 1, letterSpacing: "-0.05em", fontWeight: 900 }}>
                    {currentPillar.title}
                  </h2>

                  <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", maxWidth: "90%" }}>
                    {currentPillar.description}
                  </p>

                  <div style={{ marginTop: 40, display: "flex", gap: 12 }}>
                    {SERVICES_DATA.map((pillar, i) => (
                      <button key={pillar.title} onClick={() => setActivePillar(i)} style={{ width: i === activePillar ? 40 : 12, height: 12, borderRadius: 99, border: "none", cursor: "pointer", background: i === activePillar ? "white" : "rgba(255,255,255,0.2)", transition: "all 0.4s ease" }} aria-label={`Show ${pillar.title}`} />
                    ))}
                  </div>
                </motion.div>

                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px", width: "100%" }}>
                  {bottomBricks.map((brick, i) => <AnimatedBrick brick={brick} index={leftBricks.length + topBricks.length + i} key={brick} />)}
                </div>
              </div>

              <div style={{ flex: "1 1 300px", display: "flex", flexWrap: "wrap", gap: "14px", alignContent: "center", justifyContent: "flex-start" }}>
                {rightBricks.map((brick, i) => <AnimatedBrick brick={brick} index={leftBricks.length + topBricks.length + bottomBricks.length + i} key={brick} />)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="mobileStack" style={{ display: "grid", gridTemplateColumns: "1.35fr 0.9fr", minHeight: 680, background: "#111" }}>
        <motion.div
  className="serviceMediaTall"
  initial={{ opacity: 0, scale: 0.96 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={transition}
  style={{
    position: "relative",
    overflow: "hidden",
    minHeight: 680,
    background: "#111",
  }}
>
          <Image src="/service-site-1.png" alt="IMVO on-site supervision" fill style={hoverImageStyle} onMouseEnter={(e) => { e.currentTarget.style.filter = "grayscale(0%) contrast(1)"; e.currentTarget.style.transform = "scale(1.03)"; }} onMouseLeave={(e) => { e.currentTarget.style.filter = "grayscale(100%) contrast(1.05)"; e.currentTarget.style.transform = "scale(1)"; }} />
        </motion.div>

        <div style={{ padding: "70px 44px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={transition}>
            <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6, fontWeight: 800 }}>
              On Site
            </div>

            <h2 style={{ margin: "18px 0 0", fontSize: "clamp(34px, 4vw, 64px)", lineHeight: 0.98, letterSpacing: "-0.06em", fontWeight: 900 }}>
              Design intent is protected through disciplined execution.
            </h2>

            <p style={{ marginTop: 24, color: "rgba(255,255,255,0.68)", lineHeight: 1.8, fontSize: 17 }}>
              Site observation, coordination, and quality awareness help ensure that what is designed can be built with clarity and responsibility.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mobilePad" style={{ position: "relative", minHeight: 720, display: "flex", alignItems: "flex-end", background: "#050505", overflow: "hidden" }}>
        <Image src="/service-planning.png" alt="Planning and design" fill style={{ objectFit: "cover", filter: "grayscale(100%) brightness(0.65)", transition: "filter 0.8s ease, transform 0.8s ease" }} onMouseEnter={(e) => { e.currentTarget.style.filter = "grayscale(0%) brightness(0.8)"; e.currentTarget.style.transform = "scale(1.03)"; }} onMouseLeave={(e) => { e.currentTarget.style.filter = "grayscale(100%) brightness(0.65)"; e.currentTarget.style.transform = "scale(1)"; }} />

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.2), transparent)" }} />

        <div className="containerWide" style={{ position: "relative", zIndex: 2, paddingBottom: 76 }}>
          <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={transition} style={{ maxWidth: 820 }}>
            <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.7, fontWeight: 800 }}>
              Planning & Development
            </div>

            <h2 style={{ margin: "18px 0 0", fontSize: "clamp(42px,5vw,86px)", lineHeight: 0.95, letterSpacing: "-0.07em", fontWeight: 900 }}>
              Before a project is built, its direction must be understood.
            </h2>

            <p style={{ marginTop: 24, maxWidth: 720, color: "rgba(255,255,255,0.76)", fontSize: 19, lineHeight: 1.8 }}>
              IMVO supports early-stage planning, development thinking, site interpretation, acquisition guidance, and strategic design direction before costly decisions are made.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mobilePad" style={{ padding: "120px 0", background: "#050505", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="containerWide">
          <div className="mobileStack" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 80 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={transition}>
              <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6, fontWeight: 800 }}>
                The Technological Edge
              </div>

              <h3 style={{ margin: "16px 0", fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.04em", fontWeight: 900 }}>
                Precision BIM & Immersive Visualization.
              </h3>

              <p style={{ fontSize: 17, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", margin: 0 }}>
                We eliminate ambiguity before construction begins. Our workflow is driven by industry-leading structural BIM and immersive visualization environments.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ ...transition, delay: 0.2 }}>
              <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6, fontWeight: 800 }}>
                Contextual Execution
              </div>

              <h3 style={{ margin: "16px 0", fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.04em", fontWeight: 900 }}>
                Mastering local topographies.
              </h3>

              <p style={{ fontSize: 17, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", margin: 0 }}>
                We translate complex site realities into secure development strategies. Whether engineering elevated structural foundations for wetland-adjacent topographies or conducting multi-use zoning feasibility for expansive 1+ hectare parcels in rapidly developing sectors like Kamonyi, IMVO secures the architectural footprint against environmental and regulatory risks.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mobilePad" style={{ position: "relative", padding: "150px 0", background: "#0a0a0a", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <BlueprintBackground />

        <div className="containerWide" style={{ position: "relative", zIndex: 10 }}>
          <div className="mobileStack" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 60, alignItems: "center" }}>
           <motion.div
  className="serviceProcessMedia"
  initial={{ opacity: 0, scale: 0.96 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={transition}
  style={{
    position: "relative",
    width: "100%",
    minHeight: 660,
    overflow: "hidden",
    background: "#111",
  }}
>
  <Image
    src="/service-process.png"
    alt="IMVO service process"
    fill
    sizes="(max-width: 900px) 100vw, 50vw"
    style={{
      objectFit: "cover",
      filter: "grayscale(100%) contrast(1.05)",
      transition: "filter 0.5s ease, transform 0.5s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.filter = "grayscale(0%) contrast(1)";
      e.currentTarget.style.transform = "scale(1.03)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.filter = "grayscale(100%) contrast(1.05)";
      e.currentTarget.style.transform = "scale(1)";
    }}
  />
</motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={transition}>
              <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6, fontWeight: 800 }}>
                How We Work
              </div>

              <h2 style={{ margin: "18px 0 0", fontSize: "clamp(34px, 4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 900 }}>
                A structured process for clear decisions and responsible delivery.
              </h2>

              <div style={{ marginTop: 42 }}>
                {processSteps.map(([number, title, text]) => (
                  <div key={title} style={{ display: "grid", gridTemplateColumns: "54px 1fr", gap: 18, padding: "24px 0", borderTop: "1px solid rgba(255,255,255,0.16)" }}>
                    <div style={{ color: "rgba(255,255,255,0.42)", fontWeight: 900 }}>{number}</div>
                    <div>
                      <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.04em" }}>{title}</div>
                      <p style={{ marginTop: 8, fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.62)" }}>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <StrategicPartners />

      <section className="mobilePad" style={{ padding: "160px 0", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)", background: "#050505", position: "relative", overflow: "hidden" }}>
        <BlueprintBackground />

        <div style={{ position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />

        <div className="containerWide" style={{ position: "relative", zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={transition}>
            <h2 style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-0.04em", margin: 0 }}>
              Let’s define the right<br />service path for your project.
            </h2>

            <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.55)", maxWidth: "560px", margin: "24px auto" }}>
              Whether you need design, consultancy, supervision, development guidance, or acquisition support, IMVO helps structure decisions before they become costly.
            </p>

            <div style={{ marginTop: 60, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact#quote" style={{ background: "white", color: "black", padding: "20px 48px", borderRadius: 99, fontWeight: 800, fontSize: 16, textDecoration: "none", display: "inline-block", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                REQUEST A QUOTE ↗
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
