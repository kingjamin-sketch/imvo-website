import Image from "next/image";
import Link from "next/link";

import type { ServicesPageContent } from "@/sanity/types/siteContent";
import type { ServiceDetail } from "./serviceDetails";
import { getOtherServices } from "./serviceDetails";

const collaboratorLogos = [
  { name: "Qonics Inc", src: "/partners/partner-1.png" },
  { name: "BM Engineering", src: "/partners/partner-2.png" },
  { name: "Show Makerz", src: "/partners/partner-3.png" },
  { name: "Optimus Anchor", src: "/partners/partner-4.png" },
  { name: "Operra", src: "/partners/partner-5.png" },
  { name: "Baho Holdings", src: "/partners/partner-8.png" },
];

export default function ServiceDetailPage({
  detail,
  content,
}: {
  detail: ServiceDetail;
  content?: ServicesPageContent | null;
}) {
  const processSteps = content?.processSteps?.length
    ? content.processSteps.slice(0, 4)
    : [
        { number: "01", title: "Discover", text: "We study goals, site conditions, constraints, budget realities, and stakeholder priorities." },
        { number: "02", title: "Define", text: "We clarify project direction, scope, planning logic, risks, and the strategic path forward." },
        { number: "03", title: "Develop", text: "We translate direction into coordinated decisions, documentation, and actionable project information." },
        { number: "04", title: "Deliver", text: "We support the next stage through clear coordination, review, and execution discipline." },
      ];
  const otherServices = getOtherServices(detail.slug);
  const whatsappHref = `https://wa.me/250787349257?text=${encodeURIComponent(detail.whatsappMessage)}`;

  return (
    <div className="service-detail-page">
      <style>{`
        .service-detail-page { background: #050505; color: #fff; overflow: hidden; }
        .service-detail-shell { width: min(1180px, calc(100% - 64px)); margin: 0 auto; }
        .service-detail-hero { min-height: 78vh; padding: 156px 0 82px; position: relative; display: flex; align-items: flex-end; border-bottom: 1px solid rgba(255,255,255,.10); }
        .service-detail-hero-media { position: absolute; inset: 0 0 0 48%; overflow: hidden; }
        .service-detail-hero-media::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg,#050505 0%,rgba(5,5,5,.86) 18%,rgba(5,5,5,.18) 64%,rgba(5,5,5,.46) 100%); }
        .service-detail-hero-copy { position: relative; z-index: 2; max-width: 730px; }
        .service-detail-kicker { text-transform: uppercase; letter-spacing: .12em; font-size: 12px; font-weight: 850; color: rgba(255,255,255,.58); }
        .service-detail-title { margin: 20px 0 0; max-width: 760px; font-size: clamp(54px,8vw,118px); line-height: .9; letter-spacing: -.07em; font-weight: 950; }
        .service-detail-intro { max-width: 680px; margin: 34px 0 0; color: rgba(255,255,255,.68); font-size: clamp(17px,1.6vw,21px); line-height: 1.7; }
        .service-detail-actions { margin-top: 36px; display: flex; flex-wrap: wrap; gap: 12px; }
        .service-detail-action { min-height: 48px; padding: 0 22px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,.2); color: #fff; text-decoration: none; font-size: 13px; font-weight: 850; }
        .service-detail-action.primary { background: #fff; color: #050505; border-color: #fff; }
        .service-detail-action.whatsapp { border-color: rgba(255,255,255,.45); }
        .service-detail-section { padding: 112px 0; border-bottom: 1px solid rgba(255,255,255,.08); }
        .service-detail-grid { display: grid; grid-template-columns: .78fr 1.22fr; gap: 80px; align-items: start; }
        .service-detail-section h2 { margin: 0; font-size: clamp(38px,5vw,72px); line-height: .98; letter-spacing: -.055em; }
        .service-detail-section p { color: rgba(255,255,255,.62); line-height: 1.75; }
        .service-detail-list { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); border-top: 1px solid rgba(255,255,255,.15); }
        .service-detail-list-item { min-height: 72px; padding: 18px 16px 18px 0; border-bottom: 1px solid rgba(255,255,255,.12); color: rgba(255,255,255,.85); font-size: 14px; font-weight: 750; }
        .service-detail-list-item:nth-child(odd) { border-right: 1px solid rgba(255,255,255,.10); margin-right: 20px; }
        .service-detail-value-grid { margin-top: 58px; display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); border-top: 1px solid rgba(255,255,255,.15); }
        .service-detail-value { padding: 28px 28px 0 0; min-height: 190px; }
        .service-detail-value + .service-detail-value { padding-left: 28px; border-left: 1px solid rgba(255,255,255,.12); }
        .service-detail-value strong { font-size: 20px; line-height: 1.2; }
        .service-detail-value p { margin: 14px 0 0; font-size: 14px; }
        .service-process-grid { margin-top: 56px; display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); border-top: 1px solid rgba(255,255,255,.15); }
        .service-process-step { padding: 26px 24px 0 0; min-height: 220px; }
        .service-process-step + .service-process-step { padding-left: 24px; border-left: 1px solid rgba(255,255,255,.12); }
        .service-process-number { color: rgba(255,255,255,.38); font-size: 12px; font-weight: 850; letter-spacing: .1em; }
        .service-process-step h3 { margin: 44px 0 0; font-size: 21px; }
        .service-process-step p { margin-top: 12px; font-size: 13px; }
        .service-trust { padding: 76px 0; background: #0a0a0a; border-bottom: 1px solid rgba(255,255,255,.08); }
        .service-trust-head { display: flex; justify-content: space-between; gap: 28px; align-items: end; }
        .service-trust-head h2 { max-width: 660px; }
        .service-logo-grid { margin-top: 48px; display: grid; grid-template-columns: repeat(6,minmax(0,1fr)); border: 1px solid rgba(255,255,255,.08); }
        .service-logo-cell { height: 104px; display: grid; place-items: center; border-right: 1px solid rgba(255,255,255,.08); }
        .service-logo-cell:last-child { border-right: 0; }
        .service-logo-cell img { max-width: 116px; max-height: 42px; width: auto; height: auto; object-fit: contain; filter: grayscale(1) brightness(0) invert(1); opacity: .62; }
        .service-other-grid { margin-top: 48px; display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 16px; }
        .service-other-card { min-height: 250px; padding: 30px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(255,255,255,.12); color: #fff; text-decoration: none; transition: background .2s ease,border-color .2s ease; }
        .service-other-card:hover { background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.3); }
        .service-other-card span { color: rgba(255,255,255,.4); font-size: 12px; font-weight: 850; }
        .service-other-card strong { font-size: clamp(30px,4vw,52px); line-height: 1; letter-spacing: -.05em; }
        .service-final-cta { padding: 122px 0 132px; text-align: center; }
        .service-final-cta h2 { max-width: 900px; margin: 0 auto; font-size: clamp(46px,7vw,94px); line-height: .94; letter-spacing: -.065em; }
        .service-final-cta p { max-width: 640px; margin: 26px auto 0; color: rgba(255,255,255,.62); line-height: 1.7; }
        .service-final-cta .service-detail-actions { justify-content: center; }
        @media (max-width: 900px) {
          .service-detail-shell { width: min(100% - 38px,1180px); }
          .service-detail-hero { min-height: 720px; padding-top: 132px; }
          .service-detail-hero-media { inset: 0; opacity: .44; }
          .service-detail-hero-media::after { background: linear-gradient(180deg,rgba(5,5,5,.5),#050505 82%); }
          .service-detail-grid { grid-template-columns: 1fr; gap: 44px; }
          .service-detail-value-grid { grid-template-columns: 1fr; }
          .service-detail-value + .service-detail-value { padding-left: 0; border-left: 0; border-top: 1px solid rgba(255,255,255,.1); }
          .service-process-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
          .service-process-step:nth-child(3) { padding-left: 0; border-left: 0; border-top: 1px solid rgba(255,255,255,.1); }
          .service-logo-grid { grid-template-columns: repeat(3,minmax(0,1fr)); }
          .service-logo-cell:nth-child(3n) { border-right: 0; }
          .service-logo-cell:nth-child(-n+3) { border-bottom: 1px solid rgba(255,255,255,.08); }
        }
        @media (max-width: 600px) {
          .service-detail-hero { min-height: 680px; padding-bottom: 60px; }
          .service-detail-title { font-size: clamp(48px,15vw,76px); }
          .service-detail-section { padding: 82px 0; }
          .service-detail-list { grid-template-columns: 1fr; }
          .service-detail-list-item:nth-child(odd) { border-right: 0; margin-right: 0; }
          .service-process-grid { grid-template-columns: 1fr; }
          .service-process-step, .service-process-step + .service-process-step, .service-process-step:nth-child(3) { padding: 24px 0; min-height: 0; border-left: 0; border-top: 1px solid rgba(255,255,255,.1); }
          .service-process-step:first-child { border-top: 0; }
          .service-process-step h3 { margin-top: 22px; }
          .service-trust-head { display: block; }
          .service-logo-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
          .service-logo-cell:nth-child(3n) { border-right: 1px solid rgba(255,255,255,.08); }
          .service-logo-cell:nth-child(2n) { border-right: 0; }
          .service-logo-cell { border-bottom: 1px solid rgba(255,255,255,.08); }
          .service-other-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="service-detail-hero">
        <div className="service-detail-hero-media" aria-hidden="true">
          <Image src={detail.image} alt="" fill priority sizes="(max-width: 900px) 100vw, 52vw" style={{ objectFit: "cover", filter: "grayscale(100%) contrast(1.06)" }} />
        </div>
        <div className="service-detail-shell">
          <div className="service-detail-hero-copy">
            <div className="service-detail-kicker">Services / {detail.number}</div>
            <h1 className="service-detail-title">{detail.title}</h1>
            <p className="service-detail-intro">{detail.description}</p>
            <div className="service-detail-actions">
              <Link className="service-detail-action primary" href={`/contact?service=${encodeURIComponent(detail.title)}#quote`}>
                Discuss this service
              </Link>
              <a className="service-detail-action whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                WhatsApp IMVO ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail-section">
        <div className="service-detail-shell service-detail-grid">
          <div>
            <div className="service-detail-kicker">Scope</div>
            <h2 style={{ marginTop: 18 }}>What this service can cover.</h2>
          </div>
          <div className="service-detail-list">
            {detail.includedServices.map((service) => (
              <div className="service-detail-list-item" key={service}>{service}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-detail-section">
        <div className="service-detail-shell">
          <div className="service-detail-kicker">Project value</div>
          <h2 style={{ marginTop: 18, maxWidth: 900 }}>{detail.valueHeading}</h2>
          <div className="service-detail-value-grid">
            {detail.valuePoints.map((point) => (
              <div className="service-detail-value" key={point.title}>
                <strong>{point.title}</strong>
                <p>{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-detail-section">
        <div className="service-detail-shell">
          <div className="service-detail-kicker">Working method</div>
          <h2 style={{ marginTop: 18 }}>{content?.processHeading || "A clear path from question to delivery."}</h2>
          <div className="service-process-grid">
            {processSteps.map((step, index) => (
              <div className="service-process-step" key={`${step.number || index}-${step.title || "step"}`}>
                <div className="service-process-number">{step.number || String(index + 1).padStart(2, "0")}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-trust">
        <div className="service-detail-shell">
          <div className="service-trust-head">
            <div>
              <div className="service-detail-kicker">Selected collaborators</div>
              <h2 style={{ marginTop: 18 }}>A wider network when the project needs it.</h2>
            </div>
            <p style={{ maxWidth: 430, margin: 0 }}>
              IMVO coordinates with selected technical specialists, consultants, suppliers, and delivery partners according to project needs.
            </p>
          </div>
          <div className="service-logo-grid" aria-label="Selected IMVO collaborators">
            {collaboratorLogos.map((logo) => (
              <div className="service-logo-cell" key={logo.name} title={logo.name}>
                <img src={logo.src} alt={logo.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-detail-section">
        <div className="service-detail-shell">
          <div className="service-detail-kicker">Related services</div>
          <h2 style={{ marginTop: 18 }}>The project may need more than one lens.</h2>
          <div className="service-other-grid">
            {otherServices.map((service) => (
              <Link href={`/services/${service.slug}`} className="service-other-card" key={service.slug}>
                <span>Service {service.number}</span>
                <strong>{service.title}</strong>
                <span>Explore service →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="service-final-cta">
        <div className="service-detail-shell">
          <div className="service-detail-kicker">Start with the right conversation</div>
          <h2>{content?.ctaHeading || "Tell us what you are trying to build, change, or understand."}</h2>
          <p>{content?.ctaText || "Share the site, project stage, priorities, and current questions. We will help define the appropriate next step and scope."}</p>
          <div className="service-detail-actions">
            <Link className="service-detail-action primary" href={`/contact?service=${encodeURIComponent(detail.title)}#quote`}>
              {content?.ctaButtonLabel || "Start a project discussion"}
            </Link>
            <a className="service-detail-action whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp IMVO ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
