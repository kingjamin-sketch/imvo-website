"use client";

import Image from "next/image";
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
  const [expectsVideo, setExpectsVideo] = useState<boolean | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const hasNotifiedReady = useRef(false);
  const posterReadyRef = useRef(false);
  const expectsVideoRef = useRef<boolean | null>(null);

  const notifyReady = () => {
    if (hasNotifiedReady.current) return;

    hasNotifiedReady.current = true;
    document.documentElement.dataset.imvoHeroReady = "true";
    window.dispatchEvent(new Event(HERO_READY_EVENT));
    onReady?.();
  };

  const handlePosterReady = () => {
    posterReadyRef.current = true;

    // The still image is only a final hero for explicit reduced-motion /
    // data-saver preferences or a genuine playback error. A slow connection
    // must never switch the normal experience to a poster before the video.
    if (expectsVideoRef.current === false) {
      notifyReady();
    }
  };

  const handleVideoReady = () => {
    setIsVideoReady(true);
    notifyReady();
  };

  const handleVideoError = () => {
    expectsVideoRef.current = false;
    setExpectsVideo(false);
    setAllowVideo(false);

    if (posterReadyRef.current) {
      notifyReady();
    }
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
      expectsVideoRef.current = allowed;
      setExpectsVideo(allowed);

      if (!allowed) {
        setAllowVideo(false);
        if (posterReadyRef.current) {
          notifyReady();
        }
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
      {expectsVideo === false && (
        <Image
          src="/hero-2.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          onLoad={handlePosterReady}
          onError={handlePosterReady}
          style={{
            objectFit: "cover",
            filter: "brightness(0.82)",
          }}
        />
      )}

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
