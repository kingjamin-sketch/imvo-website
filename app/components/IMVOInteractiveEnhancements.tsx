"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import { JellyExploreButton } from "@/components/ui/jelly-explore-button";

type JellyTarget = {
  id: string;
  element: HTMLElement;
  slot: HTMLSpanElement;
  label: string;
  width: number;
  height: number;
  fontSize: number;
  disabled: boolean;
  originalStyle: string | null;
  originalAriaLabel: string | null;
};

type Testimonial = {
  text: string;
  author: string;
  date: string;
};

type TestimonialMount = {
  slot: HTMLDivElement;
  heading: string;
  testimonials: Testimonial[];
};

let jellyTargetSequence = 0;

const excludedLabels = new Set([
  "ALL",
  "RESIDENTIAL",
  "COMMERCIAL",
  "INSTITUTIONAL",
  "URBAN",
  "HOSPITALITY",
  "PROJECTS",
  "SERVICES",
  "ABOUT",
  "CONTACT",
  "PREVIOUS",
  "NEXT",
  "CLOSE",
  "OPEN",
  "←",
  "→",
  "+",
  "−",
]);

const knownActionLabels = [
  "EXPLORE WORK",
  "EXPLORE THE STUDIO",
  "VIEW ALL",
  "EXPLORE SERVICES",
  "REQUEST A QUOTE",
  "START A CONVERSATION",
  "EXPLORE PROJECTS",
  "DOWNLOAD STUDIO DECK",
  "SUBMIT INQUIRY",
  "TRANSMITTING BRIEF",
  "SEND MESSAGE",
  "START PROJECT",
  "GET STARTED",
  "LEARN MORE",
];

const normalizeLabel = (value: string) => value.replace(/\s+/g, " ").trim();

const readOriginalLabel = (element: HTMLElement) =>
  normalizeLabel(
    Array.from(element.childNodes)
      .filter(
        (node) =>
          !(
            node instanceof HTMLElement &&
            node.dataset.imvoJellySlot === "true"
          ),
      )
      .map((node) => node.textContent || "")
      .join(" "),
  );

const isEligibleAction = (element: HTMLElement, label: string) => {
  if (!label) return false;
  if (element.dataset.imvoJellySkip === "true") return false;
  if (element.classList.contains("mobileMenuBtn")) return false;
  if (element.getAttribute("target") === "_blank") return false;

  const ariaLabel = (element.getAttribute("aria-label") || "").toUpperCase();
  if (
    [
      "MENU",
      "NAVIGATION",
      "PREVIOUS",
      "NEXT",
      "ZOOM",
      "RESET",
      "SLIDE",
      "SOCIAL",
    ].some((term) => ariaLabel.includes(term))
  ) {
    return false;
  }

  const normalized = label.toUpperCase().replace(/↗|↓/g, "").trim();
  if (excludedLabels.has(normalized)) return false;

  const isSubmit =
    element instanceof HTMLButtonElement && element.type === "submit";
  if (isSubmit) return true;

  if (knownActionLabels.some((action) => normalized.includes(action))) {
    return true;
  }

  const rect = element.getBoundingClientRect();
  if (rect.width < 110 || rect.height < 40) return false;

  const computed = window.getComputedStyle(element);
  const radius = Number.parseFloat(computed.borderTopLeftRadius) || 0;
  const hasVisibleSurface =
    computed.backgroundColor !== "rgba(0, 0, 0, 0)" ||
    computed.borderTopStyle !== "none";

  return radius >= 30 && hasVisibleSurface;
};

const getJellyDimensions = (label: string) => {
  const cleanLabel = label.replace(/↗|↓/g, "").trim();
  const availableWidth = Math.max(170, window.innerWidth - 32);
  const width = Math.min(
    availableWidth,
    Math.max(180, Math.min(320, cleanLabel.length * 9.2 + 76)),
  );

  return {
    width: Math.round(width),
    height: 58,
    fontSize: cleanLabel.length > 24 ? 14 : cleanLabel.length > 16 ? 15 : 16,
  };
};

function JellyCTAEnhancer() {
  const pathname = usePathname();
  const [targets, setTargets] = useState<JellyTarget[]>([]);

  useEffect(() => {
    const enhancedTargets = new Map<HTMLElement, JellyTarget>();
    let scheduledFrame = 0;

    const enhance = (element: HTMLElement, label: string) => {
      const dimensions = getJellyDimensions(label);
      const slot = document.createElement("span");
      slot.dataset.imvoJellySlot = "true";
      slot.style.position = "absolute";
      slot.style.inset = "0";
      slot.style.display = "flex";
      slot.style.alignItems = "center";
      slot.style.justifyContent = "center";
      slot.style.overflow = "visible";
      slot.style.color = "white";

      const target: JellyTarget = {
        id: `imvo-jelly-${++jellyTargetSequence}`,
        element,
        slot,
        label,
        ...dimensions,
        disabled:
          element instanceof HTMLButtonElement ? element.disabled : false,
        originalStyle: element.getAttribute("style"),
        originalAriaLabel: element.getAttribute("aria-label"),
      };

      element.dataset.imvoJelly = "true";
      element.dataset.imvoJellyLabel = label;
      element.setAttribute("aria-label", label.replace(/↗|↓/g, "").trim());
      element.style.position = "relative";
      element.style.display = "inline-flex";
      element.style.alignItems = "center";
      element.style.justifyContent = "center";
      element.style.width = `${dimensions.width}px`;
      element.style.height = `${dimensions.height}px`;
      element.style.padding = "0";
      element.style.marginLeft = element.style.marginLeft || "0";
      element.style.marginRight = element.style.marginRight || "0";
      element.style.color = "transparent";
      element.style.textShadow = "none";
      element.style.textDecoration = "none";
      element.style.background = "transparent";
      element.style.border = "none";
      element.style.borderRadius = "0";
      element.style.boxShadow = "none";
      element.style.overflow = "visible";
      element.style.verticalAlign = "middle";
      element.appendChild(slot);

      enhancedTargets.set(element, target);
    };

    const scan = () => {
      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>("a, button"),
      );

      candidates.forEach((element) => {
        const current = enhancedTargets.get(element);
        const label = readOriginalLabel(element);

        if (current) {
          if (!element.contains(current.slot)) {
            element.appendChild(current.slot);
          }

          const nextLabel = label || current.label;
          const disabled =
            element instanceof HTMLButtonElement ? element.disabled : false;

          if (nextLabel !== current.label || disabled !== current.disabled) {
            current.label = nextLabel;
            current.disabled = disabled;
            const dimensions = getJellyDimensions(nextLabel);
            current.width = dimensions.width;
            current.height = dimensions.height;
            current.fontSize = dimensions.fontSize;
            element.dataset.imvoJellyLabel = nextLabel;
            element.style.width = `${dimensions.width}px`;
            element.style.height = `${dimensions.height}px`;
          }
          return;
        }

        if (element.dataset.imvoJelly === "true") return;
        if (isEligibleAction(element, label)) enhance(element, label);
      });

      enhancedTargets.forEach((target, element) => {
        if (!document.contains(element)) {
          enhancedTargets.delete(element);
        }
      });

      setTargets(Array.from(enhancedTargets.values()).map((target) => ({ ...target })));
    };

    const scheduleScan = () => {
      window.cancelAnimationFrame(scheduledFrame);
      scheduledFrame = window.requestAnimationFrame(scan);
    };

    scheduleScan();
    const delayedScan = window.setTimeout(scheduleScan, 500);

    const observer = new MutationObserver(scheduleScan);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["disabled"],
    });

    return () => {
      observer.disconnect();
      window.clearTimeout(delayedScan);
      window.cancelAnimationFrame(scheduledFrame);

      enhancedTargets.forEach((target, element) => {
        target.slot.remove();
        delete element.dataset.imvoJelly;
        delete element.dataset.imvoJellyLabel;

        if (target.originalStyle === null) {
          element.removeAttribute("style");
        } else {
          element.setAttribute("style", target.originalStyle);
        }

        if (target.originalAriaLabel === null) {
          element.removeAttribute("aria-label");
        } else {
          element.setAttribute("aria-label", target.originalAriaLabel);
        }
      });

      setTargets([]);
    };
  }, [pathname]);

  return (
    <>
      <style>{`
        [data-imvo-jelly="true"] {
          background: transparent !important;
          border: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          color: transparent !important;
          overflow: visible !important;
        }

        [data-imvo-jelly="true"] > :not([data-imvo-jelly-slot="true"]) {
          visibility: hidden !important;
        }

        [data-imvo-jelly-slot="true"] {
          visibility: visible !important;
          pointer-events: auto;
          z-index: 2;
        }

        @media (prefers-reduced-motion: reduce) {
          [data-imvo-jelly-slot="true"] * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>

      {targets.map((target) =>
        createPortal(
          <JellyExploreButton
            color="#3344cc"
            width={target.width}
            height={target.height}
            fontSize={target.fontSize}
            disabled={target.disabled}
          >
            {target.label}
          </JellyExploreButton>,
          target.slot,
          target.id,
        ),
      )}
    </>
  );
}

function TestimonialMasonry({
  heading,
  testimonials,
}: {
  heading: string;
  testimonials: Testimonial[];
}) {
  return (
    <section className="imvo-testimonial-masonry">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes imvo-testimonial-border-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .imvo-testimonial-masonry {
          width: 100%;
          background: #101010;
          padding: 120px 0;
          position: relative;
          overflow: hidden;
        }

        .imvo-testimonial-masonry::before,
        .imvo-testimonial-masonry::after {
          content: "";
          position: absolute;
          width: 38%;
          height: 38%;
          border-radius: 999px;
          background: rgba(255,255,255,0.035);
          filter: blur(120px);
          pointer-events: none;
        }

        .imvo-testimonial-masonry::before {
          top: -12%;
          left: -12%;
        }

        .imvo-testimonial-masonry::after {
          right: -12%;
          bottom: -12%;
        }

        .imvo-testimonial-shell {
          width: min(1248px, calc(100% - 48px));
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .imvo-testimonial-columns {
          columns: 3;
          column-gap: 24px;
          margin-top: 80px;
        }

        .imvo-testimonial-item {
          break-inside: avoid;
          margin-bottom: 24px;
        }

        .imvo-testimonial-card {
          position: relative;
          display: flex;
          min-height: 220px;
          overflow: hidden;
          border-radius: 24px;
          transition: border-radius 300ms ease, transform 300ms ease;
          isolation: isolate;
        }

        .imvo-testimonial-card:hover {
          border-radius: 30px;
          transform: translateY(-3px);
        }

        .imvo-testimonial-border {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          z-index: 0;
          opacity: 0;
          pointer-events: none;
          background: conic-gradient(transparent, transparent, transparent, #ff7351);
          animation: imvo-testimonial-border-rotate 4s linear infinite;
          transition: opacity 300ms ease;
        }

        .imvo-testimonial-card:hover .imvo-testimonial-border {
          opacity: 1;
        }

        .imvo-testimonial-panel {
          position: absolute;
          inset: 1px;
          z-index: 1;
          border-radius: inherit;
          background: #191919;
          transition: background 300ms ease;
        }

        .imvo-testimonial-card:hover .imvo-testimonial-panel {
          background: #282828;
        }

        .imvo-testimonial-content {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 34px;
          font-family: 'Inter', sans-serif;
        }

        @media (max-width: 1023px) {
          .imvo-testimonial-columns { columns: 2; }
        }

        @media (max-width: 639px) {
          .imvo-testimonial-masonry { padding: 88px 0; }
          .imvo-testimonial-shell { width: min(100% - 32px, 1248px); }
          .imvo-testimonial-columns { columns: 1; margin-top: 56px; }
          .imvo-testimonial-content { padding: 28px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .imvo-testimonial-border { animation: none; }
          .imvo-testimonial-card { transition: none; }
        }
      `}</style>

      <div className="imvo-testimonial-shell">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: "center" }}
        >
          <div
            style={{
              color: "#737373",
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Client Perspectives
          </div>

          <h2
            style={{
              maxWidth: 760,
              margin: "18px auto 0",
              color: "white",
              fontSize: "clamp(42px, 5vw, 64px)",
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.055em",
            }}
          >
            {heading}
          </h2>

          <p
            style={{
              maxWidth: 760,
              margin: "24px auto 0",
              color: "#a1a1a1",
              fontFamily: "'Inter', sans-serif",
              fontSize: 17,
              lineHeight: 1.75,
            }}
          >
            Feedback from clients across IMVO&apos;s built-environment design,
            consultancy, and project coordination work.
          </p>
        </motion.header>

        <div className="imvo-testimonial-columns">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.author}-${index}`}
              className="imvo-testimonial-item"
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <article className="imvo-testimonial-card">
                <div className="imvo-testimonial-border" />
                <div className="imvo-testimonial-panel" />

                <div className="imvo-testimonial-content">
                  <div>
                    <span
                      style={{
                        color: "#737373",
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
                      {testimonial.author}
                    </span>

                    <p
                      style={{
                        margin: "24px 0 0",
                        color: "#d1d1d1",
                        fontSize: 15,
                        fontWeight: 400,
                        lineHeight: 1.75,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      “{testimonial.text}”
                    </p>
                  </div>

                  <span
                    style={{
                      color: "#737373",
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {testimonial.date}
                  </span>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialMasonryEnhancer() {
  const pathname = usePathname();
  const [mount, setMount] = useState<TestimonialMount | null>(null);

  useEffect(() => {
    if (pathname !== "/about") {
      setMount(null);
      return;
    }

    let originalSection: HTMLElement | null = null;
    let originalDisplay = "";
    let slot: HTMLDivElement | null = null;

    const setup = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("section"));
      originalSection =
        sections.find((section) =>
          (section.textContent || "").includes("Client Perspectives"),
        ) || null;

      if (!originalSection) return;

      const quoteParagraphs = Array.from(
        originalSection.querySelectorAll<HTMLParagraphElement>("p"),
      ).filter((paragraph) =>
        normalizeLabel(paragraph.textContent || "").startsWith("“"),
      );

      const testimonials = quoteParagraphs
        .map((paragraph) => {
          const card = paragraph.parentElement?.parentElement;
          const meta = card?.children.item(1);
          const author = normalizeLabel(meta?.children.item(0)?.textContent || "");
          const date = normalizeLabel(meta?.children.item(1)?.textContent || "");
          const text = normalizeLabel(paragraph.textContent || "")
            .replace(/^“/, "")
            .replace(/”$/, "");

          return { text, author, date };
        })
        .filter((testimonial) => testimonial.text && testimonial.author);

      if (!testimonials.length) return;

      const heading =
        normalizeLabel(originalSection.querySelector("h2")?.textContent || "") ||
        "Trusted by visionaries.";

      originalDisplay = originalSection.style.display;
      originalSection.style.display = "none";

      slot = document.createElement("div");
      slot.dataset.imvoTestimonialSlot = "true";
      originalSection.parentElement?.insertBefore(slot, originalSection);

      setMount({ slot, heading, testimonials });
    };

    const frame = window.requestAnimationFrame(setup);
    const delayed = window.setTimeout(setup, 600);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(delayed);
      if (originalSection) originalSection.style.display = originalDisplay;
      slot?.remove();
      setMount(null);
    };
  }, [pathname]);

  if (!mount) return null;

  return createPortal(
    <TestimonialMasonry
      heading={mount.heading}
      testimonials={mount.testimonials}
    />,
    mount.slot,
  );
}

export default function IMVOInteractiveEnhancements() {
  return (
    <>
      <JellyCTAEnhancer />
      <TestimonialMasonryEnhancer />
    </>
  );
}
