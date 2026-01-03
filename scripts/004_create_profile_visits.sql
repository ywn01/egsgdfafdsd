-- Create profile visits table for tracking profile page views
create table if not exists public.profile_visits (
  id uuid primary key default gen_random_uuid(),
  profile_user_id uuid not null references auth.users(id) on delete cascade,
  visitor_country text,
  visitor_city text,
  referrer text,
  user_agent text,
  visited_at timestamptz default now()
);

-- Enable RLS
alter table public.profile_visits enable row level security;

-- RLS Policies
create policy "Profile owners can view their profile visits"
  on public.profile_visits for select
  using (auth.uid() = profile_user_id);

create policy "Anyone can insert profile visits"
  on public.profile_visits for insert
  with check (true);

-- Create indexes
create index if not exists profile_visits_user_id_idx on public.profile_visits(profile_user_id);
create index if not exists profile_visits_visited_at_idx on public.profile_visits(visited_at desc);
