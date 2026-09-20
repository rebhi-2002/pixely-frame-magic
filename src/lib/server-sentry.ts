// تحميل Sentry لجهة السيرفر بشكل "اختياري وآمن" — نقطة وحيدة يستخدمها
// src/server.ts وsrc/start.ts.
//
// ليش import() ديناميكي محاط بـtry/catch وليس import ثابت؟
// لأن import ثابت لحزمة @sentry/tanstackstart-react بأي ملف يدخل بمسار الـSSR
// (كان بـsrc/start.ts) بيفشل وقت "ربط الموديول" لو الحزمة غير موجودة بدالة
// السيرفرلس المنشورة — والفشل بيكسر الملف كله وكل طلب SSR (كل صفحة بالموقع
// بترجع 500 بالشكل: ERR_MODULE_NOT_FOUND ... imported from /var/task/_ssr/...).
// مع import() ديناميكي الفشل بيصير Promise مرفوضة نمسكها ونكمل بدون Sentry.
//
// ممنوع إضافة `import ... from "@sentry/tanstackstart-react"` ثابت بأي ملف
// سيرفر (يُسمح بـ`import type` فقط — بيتمحي وقت البناء).

import { env } from "./env";

type SentryModule = typeof import("@sentry/tanstackstart-react");

let sentryReady: Promise<SentryModule | null> | null = null;

export function getServerSentry(): Promise<SentryModule | null> {
  if (!sentryReady) {
    sentryReady = import("@sentry/tanstackstart-react")
      .then((mod) => {
        mod.init({ dsn: env.SENTRY_DSN, environment: env.MODE, tracesSampleRate: 0.2 });
        return mod;
      })
      .catch((err) => {
        console.error("[server] تعذّر تحميل/تهيئة Sentry بجهة السيرفر — سيتابع بدونه:", err);
        return null;
      });
  }
  return sentryReady;
}

/** يرسل الخطأ لـSentry إن كان متاحًا، وإلا يتجاهله بصمت (لا يرمي أبدًا). */
export function captureServerException(error: unknown): void {
  void getServerSentry()
    .then((sentry) => sentry?.captureException(error))
    .catch(() => undefined);
}
