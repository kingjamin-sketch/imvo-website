-- DŌMICILE V1 — core property management data model
-- Apply to a dedicated Supabase project after environment confirmation.

create extension if not exists pgcrypto;

do $$ begin
  create type public.domicile_role as enum ('admin','property_officer','owner');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.case_status as enum ('received','reviewing','approval_needed','assigned','in_progress','completed','closed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.approval_status as enum ('pending','approved','declined','question');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  role public.domicile_role not null default 'owner',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  property_type text not null,
  address text,
  district text,
  sector text,
  city text not null default 'Kigali',
  country text not null default 'Rwanda',
  status text not null default 'managed',
  cover_image_path text,
  management_started_at date,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.property_members (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  relationship text not null default 'owner',
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  unique(property_id, user_id)
);

create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  property_id uuid not null references public.properties(id) on delete cascade,
  opened_by uuid not null references public.profiles(id),
  assigned_to uuid references public.profiles(id),
  category text not null,
  title text not null,
  description text not null,
  urgency text not null default 'normal',
  status public.case_status not null default 'received',
  access_instructions text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  closed_at timestamptz
);

create table if not exists public.case_updates (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  author_id uuid not null references public.profiles(id),
  body text not null,
  visible_to_owner boolean not null default true,
  attachment_paths text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.approvals (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  requested_for uuid not null references public.profiles(id),
  requested_by uuid not null references public.profiles(id),
  title text not null,
  description text,
  amount_rwf numeric(14,2),
  status public.approval_status not null default 'pending',
  owner_note text,
  responded_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.inspections (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  inspector_id uuid references public.profiles(id),
  title text not null,
  scheduled_for timestamptz,
  completed_at timestamptz,
  overall_status text not null default 'scheduled',
  summary text,
  report_path text,
  created_at timestamptz not null default now()
);

create table if not exists public.inspection_items (
  id uuid primary key default gen_random_uuid(),
  inspection_id uuid not null references public.inspections(id) on delete cascade,
  area text not null,
  item text not null,
  condition text not null check (condition in ('good','attention','urgent')),
  note text,
  photo_paths text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  property_id uuid not null references public.properties(id) on delete cascade,
  case_id uuid references public.cases(id) on delete set null,
  approval_id uuid references public.approvals(id) on delete set null,
  supplier_name text,
  description text not null,
  category text not null,
  amount_rwf numeric(14,2) not null check (amount_rwf >= 0),
  status text not null default 'recorded',
  receipt_path text,
  expense_date date not null default current_date,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  case_id uuid references public.cases(id) on delete set null,
  uploaded_by uuid references public.profiles(id),
  category text not null,
  title text not null,
  file_path text not null,
  mime_type text,
  visible_to_owner boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.activity_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id),
  property_id uuid references public.properties(id) on delete cascade,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.is_domicile_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('admin','property_officer')
  );
$$;

create or replace function public.can_access_property(target_property uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_domicile_staff() or exists (
    select 1 from public.property_members pm
    where pm.property_id = target_property and pm.user_id = auth.uid()
  );
$$;

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.property_members enable row level security;
alter table public.cases enable row level security;
alter table public.case_updates enable row level security;
alter table public.approvals enable row level security;
alter table public.inspections enable row level security;
alter table public.inspection_items enable row level security;
alter table public.expenses enable row level security;
alter table public.documents enable row level security;
alter table public.activity_logs enable row level security;

create policy "profile self or staff read" on public.profiles for select using (id = auth.uid() or public.is_domicile_staff());
create policy "profile self update" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy "property accessible members read" on public.properties for select using (public.can_access_property(id));
create policy "staff manage properties" on public.properties for all using (public.is_domicile_staff()) with check (public.is_domicile_staff());

create policy "property members visible" on public.property_members for select using (user_id = auth.uid() or public.is_domicile_staff());
create policy "staff manage property members" on public.property_members for all using (public.is_domicile_staff()) with check (public.is_domicile_staff());

create policy "cases visible by property" on public.cases for select using (public.can_access_property(property_id));
create policy "members open cases" on public.cases for insert with check (public.can_access_property(property_id) and opened_by = auth.uid());
create policy "staff manage cases" on public.cases for update using (public.is_domicile_staff()) with check (public.is_domicile_staff());

create policy "case updates visible by case" on public.case_updates for select using (
  exists (select 1 from public.cases c where c.id = case_id and public.can_access_property(c.property_id))
  and (visible_to_owner or public.is_domicile_staff())
);
create policy "members add case updates" on public.case_updates for insert with check (
  author_id = auth.uid() and exists (select 1 from public.cases c where c.id = case_id and public.can_access_property(c.property_id))
);

create policy "approvals visible by case" on public.approvals for select using (
  exists (select 1 from public.cases c where c.id = case_id and public.can_access_property(c.property_id))
);
create policy "staff create approvals" on public.approvals for insert with check (public.is_domicile_staff());
create policy "owner or staff respond approvals" on public.approvals for update using (requested_for = auth.uid() or public.is_domicile_staff()) with check (requested_for = auth.uid() or public.is_domicile_staff());

create policy "inspections visible by property" on public.inspections for select using (public.can_access_property(property_id));
create policy "staff manage inspections" on public.inspections for all using (public.is_domicile_staff()) with check (public.is_domicile_staff());

create policy "inspection items visible" on public.inspection_items for select using (
  exists (select 1 from public.inspections i where i.id = inspection_id and public.can_access_property(i.property_id))
);
create policy "staff manage inspection items" on public.inspection_items for all using (public.is_domicile_staff()) with check (public.is_domicile_staff());

create policy "expenses visible by property" on public.expenses for select using (public.can_access_property(property_id));
create policy "staff manage expenses" on public.expenses for all using (public.is_domicile_staff()) with check (public.is_domicile_staff());

create policy "documents visible by property" on public.documents for select using (public.can_access_property(property_id) and (visible_to_owner or public.is_domicile_staff()));
create policy "staff manage documents" on public.documents for all using (public.is_domicile_staff()) with check (public.is_domicile_staff());

create policy "activity visible by property" on public.activity_logs for select using (property_id is null and public.is_domicile_staff() or property_id is not null and public.can_access_property(property_id));
create policy "staff write activity" on public.activity_logs for insert with check (public.is_domicile_staff());

-- Create a private Storage bucket named `property-files` after the project is created.
-- Storage policies will restrict each object path to property members and DŌMICILE staff.
