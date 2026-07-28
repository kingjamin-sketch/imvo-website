"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties } from "react";

const premiumEase = [0.6, 0.01, -0.05, 0.9] as [number, number, number, number];

const firstLineVariants: Variants = {
  initial: (index: number) => ({
    y: 0,
    transition: {
      duration: 0.34,
      ease: premiumEase,
      delay: index * 0.018,
    },
  }),
  hover: (index: number) => ({
    y: "110%",
    transition: {
      duration: 0.34,
      ease: premiumEase,
      delay: index * 0.018,
    },
  }),
};

const secondLineVariants: Variants = {
  initial: (index: number) => ({
    y: "-110%",
    transition: {
      duration: 0.34,
      ease: premiumEase,
      delay: index * 0.018,
    },
  }),
  hover: (index: number) => ({
    y: 0,
    transition: {
      duration: 0.34,
      ease: premiumEase,
      delay: index * 0.018,
    },
  }),
};

export default function RollingText({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
}) {
  const letters = text.split("");

  return (
    <span
      className={`relative inline-flex overflow-hidden whitespace-nowrap ${className || ""}`}
      style={style}
    >
      <span className="invisible select-none" aria-hidden="true">
        {text}
      </span>

      <span className="absolute inset-0 flex select-none" aria-hidden="true">
        {letters.map((character, index) => (
          <motion.span
            key={`first-${index}`}
            custom={index}
            variants={firstLineVariants}
            className="inline-block"
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        ))}
      </span>

      <span className="absolute inset-0 flex select-none" aria-hidden="true">
        {letters.map((character, index) => (
          <motion.span
            key={`second-${index}`}
            custom={index}
            variants={secondLineVariants}
            className="inline-block"
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
