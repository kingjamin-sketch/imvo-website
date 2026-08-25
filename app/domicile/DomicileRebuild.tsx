"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./DomicileRebuild.module.css";

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_DOMICILE_WEB3FORMS_KEY ||
  "566d4852-a822-4432-83ba-8d522618ee66";

const whatsappNumber = "250799409409";
const whatsappMessage = encodeURIComponent(
  "Hello DŌMICILE, I would like to discuss property management with your team.",
);
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const navItems = [
  ["Care", "#care"],
  ["How it works", "#process"],
  ["Owner view", "#owner-view"],
  ["Properties", "#properties"],
  ["FAQ", "#faq"],
] as const;

const careCards = [
  {
    number: "01",
    title: "Routine oversight",
    text: "Scheduled checks, property readiness and visible follow-through without the owner having to chase several people.",
    image: "/domicile/properties/property-c1.webp",
    className: styles.careWide,
  },
  {
    number: "02",
    title: "Owner-away care",
    text: "A dependable local presence while you travel or live outside Rwanda.",
    className: styles.careTall,
  },
  {
    number: "03",
    title: "Maintenance & repair",
    text: "Issues are documented, scoped, coordinated and followed through to closure.",
    className: styles.careSmall,
  },
  {
    number: "04",
    title: "Property works",
    text: "Repairs, improvements and technical work with clear owner approval before action.",
    className: styles.careSmall,
  },
  {
    number: "05",
    title: "Urgent response",
    text: "A clear path when something cannot wait: detect, contact, confirm authority, coordinate, report.",
    image: "/domicile/properties/property-street.webp",
    className: styles.careWideBottom,
  },
];

const processSteps = [
  {
    number: "01",
    label: "TELL",
    title: "Tell us what needs attention.",
    text: "A short message is enough. We start with the property, the issue and the outcome you need.",
  },
  {
    number: "02",
    label: "PLAN",
    title: "We define the care plan.",
    text: "Access, approvals, reporting, frequency and responsibility are agreed before ongoing care begins.",
  },
  {
    number: "03",
    label: "ACT",
    title: "DŌMICILE coordinates the work.",
    text: "Visits, technicians, repairs and owner decisions are handled through one responsible point of contact.",
  },
  {
    number: "04",
    label: "REPORT",
    title: "You stay visible without being on site.",
    text: "Photos, updates, approvals and completed matters form a clear property record over time.",
  },
];

const propertyCards = [
  {
    title: "Private Residence",
    meta: "Routine care active",
    image: "/domicile/properties/property-c1.webp",
    status: "ALL GOOD",
  },
  {
    title: "Residential Estate",
    meta: "Next visit scheduled",
    image: "/domicile/properties/property-estate.webp",
    status: "INSPECTION DUE",
  },
  {
    title: "Private Home",
    meta: "Owner-away care active",
    image: "/domicile/properties/property-street.webp",
    status: "OWNER AWAY",
  },
];

const faqItems = [
  [
    "Do I need to live outside Rwanda?",
    "No. DŌMICILE is for owners abroad, frequent travellers and Kigali-based owners who want reliable delegated property care.",
  ],
  [
    "Can you manage one property only?",
    "Yes. The service can be shaped around one home, multiple properties or a defined one-off need.",
  ],
  [
    "How are repairs approved?",
    "The approval process is agreed during onboarding. Work requiring owner approval does not proceed until the agreed authority is confirmed.",
  ],
  [
    "What happens if something is urgent?",
    "The matter is triaged, the owner is contacted and DŌMICILE acts within any pre-agreed emergency authority where applicable.",
  ],
  [
    "Will my property appear on the website?",
    "No, not by default. Client properties and identifying information are public only when the owner has explicitly agreed to it.",
  ],
  [
    "Which areas do you serve?",
    "DŌMICILE is currently focused on properties across Kigali, Rwanda.",
  ],
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  location: string;
  propertyType: string;
  helpWith: string;
  message: string;
  botcheck: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  location: "",
  propertyType: "",
  helpWith: "",
  message: "",
  botcheck: "",
};

function TextRoll({ children, className = "" }: { children: string; className?: string }) {
  const stagger = 0.025;
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={`${styles.textRoll} ${className}`}
    >
      <span>
        {children.split("").map((letter, index) => (
          <motion.span
            key={`top-${letter}-${index}`}
            variants={{ initial: { y: 0 }, hovered: { y: "-110%" } }}
            transition={{ ease: [0.33, 1, 0.68, 1], delay: stagger * index, duration: 0.32 }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </span>
      <span className={styles.textRollSecond} aria-hidden="true">
        {children.split("").map((letter, index) => (
          <motion.span
            key={`bottom-${letter}-${index}`}
            variants={{ initial: { y: "110%" }, hovered: { y: 0 } }}
            transition={{ ease: [0.33, 1, 0.68, 1], delay: stagger * index, duration: 0.32 }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function DomicileRebuild() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const formReady = useMemo(
    () =>
      Boolean(
        form.name.trim() &&
          form.phone.trim() &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
          form.location.trim() &&
          form.propertyType &&
          form.helpWith &&
          form.message.trim().length >= 5,
      ),
    [form],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formReady || form.botcheck) return;
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New DŌMICILE enquiry — ${form.name} — ${form.location}`,
          from_name: "DŌMICILE by IMVO Group",
          replyto: form.email,
          name: form.name,
          phone_whatsapp: form.phone,
          email: form.email,
          property_location: form.location,
          property_type: form.propertyType,
          help_with: form.helpWith,
          message: form.message,
          botcheck: "",
        }),
      });
      const result = await response.json();
      if (!response.ok || !result?.success) throw new Error("Submission failed");
      setIsSubmitted(true);
      setForm(initialForm);
    } catch {
      setError("We could not send the enquiry just now. Please try again or continue on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/domicile" className={styles.brand} aria-label="DŌMICILE home">
          <Image src="/domicile/domicile-white-no-tagline.svg" alt="DŌMICILE" width={1495} height={292} priority />
          <span>PROPERTY MANAGEMENT BY IMVO GROUP</span>
        </Link>
        <nav className={styles.nav} aria-label="DŌMICILE navigation">
          {navItems.map(([label, href]) => (
            <a href={href} key={label}><TextRoll>{label}</TextRoll></a>
          ))}
        </nav>
        <a href="#enquire" className={styles.headerCta}>START AN ENQUIRY <span>↗</span></a>
      </header>

      <section className={styles.hero}>
        <Image
          src="/domicile/properties/property-estate.webp"
          alt="Residential estate under DŌMICILE care in Kigali"
          fill
          priority
          unoptimized
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <Reveal>
              <p className={styles.eyebrow}>KIGALI · RWANDA · PROPERTY CARE</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1>Your property,<br />handled.</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className={styles.heroLead}>
                One dependable local point of contact for property oversight, maintenance, owner-away care and follow-through.
              </p>
            </Reveal>
            <Reveal delay={0.24} className={styles.heroActions}>
              <a href="#enquire" className={styles.heroPrimary}>TALK TO DŌMICILE <span>↗</span></a>
              <a href="#care" className={styles.heroSecondary}>SEE HOW CARE WORKS <span>↓</span></a>
            </Reveal>
          </div>

          <Reveal delay={0.3} className={styles.heroDesk}>
            <div className={styles.deskTop}>
              <span>OWNER DESK</span>
              <i />
            </div>
            <div className={styles.deskStatus}>
              <small>CURRENT PROPERTY STATUS</small>
              <strong>All good</strong>
            </div>
            <div className={styles.deskGrid}>
              <div><small>LAST CHECK</small><b>Today · 09:42</b></div>
              <div><small>OPEN MATTERS</small><b>01</b></div>
              <div><small>NEXT VISIT</small><b>27 AUG</b></div>
              <div><small>LATEST REPORT</small><b>READY</b></div>
            </div>
            <a href="#owner-view">VIEW OWNER EXPERIENCE <span>→</span></a>
          </Reveal>
        </div>
        <div className={styles.heroFooter}>
          <span>01 · LOCAL PRESENCE</span>
          <span>02 · PROACTIVE CARE</span>
          <span>03 · OWNER VISIBILITY</span>
          <span>04 · PRIVATE BY DEFAULT</span>
        </div>
      </section>

      <section className={styles.intro}>
        <Reveal className={styles.introLabel}>WHAT DŌMICILE IS</Reveal>
        <Reveal delay={0.05}>
          <h2>Property care without the chase.</h2>
        </Reveal>
        <Reveal delay={0.1} className={styles.introText}>
          <p>
            DŌMICILE exists for owners who want the property looked after properly without spending their day coordinating visits, technicians, repairs and follow-up themselves.
          </p>
          <p>
            The promise is simple: one responsible local point of contact, clear owner authority, documented action and visible closure.
          </p>
        </Reveal>
      </section>

      <section className={styles.careSection} id="care">
        <div className={styles.sectionTitleRow}>
          <div>
            <p>WHAT WE HANDLE</p>
            <h2>One service.<br />Several layers of care.</h2>
          </div>
          <span>Built for homes, apartments and selected commercial property across Kigali.</span>
        </div>
        <div className={styles.careBento}>
          {careCards.map((card, index) => (
            <motion.article
              key={card.number}
              className={`${styles.careCard} ${card.className}`}
              initial="rest"
              whileHover="hover"
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.05 }}
            >
              {card.image ? (
                <Image src={card.image} alt="" fill unoptimized sizes="(max-width: 900px) 100vw, 60vw" className={styles.careImage} />
              ) : null}
              <div className={styles.careOverlay} />
              <span className={styles.cardNumber}>{card.number}</span>
              <div className={styles.careCardCopy}>
                <h3><TextRoll>{card.title}</TextRoll></h3>
                <p>{card.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.processSection} id="process">
        <div className={styles.processIntro}>
          <p>HOW IT WORKS</p>
          <h2>Clear from first message to ongoing care.</h2>
          <span>No registration maze. No owner portal before we understand the property.</span>
        </div>
        <div className={styles.processList}>
          {processSteps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.processNumber}>{step.number}</span>
              <div className={styles.processLabel}>{step.label}</div>
              <div className={styles.processCopy}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              <b>↗</b>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.ownerViewSection} id="owner-view">
        <div className={styles.ownerViewImage}>
          <Image src="/domicile/properties/property-street.webp" alt="Private home under DŌMICILE care" fill unoptimized sizes="(max-width: 900px) 100vw, 48vw" />
          <div className={styles.ownerPhotoTag}>
            <small>PROPERTY RECORD</small>
            <strong>Kigali · Private Home</strong>
          </div>
        </div>
        <div className={styles.ownerViewCopy}>
          <p>YOUR PROPERTY, AT A GLANCE</p>
          <h2>Visibility without chasing updates.</h2>
          <div className={styles.dashboardWindow}>
            <div className={styles.dashboardTopbar}>
              <Image src="/domicile/logo-icon-black.svg" alt="" width={30} height={38} />
              <span>OWNER VIEW</span>
              <b>PROPERTY ACTIVE</b>
            </div>
            <div className={styles.dashboardSummary}>
              <div><small>STATUS</small><strong>ALL GOOD</strong></div>
              <div><small>LAST INSPECTION</small><strong>TODAY · 09:42</strong></div>
              <div><small>OPEN MATTERS</small><strong>01</strong></div>
              <div><small>NEXT VISIT</small><strong>27 AUG</strong></div>
            </div>
            <div className={styles.dashboardTabs}>
              {["Overview", "Photos", "Reports", "Approvals", "Maintenance"].map((tab) => (
                <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={activeTab === tab ? styles.activeTab : ""}>{tab}</button>
              ))}
            </div>
            <div className={styles.dashboardContent}>
              <small>{activeTab.toUpperCase()}</small>
              <h3>{activeTab === "Overview" ? "Everything important, in one place." : `${activeTab} stay attached to the property record.`}</h3>
              <p>Owner visibility is designed around the property matter itself — what happened, what needs approval, what is next and what has been closed.</p>
              <button type="button">VIEW LATEST REPORT <span>→</span></button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.propertiesSection} id="properties">
        <div className={styles.propertiesHead}>
          <p>SELECTED PROPERTIES UNDER CARE</p>
          <h2>Real homes.<br />Quietly looked after.</h2>
          <span>Examples are privacy-safe. Identifying details are never published by default.</span>
        </div>
        <div className={styles.propertyRail}>
          {propertyCards.map((property, index) => (
            <motion.article
              key={property.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
            >
              <Image src={property.image} alt={property.title} fill unoptimized sizes="(max-width: 800px) 90vw, 33vw" />
              <div className={styles.propertyShade} />
              <span>{property.status}</span>
              <div><h3>{property.title}</h3><p>{property.meta}</p></div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.backedSection}>
        <div className={styles.backedCopy}>
          <p>BACKED BY IMVO GROUP</p>
          <h2>Property care with built-environment thinking behind it.</h2>
          <span>DŌMICILE combines property coordination with IMVO Group's design, technical and built-environment perspective.</span>
          <Link href="/">VISIT IMVO GROUP <b>↗</b></Link>
        </div>
        <div className={styles.backedGrid}>
          <div><span>01</span><b>LOCAL TEAM</b><p>Kigali-based property coordination.</p></div>
          <div><span>02</span><b>TRUSTED NETWORK</b><p>Appropriate technicians and service providers.</p></div>
          <div><span>03</span><b>PROFESSIONAL RECORDS</b><p>Reports, approvals and property history.</p></div>
          <div><span>04</span><b>DISCRETION</b><p>Privacy built into the service.</p></div>
        </div>
        <div className={styles.imvoLogo}>
          <Image src="/imvo-black.png" alt="IMVO Group" width={320} height={110} unoptimized />
        </div>
      </section>

      <section className={styles.faqSection} id="faq">
        <div className={styles.faqHead}>
          <p>FREQUENTLY ASKED QUESTIONS</p>
          <h2>Know how the care works.</h2>
        </div>
        <div className={styles.faqList}>
          {faqItems.map(([question, answer], index) => (
            <article key={question} className={openFaq === index ? styles.faqOpen : ""}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{question}</strong>
                <b>{openFaq === index ? "−" : "+"}</b>
              </button>
              <div><p>{answer}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.enquirySection} id="enquire">
        <div className={styles.enquiryIntro}>
          <Image src="/domicile/domicile-white-no-tagline.svg" alt="DŌMICILE" width={1495} height={292} />
          <p>START WITH A CONVERSATION</p>
          <h2>Tell us about<br />your property.</h2>
          <span>This is an enquiry, not a registration. We will contact you to understand the property and what you need.</span>
          <div className={styles.contactLinks}>
            <a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">+250 799 409 409</a>
            <small>KIGALI · RWANDA</small>
          </div>
        </div>

        <form className={styles.enquiryForm} onSubmit={handleSubmit}>
          {isSubmitted ? (
            <div className={styles.successBox}>
              <small>ENQUIRY RECEIVED</small>
              <h3>Thank you. DŌMICILE has your message.</h3>
              <p>Our team will review the property need and contact you using the details provided.</p>
              <button type="button" onClick={() => setIsSubmitted(false)}>SEND ANOTHER ENQUIRY</button>
            </div>
          ) : (
            <>
              <div className={styles.formHead}>
                <small>PROPERTY ENQUIRY</small>
                <h3>What should we know?</h3>
                <p>A short description is enough. We can discuss the details afterwards.</p>
              </div>
              <input className={styles.honeypot} value={form.botcheck} onChange={(e) => setForm((v) => ({ ...v, botcheck: e.target.value }))} tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className={styles.formGrid}>
                <label><span>FULL NAME</span><input value={form.name} onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))} placeholder="Your name" /></label>
                <label><span>PHONE / WHATSAPP</span><input value={form.phone} onChange={(e) => setForm((v) => ({ ...v, phone: e.target.value }))} placeholder="+250 …" /></label>
                <label><span>EMAIL</span><input type="email" value={form.email} onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))} placeholder="you@example.com" /></label>
                <label><span>PROPERTY LOCATION</span><input value={form.location} onChange={(e) => setForm((v) => ({ ...v, location: e.target.value }))} placeholder="e.g. Kacyiru, Kigali" /></label>
                <label><span>PROPERTY TYPE</span><select value={form.propertyType} onChange={(e) => setForm((v) => ({ ...v, propertyType: e.target.value }))}><option value="">Select property type</option><option>House</option><option>Apartment</option><option>Commercial</option><option>Other</option></select></label>
                <label><span>WHAT DO YOU NEED?</span><select value={form.helpWith} onChange={(e) => setForm((v) => ({ ...v, helpWith: e.target.value }))}><option value="">Select what you need</option><option>Ongoing property management</option><option>Owner-away care</option><option>Maintenance or repair</option><option>Property inspection</option><option>Urgent property issue</option><option>One-off property support</option><option>Other</option></select></label>
              </div>
              <label className={styles.messageField}><span>MESSAGE</span><textarea value={form.message} onChange={(e) => setForm((v) => ({ ...v, message: e.target.value }))} placeholder="Tell us what the property needs…" /></label>
              {error ? <p className={styles.errorBox}>{error}</p> : null}
              <div className={styles.formFooter}>
                <p>By sending this enquiry you agree that DŌMICILE may contact you about this property request.</p>
                <button type="submit" disabled={!formReady || isSubmitting}>{isSubmitting ? "SENDING…" : "SEND ENQUIRY ↗"}</button>
              </div>
            </>
          )}
        </form>
      </section>

      <footer className={styles.footer}>
        <div>
          <Image src="/domicile/domicile-white-no-tagline.svg" alt="DŌMICILE" width={1495} height={292} />
          <span>PROPERTY MANAGEMENT BY IMVO GROUP</span>
        </div>
        <div className={styles.footerLinks}>
          <a href="#care">CARE</a><a href="#process">HOW IT WORKS</a><a href="#owner-view">OWNER VIEW</a><a href="#properties">PROPERTIES</a><a href="#faq">FAQ</a><a href="#enquire">ENQUIRE</a>
        </div>
        <div className={styles.footerBottom}><span>© 2026 DŌMICILE · IMVO GROUP</span><span>KIGALI · RWANDA</span></div>
      </footer>
    </main>
  );
}
