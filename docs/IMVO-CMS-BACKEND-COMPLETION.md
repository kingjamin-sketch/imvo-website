# IMVO CMS Backend Completion

## Purpose

This closeout completes the separate three-phase CMS roadmap for the public IMVO website. It does not replace the website-development roadmap and it does not touch the private DŌMICILE operational application.

Sanity remains the only editorial CMS. Next.js remains responsible for routes, rendering, forms, accessibility, interaction logic, structured data and safe fallbacks.

## Phase 1 — Full editable pages

### Site Settings
Editable identity, contact information, social links, default SEO and route-level SEO overrides.

### Homepage
Editable copy, cards, team fallback content, images, hero video/poster and section visibility controls.

### About
Editable story, framework, history, capabilities, team fallback content, testimonials fallback content, imagery and CTA.

### Services
Editable hero, positioning, service pillars, service-detail media, coordination, strategy, process and CTA.

### Contact
Editable hero, contact options, inquiry choices, form wording, success messaging, map/location and imagery.

### Legal
Terms, Privacy and Cookie pages remain managed as legal-page singletons.

### DŌMICILE
The public DŌMICILE marketing page now has its own singleton for approved marketing copy, principal imagery, property examples, enquiry contact details and SEO. This CMS document is public-marketing content only. It must never contain owner records, maintenance requests, expenses, approvals, private documents, Supabase credentials or other private DŌMICILE operational data.

### Projects
Projects remain the existing structured collection with ordering, categories, status, scope, galleries, drawings and the existing `featured` flag.

## Phase 2 — Structured collections

### Team Members
Reusable Team Member documents are now the preferred source for Homepage and About when records exist. Legacy embedded arrays remain as a non-destructive fallback.

### Testimonials
Reusable Testimonial documents are now the preferred source for About when records exist. Existing embedded reviews remain as fallback.

### FAQs
Reusable FAQ documents support scoped content. DŌMICILE currently consumes `scope = domicile`; other page scopes are available for future placement without another schema migration.

### Careers
Career Opportunity documents power `/careers`. Only records with `active = true` are public. With no active records, the page shows a neutral empty state rather than inventing vacancies.

### Featured Projects
No duplicate collection was created. The existing Project `featured` field remains the single source for homepage project selection.

### Homepage Section Controls
The Homepage document has explicit visibility toggles for regional reach, project intelligence, principles, manifesto, work in progress, services, team, Studio Status and the final CTA. Missing controls preserve the coded production state.

## Phase 3 — Operational controls

### Studio Status
A Studio Status singleton controls:

- timezone
- normal weekly opening days and hours
- date-specific closed/open/custom-hour overrides
- time-boxed special notices
- open, closed, weekend and opening-soon messages

Holiday/date overrides are deliberately not treated as an automatic legal calendar. IMVO should add only dates the studio has reviewed and intends to observe.

If no Studio Status document exists, the existing coded homepage status remains visible. Publishing the singleton activates the CMS-managed status presentation.

### SEO
Site Settings contains defaults and optional route-level SEO overrides with:

- route path
- title
- description
- sharing image
- `noIndex`

The homepage, About, Services, Contact, DŌMICILE, Careers and the three individual service routes read these overrides. Each retains a coded metadata fallback.

DŌMICILE also has page-local SEO fields. A route-level Site Settings override takes priority when both are populated.

### Media replacement
Editorial media is replaceable from Studio across the existing CMS pages and projects. This completion adds the principal gaps:

- Homepage hero video and poster
- DŌMICILE major marketing imagery and property-example imagery
- Team portraits through the reusable Team collection
- individual service-detail images

Core brand/system assets such as the IMVO logo, favicon and application chrome remain code-owned intentionally; they are not routine editorial media.

## Backwards-compatible migration

Run the migration once from an authenticated Sanity CLI session:

```bash
npm run cms:migrate
```

The migration uses `createIfNotExists`, so it does not overwrite already-curated new CMS records. It:

1. promotes existing embedded team members into Team Member documents;
2. promotes existing About reviews into Testimonial documents;
3. creates the DŌMICILE marketing singleton with the current approved public copy;
4. creates the current DŌMICILE FAQs as scoped FAQ documents;
5. creates the standard Monday–Friday Studio Status schedule with empty holiday overrides.

DŌMICILE media is intentionally not duplicated into Sanity by the migration. Existing coded images remain the safe visual fallback until approved replacements are uploaded in Studio.

## Publishing and safety rules

- Routine published content revalidates on the existing 300-second cadence; content edits do not require a Vercel redeploy.
- Do not publish fabricated project status, testimonials, client relationships, awards, registrations, completion dates or performance claims.
- Do not put secrets or private customer/property data in Sanity.
- Do not use `noIndex` unless the route is intentionally being removed from search.
- Review Studio Status holiday overrides when the operating calendar changes.
- Careers must remain inactive until a real role is approved for publication.
- Preserve image alternative text when replacing editorial media.
- DŌMICILE public CMS and the private DŌMICILE app remain separate systems by design.

## Studio information architecture

The Studio desk is now grouped as:

- Site Settings
- Pages
  - Homepage
  - About
  - Services
  - Contact
  - DŌMICILE
- Legal Pages
- Collections
  - Team Members
  - Testimonials
  - FAQs
  - Careers
- Projects
- Operations
  - Studio Status

This is the intended long-term public-site backend structure.
