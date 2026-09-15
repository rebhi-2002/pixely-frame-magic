// تهيئة Sentry (جهة العميل) — يجب أن يُستورد هذا الملف كأول شي بملف الدخول
// (src/client.tsx) حتى يلتقط الأخطاء اللي بتصير قبل الـhydration كمان.
// راجع: https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/
//
// الـDSN مو سر — آمن يكون بالكود الجاهز بالمتصفح (متل ما توثّق Sentry نفسها).

import * as Sentry from "@sentry/tanstackstart-react";

const dsn =
  (import.meta.env.VITE_SENTRY_DSN as string | undefined) ||
  "https://21151ae17d7188a038b5b79715f5cf2d@o4512061652467712.ingest.de.sentry.io/4512061664002128";

Sentry.init({
  dsn,
  environment: import.meta.env.MODE,

  dataCollection: {
    // خصوصية: ما منبعت بيانات مستخدم تلقائية (IP، إلخ) ولا أجسام طلبات
    // HTTP كاملة افتراضيًا — راجع setSentryUser بـsrc/lib/monitoring.ts
    // لربط هوية المستخدم يدويًا بعد الموافقة/الدخول بس.
    userInfo: false,
  },

  integrations: [Sentry.replayIntegration()],

  // نسبة عالية بالتطوير، تقلّل لاحقًا بالإنتاج حسب الحاجة (راجع .env).
  tracesSampleRate: import.meta.env.DEV ? 1.0 : 0.2,

  // Session Replay: 10% من الجلسات العادية، 100% من الجلسات يلي فيها خطأ.
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
