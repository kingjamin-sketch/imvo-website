"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const selectionLabels = new Set([
  "BUILT ENVIRONMENT DESIGN",
  "PLANNING & DESIGN",
  "CONSULTANCY",
  "SITE COORDINATION & DELIVERY SUPPORT",
  "PROPERTY DEVELOPMENT GUIDANCE",
  "PROPERTY ACQUISITION GUIDANCE",
  "OTHER / CUSTOM SCOPE",
]);

const normalizeLabel = (value: string) => value.replace(/\s+/g, " ").trim().toUpperCase();

export default function IMVOThemeRefinements() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const markSelectionControls = () => {
      document
        .querySelectorAll<HTMLElement>("form button:not([type='submit']), button")
        .forEach((button) => {
          const label = normalizeLabel(button.textContent || "");
          const isFormSelection =
            button.closest("form") &&
            !(button instanceof HTMLButtonElement && button.type === "submit");

          if (isFormSelection || selectionLabels.has(label)) {
            button.dataset.imvoJellySkip = "true";
          }
        });
    };

    markSelectionControls();

    const observer = new MutationObserver(markSelectionControls);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <style>{`
      /* Keep the supplied jelly component intact; refine its rendered IMVO skin. */
      [data-imvo-jelly-slot="true"] [class^="gooey-container-"] > div,
      [data-imvo-jelly-slot="true"] [class^="suede-hitbox-"] > div:nth-of-type(3) {
        background-color: #ffffff !important;
      }

      [data-imvo-jelly-slot="true"] [class^="shadow-"] {
        background: rgba(255, 255, 255, 0.18) !important;
        filter: blur(28px) !important;
        opacity: 0.42 !important;
        transform: translateY(10px) scale(0.92) !important;
      }

      [data-imvo-jelly-slot="true"] [class^="label-"] {
        color: #080808 !important;
        width: 100% !important;
        height: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        box-sizing: border-box !important;
        padding: 0 30px !important;
        font-size: 14px !important;
        font-weight: 750 !important;
        letter-spacing: 0.025em !important;
        line-height: 1 !important;
        text-align: left !important;
        text-transform: uppercase !important;
        white-space: nowrap !important;
        filter: none !important;
        text-shadow: none !important;
      }

      [data-imvo-jelly-slot="true"] [class^="suede-hitbox-"] {
        isolation: isolate;
      }

      /* Preserve the masonry interaction while returning it to IMVO monochrome. */
      .imvo-testimonial-border {
        background: conic-gradient(
          transparent,
          transparent,
          transparent,
          rgba(255, 255, 255, 0.96)
        ) !important;
      }

      .imvo-testimonial-card:hover {
        box-shadow: 0 22px 64px rgba(0, 0, 0, 0.34),
          0 0 0 1px rgba(255, 255, 255, 0.04);
      }

      .imvo-testimonial-panel {
        background: #171717 !important;
      }

      .imvo-testimonial-card:hover .imvo-testimonial-panel {
        background: #1c1c1c !important;
      }

      @media (max-width: 720px) {
        [data-imvo-jelly-slot="true"] [class^="label-"] {
          padding: 0 24px !important;
          font-size: 12px !important;
          letter-spacing: 0.02em !important;
        }
      }
    `}</style>
  );
}
