-- DŌMICILE V1 — database-generated property codes
-- Apply after migrations 001–004.

create sequence if not exists public.property_code_seq start with 100;

create or replace function public.next_property_code()
returns text
language sql
volatile
set search_path = public
as $$
  select 'DP-' || lpad(nextval('public.property_code_seq')::text, 5, '0');
$$;

alter table public.properties alter column code set default public.next_property_code();

revoke all on function public.next_property_code() from public;
grant execute on function public.next_property_code() to authenticated;
