import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children;
}
