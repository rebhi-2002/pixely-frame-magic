# مطلوب من فريق الباك اند لاستكمال الربط — 2026-09-21

**الجمهور:** فريق الباك اند. مرجع الفحص: `Acadimia-main.zip` (الباك اند الحالي) + الباتش الموحّد
`academia-backend-auth-fix-v3` (يُعتبر مطبّقًا). كل بند فيه: **الموقع**، **المشكلة**، **الأثر على
الفرونت**، **الحل المقترح**، و**شو بيسوي الفرونت لما ينحل**. الفرونت ما رح يلتفّ على أي بند
هون (لا بيانات مؤقتة ولا حلول ملتوية بعد اللي مذكور) — بنربط كل بند لما ينحل.

الأولوية: 🔴 أمان (يُصلَّح قبل أي نشر عام) — 🟠 يمنع ميزة كاملة — 🟡 تحسين.

---

## 🔴 P0-1 — أغلب الـControllers بلا أي تحقق صلاحيات

**الموقع:** كل ملفات `Acadimia.Api/Controllers`. بالـzip الحالي **فقط** `UserController`
(`[RequirePagePermission]`) و`CourseController` (`[RequireUserTypes]` على 3 actions +
`[AllowAnonymous]` على 2) وفيهم تحقق. الباقي: `WalletController`، `UserPermissionController`،
`ConstantController`، `PageController`، `TeacherController`، `BookingController`، `LessonController`،
`ParentController` — **صفر** `[Authorize]`/`RequireUserTypes`/`RequirePagePermission`، و`Program.cs`
ما فيه `FallbackPolicy` ولا `AddAuthorization`.

**الأثر (لو الباك اند المنشور = هالكود):** أي شخص بدون حساب يقدر ينادي مباشرة، مثلًا:
`Wallet/VerifyTopUpRequest` (يشحن محافظ)، `Wallet/DecideWithdrawalRequest`،
`UserPermission/SavePermissions` (يعطي نفسه صلاحيات)، `Teacher/CreateEdit` و`Teacher/Delete`،
`Constant/*`، `Page/*`، وكل `Booking/*` (بـ`userId` فاضي). الفرونت بيحمي الواجهة فقط، وهاد مو حماية.

**الحل المقترح (بهالترتيب):**

1. `Program.cs`: `options.FallbackPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();`
   (كل شي يتطلب دخول افتراضيًا).
2. `[AllowAnonymous]` **صراحةً** على العام فقط: `Auth/*`، `Course/GetPublished`، `Course/GetById`،
   `Teacher/Search`، `Teacher/PublicProfile`، `Teacher/Availability`. (وأي قراءة ثوابت عامة
   لاحقًا — راجع P1-3.)
3. أدوار: `RequireUserTypes(UserTypeIds.Admin)` على Wallet (بنود الأدمن)، UserPermission، Constant،
   Page، `Teacher/GetAll|CreateEditModal|CreateEdit|Delete`؛ `RequireUserTypes(Teacher)` على
   `Teacher/UpdateProfile|SetAvailability` وكل `Lesson/*`؛ `RequireUserTypes(Student, Parent)`
   على `Booking/Submit|Cancel|Rate|MyBookings`؛ المعلم على `Booking/Decide|Complete|TeacherBookings`.
4. إضافة التحقق من الملكية داخل الخدمات (زي `OwnsCourseAsync`) وين ما ناقص (مثلًا `Booking/Cancel`).

**لما ينحل:** الفرونت ما بيحتاج تعديل للنقاط العامة (`/courses`، `/teachers`، `/teacher/:id`)
طالما `[AllowAnonymous]` موجودة. لو شدّدتوا بدون ما تضيفوها، الصفحات العامة بترجع 401 وبتظهر
"ما قدرنا نحمّل…".

## 🟠 P1-1 — ما في مسار ينشئ صف `Teacher` لحساب معلم

**الموقع:** `Teacher.UserId` (nullable) هو الربط بحساب الدخول، وكل الملكية بتعتمد عليه:
`OwnershipService.GetTeacherIdForUserAsync/OwnsTeacherAsync/OwnsCourseAsync`،
`TeacherService.UpdateProfileAsync/SetAvailabilityAsync` (بيبحثوا `Teachers.SingleOrDefault(t =>
t.UserId == userId)`). لكن:

- `AuthController.Register` ما بينشئ صف `Teacher` لما `UserTypeId = Teacher`.
- `TeacherService.CreateEditAsync` بينشئ `new Teacher { GradeId }` **بدون `UserId`**.
- `Teacher.GradeId` إلزامي (FK لجدول `Grade`) ومش عنده قيمة منطقية لمعلم جديد.

**الأثر:** ما في معلم حقيقي بيقدر: يعدّل ملفه (`UpdateProfile`)، يحدّد أوقاته، ينشئ كورس
(`Course/CreateEdit` بيفحص `OwnsTeacher`)، أو يستقبل حجوزات. وبالتالي ما حدا رح يظهر بـ`/teachers`
(`IsPublicForDiscovery` مش قابل للتفعيل). **هاد يوقف المرحلتين 2 و3 كاملتين عند المعلم.**

**الحل المقترح:** عند التسجيل بنوع معلم، أنشئ `Teacher { UserId = user.Id }` بنفس المعاملة، وخلّي
`GradeId` nullable (أو استبدله بـ`TeacherGradeLevel` اللي موجود أصلًا وشيله من الكيان) — تغيير
نموذج بيانات يحتاج Migration، لذلك قرار فريقكم. بديل: endpoint أدمن يربط `Teacher` بمستخدم.

**لما ينحل:** بننفّذ مباشرة (بالفرونت): (أ) حقول ملف المعلم بنموذج التسجيل + نداء `UpdateProfile`
بعد `Register` (bio، qualifications، experienceYears 0–60، serviceArea، languages، supportsOnline/
InPerson، أسعار الساعة، خيار "إظهار ملفي بدليل المعلمين" = `IsPublicForDiscovery`)، (ب) صفحة
"تعديل ملفي العام"، (ج) محرّر أوقات التوفّر، (د) دروسي المجدولة، (هـ) لوحة طلبات الحجز.

## 🟠 P1-2 — `Course/GetPublished` ما بيدعم فلتر المعلم

**الموقع:** `CourseController.GetPublished` بياخد `DataTableRequestDto` (ما فيه `TeacherId`).
الخدمة أصلًا بتفلتر بـ`SearchValue.TeacherId` (جاهزة).

**الأثر:** صفحة المعلم بتجلب كل الكتالوج المنشور وتفلتر عندنا (حل مؤقت مقيّد بـ300 كورس).

**الحل:** `PublishedCoursesRequestDto : DataTableRequestDto { int? TeacherId }` (أو query param) وتمريره
لـ`SearchValue.TeacherId`. **لما ينحل:** بنستبدل `coursesOfTeacher` بنداء مباشر ونحذف السقف.

## 🟠 P1-3 — قوائم المواد/الصفوف/فئات الكورس (مصدر الاختيارات)

**الموقع:** `ConstantController.GetAll` (بيقبل `DataTableRequestDto` بدون `ParentId` رغم إن
`ConstantsService.GetAllAsync` بيدعمه)، و`CourseCategory` كيان منفصل عن الـConstants، وكمان
**ما في بيانات seed** للمواد والصفوف والفئات (`SeedHeper/*`).

**الأثر:** ما بنقدر نبني: نموذج إنشاء كورس (بلوحة الأدمن/المعلم)، اختيار مواد/صفوف المعلم
(`subjectIds`/`gradeIds` بـ`UpdateProfile`)، ولا فلتر مادة بدليل المعلمين (`Search.SubjectId`).

**الحل:** (1) `ParentId` بـ`Constant/GetAll`، (2) endpoints **قراءة عامة** (`[AllowAnonymous]`)
للمواد والصفوف والفئات، (3) إدخال البيانات الحقيقية (عبر `/admin/constants` الموجودة أو seed).
**لما ينحل:** `integrations/backend/constants.ts` جديد + فلاتر مادة/صف بـ`/teachers` + إعادة بناء
`course-catalog-manager.tsx` على `Course/CreateEdit`، وحذف `public-catalog*` المحلية.

## 🟠 P1-4 — لا يوجد endpoint لتسجيل طالب بكورس

ما في `Enrollment` controller/endpoint (الكيان `Enrollment` موجود). زر "سجّل"/"افتح" ببطاقة
الكورس حاليًا بيروح للتسجيل/`/my-courses` المحلي. **لما ينحل:** ربط الزر بالتسجيل الحقيقي ودفع
المحفظة.

## 🟡 P2 — تحسينات على ما هو موجود

1. **`Teacher/Search`:** لا `OrderBy` قبل `Skip/Take` (ترقيم غير ثابت)، `PageSize` بلا حد أقصى،
   وفلتر `MinRating` بيُطبَّق **بعد** الترقيم (فالإجمالي غلط). _(الفرونت يستخدمه بـ"عرض المزيد" بلا
   فلتر تقييم حاليًا.)_
2. **`CourseListItemDto`:** أضيفوا لما يتوفر: عدد الدروس، عدد المسجّلين، تقييم الكورس، الصف/المستوى
   (`GradeId` موجود بالإدخال فقط)، وصورة الغلاف. الواجهة جاهزة وبتظهرها تلقائيًا (الحقول موجودة
   اختيارية بـ`BackendCourseRow`).
3. **`TeacherProfileDto`:** علم توثيق المعلم (`IsVerified`) — الفرونت أزال شارة "موثّق" الثابتة
   لغياب البيانات؛ ونصوص التقييمات (endpoint يرجّع `Review`) لقسم "آراء الطلاب"؛ وعدد الطلاب.
4. **`Teacher.ProfileImage`:** وضّحوا الصيغة (رابط كامل أم اسم ملف؟) ومين بيخدمها، ولا يوجد endpoint
   رفع صورة. الفرونت بيعرض الصورة لو كانت رابطًا صالحًا وإلا الأيقونة البديلة.
5. **الحجز (`Booking`):**
   - الواقع بالكود (`BookingService`): `Submit` → `Pending`؛ `Decide` (قبول) بيخصم من محفظة الطالب
     (لو الرصيد كافٍ، وإلا "رصيد المحفظة غير كافٍ") ويقتطع عمولة افتراضية 10% ويودّع للمعلم، وبيحوّل
     الحالة **مباشرة إلى `Confirmed`** — قيمة `Accepted` بالـenum ما بتُستخدم أبدًا. `Complete`
     للمعلم فقط من `Confirmed`، و`Rate` للطالب بعد `Completed`. وثّقوا هالآلة رسميًا (وهل `Accepted`
     محذوفة أم مخطط لها)، وسياسة الإلغاء والاسترداد بعد الخصم. **مطلوب قرار منتج قبل بناء واجهة
     الحجز** (الفرونت رح يعرض: لم يُقبل بعد / مؤكّد / مكتمل / مرفوض / ملغى).
   - `Date` (`DateTime`) و`StartTime` (`TimeSpan`) بدون منطقة زمنية — حدّدوا المنطقة (الأردن؟) أو ارجعوا UTC.
   - `Booking/Cancel` و`Complete` بياخدوا `bookingId` كـquery/form وحيد؛ وثّقوا الشكل.
6. **`Lesson`:** ما في `Complete` (الفرونت كان فاهم عكس ذلك من تقرير سابق). تأكدوا إذا مطلوب.
7. **`Register`/الطالب:** كيان `Student` (`int Id`، `FatherId`) منفصل عن `User` ولا كود ينشئه —
   بوابة ولي الأمر غير فعّالة (موثّق بـ`docs/api/frontend-integration-status.md`).
8. **Seed:** `UserSeed.cs` بيزرع أنواع المستخدمين 1..4 (الطالب=2، المعلم=3) بينما `UserTypeIds` بالكود
   الطالب=3، المعلم=4، ولي الأمر=5؛ وفيه كلمة مرور أدمن نصية بالمستودع. تحقّقوا بـ
   `SELECT Id, Name FROM UserTypes` ووحّدوا. (تفاصيل: `docs/AUTH_FRONTEND_INTEGRATION.md` بالباك.)

---

## العقد اللي الفرونت معتمد عليه (لا تغيّروه بدون إبلاغ)

| النقطة                           | الشكل المتوقّع                                                                    |
| -------------------------------- | -------------------------------------------------------------------------------- |
| `POST /api/Course/GetPublished`  | `{ recordsFiltered, totalCount, data: CourseListItemDto[] }`، `PageSize` ≤ 50    |
| `GET /api/Course/GetById?id=`    | `CourseListItemDto` أو 404 (غير منشور/غير موجود)                                 |
| `POST /api/Teacher/Search`       | `{ totalCount, data: TeacherProfileDto[] }` للمعلمين `IsPublicForDiscovery` فقط  |
| `GET /api/Teacher/PublicProfile` | `TeacherProfileDto` أو 404                                                       |
| `GET /api/Teacher/Availability`  | قائمة `TeacherAvailability` (جدول أسبوعي متكرر، `TimeSpan` كنص `HH:mm:ss`)       |
| أسماء الحقول                     | camelCase (الافتراضي)، وأي تغيير اسم/نوع = تعديل مقابل بـ`integrations/backend`. |
