"use client";

import { useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";

import BackToTop from "./BackToTop";
import DomicileWidget from "./DomicileWidget";
import IntroLoader from "./IntroLoader";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import SmoothScrollProvider from "./SmoothScrollProvider";
import type { SiteSettings } from "@/sanity/types/siteContent";

const ContactEnhancements = dynamic(() => import("./ContactEnhancements"), {
  ssr: false,
});
const HeroFlipEnhancement = dynamic(() => import("./HeroFlipEnhancement"), {
  ssr: false,
});
const IMVOPreviewExperience = dynamic(() => import("./IMVOPreviewExperience"), {
  ssr: false,
});
const IMVOPreviewCorrections = dynamic(() => import("./IMVOPreviewCorrections"), {
  ssr: false,
});
const IMVOStudioPhotography = dynamic(() => import("./IMVOStudioPhotography"), {
  ssr: false,
});
const IMVOStudioMetrics = dynamic(() => import("./IMVOStudioMetrics"), {
  ssr: false,
});
const IMVOFinalRefinements = dynamic(() => import("./IMVOFinalRefinements"), {
  ssr: false,
});

const photographyRoutes = new Set(["/", "/about", "/services"]);
const finalRefinementRoutes = new Set(["/", "/services"]);
const previewCorrectionRoutes = new Set(["/", "/about", "/services"]);
const previewExperienceRoutes = new Set(["/", "/about", "/services"]);

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export default function SiteShell({
  children,
  settings,
}: {
  children: ReactNode;
  settings?: SiteSettings | null;
}) {
  const pathname = usePathname();
  const [homeEnhancementsReady, setHomeEnhancementsReady] = useState(false);

  useEffect(() => {
    if (pathname !== "/" || homeEnhancementsReady) return;

    const idleWindow = window as IdleWindow;
    let idleHandle: number | undefined;
    let fallbackTimer = 0;
    let fallbackActivationTimer = 0;
    let scheduled = false;
    let active = true;

    const detachIntentListeners = () => {
      window.removeEventListener("scroll", scheduleEnhancements);
      window.removeEventListener("pointerdown", scheduleEnhancements);
      window.removeEventListener("keydown", scheduleEnhancements);
      window.removeEventListener("touchstart", scheduleEnhancements);
    };

    const activate = () => {
      if (!active) return;
      setHomeEnhancementsReady(true);
    };

    function scheduleEnhancements() {
      if (scheduled) return;
      scheduled = true;
      detachIntentListeners();
      window.clearTimeout(fallbackTimer);

      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(activate, { timeout: 1200 });
      } else {
        fallbackActivationTimer = window.setTimeout(activate, 180);
      }
    }

    window.addEventListener("scroll", scheduleEnhancements, { passive: true });
    window.addEventListener("pointerdown", scheduleEnhancements, { passive: true });
    window.addEventListener("keydown", scheduleEnhancements);
    window.addEventListener("touchstart", scheduleEnhancements, { passive: true });
    fallbackTimer = window.setTimeout(scheduleEnhancements, 6500);

    return () => {
      active = false;
      detachIntentListeners();
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(fallbackActivationTimer);
      if (idleHandle !== undefined) {
        idleWindow.cancelIdleCallback?.(idleHandle);
      }
    };
  }, [homeEnhancementsReady, pathname]);

  if (pathname.startsWith("/studio") || pathname.startsWith("/domicile")) {
    return children;
  }

  const needsPreviewExperience =
    previewExperienceRoutes.has(pathname) || pathname.startsWith("/projects");
  const canRunDeferredRouteEnhancement =
    pathname !== "/" || homeEnhancementsReady;
  const needsPreviewCorrections =
    previewCorrectionRoutes.has(pathname) && canRunDeferredRouteEnhancement;
  const needsPhotography =
    photographyRoutes.has(pathname) && canRunDeferredRouteEnhancement;
  const needsFinalRefinements =
    finalRefinementRoutes.has(pathname) && canRunDeferredRouteEnhancement;

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <a className="skipLink" href="#main-content">
          Skip to main content
        </a>
        {pathname === "/" ? <IntroLoader /> : null}
        {pathname === "/" ? <HeroFlipEnhancement /> : null}
        <SiteHeader deferUntilIntroComplete={pathname === "/"} />
        <DomicileWidget />
        {pathname === "/contact" ? <ContactEnhancements /> : null}
        {needsPreviewExperience ? <IMVOPreviewExperience /> : null}
        {needsPreviewCorrections ? <IMVOPreviewCorrections /> : null}
        <main id="main-content" tabIndex={-1}>
          {children}
          {needsPhotography ? <IMVOStudioPhotography /> : null}
          {needsFinalRefinements ? <IMVOFinalRefinements /> : null}
          {pathname === "/" && homeEnhancementsReady ? <IMVOStudioMetrics /> : null}
        </main>
        <SiteFooter settings={settings} />
        <BackToTop />
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
