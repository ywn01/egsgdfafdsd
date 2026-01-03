-- Create analytics table for tracking link clicks
create table if not exists public.link_visits (
  id uuid primary key default gen_random_uuid(),
  link_id uuid not null references public.links(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  visitor_country text,
  visitor_city text,
  referrer text,
  user_agent text,
  visited_at timestamptz default now()
);

-- Enable RLS
alter table public.link_visits enable row level security;

-- RLS Policies for link_visits
create policy "Link owners can view their link visits"
  on public.link_visits for select
  using (
    exists (
      select 1 from public.links
      where links.id = link_visits.link_id
      and links.user_id = auth.uid()
    )
  );

create policy "Anyone can insert link visits"
  on public.link_visits for insert
  with check (true);

-- Create indexes for analytics queries
create index if not exists link_visits_link_id_idx on public.link_visits(link_id);
create index if not exists link_visits_visited_at_idx on public.link_visits(visited_at desc);
create index if not exists link_visits_country_idx on public.link_visits(visitor_country);

-- Create view for link analytics
create or replace view public.link_analytics as
select
  l.id as link_id,
  l.user_id,
  l.title,
  l.url,
  count(lv.id) as total_clicks,
  count(distinct lv.visitor_country) as unique_countries,
  max(lv.visited_at) as last_clicked
from public.links l
left join public.link_visits lv on l.id = lv.link_id
group by l.id, l.user_id, l.title, l.url;
