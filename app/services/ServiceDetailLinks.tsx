import Link from "next/link";

const services = [
  { number: "01", title: "Built Environment Design", href: "/services/design", text: "Concept, spatial planning, documentation, visualization, and coordinated design development." },
  { number: "02", title: "Consultancy & Strategy", href: "/services/consultancy", text: "Feasibility, site and development advisory, planning, permits, due diligence, and project strategy." },
  { number: "03", title: "Site Coordination & Delivery", href: "/services/site-coordination", text: "Site observation, contractor coordination, design-intent review, progress support, snagging, and handover coordination." },
] as const;

export default function ServiceDetailLinks() {
  return (
    <section className="phase3-service-links">
      <style>{`
        .phase3-service-links { padding: 106px 0 118px; background: #050505; border-top: 1px solid rgba(255,255,255,.08); }
        .phase3-service-links-shell { width: min(1180px, calc(100% - 64px)); margin: 0 auto; }
        .phase3-service-links-kicker { text-transform: uppercase; letter-spacing: .12em; font-size: 12px; color: rgba(255,255,255,.48); font-weight: 850; }
        .phase3-service-links h2 { max-width: 860px; margin: 18px 0 0; font-size: clamp(42px,5vw,72px); line-height: .98; letter-spacing: -.055em; }
        .phase3-service-links-grid { margin-top: 50px; display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); border-top: 1px solid rgba(255,255,255,.14); }
        .phase3-service-card { min-height: 310px; padding: 28px 28px 26px 0; display: flex; flex-direction: column; color: #fff; text-decoration: none; }
        .phase3-service-card + .phase3-service-card { padding-left: 28px; border-left: 1px solid rgba(255,255,255,.12); }
        .phase3-service-card-number { color: rgba(255,255,255,.36); font-size: 12px; font-weight: 850; }
        .phase3-service-card h3 { margin: 52px 0 0; max-width: 280px; font-size: clamp(28px,3vw,42px); line-height: 1; letter-spacing: -.045em; }
        .phase3-service-card p { margin: 18px 0 0; color: rgba(255,255,255,.58); font-size: 14px; line-height: 1.65; }
        .phase3-service-card-cta { margin-top: auto; padding-top: 30px; font-size: 13px; font-weight: 850; }
        .phase3-service-card:hover .phase3-service-card-cta { text-decoration: underline; text-underline-offset: 5px; }
        @media (max-width: 850px) {
          .phase3-service-links-shell { width: min(100% - 38px,1180px); }
          .phase3-service-links-grid { grid-template-columns: 1fr; }
          .phase3-service-card, .phase3-service-card + .phase3-service-card { min-height: 0; padding: 30px 0; border-left: 0; border-bottom: 1px solid rgba(255,255,255,.10); }
          .phase3-service-card h3 { margin-top: 26px; max-width: 520px; }
          .phase3-service-card-cta { margin-top: 26px; }
        }
      `}</style>
      <div className="phase3-service-links-shell">
        <div className="phase3-service-links-kicker">Individual services</div>
        <h2>Go deeper into the support your project actually needs.</h2>
        <div className="phase3-service-links-grid">
          {services.map((service) => (
            <Link className="phase3-service-card" href={service.href} key={service.href}>
              <div className="phase3-service-card-number">SERVICE {service.number}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="phase3-service-card-cta">Explore service →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
