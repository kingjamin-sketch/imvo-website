import type { Metadata } from "next";
import Link from "next/link";
import { getCareers, getSeoEntry } from "@/sanity/lib/cmsBackend";
import { mergeCmsMetadata } from "@/app/lib/cmsMetadata";

export const revalidate = 300;

const fallbackMetadata: Metadata = {
  title: "Careers",
  description:
    "Explore current opportunities to work with IMVO Group across built-environment design, project coordination, strategy, and related disciplines.",
  alternates: { canonical: "/careers" },
  openGraph: {
    type: "website",
    url: "/careers",
    title: "Careers at IMVO Group",
    description: "Current opportunities to join or collaborate with IMVO Group in Kigali, Rwanda.",
    images: [{ url: "/about-hero.png", alt: "IMVO Group careers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at IMVO Group",
    description: "Current opportunities to join or collaborate with IMVO Group in Kigali, Rwanda.",
    images: ["/about-hero.png"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoEntry("/careers");
  return mergeCmsMetadata(fallbackMetadata, seo, "/careers");
}

export default async function CareersPage() {
  const careers = await getCareers();

  return (
    <main style={{ background: "#f4f4f1", color: "#111", minHeight: "100vh" }}>
      <section
        style={{
          minHeight: "52vh",
          display: "grid",
          alignContent: "end",
          padding: "clamp(120px, 16vw, 220px) clamp(22px, 5vw, 78px) clamp(54px, 8vw, 110px)",
          background: "#080808",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: 1120 }}>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: ".14em", opacity: 0.52, textTransform: "uppercase" }}>
            IMVO Group · Careers
          </p>
          <h1 style={{ margin: "20px 0 0", maxWidth: 980, fontSize: "clamp(58px, 9vw, 142px)", lineHeight: 0.86, letterSpacing: "-.07em" }}>
            Build thoughtful work with us.
          </h1>
          <p style={{ margin: "34px 0 0", maxWidth: 700, color: "rgba(255,255,255,.6)", fontSize: "clamp(16px, 1.8vw, 21px)", lineHeight: 1.55 }}>
            Current roles, internships, graduate opportunities and selected collaboration openings are published here when available.
          </p>
        </div>
      </section>

      <section style={{ padding: "clamp(54px, 8vw, 110px) clamp(22px, 5vw, 78px) clamp(90px, 11vw, 150px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "end", paddingBottom: 24, borderBottom: "1px solid rgba(0,0,0,.16)" }}>
            <div>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", opacity: 0.5 }}>Open opportunities</span>
              <h2 style={{ margin: "10px 0 0", fontSize: "clamp(32px, 4.5vw, 68px)", letterSpacing: "-.055em", lineHeight: 0.95 }}>
                {careers.length ? `${careers.length} current ${careers.length === 1 ? "opening" : "openings"}` : "No current openings"}
              </h2>
            </div>
            <Link href="/contact" style={{ color: "inherit", fontSize: 11, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>
              General enquiries ↗
            </Link>
          </div>

          {careers.length ? (
            <div>
              {careers.map((role, index) => {
                const applicationHref = role.applyUrl || (role.applyEmail ? `mailto:${role.applyEmail}` : "/contact");
                return (
                  <article
                    key={role._id || role.slug || `${role.title}-${index}`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0, .3fr) minmax(0, 1fr)",
                      gap: "clamp(26px, 5vw, 80px)",
                      padding: "clamp(34px, 5vw, 70px) 0",
                      borderBottom: "1px solid rgba(0,0,0,.14)",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", opacity: 0.46 }}>
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div style={{ marginTop: 20, display: "grid", gap: 7, fontSize: 12, lineHeight: 1.45, opacity: 0.65 }}>
                        {role.employmentType ? <span>{role.employmentType}</span> : null}
                        {role.location ? <span>{role.location}</span> : null}
                        {role.closingDate ? <span>Closes {role.closingDate}</span> : null}
                      </div>
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "clamp(34px, 5vw, 76px)", lineHeight: 0.96, letterSpacing: "-.055em" }}>{role.title}</h3>
                      {role.summary ? <p style={{ margin: "22px 0 0", maxWidth: 820, fontSize: 17, lineHeight: 1.6, opacity: 0.72 }}>{role.summary}</p> : null}
                      {role.description ? <p style={{ margin: "22px 0 0", maxWidth: 820, fontSize: 15, lineHeight: 1.7, opacity: 0.62, whiteSpace: "pre-line" }}>{role.description}</p> : null}

                      {role.responsibilities?.length ? (
                        <div style={{ marginTop: 30 }}>
                          <strong style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase" }}>Responsibilities</strong>
                          <ul style={{ margin: "12px 0 0", paddingLeft: 20, maxWidth: 820, lineHeight: 1.7, opacity: 0.68 }}>
                            {role.responsibilities.map((item) => <li key={item}>{item}</li>)}
                          </ul>
                        </div>
                      ) : null}

                      {role.requirements?.length ? (
                        <div style={{ marginTop: 26 }}>
                          <strong style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase" }}>What we are looking for</strong>
                          <ul style={{ margin: "12px 0 0", paddingLeft: 20, maxWidth: 820, lineHeight: 1.7, opacity: 0.68 }}>
                            {role.requirements.map((item) => <li key={item}>{item}</li>)}
                          </ul>
                        </div>
                      ) : null}

                      <a
                        href={applicationHref}
                        target={role.applyUrl ? "_blank" : undefined}
                        rel={role.applyUrl ? "noreferrer" : undefined}
                        style={{
                          display: "inline-flex",
                          marginTop: 34,
                          padding: "14px 18px",
                          border: "1px solid #111",
                          color: "#111",
                          textDecoration: "none",
                          fontSize: 11,
                          fontWeight: 800,
                          letterSpacing: ".08em",
                          textTransform: "uppercase",
                        }}
                      >
                        Apply / enquire ↗
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div style={{ padding: "clamp(60px, 10vw, 140px) 0", maxWidth: 760 }}>
              <p style={{ margin: 0, fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-.04em" }}>
                There are no published vacancies right now.
              </p>
              <p style={{ margin: "20px 0 0", maxWidth: 600, fontSize: 16, lineHeight: 1.65, opacity: 0.62 }}>
                When IMVO opens a role, internship or collaboration opportunity, it will appear here automatically from Studio.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
