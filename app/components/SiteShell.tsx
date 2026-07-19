"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import IntroLoader from "./IntroLoader";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import SmoothScrollProvider from "./SmoothScrollProvider";

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return children;
  }

  return (
    <SmoothScrollProvider>
      <IntroLoader />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </SmoothScrollProvider>
  );
}
