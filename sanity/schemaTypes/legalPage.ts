import { defineArrayMember, defineField, defineType } from "sanity";

export const legalPageType = defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({
      name: "pageKind",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "Terms & Conditions", value: "terms" },
          { title: "Privacy Policy", value: "privacy" },
          { title: "Cookie Policy", value: "cookies" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "kicker", title: "Page label", type: "string" }),
    defineField({ name: "title", title: "Page title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 5 }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "heading", title: "Heading", type: "string" }),
          defineField({ name: "body", title: "Text", type: "text", rows: 6 }),
        ],
        preview: { select: { title: "heading", subtitle: "body" } },
      })],
    }),
    defineField({ name: "lastUpdated", title: "Last updated label", type: "string" }),
  ],
  preview: { select: { title: "title", subtitle: "pageKind" } },
});
