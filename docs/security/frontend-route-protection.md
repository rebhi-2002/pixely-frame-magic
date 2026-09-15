# Frontend Route Protection: Scope and Limitations

## الوضع الحالي

مسار `/_authenticated` يحتوي `beforeLoad` يعيد المستخدم إلى `/login` عندما لا يجد الفرونت جلسة محلية. هذا مفيد لتجربة الاستخدام ومنع عرض الشاشات الداخلية للمستخدم العادي، لكنه ليس حدًا أمنيًا؛ لأن القرار يعتمد على browser state ويمكن تغييره من DevTools.

كما أن `useAccess` (`src/hooks/use-access.ts`) بيبني صلاحيات كاملة محليًا بالمتصفح لأي جلسة حقيقية (`buildFullAdminAccess`/`buildRoleAccess` بـ`rbac-client.ts`) اعتمادًا على `roleId`/`roleName` المخزّنين بـ`localStorage` — **وهاد اتساع لسطح الثقة المحلية لكل الأدوار، مش الأدمن بس** (كان الوضع السابق يقتصر على الأدمن). لذلك لا يجوز اعتبار role أو user ID الموجودين في localStorage دليل صلاحية — تحديدًا الآن أهم من أي وقت.

## الحد الأمني الصحيح

كل endpoint حساس في ASP.NET يجب أن يتحقق من cookie/session أو token ثم يطبق `[Authorize]` وpolicy/permission server-side. يجب أن تعيد الطلبات غير المصرح بها `401` أو `403`، وألا تعتمد الخدمة على cookie غير HttpOnly قادم من الفرونت لتحديد هوية المستخدم.

## خطة الانتقال

عند إضافة endpoint للمستخدم الحالي والصلاحيات، يجب أن يقرأ الفرونت session من الخادم عند بدء التطبيق، ويمسح الحالة المحلية عند `401`. عند إضافة authorization policies، تستبدل server functions الحالية التي تقرأ `academia_demo_user` بتمرير هوية موثوقة من ASP.NET، وتصبح Guards في الفرونت طبقة عرض فقط.

## معيار قبول

لا يعتبر route أو component «محميًا» حتى يثبت اختبار Postman أو E2E أن مستخدمًا بلا جلسة أو بلا permission لا يستطيع قراءة أو تعديل البيانات مباشرة من endpoint.
