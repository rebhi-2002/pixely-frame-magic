# Route Map

## Public routes

تشمل الصفحة الرئيسية، about، how-it-works، courses، pricing، blog، contact، help، privacy، terms، teacher registration، login، signup، forgot/reset password، verify email، وcertificate/invite routes.

## Authenticated routes

كل ما تحت `src/routes/_authenticated` يمر عبر layout مشترك. توجد مسارات عامة للطالب مثل dashboard وlibrary وmy-courses وexam-simulator وflashcards وmistakes-bank وachievements وcertificates و**wallet** (محفظة حقيقية، جديدة) وsettings (تعديل ملف شخصي + تغيير كلمة مرور حقيقيين الآن)، ومسارات أدوار للإدارة والمعلم والمشرف وولي الأمر.

## حراسة المسارات

`/_authenticated/route.tsx` يستخدم `beforeLoad` و`isAuthenticated()` المحلي لإعادة المستخدم إلى Login عند غياب حالة محلية. هذا guard يمنع العرض الاعتيادي لكنه قابل للتلاعب ولا يحمي API. يجب أن يتزامن مستقبلاً مع endpoint خادم للمستخدم الحالي ويعالج 401/403.

## قاعدة إضافة route

أضف route عندما توجد قيمة مستخدم واضحة أو flow مستقل. قبل الإضافة حدّد loading/error/empty، صلاحية العرض، endpoint المتوقع، وحالة عدم توفر API. لا تضف صفحة كاملة تعتمد على mock data دون وسم preview.
