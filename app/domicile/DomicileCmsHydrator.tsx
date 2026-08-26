"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { DomicilePageContent, StructuredFaq } from "@/sanity/types/cmsBackend";
import styles from "./DomicileEditorial.module.css";

const setText = (selector: string, value?: string) => {
  if (!value) return;
  const element = document.querySelector<HTMLElement>(selector);
  if (element && element.textContent !== value) element.textContent = value;
};

const setLeadText = (selector: string, value?: string) => {
  if (!value) return;
  const element = document.querySelector<HTMLElement>(selector);
  if (element && element.textContent !== value) element.textContent = value;
};

const setButtonLabel = (selector: string, value?: string) => {
  if (!value) return;
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) return;
  const span = element.querySelector("span");
  const suffix = span?.textContent || "";
  element.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) node.textContent = "";
  });
  element.insertBefore(document.createTextNode(`${value} `), span || element.firstChild);
  if (!span && suffix) element.append(document.createTextNode(suffix));
};

const setImage = (selector: string, url?: string, alt?: string) => {
  if (!url) return;
  const image = document.querySelector<HTMLImageElement>(selector);
  if (!image) return;
  image.removeAttribute("srcset");
  image.src = url;
  if (alt) image.alt = alt;
};

function usePortalMount(
  selector: string,
  enabled: boolean,
  attribute: string,
) {
  const [mount, setMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let portalMount: HTMLElement | null = null;
    const hidden: HTMLElement[] = [];

    const install = () => {
      if (portalMount?.isConnected) return true;
      const container = document.querySelector<HTMLElement>(selector);
      if (!container) return false;
      if (container.querySelector(`[${attribute}]`)) return true;

      Array.from(container.children).forEach((child) => {
        if (!(child instanceof HTMLElement)) return;
        child.dataset.cmsPreviousDisplay = child.style.display || "";
        child.style.display = "none";
        hidden.push(child);
      });

      portalMount = document.createElement("div");
      portalMount.setAttribute(attribute, "true");
      portalMount.style.display = "contents";
      container.appendChild(portalMount);
      setMount(portalMount);
      return true;
    };

    install();
    const observer = new MutationObserver(install);
    observer.observe(document.body, { childList: true, subtree: true });
    const interval = window.setInterval(install, 350);
    const timeout = window.setTimeout(() => {
      observer.disconnect();
      window.clearInterval(interval);
    }, 8000);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      portalMount?.remove();
      hidden.forEach((node) => {
        node.style.display = node.dataset.cmsPreviousDisplay || "";
        delete node.dataset.cmsPreviousDisplay;
      });
      setMount(null);
    };
  }, [attribute, enabled, selector]);

  return mount;
}

export default function DomicileCmsHydrator({
  content,
  faqs,
}: {
  content?: DomicilePageContent | null;
  faqs?: StructuredFaq[];
}) {
  const [openFaq, setOpenFaq] = useState(0);
  const explanationMount = usePortalMount(
    `.${styles.explanationList}`,
    Boolean(content?.explanationItems?.length),
    "data-cms-domicile-explanation",
  );
  const propertiesMount = usePortalMount(
    `.${styles.propertyStories}`,
    Boolean(content?.propertyStories?.length),
    "data-cms-domicile-properties",
  );
  const faqMount = usePortalMount(
    `.${styles.faqList}`,
    Boolean(faqs?.length),
    "data-cms-domicile-faq",
  );

  useEffect(() => {
    if (!content) return;

    const apply = () => {
      setText(`.${styles.hero} .${styles.eyebrow}`, content.heroEyebrow);
      setText(`.${styles.heroContent} h1`, content.heroHeading);
      setLeadText(`.${styles.heroLead}`, content.heroLead);
      setButtonLabel(`.${styles.headerCta}`, content.primaryCtaLabel);
      setButtonLabel(`.${styles.primaryButton}`, content.primaryCtaLabel);
      setButtonLabel(`.${styles.ghostButton}`, content.secondaryCtaLabel);
      setImage(`.${styles.heroPhoto} img`, content.heroImage?.url, content.heroImage?.alt);

      setText(`.${styles.quoteCard} p`, content.explainedQuote);
      setText(`.${styles.explainedCopy} h2`, content.explainedHeading);
      setLeadText(`.${styles.explainedLead}`, content.explainedLead);
      setImage(`.${styles.explainedPhoto} img`, content.explainedImage?.url, content.explainedImage?.alt);

      setText(`.${styles.photoEssayIntro} h2`, content.careHeading);
      setLeadText(`.${styles.photoEssayIntro} p`, content.careText);
      const essayImages = document.querySelectorAll<HTMLImageElement>(`.${styles.essayPhoto} img`);
      if (content.carePrimaryImage?.url && essayImages[0]) {
        essayImages[0].removeAttribute("srcset");
        essayImages[0].src = content.carePrimaryImage.url;
        if (content.carePrimaryImage.alt) essayImages[0].alt = content.carePrimaryImage.alt;
      }
      if (content.careSecondaryImage?.url && essayImages[1]) {
        essayImages[1].removeAttribute("srcset");
        essayImages[1].src = content.careSecondaryImage.url;
        if (content.careSecondaryImage.alt) essayImages[1].alt = content.careSecondaryImage.alt;
      }

      setText(`.${styles.ownerHeading} h2`, content.ownerHeading);
      setLeadText(`.${styles.ownerHeading} p`, content.ownerText);
      setImage(`.${styles.ownerPhoto} img`, content.ownerImage?.url, content.ownerImage?.alt);

      setText(`.${styles.propertiesHeading} h2`, content.propertiesHeading);
      setLeadText(`.${styles.propertiesHeading} p`, content.propertiesText);
      setText(`.${styles.trust} h2`, content.trustHeading);
      setLeadText(`.${styles.trust} p`, content.trustText);
      setText(`.${styles.enquiryIntro} h2`, content.enquiryHeading);
      setLeadText(`.${styles.enquiryIntro} p`, content.enquiryText);
      setImage(`.${styles.enquiryImage} > img`, content.enquiryImage?.url, content.enquiryImage?.alt);

      if (content.email) {
        document.querySelectorAll<HTMLAnchorElement>(`a[href^="mailto:"]`).forEach((link) => {
          if (!link.closest(`.${styles.page}`)) return;
          link.href = `mailto:${content.email}`;
          link.textContent = content.email || "";
        });
      }
      if (content.phone) {
        const digits = content.phone.replace(/\D/g, "");
        document.querySelectorAll<HTMLAnchorElement>(`.${styles.page} a[href*="wa.me"]`).forEach((link) => {
          link.href = `https://wa.me/${digits}?text=${encodeURIComponent("Hello DŌMICILE, I would like to discuss property management with your team.")}`;
          if (link.closest(`.${styles.enquiryIntro}`)) link.textContent = content.phone || "";
        });
      }
      if (content.location) {
        const locationNode = Array.from(document.querySelectorAll<HTMLElement>(`.${styles.enquiryIntro} span`))
          .find((node) => (node.textContent || "").toUpperCase().includes("KIGALI"));
        if (locationNode) locationNode.textContent = content.location;
      }
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 10_000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [content]);

  return (
    <>
      {explanationMount && content?.explanationItems?.length
        ? createPortal(
            <>
              {content.explanationItems.map((item, index) => (
                <article key={`${item.number || index}-${item.title || "item"}`}>
                  <span>{item.number || String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                </article>
              ))}
            </>,
            explanationMount,
          )
        : null}

      {propertiesMount && content?.propertyStories?.length
        ? createPortal(
            <>
              {content.propertyStories.map((property, index) => (
                <div key={`${property.number || index}-${property.title || "property"}`} className={styles.propertyStory}>
                  <div className={styles.propertyPhoto}>
                    {property.image?.url ? (
                      <img
                        src={property.image.url}
                        alt={property.image.alt || property.title || "DŌMICILE property"}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : null}
                  </div>
                  <div className={styles.propertyCopy}>
                    <div><small>{property.status}</small><span>{property.number || String(index + 1).padStart(2, "0")}</span></div>
                    <h3>{property.title}</h3>
                    <p>{property.copy}</p>
                    <a href="#enquire">DISCUSS YOUR PROPERTY <span>↗</span></a>
                  </div>
                  {index === 0 ? (
                    <div className={styles.propertyQuote}>Care should feel quiet because someone responsible is already following through.</div>
                  ) : null}
                </div>
              ))}
            </>,
            propertiesMount,
          )
        : null}

      {faqMount && faqs?.length
        ? createPortal(
            <>
              {faqs.map((item, index) => (
                <article key={item._id || item.question || index} className={openFaq === index ? styles.faqOpen : ""}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.question}</strong>
                    <b>{openFaq === index ? "−" : "+"}</b>
                  </button>
                  <div><p>{item.answer}</p></div>
                </article>
              ))}
            </>,
            faqMount,
          )
        : null}
    </>
  );
}
