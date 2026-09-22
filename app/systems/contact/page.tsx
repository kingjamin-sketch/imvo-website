import type { Metadata } from "next";
import Link from "next/link";
import SystemsHeader from "../SystemsHeader";

export const metadata: Metadata = {
  title: "Contact IMVO Systems",
  description:
    "Start a software, digital-product or business-systems project with IMVO Systems.",
  alternates: { canonical: "/systems/contact" },
};

export default function SystemsContactPage() {
  return (
    <main className="sysSite">
      <SystemsHeader section="contact" />

      <section className="sysContactHero">
        <span>START A PROJECT</span>
        <h1>CONTACT</h1>
        <p>
          Tell us what the business needs to do, what is not working today, and what a
          successful system should make possible.
        </p>
      </section>

      <section className="sysContactGrid">
        <div className="sysContactLead">
          <span>PROJECT INQUIRIES</span>
          <h2>LET&apos;S BUILD<br />THE RIGHT THING.</h2>
        </div>

        <div className="sysContactOptions">
          <article>
            <span>01</span>
            <div>
              <h3>New system</h3>
              <p>Start from the business problem and define the right product, platform or internal system.</p>
              <Link href="/contact?practice=systems#quote">OPEN PROJECT BRIEF ↗</Link>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Existing system</h3>
              <p>Review, improve, migrate, connect or stabilise a platform that already exists.</p>
              <Link href="/contact?practice=systems#quote">REQUEST A REVIEW ↗</Link>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Ongoing support</h3>
              <p>Discuss backups, deployment, documentation, maintenance, integrations or operational support.</p>
              <Link href="/contact?practice=systems#quote">TALK TO IMVO SYSTEMS ↗</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="sysContactDetails">
        <div><span>BASE</span><strong>Kigali, Rwanda</strong></div>
        <div><span>DELIVERY</span><strong>Rwanda · East Africa · Remote</strong></div>
        <div><span>RESPONSE</span><strong>Project inquiries reviewed by IMVO Systems</strong></div>
      </section>

      <footer className="sysFooter">
        <img src="/brand/imvo-systems.svg" alt="IMVO Systems" />
        <div><Link href="/">Studio</Link><Link href="/systems">Systems</Link><Link href="/domicile">Domicile</Link></div>
        <small>IMVO GROUP · KIGALI, RWANDA</small>
      </footer>
    </main>
  );
}
