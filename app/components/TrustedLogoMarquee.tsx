"use client";

import { motion } from "framer-motion";

export type TrustedLogo = {
  name: string;
  src: string;
  href?: string;
};

export default function TrustedLogoMarquee({
  logos,
  heading = "Selected clients and collaborators",
}: {
  logos: TrustedLogo[];
  heading?: string;
}) {
  if (!logos.length) return null;

  const track = [...logos, ...logos];

  return (
    <section className="imvo-trusted-logo-section">
      <style>{`
        @keyframes imvo-logo-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 36px)); }
        }

        @keyframes imvo-logo-marquee-scroll-mobile {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 18px)); }
        }

        .imvo-trusted-logo-section {
          width: 100%;
          padding: 68px 0 74px;
          overflow: hidden;
          position: relative;
          background: #000;
          user-select: none;
        }

        .imvo-trusted-logo-shell {
          width: min(1480px, calc(100% - 64px));
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .imvo-trusted-logo-viewport {
          position: relative;
          display: flex;
          overflow: hidden;
          padding: 12px 0 16px;
          mask-image: linear-gradient(to right, transparent, black 7%, black 93%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 7%, black 93%, transparent);
        }

        .imvo-trusted-logo-track {
          min-width: 100%;
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 72px;
          animation: imvo-logo-marquee-scroll 32s linear infinite;
          will-change: transform;
        }

        .imvo-trusted-logo-viewport:hover .imvo-trusted-logo-track {
          animation-play-state: paused;
        }

        .imvo-trusted-logo-item {
          height: clamp(56px, 4vw, 72px);
          width: auto;
          max-width: 260px;
          flex-shrink: 0;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.78;
          transform: scale(1.08);
          transform-origin: center;
          transition: opacity 300ms ease, transform 300ms ease;
        }

        .imvo-trusted-logo-item:hover {
          opacity: 1;
          transform: scale(1.13);
        }

        @media (max-width: 768px) {
          .imvo-trusted-logo-section { padding: 54px 0 58px; }
          .imvo-trusted-logo-shell { width: min(100% - 28px, 1200px); }
          .imvo-trusted-logo-track {
            gap: 38px;
            animation: imvo-logo-marquee-scroll-mobile 22s linear infinite;
          }
          .imvo-trusted-logo-item {
            height: 46px;
            max-width: 190px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .imvo-trusted-logo-track { animation-play-state: paused; }
        }
      `}</style>

      <div className="imvo-trusted-logo-shell">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            margin: "0 0 42px",
            color: "white",
            textAlign: "center",
            fontSize: 20,
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          {heading}
        </motion.h2>

        <div className="imvo-trusted-logo-viewport">
          <div className="imvo-trusted-logo-track">
            {track.map((logo, index) => {
              const image = (
                <img
                  className="imvo-trusted-logo-item"
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                />
              );

              return logo.href ? (
                <a
                  key={`${logo.name}-${index}`}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={logo.name}
                  style={{ display: "inline-flex", flexShrink: 0 }}
                >
                  {image}
                </a>
              ) : (
                <span
                  key={`${logo.name}-${index}`}
                  style={{ display: "inline-flex", flexShrink: 0 }}
                >
                  {image}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
