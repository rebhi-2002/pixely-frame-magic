
-- 1) Roles for the Academia platform
INSERT INTO public.roles (name, description) VALUES
  ('مدير عام', 'صلاحيات كاملة على المنصة'),
  ('مشرف أكاديمي', 'متابعة المعلمين والطلاب والتقارير'),
  ('معلم', 'إدارة المحتوى والاختبارات والطلاب'),
  ('ولي أمر', 'متابعة تقارير الأبناء'),
  ('طالب', 'مساحة الطالب: مكتبة، إنجاز، امتحانات')
ON CONFLICT DO NOTHING;

DELETE FROM public.roles WHERE name = 'موظف استقبال';

-- 2) Modules for each role space
INSERT INTO public.modules (key, name, icon, enabled, sort_order) VALUES
  ('student',    'مساحة الطالب',        'GraduationCap',  true, 10),
  ('teacher',    'مساحة المعلم',        'Presentation',   true, 20),
  ('supervisor', 'الإشراف الأكاديمي',   'ClipboardCheck', true, 30),
  ('parent',     'مساحة ولي الأمر',     'Users',          true, 40),
  ('platform',   'إدارة المنصة',        'Shield',         true, 50),
  ('shared',     'عام',                 'Bell',           true, 60)
ON CONFLICT (key) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon, sort_order = EXCLUDED.sort_order;

-- 3) Pages
INSERT INTO public.pages (module_id, key, name, icon, path, sort_order)
SELECT m.id, v.key, v.name, v.icon, v.path, v.sort_order
FROM (VALUES
  ('student','student_dashboard','لوحة الطالب','LayoutDashboard','/dashboard',1),
  ('student','student_library','المكتبة','Library','/library',2),
  ('student','student_mistakes','بنك الأخطاء','XCircle','/mistakes-bank',3),
  ('student','student_flashcards','البطاقات','Layers','/flashcards',4),
  ('student','student_exam','محاكي الامتحان','Timer','/exam-simulator',5),
  ('student','student_community','المجتمع','MessagesSquare','/community',6),
  ('student','student_schedule','الجدول','CalendarDays','/schedule',7),
  ('student','student_achievements','الإنجاز','Trophy','/achievements',8),
  ('student','student_bookmarks','المحفوظات','Bookmark','/bookmarks',9),
  ('student','student_my_courses','كورساتي','BookOpenCheck','/my-courses',10),
  ('student','student_certificates','شهاداتي','Award','/my-certificates',11),
  ('student','student_referrals','الإحالات','Gift','/referrals',12),
  ('teacher','teacher_dashboard','لوحة المعلم','LayoutDashboard','/teacher/dashboard',1),
  ('teacher','teacher_content','المحتوى','FileStack','/teacher/content',2),
  ('teacher','teacher_quizzes','الاختبارات','ListChecks','/teacher/quizzes',3),
  ('teacher','teacher_grading','التصحيح','PenSquare','/teacher/grading',4),
  ('teacher','teacher_analytics','التحليلات','LineChart','/teacher/analytics',5),
  ('teacher','teacher_community','مجتمع الصف','MessagesSquare','/teacher/community',6),
  ('teacher','teacher_courses','كورساتي','BookOpenCheck','/teacher/courses',7),
  ('teacher','teacher_earnings','الأرباح','Wallet','/teacher/earnings',8),
  ('teacher','teacher_profile_edit','ملفي العام','UserCog','/teacher/profile/edit',9),
  ('teacher','teacher_settings','إعدادات المعلم','Settings','/teacher/settings',10),
  ('supervisor','supervisor_dashboard','لوحة الإشراف','LayoutDashboard','/supervisor/dashboard',1),
  ('supervisor','supervisor_teachers','المعلمون','Presentation','/supervisor/teachers',2),
  ('supervisor','supervisor_students','نظرة الطلاب','Users','/supervisor/students-overview',3),
  ('supervisor','supervisor_reports','التقارير','FileBarChart','/supervisor/reports',4),
  ('parent','parent_report','تقرير الابن','FileBarChart','/parent/report',1),
  ('parent','parent_settings','إعدادات ولي الأمر','Settings','/parent/settings',2),
  ('platform','admin_dashboard','لوحة الإدارة','LayoutDashboard','/admin/dashboard',1),
  ('platform','admin_teachers','توثيق المعلمين','BadgeCheck','/admin/teachers',2),
  ('platform','admin_content_review','مراجعة المحتوى','FileSearch','/admin/content-review',3),
  ('platform','admin_community_reports','بلاغات المجتمع','Flag','/admin/community-reports',4),
  ('platform','admin_users','المستخدمون','Users2','/admin/users',5),
  ('platform','admin_payments','المدفوعات','CreditCard','/admin/payments',6),
  ('platform','admin_roles','الأدوار والصلاحيات','ShieldCheck','/admin/roles',7),
  ('platform','admin_curriculum','المنهاج','BookMarked','/admin/curriculum',8),
  ('platform','admin_curriculum_requests','طلبات المنهاج','Inbox','/admin/curriculum-requests',9),
  ('platform','admin_settings','إعدادات المنصة','SlidersHorizontal','/admin/settings',10),
  ('shared','notifications','الإشعارات','Bell','/notifications',1),
  ('shared','account_settings','الإعدادات','Settings','/settings',2)
) AS v(module_key, key, name, icon, path, sort_order)
JOIN public.modules m ON m.key = v.module_key
ON CONFLICT DO NOTHING;

-- 4) Grants: each role gets every permission key on its own space + shared
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

-- 5) Signup: first account = Super Admin, otherwise the chosen account type
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  target_role uuid;
  is_first boolean;
  wanted text;
BEGIN
  SELECT NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') INTO is_first;
  wanted := COALESCE(NEW.raw_user_meta_data ->> 'role', 'student');

  IF is_first THEN
    SELECT id INTO target_role FROM public.roles WHERE name = 'مدير عام' LIMIT 1;
  ELSE
    SELECT id INTO target_role FROM public.roles WHERE name = (
      CASE wanted
        WHEN 'teacher'    THEN 'معلم'
        WHEN 'parent'     THEN 'ولي أمر'
        WHEN 'supervisor' THEN 'مشرف أكاديمي'
        WHEN 'admin'      THEN 'مدير عام'
        ELSE 'طالب'
      END
    ) LIMIT 1;
  END IF;

  INSERT INTO public.profiles (user_id, full_name, email, role_id)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    target_role
  )
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, CASE WHEN is_first OR wanted = 'admin' THEN 'admin'::public.app_role ELSE 'user'::public.app_role END)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END; $function$;
