WP: S7 / S8 / S5 / S6 | الجلسة: Claude — دفعة 1 (الأولوية 2) | التاريخ: 2026-10-07

المهام:

- S7-01/03/04/05 (سجل الحضور): قيد المراجعة — attendance.tsx (جدول records + إحصاءات + فلاتر from/to/course + حالات)
- S8-01/02/03 (نتائج الامتحانات): قيد المراجعة — exam-results.tsx (percentage أو examPercent، فلتر كورس)
- S5-01/02/03 (تفاصيل الدرس): قيد المراجعة — lesson.$id.tsx (حضوري: قاعة/«الموقع غير متوفر»، أونلاين: منصة + انضمام آمن + تعليمات)
- S6-01/03/04 (تفاصيل الكورس المسجّل): قيد المراجعة — enrolled-course.$id.tsx (مجموعات بأيامها السبت أولًا + دروس)

الملفات الجديدة:

- src/lib/route-id.ts, attendance-view.ts, exam-results.ts, lesson-detail.ts, course-detail.ts
- src/test-units/route-id.test.ts, attendance-view.test.ts, exam-results-view.test.ts, lesson-detail.test.ts, course-detail.test.ts
  الملفات المعدّلة (استُبدلت الهياكل):
- src/routes/_authenticated/attendance.tsx, exam-results.tsx, lesson.$id.tsx, enrolled-course.$id.tsx

نتيجة npm test (المستخدم، قبل الدفعة): 26 ملفًا / 258 اختبارًا نجحت (role-probe صار أخضر). لم يُشغَّل format/validate.
فحص Claude التقريبي للدفعة: 26 اختبارًا نقيًا نجحت (مشغّل مبسّط)، وlib/test-units بلا أخطاء tsc.

افتراضات / أسئلة مفتوحة:

- فلتر الكورس بالحضور/الامتحانات يأخذ قائمته من Student/Dashboard.activeCourses (لا endpoint آخر)؛ لو فشل يختفي الفلتر فقط.
- نهاية مدى الحضور تُرسَل T23:59:59 كي يدخل يوم النهاية.
- AttendanceRateCard لم تعد مستخدمة بصفحة الحضور (الأرقام الآن من Student/Attendance نفسه ومتجانسة مع الفلتر)؛ الملف باقٍ، يُحذف بـQA-08 إن لم يُستخدم.
- status الدرس نص حرّ من الباك اند (string) فيُعرض كما هو.
- Guard الدرس بقي student_schedule كما بالهيكل (الـhandoff ذكر student_my_courses؛ قرّر المالك).

طلبات تغيير (CR): لا.
الخطوة التالية: npm run format && npm run validate على الدفعة، ثم دفعة 2: booking.$id + booking-payment-card + reschedule-requests-panel (S2/W1/S3-02)، ثم teacher.bookings (T5) و teacher.courses/lessons-tab (T1/T4).
