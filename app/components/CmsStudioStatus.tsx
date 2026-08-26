"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type {
  StudioDateOverride,
  StudioScheduleDay,
  StudioSpecialNotice,
  StudioStatusContent,
} from "@/sanity/types/cmsBackend";

const normalize = (value?: string | null) =>
  (value || "").replace(/\s+/g, " ").trim().toLowerCase();

const toMinutes = (value?: string) => {
  if (!value || !/^\d{2}:\d{2}$/.test(value)) return null;
  const [hour, minute] = value.split(":").map(Number);
  if (hour > 23 || minute > 59) return null;
  return hour * 60 + minute;
};

const pick = (items: string[] | undefined, minute: number, fallback: string) => {
  const usable = (items || []).filter(Boolean);
  if (!usable.length) return fallback;
  return usable[Math.floor(minute / 5) % usable.length];
};

type KigaliParts = {
  dateKey: string;
  weekday: string;
  hour: number;
  minute: number;
  timeLabel: string;
};

function getTimeParts(date: Date, timezone: string): KigaliParts {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value || "";

  const hour = Number(value("hour")) || 0;
  const minute = Number(value("minute")) || 0;

  return {
    dateKey: `${value("year")}-${value("month")}-${value("day")}`,
    weekday: value("weekday").toLowerCase(),
    hour,
    minute,
    timeLabel: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
  };
}

function activeNotice(notices: StudioSpecialNotice[] | undefined, now: Date) {
  return (notices || [])
    .filter((notice) => {
      if (notice.enabled === false) return false;
      const start = notice.startsAt ? new Date(notice.startsAt).getTime() : -Infinity;
      const end = notice.endsAt ? new Date(notice.endsAt).getTime() : Infinity;
      const current = now.getTime();
      return current >= start && current <= end;
    })
    .sort((a, b) => {
      const rank = { urgent: 3, important: 2, normal: 1 };
      return rank[b.priority || "normal"] - rank[a.priority || "normal"];
    })[0];
}

function resolveHours(
  schedule: StudioScheduleDay | undefined,
  override: StudioDateOverride | undefined,
) {
  if (override?.status === "closed") {
    return { enabled: false, openTime: undefined, closeTime: undefined };
  }

  if (override?.status === "custom") {
    return {
      enabled: true,
      openTime: override.openTime || schedule?.openTime,
      closeTime: override.closeTime || schedule?.closeTime,
    };
  }

  if (override?.status === "open") {
    return {
      enabled: true,
      openTime: override.openTime || schedule?.openTime || "08:00",
      closeTime: override.closeTime || schedule?.closeTime || "18:00",
    };
  }

  return {
    enabled: schedule?.enabled !== false,
    openTime: schedule?.openTime || "08:00",
    closeTime: schedule?.closeTime || "18:00",
  };
}

function StudioStatusPanel({ content }: { content: StudioStatusContent }) {
  const timezone = content.timezone || "Africa/Kigali";
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const state = useMemo(() => {
    const local = getTimeParts(now, timezone);
    const schedule = content.weeklySchedule?.find(
      (item) => normalize(item.day) === local.weekday,
    );
    const override = content.dateOverrides?.find((item) => item.date === local.dateKey);
    const hours = resolveHours(schedule, override);
    const openMinute = toMinutes(hours.openTime);
    const closeMinute = toMinutes(hours.closeTime);
    const currentMinute = local.hour * 60 + local.minute;
    const notice = activeNotice(content.specialNotices, now);

    const isOpen = Boolean(
      hours.enabled &&
        openMinute !== null &&
        closeMinute !== null &&
        currentMinute >= openMinute &&
        currentMinute < closeMinute,
    );
    const openingSoon = Boolean(
      hours.enabled &&
        openMinute !== null &&
        currentMinute < openMinute &&
        openMinute - currentMinute <= 60,
    );

    let status = "STUDIO CLOSED";
    let message = pick(
      content.closedMessages,
      local.minute,
      "Studio closed. New inquiries remain safely routed to IMVO.",
    );

    if (!hours.enabled && !override) {
      status = "WEEKEND SCHEDULE";
      message = pick(
        content.weekendMessages,
        local.minute,
        "Weekend schedule. New project inquiries are still received.",
      );
    }

    if (openingSoon) {
      status = "OPENING SOON";
      message = pick(
        content.openingSoonMessages,
        local.minute,
        `Opening soon. The Kigali studio starts at ${hours.openTime || "08:00"} CAT.`,
      );
    }

    if (isOpen) {
      status = "STUDIO OPEN";
      message = pick(
        content.openMessages,
        local.minute,
        "The Kigali studio is open and project conversations are welcome.",
      );
    }

    if (override?.label) {
      status = override.status === "closed" ? "SPECIAL SCHEDULE · CLOSED" : status;
      message = override.note || `${override.label}. ${message}`;
    }

    if (notice?.message) {
      status = notice.title?.toUpperCase() || status;
      message = notice.message;
    }

    return { local, hours, status, message, override, notice, isOpen };
  }, [content, now, timezone]);

  return (
    <div className="cms-studio-status" aria-live="polite">
      <div className="cms-status-topline">
        <span className={`cms-status-dot ${state.isOpen ? "is-open" : ""}`} aria-hidden="true" />
        <span>Studio Status</span>
        <strong>{state.local.timeLabel} CAT</strong>
      </div>
      <h3>{state.status}</h3>
      <p>{state.message}</p>
      <div className="cms-status-meta">
        <span>Kigali, Rwanda</span>
        {state.hours.enabled && state.hours.openTime && state.hours.closeTime ? (
          <span>{state.hours.openTime}–{state.hours.closeTime}</span>
        ) : (
          <span>Closed today</span>
        )}
      </div>
      {state.override?.label ? <small>{state.override.label}</small> : null}
      <style jsx>{`
        .cms-studio-status { color: #fff; width: 100%; }
        .cms-status-topline { display: flex; align-items: center; gap: 9px; color: rgba(255,255,255,.5); font-size: 11px; font-weight: 900; letter-spacing: .11em; text-transform: uppercase; }
        .cms-status-topline strong { margin-left: auto; color: rgba(255,255,255,.72); font-size: 10px; }
        .cms-status-dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,.35); box-shadow: 0 0 0 4px rgba(255,255,255,.04); }
        .cms-status-dot.is-open { background: #fff; box-shadow: 0 0 14px rgba(255,255,255,.55); }
        h3 { margin: 18px 0 0; color: #fff; font-size: clamp(24px, 2.8vw, 44px); line-height: .98; letter-spacing: -.045em; }
        p { margin: 14px 0 0; max-width: 620px; color: rgba(255,255,255,.62); font-size: 14px; line-height: 1.55; }
        .cms-status-meta { display: flex; flex-wrap: wrap; gap: 12px 22px; margin-top: 20px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,.1); color: rgba(255,255,255,.48); font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
        small { display: block; margin-top: 9px; color: rgba(255,255,255,.42); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; }
      `}</style>
    </div>
  );
}

export default function CmsStudioStatus({
  content,
}: {
  content?: StudioStatusContent | null;
}) {
  const [mount, setMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!content) return;

    let portalMount: HTMLElement | null = null;
    let card: HTMLElement | null = null;
    const hiddenNodes: HTMLElement[] = [];

    const install = () => {
      if (portalMount?.isConnected) return true;

      const label = Array.from(
        document.querySelectorAll<HTMLElement>("div,span,p"),
      ).find((element) => normalize(element.textContent) === "studio status");
      if (!label) return false;

      let candidate: HTMLElement | null = label.parentElement;
      while (candidate && candidate !== document.body) {
        const text = normalize(candidate.textContent);
        if (text.includes("kigali") && text.includes("studio")) {
          card = candidate;
          break;
        }
        candidate = candidate.parentElement;
      }
      if (!card) return false;

      Array.from(card.children).forEach((child) => {
        if (!(child instanceof HTMLElement)) return;
        child.dataset.cmsStudioOriginalDisplay = child.style.display || "";
        child.style.display = "none";
        hiddenNodes.push(child);
      });

      portalMount = document.createElement("div");
      portalMount.setAttribute("data-cms-studio-status", "true");
      portalMount.style.display = "block";
      portalMount.style.width = "100%";
      card.appendChild(portalMount);
      setMount(portalMount);
      return true;
    };

    install();
    const observer = new MutationObserver(install);
    observer.observe(document.body, { childList: true, subtree: true });
    const interval = window.setInterval(install, 400);
    const timeout = window.setTimeout(() => {
      observer.disconnect();
      window.clearInterval(interval);
    }, 10_000);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      portalMount?.remove();
      hiddenNodes.forEach((node) => {
        node.style.display = node.dataset.cmsStudioOriginalDisplay || "";
        delete node.dataset.cmsStudioOriginalDisplay;
      });
      setMount(null);
    };
  }, [content]);

  if (!content || !mount) return null;
  return createPortal(<StudioStatusPanel content={content} />, mount);
}
