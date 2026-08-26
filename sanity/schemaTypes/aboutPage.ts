import { defineArrayMember, defineField, defineType } from "sanity";

const image = (name: string, title: string, group: string) => defineField({
  name,
  title,
  type: "image",
  group,
  options: { hotspot: true },
  fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })],
});

const card = defineArrayMember({
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "text", title: "Description", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "story", title: "Story", default: true },
    { name: "framework", title: "Framework & history" },
    { name: "capabilities", title: "Capabilities" },
    { name: "team", title: "Team & reviews" },
    { name: "cta", title: "Final call to action" },
  ],
  fields: [
    defineField({ name: "heroKicker", title: "Hero label", type: "string", group: "story" }),
    defineField({ name: "heroHeading", title: "Hero heading", type: "text", rows: 3, group: "story" }),
    image("heroImage", "Hero image", "story"),
    defineField({ name: "genesisHeading", title: "Genesis heading", type: "string", group: "story" }),
    defineField({ name: "genesisLead", title: "Genesis lead paragraph", type: "text", rows: 5, group: "story" }),
    defineField({ name: "genesisText", title: "Genesis supporting paragraph", type: "text", rows: 5, group: "story" }),
    defineField({ name: "regionalHeading", title: "Regional reach heading", type: "string", group: "story" }),
    defineField({ name: "regionalText", title: "Regional reach description", type: "text", rows: 4, group: "story" }),
    defineField({ name: "cultureHeading", title: "Studio culture heading", type: "string", group: "story" }),
    defineField({ name: "cultureText", title: "Studio culture description", type: "text", rows: 5, group: "story" }),
    image("cultureImage", "Studio culture image", "story"),
    defineField({ name: "frameworkHeading", title: "Framework heading", type: "string", group: "framework" }),
    defineField({ name: "frameworkSubheading", title: "Framework subheading", type: "string", group: "framework" }),
    defineField({ name: "stages", title: "Project stages", type: "array", group: "framework", of: [defineArrayMember({
      type: "object",
      fields: [
        defineField({ name: "step", title: "Stage number", type: "string" }),
        defineField({ name: "name", title: "Stage name", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
      ],
      preview: { select: { title: "name", subtitle: "step" } },
    })] }),
    defineField({ name: "historyHeading", title: "History heading", type: "string", group: "framework" }),
    defineField({ name: "timeline", title: "History timeline", type: "array", group: "framework", of: [defineArrayMember({
      type: "object",
      fields: [
        defineField({ name: "year", title: "Year", type: "string" }),
        defineField({ name: "title", title: "Milestone", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
      ],
      preview: { select: { title: "title", subtitle: "year" } },
    })] }),
    defineField({ name: "consultancyHeading", title: "Consultancy heading", type: "string", group: "capabilities" }),
    defineField({ name: "consultancyCards", title: "Consultancy services", type: "array", group: "capabilities", of: [card] }),
    defineField({ name: "coordinationHeading", title: "Site coordination heading", type: "string", group: "capabilities" }),
    defineField({ name: "coordinationCards", title: "Site coordination services", type: "array", group: "capabilities", of: [card] }),
    defineField({ name: "teamHeading", title: "Team heading", type: "text", rows: 2, group: "team" }),
    defineField({ name: "teamMembers", title: "Team members", type: "array", group: "team", of: [defineArrayMember({
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "role", title: "Role", type: "string" }),
        defineField({ name: "description", title: "Biography", type: "text", rows: 5 }),
        image("image", "Portrait", "team"),
      ],
      preview: { select: { title: "name", subtitle: "role", media: "image" } },
    })] }),
    defineField({
      name: "reviewsHeading",
      title: "Reviews heading",
      type: "string",
      group: "team",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials / Client Reviews",
      type: "array",
      group: "team",
      description: "Add, edit, remove, reorder, feature, or temporarily hide the client reviews shown on the About page.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Testimonial",
              type: "text",
              rows: 5,
              validation: (rule) => rule.required().min(10).max(1200),
            }),
            defineField({
              name: "author",
              title: "Client / author name",
              type: "string",
              validation: (rule) => rule.required().max(120),
            }),
            defineField({ name: "role", title: "Role", type: "string", validation: (rule) => rule.max(120) }),
            defineField({ name: "company", title: "Company / organisation", type: "string", validation: (rule) => rule.max(160) }),
            defineField({
              name: "date",
              title: "Date / display label",
              type: "string",
              description: "Can be a date or an existing label such as “6 months ago”.",
              validation: (rule) => rule.max(120),
            }),
            defineField({
              name: "source",
              title: "Source / context",
              type: "string",
              description: "Optional context such as Google Review or a project name.",
              validation: (rule) => rule.max(160),
            }),
            defineField({
              name: "featured",
              title: "Feature prominently",
              type: "boolean",
              description: "Featured reviews are displayed first.",
              initialValue: false,
            }),
            defineField({
              name: "active",
              title: "Show on the website",
              type: "boolean",
              description: "Turn this off to hide a review without deleting it.",
              initialValue: true,
            }),
            defineField({
              name: "order",
              title: "Display order",
              type: "number",
              description: "Optional. Lower numbers appear first after featured reviews; otherwise the array order is respected.",
              validation: (rule) => rule.integer().min(0).max(9999),
            }),
          ],
          preview: {
            select: { title: "author", company: "company", subtitle: "text" },
            prepare({ title, company, subtitle }) {
              return { title, subtitle: [company, subtitle].filter(Boolean).join(" · ") };
            },
          },
        }),
      ],
    }),
    defineField({ name: "ctaHeading", title: "CTA heading", type: "string", group: "cta" }),
    defineField({ name: "ctaText", title: "CTA description", type: "text", rows: 3, group: "cta" }),
    defineField({ name: "ctaPrimaryLabel", title: "Primary button", type: "string", group: "cta" }),
    defineField({ name: "ctaProjectsLabel", title: "Projects button", type: "string", group: "cta" }),
    defineField({ name: "deckLabel", title: "Studio deck button", type: "string", group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "About Page", subtitle: "Story, history, team and reviews" }) },
});
