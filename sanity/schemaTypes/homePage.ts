import { defineArrayMember, defineField, defineType } from "sanity";

const imageWithAlt = defineField({
  name: "image",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })],
});

const titleTextItem = defineArrayMember({
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "text", title: "Description", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

export const homePageType = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "strategy", title: "Strategy & approach" },
    { name: "portfolio", title: "Portfolio & services" },
    { name: "team", title: "Team" },
    { name: "cta", title: "Final call to action" },
  ],
  fields: [
    defineField({ name: "heroKicker", title: "Hero motto", type: "string", group: "hero" }),
    defineField({ name: "heroIntro", title: "Hero introduction", type: "text", rows: 5, group: "hero" }),
    defineField({ name: "heroButtonLabel", title: "Hero button label", type: "string", group: "hero" }),
    defineField({ name: "regionalKicker", title: "Regional label", type: "string", group: "hero" }),
    defineField({ name: "regionalHeading", title: "Regional heading", type: "string", group: "hero" }),
    defineField({ name: "regionalText", title: "Regional description", type: "text", rows: 4, group: "hero" }),
    defineField({ name: "intelligenceKicker", title: "Project intelligence label", type: "string", group: "strategy" }),
    defineField({ name: "intelligenceHeading", title: "Project intelligence heading", type: "string", group: "strategy" }),
    defineField({ name: "intelligenceText", title: "Project intelligence introduction", type: "text", rows: 4, group: "strategy" }),
    defineField({ name: "intelligenceItems", title: "Project intelligence cards", type: "array", group: "strategy", of: [titleTextItem], validation: (rule) => rule.max(6) }),
    defineField({ name: "principlesKicker", title: "Principles label", type: "string", group: "strategy" }),
    defineField({ name: "principlesHeading", title: "Principles heading", type: "string", group: "strategy" }),
    defineField({ name: "principlesText", title: "Principles introduction", type: "text", rows: 4, group: "strategy" }),
    defineField({
      name: "principles",
      title: "Principle cards",
      type: "array",
      group: "strategy",
      of: [defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "label", title: "Short label", type: "string" }),
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "text", title: "Description", type: "text", rows: 3 }),
          imageWithAlt,
        ],
        preview: { select: { title: "title", subtitle: "label", media: "image" } },
      })],
      validation: (rule) => rule.max(6),
    }),
    defineField({ name: "manifestoKicker", title: "Manifesto label", type: "string", group: "strategy" }),
    defineField({ name: "manifestoHeading", title: "Manifesto heading", type: "text", rows: 3, group: "strategy" }),
    defineField({ name: "manifestoText", title: "Manifesto description", type: "text", rows: 3, group: "strategy" }),
    defineField({ name: "progressKicker", title: "In-progress label", type: "string", group: "portfolio" }),
    defineField({ name: "progressHeading", title: "In-progress heading", type: "string", group: "portfolio" }),
    defineField({ name: "progressText", title: "In-progress description", type: "text", rows: 3, group: "portfolio" }),
    defineField({
      name: "progressProjects",
      title: "Projects in progress",
      type: "array",
      group: "portfolio",
      of: [defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "type", title: "Type", type: "string" }),
          defineField({ name: "concept", title: "Short description", type: "text", rows: 3 }),
          imageWithAlt,
        ],
        preview: { select: { title: "title", subtitle: "type", media: "image" } },
      })],
      validation: (rule) => rule.max(9),
    }),
    defineField({ name: "servicesKicker", title: "Services label", type: "string", group: "portfolio" }),
    defineField({ name: "servicesHeading", title: "Services heading", type: "string", group: "portfolio" }),
    defineField({ name: "services", title: "Service summaries", type: "array", group: "portfolio", of: [titleTextItem], validation: (rule) => rule.max(6) }),
    defineField({ name: "teamKicker", title: "Team label", type: "string", group: "team" }),
    defineField({ name: "teamHeading", title: "Team heading", type: "text", rows: 3, group: "team" }),
    defineField({ ...imageWithAlt, name: "teamImage", title: "Team group image", group: "team" }),
    defineField({
      name: "teamMembers",
      title: "Team members",
      type: "array",
      group: "team",
      of: [defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "name", title: "Name", type: "string" }),
          defineField({ name: "role", title: "Role", type: "string" }),
          defineField({ name: "description", title: "Biography", type: "text", rows: 5 }),
          imageWithAlt,
        ],
        preview: { select: { title: "name", subtitle: "role", media: "image" } },
      })],
      validation: (rule) => rule.max(20),
    }),
    defineField({ name: "ctaKicker", title: "CTA label", type: "string", group: "cta" }),
    defineField({ name: "ctaHeading", title: "CTA heading", type: "text", rows: 2, group: "cta" }),
    defineField({ name: "ctaButtonLabel", title: "CTA button label", type: "string", group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Homepage", subtitle: "Hero, sections, team and CTA" }) },
});
