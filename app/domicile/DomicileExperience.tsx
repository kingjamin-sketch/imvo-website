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

type QuickState = Pick<FormState, "location" | "propertyType" | "helpWith">;

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

const initialQuick: QuickState = {
  location: "",
  propertyType: "",
  helpWith: "",
};

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_DOMICILE_WEB3FORMS_KEY ||
  "566d4852-a822-4432-83ba-8d522618ee66";

const whatsappNumber = "250799409409";
const whatsappMessage = encodeURIComponent(
  "Hello DŌMICILE, I would like to discuss property management with your team.",
);
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const propertyTypes = ["House", "Apartment", "Commercial", "Other"];
const helpOptions = [
  "Property management",
  "Property care while away",
  "Maintenance or repair",
  "Property inspection",
  "An existing property issue",
  "I would like to understand DŌMICILE",
  "Other",
];

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

const processSteps = [
  {
    number: "01",
    title: "Tell us what you need",
    text: "Send a short enquiry about the property, where it is and what you would like help with.",
    note: "No account or registration needed.",
  },
  {
    number: "02",
    title: "We speak with you",
    text: "DŌMICILE contacts you to understand the property, the situation, access and the level of support you need.",
    note: "This is where we clarify the real need.",
  },
  {
    number: "03",
    title: "We agree the scope",
    text: "If you want to proceed, we define what DŌMICILE will coordinate, how approvals work and how you will stay informed.",
    note: "You know the arrangement before onboarding.",
  },
  {
    number: "04",
    title: "DŌMICILE follows through",
    text: "Within the agreed scope, DŌMICILE coordinates property matters, the appropriate response and the updates back to you.",
    note: "One point of contact for the agreed property needs.",
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
  const [quick, setQuick] = useState<QuickState>(initialQuick);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updateQuick = (field: keyof QuickState, value: string) => {
    setQuick((current) => ({ ...current, [field]: value }));
  };

  const stepOneReady = Boolean(form.location.trim() && form.propertyType && form.helpWith);
  const stepTwoReady = Boolean(
    form.name.trim() &&
      form.phone.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
  );
  const stepThreeReady = form.message.trim().length >= 5;
  const quickReady = Boolean(quick.location.trim() && quick.propertyType && quick.helpWith);

  const beginFromHero = () => {
    if (!quickReady) return;
    setForm((current) => ({ ...current, ...quick }));
    setStep(2);
    window.setTimeout(() => {
      document.getElementById("talk-to-us")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 20);
  };

  const nextStep = () => {
    setError("");
    if (step === 1 && stepOneReady) setStep(2);
    if (step === 2 && stepTwoReady) setStep(3);
  };

  const previousStep = () => {
    setError("");
    setStep((current) => Math.max(1, current - 1));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step !== 3 || !stepThreeReady || form.botcheck) return;

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
      setQuick(initialQuick);
      setStep(1);
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
              src="/domicile/domicile-white-no-tagline.svg"
              alt="DŌMICILE"
              width={1495}
              height={292}
              priority
            />
          </Link>

          <nav className={styles.nav} aria-label="DŌMICILE navigation">
            <a href="#what-we-handle">What we handle</a>
            <a href="#how-it-works">How it works</a>
            <a href="#for-owners">For owners</a>
            <a href="#talk-to-us">Talk to us</a>
          </nav>

          <div className={styles.headerActions}>
            <Link href="/" className={styles.imvoBack}>← IMVO Group</Link>
            <a className={styles.headerCta} href="#talk-to-us">Talk to DŌMICILE</a>
          </div>
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
            <Image
              className={styles.heroWordmark}
              src="/domicile/domicile-white-no-tagline.svg"
              alt="DŌMICILE"
              width={1495}
              height={292}
              priority
            />
            <p className={styles.heroDescriptor}>Property Management by IMVO Group</p>
            <h1>Your property,<br />handled.</h1>
            <p className={styles.heroText}>
              One reliable point of contact for the ongoing care, maintenance and coordination of your property.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#talk-to-us">Talk to DŌMICILE <span>→</span></a>
              <a className={styles.secondaryButton} href="#how-it-works">See how it works <span>↓</span></a>
            </div>
            <p className={styles.locationLine}>Currently serving properties across Kigali, Rwanda.</p>
          </div>

          <aside className={styles.quickCard} aria-label="Start a DŌMICILE enquiry">
            <div className={styles.quickCardTop}>
              <Image src="/domicile/logo-icon-black.svg" alt="" width={727} height={919} />
              <div>
                <span>Start here</span>
                <h2>What does your property need?</h2>
              </div>
            </div>
            <label>
              <span>Property location</span>
              <input
                value={quick.location}
                onChange={(event) => updateQuick("location", event.target.value)}
                placeholder="e.g. Kacyiru, Kigali"
              />
            </label>
            <label>
              <span>Property type</span>
              <select value={quick.propertyType} onChange={(event) => updateQuick("propertyType", event.target.value)}>
                <option value="">Select property type</option>
                {propertyTypes.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>
              <span>What do you need help with?</span>
              <select value={quick.helpWith} onChange={(event) => updateQuick("helpWith", event.target.value)}>
                <option value="">Select what you need</option>
                {helpOptions.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <button type="button" className={styles.quickButton} onClick={beginFromHero} disabled={!quickReady}>
              Start with DŌMICILE <span>→</span>
            </button>
            <p>No account. No payment. Start with a conversation.</p>
          </aside>
        </div>
      </section>

      <section className={styles.trustStrip} aria-label="DŌMICILE service principles">
        <span>Property Management by IMVO Group</span>
        <span>Kigali-based coordination</span>
        <span>One point of contact</span>
        <span>Start without registration</span>
      </section>

      <section className={styles.servicesSection} id="what-we-handle">
        <div className={styles.innerWide}>
          <div className={styles.sectionBrandRow}>
            <Image
              src="/domicile/domicile-black-no-tagline.svg"
              alt="DŌMICILE"
              width={1495}
              height={292}
              className={styles.lightWordmark}
            />
            <p className={styles.kicker}>What we handle</p>
          </div>
          <div className={styles.sectionHeading}>
            <div>
              <h2>One property.<br />One point of contact.</h2>
            </div>
            <p className={styles.sectionAside}>
              DŌMICILE is for owners who want someone local to help coordinate the everyday needs that keep a property cared for and moving properly.
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
            <Image src="/domicile/logo-icon-white.webp" alt="" width={727} height={919} className={styles.differenceIcon} />
            <p className={styles.kickerLight}>The difference</p>
            <h2>You do not have to coordinate everyone yourself.</h2>
            <p>
              You tell DŌMICILE what the property needs. We help coordinate the appropriate response, keep you informed and follow the matter through the agreed process.
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
          <div className={styles.sectionBrandRow}>
            <Image
              src="/domicile/domicile-black-no-tagline.svg"
              alt="DŌMICILE"
              width={1495}
              height={292}
              className={styles.lightWordmark}
            />
            <p className={styles.kicker}>How it works</p>
          </div>
          <div className={styles.processIntro}>
            <div>
              <h2>From “something needs attention” to a clear next step.</h2>
            </div>
            <div className={styles.processExplanation}>
              <strong>You do not register a property first.</strong>
              <p>You start by telling us what you need. If DŌMICILE is right for you, onboarding comes after we have spoken and agreed the scope.</p>
            </div>
          </div>

          <div className={styles.processGrid}>
            {processSteps.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <small>{item.note}</small>
              </article>
            ))}
          </div>

          <div className={styles.flowBand}>
            <div><span>YOU</span><strong>Tell us the need</strong></div>
            <i>→</i>
            <div><span>DŌMICILE</span><strong>Understand & coordinate</strong></div>
            <i>→</i>
            <div><span>RESPONSE</span><strong>Appropriate action</strong></div>
            <i>→</i>
            <div><span>YOU</span><strong>Stay informed</strong></div>
          </div>
        </div>
      </section>

      <section className={styles.awaySection} id="for-owners">
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
            <Image src="/domicile/logo-icon-black.svg" alt="DŌMICILE icon" width={727} height={919} className={styles.contactIcon} />
            <p className={styles.kicker}>Talk to DŌMICILE</p>
            <h2>Tell us about your property.</h2>
            <p>
              This is an enquiry, not a registration. Complete the short guided form and our team will contact you to understand the property and what you need.
            </p>
            <div className={styles.directContact}>
              <a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">+250 799 409 409</a>
            </div>
          </div>

          <div className={styles.formPanel}>
            {isSubmitted ? (
              <div className={styles.successState} role="status" aria-live="polite">
                <Image src="/domicile/logo-icon-black.svg" alt="" width={727} height={919} className={styles.successIcon} />
                <p className={styles.kicker}>Request received</p>
                <h3>We&apos;ve received your request.</h3>
                <p>
                  Thank you for contacting DŌMICILE. A member of our team will contact you to understand your property and discuss what you need.
                </p>
                <div className={styles.successActions}>
                  <a className={styles.submitButton} href={whatsappUrl} target="_blank" rel="noreferrer">Continue on WhatsApp <span>→</span></a>
                  <Link className={styles.secondaryDarkButton} href="/">Back to IMVO Group</Link>
                </div>
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

                <div className={styles.formProgress}>
                  {[1, 2, 3].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`${styles.progressItem} ${step === item ? styles.progressActive : ""} ${step > item ? styles.progressDone : ""}`}
                      onClick={() => {
                        if (item < step) setStep(item);
                      }}
                    >
                      <span>{item}</span>
                      <small>{item === 1 ? "Property" : item === 2 ? "Contact" : "Details"}</small>
                    </button>
                  ))}
                </div>

                {step === 1 ? (
                  <div className={styles.formStep}>
                    <p className={styles.formEyebrow}>Step 1 of 3</p>
                    <h3>About the property</h3>
                    <p className={styles.formLead}>Give us the basics so we know what kind of conversation to have with you.</p>

                    <fieldset>
                      <legend>Property type</legend>
                      <div className={styles.choiceGrid}>
                        {propertyTypes.map((item) => (
                          <button
                            type="button"
                            key={item}
                            className={form.propertyType === item ? styles.choiceSelected : ""}
                            onClick={() => updateField("propertyType", item)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <label>
                      <span>Property location</span>
                      <input
                        value={form.location}
                        onChange={(event) => updateField("location", event.target.value)}
                        placeholder="e.g. Kacyiru, Kigali"
                      />
                    </label>

                    <label>
                      <span>What would you like help with?</span>
                      <select value={form.helpWith} onChange={(event) => updateField("helpWith", event.target.value)}>
                        <option value="">Select an option</option>
                        {helpOptions.map((item) => <option key={item}>{item}</option>)}
                      </select>
                    </label>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className={styles.formStep}>
                    <p className={styles.formEyebrow}>Step 2 of 3</p>
                    <h3>How should we reach you?</h3>
                    <p className={styles.formLead}>These details are only used to respond to this enquiry.</p>
                    <div className={styles.formRow}>
                      <label>
                        <span>Full name</span>
                        <input value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Your name" />
                      </label>
                      <label>
                        <span>Phone / WhatsApp</span>
                        <input type="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+250 ..." />
                      </label>
                    </div>
                    <label>
                      <span>Email</span>
                      <input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="you@example.com" />
                    </label>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className={styles.formStep}>
                    <p className={styles.formEyebrow}>Step 3 of 3</p>
                    <h3>Anything else we should know?</h3>
                    <p className={styles.formLead}>A short description is enough. We will discuss the details with you afterwards.</p>
                    <label>
                      <span>Message</span>
                      <textarea
                        rows={6}
                        value={form.message}
                        onChange={(event) => updateField("message", event.target.value)}
                        placeholder="Tell us briefly what is happening or what you would like DŌMICILE to manage."
                      />
                    </label>
                    <div className={styles.reviewCard}>
                      <span>Enquiry summary</span>
                      <dl>
                        <div><dt>Property</dt><dd>{form.propertyType}</dd></div>
                        <div><dt>Location</dt><dd>{form.location}</dd></div>
                        <div><dt>Need</dt><dd>{form.helpWith}</dd></div>
                        <div><dt>Contact</dt><dd>{form.name} · {form.phone}</dd></div>
                      </dl>
                    </div>
                  </div>
                ) : null}

                {error ? <p className={styles.formError}>{error}</p> : null}

                <div className={styles.formControls}>
                  {step > 1 ? (
                    <button className={styles.backButton} type="button" onClick={previousStep}>← Back</button>
                  ) : <span />}

                  {step < 3 ? (
                    <button
                      className={styles.nextButton}
                      type="button"
                      onClick={nextStep}
                      disabled={step === 1 ? !stepOneReady : !stepTwoReady}
                    >
                      Continue <span>→</span>
                    </button>
                  ) : (
                    <button className={styles.submitButton} type="submit" disabled={!stepThreeReady || isSubmitting}>
                      {isSubmitting ? "Sending…" : "Send to DŌMICILE"}<span>→</span>
                    </button>
                  )}
                </div>

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
          <div>
            <Image
              src="/domicile/domicile-white-no-tagline.svg"
              alt="DŌMICILE"
              width={1495}
              height={292}
              className={styles.footerWordmark}
            />
            <p>Property Management by IMVO Group</p>
          </div>
          <div className={styles.footerLinks}>
            <a href="mailto:domicile@imvogroup.com">domicile@imvogroup.com</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">+250 799 409 409</a>
            <Link href="/">Back to IMVO Group →</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
