-- DŌMICILE V1 — final security hardening before live data
-- Apply after migrations 001–005.

-- Owners may mark their own notifications read, but must not be able to rewrite
-- notification ownership, property/case links, message content, kind or timestamps.
create or replace function public.protect_notification_owner_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() = old.user_id and not public.is_domicile_staff() then
    new.user_id = old.user_id;
    new.property_id = old.property_id;
    new.case_id = old.case_id;
    new.title = old.title;
    new.body = old.body;
    new.kind = old.kind;
    new.created_at = old.created_at;
  end if;
  return new;
end;
$$;

drop trigger if exists notifications_protect_owner_update on public.notifications;
create trigger notifications_protect_owner_update
before update on public.notifications
for each row execute function public.protect_notification_owner_update();

-- Property uploads stay private and are constrained to ordinary property-record formats.
update storage.buckets
set
  public = false,
  file_size_limit = 15728640,
  allowed_mime_types = array[
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]::text[]
where id = 'property-files';

-- Keep helper execution out of anonymous/public contexts.
revoke all on function public.protect_notification_owner_update() from public;
