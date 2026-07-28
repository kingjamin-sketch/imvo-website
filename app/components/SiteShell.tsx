"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import IMVOPreviewExperience from "./IMVOPreviewExperience";
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

  if (pathname.startsWith("/studio")) {
    return children;
  }

  return (
    <SmoothScrollProvider>
      <IntroLoader />
      <SiteHeader />
      <IMVOPreviewExperience />
      <main>{children}</main>
      <SiteFooter settings={settings} />
    </SmoothScrollProvider>
  );
}
