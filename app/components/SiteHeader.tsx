"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BRAND, THEME } from "./Brand";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/25 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Go home" className="inline-flex items-center">
              <img src="/imvo-white.png" alt="IMVO" className="h-8 w-auto" />
            </Link>
            <div className="hidden text-[11px] tracking-[0.35em] text-white/75 md:block">
              {BRAND.tagline}
            </div>
          </div>

          <nav className="hidden items-center gap-10 text-sm text-white/75 md:flex">
            <Link className="hover:text-white" href="/projects">Projects</Link>
            <Link className="hover:text-white" href="/services">Services</Link>
            <Link className="hover:text-white" href="/about">About</Link>
            <Link className="hover:text-white" href="/contact">Contact</Link>
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-full border border-white/35 px-4 py-2 text-sm text-white hover:border-white"
            aria-label="Open menu"
          >
            More
          </button>
        </div>
      </header>

      {/* MORE PANEL */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/55" onClick={() => setMenuOpen(false)} />
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md shadow-2xl"
            style={{ backgroundColor: THEME.PAPER }}
          >
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
              <div>
                <div className="text-xs tracking-[0.35em] text-black/55">IMVO MENU</div>
                <div className="mt-1 text-lg font-semibold">Quick access</div>
              </div>
              <button
                className="rounded-full border border-black/20 px-3 py-1 text-sm hover:border-black/40"
                onClick={() => setMenuOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="rounded-3xl border border-black/10 bg-white/70 p-5">
                <div className="text-xs tracking-[0.25em] text-black/55">STUDIO</div>
                <p className="mt-2 text-sm leading-relaxed text-black/70">
                  IMVO is a Kigali-based architectural & planning practice delivering sustainable design,
                  strategic planning, and supervision — with engineering-aware execution.
                </p>

                <div className="mt-4 grid gap-3 text-sm">
                  <Link
                    className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 hover:border-black/25"
                    href="/projects"
                    onClick={() => setMenuOpen(false)}
                  >
                    Explore Projects
                  </Link>
                  <Link
                    className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 hover:border-black/25"
                    href="/services"
                    onClick={() => setMenuOpen(false)}
                  >
                    Service Pillars & Deliverables
                  </Link>
                  <Link
                    className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 hover:border-black/25"
                    href="/about"
                    onClick={() => setMenuOpen(false)}
                  >
                    Studio Story & Approach
                  </Link>
                  <Link
                    className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 hover:border-black/25"
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                  >
                    Start a Project
                  </Link>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-black/10 bg-white/70 p-5">
                <div className="text-xs tracking-[0.25em] text-black/55">CONTACT</div>
                <div className="mt-3 text-sm text-black/70">
                  <div><span className="text-black/50">Email:</span> {BRAND.email}</div>
                  <div className="mt-1"><span className="text-black/50">Phone:</span> {BRAND.phone}</div>
                  <div className="mt-1"><span className="text-black/50">Location:</span> {BRAND.location}</div>
                </div>
              </div>

              <div className="mt-6 text-xs text-black/50">
                Next upgrades: project detail pages, PDF company profile download, and testimonials.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}