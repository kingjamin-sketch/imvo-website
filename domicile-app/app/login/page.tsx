import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="login">
      <section className="loginVisual">
        <div>
          <div className="brand">DŌMICILE</div>
          <div className="brandSub">Property Management by IMVO Group</div>
        </div>
        <div>
          <div className="eyebrow" style={{ color: "#888" }}>Property workspace</div>
          <h1>Your property. One clear place.</h1>
          <p>Requests, approvals, inspections, expenses and property records — connected to the same DŌMICILE management relationship.</p>
        </div>
        <a href="https://imvogroup.com/domicile" style={{ color: "#8d8d8d", fontSize: 12 }}>← Back to DŌMICILE website</a>
      </section>

      <section className="loginPanel">
        <div className="loginBox">
          <div className="eyebrow">Secure access</div>
          <h2>Sign in to DŌMICILE</h2>
          <p>Owners and DŌMICILE team members use the same secure login. Your role determines what you can see and do.</p>
          <label className="field"><span>Email</span><input type="email" placeholder="you@example.com" /></label>
          <label className="field"><span>Password</span><input type="password" placeholder="••••••••" /></label>
          <Link className="loginButton" href="/" style={{ display: "block", textAlign: "center" }}>Sign in</Link>
          <p className="loginNote">Preview mode for V1. Supabase Auth will replace this link when the live project is connected.</p>
        </div>
      </section>
    </main>
  );
}
