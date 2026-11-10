create table wallets (
  user_id        text primary key references "user"(id),
  balance_paise  bigint not null default 0 check (balance_paise >= 0),
  updated_at     timestamptz not null default now()
);

create table payments (                      -- online top-ups only
  id                  uuid primary key default gen_random_uuid(),
  user_id             text not null references "user"(id),
  gateway             text not null default 'razorpay',
  gateway_order_id    text not null unique,
  gateway_payment_id  text unique,          -- unique key makes webhooks idempotent
  amount_paise        bigint not null check (amount_paise > 0),
  status              text not null default 'pending'
                      check (status in ('pending','success','failed','refunded')),
  created_at          timestamptz not null default now()
);

create table wallet_entries (                -- immutable ledger
  id                   uuid primary key default gen_random_uuid(),
  user_id              text not null references wallets(user_id),
  kind                 text not null check (kind in ('topup','purchase','refund','adjustment')),
  amount_paise         bigint not null check (amount_paise <> 0),  -- + credit, - debit
  balance_after_paise  bigint not null,
  reference_type       text,                -- 'payment', 'order', 'manual'
  reference_id         uuid,
  idempotency_key      text not null unique,
  created_by           text references "user"(id),   -- set for manual adjustments
  created_at           timestamptz not null default now()
);
create index on wallet_entries (user_id, created_at desc);


-trasaction example-

begin;
update wallets
   set balance_paise = balance_paise - $amount, updated_at = now()
 where user_id = $user and balance_paise >= $amount
returning balance_paise;                     -- no row = insufficient funds, roll back

insert into wallet_entries
  (user_id, kind, amount_paise, balance_after_paise, reference_type, reference_id, idempotency_key)
values ($user, 'purchase', -$amount, $returned_balance, 'order', $order, $key);

update orders set payment_status = 'paid', status = 'placed' where id = $order;
commit;