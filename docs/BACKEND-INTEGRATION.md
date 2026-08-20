# الربط مع الباك اند (ASP.NET)

## الوضع الحالي

| العنصر | الحالة |
| --- | --- |
| `POST /api/Auth/Login` | ✅ مستخدم فعلياً في `src/integrations/backend/auth.ts` |
| `GET /api/Auth/Logout` | ✅ مستخدم |
| كل بيانات RBAC (وحدات/أدوار/صفحات/مستخدمون) | ⏳ بيانات ثابتة مؤقتة في `src/lib/rbac-static-data.ts` |
| بيانات لوحات التحكم (طالب/معلم/مشرف/ولي أمر) | ⏳ أرقام عرض ثابتة داخل الصفحات |
| التسجيل / نسيت كلمة السر / تحقق البريد | ⏳ صفحات موجودة ومعطّلة («قيد التطوير») |

## نقاط الاتصال في الكود

- `src/integrations/backend/client.ts` — `apiClient.get/post`، القاعدة من
  `VITE_API_BASE_URL`، يرسل الكوكيز (`credentials: "include"`).
- `src/integrations/backend/auth.ts` — الدخول/الخروج + علم الجلسة المحلي.
- `src/integrations/backend/auth-middleware.ts` — `requireAuth` لـ server
  functions؛ **مؤقتاً يعتبر كل طلب أدمن** ولا يرفض شيئاً.
- `src/lib/rbac.server.ts` — نقطة الاستبدال الوحيدة لبيانات الصلاحيات.

## ما نحتاجه من فريق الباك اند

### 1. جلسة/مستخدم حالي (أعلى أولوية)

```
GET /api/Auth/Me -> { id, fullName, email, phone, gender, avatarUrl,
                      status, roleId, roleName, isAdmin }
```
بدونه لا يمكن معرفة دور المستخدم، والفرونت مجبر حالياً على اعتبار أي دخول ناجح
«أدمن». يجب أن يعمل مع كوكي الجلسة نفسها.

توضيح مطلوب: هل الجلسة كوكي HttpOnly أم Bearer token؟ إذا كانت Token، سنضيف
تخزينه وترويسة `Authorization` في `client.ts`.

### 2. الصلاحيات

```
GET  /api/Access/Me                  -> الوحدات المفعّلة + الصفحات المسموحة + مفاتيح كل صفحة
GET  /api/Modules                    -> قائمة وحدات النظام
PUT  /api/Modules/{id}/enabled       -> تفعيل/تعطيل وحدة
GET  /api/Roles                      -> أنواع المستخدم
POST /api/Roles                      -> إضافة
PUT  /api/Roles/{id}                 -> تعديل
DELETE /api/Roles/{id}               -> حذف
GET  /api/Roles/{id}/permissions     -> شجرة الصلاحيات + الممنوح
PUT  /api/Roles/{id}/permissions     -> حفظ جماعي: ["{pageId}:{permissionKey}", …]
```

### 3. المستخدمون

```
GET    /api/Users?status=&gender=&roleId=&search=&page=&pageSize=
POST   /api/Users
PUT    /api/Users/{id}
DELETE /api/Users/{id}
PUT    /api/Users/{id}/status
POST   /api/Users/{id}/reset-password
```

### 4. الحساب

```
POST /api/Auth/Register
POST /api/Auth/ForgotPassword
POST /api/Auth/ResetPassword
POST /api/Auth/VerifyEmail
```

### 5. بيانات المحتوى (مرحلة لاحقة)

المكتبة والدروس، الكورسات، الاختبارات والتصحيح، الشهادات، المدفوعات،
التقارير للمشرف/ولي الأمر، الإشعارات.

## متطلبات تقنية

1. **CORS**: السماح لأصل الفرونت مع `AllowCredentials` (مطلوب لأن الطلبات
   ترسل الكوكيز).
2. **إجبار الصلاحيات على السيرفر**: إخفاء الزر في الواجهة ليس حماية — كل
   endpoint يجب أن يتحقّق من دور/مفتاح المستخدم بنفسه.
3. **الأسماء ثنائية اللغة**: نرجو تضمين `nameEn` مع `name` للوحدات والصفحات
   والأدوار حتى تعمل النسخة الإنجليزية بدون ترجمة يدوية.
4. **شكل موحّد للأخطاء**: `{ success, message }` (متوافق مع `OperationResult`
   الحالي) — `client.ts` يقرأ `message` ويعرضه للمستخدم.
5. **العملة**: شيكل ILS (₪).

## خطوات التبديل عند توفّر الـ API

1. أضف دوال جديدة في `src/integrations/backend/` لكل مجموعة endpoints.
2. استبدل جسم دوال `src/lib/rbac.server.ts` بنداءات API (نفس التوقيعات).
3. اربط `requireAuth` بـ `GET /api/Auth/Me` واحذف `userId` الثابت.
4. احذف `src/lib/rbac-static-data.ts`.
5. لا حاجة لتعديل أي مكوّن واجهة.
