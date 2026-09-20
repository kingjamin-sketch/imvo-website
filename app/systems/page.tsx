import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IMVO Systems | Digital Products, Software & Business Systems",
  description:
    "IMVO Systems designs and engineers digital products, software platforms, business systems, integrations, and intelligent automation for real-world operations.",
  keywords: [
    "IMVO Systems",
    "software development Rwanda",
    "business systems Kigali",
    "product engineering Rwanda",
    "mobile app development Rwanda",
    "web platform development Rwanda",
    "AI automation Rwanda",
    "digital product development East Africa",
  ],
  category: "Technology & Product Engineering",
  alternates: { canonical: "/systems" },
  openGraph: {
    title: "IMVO Systems | Digital Products, Software & Business Systems",
    description:
      "Products, platforms, business systems, integrations, and intelligent automation by IMVO Group.",
    url: "/systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IMVO Systems | Digital Products, Software & Business Systems",
    description:
      "Products, platforms, business systems, integrations, and intelligent automation by IMVO Group.",
  },
};

const systemCards = [
  {
    eyebrow: "PRODUCT / EXPERIENCE",
    title: "Digital Products",
    detail: "Web platforms, customer journeys, portals and product experiences.",
    image:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1400",
    className: "sysCardTall",
  },
  {
    eyebrow: "OPERATIONS / SOFTWARE",
    title: "Business Systems",
    detail: "Custom software that connects teams, workflows, data and daily operations.",
    image:
      "https://images.pexels.com/photos/1181279/pexels-photo-1181279.jpeg?auto=compress&cs=tinysrgb&w=1600",
    className: "sysCardWide",
  },
  {
    eyebrow: "INTELLIGENCE / SCALE",
    title: "AI & Automation",
    detail: "Practical automation and intelligence designed around measurable business value.",
    image:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1400",
    className: "sysCardCompact",
  },
];

const buildRows = [
  {
    eyebrow: "01 / CUSTOMER SYSTEMS",
    title: "Web & mobile products",
    copy:
      "Customer-facing platforms designed to feel effortless while carrying the operational logic required behind the scenes.",
    link: "Web platforms · Mobile apps · E-commerce",
    image:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    eyebrow: "02 / OPERATIONS",
    title: "Systems that run the business",
    copy:
      "From order flow and property operations to hospitality, reporting, CRM and internal control rooms — one connected operating layer.",
    link: "Business systems · Integrations · Dashboards",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    eyebrow: "03 / DELIVERY DEPTH",
    title: "Engineering that can scale",
    copy:
      "IMVO Systems leads the product direction and can extend delivery capacity through specialist engineering partners, including Qonics, when a project needs deeper software execution.",
    link: "Product design · Engineering · Ongoing evolution",
    image:
      "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

const faqs = [
  [
    "What does IMVO Systems build?",
    "Digital products, websites, mobile apps, internal platforms, e-commerce, property and hospitality systems, integrations, dashboards, and intelligent automation.",
  ],
  [
    "Can you take a business from idea to launch?",
    "Yes. We can shape the product, design the experience, engineer the system, deploy it, document it, and continue supporting it after launch.",
  ],
  [
    "Do you work with existing systems?",
    "Yes. We can improve, connect, migrate, rebuild, or extend an existing platform without forcing a full restart when that is not necessary.",
  ],
  [
    "Who owns the finished system?",
    "Ownership, source-code access, hosting, data, credentials, and handover terms are defined clearly for each engagement before launch.",
  ],
];

function SystemsBrand({ light = false }: { light?: boolean }) {
  return (
    <span className={`sysBrand ${light ? "sysBrandLight" : ""}`} aria-label="IMVO Systems">
      <strong>IMVO</strong>
      <i aria-hidden="true" />
      <span>systems</span>
    </span>
  );
}

export default function SystemsPage() {
  return (
    <main className="systemsSite" id="main-content">
      <section className="sysHeroShell">
        <div className="sysHero">
          <img
            className="sysHeroImage"
            src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=2200"
            alt=""
          />
          <div className="sysHeroShade" />

          <header className="sysHeader">
            <Link className="sysLogoLink" href="/systems" aria-label="IMVO Systems home">
              <SystemsBrand light />
            </Link>

            <nav className="sysPracticeNav" aria-label="IMVO practices">
              <Link href="/">Studio</Link>
              <Link className="active" href="/systems" aria-current="page">
                Systems
              </Link>
              <Link href="/domicile">Domicile</Link>
            </nav>

            <div className="sysHeaderActions">
              <Link href="/contact?practice=systems" aria-label="Start a project">
                ↗
              </Link>
              <a href="#capabilities" aria-label="Explore capabilities">
                ☰
              </a>
            </div>
          </header>

          <div className="sysHeroContent">
            <div>
              <p className="sysKicker">Technology &amp; Product Engineering</p>
              <h1>Systems</h1>
              <Link className="sysPillLight" href="/contact?practice=systems">
                Start a project <span>↗</span>
              </Link>
            </div>

            <div className="sysHeroAside">
              <p>
                Digital products, software and operational platforms built around how
                the business actually works.
              </p>
              <div className="sysHeroGlass">
                <span>From idea to launch</span>
                <strong>One connected delivery path</strong>
              </div>
            </div>
          </div>

          <div className="sysHeroBottom">
            <div className="sysCapabilityChips">
              {["Web Platforms", "Mobile Apps", "Business Systems", "Automation", "Integrations"].map(
                (item) => (
                  <a key={item} href="#capabilities">
                    {item} <span>✦</span>
                  </a>
                ),
              )}
            </div>
            <div className="sysSocialDots" aria-label="IMVO Systems locations">
              <span>KIGALI</span>
              <span>RWANDA</span>
              <span>EAST AFRICA</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sysSelected" id="capabilities">
        <div className="sysSectionHeading">
          <div>
            <span>WHAT WE BUILD</span>
            <h2>Selected Systems</h2>
          </div>
          <Link className="sysOutlinePill" href="/contact?practice=systems">
            START A PROJECT <b>↗</b>
          </Link>
        </div>

        <div className="sysCardGrid">
          {systemCards.map((card) => (
            <article className={`sysCard ${card.className}`} key={card.title}>
              <img src={card.image} alt="" loading="lazy" />
              <div className="sysCardShade" />
              <div className="sysCardTop">
                <span>{card.eyebrow}</span>
                <small>IMVO SYSTEMS</small>
              </div>
              <div className="sysCardLabel">
                <div>
                  <strong>{card.title}</strong>
                  <p>{card.detail}</p>
                </div>
                <b aria-hidden="true">↗</b>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sysBuild">
        <div className="sysBuildIntro">
          <span>BUILT AROUND THE BUSINESS</span>
          <h2>Build the right system</h2>
          <p>
            We start with the operation, customer journey and business problem —
            then define the technology required to solve it.
          </p>
        </div>

        <div className="sysBuildRows">
          {buildRows.map((row, index) => (
            <article className={`sysBuildRow ${index % 2 ? "reverse" : ""}`} key={row.title}>
              <div className="sysBuildMedia">
                <img src={row.image} alt="" loading="lazy" />
              </div>
              <div className="sysBuildCopy">
                <span>{row.eyebrow}</span>
                <h3>{row.title}</h3>
                <p>{row.copy}</p>
                <small>{row.link}</small>
                <Link href="/contact?practice=systems">
                  Discuss a system <b>↗</b>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="sysMarquee" aria-hidden="true">
        <span>PRODUCTS</span><i>/</i>
        <span>SYSTEMS</span><i>/</i>
        <span>AUTOMATION</span><i>/</i>
        <span>INTELLIGENCE</span>
      </div>

      <section className="sysFeatured">
        <div className="sysFeaturedFrame">
          <img src="/domicile/exact/estate-hero.jpg" alt="" loading="lazy" />
          <div className="sysFeaturedShade" />
          <div className="sysFeaturedGlass">
            <span>IMVO PRODUCT / PROPERTY TECHNOLOGY</span>
            <h2>DŌMICILE</h2>
            <p>
              A property-management platform designed to connect owners, properties,
              maintenance, reporting and IMVO operations in one controlled experience.
            </p>
            <div className="sysFeatureTags">
              <span>Mobile</span>
              <span>Operations</span>
              <span>Property</span>
            </div>
            <Link href="/domicile">Explore DŌMICILE <b>↗</b></Link>
          </div>
        </div>
      </section>

      <section className="sysFaq">
        <div className="sysFaqMedia">
          <img
            src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt=""
            loading="lazy"
          />
          <div>
            <span>IMVO SYSTEMS</span>
            <strong>Products that stay useful after launch.</strong>
          </div>
        </div>

        <div className="sysFaqContent">
          <span>FREQUENTLY ASKED QUESTIONS</span>
          <h2>How we work</h2>
          <div className="sysFaqList">
            {faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{question}</strong>
                  <b>+</b>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="sysFooter">
        <div className="sysFooterGrid">
          <div>
            <span>IMVO GROUP</span>
            <Link href="/">Studio</Link>
            <Link href="/systems">Systems</Link>
            <Link href="/domicile">Domicile</Link>
          </div>
          <div>
            <span>CAPABILITIES</span>
            <a href="#capabilities">Digital Products</a>
            <a href="#capabilities">Business Systems</a>
            <a href="#capabilities">AI &amp; Automation</a>
            <a href="#capabilities">Integrations</a>
          </div>
          <div>
            <span>DELIVERY</span>
            <p>Kigali, Rwanda</p>
            <p>Projects across East Africa</p>
            <p>Extended engineering depth through selected partners</p>
          </div>
          <div>
            <span>START</span>
            <h3>Have something to build?</h3>
            <Link className="sysFooterCta" href="/contact?practice=systems">
              Talk to IMVO Systems <b>↗</b>
            </Link>
          </div>
        </div>

        <div className="sysFooterWordmark">
          <SystemsBrand light />
          <span>© {new Date().getFullYear()} IMVO Group</span>
        </div>
      </footer>
    </main>
  );
}
