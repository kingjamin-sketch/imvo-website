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

function normalize(value: string | null | undefined) {
  return (value || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function findHeading(text: string) {
  const needle = normalize(text);
  return [...document.querySelectorAll<HTMLElement>("h1,h2,h3,h4")].find((element) =>
    normalize(element.textContent).includes(needle),
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
    background: "#090909",
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

function replaceLargestImage(
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

  const images = [...section.querySelectorAll<HTMLImageElement>("img")].filter(
    (image) => !image.closest("[data-imvo-photo]"),
  );
  const target = images.sort((a, b) => b.getBoundingClientRect().width * b.getBoundingClientRect().height - a.getBoundingClientRect().width * a.getBoundingClientRect().height)[0];
  if (!target) return;

  const frame = target.parentElement as HTMLElement | null;
  if (!frame) return;

  frame.setAttribute("data-imvo-replacement", marker);
  frame.style.position = "relative";
  frame.style.overflow = "hidden";
  frame.style.background = "#090909";
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

function nearestTwoColumnLayout(element: HTMLElement, section: HTMLElement) {
  let node: HTMLElement | null = element.parentElement;
  while (node && node !== section) {
    const style = window.getComputedStyle(node);
    if ((style.display === "grid" || style.display === "flex") && node.children.length >= 2) {
      return node;
    }
    node = node.parentElement;
  }
  return section.querySelector<HTMLElement>(".containerWide");
}

export default function IMVOStudioPhotography() {
  const pathname = usePathname();

  useEffect(() => {
    let stopped = false;

    const enhance = () => {
      if (stopped) return;

      if (pathname === "/") {
        const frame = document.querySelector<HTMLElement>(".teamImageFrame");
        if (frame && !frame.querySelector("[data-imvo-team-main]")) {
          frame.style.position = "relative";
          frame.style.aspectRatio = "4 / 3";
          frame.style.minHeight = "0";
          frame.style.height = "auto";
          frame.style.background = "#080808";
          frame.style.overflow = "hidden";
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
            objectFit: "contain",
            objectPosition: "center center",
            background: "#080808",
          });
          frame.appendChild(image);
        }
      }

      if (pathname === "/about") {
        const cultureHeading = findHeading("A collaborative space built for technical excellence");
        const cultureSection = cultureHeading?.closest<HTMLElement>("section");
        if (cultureSection) {
          replaceLargestImage(
            cultureSection,
            "/imvo-about-main.webp",
            "IMVO Group studio team",
            "about-culture",
            { ratio: "4 / 5", objectFit: "contain", objectPosition: "center center" },
          );

          const frame = cultureSection.querySelector<HTMLElement>('[data-imvo-replacement="about-culture"]');
          if (frame) {
            frame.classList.add("imvo-about-culture-photo");
            frame.style.maxWidth = "720px";
            frame.style.marginLeft = "auto";
          }
        }

        const historyHeading = findHeading("Firm History");
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
            "contain",
            "center center",
          );
          photo.style.marginTop = "48px";
          photo.style.maxWidth = "480px";
          historyColumn.appendChild(photo);
        }
      }

      if (pathname === "/services") {
        const philosophyHeading = findHeading("Architecture should do more than occupy land");
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

          const photo = makePhoto(
            "/imvo-services-consultancy.webp",
            "IMVO architectural consultancy review",
            "services-consultancy",
            "4 / 5",
            "cover",
            "center center",
          );
          philosophyContainer.appendChild(photo);
        }

        const coordinationHeading = findHeading("Design intent is protected through disciplined execution");
        const coordinationSection = coordinationHeading?.closest<HTMLElement>("section");
        if (coordinationSection) {
          replaceLargestImage(
            coordinationSection,
            "/imvo-services-coordination.webp",
            "IMVO team coordinating architectural drawings",
            "services-coordination",
            { objectFit: "cover", objectPosition: "center 25%" },
          );
        }

        const processHeading = findHeading("A structured process for clear decisions and responsible delivery");
        const processSection = processHeading?.closest<HTMLElement>("section");
        if (processSection) {
          replaceLargestImage(
            processSection,
            "/imvo-services-technical.webp",
            "IMVO technical design review",
            "services-technical",
            { ratio: "4 / 5", objectFit: "contain", objectPosition: "center center" },
          );
        }
      }

      if (pathname === "/contact") {
        const form = document.querySelector<HTMLFormElement>("form");
        const section = form?.closest<HTMLElement>("section");
        if (form && section && !section.querySelector('[data-imvo-photo="contact"]')) {
          const layout = nearestTwoColumnLayout(form, section);
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
    const interval = window.setInterval(enhance, 500);
    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
      observer.disconnect();
    }, 16000);

    return () => {
      stopped = true;
      observer.disconnect();
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <style jsx global>{`
      [data-imvo-photo] img,
      [data-imvo-overlay-image],
      [data-imvo-team-main] {
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
          width: min(100%, 620px) !important;
          max-width: 620px !important;
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
          height: auto !important;
          aspect-ratio: 4 / 3 !important;
        }

        .teamImageFrame [data-imvo-team-main] {
          object-fit: contain !important;
          object-position: center center !important;
        }

        [data-imvo-replacement="about-culture"],
        [data-imvo-replacement="services-technical"] {
          width: 100% !important;
          max-width: 720px !important;
          margin-left: 0 !important;
        }
      }

      @media (max-width: 620px) {
        .teamImageFrame {
          aspect-ratio: 4 / 3 !important;
        }

        .teamImageFrame [data-imvo-team-main] {
          object-fit: contain !important;
        }

        .imvo-services-philosophy-grid > [data-imvo-photo],
        .imvo-contact-photo-column [data-imvo-photo],
        [data-imvo-replacement="about-culture"],
        [data-imvo-replacement="services-technical"] {
          aspect-ratio: 4 / 5 !important;
        }
      }
    `}</style>
  );
}
