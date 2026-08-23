"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";

import BackToTop from "./BackToTop";
import DomicileWidget from "./DomicileWidget";
import IMVOFinalRefinements from "./IMVOFinalRefinements";
import IMVOPreviewCorrections from "./IMVOPreviewCorrections";
import IMVOPreviewExperience from "./IMVOPreviewExperience";
import IMVOStudioMetrics from "./IMVOStudioMetrics";
import IMVOStudioPhotography from "./IMVOStudioPhotography";
import IntroLoader from "./IntroLoader";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import SmoothScrollProvider from "./SmoothScrollProvider";
import type { SiteSettings } from "@/sanity/types/siteContent";

export default function SiteShell({
  children,
  settings,
}: {
  children: ReactNode;
  settings?: SiteSettings | null;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/studio") || pathname.startsWith("/domicile")) {
    return children;
  }

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <a className="skipLink" href="#main-content">
          Skip to main content
        </a>
        <IntroLoader />
        <SiteHeader />
        <DomicileWidget />
        <IMVOPreviewExperience />
        <IMVOPreviewCorrections />
        <main id="main-content" tabIndex={-1}>
          {children}
          <IMVOStudioPhotography />
          <IMVOFinalRefinements />
          <IMVOStudioMetrics />
        </main>
        <SiteFooter settings={settings} />
        <BackToTop />
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
