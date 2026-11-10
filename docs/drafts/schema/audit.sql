create table audit_logs (
  id           uuid primary key default gen_random_uuid(),
  actor_id     text references "user"(id),
  action       text not null,                     -- 'role.assign', 'report.verify'
  entity_type  text not null,
  entity_id    text,
  metadata     jsonb,
  created_at   timestamptz not null default now()
);