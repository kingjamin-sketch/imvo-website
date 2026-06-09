"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Brand from "./Brand";

export default function IntroLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const played = sessionStorage.getItem("imvo-loader");

    if (!played) {
      setShow(true);
      sessionStorage.setItem("imvo-loader", "true");

      const timer = setTimeout(() => {
        setShow(false);
      }, 2800);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#050505",
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: [0.8, 1, 1, 0.55],
              y: [0, 0, 0, -320],
              x: [0, 0, 0, -620],
            }}
            transition={{
              duration: 2.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Brand size="lg" variant="light" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}