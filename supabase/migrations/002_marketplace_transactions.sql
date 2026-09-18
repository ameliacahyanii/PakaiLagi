create type public.payment_status as enum ('pending', 'paid', 'failed', 'refunded');
create type public.report_status as enum ('open', 'reviewing', 'resolved', 'dismissed');

create table public.conversations (
  id uuid primary key default uuid_generate_v4(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  seller_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (listing_id, buyer_id)
);

create table public.messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default uuid_generate_v4(),
  claim_id uuid not null unique references public.claims(id) on delete cascade,
  provider text not null default 'demo',
  provider_reference text,
  amount integer not null check (amount >= 0),
  status public.payment_status not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.handover_records (
  id uuid primary key default uuid_generate_v4(),
  claim_id uuid not null unique references public.claims(id) on delete cascade,
  code text not null unique,
  confirmed_by_buyer boolean not null default false,
  confirmed_by_seller boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default uuid_generate_v4(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  target_user_id uuid references public.profiles(id) on delete set null,
  listing_id uuid references public.listings(id) on delete set null,
  reason text not null,
  status public.report_status not null default 'open',
  created_at timestamptz not null default now()
);

alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.payments enable row level security;
alter table public.handover_records enable row level security;
alter table public.reports enable row level security;

create policy "participants read conversations" on public.conversations for select to authenticated using (buyer_id = auth.uid() or seller_id = auth.uid());
create policy "buyers create conversations" on public.conversations for insert to authenticated with check (buyer_id = auth.uid());
create policy "participants read messages" on public.messages for select to authenticated using (exists (select 1 from public.conversations where id = conversation_id and (buyer_id = auth.uid() or seller_id = auth.uid())));
create policy "participants send messages" on public.messages for insert to authenticated with check (sender_id = auth.uid() and exists (select 1 from public.conversations where id = conversation_id and (buyer_id = auth.uid() or seller_id = auth.uid())));
create policy "claimants read payments" on public.payments for select to authenticated using (exists (select 1 from public.claims where id = claim_id and claimant_id = auth.uid()));
create policy "claimants create payments" on public.payments for insert to authenticated with check (exists (select 1 from public.claims where id = claim_id and claimant_id = auth.uid()));
create policy "claimants read handovers" on public.handover_records for select to authenticated using (exists (select 1 from public.claims where id = claim_id and claimant_id = auth.uid()));
create policy "users create reports" on public.reports for insert to authenticated with check (reporter_id = auth.uid());
create policy "users read own reports" on public.reports for select to authenticated using (reporter_id = auth.uid());
