"use client";

import type { HTMLAttributes } from "react";
import { motion } from "framer-motion";

type FlipTextProps = HTMLAttributes<HTMLSpanElement> & {
  children: string;
};

export function FlipText({ children, className = "", ...props }: FlipTextProps) {
  const letters = Array.from(children);

  return (
    <span
      className={className}
      aria-label={children}
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        whiteSpace: "pre-wrap",
        perspective: 700,
      }}
      {...props}
    >
      {letters.map((character, index) => (
        <motion.span
          key={`${character}-${index}`}
          aria-hidden="true"
          initial={{ opacity: 0, rotateX: -88, y: 8 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{
            duration: 0.46,
            delay: 0.06 + index * 0.018,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: "inline-block",
            transformOrigin: "50% 100%",
            backfaceVisibility: "hidden",
          }}
        >
          {character === " " ? "\u00A0" : character}
        </motion.span>
      ))}
    </span>
  );
}

export default FlipText;
