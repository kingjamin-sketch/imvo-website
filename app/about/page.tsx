import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { BRAND, THEME } from "../components/Brand";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: THEME.PAPER, ["--line" as any]: THEME.LINE } as any}>
      <SiteHeader />

      {/* HERO */}
      <section className="relative pt-24">
        <div className="mx-auto max-w-[1400px] px-6 py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <div className="text-xs tracking-[0.35em] text-black/55">ABOUT</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                A Kigali-based architectural & planning firm shaping durable, modern environments.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/70">
                {BRAND.namePrimary} is a practice built around clarity: design that respects context, documentation that
                supports buildability, and supervision that protects quality. We connect design thinking with construction
                awareness so projects move from concept to completion with fewer surprises.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/projects" className="rounded-full bg-black px-6 py-3 text-sm text-white hover:bg-black/90">
                  Explore projects
                </Link>
                <Link href="/services" className="rounded-full border border-black/20 px-6 py-3 text-sm hover:border-black/40">
                  View services
                </Link>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="overflow-hidden rounded-3xl border border-[color:var(--line)] bg-white/70">
                <img
                  src="/about-hero.jpg"
                  alt="About IMVO"
                  className="h-[420px] w-full object-cover"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                />
                <div className="h-[420px] w-full" />
              </div>
              <div className="mt-4 text-xs text-black/55">
                Upload a strong studio/architecture image as <b>public/about-hero.jpg</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLACK STORY */}
      <section className="border-t border-black/10 bg-black text-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="text-xs tracking-[0.35em] text-white/60">STORY</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Why we exist: to deliver architecture that performs in the real world.
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-base leading-relaxed text-white/75">
                We believe good architecture is not only visually strong — it must also be buildable, economically
                sensible, and resilient over time. Our work combines sustainable principles with technical precision and
                modern methods, while staying grounded in Rwanda’s context and practical realities.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                <DarkCard title="Vision">
                  To become a leading African architectural and urban planning firm shaping sustainable cities, innovative
                  structures, and resilient communities for generations to come.
                </DarkCard>
                <DarkCard title="Mission">
                  To design and supervise projects that combine sustainability, technical precision, and modern innovation
                  while delivering functional, buildable, and economically viable solutions.
                </DarkCard>
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-xs tracking-[0.25em] text-white/60">CORE VALUES</div>
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
                  {["Sustainability", "Innovation", "Integrity", "Precision", "Functionality"].map((v) => (
                    <div key={v} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
                      {v}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/70">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: THEME.ACCENT }} />
                Serving Rwanda and expanding across East Africa.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="border-t border-[color:var(--line)]">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="text-xs tracking-[0.35em] text-black/55">APPROACH</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            A disciplined method — from brief to supervision.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
            <StepCard n="01" t="Discovery" d="We define goals, constraints, budget direction, and site realities." />
            <StepCard n="02" t="Concept" d="We test massing, orientation, program, and feasibility early." />
            <StepCard n="03" t="Documentation" d="We produce clear drawings and specs that support buildability." />
            <StepCard n="04" t="Supervision" d="We protect design intent and quality through site monitoring." />
          </div>

          <div className="mt-10 rounded-3xl border border-[color:var(--line)] bg-white/70 p-6">
            <div className="text-sm text-black/70">
              Want a deeper breakdown? See the full deliverables and what clients receive on the Services page.
            </div>
            <div className="mt-4">
              <Link href="/services" className="inline-flex items-center gap-2 text-sm text-black/80 hover:text-black">
                Go to Services <span style={{ color: THEME.ACCENT }}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM STRIP */}
      <section className="border-t border-[color:var(--line)] bg-white/55">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="text-xs tracking-[0.35em] text-black/55">TEAM</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">People behind the work.</h2>
              <p className="mt-4 text-sm leading-relaxed text-black/65">
                Keep your team photo as <b>public/team.jpg</b>. We can add individual headshots later as
                <b> public/team/member-01.jpg</b> etc.
              </p>
              <Link href="/contact" className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm text-white hover:bg-black/90">
                Contact us
              </Link>
            </div>
            <div className="md:col-span-7">
              <div className="overflow-hidden rounded-3xl border border-[color:var(--line)] bg-white/70">
                <img src="/team.jpg" alt="IMVO Team" className="h-[420px] w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function DarkCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="text-xs tracking-[0.25em] text-white/60">{title.toUpperCase()}</div>
      <div className="mt-3 text-sm leading-relaxed text-white/75">{children}</div>
    </div>
  );
}

function StepCard({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="rounded-3xl border border-[color:var(--line)] bg-white/70 p-6">
      <div className="text-lg font-semibold">{n}</div>
      <div className="mt-2 text-base font-semibold">{t}</div>
      <div className="mt-2 text-sm leading-relaxed text-black/65">{d}</div>
    </div>
  );
}