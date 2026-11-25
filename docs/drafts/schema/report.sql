create table rules (
  id         smallint generated always as identity primary key,
  name       text not null,                 -- 'Uniform', 'ID card'
  is_active  boolean not null default true
);

create table reports (
  id               uuid primary key default gen_random_uuid(),
  reporter_id      text not null references "user"(id),
  rule_id          smallint not null references rules(id),
  subject_user_id  text references "user"(id),   -- nullable: reviewer fills it in
  subject_hint     text,                          -- what the reporter knows
  note             text,
  status           text not null default 'submitted'
                   check (status in ('submitted','under_review','verified','rejected','action_taken','closed')),
  reviewed_by      text references "user"(id),
  reviewed_at      timestamptz,
  resolution_note  text,
  delete_after     timestamptz,                   -- retention for images
  created_at       timestamptz not null default now()
);
create index on reports (status, created_at);

create table report_images (
  id           uuid primary key default gen_random_uuid(),
  report_id    uuid not null references reports(id) on delete cascade,
  storage_key  text not null                      -- private bucket key, never a public URL
);
