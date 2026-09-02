# Security Policy

## قاعدة أساسية

حماية المسارات في المتصفح مخصصة لتجربة المستخدم فقط. مصدر الأمان الحقيقي هو الباك إند: session/cookie أو token موثوق، ثم `[Authorize]` وpolicies/permissions server-side.

## ممنوعات

لا ترفع `.env` أو مفاتيح API أو connection strings. متغيرات `VITE_*` عامة بطبيعتها وقد تصل إلى browser bundle، لذلك لا تحتوي أسرارًا. لا تستخدم `academia_demo_user` أو أي localStorage لتحديد صلاحية حقيقية.

## الإبلاغ

أرسل البلاغ بشكل خاص إلى مالك المستودع، مع وصف الأثر وخطوات إعادة الإنتاج دون إرفاق بيانات مستخدمين أو secrets. لا تنشر ثغرة غير معالجة كـissue عامة.
