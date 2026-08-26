import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Testimonial",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required().min(20).max(1200),
    }),
    defineField({
      name: "author",
      title: "Client / author name",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({ name: "role", title: "Role", type: "string", validation: (rule) => rule.max(120) }),
    defineField({ name: "company", title: "Company / organisation", type: "string", validation: (rule) => rule.max(160) }),
    defineField({ name: "date", title: "Date", type: "date" }),
    defineField({ name: "source", title: "Source / context", type: "string", validation: (rule) => rule.max(160) }),
    defineField({
      name: "featured",
      title: "Feature prominently",
      type: "boolean",
      initialValue: false,
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
    { title: "Newest", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "author", company: "company", subtitle: "quote" },
    prepare({ title, company, subtitle }) {
      return { title, subtitle: [company, subtitle].filter(Boolean).join(" · ") };
    },
  },
});
