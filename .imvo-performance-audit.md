# IMVO Performance Foundation Audit

## Phase 2 — complete

Phase 2 is the website performance foundation. Its original scope was:

- optimize images with modern formats, responsive delivery and lazy loading;
- avoid unnecessary font/network cost;
- code-split and defer noncritical JavaScript;
- deploy through a CDN/cached production path.

The implementation is now complete on `main`. Do not repeat the earlier Phase 2 batches unless a new regression is proven.

### 1. Images and media — complete

- Next.js Image Optimization negotiates AVIF and WebP.
- Confirmed heavy PNG/JPG fallbacks are rewritten to verified WebP equivalents.
- Active project source assets were remapped to lighter WebP equivalents.
- The homepage hero is poster-first and avoids unnecessary video pressure during cold load.
- The cinematic hero video is deferred and respects reduced-motion/data-saver fallbacks.
- Sanity image queries request optimized web-sized output instead of unrestricted originals.
- The final asset-cleanup release removed audited heavy source originals only after public-path rewrites were verified.

### 2. Fonts — complete by elimination of webfont cost

The site intentionally retains its system font stack. There is no performance benefit in adding a custom font merely to satisfy a literal "self-host fonts" checklist item.

The Phase 2 objective is therefore satisfied by avoiding an external/custom webfont request entirely rather than introducing a font payload and then optimizing it.

Do not add a network font unless an approved visual change requires one and the performance cost is measured first.

### 3. JavaScript and rendering — complete

- Noncritical site enhancers are route-split so they do not execute on routes where they are unused.
- Observer/polling-heavy homepage refinements are deferred away from the critical cold-load path.
- Homepage motion uses the lightweight LazyMotion/domAnimation path rather than loading the full motion feature set up front.
- The homepage hero video is deferred beyond the initial cold-load/intro window.
- Contact keeps its meaningful first paint in server-rendered HTML before client hydration.
- Primary content routes use ISR instead of unnecessary force-dynamic rendering.

### 4. CDN, caching and production delivery — complete

- The official `imvo-website` project is deployed on Vercel production; do not use or modify the old `imvo-website-xg24` duplicate for this website.
- Sanity content uses CDN-backed reads with force-cache and a 300-second revalidation window.
- Home, About, Projects index and project detail routes use 300-second ISR where implemented.
- Known project slugs are pre-generated while newly published CMS projects can still resolve dynamically.
- Routine CMS publishing therefore does not require a full website redeploy.

## Phase 2 closeout rule

Phase 2 is closed when the following remain true:

- AVIF/WebP image negotiation remains enabled;
- audited heavy fallback paths continue to resolve to lightweight equivalents;
- hero media does not block the first meaningful paint;
- system fonts remain network-free unless an approved redesign changes that decision;
- noncritical JavaScript stays route/lazy split;
- primary CMS-backed routes retain their caching/ISR behavior;
- the official IMVO Vercel project remains the production target;
- DŌMICILE behavior and the approved visual design remain outside performance-only changes.

Future performance work should be treated as regression fixing or a later optimization phase based on measured evidence, not as a reason to replay Phase 2.
