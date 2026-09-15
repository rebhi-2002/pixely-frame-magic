// طبقة مساعدة صغيرة فوق Sentry (التهيئة الفعلية صارت بـsrc/instrument.client.ts
// لجهة العميل، وsrc/server.ts لجهة السيرفر — راجعهم). هالملف بس لربط هوية
// المستخدم وتسجيل أخطاء يدوية من داخل مكونات React بدون ما نكرر استيراد
// Sentry بكل مكان.

import * as Sentry from "@sentry/tanstackstart-react";

/** يربط خطأ بمعلومات إضافية (زي المستخدم الحالي) عند توفرها — اختياري. */
export function setMonitoringUser(user: { id: string; email?: string | null } | null): void {
  Sentry.setUser(user ? { id: user.id, email: user.email ?? undefined } : null);
}

/** لتسجيل خطأ ملتقط يدويًا (خارج حدود React Error Boundary). */
export function captureError(error: unknown, context?: Record<string, unknown>): void {
  Sentry.captureException(error, context ? { extra: context } : undefined);
}
