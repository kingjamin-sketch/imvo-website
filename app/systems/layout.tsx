import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./systems.css";

const systemsSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--systems-serif",
  display: "swap",
});

const systemsSans = Manrope({
  subsets: ["latin"],
  variable: "--systems-sans",
  display: "swap",
});

export default function SystemsLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${systemsSerif.variable} ${systemsSans.variable}`}>
      {children}
    </div>
  );
}
