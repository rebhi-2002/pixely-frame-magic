import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { env } from "./lib/env";

// تهيئة Sentry لجهة السيرفر — عبر import() ديناميكي محاط بـtry/catch عمدًا،
// مش import ثابت بأول الملف.
//
// ليش؟ لاحظنا بالإنتاج (Vercel) أن أداة تتبّع الحزم الخاصة بـNitro/Vercel
// (@vercel/nft) أحيانًا بتفشل تكتشف كل ملفات حزمة @sentry/tanstackstart-react
// الفعلية وتضمّنها بدالة السيرفرلس المنشورة — رغم إنها Dependency حقيقية
// وتتثبّت وتُبنى محليًا بدون أي مشكلة. لما هيك يصير مع import ثابت،
// الفشل يصير وقت "ربط" الموديول (module linking) قبل ما ينفّذ أي كود —
// يعني بيكسر الملف كله وأي طلب SSR بيمر فيه (الصفحة الرئيسية وكل صفحة!).
// مع import() ديناميكي، الفشل يصير Promise مرفوضة وقت التشغيل، فقادرين
// نمسكها بـtry/catch ونكمّل الطلب بدون Sentry بدل ما نكسر الموقع كامل.
let sentryReady: Promise<typeof import("@sentry/tanstackstart-react") | null> | null = null;
function getSentry() {
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
// نبدأ التهيئة بالخلفية عند أول تحميل للموديول (بدون await هون، ما منوقف
// أول طلب لحد ما تخلص) — أي كود لاحق محتاج Sentry فعليًا (captureException
// مثلاً) لازم ينتظر getSentry() بنفسه.
void getSentry();

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  const swallowed = consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`);
  console.error(swallowed);
  void getSentry().then((sentry) => sentry?.captureException(swallowed));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      void getSentry().then((sentry) => sentry?.captureException(error));
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
