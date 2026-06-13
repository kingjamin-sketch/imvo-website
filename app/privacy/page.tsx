export default function PrivacyPage() {
  return (
    <main style={{ background: "#050505", color: "white", minHeight: "100vh", padding: "180px 0 120px" }}>
      <div className="containerWide" style={{ maxWidth: 920 }}>
        <p style={{ textTransform: "uppercase", letterSpacing: "0.12em", fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 800 }}>
          Legal
        </p>

        <h1 style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.92, letterSpacing: "-0.06em", margin: "18px 0 40px", fontWeight: 900 }}>
          Privacy Policy.
        </h1>

        <div style={{ color: "rgba(255,255,255,0.68)", fontSize: 18, lineHeight: 1.9 }}>
          <p>
            IMVO Group respects your privacy. This Privacy Policy explains how we collect, use, and protect information submitted through our website.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We may collect information you voluntarily provide through inquiry forms, email, WhatsApp, or direct communication. This may include your name, email address, phone number, project location, project details, budget range, and requested services.
          </p>

          <h2>How We Use Information</h2>
          <p>
            We use submitted information to respond to inquiries, understand project requirements, prepare consultations, coordinate services, and improve our communication process.
          </p>

          <h2>Form Submissions</h2>
          <p>
            Website inquiry submissions may be processed through third-party form delivery tools for the purpose of sending your inquiry to our studio email.
          </p>

          <h2>Analytics & Cookies</h2>
          <p>
            We may use basic analytics tools to understand website traffic, performance, and visitor behavior. These tools may use cookies or similar technologies.
          </p>

          <h2>Data Protection</h2>
          <p>
            We take reasonable steps to protect information submitted through the website. However, no online transmission or storage method is fully secure.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy-related questions, contact us at info@imvogroup.com.
          </p>

          <p style={{ marginTop: 50, color: "rgba(255,255,255,0.38)", fontSize: 14 }}>
            Last updated: 2026
          </p>
        </div>
      </div>
    </main>
  );
}