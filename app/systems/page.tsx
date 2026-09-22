import type { Metadata } from "next";
import Link from "next/link";
import SystemsHeader from "./SystemsHeader";

export const metadata: Metadata = {
  title: "IMVO Systems | Digital Products & Business Systems",
  description:
    "IMVO Systems designs and builds digital products, software platforms, business systems, integrations, and intelligent automation.",
  alternates: { canonical: "/systems" },
};

const services = [
  ["01", "Digital products", "Web and mobile experiences built around clear customer journeys and useful business outcomes."],
  ["02", "Business systems", "Operational software for orders, properties, hospitality, reporting, CRM and internal control."],
  ["03", "Integrations", "Connected data and workflows across the tools a business already depends on."],
  ["04", "Automation", "Practical automation and AI used where it reduces friction, repetition and delay."],
];

const work = [
  {
    title: "Customer platforms",
    tag: "WEB / MOBILE",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    title: "Operational systems",
    tag: "BUSINESS / CONTROL",
    image: "https://images.pexels.com/photos/1181279/pexels-photo-1181279.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    title: "Integrated workflows",
    tag: "DATA / INTEGRATION",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    title: "Automation",
    tag: "AI / OPERATIONS",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
];

export default function SystemsPage() {
  return (
    <main className="sysSite">
      <SystemsHeader section="home" />

      <section className="sysHero">
        <img
          src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=2200"
          alt=""
        />
        <div className="sysHeroOverlay" />
        <div className="sysHeroTitle">
          <span>IMVO</span>
          <strong>SYSTEMS</strong>
        </div>
      </section>

      <section className="sysServices">
        <div className="sysServicesTitle">
          <span>WHAT WE DO</span>
          <h1>WE BUILD SYSTEMS<br />THAT WORK.</h1>
          <p>
            Digital products and software shaped around the real operation — clear,
            controlled and made to keep working after launch.
          </p>
        </div>

        <div className="sysServiceList">
          {services.map(([number, title, copy], index) => (
            <article key={title} className={index === 0 ? "open" : ""}>
              <span>{number}</span>
              <div>
                <h2>{title}</h2>
                <p>{copy}</p>
              </div>
              <b>↗</b>
            </article>
          ))}
        </div>
      </section>

      <section className="sysWork" id="work">
        <div className="sysSectionLine">
          <span>SELECTED SYSTEMS</span>
          <Link href="/systems/contact">START A PROJECT ↗</Link>
        </div>

        <div className="sysWorkGrid">
          {work.map((item) => (
            <article key={item.title}>
              <img src={item.image} alt="" loading="lazy" />
              <div className="sysWorkShade" />
              <div className="sysWorkLabel">
                <small>{item.tag}</small>
                <strong>{item.title}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sysCapabilityBlock">
        <div className="sysCapabilityLead">
          <span>CAPABILITY</span>
          <h2>FROM IDEA<br />TO OPERATION.</h2>
        </div>
        <div className="sysCapabilityGrid">
          <div><strong>Product design</strong><p>Structure, flows, interface and experience.</p></div>
          <div><strong>Engineering</strong><p>Web, mobile and custom software delivery.</p></div>
          <div><strong>Infrastructure</strong><p>Hosting, deployment, domains, access and environments.</p></div>
          <div><strong>Continuity</strong><p>Backups, documentation, handover and ongoing support.</p></div>
          <div><strong>Integration</strong><p>Payments, data, APIs and third-party services.</p></div>
          <div><strong>Automation</strong><p>Workflows and intelligence where they add value.</p></div>
        </div>
      </section>

      <section className="sysClosing">
        <span>IMVO SYSTEMS</span>
        <h2>Build something useful.<br />Keep it under control.</h2>
        <Link href="/systems/contact">START A CONVERSATION ↗</Link>
      </section>

      <footer className="sysFooter">
        <img src="/brand/imvo-systems.svg" alt="IMVO Systems" />
        <div>
          <Link href="/">Studio</Link>
          <Link href="/systems">Systems</Link>
          <Link href="/domicile">Domicile</Link>
        </div>
        <small>IMVO GROUP · KIGALI, RWANDA</small>
      </footer>
    </main>
  );
}
