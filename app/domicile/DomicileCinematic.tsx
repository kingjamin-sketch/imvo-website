"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "./DomicileCinematic.module.css";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_DOMICILE_WEB3FORMS_KEY || "566d4852-a822-4432-83ba-8d522618ee66";
const whatsappUrl = "https://wa.me/250799409409?text=" + encodeURIComponent("Hello DŌMICILE, I would like to discuss property management with your team.");

const properties = [
  { title: "Private Residence", meta: "Routine care active", status: "ALL GOOD", image: "/domicile/properties/property-c1.webp" },
  { title: "Residential Estate", meta: "Next visit scheduled", status: "INSPECTION DUE", image: "/domicile/properties/property-estate.webp" },
  { title: "Private Home", meta: "Owner-away care active", status: "OWNER AWAY", image: "/domicile/properties/property-street.webp" },
];

const processSteps = [
  ["01", "Tell us what needs attention", "Start with the property, the matter and the outcome you need."],
  ["02", "We agree the care plan", "Access, approvals, reporting and responsibility are made clear first."],
  ["03", "DŌMICILE coordinates", "Visits, technicians, repairs and owner decisions move through one point of contact."],
  ["04", "You stay visible", "Photos, reports, approvals and completed matters stay attached to the property record."],
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

function TextRoll({ children, className = "" }: { children: string; className?: string }) {
  return (
    <motion.span initial="initial" whileHover="hovered" className={`${styles.textRoll} ${className}`}>
      <span>{children.split("").map((l, i) => <motion.span key={`a-${i}`} variants={{ initial: { y: 0 }, hovered: { y: "-105%" } }} transition={{ duration: .34, delay: i * .022, ease: [0.33, 1, 0.68, 1] }}>{l === " " ? "\u00A0" : l}</motion.span>)}</span>
      <span className={styles.textRollSecond} aria-hidden="true">{children.split("").map((l, i) => <motion.span key={`b-${i}`} variants={{ initial: { y: "105%" }, hovered: { y: 0 } }} transition={{ duration: .34, delay: i * .022, ease: [0.33, 1, 0.68, 1] }}>{l === " " ? "\u00A0" : l}</motion.span>)}</span>
    </motion.span>
  );
}

export default function DomicileCinematic() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 92]);
  const rawFade = useTransform(scrollYProgress, [0, .85], [1, .12]);
  const imageScale = useSpring(rawScale, { stiffness: 90, damping: 24 });
  const imageY = useSpring(rawY, { stiffness: 90, damping: 24 });
  const heroFade = useSpring(rawFade, { stiffness: 90, damping: 24 });

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
        <Link href="/domicile" className={styles.brand} aria-label="DŌMICILE home"><Image src="/domicile/domicile-white-no-tagline.svg" alt="DŌMICILE" width={1495} height={292} priority /></Link>
        <nav className={styles.nav}><a href="#care"><TextRoll>Care</TextRoll></a><a href="#owner-view"><TextRoll>Owner view</TextRoll></a><a href="#properties"><TextRoll>Properties</TextRoll></a><a href="#faq"><TextRoll>FAQ</TextRoll></a></nav>
        <a className={styles.headerCta} href="#enquire">START AN ENQUIRY <span>↗</span></a>
      </header>

      <section className={styles.hero} ref={heroRef}>
        <motion.div className={styles.heroMedia} style={reduceMotion ? undefined : { scale: imageScale, y: imageY }}>
          <Image src="/domicile/properties/property-estate.webp" alt="Residential estate under DŌMICILE care in Kigali" fill priority unoptimized sizes="100vw" />
        </motion.div>
        <div className={styles.heroShade} />
        <motion.div className={styles.heroContent} style={reduceMotion ? undefined : { opacity: heroFade }}>
          <div className={styles.heroTrust}>PROPERTIES UNDER CARE · KIGALI</div>
          <h1><TextRoll className={styles.heroRoll}>Your property,</TextRoll><br /><TextRoll className={styles.heroRoll}>handled.</TextRoll></h1>
          <div className={styles.askBar}><span>What needs attention at your property?</span><a href="#enquire">ASK DŌMICILE <b>↗</b></a></div>
          <p className={styles.heroLead}>One dependable local point of contact for property oversight, maintenance, owner-away care and follow-through.</p>
        </motion.div>

        <motion.aside className={`${styles.sidePanel} ${styles.sideLeft}`} animate={reduceMotion ? undefined : { y: [0, -7, 0] }} transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}>
          <small>AT THE PROPERTY</small><span>01 · Routine inspections</span><span>02 · Maintenance coordination</span><span>03 · Repair follow-through</span><span>04 · Urgent response</span>
        </motion.aside>
        <motion.aside className={`${styles.sidePanel} ${styles.sideRight}`} animate={reduceMotion ? undefined : { y: [0, 8, 0] }} transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}>
          <small>OWNER VISIBILITY</small><span>01 · Photos & reports</span><span>02 · Approvals</span><span>03 · Expenses</span><span>04 · Next actions</span>
        </motion.aside>

        <div className={styles.heroBottomLeft}><Image src="/imvo-black.png" alt="IMVO Group" width={180} height={62} unoptimized /><span>Backed by IMVO Group</span></div>
        <div className={styles.heroBottomRight}><b>PRIVATE BY DEFAULT</b><span>Your home is not marketing material.</span></div>
        <a href="#story" className={styles.scrollCue}>OUR CARE <span>↓</span></a>
      </section>

      <section className={styles.story} id="story">
        <div className={styles.storyIntro}><small>OVERVIEW</small><h2>Property care that feels calm because someone is actually following through.</h2><p>DŌMICILE handles the local coordination behind the scenes while the owner stays informed, approves what matters and keeps a clear record of the property.</p><a href="#care">EXPLORE THE CARE <span>↗</span></a></div>
        <motion.div className={styles.storyImage} initial={{ y: 42, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .85, ease: [0.16, 1, 0.3, 1] }}><Image src="/domicile/properties/property-c1.webp" alt="Private residence under DŌMICILE care" fill unoptimized sizes="(max-width: 900px) 100vw, 38vw" /><div><small>PRIVATE RESIDENCE</small><strong>Routine care active</strong></div></motion.div>
        <div className={styles.storyFacts}><div><small>LOCATION</small><b>Kigali, Rwanda</b></div><div><small>MODEL</small><b>One responsible contact</b></div><div><small>PRIVACY</small><b>Private by default</b></div><blockquote>“You should not need six conversations to know what happened at your own property.”</blockquote></div>
      </section>

      <section className={styles.care} id="care">
        <div className={styles.sectionHead}><small>WHAT WE HANDLE</small><h2>Care in layers,<br />not in scattered calls.</h2></div>
        <div className={styles.careGrid}>
          <motion.article whileHover={{ y: -8 }}><Image src="/domicile/properties/property-street.webp" alt="Property oversight" fill unoptimized /><div className={styles.cardShade} /><span>01</span><h3><TextRoll>Property oversight</TextRoll></h3><p>Scheduled checks, readiness, owner-away care and a reliable local presence.</p></motion.article>
          <motion.article className={styles.darkCard} whileHover={{ y: -8 }}><span>02</span><h3><TextRoll>Maintenance & repairs</TextRoll></h3><p>Issues are scoped, coordinated and followed through instead of being passed from person to person.</p></motion.article>
          <motion.article whileHover={{ y: -8 }}><Image src="/domicile/properties/property-estate.webp" alt="Property works" fill unoptimized /><div className={styles.cardShade} /><span>03</span><h3><TextRoll>Property works</TextRoll></h3><p>Repairs, improvements and technical work with clear owner approval before action.</p></motion.article>
          <motion.article className={styles.lightCard} whileHover={{ y: -8 }}><span>04</span><h3><TextRoll>Urgent response</TextRoll></h3><p>Detect, contact, confirm authority, coordinate, document and report.</p></motion.article>
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.processIntro}><small>HOW IT WORKS</small><h2>Clear from first message to ongoing care.</h2></div>
        <div className={styles.processList}>{processSteps.map(([number, title, text], index) => <motion.article key={number} initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .65, delay: index * .07 }}><span>{number}</span><h3>{title}</h3><p>{text}</p><b>↗</b></motion.article>)}</div>
      </section>

      <section className={styles.ownerView} id="owner-view">
        <div className={styles.ownerPhoto}><Image src="/domicile/properties/property-street.webp" alt="Private home under DŌMICILE care" fill unoptimized /><div><small>PROPERTY RECORD</small><strong>Kigali · Private Home</strong></div></div>
        <div className={styles.ownerCopy}><small>YOUR PROPERTY, AT A GLANCE</small><h2>Visibility without chasing updates.</h2><div className={styles.dashboard}><div className={styles.dashboardTop}><Image src="/domicile/logo-icon-black.svg" alt="" width={26} height={34} /><span>OWNER VIEW</span><b>PROPERTY ACTIVE</b></div><div className={styles.metrics}><div><small>STATUS</small><strong>ALL GOOD</strong></div><div><small>LAST CHECK</small><strong>TODAY · 09:42</strong></div><div><small>OPEN</small><strong>01</strong></div><div><small>NEXT VISIT</small><strong>27 AUG</strong></div></div><div className={styles.tabs}>{["Overview", "Photos", "Reports", "Approvals", "Maintenance"].map(tab => <button key={tab} type="button" className={activeTab === tab ? styles.activeTab : ""} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div><div className={styles.tabBody}><small>{activeTab.toUpperCase()}</small><h3>{activeTab === "Overview" ? "Everything important, in one place." : `${activeTab} stay attached to the property record.`}</h3><p>See what happened, what needs approval, what comes next and what has already been closed.</p><button type="button">VIEW LATEST REPORT <span>→</span></button></div></div></div>
      </section>

      <section className={styles.properties} id="properties"><div className={styles.sectionHead}><small>SELECTED PROPERTIES UNDER CARE</small><h2>Real homes.<br />Quietly looked after.</h2></div><div className={styles.propertyRail}>{properties.map((property, index) => <motion.article key={property.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: .7, delay: index * .08 }}><Image src={property.image} alt={property.title} fill unoptimized /><div className={styles.propertyShade} /><span>{property.status}</span><div><h3>{property.title}</h3><p>{property.meta}</p></div></motion.article>)}</div></section>

      <section className={styles.imvoBacked}><div><small>BACKED BY IMVO GROUP</small><h2>Property care with built-environment thinking behind it.</h2><p>DŌMICILE combines property coordination with IMVO Group’s design, technical and built-environment perspective.</p><Link href="/">VISIT IMVO GROUP <span>↗</span></Link></div><Image src="/imvo-black.png" alt="IMVO Group" width={360} height={124} unoptimized /></section>

      <section className={styles.faq} id="faq"><div className={styles.sectionHead}><small>FREQUENTLY ASKED QUESTIONS</small><h2>Know how the care works.</h2></div><div className={styles.faqList}>{faqItems.map(([q, a], index) => <article key={q} className={openFaq === index ? styles.faqOpen : ""}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{q}</strong><b>{openFaq === index ? "−" : "+"}</b></button><div><p>{a}</p></div></article>)}</div></section>

      <section className={styles.enquiry} id="enquire"><div className={styles.enquiryIntro}><Image src="/domicile/domicile-white-no-tagline.svg" alt="DŌMICILE" width={1495} height={292} /><small>START WITH A CONVERSATION</small><h2>Tell us about<br />your property.</h2><p>This is an enquiry, not a registration. We will contact you to understand the property and what you need.</p><div><a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a><a href={whatsappUrl} target="_blank" rel="noreferrer">+250 799 409 409</a><span>KIGALI · RWANDA</span></div></div><form onSubmit={handleSubmit} className={styles.form}>{isSubmitted ? <div className={styles.success}><small>ENQUIRY RECEIVED</small><h3>Thank you. DŌMICILE has your message.</h3><p>Our team will review the property need and contact you using the details provided.</p><button type="button" onClick={() => setIsSubmitted(false)}>SEND ANOTHER ENQUIRY</button></div> : <><input className={styles.honeypot} value={form.botcheck} onChange={e => setForm(v => ({ ...v, botcheck: e.target.value }))} tabIndex={-1} autoComplete="off" aria-hidden="true" /><div className={styles.formGrid}><label><span>Full name</span><input value={form.name} onChange={e => setForm(v => ({ ...v, name: e.target.value }))} placeholder="Your name" /></label><label><span>Phone / WhatsApp</span><input value={form.phone} onChange={e => setForm(v => ({ ...v, phone: e.target.value }))} placeholder="+250 …" /></label><label><span>Email</span><input type="email" value={form.email} onChange={e => setForm(v => ({ ...v, email: e.target.value }))} placeholder="you@example.com" /></label><label><span>Property location</span><input value={form.location} onChange={e => setForm(v => ({ ...v, location: e.target.value }))} placeholder="e.g. Kacyiru, Kigali" /></label><label><span>Property type</span><select value={form.propertyType} onChange={e => setForm(v => ({ ...v, propertyType: e.target.value }))}><option value="">Select property type</option><option>House</option><option>Apartment</option><option>Commercial</option><option>Other</option></select></label><label><span>What do you need?</span><select value={form.helpWith} onChange={e => setForm(v => ({ ...v, helpWith: e.target.value }))}><option value="">Select what you need</option><option>Ongoing property management</option><option>Owner-away care</option><option>Maintenance or repair</option><option>Property inspection</option><option>An urgent property issue</option><option>One-off property support</option><option>Other</option></select></label></div><label className={styles.message}><span>Message</span><textarea value={form.message} onChange={e => setForm(v => ({ ...v, message: e.target.value }))} placeholder="Tell us what the property needs…" /></label>{error ? <p className={styles.error}>{error}</p> : null}<button className={styles.submit} disabled={!formReady || isSubmitting}>{isSubmitting ? "SENDING…" : "SEND TO DŌMICILE"} <span>↗</span></button></>}</form></section>

      <footer className={styles.footer}><Image src="/domicile/domicile-white-no-tagline.svg" alt="DŌMICILE" width={1495} height={292} /><div><span>PROPERTY MANAGEMENT BY IMVO GROUP</span><a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a><Link href="/">IMVO Group</Link></div></footer>
    </main>
  );
}
