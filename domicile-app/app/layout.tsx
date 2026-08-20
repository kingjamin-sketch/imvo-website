import type { Metadata } from "next";
import "./globals.css";
import "./workflows.css";
import "./brand.css";

export const metadata: Metadata = {
  title: "DŌMICILE — Property Management by IMVO Group",
  description: "DŌMICILE property management workspace for owners and the IMVO team.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
