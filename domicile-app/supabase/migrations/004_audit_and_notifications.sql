-- DŌMICILE V1 — automatic property history and notifications
-- Apply after migrations 001–003.

create or replace function public.log_case_activity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.activity_logs (
      actor_id, property_id, entity_type, entity_id, action, metadata
    ) values (
      coalesce(auth.uid(), new.opened_by),
      new.property_id,
      'case',
      new.id,
      'case.created',
      jsonb_build_object(
        'reference', new.reference,
        'title', new.title,
        'status', new.status,
        'urgency', new.urgency
      )
    );
  elsif tg_op = 'UPDATE' and new.status is distinct from old.status then
    insert into public.activity_logs (
      actor_id, property_id, entity_type, entity_id, action, metadata
    ) values (
      auth.uid(),
      new.property_id,
      'case',
      new.id,
      'case.status_changed',
      jsonb_build_object(
        'reference', new.reference,
        'from', old.status,
        'to', new.status
      )
    );
  end if;
  return new;
end;
$$;

drop trigger if exists cases_activity_insert on public.cases;
create trigger cases_activity_insert
after insert on public.cases
for each row execute function public.log_case_activity();

drop trigger if exists cases_activity_update on public.cases;
create trigger cases_activity_update
after update on public.cases
for each row execute function public.log_case_activity();

create or replace function public.notify_case_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status is not distinct from old.status then
    return new;
  end if;

  insert into public.notifications (user_id, property_id, case_id, title, body, kind)
  select
    pm.user_id,
    new.property_id,
    new.id,
    'Property request updated',
    new.reference || ' — ' || new.title || ' is now ' || replace(new.status::text, '_', ' ') || '.',
    'case_status'
  from public.property_members pm
  where pm.property_id = new.property_id
    and pm.user_id is distinct from auth.uid();

  return new;
end;
$$;

drop trigger if exists cases_notify_status on public.cases;
create trigger cases_notify_status
after update on public.cases
for each row execute function public.notify_case_status_change();

create or replace function public.notify_visible_case_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_property uuid;
  case_reference text;
  case_title text;
begin
  if not new.visible_to_owner then
    return new;
  end if;

  select c.property_id, c.reference, c.title
  into target_property, case_reference, case_title
  from public.cases c
  where c.id = new.case_id;

  insert into public.notifications (user_id, property_id, case_id, title, body, kind)
  select
    pm.user_id,
    target_property,
    new.case_id,
    'New DŌMICILE update',
    case_reference || ' — ' || case_title || ': ' || left(new.body, 180),
    'case_update'
  from public.property_members pm
  where pm.property_id = target_property
    and pm.user_id is distinct from new.author_id;

  return new;
end;
$$;

drop trigger if exists case_updates_notify_owner on public.case_updates;
create trigger case_updates_notify_owner
after insert on public.case_updates
for each row execute function public.notify_visible_case_update();

create or replace function public.log_and_notify_approval()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_property uuid;
  case_reference text;
begin
  select c.property_id, c.reference
  into target_property, case_reference
  from public.cases c
  where c.id = new.case_id;

  if tg_op = 'INSERT' then
    insert into public.activity_logs (
      actor_id, property_id, entity_type, entity_id, action, metadata
    ) values (
      coalesce(auth.uid(), new.requested_by),
      target_property,
      'approval',
      new.id,
      'approval.requested',
      jsonb_build_object(
        'case_reference', case_reference,
        'amount_rwf', new.amount_rwf,
        'status', new.status
      )
    );

    insert into public.notifications (
      user_id, property_id, case_id, title, body, kind
    ) values (
      new.requested_for,
      target_property,
      new.case_id,
      'Approval required',
      case_reference || ' requires your approval' ||
        case when new.amount_rwf is null then '.' else ' — RWF ' || trim(to_char(new.amount_rwf, 'FM999,999,999,990')) || '.' end,
      'approval'
    );

  elsif tg_op = 'UPDATE' and new.status is distinct from old.status then
    insert into public.activity_logs (
      actor_id, property_id, entity_type, entity_id, action, metadata
    ) values (
      auth.uid(),
      target_property,
      'approval',
      new.id,
      'approval.responded',
      jsonb_build_object(
        'case_reference', case_reference,
        'from', old.status,
        'to', new.status,
        'owner_note', new.owner_note
      )
    );

    if new.requested_by is distinct from auth.uid() then
      insert into public.notifications (
        user_id, property_id, case_id, title, body, kind
      ) values (
        new.requested_by,
        target_property,
        new.case_id,
        'Owner responded to approval',
        case_reference || ' approval response: ' || replace(new.status::text, '_', ' ') || '.',
        'approval_response'
      );
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists approvals_activity_insert on public.approvals;
create trigger approvals_activity_insert
after insert on public.approvals
for each row execute function public.log_and_notify_approval();

drop trigger if exists approvals_activity_update on public.approvals;
create trigger approvals_activity_update
after update on public.approvals
for each row execute function public.log_and_notify_approval();

create or replace function public.log_work_order_activity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.activity_logs (
      actor_id, property_id, entity_type, entity_id, action, metadata
    ) values (
      coalesce(auth.uid(), new.created_by),
      new.property_id,
      'work_order',
      new.id,
      'work_order.created',
      jsonb_build_object('reference', new.reference, 'status', new.status)
    );
  elsif tg_op = 'UPDATE' and new.status is distinct from old.status then
    insert into public.activity_logs (
      actor_id, property_id, entity_type, entity_id, action, metadata
    ) values (
      auth.uid(),
      new.property_id,
      'work_order',
      new.id,
      'work_order.status_changed',
      jsonb_build_object('reference', new.reference, 'from', old.status, 'to', new.status)
    );
  end if;
  return new;
end;
$$;

drop trigger if exists work_orders_activity_insert on public.work_orders;
create trigger work_orders_activity_insert
after insert on public.work_orders
for each row execute function public.log_work_order_activity();

drop trigger if exists work_orders_activity_update on public.work_orders;
create trigger work_orders_activity_update
after update on public.work_orders
for each row execute function public.log_work_order_activity();
