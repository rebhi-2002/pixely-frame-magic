# Authentication and Route Protection

تدفق الدخول الحالي هو: Login إلى `/api/Auth/Login`، حفظ cookie من الخادم، ثم قراءة `/api/User/MyProfileModal` لعرض الملف. Logout هو `POST /api/Auth/Logout`.

حاليًا `isAuthenticated()` يقرأ localStorage، و`beforeLoad` في `/_authenticated` يعتمد عليه. لذلك يمكن للمستخدم تعديل state محليًا ورؤية shell أو role screen؛ هذه مشكلة حماية واجهة وليست وحدها ثغرة بيانات إذا كان الخادم محميًا، لكنها تصبح خطيرة إذا كانت endpoints مفتوحة أو server functions تثق بالـdemo cookie.

المطلوب في الباك إند هو حماية controllers، فحص session server-side، وإرجاع 401/403. المطلوب في الفرونت هو التعامل مع 401 بمسح الجلسة وإعادة التوجيه، وعدم استخدام role محلي لتنفيذ قرار أمني.
