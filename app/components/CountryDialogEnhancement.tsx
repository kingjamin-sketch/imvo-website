"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type DialogOption = {
  value: string;
  label: string;
  meta?: string;
};

type DialogState = {
  select: HTMLSelectElement;
  title: string;
  options: DialogOption[];
  selectedValue: string;
};

const phoneCountryNames: Record<string, string> = {
  "+250": "Rwanda",
  "+256": "Uganda",
  "+254": "Kenya",
  "+255": "Tanzania",
  "+257": "Burundi",
  "+243": "Democratic Republic of the Congo",
  "+260": "Zambia",
  "+244": "Angola",
  "+258": "Mozambique",
  "+27": "South Africa",
  "+234": "Nigeria",
  "+233": "Ghana",
  "+251": "Ethiopia",
  "+971": "United Arab Emirates",
  "+44": "United Kingdom",
  "+1": "United States / Canada",
  "+33": "France",
  "+49": "Germany",
  "+86": "China",
  "+91": "India",
  OTHER: "Other / international",
};

const selector =
  'select[aria-label="Project country"], select[aria-label="Phone country code"]';

const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

export default function CountryDialogEnhancement() {
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const openSelect = (select: HTMLSelectElement) => {
      const isPhone = select.getAttribute("aria-label") === "Phone country code";
      const options = Array.from(select.options).map((option) => {
        const nativeLabel = normalize(option.textContent || option.label || option.value);

        if (isPhone) {
          return {
            value: option.value,
            label: phoneCountryNames[option.value] || nativeLabel,
            meta: nativeLabel,
          };
        }

        return {
          value: option.value,
          label: nativeLabel,
        };
      });

      setQuery("");
      setDialog({
        select,
        title: isPhone ? "Select calling code" : "Select project country",
        options,
        selectedValue: select.value,
      });
    };

    const handlePointerDown = (event: PointerEvent) => {
      const element = event.target instanceof Element ? event.target.closest(selector) : null;
      if (!(element instanceof HTMLSelectElement) || element.disabled) return;

      event.preventDefault();
      event.stopPropagation();
      openSelect(element);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const element = event.target instanceof Element ? event.target.closest(selector) : null;
      if (!(element instanceof HTMLSelectElement) || element.disabled) return;
      if (!["Enter", " ", "ArrowDown"].includes(event.key)) return;

      event.preventDefault();
      event.stopPropagation();
      openSelect(element);
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  useEffect(() => {
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => searchRef.current?.focus());

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDialog(null);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [dialog]);

  const visibleOptions = useMemo(() => {
    if (!dialog) return [];
    const needle = query.trim().toLowerCase();
    if (!needle) return dialog.options;

    return dialog.options.filter((option) =>
      `${option.label} ${option.meta || ""} ${option.value}`
        .toLowerCase()
        .includes(needle),
    );
  }, [dialog, query]);

  const chooseOption = (option: DialogOption) => {
    if (!dialog) return;

    const select = dialog.select;
    const setter = Object.getOwnPropertyDescriptor(
      HTMLSelectElement.prototype,
      "value",
    )?.set;

    setter?.call(select, option.value);
    select.dispatchEvent(new Event("input", { bubbles: true }));
    select.dispatchEvent(new Event("change", { bubbles: true }));
    setDialog(null);
    window.requestAnimationFrame(() => select.focus());
  };

  return (
    <>
      <style jsx global>{`
        ${selector} {
          cursor: pointer !important;
        }

        .imvo-country-dialog-backdrop {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: grid;
          place-items: center;
          padding: 22px;
          background: rgba(0, 0, 0, 0.68);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          animation: imvoCountryFade 180ms ease both;
        }

        .imvo-country-dialog {
          width: min(520px, 100%);
          max-height: min(680px, calc(100vh - 44px));
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #f7f6f2;
          color: #0a0a0a;
          border: 1px solid rgba(255, 255, 255, 0.28);
          box-shadow: 0 34px 90px rgba(0, 0, 0, 0.38);
          animation: imvoCountryLift 260ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .imvo-country-dialog-head {
          padding: 24px 24px 18px;
          border-bottom: 1px solid #d9d6cf;
        }

        .imvo-country-dialog-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .imvo-country-dialog-kicker {
          margin: 0 0 7px;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8a8377;
        }

        .imvo-country-dialog h2 {
          margin: 0;
          font-size: 24px;
          line-height: 1;
          letter-spacing: -0.035em;
          font-weight: 900;
        }

        .imvo-country-dialog-close {
          width: 38px;
          height: 38px;
          border: 1px solid #d2cec6;
          background: transparent;
          color: #111;
          font-size: 18px;
          cursor: pointer;
        }

        .imvo-country-dialog-search {
          width: 100%;
          height: 48px;
          margin-top: 18px;
          padding: 0 14px;
          border: 1px solid #cbc7be;
          border-radius: 0;
          outline: none;
          background: #fff;
          color: #111;
          font: 700 13px/1 Arial, Helvetica, sans-serif;
        }

        .imvo-country-dialog-search:focus {
          border-color: #111;
          box-shadow: inset 0 0 0 1px #111;
        }

        .imvo-country-dialog-list {
          overflow-y: auto;
          padding: 8px 0;
          overscroll-behavior: contain;
        }

        .imvo-country-option {
          width: 100%;
          min-height: 58px;
          padding: 10px 24px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 18px;
          align-items: center;
          border: 0;
          border-bottom: 1px solid #e3e0da;
          background: transparent;
          color: #111;
          text-align: left;
          cursor: pointer;
          transition: background 160ms ease, padding-left 220ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .imvo-country-option:hover,
        .imvo-country-option[aria-current="true"] {
          background: #ebe8e1;
          padding-left: 30px;
        }

        .imvo-country-option strong {
          display: block;
          font-size: 13px;
          line-height: 1.25;
          font-weight: 850;
        }

        .imvo-country-option small {
          display: block;
          margin-top: 4px;
          font-size: 10px;
          color: #817a70;
          letter-spacing: 0.035em;
        }

        .imvo-country-option-check {
          font-size: 16px;
          font-weight: 900;
          opacity: 0.9;
        }

        .imvo-country-empty {
          padding: 34px 24px;
          color: #777168;
          font-size: 13px;
        }

        @keyframes imvoCountryFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes imvoCountryLift {
          from { opacity: 0; transform: translateY(16px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 640px) {
          .imvo-country-dialog-backdrop {
            align-items: end;
            padding: 12px;
          }

          .imvo-country-dialog {
            width: 100%;
            max-height: min(78vh, 680px);
          }

          .imvo-country-dialog-head {
            padding: 20px 18px 16px;
          }

          .imvo-country-option {
            padding-left: 18px;
            padding-right: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .imvo-country-dialog-backdrop,
          .imvo-country-dialog,
          .imvo-country-option {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {dialog &&
        createPortal(
          <div
            className="imvo-country-dialog-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) setDialog(null);
            }}
          >
            <section
              className="imvo-country-dialog"
              role="dialog"
              aria-modal="true"
              aria-label={dialog.title}
            >
              <div className="imvo-country-dialog-head">
                <div className="imvo-country-dialog-title-row">
                  <div>
                    <p className="imvo-country-dialog-kicker">IMVO · Location</p>
                    <h2>{dialog.title}</h2>
                  </div>
                  <button
                    type="button"
                    className="imvo-country-dialog-close"
                    aria-label="Close country selection"
                    onClick={() => setDialog(null)}
                  >
                    ×
                  </button>
                </div>

                <input
                  ref={searchRef}
                  className="imvo-country-dialog-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search country or code"
                  aria-label="Search countries"
                />
              </div>

              <div className="imvo-country-dialog-list">
                {visibleOptions.length ? (
                  visibleOptions.map((option) => {
                    const selected = option.value === dialog.selectedValue;
                    return (
                      <button
                        key={`${option.value}-${option.label}`}
                        type="button"
                        className="imvo-country-option"
                        aria-current={selected ? "true" : undefined}
                        onClick={() => chooseOption(option)}
                      >
                        <span>
                          <strong>{option.label}</strong>
                          {option.meta ? <small>{option.meta}</small> : null}
                        </span>
                        <span className="imvo-country-option-check" aria-hidden="true">
                          {selected ? "✓" : ""}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="imvo-country-empty">No matching country found.</div>
                )}
              </div>
            </section>
          </div>,
          document.body,
        )}
    </>
  );
}
