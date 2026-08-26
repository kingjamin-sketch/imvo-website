# IMVO Website — Phase 2 Performance Closeout

**Status:** Complete  
**Scope:** Performance foundation only  
**Protected:** Approved visual design, CMS behavior, routes/forms unless required for performance, and DŌMICILE

## Original Phase 2 scope

The improvement plan defined Phase 2 as the performance foundation:

1. modern image delivery and lighter source media;
2. font/network optimization;
3. code splitting and deferred JavaScript;
4. CDN/caching-backed deployment.

## What is already merged

### Images and media

- **PR #9 — Performance foundation:** AVIF/WebP negotiation, poster-first hero behavior, lighter video preload, reduced-motion/data-saver static fallback, and retention of the system font stack.
- **PR #14 — Heavy fallback rewrites:** confirmed PNG/JPG fallback URLs routed to WebP equivalents without changing the public paths or design.
- **PR #15 — Project image sources:** 41 actively referenced project assets mapped to verified WebP equivalents; the referenced raw source set dropped from roughly 364.3 MB to 31.7 MB.
- **PR #20 — Final performance release:** Contact server-first first paint, homepage cold-load deferral, and audited removal of 53 heavy PNG/JPG originals after their public paths were safely preserved through rewrites.

Current `next.config.ts` retains AVIF/WebP negotiation and the verified lightweight fallback rewrites.

### Fonts

The site deliberately uses a system font stack and therefore has no custom webfont payload to download, self-host, subset or preload.

This is the preferred Phase 2 result. Adding a custom font only to satisfy the wording of the original checklist would make the page heavier rather than faster.

### JavaScript and rendering

- **PR #11 — Route-split noncritical enhancements:** large client enhancers only load where they are used.
- **PR #16 — Sanity ISR caching:** public CMS reads moved to cached delivery with a 300-second revalidation window.
- **PR #17 — Primary-route ISR:** Home, About, Projects index and project detail routes moved away from unnecessary force-dynamic rendering and use 300-second ISR; known project slugs are pre-generated.
- **PR #20 — Final performance release:** observer/polling-heavy homepage refinements and hero video work moved away from the initial critical path.
- **PR #25 — Lazy homepage motion:** homepage animation elements use lightweight `m` with `LazyMotion`/`domAnimation` instead of loading the full motion feature set up front.

### CDN and production delivery

The official Vercel project is **`imvo-website`**. The old **`imvo-website-xg24`** duplicate is not part of the release path and must remain untouched.

On 26 August 2026, the official project reported the current `main` deployment as **READY** with production target. Vercel provides the production delivery layer while Sanity continues to serve CMS media/content through its CDN-backed data path.

## Current closeout baseline

Phase 2 is considered complete while these conditions remain true:

- Next.js image output supports AVIF/WebP;
- known heavyweight local fallbacks resolve to verified lightweight equivalents;
- hero media remains non-blocking and respects reduced-motion/data-saver behavior;
- no unnecessary webfont network dependency is introduced;
- noncritical JavaScript remains route/lazy split;
- CMS-backed primary routes retain their caching/ISR behavior;
- Contact retains server-first meaningful content;
- the official `imvo-website` Vercel project remains the production target;
- performance-only maintenance does not alter DŌMICILE or redesign the approved IMVO visual system.

## What comes after Phase 2

Do not reopen these implementation batches unless a regression or measured performance problem proves the need. Any future Lighthouse/Core Web Vitals work should be treated as ongoing monitoring or a later optimization pass rather than unfinished Phase 2 foundation work.
