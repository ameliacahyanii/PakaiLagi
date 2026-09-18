create extension if not exists "uuid-ossp";

create type public.app_role as enum ('user', 'admin', 'partner');
create type public.item_status as enum ('draft', 'analyzing', 'listed', 'claimed', 'handed_over', 'archived');
create type public.circular_action as enum ('sell', 'swap', 'donate', 'repair', 'parts', 'recycle');
create type public.claim_status as enum ('pending', 'accepted', 'handover_scheduled', 'completed', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  role public.app_role not null default 'user',
  city text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.items (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  title text,
  category text not null,
  description text,
  status public.item_status not null default 'draft',
  selected_action public.circular_action,
  condition_score smallint check (condition_score between 0 and 100),
  weight_kg numeric(8, 2) check (weight_kg is null or weight_kg >= 0),
  location_city text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.item_images (
  id uuid primary key default uuid_generate_v4(),
  item_id uuid not null references public.items(id) on delete cascade,
  storage_path text not null,
  sort_order smallint not null default 0,
  created_at timestamptz not null default now()
);

create table public.item_inspections (
  id uuid primary key default uuid_generate_v4(),
  item_id uuid not null references public.items(id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  function_score smallint check (function_score between 0 and 100),
  physical_score smallint check (physical_score between 0 and 100),
  completeness_score smallint check (completeness_score between 0 and 100),
  age_score smallint check (age_score between 0 and 100),
  repair_history_score smallint check (repair_history_score between 0 and 100),
  created_at timestamptz not null default now()
);

create table public.ai_analyses (
  id uuid primary key default uuid_generate_v4(),
  item_id uuid not null references public.items(id) on delete cascade,
  provider text not null default 'demo-rules',
  model text,
  result jsonb not null default '{}'::jsonb,
  confidence numeric(5, 4),
  created_at timestamptz not null default now()
);

create table public.recommendations (
  id uuid primary key default uuid_generate_v4(),
  item_id uuid not null references public.items(id) on delete cascade,
  action public.circular_action not null,
  suitability_score smallint not null check (suitability_score between 0 and 100),
  reason text not null,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.listings (
  id uuid primary key default uuid_generate_v4(),
  item_id uuid not null unique references public.items(id) on delete cascade,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  asking_price integer check (asking_price is null or asking_price >= 0),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.claims (
  id uuid primary key default uuid_generate_v4(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  claimant_id uuid not null references public.profiles(id) on delete cascade,
  status public.claim_status not null default 'pending',
  scheduled_at timestamptz,
  handover_code text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.impact_records (
  id uuid primary key default uuid_generate_v4(),
  item_id uuid not null unique references public.items(id) on delete cascade,
  action public.circular_action not null,
  weight_kg numeric(8, 2) check (weight_kg is null or weight_kg >= 0),
  completed_at timestamptz not null default now(),
  notes text
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.email));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.items enable row level security;
alter table public.item_images enable row level security;
alter table public.item_inspections enable row level security;
alter table public.ai_analyses enable row level security;
alter table public.recommendations enable row level security;
alter table public.listings enable row level security;
alter table public.claims enable row level security;
alter table public.impact_records enable row level security;

create policy "profiles are public to signed in users" on public.profiles for select to authenticated using (true);
create policy "users update their profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "users manage their items" on public.items for all to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "published items are discoverable" on public.items for select to anon, authenticated using (status in ('listed', 'claimed', 'handed_over'));
create policy "owners manage item images" on public.item_images for all to authenticated using (exists (select 1 from public.items where id = item_id and owner_id = auth.uid())) with check (exists (select 1 from public.items where id = item_id and owner_id = auth.uid()));
create policy "owners manage inspections" on public.item_inspections for all to authenticated using (exists (select 1 from public.items where id = item_id and owner_id = auth.uid())) with check (exists (select 1 from public.items where id = item_id and owner_id = auth.uid()));
create policy "owners read analyses" on public.ai_analyses for select to authenticated using (exists (select 1 from public.items where id = item_id and owner_id = auth.uid()));
create policy "owners read recommendations" on public.recommendations for select to authenticated using (exists (select 1 from public.items where id = item_id and owner_id = auth.uid()));
create policy "published listings are discoverable" on public.listings for select to anon, authenticated using (is_published = true);
create policy "owners manage listings" on public.listings for all to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "users manage their claims" on public.claims for all to authenticated using (auth.uid() = claimant_id or exists (select 1 from public.listings where id = listing_id and owner_id = auth.uid())) with check (auth.uid() = claimant_id or exists (select 1 from public.listings where id = listing_id and owner_id = auth.uid()));
create policy "users read impact for their items" on public.impact_records for select to authenticated using (exists (select 1 from public.items where id = item_id and owner_id = auth.uid()));
create policy "admins manage all items" on public.items for all to authenticated using (exists (select 1 from public.profiles admin_profile where admin_profile.id = auth.uid() and admin_profile.role = 'admin')) with check (exists (select 1 from public.profiles admin_profile where admin_profile.id = auth.uid() and admin_profile.role = 'admin'));
create policy "admins manage all listings" on public.listings for all to authenticated using (exists (select 1 from public.profiles admin_profile where admin_profile.id = auth.uid() and admin_profile.role = 'admin')) with check (exists (select 1 from public.profiles admin_profile where admin_profile.id = auth.uid() and admin_profile.role = 'admin'));
create policy "admins manage all claims" on public.claims for all to authenticated using (exists (select 1 from public.profiles admin_profile where admin_profile.id = auth.uid() and admin_profile.role = 'admin')) with check (exists (select 1 from public.profiles admin_profile where admin_profile.id = auth.uid() and admin_profile.role = 'admin'));

insert into storage.buckets (id, name, public) values ('item-images', 'item-images', true) on conflict (id) do nothing;
create policy "item images are public" on storage.objects for select using (bucket_id = 'item-images');
create policy "users upload item images" on storage.objects for insert to authenticated with check (bucket_id = 'item-images' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "users delete their item images" on storage.objects for delete to authenticated using (bucket_id = 'item-images' and (storage.foldername(name))[1] = auth.uid()::text);
