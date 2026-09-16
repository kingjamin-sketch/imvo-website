"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "../projects/projectsData";
import type { HomePageContent } from "@/sanity/types/siteContent";

type PortalMounts = {
  status: HTMLElement | null;
  regional: HTMLElement | null;
  rail: HTMLElement | null;
};

const emptyMounts: PortalMounts = { status: null, regional: null, rail: null };

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
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const local = getKigaliParts(now);
  const weekday = !["Saturday", "Sunday"].includes(local.weekday);
  const minuteOfDay = local.hour * 60 + local.minute;
  const isOpen = weekday && minuteOfDay >= 8 * 60 && minuteOfDay < 18 * 60;

  return (
    <aside className="welcomeStatus" aria-live="polite">
      <div className="welcomeStatusTopline">
        <span className={`welcomeStatusDot ${isOpen ? "isOpen" : ""}`} aria-hidden="true" />
        <span>Studio Status</span>
        <strong>{local.time} CAT</strong>
      </div>
      <h3>{isOpen ? "STUDIO OPEN" : "STUDIO CLOSED"}</h3>
      <p>
        {isOpen
          ? "The Kigali studio is active. Project conversations and new briefs are welcome."
          : "The studio is currently closed. New project inquiries remain open online."}
      </p>
      <div className="welcomeStatusMeta">
        <span>Kigali, Rwanda</span>
        <span>{isOpen ? "08:00–18:00" : "Next working day · 08:00"}</span>
      </div>
    </aside>
  );
}

function RegionalStrip({ content }: { content?: HomePageContent | null }) {
  const text =
    content?.regionalText ||
    "IMVO supports projects across Rwanda, Uganda, Kenya, Tanzania, Burundi, DRC, Zambia, Angola, and selected parts of Mozambique.";

  return (
    <section className="welcomeRegionalStrip" aria-label="Regional reach">
      <div className="containerWide welcomeRegionalInner">
        <div className="welcomeRegionalLabel">Regional Reach</div>
        <div className="welcomeRegionalCopy">
          <strong>Kigali based. East &amp; Central Africa focused.</strong>
          <p>{text}</p>
        </div>
        <Link href="/about">Explore the studio <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
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
  content,
  projects,
}: {
  content?: HomePageContent | null;
  projects: Project[];
}) {
  const [mounts, setMounts] = useState<PortalMounts>(emptyMounts);

  useEffect(() => {
    let statusMount: HTMLDivElement | null = null;
    let regionalMount: HTMLDivElement | null = null;
    let railMount: HTMLDivElement | null = null;
    let legacyRegional: HTMLElement | null = null;

    const install = () => {
      if (statusMount?.isConnected && regionalMount?.isConnected && railMount?.isConnected) {
        return true;
      }

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

      statusMount = document.createElement("div");
      statusMount.dataset.homeStatusRefresh = "true";
      hero.appendChild(statusMount);

      regionalMount = document.createElement("div");
      regionalMount.dataset.homeRegionalRefresh = "true";
      if (regional) regional.before(regionalMount);
      else hero.after(regionalMount);

      railMount = document.createElement("div");
      railMount.dataset.homeProjectRail = "true";
      marquee.after(railMount);

      setMounts({ status: statusMount, regional: regionalMount, rail: railMount });
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
      regionalMount?.remove();
      railMount?.remove();
      if (legacyRegional) delete legacyRegional.dataset.homeRegionalLegacy;
      setMounts(emptyMounts);
    };
  }, []);

  return (
    <>
      {mounts.status ? createPortal(<CompactStudioStatus />, mounts.status) : null}
      {mounts.regional ? createPortal(<RegionalStrip content={content} />, mounts.regional) : null}
      {mounts.rail ? createPortal(<ProjectRail projects={projects} />, mounts.rail) : null}
      <style>{`
        [data-home-regional-legacy="true"] { display: none !important; }
        [data-home-status-refresh] {
          position: absolute;
          z-index: 18;
          right: clamp(24px, 4vw, 64px);
          bottom: 12vh;
          width: min(390px, 31vw);
        }
        .welcomeStatus {
          width: 100%;
          padding: 22px 24px;
          color: #fff;
          border: 1px solid rgba(255,255,255,.2);
          background: linear-gradient(135deg, rgba(8,8,8,.76), rgba(8,8,8,.48));
          backdrop-filter: blur(18px) saturate(115%);
          -webkit-backdrop-filter: blur(18px) saturate(115%);
          box-shadow: 0 18px 60px rgba(0,0,0,.24);
        }
        .welcomeStatusTopline {
          display: flex;
          align-items: center;
          gap: 9px;
          color: rgba(255,255,255,.62);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .13em;
          text-transform: uppercase;
        }
        .welcomeStatusTopline strong { margin-left: auto; color: rgba(255,255,255,.86); font-size: 10px; }
        .welcomeStatusDot { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,.38); }
        .welcomeStatusDot.isOpen { background: #fff; box-shadow: 0 0 14px rgba(255,255,255,.72); }
        .welcomeStatus h3 { margin: 15px 0 0; font-size: clamp(21px, 2vw, 31px); line-height: 1; letter-spacing: -.045em; }
        .welcomeStatus p { margin: 11px 0 0; color: rgba(255,255,255,.66); font-size: 12px; line-height: 1.55; }
        .welcomeStatusMeta { display: flex; justify-content: space-between; gap: 16px; margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,.12); color: rgba(255,255,255,.5); font-size: 9px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }

        [data-home-regional-refresh] { background: #050505; }
        .welcomeRegionalStrip { border-top: 1px solid rgba(255,255,255,.07); border-bottom: 1px solid rgba(255,255,255,.07); background: #050505; }
        .welcomeRegionalInner { min-height: 126px; display: grid; grid-template-columns: .55fr 2.1fr auto; align-items: center; gap: clamp(24px, 5vw, 80px); padding-top: 24px; padding-bottom: 24px; }
        .welcomeRegionalLabel { color: rgba(255,255,255,.44); font-size: 10px; font-weight: 850; letter-spacing: .16em; text-transform: uppercase; }
        .welcomeRegionalCopy strong { display: block; font-size: clamp(18px, 2vw, 27px); line-height: 1.15; letter-spacing: -.025em; }
        .welcomeRegionalCopy p { max-width: 780px; margin: 8px 0 0; color: rgba(255,255,255,.5); font-size: 12px; line-height: 1.6; }
        .welcomeRegionalInner > a { color: #fff; font-size: 10px; font-weight: 850; letter-spacing: .1em; text-decoration: none; text-transform: uppercase; white-space: nowrap; border-bottom: 1px solid rgba(255,255,255,.48); padding-bottom: 4px; }

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
          [data-home-status-refresh] { top: 92px; bottom: auto; width: min(360px, 38vw); }
          .welcomeRegionalInner { grid-template-columns: .55fr 1.7fr; }
          .welcomeRegionalInner > a { grid-column: 2; justify-self: start; }
        }
        @media (max-width: 760px) {
          [data-home-status-refresh] { top: 78px; left: 18px; right: 18px; width: auto; }
          .welcomeStatus { padding: 14px 16px; }
          .welcomeStatus h3 { margin-top: 10px; font-size: 19px; }
          .welcomeStatus p { display: none; }
          .welcomeStatusMeta { margin-top: 9px; padding-top: 9px; }
          .welcomeRegionalInner { min-height: 0; grid-template-columns: 1fr; gap: 10px; padding-top: 22px; padding-bottom: 22px; }
          .welcomeRegionalInner > a { grid-column: auto; margin-top: 5px; justify-self: start; }
          .welcomeRegionalCopy p { font-size: 11px; }
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
