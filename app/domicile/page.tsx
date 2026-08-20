import type { Metadata } from "next";
import DomicilePageClient from "./DomicilePageClient";

export const metadata: Metadata = {
  title: "DŌMICILE | Property Management",
  description:
    "DŌMICILE is property management by IMVO Group for owners who want one reliable point of contact for the ongoing care, maintenance and coordination of their property in Kigali, Rwanda.",
  category: "Property Management",
  keywords: [
    "property management Kigali",
    "property management Rwanda",
    "property care Kigali",
    "property maintenance Kigali",
    "property inspection Kigali",
    "diaspora property management Rwanda",
    "DŌMICILE",
    "Domicile by IMVO Group",
  ],
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
    images: [
      {
        url: "/casa-vento-2.png",
        alt: "DŌMICILE property management by IMVO Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DŌMICILE | Your property, handled.",
    description:
      "Property management by IMVO Group for property owners in Kigali, Rwanda.",
    images: ["/casa-vento-2.png"],
  },
};

export default function DomicilePage() {
  return <DomicilePageClient />;
}
