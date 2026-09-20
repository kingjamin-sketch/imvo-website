import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IMVO Systems | Digital Products & Business Systems",
  description:
    "IMVO Systems builds digital products, software platforms, business systems, integrations, and intelligent automation for real-world operations.",
  alternates: { canonical: "/systems" },
  openGraph: {
    title: "IMVO Systems | Digital Products & Business Systems",
    description:
      "Digital products, software platforms, business systems, integrations, and intelligent automation by IMVO Group.",
    url: "/systems",
    type: "website",
  },
};

const cards = [
  {
    eyebrow: "PRODUCT / EXPERIENCE",
    title: "Digital Products",
    detail: "Web platforms, customer journeys, portals and product experiences.",
    image:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1400",
    className: "systemsCardTall",
  },
  {
    eyebrow: "OPERATIONS / SOFTWARE",
    title: "Business Systems",
    detail: "Software that connects teams, workflows, data and daily operations.",
    image:
      "https://images.pexels.com/photos/1181279/pexels-photo-1181279.jpeg?auto=compress&cs=tinysrgb&w=1600",
    className: "systemsCardWide",
  },
  {
    eyebrow: "INTELLIGENCE / SCALE",
    title: "AI & Automation",
    detail: "Automation designed around measurable business value.",
    image:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1400",
    className: "systemsCardSmall",
  },
];

const rows = [
  {
    kicker: "01 / CUSTOMER-FACING",
    title: "Web & mobile products",
    copy:
      "Clear customer experiences backed by the workflows, data and integrations the business needs behind the screen.",
    meta: "Web platforms · Mobile apps · E-commerce",
    image:
      "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    kicker: "02 / OPERATIONS",
    title: "Systems that run the business",
    copy:
      "Ordering, property operations, hospitality, reporting, CRM and internal control — designed as one connected operating layer.",
    meta: "Operations · Dashboards · Integrations",
    image:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    kicker: "03 / ENGINEERING",
    title: "Built to launch, built to keep working",
    copy:
      "Product direction, interface design, engineering, deployment, documentation and ongoing evolution are coordinated as one delivery path.",
    meta: "Product design · Engineering · Deployment",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

const faqs = [
  [
    "What does IMVO Systems build?",
    "Web platforms, mobile apps, internal systems, e-commerce, property and hospitality technology, dashboards, integrations and intelligent automation.",
  ],
  [
    "Can you take a business from idea to launch?",
    "Yes. We can shape the product, design the experience, engineer the system, deploy it, document it and continue supporting it after launch.",
  ],
  [
    "Can you improve an existing platform?",
    "Yes. We can audit, redesign, connect, migrate, rebuild or extend an existing system without forcing a complete restart when that is unnecessary.",
  ],
  [
    "How are access and ownership handled?",
    "Repository access, hosting, credentials, data ownership, backups and handover are defined clearly for each engagement so the system remains controlled and recoverable.",
  ],
];

function SystemsLogo({ light = false, large = false }: { light?: boolean; large?: boolean }) {
  return (
    <span
      className={`systemsLogo ${light ? "systemsLogoLight" : ""} ${large ? "systemsLogoLarge" : ""}`}
      aria-label="IMVO Systems"
    >
      <strong>IMVO</strong>
      <i aria-hidden="true" />
      <span>systems</span>
    </span>
  );
}

export default function SystemsPage() {
  return (
    <main className="systemsPage" id="main-content">
      <section className="systemsHeroOuter">
        <div className="systemsHero">
          <img
            className="systemsHeroImage"
            src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=2200"
            alt=""
          />
          <div className="systemsHeroShade" />

          <header className="systemsTopbar">
            <Link href="/systems" className="systemsLogoLink" aria-label="IMVO Systems home">
              <SystemsLogo light />
            </Link>

            <nav className="systemsPracticeNav" aria-label="IMVO practices">
              <Link href="/">Studio</Link>
              <Link href="/systems" className="active" aria-current="page">Systems</Link>
              <Link href="/domicile">Domicile</Link>
            </nav>

            <div className="systemsTopActions">
              <Link href="/contact?practice=systems" aria-label="Start a project">↗</Link>
              <a href="#selected" aria-label="Explore systems">☰</a>
            </div>
          </header>

          <div className="systemsHeroMain">
            <div className="systemsHeroTitle">
              <h1>Systems</h1>
              <Link href="/contact?practice=systems" className="systemsHeroCta">
                START A PROJECT <b>↗</b>
              </Link>
            </div>

            <div className="systemsHeroNote">
              <p>
                Digital products, software and operational platforms designed to keep
                real businesses moving.
              </p>
              <div className="systemsHeroCallout">
                <span>FROM IDEA TO LAUNCH</span>
                <strong>One connected delivery path</strong>
              </div>
            </div>
          </div>

          <div className="systemsHeroFooter">
            <div className="systemsChips">
              {["Web Platforms", "Mobile Apps", "Business Systems", "Automation", "Integrations"].map((item) => (
                <a key={item} href="#selected">{item}<span>✦</span></a>
              ))}
            </div>
            <div className="systemsHeroMeta">
              <span>KIGALI</span>
              <span>RWANDA</span>
              <span>EAST AFRICA</span>
            </div>
          </div>
        </div>
      </section>

      <section className="systemsSelected" id="selected">
        <div className="systemsSelectedHead">
          <div>
            <span>SELECTED CAPABILITIES</span>
            <h2>Selected Systems</h2>
          </div>
          <Link href="/contact?practice=systems" className="systemsOutlineButton">
            START A PROJECT <b>↗</b>
          </Link>
        </div>

        <div className="systemsCollectionIntro">
          <span>BUILT BY IMVO SYSTEMS</span>
          <p>
            We design digital products and software around the operation first —
            then engineer the technology required to make it work.
          </p>
        </div>

        <div className="systemsCards">
          {cards.map((card) => (
            <article className={`systemsCard ${card.className}`} key={card.title}>
              <img src={card.image} alt="" loading="lazy" />
              <div className="systemsCardShade" />
              <div className="systemsCardTopline">
                <span>{card.eyebrow}</span>
                <small>IMVO SYSTEMS</small>
              </div>
              <div className="systemsCardGlass">
                <div>
                  <strong>{card.title}</strong>
                  <p>{card.detail}</p>
                </div>
                <b>↗</b>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="systemsPerfect">
        <div className="systemsPerfectIntro">
          <h2>Build the Right System</h2>
          <p>
            The right technology should make the business clearer, faster and easier
            to operate — not simply add another tool.
          </p>
        </div>

        <div className="systemsRows">
          {rows.map((row, index) => (
            <article className={`systemsRow ${index % 2 === 1 ? "reverse" : ""}`} key={row.title}>
              <div className="systemsRowMedia">
                <img src={row.image} alt="" loading="lazy" />
              </div>
              <div className="systemsRowCopy">
                <span>{row.kicker}</span>
                <h3>{row.title}</h3>
                <p>{row.copy}</p>
                <small>{row.meta}</small>
                <Link href="/contact?practice=systems">Discuss a system <b>↗</b></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="systemsTicker" aria-hidden="true">
        <span>PRODUCTS</span><i>/</i>
        <span>SYSTEMS</span><i>/</i>
        <span>SOFTWARE</span><i>/</i>
        <span>INTELLIGENCE</span>
      </div>

      <section className="systemsFeature">
        <div className="systemsFeatureFrame">
          <img
            src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt=""
            loading="lazy"
          />
          <div className="systemsFeatureShade" />
          <div className="systemsFeatureGlass">
            <span>CONNECTED OPERATIONS</span>
            <h2>One system. One source of truth.</h2>
            <p>
              Bring workflows, teams, customer activity, reporting and control into a
              system that can be understood, managed and backed up properly.
            </p>
            <div className="systemsFeatureTags">
              <span>Operations</span>
              <span>Dashboards</span>
              <span>Integrations</span>
              <span>Automation</span>
            </div>
            <Link href="/contact?practice=systems">Build with IMVO Systems <b>↗</b></Link>
          </div>
        </div>
      </section>

      <section className="systemsFaq">
        <div className="systemsFaqImage">
          <img
            src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt=""
            loading="lazy"
          />
          <div>
            <span>IMVO SYSTEMS</span>
            <strong>Useful after launch.</strong>
          </div>
        </div>

        <div className="systemsFaqCopy">
          <span>FREQUENTLY ASKED QUESTIONS</span>
          <h2>How we work</h2>
          <div className="systemsFaqList">
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

      <footer className="systemsFooter">
        <div className="systemsFooterColumns">
          <div>
            <span>IMVO GROUP</span>
            <Link href="/">Studio</Link>
            <Link href="/systems">Systems</Link>
            <Link href="/domicile">Domicile</Link>
          </div>
          <div>
            <span>CAPABILITIES</span>
            <a href="#selected">Digital Products</a>
            <a href="#selected">Business Systems</a>
            <a href="#selected">AI & Automation</a>
            <a href="#selected">Integrations</a>
          </div>
          <div>
            <span>BASE</span>
            <p>Kigali, Rwanda</p>
            <p>Projects across East Africa</p>
          </div>
          <div>
            <span>START</span>
            <h3>Have something to build?</h3>
            <Link href="/contact?practice=systems" className="systemsFooterButton">
              Talk to IMVO Systems <b>↗</b>
            </Link>
          </div>
        </div>

        <div className="systemsFooterMark">
          <SystemsLogo light large />
          <small>© {new Date().getFullYear()} IMVO Group</small>
        </div>
      </footer>
    </main>
  );
}
