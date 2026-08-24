import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="mobilePad"
      style={{
        minHeight: "78vh",
        display: "flex",
        alignItems: "center",
        background:
          "radial-gradient(circle at 72% 20%, rgba(255,255,255,0.08), transparent 28%), #050505",
        color: "white",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="containerWide" style={{ paddingTop: 120, paddingBottom: 96 }}>
        <div
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            fontSize: 12,
            fontWeight: 800,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          404 · Page not found
        </div>

        <h1
          style={{
            margin: "20px 0 0",
            maxWidth: 880,
            fontSize: "clamp(54px, 8vw, 118px)",
            lineHeight: 0.9,
            letterSpacing: "-0.07em",
            fontWeight: 900,
          }}
        >
          This route ends here.
        </h1>

        <p
          style={{
            margin: "34px 0 0",
            maxWidth: 620,
            fontSize: 18,
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.64)",
          }}
        >
          The page may have moved, the address may be incomplete, or the project is no longer published. Continue through the main IMVO website below.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 40 }}>
          <Link className="btn btnPrimary" href="/">
            Back to Home
          </Link>
          <Link className="btn" href="/projects">
            Explore Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
