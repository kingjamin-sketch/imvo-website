import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { BRAND, THEME } from "../components/Brand";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: THEME.PAPER, ["--line" as any]: THEME.LINE } as any}>
      <SiteHeader />

      {/* HERO */}
      <section className="pt-24">
        <div className="mx-auto max-w-[1400px] px-6 py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <div className="text-xs tracking-[0.35em] text-black/55">SERVICES</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                Three pillars, delivered with precision.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/70">
                Our work is organized into three core services: Architectural Design, Consultancy, and Supervision.
                Under each pillar, we provide defined deliverables — clear documentation, professional guidance,
                and on-site quality control.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/contact" className="rounded-full bg-black px-6 py-3 text-sm text-white hover:bg-black/90">
                  Request a Quote
                </Link>
                <Link href="/projects" className="rounded-full border border-black/20 px-6 py-3 text-sm hover:border-black/40">
                  See projects
                </Link>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="overflow-hidden rounded-3xl border border-[color:var(--line)] bg-white/70">
                <img
                  src="/services-hero.jpg"
                  alt="Services"
                  className="h-[420px] w-full object-cover"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                />
                <div className="h-[420px] w-full" />
              </div>
              <div className="mt-4 text-xs text-black/55">
                Upload as <b>public/services-hero.jpg</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-t border-[color:var(--line)] bg-white/70">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="text-xs tracking-[0.35em] text-black/55">PILLARS</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            What you get when you hire {BRAND.namePrimary}.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Pillar
              title="Architectural Design"
              intro="Architecture that balances aesthetics, buildability, and performance."
              items={[
                "Concept development & feasibility thinking",
                "Residential and commercial design",
                "Architectural drawings & documentation",
                "Planning-oriented design solutions",
                "Coordination support with engineers/consultants",
              ]}
            />
            <Pillar
              title="Consultancy"
              intro="Clear guidance that supports good decisions early."
              items={[
                "Architectural advisory services",
                "Feasibility & planning consultation",
                "Project development guidance",
                "Design reviews and technical feedback",
                "Site and planning strategy recommendations",
              ]}
            />
            <Pillar
              title="Supervision"
              intro="Quality assurance through monitoring and reporting."
              items={[
                "Construction supervision",
                "Site monitoring and progress reporting",
                "Quality checks against drawings/specs",
                "Design implementation oversight",
                "Support for resolving site issues",
              ]}
            />
          </div>
        </div>
      </section>

      {/* PROCESS (BLACK) */}
      <section className="border-t border-black/10 bg-black text-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="text-xs tracking-[0.35em] text-white/60">PROCESS</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            A simple, professional workflow — built for delivery.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
            <DarkStep n="01" t="Brief & Discovery" d="Goals, site understanding, constraints, and budget direction." />
            <DarkStep n="02" t="Concept & Options" d="Test ideas quickly, compare options, and align early." />
            <DarkStep n="03" t="Documentation" d="Drawings, specs, and coordination to support construction." />
            <DarkStep n="04" t="Supervision" d="Quality control, reporting, and design intent protection." />
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/75">
            For best results, clients should provide a site location, a short brief, inspiration references, timeline needs,
            and a budget range. We can help refine the brief if needed.
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[color:var(--line)]">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="text-xs tracking-[0.35em] text-black/55">FAQ</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Common questions.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Faq q="Do you only work in Rwanda?" a="We are based in Kigali and serve Rwanda, with expansion across East Africa depending on project scope." />
            <Faq q="Can you supervise a project even if you didn’t design it?" a="Yes — supervision and quality assurance can be provided for projects designed by others, depending on documentation and scope." />
            <Faq q="What do you need from me to start?" a="Site location, desired use/program, style references, timeline expectations, and budget range are ideal." />
            <Faq q="Do you provide engineering services?" a="We are engineering-aware and coordinate well. For full engineering disciplines, we collaborate with qualified partners as needed." />
          </div>

          <div className="mt-10">
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-black/80 hover:text-black">
              Contact us to start <span style={{ color: THEME.ACCENT }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function Pillar({ title, intro, items }: { title: string; intro: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-[color:var(--line)] bg-white/70 p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="text-lg font-semibold">{title}</div>
        <span className="mt-2 h-2 w-2 rounded-full" style={{ backgroundColor: THEME.ACCENT }} />
      </div>
      <div className="mt-3 text-sm text-black/65">{intro}</div>
      <ul className="mt-4 space-y-2 text-sm text-black/70">
        {items.map((x) => (
          <li key={x} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-black/30" />
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DarkStep({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="text-lg font-semibold">{n}</div>
      <div className="mt-2 text-base font-semibold">{t}</div>
      <div className="mt-2 text-sm leading-relaxed text-white/75">{d}</div>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-3xl border border-[color:var(--line)] bg-white/70 p-6">
      <div className="text-base font-semibold">{q}</div>
      <div className="mt-3 text-sm leading-relaxed text-black/65">{a}</div>
    </div>
  );
}