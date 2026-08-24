"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";

import BackToTop from "./BackToTop";
import DomicileWidget from "./DomicileWidget";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import SmoothScrollProvider from "./SmoothScrollProvider";
import type { SiteSettings } from "@/sanity/types/siteContent";

const IntroLoader = dynamic(() => import("./IntroLoader"), { ssr: false });
const ContactEnhancements = dynamic(() => import("./ContactEnhancements"), {
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

  const needsPreviewExperience =
    previewExperienceRoutes.has(pathname) || pathname.startsWith("/projects");

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <a className="skipLink" href="#main-content">
          Skip to main content
        </a>
        {pathname === "/" ? <IntroLoader /> : null}
        <SiteHeader />
        <DomicileWidget />
        {pathname === "/contact" ? <ContactEnhancements /> : null}
        {needsPreviewExperience ? <IMVOPreviewExperience /> : null}
        {previewCorrectionRoutes.has(pathname) ? <IMVOPreviewCorrections /> : null}
        <main id="main-content" tabIndex={-1}>
          {children}
          {photographyRoutes.has(pathname) ? <IMVOStudioPhotography /> : null}
          {finalRefinementRoutes.has(pathname) ? <IMVOFinalRefinements /> : null}
          {pathname === "/" ? <IMVOStudioMetrics /> : null}
        </main>
        <SiteFooter settings={settings} />
        <BackToTop />
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
