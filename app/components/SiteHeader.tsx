"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Brand from "./Brand";

export default function SiteHeader() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > 50) {
      setIsScrolled(true);

      if (latest > previous && latest > 150 && !mobileMenuOpen) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    } else {
      setIsScrolled(false);
      setHidden(false);
    }
  });

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: "0%" },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          padding: isScrolled ? "16px 0" : "20px 0",
          background: isScrolled || mobileMenuOpen
            ? "linear-gradient(to bottom, rgba(5,5,5,0.58), rgba(5,5,5,0.28))"
            : "linear-gradient(to bottom, rgba(5,5,5,0.2), rgba(5,5,5,0.045))",
          backdropFilter: isScrolled || mobileMenuOpen
            ? "blur(24px) saturate(180%)"
            : "blur(12px) saturate(135%)",
          WebkitBackdropFilter: isScrolled || mobileMenuOpen
            ? "blur(24px) saturate(180%)"
            : "blur(12px) saturate(135%)",
          borderBottom: isScrolled || mobileMenuOpen
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.035)",
          boxShadow: isScrolled
            ? "0 12px 40px rgba(0,0,0,0.28)"
            : "none",
          transition:
            "padding 0.35s ease, background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.045), transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="containerWide"
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 32px",
            maxWidth: 1440,
            margin: "0 auto",
          }}
        >
          <Link
  href="/"
  style={{ textDecoration: "none" }}
  onClick={(e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }}
>
  <Brand size="lg" variant="light" />
</Link>

          {/* DESKTOP NAV (Hidden on Mobile) */}
          <nav className="desktopNav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {["Projects", "Services", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: 14,
                  opacity: 0.92,
                  textShadow: "0 1px 18px rgba(0,0,0,0.35)",
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.62";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.92";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {item}
              </Link>
            ))}

            <a
              href="/contact#quote"
              style={{
                background: "rgba(255,255,255,0.96)",
                color: "black",
                padding: isScrolled ? "10px 24px" : "11px 26px",
                borderRadius: 99,
                fontWeight: 800,
                fontSize: 14,
                textDecoration: "none",
                boxShadow: "0 10px 28px rgba(0,0,0,0.18)",
                transition:
                  "transform 0.2s ease, background 0.2s ease, padding 0.35s ease",
              }}
              onClick={(e) => {
                if (window.location.pathname === "/contact") {
                  e.preventDefault();
                  document.getElementById("quote")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.045)";
                e.currentTarget.style.background = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.background = "rgba(255,255,255,0.96)";
              }}
            >
              Request a Quote
            </a>
          </nav>

          {/* MOBILE HAMBURGER BUTTON (Hidden on Desktop) */}
          <button className="mobileMenuBtn" onClick={toggleMenu} aria-label="Toggle Menu">
            <span style={{ transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 6px)" : "none" }} />
            <span style={{ opacity: mobileMenuOpen ? 0 : 1 }} />
            <span style={{ transform: mobileMenuOpen ? "rotate(-45deg) translate(5px, -6px)" : "none" }} />
          </button>
        </div>
      </motion.header>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99998, // Just below the header
              background: "#050505",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 40,
            }}
          >
            {["Projects", "Services", "About", "Contact"].map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  onClick={closeMenu}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: 32,
                    fontWeight: 900,
                  }}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Link
                href="/contact#quote"
                onClick={closeMenu}
                style={{
                  background: "white",
                  color: "black",
                  padding: "16px 36px",
                  borderRadius: 99,
                  fontWeight: 800,
                  fontSize: 16,
                  textDecoration: "none",
                }}
              >
                Request a Quote
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}