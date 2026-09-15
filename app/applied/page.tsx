import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IMVO Applied | Technology & Product Engineering",
  description:
    "IMVO Applied is the technology and product-engineering practice of IMVO Group, building digital products, software systems, operational platforms, and applied intelligence.",
  alternates: {
    canonical: "/applied",
  },
  openGraph: {
    title: "IMVO Applied | Technology & Product Engineering",
    description:
      "Digital products, software systems, operational platforms, and applied intelligence by IMVO Group.",
    url: "/applied",
    type: "website",
  },
};

const capabilities = [
  "Web Platforms",
  "Mobile Applications",
  "Custom Software",
  "Business Systems",
  "E-commerce",
  "Hospitality Technology",
  "Property Technology",
  "AI & Automation",
  "Integrations",
  "Product Design",
];

const pillars = [
  {
    number: "01",
    title: "Product",
    body: "Digital products, platforms, and customer experiences designed around real business needs.",
  },
  {
    number: "02",
    title: "Engineering",
    body: "Web, mobile, and custom software engineered for dependable day-to-day use.",
  },
  {
    number: "03",
    title: "Systems",
    body: "Operational tools, integrations, and internal platforms that connect how a business works.",
  },
  {
    number: "04",
    title: "Intelligence",
    body: "Automation, data, and applied AI used where they create practical value.",
  },
];

const process = [
  ["01", "Understand", "Business before software."],
  ["02", "Design", "Define the product, system, and experience."],
  ["03", "Engineer", "Build for actual use and growth."],
  ["04", "Evolve", "Support, measure, and improve."],
] as const;

export default function AppliedPage() {
  return (
    <div className="appliedPage">
      <section className="appliedHero" aria-labelledby="applied-title">
        <div className="containerWide appliedHeroInner">
          <div className="appliedEyebrow">IMVO / APPLIED</div>
          <h1 id="applied-title">Intelligence, applied.</h1>
          <p className="appliedDescriptor">Technology &amp; Product Engineering</p>
          <p className="appliedLead">
            We design and engineer digital products, software systems, and
            operational technology for businesses with real-world needs.
          </p>
          <Link className="appliedPrimaryCta" href="/contact?practice=applied">
            Start a conversation <span aria-hidden="true">→</span>
          </Link>
          <div className="appliedHeroMeta" aria-hidden="true">
            <span>KIGALI / RW</span>
            <span>PRODUCT / SOFTWARE / SYSTEMS / AI</span>
          </div>
        </div>
      </section>

      <section className="appliedSection appliedPillars" aria-labelledby="applied-what-we-do">
        <div className="containerWide">
          <div className="appliedSectionHead">
            <p>WHAT WE DO</p>
            <h2 id="applied-what-we-do">Technology built around the business.</h2>
          </div>
          <div className="appliedPillarGrid">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="appliedPillarCard">
                <span>{pillar.number}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="appliedSection appliedStatement">
        <div className="containerWide appliedStatementGrid">
          <p className="appliedSectionLabel">OUR APPROACH</p>
          <div>
            <h2>Business first. Technology where it matters.</h2>
            <p>
              We begin with the operation, customer journey, and business
              problem before defining the technology required to solve it.
            </p>
          </div>
        </div>
      </section>

      <section className="appliedSection" aria-labelledby="applied-capabilities">
        <div className="containerWide">
          <div className="appliedSectionHead compact">
            <p>CAPABILITIES</p>
            <h2 id="applied-capabilities">What we can build.</h2>
          </div>
          <div className="appliedCapabilityGrid">
            {capabilities.map((capability) => (
              <div key={capability}>{capability}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="appliedSection appliedProcess" aria-labelledby="applied-process">
        <div className="containerWide">
          <div className="appliedSectionHead compact">
            <p>METHOD</p>
            <h2 id="applied-process">From problem to working system.</h2>
          </div>
          <div className="appliedProcessGrid">
            {process.map(([number, title, description]) => (
              <article key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="appliedSection appliedClients" aria-labelledby="applied-clients">
        <div className="containerWide appliedClientsInner">
          <p className="appliedSectionLabel">SELECTED CLIENTS</p>
          <div>
            <h2 id="applied-clients">Built for real businesses.</h2>
            <p>
              Selected client names will appear here as the public Applied
              portfolio is approved for display.
            </p>
          </div>
        </div>
      </section>

      <section className="appliedClosing">
        <div className="containerWide appliedClosingInner">
          <p>HAVE SOMETHING TO BUILD?</p>
          <h2>Let&apos;s make it work.</h2>
          <Link href="/contact?practice=applied">
            Talk to IMVO Applied <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
