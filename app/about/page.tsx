"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// --- ANIMATED BLUEPRINT COMPONENT ---
const BlueprintBackground = () => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.8 }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: 0 }}>
      {/* Dense Architectural Grid Matrix */}
      <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Primary Horizontal & Vertical Draft Lines */}
      <motion.path d="M -100 250 L 3000 250" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="transparent" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 7, repeat: Infinity, ease: "linear" }} />
      <motion.path d="M -100 600 L 3000 600" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="transparent" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 2 }} />
      <motion.path d="M 350 -100 L 350 3000" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="15, 15" fill="transparent" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 1 }} />
      <motion.path d="M 850 -100 L 850 3000" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="transparent" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 3 }} />

      {/* Perspective / Diagonal Lines */}
      <motion.path d="M 0 1000 L 1500 -200" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="5, 5" fill="transparent" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 1 }} />
      
      {/* Architectural Radii / Swing Arcs */}
      <motion.circle cx="450" cy="500" r="150" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="5, 10" fill="transparent" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
      
      {/* Floorplan Structural Walls & Boxes */}
      <motion.rect x="450" y="350" width="500" height="300" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="transparent" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      <motion.rect x="400" y="300" width="200" height="400" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10, 10" fill="transparent" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} />
    </svg>
  </div>
);

// COMBINED TEAM ARRAY
const teamMembers = [
  {
    name: "Arch. ASINGIZWE BENJAMIN MARIE MERCI",
    role: "Principal Architect & Design Lead",
    image: "/team1.png",
    description: "Experienced in architectural design, urbanism, and environmentally responsive development — focused on spatial clarity.",
  },
  {
    name: "Phd. Eng. RUKUNDO Prince",
    role: "Principal Engineer & Execution Lead",
    image: "/team3.png",
    description: "PhD holder in Civil Engineering with expertise in roads, infrastructure systems, and urbanism.",
  },
  {
    name: "SHEMA BAMBI Antonella M.",
    role: "Consultancy & Strategy",
    image: "/team2.png",
    description: "Combines expertise in IT development, strategic consultancy, and project coordination.",
  },
  {
    name: "KANGWAGYE Sharon",
    role: "Project Coordination",
    image: "/team4.png",
    description: "Experienced in digital commerce, market strategy, and growth coordination.",
  }
];

const timeline = [
  { year: "2017", title: "Origins & Ideation", description: "Initial foundation of the studio's philosophy, establishing a core focus on structural integrity and context-driven design logic." },
  { year: "2020", title: "Registration & Operations", description: "Official registration of the firm, moving from conceptual philosophy into active architectural modeling and professional operations." },
  { year: "2021", title: "Asian Architectural Exposure", description: "International study and immersion in major Chinese cities, including Xi'an, integrating broad urban masterplanning concepts into the firm's approach." },
  { year: "2022", title: "Middle Eastern Scaling", description: "Architectural exposure across Dubai, Sharjah, and Abu Dhabi. Absorbing advanced modernism, extreme structural scaling, and high-end commercial aesthetics." },
  { year: "2023", title: "Rwandan Execution", description: "Official commencement of large-scale operations in Rwanda, translating global architectural exposure into contextually sensitive, local execution." },
];

const testimonials = [
  { text: "I had an excellent experience with IMVO GROUP AFRICA! Their team is professional, attentive, and dedicated to outstanding service. Communication was seamless, and their commitment to quality and sustainability is impressive. Highly recommended!", author: "Eric IRANKUNDA", date: "6 months ago" },
  { text: "Working with IMVO was a moving experience. They don't just focus on the commercial aspect; their designs genuinely empower people and elevate the built environment.", author: "Peace Aime HIRWA", date: "February 2022" },
  { text: "Thank you for the amazing work you have done for us. Your attention to detail is highly appreciated!", author: "Umutoni Leon Clement", date: "March 2020" },
  { text: "IMVO offers exceptional architectural services. It was an absolute pleasure working with the team.", author: "Nkuliye Stewart", date: "February 2021" },
  { text: "A display of absolute professionalism from concept to execution.", author: "Bahiga Jean Claude", date: "August 2020" },
  { text: "The spatial clarity and execution-aware mindset of IMVO set them apart in the region.", author: "Ukiriho Rene J Felix", date: "Client Review" },
  { text: "Their technical discipline and understanding of structural proportion gave us complete confidence.", author: "Dushime Brown", date: "Client Review" },
  { text: "A brilliant studio. The team's ability to navigate complex zoning and environmental constraints is remarkable.", author: "Lishirabake Olivier", date: "Client Review" },
  { text: "IMVO delivered a contextually sensitive design that perfectly aligned with our operational ambitions.", author: "Shema Blaise Ally", date: "Client Review" },
  { text: "High-end aesthetic merged with strict engineering standards. Truly a world-class architectural practice.", author: "Ndizihiwe Alain JS", date: "Client Review" },
  { text: "From the initial site analysis to the final photorealistic visualizations, their communication was flawless.", author: "Staphord N.S", date: "Client Review" },
  { text: "A highly collaborative and innovative team. They protected the design intent through every phase of construction.", author: "Olivier Kamali", date: "Client Review" }
];

const transition = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const };

export default function AboutPage() {
  return (
    <div style={{ background: "#050505", color: "white", minHeight: "100vh", overflow: "hidden", position: "relative" }}>
      
      {/* 1. HERO TYPOGRAPHY */}
      <section style={{ paddingTop: "25vh", paddingBottom: "10vh", position: "relative", zIndex: 10 }}>
        <BlueprintBackground />
        <div className="containerWide" style={{ position: "relative", zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.1 }} style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6 }}>
            Studio IMVO
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.2 }} style={{ margin: "24px 0 0", fontSize: "clamp(46px, 6vw, 110px)", lineHeight: 0.9, letterSpacing: "-0.04em", fontWeight: 900, maxWidth: 1200 }}>
            Built on clarity,<br />context, and execution.
          </motion.h1>
        </div>
      </section>

      {/* 2. HERO IMAGE REVEAL */}
      <section style={{ paddingBottom: "120px", position: "relative", zIndex: 10 }}>
        <div className="containerWide">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...transition, delay: 0.4 }} style={{ position: "relative", width: "100%", aspectRatio: "21/9", background: "#111", overflow: "hidden" }}>
            <Image src="/about-hero.png" alt="IMVO Studio Philosophy" fill sizes="100vw" style={{ objectFit: "cover", filter: "brightness(0.8)" }} />
          </motion.div>
        </div>
      </section>

      {/* 3. MANIFESTO / ORIGIN STORY WITH ANIMATED BLUEPRINT */}
      <section className="mobilePad" style={{ position: "relative", padding: "80px 0 160px 0" }}>
        <BlueprintBackground />
        <div className="containerWide mobileStack" style={{ position: "relative", zIndex: 10, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "80px", alignItems: "start" }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={transition}>
            <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
              The Genesis of IMVO.<br/>
              Intellectu · Mens.<br/>
              <span style={{ color: "white", opacity: 0.5 }}>Visio · Origo.</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ ...transition, delay: 0.2 }}>
            <p style={{ fontSize: "clamp(20px, 3vw, 32px)", lineHeight: 1.4, margin: 0, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
              The studio was not founded simply to draw. IMVO emerged from a rigorous technical need to merge deep contextual study (Intellectu) with execution-aware planning. We approach architecture as an integrated system of proportion, function, material logic, and regulatory discipline.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: "rgba(255,255,255,0.6)", marginTop: 40, maxWidth: 700 }}>
              Before form comes context. Our foundation is built on analyzing the regional landscape, the history of the site, and the operational ambition of the client. Through advanced BIM modeling and photorealistic visualization, we translate this raw data into technical documentation that guarantees sustainability, function, and long-term architectural value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. STUDIO CULTURE & TEAM PHOTO */}
      <section className="mobilePad" style={{ padding: "120px 0", background: "#0a0a0a", position: "relative", zIndex: 10 }}>
        <div className="containerWide">
          <div className="mobileStack" style={{ display: "flex", flexWrap: "wrap", gap: "60px", alignItems: "center" }}>
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={transition} style={{ flex: "1 1 350px", maxWidth: "500px" }}>
              <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6 }}>Studio Culture</div>
              <h2 style={{ marginTop: 20, fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.04em", fontWeight: 900 }}>
                A collaborative space built for technical excellence.
              </h2>
              <p style={{ marginTop: 30, fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}>
                Our studio operates as a highly integrated unit. We believe that the best architecture emerges when design, engineering, and project management happen concurrently rather than sequentially. Our team is dedicated to constant learning, utilizing industry-leading structural analysis and modeling tools to bring visionary concepts into reality.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ ...transition, delay: 0.2 }} style={{ flex: "2 1 600px", position: "relative", width: "100%", aspectRatio: "16/10", background: "#111", overflow: "hidden" }}>
              <Image src="/team.png" alt="IMVO Office Team Photo" fill sizes="(max-width: 900px) 100vw, 70vw" style={{ objectFit: "cover", filter: "grayscale(100%)" }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. PILLAR 01: ARCHITECTURAL DESIGN */}
      <section className="mobilePad" style={{ padding: "160px 0", borderTop: "1px solid rgba(255,255,255,0.05)", position: "relative", zIndex: 10 }}>
        <div className="containerWide">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={transition}>
            <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6, color: "white", fontWeight: 800 }}>Pillar 01</div>
            <h2 style={{ marginTop: 20, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 900 }}>
              Architectural Design.<br/>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(24px, 3vw, 42px)" }}>The IMVO Framework from Stage 0 to Handover.</span>
            </h2>
          </motion.div>

          <div style={{ marginTop: 100, position: "relative" }}>
            <div style={{ position: "absolute", top: "120px", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.1) 100%)", zIndex: 0 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 20, position: "relative", zIndex: 1 }}>
              {[
                { step: "01", name: "Brief & Site", desc: "Zoning, ambition, and topography analysis.", icon: "M20 10 L40 10 L40 50 L20 50 Z M30 20 L50 20 L50 60 L30 60 Z" },
                { step: "02", name: "Concept", desc: "Volumetric studies and spatial strategies.", icon: "M30 10 L50 20 L30 30 L10 20 Z M10 20 L10 50 L30 60 L30 30 Z M50 20 L50 50 L30 60 Z" },
                { step: "03", name: "Schematic", desc: "Detailed floor plans and aesthetic language.", icon: "M10 10 L50 10 L50 50 L10 50 Z M25 10 L25 50 M10 25 L50 25" },
                { step: "04", name: "Engineering", desc: "Structural, MEP, and regulatory BIM.", icon: "M30 10 A20 20 0 1 0 30 50 A20 20 0 1 0 30 10 M30 20 A10 10 0 1 0 30 40 A10 10 0 1 0 30 20" },
                { step: "05", name: "Execution", desc: "Strict site supervision and quality assurance.", icon: "M15 10 L15 60 M45 10 L45 60 M15 25 L45 15 M15 45 L45 35 M15 60 L45 50" },
                { step: "06", name: "Handover", desc: "Final delivery of the built environment ensuring absolute client satisfaction.", icon: "M30 10 L50 25 L50 60 L10 60 L10 25 Z" }
              ].map((phase, i) => (
                <motion.div key={phase.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ ...transition, delay: i * 0.1 }} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", marginBottom: 30 }}>{phase.name}</div>
                  <div style={{ width: "100%", height: "80px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 30 }}>
                    <svg width="60" height="70" viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
                      <path d={phase.icon} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div style={{ width: 8, height: 8, background: "white", borderRadius: "50%", margin: "0 auto 30px auto", boxShadow: "0 0 10px rgba(255,255,255,0.8)" }} />
                  <div style={{ fontSize: 18, fontWeight: 800, margin: "0 0 10px 0" }}>Stage {phase.step}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.4)", margin: "0 auto", maxWidth: 160 }}>{phase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. TIMELINE & HISTORY */}
      <section className="mobilePad" style={{ position: "relative", padding: "120px 0", background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
        <BlueprintBackground />
        <div className="containerWide mobileStack" style={{ position: "relative", zIndex: 10, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 80 }}>
          <div>
            <div style={{ position: "sticky", top: "140px" }}>
              <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6 }}>Trajectory</div>
              <h2 style={{ marginTop: 20, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 900 }}>Firm History.</h2>
            </div>
          </div>
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.3)", paddingLeft: 40, display: "flex", flexDirection: "column", gap: 80 }}>
            {timeline.map((event, index) => (
              <motion.div key={event.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ ...transition, delay: index * 0.1 }} style={{ position: "relative", background: "rgba(0,0,0,0.6)", padding: "30px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(10px)" }}>
                <div style={{ position: "absolute", left: -76, top: 36, width: 11, height: 11, borderRadius: "50%", background: "white", boxShadow: "0 0 15px rgba(255,255,255,0.8)" }} />
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 20 }}>
                  <h3 style={{ fontSize: 32, fontWeight: 900, margin: 0 }}>{event.year}</h3>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>{event.title}</span>
                </div>
                <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", maxWidth: 600 }}>{event.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PILLAR 02: CONSULTANCY & STRATEGY */}
      <section className="mobilePad" style={{ padding: "140px 0", background: "#050505", borderTop: "1px solid rgba(255,255,255,0.05)", position: "relative", zIndex: 10 }}>
        <div className="containerWide">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={transition}>
            <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6, color: "white", fontWeight: 800 }}>Pillar 02</div>
            <h2 style={{ marginTop: 20, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 900 }}>Consultancy &<br/>Strategic Guidance.</h2>
          </motion.div>
          <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
            {[
              { name: "Feasibility & Zoning Feasibility Studies", desc: "Strategic guidance before the concrete is poured. Analyzing land capability and regulatory constraints to ensure project viability.", icon: "M10 20 L50 20 M30 10 L30 30 M10 40 L50 40 M10 60 L50 60" },
              { name: "Zoning Feasibility Feasibility Studies", desc: "Analyzing zoning regulations and spatial optimization for land capability.", icon: "M20 20 M10 10 L50 50 M10 50 L50 10" }
            ].map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ ...transition, delay: index * 0.15 }} style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 30 }}>
                <div style={{ height: "60px", marginBottom: 30 }}>
                  <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d={service.icon} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 900, margin: "0 0 10px 0" }}>{service.name}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.6)", margin: 0 }}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PILLAR 03: SUPERVISION & EXECUTION */}
      <section className="mobilePad" style={{ padding: "140px 0", background: "#050505", borderTop: "1px solid rgba(255,255,255,0.1)", position: "relative", zIndex: 10 }}>
        <div className="containerWide">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={transition}>
            <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6, color: "white", fontWeight: 800 }}>Pillar 03</div>
            <h2 style={{ marginTop: 20, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 900 }}>Supervision &<br/>Design Execution.</h2>
          </motion.div>
          <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
            {[
              { name: "Strict Site Monitoring", desc: "Rigorous site presence overseeing material quality, structural integrity, and execution logic.", icon: "M30 10 L30 60 M15 25 L45 25 M15 45 L45 45 M10 60 L50 60" },
              { name: "Contractor Coordination", desc: "Acting as the bridge between the client's operational vision and construction teams, protecting design intent.", icon: "M10 20 L30 20 M10 30 L50 30 M30 10 L30 60 M10 40 L50 40" }
            ].map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ ...transition, delay: index * 0.15 }} style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 30 }}>
                <div style={{ height: "60px", marginBottom: 30 }}>
                  <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d={service.icon} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 900, margin: "0 0 10px 0" }}>{service.name}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.6)", margin: 0 }}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SINGLE LINE LEADERSHIP DIRECTORY */}
      <section className="mobilePad" style={{ padding: "120px 0", borderTop: "1px solid rgba(255,255,255,0.05)", background: "#0a0a0a", position: "relative", zIndex: 10 }}>
        <div className="containerWide">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={transition} style={{ textAlign: "center", marginBottom: 80 }}>
            <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6 }}>The Studio</div>
            <h2 style={{ marginTop: 20, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 900 }}>The architects & strategists<br />behind the work.</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "40px" }}>
            {teamMembers.map((member, index) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ ...transition, delay: index * 0.1 }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", background: "#111", overflow: "hidden" }}>
                  <Image src={member.image} alt={member.name} fill sizes="(max-width: 768px) 100vw, 25vw" style={{ objectFit: "cover", filter: "grayscale(100%) contrast(1.1)", transition: "transform 0.6s ease" }} onMouseEnter={(e) => { e.currentTarget.style.filter = "grayscale(0%) contrast(1)"; e.currentTarget.style.transform = "scale(1.03)"; }} onMouseLeave={(e) => { e.currentTarget.style.filter = "grayscale(100%) contrast(1.1)"; e.currentTarget.style.transform = "scale(1)"; }} />
                </div>
                <div style={{ marginTop: 24 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0, letterSpacing: "-0.01em" }}>{member.name}</h3>
                  <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "white", margin: "8px 0 16px 0", fontWeight: 700 }}>{member.role}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: 0 }}>{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS SECTION */}
      <section className="mobilePad" style={{ padding: "120px 0", background: "#050505", position: "relative", zIndex: 10 }}>
        <div className="containerWide">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={transition} style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6 }}>Client Perspectives</div>
            <h2 style={{ marginTop: 16, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Trusted by visionaries.</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ ...transition, delay: (index % 3) * 0.15 }} style={{ background: "#111", padding: "40px", border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                     {[...Array(5)].map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                     ))}
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.8)", margin: "0 0 30px 0" }}>"{testimonial.text}"</p>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800 }}>{testimonial.author}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{testimonial.date}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. PREMIUM FINAL CTA (With Studio Deck Link) */}
      <section className="mobilePad" style={{ padding: "160px 0", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)", background: "#050505", position: "relative", overflow: "hidden" }}>
        <BlueprintBackground />
        <div style={{ position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />
        <div className="containerWide" style={{ position: "relative", zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={transition}>
            <h2 style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-0.04em", margin: 0 }}>Ready to shape<br/>the future together?</h2>
            <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "24px auto" }}>Initiate the IMVO design process. Let's discuss how we can bring technical discipline and spatial clarity to your next vision.</p>
            <div style={{ marginTop: 60, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact#quote" style={{ background: "white", color: "black", padding: "20px 48px", borderRadius: 99, fontWeight: 800, fontSize: 16, textDecoration: "none", display: "inline-block", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>START A CONVERSATION ↗</Link>
              <a href="/studio-deck.pdf" download="IMVO_Studio_Deck.pdf" style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "20px 48px", borderRadius: 99, fontWeight: 800, fontSize: 16, textDecoration: "none", display: "inline-block", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>DOWNLOAD STUDIO DECK ↓</a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}