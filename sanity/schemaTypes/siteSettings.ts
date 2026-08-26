import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social links" },
    { name: "seo", title: "SEO & Growth" },
    { name: "privacy", title: "Analytics & consent" },
  ],
  fields: [
    defineField({ name: "companyName", title: "Company name", type: "string", group: "identity" }),
    defineField({ name: "tagline", title: "Short company description", type: "string", group: "identity" }),
    defineField({ name: "legalNotice", title: "Professional-services notice", type: "text", rows: 3, group: "identity" }),
    defineField({ name: "copyright", title: "Copyright line", type: "string", group: "identity" }),
    defineField({ name: "motto", title: "Brand motto", type: "string", group: "identity" }),
    defineField({ name: "generalEmail", title: "General email", type: "email", group: "contact" }),
    defineField({ name: "projectsEmail", title: "Projects email", type: "email", group: "contact" }),
    defineField({ name: "phone", title: "Phone / WhatsApp", type: "string", group: "contact" }),
    defineField({ name: "location", title: "Office location", type: "string", group: "contact" }),
    defineField({ name: "mapUrl", title: "Google Maps embed URL", type: "url", group: "contact" }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      group: "social",
      of: [defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "label", title: "Network", type: "string", validation: (rule) => rule.required() }),
          defineField({ name: "url", title: "Profile URL", type: "url", validation: (rule) => rule.required() }),
        ],
        preview: { select: { title: "label", subtitle: "url" } },
      })],
    }),

    defineField({
      name: "siteIndexingEnabled",
      title: "Allow search-engine indexing",
      description: "Master SEO switch. Keep this ON for the live website. Turn it off only when the entire public site must temporarily be kept out of search results.",
      type: "boolean",
      initialValue: true,
      group: "seo",
    }),
    defineField({ name: "seoTitle", title: "Default Google title", type: "string", group: "seo", validation: (rule) => rule.max(65) }),
    defineField({ name: "seoDescription", title: "Default Google description", type: "text", rows: 3, group: "seo", validation: (rule) => rule.max(170) }),
    defineField({
      name: "shareImage",
      title: "Default social sharing image",
      description: "Used when a page does not have its own share image. A 1200 × 630 image works best across LinkedIn, WhatsApp, Facebook and X.",
      type: "image",
      options: { hotspot: true },
      group: "seo",
      fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })],
    }),
    defineField({
      name: "googleSiteVerification",
      title: "Google Search Console verification token",
      description: "Paste only the value from the Google HTML meta-tag content attribute, not the full <meta> tag.",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoPages",
      title: "Page-level SEO overrides",
      description: "Optional overrides for public routes. Leave a field blank to keep the page's safe coded fallback.",
      type: "array",
      group: "seo",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "routePath",
              title: "Route",
              description: "Use the public path, for example /about, /services, /projects or /contact.",
              type: "string",
              validation: (rule) => rule.required().regex(/^\//, { name: "leading slash" }),
            }),
            defineField({ name: "title", title: "Google / sharing title", type: "string", validation: (rule) => rule.max(65) }),
            defineField({ name: "description", title: "Google / sharing description", type: "text", rows: 3, validation: (rule) => rule.max(170) }),
            defineField({
              name: "shareImage",
              title: "Social sharing image",
              description: "Recommended: 1200 × 630.",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })],
            }),
            defineField({ name: "noIndex", title: "Hide this route from search engines", type: "boolean", initialValue: false }),
          ],
          preview: {
            select: { title: "routePath", subtitle: "title" },
          },
        }),
      ],
    }),

    defineField({
      name: "analyticsEnabled",
      title: "Enable Google Analytics after consent",
      description: "Analytics will never load before the visitor accepts optional analytics cookies. A valid GA4 Measurement ID is also required.",
      type: "boolean",
      initialValue: false,
      group: "privacy",
    }),
    defineField({
      name: "gaMeasurementId",
      title: "GA4 Measurement ID",
      description: "Example format: G-XXXXXXXXXX. Leave blank until the real IMVO Google Analytics property is ready.",
      type: "string",
      group: "privacy",
      validation: (rule) => rule.custom((value) => {
        if (!value) return true;
        return /^G-[A-Z0-9]+$/i.test(value.trim()) || "Use a GA4 Measurement ID in the format G-XXXXXXXXXX";
      }),
    }),
    defineField({
      name: "cookieConsentEnabled",
      title: "Show cookie-consent banner",
      type: "boolean",
      initialValue: true,
      group: "privacy",
    }),
    defineField({
      name: "cookieConsentTitle",
      title: "Consent banner title",
      type: "string",
      initialValue: "Privacy preferences",
      group: "privacy",
    }),
    defineField({
      name: "cookieConsentText",
      title: "Consent banner message",
      type: "text",
      rows: 3,
      initialValue: "We use essential technologies to keep this site working. With your permission, we also use analytics to understand how the website is used and improve it.",
      group: "privacy",
    }),
    defineField({ name: "cookieAcceptLabel", title: "Accept button label", type: "string", initialValue: "Accept analytics", group: "privacy" }),
    defineField({ name: "cookieRejectLabel", title: "Essential-only button label", type: "string", initialValue: "Essential only", group: "privacy" }),
    defineField({ name: "cookiePolicyLabel", title: "Cookie-policy link label", type: "string", initialValue: "Cookie Policy", group: "privacy" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings", subtitle: "Identity, SEO, growth, analytics and consent" }) },
});
