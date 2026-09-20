// طبقة مساعدة صغيرة فوق Sentry (التهيئة الفعلية صارت بـsrc/instrument.client.ts
// لجهة العميل، وsrc/server.ts لجهة السيرفر — راجعهم). هالملف بس لربط هوية
// المستخدم وتسجيل أخطاء يدوية من داخل مكونات React بدون ما نكرر استيراد
// Sentry بكل مكان.

// import() ديناميكي بدل import ثابت: هالملف بيتضمّن بحزمة الـSSR (عبر ملفات
// الراوتات)، وأي import ثابت لحزمة Sentry بمسار السيرفر بيكسر كل الصفحات (500)
// لو الحزمة غابت عن دالة السيرفرلس — راجع src/lib/server-sentry.ts.
// كل الدوال هون بتنادى من المتصفح بس (معالجات أحداث)، فالتحميل الديناميكي آمن.

function withSentry(fn: (sentry: typeof import("@sentry/tanstackstart-react")) => void): void {
  void import("@sentry/tanstackstart-react").then(fn).catch(() => undefined);
}

/** يربط خطأ بمعلومات إضافية (زي المستخدم الحالي) عند توفرها — اختياري. */
export function setMonitoringUser(user: { id: string; email?: string | null } | null): void {
  withSentry((Sentry) =>
    Sentry.setUser(user ? { id: user.id, email: user.email ?? undefined } : null),
  );
}

/** لتسجيل خطأ ملتقط يدويًا (خارج حدود React Error Boundary). */
export function captureError(error: unknown, context?: Record<string, unknown>): void {
  withSentry((Sentry) => Sentry.captureException(error, context ? { extra: context } : undefined));
}
