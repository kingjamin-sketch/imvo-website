"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const constructionNodes = [
  { startX: -430, startY: -190, endX: -142, endY: -54, delay: 0.05 },
  { startX: 390, startY: -235, endX: -48, endY: 58, delay: 0.14 },
  { startX: -360, startY: 230, endX: 50, endY: -58, delay: 0.22 },
  { startX: 445, startY: 185, endX: 145, endY: 54, delay: 0.3 },
  { startX: 0, startY: -300, endX: 0, endY: -74, delay: 0.12 },
  { startX: 0, startY: 290, endX: 0, endY: 74, delay: 0.26 },
];

export default function IntroLoader() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isDirectHomeEntry] = useState(() => pathname === "/");
  const [show, setShow] = useState(isDirectHomeEntry);
  const [isFinishing, setIsFinishing] = useState(false);
  const previousOverflowRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isDirectHomeEntry) return;

    delete document.documentElement.dataset.imvoIntroComplete;

    let heroReady =
      document.documentElement.dataset.imvoHeroReady === "true";
    let minimumElapsed = false;
    let finishingStarted = false;
    let removeTimer = 0;

    const maybeFinish = () => {
      if (finishingStarted || !minimumElapsed || !heroReady) return;

      finishingStarted = true;
      setIsFinishing(true);
      removeTimer = window.setTimeout(
        () => setShow(false),
        shouldReduceMotion ? 250 : 520,
      );
    };

    const handleHeroReady = () => {
      heroReady = true;
      maybeFinish();
    };

    window.addEventListener("imvo:hero-ready", handleHeroReady);

    const minimumTimer = window.setTimeout(
      () => {
        minimumElapsed = true;
        maybeFinish();
      },
      shouldReduceMotion ? 450 : 2750,
    );

    // Never trap a visitor in the intro if media playback is unavailable.
    // Normal visitors should reach this point with the video already ready;
    // if not, the hero stays black until motion is ready rather than flashing
    // the temporary poster image.
    const safetyTimer = window.setTimeout(
      () => {
        heroReady = true;
        maybeFinish();
      },
      shouldReduceMotion ? 900 : 6500,
    );

    return () => {
      window.removeEventListener("imvo:hero-ready", handleHeroReady);
      window.clearTimeout(minimumTimer);
      window.clearTimeout(safetyTimer);
      window.clearTimeout(removeTimer);
    };
  }, [isDirectHomeEntry, shouldReduceMotion]);

  useEffect(() => {
    const html = document.documentElement;

    const restoreOverflow = () => {
      if (previousOverflowRef.current !== null) {
        html.style.overflow = previousOverflowRef.current;
        previousOverflowRef.current = null;
      }
    };

    if (!isDirectHomeEntry || pathname !== "/" || !show) {
      restoreOverflow();
      return;
    }

    if (previousOverflowRef.current === null) {
      previousOverflowRef.current = html.style.overflow;
    }

    html.style.overflow = "hidden";

    return restoreOverflow;
  }, [isDirectHomeEntry, pathname, show]);

  const handleIntroExitComplete = () => {
    if (!isDirectHomeEntry) return;

    document.documentElement.dataset.imvoIntroComplete = "true";
    window.dispatchEvent(new Event("imvo:intro-complete"));
  };

  return (
    <AnimatePresence onExitComplete={handleIntroExitComplete}>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.78,
            ease: [0.45, 0, 0.55, 1],
          }}
          aria-label="IMVO Group introduction"
          role="status"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            background: "#050505",
            color: "white",
            display: "grid",
            placeItems: "center",
            overflow: "hidden",
          }}
        >
          {!shouldReduceMotion && (
            <motion.div
              animate={{ opacity: isFinishing ? 0 : 1 }}
              transition={{
                duration: 0.42,
                ease: [0.4, 0, 0.2, 1],
              }}
              aria-hidden="true"
              style={{ position: "absolute", inset: 0 }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 1200 800"
                preserveAspectRatio="xMidYMid slice"
                style={{ position: "absolute", inset: 0 }}
              >
                <motion.path
                  d="M260 400 H940"
                  fill="none"
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1, 1],
                    opacity: [0, 0.48, 0.12],
                  }}
                  transition={{
                    duration: 2.55,
                    times: [0, 0.48, 1],
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
                <motion.path
                  d="M600 205 V595"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 1], opacity: [0, 0.42, 0.08] }}
                  transition={{
                    duration: 2.5,
                    delay: 0.16,
                    times: [0, 0.48, 1],
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />

                {[
                  "M350 330 V280 H440",
                  "M850 330 V280 H760",
                  "M350 470 V520 H440",
                  "M850 470 V520 H760",
                ].map((path, index) => (
                  <motion.path
                    key={path}
                    d={path}
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 1], opacity: [0, 0.52, 0] }}
                    transition={{
                      duration: 2.2,
                      delay: 0.35 + index * 0.07,
                      times: [0, 0.5, 1],
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                ))}
              </svg>

              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 1,
                  height: 1,
                }}
              >
                {constructionNodes.map((node, index) => (
                  <motion.span
                    key={`${node.startX}-${node.startY}`}
                    initial={{
                      x: node.startX,
                      y: node.startY,
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      x: [node.startX, node.startX, node.endX, node.endX],
                      y: [node.startY, node.startY, node.endY, node.endY],
                      opacity: [0, 0.58, 0.58, 0],
                      scale: [0, 0.78, 0.68, 0],
                    }}
                    transition={{
                      duration: 2.15,
                      delay: node.delay,
                      times: [0, 0.18, 0.78, 1],
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      position: "absolute",
                      width: index > 3 ? 6 : 8,
                      height: index > 3 ? 6 : 8,
                      margin: index > 3 ? -3 : -4,
                      borderRadius: "50%",
                      background: "white",
                      boxShadow: "0 0 18px rgba(255,255,255,0.22)",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            animate={{
              opacity: isFinishing ? 0 : 1,
              scale: isFinishing ? 0.992 : 1,
            }}
            transition={{
              duration: shouldReduceMotion ? 0.15 : 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              padding: "0 28px",
              transformOrigin: "center",
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 0.985,
                letterSpacing: shouldReduceMotion ? "0.075em" : "0.16em",
                filter: shouldReduceMotion ? "none" : "blur(2px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                letterSpacing: "0.075em",
                filter: "blur(0px)",
              }}
              transition={{
                duration: shouldReduceMotion ? 0.2 : 1.15,
                delay: shouldReduceMotion ? 0 : 0.82,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                display: "inline-block",
                padding: "0.12em 0.2em",
                marginRight: "-0.075em",
                fontSize: "clamp(52px, 7.2vw, 98px)",
                lineHeight: 1,
                fontWeight: 900,
                whiteSpace: "nowrap",
                transformOrigin: "center",
              }}
            >
              IMVO
            </motion.div>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0.15 : 0.75,
                delay: shouldReduceMotion ? 0.1 : 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              aria-hidden="true"
              style={{
                width: "min(270px, 54vw)",
                height: 1,
                margin: "22px auto 0",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.48), transparent)",
                transformOrigin: "center",
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 9 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0.15 : 0.7,
                delay: shouldReduceMotion ? 0.15 : 1.62,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                marginTop: 18,
                fontSize: "clamp(8px, 1.15vw, 11px)",
                fontWeight: 800,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.58)",
                whiteSpace: "nowrap",
              }}
            >
              Intellectu · Mens · Visio · Origo
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
