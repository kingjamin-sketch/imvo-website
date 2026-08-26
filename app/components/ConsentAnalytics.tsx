"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { GrowthSettings } from "@/sanity/types/cmsBackend";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const STORAGE_KEY = "imvo-cookie-consent-v1";
type ConsentChoice = "accepted" | "essential";

export default function ConsentAnalytics({ growth }: { growth: GrowthSettings | null }) {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [gaReady, setGaReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "essential") setChoice(stored);
    } catch {
      // Storage may be blocked; the banner remains available for this visit.
    }
    setHydrated(true);
  }, []);

  const measurementId = useMemo(() => {
    const value = growth?.gaMeasurementId?.trim();
    return value && /^G-[A-Z0-9]+$/i.test(value) ? value : null;
  }, [growth?.gaMeasurementId]);

  const analyticsAllowed =
    hydrated &&
    choice === "accepted" &&
    growth?.analyticsEnabled === true &&
    Boolean(measurementId);

  useEffect(() => {
    if (!analyticsAllowed || !gaReady || !measurementId || !window.gtag) return;
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [analyticsAllowed, gaReady, measurementId, pathname]);

  if (pathname?.startsWith("/studio")) return null;

  const bannerEnabled = growth?.cookieConsentEnabled !== false;
  const showBanner = hydrated && bannerEnabled && choice === null;

  const saveChoice = (value: ConsentChoice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Keep the in-memory choice even if persistent storage is unavailable.
    }
    setChoice(value);
  };

  return (
    <>
      {analyticsAllowed && measurementId ? (
        <Script
          id="imvo-ga4-loader"
          src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
          strategy="afterInteractive"
          onLoad={() => {
            window.dataLayer = window.dataLayer || [];
            window.gtag = (...args: unknown[]) => {
              window.dataLayer?.push(args);
            };
            window.gtag("js", new Date());
            window.gtag("config", measurementId, { send_page_view: false });
            setGaReady(true);
          }}
        />
      ) : null}

      {showBanner ? (
        <div className="imvo-consent" role="dialog" aria-label="Privacy preferences" aria-live="polite">
          <div className="imvo-consent-copy">
            <strong>{growth?.cookieConsentTitle || "Privacy preferences"}</strong>
            <p>
              {growth?.cookieConsentText ||
                "We use essential technologies to keep this site working. With your permission, we also use analytics to understand how the website is used and improve it."}
            </p>
            <Link href="/cookies">{growth?.cookiePolicyLabel || "Cookie Policy"}</Link>
          </div>
          <div className="imvo-consent-actions">
            <button type="button" className="secondary" onClick={() => saveChoice("essential")}>
              {growth?.cookieRejectLabel || "Essential only"}
            </button>
            <button type="button" className="primary" onClick={() => saveChoice("accepted")}>
              {growth?.cookieAcceptLabel || "Accept analytics"}
            </button>
          </div>
          <style jsx>{`
            .imvo-consent {
              position: fixed;
              left: 50%;
              bottom: 24px;
              z-index: 100001;
              width: min(920px, calc(100vw - 32px));
              transform: translateX(-50%);
              display: grid;
              grid-template-columns: minmax(0, 1fr) auto;
              gap: 28px;
              align-items: center;
              padding: 22px 24px;
              color: #fff;
              background: rgba(8, 8, 8, 0.96);
              border: 1px solid rgba(255, 255, 255, 0.16);
              box-shadow: 0 24px 70px rgba(0, 0, 0, 0.42);
              backdrop-filter: blur(18px);
              -webkit-backdrop-filter: blur(18px);
            }
            .imvo-consent-copy strong {
              display: block;
              font-size: 15px;
              letter-spacing: -0.01em;
            }
            .imvo-consent-copy p {
              margin: 7px 0 0;
              max-width: 650px;
              color: rgba(255, 255, 255, 0.68);
              font-size: 13px;
              line-height: 1.55;
            }
            .imvo-consent-copy a {
              display: inline-block;
              margin-top: 8px;
              color: rgba(255, 255, 255, 0.78);
              font-size: 12px;
              text-underline-offset: 3px;
            }
            .imvo-consent-actions {
              display: flex;
              gap: 10px;
              flex-wrap: wrap;
              justify-content: flex-end;
            }
            .imvo-consent button {
              min-height: 44px;
              border-radius: 2px;
              padding: 0 17px;
              font: inherit;
              font-size: 12px;
              font-weight: 850;
              cursor: pointer;
            }
            .imvo-consent button.secondary {
              color: #fff;
              background: transparent;
              border: 1px solid rgba(255, 255, 255, 0.22);
            }
            .imvo-consent button.primary {
              color: #050505;
              background: #fff;
              border: 1px solid #fff;
            }
            @media (max-width: 720px) {
              .imvo-consent {
                bottom: 12px;
                grid-template-columns: 1fr;
                gap: 18px;
                padding: 20px;
              }
              .imvo-consent-actions {
                justify-content: stretch;
              }
              .imvo-consent button {
                flex: 1 1 150px;
              }
            }
          `}</style>
        </div>
      ) : null}
    </>
  );
}
