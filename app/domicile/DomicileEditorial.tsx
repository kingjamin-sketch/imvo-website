"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import styles from "./DomicileEditorial.module.css";

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_DOMICILE_WEB3FORMS_KEY ||
  "566d4852-a822-4432-83ba-8d522618ee66";

const whatsappUrl =
  "https://wa.me/250799409409?text=" +
  encodeURIComponent(
    "Hello DŌMICILE, I would like to discuss property management with your team."
  );

const images = {
  hero: "/domicile/exact/estate-hero.jpg",
  c1: "/domicile/exact/estate-c1.jpg",
  street: "/domicile/exact/estate-street.jpg",
  privateResidence: "/domicile/exact/estate-c1.jpg",
  residentialEstate: "/domicile/exact/estate-hero.jpg",
  privateHome: "/domicile/exact/estate-street.jpg",
};

const explanation = [
  {
    number: "01",
    title: "We understand the property",
    text: "We establish the home, access arrangements, priorities, contacts and the level of authority you want DŌMICILE to hold.",
  },
  {
    number: "02",
    title: "We become the local point of contact",
    text: "Routine checks, technicians, repairs and property matters move through one responsible desk instead of several disconnected conversations.",
  },
  {
    number: "03",
    title: "You approve what matters",
    text: "Costs, works and decisions that require your authority stay visible and are confirmed before action, except where agreed emergency authority applies.",
  },
  {
    number: "04",
    title: "You keep the record",
    text: "Photos, notes, reports, approvals and completed matters stay connected to the same property so you can see what happened and what comes next.",
  },
];

const propertyStories = [
  {
    number: "01",
    title: "Private residence",
    status: "ROUTINE CARE ACTIVE",
    image: images.privateResidence,
    copy: "Scheduled checks, issue follow-through and one clear local contact for the owner.",
  },
  {
    number: "02",
    title: "Residential estate",
    status: "INSPECTION SCHEDULED",
    image: images.residentialEstate,
    copy: "Property readiness, maintenance coordination and owner visibility kept in one place.",
  },
  {
    number: "03",
    title: "Private home",
    status: "OWNER-AWAY CARE",
    image: images.privateHome,
    copy: "Local presence while the owner is away, with private reporting and direct escalation when needed.",
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
    text: "Inspection, maintenance and follow-up photography stays attached to the property record.",
  },
  Reports: {
    title: "Reports stay easy to find.",
    text: "Routine checks, observations and completed actions stay organised instead of disappearing into message threads.",
  },
  Approvals: {
    title: "Decisions stay visible.",
    text: "Owner approvals and agreed authority remain clear before work proceeds.",
  },
  Maintenance: {
    title: "Maintenance stays connected.",
    text: "Issues, technicians, notes and completed matters remain attached to the same property record.",
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
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Roll({ children }: { children: string }) {
  return (
    <motion.span initial="rest" whileHover="hover" className={styles.roll}>
      <span className={styles.rollTop}>
        {children.split("").map((character, index) => (
          <motion.span
            key={`a-${index}`}
            variants={{ rest: { y: 0 }, hover: { y: "-110%" } }}
            transition={{ duration: 0.34, delay: index * 0.016, ease: [0.33, 1, 0.68, 1] }}
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        ))}
      </span>
      <span className={styles.rollBottom} aria-hidden="true">
        {children.split("").map((character, index) => (
          <motion.span
            key={`b-${index}`}
            variants={{ rest: { y: "110%" }, hover: { y: 0 } }}
            transition={{ duration: 0.34, delay: index * 0.016, ease: [0.33, 1, 0.68, 1] }}
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}

export default function DomicileEditorial() {
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState("Overview");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const formReady = useMemo(() => {
    const email = form.email.trim();
    const emailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const hasContact = Boolean(form.phone.trim() || email);

    return Boolean(
      form.name.trim() &&
        hasContact &&
        emailValid &&
        form.location.trim() &&
        form.propertyType &&
        form.helpWith
    );
  }, [form]);

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
          replyto: form.email || undefined,
          name: form.name,
          phone_whatsapp: form.phone || "Not provided",
          email: form.email || "Not provided",
          property_location: form.location,
          property_type: form.propertyType,
          help_with: form.helpWith,
          message: form.message.trim() || "No additional message provided.",
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
          <Image src="/domicile/domicile-white.webp" alt="DŌMICILE" width={1495} height={376} priority unoptimized />
        </Link>
        <nav className={styles.nav}>
          <a href="#explained"><Roll>How it works</Roll></a>
          <a href="#care"><Roll>Care</Roll></a>
          <a href="#owner-view"><Roll>Owner view</Roll></a>
          <a href="#properties"><Roll>Properties</Roll></a>
        </nav>
        <a href="#enquire" className={styles.headerCta}>START AN ENQUIRY <span>↗</span></a>
      </header>

      <section className={styles.hero}>
        <motion.div
          className={styles.heroPhoto}
          initial={reduceMotion ? false : { scale: 1.035 }}
          animate={reduceMotion ? undefined : { scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src={images.hero} alt="Residential estate in Kigali" fill priority unoptimized sizes="100vw" />
        </motion.div>
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>PROPERTY MANAGEMENT · KIGALI</p>
          <h1>Your property,<br />handled.</h1>
          <p className={styles.heroLead}>One dependable local point of contact for property oversight, maintenance, owner-away care and follow-through.</p>
          <div className={styles.heroActions}>
            <a href="#enquire" className={styles.primaryButton}>START AN ENQUIRY <span>↗</span></a>
            <a href="#explained" className={styles.ghostButton}>UNDERSTAND DŌMICILE <span>↓</span></a>
          </div>
        </div>
        <div className={styles.heroFacts}>
          <div><small>01</small><span>KIGALI BASED</span></div>
          <div><small>02</small><span>ONE RESPONSIBLE CONTACT</span></div>
          <div><small>03</small><span>PRIVATE BY DEFAULT</span></div>
        </div>
      </section>

      <section className={styles.explained} id="explained">
        <div className={styles.explainedPhoto}>
          <Image src={images.c1} alt="DŌMICILE residential care" fill unoptimized sizes="(max-width: 900px) 100vw, 52vw" />
          <div className={styles.quoteCard}>
            <p>“You should not need six conversations to know what happened at your own property.”</p>
          </div>
          <div className={styles.photoLabel}><span>PRIVATE RESIDENCE</span><strong>Routine care active</strong></div>
        </div>
        <div className={styles.explainedCopy}>
          <span className={styles.sectionTag}>01 / DŌMICILE EXPLAINED</span>
          <h2>What DŌMICILE actually does.</h2>
          <p className={styles.explainedLead}>DŌMICILE is the local operating layer between you and everything that needs attention at your property. Instead of coordinating inspectors, technicians, repairs, access and updates separately, you have one responsible point of contact.</p>
          <div className={styles.explanationList}>
            {explanation.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.photoEssay} id="care">
        <div className={styles.photoEssayIntro}>
          <span className={styles.sectionTagLight}>02 / CARE IN PRACTICE</span>
          <h2>The property stays visible. The coordination stays quiet.</h2>
          <p>Photography is part of the record—not decoration. The home, the issue, the work and the follow-up remain easy to understand.</p>
        </div>
        <div className={styles.photoEssayGrid}>
          <Reveal className={`${styles.essayPhoto} ${styles.essayPhotoMain}`}>
            <Image src={images.street} alt="Residential estate street in Kigali" fill unoptimized sizes="(max-width:900px) 100vw, 58vw" />
            <div className={styles.essayCaption}><span>01</span><strong>PROPERTY OVERSIGHT</strong><p>Scheduled checks and a dependable local presence.</p></div>
          </Reveal>
          <Reveal className={`${styles.essayPhoto} ${styles.essayPhotoTall}`}>
            <Image src={images.hero} alt="Residential estate under DŌMICILE care" fill unoptimized sizes="(max-width:900px) 100vw, 38vw" />
            <div className={styles.essayCaption}><span>02</span><strong>MAINTENANCE & REPAIRS</strong><p>Issues scoped, coordinated and followed through.</p></div>
          </Reveal>
          <Reveal className={styles.statementCard}>
            <span>OWNER-AWAY CARE</span>
            <p>Local presence when you are not in Kigali—with the record kept clear for you.</p>
          </Reveal>
          <Reveal className={styles.statementCardDark}>
            <span>PROPERTY WORKS</span>
            <p>Repairs and improvements coordinated with clear owner approval before action.</p>
          </Reveal>
        </div>
      </section>

      <section className={styles.ownerView} id="owner-view">
        <div className={styles.ownerPhoto}>
          <Image src={images.c1} alt="Owner View property" fill unoptimized sizes="100vw" />
        </div>
        <div className={styles.ownerShade} />
        <div className={styles.ownerHeading}>
          <span className={styles.sectionTagLight}>03 / OWNER VIEW</span>
          <h2>Visibility without chasing updates.</h2>
          <p>See what happened, what needs approval and what comes next.</p>
        </div>
        <div className={styles.dashboard}>
          <div className={styles.dashboardTop}><strong>OWNER VIEW</strong><span>PROPERTY ACTIVE</span></div>
          <div className={styles.metrics}>
            <div><small>STATUS</small><strong>ALL GOOD</strong></div>
            <div><small>LAST CHECK</small><strong>TODAY · 09:42</strong></div>
            <div><small>OPEN</small><strong>01</strong></div>
            <div><small>NEXT VISIT</small><strong>27 AUG</strong></div>
          </div>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={activeTab === tab ? styles.activeTab : ""}>{tab}</button>
            ))}
          </div>
          <div className={styles.tabPanel}>
            <span>{activeTab.toUpperCase()}</span>
            <h3>{tabCopy[activeTab].title}</h3>
            <p>{tabCopy[activeTab].text}</p>
            <button type="button">VIEW LATEST REPORT →</button>
          </div>
        </div>
      </section>

      <section className={styles.properties} id="properties">
        <div className={styles.propertiesHeading}>
          <span className={styles.sectionTag}>04 / SELECTED PROPERTIES</span>
          <h2>Real homes.<br />Quietly looked after.</h2>
          <p>These visual examples show the kind of residential environments DŌMICILE is designed to care for.</p>
        </div>
        <div className={styles.propertyStories}>
          {propertyStories.map((property, index) => (
            <Reveal key={property.number} className={styles.propertyStory}>
              <div className={styles.propertyPhoto}>
                <Image src={property.image} alt={property.title} fill unoptimized sizes="(max-width:900px) 100vw, 68vw" />
              </div>
              <div className={styles.propertyCopy}>
                <div><small>{property.status}</small><span>{property.number}</span></div>
                <h3>{property.title}</h3>
                <p>{property.copy}</p>
                <a href="#enquire">DISCUSS YOUR PROPERTY <span>↗</span></a>
              </div>
              {index === 0 ? <div className={styles.propertyQuote}>Care should feel quiet because someone responsible is already following through.</div> : null}
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.trustFaq} id="faq">
        <div className={styles.trust}>
          <span className={styles.sectionTag}>BACKED BY IMVO GROUP</span>
          <h2>Property care with built-environment thinking behind it.</h2>
          <p>DŌMICILE combines day-to-day property coordination with IMVO Group’s design, technical and built-environment perspective.</p>
          <Image src="/logo.png" alt="IMVO Group" width={500} height={180} unoptimized />
          <Link href="/">VISIT IMVO GROUP <span>↗</span></Link>
        </div>
        <div className={styles.faq}>
          <span className={styles.sectionTag}>FREQUENTLY ASKED QUESTIONS</span>
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
          <Image src={images.street} alt="Residential street cared for by DŌMICILE" fill unoptimized sizes="(max-width:900px) 100vw, 44vw" />
          <div className={styles.enquiryOverlay} />
          <div className={styles.enquiryIntro}>
            <Image src="/domicile/domicile-white.webp" alt="DŌMICILE" width={1495} height={376} unoptimized />
            <span className={styles.sectionTagLight}>START WITH A CONVERSATION</span>
            <h2>Tell us about your property.</h2>
            <p>This is an enquiry, not a registration. We’ll contact you to understand the property and what you need.</p>
            <div><a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a><a href={whatsappUrl} target="_blank" rel="noreferrer">+250 799 409 409</a><span>KIGALI · RWANDA</span></div>
          </div>
        </div>
        <div className={styles.formSide}>
          <div className={styles.formHeading}><span>PROPERTY ENQUIRY</span><h3>What should we know?</h3><p>A first conversation is enough to start. Phone or email is enough.</p></div>
          {isSubmitted ? (
            <div className={styles.success}><span>ENQUIRY RECEIVED</span><h3>Thank you.</h3><p>We’ll review the details and contact you directly.</p><button type="button" onClick={() => setIsSubmitted(false)}>SEND ANOTHER ENQUIRY</button></div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <input className={styles.botcheck} type="checkbox" name="botcheck" value={form.botcheck} onChange={(e) => setForm({ ...form, botcheck: e.target.checked ? "1" : "" })} tabIndex={-1} autoComplete="off" />
              <label>Full name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>
              <label>Phone / WhatsApp (or email)<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+250 ..." /></label>
              <label>Email (or phone)<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label>
              <label>Property location<input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Kacyiru, Kigali" /></label>
              <label>Property type<select value={form.propertyType} onChange={(e) => setForm({ ...form, propertyType: e.target.value })}><option value="">Select property type</option><option>Private residence</option><option>Apartment / condominium</option><option>Residential estate</option><option>Commercial property</option><option>Other</option></select></label>
              <label>What do you need?<select value={form.helpWith} onChange={(e) => setForm({ ...form, helpWith: e.target.value })}><option value="">Select what you need</option><option>Ongoing property management</option><option>Owner-away care</option><option>Maintenance coordination</option><option>Property inspection</option><option>One-off property support</option><option>Not sure yet</option></select></label>
              <label className={styles.message}>Message (optional)<textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us what the property needs, if there is anything else we should know..." /></label>
              <div className={styles.formFooter}><button type="submit" disabled={!formReady || isSubmitting}>{isSubmitting ? "SENDING..." : "SEND TO DŌMICILE ↗"}</button><span>PRIVATE BY DEFAULT · DIRECT FOLLOW-UP</span></div>
              {error ? <p className={styles.formError}>{error}</p> : null}
            </form>
          )}
        </div>
      </section>

      <footer className={styles.footer}>
        <Image src="/domicile/domicile-white.webp" alt="DŌMICILE" width={1495} height={376} unoptimized />
        <span>PROPERTY MANAGEMENT BY IMVO GROUP</span>
        <div><a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a><a href={whatsappUrl} target="_blank" rel="noreferrer">WHATSAPP</a><Link href="/">IMVO GROUP</Link></div>
      </footer>
    </main>
  );
}
