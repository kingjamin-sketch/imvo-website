# IMVO Website CMS Blueprint

**Status:** CMS foundation complete  
**Platform:** Sanity Studio + Next.js  
**Studio:** `/studio`  
**Public site:** `imvogroup.com`

This is the canonical operating blueprint for the IMVO website CMS. It documents the system that already exists in the repository; it is not a redesign specification.

## 1. System boundary

Sanity is the editorial source for website content. Next.js owns presentation, routing, interaction, form delivery, accessibility behavior, animation logic, and technical SEO implementation.

The CMS must not be used to inject arbitrary HTML, scripts, layout code, or application secrets.

## 2. Content editors can manage

The Studio desk is intentionally organized around these content types:

- **Site Settings** — company name, tagline/motto, contact details, location/map link, social links, global SEO title/description, share image and legal/copyright text.
- **Homepage** — hero copy and CTA, regional/intelligence/principles/manifesto sections, progress projects, services, team content and final CTA.
- **About Page** — hero, studio story, regional/culture content, framework stages, history timeline, consultancy/coordination cards, team, testimonials and CTA/deck labels.
- **Services Page** — hero, positioning, service pillars, coordination/strategy sections, process and CTA.
- **Contact Page** — hero, contact details, inquiry types, form labels/copy, success/response copy, location copy and map URL.
- **Legal Pages** — Terms & Conditions, Privacy Policy and Cookie Policy.
- **Projects** — title, slug, category, location, year, summary, cover, gallery, drawings, status, scope, area, bedrooms/bathrooms where relevant, map URL, timeline, featured state and drag-to-reorder display rank.

Projects remain independent documents rather than being embedded into the page singletons.

## 3. Content that remains code-owned

The following stay in the application unless a later approved CMS phase explicitly moves them:

- page layouts and component structure;
- navigation behavior, sticky header and CTAs as UI components;
- contact-form delivery/validation logic;
- DŌMICILE application logic and private operational data;
- animations, reduced-motion behavior and accessibility mechanics;
- routing, redirects, 404 behavior, sitemap/robots behavior and structured-data implementation;
- Rwanda location datasets and other application data sources;
- environment variables, API keys and deployment configuration.

CMS editing must not change the approved visual system by itself.

## 4. Publishing model

1. Open `/studio` with an authorized Sanity account.
2. Edit the relevant singleton or project document.
3. Confirm image alternative text, links and required fields.
4. Click **Publish**. Drafts are not public.
5. Public CMS reads use cached Sanity data with a **300-second revalidation window**, so a normal published change can take up to about five minutes to appear without a redeploy.
6. If a CMS document is unavailable, the site should continue to use its coded fallback content where that route supports a fallback rather than exposing a blank page.

Do not deploy the website merely to publish routine copy or project-content changes.

## 5. Images and accessibility

- Project cover images are required and require alternative text.
- Project gallery images require alternative text.
- Page imagery should have meaningful alternative text when the schema exposes it.
- Sanity page image delivery is requested as optimized web output (maximum 1920px, automatic format selection, quality 78).
- Drawings/floor plans remain subject to the website's existing public preview/copy-deterrence treatment.

Alternative text should describe the visible content or purpose of the image, not repeat the filename.

## 6. Project publishing rules

Before publishing a new project, confirm:

- title is final;
- slug is descriptive and generated from the final title;
- category is one of Residential, Commercial, Institutional, Urban or Hospitality;
- location, four-digit year and summary are complete;
- cover image and alt text are present;
- gallery images are curated and have alt text;
- status, scope, area and timeline are accurate when used;
- `featured` is enabled only when the project should participate in homepage featured selection;
- project order is set by dragging in the Studio Projects list.

Do not change an established public project slug casually because existing links and search indexing may depend on it.

## 7. Seeding and recovery

The repository includes `scripts/seed-site-content.ts` for creating missing singleton page documents from the approved coded content.

Run only when required:

```bash
npx sanity exec scripts/seed-site-content.ts --with-user-token -- --commit
```

The seed flow is for missing documents; it is not the normal publishing workflow and should not be used to overwrite approved editorial content.

If Sanity is temporarily unavailable, investigate the CMS/service issue without removing coded fallbacks or changing the approved page design as a workaround.

## 8. Security and deployment rules

- Never put a Sanity write token in client-side code or a `NEXT_PUBLIC_` variable.
- `/studio` is an editing surface and must remain excluded from search indexing.
- Draft content must not be exposed publicly.
- Routine CMS edits do not require GitHub or Vercel changes.
- Schema/query changes are code changes: branch them, build/test them, review them, then merge and deploy through the normal website release flow.
- Keep DŌMICILE private operational data out of the public website CMS.

## 9. Change-control rule

This document describes the completed CMS foundation. Future work should extend it only when there is a real editorial requirement. Do not duplicate page schemas, create a second Studio, or replace the existing Sanity integration for functionality that is already covered here.

## 10. CMS closeout baseline

The CMS foundation is considered complete when all of the following remain true:

- Studio opens at `/studio`;
- Site Settings, Homepage, About, Services, Contact, three Legal pages and Projects are available in the desk structure;
- current page content can be seeded when singleton documents are missing;
- published content is read through the existing cached Sanity queries;
- coded fallbacks protect the public experience when CMS content is absent/unavailable;
- project media enforces the current required-field/alt-text rules;
- `/studio` remains non-indexed;
- normal editorial publishing requires no website redeploy.

That is the CMS baseline to preserve before beginning any later CMS enhancement phase.
