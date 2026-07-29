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
    description: "Established in Rwanda as a built-environment design and development practice.",
  },
  {
    label: "Projects",
    start: 0,
    target: 40,
    suffix: "+",
    description: "Design, planning, consultancy, coordination, and development assignments.",
  },
  {
    label: "Core disciplines",
    start: 0,
    target: 4,
    pad: 2,
    description: "Design, consultancy, planning, and site coordination working as one system.",
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
    const duration = 1800;
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
  }, [pad, reduceMotion, runKey, start, target]);

  const formatted = pad > 0 ? String(value).padStart(pad, "0") : String(value);

  return (
    <span aria-label={`${prefix}${pad > 0 ? String(target).padStart(pad, "0") : target}${suffix}`}>
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onPointerEnter={() => setHoverRun((value) => value + 1)}
      onFocus={() => setHoverRun((value) => value + 1)}
      tabIndex={0}
    >
      <span className="imvo-metric-corner" aria-hidden="true" />

      <div className="imvo-metric-label-row">
        <span className="imvo-metric-pulse" aria-hidden="true" />
        <span className="imvo-metric-label">{metric.label}</span>
      </div>

      <div className="imvo-metric-value">
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
  const isInView = useInView(sectionRef, { amount: 0.35 });
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    if (isInView) setRunKey((value) => value + 1);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="imvo-studio-metrics"
      aria-labelledby="imvo-studio-metrics-heading"
      onPointerEnter={() => setRunKey((value) => value + 1)}
    >
      <div className="imvo-metrics-grid" aria-hidden="true" />

      <div className="imvo-metrics-inner">
        <div className="imvo-metrics-header">
          <div>
            <motion.div
              className="imvo-metrics-eyebrow"
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span aria-hidden="true" />
              Studio metrics
            </motion.div>

            <motion.h2
              id="imvo-studio-metrics-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              A practice built through delivery.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
          >
            A concise view of IMVO&apos;s foundation, project experience, integrated disciplines, and regional reach.
          </motion.p>
        </div>

        <div className="imvo-metrics-row">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} runKey={runKey} />
          ))}
        </div>

        <div className="imvo-metrics-meta">
          <div>
            <span>Status</span>
            <strong>Studio active</strong>
          </div>
          <div>
            <span>Base</span>
            <strong>Kigali, Rwanda</strong>
          </div>
          <small>Design · Consultancy · Planning · Coordination</small>
        </div>
      </div>

      <style jsx>{`
        .imvo-studio-metrics {
          --metric-accent: #f2f2ed;
          position: relative;
          overflow: hidden;
          width: 100%;
          padding: clamp(74px, 8vw, 118px) clamp(20px, 4vw, 56px);
          background: #080808;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          color: #fff;
        }

        .imvo-metrics-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.48;
          background-image:
            linear-gradient(to right, #191919 1px, transparent 1px),
            linear-gradient(to bottom, #191919 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, #000 64%, transparent 100%);
        }

        .imvo-metrics-inner {
          position: relative;
          z-index: 1;
          width: min(1400px, 100%);
          margin: 0 auto;
        }

        .imvo-metrics-header {
          display: grid;
          grid-template-columns: minmax(0, 1.12fr) minmax(320px, 0.88fr);
          align-items: end;
          gap: clamp(36px, 6vw, 90px);
          margin-bottom: clamp(46px, 6vw, 76px);
        }

        .imvo-metrics-eyebrow {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
          color: rgba(255, 255, 255, 0.58);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        .imvo-metrics-eyebrow span {
          width: 48px;
          height: 1px;
          background: var(--metric-accent);
        }

        h2 {
          max-width: 760px;
          margin: 0;
          font-size: clamp(38px, 5vw, 72px);
          font-weight: 800;
          line-height: 0.98;
          letter-spacing: -0.055em;
        }

        .imvo-metrics-header > p {
          max-width: 500px;
          margin: 0;
          padding-left: clamp(24px, 4vw, 52px);
          border-left: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.62);
          font-size: clamp(16px, 1.3vw, 18px);
          line-height: 1.75;
        }

        .imvo-metrics-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1px;
          padding: 1px;
          background: rgba(255, 255, 255, 0.08);
        }

        :global(.imvo-metric-card) {
          position: relative;
          min-height: 300px;
          padding: clamp(26px, 3vw, 40px);
          overflow: hidden;
          outline: none;
          background: #0d0d0d;
          transition: background 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.imvo-metric-card:hover),
        :global(.imvo-metric-card:focus-visible) {
          background: #151515;
          transform: translateY(-2px);
        }

        :global(.imvo-metric-corner) {
          position: absolute;
          top: 0;
          right: 0;
          width: 34px;
          height: 34px;
          border-top: 1px solid transparent;
          border-right: 1px solid transparent;
          transition: border-color 0.5s ease;
        }

        :global(.imvo-metric-card:hover .imvo-metric-corner),
        :global(.imvo-metric-card:focus-visible .imvo-metric-corner) {
          border-color: rgba(255, 255, 255, 0.55);
        }

        :global(.imvo-metric-label-row) {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 22px;
        }

        :global(.imvo-metric-pulse) {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: var(--metric-accent);
          animation: imvoMetricPulse 1.8s ease-in-out infinite;
        }

        :global(.imvo-metric-label) {
          color: rgba(255, 255, 255, 0.52);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        :global(.imvo-metric-value) {
          margin-bottom: 30px;
          color: #fff;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: clamp(42px, 4.1vw, 66px);
          font-weight: 800;
          line-height: 0.94;
          letter-spacing: -0.075em;
          white-space: nowrap;
        }

        :global(.imvo-metric-card p) {
          max-width: 270px;
          margin: 0;
          color: rgba(255, 255, 255, 0.52);
          font-size: 14px;
          line-height: 1.72;
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
          transition: background 0.7s ease, transform 0.7s ease;
        }

        :global(.imvo-metric-card:hover .imvo-metric-glow),
        :global(.imvo-metric-card:focus-visible .imvo-metric-glow) {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.18);
        }

        .imvo-metrics-meta {
          display: flex;
          align-items: flex-end;
          gap: 34px;
          margin-top: 38px;
          padding-top: 26px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          text-transform: uppercase;
        }

        .imvo-metrics-meta div {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .imvo-metrics-meta span,
        .imvo-metrics-meta small {
          color: rgba(255, 255, 255, 0.32);
          font-size: 9px;
          letter-spacing: 0.18em;
        }

        .imvo-metrics-meta strong {
          color: rgba(255, 255, 255, 0.72);
          font-size: 10px;
          letter-spacing: 0.12em;
        }

        .imvo-metrics-meta small {
          margin-left: auto;
          text-align: right;
        }

        @keyframes imvoMetricPulse {
          0%, 100% { opacity: 0.35; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.18); }
        }

        @media (max-width: 1050px) {
          .imvo-metrics-row {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .imvo-metrics-header {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .imvo-metrics-header > p {
            padding-left: 0;
            padding-top: 22px;
            border-left: 0;
            border-top: 1px solid rgba(255, 255, 255, 0.12);
          }

          .imvo-metrics-meta {
            align-items: flex-start;
            flex-wrap: wrap;
          }

          .imvo-metrics-meta small {
            width: 100%;
            margin-left: 0;
            text-align: left;
          }
        }

        @media (max-width: 560px) {
          .imvo-studio-metrics {
            padding-left: 16px;
            padding-right: 16px;
          }

          .imvo-metrics-row {
            grid-template-columns: 1fr;
          }

          :global(.imvo-metric-card) {
            min-height: 250px;
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
