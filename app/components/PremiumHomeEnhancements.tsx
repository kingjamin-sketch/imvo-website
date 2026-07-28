"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const transition = { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const };

function CursorProjectReveal() {
  const [position, setPosition] = useState({ x: 58, y: 46 });
  const [hasFinePointer, setHasFinePointer] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setHasFinePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const updatePosition = (clientX: number, clientY: number, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    setPosition({
      x: Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)),
      y: Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100)),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={transition}
      className="imvo-project-reveal"
      onPointerMove={(event) => {
        if (hasFinePointer) {
          updatePosition(event.clientX, event.clientY, event.currentTarget);
        }
      }}
    >
      <Image
        src="/chosen/horizon-frame.png"
        alt="IMVO architectural project shown as a monochrome concept study"
        fill
        sizes="(max-width: 900px) 100vw, 55vw"
        className="imvo-project-reveal-base"
        priority={false}
      />

      {hasFinePointer ? (
        <div
          className="imvo-project-reveal-colour"
          style={{
            WebkitMaskImage: `radial-gradient(circle 155px at ${position.x}% ${position.y}%, black 0%, black 54%, transparent 100%)`,
            maskImage: `radial-gradient(circle 155px at ${position.x}% ${position.y}%, black 0%, black 54%, transparent 100%)`,
          }}
        >
          <Image
            src="/chosen/horizon-frame.png"
            alt="Finished IMVO architectural project revealed in colour"
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
            className="imvo-project-reveal-finish"
          />
        </div>
      ) : (
        <motion.div
          className="imvo-project-reveal-colour"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{
            clipPath: [
              "inset(0 100% 0 0)",
              "inset(0 0% 0 0)",
              "inset(0 0% 0 0)",
              "inset(0 100% 0 0)",
            ],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/chosen/horizon-frame.png"
            alt="Finished IMVO architectural project revealed in colour"
            fill
            sizes="100vw"
            className="imvo-project-reveal-finish"
          />
        </motion.div>
      )}

      <div className="imvo-project-reveal-shade" />

      <div className="imvo-project-reveal-topline">
        <span>CONCEPT</span>
        <span>BUILT VISION</span>
      </div>

      <div className="imvo-project-reveal-caption">
        <div>
          <span className="imvo-project-reveal-kicker">INTERACTIVE PROJECT STUDY</span>
          <strong>From first reading to resolved form.</strong>
        </div>
        <span className="imvo-project-reveal-instruction">
          {hasFinePointer ? "MOVE TO REVEAL" : "AUTOMATIC REVEAL"}
        </span>
      </div>
    </motion.div>
  );
}

const rollingLabels = new Set([
  "EXPLORE WORK ↗",
  "EXPLORE THE STUDIO ↗",
  "VIEW ALL ↗",
  "Explore Services",
  "Request a Quote",
]);

function enhanceRollingTarget(element: HTMLElement) {
  if (element.dataset.imvoRolling === "true") return;

  const label = element.textContent?.replace(/\s+/g, " ").trim();
  if (!label || !rollingLabels.has(label)) return;

  element.dataset.imvoRolling = "true";
  element.dataset.imvoRollingLabel = label;
  element.setAttribute("aria-label", label.replace("↗", "").trim());
  element.classList.add("imvo-rolling-target");
  element.textContent = "";

  const shell = document.createElement("span");
  shell.className = "imvo-roll-shell";

  const spacer = document.createElement("span");
  spacer.className = "imvo-roll-spacer";
  spacer.textContent = label;
  spacer.setAttribute("aria-hidden", "true");

  const first = document.createElement("span");
  first.className = "imvo-roll-line imvo-roll-line-first";
  first.setAttribute("aria-hidden", "true");

  const second = document.createElement("span");
  second.className = "imvo-roll-line imvo-roll-line-second";
  second.setAttribute("aria-hidden", "true");

  label.split("").forEach((character, index) => {
    const firstLetter = document.createElement("span");
    const secondLetter = document.createElement("span");
    const value = character === " " ? "\u00A0" : character;

    firstLetter.textContent = value;
    secondLetter.textContent = value;
    firstLetter.style.transitionDelay = `${index * 18}ms`;
    secondLetter.style.transitionDelay = `${index * 18}ms`;
    first.appendChild(firstLetter);
    second.appendChild(secondLetter);
  });

  shell.append(spacer, first, second);
  element.appendChild(shell);
}

export default function PremiumHomeEnhancements() {
  const [revealSlot, setRevealSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const cleanupActions: Array<() => void> = [];

    const setup = () => {
      const sections = Array.from(document.querySelectorAll("section"));
      const regionalSection = sections.find((section) => {
        const text = section.textContent || "";
        return text.includes("Regional Reach") || text.includes("Kigali based.");
      });

      if (regionalSection) {
        const grid = regionalSection.querySelector(".containerWide");
        const originalPanel = grid?.children.item(1) as HTMLElement | null;

        if (grid && originalPanel && !grid.querySelector(".imvo-cursor-reveal-slot")) {
          originalPanel.style.display = "none";
          const slot = document.createElement("div");
          slot.className = "imvo-cursor-reveal-slot";
          grid.appendChild(slot);
          setRevealSlot(slot);

          cleanupActions.push(() => {
            originalPanel.style.display = "";
            slot.remove();
          });
        }
      }

      const teamSection = sections.find((section) =>
        Boolean(section.querySelector(".teamImageFrame")),
      );

      if (teamSection && !teamSection.querySelector(".imvo-center-expand-bg")) {
        teamSection.classList.add("imvo-center-expand");
        const background = document.createElement("div");
        background.className = "imvo-center-expand-bg";
        teamSection.prepend(background);

        const content = teamSection.querySelector(":scope > .containerWide") as HTMLElement | null;
        if (content) {
          content.style.position = "relative";
          content.style.zIndex = "1";
        }

        const observer = new IntersectionObserver(
          ([entry]) => {
            teamSection.classList.toggle("imvo-center-expand-active", entry.isIntersecting);
          },
          { threshold: 0.18, rootMargin: "-8% 0px -8% 0px" },
        );
        observer.observe(teamSection);

        cleanupActions.push(() => {
          observer.disconnect();
          background.remove();
          teamSection.classList.remove("imvo-center-expand", "imvo-center-expand-active");
        });
      }

      const rollingTargets = Array.from(
        document.querySelectorAll<HTMLElement>("a, button"),
      );
      rollingTargets.forEach(enhanceRollingTarget);
    };

    const frame = window.requestAnimationFrame(setup);

    return () => {
      window.cancelAnimationFrame(frame);
      cleanupActions.reverse().forEach((action) => action());
    };
  }, []);

  return (
    <>
      <style>{`
        .imvo-cursor-reveal-slot {
          min-width: 0;
          width: 100%;
        }

        .imvo-project-reveal {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 11;
          overflow: hidden;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.11);
          cursor: crosshair;
          isolation: isolate;
        }

        .imvo-project-reveal-base,
        .imvo-project-reveal-finish {
          object-fit: cover;
          object-position: center;
        }

        .imvo-project-reveal-base {
          filter: grayscale(1) contrast(1.32) brightness(0.48);
          transform: scale(1.01);
        }

        .imvo-project-reveal-colour {
          position: absolute;
          inset: 0;
          z-index: 2;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
        }

        .imvo-project-reveal-finish {
          filter: saturate(0.82) brightness(0.88) contrast(1.06);
          transform: scale(1.035);
        }

        .imvo-project-reveal-shade {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          background: linear-gradient(to top, rgba(5,5,5,0.86), transparent 48%, rgba(5,5,5,0.16));
        }

        .imvo-project-reveal-topline {
          position: absolute;
          z-index: 4;
          left: 24px;
          right: 24px;
          top: 22px;
          display: flex;
          justify-content: space-between;
          color: rgba(255,255,255,0.58);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.18em;
        }

        .imvo-project-reveal-caption {
          position: absolute;
          z-index: 4;
          left: 24px;
          right: 24px;
          bottom: 22px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
        }

        .imvo-project-reveal-kicker {
          display: block;
          margin-bottom: 9px;
          color: rgba(255,255,255,0.5);
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.16em;
        }

        .imvo-project-reveal-caption strong {
          display: block;
          max-width: 390px;
          font-size: clamp(22px, 2.4vw, 34px);
          line-height: 1.02;
          letter-spacing: -0.045em;
        }

        .imvo-project-reveal-instruction {
          flex-shrink: 0;
          color: rgba(255,255,255,0.52);
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.15em;
        }

        .imvo-center-expand {
          position: relative !important;
          overflow: hidden;
          isolation: isolate;
        }

        .imvo-center-expand-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: #181818;
          clip-path: inset(0 50% 0 50%);
          transition: clip-path 900ms cubic-bezier(0.25, 1, 0.5, 1);
        }

        .imvo-center-expand-active .imvo-center-expand-bg {
          clip-path: inset(0 0 0 0);
        }

        .imvo-rolling-target {
          position: relative;
          overflow: hidden;
        }

        .imvo-roll-shell {
          position: relative;
          display: inline-flex;
          overflow: hidden;
          vertical-align: bottom;
        }

        .imvo-roll-spacer {
          visibility: hidden;
          user-select: none;
        }

        .imvo-roll-line {
          position: absolute;
          inset: 0;
          display: flex;
          user-select: none;
        }

        .imvo-roll-line span {
          display: inline-block;
          transition: transform 340ms cubic-bezier(0.6, 0.01, -0.05, 0.9);
        }

        .imvo-roll-line-second span {
          transform: translateY(-110%);
        }

        .imvo-rolling-target:hover .imvo-roll-line-first span,
        .imvo-rolling-target:focus-visible .imvo-roll-line-first span {
          transform: translateY(110%);
        }

        .imvo-rolling-target:hover .imvo-roll-line-second span,
        .imvo-rolling-target:focus-visible .imvo-roll-line-second span {
          transform: translateY(0);
        }

        @media (max-width: 900px) {
          .imvo-project-reveal {
            aspect-ratio: 4 / 3;
            cursor: default;
          }

          .imvo-project-reveal-caption {
            align-items: flex-start;
            flex-direction: column;
            gap: 12px;
          }

          .imvo-project-reveal-instruction {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .imvo-center-expand-bg,
          .imvo-roll-line span {
            transition: none !important;
          }

          .imvo-center-expand-bg {
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>

      {revealSlot ? createPortal(<CursorProjectReveal />, revealSlot) : null}
    </>
  );
}
