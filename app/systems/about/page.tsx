import type { Metadata } from "next";
import Image from "next/image";
import styles from "../SystemsPage.module.css";
import { SystemsHeader, SystemsFooter } from "../SystemsShared";

export const metadata: Metadata = {
  title: "About IMVO Systems",
  description: "About IMVO Systems, the technology and product-engineering practice of IMVO Group.",
  alternates: { canonical: "/systems/about" },
};

const principles=[
  ["01","Business first","We understand the operation before choosing the technology."],
  ["02","Clear ownership","Source code, credentials, data, deployment and handover stay explicit."],
  ["03","Useful design","Interfaces reduce friction and make the work easier to understand."],
  ["04","Built for continuity","Backups, documentation and maintainability matter after launch."],
];

export default function SystemsAboutPage(){
  return (
    <main className={styles.page}>
      <SystemsHeader />
      <section className={styles.subpageHero}>
        <Image src="/about-hero.webp" alt="About IMVO Systems" fill priority className={styles.subpageHeroImage}/>
        <div className={styles.subpageHeroOverlay}/>
        <div className={styles.subpageHeroInner}>
          <p className={styles.eyebrow}>IMVO SYSTEMS</p>
          <h1>ABOUT US</h1>
        </div>
      </section>
      <section className={styles.subpageBody}>
        <div className={styles.subpageGrid}>
          <div className={styles.subpageLead}>
            <p className={styles.sectionKicker}>Technology with a job to do</p>
            <h2>Systems built around real operations.</h2>
          </div>
          <div className={styles.subpageCopy}>
            <p>IMVO Systems is the technology and product-engineering practice of IMVO Group. We design and build digital products, business software and connected systems for organisations that need technology to support real work.</p>
            <div className={styles.subpageList}>
              {principles.map(([n,title,copy])=><article key={title}><span>{n}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
            </div>
          </div>
        </div>
      </section>
      <SystemsFooter/>
    </main>
  )
}
