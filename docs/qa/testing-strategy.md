# Frontend Testing Strategy

حاليًا بوابة التحقق الأساسية هي `npm run lint` و`npm run build`. يجب اختبار Login/Logout والـroute guard وحالات 401، إدارة المستخدمين، loading/error/empty، mobile menu، وRTL/LTR. بعد اعتماد runner رسمي تضاف unit tests للـadapters وE2E للمسارات الحرجة.

لا تثبت نسبة coverage قبل إضافة runner؛ ابدأ بتغطية كاملة للـauth/API utilities وsmoke coverage للمسارات، ثم ارفع الحد تدريجيًا.
