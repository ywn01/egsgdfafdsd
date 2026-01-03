-- Create links table for user's link-in-bio links
create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  url text not null,
  description text,
  icon text,
  position integer not null default 0,
  is_active boolean default true,
  clicks integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint url_format check (url ~ '^https?://')
);

-- Enable RLS
alter table public.links enable row level security;

-- RLS Policies for links
create policy "Links are viewable by everyone if user profile exists"
  on public.links for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = links.user_id
    )
  );

create policy "Users can insert their own links"
  on public.links for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own links"
  on public.links for update
  using (auth.uid() = user_id);

create policy "Users can delete their own links"
  on public.links for delete
  using (auth.uid() = user_id);

-- Create indexes
create index if not exists links_user_id_idx on public.links(user_id);
create index if not exists links_position_idx on public.links(position);
