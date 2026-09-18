-- Run this only after creating the admin account in Supabase Dashboard:
-- Authentication > Users > Add user.
-- Replace the email below, then run this file in the SQL Editor.

insert into public.profiles (id, display_name, role)
select id, coalesce(raw_user_meta_data ->> 'full_name', email), 'admin'::public.app_role
from auth.users
where email = 'admin@example.com'
on conflict (id) do update set role = 'admin'::public.app_role;

-- New public registrations remain role 'user' because the trigger default is user.