import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { THEME } from "../components/Brand";

const projects = [
  { title: "Kigali Residential Villa", category: "Residential", year: "2024", location: "Kigali", status: "Concept → Documentation", img: "/projects/p01.jpg" },
  { title: "Mixed-Use Commercial Block", category: "Commercial", year: "2024", location: "Kigali", status: "Feasibility + Planning", img: "/projects/p02.jpg" },
  { title: "Urban Layout Strategy", category: "Planning", year: "2023", location: "East Africa", status: "Strategy", img: "/projects/p03.jpg" },
  { title: "Office & Retail Fit-Out", category: "Commercial", year: "2023", location: "Kigali", status: "Design + Supervision", img: "/projects/p04.jpg" },
  { title: "Multi-Family Prototype", category: "Residential", year: "2022", location: "Rwanda", status: "Prototype", img: "/projects/p05.jpg" },
  { title: "Community Facility Concept", category: "Planning", year: "2022", location: "Rwanda", status: "Concept", img: "/projects/p06.jpg" },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: THEME.PAPER, ["--line" as any]: THEME.LINE } as any}>
      <SiteHeader />

      <section className="pt-24">
        <div className="mx-auto max-w-[1400px] px-6 py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <div className="text-xs tracking-[0.35em] text-black/55">PROJECTS</div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                Work across residential, commercial, and planning.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/70">
                This page is designed for richer storytelling than the homepage. Each project card will later open a full
                project page with more photos, drawings, and a detailed description.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/65">
                Replace images by uploading files into <b>public/projects/</b> with the same names (p01.jpg, p02.jpg…).
              </p>
            </div>

            <div className="md:col-span-6">
              <div className="overflow-hidden rounded-3xl border border-[color:var(--line)] bg-white/70">
                <img
                  src="/projects-hero.jpg"
                  alt="Projects hero"
                  className="h-[420px] w-full object-cover"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                />
                <div className="h-[420px] w-full" />
              </div>
              <div className="mt-4 text-xs text-black/55">
                Upload as <b>public/projects-hero.jpg</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="border-t border-[color:var(--line)] bg-white/60">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="text-xs tracking-[0.35em] text-black/55">GALLERY</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Selected work (placeholder grid).
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {projects.map((p) => (
              <article key={p.title} className="rounded-3xl border border-[color:var(--line)] bg-white/70 p-6 hover:border-black/25">
                <div className="overflow-hidden rounded-2xl border border-[color:var(--line)] bg-white/70">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-48 w-full object-cover"
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                  />
                  <div className="h-48 w-full" />
                </div>

                <div className="mt-4 text-base font-semibold">{p.title}</div>
                <div className="mt-2 text-xs text-black/55">
                  {p.category} · {p.location} · {p.year}
                </div>
                <div className="mt-3 text-sm text-black/65">{p.status}</div>

                <div className="mt-4 text-sm text-black/70">Open project →</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BLACK STATEMENT */}
      <section className="border-t border-black/10 bg-black text-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="text-xs tracking-[0.35em] text-white/60">QUALITY</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            A project is only successful when it is delivered.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/75">
            Our project approach emphasizes clear documentation, coordination, and supervision. We focus on buildability,
            technical precision, and sustainability so the final result matches the intent — and performs over time.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}