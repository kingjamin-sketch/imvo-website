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
        /* One project per row: image / information, then information / image. */
        .projects-index-grid {
          grid-template-columns: minmax(0, 1fr) !important;
          gap: 1px !important;
        }

        .projects-index-card {
          grid-template-columns: minmax(0, 1.32fr) minmax(340px, 0.68fr) !important;
          min-height: clamp(430px, 36vw, 570px) !important;
        }

        .projects-index-card--reverse {
          grid-template-columns: minmax(340px, 0.68fr) minmax(0, 1.32fr) !important;
        }

        .projects-index-card--reverse .projects-index-info {
          order: 1;
        }

        .projects-index-card--reverse .projects-index-media {
          order: 2;
        }

        .projects-index-media {
          min-height: 100% !important;
        }

        .projects-index-info {
          padding: clamp(34px, 4vw, 58px) !important;
        }

        .projects-index-number {
          font-size: clamp(62px, 6vw, 100px) !important;
        }

        .projects-index-title {
          max-width: 520px;
          font-size: clamp(28px, 3vw, 46px) !important;
        }

        .projects-index-summary {
          max-width: 540px;
          font-size: 15px !important;
          line-height: 1.72 !important;
          -webkit-line-clamp: 4 !important;
        }

        @media (max-width: 1180px) {
          .projects-index-card {
            grid-template-columns: minmax(0, 1.12fr) minmax(300px, 0.88fr) !important;
            min-height: 430px !important;
          }

          .projects-index-card--reverse {
            grid-template-columns: minmax(300px, 0.88fr) minmax(0, 1.12fr) !important;
          }
        }

        @media (max-width: 700px) {
          .projects-index-card,
          .projects-index-card--reverse {
            grid-template-columns: minmax(0, 1fr) !important;
            min-height: 0 !important;
          }

          .projects-index-card--reverse .projects-index-media {
            order: 0;
          }

          .projects-index-card--reverse .projects-index-info {
            order: 1;
          }

          .projects-index-media {
            min-height: 0 !important;
            aspect-ratio: 16 / 10;
          }

          .projects-index-info {
            padding: 24px 20px 26px !important;
          }
        }
      `}</style>
    </>
  );
}
