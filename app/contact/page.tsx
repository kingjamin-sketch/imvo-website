import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { BRAND, THEME } from "../components/Brand";

export default function ContactPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: THEME.PAPER, ["--line" as any]: THEME.LINE } as any}>
      <SiteHeader />

      <section className="pt-24">
        <div className="mx-auto max-w-[1400px] px-6 py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <div className="text-xs tracking-[0.35em] text-black/55">CONTACT</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                Start a project with {BRAND.nameOfficial}.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/70">
                This page is intentionally longer than the homepage. It helps clients understand what to send, how we
                respond, and what the first steps look like.
              </p>

              <div className="mt-8 rounded-3xl border border-[color:var(--line)] bg-white/70 p-6">
                <div className="text-xs tracking-[0.25em] text-black/55">OFFICIAL</div>
                <div className="mt-2 text-lg font-semibold">{BRAND.nameOfficial}</div>
                <div className="mt-2 text-sm text-black/70">{BRAND.location}</div>
                <div className="mt-4 text-sm text-black/70">
                  <div><span className="text-black/50">Email:</span> {BRAND.email}</div>
                  <div className="mt-1"><span className="text-black/50">Phone:</span> {BRAND.phone}</div>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-[color:var(--line)] bg-white/70 p-6">
                <div className="text-xs tracking-[0.25em] text-black/55">WHAT TO INCLUDE IN YOUR BRIEF</div>
                <ul className="mt-4 space-y-2 text-sm text-black/70">
                  {[
                    "Project type (house, apartment, commercial, planning, etc.)",
                    "Location / site details (address, map pin, or sector)",
                    "Timeline expectations",
                    "Budget range (even a rough range helps)",
                    "Inspiration references (links/photos)",
                    "Any constraints (permits, land size, setbacks, existing structure)",
                  ].map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-black/30" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="overflow-hidden rounded-3xl border border-[color:var(--line)] bg-white/70">
                <img
                  src="/contact-hero.jpg"
                  alt="Contact hero"
                  className="h-[260px] w-full object-cover"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                />
                <div className="h-[260px] w-full" />
              </div>
              <div className="mt-4 text-xs text-black/55">
                Upload as <b>public/contact-hero.jpg</b>
              </div>

              <div className="mt-6 rounded-3xl border border-[color:var(--line)] bg-white/70 p-6">
                <div className="text-xs tracking-[0.25em] text-black/55">REQUEST A QUOTE</div>
                <div className="mt-4 grid gap-4">
                  <input className="rounded-2xl border border-[color:var(--line)] bg-white/70 px-4 py-3" placeholder="Full name" />
                  <input className="rounded-2xl border border-[color:var(--line)] bg-white/70 px-4 py-3" placeholder="Email" />
                  <input className="rounded-2xl border border-[color:var(--line)] bg-white/70 px-4 py-3" placeholder="Phone (optional)" />
                  <textarea className="min-h-[140px] rounded-2xl border border-[color:var(--line)] bg-white/70 px-4 py-3" placeholder="Project details" />
                  <button className="rounded-2xl bg-black px-5 py-3 text-sm text-white hover:bg-black/90">
                    Send request
                  </button>
                  <div className="text-xs text-black/50">
                    Next step: we can connect this to email or a backend form handler.
                  </div>
                </div>
              </div>

              {/* Map placeholder (optional) */}
              <div className="mt-6 overflow-hidden rounded-3xl border border-[color:var(--line)] bg-white/70">
                <div className="p-5 text-sm text-black/60">
                  Map embed can go here later (Google Maps iframe).
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLACK RESPONSE PROMISE */}
      <section className="border-t border-black/10 bg-black text-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="text-xs tracking-[0.35em] text-white/60">NEXT STEPS</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            What happens after you contact us.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <DarkStep title="We review your brief" text="We confirm scope, location, timeline, and project type." />
            <DarkStep title="We propose next actions" text="We suggest a path: concept start, feasibility check, or supervision plan." />
            <DarkStep title="We align and begin" text="We agree on deliverables and move into design, consultancy, or supervision." />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function DarkStep({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="text-base font-semibold">{title}</div>
      <div className="mt-3 text-sm leading-relaxed text-white/75">{text}</div>
    </div>
  );
}