# خريطة الصفحات

كل صفحة لها `head()` خاص (عنوان + وصف + og). الصفحات المحمية تحمل `noindex`.

## الصفحات العامة (23)

| المسار | الملف | الوصف |
| --- | --- | --- |
| `/` | `index.tsx` | الصفحة الرئيسية |
| `/about` | `about.tsx` | عن المنصة |
| `/how-it-works` | `how-it-works.tsx` | كيف تعمل |
| `/courses` | `courses.tsx` | الكورسات |
| `/teacher/$id` | `teacher.$id.tsx` | ملف معلّم عام |
| `/for-teachers` | `for-teachers.tsx` | صفحة المعلمين |
| `/teacher/register` | `teacher.register.tsx` | تسجيل معلّم |
| `/pricing` | `pricing.tsx` | الأسعار (₪ ILS) |
| `/blog`, `/blog/$slug` | `blog.tsx`, `blog.$slug.tsx` | المدونة (ثنائية اللغة) |
| `/help` | `help.tsx` | المساعدة |
| `/contact` | `contact.tsx` | اتصل بنا |
| `/privacy`, `/terms` | — | السياسات |
| `/login` | `login.tsx` | تسجيل الدخول |
| `/signup` | `signup.tsx` | إنشاء حساب (بانتظار endpoint) |
| `/forgot-password`, `/reset-password`, `/verify-email` | — | مسارات كلمة السر/التحقق (بانتظار endpoints) |
| `/certificate/$id` | `certificate.$id.tsx` | شهادة عامة |
| `/invite/$code` | `invite.$code.tsx` | دعوة |
| `/unsubscribe` | `unsubscribe.tsx` | إلغاء الاشتراك البريدي |
| `/403` | `403.tsx` | غير مصرّح |

## الصفحات المحمية `_authenticated` (43)

### الطالب
`/dashboard` · `/library` · `/library/lesson/$id` · `/my-courses` · `/schedule` ·
`/flashcards` · `/exam-simulator` · `/mistakes-bank` · `/achievements` ·
`/my-certificates` · `/bookmarks` · `/community` · `/notifications` ·
`/referrals` · `/settings`

### المعلّم
`/teacher/dashboard` · `/teacher/courses` · `/teacher/content` ·
`/teacher/quizzes` · `/teacher/grading` · `/teacher/analytics` ·
`/teacher/earnings` · `/teacher/community` · `/teacher/profile/edit` ·
`/teacher/settings`

### ولي الأمر
`/parent/report` · `/parent/settings`

### المشرف الأكاديمي
`/supervisor/dashboard` · `/supervisor/students-overview` ·
`/supervisor/teachers` · `/supervisor/reports`

### الأدمن
`/admin/dashboard` · `/admin/users` · `/admin/teachers` · `/admin/roles` ·
`/admin/permissions` · `/admin/curriculum` · `/admin/curriculum-requests` ·
`/admin/content-review` · `/admin/community-reports` · `/admin/payments` ·
`/admin/settings` · `/system-modules` · `/role-permissions/$roleId`

## قواعد التوجيه

- النقاط في أسماء الملفات = شرطات مائلة في المسار.
- `_authenticated` لا تظهر في عنوان URL لكنها جزء من `createFileRoute`.
- بعد الدخول يُنقل المستخدم إلى صفحة دوره (`src/lib/session-home.ts`).
