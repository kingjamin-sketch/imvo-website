import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IMVO Applied | Technology & Product Engineering",
  description:
    "IMVO Applied is the technology and product-engineering practice of IMVO Group, building digital products, software systems, operational platforms, and applied intelligence.",
  keywords: [
    "IMVO Applied",
    "technology company Kigali",
    "software development Rwanda",
    "product engineering Rwanda",
    "custom software Rwanda",
    "mobile app development Rwanda",
    "business systems Rwanda",
    "AI automation Rwanda",
    "digital product development East Africa",
  ],
  category: "Technology & Product Engineering",
  alternates: { canonical: "/applied" },
  openGraph: {
    title: "IMVO Applied | Technology & Product Engineering",
    description:
      "Digital products, software systems, operational platforms, and applied intelligence by IMVO Group.",
    url: "/applied",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "IMVO Applied | Technology & Product Engineering",
    description:
      "Digital products, software systems, operational platforms, and applied intelligence by IMVO Group.",
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

const workCards = [
  {
    label: "01 / PRODUCT",
    title: "Digital products",
    body: "Useful customer experiences shaped around real needs.",
    image:
      "https://images.pexels.com/photos/19805877/pexels-photo-19805877.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    label: "02 / ENGINEERING",
    title: "Software systems",
    body: "Web, mobile, and custom systems built for dependable use.",
    image:
      "https://images.pexels.com/photos/19805876/pexels-photo-19805876.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    label: "03 / SYSTEMS",
    title: "Business operations",
    body: "Tools and integrations that connect how a business works.",
    image:
      "https://images.pexels.com/photos/1181279/pexels-photo-1181279.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    label: "04 / INTELLIGENCE",
    title: "Applied AI",
    body: "Automation and intelligence used where they create value.",
    image:
      "https://images.pexels.com/photos/7498603/pexels-photo-7498603.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
];

const process = [
  ["01", "Understand"],
  ["02", "Design"],
  ["03", "Engineer"],
  ["04", "Evolve"],
] as const;

// Add approved public client names here when ready to publish.
const clients: string[] = [];

export default function AppliedPage() {
  return (
    <div className="appliedPage">
      <section className="appliedStage" aria-labelledby="applied-title">
        <div className="appliedDevice">
          <div className="appliedDeviceTopbar">
            <Link className="appliedMiniBrand" href="/applied">
              <span>IMVO</span>
              <b>Applied</b>
            </Link>
            <nav aria-label="Applied page navigation">
              <a href="#capabilities">Capabilities</a>
              <a href="#approach">Approach</a>
              <a href="#method">Method</a>
            </nav>
            <Link className="appliedMiniCta" href="/contact?practice=applied">
              Start a Project
            </Link>
          </div>

          <div className="appliedHeroPanel">
            <img
              src="https://images.pexels.com/photos/19805877/pexels-photo-19805877.jpeg?auto=compress&cs=tinysrgb&w=1800"
              alt="Software engineer working across multiple screens"
            />
            <div className="appliedHeroShade" />
            <div className="appliedHeroCopy">
              <div className="appliedEyebrow">IMVO / APPLIED</div>
              <h1 id="applied-title">Intelligence,<br />applied.</h1>
              <p>Technology &amp; Product Engineering</p>
              <Link href="/contact?practice=applied">
                Start a conversation <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="appliedContentCard">
            <div className="appliedOverviewGrid">
              <div className="appliedCapabilityList" id="capabilities">
                <span>CAPABILITIES</span>
                {capabilities.slice(0, 6).map((capability) => (
                  <div key={capability}>{capability}</div>
                ))}
              </div>

              <div className="appliedOverviewFeature">
                <span>WHAT WE DO</span>
                <h2>Technology built around the business.</h2>
                <p>
                  We design and engineer digital products, software systems,
                  and operational technology for businesses with real-world needs.
                </p>
                <a href="#work">Explore the practice</a>
              </div>

              <div className="appliedOverviewDark" id="approach">
                <span>OUR APPROACH</span>
                <h2>Business first. Technology where it matters.</h2>
                <p>
                  We begin with the operation, customer journey, and business
                  problem before defining the technology required to solve it.
                </p>
                <a href="#method">How we work</a>
              </div>
            </div>

            <div className="appliedWork" id="work">
              <div className="appliedWorkHead">
                <div>
                  <span>BUILT TOGETHER</span>
                  <h2>Products, systems, and intelligence.</h2>
                </div>
                <div className="appliedWorkMeta">KIGALI / RW · PRODUCT / SOFTWARE / SYSTEMS / AI</div>
              </div>

              <div className="appliedWorkCards">
                {workCards.map((card) => (
                  <article key={card.title}>
                    <div className="appliedWorkImage">
                      <img src={card.image} alt="" loading="lazy" />
                    </div>
                    <span>{card.label}</span>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="appliedDeviceFooter" id="method">
            <div>
              <span>METHOD</span>
              <h2>From problem to working system.</h2>
              <div className="appliedMethodDots" aria-label="Applied process">
                {process.map(([number, title]) => (
                  <div key={title}>
                    <b>{number}</b>
                    <small>{title}</small>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span>MORE CAPABILITIES</span>
              <ul>
                {capabilities.slice(6).map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
            </div>

            <div>
              <span>START</span>
              <h3>Have something to build?</h3>
              <Link href="/contact?practice=applied">Talk to IMVO Applied ↗</Link>
            </div>
          </div>
        </div>
      </section>

      {clients.length > 0 ? (
        <section className="appliedClients" aria-labelledby="applied-clients">
          <div className="containerWide">
            <span>SELECTED CLIENTS</span>
            <h2 id="applied-clients">Built for real businesses.</h2>
            <div>
              {clients.map((client) => <b key={client}>{client}</b>)}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
