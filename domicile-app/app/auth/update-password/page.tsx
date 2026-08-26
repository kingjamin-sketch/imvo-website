"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 10) {
      setError("Use at least 10 characters for your new password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("The two passwords do not match.");
      return;
    }
    if (!supabaseConfigured) {
      setError("Live DŌMICILE authentication is not connected yet.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      router.replace("/");
      router.refresh();
    } catch {
      setError("We could not update your password. Request a new recovery link and try again.");
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
          <h1>Set a new secure password.</h1>
          <p>Your new password protects access to property records, approvals, expenses and documents.</p>
        </div>
        <span style={{ color: "#8d8d8d", fontSize: 12 }}>Secure DŌMICILE workspace</span>
      </section>

      <section className="loginPanel">
        <div className="loginBox">
          <div className="eyebrow">New password</div>
          <h2>Secure your account</h2>
          <p>Use a password you do not reuse on another service.</p>
          <form onSubmit={submit}>
            <label className="field"><span>New password</span><input type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
            <label className="field"><span>Confirm password</span><input type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required /></label>
            {error ? <div className="formAlert">{error}</div> : null}
            <button className="loginButton" type="submit" disabled={loading}>{loading ? "Updating…" : "Update password"}</button>
          </form>
        </div>
      </section>
    </main>
  );
}
