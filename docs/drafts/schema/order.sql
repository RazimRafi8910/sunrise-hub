create table vendors (
  id    smallint generated always as identity primary key,
  name  text not null,
  type  text not null check (type in ('canteen','store'))
);

create table vendor_staff (
  user_id    text references "user"(id) on delete cascade,
  vendor_id  smallint references vendors(id) on delete cascade,
  primary key (user_id, vendor_id)
);

create table items (
  id            uuid primary key default gen_random_uuid(),
  vendor_id     smallint not null references vendors(id),
  name          text not null,
  category      text,
  price_paise   bigint not null check (price_paise >= 0),
  is_listed     boolean not null default true,    -- is listed in any of the meny
  is_active     boolean not null default true,    -- for deletion
  stock_qty     integer check (stock_qty >= 0),   -- null = not tracked
  listed_menu_id uuid references day_menu(id),
  avialable_time text,
  image_key     text
);

create table orders (
  id              uuid primary key default gen_random_uuid(),
  user_id         text not null references "user"(id),
  vendor_id       smallint not null references vendors(id),
  status          text not null default 'pending_payment'
                  check (status in ('pending_payment','placed','preparing','ready','completed','cancelled')),
  payment_method  text not null check (payment_method in ('wallet','cash')),
  payment_status  text not null default 'pending'
                  check (payment_status in ('pending','paid','refunded')),
  total_paise     bigint not null check (total_paise >= 0),
  pickup_code     text,
  placed_at       timestamptz not null default now()
);
create index on orders (vendor_id, status, placed_at);   -- staff queue
create index on orders (user_id, placed_at desc);        -- "my orders"

create table order_items (
  id                uuid primary key default gen_random_uuid(),
  order_id          uuid not null references orders(id) on delete cascade,
  item_id           uuid not null references items(id),
  name_snapshot     text not null,
  unit_price_paise  bigint not null,
  quantity          integer not null check (quantity > 0)
);

create table day_menu (
  id                uuid primary key default gen_random_uuid(),
  day_of_week       int not null unique check(day_of_week between 0 and 6),
  total_items       int not null

)
