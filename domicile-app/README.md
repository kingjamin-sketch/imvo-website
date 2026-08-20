# DŌMICILE App — V1

Operational property-management workspace for **DŌMICILE — Property Management by IMVO Group**.

## Deployment model

The public marketing/enquiry experience remains at `imvogroup.com/domicile`.

This folder is a separate Next.js application intended to be deployed from the same repository with Vercel Root Directory set to `domicile-app`, then connected to `app.imvogroup.com`.

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

## Current state

The interface currently runs in preview/demo mode with a Team / Owner role switch. The database migration in `supabase/migrations/001_domicile_v1.sql` contains the first production data model and RLS rules.

Supabase Auth and live data should be connected after a dedicated DŌMICILE Supabase project is created.

## Environment

Copy `.env.example` to `.env.local` and provide:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_APP_URL`

## Run

```bash
npm install
npm run dev
```
