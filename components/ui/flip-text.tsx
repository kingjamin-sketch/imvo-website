"use client";

import { useState, type HTMLAttributes, type MouseEvent } from "react";
import { motion } from "framer-motion";

type FlipTextProps = HTMLAttributes<HTMLSpanElement> & {
  children: string;
  replayOnHover?: boolean;
};

export function FlipText({
  children,
  className = "",
  replayOnHover = false,
  onMouseEnter,
  ...props
}: FlipTextProps) {
  const [cycle, setCycle] = useState(0);
  const letters = Array.from(children);

  const handleMouseEnter = (event: MouseEvent<HTMLSpanElement>) => {
    if (replayOnHover) setCycle((value) => value + 1);
    onMouseEnter?.(event);
  };

  return (
    <span
      className={className}
      aria-label={children}
      onMouseEnter={handleMouseEnter}
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
          key={`${cycle}-${character}-${index}`}
          aria-hidden="true"
          initial={{ opacity: 0, rotateX: -88, y: 8 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{
            duration: 0.46,
            delay: 0.025 + index * 0.016,
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
