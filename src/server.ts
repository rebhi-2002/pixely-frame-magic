import "./lib/error-capture";

import * as Sentry from "@sentry/tanstackstart-react";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { env } from "./lib/env";

// تهيئة Sentry لجهة السيرفر هون مباشرة (مو بس عبر instrument.server.mjs +
// --import) لأن Vercel/Netlify (منصّات النشر المستهدفة بهالمشروع — راجع
// nitroPreset بـvite.config.ts) بيئات serverless ما بتدعم --import بشكل
// موثوق حسب توثيق Sentry نفسه. هالتهيئة بتشتغل مرة وحدة عند أول تحميل
// لهالموديول (بداية كل تنفيذ سيرفرلس) — كافي لالتقاط استثناءات SSR هون.
Sentry.init({
  dsn: env.SENTRY_DSN,
  environment: env.MODE,
  tracesSampleRate: 0.2,
});

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
  Sentry.captureException(swallowed);
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
      Sentry.captureException(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
