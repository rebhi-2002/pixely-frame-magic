-- Enum for privilege roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- ============ modules ============
CREATE TABLE public.modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  name text NOT NULL,
  icon text NOT NULL DEFAULT 'Folder',
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.modules TO authenticated;
GRANT ALL ON public.modules TO service_role;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;

-- ============ pages ============
CREATE TABLE public.pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES public.pages(id) ON DELETE CASCADE,
  key text NOT NULL UNIQUE,
  name text NOT NULL,
  icon text NOT NULL DEFAULT 'Circle',
  path text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pages TO authenticated;
GRANT ALL ON public.pages TO service_role;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- ============ permission_keys ============
CREATE TABLE public.permission_keys (
  key text PRIMARY KEY,
  label text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0
);
GRANT SELECT ON public.permission_keys TO authenticated;
GRANT ALL ON public.permission_keys TO service_role;
ALTER TABLE public.permission_keys ENABLE ROW LEVEL SECURITY;

-- ============ roles (user types) ============
CREATE TABLE public.roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.roles TO authenticated;
GRANT ALL ON public.roles TO service_role;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;

-- ============ role_permissions ============
CREATE TABLE public.role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id uuid NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  page_id uuid NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  permission_key text NOT NULL REFERENCES public.permission_keys(key) ON DELETE CASCADE,
  UNIQUE (role_id, page_id, permission_key)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.role_permissions TO authenticated;
GRANT ALL ON public.role_permissions TO service_role;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- ============ profiles ============
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE,
  full_name text NOT NULL DEFAULT '',
  email text,
  phone text,
  gender text NOT NULL DEFAULT 'male',
  avatar_url text,
  is_active boolean NOT NULL DEFAULT true,
  role_id uuid REFERENCES public.roles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ============ user_roles ============
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- ============ policies ============
CREATE POLICY "read modules" ON public.modules FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin write modules" ON public.modules FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "read pages" ON public.pages FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin write pages" ON public.pages FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "read permission keys" ON public.permission_keys FOR SELECT TO authenticated USING (true);

CREATE POLICY "read roles" ON public.roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin write roles" ON public.roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "read role permissions" ON public.role_permissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin write role permissions" ON public.role_permissions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "read profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "update own profile" ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "admin write profiles" ON public.profiles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ============ triggers ============
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER modules_touch BEFORE UPDATE ON public.modules
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER profiles_touch BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE default_role uuid;
BEGIN
  SELECT id INTO default_role FROM public.roles WHERE name = 'مدير عام' LIMIT 1;
  INSERT INTO public.profiles (user_id, full_name, email, role_id)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    default_role
  )
  ON CONFLICT (user_id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ seed ============
INSERT INTO public.permission_keys (key, label, sort_order) VALUES
  ('view_list', 'عرض بيانات الجدول', 1),
  ('show_add_form', 'عرض واجهة الإضافة', 2),
  ('execute_add', 'تنفيذ الإضافة', 3),
  ('edit', 'تعديل', 4),
  ('delete', 'حذف', 5),
  ('view_profile', 'عرض الملف الشخصي', 6),
  ('edit_profile', 'تعديل الملف الشخصي', 7),
  ('show_password_form', 'عرض واجهة تغيير كلمة المرور', 8),
  ('change_password', 'تنفيذ تغيير كلمة المرور', 9);

INSERT INTO public.modules (key, name, icon, sort_order) VALUES
  ('home', 'الرئيسية', 'Home', 1),
  ('administration', 'الإدارة', 'ShieldCheck', 2),
  ('customers', 'إدارة العملاء', 'Users', 3),
  ('services', 'إدارة الخدمات', 'Wrench', 4),
  ('finance', 'المالية', 'Wallet', 5),
  ('mail', 'البريد', 'Mail', 6),
  ('expenses', 'المصروفات', 'Receipt', 7);

INSERT INTO public.pages (module_id, parent_id, key, name, icon, path, sort_order)
SELECT m.id, NULL, 'dashboard', 'لوحة المعلومات', 'LayoutDashboard', '/dashboard', 1 FROM public.modules m WHERE m.key = 'home';

INSERT INTO public.pages (module_id, parent_id, key, name, icon, path, sort_order)
SELECT m.id, NULL, 'system_modules', 'وحدات النظام', 'ToggleRight', '/system-modules', 1 FROM public.modules m WHERE m.key = 'administration';

INSERT INTO public.pages (module_id, parent_id, key, name, icon, path, sort_order)
SELECT m.id, NULL, 'user_management', 'إدارة المستخدمين', 'UsersRound', NULL, 2 FROM public.modules m WHERE m.key = 'administration';

INSERT INTO public.pages (module_id, parent_id, key, name, icon, path, sort_order)
SELECT p.module_id, p.id, 'user_types', 'أنواع المستخدمين', 'IdCard', '/user-types', 1 FROM public.pages p WHERE p.key = 'user_management';

INSERT INTO public.pages (module_id, parent_id, key, name, icon, path, sort_order)
SELECT p.module_id, p.id, 'users', 'المستخدمين', 'User', '/users', 2 FROM public.pages p WHERE p.key = 'user_management';

INSERT INTO public.pages (module_id, parent_id, key, name, icon, path, sort_order)
SELECT m.id, NULL, 'customers_list', 'العملاء', 'Contact', '/customers', 1 FROM public.modules m WHERE m.key = 'customers';
INSERT INTO public.pages (module_id, parent_id, key, name, icon, path, sort_order)
SELECT m.id, NULL, 'services_list', 'الخدمات', 'ListChecks', '/services', 1 FROM public.modules m WHERE m.key = 'services';
INSERT INTO public.pages (module_id, parent_id, key, name, icon, path, sort_order)
SELECT m.id, NULL, 'invoices', 'الفواتير', 'FileText', '/invoices', 1 FROM public.modules m WHERE m.key = 'finance';
INSERT INTO public.pages (module_id, parent_id, key, name, icon, path, sort_order)
SELECT m.id, NULL, 'payments', 'المدفوعات', 'CreditCard', '/payments', 2 FROM public.modules m WHERE m.key = 'finance';
INSERT INTO public.pages (module_id, parent_id, key, name, icon, path, sort_order)
SELECT m.id, NULL, 'inbox', 'صندوق الوارد', 'Inbox', '/inbox', 1 FROM public.modules m WHERE m.key = 'mail';
INSERT INTO public.pages (module_id, parent_id, key, name, icon, path, sort_order)
SELECT m.id, NULL, 'expenses_list', 'المصروفات', 'Coins', '/expenses', 1 FROM public.modules m WHERE m.key = 'expenses';

INSERT INTO public.roles (name, description) VALUES
  ('مدير عام', 'صلاحيات كاملة على النظام'),
  ('محاسب', 'صلاحيات القسم المالي'),
  ('موظف استقبال', 'صلاحيات محدودة');

-- super admin gets everything
INSERT INTO public.role_permissions (role_id, page_id, permission_key)
SELECT r.id, p.id, k.key
FROM public.roles r CROSS JOIN public.pages p CROSS JOIN public.permission_keys k
WHERE r.name = 'مدير عام';

-- accountant: finance pages, view + add
INSERT INTO public.role_permissions (role_id, page_id, permission_key)
SELECT r.id, p.id, k.key
FROM public.roles r
JOIN public.pages p ON p.key IN ('invoices', 'payments', 'expenses_list', 'dashboard')
CROSS JOIN public.permission_keys k
WHERE r.name = 'محاسب' AND k.key IN ('view_list', 'show_add_form', 'execute_add', 'edit');

-- receptionist: customers + dashboard, view only
INSERT INTO public.role_permissions (role_id, page_id, permission_key)
SELECT r.id, p.id, 'view_list'
FROM public.roles r
JOIN public.pages p ON p.key IN ('customers_list', 'dashboard')
WHERE r.name = 'موظف استقبال';

INSERT INTO public.profiles (full_name, email, phone, gender, is_active, role_id)
SELECT 'أحمد الشريف', 'ahmad@example.com', '0790000001', 'male', true, id FROM public.roles WHERE name = 'مدير عام';
INSERT INTO public.profiles (full_name, email, phone, gender, is_active, role_id)
SELECT 'سارة القاسم', 'sara@example.com', '0790000002', 'female', true, id FROM public.roles WHERE name = 'محاسب';
INSERT INTO public.profiles (full_name, email, phone, gender, is_active, role_id)
SELECT 'خالد منصور', 'khaled@example.com', '0790000003', 'male', false, id FROM public.roles WHERE name = 'موظف استقبال';
INSERT INTO public.profiles (full_name, email, phone, gender, is_active, role_id)
SELECT 'ليلى حسن', 'laila@example.com', '0790000004', 'female', true, id FROM public.roles WHERE name = 'محاسب';