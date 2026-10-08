WP: T5 | الجلسة: Claude — دفعة 3 (الأولوية 2) | التاريخ: 2026-10-07

المهام:

- T5-01/04/05 (قائمة حجوزات المعلم + تبويبات + أزرار الصف): قيد المراجعة — teacher.bookings.tsx
- T5-06 (قرار إعادة الجدولة): قيد المراجعة — decide-reschedule-dialog.tsx + قسم «طلبات إعادة الجدولة»
- ربط DecideBookingDialog / CompleteBookingDialog الموجودين بصفوف القائمة (T5-02/03).
  ⛔ التشغيل الحيّ يعتمد على B-6 (500 في Booking/TeacherBookings). لو بقي 500 تظهر حالة خطأ برمز الاستجابة.

الملفات الجديدة: lib/teacher-bookings.ts، test-units/teacher-bookings.test.ts، components/teacher/decide-reschedule-dialog.tsx
المستبدَل: routes/_authenticated/teacher.bookings.tsx

فحص Claude التقريبي: 6 اختبارات جديدة نقية (الإجمالي 44/44 بالمشغّل المبسّط).
نتيجة npm run validate: لم تُشغَّل.

افتراضات: قبول/رفض للحالة 1 فقط؛ إنهاء للحالة 5 فقط (بدون قيد وقت، والباك اند يرفض). تبويب افتراضي «بانتظار القرار». ترتيب بالأحدث طلبًا.
فلتر إعادة الجدولة: «بانتظار القرار» (status=1) و«الكل».
الخطوة التالية: دفعة 4: teacher.courses (T1-01) + إكمال teacher.course.$id (T1-07) + lessons-tab (T4).
