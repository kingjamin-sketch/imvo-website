"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Brand from "./Brand";

export default function IntroLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const played = sessionStorage.getItem("imvo-loader");

    if (played) {
      setShow(false);
      document.body.classList.remove("intro-playing");
      return;
    }

    document.body.classList.add("intro-playing");
    sessionStorage.setItem("imvo-loader", "true");

    const timer = setTimeout(() => {
      setShow(false);
      document.body.classList.remove("intro-playing");
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("intro-playing");
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            background: "#050505",
            pointerEvents: "none",
          }}
        >
          <motion.div
            initial={{
              position: "fixed",
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
              scale: 1.25,
              opacity: 0,
            }}
            animate={{
              left: [
                "50%",
                "50%",
                "calc(max(32px, calc((100vw - 1440px) / 2 + 32px)))",
              ],
              top: ["50%", "50%", "38px"],
              x: ["-50%", "-50%", "0%"],
              y: ["-50%", "-50%", "0%"],
              scale: [1.25, 1.25, 1],
              opacity: [0, 1, 1],
            }}
            transition={{
              duration: 2.75,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.55, 1],
            }}
            style={{
              transformOrigin: "left top",
              willChange: "left, top, transform",
            }}
          >
            <Brand size="lg" variant="light" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}