# API Boundary

**Base URL الحالي:** `https://ziadkamalaln2842-001-site1.etempurl.com`

الفرونت يرسل طلبات cross-origin مع `credentials: include` لأن الباك إند يستخدم ASP.NET Identity cookie. العمليات المتاحة حاليًا موثقة في `docs/api/postman` وتشمل Auth، User، Page، Constant، وUserPermission.

يجب فحص `OperationResult.success` وليس HTTP 200 فقط. أي endpoint جديد يحتاج method/path/body/response/error contract، تحديث Swagger، تحديث Postman، ثم adapter في الفرونت.

الـUI guard ليس بديلًا عن `[Authorize]` وpermission checks في الباك إند. إلى أن يضاف endpoint مستخدم حالي وصلاحيات موثوقة، لا يطابق static RBAC الحساب الحقيقي تلقائيًا؛ الحساب غير المعروف يحصل على neutral access فارغ بدل role fallback أو صلاحيات admin.
