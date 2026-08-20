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
4. `supabase/migrations/004_audit_and_notifications.sql`
5. `supabase/migrations/005_property_codes.sql`

Deploy `supabase/functions/invite-owner/index.ts` with JWT verification enabled. Configure `DOMICILE_APP_URL=https://app.imvogroup.com` for the function.

After migrations and function deployment, run Supabase Security Advisor and resolve any critical warnings before real owner data is added.

## 3. First users

Create two test owners and at least one DŌMICILE staff account.

The auth trigger creates every new user as `owner`. Promote only the IMVO staff profile to `admin` or `property_officer` from a trusted administrative context.

Never allow a public client to choose its own role. Formal owner onboarding should occur through the administrator onboarding flow after the management relationship is agreed.

## 4. RLS acceptance test

Before launch, create two properties and attach one owner to each.

Verify:

- Owner A can read only Property A.
- Owner B can read only Property B.
- Owner A cannot read Property B by UUID or direct REST request.
- Staff can read both.
- Owners cannot promote their profile role.
- Owners cannot assign or prematurely close their own cases.
- Owners cannot change an approval amount, case, requester or commercial wording.
- Staff-only documents cannot be downloaded by owners.
- Owner-visible property files can be read only by the relevant owner and staff.
- Owner invitations can only be initiated by an `admin`.
- Activity and notification records are generated when a case or approval changes.

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

Never place a Supabase service-role key in a `NEXT_PUBLIC_` variable. The service-role key belongs only in the Supabase server/Edge Function environment.

## 7. Auth URL configuration

In Supabase Auth URL settings, use the final app URL as the site URL and allow the required preview/callback URLs during testing.

Required production callback path:

`https://app.imvogroup.com/auth/callback`

Password-recovery links return through that callback and then move to `/auth/update-password`.

## 8. Preview before domain

Deploy to a Vercel preview URL first with demo mode disabled and real test accounts.

Acceptance flow:

1. Administrator signs in.
2. Administrator creates a managed property and invites Owner A.
3. Owner A accepts the invitation and sets a secure password.
4. Owner A sees only Property A.
5. Owner A creates a case.
6. Team reviews the case and adds a visible update.
7. Team creates an approval and/or work order.
8. Owner A approves, declines or asks a question.
9. Team records work, expense and supporting document.
10. Owner A sees the update and relevant document.
11. Case closes with activity history retained.
12. Owner B is created for Property B and cannot access any Property A records or files.
13. Password recovery succeeds for an owner test account.
14. `/api/health` returns `status: ok` and `mode: live`.

Only connect the custom domain after this flow passes.

## 9. Domain

Target domain: `app.imvogroup.com`

The public DŌMICILE marketing experience remains at `https://imvogroup.com/domicile`.

The app may link back to the public DŌMICILE page, but the public website must not depend on the app being available in order to load.

## 10. Launch checks

- Demo mode disabled
- Real login required
- No public registration
- Password recovery checked
- RLS verified with two owners
- Storage private
- Security Advisor reviewed
- Operational app is noindex/nofollow
- No HÖMNIA Supabase URLs/keys present
- No DŌMICILE Supabase keys present in the public IMVO project
- Approved no-tagline DŌMICILE assets render from the standalone app package
- Mobile owner portal checked
- Backup/recovery settings reviewed
- Support email/WhatsApp links checked
- Health endpoint returns `status: ok` at `/api/health`

## 11. Rollback rule

If the DŌMICILE app has a deployment problem, roll back only the DŌMICILE Vercel project. Do not roll back or alter the official IMVO website as part of an app rollback.
