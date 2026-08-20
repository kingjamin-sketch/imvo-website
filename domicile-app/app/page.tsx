"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Role = "team" | "owner";
type Module = "Dashboard" | "Properties" | "Requests" | "Inspections" | "Expenses" | "Documents";

const modules: Module[] = ["Dashboard", "Properties", "Requests", "Inspections", "Expenses", "Documents"];

const requests = [
  { id: "DM-00241", title: "Kitchen water leak", property: "Kacyiru Residence", status: "Approval needed", owner: "A. Mugisha" },
  { id: "DM-00238", title: "Exterior light fault", property: "Nyarutarama Apartment", status: "In progress", owner: "D. Uwera" },
  { id: "DM-00235", title: "Quarterly condition check", property: "Kibagabaga Residence", status: "Scheduled", owner: "C. Habimana" },
  { id: "DM-00231", title: "Gate motor service", property: "Gacuriro House", status: "Completed", owner: "L. Kalisa" },
];

const activity = [
  ["Kacyiru Residence", "Plumbing estimate uploaded — RWF 120,000", "12 min"],
  ["Nyarutarama Apartment", "Technician assigned to electrical case DM-00238", "39 min"],
  ["Kibagabaga Residence", "Inspection scheduled for Friday, 09:00", "1 hr"],
  ["Gacuriro House", "Gate motor case marked completed", "3 hr"],
];

export default function DomicileApp() {
  const [role, setRole] = useState<Role>("team");
  const [active, setActive] = useState<Module>("Dashboard");

  const title = role === "team" ? "DŌMICILE Operations" : "My Property";
  const ownerMode = role === "owner";

  const metrics = useMemo(() => ownerMode
    ? [
        ["Open requests", "2", "1 awaiting approval"],
        ["Next inspection", "28 Aug", "Kacyiru Residence"],
        ["This month", "258.5K", "RWF property spend"],
        ["Documents", "14", "property records"],
      ]
    : [
        ["Managed properties", "18", "+2 this month"],
        ["Open cases", "11", "4 in progress"],
        ["Owner approvals", "3", "action required"],
        ["Inspections due", "6", "next 7 days"],
      ], [ownerMode]);

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
          <div className="roleSwitch" aria-label="Preview role">
            <button className={role === "team" ? "active" : ""} onClick={() => setRole("team")}>Team</button>
            <button className={role === "owner" ? "active" : ""} onClick={() => setRole("owner")}>Owner</button>
          </div>
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
            <Link className="pill" href="/login">Sign out</Link>
            <div className="avatar">{ownerMode ? "AM" : "IM"}</div>
          </div>
        </header>

        <div className="content">
          {active === "Dashboard" && <Dashboard role={role} metrics={metrics} />}
          {active === "Properties" && <Properties role={role} />}
          {active === "Requests" && <Requests role={role} />}
          {active === "Inspections" && <Inspections role={role} />}
          {active === "Expenses" && <Expenses role={role} />}
          {active === "Documents" && <Documents role={role} />}
        </div>
      </main>
    </div>
  );
}

function Dashboard({ role, metrics }: { role: Role; metrics: string[][] }) {
  const owner = role === "owner";
  return (
    <>
      <section className="hero">
        <div className="heroCard">
          <div className="eyebrow" style={{ color: "#8c8c8c" }}>{owner ? "Kacyiru Residence" : "Thursday · Kigali"}</div>
          <h2>{owner ? "Your property, handled." : "What needs attention today?"}</h2>
          <p>{owner
            ? "See what is happening at your property, approve work, review inspections and keep every record in one place."
            : "A single operational view of owner requests, property work, approvals, inspections and records across DŌMICILE managed properties."}</p>
          <button className="primary">{owner ? "+ Report something" : "+ New property case"}</button>
        </div>
        <div className="sideCard">
          <div className="eyebrow">Attention</div>
          <h3>{owner ? "Your property status" : "Today’s priorities"}</h3>
          <div className="statusList">
            {(owner
              ? [["Kitchen leak", "Approval needed"], ["Next inspection", "28 Aug"], ["Property status", "Managed"]]
              : [["Owner approvals", "3 pending"], ["Urgent cases", "1 open"], ["Site visits", "4 today"]]
            ).map(([a, b]) => <div className="statusRow" key={a}><b>{a}</b><span>{b}</span></div>)}
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

function Requests({ role }: { role: Role }) {
  return (
    <section>
      <div className="sectionTitle"><div className="eyebrow">Requests</div><h2>{role === "owner" ? "Your requests" : "Property cases"}</h2><p>Track each issue from receipt through approval, work and closure.</p></div>
      <div className="toolbar"><input className="search" placeholder="Search case, property or status…"/><button className="action">+ Report something</button></div>
      <div className="table">
        <div className="tr th"><span>Case</span><span>Request</span><span>Property</span><span>Status</span><span>Owner</span></div>
        {requests.filter((_, i) => role === "team" || i < 2).map((r) => <div className="tr" key={r.id}><b>{r.id}</b><span>{r.title}</span><span>{r.property}</span><span className={`badge ${r.status === "In progress" ? "dark" : ""}`}>{r.status}</span><span>{r.owner}</span></div>)}
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

function Expenses({ role }: { role: Role }) {
  return (
    <section>
      <div className="sectionTitle"><div className="eyebrow">Expenses</div><h2>{role === "owner" ? "Property spending" : "Property expenses"}</h2><p>Every cost linked back to the property, case, supplier and approval.</p></div>
      <div className="metrics">
        <div className="metric"><span>August total</span><strong>258.5K</strong><small>RWF</small></div>
        <div className="metric"><span>Pending approval</span><strong>120K</strong><small>Kitchen plumbing</small></div>
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
