# حالة الربط بين الباك اند والفرونت اند — تدقيق شامل (كل Endpoint)

> مصدر هذا الملف: مقارنة مباشرة بين كل الـcontrollers الفعلية بالباك اند
> (8 ملفات، 32 endpoint) وكل نداء فعلي موجود بـ`src/integrations/backend/*.ts`
> — مش قائمة مبنية على الذاكرة أو الافتراض. أُعدّ بعد جلسة عمل طويلة على
> ربط المشروعين، ويُحدَّث كل ما تغيّر شي فعليًا (لا تُبقيه "صورة لحظة"
> قديمة — عدّله وقت أي تغيير حقيقي).

## AuthController (3/3 مربوطة)

| Endpoint                  | مربوط؟ | ملاحظات                                                |
| ------------------------- | ------ | ------------------------------------------------------ |
| `POST /api/Auth/Login`    | ✅     | `auth.ts: login()`                                     |
| `POST /api/Auth/Register` | ✅     | `auth.ts: register()` — يدعم كل الأدوار (`userTypeId`) |
| `POST /api/Auth/Logout`   | ✅     | `auth.ts: logout()`                                    |

## UserController (5/8 مربوطة)

| Endpoint                            | مربوط؟      | ملاحظات                                                       |
| ----------------------------------- | ----------- | ------------------------------------------------------------- |
| `POST /api/User/GetAll`             | ✅          | `admin-users.ts: listBackendUsers()` — ترقيم صفحات حقيقي      |
| `GET /api/User/CreateEditModal`     | ✅          | نفسها مستخدمة لجلب Genders/UserTypes بالتسجيل كمان            |
| `POST /api/User/CreateEdit`         | ✅          | إنشاء/تعديل مستخدم من شاشة الأدمن                             |
| `DELETE /api/User/Delete`           | ✅          |                                                               |
| `GET /api/User/MyProfileModal`      | ✅          | `auth.ts` — أساس بناء الجلسة بعد الدخول                       |
| `GET /api/User/ChangePasswordModal` | ⬜          | لا حاجة فعلية — النموذج ثابت (3 حقول)، ما بيرجّع شي ديناميكي  |
| `POST /api/User/MyProfile`          | ✅ **جديد** | `auth.ts: updateMyProfile()` — كان مربوط بديمو فقط لحد الآن   |
| `POST /api/User/ChangePassword`     | ✅ **جديد** | `auth.ts: changeMyPassword()` — ما كان موجود إطلاقًا بالفرونت |

## ConstantController (4/4 مربوطة)

| Endpoint                            | مربوط؟ | ملاحظات                                  |
| ----------------------------------- | ------ | ---------------------------------------- |
| `POST /api/Constant/GetAll`         | ✅     | `admin-constants.ts` — ترقيم صفحات حقيقي |
| `GET /api/Constant/CreateEditModal` | ✅     |                                          |
| `POST /api/Constant/CreateEdit`     | ✅     |                                          |
| `DELETE /api/Constant/Delete`       | ✅     |                                          |

## PageController (4/4 مربوطة)

| Endpoint                        | مربوط؟ | ملاحظات                                                                                            |
| ------------------------------- | ------ | -------------------------------------------------------------------------------------------------- |
| `POST /api/Page/GetAll`         | ✅     | `admin-pages.ts` — بدون ترقيم صفحات (قرار مقصود: أقصى 72 صف حاليًا، بنية تطبيق لا بيانات مستخدمين) |
| `GET /api/Page/CreateEditModal` | ✅     |                                                                                                    |
| `POST /api/Page/CreateEdit`     | ✅     |                                                                                                    |
| `DELETE /api/Page/Delete`       | ✅     |                                                                                                    |

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

| Endpoint                           | مربوط؟ | ملاحظات                                                              |
| ---------------------------------- | ------ | -------------------------------------------------------------------- |
| `GET /api/Parent/MyChildren`       | ✅     | `parent.ts` — بيرجع دايمًا مصفوفة فاضية (فجوة باك اند، مو خطأ فرونت) |
| `GET /api/Parent/ChildAttendance`  | ✅     | نفس السبب                                                            |
| `GET /api/Parent/ChildExamResults` | ✅     | نفس السبب                                                            |

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

---

## الخلاصة الرقمية

- **32 endpoint حقيقي بالباك اند.**
- **29 مربوط فعليًا وشغال** (بما فيها الاثنين الجداد هالجولة: تعديل
  الملف الشخصي، تغيير كلمة المرور).
- **1 بدون حاجة فعلية** (`ChangePasswordModal` — نموذج ثابت).
- **1 بدون حاجة أصلاً** (`HomeController.Index`).
- **3 مربوطة كودًا بس غير فعّالة عمليًا** (Parent — بانتظار endpoint ربط
  الأبناء وحل مسألة كيان Student من تيم الباك اند).

**يعني: لا يوجد أي endpoint حقيقي بالباك اند غير مستخدم بالفرونت لسبب
إهمال — الوحيد الناقص فعليًا (تعديل الملف/تغيير كلمة المرور) اكتُشف
وصُلح بهالجولة.** الفجوة الوحيدة المتبقية (بوابة ولي الأمر) سببها الباك
اند حصرًا، موثّقة ومفصولة بوضوح أعلاه.

## كيف تحدّث هذا الملف مستقبلًا

لما يُضاف controller/endpoint جديد بالباك اند، أو يُربط/يُبنى شي جديد
بالفرونت: عدّل الجدول المطابق هون بنفس الرد يلي بيصير فيه التغيير — لا
تأجّله لجولة تدقيق لاحقة، لأنه هيك بالضبط صار الوضع قبل هالتدقيق.
