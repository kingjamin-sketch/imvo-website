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

const pageGalleries: Record<string, { eyebrow: string; title: string; images: { src: string; alt: string; ratio: string }[] }> = {
  "/about": {
    eyebrow: "Inside IMVO",
    title: "A studio shaped by collaboration, technical focus, and shared responsibility.",
    images: [
      { src: "/imvo-about-main.webp", alt: "IMVO Group studio team", ratio: "4 / 5" },
      { src: "/imvo-about-support.webp", alt: "IMVO team collaborating in the studio", ratio: "4 / 5" },
    ],
  },
  "/services": {
    eyebrow: "How We Work",
    title: "Consultancy, coordination, and technical thinking in practice.",
    images: [
      { src: "/imvo-services-consultancy.webp", alt: "IMVO consultancy and architectural review", ratio: "16 / 11" },
      { src: "/imvo-services-coordination.webp", alt: "IMVO team coordinating architectural drawings", ratio: "4 / 5" },
      { src: "/imvo-services-technical.webp", alt: "IMVO technical design review", ratio: "4 / 5" },
    ],
  },
};

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
        if (frame) {
          frame.style.position = "relative";
          frame.style.aspectRatio = "4 / 3";
          frame.style.height = "auto";
          frame.style.minHeight = "0";
          frame.style.maxHeight = "none";
          frame.style.overflow = "hidden";

          if (!frame.querySelector("[data-imvo-team-main]")) {
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
              objectFit: "cover",
              objectPosition: "center center",
              background: "#080808",
            });
            frame.appendChild(img);
          }
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
            target.style.objectFit = "cover";
            target.style.objectPosition = "center 38%";
          }
        }

        const history = textElement("Firm History");
        const historySection = history?.closest<HTMLElement>("section");
        if (history && historySection && !historySection.querySelector('[data-imvo-photo="history"]')) {
          const layout = nearestLayout(history, historySection) || historySection.querySelector<HTMLElement>(".containerWide");
          if (layout) {
            layout.style.display = "grid";
            layout.style.gridTemplateColumns = "minmax(300px, .85fr) minmax(0, 1.15fr)";
            layout.style.gap = "clamp(36px, 5vw, 76px)";
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

  const gallery = pageGalleries[pathname];

  return (
    <>
      {gallery && (
        <section className="imvo-restored-gallery">
          <div className="imvo-restored-gallery-inner">
            <div className="imvo-restored-gallery-copy">
              <span>{gallery.eyebrow}</span>
              <h2>{gallery.title}</h2>
            </div>
            <div className={`imvo-restored-gallery-grid imvo-restored-gallery-grid-${gallery.images.length}`}>
              {gallery.images.map((image) => (
                <figure key={image.src} style={{ aspectRatio: image.ratio }}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <style jsx global>{`
        [data-imvo-photo] img,
        .imvo-restored-gallery img { transition: transform .8s cubic-bezier(.16,1,.3,1); filter: grayscale(1) contrast(1.03); }
        [data-imvo-photo]:hover img,
        .imvo-restored-gallery figure:hover img { transform: scale(1.025); }
        .teamImageFrame { aspect-ratio: 4 / 3 !important; height: auto !important; min-height: 0 !important; max-height: none !important; }
        .teamImageFrame [data-imvo-team-main] { width: 100% !important; height: 100% !important; object-fit: cover !important; object-position: center center !important; }
        .imvo-restored-gallery { background: #060606; color: white; padding: clamp(72px, 8vw, 128px) 0; border-top: 1px solid rgba(255,255,255,.08); }
        .imvo-restored-gallery-inner { width: min(1400px, calc(100% - 48px)); margin: 0 auto; }
        .imvo-restored-gallery-copy { display: grid; grid-template-columns: .42fr 1.58fr; gap: 30px; margin-bottom: clamp(34px, 5vw, 64px); align-items: start; }
        .imvo-restored-gallery-copy span { padding-top: 10px; font-size: 11px; letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,.5); }
        .imvo-restored-gallery-copy h2 { margin: 0; font-size: clamp(34px, 5vw, 76px); line-height: .98; letter-spacing: -.055em; max-width: 980px; }
        .imvo-restored-gallery-grid { display: grid; gap: clamp(14px, 1.6vw, 24px); align-items: start; }
        .imvo-restored-gallery-grid-2 { grid-template-columns: 1.12fr .88fr; }
        .imvo-restored-gallery-grid-3 { grid-template-columns: 1.14fr .86fr .86fr; }
        .imvo-restored-gallery figure { margin: 0; overflow: hidden; background: #111; border: 1px solid rgba(255,255,255,.08); }
        .imvo-restored-gallery img { width: 100%; height: 100%; display: block; object-fit: cover; }
        @media (max-width: 900px) {
          section [style*="grid-template-columns: minmax(0, 1.05fr)"],
          section [style*="grid-template-columns: minmax(300px, .85fr)"] { grid-template-columns: 1fr !important; }
          .imvo-restored-gallery-inner { width: min(100% - 30px, 1400px); }
          .imvo-restored-gallery-copy { grid-template-columns: 1fr; gap: 14px; }
          .imvo-restored-gallery-copy span { padding-top: 0; }
          .imvo-restored-gallery-grid-3 { grid-template-columns: 1fr 1fr; }
          .imvo-restored-gallery-grid-3 figure:first-child { grid-column: 1 / -1; aspect-ratio: 16 / 10 !important; }
        }
        @media (max-width: 620px) {
          .teamImageFrame { width: 100% !important; aspect-ratio: 4 / 3 !important; border-radius: 0 !important; }
          .teamImageFrame [data-imvo-team-main] { object-fit: cover !important; object-position: center center !important; }
          .imvo-restored-gallery { padding: 64px 0; }
          .imvo-restored-gallery-grid-2,
          .imvo-restored-gallery-grid-3 { grid-template-columns: 1fr; }
          .imvo-restored-gallery-grid-3 figure:first-child { grid-column: auto; aspect-ratio: 4 / 5 !important; }
          .imvo-restored-gallery figure { aspect-ratio: 4 / 5 !important; }
          [data-imvo-photo="contact"] { aspect-ratio: 4 / 5 !important; }
        }
      `}</style>
    </>
  );
}
