"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Brand from "./Brand";
import PracticeSwitcher from "./PracticeSwitcher";

const studioNav = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const systemsNav = [
  { label: "Capabilities", href: "/systems#capabilities" },
  { label: "Approach", href: "/systems#approach" },
  { label: "Contact", href: "/systems#contact" },
];

type SiteHeaderProps = {
  deferUntilIntroComplete?: boolean;
};

function HeaderRoll({
  children,
  color = "white",
}: {
  children: string;
  color?: string;
}) {
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
        color,
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
            style={{ display: "inline-block", color }}
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
          color,
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
            style={{ display: "inline-block", color }}
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
  const pathname = usePathname();
  const isSystems = pathname.startsWith("/systems");
  const currentNav = isSystems ? systemsNav : studioNav;
  const foreground = isSystems ? "#0a0a0a" : "white";
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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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
  const quoteHref = isSystems ? "/contact?practice=systems" : "/contact#quote";
  const quoteLabel = isSystems ? "Start a Project" : "Request a Quote";

  const headerBackground = isSystems
    ? isScrolled || mobileMenuOpen
      ? "rgba(247,247,244,0.96)"
      : "rgba(247,247,244,0.90)"
    : isScrolled || mobileMenuOpen
      ? "linear-gradient(to bottom, rgba(18,18,18,0.58), rgba(18,18,18,0.42))"
      : "linear-gradient(to bottom, rgba(255,255,255,0.16), rgba(255,255,255,0.10))";

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
          background: headerBackground,
          backdropFilter:
            isScrolled || mobileMenuOpen
              ? "blur(24px) saturate(160%)"
              : "blur(20px) saturate(145%)",
          WebkitBackdropFilter:
            isScrolled || mobileMenuOpen
              ? "blur(24px) saturate(160%)"
              : "blur(20px) saturate(145%)",
          borderBottom: isSystems
            ? "1px solid rgba(10,10,10,0.10)"
            : isScrolled || mobileMenuOpen
              ? "1px solid rgba(255,255,255,0.10)"
              : "1px solid rgba(255,255,255,0.18)",
          boxShadow: isScrolled
            ? isSystems
              ? "0 12px 40px rgba(0,0,0,0.08)"
              : "0 12px 40px rgba(0,0,0,0.28)"
            : "none",
          transition:
            "opacity 0.26s ease, padding 0.35s ease, background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isSystems
              ? "none"
              : "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.045), transparent 65%)",
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
            <Brand size="lg" variant={isSystems ? "dark" : "light"} />
          </Link>

          <PracticeSwitcher variant={isSystems ? "dark" : "light"} />

          <nav
            className="desktopNav"
            style={{ display: "flex", alignItems: "center", gap: 28 }}
          >
            {currentNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  color: foreground,
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: 14,
                  opacity: 0.92,
                  textShadow: isSystems ? "none" : "0 1px 8px rgba(0,0,0,0.16)",
                }}
              >
                <HeaderRoll color={foreground}>{item.label}</HeaderRoll>
              </Link>
            ))}

            <Link
              href={quoteHref}
              style={{
                background: isSystems ? "#0a0a0a" : "rgba(255,255,255,0.96)",
                color: isSystems ? "white" : "black",
                padding: isScrolled ? "10px 22px" : "11px 24px",
                borderRadius: 2,
                fontWeight: 800,
                fontSize: 14,
                textDecoration: "none",
                boxShadow: isSystems
                  ? "0 10px 26px rgba(0,0,0,0.08)"
                  : "0 10px 26px rgba(0,0,0,0.14)",
                transition:
                  "transform 0.2s ease, background 0.2s ease, padding 0.35s ease",
              }}
              onClick={(e) => {
                if (!isSystems && window.location.pathname === "/contact") {
                  e.preventDefault();
                  document.getElementById("quote")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.045)";
                e.currentTarget.style.background = isSystems ? "#242424" : "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.background = isSystems
                  ? "#0a0a0a"
                  : "rgba(255,255,255,0.96)";
              }}
            >
              {quoteLabel}
            </Link>
          </nav>

          <button
            className="mobileMenuBtn"
            onClick={toggleMenu}
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            style={{ color: foreground }}
          >
            <span
              style={{
                background: foreground,
                transform: mobileMenuOpen
                  ? "rotate(45deg) translate(5px, 6px)"
                  : "none",
              }}
            />
            <span
              style={{
                background: foreground,
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                background: foreground,
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
              background: isSystems ? "#f4f4f1" : "#050505",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 22,
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                fontSize: 11,
                fontWeight: 800,
              }}
            >
              <Link
                href="/"
                onClick={closeMenu}
                style={{
                  color: isSystems ? "#666" : "rgba(255,255,255,.62)",
                  textDecoration: "none",
                }}
              >
                Studio
              </Link>
              <Link
                href="/systems"
                onClick={closeMenu}
                style={{
                  color: isSystems ? "#0a0a0a" : "white",
                  textDecoration: "none",
                }}
              >
                Systems
              </Link>
            </div>

            {currentNav.map((item, i) => (
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
                    color: foreground,
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
              transition={{ delay: 0.24 + currentNav.length * 0.08 }}
            >
              <Link
                href={quoteHref}
                onClick={closeMenu}
                style={{
                  background: isSystems ? "#0a0a0a" : "white",
                  color: isSystems ? "white" : "black",
                  padding: "16px 36px",
                  borderRadius: 2,
                  fontWeight: 800,
                  fontSize: 16,
                  textDecoration: "none",
                }}
              >
                {quoteLabel}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
