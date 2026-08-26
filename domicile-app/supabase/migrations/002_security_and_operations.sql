-- DŌMICILE V1 — security and operational hardening
-- Apply after 001_domicile_v1.sql to the dedicated IMVO Group / DŌMICILE Supabase project.

-- Keep updated_at fields accurate.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists properties_set_updated_at on public.properties;
create trigger properties_set_updated_at
before update on public.properties
for each row execute function public.set_updated_at();

drop trigger if exists cases_set_updated_at on public.cases;
create trigger cases_set_updated_at
before update on public.cases
for each row execute function public.set_updated_at();

-- Every Auth user receives a profile. New public users are always owners.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, role)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), split_part(new.email, '@', 1), 'DŌMICILE User'),
    nullif(trim(new.raw_user_meta_data ->> 'phone'), ''),
    'owner'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Owners may edit their own contact/profile details, but can never promote their own role.
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() = old.id and not public.is_domicile_staff() then
    new.role = old.role;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_protect_role on public.profiles;
create trigger profiles_protect_role
before update on public.profiles
for each row execute function public.protect_profile_role();

-- Owners creating a case cannot assign it, close it or bypass the normal received state.
create or replace function public.normalize_owner_case()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_domicile_staff() then
    new.opened_by = auth.uid();
    new.assigned_to = null;
    new.status = 'received';
    new.closed_at = null;
  end if;
  return new;
end;
$$;

drop trigger if exists cases_normalize_owner_insert on public.cases;
create trigger cases_normalize_owner_insert
before insert on public.cases
for each row execute function public.normalize_owner_case();

-- Owner comments are always visible to the owner. Staff can still create internal updates.
create or replace function public.normalize_case_update_visibility()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_domicile_staff() then
    new.author_id = auth.uid();
    new.visible_to_owner = true;
  end if;
  return new;
end;
$$;

drop trigger if exists case_updates_normalize_owner_insert on public.case_updates;
create trigger case_updates_normalize_owner_insert
before insert on public.case_updates
for each row execute function public.normalize_case_update_visibility();

-- An owner may respond to an approval, but cannot change the amount, case, requester or commercial wording.
create or replace function public.protect_owner_approval_response()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() = old.requested_for and not public.is_domicile_staff() then
    new.case_id = old.case_id;
    new.requested_for = old.requested_for;
    new.requested_by = old.requested_by;
    new.title = old.title;
    new.description = old.description;
    new.amount_rwf = old.amount_rwf;
    new.created_at = old.created_at;

    if new.status not in ('approved', 'declined', 'question') then
      raise exception 'Invalid owner approval response';
    end if;

    if new.status is distinct from old.status then
      new.responded_at = now();
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists approvals_protect_owner_response on public.approvals;
create trigger approvals_protect_owner_response
before update on public.approvals
for each row execute function public.protect_owner_approval_response();

-- Notifications are private to each user. Staff create operational notifications.
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid references public.properties(id) on delete cascade,
  case_id uuid references public.cases(id) on delete cascade,
  title text not null,
  body text not null,
  kind text not null default 'update',
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.notifications enable row level security;

drop policy if exists "notification owner read" on public.notifications;
create policy "notification owner read"
on public.notifications for select
using (user_id = auth.uid() or public.is_domicile_staff());

drop policy if exists "notification owner mark read" on public.notifications;
create policy "notification owner mark read"
on public.notifications for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "staff create notifications" on public.notifications;
create policy "staff create notifications"
on public.notifications for insert
with check (public.is_domicile_staff());

-- Property-level operating terms agreed during onboarding.
create table if not exists public.property_management_settings (
  property_id uuid primary key references public.properties(id) on delete cascade,
  standard_approval_limit_rwf numeric(14,2) check (standard_approval_limit_rwf is null or standard_approval_limit_rwf >= 0),
  emergency_spend_limit_rwf numeric(14,2) check (emergency_spend_limit_rwf is null or emergency_spend_limit_rwf >= 0),
  inspection_frequency text,
  access_notes text,
  emergency_notes text,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

alter table public.property_management_settings enable row level security;

create policy "management settings visible by property"
on public.property_management_settings for select
using (public.can_access_property(property_id));

create policy "staff manage management settings"
on public.property_management_settings for all
using (public.is_domicile_staff())
with check (public.is_domicile_staff());

-- Useful indexes for the operational dashboard and property history.
create index if not exists idx_property_members_user on public.property_members(user_id, property_id);
create index if not exists idx_cases_property_status on public.cases(property_id, status, created_at desc);
create index if not exists idx_cases_assigned_status on public.cases(assigned_to, status, created_at desc);
create index if not exists idx_case_updates_case_created on public.case_updates(case_id, created_at desc);
create index if not exists idx_approvals_requested_for_status on public.approvals(requested_for, status, created_at desc);
create index if not exists idx_inspections_property_schedule on public.inspections(property_id, scheduled_for);
create index if not exists idx_expenses_property_date on public.expenses(property_id, expense_date desc);
create index if not exists idx_documents_property_created on public.documents(property_id, created_at desc);
create index if not exists idx_activity_property_created on public.activity_logs(property_id, created_at desc);
create index if not exists idx_notifications_user_created on public.notifications(user_id, created_at desc);

-- Private property file storage.
-- Path convention:
--   owner/<property_uuid>/...  -> visible to property members + DŌMICILE staff
--   staff/<property_uuid>/...  -> DŌMICILE staff only
insert into storage.buckets (id, name, public)
values ('property-files', 'property-files', false)
on conflict (id) do update set public = false;

create or replace function public.storage_property_uuid(object_name text)
returns uuid
language plpgsql
immutable
set search_path = public
as $$
declare
  parts text[];
begin
  parts := string_to_array(object_name, '/');
  if array_length(parts, 1) < 3 then
    return null;
  end if;
  return parts[2]::uuid;
exception when invalid_text_representation then
  return null;
end;
$$;

create policy "property files read"
on storage.objects for select
using (
  bucket_id = 'property-files'
  and (
    public.is_domicile_staff()
    or (
      split_part(name, '/', 1) = 'owner'
      and public.can_access_property(public.storage_property_uuid(name))
    )
  )
);

create policy "property files owner upload"
on storage.objects for insert
with check (
  bucket_id = 'property-files'
  and (
    public.is_domicile_staff()
    or (
      split_part(name, '/', 1) = 'owner'
      and public.can_access_property(public.storage_property_uuid(name))
    )
  )
);

create policy "property files staff update"
on storage.objects for update
using (bucket_id = 'property-files' and public.is_domicile_staff())
with check (bucket_id = 'property-files' and public.is_domicile_staff());

create policy "property files staff delete"
on storage.objects for delete
using (bucket_id = 'property-files' and public.is_domicile_staff());

-- Explicitly keep execution available only to authenticated application users where appropriate.
revoke all on function public.is_domicile_staff() from public;
revoke all on function public.can_access_property(uuid) from public;
revoke all on function public.storage_property_uuid(text) from public;
grant execute on function public.is_domicile_staff() to authenticated;
grant execute on function public.can_access_property(uuid) to authenticated;
grant execute on function public.storage_property_uuid(text) to authenticated;
