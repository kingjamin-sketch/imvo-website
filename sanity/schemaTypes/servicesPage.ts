import { defineArrayMember, defineField, defineType } from "sanity";

const imageWithAlt = (name: string, title: string, group: string) => defineField({
  name,
  title,
  type: "image",
  group,
  options: { hotspot: true },
  fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })],
});

export const servicesPageType = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero & positioning", default: true },
    { name: "services", title: "Core services" },
    { name: "strategy", title: "Planning & strategy" },
    { name: "process", title: "Process & CTA" },
  ],
  fields: [
    defineField({ name: "heroKicker", title: "Hero label", type: "string", group: "hero" }),
    defineField({ name: "heroHeading", title: "Hero heading", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroIntro", title: "Hero introduction", type: "text", rows: 5, group: "hero" }),
    defineField({ name: "quoteButtonLabel", title: "Quote button", type: "string", group: "hero" }),
    defineField({ name: "projectsButtonLabel", title: "Projects button", type: "string", group: "hero" }),
    imageWithAlt("heroImage", "Hero image", "hero"),
    defineField({ name: "positioningKicker", title: "Positioning label", type: "string", group: "hero" }),
    defineField({ name: "positioningHeading", title: "Positioning heading", type: "string", group: "hero" }),
    defineField({ name: "positioningParagraphs", title: "Positioning paragraphs", type: "array", group: "hero", of: [defineArrayMember({ type: "text", rows: 4 })], validation: (rule) => rule.max(6) }),
    defineField({
      name: "servicePillars",
      title: "Core service pillars",
      type: "array",
      group: "services",
      of: [defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "number", title: "Number", type: "string" }),
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
          defineField({ name: "services", title: "Included services", type: "array", of: [defineArrayMember({ type: "string" })] }),
          defineField({
            name: "image",
            title: "Service detail image",
            description: "Used on this service's individual detail page. The current production image remains the fallback until replaced.",
            type: "image",
            options: { hotspot: true },
            fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })],
          }),
        ],
        preview: { select: { title: "title", subtitle: "description", media: "image" } },
      })],
      validation: (rule) => rule.max(6),
    }),
    defineField({ name: "coordinationHeading", title: "Site coordination heading", type: "string", group: "services" }),
    defineField({ name: "coordinationText", title: "Site coordination description", type: "text", rows: 4, group: "services" }),
    imageWithAlt("coordinationImage", "Site coordination image", "services"),
    defineField({ name: "strategyHeading", title: "Planning & strategy heading", type: "string", group: "strategy" }),
    defineField({ name: "strategyText", title: "Planning & strategy description", type: "text", rows: 4, group: "strategy" }),
    imageWithAlt("strategyImage", "Planning & strategy image", "strategy"),
    defineField({ name: "strategyCards", title: "Strategy cards", type: "array", group: "strategy", of: [defineArrayMember({
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "text", title: "Description", type: "text", rows: 5 }),
      ],
      preview: { select: { title: "title", subtitle: "text" } },
    })] }),
    defineField({ name: "processHeading", title: "Process heading", type: "string", group: "process" }),
    imageWithAlt("processImage", "Process image", "process"),
    defineField({ name: "processSteps", title: "Process steps", type: "array", group: "process", of: [defineArrayMember({
      type: "object",
      fields: [
        defineField({ name: "number", title: "Number", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "text", title: "Description", type: "text", rows: 4 }),
      ],
      preview: { select: { title: "title", subtitle: "number" } },
    })] }),
    defineField({ name: "ctaHeading", title: "CTA heading", type: "string", group: "process" }),
    defineField({ name: "ctaText", title: "CTA description", type: "text", rows: 4, group: "process" }),
    defineField({ name: "ctaButtonLabel", title: "CTA button", type: "string", group: "process" }),
  ],
  preview: { prepare: () => ({ title: "Services Page", subtitle: "Service pillars, media, process and CTA" }) },
});
