# تدقيق شامل: لماذا صفحات كثيرة "فارغة" لحسابات حقيقية — 2026-09-21

فحص طلبه المستخدم صراحة: تحقّق عميق من كل دور وكل صفحة بالمشروع بحثًا عن أخطاء
مخفية "ما بتبين إلا عند التجربة الفعلية". النتيجة اكتشاف جذر واحد يفسّر أغلب
الحالات (بما فيها `/admin/roles` و`system-modules` اللي ذكرهم المستخدم)، وليس
مجرد صفحات منسية بشكل منفصل.

## السبب الجذري (مؤكَّد من الكود، مو تخمين)

عشر ملفات `src/lib/*.functions.ts` — `rbac.functions`, `admin-curriculum.functions`,
`admin-moderation.functions`, `student-evaluation.functions`,
`student-learning.functions`, `student-social.functions`,
`supervisor-oversight.functions`, `teacher-followup.functions`,
`teacher-teaching.functions`, `account-pages.functions` — كلها TanStack server
functions محمية بـ`requireAuth` (`src/integrations/backend/auth-middleware.ts`):

```ts
if (!demoAllowed || !demoUserId) {
  throw new Response("Authenticated server functions are unavailable", { status: 401 });
}
```

هذا **قرار أمان مقصود وموثّق بتعليق بالكود نفسه** ("Never fall back to an admin
identity... cannot authorize access to real data") — مش خطأ. بيانات هالملفات
محلية بالذاكرة (تجريبية)، وما في طريقة آمنة تربطها بجلسة حساب حقيقي حاليًا،
فمُنعت عمدًا. **المشكلة الفعلية** إنه 39 من 40 ملف يستهلك هالدوال كانوا
بيتجاهلوا فشل الجلب بصمت (`isLoading ? <Spinner/> : (data ?? []).map(...)`)
بدل ما يعرضوا خطأ — فلحساب حقيقي بيوصل كـ401 صامت، وبيظهر كصفحة فاضية أو
(بحالة `role-permissions.$roleId.tsx`) **سبينر تحميل عالق للأبد** (`isLoading

| !data`ما كان بينتهي أبدًا لو`data`ظلت`undefined` بسبب خطأ). |
| ----------------------------------------------------------- |

**أخطر حالة مكتشَفة:** `parent.report.tsx` كان عند فشل الجلب يعرض لولي أمر
حقيقي رسالة **"ما في ابن مرتبط بحسابك — اربط أول ابن"** — رسالة غلط تمامًا
وقت انقطاع فعلي بالاتصال، مش مجرد شاشة فاضية.

**لاحظ:** `/admin/roles` و`/system-modules` تحديدًا اللي ذكرهم المستخدم هم
جزء من `rbac.functions.ts` — نظام تحكّم محلي بالقائمة الجانبية والصلاحيات
(مصفوفة أدوار/صفحات ثابتة بالذاكرة، `src/lib/rbac-static-data.ts`)، **منفصل
تمامًا** عن `PageController`/`UserPermissionController` الحقيقيين بالباك اند
(المستخدَمين فعليًا بصفحتي `/admin/pages` و`/admin/backend-permissions` —
هاتين شغّالتين بشكل صحيح لحساب حقيقي، لأنهم ما بيمرّوا بـ`requireAuth` هالمحلي
أصلًا). لا تخلط بين الأربعة.

## شو انصلح هالجولة (13 ملف)

كل ملف صار يفحص `isError` (أو مجموع أخطاء عدة queries بصفحات اللوحات) ويعرض
`ErrorState` + زر إعادة محاولة حقيقي، بدل جدول/سبينر فاضي:

| الملف                                                | الحالة قبل                                 |
| ---------------------------------------------------- | ------------------------------------------ |
| `components/admin/modules-manager.tsx`               | جدول فاضي صامت                             |
| `components/admin/roles-manager.tsx`                 | جدول فاضي صامت                             |
| `routes/_authenticated/role-permissions.$roleId.tsx` | **سبينر عالق للأبد** + بلا `<Guard>` أصلًا |
| `routes/_authenticated/admin.permissions.tsx`        | شبكة فاضية صامتة                           |
| `components/admin/admin-dashboard.tsx`               | لوحة فاضية صامتة                           |
| `components/admin/community-reports-manager.tsx`     | جدول فاضي صامت                             |
| `components/admin/content-review-manager.tsx`        | جدول فاضي صامت                             |
| `components/admin/teacher-verification-manager.tsx`  | جدول فاضي صامت                             |
| `components/admin/curriculum-manager.tsx`            | جدول فاضي صامت                             |
| `components/admin/curriculum-requests-manager.tsx`   | جدول فاضي صامت                             |
| `routes/_authenticated/teacher.dashboard.tsx`        | لوحة فاضية صامتة                           |
| `routes/_authenticated/supervisor.dashboard.tsx`     | لوحة فاضية صامتة                           |
| `routes/_authenticated/parent.report.tsx`            | **رسالة غلط** ("اربط أول ابن")             |

`role-permissions.$roleId.tsx` صار عليه `<Guard pageKey="admin_roles">` أيضًا
(كان الوحيد بكل صفحات `_authenticated/` بلا أي Guard — أي مستخدم مسجّل
بأي دور كان يقدر يفتحه مباشرة بالرابط، رغم إن بياناته أصلًا محلية-ديمو فقط).

## الباقي — 25 ملف، نفس السبب بالضبط، لسا ما انصلح

نفس النمط تمامًا (استعلام على أحد الملفات العشرة أعلاه بدون `isError`). رتّبتهم
حسب الأولوية الواقعية (صفحات مشتركة بين كل الأدوار أولًا، وقتها صفحات كل دور):

**مشتركة/عالية التكرار (أولوية أولى):**
`routes/_authenticated/settings.tsx`, `routes/_authenticated/notifications.tsx`

**صفحات الطالب:**
`achievements.tsx`, `bookmarks.tsx`, `community.tsx`, `exam-simulator.tsx`,
`flashcards.tsx`, `library.tsx`, `mistakes-bank.tsx`, `my-certificates.tsx`,
`my-courses.tsx`, `referrals.tsx`, `schedule.tsx`

**صفحات المعلم:**
`teacher.analytics.tsx`, `teacher.community.tsx`, `teacher.content.tsx`,
`teacher.courses.tsx`, `teacher.grading.tsx`, `teacher.profile.edit.tsx`,
`teacher.quizzes.tsx`, `teacher.settings.tsx`

**صفحات المشرف الأكاديمي:**
`supervisor.reports.tsx`, `supervisor.students-overview.tsx`, `supervisor.teachers.tsx`

**صفحات ولي الأمر:**
`parent.settings.tsx`

### قالب الإصلاح (نفس اللي طُبّق — انسخه حرفيًا)

```tsx
// 1) استورد ErrorState/RetryButton جنب LoadingState
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";

// 2) زوّد isError (وisFetching/refetch لو رح تحط زر إعادة محاولة محدّد،
//    أو استخدم useQueryClient().invalidateQueries() لصفحة فيها كذا query معًا)
const { data, isLoading, isError, isFetching, refetch } = useQuery({ ... });

// 3) فرع قبل isLoading (مهم: الترتيب — isError قبل أي فحص على !data)
{isError ? (
  <ErrorState
    title={bi("ما قدرنا نحمّل...", "Couldn't load...")}
    description={bi("جرّب تاني بعد شوي.", "Please try again shortly.")}
    action={<RetryButton label={bi("إعادة المحاولة","Retry")} onClick={() => refetch()} loading={isFetching} />}
  />
) : isLoading ? (
  <LoadingState label={bi("جارٍ التحميل…","Loading…")} className="border-none bg-transparent" />
) : (
  /* المحتوى العادي */
)}
```

لصفحات فيها أكتر من query (متل `admin-dashboard.tsx`/`teacher.dashboard.tsx`):
اجمع `hasError = q1.isError || q2.isError || ...` وزر واحد
`onClick={() => void queryClient.invalidateQueries()}`.

## قرار متعمَّد: ما بنيناش واجهات حجز/جدولة دروس حية هالجولة

جهّزنا طبقة الأنواع/الدوال (`integrations/backend/bookings.ts` و`lessons.ts`)
مطابقة 1:1 لكود الباك اند، **بدون أي صفحة تستخدمها بعد**. السبب: `Booking/Submit`
حاليًا بلا أي فحص صلاحيات (P0-1) وممكن ينجح تقنيًا ضد صف `Teacher` يتيم
(بدون `UserId`، P1-1) — يعني حجز حقيقي ينحفظ بحالة `Pending` للأبد بدون أي
معلم يقدر يستلمه أو يقرّره، يربك المستخدم الحقيقي. الدوال جاهزة للاستيراد
الفوري لما ينحل P0-1/P1-1.

## اكتشاف جانبي أُصلح فورًا

أثناء بناء `lessons.ts` تبيّن إن `apiClient` (`client.ts`) ما فيه دالة `put`
أصلًا (بس `get`/`post`/`delete`/`postForm`) — بينما `Lesson/Update` و
`Lesson/ConfigureMeeting` بالباك اند `[HttpPut]` صراحة. أُضيفت `apiClient.put`
بنفس نمط الدوال الموجودة. لو حدا كتب هالكود بدون التحقّق من الباك اند مباشرة،
كان هيك بيصير خطأ "hidden until tested" جديد.

## سؤال منتج مفتوح (مش قرار فرونت)

`rbac.functions.ts`/`rbac-static-data.ts` (وحدات النظام/الأدوار الخماسية
المحلية) و`admin-curriculum.functions.ts`/`admin-moderation.functions.ts`
(المنهج/البلاغات/مراجعة المحتوى/تحقّق المعلمين) — **الباك اند الحالي ما فيه
أي controller مقابل لأي منها إطلاقًا** (لا `Role`، لا `Module` عام قابل
للتفعيل/التعطيل، لا `Curriculum`، لا `Moderation`، لا `CommunityReport`، لا
`TeacherVerification`). هذا مختلف عن P1-1/P1-3 (اللي الباك اند فيه نموذج
البيانات بس ناقص endpoint/seed) — هون المفهوم نفسه غير موجود بالـbackend
إطلاقًا. قرار "هل هاي ميزات مخطَّطة فعلاً وتحتاج بناء backend كامل، أو كانت
واجهات تجريبية لعرض تصميم بس؟" قرار منتج، مو شي بقرره الفرونت لحاله — لهيك ما
أضفته كـ"مطلوب" بـ`backend-requirements.md`.
