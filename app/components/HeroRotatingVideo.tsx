"use client";

import { useEffect, useRef, useState } from "react";
import { sanityClient } from "@/sanity/lib/client";

type HeroRotatingVideoProps = {
  onReady?: () => void;
};

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

type HeroMedia = {
  videoUrl?: string;
  posterUrl?: string;
};

const HERO_READY_EVENT = "imvo:hero-ready";
const FALLBACK_VIDEO = "/hero-1.mp4";

export default function HeroRotatingVideo({ onReady }: HeroRotatingVideoProps) {
  const [allowVideo, setAllowVideo] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState(FALLBACK_VIDEO);
  const [posterSrc, setPosterSrc] = useState<string | undefined>();
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
    if (videoSrc !== FALLBACK_VIDEO) {
      setIsVideoReady(false);
      setVideoSrc(FALLBACK_VIDEO);
      return;
    }
    setAllowVideo(false);
    notifyReady();
  };

  useEffect(() => {
    let active = true;
    sanityClient
      .fetch<HeroMedia>(`*[_id == "homePage"][0]{"videoUrl": heroVideo.asset->url, "posterUrl": heroPoster.asset->url}`)
      .then((media) => {
        if (!active || !media) return;
        if (media.videoUrl) setVideoSrc(media.videoUrl);
        if (media.posterUrl) setPosterSrc(media.posterUrl);
      })
      .catch(() => {
        // The coded production asset remains the safe fallback when Sanity is unavailable.
      });

    return () => {
      active = false;
    };
  }, []);

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
          key={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterSrc}
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
          <source src={videoSrc} type={videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"} />
        </video>
      )}
    </div>
  );
}
