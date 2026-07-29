"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

type Metric = {
  label: string;
  description: string;
  start?: number;
  target?: number;
  prefix?: string;
  suffix?: string;
  pad?: number;
  staticValue?: string;
};

const metrics: Metric[] = [
  {
    label: "Founded",
    start: 2000,
    target: 2017,
    description: "Operating from Kigali as a built-environment design and development practice.",
  },
  {
    label: "Projects",
    start: 0,
    target: 40,
    suffix: "+",
    description: "Completed and active design, planning, consultancy, and coordination assignments.",
  },
  {
    label: "Core disciplines",
    start: 0,
    target: 4,
    pad: 2,
    description: "Design, consultancy, planning, and site coordination working as one system.",
  },
  {
    label: "Team leads",
    start: 0,
    target: 4,
    pad: 2,
    description: "Four discipline leads across design, strategy, technical delivery, and growth.",
  },
  {
    label: "Strategic partners",
    start: 0,
    target: 9,
    pad: 2,
    description: "A selected network supporting engineering, supply, execution, and development.",
  },
  {
    label: "Regional focus",
    staticValue: "RW / EA",
    description: "A Rwanda-based practice serving East Africa and selected regional projects.",
  },
];

function normalize(value: string | null | undefined) {
  return (value || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function CountUp({
  start = 0,
  target,
  prefix = "",
  suffix = "",
  pad = 0,
  runKey,
}: {
  start?: number;
  target: number;
  prefix?: string;
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

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, runKey, start, target]);

  const formatted = pad > 0 ? String(value).padStart(pad, "0") : String(value);
  const finalValue = pad > 0 ? String(target).padStart(pad, "0") : String(target);

  return (
    <span aria-label={`${prefix}${finalValue}${suffix}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

function MetricCard({ metric, index, runKey }: { metric: Metric; index: number; runKey: number }) {
  const [hoverRun, setHoverRun] = useState(0);
  const cardRunKey = runKey + hoverRun;

  return (
    <motion.article
      className="imvo-metric-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onPointerEnter={() => setHoverRun((value) => value + 1)}
      onFocus={() => setHoverRun((value) => value + 1)}
      tabIndex={0}
    >
      <span className="imvo-metric-corner" aria-hidden="true" />

      <div className="imvo-metric-label-row">
        <span className="imvo-metric-pulse" aria-hidden="true" />
        <span className="imvo-metric-label">{metric.label}</span>
      </div>

      <div className={`imvo-metric-value${metric.staticValue ? " imvo-metric-value-static" : ""}`}>
        {metric.staticValue ? (
          metric.staticValue
        ) : (
          <CountUp
            start={metric.start}
            target={metric.target || 0}
            prefix={metric.prefix}
            suffix={metric.suffix}
            pad={metric.pad}
            runKey={cardRunKey}
          />
        )}
      </div>

      <p>{metric.description}</p>
      <span className="imvo-metric-glow" aria-hidden="true" />
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
          --metric-accent: #f2f2ed;
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: clamp(52px, 6vw, 86px) clamp(14px, 2.8vw, 42px);
          background: #080808;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          color: #fff;
        }

        .imvo-metrics-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.42;
          background-image:
            linear-gradient(to right, #191919 1px, transparent 1px),
            linear-gradient(to bottom, #191919 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 88% 78% at 50% 10%, #000 58%, transparent 100%);
        }

        .imvo-metrics-inner {
          position: relative;
          z-index: 1;
          width: min(1680px, 100%);
          margin: 0 auto;
        }

        .imvo-metrics-row {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 1px;
          padding: 1px;
          background: rgba(255, 255, 255, 0.09);
          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.28);
        }

        :global(.imvo-metric-card) {
          position: relative;
          min-width: 0;
          min-height: 270px;
          padding: clamp(24px, 2.4vw, 36px);
          overflow: hidden;
          outline: none;
          background: #0d0d0d;
          transition:
            background 0.45s ease,
            transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.imvo-metric-card:hover),
        :global(.imvo-metric-card:focus-visible) {
          z-index: 2;
          background: #151515;
          transform: translateY(-3px);
        }

        :global(.imvo-metric-corner) {
          position: absolute;
          top: 0;
          right: 0;
          width: 34px;
          height: 34px;
          border-top: 1px solid transparent;
          border-right: 1px solid transparent;
          transition: border-color 0.45s ease;
        }

        :global(.imvo-metric-card:hover .imvo-metric-corner),
        :global(.imvo-metric-card:focus-visible .imvo-metric-corner) {
          border-color: rgba(255, 255, 255, 0.62);
        }

        :global(.imvo-metric-label-row) {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 26px;
        }

        :global(.imvo-metric-pulse) {
          width: 5px;
          height: 5px;
          flex: 0 0 auto;
          border-radius: 999px;
          background: var(--metric-accent);
          animation: imvoMetricPulse 1.8s ease-in-out infinite;
        }

        :global(.imvo-metric-label) {
          overflow: hidden;
          color: rgba(255, 255, 255, 0.52);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 9px;
          letter-spacing: 0.17em;
          text-overflow: ellipsis;
          text-transform: uppercase;
          white-space: nowrap;
        }

        :global(.imvo-metric-value) {
          margin-bottom: 28px;
          color: #fff;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: clamp(38px, 3.15vw, 60px);
          font-weight: 800;
          line-height: 0.94;
          letter-spacing: -0.075em;
          white-space: nowrap;
        }

        :global(.imvo-metric-value-static) {
          font-size: clamp(30px, 2.55vw, 48px);
          letter-spacing: -0.065em;
        }

        :global(.imvo-metric-card p) {
          max-width: 250px;
          margin: 0;
          color: rgba(255, 255, 255, 0.54);
          font-size: 13px;
          line-height: 1.68;
        }

        :global(.imvo-metric-glow) {
          position: absolute;
          right: -52px;
          bottom: -52px;
          width: 140px;
          height: 140px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.035);
          filter: blur(48px);
          transition: background 0.65s ease, transform 0.65s ease;
        }

        :global(.imvo-metric-card:hover .imvo-metric-glow),
        :global(.imvo-metric-card:focus-visible .imvo-metric-glow) {
          background: rgba(255, 255, 255, 0.11);
          transform: scale(1.2);
        }

        @keyframes imvoMetricPulse {
          0%, 100% { opacity: 0.35; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.18); }
        }

        @media (max-width: 1450px) {
          .imvo-metrics-row {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 820px) {
          .imvo-metrics-row {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          :global(.imvo-metric-card) {
            min-height: 245px;
          }
        }

        @media (max-width: 520px) {
          .imvo-studio-metrics {
            padding-left: 14px;
            padding-right: 14px;
          }

          .imvo-metrics-row {
            grid-template-columns: 1fr;
          }

          :global(.imvo-metric-card) {
            min-height: 220px;
          }

          :global(.imvo-metric-card p) {
            max-width: 300px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.imvo-metric-pulse) {
            animation: none;
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
