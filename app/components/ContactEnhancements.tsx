"use client";

import { useEffect } from "react";

const ctaLabels = [
  "EXPLORE WORK",
  "EXPLORE THE STUDIO",
  "VIEW ALL",
  "EXPLORE SERVICES",
  "REQUEST A QUOTE",
  "START A CONVERSATION",
  "EXPLORE PROJECTS",
  "DOWNLOAD STUDIO DECK",
  "SUBMIT INQUIRY",
  "TRANSMITTING BRIEF",
  "SEND MESSAGE",
  "START PROJECT",
  "GET STARTED",
  "LEARN MORE",
  "MEET THE TEAM",
];

const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

function applyContactCtas() {
  document.querySelectorAll<HTMLElement>("a, button").forEach((element) => {
    const aria = (element.getAttribute("aria-label") || "").toUpperCase();
    if (/MENU|PREVIOUS|NEXT|ZOOM|SLIDE|SOCIAL|NAVIGATION/.test(aria)) return;
    if (element.classList.contains("mobileMenuBtn")) return;

    const rawLabel = normalize(element.textContent || "");
    const cleanLabel = rawLabel.replace(/[↗↓]/g, "").trim();
    const upper = cleanLabel.toUpperCase();
    const isSubmit =
      element instanceof HTMLButtonElement && element.type === "submit";
    const isKnown = ctaLabels.some((label) => upper.includes(label));

    if (!isSubmit && !isKnown) return;

    element.classList.add("imvo-contact-editorial-cta");
    element.dataset.imvoCtaArrow = rawLabel.includes("↓") ? "down" : "out";

    if (element.childElementCount === 0 && cleanLabel && rawLabel !== cleanLabel) {
      element.textContent = cleanLabel;
    }
  });
}

function installContactPhoto() {
  const form = document.querySelector<HTMLFormElement>("#quote form");
  const section = form?.closest<HTMLElement>("section");
  const layout = section?.querySelector<HTMLElement>(".containerWide");
  const left = layout?.firstElementChild as HTMLElement | null;

  if (!form || !section || !left) return false;
  if (section.querySelector('[data-imvo-photo="contact"]')) return true;

  left.classList.add("imvo-contact-photo-column");
  left.style.display = "flex";
  left.style.flexDirection = "column";
  left.style.gap = "36px";

  const figure = document.createElement("figure");
  figure.setAttribute("data-imvo-photo", "contact");
  Object.assign(figure.style, {
    margin: "0",
    width: "100%",
    maxWidth: "660px",
    aspectRatio: "4 / 5",
    position: "relative",
    overflow: "hidden",
    background: "#090909",
    border: "1px solid rgba(255,255,255,.09)",
  });

  const image = document.createElement("img");
  image.src = "/imvo-contact-team.webp";
  image.alt = "IMVO team reviewing project drawings";
  image.loading = "lazy";
  image.decoding = "async";
  Object.assign(image.style, {
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover",
    objectPosition: "center top",
  });

  figure.appendChild(image);
  left.appendChild(figure);
  return true;
}

export default function ContactEnhancements() {
  useEffect(() => {
    let observer: MutationObserver | null = null;

    const enhance = () => {
      applyContactCtas();
      const complete = installContactPhoto();
      if (complete) observer?.disconnect();
    };

    observer = new MutationObserver(enhance);
    observer.observe(document.body, { childList: true, subtree: true });

    const frame = window.requestAnimationFrame(enhance);
    const delayed = window.setTimeout(enhance, 250);
    const timeout = window.setTimeout(() => observer?.disconnect(), 4000);

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
      window.clearTimeout(delayed);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <style jsx global>{`
      .imvo-contact-editorial-cta {
        min-width: 208px !important;
        min-height: 54px !important;
        padding: 0 20px !important;
        border: 1px solid rgba(255,255,255,0.95) !important;
        border-radius: 2px !important;
        background: #ffffff !important;
        color: #050505 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 18px !important;
        text-decoration: none !important;
        font-size: 12px !important;
        font-weight: 850 !important;
        letter-spacing: 0.075em !important;
        line-height: 1 !important;
        text-transform: uppercase !important;
        white-space: nowrap !important;
        box-shadow: none !important;
        transition: background 260ms ease, color 260ms ease, transform 260ms ease,
          border-color 260ms ease !important;
      }

      .imvo-contact-editorial-cta::after {
        content: "↗";
        margin-left: auto;
        font-size: 15px;
        line-height: 1;
        transform: translate(0, 0);
        transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
      }

      .imvo-contact-editorial-cta[data-imvo-cta-arrow="down"]::after {
        content: "↓";
      }

      .imvo-contact-editorial-cta:hover {
        background: #0b0b0b !important;
        color: #ffffff !important;
        transform: translateY(-2px);
      }

      .imvo-contact-editorial-cta:hover::after {
        transform: translate(4px, -2px);
      }

      [data-imvo-photo="contact"] img {
        filter: grayscale(1) contrast(1.03);
        transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease;
      }

      [data-imvo-photo="contact"]:hover img {
        transform: scale(1.018);
        filter: grayscale(0.18) contrast(1.02);
      }

      @media (max-width: 900px) {
        .imvo-contact-photo-column [data-imvo-photo="contact"] {
          width: min(100%, 620px) !important;
          max-width: 620px !important;
          aspect-ratio: 4 / 5 !important;
        }
      }

      @media (max-width: 767px) {
        .imvo-contact-editorial-cta {
          min-width: min(100%, 216px) !important;
          min-height: 50px !important;
          padding: 0 16px !important;
          font-size: 10px !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .imvo-contact-editorial-cta,
        [data-imvo-photo="contact"] img {
          transition: none !important;
        }
      }
    `}</style>
  );
}
