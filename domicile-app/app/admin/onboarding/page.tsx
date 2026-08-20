"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { createClient, demoModeEnabled, supabaseConfigured } from "@/lib/supabase/client";

type Stage = "checking" | "ready" | "forbidden" | "done";

export default function OnboardingPage() {
  const [stage, setStage] = useState<Stage>(demoModeEnabled ? "ready" : "checking");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ property: string; code: string; owner: string } | null>(null);

  useEffect(() => {
    if (!supabaseConfigured || demoModeEnabled) return;
    const check = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setStage("forbidden");
          return;
        }
        const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single();
        setStage(data?.role === "admin" ? "ready" : "forbidden");
      } catch {
        setStage("forbidden");
      }
    };
    void check();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("property_name") || "").trim();
    const propertyType = String(form.get("property_type") || "").trim();
    const address = String(form.get("address") || "").trim();
    const district = String(form.get("district") || "").trim();
    const sector = String(form.get("sector") || "").trim();
    const ownerName = String(form.get("owner_name") || "").trim();
    const ownerEmail = String(form.get("owner_email") || "").trim();
    const ownerPhone = String(form.get("owner_phone") || "").trim();

    if (!name || !propertyType || !ownerName || !ownerEmail) {
      setError("Property name/type and owner name/email are required.");
      return;
    }

    setLoading(true);
    try {
      if (!supabaseConfigured || demoModeEnabled) {
        await new Promise((resolve) => window.setTimeout(resolve, 450));
        setResult({ property: name, code: "DP-00100", owner: ownerEmail });
        setStage("done");
        return;
      }

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const { data: property, error: propertyError } = await supabase
        .from("properties")
        .insert({
          name,
          property_type: propertyType,
          address: address || null,
          district: district || null,
          sector: sector || null,
          city: "Kigali",
          country: "Rwanda",
          status: "managed",
          management_started_at: new Date().toISOString().slice(0, 10),
          created_by: user.id,
        })
        .select("id, code, name")
        .single();

      if (propertyError || !property) throw propertyError || new Error("Could not create property");

      const { error: inviteError } = await supabase.functions.invoke("invite-owner", {
        body: {
          email: ownerEmail,
          full_name: ownerName,
          phone: ownerPhone || null,
          property_id: property.id,
          is_primary: true,
        },
      });

      if (inviteError) {
        setError(`Property ${property.code} was created, but the owner invitation needs attention. ${inviteError.message}`);
        setResult({ property: property.name, code: property.code, owner: ownerEmail });
        return;
      }

      setResult({ property: property.name, code: property.code, owner: ownerEmail });
      setStage("done");
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Unknown error";
      setError(`Onboarding could not be completed. ${message}`);
    } finally {
      setLoading(false);
    }
  }

  if (stage === "checking") {
    return <main className="standalone"><div className="standaloneCard"><div className="eyebrow">DŌMICILE</div><h1>Checking access…</h1></div></main>;
  }

  if (stage === "forbidden") {
    return <main className="standalone"><div className="standaloneCard"><div className="eyebrow">Restricted</div><h1>Administrator access required.</h1><p>Managed-property onboarding is limited to an authorized DŌMICILE administrator.</p><Link className="action inlineAction" href="/">Back to workspace</Link></div></main>;
  }

  return (
    <main className="standalone onboardingPage">
      <div className="standaloneTop"><div><div className="brand">DŌMICILE</div><div className="brandSub">Property Management by IMVO Group</div></div><Link className="pill" href="/">← Workspace</Link></div>
      <section className="onboardingShell">
        <div className="onboardingIntro"><div className="eyebrow">Managed property onboarding</div><h1>Create the property relationship.</h1><p>Use this only after the owner has spoken with DŌMICILE and agreed to proceed. The property is created first, then the owner receives secure portal access linked to that property.</p><div className="onboardingFlow"><span>01 Property</span><i>→</i><span>02 Owner</span><i>→</i><span>03 Portal access</span></div></div>

        <form className="onboardingForm" onSubmit={submit}>
          <div className="formSection"><div className="eyebrow">01 · Property</div><h2>Property details</h2><div className="formGrid">
            <label className="field full"><span>Property name</span><input name="property_name" placeholder="e.g. Kacyiru Residence" required /></label>
            <label className="field"><span>Property type</span><select name="property_type" defaultValue="House"><option>House</option><option>Apartment</option><option>Commercial</option><option>Other</option></select></label>
            <label className="field"><span>District</span><input name="district" placeholder="e.g. Gasabo" /></label>
            <label className="field"><span>Sector</span><input name="sector" placeholder="e.g. Kacyiru" /></label>
            <label className="field full"><span>Address / access description</span><input name="address" placeholder="Street, estate, landmark or useful access description" /></label>
          </div></div>

          <div className="formSection"><div className="eyebrow">02 · Owner</div><h2>Primary owner</h2><div className="formGrid">
            <label className="field full"><span>Full name</span><input name="owner_name" autoComplete="name" required /></label>
            <label className="field"><span>Email</span><input name="owner_email" type="email" autoComplete="email" required /></label>
            <label className="field"><span>Phone / WhatsApp</span><input name="owner_phone" type="tel" autoComplete="tel" /></label>
          </div></div>

          <div className="onboardingNote"><strong>No open registration.</strong><span>The owner receives access only after DŌMICILE creates the property relationship and sends the secure invitation.</span></div>
          {error ? <div className="formAlert">{error}</div> : null}
          {result ? <div className="formSuccess"><strong>{result.code} · {result.property}</strong><br />Owner access: {result.owner}</div> : null}
          <div className="modalFooter"><button className="action" type="submit" disabled={loading}>{loading ? "Creating property…" : "Create property & invite owner →"}</button></div>
        </form>
      </section>
    </main>
  );
}
