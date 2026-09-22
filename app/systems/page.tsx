import type { Metadata } from "next";
import SystemsPageClient from "./SystemsPageClient";

export const metadata: Metadata = {
  title: "IMVO Systems | Digital Products & Business Systems",
  description:
    "IMVO Systems designs and builds digital products, software platforms, business systems, integrations, and automation.",
  alternates: { canonical: "/systems" },
};

export default function SystemsPage() {
  return <SystemsPageClient />;
}
