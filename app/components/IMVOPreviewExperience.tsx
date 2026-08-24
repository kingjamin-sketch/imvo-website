"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

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

const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

const ctaLabels = [
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
  "MEET THE TEAM",
];

function TestimonialMasonry({
  heading,
  testimonials,
}: {
  heading: string;
  testimonials: Testimonial[];
}) {
  return (
    <section className="imvo-testimonial-masonry-v2">
      <div className="imvo-testimonial-shell-v2">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="imvo-testimonial-header-v2"
        >
          <div className="imvo-testimonial-kicker-v2">Client Perspectives</div>
          <h2>{heading}</h2>
          <p>
            Feedback from clients across IMVO&apos;s built-environment design,
            consultancy, and project coordination work.
          </p>
        </motion.header>

        <div className="imvo-testimonial-columns-v2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.author}-${index}`}
              className="imvo-testimonial-item-v2"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.035,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <article className="imvo-testimonial-card-v2">
                <div className="imvo-testimonial-border-v2" />
                <div className="imvo-testimonial-panel-v2" />
                <div className="imvo-testimonial-content-v2">
                  <div>
                    <span className="imvo-testimonial-author-v2">
                      {testimonial.author}
                    </span>
                    <p>“{testimonial.text}”</p>
                  </div>
                  <span className="imvo-testimonial-date-v2">
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

function TestimonialEnhancer() {
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
      if (slot || originalSection) return;

      const sections = Array.from(document.querySelectorAll<HTMLElement>("section"));
      originalSection =
        sections.find((section) =>
          normalize(section.textContent || "").includes("Client Perspectives"),
        ) || null;

      if (!originalSection) return;

      const quoteParagraphs = Array.from(
        originalSection.querySelectorAll<HTMLParagraphElement>("p"),
      ).filter((paragraph) => normalize(paragraph.textContent || "").startsWith("“"));

      const testimonials = quoteParagraphs
        .map((paragraph) => {
          const card = paragraph.parentElement?.parentElement;
          const meta = card?.children.item(1);
          const author = normalize(meta?.children.item(0)?.textContent || "");
          const date = normalize(meta?.children.item(1)?.textContent || "");
          const text = normalize(paragraph.textContent || "")
            .replace(/^“/, "")
            .replace(/”$/, "");
          return { text, author, date };
        })
        .filter((testimonial) => testimonial.text && testimonial.author);

      if (!testimonials.length) return;

      const heading =
        normalize(originalSection.querySelector("h2")?.textContent || "") ||
        "Trusted by visionaries.";

      originalDisplay = originalSection.style.display;
      originalSection.style.display = "none";
      slot = document.createElement("div");
      slot.dataset.imvoTestimonialPreview = "true";
      originalSection.parentElement?.insertBefore(slot, originalSection);
      setMount({ slot, heading, testimonials });
    };

    const frame = window.requestAnimationFrame(setup);
    const delayed = window.setTimeout(setup, 700);

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
    <TestimonialMasonry heading={mount.heading} testimonials={mount.testimonials} />,
    mount.slot,
  );
}

function EditorialUIEnhancer() {
  const pathname = usePathname();

  useEffect(() => {
    const touched = new Set<HTMLElement>();
    let scanFrame = 0;

    const add = (element: HTMLElement | null, className: string) => {
      if (!element) return;
      element.classList.add(className);
      touched.add(element);
    };

    const markSectionGrid = (
      section: HTMLElement | undefined,
      sectionClass: string,
      gridClass: string,
      cardClass: string,
      gridIndex = 1,
    ) => {
      if (!section) return;
      add(section, sectionClass);
      const shell = section.querySelector<HTMLElement>(".containerWide");
      const grid = shell?.children.item(gridIndex) as HTMLElement | null;
      add(grid, gridClass);
      Array.from(grid?.children || []).forEach((child, index) => {
        const card = child as HTMLElement;
        add(card, cardClass);
        card.dataset.imvoIndex = String(index + 1).padStart(2, "0");
      });
    };

    const scan = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("section"));

      sections
        .filter((section) => /Why Choose/i.test(section.textContent || ""))
        .forEach((section) => {
          section.dataset.imvoWhyChooseHidden = "true";
          section.style.display = "none";
          touched.add(section);
        });

      const intelligence = sections.find((section) =>
        normalize(section.textContent || "").includes("Project Intelligence"),
      );
      markSectionGrid(
        intelligence,
        "imvo-intelligence-v2",
        "imvo-intelligence-grid-v2",
        "imvo-intelligence-card-v2",
      );

      const boards = sections.find((section) =>
        normalize(section.textContent || "").includes("On the boards."),
      );
      markSectionGrid(
        boards,
        "imvo-boards-v2",
        "imvo-boards-grid-v2",
        "imvo-board-card-v2",
      );

      const archive = sections.find((section) =>
        normalize(section.textContent || "").includes("Selected project studies."),
      );
      markSectionGrid(
        archive,
        "imvo-project-archive-v2",
        "imvo-project-grid-v2",
        "imvo-project-card-v2",
      );

      const teamFrame = document.querySelector<HTMLElement>(".teamImageFrame");
      const teamSection = teamFrame?.closest<HTMLElement>("section") || undefined;
      if (teamSection) {
        add(teamSection, "imvo-team-v2");
        const shell = teamSection.querySelector<HTMLElement>(".containerWide");
        add(teamFrame, "imvo-team-frame-v2");
        const teamGrid = shell?.children.item(2) as HTMLElement | null;
        add(teamGrid, "imvo-team-grid-v2");
        Array.from(teamGrid?.children || []).forEach((child) =>
          add(child as HTMLElement, "imvo-team-card-v2"),
        );
      }

      document.querySelectorAll<HTMLElement>("a, button").forEach((element) => {
        if (element.closest("[data-imvo-testimonial-preview='true']")) return;
        // SiteHeader already has its final approved CTA geometry. Do not let
        // the generic editorial enhancer morph the header after hydration.
        if (element.closest("header")) return;
        if (element.closest(".imvo-project-archive-v2") && element.tagName === "BUTTON") {
          add(element, "imvo-filter-control-v2");
          return;
        }

        const aria = (element.getAttribute("aria-label") || "").toUpperCase();
        if (/MENU|PREVIOUS|NEXT|ZOOM|SLIDE|SOCIAL|NAVIGATION/.test(aria)) return;
        if (element.classList.contains("mobileMenuBtn")) return;

        const rawLabel = normalize(element.textContent || "");
        const cleanLabel = rawLabel.replace(/[↗↓]/g, "").trim();
        const upper = cleanLabel.toUpperCase();
        const isSubmit =
          element instanceof HTMLButtonElement && element.type === "submit";
        const isKnown = ctaLabels.some((label) => upper.includes(label));
        if (!isSubmit && !isKnown) return;

        add(element, "imvo-editorial-cta-v2");
        element.dataset.imvoCtaArrow = rawLabel.includes("↓") ? "down" : "out";

        if (element.childElementCount === 0 && cleanLabel && rawLabel !== cleanLabel) {
          element.textContent = cleanLabel;
        }
      });

      document
        .querySelectorAll<HTMLElement>(".portfolioSliderGrid, .portfolioSliderMedia")
        .forEach((element) => add(element, "imvo-portfolio-v2"));
    };

    const scheduleScan = () => {
      window.cancelAnimationFrame(scanFrame);
      scanFrame = window.requestAnimationFrame(scan);
    };

    scheduleScan();
    const delayed = window.setTimeout(scheduleScan, 650);
    const observer = new MutationObserver(scheduleScan);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      window.clearTimeout(delayed);
      window.cancelAnimationFrame(scanFrame);
      touched.forEach((element) => {
        element.classList.remove(
          "imvo-intelligence-v2",
          "imvo-intelligence-grid-v2",
          "imvo-intelligence-card-v2",
          "imvo-boards-v2",
          "imvo-boards-grid-v2",
          "imvo-board-card-v2",
          "imvo-project-archive-v2",
          "imvo-project-grid-v2",
          "imvo-project-card-v2",
          "imvo-team-v2",
          "imvo-team-frame-v2",
          "imvo-team-grid-v2",
          "imvo-team-card-v2",
          "imvo-filter-control-v2",
          "imvo-editorial-cta-v2",
          "imvo-portfolio-v2",
        );
      });
    };
  }, [pathname]);

  return null;
}

function PreviewStyles() {
  return (
    <style>{`
      /* Clean editorial CTA system: no jelly, no automatic treatment of selections. */
      .imvo-editorial-cta-v2 {
        min-width: 208px !important;
        min-height: 54px !important;
        padding: 0 20px !important;
        border: 1px solid rgba(255,255,255,0.95) !important;
        border-radius: 2px !important;
        background: #ffffff !important;
        color: #050505 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 18px !important;
        text-decoration: none !important;
        font-size: 12px !important;
        font-weight: 850 !important;
        letter-spacing: 0.075em !important;
        line-height: 1 !important;
        text-transform: uppercase !important;
        white-space: nowrap !important;
        box-shadow: none !important;
        transition: background 260ms ease, color 260ms ease, transform 260ms ease,
          border-color 260ms ease !important;
      }

      .imvo-editorial-cta-v2::after {
        content: "↗";
        margin-left: auto;
        font-size: 15px;
        line-height: 1;
        transform: translate(0, 0);
        transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
      }

      .imvo-editorial-cta-v2[data-imvo-cta-arrow="down"]::after { content: "↓"; }
      .imvo-editorial-cta-v2:hover {
        background: #0b0b0b !important;
        color: #ffffff !important;
        transform: translateY(-2px);
      }
      .imvo-editorial-cta-v2:hover::after { transform: translate(4px, -2px); }

      /* Testimonials: requested 4 desktop / 3 tablet / 2 mobile. */
      @keyframes imvo-testimonial-line-v2 {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .imvo-testimonial-masonry-v2 {
        width: 100%;
        padding: 112px 0;
        background: #0b0b0b;
        overflow: hidden;
        position: relative;
      }

      .imvo-testimonial-shell-v2 {
        width: min(1400px, calc(100% - 48px));
        margin: 0 auto;
      }

      .imvo-testimonial-header-v2 { text-align: center; }
      .imvo-testimonial-kicker-v2 {
        color: rgba(255,255,255,0.42);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      .imvo-testimonial-header-v2 h2 {
        max-width: 760px;
        margin: 18px auto 0;
        color: #fff;
        font-size: clamp(38px, 4.6vw, 64px);
        line-height: 1.02;
        letter-spacing: -0.055em;
        font-weight: 850;
      }
      .imvo-testimonial-header-v2 p {
        max-width: 720px;
        margin: 22px auto 0;
        color: rgba(255,255,255,0.56);
        font-size: 16px;
        line-height: 1.75;
      }

      .imvo-testimonial-columns-v2 {
        columns: 4;
        column-gap: 18px;
        margin-top: 64px;
      }
      .imvo-testimonial-item-v2 {
        break-inside: avoid;
        margin-bottom: 18px;
      }
      .imvo-testimonial-card-v2 {
        position: relative;
        display: flex;
        min-height: 218px;
        overflow: hidden;
        border-radius: 18px;
        isolation: isolate;
        transition: transform 280ms ease, border-radius 280ms ease;
      }
      .imvo-testimonial-card-v2:hover {
        transform: translateY(-2px);
        border-radius: 21px;
      }
      .imvo-testimonial-border-v2 {
        position: absolute;
        top: -55%;
        left: -55%;
        width: 210%;
        height: 210%;
        z-index: 0;
        opacity: 0;
        background: conic-gradient(
          transparent,
          transparent,
          transparent,
          rgba(255,255,255,0.92)
        );
        animation: imvo-testimonial-line-v2 4.8s linear infinite;
        transition: opacity 280ms ease;
      }
      .imvo-testimonial-card-v2:hover .imvo-testimonial-border-v2 { opacity: 1; }
      .imvo-testimonial-panel-v2 {
        position: absolute;
        inset: 1px;
        z-index: 1;
        border-radius: inherit;
        background: #171717;
        transition: background 280ms ease;
      }
      .imvo-testimonial-card-v2:hover .imvo-testimonial-panel-v2 { background: #1d1d1d; }
      .imvo-testimonial-content-v2 {
        position: relative;
        z-index: 2;
        width: 100%;
        min-height: 218px;
        padding: 26px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 28px;
      }
      .imvo-testimonial-author-v2 {
        color: rgba(255,255,255,0.42);
        font-size: 12px;
        font-weight: 750;
        letter-spacing: 0.03em;
      }
      .imvo-testimonial-content-v2 p {
        margin: 22px 0 0;
        color: rgba(255,255,255,0.82);
        font-size: 14px;
        line-height: 1.72;
        letter-spacing: -0.012em;
      }
      .imvo-testimonial-date-v2 {
        color: rgba(255,255,255,0.34);
        font-size: 10px;
        font-weight: 750;
        letter-spacing: 0.11em;
        text-transform: uppercase;
      }

      @media (max-width: 1279px) {
        .imvo-testimonial-columns-v2 { columns: 3; }
      }
      @media (max-width: 767px) {
        .imvo-testimonial-masonry-v2 { padding: 82px 0; }
        .imvo-testimonial-shell-v2 { width: min(100% - 24px, 1400px); }
        .imvo-testimonial-columns-v2 { columns: 2; column-gap: 10px; margin-top: 44px; }
        .imvo-testimonial-item-v2 { margin-bottom: 10px; }
        .imvo-testimonial-card-v2,
        .imvo-testimonial-content-v2 { min-height: 190px; }
        .imvo-testimonial-content-v2 { padding: 16px; gap: 18px; }
        .imvo-testimonial-content-v2 p { font-size: 12px; line-height: 1.58; margin-top: 15px; }
        .imvo-testimonial-author-v2 { font-size: 10px; }
        .imvo-testimonial-date-v2 { font-size: 8px; }
      }

      /* Project intelligence: one precise unified frame, numbered cells and restrained hover. */
      .imvo-intelligence-v2 { background: #070707 !important; }
      .imvo-intelligence-v2 > div:first-child {
        opacity: 0.56 !important;
        background: radial-gradient(circle at 78% 12%, rgba(255,255,255,0.06), transparent 30%) !important;
      }
      .imvo-intelligence-grid-v2 {
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        gap: 0 !important;
        margin-top: 66px !important;
        border: 1px solid rgba(255,255,255,0.13);
        border-radius: 18px;
        overflow: hidden;
        background: #0d0d0d;
      }
      .imvo-intelligence-card-v2 {
        min-height: 310px !important;
        padding: 34px !important;
        border: 0 !important;
        border-right: 1px solid rgba(255,255,255,0.1) !important;
        background: #111 !important;
        transform: none !important;
        transition: background 320ms ease !important;
      }
      .imvo-intelligence-card-v2:last-child { border-right: 0 !important; }
      .imvo-intelligence-card-v2::after {
        content: "";
        position: absolute;
        left: 0;
        right: 100%;
        bottom: 0;
        height: 2px;
        background: #fff;
        transition: right 420ms cubic-bezier(0.16, 1, 0.3, 1);
      }
      .imvo-intelligence-card-v2:hover { background: #181818 !important; }
      .imvo-intelligence-card-v2:hover::after { right: 0; }
      .imvo-intelligence-card-v2 h3 { font-size: clamp(23px, 2vw, 30px) !important; }

      /* Homepage selected portfolio and in-progress project cards. */
      .portfolioSliderGrid.imvo-portfolio-v2 {
        grid-template-columns: 0.52fr 1.48fr !important;
        gap: 48px !important;
        padding-top: 30px;
        padding-bottom: 30px;
        border-top: 1px solid rgba(255,255,255,0.11);
        border-bottom: 1px solid rgba(255,255,255,0.11);
      }
      .portfolioSliderMedia.imvo-portfolio-v2 {
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow: 0 32px 80px rgba(0,0,0,0.35);
      }
      .portfolioSliderMedia.imvo-portfolio-v2 img {
        transition: transform 900ms cubic-bezier(0.16,1,0.3,1), filter 600ms ease !important;
      }
      .portfolioSliderMedia.imvo-portfolio-v2:hover img {
        transform: scale(1.028) !important;
        filter: contrast(1.03) brightness(0.92);
      }

      .imvo-boards-grid-v2 {
        display: grid !important;
        grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr) !important;
        grid-template-rows: repeat(2, minmax(0, 1fr));
        gap: 22px !important;
        margin-top: 60px !important;
      }
      .imvo-board-card-v2 {
        margin: 0 !important;
        padding: 0 0 22px !important;
        border-bottom: 1px solid rgba(255,255,255,0.12);
        overflow: hidden;
      }
      .imvo-board-card-v2:first-child { grid-row: 1 / span 2; }
      .imvo-board-card-v2 > a > div:first-child {
        aspect-ratio: 16 / 11 !important;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.1);
      }
      .imvo-board-card-v2:first-child > a > div:first-child { aspect-ratio: 4 / 3 !important; }
      .imvo-board-card-v2 img {
        transition: transform 750ms cubic-bezier(0.16,1,0.3,1), filter 500ms ease !important;
      }
      .imvo-board-card-v2:hover img {
        transform: scale(1.03) !important;
        filter: grayscale(0%) contrast(1.02) brightness(0.92) !important;
      }
      .imvo-board-card-v2 h3 { font-size: clamp(22px, 2.3vw, 34px) !important; }

      /* Main project archive: editorial rhythm with occasional wide feature cards. */
      .imvo-project-grid-v2 {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 54px 24px !important;
        margin-top: 62px !important;
      }
      .imvo-project-card-v2 {
        position: relative;
        padding-bottom: 24px;
        border-bottom: 1px solid rgba(255,255,255,0.12);
      }
      .imvo-project-card-v2:nth-child(5n + 1) { grid-column: span 2; }
      .imvo-project-card-v2:nth-child(5n + 1) > a { aspect-ratio: 21 / 9 !important; }
      .imvo-project-card-v2 > a {
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.1);
        box-shadow: 0 24px 70px rgba(0,0,0,0.28);
      }
      .imvo-project-card-v2 img {
        transition: transform 850ms cubic-bezier(0.16,1,0.3,1), filter 500ms ease !important;
      }
      .imvo-project-card-v2:hover img {
        transform: scale(1.028) !important;
        filter: brightness(0.88) contrast(1.04);
      }
      .imvo-project-card-v2 h4 {
        font-size: clamp(23px, 2.2vw, 34px) !important;
        letter-spacing: -0.04em !important;
      }
      .imvo-project-card-v2 > div > a {
        border-bottom: 0 !important;
        padding: 0 !important;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        opacity: 0.62;
      }
      .imvo-project-card-v2 > div > a::after { content: "↗"; }
      .imvo-filter-control-v2 {
        min-height: 38px !important;
        padding: 0 15px !important;
        border-radius: 2px !important;
        font-size: 11px !important;
        font-weight: 800 !important;
        letter-spacing: 0.07em !important;
        text-transform: uppercase;
      }

      /* Team: calm editorial image, no looping drawing overlay, clearer people cards. */
      .imvo-team-v2 { background: #050505; }
      .imvo-team-frame-v2 {
        aspect-ratio: 16 / 7 !important;
        margin-top: 52px !important;
        border-radius: 10px;
        border-color: rgba(255,255,255,0.12) !important;
        box-shadow: 0 34px 90px rgba(0,0,0,0.32);
      }
      .imvo-team-frame-v2 .teamImage {
        object-fit: cover !important;
        object-position: center 28% !important;
        filter: grayscale(100%) contrast(1.04) brightness(0.78) !important;
        transition: filter 700ms ease, transform 900ms cubic-bezier(0.16,1,0.3,1) !important;
      }
      .imvo-team-frame-v2:hover .teamImage {
        filter: grayscale(35%) contrast(1.02) brightness(0.88) !important;
        transform: scale(1.018);
      }
      .imvo-team-frame-v2 svg { display: none !important; }
      .imvo-team-grid-v2 {
        display: grid !important;
        grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
        gap: 18px !important;
        margin-top: 26px !important;
      }
      .imvo-team-card-v2 {
        padding-bottom: 22px;
        border-bottom: 1px solid rgba(255,255,255,0.11);
      }
      .imvo-team-card-v2 > div:first-child {
        aspect-ratio: 4 / 5 !important;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.1);
      }
      .imvo-team-card-v2 img {
        filter: grayscale(100%) contrast(1.04) brightness(0.86);
        transition: filter 600ms ease, transform 750ms cubic-bezier(0.16,1,0.3,1);
      }
      .imvo-team-card-v2:hover img {
        filter: grayscale(0%) contrast(1) brightness(0.94);
        transform: scale(1.025);
      }

      @media (max-width: 1023px) {
        .imvo-intelligence-grid-v2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        .imvo-intelligence-card-v2:nth-child(2) { border-right: 0 !important; }
        .imvo-intelligence-card-v2:last-child {
          grid-column: span 2;
          border-top: 1px solid rgba(255,255,255,0.1) !important;
        }
        .portfolioSliderGrid.imvo-portfolio-v2 { grid-template-columns: 1fr !important; }
        .imvo-team-grid-v2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
      }

      @media (max-width: 767px) {
        .imvo-editorial-cta-v2 {
          min-width: min(100%, 216px) !important;
          min-height: 50px !important;
          padding: 0 16px !important;
          font-size: 10px !important;
        }
        .imvo-intelligence-grid-v2 { grid-template-columns: 1fr !important; }
        .imvo-intelligence-card-v2,
        .imvo-intelligence-card-v2:nth-child(2),
        .imvo-intelligence-card-v2:last-child {
          grid-column: auto;
          min-height: 250px !important;
          border-right: 0 !important;
          border-top: 1px solid rgba(255,255,255,0.1) !important;
        }
        .imvo-intelligence-card-v2:first-child { border-top: 0 !important; }
        .imvo-boards-grid-v2 {
          grid-template-columns: 1fr !important;
          grid-template-rows: auto !important;
        }
        .imvo-board-card-v2:first-child { grid-row: auto; }
        .imvo-project-grid-v2 { grid-template-columns: 1fr !important; gap: 38px !important; }
        .imvo-project-card-v2:nth-child(5n + 1) { grid-column: auto; }
        .imvo-project-card-v2:nth-child(5n + 1) > a { aspect-ratio: 16 / 10 !important; }
        .imvo-team-frame-v2 { aspect-ratio: 4 / 3 !important; }
        .imvo-team-grid-v2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 10px !important; }
        .imvo-team-card-v2 h3 { font-size: 14px !important; }
        .imvo-team-card-v2 p { font-size: 11px !important; }
      }

      @media (prefers-reduced-motion: reduce) {
        .imvo-testimonial-border-v2 { animation: none; }
        .imvo-editorial-cta-v2,
        .imvo-project-card-v2 img,
        .imvo-board-card-v2 img,
        .imvo-team-card-v2 img,
        .imvo-team-frame-v2 .teamImage { transition: none !important; }
      }
    `}</style>
  );
}

export default function IMVOPreviewExperience() {
  return (
    <>
      <PreviewStyles />
      <EditorialUIEnhancer />
      <TestimonialEnhancer />
    </>
  );
}
