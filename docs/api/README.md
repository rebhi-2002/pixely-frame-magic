# Frontend API Documentation

وثيقة Postman في `postman/` هي مرجع الاستدعاء الحالي فقط. أما حدود التكامل والقرارات المعمارية فتوجد في `docs/architecture/api-boundary.md`. حالة كل endpoint فعليًا (مربوط/غير مربوط، ولماذا) موثّقة بالكامل بـ`frontend-integration-status.md` بنفس المجلد.

قبل إضافة adapter جديد، تحقق من Swagger والـcontroller والـDTO، ثم أضف mapping للـresponse وhandling لـ`success: false` و401/403/400. لا تضع secrets في الـfrontend.
