"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!supabaseConfigured) {
      setError("Password recovery will be enabled when the live DŌMICILE authentication project is connected.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${origin}/auth/callback?next=/auth/update-password`,
      });
      if (resetError) throw resetError;
      setMessage("If that email belongs to a DŌMICILE account, a secure recovery link has been sent.");
    } catch {
      setError("We could not start password recovery. Please try again.");
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
          <div className="eyebrow" style={{ color: "#888" }}>Account recovery</div>
          <h1>Get back to your property workspace.</h1>
          <p>We will send a secure recovery link to the email connected to your DŌMICILE account.</p>
        </div>
        <Link href="/login" style={{ color: "#8d8d8d", fontSize: 12 }}>← Back to sign in</Link>
      </section>

      <section className="loginPanel">
        <div className="loginBox">
          <div className="eyebrow">Secure recovery</div>
          <h2>Reset your password</h2>
          <p>Enter the email address used for your DŌMICILE owner or team account.</p>
          <form onSubmit={submit}>
            <label className="field">
              <span>Email</span>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
            </label>
            {error ? <div className="formAlert">{error}</div> : null}
            {message ? <div className="formSuccess">{message}</div> : null}
            <button className="loginButton" type="submit" disabled={loading}>{loading ? "Sending…" : "Send recovery link"}</button>
          </form>
        </div>
      </section>
    </main>
  );
}
