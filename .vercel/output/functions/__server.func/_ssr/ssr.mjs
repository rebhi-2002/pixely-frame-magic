import { n as __exportAll$1 } from "../_runtime.mjs";
import { $t as applySdkMetadata, Bi as addNonEnumerableProperty, Dr as getActiveSpan, Gi as isObjectLike, Lr as updateSpanName, Or as getRootSpan, Pr as spanToJSON, S as escapeStringForRegex, Wr as dsnToString, Xt as getTraceMetaTags, _ as flushIfServerless, en as handleTunnelRequest, fi as SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, kn as captureException, li as SEMANTIC_ATTRIBUTE_SENTRY_OP, lr as withActiveSpan, mi as getCurrentScope, or as startSpan, pi as getClient, sr as startSpanManual, ui as SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN } from "../_libs/sentry__core.mjs";
import { ft as Ts } from "../_libs/sentry__conventions.mjs";
import { n as getDefaultIntegrations, r as init, t as esm_exports } from "../_libs/@sentry/node+[...].mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/index.js
var ssr_exports = /* @__PURE__ */ __exportAll$1({
	a: () => sentryGlobalFunctionMiddleware,
	default: () => server_default,
	i: () => tanstackRouterBrowserTracingIntegration,
	n: () => renderErrorPage,
	o: () => sentryGlobalRequestMiddleware,
	r: () => index_server_exports,
	s: () => __exportAll,
	t: () => env
});
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
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
function init$1(options) {
	const sentryOptions = {
		defaultIntegrations: [...getDefaultIntegrations(options)],
		...options
	};
	applySdkMetadata(sentryOptions, "tanstackstart-react", ["tanstackstart-react", "node"]);
	sentryOptions.ignoreSpans = [
		...sentryOptions.ignoreSpans || [],
		/\/node_modules\//,
		/\/@id\//,
		/\/@react-refresh/,
		/\/@vite\//
	];
	return init(sentryOptions);
}
function patternToRegex(pattern) {
	const segments = pattern.split("/").map((segment) => {
		if (segment.startsWith("$")) return "[^/]+";
		return escapeStringForRegex(segment);
	}).join("/");
	return new RegExp(`^${segments}$`);
}
function matchUrlToRoutePattern(pathname, patterns) {
	const normalizedPathname = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
	for (const pattern of patterns) if (patternToRegex(pattern).test(normalizedPathname)) return pattern;
}
function updateSpanWithRouteParametrization(method, pathname, patterns) {
	const matchedPattern = matchUrlToRoutePattern(pathname, patterns);
	if (!matchedPattern) return;
	const activeSpan = getActiveSpan();
	if (!activeSpan) return;
	const rootSpan = getRootSpan(activeSpan);
	if (spanToJSON(rootSpan).data?.["http.route"]) return;
	const transactionName = `${method} ${matchedPattern}`;
	updateSpanName(rootSpan, transactionName);
	rootSpan.setAttribute(Ts, matchedPattern);
	rootSpan.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, "route");
	getCurrentScope().setTransactionName(transactionName);
}
function addMetaTagToHead(htmlChunk, metaTagsStr) {
	if (typeof htmlChunk !== "string" || !metaTagsStr) return htmlChunk;
	if (htmlChunk.includes("\"sentry-trace\"")) return htmlChunk;
	let replaced = false;
	return htmlChunk.replace(/"[^"]*"|'[^']*'|(<head>)/g, (match, headTag) => {
		if (headTag && !replaced) {
			replaced = true;
			return `<head>${metaTagsStr}`;
		}
		return match;
	});
}
function injectMetaTagsInResponse(originalResponse) {
	try {
		if (!originalResponse.headers.get("content-type")?.startsWith("text/html")) return originalResponse;
		const originalBody = originalResponse.body;
		if (!originalBody) return originalResponse;
		const metaTagsStr = getTraceMetaTags();
		const decoder = new TextDecoder();
		const newResponseStream = new ReadableStream({ start: async (controller) => {
			const body = originalBody;
			async function* bodyReporter() {
				try {
					for await (const chunk of body) yield chunk;
				} catch (e) {
					captureException(e, { mechanism: {
						type: "auto.http.tanstackstart",
						handled: false
					} });
					throw e;
				}
			}
			let errored = false;
			try {
				for await (const chunk of bodyReporter()) {
					const modifiedHtml = addMetaTagToHead(typeof chunk === "string" ? chunk : decoder.decode(chunk, { stream: true }), metaTagsStr);
					controller.enqueue(new TextEncoder().encode(modifiedHtml));
				}
			} catch (e) {
				errored = true;
				controller.error(e);
			} finally {
				if (!errored) controller.close();
			}
		} });
		return new Response(newResponseStream, {
			status: originalResponse.status,
			statusText: originalResponse.statusText,
			headers: new Headers(originalResponse.headers)
		});
	} catch (e) {
		captureException(e, { mechanism: {
			type: "auto.http.tanstackstart",
			handled: false
		} });
		throw e;
	}
}
function wrapFetchWithSentry(serverEntry) {
	if (serverEntry.fetch) serverEntry.fetch = new Proxy(serverEntry.fetch, { async apply(target, thisArg, args) {
		try {
			const request = args[0];
			const url = new URL(request.url);
			const method = request.method || "GET";
			if (url.pathname.includes("_serverFn") || url.pathname.includes("createServerFn")) {
				const op = "function.tanstackstart";
				return await startSpan({
					op,
					name: `${method} ${url.pathname}`,
					attributes: {
						[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.function.tanstackstart.server",
						[SEMANTIC_ATTRIBUTE_SENTRY_OP]: op
					}
				}, async () => {
					return target.apply(thisArg, args);
				});
			}
			if (typeof __SENTRY_ROUTE_PATTERNS__ !== "undefined") updateSpanWithRouteParametrization(method, url.pathname, __SENTRY_ROUTE_PATTERNS__);
			return injectMetaTagsInResponse(await target.apply(thisArg, args));
		} finally {
			await flushIfServerless();
		}
	} });
	return serverEntry;
}
function getMiddlewareSpanOptions(name) {
	return {
		op: "middleware.tanstackstart",
		name,
		attributes: {
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.middleware.tanstackstart",
			[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "middleware.tanstackstart"
		}
	};
}
var SENTRY_WRAPPED = "__SENTRY_WRAPPED__";
var SENTRY_INTERNAL = "__SENTRY_INTERNAL__";
function getNextProxy(next, span, prevSpan, nextState) {
	return new Proxy(next, { apply: (originalNext, thisArgNext, argsNext) => {
		nextState.called = true;
		span.end();
		if (prevSpan) return withActiveSpan(prevSpan, () => {
			return Reflect.apply(originalNext, thisArgNext, argsNext);
		});
		return Reflect.apply(originalNext, thisArgNext, argsNext);
	} });
}
function wrapMiddlewareWithSentry(middleware, options) {
	if (middleware[SENTRY_WRAPPED] || middleware["__SENTRY_INTERNAL__"]) return middleware;
	if (middleware.options?.server) {
		middleware.options.server = new Proxy(middleware.options.server, { apply: (originalServer, thisArgServer, argsServer) => {
			const prevSpan = getActiveSpan();
			return startSpanManual(getMiddlewareSpanOptions(options.name), async (span) => {
				const nextState = { called: false };
				const middlewareArgs = argsServer[0];
				if (isObjectLike(middlewareArgs) && typeof middlewareArgs.next === "function") middlewareArgs.next = getNextProxy(middlewareArgs.next, span, prevSpan, nextState);
				try {
					const result = await originalServer.apply(thisArgServer, argsServer);
					if (!nextState.called) span.end();
					return result;
				} catch (e) {
					span.end();
					throw e;
				}
			});
		} });
		addNonEnumerableProperty(middleware, SENTRY_WRAPPED, true);
	}
	return middleware;
}
function wrapMiddlewaresWithSentry(middlewares) {
	return Object.entries(middlewares).map(([name, middleware]) => {
		return wrapMiddlewareWithSentry(middleware, { name });
	});
}
function createSentryMiddlewareHandler(mechanismType) {
	return async function sentryMiddlewareHandler({ next }) {
		try {
			return await next();
		} catch (e) {
			captureException(e, { mechanism: {
				type: mechanismType,
				handled: false
			} });
			throw e;
		}
	};
}
function createSentryFunctionMiddlewareHandler(mechanismType) {
	return async function sentryFunctionMiddlewareHandler({ next, serverFnMeta }) {
		const activeSpan = getActiveSpan();
		const spanData = activeSpan ? spanToJSON(activeSpan) : void 0;
		if (activeSpan && spanData?.op === "function.tanstackstart") {
			if (serverFnMeta?.name) {
				const method = spanData.description?.split(" ")[0] || "GET";
				updateSpanName(activeSpan, `${method} /_serverFn/${serverFnMeta.name}`);
				activeSpan.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, "route");
			}
			if (serverFnMeta?.id) activeSpan.setAttribute("tanstackstart.function.id", serverFnMeta.id);
			if (serverFnMeta?.filename) activeSpan.setAttribute("tanstackstart.function.filename", serverFnMeta.filename);
		}
		try {
			return await next();
		} catch (e) {
			captureException(e, { mechanism: {
				type: mechanismType,
				handled: false
			} });
			throw e;
		}
	};
}
var sentryGlobalRequestMiddleware = {
	"~types": void 0,
	_types: void 0,
	options: { server: createSentryMiddlewareHandler("auto.middleware.tanstackstart.request") }
};
var sentryGlobalFunctionMiddleware = {
	"~types": void 0,
	_types: void 0,
	options: { server: createSentryFunctionMiddlewareHandler("auto.middleware.tanstackstart.server_function") }
};
addNonEnumerableProperty(sentryGlobalRequestMiddleware, SENTRY_INTERNAL, true);
addNonEnumerableProperty(sentryGlobalFunctionMiddleware, SENTRY_INTERNAL, true);
var registeredTunnelRoutePaths = /* @__PURE__ */ new Set();
function registerSentryServerTunnelRoute(path) {
	if (registeredTunnelRoutePaths.has(path)) return;
	const client = getClient();
	if (!client) return;
	registeredTunnelRoutePaths.add(path);
	const options = client.getOptions();
	options.ignoreSpans = [...options.ignoreSpans ?? [], { attributes: { "http.target": new RegExp(`^${escapeStringForRegex(path)}(?:[/?#]|$)`) } }];
}
function createSentryTunnelRoute(options) {
	return { handlers: { POST: async ({ request }) => {
		registerSentryServerTunnelRoute(new URL(request.url).pathname);
		const allowedDsns = (options.allowedDsns?.length ? options.allowedDsns : void 0) ?? (() => {
			const dsn = getClient()?.getDsn();
			return dsn ? [dsnToString(dsn)] : void 0;
		})();
		if (!allowedDsns) return new Response("Tunnel route requires Sentry server SDK initialized with a DSN, or pass allowedDsns explicitly.", { status: 500 });
		return handleTunnelRequest({
			request,
			allowedDsns
		});
	} } };
}
function replayIntegration(_options) {
	return {
		name: "Replay",
		setup() {}
	};
}
function tanstackRouterBrowserTracingIntegration(_router, _options) {
	return {
		name: "BrowserTracing",
		setup() {}
	};
}
var ErrorBoundary = (props) => {
	if (!props.children) return null;
	if (typeof props.children === "function") return props.children();
	return props.children;
};
function withErrorBoundary(WrappedComponent) {
	return WrappedComponent;
}
var index_server_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	createSentryTunnelRoute: () => createSentryTunnelRoute,
	init: () => init$1,
	registerSentryServerTunnelRoute: () => registerSentryServerTunnelRoute,
	replayIntegration: () => replayIntegration,
	sentryGlobalFunctionMiddleware: () => sentryGlobalFunctionMiddleware,
	sentryGlobalRequestMiddleware: () => sentryGlobalRequestMiddleware,
	tanstackRouterBrowserTracingIntegration: () => tanstackRouterBrowserTracingIntegration,
	withErrorBoundary: () => withErrorBoundary,
	wrapFetchWithSentry: () => wrapFetchWithSentry,
	wrapMiddlewaresWithSentry: () => wrapMiddlewaresWithSentry
});
__reExport(index_server_exports, esm_exports);
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
init$1({
	dsn: env.SENTRY_DSN,
	environment: env.MODE,
	tracesSampleRate: .2
});
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-oWHHg8-O.mjs").then((n) => n.t).then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!isH3SwallowedErrorBody(body)) return response;
	const swallowed = consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`);
	console.error(swallowed);
	index_server_exports.captureException(swallowed);
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
		index_server_exports.captureException(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { sentryGlobalFunctionMiddleware as a, ssr_exports as c, server_default as default, tanstackRouterBrowserTracingIntegration as i, renderErrorPage as n, sentryGlobalRequestMiddleware as o, index_server_exports as r, __exportAll as s, env as t };
