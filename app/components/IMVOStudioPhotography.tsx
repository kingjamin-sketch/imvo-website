"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const baseImageStyle = {
  width: "100%",
  height: "100%",
  display: "block",
  objectFit: "cover",
  objectPosition: "center center",
} as const;

function textElement(text: string) {
  return [...document.querySelectorAll<HTMLElement>("h1,h2,h3,h4,p,div,span")].find((element) =>
    element.textContent?.trim().toLowerCase().includes(text.toLowerCase()),
  );
}

function makePhoto(
  src: string,
  alt: string,
  marker: string,
  ratio = "4 / 5",
  objectFit: "cover" | "contain" = "cover",
  objectPosition = "center center",
) {
  const figure = document.createElement("figure");
  figure.setAttribute("data-imvo-photo", marker);
  Object.assign(figure.style, {
    margin: "0",
    width: "100%",
    aspectRatio: ratio,
    position: "relative",
    overflow: "hidden",
    background: "#0a0a0a",
    border: "1px solid rgba(255,255,255,.09)",
  });

  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.loading = "lazy";
  Object.assign(image.style, {
    ...baseImageStyle,
    objectFit,
    objectPosition,
  });

  figure.appendChild(image);
  return figure;
}

function replaceSectionImage(
  section: HTMLElement,
  src: string,
  alt: string,
  marker: string,
  options?: {
    ratio?: string;
    objectFit?: "cover" | "contain";
    objectPosition?: string;
  },
) {
  if (section.querySelector(`[data-imvo-replacement="${marker}"]`)) return;

  const images = [...section.querySelectorAll<HTMLImageElement>("img")];
  const target = images.sort((a, b) => b.clientWidth * b.clientHeight - a.clientWidth * a.clientHeight)[0];
  if (!target) return;

  const frame = target.parentElement as HTMLElement | null;
  if (!frame) return;

  frame.setAttribute("data-imvo-replacement", marker);
  frame.style.position = "relative";
  frame.style.overflow = "hidden";
  frame.style.background = "#0a0a0a";
  if (options?.ratio) {
    frame.style.aspectRatio = options.ratio;
    frame.style.minHeight = "0";
  }

  target.style.opacity = "0";

  const replacement = document.createElement("img");
  replacement.src = src;
  replacement.alt = alt;
  replacement.setAttribute("data-imvo-overlay-image", marker);
  Object.assign(replacement.style, {
    ...baseImageStyle,
    position: "absolute",
    inset: "0",
    zIndex: "2",
    objectFit: options?.objectFit || "cover",
    objectPosition: options?.objectPosition || "center center",
  });

  frame.appendChild(replacement);
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
          frame.style.minHeight = "0";
          frame.style.background = "#080808";
          frame.querySelectorAll<HTMLElement>("img,picture").forEach((node) => {
            node.style.opacity = "0";
          });

          const image = document.createElement("img");
          image.src = "/imvo-team-main.webp";
          image.alt = "IMVO Group team portrait";
          image.setAttribute("data-imvo-team-main", "true");
          Object.assign(image.style, {
            ...baseImageStyle,
            position: "absolute",
            inset: "0",
            zIndex: "2",
            objectFit: "cover",
            objectPosition: "center center",
          });
          frame.appendChild(image);
        }
      }

      if (pathname === "/about") {
        const cultureHeading = textElement("A collaborative space built for technical excellence");
        const cultureSection = cultureHeading?.closest<HTMLElement>("section");
        if (cultureSection) {
          replaceSectionImage(
            cultureSection,
            "/imvo-about-main.webp",
            "IMVO Group studio team",
            "about-culture",
            { ratio: "4 / 5", objectFit: "cover", objectPosition: "center top" },
          );

          const replacementFrame = cultureSection.querySelector<HTMLElement>('[data-imvo-replacement="about-culture"]');
          if (replacementFrame) {
            replacementFrame.style.maxWidth = "720px";
            replacementFrame.style.marginLeft = "auto";
          }
        }

        const historyHeading = textElement("Firm History");
        const historySection = historyHeading?.closest<HTMLElement>("section");
        const historyLayout = historySection?.querySelector<HTMLElement>(".containerWide");
        const historyColumn = historyLayout?.firstElementChild as HTMLElement | null;
        if (historyColumn && !historyColumn.querySelector('[data-imvo-photo="history"]')) {
          historyColumn.classList.add("imvo-history-photo-column");
          const photo = makePhoto(
            "/imvo-about-support.webp",
            "IMVO technical team in the studio",
            "history",
            "4 / 5",
            "cover",
            "center top",
          );
          photo.style.marginTop = "48px";
          photo.style.maxWidth = "480px";
          historyColumn.appendChild(photo);
        }
      }

      if (pathname === "/services") {
        const philosophyHeading = textElement("Architecture should do more than occupy land");
        const philosophySection = philosophyHeading?.closest<HTMLElement>("section");
        const philosophyContainer = philosophySection?.querySelector<HTMLElement>(".containerWide");
        if (philosophyContainer && !philosophyContainer.querySelector('[data-imvo-photo="services-consultancy"]')) {
          philosophyContainer.classList.add("imvo-services-philosophy-grid");
          philosophyContainer.style.display = "grid";
          philosophyContainer.style.gridTemplateColumns = "minmax(0, 1fr) minmax(360px, .78fr)";
          philosophyContainer.style.gap = "clamp(44px, 7vw, 110px)";
          philosophyContainer.style.alignItems = "center";
          philosophyContainer.style.textAlign = "left";

          const copy = philosophyContainer.firstElementChild as HTMLElement | null;
          if (copy) {
            copy.style.maxWidth = "820px";
            copy.style.alignItems = "flex-start";
          }

          philosophyContainer.appendChild(
            makePhoto(
              "/imvo-services-consultancy.webp",
              "IMVO architectural consultancy review",
              "services-consultancy",
              "4 / 5",
              "cover",
              "center center",
            ),
          );
        }

        const coordinationHeading = textElement("Design intent is protected through disciplined execution");
        const coordinationSection = coordinationHeading?.closest<HTMLElement>("section");
        if (coordinationSection) {
          replaceSectionImage(
            coordinationSection,
            "/imvo-services-coordination.webp",
            "IMVO team coordinating architectural drawings",
            "services-coordination",
            { objectFit: "cover", objectPosition: "center 28%" },
          );
        }

        const processHeading = textElement("A structured process for clear decisions and responsible delivery");
        const processSection = processHeading?.closest<HTMLElement>("section");
        if (processSection) {
          replaceSectionImage(
            processSection,
            "/imvo-services-technical.webp",
            "IMVO technical design review",
            "services-technical",
            { ratio: "4 / 5", objectFit: "cover", objectPosition: "center top" },
          );
        }
      }

      if (pathname === "/contact") {
        const form = document.querySelector<HTMLFormElement>("form");
        const section = form?.closest<HTMLElement>("section");
        if (form && section && !section.querySelector('[data-imvo-photo="contact"]')) {
          let layout: HTMLElement | null = form.parentElement;
          while (layout && layout !== section) {
            const display = window.getComputedStyle(layout).display;
            if ((display === "grid" || display === "flex") && layout.children.length >= 2) break;
            layout = layout.parentElement;
          }

          const left = layout?.firstElementChild as HTMLElement | null;
          if (left) {
            left.classList.add("imvo-contact-photo-column");
            left.style.display = "flex";
            left.style.flexDirection = "column";
            left.style.gap = "36px";

            const photo = makePhoto(
              "/imvo-contact-team.webp",
              "IMVO team reviewing project drawings",
              "contact",
              "4 / 5",
              "cover",
              "center top",
            );
            photo.style.maxWidth = "660px";
            left.appendChild(photo);
          }
        }
      }
    };

    enhance();
    const observer = new MutationObserver(enhance);
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 14000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <style jsx global>{`
      [data-imvo-photo] img,
      [data-imvo-overlay-image] {
        filter: grayscale(1) contrast(1.03);
        transition: transform .8s cubic-bezier(.16,1,.3,1), filter .8s ease;
      }

      [data-imvo-photo]:hover img,
      [data-imvo-replacement]:hover [data-imvo-overlay-image] {
        transform: scale(1.018);
        filter: grayscale(.18) contrast(1.02);
      }

      .imvo-history-photo-column {
        align-self: start;
      }

      @media (max-width: 900px) {
        .imvo-services-philosophy-grid {
          grid-template-columns: 1fr !important;
          gap: 34px !important;
          text-align: left !important;
        }

        .imvo-services-philosophy-grid > [data-imvo-photo] {
          max-width: 620px;
        }

        .imvo-history-photo-column [data-imvo-photo] {
          max-width: 100% !important;
          margin-top: 30px !important;
        }

        .imvo-contact-photo-column [data-imvo-photo] {
          width: min(100%, 620px) !important;
          max-width: 620px !important;
          aspect-ratio: 4 / 5 !important;
        }

        .teamImageFrame {
          min-height: 0 !important;
          aspect-ratio: 4 / 3 !important;
        }

        .teamImageFrame [data-imvo-team-main] {
          object-fit: cover !important;
          object-position: center center !important;
        }
      }

      @media (max-width: 620px) {
        .teamImageFrame {
          aspect-ratio: 4 / 3 !important;
        }

        .imvo-services-philosophy-grid > [data-imvo-photo],
        .imvo-contact-photo-column [data-imvo-photo] {
          aspect-ratio: 4 / 5 !important;
        }

        [data-imvo-replacement="about-culture"] {
          aspect-ratio: 4 / 5 !important;
          width: 100% !important;
          margin-left: 0 !important;
        }
      }
    `}</style>
  );
}
