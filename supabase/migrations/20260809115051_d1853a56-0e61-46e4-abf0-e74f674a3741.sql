ALTER TABLE public.modules ADD COLUMN IF NOT EXISTS name_en text;
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS name_en text;

UPDATE public.modules m SET name_en = v.en FROM (VALUES
  ('student','Student Space'),
  ('teacher','Teacher Space'),
  ('supervisor','Academic Supervision'),
  ('parent','Parent Space'),
  ('platform','Platform Admin'),
  ('shared','General')
) AS v(key,en) WHERE m.key = v.key;

UPDATE public.pages p SET name_en = v.en FROM (VALUES
  ('student_dashboard','Student Dashboard'),
  ('student_library','Library'),
  ('student_mistakes','Mistakes Bank'),
  ('student_flashcards','Flashcards'),
  ('student_exam','Exam Simulator'),
  ('student_community','Community'),
  ('student_schedule','Schedule'),
  ('student_achievements','Achievements'),
  ('student_bookmarks','Bookmarks'),
  ('student_my_courses','My Courses'),
  ('student_certificates','My Certificates'),
  ('student_referrals','Referrals'),
  ('teacher_dashboard','Teacher Dashboard'),
  ('teacher_content','Content'),
  ('teacher_quizzes','Quizzes'),
  ('teacher_grading','Grading'),
  ('teacher_analytics','Analytics'),
  ('teacher_community','Class Community'),
  ('teacher_courses','My Courses'),
  ('teacher_earnings','Earnings'),
  ('teacher_profile_edit','Public Profile'),
  ('teacher_settings','Teacher Settings'),
  ('supervisor_dashboard','Supervision Dashboard'),
  ('supervisor_teachers','Teachers'),
  ('supervisor_students','Students Overview'),
  ('supervisor_reports','Reports'),
  ('parent_report','Child Report'),
  ('parent_settings','Parent Settings'),
  ('admin_dashboard','Admin Dashboard'),
  ('admin_teachers','Teacher Verification'),
  ('admin_content_review','Content Review'),
  ('admin_community_reports','Community Reports'),
  ('admin_users','Users'),
  ('admin_payments','Payments'),
  ('admin_roles','Roles & Permissions'),
  ('admin_curriculum','Curriculum'),
  ('admin_curriculum_requests','Curriculum Requests'),
  ('admin_settings','Platform Settings'),
  ('notifications','Notifications'),
  ('account_settings','Settings')
) AS v(key,en) WHERE p.key = v.key;