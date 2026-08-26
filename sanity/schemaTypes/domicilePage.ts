import { defineArrayMember, defineField, defineType } from "sanity";

const imageWithAlt = (name: string, title: string, group: string) =>
  defineField({
    name,
    title,
    type: "image",
    group,
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alternative text",
        type: "string",
        validation: (rule) => rule.max(180),
      }),
    ],
  });

export const domicilePageType = defineType({
  name: "domicilePage",
  title: "DŌMICILE Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "explained", title: "DŌMICILE explained" },
    { name: "care", title: "Care & owner view" },
    { name: "properties", title: "Properties" },
    { name: "trust", title: "Trust & enquiry" },
    { name: "seo", title: "SEO & sharing" },
  ],
  initialValue: {
    heroEyebrow: "PROPERTY MANAGEMENT · KIGALI",
    heroHeading: "Your property,\nhandled.",
    heroLead: "One dependable local point of contact for property oversight, maintenance, owner-away care and follow-through.",
    explainedHeading: "What DŌMICILE actually does.",
    explainedLead: "DŌMICILE is the local operating layer between you and everything that needs attention at your property. Instead of coordinating inspectors, technicians, repairs, access and updates separately, you have one responsible point of contact.",
    careHeading: "The property stays visible. The coordination stays quiet.",
    careText: "Photography is part of the record—not decoration. The home, the issue, the work and the follow-up remain easy to understand.",
    ownerHeading: "Visibility without chasing updates.",
    ownerText: "See what happened, what needs approval and what comes next.",
    propertiesHeading: "Real homes. Quietly looked after.",
    propertiesText: "These visual examples show the kind of residential environments DŌMICILE is designed to care for.",
    trustHeading: "Property care with built-environment thinking behind it.",
    trustText: "DŌMICILE combines day-to-day property coordination with IMVO Group’s design, technical and built-environment perspective.",
    enquiryHeading: "Tell us about your property.",
    enquiryText: "This is an enquiry, not a registration. We’ll contact you to understand the property and what you need.",
    email: "domicile@imvogroup.com",
    phone: "+250 799 409 409",
    location: "KIGALI · RWANDA",
    seoTitle: "DŌMICILE | Property Management",
    seoDescription: "DŌMICILE is property management by IMVO Group for owners who want one reliable point of contact for the ongoing care, maintenance and coordination of their property in Kigali, Rwanda.",
  },
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero label", type: "string", group: "hero" }),
    defineField({ name: "heroHeading", title: "Hero heading", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroLead", title: "Hero introduction", type: "text", rows: 5, group: "hero" }),
    defineField({ name: "primaryCtaLabel", title: "Primary CTA label", type: "string", group: "hero", initialValue: "START AN ENQUIRY" }),
    defineField({ name: "secondaryCtaLabel", title: "Secondary CTA label", type: "string", group: "hero", initialValue: "UNDERSTAND DŌMICILE" }),
    imageWithAlt("heroImage", "Hero image", "hero"),

    defineField({ name: "explainedQuote", title: "Feature quote", type: "text", rows: 3, group: "explained", initialValue: "You should not need six conversations to know what happened at your own property." }),
    defineField({ name: "explainedHeading", title: "Section heading", type: "string", group: "explained" }),
    defineField({ name: "explainedLead", title: "Section introduction", type: "text", rows: 6, group: "explained" }),
    imageWithAlt("explainedImage", "Explained section image", "explained"),
    defineField({
      name: "explanationItems",
      title: "How DŌMICILE works",
      type: "array",
      group: "explained",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "number", title: "Number", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "text", title: "Description", type: "text", rows: 4 }),
          ],
          preview: { select: { title: "title", subtitle: "number" } },
        }),
      ],
      validation: (rule) => rule.max(8),
    }),

    defineField({ name: "careHeading", title: "Care section heading", type: "string", group: "care" }),
    defineField({ name: "careText", title: "Care section introduction", type: "text", rows: 4, group: "care" }),
    imageWithAlt("carePrimaryImage", "Care primary image", "care"),
    imageWithAlt("careSecondaryImage", "Care secondary image", "care"),
    defineField({ name: "ownerHeading", title: "Owner View heading", type: "string", group: "care" }),
    defineField({ name: "ownerText", title: "Owner View introduction", type: "text", rows: 3, group: "care" }),
    imageWithAlt("ownerImage", "Owner View background image", "care"),

    defineField({ name: "propertiesHeading", title: "Properties heading", type: "text", rows: 3, group: "properties" }),
    defineField({ name: "propertiesText", title: "Properties introduction", type: "text", rows: 4, group: "properties" }),
    defineField({
      name: "propertyStories",
      title: "Property examples",
      type: "array",
      group: "properties",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "number", title: "Number", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "status", title: "Status label", type: "string" }),
            defineField({ name: "copy", title: "Description", type: "text", rows: 4 }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })],
            }),
          ],
          preview: { select: { title: "title", subtitle: "status", media: "image" } },
        }),
      ],
      validation: (rule) => rule.max(6),
    }),

    defineField({ name: "trustHeading", title: "IMVO backing heading", type: "string", group: "trust" }),
    defineField({ name: "trustText", title: "IMVO backing text", type: "text", rows: 4, group: "trust" }),
    defineField({ name: "enquiryHeading", title: "Enquiry heading", type: "string", group: "trust" }),
    defineField({ name: "enquiryText", title: "Enquiry introduction", type: "text", rows: 4, group: "trust" }),
    imageWithAlt("enquiryImage", "Enquiry image", "trust"),
    defineField({ name: "email", title: "DŌMICILE email", type: "email", group: "trust" }),
    defineField({ name: "phone", title: "DŌMICILE phone / WhatsApp", type: "string", group: "trust" }),
    defineField({ name: "location", title: "Location label", type: "string", group: "trust" }),

    defineField({ name: "seoTitle", title: "Google / sharing title", type: "string", group: "seo", validation: (rule) => rule.max(65) }),
    defineField({ name: "seoDescription", title: "Google / sharing description", type: "text", rows: 3, group: "seo", validation: (rule) => rule.max(170) }),
    defineField({
      name: "shareImage",
      title: "Social sharing image",
      type: "image",
      group: "seo",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })],
    }),
    defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean", group: "seo", initialValue: false }),
  ],
  preview: { prepare: () => ({ title: "DŌMICILE Page", subtitle: "Public property-management marketing page" }) },
});
