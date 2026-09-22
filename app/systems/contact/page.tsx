import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../SystemsPage.module.css";
import { SystemsHeader, SystemsFooter } from "../SystemsShared";

export const metadata: Metadata = {
  title: "Contact IMVO Systems",
  description: "Start a software, digital-product or business-systems project with IMVO Systems.",
  alternates: { canonical: "/systems/contact" },
};

export default function SystemsContactPage(){
  return (
    <main className={styles.page}>
      <SystemsHeader/>
      <section className={styles.subpageHero}>
        <Image src="/imvo-contact-team.webp" alt="Contact IMVO Systems" fill priority className={styles.subpageHeroImage}/>
        <div className={styles.subpageHeroOverlay}/>
        <div className={styles.subpageHeroInner}>
          <p className={styles.eyebrow}>START A PROJECT</p>
          <h1>CONTACT</h1>
        </div>
      </section>
      <section className={styles.subpageBody}>
        <div className={styles.subpageGrid}>
          <div className={styles.subpageLead}>
            <p className={styles.sectionKicker}>Project inquiries</p>
            <h2>Tell us what needs to work.</h2>
            <p className={styles.subpageCopy}>Start with the business problem, workflow or product. We can help define the technical route from there.</p>
          </div>
          <div className={styles.contactCards}>
            <article className={styles.contactCard}><span>01 / NEW SYSTEM</span><h3>Build from zero</h3><p>For a new product, platform, app or internal system.</p><Link href="/contact?practice=systems#quote">Open project brief →</Link></article>
            <article className={styles.contactCard}><span>02 / EXISTING SYSTEM</span><h3>Improve what exists</h3><p>For an audit, rebuild, migration, integration or stabilisation.</p><Link href="/contact?practice=systems#quote">Request a review →</Link></article>
            <article className={styles.contactCard}><span>03 / CONTINUITY</span><h3>Hosting, access & backups</h3><p>For deployment, repositories, credentials, databases, documentation and support.</p><Link href="/contact?practice=systems#quote">Talk to Systems →</Link></article>
          </div>
        </div>
      </section>
      <SystemsFooter/>
    </main>
  )
}
