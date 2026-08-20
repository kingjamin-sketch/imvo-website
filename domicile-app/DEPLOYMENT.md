# DŌMICILE Production Deployment Runbook

This runbook keeps the DŌMICILE application isolated from both the official IMVO marketing website and HÖMNIA.

## 1. Supabase organization

Create or select a Supabase organization owned by IMVO Group. Do not use the HÖMNIA organization.

Recommended organization name: `IMVO Group`

## 2. Supabase project

Create a dedicated project:

- Name: `domicile-production`
- Region: choose the closest available stable region to Rwanda; `eu-central-1` is acceptable when no African region is available.
- Auth: email/password enabled for V1
- Database: dedicated only to DŌMICILE
- Storage: dedicated private `property-files` bucket created by migration 002

Apply migrations in order:

1. `supabase/migrations/001_domicile_v1.sql`
2. `supabase/migrations/002_security_and_operations.sql`
3. `supabase/migrations/003_work_orders_and_references.sql`

After migrations, run Supabase Security Advisor and resolve any critical warnings before real owner data is added.

## 3. First users

Create two test owners and at least one DŌMICILE staff account.

The auth trigger creates every new user as `owner`. Promote only the IMVO staff profile to `admin` or `property_officer` from a trusted administrative context.

Never allow a public client to choose its own role.

## 4. RLS acceptance test

Before launch, create two properties and attach one owner to each.

Verify:

- Owner A can read only Property A.
- Owner B can read only Property B.
- Owner A cannot read Property B by UUID or direct REST request.
- Staff can read both.
- Owners cannot promote their profile role.
- Owners cannot change an approval amount or requester.
- Staff-only documents cannot be downloaded by owners.
- Owner-visible property files can be read only by the relevant owner and staff.

## 5. Vercel project

Create a **new** Vercel project from the existing IMVO GitHub repository.

Important settings:

- Project name: `domicile-app`
- Framework: Next.js
- Root Directory: `domicile-app`
- Production branch: use the approved branch only after PR review/merge

Do not change the Root Directory, environment variables or domain settings of the existing IMVO website project.

## 6. Environment variables

Set only on the DŌMICILE Vercel project:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_APP_URL=https://app.imvogroup.com`
- `NEXT_PUBLIC_ENABLE_DEMO_MODE=false`

Never place a Supabase service-role key in a `NEXT_PUBLIC_` variable.

## 7. Preview before domain

Deploy to a Vercel preview URL first.

Acceptance flow:

1. Staff signs in.
2. Staff sees Team workspace.
3. Owner signs in.
4. Owner sees only their own property.
5. Owner creates a case.
6. Team reviews the case.
7. Team creates an approval.
8. Owner approves or asks a question.
9. Team records work/expense/document.
10. Owner sees the update.
11. Case closes with history retained.

Only connect the custom domain after this flow passes.

## 8. Domain

Target domain: `app.imvogroup.com`

The public DŌMICILE marketing experience remains at `https://imvogroup.com/domicile`.

The app may link back to the public DŌMICILE page, but the public website must not depend on the app being available in order to load.

## 9. Launch checks

- Demo mode disabled
- Real login required
- RLS verified
- Storage private
- Security Advisor reviewed
- No HÖMNIA Supabase URLs/keys present
- No DŌMICILE Supabase keys present in the public IMVO project
- Mobile owner portal checked
- Backup/recovery settings reviewed
- Support email/WhatsApp links checked
- Health endpoint returns `status: ok` at `/api/health`

## 10. Rollback rule

If the DŌMICILE app has a deployment problem, roll back only the DŌMICILE Vercel project. Do not roll back or alter the official IMVO website as part of an app rollback.
