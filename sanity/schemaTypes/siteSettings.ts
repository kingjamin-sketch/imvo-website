import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social links" },
    { name: "seo", title: "Google & sharing" },
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
    defineField({ name: "seoTitle", title: "Default Google title", type: "string", group: "seo", validation: (rule) => rule.max(65) }),
    defineField({ name: "seoDescription", title: "Default Google description", type: "text", rows: 3, group: "seo", validation: (rule) => rule.max(170) }),
    defineField({
      name: "shareImage",
      title: "Default social sharing image",
      type: "image",
      options: { hotspot: true },
      group: "seo",
      fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings", subtitle: "Shared identity, contact and SEO" }) },
});
