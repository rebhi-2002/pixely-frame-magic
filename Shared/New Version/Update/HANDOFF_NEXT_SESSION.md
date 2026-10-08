# Academia Frontend — ملف التسليم للمحادثة الجديدة (HANDOFF)

> **النسخة:** مرتبطة بملف التتبع `Frontend_Completion_Tracker.xlsx` **v1.9** — تاريخ 2026-10-04.
> **الهدف من الملف:** تبدأ به محادثة جديدة مع Claude بدون أي ذاكرة سابقة وتكمل من حيث توقفنا.
> **قاعدة ذهبية:** لا تعتمد على ذاكرة المحادثة القديمة؛ كل ما تحتاجه هنا + الملفات المرفقة (القسم 0).

---

## 0) كيف تبدأ المحادثة الجديدة

### ارفع هذه الملفات

| الملف                                                                             | لماذا                                            |
| --------------------------------------------------------------------------------- | ------------------------------------------------ |
| `HANDOFF_NEXT_SESSION.md` (هذا الملف)                                             | السياق الكامل والمتبقي                           |
| `Frontend_Completion_Tracker.xlsx` (v1.9)                                         | خطة التتبع: المهام/المتطلبات/الأسئلة/الملكية/UAT |
| آخر zip للمشروع الأمامي **بعد** تطبيق الدمج وتشغيل `npm run validate`             | الكود الحالي                                     |
| `Acadimia-main.zip` (كود الباك اند)                                               | **مصدر الحقيقة لأشكال الردود** (DTOs) والقواعد   |
| `Backend_Grounded_Analysis.xlsx`                                                  | تحليل مبني على كود الباك اند (أسئلة/فروقات/أدلة) |
| `SRS_1__updated_.docx` + `Swagger_UI.pdf` + `Frontend_Readiness_Audit_Report.pdf` | المتطلبات الأصلية                                |
| ناتج `npm run validate` (نص) + أي أخطاء Console/Network                           | لتصحيح الأخطاء الحقيقية                          |

### أول رسالة مقترحة للمحادثة الجديدة

> اقرأ `HANDOFF_NEXT_SESSION.md` كاملًا ثم ملف التتبع. ابدأ من **القسم 6 — الأولوية 1** (التحقق من الدمج الحالي)، ثم نفّذ **الأولوية 2** (الصفحات التي صارت ممكنة بعد معرفة DTOs الباك اند). التزم بالقسم 2 (القواعد). لا تخمّن أي رد: استخدم DTOs من كود الباك اند. في نهاية كل دفعة أعطني zip بالملفات المتغيّرة فقط + تقرير جلسة بقالب القسم 9.

---

## 1) السياق

- **المشروع:** منصة Academia (واجهة React/TanStack Start/Vite + Tailwind + shadcn، RTL عربي/إنجليزي، `bi("ع","en")` للنصوص). الباك اند ASP.NET Core (`Acadimia-main`).
- **الهدف:** إكمال **19 متطلبًا وظيفيًا** من أصل 30 في تقرير جاهزية الفرونت (13 غير جاهز + 6 جزئي). الـ11 الباقية كانت جاهزة أصلًا.
  - **غير جاهزة (13):** FR-I02، I03، I04، I06، I08، T06، T11، P11، S09، S10، S11، S14، S15.
  - **جزئية (6):** FR-W03a، W03b، P08، S06، S07، S08.
  - **7 متطلبات داعمة خارج الـ30** أُضيفت لأن المسارات لا تكتمل بدونها: FR-I01، I05، I07، I09، I10، I11، T10.
- **أسلوب العمل:** خطة من **129 مهمة** على **20 حزمة عمل (WP)** بملكية ملفات منفصلة لمنع التعارض عند العمل المتوازي (انظر ورقة `FileOwnership`).
- **قيد بيئة Claude:** لا شبكة ولا `node_modules` في بيئته → **لا يستطيع تشغيل** `npm install/validate/vitest/prettier`. كل تحقق حقيقي يتم عند المستخدم. (راجع القسم 8 لأداة الفحص التقريبية.)

---

## 2) القواعد (Conventions) — التزم بها

1. **Truth Rule:** لا بيانات وهمية ولا أرقام مخترعة. إن لم يوفّر الباك اند الحقل → حالة فراغ صادقة أو «—».
2. **لا JSON مخمَّن:** أشكال الردود تؤخذ من DTOs كود الباك اند (القسم 7)، لا من الذاكرة.
3. **النصوص:** `bi("عربي","English")` داخل المكوّنات. لا تعدّل ملفات i18n JSON إلا للصفحات العامة التي تستخدم `t()`.
4. **الصلاحيات (Guard):** لا تضف مفاتيح `PAGES` جديدة. أعد استخدام: `lesson.$id`/`enrolled-course.$id`/`booking.$id`/`book.$teacherId` → `student_my_courses`، و`teacher.course.$id` → `teacher_courses`. صفحات التنقّل الجديدة المسجّلة: `student_attendance`، `student_exam_results`، `student_progress`، `teacher_bookings`.
5. **المسارات المتفق عليها:** `/teacher/course/$id` (id رقم أو `new`، مع `?type=1|2&tab=`)، `/teacher/bookings`، `/book/$teacherId`، `/booking/$id`، `/lesson/$id`، `/enrolled-course/$id`، `/attendance`، `/exam-results`، `/progress`. أسماء مفردة لتجنب nesting.
6. **react-query:** المفاتيح من `src/lib/query-keys.ts` (`qk.*`) و`invalidateBookingQueries(qc, bookingId?, teacherId?)` بعد أي تعديل حجز.
7. **كل POST/PUT يرجع `OperationResult`:** استخدم `assertOk(result, عربي, إنجليزي)` و`getReturnId(result)`، واعرض رسالة الباك اند عبر `getErrorMessage`.
8. **الحالات أرقام (enums):** من `src/lib/enums.ts` — لا نصوص.
9. **كل صفحة:** تحميل/خطأ/فراغ (`LoadingState/ErrorState/EmptyState`). في الخطأ استخدم `withLoadErrorDetail(base, error, bi)` من `src/lib/load-error.ts` ليظهر رمز الاستجابة (403/500…).
10. **الاختبارات:** المنطق النقي في `src/lib/*` أو بجوار المكوّن، واختبارات الصفحات في `src/test-units/`. **ممنوع** وضع `*.test.ts` داخل `src/routes` (TanStack يعتبرها route).
11. **الروابط الخارجية:** `isHttpUrl` + `rel="noopener noreferrer"`؛ لا `dangerouslySetInnerHTML`.
12. **لا dependencies جديدة**، ولا تعدّل `routeTree.gen.ts` يدويًا (يتولّد تلقائيًا).
13. **قبل كل PR:** `npm run format && npm run validate`.
14. **ملفات جديدة** تُسجَّل في ورقة `FileOwnership` بالتتبع.

---

## 3) الحالة الحالية (إلى 2026-10-04)

### أرقام التتبع (v1.9)

- **129 مهمة:** 83 «قيد المراجعة» (مكتوبة، بانتظار `validate` عند المستخدم)، 44 «لم يبدأ»، 1 «قيد التنفيذ» (00-17)، 1 «مؤجل» (S1-03: أُلغيت).
- **FRs تعمل كاملة (بعد validate):** FR-P08، P11، W03b، S11 (4 من 19) + جزئي: W03a، S06، S07.
- ⚠️ كل «قيد المراجعة» **غير مثبتة** حتى ينجح `validate` + UAT.

### ما سُلِّم ومدموج (zip الدمج `wave1-claude-B-MERGED-files.zip` طُبِّق)

- **WP-00:** طبقة API مواءمة مع Swagger (`bookings/lessons/courses/student.ts`)، `op-result.ts`، `enums.ts`، `format.ts`، `query-keys.ts`، `booking-rules.ts`، مكوّنات مشتركة (`BookingStatusBadge`، `StarRating`، `SegmentedTabs`، `ConfirmDialog`)، 9 routes كهياكل، تسجيل التنقّل.
- **Phase A + B:** ولي الأمر (إشعارات/403/حالة الحضور)، أرباح المعلم، التقدم، نوافذ إلغاء/إعادة جدولة/تقييم الحجز، نافذتا قبول/رفض وإنهاء الحجز (معلم)، نموذج الكورس، نموذج إعداد المجموعة، نافذة بيانات الاجتماع، نماذج الدروس، جدول الطالب بفلاتر وانضمام آمن، لوحات «كورساتي» (مؤكد/معلّق + سجل/مسجّل)، بطاقة نسبة الحضور، **شاشة الحجز (`/book/$teacherId`) مع إرسال فعلي**، shell الكورس (`/teacher/course/new` يعمل؛ وضع التعديل يوصّل التبويبات).
- **أنواع الردود الحقيقية (J-01..J-06):** من DTOs الباك اند (انظر القسم 7) — أُدمجت في `bookings/student/courses/lessons.ts`.
- **أدوات تشخيص:** `load-error.ts` يعرض رمز الاستجابة بأهم صفحات الطالب/المعلم. إصلاح `role-probe.test.ts` (fetcher عادي بدل `vi.fn`) — **لم يُشغَّل**.
- **باتش 29** (i18n + signup + teacher.$id…) مطبَّق عند المستخدم؛ تحقّقتُ فقط أن مفاتيح الترجمة موجودة بالعربي والإنجليزي وأن الباتش ينطبق (الملف ينتهي بنهاية سطر ناقصة — احذر من `git apply` الصارم).

### آخر نتائج CI معروفة (قبل الدمج)

- typecheck ✅، lint ✅ (0 أخطاء، 4 تحذيرات: 2 من `admin-dashboard.tsx` قديمة + 2 `react-refresh` من إعادة التصدير بـ`group-config-tab.tsx` — **أُزيلت بالدمج**)، format ✅ (حسب السجل)، tests: 210 نجح و**3 فشل** كلها `role-probe.test.ts` (خارج خطتنا).
- ⛔ **حالة ما بعد الدمج مجهولة:** شغّل `npm run dev` ثم `npm run format && npm run validate` وأرسل الناتج.

---

## 4) الأسباب الجذرية المكتشفة (مهم جدًا)

> مصدرها: `error.txt` + لقطات الشاشة + لقطات Swagger + **كود الباك اند**.

### 4.1 «ما قدرنا نحمّل…» بصفحات الطالب = 403 لدور المستخدم

- `StudentController` عليه `RequireUserTypes(UserTypeIds.Student)`؛ أي حساب ليس **Student** يأخذ **403** على كل `Student/*` (Dashboard/Schedule/MyBookings/MyRequests/Progress/Notifications…). ظهر بالـConsole: `GET /api/Student/Progress 403`.
- الواجهة تحدد دور المستخدم عبر `fetchUserType` الذي يستدعي **`GET /api/User/CreateEditModal?id=<userId>` وهو admin-only** → يرجع 403 → السجل: `[auth] fetchUserType failed — treated as student by default` → يُعامَل الحساب «طالبًا افتراضيًا» ويظهر «بدون نوع».
- **الإصلاح الصحيح (باك اند):** إرجاع `userTypeId` في `MyProfileDto` أو `/api/Auth/Me` (انظر القسم 5).
- `UserTypeIds` بالباك اند: **Admin=1, Student=2, Teacher=3, Parent=4** (المستخدم حدّث `USER_TYPE_ID_TO_ROLE` بالواجهة ليطابقها).

### 4.2 فشل تسجيل ولي الأمر

- الواجهة كانت ترسل `userTypeId: 5` (غير موجود؛ Parent=4) فيرجع «خطأ في التحقق». **صُحِّح** بالمابينغ الجديد (طبّقه المستخدم). تأكّد أن التسجيل يستخدم `userTypes` القادمة من `Auth/RegistrationOptions` لا قيمًا ثابتة.

### 4.3 خيار «ذكر» مفقود بالتسجيل

- كود الباك اند يزرع Gender: 6=ذكر و7=أنثى، و`RegistrationOptions` يرجّع كل `ParentId==5`. الحي يرجّع «أنثى» فقط → **بيانات جدول Constants بالنشر الحي** (حذف/IsDeleted/أقدم من الـseed). مطلوب فحص قاعدة البيانات.

### 4.4 HTTP 500 في `Booking/TeacherBookings` و`Booking/MyBookings` (لقطات Swagger 3 أكتوبر 2026)

- الرد بلا جسم → استثناء سيرفر. **فرضية (غير مؤكدة):** النشر الحي/قاعدة البيانات أقدم من الكود: Migration الوحيدة بالكود `20261004110945_AddBooking` (تاريخ **4 أكتوبر**) وتُنشئ كل الجداول (47)، بينما اللقطات بتاريخ **3 أكتوبر**؛ وSwagger المنشور (22 سبتمبر) لا يحوي JoinRequest/PlatformCommission رغم وجودها بالكود. كل ما يلمس جدول Bookings (TeacherBookings، MyBookings، Student/Dashboard…) قد يفشل بـ500.
- **المطلوب:** تأكيد أن النشر الحي مبني من نفس الكود وأن الـmigration مطبّقة، ثم **إعادة تجربة** الـendpoints. إن بقي 500: سجل الاستثناء (stack trace).

---

## 5) المعوقات المطلوبة من الباك اند (أرسلها للشخص المناسب)

| #   | الطلب                            | التفاصيل/الاقتراح                                                                                                                                                                      | يفتح                                                               | يُنجَز عندما                                   |
| --- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------- |
| B-1 | **تحديد دور المستخدم**           | إضافة `userTypeId` إلى `MyProfileDto` (`User/MyProfile`) أو endpoint `/api/Auth/Me` متاح لكل مسجّل                                                                                     | كل الصفحات بالدور الصحيح (يعالج 4.1)                               | الواجهة تقرأ النوع دون 403                     |
| B-2 | **`groupId` للكورس**             | `CourseListItemDto` (GetMineById/GetAll) لا يحمل groupId، و`CreateEdit` ينشئ المجموعة تلقائيًا. اقتراح: إضافة `groups:[{id,name,maxStudents}]` أو endpoint `Course/GetGroups?courseId` | `ConfigureGroupSchedule` (FR-I02/I06) و`GetGroupStudents` (FR-I03) | رد يحوي groupId                                |
| B-3 | **`teacherId` للمعلم الحالي**    | `CourseInputDto.TeacherId` مطلوب ويُتحقَّق بملكيته ولا يوجد endpoint يرجّعه (يمكن اشتقاقه من `Course/GetAll` لمن لديه كورس فقط). اقتراح: جعله اختياريًا بالسيرفر (من الجلسة)           | إنشاء أول كورس (FR-I01/I05)                                        | معلم جديد ينشئ كورسًا                          |
| B-4 | **قوائم التصنيفات/المواد**       | `CategoryId` مطلوب بـ`CourseInputDto` ولا يوجد endpoint يسرد `CourseCategories`/Subjects (`SubjectId` اختياري). اقتراح: `Course/Lookups` (عام لكل مسجّل)                               | حفظ الكورس                                                         | قوائم تُعبَّأ بالنموذج                         |
| B-5 | **ids بـ`CourseListItemDto`**    | لتعديل كورس: الرد يحوي `SubjectName/CategoryName` فقط لا ids، ولا gradeId ولا groupName                                                                                                | تعديل تفاصيل الكورس                                                | رد يحوي subjectId/categoryId/gradeId/groupName |
| B-6 | **إصلاح 500**                    | انظر 4.4: فحص النشر والـmigration وإعادة التجربة                                                                                                                                       | قوائم المعلم (T5) ولوحاته                                          | `Execute` يرجع 200                             |
| B-7 | **بيانات Constants (الجنس)**     | انظر 4.3                                                                                                                                                                               | تسجيل ذكر                                                          | يظهر «ذكر»                                     |
| B-8 | (اختياري) `ProducesResponseType` | تظهر الردود بـSwagger تلقائيًا                                                                                                                                                         | —                                                                  | —                                              |

**قرارات منتج (غير تقنية):** هل يحجز الطالب فقط؟ (الكود لا يقيّد النوع بـ`Booking/Submit`)، ترتيب أيام الأسبوع (السبت أولًا؟)، هل تبقى المتطلبات الداعمة (I01, I05, I07, I09, I10, I11, T10) ضمن النطاق؟

**للـQA:** حسابات اختبار لكل دور مربوطة بملفات (معلم↔Teacher، طالب↔Student، ولي أمر↔ابن) مع بيانات حضور/امتحانات/حجوزات.

---

## 6) العمل المتبقي بالفرونت اند (مرتّب بالأولوية)

### الأولوية 1 — التحقق (عند المستخدم)

1. نسخ `wave1-claude-B-MERGED-files.zip` (طُبِّق) → `npm run dev` (يولّد `routeTree.gen.ts`) → `npm run format && npm run validate`.
2. إرسال أي أخطاء نصًا. (متوقع: تنسيق Prettier لأسطر طويلة بملفات `withLoadErrorDetail`.)
3. إن نجح: تمييز مهام «قيد المراجعة» كـ«مكتمل» + إغلاق WP-00 (00-17 ثم 00-20).
4. جدول Network للصفحات الفاشلة: (الصفحة، endpoint، رمز الحالة، أول سطر من الرد).

### الأولوية 2 — صفحات صارت ممكنة (DTOs الباك اند معروفة)

> كل صفحة: Guard مناسب + `LoadingState/ErrorState/EmptyState` + `withLoadErrorDetail` + اختبار للمنطق النقي. الأنواع جاهزة بملفات `student.ts/bookings.ts/courses.ts/lessons.ts`.

| المهام                        | الصفحة/المكوّن                                                       | endpoint → النوع                                                                                                                                                                | ملاحظات                                                                                                                                                                                                                                         |
| ----------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **S7-01/03/04/05**            | سجل الحضور `routes/_authenticated/attendance.tsx` (البطاقة موجودة)   | `Student/Attendance?from&to&courseId` → **`StudentAttendance`** (كائن: `attendanceRatePercent، totalSessions، present/absent/late/excused، records[]`)                          | الدالة `getStudentAttendance` تطبّع الرد. جدول records + إحصاءات + فلاتر + حالات `attendanceStatusLabel/Tone`                                                                                                                                   |
| **S8-01/02/03**               | `exam-results.tsx`                                                   | `Student/ExamResults?courseId` → `StudentExamResultRow[]` (`examTitle، examDate، courseTitle، scoreObtained، totalMarks، percentage?، feedback`)                                | استخدم `percentage` من الباك اند أو `examPercent` (lib/exam-percent)                                                                                                                                                                            |
| **S5-01/02/03**               | `lesson.$id.tsx`                                                     | `Student/GetLesson?id` → **`StudentLessonDetail`** (`lesson` متداخل من نوع `StudentScheduleItemDto`، + `groupName, meetingInstructions, locationAvailable, cancellationReason`) | حضوري: القاعة أو «الموقع غير متوفر» (`locationAvailable===false`)؛ أونلاين: منصة+رابط عبر `joinHref/locationLabel` (lib/schedule-join)                                                                                                          |
| **S6-01/03/04**               | `enrolled-course.$id.tsx`                                            | `Student/GetCourse?id` → `StudentCourseDetail` (`groups[]` بأيامها، `lessons[]`)                                                                                                | لوحة «كورساتي المسجّلة» موجودة وتربط للصفحة                                                                                                                                                                                                     |
| **W1-01/05**                  | `components/student/booking-payment-card.tsx` (stub)                 | `Student/BookingPayment?bookingId` → `StudentBookingPayment` (`paymentStatus` 1 Unpaid/2 Paid/3 Refunded، `walletBalance، hasSufficientBalance، needsTopUp`)                    | استخدم `InsufficientBalanceAlert` عند `needsTopUp`                                                                                                                                                                                              |
| **S2-01/02/05 + S4-02/03**    | `booking.$id.tsx`                                                    | `Student/GetBooking?id` → `StudentBookingDetail`                                                                                                                                | يجمع: بطاقة الدفع + `CancelBookingDialog` + `RescheduleDialog` + `RateBookingDialog` (موجودة) حسب `lib/booking-rules.ts`. لا يوجد `isRated` → الباك اند يرفض التكرار (اعرض رسالته). `teacherId` متاح بالرد → مرّره لـ`invalidateBookingQueries` |
| **S3-02**                     | `components/student/my-courses/reschedule-requests-panel.tsx` (stub) | `Student/MyRescheduleRequests` → `StudentRescheduleRequest[]`                                                                                                                   | أضف `RescheduleStatus` لـ`enums.ts`: **1 Pending، 2 Approved، 3 Rejected، 4 Cancelled**                                                                                                                                                         |
| **(A+)** أزرار صفوف «كورساتي» | لوحتا الحجوزات/الطلبات                                               | استخدم `{id}` للحجز + الحوارات الموجودة                                                                                                                                         | إلغاء/إعادة جدولة بدون صفحة التفاصيل (الباك اند يتحقق من الأهلية)                                                                                                                                                                               |
| **T1-01**                     | `teacher.courses.tsx` (أزرار الإنشاء موجودة + placeholder قائمة)     | `Course/GetAll` (يرجع كائنًا مقسّمًا `{recordsFiltered,totalCount,data}` — راجع `listAllCoursesForAdmin`/`listMyCourses`) → `TeacherCourseDetail[]`                             | يفلتر حسب المعلم لحسابات المعلمين (تحليل الكود). `status`: 1 Draft/2 Published/3 Archived                                                                                                                                                       |
| **T1-07 (إكمال)**             | `teacher.course.$id.tsx` (يعمل بوضع `new`)                           | `Course/GetMineById?id` → `TeacherCourseDetail`                                                                                                                                 | حدّث `course-seams.ts`: `resolveCourseDeliveryType` صار ممكنًا؛ `resolveGroupId`/`courseToDraft` تنتظر B-2/B-5                                                                                                                                  |
| **T4-01 + ربط T4**            | `lessons-tab.tsx` (stub)                                             | `Lesson/GetSchedule?courseId[&groupId]` → `LessonRow[]` (`lessonId، courseType، topic، date، day، startTime، durationMinutes، platformOrRoom`)                                  | **`Lesson/Create` و`GetSchedule` يكفيهما `courseId`** (groupId اختياري). اربط `LessonFormDialog` (نموذج المستخدم) و`MeetingConfigDialog` و`LessonCancelDialog`. الرد لا يحمل status ولا رابط الاجتماع                                           |
| **T5-01/04/06**               | `teacher.bookings.tsx` (stub)                                        | `Booking/TeacherBookings?status` → `TeacherBookingRow[]` (= `BookingDto`)؛ `Booking/TeacherRescheduleRequests?status` → `RescheduleRequestDto[]`                                | الحوارات موجودة: `DecideBookingDialog`، `CompleteBookingDialog`. **ناقص:** حوار قرار إعادة الجدولة (`Booking/DecideReschedule {requestId, approve, rejectionReason}`). ⛔ يعتمد على إصلاح 500 (B-6)                                             |
| **S1-04 تحسين**               | `/book/$teacherId`                                                   | —                                                                                                                                                                               | تحقق حيًّا؛ الإرسال لا يتطلب مادة/صف. العلم `BOOKING_FLOW_ENABLED=true` بـ`lib/booking-slots.ts` (أعده false للتراجع)                                                                                                                           |

### الأولوية 3 — ينتظر الباك اند

- **FR-I02/I06 (حفظ إعداد المجموعة)**، **FR-I03 (طلاب المجموعة T3-01..04):** ينتظران **B-2 (groupId)**. النموذج جاهز (`group-config-tab.tsx`) وحفظه معطّل صراحةً.
- **FR-I01/I05 (إنشاء كورس):** النموذج جاهز، الحفظ معطّل حتى **B-3 + B-4**؛ التعديل حتى **B-5**.
- **أدوار المستخدمين:** حتى **B-1**.

### الأولوية 4 — الجودة (WP-QA)

`QA-01` validate أخضر · `QA-02` e2e (Playwright) · `QA-03` تنفيذ ورقة UAT (64 بندًا) · `QA-04` RTL/موبايل/Dark · `QA-05` وصولية · `QA-06` تحديث README/CHANGELOG/PROJECT-ATLAS · `QA-07` إعادة تدقيق الجاهزية · `QA-08` تنظيف بقايا «قيد البناء»/«P0-1»/«P1-1» · `QA-09` مراجعة أمنية. وتنظيف: `pending-json.ts` قد يصير غير مستخدم (ابحث `PendingResponse`).

---

## 7) كود الباك اند — الحقائق التي تحكم التنفيذ

**التسلسل:** ASP.NET Core افتراضي → **camelCase**، الـenums **أرقام**، `DateTime` ISO (`2026-10-05T00:00:00`)، `TimeSpan` نص `"HH:mm:ss"`.

**Enums:** BookingStatus 1 Pending·2 Accepted·3 Rejected·4 Cancelled·5 Confirmed·6 Completed · RescheduleRequestStatus 1 Pending·2 Approved·3 Rejected·4 Cancelled · BookingPaymentStatus 1 Unpaid·2 Paid·3 Refunded · AttendanceStatus 1 Present·2 Absent·3 Late·4 Excused · CourseStatus 1 Draft·2 Published·3 Archived · DeliveryType/TeachingMode 1 حضوري·2 أونلاين · MeetingPlatform 1 Zoom·2 Meet·3 Teams·4 Other · DayOfWeek 0=الأحد…6=السبت.

**قواعد مؤكدة بالكود:**

- `Booking/Submit`: `SubjectId/GradeId` **اختياريان**، `DurationMinutes` **15..480**، السعر يُحسب بالسيرفر، الخصم عند قبول المعلم، ولا قيد على نوع المستخدم.
- `Course/CreateEdit`: `CategoryId`/`GradeId`/`TeacherId`/`Price`/`MaxStudents` مطلوبة، `SubjectId` اختياري، العنوان **3..250**، اسم المجموعة **1..150**، ينشئ المجموعة تلقائيًا ويتحقق ملكية المعلم.
- `ConfigureGroupSchedule` و`GetGroupStudents`: يتطلبان `groupId` (ولا مصدر له الآن).
- `Student/*`: تتطلب نوع Student (403 لغيره).

**أشكال الردود (مطابقة للأنواع بالمشروع):**

- `BookingDto` = `StudentBookingDetail`: `id، teacherId، teacherName، studentId(string)، studentName، subjectId?، subjectName?، teachingMode، date، startTime، durationMinutes، price، status، studentNote?، rejectionReason?، paidOn?، cancellationReason?، createdOn`.
- `CourseListItemDto` = `TeacherCourseDetail`: `id، title، description?، price، deliveryType، status، maxStudents، teacherId، teacherName?، subjectName?، categoryName?` — **بلا groupId ولا ids**.
- `StudentGroupRosterDto` = `GroupStudentRow`: `studentId، name، phoneNumber، location?`.
- `LessonScheduleRowDto` = `LessonRow`: انظر الجدول أعلاه.
- باقي الأشكال بملفات `student.ts` (تعليقات تذكر المصدر).

> ⚠️ هذه الأنواع **من الكود وليست تشغيلًا حيًّا**؛ أول تشغيل حيّ ناجح يؤكدها.

---

## 8) أدوات وإرشادات تقنية

- **أداة فحص Claude التقريبية (لن تكون موجودة بالمحادثة الجديدة؛ اطلب إعادة بنائها):** `tsc` عالمي + ملف `stubs.d.ts` يعرّف المكتبات الخارجية (react, @tanstack/*, lucide, sonner, zod, vitest) كـ`any` + `tsconfig.check.json` يمدّد `tsconfig.json` ويدرج الملفات المطلوبة (يلتقط أخطاء الأنواع الداخلية والـprops). ومشغّل اختبارات مبسّط (`run-tests.cjs` يترجم بـtsc ثم ينفّذ مع shim لـvitest) للاختبارات النقية فقط (لا يدعم `vi.mock` ولا `import.meta.env`).
- **تحديث ملف التتبع:** بُني بسكربت Python (openpyxl) **غير مسلَّم**. بالمحادثة الجديدة: حدّث الإكسل مباشرة بـopenpyxl (احفظ الصيغ) ثم شغّل `recalc.py`، أو أعد توليده. الصيغ تعتمد على: `Tasks!M` (الحالة)، `Tasks!D` (FR)، `Tasks!V/W/X` (بوابة البدء/NE/حالة الاعتماد)، `BackendChecklist!H` (جاهز؟).
- **ورق التتبع:** README، Dashboard، BackendChecklist، Availability، ParallelPlan، WorkPackages، Tasks، FR_Matrix، UAT، FileOwnership، Contracts، API_Map، Discrepancies، OpenQuestions، Assumptions_Risks، ChangeRequests، SessionLog، Conventions، Lists.
- **حدود واجهية افتراضية** (غير موثّقة بالباك اند؛ تُعدَّل عند أول رفض): ملاحظة الحجز/إعادة الجدولة 500 حرف، مراجعة التقييم 1000، مدة الدرس 15..480، سبب الرفض 500، وصف الكورس 2000.

---

## 9) قالب تقرير نهاية الجلسة (يُستعمل لتحديث التتبع)

```
WP: ... | الجلسة: ... | التاريخ: ...
المهام: [ID: الحالة] ... (مكتمل/قيد المراجعة/متوقف + سبب)
الملفات المعدّلة/الجديدة: ...
نتيجة npm run validate: ...
افتراضات جديدة / أسئلة مفتوحة: ...
طلبات تغيير (CR): ...
الخطوة التالية: ...
```

---

## 10) قائمة تحقق سريعة لما تبقّى

- [ ] `validate` أخضر بعد الدمج + إصلاح `role-probe` (مفروض بالـzip الأخير).
- [ ] إغلاق 00-17/00-20 (WP-00).
- [ ] الصفحات: attendance، exam-results، lesson، enrolled-course، booking، payment card، reschedule list، teacher.bookings (+DecideReschedule)، teacher.courses list، lessons-tab.
- [ ] أزرار إلغاء/إعادة جدولة بصفوف «كورساتي» (اختياري).
- [ ] **الباك اند:** B-1…B-7 (القسم 5).
- [ ] UAT (64 بندًا) + e2e + QA.
- [ ] تحديث README/CHANGELOG/PROJECT-ATLAS وإعادة تدقيق الجاهزية (الهدف: 19/19).
