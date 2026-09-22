import type { Metadata } from "next";
import SystemsHeader from "../SystemsHeader";

export const metadata: Metadata = {
  title: "About IMVO Systems",
  description:
    "About IMVO Systems, the technology and product-engineering practice of IMVO Group.",
  alternates: { canonical: "/systems/about" },
};

const principles = [
  ["01", "Business first", "We understand the operation before choosing the technology."],
  ["02", "Clear ownership", "Source code, credentials, data, deployment and handover are treated as part of the system."],
  ["03", "Useful design", "Interfaces must reduce friction and make the work easier to understand."],
  ["04", "Built for continuity", "A launch is not the end. Documentation, backups and maintainability matter."],
];

export default function SystemsAboutPage() {
  return (
    <main className="sysSite">
      <SystemsHeader section="about" />

      <section className="sysInnerHero">
        <img
          src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=2200"
          alt=""
        />
        <div />
        <h1>ABOUT US</h1>
      </section>

      <section className="sysAboutIntro">
        <div>
          <span>IMVO SYSTEMS</span>
          <h2>TECHNOLOGY WITH A JOB TO DO.</h2>
        </div>
        <p>
          IMVO Systems is the technology and product-engineering practice of IMVO Group.
          We design and build digital products, business software and connected systems
          for organisations that need technology to support real operations — not just
          look impressive in a presentation.
        </p>
      </section>

      <section className="sysPrinciples">
        <div className="sysPrinciplesTitle">
          <h2>HOW WE THINK</h2>
        </div>
        <div className="sysPrincipleList">
          {principles.map(([n, title, copy]) => (
            <article key={title}>
              <span>{n}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="sysDelivery">
        <h2>DELIVERY NETWORK</h2>
        <div className="sysDeliveryGrid">
          <article><img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" /><span>PRODUCT DIRECTION</span></article>
          <article><img src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" /><span>ENGINEERING</span></article>
          <article><img src="https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" /><span>OPERATIONS</span></article>
          <article><img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" /><span>SUPPORT</span></article>
        </div>
      </section>

      <footer className="sysFooter">
        <img src="/brand/imvo-systems.svg" alt="IMVO Systems" />
        <div><a href="/">Studio</a><a href="/systems">Systems</a><a href="/domicile">Domicile</a></div>
        <small>IMVO GROUP · KIGALI, RWANDA</small>
      </footer>
    </main>
  );
}
