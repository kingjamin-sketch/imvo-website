"use client";

import { useEffect } from "react";
import type { HomePageContent } from "@/sanity/types/siteContent";
import type { HomeSectionControls } from "@/sanity/types/cmsBackend";

const normalize = (value?: string | null) =>
  (value || "").replace(/\s+/g, " ").trim().toLowerCase();

function setSectionVisibility(label: string | undefined, visible: boolean | undefined) {
  if (!label || visible === undefined) return;
  const target = normalize(label);
  if (!target) return;

  const node = Array.from(
    document.querySelectorAll<HTMLElement>("h1,h2,h3,p,span,div"),
  ).find((element) => normalize(element.textContent) === target);

  const section = node?.closest<HTMLElement>("section");
  if (!section) return;

  section.hidden = !visible;
  section.setAttribute("data-cms-visibility", visible ? "shown" : "hidden");
}

function setStudioStatusVisibility(visible: boolean | undefined) {
  if (visible === undefined) return;

  const cmsMount = document.querySelector<HTMLElement>("[data-cms-studio-status]");
  let card = cmsMount?.parentElement || null;

  if (!card) {
    const statusLabel = Array.from(
      document.querySelectorAll<HTMLElement>("div,span,p"),
    ).find((element) => normalize(element.textContent) === "studio status");

    // The legacy Studio Status label sits inside the card's content layer.
    // Target the card itself rather than the closest section so the toggle
    // can never hide unrelated homepage content that shares that section.
    card = statusLabel?.parentElement?.parentElement || null;
  }

  if (!(card instanceof HTMLElement)) return;

  card.hidden = !visible;
  card.setAttribute(
    "data-cms-visibility",
    visible ? "shown" : "hidden",
  );
}

export default function HomeSectionVisibility({
  controls,
  content,
}: {
  controls?: HomeSectionControls | null;
  content?: HomePageContent | null;
}) {
  useEffect(() => {
    if (!controls) return;

    const apply = () => {
      setSectionVisibility(content?.regionalHeading, controls.showRegional);
      setSectionVisibility(content?.intelligenceHeading, controls.showIntelligence);
      setSectionVisibility(content?.principlesHeading, controls.showPrinciples);
      setSectionVisibility(content?.manifestoHeading, controls.showManifesto);
      setSectionVisibility(content?.progressHeading, controls.showProgress);
      setSectionVisibility(content?.servicesHeading, controls.showServices);
      setSectionVisibility(content?.teamHeading, controls.showTeam);
      setSectionVisibility(content?.ctaHeading, controls.showFinalCta);
      setStudioStatusVisibility(controls.showStudioStatus);
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 8000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [content, controls]);

  return null;
}