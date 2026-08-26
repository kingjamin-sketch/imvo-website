"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createClient,
  demoModeEnabled,
  supabaseConfigured,
} from "@/lib/supabase/client";

type Role = "team" | "owner";
type Module = "Dashboard" | "Properties" | "Requests" | "Inspections" | "Expenses" | "Documents";
type RequestItem = {
  id: string;
  title: string;
  property: string;
  status: string;
  owner: string;
  category: string;
  description: string;
  amount?: number;
};

const modules: Module[] = ["Dashboard", "Properties", "Requests", "Inspections", "Expenses", "Documents"];

const initialRequests: RequestItem[] = [
  { id: "DM-00241", title: "Kitchen water leak", property: "Kacyiru Residence", status: "Approval needed", owner: "A. Mugisha", category: "Maintenance or repair", description: "Water is leaking below the kitchen sink. DŌMICILE reviewed the issue and received a repair estimate.", amount: 120000 },
  { id: "DM-00238", title: "Exterior light fault", property: "Nyarutarama Apartment", status: "In progress", owner: "D. Uwera", category: "Electrical", description: "Exterior entry light is not operating. Technician assigned." },
  { id: "DM-00235", title: "Quarterly condition check", property: "Kibagabaga Residence", status: "Scheduled", owner: "C. Habimana", category: "Inspection", description: "Routine quarterly condition inspection." },
  { id: "DM-00231", title: "Gate motor service", property: "Gacuriro House", status: "Completed", owner: "L. Kalisa", category: "Maintenance or repair", description: "Gate motor service completed and tested." },
];

const activity = [
  ["Kacyiru Residence", "Plumbing estimate uploaded — RWF 120,000", "12 min"],
  ["Nyarutarama Apartment", "Technician assigned to electrical case DM-00238", "39 min"],
  ["Kibagabaga Residence", "Inspection scheduled for Friday, 09:00", "1 hr"],
  ["Gacuriro House", "Gate motor case marked completed", "3 hr"],
];

export default function DomicileApp() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("team");
  const [active, setActive] = useState<Module>("Dashboard");
  const [requestItems, setRequestItems] = useState<RequestItem[]>(initialRequests);
  const [requestOpen, setRequestOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);
  const [profileName, setProfileName] = useState("IMVO Team");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!demoModeEnabled) return;
    const preview = new URLSearchParams(window.location.search).get("preview");
    if (preview === "owner" || preview === "team") setRole(preview);
  }, []);

  useEffect(() => {
    if (!supabaseConfigured || demoModeEnabled) return;

    let mounted = true;
    const loadProfile = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", user.id)
        .single();

      if (!mounted || !data) return;
      setProfileName(data.full_name || "DŌMICILE User");
      setRole(data.role === "owner" ? "owner" : "team");
    };

    void loadProfile();
    return () => { mounted = false; };
  }, [router]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const ownerMode = role === "owner";
  const title = ownerMode ? "My Property" : "DŌMICILE Operations";
  const initials = profileName.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || (ownerMode ? "OW" : "IM");

  const metrics = useMemo(() => ownerMode
    ? [
        ["Open requests", String(requestItems.filter((item) => item.status !== "Completed" && item.status !== "Closed").slice(0, 2).length), requestItems.some((item) => item.status === "Approval needed") ? "1 awaiting approval" : "No approvals pending"],
        ["Next inspection", "28 Aug", "Kacyiru Residence"],
        ["This month", "258.5K", "RWF property spend"],
        ["Documents", "14", "property records"],
      ]
    : [
        ["Managed properties", "18", "+2 this month"],
        ["Open cases", String(requestItems.filter((item) => !["Completed", "Closed"].includes(item.status)).length + 7), "live operational queue"],
        ["Owner approvals", String(requestItems.filter((item) => item.status === "Approval needed").length + 2), "action required"],
        ["Inspections due", "6", "next 7 days"],
      ], [ownerMode, requestItems]);

  async function signOut() {
    if (supabaseConfigured && !demoModeEnabled) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    router.replace("/login");
    router.refresh();
  }

  function approveSelected() {
    if (!selectedRequest) return;
    setRequestItems((current) => current.map((item) => item.id === selectedRequest.id ? { ...item, status: "In progress" } : item));
    setSelectedRequest((current) => current ? { ...current, status: "In progress" } : current);
    setToast(`${selectedRequest.id} approved. DŌMICILE can proceed with the agreed work.`);
  }

  function addDemoRequest(data: { title: string; category: string; description: string; urgency: string }) {
    const sequence = 242 + requestItems.length;
    const next: RequestItem = {
      id: `DM-${String(sequence).padStart(5, "0")}`,
      title: data.title,
      property: "Kacyiru Residence",
      status: "Received",
      owner: ownerMode ? profileName : "A. Mugisha",
      category: data.category,
      description: `${data.description}${data.urgency === "urgent" ? " · Marked urgent by owner." : ""}`,
    };
    setRequestItems((current) => [next, ...current]);
    setRequestOpen(false);
    setActive("Requests");
    setToast(`${next.id} received. DŌMICILE will review it.`);
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div>
          <div className="brand">DŌMICILE</div>
          <div className="brandSub">Property Management by IMVO Group</div>
        </div>

        <nav className="nav">
          {modules.map((item) => (
            <button key={item} className={active === item ? "active" : ""} onClick={() => setActive(item)}>
              <span>{item}</span>
            </button>
          ))}
        </nav>

        <div className="sidebarBottom">
          {demoModeEnabled ? (
            <div className="roleSwitch" aria-label="Preview role">
              <button className={role === "team" ? "active" : ""} onClick={() => setRole("team")}>Team</button>
              <button className={role === "owner" ? "active" : ""} onClick={() => setRole("owner")}>Owner</button>
            </div>
          ) : null}
          <a className="imvoLink" href="https://imvogroup.com/domicile">← DŌMICILE website</a>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <div className="eyebrow">{ownerMode ? "Owner Portal" : "Team Workspace"}</div>
            <h1>{title}</h1>
          </div>
          <div className="topActions">
            <button className="pill" onClick={signOut}>Sign out</button>
            <div className="avatar" title={profileName}>{initials}</div>
          </div>
        </header>

        <div className="content">
          {active === "Dashboard" && <Dashboard role={role} metrics={metrics} onReport={() => setRequestOpen(true)} onReview={() => setSelectedRequest(requestItems.find((item) => item.status === "Approval needed") || null)} />}
          {active === "Properties" && <Properties role={role} />}
          {active === "Requests" && <Requests role={role} items={requestItems} onReport={() => setRequestOpen(true)} onOpen={setSelectedRequest} />}
          {active === "Inspections" && <Inspections role={role} />}
          {active === "Expenses" && <Expenses role={role} onReview={() => setSelectedRequest(requestItems.find((item) => item.status === "Approval needed") || null)} />}
          {active === "Documents" && <Documents role={role} />}
        </div>
      </main>

      {requestOpen ? <RequestComposer onClose={() => setRequestOpen(false)} onCreate={addDemoRequest} /> : null}
      {selectedRequest ? <RequestDetail request={selectedRequest} ownerMode={ownerMode} onClose={() => setSelectedRequest(null)} onApprove={approveSelected} /> : null}
      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  );
}

function Dashboard({ role, metrics, onReport, onReview }: { role: Role; metrics: string[][]; onReport: () => void; onReview: () => void }) {
  const owner = role === "owner";
  return (
    <>
      <section className="hero">
        <div className="heroCard">
          <div className="eyebrow" style={{ color: "#8c8c8c" }}>{owner ? "Kacyiru Residence" : "Today · Kigali"}</div>
          <h2>{owner ? "Your property, handled." : "What needs attention today?"}</h2>
          <p>{owner
            ? "See what is happening at your property, approve work, review inspections and keep every record in one place."
            : "A single operational view of owner requests, property work, approvals, inspections and records across DŌMICILE managed properties."}</p>
          <button className="primary" onClick={onReport}>{owner ? "+ Report something" : "+ New property case"}</button>
        </div>
        <div className="sideCard">
          <div className="eyebrow">Attention</div>
          <h3>{owner ? "Your property status" : "Today’s priorities"}</h3>
          <div className="statusList">
            {(owner
              ? [["Kitchen leak", "Approval needed"], ["Next inspection", "28 Aug"], ["Property status", "Managed"]]
              : [["Owner approvals", "3 pending"], ["Urgent cases", "1 open"], ["Site visits", "4 today"]]
            ).map(([a, b], index) => <button className="statusRow statusButton" key={a} onClick={index === 0 ? onReview : undefined}><b>{a}</b><span>{b}</span></button>)}
          </div>
        </div>
      </section>

      <section className="metrics">
        {metrics.map(([label, value, note]) => <div className="metric" key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></div>)}
      </section>

      <section className="grid2">
        <div className="card">
          <div className="cardHead"><h3>{owner ? "Recent property activity" : "Live activity"}</h3><button>View all →</button></div>
          <div className="activity">
            {activity.map(([name, text, time]) => (
              <div className="activityRow" key={text}><span className="dot"/><div><b>{owner ? "Kacyiru Residence" : name}</b><p>{text}</p></div><time>{time}</time></div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="cardHead"><h3>{owner ? "Your property" : "Property spotlight"}</h3><button>Open →</button></div>
          <div className="propertyCard">
            <div className="propertyImage"/>
            <div className="propertyBody"><h4>Kacyiru Residence</h4><p>Kacyiru · Kigali · House</p><span className="tag">DŌMICILE Managed</span></div>
          </div>
        </div>
      </section>
    </>
  );
}

function Properties({ role }: { role: Role }) {
  const owner = role === "owner";
  return (
    <section>
      <div className="sectionTitle"><div className="eyebrow">Properties</div><h2>{owner ? "Your managed property" : "Managed properties"}</h2><p>{owner ? "Everything connected to your property lives here." : "The operational file for every DŌMICILE managed property."}</p></div>
      <div className="moduleGrid">
        {(owner ? ["Kacyiru Residence"] : ["Kacyiru Residence", "Nyarutarama Apartment", "Kibagabaga Residence", "Gacuriro House", "Remera Apartment", "Kimihurura Residence"]).map((name, i) => (
          <article className="propertyCard" key={name}>
            <div className="propertyImage" style={{ filter: `brightness(${1 - i * .04})` }}/>
            <div className="propertyBody"><h4>{name}</h4><p>Kigali, Rwanda · {i % 2 ? "Apartment" : "House"}</p><span className="tag">DŌMICILE Managed</span></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Requests({ role, items, onReport, onOpen }: { role: Role; items: RequestItem[]; onReport: () => void; onOpen: (item: RequestItem) => void }) {
  const [search, setSearch] = useState("");
  const visible = items.filter((item, index) => role === "team" || index < 3).filter((item) => `${item.id} ${item.title} ${item.property} ${item.status}`.toLowerCase().includes(search.toLowerCase()));
  return (
    <section>
      <div className="sectionTitle"><div className="eyebrow">Requests</div><h2>{role === "owner" ? "Your requests" : "Property cases"}</h2><p>Track each issue from receipt through approval, work and closure.</p></div>
      <div className="toolbar"><input className="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search case, property or status…"/><button className="action" onClick={onReport}>+ Report something</button></div>
      <div className="table">
        <div className="tr requestTr th"><span>Case</span><span>Request</span><span>Property</span><span>Status</span><span>Action</span></div>
        {visible.map((r) => <div className="tr requestTr" key={r.id}><b>{r.id}</b><span>{r.title}</span><span>{r.property}</span><span className={`badge ${r.status === "In progress" ? "dark" : ""}`}>{r.status}</span><button className="rowAction" onClick={() => onOpen(r)}>Open →</button></div>)}
      </div>
    </section>
  );
}

function Inspections({ role }: { role: Role }) {
  return (
    <section>
      <div className="sectionTitle"><div className="eyebrow">Inspections</div><h2>{role === "owner" ? "Property inspections" : "Inspection programme"}</h2><p>Condition checks, observations, photos and follow-up items.</p></div>
      <div className="moduleGrid">
        {["Quarterly condition check", "Roof & drainage review", "Move-out condition report"].map((title, i) => <article className="moduleCard" key={title}><span className={`badge ${i === 0 ? "dark" : ""}`}>{i === 0 ? "Scheduled" : i === 1 ? "Completed" : "Draft"}</span><h3>{title}</h3><p>{i === 0 ? "28 Aug 2026 · Kacyiru Residence" : "Includes room-by-room condition, photos, notes and recommended actions."}</p></article>)}
      </div>
    </section>
  );
}

function Expenses({ role, onReview }: { role: Role; onReview: () => void }) {
  return (
    <section>
      <div className="sectionTitle"><div className="eyebrow">Expenses</div><h2>{role === "owner" ? "Property spending" : "Property expenses"}</h2><p>Every cost linked back to the property, case, supplier and approval.</p></div>
      <div className="metrics">
        <div className="metric"><span>August total</span><strong>258.5K</strong><small>RWF</small></div>
        <button className="metric metricButton" onClick={onReview}><span>Pending approval</span><strong>120K</strong><small>Review kitchen plumbing →</small></button>
        <div className="metric"><span>Maintenance</span><strong>185K</strong><small>RWF this month</small></div>
        <div className="metric"><span>Materials</span><strong>73.5K</strong><small>RWF this month</small></div>
      </div>
      <div className="table"><div className="tr th"><span>Reference</span><span>Description</span><span>Property</span><span>Status</span><span>Amount</span></div>{[["EX-087","Plumbing materials","Kacyiru Residence","Approval needed","120,000"],["EX-083","Gate motor service","Gacuriro House","Paid","85,000"],["EX-081","Electrical parts","Nyarutarama Apartment","Paid","53,500"]].map((r)=><div className="tr" key={r[0]}>{r.map((c,i)=>i===3?<span key={c} className="badge">{c}</span>:i===0?<b key={c}>{c}</b>:<span key={c}>{i===4?`RWF ${c}`:c}</span>)}</div>)}</div>
    </section>
  );
}

function Documents({ role }: { role: Role }) {
  return (
    <section>
      <div className="sectionTitle"><div className="eyebrow">Documents</div><h2>Property records</h2><p>{role === "owner" ? "Secure records connected to your property." : "Agreements, inspections, invoices, receipts and property documentation."}</p></div>
      <div className="moduleGrid">
        {["Management Agreement", "Inspection Report — Q2", "Plumbing Invoice", "Property Plans", "Insurance Record", "Before / After Photos"].map((name, i)=><article className="moduleCard" key={name}><span className="badge">{i % 2 ? "PDF" : "Record"}</span><h3>{name}</h3><p>Kacyiru Residence · Updated {i+12} Aug 2026</p></article>)}
      </div>
    </section>
  );
}

function RequestComposer({ onClose, onCreate }: { onClose: () => void; onCreate: (data: { title: string; category: string; description: string; urgency: string }) => void }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Maintenance or repair");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("normal");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || description.trim().length < 10) return;
    onCreate({ title: title.trim(), category, description: description.trim(), urgency });
  }

  return (
    <div className="modalBackdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <form className="modal" onSubmit={submit}>
        <div className="modalHead"><div><div className="eyebrow">New property request</div><h2>Tell DŌMICILE what needs attention.</h2></div><button type="button" className="closeButton" onClick={onClose}>×</button></div>
        <div className="formGrid">
          <label className="field"><span>Property</span><input value="Kacyiru Residence" disabled /></label>
          <label className="field"><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>Maintenance or repair</option><option>Inspection request</option><option>Property improvement</option><option>Utility issue</option><option>Security / access concern</option><option>Other</option></select></label>
          <label className="field full"><span>What happened?</span><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Water leaking below kitchen sink" required /></label>
          <label className="field full"><span>Description</span><textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={5} placeholder="A short description is enough. You can add photos and documents once the live property file is connected." required /></label>
          <label className="field"><span>Urgency</span><select value={urgency} onChange={(event) => setUrgency(event.target.value)}><option value="normal">Normal</option><option value="urgent">Urgent attention</option></select></label>
        </div>
        <div className="modalFooter"><button type="button" className="secondaryAction" onClick={onClose}>Cancel</button><button type="submit" className="action">Send to DŌMICILE →</button></div>
      </form>
    </div>
  );
}

function RequestDetail({ request, ownerMode, onClose, onApprove }: { request: RequestItem; ownerMode: boolean; onClose: () => void; onApprove: () => void }) {
  return (
    <div className="modalBackdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="modal detailModal">
        <div className="modalHead"><div><div className="eyebrow">{request.id} · {request.property}</div><h2>{request.title}</h2></div><button className="closeButton" onClick={onClose}>×</button></div>
        <div className="detailStatus"><span className={`badge ${request.status === "In progress" ? "dark" : ""}`}>{request.status}</span><span>{request.category}</span></div>
        <p className="detailText">{request.description}</p>
        <div className="timeline">
          <div><span className="timelineDot"/><div><b>Request received</b><p>The case was added to the property history.</p></div></div>
          <div><span className="timelineDot"/><div><b>DŌMICILE reviewed the matter</b><p>The appropriate next step was identified and recorded.</p></div></div>
          {request.amount ? <div><span className="timelineDot"/><div><b>Owner approval requested</b><p>Estimated amount: RWF {request.amount.toLocaleString()}</p></div></div> : null}
          {request.status === "In progress" ? <div><span className="timelineDot filled"/><div><b>Approved — work can proceed</b><p>DŌMICILE will coordinate the agreed response and keep the owner informed.</p></div></div> : null}
        </div>
        {request.amount && request.status === "Approval needed" ? (
          <div className="approvalBox"><div><span>Approval requested</span><strong>RWF {request.amount.toLocaleString()}</strong><small>The amount and scope remain part of this case record.</small></div><div className="approvalActions">{ownerMode ? <><button className="secondaryAction">Ask a question</button><button className="action" onClick={onApprove}>Approve work →</button></> : <span className="waitingNote">Waiting for owner response</span>}</div></div>
        ) : null}
      </div>
    </div>
  );
}
