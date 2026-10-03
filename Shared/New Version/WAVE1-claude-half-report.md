# تقرير جلسة — نصف Claude من Phase A (19 مهمة) — 2026-10-02

**التحقق:** لا `node_modules` ولا شبكة. استعملتُ `tsc` مع stubs للمكتبات الخارجية (أنواع الملفات الداخلية فعلية) + تشغيل اختبارات المنطق النقي بمشغّل مبسّط: **102 فحصًا نجح** (24 booking-slots/reschedule/rating/schedule-join/exam + اختبارات WP-00 + نصف المستخدم). لم يُشغَّل Prettier/ESLint/vitest الحقيقي. شغّل `npm run dev` ثم `npm run format && npm run validate`.

## المهام (كلها «قيد المراجعة»)

| المهمة            | التنفيذ                                                                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1-01/02/04/07/08 | `book.$teacherId.tsx` + `booking-slot-picker.tsx` + `lib/booking-slots.ts` (+27 فحصًا): الوضع/التاريخ/الوقت المتاح/المدة/الملاحظة، سعر تقديري، فحص الرصيد |
| S1-06             | رابط الحجز بـ`teacher.$id.tsx` جاهز لكنه خلف `BOOKING_FLOW_ENABLED=false` (`lib/booking-slots.ts`)؛ الزر المعطّل الحالي باقٍ بنصه الصادق                  |
| S2-03             | `cancel-booking-dialog.tsx`                                                                                                                               |
| S2-04             | لوحتا الحجوزات/الطلبات بروابط تفاصيل + سجل مرفوض/ملغى؛ ملف جديد `my-courses/schedule-row.tsx`                                                             |
| S3-01/03/04       | `reschedule-dialog.tsx` + `lib/reschedule-validation.ts` + اختبارات                                                                                       |
| S4-01/04          | `rate-booking-dialog.tsx` + `lib/rating.ts` + اختبارات (S4-02/03 مؤجلتان لـJ-02)                                                                          |
| S5-04/05/06       | `schedule.tsx` (أعمدة + انضمام آمن + فلاتر) + `lib/schedule-join.ts` + `test-units/lesson.$id.test.ts`                                                    |
| S6-02             | `enrolled-courses-panel.tsx`                                                                                                                              |
| S7-02             | `attendance-rate-card.tsx` (يستخدم `lib/progress.ts`) + إدماجها بـ`attendance.tsx`                                                                        |
| S8-04             | `lib/exam-percent.ts` + `test-units/exam-results.test.ts`                                                                                                 |

## ما لم يُنفَّذ عمدًا (يعتمد على قرارات/بيانات الباك اند)

- **S1-03/S1-05:** اختيار المادة/الصف وإرسال الحجز: `Booking/Submit` يتطلب `subjectId/gradeId` ومصدرهما محسوم بـQ-04. زر الإرسال معطّل بنص صادق ولا تُرسَل ids مخمّنة.
- كل ما يقرأ حقول ردود غير موثّقة (تفاصيل حجز/درس/كورس، سجل حضور، نتائج) ينتظر WP-J.

## افتراضات (مسجّلة R-14..R-17)

- حدود واجهية: مدة حجز 30..480 (مثال Swagger)، ملاحظة 500 حرف، مراجعة 1000 — الباك اند هو المرجع النهائي.
- لحظة خصم المبلغ مكتوبة «عند قبول المعلم» بصياغة SRS (Q-06 مفتوح).
- `PendingRequestsPanel`: لا يُفترض أن الاستدعاء بلا حالة يرجّع المعلّقة فقط؛ السجل (حالة 3 و4) يُستبعد منه أي عنصر موجود أصلاً بالقائمة الرئيسية.

## ملفات جديدة (مسجّلة بالتتبع)

`lib/booking-slots.ts`, `lib/reschedule-validation.ts`, `lib/schedule-join.ts`, `lib/exam-percent.ts`, `lib/rating.ts`, `components/student/attendance-rate-card.tsx`, `components/student/my-courses/schedule-row.tsx` + ملفات الاختبار.

## تعديلات على ملفات بمالكين آخرين

لا شيء خارج ملكيتي. (`teacher.$id.tsx` ملك WP-S1، `attendance.tsx` ملك WP-S7، `schedule.tsx` ملك WP-S5.)
