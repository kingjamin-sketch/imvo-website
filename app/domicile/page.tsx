import type { Metadata } from "next";
import DomicilePageClient from "./DomicilePageClient";

export const metadata: Metadata = {
  title: "DŌMICILE | Property Management by IMVO Group",
  description:
    "DŌMICILE is property management by IMVO Group for owners who want one reliable point of contact for the ongoing care, maintenance and coordination of their property in Kigali, Rwanda.",
  alternates: {
    canonical: "https://www.imvogroup.com/domicile",
  },
  openGraph: {
    type: "website",
    url: "https://www.imvogroup.com/domicile",
    title: "DŌMICILE | Your property, handled.",
    description:
      "Property management by IMVO Group. One reliable point of contact for the ongoing care, maintenance and coordination of your property.",
    siteName: "IMVO Group",
    locale: "en_RW",
  },
  twitter: {
    card: "summary_large_image",
    title: "DŌMICILE | Your property, handled.",
    description:
      "Property management by IMVO Group for property owners in Kigali, Rwanda.",
  },
};

export default function DomicilePage() {
  return <DomicilePageClient />;
}
