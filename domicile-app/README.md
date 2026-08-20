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

- `admin` — full DŌMICILE access and formal property onboarding
- `property_officer` — operational access to managed properties
- `owner` — access only to properties they belong to

There is no open client registration. Owners enter the portal only after DŌMICILE has agreed to proceed, created the managed-property relationship and sent an invitation.

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
- Approved DŌMICILE no-tagline brand assets bundled inside the standalone app
- Interactive new-property-request flow
- Interactive approval/case-detail flow
- Admin managed-property onboarding flow
- Secure owner invitation Edge Function scaffold
- Supabase-ready email/password login and sign-out
- Password-recovery and password-update flow
- Route protection that activates when demo mode is disabled
- No-index/no-follow protection for the operational workspace
- Health endpoint at `/api/health`
- Security headers in Next.js configuration
- Supabase browser/server client scaffolding and a live-data access layer
- Private property-file upload helper
- Dedicated deployment runbook
- Isolated GitHub Actions production-build check

## Database migrations

Apply the migrations in order to the dedicated DŌMICILE Supabase project:

1. `001_domicile_v1.sql` — core profiles, properties, property membership, cases, approvals, inspections, expenses, documents and activity history with RLS
2. `002_security_and_operations.sql` — role protection, owner-case normalization, protected approvals, notifications, management settings, indexes and private storage rules
3. `003_work_orders_and_references.sql` — work orders, service providers and database-generated case/expense/work-order references
4. `004_audit_and_notifications.sql` — automatic case/work-order activity and owner/team notification records
5. `005_property_codes.sql` — database-generated managed-property codes

## Environment

Copy `.env.example` to `.env.local` and provide:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_ENABLE_DEMO_MODE`

For development/visual review use `NEXT_PUBLIC_ENABLE_DEMO_MODE=true`.
For live authenticated deployment use `NEXT_PUBLIC_ENABLE_DEMO_MODE=false`.

Never expose a Supabase service-role key through a `NEXT_PUBLIC_` variable.

## Launch gates

Do **not** treat the app as production-ready until all of the following are true:

1. An IMVO Group Supabase organization exists.
2. A dedicated `domicile-production` project exists in that organization.
3. Migrations 001–005 apply successfully in order.
4. The `invite-owner` Edge Function is deployed with JWT verification enabled.
5. Supabase Security Advisor is checked and critical findings are resolved.
6. Real owner and staff test accounts are created.
7. Owner RLS is verified with two different owners/properties.
8. Private storage access is verified for owner-visible vs staff-only paths.
9. Separate Vercel project is configured with Root Directory `domicile-app`.
10. Production environment variables are set only on the DŌMICILE app project.
11. `app.imvogroup.com` is connected only after a successful preview test.
12. Full workflow test passes: onboarding → request → review → approval → work order/update → expense/document → close.
13. PR is reviewed before merge; official IMVO production must not be used as the first test environment.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The GitHub Action `.github/workflows/domicile-app-ci.yml` performs the production build independently of Vercel, with concurrency enabled so superseded PR builds are cancelled rather than wasting build capacity.
