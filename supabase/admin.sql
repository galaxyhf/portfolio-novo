create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text not null,
  full_description text not null,
  techs text[] not null default '{}',
  github_url text,
  live_url text,
  cover_image text,
  images jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists projects_status_idx on public.projects (status);
create index if not exists projects_featured_idx on public.projects (featured);
create index if not exists projects_sort_order_idx on public.projects (sort_order);

alter table public.projects enable row level security;

drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects"
on public.projects
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Authenticated users can read all projects" on public.projects;
create policy "Authenticated users can read all projects"
on public.projects
for select
to authenticated
using (true);

drop policy if exists "Authenticated users can insert projects" on public.projects;
create policy "Authenticated users can insert projects"
on public.projects
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update projects" on public.projects;
create policy "Authenticated users can update projects"
on public.projects
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can delete projects" on public.projects;
create policy "Authenticated users can delete projects"
on public.projects
for delete
to authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can read project images" on storage.objects;
create policy "Public can read project images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'project-images');

drop policy if exists "Authenticated users can upload project images" on storage.objects;
create policy "Authenticated users can upload project images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'project-images');

drop policy if exists "Authenticated users can update project images" on storage.objects;
create policy "Authenticated users can update project images"
on storage.objects
for update
to authenticated
using (bucket_id = 'project-images')
with check (bucket_id = 'project-images');

drop policy if exists "Authenticated users can delete project images" on storage.objects;
create policy "Authenticated users can delete project images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'project-images');
