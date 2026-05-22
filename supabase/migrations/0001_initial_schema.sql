-- Profiles
create table profiles (
  id uuid references auth.users on delete cascade,
  email text,
  nom text,
  created_at timestamp default now(),
  primary key (id)
);

-- Situations VAE
create table situations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  titre text not null,
  structure text,
  description text,
  blocs text[],
  ai_result text,
  created_at timestamp default now()
);

-- Écrits
create table ecrits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  type text,
  input text,
  output text,
  created_at timestamp default now()
);

-- RLS
alter table profiles enable row level security;
alter table situations enable row level security;
alter table ecrits enable row level security;

create policy "Users can manage their own profile"
  on profiles for all using (auth.uid() = id);

create policy "Users can manage their own situations"
  on situations for all using (auth.uid() = user_id);

create policy "Users can manage their own ecrits"
  on ecrits for all using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
