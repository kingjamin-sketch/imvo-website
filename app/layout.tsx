import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import IntroLoader from "./components/IntroLoader";

export const metadata: Metadata = {
  title: "IMVO",
  description: "Architectural design, consultancy, and supervision.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#050505",
          color: "white",
        }}
      >
        <SmoothScrollProvider>
          <IntroLoader />

          <SiteHeader />

          <main>{children}</main>

          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
