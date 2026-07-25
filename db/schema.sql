create extension if not exists "pgcrypto";

create table roles (
  role_id serial primary key,
  role_name varchar(50) unique not null
);

create table users (
  user_id uuid primary key default gen_random_uuid(),
  full_name varchar(100) not null,
  email varchar(255) unique not null,
  password_hash text not null,
  role_id int references roles(role_id),
  profile_image text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table categories (
  category_id serial primary key,
  name varchar(100) unique not null,
  description text
);

create table plants (
  plant_id serial primary key,
  scientific_name varchar(255) not null,
  common_name varchar(255) not null,
  family varchar(255),
  genus varchar(255),
  description text,
  medicinal_uses text,
  preparation text,
  dosage text,
  precautions text,
  side_effects text,
  habitat text,
  growing_conditions text,
  source_reference text,
  verified boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table plant_images (
  image_id serial primary key,
  plant_id int references plants(plant_id) on delete cascade,
  image_type varchar(50),
  image_url text not null,
  caption text,
  display_order int default 1
);

create table plant_categories (
  plant_id int references plants(plant_id) on delete cascade,
  category_id int references categories(category_id) on delete cascade,
  primary key(plant_id, category_id)
);

create table symptoms (
  symptom_id serial primary key,
  symptom_name varchar(100) unique not null,
  description text
);

create table plant_symptoms (
  plant_id int references plants(plant_id) on delete cascade,
  symptom_id int references symptoms(symptom_id) on delete cascade,
  effectiveness_note text,
  primary key(plant_id, symptom_id)
);

create table presentations (
  presentation_id serial primary key,
  symptom_id int references symptoms(symptom_id) on delete cascade,
  title varchar(255),
  description text
);

create table presentation_slides (
  slide_id serial primary key,
  presentation_id int references presentations(presentation_id) on delete cascade,
  slide_number int,
  image_url text not null
);

create table languages (
  language_id serial primary key,
  language_name varchar(100),
  language_code varchar(10)
);

create table plant_translations (
  translation_id serial primary key,
  plant_id int references plants(plant_id) on delete cascade,
  language_id int references languages(language_id),
  translated_name varchar(255),
  translated_description text,
  translated_uses text
);

create table favorites (
  favorite_id serial primary key,
  user_id uuid references users(user_id) on delete cascade,
  plant_id int references plants(plant_id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, plant_id)
);

create table contributions (
  contribution_id serial primary key,
  user_id uuid references users(user_id),
  plant_id int references plants(plant_id),
  contribution_type varchar(50),
  title varchar(255),
  content text,
  status varchar(30) default 'Pending',
  created_at timestamptz default now()
);

create table contribution_images (
  image_id serial primary key,
  contribution_id int references contributions(contribution_id) on delete cascade,
  image_url text
);

create table feedback (
  feedback_id serial primary key,
  user_id uuid references users(user_id),
  plant_id int references plants(plant_id),
  rating int check(rating between 1 and 5),
  comments text,
  created_at timestamptz default now()
);

create table search_history (
  search_id serial primary key,
  user_id uuid references users(user_id),
  query text,
  searched_at timestamptz default now()
);

create table analytics_events (
  event_id serial primary key,
  user_id uuid references users(user_id),
  event_type varchar(100),
  entity_type varchar(100),
  entity_id int,
  created_at timestamptz default now()
);

create table notifications (
  notification_id serial primary key,
  user_id uuid references users(user_id),
  title varchar(255),
  message text,
  is_read boolean default false,
  created_at timestamptz default now()
);

create table audit_logs (
  log_id serial primary key,
  user_id uuid references users(user_id),
  action varchar(255),
  table_name varchar(100),
  record_id varchar(100),
  created_at timestamptz default now()
);

create index idx_plants_common_name on plants(common_name);
create index idx_plants_scientific_name on plants(scientific_name);
create index idx_images_plant on plant_images(plant_id);

insert into roles(role_name) values
  ('Admin'),
  ('Moderator'),
  ('Contributor'),
  ('User')
on conflict (role_name) do nothing;

insert into languages(language_name, language_code) values
  ('English', 'en'),
  ('Hindi', 'hi')
on conflict do nothing;
