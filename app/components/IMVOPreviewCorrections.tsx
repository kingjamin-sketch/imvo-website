"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

export default function IMVOPreviewCorrections() {
  const pathname = usePathname();

  useEffect(() => {
    const touched = new Set<HTMLElement>();
    let frame = 0;

    const scan = () => {
      document.querySelectorAll<HTMLElement>("a, button").forEach((element) => {
        const label = normalize(element.textContent || "")
          .replace(/[↗↓]/g, "")
          .trim()
          .toUpperCase();

        if (label === "VIEW PROJECTS") {
          element.classList.add("imvo-editorial-cta-v2", "imvo-secondary-cta-fix");
          element.dataset.imvoCtaArrow = "out";
          element.dataset.imvoCtaVariant = "secondary";
          touched.add(element);
        }
      });

      document
        .querySelectorAll<HTMLButtonElement>('button[aria-label^="Show "]')
        .forEach((button) => {
          button.classList.remove("imvo-editorial-cta-v2");
          button.classList.add("imvo-pillar-switcher-fix");
          delete button.dataset.imvoCtaArrow;
          delete button.dataset.imvoCtaVariant;
          touched.add(button);
        });

      Array.from(document.querySelectorAll<HTMLElement>("section")).forEach(
        (section) => {
          const text = normalize(section.textContent || "");
          if (text.includes("Core Pillar 0")) {
            section.classList.add("imvo-core-pillar-fix");
            touched.add(section);
          }
        },
      );
    };

    const schedule = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(scan);
    };

    schedule();
    const delayed = window.setTimeout(schedule, 1100);
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
      window.clearTimeout(delayed);
      window.cancelAnimationFrame(frame);
      touched.forEach((element) => {
        element.classList.remove(
          "imvo-secondary-cta-fix",
          "imvo-pillar-switcher-fix",
          "imvo-core-pillar-fix",
        );
        delete element.dataset.imvoCtaVariant;
      });
    };
  }, [pathname]);

  return (
    <style>{`
      /* Secondary CTAs share the same rectangular geometry as primary CTAs. */
      .imvo-editorial-cta-v2.imvo-secondary-cta-fix,
      .imvo-editorial-cta-v2[data-imvo-cta-variant="secondary"] {
        min-width: 208px !important;
        min-height: 54px !important;
        padding: 0 20px !important;
        border: 1px solid rgba(255, 255, 255, 0.34) !important;
        border-radius: 2px !important;
        background: transparent !important;
        color: #ffffff !important;
        justify-content: flex-start !important;
      }

      .imvo-editorial-cta-v2.imvo-secondary-cta-fix:hover,
      .imvo-editorial-cta-v2[data-imvo-cta-variant="secondary"]:hover {
        background: #ffffff !important;
        border-color: #ffffff !important;
        color: #050505 !important;
      }

      /* Core-pillar controls are carousel indicators, never full CTA buttons. */
      button.imvo-pillar-switcher-fix,
      button.imvo-pillar-switcher-fix.imvo-editorial-cta-v2 {
        min-width: 0 !important;
        min-height: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        border-radius: 999px !important;
        box-shadow: none !important;
        font-size: 0 !important;
        letter-spacing: 0 !important;
        transform: none !important;
      }

      button.imvo-pillar-switcher-fix::after {
        content: none !important;
        display: none !important;
      }

      /* Calm the orbit field: retain the architectural traces, remove the busy runners. */
      .imvo-core-pillar-fix > div:first-child {
        opacity: 0.52 !important;
      }

      .imvo-core-pillar-fix > div:first-child svg path:nth-of-type(even) {
        display: none !important;
      }

      .imvo-core-pillar-fix > div:first-child svg path:nth-of-type(odd) {
        stroke: rgba(255, 255, 255, 0.055) !important;
        stroke-width: 1 !important;
      }

      .imvo-core-pillar-fix h2 {
        text-wrap: balance;
      }

      @media (max-width: 767px) {
        .imvo-editorial-cta-v2.imvo-secondary-cta-fix,
        .imvo-editorial-cta-v2[data-imvo-cta-variant="secondary"] {
          min-width: min(100%, 216px) !important;
          min-height: 50px !important;
          padding: 0 16px !important;
        }
      }
    `}</style>
  );
}
