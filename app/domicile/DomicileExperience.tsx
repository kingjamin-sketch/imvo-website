"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
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

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_DOMICILE_WEB3FORMS_KEY ||
  "566d4852-a822-4432-83ba-8d522618ee66";

const whatsappNumber = "250799409409";
const whatsappMessage = encodeURIComponent(
  "Hello DŌMICILE, I have just submitted a property enquiry through imvogroup.com and would like to discuss it with your team.",
);
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const services = [
  {
    number: "01",
    title: "Property Oversight",
    text: "Inspections, condition checks and ongoing attention to the property.",
  },
  {
    number: "02",
    title: "Maintenance & Repairs",
    text: "Coordination of appropriate technicians and service providers for maintenance and repairs.",
  },
  {
    number: "03",
    title: "Property Works",
    text: "Coordination of repairs, improvements and technical works affecting the property.",
  },
  {
    number: "04",
    title: "Owner Support",
    text: "A reliable local point of contact when you are busy, travelling or living abroad.",
  },
];

const ownerSituations = [
  "Live outside Rwanda",
  "Travel frequently",
  "Own more than one property",
  "Have limited time to coordinate property matters",
  "Prefer professional local support",
];

export default function DomicileExperience() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.botcheck) return;

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

      setForm(initialForm);
      setIsSubmitted(true);
    } catch {
      setError(
        "We could not send your request just now. Please try again, email domicile@imvogroup.com, or continue on WhatsApp.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/domicile" className={styles.headerBrand} aria-label="DŌMICILE home">
            <Image
              src="/domicile/domicile-white.webp"
              alt="DŌMICILE — Property Management by IMVO Group"
              width={600}
              height={151}
              priority
            />
          </Link>

          <nav className={styles.nav} aria-label="DŌMICILE navigation">
            <a href="#what-we-handle">What we handle</a>
            <a href="#how-it-works">How it works</a>
            <a href="#talk-to-us">Talk to us</a>
          </nav>

          <a className={styles.headerCta} href="#talk-to-us">
            Talk to DŌMICILE
          </a>
        </div>
      </header>

      <section className={styles.hero}>
        <Image
          src="/casa-vento-2.png"
          alt="Residential property in Kigali"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <img
              className={styles.heroWordmark}
              src="/domicile/domicile-white-no-tagline.svg"
              alt="DŌMICILE"
            />
            <p className={styles.heroDescriptor}>Property Management by IMVO Group</p>
            <h1>Your property,<br />handled.</h1>
            <p className={styles.heroText}>
              One reliable point of contact for the ongoing care, maintenance and coordination of your property.
            </p>
            <p className={styles.locationLine}>Currently serving properties across Kigali, Rwanda.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#talk-to-us">
                Talk to DŌMICILE <span aria-hidden="true">→</span>
              </a>
              <a className={styles.secondaryButton} href="#how-it-works">
                See how it works <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className={styles.heroSideNote}>
            <span>01</span>
            <p>Property care, coordinated locally.</p>
          </div>
        </div>
      </section>

      <section className={styles.intro} id="what-we-handle">
        <div className={styles.innerWide}>
          <div className={styles.introTop}>
            <img
              className={styles.lightLockup}
              src="/domicile/domicile-black.svg"
              alt="DŌMICILE — Property Management by IMVO Group"
            />
            <p className={styles.kicker}>The idea</p>
          </div>
          <div className={styles.introGrid}>
            <div>
              <h2>Tell us what the property needs.</h2>
              <p className={styles.introStatement}>DŌMICILE coordinates what happens next.</p>
            </div>
            <div className={styles.introBody}>
              <p>
                Property ownership can involve inspections, maintenance, repairs, technicians, access, follow-up and decisions.
              </p>
              <p>
                DŌMICILE gives you one local point of contact to help coordinate those needs and keep you informed without requiring you to personally manage every intervention.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className={styles.innerWide}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>What DŌMICILE can help with</p>
              <h2>One property.<br />One point of contact.</h2>
            </div>
            <p className={styles.sectionAside}>
              Clear coordination across the everyday needs that keep a property cared for and moving properly.
            </p>
          </div>
          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <article className={styles.serviceCard} key={service.title}>
                <span className={styles.cardNumber}>{service.number}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.differenceSection}>
        <div className={styles.differenceGrid}>
          <div className={styles.differenceImageWrap}>
            <Image
              src="/virunga-residence-2.png"
              alt="Residential property managed with local coordination"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.coverImage}
            />
          </div>
          <div className={styles.differenceCopy}>
            <p className={styles.kickerLight}>The difference</p>
            <h2>Not simply a directory of technicians.</h2>
            <p>
              You tell us what the property needs. We help coordinate the appropriate response, keep you informed and follow the matter through the agreed process.
            </p>
            <div className={styles.promiseLine}>
              <span>Less coordination for you.</span>
              <span>Better visibility over your property.</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.processSection} id="how-it-works">
        <div className={styles.innerWide}>
          <div className={styles.processBrandRow}>
            <img
              className={styles.processWordmark}
              src="/domicile/domicile-black-no-tagline.svg"
              alt="DŌMICILE"
            />
            <p className={styles.kicker}>How it works</p>
          </div>
          <div className={styles.sectionHeading}>
            <h2>Start with a conversation.</h2>
            <p className={styles.sectionAside}>
              No account, payment or property registration is required before we have spoken with you.
            </p>
          </div>
          <div className={styles.processGrid}>
            <article>
              <span>01</span>
              <h3>Talk to us</h3>
              <p>Tell us about your property and what you need.</p>
            </article>
            <article>
              <span>02</span>
              <h3>We understand the property</h3>
              <p>We discuss the situation and determine the appropriate level of support or management.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Proceed when you&apos;re ready</h3>
              <p>If DŌMICILE is right for you, we guide you through the next onboarding and management steps.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.awaySection}>
        <Image
          src="/casa-vento-5.png"
          alt="Property cared for while the owner is away"
          fill
          sizes="100vw"
          className={styles.awayImage}
        />
        <div className={styles.awayShade} />
        <div className={styles.awayInner}>
          <p className={styles.kickerLight}>For owners who cannot always be there</p>
          <h2>Your property still needs attention when you are away.</h2>
          <p className={styles.awayText}>DŌMICILE gives you someone local to talk to about it.</p>
          <div className={styles.ownerList}>
            {ownerSituations.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className={styles.contactSection} id="talk-to-us">
        <div className={styles.contactGrid}>
          <div className={styles.contactIntro}>
            <img
              className={styles.contactIcon}
              src="/domicile/logo-icon-black.svg"
              alt="DŌMICILE icon"
            />
            <p className={styles.kicker}>Talk to DŌMICILE</p>
            <h2>Tell us about your property.</h2>
            <p>
              You do not need to register or commit to a management plan. Start with a conversation and our team will contact you to understand what you need.
            </p>
            <div className={styles.directContact}>
              <a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">+250 799 409 409</a>
            </div>
          </div>

          <div className={styles.formPanel}>
            {isSubmitted ? (
              <div className={styles.successState} role="status" aria-live="polite">
                <img className={styles.successIcon} src="/domicile/logo-icon-black.svg" alt="" />
                <p className={styles.kicker}>Request received</p>
                <h3>We&apos;ve received your request.</h3>
                <p>
                  Thank you for contacting DŌMICILE. A member of our team will contact you to understand your property and discuss what you need.
                </p>
                <a className={styles.submitButton} href={whatsappUrl} target="_blank" rel="noreferrer">
                  Continue on WhatsApp <span aria-hidden="true">→</span>
                </a>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.honeypot} aria-hidden="true">
                  <label htmlFor="domicile-company">Company</label>
                  <input
                    id="domicile-company"
                    type="text"
                    name="company"
                    value={form.botcheck}
                    onChange={(event) => updateField("botcheck", event.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className={styles.formRow}>
                  <label>
                    <span>Full name</span>
                    <input required value={form.name} onChange={(e) => updateField("name", e.target.value)} />
                  </label>
                  <label>
                    <span>Phone / WhatsApp</span>
                    <input required type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
                  </label>
                </div>

                <div className={styles.formRow}>
                  <label>
                    <span>Email</span>
                    <input required type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
                  </label>
                  <label>
                    <span>Property location</span>
                    <input required value={form.location} onChange={(e) => updateField("location", e.target.value)} />
                  </label>
                </div>

                <div className={styles.formRow}>
                  <label>
                    <span>Property type</span>
                    <select required value={form.propertyType} onChange={(e) => updateField("propertyType", e.target.value)}>
                      <option value="">Select type</option>
                      <option>House</option>
                      <option>Apartment</option>
                      <option>Commercial</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label>
                    <span>What would you like help with?</span>
                    <select required value={form.helpWith} onChange={(e) => updateField("helpWith", e.target.value)}>
                      <option value="">Select an option</option>
                      <option>Property management</option>
                      <option>Property care while away</option>
                      <option>Maintenance or repair</option>
                      <option>Property inspection</option>
                      <option>An existing property issue</option>
                      <option>I would like to understand DŌMICILE</option>
                      <option>Other</option>
                    </select>
                  </label>
                </div>

                <label>
                  <span>Message</span>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us briefly about the property or what you need."
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                  />
                </label>

                {error ? <p className={styles.formError}>{error}</p> : null}

                <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Send to DŌMICILE"}
                  <span aria-hidden="true">→</span>
                </button>

                <p className={styles.privacyNote}>
                  By sending this form, you consent to IMVO Group using the information you provide to respond to your enquiry. See our <Link href="/privacy-policy">Privacy Policy</Link>.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <Image
              src="/domicile/domicile-white.webp"
              alt="DŌMICILE — Property Management by IMVO Group"
              width={600}
              height={151}
            />
            <p>Your property, handled.</p>
          </div>
          <div className={styles.footerLinks}>
            <a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">+250 799 409 409</a>
            <Link href="/">IMVO Group →</Link>
            <Link href="/terms-of-use">Terms</Link>
            <Link href="/privacy-policy">Privacy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
