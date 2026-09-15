# API Boundary

**Base URL الحالي:** `https://ziadkamalaln2842-001-site1.etempurl.com`

الفرونت يرسل طلبات cross-origin مع `credentials: include` لأن الباك إند يستخدم ASP.NET Identity cookie. العمليات المتاحة حاليًا موثقة بالتفصيل (32 endpoint، حالة كل وحدة) بـ[`docs/api/frontend-integration-status.md`](../api/frontend-integration-status.md) — تشمل Auth، User (بما فيها تعديل الملف الشخصي وتغيير كلمة المرور)، Page، Constant، UserPermission، **Wallet** (محفظة/شحن/سحب، مربوطة بالكامل)، و**Parent** (مربوطة بالكود، معطّلة عمليًا بسبب فجوة باك اند — راجع الملف المذكور).

يجب فحص `OperationResult.success` وليس HTTP 200 فقط. أي endpoint جديد يحتاج method/path/body/response/error contract، تحديث Swagger، تحديث Postman، ثم adapter في الفرونت.

الـUI guard ليس بديلًا عن `[Authorize]` وpermission checks في الباك إند. **محدَّث:** صار فيه تطابق static RBAC حقيقي لكل الأدوار المؤكدة (`buildRoleAccess`/`buildFullAdminAccess` بـ`rbac-client.ts`) — مو بس الأدمن. الحساب يلي تعذّر تحديد دوره فعليًا (فشل نداء تحديد النوع) يحصل على neutral access فارغ، بدل تخمين أي دور.
