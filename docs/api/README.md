# Frontend API Documentation

وثيقة Postman في `postman/` هي مرجع الاستدعاء الحالي فقط. أما حدود التكامل والقرارات المعمارية فتوجد في `docs/architecture/api-boundary.md`.

قبل إضافة adapter جديد، تحقق من Swagger والـcontroller والـDTO، ثم أضف mapping للـresponse وhandling لـ`success: false` و401/403/400. لا تضع secrets في الـfrontend.
