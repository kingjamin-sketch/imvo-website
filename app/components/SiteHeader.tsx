"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Brand from "./Brand";

const primaryNav = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "DŌMICILE", href: "/domicile" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

type SiteHeaderProps = {
  deferUntilIntroComplete?: boolean;
};

function HeaderRoll({ children }: { children: string }) {
  const letters = children.split("");

  return (
    <motion.span
      initial="rest"
      whileHover="hover"
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        lineHeight: 1.08,
        color: "white",
      }}
    >
      <span style={{ display: "flex" }}>
        {letters.map((character, index) => (
          <motion.span
            key={`top-${children}-${index}`}
            variants={{ rest: { y: 0 }, hover: { y: "-115%" } }}
            transition={{
              duration: 0.34,
              delay: index * 0.015,
              ease: [0.33, 1, 0.68, 1],
            }}
            style={{ display: "inline-block", color: "white" }}
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        ))}
      </span>
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          color: "white",
        }}
      >
        {letters.map((character, index) => (
          <motion.span
            key={`bottom-${children}-${index}`}
            variants={{ rest: { y: "115%" }, hover: { y: 0 } }}
            transition={{
              duration: 0.34,
              delay: index * 0.015,
              ease: [0.33, 1, 0.68, 1],
            }}
            style={{ display: "inline-block", color: "white" }}
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}

export default function SiteHeader({
  deferUntilIntroComplete = false,
}: SiteHeaderProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isStartupReady, setIsStartupReady] = useState(
    !deferUntilIntroComplete,
  );

  useEffect(() => {
    if (!deferUntilIntroComplete) {
      setIsStartupReady(true);
      return;
    }

    const html = document.documentElement;
    const markReady = () => setIsStartupReady(true);

    if (html.dataset.imvoIntroComplete === "true") {
      markReady();
      return;
    }

    setIsStartupReady(false);
    window.addEventListener("imvo:intro-complete", markReady);

    return () => {
      window.removeEventListener("imvo:intro-complete", markReady);
    };
  }, [deferUntilIntroComplete]);

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
        data-imvo-site-header="primary"
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
          opacity: isStartupReady ? 1 : 0,
          visibility: isStartupReady ? "visible" : "hidden",
          pointerEvents: isStartupReady ? "auto" : "none",
          padding: isScrolled ? "12px 0" : "14px 0",
          background:
            isScrolled || mobileMenuOpen
              ? "linear-gradient(to bottom, rgba(18,18,18,0.58), rgba(18,18,18,0.42))"
              : "linear-gradient(to bottom, rgba(255,255,255,0.16), rgba(255,255,255,0.10))",
          backdropFilter:
            isScrolled || mobileMenuOpen
              ? "blur(24px) saturate(160%)"
              : "blur(20px) saturate(145%)",
          WebkitBackdropFilter:
            isScrolled || mobileMenuOpen
              ? "blur(24px) saturate(160%)"
              : "blur(20px) saturate(145%)",
          borderBottom:
            isScrolled || mobileMenuOpen
              ? "1px solid rgba(255,255,255,0.10)"
              : "1px solid rgba(255,255,255,0.18)",
          boxShadow: isScrolled
            ? "0 12px 40px rgba(0,0,0,0.28)"
            : "none",
          transition:
            "opacity 0.26s ease, padding 0.35s ease, background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
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

          <nav
            className="desktopNav"
            style={{ display: "flex", alignItems: "center", gap: 28 }}
          >
            {primaryNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: 14,
                  opacity: 0.92,
                  textShadow: "0 1px 8px rgba(0,0,0,0.16)",
                }}
              >
                <HeaderRoll>{item.label}</HeaderRoll>
              </Link>
            ))}

            <a
              href="/contact#quote"
              style={{
                background: "rgba(255,255,255,0.96)",
                color: "black",
                padding: isScrolled ? "10px 22px" : "11px 24px",
                borderRadius: 2,
                fontWeight: 800,
                fontSize: 14,
                textDecoration: "none",
                boxShadow: "0 10px 26px rgba(0,0,0,0.14)",
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

          <button
            className="mobileMenuBtn"
            onClick={toggleMenu}
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span
              style={{
                transform: mobileMenuOpen
                  ? "rotate(45deg) translate(5px, 6px)"
                  : "none",
              }}
            />
            <span style={{ opacity: mobileMenuOpen ? 0 : 1 }} />
            <span
              style={{
                transform: mobileMenuOpen
                  ? "rotate(-45deg) translate(5px, -6px)"
                  : "none",
              }}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99998,
              background: "#050505",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 34,
            }}
          >
            {primaryNav.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: 32,
                    fontWeight: 900,
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.64 }}
            >
              <Link
                href="/contact#quote"
                onClick={closeMenu}
                style={{
                  background: "white",
                  color: "black",
                  padding: "16px 36px",
                  borderRadius: 2,
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
