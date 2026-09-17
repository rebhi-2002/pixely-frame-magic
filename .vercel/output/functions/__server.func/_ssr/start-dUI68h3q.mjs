import { c as updateSpanName, i as captureException, l as SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, n as renderErrorPage, o as getActiveSpan$1, s as spanToJSON, u as addNonEnumerableProperty } from "./ssr.mjs";
import { n as createCsrfMiddleware, s as createMiddleware } from "./server-tMaTfkv1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/start-dUI68h3q.js
var SENTRY_INTERNAL = "__SENTRY_INTERNAL__";
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
		const activeSpan = getActiveSpan$1();
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
function dedupeSerializationAdapters(deduped, serializationAdapters) {
	for (let i = 0, len = serializationAdapters.length; i < len; i++) {
		const current = serializationAdapters[i];
		if (!deduped.has(current)) {
			deduped.add(current);
			if (current.extends) dedupeSerializationAdapters(deduped, current.extends);
		}
	}
}
var createStart = (getOptions) => {
	return {
		getOptions: async () => {
			const options = await getOptions();
			if (options.serializationAdapters) {
				const deduped = /* @__PURE__ */ new Set();
				dedupeSerializationAdapters(deduped, options.serializationAdapters);
				options.serializationAdapters = Array.from(deduped);
			}
			return options;
		},
		createMiddleware
	};
};
var errorMiddleware = createMiddleware().server(async ({ next }) => {
	try {
		return await next();
	} catch (error) {
		if (error != null && typeof error === "object" && "statusCode" in error) throw error;
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
});
var csrfMiddleware = createCsrfMiddleware({ filter: (ctx) => ctx.handlerType === "serverFn" });
var startInstance = createStart(() => ({
	requestMiddleware: [
		sentryGlobalRequestMiddleware,
		errorMiddleware,
		csrfMiddleware
	],
	functionMiddleware: [sentryGlobalFunctionMiddleware]
}));
//#endregion
export { startInstance };
