"use client";

import { useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";
import { FlipText } from "@/components/ui/flip-text";

const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

export default function HeroFlipEnhancement() {
  useEffect(() => {
    let root: Root | null = null;
    let target: HTMLElement | null = null;
    let timer = 0;

    const install = () => {
      if (root) return;

      const hero = document.querySelector<HTMLElement>("#main-content section:first-of-type");
      if (!hero) return;

      const candidates = Array.from(
        hero.querySelectorAll<HTMLElement>("div, span, p"),
      );

      target =
        candidates.find(
          (element) =>
            normalize(element.textContent || "") ===
            "BUILT ENVIRONMENT DESIGN & DEVELOPMENT",
        ) || null;

      if (!target || target.dataset.imvoFlipMounted === "true") return;

      const text = normalize(target.textContent || "");
      if (!text) return;

      target.dataset.imvoFlipMounted = "true";
      target.style.fontSize = "clamp(13px, 1.15vw, 17px)";
      target.style.lineHeight = "1.15";
      target.style.cursor = "default";
      target.textContent = "";
      root = createRoot(target);
      root.render(<FlipText replayOnHover>{text}</FlipText>);
    };

    const scheduleInstall = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(install, 80);
    };

    if (document.documentElement.dataset.imvoIntroComplete === "true") {
      scheduleInstall();
    } else {
      window.addEventListener("imvo:intro-complete", scheduleInstall, { once: true });
      timer = window.setTimeout(install, 4200);
    }

    return () => {
      window.removeEventListener("imvo:intro-complete", scheduleInstall);
      window.clearTimeout(timer);
      root?.unmount();
      if (target) delete target.dataset.imvoFlipMounted;
    };
  }, []);

  return null;
}
