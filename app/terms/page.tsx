export default function TermsPage() {
  return (
    <main style={{ background: "#050505", color: "white", minHeight: "100vh", padding: "180px 0 120px" }}>
      <div className="containerWide" style={{ maxWidth: 920 }}>
        <p style={{ textTransform: "uppercase", letterSpacing: "0.12em", fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 800 }}>
          Legal
        </p>

        <h1 style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.92, letterSpacing: "-0.06em", margin: "18px 0 40px", fontWeight: 900 }}>
          Terms & Conditions.
        </h1>

        <div style={{ color: "rgba(255,255,255,0.68)", fontSize: 18, lineHeight: 1.9 }}>
          <p>
            By using this website, you agree to the following terms. The website is provided for general information about IMVO Group, our services, and our work.
          </p>

          <h2>Website Content</h2>
          <p>
            All text, imagery, layouts, project descriptions, graphics, and visual materials on this website are provided for informational and presentation purposes.
          </p>

          <h2>No Professional Agreement</h2>
          <p>
            Submitting an inquiry, sending an email, or using this website does not create a client relationship, consultancy agreement, architectural appointment, or supervision contract with IMVO Group.
          </p>

          <h2>Project Services</h2>
          <p>
            All architectural design, consultancy, supervision, planning, or development guidance services are subject to separate written agreements, scope definitions, timelines, fees, and professional terms.
          </p>

          <h2>Accuracy</h2>
          <p>
            We aim to keep website information accurate and current, but we do not guarantee that all content is complete, error-free, or continuously updated.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            Website content, visual identity, drawings, renders, layouts, and project materials remain the property of IMVO Group or their respective rights holders unless otherwise stated.
          </p>

          <h2>External Links</h2>
          <p>
            This website may contain links to third-party websites. IMVO Group is not responsible for the content, policies, or practices of external websites.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these terms, contact us at info@imvogroup.com.
          </p>

          <p style={{ marginTop: 50, color: "rgba(255,255,255,0.38)", fontSize: 14 }}>
            Last updated: 2026
          </p>
        </div>
      </div>
    </main>
  );
}