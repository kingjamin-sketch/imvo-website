"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const pagePhotography: Record<string, { eyebrow: string; title: string; images: { src: string; alt: string; ratio: string }[] }> = {
  "/about": {
    eyebrow: "Inside IMVO",
    title: "A studio built around clarity, collaboration and delivery.",
    images: [
      { src: "/imvo-about-main.webp", alt: "IMVO Group team portrait", ratio: "4 / 5" },
      { src: "/imvo-about-support.webp", alt: "IMVO team working together in the studio", ratio: "4 / 5" },
    ],
  },
  "/services": {
    eyebrow: "How We Work",
    title: "Consultancy, coordination and technical thinking in practice.",
    images: [
      { src: "/imvo-services-consultancy.webp", alt: "IMVO consultancy and architectural review", ratio: "16 / 11" },
      { src: "/imvo-services-coordination.webp", alt: "IMVO team coordinating architectural drawings", ratio: "4 / 5" },
      { src: "/imvo-services-technical.webp", alt: "IMVO technical design review", ratio: "4 / 5" },
    ],
  },
  "/contact": {
    eyebrow: "Start a Conversation",
    title: "Bring the site, the ambition and the questions. We will help define the path forward.",
    images: [
      { src: "/imvo-contact-team.webp", alt: "IMVO team available for project consultations", ratio: "4 / 5" },
    ],
  },
};

export default function IMVOStudioPhotography() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const applyTeamImage = () => {
      const frame = document.querySelector<HTMLElement>(".teamImageFrame");
      if (!frame || frame.querySelector("[data-imvo-team-main]")) return Boolean(frame);

      frame.style.position = "relative";
      const existing = frame.querySelectorAll<HTMLElement>("img, picture");
      existing.forEach((node) => {
        node.style.opacity = "0";
      });

      const image = document.createElement("img");
      image.src = "/imvo-team-main.webp";
      image.alt = "IMVO Group team portrait";
      image.setAttribute("data-imvo-team-main", "true");
      Object.assign(image.style, {
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center center",
        display: "block",
        zIndex: "2",
      });
      frame.appendChild(image);
      return true;
    };

    if (applyTeamImage()) return;
    const observer = new MutationObserver(() => {
      if (applyTeamImage()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 10000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  const content = pagePhotography[pathname];
  if (!content) return null;

  return (
    <section className={`imvo-photo-story imvo-photo-story-${pathname.slice(1)}`}>
      <div className="imvo-photo-story-inner">
        <div className="imvo-photo-story-copy">
          <div className="imvo-photo-story-eyebrow">{content.eyebrow}</div>
          <h2>{content.title}</h2>
        </div>
        <div className={`imvo-photo-grid imvo-photo-grid-${content.images.length}`}>
          {content.images.map((image, index) => (
            <figure key={image.src} style={{ aspectRatio: image.ratio }} className={`imvo-photo-${index + 1}`}>
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
      <style jsx>{`
        .imvo-photo-story {
          background: #060606;
          color: #fff;
          padding: clamp(76px, 9vw, 144px) 0;
          border-top: 1px solid rgba(255,255,255,.08);
        }
        .imvo-photo-story-inner {
          width: min(1400px, calc(100% - 48px));
          margin: 0 auto;
        }
        .imvo-photo-story-copy {
          display: grid;
          grid-template-columns: minmax(160px,.45fr) minmax(0,1.55fr);
          gap: 34px;
          align-items: start;
          margin-bottom: clamp(38px,5vw,72px);
        }
        .imvo-photo-story-eyebrow {
          font-size: 11px;
          line-height: 1;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(255,255,255,.5);
          padding-top: 13px;
        }
        h2 {
          margin: 0;
          max-width: 980px;
          font-size: clamp(34px,5.2vw,78px);
          line-height: .98;
          letter-spacing: -.055em;
          font-weight: 700;
        }
        .imvo-photo-grid {
          display: grid;
          gap: clamp(14px,1.6vw,26px);
          align-items: start;
        }
        .imvo-photo-grid-1 { grid-template-columns: minmax(0,1fr); }
        .imvo-photo-grid-2 { grid-template-columns: 1.12fr .88fr; }
        .imvo-photo-grid-3 { grid-template-columns: 1.15fr .85fr .85fr; }
        figure {
          position: relative;
          overflow: hidden;
          margin: 0;
          background: #111;
        }
        img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform .8s cubic-bezier(.16,1,.3,1), filter .8s ease;
          filter: grayscale(1) contrast(1.03);
        }
        figure:hover img { transform: scale(1.025); filter: grayscale(.2) contrast(1.02); }
        .imvo-photo-story-contact .imvo-photo-grid { max-width: 920px; margin-left: auto; }
        .imvo-photo-story-contact figure { aspect-ratio: 16 / 10 !important; }
        @media (max-width: 900px) {
          .imvo-photo-story-inner { width: min(100% - 30px, 1400px); }
          .imvo-photo-story-copy { grid-template-columns: 1fr; gap: 16px; }
          .imvo-photo-story-eyebrow { padding-top: 0; }
          .imvo-photo-grid-3 { grid-template-columns: 1fr 1fr; }
          .imvo-photo-grid-3 .imvo-photo-1 { grid-column: 1 / -1; aspect-ratio: 16 / 10 !important; }
        }
        @media (max-width: 620px) {
          .imvo-photo-grid-2,
          .imvo-photo-grid-3 { grid-template-columns: 1fr; }
          .imvo-photo-grid-3 .imvo-photo-1 { grid-column: auto; }
          figure { aspect-ratio: 4 / 5 !important; }
          .imvo-photo-story-contact figure { aspect-ratio: 4 / 5 !important; }
        }
      `}</style>
    </section>
  );
}
