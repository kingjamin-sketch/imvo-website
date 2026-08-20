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

The official IMVO website remains a separate Vercel project/build target and must never receive DŌMICILE application environment variables.

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

- Separate Next.js application package with its own build boundary
- Team and Owner **demo preview** modes for visual review
- Separate authenticated `/live` workspace backed by Supabase/RLS data
- Live properties, cases, approvals, inspections, expenses and document metadata
- Live case creation and owner approval responses
- Admin managed-property onboarding flow
- Secure admin-only owner invitation Edge Function
- Email/password login, sign-out, password recovery and password update
- Fail-closed route protection when demo mode is not explicitly enabled
- Production health endpoint that returns `503 configuration_required` when live auth is missing
- No-index/no-follow protection for the operational workspace
- Security headers in Next.js configuration
- Private property-file upload helper and bucket restrictions
- Database-generated references for properties, cases, work orders and expenses
- Automatic activity history and notifications
- Dedicated deployment runbook
- CI that builds both the DŌMICILE package and the official IMVO website to verify isolation

## Database migrations

Apply the migrations in order to the dedicated DŌMICILE Supabase project:

1. `001_domicile_v1.sql` — core profiles, properties, property membership, cases, approvals, inspections, expenses, documents and activity history with RLS
2. `002_security_and_operations.sql` — role protection, owner-case normalization, protected approvals, notifications, management settings, indexes and private storage rules
3. `003_work_orders_and_references.sql` — work orders, service providers and database-generated case/expense/work-order references
4. `004_audit_and_notifications.sql` — automatic case/work-order activity and owner/team notification records
5. `005_property_codes.sql` — database-generated managed-property codes
6. `006_security_hardening.sql` — protects notification contents from owner rewrites and limits private property-file uploads to approved formats and 15 MB

## Environment

Copy `.env.example` to `.env.local` and provide:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_ENABLE_DEMO_MODE`

For an intentional visual preview use `NEXT_PUBLIC_ENABLE_DEMO_MODE=true`.
For authenticated/live use `NEXT_PUBLIC_ENABLE_DEMO_MODE=false`.

**Important:** demo mode is opt-in. If the flag is absent or anything other than `true`, the app behaves as live mode and fails closed when Supabase is missing.

Never expose a Supabase service-role key through a `NEXT_PUBLIC_` variable.

The `invite-owner` Edge Function also uses:

- `DOMICILE_APP_URL=https://app.imvogroup.com`
- `DOMICILE_ALLOWED_ORIGINS` — optional comma-separated exact preview origins used only during acceptance testing

## Launch gates

Do **not** treat the app as production-ready until all of the following are true:

1. An IMVO Group Supabase organization exists.
2. A dedicated `domicile-production` project exists in that organization.
3. Migrations 001–006 apply successfully in order.
4. The `invite-owner` Edge Function is deployed with JWT verification enabled.
5. Supabase Security Advisor is checked and critical findings are resolved.
6. Real owner and staff test accounts are created.
7. Owner RLS is verified with two different owners/properties.
8. Private storage access is verified for owner-visible vs staff-only paths.
9. Separate Vercel project is configured with Root Directory `domicile-app`.
10. Production environment variables are set only on the DŌMICILE app project.
11. `app.imvogroup.com` is connected only after a successful preview test.
12. Full workflow test passes: onboarding → request → review → approval → work order/update → expense/document → close.
13. Both CI build jobs are green.
14. PR is reviewed before merge; official IMVO production must not be used as the first test environment.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The workflow `.github/workflows/domicile-app-ci.yml` builds DŌMICILE independently and also builds the official IMVO application with the DŌMICILE package present. This protects both applications from accidental cross-package dependency or TypeScript/lint leakage.
