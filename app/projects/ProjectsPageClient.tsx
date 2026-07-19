"use client";

import { motion } from "framer-motion";
import type { Project } from "./projectsData";
import ProjectsMasonry from "./ProjectsMasonry";

const transition = { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const };

const BlueprintBackground = () => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.42 }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: 0 }}>
      <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

const FloorPlanLines = () => {
  const paths = [
    "M120 220 H520 V330 H650 V520 H430 V620 H180 V470 H120 Z",
    "M180 470 H430 M430 520 H650 M300 220 V470 M520 220 V330",
    "M210 260 H370 V380 H210 Z",
    "M410 260 H500 V330 H410 Z",
    "M210 510 H350 V590 H210 Z",
    "M470 370 H610 V500 H470 Z",
    "M120 470 H70 M650 520 H710 M300 220 V160 M430 620 V690",
  ];

  return (
    <div
      className="desktopNav"
      style={{
        position: "absolute",
        right: "-4%",
        top: "-8%",
        width: "62%",
        height: "125%",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.9,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 800 800" style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id="planGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.075)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="410" cy="430" r="360" fill="url(#planGlow)" />

        {/* Static faint floor plan */}
        <g transform="rotate(-8 400 400)">
          {paths.map((d, i) => (
            <path
              key={`static-${i}`}
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={i === 0 ? 1.5 : 1}
            />
          ))}

          {/* Shooting-star drawing lines */}
          {paths.map((d, i) => (
            <motion.path
              key={`shooting-${i}`}
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth={i === 0 ? 2 : 1.5}
              strokeLinecap="round"
              strokeDasharray="90 900"
              filter="url(#lineGlow)"
              initial={{ strokeDashoffset: 900, opacity: 0 }}
              animate={{
                strokeDashoffset: [900, 0, -900],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5.5 + i * 0.45,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.55,
              }}
            />
          ))}

          {/* Architectural nodes */}
          {[
            [120, 220],
            [520, 220],
            [650, 330],
            [650, 520],
            [430, 620],
            [180, 620],
            [120, 470],
            [300, 220],
            [430, 520],
          ].map(([cx, cy], i) => (
            <motion.circle
              key={`node-${i}`}
              cx={cx}
              cy={cy}
              r={3}
              fill="white"
              animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.4, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
              style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.75))" }}
            />
          ))}

          {/* Measurement marks */}
          <g stroke="rgba(255,255,255,0.18)" strokeWidth="1">
            <path d="M120 700 H650" />
            <path d="M120 690 V710 M650 690 V710" />
            <path d="M735 220 V620" />
            <path d="M725 220 H745 M725 620 H745" />
          </g>

          <text x="330" y="728" fill="rgba(255,255,255,0.32)" fontSize="11" fontWeight="900" letterSpacing="3">
            FLOOR PLAN STUDY
          </text>
          <text x="755" y="435" fill="rgba(255,255,255,0.26)" fontSize="10" fontWeight="900" letterSpacing="3" transform="rotate(90 755 435)">
            SPATIAL LOGIC
          </text>
        </g>
      </svg>
    </div>
  );
};

export default function ProjectsPageClient({ projects }: { projects: Project[] }) {
  return (
    <div style={{ background: "#050505", color: "white", minHeight: "100vh" }}>
      <section
        className="mobilePad"
        style={{
          paddingTop: "22vh",
          paddingBottom: "12vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <BlueprintBackground />
        <FloorPlanLines />

        <div className="containerWide" style={{ position: "relative", zIndex: 10 }}>
          <div style={{ maxWidth: 900 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.1 }}
              style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12, opacity: 0.6 }}
            >
              Projects
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.2 }}
              style={{
                margin: "24px 0 0",
                fontSize: "clamp(46px, 6vw, 110px)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                fontWeight: 900,
              }}
            >
              Built studies across
              <br />
              design, context,
              <br />
              and execution.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...transition, delay: 0.4 }}
              style={{
                marginTop: 36,
                maxWidth: 600,
                fontSize: 18,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              A curated portfolio of residential, commercial, institutional, hospitality, and urban work — presented through scale, atmosphere, material thinking, and project discipline.
            </motion.p>
          </div>
        </div>
      </section>

      <ProjectsMasonry projects={projects} />
    </div>
  );
}
