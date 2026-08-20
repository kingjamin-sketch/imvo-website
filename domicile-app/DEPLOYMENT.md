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
- Storage: dedicated private `property-files` bucket created by migration 002 and hardened by migration 006

Apply migrations in order:

1. `supabase/migrations/001_domicile_v1.sql`
2. `supabase/migrations/002_security_and_operations.sql`
3. `supabase/migrations/003_work_orders_and_references.sql`
4. `supabase/migrations/004_audit_and_notifications.sql`
5. `supabase/migrations/005_property_codes.sql`
6. `supabase/migrations/006_security_hardening.sql`

Deploy `supabase/functions/invite-owner/index.ts` with JWT verification enabled.

Configure the function with:

- `DOMICILE_APP_URL=https://app.imvogroup.com`
- `DOMICILE_ALLOWED_ORIGINS=<comma-separated exact preview origins>` only while preview acceptance testing needs them

Never use `*` for the owner-invitation CORS origin.

After migrations and function deployment, run Supabase Security Advisor and resolve any critical warnings before real owner data is added.

## 3. First users

Create two test owners and at least one DŌMICILE staff account.

The auth trigger creates every new user as `owner`. Promote only the IMVO staff profile to `admin` or `property_officer` from a trusted administrative context.

Never allow a public client to choose its own role. Formal owner onboarding occurs through the administrator onboarding flow after the management relationship is agreed.

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
- Owners can mark their own notifications read but cannot rewrite notification content or ownership.
- Staff-only documents cannot be downloaded by owners.
- Owner-visible property files can be read only by the relevant owner and staff.
- Property-file uploads reject files above 15 MB and formats outside the approved bucket list.
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

Demo mode is deliberately opt-in. If `NEXT_PUBLIC_ENABLE_DEMO_MODE` is absent or not exactly `true`, the app behaves as live mode. Missing Supabase configuration in live mode redirects protected routes to sign-in and `/api/health` returns HTTP 503 with `status: configuration_required`.

Never place a Supabase service-role key in a `NEXT_PUBLIC_` variable. The service-role key belongs only in the Supabase/Edge Function environment.

## 7. Auth URL configuration

In Supabase Auth URL settings, use the final app URL as the site URL and allow the required preview/callback URLs during testing.

Required production callback path:

`https://app.imvogroup.com/auth/callback`

Password-recovery links return through that callback and then move to `/auth/update-password`.

## 8. Preview before domain

Deploy to a **separate DŌMICILE Vercel preview** first with demo mode disabled and real test accounts.

Acceptance flow:

1. `/api/health` returns `status: ok`, `mode: live`, and `supabaseConfigured: true`.
2. Administrator signs in and is routed to `/live`.
3. Administrator creates a managed property and invites Owner A.
4. Owner A accepts the invitation and sets a secure password.
5. Owner A sees only Property A.
6. Owner A creates a case from the live workspace.
7. Team reviews the case and adds a visible update.
8. Team creates an approval and/or work order.
9. Owner A approves, declines or asks a question.
10. Team records work, expense and supporting document.
11. Owner A sees the relevant live records.
12. Case closes with activity history retained.
13. Owner B is created for Property B and cannot access any Property A records or files.
14. Password recovery succeeds for an owner test account.
15. File-size/type restrictions and owner/staff storage visibility are verified.

Only connect the custom domain after this flow passes.

## 9. Domain

Target domain: `app.imvogroup.com`

The public DŌMICILE marketing experience remains at `https://imvogroup.com/domicile`.

The app may link back to the public DŌMICILE page, but the public website must not depend on the app being available in order to load.

## 10. Launch checks

- Demo mode disabled
- Real login required
- Authenticated users route to `/live`, not the demo workspace
- No public registration
- Password recovery checked
- RLS verified with two owners
- Storage private and upload restrictions verified
- Security Advisor reviewed
- Operational app is noindex/nofollow
- No HÖMNIA Supabase URLs/keys present
- No DŌMICILE Supabase keys present in the public IMVO project
- Approved no-tagline DŌMICILE assets render from the standalone app package
- Mobile owner portal checked
- Backup/recovery settings reviewed
- Support email/WhatsApp links checked
- Health endpoint returns `status: ok` at `/api/health`
- DŌMICILE CI build is green
- IMVO isolation CI build is green

## 11. Rollback rule

If the DŌMICILE app has a deployment problem, roll back only the DŌMICILE Vercel project. Do not roll back or alter the official IMVO website as part of an app rollback.
