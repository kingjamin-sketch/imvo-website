"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const photoStyle = {
  width: "100%",
  height: "100%",
  display: "block",
  objectFit: "cover",
  objectPosition: "center center",
} as const;

function makePhoto(src: string, alt: string, marker: string, ratio = "4 / 5") {
  const figure = document.createElement("figure");
  figure.setAttribute("data-imvo-photo", marker);
  Object.assign(figure.style, {
    margin: "0",
    width: "100%",
    aspectRatio: ratio,
    position: "relative",
    overflow: "hidden",
    background: "#111",
    border: "1px solid rgba(255,255,255,.08)",
  });
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.loading = "lazy";
  Object.assign(img.style, photoStyle);
  figure.appendChild(img);
  return figure;
}

function textElement(text: string) {
  return [...document.querySelectorAll<HTMLElement>("h1,h2,h3,h4,p,div,span")].find((el) =>
    el.textContent?.trim().toLowerCase().includes(text.toLowerCase()),
  );
}

function nearestLayout(el: HTMLElement, stop: HTMLElement | null) {
  let node: HTMLElement | null = el.parentElement;
  while (node && node !== stop) {
    const display = window.getComputedStyle(node).display;
    if ((display === "grid" || display === "flex") && node.children.length >= 2) return node;
    node = node.parentElement;
  }
  return null;
}

export default function IMVOStudioPhotography() {
  const pathname = usePathname();

  useEffect(() => {
    const enhance = () => {
      if (pathname === "/") {
        const frame = document.querySelector<HTMLElement>(".teamImageFrame");
        if (frame && !frame.querySelector("[data-imvo-team-main]")) {
          frame.style.position = "relative";
          frame.style.aspectRatio = "4 / 3";
          frame.style.minHeight = "clamp(420px, 56vw, 820px)";
          frame.querySelectorAll<HTMLElement>("img,picture").forEach((node) => (node.style.opacity = "0"));
          const img = document.createElement("img");
          img.src = "/imvo-team-main.webp";
          img.alt = "IMVO Group team portrait";
          img.setAttribute("data-imvo-team-main", "true");
          Object.assign(img.style, {
            ...photoStyle,
            position: "absolute",
            inset: "0",
            zIndex: "2",
            objectFit: "contain",
            background: "#080808",
          });
          frame.appendChild(img);
        }

        const philosophy = textElement("Architecture should do more than occupy land");
        const section = philosophy?.closest<HTMLElement>("section");
        if (philosophy && section && !section.querySelector('[data-imvo-photo="philosophy"]')) {
          const layout = nearestLayout(philosophy, section) || section.querySelector<HTMLElement>(".containerWide");
          if (layout) {
            layout.style.display = "grid";
            layout.style.gridTemplateColumns = "minmax(0, 1.05fr) minmax(340px, .95fr)";
            layout.style.gap = "clamp(42px, 6vw, 96px)";
            layout.style.alignItems = "center";
            layout.appendChild(makePhoto("/imvo-services-coordination.webp", "IMVO team reviewing architectural drawings", "philosophy", "4 / 5"));
          }
        }
      }

      if (pathname === "/about") {
        const culture = textElement("A collaborative space built for technical excellence");
        const cultureSection = culture?.closest<HTMLElement>("section");
        if (cultureSection) {
          const images = [...cultureSection.querySelectorAll<HTMLImageElement>("img")];
          const target = images.sort((a, b) => b.clientWidth * b.clientHeight - a.clientWidth * a.clientHeight)[0];
          if (target && !target.dataset.imvoReplaced) {
            target.src = "/imvo-about-main.webp";
            target.alt = "IMVO Group studio team";
            target.dataset.imvoReplaced = "true";
            target.style.objectPosition = "center 35%";
          }
        }

        const history = textElement("Firm History");
        const historySection = history?.closest<HTMLElement>("section");
        if (history && historySection && !historySection.querySelector('[data-imvo-photo="history"]')) {
          const layout = nearestLayout(history, historySection) || historySection.querySelector<HTMLElement>(".containerWide");
          if (layout) {
            layout.style.display = "grid";
            layout.style.gridTemplateColumns = "minmax(320px, .9fr) minmax(0, 1.1fr)";
            layout.style.gap = "clamp(42px, 6vw, 90px)";
            layout.style.alignItems = "start";
            const photo = makePhoto("/imvo-about-support.webp", "IMVO team collaboration in the studio", "history", "4 / 5");
            const first = layout.firstElementChild;
            first?.insertAdjacentElement("afterend", photo);
          }
        }
      }

      if (pathname === "/contact") {
        const form = document.querySelector<HTMLFormElement>("form");
        const section = form?.closest<HTMLElement>("section");
        if (form && section && !section.querySelector('[data-imvo-photo="contact"]')) {
          const layout = nearestLayout(form, section);
          if (layout) {
            layout.style.alignItems = "start";
            const left = layout.firstElementChild as HTMLElement | null;
            if (left) {
              left.style.display = "flex";
              left.style.flexDirection = "column";
              left.style.gap = "36px";
              left.appendChild(makePhoto("/imvo-contact-team.webp", "IMVO team available for project consultations", "contact", "16 / 11"));
            }
          }
        }
      }

      return Boolean(document.querySelector("[data-imvo-team-main],[data-imvo-photo],[data-imvo-replaced]"));
    };

    enhance();
    const observer = new MutationObserver(enhance);
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 12000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <style jsx global>{`
      [data-imvo-photo] img { transition: transform .8s cubic-bezier(.16,1,.3,1); filter: grayscale(1) contrast(1.03); }
      [data-imvo-photo]:hover img { transform: scale(1.025); }
      @media (max-width: 900px) {
        section [style*="grid-template-columns: minmax(0, 1.05fr)"],
        section [style*="grid-template-columns: minmax(320px, .9fr)"] { grid-template-columns: 1fr !important; }
        .teamImageFrame { min-height: 0 !important; aspect-ratio: 4 / 3 !important; }
      }
    `}</style>
  );
}
