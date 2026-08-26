# IMVO Website CMS Blueprint

## Purpose

The IMVO Studio at `/studio` is the website control room. The goal is to let the IMVO team maintain public content, imagery, project information, careers, operational notices and SEO without editing application code, while keeping the approved visual system and layout protected.

The CMS should control **content and approved configuration**, not become a free-form page builder.

---

# PHASE 1 — FULL-SITE CONTENT CONTROL

## Status

Phase 1 covers the existing public website and keeps coded fallbacks so an empty or unavailable CMS field never blanks the live site.

### Studio structure

1. **Site Settings**
2. **Homepage**
3. **About Page**
4. **Services Page**
5. **Contact Page**
6. **DŌMICILE Page**
7. **Legal Pages**
   - Terms & Conditions
   - Privacy Policy
   - Cookie Policy
8. **Projects**

## Site Settings

Editable controls:

- Company name
- Tagline
- Professional-services notice
- Copyright line
- Brand motto
- Header navigation labels
- Header navigation links
- Header navigation order
- Header Request-a-Quote label
- Header Request-a-Quote destination
- General email
- Projects email
- Phone / WhatsApp
- Office location
- Google Maps URL
- Social links
- Default SEO title
- Default SEO description
- Default social sharing image

**Protected:** logo artwork, header visual design, typography, spacing, animation system and responsive behavior.

## Homepage

Editable controls already available:

- Hero label / introduction / main CTA label
- Regional Reach label, heading and introduction
- Project Intelligence label, heading, introduction and cards
- Studio Principles label, heading, introduction, cards and card imagery
- Architectural manifesto text
- In-progress label, heading, introduction and manual project cards
- Homepage service summaries
- Team section label / heading / group image / members
- Final CTA label, heading and button label

Projects selected as featured continue to come from the Project collection.

**Protected in Phase 1:** homepage visual architecture, Studio Status operating logic, marquee structure and animation timings. These become controlled operational/media items in later phases rather than editable CSS.

## About Page

Editable controls:

- Hero content and hero image
- Genesis/story content
- Regional section
- Culture content and image
- IMVO framework / stages
- Firm history timeline
- Consultancy cards
- Site coordination cards
- Team content
- Testimonials
- Final CTA
- Studio Deck CTA wording

## Services Page

Editable controls:

- Hero content and image
- Quote / Projects CTA labels
- Positioning content
- Service pillars and capabilities
- Coordination section and image
- Strategy section and image
- Strategy cards
- Process heading, image and steps
- Final CTA

## Contact Page

Editable controls:

- Hero content and image
- Contact detail cards
- Inquiry types
- Form section wording
- Submit button wording
- Success-state wording
- Response-time wording
- Location section
- Google Maps URL

Form delivery logic, spam protection and Rwanda location data remain code-controlled for safety.

## DŌMICILE Page

Editable controls:

### Hero
- Hero label
- Heading
- Introduction
- Primary CTA label
- Secondary CTA label
- Three hero facts
- Hero image

### How it works
- Section label
- Heading
- Introduction
- Quote
- Photo label/status
- Section image
- Four explanation steps

### Care in practice
- Section label
- Heading
- Introduction
- Two main care images
- Four care-card labels/descriptions

### Owner View
- Section label
- Heading
- Introduction
- Background property image

### Selected properties
- Section label
- Heading
- Introduction
- Three property stories
- Each property status, title, description and image

### Trust & FAQ
- IMVO backing label
- Trust heading
- Trust text
- FAQ label
- Up to six FAQ question/answer pairs

### Enquiry
- Section label
- Heading
- Introduction
- Enquiry image
- DŌMICILE email
- Displayed phone / WhatsApp
- WhatsApp URL
- Location label
- Form heading content
- Submit label
- Success state content
- Footer descriptor

### DŌMICILE SEO
- Google title
- Google description
- Social sharing image

The approved DŌMICILE layout, enquiry validation and property-care interaction remain protected.

## Legal Pages

Editable controls:

- Kicker
- Page title
- Introduction
- Sections
- Last-updated date

## Projects

Projects remain an independent ordered collection.

Editable project controls include the project's title, slug, category, status, location, summary, descriptive content, cover/media, galleries and other project-specific data defined by the Project schema.

Operational recommendation:

- **Unpublish / archive first** when removing a project from the public website.
- Permanent delete should be deliberate because published URLs may already be indexed or shared.

---

# PHASE 2 — SHARED STRUCTURED COLLECTIONS

Phase 2 removes duplication and allows repeatable content to be created once and reused across pages.

## Team Members

One central Team Member collection:

- Name
- Role
- Biography
- Portrait
- Display order
- Active / hidden status
- Homepage visibility
- About-page visibility

Editing or removing a team member once updates every place that references that person.

## Testimonials

Reusable collection:

- Quote
- Client name
- Date
- Project / context
- Approved for public use
- Display order

## Careers

A full Careers collection and `/careers` page.

Each vacancy:

- Job title
- Department / discipline
- Location
- Employment type
- Opening date
- Closing date
- Overview
- Responsibilities
- Requirements
- Application instructions
- Apply URL / email
- Status: Draft / Open / Closed / Archived
- Featured toggle

The Careers page also supports a general **Expression of Interest** section when no vacancy is open.

## Reusable FAQs

Where useful, FAQs can become reusable structured entries instead of page-only arrays.

## Featured-content controls

- Featured projects
- In-progress projects
- Homepage visibility toggles
- Ordering controls

---

# PHASE 3 — OPERATIONAL CONTROLS

## Studio Status

Studio Status becomes CMS-managed without losing the live Kigali clock and automatic opening-hours logic.

### Weekly operating schedule

Editable per weekday:

- Open / closed
- Opening time
- Closing time
- Optional lunch / reduced-service period

### Special days / overrides

Create a Special Day entry with:

- Date
- Name / reason
- Type: Public Holiday / Office Closed / Special Working Day / Reduced Hours / Team Event / Other
- Open / closed override
- Optional opening time
- Optional closing time
- Public status label
- Public message
- Priority
- Active toggle

A dated special-day entry overrides the normal weekly schedule for that date.

Examples:

- Umuganda / studio closure
- Team retreat
- Client event
- End-of-year break
- Special Saturday working day
- Reduced hours before a holiday

## Studio Status messaging

Editable optional messages for:

- Opening soon
- Studio open
- Lunch / midday
- Closing soon
- After hours
- Weekend
- Holiday
- Returning after holiday
- General studio pulse

The clock, timezone and safe fallback messages remain code-controlled.

## Media controls

Expand media control so approved visual slots can accept:

- Sanity image upload
- Sanity video upload
- External video URL where appropriate
- Alternative text
- Poster image
- Mobile-specific media when required

This allows a hero image/video or section photograph to be replaced from Studio without GitHub.

## SEO & growth controls

- Page-level SEO titles/descriptions
- Social sharing images
- Search Console verification values where appropriate
- Analytics measurement configuration
- Cookie-consent wording/configuration once non-essential tracking is enabled

---

# SAFETY RULES

1. **Published content only** affects the public website.
2. Drafts stay private in Studio.
3. Blank CMS fields fall back to the approved coded content where a fallback exists.
4. CMS editors control content, media and approved options — not raw CSS or arbitrary layout code.
5. Forms, validation, API keys, spam protection and security-sensitive configuration stay outside normal content fields.
6. Project removal should prefer unpublish/archive before permanent deletion.
7. Media fields require useful alternative text where the image carries meaning.
8. Navigation remains limited so CMS edits cannot break the approved header layout.

---

# TARGET EDITOR EXPERIENCE

The intended day-to-day workflow is:

- Change wording → Studio → edit → Publish.
- Replace a page photo → Studio → upload/select image → Publish.
- Update a team member → Team Members → edit → Publish.
- Add a vacancy → Careers → New Vacancy → Publish.
- Close a vacancy → change Status to Closed → Publish.
- Hide a project → unpublish/archive the Project.
- Add a special day off → Studio Status → Special Days → New entry → Publish.
- Change DŌMICILE FAQ/contact/photo → DŌMICILE Page → edit → Publish.

GitHub should only be needed for **new functionality, new visual components, structural redesign, integrations or engineering changes**.

---

# IMPLEMENTATION CHECKPOINTS

## Phase 1 release gate

Before merging Phase 1 to production:

- Sanity Studio builds successfully.
- All existing page documents still resolve.
- Missing DŌMICILE CMS document leaves the current live DŌMICILE design unchanged through fallbacks.
- Site Settings with no new navigation fields retains the approved default navigation.
- Existing Projects remain untouched.
- DŌMICILE enquiry still submits normally.
- Homepage, About, Services, Contact, Legal, Projects and DŌMICILE routes build without errors.
- No CMS edit can directly alter CSS or executable code.

## Future Phase 2 gate

- Central Team collection
- Careers collection/page
- Reusable testimonials
- Shared content ordering/visibility

## Future Phase 3 gate

- Studio schedule
- Special days
- CMS media/video controls
- Expanded SEO/growth configuration
