# تقرير جلسة — WP-00 (الأساس المشترك) — Wave 0

**التاريخ:** 2026-10-02 · **المنفّذ:** Claude · **الفرع المقترح:** `feat/wp-00-foundation`
**نتيجة `npm run validate`:** **غير منفَّذ** (لا `node_modules` ولا شبكة بالبيئة). تحقّقتُ فقط من صياغة كل ملفات `.ts` ومن منطق `format` / `booking-rules` / `enums` بسكربت نقي، ولم أستطع فحص ملفات `.tsx`. شغّل الخطوات بالأسفل (00-17).

## ما أنجزتُه (حالة المهام)

| المهمة                                    | الحالة                 | ملاحظة                                                                                                                                                         |
| ----------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 00-01 مواءمة `bookings.ts`                | مكتمل                  | D-01/02/03/05 مغلقة: `BookingInput` الجديد، `accept`، `ratingValue/review`، أرقام الحالات. كل الكتابات ترجع `OperationResult`، وردود القوائم `PendingResponse` |
| 00-02 دوال إعادة الجدولة (معلم)           | مكتمل                  | `listTeacherRescheduleRequests`, `decideReschedule` (D-09)                                                                                                     |
| 00-03 مواءمة `lessons.ts`                 | مكتمل                  | الكتابات ترجع `OperationResult` (D-06)، و`MeetingPlatform` موحّد (D-10)                                                                                        |
| 00-04 دوال الكورسات                       | مكتمل                  | `createEditCourse`, `configureGroupSchedule`, `getGroupStudents`, `getMyCourse`, `listMyCourses` + `TeacherCourseDetail`/`GroupStudentRow` (D-07)              |
| 00-05 عشر دوال `student.ts`               | مكتمل                  | (D-08)                                                                                                                                                         |
| 00-06 `op-result.ts`                      | مكتمل                  | `assertOk` يعامل الردّ الفاضي كفشل (لا نجاح صامت) + `getReturnId`                                                                                              |
| 00-07 `enums.ts`                          | مكتمل                  | بدون `RescheduleStatus` عمدًا (أسماؤه غير موثّقة → WP-J / J-02)                                                                                                |
| 00-08 `format.ts` + اختبارات              | مكتمل                  |                                                                                                                                                                |
| 00-09 مكونات UI مشتركة                    | مكتمل                  | `BookingStatusBadge`, `StarRating`, `SegmentedTabs`, `ConfirmDialog`                                                                                           |
| 00-10 `query-keys.ts`                     | مكتمل                  | `qk.*` + `invalidateBookingQueries(qc, bookingId?, teacherId?)`                                                                                                |
| 00-11 `booking-rules.ts` + اختبارات       | مكتمل                  |                                                                                                                                                                |
| 00-12 اختبارات طبقة الـ API               | مكتمل                  | `bookings/lessons/student/op-result` جديدة + توسعة `courses.test.ts`                                                                                           |
| 00-13 تسجيل الصفحات                       | مكتمل                  | `student_attendance`, `student_exam_results`, `student_progress`, `teacher_bookings`                                                                           |
| 00-14 Stubs للـ routes                    | مكتمل                  | 9 ملفات بنفس مفاتيح Guard من C-17                                                                                                                              |
| 00-15 Stubs للمكونات                      | مكتمل                  | بنفس props من Contracts                                                                                                                                        |
| 00-16 إعادة تركيب `my-courses`            | مكتمل                  | 4 لوحات؛ لوحتا الحجوزات والطلبات بسلوك مطابق للسابق                                                                                                            |
| 00-17 توليد `routeTree.gen.ts` + validate | **عليك (محليًا)**      | الخطوات بالأسفل                                                                                                                                                |
| 00-19 الشريط الجانبي                      | مكتمل                  | مسارات التفاصيل تفتح مجموعتها                                                                                                                                  |
| 00-20 إغلاق Wave 0 وتجميد الملفات         | **بانتظار نجاح 00-17** | القائمة بالأسفل                                                                                                                                                |
| 00-21 `pending-json.ts`                   | مكتمل                  |                                                                                                                                                                |

## خطوات 00-17 عليك تشغيلها (بالترتيب)

1. انسخ مجلد `wp-00/` فوق جذر المشروع (المسارات مطابقة لمسارات المشروع).
2. `npm run dev` ثم افتح أي صفحة ليُولَّد `src/routeTree.gen.ts` بالمسارات التسعة الجديدة، وأوقف الخادم. **بدون هذه الخطوة يفشل `tsc`** لأن أسماء المسارات الجديدة غير معرّفة بعد.
3. `npm run format` ثم `npm run validate`. لم أستطع تشغيل Prettier، وبعض الأسطر الطويلة بالملفات الجديدة ستُعاد تنسيقها تلقائيًا.
4. إن ظهر خطأ نوع أو lint، أرسله لي نصًا وأصلحه بنفس الجلسة.
5. ثم `git add -A && git commit -m "[WP-00] foundation"`، وبعدها يُمنع على أي WP لمس `routeTree.gen.ts`.

## قرارات واستثناءات تستحق انتباهك

- **تعديلات خارج القائمة المذكورة بالتتبع (أحتاج موافقتك أو CR بأثر رجعي):**
  - `src/components/admin/app-sidebar.tsx` (مسموح كمهمة 00-19 الاختيارية).
  - `src/integrations/backend/courses.test.ts` (مالكه WP-00 أصلًا).
  - لم ألمس أي ملف من «المجمّدة»، ولا `client.ts` ولا `auth.ts` ولا `bi.ts`.
- **`student.ts`**: ما زال يعيد تصدير `BookingStatus`/`MeetingPlatform`/`AttendanceStatus` كأنواع من `enums.ts` حتى لا تنكسر الاستيرادات الحالية. لكن **`BookingStatus` بـ`bookings.ts` تغيّر من نصي إلى رقمي** (D-05)، ولا شاشة حالية تستخدمه (تحققتُ بالبحث).
- **`listMyCourses`** يستدعي `Course/GetAll` كما هو (قد يرجّع كورسات كل المعلمين). وضعتُ تحذيرًا بالكود، ولا تعرضه كـ«كورساتي» قبل حسم **Q-01** بـWP-J.
- **`Booking/Submit`** يتطلب الآن `subjectId` و`gradeId`، ومصدرهما غير محسوم (**Q-04**). هذا يخص WP-S1 لا الـAPI.
- **`my-courses`**: اللوحتان الجديدتان (`EnrolledCoursesPanel`, `RescheduleRequestsPanel`) ترجعان `null` حتى يكمل S6/S3.
- **Truth Rule:** لا بيانات وهمية: كل رد غير موثّق `PendingResponse`، ومن يقرأ حقوله قبل WP-J يخالف القاعدة.

## الملفات المجمّدة بعد إغلاق WP-00 (للإعلان في 00-20)

`bookings.ts`, `lessons.ts`, `courses.ts`, `student.ts`, `op-result.ts`, `pending-json.ts`, `enums.ts`, `format.ts`, `query-keys.ts`, `booking-rules.ts`, `rbac-static-data.ts`, `my-courses.tsx`, `booking-status-badge.tsx`, `star-rating.tsx`, `segmented-tabs.tsx`, `confirm-dialog.tsx`، و`routeTree.gen.ts` (WP-00/QA فقط).
ملفات الـStubs تنتقل لملكية أصحابها (T1..T5, S1..S9, W1) كما في FileOwnership.

## أسئلة/افتراضات جديدة

- لا أسئلة حاجبة جديدة. الأسئلة **Q-01..Q-05** ما زالت تحجب فقط المهام المعتمدة على JSON (WP-J).
- افتراض: السبت أول أيام الأسبوع بالعرض (`WEEK_DISPLAY_ORDER`) حتى تُحسم **Q-15**.

## الخطوة التالية

1. أنت: 00-17 (الخطوات أعلاه).
2. إطلاق Wave 1 بالتوازي (T1..T5, S1..S9, W1) بعد نجاح `validate`، مع WP-P1 وWP-W2 اللذين يعملان أصلًا.
3. WP-J ينتظر عينات JSON من فريق الباك اند (17 عينة).
