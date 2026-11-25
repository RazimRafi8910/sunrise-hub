create table profiles (
  user_id        text primary key references "user"(id) on delete cascade,
  full_name      text not null,
  college_id_no  text not null unique,      -- admission or staff number
  email          text not null unique,
  password_hash  text not null,
  role           text not null default "student",
  course         text not null,
  class_year     text not null,
  department     text not null in ('BCA','BBA','BCOM'),
  is_active      boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create table roles (
  id    smallint generated always as identity primary key,
  name  text not null unique                -- student, faculty, staff, admin
);

create table permissions (
  id    smallint generated always as identity primary key,
  key   text not null unique                -- 'report:review', 'order:mark_paid'
);

create table role_permissions (
  role_id        smallint references roles(id) on delete cascade,
  permission_id  smallint references permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

create table user_roles (
  user_id  text references "user"(id) on delete cascade,
  role_id  smallint references roles(id) on delete cascade,
  primary key (user_id, role_id)
);
