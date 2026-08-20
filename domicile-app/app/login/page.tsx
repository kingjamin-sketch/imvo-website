"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createClient,
  demoModeEnabled,
  supabaseConfigured,
} from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!supabaseConfigured) {
      setError("Live DŌMICILE authentication is not connected yet. Use a preview button below.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("We could not sign you in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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

          <form onSubmit={signIn}>
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>
            <label className="field">
              <span>Password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
              />
            </label>
            {error ? <div className="formAlert">{error}</div> : null}
            <button className="loginButton" type="submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          {!supabaseConfigured && demoModeEnabled ? (
            <div className="previewBlock">
              <div className="previewLabel">V1 preview access</div>
              <div className="previewButtons">
                <button onClick={() => router.push("/?preview=team")}>Open Team workspace</button>
                <button onClick={() => router.push("/?preview=owner")}>Open Owner portal</button>
              </div>
              <p className="loginNote">Preview contains demo property data only. Live client records are not connected.</p>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
