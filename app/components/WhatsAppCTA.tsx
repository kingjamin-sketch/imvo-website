"use client";

const IMVO_WHATSAPP_NUMBER = "250787349257";

export default function WhatsAppCTA() {
  const message = encodeURIComponent(
    "Hello IMVO, I would like to discuss a project or service.",
  );

  return (
    <a
      className="imvo-whatsapp-cta"
      href={`https://wa.me/${IMVO_WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Start a WhatsApp conversation with IMVO Group"
    >
      <style>{`
        .imvo-whatsapp-cta {
          position: fixed;
          left: 28px;
          bottom: 28px;
          z-index: 119;
          min-height: 48px;
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          border: 1px solid rgba(255,255,255,.28);
          border-radius: 999px;
          background: rgba(5,5,5,.92);
          color: #fff;
          box-shadow: 0 14px 40px rgba(0,0,0,.28);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          text-decoration: none;
          font-size: 12px;
          font-weight: 850;
          letter-spacing: .01em;
          transition: transform .18s ease, background .18s ease, border-color .18s ease;
        }
        .imvo-whatsapp-cta::before {
          content: "";
          width: 9px;
          height: 9px;
          flex: 0 0 9px;
          border-radius: 50%;
          background: #fff;
          opacity: .85;
        }
        .imvo-whatsapp-cta:hover {
          transform: translateY(-2px);
          background: #111;
          border-color: rgba(255,255,255,.5);
        }
        @media (max-width: 640px) {
          .imvo-whatsapp-cta {
            left: 14px;
            bottom: 14px;
            min-height: 48px;
            padding: 0 14px;
            font-size: 11px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .imvo-whatsapp-cta { transition: none; }
          .imvo-whatsapp-cta:hover { transform: none; }
        }
      `}</style>
      WhatsApp IMVO
      <span aria-hidden="true">↗</span>
    </a>
  );
}
