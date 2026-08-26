import { defineField, defineType } from "sanity";

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  groups: [
    { name: "profile", title: "Profile", default: true },
    { name: "contact", title: "Contact" },
    { name: "publishing", title: "Publishing" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "profile",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      group: "profile",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "description",
      title: "Biography",
      type: "text",
      rows: 6,
      group: "profile",
      validation: (rule) => rule.max(900),
    }),
    defineField({
      name: "image",
      title: "Portrait",
      type: "image",
      group: "profile",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.max(180),
        }),
      ],
    }),
    defineField({ name: "email", title: "Public email", type: "email", group: "contact" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url", group: "contact" }),
    defineField({
      name: "active",
      title: "Show on the website",
      type: "boolean",
      group: "publishing",
      initialValue: true,
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
    { title: "Name", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
