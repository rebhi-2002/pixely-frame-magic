WP: T1 / T3 / T4 | الجلسة: Claude — دفعة 4 (الأولوية 2) | التاريخ: 2026-10-07

المهام:

- T1-01 (قائمة كورسات المعلم): قيد المراجعة — teacher.courses.tsx (Course/GetAll؛ Q-01: يفلتر بالباك اند، لم يُجرَّب حيًا)
- T1-07 (إكمال shell): جزئي — resolveCourseDeliveryType صار يعمل من DTO؛ courseToDraft/resolveGroupId تنتظر B-2/B-5
- T4-01 (قائمة الدروس) + T4-02/03 (إضافة) + T4-05 (اجتماع) + T4-06 (إلغاء): قيد المراجعة — lessons-tab.tsx
- T4-04 (تعديل درس): متوقف — Lesson/Update يحتاج orderIndex/قاعة/اجتماع والصف لا يحملها (طلب: إضافتها لـLessonScheduleRowDto)
- T3-01..04 (طلاب المجموعة): جاهز ومعطّل صراحةً حتى resolveGroupId (B-2)

الملفات الجديدة: lib/teacher-courses.ts، test-units/teacher-courses.test.ts
المعدّلة: lib/enums.ts (+CourseStatus؛ نسخة تراكمية تشمل إضافات دفعة 2)، integrations/backend/lessons.ts (groupId اختياري)،
components/teacher/{lesson-form-schema.ts, lesson-form-dialog.tsx (groupId اختياري)، course-seams.ts, lessons-tab.tsx, group-students-tab.tsx}،
routes/_authenticated/teacher.courses.tsx

طلب تغيير (CR-بسيط): lessons.ts مجمّد — جُعل groupId اختياريًا في LessonInput (يُرسل فقط لو معروفًا) بناءً على Q-02b.
فحص Claude التقريبي: 10 اختبارات جديدة (الإجمالي 54/54 بالمشغّل المبسّط).
نتيجة npm run validate: لم تُشغَّل.

افتراضات: اقتراح orderIndex = عدد الدروس + 1 (قابل للتعديل)؛ الإلغاء يظهر لكل درس لم يبدأ (الرد بلا حالة)؛ بيانات الاجتماع تُدخل من الصفر (لا قيم حالية بالرد).
أسئلة للباك اند: (1) هل DTO Lesson/Create يقبل غياب GroupId؟ (2) إضافة orderIndex/room/meeting*/status لصف GetSchedule.
الخطوة التالية: تشغيل validate + اختبار حيّ بحسابات الأدوار؛ ثم WP-QA (QA-08 تنظيف، تحديث README/CHANGELOG).
