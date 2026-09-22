"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./SystemsPage.module.css";
import { SystemsHeader, SystemsFooter } from "./SystemsShared";

const services = [
  { number:"01", title:"Digital Products", text:"Websites, customer platforms and mobile experiences shaped around a clear business outcome." },
  { number:"02", title:"Business Systems", text:"Operational software for orders, properties, hospitality, reporting, CRM and internal control." },
  { number:"03", title:"Integrations", text:"Payments, APIs, data and third-party tools connected into one reliable workflow." },
  { number:"04", title:"Automation", text:"Practical automation and AI where it reduces friction, repetition and delay." },
];

export default function SystemsPageClient() {
  return (
    <main className={styles.page}>
      <SystemsHeader />

      <section className={styles.hero}>
        <Image
          src="/about-future.jpg"
          alt="Digital systems and technology"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Technology & Product Engineering by IMVO Group</p>
            <img className={styles.systemHeroLogo} src="/brand/imvo-systems.svg" alt="IMVO Systems" />
            <h1 className={styles.systemHeroTitle}>Digital products and software built around the way the business actually works.</h1>
            <p className={styles.heroText}>
              We shape the product, engineer the system, deploy it properly and keep ownership, access and continuity clear.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/systems/contact">
                Talk to IMVO Systems <span aria-hidden="true">→</span>
              </Link>
              <a className={styles.secondaryButton} href="#what-we-build">
                See what we build <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.intro} id="what-we-build">
        <div className={styles.sectionInner}>
          <div className={styles.introLead}>
            <p className={styles.sectionKicker}>The idea</p>
            <h2>Start with the operation.</h2>
            <p className={styles.introStatement}>Then build the right system around it.</p>
          </div>
          <div className={styles.introBody}>
            <p>
              Good software is not just a screen. It is the connection between customers, people, payments, data, decisions and the work that needs to happen next.
            </p>
            <p>
              IMVO Systems turns that operation into one clear digital product or business system with defined ownership, deployment and backup.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className={styles.sectionInnerStack}>
          <div className={styles.sectionHeadingRow}>
            <div>
              <p className={styles.sectionKicker}>What IMVO Systems builds</p>
              <h2>One business. One connected system.</h2>
            </div>
            <p className={styles.sectionAside}>
              From customer-facing products to the internal systems that keep the operation moving.
            </p>
          </div>

          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <article className={styles.serviceCard} key={service.title}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.differenceSection}>
        <div className={styles.differenceGrid}>
          <div className={styles.differenceImageWrap}>
            <Image
              src="/services-hero.webp"
              alt="Systems design and engineering"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.coverImage}
            />
          </div>
          <div className={styles.differenceCopy}>
            <p className={styles.darkKicker}>The difference</p>
            <h2>Not simply a website build.</h2>
            <p>
              We treat the repository, deployment, credentials, integrations, data, documentation and backup as part of the product — not as things to figure out after launch.
            </p>
            <div className={styles.promiseLine}>
              <span>Clear ownership.</span>
              <span>Controlled access.</span>
              <span>Recoverable systems.</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.processSection} id="how-it-works">
        <div className={styles.sectionInnerStack}>
          <div className={styles.sectionHeadingRow}>
            <div>
              <p className={styles.sectionKicker}>How it works</p>
              <h2>From problem to working product.</h2>
            </div>
            <p className={styles.sectionAside}>
              Product direction, interface, engineering and launch are coordinated as one delivery path.
            </p>
          </div>

          <div className={styles.processGrid}>
            <article><span>01</span><h3>Understand</h3><p>We define the business problem, users, operation and required outcome.</p></article>
            <article><span>02</span><h3>Build</h3><p>We design, engineer and connect the product with the right services and infrastructure.</p></article>
            <article><span>03</span><h3>Launch & support</h3><p>We deploy, document, back up and establish the access and support model.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.awaySection}>
        <Image
          src="/contact-hero.webp"
          alt="IMVO Systems delivery"
          fill
          sizes="100vw"
          className={styles.awayImage}
        />
        <div className={styles.awayOverlay} />
        <div className={styles.awayInner}>
          <p className={styles.eyebrow}>For businesses that need more than a developer</p>
          <h2>Know where the system lives, who can access it and how you recover it.</h2>
          <p className={styles.awayText}>That operational control is part of the build.</p>
          <div className={styles.ownerList}>
            <span>GitHub ownership</span>
            <span>Deployment control</span>
            <span>Database access</span>
            <span>Backups</span>
            <span>Documentation</span>
          </div>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.contactGrid}>
          <div className={styles.contactIntro}>
            <p className={styles.sectionKicker}>Start a system</p>
            <h2>Tell us what the business needs to do.</h2>
            <p>
              You do not need a finished technical brief. Start with the problem, workflow or product you want to create.
            </p>
          </div>
          <div className={styles.systemPanel}>
            <h3>New product, existing platform or operational problem?</h3>
            <p>
              We can define the right route, whether that means building from zero, improving what already exists or connecting several tools into one system.
            </p>
            <Link className={styles.primaryButton} href="/systems/contact">
              Talk to IMVO Systems <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <SystemsFooter />
    </main>
  );
}
