"use client";

import { useEffect, useRef, useState } from "react";

type HeroRotatingVideoProps = {
  onReady?: () => void;
};

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

const HERO_READY_EVENT = "imvo:hero-ready";

export default function HeroRotatingVideo({ onReady }: HeroRotatingVideoProps) {
  const [allowVideo, setAllowVideo] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const hasNotifiedReady = useRef(false);

  const notifyReady = () => {
    if (hasNotifiedReady.current) return;

    hasNotifiedReady.current = true;
    document.documentElement.dataset.imvoHeroReady = "true";
    window.dispatchEvent(new Event(HERO_READY_EVENT));
    onReady?.();
  };

  const handleVideoReady = () => {
    setIsVideoReady(true);
    notifyReady();
  };

  const handleVideoError = () => {
    setAllowVideo(false);
    notifyReady();
  };

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as NavigatorWithConnection).connection;
    let delayTimer = 0;
    let cancelled = false;

    const videoIsAllowed = () =>
      !motionPreference.matches && connection?.saveData !== true;

    const applyPreference = () => {
      window.clearTimeout(delayTimer);

      const allowed = videoIsAllowed();

      if (!allowed) {
        setAllowVideo(false);
        notifyReady();
        return;
      }

      // Start fetching the motion hero while the IMVO intro still covers the
      // viewport. The previous multi-second delay caused the poster to become
      // visible after the intro before the MP4 was ready.
      delayTimer = window.setTimeout(() => {
        if (!cancelled) {
          setAllowVideo(true);
        }
      }, 180);

    };

    applyPreference();
    motionPreference.addEventListener("change", applyPreference);

    return () => {
      cancelled = true;
      window.clearTimeout(delayTimer);
      motionPreference.removeEventListener("change", applyPreference);
    };
  }, []);

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
      {allowVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={handleVideoReady}
          onError={handleVideoError}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isVideoReady ? 1 : 0,
            transition: "opacity 420ms ease",
          }}
        >
          <source src="/hero-1.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
