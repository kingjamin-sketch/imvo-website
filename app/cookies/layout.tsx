import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Cookie Policy",
  alternates: { canonical: "/cookies" },
  robots: { index: false, follow: true },
};

export default function CookiesLayout({ children }: { children: ReactNode }) {
  return children;
}
