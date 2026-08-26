"use client";

import { useEffect } from "react";

const normalize = (value?: string | null) =>
  (value || "").replace(/\s+/g, " ").trim().toLowerCase();

export default function AboutTestimonialsController({
  hasTestimonials,
}: {
  hasTestimonials: boolean;
}) {
  useEffect(() => {
    let section: HTMLElement | null = null;

    const apply = () => {
      const label = Array.from(
        document.querySelectorAll<HTMLElement>("div,span,p"),
      ).find((element) => normalize(element.textContent) === "client perspectives");

      if (!label) return false;
      section = label.closest("section");
      if (!section) return false;

      section.dataset.cmsTestimonials = "true";
      section.style.display = hasTestimonials ? "" : "none";
      return true;
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 10_000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      if (section?.dataset.cmsTestimonials === "true") {
        section.style.display = "";
        delete section.dataset.cmsTestimonials;
      }
    };
  }, [hasTestimonials]);

  return null;
}
