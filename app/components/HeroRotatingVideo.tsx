"use client";

import { useState } from "react";

type HeroRotatingVideoProps = {
  onReady?: () => void;
};

export default function HeroRotatingVideo({ onReady }: HeroRotatingVideoProps) {
  const [isReady, setIsReady] = useState(false);

  const handleReady = () => {
    if (isReady) return;

    setIsReady(true);
    onReady?.();
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#000",
      }}
      aria-hidden="true"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={handleReady}
        onLoadedData={handleReady}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: isReady ? 1 : 0,
          transition: "opacity 700ms ease",
        }}
      >
        <source src="/hero-1.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
