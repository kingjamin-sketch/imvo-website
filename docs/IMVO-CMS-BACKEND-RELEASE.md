# IMVO CMS Backend Release Gate

This release completes the operational Sanity backend for the public IMVO website while preserving the current production presentation and the private DŌMICILE application boundary.

## Included

- Site Settings route-level SEO overrides and explicit no-index controls.
- Homepage hero media replacement and section visibility controls.
- Structured Team Member and Testimonial collections with backwards-compatible fallbacks.
- Structured FAQ collection.
- CMS-powered Careers collection and public `/careers` route.
- Public DŌMICILE marketing singleton for copy, imagery, property examples, FAQs and SEO.
- Studio Status singleton for weekly hours, explicit date overrides and time-boxed notices.
- Editable media for the three individual service-detail routes.
- Cached public read layer with the existing 300-second revalidation policy.
- One-time safe migration command: `npm run cms:migrate`.

## Safety rules

- Existing production content remains the fallback until the new CMS documents are populated.
- The migration promotes existing content rather than inventing new claims.
- Public DŌMICILE CMS content must never contain private owner/property operational records.
- The private DŌMICILE app and its Supabase infrastructure remain separate from this release.
- Holiday/date overrides are intentionally not pre-populated as authoritative dates; IMVO reviews and enters the dates it observes.
- `noIndex` is explicit and opt-in.
- The Studio Status visibility control targets only its card and cannot hide the containing homepage section.

## Release sequence

1. Exact branch head must pass the Vercel production build pipeline as a preview.
2. Smoke-test `/studio`, `/careers`, `/domicile`, `/services/design`, `/services/consultancy`, `/services/site-coordination`, and `/sitemap.xml`.
3. Merge only the validated head through a pull request.
4. Confirm the merged production deployment is READY on the canonical `imvo-website` Vercel project.
5. Recheck the same public routes on `www.imvogroup.com`.

No changes in this release target the stale `imvo-website-xg24` Vercel project.