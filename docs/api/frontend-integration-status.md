# حالة الربط بين الباك اند والفرونت اند — تدقيق شامل (كل Endpoint)

> مصدر هذا الملف: مقارنة مباشرة بين كل الـcontrollers الفعلية بالباك اند
> (12 ملف، 61 endpoint) وكل نداء فعلي موجود بـ`src/integrations/backend/*.ts`
> — مش قائمة مبنية على الذاكرة أو الافتراض. أُعدّ بعد جلسة عمل طويلة على
> ربط المشروعين، ويُحدَّث كل ما تغيّر شي فعليًا (لا تُبقيه "صورة لحظة"
> قديمة — عدّله وقت أي تغيير حقيقي).

## AuthController (4/4 مربوطة)

| Endpoint                            | مربوط؟ | ملاحظات                                                                                         |
| ----------------------------------- | ------ | ----------------------------------------------------------------------------------------------- |
| `POST /api/Auth/Login`              | ✅     | `auth.ts: login()`                                                                              |
| `POST /api/Auth/Register`           | ✅     | `auth.ts: register()` — يدعم كل الأدوار (`userTypeId`)                                          |
| `GET /api/Auth/RegistrationOptions` | ✅     | `auth.ts: loadRegistrationOptions()` — الجنس + أنواع الحسابات (عام)؛ احتياطي: `CreateEditModal` |
| `POST /api/Auth/Logout`             | ✅     | `auth.ts: logout()`                                                                             |

## UserController (5/8 مربوطة)

| Endpoint                            | مربوط؟      | ملاحظات                                                      |
| ----------------------------------- | ----------- | ------------------------------------------------------------ |
| `POST /api/User/GetAll`             | ✅          | `admin-users.ts: listBackendUsers()` — ترقيم صفحات حقيقي     |
| `GET /api/User/CreateEditModal`     | ✅          | نفسها مستخدمة لجلب Genders/UserTypes بالتسجيل كمان           |
| `POST /api/User/CreateEdit`         | ✅          | إنشاء/تعديل مستخدم من شاشة الأدمن                            |
| `DELETE /api/User/Delete`           | ✅          |                                                              |
| `GET /api/User/MyProfileModal`      | ✅          | `auth.ts` — أساس بناء الجلسة بعد الدخول                      |
| `GET /api/User/ChangePasswordModal` | ⬜          | لا حاجة فعلية — النموذج ثابت (3 حقول)، ما بيرجّع شي ديناميكي  |
| `POST /api/User/MyProfile`          | ✅ **جديد** | `auth.ts: updateMyProfile()` — كان مربوط بديمو فقط لحد الآن  |
| `POST /api/User/ChangePassword`     | ✅ **جديد** | `auth.ts: changeMyPassword()` — ما كان موجود إطلاقًا بالفرونت |

## ConstantController (4/4 مربوطة)

| Endpoint                            | مربوط؟ | ملاحظات                                  |
| ----------------------------------- | ------ | ---------------------------------------- |
| `POST /api/Constant/GetAll`         | ✅     | `admin-constants.ts` — ترقيم صفحات حقيقي |
| `GET /api/Constant/CreateEditModal` | ✅     |                                          |
| `POST /api/Constant/CreateEdit`     | ✅     |                                          |
| `DELETE /api/Constant/Delete`       | ✅     |                                          |

## PageController (4/4 مربوطة)

| Endpoint                        | مربوط؟ | ملاحظات                                                                                           |
| ------------------------------- | ------ | ------------------------------------------------------------------------------------------------- |
| `POST /api/Page/GetAll`         | ✅     | `admin-pages.ts` — بدون ترقيم صفحات (قرار مقصود: أقصى 72 صف حاليًا، بنية تطبيق لا بيانات مستخدمين) |
| `GET /api/Page/CreateEditModal` | ✅     |                                                                                                   |
| `POST /api/Page/CreateEdit`     | ✅     |                                                                                                   |
| `DELETE /api/Page/Delete`       | ✅     |                                                                                                   |

## UserPermissionController (2/2 مربوطة)

| Endpoint                                         | مربوط؟ | ملاحظات                |
| ------------------------------------------------ | ------ | ---------------------- |
| `GET /api/UserPermission/GetUserTypePermissions` | ✅     | `admin-permissions.ts` |
| `POST /api/UserPermission/SavePermissions`       | ✅     |                        |

## WalletController (10/10 مربوطة)

| Endpoint                                       | مربوط؟ | ملاحظات                                          |
| ---------------------------------------------- | ------ | ------------------------------------------------ |
| `GET /api/Wallet/MyWallet`                     | ✅     |                                                  |
| `POST /api/Wallet/GetTransactionHistory`       | ✅     | ترقيم صفحات حقيقي (10/صفحة)                      |
| `POST /api/Wallet/SubmitTopUpRequest`          | ✅     | multipart (صورة إشعار)                           |
| `POST /api/Wallet/SubmitWithdrawalRequest`     | ✅     |                                                  |
| `GET /api/Wallet/GetPendingTopUpRequests`      | ✅     | شاشة أدمن حقيقية (`wallet-requests-manager.tsx`) |
| `GET /api/Wallet/GetPendingWithdrawalRequests` | ✅     |                                                  |
| `POST /api/Wallet/VerifyTopUpRequest`          | ✅     |                                                  |
| `POST /api/Wallet/DecideWithdrawalRequest`     | ✅     |                                                  |
| `POST /api/Wallet/CompleteWithdrawal`          | ✅     |                                                  |
| `GET /api/Wallet/GetReceiptImage`              | ✅     | رابط مباشر (`<a href>`)، مو نداء JSON            |

## ParentController (3/3 مربوطة بالكود — 🔴 غير فعّالة عمليًا)

| Endpoint                           | مربوط؟ | ملاحظات                                                             |
| ---------------------------------- | ------ | ------------------------------------------------------------------- |
| `GET /api/Parent/MyChildren`       | ✅     | `parent.ts` — بيرجع دايمًا مصفوفة فاضية (فجوة باك اند، مو خطأ فرونت) |
| `GET /api/Parent/ChildAttendance`  | ✅     | نفس السبب                                                           |
| `GET /api/Parent/ChildExamResults` | ✅     | نفس السبب                                                           |

**🔴 فجوة باك اند حرجة (مش شغل فرونت):**

1. `IParentService.LinkChildAsync` موجودة بالسيرفس، **بدون أي endpoint
   بالـController** — ولي الأمر ما فيه طريقة فعلية يربط ابنه بحسابه.
2. "الطالب" (`Student`, `int Id`) كيان منفصل عن `User` (Identity) —
   **صفر كود بالمشروع كله بينشئ صف `Student`**. حتى لو أضفنا endpoint
   الربط، ما في طلاب موجودين للربط معهم أصلاً.

## HomeController (0/1 — لا حاجة)

| Endpoint | مربوط؟ | ملاحظات                                               |
| -------- | ------ | ----------------------------------------------------- |
| `GET /`  | —      | Redirect لـswagger فقط، بدون منطق فعلي — لا يستحق ربط |

## CourseController (2/7 مربوطة)

| Endpoint                                  | مربوط؟      | ملاحظات                                                                                                                        |
| ----------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `POST /api/Course/GetPublished`           | ✅ **جديد** | `courses.ts: listPublishedCoursesPage()/listAllPublishedCourses()` — كتالوج `/courses` وبروفايل المعلم (عام، منشور فقط، حد 50) |
| `GET /api/Course/GetById`                 | ✅ **جديد** | `courses.ts: getPublishedCourse()` — صفحة `/course/$id`                                                                        |
| `POST /api/Course/GetAll`                 | ⬜          | أدمن/معلم فقط — لمدير الكورسات (ينتظر P1-3)                                                                                    |
| `GET /api/Course/GetMineById`             | ⬜          | معلم — لوحة المعلم (ينتظر P1-1)                                                                                                |
| `GET /api/Course/GetGroupStudents`        | ⬜          | معلم — طلاب المجموعة (ينتظر P1-1)                                                                                              |
| `POST /api/Course/CreateEdit`             | ⬜          | ينتظر P1-1 وP1-3                                                                                                               |
| `POST /api/Course/ConfigureGroupSchedule` | ⬜          | ينتظر P1-1                                                                                                                     |

## TeacherController (4/9 مربوطة)

| Endpoint                            | مربوط؟      | ملاحظات                                                                                 |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------- |
| `POST /api/Teacher/Search`          | ✅ **جديد** | `teachers.ts: searchTeachers()` — `/teachers`                                           |
| `GET /api/Teacher/PublicProfile`    | ✅ **جديد** | `teachers.ts: getTeacherPublicProfile()` — `/teacher/$id`                               |
| `GET /api/Teacher/Availability`     | ✅ **جديد** | `teachers.ts: getTeacherAvailability()` — قسم "أوقات التوفّر" بـ`/teacher/$id` (عرض فقط) |
| `POST /api/Teacher/UpdateProfile`   | ⬜          | ينتظر P1-1 (لا صف `Teacher` لحساب معلم)                                                 |
| `POST /api/Teacher/SetAvailability` | ⬜          | ينتظر P1-1                                                                              |
| `POST /api/Teacher/GetAll`          | ⬜          | أدمن (بدون تحقق صلاحيات حاليًا — P0-1)                                                   |
| `GET /api/Teacher/CreateEditModal`  | ⬜          | أدمن                                                                                    |
| `POST /api/Teacher/CreateEdit`      | ⬜          | أدمن — بدون `UserId` (P1-1)                                                             |
| `DELETE /api/Teacher/Delete`        | ⬜          | أدمن                                                                                    |

## BookingController (0/7 — المرحلة 2)

| Endpoint                           | مربوط؟ | ملاحظات                                        |
| ---------------------------------- | ------ | ---------------------------------------------- |
| `POST /api/Booking/Submit`         | ⬜     | طالب/ولي أمر — ينتظر P0-1 وP1-1 وقرار منتج     |
| `POST /api/Booking/Decide`         | ⬜     | معلم — القبول يخصم المحفظة (بيصير `Confirmed`) |
| `POST /api/Booking/Cancel`         | ⬜     |                                                |
| `POST /api/Booking/Complete`       | ⬜     | معلم                                           |
| `POST /api/Booking/Rate`           | ⬜     | طالب بعد الاكتمال                              |
| `GET /api/Booking/MyBookings`      | ⬜     |                                                |
| `GET /api/Booking/TeacherBookings` | ⬜     | معلم                                           |

## LessonController (0/5 — المرحلة 3)

| Endpoint                           | مربوط؟ | ملاحظات           |
| ---------------------------------- | ------ | ----------------- |
| `POST /api/Lesson/Create`          | ⬜     | معلم — ينتظر P1-1 |
| `PUT /api/Lesson/Update`           | ⬜     |                   |
| `PUT /api/Lesson/ConfigureMeeting` | ⬜     |                   |
| `PUT /api/Lesson/Cancel`           | ⬜     |                   |
| `GET /api/Lesson/GetSchedule`      | ⬜     |                   |

> الجداول الأربعة أعلاه اتحقّقت من كود الباك اند الحالي (`Acadimia-main.zip`). خطة الاستكمال:
> `docs/operations/2026-09-21-remaining-integration-roadmap.md`؛ وما ينتظره الباك اند:
> `docs/operations/2026-09-21-backend-requirements.md`.

---

## الخلاصة الرقمية

**الـ32 endpoint الأصلية** (Auth/User/Constant/Page/UserPermission/Wallet/Parent/Home): بدون تغيير عن
التدقيق السابق — 29 مربوطة فعليًا، و1 بدون حاجة فعلية (`ChangePasswordModal`)، و1 بدون حاجة أصلًا
(`HomeController.Index`)، و3 مربوطة كودًا بس غير فعّالة عمليًا (Parent).

**الجديد (21 سبتمبر):**

- `Auth/RegistrationOptions`: مربوط (1).
- 4 controllers جدد = **28 endpoint**: **5 مربوطة بواجهة** (`Course/GetPublished`،
  `Course/GetById`، `Teacher/Search`، `Teacher/PublicProfile`، `Teacher/Availability`)،
  و**23 غير مربوطة** (5 كورس + 5 معلم + 7 حجز + 5 دروس + تحقّق شامل: كلها تعتمد فعليًا على P0-1
  أو P1-1 أو P1-3 — لا شيء منها "نُسي").
- **الإجمالي: 61 endpoint.**

المتبقي كله **ينتظر الباك اند** — مفصّل بـ`docs/operations/2026-09-21-backend-requirements.md`.
ما عم نسبق الأحداث ولا نضيف حلول التفافية.

## كيف تحدّث هذا الملف مستقبلًا

لما يُضاف controller/endpoint جديد بالباك اند، أو يُربط/يُبنى شي جديد
بالفرونت: عدّل الجدول المطابق هون بنفس الرد يلي بيصير فيه التغيير — لا
تأجّله لجولة تدقيق لاحقة، لأنه هيك بالضبط صار الوضع قبل هالتدقيق.
