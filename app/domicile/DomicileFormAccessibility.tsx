"use client";

import { useEffect } from "react";

const srOnly: Partial<CSSStyleDeclaration> = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: "0",
};

export default function DomicileFormAccessibility() {
  useEffect(() => {
    const section = document.getElementById("enquire");
    const form = section?.querySelector<HTMLFormElement>("form");
    if (!section || !form) return;

    const byPlaceholder = (placeholder: string) =>
      form.querySelector<HTMLInputElement | HTMLTextAreaElement>(
        `[placeholder="${placeholder}"]`,
      );

    const name = byPlaceholder("Your name");
    if (name instanceof HTMLInputElement) {
      name.name = "name";
      name.autocomplete = "name";
    }

    const phone = byPlaceholder("+250 ...");
    if (phone instanceof HTMLInputElement) {
      phone.name = "phone";
      phone.autocomplete = "tel";
      phone.inputMode = "tel";
    }

    const email = byPlaceholder("you@example.com");
    if (email instanceof HTMLInputElement) {
      email.name = "email";
      email.autocomplete = "email";
      email.inputMode = "email";
    }

    const location = byPlaceholder("e.g. Kacyiru, Kigali");
    if (location instanceof HTMLInputElement) {
      location.name = "property-location";
      location.autocomplete = "off";
    }

    const message = form.querySelector<HTMLTextAreaElement>("textarea");
    if (message) {
      message.name = "message";
      message.autocomplete = "off";
    }

    const contactHelpId = "domicile-contact-help";
    if (!document.getElementById(contactHelpId)) {
      const help = document.createElement("span");
      help.id = contactHelpId;
      help.textContent = "Provide either a phone or WhatsApp number, or an email address.";
      Object.assign(help.style, srOnly);
      form.prepend(help);
    }
    phone?.setAttribute("aria-describedby", contactHelpId);
    email?.setAttribute("aria-describedby", contactHelpId);

    const liveId = "domicile-form-live-status";
    let live = document.getElementById(liveId);
    if (!live) {
      live = document.createElement("div");
      live.id = liveId;
      live.setAttribute("role", "status");
      live.setAttribute("aria-live", "polite");
      live.setAttribute("aria-atomic", "true");
      Object.assign(live.style, srOnly);
      section.appendChild(live);
    }

    const syncStatus = () => {
      const text = section.textContent || "";
      if (text.includes("ENQUIRY RECEIVED")) {
        live!.textContent = "Enquiry received. We will review the details and contact you directly.";
      } else if (text.includes("We could not send the enquiry just now")) {
        live!.textContent = "The enquiry could not be sent. Please try again or continue on WhatsApp.";
      }
    };

    const observer = new MutationObserver(syncStatus);
    observer.observe(section, { childList: true, subtree: true, characterData: true });
    syncStatus();

    return () => observer.disconnect();
  }, []);

  return null;
}
