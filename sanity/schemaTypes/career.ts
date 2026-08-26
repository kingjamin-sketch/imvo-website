import { defineArrayMember, defineField, defineType } from "sanity";

export const careerType = defineType({
  name: "career",
  title: "Career Opportunity",
  type: "document",
  groups: [
    { name: "role", title: "Role", default: true },
    { name: "details", title: "Details" },
    { name: "application", title: "Application" },
    { name: "publishing", title: "Publishing" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Role title",
      type: "string",
      group: "role",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "slug",
      title: "Page address",
      type: "slug",
      group: "role",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "location", title: "Location", type: "string", group: "role", initialValue: "Kigali, Rwanda" }),
    defineField({
      name: "employmentType",
      title: "Employment type",
      type: "string",
      group: "role",
      options: {
        list: ["Full-time", "Part-time", "Contract", "Internship", "Graduate / trainee", "Consultancy"],
      },
    }),
    defineField({
      name: "summary",
      title: "Short summary",
      type: "text",
      rows: 4,
      group: "details",
      validation: (rule) => rule.required().max(600),
    }),
    defineField({ name: "description", title: "Role description", type: "text", rows: 8, group: "details" }),
    defineField({
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "requirements",
      title: "Requirements",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "applyEmail", title: "Application email", type: "email", group: "application" }),
    defineField({ name: "applyUrl", title: "Application URL", type: "url", group: "application" }),
    defineField({ name: "closingDate", title: "Closing date", type: "date", group: "application" }),
    defineField({
      name: "active",
      title: "Publish this opportunity",
      type: "boolean",
      group: "publishing",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "publishing",
      initialValue: 100,
      validation: (rule) => rule.integer().min(0).max(9999),
    }),
  ],
  orderings: [
    { title: "Display order", name: "displayOrder", by: [{ field: "order", direction: "asc" }] },
    { title: "Closing date", name: "closingDateAsc", by: [{ field: "closingDate", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", location: "location", type: "employmentType", active: "active" },
    prepare({ title, location, type, active }) {
      return {
        title,
        subtitle: `${active ? "LIVE" : "DRAFT"} · ${[type, location].filter(Boolean).join(" · ")}`,
      };
    },
  },
});
