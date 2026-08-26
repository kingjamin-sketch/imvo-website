import type { Metadata } from "next";
import Image from "next/image";
import ContactPageClient from "./ContactPageClient";
import { getContactPageContent } from "@/sanity/lib/siteContent";
import { getSeoEntry } from "@/sanity/lib/cmsBackend";
import { mergeCmsMetadata } from "@/app/lib/cmsMetadata";
import type { ContactPageContent } from "@/sanity/types/siteContent";

export const revalidate = 300;

const fallbackMetadata: Metadata = {
  title: "Contact",
  description:
    "Contact IMVO Group in Kigali to discuss built-environment design, feasibility, development consultancy, site coordination, or project direction.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: "Contact IMVO Group",
    description:
      "Start a conversation with IMVO Group about your project, site, development, or built-environment needs.",
    images: [{ url: "/contact-hero.webp", alt: "Contact IMVO Group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact IMVO Group",
    description:
      "Start a conversation with IMVO Group about your project, site, development, or built-environment needs.",
    images: ["/contact-hero.webp"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoEntry("/contact");
  return mergeCmsMetadata(fallbackMetadata, seo, "/contact");
}

export default async function ContactPage() {
  const content = await getContactPageContent();
  // Keep the LCP hero in the initial server-rendered HTML before client hydration.
  const heroUrl = content?.heroImage?.url || "/contact-hero.webp";
  const heroAlt = content?.heroImage?.alt || "Contact IMVO";
  const resolvedContent = {
    ...(content || {}),
    heroImage: { url: heroUrl, alt: heroAlt },
  } as ContactPageContent;

  return (
    <div className="contactPageShell">
      <div className="contactFirstPaint" aria-hidden="true">
        <section
          className="mobileStack"
          style={{
            minHeight: "calc(100vh - 88px)",
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            background: "#050505",
            color: "white",
          }}
        >
          <div
            style={{
              padding:
                "90px max(32px, calc((100vw - 1440px) / 2 + 32px)) 70px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              zIndex: 10,
            }}
          >
            <div
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontSize: 12,
                opacity: 0.6,
                fontWeight: 800,
              }}
            >
              {content?.heroKicker || "Contact"}
            </div>

            <h1
              style={{
                margin: "18px 0 0",
                fontSize: "clamp(54px, 7vw, 118px)",
                lineHeight: 0.88,
                letterSpacing: "-0.08em",
                fontWeight: 900,
              }}
            >
              <span style={{ whiteSpace: "pre-line" }}>
                {content?.heroHeading || "Start with\nthe right\nconversation."}
              </span>
            </h1>

            <p
              style={{
                marginTop: 40,
                maxWidth: 520,
                fontSize: 18,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {content?.heroIntro ||
                "Tell us about your project, site, ambition, timeline, and current stage. We will help define whether you need design, consultancy, site coordination, planning support, or development guidance."}
            </p>
          </div>

          <div
            style={{
              position: "relative",
              minHeight: "calc(100vh - 88px)",
              overflow: "hidden",
            }}
          >
            <Image
              src={heroUrl}
              alt=""
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 900px) 100vw, 55vw"
              style={{
                objectFit: "cover",
                filter: "grayscale(100%) brightness(0.8)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, #050505, transparent 40%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </section>
      </div>

      <ContactPageClient content={resolvedContent} />

      <style>{`
        .contactPageShell {
          position: relative;
          background: #050505;
          min-height: 100vh;
        }

        .contactFirstPaint {
          position: absolute;
          inset: 0 0 auto 0;
          z-index: 30;
          pointer-events: none;
          background: #050505;
        }

        .contactPageShell:has(#quote) > .contactFirstPaint {
          animation: contactFirstPaintRetire 260ms ease 1450ms forwards;
        }

        @keyframes contactFirstPaintRetire {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contactPageShell:has(#quote) > .contactFirstPaint {
            animation-duration: 1ms;
            animation-delay: 120ms;
          }
        }
      `}</style>
    </div>
  );
}
