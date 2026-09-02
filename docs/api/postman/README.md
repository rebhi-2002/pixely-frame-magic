# Postman API Reference

هذه المجلدات تخص **Postman فقط**، وهي منفصلة عن توثيق المنتج والمعمارية والـUI/UX.

## الملفات

- `acadimia-current-backend.postman_collection.json`: جميع endpoints الموجودة حاليًا في Swagger، مرتبة حسب Auth وUser وPage وConstant وUserPermission.
- `acadimia-current-backend.postman_environment.json`: متغيرات `baseUrl`, `email`, `password`, وIDs المستخدمة في الأمثلة.

## الاستيراد والاختبار

استورد Environment ثم Collection. ضع البريد وكلمة المرور في Environment، وتأكد من تفعيل Cookie Jar في Postman. نفّذ `POST /api/Auth/Login` أولًا؛ الباك إند يستخدم ASP.NET Identity cookie ولا يعيد JWT token. بعد نجاح Login اختبر `MyProfileModal` وعمليات القراءة، ثم mutations، ثم Logout.

كل mutation يجب أن يفحص `success` داخل `OperationResult` حتى لو كان HTTP status يساوي 200. عند فشل 401/403 راجع cookie وCORS وحماية endpoint، وعند 400 راجع أسماء الحقول وأنواعها.

## نطاق النسخة

هذه المجموعة توثق endpoints المنشورة حاليًا فقط. لا تشمل الكورسات والدروس والاختبارات والتسجيلات والشهادات والإشعارات لأنها ليست ضمن العقد الحالي المنشور. عند إضافة الفريق endpoints جديدة يجب تحديث Swagger وCollection والدليل في Pull Request واحد.

## أمان

لا تحفظ كلمات مرور حقيقية داخل Environment المرفق، ولا ترفع Environment يحتوي بيانات إنتاجية. ملف Environment المرفق يحوي قيمًا فارغة أو IDs تجريبية فقط.
