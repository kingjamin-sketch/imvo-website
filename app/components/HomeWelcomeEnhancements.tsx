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

const liveItems = [
  {
    label: "PROJECT INQUIRIES",
    text: "New project briefs remain routed to the studio.",
  },
  {
    label: "STUDIO DESK",
    text: "Kigali · CAT operating signal synced.",
  },
  {
    label: "SITE COORDINATION",
    text: "Visit and coordination requests remain available by appointment.",
  },
  {
    label: "PROJECT PIPELINE",
    text: "New requests move into the next studio review.",
  },
  {
    label: "BUILT ENVIRONMENT",
    text: "Design · planning · development · site coordination.",
  },
] as const;

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

function StudioSignal() {
  const [now, setNow] = useState(() => new Date());
  const [activeLive, setActiveLive] = useState(0);

  useEffect(() => {
    const clock = window.setInterval(() => setNow(new Date()), 30_000);
    const feed = window.setInterval(
      () => setActiveLive((value) => (value + 1) % liveItems.length),
      2600,
    );

    return () => {
      window.clearInterval(clock);
      window.clearInterval(feed);
    };
  }, []);

  const local = getKigaliParts(now);
  const workingDay = !["Saturday", "Sunday"].includes(local.weekday);
  const minuteOfDay = local.hour * 60 + local.minute;
  const isOpen = workingDay && minuteOfDay >= 8 * 60 && minuteOfDay < 18 * 60;
  const openingSoon = workingDay && minuteOfDay >= 7 * 60 && minuteOfDay < 8 * 60;
  const closingSoon = workingDay && minuteOfDay >= 17 * 60 && minuteOfDay < 18 * 60;
  const currentLive = liveItems[activeLive];

  const stateLabel = openingSoon
    ? "OPENING SOON"
    : closingSoon
      ? "CLOSING SOON"
      : isOpen
        ? "STUDIO ACTIVE"
        : "AFTER HOURS";

  const title = openingSoon
    ? "OPENING SOON"
    : closingSoon
      ? "STUDIO CLOSING"
      : isOpen
        ? "STUDIO OPEN"
        : "STUDIO CLOSED";

  const message = openingSoon
    ? "The Kigali studio opens at 08:00 CAT. Project inquiries are already being received."
    : closingSoon
      ? "Final reviews are underway. New project inquiries remain open online."
      : isOpen
        ? "The studio is active. Project conversations, reviews, and coordination are in motion."
        : "The studio is closed for the day. New project inquiries remain open online.";

  return (
    <aside className="welcomeSignal" aria-live="polite" aria-label="IMVO studio signal">
      <div className="welcomeSignalScan" aria-hidden="true" />

      <div className="welcomeSignalTopline">
        <div className="welcomeSignalIdentity">
          <span className={`welcomeSignalDot ${isOpen ? "isOpen" : ""}`} aria-hidden="true">
            <i />
          </span>
          <span>STUDIO SIGNAL</span>
        </div>

        <div className="welcomeSignalClock">
          <strong>{local.time} CAT</strong>
          <div className="welcomeSignalLevels" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((bar) => <i key={bar} />)}
          </div>
        </div>
      </div>

      <div className="welcomeSignalMain">
        <span className="welcomeSignalState">{stateLabel}</span>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>

      <div className="welcomeSignalLive" key={currentLive.label}>
        <strong>{currentLive.label}</strong>
        <span>{currentLive.text}</span>
      </div>

      <div className="welcomeSignalGrid" aria-label="Studio operating indicators">
        <div>
          <span className={`welcomeMiniDot ${isOpen ? "isOpen" : ""}`} aria-hidden="true" />
          <small>STUDIO</small>
          <b>{isOpen ? "ACTIVE" : "CLOSED"}</b>
        </div>
        <div>
          <span className="welcomeMiniDot isOpen" aria-hidden="true" />
          <small>PIPELINE</small>
          <b>OPEN</b>
        </div>
        <div>
          <span className="welcomeMiniDot isOpen" aria-hidden="true" />
          <small>INQUIRIES</small>
          <b>ROUTING</b>
        </div>
      </div>

      <div className="welcomeSignalProgress" aria-hidden="true"><span /></div>

      <div className="welcomeSignalMeta">
        <span>KIGALI, RWANDA</span>
        <span>{isOpen ? "08:00 — 18:00" : "NEXT WORKING DAY · 08:00"}</span>
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
      {mounts.status ? createPortal(<StudioSignal />, mounts.status) : null}
      {mounts.rail ? createPortal(<ProjectRail projects={projects} />, mounts.rail) : null}
      <style>{`
        [data-home-regional-legacy="true"] { display: none !important; }

        [data-home-status-refresh] {
          position: absolute;
          z-index: 18;
          right: clamp(26px, 4vw, 72px);
          top: 52%;
          width: min(390px, 31vw);
          transform: translateY(-22%);
        }

        .welcomeSignal {
          position: relative;
          width: 100%;
          color: #fff;
          border: 1px solid rgba(255,255,255,.16);
          border-radius: 2px;
          background: linear-gradient(145deg, rgba(9,9,9,.94), rgba(18,18,18,.9));
          backdrop-filter: blur(24px) saturate(112%);
          -webkit-backdrop-filter: blur(24px) saturate(112%);
          box-shadow: 0 26px 76px rgba(0,0,0,.42);
          overflow: hidden;
          isolation: isolate;
        }

        .welcomeSignalScan {
          position: absolute;
          z-index: 0;
          top: -18%;
          bottom: -18%;
          left: -45%;
          width: 34%;
          transform: skewX(-12deg);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent);
          animation: welcome-signal-scan 7.2s linear infinite;
          pointer-events: none;
        }

        .welcomeSignalTopline,
        .welcomeSignalMain,
        .welcomeSignalLive,
        .welcomeSignalGrid,
        .welcomeSignalProgress,
        .welcomeSignalMeta { position: relative; z-index: 1; }

        .welcomeSignalTopline {
          min-height: 43px;
          padding: 0 17px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          border-bottom: 1px solid rgba(255,255,255,.095);
        }

        .welcomeSignalIdentity,
        .welcomeSignalClock {
          display: flex;
          align-items: center;
        }

        .welcomeSignalIdentity { gap: 8px; color: rgba(255,255,255,.56); font-size: 8px; font-weight: 900; letter-spacing: .16em; }
        .welcomeSignalClock { gap: 12px; }
        .welcomeSignalClock strong { color: rgba(255,255,255,.86); font-size: 9px; letter-spacing: .08em; white-space: nowrap; }

        .welcomeSignalDot {
          position: relative;
          width: 6px;
          height: 6px;
          flex: 0 0 6px;
          border-radius: 50%;
          background: rgba(255,255,255,.34);
          box-shadow: 0 0 0 4px rgba(255,255,255,.03);
        }

        .welcomeSignalDot.isOpen { background: #fff; box-shadow: 0 0 14px rgba(255,255,255,.64); }
        .welcomeSignalDot i { position: absolute; inset: 0; border-radius: inherit; background: rgba(255,255,255,.45); animation: welcome-pulse 2.1s ease-in-out infinite; }

        .welcomeSignalLevels { height: 14px; display: flex; align-items: end; gap: 2px; }
        .welcomeSignalLevels i { width: 2px; height: 12px; display: block; background: rgba(255,255,255,.55); transform-origin: bottom; animation: welcome-bars 1.8s ease-in-out infinite; }
        .welcomeSignalLevels i:nth-child(2) { animation-delay: .14s; }
        .welcomeSignalLevels i:nth-child(3) { animation-delay: .28s; }
        .welcomeSignalLevels i:nth-child(4) { animation-delay: .42s; }
        .welcomeSignalLevels i:nth-child(5) { animation-delay: .56s; }

        .welcomeSignalMain { padding: 20px 18px 17px; }
        .welcomeSignalState { display: inline-block; color: rgba(255,255,255,.42); font-size: 8px; font-weight: 900; letter-spacing: .16em; }
        .welcomeSignal h3 { margin: 7px 0 0; font-size: clamp(28px, 2.25vw, 38px); line-height: .94; letter-spacing: -.048em; font-weight: 820; }
        .welcomeSignalMain p { margin: 10px 0 0; max-width: 340px; color: rgba(255,255,255,.58); font-size: 11px; line-height: 1.52; }

        .welcomeSignalLive {
          min-height: 50px;
          margin: 0 18px;
          padding: 12px 0 10px;
          border-top: 1px solid rgba(255,255,255,.075);
          animation: welcome-live-enter .38s cubic-bezier(.16,1,.3,1);
        }

        .welcomeSignalLive strong,
        .welcomeSignalLive span { display: block; }
        .welcomeSignalLive strong { color: rgba(255,255,255,.86); font-size: 8px; font-weight: 900; letter-spacing: .11em; }
        .welcomeSignalLive span { margin-top: 4px; color: rgba(255,255,255,.45); font-size: 10px; line-height: 1.4; }

        .welcomeSignalGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          border-top: 1px solid rgba(255,255,255,.075);
          border-bottom: 1px solid rgba(255,255,255,.075);
        }

        .welcomeSignalGrid > div {
          min-width: 0;
          padding: 9px 9px 9px 15px;
          display: grid;
          grid-template-columns: 6px 1fr;
          column-gap: 6px;
          row-gap: 2px;
          border-right: 1px solid rgba(255,255,255,.06);
        }

        .welcomeSignalGrid > div:last-child { border-right: 0; }
        .welcomeMiniDot { grid-row: 1 / span 2; align-self: start; width: 4px; height: 4px; margin-top: 3px; border-radius: 50%; background: rgba(255,255,255,.25); }
        .welcomeMiniDot.isOpen { background: rgba(255,255,255,.9); box-shadow: 0 0 8px rgba(255,255,255,.35); }
        .welcomeSignalGrid small { color: rgba(255,255,255,.31); font-size: 6px; font-weight: 850; letter-spacing: .1em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .welcomeSignalGrid b { color: rgba(255,255,255,.73); font-size: 8px; font-weight: 900; letter-spacing: .06em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .welcomeSignalProgress { height: 1px; overflow: hidden; background: rgba(255,255,255,.05); }
        .welcomeSignalProgress span { position: absolute; top: 0; left: -28%; width: 28%; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,.95), transparent); animation: welcome-progress 4.8s linear infinite; }

        .welcomeSignalMeta {
          min-height: 38px;
          padding: 0 17px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: rgba(255,255,255,.38);
          font-size: 7px;
          font-weight: 850;
          letter-spacing: .1em;
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

        @keyframes welcome-signal-scan { 0% { transform: translateX(-20%) skewX(-12deg); } 100% { transform: translateX(500%) skewX(-12deg); } }
        @keyframes welcome-pulse { 0%,100% { transform: scale(1); opacity: .45; } 50% { transform: scale(2.5); opacity: 0; } }
        @keyframes welcome-bars { 0%,100% { transform: scaleY(.32); opacity: .4; } 50% { transform: scaleY(1); opacity: .9; } }
        @keyframes welcome-progress { 0% { transform: translateX(0); } 100% { transform: translateX(470%); } }
        @keyframes welcome-live-enter { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 1120px) {
          [data-home-status-refresh] { right: 28px; top: 34%; width: min(365px, 36vw); transform: none; }
        }

        @media (max-width: 820px) {
          [data-home-status-refresh] {
            left: 18px;
            right: 18px;
            top: auto;
            bottom: 18px;
            width: auto;
            transform: none;
          }
          .welcomeSignalMain { padding: 15px 15px 12px; }
          .welcomeSignal h3 { font-size: 24px; }
          .welcomeSignalMain p { display: none; }
          .welcomeSignalLive { min-height: 42px; margin-inline: 15px; padding-block: 9px; }
          .welcomeSignalTopline, .welcomeSignalMeta { padding-inline: 14px; }
          .welcomeSignalMeta { min-height: 34px; }
          .welcomeProjectRail { padding-top: 28px; }
          .welcomeProjectRailHead { align-items: center; }
          .welcomeProjectRailHead h2 { max-width: 260px; }
          .welcomeProjectCard { flex-basis: 82vw; }
          .welcomeRailSpacer { flex-basis: 18px; }
        }

        @media (max-width: 540px) {
          .welcomeSignalGrid > div { padding-left: 10px; }
          .welcomeSignalMeta { font-size: 6px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .welcomeSignalScan,
          .welcomeSignalDot i,
          .welcomeSignalLevels i,
          .welcomeSignalProgress span,
          .welcomeSignalLive { animation: none !important; }
        }
      `}</style>
    </>
  );
}
