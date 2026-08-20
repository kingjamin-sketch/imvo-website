# DŌMICILE App — V1

Operational property-management workspace for **DŌMICILE — Property Management by IMVO Group**.

## Product ownership and isolation

DŌMICILE is an **IMVO Group product/service**. It is not part of HÖMNIA and must not share HÖMNIA application data, authentication, databases, storage buckets, environment variables, or operational infrastructure.

The intended relationship is:

- **IMVO Group** — parent brand / contracting and operating organization
- **DŌMICILE** — IMVO Group property-management product and operating application
- **HÖMNIA** — separate product with separate infrastructure and no DŌMICILE data dependency

Any future integration with another product must be explicit and approved rather than created through shared databases or accounts.

## Deployment model

- Public marketing/enquiry: `https://imvogroup.com/domicile`
- Operational app target: `https://app.imvogroup.com`
- Repository: same IMVO repository, isolated under `domicile-app/`
- Vercel: separate project with Root Directory = `domicile-app`
- Database/Auth/Storage: dedicated DŌMICILE Supabase project under an **IMVO Group** Supabase organization

The official IMVO website must remain a separate Vercel project/build target and must never use DŌMICILE application environment variables.

## V1 roles

- `admin` — full DŌMICILE access
- `property_officer` — operational access to assigned/managed properties
- `owner` — access only to properties they belong to

## V1 modules

1. Dashboard
2. Properties
3. Requests / Cases
4. Inspections
5. Expenses / Approvals
6. Documents

## Core operating flow

Owner reports a property need → DŌMICILE reviews it → approval is requested where necessary → work is coordinated → updates and supporting records are attached → the owner stays informed → case closes with a permanent property history.

## What is implemented on this branch

- Separate Next.js application package
- Team and Owner preview modes
- Interactive new-property-request flow
- Interactive approval/case-detail flow
- Supabase-ready login and sign-out
- Route protection that activates when demo mode is disabled
- Core V1 schema and RLS policies in `001_domicile_v1.sql`
- Security hardening, profile automation, notifications, management settings, private storage rules and indexes in `002_security_and_operations.sql`
- Isolated GitHub Actions build check for the app

## Environment

Copy `.env.example` to `.env.local` and provide:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_ENABLE_DEMO_MODE`

For development/visual review use `NEXT_PUBLIC_ENABLE_DEMO_MODE=true`.
For live authenticated deployment use `NEXT_PUBLIC_ENABLE_DEMO_MODE=false`.

## Launch gates

Do **not** treat the app as production-ready until all of the following are true:

1. IMVO Group Supabase organization exists.
2. Dedicated `domicile-production` project exists in that organization.
3. Migrations 001 and 002 apply successfully.
4. Supabase Security Advisor is checked and critical findings are resolved.
5. Real owner and staff test accounts are created.
6. Owner RLS is verified with two different owners/properties.
7. Private storage access is verified for owner-visible vs staff-only paths.
8. Separate Vercel project is configured with Root Directory `domicile-app`.
9. Production environment variables are set only on the DŌMICILE app project.
10. `app.imvogroup.com` is connected only after a successful preview test.
11. Full workflow test passes: request → review → approval → update → expense/document → close.
12. PR is reviewed before merge; official IMVO production must not be used as the first test environment.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The GitHub Action `.github/workflows/domicile-app-ci.yml` performs the production build independently of Vercel so DŌMICILE development can continue even when the Vercel account is rate-limited.
