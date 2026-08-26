"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

const liveItems = [
  {
    label: "PROJECT INQUIRIES",
    text: "New briefs remain routed to the studio.",
  },
  {
    label: "REGIONAL DESK",
    text: "Kigali · CAT operating signal synced.",
  },
  {
    label: "SITE COORDINATION",
    text: "Visit and coordination requests remain open.",
  },
  {
    label: "PROJECT PIPELINE",
    text: "New requests queue for the next studio review.",
  },
  {
    label: "BUILT ENVIRONMENT",
    text: "Architecture · planning · development.",
  },
];

function normalize(value: string | null | undefined) {
  return (value || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function StudioLiveLayer() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % liveItems.length),
      2600,
    );
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const item = liveItems[active];

  return (
    <div className="imvo-studio-live-layer" aria-label="Live IMVO studio signal">
      {!reduceMotion ? (
        <motion.div
          className="imvo-studio-scan"
          aria-hidden="true"
          initial={{ x: "-120%" }}
          animate={{ x: "220%" }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
        />
      ) : null}

      <div className="imvo-studio-live-rail">
        <div className="imvo-studio-signal-row">
          <div className="imvo-studio-signal-label">
            <span className="imvo-studio-signal-dot" aria-hidden="true">
              {!reduceMotion ? (
                <motion.span
                  animate={{ scale: [1, 2.6, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : null}
            </span>
            STUDIO SIGNAL
          </div>

          <div className="imvo-studio-levels" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((bar) => (
              <motion.span
                key={bar}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scaleY: [0.3 + bar * 0.08, 1, 0.45, 0.78, 0.3 + bar * 0.08],
                        opacity: [0.38, 0.9, 0.5, 0.72, 0.38],
                      }
                }
                transition={{
                  duration: 1.8 + bar * 0.23,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: bar * 0.11,
                }}
              />
            ))}
          </div>
        </div>

        <div className="imvo-studio-live-copy">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.label}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -7 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            >
              <strong>{item.label}</strong>
              <span>{item.text}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="imvo-studio-live-grid" aria-label="Studio operating indicators">
          {[
            ["REGIONAL DESK", "KIGALI"],
            ["PROJECT PIPELINE", "OPEN"],
            ["INQUIRIES", "ROUTING"],
          ].map(([label, value], index) => (
            <div key={label}>
              <span className="imvo-studio-mini-dot" aria-hidden="true">
                {!reduceMotion ? (
                  <motion.i
                    animate={{ opacity: [0.28, 1, 0.28] }}
                    transition={{ duration: 1.9, repeat: Infinity, delay: index * 0.35 }}
                  />
                ) : null}
              </span>
              <small>{label}</small>
              <b>{value}</b>
            </div>
          ))}
        </div>

        <div className="imvo-studio-progress" aria-hidden="true">
          {!reduceMotion ? (
            <motion.span
              initial={{ x: "-100%" }}
              animate={{ x: "340%" }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <span style={{ transform: "translateX(120%)" }} />
          )}
        </div>
      </div>

      <style jsx global>{`
        [data-imvo-studio-live="true"] {
          isolation: isolate;
          animation: imvo-studio-breathe 6s ease-in-out infinite;
        }

        .imvo-studio-live-layer {
          position: relative;
          z-index: 4;
          width: 100%;
          pointer-events: none;
        }

        .imvo-studio-scan {
          position: absolute;
          z-index: 0;
          top: -340px;
          bottom: -30px;
          width: 34%;
          left: 0;
          transform: skewX(-12deg);
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.012) 25%,
            rgba(255, 255, 255, 0.075) 50%,
            rgba(255, 255, 255, 0.012) 75%,
            transparent 100%
          );
          filter: blur(1px);
        }

        .imvo-studio-live-rail {
          position: relative;
          z-index: 2;
          margin-top: 18px;
          padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .imvo-studio-signal-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }

        .imvo-studio-signal-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 9px;
          line-height: 1;
          font-weight: 900;
          letter-spacing: 0.14em;
        }

        .imvo-studio-signal-dot {
          position: relative;
          width: 6px;
          height: 6px;
          flex: 0 0 6px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.36);
        }

        .imvo-studio-signal-dot > span {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: rgba(255, 255, 255, 0.42);
        }

        .imvo-studio-levels {
          height: 15px;
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .imvo-studio-levels > span {
          width: 2px;
          height: 14px;
          display: block;
          transform-origin: center bottom;
          background: rgba(255, 255, 255, 0.58);
        }

        .imvo-studio-live-copy {
          position: relative;
          min-height: 46px;
          margin-top: 13px;
          overflow: hidden;
        }

        .imvo-studio-live-copy > div,
        .imvo-studio-live-copy > div > div {
          width: 100%;
        }

        .imvo-studio-live-copy strong,
        .imvo-studio-live-copy span {
          display: block;
        }

        .imvo-studio-live-copy strong {
          color: rgba(255, 255, 255, 0.9);
          font-size: 10px;
          line-height: 1.3;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        .imvo-studio-live-copy span {
          margin-top: 4px;
          color: rgba(255, 255, 255, 0.49);
          font-size: 11px;
          line-height: 1.45;
        }

        .imvo-studio-live-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin-top: 11px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .imvo-studio-live-grid > div {
          min-width: 0;
          padding: 10px 9px 10px 0;
          display: grid;
          grid-template-columns: 7px 1fr;
          column-gap: 6px;
          row-gap: 3px;
          border-right: 1px solid rgba(255, 255, 255, 0.07);
        }

        .imvo-studio-live-grid > div:not(:first-child) {
          padding-left: 9px;
        }

        .imvo-studio-live-grid > div:last-child {
          border-right: 0;
        }

        .imvo-studio-mini-dot {
          position: relative;
          grid-row: 1 / span 2;
          align-self: start;
          width: 4px;
          height: 4px;
          margin-top: 3px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
        }

        .imvo-studio-mini-dot i {
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: rgba(255, 255, 255, 0.9);
        }

        .imvo-studio-live-grid small,
        .imvo-studio-live-grid b {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .imvo-studio-live-grid small {
          color: rgba(255, 255, 255, 0.34);
          font-size: 7px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .imvo-studio-live-grid b {
          color: rgba(255, 255, 255, 0.74);
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.06em;
        }

        .imvo-studio-progress {
          position: relative;
          height: 1px;
          margin-top: 12px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.07);
        }

        .imvo-studio-progress span {
          position: absolute;
          top: 0;
          left: 0;
          width: 28%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent);
        }

        @keyframes imvo-studio-breathe {
          0%, 100% {
            box-shadow: inset 0 0 0 rgba(255, 255, 255, 0), 0 0 0 rgba(255, 255, 255, 0);
          }
          50% {
            box-shadow: inset 0 0 34px rgba(255, 255, 255, 0.018), 0 0 28px rgba(255, 255, 255, 0.018);
          }
        }

        @media (max-width: 640px) {
          .imvo-studio-live-grid {
            grid-template-columns: 1fr;
          }

          .imvo-studio-live-grid > div,
          .imvo-studio-live-grid > div:not(:first-child) {
            padding: 8px 0;
            border-right: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }

          .imvo-studio-live-grid > div:last-child {
            border-bottom: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [data-imvo-studio-live="true"] {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default function StudioStatusLiveEnhancement() {
  const pathname = usePathname();
  const [mount, setMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    let portalMount: HTMLElement | null = null;
    let card: HTMLElement | null = null;

    const install = () => {
      if (portalMount?.isConnected) return true;

      const label = Array.from(
        document.querySelectorAll<HTMLElement>("div, span, p"),
      ).find((element) => normalize(element.textContent) === "studio status");

      if (!label) return false;

      let candidate: HTMLElement | null = label.parentElement;
      while (candidate && candidate !== document.body) {
        const text = normalize(candidate.textContent);
        const looksLikeStudioCard =
          text.includes("kigali, rwanda") &&
          (text.includes("studio open") ||
            text.includes("studio closed") ||
            text.includes("opening soon") ||
            text.includes("closing soon") ||
            text.includes("weekend schedule") ||
            text.includes("public holiday") ||
            text.includes("midday studio") ||
            text.includes("studio back") ||
            text.includes("holiday approaching"));

        if (looksLikeStudioCard) {
          card = candidate;
          break;
        }
        candidate = candidate.parentElement;
      }

      if (!card) return false;

      const contentLayer = label.parentElement || card;
      if (contentLayer.querySelector("[data-imvo-live-status-mount]")) return true;

      card.setAttribute("data-imvo-studio-live", "true");
      portalMount = document.createElement("div");
      portalMount.setAttribute("data-imvo-live-status-mount", "true");
      contentLayer.appendChild(portalMount);
      setMount(portalMount);
      return true;
    };

    install();
    const observer = new MutationObserver(install);
    observer.observe(document.body, { childList: true, subtree: true });
    const interval = window.setInterval(install, 350);
    const timeout = window.setTimeout(() => {
      observer.disconnect();
      window.clearInterval(interval);
    }, 12000);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      portalMount?.remove();
      card?.removeAttribute("data-imvo-studio-live");
      setMount(null);
    };
  }, [pathname]);

  if (!mount) return null;
  return createPortal(<StudioLiveLayer />, mount);
}
