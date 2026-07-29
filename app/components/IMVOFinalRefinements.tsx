"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function normalize(value: string | null | undefined) {
  return (value || "").replace(/\s+/g, " ").trim().toLowerCase();
}

export default function IMVOFinalRefinements() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/services") return;

    const refine = () => {
      const heading = [...document.querySelectorAll<HTMLHeadingElement>("h1,h2,h3")].find((element) =>
        normalize(element.textContent).includes("architecture should do more than occupy land"),
      );
      const section = heading?.closest<HTMLElement>("section");
      const container = section?.querySelector<HTMLElement>(".containerWide");
      const photo = container?.querySelector<HTMLElement>('[data-imvo-photo="services-consultancy"]');
      if (!heading || !container || !photo) return false;

      const copy = [...container.children].find((child) => child !== photo) as HTMLElement | undefined;
      if (!copy) return false;

      container.classList.add("imvo-final-philosophy-layout");
      container.style.display = "grid";
      container.style.gridTemplateColumns = "minmax(0, .98fr) minmax(420px, .72fr)";
      container.style.gap = "clamp(48px, 7vw, 120px)";
      container.style.alignItems = "start";
      container.style.textAlign = "left";

      copy.style.order = "1";
      copy.style.justifySelf = "start";
      copy.style.alignItems = "flex-start";
      copy.style.width = "100%";
      copy.style.maxWidth = "720px";

      heading.style.maxWidth = "650px";
      heading.style.marginLeft = "0";
      heading.style.marginRight = "0";
      heading.style.textAlign = "left";
      heading.style.lineHeight = "1.01";
      heading.style.letterSpacing = "-0.052em";

      const paragraphs = [...copy.querySelectorAll<HTMLParagraphElement>("p")];
      paragraphs.forEach((paragraph, index) => {
        paragraph.style.maxWidth = "700px";
        paragraph.style.marginLeft = "0";
        paragraph.style.marginRight = "0";
        paragraph.style.textAlign = "left";
        paragraph.style.lineHeight = "1.76";
        paragraph.style.fontSize = "clamp(16px, 1.15vw, 18px)";
        paragraph.style.color = index === 0 ? "rgba(255,255,255,.82)" : "rgba(255,255,255,.64)";
      });

      const paragraphGroup = paragraphs[0]?.parentElement as HTMLElement | null;
      if (paragraphGroup) {
        paragraphGroup.style.alignItems = "flex-start";
        paragraphGroup.style.width = "100%";
        paragraphGroup.style.gap = "22px";
        paragraphGroup.style.marginTop = "34px";
      }

      photo.style.order = "2";
      photo.style.justifySelf = "end";
      photo.style.alignSelf = "start";
      photo.style.width = "min(100%, 560px)";
      photo.style.maxWidth = "560px";
      photo.style.marginLeft = "auto";
      photo.style.marginRight = "0";

      return true;
    };

    refine();
    const observer = new MutationObserver(refine);
    observer.observe(document.body, { childList: true, subtree: true });
    const interval = window.setInterval(refine, 400);
    const timeout = window.setTimeout(() => {
      observer.disconnect();
      window.clearInterval(interval);
    }, 12000);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <style jsx global>{`
      @media (max-width: 900px) {
        .imvo-final-philosophy-layout {
          grid-template-columns: 1fr !important;
          gap: 36px !important;
        }

        .imvo-final-philosophy-layout > [data-imvo-photo="services-consultancy"] {
          order: 2 !important;
          justify-self: start !important;
          width: min(100%, 620px) !important;
          max-width: 620px !important;
          margin-left: 0 !important;
        }
      }

      @media (max-width: 620px) {
        .imvo-final-philosophy-layout {
          gap: 30px !important;
        }

        .imvo-final-philosophy-layout > [data-imvo-photo="services-consultancy"] {
          aspect-ratio: 4 / 5 !important;
          width: 100% !important;
        }
      }
    `}</style>
  );
}
