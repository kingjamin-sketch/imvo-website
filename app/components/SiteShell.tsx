"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";

import BackToTop from "./BackToTop";
import DomicileWidget from "./DomicileWidget";
import IMVOFinalRefinements from "./IMVOFinalRefinements";
import IMVOPreviewCorrections from "./IMVOPreviewCorrections";
import IMVOPreviewExperience from "./IMVOPreviewExperience";
import IntroLoader from "./IntroLoader";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import SmoothScrollProvider from "./SmoothScrollProvider";
import type { SiteSettings } from "@/sanity/types/siteContent";

const IMVOStudioPhotography = dynamic(() => import("./IMVOStudioPhotography"), {
  ssr: false,
});
const IMVOStudioMetrics = dynamic(() => import("./IMVOStudioMetrics"), {
  ssr: false,
});

const photographyRoutes = new Set(["/", "/about", "/services", "/contact"]);

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
          {photographyRoutes.has(pathname) ? <IMVOStudioPhotography /> : null}
          <IMVOFinalRefinements />
          {pathname === "/" ? <IMVOStudioMetrics /> : null}
        </main>
        <SiteFooter settings={settings} />
        <BackToTop />
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
