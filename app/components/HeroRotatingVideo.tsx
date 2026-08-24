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

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export default function HeroRotatingVideo({ onReady }: HeroRotatingVideoProps) {
  const [allowVideo, setAllowVideo] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const hasNotifiedReady = useRef(false);

  const notifyReady = () => {
    if (hasNotifiedReady.current) return;

    hasNotifiedReady.current = true;
    onReady?.();
  };

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as NavigatorWithConnection).connection;
    const idleWindow = window as IdleWindow;
    let delayTimer = 0;
    let idleHandle: number | undefined;
    let cancelled = false;

    const videoIsAllowed = () =>
      !motionPreference.matches && connection?.saveData !== true;

    const enableVideo = () => {
      if (!cancelled && videoIsAllowed()) {
        setAllowVideo(true);
      }
    };

    const scheduleVideo = () => {
      if (!videoIsAllowed()) {
        setAllowVideo(false);
        return;
      }

      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(enableVideo, { timeout: 2000 });
      } else {
        enableVideo();
      }
    };

    const updateVideoPreference = () => {
      if (!videoIsAllowed()) {
        setAllowVideo(false);
      }
    };

    // Keep the poster as the entire cold-load hero. The MP4 is deliberately
    // instantiated only after the intro/initial hydration window has passed,
    // so it cannot compete with first paint, LCP, or cold-start JavaScript.
    delayTimer = window.setTimeout(scheduleVideo, 3800);
    motionPreference.addEventListener("change", updateVideoPreference);

    return () => {
      cancelled = true;
      window.clearTimeout(delayTimer);
      if (idleHandle !== undefined) {
        idleWindow.cancelIdleCallback?.(idleHandle);
      }
      motionPreference.removeEventListener("change", updateVideoPreference);
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
      <Image
        src="/hero-2.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        onLoad={notifyReady}
        onError={notifyReady}
        style={{
          objectFit: "cover",
          filter: "brightness(0.82)",
        }}
      />

      {allowVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setIsVideoReady(true)}
          onLoadedData={() => setIsVideoReady(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isVideoReady ? 1 : 0,
            transition: "opacity 700ms ease",
          }}
        >
          <source src="/hero-1.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
