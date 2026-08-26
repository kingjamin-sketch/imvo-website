# IMVO Website — Phase 3 Content & Trust

**Scope:** Content depth, trust proof, conversion paths, and individual service pages  
**Implementation status:** Complete except for factual verification of completed-project labels

## Original Phase 3 requirements

1. Add 6–8 completed projects to the portfolio.
2. Add testimonials and client/collaborator logos.
3. Add a WhatsApp CTA.
4. Create individual pages for Design, Consultancy, and Site Coordination.

## What was already in place

### Portfolio depth

The public project archive already exceeds the original 6–8-project quantity target, with a substantially larger residential, commercial, institutional, hospitality, and urban portfolio.

The important distinction is **completion status**: the local fallback project records do not label projects `Completed`, and the public project index does not currently expose a verified `Completed` status. Phase 3 must not manufacture completion claims.

The portfolio quantity requirement is therefore satisfied, but the specific “6–8 completed projects” trust claim remains a factual-content verification gate. Once actual delivered projects are confirmed, their existing CMS `status` fields can be updated without a code change.

### Testimonials and logos

The About experience already contains client testimonials, and the Services experience already contains a strategic-partner/collaborator logo band using the existing partner assets. These were not rebuilt or duplicated.

## Phase 3 implementation added

### Individual service pages

The website now has three first-class service routes:

- `/services/design`
- `/services/consultancy`
- `/services/site-coordination`

The pages:

- reuse the existing Services CMS `servicePillars` data for title, description, and included services;
- retain coded fallbacks so they remain useful if CMS content is unavailable;
- use the existing 300-second CMS revalidation policy;
- provide canonical metadata and social preview metadata;
- include Breadcrumb and Service structured data;
- link back to project enquiry and WhatsApp conversion paths;
- cross-link the other two services;
- use existing IMVO service and collaborator media rather than introducing unverified assets.

The main `/services` page now links to all three individual routes.

### WhatsApp conversion

The existing Contact page already contained a direct IMVO WhatsApp conversation link. Phase 3 strengthens this into a persistent site-level CTA on the public IMVO experience, while keeping `/studio` and DŌMICILE routes separate.

The global CTA:

- uses the CMS Site Settings phone when it contains a usable number;
- falls back to the existing IMVO WhatsApp number used by the Contact page;
- opens a prefilled project/service conversation;
- sits on the lower-left so it does not compete with the DŌMICILE widget on the lower-right;
- respects reduced-motion preferences.

Each individual service page also includes service-specific WhatsApp CTAs.

## Trust rules

- Do not label a project `Completed`, `Built`, or `Delivered` until that status is factually verified.
- Do not invent client relationships, awards, registrations, testimonials, project metrics, or completion dates.
- Keep collaborator wording where the relationship is collaborator/partner rather than asserting that every displayed logo is a client.
- Preserve the professional-services disclaimer and registered-practitioner boundary already used by the website.

## Phase 3 closeout gate

The code and conversion implementation is complete when:

- all three individual service URLs build and return successfully;
- `/services` links to them;
- the global WhatsApp CTA resolves to a valid IMVO number;
- existing testimonials and collaborator logos remain intact;
- sitemap includes all three service pages;
- no DŌMICILE behavior is changed.

The final content-only gate is to verify and mark 6–8 genuinely completed projects in Sanity. That update does not require a new website implementation phase or redeploy under the normal CMS workflow.
