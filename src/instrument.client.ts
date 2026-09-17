// تهيئة Sentry (جهة العميل) — يجب أن يُستورد هذا الملف كأول شي بملف الدخول
// (src/client.tsx) حتى يلتقط الأخطاء اللي بتصير قبل الـhydration كمان.
// راجع: https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/
//
// الـDSN مو سر — آمن يكون بالكود الجاهز بالمتصفح (متل ما توثّق Sentry نفسها).

import * as Sentry from "@sentry/tanstackstart-react";
import { env } from "@/lib/env";

Sentry.init({
  dsn: env.SENTRY_DSN,
  environment: env.MODE,

  dataCollection: {
    // خصوصية: ما منبعت بيانات مستخدم تلقائية (IP، إلخ) ولا أجسام طلبات
    // HTTP كاملة افتراضيًا — راجع setSentryUser بـsrc/lib/monitoring.ts
    // لربط هوية المستخدم يدويًا بعد الموافقة/الدخول بس.
    userInfo: false,
  },

  integrations: [Sentry.replayIntegration()],

  // نسبة عالية بالتطوير، تقلّل لاحقًا بالإنتاج حسب الحاجة (راجع .env).
  tracesSampleRate: env.DEV ? 1.0 : 0.2,

  // Session Replay: 10% من الجلسات العادية، 100% من الجلسات يلي فيها خطأ.
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
