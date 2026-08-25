"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { FlipText } from "@/components/ui/flip-text";
import styles from "./DomicileAward.module.css";

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_DOMICILE_WEB3FORMS_KEY ||
  "566d4852-a822-4432-83ba-8d522618ee66";

const whatsappUrl =
  "https://wa.me/250799409409?text=" +
  encodeURIComponent(
    "Hello DŌMICILE, I would like to discuss property management with your team."
  );

const images = {
  hero: "/domicile/award/estate-main.avif",
  c1: "/domicile/award/estate-c1.avif",
  street: "/domicile/award/estate-street.avif",
};

const careItems = [
  {
    number: "01",
    title: "Property oversight",
    text: "Scheduled checks, readiness and a dependable local presence.",
    image: images.c1,
  },
  {
    number: "02",
    title: "Maintenance & repairs",
    text: "Scope, coordinate, approve and follow through without scattered calls.",
    image: images.hero,
  },
  {
    number: "03",
    title: "Owner-away care",
    text: "A trusted local point of contact while you are away from Kigali.",
    image: images.street,
  },
  {
    number: "04",
    title: "Property works",
    text: "Repairs and improvements coordinated with clear owner approval.",
    image: images.c1,
  },
];

const properties = [
  {
    number: "01",
    title: "Private Residence",
    status: "ALL GOOD",
    meta: "Routine care active",
    image: images.c1,
    details: ["Routine oversight", "Photo reports", "Owner approvals", "Private by default"],
  },
  {
    number: "02",
    title: "Residential Estate",
    status: "INSPECTION DUE",
    meta: "Next visit scheduled",
    image: images.hero,
    details: ["Scheduled checks", "Maintenance follow-up", "Owner view", "Kigali coverage"],
  },
  {
    number: "03",
    title: "Private Home",
    status: "OWNER AWAY",
    meta: "Local presence active",
    image: images.street,
    details: ["Owner-away care", "Issue escalation", "Photo updates", "Direct coordination"],
  },
];

const faqItems = [
  [
    "Do I need to live outside Rwanda?",
    "No. DŌMICILE is for owners abroad, frequent travellers and Kigali-based owners who want reliable delegated property care.",
  ],
  [
    "Can you manage one property only?",
    "Yes. The service can be shaped around one home, several properties or a defined one-off need.",
  ],
  [
    "How are repairs approved?",
    "The approval process is agreed during onboarding. Work requiring owner approval does not proceed until authority is confirmed.",
  ],
  [
    "What happens if something is urgent?",
    "The matter is triaged, the owner is contacted and DŌMICILE acts within any pre-agreed emergency authority where applicable.",
  ],
  [
    "Will my property appear on the website?",
    "No, not by default. Client properties and identifying information are public only when the owner has explicitly agreed.",
  ],
  ["Which areas do you serve?", "DŌMICILE is currently focused on properties across Kigali, Rwanda."],
];

const tabs = ["Overview", "Photos", "Reports", "Approvals", "Maintenance"];

const tabCopy: Record<string, { title: string; text: string }> = {
  Overview: {
    title: "Everything important, in one place.",
    text: "See what happened, what needs approval, what comes next and what has already been closed.",
  },
  Photos: {
    title: "A visual record of the property.",
    text: "Inspection, maintenance and follow-up photography remains attached to the property record.",
  },
  Reports: {
    title: "Reports stay easy to find.",
    text: "Routine checks, observations and completed actions stay organised instead of disappearing into chat threads.",
  },
  Approvals: {
    title: "Decisions stay visible.",
    text: "Owner approvals and agreed authority remain clear before work proceeds.",
  },
  Maintenance: {
    title: "Maintenance stays attached to the property.",
    text: "Issues, technicians, notes and completed matters remain connected to the same record.",
  },
};

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

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function TextRoll({ children }: { children: string }) {
  return (
    <motion.span initial="initial" whileHover="hovered" className={styles.textRoll}>
      <span>
        {children.split("").map((letter, index) => (
          <motion.span
            key={`top-${index}`}
            variants={{ initial: { y: 0 }, hovered: { y: "-105%" } }}
            transition={{ duration: 0.34, delay: index * 0.018, ease: [0.33, 1, 0.68, 1] }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </span>
      <span className={styles.textRollSecond} aria-hidden="true">
        {children.split("").map((letter, index) => (
          <motion.span
            key={`bottom-${index}`}
            variants={{ initial: { y: "105%" }, hovered: { y: 0 } }}
            transition={{ duration: 0.34, delay: index * 0.018, ease: [0.33, 1, 0.68, 1] }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}

export default function DomicileAward() {
  const reduceMotion = useReducedMotion();
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
          form.message.trim().length >= 5
      ),
    [form]
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
          <Image
            src="/domicile/domicile-white.webp"
            alt="DŌMICILE"
            width={1495}
            height={376}
            priority
            unoptimized
          />
        </Link>
        <nav className={styles.nav}>
          <a href="#care"><TextRoll>Care</TextRoll></a>
          <a href="#owner-view"><TextRoll>Owner view</TextRoll></a>
          <a href="#properties"><TextRoll>Properties</TextRoll></a>
          <a href="#faq"><TextRoll>FAQ</TextRoll></a>
        </nav>
        <a href="#enquire" className={styles.headerCta}>START AN ENQUIRY <span>↗</span></a>
      </header>

      <section className={styles.hero}>
        <motion.div
          className={styles.heroImage}
          initial={reduceMotion ? false : { scale: 1.04 }}
          animate={reduceMotion ? undefined : { scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={images.hero}
            alt="DŌMICILE residential estate in Kigali"
            fill
            priority
            unoptimized
            sizes="100vw"
          />
        </motion.div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>PROPERTY MANAGEMENT · KIGALI</p>
          <h1>
            <FlipText className={styles.heroFlip} replayOnHover>
              Your property,
            </FlipText>
            <span className={styles.heroLineBreak} />
            <FlipText className={styles.heroFlip} replayOnHover>
              handled.
            </FlipText>
          </h1>
          <p className={styles.heroLead}>
            One dependable local point of contact for property oversight, maintenance,
            owner-away care and follow-through.
          </p>
          <div className={styles.heroActions}>
            <a href="#enquire" className={styles.primaryCta}>START AN ENQUIRY <span>↗</span></a>
            <a href="#care" className={styles.secondaryCta}>SEE HOW CARE WORKS <span>↓</span></a>
          </div>
        </div>

        <div className={styles.heroAside}>
          <div><small>LOCATION</small><strong>Kigali, Rwanda</strong></div>
          <div><small>MODEL</small><strong>One responsible contact</strong></div>
          <div><small>PRIVACY</small><strong>Private by default</strong></div>
        </div>

        <div className={styles.heroFooter}>
          <span>BACKED BY IMVO GROUP</span>
          <span>24/7 REQUEST CAPTURE</span>
        </div>
      </section>

      <section className={styles.intro}>
        <Reveal className={styles.introCopy}>
          <span className={styles.sectionIndex}>01 / CARE</span>
          <h2>Someone local is actually following through.</h2>
          <p>
            DŌMICILE handles the coordination behind the scenes while you stay informed,
            approve what matters and keep a clear record of the property.
          </p>
          <blockquote>
            “You should not need six conversations to know what happened at your own property.”
          </blockquote>
        </Reveal>
        <Reveal className={styles.introImage}>
          <Image src={images.c1} alt="DŌMICILE private residence" fill unoptimized sizes="(max-width:900px) 100vw, 58vw" />
          <div className={styles.imageCaption}>
            <span>PRIVATE RESIDENCE</span>
            <strong>Routine care active</strong>
          </div>
        </Reveal>
      </section>

      <section className={styles.care} id="care">
        <div className={styles.careHeader}>
          <span className={styles.sectionIndex}>02 / WHAT WE HANDLE</span>
          <h2>Care without the scattered calls.</h2>
          <p>Every layer stays connected to the same property and the same responsible point of contact.</p>
        </div>

        <div className={styles.careGrid}>
          {careItems.map((item, index) => (
            <motion.article
              className={styles.careItem}
              key={item.number}
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src={item.image} alt={item.title} fill unoptimized sizes="(max-width:900px) 100vw, 25vw" />
              <div className={styles.careItemShade} />
              <span className={styles.careNumber}>{item.number}</span>
              <div className={styles.careItemCopy}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className={styles.process}>
          <div><span>01</span><strong>Tell us what needs attention</strong></div>
          <div><span>02</span><strong>Agree the care plan</strong></div>
          <div><span>03</span><strong>DŌMICILE coordinates</strong></div>
          <div><span>04</span><strong>You stay visible</strong></div>
        </div>
      </section>

      <section className={styles.ownerView} id="owner-view">
        <div className={styles.ownerImage}>
          <Image src={images.c1} alt="DŌMICILE Owner View property" fill unoptimized sizes="100vw" />
        </div>
        <div className={styles.ownerOverlay} />
        <Reveal className={styles.ownerHeading}>
          <span className={styles.sectionIndexLight}>03 / OWNER VIEW</span>
          <h2>Visibility without chasing updates.</h2>
          <p>See what happened, what needs approval and what comes next.</p>
        </Reveal>

        <Reveal className={styles.dashboard}>
          <div className={styles.dashboardHeader}>
            <span>OWNER VIEW</span>
            <strong>PROPERTY ACTIVE</strong>
          </div>
          <div className={styles.metrics}>
            <div><small>STATUS</small><strong>ALL GOOD</strong></div>
            <div><small>LAST CHECK</small><strong>TODAY · 09:42</strong></div>
            <div><small>OPEN</small><strong>01</strong></div>
            <div><small>NEXT VISIT</small><strong>27 AUG</strong></div>
          </div>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={activeTab === tab ? styles.activeTab : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className={styles.tabPanel}>
            <span>{activeTab.toUpperCase()}</span>
            <h3>{tabCopy[activeTab].title}</h3>
            <p>{tabCopy[activeTab].text}</p>
            <button type="button">VIEW LATEST REPORT <span>→</span></button>
          </div>
        </Reveal>
      </section>

      <section className={styles.properties} id="properties">
        <div className={styles.propertiesHeader}>
          <span className={styles.sectionIndex}>04 / SELECTED PROPERTIES</span>
          <h2>Real homes.<br />Quietly looked after.</h2>
        </div>
        <div className={styles.propertyList}>
          {properties.map((property, index) => (
            <motion.article
              className={styles.property}
              key={property.number}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.propertyImage}>
                <Image src={property.image} alt={property.title} fill unoptimized sizes="(max-width:900px) 100vw, 65vw" />
              </div>
              <div className={styles.propertyInfo}>
                <div className={styles.propertyStatus}><span>{property.status}</span><b>{property.number}</b></div>
                <div>
                  <h3>{property.title}</h3>
                  <p>{property.meta}</p>
                </div>
                <div className={styles.propertyDetails}>
                  {property.details.map((detail) => <span key={detail}>{detail}</span>)}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.trustFaq} id="faq">
        <Reveal className={styles.trust}>
          <span className={styles.sectionIndex}>05 / BACKED BY IMVO GROUP</span>
          <h2>Built-environment thinking behind the care.</h2>
          <p>
            DŌMICILE combines property coordination with IMVO Group’s design,
            technical and built-environment perspective.
          </p>
          <Image src="/imvo-black.png" alt="IMVO Group" width={360} height={124} unoptimized />
          <Link href="/">VISIT IMVO GROUP <span>↗</span></Link>
        </Reveal>

        <div className={styles.faq}>
          <span className={styles.sectionIndex}>FREQUENTLY ASKED QUESTIONS</span>
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
        </div>
      </section>

      <section className={styles.enquiry} id="enquire">
        <div className={styles.enquiryImage}>
          <Image src={images.street} alt="Residential street under DŌMICILE care" fill unoptimized sizes="(max-width:900px) 100vw, 45vw" />
          <div className={styles.enquiryImageShade} />
          <div className={styles.enquiryIntro}>
            <Image src="/domicile/domicile-white.webp" alt="DŌMICILE" width={1495} height={376} unoptimized />
            <span className={styles.sectionIndexLight}>START WITH A CONVERSATION</span>
            <h2>Tell us about your property.</h2>
            <p>Share the essentials. We will contact you to understand the property and what you need.</p>
            <div className={styles.contactLines}>
              <a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">+250 799 409 409</a>
              <span>KIGALI · RWANDA</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {isSubmitted ? (
            <div className={styles.success}>
              <span className={styles.sectionIndex}>ENQUIRY RECEIVED</span>
              <h3>Thank you. DŌMICILE has your message.</h3>
              <p>Our team will review the property need and contact you using the details provided.</p>
              <button type="button" onClick={() => setIsSubmitted(false)}>SEND ANOTHER ENQUIRY</button>
            </div>
          ) : (
            <>
              <div className={styles.formHeader}>
                <div>
                  <span className={styles.sectionIndex}>PROPERTY ENQUIRY</span>
                  <h3>What should we know?</h3>
                </div>
                <p>We normally respond personally after reviewing the details.</p>
              </div>

              <input
                className={styles.honeypot}
                value={form.botcheck}
                onChange={(event) => setForm((value) => ({ ...value, botcheck: event.target.value }))}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className={styles.formGrid}>
                <label><span>Full name</span><input value={form.name} onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))} placeholder="Your name" /></label>
                <label><span>Phone / WhatsApp</span><input value={form.phone} onChange={(e) => setForm((v) => ({ ...v, phone: e.target.value }))} placeholder="+250 …" /></label>
                <label><span>Email</span><input type="email" value={form.email} onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))} placeholder="you@example.com" /></label>
                <label><span>Property location</span><input value={form.location} onChange={(e) => setForm((v) => ({ ...v, location: e.target.value }))} placeholder="e.g. Kacyiru, Kigali" /></label>
                <label><span>Property type</span><select value={form.propertyType} onChange={(e) => setForm((v) => ({ ...v, propertyType: e.target.value }))}><option value="">Select property type</option><option>House</option><option>Apartment</option><option>Commercial</option><option>Other</option></select></label>
                <label><span>What do you need?</span><select value={form.helpWith} onChange={(e) => setForm((v) => ({ ...v, helpWith: e.target.value }))}><option value="">Select what you need</option><option>Ongoing property management</option><option>Owner-away care</option><option>Maintenance or repair</option><option>Property inspection</option><option>An urgent property issue</option><option>One-off property support</option><option>Other</option></select></label>
              </div>

              <label className={styles.messageField}>
                <span>Message</span>
                <textarea value={form.message} onChange={(e) => setForm((v) => ({ ...v, message: e.target.value }))} placeholder="Tell us what the property needs…" />
              </label>

              {error ? <p className={styles.error}>{error}</p> : null}
              <div className={styles.formFooter}>
                <div><span>PRIVATE BY DEFAULT</span><span>PERSONAL FOLLOW-UP</span></div>
                <button type="submit" disabled={!formReady || isSubmitting}>{isSubmitting ? "SENDING…" : "SEND TO DŌMICILE"} <span>↗</span></button>
              </div>
            </>
          )}
        </form>
      </section>

      <footer className={styles.footer}>
        <Image src="/domicile/domicile-white.webp" alt="DŌMICILE" width={1495} height={376} unoptimized />
        <div>
          <span>PROPERTY MANAGEMENT BY IMVO GROUP</span>
          <a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
          <Link href="/">IMVO Group</Link>
        </div>
      </footer>
    </main>
  );
}
