"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { DomicilePageContent, StructuredFaq } from "@/sanity/types/cmsBackend";
import styles from "./DomicileEditorial.module.css";

const propertyFallbackImages = [
  "/domicile/exact/estate-c1.jpg",
  "/domicile/exact/estate-hero.jpg",
  "/domicile/exact/estate-street.jpg",
];

const normalize = (value?: string | null) =>
  (value || "").replace(/\s+/g, " ").trim();

function replaceText(selector: string, value?: string) {
  if (!value) return;
  const element = document.querySelector<HTMLElement>(selector);
  if (!element || normalize(element.textContent) === normalize(value)) return;

  element.replaceChildren();
  value.split("\n").forEach((line, index) => {
    if (index > 0) element.append(document.createElement("br"));
    element.append(document.createTextNode(line));
  });
}

function replaceButtonLabel(selector: string, value?: string) {
  if (!value) return;
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) return;
  const span = element.querySelector("span");
  const textNodes = Array.from(element.childNodes).filter(
    (node) => node.nodeType === Node.TEXT_NODE,
  );
  const current = normalize(textNodes.map((node) => node.textContent || "").join(" "));
  if (current === normalize(value)) return;
  textNodes.forEach((node) => node.remove());
  element.insertBefore(document.createTextNode(`${value} `), span || element.firstChild);
}

function replaceImage(selector: string, url?: string, alt?: string) {
  if (!url) return;
  const image = document.querySelector<HTMLImageElement>(selector);
  if (!image) return;
  image.removeAttribute("srcset");
  image.src = url;
  if (alt) image.alt = alt;
}

function usePortalMount(selector: string, enabled: boolean, attribute: string) {
  const [mount, setMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const container = document.querySelector<HTMLElement>(selector);
    if (!container) return;

    const hidden = Array.from(container.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    );
    hidden.forEach((child) => {
      child.dataset.cmsPreviousDisplay = child.style.display || "";
      child.style.display = "none";
    });

    const portalMount = document.createElement("div");
    portalMount.setAttribute(attribute, "true");
    portalMount.style.display = "contents";
    container.appendChild(portalMount);
    setMount(portalMount);

    return () => {
      portalMount.remove();
      hidden.forEach((child) => {
        child.style.display = child.dataset.cmsPreviousDisplay || "";
        delete child.dataset.cmsPreviousDisplay;
      });
      setMount(null);
    };
  }, [attribute, enabled, selector]);

  return mount;
}

export default function DomicileCmsHydratorSafe({
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

    replaceText(`.${styles.hero} .${styles.eyebrow}`, content.heroEyebrow);
    replaceText(`.${styles.heroContent} h1`, content.heroHeading);
    replaceText(`.${styles.heroLead}`, content.heroLead);
    replaceButtonLabel(`.${styles.headerCta}`, content.primaryCtaLabel);
    replaceButtonLabel(`.${styles.primaryButton}`, content.primaryCtaLabel);
    replaceButtonLabel(`.${styles.ghostButton}`, content.secondaryCtaLabel);
    replaceImage(`.${styles.heroPhoto} img`, content.heroImage?.url, content.heroImage?.alt);

    replaceText(`.${styles.quoteCard} p`, content.explainedQuote);
    replaceText(`.${styles.explainedCopy} h2`, content.explainedHeading);
    replaceText(`.${styles.explainedLead}`, content.explainedLead);
    replaceImage(`.${styles.explainedPhoto} img`, content.explainedImage?.url, content.explainedImage?.alt);

    replaceText(`.${styles.photoEssayIntro} h2`, content.careHeading);
    replaceText(`.${styles.photoEssayIntro} p`, content.careText);
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

    replaceText(`.${styles.ownerHeading} h2`, content.ownerHeading);
    replaceText(`.${styles.ownerHeading} p`, content.ownerText);
    replaceImage(`.${styles.ownerPhoto} img`, content.ownerImage?.url, content.ownerImage?.alt);

    replaceText(`.${styles.propertiesHeading} h2`, content.propertiesHeading);
    replaceText(`.${styles.propertiesHeading} p`, content.propertiesText);
    replaceText(`.${styles.trust} h2`, content.trustHeading);
    replaceText(`.${styles.trust} p`, content.trustText);
    replaceText(`.${styles.enquiryIntro} h2`, content.enquiryHeading);
    replaceText(`.${styles.enquiryIntro} p`, content.enquiryText);
    replaceImage(`.${styles.enquiryImage} > img`, content.enquiryImage?.url, content.enquiryImage?.alt);

    if (content.email) {
      document.querySelectorAll<HTMLAnchorElement>(`.${styles.page} a[href^="mailto:"]`).forEach((link) => {
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
      const locationNode = Array.from(
        document.querySelectorAll<HTMLElement>(`.${styles.enquiryIntro} span`),
      ).find((node) => (node.textContent || "").toUpperCase().includes("KIGALI"));
      if (locationNode) locationNode.textContent = content.location;
    }
  }, [content]);

  return (
    <>
      {explanationMount && content?.explanationItems?.length
        ? createPortal(
            <>
              {content.explanationItems.map((item, index) => (
                <article key={`${item.number || index}-${item.title || "item"}`}>
                  <span>{item.number || String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </>,
            explanationMount,
          )
        : null}

      {propertiesMount && content?.propertyStories?.length
        ? createPortal(
            <>
              {content.propertyStories.map((property, index) => {
                const imageUrl = property.image?.url || propertyFallbackImages[index] || propertyFallbackImages[0];
                return (
                  <div key={`${property.number || index}-${property.title || "property"}`} className={styles.propertyStory}>
                    <div className={styles.propertyPhoto}>
                      <img
                        src={imageUrl}
                        alt={property.image?.alt || property.title || "DŌMICILE property"}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div className={styles.propertyCopy}>
                      <div>
                        <small>{property.status}</small>
                        <span>{property.number || String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <h3>{property.title}</h3>
                      <p>{property.copy}</p>
                      <a href="#enquire">DISCUSS YOUR PROPERTY <span>↗</span></a>
                    </div>
                    {index === 0 ? (
                      <div className={styles.propertyQuote}>
                        Care should feel quiet because someone responsible is already following through.
                      </div>
                    ) : null}
                  </div>
                );
              })}
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
