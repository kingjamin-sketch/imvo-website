"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const letters = ["I", "M", "V", "O"];

export default function IntroLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const played = sessionStorage.getItem("imvo-loader");

    if (played) {
      const frameId = requestAnimationFrame(() => setShow(false));
      return () => cancelAnimationFrame(frameId);
    }

    sessionStorage.setItem("imvo-loader", "true");

    const timer = setTimeout(() => {
      setShow(false);
    }, 7200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            background: "#050505",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
            style={{ position: "absolute", inset: 0 }}
          >
            <motion.path
              d="M390 400 H810"
              stroke="rgba(255,255,255,0.24)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0.28] }}
              transition={{ duration: 2.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.path
              d="M600 315 V485"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0.2] }}
              transition={{ duration: 2.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.circle
              cx="600"
              cy="400"
              r="96"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, rotate: -30, opacity: 0 }}
              animate={{ pathLength: 1, rotate: 0, opacity: [0, 1, 0.2] }}
              transition={{ duration: 3, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "600px 400px" }}
            />
          </svg>

          <motion.div
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.95,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: "relative",
              textAlign: "center",
              padding: "0 44px",
              maxWidth: "100vw",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.12em",
                fontSize: "clamp(34px, 5vw, 66px)",
                lineHeight: 1,
                letterSpacing: "-0.015em",
                fontWeight: 900,
                whiteSpace: "nowrap",
              }}
            >
              {letters.map((letter, index) => (
                <motion.span
                  key={letter}
                  initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.9,
                    delay: 1.45 + index * 0.26,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    display: "inline-block",
                    padding: "0 0.04em",
                    overflow: "visible",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 3.0,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                marginTop: 18,
                fontSize: "clamp(8px, 0.8vw, 11px)",
                fontWeight: 900,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.56)",
                whiteSpace: "nowrap",
              }}
            >
              Intellectu · Mens · Visio · Origo
            </motion.div>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 1.1], opacity: [0, 0.55, 0] }}
              transition={{
                duration: 1.4,
                delay: 3.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                width: "56%",
                height: 1,
                background: "rgba(255,255,255,0.32)",
                margin: "22px auto 0",
                transformOrigin: "center",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
