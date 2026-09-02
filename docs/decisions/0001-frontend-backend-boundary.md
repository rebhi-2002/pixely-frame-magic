# ADR 0001: Frontend/Backend Boundary

## القرار

نحسن UI/UX وواجهات الفرونت المستقلة عن API الآن، ولا نخترع endpoints للميزات التي لم تصل من فريق الباك إند. كل عقد جديد يمر عبر Swagger وPostman وadapter.

## السبب

هذا يمنع coupling وهميًا وبيانات mock مضللة، ويسمح بإطلاق تحسينات shell/forms/states/mobile قبل اكتمال domain APIs.

## النتيجة

تبقى بعض صفحات التعلم بحالات قيد التجهيز أو preview إلى أن يصل contract موثق.
