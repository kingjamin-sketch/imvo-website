import { defineArrayMember, defineField, defineType } from "sanity";

const projectCategories = [
  "Residential",
  "Commercial",
  "Institutional",
  "Urban",
  "Hospitality",
];

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "media", title: "Media" },
    { name: "details", title: "Details" },
    { name: "publishing", title: "Publishing" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Project title",
      type: "string",
      group: "identity",
      validation: (rule) => rule.required().min(3).max(120),
    }),
    defineField({
      name: "slug",
      title: "Page address",
      description: "Use Generate after entering the project title.",
      type: "slug",
      group: "identity",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "identity",
      options: {
        list: projectCategories.map((category) => ({
          title: category,
          value: category,
        })),
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "identity",
      placeholder: "Kigali, Rwanda",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      group: "identity",
      validation: (rule) => rule.required().regex(/^\d{4}$/, {
        name: "four-digit year",
      }),
    }),
    defineField({
      name: "summary",
      title: "Project summary",
      type: "text",
      rows: 5,
      group: "identity",
      validation: (rule) => rule.required().min(30).max(600),
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          description: "Describe the image for accessibility and Google Images.",
          type: "string",
          validation: (rule) => rule.required().max(180),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Project gallery",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (rule) => rule.required().max(180),
            }),
          ],
        }),
      ],
      options: { layout: "grid" },
      validation: (rule) => rule.max(30),
    }),
    defineField({
      name: "drawings",
      title: "Plans and drawings",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
      ],
      options: { layout: "grid" },
      validation: (rule) => rule.max(12),
    }),
    defineField({
      name: "status",
      title: "Project status",
      type: "string",
      group: "details",
      placeholder: "Concept Design",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "scope",
      title: "IMVO scope",
      type: "string",
      group: "details",
      placeholder: "Design + Site Coordination",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "area",
      title: "Area",
      type: "string",
      group: "details",
      placeholder: "620 sqm",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
      group: "details",
      validation: (rule) => rule.integer().min(0).max(500),
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
      group: "details",
      validation: (rule) => rule.integer().min(0).max(500),
    }),
    defineField({
      name: "mapUrl",
      title: "Google Maps embed URL",
      type: "url",
      group: "details",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "timeline",
      title: "Project timeline",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          name: "timelineItem",
          title: "Timeline item",
          type: "object",
          fields: [
            defineField({
              name: "year",
              title: "Year",
              type: "string",
              validation: (rule) => rule.required().max(20),
            }),
            defineField({
              name: "title",
              title: "Milestone",
              type: "string",
              validation: (rule) => rule.required().max(120),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "year" },
          },
        }),
      ],
      validation: (rule) => rule.max(20),
    }),
    defineField({
      name: "featured",
      title: "Feature this project",
      description: "Marks the project for future homepage placement.",
      type: "boolean",
      group: "publishing",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers appear first.",
      type: "number",
      group: "publishing",
      initialValue: 100,
      validation: (rule) => rule.integer().min(0).max(9999),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [
        { field: "order", direction: "asc" },
        { field: "year", direction: "desc" },
      ],
    },
    {
      title: "Newest year",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      location: "location",
      media: "cover",
    },
    prepare({ title, category, location, media }) {
      return {
        title,
        subtitle: [category, location].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
