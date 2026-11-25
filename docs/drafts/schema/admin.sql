CREATE TYPE admin_role AS ENUM ('super_admin','moderator','staff');
CREATE TYPE admin_scope as ENUM ('canteen','event','store','report');
-- all : super admin (removes permission checking)
CREATE TYPE permission as ENUM ('manger','viewer'); --manager: all the create read update, viewer:only viewer dashboard

CREATE TABLE admins (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references Users(id) on delete cascade,
  email             text not null unique,
  password          text not null
  role              admin_role not null default 'moderator',
)



CREATE TABLE permissions (
  id                uuid primary key default gen_random_uuid(),
  admin_id          uuid not null references admins(id) on delete cascade,
  admin_scope       admin_scope not null default 'none',
  permission        permission not null default 'viewer',
)
