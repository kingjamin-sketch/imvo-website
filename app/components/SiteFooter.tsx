"use client";

import Brand from "./Brand";
import { motion } from "framer-motion";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.12)" }}
      whileTap={{ scale: 0.95 }}
      style={{
        width: 42,
        height: 42,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(255,255,255,0.06)",
        cursor: "pointer",
        transition: "border-color 0.3s ease",
      }}
    >
      {children}
    </motion.span>
  );
}

export default function SiteFooter() {
  return (
    <footer className="sectionBlack" style={{ padding: "38px 0 28px" }}>
      <div className="containerWide">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <Brand variant="light" size="md" />

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a href="https://www.linkedin.com/company/imvo-design-group" target="_blank" rel="noreferrer">
              <Icon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6.94 8.5V21H3.5V8.5h3.44ZM5.22 3C6.32 3 7.2 3.9 7.2 5s-.88 2-1.98 2S3.25 6.1 3.25 5 4.12 3 5.22 3ZM21 21h-3.44v-6.4c0-1.52-.03-3.47-2.12-3.47-2.12 0-2.45 1.66-2.45 3.36V21H9.55V8.5h3.3v1.7h.05c.46-.87 1.6-1.78 3.3-1.78 3.53 0 4.18 2.32 4.18 5.35V21Z" fill="white" />
                </svg>
              </Icon>
            </a>

            <a href="https://www.instagram.com/imvo_group/" target="_blank" rel="noreferrer">
              <Icon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9A3.5 3.5 0 0 0 20 16.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm10.75 1.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" fill="white"/>
                </svg>
              </Icon>
            </a>

            <a href="https://x.com/Imvogroupafrica" target="_blank" rel="noreferrer">
              <Icon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M18.9 2H22l-6.8 7.8L23 22h-6.9l-5.4-7-6.1 7H1.5l7.3-8.3L1 2h7.1l4.9 6.3L18.9 2Zm-1.2 18h1.7L7.1 3.9H5.3L17.7 20Z" fill="white"/>
                </svg>
              </Icon>
            </a>

            <a href="https://www.facebook.com/people/IMVO-GROUP-Africa/100087615605183/" target="_blank" rel="noreferrer">
              <Icon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.87.24-1.46 1.49-1.46h1.63V5.02c-.28-.04-1.24-.12-2.36-.12-2.34 0-3.94 1.43-3.94 4.05V11H7.8v3h2.57v8h3.13Z" fill="white"/>
                </svg>
              </Icon>
            </a>

            <a href="https://www.youtube.com/@Imvogroupafrica" target="_blank" rel="noreferrer">
              <Icon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M21.6 7.2a3 3 0 0 0-2.12-2.12C17.6 4.5 12 4.5 12 4.5s-5.6 0-7.48.58A3 3 0 0 0 2.4 7.2 31.4 31.4 0 0 0 2 12a31.4 31.4 0 0 0 .4 4.8 3 3 0 0 0 2.12 2.12C6.4 19.5 12 19.5 12 19.5s5.6 0 7.48-.58a3 3 0 0 0 2.12-2.12A31.4 31.4 0 0 0 22 12a31.4 31.4 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" fill="white"/>
                </svg>
              </Icon>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}