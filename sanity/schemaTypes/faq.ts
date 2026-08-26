import { defineField, defineType } from "sanity";

export const faqType = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required().max(1600),
    }),
    defineField({
      name: "scope",
      title: "Website area",
      type: "string",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "DŌMICILE", value: "domicile" },
          { title: "Services", value: "services" },
          { title: "Contact", value: "contact" },
          { title: "Careers", value: "careers" },
        ],
        layout: "radio",
      },
      initialValue: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "active",
      title: "Show on the website",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 100,
      validation: (rule) => rule.integer().min(0).max(9999),
    }),
  ],
  orderings: [
    { title: "Display order", name: "displayOrder", by: [{ field: "order", direction: "asc" }] },
    { title: "Question", name: "questionAsc", by: [{ field: "question", direction: "asc" }] },
  ],
  preview: {
    select: { title: "question", subtitle: "scope" },
  },
});
