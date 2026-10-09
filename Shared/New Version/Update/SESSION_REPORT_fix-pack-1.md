WP: QA / أداء | الجلسة: Claude — fix-pack-1 | التاريخ: 2026-10-09

السبب الجذري لأخطاء Vercel وGitHub والاختبارات (واحد):
ملفات دفعة 4 لم تُنسخ: lib/enums.ts (CourseStatus/courseStatusLabel/courseStatusTone)، integrations/backend/lessons.ts (groupId اختياري)،
components/teacher/course-seams.ts، components/teacher/group-students-tab.tsx، routes/_authenticated/teacher.courses.tsx.

- Vercel: MISSING_EXPORT "CourseStatus" من src/lib/enums.ts (يستورده lib/teacher-courses.ts من دفعة 5).
- GitHub typecheck: groupId (LessonInput) + CourseStatus + courseStatusLabel/Tone.
- npm test: 3 اختبارات فشلت بملف teacher-courses.test.ts (من 323).
  التحقق: قارنت كل ملفات الدفعات 1..5 بمشروعك — الباقي مطبّق (فروق Prettier فقط). ملاحظة: بدون course-seams.ts الجديد يبقى زر «إضافة درس» معطّلًا دائمًا.

الإصلاحات (fix-pack-1.zip):

1. الأخطاء أعلاه: enums.ts و lessons.ts مُرقَّعان على نسختك المنسّقة؛ + الملفات الثلاثة الناقصة.
2. أداء الجوال (PageSpeed 64: FCP 5.2s / LCP 5.8s):
   - __root.tsx: ملف خطوط Google لم يعد يحجب أول رسم (حقن بسكربت + noscript).
   - cookie-consent.tsx: البانر يظهر بعد 3 ثوانٍ؛ كان نصه هو عنصر LCP بتأخير 2.46s.
   - analytics.ts: posthog-js بـimport() ديناميكي بعد موافقة الكوكيز فقط (يزيل الحزمة + polyfills core-js «Legacy JavaScript» من التحميل الأول).
   - styles.css: hero-bob عبر الخاصية translate لتفادي تعارض الأنيميشن غير المركّب (hero-pop/hero-bob).
3. generate-sitemap.mjs: حذف /pricing (لا يوجد route → 404 بالـSEO check).
4. package.json: engines.node = "22.x" (تحذير Vercel: >=22 يترقّى تلقائيًا).

لم يُعالَج (قرار منك): Sentry Replay داخل الحزمة الأولى (instrument.client.ts) — أكبر مصدر لـ«JS غير مستخدم»؛ وVITE_SITE_URL بـVercel (الافتراضي بالكود pixely-frame-magic.vercel.app).
بعد النسخ: npm run format ثم npm run validate (ملفاتي لم تمرّ على Prettier بيئتي).
