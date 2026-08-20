"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  createPropertyCase,
  getCurrentProfile,
  listAccessibleCases,
  listAccessibleDocuments,
  listAccessibleExpenses,
  listAccessibleInspections,
  listAccessibleProperties,
  listMyApprovals,
  respondToApproval,
  type LiveApproval,
  type LiveCase,
  type LiveDocument,
  type LiveExpense,
  type LiveInspection,
  type LiveProfile,
  type LiveProperty,
} from "@/lib/domicile-data";

type Module = "Dashboard" | "Properties" | "Requests" | "Inspections" | "Expenses" | "Documents";
const modules: Module[] = ["Dashboard", "Properties", "Requests", "Inspections", "Expenses", "Documents"];

export default function LiveWorkspace() {
  const router = useRouter();
  const [profile, setProfile] = useState<LiveProfile | null>(null);
  const [properties, setProperties] = useState<LiveProperty[]>([]);
  const [cases, setCases] = useState<LiveCase[]>([]);
  const [approvals, setApprovals] = useState<LiveApproval[]>([]);
  const [inspections, setInspections] = useState<LiveInspection[]>([]);
  const [expenses, setExpenses] = useState<LiveExpense[]>([]);
  const [documents, setDocuments] = useState<LiveDocument[]>([]);
  const [active, setActive] = useState<Module>("Dashboard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState<LiveApproval | null>(null);
  const [toast, setToast] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const currentProfile = await getCurrentProfile();
      if (!currentProfile) {
        router.replace("/login");
        return;
      }
      const [propertyRows, caseRows, approvalRows, inspectionRows, expenseRows, documentRows] = await Promise.all([
        listAccessibleProperties(),
        listAccessibleCases(),
        listMyApprovals(),
        listAccessibleInspections(),
        listAccessibleExpenses(),
        listAccessibleDocuments(),
      ]);
      setProfile(currentProfile);
      setProperties(propertyRows);
      setCases(caseRows);
      setApprovals(approvalRows);
      setInspections(inspectionRows);
      setExpenses(expenseRows);
      setDocuments(documentRows);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The DŌMICILE workspace could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const propertyNames = useMemo(() => new Map(properties.map((property) => [property.id, property.name])), [properties]);
  const ownerMode = profile?.role === "owner";
  const pendingApprovals = approvals.filter((approval) => approval.status === "pending");
  const openCases = cases.filter((item) => !["completed", "closed"].includes(item.status));
  const totalSpend = expenses.reduce((sum, item) => sum + Number(item.amount_rwf || 0), 0);
  const initials = (profile?.full_name || "DŌMICILE User").split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  async function submitCase(input: { propertyId: string; category: string; title: string; description: string; urgency: "normal" | "urgent" }) {
    const created = await createPropertyCase(input);
    setCases((current) => [created, ...current]);
    setComposerOpen(false);
    setActive("Requests");
    setToast(`${created.reference} received and added to the property history.`);
  }

  async function answerApproval(response: "approved" | "declined" | "question", note?: string) {
    if (!selectedApproval) return;
    const updated = await respondToApproval({ approvalId: selectedApproval.id, response, note });
    setApprovals((current) => current.map((item) => item.id === updated.id ? updated : item));
    setSelectedApproval(updated);
    setToast(`Approval response saved: ${response}.`);
  }

  if (loading) {
    return <main className="standalone"><div className="standaloneCard"><div className="eyebrow">DŌMICILE secure workspace</div><h1>Loading property records…</h1><p>Checking your account and property access.</p></div></main>;
  }

  if (error || !profile) {
    return <main className="standalone"><div className="standaloneCard"><div className="eyebrow">DŌMICILE</div><h1>Workspace unavailable.</h1><p>{error || "Your account profile could not be loaded."}</p><button className="action" onClick={() => void load()}>Try again</button></div></main>;
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div><div className="brand">DŌMICILE</div><div className="brandSub">Property Management by IMVO Group</div></div>
        <nav className="nav">
          {modules.map((item) => <button key={item} className={active === item ? "active" : ""} onClick={() => setActive(item)}><span>{item}</span></button>)}
        </nav>
        <div className="sidebarBottom">
          {profile.role === "admin" ? <Link className="imvoLink" href="/admin/onboarding">+ Onboard managed property</Link> : null}
          <a className="imvoLink" href="https://imvogroup.com/domicile">← DŌMICILE website</a>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div><div className="eyebrow">{ownerMode ? "Owner Portal" : "Team Workspace"}</div><h1>{ownerMode ? "My Property" : "DŌMICILE Operations"}</h1></div>
          <div className="topActions"><button className="pill" onClick={() => void load()}>Refresh</button><button className="pill" onClick={() => void signOut()}>Sign out</button><div className="avatar" title={profile.full_name}>{initials || "DM"}</div></div>
        </header>

        <div className="content">
          {active === "Dashboard" ? <Dashboard ownerMode={ownerMode} properties={properties} openCases={openCases} pendingApprovals={pendingApprovals} inspections={inspections} documents={documents} totalSpend={totalSpend} propertyNames={propertyNames} onReport={() => setComposerOpen(true)} onApproval={setSelectedApproval} /> : null}
          {active === "Properties" ? <Properties properties={properties} /> : null}
          {active === "Requests" ? <Requests cases={cases} propertyNames={propertyNames} onReport={() => setComposerOpen(true)} /> : null}
          {active === "Inspections" ? <Inspections inspections={inspections} propertyNames={propertyNames} /> : null}
          {active === "Expenses" ? <Expenses expenses={expenses} approvals={approvals} ownerMode={ownerMode} propertyNames={propertyNames} onApproval={setSelectedApproval} /> : null}
          {active === "Documents" ? <Documents documents={documents} propertyNames={propertyNames} /> : null}
        </div>
      </main>

      {composerOpen ? <CaseComposer properties={properties} onClose={() => setComposerOpen(false)} onSubmit={submitCase} /> : null}
      {selectedApproval ? <ApprovalModal approval={selectedApproval} ownerMode={ownerMode} onClose={() => setSelectedApproval(null)} onRespond={answerApproval} /> : null}
      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  );
}

function Dashboard({ ownerMode, properties, openCases, pendingApprovals, inspections, documents, totalSpend, propertyNames, onReport, onApproval }: { ownerMode: boolean; properties: LiveProperty[]; openCases: LiveCase[]; pendingApprovals: LiveApproval[]; inspections: LiveInspection[]; documents: LiveDocument[]; totalSpend: number; propertyNames: Map<string, string>; onReport: () => void; onApproval: (approval: LiveApproval) => void }) {
  const nextInspection = inspections.filter((item) => item.scheduled_for && !item.completed_at).sort((a, b) => String(a.scheduled_for).localeCompare(String(b.scheduled_for)))[0];
  const metrics = [
    [ownerMode ? "My properties" : "Managed properties", String(properties.length), "accessible records"],
    ["Open requests", String(openCases.length), "active property cases"],
    ["Pending approvals", String(pendingApprovals.length), "action required"],
    ["Recorded spend", formatRwf(totalSpend), `${documents.length} documents`],
  ];
  return <>
    <section className="hero"><div className="heroCard"><div className="eyebrow" style={{ color: "#8c8c8c" }}>{ownerMode ? "Your managed property file" : "Live operations"}</div><h2>{ownerMode ? "Your property, handled." : "One operational view."}</h2><p>{ownerMode ? "Requests, approvals, inspections, expenses and records are drawn from your secure DŌMICILE property file." : "Live property relationships, cases, owner approvals, inspections and records across DŌMICILE."}</p><button className="primary" onClick={onReport}>+ Report something</button></div><div className="sideCard"><div className="eyebrow">Attention</div><h3>What needs action</h3><div className="statusList"><button className="statusRow statusButton" onClick={() => pendingApprovals[0] && onApproval(pendingApprovals[0])}><b>Owner approvals</b><span>{pendingApprovals.length} pending</span></button><div className="statusRow"><b>Open requests</b><span>{openCases.length}</span></div><div className="statusRow"><b>Next inspection</b><span>{nextInspection?.scheduled_for ? formatDate(nextInspection.scheduled_for) : "None scheduled"}</span></div></div></div></section>
    <section className="metrics">{metrics.map(([label, value, note]) => <div className="metric" key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></div>)}</section>
    <section className="grid2"><div className="card"><div className="cardHead"><h3>Recent requests</h3></div><div className="activity">{openCases.slice(0, 5).map((item) => <div className="activityRow" key={item.id}><span className="dot"/><div><b>{item.reference} · {propertyNames.get(item.property_id) || "Property"}</b><p>{item.title}</p></div><time>{formatDate(item.created_at)}</time></div>)}{openCases.length === 0 ? <div className="empty">No open requests.</div> : null}</div></div><div className="card"><div className="cardHead"><h3>Property access</h3></div>{properties.slice(0, 3).map((property) => <div className="statusRow" key={property.id}><b>{property.name}</b><span>{property.code}</span></div>)}{properties.length === 0 ? <div className="empty">No managed property is linked to this account yet.</div> : null}</div></section>
  </>;
}

function Properties({ properties }: { properties: LiveProperty[] }) {
  return <section><div className="sectionTitle"><div className="eyebrow">Properties</div><h2>Managed properties</h2><p>Only properties authorized for this account are shown.</p></div><div className="moduleGrid">{properties.map((property) => <article className="propertyCard" key={property.id}><div className="propertyImage"/><div className="propertyBody"><h4>{property.name}</h4><p>{property.city} · {property.property_type} · {property.code}</p><span className="tag">{property.status}</span></div></article>)}{properties.length === 0 ? <div className="empty">No properties available.</div> : null}</div></section>;
}

function Requests({ cases, propertyNames, onReport }: { cases: LiveCase[]; propertyNames: Map<string, string>; onReport: () => void }) {
  const [search, setSearch] = useState("");
  const visible = cases.filter((item) => `${item.reference} ${item.title} ${propertyNames.get(item.property_id) || ""} ${item.status}`.toLowerCase().includes(search.toLowerCase()));
  return <section><div className="sectionTitle"><div className="eyebrow">Requests</div><h2>Property cases</h2><p>Every issue remains linked to its property history.</p></div><div className="toolbar"><input className="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search case, property or status…"/><button className="action" onClick={onReport}>+ Report something</button></div><div className="table"><div className="tr th"><span>Case</span><span>Request</span><span>Property</span><span>Status</span><span>Opened</span></div>{visible.map((item) => <div className="tr" key={item.id}><b>{item.reference}</b><span>{item.title}</span><span>{propertyNames.get(item.property_id) || "Property"}</span><span className="badge">{humanize(item.status)}</span><span>{formatDate(item.created_at)}</span></div>)}</div></section>;
}

function Inspections({ inspections, propertyNames }: { inspections: LiveInspection[]; propertyNames: Map<string, string> }) {
  return <section><div className="sectionTitle"><div className="eyebrow">Inspections</div><h2>Property inspections</h2><p>Condition checks and scheduled property reviews.</p></div><div className="moduleGrid">{inspections.map((item) => <article className="moduleCard" key={item.id}><span className="badge">{humanize(item.overall_status)}</span><h3>{item.title}</h3><p>{propertyNames.get(item.property_id) || "Property"} · {item.scheduled_for ? formatDate(item.scheduled_for) : "Not scheduled"}</p>{item.summary ? <p>{item.summary}</p> : null}</article>)}{inspections.length === 0 ? <div className="empty">No inspections recorded yet.</div> : null}</div></section>;
}

function Expenses({ expenses, approvals, ownerMode, propertyNames, onApproval }: { expenses: LiveExpense[]; approvals: LiveApproval[]; ownerMode: boolean; propertyNames: Map<string, string>; onApproval: (approval: LiveApproval) => void }) {
  const total = expenses.reduce((sum, item) => sum + Number(item.amount_rwf || 0), 0);
  const pending = approvals.filter((item) => item.status === "pending");
  return <section><div className="sectionTitle"><div className="eyebrow">Expenses</div><h2>Property spending</h2><p>Costs and owner approvals connected to the managed property record.</p></div><div className="metrics"><div className="metric"><span>Recorded total</span><strong>{formatRwf(total)}</strong><small>RWF</small></div><button className="metric metricButton" onClick={() => pending[0] && onApproval(pending[0])}><span>Pending approvals</span><strong>{pending.length}</strong><small>{ownerMode ? "Review owner action →" : "Awaiting owner action"}</small></button></div><div className="table"><div className="tr th"><span>Reference</span><span>Description</span><span>Property</span><span>Status</span><span>Amount</span></div>{expenses.map((item) => <div className="tr" key={item.id}><b>{item.reference}</b><span>{item.description}</span><span>{propertyNames.get(item.property_id) || "Property"}</span><span className="badge">{humanize(item.status)}</span><span>RWF {Number(item.amount_rwf).toLocaleString()}</span></div>)}</div></section>;
}

function Documents({ documents, propertyNames }: { documents: LiveDocument[]; propertyNames: Map<string, string> }) {
  return <section><div className="sectionTitle"><div className="eyebrow">Documents</div><h2>Property records</h2><p>Secure document metadata from the property file.</p></div><div className="moduleGrid">{documents.map((item) => <article className="moduleCard" key={item.id}><span className="badge">{item.category}</span><h3>{item.title}</h3><p>{propertyNames.get(item.property_id) || "Property"} · {formatDate(item.created_at)}</p></article>)}{documents.length === 0 ? <div className="empty">No owner-visible documents recorded yet.</div> : null}</div></section>;
}

function CaseComposer({ properties, onClose, onSubmit }: { properties: LiveProperty[]; onClose: () => void; onSubmit: (input: { propertyId: string; category: string; title: string; description: string; urgency: "normal" | "urgent" }) => Promise<void> }) {
  const [propertyId, setPropertyId] = useState(properties[0]?.id || "");
  const [category, setCategory] = useState("Maintenance or repair");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState<"normal" | "urgent">("normal");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setError(""); if (!propertyId) { setError("Choose a managed property first."); return; } setSaving(true); try { await onSubmit({ propertyId, category, title: title.trim(), description: description.trim(), urgency }); } catch (caught) { setError(caught instanceof Error ? caught.message : "The request could not be created."); } finally { setSaving(false); } }
  return <div className="modalBackdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><form className="modal" onSubmit={submit}><div className="modalHead"><div><div className="eyebrow">New property request</div><h2>Tell DŌMICILE what needs attention.</h2></div><button type="button" className="closeButton" onClick={onClose}>×</button></div><div className="formGrid"><label className="field"><span>Property</span><select value={propertyId} onChange={(event) => setPropertyId(event.target.value)} required><option value="">Choose property</option>{properties.map((property) => <option key={property.id} value={property.id}>{property.name}</option>)}</select></label><label className="field"><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>Maintenance or repair</option><option>Inspection request</option><option>Property improvement</option><option>Utility issue</option><option>Security / access concern</option><option>Other</option></select></label><label className="field full"><span>What happened?</span><input value={title} onChange={(event) => setTitle(event.target.value)} required /></label><label className="field full"><span>Description</span><textarea rows={5} value={description} onChange={(event) => setDescription(event.target.value)} required /></label><label className="field"><span>Urgency</span><select value={urgency} onChange={(event) => setUrgency(event.target.value as "normal" | "urgent")}><option value="normal">Normal</option><option value="urgent">Urgent attention</option></select></label></div>{error ? <div className="formAlert">{error}</div> : null}<div className="modalFooter"><button type="button" className="secondaryAction" onClick={onClose}>Cancel</button><button className="action" type="submit" disabled={saving}>{saving ? "Sending…" : "Send to DŌMICILE →"}</button></div></form></div>;
}

function ApprovalModal({ approval, ownerMode, onClose, onRespond }: { approval: LiveApproval; ownerMode: boolean; onClose: () => void; onRespond: (response: "approved" | "declined" | "question", note?: string) => Promise<void> }) {
  const [note, setNote] = useState(approval.owner_note || "");
  const [saving, setSaving] = useState(false);
  async function respond(response: "approved" | "declined" | "question") { setSaving(true); try { await onRespond(response, note); } finally { setSaving(false); } }
  return <div className="modalBackdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="modal detailModal"><div className="modalHead"><div><div className="eyebrow">Owner approval</div><h2>{approval.title}</h2></div><button className="closeButton" onClick={onClose}>×</button></div><div className="approvalBox"><div><span>Status</span><strong>{approval.amount_rwf == null ? "Scope approval" : `RWF ${Number(approval.amount_rwf).toLocaleString()}`}</strong><small>{humanize(approval.status)}</small></div></div>{approval.description ? <p className="detailText">{approval.description}</p> : null}{ownerMode && approval.status === "pending" ? <><label className="field"><span>Optional note / question</span><textarea rows={4} value={note} onChange={(event) => setNote(event.target.value)} /></label><div className="modalFooter"><button className="secondaryAction" disabled={saving} onClick={() => void respond("question")}>Ask a question</button><button className="secondaryAction" disabled={saving} onClick={() => void respond("declined")}>Decline</button><button className="action" disabled={saving} onClick={() => void respond("approved")}>Approve work →</button></div></> : <p className="detailText">{ownerMode ? "Your response is recorded in the case history." : "This approval is controlled by the linked property owner."}</p>}</div></div>;
}

function humanize(value: string) { return value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()); }
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat("en-RW", { day: "2-digit", month: "short", year: "numeric" }).format(date); }
function formatRwf(value: number) { return Math.round(value).toLocaleString("en-US"); }
