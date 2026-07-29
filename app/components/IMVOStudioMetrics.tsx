"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

type Metric = {
  label: string;
  start?: number;
  target: number;
  suffix?: string;
  pad?: number;
};

const metrics: Metric[] = [
  { label: "Founded", start: 2000, target: 2017 },
  { label: "Projects", start: 0, target: 40, suffix: "+" },
  { label: "Core disciplines", start: 0, target: 4, pad: 2 },
  { label: "Countries", start: 0, target: 9, suffix: "+" },
];

function normalize(value: string | null | undefined) {
  return (value || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function CountUp({
  start = 0,
  target,
  suffix = "",
  pad = 0,
  runKey,
}: {
  start?: number;
  target: number;
  suffix?: string;
  pad?: number;
  runKey: number;
}) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (reduceMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    const duration = 1400;
    const startedAt = performance.now();
    setValue(start);

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.floor(start + (target - start) * eased));

      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, runKey, start, target]);

  const formatted = pad > 0 ? String(value).padStart(pad, "0") : String(value);
  const finalValue = pad > 0 ? String(target).padStart(pad, "0") : String(target);

  return (
    <span aria-label={`${finalValue}${suffix}`}>
      {formatted}
      {suffix}
    </span>
  );
}

function MetricCard({ metric, index, runKey }: { metric: Metric; index: number; runKey: number }) {
  const [hoverRun, setHoverRun] = useState(0);

  return (
    <motion.article
      className="imvo-metric-card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onPointerEnter={() => setHoverRun((value) => value + 1)}
      onFocus={() => setHoverRun((value) => value + 1)}
      tabIndex={0}
    >
      <div className="imvo-metric-value">
        <CountUp
          start={metric.start}
          target={metric.target}
          suffix={metric.suffix}
          pad={metric.pad}
          runKey={runKey + hoverRun}
        />
      </div>
      <div className="imvo-metric-label">{metric.label}</div>
    </motion.article>
  );
}

function MetricsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    if (isInView) setRunKey((value) => value + 1);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="imvo-studio-metrics"
      aria-label="IMVO studio metrics"
      onPointerEnter={() => setRunKey((value) => value + 1)}
    >
      <div className="imvo-metrics-grid" aria-hidden="true" />
      <div className="imvo-metrics-inner">
        <div className="imvo-metrics-row">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} runKey={runKey} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .imvo-studio-metrics {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: clamp(34px, 4.5vw, 64px) clamp(20px, 3vw, 48px);
          background: #080808;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          color: #fff;
        }

        .imvo-metrics-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.28;
          background-image:
            linear-gradient(to right, #181818 1px, transparent 1px),
            linear-gradient(to bottom, #181818 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 92% 90% at 50% 50%, #000 58%, transparent 100%);
        }

        .imvo-metrics-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          margin: 0;
        }

        .imvo-metrics-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          width: 100%;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.055);
        }

        :global(.imvo-metric-card) {
          position: relative;
          min-width: 0;
          min-height: 210px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(28px, 3.2vw, 50px);
          outline: none;
          background: #0b0b0b;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          transition: background 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.imvo-metric-card:last-child) {
          border-right: 0;
        }

        :global(.imvo-metric-card:hover),
        :global(.imvo-metric-card:focus-visible) {
          z-index: 2;
          background: #121212;
          transform: translateY(-2px);
        }

        :global(.imvo-metric-value) {
          margin-bottom: 16px;
          color: #fff;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: clamp(58px, 6.6vw, 104px);
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: -0.08em;
          white-space: nowrap;
        }

        :global(.imvo-metric-label) {
          color: rgba(255, 255, 255, 0.58);
          font-size: clamp(12px, 1vw, 15px);
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        @media (max-width: 900px) {
          .imvo-metrics-row {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          :global(.imvo-metric-card:nth-child(2)) {
            border-right: 0;
          }

          :global(.imvo-metric-card:nth-child(-n + 2)) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
        }

        @media (max-width: 560px) {
          .imvo-studio-metrics {
            padding-left: 14px;
            padding-right: 14px;
          }

          .imvo-metrics-row {
            grid-template-columns: 1fr;
          }

          :global(.imvo-metric-card) {
            min-height: 170px;
            border-right: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }

          :global(.imvo-metric-card:last-child) {
            border-bottom: 0;
          }
        }
      `}</style>
    </section>
  );
}

export default function IMVOStudioMetrics() {
  const pathname = usePathname();
  const [mount, setMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    let originalRow: HTMLElement | null = null;
    let portalMount: HTMLElement | null = null;

    const install = () => {
      if (portalMount?.isConnected) return true;

      const regionalLabel = [...document.querySelectorAll<HTMLElement>("div")].find(
        (element) => normalize(element.textContent) === "regional focus",
      );
      const row = regionalLabel?.closest<HTMLElement>(".mobileStackCenter");
      if (!row) return false;

      originalRow = row;
      row.style.display = "none";

      portalMount = document.createElement("div");
      portalMount.setAttribute("data-imvo-studio-metrics-mount", "true");
      row.insertAdjacentElement("afterend", portalMount);
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
    }, 12000);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      if (originalRow) originalRow.style.display = "";
      portalMount?.remove();
      setMount(null);
    };
  }, [pathname]);

  if (!mount) return null;
  return createPortal(<MetricsSection />, mount);
}
