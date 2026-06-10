export default function CookiesPage() {
  return (
    <main style={{ background: "#050505", color: "white", minHeight: "100vh", padding: "180px 0 120px" }}>
      <div className="containerWide" style={{ maxWidth: 920 }}>
        <p style={{ textTransform: "uppercase", letterSpacing: "0.12em", fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 800 }}>
          Legal
        </p>

        <h1 style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.92, letterSpacing: "-0.06em", margin: "18px 0 40px", fontWeight: 900 }}>
          Cookie Policy.
        </h1>

        <div style={{ color: "rgba(255,255,255,0.68)", fontSize: 18, lineHeight: 1.9 }}>
          <p>
            This Cookie Policy explains how IMVO Group may use cookies and similar technologies on our website.
          </p>

          <h2>What Cookies Are</h2>
          <p>
            Cookies are small files stored on your device to help websites function, remember preferences, improve performance, and understand visitor activity.
          </p>

          <h2>Types of Cookies We May Use</h2>
          <p>
            We may use essential cookies for website functionality, performance cookies to improve the browsing experience, and analytics cookies to understand how visitors interact with the website.
          </p>

          <h2>Analytics</h2>
          <p>
            If analytics tools are enabled, they may collect general information such as page visits, device type, browser type, and approximate location. This helps us improve the website and user experience.
          </p>

          <h2>Managing Cookies</h2>
          <p>
            You can control or disable cookies through your browser settings. Some website features may not function as intended if cookies are disabled.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            Some services used on this website, such as embedded maps, analytics tools, or form delivery providers, may use their own cookies or tracking technologies.
          </p>

          <h2>Contact</h2>
          <p>
            For cookie-related questions, contact us at imvodesign@gmail.com.
          </p>

          <p style={{ marginTop: 50, color: "rgba(255,255,255,0.38)", fontSize: 14 }}>
            Last updated: 2026
          </p>
        </div>
      </div>
    </main>
  );
}