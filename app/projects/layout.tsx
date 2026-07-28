import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Selected Built Environment Projects",
  description:
    "Explore selected IMVO Group residential, commercial, institutional, hospitality, and urban design work across Rwanda and East Africa.",
  alternates: { canonical: "/projects" },
  openGraph: {
    url: "/projects",
    title: "Selected Projects | IMVO Group",
    description:
      "Built environments developed through context, proportion, technical coordination, and execution-aware thinking.",
    images: ["/chosen/verdea-hotel.png"],
  },
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <style>{`
        /* Desktop rows use one shared direction, preventing text blocks from facing each other. */
        @media (min-width: 1181px) {
          .projects-index-card:nth-child(4n + 1),
          .projects-index-card:nth-child(4n + 2) {
            grid-template-columns: minmax(0, 1.04fr) minmax(0, 0.96fr) !important;
          }

          .projects-index-card:nth-child(4n + 1) .projects-index-media,
          .projects-index-card:nth-child(4n + 2) .projects-index-media {
            order: 1 !important;
          }

          .projects-index-card:nth-child(4n + 1) .projects-index-info,
          .projects-index-card:nth-child(4n + 2) .projects-index-info {
            order: 2 !important;
          }

          .projects-index-card:nth-child(4n + 3),
          .projects-index-card:nth-child(4n + 4) {
            grid-template-columns: minmax(0, 0.96fr) minmax(0, 1.04fr) !important;
          }

          .projects-index-card:nth-child(4n + 3) .projects-index-info,
          .projects-index-card:nth-child(4n + 4) .projects-index-info {
            order: 1 !important;
          }

          .projects-index-card:nth-child(4n + 3) .projects-index-media,
          .projects-index-card:nth-child(4n + 4) .projects-index-media {
            order: 2 !important;
          }
        }

        /* Tablet keeps a clean alternating editorial rhythm. */
        @media (min-width: 701px) and (max-width: 1180px) {
          .projects-index-card:nth-child(odd) .projects-index-media {
            order: 1 !important;
          }

          .projects-index-card:nth-child(odd) .projects-index-info {
            order: 2 !important;
          }

          .projects-index-card:nth-child(even) .projects-index-info {
            order: 1 !important;
          }

          .projects-index-card:nth-child(even) .projects-index-media {
            order: 2 !important;
          }
        }
      `}</style>
    </>
  );
}
