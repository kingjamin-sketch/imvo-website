-- DŌMICILE V1 — operational work orders and generated references
-- Apply after 001 and 002.

-- Staff must be able to update profile roles and staff metadata.
drop policy if exists "staff update profiles" on public.profiles;
create policy "staff update profiles"
on public.profiles for update
using (public.is_domicile_staff())
with check (public.is_domicile_staff());

-- Database-generated human references avoid collisions between clients.
create sequence if not exists public.case_reference_seq start with 300;
create sequence if not exists public.expense_reference_seq start with 100;
create sequence if not exists public.work_order_reference_seq start with 100;

create or replace function public.next_case_reference()
returns text
language sql
volatile
set search_path = public
as $$
  select 'DM-' || lpad(nextval('public.case_reference_seq')::text, 5, '0');
$$;

create or replace function public.next_expense_reference()
returns text
language sql
volatile
set search_path = public
as $$
  select 'EX-' || lpad(nextval('public.expense_reference_seq')::text, 5, '0');
$$;

create or replace function public.next_work_order_reference()
returns text
language sql
volatile
set search_path = public
as $$
  select 'WO-' || lpad(nextval('public.work_order_reference_seq')::text, 5, '0');
$$;

alter table public.cases alter column reference set default public.next_case_reference();
alter table public.expenses alter column reference set default public.next_expense_reference();

-- Trusted technicians and service companies are internal operational records.
create table if not exists public.service_providers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  service_category text not null,
  phone text,
  email text,
  company_name text,
  notes text,
  active boolean not null default true,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.work_orders (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null default public.next_work_order_reference(),
  case_id uuid not null references public.cases(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  provider_id uuid references public.service_providers(id) on delete set null,
  assigned_staff uuid references public.profiles(id) on delete set null,
  scope text not null,
  estimate_rwf numeric(14,2) check (estimate_rwf is null or estimate_rwf >= 0),
  approved_amount_rwf numeric(14,2) check (approved_amount_rwf is null or approved_amount_rwf >= 0),
  status text not null default 'draft' check (status in ('draft','quoted','approval_needed','approved','scheduled','in_progress','completed','cancelled')),
  visible_to_owner boolean not null default true,
  scheduled_for timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  completion_note text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists service_providers_set_updated_at on public.service_providers;
create trigger service_providers_set_updated_at
before update on public.service_providers
for each row execute function public.set_updated_at();

drop trigger if exists work_orders_set_updated_at on public.work_orders;
create trigger work_orders_set_updated_at
before update on public.work_orders
for each row execute function public.set_updated_at();

alter table public.service_providers enable row level security;
alter table public.work_orders enable row level security;

create policy "staff manage service providers"
on public.service_providers for all
using (public.is_domicile_staff())
with check (public.is_domicile_staff());

create policy "work orders visible by property"
on public.work_orders for select
using (
  public.is_domicile_staff()
  or (visible_to_owner and public.can_access_property(property_id))
);

create policy "staff manage work orders"
on public.work_orders for all
using (public.is_domicile_staff())
with check (public.is_domicile_staff());

create index if not exists idx_service_providers_category_active on public.service_providers(service_category, active);
create index if not exists idx_work_orders_case_status on public.work_orders(case_id, status, created_at desc);
create index if not exists idx_work_orders_property_status on public.work_orders(property_id, status, created_at desc);
create index if not exists idx_work_orders_provider_status on public.work_orders(provider_id, status, created_at desc);

-- Reference helpers are for authenticated app users; values still obey table RLS.
revoke all on function public.next_case_reference() from public;
revoke all on function public.next_expense_reference() from public;
revoke all on function public.next_work_order_reference() from public;
grant execute on function public.next_case_reference() to authenticated;
grant execute on function public.next_expense_reference() to authenticated;
grant execute on function public.next_work_order_reference() to authenticated;
