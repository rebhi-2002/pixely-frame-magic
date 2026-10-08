WP: S2 / W1 / S3 / S4 | الجلسة: Claude — دفعة 2 (الأولوية 2) | التاريخ: 2026-10-07

المهام:

- S2-01/02/05 + S4-02/03 (تفاصيل الحجز): قيد المراجعة — booking.$id.tsx
- W1-01/05 (بطاقة الدفع + تنبيه الرصيد): قيد المراجعة — booking-payment-card.tsx
- S3-02 (قائمة طلبات إعادة الجدولة): قيد المراجعة — reschedule-requests-panel.tsx
- RescheduleStatus (+BookingPaymentStatus) أُضيفا لـenums.ts كما طلب HANDOFF.

الملفات: lib/enums.ts (تعديل: إضافة فقط)، lib/booking-detail.ts، lib/reschedule-requests.ts، test-units/booking-detail.test.ts (جديدة)،
components/student/booking-payment-card.tsx + my-courses/reschedule-requests-panel.tsx + routes/_authenticated/booking.$id.tsx (استبدال الهياكل).

فحص Claude التقريبي: 12 اختبارًا جديدًا نقيًا نجحت (الإجمالي مع الدفعة 1: 38/38)؛ لا أخطاء tsc بملفات lib/test.
نتيجة npm run validate: لم تُشغَّل (عند المستخدم).

افتراضات: لا حقل isRated → زر التقييم يظهر لكل Completed والباك اند يرفض التكرار برسالته؛ تنبيه الرصيد فقط لو needsTopUp وغير مدفوع وغير مرفوض/ملغى.
الأزرار داخل الحوارات تتولى invalidateBookingQueries.
الخطوة التالية: دفعة 3: teacher.bookings (T5) + حوار DecideReschedule (يعتمد على B-6)، ثم teacher.courses (T1-01) وlessons-tab (T4).
