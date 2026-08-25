"use client";

import { useEffect } from "react";

const revealIds = [
  "properties",
  "in-action",
  "services",
  "how-it-works",
  "for-owners",
  "faq",
  "talk-to-us",
];

function directArticleGrid(section: HTMLElement | null, count?: number) {
  if (!section) return null;
  return Array.from(section.children).find((child) => {
    if (!(child instanceof HTMLElement)) return false;
    const articles = Array.from(child.children).filter(
      (item) => item instanceof HTMLElement && item.tagName === "ARTICLE",
    );
    return count ? articles.length === count : articles.length > 0;
  }) as HTMLElement | undefined;
}

export default function DomicileMotionEnhancements() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    const hero = document.querySelector<HTMLElement>("main > section");
    if (hero) {
      hero.classList.add("domicile-motion-hero");
      const heading = hero.querySelector("h1");
      const copy = heading?.parentElement;
      if (copy) {
        Array.from(copy.children).forEach((child, index) => {
          if (!(child instanceof HTMLElement)) return;
          child.classList.add("domicile-hero-reveal");
          child.style.setProperty("--domicile-delay", `${120 + index * 95}ms`);
        });
      }
      const quickCard = hero.querySelector<HTMLElement>("aside");
      if (quickCard) {
        quickCard.classList.add("domicile-hero-reveal");
        quickCard.style.setProperty("--domicile-delay", "420ms");
      }
    }

    document.querySelectorAll<HTMLElement>("header nav a").forEach((link) => {
      const label = (link.textContent || "").trim();
      if (!label) return;
      link.classList.add("domicile-text-roll");
      link.dataset.roll = label;
    });

    const services = document.getElementById("services");
    const servicesGrid = directArticleGrid(services, 6);
    if (servicesGrid) {
      servicesGrid.classList.add("domicile-bento-grid");
      Array.from(servicesGrid.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement)) return;
        child.classList.add("domicile-bento-card");
        child.dataset.bentoNumber = String(index + 1).padStart(2, "0");
        const title = child.querySelector<HTMLElement>("h3");
        if (title) {
          const label = (title.textContent || "").trim();
          title.classList.add("domicile-text-roll", "domicile-service-roll");
          title.dataset.roll = label;
        }
      });
    }

    const process = document.getElementById("how-it-works");
    const processGrid = directArticleGrid(process, 4);
    if (processGrid) {
      processGrid.classList.add("domicile-process-flow");
      Array.from(processGrid.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement)) return;
        child.classList.add("domicile-process-step");
        child.style.setProperty("--process-index", String(index));
      });
    }

    const assurance = document.getElementById("for-owners");
    const assuranceGrid = directArticleGrid(assurance, 3);
    if (assuranceGrid) {
      assuranceGrid.classList.add("domicile-assurance-cards");
      Array.from(assuranceGrid.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement)) return;
        child.classList.add("domicile-assurance-card");
        child.dataset.assuranceNumber = String(index + 1).padStart(2, "0");
      });
    }

    const careModes = Array.from(document.querySelectorAll<HTMLElement>("main > section")).find(
      (section) => section.textContent?.includes("Ways to work with DŌMICILE"),
    );
    if (careModes) {
      careModes.classList.add("domicile-care-modes");
      const cards = Array.from(careModes.querySelectorAll<HTMLElement>("article"));
      cards.forEach((card, index) => {
        card.classList.add("domicile-care-card");
        card.style.setProperty("--care-index", String(index));
      });
    }

    const revealElements = revealIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).classList.add("domicile-reveal-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
      );
      revealElements.forEach((element) => {
        element.classList.add("domicile-section-reveal");
        observer.observe(element);
      });
      cleanups.push(() => observer.disconnect());
    } else {
      revealElements.forEach((element) => element.classList.add("domicile-reveal-visible"));
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <style jsx global>{`
      .domicile-motion-hero .domicile-hero-reveal {
        opacity: 0;
        transform: translateY(20px);
        filter: blur(4px);
        animation: domicileFadeUp 720ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        animation-delay: var(--domicile-delay, 0ms);
      }

      .domicile-text-roll {
        position: relative !important;
        display: inline-block !important;
        overflow: hidden !important;
        color: transparent !important;
        text-shadow: none !important;
        line-height: 1.05 !important;
      }

      .domicile-text-roll::before,
      .domicile-text-roll::after {
        content: attr(data-roll);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        color: currentColor;
        color: #fff;
        transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1), opacity 260ms ease;
        will-change: transform;
      }

      .domicile-text-roll::before { transform: translateY(0); }
      .domicile-text-roll::after { transform: translateY(112%); }
      .domicile-text-roll:hover::before { transform: translateY(-112%); }
      .domicile-text-roll:hover::after { transform: translateY(0); }

      .domicile-service-roll {
        min-height: 1.12em;
        color: transparent !important;
      }

      .domicile-service-roll::before,
      .domicile-service-roll::after {
        color: #111;
      }

      .domicile-bento-grid {
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        grid-template-rows: minmax(210px, auto) minmax(210px, auto) minmax(200px, auto) !important;
        gap: 12px !important;
        border: 0 !important;
        background: transparent !important;
        overflow: visible !important;
      }

      .domicile-bento-card {
        position: relative !important;
        overflow: hidden !important;
        min-height: 100% !important;
        border: 1px solid #ddd8cf !important;
        border-radius: 4px !important;
        background: #fff !important;
        transition: transform 360ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 360ms ease, background 360ms ease !important;
      }

      .domicile-bento-card::after {
        content: attr(data-bento-number);
        position: absolute;
        right: -10px;
        bottom: -30px;
        font-size: clamp(82px, 9vw, 150px);
        line-height: 1;
        font-weight: 900;
        letter-spacing: -0.08em;
        color: rgba(17, 17, 17, 0.035);
        pointer-events: none;
        transition: transform 520ms cubic-bezier(0.16, 1, 0.3, 1);
      }

      .domicile-bento-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 24px 52px rgba(18, 15, 10, 0.08);
      }

      .domicile-bento-card:hover::after { transform: translate(-8px, -8px) scale(1.04); }
      .domicile-bento-card:nth-child(1) { grid-column: 1 / 3; grid-row: 1; }
      .domicile-bento-card:nth-child(2) { grid-column: 3; grid-row: 1 / 3; background: #0c0c0c !important; color: #fff !important; }
      .domicile-bento-card:nth-child(3) { grid-column: 1; grid-row: 2; }
      .domicile-bento-card:nth-child(4) { grid-column: 2; grid-row: 2; }
      .domicile-bento-card:nth-child(5) { grid-column: 1 / 3; grid-row: 3; background: #f0ede7 !important; }
      .domicile-bento-card:nth-child(6) { grid-column: 3; grid-row: 3; }
      .domicile-bento-card:nth-child(2) p { color: rgba(255,255,255,.62) !important; }
      .domicile-bento-card:nth-child(2) > span { color: #c9a96e !important; }
      .domicile-bento-card:nth-child(2)::after { color: rgba(255,255,255,.06); }
      .domicile-bento-card:nth-child(2) .domicile-service-roll::before,
      .domicile-bento-card:nth-child(2) .domicile-service-roll::after { color: #fff; }

      .domicile-process-flow {
        position: relative !important;
        gap: 14px !important;
      }

      .domicile-process-flow::before {
        content: "";
        position: absolute;
        left: 7%;
        right: 7%;
        top: 39px;
        height: 1px;
        background: linear-gradient(90deg, transparent, #b9b1a5 10%, #b9b1a5 90%, transparent);
        z-index: 0;
      }

      .domicile-process-step {
        z-index: 1;
        transition: transform 320ms cubic-bezier(0.16,1,0.3,1), box-shadow 320ms ease !important;
      }

      .domicile-process-step:hover {
        transform: translateY(-7px);
        box-shadow: 0 22px 46px rgba(18,15,10,.07);
      }

      .domicile-assurance-card {
        position: relative;
        overflow: hidden;
        transition: transform 380ms cubic-bezier(.16,1,.3,1), background 380ms ease;
      }

      .domicile-assurance-card::after {
        content: attr(data-assurance-number);
        position: absolute;
        right: -12px;
        bottom: -34px;
        font-size: 118px;
        line-height: 1;
        font-weight: 900;
        color: rgba(255,255,255,.035);
        pointer-events: none;
      }

      .domicile-assurance-card:hover {
        transform: translateY(-7px);
        background: #111 !important;
      }

      .domicile-care-modes {
        display: block !important;
        width: min(1440px, calc(100% - 72px));
        margin: 0 auto;
        padding: 20px 0 110px;
      }

      .domicile-care-modes > div:first-child {
        display: grid !important;
        grid-template-columns: 1fr .75fr;
        gap: 40px;
        align-items: end;
        margin-bottom: 42px;
      }

      .domicile-care-modes > div:first-child h2 {
        margin: 0;
        max-width: 820px;
        font-size: clamp(40px, 5vw, 72px);
        line-height: .96;
        letter-spacing: -.05em;
        font-weight: 800;
      }

      .domicile-care-modes > div:nth-child(2) {
        display: block !important;
        position: relative;
      }

      .domicile-care-card {
        position: sticky !important;
        top: calc(94px + (var(--care-index) * 24px));
        min-height: 300px;
        margin-bottom: 20vh;
        padding: 38px !important;
        display: grid !important;
        grid-template-columns: 90px 1fr !important;
        align-content: end;
        gap: 18px 28px;
        border: 1px solid #d8d2c8 !important;
        border-radius: 6px !important;
        background: #f6f4ef !important;
        box-shadow: 0 28px 70px rgba(18,15,10,.08);
        overflow: hidden;
      }

      .domicile-care-card:nth-child(2) {
        background: #0c0c0c !important;
        color: #fff !important;
        border-color: #24211d !important;
      }

      .domicile-care-card:last-child { margin-bottom: 0; }
      .domicile-care-card > span {
        grid-row: 1 / 3;
        align-self: start;
        font-size: 12px !important;
        font-weight: 900;
        letter-spacing: .12em;
        color: #9a8f7e !important;
      }
      .domicile-care-card h3 {
        margin: 0 !important;
        max-width: 780px;
        font-size: clamp(30px, 3.6vw, 54px) !important;
        line-height: .98 !important;
        letter-spacing: -.045em !important;
      }
      .domicile-care-card p {
        margin: 0 !important;
        max-width: 760px;
        font-size: 13px !important;
        line-height: 1.7 !important;
        color: #6f685e !important;
      }
      .domicile-care-card:nth-child(2) p { color: rgba(255,255,255,.62) !important; }

      .domicile-care-modes > p:last-child {
        display: block !important;
        max-width: 760px;
        margin: 28px 0 0;
        color: #746d63;
        font-size: 11px;
        line-height: 1.7;
      }

      .domicile-section-reveal {
        opacity: 0;
        transform: translateY(28px);
        filter: blur(4px);
        transition: opacity 720ms ease, transform 720ms cubic-bezier(.16,1,.3,1), filter 720ms ease;
      }
      .domicile-section-reveal.domicile-reveal-visible {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
      }

      @keyframes domicileFadeUp {
        from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
        to { opacity: 1; transform: translateY(0); filter: blur(0); }
      }

      @media (max-width: 980px) {
        .domicile-bento-grid {
          grid-template-columns: 1fr 1fr !important;
          grid-template-rows: none !important;
        }
        .domicile-bento-card:nth-child(n) {
          grid-column: auto !important;
          grid-row: auto !important;
        }
        .domicile-bento-card:nth-child(1),
        .domicile-bento-card:nth-child(5) { grid-column: 1 / -1 !important; }
        .domicile-process-flow::before { display: none; }
        .domicile-care-modes > div:first-child { grid-template-columns: 1fr; }
      }

      @media (max-width: 640px) {
        .domicile-bento-grid { grid-template-columns: 1fr !important; }
        .domicile-bento-card:nth-child(n) { grid-column: auto !important; }
        .domicile-care-modes {
          width: min(100% - 24px, 1440px);
          padding-bottom: 72px;
        }
        .domicile-care-card {
          position: relative !important;
          top: auto !important;
          margin-bottom: 14px;
          min-height: 230px;
          padding: 28px !important;
          grid-template-columns: 1fr !important;
        }
        .domicile-care-card > span { grid-row: auto; }
      }

      @media (prefers-reduced-motion: reduce) {
        .domicile-motion-hero .domicile-hero-reveal,
        .domicile-bento-card,
        .domicile-process-step,
        .domicile-assurance-card,
        .domicile-section-reveal,
        .domicile-text-roll::before,
        .domicile-text-roll::after {
          animation: none !important;
          transition: none !important;
          transform: none !important;
          filter: none !important;
          opacity: 1 !important;
        }
      }
    `}</style>
  );
}
