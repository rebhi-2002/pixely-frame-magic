# ADR 0002: Route Guard Is Not Authorization

`beforeLoad`, localStorage، وrole-based rendering تمنع الوصول الاعتيادي في المتصفح لكنها قابلة للتلاعب. لذلك لا يجوز اعتبارها security boundary. authorization يجب أن ينفذ في ASP.NET قبل قراءة أو تعديل البيانات.
