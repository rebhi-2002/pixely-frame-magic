import { n as __exportAll } from "../_runtime.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/index.js
var ssr_exports = /* @__PURE__ */ __exportAll({
	default: () => server_default,
	n: () => renderErrorPage,
	t: () => env
});
var lastCapturedError;
var TTL_MS = 5e3;
function record(error) {
	lastCapturedError = {
		error,
		at: Date.now()
	};
}
var CAUSE_DEPTH_LIMIT = 5;
var DESCRIPTION_LENGTH_LIMIT = 8e3;
function describeError(error) {
	const parts = [];
	let current = error;
	for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
		if (!(current instanceof Error)) {
			parts.push(typeof current === "string" ? current : safeStringify(current));
			break;
		}
		const label = depth === 0 ? "" : "caused by: ";
		const status = describeStatus(current);
		parts.push(`${label}${current.stack ?? `${current.name}: ${current.message}`}${status}`);
		current = current.cause;
	}
	return parts.join("\n").slice(0, DESCRIPTION_LENGTH_LIMIT);
}
function describeStatus(error) {
	const { status, statusCode } = error;
	const value = status ?? statusCode;
	return typeof value === "number" ? ` (status ${value})` : "";
}
function safeStringify(value) {
	try {
		return JSON.stringify(value) ?? String(value);
	} catch {
		return String(value);
	}
}
function isErrorLike(value) {
	return value instanceof Error;
}
var originalConsoleError = console.error.bind(console);
console.error = (...args) => {
	originalConsoleError(...args.map((arg) => {
		if (!isErrorLike(arg)) return arg;
		record(arg);
		return describeError(arg);
	}));
};
if (typeof globalThis.addEventListener === "function") {
	globalThis.addEventListener("error", (event) => record(event.error ?? event));
	globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
function consumeLastCapturedError() {
	if (!lastCapturedError) return void 0;
	if (Date.now() - lastCapturedError.at > TTL_MS) {
		lastCapturedError = void 0;
		return;
	}
	const { error } = lastCapturedError;
	lastCapturedError = void 0;
	return error;
}
function renderErrorPage() {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
var booleanFlag = stringType().optional().transform((v) => v === "true");
var parsed = objectType({
	VITE_API_BASE_URL: stringType().url("لازم يكون رابط صالح (https://...)").optional(),
	VITE_SITE_URL: stringType().url("لازم يكون رابط صالح (https://...)").optional(),
	VITE_ENABLE_DEMO_LOGIN: booleanFlag,
	VITE_ENABLE_SIGNUP: booleanFlag,
	VITE_SENTRY_DSN: stringType().optional(),
	VITE_POSTHOG_KEY: stringType().optional(),
	VITE_POSTHOG_HOST: stringType().url("لازم يكون رابط صالح (https://...)").optional()
}).safeParse({
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_API_BASE_URL": "https://ziadkamalaln2842-001-site1.etempurl.com",
	"VITE_ENABLE_DEMO_LOGIN": "true",
	"VITE_ENABLE_SIGNUP": "true",
	"VITE_POSTHOG_HOST": "https://us.i.posthog.com",
	"VITE_POSTHOG_KEY": "phc_xiySFLRMy4zcoZSAk2tJrFa7PwPYiS2tZYkPH8zRYuAv"
});
if (!parsed.success) console.error("[env] متغيرات بيئة غير صالحة — راجع .env.example:", parsed.error.flatten().fieldErrors);
var raw = parsed.success ? parsed.data : {};
var env = {
	API_BASE_URL: (raw.VITE_API_BASE_URL ?? "https://localhost:7176").replace(/\/+$/, ""),
	SITE_URL: (raw.VITE_SITE_URL ?? "https://pixely-frame-magic.vercel.app").replace(/\/$/, ""),
	ENABLE_DEMO_LOGIN: raw.VITE_ENABLE_DEMO_LOGIN === true,
	ENABLE_SIGNUP: raw.VITE_ENABLE_SIGNUP === true,
	SENTRY_DSN: raw.VITE_SENTRY_DSN || "https://21151ae17d7188a038b5b79715f5cf2d@o4512061652467712.ingest.de.sentry.io/4512061664002128",
	POSTHOG_KEY: raw.VITE_POSTHOG_KEY,
	POSTHOG_HOST: raw.VITE_POSTHOG_HOST ?? "https://us.i.posthog.com",
	MODE: "production",
	DEV: false,
	PROD: true
};
if (env.PROD && env.API_BASE_URL.includes("localhost")) console.error("[env] تحذير نشر: VITE_API_BASE_URL ما زالت تشير لـ localhost ببناء إنتاجي. تأكد من ضبط متغيرات البيئة الصحيحة بمنصة الاستضافة قبل النشر.");
var sentryReady = null;
function getSentry() {
	if (!sentryReady) sentryReady = import("@sentry/tanstackstart-react").then((mod) => {
		mod.init({
			dsn: env.SENTRY_DSN,
			environment: env.MODE,
			tracesSampleRate: .2
		});
		return mod;
	}).catch((err) => {
		console.error("[server] تعذّر تحميل/تهيئة Sentry بجهة السيرفر — سيتابع بدونه:", err);
		return null;
	});
	return sentryReady;
}
getSentry();
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-CQPo-kzR.mjs").then((n) => n.t).then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!isH3SwallowedErrorBody(body)) return response;
	const swallowed = consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`);
	console.error(swallowed);
	getSentry().then((sentry) => sentry?.captureException(swallowed));
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
function isH3SwallowedErrorBody(body) {
	try {
		const payload = JSON.parse(body);
		return payload.unhandled === true && payload.message === "HTTPError";
	} catch {
		return false;
	}
}
var server_default = { async fetch(request, env, ctx) {
	try {
		return await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx));
	} catch (error) {
		console.error(error);
		getSentry().then((sentry) => sentry?.captureException(error));
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { server_default as default, renderErrorPage as n, ssr_exports as r, env as t };
