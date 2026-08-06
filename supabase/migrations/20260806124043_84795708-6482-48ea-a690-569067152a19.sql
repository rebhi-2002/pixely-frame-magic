-- Remove legacy demo modules; cascading foreign keys remove their obsolete pages and grants.
DELETE FROM public.modules
WHERE key IN ('home', 'administration', 'customers', 'services', 'finance', 'mail', 'expenses');

-- Remove legacy seed-only profiles that are not linked to an authenticated account.
DELETE FROM public.profiles WHERE user_id IS NULL;

-- Safely assign the least-privileged platform role to existing authenticated profiles without a role.
UPDATE public.profiles
SET role_id = (SELECT id FROM public.roles WHERE name = 'طالب' LIMIT 1)
WHERE user_id IS NOT NULL AND role_id IS NULL;

-- Remove the obsolete accountant role after linked demo profiles are gone.
DELETE FROM public.roles WHERE name IN ('محاسب', 'موظف استقبال');

-- Rebuild Academia role grants exactly from role spaces, eliminating accidental cross-role grants.
DELETE FROM public.role_permissions;

INSERT INTO public.role_permissions (role_id, page_id, permission_key)
SELECT r.id, p.id, pk.key
FROM public.roles r
JOIN public.modules m ON m.key = ANY (
  CASE r.name
    WHEN 'طالب'         THEN ARRAY['student','shared']
    WHEN 'معلم'         THEN ARRAY['teacher','shared']
    WHEN 'ولي أمر'      THEN ARRAY['parent','shared']
    WHEN 'مشرف أكاديمي' THEN ARRAY['supervisor','shared']
    WHEN 'مدير عام'     THEN ARRAY['student','teacher','supervisor','parent','platform','shared']
    ELSE ARRAY[]::text[]
  END
)
JOIN public.pages p ON p.module_id = m.id
CROSS JOIN public.permission_keys pk
ON CONFLICT DO NOTHING;

-- Keep the privilege role aligned with the platform role. Only General Managers are privileged admins.
DELETE FROM public.user_roles;
INSERT INTO public.user_roles (user_id, role)
SELECT p.user_id,
  CASE WHEN r.name = 'مدير عام' THEN 'admin'::public.app_role ELSE 'user'::public.app_role END
FROM public.profiles p
JOIN public.roles r ON r.id = p.role_id
WHERE p.user_id IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- Signup role mapping: the frontend sends requested_role; accept legacy role as a safe fallback.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  target_role uuid;
  is_first boolean;
  wanted text;
BEGIN
  SELECT NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') INTO is_first;
  wanted := COALESCE(
    NEW.raw_user_meta_data ->> 'requested_role',
    NEW.raw_user_meta_data ->> 'role',
    'student'
  );

  IF is_first THEN
    SELECT id INTO target_role FROM public.roles WHERE name = 'مدير عام' LIMIT 1;
  ELSE
    SELECT id INTO target_role
    FROM public.roles
    WHERE name = CASE wanted
      WHEN 'teacher' THEN 'معلم'
      WHEN 'parent' THEN 'ولي أمر'
      WHEN 'supervisor' THEN 'مشرف أكاديمي'
      WHEN 'admin' THEN 'مدير عام'
      ELSE 'طالب'
    END
    LIMIT 1;
  END IF;

  INSERT INTO public.profiles (user_id, full_name, email, role_id)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    target_role
  )
  ON CONFLICT (user_id) DO UPDATE
  SET full_name = EXCLUDED.full_name,
      email = EXCLUDED.email,
      role_id = COALESCE(public.profiles.role_id, EXCLUDED.role_id);

  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    CASE WHEN is_first OR wanted = 'admin'
      THEN 'admin'::public.app_role
      ELSE 'user'::public.app_role
    END
  )
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$function$;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM authenticated;