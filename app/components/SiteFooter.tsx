import Link from "next/link";
import Brand from "./Brand";
import type { SiteSettings } from "@/sanity/types/siteContent";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/imvo-design-group",
    icon: "in",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/imvo_group/",
    icon: "ig",
  },
  {
    label: "X",
    href: "https://x.com/Imvogroupafrica",
    icon: "x",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/IMVO-GROUP-Africa/100087615605183/",
    icon: "fb",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Imvogroupafrica",
    icon: "yt",
  },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
];

export default function SiteFooter({ settings }: { settings?: SiteSettings | null }) {
  const activeSocials = settings?.socialLinks?.length
    ? settings.socialLinks
        .filter((item): item is { label: string; url: string } => Boolean(item.label && item.url))
        .map((item) => ({
          label: item.label,
          href: item.url,
          icon: socialIconFor(item.label),
        }))
    : socials;

  return (
    <footer
      style={{
        background: "#050505",
        color: "white",
        padding: "80px 0 40px",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        className="containerWide"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          flexDirection: "column",
          gap: 60,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 32,
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div>
            <Brand size="lg" variant="light" />
            <p
              style={{
                marginTop: 18,
                maxWidth: 420,
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.7,
                fontSize: 14,
              }}
            >
              {settings?.tagline || "A built-environment design and development consultancy"}
            </p>
            <p
              style={{
                marginTop: 8,
                maxWidth: 520,
                color: "rgba(255,255,255,0.62)",
                lineHeight: 1.65,
                fontSize: 12,
              }}
            >
              {settings?.legalNotice || "Regulated professional services and statutory sign-off are undertaken only by appropriately registered practitioners."}
            </p>
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {activeSocials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.82)",
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.04)",
                  transition: "all 0.25s ease",
                }}
              >
                <SocialIcon type={social.icon} />
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 32,
            fontSize: 12,
            color: "rgba(255,255,255,0.68)",
          }}
        >
          <div>
            <p style={{ margin: 0 }}>{settings?.copyright || "© 2026 IMVO Group. All rights reserved."}</p>
            <p style={{ margin: "8px 0 0" }}>{settings?.motto || "Intellectu · Mens · Visio · Origo"}</p>
          </div>

          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            {legalLinks.map((item, index) => (
              <span key={item.href} style={{ display: "inline-flex", gap: 18, alignItems: "center" }}>
                <Link
                  href={item.href}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    minHeight: 44,
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  {item.label}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span aria-hidden="true" style={{ opacity: 0.55 }}>|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function socialIconFor(label: string) {
  const normalized = label.toLowerCase();
  if (normalized.includes("linkedin")) return "in";
  if (normalized.includes("instagram")) return "ig";
  if (normalized === "x" || normalized.includes("twitter")) return "x";
  if (normalized.includes("facebook")) return "fb";
  return "yt";
}

function SocialIcon({ type }: { type: string }) {
  if (type === "in") return <span style={{ fontWeight: 900, fontSize: 15 }}>in</span>;
  if (type === "ig") return <span style={{ fontWeight: 900, fontSize: 14 }}>◎</span>;
  if (type === "x") return <span style={{ fontWeight: 900, fontSize: 15 }}>𝕏</span>;
  if (type === "fb") return <span style={{ fontWeight: 900, fontSize: 16 }}>f</span>;
  return <span style={{ fontWeight: 900, fontSize: 14 }}>▶</span>;
}
