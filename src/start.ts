import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { captureServerException } from "./lib/server-sentry";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    captureServerException(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

// ملاحظة: ما منستورد sentryGlobalRequestMiddleware/sentryGlobalFunctionMiddleware
// هون عمدًا — import ثابت لحزمة Sentry بمسار الـSSR كان يكسر كل صفحات الموقع
// (500) لما الحزمة تغيب عن دالة السيرفرلس. التقاط أخطاء السيرفر صار عبر
// captureServerException (import ديناميكي آمن — راجع src/lib/server-sentry.ts).
// Sentry جهة المتصفح (src/instrument.client.ts) ما تأثّر.
export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, csrfMiddleware],
}));
