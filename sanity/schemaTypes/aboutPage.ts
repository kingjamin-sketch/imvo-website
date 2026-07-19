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
    defineField({ name: "reviewsHeading", title: "Reviews heading", type: "string", group: "team" }),
    defineField({ name: "testimonials", title: "Client reviews", type: "array", group: "team", of: [defineArrayMember({
      type: "object",
      fields: [
        defineField({ name: "text", title: "Review", type: "text", rows: 5 }),
        defineField({ name: "author", title: "Client name", type: "string" }),
        defineField({ name: "date", title: "Date / source", type: "string" }),
      ],
      preview: { select: { title: "author", subtitle: "date" } },
    })] }),
    defineField({ name: "ctaHeading", title: "CTA heading", type: "string", group: "cta" }),
    defineField({ name: "ctaText", title: "CTA description", type: "text", rows: 3, group: "cta" }),
    defineField({ name: "ctaPrimaryLabel", title: "Primary button", type: "string", group: "cta" }),
    defineField({ name: "ctaProjectsLabel", title: "Projects button", type: "string", group: "cta" }),
    defineField({ name: "deckLabel", title: "Studio deck button", type: "string", group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "About Page", subtitle: "Story, history, team and reviews" }) },
});
