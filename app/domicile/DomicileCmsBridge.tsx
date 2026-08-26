"use client";

import { useEffect } from "react";
import type { DomicilePageContent } from "@/sanity/types/siteContent";

const textNodeLabel = (element: Element | null, value?: string) => {
  if (!element || !value?.trim()) return;
  const clean = value.trim();
  const textNode = Array.from(element.childNodes).find(
    (node) => node.nodeType === Node.TEXT_NODE,
  );

  if (textNode) {
    if (textNode.textContent?.trim() !== clean) textNode.textContent = `${clean} `;
    return;
  }

  if (element.textContent?.trim() !== clean) element.textContent = clean;
};

const setText = (root: ParentNode, selector: string, value?: string) => {
  if (!value?.trim()) return;
  const element = root.querySelector<HTMLElement>(selector);
  if (element && element.textContent !== value) element.textContent = value;
};

const setMultiline = (root: ParentNode, selector: string, value?: string) => {
  if (!value?.trim()) return;
  const element = root.querySelector<HTMLElement>(selector);
  if (!element) return;

  const lines = value.split(/\r?\n/);
  const current = element.innerText.replace(/\r/g, "");
  if (current === lines.join("\n")) return;

  element.replaceChildren();
  lines.forEach((line, index) => {
    if (index) element.appendChild(document.createElement("br"));
    element.appendChild(document.createTextNode(line));
  });
};

const setImage = (root: ParentNode, selector: string, url?: string, alt?: string) => {
  if (!url) return;
  const container = root.querySelector<HTMLElement>(selector);
  if (!container) return;

  container.style.setProperty("background-image", `url("${url}")`, "important");
  const image = container.querySelector<HTMLImageElement>("img");
  if (image) {
    if (image.src !== url) image.src = url;
    image.removeAttribute("srcset");
    if (alt) image.alt = alt;
  }
};

const setLink = (element: HTMLAnchorElement | null, label?: string, href?: string) => {
  if (!element) return;
  if (label?.trim() && element.textContent?.trim() !== label.trim()) {
    element.textContent = label.trim();
  }
  if (href?.trim()) element.href = href.trim();
};

export default function DomicileCmsBridge({
  content,
}: {
  content?: DomicilePageContent | null;
}) {
  useEffect(() => {
    if (!content) return;

    const explained = document.getElementById("explained");
    const root = explained?.closest("main");
    if (!root) return;

    let applying = false;
    let frame = 0;

    const apply = () => {
      if (applying) return;
      applying = true;

      try {
        setText(root, '[class*="heroContent"] [class*="eyebrow"]', content.heroEyebrow);
        setMultiline(root, '[class*="heroContent"] h1', content.heroHeading);
        setText(root, '[class*="heroContent"] [class*="heroLead"]', content.heroLead);

        const heroActions = root.querySelectorAll<HTMLAnchorElement>('[class*="heroActions"] a');
        textNodeLabel(heroActions[0], content.primaryCtaLabel);
        textNodeLabel(heroActions[1], content.secondaryCtaLabel);
        const heroFacts = root.querySelectorAll<HTMLElement>('[class*="heroFacts"] span');
        content.heroFacts?.slice(0, heroFacts.length).forEach((fact, index) => {
          if (fact && heroFacts[index].textContent !== fact) heroFacts[index].textContent = fact;
        });
        setImage(root, '[class*="heroPhoto"]', content.heroImage?.url, content.heroImage?.alt);

        setText(root, '#explained [class*="sectionTag"]', content.explainedTag);
        setText(root, '#explained [class*="explainedCopy"] h2', content.explainedHeading);
        setText(root, '#explained [class*="explainedLead"]', content.explainedLead);
        setText(root, '#explained [class*="quoteCard"] p', content.explainedQuote);
        setText(root, '#explained [class*="photoLabel"] span', content.explainedPhotoLabel);
        setText(root, '#explained [class*="photoLabel"] strong', content.explainedPhotoStatus);
        setImage(root, '#explained [class*="explainedPhoto"]', content.explainedImage?.url, content.explainedImage?.alt);

        const steps = root.querySelectorAll<HTMLElement>('#explained [class*="explanationList"] article');
        content.explanationSteps?.slice(0, steps.length).forEach((step, index) => {
          if (step.title) {
            const title = steps[index].querySelector<HTMLElement>("h3");
            if (title && title.textContent !== step.title) title.textContent = step.title;
          }
          if (step.text) {
            const paragraph = steps[index].querySelector<HTMLElement>("p");
            if (paragraph && paragraph.textContent !== step.text) paragraph.textContent = step.text;
          }
        });

        setText(root, '#care [class*="photoEssayIntro"] [class*="sectionTag"]', content.careTag);
        setText(root, '#care [class*="photoEssayIntro"] h2', content.careHeading);
        setText(root, '#care [class*="photoEssayIntro"] > p', content.careIntro);
        setImage(root, '#care [class*="essayPhotoMain"]', content.carePrimaryImage?.url, content.carePrimaryImage?.alt);
        setImage(root, '#care [class*="essayPhotoTall"]', content.careSecondaryImage?.url, content.careSecondaryImage?.alt);

        const essayCaptions = root.querySelectorAll<HTMLElement>('#care [class*="essayCaption"]');
        content.careItems?.slice(0, 2).forEach((item, index) => {
          const caption = essayCaptions[index];
          if (!caption) return;
          if (item.label) {
            const label = caption.querySelector<HTMLElement>("strong");
            if (label && label.textContent !== item.label) label.textContent = item.label;
          }
          if (item.text) {
            const paragraph = caption.querySelector<HTMLElement>("p");
            if (paragraph && paragraph.textContent !== item.text) paragraph.textContent = item.text;
          }
        });

        const statements = [
          root.querySelector<HTMLElement>('#care [class*="statementCard"]:not([class*="statementCardDark"])'),
          root.querySelector<HTMLElement>('#care [class*="statementCardDark"]'),
        ];
        content.careItems?.slice(2, 4).forEach((item, itemIndex) => {
          const card = statements[itemIndex];
          if (!card) return;
          if (item.label) {
            const label = card.querySelector<HTMLElement>("span");
            if (label && label.textContent !== item.label) label.textContent = item.label;
          }
          if (item.text) {
            const paragraph = card.querySelector<HTMLElement>("p");
            if (paragraph && paragraph.textContent !== item.text) paragraph.textContent = item.text;
          }
        });

        setText(root, '#owner-view [class*="ownerHeading"] [class*="sectionTag"]', content.ownerTag);
        setText(root, '#owner-view [class*="ownerHeading"] h2', content.ownerHeading);
        setText(root, '#owner-view [class*="ownerHeading"] p', content.ownerIntro);
        setImage(root, '#owner-view [class*="ownerPhoto"]', content.ownerImage?.url, content.ownerImage?.alt);

        setText(root, '#properties [class*="propertiesHeading"] [class*="sectionTag"]', content.propertiesTag);
        setMultiline(root, '#properties [class*="propertiesHeading"] h2', content.propertiesHeading);
        setText(root, '#properties [class*="propertiesHeading"] p', content.propertiesIntro);

        const properties = root.querySelectorAll<HTMLElement>('#properties [class*="propertyStory"]');
        content.properties?.slice(0, properties.length).forEach((property, index) => {
          const story = properties[index];
          if (property.status) setText(story, '[class*="propertyCopy"] small', property.status);
          if (property.title) setText(story, '[class*="propertyCopy"] h3', property.title);
          if (property.copy) setText(story, '[class*="propertyCopy"] > p', property.copy);
          setImage(story, '[class*="propertyPhoto"]', property.image?.url, property.image?.alt || property.title);
        });

        setText(root, '#faq [class*="trust"] [class*="sectionTag"]', content.trustTag);
        setText(root, '#faq [class*="trust"] h2', content.trustHeading);
        setText(root, '#faq [class*="trust"] > p', content.trustText);
        setText(root, '#faq [class*="faq"] > [class*="sectionTag"]', content.faqTag);

        const faqs = root.querySelectorAll<HTMLElement>('#faq [class*="faqList"] article');
        content.faqs?.slice(0, faqs.length).forEach((faq, index) => {
          const item = faqs[index];
          if (faq.question) setText(item, "button strong", faq.question);
          if (faq.answer) setText(item, "div p", faq.answer);
        });

        setText(root, '#enquire [class*="enquiryIntro"] [class*="sectionTag"]', content.enquiryTag);
        setText(root, '#enquire [class*="enquiryIntro"] h2', content.enquiryHeading);
        setText(root, '#enquire [class*="enquiryIntro"] > p', content.enquiryIntro);
        setImage(root, '#enquire [class*="enquiryImage"]', content.enquiryImage?.url, content.enquiryImage?.alt);

        const enquiryLinks = root.querySelectorAll<HTMLAnchorElement>('#enquire [class*="enquiryIntro"] div a');
        setLink(enquiryLinks[0] || null, content.email, content.email ? `mailto:${content.email}` : undefined);
        setLink(enquiryLinks[1] || null, content.phoneLabel, content.whatsappUrl);
        setText(root, '#enquire [class*="enquiryIntro"] div span', content.locationLabel);

        setText(root, '#enquire [class*="formHeading"] > span', content.formKicker);
        setText(root, '#enquire [class*="formHeading"] h3', content.formHeading);
        setText(root, '#enquire [class*="formHeading"] p', content.formIntro);
        textNodeLabel(root.querySelector('#enquire form button[type="submit"]'), content.submitLabel);

        setText(root, '#enquire [class*="success"] > span', content.successKicker);
        setText(root, '#enquire [class*="success"] h3', content.successHeading);
        setText(root, '#enquire [class*="success"] p', content.successText);

        setText(root, 'footer[class*="footer"] > span', content.footerDescriptor);
        const footerLinks = root.querySelectorAll<HTMLAnchorElement>('footer[class*="footer"] a');
        setLink(footerLinks[0] || null, content.email, content.email ? `mailto:${content.email}` : undefined);
        if (footerLinks[1] && content.whatsappUrl) footerLinks[1].href = content.whatsappUrl;
      } finally {
        applying = false;
      }
    };

    const scheduleApply = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(apply);
    };

    apply();
    const observer = new MutationObserver(scheduleApply);
    const enquiry = document.getElementById("enquire");
    if (enquiry) observer.observe(enquiry, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [content]);

  return null;
}
