-- ==============================================================================
-- STUDENT PLACEMENT PREDICTION PLATFORM — SUPABASE AUTH & RLS SCHEMA
-- ==============================================================================
-- This schema configures:
-- 1. User Profiles table linked to Supabase auth.users
-- 2. Role-Based Access Control (Student, Faculty Mentor, T&P Officer)
-- 3. Row Level Security (RLS) policies enforcing data boundaries
-- 4. Protected Faculty Registration trigger preventing unauthorized role selection
-- 5. Academic & Placement management tables with fine-grained permissions
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES TABLE (Linked to auth.users)
-- ------------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text unique not null,
  role text not null default 'student' check (role in ('student', 'faculty', 'officer')),
  full_name text not null,
  roll_no text,
  department text default 'CSE',
  phone text,
  current_year text default '4th Year',
  cgpa numeric(3, 2) default 7.50,
  backlogs integer default 0,
  aptitude_score integer default 75,
  technical_score integer default 80,
  resume_score integer default 82,
  placement_probability integer default 78,
  placement_status text default 'In Process' check (placement_status in ('In Process', 'Placement Ready', 'Placed', 'At Risk')),
  placed_company text,
  placed_package numeric(4, 2),
  mentor_id uuid references public.profiles(id) on delete set null,
  avatar_url text,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Index frequently queried columns
create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_profiles_email on public.profiles(email);
create index if not exists idx_profiles_mentor_id on public.profiles(mentor_id);

-- Enable RLS
alter table public.profiles enable row level security;

-- ------------------------------------------------------------------------------
-- 2. ROW LEVEL SECURITY (RLS) POLICIES FOR PROFILES
-- ------------------------------------------------------------------------------

-- Policy: Users can view their own profile
create policy "Profiles: users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Policy: Faculty mentors can view assigned mentees and all students
create policy "Profiles: faculty can view students"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'faculty'
    )
    and role = 'student'
  );

-- Policy: T&P Officers have full visibility over all profiles
create policy "Profiles: officers can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'officer'
    )
  );

-- Policy: Users can update their own profile, but CANNOT self-escalate their role
create policy "Profiles: users can update own profile except role"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    -- Ensure the user cannot change their assigned role
    and role = (select p.role from public.profiles p where p.id = auth.uid())
  );

-- Policy: Only T&P Officers can update roles
create policy "Profiles: officers can update any profile and roles"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'officer'
    )
  );

-- ------------------------------------------------------------------------------
-- 3. AUTOMATIC PROFILE CREATION & FACULTY ROLE ENFORCEMENT TRIGGER
-- ------------------------------------------------------------------------------
-- When a new user registers through Supabase Auth, this trigger automatically
-- populates public.profiles. It strictly validates whether the user is authorized
-- to receive the 'faculty' or 'officer' role by checking the institutional key.
-- Regular users attempting to choose 'faculty' or 'officer' without the key are
-- automatically downgraded to 'student'.
-- ------------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger as $$
declare
  requested_role text;
  faculty_passcode text;
  assigned_role text;
  institutional_valid boolean := false;
begin
  requested_role := lower(coalesce(new.raw_user_meta_data->>'role', 'student'));
  faculty_passcode := new.raw_user_meta_data->>'faculty_key';

  -- Check validity of institutional passcode for privileged roles
  if faculty_passcode in ('FACULTY2026', 'CAMPUS-FACULTY-2026', 'TPO-ADMIN-2026') then
    institutional_valid := true;
  end if;

  -- Role assignment security enforcement:
  if requested_role in ('faculty', 'officer') then
    if institutional_valid then
      assigned_role := requested_role;
    else
      -- Security protection: Downgrade unauthorized faculty registration to student
      assigned_role := 'student';
    end if;
  else
    assigned_role := 'student';
  end if;

  -- Insert profile record
  insert into public.profiles (
    id,
    email,
    role,
    full_name,
    roll_no,
    department,
    current_year,
    cgpa,
    backlogs,
    placement_probability,
    placement_status
  ) values (
    new.id,
    new.email,
    assigned_role,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'roll_no',
    coalesce(new.raw_user_meta_data->>'department', 'CSE'),
    '4th Year (Class of 2026)',
    coalesce((new.raw_user_meta_data->>'cgpa')::numeric, 7.50),
    coalesce((new.raw_user_meta_data->>'backlogs')::integer, 0),
    coalesce((new.raw_user_meta_data->>'placement_probability')::integer, 78),
    'In Process'
  );

  return new;
end;
$$ language plpgsql security definer;

-- Bind trigger to auth.users table
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 4. PLACEMENT DRIVES TABLE (T&P Officer managed)
-- ------------------------------------------------------------------------------
create table if not exists public.placement_drives (
  id uuid default uuid_generate_v4() primary key,
  company_name text not null,
  role_title text not null,
  package_lpa numeric(4, 2) not null,
  min_cgpa numeric(3, 2) default 6.50,
  max_backlogs integer default 0,
  allowed_branches text[] default array['CSE', 'IT'],
  deadline date not null,
  openings integer default 10,
  status text default 'Active' check (status in ('Active', 'Upcoming', 'Closed')),
  created_by uuid references public.profiles(id),
  created_at timestamptz default timezone('utc'::text, now()) not null
);

alter table public.placement_drives enable row level security;

-- Policy: Everyone authenticated can view drives
create policy "Drives: all authenticated users can view drives"
  on public.placement_drives for select
  using (auth.role() = 'authenticated');

-- Policy: Only Officers can insert/update/delete drives
create policy "Drives: officers can manage drives"
  on public.placement_drives for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'officer'
    )
  );

-- ------------------------------------------------------------------------------
-- 5. STUDENT APPLICATIONS TABLE
-- ------------------------------------------------------------------------------
create table if not exists public.student_applications (
  id uuid default uuid_generate_v4() primary key,
  drive_id uuid references public.placement_drives(id) on delete cascade not null,
  student_id uuid references public.profiles(id) on delete cascade not null,
  status text default 'Applied' check (status in ('Applied', 'Shortlisted', 'Interview Scheduled', 'Offered', 'Rejected')),
  applied_date timestamptz default timezone('utc'::text, now()) not null,
  notes text,
  unique (drive_id, student_id)
);

alter table public.student_applications enable row level security;

-- Policy: Students can view and insert their own applications
create policy "Applications: students view own applications"
  on public.student_applications for select
  using (student_id = auth.uid());

create policy "Applications: students apply to drives"
  on public.student_applications for insert
  with check (student_id = auth.uid());

-- Policy: Officers and Faculty can view applications
create policy "Applications: faculty and officers view applications"
  on public.student_applications for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role in ('officer', 'faculty')
    )
  );

-- Policy: Officers can update application statuses
create policy "Applications: officers update status"
  on public.student_applications for update
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'officer'
    )
  );

-- ------------------------------------------------------------------------------
-- 6. MENTORING TASKS TABLE
-- ------------------------------------------------------------------------------
create table if not exists public.mentor_tasks (
  id uuid default uuid_generate_v4() primary key,
  mentor_id uuid references public.profiles(id) on delete cascade not null,
  student_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  due_date date not null,
  priority text default 'Medium' check (priority in ('High', 'Medium', 'Low')),
  status text default 'Pending' check (status in ('Pending', 'Completed')),
  notes text,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

alter table public.mentor_tasks enable row level security;

-- Policy: Students can view their tasks and mark them completed
create policy "Tasks: students view assigned tasks"
  on public.mentor_tasks for select
  using (student_id = auth.uid());

create policy "Tasks: students update task status"
  on public.mentor_tasks for update
  using (student_id = auth.uid())
  with check (student_id = auth.uid());

-- Policy: Faculty can manage their assigned tasks
create policy "Tasks: faculty manage tasks"
  on public.mentor_tasks for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'faculty'
    )
  );
