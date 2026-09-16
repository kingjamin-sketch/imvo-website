import type { Metadata } from "next";
import Link from "next/link";
import TrustedLogoMarquee from "../components/TrustedLogoMarquee";

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
      "https://images.pexels.com/photos/19805877/pexels-photo-19805877.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    label: "02 / ENGINEERING",
    title: "Software systems",
    body: "Web, mobile, and custom systems built for dependable use.",
    image:
      "https://images.pexels.com/photos/19805876/pexels-photo-19805876.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    label: "03 / SYSTEMS",
    title: "Business operations",
    body: "Tools and integrations that connect how a business works.",
    image:
      "https://images.pexels.com/photos/1181279/pexels-photo-1181279.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    label: "04 / INTELLIGENCE",
    title: "Applied AI",
    body: "Automation and intelligence used where they create value.",
    image:
      "https://images.pexels.com/photos/7498603/pexels-photo-7498603.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const process = [
  ["01", "Understand"],
  ["02", "Design"],
  ["03", "Engineer"],
  ["04", "Evolve"],
] as const;

const selectedBrands = Array.from({ length: 9 }, (_, index) => ({
  name: `Selected brand ${index + 1}`,
  src: `/partners/partner-${index + 1}.png`,
}));

const qonicCapabilities = [
  "Custom enterprise platforms",
  "Modern web applications",
  "Mobile applications",
  "Tailored software solutions",
  "Scalable product delivery",
  "Cross-market technology delivery",
];

export default function AppliedPage() {
  return (
    <div className="appliedPage">
      <section className="appliedStage" aria-labelledby="applied-title">
        <div className="appliedDevice">
          <div className="appliedHeroPanel">
            <img
              src="https://images.pexels.com/photos/19805877/pexels-photo-19805877.jpeg?auto=compress&cs=tinysrgb&w=2000"
              alt="Software engineer working across multiple screens"
            />
            <div className="appliedHeroShade" />
            <img
              className="appliedHeroLogo"
              src="/brand/imvo-applied.svg"
              alt="IMVO Applied"
              draggable={false}
            />
            <div className="appliedHeroCopy">
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

            <section className="appliedPartner" aria-labelledby="qonics-title">
              <div className="appliedPartnerIntro">
                <span>ENGINEERING DELIVERY PARTNER</span>
                <div className="appliedPartnerName">QONICS</div>
                <h2 id="qonics-title">Additional engineering depth, inside the Applied delivery network.</h2>
                <p>
                  Qonics is a global software development company with operations in Kigali and Austin.
                  The team works across custom enterprise platforms and modern web and mobile applications,
                  extending the engineering capacity available around selected IMVO Applied engagements.
                </p>
                <a href="https://qonics.com/" target="_blank" rel="noopener noreferrer">
                  Visit Qonics ↗
                </a>
              </div>

              <div className="appliedPartnerStats" aria-label="Qonics company profile">
                <div><b>2019</b><span>Founded</span></div>
                <div><b>20+</b><span>Projects delivered</span></div>
                <div><b>30+</b><span>Clients</span></div>
                <div><b>5+</b><span>Countries served</span></div>
              </div>

              <div className="appliedPartnerCapabilities">
                <span>DELIVERY CAPABILITY</span>
                <div className="appliedPartnerCapabilityGrid">
                  {qonicCapabilities.map((item, index) => (
                    <div key={item}>
                      <small>{String(index + 1).padStart(2, "0")}</small>
                      <strong>{item}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="appliedPartnerPresence">
                <div>
                  <span>KIGALI / RWANDA</span>
                  <p>African operations centre</p>
                </div>
                <div>
                  <span>AUSTIN / USA</span>
                  <p>Global headquarters</p>
                </div>
              </div>
            </section>
          </div>

          <TrustedLogoMarquee
            logos={selectedBrands}
            heading="Selected brands we’ve worked with"
          />

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

            <div id="contact">
              <span>START</span>
              <h3>Have something to build?</h3>
              <Link href="/contact?practice=applied">Talk to IMVO Applied ↗</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
