"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

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
    <SmoothScrollProvider>
      <IntroLoader />
      <SiteHeader />
      <DomicileWidget />
      <IMVOPreviewExperience />
      <IMVOPreviewCorrections />
      <main>
        {children}
        <IMVOStudioPhotography />
        <IMVOFinalRefinements />
        <IMVOStudioMetrics />
      </main>
      <SiteFooter settings={settings} />
    </SmoothScrollProvider>
  );
}
