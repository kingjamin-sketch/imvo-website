"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { BRAND, THEME } from "./components/Brand";

const heroSlides = [
  { video: "/hero-1.mp4", poster: "/hero-1.jpg", label: "ARCHITECTURE" },
  { video: "/hero-2.mp4", poster: "/hero-2.jpg", label: "PLANNING" },
  { video: "/hero-3.mp4", poster: "/hero-3.jpg", label: "SUPERVISION" },
];

const homeProjects = [
  { title: "Kigali Residential Villa", meta: "Residential · Kigali", img: "/projects/p01.jpg" },
  { title: "Mixed-Use Commercial Block", meta: "Commercial · Kigali", img: "/projects/p02.jpg" },
  { title: "Urban Layout Strategy", meta: "Planning · East Africa", img: "/projects/p03.jpg" },
  { title: "Office & Retail Fit-Out", meta: "Commercial · Kigali", img: "/projects/p04.jpg" },
  { title: "Multi-Family Prototype", meta: "Residential · Rwanda", img: "/projects/p05.jpg" },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const slides = useMemo(() => heroSlides, []);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <main
      className="min-h-screen"
      style={
        {
          backgroundColor: THEME.PAPER,
          ["--accent" as any]: THEME.ACCENT,
          ["--line" as any]: THEME.LINE,
        } as React.CSSProperties
      }
    >
      <SiteHeader />

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={s.video}
            className="absolute inset-0"
            style={{ opacity: i === slide ? 1 : 0, transition: "opacity 900ms ease" }}
          >
            <img
              src={s.poster}
              alt="IMVO hero"
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
            />
            <video className="absolute inset-0 h-full w-full object-cover" src={s.video} autoPlay muted loop playsInline />
          </div>
        ))}

        <div className="absolute inset-0 bg-black/50" />
        <div
          className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "color-mix(in srgb, var(--accent) 18%, transparent)" }}
        />
        <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-[1400px] px-6 text-white">
            <div className="mb-5 inline-flex items-center gap-2 text-[11px] tracking-[0.35em] text-white/70">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
              {slides[slide]?.label}
            </div>

            <h1 className="max-w-3xl text-3xl font-semibold leading-[1.15] tracking-tight md:text-5xl">
              At {BRAND.nameOfficial}, we design and supervise spaces that are sustainable,
              technically precise, and built to last.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
              Architecture, planning, and supervision — delivered with structural clarity, contextual sensitivity,
              and long-term value.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/projects" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90">
                View Projects
              </Link>
              <Link href="/contact" className="rounded-full border border-white/40 px-6 py-3 text-sm text-white hover:border-white">
                Request a Quote
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlide(idx)}
                  className="h-2.5 w-2.5 rounded-full border border-white/40"
                  style={{ backgroundColor: idx === slide ? "var(--accent)" : "transparent" }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <Link
          href="/projects"
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-xs tracking-[0.25em] text-white/80 backdrop-blur hover:border-white/40"
        >
          EXPLORE
        </Link>
      </section>

      {/* QUICK PROJECT STRIP (short, homepage style) */}
      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs tracking-[0.35em] text-black/55">SELECTED WORK</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              A preview of recent and representative work.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/65">
              This is a short preview. Full explanations and more images are on the Projects page.
            </p>
          </div>
          <Link href="/projects" className="hidden md:inline-flex items-center gap-2 text-sm text-black/70 hover:text-black">
            View all projects <span style={{ color: THEME.ACCENT }}>→</span>
          </Link>
        </div>

        <div className="mt-10 overflow-x-auto pb-3">
          <div className="flex min-w-max gap-4">
            {homeProjects.map((p) => (
              <article key={p.title} className="w-[360px] rounded-3xl border border-[color:var(--line)] bg-white/70 p-6 backdrop-blur hover:border-black/25">
                <div className="overflow-hidden rounded-2xl border border-[color:var(--line)] bg-white/70">
                  <img src={p.img} alt={p.title} className="h-48 w-full object-cover" onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")} />
                  <div className="h-48 w-full" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold leading-snug">{p.title}</h3>
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: THEME.ACCENT }} />
                </div>
                <div className="mt-2 text-xs text-black/55">{p.meta}</div>
                <div className="mt-4 text-sm text-black/70">Open →</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BLACK FEATURE STRIP (home stays short but premium) */}
      <section className="border-t border-black/10 bg-black text-white">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <div className="text-xs tracking-[0.35em] text-white/60">IMVO</div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Design that is buildable, efficient, and context-aware.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                We focus on clear decision-making, disciplined documentation, and supervision that protects quality.
                For full detail, see About and Services.
              </p>
            </div>
            <div className="md:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                {["Sustainability", "Innovation", "Integrity", "Precision", "Functionality", "Supervision"].map((x) => (
                  <div key={x} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/about" className="rounded-full border border-white/30 px-6 py-3 text-sm text-white hover:border-white/55">
              About the studio
            </Link>
            <Link href="/services" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90">
              Services & deliverables
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}