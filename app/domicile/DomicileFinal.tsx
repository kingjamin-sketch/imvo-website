"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import styles from "./DomicileFinal.module.css";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_DOMICILE_WEB3FORMS_KEY || "566d4852-a822-4432-83ba-8d522618ee66";
const whatsappUrl = "https://wa.me/250799409409?text=" + encodeURIComponent("Hello DŌMICILE, I would like to discuss property management with your team.");

const properties = [
  { title: "Private Residence", meta: "Routine care active", status: "ALL GOOD", image: "/domicile/properties/property-c1.webp", fallback: "/chosen/casa-lumara.webp" },
  { title: "Residential Estate", meta: "Next visit scheduled", status: "INSPECTION DUE", image: "/domicile/properties/property-estate.webp", fallback: "/chosen/aurelian-villa.webp" },
  { title: "Private Home", meta: "Owner-away care active", status: "OWNER AWAY", image: "/domicile/properties/property-street.webp", fallback: "/chosen/atria-residence.webp" },
];

const careItems = [
  { number: "01", title: "Property oversight", text: "Scheduled checks, readiness and a reliable local presence.", image: "/domicile/properties/property-c1.webp", fallback: "/chosen/casa-lumara.webp" },
  { number: "02", title: "Maintenance & repairs", text: "Scope, coordinate and follow through without passing the owner from person to person.", image: "/domicile/properties/property-estate.webp", fallback: "/chosen/aurelian-villa.webp" },
  { number: "03", title: "Owner-away care", text: "Local presence when you are not in Kigali, with a clear record of what happened.", image: "/domicile/properties/property-street.webp", fallback: "/chosen/atria-residence.webp" },
  { number: "04", title: "Property works", text: "Repairs and improvements with clear owner approval before action.", image: "/chosen/casa-forma.webp", fallback: "/chosen/casa-palma.webp" },
];

const processSteps = [
  ["01", "Tell us what needs attention"],
  ["02", "Agree the care plan"],
  ["03", "DŌMICILE coordinates"],
  ["04", "You stay visible"],
];

const faqItems = [
  ["Do I need to live outside Rwanda?", "No. DŌMICILE is for owners abroad, frequent travellers and Kigali-based owners who want reliable delegated property care."],
  ["Can you manage one property only?", "Yes. The service can be shaped around one home, several properties or a defined one-off need."],
  ["How are repairs approved?", "The approval process is agreed during onboarding. Work requiring owner approval does not proceed until authority is confirmed."],
  ["What happens if something is urgent?", "The matter is triaged, the owner is contacted and DŌMICILE acts within any pre-agreed emergency authority where applicable."],
  ["Will my property appear on the website?", "No, not by default. Client properties and identifying information are public only when the owner has explicitly agreed."],
  ["Which areas do you serve?", "DŌMICILE is currently focused on properties across Kigali, Rwanda."],
];

type FormState = { name: string; phone: string; email: string; location: string; propertyType: string; helpWith: string; message: string; botcheck: string };
const initialForm: FormState = { name: "", phone: "", email: "", location: "", propertyType: "", helpWith: "", message: "", botcheck: "" };

function SafeImage({ src, fallback, alt, priority = false, sizes = "100vw", className = "" }: { src: string; fallback: string; alt: string; priority?: boolean; sizes?: string; className?: string }) {
  const [current, setCurrent] = useState(src);
  return <Image src={current} alt={alt} fill priority={priority} unoptimized sizes={sizes} className={className} onError={() => current !== fallback && setCurrent(fallback)} />;
}

function TextRoll({ children, className = "" }: { children: string; className?: string }) {
  return (
    <motion.span initial="initial" whileHover="hovered" className={`${styles.textRoll} ${className}`}>
      <span>{children.split("").map((letter, i) => <motion.span key={`a-${i}`} variants={{ initial: { y: 0 }, hovered: { y: "-105%" } }} transition={{ duration: .34, delay: i * .02, ease: [0.33, 1, 0.68, 1] }}>{letter === " " ? "\u00A0" : letter}</motion.span>)}</span>
      <span className={styles.textRollSecond} aria-hidden="true">{children.split("").map((letter, i) => <motion.span key={`b-${i}`} variants={{ initial: { y: "105%" }, hovered: { y: 0 } }} transition={{ duration: .34, delay: i * .02, ease: [0.33, 1, 0.68, 1] }}>{letter === " " ? "\u00A0" : letter}</motion.span>)}</span>
    </motion.span>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: .72, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

export default function DomicileFinal() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.07]), { stiffness: 85, damping: 24 });
  const heroY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 54]), { stiffness: 85, damping: 24 });
  const [activeTab, setActiveTab] = useState("Overview");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const formReady = useMemo(() => Boolean(form.name.trim() && form.phone.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) && form.location.trim() && form.propertyType && form.helpWith && form.message.trim().length >= 5), [form]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formReady || form.botcheck) return;
    setIsSubmitting(true); setError("");
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, subject: `New DŌMICILE enquiry — ${form.name} — ${form.location}`, from_name: "DŌMICILE by IMVO Group", replyto: form.email, name: form.name, phone_whatsapp: form.phone, email: form.email, property_location: form.location, property_type: form.propertyType, help_with: form.helpWith, message: form.message, botcheck: "" }) });
      const result = await response.json();
      if (!response.ok || !result?.success) throw new Error("Submission failed");
      setIsSubmitted(true); setForm(initialForm);
    } catch { setError("We could not send the enquiry just now. Please try again or continue on WhatsApp."); }
    finally { setIsSubmitting(false); }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/domicile" className={styles.brand} aria-label="DŌMICILE home"><Image src="/domicile/domicile-white.webp" alt="DŌMICILE" width={1495} height={376} priority unoptimized /></Link>
        <nav className={styles.nav}><a href="#care"><TextRoll>Care</TextRoll></a><a href="#owner-view"><TextRoll>Owner view</TextRoll></a><a href="#properties"><TextRoll>Properties</TextRoll></a><a href="#faq"><TextRoll>FAQ</TextRoll></a></nav>
        <a href="#enquire" className={styles.headerCta}>START AN ENQUIRY <span>↗</span></a>
      </header>

      <section className={styles.hero} ref={heroRef}>
        <motion.div className={styles.heroMedia} style={reduceMotion ? undefined : { scale: heroScale, y: heroY }}><SafeImage src="/domicile/properties/property-estate.webp" fallback="/chosen/aurelian-villa.webp" alt="Residential property under DŌMICILE care" priority /></motion.div>
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <div className={styles.heroKicker}>PROPERTY MANAGEMENT · KIGALI</div>
          <h1><TextRoll>Your property,</TextRoll><br /><TextRoll>handled.</TextRoll></h1>
          <p>One dependable local point of contact for the care, maintenance and coordination of your property.</p>
          <div className={styles.heroActions}><a href="#enquire">START AN ENQUIRY <span>↗</span></a><a href="#care">SEE HOW CARE WORKS <span>↓</span></a></div>
        </div>
        <motion.div className={`${styles.floatCard} ${styles.floatOne}`} animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [-2.5, -1, -2.5] }} transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}><SafeImage src="/domicile/properties/property-c1.webp" fallback="/chosen/casa-lumara.webp" alt="Routine property care" sizes="240px" /><div><small>ROUTINE CARE</small><strong>Private residence</strong></div></motion.div>
        <motion.div className={`${styles.floatCard} ${styles.floatTwo}`} animate={reduceMotion ? undefined : { y: [0, 9, 0], rotate: [3, 1.5, 3] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}><SafeImage src="/domicile/properties/property-street.webp" fallback="/chosen/atria-residence.webp" alt="Owner-away property care" sizes="210px" /><div><small>OWNER AWAY</small><strong>Local presence</strong></div></motion.div>
        <div className={styles.heroMeta}><span>PRIVATE BY DEFAULT</span><span>BACKED BY IMVO GROUP</span><span>24/7 REQUEST CAPTURE</span></div>
      </section>

      <section className={styles.promise}>
        <Reveal className={styles.promiseCopy}><small>ONE PROPERTY. ONE RESPONSIBLE CONTACT.</small><h2>Someone local is actually following through.</h2><p>DŌMICILE handles the coordination behind the scenes while you stay informed, approve what matters and keep a clear record of the property.</p><div className={styles.factRow}><span>KIGALI, RWANDA</span><span>PRIVATE BY DEFAULT</span><span>OWNER VISIBILITY</span></div></Reveal>
        <Reveal className={styles.promisePhoto}><SafeImage src="/domicile/properties/property-c1.webp" fallback="/chosen/casa-lumara.webp" alt="Private residence under DŌMICILE care" sizes="(max-width:900px) 100vw, 54vw" /><div className={styles.photoStatus}><small>PRIVATE RESIDENCE</small><strong>Routine care active</strong></div><blockquote>“You should not need six conversations to know what happened at your own property.”</blockquote></Reveal>
      </section>

      <section className={styles.careScene} id="care">
        <div className={styles.careIntro}><small>WHAT WE HANDLE</small><h2>Care, without the scattered calls.</h2><p>Each layer stays connected to the same property record and the same responsible point of contact.</p></div>
        <div className={styles.careRail}>{careItems.map((item, index) => <motion.article key={item.title} className={styles.careCard} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: .65, delay: index * .06 }} whileHover={reduceMotion ? undefined : { y: -8 }}><SafeImage src={item.image} fallback={item.fallback} alt={item.title} sizes="(max-width:900px) 86vw, 25vw" /><div className={styles.careShade} /><span>{item.number}</span><h3><TextRoll>{item.title}</TextRoll></h3><p>{item.text}</p></motion.article>)}</div>
        <div className={styles.processStrip}>{processSteps.map(([number, title]) => <div key={number}><span>{number}</span><strong>{title}</strong></div>)}</div>
      </section>

      <section className={styles.ownerView} id="owner-view">
        <div className={styles.ownerBackdrop}><SafeImage src="/domicile/properties/property-street.webp" fallback="/chosen/casa-palma.webp" alt="Private home under DŌMICILE care" sizes="100vw" /></div>
        <div className={styles.ownerShade} />
        <Reveal className={styles.ownerHeadline}><small>YOUR PROPERTY, AT A GLANCE</small><h2>Visibility without chasing updates.</h2><p>See what happened, what needs approval and what comes next.</p></Reveal>
        <Reveal className={styles.dashboard}><div className={styles.dashboardTop}><Image src="/domicile/logo-icon-black.svg" alt="" width={28} height={36} /><span>OWNER VIEW</span><b>PROPERTY ACTIVE</b></div><div className={styles.metrics}><div><small>STATUS</small><strong>ALL GOOD</strong></div><div><small>LAST CHECK</small><strong>TODAY · 09:42</strong></div><div><small>OPEN</small><strong>01</strong></div><div><small>NEXT VISIT</small><strong>27 AUG</strong></div></div><div className={styles.tabs}>{["Overview", "Photos", "Reports", "Approvals", "Maintenance"].map(tab => <button key={tab} type="button" className={activeTab === tab ? styles.activeTab : ""} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div><div className={styles.tabBody}><small>{activeTab.toUpperCase()}</small><h3>{activeTab === "Overview" ? "Everything important, in one place." : `${activeTab} stay attached to the property record.`}</h3><p>Photos, notes, approvals and completed matters remain visible without chasing multiple people.</p><button type="button">VIEW LATEST REPORT <span>→</span></button></div></Reveal>
      </section>

      <section className={styles.properties} id="properties">
        <div className={styles.propertiesHead}><small>SELECTED PROPERTIES UNDER CARE</small><h2>Real homes.<br />Quietly looked after.</h2></div>
        <div className={styles.propertyList}>{properties.map((property, index) => <motion.article key={property.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: .7, delay: index * .05 }}><div className={styles.propertyImage}><SafeImage src={property.image} fallback={property.fallback} alt={property.title} sizes="(max-width:900px) 100vw, 62vw" /></div><div className={styles.propertyInfo}><span>{property.status}</span><h3>{property.title}</h3><p>{property.meta}</p><b>0{index + 1}</b></div></motion.article>)}</div>
      </section>

      <section className={styles.trustFaq} id="faq">
        <div className={styles.imvoBlock}><small>BACKED BY IMVO GROUP</small><h2>Built-environment thinking behind the care.</h2><p>DŌMICILE combines property coordination with IMVO Group’s design, technical and built-environment perspective.</p><Image src="/imvo-black.png" alt="IMVO Group" width={360} height={124} unoptimized /><Link href="/">VISIT IMVO GROUP <span>↗</span></Link></div>
        <div className={styles.faqBlock}><small>FREQUENTLY ASKED QUESTIONS</small><div className={styles.faqList}>{faqItems.map(([q, a], index) => <article key={q} className={openFaq === index ? styles.faqOpen : ""}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{q}</strong><b>{openFaq === index ? "−" : "+"}</b></button><div><p>{a}</p></div></article>)}</div></div>
      </section>

      <section className={styles.enquiry} id="enquire">
        <div className={styles.enquiryIntro}><Image src="/domicile/domicile-white.webp" alt="DŌMICILE" width={1495} height={376} unoptimized /><small>START WITH A CONVERSATION</small><h2>Tell us about your property.</h2><p>This is an enquiry, not a registration. We will contact you to understand the property and what you need.</p><div><a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a><a href={whatsappUrl} target="_blank" rel="noreferrer">+250 799 409 409</a><span>KIGALI · RWANDA</span></div></div>
        <form onSubmit={handleSubmit} className={styles.form}>{isSubmitted ? <div className={styles.success}><small>ENQUIRY RECEIVED</small><h3>Thank you. DŌMICILE has your message.</h3><p>Our team will review the property need and contact you using the details provided.</p><button type="button" onClick={() => setIsSubmitted(false)}>SEND ANOTHER ENQUIRY</button></div> : <><input className={styles.honeypot} value={form.botcheck} onChange={e => setForm(v => ({ ...v, botcheck: e.target.value }))} tabIndex={-1} autoComplete="off" aria-hidden="true" /><div className={styles.formGrid}><label><span>Full name</span><input value={form.name} onChange={e => setForm(v => ({ ...v, name: e.target.value }))} placeholder="Your name" /></label><label><span>Phone / WhatsApp</span><input value={form.phone} onChange={e => setForm(v => ({ ...v, phone: e.target.value }))} placeholder="+250 …" /></label><label><span>Email</span><input type="email" value={form.email} onChange={e => setForm(v => ({ ...v, email: e.target.value }))} placeholder="you@example.com" /></label><label><span>Property location</span><input value={form.location} onChange={e => setForm(v => ({ ...v, location: e.target.value }))} placeholder="e.g. Kacyiru, Kigali" /></label><label><span>Property type</span><select value={form.propertyType} onChange={e => setForm(v => ({ ...v, propertyType: e.target.value }))}><option value="">Select property type</option><option>House</option><option>Apartment</option><option>Commercial</option><option>Other</option></select></label><label><span>What do you need?</span><select value={form.helpWith} onChange={e => setForm(v => ({ ...v, helpWith: e.target.value }))}><option value="">Select what you need</option><option>Ongoing property management</option><option>Owner-away care</option><option>Maintenance or repair</option><option>Property inspection</option><option>An urgent property issue</option><option>One-off property support</option><option>Other</option></select></label></div><label className={styles.message}><span>Message</span><textarea value={form.message} onChange={e => setForm(v => ({ ...v, message: e.target.value }))} placeholder="Tell us what the property needs…" /></label>{error ? <p className={styles.error}>{error}</p> : null}<button className={styles.submit} disabled={!formReady || isSubmitting}>{isSubmitting ? "SENDING…" : "SEND TO DŌMICILE"} <span>↗</span></button></>}</form>
      </section>

      <footer className={styles.footer}><Image src="/domicile/domicile-white.webp" alt="DŌMICILE" width={1495} height={376} unoptimized /><div><span>PROPERTY MANAGEMENT BY IMVO GROUP</span><a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a><Link href="/">IMVO Group</Link></div></footer>
    </main>
  );
}
