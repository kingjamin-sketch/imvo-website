"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import styles from "./DomicileExperience.module.css";

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

type QuickState = Pick<FormState, "location" | "propertyType" | "helpWith">;
type DashboardTab = "Overview" | "Photos" | "Reports" | "Approvals" | "Expenses" | "Maintenance" | "History";

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

const initialQuick: QuickState = { location: "", propertyType: "", helpWith: "" };

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_DOMICILE_WEB3FORMS_KEY || "566d4852-a822-4432-83ba-8d522618ee66";
const whatsappNumber = "250799409409";
const whatsappMessage = encodeURIComponent(
  "Hello DŌMICILE, I would like to discuss property management with your team.",
);
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const propertyTypes = ["House", "Apartment", "Commercial", "Other"];
const helpOptions = [
  "Ongoing property management",
  "Property care while away",
  "Maintenance or repair",
  "Property inspection",
  "An urgent property issue",
  "One-off property support",
  "I would like to understand DŌMICILE",
  "Other",
];

const managedProperties = [
  {
    title: "Private Residence",
    area: "Kigali",
    status: "All good",
    tone: "good",
    note: "Routine care active",
    image: "/domicile/properties/property-c1.webp",
  },
  {
    title: "Residential Estate",
    area: "Kigali",
    status: "Inspection due",
    tone: "watch",
    note: "Next visit scheduled",
    image: "/domicile/properties/property-estate.webp",
  },
  {
    title: "Private Home",
    area: "Kigali",
    status: "Owner away",
    tone: "away",
    note: "Owner-away care active",
    image: "/domicile/properties/property-street.webp",
  },
];

const activityFeed = [
  { type: "Inspection", title: "Condition check completed", detail: "Photos and notes prepared for the owner", time: "09:42" },
  { type: "Issue", title: "Water pressure concern logged", detail: "Matter triaged and response path opened", time: "09:47" },
  { type: "Coordination", title: "Technician being coordinated", detail: "Scope shared and attendance being arranged", time: "09:53" },
  { type: "Approval", title: "Owner approval received", detail: "Approved work moved into scheduling", time: "10:06" },
  { type: "Report", title: "Property update issued", detail: "Owner received the latest photos and summary", time: "10:18" },
];

const services = [
  ["Property Oversight", "Inspections, condition checks and recurring attention to the property."],
  ["Maintenance & Repairs", "Coordination of suitable technicians and follow-through on maintenance matters."],
  ["Property Works", "Repairs, improvements and technical works coordinated within an agreed scope."],
  ["Owner Support", "A reliable local point of contact for owners who cannot always be present."],
  ["Owner-Away Care", "Routine checks and property readiness while you travel or live outside Rwanda."],
  ["Urgent Response", "Urgent matters are triaged and handled within the authority agreed with the owner."],
];

const processSteps = [
  ["01", "Tell us what you need", "Start with a short enquiry. No account or registration is required."],
  ["02", "We understand the property", "We discuss the property, access, priorities and the level of support you need."],
  ["03", "We agree the care plan", "Scope, approvals, reporting and responsibilities are made clear before onboarding."],
  ["04", "DŌMICILE follows through", "We coordinate the agreed property matters and keep you informed through closure."],
];

const dashboardContent: Record<DashboardTab, { title: string; body: string }> = {
  Overview: { title: "Everything important, in one place.", body: "See current status, recent visits, open matters and the next action without chasing different people." },
  Photos: { title: "Visual proof from the property.", body: "Visit and inspection photos stay attached to the relevant property record for clear owner visibility." },
  Reports: { title: "Structured property updates.", body: "Inspection findings, completed actions and recommendations can be reviewed as a documented history." },
  Approvals: { title: "Clear decisions before work proceeds.", body: "Where approval is required, the owner can see the matter, proposed action and decision status." },
  Expenses: { title: "Costs stay visible.", body: "Approved property expenses can be recorded against the matter they relate to for easier reconciliation." },
  Maintenance: { title: "Nothing disappears into a chat thread.", body: "Open maintenance matters remain trackable from request through coordination and closure." },
  History: { title: "A property memory over time.", body: "Visits, reports, decisions and completed matters form a useful history for the property and owner." },
};

const faqItems = [
  ["Do I need to live outside Rwanda to use DŌMICILE?", "No. DŌMICILE is for owners abroad, frequent travellers and Kigali-based owners who want reliable delegated property care."],
  ["Can you manage only one property?", "Yes. The service can be shaped around one home, multiple properties or a defined one-off need."],
  ["How are repairs approved?", "The approval process is agreed during onboarding. Work requiring owner approval is not treated as approved until the agreed authority is confirmed."],
  ["What happens if something is urgent?", "The matter is triaged, the owner is contacted and DŌMICILE acts within any pre-agreed emergency authority where applicable."],
  ["Will my property appear on the website?", "No, not by default. Client properties and identifying information are public only when the owner has explicitly agreed to it."],
  ["Who performs maintenance work?", "DŌMICILE coordinates appropriate technicians, contractors and service providers for the agreed property need."],
  ["How do payments and expenses work?", "The agreed scope, owner approvals and property-related costs are recorded so the owner can see what a payment relates to."],
  ["Which areas do you serve?", "DŌMICILE is currently focused on properties across Kigali, Rwanda."],
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function DomicileExperience() {
  const [quick, setQuick] = useState<QuickState>(initialQuick);
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [activityIndex, setActivityIndex] = useState(0);
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>("Overview");
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [imvoOpen, setImvoOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivityIndex((current) => (current + 1) % activityFeed.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  const activeActivity = activityFeed[activityIndex];
  const quickReady = Boolean(quick.location.trim() && quick.propertyType && quick.helpWith);
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

  const beginFromHero = () => {
    if (!quickReady) return;
    setForm((current) => ({ ...current, ...quick }));
    document.getElementById("talk-to-us")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formReady || form.botcheck) return;
    setError("");
    setIsSubmitting(true);

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
      setQuick(initialQuick);
    } catch {
      setError("We could not send the enquiry just now. Please try again, email domicile@imvogroup.com, or continue on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/domicile" className={styles.brand} aria-label="DŌMICILE home">
            <Image src="/domicile/domicile-black-no-tagline.svg" alt="DŌMICILE" width={1495} height={292} priority />
            <span>Property Management by IMVO Group</span>
          </Link>

          <nav className={styles.nav} aria-label="DŌMICILE navigation">
            <a href="#properties">Under care</a>
            <a href="#in-action">In action</a>
            <a href="#services">Services</a>
            <a href="#how-it-works">How it works</a>
            <a href="#faq">FAQ</a>
          </nav>

          <a className={styles.headerCta} href="#talk-to-us">Talk to DŌMICILE <span>→</span></a>
        </div>
      </header>

      <section className={styles.hero}>
        <Image src="/casa-vento-2.png" alt="Residential property in Kigali" fill priority sizes="100vw" className={styles.heroImage} />
        <div className={styles.heroContrast} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Property management by IMVO Group · Kigali</p>
            <h1>Your property,<br />handled.</h1>
            <p className={styles.heroLead}>A dependable local point of contact for the ongoing care, maintenance and coordination of your property.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#talk-to-us">Talk to DŌMICILE <span>→</span></a>
              <a className={styles.secondaryButton} href="#in-action">See DŌMICILE in action <span>↓</span></a>
            </div>
            <div className={styles.heroPrinciples}>
              <span>Local presence</span><span>Proactive care</span><span>Private by default</span>
            </div>
          </div>

          <aside className={styles.quickCard} aria-label="Start a DŌMICILE enquiry">
            <div className={styles.quickTitle}>
              <Image src="/domicile/logo-icon-black.svg" alt="" width={727} height={919} />
              <div><small>Start here</small><h2>What does your property need?</h2></div>
            </div>
            <label><span>Property location</span><input value={quick.location} onChange={(e) => setQuick((v) => ({ ...v, location: e.target.value }))} placeholder="e.g. Kacyiru, Kigali" /></label>
            <label><span>Property type</span><select value={quick.propertyType} onChange={(e) => setQuick((v) => ({ ...v, propertyType: e.target.value }))}><option value="">Select property type</option>{propertyTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label><span>What do you need help with?</span><select value={quick.helpWith} onChange={(e) => setQuick((v) => ({ ...v, helpWith: e.target.value }))}><option value="">Select what you need</option>{helpOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
            <button type="button" disabled={!quickReady} onClick={beginFromHero}>Start with DŌMICILE <span>→</span></button>
            <p>No account. No payment. Start with a conversation.</p>
          </aside>
        </div>
      </section>

      <section className={styles.trustStrip} aria-label="DŌMICILE service principles">
        <div><b>01</b><span>Kigali-based coordination</span></div>
        <div><b>02</b><span>One point of contact</span></div>
        <div><b>03</b><span>Requests accepted 24/7</span></div>
        <div><b>04</b><span>Private by default</span></div>
      </section>

      <section className={styles.propertiesSection} id="properties">
        <div className={styles.sectionHeader}>
          <div><p className={styles.kicker}>Selected properties under care</p><h2>Real homes. Quietly looked after.</h2></div>
          <p>Shown only as privacy-safe examples. Identifying details are not published without owner permission.</p>
        </div>
        <div className={styles.propertyGrid}>
          {managedProperties.map((property) => (
            <article className={styles.propertyCard} key={property.title}>
              <div className={styles.propertyImage}><Image src={property.image} alt={`${property.title} in ${property.area}`} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
              <div className={styles.propertyMeta}>
                <span className={`${styles.status} ${styles[property.tone]}`}>{property.status}</span>
                <div><h3>{property.title}</h3><p>{property.area} · {property.note}</p></div>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.serviceStandard}>
          <span>Owner kept informed</span><span>Approval before work where required</span><span>Follow-through until closure</span><span>Reports & history retained</span>
        </div>
      </section>

      <section className={styles.actionSection} id="in-action">
        <div className={styles.actionIntro}>
          <p className={styles.kickerLight}>DŌMICILE in action</p>
          <h2>Property care should feel active, not invisible.</h2>
          <p>A representative look at how DŌMICILE moves a property matter from detection to owner visibility.</p>
          <span className={styles.sampleLabel}>Representative care flow · not a public client log</span>
        </div>
        <div className={styles.activityPanel}>
          <div className={styles.activityCurrent}>
            <div className={styles.activityPulse}><i /></div>
            <small>{activeActivity.type}</small>
            <h3>{activeActivity.title}</h3>
            <p>{activeActivity.detail}</p>
            <time>{activeActivity.time}</time>
          </div>
          <div className={styles.activityList}>
            {activityFeed.map((item, index) => (
              <button key={item.title} type="button" className={index === activityIndex ? styles.activityActive : ""} onClick={() => setActivityIndex(index)}>
                <span>{String(index + 1).padStart(2, "0")}</span><div><b>{item.title}</b><small>{item.detail}</small></div><time>{item.time}</time>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.servicesSection} id="services">
        <div className={styles.sectionHeaderCompact}>
          <div><p className={styles.kicker}>What we handle</p><h2>One property.<br />One responsible point of contact.</h2></div>
          <p>DŌMICILE coordinates the everyday matters that otherwise require an owner to chase several people.</p>
        </div>
        <div className={styles.servicesGrid}>
          {services.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className={styles.processSection} id="how-it-works">
        <div className={styles.sectionHeaderCompact}>
          <div><p className={styles.kicker}>How it works</p><h2>Clear from first message to ongoing care.</h2></div>
          <p>You do not register a property first. We understand the need, agree the arrangement and onboard only when the scope is clear.</p>
        </div>
        <div className={styles.processGrid}>
          {processSteps.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className={styles.dashboardSection}>
        <div className={styles.dashboardImage}><Image src="/virunga-residence-2.png" alt="Residential property in Kigali" fill sizes="(max-width: 900px) 100vw, 42vw" /></div>
        <div className={styles.dashboardCopy}>
          <p className={styles.kicker}>Your property, at a glance</p>
          <h2>Visibility without chasing updates.</h2>
          <div className={styles.dashboardCard}>
            <div className={styles.dashboardMetrics}>
              <div><small>Property status</small><strong>All good</strong></div>
              <div><small>Last inspection</small><strong>Today, 09:42</strong></div>
              <div><small>Open matters</small><strong>1</strong></div>
              <div><small>Next visit</small><strong>27 Aug</strong></div>
              <div><small>Latest report</small><strong>Ready</strong></div>
            </div>
            <div className={styles.dashboardTabs}>{(Object.keys(dashboardContent) as DashboardTab[]).map((tab) => <button key={tab} type="button" className={dashboardTab === tab ? styles.tabActive : ""} onClick={() => setDashboardTab(tab)}>{tab}</button>)}</div>
            <div className={styles.dashboardBody}><div><small>Sample owner view</small><h3>{dashboardContent[dashboardTab].title}</h3><p>{dashboardContent[dashboardTab].body}</p></div><button type="button">View latest report <span>→</span></button></div>
          </div>
        </div>
      </section>

      <section className={styles.proofSection}>
        <div className={styles.caseStory}>
          <p className={styles.kicker}>A property-care story</p>
          <span>Anonymous example</span>
          <h2>A small issue is cheaper when someone notices it early.</h2>
          <p>During a routine visit, a developing water-related concern is identified, documented and brought to the owner before it becomes a larger property problem.</p>
          <div><b>Detect</b><i>→</i><b>Inform</b><i>→</i><b>Approve</b><i>→</i><b>Resolve</b><i>→</i><b>Report</b></div>
        </div>
        <div className={styles.ownerValues}>
          <p className={styles.kicker}>What owners value</p>
          <h2>Less coordination. More confidence.</h2>
          <div className={styles.valueGrid}>
            <article><b>“Can someone local actually follow this through?”</b><p>DŌMICILE is designed around ownership of the coordination, not just passing along a contact.</p></article>
            <article><b>“How do I know what happened?”</b><p>Photos, reports, approvals and property matters can be documented instead of disappearing inside separate chats.</p></article>
            <article><b>“I do not want my home exposed.”</b><p>Privacy is treated as part of the service. Public visibility is optional, never assumed.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.assuranceSection} id="for-owners">
        <div className={styles.assuranceGrid}>
          <article><small>For owners who are away</small><h3>Your property still needs attention when you are not there.</h3><p>Routine visits, owner-away care and a local point of contact help keep the property ready and visible to you.</p></article>
          <article><small>When something cannot wait</small><h3>Urgent matter. Clear response path.</h3><p>Issue detected → owner contacted → authority checked → response coordinated → matter documented.</p></article>
          <article><small>Private by default</small><h3>Your home is not marketing material.</h3><p>Client properties, access details and reports remain private unless the owner has explicitly agreed otherwise.</p></article>
        </div>
      </section>

      <section className={styles.engagementSection}>
        <div className={styles.engagementIntro}><p className={styles.kicker}>Ways to work with DŌMICILE</p><h2>Start with the level of care your property actually needs.</h2></div>
        <div className={styles.engagementGrid}>
          <article><span>01</span><h3>Ongoing Management</h3><p>Recurring oversight and coordination for owners who want a consistent property-care relationship.</p></article>
          <article><span>02</span><h3>Owner-Away Care</h3><p>Checks, readiness and local support while the owner is travelling or living abroad.</p></article>
          <article><span>03</span><h3>One-Off Property Support</h3><p>A defined inspection, maintenance need, repair coordination or property matter without a long-term commitment.</p></article>
        </div>
        <p className={styles.engagementNote}>Pricing is shaped by the property, access, frequency and agreed scope. Start with a conversation and we will recommend the right care arrangement.</p>
      </section>

      <section className={styles.imvoSection}>
        <div className={styles.imvoCopy}><p className={styles.kicker}>Backed by IMVO Group</p><h2>Property care with built-environment thinking behind it.</h2><p>DŌMICILE combines property coordination with IMVO Group's design, technical and built-environment perspective.</p><Link href="/">Visit IMVO Group <ArrowIcon /></Link></div>
        <div className={styles.imvoPillars}><div><b>Local team</b><span>Kigali-based coordination</span></div><div><b>Trusted network</b><span>Appropriate service providers</span></div><div><b>Professional records</b><span>Reports, approvals and history</span></div><div><b>Discretion</b><span>Privacy built into the service</span></div></div>
        <div className={styles.imvoMark}><strong>IMVO</strong><span>GROUP</span></div>
      </section>

      <section className={styles.faqSection} id="faq">
        <div className={styles.sectionHeaderCompact}><div><p className={styles.kicker}>Frequently asked questions</p><h2>Know how the care works.</h2></div><p>Clear expectations are part of good property management.</p></div>
        <div className={styles.faqGrid}>{faqItems.map(([question, answer], index) => <article key={question} className={faqOpen === index ? styles.faqOpen : ""}><button type="button" onClick={() => setFaqOpen((current) => current === index ? null : index)}><span>{question}</span><b>{faqOpen === index ? "−" : "+"}</b></button><div><p>{answer}</p></div></article>)}</div>
      </section>

      <section className={styles.contactSection} id="talk-to-us">
        <div className={styles.contactIntro}>
          <Image src="/domicile/domicile-black-no-tagline.svg" alt="DŌMICILE" width={1495} height={292} />
          <p className={styles.kicker}>Start with a conversation</p>
          <h2>Tell us about your property.</h2>
          <p>This is an enquiry, not a registration. We will contact you to understand the property and what you need.</p>
          <div className={styles.contactDetails}><a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a><a href={whatsappUrl} target="_blank" rel="noreferrer">+250 799 409 409</a><span>Existing clients: care@imvogroup.com</span><span>Kigali, Rwanda</span></div>
        </div>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          {isSubmitted ? <div className={styles.successBox}><small>Enquiry received</small><h3>Thank you. DŌMICILE has your message.</h3><p>Our team will review the property need and contact you using the details provided.</p><button type="button" onClick={() => setIsSubmitted(false)}>Send another enquiry</button></div> : <>
            <div className={styles.formHead}><small>Property enquiry</small><h3>What should we know?</h3><p>A short description is enough. We can discuss the details afterwards.</p></div>
            <input className={styles.honeypot} value={form.botcheck} onChange={(e) => setForm((v) => ({ ...v, botcheck: e.target.value }))} tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className={styles.formGrid}>
              <label><span>Full name</span><input value={form.name} onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))} placeholder="Your name" /></label>
              <label><span>Phone / WhatsApp</span><input value={form.phone} onChange={(e) => setForm((v) => ({ ...v, phone: e.target.value }))} placeholder="+250 …" /></label>
              <label><span>Email</span><input type="email" value={form.email} onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))} placeholder="you@example.com" /></label>
              <label><span>Property location</span><input value={form.location} onChange={(e) => setForm((v) => ({ ...v, location: e.target.value }))} placeholder="e.g. Kacyiru, Kigali" /></label>
              <label><span>Property type</span><select value={form.propertyType} onChange={(e) => setForm((v) => ({ ...v, propertyType: e.target.value }))}><option value="">Select property type</option>{propertyTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label><span>What do you need help with?</span><select value={form.helpWith} onChange={(e) => setForm((v) => ({ ...v, helpWith: e.target.value }))}><option value="">Select what you need</option>{helpOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className={styles.messageField}><span>Message</span><textarea value={form.message} onChange={(e) => setForm((v) => ({ ...v, message: e.target.value }))} placeholder="Tell us what the property needs…" /></label>
            </div>
            {error && <div className={styles.errorBox}>{error}</div>}
            <div className={styles.formFooter}><p>By sending this form, you consent to IMVO Group using the information you provide to respond to your enquiry. <Link href="/privacy-policy">Privacy Policy</Link>.</p><button type="submit" disabled={!formReady || isSubmitting}>{isSubmitting ? "Sending…" : "Send to DŌMICILE"}<span>→</span></button></div>
          </>}
        </form>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}><Image src="/domicile/domicile-white-no-tagline.svg" alt="DŌMICILE" width={1495} height={292} /><p>Property Management by IMVO Group</p></div>
        <div className={styles.footerLinks}><div><b>Care</b><a href="#properties">Properties under care</a><a href="#in-action">DŌMICILE in action</a><a href="#services">Services</a></div><div><b>Company</b><Link href="/">IMVO Group</Link><a href="#faq">FAQ</a><a href="#talk-to-us">Contact</a></div><div><b>Reach us</b><a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a><a href={whatsappUrl} target="_blank" rel="noreferrer">+250 799 409 409</a><span>Kigali, Rwanda</span></div></div>
        <div className={styles.footerBottom}><span>© 2026 DŌMICILE by IMVO Group.</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
      </footer>

      <div className={styles.imvoReturn} onMouseEnter={() => setImvoOpen(true)} onMouseLeave={() => setImvoOpen(false)}>
        <Link href="/" aria-label="Back to IMVO Group"><span className={styles.imvoBadge}>IMVO</span><span className={`${styles.imvoLabel} ${imvoOpen ? styles.floatOpen : ""}`}>Back to IMVO Group</span></Link>
      </div>

      <div className={styles.assistant} onMouseEnter={() => setAssistantOpen(true)} onMouseLeave={() => setAssistantOpen(false)}>
        <div className={`${styles.assistantPanel} ${assistantOpen ? styles.floatOpen : ""}`}><small>DŌMICILE</small><strong>Got a property to look after?</strong><p>Tell us what it needs.</p><a href="#talk-to-us">Ask DŌMICILE <span>→</span></a></div>
        <button type="button" className={styles.assistantButton} onClick={() => setAssistantOpen((open) => !open)} aria-expanded={assistantOpen} aria-label="Open DŌMICILE assistant"><Image src="/domicile/logo-icon-white.webp" alt="" width={253} height={320} /></button>
      </div>
    </main>
  );
}
