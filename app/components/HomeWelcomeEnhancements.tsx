"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "../projects/projectsData";
import type { HomePageContent } from "@/sanity/types/siteContent";

type PortalMounts = {
  status: HTMLElement | null;
  rail: HTMLElement | null;
};

const emptyMounts: PortalMounts = { status: null, rail: null };

function getKigaliParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Kigali",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value || "";
  const hour = Number(read("hour")) || 0;
  const minute = Number(read("minute")) || 0;

  return {
    weekday: read("weekday"),
    hour,
    minute,
    time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
  };
}

function CompactStudioStatus() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const local = getKigaliParts(now);
  const weekday = !["Saturday", "Sunday"].includes(local.weekday);
  const minuteOfDay = local.hour * 60 + local.minute;
  const isOpen = weekday && minuteOfDay >= 8 * 60 && minuteOfDay < 18 * 60;

  return (
    <aside className="welcomeStatus" aria-live="polite">
      <div className="welcomeStatusTopline">
        <div className="welcomeStatusSignal">
          <span className={`welcomeStatusDot ${isOpen ? "isOpen" : ""}`} aria-hidden="true" />
          <span>Studio status</span>
        </div>
        <strong>{local.time} CAT</strong>
      </div>

      <div className="welcomeStatusMain">
        <span className="welcomeStatusState">{isOpen ? "OPEN NOW" : "AFTER HOURS"}</span>
        <h3>{isOpen ? "Studio open." : "Studio closed."}</h3>
        <p>
          {isOpen
            ? "The Kigali studio is active and project conversations are welcome."
            : "New project inquiries remain open online and are reviewed on the next working day."}
        </p>
      </div>

      <div className="welcomeStatusMeta">
        <span>Kigali, Rwanda</span>
        <span>{isOpen ? "08:00 — 18:00" : "Next working day · 08:00"}</span>
      </div>
    </aside>
  );
}

function ProjectRail({ projects }: { projects: Project[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const items = projects.filter((project) => Boolean(project.cover)).slice(0, 10);

  const move = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const distance = Math.min(window.innerWidth * 0.72, 520);
    rail.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  if (!items.length) return null;

  return (
    <section className="welcomeProjectRail" aria-labelledby="welcome-projects-title">
      <div className="containerWide welcomeProjectRailHead">
        <div>
          <span>Selected Work</span>
          <h2 id="welcome-projects-title">A quick look through the studio.</h2>
        </div>
        <div className="welcomeRailControls" aria-label="Move through projects">
          <button type="button" onClick={() => move(-1)} aria-label="Previous projects">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Next projects">→</button>
        </div>
      </div>

      <div className="welcomeRailViewport" ref={railRef}>
        <div className="welcomeRailSpacer" aria-hidden="true" />
        {items.map((project, index) => (
          <Link
            className="welcomeProjectCard"
            key={project.slug}
            href={`/projects/${project.slug}`}
            aria-label={`View ${project.title}`}
          >
            <div className="welcomeProjectImage">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="(max-width: 700px) 82vw, 420px"
                draggable={false}
                style={{ objectFit: "cover" }}
              />
              <div className="welcomeProjectShade" />
              <span className="welcomeProjectNumber">{String(index + 1).padStart(2, "0")}</span>
              <div className="welcomeProjectCaption">
                <span>{project.category} · {project.location}</span>
                <h3>{project.title}</h3>
              </div>
            </div>
          </Link>
        ))}
        <div className="welcomeRailEndSpacer" aria-hidden="true" />
      </div>
      <div className="containerWide welcomeRailHint">Drag, swipe, or use the arrows · Click a project to open it</div>
    </section>
  );
}

export default function HomeWelcomeEnhancements({
  content: _content,
  projects,
}: {
  content?: HomePageContent | null;
  projects: Project[];
}) {
  const [mounts, setMounts] = useState<PortalMounts>(emptyMounts);

  useEffect(() => {
    let statusMount: HTMLDivElement | null = null;
    let railMount: HTMLDivElement | null = null;
    let legacyRegional: HTMLElement | null = null;

    const install = () => {
      if (statusMount?.isConnected && railMount?.isConnected) return true;

      const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"));
      const hero = sections.find((section) => Boolean(section.querySelector("video")));
      const regional = sections.find((section) => {
        const text = section.textContent || "";
        return /regional reach/i.test(text) && /kigali/i.test(text) && /east/i.test(text);
      });
      const marquee = sections.find((section) => {
        const text = section.textContent || "";
        return /spatial clarity/i.test(text) && /purposeful development/i.test(text);
      });

      if (!hero || !marquee) return false;

      if (regional) {
        legacyRegional = regional;
        regional.dataset.homeRegionalLegacy = "true";
      }

      if (!statusMount?.isConnected) {
        statusMount = document.createElement("div");
        statusMount.dataset.homeStatusRefresh = "true";
        hero.appendChild(statusMount);
      }

      if (!railMount?.isConnected) {
        railMount = document.createElement("div");
        railMount.dataset.homeProjectRail = "true";
        marquee.after(railMount);
      }

      setMounts({ status: statusMount, rail: railMount });
      return true;
    };

    install();
    const observer = new MutationObserver(() => install());
    observer.observe(document.body, { childList: true, subtree: true });
    const interval = window.setInterval(() => install(), 350);
    const timeout = window.setTimeout(() => {
      observer.disconnect();
      window.clearInterval(interval);
    }, 6000);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      statusMount?.remove();
      railMount?.remove();
      if (legacyRegional) delete legacyRegional.dataset.homeRegionalLegacy;
      setMounts(emptyMounts);
    };
  }, []);

  return (
    <>
      {mounts.status ? createPortal(<CompactStudioStatus />, mounts.status) : null}
      {mounts.rail ? createPortal(<ProjectRail projects={projects} />, mounts.rail) : null}
      <style>{`
        [data-home-regional-legacy="true"] { display: none !important; }

        [data-home-status-refresh] {
          position: absolute;
          z-index: 18;
          right: clamp(26px, 4vw, 72px);
          top: 54%;
          width: min(360px, 29vw);
          transform: translateY(-24%);
        }

        .welcomeStatus {
          width: 100%;
          color: #fff;
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 2px;
          background: rgba(7,7,7,.91);
          backdrop-filter: blur(22px) saturate(115%);
          -webkit-backdrop-filter: blur(22px) saturate(115%);
          box-shadow: 0 24px 70px rgba(0,0,0,.38);
          overflow: hidden;
        }

        .welcomeStatusTopline {
          min-height: 42px;
          padding: 0 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          border-bottom: 1px solid rgba(255,255,255,.11);
          color: rgba(255,255,255,.58);
          font-size: 9px;
          font-weight: 850;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .welcomeStatusSignal { display: inline-flex; align-items: center; gap: 8px; }
        .welcomeStatusTopline strong { color: rgba(255,255,255,.82); font-size: 9px; white-space: nowrap; }
        .welcomeStatusDot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,.34); box-shadow: 0 0 0 4px rgba(255,255,255,.035); }
        .welcomeStatusDot.isOpen { background: #fff; box-shadow: 0 0 14px rgba(255,255,255,.64); }

        .welcomeStatusMain { padding: 22px 20px 20px; }
        .welcomeStatusState { display: inline-block; color: rgba(255,255,255,.48); font-size: 9px; font-weight: 850; letter-spacing: .14em; text-transform: uppercase; }
        .welcomeStatus h3 { margin: 9px 0 0; font-size: clamp(27px, 2.15vw, 36px); line-height: .98; letter-spacing: -.045em; font-weight: 800; }
        .welcomeStatus p { margin: 12px 0 0; max-width: 310px; color: rgba(255,255,255,.63); font-size: 12px; line-height: 1.55; }

        .welcomeStatusMeta {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          padding: 13px 18px;
          border-top: 1px solid rgba(255,255,255,.1);
          color: rgba(255,255,255,.42);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .welcomeProjectRail { padding: 34px 0 48px; background: #050505; border-bottom: 1px solid rgba(255,255,255,.07); overflow: hidden; }
        .welcomeProjectRailHead { display: flex; justify-content: space-between; align-items: end; gap: 30px; margin-bottom: 22px; }
        .welcomeProjectRailHead span { color: rgba(255,255,255,.45); font-size: 10px; font-weight: 850; letter-spacing: .16em; text-transform: uppercase; }
        .welcomeProjectRailHead h2 { margin: 7px 0 0; color: #fff; font-size: clamp(20px, 2.3vw, 34px); line-height: 1.06; letter-spacing: -.035em; }
        .welcomeRailControls { display: flex; gap: 8px; }
        .welcomeRailControls button { width: 42px; height: 42px; border: 1px solid rgba(255,255,255,.22); background: transparent; color: #fff; cursor: pointer; font-size: 18px; transition: background .2s ease, color .2s ease; }
        .welcomeRailControls button:hover { background: #fff; color: #050505; }
        .welcomeRailViewport { display: flex; gap: 14px; overflow-x: auto; overscroll-behavior-inline: contain; scroll-snap-type: x mandatory; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
        .welcomeRailViewport::-webkit-scrollbar { display: none; }
        .welcomeRailSpacer { flex: 0 0 max(32px, calc((100vw - 1440px) / 2 + 32px)); }
        .welcomeRailEndSpacer { flex: 0 0 32px; }
        .welcomeProjectCard { flex: 0 0 clamp(270px, 30vw, 420px); scroll-snap-align: start; color: #fff; text-decoration: none; }
        .welcomeProjectImage { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: #111; }
        .welcomeProjectImage img { transition: transform .7s cubic-bezier(.16,1,.3,1), filter .45s ease; filter: saturate(.78) brightness(.84); }
        .welcomeProjectCard:hover .welcomeProjectImage img { transform: scale(1.035); filter: saturate(1) brightness(.96); }
        .welcomeProjectShade { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.74), rgba(0,0,0,.03) 62%); }
        .welcomeProjectNumber { position: absolute; top: 15px; right: 16px; color: rgba(255,255,255,.76); font-size: 9px; font-weight: 850; letter-spacing: .15em; }
        .welcomeProjectCaption { position: absolute; left: 18px; right: 18px; bottom: 17px; }
        .welcomeProjectCaption > span { color: rgba(255,255,255,.65); font-size: 9px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
        .welcomeProjectCaption h3 { margin: 6px 0 0; font-size: clamp(18px, 1.7vw, 25px); line-height: 1.05; letter-spacing: -.035em; }
        .welcomeRailHint { margin-top: 12px; color: rgba(255,255,255,.35); font-size: 9px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }

        @media (max-width: 1120px) {
          [data-home-status-refresh] { right: 28px; top: 36%; width: min(340px, 34vw); transform: none; }
        }

        @media (max-width: 820px) {
          [data-home-status-refresh] {
            left: 18px;
            right: 18px;
            top: auto;
            bottom: 22px;
            width: auto;
            transform: none;
          }
          .welcomeStatusMain { padding: 15px 16px 14px; }
          .welcomeStatus h3 { font-size: 23px; }
          .welcomeStatus p { display: none; }
          .welcomeStatusTopline { padding-inline: 15px; }
          .welcomeStatusMeta { padding: 10px 15px; }
          .welcomeProjectRail { padding-top: 28px; }
          .welcomeProjectRailHead { align-items: center; }
          .welcomeProjectRailHead h2 { max-width: 260px; }
          .welcomeProjectCard { flex-basis: 82vw; }
          .welcomeRailSpacer { flex-basis: 18px; }
        }
      `}</style>
    </>
  );
}
