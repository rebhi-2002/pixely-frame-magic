import { i as __toESM, n as __exportAll } from "../../_runtime.mjs";
import { $ as instrumentMessageStream, $i as debug$3, $n as debounce, $r as setCapturedScopesOnSpan, $t as applySdkMetadata, A as instrumentLangGraph$1, Ai as timestampInSeconds, An as captureMessage, Ar as getStatusMessage, At as instrumentSupabaseClient, B as _INTERNAL_mergeLangChainCallbackHandler, Bi as addNonEnumerableProperty, Bn as setContext, Br as isContinuingTrace, Bt as eventFiltersIntegration, C as LRUMap, Ci as getDefaultIsolationScope, Cn as waitForTracingChannelBinding, Cr as shouldIgnoreSpan$1, Ct as captureFeedback, D as _INTERNAL_getLangGraphCreateAgentSpanOptions, Di as makeWeakRef, Dn as addEventProcessor, Dr as getActiveSpan$1, Dt as featureFlagsIntegration, E as spanStreamingIntegration, Ei as derefWeakRef, En as withMonitor, Er as convertSpanLinksForEnvelope, Et as growthbookIntegration, F as wrapToolsWithSpans, Fi as stringMatchesSomePattern, Fn as isEnabled, Fr as spanToTraceContext, Ft as dedupeIntegration, G as instrumentGoogleGenAIClient, Gi as isObjectLike, Gn as setTags, Gr as SENTRY_BAGGAGE_KEY_PREFIX, Gt as spanKindToName, H as addPrivateRequestAttributes$1, Hi as getOriginalFunction, Hn as setExtra, Hr as shouldContinueTrace, Ht as functionToStringIntegration, I as LANGGRAPH_INTEGRATION_NAME, Ii as stringify, In as isInitialized, Ir as spanToTraceHeader, It as captureConsoleIntegration, J as addPrivateRequestAttributes, Ji as triggerHandlers, Jn as getFilenameToDebugIdMap, Jr as mergeBaggageHeaders, Jt as winterCGHeadersToDict, K as instrumentStream, Ki as isThenable$1, Kn as setUser, Kr as baggageHeaderToDynamicSamplingContext, Kt as httpHeadersToSpanAttributes, L as _INTERNAL_getLangChainEmbeddingsSpanOptions, Li as truncate, Ln as lastEventId, Lr as updateSpanName, Lt as severityLevelFromString, M as instrumentStateGraphCompile, Mi as parseSemver, Mn as close, Mr as spanIsSentrySpan, Mt as rewriteFramesIntegration, N as extractAgentNameFromParams, Ni as isMatchingPattern, Nn as endSession, Nr as spanTimeInputToSeconds, Nt as dirname, O as instrumentCompiledGraphInvoke, Oi as generateSpanId, On as captureEvent, Or as getRootSpan$1, Ot as consoleIntegration$1, P as extractLLMFromParams, Pi as snipLine, Pn as flush, Pr as spanToJSON, Pt as extraErrorDataIntegration, Q as instrumentAsyncIterableStream, Qi as consoleSandbox, Qn as _INTERNAL_setDeferSegmentSpanCapture, Qr as markSpanForOtelSourceInference, Qt as getTraceData$1, R as instrumentLangChainEmbeddings, Ri as safeDateNow, Rn as setAttribute, Rr as generateSentryTraceHeader, Rt as requestDataIntegration, Si as getDefaultCurrentScope, Sn as getIntegrationsToSetup, Sr as SentryNonRecordingSpan, St as consoleLoggingIntegration, T as getBreadcrumbLogLevelFromHttpStatusCode, Ti as _setSpanForScope, Tn as captureCheckIn, Tr as addChildSpanToSpan, Tt as conversationIdIntegration, U as addResponseAttributes$1, Ui as markFunctionWrapped, Un as setExtras, Ur as parseSampleRate, Ut as addBreadcrumb, V as LANGCHAIN_INTEGRATION_NAME, Vi as fill, Vn as setConversationId, Vr as propagationContextFromHeaders, Vt as inboundFiltersIntegration, W as extractRequestAttributes$1, Wi as isError, Wn as setTag, Wt as SPAN_KIND, X as extractRequestAttributes, Xi as stackParserFromStackParserOptions, Xn as getCombinedScopeData, Xr as getCapturedScopesOnSpan, Xt as getTraceMetaTags, Y as addResponseAttributes, Yi as createStackParser, Yn as safeSetSpanJSONAttributes, Yr as parseBaggageHeader, Yt as uniq, Z as instrumentAnthropicAiClient, Zi as CONSOLE_LEVELS, Zn as bindScopeToEmitter, Zr as markSpanAsTracerProviderSpan, Zt as shouldPropagateTraceForUrl, _i as getTraceContextFromScope, _n as _INTERNAL_flushLogsBuffer, _r as serializeEnvelope, _t as GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE, a as getRequestUrlFromClientRequest, ai as SEMANTIC_ATTRIBUTE_CACHE_HIT, an as parseStringToURLObject, ar as startNewTrace$1, at as addResponseAttributes$2, b as trpcMiddleware, bi as getAsyncContextStrategy, bn as defineIntegration, br as getDynamicSamplingContextFromSpan, bt as gauge, c as _buildConnectionContext, ci as SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME, cn as stripUrlQueryAndFragment, cr as suppressTracing$1, ct as addVercelAiProcessors, d as _setConnectionAttributes, di as SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, dn as _INTERNAL_clearAiProviderSkips, dr as handleCallbackErrors, dt as _INTERNAL_getSpanContextForToolCallId, ea as originalConsoleMethods, ei as spanShouldInferOtelSource, er as _INTERNAL_startInactiveSpan, et as ANTHROPIC_AI_INTEGRATION_NAME, f as _setOperationName, fi as SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, fn as _INTERNAL_shouldSkipAiProviderWrapping, fr as hasSpanStreamingEnabled, ft as getTruncatedJsonString, g as setupExpressErrorHandler$1, gi as getIsolationScope, gn as _INTERNAL_captureLog, gr as logSpanStart, h as patchExpressModule, hi as getGlobalScope, hn as createTransport, hr as logSpanEnd, ht as GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE, i as getRequestOptions, ii as GEN_AI_CONVERSATION_ID_ATTRIBUTE, in as isURLObjectRelative, ir as startInactiveSpan$1, it as instrumentStream$1, j as instrumentStateGraph, ji as addExceptionMechanism, jn as captureSession, jr as spanIsSampled, jt as supabaseIntegration, k as instrumentCreateReactAgent, ki as generateTraceId, kn as captureException, kr as getSpanDescendants, kt as zodErrorsIntegration, l as _reconstructQuery, li as SEMANTIC_ATTRIBUTE_SENTRY_OP, ln as envToBool, lr as withActiveSpan$1, lt as getProviderMetadataAttributes, m as expressErrorHandler, mi as getCurrentScope, mn as setCurrentClient, mr as timedEventsToMeasurements, mt as shouldEnableTruncation, n as patchHttpModuleClient, na as SDK_VERSION, ni as getSpanStatusFromHttpCode, nn as parameterize, nr as isTracingSuppressed$1, nt as extractRequestAttributes$2, o as HTTP_ON_CLIENT_REQUEST, oi as SEMANTIC_ATTRIBUTE_CACHE_ITEM_SIZE, on as parseUrl, or as startSpan$3, ot as OPENAI_INTEGRATION_NAME, p as instrumentPostgresJsSql, pi as getClient, pn as _INTERNAL_skipAiProviderWrapping, pr as setMeasurement, pt as resolveAIRecordingOptions, q as GOOGLE_GENAI_INTEGRATION_NAME, qi as maybeInstrument, qn as startSession, qr as dynamicSamplingContextToSentryBaggageHeader, qt as httpRequestToRequestData, r as getHttpClientSubscriptions, ra as GLOBAL_OBJ, ri as setHttpStatus, rn as getSanitizedUrlString, rr as spanIsIgnored, rt as instrumentOpenAiClient, s as HTTP_ON_SERVER_REQUEST, si as SEMANTIC_ATTRIBUTE_CACHE_KEY, sn as stripDataUrlContent, sr as startSpanManual$1, st as LAST_STEP_ONLY_USAGE_KEYS, t as getHttpServerSubscriptions, ta as getMainCarrier, ti as spanSourceWasExplicitlySet, tn as fmt, tr as continueTrace$1, tt as addRequestAttributes, u as _sanitizeSqlQuery, ui as SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN, un as filterKeyValueData, ur as sampleSpan, ut as _INTERNAL_cleanupToolCallSpanContext, v as nodeStackLineParser, vi as withIsolationScope, vn as isBrowser, vr as withStreamedSpan, vt as createConsolaReporter, w as replaceExports, wi as Scope, wn as safeUnref, wr as hasSpansEnabled, wt as profiler, x as ServerRuntimeClient, xi as setAsyncContextStrategy, xn as extendIntegration, xr as spanToBaggageHeader, xt as public_api_exports, y as wrapMcpServerWithSentry, yi as withScope, yn as addIntegration, yr as getDynamicSamplingContextFromScope, yt as count, z as createLangChainCallbackHandler, zi as safeMathRandom, zn as setAttributes, zr as generateTraceparentHeader, zt as linkedErrorsIntegration } from "../sentry__core.mjs";
import { $ as Qo, $t as ni, A as Il, At as _l, B as Lt, Bt as fp, C as Go, Cn as za, Ct as Ya, D as Hu, Dt as Yu, E as Ht, Et as Yr, F as Kt, Ft as ct, G as Nt, Gt as jt, H as Me, Ht as ii, I as Ku, It as dl, J as Ol, Jt as la, K as Oa, Kt as ka, Lt as er, M as Is, Mt as ai, N as Ka, Nt as ar, O as Ia, Ot as Zo, Pt as au, Q as Pt, Qt as na, R as Le, Rt as fe, S as Gn, Sn as yl, St as Xr, T as Gt, Tt as Yo, Ut as ir, V as Ma, Vt as ht, W as Ne, Wt as jr, Xt as ma, Y as Pa, Yt as lu, Z as Pe, Zt as ml, _ as El, _n as we, _t as Wa, a as Ae, an as pu, at as Se, b as Ga, bn as xe, bt as Xn, cn as qr, ct as Ss, d as De, dn as sa, dt as Tp, en as nr, et as Qt, f as Dl, fn as si, ft as Ts, g as Ee, gn as tr, gt as Vu, h as Ec, hn as ti, ht as Vs, i as $e, in as pa, it as Rs, j as Ip, jt as aa, k as Ie, kt as Zr, l as Ce, ln as rc, lt as Te, m as Ea, mn as tc, mt as Vr, n as i_, nn as oa, nt as Ra, o as As, on as qa, ot as Sl, p as Dt, pn as ta, pt as Ue, q as Oe, qt as ke, r as k, rn as ou, rt as Re, s as Ba, sn as qe, st as Sp, t as b, tn as ns, tt as Qu, u as Ct, un as ri, ut as Tl, v as Fe, vn as ws, vt as Wo, w as Gr, wn as zo, wt as Ye, x as Ge, xn as xs, xt as Xo, y as Fr, yn as wt, yt as Ws, z as Li, zt as fl } from "../sentry__conventions.mjs";
import { t as require_src } from "../opentelemetry__api.mjs";
import { b as suppressTracing$2, d as SDK_INFO, n as RPCType, r as setRPCMetadata, v as W3CBaggagePropagator, y as isTracingSuppressed$2 } from "../@opentelemetry/core+[...].mjs";
import { a as registerInstrumentations, i as safeExecuteInTheMiddle, n as InstrumentationBase, r as isWrapped, t as InstrumentationNodeModuleDefinition } from "../opentelemetry__instrumentation.mjs";
import { o as SamplingDecision } from "../opentelemetry__sdk-trace.mjs";
import { t as BasicTracerProvider } from "../opentelemetry__sdk-trace-base.mjs";
import * as require$$1$2 from "node:module";
import require$$1__default from "node:module";
import * as http from "node:http";
import { Readable } from "node:stream";
import * as https from "node:https";
import * as diagnosticsChannel from "node:diagnostics_channel";
import { subscribe, unsubscribe } from "node:diagnostics_channel";
import { EventEmitter, errorMonitor } from "node:events";
import { promisify } from "util";
import { normalize } from "path";
import { createAddHookMessageChannel } from "import-in-the-middle";
import * as fs from "fs";
import * as diagch from "diagnostics_channel";
import { URL as URL$1 } from "url";
import { AsyncLocalStorage } from "node:async_hooks";
import { execFile } from "node:child_process";
import require$$0, { createReadStream, readFile, readFileSync as readFileSync$1, readdir } from "node:fs";
import * as os$1 from "node:os";
import require$$0$1 from "node:os";
import require$$0$2, { join, posix, sep } from "node:path";
import * as util from "node:util";
import require$$1, { format, promisify as promisify$1, types as types$1 } from "node:util";
import { createInterface } from "node:readline";
import { MessageChannel, Worker, isMainThread, parentPort } from "node:worker_threads";
import { isMainThread as isMainThread$1, threadId } from "worker_threads";
import { createGzip } from "node:zlib";
import * as net from "node:net";
import * as tls from "node:tls";
import * as moduleModule from "module";
import { monitorEventLoopDelay, performance } from "perf_hooks";
import { EventEmitter as EventEmitter$1 } from "events";
import require$$3, { fileURLToPath } from "node:url";
import require$$1$1 from "node:tty";
//#region node_modules/@sentry/node-core/build/esm/debug-build.js
var import_src = /* @__PURE__ */ __toESM(require_src());
var DEBUG_BUILD$3 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/http/httpServerIntegration.js
var HTTP_SERVER_INSTRUMENTED_KEY = (0, import_src.createContextKey)("sentry_http_server_instrumented");
var INTEGRATION_NAME$67 = "Http.Server";
function addStartSpanCallback(request, callback) {
	addNonEnumerableProperty(request, "_startSpanCallback", new WeakRef(callback));
}
var _httpServerIntegration = ((options = {}) => {
	const _options = {
		sessions: options.sessions ?? true,
		sessionFlushingDelayMS: options.sessionFlushingDelayMS ?? 6e4,
		maxRequestBodySize: options.maxRequestBodySize ?? "medium",
		spans: false,
		ignoreRequestBody: options.ignoreRequestBody,
		/**
		* Hook called by core's `instrumentServer` to wrap the upstream
		* `emit('request')` call.
		*
		* We use it to extract OTel context from request headers and re-enter
		* the OTel context before the framework sees the request, so subsequent
		* spans (eg from `httpServerSpansIntegration`) attach to the right trace.
		*/
		wrapServerEmitRequest(request, response, normalizedRequest, next) {
			const client = getClient();
			if (!client) return next();
			if (import_src.context.active().getValue(HTTP_SERVER_INSTRUMENTED_KEY)) return next();
			const ctx = import_src.propagation.extract(import_src.context.active(), normalizedRequest.headers).setValue(HTTP_SERVER_INSTRUMENTED_KEY, true);
			import_src.context.with(ctx, () => {
				client.emit("httpServerRequest", request, response, normalizedRequest);
				const callback = request._startSpanCallback?.deref();
				if (callback) callback(() => {
					next();
					return true;
				});
				else next();
			});
		}
	};
	return {
		name: INTEGRATION_NAME$67,
		setupOnce() {
			const { [HTTP_ON_SERVER_REQUEST]: onHttpServerRequestStart } = getHttpServerSubscriptions(_options);
			subscribe(HTTP_ON_SERVER_REQUEST, onHttpServerRequestStart);
		},
		afterAllSetup(client) {
			if (DEBUG_BUILD$3 && client.getIntegrationByName("Http")) debug$3.warn("It seems that you have manually added `httpServerIntegration` while `httpIntegration` is also present. Make sure to remove `httpServerIntegration` when adding `httpIntegration`.");
		}
	};
});
var httpServerIntegration = _httpServerIntegration;
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/http/httpServerSpansIntegration.js
var INTEGRATION_NAME$66 = "Http.ServerSpans";
var _httpServerSpansIntegration = ((options = {}) => {
	const ignoreStaticAssets = options.ignoreStaticAssets ?? true;
	const ignoreIncomingRequests = options.ignoreIncomingRequests;
	const ignoreStatusCodes = options.ignoreStatusCodes ?? [
		[401, 404],
		[301, 303],
		[305, 399]
	];
	const { onSpanCreated } = options;
	const { requestHook, responseHook, applyCustomAttributesOnSpan } = options.instrumentation ?? {};
	return {
		name: INTEGRATION_NAME$66,
		setup(client) {
			if (typeof __SENTRY_TRACING__ !== "undefined" && !__SENTRY_TRACING__) return;
			client.on("httpServerRequest", (_request, _response, normalizedRequest) => {
				const request = _request;
				const response = _response;
				const startSpan = (next) => {
					if (shouldIgnoreSpansForIncomingRequest(request, {
						ignoreStaticAssets,
						ignoreIncomingRequests
					})) {
						DEBUG_BUILD$3 && debug$3.log(INTEGRATION_NAME$66, "Skipping span creation for incoming request", request.url);
						return next();
					}
					const fullUrl = normalizedRequest.url || request.url || "/";
					const urlObj = parseStringToURLObject(fullUrl);
					const headers = request.headers;
					const userAgent = headers["user-agent"];
					const ips = headers["x-forwarded-for"];
					const httpVersion = request.httpVersion;
					const host = headers.host;
					const hostname = host?.replace(/^(.*)(:[0-9]{1,5})/, "$1") || "localhost";
					const scheme = fullUrl.startsWith("https") ? "https" : "http";
					const method = normalizedRequest.method || request.method?.toUpperCase() || "GET";
					const httpTargetWithoutQueryFragment = urlObj ? urlObj.pathname : stripUrlQueryAndFragment(fullUrl);
					const bestEffortTransactionName = `${method} ${httpTargetWithoutQueryFragment}`;
					const span = startInactiveSpan$1({
						name: bestEffortTransactionName,
						kind: SPAN_KIND.SERVER,
						attributes: {
							[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "http.server",
							[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.otel.http",
							[rc]: isKnownPrefetchRequest(request) || void 0,
							[Yu]: urlObj && !isURLObjectRelative(urlObj) ? urlObj.href : void 0,
							[Vu]: urlObj?.pathname ?? httpTargetWithoutQueryFragment,
							[ws]: fullUrl,
							[Ka]: normalizedRequest.method,
							[xs]: urlObj ? `${urlObj.pathname}${urlObj.search}` : httpTargetWithoutQueryFragment,
							[za]: host,
							[Sl]: hostname,
							[Wa]: typeof ips === "string" ? ips.split(",")[0] : void 0,
							[Rs]: userAgent,
							[Is]: scheme,
							[Ba]: httpVersion,
							[Dl]: httpVersion?.toUpperCase() === "QUIC" ? "ip_udp" : "ip_tcp",
							...getRequestContentLengthAttribute(request),
							...httpHeadersToSpanAttributes(normalizedRequest.headers || {}, client.getDataCollectionOptions())
						}
					});
					requestHook?.(span, request);
					responseHook?.(span, response);
					applyCustomAttributesOnSpan?.(span, request, response);
					onSpanCreated?.(span, request, response);
					const rpcMetadata = {
						type: RPCType.HTTP,
						span
					};
					return withActiveSpan$1(span, () => {
						return import_src.context.with(setRPCMetadata(import_src.context.active(), rpcMetadata), () => {
							bindScopeToEmitter(request);
							bindScopeToEmitter(response);
							let isEnded = false;
							function endSpan(status) {
								if (isEnded) return;
								isEnded = true;
								const newAttributes = getIncomingRequestAttributesOnResponse(request, response, rpcMetadata);
								span.setAttributes(newAttributes);
								span.setStatus(status);
								span.end();
								const route = newAttributes["http.route"];
								if (route) getIsolationScope().setTransactionName(`${request.method?.toUpperCase() || "GET"} ${route}`);
							}
							response.on("close", () => {
								endSpan(getSpanStatusFromHttpCode(response.statusCode));
							});
							response.on(errorMonitor, () => {
								const httpStatus = getSpanStatusFromHttpCode(response.statusCode);
								endSpan(httpStatus.code === 2 ? httpStatus : { code: 2 });
							});
							return next();
						});
					});
				};
				addStartSpanCallback(request, startSpan);
			});
		},
		processEvent(event) {
			if (event.type === "transaction") {
				const statusCode = event.contexts?.trace?.data?.["http.response.status_code"];
				if (typeof statusCode === "number") {
					if (shouldFilterStatusCode(statusCode, ignoreStatusCodes)) {
						DEBUG_BUILD$3 && debug$3.log("Dropping transaction due to status code", statusCode);
						return null;
					}
					event.contexts = {
						...event.contexts,
						response: {
							...event.contexts?.response,
							status_code: statusCode
						}
					};
				}
			}
			return event;
		},
		afterAllSetup(client) {
			if (!DEBUG_BUILD$3) return;
			if (client.getIntegrationByName("Http")) debug$3.warn("It seems that you have manually added `httpServerSpansIntegration` while `httpIntegration` is also present. Make sure to remove `httpIntegration` when adding `httpServerSpansIntegration`.");
			if (!client.getIntegrationByName("Http.Server")) debug$3.error("It seems that you have manually added `httpServerSpansIntegration` without adding `httpServerIntegration`. This is a requiement for spans to be created - please add the `httpServerIntegration` integration.");
		}
	};
});
var httpServerSpansIntegration = _httpServerSpansIntegration;
function isKnownPrefetchRequest(req) {
	return req.headers["next-router-prefetch"] === "1";
}
function isStaticAssetRequest(urlPath) {
	const path = stripUrlQueryAndFragment(urlPath);
	if (path.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2|ttf|eot|webp|avif)$/)) return true;
	if (path.match(/^\/(robots\.txt|sitemap\.xml|manifest\.json|browserconfig\.xml)$/)) return true;
	return false;
}
function shouldIgnoreSpansForIncomingRequest(request, { ignoreStaticAssets, ignoreIncomingRequests }) {
	if (isTracingSuppressed$1()) return true;
	const urlPath = request.url;
	const method = request.method?.toUpperCase();
	if (method === "OPTIONS" || method === "HEAD" || !urlPath) return true;
	if (ignoreStaticAssets && method === "GET" && isStaticAssetRequest(urlPath)) return true;
	if (ignoreIncomingRequests?.(urlPath, request)) return true;
	return false;
}
function getRequestContentLengthAttribute(request) {
	const length = getContentLength(request.headers);
	if (length == null) return {};
	if (isCompressed(request.headers)) return { ["http.request_content_length"]: length };
	else return { ["http.request_content_length_uncompressed"]: length };
}
function getContentLength(headers) {
	const contentLengthHeader = headers["content-length"];
	if (contentLengthHeader === void 0) return null;
	const contentLength = parseInt(contentLengthHeader, 10);
	if (isNaN(contentLength)) return null;
	return contentLength;
}
function isCompressed(headers) {
	const encoding = headers["content-encoding"];
	return !!encoding && encoding !== "identity";
}
function getIncomingRequestAttributesOnResponse(request, response, rpcMetadata) {
	const { socket } = request;
	const { statusCode, statusMessage } = response;
	const newAttributes = {
		[Ss]: statusCode,
		[As]: statusCode,
		"http.status_text": statusMessage?.toUpperCase()
	};
	if (socket) {
		const { localAddress, localPort, remoteAddress, remotePort } = socket;
		newAttributes[fl] = localAddress;
		newAttributes[El] = localPort;
		newAttributes[Tl] = remoteAddress;
		newAttributes[Ol] = remotePort;
	}
	newAttributes[As] = statusCode;
	newAttributes["http.status_text"] = (statusMessage || "").toUpperCase();
	if (rpcMetadata?.type === RPCType.HTTP && rpcMetadata.route !== void 0) {
		const routeName = rpcMetadata.route;
		newAttributes[Ts] = routeName;
	}
	return newAttributes;
}
function shouldFilterStatusCode(statusCode, dropForStatusCodes) {
	return dropForStatusCodes.some((code) => {
		if (typeof code === "number") return code === statusCode;
		const [min, max] = code;
		return statusCode >= min && statusCode <= max;
	});
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/nodeVersion.js
var NODE_VERSION = parseSemver(process.versions.node);
var NODE_MAJOR = NODE_VERSION.major;
var NODE_MINOR = NODE_VERSION.minor;
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/http/SentryHttpInstrumentation.js
var FULLY_SUPPORTS_HTTP_DIAGNOSTICS_CHANNEL = NODE_VERSION.major === 22 && NODE_VERSION.minor >= 12 || NODE_VERSION.major === 23 && NODE_VERSION.minor >= 2 || NODE_VERSION.major >= 24;
function instrumentHttpOutgoingRequests(instrumentationOptions = {}) {
	const { outgoingRequestApplyCustomAttributes: applyCustomAttributesOnSpan, ...options } = instrumentationOptions;
	const patchOptions = {
		propagateTrace: options.propagateTraceInOutgoingRequests ?? true,
		applyCustomAttributesOnSpan,
		...options,
		spans: options.createSpansForOutgoingRequests !== false && (options.spans ?? true),
		ignoreOutgoingRequests(url, request) {
			return isTracingSuppressed$1() || !!options.ignoreOutgoingRequests?.(url, getRequestOptions(request));
		},
		outgoingRequestHook(span, request) {
			options.outgoingRequestHook?.(span, request);
			const originalOnce = request.once;
			request.once = new Proxy(originalOnce, { apply(target, thisArg, args) {
				const [event] = args;
				if (event !== "response") return target.apply(thisArg, args);
				const parentContext = import_src.context.active();
				const requestContext = import_src.trace.setSpan(parentContext, span);
				return import_src.context.with(requestContext, () => {
					return target.apply(thisArg, args);
				});
			} });
		},
		outgoingResponseHook(span, response) {
			options.outgoingResponseHook?.(span, response);
		},
		errorMonitor,
		http
	};
	if (FULLY_SUPPORTS_HTTP_DIAGNOSTICS_CHANNEL) instrumentHttpOutgoingRequestsViaChannel(patchOptions);
	else instrumentHttpOutgoingRequestsViaMonkeyPatching(patchOptions);
}
var _currentListener;
function instrumentHttpOutgoingRequestsViaChannel(options) {
	const { [HTTP_ON_CLIENT_REQUEST]: onHttpClientRequestCreated } = getHttpClientSubscriptions(options);
	if (_currentListener) unsubscribe(HTTP_ON_CLIENT_REQUEST, _currentListener);
	subscribe(HTTP_ON_CLIENT_REQUEST, onHttpClientRequestCreated);
	_currentListener = onHttpClientRequestCreated;
}
function instrumentHttpOutgoingRequestsViaMonkeyPatching(options) {
	patchHttpModuleClient(http, options);
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/http/index.js
var INTEGRATION_NAME$65 = "Http";
Object.assign(instrumentHttpOutgoingRequests, { id: `${INTEGRATION_NAME$65}.sentry` });
var httpIntegration$1 = defineIntegration((options = {}) => {
	const spans = options.spans ?? false;
	const disableIncomingRequestSpans = options.disableIncomingRequestSpans ?? false;
	const enabledServerSpans = spans && !disableIncomingRequestSpans;
	const serverOptions = {
		sessions: options.trackIncomingRequestsAsSessions,
		sessionFlushingDelayMS: options.sessionFlushingDelayMS,
		ignoreRequestBody: options.ignoreIncomingRequestBody,
		maxRequestBodySize: options.maxIncomingRequestBodySize
	};
	const serverSpansOptions = {
		ignoreIncomingRequests: options.ignoreIncomingRequests,
		ignoreStaticAssets: options.ignoreStaticAssets,
		ignoreStatusCodes: options.dropSpansForIncomingRequestStatusCodes
	};
	const httpInstrumentationOptions = {
		breadcrumbs: options.breadcrumbs,
		propagateTraceInOutgoingRequests: options.tracePropagation ?? true,
		ignoreOutgoingRequests: options.ignoreOutgoingRequests,
		spans
	};
	const server = httpServerIntegration(serverOptions);
	const serverSpans = httpServerSpansIntegration(serverSpansOptions);
	return {
		name: INTEGRATION_NAME$65,
		setup(client) {
			if (enabledServerSpans) serverSpans.setup(client);
		},
		setupOnce() {
			server.setupOnce();
			instrumentHttpOutgoingRequests(httpInstrumentationOptions);
		},
		processEvent(event) {
			return serverSpans.processEvent(event);
		}
	};
});
//#endregion
//#region node_modules/@sentry/node-core/build/esm/utils/outgoingFetchRequest.js
var SENTRY_TRACE_HEADER$2 = "sentry-trace";
var SENTRY_BAGGAGE_HEADER$1 = "baggage";
var W3C_TRACEPARENT_HEADER = "traceparent";
function addTracePropagationHeadersToFetchRequest(request, propagationDecisionMap, span) {
	const url = getAbsoluteUrl$1(request.origin, request.path);
	const { tracePropagationTargets, propagateTraceparent } = getClient()?.getOptions() || {};
	if (!shouldPropagateTraceForUrl(url, tracePropagationTargets, propagationDecisionMap)) return;
	const spanForTraceHeaders = span && spanIsIgnored(span) && getActiveSpan$1() ? void 0 : span;
	const addedHeaders = spanForTraceHeaders ? withActiveSpan$1(spanForTraceHeaders, () => getTraceData$1({ propagateTraceparent })) : getTraceData$1({ propagateTraceparent });
	if (!addedHeaders) return;
	const { "sentry-trace": sentryTrace, baggage, traceparent } = addedHeaders;
	const requestHeaders = Array.isArray(request.headers) ? normalizeUndiciHeaderPairs(request.headers) : stringToArrayHeaders(request.headers);
	_deduplicateArrayHeader(requestHeaders, SENTRY_TRACE_HEADER$2);
	_deduplicateArrayHeader(requestHeaders, SENTRY_BAGGAGE_HEADER$1);
	if (propagateTraceparent) _deduplicateArrayHeader(requestHeaders, W3C_TRACEPARENT_HEADER);
	if (!(_findExistingHeaderIndex(requestHeaders, SENTRY_TRACE_HEADER$2) !== -1)) {
		if (sentryTrace) requestHeaders.push(SENTRY_TRACE_HEADER$2, sentryTrace);
		if (traceparent && _findExistingHeaderIndex(requestHeaders, "traceparent") === -1) requestHeaders.push("traceparent", traceparent);
		const existingBaggageIndex = _findExistingHeaderIndex(requestHeaders, SENTRY_BAGGAGE_HEADER$1);
		if (baggage && existingBaggageIndex === -1) requestHeaders.push(SENTRY_BAGGAGE_HEADER$1, baggage);
		else if (baggage) {
			const existingBaggageValue = requestHeaders[existingBaggageIndex + 1];
			const merged = mergeBaggageHeaders(existingBaggageValue, baggage);
			if (merged) requestHeaders[existingBaggageIndex + 1] = merged;
		}
	}
	if (Array.isArray(request.headers)) request.headers.splice(0, request.headers.length, ...requestHeaders);
	else request.headers = arrayToStringHeaders(requestHeaders);
}
function normalizeUndiciHeaderPairs(headers) {
	const out = [];
	for (let i = 0; i < headers.length; i++) {
		const entry = headers[i];
		if (i % 2 === 0) out.push(typeof entry === "string" ? entry : String(entry));
		else out.push(Array.isArray(entry) ? entry.join(", ") : entry ?? "");
	}
	return out;
}
function stringToArrayHeaders(requestHeaders) {
	const headersArray = requestHeaders.split("\r\n");
	const headers = [];
	for (const header of headersArray) try {
		const colonIndex = header.indexOf(":");
		if (colonIndex === -1) continue;
		const key = header.slice(0, colonIndex).trim();
		const value = header.slice(colonIndex + 1).trim();
		if (key) headers.push(key, value);
	} catch {
		debug$3.warn(`Failed to convert string request header to array header: ${header}`);
	}
	return headers;
}
function arrayToStringHeaders(headers) {
	const headerPairs = [];
	for (let i = 0; i < headers.length; i += 2) {
		const key = headers[i];
		const value = headers[i + 1];
		if (!key || value == null) continue;
		headerPairs.push(`${key}: ${value}`);
	}
	if (!headerPairs.length) return "";
	return headerPairs.join("\r\n").concat("\r\n");
}
function _deduplicateArrayHeader(headers, headerName) {
	let firstIndex = -1;
	for (let i = 0; i < headers.length; i += 2) {
		if (headers[i] !== headerName) continue;
		if (firstIndex === -1) {
			firstIndex = i;
			continue;
		}
		const firstHeaderValue = headers[firstIndex + 1];
		if (headerName === SENTRY_BAGGAGE_HEADER$1 && firstHeaderValue) {
			const merged = mergeBaggageHeaders(headers[i + 1], firstHeaderValue);
			if (merged) headers[firstIndex + 1] = merged;
		}
		headers.splice(i, 2);
		i -= 2;
	}
}
function _findExistingHeaderIndex(headers, name) {
	return headers.findIndex((header, i) => i % 2 === 0 && header === name);
}
function addFetchRequestBreadcrumb(request, response) {
	const data = getBreadcrumbData(request);
	const statusCode = response.statusCode;
	const level = getBreadcrumbLogLevelFromHttpStatusCode(statusCode);
	addBreadcrumb({
		category: "http",
		data: {
			status_code: statusCode,
			...data
		},
		type: "http",
		level
	}, {
		event: "response",
		request,
		response
	});
}
function getBreadcrumbData(request) {
	try {
		const url = getAbsoluteUrl$1(request.origin, request.path);
		const parsedUrl = parseUrl(url);
		const data = {
			url: getSanitizedUrlString(parsedUrl),
			"http.method": request.method || "GET"
		};
		if (parsedUrl.search) data["http.query"] = parsedUrl.search;
		if (parsedUrl.hash) data["http.fragment"] = parsedUrl.hash;
		return data;
	} catch {
		return {};
	}
}
function getAbsoluteUrl$1(origin, path = "/") {
	try {
		return new URL(path, origin).toString();
	} catch {
		const url = `${origin}`;
		if (url.endsWith("/") && path.startsWith("/")) return `${url}${path.slice(1)}`;
		if (!url.endsWith("/") && !path.startsWith("/")) return `${url}/${path}`;
		return `${url}${path}`;
	}
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/node-fetch/undici-instrumentation.js
var ATTR_HTTP_REQUEST_METHOD_ORIGINAL = "http.request.method_original";
var _channelSubs = [];
var spanFromReq = /* @__PURE__ */ new WeakMap();
var ignoreRequestMap = /* @__PURE__ */ new WeakMap();
var propagationDecisionMap = new LRUMap(100);
function instrumentUndici(config = {}) {
	if (_channelSubs.length) return;
	subscribeToChannel("undici:request:create", (message) => onRequestCreated(config, message));
	subscribeToChannel("undici:client:sendHeaders", (message) => onRequestHeaders(config, message));
	subscribeToChannel("undici:request:headers", (message) => onResponseHeaders(config, message));
	subscribeToChannel("undici:request:trailers", (message) => onDone(message));
	subscribeToChannel("undici:request:error", (message) => onError(message));
}
function safeExecute(fn, onError2) {
	try {
		return fn();
	} catch (error) {
		onError2(error);
		return;
	}
}
function subscribeToChannel(diagnosticChannel, onMessage) {
	const [major = 0, minor = 0] = process.version.replace("v", "").split(".").map((n) => Number(n));
	if (major > 18 || major === 18 && minor >= 19) _channelSubs.push(diagch.subscribe?.(diagnosticChannel, onMessage));
	else _channelSubs.push(diagch.channel(diagnosticChannel).subscribe(onMessage));
}
function parseRequestHeaders(request) {
	const result = /* @__PURE__ */ new Map();
	if (Array.isArray(request.headers)) for (let i = 0; i < request.headers.length; i += 2) {
		const key = request.headers[i];
		const value = request.headers[i + 1];
		if (typeof key === "string" && value !== void 0) result.set(key.toLowerCase(), value);
	}
	else if (typeof request.headers === "string") {
		const headers = request.headers.split("\r\n");
		for (const line of headers) {
			if (!line) continue;
			const colonIndex = line.indexOf(":");
			if (colonIndex === -1) continue;
			const key = line.substring(0, colonIndex).toLowerCase();
			const value = line.substring(colonIndex + 1).trim();
			const allValues = result.get(key);
			if (allValues && Array.isArray(allValues)) allValues.push(value);
			else if (allValues) result.set(key, [allValues, value]);
			else result.set(key, value);
		}
	}
	return result;
}
function onRequestCreated(config, { request }) {
	const url = getAbsoluteUrl(request.origin, request.path);
	const ignoredByCallback = safeExecute(() => !!config.ignoreOutgoingRequests?.(url), (e) => e && DEBUG_BUILD$3 && debug$3.error("caught ignoreOutgoingRequests error: ", e));
	const ignoreForBreadcrumbs = isTracingSuppressed$1() || !!ignoredByCallback;
	ignoreRequestMap.set(request, ignoreForBreadcrumbs);
	if (!config.spans) {
		if (config.tracePropagation !== false && !ignoreForBreadcrumbs) addTracePropagationHeadersToFetchRequest(request, propagationDecisionMap);
		return;
	}
	if (request.method === "CONNECT" || ignoredByCallback) return;
	let requestUrl;
	try {
		requestUrl = new URL$1(request.path, request.origin);
	} catch (err) {
		DEBUG_BUILD$3 && debug$3.warn("could not determine url.full:", err);
		return;
	}
	const urlScheme = requestUrl.protocol.replace(":", "");
	const requestMethod = getRequestMethod(request.method);
	const attributes = {
		[ns]: requestMethod,
		[ATTR_HTTP_REQUEST_METHOD_ORIGINAL]: request.method,
		[Yu]: requestUrl.toString(),
		[Vu]: requestUrl.pathname,
		[Hu]: requestUrl.search,
		[Ku]: urlScheme,
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.otel.node_fetch"
	};
	if (url.startsWith("data:")) {
		const sanitizedUrl = stripDataUrlContent(url);
		attributes["http.url"] = sanitizedUrl;
		attributes[Yu] = sanitizedUrl;
		attributes[SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME] = `${request.method || "GET"} ${sanitizedUrl}`;
	}
	const schemePorts = {
		https: "443",
		http: "80"
	};
	const serverAddress = requestUrl.hostname;
	const serverPort = requestUrl.port || schemePorts[urlScheme];
	attributes[au] = serverAddress;
	if (serverPort && !isNaN(Number(serverPort))) attributes[ou] = Number(serverPort);
	const userAgentValues = parseRequestHeaders(request).get("user-agent");
	if (userAgentValues) {
		const userAgent = Array.isArray(userAgentValues) ? userAgentValues[userAgentValues.length - 1] : userAgentValues;
		attributes[Qu] = userAgent;
	}
	const client = getClient();
	const span = startInactiveSpan$1({
		name: requestMethod === "_OTHER" ? "HTTP" : requestMethod,
		kind: SPAN_KIND.CLIENT,
		attributes,
		onlyIfParent: !client || !hasSpanStreamingEnabled(client)
	});
	safeExecute(() => config.requestHook?.(span, request), (e) => e && DEBUG_BUILD$3 && debug$3.error("caught requestHook error: ", e));
	addTracePropagationHeadersToFetchRequest(request, propagationDecisionMap, span);
	spanFromReq.set(request, span);
}
function onRequestHeaders(config, { request, socket }) {
	const span = spanFromReq.get(request);
	if (!span) return;
	const { remoteAddress, remotePort } = socket;
	const spanAttributes = {
		[dl]: remoteAddress,
		[ml]: remotePort
	};
	if (config.headersToSpanAttributes?.requestHeaders) {
		const headersToAttribs = new Set(config.headersToSpanAttributes.requestHeaders.map((n) => n.toLowerCase()));
		const headersMap = parseRequestHeaders(request);
		for (const [name, value] of headersMap.entries()) if (headersToAttribs.has(name)) {
			const attrValue = Array.isArray(value) ? value : [value];
			spanAttributes[`http.request.header.${name}`] = attrValue;
		}
	}
	span.setAttributes(spanAttributes);
}
function onResponseHeaders(config, { request, response }) {
	if (config.breadcrumbs !== false && !ignoreRequestMap.get(request)) addFetchRequestBreadcrumb(request, response);
	const span = spanFromReq.get(request);
	if (!span) return;
	const spanAttributes = { [Ss]: response.statusCode };
	safeExecute(() => config.responseHook?.(span, {
		request,
		response
	}), (e) => e && DEBUG_BUILD$3 && debug$3.error("caught responseHook error: ", e));
	if (config.headersToSpanAttributes?.responseHeaders) {
		const headersToAttribs = /* @__PURE__ */ new Set();
		config.headersToSpanAttributes?.responseHeaders.forEach((name) => headersToAttribs.add(name.toLowerCase()));
		for (let idx = 0; idx < response.headers.length; idx = idx + 2) {
			const nameBuf = response.headers[idx];
			const valueBuf = response.headers[idx + 1];
			if (nameBuf === void 0 || valueBuf === void 0) continue;
			const name = nameBuf.toString().toLowerCase();
			const value = valueBuf;
			if (headersToAttribs.has(name)) {
				const attrName = `http.response.header.${name}`;
				if (!Object.prototype.hasOwnProperty.call(spanAttributes, attrName)) spanAttributes[attrName] = [value.toString()];
				else spanAttributes[attrName].push(value.toString());
			}
		}
	}
	span.setAttributes(spanAttributes);
	if (response.statusCode >= 400) span.setStatus(getSpanStatusFromHttpCode(response.statusCode));
}
function onDone({ request }) {
	const span = spanFromReq.get(request);
	if (!span) return;
	span.end();
	spanFromReq.delete(request);
}
function onError({ request, error }) {
	const span = spanFromReq.get(request);
	if (!span) return;
	span.setStatus({
		code: 2,
		message: error.message
	});
	span.end();
	spanFromReq.delete(request);
}
function getRequestMethod(original) {
	if (original.toUpperCase() in {
		CONNECT: true,
		OPTIONS: true,
		HEAD: true,
		GET: true,
		POST: true,
		PUT: true,
		PATCH: true,
		DELETE: true,
		TRACE: true,
		QUERY: true
	}) return original.toUpperCase();
	return "_OTHER";
}
function getAbsoluteUrl(origin, path = "/") {
	const url = `${origin}`;
	if (url.endsWith("/") && path.startsWith("/")) return `${url}${path.slice(1)}`;
	if (!url.endsWith("/") && !path.startsWith("/")) return `${url}/${path}`;
	return `${url}${path}`;
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/node-fetch/index.js
var _nativeNodeFetchIntegration$1 = ((options = {}) => {
	return {
		name: "NodeFetch",
		setupOnce() {
			instrumentUndici(options);
		}
	};
});
var nativeNodeFetchIntegration$1 = defineIntegration(_nativeNodeFetchIntegration$1);
//#endregion
//#region node_modules/@sentry/opentelemetry/build/esm/asyncContextStrategy-Bx5F5tCX.js
var SEMANTIC_ATTRIBUTE_SENTRY_PARENT_IS_REMOTE = "sentry.parentIsRemote";
var SEMANTIC_ATTRIBUTE_SENTRY_GRAPHQL_OPERATION = "sentry.graphql.operation";
function getParentSpanId(span) {
	if ("parentSpanId" in span) return span.parentSpanId;
	else if ("parentSpanContext" in span) return span.parentSpanContext?.spanId;
}
function spanHasAttributes(span) {
	return isObjectLike(span.attributes);
}
function spanHasKind(span) {
	return typeof span.kind === "number";
}
function spanHasStatus(span) {
	return !!span.status;
}
function spanHasName(span) {
	return !!span.name;
}
function getRequestSpanData(span) {
	if (!spanHasAttributes(span)) return {};
	const maybeUrlAttribute = span.attributes["url.full"] || span.attributes["http.url"];
	const data = {
		url: maybeUrlAttribute,
		"http.method": span.attributes["http.request.method"] || span.attributes["http.method"]
	};
	if (!data["http.method"] && data.url) data["http.method"] = "GET";
	try {
		if (typeof maybeUrlAttribute === "string") {
			const url = parseUrl(maybeUrlAttribute);
			data.url = getSanitizedUrlString(url);
			if (url.search) data["http.query"] = url.search;
			if (url.hash) data["http.fragment"] = url.hash;
		}
	} catch {}
	return data;
}
function getSpanKind(span) {
	if (spanHasKind(span)) return span.kind;
	return import_src.SpanKind.INTERNAL;
}
var SENTRY_TRACE_HEADER$1 = "sentry-trace";
var SENTRY_BAGGAGE_HEADER = "baggage";
var SENTRY_TRACE_STATE_DSC = "sentry.dsc";
var SENTRY_TRACE_STATE_SAMPLED_NOT_RECORDING = "sentry.sampled_not_recording";
var SENTRY_TRACE_STATE_URL = "sentry.url";
var SENTRY_TRACE_STATE_SAMPLE_RAND = "sentry.sample_rand";
var SENTRY_TRACE_STATE_SAMPLE_RATE = "sentry.sample_rate";
var SENTRY_TRACE_STATE_CHILD_IGNORED = "sentry.ignored";
var SENTRY_TRACE_STATE_SEGMENT_IGNORED = "sentry.segment_ignored";
var SENTRY_SCOPES_CONTEXT_KEY = (0, import_src.createContextKey)("sentry_scopes");
var SENTRY_FORK_ISOLATION_SCOPE_CONTEXT_KEY = (0, import_src.createContextKey)("sentry_fork_isolation_scope");
var SENTRY_FORK_SET_SCOPE_CONTEXT_KEY = (0, import_src.createContextKey)("sentry_fork_set_scope");
var SENTRY_FORK_SET_ISOLATION_SCOPE_CONTEXT_KEY = (0, import_src.createContextKey)("sentry_fork_set_isolation_scope");
var SCOPE_CONTEXT_FIELD = "_scopeContext";
function getScopesFromContext(context) {
	return context.getValue(SENTRY_SCOPES_CONTEXT_KEY);
}
function setScopesOnContext(context, scopes) {
	return context.setValue(SENTRY_SCOPES_CONTEXT_KEY, scopes);
}
function setContextOnScope(scope, context) {
	addNonEnumerableProperty(scope, SCOPE_CONTEXT_FIELD, makeWeakRef(context));
}
function getContextFromScope(scope) {
	return derefWeakRef(scope[SCOPE_CONTEXT_FIELD]);
}
function getSamplingDecision(spanContext) {
	const { traceFlags, traceState } = spanContext;
	const sampledNotRecording = traceState ? traceState.get(SENTRY_TRACE_STATE_SAMPLED_NOT_RECORDING) === "1" : false;
	if (traceFlags === import_src.TraceFlags.SAMPLED) return true;
	if (sampledNotRecording) return false;
	const dscString = traceState ? traceState.get(SENTRY_TRACE_STATE_DSC) : void 0;
	const dsc = dscString ? baggageHeaderToDynamicSamplingContext(dscString) : void 0;
	if (dsc?.sampled === "true") return true;
	if (dsc?.sampled === "false") return false;
}
function getSampledForPropagation(span, client) {
	const spanContext = span.spanContext();
	const rootSpan = getRootSpan$1(span);
	const samplingDecision = getSamplingDecision(spanContext);
	if (samplingDecision !== void 0) return samplingDecision;
	if (spanIsIgnored(rootSpan)) return false;
	if (!hasSpansEnabled(client?.getOptions()) || spanContext.isRemote || !spanIsSentrySpan(rootSpan)) return;
	return spanIsSampled(span);
}
function inferSpanData(spanName, attributes, kind) {
	const httpMethod = attributes["http.request.method"] || attributes["http.method"];
	if (httpMethod) return descriptionForHttpMethod({
		attributes,
		name: spanName,
		kind
	}, httpMethod);
	const dbSystem = attributes["db.system.name"] || attributes["db.system"];
	const opIsCache = typeof attributes["sentry.op"] === "string" && attributes["sentry.op"].startsWith("cache.");
	if (dbSystem && !opIsCache) return descriptionForDbSystem({
		attributes,
		name: spanName
	});
	const customSourceOrRoute = attributes["sentry.source"] === "custom" ? "custom" : "route";
	if (attributes["rpc.service"]) return {
		...getUserUpdatedNameAndSource(spanName, attributes, "route"),
		op: "rpc"
	};
	if (attributes["messaging.system"]) return {
		...getUserUpdatedNameAndSource(spanName, attributes, customSourceOrRoute),
		op: "message"
	};
	const faasTrigger = attributes[ar];
	if (faasTrigger) return {
		...getUserUpdatedNameAndSource(spanName, attributes, customSourceOrRoute),
		op: faasTrigger.toString()
	};
	return {
		op: void 0,
		description: spanName,
		source: "custom"
	};
}
function parseSpanDescription(span) {
	let attributes;
	let name;
	if (spanHasAttributes(span)) {
		attributes = span.attributes;
		name = spanHasName(span) ? span.name : "<unknown>";
	} else {
		const json = typeof span.spanContext === "function" ? spanToJSON(span) : void 0;
		attributes = json?.data || {};
		name = spanHasName(span) ? span.name : json?.description || "<unknown>";
	}
	const kind = getSpanKind(span);
	return inferSpanData(name, attributes, kind);
}
function descriptionForDbSystem({ attributes, name }) {
	const userDefinedName = attributes[SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
	if (typeof userDefinedName === "string") return {
		op: "db",
		description: userDefinedName,
		source: attributes["sentry.source"] || "custom"
	};
	if (attributes["sentry.source"] === "custom") return {
		op: "db",
		description: name,
		source: "custom"
	};
	const statement = attributes[Ht];
	return {
		op: "db",
		description: statement ? statement.toString() : name,
		source: "task"
	};
}
function descriptionForHttpMethod({ name, kind, attributes }, httpMethod) {
	const opParts = ["http"];
	switch (kind) {
		case import_src.SpanKind.CLIENT:
			opParts.push("client");
			break;
		case import_src.SpanKind.SERVER: opParts.push("server");
	}
	if (attributes["sentry.http.prefetch"]) opParts.push("prefetch");
	const { urlPath, url, query, fragment, hasRoute } = getSanitizedUrl(attributes, kind);
	if (!urlPath) return {
		...getUserUpdatedNameAndSource(name, attributes),
		op: opParts.join(".")
	};
	const graphqlOperationsAttribute = attributes[SEMANTIC_ATTRIBUTE_SENTRY_GRAPHQL_OPERATION];
	const baseDescription = `${httpMethod} ${urlPath}`;
	const inferredDescription = graphqlOperationsAttribute ? `${baseDescription} (${getGraphqlOperationNamesFromAttribute$2(graphqlOperationsAttribute)})` : baseDescription;
	const inferredSource = hasRoute || urlPath === "/" ? "route" : "url";
	const data = {};
	if (url) data.url = url;
	if (query) data["http.query"] = query.slice(1);
	if (fragment) data["http.fragment"] = fragment.slice(1);
	const isClientOrServerKind = kind === import_src.SpanKind.CLIENT || kind === import_src.SpanKind.SERVER;
	const isManualSpan = !`${attributes["sentry.origin"] || "manual"}`.startsWith("auto");
	const alreadyHasCustomSource = attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] === "custom";
	const customSpanName = attributes[SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
	const { description, source } = !alreadyHasCustomSource && customSpanName == null && (isClientOrServerKind || !isManualSpan) ? {
		description: inferredDescription,
		source: inferredSource
	} : getUserUpdatedNameAndSource(name, attributes);
	return {
		op: opParts.join("."),
		description,
		source,
		data
	};
}
function getGraphqlOperationNamesFromAttribute$2(attr) {
	if (Array.isArray(attr)) {
		const sorted = attr.slice().sort();
		if (sorted.length <= 5) return sorted.join(", ");
		else return `${sorted.slice(0, 5).join(", ")}, +${sorted.length - 5}`;
	}
	return `${attr}`;
}
function getSanitizedUrl(attributes, kind) {
	const httpTarget = attributes[xs];
	const httpUrl = attributes["http.url"] || attributes["url.full"];
	const httpRoute = attributes[Ts];
	const parsedUrl = typeof httpUrl === "string" ? parseUrl(httpUrl) : void 0;
	const url = parsedUrl ? getSanitizedUrlString(parsedUrl) : void 0;
	const query = parsedUrl?.search || void 0;
	const fragment = parsedUrl?.hash || void 0;
	if (typeof httpRoute === "string") return {
		urlPath: httpRoute,
		url,
		query,
		fragment,
		hasRoute: true
	};
	if (kind === import_src.SpanKind.SERVER && typeof httpTarget === "string") return {
		urlPath: stripUrlQueryAndFragment(httpTarget),
		url,
		query,
		fragment,
		hasRoute: false
	};
	if (parsedUrl) return {
		urlPath: url,
		url,
		query,
		fragment,
		hasRoute: false
	};
	if (typeof httpTarget === "string") return {
		urlPath: stripUrlQueryAndFragment(httpTarget),
		url,
		query,
		fragment,
		hasRoute: false
	};
	return {
		urlPath: void 0,
		url,
		query,
		fragment,
		hasRoute: false
	};
}
function getUserUpdatedNameAndSource(originalName, attributes, fallbackSource = "custom") {
	const source = attributes["sentry.source"] || fallbackSource;
	const description = attributes[SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
	if (description && typeof description === "string") return {
		description,
		source
	};
	return {
		description: originalName,
		source
	};
}
function enhanceDscWithOpenTelemetryRootSpanName(client) {
	client.on("createDsc", (dsc, rootSpan) => {
		if (!rootSpan) return;
		const jsonSpan = spanToJSON(rootSpan);
		const source = jsonSpan.data[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
		const sampled = getSampledForPropagation(rootSpan, client);
		if (sampled === false) delete dsc.transaction;
		else if (jsonSpan.description) {
			const { description } = parseSpanDescription(rootSpan);
			if (source !== "url" && description) dsc.transaction = description;
		}
		if (hasSpansEnabled()) dsc.sampled = sampled == void 0 ? void 0 : String(sampled);
	});
}
function getActiveSpan() {
	return import_src.trace.getActiveSpan();
}
var DEBUG_BUILD$2 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
var TraceState = class TraceState {
	constructor() {
		this._internalState = /* @__PURE__ */ new Map();
	}
	/** @inheritDoc */
	set(key, value) {
		const next = this._clone();
		if (next._internalState.has(key)) next._internalState.delete(key);
		next._internalState.set(key, value);
		return next;
	}
	/** @inheritDoc */
	unset(key) {
		const next = this._clone();
		next._internalState.delete(key);
		return next;
	}
	/** @inheritDoc */
	get(key) {
		return this._internalState.get(key);
	}
	/** @inheritDoc */
	serialize() {
		return Array.from(this._internalState.keys()).reverse().map((key) => `${key}=${this._internalState.get(key)}`).join(",");
	}
	_clone() {
		const next = new TraceState();
		next._internalState = new Map(this._internalState);
		return next;
	}
};
function makeTraceState({ dsc, sampled }) {
	const dscString = dsc ? dynamicSamplingContextToSentryBaggageHeader(dsc) : void 0;
	const traceStateBase = new TraceState();
	const traceStateWithDsc = dscString ? traceStateBase.set(SENTRY_TRACE_STATE_DSC, dscString) : traceStateBase;
	return sampled === false ? traceStateWithDsc.set(SENTRY_TRACE_STATE_SAMPLED_NOT_RECORDING, "1") : traceStateWithDsc;
}
var setupElements = /* @__PURE__ */ new Set();
function openTelemetrySetupCheck() {
	return Array.from(setupElements);
}
function setIsSetup(element) {
	setupElements.add(element);
}
var SentryPropagator = class extends W3CBaggagePropagator {
	constructor() {
		super();
		setIsSetup("SentryPropagator");
		this._urlMatchesTargetsMap = new LRUMap(100);
	}
	/**
	* @inheritDoc
	*/
	inject(context2, carrier, setter) {
		if (isTracingSuppressed$2(context2)) {
			DEBUG_BUILD$2 && debug$3.log("[Tracing] Not injecting trace data for url because tracing is suppressed.");
			return;
		}
		const activeSpan = import_src.trace.getSpan(context2);
		const url = activeSpan && getCurrentURL(activeSpan);
		const { tracePropagationTargets, propagateTraceparent } = getClient()?.getOptions() || {};
		if (!shouldPropagateTraceForUrl(url, tracePropagationTargets, this._urlMatchesTargetsMap)) {
			DEBUG_BUILD$2 && debug$3.log("[Tracing] Not injecting trace data for url because it does not match tracePropagationTargets:", url);
			return;
		}
		const existingBaggageHeader = getExistingBaggage(carrier);
		const existingSentryTraceHeader = getExistingSentryTrace(carrier);
		let baggage = import_src.propagation.getBaggage(context2) || import_src.propagation.createBaggage({});
		const { dynamicSamplingContext, traceId, spanId, sampled } = getInjectionData(context2);
		if (existingBaggageHeader) {
			const baggageEntries = parseBaggageHeader(existingBaggageHeader);
			if (baggageEntries) Object.entries(baggageEntries).forEach(([key, value]) => {
				if (!existingSentryTraceHeader && key.startsWith("sentry-")) return;
				baggage = baggage.setEntry(key, { value });
			});
		}
		if (!existingSentryTraceHeader && dynamicSamplingContext) baggage = Object.entries(dynamicSamplingContext).reduce((b, [dscKey, dscValue]) => {
			if (dscValue) return b.setEntry(`${SENTRY_BAGGAGE_KEY_PREFIX}${dscKey}`, { value: dscValue });
			return b;
		}, baggage);
		if (!existingSentryTraceHeader && traceId && traceId !== import_src.INVALID_TRACEID) {
			setter.set(carrier, SENTRY_TRACE_HEADER$1, generateSentryTraceHeader(traceId, spanId, sampled));
			if (propagateTraceparent) setter.set(carrier, "traceparent", generateTraceparentHeader(traceId, spanId, sampled));
		}
		super.inject(import_src.propagation.setBaggage(context2, baggage), carrier, setter);
	}
	/**
	* @inheritDoc
	*/
	extract(context2, carrier, getter) {
		const maybeSentryTraceHeader = getter.get(carrier, SENTRY_TRACE_HEADER$1);
		const baggage = getter.get(carrier, SENTRY_BAGGAGE_HEADER);
		return ensureScopesOnContext(getContextWithRemoteActiveSpan(context2, {
			sentryTrace: maybeSentryTraceHeader ? Array.isArray(maybeSentryTraceHeader) ? maybeSentryTraceHeader[0] : maybeSentryTraceHeader : void 0,
			baggage
		}));
	}
	/**
	* @inheritDoc
	*/
	fields() {
		return [
			SENTRY_TRACE_HEADER$1,
			SENTRY_BAGGAGE_HEADER,
			"traceparent"
		];
	}
};
function getInjectionData(context2, options = {}) {
	const span = import_src.trace.getSpan(context2);
	if (span?.spanContext().isRemote) {
		const spanContext = span.spanContext();
		return {
			dynamicSamplingContext: getDynamicSamplingContextFromSpan(span),
			traceId: spanContext.traceId,
			spanId: void 0,
			sampled: getSamplingDecision(spanContext)
		};
	}
	if (span) {
		const spanContext = span.spanContext();
		return {
			dynamicSamplingContext: getDynamicSamplingContextFromSpan(span),
			traceId: spanContext.traceId,
			spanId: spanContext.spanId,
			sampled: getSampledForPropagation(span, options.client)
		};
	}
	const scope = options.scope || getScopesFromContext(context2)?.scope || getCurrentScope();
	const client = options.client || getClient();
	const propagationContext = scope.getPropagationContext();
	return {
		dynamicSamplingContext: client ? getDynamicSamplingContextFromScope(client, scope) : void 0,
		traceId: propagationContext.traceId,
		spanId: propagationContext.propagationSpanId,
		sampled: propagationContext.sampled
	};
}
function getContextWithRemoteActiveSpan(ctx, { sentryTrace, baggage }) {
	const { traceId, parentSpanId, sampled, dsc } = propagationContextFromHeaders(sentryTrace, baggage);
	const client = getClient();
	const incomingDsc = baggageHeaderToDynamicSamplingContext(baggage);
	if (!parentSpanId || client && !shouldContinueTrace(client, incomingDsc?.org_id)) return ctx;
	const spanContext = generateRemoteSpanContext({
		traceId,
		spanId: parentSpanId,
		sampled,
		dsc
	});
	return import_src.trace.setSpanContext(ctx, spanContext);
}
function continueTraceAsRemoteSpan(ctx, options, callback) {
	const ctxWithSpanContext = ensureScopesOnContext(getContextWithRemoteActiveSpan(ctx, options));
	return import_src.context.with(ctxWithSpanContext, callback);
}
function ensureScopesOnContext(ctx) {
	const scopes = getScopesFromContext(ctx);
	return setScopesOnContext(ctx, {
		scope: scopes ? scopes.scope : getCurrentScope().clone(),
		isolationScope: scopes ? scopes.isolationScope : getIsolationScope()
	});
}
function getExistingBaggage(carrier) {
	try {
		const baggage = carrier[SENTRY_BAGGAGE_HEADER];
		return Array.isArray(baggage) ? baggage.join(",") : baggage;
	} catch {
		return;
	}
}
function getExistingSentryTrace(carrier) {
	try {
		return carrier[SENTRY_TRACE_HEADER$1];
	} catch {
		return;
	}
}
function getCurrentURL(span) {
	const spanData = spanToJSON(span).data;
	const urlAttribute = spanData["http.url"] || spanData["url.full"];
	if (typeof urlAttribute === "string") return urlAttribute;
	const urlTraceState = span.spanContext().traceState?.get(SENTRY_TRACE_STATE_URL);
	if (urlTraceState) return urlTraceState;
}
function generateRemoteSpanContext({ spanId, traceId, sampled, dsc }) {
	const traceState = makeTraceState({
		dsc,
		sampled
	});
	return {
		traceId,
		spanId,
		isRemote: true,
		traceFlags: sampled ? import_src.TraceFlags.SAMPLED : import_src.TraceFlags.NONE,
		traceState
	};
}
function _startSpan(options, callback, autoEnd) {
	const tracer = getTracer();
	const { name, parentSpan: customParentSpan } = options;
	return getActiveSpanWrapper(customParentSpan)(() => {
		const activeCtx = getContext(options.scope, options.forceTransaction);
		const missingRequiredParent = options.onlyIfParent && !import_src.trace.getSpan(activeCtx);
		const ctx = missingRequiredParent ? suppressTracing$2(activeCtx) : activeCtx;
		if (missingRequiredParent) getClient()?.recordDroppedEvent("no_parent_span", "span");
		const spanOptions = getSpanOptions(options);
		if (!hasSpansEnabled()) {
			const suppressedCtx = isTracingSuppressed$2(ctx) ? ctx : suppressTracing$2(ctx);
			return import_src.context.with(suppressedCtx, () => {
				return tracer.startActiveSpan(name, spanOptions, suppressedCtx, (span) => {
					patchSpanEnd(span);
					return import_src.context.with(activeCtx, () => {
						return handleCallbackErrors(() => callback(span), () => {
							if (spanToJSON(span).status === void 0) span.setStatus({ code: import_src.SpanStatusCode.ERROR });
						}, autoEnd ? () => span.end() : void 0);
					});
				});
			});
		}
		return tracer.startActiveSpan(name, spanOptions, ctx, (span) => {
			patchSpanEnd(span);
			return handleCallbackErrors(() => callback(span), () => {
				if (spanToJSON(span).status === void 0) span.setStatus({ code: import_src.SpanStatusCode.ERROR });
			}, autoEnd ? () => span.end() : void 0);
		});
	});
}
function startSpan$2(options, callback) {
	return _startSpan(options, callback, true);
}
function startSpanManual(options, callback) {
	return _startSpan(options, (span) => callback(span, () => span.end()), false);
}
function startInactiveSpan(options) {
	const tracer = getTracer();
	const { name, parentSpan: customParentSpan } = options;
	return getActiveSpanWrapper(customParentSpan)(() => {
		const activeCtx = getContext(options.scope, options.forceTransaction);
		const missingRequiredParent = options.onlyIfParent && !import_src.trace.getSpan(activeCtx);
		let ctx = missingRequiredParent ? suppressTracing$2(activeCtx) : activeCtx;
		if (missingRequiredParent) getClient()?.recordDroppedEvent("no_parent_span", "span");
		const spanOptions = getSpanOptions(options);
		if (!hasSpansEnabled()) ctx = isTracingSuppressed$2(ctx) ? ctx : suppressTracing$2(ctx);
		const span = tracer.startSpan(name, spanOptions, ctx);
		patchSpanEnd(span);
		return span;
	});
}
function withActiveSpan(span, callback) {
	const newContextWithActiveSpan = span ? import_src.trace.setSpan(import_src.context.active(), span) : import_src.trace.deleteSpan(import_src.context.active());
	return import_src.context.with(newContextWithActiveSpan, () => callback(getCurrentScope()));
}
function getTracer() {
	return getClient()?.tracer || import_src.trace.getTracer("@sentry/opentelemetry", "10.74.0");
}
function getSpanOptions(options) {
	const { startTime, attributes, kind, op, links } = options;
	const fixedStartTime = typeof startTime === "number" ? ensureTimestampInMilliseconds(startTime) : startTime;
	return {
		attributes: op ? {
			[SEMANTIC_ATTRIBUTE_SENTRY_OP]: op,
			...attributes
		} : attributes,
		kind,
		links,
		startTime: fixedStartTime
	};
}
function ensureTimestampInMilliseconds(timestamp) {
	return timestamp < 9999999999 ? timestamp * 1e3 : timestamp;
}
function patchSpanEnd(span) {
	const originalEnd = span.end.bind(span);
	span.end = (endTime) => {
		return originalEnd(typeof endTime === "number" ? ensureTimestampInMilliseconds(endTime) : endTime);
	};
}
function getContext(scope, forceTransaction) {
	const ctx = getContextForScope(scope);
	const parentSpan = import_src.trace.getSpan(ctx);
	if (!parentSpan) return ctx;
	if (!forceTransaction) return ctx;
	const ctxWithoutSpan = import_src.trace.deleteSpan(ctx);
	const { spanId, traceId } = parentSpan.spanContext();
	const sampled = getSamplingDecision(parentSpan.spanContext());
	const rootSpan = getRootSpan$1(parentSpan);
	const traceState = makeTraceState({
		dsc: getDynamicSamplingContextFromSpan(rootSpan),
		sampled
	});
	const spanOptions = {
		traceId,
		spanId,
		isRemote: true,
		traceFlags: sampled ? import_src.TraceFlags.SAMPLED : import_src.TraceFlags.NONE,
		traceState
	};
	return import_src.trace.setSpanContext(ctxWithoutSpan, spanOptions);
}
function getContextForScope(scope) {
	if (scope) {
		const ctx = getContextFromScope(scope);
		if (ctx) return ctx;
	}
	return import_src.context.active();
}
function continueTrace(options, callback) {
	return continueTraceAsRemoteSpan(import_src.context.active(), options, callback);
}
function startNewTrace(callback) {
	const traceId = generateTraceId();
	const spanContext = {
		traceId,
		spanId: generateSpanId(),
		isRemote: true,
		traceFlags: import_src.TraceFlags.NONE
	};
	const ctxWithTrace = import_src.trace.setSpanContext(import_src.context.active(), spanContext);
	return import_src.context.with(ctxWithTrace, () => {
		getCurrentScope().setPropagationContext({
			traceId,
			sampleRand: safeMathRandom()
		});
		return callback();
	});
}
function getTraceContextForScope(client, scope) {
	const ctx = getContextFromScope(scope);
	const span = ctx && import_src.trace.getSpan(ctx);
	const traceContext = span ? spanToTraceContext(span) : getTraceContextFromScope(scope);
	return [span ? getDynamicSamplingContextFromSpan(span) : getDynamicSamplingContextFromScope(client, scope), traceContext];
}
function getActiveSpanWrapper(parentSpan) {
	return parentSpan !== void 0 ? (callback) => {
		return withActiveSpan(parentSpan, callback);
	} : (callback) => callback();
}
function suppressTracing(callback) {
	const ctx = suppressTracing$2(import_src.context.active());
	return import_src.context.with(ctx, callback);
}
function isTracingSuppressed(scope) {
	const ctx = scope ? getContextFromScope(scope) : import_src.context.active();
	return ctx ? isTracingSuppressed$2(ctx) : false;
}
function setupEventContextTrace(client) {
	client.on("preprocessEvent", (event) => {
		const span = getActiveSpan();
		if (!span || event.type === "transaction") return;
		event.contexts = {
			trace: spanToTraceContext(span),
			...event.contexts
		};
		const rootSpan = getRootSpan$1(span);
		event.sdkProcessingMetadata = {
			dynamicSamplingContext: getDynamicSamplingContextFromSpan(rootSpan),
			...event.sdkProcessingMetadata
		};
		return event;
	});
}
function buildContextWithSentryScopes(context, activeContext) {
	const span = import_src.trace.getSpan(context);
	let effectiveContext;
	if (span?.spanContext().traceState?.get("sentry.ignored") === "1") {
		const contextWithoutSpan = import_src.trace.deleteSpan(context);
		const parentSpan = import_src.trace.getSpan(activeContext);
		effectiveContext = parentSpan ? import_src.trace.setSpan(contextWithoutSpan, parentSpan) : contextWithoutSpan;
	} else effectiveContext = context;
	const currentScopes = getScopesFromContext(effectiveContext);
	const currentScope = currentScopes?.scope || getCurrentScope();
	const currentIsolationScope = currentScopes?.isolationScope || getIsolationScope();
	const shouldForkIsolationScope = effectiveContext.getValue(SENTRY_FORK_ISOLATION_SCOPE_CONTEXT_KEY) === true;
	const scope = effectiveContext.getValue(SENTRY_FORK_SET_SCOPE_CONTEXT_KEY);
	const isolationScope = effectiveContext.getValue(SENTRY_FORK_SET_ISOLATION_SCOPE_CONTEXT_KEY);
	const newCurrentScope = scope || currentScope.clone();
	const scopes = {
		scope: newCurrentScope,
		isolationScope: isolationScope || (shouldForkIsolationScope ? currentIsolationScope.clone() : currentIsolationScope)
	};
	const ctx2 = setScopesOnContext(effectiveContext, scopes).deleteValue(SENTRY_FORK_ISOLATION_SCOPE_CONTEXT_KEY).deleteValue(SENTRY_FORK_SET_SCOPE_CONTEXT_KEY).deleteValue(SENTRY_FORK_SET_ISOLATION_SCOPE_CONTEXT_KEY);
	setContextOnScope(newCurrentScope, ctx2);
	return ctx2;
}
function groupSpansWithParents(spans) {
	const nodeMap = /* @__PURE__ */ new Map();
	for (const span of spans) createOrUpdateSpanNodeAndRefs(nodeMap, span);
	return Array.from(nodeMap, function([_id, spanNode]) {
		return spanNode;
	});
}
function getLocalParentId(span) {
	return !(span.attributes[SEMANTIC_ATTRIBUTE_SENTRY_PARENT_IS_REMOTE] === true) ? getParentSpanId(span) : void 0;
}
function createOrUpdateSpanNodeAndRefs(nodeMap, span) {
	const id = span.spanContext().spanId;
	const parentId = getLocalParentId(span);
	if (!parentId) {
		createOrUpdateNode(nodeMap, {
			id,
			span,
			children: []
		});
		return;
	}
	const parentNode = createOrGetParentNode(nodeMap, parentId);
	const node = createOrUpdateNode(nodeMap, {
		id,
		span,
		parentNode,
		children: []
	});
	parentNode.children.push(node);
}
function createOrGetParentNode(nodeMap, id) {
	const existing = nodeMap.get(id);
	if (existing) return existing;
	return createOrUpdateNode(nodeMap, {
		id,
		children: []
	});
}
function createOrUpdateNode(nodeMap, spanNode) {
	const existing = nodeMap.get(spanNode.id);
	if (existing?.span) return existing;
	if (existing && !existing.span) {
		existing.span = spanNode.span;
		existing.parentNode = spanNode.parentNode;
		return existing;
	}
	nodeMap.set(spanNode.id, spanNode);
	return spanNode;
}
var canonicalGrpcErrorCodesMap = {
	"1": "cancelled",
	"2": "unknown_error",
	"3": "invalid_argument",
	"4": "deadline_exceeded",
	"5": "not_found",
	"6": "already_exists",
	"7": "permission_denied",
	"8": "resource_exhausted",
	"9": "failed_precondition",
	"10": "aborted",
	"11": "out_of_range",
	"12": "unimplemented",
	"13": "internal_error",
	"14": "unavailable",
	"15": "data_loss",
	"16": "unauthenticated"
};
var isStatusErrorMessageValid = (message) => {
	return Object.values(canonicalGrpcErrorCodesMap).includes(message);
};
function mapStatus(span) {
	const attributes = spanHasAttributes(span) ? span.attributes : {};
	const status = spanHasStatus(span) ? span.status : void 0;
	if (status) {
		if (status.code === import_src.SpanStatusCode.OK) return { code: 1 };
		else if (status.code === import_src.SpanStatusCode.ERROR) {
			if (typeof status.message === "undefined") {
				const inferredStatus2 = inferStatusFromAttributes(attributes);
				if (inferredStatus2) return inferredStatus2;
			}
			if (status.message && isStatusErrorMessageValid(status.message)) return {
				code: 2,
				message: status.message
			};
			else return {
				code: 2,
				message: "internal_error"
			};
		}
	}
	const inferredStatus = inferStatusFromAttributes(attributes);
	if (inferredStatus) return inferredStatus;
	if (status?.code === import_src.SpanStatusCode.UNSET) return { code: 1 };
	else return {
		code: 2,
		message: "unknown_error"
	};
}
function inferStatusFromAttributes(attributes) {
	const httpCodeAttribute = attributes["http.response.status_code"] || attributes["http.status_code"];
	const grpcCodeAttribute = attributes[fp];
	const numberHttpCode = typeof httpCodeAttribute === "number" ? httpCodeAttribute : typeof httpCodeAttribute === "string" ? parseInt(httpCodeAttribute) : void 0;
	if (typeof numberHttpCode === "number") return getSpanStatusFromHttpCode(numberHttpCode);
	if (typeof grpcCodeAttribute === "string") return {
		code: 2,
		message: canonicalGrpcErrorCodesMap[grpcCodeAttribute] || "unknown_error"
	};
}
var MAX_SPAN_COUNT = 1e3;
var DEFAULT_TIMEOUT = 300;
var SENT_SPANS_MAX_SIZE = 1e4;
var SentrySpanExporter = class {
	constructor(options) {
		this._finishedSpanBucketSize = options?.timeout || DEFAULT_TIMEOUT;
		this._finishedSpanBuckets = new Array(this._finishedSpanBucketSize).fill(void 0);
		this._lastCleanupTimestampInS = Math.floor(safeDateNow() / 1e3);
		this._spansToBucketEntry = /* @__PURE__ */ new WeakMap();
		this._sentSpans = new LRUMap(SENT_SPANS_MAX_SIZE);
		this._debouncedFlush = debounce(this.flush.bind(this), 1, { maxWait: 100 });
	}
	/**
	* Export a single span.
	* This is called by the span processor whenever a span is ended.
	*/
	export(span) {
		const currentTimestampInS = Math.floor(safeDateNow() / 1e3);
		if (this._lastCleanupTimestampInS !== currentTimestampInS) {
			let droppedSpanCount = 0;
			this._finishedSpanBuckets.forEach((bucket, i) => {
				if (bucket && bucket.timestampInS <= currentTimestampInS - this._finishedSpanBucketSize) {
					droppedSpanCount += bucket.spans.size;
					this._finishedSpanBuckets[i] = void 0;
				}
			});
			if (droppedSpanCount > 0) DEBUG_BUILD$2 && debug$3.log(`SpanExporter dropped ${droppedSpanCount} spans because they were pending for more than ${this._finishedSpanBucketSize} seconds.`);
			this._lastCleanupTimestampInS = currentTimestampInS;
		}
		const currentBucketIndex = currentTimestampInS % this._finishedSpanBucketSize;
		const currentBucket = this._finishedSpanBuckets[currentBucketIndex] || {
			timestampInS: currentTimestampInS,
			spans: /* @__PURE__ */ new Set()
		};
		this._finishedSpanBuckets[currentBucketIndex] = currentBucket;
		currentBucket.spans.add(span);
		this._spansToBucketEntry.set(span, currentBucket);
		const localParentId = getLocalParentId(span);
		if (!localParentId || this._sentSpans.get(localParentId)) this._debouncedFlush();
	}
	/**
	* Try to flush any pending spans immediately.
	* This is called internally by the exporter (via _debouncedFlush),
	* but can also be triggered externally if we force-flush.
	*/
	flush() {
		const finishedSpans = this._finishedSpanBuckets.flatMap((bucket) => bucket ? Array.from(bucket.spans) : []);
		const sentSpans = this._maybeSend(finishedSpans);
		const sentSpanCount = sentSpans.size;
		const remainingOpenSpanCount = finishedSpans.length - sentSpanCount;
		DEBUG_BUILD$2 && debug$3.log(`SpanExporter exported ${sentSpanCount} spans, ${remainingOpenSpanCount} spans are waiting for their parent spans to finish`);
		for (const span of sentSpans) {
			this._sentSpans.set(span.spanContext().spanId, 1);
			const bucketEntry = this._spansToBucketEntry.get(span);
			if (bucketEntry) bucketEntry.spans.delete(span);
		}
		this._debouncedFlush.cancel();
	}
	/**
	* Clear the exporter.
	* This is called when the span processor is shut down.
	*/
	clear() {
		this._finishedSpanBuckets = this._finishedSpanBuckets.fill(void 0);
		this._sentSpans.clear();
		this._debouncedFlush.cancel();
	}
	/**
	* Send the given spans, but only if they are part of a finished transaction.
	*
	* Returns the sent spans.
	* Spans remain unsent when their parent span is not yet finished.
	* This will happen regularly, as child spans are generally finished before their parents.
	* But it _could_ also happen because, for whatever reason, a parent span was lost.
	* In this case, we'll eventually need to clean this up.
	*/
	_maybeSend(spans) {
		const grouped = groupSpansWithParents(spans);
		const sentSpans = /* @__PURE__ */ new Set();
		const rootNodes = this._getCompletedRootNodes(grouped);
		for (const root of rootNodes) {
			const span = root.span;
			sentSpans.add(span);
			const transactionEvent = createTransactionForOtelSpan(span);
			if (root.parentNode && this._sentSpans.get(root.parentNode.id)) {
				const traceData = transactionEvent.contexts?.trace?.data;
				if (traceData) traceData["sentry.parent_span_already_sent"] = true;
			}
			const spans2 = transactionEvent.spans || [];
			let hasGenAiSpans = false;
			for (const child of root.children) if (createAndFinishSpanForOtelSpan(child, spans2, sentSpans)) hasGenAiSpans = true;
			transactionEvent.spans = spans2.length > MAX_SPAN_COUNT ? spans2.sort((a, b) => a.start_timestamp - b.start_timestamp).slice(0, MAX_SPAN_COUNT) : spans2;
			if (hasGenAiSpans) transactionEvent.sdkProcessingMetadata = {
				...transactionEvent.sdkProcessingMetadata,
				hasGenAiSpans: true
			};
			const measurements = timedEventsToMeasurements(span.events);
			if (measurements) transactionEvent.measurements = measurements;
			captureEvent(transactionEvent);
		}
		return sentSpans;
	}
	/** Check if a node is a completed root node or a node whose parent has already been sent */
	_nodeIsCompletedRootNodeOrHasSentParent(node) {
		return !!node.span && (!node.parentNode || !!this._sentSpans.get(node.parentNode.id));
	}
	/** Get all completed root nodes from a list of nodes */
	_getCompletedRootNodes(nodes) {
		return nodes.filter((node) => this._nodeIsCompletedRootNodeOrHasSentParent(node));
	}
};
function parseSpan(span) {
	const attributes = span.attributes;
	return {
		origin: attributes[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN],
		op: attributes[SEMANTIC_ATTRIBUTE_SENTRY_OP],
		source: attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]
	};
}
function createTransactionForOtelSpan(span) {
	const { op, description, data, origin = "manual", source } = getSpanData(span);
	const capturedSpanScopes = getCapturedScopesOnSpan(span);
	const sampleRate = span.attributes[SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE];
	const attributes = {
		[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: source,
		[SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE]: sampleRate,
		[SEMANTIC_ATTRIBUTE_SENTRY_OP]: op,
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: origin,
		...data,
		...removeSentryAttributes(span.attributes)
	};
	const { links } = span;
	const { traceId: trace_id, spanId: span_id } = span.spanContext();
	const parent_span_id = getParentSpanId(span);
	const status = mapStatus(span);
	const traceContext = {
		parent_span_id,
		span_id,
		trace_id,
		data: attributes,
		origin,
		op,
		status: getStatusMessage(status),
		links: convertSpanLinksForEnvelope(links)
	};
	const statusCode = attributes[Ss];
	const responseContext = typeof statusCode === "number" ? { response: { status_code: statusCode } } : void 0;
	return {
		contexts: {
			trace: traceContext,
			otel: { resource: span.resource.attributes },
			...responseContext
		},
		spans: [],
		start_timestamp: spanTimeInputToSeconds(span.startTime),
		timestamp: spanTimeInputToSeconds(span.endTime),
		transaction: description,
		type: "transaction",
		sdkProcessingMetadata: {
			capturedSpanScope: capturedSpanScopes.scope,
			capturedSpanIsolationScope: capturedSpanScopes.isolationScope,
			sampleRate,
			dynamicSamplingContext: getDynamicSamplingContextFromSpan(span)
		},
		...source && { transaction_info: { source } }
	};
}
function createAndFinishSpanForOtelSpan(node, spans, sentSpans) {
	const span = node.span;
	if (span) sentSpans.add(span);
	if (!span) {
		let hasGenAiSpans2 = false;
		node.children.forEach((child) => {
			if (createAndFinishSpanForOtelSpan(child, spans, sentSpans)) hasGenAiSpans2 = true;
		});
		return hasGenAiSpans2;
	}
	const span_id = span.spanContext().spanId;
	const trace_id = span.spanContext().traceId;
	const parentSpanId = getParentSpanId(span);
	const { attributes, startTime, endTime, links } = span;
	const { op, description, data, origin = "manual" } = getSpanData(span);
	const allData = {
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: origin,
		[SEMANTIC_ATTRIBUTE_SENTRY_OP]: op,
		...removeSentryAttributes(attributes),
		...data
	};
	const status = mapStatus(span);
	const spanJSON = {
		span_id,
		trace_id,
		data: allData,
		description,
		parent_span_id: parentSpanId,
		start_timestamp: spanTimeInputToSeconds(startTime),
		timestamp: spanTimeInputToSeconds(endTime) || void 0,
		status: getStatusMessage(status),
		op,
		origin,
		measurements: timedEventsToMeasurements(span.events),
		links: convertSpanLinksForEnvelope(links)
	};
	spans.push(spanJSON);
	let hasGenAiSpans = !!op?.startsWith("gen_ai.");
	node.children.forEach((child) => {
		if (createAndFinishSpanForOtelSpan(child, spans, sentSpans)) hasGenAiSpans = true;
	});
	return hasGenAiSpans;
}
function getSpanData(span) {
	const { op: definedOp, source: definedSource, origin } = parseSpan(span);
	const { op: inferredOp, description, source: inferredSource, data: inferredData } = parseSpanDescription(span);
	return {
		op: definedOp || inferredOp,
		description,
		source: definedSource || inferredSource,
		origin,
		data: {
			...inferredData,
			...getData(span)
		}
	};
}
function removeSentryAttributes(data) {
	const cleanedData = { ...data };
	delete cleanedData[SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE];
	delete cleanedData[SEMANTIC_ATTRIBUTE_SENTRY_PARENT_IS_REMOTE];
	delete cleanedData[SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
	return cleanedData;
}
function getData(span) {
	const attributes = span.attributes;
	const data = {};
	if (span.kind !== import_src.SpanKind.INTERNAL) data["otel.kind"] = import_src.SpanKind[span.kind];
	const maybeHttpStatusCodeAttribute = attributes[As];
	if (maybeHttpStatusCodeAttribute) data[Ss] = maybeHttpStatusCodeAttribute;
	const requestData = getRequestSpanData(span);
	if (requestData.url) data.url = requestData.url;
	if (requestData["http.query"]) data["http.query"] = requestData["http.query"].slice(1);
	if (requestData["http.fragment"]) data["http.fragment"] = requestData["http.fragment"].slice(1);
	return data;
}
function backfillStreamedSpanDataFromOtel(spanJSON, hint) {
	const attributes = spanJSON.attributes ?? {};
	const kind = hint?.spanKind ?? SPAN_KIND.INTERNAL;
	const { op, description, source, data } = inferSpanData(spanJSON.name, attributes, kind);
	spanJSON.name = description;
	safeSetSpanJSONAttributes(spanJSON, {
		[SEMANTIC_ATTRIBUTE_SENTRY_OP]: op,
		[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: source,
		[Ec]: "manual",
		...data
	});
	if (kind !== SPAN_KIND.INTERNAL) safeSetSpanJSONAttributes(spanJSON, { "otel.kind": spanKindToName(kind) });
}
var SentrySpanProcessor = class {
	constructor(options) {
		this._unsubscribePreprocessSpan = void 0;
		setIsSetup("SentrySpanProcessor");
		this._exporter = new SentrySpanExporter(options);
		this._client = options?.client ?? getClient();
		if (this._client && hasSpanStreamingEnabled(this._client)) this._unsubscribePreprocessSpan = this._client.on("preprocessSpan", backfillStreamedSpanDataFromOtel);
	}
	/**
	* @inheritDoc
	*/
	async forceFlush() {
		this._exporter.flush();
	}
	/**
	* @inheritDoc
	*/
	async shutdown() {
		this._unsubscribePreprocessSpan?.();
		this._exporter.clear();
	}
	/**
	* @inheritDoc
	*/
	onStart(span, parentContext) {
		const parentSpan = import_src.trace.getSpan(parentContext);
		let scopes = getScopesFromContext(parentContext);
		if (parentSpan && !parentSpan.spanContext().isRemote) addChildSpanToSpan(parentSpan, span);
		if (parentSpan?.spanContext().isRemote) span.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_PARENT_IS_REMOTE, true);
		if (parentContext === import_src.ROOT_CONTEXT) scopes = {
			scope: getDefaultCurrentScope(),
			isolationScope: getDefaultIsolationScope()
		};
		if (scopes) setCapturedScopesOnSpan(span, scopes.scope, scopes.isolationScope);
		logSpanStart(span);
		this._client?.emit("spanStart", span);
	}
	/** @inheritDoc */
	onEnd(span) {
		logSpanEnd(span);
		this._client?.emit("spanEnd", span);
		if (this._client && hasSpanStreamingEnabled(this._client)) this._client.emit("afterSpanEnd", span);
		else this._exporter.export(span);
	}
};
var SentrySampler = class {
	constructor(client) {
		this._client = client;
		this._isSpanStreaming = hasSpanStreamingEnabled(client);
		setIsSetup("SentrySampler");
	}
	/** @inheritDoc */
	shouldSample(context, traceId, spanName, spanKind, spanAttributes, _links) {
		const options = this._client.getOptions();
		const { ignoreSpans } = options;
		const parentSpan = getValidSpan(context);
		const parentContext = parentSpan?.spanContext();
		if (!hasSpansEnabled(options)) return wrapSamplingDecision({
			decision: void 0,
			context,
			spanAttributes
		});
		const maybeSpanHttpMethod = spanAttributes["http.method"] || spanAttributes["http.request.method"];
		if (spanKind === import_src.SpanKind.CLIENT && maybeSpanHttpMethod && (!parentSpan || parentContext?.isRemote)) {
			if (!this._isSpanStreaming) {
				this._client.recordDroppedEvent("no_parent_span", "span");
				return wrapSamplingDecision({
					decision: void 0,
					context,
					spanAttributes
				});
			}
		}
		const parentSampled = parentSpan ? getParentSampled(parentSpan, traceId, spanName) : void 0;
		if (!(!parentSpan || parentContext?.isRemote)) {
			if (this._isSpanStreaming) {
				if (parentSampled) {
					if (ignoreSpans?.length) {
						const { description: inferredChildName, op: childOp } = inferSpanData(spanName, spanAttributes, spanKind);
						if (shouldIgnoreSpan$1({
							description: inferredChildName,
							op: spanAttributes["sentry.op"] ?? childOp,
							attributes: spanAttributes
						}, ignoreSpans)) {
							this._client.recordDroppedEvent("ignored", "span");
							return wrapSamplingDecision({
								decision: SamplingDecision.NOT_RECORD,
								context,
								spanAttributes,
								ignoredChildSpan: true
							});
						}
					}
				}
				if (!parentSampled) {
					const parentSegmentIgnored = parentContext?.traceState?.get(SENTRY_TRACE_STATE_SEGMENT_IGNORED) === "1";
					this._client.recordDroppedEvent(parentSegmentIgnored ? "ignored" : "sample_rate", "span");
				}
			}
			return wrapSamplingDecision({
				decision: parentSampled ? SamplingDecision.RECORD_AND_SAMPLED : SamplingDecision.NOT_RECORD,
				context,
				spanAttributes
			});
		}
		const { description: inferredSpanName, data: inferredAttributes, op } = inferSpanData(spanName, spanAttributes, spanKind);
		const mergedAttributes = {
			...inferredAttributes,
			...spanAttributes
		};
		if (op) mergedAttributes[SEMANTIC_ATTRIBUTE_SENTRY_OP] = op;
		if (this._isSpanStreaming && ignoreSpans?.length && shouldIgnoreSpan$1({
			description: inferredSpanName,
			op: mergedAttributes["sentry.op"] ?? op,
			attributes: mergedAttributes
		}, ignoreSpans)) {
			this._client.recordDroppedEvent("ignored", "span");
			return wrapSamplingDecision({
				decision: SamplingDecision.NOT_RECORD,
				context,
				spanAttributes,
				ignoredSegmentSpan: true
			});
		}
		const mutableSamplingDecision = { decision: true };
		this._client.emit("beforeSampling", {
			spanAttributes: mergedAttributes,
			spanName: inferredSpanName,
			parentSampled,
			parentContext
		}, mutableSamplingDecision);
		if (!mutableSamplingDecision.decision) return wrapSamplingDecision({
			decision: void 0,
			context,
			spanAttributes
		});
		const { isolationScope } = getScopesFromContext(context) ?? {};
		const dscString = parentContext?.traceState ? parentContext.traceState.get(SENTRY_TRACE_STATE_DSC) : void 0;
		const dsc = dscString ? baggageHeaderToDynamicSamplingContext(dscString) : void 0;
		const sampleRand = parseSampleRate(dsc?.sample_rand) ?? safeMathRandom();
		const [sampled, sampleRate, localSampleRateWasApplied] = sampleSpan(options, {
			name: inferredSpanName,
			attributes: mergedAttributes,
			normalizedRequest: isolationScope?.getScopeData().sdkProcessingMetadata.normalizedRequest,
			parentSampled,
			parentSampleRate: parseSampleRate(dsc?.sample_rate)
		}, sampleRand);
		const method = `${maybeSpanHttpMethod}`.toUpperCase();
		if (method === "OPTIONS" || method === "HEAD") {
			DEBUG_BUILD$2 && debug$3.log(`[Tracing] Not sampling span because HTTP method is '${method}' for ${spanName}`);
			return wrapSamplingDecision({
				decision: SamplingDecision.NOT_RECORD,
				context,
				spanAttributes,
				sampleRand,
				downstreamTraceSampleRate: 0
			});
		}
		if (!sampled && parentSampled === void 0) {
			DEBUG_BUILD$2 && debug$3.log("[Tracing] Discarding root span because its trace was not chosen to be sampled.");
			this._client.recordDroppedEvent("sample_rate", this._isSpanStreaming ? "span" : "transaction");
		}
		return {
			...wrapSamplingDecision({
				decision: sampled ? SamplingDecision.RECORD_AND_SAMPLED : SamplingDecision.NOT_RECORD,
				context,
				spanAttributes,
				sampleRand,
				downstreamTraceSampleRate: localSampleRateWasApplied ? sampleRate : void 0
			}),
			attributes: { [SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE]: localSampleRateWasApplied ? sampleRate : void 0 }
		};
	}
	/** Returns the sampler name or short description with the configuration. */
	toString() {
		return "SentrySampler";
	}
};
function getParentSampled(parentSpan, traceId, spanName) {
	const parentContext = parentSpan.spanContext();
	if ((0, import_src.isSpanContextValid)(parentContext) && parentContext.traceId === traceId) {
		if (parentContext.isRemote) {
			const parentSampled2 = getSamplingDecision(parentSpan.spanContext());
			DEBUG_BUILD$2 && debug$3.log(`[Tracing] Inheriting remote parent's sampled decision for ${spanName}: ${parentSampled2}`);
			return parentSampled2;
		}
		const parentSampled = getSamplingDecision(parentContext);
		DEBUG_BUILD$2 && debug$3.log(`[Tracing] Inheriting parent's sampled decision for ${spanName}: ${parentSampled}`);
		return parentSampled;
	}
}
function wrapSamplingDecision({ decision, context, spanAttributes, sampleRand, downstreamTraceSampleRate, ignoredChildSpan, ignoredSegmentSpan }) {
	let traceState = getBaseTraceState(context, spanAttributes);
	if (downstreamTraceSampleRate !== void 0) traceState = traceState.set(SENTRY_TRACE_STATE_SAMPLE_RATE, `${downstreamTraceSampleRate}`);
	if (sampleRand !== void 0) traceState = traceState.set(SENTRY_TRACE_STATE_SAMPLE_RAND, `${sampleRand}`);
	if (ignoredChildSpan) traceState = traceState.set(SENTRY_TRACE_STATE_CHILD_IGNORED, "1");
	if (ignoredSegmentSpan) traceState = traceState.set(SENTRY_TRACE_STATE_SEGMENT_IGNORED, "1");
	if (decision == void 0) return {
		decision: SamplingDecision.NOT_RECORD,
		traceState
	};
	if (decision === SamplingDecision.NOT_RECORD) return {
		decision,
		traceState: traceState.set(SENTRY_TRACE_STATE_SAMPLED_NOT_RECORDING, "1")
	};
	return {
		decision,
		traceState
	};
}
function getBaseTraceState(context, spanAttributes) {
	let traceState = (import_src.trace.getSpan(context)?.spanContext())?.traceState || new TraceState();
	const url = spanAttributes["http.url"] || spanAttributes["url.full"];
	if (url && typeof url === "string") traceState = traceState.set(SENTRY_TRACE_STATE_URL, url);
	return traceState;
}
function getValidSpan(context) {
	const span = import_src.trace.getSpan(context);
	return span && (0, import_src.isSpanContextValid)(span.spanContext()) ? span : void 0;
}
function applyOtelSpanData(span, options = {}) {
	const spanJSON = spanToJSON(span);
	const attributes = spanJSON.data;
	const kind = span.kind ?? import_src.SpanKind.INTERNAL;
	const mayInferSource = spanShouldInferOtelSource(span);
	const hasCustomSpanName = attributes[SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME] !== void 0;
	const canInferSource = mayInferSource && !hasCustomSpanName && !spanSourceWasExplicitlySet(span);
	const attributesForInference = canInferSource && attributes["sentry.source"] === "custom" ? {
		...attributes,
		[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: void 0
	} : attributes;
	const inferred = inferSpanData(spanJSON.description || "<unknown>", attributesForInference, kind);
	if (kind !== import_src.SpanKind.INTERNAL && attributes["otel.kind"] === void 0) span.setAttribute("otel.kind", import_src.SpanKind[kind]);
	if (inferred.op && attributes["sentry.op"] === void 0) span.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_OP, inferred.op);
	if (inferred.source !== void 0 && inferred.source !== "custom" && (options.finalizeStatus || inferred.source !== "url") && (spanJSON.parent_span_id === void 0 || kind === import_src.SpanKind.SERVER) && (attributes["sentry.source"] === void 0 || canInferSource)) span.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, inferred.source);
	if (inferred.data) Object.entries(inferred.data).forEach(([key, value]) => {
		if (value !== void 0 && attributes[key] === void 0) span.setAttribute(key, value);
	});
	if (options.finalizeStatus) {
		applyOtelCompatibilityAttributes(span, attributes);
		const client = getClient();
		applyOtelSpanStatus(span, attributes, spanJSON.status, !!client && hasSpanStreamingEnabled(client));
	}
	if (mayInferSource && inferred.description !== spanJSON.description && (attributes["sentry.source"] !== "custom" || canInferSource)) span.updateName(inferred.description);
}
function applyOtelSpanKind(span, kind) {
	addNonEnumerableProperty(span, "kind", kind ?? import_src.SpanKind.INTERNAL);
}
function applyOtelSpanStatus(span, attributes, status, spanStreamingEnabled) {
	if (status === void 0) {
		span.setStatus(inferStatusFromAttributes(attributes) || { code: 1 });
		return;
	}
	if (!spanStreamingEnabled && status !== "ok" && !isStatusErrorMessageValid(status)) span.setStatus({
		code: 2,
		message: "internal_error"
	});
}
function applyOtelCompatibilityAttributes(span, attributes) {
	const legacyHttpStatusCode = attributes[As];
	if (attributes["http.response.status_code"] === void 0 && legacyHttpStatusCode !== void 0) {
		span.setAttribute(Ss, legacyHttpStatusCode);
		attributes[Ss] = legacyHttpStatusCode;
	}
}
var SentryTracer = class {
	/** @inheritdoc */
	startSpan(name, options = {}, ctx) {
		const parentContext = ctx || import_src.context.active();
		const parentSpan = options.root ? void 0 : import_src.trace.getSpan(parentContext);
		if (isTracingSuppressed$2(parentContext)) return this._createNonRecordingSpan(parentSpan);
		const span = this._startSentrySpan(name, options, parentSpan, ctx !== void 0);
		markSpanAsTracerProviderSpan(span);
		applyOtelSpanKind(span, options.kind);
		if (options.attributes?.["sentry.source"] === void 0) markSpanForOtelSourceInference(span);
		applyOtelSpanData(span);
		return span;
	}
	startActiveSpan(name, optionsOrFn, contextOrFn, fn) {
		const options = typeof optionsOrFn === "function" ? {} : optionsOrFn;
		const ctx = typeof contextOrFn === "function" || contextOrFn === void 0 ? import_src.context.active() : contextOrFn;
		const callback = typeof optionsOrFn === "function" ? optionsOrFn : typeof contextOrFn === "function" ? contextOrFn : fn;
		const span = this.startSpan(name, options, ctx);
		const capturedIsolationScope = getCapturedScopesOnSpan(span).isolationScope;
		const withCapturedIsolationScope = (contextToFork) => capturedIsolationScope ? contextToFork.setValue(SENTRY_FORK_SET_ISOLATION_SCOPE_CONTEXT_KEY, capturedIsolationScope) : contextToFork;
		if (spanIsIgnored(span) && import_src.trace.getSpan(ctx)) return import_src.context.with(withCapturedIsolationScope(ctx), () => callback(span));
		return import_src.context.with(withCapturedIsolationScope(import_src.trace.setSpan(ctx, span)), () => {
			_setSpanForScope(getCurrentScope(), span);
			return callback(span);
		});
	}
	_startSentrySpan(name, options, parentSpan, hasExplicitContext) {
		const sentryOptions = {
			name,
			attributes: options.attributes,
			links: options.links,
			startTime: options.startTime
		};
		if (options.root) return startNewTrace$1(() => _INTERNAL_startInactiveSpan({
			...sentryOptions,
			parentSpan: null
		}));
		if (parentSpan?.spanContext().isRemote) return this._startRootSpanWithRemoteParent(sentryOptions, parentSpan);
		if (parentSpan) return _INTERNAL_startInactiveSpan({
			...sentryOptions,
			parentSpan
		});
		return startNewTrace$1(() => _INTERNAL_startInactiveSpan({
			...sentryOptions,
			parentSpan: hasExplicitContext ? null : void 0
		}));
	}
	_startRootSpanWithRemoteParent(options, parentSpan) {
		const { spanId, traceId, traceState } = parentSpan.spanContext();
		const dsc = getDynamicSamplingContextFromSpan(parentSpan);
		const sampleRand = typeof dsc.sample_rand === "string" ? Number(dsc.sample_rand) : void 0;
		const hasIncomingDsc = !!traceState?.get(SENTRY_TRACE_STATE_DSC);
		return withScope((scope) => {
			scope.setPropagationContext({
				traceId,
				parentSpanId: spanId,
				sampled: getSamplingDecision(parentSpan.spanContext()),
				dsc: hasIncomingDsc ? dsc : void 0,
				sampleRand: typeof sampleRand === "number" && !Number.isNaN(sampleRand) ? sampleRand : safeMathRandom()
			});
			_setSpanForScope(scope, void 0);
			return _INTERNAL_startInactiveSpan({
				...options,
				parentSpan: null
			});
		});
	}
	_createNonRecordingSpan(parentSpan) {
		const span = new SentryNonRecordingSpan({ traceId: parentSpan?.spanContext().traceId });
		if (parentSpan) addChildSpanToSpan(parentSpan, span);
		setCapturedScopesOnSpan(span, getCurrentScope(), getIsolationScope());
		return span;
	}
};
var SentryTracerProvider = class {
	constructor(options = {}) {
		this._tracers = /* @__PURE__ */ new Map();
		this.resource = options.resource;
	}
	/** @inheritdoc */
	getTracer(name, version, options) {
		const key = JSON.stringify([
			name,
			version,
			options
		]);
		const cachedTracer = this._tracers.get(key);
		if (cachedTracer) return cachedTracer;
		const tracer = new SentryTracer();
		this._tracers.set(key, tracer);
		return tracer;
	}
	/** Compatibility with SDK tracer providers. */
	forceFlush() {
		return Promise.resolve();
	}
	/** Compatibility with SDK tracer providers. */
	shutdown() {
		return Promise.resolve();
	}
};
var ATTR_TELEMETRY_SDK_LANGUAGE = "telemetry.sdk.language";
var ATTR_TELEMETRY_SDK_NAME = "telemetry.sdk.name";
var ATTR_TELEMETRY_SDK_VERSION = "telemetry.sdk.version";
var SEMRESATTRS_SERVICE_NAMESPACE = "service.namespace";
var SentryResource = class SentryResource {
	constructor(attributes) {
		this._attributes = attributes;
	}
	get attributes() {
		return this._attributes;
	}
	merge(other) {
		if (!other) return this;
		return new SentryResource({
			...this._attributes,
			...other.attributes
		});
	}
	getRawAttributes() {
		return Object.entries(this._attributes);
	}
};
function parseOtelResourceAttributes(raw) {
	if (!raw) return {};
	const result = {};
	for (const pair of raw.split(",")) {
		const eq = pair.indexOf("=");
		if (eq === -1) continue;
		const key = pair.substring(0, eq).trim();
		const value = pair.substring(eq + 1).trim();
		if (key) try {
			result[key] = decodeURIComponent(value);
		} catch {
			result[key] = value;
		}
	}
	return result;
}
function getSentryResource(serviceNameFallback) {
	const env = typeof process !== "undefined" ? process.env : {};
	const otelServiceName = env.OTEL_SERVICE_NAME;
	const otelResourceAttrs = parseOtelResourceAttributes(env.OTEL_RESOURCE_ATTRIBUTES);
	return new SentryResource({
		[SEMRESATTRS_SERVICE_NAMESPACE]: "sentry",
		[lu]: serviceNameFallback,
		...otelResourceAttrs,
		...otelServiceName ? { [lu]: otelServiceName } : {},
		[pu]: SDK_VERSION,
		[ATTR_TELEMETRY_SDK_LANGUAGE]: SDK_INFO[ATTR_TELEMETRY_SDK_LANGUAGE],
		[ATTR_TELEMETRY_SDK_NAME]: SDK_INFO[ATTR_TELEMETRY_SDK_NAME],
		[ATTR_TELEMETRY_SDK_VERSION]: SDK_INFO[ATTR_TELEMETRY_SDK_VERSION]
	});
}
function getTraceData({ span, scope, client, propagateTraceparent } = {}) {
	let ctx = (scope && getContextFromScope(scope)) ?? import_src.context.active();
	if (span) {
		const { scope: scope2 } = getCapturedScopesOnSpan(span);
		ctx = scope2 && getContextFromScope(scope2) || import_src.trace.setSpan(import_src.context.active(), span);
	}
	const { traceId, spanId, sampled, dynamicSamplingContext } = getInjectionData(ctx, {
		scope,
		client
	});
	const traceData = {
		"sentry-trace": generateSentryTraceHeader(traceId, spanId, sampled),
		baggage: dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext)
	};
	if (propagateTraceparent) traceData.traceparent = generateTraceparentHeader(traceId, spanId, sampled);
	return traceData;
}
function setOpenTelemetryContextAsyncContextStrategy(options) {
	function getScopes() {
		const scopes = getScopesFromContext(import_src.context.active());
		if (scopes) return scopes;
		return {
			scope: getDefaultCurrentScope(),
			isolationScope: getDefaultIsolationScope()
		};
	}
	function withScope(callback) {
		const ctx = import_src.context.active();
		return import_src.context.with(ctx, () => {
			return callback(getCurrentScope());
		});
	}
	function withSetScope(scope, callback) {
		const ctx = getContextFromScope(scope) || import_src.context.active();
		return import_src.context.with(ctx.setValue(SENTRY_FORK_SET_SCOPE_CONTEXT_KEY, scope), () => {
			return callback(scope);
		});
	}
	function withIsolationScope(callback) {
		const ctx = import_src.context.active();
		return import_src.context.with(ctx.setValue(SENTRY_FORK_ISOLATION_SCOPE_CONTEXT_KEY, true), () => {
			const scope = getCurrentScope();
			if (!isContinuingTrace(scope.getPropagationContext())) scope.setPropagationContext({
				traceId: generateTraceId(),
				sampleRand: safeMathRandom()
			});
			return callback(getIsolationScope());
		});
	}
	function withSetIsolationScope(isolationScope, callback) {
		const ctx = import_src.context.active();
		return import_src.context.with(ctx.setValue(SENTRY_FORK_SET_ISOLATION_SCOPE_CONTEXT_KEY, isolationScope), () => {
			return callback(getIsolationScope());
		});
	}
	function getCurrentScope() {
		return getScopes().scope;
	}
	function getIsolationScope() {
		return getScopes().isolationScope;
	}
	setAsyncContextStrategy({
		withScope,
		withSetScope,
		withSetIsolationScope,
		withIsolationScope,
		getCurrentScope,
		getIsolationScope,
		startSpan: startSpan$2,
		startSpanManual,
		startInactiveSpan,
		getActiveSpan,
		suppressTracing,
		isTracingSuppressed,
		getTraceData,
		continueTrace,
		startNewTrace,
		withActiveSpan,
		getTracingChannelBinding: options?.getTracingChannelBinding
	});
}
//#endregion
//#region node_modules/@sentry/opentelemetry/build/esm/index.js
var ADD_LISTENER_METHODS = [
	"addListener",
	"on",
	"once",
	"prependListener",
	"prependOnceListener"
];
var SentryAsyncLocalStorageContextManager = class {
	constructor() {
		this._kOtListeners = /* @__PURE__ */ Symbol("OtListeners");
		this._wrapped = false;
		setIsSetup("SentryContextManager");
		this._asyncLocalStorage = getAsyncContextStrategy(getMainCarrier()).getTracingChannelBinding?.()?.asyncLocalStorage ?? new AsyncLocalStorage();
	}
	active() {
		return this._asyncLocalStorage.getStore() ?? import_src.ROOT_CONTEXT;
	}
	with(context, fn, thisArg, ...args) {
		const ctx2 = buildContextWithSentryScopes(context, this.active());
		const cb = thisArg == null ? fn : fn.bind(thisArg);
		return this._asyncLocalStorage.run(ctx2, cb, ...args);
	}
	enable() {
		return this;
	}
	disable() {
		this._asyncLocalStorage.disable();
		return this;
	}
	bind(context, target) {
		if (target instanceof EventEmitter) return this._bindEventEmitter(context, target);
		if (typeof target === "function") return this._bindFunction(context, target);
		return target;
	}
	/**
	* Gets underlying AsyncLocalStorage and symbol to allow lookup of scope.
	* This is Sentry-specific.
	*/
	getAsyncLocalStorageLookup() {
		return {
			asyncLocalStorage: this._asyncLocalStorage,
			contextSymbol: SENTRY_SCOPES_CONTEXT_KEY
		};
	}
	_bindFunction(context, target) {
		const managerWith = this.with.bind(this);
		const contextWrapper = function(...args) {
			return managerWith(context, () => target.apply(this, args));
		};
		Object.defineProperty(contextWrapper, "length", {
			enumerable: false,
			configurable: true,
			writable: false,
			value: target.length
		});
		return contextWrapper;
	}
	_bindEventEmitter(context, ee) {
		if (this._getPatchMap(ee) !== void 0) return ee;
		this._createPatchMap(ee);
		for (const methodName of ADD_LISTENER_METHODS) {
			if (ee[methodName] === void 0) continue;
			ee[methodName] = this._patchAddListener(ee, ee[methodName], context);
		}
		if (typeof ee.removeListener === "function") ee.removeListener = this._patchRemoveListener(ee, ee.removeListener);
		if (typeof ee.off === "function") ee.off = this._patchRemoveListener(ee, ee.off);
		if (typeof ee.removeAllListeners === "function") ee.removeAllListeners = this._patchRemoveAllListeners(ee, ee.removeAllListeners);
		return ee;
	}
	_patchRemoveListener(ee, original) {
		const contextManager = this;
		return function(event, listener) {
			const events = contextManager._getPatchMap(ee)?.[event];
			if (events === void 0) return original.call(this, event, listener);
			const patchedListener = events.get(listener);
			return original.call(this, event, patchedListener || listener);
		};
	}
	_patchRemoveAllListeners(ee, original) {
		const contextManager = this;
		return function(event) {
			const map = contextManager._getPatchMap(ee);
			if (map !== void 0) {
				if (arguments.length === 0) contextManager._createPatchMap(ee);
				else if (event !== void 0 && map[event] !== void 0) delete map[event];
			}
			return original.apply(this, arguments);
		};
	}
	_patchAddListener(ee, original, context) {
		const contextManager = this;
		return function(event, listener) {
			if (contextManager._wrapped) return original.call(this, event, listener);
			let map = contextManager._getPatchMap(ee);
			if (map === void 0) map = contextManager._createPatchMap(ee);
			let listeners = map[event];
			if (listeners === void 0) {
				listeners = /* @__PURE__ */ new WeakMap();
				map[event] = listeners;
			}
			const patchedListener = contextManager.bind(context, listener);
			listeners.set(listener, patchedListener);
			contextManager._wrapped = true;
			try {
				return original.call(this, event, patchedListener);
			} finally {
				contextManager._wrapped = false;
			}
		};
	}
	_createPatchMap(ee) {
		const map = /* @__PURE__ */ Object.create(null);
		ee[this._kOtListeners] = map;
		return map;
	}
	_getPatchMap(ee) {
		return ee[this._kOtListeners];
	}
};
function setNodeOpenTelemetryContextAsyncContextStrategy(options) {
	setOpenTelemetryContextAsyncContextStrategy({ getTracingChannelBinding: !options?.skipOpenTelemetrySetup ? getDefaultAsyncLocalStorageFactory() : getCustomAsyncLocalStorageFactory() });
}
function getDefaultAsyncLocalStorageFactory() {
	const defaultAsyncLocalStorage = new AsyncLocalStorage();
	return () => {
		return {
			asyncLocalStorage: defaultAsyncLocalStorage,
			getStoreWithActiveSpan
		};
	};
}
function getCustomAsyncLocalStorageFactory() {
	return () => {
		try {
			const asyncLocalStorage = import_src.context._getContextManager()?.getAsyncLocalStorageLookup().asyncLocalStorage;
			return asyncLocalStorage ? {
				asyncLocalStorage,
				getStoreWithActiveSpan
			} : void 0;
		} catch {
			return;
		}
	};
}
function getStoreWithActiveSpan(span) {
	const activeContext = import_src.context.active();
	return spanIsIgnored(span) && getRootSpan$1(span) !== span || span.spanContext().traceState?.get("sentry.ignored") === "1" ? activeContext : import_src.trace.setSpan(activeContext, span);
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/otel/contextManager.js
var SentryContextManager = SentryAsyncLocalStorageContextManager;
//#endregion
//#region node_modules/@sentry/node-core/build/esm/otel/logger.js
function setupOpenTelemetryLogger() {
	import_src.diag.disable();
	import_src.diag.setLogger({
		error: debug$3.error,
		warn: debug$3.warn,
		info: debug$3.log,
		debug: debug$3.log,
		verbose: debug$3.log
	}, import_src.DiagLogLevel.DEBUG);
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/otel/instrument.js
var INSTRUMENTED = {};
function generateInstrumentOnce(name, creatorOrClass, optionsCallback) {
	if (optionsCallback) return _generateInstrumentOnceWithOptions(name, creatorOrClass, optionsCallback);
	return _generateInstrumentOnce(name, creatorOrClass);
}
function _generateInstrumentOnce(name, creator) {
	return Object.assign((options) => {
		const instrumented = INSTRUMENTED[name];
		if (instrumented) {
			if (options) instrumented.setConfig(options);
			return instrumented;
		}
		const instrumentation = creator(options);
		INSTRUMENTED[name] = instrumentation;
		registerInstrumentations({ instrumentations: [instrumentation] });
		return instrumentation;
	}, { id: name });
}
function _generateInstrumentOnceWithOptions(name, instrumentationClass, optionsCallback) {
	return Object.assign((_options) => {
		const options = optionsCallback(_options);
		const instrumented = INSTRUMENTED[name];
		if (instrumented) {
			instrumented.setConfig(options);
			return instrumented;
		}
		const instrumentation = new instrumentationClass(options);
		INSTRUMENTED[name] = instrumentation;
		registerInstrumentations({ instrumentations: [instrumentation] });
		return instrumentation;
	}, { id: name });
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/childProcess.js
var INTEGRATION_NAME$64 = "ChildProcess";
var childProcessIntegration = defineIntegration((options = {}) => {
	return {
		name: INTEGRATION_NAME$64,
		setup() {
			diagnosticsChannel.channel("child_process").subscribe((event) => {
				if (isObjectLike(event) && "process" in event) captureChildProcessEvents(event.process, options);
			});
			diagnosticsChannel.channel("worker_threads").subscribe((event) => {
				if (isObjectLike(event) && "worker" in event) captureWorkerThreadEvents(event.worker, options);
			});
		}
	};
});
function captureChildProcessEvents(child, options) {
	let hasExited = false;
	let data;
	child.on("spawn", () => {
		if (child.spawnfile === "/usr/bin/sw_vers") {
			hasExited = true;
			return;
		}
		data = { spawnfile: child.spawnfile };
		if (options.includeChildProcessArgs) data.spawnargs = child.spawnargs;
	}).on("exit", (code) => {
		if (!hasExited) {
			hasExited = true;
			if (code !== null && code !== 0) addBreadcrumb({
				category: "child_process",
				message: `Child process exited with code '${code}'`,
				level: code === 0 ? "info" : "warning",
				data
			});
		}
	}).on("error", (error) => {
		if (!hasExited) {
			hasExited = true;
			addBreadcrumb({
				category: "child_process",
				message: `Child process errored with '${error.message}'`,
				level: "error",
				data
			});
		}
	});
}
function captureWorkerThreadEvents(worker, options) {
	let threadId;
	worker.on("online", () => {
		threadId = worker.threadId;
	}).on("error", (error) => {
		if (options.captureWorkerErrors !== false) captureException(error, { mechanism: {
			type: "auto.child_process.worker_thread",
			handled: false,
			data: { threadId: String(threadId) }
		} });
		else addBreadcrumb({
			category: "worker_thread",
			message: `Worker thread errored with '${error.message}'`,
			level: "error",
			data: { threadId }
		});
	});
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/context.js
var readFileAsync = promisify$1(readFile);
var readDirAsync = promisify$1(readdir);
var INTEGRATION_NAME$63 = "Context";
var _nodeContextIntegration = ((options = {}) => {
	const _options = {
		app: true,
		os: true,
		device: true,
		culture: true,
		cloudResource: true,
		...options
	};
	const appContext = _options.app ? getAppContext() : void 0;
	const deviceContext = _options.device ? getDeviceContext(_options.device) : void 0;
	const cultureContext = _options.culture ? getCultureContext() : void 0;
	const cloudResourceContext = _options.cloudResource ? getCloudResourceContext() : void 0;
	const osContextPromise = _options.os ? getOsContext() : void 0;
	const cachedSpanAttributes = {
		"process.runtime.engine.name": "v8",
		"process.runtime.engine.version": process.versions.v8,
		...contextsToSpanAttributes({
			app: appContext,
			device: deviceContext,
			culture: cultureContext,
			cloud_resource: cloudResourceContext
		})
	};
	if (osContextPromise) osContextPromise.then((osCtx) => Object.assign(cachedSpanAttributes, contextsToSpanAttributes({ os: osCtx }))).catch(() => {});
	const contextsPromise = (async () => {
		const contexts = {};
		if (osContextPromise) contexts.os = await osContextPromise;
		if (appContext) contexts.app = appContext;
		if (deviceContext) contexts.device = deviceContext;
		if (cultureContext) contexts.culture = cultureContext;
		if (cloudResourceContext) contexts.cloud_resource = cloudResourceContext;
		return contexts;
	})();
	async function addContext(event) {
		const updatedContext = _updateContext(await contextsPromise);
		event.contexts = {
			...event.contexts,
			app: {
				...updatedContext.app,
				...event.contexts?.app
			},
			os: {
				...updatedContext.os,
				...event.contexts?.os
			},
			device: {
				...updatedContext.device,
				...event.contexts?.device
			},
			culture: {
				...updatedContext.culture,
				...event.contexts?.culture
			},
			cloud_resource: {
				...updatedContext.cloud_resource,
				...event.contexts?.cloud_resource
			}
		};
		return event;
	}
	return {
		name: INTEGRATION_NAME$63,
		processEvent(event) {
			return addContext(event);
		},
		processSegmentSpan(span) {
			safeSetSpanJSONAttributes(span, cachedSpanAttributes);
			safeSetSpanJSONAttributes(span, getDynamicSpanAttributes(appContext, deviceContext));
		}
	};
});
var nodeContextIntegration = defineIntegration(_nodeContextIntegration);
function _updateContext(contexts) {
	if (contexts.app?.app_memory) contexts.app.app_memory = process.memoryUsage().rss;
	if (contexts.app?.free_memory && typeof process.availableMemory === "function") {
		const freeMemory = process.availableMemory?.();
		if (freeMemory != null) contexts.app.free_memory = freeMemory;
	}
	if (contexts.device?.free_memory) contexts.device.free_memory = os$1.freemem();
	return contexts;
}
function contextsToSpanAttributes(contexts) {
	const attrs = {};
	const { app, device, os: osCtx, culture, cloud_resource } = contexts;
	if (app) {
		if (app.app_start_time) attrs["app.start_time"] = app.app_start_time;
	}
	if (device) {
		if (device.arch) attrs["device.archs"] = [device.arch];
		if (device.boot_time) attrs["device.boot_time"] = device.boot_time;
		if (device.memory_size != null) attrs["device.memory_size"] = device.memory_size;
		if (device.processor_count != null) attrs["device.processor_count"] = device.processor_count;
		if (device.cpu_description) attrs["device.cpu_description"] = device.cpu_description;
		if (device.processor_frequency != null) attrs["device.processor_frequency"] = device.processor_frequency;
	}
	if (osCtx) {
		if (osCtx.name) attrs["os.name"] = osCtx.name;
		if (osCtx.version) attrs["os.version"] = osCtx.version;
		if (osCtx.kernel_version) attrs["os.kernel_version"] = osCtx.kernel_version;
		if (osCtx.build) attrs["os.build"] = osCtx.build;
	}
	if (culture) {
		if (culture.locale) attrs["culture.locale"] = culture.locale;
		if (culture.timezone) attrs["culture.timezone"] = culture.timezone;
	}
	if (cloud_resource) {
		for (const [key, value] of Object.entries(cloud_resource)) if (value != null) attrs[key] = value;
	}
	return attrs;
}
function getDynamicSpanAttributes(appContext, deviceContext) {
	const attrs = {};
	if (appContext) {
		attrs["app.memory"] = process.memoryUsage().rss;
		if (typeof process.availableMemory === "function") {
			const freeMemory = process.availableMemory?.();
			if (freeMemory != null) attrs["app.free_memory"] = freeMemory;
		}
	}
	if (deviceContext?.free_memory != null) attrs["device.free_memory"] = os$1.freemem();
	return attrs;
}
async function getOsContext() {
	const platformId = os$1.platform();
	switch (platformId) {
		case "darwin": return getDarwinInfo();
		case "linux": return getLinuxInfo();
		default: return {
			name: PLATFORM_NAMES[platformId] || platformId,
			version: os$1.release()
		};
	}
}
function getCultureContext() {
	try {
		if (typeof process.versions.icu !== "string") return;
		const january = /* @__PURE__ */ new Date(9e8);
		if (new Intl.DateTimeFormat("es", { month: "long" }).format(january) === "enero") {
			const options = Intl.DateTimeFormat().resolvedOptions();
			return {
				locale: options.locale,
				timezone: options.timeZone
			};
		}
	} catch {}
}
function getAppContext() {
	const app_memory = process.memoryUsage().rss;
	const appContext = {
		app_start_time: (/* @__PURE__ */ new Date(Date.now() - process.uptime() * 1e3)).toISOString(),
		app_memory
	};
	if (typeof process.availableMemory === "function") {
		const freeMemory = process.availableMemory?.();
		if (freeMemory != null) appContext.free_memory = freeMemory;
	}
	return appContext;
}
function getDeviceContext(deviceOpt) {
	const device = {};
	let uptime;
	try {
		uptime = os$1.uptime();
	} catch {}
	if (typeof uptime === "number") device.boot_time = (/* @__PURE__ */ new Date(Date.now() - uptime * 1e3)).toISOString();
	device.arch = os$1.arch();
	if (deviceOpt === true || deviceOpt.memory) {
		device.memory_size = os$1.totalmem();
		device.free_memory = os$1.freemem();
	}
	if (deviceOpt === true || deviceOpt.cpu) {
		const cpuInfo = os$1.cpus();
		const firstCpu = cpuInfo?.[0];
		if (firstCpu) {
			device.processor_count = cpuInfo.length;
			device.cpu_description = firstCpu.model;
			device.processor_frequency = firstCpu.speed;
		}
	}
	return device;
}
var PLATFORM_NAMES = {
	aix: "IBM AIX",
	freebsd: "FreeBSD",
	openbsd: "OpenBSD",
	sunos: "SunOS",
	win32: "Windows",
	ohos: "OpenHarmony",
	android: "Android"
};
var LINUX_DISTROS = [
	{
		name: "fedora-release",
		distros: ["Fedora"]
	},
	{
		name: "redhat-release",
		distros: ["Red Hat Linux", "Centos"]
	},
	{
		name: "redhat_version",
		distros: ["Red Hat Linux"]
	},
	{
		name: "SuSE-release",
		distros: ["SUSE Linux"]
	},
	{
		name: "lsb-release",
		distros: ["Ubuntu Linux", "Arch Linux"]
	},
	{
		name: "debian_version",
		distros: ["Debian"]
	},
	{
		name: "debian_release",
		distros: ["Debian"]
	},
	{
		name: "arch-release",
		distros: ["Arch Linux"]
	},
	{
		name: "gentoo-release",
		distros: ["Gentoo Linux"]
	},
	{
		name: "novell-release",
		distros: ["SUSE Linux"]
	},
	{
		name: "alpine-release",
		distros: ["Alpine Linux"]
	}
];
var LINUX_VERSIONS = {
	alpine: (content) => content,
	arch: (content) => matchFirst(/distrib_release=(.*)/, content),
	centos: (content) => matchFirst(/release ([^ ]+)/, content),
	debian: (content) => content,
	fedora: (content) => matchFirst(/release (..)/, content),
	mint: (content) => matchFirst(/distrib_release=(.*)/, content),
	red: (content) => matchFirst(/release ([^ ]+)/, content),
	suse: (content) => matchFirst(/VERSION = (.*)\n/, content),
	ubuntu: (content) => matchFirst(/distrib_release=(.*)/, content)
};
function matchFirst(regex, text) {
	const match = regex.exec(text);
	return match ? match[1] : void 0;
}
async function getDarwinInfo() {
	const darwinInfo = {
		kernel_version: os$1.release(),
		name: "Mac OS X",
		version: `10.${Number(os$1.release().split(".")[0]) - 4}`
	};
	try {
		const output = await new Promise((resolve, reject) => {
			execFile("/usr/bin/sw_vers", (error, stdout) => {
				if (error) {
					reject(error);
					return;
				}
				resolve(stdout);
			});
		});
		darwinInfo.name = matchFirst(/^ProductName:\s+(.*)$/m, output);
		darwinInfo.version = matchFirst(/^ProductVersion:\s+(.*)$/m, output);
		darwinInfo.build = matchFirst(/^BuildVersion:\s+(.*)$/m, output);
	} catch {}
	return darwinInfo;
}
function getLinuxDistroId(name) {
	return name.split(" ")[0].toLowerCase();
}
async function getLinuxInfo() {
	const linuxInfo = {
		kernel_version: os$1.release(),
		name: "Linux"
	};
	try {
		const etcFiles = await readDirAsync("/etc");
		const distroFile = LINUX_DISTROS.find((file) => etcFiles.includes(file.name));
		if (!distroFile) return linuxInfo;
		const contents = (await readFileAsync(join("/etc", distroFile.name), { encoding: "utf-8" })).toLowerCase();
		const { distros } = distroFile;
		linuxInfo.name = distros.find((d) => contents.indexOf(getLinuxDistroId(d)) >= 0) || distros[0];
		linuxInfo.version = LINUX_VERSIONS[getLinuxDistroId(linuxInfo.name)]?.(contents);
	} catch {}
	return linuxInfo;
}
function getCloudResourceContext() {
	if (process.env.VERCEL) return {
		"cloud.provider": "vercel",
		"cloud.region": process.env.VERCEL_REGION
	};
	else if (process.env.AWS_REGION) return {
		"cloud.provider": "aws",
		"cloud.region": process.env.AWS_REGION,
		"cloud.platform": process.env.AWS_EXECUTION_ENV
	};
	else if (process.env.GCP_PROJECT) return { "cloud.provider": "gcp" };
	else if (process.env.ALIYUN_REGION_ID) return {
		"cloud.provider": "alibaba_cloud",
		"cloud.region": process.env.ALIYUN_REGION_ID
	};
	else if (process.env.WEBSITE_SITE_NAME && process.env.REGION_NAME) return {
		"cloud.provider": "azure",
		"cloud.region": process.env.REGION_NAME
	};
	else if (process.env.IBM_CLOUD_REGION) return {
		"cloud.provider": "ibm_cloud",
		"cloud.region": process.env.IBM_CLOUD_REGION
	};
	else if (process.env.TENCENTCLOUD_REGION) return {
		"cloud.provider": "tencent_cloud",
		"cloud.region": process.env.TENCENTCLOUD_REGION,
		"cloud.account.id": process.env.TENCENTCLOUD_APPID,
		"cloud.availability_zone": process.env.TENCENTCLOUD_ZONE
	};
	else if (process.env.NETLIFY) return { "cloud.provider": "netlify" };
	else if (process.env.FLY_REGION) return {
		"cloud.provider": "fly.io",
		"cloud.region": process.env.FLY_REGION
	};
	else if (process.env.DYNO) return { "cloud.provider": "heroku" };
	else return;
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/contextlines.js
var LRU_FILE_CONTENTS_CACHE = new LRUMap(10);
var LRU_FILE_CONTENTS_FS_READ_FAILED = new LRUMap(20);
var DEFAULT_LINES_OF_CONTEXT = 7;
var INTEGRATION_NAME$62 = "ContextLines";
function emplace(map, key, contents) {
	const value = map.get(key);
	if (value === void 0) {
		map.set(key, contents);
		return contents;
	}
	return value;
}
function shouldSkipContextLinesForFile(path) {
	if (path.startsWith("node:")) return true;
	if (path.endsWith(".min.js")) return true;
	if (path.endsWith(".min.cjs")) return true;
	if (path.endsWith(".min.mjs")) return true;
	if (path.startsWith("data:")) return true;
	return false;
}
function shouldSkipContextLinesForFrame(frame) {
	if (frame.lineno !== void 0 && frame.lineno > 1e4) return true;
	if (frame.colno !== void 0 && frame.colno > 1e3) return true;
	return false;
}
function rangeExistsInContentCache(file, range) {
	const contents = LRU_FILE_CONTENTS_CACHE.get(file);
	if (contents === void 0) return false;
	for (let i = range[0]; i <= range[1]; i++) if (contents[i] === void 0) return false;
	return true;
}
function makeLineReaderRanges(lines, linecontext) {
	if (!lines.length) return [];
	let i = 0;
	const line = lines[0];
	if (typeof line !== "number") return [];
	let current = makeContextRange(line, linecontext);
	const out = [];
	while (true) {
		if (i === lines.length - 1) {
			out.push(current);
			break;
		}
		const next = lines[i + 1];
		if (typeof next !== "number") break;
		if (next <= current[1]) current[1] = next + linecontext;
		else {
			out.push(current);
			current = makeContextRange(next, linecontext);
		}
		i++;
	}
	return out;
}
function getContextLinesFromFile(path, ranges, output) {
	return new Promise((resolve, _reject) => {
		const stream = createReadStream(path);
		const lineReaded = createInterface({ input: stream });
		function destroyStreamAndResolve() {
			stream.destroy();
			resolve();
		}
		let lineNumber = 0;
		let currentRangeIndex = 0;
		const range = ranges[currentRangeIndex];
		if (range === void 0) {
			destroyStreamAndResolve();
			return;
		}
		let rangeStart = range[0];
		let rangeEnd = range[1];
		function onStreamError(e) {
			LRU_FILE_CONTENTS_FS_READ_FAILED.set(path, 1);
			DEBUG_BUILD$3 && debug$3.error(`Failed to read file: ${path}. Error: ${e}`);
			lineReaded.close();
			lineReaded.removeAllListeners();
			destroyStreamAndResolve();
		}
		stream.on("error", onStreamError);
		lineReaded.on("error", onStreamError);
		lineReaded.on("close", destroyStreamAndResolve);
		lineReaded.on("line", (line) => {
			lineNumber++;
			if (lineNumber < rangeStart) return;
			output[lineNumber] = snipLine(line, 0);
			if (lineNumber >= rangeEnd) {
				if (currentRangeIndex === ranges.length - 1) {
					lineReaded.close();
					lineReaded.removeAllListeners();
					return;
				}
				currentRangeIndex++;
				const range2 = ranges[currentRangeIndex];
				if (range2 === void 0) {
					lineReaded.close();
					lineReaded.removeAllListeners();
					return;
				}
				rangeStart = range2[0];
				rangeEnd = range2[1];
			}
		});
	});
}
async function addSourceContext(event, contextLines) {
	const filesToLines = {};
	if (contextLines > 0 && event.exception?.values) for (const exception of event.exception.values) {
		if (!exception.stacktrace?.frames?.length) continue;
		for (let i = exception.stacktrace.frames.length - 1; i >= 0; i--) {
			const frame = exception.stacktrace.frames[i];
			const filename = frame?.filename;
			if (!frame || typeof filename !== "string" || typeof frame.lineno !== "number" || shouldSkipContextLinesForFile(filename) || shouldSkipContextLinesForFrame(frame)) continue;
			if (!filesToLines[filename]) filesToLines[filename] = [];
			filesToLines[filename].push(frame.lineno);
		}
	}
	const files = Object.keys(filesToLines);
	if (files.length == 0) return event;
	const readlinePromises = [];
	for (const file of files) {
		if (LRU_FILE_CONTENTS_FS_READ_FAILED.get(file)) continue;
		const filesToLineRanges = filesToLines[file];
		if (!filesToLineRanges) continue;
		filesToLineRanges.sort((a, b) => a - b);
		const ranges = makeLineReaderRanges(filesToLineRanges, contextLines);
		if (ranges.every((r) => rangeExistsInContentCache(file, r))) continue;
		const cache = emplace(LRU_FILE_CONTENTS_CACHE, file, {});
		readlinePromises.push(getContextLinesFromFile(file, ranges, cache));
	}
	await Promise.all(readlinePromises).catch(() => {
		DEBUG_BUILD$3 && debug$3.log("Failed to read one or more source files and resolve context lines");
	});
	if (contextLines > 0 && event.exception?.values) {
		for (const exception of event.exception.values) if (exception.stacktrace?.frames && exception.stacktrace.frames.length > 0) addSourceContextToFrames(exception.stacktrace.frames, contextLines, LRU_FILE_CONTENTS_CACHE);
	}
	return event;
}
function addSourceContextToFrames(frames, contextLines, cache) {
	for (const frame of frames) if (frame.filename && frame.context_line === void 0 && typeof frame.lineno === "number") {
		const contents = cache.get(frame.filename);
		if (contents === void 0) continue;
		addContextToFrame(frame.lineno, frame, contextLines, contents);
	}
}
function clearLineContext(frame) {
	delete frame.pre_context;
	delete frame.context_line;
	delete frame.post_context;
}
function addContextToFrame(lineno, frame, contextLines, contents) {
	if (frame.lineno === void 0 || contents === void 0) {
		DEBUG_BUILD$3 && debug$3.error("Cannot resolve context for frame with no lineno or file contents");
		return;
	}
	frame.pre_context = [];
	for (let i = makeRangeStart(lineno, contextLines); i < lineno; i++) {
		const line = contents[i];
		if (line === void 0) {
			clearLineContext(frame);
			DEBUG_BUILD$3 && debug$3.error(`Could not find line ${i} in file ${frame.filename}`);
			return;
		}
		frame.pre_context.push(line);
	}
	if (contents[lineno] === void 0) {
		clearLineContext(frame);
		DEBUG_BUILD$3 && debug$3.error(`Could not find line ${lineno} in file ${frame.filename}`);
		return;
	}
	frame.context_line = contents[lineno];
	const end = makeRangeEnd(lineno, contextLines);
	frame.post_context = [];
	for (let i = lineno + 1; i <= end; i++) {
		const line = contents[i];
		if (line === void 0) break;
		frame.post_context.push(line);
	}
}
function makeRangeStart(line, linecontext) {
	return Math.max(1, line - linecontext);
}
function makeRangeEnd(line, linecontext) {
	return line + linecontext;
}
function makeContextRange(line, linecontext) {
	return [makeRangeStart(line, linecontext), makeRangeEnd(line, linecontext)];
}
var _contextLinesIntegration = ((options = {}) => {
	return {
		name: INTEGRATION_NAME$62,
		processEvent(event, _hint, client) {
			return addSourceContext(event, options.frameContextLines ?? client?.getDataCollectionOptions().frameContextLines ?? DEFAULT_LINES_OF_CONTEXT);
		}
	};
});
var contextLinesIntegration = defineIntegration(_contextLinesIntegration);
//#endregion
//#region node_modules/@sentry/node-core/build/esm/utils/debug.js
var cachedDebuggerEnabled;
async function isDebuggerEnabled() {
	if (cachedDebuggerEnabled === void 0) try {
		cachedDebuggerEnabled = !!(await import("node:inspector")).url();
	} catch {
		cachedDebuggerEnabled = false;
	}
	return cachedDebuggerEnabled;
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/local-variables/common.js
function filterFrameVariables(vars, behavior) {
	return filterKeyValueData(vars, behavior);
}
var LOCAL_VARIABLES_KEY = "__SENTRY_ERROR_LOCAL_VARIABLES__";
function createRateLimiter(maxPerSecond, enable, disable) {
	let count = 0;
	let retrySeconds = 5;
	let disabledTimeout = 0;
	setInterval(() => {
		if (disabledTimeout === 0) {
			if (count > maxPerSecond) {
				retrySeconds *= 2;
				disable(retrySeconds);
				if (retrySeconds > 86400) retrySeconds = 86400;
				disabledTimeout = retrySeconds;
			}
		} else {
			disabledTimeout -= 1;
			if (disabledTimeout === 0) enable();
		}
		count = 0;
	}, 1e3).unref();
	return () => {
		count += 1;
	};
}
function isAnonymous(name) {
	return name !== void 0 && (name.length === 0 || name === "?" || name === "<anonymous>");
}
function functionNamesMatch(a, b) {
	return a === b || `Object.${a}` === b || a === `Object.${b}` || isAnonymous(a) && isAnonymous(b);
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/local-variables/local-variables-async.js
var base64WorkerScript$1 = "LyohIEBzZW50cnkvbm9kZS1jb3JlIDEwLjc0LjAgKGNlNTAwOWEpIHwgaHR0cHM6Ly9naXRodWIuY29tL2dldHNlbnRyeS9zZW50cnktamF2YXNjcmlwdCAqLwppbXBvcnR7U2Vzc2lvbiBhcyBlfWZyb20ibm9kZTppbnNwZWN0b3IvcHJvbWlzZXMiO2ltcG9ydHt3b3JrZXJEYXRhIGFzIHR9ZnJvbSJub2RlOndvcmtlcl90aHJlYWRzIjtjb25zdCBuPWdsb2JhbFRoaXMsaT17fTtjb25zdCBvPSJfX1NFTlRSWV9FUlJPUl9MT0NBTF9WQVJJQUJMRVNfXyI7Y29uc3QgYT10O2Z1bmN0aW9uIHMoLi4uZSl7YS5kZWJ1ZyYmZnVuY3Rpb24oZSl7aWYoISgiY29uc29sZSJpbiBuKSlyZXR1cm4gZSgpO2NvbnN0IHQ9bi5jb25zb2xlLG89e30sYT1PYmplY3Qua2V5cyhpKTthLmZvckVhY2goZT0+e2NvbnN0IG49aVtlXTtvW2VdPXRbZV0sdFtlXT1ufSk7dHJ5e3JldHVybiBlKCl9ZmluYWxseXthLmZvckVhY2goZT0+e3RbZV09b1tlXX0pfX0oKCk9PmNvbnNvbGUubG9nKCJbTG9jYWxWYXJpYWJsZXMgV29ya2VyXSIsLi4uZSkpfWFzeW5jIGZ1bmN0aW9uIGMoZSx0LG4saSl7Y29uc3Qgbz1hd2FpdCBlLnBvc3QoIlJ1bnRpbWUuZ2V0UHJvcGVydGllcyIse29iamVjdElkOnQsb3duUHJvcGVydGllczohMH0pO2lbbl09by5yZXN1bHQuZmlsdGVyKGU9PiJsZW5ndGgiIT09ZS5uYW1lJiYhaXNOYU4ocGFyc2VJbnQoZS5uYW1lLDEwKSkpLnNvcnQoKGUsdCk9PnBhcnNlSW50KGUubmFtZSwxMCktcGFyc2VJbnQodC5uYW1lLDEwKSkubWFwKGU9PmUudmFsdWU/LnZhbHVlKX1hc3luYyBmdW5jdGlvbiByKGUsdCxuLGkpe2NvbnN0IG89YXdhaXQgZS5wb3N0KCJSdW50aW1lLmdldFByb3BlcnRpZXMiLHtvYmplY3RJZDp0LG93blByb3BlcnRpZXM6ITB9KTtpW25dPW8ucmVzdWx0Lm1hcChlPT5bZS5uYW1lLGUudmFsdWU/LnZhbHVlXSkucmVkdWNlKChlLFt0LG5dKT0+KGVbdF09bixlKSx7fSl9ZnVuY3Rpb24gdShlLHQpe2UudmFsdWUmJigidmFsdWUiaW4gZS52YWx1ZT92b2lkIDA9PT1lLnZhbHVlLnZhbHVlfHxudWxsPT09ZS52YWx1ZS52YWx1ZT90W2UubmFtZV09YDwke2UudmFsdWUudmFsdWV9PmA6dFtlLm5hbWVdPWUudmFsdWUudmFsdWU6ImRlc2NyaXB0aW9uImluIGUudmFsdWUmJiJmdW5jdGlvbiIhPT1lLnZhbHVlLnR5cGU/dFtlLm5hbWVdPWA8JHtlLnZhbHVlLmRlc2NyaXB0aW9ufT5gOiJ1bmRlZmluZWQiPT09ZS52YWx1ZS50eXBlJiYodFtlLm5hbWVdPSI8dW5kZWZpbmVkPiIpKX1hc3luYyBmdW5jdGlvbiBsKGUsdCl7Y29uc3Qgbj1hd2FpdCBlLnBvc3QoIlJ1bnRpbWUuZ2V0UHJvcGVydGllcyIse29iamVjdElkOnQsb3duUHJvcGVydGllczohMH0pLGk9e307Zm9yKGNvbnN0IHQgb2Ygbi5yZXN1bHQpaWYodC52YWx1ZT8ub2JqZWN0SWQmJiJBcnJheSI9PT10LnZhbHVlLmNsYXNzTmFtZSl7Y29uc3Qgbj10LnZhbHVlLm9iamVjdElkO2F3YWl0IGMoZSxuLHQubmFtZSxpKX1lbHNlIGlmKHQudmFsdWU/Lm9iamVjdElkJiYiT2JqZWN0Ij09PXQudmFsdWUuY2xhc3NOYW1lKXtjb25zdCBuPXQudmFsdWUub2JqZWN0SWQ7YXdhaXQgcihlLG4sdC5uYW1lLGkpfWVsc2UgdC52YWx1ZSYmdSh0LGkpO3JldHVybiBpfWxldCBmOyhhc3luYyBmdW5jdGlvbigpe2NvbnN0IHQ9bmV3IGU7dC5jb25uZWN0VG9NYWluVGhyZWFkKCkscygiQ29ubmVjdGVkIHRvIG1haW4gdGhyZWFkIik7bGV0IG49ITE7dC5vbigiRGVidWdnZXIucmVzdW1lZCIsKCk9PntuPSExfSksdC5vbigiRGVidWdnZXIucGF1c2VkIixlPT57bj0hMCxhc3luYyBmdW5jdGlvbihlLHtyZWFzb246dCxkYXRhOntvYmplY3RJZDpufSxjYWxsRnJhbWVzOml9KXtpZigiZXhjZXB0aW9uIiE9PXQmJiJwcm9taXNlUmVqZWN0aW9uIiE9PXQpcmV0dXJuO2lmKGY/LigpLG51bGw9PW4pcmV0dXJuO2NvbnN0IGE9W107Zm9yKGxldCB0PTA7dDxpLmxlbmd0aDt0Kyspe2NvbnN0e3Njb3BlQ2hhaW46bixmdW5jdGlvbk5hbWU6byx0aGlzOnN9PWlbdF0sYz1uLmZpbmQoZT0+ImxvY2FsIj09PWUudHlwZSkscj0iZ2xvYmFsIiE9PXMuY2xhc3NOYW1lJiZzLmNsYXNzTmFtZT9gJHtzLmNsYXNzTmFtZX0uJHtvfWA6bztpZih2b2lkIDA9PT1jPy5vYmplY3Qub2JqZWN0SWQpYVt0XT17ZnVuY3Rpb246cn07ZWxzZXtjb25zdCBuPWF3YWl0IGwoZSxjLm9iamVjdC5vYmplY3RJZCk7YVt0XT17ZnVuY3Rpb246cix2YXJzOm59fX1hd2FpdCBlLnBvc3QoIlJ1bnRpbWUuY2FsbEZ1bmN0aW9uT24iLHtmdW5jdGlvbkRlY2xhcmF0aW9uOmBmdW5jdGlvbigpIHsgdGhpcy4ke299ID0gdGhpcy4ke299IHx8ICR7SlNPTi5zdHJpbmdpZnkoYSl9OyB9YCxzaWxlbnQ6ITAsb2JqZWN0SWQ6bn0pLGF3YWl0IGUucG9zdCgiUnVudGltZS5yZWxlYXNlT2JqZWN0Iix7b2JqZWN0SWQ6bn0pfSh0LGUucGFyYW1zKS50aGVuKGFzeW5jKCk9PntuJiZhd2FpdCB0LnBvc3QoIkRlYnVnZ2VyLnJlc3VtZSIpfSxhc3luYyBlPT57biYmYXdhaXQgdC5wb3N0KCJEZWJ1Z2dlci5yZXN1bWUiKX0pfSksYXdhaXQgdC5wb3N0KCJEZWJ1Z2dlci5lbmFibGUiKTtjb25zdCBpPSExIT09YS5jYXB0dXJlQWxsRXhjZXB0aW9ucztpZihhd2FpdCB0LnBvc3QoIkRlYnVnZ2VyLnNldFBhdXNlT25FeGNlcHRpb25zIix7c3RhdGU6aT8iYWxsIjoidW5jYXVnaHQifSksaSl7Y29uc3QgZT1hLm1heEV4Y2VwdGlvbnNQZXJTZWNvbmR8fDUwO2Y9ZnVuY3Rpb24oZSx0LG4pe2xldCBpPTAsbz01LGE9MDtyZXR1cm4gc2V0SW50ZXJ2YWwoKCk9PnswPT09YT9pPmUmJihvKj0yLG4obyksbz44NjQwMCYmKG89ODY0MDApLGE9byk6KGEtPTEsMD09PWEmJnQoKSksaT0wfSwxZTMpLnVucmVmKCksKCk9PntpKz0xfX0oZSxhc3luYygpPT57cygiUmF0ZS1saW1pdCBsaWZ0ZWQuIiksYXdhaXQgdC5wb3N0KCJEZWJ1Z2dlci5zZXRQYXVzZU9uRXhjZXB0aW9ucyIse3N0YXRlOiJhbGwifSl9LGFzeW5jIGU9PntzKGBSYXRlLWxpbWl0IGV4Y2VlZGVkLiBEaXNhYmxpbmcgY2FwdHVyaW5nIG9mIGNhdWdodCBleGNlcHRpb25zIGZvciAke2V9IHNlY29uZHMuYCksYXdhaXQgdC5wb3N0KCJEZWJ1Z2dlci5zZXRQYXVzZU9uRXhjZXB0aW9ucyIse3N0YXRlOiJ1bmNhdWdodCJ9KX0pfX0pKCkuY2F0Y2goZT0+e3MoIkZhaWxlZCB0byBzdGFydCBkZWJ1Z2dlciIsZSl9KSxzZXRJbnRlcnZhbCgoKT0+e30sMWU0KTs=";
function log$1(...args) {
	debug$3.log("[LocalVariables]", ...args);
}
var localVariablesAsyncIntegration = defineIntegration(((integrationOptions = {}) => {
	function addLocalVariablesToException(exception, localVariables, behavior) {
		if (behavior === false) return;
		const frames = (exception.stacktrace?.frames || []).filter((frame) => frame.function !== "new Promise");
		for (let i = 0; i < frames.length; i++) {
			const frameIndex = frames.length - i - 1;
			const frameLocalVariables = localVariables[i];
			const frame = frames[frameIndex];
			if (!frame || !frameLocalVariables) break;
			if (frameLocalVariables.vars === void 0 || frame.in_app === false && integrationOptions.includeOutOfAppFrames !== true || !functionNamesMatch(frame.function, frameLocalVariables.function)) continue;
			frame.vars = filterFrameVariables(frameLocalVariables.vars, behavior);
		}
	}
	function addLocalVariablesToEvent(event, hint) {
		if (hint.originalException && typeof hint.originalException === "object" && "__SENTRY_ERROR_LOCAL_VARIABLES__" in hint.originalException && Array.isArray(hint.originalException["__SENTRY_ERROR_LOCAL_VARIABLES__"])) {
			const behavior = getClient()?.getDataCollectionOptions().stackFrameVariables ?? true;
			for (const exception of event.exception?.values || []) addLocalVariablesToException(exception, hint.originalException[LOCAL_VARIABLES_KEY], behavior);
			hint.originalException[LOCAL_VARIABLES_KEY] = void 0;
		}
		return event;
	}
	async function startInspector() {
		const inspector = await import("node:inspector");
		if (!inspector.url()) inspector.open(0);
	}
	function startWorker(options) {
		const worker = new Worker(new URL(`data:application/javascript;base64,${base64WorkerScript$1}`), {
			workerData: options,
			execArgv: [],
			env: {
				...process.env,
				NODE_OPTIONS: void 0
			}
		});
		process.on("exit", () => {
			worker.terminate();
		});
		worker.once("error", (err) => {
			log$1("Worker error", err);
		});
		worker.once("exit", (code) => {
			log$1("Worker exit", code);
		});
		worker.unref();
	}
	return {
		name: "LocalVariablesAsync",
		async setup(client) {
			if (!client.getOptions().includeLocalVariables) return;
			if (await isDebuggerEnabled()) {
				debug$3.warn("Local variables capture has been disabled because the debugger was already enabled");
				return;
			}
			const options = {
				...integrationOptions,
				debug: debug$3.isEnabled()
			};
			startInspector().then(() => {
				try {
					startWorker(options);
				} catch (e) {
					debug$3.error("Failed to start worker", e);
				}
			}, (e) => {
				debug$3.error("Failed to start inspector", e);
			});
		},
		processEvent(event, hint) {
			return addLocalVariablesToEvent(event, hint);
		}
	};
}));
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/local-variables/local-variables-sync.js
function hashFrames(frames) {
	if (frames === void 0) return;
	return frames.slice(-10).reduce((acc, frame) => `${acc},${frame.function},${frame.lineno},${frame.colno}`, "");
}
function hashFromStack(stackParser, stack) {
	if (stack === void 0) return;
	return hashFrames(stackParser(stack, 1));
}
function createCallbackList(complete) {
	let callbacks = [];
	let completedCalled = false;
	function checkedComplete(result) {
		callbacks = [];
		if (completedCalled) return;
		completedCalled = true;
		complete(result);
	}
	callbacks.push(checkedComplete);
	function add(fn) {
		callbacks.push(fn);
	}
	function next(result) {
		const popped = callbacks.pop() || checkedComplete;
		try {
			popped(result);
		} catch {
			checkedComplete(result);
		}
	}
	return {
		add,
		next
	};
}
var AsyncSession = class AsyncSession {
	/** Throws if inspector API is not available */
	constructor(_session) {
		this._session = _session;
	}
	static async create(orDefault) {
		if (orDefault) return orDefault;
		const inspector = await import("node:inspector");
		return new AsyncSession(new inspector.Session());
	}
	/** @inheritdoc */
	configureAndConnect(onPause, captureAll) {
		this._session.connect();
		this._session.on("Debugger.paused", (event) => {
			onPause(event, () => {
				this._session.post("Debugger.resume");
			});
		});
		this._session.post("Debugger.enable");
		this._session.post("Debugger.setPauseOnExceptions", { state: captureAll ? "all" : "uncaught" });
	}
	setPauseOnExceptions(captureAll) {
		this._session.post("Debugger.setPauseOnExceptions", { state: captureAll ? "all" : "uncaught" });
	}
	/** @inheritdoc */
	getLocalVariables(objectId, complete) {
		this._getProperties(objectId, (props) => {
			const { add, next } = createCallbackList(complete);
			for (const prop of props) if (prop.value?.objectId && prop.value.className === "Array") {
				const id = prop.value.objectId;
				add((vars) => this._unrollArray(id, prop.name, vars, next));
			} else if (prop.value?.objectId && prop.value.className === "Object") {
				const id = prop.value.objectId;
				add((vars) => this._unrollObject(id, prop.name, vars, next));
			} else if (prop.value) add((vars) => this._unrollOther(prop, vars, next));
			next({});
		});
	}
	/**
	* Gets all the PropertyDescriptors of an object
	*/
	_getProperties(objectId, next) {
		this._session.post("Runtime.getProperties", {
			objectId,
			ownProperties: true
		}, (err, params) => {
			if (err) next([]);
			else next(params.result);
		});
	}
	/**
	* Unrolls an array property
	*/
	_unrollArray(objectId, name, vars, next) {
		this._getProperties(objectId, (props) => {
			vars[name] = props.filter((v) => v.name !== "length" && !isNaN(parseInt(v.name, 10))).sort((a, b) => parseInt(a.name, 10) - parseInt(b.name, 10)).map((v) => v.value?.value);
			next(vars);
		});
	}
	/**
	* Unrolls an object property
	*/
	_unrollObject(objectId, name, vars, next) {
		this._getProperties(objectId, (props) => {
			vars[name] = props.map((v) => [v.name, v.value?.value]).reduce((obj, [key, val]) => {
				obj[key] = val;
				return obj;
			}, {});
			next(vars);
		});
	}
	/**
	* Unrolls other properties
	*/
	_unrollOther(prop, vars, next) {
		if (prop.value) {
			if ("value" in prop.value) {
				if (prop.value.value === void 0 || prop.value.value === null) vars[prop.name] = `<${prop.value.value}>`;
				else vars[prop.name] = prop.value.value;
			} else if ("description" in prop.value && prop.value.type !== "function") vars[prop.name] = `<${prop.value.description}>`;
			else if (prop.value.type === "undefined") vars[prop.name] = "<undefined>";
		}
		next(vars);
	}
};
var INTEGRATION_NAME$61 = "LocalVariables";
var _localVariablesSyncIntegration = ((options = {}, sessionOverride) => {
	const cachedFrames = new LRUMap(20);
	let rateLimiter;
	let shouldProcessEvent = false;
	function addLocalVariablesToException(exception, behavior) {
		const hash = hashFrames(exception.stacktrace?.frames);
		if (hash === void 0) return;
		const cachedFrame = cachedFrames.remove(hash);
		if (cachedFrame === void 0 || behavior === false) return;
		const frames = (exception.stacktrace?.frames || []).filter((frame) => frame.function !== "new Promise");
		for (let i = 0; i < frames.length; i++) {
			const frameIndex = frames.length - i - 1;
			const cachedFrameVariable = cachedFrame[i];
			const frameVariable = frames[frameIndex];
			if (!frameVariable || !cachedFrameVariable) break;
			if (cachedFrameVariable.vars === void 0 || frameVariable.in_app === false && options.includeOutOfAppFrames !== true || !functionNamesMatch(frameVariable.function, cachedFrameVariable.function)) continue;
			frameVariable.vars = filterFrameVariables(cachedFrameVariable.vars, behavior);
		}
	}
	function addLocalVariablesToEvent(event) {
		for (const exception of event.exception?.values || []) addLocalVariablesToException(exception, getClient()?.getDataCollectionOptions().stackFrameVariables ?? true);
		return event;
	}
	let setupPromise;
	async function setup() {
		const clientOptions = getClient()?.getOptions();
		if (!clientOptions?.includeLocalVariables) return;
		if (NODE_MAJOR < 18) {
			debug$3.log("The `LocalVariables` integration is only supported on Node >= v18.");
			return;
		}
		if (await isDebuggerEnabled()) {
			debug$3.warn("Local variables capture has been disabled because the debugger was already enabled");
			return;
		}
		try {
			const session = await AsyncSession.create(sessionOverride);
			const handlePaused = (stackParser, { params: { reason, data, callFrames } }, complete) => {
				if (reason !== "exception" && reason !== "promiseRejection") {
					complete();
					return;
				}
				rateLimiter?.();
				const exceptionHash = hashFromStack(stackParser, data.description);
				if (exceptionHash == void 0) {
					complete();
					return;
				}
				const { add, next } = createCallbackList((frames) => {
					cachedFrames.set(exceptionHash, frames);
					complete();
				});
				for (let i = 0; i < Math.min(callFrames.length, 5); i++) {
					const { scopeChain, functionName, this: obj } = callFrames[i];
					const localScope = scopeChain.find((scope) => scope.type === "local");
					const fn = obj.className === "global" || !obj.className ? functionName : `${obj.className}.${functionName}`;
					if (localScope?.object.objectId === void 0) add((frames) => {
						frames[i] = { function: fn };
						next(frames);
					});
					else {
						const id = localScope.object.objectId;
						add((frames) => session.getLocalVariables(id, (vars) => {
							frames[i] = {
								function: fn,
								vars
							};
							next(frames);
						}));
					}
				}
				next([]);
			};
			const captureAll = options.captureAllExceptions !== false;
			session.configureAndConnect((ev, complete) => handlePaused(clientOptions.stackParser, ev, complete), captureAll);
			if (captureAll) rateLimiter = createRateLimiter(options.maxExceptionsPerSecond || 50, () => {
				debug$3.log("Local variables rate-limit lifted.");
				session.setPauseOnExceptions(true);
			}, (seconds) => {
				debug$3.log(`Local variables rate-limit exceeded. Disabling capturing of caught exceptions for ${seconds} seconds.`);
				session.setPauseOnExceptions(false);
			});
			shouldProcessEvent = true;
		} catch (error) {
			debug$3.log("The `LocalVariables` integration failed to start.", error);
		}
	}
	return {
		name: INTEGRATION_NAME$61,
		setupOnce() {
			setupPromise = setup();
		},
		async processEvent(event) {
			await setupPromise;
			if (shouldProcessEvent) return addLocalVariablesToEvent(event);
			return event;
		},
		_getCachedFramesCount() {
			return cachedFrames.size;
		},
		_getFirstCachedFrame() {
			return cachedFrames.values()[0];
		}
	};
});
var localVariablesSyncIntegration = defineIntegration(_localVariablesSyncIntegration);
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/local-variables/index.js
var localVariablesIntegration = (options = {}) => {
	return NODE_VERSION.major < 19 ? localVariablesSyncIntegration(options) : localVariablesAsyncIntegration(options);
};
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/modules.js
var moduleCache;
var INTEGRATION_NAME$60 = "Modules";
function getServerModules() {
	if (typeof __SENTRY_SERVER_MODULES__ !== "undefined") return __SENTRY_SERVER_MODULES__;
	return GLOBAL_OBJ.__SENTRY_SERVER_MODULES__ ?? {};
}
var _modulesIntegration = (() => {
	return {
		name: INTEGRATION_NAME$60,
		processEvent(event) {
			event.modules = {
				...event.modules,
				..._getModules()
			};
			return event;
		},
		getModules: _getModules
	};
});
var modulesIntegration = _modulesIntegration;
function collectModules() {
	return {
		...getServerModules(),
		...getModulesFromPackageJson()
	};
}
function _getModules() {
	if (!moduleCache) moduleCache = collectModules();
	return moduleCache;
}
function getPackageJson() {
	try {
		const filePath = join(process.cwd(), "package.json");
		return JSON.parse(readFileSync$1(filePath, "utf8"));
	} catch {
		return {};
	}
}
function getModulesFromPackageJson() {
	const packageJson = getPackageJson();
	return {
		...packageJson.dependencies,
		...packageJson.devDependencies
	};
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/utils/errorhandling.js
var DEFAULT_SHUTDOWN_TIMEOUT = 2e3;
function logAndExitProcess(error) {
	consoleSandbox(() => {
		console.error(error);
	});
	const client = getClient();
	if (client === void 0) {
		DEBUG_BUILD$3 && debug$3.warn("No NodeClient was defined, we are exiting the process now.");
		global.process.exit(1);
		return;
	}
	const options = client.getOptions();
	const timeout = options?.shutdownTimeout && options.shutdownTimeout > 0 ? options.shutdownTimeout : DEFAULT_SHUTDOWN_TIMEOUT;
	client.close(timeout).then((result) => {
		if (!result) DEBUG_BUILD$3 && debug$3.warn("We reached the timeout for emptying the request buffer, still exiting now!");
		global.process.exit(1);
	}, (error2) => {
		DEBUG_BUILD$3 && debug$3.error(error2);
	});
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/onuncaughtexception.js
var INTEGRATION_NAME$59 = "OnUncaughtException";
var onUncaughtExceptionIntegration = defineIntegration((options = {}) => {
	const optionsWithDefaults = {
		exitEvenIfOtherHandlersAreRegistered: false,
		...options
	};
	return {
		name: INTEGRATION_NAME$59,
		setup(client) {
			if (!isMainThread$1) return;
			global.process.on("uncaughtException", makeErrorHandler(client, optionsWithDefaults));
		}
	};
});
function makeErrorHandler(client, options) {
	const timeout = 2e3;
	let caughtFirstError = false;
	let caughtSecondError = false;
	let calledFatalError = false;
	let firstError;
	const clientOptions = client.getOptions();
	return Object.assign((error) => {
		let onFatalError = logAndExitProcess;
		if (options.onFatalError) onFatalError = options.onFatalError;
		else if (clientOptions.onFatalError) onFatalError = clientOptions.onFatalError;
		const processWouldExit = global.process.listeners("uncaughtException").filter((listener) => {
			return listener.name !== "domainUncaughtExceptionClear" && listener._errorHandler !== true;
		}).length === 0;
		const shouldApplyFatalHandlingLogic = options.exitEvenIfOtherHandlersAreRegistered || processWouldExit;
		if (!caughtFirstError) {
			firstError = error;
			caughtFirstError = true;
			if (getClient() === client) captureException(error, {
				originalException: error,
				captureContext: { level: "fatal" },
				mechanism: {
					handled: false,
					type: "auto.node.onuncaughtexception"
				}
			});
			if (!calledFatalError && shouldApplyFatalHandlingLogic) {
				calledFatalError = true;
				onFatalError(error);
			}
		} else if (shouldApplyFatalHandlingLogic) {
			if (calledFatalError) {
				DEBUG_BUILD$3 && debug$3.warn("uncaught exception after calling fatal error shutdown callback - this is bad! forcing shutdown");
				logAndExitProcess(error);
			} else if (!caughtSecondError) {
				caughtSecondError = true;
				setTimeout(() => {
					if (!calledFatalError) {
						calledFatalError = true;
						onFatalError(firstError, error);
					}
				}, timeout);
			}
		}
	}, { _errorHandler: true });
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/onunhandledrejection.js
var INTEGRATION_NAME$58 = "OnUnhandledRejection";
var DEFAULT_IGNORES = [{ name: "AI_NoOutputGeneratedError" }, { name: "AbortError" }];
var _onUnhandledRejectionIntegration = ((options = {}) => {
	const opts = {
		mode: options.mode ?? "warn",
		ignore: [...DEFAULT_IGNORES, ...options.ignore ?? []]
	};
	return {
		name: INTEGRATION_NAME$58,
		setup(client) {
			global.process.on("unhandledRejection", makeUnhandledPromiseHandler(client, opts));
		}
	};
});
var onUnhandledRejectionIntegration = defineIntegration(_onUnhandledRejectionIntegration);
function extractErrorInfo(reason) {
	if (!isObjectLike(reason)) return {
		name: "",
		message: String(reason ?? "")
	};
	const errorLike = reason;
	return {
		name: typeof errorLike.name === "string" ? errorLike.name : "",
		message: typeof errorLike.message === "string" ? errorLike.message : String(reason)
	};
}
function isMatchingReason(matcher, errorInfo) {
	const nameMatches = matcher.name === void 0 || isMatchingPattern(errorInfo.name, matcher.name, true);
	const messageMatches = matcher.message === void 0 || isMatchingPattern(errorInfo.message, matcher.message);
	return nameMatches && messageMatches;
}
function matchesIgnore(list, reason) {
	const errorInfo = extractErrorInfo(reason);
	return list.some((matcher) => isMatchingReason(matcher, errorInfo));
}
function makeUnhandledPromiseHandler(client, options) {
	return function sendUnhandledPromise(reason, _promise) {
		if (getClient() !== client) return;
		if (matchesIgnore(options.ignore ?? [], reason)) return;
		const level = options.mode === "strict" ? "fatal" : "error";
		const activeSpanForError = isObjectLike(reason) ? reason._sentry_active_span : void 0;
		(activeSpanForError ? (fn) => withActiveSpan$1(activeSpanForError, fn) : (fn) => fn())(() => {
			captureException(reason, {
				originalException: reason,
				captureContext: {
					extra: { unhandledPromiseRejection: true },
					level
				},
				mechanism: {
					handled: false,
					type: "auto.node.onunhandledrejection"
				}
			});
		});
		handleRejection(reason, options.mode);
	};
}
function handleRejection(reason, mode) {
	const rejectionWarning = "This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason:";
	if (mode === "warn") consoleSandbox(() => {
		console.warn(rejectionWarning);
		console.error(isObjectLike(reason) && "stack" in reason ? reason.stack : reason);
	});
	else if (mode === "strict") {
		consoleSandbox(() => {
			console.warn(rejectionWarning);
		});
		logAndExitProcess(reason);
	}
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/processSession.js
var INTEGRATION_NAME$57 = "ProcessSession";
var processSessionIntegration = defineIntegration(() => {
	return {
		name: INTEGRATION_NAME$57,
		setupOnce() {
			startSession();
			process.on("beforeExit", () => {
				if (getIsolationScope().getSession()?.status === "ok") endSession();
			});
		}
	};
});
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/spotlight.js
var INTEGRATION_NAME$56 = "Spotlight";
var _spotlightIntegration = ((options = {}) => {
	const _options = { sidecarUrl: options.sidecarUrl || "http://localhost:8969/stream" };
	return {
		name: INTEGRATION_NAME$56,
		setup(client) {
			try {
				debug$3.warn("[Spotlight] It seems you're not in dev mode. Do you really want to have Spotlight enabled?");
			} catch {}
			connectToSpotlight(client, _options);
		}
	};
});
var spotlightIntegration = defineIntegration(_spotlightIntegration);
function connectToSpotlight(client, options) {
	const spotlightUrl = parseSidecarUrl(options.sidecarUrl);
	if (!spotlightUrl) return;
	let failedRequests = 0;
	client.on("beforeEnvelope", (envelope) => {
		if (failedRequests > 3) {
			debug$3.warn("[Spotlight] Disabled Sentry -> Spotlight integration due to too many failed requests");
			return;
		}
		const serializedEnvelope = serializeEnvelope(envelope);
		suppressTracing$1(() => {
			const req = http.request({
				method: "POST",
				path: spotlightUrl.pathname,
				hostname: spotlightUrl.hostname,
				port: spotlightUrl.port,
				headers: { "Content-Type": "application/x-sentry-envelope" }
			}, (res) => {
				if (res.statusCode && res.statusCode >= 200 && res.statusCode < 400) failedRequests = 0;
				res.on("data", () => {});
				res.on("end", () => {});
				res.setEncoding("utf8");
			});
			req.on("error", () => {
				failedRequests++;
				debug$3.warn("[Spotlight] Failed to send envelope to Spotlight Sidecar");
			});
			req.write(serializedEnvelope);
			req.end();
		});
	});
}
function parseSidecarUrl(url) {
	try {
		return new URL(`${url}`);
	} catch {
		debug$3.warn(`[Spotlight] Invalid sidecar URL: ${url}`);
		return;
	}
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/console.js
var consoleIntegration = defineIntegration((options = {}) => {
	return {
		name: "Console",
		setup(client) {
			if (process.env.LAMBDA_TASK_ROOT) maybeInstrument("console", instrumentConsoleLambda);
			consoleIntegration$1({
				...options,
				filter: [...options.filter || [], "[DEP0205] DeprecationWarning"]
			}).setup?.(client);
		}
	};
});
function instrumentConsoleLambda() {
	const consoleObj = GLOBAL_OBJ?.console;
	if (!consoleObj) return;
	CONSOLE_LEVELS.forEach((level) => {
		if (level in consoleObj) patchWithDefineProperty(consoleObj, level);
	});
}
function patchWithDefineProperty(consoleObj, level) {
	const nativeMethod = consoleObj[level];
	originalConsoleMethods[level] = nativeMethod;
	let delegate = nativeMethod;
	let savedDelegate;
	let isExecuting = false;
	const wrapper = function(...args) {
		if (isExecuting) {
			nativeMethod.apply(consoleObj, args);
			return;
		}
		isExecuting = true;
		try {
			triggerHandlers("console", {
				args,
				level
			});
			delegate.apply(consoleObj, args);
		} finally {
			isExecuting = false;
		}
	};
	markFunctionWrapped(wrapper, nativeMethod);
	const sandboxBypass = nativeMethod.bind(consoleObj);
	originalConsoleMethods[level] = sandboxBypass;
	try {
		let current = wrapper;
		Object.defineProperty(consoleObj, level, {
			configurable: true,
			enumerable: true,
			get() {
				return current;
			},
			set(newValue) {
				if (newValue === wrapper) {
					if (savedDelegate !== void 0) {
						delegate = savedDelegate;
						savedDelegate = void 0;
					}
					current = wrapper;
				} else if (newValue === sandboxBypass) {
					savedDelegate = delegate;
					current = sandboxBypass;
				} else if (typeof newValue === "function" && !newValue.__sentry_original__) {
					delegate = newValue;
					current = wrapper;
				} else current = newValue;
			}
		});
	} catch {
		fill(consoleObj, level, function(originalConsoleMethod) {
			originalConsoleMethods[level] = originalConsoleMethod;
			return function(...args) {
				triggerHandlers("console", {
					args,
					level
				});
				originalConsoleMethods[level]?.apply(this, args);
			};
		});
	}
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/systemError.js
var INTEGRATION_NAME$55 = "NodeSystemError";
function isSystemError(error) {
	if (!(error instanceof Error)) return false;
	if (!("errno" in error) || typeof error.errno !== "number") return false;
	if (typeof util.getSystemErrorMap !== "function") return false;
	return util.getSystemErrorMap().has(error.errno);
}
var systemErrorIntegration = defineIntegration((options = {}) => {
	return {
		name: INTEGRATION_NAME$55,
		processEvent: (event, hint, client) => {
			if (!isSystemError(hint.originalException)) return event;
			const error = hint.originalException;
			const errorContext = { ...error };
			if (!client.getDataCollectionOptions().userInfo && options.includePaths !== true) {
				delete errorContext.path;
				delete errorContext.dest;
			}
			event.contexts = {
				...event.contexts,
				node_system_error: errorContext
			};
			for (const exception of event.exception?.values || []) if (exception.value) {
				if (error.path && exception.value.includes(error.path)) exception.value = exception.value.replace(`'${error.path}'`, "").trim();
				if (error.dest && exception.value.includes(error.dest)) exception.value = exception.value.replace(`'${error.dest}'`, "").trim();
			}
			return event;
		}
	};
});
//#endregion
//#region node_modules/@sentry/node-core/build/esm/proxy/base.js
var _a;
var INTERNAL = /* @__PURE__ */ Symbol("AgentBaseInternalState");
var Agent = class extends (_a = http.Agent, _a) {
	constructor(opts) {
		super(opts);
		this[INTERNAL] = {};
	}
	/**
	* Determine whether this is an `http` or `https` request.
	*/
	isSecureEndpoint(options) {
		if (options) {
			if (typeof options.secureEndpoint === "boolean") return options.secureEndpoint;
			if (typeof options.protocol === "string") return options.protocol === "https:";
		}
		const { stack } = /* @__PURE__ */ new Error();
		if (typeof stack !== "string") return false;
		return stack.split("\n").some((l) => l.indexOf("(https.js:") !== -1 || l.indexOf("node:https:") !== -1);
	}
	createSocket(req, options, cb) {
		const connectOpts = {
			...options,
			secureEndpoint: this.isSecureEndpoint(options)
		};
		Promise.resolve().then(() => this.connect(req, connectOpts)).then((socket) => {
			if (socket instanceof http.Agent) return socket.addRequest(req, connectOpts);
			this[INTERNAL].currentSocket = socket;
			super.createSocket(req, options, cb);
		}, cb);
	}
	createConnection() {
		const socket = this[INTERNAL].currentSocket;
		this[INTERNAL].currentSocket = void 0;
		if (!socket) throw new Error("No socket was returned in the `connect()` function");
		return socket;
	}
	get defaultPort() {
		return this[INTERNAL].defaultPort ?? (this.protocol === "https:" ? 443 : 80);
	}
	set defaultPort(v) {
		if (this[INTERNAL]) this[INTERNAL].defaultPort = v;
	}
	get protocol() {
		return this[INTERNAL].protocol ?? (this.isSecureEndpoint() ? "https:" : "http:");
	}
	set protocol(v) {
		if (this[INTERNAL]) this[INTERNAL].protocol = v;
	}
};
//#endregion
//#region node_modules/@sentry/node-core/build/esm/proxy/parse-proxy-response.js
function debugLog$1(...args) {
	debug$3.log("[https-proxy-agent:parse-proxy-response]", ...args);
}
function parseProxyResponse(socket) {
	return new Promise((resolve, reject) => {
		let buffersLength = 0;
		const buffers = [];
		function read() {
			const b = socket.read();
			if (b) ondata(b);
			else socket.once("readable", read);
		}
		function cleanup() {
			socket.removeListener("end", onend);
			socket.removeListener("error", onerror);
			socket.removeListener("readable", read);
		}
		function onend() {
			cleanup();
			debugLog$1("onend");
			reject(/* @__PURE__ */ new Error("Proxy connection ended before receiving CONNECT response"));
		}
		function onerror(err) {
			cleanup();
			debugLog$1("onerror %o", err);
			reject(err);
		}
		function ondata(b) {
			buffers.push(b);
			buffersLength += b.length;
			const buffered = Buffer.concat(buffers, buffersLength);
			const endOfHeaders = buffered.indexOf("\r\n\r\n");
			if (endOfHeaders === -1) {
				debugLog$1("have not received end of HTTP headers yet...");
				read();
				return;
			}
			const headerParts = buffered.subarray(0, endOfHeaders).toString("ascii").split("\r\n");
			const firstLine = headerParts.shift();
			if (!firstLine) {
				socket.destroy();
				return reject(/* @__PURE__ */ new Error("No header received from proxy CONNECT response"));
			}
			const firstLineParts = firstLine.split(" ");
			const statusCode = +(firstLineParts[1] || 0);
			const statusText = firstLineParts.slice(2).join(" ");
			const headers = {};
			for (const header of headerParts) {
				if (!header) continue;
				const firstColon = header.indexOf(":");
				if (firstColon === -1) {
					socket.destroy();
					return reject(/* @__PURE__ */ new Error(`Invalid header from proxy CONNECT response: "${header}"`));
				}
				const key = header.slice(0, firstColon).toLowerCase();
				const value = header.slice(firstColon + 1).trimStart();
				const current = headers[key];
				if (typeof current === "string") headers[key] = [current, value];
				else if (Array.isArray(current)) current.push(value);
				else headers[key] = value;
			}
			debugLog$1("got proxy server response: %o %o", firstLine, headers);
			cleanup();
			resolve({
				connect: {
					statusCode,
					statusText,
					headers
				},
				buffered
			});
		}
		socket.on("error", onerror);
		socket.on("end", onend);
		read();
	});
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/proxy/index.js
function debugLog(...args) {
	debug$3.log("[https-proxy-agent]", ...args);
}
var HttpsProxyAgent = class extends Agent {
	constructor(proxy, opts) {
		super(opts);
		this.options = {};
		this.proxy = typeof proxy === "string" ? new URL(proxy) : proxy;
		this.proxyHeaders = opts?.headers ?? {};
		debugLog("Creating new HttpsProxyAgent instance: %o", this.proxy.href);
		const host = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, "");
		const port = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === "https:" ? 443 : 80;
		this.connectOpts = {
			ALPNProtocols: ["http/1.1"],
			...opts ? omit(opts, "headers") : null,
			host,
			port
		};
	}
	/**
	* Called when the node-core HTTP client library is creating a
	* new HTTP request.
	*/
	async connect(req, opts) {
		const { proxy } = this;
		if (!opts.host) throw new TypeError("No \"host\" provided");
		let socket;
		if (proxy.protocol === "https:") {
			debugLog("Creating `tls.Socket`: %o", this.connectOpts);
			const servername = this.connectOpts.servername || this.connectOpts.host;
			socket = tls.connect({
				...this.connectOpts,
				servername: servername && net.isIP(servername) ? void 0 : servername
			});
		} else {
			debugLog("Creating `net.Socket`: %o", this.connectOpts);
			socket = net.connect(this.connectOpts);
		}
		const headers = typeof this.proxyHeaders === "function" ? this.proxyHeaders() : { ...this.proxyHeaders };
		const host = net.isIPv6(opts.host) ? `[${opts.host}]` : opts.host;
		let payload = `CONNECT ${host}:${opts.port} HTTP/1.1\r
`;
		if (proxy.username || proxy.password) {
			const auth = `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`;
			headers["Proxy-Authorization"] = `Basic ${Buffer.from(auth).toString("base64")}`;
		}
		headers.Host = `${host}:${opts.port}`;
		if (!headers["Proxy-Connection"]) headers["Proxy-Connection"] = this.keepAlive ? "Keep-Alive" : "close";
		for (const name of Object.keys(headers)) payload += `${name}: ${headers[name]}\r
`;
		const proxyResponsePromise = parseProxyResponse(socket);
		socket.write(`${payload}\r
`);
		const { connect, buffered } = await proxyResponsePromise;
		req.emit("proxyConnect", connect);
		this.emit("proxyConnect", connect, req);
		if (connect.statusCode === 200) {
			req.once("socket", resume);
			if (opts.secureEndpoint) {
				debugLog("Upgrading socket connection to TLS");
				const servername = opts.servername || opts.host;
				return tls.connect({
					...omit(opts, "host", "path", "port"),
					socket,
					servername: net.isIP(servername) ? void 0 : servername
				});
			}
			return socket;
		}
		socket.destroy();
		const fakeSocket = new net.Socket({ writable: false });
		fakeSocket.readable = true;
		req.once("socket", (s) => {
			debugLog("Replaying proxy buffer for failed request");
			s.push(buffered);
			s.push(null);
		});
		return fakeSocket;
	}
};
HttpsProxyAgent.protocols = ["http", "https"];
function resume(socket) {
	socket.resume();
}
function omit(obj, ...keys) {
	const ret = {};
	let key;
	for (key in obj) if (!keys.includes(key)) ret[key] = obj[key];
	return ret;
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/transports/http.js
var GZIP_THRESHOLD = 32768;
function streamFromBody(body) {
	return new Readable({ read() {
		this.push(body);
		this.push(null);
	} });
}
function makeNodeTransport(options) {
	let urlSegments;
	try {
		urlSegments = new URL(options.url);
	} catch (_e) {
		consoleSandbox(() => {
			console.warn("[@sentry/node]: Invalid dsn or tunnel option, will not send any events. The tunnel option must be a full URL when used.");
		});
		return createTransport(options, () => Promise.resolve({}));
	}
	const isHttps = urlSegments.protocol === "https:";
	const proxy = applyNoProxyOption(urlSegments, options.proxy || (isHttps ? process.env.https_proxy : void 0) || process.env.http_proxy);
	const nativeHttpModule = isHttps ? https : http;
	const keepAlive = options.keepAlive === void 0 ? false : options.keepAlive;
	const agent = proxy ? new HttpsProxyAgent(proxy) : new nativeHttpModule.Agent({
		keepAlive,
		maxSockets: 30,
		timeout: 2e3
	});
	const requestExecutor = createRequestExecutor(options, options.httpModule ?? nativeHttpModule, agent);
	return createTransport(options, requestExecutor);
}
function applyNoProxyOption(transportUrlSegments, proxy) {
	const { no_proxy } = process.env;
	if (no_proxy?.split(",").some((exemption) => transportUrlSegments.host.endsWith(exemption) || transportUrlSegments.hostname.endsWith(exemption))) return;
	else return proxy;
}
function createRequestExecutor(options, httpModule, agent) {
	const { hostname, pathname, port, protocol, search } = new URL(options.url);
	return function makeRequest(request) {
		return new Promise((resolve, reject) => {
			suppressTracing$1(() => {
				let body = streamFromBody(request.body);
				const headers = { ...options.headers };
				if (request.body.length > GZIP_THRESHOLD) {
					headers["content-encoding"] = "gzip";
					body = body.pipe(createGzip());
				}
				const hostnameIsIPv6 = hostname.startsWith("[");
				const req = httpModule.request({
					method: "POST",
					agent,
					headers,
					hostname: hostnameIsIPv6 ? hostname.slice(1, -1) : hostname,
					path: `${pathname}${search}`,
					port,
					protocol,
					ca: options.caCerts
				}, (res) => {
					res.on("data", () => {});
					res.on("end", () => {});
					res.setEncoding("utf8");
					const retryAfterHeader = res.headers["retry-after"] ?? null;
					const rateLimitsHeader = res.headers["x-sentry-rate-limits"] ?? null;
					resolve({
						statusCode: res.statusCode,
						headers: {
							"retry-after": retryAfterHeader,
							"x-sentry-rate-limits": Array.isArray(rateLimitsHeader) ? rateLimitsHeader[0] || null : rateLimitsHeader
						}
					});
				});
				req.on("error", reject);
				body.pipe(req);
			});
		});
	};
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/utils/spotlight.js
function getSpotlightConfig(optionsSpotlight) {
	if (optionsSpotlight === false) return false;
	if (typeof optionsSpotlight === "string") return optionsSpotlight;
	const envBool = envToBool(process.env.SENTRY_SPOTLIGHT, { strict: true });
	const envUrl = envBool === null && process.env.SENTRY_SPOTLIGHT ? process.env.SENTRY_SPOTLIGHT : void 0;
	return optionsSpotlight === true ? envUrl ?? true : envBool ?? envUrl;
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/utils/module.js
function normalizeWindowsPath(path) {
	return path.replace(/^[A-Z]:/, "").replace(/\\/g, "/");
}
function createGetModuleFromFilename(basePath = process.argv[1] ? dirname(process.argv[1]) : process.cwd(), isWindows = sep === "\\") {
	const normalizedBase = isWindows ? normalizeWindowsPath(basePath) : basePath;
	return (filename) => {
		if (!filename) return;
		const normalizedFilename = isWindows ? normalizeWindowsPath(filename) : filename;
		let { dir, base: file, ext } = posix.parse(normalizedFilename);
		if (ext === ".js" || ext === ".mjs" || ext === ".cjs") file = file.slice(0, ext.length * -1);
		const decodedFile = decodeURIComponent(file);
		if (!dir) dir = ".";
		const n = dir.lastIndexOf("/node_modules");
		if (n > -1) return `${dir.slice(n + 14).replace(/\//g, ".")}:${decodedFile}`;
		if (dir.startsWith(normalizedBase)) {
			const moduleName = dir.slice(normalizedBase.length + 1).replace(/\//g, ".");
			return moduleName ? `${moduleName}:${decodedFile}` : decodedFile;
		}
		return decodedFile;
	};
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/sdk/api.js
function getSentryRelease(fallback) {
	if (process.env.SENTRY_RELEASE) return process.env.SENTRY_RELEASE;
	if (GLOBAL_OBJ.SENTRY_RELEASE?.id) return GLOBAL_OBJ.SENTRY_RELEASE.id;
	const possibleReleaseNameOfGitProvider = process.env["GITHUB_SHA"] || process.env["CI_MERGE_REQUEST_SOURCE_BRANCH_SHA"] || process.env["CI_BUILD_REF"] || process.env["CI_COMMIT_SHA"] || process.env["BITBUCKET_COMMIT"];
	const possibleReleaseNameOfCiProvidersWithSpecificEnvVar = process.env["APPVEYOR_PULL_REQUEST_HEAD_COMMIT"] || process.env["APPVEYOR_REPO_COMMIT"] || process.env["CODEBUILD_RESOLVED_SOURCE_VERSION"] || process.env["AWS_COMMIT_ID"] || process.env["BUILD_SOURCEVERSION"] || process.env["GIT_CLONE_COMMIT_HASH"] || process.env["BUDDY_EXECUTION_REVISION"] || process.env["BUILDKITE_COMMIT"] || process.env["CIRCLE_SHA1"] || process.env["CIRRUS_CHANGE_IN_REPO"] || process.env["CF_REVISION"] || process.env["CM_COMMIT"] || process.env["CF_PAGES_COMMIT_SHA"] || process.env["DRONE_COMMIT_SHA"] || process.env["FC_GIT_COMMIT_SHA"] || process.env["HEROKU_TEST_RUN_COMMIT_VERSION"] || process.env["HEROKU_BUILD_COMMIT"] || process.env["HEROKU_SLUG_COMMIT"] || process.env["RAILWAY_GIT_COMMIT_SHA"] || process.env["RENDER_GIT_COMMIT"] || process.env["SEMAPHORE_GIT_SHA"] || process.env["TRAVIS_PULL_REQUEST_SHA"] || process.env["VERCEL_GIT_COMMIT_SHA"] || process.env["VERCEL_GITHUB_COMMIT_SHA"] || process.env["VERCEL_GITLAB_COMMIT_SHA"] || process.env["VERCEL_BITBUCKET_COMMIT_SHA"] || process.env["ZEIT_GITHUB_COMMIT_SHA"] || process.env["ZEIT_GITLAB_COMMIT_SHA"] || process.env["ZEIT_BITBUCKET_COMMIT_SHA"];
	const possibleReleaseNameOfCiProvidersWithGenericEnvVar = process.env["CI_COMMIT_ID"] || process.env["SOURCE_COMMIT"] || process.env["SOURCE_VERSION"] || process.env["GIT_COMMIT"] || process.env["COMMIT_REF"] || process.env["BUILD_VCS_NUMBER"] || process.env["CI_COMMIT_SHA"];
	return possibleReleaseNameOfGitProvider || possibleReleaseNameOfCiProvidersWithSpecificEnvVar || possibleReleaseNameOfCiProvidersWithGenericEnvVar || fallback;
}
var defaultStackParser = createStackParser(nodeStackLineParser(createGetModuleFromFilename()));
//#endregion
//#region node_modules/@sentry/node-core/build/esm/sdk/client.js
var DEFAULT_CLIENT_REPORT_FLUSH_INTERVAL_MS = 6e4;
var NodeClient = class extends ServerRuntimeClient {
	constructor(options) {
		const serverName = options.includeServerName === false ? void 0 : options.serverName || global.process.env.SENTRY_NAME || os$1.hostname();
		const clientOptions = {
			...options,
			platform: "node",
			runtime: options.runtime || {
				name: "node",
				version: global.process.version
			},
			serverName
		};
		if (options.openTelemetryInstrumentations) registerInstrumentations({ instrumentations: options.openTelemetryInstrumentations });
		applySdkMetadata(clientOptions, "node");
		debug$3.log(`Initializing Sentry: process: ${process.pid}, thread: ${isMainThread$1 ? "main" : `worker-${threadId}`}.`);
		super(clientOptions);
		if (this.getOptions().enableLogs) {
			this._logOnExitFlushListener = () => {
				_INTERNAL_flushLogsBuffer(this);
			};
			if (serverName) this.on("beforeCaptureLog", (log) => {
				log.attributes = {
					...log.attributes,
					"server.address": serverName
				};
			});
			process.on("beforeExit", this._logOnExitFlushListener);
		}
		_INTERNAL_setDeferSegmentSpanCapture(this);
	}
	/** Get the OTEL tracer. */
	get tracer() {
		if (this._tracer) return this._tracer;
		const name = "@sentry/node";
		const version = SDK_VERSION;
		const tracer = import_src.trace.getTracer(name, version);
		this._tracer = tracer;
		return tracer;
	}
	/** @inheritDoc */
	async flush(timeout) {
		await this.traceProvider?.forceFlush();
		if (this.getOptions().sendClientReports) this._flushOutcomes();
		return super.flush(timeout);
	}
	/** @inheritDoc */
	async close(timeout) {
		if (this._clientReportInterval) clearInterval(this._clientReportInterval);
		if (this._clientReportOnExitFlushListener) process.off("beforeExit", this._clientReportOnExitFlushListener);
		if (this._logOnExitFlushListener) process.off("beforeExit", this._logOnExitFlushListener);
		const allEventsSent = await super.close(timeout);
		if (this.traceProvider) await this.traceProvider.shutdown();
		return allEventsSent;
	}
	/**
	* Will start tracking client reports for this client.
	*
	* NOTICE: This method will create an interval that is periodically called and attach a `process.on('beforeExit')`
	* hook. To clean up these resources, call `.close()` when you no longer intend to use the client. Not doing so will
	* result in a memory leak.
	*/
	startClientReportTracking() {
		const clientOptions = this.getOptions();
		if (clientOptions.sendClientReports) {
			this._clientReportOnExitFlushListener = () => {
				this._flushOutcomes();
			};
			this._clientReportInterval = setInterval(() => {
				DEBUG_BUILD$3 && debug$3.log("Flushing client reports based on interval.");
				this._flushOutcomes();
			}, clientOptions.clientReportFlushInterval ?? DEFAULT_CLIENT_REPORT_FLUSH_INTERVAL_MS).unref();
			process.on("beforeExit", this._clientReportOnExitFlushListener);
		}
	}
	/** @inheritDoc */
	_setupIntegrations() {
		_INTERNAL_clearAiProviderSkips();
		super._setupIntegrations();
	}
	/** Custom implementation for OTEL, so we can handle scope-span linking. */
	_getTraceInfoFromScope(scope) {
		if (!scope) return [void 0, void 0];
		return getTraceContextForScope(this, scope);
	}
};
//#endregion
//#region node_modules/@sentry/node-core/build/esm/utils/detection.js
var hasWarnedAboutNodeVersion;
function supportsEsmLoaderHooks() {
	if (NODE_MAJOR >= 21 || NODE_MAJOR === 20 && NODE_MINOR >= 6 || NODE_MAJOR === 18 && NODE_MINOR >= 19) return true;
	if (!hasWarnedAboutNodeVersion) {
		hasWarnedAboutNodeVersion = true;
		consoleSandbox(() => {
			console.warn(`[Sentry] You are using Node.js v${process.versions.node} in ESM mode ("import syntax"). The Sentry Node.js SDK is not compatible with ESM in Node.js versions before 18.19.0 or before 20.6.0. Please either build your application with CommonJS ("require() syntax"), or upgrade your Node.js version.`);
		});
	}
	return false;
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/sdk/esmLoader.js
function initializeEsmLoader() {
	if (!supportsEsmLoaderHooks()) return;
	if (!GLOBAL_OBJ._sentryEsmLoaderHookRegistered) {
		GLOBAL_OBJ._sentryEsmLoaderHookRegistered = true;
		try {
			const { addHookMessagePort } = createAddHookMessageChannel();
			moduleModule.register("import-in-the-middle/hook.mjs", import.meta.url, {
				data: {
					addHookMessagePort,
					include: []
				},
				transferList: [addHookMessagePort]
			});
		} catch (error) {
			debug$3.warn("Failed to register 'import-in-the-middle' hook", error);
		}
	}
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/sdk/index.js
function getDefaultIntegrations$1() {
	return [
		inboundFiltersIntegration(),
		functionToStringIntegration(),
		linkedErrorsIntegration(),
		requestDataIntegration(),
		systemErrorIntegration(),
		conversationIdIntegration(),
		consoleIntegration(),
		httpIntegration$1(),
		nativeNodeFetchIntegration$1(),
		onUncaughtExceptionIntegration(),
		onUnhandledRejectionIntegration(),
		contextLinesIntegration(),
		localVariablesIntegration(),
		nodeContextIntegration(),
		childProcessIntegration(),
		processSessionIntegration(),
		modulesIntegration()
	];
}
function init$1(options = {}) {
	return _init$1(options, getDefaultIntegrations$1);
}
function _init$1(_options = {}, getDefaultIntegrationsImpl) {
	const options = getClientOptions(_options, getDefaultIntegrationsImpl);
	if (options.debug === true) {
		if (DEBUG_BUILD$3) debug$3.enable();
		else consoleSandbox(() => {
			console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
		});
	}
	if (options.registerEsmLoaderHooks !== false) initializeEsmLoader();
	setNodeOpenTelemetryContextAsyncContextStrategy(options);
	getCurrentScope().update(options.initialScope);
	if (options.spotlight && !options.integrations.some(({ name }) => name === "Spotlight")) options.integrations.push(spotlightIntegration({ sidecarUrl: typeof options.spotlight === "string" ? options.spotlight : void 0 }));
	applySdkMetadata(options, "node-core");
	const client = new NodeClient(options);
	getCurrentScope().setClient(client);
	client.init();
	debug$3.log(`SDK initialized from ESM`);
	client.startClientReportTracking();
	updateScopeFromEnvVariables();
	enhanceDscWithOpenTelemetryRootSpanName(client);
	setupEventContextTrace(client);
	if (process.env.VERCEL) process.on("SIGTERM", async () => {
		await client.flush(200);
	});
	return client;
}
function validateOpenTelemetrySetup() {
	if (!DEBUG_BUILD$3) return;
	const setup = openTelemetrySetupCheck();
	const required = ["SentryContextManager", "SentryPropagator"];
	const hasSentryTracerProvider = setup.includes("SentryTracerProvider");
	if (hasSpansEnabled() && !hasSentryTracerProvider) required.push("SentrySpanProcessor");
	for (const k of required) if (!setup.includes(k)) debug$3.error(`You have to set up the ${k}. Without this, the OpenTelemetry & Sentry integration will not work properly.`);
	if (!hasSentryTracerProvider && !setup.includes("SentrySampler")) debug$3.warn("You have to set up the SentrySampler. Without this, the OpenTelemetry & Sentry integration may still work, but sample rates set for the Sentry SDK will not be respected. If you use a custom sampler, make sure to use `wrapSamplingDecision`.");
}
function getClientOptions(options, getDefaultIntegrationsImpl) {
	const release = getRelease(options.release);
	const spotlight = getSpotlightConfig(options.spotlight);
	const tracesSampleRate = getTracesSampleRate(options.tracesSampleRate);
	const mergedOptions = {
		...options,
		dsn: options.dsn ?? process.env.SENTRY_DSN,
		environment: options.environment ?? process.env.SENTRY_ENVIRONMENT,
		sendClientReports: options.sendClientReports ?? true,
		transport: options.transport ?? makeNodeTransport,
		stackParser: stackParserFromStackParserOptions(options.stackParser || defaultStackParser),
		release,
		tracesSampleRate,
		spotlight,
		debug: envToBool(options.debug ?? process.env.SENTRY_DEBUG)
	};
	const integrations = options.integrations;
	const defaultIntegrations = options.defaultIntegrations ?? getDefaultIntegrationsImpl(mergedOptions);
	const resolvedIntegrations = getIntegrationsToSetup({
		defaultIntegrations,
		integrations
	});
	return {
		...mergedOptions,
		integrations: resolvedIntegrations
	};
}
function getRelease(release) {
	if (release !== void 0) return release;
	const detectedRelease = getSentryRelease();
	if (detectedRelease !== void 0) return detectedRelease;
}
function getTracesSampleRate(tracesSampleRate) {
	if (tracesSampleRate !== void 0) return tracesSampleRate;
	const sampleRateFromEnv = process.env.SENTRY_TRACES_SAMPLE_RATE;
	if (!sampleRateFromEnv) return;
	const parsed = parseFloat(sampleRateFromEnv);
	return isFinite(parsed) ? parsed : void 0;
}
function updateScopeFromEnvVariables() {
	if (envToBool(process.env.SENTRY_USE_ENVIRONMENT) !== false) {
		const sentryTraceEnv = process.env.SENTRY_TRACE;
		const baggageEnv = process.env.SENTRY_BAGGAGE;
		const propagationContext = propagationContextFromHeaders(sentryTraceEnv, baggageEnv);
		getCurrentScope().setPropagationContext(propagationContext);
	}
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/utils/createMissingInstrumentationContext.js
var createMissingInstrumentationContext = (pkg) => {
	return {
		package: pkg,
		"javascript.is_cjs": false
	};
};
//#endregion
//#region node_modules/@sentry/node-core/build/esm/utils/ensureIsWrapped.js
function ensureIsWrapped(maybeWrappedFunction, name) {
	const clientOptions = getClient()?.getOptions();
	if (!clientOptions?.disableInstrumentationWarnings && !(isWrapped(maybeWrappedFunction) || typeof getOriginalFunction(maybeWrappedFunction) === "function") && isEnabled() && hasSpansEnabled(clientOptions)) {
		consoleSandbox(() => {
			console.warn(`[Sentry] ${name} is not instrumented. Please make sure to initialize Sentry in a separate file that you \`--import\` when running node, see: https://docs.sentry.io/platforms/javascript/guides/${name}/install/esm/.`);
		});
		getGlobalScope().setContext("missing_instrumentation", createMissingInstrumentationContext(name));
	}
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/anr/index.js
var { isPromise: isPromise$3 } = types$1;
var base64WorkerScript = "LyohIEBzZW50cnkvbm9kZS1jb3JlIDEwLjc0LjAgKGNlNTAwOWEpIHwgaHR0cHM6Ly9naXRodWIuY29tL2dldHNlbnRyeS9zZW50cnktamF2YXNjcmlwdCAqLwppbXBvcnR7U2Vzc2lvbiBhcyB0fWZyb20ibm9kZTppbnNwZWN0b3IiO2ltcG9ydHt3b3JrZXJEYXRhIGFzIG4scGFyZW50UG9ydCBhcyBlfWZyb20ibm9kZTp3b3JrZXJfdGhyZWFkcyI7aW1wb3J0e3Bvc2l4IGFzIHIsc2VwIGFzIG99ZnJvbSJub2RlOnBhdGgiO2ltcG9ydCphcyBpIGZyb20ibm9kZTpodHRwIjtpbXBvcnQqYXMgcyBmcm9tIm5vZGU6aHR0cHMiO2ltcG9ydHtSZWFkYWJsZSBhcyBjfWZyb20ibm9kZTpzdHJlYW0iO2ltcG9ydHtjcmVhdGVHemlwIGFzIHV9ZnJvbSJub2RlOnpsaWIiO2ltcG9ydCphcyBhIGZyb20ibm9kZTpuZXQiO2ltcG9ydCphcyBmIGZyb20ibm9kZTp0bHMiO2NvbnN0IGg9InVuZGVmaW5lZCI9PXR5cGVvZiBfX1NFTlRSWV9ERUJVR19ffHxfX1NFTlRSWV9ERUJVR19fLHA9Z2xvYmFsVGhpcyxkPSIxMC43NC4wIjtmdW5jdGlvbiBsKCl7cmV0dXJuIGcocCkscH1mdW5jdGlvbiBnKHQpe2NvbnN0IG49dC5fX1NFTlRSWV9fPXQuX19TRU5UUllfX3x8e307cmV0dXJuIG4udmVyc2lvbj1uLnZlcnNpb258fGQsbltkXT1uW2RdfHx7fX1mdW5jdGlvbiBtKHQsbixlPXApe2NvbnN0IHI9ZS5fX1NFTlRSWV9fPWUuX19TRU5UUllfX3x8e30sbz1yW2RdPXJbZF18fHt9O3JldHVybiBvW3RdfHwob1t0XT1uKCkpfWNvbnN0IHk9e307ZnVuY3Rpb24gYih0KXtpZighKCJjb25zb2xlImluIHApKXJldHVybiB0KCk7Y29uc3Qgbj1wLmNvbnNvbGUsZT17fSxyPU9iamVjdC5rZXlzKHkpO3IuZm9yRWFjaCh0PT57Y29uc3Qgcj15W3RdO2VbdF09blt0XSxuW3RdPXJ9KTt0cnl7cmV0dXJuIHQoKX1maW5hbGx5e3IuZm9yRWFjaCh0PT57blt0XT1lW3RdfSl9fWZ1bmN0aW9uIHYoKXtyZXR1cm4gUygpLmVuYWJsZWR9ZnVuY3Rpb24gXyh0LC4uLm4pe2gmJnYoKSYmYigoKT0+e3AuY29uc29sZVt0XShgU2VudHJ5IExvZ2dlciBbJHt0fV06YCwuLi5uKX0pfWZ1bmN0aW9uIFMoKXtyZXR1cm4gaD9tKCJsb2dnZXJTZXR0aW5ncyIsKCk9Pih7ZW5hYmxlZDohMX0pKTp7ZW5hYmxlZDohMX19Y29uc3Qgdz17ZW5hYmxlOmZ1bmN0aW9uKCl7UygpLmVuYWJsZWQ9ITB9LGRpc2FibGU6ZnVuY3Rpb24oKXtTKCkuZW5hYmxlZD0hMX0saXNFbmFibGVkOnYsbG9nOmZ1bmN0aW9uKC4uLnQpe18oImxvZyIsLi4udCl9LHdhcm46ZnVuY3Rpb24oLi4udCl7Xygid2FybiIsLi4udCl9LGVycm9yOmZ1bmN0aW9uKC4uLnQpe18oImVycm9yIiwuLi50KX19LCQ9L2NhcHR1cmVNZXNzYWdlfGNhcHR1cmVFeGNlcHRpb24vO2Z1bmN0aW9uIEUodCl7cmV0dXJuIHRbdC5sZW5ndGgtMV18fHt9fWNvbnN0IHg9Ijxhbm9ueW1vdXM+Ijtjb25zdCBOPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7ZnVuY3Rpb24gQyh0LG4pe3JldHVybiBOLmNhbGwodCk9PT1gW29iamVjdCAke259XWB9ZnVuY3Rpb24gaih0KXtyZXR1cm4gQm9vbGVhbih0Py50aGVuJiYiZnVuY3Rpb24iPT10eXBlb2YgdC50aGVuKX1mdW5jdGlvbiBSKHQsbil7dHJ5e3JldHVybiB0IGluc3RhbmNlb2Ygbn1jYXRjaHtyZXR1cm4hMX19ZnVuY3Rpb24gQSh0KXtpZihmdW5jdGlvbih0KXtzd2l0Y2goTi5jYWxsKHQpKXtjYXNlIltvYmplY3QgRXJyb3JdIjpjYXNlIltvYmplY3QgRXhjZXB0aW9uXSI6Y2FzZSJbb2JqZWN0IERPTUV4Y2VwdGlvbl0iOmNhc2UiW29iamVjdCBXZWJBc3NlbWJseS5FeGNlcHRpb25dIjpyZXR1cm4hMDtkZWZhdWx0OnJldHVybiBSKHQsRXJyb3IpfX0odCkpcmV0dXJue21lc3NhZ2U6dC5tZXNzYWdlLG5hbWU6dC5uYW1lLHN0YWNrOnQuc3RhY2ssLi4uSSh0KX07aWYobj10LCJ1bmRlZmluZWQiIT10eXBlb2YgRXZlbnQmJlIobixFdmVudCkpe2NvbnN0e3R5cGU6bix0YXJnZXQ6ZSxjdXJyZW50VGFyZ2V0OnIsZGV0YWlsOm99PXQ7cmV0dXJue3R5cGU6bix0YXJnZXQ6ZSxjdXJyZW50VGFyZ2V0OnIsLi4ubz97ZGV0YWlsOm99Ont9LC4uLkkodCl9fXZhciBuO3JldHVybiB0fWZ1bmN0aW9uIEkodCl7cmV0dXJuIm9iamVjdCI9PXR5cGVvZihuPXQpJiZudWxsIT09bj9PYmplY3QuZnJvbUVudHJpZXMoT2JqZWN0LmVudHJpZXModCkpOnt9O3ZhciBufWxldCBPO2Z1bmN0aW9uIFQodCl7aWYodm9pZCAwIT09TylyZXR1cm4gTz9PKHQpOnQoKTtjb25zdCBuPVN5bWJvbC5mb3IoIl9fU0VOVFJZX1NBRkVfUkFORE9NX0lEX1dSQVBQRVJfXyIpLGU9cDtyZXR1cm4gbiBpbiBlJiYiZnVuY3Rpb24iPT10eXBlb2YgZVtuXT8oTz1lW25dLE8odCkpOihPPW51bGwsdCgpKX1mdW5jdGlvbiBrKCl7cmV0dXJuIFQoKCk9Pk1hdGgucmFuZG9tKCkpfWZ1bmN0aW9uIFAoKXtyZXR1cm4gVCgoKT0+RGF0ZS5ub3coKSl9Y29uc3QgRD1TeW1ib2wuZm9yKCJzZW50cnkuc2tpcE5vcm1hbGl6YXRpb24iKSxVPVN5bWJvbC5mb3IoInNlbnRyeS5vdmVycmlkZU5vcm1hbGl6YXRpb25EZXB0aCIpO2Z1bmN0aW9uIEIodCxuPTEwMCxlPTEvMCl7dHJ5e3JldHVybiBMKCIiLHQsbixlKX1jYXRjaCh0KXtyZXR1cm57RVJST1I6YCoqbm9uLXNlcmlhbGl6YWJsZSoqICgke3R9KWB9fX1mdW5jdGlvbiBMKHQsbixlPTEvMCxyPTEvMCxvPWZ1bmN0aW9uKCl7Y29uc3QgdD1uZXcgV2Vha1NldDtmdW5jdGlvbiBuKG4pe3JldHVybiEhdC5oYXMobil8fCh0LmFkZChuKSwhMSl9ZnVuY3Rpb24gZShuKXt0LmRlbGV0ZShuKX1yZXR1cm5bbixlXX0oKSl7Y29uc3RbaSxzXT1vO2lmKG51bGw9PW58fFsiYm9vbGVhbiIsInN0cmluZyJdLmluY2x1ZGVzKHR5cGVvZiBuKXx8Im51bWJlciI9PXR5cGVvZiBuJiZOdW1iZXIuaXNGaW5pdGUobikpcmV0dXJuIG47Y29uc3QgYz1mdW5jdGlvbih0LG4pe3RyeXtpZigidW5kZWZpbmVkIiE9dHlwZW9mIGdsb2JhbCYmbj09PWdsb2JhbClyZXR1cm4iW0dsb2JhbF0iO2lmKCJudW1iZXIiPT10eXBlb2YgbiYmIU51bWJlci5pc0Zpbml0ZShuKSlyZXR1cm5gWyR7bn1dYDtpZigiZnVuY3Rpb24iPT10eXBlb2YgbilyZXR1cm5gW0Z1bmN0aW9uOiAke2Z1bmN0aW9uKHQpe3RyeXtyZXR1cm4gdCYmImZ1bmN0aW9uIj09dHlwZW9mIHQmJnQubmFtZXx8eH1jYXRjaHtyZXR1cm4geH19KG4pfV1gO2lmKCJzeW1ib2wiPT10eXBlb2YgbilyZXR1cm5gWyR7U3RyaW5nKG4pfV1gO2lmKCJiaWdpbnQiPT10eXBlb2YgbilyZXR1cm5gW0JpZ0ludDogJHtTdHJpbmcobil9XWA7Y29uc3QgdD1mdW5jdGlvbih0KXtjb25zdCBuPU9iamVjdC5nZXRQcm90b3R5cGVPZih0KTtyZXR1cm4gbj8uY29uc3RydWN0b3I/bi5jb25zdHJ1Y3Rvci5uYW1lOiJudWxsIHByb3RvdHlwZSJ9KG4pO3JldHVybmBbb2JqZWN0ICR7dH1dYH1jYXRjaCh0KXtyZXR1cm5gKipub24tc2VyaWFsaXphYmxlKiogKCR7dH0pYH19KDAsbik7aWYoIWMuc3RhcnRzV2l0aCgiW29iamVjdCAiKSlyZXR1cm4gYztpZihmdW5jdGlvbih0KXtyZXR1cm4gQm9vbGVhbih0W0RdKX0obikpcmV0dXJuIG47Y29uc3QgdT1mdW5jdGlvbih0KXtjb25zdCBuPXRbVV07cmV0dXJuIm51bWJlciI9PXR5cGVvZiBuP246dm9pZCAwfShuKSxhPXZvaWQgMCE9PXU/dTplO2lmKDA9PT1hKXJldHVybiBjLnJlcGxhY2UoIm9iamVjdCAiLCIiKTtpZihpKG4pKXJldHVybiJbQ2lyY3VsYXIgfl0iO2NvbnN0IGY9bjtpZihmJiYiZnVuY3Rpb24iPT10eXBlb2YgZi50b0pTT04pdHJ5e3JldHVybiBMKCIiLGYudG9KU09OKCksYS0xLHIsbyl9Y2F0Y2h7fWNvbnN0IGg9QXJyYXkuaXNBcnJheShuKT9bXTp7fTtsZXQgcD0wO2NvbnN0IGQ9QShuKTtmb3IoY29uc3QgdCBpbiBkKXtpZighT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGQsdCkpY29udGludWU7aWYocD49cil7aFt0XT0iW01heFByb3BlcnRpZXMgfl0iO2JyZWFrfWNvbnN0IG49ZFt0XTtoW3RdPUwodCxuLGEtMSxyLG8pLHArK31yZXR1cm4gcyhuKSxofWZ1bmN0aW9uIE0odCxuKXtjb25zdCBlPW4ucmVwbGFjZSgvXFwvZywiLyIpLnJlcGxhY2UoL1t8XFx7fSgpW1xdXiQrKj8uXS9nLCJcXCQmIik7bGV0IHI9dDt0cnl7cj1kZWNvZGVVUkkodCl9Y2F0Y2h7fXJldHVybiByLnJlcGxhY2UoL1xcL2csIi8iKS5yZXBsYWNlKC93ZWJwYWNrOlwvPy9nLCIiKS5yZXBsYWNlKG5ldyBSZWdFeHAoYChmaWxlOi8vKT8vKiR7ZX0vKmAsImlnIiksImFwcDovLy8iKX1mdW5jdGlvbiB6KHQsbj0wKXtyZXR1cm4ic3RyaW5nIiE9dHlwZW9mIHR8fDA9PT1ufHx0Lmxlbmd0aDw9bj90OmAke3Quc2xpY2UoMCxuKX0uLi5gfWxldCBGO2Z1bmN0aW9uIEcodD1mdW5jdGlvbigpe2NvbnN0IHQ9cDtyZXR1cm4gdC5jcnlwdG98fHQubXNDcnlwdG99KCkpe3RyeXtpZih0Py5yYW5kb21VVUlEKXJldHVybiBUKCgpPT50LnJhbmRvbVVVSUQoKSkucmVwbGFjZSgvLS9nLCIiKX1jYXRjaHt9cmV0dXJuIEZ8fChGPSIxMDAwMDAwMDEwMDA0MDAwODAwMDEwMDAwMDAwMDAwMCIpLEYucmVwbGFjZSgvWzAxOF0vZyx0PT4odF4oMTYqaygpJjE1KT4+dC80KS50b1N0cmluZygxNikpfWZ1bmN0aW9uIEooKXtyZXR1cm4gUCgpLzFlM31sZXQgVztmdW5jdGlvbiBZKCl7cmV0dXJuKFc/PyhXPWZ1bmN0aW9uKCl7Y29uc3R7cGVyZm9ybWFuY2U6dH09cDtpZighdD8ubm93fHwhdC50aW1lT3JpZ2luKXJldHVybiBKO2NvbnN0IG49dC50aW1lT3JpZ2luO3JldHVybigpPT4obitUKCgpPT50Lm5vdygpKSkvMWUzfSgpKSkoKX1mdW5jdGlvbiBIKHQpe2NvbnN0IG49WSgpLGU9e3NpZDpHKCksaW5pdDohMCx0aW1lc3RhbXA6bixzdGFydGVkOm4sZHVyYXRpb246MCxzdGF0dXM6Im9rIixlcnJvcnM6MCxpZ25vcmVEdXJhdGlvbjohMSx0b0pTT046KCk9PmZ1bmN0aW9uKHQpe3JldHVybntzaWQ6YCR7dC5zaWR9YCxpbml0OnQuaW5pdCxzdGFydGVkOm5ldyBEYXRlKDFlMyp0LnN0YXJ0ZWQpLnRvSVNPU3RyaW5nKCksdGltZXN0YW1wOm5ldyBEYXRlKDFlMyp0LnRpbWVzdGFtcCkudG9JU09TdHJpbmcoKSxzdGF0dXM6dC5zdGF0dXMsZXJyb3JzOnQuZXJyb3JzLGRpZDoibnVtYmVyIj09dHlwZW9mIHQuZGlkfHwic3RyaW5nIj09dHlwZW9mIHQuZGlkP2Ake3QuZGlkfWA6dm9pZCAwLGR1cmF0aW9uOnQuZHVyYXRpb24sYWJub3JtYWxfbWVjaGFuaXNtOnQuYWJub3JtYWxfbWVjaGFuaXNtLGF0dHJzOntyZWxlYXNlOnQucmVsZWFzZSxlbnZpcm9ubWVudDp0LmVudmlyb25tZW50LGlwX2FkZHJlc3M6dC5pcEFkZHJlc3MsdXNlcl9hZ2VudDp0LnVzZXJBZ2VudH19fShlKX07cmV0dXJuIHQmJksoZSx0KSxlfWZ1bmN0aW9uIEsodCxuPXt9KXtpZihuLnVzZXImJighdC5pcEFkZHJlc3MmJm4udXNlci5pcF9hZGRyZXNzJiYodC5pcEFkZHJlc3M9bi51c2VyLmlwX2FkZHJlc3MpLHQuZGlkfHxuLmRpZHx8KHQuZGlkPW4udXNlci5pZHx8bi51c2VyLmVtYWlsfHxuLnVzZXIudXNlcm5hbWUpKSx0LnRpbWVzdGFtcD1uLnRpbWVzdGFtcHx8WSgpLG4uYWJub3JtYWxfbWVjaGFuaXNtJiYodC5hYm5vcm1hbF9tZWNoYW5pc209bi5hYm5vcm1hbF9tZWNoYW5pc20pLG4uaWdub3JlRHVyYXRpb24mJih0Lmlnbm9yZUR1cmF0aW9uPW4uaWdub3JlRHVyYXRpb24pLG4uc2lkJiYodC5zaWQ9MzI9PT1uLnNpZC5sZW5ndGg/bi5zaWQ6RygpKSx2b2lkIDAhPT1uLmluaXQmJih0LmluaXQ9bi5pbml0KSwhdC5kaWQmJm4uZGlkJiYodC5kaWQ9YCR7bi5kaWR9YCksIm51bWJlciI9PXR5cGVvZiBuLnN0YXJ0ZWQmJih0LnN0YXJ0ZWQ9bi5zdGFydGVkKSx0Lmlnbm9yZUR1cmF0aW9uKXQuZHVyYXRpb249dm9pZCAwO2Vsc2UgaWYoIm51bWJlciI9PXR5cGVvZiBuLmR1cmF0aW9uKXQuZHVyYXRpb249bi5kdXJhdGlvbjtlbHNle2NvbnN0IG49dC50aW1lc3RhbXAtdC5zdGFydGVkO3QuZHVyYXRpb249bj49MD9uOjB9bi5yZWxlYXNlJiYodC5yZWxlYXNlPW4ucmVsZWFzZSksbi5lbnZpcm9ubWVudCYmKHQuZW52aXJvbm1lbnQ9bi5lbnZpcm9ubWVudCksIXQuaXBBZGRyZXNzJiZuLmlwQWRkcmVzcyYmKHQuaXBBZGRyZXNzPW4uaXBBZGRyZXNzKSwhdC51c2VyQWdlbnQmJm4udXNlckFnZW50JiYodC51c2VyQWdlbnQ9bi51c2VyQWdlbnQpLCJudW1iZXIiPT10eXBlb2Ygbi5lcnJvcnMmJih0LmVycm9ycz1uLmVycm9ycyksbi5zdGF0dXMmJih0LnN0YXR1cz1uLnN0YXR1cyl9ZnVuY3Rpb24gWih0LG4sZT0yKXtpZighbnx8Im9iamVjdCIhPXR5cGVvZiBufHxlPD0wKXJldHVybiBuO2lmKHQmJjA9PT1PYmplY3Qua2V5cyhuKS5sZW5ndGgpcmV0dXJuIHQ7Y29uc3Qgcj17Li4udH07Zm9yKGNvbnN0IHQgaW4gbilPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobix0KSYmKHJbdF09WihyW3RdLG5bdF0sZS0xKSk7cmV0dXJuIHJ9ZnVuY3Rpb24gcSgpe3JldHVybiBHKCl9ZnVuY3Rpb24gVigpe3JldHVybiBHKCkuc3Vic3RyaW5nKDE2KX1mdW5jdGlvbiBRKHQpe2lmKHQpe2lmKCJvYmplY3QiPT10eXBlb2YgdCYmImRlcmVmImluIHQmJiJmdW5jdGlvbiI9PXR5cGVvZiB0LmRlcmVmKXRyeXtyZXR1cm4gdC5kZXJlZigpfWNhdGNoe3JldHVybn1yZXR1cm4gdH19Y29uc3QgWD0iX3NlbnRyeVNwYW4iO2Z1bmN0aW9uIHR0KHQsbil7bj9mdW5jdGlvbih0LG4sZSl7dHJ5e09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LG4se3ZhbHVlOmUsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9Y2F0Y2h7aCYmdy5sb2coYEZhaWxlZCB0byBhZGQgbm9uLWVudW1lcmFibGUgcHJvcGVydHkgIiR7U3RyaW5nKG4pfSIgdG8gb2JqZWN0YCx0KX19KHQsWCxmdW5jdGlvbih0KXt0cnl7Y29uc3Qgbj1wLldlYWtSZWY7aWYoImZ1bmN0aW9uIj09dHlwZW9mIG4pcmV0dXJuIG5ldyBuKHQpfWNhdGNoe31yZXR1cm4gdH0obikpOmRlbGV0ZSB0W1hdfWZ1bmN0aW9uIG50KHQpe3JldHVybiBRKHRbWF0pfWNsYXNzIGV0e2NvbnN0cnVjdG9yKCl7dGhpcy50PSExLHRoaXMubz1bXSx0aGlzLmk9W10sdGhpcy51PVtdLHRoaXMuaD1bXSx0aGlzLnA9e30sdGhpcy5sPXt9LHRoaXMubT17fSx0aGlzLnY9e30sdGhpcy5fPXt9LHRoaXMuUz17fSx0aGlzLk49e3RyYWNlSWQ6cSgpLHNhbXBsZVJhbmQ6aygpfX1jbG9uZSgpe2NvbnN0IHQ9bmV3IGV0O3JldHVybiB0LnU9Wy4uLnRoaXMudV0sdC5sPXsuLi50aGlzLmx9LHQubT17Li4udGhpcy5tfSx0LnY9ey4uLnRoaXMudn0sdC5fPXsuLi50aGlzLl99LHRoaXMuXy5mbGFncyYmKHQuXy5mbGFncz17dmFsdWVzOlsuLi50aGlzLl8uZmxhZ3MudmFsdWVzXX0pLHQucD10aGlzLnAsdC5DPXRoaXMuQyx0Lmo9dGhpcy5qLHQuUj10aGlzLlIsdC5BPXRoaXMuQSx0Lmk9Wy4uLnRoaXMuaV0sdC5oPVsuLi50aGlzLmhdLHQuUz17Li4udGhpcy5TfSx0Lk49ey4uLnRoaXMuTn0sdC5JPXRoaXMuSSx0Lk89dGhpcy5PLHQuVD10aGlzLlQsdHQodCxudCh0aGlzKSksdH1zZXRDbGllbnQodCl7dGhpcy5JPXR9c2V0TGFzdEV2ZW50SWQodCl7dGhpcy5PPXR9Z2V0Q2xpZW50KCl7cmV0dXJuIHRoaXMuSX1sYXN0RXZlbnRJZCgpe3JldHVybiB0aGlzLk99YWRkU2NvcGVMaXN0ZW5lcih0KXt0aGlzLm8ucHVzaCh0KX1hZGRFdmVudFByb2Nlc3Nvcih0KXtyZXR1cm4gdGhpcy5pLnB1c2godCksdGhpc31zZXRVc2VyKHQpe3JldHVybiB0aGlzLnA9dHx8e2VtYWlsOnZvaWQgMCxpZDp2b2lkIDAsaXBfYWRkcmVzczp2b2lkIDAsdXNlcm5hbWU6dm9pZCAwfSx0aGlzLmomJksodGhpcy5qLHt1c2VyOnR9KSx0aGlzLmsoKSx0aGlzfWdldFVzZXIoKXtyZXR1cm4gdGhpcy5wfXNldENvbnZlcnNhdGlvbklkKHQpe3JldHVybiB0aGlzLlQ9dHx8dm9pZCAwLHRoaXMuaygpLHRoaXN9c2V0VGFncyh0KXtyZXR1cm4gdGhpcy5sPXsuLi50aGlzLmwsLi4udH0sdGhpcy5rKCksdGhpc31zZXRUYWcodCxuKXtyZXR1cm4gdGhpcy5zZXRUYWdzKHtbdF06bn0pfXNldEF0dHJpYnV0ZXModCl7cmV0dXJuIHRoaXMubT17Li4udGhpcy5tLC4uLnR9LHRoaXMuaygpLHRoaXN9c2V0QXR0cmlidXRlKHQsbil7cmV0dXJuIHRoaXMuc2V0QXR0cmlidXRlcyh7W3RdOm59KX1yZW1vdmVBdHRyaWJ1dGUodCl7cmV0dXJuIHQgaW4gdGhpcy5tJiYoZGVsZXRlIHRoaXMubVt0XSx0aGlzLmsoKSksdGhpc31zZXRFeHRyYXModCl7cmV0dXJuIHRoaXMudj17Li4udGhpcy52LC4uLnR9LHRoaXMuaygpLHRoaXN9c2V0RXh0cmEodCxuKXtyZXR1cm4gdGhpcy52PXsuLi50aGlzLnYsW3RdOm59LHRoaXMuaygpLHRoaXN9c2V0RmluZ2VycHJpbnQodCl7cmV0dXJuIHRoaXMuQT10LHRoaXMuaygpLHRoaXN9c2V0TGV2ZWwodCl7cmV0dXJuIHRoaXMuQz10LHRoaXMuaygpLHRoaXN9c2V0VHJhbnNhY3Rpb25OYW1lKHQpe3JldHVybiB0aGlzLlI9dCx0aGlzLmsoKSx0aGlzfXNldENvbnRleHQodCxuKXtyZXR1cm4gbnVsbD09PW4/ZGVsZXRlIHRoaXMuX1t0XTp0aGlzLl9bdF09bix0aGlzLmsoKSx0aGlzfXNldFNlc3Npb24odCl7cmV0dXJuIHQ/dGhpcy5qPXQ6ZGVsZXRlIHRoaXMuaix0aGlzLmsoKSx0aGlzfWdldFNlc3Npb24oKXtyZXR1cm4gdGhpcy5qfXVwZGF0ZSh0KXtpZighdClyZXR1cm4gdGhpcztjb25zdCBuPSJmdW5jdGlvbiI9PXR5cGVvZiB0P3QodGhpcyk6dCxlPW4gaW5zdGFuY2VvZiBldD9uLmdldFNjb3BlRGF0YSgpOkMobiwiT2JqZWN0Iik/dDp2b2lkIDA7Y29uc3R7dGFnczpyLGF0dHJpYnV0ZXM6byxleHRyYTppLHVzZXI6cyxjb250ZXh0czpjLGxldmVsOnUsZmluZ2VycHJpbnQ6YT1bXSxwcm9wYWdhdGlvbkNvbnRleHQ6Zixjb252ZXJzYXRpb25JZDpofT1lfHx7fTtyZXR1cm4gdGhpcy5sPXsuLi50aGlzLmwsLi4ucn0sdGhpcy5tPXsuLi50aGlzLm0sLi4ub30sdGhpcy52PXsuLi50aGlzLnYsLi4uaX0sdGhpcy5fPXsuLi50aGlzLl8sLi4uY30scyYmT2JqZWN0LmtleXMocykubGVuZ3RoJiYodGhpcy5wPXMpLHUmJih0aGlzLkM9dSksYS5sZW5ndGgmJih0aGlzLkE9YSksZiYmKHRoaXMuTj1mKSxoJiYodGhpcy5UPWgpLHRoaXN9Y2xlYXIoKXtyZXR1cm4gdGhpcy51PVtdLHRoaXMubD17fSx0aGlzLm09e30sdGhpcy52PXt9LHRoaXMucD17fSx0aGlzLl89e30sdGhpcy5DPXZvaWQgMCx0aGlzLlI9dm9pZCAwLHRoaXMuQT12b2lkIDAsdGhpcy5qPXZvaWQgMCx0aGlzLlQ9dm9pZCAwLHR0KHRoaXMsdm9pZCAwKSx0aGlzLmg9W10sdGhpcy5zZXRQcm9wYWdhdGlvbkNvbnRleHQoe3RyYWNlSWQ6cSgpLHNhbXBsZVJhbmQ6aygpfSksdGhpcy5rKCksdGhpc31hZGRCcmVhZGNydW1iKHQsbil7Y29uc3QgZT0ibnVtYmVyIj09dHlwZW9mIG4/bjoxMDA7aWYoZTw9MClyZXR1cm4gdGhpcztjb25zdCByPXt0aW1lc3RhbXA6SigpLC4uLnQsbWVzc2FnZTp0Lm1lc3NhZ2U/eih0Lm1lc3NhZ2UsMjA0OCk6dC5tZXNzYWdlfTtyZXR1cm4gdGhpcy51LnB1c2gociksdGhpcy51Lmxlbmd0aD5lJiYodGhpcy51PXRoaXMudS5zbGljZSgtZSksdGhpcy5JPy5yZWNvcmREcm9wcGVkRXZlbnQoImJ1ZmZlcl9vdmVyZmxvdyIsImxvZ19pdGVtIikpLHRoaXMuaygpLHRoaXN9Z2V0TGFzdEJyZWFkY3J1bWIoKXtyZXR1cm4gdGhpcy51W3RoaXMudS5sZW5ndGgtMV19Y2xlYXJCcmVhZGNydW1icygpe3JldHVybiB0aGlzLnU9W10sdGhpcy5rKCksdGhpc31hZGRBdHRhY2htZW50KHQpe3JldHVybiB0aGlzLmgucHVzaCh0KSx0aGlzfWNsZWFyQXR0YWNobWVudHMoKXtyZXR1cm4gdGhpcy5oPVtdLHRoaXN9Z2V0U2NvcGVEYXRhKCl7cmV0dXJue2JyZWFkY3J1bWJzOnRoaXMudSxhdHRhY2htZW50czp0aGlzLmgsY29udGV4dHM6dGhpcy5fLHRhZ3M6dGhpcy5sLGF0dHJpYnV0ZXM6dGhpcy5tLGV4dHJhOnRoaXMudix1c2VyOnRoaXMucCxsZXZlbDp0aGlzLkMsZmluZ2VycHJpbnQ6dGhpcy5BfHxbXSxldmVudFByb2Nlc3NvcnM6dGhpcy5pLHByb3BhZ2F0aW9uQ29udGV4dDp0aGlzLk4sc2RrUHJvY2Vzc2luZ01ldGFkYXRhOnRoaXMuUyx0cmFuc2FjdGlvbk5hbWU6dGhpcy5SLHNwYW46bnQodGhpcyksY29udmVyc2F0aW9uSWQ6dGhpcy5UfX1zZXRTREtQcm9jZXNzaW5nTWV0YWRhdGEodCl7cmV0dXJuIHRoaXMuUz1aKHRoaXMuUyx0LDIpLHRoaXN9c2V0UHJvcGFnYXRpb25Db250ZXh0KHQpe3JldHVybiB0aGlzLk49dCx0aGlzfWdldFByb3BhZ2F0aW9uQ29udGV4dCgpe3JldHVybiB0aGlzLk59Y2FwdHVyZUV4Y2VwdGlvbih0LG4pe2NvbnN0IGU9bj8uZXZlbnRfaWR8fEcoKTtpZighdGhpcy5JKXJldHVybiBoJiZ3Lndhcm4oIk5vIGNsaWVudCBjb25maWd1cmVkIG9uIHNjb3BlIC0gd2lsbCBub3QgY2FwdHVyZSBleGNlcHRpb24hIiksZTtjb25zdCByPW5ldyBFcnJvcigiU2VudHJ5IHN5bnRoZXRpY0V4Y2VwdGlvbiIpO3JldHVybiB0aGlzLkkuY2FwdHVyZUV4Y2VwdGlvbih0LHtvcmlnaW5hbEV4Y2VwdGlvbjp0LHN5bnRoZXRpY0V4Y2VwdGlvbjpyLC4uLm4sZXZlbnRfaWQ6ZX0sdGhpcyksZX1jYXB0dXJlTWVzc2FnZSh0LG4sZSl7Y29uc3Qgcj1lPy5ldmVudF9pZHx8RygpO2lmKCF0aGlzLkkpcmV0dXJuIGgmJncud2FybigiTm8gY2xpZW50IGNvbmZpZ3VyZWQgb24gc2NvcGUgLSB3aWxsIG5vdCBjYXB0dXJlIG1lc3NhZ2UhIikscjtjb25zdCBvPWU/LnN5bnRoZXRpY0V4Y2VwdGlvbj8/bmV3IEVycm9yKHQpO3JldHVybiB0aGlzLkkuY2FwdHVyZU1lc3NhZ2UodCxuLHtvcmlnaW5hbEV4Y2VwdGlvbjp0LHN5bnRoZXRpY0V4Y2VwdGlvbjpvLC4uLmUsZXZlbnRfaWQ6cn0sdGhpcykscn1jYXB0dXJlRXZlbnQodCxuKXtjb25zdCBlPXQuZXZlbnRfaWR8fG4/LmV2ZW50X2lkfHxHKCk7cmV0dXJuIHRoaXMuST8odGhpcy5JLmNhcHR1cmVFdmVudCh0LHsuLi5uLGV2ZW50X2lkOmV9LHRoaXMpLGUpOihoJiZ3Lndhcm4oIk5vIGNsaWVudCBjb25maWd1cmVkIG9uIHNjb3BlIC0gd2lsbCBub3QgY2FwdHVyZSBldmVudCEiKSxlKX1rKCl7dGhpcy50fHwodGhpcy50PSEwLHRoaXMuby5mb3JFYWNoKHQ9Pnt0KHRoaXMpfSksdGhpcy50PSExKX19Y29uc3QgcnQ9dD0+dCBpbnN0YW5jZW9mIFByb21pc2UmJiF0W290XSxvdD1TeW1ib2woImNoYWluZWQgUHJvbWlzZUxpa2UiKSxpdD0odCxuKT0+e2lmKCFuKXJldHVybiB0O2xldCBlPSExO2Zvcihjb25zdCByIGluIHQpe2lmKHIgaW4gbiljb250aW51ZTtlPSEwO2NvbnN0IG89dFtyXTsiZnVuY3Rpb24iPT10eXBlb2Ygbz9PYmplY3QuZGVmaW5lUHJvcGVydHkobixyLHt2YWx1ZTooLi4ubik9Pm8uYXBwbHkodCxuKSxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOm5bcl09b31yZXR1cm4gZSYmT2JqZWN0LmFzc2lnbihuLHtbb3RdOiEwfSksbn07Y2xhc3Mgc3R7Y29uc3RydWN0b3IodCxuKXtsZXQgZSxyO2U9dHx8bmV3IGV0LHI9bnx8bmV3IGV0LHRoaXMuUD1be3Njb3BlOmV9XSx0aGlzLkQ9cn13aXRoU2NvcGUodCl7Y29uc3Qgbj10aGlzLlUoKTtsZXQgZTt0cnl7ZT10KG4pfWNhdGNoKHQpe3Rocm93IHRoaXMuQigpLHR9cmV0dXJuIGooZSk/KCh0LG4sZSk9Pntjb25zdCByPXQudGhlbih0PT4obih0KSx0KSx0PT57dGhyb3cgZSh0KSx0fSk7cmV0dXJuIHJ0KHIpJiZydCh0KT9yOml0KHQscil9KShlLCgpPT50aGlzLkIoKSwoKT0+dGhpcy5CKCkpOih0aGlzLkIoKSxlKX1nZXRDbGllbnQoKXtyZXR1cm4gdGhpcy5nZXRTdGFja1RvcCgpLmNsaWVudH1nZXRTY29wZSgpe3JldHVybiB0aGlzLmdldFN0YWNrVG9wKCkuc2NvcGV9Z2V0SXNvbGF0aW9uU2NvcGUoKXtyZXR1cm4gdGhpcy5EfWdldFN0YWNrVG9wKCl7cmV0dXJuIHRoaXMuUFt0aGlzLlAubGVuZ3RoLTFdfVUoKXtjb25zdCB0PXRoaXMuZ2V0U2NvcGUoKS5jbG9uZSgpO3JldHVybiB0aGlzLlAucHVzaCh7Y2xpZW50OnRoaXMuZ2V0Q2xpZW50KCksc2NvcGU6dH0pLHR9Qigpe3JldHVybiEodGhpcy5QLmxlbmd0aDw9MSkmJiEhdGhpcy5QLnBvcCgpfX1mdW5jdGlvbiBjdCgpe2NvbnN0IHQ9ZyhsKCkpO3JldHVybiB0LnN0YWNrPXQuc3RhY2t8fG5ldyBzdChtKCJkZWZhdWx0Q3VycmVudFNjb3BlIiwoKT0+bmV3IGV0KSxtKCJkZWZhdWx0SXNvbGF0aW9uU2NvcGUiLCgpPT5uZXcgZXQpKX1mdW5jdGlvbiB1dCh0KXtyZXR1cm4gY3QoKS53aXRoU2NvcGUodCl9ZnVuY3Rpb24gYXQodCxuKXtjb25zdCBlPWN0KCk7cmV0dXJuIGUud2l0aFNjb3BlKCgpPT4oZS5nZXRTdGFja1RvcCgpLnNjb3BlPXQsbih0KSkpfWZ1bmN0aW9uIGZ0KHQpe3JldHVybiBjdCgpLndpdGhTY29wZSgoKT0+dChjdCgpLmdldElzb2xhdGlvblNjb3BlKCkpKX1mdW5jdGlvbiBodCh0KXtjb25zdCBuPWcodCk7cmV0dXJuIG4uYWNzP24uYWNzOnt3aXRoSXNvbGF0aW9uU2NvcGU6ZnQsd2l0aFNjb3BlOnV0LHdpdGhTZXRTY29wZTphdCx3aXRoU2V0SXNvbGF0aW9uU2NvcGU6KHQsbik9PmZ0KG4pLGdldEN1cnJlbnRTY29wZTooKT0+Y3QoKS5nZXRTY29wZSgpLGdldElzb2xhdGlvblNjb3BlOigpPT5jdCgpLmdldElzb2xhdGlvblNjb3BlKCl9fWZ1bmN0aW9uIHB0KCl7cmV0dXJuIGh0KGwoKSkuZ2V0Q3VycmVudFNjb3BlKCkuZ2V0Q2xpZW50KCl9ZnVuY3Rpb24gZHQodCl7Y29uc3Qgbj10O3JldHVybntzY29wZTpuLl9zZW50cnlTY29wZSxpc29sYXRpb25TY29wZTpRKG4uX3NlbnRyeUlzb2xhdGlvblNjb3BlKX19Y29uc3QgbHQ9InNlbnRyeS0iO2Z1bmN0aW9uIGd0KHQpe2NvbnN0IG49ZnVuY3Rpb24odCl7aWYoIXR8fChuPXQsIUMobiwiU3RyaW5nIikmJiFBcnJheS5pc0FycmF5KHQpKSlyZXR1cm47dmFyIG47aWYoQXJyYXkuaXNBcnJheSh0KSlyZXR1cm4gdC5yZWR1Y2UoKHQsbik9Pntjb25zdCBlPW10KG4pO3JldHVybiBPYmplY3QuZW50cmllcyhlKS5mb3JFYWNoKChbbixlXSk9Pnt0W25dPWV9KSx0fSx7fSk7cmV0dXJuIG10KHQpfSh0KTtpZighbilyZXR1cm47Y29uc3QgZT1PYmplY3QuZW50cmllcyhuKS5yZWR1Y2UoKHQsW24sZV0pPT57aWYobi5zdGFydHNXaXRoKGx0KSl7dFtuLnNsaWNlKDcpXT1lfXJldHVybiB0fSx7fSk7cmV0dXJuIE9iamVjdC5rZXlzKGUpLmxlbmd0aD4wP2U6dm9pZCAwfWZ1bmN0aW9uIG10KHQpe3JldHVybiB0LnNwbGl0KCIsIikubWFwKHQ9Pntjb25zdCBuPXQuaW5kZXhPZigiPSIpO2lmKC0xPT09bilyZXR1cm5bXTtyZXR1cm5bdC5zbGljZSgwLG4pLHQuc2xpY2UobisxKV0ubWFwKHQ9Pnt0cnl7cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCh0LnRyaW0oKSl9Y2F0Y2h7cmV0dXJufX0pfSkucmVkdWNlKCh0LFtuLGVdKT0+KG4mJmUmJih0W25dPWUpLHQpLHt9KX1jb25zdCB5dD0vXm8oXGQrKVwuLztmdW5jdGlvbiBidCh0LG49ITEpe2NvbnN0e2hvc3Q6ZSxwYXRoOnIscGFzczpvLHBvcnQ6aSxwcm9qZWN0SWQ6cyxwcm90b2NvbDpjLHB1YmxpY0tleTp1fT10O3JldHVybmAke2N9Oi8vJHt1fSR7biYmbz9gOiR7b31gOiIifUAke2V9JHtpP2A6JHtpfWA6IiJ9LyR7cj9gJHtyfS9gOnJ9JHtzfWB9ZnVuY3Rpb24gdnQodCl7Y29uc3Qgbj10LmdldE9wdGlvbnMoKSx7aG9zdDplfT10LmdldERzbigpfHx7fTtsZXQgcjtyZXR1cm4gbi5vcmdJZD9yPVN0cmluZyhuLm9yZ0lkKTplJiYocj1mdW5jdGlvbih0KXtjb25zdCBuPXQubWF0Y2goeXQpO3JldHVybiBuPy5bMV19KGUpKSxyfWZ1bmN0aW9uIF90KHQpe2NvbnN0e3NwYW5JZDpuLHRyYWNlSWQ6ZSxpc1JlbW90ZTpyfT10LnNwYW5Db250ZXh0KCksbz1yP246RXQodCkucGFyZW50X3NwYW5faWQsaT1kdCh0KS5zY29wZTtyZXR1cm57cGFyZW50X3NwYW5faWQ6byxzcGFuX2lkOnI/aT8uZ2V0UHJvcGFnYXRpb25Db250ZXh0KCkucHJvcGFnYXRpb25TcGFuSWR8fFYoKTpuLHRyYWNlX2lkOmV9fWZ1bmN0aW9uIFN0KHQpe3JldHVybiB0JiZ0Lmxlbmd0aD4wP3QubWFwKCh7Y29udGV4dDp7c3BhbklkOnQsdHJhY2VJZDpuLHRyYWNlRmxhZ3M6ZSwuLi5yfSxhdHRyaWJ1dGVzOm99KT0+KHtzcGFuX2lkOnQsdHJhY2VfaWQ6bixzYW1wbGVkOjE9PT1lLGF0dHJpYnV0ZXM6bywuLi5yfSkpOnZvaWQgMH1mdW5jdGlvbiB3dCh0KXtyZXR1cm4ibnVtYmVyIj09dHlwZW9mIHQ/JHQodCk6QXJyYXkuaXNBcnJheSh0KT90WzBdK3RbMV0vMWU5OnQgaW5zdGFuY2VvZiBEYXRlPyR0KHQuZ2V0VGltZSgpKTpZKCl9ZnVuY3Rpb24gJHQodCl7cmV0dXJuIHQ+OTk5OTk5OTk5OT90LzFlMzp0fWZ1bmN0aW9uIEV0KHQpe2lmKGZ1bmN0aW9uKHQpe3JldHVybiJmdW5jdGlvbiI9PXR5cGVvZiB0LmdldFNwYW5KU09OfSh0KSlyZXR1cm4gdC5nZXRTcGFuSlNPTigpO2NvbnN0e3NwYW5JZDpuLHRyYWNlSWQ6ZX09dC5zcGFuQ29udGV4dCgpO2lmKGZ1bmN0aW9uKHQpe2NvbnN0IG49dDtyZXR1cm4hIShuLmF0dHJpYnV0ZXMmJm4uc3RhcnRUaW1lJiZuLm5hbWUmJm4uZW5kVGltZSYmbi5zdGF0dXMpfSh0KSl7Y29uc3R7YXR0cmlidXRlczpyLHN0YXJ0VGltZTpvLG5hbWU6aSxlbmRUaW1lOnMsc3RhdHVzOmMsbGlua3M6dX09dDtyZXR1cm57c3Bhbl9pZDpuLHRyYWNlX2lkOmUsZGF0YTpyLGRlc2NyaXB0aW9uOmkscGFyZW50X3NwYW5faWQ6eHQodCksc3RhcnRfdGltZXN0YW1wOnd0KG8pLHRpbWVzdGFtcDp3dChzKXx8dm9pZCAwLHN0YXR1czpOdChjKSxvcDpyWyJzZW50cnkub3AiXSxvcmlnaW46clsic2VudHJ5Lm9yaWdpbiJdLGxpbmtzOlN0KHUpfX1yZXR1cm57c3Bhbl9pZDpuLHRyYWNlX2lkOmUsc3RhcnRfdGltZXN0YW1wOjAsZGF0YTp7fX19ZnVuY3Rpb24geHQodCl7cmV0dXJuInBhcmVudFNwYW5JZCJpbiB0P3QucGFyZW50U3BhbklkOiJwYXJlbnRTcGFuQ29udGV4dCJpbiB0P3QucGFyZW50U3BhbkNvbnRleHQ/LnNwYW5JZDp2b2lkIDB9ZnVuY3Rpb24gTnQodCl7aWYodCYmMCE9PXQuY29kZSlyZXR1cm4gMT09PXQuY29kZT8ib2siOnQubWVzc2FnZXx8ImludGVybmFsX2Vycm9yIn1jb25zdCBDdD1mdW5jdGlvbih0KXtyZXR1cm4gdC5fc2VudHJ5Um9vdFNwYW58fHR9O2Z1bmN0aW9uIGp0KHQpe2lmKCJib29sZWFuIj09dHlwZW9mIF9fU0VOVFJZX1RSQUNJTkdfXyYmIV9fU0VOVFJZX1RSQUNJTkdfXylyZXR1cm4hMTtjb25zdCBuPXR8fHB0KCk/LmdldE9wdGlvbnMoKTtyZXR1cm4hKCFufHxudWxsPT1uLnRyYWNlc1NhbXBsZVJhdGUmJiFuLnRyYWNlc1NhbXBsZXIpfWNvbnN0IFJ0PVN5bWJvbC5mb3IoInNlbnRyeS5ub25SZWNvcmRpbmdTcGFuIik7ZnVuY3Rpb24gQXQodCxuKXtjb25zdCBlPW4uZ2V0T3B0aW9ucygpLHtwdWJsaWNLZXk6cn09bi5nZXREc24oKXx8e30sbz17ZW52aXJvbm1lbnQ6ZS5lbnZpcm9ubWVudHx8InByb2R1Y3Rpb24iLHJlbGVhc2U6ZS5yZWxlYXNlLHB1YmxpY19rZXk6cix0cmFjZV9pZDp0LG9yZ19pZDp2dChuKX07cmV0dXJuIG4uZW1pdCgiY3JlYXRlRHNjIixvKSxvfWZ1bmN0aW9uIEl0KHQsbil7Y29uc3QgZT1uLmdldFByb3BhZ2F0aW9uQ29udGV4dCgpO3JldHVybiBlLmRzY3x8QXQoZS50cmFjZUlkLHQpfWZ1bmN0aW9uIE90KHQpe2NvbnN0IG49cHQoKTtpZighbilyZXR1cm57fTtjb25zdCBlPUN0KHQpLHI9RXQoZSksbz1yLmRhdGEsaT1lLnNwYW5Db250ZXh0KCkudHJhY2VTdGF0ZSxzPWk/LmdldCgic2VudHJ5LnNhbXBsZV9yYXRlIik/P29bInNlbnRyeS5zYW1wbGVfcmF0ZSJdPz9vWyJzZW50cnkucHJldmlvdXNfdHJhY2Vfc2FtcGxlX3JhdGUiXTtmdW5jdGlvbiBjKHQpe3JldHVybiJudW1iZXIiIT10eXBlb2YgcyYmInN0cmluZyIhPXR5cGVvZiBzfHwodC5zYW1wbGVfcmF0ZT1gJHtzfWApLHR9Y29uc3QgdT1lLl9mcm96ZW5Ec2M7aWYodSlyZXR1cm4gYyh1KTtjb25zdCBhPWZ1bmN0aW9uKHQpe3JldHVybiEhdCYmITA9PT10W1J0XX0oZSksZj1hJiYiaWdub3JlZCI9PT1lLmRyb3BSZWFzb247aWYoYSYmKCFqdChuLmdldE9wdGlvbnMoKSl8fGYpKXtjb25zdCB0PWR0KGUpLnNjb3BlO2lmKHQpe2NvbnN0IGU9ey4uLkl0KG4sdCl9O3JldHVybiBmJiYoZS5zYW1wbGVkPSJmYWxzZSIpLGMoZSl9fWNvbnN0IGg9aT8uZ2V0KCJzZW50cnkuZHNjIikscD1oJiZndChoKTtpZihwKXJldHVybiBjKHApO2NvbnN0IGQ9QXQodC5zcGFuQ29udGV4dCgpLnRyYWNlSWQsbiksbD1vWyJzZW50cnkuc291cmNlIl0/P29bInNlbnRyeS5zZWdtZW50Lm5hbWUuc291cmNlIl0sZz1yLmRlc2NyaXB0aW9uO3JldHVybiJ1cmwiIT09bCYmZyYmKGQudHJhbnNhY3Rpb249ZyksanQoKSYmKGQuc2FtcGxlZD1TdHJpbmcoZnVuY3Rpb24odCl7Y29uc3R7dHJhY2VGbGFnczpufT10LnNwYW5Db250ZXh0KCk7cmV0dXJuIDE9PT1ufShlKSksZC5zYW1wbGVfcmFuZD1pPy5nZXQoInNlbnRyeS5zYW1wbGVfcmFuZCIpPz9kdChlKS5zY29wZT8uZ2V0UHJvcGFnYXRpb25Db250ZXh0KCkuc2FtcGxlUmFuZC50b1N0cmluZygpKSxjKGQpLG4uZW1pdCgiY3JlYXRlRHNjIixkLGUpLGR9ZnVuY3Rpb24gVHQodCxuPVtdKXtyZXR1cm5bdCxuXX1mdW5jdGlvbiBrdCh0LG4pe2NvbnN0IGU9dFsxXTtmb3IoY29uc3QgdCBvZiBlKXtpZihuKHQsdFswXS50eXBlKSlyZXR1cm4hMH1yZXR1cm4hMX1mdW5jdGlvbiBQdCh0KXtjb25zdCBuPWcocCk7cmV0dXJuIG4uZW5jb2RlUG9seWZpbGw/bi5lbmNvZGVQb2x5ZmlsbCh0KToobmV3IFRleHRFbmNvZGVyKS5lbmNvZGUodCl9ZnVuY3Rpb24gRHQodCl7Y29uc3RbbixlXT10O2xldCByPUpTT04uc3RyaW5naWZ5KG4pO2Z1bmN0aW9uIG8odCl7InN0cmluZyI9PXR5cGVvZiByP3I9InN0cmluZyI9PXR5cGVvZiB0P3IrdDpbUHQociksdF06ci5wdXNoKCJzdHJpbmciPT10eXBlb2YgdD9QdCh0KTp0KX1mb3IoY29uc3QgdCBvZiBlKXtjb25zdFtuLGVdPXQ7aWYobyhgXG4ke0pTT04uc3RyaW5naWZ5KG4pfVxuYCksInN0cmluZyI9PXR5cGVvZiBlfHxlIGluc3RhbmNlb2YgVWludDhBcnJheSlvKGUpO2Vsc2V7bGV0IHQ7dHJ5e3Q9SlNPTi5zdHJpbmdpZnkoZSl9Y2F0Y2h7dD1KU09OLnN0cmluZ2lmeShCKGUpKX1vKHQpfX1yZXR1cm4ic3RyaW5nIj09dHlwZW9mIHI/cjpmdW5jdGlvbih0KXtjb25zdCBuPXQucmVkdWNlKCh0LG4pPT50K24ubGVuZ3RoLDApLGU9bmV3IFVpbnQ4QXJyYXkobik7bGV0IHI9MDtmb3IoY29uc3QgbiBvZiB0KWUuc2V0KG4scikscis9bi5sZW5ndGg7cmV0dXJuIGV9KHIpfWNvbnN0IFV0PXtzZXNzaW9uczoic2Vzc2lvbiIsZXZlbnQ6ImVycm9yIixjbGllbnRfcmVwb3J0OiJpbnRlcm5hbCIsdXNlcl9yZXBvcnQ6ImRlZmF1bHQiLHByb2ZpbGVfY2h1bms6InByb2ZpbGUiLHJlcGxheV9ldmVudDoicmVwbGF5IixyZXBsYXlfcmVjb3JkaW5nOiJyZXBsYXkiLGNoZWNrX2luOiJtb25pdG9yIixyYXdfc2VjdXJpdHk6InNlY3VyaXR5Iixsb2c6ImxvZ19pdGVtIix0cmFjZV9tZXRyaWM6Im1ldHJpYyJ9O2Z1bmN0aW9uIEJ0KHQpe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gdCBpbiBVdH0odCk/VXRbdF06dH1mdW5jdGlvbiBMdCh0KXtpZighdD8uc2RrKXJldHVybjtjb25zdHtuYW1lOm4sdmVyc2lvbjplfT10LnNkaztyZXR1cm57bmFtZTpuLHZlcnNpb246ZX19ZnVuY3Rpb24gTXQodCxuLGUscil7Y29uc3Qgbz1MdChlKSxpPXQudHlwZSYmInJlcGxheV9ldmVudCIhPT10LnR5cGU/dC50eXBlOiJldmVudCI7IWZ1bmN0aW9uKHQsbil7aWYoIW4pcmV0dXJuIHQ7Y29uc3QgZT10LnNka3x8e307dC5zZGs9ey4uLmUsbmFtZTplLm5hbWV8fG4ubmFtZSx2ZXJzaW9uOmUudmVyc2lvbnx8bi52ZXJzaW9uLGludGVncmF0aW9uczpbLi4udC5zZGs/LmludGVncmF0aW9uc3x8W10sLi4ubi5pbnRlZ3JhdGlvbnN8fFtdXSxwYWNrYWdlczpbLi4udC5zZGs/LnBhY2thZ2VzfHxbXSwuLi5uLnBhY2thZ2VzfHxbXV0sc2V0dGluZ3M6dC5zZGs/LnNldHRpbmdzfHxuLnNldHRpbmdzP3suLi50LnNkaz8uc2V0dGluZ3MsLi4ubi5zZXR0aW5nc306dm9pZCAwfX0odCxlPy5zZGspO2NvbnN0IHM9ZnVuY3Rpb24odCxuLGUscil7Y29uc3Qgbz10LnNka1Byb2Nlc3NpbmdNZXRhZGF0YT8uZHluYW1pY1NhbXBsaW5nQ29udGV4dDtyZXR1cm57ZXZlbnRfaWQ6dC5ldmVudF9pZCxzZW50X2F0Om5ldyBEYXRlKFAoKSkudG9JU09TdHJpbmcoKSwuLi5uJiZ7c2RrOm59LC4uLiEhZSYmciYme2RzbjpidChyKX0sLi4ubyYme3RyYWNlOm99fX0odCxvLHIsbik7ZGVsZXRlIHQuc2RrUHJvY2Vzc2luZ01ldGFkYXRhO3JldHVybiBUdChzLFtbe3R5cGU6aX0sdF1dKX1jb25zdCB6dD0iX19TRU5UUllfU1VQUFJFU1NfVFJBQ0lOR19fIjtmdW5jdGlvbiBGdCh0KXtjb25zdCBuPWh0KGwoKSk7cmV0dXJuIG4uc3VwcHJlc3NUcmFjaW5nP24uc3VwcHJlc3NUcmFjaW5nKHQpOmZ1bmN0aW9uKC4uLnQpe2NvbnN0IG49aHQobCgpKTtpZigyPT09dC5sZW5ndGgpe2NvbnN0W2Uscl09dDtyZXR1cm4gZT9uLndpdGhTZXRTY29wZShlLHIpOm4ud2l0aFNjb3BlKHIpfXJldHVybiBuLndpdGhTY29wZSh0WzBdKX0obj0+e24uc2V0U0RLUHJvY2Vzc2luZ01ldGFkYXRhKHtbenRdOiEwfSk7Y29uc3QgZT10KCk7cmV0dXJuIG4uc2V0U0RLUHJvY2Vzc2luZ01ldGFkYXRhKHtbenRdOnZvaWQgMH0pLGV9KX1mdW5jdGlvbiBHdCh0LG4pe2NvbnN0e2ZpbmdlcnByaW50OmUsc3BhbjpyLGJyZWFkY3J1bWJzOm8sc2RrUHJvY2Vzc2luZ01ldGFkYXRhOml9PW47IWZ1bmN0aW9uKHQsbil7Y29uc3R7ZXh0cmE6ZSx0YWdzOnIsdXNlcjpvLGNvbnRleHRzOmksbGV2ZWw6cyx0cmFuc2FjdGlvbk5hbWU6Y309bjtPYmplY3Qua2V5cyhlKS5sZW5ndGgmJih0LmV4dHJhPXsuLi5lLC4uLnQuZXh0cmF9KTtPYmplY3Qua2V5cyhyKS5sZW5ndGgmJih0LnRhZ3M9ey4uLnIsLi4udC50YWdzfSk7T2JqZWN0LmtleXMobykubGVuZ3RoJiYodC51c2VyPXsuLi5vLC4uLnQudXNlcn0pO09iamVjdC5rZXlzKGkpLmxlbmd0aCYmKHQuY29udGV4dHM9ey4uLmksLi4udC5jb250ZXh0c30pO3MmJih0LmxldmVsPXMpO2MmJiJ0cmFuc2FjdGlvbiIhPT10LnR5cGUmJih0LnRyYW5zYWN0aW9uPWMpfSh0LG4pLHImJmZ1bmN0aW9uKHQsbil7dC5jb250ZXh0cz17dHJhY2U6X3QobiksLi4udC5jb250ZXh0c30sdC5zZGtQcm9jZXNzaW5nTWV0YWRhdGE9e2R5bmFtaWNTYW1wbGluZ0NvbnRleHQ6T3QobiksLi4udC5zZGtQcm9jZXNzaW5nTWV0YWRhdGF9O2NvbnN0IGU9Q3Qobikscj1FdChlKS5kZXNjcmlwdGlvbjtyJiYhdC50cmFuc2FjdGlvbiYmInRyYW5zYWN0aW9uIj09PXQudHlwZSYmKHQudHJhbnNhY3Rpb249cil9KHQsciksZnVuY3Rpb24odCxuKXt0LmZpbmdlcnByaW50PXQuZmluZ2VycHJpbnQ/QXJyYXkuaXNBcnJheSh0LmZpbmdlcnByaW50KT90LmZpbmdlcnByaW50Olt0LmZpbmdlcnByaW50XTpbXSxuJiYodC5maW5nZXJwcmludD10LmZpbmdlcnByaW50LmNvbmNhdChuKSk7dC5maW5nZXJwcmludC5sZW5ndGh8fGRlbGV0ZSB0LmZpbmdlcnByaW50fSh0LGUpLGZ1bmN0aW9uKHQsbil7Y29uc3QgZT1bLi4udC5icmVhZGNydW1ic3x8W10sLi4ubl07dC5icmVhZGNydW1icz1lLmxlbmd0aD9lOnZvaWQgMH0odCxvKSxmdW5jdGlvbih0LG4pe3Quc2RrUHJvY2Vzc2luZ01ldGFkYXRhPXsuLi50LnNka1Byb2Nlc3NpbmdNZXRhZGF0YSwuLi5ufX0odCxpKX1jbGFzcyBKdHtjb25zdHJ1Y3Rvcih0KXt0aGlzLkw9MCx0aGlzLk09W10sdGhpcy5GKHQpfXRoZW4odCxuKXtyZXR1cm4gbmV3IEp0KChlLHIpPT57dGhpcy5NLnB1c2goWyExLG49PntpZih0KXRyeXtlKHQobikpfWNhdGNoKHQpe3IodCl9ZWxzZSBlKG4pfSx0PT57aWYobil0cnl7ZShuKHQpKX1jYXRjaCh0KXtyKHQpfWVsc2Ugcih0KX1dKSx0aGlzLkcoKX0pfWNhdGNoKHQpe3JldHVybiB0aGlzLnRoZW4odD0+dCx0KX1maW5hbGx5KHQpe3JldHVybiBuZXcgSnQoKG4sZSk9PntsZXQgcixvO3JldHVybiB0aGlzLnRoZW4obj0+e289ITEscj1uLHQmJnQoKX0sbj0+e289ITAscj1uLHQmJnQoKX0pLnRoZW4oKCk9PntvP2Uocik6bihyKX0pfSl9Rygpe2lmKDA9PT10aGlzLkwpcmV0dXJuO2NvbnN0IHQ9dGhpcy5NLnNsaWNlKCk7dGhpcy5NPVtdLHQuZm9yRWFjaCh0PT57dFswXXx8KDE9PT10aGlzLkwmJnRbMV0odGhpcy5KKSwyPT09dGhpcy5MJiZ0WzJdKHRoaXMuSiksdFswXT0hMCl9KX1GKHQpe2NvbnN0IG49KHQsbik9PnswPT09dGhpcy5MJiYoaihuKT9uLnRoZW4oZSxyKToodGhpcy5MPXQsdGhpcy5KPW4sdGhpcy5HKCkpKX0sZT10PT57bigxLHQpfSxyPXQ9PntuKDIsdCl9O3RyeXt0KGUscil9Y2F0Y2godCl7cih0KX19fWNvbnN0IFd0PVN5bWJvbC5mb3IoIlNlbnRyeUJ1ZmZlckZ1bGxFcnJvciIpO2Z1bmN0aW9uIFl0KHQ9MTAwKXtjb25zdCBuPW5ldyBTZXQ7ZnVuY3Rpb24gZSh0KXtuLmRlbGV0ZSh0KX1yZXR1cm57Z2V0ICQoKXtyZXR1cm4gQXJyYXkuZnJvbShuKX0sYWRkOmZ1bmN0aW9uKHIpe2lmKCEobi5zaXplPHQpKXJldHVybiBvPVd0LG5ldyBKdCgodCxuKT0+e24obyl9KTt2YXIgbztjb25zdCBpPXIoKTtyZXR1cm4gbi5hZGQoaSksaS50aGVuKCgpPT5lKGkpLCgpPT5lKGkpKSxpfSxkcmFpbjpmdW5jdGlvbih0KXtpZighbi5zaXplKXJldHVybiBlPSEwLG5ldyBKdCh0PT57dChlKX0pO3ZhciBlO2NvbnN0IHI9UHJvbWlzZS5hbGxTZXR0bGVkKEFycmF5LmZyb20obikpLnRoZW4oKCk9PiEwKTtpZighdClyZXR1cm4gcjtjb25zdCBvPVtyLG5ldyBQcm9taXNlKG49PntyZXR1cm4ib2JqZWN0Ij09dHlwZW9mKGU9c2V0VGltZW91dCgoKT0+bighMSksdCkpJiYiZnVuY3Rpb24iPT10eXBlb2YgZS51bnJlZiYmZS51bnJlZigpLGU7dmFyIGV9KV07cmV0dXJuIFByb21pc2UucmFjZShvKX19fWZ1bmN0aW9uIEh0KHQse3N0YXR1c0NvZGU6bixoZWFkZXJzOmV9LHI9UCgpKXtjb25zdCBvPXsuLi50fSxpPWU/LlsieC1zZW50cnktcmF0ZS1saW1pdHMiXSxzPWU/LlsicmV0cnktYWZ0ZXIiXTtpZihpKWZvcihjb25zdCB0IG9mIGkudHJpbSgpLnNwbGl0KCIsIikpe2NvbnN0W24sZSwsLGldPXQuc3BsaXQoIjoiLDUpLHM9cGFyc2VJbnQobiwxMCksYz0xZTMqKGlzTmFOKHMpPzYwOnMpO2lmKGUpZm9yKGNvbnN0IHQgb2YgZS5zcGxpdCgiOyIpKSJtZXRyaWNfYnVja2V0Ij09PXQmJmkmJiFpLnNwbGl0KCI7IikuaW5jbHVkZXMoImN1c3RvbSIpfHwob1t0XT1yK2MpO2Vsc2Ugby5hbGw9citjfWVsc2Ugcz9vLmFsbD1yK2Z1bmN0aW9uKHQsbj1QKCkpe2NvbnN0IGU9cGFyc2VJbnQoYCR7dH1gLDEwKTtpZighaXNOYU4oZSkpcmV0dXJuIDFlMyplO2NvbnN0IHI9RGF0ZS5wYXJzZShgJHt0fWApO3JldHVybiBpc05hTihyKT82ZTQ6ci1ufShzLHIpOjQyOT09PW4mJihvLmFsbD1yKzZlNCk7cmV0dXJuIG99ZnVuY3Rpb24gS3QodCxuLGU9WXQodC5idWZmZXJTaXplfHw2NCkpe2xldCByPXt9O3JldHVybntzZW5kOmZ1bmN0aW9uKHQpe2NvbnN0IG89W107aWYoa3QodCwodCxuKT0+e2NvbnN0IGU9QnQobik7KGZ1bmN0aW9uKHQsbixlPVAoKSl7cmV0dXJuIGZ1bmN0aW9uKHQsbil7cmV0dXJuIHRbbl18fHQuYWxsfHwwfSh0LG4pPmV9KShyLGUpfHxvLnB1c2godCl9KSwwPT09by5sZW5ndGgpcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7fSk7Y29uc3QgaT1UdCh0WzBdLG8pLHM9dD0+eyFmdW5jdGlvbih0LG4pe3JldHVybiBrdCh0LCh0LGUpPT5uLmluY2x1ZGVzKGUpKX0oaSxbImNsaWVudF9yZXBvcnQiXSk/a3QoaSwodCxuKT0+e30pOmgmJncud2FybihgRHJvcHBpbmcgY2xpZW50IHJlcG9ydC4gV2lsbCBub3Qgc2VuZCBvdXRjb21lcyAocmVhc29uOiAke3R9KS5gKX07cmV0dXJuIGUuYWRkKCgpPT5uKHtib2R5OkR0KGkpfSkudGhlbih0PT40MTM9PT10LnN0YXR1c0NvZGU/KGgmJncuZXJyb3IoIlNlbnRyeSByZXNwb25kZWQgd2l0aCBzdGF0dXMgY29kZSA0MTMuIEVudmVsb3BlIHdhcyBkaXNjYXJkZWQgZHVlIHRvIGV4Y2VlZGluZyBzaXplIGxpbWl0cy4iKSxzKCJzZW5kX2Vycm9yIiksdCk6KGgmJnZvaWQgMCE9PXQuc3RhdHVzQ29kZSYmKHQuc3RhdHVzQ29kZTwyMDB8fHQuc3RhdHVzQ29kZT49MzAwKSYmdy53YXJuKGBTZW50cnkgcmVzcG9uZGVkIHdpdGggc3RhdHVzIGNvZGUgJHt0LnN0YXR1c0NvZGV9IHRvIHNlbnQgZXZlbnQuYCkscj1IdChyLHQpLHQpLHQ9Pnt0aHJvdyBzKCJuZXR3b3JrX2Vycm9yIiksaCYmdy5lcnJvcigiRW5jb3VudGVyZWQgZXJyb3IgcnVubmluZyB0cmFuc3BvcnQgcmVxdWVzdDoiLHQpLHR9KSkudGhlbih0PT50LHQ9PntpZih0PT09V3QpcmV0dXJuIGgmJncuZXJyb3IoIlNraXBwZWQgc2VuZGluZyBldmVudCBiZWNhdXNlIGJ1ZmZlciBpcyBmdWxsLiIpLHMoInF1ZXVlX292ZXJmbG93IiksUHJvbWlzZS5yZXNvbHZlKHt9KTt0aHJvdyB0fSl9LGZsdXNoOnQ9PmUuZHJhaW4odCl9fWNvbnN0IFp0PS9eKFxTKzpcXHxcLz8pKFtcc1xTXSo/KSgoPzpcLnsxLDJ9fFteL1xcXSs/fCkoXC5bXi4vXFxdKnwpKSg/OlsvXFxdKikkLztmdW5jdGlvbiBxdCh0KXtjb25zdCBuPWZ1bmN0aW9uKHQpe2NvbnN0IG49dC5sZW5ndGg+MTAyND9gPHRydW5jYXRlZD4ke3Quc2xpY2UoLTEwMjQpfWA6dCxlPVp0LmV4ZWMobik7cmV0dXJuIGU/ZS5zbGljZSgxKTpbXX0odCksZT1uWzBdfHwiIjtsZXQgcj1uWzFdO3JldHVybiBlfHxyPyhyJiYocj1yLnNsaWNlKDAsci5sZW5ndGgtMSkpLGUrcik6Ii4ifWZ1bmN0aW9uIFZ0KHQsbj0hMSl7cmV0dXJuIShufHx0JiYhdC5zdGFydHNXaXRoKCIvIikmJiF0Lm1hdGNoKC9eW0EtWl06LykmJiF0LnN0YXJ0c1dpdGgoIi4iKSYmIXQubWF0Y2goL15bYS16QS1aXShbYS16QS1aMC05LlwtK10pKjpcL1wvLykpJiZ2b2lkIDAhPT10JiYhdC5pbmNsdWRlcygibm9kZV9tb2R1bGVzLyIpfXZhciBRdDtjb25zdCBYdD1TeW1ib2woIkFnZW50QmFzZUludGVybmFsU3RhdGUiKTtjbGFzcyB0biBleHRlbmRzKFF0PWkuQWdlbnQsUXQpe2NvbnN0cnVjdG9yKHQpe3N1cGVyKHQpLHRoaXNbWHRdPXt9fWlzU2VjdXJlRW5kcG9pbnQodCl7aWYodCl7aWYoImJvb2xlYW4iPT10eXBlb2YgdC5zZWN1cmVFbmRwb2ludClyZXR1cm4gdC5zZWN1cmVFbmRwb2ludDtpZigic3RyaW5nIj09dHlwZW9mIHQucHJvdG9jb2wpcmV0dXJuImh0dHBzOiI9PT10LnByb3RvY29sfWNvbnN0e3N0YWNrOm59PW5ldyBFcnJvcjtyZXR1cm4ic3RyaW5nIj09dHlwZW9mIG4mJm4uc3BsaXQoIlxuIikuc29tZSh0PT4tMSE9PXQuaW5kZXhPZigiKGh0dHBzLmpzOiIpfHwtMSE9PXQuaW5kZXhPZigibm9kZTpodHRwczoiKSl9Y3JlYXRlU29ja2V0KHQsbixlKXtjb25zdCByPXsuLi5uLHNlY3VyZUVuZHBvaW50OnRoaXMuaXNTZWN1cmVFbmRwb2ludChuKX07UHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKT0+dGhpcy5jb25uZWN0KHQscikpLnRoZW4obz0+e2lmKG8gaW5zdGFuY2VvZiBpLkFnZW50KXJldHVybiBvLmFkZFJlcXVlc3QodCxyKTt0aGlzW1h0XS5jdXJyZW50U29ja2V0PW8sc3VwZXIuY3JlYXRlU29ja2V0KHQsbixlKX0sZSl9Y3JlYXRlQ29ubmVjdGlvbigpe2NvbnN0IHQ9dGhpc1tYdF0uY3VycmVudFNvY2tldDtpZih0aGlzW1h0XS5jdXJyZW50U29ja2V0PXZvaWQgMCwhdCl0aHJvdyBuZXcgRXJyb3IoIk5vIHNvY2tldCB3YXMgcmV0dXJuZWQgaW4gdGhlIGBjb25uZWN0KClgIGZ1bmN0aW9uIik7cmV0dXJuIHR9Z2V0IGRlZmF1bHRQb3J0KCl7cmV0dXJuIHRoaXNbWHRdLmRlZmF1bHRQb3J0Pz8oImh0dHBzOiI9PT10aGlzLnByb3RvY29sPzQ0Mzo4MCl9c2V0IGRlZmF1bHRQb3J0KHQpe3RoaXNbWHRdJiYodGhpc1tYdF0uZGVmYXVsdFBvcnQ9dCl9Z2V0IHByb3RvY29sKCl7cmV0dXJuIHRoaXNbWHRdLnByb3RvY29sPz8odGhpcy5pc1NlY3VyZUVuZHBvaW50KCk/Imh0dHBzOiI6Imh0dHA6Iil9c2V0IHByb3RvY29sKHQpe3RoaXNbWHRdJiYodGhpc1tYdF0ucHJvdG9jb2w9dCl9fWZ1bmN0aW9uIG5uKC4uLnQpe3cubG9nKCJbaHR0cHMtcHJveHktYWdlbnQ6cGFyc2UtcHJveHktcmVzcG9uc2VdIiwuLi50KX1mdW5jdGlvbiBlbih0KXtyZXR1cm4gbmV3IFByb21pc2UoKG4sZSk9PntsZXQgcj0wO2NvbnN0IG89W107ZnVuY3Rpb24gaSgpe2NvbnN0IGM9dC5yZWFkKCk7Yz9mdW5jdGlvbihjKXtvLnB1c2goYykscis9Yy5sZW5ndGg7Y29uc3QgdT1CdWZmZXIuY29uY2F0KG8sciksYT11LmluZGV4T2YoIlxyXG5cclxuIik7aWYoLTE9PT1hKXJldHVybiBubigiaGF2ZSBub3QgcmVjZWl2ZWQgZW5kIG9mIEhUVFAgaGVhZGVycyB5ZXQuLi4iKSx2b2lkIGkoKTtjb25zdCBmPXUuc3ViYXJyYXkoMCxhKS50b1N0cmluZygiYXNjaWkiKS5zcGxpdCgiXHJcbiIpLGg9Zi5zaGlmdCgpO2lmKCFoKXJldHVybiB0LmRlc3Ryb3koKSxlKG5ldyBFcnJvcigiTm8gaGVhZGVyIHJlY2VpdmVkIGZyb20gcHJveHkgQ09OTkVDVCByZXNwb25zZSIpKTtjb25zdCBwPWguc3BsaXQoIiAiKSxkPSsocFsxXXx8MCksbD1wLnNsaWNlKDIpLmpvaW4oIiAiKSxnPXt9O2Zvcihjb25zdCBuIG9mIGYpe2lmKCFuKWNvbnRpbnVlO2NvbnN0IHI9bi5pbmRleE9mKCI6Iik7aWYoLTE9PT1yKXJldHVybiB0LmRlc3Ryb3koKSxlKG5ldyBFcnJvcihgSW52YWxpZCBoZWFkZXIgZnJvbSBwcm94eSBDT05ORUNUIHJlc3BvbnNlOiAiJHtufSJgKSk7Y29uc3Qgbz1uLnNsaWNlKDAscikudG9Mb3dlckNhc2UoKSxpPW4uc2xpY2UocisxKS50cmltU3RhcnQoKSxzPWdbb107InN0cmluZyI9PXR5cGVvZiBzP2dbb109W3MsaV06QXJyYXkuaXNBcnJheShzKT9zLnB1c2goaSk6Z1tvXT1pfW5uKCJnb3QgcHJveHkgc2VydmVyIHJlc3BvbnNlOiAlbyAlbyIsaCxnKSxzKCksbih7Y29ubmVjdDp7c3RhdHVzQ29kZTpkLHN0YXR1c1RleHQ6bCxoZWFkZXJzOmd9LGJ1ZmZlcmVkOnV9KX0oYyk6dC5vbmNlKCJyZWFkYWJsZSIsaSl9ZnVuY3Rpb24gcygpe3QucmVtb3ZlTGlzdGVuZXIoImVuZCIsYyksdC5yZW1vdmVMaXN0ZW5lcigiZXJyb3IiLHUpLHQucmVtb3ZlTGlzdGVuZXIoInJlYWRhYmxlIixpKX1mdW5jdGlvbiBjKCl7cygpLG5uKCJvbmVuZCIpLGUobmV3IEVycm9yKCJQcm94eSBjb25uZWN0aW9uIGVuZGVkIGJlZm9yZSByZWNlaXZpbmcgQ09OTkVDVCByZXNwb25zZSIpKX1mdW5jdGlvbiB1KHQpe3MoKSxubigib25lcnJvciAlbyIsdCksZSh0KX10Lm9uKCJlcnJvciIsdSksdC5vbigiZW5kIixjKSxpKCl9KX1mdW5jdGlvbiBybiguLi50KXt3LmxvZygiW2h0dHBzLXByb3h5LWFnZW50XSIsLi4udCl9Y2xhc3Mgb24gZXh0ZW5kcyB0bntjb25zdHJ1Y3Rvcih0LG4pe3N1cGVyKG4pLHRoaXMub3B0aW9ucz17fSx0aGlzLnByb3h5PSJzdHJpbmciPT10eXBlb2YgdD9uZXcgVVJMKHQpOnQsdGhpcy5wcm94eUhlYWRlcnM9bj8uaGVhZGVycz8/e30scm4oIkNyZWF0aW5nIG5ldyBIdHRwc1Byb3h5QWdlbnQgaW5zdGFuY2U6ICVvIix0aGlzLnByb3h5LmhyZWYpO2NvbnN0IGU9KHRoaXMucHJveHkuaG9zdG5hbWV8fHRoaXMucHJveHkuaG9zdCkucmVwbGFjZSgvXlxbfFxdJC9nLCIiKSxyPXRoaXMucHJveHkucG9ydD9wYXJzZUludCh0aGlzLnByb3h5LnBvcnQsMTApOiJodHRwczoiPT09dGhpcy5wcm94eS5wcm90b2NvbD80NDM6ODA7dGhpcy5jb25uZWN0T3B0cz17QUxQTlByb3RvY29sczpbImh0dHAvMS4xIl0sLi4ubj9jbihuLCJoZWFkZXJzIik6bnVsbCxob3N0OmUscG9ydDpyfX1hc3luYyBjb25uZWN0KHQsbil7Y29uc3R7cHJveHk6ZX09dGhpcztpZighbi5ob3N0KXRocm93IG5ldyBUeXBlRXJyb3IoJ05vICJob3N0IiBwcm92aWRlZCcpO2xldCByO2lmKCJodHRwczoiPT09ZS5wcm90b2NvbCl7cm4oIkNyZWF0aW5nIGB0bHMuU29ja2V0YDogJW8iLHRoaXMuY29ubmVjdE9wdHMpO2NvbnN0IHQ9dGhpcy5jb25uZWN0T3B0cy5zZXJ2ZXJuYW1lfHx0aGlzLmNvbm5lY3RPcHRzLmhvc3Q7cj1mLmNvbm5lY3Qoey4uLnRoaXMuY29ubmVjdE9wdHMsc2VydmVybmFtZTp0JiZhLmlzSVAodCk/dm9pZCAwOnR9KX1lbHNlIHJuKCJDcmVhdGluZyBgbmV0LlNvY2tldGA6ICVvIix0aGlzLmNvbm5lY3RPcHRzKSxyPWEuY29ubmVjdCh0aGlzLmNvbm5lY3RPcHRzKTtjb25zdCBvPSJmdW5jdGlvbiI9PXR5cGVvZiB0aGlzLnByb3h5SGVhZGVycz90aGlzLnByb3h5SGVhZGVycygpOnsuLi50aGlzLnByb3h5SGVhZGVyc30saT1hLmlzSVB2NihuLmhvc3QpP2BbJHtuLmhvc3R9XWA6bi5ob3N0O2xldCBzPWBDT05ORUNUICR7aX06JHtuLnBvcnR9IEhUVFAvMS4xXHJcbmA7aWYoZS51c2VybmFtZXx8ZS5wYXNzd29yZCl7Y29uc3QgdD1gJHtkZWNvZGVVUklDb21wb25lbnQoZS51c2VybmFtZSl9OiR7ZGVjb2RlVVJJQ29tcG9uZW50KGUucGFzc3dvcmQpfWA7b1siUHJveHktQXV0aG9yaXphdGlvbiJdPWBCYXNpYyAke0J1ZmZlci5mcm9tKHQpLnRvU3RyaW5nKCJiYXNlNjQiKX1gfW8uSG9zdD1gJHtpfToke24ucG9ydH1gLG9bIlByb3h5LUNvbm5lY3Rpb24iXXx8KG9bIlByb3h5LUNvbm5lY3Rpb24iXT10aGlzLmtlZXBBbGl2ZT8iS2VlcC1BbGl2ZSI6ImNsb3NlIik7Zm9yKGNvbnN0IHQgb2YgT2JqZWN0LmtleXMobykpcys9YCR7dH06ICR7b1t0XX1cclxuYDtjb25zdCBjPWVuKHIpO3Iud3JpdGUoYCR7c31cclxuYCk7Y29uc3R7Y29ubmVjdDp1LGJ1ZmZlcmVkOmh9PWF3YWl0IGM7aWYodC5lbWl0KCJwcm94eUNvbm5lY3QiLHUpLHRoaXMuZW1pdCgicHJveHlDb25uZWN0Iix1LHQpLDIwMD09PXUuc3RhdHVzQ29kZSl7aWYodC5vbmNlKCJzb2NrZXQiLHNuKSxuLnNlY3VyZUVuZHBvaW50KXtybigiVXBncmFkaW5nIHNvY2tldCBjb25uZWN0aW9uIHRvIFRMUyIpO2NvbnN0IHQ9bi5zZXJ2ZXJuYW1lfHxuLmhvc3Q7cmV0dXJuIGYuY29ubmVjdCh7Li4uY24obiwiaG9zdCIsInBhdGgiLCJwb3J0Iiksc29ja2V0OnIsc2VydmVybmFtZTphLmlzSVAodCk/dm9pZCAwOnR9KX1yZXR1cm4gcn1yLmRlc3Ryb3koKTtjb25zdCBwPW5ldyBhLlNvY2tldCh7d3JpdGFibGU6ITF9KTtyZXR1cm4gcC5yZWFkYWJsZT0hMCx0Lm9uY2UoInNvY2tldCIsdD0+e3JuKCJSZXBsYXlpbmcgcHJveHkgYnVmZmVyIGZvciBmYWlsZWQgcmVxdWVzdCIpLHQucHVzaChoKSx0LnB1c2gobnVsbCl9KSxwfX1mdW5jdGlvbiBzbih0KXt0LnJlc3VtZSgpfWZ1bmN0aW9uIGNuKHQsLi4ubil7Y29uc3QgZT17fTtsZXQgcjtmb3IociBpbiB0KW4uaW5jbHVkZXMocil8fChlW3JdPXRbcl0pO3JldHVybiBlfW9uLnByb3RvY29scz1bImh0dHAiLCJodHRwcyJdO2Z1bmN0aW9uIHVuKHQpe3JldHVybiB0LnJlcGxhY2UoL15bQS1aXTovLCIiKS5yZXBsYWNlKC9cXC9nLCIvIil9Y29uc3QgYW49bjtsZXQgZm4saG49MCxwbj17fTtmdW5jdGlvbiBkbih0KXthbi5kZWJ1ZyYmY29uc29sZS5sb2coYFtBTlIgV29ya2VyXSAke3R9YCl9dmFyIGxuLGduLG1uO2NvbnN0IHluPWZ1bmN0aW9uKHQpe2xldCBuO3RyeXtuPW5ldyBVUkwodC51cmwpfWNhdGNoKG4pe3JldHVybiBiKCgpPT57Y29uc29sZS53YXJuKCJbQHNlbnRyeS9ub2RlXTogSW52YWxpZCBkc24gb3IgdHVubmVsIG9wdGlvbiwgd2lsbCBub3Qgc2VuZCBhbnkgZXZlbnRzLiBUaGUgdHVubmVsIG9wdGlvbiBtdXN0IGJlIGEgZnVsbCBVUkwgd2hlbiB1c2VkLiIpfSksS3QodCwoKT0+UHJvbWlzZS5yZXNvbHZlKHt9KSl9Y29uc3QgZT0iaHR0cHM6Ij09PW4ucHJvdG9jb2wscj1mdW5jdGlvbih0LG4pe2NvbnN0e25vX3Byb3h5OmV9PXByb2Nlc3MuZW52LHI9ZT8uc3BsaXQoIiwiKS5zb21lKG49PnQuaG9zdC5lbmRzV2l0aChuKXx8dC5ob3N0bmFtZS5lbmRzV2l0aChuKSk7cmV0dXJuIHI/dm9pZCAwOm59KG4sdC5wcm94eXx8KGU/cHJvY2Vzcy5lbnYuaHR0cHNfcHJveHk6dm9pZCAwKXx8cHJvY2Vzcy5lbnYuaHR0cF9wcm94eSksbz1lP3M6aSxhPXZvaWQgMCE9PXQua2VlcEFsaXZlJiZ0LmtlZXBBbGl2ZSxmPXI/bmV3IG9uKHIpOm5ldyBvLkFnZW50KHtrZWVwQWxpdmU6YSxtYXhTb2NrZXRzOjMwLHRpbWVvdXQ6MmUzfSksaD1mdW5jdGlvbih0LG4sZSl7Y29uc3R7aG9zdG5hbWU6cixwYXRobmFtZTpvLHBvcnQ6aSxwcm90b2NvbDpzLHNlYXJjaDphfT1uZXcgVVJMKHQudXJsKTtyZXR1cm4gZnVuY3Rpb24oZil7cmV0dXJuIG5ldyBQcm9taXNlKChoLHApPT57RnQoKCk9PntsZXQgZD1mdW5jdGlvbih0KXtyZXR1cm4gbmV3IGMoe3JlYWQoKXt0aGlzLnB1c2godCksdGhpcy5wdXNoKG51bGwpfX0pfShmLmJvZHkpO2NvbnN0IGw9ey4uLnQuaGVhZGVyc307Zi5ib2R5Lmxlbmd0aD4zMjc2OCYmKGxbImNvbnRlbnQtZW5jb2RpbmciXT0iZ3ppcCIsZD1kLnBpcGUodSgpKSk7Y29uc3QgZz1yLnN0YXJ0c1dpdGgoIlsiKSxtPW4ucmVxdWVzdCh7bWV0aG9kOiJQT1NUIixhZ2VudDplLGhlYWRlcnM6bCxob3N0bmFtZTpnP3Iuc2xpY2UoMSwtMSk6cixwYXRoOmAke299JHthfWAscG9ydDppLHByb3RvY29sOnMsY2E6dC5jYUNlcnRzfSx0PT57dC5vbigiZGF0YSIsKCk9Pnt9KSx0Lm9uKCJlbmQiLCgpPT57fSksdC5zZXRFbmNvZGluZygidXRmOCIpO2NvbnN0IG49dC5oZWFkZXJzWyJyZXRyeS1hZnRlciJdPz9udWxsLGU9dC5oZWFkZXJzWyJ4LXNlbnRyeS1yYXRlLWxpbWl0cyJdPz9udWxsO2goe3N0YXR1c0NvZGU6dC5zdGF0dXNDb2RlLGhlYWRlcnM6eyJyZXRyeS1hZnRlciI6biwieC1zZW50cnktcmF0ZS1saW1pdHMiOkFycmF5LmlzQXJyYXkoZSk/ZVswXXx8bnVsbDplfX0pfSk7bS5vbigiZXJyb3IiLHApLGQucGlwZShtKX0pfSl9fSh0LHQuaHR0cE1vZHVsZT8/byxmKTtyZXR1cm4gS3QodCxoKX0oe3VybDoobG49YW4uZHNuLGduPWFuLnR1bm5lbCxtbj1hbi5zZGtNZXRhZGF0YS5zZGssZ258fGAke2Z1bmN0aW9uKHQpe3JldHVybmAke2Z1bmN0aW9uKHQpe2NvbnN0IG49dC5wcm90b2NvbD9gJHt0LnByb3RvY29sfTpgOiIiLGU9dC5wb3J0P2A6JHt0LnBvcnR9YDoiIjtyZXR1cm5gJHtufS8vJHt0Lmhvc3R9JHtlfSR7dC5wYXRoP2AvJHt0LnBhdGh9YDoiIn0vYXBpL2B9KHQpfSR7dC5wcm9qZWN0SWR9L2VudmVsb3BlL2B9KGxuKX0/JHtmdW5jdGlvbih0LG4pe2NvbnN0IGU9e3NlbnRyeV92ZXJzaW9uOiI3In07cmV0dXJuIHQucHVibGljS2V5JiYoZS5zZW50cnlfa2V5PXQucHVibGljS2V5KSxuJiYoZS5zZW50cnlfY2xpZW50PWAke24ubmFtZX0vJHtuLnZlcnNpb259YCksbmV3IFVSTFNlYXJjaFBhcmFtcyhlKS50b1N0cmluZygpfShsbixtbil9YCl9KTthc3luYyBmdW5jdGlvbiBibigpe2lmKGZuKXtkbigiU2VuZGluZyBhYm5vcm1hbCBzZXNzaW9uIiksSyhmbix7c3RhdHVzOiJhYm5vcm1hbCIsYWJub3JtYWxfbWVjaGFuaXNtOiJhbnJfZm9yZWdyb3VuZCIscmVsZWFzZTphbi5yZWxlYXNlLGVudmlyb25tZW50OmFuLmVudmlyb25tZW50fSk7Y29uc3QgdD1mdW5jdGlvbih0LG4sZSxyKXtjb25zdCBvPUx0KGUpO3JldHVybiBUdCh7c2VudF9hdDpuZXcgRGF0ZShQKCkpLnRvSVNPU3RyaW5nKCksLi4ubyYme3NkazpvfSwuLi4hIXImJm4mJntkc246YnQobil9fSxbImFnZ3JlZ2F0ZXMiaW4gdD9be3R5cGU6InNlc3Npb25zIn0sdF06W3t0eXBlOiJzZXNzaW9uIn0sdC50b0pTT04oKV1dKX0oZm4sYW4uZHNuLGFuLnNka01ldGFkYXRhLGFuLnR1bm5lbCk7ZG4oSlNPTi5zdHJpbmdpZnkodCkpLGF3YWl0IHluLnNlbmQodCk7dHJ5e2U/LnBvc3RNZXNzYWdlKCJzZXNzaW9uLWVuZGVkIil9Y2F0Y2h7fX19ZnVuY3Rpb24gdm4odCl7aWYoIXQpcmV0dXJuO2NvbnN0IG49ZnVuY3Rpb24odCl7aWYoIXQubGVuZ3RoKXJldHVybltdO2NvbnN0IG49QXJyYXkuZnJvbSh0KTtyZXR1cm4vc2VudHJ5V3JhcHBlZC8udGVzdChFKG4pLmZ1bmN0aW9ufHwiIikmJm4ucG9wKCksbi5yZXZlcnNlKCksJC50ZXN0KEUobikuZnVuY3Rpb258fCIiKSYmKG4ucG9wKCksJC50ZXN0KEUobikuZnVuY3Rpb258fCIiKSYmbi5wb3AoKSksbi5zbGljZSgwLDUwKS5tYXAodD0+KHsuLi50LGZpbGVuYW1lOnQuZmlsZW5hbWV8fEUobikuZmlsZW5hbWUsZnVuY3Rpb246dC5mdW5jdGlvbnx8Ij8ifSkpfSh0KTtpZihhbi5hcHBSb290UGF0aClmb3IoY29uc3QgdCBvZiBuKXQuZmlsZW5hbWUmJih0LmZpbGVuYW1lPU0odC5maWxlbmFtZSxhbi5hcHBSb290UGF0aCkpO3JldHVybiBufWFzeW5jIGZ1bmN0aW9uIF9uKHQsbil7aWYoaG4+PWFuLm1heEFuckV2ZW50cylyZXR1cm47aG4rPTEsYXdhaXQgYm4oKSxkbigiU2VuZGluZyBldmVudCIpO2NvbnN0IGU9e2V2ZW50X2lkOkcoKSxjb250ZXh0czphbi5jb250ZXh0cyxyZWxlYXNlOmFuLnJlbGVhc2UsZW52aXJvbm1lbnQ6YW4uZW52aXJvbm1lbnQsZGlzdDphbi5kaXN0LHBsYXRmb3JtOiJub2RlIixsZXZlbDoiZXJyb3IiLGV4Y2VwdGlvbjp7dmFsdWVzOlt7dHlwZToiQXBwbGljYXRpb25Ob3RSZXNwb25kaW5nIix2YWx1ZTpgQXBwbGljYXRpb24gTm90IFJlc3BvbmRpbmcgZm9yIGF0IGxlYXN0ICR7YW4uYW5yVGhyZXNob2xkfSBtc2Asc3RhY2t0cmFjZTp7ZnJhbWVzOnZuKHQpfSxtZWNoYW5pc206e3R5cGU6IkFOUiJ9fV19LHRhZ3M6YW4uc3RhdGljVGFnc307biYmZnVuY3Rpb24odCxuKXtpZihHdCh0LG4pLCF0LmNvbnRleHRzPy50cmFjZSl7Y29uc3R7dHJhY2VJZDplLHBhcmVudFNwYW5JZDpyLHByb3BhZ2F0aW9uU3BhbklkOm99PW4ucHJvcGFnYXRpb25Db250ZXh0O3QuY29udGV4dHM9e3RyYWNlOnt0cmFjZV9pZDplLHNwYW5faWQ6b3x8VigpLHBhcmVudF9zcGFuX2lkOnJ9LC4uLnQuY29udGV4dHN9fX0oZSxuKSxmdW5jdGlvbih0KXtpZigwPT09T2JqZWN0LmtleXMocG4pLmxlbmd0aClyZXR1cm47Y29uc3Qgbj1hbi5hcHBSb290UGF0aD97fTpwbjtpZihhbi5hcHBSb290UGF0aClmb3IoY29uc3RbdCxlXW9mIE9iamVjdC5lbnRyaWVzKHBuKSluW00odCxhbi5hcHBSb290UGF0aCldPWU7Y29uc3QgZT1uZXcgTWFwO2Zvcihjb25zdCByIG9mIHQuZXhjZXB0aW9uPy52YWx1ZXN8fFtdKWZvcihjb25zdCB0IG9mIHIuc3RhY2t0cmFjZT8uZnJhbWVzfHxbXSl7Y29uc3Qgcj10LmFic19wYXRofHx0LmZpbGVuYW1lO3ImJm5bcl0mJmUuc2V0KHIsbltyXSl9aWYoZS5zaXplPjApe2NvbnN0IG49W107Zm9yKGNvbnN0W3Qscl1vZiBlLmVudHJpZXMoKSluLnB1c2goe3R5cGU6InNvdXJjZW1hcCIsY29kZV9maWxlOnQsZGVidWdfaWQ6cn0pO3QuZGVidWdfbWV0YT17aW1hZ2VzOm59fX0oZSk7Y29uc3Qgcj1NdChlLGFuLmRzbixhbi5zZGtNZXRhZGF0YSxhbi50dW5uZWwpO2RuKEpTT04uc3RyaW5naWZ5KHIpKSxhd2FpdCB5bi5zZW5kKHIpLGF3YWl0IHluLmZsdXNoKDJlMyksaG4+PWFuLm1heEFuckV2ZW50cyYmc2V0VGltZW91dCgoKT0+e3Byb2Nlc3MuZXhpdCgwKX0sNWUzKX1sZXQgU247aWYoZG4oIlN0YXJ0ZWQiKSxhbi5jYXB0dXJlU3RhY2tUcmFjZSl7ZG4oIkNvbm5lY3RpbmcgdG8gZGVidWdnZXIiKTtjb25zdCBuPW5ldyB0O24uY29ubmVjdFRvTWFpblRocmVhZCgpLGRuKCJDb25uZWN0ZWQgdG8gZGVidWdnZXIiKTtjb25zdCBlPW5ldyBNYXA7bi5vbigiRGVidWdnZXIuc2NyaXB0UGFyc2VkIix0PT57ZS5zZXQodC5wYXJhbXMuc2NyaXB0SWQsdC5wYXJhbXMudXJsKX0pLG4ub24oIkRlYnVnZ2VyLnBhdXNlZCIsdD0+e2lmKCJvdGhlciI9PT10LnBhcmFtcy5yZWFzb24pdHJ5e2RuKCJEZWJ1Z2dlciBwYXVzZWQiKTtjb25zdCBpPVsuLi50LnBhcmFtcy5jYWxsRnJhbWVzXSxzPWFuLmFwcFJvb3RQYXRoP2Z1bmN0aW9uKHQ9KHByb2Nlc3MuYXJndlsxXT9xdChwcm9jZXNzLmFyZ3ZbMV0pOnByb2Nlc3MuY3dkKCkpLG49IlxcIj09PW8pe2NvbnN0IGU9bj91bih0KTp0O3JldHVybiB0PT57aWYoIXQpcmV0dXJuO2NvbnN0IG89bj91bih0KTp0O2xldHtkaXI6aSxiYXNlOnMsZXh0OmN9PXIucGFyc2Uobyk7Ii5qcyIhPT1jJiYiLm1qcyIhPT1jJiYiLmNqcyIhPT1jfHwocz1zLnNsaWNlKDAsLTEqYy5sZW5ndGgpKTtjb25zdCB1PWRlY29kZVVSSUNvbXBvbmVudChzKTtpfHwoaT0iLiIpO2NvbnN0IGE9aS5sYXN0SW5kZXhPZigiL25vZGVfbW9kdWxlcyIpO2lmKGE+LTEpcmV0dXJuYCR7aS5zbGljZShhKzE0KS5yZXBsYWNlKC9cLy9nLCIuIil9OiR7dX1gO2lmKGkuc3RhcnRzV2l0aChlKSl7Y29uc3QgdD1pLnNsaWNlKGUubGVuZ3RoKzEpLnJlcGxhY2UoL1wvL2csIi4iKTtyZXR1cm4gdD9gJHt0fToke3V9YDp1fXJldHVybiB1fX0oYW4uYXBwUm9vdFBhdGgpOigpPT57fSxjPWkubWFwKHQ9PmZ1bmN0aW9uKHQsbixlKXtjb25zdCByPW4/bi5yZXBsYWNlKC9eZmlsZTpcL1wvLywiIik6dm9pZCAwLG89dC5sb2NhdGlvbi5jb2x1bW5OdW1iZXI/dC5sb2NhdGlvbi5jb2x1bW5OdW1iZXIrMTp2b2lkIDAsaT10LmxvY2F0aW9uLmxpbmVOdW1iZXI/dC5sb2NhdGlvbi5saW5lTnVtYmVyKzE6dm9pZCAwO3JldHVybntmaWxlbmFtZTpyLG1vZHVsZTplKHIpLGZ1bmN0aW9uOnQuZnVuY3Rpb25OYW1lfHwiPyIsY29sbm86byxsaW5lbm86aSxpbl9hcHA6cj9WdChyKTp2b2lkIDB9fSh0LGUuZ2V0KHQubG9jYXRpb24uc2NyaXB0SWQpLHMpKSx1PXNldFRpbWVvdXQoKCk9PntfbihjKS50aGVuKG51bGwsKCk9PntkbigiU2VuZGluZyBBTlIgZXZlbnQgZmFpbGVkLiIpfSl9LDVlMyk7bi5wb3N0KCJSdW50aW1lLmV2YWx1YXRlIix7ZXhwcmVzc2lvbjoiZ2xvYmFsLl9fU0VOVFJZX0dFVF9TQ09QRVNfXygpOyIsc2lsZW50OiEwLHJldHVybkJ5VmFsdWU6ITB9LCh0LGUpPT57dCYmZG4oYEVycm9yIGV4ZWN1dGluZyBzY3JpcHQ6ICcke3QubWVzc2FnZX0nYCksY2xlYXJUaW1lb3V0KHUpO2NvbnN0IHI9ZT8ucmVzdWx0P2UucmVzdWx0LnZhbHVlOnZvaWQgMDtuLnBvc3QoIkRlYnVnZ2VyLnJlc3VtZSIpLG4ucG9zdCgiRGVidWdnZXIuZGlzYWJsZSIpLF9uKGMscikudGhlbihudWxsLCgpPT57ZG4oIlNlbmRpbmcgQU5SIGV2ZW50IGZhaWxlZC4iKX0pfSl9Y2F0Y2godCl7dGhyb3cgbi5wb3N0KCJEZWJ1Z2dlci5yZXN1bWUiKSxuLnBvc3QoIkRlYnVnZ2VyLmRpc2FibGUiKSx0fX0pLFNuPSgpPT57dHJ5e24ucG9zdCgiRGVidWdnZXIuZW5hYmxlIiwoKT0+e24ucG9zdCgiRGVidWdnZXIucGF1c2UiKX0pfWNhdGNoe319fWNvbnN0e3BvbGw6d259PWZ1bmN0aW9uKHQsbixlLHIpe2NvbnN0IG89dCgpO2xldCBpPSExLHM9ITA7cmV0dXJuIHNldEludGVydmFsKCgpPT57Y29uc3QgdD1vLmdldFRpbWVNcygpOyExPT09aSYmdD5uK2UmJihpPSEwLHMmJnIoKSksdDxuK2UmJihpPSExKX0sMjApLHtwb2xsOigpPT57by5yZXNldCgpfSxlbmFibGVkOnQ9PntzPXR9fX0oZnVuY3Rpb24oKXtsZXQgdD1wcm9jZXNzLmhydGltZSgpO3JldHVybntnZXRUaW1lTXM6KCk9Pntjb25zdFtuLGVdPXByb2Nlc3MuaHJ0aW1lKHQpO3JldHVybiBNYXRoLmZsb29yKDFlMypuK2UvMWU2KX0scmVzZXQ6KCk9Pnt0PXByb2Nlc3MuaHJ0aW1lKCl9fX0sYW4ucG9sbEludGVydmFsLGFuLmFuclRocmVzaG9sZCxmdW5jdGlvbigpe2RuKCJXYXRjaGRvZyB0aW1lb3V0IiksU24/KGRuKCJQYXVzaW5nIGRlYnVnZ2VyIHRvIGNhcHR1cmUgc3RhY2sgdHJhY2UiKSxTbigpKTooZG4oIkNhcHR1cmluZyBldmVudCB3aXRob3V0IGEgc3RhY2sgdHJhY2UiKSxfbigpLnRoZW4obnVsbCwoKT0+e2RuKCJTZW5kaW5nIEFOUiBldmVudCBmYWlsZWQgb24gd2F0Y2hkb2cgdGltZW91dC4iKX0pKX0pO2U/Lm9uKCJtZXNzYWdlIix0PT57dC5zZXNzaW9uJiYoZm49SCh0LnNlc3Npb24pKSx0LmRlYnVnSW1hZ2VzJiYocG49dC5kZWJ1Z0ltYWdlcyksd24oKX0pOw==";
var DEFAULT_INTERVAL = 50;
var DEFAULT_HANG_THRESHOLD = 5e3;
function log(message, ...args) {
	debug$3.log(`[ANR] ${message}`, ...args);
}
function globalWithScopeFetchFn() {
	return GLOBAL_OBJ;
}
function getScopeData() {
	const scope = getCombinedScopeData(getIsolationScope(), getCurrentScope());
	scope.attachments = [];
	scope.eventProcessors = [];
	return scope;
}
async function getContexts(client) {
	let event = { message: "ANR" };
	const eventHint = {};
	for (const processor of client.getEventProcessors()) {
		if (event === null) break;
		event = await processor(event, eventHint);
	}
	return event?.contexts || {};
}
var INTEGRATION_NAME$54 = "Anr";
var _anrIntegration = ((options = {}) => {
	if (NODE_VERSION.major < 16 || NODE_VERSION.major === 16 && NODE_VERSION.minor < 17) throw new Error("ANR detection requires Node 16.17.0 or later");
	let worker;
	let client;
	const gbl = globalWithScopeFetchFn();
	gbl.__SENTRY_GET_SCOPES__ = getScopeData;
	return {
		name: INTEGRATION_NAME$54,
		startWorker: () => {
			if (worker) return;
			if (client) worker = _startWorker(client, options);
		},
		stopWorker: () => {
			if (worker) worker.then((stop) => {
				stop();
				worker = void 0;
			});
		},
		async setup(initClient) {
			client = initClient;
			if (options.captureStackTrace && await isDebuggerEnabled()) {
				debug$3.warn("ANR captureStackTrace has been disabled because the debugger was already enabled");
				options.captureStackTrace = false;
			}
			setImmediate(() => this.startWorker());
		}
	};
});
var anrIntegration = defineIntegration(_anrIntegration);
async function _startWorker(client, integrationOptions) {
	const dsn = client.getDsn();
	if (!dsn) return () => {};
	const contexts = await getContexts(client);
	delete contexts.app?.app_memory;
	delete contexts.device?.free_memory;
	const initOptions = client.getOptions();
	const sdkMetadata = client.getSdkMetadata() || {};
	if (sdkMetadata.sdk) sdkMetadata.sdk.integrations = initOptions.integrations.map((i) => i.name);
	const options = {
		debug: debug$3.isEnabled(),
		dsn,
		tunnel: initOptions.tunnel,
		environment: initOptions.environment || "production",
		release: initOptions.release,
		dist: initOptions.dist,
		sdkMetadata,
		appRootPath: integrationOptions.appRootPath,
		pollInterval: integrationOptions.pollInterval || DEFAULT_INTERVAL,
		anrThreshold: integrationOptions.anrThreshold || DEFAULT_HANG_THRESHOLD,
		captureStackTrace: !!integrationOptions.captureStackTrace,
		maxAnrEvents: integrationOptions.maxAnrEvents || 1,
		staticTags: integrationOptions.staticTags || {},
		contexts
	};
	if (options.captureStackTrace) {
		const inspector = await import("node:inspector");
		if (!inspector.url()) inspector.open(0);
	}
	const worker = new Worker(new URL(`data:application/javascript;base64,${base64WorkerScript}`), {
		workerData: options,
		execArgv: [],
		env: {
			...process.env,
			NODE_OPTIONS: void 0
		}
	});
	process.on("exit", () => {
		worker.terminate();
	});
	const timer = setInterval(() => {
		try {
			const currentSession = getIsolationScope().getSession();
			const session = currentSession ? {
				...currentSession,
				toJSON: void 0
			} : void 0;
			worker.postMessage({
				session,
				debugImages: getFilenameToDebugIdMap(initOptions.stackParser)
			});
		} catch {}
	}, options.pollInterval);
	timer.unref();
	worker.on("message", (msg) => {
		if (msg === "session-ended") {
			log("ANR event sent from ANR worker. Clearing session in this thread.");
			getIsolationScope().setSession(void 0);
		}
	});
	worker.once("error", (err) => {
		clearInterval(timer);
		log("ANR worker error", err);
	});
	worker.once("exit", (code) => {
		clearInterval(timer);
		log("ANR worker exit", code);
	});
	worker.unref();
	return () => {
		worker.terminate();
		clearInterval(timer);
	};
}
function disableAnrDetectionForCallback(callback) {
	const integration = getClient()?.getIntegrationByName(INTEGRATION_NAME$54);
	if (!integration) return callback();
	integration.stopWorker();
	const result = callback();
	if (isPromise$3(result)) return result.finally(() => integration.startWorker());
	integration.startWorker();
	return result;
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/logs/capture.js
function captureLog(level, ...args) {
	const [messageOrMessageTemplate, paramsOrAttributes, maybeAttributesOrMetadata, maybeMetadata] = args;
	if (Array.isArray(paramsOrAttributes)) {
		const attributes = { ...maybeAttributesOrMetadata };
		attributes["sentry.message.template"] = messageOrMessageTemplate;
		paramsOrAttributes.forEach((param, index) => {
			attributes[`sentry.message.parameter.${index}`] = param;
		});
		const message = format(messageOrMessageTemplate, ...paramsOrAttributes);
		_INTERNAL_captureLog({
			level,
			message,
			attributes
		}, maybeMetadata?.scope);
	} else _INTERNAL_captureLog({
		level,
		message: messageOrMessageTemplate,
		attributes: paramsOrAttributes
	}, maybeAttributesOrMetadata?.scope ?? maybeMetadata?.scope);
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/logs/exports.js
var exports_exports = /* @__PURE__ */ __exportAll({
	debug: () => debug$2,
	error: () => error,
	fatal: () => fatal,
	fmt: () => fmt,
	info: () => info,
	trace: () => trace$4,
	warn: () => warn
});
function trace$4(...args) {
	captureLog("trace", ...args);
}
function debug$2(...args) {
	captureLog("debug", ...args);
}
function info(...args) {
	captureLog("info", ...args);
}
function warn(...args) {
	captureLog("warn", ...args);
}
function error(...args) {
	captureLog("error", ...args);
}
function fatal(...args) {
	captureLog("fatal", ...args);
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/nodeRuntimeMetrics.js
var INTEGRATION_NAME$53 = "NodeRuntimeMetrics";
var DEFAULT_INTERVAL_MS = 3e4;
var MIN_COLLECTION_INTERVAL_MS = 1e3;
var EVENT_LOOP_DELAY_RESOLUTION_MS = 10;
function _INTERNAL_normalizeCollectionInterval(rawInterval, integrationName, defaultInterval) {
	if (!Number.isFinite(rawInterval)) {
		console.warn(`[Sentry] ${integrationName}: collectionIntervalMs (${rawInterval}) is invalid. Using default of ${defaultInterval}ms.`);
		return defaultInterval;
	}
	if (rawInterval < MIN_COLLECTION_INTERVAL_MS) {
		console.warn(`[Sentry] ${integrationName}: collectionIntervalMs (${rawInterval}) is below the minimum of ${MIN_COLLECTION_INTERVAL_MS}ms. Using minimum of ${MIN_COLLECTION_INTERVAL_MS}ms.`);
		return MIN_COLLECTION_INTERVAL_MS;
	}
	return rawInterval;
}
var nodeRuntimeMetricsIntegration = defineIntegration((options = {}) => {
	const collectionIntervalMs = _INTERNAL_normalizeCollectionInterval(options.collectionIntervalMs ?? DEFAULT_INTERVAL_MS, INTEGRATION_NAME$53, DEFAULT_INTERVAL_MS);
	const collect = {
		cpuUtilization: true,
		memHeapUsed: true,
		memHeapTotal: true,
		memRss: true,
		eventLoopDelayP50: true,
		eventLoopDelayP99: true,
		eventLoopUtilization: true,
		uptime: true,
		cpuTime: false,
		memExternal: false,
		eventLoopDelayMin: false,
		eventLoopDelayMax: false,
		eventLoopDelayMean: false,
		eventLoopDelayP90: false,
		...options.collect
	};
	const needsEventLoopDelay = collect.eventLoopDelayP99 || collect.eventLoopDelayMin || collect.eventLoopDelayMax || collect.eventLoopDelayMean || collect.eventLoopDelayP50 || collect.eventLoopDelayP90;
	const needsCpu = collect.cpuUtilization || collect.cpuTime;
	let intervalId;
	let prevCpuUsage;
	let prevElu;
	let prevFlushTime = 0;
	let eventLoopDelayHistogram;
	const resolutionNs = EVENT_LOOP_DELAY_RESOLUTION_MS * 1e6;
	const nsToS = (ns) => Math.max(0, (ns - resolutionNs) / 1e9);
	const METRIC_ATTRIBUTES = { attributes: { "sentry.origin": "auto.node.runtime_metrics" } };
	const METRIC_ATTRIBUTES_BYTE = {
		unit: "byte",
		attributes: { "sentry.origin": "auto.node.runtime_metrics" }
	};
	const METRIC_ATTRIBUTES_SECOND = {
		unit: "second",
		attributes: { "sentry.origin": "auto.node.runtime_metrics" }
	};
	function collectMetrics() {
		const now = safeDateNow();
		const elapsed = now - prevFlushTime;
		if (needsCpu && prevCpuUsage !== void 0) {
			const delta = process.cpuUsage(prevCpuUsage);
			if (collect.cpuTime) {
				gauge("node.runtime.cpu.user", delta.user / 1e6, METRIC_ATTRIBUTES_SECOND);
				gauge("node.runtime.cpu.system", delta.system / 1e6, METRIC_ATTRIBUTES_SECOND);
			}
			if (collect.cpuUtilization && elapsed > 0) gauge("node.runtime.cpu.utilization", (delta.user + delta.system) / (elapsed * 1e3), METRIC_ATTRIBUTES);
			prevCpuUsage = process.cpuUsage();
		}
		if (collect.memRss || collect.memHeapUsed || collect.memHeapTotal || collect.memExternal) {
			const mem = process.memoryUsage();
			if (collect.memRss) gauge("node.runtime.mem.rss", mem.rss, METRIC_ATTRIBUTES_BYTE);
			if (collect.memHeapUsed) gauge("node.runtime.mem.heap_used", mem.heapUsed, METRIC_ATTRIBUTES_BYTE);
			if (collect.memHeapTotal) gauge("node.runtime.mem.heap_total", mem.heapTotal, METRIC_ATTRIBUTES_BYTE);
			if (collect.memExternal) {
				gauge("node.runtime.mem.external", mem.external, METRIC_ATTRIBUTES_BYTE);
				gauge("node.runtime.mem.array_buffers", mem.arrayBuffers, METRIC_ATTRIBUTES_BYTE);
			}
		}
		if (needsEventLoopDelay && eventLoopDelayHistogram) {
			if (collect.eventLoopDelayMin) gauge("node.runtime.event_loop.delay.min", nsToS(eventLoopDelayHistogram.min), METRIC_ATTRIBUTES_SECOND);
			if (collect.eventLoopDelayMax) gauge("node.runtime.event_loop.delay.max", nsToS(eventLoopDelayHistogram.max), METRIC_ATTRIBUTES_SECOND);
			if (collect.eventLoopDelayMean) gauge("node.runtime.event_loop.delay.mean", nsToS(eventLoopDelayHistogram.mean), METRIC_ATTRIBUTES_SECOND);
			if (collect.eventLoopDelayP50) gauge("node.runtime.event_loop.delay.p50", nsToS(eventLoopDelayHistogram.percentile(50)), METRIC_ATTRIBUTES_SECOND);
			if (collect.eventLoopDelayP90) gauge("node.runtime.event_loop.delay.p90", nsToS(eventLoopDelayHistogram.percentile(90)), METRIC_ATTRIBUTES_SECOND);
			if (collect.eventLoopDelayP99) gauge("node.runtime.event_loop.delay.p99", nsToS(eventLoopDelayHistogram.percentile(99)), METRIC_ATTRIBUTES_SECOND);
			eventLoopDelayHistogram.reset();
		}
		if (collect.eventLoopUtilization && prevElu !== void 0) {
			const currentElu = performance.eventLoopUtilization();
			const delta = performance.eventLoopUtilization(currentElu, prevElu);
			gauge("node.runtime.event_loop.utilization", delta.utilization, METRIC_ATTRIBUTES);
			prevElu = currentElu;
		}
		if (collect.uptime && elapsed > 0) count("node.runtime.process.uptime", elapsed / 1e3, METRIC_ATTRIBUTES_SECOND);
		prevFlushTime = now;
	}
	return {
		name: INTEGRATION_NAME$53,
		setup() {
			if (needsEventLoopDelay) {
				eventLoopDelayHistogram?.disable();
				try {
					eventLoopDelayHistogram = monitorEventLoopDelay({ resolution: EVENT_LOOP_DELAY_RESOLUTION_MS });
					eventLoopDelayHistogram.enable();
				} catch {
					eventLoopDelayHistogram = void 0;
				}
			}
			if (needsCpu) prevCpuUsage = process.cpuUsage();
			if (collect.eventLoopUtilization) prevElu = performance.eventLoopUtilization();
			prevFlushTime = safeDateNow();
			if (intervalId) clearInterval(intervalId);
			intervalId = safeUnref(setInterval(collectMetrics, collectionIntervalMs));
		}
	};
});
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/winston.js
var DEFAULT_CAPTURED_LEVELS = [
	"trace",
	"debug",
	"info",
	"warn",
	"error",
	"fatal"
];
var LEVEL_SYMBOL = /* @__PURE__ */ Symbol.for("level");
var MESSAGE_SYMBOL = /* @__PURE__ */ Symbol.for("message");
var SPLAT_SYMBOL = /* @__PURE__ */ Symbol.for("splat");
function createSentryWinstonTransport(TransportClass, sentryWinstonOptions) {
	class SentryWinstonTransport extends TransportClass {
		constructor(options) {
			super(options);
			this._levels = new Set(sentryWinstonOptions?.levels ?? DEFAULT_CAPTURED_LEVELS);
		}
		/**
		* Forwards a winston log to the Sentry SDK.
		*/
		log(info, callback) {
			try {
				setImmediate(() => {
					this.emit("logged", info);
				});
				if (!isObjectLike(info)) return;
				const levelFromSymbol = info[LEVEL_SYMBOL];
				const { level, message, timestamp, ...attributes } = info;
				attributes[LEVEL_SYMBOL] = void 0;
				attributes[MESSAGE_SYMBOL] = void 0;
				attributes[SPLAT_SYMBOL] = void 0;
				const customLevel = sentryWinstonOptions?.customLevelMap?.[levelFromSymbol];
				const winstonLogLevel = WINSTON_LEVEL_TO_LOG_SEVERITY_LEVEL_MAP[levelFromSymbol];
				const logSeverityLevel = customLevel ?? winstonLogLevel ?? "info";
				if (this._levels.has(logSeverityLevel)) captureLog(logSeverityLevel, message, {
					...attributes,
					"sentry.origin": "auto.log.winston"
				});
				else if (!customLevel && !winstonLogLevel) DEBUG_BUILD$3 && debug$3.log(`Winston log level ${levelFromSymbol} is not captured by Sentry. Please add ${levelFromSymbol} to the "customLevelMap" option of the Sentry Winston transport.`);
			} catch {}
			if (callback) callback();
		}
	}
	return SentryWinstonTransport;
}
var WINSTON_LEVEL_TO_LOG_SEVERITY_LEVEL_MAP = {
	silly: "trace",
	debug: "debug",
	verbose: "debug",
	http: "debug",
	info: "info",
	notice: "info",
	warn: "warn",
	warning: "warn",
	error: "error",
	emerg: "fatal",
	alert: "fatal",
	crit: "fatal"
};
//#endregion
//#region node_modules/@sentry/node-core/build/esm/integrations/pino.js
var SENTRY_TRACK_SYMBOL = /* @__PURE__ */ Symbol("sentry-track-pino-logger");
function getPinoKey(logger, symbolName, defaultKey) {
	const symbols = Object.getOwnPropertySymbols(logger);
	const symbolString = `Symbol(${symbolName})`;
	for (const sym of symbols) if (sym.toString() === symbolString) {
		const value = logger[sym];
		return typeof value === "string" ? value : defaultKey;
	}
	return defaultKey;
}
var DEFAULT_OPTIONS = {
	error: {
		levels: [],
		handled: true
	},
	log: { levels: [
		"trace",
		"debug",
		"info",
		"warn",
		"error",
		"fatal"
	] }
};
function stripIgnoredFields(result) {
	const { level, time, pid, hostname, ...rest } = result;
	return rest;
}
var _pinoIntegration = defineIntegration((userOptions = {}) => {
	const options = {
		autoInstrument: userOptions.autoInstrument !== false,
		error: {
			...DEFAULT_OPTIONS.error,
			...userOptions.error
		},
		log: {
			...DEFAULT_OPTIONS.log,
			...userOptions.log
		}
	};
	function shouldTrackLogger(logger) {
		const override = logger[SENTRY_TRACK_SYMBOL];
		return override === "track" || override !== "ignore" && options.autoInstrument;
	}
	return {
		name: "Pino",
		setup: (client) => {
			const enableLogs = !!client.getOptions().enableLogs;
			const integratedChannel = diagnosticsChannel.tracingChannel("pino_asJson");
			function onPinoStart(self, args, result) {
				if (!shouldTrackLogger(self)) return;
				const resultObj = stripIgnoredFields(result);
				const [captureObj, message, levelNumber] = args;
				const level = self?.levels?.labels?.[levelNumber] || "info";
				const messageKey = getPinoKey(self, "pino.messageKey", "msg");
				const logMessage = message || resultObj?.[messageKey] || "";
				if (enableLogs && options.log.levels.includes(level)) {
					const attributes = {
						...resultObj,
						"sentry.origin": "auto.log.pino",
						"pino.logger.level": levelNumber
					};
					_INTERNAL_captureLog({
						level,
						message: logMessage,
						attributes
					});
				}
				if (options.error.levels.includes(level)) {
					const errorKey = getPinoKey(self, "pino.errorKey", "err");
					const pinoContext = {};
					for (const [key, value] of Object.entries(resultObj)) if (key !== errorKey && key !== messageKey) pinoContext[key] = value;
					if (logMessage) pinoContext[messageKey] = logMessage;
					const captureContext = {
						level: severityLevelFromString(level),
						contexts: { pino: pinoContext }
					};
					withScope((scope) => {
						scope.addEventProcessor((event) => {
							event.logger = "pino";
							addExceptionMechanism(event, {
								handled: options.error.handled,
								type: "auto.log.pino"
							});
							return event;
						});
						const error = captureObj[errorKey];
						if (error) {
							captureException(error, captureContext);
							return;
						}
						captureMessage(logMessage, captureContext);
					});
				}
			}
			integratedChannel.end.subscribe((data) => {
				const { instance, arguments: args, result } = data;
				onPinoStart(instance, args, JSON.parse(result));
			});
		}
	};
});
var pinoIntegration = Object.assign(_pinoIntegration, {
	trackLogger(logger) {
		if (isObjectLike(logger) && "levels" in logger) logger[SENTRY_TRACK_SYMBOL] = "track";
	},
	untrackLogger(logger) {
		if (isObjectLike(logger) && "levels" in logger) logger[SENTRY_TRACK_SYMBOL] = "ignore";
	}
});
//#endregion
//#region node_modules/@sentry/node-core/build/esm/utils/addOriginToSpan.js
function addOriginToSpan(span, origin) {
	span.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN, origin);
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/cron/common.js
var replacements = [
	["january", "1"],
	["february", "2"],
	["march", "3"],
	["april", "4"],
	["may", "5"],
	["june", "6"],
	["july", "7"],
	["august", "8"],
	["september", "9"],
	["october", "10"],
	["november", "11"],
	["december", "12"],
	["jan", "1"],
	["feb", "2"],
	["mar", "3"],
	["apr", "4"],
	["may", "5"],
	["jun", "6"],
	["jul", "7"],
	["aug", "8"],
	["sep", "9"],
	["oct", "10"],
	["nov", "11"],
	["dec", "12"],
	["sunday", "0"],
	["monday", "1"],
	["tuesday", "2"],
	["wednesday", "3"],
	["thursday", "4"],
	["friday", "5"],
	["saturday", "6"],
	["sun", "0"],
	["mon", "1"],
	["tue", "2"],
	["wed", "3"],
	["thu", "4"],
	["fri", "5"],
	["sat", "6"]
];
function replaceCronNames(cronExpression) {
	return replacements.reduce((acc, [name, replacement]) => acc.replace(new RegExp(name, "gi"), replacement), cronExpression);
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/cron/cron.js
var ERROR_TEXT = "Automatic instrumentation of CronJob only supports crontab string";
function instrumentCron(lib, monitorSlug) {
	let jobScheduled = false;
	return new Proxy(lib, {
		construct(target, args) {
			const [cronTime, onTick, onComplete, start, timeZone, ...rest] = args;
			if (typeof cronTime !== "string") throw new Error(ERROR_TEXT);
			if (jobScheduled) throw new Error(`A job named '${monitorSlug}' has already been scheduled`);
			jobScheduled = true;
			const cronString = replaceCronNames(cronTime);
			async function monitoredTick(context, onComplete2) {
				return withMonitor(monitorSlug, async () => {
					try {
						await onTick(context, onComplete2);
					} catch (e) {
						captureException(e, { mechanism: {
							handled: false,
							type: "auto.function.cron.instrumentCron"
						} });
						throw e;
					}
				}, {
					schedule: {
						type: "crontab",
						value: cronString
					},
					timezone: timeZone || void 0
				});
			}
			return new target(cronTime, monitoredTick, onComplete, start, timeZone, ...rest);
		},
		get(target, prop) {
			if (prop === "from") return (param) => {
				const { cronTime, onTick, timeZone } = param;
				if (typeof cronTime !== "string") throw new Error(ERROR_TEXT);
				if (jobScheduled) throw new Error(`A job named '${monitorSlug}' has already been scheduled`);
				jobScheduled = true;
				const cronString = replaceCronNames(cronTime);
				param.onTick = async (context, onComplete) => {
					return withMonitor(monitorSlug, async () => {
						try {
							await onTick(context, onComplete);
						} catch (e) {
							captureException(e, { mechanism: {
								handled: false,
								type: "auto.function.cron.instrumentCron"
							} });
							throw e;
						}
					}, {
						schedule: {
							type: "crontab",
							value: cronString
						},
						timezone: timeZone || void 0
					});
				};
				return target.from(param);
			};
			else return target[prop];
		}
	});
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/cron/node-cron.js
function instrumentNodeCron(lib, monitorConfig = {}) {
	return new Proxy(lib, { get(target, prop) {
		if (prop === "schedule" && target.schedule) return new Proxy(target.schedule, { apply(target2, thisArg, argArray) {
			const [expression, callback, options] = argArray;
			const name = options?.name;
			const timezone = options?.timezone;
			if (!name) throw new Error("Missing \"name\" for scheduled job. A name is required for Sentry check-in monitoring.");
			const monitoredCallback = async (...args) => {
				return withMonitor(name, async () => {
					try {
						return await callback(...args);
					} catch (e) {
						captureException(e, { mechanism: {
							handled: false,
							type: "auto.function.node-cron.instrumentNodeCron"
						} });
						throw e;
					}
				}, {
					schedule: {
						type: "crontab",
						value: replaceCronNames(expression)
					},
					timezone,
					...monitorConfig
				});
			};
			return target2.apply(thisArg, [
				expression,
				monitoredCallback,
				options
			]);
		} });
		else return target[prop];
	} });
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/cron/node-schedule.js
function instrumentNodeSchedule(lib) {
	return new Proxy(lib, { get(target, prop) {
		if (prop === "scheduleJob") return new Proxy(target.scheduleJob, { apply(target2, thisArg, argArray) {
			const [nameOrExpression, expressionOrCallback, callback] = argArray;
			if (typeof nameOrExpression !== "string" || typeof expressionOrCallback !== "string" || typeof callback !== "function") throw new Error("Automatic instrumentation of 'node-schedule' requires the first parameter of 'scheduleJob' to be a job name string and the second parameter to be a crontab string");
			const monitorSlug = nameOrExpression;
			const expression = expressionOrCallback;
			async function monitoredCallback() {
				return withMonitor(monitorSlug, async () => {
					await callback?.();
				}, { schedule: {
					type: "crontab",
					value: replaceCronNames(expression)
				} });
			}
			return target2.apply(thisArg, [
				monitorSlug,
				expression,
				monitoredCallback
			]);
		} });
		return target[prop];
	} });
}
//#endregion
//#region node_modules/@sentry/node-core/build/esm/cron/index.js
var cron = {
	instrumentCron,
	instrumentNodeCron,
	instrumentNodeSchedule
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/http.js
var INTEGRATION_NAME$52 = "Http";
var instrumentSentryHttp = Object.assign(instrumentHttpOutgoingRequests, { id: `${INTEGRATION_NAME$52}.sentry` });
var httpIntegration = defineIntegration((options = {}) => {
	const spans = options.spans ?? true;
	const disableIncomingRequestSpans = options.disableIncomingRequestSpans;
	const enableServerSpans = spans && !disableIncomingRequestSpans;
	const serverOptions = {
		sessions: options.trackIncomingRequestsAsSessions,
		sessionFlushingDelayMS: options.sessionFlushingDelayMS,
		ignoreRequestBody: options.ignoreIncomingRequestBody,
		maxRequestBodySize: options.maxIncomingRequestBodySize
	};
	const serverSpansOptions = {
		ignoreIncomingRequests: options.ignoreIncomingRequests,
		ignoreStaticAssets: options.ignoreStaticAssets,
		ignoreStatusCodes: options.dropSpansForIncomingRequestStatusCodes,
		instrumentation: options.instrumentation,
		onSpanCreated: options.incomingRequestSpanHook
	};
	const server = httpServerIntegration(serverOptions);
	const serverSpans = httpServerSpansIntegration(serverSpansOptions);
	return {
		name: INTEGRATION_NAME$52,
		setup(client) {
			const clientOptions = client.getOptions();
			if (enableServerSpans && hasSpansEnabled(clientOptions)) serverSpans.setup(client);
		},
		setupOnce() {
			server.setupOnce();
			instrumentHttpOutgoingRequests({
				breadcrumbs: options.breadcrumbs,
				spans,
				propagateTraceInOutgoingRequests: options.tracePropagation ?? true,
				createSpansForOutgoingRequests: spans,
				ignoreOutgoingRequests: options.ignoreOutgoingRequests,
				outgoingRequestHook: (span, request) => {
					const url = getRequestUrlFromClientRequest(request);
					if (url.startsWith("data:")) {
						const sanitizedUrl = stripDataUrlContent(url);
						span.setAttribute("http.url", sanitizedUrl);
						span.setAttribute(Yu, sanitizedUrl);
						span.updateName(`${request.method || "GET"} ${sanitizedUrl}`);
					}
					options.instrumentation?.requestHook?.(span, request);
				},
				outgoingResponseHook: options.instrumentation?.responseHook,
				outgoingRequestApplyCustomAttributes: options.instrumentation?.applyCustomAttributesOnSpan
			});
		},
		processEvent(event) {
			return serverSpans.processEvent(event);
		}
	};
});
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/node-fetch.js
var _nativeNodeFetchIntegration = ((options = {}) => {
	return {
		name: "NodeFetch",
		setupOnce() {
			const clientOptions = getClient()?.getOptions();
			instrumentUndici({
				...options,
				spans: _shouldInstrumentSpans(options, clientOptions)
			});
		}
	};
});
var nativeNodeFetchIntegration = defineIntegration(_nativeNodeFetchIntegration);
function _shouldInstrumentSpans(options, clientOptions = {}) {
	return options.spans ?? (!clientOptions.skipOpenTelemetrySetup && hasSpansEnabled(clientOptions));
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/fs/vendored/constants.js
var PROMISE_FUNCTIONS = [
	"access",
	"appendFile",
	"chmod",
	"chown",
	"copyFile",
	"cp",
	"lchown",
	"link",
	"lstat",
	"lutimes",
	"mkdir",
	"mkdtemp",
	"open",
	"opendir",
	"readdir",
	"readFile",
	"readlink",
	"realpath",
	"rename",
	"rm",
	"rmdir",
	"stat",
	"symlink",
	"truncate",
	"unlink",
	"utimes",
	"writeFile"
];
var CALLBACK_FUNCTIONS = [
	"access",
	"appendFile",
	"chmod",
	"chown",
	"copyFile",
	"cp",
	"exists",
	"lchown",
	"link",
	"lstat",
	"lutimes",
	"mkdir",
	"mkdtemp",
	"open",
	"opendir",
	"readdir",
	"readFile",
	"readlink",
	"realpath",
	"realpath.native",
	"rename",
	"rm",
	"rmdir",
	"stat",
	"symlink",
	"truncate",
	"unlink",
	"utimes",
	"writeFile"
];
var SYNC_FUNCTIONS = [
	"accessSync",
	"appendFileSync",
	"chmodSync",
	"chownSync",
	"copyFileSync",
	"cpSync",
	"existsSync",
	"lchownSync",
	"linkSync",
	"lstatSync",
	"lutimesSync",
	"mkdirSync",
	"mkdtempSync",
	"opendirSync",
	"openSync",
	"readdirSync",
	"readFileSync",
	"readlinkSync",
	"realpathSync",
	"realpathSync.native",
	"renameSync",
	"rmdirSync",
	"rmSync",
	"statSync",
	"symlinkSync",
	"truncateSync",
	"unlinkSync",
	"utimesSync",
	"writeFileSync"
];
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/fs/vendored/utils.js
function splitTwoLevels(functionName) {
	const memberParts = functionName.split(".");
	if (memberParts.length > 1) {
		if (memberParts.length !== 2) throw Error(`Invalid member function name ${functionName}`);
		return memberParts;
	} else return [functionName];
}
function indexFs(fs, member) {
	if (!member) throw new Error(JSON.stringify({ member }));
	const [functionName1, functionName2] = splitTwoLevels(member);
	if (functionName2) return {
		objectToPatch: fs[functionName1],
		functionNameToPatch: functionName2
	};
	else return {
		objectToPatch: fs,
		functionNameToPatch: functionName1
	};
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/fs/vendored/instrumentation.js
var SPAN_ORIGIN = "auto.file.fs";
var SPAN_OP = "file";
var FS_OPERATIONS_WITH_OLD_PATH_NEW_PATH = ["rename", "renameSync"];
var FS_OPERATIONS_WITH_SRC_DEST = [
	"copyFile",
	"cp",
	"copyFileSync",
	"cpSync"
];
var FS_OPERATIONS_WITH_EXISTING_PATH_NEW_PATH = ["link", "linkSync"];
var FS_OPERATIONS_WITH_PREFIX = ["mkdtemp", "mkdtempSync"];
var FS_OPERATIONS_WITH_TARGET_PATH = ["symlink", "symlinkSync"];
var FS_OPERATIONS_WITH_PATH_ARG = [
	"access",
	"appendFile",
	"chmod",
	"chown",
	"exists",
	"mkdir",
	"lchown",
	"lstat",
	"lutimes",
	"open",
	"opendir",
	"readdir",
	"readFile",
	"readlink",
	"realpath",
	"realpath.native",
	"rm",
	"rmdir",
	"stat",
	"truncate",
	"unlink",
	"utimes",
	"writeFile",
	"accessSync",
	"appendFileSync",
	"chmodSync",
	"chownSync",
	"existsSync",
	"lchownSync",
	"lstatSync",
	"lutimesSync",
	"opendirSync",
	"mkdirSync",
	"openSync",
	"readdirSync",
	"readFileSync",
	"readlinkSync",
	"realpathSync",
	"realpathSync.native",
	"rmdirSync",
	"rmSync",
	"statSync",
	"truncateSync",
	"unlinkSync",
	"utimesSync",
	"writeFileSync"
];
function getSpanAttributes$1(functionName, args, config) {
	const attributes = {
		[SEMANTIC_ATTRIBUTE_SENTRY_OP]: SPAN_OP,
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: SPAN_ORIGIN
	};
	if (!config.recordFilePaths) return attributes;
	if (typeof args[0] === "string" && FS_OPERATIONS_WITH_PATH_ARG.includes(functionName)) attributes["path_argument"] = args[0];
	else if (typeof args[0] === "string" && typeof args[1] === "string") {
		if (FS_OPERATIONS_WITH_TARGET_PATH.includes(functionName)) {
			attributes["target_argument"] = args[0];
			attributes["path_argument"] = args[1];
		} else if (FS_OPERATIONS_WITH_EXISTING_PATH_NEW_PATH.includes(functionName)) {
			attributes["existing_path_argument"] = args[0];
			attributes["new_path_argument"] = args[1];
		} else if (FS_OPERATIONS_WITH_SRC_DEST.includes(functionName)) {
			attributes["src_argument"] = args[0];
			attributes["dest_argument"] = args[1];
		} else if (FS_OPERATIONS_WITH_OLD_PATH_NEW_PATH.includes(functionName)) {
			attributes["old_path_argument"] = args[0];
			attributes["new_path_argument"] = args[1];
		}
	} else if (typeof args[0] === "string" && FS_OPERATIONS_WITH_PREFIX.includes(functionName)) attributes["prefix_argument"] = args[0];
	return attributes;
}
function patchedFunctionWithOriginalProperties(patchedFunction, original) {
	return Object.assign(patchedFunction, original);
}
var _patched = /* @__PURE__ */ new WeakMap();
function _patchMethod(obj, name, wrapper) {
	const original = obj[name];
	if (typeof original !== "function") return;
	let patched = _patched.get(obj);
	if (!patched) {
		patched = /* @__PURE__ */ new Set();
		_patched.set(obj, patched);
	}
	if (patched.has(name)) return;
	patched.add(name);
	obj[name] = wrapper(original);
}
function _patchSyncFunction(functionName, original, config) {
	const patchedFunction = function(...args) {
		const attributes = getSpanAttributes$1(functionName, args, config);
		return startSpan$3({
			name: `fs.${functionName}`,
			onlyIfParent: true,
			attributes
		}, (span) => {
			try {
				return suppressTracing$1(() => original.apply(this, args));
			} catch (error) {
				recordError(span, error, config);
				throw error;
			}
		});
	};
	return patchedFunctionWithOriginalProperties(patchedFunction, original);
}
function _patchCallbackFunction(functionName, original, config) {
	const patchedFunction = function(...args) {
		const lastIdx = args.length - 1;
		const cb = args[lastIdx];
		if (typeof cb !== "function") return original.apply(this, args);
		const attributes = getSpanAttributes$1(functionName, args, config);
		const span = startInactiveSpan$1({
			name: `fs.${functionName}`,
			onlyIfParent: true,
			attributes
		});
		const parentSpan = getActiveSpan$1();
		args[lastIdx] = function(...cbArgs) {
			const error = cbArgs[0];
			if (error) recordError(span, error, config);
			span.end();
			if (parentSpan) return withActiveSpan$1(parentSpan, () => cb.apply(this, cbArgs));
			return cb.apply(this, cbArgs);
		};
		try {
			return suppressTracing$1(() => original.apply(this, args));
		} catch (error) {
			recordError(span, error, config);
			span.end();
			throw error;
		}
	};
	return patchedFunctionWithOriginalProperties(patchedFunction, original);
}
function _patchExistsCallbackFunction(original, config) {
	const functionName = "exists";
	const patchedFunction = function(...args) {
		const lastIdx = args.length - 1;
		const cb = args[lastIdx];
		if (typeof cb !== "function") return original.apply(this, args);
		const attributes = getSpanAttributes$1(functionName, args, config);
		const span = startInactiveSpan$1({
			name: `fs.${functionName}`,
			onlyIfParent: true,
			attributes
		});
		const parentSpan = getActiveSpan$1();
		args[lastIdx] = function(...cbArgs) {
			span.end();
			if (parentSpan) return withActiveSpan$1(parentSpan, () => cb.apply(this, cbArgs));
			return cb.apply(this, cbArgs);
		};
		try {
			return suppressTracing$1(() => original.apply(this, args));
		} catch (error) {
			recordError(span, error, config);
			span.end();
			throw error;
		}
	};
	const functionWithOriginalProperties = patchedFunctionWithOriginalProperties(patchedFunction, original);
	const promisified = function(path) {
		return new Promise((resolve) => functionWithOriginalProperties(path, resolve));
	};
	Object.defineProperty(promisified, "name", { value: functionName });
	Object.defineProperty(functionWithOriginalProperties, promisify.custom, { value: promisified });
	return functionWithOriginalProperties;
}
function _patchPromiseFunction(functionName, original, config) {
	const patchedFunction = async function(...args) {
		const attributes = getSpanAttributes$1(functionName, args, config);
		return startSpan$3({
			name: `fs.${functionName}`,
			onlyIfParent: true,
			attributes
		}, async (span) => {
			try {
				return await suppressTracing$1(() => original.apply(this, args));
			} catch (error) {
				recordError(span, error, config);
				throw error;
			}
		});
	};
	return patchedFunctionWithOriginalProperties(patchedFunction, original);
}
function enableFsInstrumentation(config = {}) {
	for (const fName of SYNC_FUNCTIONS) {
		const { objectToPatch, functionNameToPatch } = indexFs(fs, fName);
		_patchMethod(objectToPatch, functionNameToPatch, (original) => _patchSyncFunction(fName, original, config));
	}
	for (const fName of CALLBACK_FUNCTIONS) {
		const { objectToPatch, functionNameToPatch } = indexFs(fs, fName);
		if (fName === "exists") _patchMethod(objectToPatch, functionNameToPatch, (original) => _patchExistsCallbackFunction(original, config));
		else _patchMethod(objectToPatch, functionNameToPatch, (original) => _patchCallbackFunction(fName, original, config));
	}
	const fsPromises = fs.promises;
	for (const fName of PROMISE_FUNCTIONS) _patchMethod(fsPromises, fName, (original) => _patchPromiseFunction(fName, original, config));
}
function recordError(span, error, config) {
	span.setStatus({
		code: 2,
		message: "internal_error"
	});
	if (config.recordErrorMessagesAsSpanAttributes && error instanceof Error) span.setAttribute("fs_error", error.message);
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/fs/index.js
var INTEGRATION_NAME$51 = "FileSystem";
var fsIntegration = defineIntegration((options = {}) => {
	return {
		name: INTEGRATION_NAME$51,
		setupOnce() {
			enableFsInstrumentation(options);
		}
	};
});
//#endregion
//#region node_modules/@sentry/node/build/esm/debug-build.js
var DEBUG_BUILD$1 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
//#endregion
//#region node_modules/@sentry/node/build/esm/utils/setHttpServerSpanRouteAttribute.js
function setHttpServerSpanRouteAttribute$2(route) {
	const activeSpan = getActiveSpan$1();
	if (!activeSpan) return;
	const rootSpan = getRootSpan$1(activeSpan);
	if (!rootSpan) return;
	if (spanToJSON(rootSpan).data["sentry.op"] !== "http.server") return;
	rootSpan.setAttribute("http.route", route);
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/express.js
var INTEGRATION_NAME$50 = "Express";
var SUPPORTED_VERSIONS$5 = [">=4.0.0 <6"];
function setupExpressErrorHandler(app, options) {
	setupExpressErrorHandler$1(app, options);
	ensureIsWrapped(app.use, "express");
}
var instrumentExpress$1 = generateInstrumentOnce(INTEGRATION_NAME$50, (options) => new ExpressInstrumentation(options));
var ExpressInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super("sentry-express", SDK_VERSION, config);
	}
	init() {
		return new InstrumentationNodeModuleDefinition("express", SUPPORTED_VERSIONS$5, (express) => {
			try {
				patchExpressModule(express, () => ({
					...this.getConfig(),
					onRouteResolved(route) {
						if (route) setHttpServerSpanRouteAttribute$2(route);
					}
				}));
			} catch (e) {
				DEBUG_BUILD$1 && debug$3.error("Failed to patch express module:", e);
			}
			return express;
		}, (express) => express);
	}
};
var _expressIntegration = ((options) => {
	return {
		name: INTEGRATION_NAME$50,
		setupOnce() {
			instrumentExpress$1(options);
		},
		getShouldHandleError() {
			return options?.shouldHandleError;
		}
	};
});
var expressIntegration = defineIntegration(_expressIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/fastify/v3/enums/AttributeNames.js
var AttributeNames$7 = /* @__PURE__ */ ((AttributeNames2) => {
	AttributeNames2["FASTIFY_NAME"] = "fastify.name";
	AttributeNames2["FASTIFY_TYPE"] = "fastify.type";
	AttributeNames2["HOOK_NAME"] = "hook.name";
	AttributeNames2["PLUGIN_NAME"] = "plugin.name";
	return AttributeNames2;
})(AttributeNames$7 || {});
var FastifyTypes = /* @__PURE__ */ ((FastifyTypes2) => {
	FastifyTypes2["MIDDLEWARE"] = "middleware";
	FastifyTypes2["REQUEST_HANDLER"] = "request_handler";
	return FastifyTypes2;
})(FastifyTypes || {});
var FastifyNames = /* @__PURE__ */ ((FastifyNames2) => {
	FastifyNames2["MIDDLEWARE"] = "middleware";
	FastifyNames2["REQUEST_HANDLER"] = "request handler";
	return FastifyNames2;
})(FastifyNames || {});
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/fastify/v3/constants.js
var spanRequestSymbol = /* @__PURE__ */ Symbol("opentelemetry.instrumentation.fastify.request_active_span");
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/fastify/v3/utils.js
function startSpan$1(reply, tracer, spanName, spanAttributes = {}) {
	const span = tracer.startSpan(spanName, { attributes: spanAttributes });
	const spans = reply[spanRequestSymbol] || [];
	spans.push(span);
	Object.defineProperty(reply, spanRequestSymbol, {
		enumerable: false,
		configurable: true,
		value: spans
	});
	return span;
}
function endSpan$5(reply, err) {
	const spans = reply[spanRequestSymbol] || [];
	if (!spans.length) return;
	spans.forEach((span) => {
		if (err) {
			span.setStatus({
				code: import_src.SpanStatusCode.ERROR,
				message: err.message
			});
			span.recordException(err);
		}
		span.end();
	});
	delete reply[spanRequestSymbol];
}
function safeExecuteInTheMiddleMaybePromise(execute, onFinish, preventThrowingError) {
	let error;
	let result = void 0;
	try {
		result = execute();
		if (isPromise$2(result)) result.then((res) => onFinish(void 0, res), (err) => onFinish(err));
	} catch (e) {
		error = e;
	} finally {
		if (!isPromise$2(result)) {
			onFinish(error, result);
			if (error && true) throw error;
		}
		return result;
	}
}
function isPromise$2(val) {
	return typeof val === "object" && val && typeof Object.getOwnPropertyDescriptor(val, "then")?.value === "function" || false;
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/fastify/v3/instrumentation.js
var PACKAGE_NAME$20 = "@sentry/instrumentation-fastify-v3";
var ANONYMOUS_NAME$1 = "anonymous";
var hooksNamesToWrap = /* @__PURE__ */ new Set([
	"onTimeout",
	"onRequest",
	"preParsing",
	"preValidation",
	"preSerialization",
	"preHandler",
	"onSend",
	"onResponse",
	"onError"
]);
var FastifyInstrumentationV3 = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$20, SDK_VERSION, config);
	}
	init() {
		return [new InstrumentationNodeModuleDefinition("fastify", [">=3.0.0 <3.21.0"], (moduleExports) => {
			return this._patchConstructor(moduleExports);
		})];
	}
	_hookOnRequest() {
		const instrumentation = this;
		return function onRequest(request, reply, done) {
			if (!instrumentation.isEnabled()) return done();
			instrumentation._wrap(reply, "send", instrumentation._patchSend());
			const anyRequest = request;
			const routeName = anyRequest.routeOptions ? anyRequest.routeOptions.url : request.routerPath;
			if (routeName) setHttpServerSpanRouteAttribute$2(routeName);
			const method = request.method || "GET";
			getIsolationScope().setTransactionName(`${method} ${routeName}`);
			done();
		};
	}
	_wrapHandler(pluginName, hookName, original, syncFunctionWithDone) {
		const instrumentation = this;
		this._diag.debug("Patching fastify route.handler function");
		return function(...args) {
			if (!instrumentation.isEnabled()) return original.apply(this, args);
			const name = original.name || pluginName || ANONYMOUS_NAME$1;
			const spanName = `${FastifyNames.MIDDLEWARE} - ${name}`;
			const reply = args[1];
			const span = startSpan$1(reply, instrumentation.tracer, spanName, {
				[AttributeNames$7.FASTIFY_TYPE]: FastifyTypes.MIDDLEWARE,
				[AttributeNames$7.PLUGIN_NAME]: pluginName,
				[AttributeNames$7.HOOK_NAME]: hookName
			});
			const origDone = syncFunctionWithDone && args[args.length - 1];
			if (origDone) args[args.length - 1] = function(...doneArgs) {
				endSpan$5(reply);
				origDone.apply(this, doneArgs);
			};
			return import_src.context.with(import_src.trace.setSpan(import_src.context.active(), span), () => {
				return safeExecuteInTheMiddleMaybePromise(() => {
					return original.apply(this, args);
				}, (err) => {
					if (err instanceof Error) {
						span.setStatus({
							code: import_src.SpanStatusCode.ERROR,
							message: err.message
						});
						span.recordException(err);
					}
					if (!syncFunctionWithDone) endSpan$5(reply);
				});
			});
		};
	}
	_wrapAddHook() {
		const instrumentation = this;
		this._diag.debug("Patching fastify server.addHook function");
		return function(original) {
			return function wrappedAddHook(...args) {
				const name = args[0];
				const handler = args[1];
				const pluginName = this.pluginName;
				if (!hooksNamesToWrap.has(name)) return original.apply(this, args);
				const syncFunctionWithDone = typeof args[args.length - 1] === "function" && handler.constructor.name !== "AsyncFunction";
				return original.apply(this, [name, instrumentation._wrapHandler(pluginName, name, handler, syncFunctionWithDone)]);
			};
		};
	}
	_patchConstructor(moduleExports) {
		const instrumentation = this;
		function fastify(...args) {
			const app = moduleExports.fastify.apply(this, args);
			app.addHook("onRequest", instrumentation._hookOnRequest());
			app.addHook("preHandler", instrumentation._hookPreHandler());
			instrumentClient();
			instrumentation._wrap(app, "addHook", instrumentation._wrapAddHook());
			return app;
		}
		if (moduleExports.errorCodes !== void 0) fastify.errorCodes = moduleExports.errorCodes;
		fastify.fastify = fastify;
		fastify.default = fastify;
		return fastify;
	}
	_patchSend() {
		const instrumentation = this;
		this._diag.debug("Patching fastify reply.send function");
		return function patchSend(original) {
			return function send(...args) {
				const maybeError = args[0];
				if (!instrumentation.isEnabled()) return original.apply(this, args);
				return safeExecuteInTheMiddle(() => {
					return original.apply(this, args);
				}, (err) => {
					if (!err && maybeError instanceof Error) err = maybeError;
					endSpan$5(this, err);
				});
			};
		};
	}
	_hookPreHandler() {
		const instrumentation = this;
		this._diag.debug("Patching fastify preHandler function");
		return function preHandler(request, reply, done) {
			if (!instrumentation.isEnabled()) return done();
			const anyRequest = request;
			const handler = anyRequest.routeOptions?.handler || anyRequest.context?.handler;
			const handlerName = handler?.name.startsWith("bound ") ? handler.name.substring(6) : handler?.name;
			const spanName = `${FastifyNames.REQUEST_HANDLER} - ${handlerName || this.pluginName || ANONYMOUS_NAME$1}`;
			const spanAttributes = {
				[AttributeNames$7.PLUGIN_NAME]: this.pluginName,
				[AttributeNames$7.FASTIFY_TYPE]: FastifyTypes.REQUEST_HANDLER,
				[Ts]: anyRequest.routeOptions ? anyRequest.routeOptions.url : request.routerPath
			};
			if (handlerName) spanAttributes[AttributeNames$7.FASTIFY_NAME] = handlerName;
			const span = startSpan$1(reply, instrumentation.tracer, spanName, spanAttributes);
			addFastifyV3SpanAttributes(span);
			const { requestHook } = instrumentation.getConfig();
			if (requestHook) safeExecuteInTheMiddle(() => requestHook(span, { request }), (e) => {
				if (e) instrumentation._diag.error("request hook failed", e);
			}, true);
			return import_src.context.with(import_src.trace.setSpan(import_src.context.active(), span), () => {
				done();
			});
		};
	}
};
function instrumentClient() {
	const client = getClient();
	if (client) client.on("spanStart", (span) => {
		addFastifyV3SpanAttributes(span);
	});
}
function addFastifyV3SpanAttributes(span) {
	const attributes = spanToJSON(span).data;
	const type = attributes["fastify.type"];
	if (attributes["sentry.op"] || !type) return;
	span.setAttributes({
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.otel.fastify",
		[SEMANTIC_ATTRIBUTE_SENTRY_OP]: `${type}.fastify`
	});
	const name = attributes["fastify.name"] || attributes["plugin.name"] || attributes["hook.name"];
	if (typeof name === "string") {
		const updatedName = name.replace(/^fastify -> /, "").replace(/^@fastify\/otel -> /, "");
		span.updateName(updatedName);
	}
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/debug-build.js
var DEBUG_BUILD = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/tracing-channel.js
var NOOP$4 = () => {};
function bindTracingChannelToSpan(channel, getSpan, opts) {
	const handle = bindSpanToChannelStore(channel, getSpan, opts);
	const beforeSpanEnd = opts?.beforeSpanEnd;
	const deferSpanEnd = opts?.deferSpanEnd;
	const getErrorHint = (e) => {
		if (typeof opts?.captureError === "function") return opts.captureError(e);
		return { mechanism: {
			type: "auto.diagnostic_channels.bind_span",
			handled: false
		} };
	};
	const annotateSpanError = (span, error) => {
		if (opts?.captureError) captureException(error, getErrorHint(error));
		const { message, attributes } = getErrorInfo(error);
		span.setStatus({
			code: 2,
			message
		});
		span.setAttributes(attributes);
	};
	const makeDeferredEnd = (span, data) => {
		let ended = false;
		return (error) => {
			if (ended) return;
			ended = true;
			if (error !== void 0) annotateSpanError(span, error);
			endBoundSpan(data, beforeSpanEnd);
		};
	};
	const subscribers = {
		start: NOOP$4,
		asyncStart: NOOP$4,
		end(data) {
			if ("error" in data || "result" in data) {
				const span = data._sentrySpan;
				if (span && deferSpanEnd?.({
					span,
					data,
					end: makeDeferredEnd(span, data)
				})) return;
				endBoundSpan(data, beforeSpanEnd);
			}
		},
		error(data) {
			const span = data._sentrySpan;
			if (!span) return;
			annotateSpanError(span, data.error);
		},
		asyncEnd(data) {
			const span = data._sentrySpan;
			if (span && deferSpanEnd?.({
				span,
				data,
				end: makeDeferredEnd(span, data)
			})) return;
			endBoundSpan(data, beforeSpanEnd);
		}
	};
	handle.channel.subscribe(subscribers);
	return {
		channel: handle.channel,
		unbind: () => {
			handle.channel.unsubscribe(subscribers);
			handle.unbind();
		}
	};
}
function bindSpanToChannelStore(channel, getSpan, opts) {
	const binding = getAsyncContextStrategy(getMainCarrier()).getTracingChannelBinding?.();
	if (!binding) {
		DEBUG_BUILD && debug$3.log("[TracingChannel] Could not access async context binding.");
		return {
			channel,
			unbind: NOOP$4
		};
	}
	const asyncLocalStorage = binding.asyncLocalStorage;
	channel.start.bindStore(asyncLocalStorage, (data) => {
		data._sentryCallerStore = asyncLocalStorage.getStore();
		const span = !opts?.requiresParentSpan || getActiveSpan$1() ? getSpan(data) : void 0;
		if (!span) return data._sentryCallerStore;
		data._sentrySpan = span;
		return binding.getStoreWithActiveSpan(span);
	});
	channel.asyncStart.bindStore(asyncLocalStorage, (data) => {
		return data._sentryCallerStore;
	});
	return {
		channel,
		unbind: () => {
			channel.start.unbindStore(asyncLocalStorage);
			channel.asyncStart.unbindStore(asyncLocalStorage);
		}
	};
}
function endBoundSpan(data, beforeSpanEnd) {
	const span = data._sentrySpan;
	if (!span) return;
	beforeSpanEnd?.(span, data);
	span.end();
}
function getErrorInfo(error) {
	const errorIsObject = isObjectLike(error);
	const raw = errorIsObject ? "message" in error ? error.message : void 0 : error;
	const message = raw ? String(raw) : void 0;
	const type = errorIsObject && "name" in error ? String(error.name) : "unknown";
	return {
		message,
		attributes: { [Gn]: type }
	};
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/graphql/utils.js
var ORIGINAL_DESCRIPTION_ATTRIBUTE = "original-description";
var REDACTED_LITERAL_KINDS = /* @__PURE__ */ new Set([
	"Int",
	"Float",
	"String",
	"BlockString"
]);
function renameRootSpanWithOperation(span, operationType, operationName) {
	const rootSpan = getRootSpan$1(span);
	if (rootSpan === span) return;
	const rootSpanJson = spanToJSON(rootSpan);
	const newOperation = operationName ? `${operationType} ${operationName}` : operationType;
	const existingOperations = rootSpanJson.data[tc];
	let operations;
	if (Array.isArray(existingOperations)) operations = [...existingOperations, newOperation];
	else if (typeof existingOperations === "string") operations = [existingOperations, newOperation];
	else operations = newOperation;
	rootSpan.setAttribute(tc, operations);
	const originalDescription = rootSpanJson.data[ORIGINAL_DESCRIPTION_ATTRIBUTE] ?? rootSpanJson.description;
	if (!rootSpanJson.data[ORIGINAL_DESCRIPTION_ATTRIBUTE]) rootSpan.setAttribute(ORIGINAL_DESCRIPTION_ATTRIBUTE, originalDescription);
	rootSpan.updateName(`${originalDescription} (${getGraphqlOperationNamesFromAttribute$1(operations)})`);
}
function getGraphqlOperationNamesFromAttribute$1(attr) {
	if (Array.isArray(attr)) {
		const sorted = attr.slice().sort();
		if (sorted.length <= 5) return sorted.join(", ");
		return `${sorted.slice(0, 5).join(", ")}, +${sorted.length - 5}`;
	}
	return attr;
}
function getOperationSpanName(operationType, operationName, fallbackName) {
	if (operationType && operationName) return `${operationType} ${operationName}`;
	if (operationType) return operationType;
	return fallbackName;
}
function hasResultErrors(result) {
	if (isObjectLike(result) && "errors" in result) {
		const errors = result.errors;
		return Array.isArray(errors) && errors.length > 0;
	}
	return false;
}
function redactGraphqlDocument(document) {
	const loc = document?.loc;
	const body = loc?.source?.body;
	if (typeof body !== "string" || !loc?.startToken) return;
	try {
		const ranges = [];
		for (let token = loc.startToken; token; token = token.next) if (REDACTED_LITERAL_KINDS.has(token.kind)) ranges.push({
			start: token.start,
			end: token.end,
			kind: token.kind
		});
		let out = body;
		for (let i = ranges.length - 1; i >= 0; i--) {
			const { start, end, kind } = ranges[i];
			const replacement = kind === "String" || kind === "BlockString" ? "\"*\"" : "*";
			out = out.slice(0, start) + replacement + out.slice(end);
		}
		return out;
	} catch {
		return;
	}
}
function collectGraphqlDocument(document) {
	if (getClient()?.getDataCollectionOptions().graphQL.document !== true) return;
	return redactGraphqlDocument(document);
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/graphql/graphql-dc-subscriber.js
var GRAPHQL_DC_CHANNEL_PARSE = "graphql:parse";
var GRAPHQL_DC_CHANNEL_VALIDATE = "graphql:validate";
var GRAPHQL_DC_CHANNEL_EXECUTE = "graphql:execute";
var GRAPHQL_DC_CHANNEL_SUBSCRIBE = "graphql:subscribe";
var GRAPHQL_DC_CHANNEL_RESOLVE = "graphql:resolve";
var ORIGIN$31 = "auto.graphql.diagnostic_channel";
var SPAN_NAME_PARSE$1 = "graphql.parse";
var SPAN_NAME_VALIDATE$1 = "graphql.validate";
var SPAN_NAME_EXECUTE$1 = "graphql.execute";
var SPAN_NAME_SUBSCRIBE = "graphql.subscribe";
var SPAN_NAME_RESOLVE$1 = "graphql.resolve";
var GRAPHQL_FIELD_NAME$1 = "graphql.field.name";
var GRAPHQL_FIELD_PATH$1 = "graphql.field.path";
var GRAPHQL_FIELD_TYPE$1 = "graphql.field.type";
var GRAPHQL_PARENT_NAME$1 = "graphql.parent.name";
function subscribeGraphqlDiagnosticChannels(tracingChannel, options = {}) {
	const ignoreResolveSpans = options.ignoreResolveSpans !== false;
	const ignoreTrivialResolveSpans = options.ignoreTrivialResolveSpans !== false;
	const useOperationNameForRootSpan = options.useOperationNameForRootSpan !== false;
	setupParseChannel(tracingChannel);
	setupValidateChannel(tracingChannel);
	setupOperationChannel(tracingChannel, GRAPHQL_DC_CHANNEL_EXECUTE, SPAN_NAME_EXECUTE$1, useOperationNameForRootSpan);
	setupOperationChannel(tracingChannel, GRAPHQL_DC_CHANNEL_SUBSCRIBE, SPAN_NAME_SUBSCRIBE, useOperationNameForRootSpan);
	if (!ignoreResolveSpans) setupResolveChannel(tracingChannel, ignoreTrivialResolveSpans);
}
function setupParseChannel(tracingChannel) {
	bindTracingChannelToSpan(tracingChannel(GRAPHQL_DC_CHANNEL_PARSE), () => startInactiveSpan$1({
		name: SPAN_NAME_PARSE$1,
		attributes: {
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$31,
			[SEMANTIC_ATTRIBUTE_SENTRY_OP]: i_
		}
	}));
}
function setupValidateChannel(tracingChannel) {
	bindTracingChannelToSpan(tracingChannel(GRAPHQL_DC_CHANNEL_VALIDATE), (data) => {
		return startInactiveSpan$1({
			name: SPAN_NAME_VALIDATE$1,
			attributes: {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$31,
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: i_,
				[qa]: collectGraphqlDocument(data.document)
			}
		});
	}, { beforeSpanEnd: (span, data) => {
		if (Array.isArray(data.result) && data.result.length > 0) span.setStatus({
			code: 2,
			message: "invalid_argument"
		});
	} });
}
function setupOperationChannel(tracingChannel, channelName, fallbackName, useOperationNameForRootSpan) {
	bindTracingChannelToSpan(tracingChannel(channelName), (data) => {
		const span = startInactiveSpan$1({
			name: getOperationSpanName(data.operationType, data.operationName, fallbackName),
			attributes: {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$31,
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: i_,
				[Ya]: data.operationType,
				[Ga]: data.operationName || void 0,
				[qa]: collectGraphqlDocument(data.document)
			}
		});
		if (useOperationNameForRootSpan && data.operationType) renameRootSpanWithOperation(span, data.operationType, data.operationName);
		return span;
	}, { beforeSpanEnd: (span, data) => {
		if (hasResultErrors(data.result)) span.setStatus({
			code: 2,
			message: "internal_error"
		});
	} });
}
function setupResolveChannel(tracingChannel, ignoreTrivialResolveSpans) {
	bindTracingChannelToSpan(tracingChannel(GRAPHQL_DC_CHANNEL_RESOLVE), (data) => {
		if (ignoreTrivialResolveSpans && data.isDefaultResolver) return;
		return startInactiveSpan$1({
			name: `${SPAN_NAME_RESOLVE$1} ${data.fieldPath}`,
			attributes: {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$31,
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: i_,
				[GRAPHQL_FIELD_NAME$1]: data.fieldName,
				[GRAPHQL_FIELD_PATH$1]: data.fieldPath,
				[GRAPHQL_FIELD_TYPE$1]: data.fieldType,
				[GRAPHQL_PARENT_NAME$1]: data.parentType
			}
		});
	});
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/graphql/index.js
var _graphqlIntegration$1 = ((options = {}) => {
	return {
		name: "Graphql",
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			waitForTracingChannelBinding(() => {
				subscribeGraphqlDiagnosticChannels(diagnosticsChannel.tracingChannel, options);
			});
		}
	};
});
var graphqlIntegration$1 = defineIntegration(_graphqlIntegration$1);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/mongoose/mongoose-dc-subscriber.js
var MONGOOSE_DC_CHANNEL_QUERY = "mongoose:query";
var MONGOOSE_DC_CHANNEL_AGGREGATE = "mongoose:aggregate";
var MONGOOSE_DC_CHANNEL_MODEL_SAVE = "mongoose:model:save";
var MONGOOSE_DC_CHANNEL_MODEL_INSERT_MANY = "mongoose:model:insertMany";
var MONGOOSE_DC_CHANNEL_MODEL_BULK_WRITE = "mongoose:model:bulkWrite";
var MONGOOSE_DC_CHANNEL_CURSOR_NEXT = "mongoose:cursor:next";
var ORIGIN$30 = "auto.db.mongoose.diagnostic_channel";
var DB_SYSTEM_NAME_VALUE_MONGODB = "mongodb";
var MAX_REDACTION_DEPTH = 10;
var subscribed$8 = false;
function subscribeMongooseDiagnosticChannels(tracingChannel) {
	if (subscribed$8) return;
	subscribed$8 = true;
	try {
		setupChannel(tracingChannel, MONGOOSE_DC_CHANNEL_QUERY);
		setupChannel(tracingChannel, MONGOOSE_DC_CHANNEL_AGGREGATE);
		setupChannel(tracingChannel, MONGOOSE_DC_CHANNEL_MODEL_SAVE);
		setupChannel(tracingChannel, MONGOOSE_DC_CHANNEL_MODEL_INSERT_MANY);
		setupChannel(tracingChannel, MONGOOSE_DC_CHANNEL_MODEL_BULK_WRITE);
		setupChannel(tracingChannel, MONGOOSE_DC_CHANNEL_CURSOR_NEXT);
	} catch {
		DEBUG_BUILD && debug$3.log("Mongoose node:diagnostics_channel subscription failed.");
	}
}
function setupChannel(tracingChannel, channelName) {
	bindTracingChannelToSpan(tracingChannel(channelName), (data) => {
		const collection = data.collection;
		const queryText = redactMongoQuery(data.args?.pipeline ?? data.args?.filter);
		const batchSize = getBatchSize(data);
		return startInactiveSpan$1({
			name: collection ? `mongoose.${collection}.${data.operation}` : `mongoose.${data.operation}`,
			attributes: {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$30,
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "db",
				[jt]: DB_SYSTEM_NAME_VALUE_MONGODB,
				[Lt]: data.operation,
				[wt]: collection ?? void 0,
				[Ct]: data.database ?? void 0,
				[Gt]: queryText ?? void 0,
				[Dt]: batchSize ?? void 0,
				[au]: data.serverAddress ?? void 0,
				[ou]: data.serverPort ?? void 0
			}
		});
	});
}
function getBatchSize(data) {
	const args = data.args;
	const batch = data.operation === "insertMany" ? args?.docs : data.operation === "bulkWrite" ? args?.ops : void 0;
	return Array.isArray(batch) && batch.length > 1 ? batch.length : void 0;
}
function redactMongoQuery(value) {
	if (value == null) return;
	try {
		const redacted = redactValue(value, 0);
		const text = JSON.stringify(redacted);
		return text == null || text === "{}" || text === "[]" ? void 0 : text;
	} catch {
		return;
	}
}
function redactValue(value, depth) {
	if (depth > MAX_REDACTION_DEPTH) return "?";
	if (Array.isArray(value)) return value.map((item) => redactValue(item, depth + 1));
	if (isObjectLike(value)) {
		const out = {};
		for (const key of Object.keys(value)) out[key] = redactValue(value[key], depth + 1);
		return out;
	}
	return "?";
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/mongoose/index.js
var _mongooseIntegration$1 = (() => {
	return {
		name: "Mongoose",
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			waitForTracingChannelBinding(() => {
				subscribeMongooseDiagnosticChannels(diagnosticsChannel.tracingChannel);
			});
		}
	};
});
var mongooseIntegration$1 = defineIntegration(_mongooseIntegration$1);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/mongodb/mongodb-span.js
var ATTR_DB_SYSTEM$3 = "db.system";
var ATTR_DB_NAME$3 = "db.name";
var ATTR_DB_OPERATION$1 = "db.operation";
var ATTR_DB_STATEMENT$2 = "db.statement";
var ATTR_DB_MONGODB_COLLECTION$1 = "db.mongodb.collection";
var ATTR_DB_CONNECTION_STRING$8 = "db.connection_string";
var ATTR_NET_PEER_NAME$3 = "net.peer.name";
var ATTR_NET_PEER_PORT$3 = "net.peer.port";
var DB_SYSTEM_VALUE_MONGODB = "mongodb";
function serializeDbStatement(commandObj) {
	return JSON.stringify(scrubStatement(commandObj));
}
function scrubStatement(value) {
	if (Array.isArray(value)) return value.map((element) => scrubStatement(element));
	if (isCommandObj(value)) return Object.entries(value).map(([key, element]) => [key, scrubStatement(element)]).reduce((prev, current) => {
		if (isCommandEntry(current)) prev[current[0]] = current[1];
		return prev;
	}, {});
	return "?";
}
function isCommandObj(value) {
	return isObjectLike(value) && !isBuffer(value);
}
function isBuffer(value) {
	return typeof Buffer !== "undefined" && Buffer.isBuffer(value);
}
function isCommandEntry(value) {
	return Array.isArray(value);
}
function getV4SpanAttributes$1(connectionCtx, ns, command, operation, origin) {
	let host;
	let port;
	if (connectionCtx) {
		const hostParts = typeof connectionCtx.address === "string" ? connectionCtx.address.split(":") : "";
		if (hostParts.length === 2) {
			host = hostParts[0];
			port = hostParts[1];
		}
	}
	let commandObj;
	if (command?.documents?.[0]) commandObj = command.documents[0];
	else if (command?.cursors) commandObj = command.cursors;
	else commandObj = command;
	return getSpanAttributes(ns.db, ns.collection, host, port, commandObj, operation, origin);
}
function getSpanAttributes(dbName, dbCollection, host, port, commandObj, operation, origin) {
	const attributes = {
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: origin,
		[ATTR_DB_SYSTEM$3]: DB_SYSTEM_VALUE_MONGODB,
		[ATTR_DB_NAME$3]: dbName,
		[ATTR_DB_MONGODB_COLLECTION$1]: dbCollection,
		[ATTR_DB_OPERATION$1]: operation,
		[ATTR_DB_CONNECTION_STRING$8]: `mongodb://${host}:${port}/${dbName}`
	};
	if (host && port) {
		attributes[ATTR_NET_PEER_NAME$3] = host;
		const portNumber = parseInt(port, 10);
		if (!isNaN(portNumber)) attributes[ATTR_NET_PEER_PORT$3] = portNumber;
	}
	if (commandObj) try {
		attributes[ATTR_DB_STATEMENT$2] = serializeDbStatement(commandObj);
	} catch {}
	return attributes;
}
function getV3CommandOperation(command) {
	if (command.createIndexes !== void 0) return "createIndexes";
	else if (command.findandmodify !== void 0) return "findAndModify";
	else if (command.ismaster !== void 0) return "isMaster";
	else if (command.count !== void 0) return "count";
	else if (command.aggregate !== void 0) return "aggregate";
}
function getV3SpanAttributes$1(ns, topology, command, operation, origin) {
	let host;
	let port;
	if (topology?.s) {
		host = topology.s.options?.host ?? topology.s.host;
		port = (topology.s.options?.port ?? topology.s.port)?.toString();
		if (host == null || port == null) {
			const address = topology.description?.address;
			if (address) {
				const segments = address.split(":");
				host = segments[0];
				port = segments[1];
			}
		}
	}
	const [dbName, dbCollection] = ns.toString().split(".");
	const commandObj = command?.query ?? command?.q ?? command;
	return getSpanAttributes(dbName, dbCollection, host, port, commandObj, operation, origin);
}
function startMongoSpan(attributes) {
	return startInactiveSpan$1({
		name: `mongodb.${attributes[ATTR_DB_OPERATION$1] || "command"}`,
		op: "db",
		kind: SPAN_KIND.CLIENT,
		attributes
	});
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/mysql2/mysql2-dc-subscriber.js
var MYSQL2_DC_CHANNEL_QUERY = "mysql2:query";
var MYSQL2_DC_CHANNEL_EXECUTE = "mysql2:execute";
var MYSQL2_DC_CHANNEL_CONNECT = "mysql2:connect";
var MYSQL2_DC_CHANNEL_POOL_CONNECT = "mysql2:pool:connect";
var ORIGIN$29 = "auto.db.mysql2.diagnostic_channel";
var DB_SYSTEM_NAME_VALUE_MYSQL = "mysql";
var SQL_OPERATION_RE = /^\s*(\w+)/;
function subscribeMysql2DiagnosticChannels(tracingChannel) {
	setupQueryChannel(tracingChannel, MYSQL2_DC_CHANNEL_QUERY);
	setupQueryChannel(tracingChannel, MYSQL2_DC_CHANNEL_EXECUTE);
	setupConnectChannel$1(tracingChannel, MYSQL2_DC_CHANNEL_CONNECT, "mysql2.connect");
	setupConnectChannel$1(tracingChannel, MYSQL2_DC_CHANNEL_POOL_CONNECT, "mysql2.pool.connect");
}
function setupQueryChannel(tracingChannel, channelName) {
	bindTracingChannelToSpan(tracingChannel(channelName), (data) => {
		const queryText = data.query ? _sanitizeSqlQuery(data.query) : void 0;
		const operation = queryText?.match(SQL_OPERATION_RE)?.[1]?.toUpperCase();
		return startInactiveSpan$1({
			name: queryText || "mysql2.query",
			attributes: {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$29,
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "db",
				[jt]: DB_SYSTEM_NAME_VALUE_MYSQL,
				[Gt]: queryText,
				[Lt]: operation,
				[Ct]: data.database || void 0,
				[au]: data.serverAddress,
				[ou]: data.serverPort
			}
		});
	}, { requiresParentSpan: true });
}
function setupConnectChannel$1(tracingChannel, channelName, spanName) {
	bindTracingChannelToSpan(tracingChannel(channelName), (data) => {
		return startInactiveSpan$1({
			name: spanName,
			attributes: {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$29,
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "db",
				[jt]: DB_SYSTEM_NAME_VALUE_MYSQL,
				[Ct]: data.database || void 0,
				[au]: data.serverAddress,
				[ou]: data.serverPort
			}
		});
	}, { requiresParentSpan: true });
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/mysql2/index.js
var _mysql2Integration$1 = (() => {
	return {
		name: "Mysql2",
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			waitForTracingChannelBinding(() => {
				subscribeMysql2DiagnosticChannels(diagnosticsChannel.tracingChannel);
			});
		}
	};
});
var mysql2Integration$1 = defineIntegration(_mysql2Integration$1);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/prisma/global.js
var majorVersion = "7";
var GLOBAL_INSTRUMENTATION_KEY = "PRISMA_INSTRUMENTATION";
var GLOBAL_VERSIONED_INSTRUMENTATION_KEY = `V${majorVersion}_PRISMA_INSTRUMENTATION`;
var globalThisWithPrismaInstrumentation = globalThis;
function setGlobalTracingHelper(helper) {
	const globalValue = { helper };
	globalThisWithPrismaInstrumentation[GLOBAL_VERSIONED_INSTRUMENTATION_KEY] = globalValue;
	globalThisWithPrismaInstrumentation[GLOBAL_INSTRUMENTATION_KEY] = globalValue;
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/prisma/tracing-helper.js
var showAllTraces = (() => {
	try {
		return process.env.PRISMA_SHOW_ALL_TRACES === "true";
	} catch {
		return false;
	}
})();
var nonSampledTraceParent = `00-10-10-00`;
var PRISMA_ORIGIN = "auto.db.otel.prisma";
var MAX_TRACKED_PRISMA_SPANS = 1e3;
var prismaSpanRegistry = new LRUMap(MAX_TRACKED_PRISMA_SPANS);
var pendingEngineSpans = [];
function registerPrismaSpan(id, span) {
	prismaSpanRegistry.set(id, span);
}
function buildSpanAttributes(name, attributes) {
	const merged = {
		...attributes,
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: PRISMA_ORIGIN
	};
	if (name === "prisma:engine:db_query" && merged["db.system"] == null) merged[Kt] = "prisma";
	return merged;
}
function buildSpanName(name, attributes) {
	const queryText = attributes["db.query.text"];
	if ((name === "prisma:engine:db_query" || name === "prisma:client:db_query") && typeof queryText === "string") return queryText;
	return name;
}
function createResolvedEngineSpans() {
	let createdSpan = true;
	while (createdSpan) {
		createdSpan = false;
		for (let i = pendingEngineSpans.length - 1; i >= 0; i--) {
			const engineSpan = pendingEngineSpans[i];
			const parentSpan = prismaSpanRegistry.get(engineSpan.parent_span_id);
			if (!parentSpan) continue;
			const attributes = buildSpanAttributes(engineSpan.name, engineSpan.attributes);
			const span = startInactiveSpan$1({
				name: buildSpanName(engineSpan.name, attributes),
				attributes,
				kind: engineSpan.kind === "client" ? SPAN_KIND.CLIENT : SPAN_KIND.INTERNAL,
				startTime: engineSpan.start_time,
				parentSpan
			});
			registerPrismaSpan(engineSpan.span_id, span);
			if (engineSpan.links) span.addLinks(engineSpan.links.flatMap((link) => {
				const linkedSpan = prismaSpanRegistry.get(link.span_id);
				return linkedSpan ? [{ context: linkedSpan.spanContext() }] : [];
			}));
			span.end(engineSpan.end_time);
			pendingEngineSpans.splice(i, 1);
			createdSpan = true;
		}
	}
}
var ActiveTracingHelper = class {
	constructor({ ignoreSpanTypes }) {
		this.ignoreSpanTypes = ignoreSpanTypes;
	}
	isEnabled() {
		return true;
	}
	getTraceParent(span) {
		const spanContext = (span ?? getActiveSpan$1())?.spanContext();
		if (spanContext) return `00-${spanContext.traceId}-${spanContext.spanId}-0${spanContext.traceFlags}`;
		return nonSampledTraceParent;
	}
	dispatchEngineSpans(spans) {
		const linkIds = /* @__PURE__ */ new Map();
		const roots = spans.filter((span) => span.parentId === null);
		for (const root of roots) dispatchEngineSpan(root, spans, linkIds, this.ignoreSpanTypes);
	}
	/**
	* Prisma v5 broke the tracing helper interface with the v6 major, replacing `createEngineSpan` with
	* `dispatchEngineSpans`. We implement the v6/v7 interface (`dispatchEngineSpans`) but also keep this
	* v5-only method so the same helper doesn't blow up in Prisma 5 users' faces, minting v5 engine spans
	* through Sentry's span APIs instead of crashing.
	*/
	createEngineSpan(engineSpanEvent) {
		pendingEngineSpans.push(...engineSpanEvent.spans);
		createResolvedEngineSpans();
		const overflow = pendingEngineSpans.length - MAX_TRACKED_PRISMA_SPANS;
		if (overflow > 0) {
			DEBUG_BUILD && debug$3.log(`[Prisma] Dropping ${overflow} unresolved v5 engine span(s) whose parent was never registered.`);
			pendingEngineSpans.splice(0, overflow);
		}
	}
	getActiveContext() {
		return getActiveSpan$1();
	}
	runInChildSpan(nameOrOptions, callback) {
		const options = typeof nameOrOptions === "string" ? { name: nameOrOptions } : nameOrOptions;
		if (options.internal && !showAllTraces) return callback();
		const name = `prisma:client:${options.name}`;
		if (shouldIgnoreSpan(name, this.ignoreSpanTypes)) return callback();
		const parentSpan = getActiveSpan$1();
		const attributes = buildSpanAttributes(name, options.attributes);
		const spanOptions = {
			name: buildSpanName(name, attributes),
			attributes,
			kind: options.kind,
			links: options.links,
			startTime: options.startTime,
			parentSpan
		};
		if (options.active === false) {
			const span = startInactiveSpan$1(spanOptions);
			registerPrismaSpan(span.spanContext().spanId, span);
			return endSpan$4(span, () => callback(span, parentSpan));
		}
		return startSpanManual$1(spanOptions, (span) => {
			registerPrismaSpan(span.spanContext().spanId, span);
			return endSpan$4(span, () => callback(span, parentSpan));
		});
	}
};
function dispatchEngineSpan(engineSpan, allSpans, linkIds, ignoreSpanTypes) {
	if (shouldIgnoreSpan(engineSpan.name, ignoreSpanTypes)) return;
	const attributes = buildSpanAttributes(engineSpan.name, engineSpan.attributes);
	startSpanManual$1({
		name: buildSpanName(engineSpan.name, attributes),
		attributes,
		kind: engineSpan.kind === "client" ? SPAN_KIND.CLIENT : SPAN_KIND.INTERNAL,
		startTime: engineSpan.startTime
	}, (span) => {
		linkIds.set(engineSpan.id, span.spanContext().spanId);
		if (engineSpan.links) span.addLinks(engineSpan.links.flatMap((link) => {
			const linkedId = linkIds.get(link);
			if (!linkedId) return [];
			return { context: {
				spanId: linkedId,
				traceId: span.spanContext().traceId,
				traceFlags: span.spanContext().traceFlags
			} };
		}));
		const children = allSpans.filter((s) => s.parentId === engineSpan.id);
		for (const child of children) dispatchEngineSpan(child, allSpans, linkIds, ignoreSpanTypes);
		span.end(engineSpan.endTime);
	});
}
function endSpan$4(span, run) {
	let result;
	try {
		result = run();
	} catch (reason) {
		span.end();
		throw reason;
	}
	if (isPromiseLike(result)) return result.then((value) => {
		span.end();
		return value;
	}, (reason) => {
		span.end();
		throw reason;
	});
	span.end();
	return result;
}
function isPromiseLike(value) {
	return value != null && typeof value["then"] === "function";
}
function shouldIgnoreSpan(spanName, ignoreSpanTypes) {
	return ignoreSpanTypes.some((pattern) => typeof pattern === "string" ? pattern === spanName : pattern.test(spanName));
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/prisma/index.js
var INTEGRATION_NAME$49 = "Prisma";
function instrumentPrisma(options) {
	setGlobalTracingHelper(new ActiveTracingHelper({ ignoreSpanTypes: options?.instrumentationConfig?.ignoreSpanTypes ?? [] }));
}
var _prismaIntegration = ((options) => {
	return {
		name: INTEGRATION_NAME$49,
		setupOnce() {
			instrumentPrisma(options);
		}
	};
});
var prismaIntegration = defineIntegration(_prismaIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/redis/redis-dc-subscriber.js
var REDIS_DC_CHANNEL_COMMAND = "node-redis:command";
var REDIS_DC_CHANNEL_BATCH = "node-redis:batch";
var REDIS_DC_CHANNEL_CONNECT = "node-redis:connect";
var IOREDIS_DC_CHANNEL_COMMAND = "ioredis:command";
var IOREDIS_DC_CHANNEL_CONNECT = "ioredis:connect";
var ORIGIN$28 = "auto.db.redis.diagnostic_channel";
var DB_SYSTEM_NAME_VALUE_REDIS = "redis";
function subscribeRedisDiagnosticChannels(tracingChannel, responseHook) {
	setupCommandChannel(tracingChannel, REDIS_DC_CHANNEL_COMMAND, (data) => data.args.slice(1), responseHook);
	setupBatchChannel(tracingChannel, REDIS_DC_CHANNEL_BATCH, (data) => data.batchMode === "PIPELINE" ? "PIPELINE" : "MULTI");
	setupConnectChannel(tracingChannel, REDIS_DC_CHANNEL_CONNECT);
	setupCommandChannel(tracingChannel, IOREDIS_DC_CHANNEL_COMMAND, (data) => data.args, responseHook);
	setupConnectChannel(tracingChannel, IOREDIS_DC_CHANNEL_CONNECT);
}
function setupCommandChannel(tracingChannel, channelName, getCommandArgs, responseHook) {
	bindTracingChannelToSpan(tracingChannel(channelName), (data) => {
		const args = getCommandArgs(data);
		const statement = args.length ? `${data.command} ${args.join(" ")}` : data.command;
		return startInactiveSpan$1({
			name: `redis-${data.command}`,
			attributes: {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$28,
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "db.redis",
				[jt]: DB_SYSTEM_NAME_VALUE_REDIS,
				[Gt]: statement,
				...data.serverAddress != null ? { [au]: data.serverAddress } : {},
				...data.serverPort != null ? { [ou]: data.serverPort } : {}
			}
		});
	}, { beforeSpanEnd(span, data) {
		if ("error" in data) return;
		runResponseHook$3(responseHook, span, data.command, getCommandArgs(data), data.result);
	} });
}
function setupBatchChannel(tracingChannel, channelName, getOperationName) {
	bindTracingChannelToSpan(tracingChannel(channelName), (data) => {
		return startInactiveSpan$1({
			name: getOperationName(data),
			attributes: {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$28,
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "db.redis",
				[jt]: DB_SYSTEM_NAME_VALUE_REDIS,
				...Number(data.batchSize) > 1 ? { [Dt]: data.batchSize } : {},
				...data.serverAddress != null ? { [au]: data.serverAddress } : {},
				...data.serverPort != null ? { [ou]: data.serverPort } : {}
			}
		});
	});
}
function setupConnectChannel(tracingChannel, channelName) {
	bindTracingChannelToSpan(tracingChannel(channelName), (data) => {
		return startInactiveSpan$1({
			name: "redis-connect",
			attributes: {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$28,
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "db.redis.connect",
				[jt]: DB_SYSTEM_NAME_VALUE_REDIS,
				...data.serverAddress != null ? { [au]: data.serverAddress } : {},
				...data.serverPort != null ? { [ou]: data.serverPort } : {}
			}
		});
	});
}
function runResponseHook$3(hook, span, command, args, result) {
	if (!hook) return;
	try {
		hook(span, command, args, result);
	} catch {}
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/redis/index.js
var _redisIntegration$1 = ((options = {}) => {
	return {
		name: "Redis",
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			waitForTracingChannelBinding(() => {
				subscribeRedisDiagnosticChannels(diagnosticsChannel.tracingChannel, options.responseHook);
			});
		}
	};
});
var redisIntegration$1 = defineIntegration(_redisIntegration$1);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/redis/redis-statement-serializer.js
var serializationSubsets = [
	{
		regex: /^ECHO/i,
		args: 0
	},
	{
		regex: /^(LPUSH|MSET|PFA|PUBLISH|RPUSH|SADD|SET|SPUBLISH|XADD|ZADD)/i,
		args: 1
	},
	{
		regex: /^(HSET|HMSET|LSET|LINSERT)/i,
		args: 2
	},
	{
		regex: /^(ACL|BIT|B[LRZ]|CLIENT|CLUSTER|CONFIG|COMMAND|DECR|DEL|EVAL|EX|FUNCTION|GEO|GET|HINCR|HMGET|HSCAN|INCR|L[TRLM]|MEMORY|P[EFISTU]|RPOP|S[CDIMORSU]|XACK|X[CDGILPRT]|Z[CDILMPRS])/i,
		args: -1
	}
];
var defaultDbStatementSerializer = (cmdName, cmdArgs) => {
	if (Array.isArray(cmdArgs) && cmdArgs.length) {
		const nArgsToSerialize = serializationSubsets.find(({ regex }) => regex.test(cmdName))?.args ?? 0;
		const argsToSerialize = nArgsToSerialize >= 0 ? cmdArgs.slice(0, nArgsToSerialize) : cmdArgs.slice();
		if (cmdArgs.length > argsToSerialize.length) argsToSerialize.push(`[${cmdArgs.length - nArgsToSerialize} other arguments]`);
		return `${cmdName} ${argsToSerialize.join(" ")}`;
	}
	return cmdName;
};
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vercel-ai/util.js
function asString(value) {
	return typeof value === "string" ? value : void 0;
}
function asNumber(value) {
	return typeof value === "number" && !isNaN(value) ? value : void 0;
}
function sum(a, b) {
	return a === void 0 && b === void 0 ? void 0 : (a ?? 0) + (b ?? 0);
}
function isReadableStream(value) {
	return isObjectLike(value) && typeof value.pipeThrough === "function" && typeof value.getReader === "function";
}
function tapModelCallStream(stream, onFinal, onError) {
	const reader = stream.getReader();
	const state = { toolCalls: [] };
	let text = "";
	let settled = false;
	const finalize = () => {
		if (settled) return;
		settled = true;
		if (text) state.text = text;
		onFinal(state);
	};
	const fail = (error) => {
		if (settled) return;
		settled = true;
		onError(error);
	};
	return new ReadableStream({
		async pull(controller) {
			try {
				const { done, value } = await reader.read();
				if (done) {
					finalize();
					controller.close();
					return;
				}
				text += accumulateChunk(state, value) ?? "";
				controller.enqueue(value);
			} catch (error) {
				fail(error);
				controller.error(error);
			}
		},
		cancel(reason) {
			finalize();
			return reader.cancel(reason);
		}
	});
}
function accumulateChunk(state, chunk) {
	if (!isObjectLike(chunk)) return;
	const { type, delta, textDelta, id, modelId, toolCallId, toolName, input, args, finishReason, usage, providerMetadata } = chunk;
	switch (type) {
		case "text-delta": {
			const textChunk = delta ?? textDelta;
			return typeof textChunk === "string" ? textChunk : void 0;
		}
		case "tool-call":
			state.toolCalls.push({
				toolCallId,
				toolName,
				input: input ?? args
			});
			return;
		case "response-metadata":
			if (typeof id === "string") state.responseId = id;
			if (typeof modelId === "string") state.responseModel = modelId;
			return;
		case "finish":
			state.finishReason = finishReason;
			state.usage = usage;
			if (providerMetadata !== void 0) state.providerMetadata = providerMetadata;
			return;
		default: return;
	}
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vercel-ai/vercel-ai-dc-subscriber.js
var AI_SDK_TELEMETRY_TRACING_CHANNEL = "ai:telemetry";
var ORIGIN$27 = "auto.vercelai.channel";
var GEN_AI_TOOL_CALL_ID_ATTRIBUTE = "gen_ai.tool.call.id";
var GEN_AI_TOOL_DESCRIPTION_ATTRIBUTE = "gen_ai.tool.description";
var GEN_AI_EMBEDDINGS_OPERATION = "embeddings";
var GEN_AI_RERANK_OPERATION = "rerank";
var GEN_AI_GENERATE_CONTENT_OPERATION = "generate_content";
var WORKERS_AI_INTEGRATION_NAME = "WorkersAI";
var VERCEL_AI_OPERATION_ID_ATTRIBUTE = "vercel.ai.operationId";
var VERCEL_AI_MODEL_PROVIDER_ATTRIBUTE = "vercel.ai.model.provider";
var VERCEL_AI_SETTINGS_MAX_RETRIES_ATTRIBUTE = "vercel.ai.settings.maxRetries";
var operationIdByCallId = /* @__PURE__ */ new Map();
var toolDescriptionsByCallId = /* @__PURE__ */ new Map();
var invokeAgentSpanByCallId = /* @__PURE__ */ new Map();
var ROOT_OPERATION_TYPES = /* @__PURE__ */ new Set([
	"generateText",
	"streamText",
	"generateObject",
	"embed",
	"embedMany",
	"rerank"
]);
function clearOperationId(data) {
	if (!ROOT_OPERATION_TYPES.has(data.type)) return;
	const callId = asString(data.event.callId);
	if (callId) clearOperationCallId(callId);
}
function clearOperationCallId(callId) {
	operationIdByCallId.delete(callId);
	toolDescriptionsByCallId.delete(callId);
	invokeAgentSpanByCallId.delete(callId);
}
function dropLastStepOnlyUsage(providerAttributes, type) {
	if (!ROOT_OPERATION_TYPES.has(type)) return;
	for (const key of LAST_STEP_ONLY_USAGE_KEYS) delete providerAttributes[key];
}
function recordToolDescriptions(callId, tools) {
	if (!callId || !Array.isArray(tools)) return;
	let descriptions = toolDescriptionsByCallId.get(callId);
	for (const tool of tools) if (isObjectLike(tool) && typeof tool.name === "string" && typeof tool.description === "string") {
		descriptions = descriptions ?? /* @__PURE__ */ new Map();
		if (!descriptions.has(tool.name)) descriptions.set(tool.name, tool.description);
	}
	if (descriptions) toolDescriptionsByCallId.set(callId, descriptions);
}
function resolveToolDescription(callId, toolName, tools) {
	const fromMap = callId ? toolDescriptionsByCallId.get(callId)?.get(toolName) : void 0;
	if (fromMap) return fromMap;
	if (Array.isArray(tools)) {
		const match = tools.find((tool) => isObjectLike(tool) && tool.name === toolName);
		return isObjectLike(match) ? asString(match.description) : void 0;
	}
	if (isObjectLike(tools)) {
		const tool = tools[toolName];
		return isObjectLike(tool) ? asString(tool.description) : void 0;
	}
}
function subscribeVercelAiTracingChannel(tracingChannel, options = {}) {
	bindTracingChannelToSpan(tracingChannel(AI_SDK_TELEMETRY_TRACING_CHANNEL), (data) => createSpanFromMessage(data, options), {
		beforeSpanEnd: (span, data) => {
			enrichSpanOnEnd(span, data, options);
			clearOperationId(data);
		},
		deferSpanEnd: ({ data, end }) => deferStreamedModelCallEnd(data, options, end)
	});
}
function deferStreamedModelCallEnd(data, options, end) {
	if (data.type !== "languageModelCall" || !isObjectLike(data.result)) return false;
	const result = data.result;
	const stream = result.stream;
	if (!isReadableStream(stream)) return false;
	const callId = asString(data.event.callId);
	const { recordOutputs } = getRecordingOptions(data.event, options);
	result.stream = tapModelCallStream(stream, (final) => {
		data.result = {
			...result,
			...streamedResultToChannelResult(final)
		};
		end();
		enrichInvokeAgentFromStream(callId, final, recordOutputs);
	}, (error) => end(error));
	return true;
}
function streamedResultToChannelResult(final) {
	const content = [];
	if (final.text) content.push({
		type: "text",
		text: final.text
	});
	for (const toolCall of final.toolCalls) content.push({
		type: "tool-call",
		...toolCall
	});
	return {
		content,
		...final.usage !== void 0 ? { usage: final.usage } : {},
		...final.finishReason !== void 0 ? { finishReason: final.finishReason } : {},
		...final.providerMetadata !== void 0 ? { providerMetadata: final.providerMetadata } : {},
		...final.responseId || final.responseModel ? { response: {
			...final.responseId ? { id: final.responseId } : {},
			...final.responseModel ? { modelId: final.responseModel } : {}
		} } : {}
	};
}
function enrichInvokeAgentFromStream(callId, final, recordOutputs) {
	const span = callId ? invokeAgentSpanByCallId.get(callId) : void 0;
	if (!span) return;
	const usage = isObjectLike(final.usage) ? final.usage : void 0;
	if (usage) {
		const input = tokenCount(usage.inputTokens) ?? tokenCount(usage.promptTokens) ?? tokenCount(usage.tokens);
		const output = tokenCount(usage.outputTokens) ?? tokenCount(usage.completionTokens);
		addTokensToSpan(span, Ra, input);
		addTokensToSpan(span, Pa, output);
		addTokensToSpan(span, Ma, tokenCount(usage.totalTokens) ?? sum(input, output));
	}
	if (recordOutputs) {
		const outputMessages = buildOutputMessages(partsFromTextAndToolCalls(final.text, final.toolCalls), getFinishReason({ finishReason: final.finishReason }));
		if (outputMessages) span.setAttribute(Fr, outputMessages);
	}
}
function addTokensToSpan(span, attribute, value) {
	if (value === void 0) return;
	const current = spanToJSON(span).data[attribute];
	span.setAttribute(attribute, (typeof current === "number" ? current : 0) + value);
}
function createSpanFromMessage(data, channelOptions) {
	const { type, event } = data;
	if (type === "step" || !event || typeof event !== "object") return;
	const { recordInputs, enableTruncation } = getRecordingOptions(event, channelOptions);
	const provider = asString(event.provider);
	const modelId = asString(event.modelId);
	const callId = asString(event.callId);
	const maxRetries = asNumber(event.maxRetries);
	if (recordInputs) recordToolDescriptions(callId, event.tools);
	const baseAttributes = {
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$27,
		...provider ? {
			[ma]: provider,
			[VERCEL_AI_MODEL_PROVIDER_ATTRIBUTE]: provider
		} : {},
		...modelId ? { [Zr]: modelId } : {},
		...maxRetries !== void 0 ? { [VERCEL_AI_SETTINGS_MAX_RETRIES_ATTRIBUTE]: maxRetries } : {}
	};
	switch (type) {
		case "generateText":
		case "streamText":
		case "generateObject": return buildInvokeAgentSpan(event, baseAttributes, recordInputs, enableTruncation, callId, type === "streamText");
		case "languageModelCall":
			_INTERNAL_skipAiProviderWrapping([WORKERS_AI_INTEGRATION_NAME]);
			return buildModelCallSpan(event, baseAttributes, recordInputs, enableTruncation, callId, modelId);
		case "executeTool": return buildToolSpan(event, recordInputs);
		case "embed":
		case "embedMany": {
			const input = type === "embedMany" ? event.values : event.value;
			return startGenAiSpan(GEN_AI_EMBEDDINGS_OPERATION, modelId, {
				...baseAttributes,
				...recordInputs && input !== void 0 ? { [qr]: stringify(input) } : {}
			});
		}
		case "rerank": return startGenAiSpan(GEN_AI_RERANK_OPERATION, modelId, baseAttributes);
		default: return;
	}
}
function startGenAiSpan(operation, suffix, attributes) {
	return startInactiveSpan$1({
		name: suffix ? `${operation} ${suffix}` : operation,
		op: `gen_ai.${operation}`,
		attributes: {
			[Vr]: operation,
			...attributes
		}
	});
}
function buildInvokeAgentSpan(event, baseAttributes, recordInputs, enableTruncation, callId, isStream) {
	const functionId = asString(event.functionId);
	const operationId = asString(event.operationId) ?? (isStream ? "ai.streamText" : "ai.generateText");
	if (callId) operationIdByCallId.set(callId, {
		operationId,
		isStream
	});
	const span = startGenAiSpan(k, functionId, {
		...baseAttributes,
		[VERCEL_AI_OPERATION_ID_ATTRIBUTE]: operationId,
		[pa]: isStream,
		...functionId ? { [Gr]: functionId } : {},
		...recordInputs ? buildInputMessageAttributes(event, enableTruncation) : {}
	});
	if (isStream && callId) invokeAgentSpanByCallId.set(callId, span);
	return span;
}
function buildModelCallSpan(event, baseAttributes, recordInputs, enableTruncation, callId, modelId) {
	const parent = callId ? operationIdByCallId.get(callId) : void 0;
	const operationId = parent ? `${parent.operationId}.${parent.isStream ? "doStream" : "doGenerate"}` : "ai.generateText.doGenerate";
	return startGenAiSpan(GEN_AI_GENERATE_CONTENT_OPERATION, modelId, {
		...baseAttributes,
		[VERCEL_AI_OPERATION_ID_ATTRIBUTE]: operationId,
		...recordInputs ? buildInputMessageAttributes(event, enableTruncation) : {},
		...recordInputs && Array.isArray(event.tools) ? { [jr]: stringify(event.tools) } : {}
	});
}
function buildToolSpan(event, recordInputs) {
	const toolCall = isObjectLike(event.toolCall) ? event.toolCall : {};
	const toolName = asString(toolCall.toolName);
	const toolCallId = asString(event.toolCallId) ?? asString(toolCall.toolCallId);
	const toolInput = toolCall.input ?? toolCall.args;
	const description = recordInputs && toolName ? resolveToolDescription(asString(event.callId), toolName, event.tools) : void 0;
	return startGenAiSpan(b, toolName, {
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$27,
		[ka]: "function",
		...toolName ? { [Ia]: toolName } : {},
		...toolCallId ? { [GEN_AI_TOOL_CALL_ID_ATTRIBUTE]: toolCallId } : {},
		...description ? { [GEN_AI_TOOL_DESCRIPTION_ATTRIBUTE]: description } : {},
		...recordInputs && toolInput !== void 0 ? { [Ea]: stringify(toolInput) } : {}
	});
}
function enrichSpanOnEnd(span, data, channelOptions) {
	const { type, result } = data;
	if (!isObjectLike(result)) return;
	const { recordOutputs } = getRecordingOptions(data.event, channelOptions);
	if (type === "executeTool") {
		if (recordOutputs) span.setAttribute(Oa, stringify(result.output ?? result));
		const output = isObjectLike(result.output) ? result.output : void 0;
		if (output?.type === "tool-error") captureToolError(span, data, output.error);
		return;
	}
	const usage = isObjectLike(result.usage) ? result.usage : void 0;
	if (usage) {
		const inputTokens = tokenCount(usage.inputTokens) ?? tokenCount(usage.promptTokens) ?? tokenCount(usage.tokens);
		const outputTokens = tokenCount(usage.outputTokens) ?? tokenCount(usage.completionTokens);
		const totalTokens = tokenCount(usage.totalTokens) ?? sum(inputTokens, outputTokens);
		if (inputTokens !== void 0) span.setAttribute(Ra, inputTokens);
		if (outputTokens !== void 0) span.setAttribute(Pa, outputTokens);
		if (totalTokens !== void 0) span.setAttribute(Ma, totalTokens);
	}
	const finishReason = getFinishReason(result);
	if (finishReason && type === "languageModelCall") span.setAttribute(sa, stringify([finishReason]));
	const response = isObjectLike(result.response) ? result.response : void 0;
	const responseId = asString(response?.id) ?? asString(result.responseId);
	if (responseId) span.setAttribute(oa, responseId);
	const responseModel = asString(response?.modelId) ?? asString(data.event.modelId);
	if (responseModel) span.setAttribute(la, responseModel);
	const providerMetadata = result.providerMetadata;
	const providerAttributes = getProviderMetadataAttributes(providerMetadata);
	if ("gen_ai.conversation.id" in providerAttributes && spanToJSON(span).data["gen_ai.conversation.id"]) delete providerAttributes[GEN_AI_CONVERSATION_ID_ATTRIBUTE];
	dropLastStepOnlyUsage(providerAttributes, type);
	span.setAttributes(providerAttributes);
	if (recordOutputs) {
		const outputMessages = buildOutputMessages(type === "languageModelCall" && Array.isArray(result.content) ? partsFromContent(result.content) : partsFromTextAndToolCalls(result.text, result.toolCalls), finishReason);
		if (outputMessages) span.setAttribute(Fr, outputMessages);
	}
}
function normalizeFinishReason(finishReason) {
	return finishReason === "tool-calls" ? "tool_call" : finishReason ?? "stop";
}
function getFinishReason(result) {
	const finishReason = result.finishReason;
	if (typeof finishReason === "string") return finishReason;
	return isObjectLike(finishReason) ? asString(finishReason.unified) : void 0;
}
function tokenCount(value) {
	return asNumber(value) ?? (isObjectLike(value) ? asNumber(value.total) : void 0);
}
function buildOutputMessages(parts, finishReason) {
	if (!parts.length) return;
	return stringify([{
		role: "assistant",
		parts,
		finish_reason: normalizeFinishReason(finishReason)
	}]);
}
function toolCallPart(toolCall) {
	const args = toolCall.input ?? toolCall.args;
	return {
		type: "tool_call",
		id: asString(toolCall.toolCallId),
		name: asString(toolCall.toolName),
		arguments: typeof args === "string" ? args : stringify(args ?? {})
	};
}
function partsFromContent(content) {
	const parts = [];
	for (const item of content) {
		if (!isObjectLike(item)) continue;
		if (item.type === "text" && typeof item.text === "string") parts.push({
			type: "text",
			content: item.text
		});
		else if (item.type === "tool-call") parts.push(toolCallPart(item));
	}
	return parts;
}
function partsFromTextAndToolCalls(text, toolCalls) {
	const parts = [];
	if (typeof text === "string" && text.length) parts.push({
		type: "text",
		content: text
	});
	if (Array.isArray(toolCalls)) {
		for (const toolCall of toolCalls) if (isObjectLike(toolCall)) parts.push(toolCallPart(toolCall));
	}
	return parts;
}
function captureToolError(span, data, error) {
	span.setStatus({
		code: 2,
		message: error instanceof Error ? error.message : "tool_error"
	});
	const toolCall = isObjectLike(data.event.toolCall) ? data.event.toolCall : {};
	const toolName = asString(toolCall.toolName);
	const toolCallId = asString(data.event.toolCallId) ?? asString(toolCall.toolCallId);
	withScope((scope) => {
		scope.setContext("trace", spanToTraceContext(span));
		if (toolName) scope.setTag("vercel.ai.tool.name", toolName);
		if (toolCallId) scope.setTag("vercel.ai.tool.callId", toolCallId);
		scope.setLevel("error");
		captureException(error instanceof Error ? error : new Error(typeof error === "string" ? error : "Tool execution failed"), { mechanism: {
			type: "auto.vercelai.channel",
			handled: false
		} });
	});
}
function getRecordingOptions(event, channelOptions) {
	const genAI = getClient()?.getDataCollectionOptions().genAI;
	return {
		recordInputs: resolveRecording(channelOptions.recordInputs, event.recordInputs, genAI?.inputs),
		recordOutputs: resolveRecording(channelOptions.recordOutputs, event.recordOutputs, genAI?.outputs),
		enableTruncation: shouldEnableTruncation(channelOptions.enableTruncation)
	};
}
function resolveRecording(integrationOption, perCallOption, globalDefault) {
	if (typeof integrationOption === "boolean") return integrationOption;
	if (typeof perCallOption === "boolean") return perCallOption;
	return globalDefault === true;
}
function buildInputMessageAttributes(event, enableTruncation) {
	const attributes = {};
	const instructions = asString(event.instructions);
	if (instructions) attributes[GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE] = stringify([{
		type: "text",
		content: instructions
	}]);
	const messages = event.messages ?? event.prompt;
	if (messages !== void 0) {
		attributes[Yr] = enableTruncation ? getTruncatedJsonString(messages) : stringify(messages);
		attributes[GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE] = Array.isArray(messages) ? messages.length : 1;
	}
	return attributes;
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vercel-ai/index.js
var _vercelAiIntegration = ((options = {}) => {
	return {
		name: "VercelAI",
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			waitForTracingChannelBinding(() => {
				subscribeVercelAiTracingChannel(diagnosticsChannel.tracingChannel, options);
			});
		}
	};
});
var vercelAiIntegration = defineIntegration(_vercelAiIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/fastify/instrumentation.js
var PACKAGE_NAME$19 = "@sentry/instrumentation-fastify";
var SUPPORTED_VERSIONS$4 = ">=3.21.0 <6";
var ORIGIN$26 = "auto.http.otel.fastify";
var HOOK_OP = "hook.fastify";
var REQUEST_HANDLER_OP = "request_handler.fastify";
var FASTIFY_HOOKS = [
	"onRequest",
	"preParsing",
	"preValidation",
	"preHandler",
	"preSerialization",
	"onSend",
	"onResponse",
	"onError"
];
var ATTRIBUTE_HOOK_NAME = "hook.name";
var ATTRIBUTE_FASTIFY_TYPE = "fastify.type";
var ATTRIBUTE_HOOK_CALLBACK_NAME = "hook.callback.name";
var ATTRIBUTE_FASTIFY_ROOT = "fastify.root";
var HOOK_TYPE_ROUTE = "route-hook";
var HOOK_TYPE_INSTANCE = "hook";
var HOOK_TYPE_HANDLER = "request-handler";
var ANONYMOUS_FUNCTION_NAME = "anonymous";
var kRequestSpan = /* @__PURE__ */ Symbol("sentry fastify request span");
var kAddHookOriginal = /* @__PURE__ */ Symbol("sentry fastify addHook original");
var kSetNotFoundOriginal = /* @__PURE__ */ Symbol("sentry fastify setNotFoundHandler original");
function getRequestRouteUrl(request) {
	return request.routeOptions?.url ?? request.routerPath;
}
function getRequestRouteConfig(request) {
	return request.routeOptions?.config ?? request.routeConfig;
}
function isFastifyRequest(arg) {
	return isObjectLike(arg) && !!arg.method && !!arg.url && (!!arg.routeOptions || "routerPath" in arg);
}
function fastifyOtelPlugin(instance, _opts, done) {
	instance.decorate(kAddHookOriginal, instance.addHook);
	instance.decorate(kSetNotFoundOriginal, instance.setNotFoundHandler);
	instance.decorateRequest("opentelemetry", function opentelemetry() {
		return { span: this[kRequestSpan] };
	});
	instance.decorateRequest(kRequestSpan, null);
	instance.addHook("onRoute", otelWireRoute);
	instance.addHook("onRequest", startRequestSpanHook);
	instance.addHook("onResponse", finalizeNotFoundSpanHook);
	instance.addHook = addHookPatched;
	instance.setNotFoundHandler = setNotFoundHandlerPatched;
	done();
}
var pluginSymbols = fastifyOtelPlugin;
pluginSymbols[/* @__PURE__ */ Symbol.for("skip-override")] = true;
pluginSymbols[/* @__PURE__ */ Symbol.for("fastify.display-name")] = PACKAGE_NAME$19;
pluginSymbols[/* @__PURE__ */ Symbol.for("plugin-meta")] = {
	fastify: SUPPORTED_VERSIONS$4,
	name: PACKAGE_NAME$19
};
function otelWireRoute(routeOptions) {
	if (routeOptions.config?.otel === false) return;
	for (const hook of FASTIFY_HOOKS) {
		const handlerLike = routeOptions[hook];
		if (typeof handlerLike === "function") routeOptions[hook] = handlerWrapper(handlerLike, hook, routeHookAttributes(this.pluginName, hook, handlerLike, routeOptions.url));
		else if (Array.isArray(handlerLike)) routeOptions[hook] = handlerLike.map((handler) => handlerWrapper(handler, hook, routeHookAttributes(this.pluginName, hook, handler, routeOptions.url)));
	}
	routeOptions.onSend = appendRouteHook(routeOptions.onSend, finalizeResponseSpanHook);
	routeOptions.onError = appendRouteHook(routeOptions.onError, recordErrorInSpanHook);
	routeOptions.handler = handlerWrapper(routeOptions.handler, "handler", {
		[ATTRIBUTE_HOOK_NAME]: `${this.pluginName} - route-handler`,
		[ATTRIBUTE_FASTIFY_TYPE]: HOOK_TYPE_HANDLER,
		[Ts]: routeOptions.url,
		[ATTRIBUTE_HOOK_CALLBACK_NAME]: routeOptions.handler.name.length > 0 ? routeOptions.handler.name : ANONYMOUS_FUNCTION_NAME
	});
}
function routeHookAttributes(pluginName, hook, handler, url) {
	return {
		[ATTRIBUTE_HOOK_NAME]: `${pluginName} - route -> ${hook}`,
		[ATTRIBUTE_FASTIFY_TYPE]: HOOK_TYPE_ROUTE,
		[Ts]: url,
		[ATTRIBUTE_HOOK_CALLBACK_NAME]: handler.name?.length > 0 ? handler.name : ANONYMOUS_FUNCTION_NAME
	};
}
function appendRouteHook(existing, hook) {
	if (existing == null) return hook;
	return Array.isArray(existing) ? [...existing, hook] : [existing, hook];
}
function startRequestSpanHook(request, _reply, hookDone) {
	if (getRequestRouteConfig(request)?.otel === false) return hookDone();
	const attributes = {
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$26,
		[ATTRIBUTE_FASTIFY_ROOT]: PACKAGE_NAME$19,
		[ns]: request.method,
		[Vu]: request.url
	};
	const route = getRequestRouteUrl(request);
	if (route != null) {
		attributes[Ts] = route;
		const activeSpan = getActiveSpan$1();
		const rootSpan = activeSpan && getRootSpan$1(activeSpan);
		if (rootSpan && spanToJSON(rootSpan).data["sentry.op"] === "http.server") rootSpan.setAttribute(Ts, route);
	}
	const requestSpan = startInactiveSpan$1({
		name: "request",
		op: REQUEST_HANDLER_OP,
		attributes
	});
	request[kRequestSpan] = requestSpan;
	withActiveSpan$1(requestSpan, () => {
		hookDone();
	});
}
function finalizeNotFoundSpanHook(request, reply, hookDone) {
	const span = request[kRequestSpan];
	if (span != null) {
		span.setAttributes({ [Ss]: reply.statusCode });
		span.end();
	}
	request[kRequestSpan] = null;
	hookDone();
}
function finalizeResponseSpanHook(request, reply, payload, hookDone) {
	const span = request[kRequestSpan];
	if (span != null) {
		if (reply.statusCode >= 500) span.setStatus({ code: 2 });
		span.setAttributes({ [Ss]: reply.statusCode });
		span.end();
	}
	request[kRequestSpan] = null;
	hookDone(null, payload);
}
function recordErrorInSpanHook(request, _reply, error, hookDone) {
	const span = request[kRequestSpan];
	if (span != null) span.setStatus({
		code: 2,
		message: error.message
	});
	hookDone();
}
function addHookPatched(name, hook) {
	const addHookOriginal = this[kAddHookOriginal];
	if (FASTIFY_HOOKS.includes(name)) return addHookOriginal.call(this, name, handlerWrapper(hook, name, {
		[ATTRIBUTE_HOOK_NAME]: `${this.pluginName} - ${name}`,
		[ATTRIBUTE_FASTIFY_TYPE]: HOOK_TYPE_INSTANCE,
		[ATTRIBUTE_HOOK_CALLBACK_NAME]: hook.name?.length > 0 ? hook.name : ANONYMOUS_FUNCTION_NAME
	}));
	return addHookOriginal.call(this, name, hook);
}
function setNotFoundHandlerPatched(hooks, handler) {
	const setNotFoundHandlerOriginal = this[kSetNotFoundOriginal];
	if (typeof hooks === "function") {
		setNotFoundHandlerOriginal.call(this, handlerWrapper(hooks, "notFoundHandler", {
			[ATTRIBUTE_HOOK_NAME]: `${this.pluginName} - not-found-handler`,
			[ATTRIBUTE_FASTIFY_TYPE]: HOOK_TYPE_INSTANCE,
			[ATTRIBUTE_HOOK_CALLBACK_NAME]: hooks.name?.length > 0 ? hooks.name : ANONYMOUS_FUNCTION_NAME
		}));
		return;
	}
	if (hooks.preValidation != null) hooks.preValidation = handlerWrapper(hooks.preValidation, "notFoundHandler - preValidation", {
		[ATTRIBUTE_HOOK_NAME]: `${this.pluginName} - not-found-handler - preValidation`,
		[ATTRIBUTE_FASTIFY_TYPE]: HOOK_TYPE_INSTANCE,
		[ATTRIBUTE_HOOK_CALLBACK_NAME]: hooks.preValidation.name?.length > 0 ? hooks.preValidation.name : ANONYMOUS_FUNCTION_NAME
	});
	if (hooks.preHandler != null) hooks.preHandler = handlerWrapper(hooks.preHandler, "notFoundHandler - preHandler", {
		[ATTRIBUTE_HOOK_NAME]: `${this.pluginName} - not-found-handler - preHandler`,
		[ATTRIBUTE_FASTIFY_TYPE]: HOOK_TYPE_INSTANCE,
		[ATTRIBUTE_HOOK_CALLBACK_NAME]: hooks.preHandler.name?.length > 0 ? hooks.preHandler.name : ANONYMOUS_FUNCTION_NAME
	});
	if (handler == null) {
		setNotFoundHandlerOriginal.call(this, hooks);
		return;
	}
	setNotFoundHandlerOriginal.call(this, hooks, handlerWrapper(handler, "notFoundHandler", {
		[ATTRIBUTE_HOOK_NAME]: `${this.pluginName} - not-found-handler`,
		[ATTRIBUTE_FASTIFY_TYPE]: HOOK_TYPE_INSTANCE,
		[ATTRIBUTE_HOOK_CALLBACK_NAME]: handler.name?.length > 0 ? handler.name : ANONYMOUS_FUNCTION_NAME
	}));
}
function getRequestFromArgs(args) {
	for (const arg of args) if (isFastifyRequest(arg)) return arg;
	return null;
}
function handlerWrapper(handler, hookName, spanAttributes = {}) {
	return function handlerWrapped(...args) {
		const request = getRequestFromArgs(args);
		if (request === null || getRequestRouteConfig(request)?.otel === false) return handler.call(this, ...args);
		const parentSpan = request[kRequestSpan] ?? void 0;
		const handlerName = handler.name?.length > 0 ? handler.name : this.pluginName ?? ANONYMOUS_FUNCTION_NAME;
		const hookType = spanAttributes[ATTRIBUTE_FASTIFY_TYPE];
		const op = hookType === HOOK_TYPE_INSTANCE ? HOOK_OP : hookType === HOOK_TYPE_HANDLER ? REQUEST_HANDLER_OP : void 0;
		const name = op ? stripFastifyPrefix(spanAttributes[ATTRIBUTE_HOOK_NAME]) : `${hookName} - ${handlerName}`;
		return startSpan$3({
			name,
			op,
			attributes: {
				...spanAttributes,
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$26
			},
			parentSpan
		}, () => handler.call(this, ...args));
	};
}
function stripFastifyPrefix(hookName = "") {
	return hookName.replace(/^fastify -> /, "").replace(/^@fastify\/otel -> /, "").replace(/^@sentry\/instrumentation-fastify -> /, "");
}
function instrumentOnRequest(fastify) {
	fastify.addHook("onRequest", async (request, _reply) => {
		const routeName = getRequestRouteUrl(request);
		const method = request.method || "GET";
		getIsolationScope().setTransactionName(`${method} ${routeName}`);
	});
}
var _isInstrumented$1 = false;
var instrumentFastify = Object.assign(function instrumentFastify2() {
	if (_isInstrumented$1) return;
	_isInstrumented$1 = true;
	diagnosticsChannel.subscribe("fastify.initialization", (message) => {
		const fastifyInstance = message.fastify;
		fastifyInstance?.register(fastifyOtelPlugin).after((err) => {
			if (err) DEBUG_BUILD && debug$3.error("Failed to setup Fastify instrumentation", err);
			else if (fastifyInstance) instrumentOnRequest(fastifyInstance);
		});
	});
}, { id: "Fastify.v5" });
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/fastify/utils.js
var INTEGRATION_NAME$48 = "Fastify";
function defaultShouldHandleError$1(_error, _request, reply) {
	const statusCode = reply.statusCode;
	return statusCode >= 500 || statusCode <= 299;
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/fastify/errors.js
function getFastifyIntegration$1() {
	return getClient()?.getIntegrationByName(INTEGRATION_NAME$48);
}
function subscribeToFastifyErrorChannel() {
	diagnosticsChannel.subscribe("tracing:fastify.request.handler:error", (message) => {
		const { error, request, reply } = message;
		handleFastifyError$1.call(handleFastifyError$1, error, request, reply, "diagnostics-channel");
	});
}
function handleFastifyError$1(error, request, reply, handlerOrigin) {
	const shouldHandleError = getFastifyIntegration$1()?.getShouldHandleError() || defaultShouldHandleError$1;
	if (handlerOrigin === "diagnostics-channel") this.diagnosticsChannelExists = true;
	if (this.diagnosticsChannelExists && handlerOrigin === "onError-hook") {
		DEBUG_BUILD && debug$3.warn("Fastify error handler was already registered via diagnostics channel.", "You can safely remove `setupFastifyErrorHandler` call and set `shouldHandleError` on the integration options.");
		return;
	}
	if (shouldHandleError(error, request, reply)) captureException(error, { mechanism: {
		handled: false,
		type: "auto.function.fastify"
	} });
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/fastify/index.js
var _fastifyIntegration$1 = (({ shouldHandleError } = {}) => {
	let _shouldHandleError;
	return {
		name: INTEGRATION_NAME$48,
		setupOnce() {
			_shouldHandleError = shouldHandleError || defaultShouldHandleError$1;
			subscribeToFastifyErrorChannel();
			instrumentFastify();
		},
		getShouldHandleError() {
			return _shouldHandleError;
		},
		setShouldHandleError(shouldHandleError2) {
			_shouldHandleError = shouldHandleError2;
		}
	};
});
var fastifyIntegration$1 = defineIntegration(_fastifyIntegration$1);
var handleFastifyError = handleFastifyError$1;
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/mongoose/mongoose-legacy-span.js
var ATTR_DB_MONGODB_COLLECTION = "db.mongodb.collection";
var ATTR_DB_NAME$2 = "db.name";
var ATTR_DB_USER$2 = "db.user";
var ATTR_NET_PEER_NAME$2 = "net.peer.name";
var ATTR_NET_PEER_PORT$2 = "net.peer.port";
var ATTR_DB_OPERATION = "db.operation";
var ATTR_DB_SYSTEM$2 = "db.system";
function startMongooseLegacySpan({ collection, modelName, operation, origin, parentSpan }) {
	const attributes = {
		[ATTR_DB_MONGODB_COLLECTION]: collection?.name,
		[ATTR_DB_NAME$2]: collection?.conn?.name,
		[ATTR_DB_USER$2]: collection?.conn?.user,
		[ATTR_NET_PEER_NAME$2]: collection?.conn?.host,
		[ATTR_NET_PEER_PORT$2]: collection?.conn?.port,
		[ATTR_DB_OPERATION]: operation,
		[ATTR_DB_SYSTEM$2]: "mongoose",
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: origin
	};
	return startInactiveSpan$1({
		name: `mongoose.${modelName}.${operation}`,
		op: "db",
		kind: SPAN_KIND.CLIENT,
		attributes,
		parentSpan
	});
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/fastify/index.js
var INTEGRATION_NAME$47 = "Fastify";
var instrumentFastifyV3 = generateInstrumentOnce(`${INTEGRATION_NAME$47}.v3`, () => new FastifyInstrumentationV3());
function getFastifyIntegration() {
	const client = getClient();
	if (!client) return;
	else return client.getIntegrationByName(INTEGRATION_NAME$47);
}
var _fastifyIntegration = ((options) => {
	const parentIntegration = fastifyIntegration$1(options);
	return extendIntegration(parentIntegration, { setupOnce() {
		instrumentFastifyV3();
	} });
});
var fastifyIntegration = defineIntegration((options = {}) => _fastifyIntegration(options));
function setupFastifyErrorHandler(fastify, options) {
	if (options?.shouldHandleError) getFastifyIntegration()?.setShouldHandleError(options.shouldHandleError);
	const plugin = Object.assign(function(fastify2, _options, done) {
		fastify2.addHook("onError", async (request, reply, error) => {
			handleFastifyError.call(handleFastifyError, error, request, reply, "onError-hook");
		});
		done();
	}, {
		[/* @__PURE__ */ Symbol.for("skip-override")]: true,
		[/* @__PURE__ */ Symbol.for("fastify.display-name")]: "sentry-fastify-error-handler"
	});
	fastify.register(plugin);
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/InstrumentationNodeModuleFile.js
var InstrumentationNodeModuleFile = class {
	constructor(name, supportedVersions, patch, unpatch) {
		this.name = normalize(name);
		this.supportedVersions = supportedVersions;
		this.patch = patch;
		this.unpatch = unpatch;
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/graphql/vendored/enum.js
var AllowedOperationTypes = /* @__PURE__ */ ((AllowedOperationTypes2) => {
	AllowedOperationTypes2["QUERY"] = "query";
	AllowedOperationTypes2["MUTATION"] = "mutation";
	AllowedOperationTypes2["SUBSCRIPTION"] = "subscription";
	return AllowedOperationTypes2;
})(AllowedOperationTypes || {});
var TokenKind = /* @__PURE__ */ ((TokenKind2) => {
	TokenKind2["SOF"] = "<SOF>";
	TokenKind2["EOF"] = "<EOF>";
	TokenKind2["BANG"] = "!";
	TokenKind2["DOLLAR"] = "$";
	TokenKind2["AMP"] = "&";
	TokenKind2["PAREN_L"] = "(";
	TokenKind2["PAREN_R"] = ")";
	TokenKind2["SPREAD"] = "...";
	TokenKind2["COLON"] = ":";
	TokenKind2["EQUALS"] = "=";
	TokenKind2["AT"] = "@";
	TokenKind2["BRACKET_L"] = "[";
	TokenKind2["BRACKET_R"] = "]";
	TokenKind2["BRACE_L"] = "{";
	TokenKind2["PIPE"] = "|";
	TokenKind2["BRACE_R"] = "}";
	TokenKind2["NAME"] = "Name";
	TokenKind2["INT"] = "Int";
	TokenKind2["FLOAT"] = "Float";
	TokenKind2["STRING"] = "String";
	TokenKind2["BLOCK_STRING"] = "BlockString";
	TokenKind2["COMMENT"] = "Comment";
	return TokenKind2;
})(TokenKind || {});
var SpanNames$1 = /* @__PURE__ */ ((SpanNames2) => {
	SpanNames2["EXECUTE"] = "graphql.execute";
	SpanNames2["PARSE"] = "graphql.parse";
	SpanNames2["RESOLVE"] = "graphql.resolve";
	SpanNames2["VALIDATE"] = "graphql.validate";
	SpanNames2["SCHEMA_VALIDATE"] = "graphql.validateSchema";
	SpanNames2["SCHEMA_PARSE"] = "graphql.parseSchema";
	return SpanNames2;
})(SpanNames$1 || {});
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/graphql/vendored/enums/AttributeNames.js
var AttributeNames$6 = /* @__PURE__ */ ((AttributeNames2) => {
	AttributeNames2["SOURCE"] = "graphql.source";
	AttributeNames2["FIELD_NAME"] = "graphql.field.name";
	AttributeNames2["FIELD_PATH"] = "graphql.field.path";
	AttributeNames2["FIELD_TYPE"] = "graphql.field.type";
	AttributeNames2["PARENT_NAME"] = "graphql.parent.name";
	AttributeNames2["OPERATION_TYPE"] = "graphql.operation.type";
	AttributeNames2["OPERATION_NAME"] = "graphql.operation.name";
	return AttributeNames2;
})(AttributeNames$6 || {});
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/graphql/vendored/symbols.js
var OTEL_PATCHED_SYMBOL = /* @__PURE__ */ Symbol.for("opentelemetry.patched");
var OTEL_GRAPHQL_DATA_SYMBOL = /* @__PURE__ */ Symbol.for("opentelemetry.graphql_data");
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/graphql/vendored/internal-types.js
var OPERATION_NOT_SUPPORTED = "Operation$operationName$not supported";
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/graphql/vendored/utils.js
var OPERATION_VALUES = Object.values(AllowedOperationTypes);
var isPromise$1 = (value) => {
	return typeof value?.then === "function";
};
function addSpanSource(span, loc, start, end) {
	if (getClient()?.getDataCollectionOptions().graphQL.document === true) {
		const source = getSourceFromLocation(loc, start, end);
		span.setAttribute(AttributeNames$6.SOURCE, source);
	}
}
function createFieldIfNotExists$1(contextValue, info, path) {
	let field = getField$1(contextValue, path);
	if (field) return {
		field,
		spanAdded: false
	};
	field = { span: createResolverSpan$1(contextValue, info, path, getParentFieldSpan$1(contextValue, path)) };
	addField$1(contextValue, path, field);
	return {
		field,
		spanAdded: true
	};
}
function createResolverSpan$1(contextValue, info, path, parentSpan) {
	const attributes = {
		[AttributeNames$6.FIELD_NAME]: info.fieldName,
		[AttributeNames$6.FIELD_PATH]: path.join("."),
		[AttributeNames$6.FIELD_TYPE]: info.returnType.toString(),
		[AttributeNames$6.PARENT_NAME]: info.parentType.name
	};
	const span = startInactiveSpan$1({
		name: `${SpanNames$1.RESOLVE} ${attributes[AttributeNames$6.FIELD_PATH]}`,
		attributes,
		parentSpan
	});
	const document = contextValue[OTEL_GRAPHQL_DATA_SYMBOL].source;
	const fieldNode = info.fieldNodes.find((fieldNode2) => fieldNode2.kind === "Field");
	if (fieldNode) addSpanSource(span, document.loc, fieldNode.loc?.start, fieldNode.loc?.end);
	return span;
}
function endSpan$3(span, error) {
	if (error) span.setStatus({
		code: 2,
		message: error.message
	});
	span.end();
}
function getOperation$1(document, operationName) {
	if (!document || !Array.isArray(document.definitions)) return;
	if (operationName) return document.definitions.filter((definition) => OPERATION_VALUES.indexOf(definition?.operation) !== -1).find((definition) => operationName === definition?.name?.value);
	else return document.definitions.find((definition) => OPERATION_VALUES.indexOf(definition?.operation) !== -1);
}
function addField$1(contextValue, path, field) {
	return contextValue[OTEL_GRAPHQL_DATA_SYMBOL].fields[path.join(".")] = field;
}
function getField$1(contextValue, path) {
	return contextValue[OTEL_GRAPHQL_DATA_SYMBOL].fields[path.join(".")];
}
function getParentFieldSpan$1(contextValue, path) {
	for (let i = path.length - 1; i > 0; i--) {
		const field = getField$1(contextValue, path.slice(0, i));
		if (field) return field.span;
	}
	return getRootSpan(contextValue);
}
function getRootSpan(contextValue) {
	return contextValue[OTEL_GRAPHQL_DATA_SYMBOL].span;
}
function pathToArray$1(path) {
	const flattened = [];
	let curr = path;
	while (curr) {
		flattened.push(String(curr.key));
		curr = curr.prev;
	}
	return flattened.reverse();
}
function repeatBreak(i) {
	return repeatChar("\n", i);
}
function repeatSpace(i) {
	return repeatChar(" ", i);
}
function repeatChar(char, to) {
	let text = "";
	for (let i = 0; i < to; i++) text += char;
	return text;
}
var KindsToBeRemoved = [
	TokenKind.FLOAT,
	TokenKind.STRING,
	TokenKind.INT,
	TokenKind.BLOCK_STRING
];
function getSourceFromLocation(loc, inputStart, inputEnd) {
	let source = "";
	if (loc?.startToken) {
		const start = typeof inputStart === "number" ? inputStart : loc.start;
		const end = typeof inputEnd === "number" ? inputEnd : loc.end;
		let next = loc.startToken.next;
		let previousLine = 1;
		while (next) {
			if (next.start < start) {
				next = next.next;
				previousLine = next?.line;
				continue;
			}
			if (next.end > end) {
				next = next.next;
				previousLine = next?.line;
				continue;
			}
			let value = next.value || next.kind;
			let space = "";
			if (KindsToBeRemoved.indexOf(next.kind) >= 0) value = "*";
			if (next.kind === TokenKind.STRING) value = `"${value}"`;
			if (next.kind === TokenKind.EOF) value = "";
			if (next.line > previousLine) {
				source += repeatBreak(next.line - previousLine);
				previousLine = next.line;
				space = repeatSpace(next.column - 1);
			} else if (next.line === next.prev?.line) space = repeatSpace(next.start - (next.prev?.end || 0));
			source += space + value;
			if (next) next = next.next;
		}
	}
	return source;
}
function wrapFields$1(type, getConfig) {
	if (!type || type[OTEL_PATCHED_SYMBOL]) return;
	const fields = type.getFields();
	type[OTEL_PATCHED_SYMBOL] = true;
	Object.keys(fields).forEach((key) => {
		const field = fields[key];
		if (!field) return;
		if (field.resolve) field.resolve = wrapFieldResolver$1(getConfig, field.resolve);
		if (field.type) {
			const unwrappedTypes = unwrapType$1(field.type);
			for (const unwrappedType of unwrappedTypes) wrapFields$1(unwrappedType, getConfig);
		}
	});
}
function unwrapType$1(type) {
	if ("ofType" in type) return unwrapType$1(type.ofType);
	if (isGraphQLUnionType$1(type)) return type.getTypes();
	if (isGraphQLObjectType$1(type)) return [type];
	return [];
}
function isGraphQLUnionType$1(type) {
	return "getTypes" in type && typeof type.getTypes === "function";
}
function isGraphQLObjectType$1(type) {
	return "getFields" in type && typeof type.getFields === "function";
}
var handleResolveSpanError = (resolveSpan, err, shouldEndSpan) => {
	if (!shouldEndSpan) return;
	resolveSpan.setStatus({
		code: 2,
		message: err.message
	});
	resolveSpan.end();
};
var handleResolveSpanSuccess = (resolveSpan, shouldEndSpan) => {
	if (!shouldEndSpan) return;
	resolveSpan.end();
};
function wrapFieldResolver$1(getConfig, fieldResolver, isDefaultResolver = false) {
	if (wrappedFieldResolver[OTEL_PATCHED_SYMBOL] || typeof fieldResolver !== "function") return fieldResolver;
	function wrappedFieldResolver(source, args, contextValue, info) {
		if (!fieldResolver) return;
		if (getConfig().ignoreTrivialResolveSpans && isDefaultResolver && (isObjectLike(source) || typeof source === "function")) {
			if (typeof source[info.fieldName] !== "function") return fieldResolver.call(this, source, args, contextValue, info);
		}
		if (!contextValue[OTEL_GRAPHQL_DATA_SYMBOL]) return fieldResolver.call(this, source, args, contextValue, info);
		const { field, spanAdded } = createFieldIfNotExists$1(contextValue, info, pathToArray$1(info?.path));
		const span = field.span;
		const shouldEndSpan = spanAdded;
		return withActiveSpan$1(span, () => {
			try {
				const res = fieldResolver.call(this, source, args, contextValue, info);
				if (isPromise$1(res)) return res.then((r) => {
					handleResolveSpanSuccess(span, shouldEndSpan);
					return r;
				}, (err) => {
					handleResolveSpanError(span, err, shouldEndSpan);
					throw err;
				});
				else {
					handleResolveSpanSuccess(span, shouldEndSpan);
					return res;
				}
			} catch (err) {
				handleResolveSpanError(span, err, shouldEndSpan);
				throw err;
			}
		});
	}
	wrappedFieldResolver[OTEL_PATCHED_SYMBOL] = true;
	return wrappedFieldResolver;
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/graphql/vendored/instrumentation.js
var PACKAGE_NAME$18 = "@sentry/instrumentation-graphql";
var ORIGIN$25 = "auto.graphql.otel.graphql";
var DEFAULT_CONFIG = { ignoreResolveSpans: false };
var supportedVersions$7 = [">=14.0.0 <17"];
var GraphQLInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$18, SDK_VERSION, {
			...DEFAULT_CONFIG,
			...config
		});
	}
	setConfig(config = {}) {
		super.setConfig({
			...DEFAULT_CONFIG,
			...config
		});
	}
	init() {
		const module = new InstrumentationNodeModuleDefinition("graphql", supportedVersions$7);
		module.files.push(this._addPatchingExecute());
		module.files.push(this._addPatchingParser());
		module.files.push(this._addPatchingValidate());
		return module;
	}
	_addPatchingExecute() {
		return new InstrumentationNodeModuleFile("graphql/execution/execute.js", supportedVersions$7, (moduleExports) => {
			if (isWrapped(moduleExports.execute)) this._unwrap(moduleExports, "execute");
			this._wrap(moduleExports, "execute", this._patchExecute(moduleExports.defaultFieldResolver));
			return moduleExports;
		}, (moduleExports) => {
			if (moduleExports) this._unwrap(moduleExports, "execute");
		});
	}
	_addPatchingParser() {
		return new InstrumentationNodeModuleFile("graphql/language/parser.js", supportedVersions$7, (moduleExports) => {
			if (isWrapped(moduleExports.parse)) this._unwrap(moduleExports, "parse");
			this._wrap(moduleExports, "parse", this._patchParse());
			return moduleExports;
		}, (moduleExports) => {
			if (moduleExports) this._unwrap(moduleExports, "parse");
		});
	}
	_addPatchingValidate() {
		return new InstrumentationNodeModuleFile("graphql/validation/validate.js", supportedVersions$7, (moduleExports) => {
			if (isWrapped(moduleExports.validate)) this._unwrap(moduleExports, "validate");
			this._wrap(moduleExports, "validate", this._patchValidate());
			return moduleExports;
		}, (moduleExports) => {
			if (moduleExports) this._unwrap(moduleExports, "validate");
		});
	}
	_patchExecute(defaultFieldResolved) {
		const instrumentation = this;
		return function execute(original) {
			return function patchExecute() {
				let processedArgs;
				if (arguments.length >= 2) {
					const args = arguments;
					processedArgs = instrumentation._wrapExecuteArgs(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], defaultFieldResolved);
				} else {
					const args = arguments[0];
					processedArgs = instrumentation._wrapExecuteArgs(args.schema, args.document, args.rootValue, args.contextValue, args.variableValues, args.operationName, args.fieldResolver, args.typeResolver, defaultFieldResolved);
				}
				const operation = getOperation$1(processedArgs.document, processedArgs.operationName);
				const span = instrumentation._createExecuteSpan(operation, processedArgs);
				processedArgs.contextValue[OTEL_GRAPHQL_DATA_SYMBOL] = {
					source: processedArgs.document ? processedArgs.document || processedArgs.document[OTEL_GRAPHQL_DATA_SYMBOL] : void 0,
					span,
					fields: {}
				};
				return withActiveSpan$1(span, () => {
					return safeExecuteInTheMiddle(() => {
						return original.apply(this, [processedArgs]);
					}, (err, result) => {
						instrumentation._handleExecutionResult(span, err, result);
					});
				});
			};
		};
	}
	_handleExecutionResult(span, err, result) {
		if (result === void 0 || err) {
			endSpan$3(span, err);
			return;
		}
		if (isPromise$1(result)) result.then((resultData) => {
			this._updateSpanFromResult(span, resultData);
			endSpan$3(span);
		}, (error) => {
			endSpan$3(span, error);
		});
		else {
			this._updateSpanFromResult(span, result);
			endSpan$3(span);
		}
	}
	/**
	* Applies Sentry-specific span mutations based on the GraphQL execution result:
	* - Marks the execute span as errored if the result contains errors (and no status was set yet)
	* - Optionally renames the containing root span to include the GraphQL operation name(s)
	*/
	_updateSpanFromResult(span, result) {
		if (result.errors?.length && !spanToJSON(span).status) span.setStatus({ code: 2 });
		if (!this.getConfig().useOperationNameForRootSpan) return;
		const attributes = spanToJSON(span).data;
		const operationType = attributes[AttributeNames$6.OPERATION_TYPE];
		const operationName = attributes[AttributeNames$6.OPERATION_NAME];
		if (!operationType) return;
		const rootSpan = getRootSpan$1(span);
		const existingOperations = spanToJSON(rootSpan).data["sentry.graphql.operation"] || [];
		const newOperation = operationName ? `${operationType} ${operationName}` : `${operationType}`;
		if (Array.isArray(existingOperations)) {
			existingOperations.push(newOperation);
			rootSpan.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_GRAPHQL_OPERATION, existingOperations);
		} else if (typeof existingOperations === "string") rootSpan.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_GRAPHQL_OPERATION, [existingOperations, newOperation]);
		else rootSpan.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_GRAPHQL_OPERATION, newOperation);
		if (!spanToJSON(rootSpan).data["original-description"]) rootSpan.setAttribute("original-description", spanToJSON(rootSpan).description);
		rootSpan.updateName(`${spanToJSON(rootSpan).data["original-description"]} (${getGraphqlOperationNamesFromAttribute(existingOperations)})`);
	}
	_patchParse() {
		const instrumentation = this;
		return function parse(original) {
			return function patchParse(source, options) {
				return instrumentation._parse(this, original, source, options);
			};
		};
	}
	_patchValidate() {
		const instrumentation = this;
		return function validate(original) {
			return function patchValidate(schema, documentAST, rules, options, typeInfo) {
				return instrumentation._validate(this, original, schema, documentAST, rules, typeInfo, options);
			};
		};
	}
	_parse(obj, original, source, options) {
		const span = startInactiveSpan$1({ name: SpanNames$1.PARSE });
		return withActiveSpan$1(span, () => {
			return safeExecuteInTheMiddle(() => {
				return original.call(obj, source, options);
			}, (err, result) => {
				if (result) {
					if (!getOperation$1(result)) span.updateName(SpanNames$1.SCHEMA_PARSE);
					else if (result.loc) addSpanSource(span, result.loc);
				}
				endSpan$3(span, err);
			});
		});
	}
	_validate(obj, original, schema, documentAST, rules, typeInfo, options) {
		const span = startInactiveSpan$1({ name: SpanNames$1.VALIDATE });
		return withActiveSpan$1(span, () => {
			return safeExecuteInTheMiddle(() => {
				return original.call(obj, schema, documentAST, rules, options, typeInfo);
			}, (err, _errors) => {
				if (!documentAST.loc) span.updateName(SpanNames$1.SCHEMA_VALIDATE);
				endSpan$3(span, err);
			});
		});
	}
	_createExecuteSpan(operation, processedArgs) {
		const span = startInactiveSpan$1({
			name: SpanNames$1.EXECUTE,
			attributes: { [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$25 }
		});
		if (operation) {
			const { operation: operationType, name: nameNode } = operation;
			span.setAttribute(AttributeNames$6.OPERATION_TYPE, operationType);
			const operationName = nameNode?.value;
			if (operationName) {
				span.setAttribute(AttributeNames$6.OPERATION_NAME, operationName);
				span.updateName(`${operationType} ${operationName}`);
			} else span.updateName(operationType);
		} else {
			let operationName = " ";
			if (processedArgs.operationName) operationName = ` "${processedArgs.operationName}" `;
			operationName = OPERATION_NOT_SUPPORTED.replace("$operationName$", operationName);
			span.setAttribute(AttributeNames$6.OPERATION_NAME, operationName);
		}
		if (processedArgs.document?.loc) addSpanSource(span, processedArgs.document.loc);
		return span;
	}
	_wrapExecuteArgs(schema, document, rootValue, contextValue, variableValues, operationName, fieldResolver, typeResolver, defaultFieldResolved) {
		if (!contextValue) contextValue = {};
		if (contextValue[OTEL_GRAPHQL_DATA_SYMBOL] || this.getConfig().ignoreResolveSpans) return {
			schema,
			document,
			rootValue,
			contextValue,
			variableValues,
			operationName,
			fieldResolver,
			typeResolver
		};
		fieldResolver = wrapFieldResolver$1(() => this.getConfig(), fieldResolver ?? defaultFieldResolved, fieldResolver == null);
		if (schema) {
			wrapFields$1(schema.getQueryType(), () => this.getConfig());
			wrapFields$1(schema.getMutationType(), () => this.getConfig());
		}
		return {
			schema,
			document,
			rootValue,
			contextValue,
			variableValues,
			operationName,
			fieldResolver,
			typeResolver
		};
	}
};
function getGraphqlOperationNamesFromAttribute(attr) {
	if (Array.isArray(attr)) {
		const sorted = attr.slice().sort();
		if (sorted.length <= 5) return sorted.join(", ");
		else return `${sorted.slice(0, 5).join(", ")}, +${sorted.length - 5}`;
	}
	return `${attr}`;
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/graphql/index.js
var INTEGRATION_NAME$46 = "Graphql";
var instrumentGraphql = generateInstrumentOnce(INTEGRATION_NAME$46, GraphQLInstrumentation, (_options) => getOptionsWithDefaults$1(_options));
var _graphqlIntegration = ((options = {}) => {
	return extendIntegration(graphqlIntegration$1(getOptionsWithDefaults$1(options)), {
		name: INTEGRATION_NAME$46,
		setupOnce() {
			instrumentGraphql(getOptionsWithDefaults$1(options));
		}
	});
});
var graphqlIntegration = defineIntegration(_graphqlIntegration);
function getOptionsWithDefaults$1(options) {
	return {
		ignoreResolveSpans: true,
		ignoreTrivialResolveSpans: true,
		useOperationNameForRootSpan: true,
		...options
	};
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/kafka/vendored/semconv.js
var ATTR_MESSAGING_DESTINATION_PARTITION_ID$1 = "messaging.destination.partition.id";
var ATTR_MESSAGING_KAFKA_MESSAGE_KEY$1 = "messaging.kafka.message.key";
var ATTR_MESSAGING_KAFKA_MESSAGE_TOMBSTONE$1 = "messaging.kafka.message.tombstone";
var ATTR_MESSAGING_KAFKA_OFFSET$1 = "messaging.kafka.offset";
var MESSAGING_OPERATION_TYPE_VALUE_PROCESS$1 = "process";
var MESSAGING_OPERATION_TYPE_VALUE_RECEIVE$1 = "receive";
var MESSAGING_OPERATION_TYPE_VALUE_SEND$1 = "send";
var MESSAGING_SYSTEM_VALUE_KAFKA$1 = "kafka";
var ERROR_TYPE_VALUE_OTHER$1 = "_OTHER";
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/kafka/vendored/utils.js
var PRODUCER_ORIGIN$1 = "auto.kafkajs.otel.producer";
var CONSUMER_ORIGIN$3 = "auto.kafkajs.otel.consumer";
function getHeaderAsString$3(headers, key) {
	const value = headers?.[key];
	if (value == null) return;
	return Array.isArray(value) ? value[0]?.toString() : value.toString();
}
function getLinksFromHeaders$1(headers) {
	const sentryTrace = getHeaderAsString$3(headers, "sentry-trace");
	if (!sentryTrace) return;
	const { traceId, parentSpanId, sampled } = propagationContextFromHeaders(sentryTrace, getHeaderAsString$3(headers, "baggage"));
	if (!parentSpanId) return;
	return [{ context: {
		traceId,
		spanId: parentSpanId,
		isRemote: true,
		traceFlags: sampled ? import_src.TraceFlags.SAMPLED : import_src.TraceFlags.NONE
	} }];
}
function startConsumerSpan$1({ topic, message, operationType, links, attributes }) {
	const operationName = operationType === "receive" ? "poll" : operationType;
	return startInactiveSpan$1({
		name: `${operationName} ${topic}`,
		kind: operationType === "receive" ? SPAN_KIND.CLIENT : SPAN_KIND.CONSUMER,
		links,
		attributes: {
			...attributes,
			[Zo]: MESSAGING_SYSTEM_VALUE_KAFKA$1,
			[Wo]: topic,
			[Xo]: operationType,
			[Qo]: operationName,
			[ATTR_MESSAGING_KAFKA_MESSAGE_KEY$1]: message?.key ? String(message.key) : void 0,
			[ATTR_MESSAGING_KAFKA_MESSAGE_TOMBSTONE$1]: message?.key && message.value === null ? true : void 0,
			[ATTR_MESSAGING_KAFKA_OFFSET$1]: message?.offset,
			...message ? { [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: CONSUMER_ORIGIN$3 } : {}
		}
	});
}
function startProducerSpan$1(topic, message) {
	const span = startInactiveSpan$1({
		name: `send ${topic}`,
		kind: SPAN_KIND.PRODUCER,
		attributes: {
			[Zo]: MESSAGING_SYSTEM_VALUE_KAFKA$1,
			[Wo]: topic,
			[ATTR_MESSAGING_KAFKA_MESSAGE_KEY$1]: message.key ? String(message.key) : void 0,
			[ATTR_MESSAGING_KAFKA_MESSAGE_TOMBSTONE$1]: message.key && message.value === null ? true : void 0,
			[ATTR_MESSAGING_DESTINATION_PARTITION_ID$1]: message.partition !== void 0 ? String(message.partition) : void 0,
			[Qo]: "send",
			[Xo]: MESSAGING_OPERATION_TYPE_VALUE_SEND$1,
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: PRODUCER_ORIGIN$1
		}
	});
	message.headers = message.headers ?? {};
	const traceData = getTraceData$1({ span });
	if (traceData["sentry-trace"]) message.headers["sentry-trace"] = traceData["sentry-trace"];
	if (traceData.baggage) message.headers["baggage"] = traceData.baggage;
	return span;
}
function endSpansOnPromise$1(spans, sendPromise) {
	return Promise.resolve(sendPromise).catch((reason) => {
		let errorMessage;
		let errorType = ERROR_TYPE_VALUE_OTHER$1;
		if (typeof reason === "string" || reason === void 0) errorMessage = reason;
		else if (typeof reason === "object" && Object.prototype.hasOwnProperty.call(reason, "message")) {
			errorMessage = reason.message;
			errorType = reason.constructor.name;
		}
		spans.forEach((span) => {
			span.setAttribute(Gn, errorType);
			span.setStatus({
				code: 2,
				message: errorMessage
			});
		});
		throw reason;
	}).finally(() => {
		spans.forEach((span) => span.end());
	});
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/kafka/vendored/instrumentation.js
var PACKAGE_NAME$17 = "@sentry/instrumentation-kafkajs";
var KafkaJsInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$17, SDK_VERSION, config);
	}
	init() {
		const unpatch = (moduleExports) => {
			if (isWrapped(moduleExports?.Kafka?.prototype.producer)) this._unwrap(moduleExports.Kafka.prototype, "producer");
			if (isWrapped(moduleExports?.Kafka?.prototype.consumer)) this._unwrap(moduleExports.Kafka.prototype, "consumer");
		};
		return new InstrumentationNodeModuleDefinition("kafkajs", [">=0.3.0 <3"], (moduleExports) => {
			unpatch(moduleExports);
			this._wrap(moduleExports?.Kafka?.prototype, "producer", this._getProducerPatch());
			this._wrap(moduleExports?.Kafka?.prototype, "consumer", this._getConsumerPatch());
			return moduleExports;
		}, unpatch);
	}
	_getConsumerPatch() {
		const instrumentation = this;
		return (original) => {
			return function consumer(...args) {
				const newConsumer = original.apply(this, args);
				if (isWrapped(newConsumer.run)) instrumentation._unwrap(newConsumer, "run");
				instrumentation._wrap(newConsumer, "run", instrumentation._getConsumerRunPatch());
				return newConsumer;
			};
		};
	}
	_getProducerPatch() {
		const instrumentation = this;
		return (original) => {
			return function consumer(...args) {
				const newProducer = original.apply(this, args);
				if (isWrapped(newProducer.sendBatch)) instrumentation._unwrap(newProducer, "sendBatch");
				instrumentation._wrap(newProducer, "sendBatch", instrumentation._getSendBatchPatch());
				if (isWrapped(newProducer.send)) instrumentation._unwrap(newProducer, "send");
				instrumentation._wrap(newProducer, "send", instrumentation._getSendPatch());
				if (isWrapped(newProducer.transaction)) instrumentation._unwrap(newProducer, "transaction");
				instrumentation._wrap(newProducer, "transaction", instrumentation._getProducerTransactionPatch());
				return newProducer;
			};
		};
	}
	_getConsumerRunPatch() {
		const instrumentation = this;
		return (original) => {
			return function run(...args) {
				const config = args[0];
				if (config?.eachMessage) {
					if (isWrapped(config.eachMessage)) instrumentation._unwrap(config, "eachMessage");
					instrumentation._wrap(config, "eachMessage", instrumentation._getConsumerEachMessagePatch());
				}
				if (config?.eachBatch) {
					if (isWrapped(config.eachBatch)) instrumentation._unwrap(config, "eachBatch");
					instrumentation._wrap(config, "eachBatch", instrumentation._getConsumerEachBatchPatch());
				}
				return original.call(this, config);
			};
		};
	}
	_getConsumerEachMessagePatch() {
		return (original) => {
			return function eachMessage(...args) {
				const payload = args[0];
				const sentryTrace = getHeaderAsString$3(payload.message.headers, "sentry-trace");
				const baggage = getHeaderAsString$3(payload.message.headers, "baggage");
				return continueTrace$1({
					sentryTrace,
					baggage
				}, () => {
					const span = startConsumerSpan$1({
						topic: payload.topic,
						message: payload.message,
						operationType: MESSAGING_OPERATION_TYPE_VALUE_PROCESS$1,
						attributes: { [ATTR_MESSAGING_DESTINATION_PARTITION_ID$1]: String(payload.partition) }
					});
					const eachMessagePromise = withActiveSpan$1(span, () => {
						return original.apply(this, args);
					});
					return endSpansOnPromise$1([span], eachMessagePromise);
				});
			};
		};
	}
	_getConsumerEachBatchPatch() {
		return (original) => {
			return function eachBatch(...args) {
				const payload = args[0];
				const receivingSpan = startNewTrace$1(() => startConsumerSpan$1({
					topic: payload.batch.topic,
					message: void 0,
					operationType: MESSAGING_OPERATION_TYPE_VALUE_RECEIVE$1,
					attributes: {
						[Go]: payload.batch.messages.length,
						[ATTR_MESSAGING_DESTINATION_PARTITION_ID$1]: String(payload.batch.partition)
					}
				}));
				return withActiveSpan$1(receivingSpan, () => {
					const spans = [receivingSpan];
					payload.batch.messages.forEach((message) => {
						spans.push(startConsumerSpan$1({
							topic: payload.batch.topic,
							message,
							operationType: MESSAGING_OPERATION_TYPE_VALUE_PROCESS$1,
							links: getLinksFromHeaders$1(message.headers),
							attributes: { [ATTR_MESSAGING_DESTINATION_PARTITION_ID$1]: String(payload.batch.partition) }
						}));
					});
					return endSpansOnPromise$1(spans, original.apply(this, args));
				});
			};
		};
	}
	_getProducerTransactionPatch() {
		const instrumentation = this;
		return (original) => {
			return function transaction(...args) {
				const transactionSpan = startInactiveSpan$1({ name: "transaction" });
				const transactionPromise = original.apply(this, args);
				transactionPromise.then((transaction2) => {
					const originalSend = transaction2.send;
					transaction2.send = function send(...args2) {
						return withActiveSpan$1(transactionSpan, () => {
							return instrumentation._getSendPatch()(originalSend).apply(this, args2).catch((err) => {
								transactionSpan.setStatus({
									code: 2,
									message: err?.message
								});
								throw err;
							});
						});
					};
					const originalSendBatch = transaction2.sendBatch;
					transaction2.sendBatch = function sendBatch(...args2) {
						return withActiveSpan$1(transactionSpan, () => {
							return instrumentation._getSendBatchPatch()(originalSendBatch).apply(this, args2).catch((err) => {
								transactionSpan.setStatus({
									code: 2,
									message: err?.message
								});
								throw err;
							});
						});
					};
					const originalCommit = transaction2.commit;
					transaction2.commit = function commit(...args2) {
						const originCommitPromise = originalCommit.apply(this, args2).then(() => {
							transactionSpan.setStatus({ code: 1 });
						});
						return endSpansOnPromise$1([transactionSpan], originCommitPromise);
					};
					const originalAbort = transaction2.abort;
					transaction2.abort = function abort(...args2) {
						const originAbortPromise = originalAbort.apply(this, args2);
						return endSpansOnPromise$1([transactionSpan], originAbortPromise);
					};
				}).catch((err) => {
					transactionSpan.setStatus({
						code: 2,
						message: err?.message
					});
					transactionSpan.end();
				});
				return transactionPromise;
			};
		};
	}
	_getSendBatchPatch() {
		return (original) => {
			return function sendBatch(...args) {
				const messages = args[0].topicMessages || [];
				const spans = [];
				messages.forEach((topicMessage) => {
					topicMessage.messages.forEach((message) => {
						spans.push(startProducerSpan$1(topicMessage.topic, message));
					});
				});
				return endSpansOnPromise$1(spans, original.apply(this, args));
			};
		};
	}
	_getSendPatch() {
		return (original) => {
			return function send(...args) {
				const record = args[0];
				return endSpansOnPromise$1(record.messages.map((message) => {
					return startProducerSpan$1(record.topic, message);
				}), original.apply(this, args));
			};
		};
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/kafka/index.js
var INTEGRATION_NAME$45 = "Kafka";
var instrumentKafka = generateInstrumentOnce(INTEGRATION_NAME$45, () => new KafkaJsInstrumentation());
var _kafkaIntegration = (() => {
	return {
		name: INTEGRATION_NAME$45,
		setupOnce() {
			instrumentKafka();
		}
	};
});
var kafkaIntegration = defineIntegration(_kafkaIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/lrumemoizer/vendored/instrumentation.js
var PACKAGE_NAME$16 = "@sentry/instrumentation-lru-memoizer";
var LruMemoizerInstrumentation = class extends InstrumentationBase {
	constructor() {
		super(PACKAGE_NAME$16, SDK_VERSION, {});
	}
	init() {
		return [new InstrumentationNodeModuleDefinition("lru-memoizer", [">=1.3 <4"], (moduleExports) => {
			const asyncMemoizer = function(...args) {
				const origMemoizer = moduleExports.apply(this, args);
				return function(...memoizerArgs) {
					const origCallback = memoizerArgs.pop();
					const scope = getCurrentScope();
					const callbackWithContext = typeof origCallback === "function" ? function(...callbackArgs) {
						return withScope(scope, () => origCallback.apply(this, callbackArgs));
					} : origCallback;
					return origMemoizer.apply(this, [...memoizerArgs, callbackWithContext]);
				};
			};
			return Object.assign(asyncMemoizer, { sync: moduleExports.sync });
		}, void 0)];
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/lrumemoizer/index.js
var INTEGRATION_NAME$44 = "LruMemoizer";
var instrumentLruMemoizer = generateInstrumentOnce(INTEGRATION_NAME$44, () => new LruMemoizerInstrumentation());
var _lruMemoizerIntegration = (() => {
	return {
		name: INTEGRATION_NAME$44,
		setupOnce() {
			instrumentLruMemoizer();
		}
	};
});
var lruMemoizerIntegration = defineIntegration(_lruMemoizerIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/mongo/vendored/utils.js
var ORIGIN$24 = "auto.db.otel.mongo";
function getV4SpanAttributes(connectionCtx, ns, command, operation) {
	return getV4SpanAttributes$1(connectionCtx, ns, command, operation, ORIGIN$24);
}
function getV3SpanAttributes(ns, topology, command, operation) {
	return getV3SpanAttributes$1(ns, topology, command, operation, ORIGIN$24);
}
function patchEnd(span, resultHandler) {
	const parentSpan = getActiveSpan$1();
	let spanEnded = false;
	return function patchedEnd(...args) {
		if (!spanEnded) {
			spanEnded = true;
			const error = args[0];
			if (span) {
				if (error instanceof Error) span.setStatus({
					code: 2,
					message: error.message
				});
				span.end();
			}
		}
		return withActiveSpan$1(parentSpan ?? null, () => resultHandler.apply(this, args));
	};
}
function shouldSkipInstrumentation$1() {
	return !getActiveSpan$1();
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/mongo/vendored/patches.js
function getV3PatchOperation(operationName) {
	return (original) => {
		return function patchedServerCommand(server, ns, ops, options, callback) {
			const resultHandler = typeof options === "function" ? options : callback;
			if (shouldSkipInstrumentation$1() || typeof resultHandler !== "function" || typeof ops !== "object") {
				if (typeof options === "function") return original.call(this, server, ns, ops, options);
				else return original.call(this, server, ns, ops, options, callback);
			}
			const patchedCallback = patchEnd(startMongoSpan(getV3SpanAttributes(ns, server, ops[0], operationName)), resultHandler);
			if (typeof options === "function") return original.call(this, server, ns, ops, patchedCallback);
			else return original.call(this, server, ns, ops, options, patchedCallback);
		};
	};
}
function getV3PatchCommand() {
	return (original) => {
		return function patchedServerCommand(server, ns, cmd, options, callback) {
			const resultHandler = typeof options === "function" ? options : callback;
			if (shouldSkipInstrumentation$1() || typeof resultHandler !== "function" || typeof cmd !== "object") {
				if (typeof options === "function") return original.call(this, server, ns, cmd, options);
				else return original.call(this, server, ns, cmd, options, callback);
			}
			const patchedCallback = patchEnd(startMongoSpan(getV3SpanAttributes(ns, server, cmd, getV3CommandOperation(cmd))), resultHandler);
			if (typeof options === "function") return original.call(this, server, ns, cmd, patchedCallback);
			else return original.call(this, server, ns, cmd, options, patchedCallback);
		};
	};
}
function getV4PatchCommandCallback() {
	return (original) => {
		return function patchedV4ServerCommand(ns, cmd, options, callback) {
			const resultHandler = callback;
			const commandType = Object.keys(cmd)[0];
			if (typeof cmd !== "object" || cmd.ismaster || cmd.hello) return original.call(this, ns, cmd, options, callback);
			let span = void 0;
			if (!shouldSkipInstrumentation$1()) span = startMongoSpan(getV4SpanAttributes(this, ns, cmd, commandType));
			const patchedCallback = patchEnd(span, resultHandler);
			return original.call(this, ns, cmd, options, patchedCallback);
		};
	};
}
function getV4PatchCommandPromise() {
	return (original) => {
		return function patchedV4ServerCommand(...args) {
			const [ns, cmd] = args;
			const commandType = Object.keys(cmd)[0];
			const resultHandler = () => void 0;
			if (typeof cmd !== "object" || cmd.ismaster || cmd.hello) return original.apply(this, args);
			let span = void 0;
			if (!shouldSkipInstrumentation$1()) span = startMongoSpan(getV4SpanAttributes(this, ns, cmd, commandType));
			const patchedCallback = patchEnd(span, resultHandler);
			const result = original.apply(this, args);
			result.then((res) => patchedCallback(null, res), (err) => patchedCallback(err));
			return result;
		};
	};
}
function getV3PatchFind() {
	return (original) => {
		return function patchedServerCommand(server, ns, cmd, cursorState, options, callback) {
			const resultHandler = typeof options === "function" ? options : callback;
			if (shouldSkipInstrumentation$1() || typeof resultHandler !== "function" || typeof cmd !== "object") {
				if (typeof options === "function") return original.call(this, server, ns, cmd, cursorState, options);
				else return original.call(this, server, ns, cmd, cursorState, options, callback);
			}
			const patchedCallback = patchEnd(startMongoSpan(getV3SpanAttributes(ns, server, cmd, "find")), resultHandler);
			if (typeof options === "function") return original.call(this, server, ns, cmd, cursorState, patchedCallback);
			else return original.call(this, server, ns, cmd, cursorState, options, patchedCallback);
		};
	};
}
function getV3PatchCursor() {
	return (original) => {
		return function patchedServerCommand(server, ns, cursorState, batchSize, options, callback) {
			const resultHandler = typeof options === "function" ? options : callback;
			if (shouldSkipInstrumentation$1() || typeof resultHandler !== "function") {
				if (typeof options === "function") return original.call(this, server, ns, cursorState, batchSize, options);
				else return original.call(this, server, ns, cursorState, batchSize, options, callback);
			}
			const patchedCallback = patchEnd(startMongoSpan(getV3SpanAttributes(ns, server, cursorState.cmd, "getMore")), resultHandler);
			if (typeof options === "function") return original.call(this, server, ns, cursorState, batchSize, patchedCallback);
			else return original.call(this, server, ns, cursorState, batchSize, options, patchedCallback);
		};
	};
}
function getV4ConnectionPoolCheckOut() {
	return (original) => {
		return function patchedCheckout(callback) {
			const parentSpan = getActiveSpan$1();
			return original.call(this, function(...args) {
				return withActiveSpan$1(parentSpan ?? null, () => callback.apply(this, args));
			});
		};
	};
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/mongo/vendored/instrumentation.js
var PACKAGE_NAME$15 = "@sentry/instrumentation-mongodb";
var MongoDBInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$15, SDK_VERSION, config);
	}
	init() {
		const { v3PatchConnection, v3UnpatchConnection } = this._getV3ConnectionPatches();
		const { v4PatchConnectionCallback, v4PatchConnectionPromise, v4UnpatchConnection } = this._getV4ConnectionPatches();
		const { v4PatchConnectionPool, v4UnpatchConnectionPool } = this._getV4ConnectionPoolPatches();
		return [new InstrumentationNodeModuleDefinition("mongodb", [">=3.3.0 <4"], void 0, void 0, [new InstrumentationNodeModuleFile("mongodb/lib/core/wireprotocol/index.js", [">=3.3.0 <4"], v3PatchConnection, v3UnpatchConnection)]), new InstrumentationNodeModuleDefinition("mongodb", [">=4.0.0 <8"], void 0, void 0, [
			new InstrumentationNodeModuleFile("mongodb/lib/cmap/connection.js", [">=4.0.0 <6.4"], v4PatchConnectionCallback, v4UnpatchConnection),
			new InstrumentationNodeModuleFile("mongodb/lib/cmap/connection.js", [">=6.4.0 <8"], v4PatchConnectionPromise, v4UnpatchConnection),
			new InstrumentationNodeModuleFile("mongodb/lib/cmap/connection_pool.js", [">=4.0.0 <6.4"], v4PatchConnectionPool, v4UnpatchConnectionPool)
		])];
	}
	_getV3ConnectionPatches() {
		return {
			v3PatchConnection: (moduleExports) => {
				if (isWrapped(moduleExports.insert)) this._unwrap(moduleExports, "insert");
				this._wrap(moduleExports, "insert", getV3PatchOperation("insert"));
				if (isWrapped(moduleExports.remove)) this._unwrap(moduleExports, "remove");
				this._wrap(moduleExports, "remove", getV3PatchOperation("remove"));
				if (isWrapped(moduleExports.update)) this._unwrap(moduleExports, "update");
				this._wrap(moduleExports, "update", getV3PatchOperation("update"));
				if (isWrapped(moduleExports.command)) this._unwrap(moduleExports, "command");
				this._wrap(moduleExports, "command", getV3PatchCommand());
				if (isWrapped(moduleExports.query)) this._unwrap(moduleExports, "query");
				this._wrap(moduleExports, "query", getV3PatchFind());
				if (isWrapped(moduleExports.getMore)) this._unwrap(moduleExports, "getMore");
				this._wrap(moduleExports, "getMore", getV3PatchCursor());
				return moduleExports;
			},
			v3UnpatchConnection: (moduleExports) => {
				if (moduleExports === void 0) return;
				this._unwrap(moduleExports, "insert");
				this._unwrap(moduleExports, "remove");
				this._unwrap(moduleExports, "update");
				this._unwrap(moduleExports, "command");
				this._unwrap(moduleExports, "query");
				this._unwrap(moduleExports, "getMore");
			}
		};
	}
	_getV4ConnectionPoolPatches() {
		return {
			v4PatchConnectionPool: (moduleExports) => {
				const poolPrototype = moduleExports.ConnectionPool.prototype;
				if (isWrapped(poolPrototype.checkOut)) this._unwrap(poolPrototype, "checkOut");
				this._wrap(poolPrototype, "checkOut", getV4ConnectionPoolCheckOut());
				return moduleExports;
			},
			v4UnpatchConnectionPool: (moduleExports) => {
				if (moduleExports === void 0) return;
				this._unwrap(moduleExports.ConnectionPool.prototype, "checkOut");
			}
		};
	}
	_getV4ConnectionPatches() {
		return {
			v4PatchConnectionCallback: (moduleExports) => {
				if (isWrapped(moduleExports.Connection.prototype.command)) this._unwrap(moduleExports.Connection.prototype, "command");
				this._wrap(moduleExports.Connection.prototype, "command", getV4PatchCommandCallback());
				return moduleExports;
			},
			v4PatchConnectionPromise: (moduleExports) => {
				if (isWrapped(moduleExports.Connection.prototype.command)) this._unwrap(moduleExports.Connection.prototype, "command");
				this._wrap(moduleExports.Connection.prototype, "command", getV4PatchCommandPromise());
				return moduleExports;
			},
			v4UnpatchConnection: (moduleExports) => {
				if (moduleExports === void 0) return;
				this._unwrap(moduleExports.Connection.prototype, "command");
			}
		};
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/mongo/index.js
var INTEGRATION_NAME$43 = "Mongo";
var instrumentMongo = generateInstrumentOnce(INTEGRATION_NAME$43, () => new MongoDBInstrumentation());
var _mongoIntegration = (() => {
	return {
		name: INTEGRATION_NAME$43,
		setupOnce() {
			instrumentMongo();
		}
	};
});
var mongoIntegration = defineIntegration(_mongoIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/mongoose/vendored/utils.js
function setErrorStatus(span, error) {
	span.setStatus({
		code: 2,
		message: `${error.message} ${error.code ? `
Mongoose Error Code: ${error.code}` : ""}`
	});
}
function handlePromiseResponse(execResponse, span) {
	if (!(execResponse instanceof Promise)) {
		span.end();
		return execResponse;
	}
	return execResponse.catch((err) => {
		setErrorStatus(span, err);
		throw err;
	}).finally(() => span.end());
}
function handleCallbackResponse(callback, exec, originalThis, span, args) {
	let callbackArgumentIndex = 0;
	if (args.length === 2) callbackArgumentIndex = 1;
	else if (args.length === 3) callbackArgumentIndex = 2;
	args[callbackArgumentIndex] = (err, response) => {
		if (err) setErrorStatus(span, err);
		span.end();
		return callback(err, response);
	};
	return exec.apply(originalThis, args);
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/mongoose/vendored/mongoose.js
var PACKAGE_NAME$14 = "@sentry/instrumentation-mongoose";
var ORIGIN$23 = "auto.db.otel.mongoose";
var contextCaptureFunctionsCommon = [
	"deleteOne",
	"deleteMany",
	"find",
	"findOne",
	"estimatedDocumentCount",
	"countDocuments",
	"distinct",
	"where",
	"$where",
	"findOneAndUpdate",
	"findOneAndDelete",
	"findOneAndReplace"
];
var contextCaptureFunctions6 = [
	"remove",
	"count",
	"findOneAndRemove",
	...contextCaptureFunctionsCommon
];
var contextCaptureFunctions7 = [
	"count",
	"findOneAndRemove",
	...contextCaptureFunctionsCommon
];
var contextCaptureFunctions8 = [...contextCaptureFunctionsCommon];
function getContextCaptureFunctions(moduleVersion) {
	if (!moduleVersion) return contextCaptureFunctionsCommon;
	else if (moduleVersion.startsWith("6.") || moduleVersion.startsWith("5.")) return contextCaptureFunctions6;
	else if (moduleVersion.startsWith("7.")) return contextCaptureFunctions7;
	else return contextCaptureFunctions8;
}
function instrumentRemove(moduleVersion) {
	return moduleVersion && (moduleVersion.startsWith("5.") || moduleVersion.startsWith("6.")) || false;
}
function needsDocumentMethodPatch(moduleVersion) {
	if (!moduleVersion || !moduleVersion.startsWith("8.")) return false;
	return parseInt(moduleVersion.split(".")[1], 10) >= 21;
}
var _STORED_PARENT_SPAN = /* @__PURE__ */ Symbol("stored-parent-span");
var _ALREADY_INSTRUMENTED = /* @__PURE__ */ Symbol("already-instrumented");
var MongooseInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$14, SDK_VERSION, config);
	}
	init() {
		return new InstrumentationNodeModuleDefinition("mongoose", [">=5.9.7 <9.7.0"], this.patch.bind(this), this.unpatch.bind(this));
	}
	patch(module, moduleVersion) {
		const moduleExports = module[Symbol.toStringTag] === "Module" && module.default ? module.default : module;
		this._wrap(moduleExports.Model.prototype, "save", this.patchOnModelMethods("save"));
		moduleExports.Model.prototype.$save = moduleExports.Model.prototype.save;
		if (instrumentRemove(moduleVersion)) this._wrap(moduleExports.Model.prototype, "remove", this.patchOnModelMethods("remove"));
		if (needsDocumentMethodPatch(moduleVersion)) {
			this._wrap(moduleExports.Model.prototype, "updateOne", this._patchDocumentUpdateMethods("updateOne"));
			this._wrap(moduleExports.Model.prototype, "deleteOne", this._patchDocumentUpdateMethods("deleteOne"));
		}
		this._wrap(moduleExports.Query.prototype, "exec", this.patchQueryExec());
		this._wrap(moduleExports.Aggregate.prototype, "exec", this.patchAggregateExec());
		getContextCaptureFunctions(moduleVersion).forEach((funcName) => {
			this._wrap(moduleExports.Query.prototype, funcName, this.patchAndCaptureSpanContext(funcName));
		});
		this._wrap(moduleExports.Model, "aggregate", this.patchModelAggregate());
		this._wrap(moduleExports.Model, "insertMany", this.patchModelStatic("insertMany"));
		this._wrap(moduleExports.Model, "bulkWrite", this.patchModelStatic("bulkWrite"));
		return moduleExports;
	}
	unpatch(module, moduleVersion) {
		const moduleExports = module[Symbol.toStringTag] === "Module" && module.default ? module.default : module;
		const contextCaptureFunctions = getContextCaptureFunctions(moduleVersion);
		this._unwrap(moduleExports.Model.prototype, "save");
		moduleExports.Model.prototype.$save = moduleExports.Model.prototype.save;
		if (instrumentRemove(moduleVersion)) this._unwrap(moduleExports.Model.prototype, "remove");
		if (needsDocumentMethodPatch(moduleVersion)) {
			this._unwrap(moduleExports.Model.prototype, "updateOne");
			this._unwrap(moduleExports.Model.prototype, "deleteOne");
		}
		this._unwrap(moduleExports.Query.prototype, "exec");
		this._unwrap(moduleExports.Aggregate.prototype, "exec");
		contextCaptureFunctions.forEach((funcName) => {
			this._unwrap(moduleExports.Query.prototype, funcName);
		});
		this._unwrap(moduleExports.Model, "aggregate");
		this._unwrap(moduleExports.Model, "insertMany");
		this._unwrap(moduleExports.Model, "bulkWrite");
	}
	patchAggregateExec() {
		const self = this;
		return (originalAggregate) => {
			return function exec(callback) {
				const parentSpan = this[_STORED_PARENT_SPAN];
				const span = startMongooseLegacySpan({
					collection: this._model.collection,
					modelName: this._model?.modelName,
					operation: "aggregate",
					origin: ORIGIN$23,
					parentSpan
				});
				return self._handleResponse(span, originalAggregate, this, arguments, callback);
			};
		};
	}
	patchQueryExec() {
		const self = this;
		return (originalExec) => {
			return function exec(callback) {
				if (this[_ALREADY_INSTRUMENTED]) return originalExec.apply(this, arguments);
				const parentSpan = this[_STORED_PARENT_SPAN];
				const span = startMongooseLegacySpan({
					collection: this.mongooseCollection,
					modelName: this.model.modelName,
					operation: this.op,
					origin: ORIGIN$23,
					parentSpan
				});
				return self._handleResponse(span, originalExec, this, arguments, callback);
			};
		};
	}
	patchOnModelMethods(op) {
		const self = this;
		return (originalOnModelFunction) => {
			return function method(options, callback) {
				const span = startMongooseLegacySpan({
					collection: this.constructor.collection,
					modelName: this.constructor.modelName,
					operation: op,
					origin: ORIGIN$23
				});
				if (options instanceof Function) callback = options;
				return self._handleResponse(span, originalOnModelFunction, this, arguments, callback);
			};
		};
	}
	_patchDocumentUpdateMethods(op) {
		const self = this;
		return (originalMethod) => {
			return function method(update, options, callback) {
				let actualCallback = callback;
				if (typeof update === "function") actualCallback = update;
				else if (typeof options === "function") actualCallback = options;
				const span = startMongooseLegacySpan({
					collection: this.constructor.collection,
					modelName: this.constructor.modelName,
					operation: op,
					origin: ORIGIN$23
				});
				const result = self._handleResponse(span, originalMethod, this, arguments, actualCallback);
				if (result && typeof result === "object") result[_ALREADY_INSTRUMENTED] = true;
				return result;
			};
		};
	}
	patchModelStatic(op) {
		const self = this;
		return (original) => {
			return function patchedStatic(docsOrOps, options, callback) {
				if (typeof options === "function") callback = options;
				const span = startMongooseLegacySpan({
					collection: this.collection,
					modelName: this.modelName,
					operation: op,
					origin: ORIGIN$23
				});
				return self._handleResponse(span, original, this, arguments, callback);
			};
		};
	}
	patchModelAggregate() {
		return (original) => {
			return function captureSpanContext() {
				const currentSpan = getActiveSpan$1();
				const aggregate = original.apply(this, arguments);
				if (aggregate) aggregate[_STORED_PARENT_SPAN] = currentSpan;
				return aggregate;
			};
		};
	}
	patchAndCaptureSpanContext(_funcName) {
		return (original) => {
			return function captureSpanContext() {
				this[_STORED_PARENT_SPAN] = getActiveSpan$1();
				return original.apply(this, arguments);
			};
		};
	}
	_handleResponse(span, exec, originalThis, args, callback) {
		return withActiveSpan$1(span, () => {
			if (callback instanceof Function) return handleCallbackResponse(callback, exec, originalThis, span, args);
			else return handlePromiseResponse(exec.apply(originalThis, args), span);
		});
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/mongoose/index.js
var INTEGRATION_NAME$42 = "Mongoose";
var instrumentMongoose = generateInstrumentOnce(INTEGRATION_NAME$42, () => new MongooseInstrumentation());
var _mongooseIntegration = (() => {
	return extendIntegration(mongooseIntegration$1(), {
		name: INTEGRATION_NAME$42,
		setupOnce() {
			instrumentMongoose();
		}
	});
});
var mongooseIntegration = defineIntegration(_mongooseIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/mysql/vendored/semconv.js
var ATTR_DB_CONNECTION_STRING$7 = "db.connection_string";
var DB_SYSTEM_VALUE_MYSQL$2 = "mysql";
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/mysql/vendored/utils.js
function getConfig$1(config) {
	const { host, port, database, user } = config?.connectionConfig || config || {};
	return {
		host,
		port,
		database,
		user
	};
}
function getJDBCString$2(host, port, database) {
	let jdbcString = `jdbc:mysql://${host || "localhost"}`;
	if (typeof port === "number") jdbcString += `:${port}`;
	if (typeof database === "string") jdbcString += `/${database}`;
	return jdbcString;
}
function getDbQueryText(query) {
	if (typeof query === "string") return query;
	else return query.sql;
}
function getSpanName$5(query) {
	const rawQuery = typeof query === "object" ? query.sql : query;
	const firstSpace = rawQuery?.indexOf(" ");
	if (typeof firstSpace === "number" && firstSpace !== -1) return rawQuery?.substring(0, firstSpace);
	return rawQuery;
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/mysql/vendored/instrumentation.js
var PACKAGE_NAME$13 = "@sentry/instrumentation-mysql";
var ORIGIN$22 = "auto.db.otel.mysql";
var MySQLInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$13, SDK_VERSION, config);
	}
	init() {
		return [new InstrumentationNodeModuleDefinition("mysql", [">=2.0.0 <3"], (moduleExports) => {
			if (isWrapped(moduleExports.createConnection)) this._unwrap(moduleExports, "createConnection");
			this._wrap(moduleExports, "createConnection", this._patchCreateConnection());
			if (isWrapped(moduleExports.createPool)) this._unwrap(moduleExports, "createPool");
			this._wrap(moduleExports, "createPool", this._patchCreatePool());
			if (isWrapped(moduleExports.createPoolCluster)) this._unwrap(moduleExports, "createPoolCluster");
			this._wrap(moduleExports, "createPoolCluster", this._patchCreatePoolCluster());
			return moduleExports;
		}, (moduleExports) => {
			if (moduleExports === void 0) return;
			this._unwrap(moduleExports, "createConnection");
			this._unwrap(moduleExports, "createPool");
			this._unwrap(moduleExports, "createPoolCluster");
		})];
	}
	_patchCreateConnection() {
		return (originalCreateConnection) => {
			const thisPlugin = this;
			return function createConnection(_connectionUri) {
				const originalResult = originalCreateConnection(...arguments);
				thisPlugin._wrap(originalResult, "query", thisPlugin._patchQuery(originalResult));
				return originalResult;
			};
		};
	}
	_patchCreatePool() {
		return (originalCreatePool) => {
			const thisPlugin = this;
			return function createPool(_config) {
				const pool = originalCreatePool(...arguments);
				thisPlugin._wrap(pool, "query", thisPlugin._patchQuery(pool));
				thisPlugin._wrap(pool, "getConnection", thisPlugin._patchGetConnection(pool));
				return pool;
			};
		};
	}
	_patchCreatePoolCluster() {
		return (originalCreatePoolCluster) => {
			const thisPlugin = this;
			return function createPool(_config) {
				const cluster = originalCreatePoolCluster(...arguments);
				thisPlugin._wrap(cluster, "getConnection", thisPlugin._patchGetConnection(cluster));
				return cluster;
			};
		};
	}
	_patchGetConnection(pool) {
		return (originalGetConnection) => {
			const thisPlugin = this;
			return function getConnection(arg1, arg2, arg3) {
				if (!thisPlugin["_enabled"]) {
					thisPlugin._unwrap(pool, "getConnection");
					return originalGetConnection.apply(pool, arguments);
				}
				if (arguments.length === 1 && typeof arg1 === "function") {
					const patchFn = thisPlugin._getConnectionCallbackPatchFn(arg1);
					return originalGetConnection.call(pool, patchFn);
				}
				if (arguments.length === 2 && typeof arg2 === "function") {
					const patchFn = thisPlugin._getConnectionCallbackPatchFn(arg2);
					return originalGetConnection.call(pool, arg1, patchFn);
				}
				if (arguments.length === 3 && typeof arg3 === "function") {
					const patchFn = thisPlugin._getConnectionCallbackPatchFn(arg3);
					return originalGetConnection.call(pool, arg1, arg2, patchFn);
				}
				return originalGetConnection.apply(pool, arguments);
			};
		};
	}
	_getConnectionCallbackPatchFn(cb) {
		const thisPlugin = this;
		const scope = getCurrentScope();
		return function(err, connection) {
			if (connection) {
				if (!isWrapped(connection.query)) thisPlugin._wrap(connection, "query", thisPlugin._patchQuery(connection));
			}
			if (typeof cb === "function") withScope(scope, () => cb.call(this, err, connection));
		};
	}
	_patchQuery(connection) {
		return (originalQuery) => {
			const thisPlugin = this;
			return function query(query, _valuesOrCallback, _callback) {
				if (!thisPlugin["_enabled"]) {
					thisPlugin._unwrap(connection, "query");
					return originalQuery.apply(connection, arguments);
				}
				const { host, port, database, user } = getConfig$1(connection.config);
				const portNumber = parseInt(String(port), 10);
				const attributes = {
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$22,
					[Kt]: DB_SYSTEM_VALUE_MYSQL$2,
					[ATTR_DB_CONNECTION_STRING$7]: getJDBCString$2(host, port, database),
					[Nt]: database,
					[Qt]: user,
					[Ht]: getDbQueryText(query),
					[Il]: host
				};
				if (!isNaN(portNumber)) attributes[Ol] = portNumber;
				const span = startInactiveSpan$1({
					name: getSpanName$5(query),
					kind: SPAN_KIND.CLIENT,
					attributes
				});
				const cbIndex = Array.from(arguments).findIndex((arg) => typeof arg === "function");
				const scope = getCurrentScope();
				if (cbIndex === -1) {
					const streamableQuery = withActiveSpan$1(span, () => {
						return originalQuery.apply(connection, arguments);
					});
					bindScopeToEmitter(streamableQuery, scope);
					return streamableQuery.on("error", (err) => {
						span.setStatus({
							code: 2,
							message: err.message
						});
					}).on("end", () => {
						span.end();
					});
				} else {
					thisPlugin._wrap(arguments, cbIndex, thisPlugin._patchCallbackQuery(span, scope));
					return withActiveSpan$1(span, () => {
						return originalQuery.apply(connection, arguments);
					});
				}
			};
		};
	}
	_patchCallbackQuery(span, scope) {
		return (originalCallback) => {
			return function(err, _results, _fields) {
				if (err) span.setStatus({
					code: 2,
					message: err.message
				});
				span.end();
				return withScope(scope, () => originalCallback(...arguments));
			};
		};
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/mysql/index.js
var INTEGRATION_NAME$41 = "Mysql";
var instrumentMysql = generateInstrumentOnce(INTEGRATION_NAME$41, () => new MySQLInstrumentation({}));
var _mysqlIntegration = (() => {
	return {
		name: INTEGRATION_NAME$41,
		setupOnce() {
			instrumentMysql();
		}
	};
});
var mysqlIntegration = defineIntegration(_mysqlIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/mysql2/vendored/semconv.js
var ATTR_DB_CONNECTION_STRING$6 = "db.connection_string";
var DB_SYSTEM_VALUE_MYSQL$1 = "mysql";
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/mysql2/vendored/utils.js
function getConnectionAttributes$2(config) {
	const { host, port, database, user } = getConfig(config);
	const attrs = {
		[ATTR_DB_CONNECTION_STRING$6]: getJDBCString$1(host, port, database),
		[Nt]: database,
		[Qt]: user,
		[Il]: host
	};
	const portNumber = parseInt(port, 10);
	if (!isNaN(portNumber)) attrs[Ol] = portNumber;
	return attrs;
}
function getConfig(config) {
	const { host, port, database, user } = config?.connectionConfig || config || {};
	return {
		host,
		port,
		database,
		user
	};
}
function getJDBCString$1(host, port, database) {
	let jdbcString = `jdbc:mysql://${host || "localhost"}`;
	if (typeof port === "number") jdbcString += `:${port}`;
	if (typeof database === "string") jdbcString += `/${database}`;
	return jdbcString;
}
function getQueryText$1(query, format, values) {
	const [querySql, queryValues] = typeof query === "string" ? [query, values] : [query.sql, hasValues(query) ? values || query.values : values];
	try {
		if (format && queryValues) return format(querySql, queryValues);
		else return querySql;
	} catch {
		return "Could not determine the query due to an error in formatting";
	}
}
function hasValues(obj) {
	return "values" in obj;
}
function getSpanName$4(query) {
	const rawQuery = typeof query === "object" ? query.sql : query;
	const firstSpace = rawQuery?.indexOf(" ");
	if (typeof firstSpace === "number" && firstSpace !== -1) return rawQuery?.substring(0, firstSpace);
	return rawQuery;
}
var once$2 = (fn) => {
	let called = false;
	return (...args) => {
		if (called) return;
		called = true;
		return fn(...args);
	};
};
function getConnectionPrototypeToInstrument(connection) {
	const connectionPrototype = connection.prototype;
	const basePrototype = Object.getPrototypeOf(connectionPrototype);
	if (typeof basePrototype?.query === "function" && typeof basePrototype?.execute === "function") return basePrototype;
	return connectionPrototype;
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/mysql2/vendored/instrumentation.js
var PACKAGE_NAME$12 = "@sentry/instrumentation-mysql2";
var ORIGIN$21 = "auto.db.otel.mysql2";
var supportedVersions$6 = [">=1.4.2 <3.20.0"];
var MySQL2Instrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$12, SDK_VERSION, config);
	}
	init() {
		let format;
		function setFormatFunction(moduleExports) {
			if (!format && moduleExports.format) format = moduleExports.format;
		}
		const patch = (ConnectionPrototype) => {
			if (isWrapped(ConnectionPrototype.query)) this._unwrap(ConnectionPrototype, "query");
			this._wrap(ConnectionPrototype, "query", this._patchQuery(format));
			if (isWrapped(ConnectionPrototype.execute)) this._unwrap(ConnectionPrototype, "execute");
			this._wrap(ConnectionPrototype, "execute", this._patchQuery(format));
		};
		const unpatch = (ConnectionPrototype) => {
			this._unwrap(ConnectionPrototype, "query");
			this._unwrap(ConnectionPrototype, "execute");
		};
		return [new InstrumentationNodeModuleDefinition("mysql2", supportedVersions$6, (moduleExports) => {
			setFormatFunction(moduleExports);
			return moduleExports;
		}, () => {}, [new InstrumentationNodeModuleFile("mysql2/promise.js", supportedVersions$6, (moduleExports) => {
			setFormatFunction(moduleExports);
			return moduleExports;
		}, () => {}), new InstrumentationNodeModuleFile("mysql2/lib/connection.js", supportedVersions$6, (moduleExports) => {
			const ConnectionPrototype = getConnectionPrototypeToInstrument(moduleExports);
			patch(ConnectionPrototype);
			return moduleExports;
		}, (moduleExports) => {
			if (moduleExports === void 0) return;
			const ConnectionPrototype = getConnectionPrototypeToInstrument(moduleExports);
			unpatch(ConnectionPrototype);
		})])];
	}
	_patchQuery(format) {
		const thisPlugin = this;
		return (originalQuery) => {
			return function query(query, _valuesOrCallback, _callback) {
				let values;
				if (Array.isArray(_valuesOrCallback)) values = _valuesOrCallback;
				else if (arguments[2]) values = [_valuesOrCallback];
				const attributes = {
					...getConnectionAttributes$2(this.config),
					[Kt]: DB_SYSTEM_VALUE_MYSQL$1,
					[Ht]: getQueryText$1(query, format, values),
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$21
				};
				const span = startInactiveSpan$1({
					name: getSpanName$4(query),
					kind: SPAN_KIND.CLIENT,
					attributes
				});
				const endSpan = once$2((err) => {
					if (err) span.setStatus({
						code: 2,
						message: err.message
					});
					span.end();
				});
				if (arguments.length === 1) {
					if (typeof query.onResult === "function") thisPlugin._wrap(query, "onResult", thisPlugin._patchCallbackQuery(endSpan));
					const streamableQuery = originalQuery.apply(this, arguments);
					streamableQuery.once("error", (err) => {
						endSpan(err);
					}).once("result", () => {
						endSpan();
					});
					return streamableQuery;
				}
				if (typeof arguments[1] === "function") thisPlugin._wrap(arguments, 1, thisPlugin._patchCallbackQuery(endSpan));
				else if (typeof arguments[2] === "function") thisPlugin._wrap(arguments, 2, thisPlugin._patchCallbackQuery(endSpan));
				return originalQuery.apply(this, arguments);
			};
		};
	}
	_patchCallbackQuery(endSpan) {
		return (originalCallback) => {
			return function(...args) {
				endSpan(args[0]);
				return originalCallback(...args);
			};
		};
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/mysql2/index.js
var INTEGRATION_NAME$40 = "Mysql2";
var instrumentMysql2$1 = generateInstrumentOnce(INTEGRATION_NAME$40, () => new MySQL2Instrumentation());
var _mysql2Integration = (() => {
	return extendIntegration(mysql2Integration$1(), {
		name: INTEGRATION_NAME$40,
		setupOnce() {
			instrumentMysql2$1();
		}
	});
});
var mysql2Integration = defineIntegration(_mysql2Integration);
//#endregion
//#region node_modules/@sentry/node/build/esm/sdk/diagnosticsChannelInjection.js
var loader;
var cached;
function setDiagnosticsChannelInjectionLoader(load) {
	loader = load;
}
function isDiagnosticsChannelInjectionEnabled() {
	return !!loader;
}
function resolveDiagnosticsChannelInjection() {
	if (!loader) return;
	return cached ?? (cached = loader());
}
//#endregion
//#region node_modules/@sentry/node/build/esm/utils/redisCache.js
var SINGLE_ARG_COMMANDS = [
	"get",
	"set",
	"setex"
];
var GET_COMMANDS = ["get", "mget"];
var SET_COMMANDS = ["set", "setex"];
var REMOVE_COMMANDS = ["del", "unlink"];
function isInCommands(redisCommands, command) {
	return redisCommands.includes(command.toLowerCase());
}
function getCacheOperation(command) {
	if (isInCommands(GET_COMMANDS, command)) return "cache.get";
	else if (isInCommands(SET_COMMANDS, command)) return "cache.put";
	else if (isInCommands(REMOVE_COMMANDS, command)) return "cache.remove";
	else return;
}
function keyHasPrefix(key, prefixes) {
	return prefixes.some((prefix) => key.startsWith(prefix));
}
function getCacheKeySafely(redisCommand, cmdArgs) {
	try {
		if (cmdArgs.length === 0) return;
		const processArg = (arg) => {
			if (typeof arg === "string" || typeof arg === "number" || Buffer.isBuffer(arg)) return [arg.toString()];
			else if (Array.isArray(arg)) return flatten(arg.map((arg2) => processArg(arg2)));
			else return ["<unknown>"];
		};
		const firstArg = cmdArgs[0];
		if (isInCommands(SINGLE_ARG_COMMANDS, redisCommand) && firstArg != null) return processArg(firstArg);
		return flatten(cmdArgs.map((arg) => processArg(arg)));
	} catch {
		return;
	}
}
function shouldConsiderForCache(redisCommand, keys, prefixes) {
	if (!getCacheOperation(redisCommand)) return false;
	for (const key of keys) if (keyHasPrefix(key, prefixes)) return true;
	return false;
}
function calculateCacheItemSize(response) {
	const getSize = (value) => {
		try {
			if (Buffer.isBuffer(value)) return value.byteLength;
			else if (typeof value === "string") return value.length;
			else if (typeof value === "number") return value.toString().length;
			else if (value === null || value === void 0) return 0;
			return JSON.stringify(value).length;
		} catch {
			return;
		}
	};
	return Array.isArray(response) ? response.reduce((acc, curr) => {
		const size = getSize(curr);
		return typeof size === "number" ? acc !== void 0 ? acc + size : size : acc;
	}, 0) : getSize(response);
}
function flatten(input) {
	const result = [];
	const flattenHelper = (input2) => {
		input2.forEach((el) => {
			if (Array.isArray(el)) flattenHelper(el);
			else result.push(el);
		});
	};
	flattenHelper(input);
	return result;
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/redis/cache.js
var _redisOptions = {};
function setRedisOptions(options) {
	_redisOptions = options;
}
var cacheResponseHook = (span, redisCommand, cmdArgs, response) => {
	const safeKey = getCacheKeySafely(redisCommand, cmdArgs);
	const cacheOperation = getCacheOperation(redisCommand);
	if (!safeKey || !cacheOperation || !_redisOptions.cachePrefixes || !shouldConsiderForCache(redisCommand, safeKey, _redisOptions.cachePrefixes)) return;
	const spanData = spanToJSON(span).data;
	const networkPeerAddress = spanData["net.peer.name"] ?? spanData["server.address"];
	const networkPeerPort = spanData["net.peer.port"] ?? spanData["server.port"];
	if (networkPeerPort && networkPeerAddress) span.setAttributes({
		"network.peer.address": networkPeerAddress,
		"network.peer.port": networkPeerPort
	});
	const cacheItemSize = isInCommands(REMOVE_COMMANDS, redisCommand) ? void 0 : calculateCacheItemSize(response);
	if (cacheItemSize) span.setAttribute(SEMANTIC_ATTRIBUTE_CACHE_ITEM_SIZE, cacheItemSize);
	if (isInCommands(GET_COMMANDS, redisCommand) && cacheItemSize !== void 0) span.setAttribute(SEMANTIC_ATTRIBUTE_CACHE_HIT, cacheItemSize > 0);
	span.setAttributes({
		[SEMANTIC_ATTRIBUTE_SENTRY_OP]: cacheOperation,
		[SEMANTIC_ATTRIBUTE_CACHE_KEY]: safeKey
	});
	const spanDescription = safeKey.join(", ");
	span.updateName(_redisOptions.maxCacheKeyLength ? truncate(spanDescription, _redisOptions.maxCacheKeyLength) : spanDescription);
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/redis/vendored/semconv.js
var ATTR_DB_CONNECTION_STRING$5 = "db.connection_string";
var DB_SYSTEM_VALUE_REDIS$1 = "redis";
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/redis/vendored/ioredis-instrumentation.js
var PACKAGE_NAME$11 = "@sentry/instrumentation-ioredis";
var ORIGIN$20 = "auto.db.otel.redis";
var SUPPORTED_VERSIONS$3 = [">=2.0.0 <5.11.0"];
function endSpan$2(span, err) {
	if (err) span.setStatus({
		code: 2,
		message: err.message
	});
	span.end();
}
var IORedisInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$11, SDK_VERSION, config);
	}
	init() {
		return [new InstrumentationNodeModuleDefinition("ioredis", SUPPORTED_VERSIONS$3, (module) => {
			const moduleExports = module[Symbol.toStringTag] === "Module" && module.default ? module.default : module;
			if (isWrapped(moduleExports.prototype.sendCommand)) this._unwrap(moduleExports.prototype, "sendCommand");
			this._wrap(moduleExports.prototype, "sendCommand", this._patchSendCommand());
			if (isWrapped(moduleExports.prototype.connect)) this._unwrap(moduleExports.prototype, "connect");
			this._wrap(moduleExports.prototype, "connect", this._patchConnection());
			return module;
		}, (module) => {
			if (module === void 0) return;
			const moduleExports = module[Symbol.toStringTag] === "Module" && module.default ? module.default : module;
			this._unwrap(moduleExports.prototype, "sendCommand");
			this._unwrap(moduleExports.prototype, "connect");
		})];
	}
	_patchSendCommand() {
		const instrumentation = this;
		return (original) => {
			return function(...args) {
				const cmd = args[0];
				if (args.length < 1 || typeof cmd !== "object" || !getActiveSpan$1()) return original.apply(this, args);
				const { host, port } = this.options;
				const attributes = {
					[Kt]: DB_SYSTEM_VALUE_REDIS$1,
					[Ht]: defaultDbStatementSerializer(cmd.name, cmd.args),
					[ATTR_DB_CONNECTION_STRING$5]: `redis://${host}:${port}`,
					[Il]: host,
					[Ol]: port,
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$20
				};
				const span = startInactiveSpan$1({
					name: cmd.name,
					kind: SPAN_KIND.CLIENT,
					attributes
				});
				try {
					const result = original.apply(this, args);
					const origResolve = cmd.resolve;
					cmd.resolve = function(response) {
						instrumentation._callResponseHook(span, cmd, response);
						endSpan$2(span, null);
						origResolve(response);
					};
					const origReject = cmd.reject;
					cmd.reject = function(err) {
						endSpan$2(span, err);
						origReject(err);
					};
					return result;
				} catch (error) {
					endSpan$2(span, error);
					throw error;
				}
			};
		};
	}
	_patchConnection() {
		return (original) => {
			return function(...args) {
				if (!getActiveSpan$1()) return original.apply(this, args);
				const { host, port } = this.options;
				const attributes = {
					[Kt]: DB_SYSTEM_VALUE_REDIS$1,
					[Ht]: "connect",
					[ATTR_DB_CONNECTION_STRING$5]: `redis://${host}:${port}`,
					[Il]: host,
					[Ol]: port,
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$20
				};
				const span = startInactiveSpan$1({
					name: "connect",
					kind: SPAN_KIND.CLIENT,
					attributes
				});
				try {
					const result = original.apply(this, args);
					if (result instanceof Promise) return result.then((value) => {
						endSpan$2(span, null);
						return value;
					}, (error) => {
						endSpan$2(span, error);
						return Promise.reject(error);
					});
					endSpan$2(span, null);
					return result;
				} catch (error) {
					endSpan$2(span, error);
					throw error;
				}
			};
		};
	}
	_callResponseHook(span, cmd, response) {
		const { responseHook } = this.getConfig();
		if (!responseHook) return;
		try {
			responseHook(span, cmd.name, cmd.args, response);
		} catch {}
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/redis/vendored/redis-instrumentation.js
var PACKAGE_NAME$10 = "@sentry/instrumentation-redis";
var ORIGIN$19 = "auto.db.otel.redis";
var OTEL_OPEN_SPANS = /* @__PURE__ */ Symbol("opentelemetry.instrumentation.redis.open_spans");
var MULTI_COMMAND_OPTIONS = /* @__PURE__ */ Symbol("opentelemetry.instrumentation.redis.multi_command_options");
function endSpan$1(span, err) {
	if (err) span.setStatus({
		code: 2,
		message: err.message
	});
	span.end();
}
function runResponseHook$2(responseHook, span, commandName, commandArgs, response) {
	if (!responseHook) return;
	try {
		responseHook(span, commandName, commandArgs, response);
	} catch {}
}
function removeCredentialsFromDBConnectionStringAttribute(url) {
	if (typeof url !== "string" || !url) return;
	try {
		const u = new URL(url);
		u.searchParams.delete("user_pwd");
		u.username = "";
		u.password = "";
		return u.href;
	} catch (err) {
		DEBUG_BUILD$1 && debug$3.error("failed to sanitize redis connection url", err);
	}
}
function getClientAttributes(options) {
	return {
		[Kt]: DB_SYSTEM_VALUE_REDIS$1,
		[Il]: options?.socket?.host,
		[Ol]: options?.socket?.port,
		[ATTR_DB_CONNECTION_STRING$5]: removeCredentialsFromDBConnectionStringAttribute(options?.url),
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$19
	};
}
var _RedisInstrumentationV2_V3 = class _RedisInstrumentationV2_V3 extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$10, SDK_VERSION, config);
	}
	init() {
		return [new InstrumentationNodeModuleDefinition("redis", [">=2.6.0 <4"], (moduleExports) => {
			if (isWrapped(moduleExports.RedisClient.prototype["internal_send_command"])) this._unwrap(moduleExports.RedisClient.prototype, "internal_send_command");
			this._wrap(moduleExports.RedisClient.prototype, "internal_send_command", this._getPatchInternalSendCommand());
			return moduleExports;
		}, (moduleExports) => {
			if (moduleExports === void 0) return;
			this._unwrap(moduleExports.RedisClient.prototype, "internal_send_command");
		})];
	}
	_getPatchInternalSendCommand() {
		const instrumentation = this;
		return function internal_send_command(original) {
			return function internal_send_command_trace(cmd) {
				if (arguments.length !== 1 || typeof cmd !== "object") return original.apply(this, arguments);
				const attributes = {
					[Kt]: DB_SYSTEM_VALUE_REDIS$1,
					[Ht]: defaultDbStatementSerializer(cmd.command, cmd.args),
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$19
				};
				if (this.connection_options) {
					attributes[Il] = this.connection_options.host;
					attributes[Ol] = this.connection_options.port;
				}
				if (this.address) attributes[ATTR_DB_CONNECTION_STRING$5] = `redis://${this.address}`;
				const span = startInactiveSpan$1({
					name: `${_RedisInstrumentationV2_V3.COMPONENT}-${cmd.command}`,
					kind: SPAN_KIND.CLIENT,
					attributes
				});
				const originalCallback = arguments[0].callback;
				if (originalCallback) {
					const parentSpan = getActiveSpan$1();
					arguments[0].callback = function callback(err, reply) {
						runResponseHook$2(instrumentation.getConfig().responseHook, span, cmd.command, cmd.args, reply);
						endSpan$1(span, err);
						return withActiveSpan$1(parentSpan ?? null, () => originalCallback.apply(this, arguments));
					};
				}
				try {
					return original.apply(this, arguments);
				} catch (rethrow) {
					endSpan$1(span, rethrow);
					throw rethrow;
				}
			};
		};
	}
};
_RedisInstrumentationV2_V3.COMPONENT = "redis";
var RedisInstrumentationV2_V3 = _RedisInstrumentationV2_V3;
var _RedisInstrumentationV4_V5 = class _RedisInstrumentationV4_V5 extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$10, SDK_VERSION, config);
	}
	init() {
		return [this._getInstrumentationNodeModuleDefinition("@redis/client"), this._getInstrumentationNodeModuleDefinition("@node-redis/client")];
	}
	_getInstrumentationNodeModuleDefinition(basePackageName) {
		const commanderModuleFile = new InstrumentationNodeModuleFile(`${basePackageName}/dist/lib/commander.js`, ["^1.0.0"], (moduleExports, moduleVersion) => {
			const transformCommandArguments = moduleExports.transformCommandArguments;
			if (!transformCommandArguments) {
				DEBUG_BUILD$1 && debug$3.error("internal instrumentation error, missing transformCommandArguments function");
				return moduleExports;
			}
			const functionToPatch = moduleVersion?.startsWith("1.0.") ? "extendWithCommands" : "attachCommands";
			if (isWrapped(moduleExports?.[functionToPatch])) this._unwrap(moduleExports, functionToPatch);
			this._wrap(moduleExports, functionToPatch, this._getPatchExtendWithCommands(transformCommandArguments));
			return moduleExports;
		}, (moduleExports) => {
			if (isWrapped(moduleExports?.extendWithCommands)) this._unwrap(moduleExports, "extendWithCommands");
			if (isWrapped(moduleExports?.attachCommands)) this._unwrap(moduleExports, "attachCommands");
		});
		const multiCommanderModule = new InstrumentationNodeModuleFile(`${basePackageName}/dist/lib/client/multi-command.js`, ["^1.0.0", ">=5.0.0 <5.12.0"], (moduleExports) => {
			const redisClientMultiCommandPrototype = moduleExports?.default?.prototype;
			if (isWrapped(redisClientMultiCommandPrototype?.exec)) this._unwrap(redisClientMultiCommandPrototype, "exec");
			this._wrap(redisClientMultiCommandPrototype, "exec", this._getPatchMultiCommandsExec());
			if (isWrapped(redisClientMultiCommandPrototype?.execAsPipeline)) this._unwrap(redisClientMultiCommandPrototype, "execAsPipeline");
			this._wrap(redisClientMultiCommandPrototype, "execAsPipeline", this._getPatchMultiCommandsExec());
			if (isWrapped(redisClientMultiCommandPrototype?.addCommand)) this._unwrap(redisClientMultiCommandPrototype, "addCommand");
			this._wrap(redisClientMultiCommandPrototype, "addCommand", this._getPatchMultiCommandsAddCommand());
			return moduleExports;
		}, (moduleExports) => {
			const redisClientMultiCommandPrototype = moduleExports?.default?.prototype;
			if (isWrapped(redisClientMultiCommandPrototype?.exec)) this._unwrap(redisClientMultiCommandPrototype, "exec");
			if (isWrapped(redisClientMultiCommandPrototype?.execAsPipeline)) this._unwrap(redisClientMultiCommandPrototype, "execAsPipeline");
			if (isWrapped(redisClientMultiCommandPrototype?.addCommand)) this._unwrap(redisClientMultiCommandPrototype, "addCommand");
		});
		const clientIndexModule = new InstrumentationNodeModuleFile(`${basePackageName}/dist/lib/client/index.js`, ["^1.0.0", ">=5.0.0 <5.12.0"], (moduleExports) => {
			const redisClientPrototype = moduleExports?.default?.prototype;
			if (redisClientPrototype?.multi) {
				if (isWrapped(redisClientPrototype?.multi)) this._unwrap(redisClientPrototype, "multi");
				this._wrap(redisClientPrototype, "multi", this._getPatchRedisClientMulti());
			}
			if (redisClientPrototype?.MULTI) {
				if (isWrapped(redisClientPrototype?.MULTI)) this._unwrap(redisClientPrototype, "MULTI");
				this._wrap(redisClientPrototype, "MULTI", this._getPatchRedisClientMulti());
			}
			if (isWrapped(redisClientPrototype?.sendCommand)) this._unwrap(redisClientPrototype, "sendCommand");
			this._wrap(redisClientPrototype, "sendCommand", this._getPatchRedisClientSendCommand());
			if (isWrapped(redisClientPrototype?.connect)) this._unwrap(redisClientPrototype, "connect");
			this._wrap(redisClientPrototype, "connect", this._getPatchedClientConnect());
			return moduleExports;
		}, (moduleExports) => {
			const redisClientPrototype = moduleExports?.default?.prototype;
			if (isWrapped(redisClientPrototype?.multi)) this._unwrap(redisClientPrototype, "multi");
			if (isWrapped(redisClientPrototype?.MULTI)) this._unwrap(redisClientPrototype, "MULTI");
			if (isWrapped(redisClientPrototype?.sendCommand)) this._unwrap(redisClientPrototype, "sendCommand");
			if (isWrapped(redisClientPrototype?.connect)) this._unwrap(redisClientPrototype, "connect");
		});
		return new InstrumentationNodeModuleDefinition(basePackageName, ["^1.0.0", ">=5.0.0 <5.12.0"], (moduleExports) => moduleExports, () => {}, [
			commanderModuleFile,
			multiCommanderModule,
			clientIndexModule
		]);
	}
	_getPatchExtendWithCommands(transformCommandArguments) {
		const plugin = this;
		return function extendWithCommandsPatchWrapper(original) {
			return function extendWithCommandsPatch(config) {
				if (config?.BaseClass?.name !== "RedisClient") return original.apply(this, arguments);
				const origExecutor = config.executor;
				config.executor = function(command, args) {
					const redisCommandArguments = transformCommandArguments(command, args).args;
					return plugin._traceClientCommand(origExecutor, this, arguments, redisCommandArguments);
				};
				return original.apply(this, arguments);
			};
		};
	}
	_getPatchMultiCommandsExec() {
		const plugin = this;
		return function execPatchWrapper(original) {
			return function execPatch() {
				const execRes = original.apply(this, arguments);
				if (typeof execRes?.then !== "function") {
					DEBUG_BUILD$1 && debug$3.error("non-promise result when patching exec/execAsPipeline");
					return execRes;
				}
				return execRes.then((redisRes) => {
					const openSpans = this[OTEL_OPEN_SPANS];
					plugin._endSpansWithRedisReplies(openSpans, redisRes);
					return redisRes;
				}).catch((err) => {
					const openSpans = this[OTEL_OPEN_SPANS];
					if (!openSpans) DEBUG_BUILD$1 && debug$3.error("cannot find open spans to end for multi/pipeline");
					else {
						const replies = err.constructor.name === "MultiErrorReply" ? err.replies : new Array(openSpans.length).fill(err);
						plugin._endSpansWithRedisReplies(openSpans, replies);
					}
					return Promise.reject(err);
				});
			};
		};
	}
	_getPatchMultiCommandsAddCommand() {
		const plugin = this;
		return function addCommandWrapper(original) {
			return function addCommandPatch(args) {
				return plugin._traceClientCommand(original, this, arguments, args);
			};
		};
	}
	_getPatchRedisClientMulti() {
		return function multiPatchWrapper(original) {
			return function multiPatch() {
				const multiRes = original.apply(this, arguments);
				multiRes[MULTI_COMMAND_OPTIONS] = this.options;
				return multiRes;
			};
		};
	}
	_getPatchRedisClientSendCommand() {
		const plugin = this;
		return function sendCommandWrapper(original) {
			return function sendCommandPatch(args) {
				return plugin._traceClientCommand(original, this, arguments, args);
			};
		};
	}
	_getPatchedClientConnect() {
		return function connectWrapper(original) {
			return function patchedConnect() {
				const attributes = getClientAttributes(this.options);
				const span = startInactiveSpan$1({
					name: `${_RedisInstrumentationV4_V5.COMPONENT}-connect`,
					kind: SPAN_KIND.CLIENT,
					attributes
				});
				return withActiveSpan$1(span, () => original.apply(this)).then((result) => {
					span.end();
					return result;
				}, (error) => {
					endSpan$1(span, error);
					return Promise.reject(error);
				});
			};
		};
	}
	_traceClientCommand(origFunction, origThis, origArguments, redisCommandArguments) {
		const clientOptions = origThis.options || origThis[MULTI_COMMAND_OPTIONS];
		const commandName = redisCommandArguments[0];
		const commandArgs = redisCommandArguments.slice(1);
		const attributes = getClientAttributes(clientOptions);
		const dbStatement = defaultDbStatementSerializer(commandName, commandArgs);
		if (dbStatement != null) attributes[Ht] = dbStatement;
		const span = startInactiveSpan$1({
			name: `${_RedisInstrumentationV4_V5.COMPONENT}-${commandName}`,
			kind: SPAN_KIND.CLIENT,
			attributes
		});
		const res = withActiveSpan$1(span, () => origFunction.apply(origThis, origArguments));
		if (res instanceof Promise) res.then((redisRes) => {
			this._endSpanWithResponse(span, commandName, commandArgs, redisRes, void 0);
		}, (err) => {
			this._endSpanWithResponse(span, commandName, commandArgs, null, err);
		});
		else {
			const redisClientMultiCommand = res;
			redisClientMultiCommand[OTEL_OPEN_SPANS] = redisClientMultiCommand[OTEL_OPEN_SPANS] || [];
			redisClientMultiCommand[OTEL_OPEN_SPANS].push({
				span,
				commandName,
				commandArgs
			});
		}
		return res;
	}
	_endSpansWithRedisReplies(openSpans, replies) {
		if (!openSpans) {
			DEBUG_BUILD$1 && debug$3.error("cannot find open spans to end for redis multi/pipeline");
			return;
		}
		if (replies.length !== openSpans.length) {
			DEBUG_BUILD$1 && debug$3.error("number of multi command spans does not match response from redis");
			return;
		}
		for (let i = 0; i < openSpans.length; i++) {
			const { span, commandName, commandArgs } = openSpans[i];
			const currCommandRes = replies[i];
			const [res, err] = currCommandRes instanceof Error ? [null, currCommandRes] : [currCommandRes, void 0];
			this._endSpanWithResponse(span, commandName, commandArgs, res, err);
		}
	}
	_endSpanWithResponse(span, commandName, commandArgs, response, error) {
		if (!error) runResponseHook$2(this.getConfig().responseHook, span, commandName, commandArgs, response);
		endSpan$1(span, error);
	}
};
_RedisInstrumentationV4_V5.COMPONENT = "redis";
var RedisInstrumentationV4_V5 = _RedisInstrumentationV4_V5;
var RedisInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$10, SDK_VERSION, config);
		this.initialized = false;
		this.instrumentationV2_V3 = new RedisInstrumentationV2_V3(this.getConfig());
		this.instrumentationV4_V5 = new RedisInstrumentationV4_V5(this.getConfig());
		this.initialized = true;
	}
	setConfig(config = {}) {
		super.setConfig(config);
		if (!this.initialized) return;
		this.instrumentationV2_V3.setConfig(config);
		this.instrumentationV4_V5.setConfig(config);
	}
	init() {}
	getModuleDefinitions() {
		return [...this.instrumentationV2_V3.getModuleDefinitions(), ...this.instrumentationV4_V5.getModuleDefinitions()];
	}
	setTracerProvider(tracerProvider) {
		super.setTracerProvider(tracerProvider);
		if (!this.initialized) return;
		this.instrumentationV2_V3.setTracerProvider(tracerProvider);
		this.instrumentationV4_V5.setTracerProvider(tracerProvider);
	}
	enable() {
		super.enable();
		if (!this.initialized) return;
		this.instrumentationV2_V3.enable();
		this.instrumentationV4_V5.enable();
	}
	disable() {
		super.disable();
		if (!this.initialized) return;
		this.instrumentationV2_V3.disable();
		this.instrumentationV4_V5.disable();
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/redis/index.js
var INTEGRATION_NAME$39 = "Redis";
var instrumentIORedis = generateInstrumentOnce(`${INTEGRATION_NAME$39}.IORedis`, () => {
	return new IORedisInstrumentation({ responseHook: cacheResponseHook });
});
var instrumentRedisModule = generateInstrumentOnce(`${INTEGRATION_NAME$39}.Redis`, () => {
	return new RedisInstrumentation({ responseHook: cacheResponseHook });
});
var instrumentRedis = Object.assign(() => {
	if (!isDiagnosticsChannelInjectionEnabled() || !diagnosticsChannel.tracingChannel) {
		instrumentIORedis();
		instrumentRedisModule();
	}
}, { id: INTEGRATION_NAME$39 });
var _redisIntegration = ((options = {}) => {
	return extendIntegration(redisIntegration$1({ responseHook: cacheResponseHook }), {
		name: INTEGRATION_NAME$39,
		setupOnce() {
			setRedisOptions(options);
			instrumentRedis();
		}
	});
});
var redisIntegration = defineIntegration(_redisIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/postgres/vendored/enums/SpanNames.js
var SpanNames = /* @__PURE__ */ ((SpanNames2) => {
	SpanNames2["QUERY_PREFIX"] = "pg.query";
	SpanNames2["CONNECT"] = "pg.connect";
	SpanNames2["POOL_CONNECT"] = "pg-pool.connect";
	return SpanNames2;
})(SpanNames || {});
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/postgres/vendored/enums/AttributeNames.js
var AttributeNames$5 = /* @__PURE__ */ ((AttributeNames2) => {
	AttributeNames2["PG_PLAN"] = "db.postgresql.plan";
	AttributeNames2["IDLE_TIMEOUT_MILLIS"] = "db.postgresql.idle.timeout.millis";
	AttributeNames2["MAX_CLIENT"] = "db.postgresql.max.client";
	return AttributeNames2;
})(AttributeNames$5 || {});
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/postgres/vendored/semconv.js
var ATTR_DB_CONNECTION_STRING$4 = "db.connection_string";
var DB_SYSTEM_VALUE_POSTGRESQL = "postgresql";
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/postgres/vendored/utils.js
var ORIGIN$18 = "auto.db.otel.postgres";
function getQuerySpanName(dbName, queryConfig) {
	if (!queryConfig) return SpanNames.QUERY_PREFIX;
	const command = typeof queryConfig.name === "string" && queryConfig.name ? queryConfig.name : parseNormalizedOperationName(queryConfig.text);
	return `${SpanNames.QUERY_PREFIX}:${command}${dbName ? ` ${dbName}` : ""}`;
}
function parseNormalizedOperationName(queryText) {
	const trimmedQuery = queryText.trim();
	const indexOfFirstSpace = trimmedQuery.indexOf(" ");
	let sqlCommand = indexOfFirstSpace === -1 ? trimmedQuery : trimmedQuery.slice(0, indexOfFirstSpace);
	sqlCommand = sqlCommand.toUpperCase();
	return sqlCommand.endsWith(";") ? sqlCommand.slice(0, -1) : sqlCommand;
}
function parseAndMaskConnectionString(connectionString) {
	try {
		const url = new URL(connectionString);
		url.username = "";
		url.password = "";
		return url.toString();
	} catch {
		return "postgresql://localhost:5432/";
	}
}
function getConnectionString$1(params) {
	if ("connectionString" in params && params.connectionString) return parseAndMaskConnectionString(params.connectionString);
	return `postgresql://${params.host || "localhost"}:${params.port || 5432}/${params.database || ""}`;
}
function getPort$2(port) {
	if (Number.isInteger(port)) return port;
}
function getSemanticAttributesFromConnection(params) {
	return {
		[Kt]: DB_SYSTEM_VALUE_POSTGRESQL,
		[Nt]: params.database,
		[ATTR_DB_CONNECTION_STRING$4]: getConnectionString$1(params),
		[Qt]: params.user,
		[Il]: params.host,
		[Ol]: getPort$2(params.port)
	};
}
function getSemanticAttributesFromPoolConnection(params) {
	let url;
	try {
		url = params.connectionString ? new URL(params.connectionString) : void 0;
	} catch {
		url = void 0;
	}
	return {
		[AttributeNames$5.IDLE_TIMEOUT_MILLIS]: params.idleTimeoutMillis,
		[AttributeNames$5.MAX_CLIENT]: params.maxClient,
		[Kt]: DB_SYSTEM_VALUE_POSTGRESQL,
		[Nt]: url?.pathname.slice(1) ?? params.database,
		[ATTR_DB_CONNECTION_STRING$4]: getConnectionString$1(params),
		[Il]: url?.hostname ?? params.host,
		[Ol]: Number(url?.port) || getPort$2(params.port),
		[Qt]: url?.username ?? params.user
	};
}
function shouldSkipInstrumentation() {
	return getActiveSpan$1() === void 0;
}
function handleConfigQuery(queryConfig) {
	const { connectionParameters } = this;
	const dbName = connectionParameters.database;
	const spanName = getQuerySpanName(dbName, queryConfig);
	const span = startInactiveSpan$1({
		name: spanName,
		kind: SPAN_KIND.CLIENT,
		attributes: {
			...getSemanticAttributesFromConnection(connectionParameters),
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$18
		}
	});
	if (!queryConfig) return span;
	if (queryConfig.text) span.setAttribute(Ht, queryConfig.text);
	if (typeof queryConfig.name === "string") span.setAttribute(AttributeNames$5.PG_PLAN, queryConfig.name);
	return span;
}
function patchCallback(span, cb) {
	return function patchedCallback(err, res) {
		if (err) span.setStatus({
			code: 2,
			message: err.message
		});
		span.end();
		cb.call(this, err, res);
	};
}
function patchCallbackPGPool(span, cb) {
	return function patchedCallback(err, res, done) {
		if (err) span.setStatus({
			code: 2,
			message: err.message
		});
		span.end();
		cb.call(this, err, res, done);
	};
}
function patchClientConnectCallback(span, cb) {
	return function patchedClientConnectCallback(...args) {
		const err = args[0];
		if (err instanceof Error) span.setStatus({
			code: 2,
			message: err.message
		});
		span.end();
		cb.apply(this, args);
	};
}
function getErrorMessage(e) {
	return typeof e === "object" && e !== null && "message" in e ? String(e.message) : void 0;
}
function isObjectWithTextString(it) {
	return typeof it === "object" && typeof it?.text === "string";
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/postgres/vendored/instrumentation.js
var PACKAGE_NAME$9 = "@sentry/instrumentation-pg";
function extractModuleExports$1(module) {
	return module[Symbol.toStringTag] === "Module" ? module.default : module;
}
function bindCallbackToSpan(parentSpan, callback) {
	return function(...args) {
		return withActiveSpan$1(parentSpan, () => callback.apply(this, args));
	};
}
var PgInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$9, SDK_VERSION, config);
	}
	init() {
		const SUPPORTED_PG_VERSIONS = [">=8.0.3 <9"];
		const SUPPORTED_PG_POOL_VERSIONS = [">=2.0.0 <4"];
		const modulePgNativeClient = new InstrumentationNodeModuleFile("pg/lib/native/client.js", SUPPORTED_PG_VERSIONS, this._patchPgClient.bind(this), this._unpatchPgClient.bind(this));
		const modulePgClient = new InstrumentationNodeModuleFile("pg/lib/client.js", SUPPORTED_PG_VERSIONS, this._patchPgClient.bind(this), this._unpatchPgClient.bind(this));
		return [new InstrumentationNodeModuleDefinition("pg", SUPPORTED_PG_VERSIONS, (module) => {
			const moduleExports = extractModuleExports$1(module);
			this._patchPgClient(moduleExports.Client);
			return module;
		}, (module) => {
			const moduleExports = extractModuleExports$1(module);
			this._unpatchPgClient(moduleExports.Client);
			return module;
		}, [modulePgClient, modulePgNativeClient]), new InstrumentationNodeModuleDefinition("pg-pool", SUPPORTED_PG_POOL_VERSIONS, (module) => {
			const moduleExports = extractModuleExports$1(module);
			if (isWrapped(moduleExports.prototype.connect)) this._unwrap(moduleExports.prototype, "connect");
			this._wrap(moduleExports.prototype, "connect", this._getPoolConnectPatch());
			return moduleExports;
		}, (module) => {
			const moduleExports = extractModuleExports$1(module);
			if (isWrapped(moduleExports.prototype.connect)) this._unwrap(moduleExports.prototype, "connect");
		})];
	}
	_patchPgClient(module) {
		if (!module) return;
		const moduleExports = extractModuleExports$1(module);
		if (isWrapped(moduleExports.prototype.query)) this._unwrap(moduleExports.prototype, "query");
		if (isWrapped(moduleExports.prototype.connect)) this._unwrap(moduleExports.prototype, "connect");
		this._wrap(moduleExports.prototype, "query", this._getClientQueryPatch());
		this._wrap(moduleExports.prototype, "connect", this._getClientConnectPatch());
		return module;
	}
	_unpatchPgClient(module) {
		const moduleExports = extractModuleExports$1(module);
		if (isWrapped(moduleExports.prototype.query)) this._unwrap(moduleExports.prototype, "query");
		if (isWrapped(moduleExports.prototype.connect)) this._unwrap(moduleExports.prototype, "connect");
		return module;
	}
	_getClientConnectPatch() {
		const plugin = this;
		return (original) => {
			return function connect(callback) {
				if (shouldSkipInstrumentation() || plugin.getConfig().ignoreConnectSpans) return original.call(this, callback);
				const span = startInactiveSpan$1({
					name: SpanNames.CONNECT,
					kind: SPAN_KIND.CLIENT,
					attributes: getSemanticAttributesFromConnection(this)
				});
				let cb = callback;
				if (cb) {
					const parentSpan = getActiveSpan$1();
					cb = patchClientConnectCallback(span, cb);
					if (parentSpan) cb = bindCallbackToSpan(parentSpan, cb);
				}
				return handleConnectResult(span, withActiveSpan$1(span, () => {
					return original.call(this, cb);
				}));
			};
		};
	}
	_getClientQueryPatch() {
		return (original) => {
			this._diag.debug("Patching pg.Client.prototype.query");
			return function query(...args) {
				if (shouldSkipInstrumentation()) return original.apply(this, args);
				const arg0 = args[0];
				const firstArgIsString = typeof arg0 === "string";
				const firstArgIsQueryObjectWithText = isObjectWithTextString(arg0);
				const queryConfig = firstArgIsString ? {
					text: arg0,
					values: Array.isArray(args[1]) ? args[1] : void 0
				} : firstArgIsQueryObjectWithText ? {
					...arg0,
					name: arg0.name,
					text: arg0.text,
					values: arg0.values ?? (Array.isArray(args[1]) ? args[1] : void 0)
				} : void 0;
				const span = handleConfigQuery.call(this, queryConfig);
				if (args.length > 0) {
					const parentSpan = getActiveSpan$1();
					if (typeof args[args.length - 1] === "function") {
						args[args.length - 1] = patchCallback(span, args[args.length - 1]);
						if (parentSpan) args[args.length - 1] = bindCallbackToSpan(parentSpan, args[args.length - 1]);
					} else if (typeof queryConfig?.callback === "function") {
						let callback = patchCallback(span, queryConfig.callback);
						if (parentSpan) callback = bindCallbackToSpan(parentSpan, callback);
						args[0].callback = callback;
					}
				}
				let result;
				try {
					result = original.apply(this, args);
				} catch (e) {
					span.setStatus({
						code: 2,
						message: getErrorMessage(e)
					});
					span.end();
					throw e;
				}
				if (result instanceof Promise) return result.then((result2) => {
					span.end();
					return result2;
				}).catch((error) => {
					span.setStatus({
						code: 2,
						message: getErrorMessage(error)
					});
					span.end();
					return Promise.reject(error);
				});
				return result;
			};
		};
	}
	_getPoolConnectPatch() {
		const plugin = this;
		return (originalConnect) => {
			return function connect(callback) {
				if (shouldSkipInstrumentation() || plugin.getConfig().ignoreConnectSpans) return originalConnect.call(this, callback);
				const span = startInactiveSpan$1({
					name: SpanNames.POOL_CONNECT,
					kind: SPAN_KIND.CLIENT,
					attributes: getSemanticAttributesFromPoolConnection(this.options)
				});
				let cb = callback;
				if (cb) {
					const parentSpan = getActiveSpan$1();
					cb = patchCallbackPGPool(span, cb);
					if (parentSpan) cb = bindCallbackToSpan(parentSpan, cb);
				}
				return handleConnectResult(span, withActiveSpan$1(span, () => {
					return originalConnect.call(this, cb);
				}));
			};
		};
	}
};
function handleConnectResult(span, connectResult) {
	if (!(connectResult instanceof Promise)) return connectResult;
	return connectResult.then((result) => {
		span.end();
		return result;
	}).catch((error) => {
		span.setStatus({
			code: 2,
			message: getErrorMessage(error)
		});
		span.end();
		return Promise.reject(error);
	});
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/postgres/index.js
var INTEGRATION_NAME$38 = "Postgres";
var instrumentPostgres = generateInstrumentOnce(INTEGRATION_NAME$38, PgInstrumentation, (options) => ({ ignoreConnectSpans: options?.ignoreConnectSpans ?? false }));
var _postgresIntegration = ((options) => {
	return {
		name: INTEGRATION_NAME$38,
		setupOnce() {
			instrumentPostgres(options);
		}
	};
});
var postgresIntegration = defineIntegration(_postgresIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/postgresjs.js
var INTEGRATION_NAME$37 = "PostgresJs";
var SUPPORTED_VERSIONS$2 = [">=3.0.0 <4"];
var ATTR_DB_RESPONSE_STATUS_CODE = "db.response.status_code";
var SQL_OPERATION_REGEX = /^(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)/i;
var QUERY_FROM_INSTRUMENTED_SQL$1 = /* @__PURE__ */ Symbol.for("sentry.query.from.instrumented.sql");
var instrumentPostgresJs = generateInstrumentOnce(INTEGRATION_NAME$37, (options) => new PostgresJsInstrumentation({
	requireParentSpan: options?.requireParentSpan ?? true,
	requestHook: options?.requestHook
}));
var PostgresJsInstrumentation = class extends InstrumentationBase {
	constructor(config) {
		super("sentry-postgres-js", SDK_VERSION, config);
	}
	/**
	* Initializes the instrumentation by patching the postgres module.
	* Uses two complementary approaches:
	* 1. Main function wrapper: instruments sql instances created AFTER instrumentation is set up (CJS + ESM)
	* 2. Query.prototype patch: fallback for sql instances created BEFORE instrumentation (CJS only)
	*/
	init() {
		const module = new InstrumentationNodeModuleDefinition("postgres", SUPPORTED_VERSIONS$2, (exports) => {
			try {
				return this._patchPostgres(exports);
			} catch (e) {
				DEBUG_BUILD$1 && debug$3.error("Failed to patch postgres module:", e);
				return exports;
			}
		}, (exports) => exports);
		[
			"src",
			"cf/src",
			"cjs/src"
		].forEach((path) => {
			module.files.push(new InstrumentationNodeModuleFile(`postgres/${path}/query.js`, SUPPORTED_VERSIONS$2, this._patchQueryPrototype.bind(this), this._unpatchQueryPrototype.bind(this)));
		});
		return module;
	}
	/**
	* Patches the postgres module by wrapping the main export function.
	* This intercepts the creation of sql instances and instruments them.
	*/
	_patchPostgres(exports) {
		const isFunction = typeof exports === "function";
		const Original = isFunction ? exports : exports.default;
		if (typeof Original !== "function") {
			DEBUG_BUILD$1 && debug$3.warn("postgres module does not export a function. Skipping instrumentation.");
			return exports;
		}
		const self = this;
		const WrappedPostgres = function(...args) {
			const sql = Reflect.construct(Original, args);
			if (!sql || typeof sql !== "function") {
				DEBUG_BUILD$1 && debug$3.warn("postgres() did not return a valid instance");
				return sql;
			}
			const config = self.getConfig();
			return instrumentPostgresJsSql(sql, {
				requireParentSpan: config.requireParentSpan,
				requestHook: config.requestHook
			});
		};
		Object.setPrototypeOf(WrappedPostgres, Original);
		Object.setPrototypeOf(WrappedPostgres.prototype, Original.prototype);
		for (const key of Object.getOwnPropertyNames(Original)) if (![
			"length",
			"name",
			"prototype"
		].includes(key)) {
			const descriptor = Object.getOwnPropertyDescriptor(Original, key);
			if (descriptor) Object.defineProperty(WrappedPostgres, key, descriptor);
		}
		if (isFunction) return WrappedPostgres;
		else {
			replaceExports(exports, "default", WrappedPostgres);
			return exports;
		}
	}
	/**
	* Determines whether a span should be created based on the current context.
	* If `requireParentSpan` is set to true in the configuration, a span will
	* only be created if there is a parent span available.
	*/
	_shouldCreateSpans() {
		const config = this.getConfig();
		return import_src.trace.getSpan(import_src.context.active()) !== void 0 || !config.requireParentSpan;
	}
	/**
	* Extracts DB operation name from SQL query and sets it on the span.
	*/
	_setOperationName(span, sanitizedQuery, command) {
		if (command) {
			span.setAttribute(Lt, command);
			return;
		}
		const operationMatch = sanitizedQuery?.match(SQL_OPERATION_REGEX);
		if (operationMatch?.[1]) span.setAttribute(Lt, operationMatch[1].toUpperCase());
	}
	/**
	* Reconstructs the full SQL query from template strings with PostgreSQL placeholders.
	*
	* For sql`SELECT * FROM users WHERE id = ${123} AND name = ${'foo'}`:
	*   strings = ["SELECT * FROM users WHERE id = ", " AND name = ", ""]
	*   returns: "SELECT * FROM users WHERE id = $1 AND name = $2"
	*/
	_reconstructQuery(strings) {
		if (!strings?.length) return;
		if (strings.length === 1) return strings[0] || void 0;
		return strings.reduce((acc, str, i) => i === 0 ? str : `${acc}$${i}${str}`, "");
	}
	/**
	* Sanitize SQL query as per the OTEL semantic conventions
	* https://opentelemetry.io/docs/specs/semconv/database/database-spans/#sanitization-of-dbquerytext
	*
	* PostgreSQL $n placeholders are preserved per OTEL spec - they're parameterized queries,
	* not sensitive literals. Only actual values (strings, numbers, booleans) are sanitized.
	*/
	_sanitizeSqlQuery(sqlQuery) {
		if (!sqlQuery) return "Unknown SQL Query";
		return sqlQuery.replace(/--.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/;\s*$/, "").replace(/\s+/g, " ").trim().replace(/\bX'[0-9A-Fa-f]*'/gi, "?").replace(/\bB'[01]*'/gi, "?").replace(/'(?:[^']|'')*'/g, "?").replace(/\b0x[0-9A-Fa-f]+/gi, "?").replace(/\b(?:TRUE|FALSE)\b/gi, "?").replace(/-?\b\d+\.?\d*[eE][+-]?\d+\b/g, "?").replace(/-?\b\d+\.\d+\b/g, "?").replace(/-?\.\d+\b/g, "?").replace(/(?<!\$)-?\b\d+\b/g, "?").replace(/\bIN\b\s*\(\s*\?(?:\s*,\s*\?)*\s*\)/gi, "IN (?)").replace(/\bIN\b\s*\(\s*\$\d+(?:\s*,\s*\$\d+)*\s*\)/gi, "IN ($?)");
	}
	/**
	* Fallback patch for Query.prototype.handle to instrument queries from pre-existing sql instances.
	* This catches queries from sql instances created BEFORE Sentry was initialized (CJS only).
	*
	* Note: Queries from pre-existing instances won't have connection context (database, host, port)
	* because the sql instance wasn't created through our instrumented wrapper.
	*/
	_patchQueryPrototype(moduleExports) {
		const self = this;
		const originalHandle = moduleExports.Query.prototype.handle;
		moduleExports.Query.prototype.handle = async function(...args) {
			if (this.executed || this[QUERY_FROM_INSTRUMENTED_SQL$1]) return originalHandle.apply(this, args);
			if (!self._shouldCreateSpans()) return originalHandle.apply(this, args);
			const fullQuery = self._reconstructQuery(this.strings);
			const sanitizedSqlQuery = self._sanitizeSqlQuery(fullQuery);
			return startSpanManual$1({
				name: sanitizedSqlQuery || "postgresjs.query",
				op: "db"
			}, (span) => {
				addOriginToSpan(span, "auto.db.postgresjs");
				span.setAttributes({
					[jt]: "postgres",
					[Gt]: sanitizedSqlQuery
				});
				const { requestHook } = self.getConfig();
				if (requestHook) safeExecuteInTheMiddle(() => requestHook(span, sanitizedSqlQuery, void 0), (e) => {
					if (e) {
						span.setAttribute("sentry.hook.error", "requestHook failed");
						DEBUG_BUILD$1 && debug$3.error(`Error in requestHook for ${INTEGRATION_NAME$37} integration:`, e);
					}
				}, true);
				const originalResolve = this.resolve;
				this.resolve = new Proxy(originalResolve, { apply: (resolveTarget, resolveThisArg, resolveArgs) => {
					try {
						self._setOperationName(span, sanitizedSqlQuery, resolveArgs?.[0]?.command);
						span.end();
					} catch (e) {
						DEBUG_BUILD$1 && debug$3.error("Error ending span in resolve callback:", e);
					}
					return Reflect.apply(resolveTarget, resolveThisArg, resolveArgs);
				} });
				const originalReject = this.reject;
				this.reject = new Proxy(originalReject, { apply: (rejectTarget, rejectThisArg, rejectArgs) => {
					try {
						span.setStatus({
							code: 2,
							message: rejectArgs?.[0]?.message || "unknown_error"
						});
						span.setAttribute(ATTR_DB_RESPONSE_STATUS_CODE, rejectArgs?.[0]?.code || "unknown");
						span.setAttribute(Gn, rejectArgs?.[0]?.name || "unknown");
						self._setOperationName(span, sanitizedSqlQuery);
						span.end();
					} catch (e) {
						DEBUG_BUILD$1 && debug$3.error("Error ending span in reject callback:", e);
					}
					return Reflect.apply(rejectTarget, rejectThisArg, rejectArgs);
				} });
				try {
					return originalHandle.apply(this, args);
				} catch (e) {
					span.setStatus({
						code: 2,
						message: e instanceof Error ? e.message : "unknown_error"
					});
					span.end();
					throw e;
				}
			});
		};
		moduleExports.Query.prototype.handle.__sentry_original__ = originalHandle;
		return moduleExports;
	}
	/**
	* Restores the original Query.prototype.handle method.
	*/
	_unpatchQueryPrototype(moduleExports) {
		if (moduleExports.Query.prototype.handle.__sentry_original__) moduleExports.Query.prototype.handle = moduleExports.Query.prototype.handle.__sentry_original__;
		return moduleExports;
	}
};
var _postgresJsIntegration = ((options) => {
	return {
		name: INTEGRATION_NAME$37,
		setupOnce() {
			instrumentPostgresJs(options);
		}
	};
});
var postgresJsIntegration = defineIntegration(_postgresJsIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/hapi/vendored/enums/AttributeNames.js
var AttributeNames$4 = /* @__PURE__ */ ((AttributeNames2) => {
	AttributeNames2["HAPI_TYPE"] = "hapi.type";
	AttributeNames2["PLUGIN_NAME"] = "hapi.plugin.name";
	AttributeNames2["EXT_TYPE"] = "server.ext.type";
	return AttributeNames2;
})(AttributeNames$4 || {});
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/hapi/vendored/internal-types.js
var HapiComponentName = "@hapi/hapi";
var handlerPatched$1 = /* @__PURE__ */ Symbol("hapi-handler-patched");
var HapiLayerType$1 = {
	ROUTER: "router",
	PLUGIN: "plugin",
	EXT: "server.ext"
};
var HapiLifecycleMethodNames$1 = /* @__PURE__ */ new Set([
	"onPreAuth",
	"onCredentials",
	"onPostAuth",
	"onPreHandler",
	"onPostHandler",
	"onPreResponse",
	"onRequest"
]);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/hapi/vendored/utils.js
function getPluginName(plugin) {
	if (plugin.name) return plugin.name;
	else return plugin.pkg.name;
}
var isLifecycleExtType$1 = (variableToCheck) => {
	return typeof variableToCheck === "string" && HapiLifecycleMethodNames$1.has(variableToCheck);
};
var isLifecycleExtEventObj$1 = (variableToCheck) => {
	const event = variableToCheck?.type;
	return event !== void 0 && isLifecycleExtType$1(event);
};
var isDirectExtInput$1 = (variableToCheck) => {
	return Array.isArray(variableToCheck) && variableToCheck.length <= 3 && isLifecycleExtType$1(variableToCheck[0]) && typeof variableToCheck[1] === "function";
};
var isPatchableExtMethod$1 = (variableToCheck) => {
	return !Array.isArray(variableToCheck);
};
var getRouteMetadata$1 = (route, pluginName) => {
	const attributes = {
		[Ts]: route.path,
		[Ka]: route.method
	};
	let name;
	if (pluginName) {
		attributes[AttributeNames$4.HAPI_TYPE] = HapiLayerType$1.PLUGIN;
		attributes[AttributeNames$4.PLUGIN_NAME] = pluginName;
		name = `${pluginName}: route - ${route.path}`;
	} else {
		attributes[AttributeNames$4.HAPI_TYPE] = HapiLayerType$1.ROUTER;
		name = `route - ${route.path}`;
	}
	return {
		attributes,
		name
	};
};
var getExtMetadata$1 = (extPoint, pluginName, methodName) => {
	let baseName = `ext - ${extPoint}`;
	if (methodName && methodName !== "method") baseName = `ext - ${extPoint} - ${methodName}`;
	if (pluginName) return {
		attributes: {
			[AttributeNames$4.EXT_TYPE]: extPoint,
			[AttributeNames$4.HAPI_TYPE]: HapiLayerType$1.EXT,
			[AttributeNames$4.PLUGIN_NAME]: pluginName
		},
		name: `${pluginName}: ${baseName}`
	};
	return {
		attributes: {
			[AttributeNames$4.EXT_TYPE]: extPoint,
			[AttributeNames$4.HAPI_TYPE]: HapiLayerType$1.EXT
		},
		name: baseName
	};
};
var getPluginFromInput = (pluginObj) => {
	if ("plugin" in pluginObj) {
		if ("plugin" in pluginObj.plugin) return pluginObj.plugin.plugin;
		return pluginObj.plugin;
	}
	return pluginObj;
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/hapi/vendored/instrumentation.js
var PACKAGE_NAME$8 = "@sentry/instrumentation-hapi";
var HapiInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$8, SDK_VERSION, config);
	}
	init() {
		return new InstrumentationNodeModuleDefinition(HapiComponentName, [">=17.0.0 <22"], (module) => {
			const moduleExports = module[Symbol.toStringTag] === "Module" ? module.default : module;
			if (!isWrapped(moduleExports.server)) this._wrap(moduleExports, "server", this._getServerPatch.bind(this));
			if (!isWrapped(moduleExports.Server)) this._wrap(moduleExports, "Server", this._getServerPatch.bind(this));
			return moduleExports;
		}, (module) => {
			const moduleExports = module[Symbol.toStringTag] === "Module" ? module.default : module;
			this._massUnwrap([moduleExports], ["server", "Server"]);
		});
	}
	/**
	* Patches the Hapi.server and Hapi.Server functions in order to instrument
	* the server.route, server.ext, and server.register functions via calls to the
	* @function _getServerRoutePatch, @function _getServerExtPatch, and
	* @function _getServerRegisterPatch functions
	* @param original - the original Hapi Server creation function
	*/
	_getServerPatch(original) {
		const instrumentation = this;
		const self = this;
		return function server(opts) {
			const newServer = original.apply(this, [opts]);
			self._wrap(newServer, "route", (originalRouter) => {
				return instrumentation._getServerRoutePatch.bind(instrumentation)(originalRouter);
			});
			self._wrap(newServer, "ext", (originalExtHandler) => {
				return instrumentation._getServerExtPatch.bind(instrumentation)(originalExtHandler);
			});
			self._wrap(newServer, "register", instrumentation._getServerRegisterPatch.bind(instrumentation));
			return newServer;
		};
	}
	/**
	* Patches the plugin register function used by the Hapi Server. This function
	* goes through each plugin that is being registered and adds instrumentation
	* via a call to the @function _wrapRegisterHandler function.
	* @param {RegisterFunction<T>} original - the original register function which
	* registers each plugin on the server
	*/
	_getServerRegisterPatch(original) {
		const instrumentation = this;
		return function register(pluginInput, options) {
			if (Array.isArray(pluginInput)) for (const pluginObj of pluginInput) {
				const plugin = getPluginFromInput(pluginObj);
				instrumentation._wrapRegisterHandler(plugin);
			}
			else {
				const plugin = getPluginFromInput(pluginInput);
				instrumentation._wrapRegisterHandler(plugin);
			}
			return original.apply(this, [pluginInput, options]);
		};
	}
	/**
	* Patches the Server.ext function which adds extension methods to the specified
	* point along the request lifecycle. This function accepts the full range of
	* accepted input into the standard Hapi `server.ext` function. For each extension,
	* it adds instrumentation to the handler via a call to the @function _wrapExtMethods
	* function.
	* @param original - the original ext function which adds the extension method to the server
	* @param {string} [pluginName] - if present, represents the name of the plugin responsible
	* for adding this server extension. Else, signifies that the extension was added directly
	*/
	_getServerExtPatch(original, pluginName) {
		const instrumentation = this;
		return function ext(...args) {
			if (Array.isArray(args[0])) {
				const eventsList = args[0];
				for (let i = 0; i < eventsList.length; i++) {
					const eventObj = eventsList[i];
					if (isLifecycleExtType$1(eventObj.type)) {
						const lifecycleEventObj = eventObj;
						lifecycleEventObj.method = instrumentation._wrapExtMethods(lifecycleEventObj.method, eventObj.type, pluginName);
						eventsList[i] = lifecycleEventObj;
					}
				}
				return original.apply(this, args);
			} else if (isDirectExtInput$1(args)) {
				const extInput = args;
				const method = extInput[1];
				const handler = instrumentation._wrapExtMethods(method, extInput[0], pluginName);
				return original.apply(this, [
					extInput[0],
					handler,
					extInput[2]
				]);
			} else if (isLifecycleExtEventObj$1(args[0])) {
				const lifecycleEventObj = args[0];
				lifecycleEventObj.method = instrumentation._wrapExtMethods(lifecycleEventObj.method, lifecycleEventObj.type, pluginName);
				return original.call(this, lifecycleEventObj);
			}
			return original.apply(this, args);
		};
	}
	/**
	* Patches the Server.route function. This function accepts either one or an array
	* of Hapi.ServerRoute objects and adds instrumentation on each route via a call to
	* the @function _wrapRouteHandler function.
	* @param {HapiServerRouteInputMethod} original - the original route function which adds
	* the route to the server
	* @param {string} [pluginName] - if present, represents the name of the plugin responsible
	* for adding this server route. Else, signifies that the route was added directly
	*/
	_getServerRoutePatch(original, pluginName) {
		const instrumentation = this;
		return function route(route) {
			if (Array.isArray(route)) for (let i = 0; i < route.length; i++) {
				const newRoute = instrumentation._wrapRouteHandler.call(instrumentation, route[i], pluginName);
				route[i] = newRoute;
			}
			else route = instrumentation._wrapRouteHandler.call(instrumentation, route, pluginName);
			return original.apply(this, [route]);
		};
	}
	/**
	* Wraps newly registered plugins to add instrumentation to the plugin's clone of
	* the original server. Specifically, wraps the server.route and server.ext functions
	* via calls to @function _getServerRoutePatch and @function _getServerExtPatch
	* @param {Hapi.Plugin<T>} plugin - the new plugin which is being instrumented
	*/
	_wrapRegisterHandler(plugin) {
		const instrumentation = this;
		const pluginName = getPluginName(plugin);
		const oldRegister = plugin.register;
		const self = this;
		const newRegisterHandler = function(server, options) {
			self._wrap(server, "route", (original) => {
				return instrumentation._getServerRoutePatch.bind(instrumentation)(original, pluginName);
			});
			self._wrap(server, "ext", (originalExtHandler) => {
				return instrumentation._getServerExtPatch.bind(instrumentation)(originalExtHandler, pluginName);
			});
			return oldRegister.call(this, server, options);
		};
		plugin.register = newRegisterHandler;
	}
	/**
	* Wraps request extension methods to add instrumentation to each new extension handler.
	* Patches each individual extension in order to create the
	* span and propagate context. It does not create spans when there is no parent span.
	* @param {PatchableExtMethod | PatchableExtMethod[]} method - the request extension
	* handler which is being instrumented
	* @param {Hapi.ServerRequestExtType} extPoint - the point in the Hapi request lifecycle
	* which this extension targets
	* @param {string} [pluginName] - if present, represents the name of the plugin responsible
	* for adding this server route. Else, signifies that the route was added directly
	*/
	_wrapExtMethods(method, extPoint, pluginName) {
		const instrumentation = this;
		if (method instanceof Array) {
			for (let i = 0; i < method.length; i++) method[i] = instrumentation._wrapExtMethods(method[i], extPoint);
			return method;
		} else if (isPatchableExtMethod$1(method)) {
			if (method[handlerPatched$1] === true) return method;
			method[handlerPatched$1] = true;
			const newHandler = function(...params) {
				if (import_src.trace.getSpan(import_src.context.active()) === void 0) return method.apply(this, params);
				const metadata = getExtMetadata$1(extPoint, pluginName, method.name);
				return startSpan$3({
					name: metadata.name,
					op: `${metadata.attributes[AttributeNames$4.HAPI_TYPE]}.hapi`,
					attributes: {
						...metadata.attributes,
						[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.otel.hapi"
					}
				}, () => method.apply(void 0, params));
			};
			return newHandler;
		}
		return method;
	}
	/**
	* Patches each individual route handler method in order to create the
	* span and propagate context. It does not create spans when there is no parent span.
	* @param {PatchableServerRoute} route - the route handler which is being instrumented
	* @param {string} [pluginName] - if present, represents the name of the plugin responsible
	* for adding this server route. Else, signifies that the route was added directly
	*/
	_wrapRouteHandler(route, pluginName) {
		if (route[handlerPatched$1] === true) return route;
		route[handlerPatched$1] = true;
		const wrapHandler = (oldHandler) => {
			return function(...params) {
				if (import_src.trace.getSpan(import_src.context.active()) === void 0) return oldHandler.call(this, ...params);
				setHttpServerSpanRouteAttribute$2(route.path);
				const metadata = getRouteMetadata$1(route, pluginName);
				return startSpan$3({
					name: metadata.name,
					op: `${metadata.attributes[AttributeNames$4.HAPI_TYPE]}.hapi`,
					attributes: {
						...metadata.attributes,
						[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.otel.hapi"
					}
				}, () => oldHandler.call(this, ...params));
			};
		};
		if (typeof route.handler === "function") route.handler = wrapHandler(route.handler);
		else if (typeof route.options === "function") {
			const oldOptions = route.options;
			route.options = function(server) {
				const options = oldOptions(server);
				if (typeof options.handler === "function") options.handler = wrapHandler(options.handler);
				return options;
			};
		} else if (typeof route.options?.handler === "function") route.options.handler = wrapHandler(route.options.handler);
		return route;
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/hapi/index.js
var INTEGRATION_NAME$36 = "Hapi";
var instrumentHapi = generateInstrumentOnce(INTEGRATION_NAME$36, () => new HapiInstrumentation());
var _hapiIntegration = (() => {
	return {
		name: INTEGRATION_NAME$36,
		setupOnce() {
			instrumentHapi();
		}
	};
});
var hapiIntegration = defineIntegration(_hapiIntegration);
function isErrorEvent(event) {
	return !!(event && typeof event === "object" && "error" in event && event.error);
}
function sendErrorToSentry(errorData) {
	captureException(errorData, { mechanism: {
		type: "auto.function.hapi",
		handled: false
	} });
}
var hapiErrorPlugin = {
	name: "SentryHapiErrorPlugin",
	version: SDK_VERSION,
	register: async function(serverArg) {
		serverArg.events.on({
			name: "request",
			channels: ["error"]
		}, (request, event) => {
			if (getIsolationScope() !== getDefaultIsolationScope()) {
				const route = request.route;
				if (route.path) getIsolationScope().setTransactionName(`${route.method.toUpperCase()} ${route.path}`);
			} else DEBUG_BUILD$1 && debug$3.warn("Isolation scope is still the default isolation scope - skipping setting transactionName");
			if (isErrorEvent(event)) sendErrorToSentry(event.error);
		});
	}
};
async function setupHapiErrorHandler(server) {
	await server.register(hapiErrorPlugin);
	ensureIsWrapped(server.register, "hapi");
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/hono/constants.js
var AttributeNames$3 = {
	HONO_TYPE: "hono.type",
	HONO_NAME: "hono.name"
};
var HonoTypes = {
	MIDDLEWARE: "middleware",
	REQUEST_HANDLER: "request_handler"
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/hono/instrumentation.js
var PACKAGE_NAME$7 = "@sentry/instrumentation-hono";
var PACKAGE_VERSION = "0.0.1";
var HonoInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$7, PACKAGE_VERSION, config);
	}
	/**
	* Initialize the instrumentation.
	*/
	init() {
		return [new InstrumentationNodeModuleDefinition("hono", [">=4.0.0 <5"], (moduleExports) => this._patch(moduleExports))];
	}
	/**
	* Patches the module exports to instrument Hono.
	*/
	_patch(moduleExports) {
		const instrumentation = this;
		class WrappedHono extends moduleExports.Hono {
			constructor(...args) {
				super(...args);
				instrumentation._wrap(this, "get", instrumentation._patchHandler());
				instrumentation._wrap(this, "post", instrumentation._patchHandler());
				instrumentation._wrap(this, "put", instrumentation._patchHandler());
				instrumentation._wrap(this, "delete", instrumentation._patchHandler());
				instrumentation._wrap(this, "options", instrumentation._patchHandler());
				instrumentation._wrap(this, "patch", instrumentation._patchHandler());
				instrumentation._wrap(this, "all", instrumentation._patchHandler());
				instrumentation._wrap(this, "on", instrumentation._patchOnHandler());
				instrumentation._wrap(this, "use", instrumentation._patchMiddlewareHandler());
			}
		}
		try {
			moduleExports.Hono = WrappedHono;
		} catch {
			return {
				...moduleExports,
				Hono: WrappedHono
			};
		}
		return moduleExports;
	}
	/**
	* Patches the route handler to instrument it.
	*/
	_patchHandler() {
		const instrumentation = this;
		return function(original) {
			return function wrappedHandler(...args) {
				if (typeof args[0] === "string") {
					const path = args[0];
					if (args.length === 1) return original.apply(this, [path]);
					const handlers = args.slice(1);
					return original.apply(this, [path, ...handlers.map((handler) => instrumentation._wrapHandler(handler))]);
				}
				return original.apply(this, args.map((handler) => instrumentation._wrapHandler(handler)));
			};
		};
	}
	/**
	* Patches the 'on' handler to instrument it.
	*/
	_patchOnHandler() {
		const instrumentation = this;
		return function(original) {
			return function wrappedHandler(...args) {
				const handlers = args.slice(2);
				return original.apply(this, [...args.slice(0, 2), ...handlers.map((handler) => instrumentation._wrapHandler(handler))]);
			};
		};
	}
	/**
	* Patches the middleware handler to instrument it.
	*/
	_patchMiddlewareHandler() {
		const instrumentation = this;
		return function(original) {
			return function wrappedHandler(...args) {
				if (typeof args[0] === "string") {
					const path = args[0];
					if (args.length === 1) return original.apply(this, [path]);
					const handlers = args.slice(1);
					return original.apply(this, [path, ...handlers.map((handler) => instrumentation._wrapHandler(handler))]);
				}
				return original.apply(this, args.map((handler) => instrumentation._wrapHandler(handler)));
			};
		};
	}
	/**
	* Wraps a handler or middleware handler to apply instrumentation.
	*/
	_wrapHandler(handler) {
		const instrumentation = this;
		return function(c, next) {
			if (!instrumentation.isEnabled()) return handler.apply(this, [c, next]);
			const path = c.req.path;
			const span = instrumentation.tracer.startSpan(path);
			return import_src.context.with(import_src.trace.setSpan(import_src.context.active(), span), () => {
				return instrumentation._safeExecute(() => {
					const result = handler.apply(this, [c, next]);
					if (isThenable$1(result)) return result.then((result2) => {
						const type = instrumentation._determineHandlerType(result2);
						span.setAttributes({
							[AttributeNames$3.HONO_TYPE]: type,
							[AttributeNames$3.HONO_NAME]: type === HonoTypes.REQUEST_HANDLER ? path : handler.name || "anonymous"
						});
						instrumentation.getConfig().responseHook?.(span);
						return result2;
					});
					else {
						const type = instrumentation._determineHandlerType(result);
						span.setAttributes({
							[AttributeNames$3.HONO_TYPE]: type,
							[AttributeNames$3.HONO_NAME]: type === HonoTypes.REQUEST_HANDLER ? path : handler.name || "anonymous"
						});
						instrumentation.getConfig().responseHook?.(span);
						return result;
					}
				}, () => span.end(), (error) => {
					instrumentation._handleError(span, error);
					span.end();
				});
			});
		};
	}
	/**
	* Safely executes a function and handles errors.
	*/
	_safeExecute(execute, onSuccess, onFailure) {
		try {
			const result = execute();
			if (isThenable$1(result)) result.then(() => onSuccess(), (error) => onFailure(error));
			else onSuccess();
			return result;
		} catch (error) {
			onFailure(error);
			throw error;
		}
	}
	/**
	* Determines the handler type based on the result.
	* @param result
	* @private
	*/
	_determineHandlerType(result) {
		return result === void 0 ? HonoTypes.MIDDLEWARE : HonoTypes.REQUEST_HANDLER;
	}
	/**
	* Handles errors by setting the span status and recording the exception.
	*/
	_handleError(span, error) {
		if (error instanceof Error) {
			span.setStatus({
				code: import_src.SpanStatusCode.ERROR,
				message: error.message
			});
			span.recordException(error);
		}
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/hono/index.js
var INTEGRATION_NAME$35 = "Hono";
function addHonoSpanAttributes(span) {
	const attributes = spanToJSON(span).data;
	const type = attributes[AttributeNames$3.HONO_TYPE];
	if (attributes["sentry.op"] || !type) return;
	span.setAttributes({
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.otel.hono",
		[SEMANTIC_ATTRIBUTE_SENTRY_OP]: `${type}.hono`
	});
	const name = attributes[AttributeNames$3.HONO_NAME];
	if (typeof name === "string") span.updateName(name);
	if (getIsolationScope() === getDefaultIsolationScope()) {
		DEBUG_BUILD$1 && debug$3.warn("Isolation scope is default isolation scope - skipping setting transactionName");
		return;
	}
	const route = attributes[Ts];
	const method = attributes[ns];
	if (typeof route === "string" && typeof method === "string") getIsolationScope().setTransactionName(`${method} ${route}`);
}
var instrumentHono = generateInstrumentOnce(INTEGRATION_NAME$35, () => new HonoInstrumentation({ responseHook: (span) => {
	addHonoSpanAttributes(span);
} }));
var _honoIntegration = (() => {
	return {
		name: INTEGRATION_NAME$35,
		setupOnce() {
			instrumentHono();
		}
	};
});
var honoIntegration = defineIntegration(_honoIntegration);
function honoRequestHandler() {
	return async function sentryRequestMiddleware(context, next) {
		const normalizedRequest = httpRequestToRequestData(context.req);
		getIsolationScope().setSDKProcessingMetadata({ normalizedRequest });
		await next();
	};
}
function defaultShouldHandleError(context) {
	return context.res.status >= 500;
}
function honoErrorHandler(options) {
	return async function sentryErrorMiddleware(context, next) {
		await next();
		if ((options?.shouldHandleError || defaultShouldHandleError)(context)) context.res.sentry = captureException(context.error, { mechanism: {
			type: "auto.middleware.hono",
			handled: false
		} });
	};
}
function setupHonoErrorHandler(app, options) {
	app.use(honoRequestHandler());
	app.use(honoErrorHandler(options));
	ensureIsWrapped(app.use, "hono");
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/koa/vendored/types.js
var KoaLayerType = /* @__PURE__ */ ((KoaLayerType2) => {
	KoaLayerType2["ROUTER"] = "router";
	KoaLayerType2["MIDDLEWARE"] = "middleware";
	return KoaLayerType2;
})(KoaLayerType || {});
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/koa/vendored/enums/AttributeNames.js
var AttributeNames$2 = /* @__PURE__ */ ((AttributeNames2) => {
	AttributeNames2["KOA_TYPE"] = "koa.type";
	AttributeNames2["KOA_NAME"] = "koa.name";
	return AttributeNames2;
})(AttributeNames$2 || {});
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/koa/vendored/utils.js
var getMiddlewareMetadata$1 = (context, layer, isRouter, layerPath) => {
	if (isRouter) return {
		attributes: {
			[AttributeNames$2.KOA_NAME]: layerPath?.toString(),
			[AttributeNames$2.KOA_TYPE]: KoaLayerType.ROUTER,
			[Ts]: layerPath?.toString()
		},
		name: context._matchedRouteName || `router - ${layerPath}`
	};
	else return {
		attributes: {
			[AttributeNames$2.KOA_NAME]: layer.name ?? "middleware",
			[AttributeNames$2.KOA_TYPE]: KoaLayerType.MIDDLEWARE,
			[ht]: layer.name ?? "middleware"
		},
		name: `middleware - ${layer.name}`
	};
};
var isLayerIgnored$1 = (type, config) => {
	return !!(Array.isArray(config?.ignoreLayersType) && config?.ignoreLayersType?.includes(type));
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/koa/vendored/internal-types.js
var kLayerPatched$1 = /* @__PURE__ */ Symbol("koa-layer-patched");
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/koa/vendored/instrumentation.js
var PACKAGE_NAME$6 = "@sentry/instrumentation-koa";
var KoaInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$6, SDK_VERSION, config);
	}
	init() {
		return new InstrumentationNodeModuleDefinition("koa", [">=2.0.0 <4"], (module) => {
			const moduleExports = module[Symbol.toStringTag] === "Module" ? module.default : module;
			if (moduleExports == null) return moduleExports;
			if (isWrapped(moduleExports.prototype.use)) this._unwrap(moduleExports.prototype, "use");
			this._wrap(moduleExports.prototype, "use", this._getKoaUsePatch.bind(this));
			return module;
		}, (module) => {
			const moduleExports = module[Symbol.toStringTag] === "Module" ? module.default : module;
			if (moduleExports && isWrapped(moduleExports.prototype.use)) this._unwrap(moduleExports.prototype, "use");
		});
	}
	/**
	* Patches the Koa.use function in order to instrument each original
	* middleware layer which is introduced
	* @param {KoaMiddleware} middleware - the original middleware function
	*/
	_getKoaUsePatch(original) {
		const patchRouterDispatch = this._patchRouterDispatch.bind(this);
		const patchLayer = this._patchLayer.bind(this);
		return function use(middlewareFunction) {
			const patchedFunction = middlewareFunction.router ? patchRouterDispatch(middlewareFunction) : patchLayer(middlewareFunction, false);
			return original.apply(this, [patchedFunction]);
		};
	}
	/**
	* Patches the dispatch function used by @koa/router. This function
	* goes through each routed middleware and adds instrumentation via a call
	* to the @function _patchLayer function.
	* @param {KoaMiddleware} dispatchLayer - the original dispatch function which dispatches
	* routed middleware
	*/
	_patchRouterDispatch(dispatchLayer) {
		const routesStack = dispatchLayer.router?.stack ?? [];
		for (const pathLayer of routesStack) {
			const path = pathLayer.path;
			const pathStack = pathLayer.stack;
			for (let j = 0; j < pathStack.length; j++) {
				const routedMiddleware = pathStack[j];
				pathStack[j] = this._patchLayer(routedMiddleware, true, path);
			}
		}
		return dispatchLayer;
	}
	/**
	* Patches each individual @param middlewareLayer function in order to create the
	* span and propagate context. It does not create spans when there is no parent span.
	* @param {KoaMiddleware} middlewareLayer - the original middleware function.
	* @param {boolean} isRouter - tracks whether the original middleware function
	* was dispatched by the router originally
	* @param {string?} layerPath - if present, provides additional data from the
	* router about the routed path which the middleware is attached to
	*/
	_patchLayer(middlewareLayer, isRouter, layerPath) {
		const layerType = isRouter ? KoaLayerType.ROUTER : KoaLayerType.MIDDLEWARE;
		if (middlewareLayer[kLayerPatched$1] === true || isLayerIgnored$1(layerType, this.getConfig())) return middlewareLayer;
		if (middlewareLayer.constructor.name === "GeneratorFunction" || middlewareLayer.constructor.name === "AsyncGeneratorFunction") return middlewareLayer;
		middlewareLayer[kLayerPatched$1] = true;
		return (context, next) => {
			if (import_src.trace.getSpan(import_src.context.active()) === void 0) return middlewareLayer(context, next);
			const metadata = getMiddlewareMetadata$1(context, middlewareLayer, isRouter, layerPath);
			if (context._matchedRoute) setHttpServerSpanRouteAttribute$2(context._matchedRoute.toString());
			const koaName = metadata.attributes[AttributeNames$2.KOA_NAME];
			const name = typeof koaName === "string" ? koaName || "< unknown >" : metadata.name;
			return startSpan$3({
				name,
				op: `${layerType}.koa`,
				attributes: {
					...metadata.attributes,
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.otel.koa"
				}
			}, () => {
				const route = metadata.attributes[Ts];
				if (getIsolationScope() === getDefaultIsolationScope()) DEBUG_BUILD$1 && debug$3.warn("Isolation scope is default isolation scope - skipping setting transactionName");
				else if (route) {
					const method = context.request?.method?.toUpperCase() || "GET";
					getIsolationScope().setTransactionName(`${method} ${route}`);
				}
				return middlewareLayer(context, next);
			});
		};
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/koa/index.js
var INTEGRATION_NAME$34 = "Koa";
var instrumentKoa = generateInstrumentOnce(INTEGRATION_NAME$34, KoaInstrumentation, (options = {}) => {
	return { ignoreLayersType: options.ignoreLayersType };
});
var _koaIntegration = ((options = {}) => {
	return {
		name: INTEGRATION_NAME$34,
		setupOnce() {
			instrumentKoa(options);
		}
	};
});
var koaIntegration = defineIntegration(_koaIntegration);
var setupKoaErrorHandler = (app) => {
	app.use(async (ctx, next) => {
		try {
			await next();
		} catch (error) {
			captureException(error, { mechanism: {
				handled: false,
				type: "auto.middleware.koa"
			} });
			throw error;
		}
	});
	ensureIsWrapped(app.use, "koa");
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/connect/vendored/enums/AttributeNames.js
var AttributeNames$1 = /* @__PURE__ */ ((AttributeNames2) => {
	AttributeNames2["CONNECT_TYPE"] = "connect.type";
	AttributeNames2["CONNECT_NAME"] = "connect.name";
	return AttributeNames2;
})(AttributeNames$1 || {});
var ConnectTypes = /* @__PURE__ */ ((ConnectTypes2) => {
	ConnectTypes2["MIDDLEWARE"] = "middleware";
	ConnectTypes2["REQUEST_HANDLER"] = "request_handler";
	return ConnectTypes2;
})(ConnectTypes || {});
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/connect/vendored/internal-types.js
var _LAYERS_STORE_PROPERTY = /* @__PURE__ */ Symbol("opentelemetry.instrumentation-connect.request-route-stack");
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/connect/vendored/utils.js
var addNewStackLayer = (request) => {
	if (Array.isArray(request[_LAYERS_STORE_PROPERTY]) === false) Object.defineProperty(request, _LAYERS_STORE_PROPERTY, {
		enumerable: false,
		value: []
	});
	request[_LAYERS_STORE_PROPERTY].push("/");
	const stackLength = request[_LAYERS_STORE_PROPERTY].length;
	return () => {
		if (stackLength === request[_LAYERS_STORE_PROPERTY].length) request[_LAYERS_STORE_PROPERTY].pop();
		else DEBUG_BUILD$1 && debug$3.warn("Connect: Trying to pop the stack multiple time");
	};
};
var replaceCurrentStackRoute = (request, newRoute) => {
	if (newRoute) request[_LAYERS_STORE_PROPERTY].splice(-1, 1, newRoute);
};
var generateRoute = (request) => {
	return request[_LAYERS_STORE_PROPERTY].reduce((acc, sub) => acc.replace(/\/+$/, "") + sub);
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/connect/vendored/instrumentation.js
var PACKAGE_NAME$5 = "@sentry/instrumentation-connect";
var ANONYMOUS_NAME = "anonymous";
var ConnectInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$5, SDK_VERSION, config);
	}
	init() {
		return [new InstrumentationNodeModuleDefinition("connect", [">=3.0.0 <4"], (moduleExports) => {
			return this._patchConstructor(moduleExports);
		})];
	}
	_patchApp(patchedApp) {
		if (!isWrapped(patchedApp.use)) this._wrap(patchedApp, "use", this._patchUse.bind(this));
		if (!isWrapped(patchedApp.handle)) this._wrap(patchedApp, "handle", this._patchHandle.bind(this));
	}
	_patchConstructor(original) {
		const patchApp = this._patchApp.bind(this);
		return function(...args) {
			const app = Reflect.apply(original, this, args);
			patchApp(app);
			return app;
		};
	}
	_patchNext(next, span, finishSpan) {
		return function nextFunction(err) {
			if (isError(err)) span.setStatus({
				code: 2,
				message: "internal_error"
			});
			const result = next.apply(this, [err]);
			finishSpan();
			return result;
		};
	}
	_startSpan(routeName, middleWare) {
		const connectType = routeName ? ConnectTypes.REQUEST_HANDLER : ConnectTypes.MIDDLEWARE;
		const connectName = routeName || middleWare.name || ANONYMOUS_NAME;
		return startInactiveSpan$1({
			name: connectName,
			op: `${connectType}.connect`,
			attributes: {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.otel.connect",
				[Ts]: routeName.length > 0 ? routeName : "/",
				[AttributeNames$1.CONNECT_TYPE]: connectType,
				[AttributeNames$1.CONNECT_NAME]: connectName
			}
		});
	}
	_patchMiddleware(routeName, middleWare) {
		const isEnabled = this.isEnabled.bind(this);
		const startSpan = this._startSpan.bind(this);
		const patchNext = this._patchNext.bind(this);
		const isErrorMiddleware = middleWare.length === 4;
		function patchedMiddleware() {
			if (!isEnabled()) return Reflect.apply(middleWare, this, arguments);
			const [reqArgIdx, resArgIdx, nextArgIdx] = isErrorMiddleware ? [
				1,
				2,
				3
			] : [
				0,
				1,
				2
			];
			const req = arguments[reqArgIdx];
			const res = arguments[resArgIdx];
			const next = arguments[nextArgIdx];
			replaceCurrentStackRoute(req, routeName);
			if (routeName) setHttpServerSpanRouteAttribute$2(generateRoute(req));
			const span = startSpan(routeName, middleWare);
			let spanFinished = false;
			function finishSpan() {
				if (!spanFinished) {
					spanFinished = true;
					span.end();
				}
				res.removeListener("close", finishSpan);
			}
			res.addListener("close", finishSpan);
			arguments[nextArgIdx] = patchNext(next, span, finishSpan);
			try {
				return Reflect.apply(middleWare, this, arguments);
			} catch (e) {
				span.setStatus({
					code: 2,
					message: "internal_error"
				});
				finishSpan();
				throw e;
			}
		}
		Object.defineProperty(patchedMiddleware, "length", {
			value: middleWare.length,
			writable: false,
			configurable: true
		});
		return patchedMiddleware;
	}
	_patchUse(original) {
		const patchMiddleware = this._patchMiddleware.bind(this);
		return function(...args) {
			const middleWare = args[args.length - 1];
			const routeName = args[args.length - 2] || "";
			args[args.length - 1] = patchMiddleware(routeName, middleWare);
			return original.apply(this, args);
		};
	}
	_patchHandle(original) {
		const patchOut = this._patchOut.bind(this);
		return function() {
			const [reqIdx, outIdx] = [0, 2];
			const req = arguments[reqIdx];
			const out = arguments[outIdx];
			const completeStack = addNewStackLayer(req);
			if (typeof out === "function") arguments[outIdx] = patchOut(out, completeStack);
			return Reflect.apply(original, this, arguments);
		};
	}
	_patchOut(out, completeStack) {
		return function nextFunction(...args) {
			completeStack();
			return Reflect.apply(out, this, args);
		};
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/connect/index.js
var INTEGRATION_NAME$33 = "Connect";
var instrumentConnect = generateInstrumentOnce(INTEGRATION_NAME$33, () => new ConnectInstrumentation());
var _connectIntegration = (() => {
	return {
		name: INTEGRATION_NAME$33,
		setupOnce() {
			instrumentConnect();
		}
	};
});
var connectIntegration = defineIntegration(_connectIntegration);
function connectErrorMiddleware(err, req, res, next) {
	captureException(err, { mechanism: {
		handled: false,
		type: "auto.middleware.connect"
	} });
	next(err);
}
var setupConnectErrorHandler = (app) => {
	app.use(connectErrorMiddleware);
	ensureIsWrapped(app.use, "connect");
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/knex/vendored/semconv.js
var ATTR_DB_SQL_TABLE$3 = "db.sql.table";
var DB_SYSTEM_NAME_VALUE_SQLITE = "sqlite";
var DB_SYSTEM_NAME_VALUE_POSTGRESQL = "postgresql";
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/knex/vendored/utils.js
var getFormatter$1 = (runner) => {
	if (runner) {
		if (runner.client) {
			if (runner.client._formatQuery) return runner.client._formatQuery.bind(runner.client);
			else if (runner.client.SqlString) return runner.client.SqlString.format.bind(runner.client.SqlString);
		}
		if (runner.builder) return runner.builder.toString.bind(runner.builder);
	}
	return () => "<noop formatter>";
};
var systemMap = /* @__PURE__ */ new Map([["sqlite3", DB_SYSTEM_NAME_VALUE_SQLITE], ["pg", DB_SYSTEM_NAME_VALUE_POSTGRESQL]]);
var mapSystem$1 = (knexSystem) => {
	return systemMap.get(knexSystem) || knexSystem;
};
var getName$1 = (db, operation, table) => {
	if (operation) {
		if (table) return `${operation} ${db}.${table}`;
		return `${operation} ${db}`;
	}
	return db;
};
var limitLength = (str, maxLength) => {
	if (typeof str === "string" && typeof maxLength === "number" && 0 < maxLength && maxLength < str.length) return `${str.substring(0, maxLength)}..`;
	return str;
};
var extractDatabaseFromConnectionString$1 = (connectionString) => {
	if (!connectionString) return void 0;
	try {
		return new URL(connectionString).pathname?.replace(/^\//, "") || void 0;
	} catch {
		return;
	}
};
var extractHostFromConnectionString$1 = (connectionString) => {
	if (!connectionString) return void 0;
	try {
		return new URL(connectionString).hostname || void 0;
	} catch {
		return;
	}
};
var extractPortFromConnectionString$1 = (connectionString) => {
	if (!connectionString) return void 0;
	try {
		const port = new URL(connectionString).port;
		return port ? parseInt(port, 10) : void 0;
	} catch {
		return;
	}
};
var extractTableName$1 = (builder) => {
	const table = builder?._single?.table;
	if (typeof table === "object") return extractTableName$1(table);
	return table;
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/knex/vendored/instrumentation.js
var PACKAGE_NAME$4 = "@sentry/instrumentation-knex";
var ORIGIN$17 = "auto.db.otel.knex";
var MODULE_NAME$5 = "knex";
var SUPPORTED_VERSIONS$1 = [
	">=0.22.0 <4",
	">=0.10.0 <0.18.0",
	">=0.19.0 <0.22.0",
	">=0.18.0 <0.19.0"
];
var MAX_QUERY_LENGTH$1 = 1022;
var parentSpanSymbol$1 = /* @__PURE__ */ Symbol("sentry.instrumentation-knex.parent-span");
var KnexInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$4, SDK_VERSION, config);
	}
	init() {
		const module = new InstrumentationNodeModuleDefinition(MODULE_NAME$5, SUPPORTED_VERSIONS$1);
		module.files.push(this._getClientNodeModuleFileInstrumentation("src"), this._getClientNodeModuleFileInstrumentation("lib"), this._getRunnerNodeModuleFileInstrumentation("src"), this._getRunnerNodeModuleFileInstrumentation("lib"), this._getRunnerNodeModuleFileInstrumentation("lib/execution"));
		return module;
	}
	_getRunnerNodeModuleFileInstrumentation(basePath) {
		return new InstrumentationNodeModuleFile(`knex/${basePath}/runner.js`, SUPPORTED_VERSIONS$1, (Runner, moduleVersion) => {
			this._ensureWrapped(Runner.prototype, "query", this._createQueryWrapper(moduleVersion));
			return Runner;
		}, (Runner) => {
			this._unwrap(Runner.prototype, "query");
			return Runner;
		});
	}
	_getClientNodeModuleFileInstrumentation(basePath) {
		return new InstrumentationNodeModuleFile(`knex/${basePath}/client.js`, SUPPORTED_VERSIONS$1, (Client) => {
			this._ensureWrapped(Client.prototype, "queryBuilder", this._storeContext.bind(this));
			this._ensureWrapped(Client.prototype, "schemaBuilder", this._storeContext.bind(this));
			this._ensureWrapped(Client.prototype, "raw", this._storeContext.bind(this));
			return Client;
		}, (Client) => {
			this._unwrap(Client.prototype, "queryBuilder");
			this._unwrap(Client.prototype, "schemaBuilder");
			this._unwrap(Client.prototype, "raw");
			return Client;
		});
	}
	_createQueryWrapper(moduleVersion) {
		return function wrapQuery(original) {
			return function wrapped_logging_method(query) {
				const config = this.client.config;
				const table = extractTableName$1(this.builder);
				const operation = query?.method;
				const connectionString = config?.connection?.connectionString;
				const name = config?.connection?.filename || config?.connection?.database || extractDatabaseFromConnectionString$1(connectionString);
				const attributes = {
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$17,
					"knex.version": moduleVersion,
					[Kt]: mapSystem$1(this.client.driverName),
					[ATTR_DB_SQL_TABLE$3]: table,
					[Pt]: operation,
					[Qt]: config?.connection?.user,
					[Nt]: name,
					[Il]: config?.connection?.host ?? extractHostFromConnectionString$1(connectionString),
					[Ol]: config?.connection?.port ?? extractPortFromConnectionString$1(connectionString),
					[Dl]: config?.connection?.filename === ":memory:" ? "inproc" : void 0,
					[Ht]: limitLength(query?.sql, MAX_QUERY_LENGTH$1)
				};
				const parentSpan = this.builder[parentSpanSymbol$1] || getActiveSpan$1();
				const args = arguments;
				return startSpan$3({
					name: getName$1(name, operation, table),
					kind: SPAN_KIND.CLIENT,
					attributes,
					parentSpan,
					onlyIfParent: true
				}, (span) => original.apply(this, args).catch((err) => {
					const fullQuery = getFormatter$1(this)(query.sql, query.bindings || []);
					const message = err.message.replace(`${fullQuery} - `, "");
					span.setStatus({
						code: 2,
						message
					});
					throw err;
				}));
			};
		};
	}
	_storeContext(original) {
		return function wrapped_logging_method() {
			const builder = original.apply(this, arguments);
			Object.defineProperty(builder, parentSpanSymbol$1, { value: getActiveSpan$1() });
			return builder;
		};
	}
	_ensureWrapped(obj, methodName, wrapper) {
		if (isWrapped(obj[methodName])) this._unwrap(obj, methodName);
		this._wrap(obj, methodName, wrapper);
	}
};
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/subscribe-injection.js
var SUBSCRIBE_TRANSFORM_NAME = "sentrySubscribeOrchestrionChannel";
function toSubscribeInjections(configs) {
	const seen = /* @__PURE__ */ new Set();
	const injections = [];
	for (const { module } of configs) {
		const key = `${module.name}\0${module.versionRange}\0${String(module.filePath)}`;
		if (seen.has(key)) continue;
		seen.add(key);
		injections.push({
			channelName: module.name,
			module,
			astQuery: "Program",
			transform: SUBSCRIBE_TRANSFORM_NAME
		});
	}
	return injections;
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/amqplib.js
var module$1$4 = {
	name: "amqplib",
	versionRange: ">=0.5.5 <2"
};
var amqplibConfig = [
	{
		channelName: "publish",
		module: {
			...module$1$4,
			filePath: "lib/channel_model.js"
		},
		functionQuery: {
			className: "Channel",
			methodName: "publish",
			kind: "Sync"
		}
	},
	{
		channelName: "confirmPublish",
		module: {
			...module$1$4,
			filePath: "lib/channel_model.js"
		},
		functionQuery: {
			className: "ConfirmChannel",
			methodName: "publish",
			kind: "Callback"
		}
	},
	{
		channelName: "consume",
		module: {
			...module$1$4,
			filePath: "lib/channel_model.js"
		},
		functionQuery: {
			className: "Channel",
			methodName: "consume",
			kind: "Async"
		}
	},
	{
		channelName: "dispatch",
		module: {
			...module$1$4,
			filePath: "lib/channel.js"
		},
		functionQuery: {
			className: "BaseChannel",
			methodName: "dispatchMessage",
			kind: "Sync"
		}
	},
	{
		channelName: "ack",
		module: {
			...module$1$4,
			filePath: "lib/channel_model.js"
		},
		functionQuery: {
			className: "Channel",
			methodName: "ack",
			kind: "Sync"
		}
	},
	{
		channelName: "nack",
		module: {
			...module$1$4,
			filePath: "lib/channel_model.js"
		},
		functionQuery: {
			className: "Channel",
			methodName: "nack",
			kind: "Sync"
		}
	},
	{
		channelName: "reject",
		module: {
			...module$1$4,
			filePath: "lib/channel_model.js"
		},
		functionQuery: {
			className: "Channel",
			methodName: "reject",
			kind: "Sync"
		}
	},
	{
		channelName: "ackAll",
		module: {
			...module$1$4,
			filePath: "lib/channel_model.js"
		},
		functionQuery: {
			className: "Channel",
			methodName: "ackAll",
			kind: "Sync"
		}
	},
	{
		channelName: "nackAll",
		module: {
			...module$1$4,
			filePath: "lib/channel_model.js"
		},
		functionQuery: {
			className: "Channel",
			methodName: "nackAll",
			kind: "Sync"
		}
	},
	{
		channelName: "connect",
		module: {
			...module$1$4,
			filePath: "lib/connect.js"
		},
		functionQuery: {
			functionName: "connect",
			kind: "Callback"
		}
	}
];
var amqplibChannels = {
	AMQPLIB_PUBLISH: "orchestrion:amqplib:publish",
	AMQPLIB_CONFIRM_PUBLISH: "orchestrion:amqplib:confirmPublish",
	AMQPLIB_CONSUME: "orchestrion:amqplib:consume",
	AMQPLIB_DISPATCH: "orchestrion:amqplib:dispatch",
	AMQPLIB_ACK: "orchestrion:amqplib:ack",
	AMQPLIB_NACK: "orchestrion:amqplib:nack",
	AMQPLIB_REJECT: "orchestrion:amqplib:reject",
	AMQPLIB_ACK_ALL: "orchestrion:amqplib:ackAll",
	AMQPLIB_NACK_ALL: "orchestrion:amqplib:nackAll",
	AMQPLIB_CONNECT: "orchestrion:amqplib:connect"
};
var amqplibSubscribeInjection = toSubscribeInjections(amqplibConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/anthropic-ai.js
var anthropicAiConfig = [
	...["resources/messages/messages.js", "resources/messages/messages.mjs"].flatMap((filePath) => ["create", "countTokens"].map((methodName) => ({
		channelName: "chat",
		module: {
			name: "@anthropic-ai/sdk",
			versionRange: ">=0.19.2 <1",
			filePath
		},
		functionQuery: {
			className: "Messages",
			methodName,
			kind: "Auto"
		}
	}))),
	...["resources/completions.js", "resources/completions.mjs"].map((filePath) => ({
		channelName: "chat",
		module: {
			name: "@anthropic-ai/sdk",
			versionRange: ">=0.19.2 <1",
			filePath
		},
		functionQuery: {
			className: "Completions",
			methodName: "create",
			kind: "Auto"
		}
	})),
	...["resources/beta/messages/messages.js", "resources/beta/messages/messages.mjs"].map((filePath) => ({
		channelName: "chat",
		module: {
			name: "@anthropic-ai/sdk",
			versionRange: ">=0.19.2 <1",
			filePath
		},
		functionQuery: {
			className: "Messages",
			methodName: "create",
			kind: "Auto"
		}
	})),
	...["resources/models.js", "resources/models.mjs"].map((filePath) => ({
		channelName: "models",
		module: {
			name: "@anthropic-ai/sdk",
			versionRange: ">=0.19.2 <1",
			filePath
		},
		functionQuery: {
			className: "Models",
			methodName: "retrieve",
			kind: "Auto"
		}
	})),
	...["resources/messages/messages.js", "resources/messages/messages.mjs"].map((filePath) => ({
		channelName: "messages-stream",
		module: {
			name: "@anthropic-ai/sdk",
			versionRange: ">=0.19.2 <1",
			filePath
		},
		functionQuery: {
			className: "Messages",
			methodName: "stream",
			kind: "Sync"
		}
	}))
];
var anthropicAiChannels = {
	ANTHROPIC_CHAT: "orchestrion:@anthropic-ai/sdk:chat",
	ANTHROPIC_MODELS: "orchestrion:@anthropic-ai/sdk:models",
	ANTHROPIC_MESSAGES_STREAM: "orchestrion:@anthropic-ai/sdk:messages-stream"
};
var anthropicAiSubscribeInjection = toSubscribeInjections(anthropicAiConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/aws-sdk.js
var awsSdkConfig = [
	{
		channelName: "send",
		module: {
			name: "@smithy/core",
			versionRange: ">=3.24.0 <4",
			filePath: "dist-cjs/submodules/client/index.js"
		},
		functionQuery: {
			className: "Client",
			methodName: "send",
			kind: "Async"
		}
	},
	{
		channelName: "send",
		module: {
			name: "@smithy/smithy-client",
			versionRange: ">=1.0.3 <5",
			filePath: "dist-cjs/index.js"
		},
		functionQuery: {
			className: "Client",
			methodName: "send",
			kind: "Async"
		}
	},
	{
		channelName: "send",
		module: {
			name: "@aws-sdk/smithy-client",
			versionRange: "^3.1.0",
			filePath: "dist-cjs/index.js"
		},
		functionQuery: {
			className: "Client",
			methodName: "send",
			kind: "Async"
		}
	}
];
var awsSdkChannels = {
	AWS_SMITHY_CORE_SEND: "orchestrion:@smithy/core:send",
	AWS_SMITHY_CLIENT_SEND: "orchestrion:@smithy/smithy-client:send",
	AWS_SDK_SMITHY_CLIENT_SEND: "orchestrion:@aws-sdk/smithy-client:send"
};
var awsSdkSubscribeInjection = toSubscribeInjections(awsSdkConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/dataloader.js
var module$1$3 = {
	name: "dataloader",
	versionRange: ">=2.0.0 <3",
	filePath: "index.js"
};
var dataloaderConfig = [
	{
		channelName: "construct",
		module: module$1$3,
		functionQuery: {
			functionName: "DataLoader",
			kind: "Sync"
		}
	},
	{
		channelName: "load",
		module: module$1$3,
		functionQuery: {
			expressionName: "load",
			kind: "Async"
		}
	},
	{
		channelName: "loadMany",
		module: module$1$3,
		functionQuery: {
			expressionName: "loadMany",
			kind: "Async"
		}
	},
	{
		channelName: "prime",
		module: module$1$3,
		functionQuery: {
			expressionName: "prime",
			kind: "Sync"
		}
	},
	{
		channelName: "clear",
		module: module$1$3,
		functionQuery: {
			expressionName: "clear",
			kind: "Sync"
		}
	},
	{
		channelName: "clearAll",
		module: module$1$3,
		functionQuery: {
			expressionName: "clearAll",
			kind: "Sync"
		}
	}
];
var dataloaderChannels = {
	DATALOADER_CONSTRUCT: "orchestrion:dataloader:construct",
	DATALOADER_LOAD: "orchestrion:dataloader:load",
	DATALOADER_LOAD_MANY: "orchestrion:dataloader:loadMany",
	DATALOADER_PRIME: "orchestrion:dataloader:prime",
	DATALOADER_CLEAR: "orchestrion:dataloader:clear",
	DATALOADER_CLEAR_ALL: "orchestrion:dataloader:clearAll"
};
var dataloaderSubscribeInjection = toSubscribeInjections(dataloaderConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/express.js
var expressConfig = [
	{
		channelName: "handle",
		module: {
			name: "express",
			versionRange: ">=4.0.0 <5",
			filePath: "lib/router/layer.js"
		},
		functionQuery: {
			expressionName: "handle_request",
			kind: "Callback"
		}
	},
	{
		channelName: "handle",
		module: {
			name: "router",
			versionRange: ">=2.0.0 <3",
			filePath: "lib/layer.js"
		},
		functionQuery: {
			expressionName: "handleRequest",
			kind: "Callback"
		}
	},
	{
		channelName: "register",
		module: {
			name: "express",
			versionRange: ">=4.0.0 <5",
			filePath: "lib/router/index.js"
		},
		functionQuery: {
			expressionName: "route",
			kind: "Sync"
		}
	},
	{
		channelName: "register",
		module: {
			name: "express",
			versionRange: ">=4.0.0 <5",
			filePath: "lib/router/index.js"
		},
		functionQuery: {
			expressionName: "use",
			kind: "Sync"
		}
	},
	{
		channelName: "register",
		module: {
			name: "router",
			versionRange: ">=2.0.0 <3",
			filePath: "index.js"
		},
		functionQuery: {
			expressionName: "route",
			kind: "Sync"
		}
	},
	{
		channelName: "register",
		module: {
			name: "router",
			versionRange: ">=2.0.0 <3",
			filePath: "index.js"
		},
		functionQuery: {
			expressionName: "use",
			kind: "Sync"
		}
	}
];
var expressChannels = {
	EXPRESS_HANDLE: "orchestrion:express:handle",
	ROUTER_HANDLE: "orchestrion:router:handle",
	EXPRESS_REGISTER: "orchestrion:express:register",
	ROUTER_REGISTER: "orchestrion:router:register"
};
var expressSubscribeInjection = toSubscribeInjections(expressConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/firebase.js
var FIRESTORE_VERSION_RANGE = ">=3.0.0 <5";
var FIRESTORE_FILE = /dist\/lite\/(index|common-[^/]+)\.node\.(cjs\.js|mjs)$/;
var FIRESTORE_OPERATIONS$1 = [
	{
		functionName: "addDoc",
		channelName: "add-doc"
	},
	{
		functionName: "getDocs",
		channelName: "get-docs"
	},
	{
		functionName: "setDoc",
		channelName: "set-doc"
	},
	{
		functionName: "deleteDoc",
		channelName: "delete-doc"
	}
];
var FUNCTIONS_VERSION_RANGE = ">=6.0.0 <7";
var FUNCTIONS_TRIGGERS$1 = [
	{
		file: "lib/v2/providers/https.js",
		functionName: "onRequest",
		channelName: "http-request"
	},
	{
		file: "lib/v2/providers/https.js",
		functionName: "onCall",
		channelName: "http-call"
	},
	{
		file: "lib/v2/providers/firestore.js",
		functionName: "onDocumentCreated",
		channelName: "firestore-created"
	},
	{
		file: "lib/v2/providers/firestore.js",
		functionName: "onDocumentCreatedWithAuthContext",
		channelName: "firestore-created"
	},
	{
		file: "lib/v2/providers/firestore.js",
		functionName: "onDocumentUpdated",
		channelName: "firestore-updated"
	},
	{
		file: "lib/v2/providers/firestore.js",
		functionName: "onDocumentUpdatedWithAuthContext",
		channelName: "firestore-updated"
	},
	{
		file: "lib/v2/providers/firestore.js",
		functionName: "onDocumentDeleted",
		channelName: "firestore-deleted"
	},
	{
		file: "lib/v2/providers/firestore.js",
		functionName: "onDocumentDeletedWithAuthContext",
		channelName: "firestore-deleted"
	},
	{
		file: "lib/v2/providers/firestore.js",
		functionName: "onDocumentWritten",
		channelName: "firestore-written"
	},
	{
		file: "lib/v2/providers/firestore.js",
		functionName: "onDocumentWrittenWithAuthContext",
		channelName: "firestore-written"
	},
	{
		file: "lib/v2/providers/scheduler.js",
		functionName: "onSchedule",
		channelName: "scheduler"
	},
	{
		file: "lib/v2/providers/storage.js",
		functionName: "onObjectFinalized",
		channelName: "storage-finalized"
	},
	{
		file: "lib/v2/providers/storage.js",
		functionName: "onObjectArchived",
		channelName: "storage-archived"
	},
	{
		file: "lib/v2/providers/storage.js",
		functionName: "onObjectDeleted",
		channelName: "storage-deleted"
	},
	{
		file: "lib/v2/providers/storage.js",
		functionName: "onObjectMetadataUpdated",
		channelName: "storage-metadata-updated"
	}
];
var firebaseConfig = [...FIRESTORE_OPERATIONS$1.map(({ functionName, channelName }) => ({
	channelName,
	module: {
		name: "@firebase/firestore",
		versionRange: FIRESTORE_VERSION_RANGE,
		filePath: FIRESTORE_FILE
	},
	functionQuery: {
		functionName,
		kind: "Auto"
	}
})), ...FUNCTIONS_TRIGGERS$1.map(({ file, functionName, channelName }) => ({
	channelName,
	module: {
		name: "firebase-functions",
		versionRange: FUNCTIONS_VERSION_RANGE,
		filePath: file
	},
	functionQuery: {
		functionName,
		kind: "Sync"
	}
}))];
var firebaseChannels = {
	FIREBASE_FIRESTORE_ADD_DOC: "orchestrion:@firebase/firestore:add-doc",
	FIREBASE_FIRESTORE_GET_DOCS: "orchestrion:@firebase/firestore:get-docs",
	FIREBASE_FIRESTORE_SET_DOC: "orchestrion:@firebase/firestore:set-doc",
	FIREBASE_FIRESTORE_DELETE_DOC: "orchestrion:@firebase/firestore:delete-doc",
	FIREBASE_FUNCTIONS_HTTP_REQUEST: "orchestrion:firebase-functions:http-request",
	FIREBASE_FUNCTIONS_HTTP_CALL: "orchestrion:firebase-functions:http-call",
	FIREBASE_FUNCTIONS_FIRESTORE_CREATED: "orchestrion:firebase-functions:firestore-created",
	FIREBASE_FUNCTIONS_FIRESTORE_UPDATED: "orchestrion:firebase-functions:firestore-updated",
	FIREBASE_FUNCTIONS_FIRESTORE_DELETED: "orchestrion:firebase-functions:firestore-deleted",
	FIREBASE_FUNCTIONS_FIRESTORE_WRITTEN: "orchestrion:firebase-functions:firestore-written",
	FIREBASE_FUNCTIONS_SCHEDULER: "orchestrion:firebase-functions:scheduler",
	FIREBASE_FUNCTIONS_STORAGE_FINALIZED: "orchestrion:firebase-functions:storage-finalized",
	FIREBASE_FUNCTIONS_STORAGE_ARCHIVED: "orchestrion:firebase-functions:storage-archived",
	FIREBASE_FUNCTIONS_STORAGE_DELETED: "orchestrion:firebase-functions:storage-deleted",
	FIREBASE_FUNCTIONS_STORAGE_METADATA_UPDATED: "orchestrion:firebase-functions:storage-metadata-updated"
};
var firebaseSubscribeInjection = toSubscribeInjections(firebaseConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/generic-pool.js
var genericPoolConfig = [{
	channelName: "acquire",
	module: {
		name: "generic-pool",
		versionRange: ">=3.0.0 <4",
		filePath: "lib/Pool.js"
	},
	functionQuery: {
		className: "Pool",
		methodName: "acquire",
		kind: "Auto"
	}
}, {
	channelName: "acquire",
	module: {
		name: "generic-pool",
		versionRange: ">=2.4.0 <3",
		filePath: "lib/generic-pool.js"
	},
	functionQuery: {
		expressionName: "acquire",
		kind: "Callback"
	}
}];
var genericPoolChannels = { GENERIC_POOL_ACQUIRE: "orchestrion:generic-pool:acquire" };
var genericPoolSubscribeInjection = toSubscribeInjections(genericPoolConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/google-genai.js
var NODE_DIST_FILES = [
	"dist/node/index.js",
	"dist/node/index.mjs",
	"dist/node/index.cjs"
];
var googleGenAiConfig = [
	...NODE_DIST_FILES.flatMap((filePath) => ["generateContent", "generateContentStream"].map((expressionName) => ({
		channelName: "generate-content",
		module: {
			name: "@google/genai",
			versionRange: ">=0.10.0 <2",
			filePath
		},
		functionQuery: {
			expressionName,
			kind: "Auto"
		}
	}))),
	...NODE_DIST_FILES.map((filePath) => ({
		channelName: "embed-content",
		module: {
			name: "@google/genai",
			versionRange: ">=0.10.0 <2",
			filePath
		},
		functionQuery: {
			className: "Models",
			methodName: "embedContent",
			kind: "Auto"
		}
	})),
	...NODE_DIST_FILES.flatMap((filePath) => ["sendMessage", "sendMessageStream"].map((methodName) => ({
		channelName: "chat",
		module: {
			name: "@google/genai",
			versionRange: ">=0.10.0 <2",
			filePath
		},
		functionQuery: {
			className: "Chat",
			methodName,
			kind: "Auto"
		}
	})))
];
var googleGenAiChannels = {
	GOOGLE_GENAI_GENERATE_CONTENT: "orchestrion:@google/genai:generate-content",
	GOOGLE_GENAI_EMBED_CONTENT: "orchestrion:@google/genai:embed-content",
	GOOGLE_GENAI_CHAT: "orchestrion:@google/genai:chat"
};
var googleGenAiSubscribeInjection = toSubscribeInjections(googleGenAiConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/graphql.js
var graphqlConfig = [
	{
		channelName: "parse",
		module: {
			name: "graphql",
			versionRange: ">=14.0.0 <17",
			filePath: "language/parser.js"
		},
		functionQuery: {
			functionName: "parse",
			kind: "Sync"
		}
	},
	{
		channelName: "validate",
		module: {
			name: "graphql",
			versionRange: ">=14.0.0 <17",
			filePath: "validation/validate.js"
		},
		functionQuery: {
			functionName: "validate",
			kind: "Sync"
		}
	},
	{
		channelName: "execute",
		module: {
			name: "graphql",
			versionRange: ">=14.0.0 <17",
			filePath: "execution/execute.js"
		},
		functionQuery: {
			functionName: "execute",
			kind: "Auto"
		}
	}
];
var graphqlChannels = {
	GRAPHQL_PARSE: "orchestrion:graphql:parse",
	GRAPHQL_VALIDATE: "orchestrion:graphql:validate",
	GRAPHQL_EXECUTE: "orchestrion:graphql:execute"
};
var graphqlSubscribeInjection = toSubscribeInjections(graphqlConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/hapi.js
var hapiConfig = [{
	channelName: "route",
	module: {
		name: "@hapi/hapi",
		versionRange: ">=17.0.0 <22.0.0",
		filePath: "lib/server.js"
	},
	functionQuery: {
		methodName: "route",
		kind: "Sync"
	}
}, {
	channelName: "ext",
	module: {
		name: "@hapi/hapi",
		versionRange: ">=17.0.0 <22.0.0",
		filePath: "lib/server.js"
	},
	functionQuery: {
		methodName: "ext",
		kind: "Sync"
	}
}];
var hapiChannels = {
	HAPI_ROUTE: "orchestrion:@hapi/hapi:route",
	HAPI_EXT: "orchestrion:@hapi/hapi:ext"
};
var hapiSubscribeInjection = toSubscribeInjections(hapiConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/ioredis.js
var ioredisConfig = [
	...[
		"lib/redis.js",
		"built/redis.js",
		"built/redis/index.js"
	].flatMap((filePath) => [{
		channelName: "command",
		module: {
			name: "ioredis",
			versionRange: ">=2.0.0 <5.0.0",
			filePath
		},
		functionQuery: {
			expressionName: "sendCommand",
			kind: "Async"
		}
	}, {
		channelName: "connect",
		module: {
			name: "ioredis",
			versionRange: ">=2.0.0 <5.0.0",
			filePath
		},
		functionQuery: {
			expressionName: "connect",
			kind: "Async"
		}
	}]),
	{
		channelName: "command",
		module: {
			name: "ioredis",
			versionRange: ">=5.0.0 <5.11.0",
			filePath: "built/Redis.js"
		},
		functionQuery: {
			className: "Redis",
			methodName: "sendCommand",
			kind: "Async"
		}
	},
	{
		channelName: "connect",
		module: {
			name: "ioredis",
			versionRange: ">=5.0.0 <5.11.0",
			filePath: "built/Redis.js"
		},
		functionQuery: {
			className: "Redis",
			methodName: "connect",
			kind: "Async"
		}
	}
];
var ioredisChannels = {
	IOREDIS_COMMAND: "orchestrion:ioredis:command",
	IOREDIS_CONNECT: "orchestrion:ioredis:connect"
};
var ioredisSubscribeInjection = toSubscribeInjections(ioredisConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/kafkajs.js
var kafkajsConfig = [{
	channelName: "send_batch",
	module: {
		name: "kafkajs",
		versionRange: ">=2.0.0 <3",
		filePath: "src/producer/messageProducer.js"
	},
	functionQuery: {
		expressionName: "sendBatch",
		kind: "Async"
	}
}, {
	channelName: "consumer_run",
	module: {
		name: "kafkajs",
		versionRange: ">=2.0.0 <3",
		filePath: "src/consumer/index.js"
	},
	functionQuery: {
		expressionName: "run",
		kind: "Async"
	}
}];
var kafkajsChannels = {
	KAFKAJS_SEND_BATCH: "orchestrion:kafkajs:send_batch",
	KAFKAJS_CONSUMER_RUN: "orchestrion:kafkajs:consumer_run"
};
var kafkajsSubscribeInjection = toSubscribeInjections(kafkajsConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/knex.js
var MODULE_NAME$4 = "knex";
var RUNNER_FILES = [
	{
		filePath: "lib/execution/runner.js",
		versionRange: ">=0.22.0 <4"
	},
	{
		filePath: "lib/runner.js",
		versionRange: ">=0.10.0 <0.22.0"
	},
	{
		filePath: "src/runner.js",
		versionRange: ">=0.18.0 <0.19.0"
	}
];
var CLIENT_FILES = [{
	filePath: "lib/client.js",
	versionRange: ">=0.10.0 <4"
}, {
	filePath: "src/client.js",
	versionRange: ">=0.18.0 <0.19.0"
}];
var CLIENT_METHODS = [
	"queryBuilder",
	"schemaBuilder",
	"raw"
];
function runnerQuery(filePath, versionRange) {
	return {
		channelName: "query",
		module: {
			name: MODULE_NAME$4,
			versionRange,
			filePath
		},
		functionQuery: {
			className: "Runner",
			methodName: "query",
			kind: "Async"
		}
	};
}
function clientMethod(methodName, filePath, versionRange) {
	return {
		channelName: methodName,
		module: {
			name: MODULE_NAME$4,
			versionRange,
			filePath
		},
		functionQuery: {
			className: "Client",
			methodName,
			kind: "Sync"
		}
	};
}
var knexConfig = [...RUNNER_FILES.map(({ filePath, versionRange }) => runnerQuery(filePath, versionRange)), ...CLIENT_FILES.flatMap(({ filePath, versionRange }) => CLIENT_METHODS.map((methodName) => clientMethod(methodName, filePath, versionRange)))];
var knexChannels = {
	KNEX_QUERY: "orchestrion:knex:query",
	KNEX_QUERY_BUILDER: "orchestrion:knex:queryBuilder",
	KNEX_SCHEMA_BUILDER: "orchestrion:knex:schemaBuilder",
	KNEX_RAW: "orchestrion:knex:raw"
};
var knexSubscribeInjection = toSubscribeInjections(knexConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/koa.js
var koaConfig = [{
	channelName: "use",
	module: {
		name: "koa",
		versionRange: ">=2.0.0 <4",
		filePath: "lib/application.js"
	},
	functionQuery: {
		className: "Application",
		methodName: "use",
		kind: "Sync"
	}
}];
var koaChannels = { KOA_USE: "orchestrion:koa:use" };
var koaSubscribeInjection = toSubscribeInjections(koaConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/langchain.js
var chatModelConfig = ["dist/language_models/chat_models.cjs", "dist/language_models/chat_models.js"].flatMap((filePath) => {
	const module = {
		name: "@langchain/core",
		versionRange: ">=0.1.0 <2.0.0",
		filePath
	};
	return [{
		channelName: "chatModelInvoke",
		module,
		functionQuery: {
			className: "BaseChatModel",
			methodName: "invoke",
			kind: "Async"
		}
	}, {
		channelName: "chatModelStream",
		module,
		functionQuery: {
			className: "BaseChatModel",
			methodName: "_streamIterator",
			kind: "Async"
		}
	}];
});
var EMBED_QUERY = "embedQuery";
var EMBED_DOCUMENTS = "embedDocuments";
var EMBEDDINGS_PROVIDERS = [
	{
		name: "@langchain/openai",
		versionRange: ">=0.1.0 <2.0.0",
		methods: [EMBED_QUERY, EMBED_DOCUMENTS]
	},
	{
		name: "@langchain/google-genai",
		versionRange: ">=0.1.0 <3.0.0",
		methods: [EMBED_QUERY, EMBED_DOCUMENTS]
	},
	{
		name: "@langchain/mistralai",
		versionRange: ">=0.1.0 <2.0.0",
		methods: [EMBED_QUERY, EMBED_DOCUMENTS]
	},
	{
		name: "@langchain/google-common",
		versionRange: ">=0.1.0 <3.0.0",
		methods: [EMBED_DOCUMENTS]
	}
];
var embeddingsConfig = EMBEDDINGS_PROVIDERS.flatMap(({ name, versionRange, methods }) => ["dist/embeddings.cjs", "dist/embeddings.js"].flatMap((filePath) => methods.map((method) => ({
	channelName: method,
	module: {
		name,
		versionRange,
		filePath
	},
	functionQuery: {
		methodName: method,
		kind: "Async"
	}
}))));
var langchainConfig = [...chatModelConfig, ...embeddingsConfig];
var langchainEmbeddingsChannels = EMBEDDINGS_PROVIDERS.flatMap(({ name, methods }) => methods.map((method) => `orchestrion:${name}:${method}`));
var langchainChannels = {
	LANGCHAIN_CHAT_MODEL_INVOKE: "orchestrion:@langchain/core:chatModelInvoke",
	LANGCHAIN_CHAT_MODEL_STREAM: "orchestrion:@langchain/core:chatModelStream"
};
var langchainSubscribeInjection = toSubscribeInjections(langchainConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/langgraph.js
var module$1$2 = (filePath) => ({
	name: "@langchain/langgraph",
	versionRange: ">=0.0.0 <2.0.0",
	filePath
});
var compileConfig = ["dist/graph/state.cjs", "dist/graph/state.js"].map((filePath) => ({
	channelName: "stateGraphCompile",
	module: module$1$2(filePath),
	functionQuery: {
		className: "StateGraph",
		methodName: "compile",
		kind: "Sync"
	}
}));
var createReactAgentConfig = ["dist/prebuilt/react_agent_executor.cjs", "dist/prebuilt/react_agent_executor.js"].map((filePath) => ({
	channelName: "createReactAgent",
	module: module$1$2(filePath),
	functionQuery: {
		functionName: "createReactAgent",
		kind: "Sync"
	}
}));
var langgraphConfig = [...compileConfig, ...createReactAgentConfig];
var langgraphChannels = {
	LANGGRAPH_STATE_GRAPH_COMPILE: "orchestrion:@langchain/langgraph:stateGraphCompile",
	LANGGRAPH_CREATE_REACT_AGENT: "orchestrion:@langchain/langgraph:createReactAgent"
};
var langgraphSubscribeInjection = toSubscribeInjections(langgraphConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/lru-memoizer.js
var lruMemoizerConfig = [{
	channelName: "load",
	module: {
		name: "lru-memoizer",
		versionRange: ">=2.1.0 <4",
		filePath: "lib/async.js"
	},
	functionQuery: {
		functionName: "memoizedFunction",
		kind: "Callback"
	}
}];
var lruMemoizerChannels = { LRU_MEMOIZER_LOAD: "orchestrion:lru-memoizer:load" };
var lruMemoizerSubscribeInjection = toSubscribeInjections(lruMemoizerConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/mongodb.js
var module$1$1 = { name: "mongodb" };
var mongodbConfig = [
	{
		channelName: "command",
		module: {
			...module$1$1,
			versionRange: ">=6.4.0 <8",
			filePath: "lib/cmap/connection.js"
		},
		functionQuery: {
			methodName: "command",
			kind: "Async"
		}
	},
	{
		channelName: "command",
		module: {
			...module$1$1,
			versionRange: ">=4.0.0 <6.4",
			filePath: "lib/cmap/connection.js"
		},
		functionQuery: {
			methodName: "command",
			kind: "Callback"
		}
	},
	{
		channelName: "checkout",
		module: {
			...module$1$1,
			versionRange: ">=4.0.0 <6.4",
			filePath: "lib/cmap/connection_pool.js"
		},
		functionQuery: {
			methodName: "checkOut",
			kind: "Callback"
		}
	},
	...[
		"insert",
		"update",
		"remove"
	].map((op) => ({
		channelName: `v3_${op}`,
		module: {
			...module$1$1,
			versionRange: ">=3.3.0 <4",
			filePath: "lib/core/wireprotocol/index.js"
		},
		functionQuery: {
			expressionName: op,
			kind: "Callback"
		}
	})),
	{
		channelName: "v3_command",
		module: {
			...module$1$1,
			versionRange: ">=3.3.0 <4",
			filePath: "lib/core/wireprotocol/command.js"
		},
		functionQuery: {
			functionName: "command",
			kind: "Callback"
		}
	},
	{
		channelName: "v3_query",
		module: {
			...module$1$1,
			versionRange: ">=3.3.0 <4",
			filePath: "lib/core/wireprotocol/query.js"
		},
		functionQuery: {
			functionName: "query",
			kind: "Callback"
		}
	},
	{
		channelName: "v3_get_more",
		module: {
			...module$1$1,
			versionRange: ">=3.3.0 <4",
			filePath: "lib/core/wireprotocol/get_more.js"
		},
		functionQuery: {
			functionName: "getMore",
			kind: "Callback"
		}
	}
];
var mongodbChannels = {
	MONGODB_COMMAND: "orchestrion:mongodb:command",
	MONGODB_CHECKOUT: "orchestrion:mongodb:checkout",
	MONGODB_V3_INSERT: "orchestrion:mongodb:v3_insert",
	MONGODB_V3_UPDATE: "orchestrion:mongodb:v3_update",
	MONGODB_V3_REMOVE: "orchestrion:mongodb:v3_remove",
	MONGODB_V3_COMMAND: "orchestrion:mongodb:v3_command",
	MONGODB_V3_QUERY: "orchestrion:mongodb:v3_query",
	MONGODB_V3_GET_MORE: "orchestrion:mongodb:v3_get_more"
};
var mongodbSubscribeInjection = toSubscribeInjections(mongodbConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/mongoose.js
var module$1 = {
	name: "mongoose",
	versionRange: ">=5.9.7 <9.7.0"
};
var CONTEXT_CAPTURE_QUERY_METHODS = [
	"find",
	"findOne",
	"deleteOne",
	"deleteMany",
	"estimatedDocumentCount",
	"countDocuments",
	"distinct",
	"where",
	"$where",
	"findOneAndUpdate",
	"findOneAndDelete",
	"findOneAndReplace",
	"remove",
	"count",
	"findOneAndRemove"
];
var mongooseConfig = [
	{
		channelName: "query_exec",
		module: {
			...module$1,
			filePath: "lib/query.js"
		},
		functionQuery: {
			expressionName: "exec",
			kind: "Auto"
		}
	},
	{
		channelName: "aggregate_exec",
		module: {
			...module$1,
			filePath: "lib/aggregate.js"
		},
		functionQuery: {
			expressionName: "exec",
			kind: "Auto"
		}
	},
	{
		channelName: "model_save",
		module: {
			...module$1,
			filePath: "lib/model.js"
		},
		functionQuery: {
			expressionName: "save",
			kind: "Auto"
		}
	},
	{
		channelName: "model_insert_many",
		module: {
			...module$1,
			filePath: "lib/model.js"
		},
		functionQuery: {
			expressionName: "insertMany",
			kind: "Auto"
		}
	},
	{
		channelName: "model_bulk_write",
		module: {
			...module$1,
			filePath: "lib/model.js"
		},
		functionQuery: {
			expressionName: "bulkWrite",
			kind: "Auto"
		}
	},
	{
		channelName: "model_remove",
		module: {
			...module$1,
			filePath: "lib/model.js"
		},
		functionQuery: {
			expressionName: "remove",
			kind: "Auto"
		}
	},
	{
		channelName: "model_aggregate",
		module: {
			...module$1,
			filePath: "lib/model.js"
		},
		functionQuery: {
			expressionName: "aggregate",
			kind: "Sync"
		}
	},
	...CONTEXT_CAPTURE_QUERY_METHODS.map((methodName) => ({
		channelName: `ctx_${methodName}`,
		module: {
			...module$1,
			filePath: "lib/query.js"
		},
		functionQuery: {
			expressionName: methodName,
			kind: "Sync"
		}
	}))
];
var mongooseChannels = {
	MONGOOSE_QUERY_EXEC: "orchestrion:mongoose:query_exec",
	MONGOOSE_AGGREGATE_EXEC: "orchestrion:mongoose:aggregate_exec",
	MONGOOSE_MODEL_SAVE: "orchestrion:mongoose:model_save",
	MONGOOSE_MODEL_INSERT_MANY: "orchestrion:mongoose:model_insert_many",
	MONGOOSE_MODEL_BULK_WRITE: "orchestrion:mongoose:model_bulk_write",
	MONGOOSE_MODEL_REMOVE: "orchestrion:mongoose:model_remove",
	MONGOOSE_MODEL_AGGREGATE: "orchestrion:mongoose:model_aggregate"
};
var MONGOOSE_CONTEXT_CAPTURE_CHANNELS = CONTEXT_CAPTURE_QUERY_METHODS.map((methodName) => `orchestrion:mongoose:ctx_${methodName}`);
var mongooseSubscribeInjection = toSubscribeInjections(mongooseConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/mysql2.js
var mysql2Config = [
	{
		channelName: "query",
		module: {
			name: "mysql2",
			versionRange: ">=1.4.2 <3.11.5",
			filePath: "lib/connection.js"
		},
		functionQuery: {
			className: "Connection",
			methodName: "query",
			kind: "Callback"
		}
	},
	{
		channelName: "execute",
		module: {
			name: "mysql2",
			versionRange: ">=1.4.2 <3.11.5",
			filePath: "lib/connection.js"
		},
		functionQuery: {
			className: "Connection",
			methodName: "execute",
			kind: "Callback"
		}
	},
	{
		channelName: "query",
		module: {
			name: "mysql2",
			versionRange: ">=3.11.5 <3.20.0",
			filePath: "lib/base/connection.js"
		},
		functionQuery: {
			className: "BaseConnection",
			methodName: "query",
			kind: "Callback"
		}
	},
	{
		channelName: "execute",
		module: {
			name: "mysql2",
			versionRange: ">=3.11.5 <3.20.0",
			filePath: "lib/base/connection.js"
		},
		functionQuery: {
			className: "BaseConnection",
			methodName: "execute",
			kind: "Callback"
		}
	}
];
var mysql2Channels = {
	MYSQL2_QUERY: "orchestrion:mysql2:query",
	MYSQL2_EXECUTE: "orchestrion:mysql2:execute"
};
var mysql2SubscribeInjection = toSubscribeInjections(mysql2Config);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/mysql.js
var mysqlConfig = [{
	channelName: "query",
	module: {
		name: "mysql",
		versionRange: ">=2.0.0 <3",
		filePath: "lib/Connection.js"
	},
	functionQuery: {
		expressionName: "query",
		kind: "Auto"
	}
}];
var mysqlChannels = { MYSQL_QUERY: "orchestrion:mysql:query" };
var mysqlSubscribeInjection = toSubscribeInjections(mysqlConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/nestjs.js
function astQueryInstrumentation(config) {
	return config;
}
var nestjsConfig = [
	{
		channelName: "nestFactoryCreate",
		module: {
			name: "@nestjs/core",
			versionRange: ">=8.0.0 <12",
			filePath: "nest-factory.js"
		},
		functionQuery: {
			className: "NestFactoryStatic",
			methodName: "create",
			kind: "Async"
		}
	},
	{
		channelName: "routerExecutionContextCreate",
		module: {
			name: "@nestjs/core",
			versionRange: ">=8.0.0 <12",
			filePath: "router/router-execution-context.js"
		},
		functionQuery: {
			className: "RouterExecutionContext",
			methodName: "create",
			kind: "Sync"
		}
	},
	astQueryInstrumentation({
		channelName: "injectableDecorator",
		module: {
			name: "@nestjs/common",
			versionRange: ">=8.0.0 <12",
			filePath: "decorators/core/injectable.decorator.js"
		},
		astQuery: "FunctionDeclaration[id.name=\"Injectable\"] ReturnStatement > ArrowFunctionExpression",
		functionQuery: { kind: "Sync" }
	}),
	astQueryInstrumentation({
		channelName: "catchDecorator",
		module: {
			name: "@nestjs/common",
			versionRange: ">=8.0.0 <12",
			filePath: "decorators/core/catch.decorator.js"
		},
		astQuery: "FunctionDeclaration[id.name=\"Catch\"] ReturnStatement > ArrowFunctionExpression",
		functionQuery: { kind: "Sync" }
	}),
	{
		channelName: "cronDecorator",
		module: {
			name: "@nestjs/schedule",
			versionRange: ">=2.0.0",
			filePath: "dist/decorators/cron.decorator.js"
		},
		functionQuery: {
			functionName: "Cron",
			kind: "Sync"
		}
	},
	{
		channelName: "intervalDecorator",
		module: {
			name: "@nestjs/schedule",
			versionRange: ">=2.0.0",
			filePath: "dist/decorators/interval.decorator.js"
		},
		functionQuery: {
			functionName: "Interval",
			kind: "Sync"
		}
	},
	{
		channelName: "timeoutDecorator",
		module: {
			name: "@nestjs/schedule",
			versionRange: ">=2.0.0",
			filePath: "dist/decorators/timeout.decorator.js"
		},
		functionQuery: {
			functionName: "Timeout",
			kind: "Sync"
		}
	},
	{
		channelName: "onEventDecorator",
		module: {
			name: "@nestjs/event-emitter",
			versionRange: ">=2.0.0",
			filePath: "dist/decorators/on-event.decorator.js"
		},
		functionQuery: {
			expressionName: "OnEvent",
			kind: "Sync"
		}
	},
	{
		channelName: "processorDecorator",
		module: {
			name: "@nestjs/bullmq",
			versionRange: ">=10.0.0",
			filePath: "dist/decorators/processor.decorator.js"
		},
		functionQuery: {
			functionName: "Processor",
			kind: "Sync"
		}
	}
];
var nestjsChannels = {
	NESTJS_APP_CREATION: "orchestrion:@nestjs/core:nestFactoryCreate",
	NESTJS_ROUTER_CONTEXT: "orchestrion:@nestjs/core:routerExecutionContextCreate",
	NESTJS_INJECTABLE: "orchestrion:@nestjs/common:injectableDecorator",
	NESTJS_CATCH: "orchestrion:@nestjs/common:catchDecorator",
	NESTJS_SCHEDULE_CRON: "orchestrion:@nestjs/schedule:cronDecorator",
	NESTJS_SCHEDULE_INTERVAL: "orchestrion:@nestjs/schedule:intervalDecorator",
	NESTJS_SCHEDULE_TIMEOUT: "orchestrion:@nestjs/schedule:timeoutDecorator",
	NESTJS_ONEVENT: "orchestrion:@nestjs/event-emitter:onEventDecorator",
	NESTJS_PROCESSOR: "orchestrion:@nestjs/bullmq:processorDecorator"
};
var nestjsSubscribeInjection = toSubscribeInjections(nestjsConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/openai.js
var openaiConfig = [
	...["resources/chat/completions/completions.js", "resources/chat/completions/completions.mjs"].map((filePath) => ({
		channelName: "chat",
		module: {
			name: "openai",
			versionRange: ">=4.0.0 <8",
			filePath
		},
		functionQuery: {
			className: "Completions",
			methodName: "create",
			kind: "Auto"
		}
	})),
	...["resources/responses/responses.js", "resources/responses/responses.mjs"].map((filePath) => ({
		channelName: "chat",
		module: {
			name: "openai",
			versionRange: ">=4.0.0 <8",
			filePath
		},
		functionQuery: {
			className: "Responses",
			methodName: "create",
			kind: "Auto"
		}
	})),
	...["resources/embeddings.js", "resources/embeddings.mjs"].map((filePath) => ({
		channelName: "embeddings",
		module: {
			name: "openai",
			versionRange: ">=4.0.0 <8",
			filePath
		},
		functionQuery: {
			className: "Embeddings",
			methodName: "create",
			kind: "Auto"
		}
	})),
	...["resources/conversations/conversations.js", "resources/conversations/conversations.mjs"].map((filePath) => ({
		channelName: "chat",
		module: {
			name: "openai",
			versionRange: ">=4.0.0 <8",
			filePath
		},
		functionQuery: {
			className: "Conversations",
			methodName: "create",
			kind: "Auto"
		}
	}))
];
var openaiChannels = {
	OPENAI_CHAT: "orchestrion:openai:chat",
	OPENAI_EMBEDDINGS: "orchestrion:openai:embeddings"
};
var openaiSubscribeInjection = toSubscribeInjections(openaiConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/pg.js
var pgConfig = [
	{
		channelName: "query",
		module: {
			name: "pg",
			versionRange: ">=8.0.3 <9",
			filePath: "lib/client.js"
		},
		functionQuery: {
			className: "Client",
			methodName: "query",
			kind: "Auto"
		}
	},
	{
		channelName: "connect",
		module: {
			name: "pg",
			versionRange: ">=8.0.3 <9",
			filePath: "lib/client.js"
		},
		functionQuery: {
			className: "Client",
			methodName: "connect",
			kind: "Auto"
		}
	},
	{
		channelName: "query",
		module: {
			name: "pg",
			versionRange: ">=8.0.3 <9",
			filePath: "lib/native/client.js"
		},
		functionQuery: {
			expressionName: "query",
			kind: "Auto"
		}
	},
	{
		channelName: "connect",
		module: {
			name: "pg",
			versionRange: ">=8.0.3 <9",
			filePath: "lib/native/client.js"
		},
		functionQuery: {
			expressionName: "connect",
			kind: "Auto"
		}
	},
	{
		channelName: "connect",
		module: {
			name: "pg-pool",
			versionRange: ">=2.0.0 <4",
			filePath: "index.js"
		},
		functionQuery: {
			className: "Pool",
			methodName: "connect",
			kind: "Auto"
		}
	}
];
var pgChannels = {
	PG_QUERY: "orchestrion:pg:query",
	PG_CONNECT: "orchestrion:pg:connect",
	PGPOOL_CONNECT: "orchestrion:pg-pool:connect"
};
var pgSubscribeInjection = toSubscribeInjections(pgConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/postgres.js
var postgresJsInstrumentationConfig = (dir) => [
	{
		channelName: "handle",
		module: {
			name: "postgres",
			versionRange: ">=3.0.0 <4",
			filePath: `${dir}/query.js`
		},
		functionQuery: {
			className: "Query",
			methodName: "handle",
			kind: "Async"
		}
	},
	{
		channelName: "connection",
		module: {
			name: "postgres",
			versionRange: ">=3.0.0 <4",
			filePath: `${dir}/connection.js`
		},
		functionQuery: {
			functionName: "Connection",
			kind: "Sync"
		}
	},
	{
		channelName: "execute",
		module: {
			name: "postgres",
			versionRange: ">=3.0.0 <4",
			filePath: `${dir}/connection.js`
		},
		functionQuery: {
			functionName: "execute",
			kind: "Sync"
		}
	},
	{
		channelName: "connect",
		module: {
			name: "postgres",
			versionRange: ">=3.0.0 <4",
			filePath: `${dir}/connection.js`
		},
		functionQuery: {
			methodName: "connect",
			kind: "Sync"
		}
	}
];
var postgresJsConfig = ["src", "cjs/src"].flatMap(postgresJsInstrumentationConfig);
var postgresJsChannels = {
	POSTGRESJS_HANDLE: "orchestrion:postgres:handle",
	POSTGRESJS_CONNECTION: "orchestrion:postgres:connection",
	POSTGRESJS_EXECUTE: "orchestrion:postgres:execute",
	POSTGRESJS_CONNECT: "orchestrion:postgres:connect"
};
var postgresJsSubscribeInjection = toSubscribeInjections(postgresJsConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/redis.js
var redisConfig = [
	{
		channelName: "command",
		module: {
			name: "redis",
			versionRange: ">=2.6.0 <4",
			filePath: "index.js"
		},
		functionQuery: {
			expressionName: "internal_send_command",
			kind: "Sync"
		}
	},
	{
		channelName: "executor",
		module: {
			name: "@redis/client",
			versionRange: "^1.0.0",
			filePath: "dist/lib/client/index.js"
		},
		functionQuery: {
			className: "RedisClient",
			methodName: "commandsExecutor",
			kind: "Async"
		}
	},
	{
		channelName: "command",
		module: {
			name: "@redis/client",
			versionRange: "^1.0.0",
			filePath: "dist/lib/client/index.js"
		},
		functionQuery: {
			className: "RedisClient",
			methodName: "sendCommand",
			kind: "Async"
		}
	},
	{
		channelName: "connect",
		module: {
			name: "@redis/client",
			versionRange: "^1.0.0",
			filePath: "dist/lib/client/index.js"
		},
		functionQuery: {
			className: "RedisClient",
			methodName: "connect",
			kind: "Async"
		}
	},
	{
		channelName: "command",
		module: {
			name: "@redis/client",
			versionRange: ">=5.0.0 <5.12.0",
			filePath: "dist/lib/client/index.js"
		},
		functionQuery: {
			className: "RedisClient",
			methodName: "sendCommand",
			kind: "Async"
		}
	},
	{
		channelName: "connect",
		module: {
			name: "@redis/client",
			versionRange: ">=5.0.0 <5.12.0",
			filePath: "dist/lib/client/index.js"
		},
		functionQuery: {
			className: "RedisClient",
			methodName: "connect",
			kind: "Async"
		}
	},
	{
		channelName: "multi",
		module: {
			name: "@redis/client",
			versionRange: ">=5.0.0 <5.12.0",
			filePath: "dist/lib/client/index.js"
		},
		functionQuery: {
			className: "RedisClient",
			methodName: "_executeMulti",
			kind: "Async"
		}
	},
	{
		channelName: "pipeline",
		module: {
			name: "@redis/client",
			versionRange: ">=5.0.0 <5.12.0",
			filePath: "dist/lib/client/index.js"
		},
		functionQuery: {
			className: "RedisClient",
			methodName: "_executePipeline",
			kind: "Async"
		}
	},
	{
		channelName: "batch",
		module: {
			name: "@redis/client",
			versionRange: "^1.0.0",
			filePath: "dist/lib/client/index.js"
		},
		functionQuery: {
			className: "RedisClient",
			methodName: "multiExecutor",
			kind: "Async"
		}
	}
];
var redisChannels = {
	REDIS_COMMAND: "orchestrion:redis:command",
	NODE_REDIS_COMMAND: "orchestrion:@redis/client:command",
	NODE_REDIS_EXECUTOR: "orchestrion:@redis/client:executor",
	NODE_REDIS_CONNECT: "orchestrion:@redis/client:connect",
	NODE_REDIS_MULTI: "orchestrion:@redis/client:multi",
	NODE_REDIS_PIPELINE: "orchestrion:@redis/client:pipeline",
	NODE_REDIS_BATCH: "orchestrion:@redis/client:batch"
};
var redisSubscribeInjection = toSubscribeInjections(redisConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/remix.js
var remixInstrumentationConfig = (dir) => [
	{
		channelName: "requestHandler",
		module: {
			name: "@remix-run/server-runtime",
			versionRange: ">=2.0.0 <3",
			filePath: `${dir}/server.js`
		},
		astQuery: "FunctionExpression[id.name=\"requestHandler\"]",
		functionQuery: { kind: "Async" }
	},
	{
		channelName: "matchServerRoutes",
		module: {
			name: "@remix-run/server-runtime",
			versionRange: ">=2.0.0 <3",
			filePath: `${dir}/routeMatching.js`
		},
		functionQuery: {
			functionName: "matchServerRoutes",
			kind: "Sync"
		}
	},
	{
		channelName: "callRouteLoader",
		module: {
			name: "@remix-run/server-runtime",
			versionRange: ">=2.9.0 <3",
			filePath: `${dir}/data.js`
		},
		functionQuery: {
			functionName: "callRouteLoader",
			kind: "Async"
		}
	},
	{
		channelName: "callRouteAction",
		module: {
			name: "@remix-run/server-runtime",
			versionRange: ">=2.9.0 <3",
			filePath: `${dir}/data.js`
		},
		functionQuery: {
			functionName: "callRouteAction",
			kind: "Async"
		}
	},
	{
		channelName: "callRouteLoader",
		module: {
			name: "@remix-run/server-runtime",
			versionRange: ">=2.0.0 <2.9.0",
			filePath: `${dir}/data.js`
		},
		functionQuery: {
			functionName: "callRouteLoaderRR",
			kind: "Async"
		}
	},
	{
		channelName: "callRouteAction",
		module: {
			name: "@remix-run/server-runtime",
			versionRange: ">=2.0.0 <2.9.0",
			filePath: `${dir}/data.js`
		},
		functionQuery: {
			functionName: "callRouteActionRR",
			kind: "Async"
		}
	}
];
var remixConfig = ["dist", "dist/esm"].flatMap(remixInstrumentationConfig);
var remixChannels = {
	REMIX_REQUEST_HANDLER: "orchestrion:@remix-run/server-runtime:requestHandler",
	REMIX_MATCH_SERVER_ROUTES: "orchestrion:@remix-run/server-runtime:matchServerRoutes",
	REMIX_CALL_ROUTE_LOADER: "orchestrion:@remix-run/server-runtime:callRouteLoader",
	REMIX_CALL_ROUTE_ACTION: "orchestrion:@remix-run/server-runtime:callRouteAction"
};
var remixSubscribeInjection = toSubscribeInjections(remixConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/tedious.js
var MODULE_NAME$3 = "tedious";
var FILE_PATH = "lib/connection.js";
var VERSION_RANGE = ">=1.11.0 <20";
var tediousConfig = [
	"connect",
	"execSql",
	"execSqlBatch",
	"callProcedure",
	"execBulkLoad",
	"prepare",
	"execute"
].map((methodName) => ({
	channelName: methodName,
	module: {
		name: MODULE_NAME$3,
		versionRange: VERSION_RANGE,
		filePath: FILE_PATH
	},
	functionQuery: {
		className: "Connection",
		methodName,
		kind: "Sync"
	}
}));
var tediousChannels = {
	TEDIOUS_CONNECT: "orchestrion:tedious:connect",
	TEDIOUS_EXEC_SQL: "orchestrion:tedious:execSql",
	TEDIOUS_EXEC_SQL_BATCH: "orchestrion:tedious:execSqlBatch",
	TEDIOUS_CALL_PROCEDURE: "orchestrion:tedious:callProcedure",
	TEDIOUS_EXEC_BULK_LOAD: "orchestrion:tedious:execBulkLoad",
	TEDIOUS_PREPARE: "orchestrion:tedious:prepare",
	TEDIOUS_EXECUTE: "orchestrion:tedious:execute"
};
var tediousSubscribeInjection = toSubscribeInjections(tediousConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/vercel-ai.js
var vercelAiConfig = [
	...vercelAiEntries(">=4.0.0 <7.0.0", "generateText", "generateText", "Async"),
	...vercelAiEntries(">=4.0.0 <7.0.0", "streamText", "streamText", "Sync"),
	...vercelAiEntries(">=4.0.0 <7.0.0", "generateObject", "generateObject", "Async"),
	...vercelAiEntries(">=4.0.0 <7.0.0", "embed", "embed", "Async"),
	...vercelAiEntries(">=4.0.0 <7.0.0", "embedMany", "embedMany", "Async"),
	...vercelAiEntries(">=5.0.0 <7.0.0", "resolveLanguageModel", "resolveLanguageModel", "Sync"),
	...vercelAiEntries(">=6.0.0 <7.0.0", "executeToolCall", "executeToolCall", "Async")
];
var vercelAiChannels = {
	VERCEL_AI_GENERATE_TEXT: "orchestrion:ai:generateText",
	VERCEL_AI_STREAM_TEXT: "orchestrion:ai:streamText",
	VERCEL_AI_GENERATE_OBJECT: "orchestrion:ai:generateObject",
	VERCEL_AI_EMBED: "orchestrion:ai:embed",
	VERCEL_AI_EMBED_MANY: "orchestrion:ai:embedMany",
	VERCEL_AI_EXECUTE_TOOL_CALL: "orchestrion:ai:executeToolCall",
	VERCEL_AI_RESOLVE_LANGUAGE_MODEL: "orchestrion:ai:resolveLanguageModel"
};
function vercelAiEntries(versionRange, channelName, functionName, kind) {
	return ["dist/index.js", "dist/index.mjs"].map((filePath) => ({
		channelName,
		module: {
			name: "ai",
			versionRange,
			filePath
		},
		functionQuery: {
			functionName,
			kind
		}
	}));
}
var vercelAiSubscribeInjection = toSubscribeInjections(vercelAiConfig);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/channels.js
var CHANNELS = {
	...amqplibChannels,
	...anthropicAiChannels,
	...awsSdkChannels,
	...dataloaderChannels,
	...expressChannels,
	...firebaseChannels,
	...genericPoolChannels,
	...googleGenAiChannels,
	...graphqlChannels,
	...hapiChannels,
	...ioredisChannels,
	...kafkajsChannels,
	...knexChannels,
	...koaChannels,
	...langchainChannels,
	...langgraphChannels,
	...lruMemoizerChannels,
	...mongodbChannels,
	...mongooseChannels,
	...mysql2Channels,
	...mysqlChannels,
	...nestjsChannels,
	...openaiChannels,
	...pgChannels,
	...postgresJsChannels,
	...redisChannels,
	...remixChannels,
	...tediousChannels,
	...vercelAiChannels
};
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/amqplib.js
var INTEGRATION_NAME$32 = "Amqplib";
var PUBLISHER_ORIGIN$1 = "auto.amqplib.orchestrion.publisher";
var CONSUMER_ORIGIN$2 = "auto.amqplib.orchestrion.consumer";
var ATTR_MESSAGING_OPERATION$1 = "messaging.operation";
var ATTR_MESSAGING_DESTINATION$1 = "messaging.destination";
var ATTR_MESSAGING_DESTINATION_KIND$2 = "messaging.destination_kind";
var ATTR_MESSAGING_RABBITMQ_ROUTING_KEY$1 = "messaging.rabbitmq.routing_key";
var ATTR_MESSAGING_PROTOCOL$1 = "messaging.protocol";
var ATTR_MESSAGING_PROTOCOL_VERSION_LEGACY = "messaging.protocol_version";
var ATTR_MESSAGING_URL$1 = "messaging.url";
var ATTR_MESSAGING_MESSAGE_ID = "messaging.message_id";
var ATTR_MESSAGING_CONVERSATION_ID_LEGACY = "messaging.conversation_id";
var ATTR_MESSAGING_RABBITMQ_DESTINATION_ROUTING_KEY = "messaging.rabbitmq.destination.routing_key";
var ATTR_MESSAGING_CONVERSATION_ID$1 = "messaging.message.conversation_id";
var MESSAGING_DESTINATION_KIND_VALUE_TOPIC$2 = "topic";
var MESSAGING_OPERATION_VALUE_PROCESS$1 = "process";
var MESSAGING_OPERATION_VALUE_SEND = "send";
var CONSUME_TIMEOUT_MS$1 = 6e4;
var END_OP = {
	Ack: "ack",
	AckAll: "ackAll",
	Reject: "reject",
	Nack: "nack",
	NackAll: "nackAll",
	ChannelClosed: "channel closed",
	ChannelError: "channel error",
	InstrumentationTimeout: "instrumentation timeout"
};
var MESSAGE_STORED_SPAN$1 = /* @__PURE__ */ Symbol("sentry.amqplib.message.stored-span");
var CHANNEL_SPANS_NOT_ENDED$1 = /* @__PURE__ */ Symbol("sentry.amqplib.channel.spans-not-ended");
var CHANNEL_CONSUME_TIMEOUT_TIMER$1 = /* @__PURE__ */ Symbol("sentry.amqplib.channel.consume-timeout-timer");
var CHANNEL_CONSUMER_INFO = /* @__PURE__ */ Symbol("sentry.amqplib.channel.consumer-info");
var CHANNEL_IS_CONFIRM_PUBLISHING$1 = /* @__PURE__ */ Symbol("sentry.amqplib.channel.is-confirm-publishing");
var CONNECTION_ATTRIBUTES$1 = /* @__PURE__ */ Symbol("sentry.amqplib.connection.attributes");
var NOOP$3 = () => {};
var subscribed$7 = false;
var _amqplibChannelIntegration = (() => {
	return {
		name: INTEGRATION_NAME$32,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel || subscribed$7) return;
			subscribed$7 = true;
			DEBUG_BUILD && debug$3.log("[orchestrion:amqplib] subscribing to amqplib tracing channels");
			waitForTracingChannelBinding(() => {
				subscribeConnect$1();
				subscribePublish();
				subscribeConfirmPublish();
				subscribeConsume();
				subscribeDispatch();
				subscribeSettle();
			});
		}
	};
});
function subscribePublish() {
	bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(CHANNELS.AMQPLIB_PUBLISH), (data) => {
		if (data.self?.[CHANNEL_IS_CONFIRM_PUBLISHING$1]) return;
		return startPublishSpan$1(data);
	});
}
function subscribeConfirmPublish() {
	const channel = diagnosticsChannel.tracingChannel(CHANNELS.AMQPLIB_CONFIRM_PUBLISH);
	bindTracingChannelToSpan(channel, (data) => {
		if (data.self) data.self[CHANNEL_IS_CONFIRM_PUBLISHING$1] = true;
		return startPublishSpan$1(data);
	});
	channel.end.subscribe((message) => {
		const self = message.self;
		if (self) self[CHANNEL_IS_CONFIRM_PUBLISHING$1] = false;
	});
}
function subscribeConsume() {
	const channel = diagnosticsChannel.tracingChannel(CHANNELS.AMQPLIB_CONSUME);
	channel.start.subscribe(NOOP$3);
	channel.asyncEnd.subscribe((message) => {
		const data = message;
		const consumerChannel = data.self;
		const consumerTag = data.result?.consumerTag;
		if (!consumerChannel || !consumerTag) return;
		ensureChannelState(consumerChannel);
		const queueArg = data.arguments[0];
		const queue = typeof queueArg === "string" ? queueArg : "<unknown>";
		const options = data.arguments[2];
		consumerChannel[CHANNEL_CONSUMER_INFO]?.set(consumerTag, {
			noAck: !!options?.noAck,
			queue
		});
	});
}
function subscribeDispatch() {
	bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(CHANNELS.AMQPLIB_DISPATCH), (data) => {
		const channel = data.self;
		const fields = data.arguments[0];
		const msg = data.arguments[1];
		if (!channel || !msg) return;
		ensureChannelState(channel);
		const info = fields?.consumerTag ? channel[CHANNEL_CONSUMER_INFO]?.get(fields.consumerTag) : void 0;
		const queue = info?.queue ?? msg.fields?.routingKey ?? "<unknown>";
		const noAck = info?.noAck ?? false;
		const headers = msg.properties?.headers;
		const sentryTrace = getHeaderAsString$2(headers, "sentry-trace");
		const baggage = getHeaderAsString$2(headers, "baggage");
		const span = continueTrace$1({
			sentryTrace,
			baggage
		}, () => startConsumeSpan$1(queue, msg, channel));
		if (!noAck) {
			channel[CHANNEL_SPANS_NOT_ENDED$1]?.push({
				msg,
				timeOfConsume: timestampInSeconds()
			});
			msg[MESSAGE_STORED_SPAN$1] = span;
		}
		data._sentryNoAck = noAck;
		return span;
	}, { deferSpanEnd({ data }) {
		return !data._sentryNoAck;
	} });
}
function subscribeSettle() {
	diagnosticsChannel.tracingChannel(CHANNELS.AMQPLIB_ACK).start.subscribe((message) => handleAck(message, false, END_OP.Ack));
	diagnosticsChannel.tracingChannel(CHANNELS.AMQPLIB_NACK).start.subscribe((message) => handleAck(message, true, END_OP.Nack));
	diagnosticsChannel.tracingChannel(CHANNELS.AMQPLIB_REJECT).start.subscribe((message) => handleAck(message, true, END_OP.Reject));
	diagnosticsChannel.tracingChannel(CHANNELS.AMQPLIB_ACK_ALL).start.subscribe((message) => {
		const data = message;
		if (data.self) endAllSpansOnChannel$1(data.self, false, END_OP.AckAll, void 0);
	});
	diagnosticsChannel.tracingChannel(CHANNELS.AMQPLIB_NACK_ALL).start.subscribe((message) => {
		const data = message;
		if (data.self) endAllSpansOnChannel$1(data.self, true, END_OP.NackAll, data.arguments[0]);
	});
}
function subscribeConnect$1() {
	const channel = diagnosticsChannel.tracingChannel(CHANNELS.AMQPLIB_CONNECT);
	channel.start.subscribe(NOOP$3);
	channel.asyncEnd.subscribe((message) => {
		const data = message;
		const conn = data.result;
		if (!conn || typeof conn !== "object") return;
		conn[CONNECTION_ATTRIBUTES$1] = {
			...getConnectionAttributesFromUrl$1(data.arguments?.[0]),
			...getConnectionAttributesFromServer$1(conn)
		};
	});
}
function handleAck(data, isRejected, endOperation) {
	const channel = data.self;
	if (!channel) return;
	const message = data.arguments[0];
	if (!message) return;
	const allUpToOrRequeue = data.arguments[1];
	const requeue = data.arguments[2];
	const requeueResolved = endOperation === END_OP.Reject ? allUpToOrRequeue : requeue;
	const spansNotEnded = channel[CHANNEL_SPANS_NOT_ENDED$1] ?? [];
	const msgIndex = spansNotEnded.findIndex((msgDetails) => msgDetails.msg === message);
	if (msgIndex < 0) endConsumerSpan$1(message, isRejected, endOperation, requeueResolved);
	else if (endOperation !== END_OP.Reject && allUpToOrRequeue) {
		for (let i = 0; i <= msgIndex; i++) endConsumerSpan$1(spansNotEnded[i].msg, isRejected, endOperation, requeueResolved);
		spansNotEnded.splice(0, msgIndex + 1);
	} else {
		endConsumerSpan$1(message, isRejected, endOperation, requeueResolved);
		spansNotEnded.splice(msgIndex, 1);
	}
}
function ensureChannelState(channel) {
	if (Object.prototype.hasOwnProperty.call(channel, CHANNEL_SPANS_NOT_ENDED$1)) return;
	channel[CHANNEL_SPANS_NOT_ENDED$1] = [];
	channel[CHANNEL_CONSUMER_INFO] = /* @__PURE__ */ new Map();
	const timer = setInterval(() => checkConsumeTimeoutOnChannel$1(channel), CONSUME_TIMEOUT_MS$1);
	timer.unref?.();
	channel[CHANNEL_CONSUME_TIMEOUT_TIMER$1] = timer;
	if (typeof channel.on === "function") {
		channel.on("close", () => {
			endAllSpansOnChannel$1(channel, true, END_OP.ChannelClosed, void 0);
			clearConsumeTimeoutTimer(channel);
		});
		channel.on("error", () => {
			endAllSpansOnChannel$1(channel, true, END_OP.ChannelError, void 0);
			clearConsumeTimeoutTimer(channel);
		});
	}
}
function clearConsumeTimeoutTimer(channel) {
	const activeTimer = channel[CHANNEL_CONSUME_TIMEOUT_TIMER$1];
	if (activeTimer) {
		clearInterval(activeTimer);
		channel[CHANNEL_CONSUME_TIMEOUT_TIMER$1] = void 0;
	}
}
function checkConsumeTimeoutOnChannel$1(channel) {
	const currentTime = timestampInSeconds();
	const spansNotEnded = channel[CHANNEL_SPANS_NOT_ENDED$1] ?? [];
	let i;
	for (i = 0; i < spansNotEnded.length; i++) {
		const currMessage = spansNotEnded[i];
		if ((currentTime - currMessage.timeOfConsume) * 1e3 < CONSUME_TIMEOUT_MS$1) break;
		endConsumerSpan$1(currMessage.msg, null, END_OP.InstrumentationTimeout, true);
	}
	spansNotEnded.splice(0, i);
}
function endAllSpansOnChannel$1(channel, isRejected, operation, requeue) {
	(channel[CHANNEL_SPANS_NOT_ENDED$1] ?? []).forEach((msgDetails) => {
		endConsumerSpan$1(msgDetails.msg, isRejected, operation, requeue);
	});
	channel[CHANNEL_SPANS_NOT_ENDED$1] = [];
}
function endConsumerSpan$1(message, isRejected, operation, requeue) {
	const storedSpan = message[MESSAGE_STORED_SPAN$1];
	if (!storedSpan) return;
	if (isRejected !== false) storedSpan.setStatus({
		code: 2,
		message: operation !== END_OP.ChannelClosed && operation !== END_OP.ChannelError ? `${operation} called on message${requeue === true ? " with requeue" : requeue === false ? " without requeue" : ""}` : operation
	});
	storedSpan.end();
	message[MESSAGE_STORED_SPAN$1] = void 0;
}
function startPublishSpan$1(data) {
	const exchangeArg = data.arguments[0];
	const routingKeyArg = data.arguments[1];
	const exchange = typeof exchangeArg === "string" ? exchangeArg : "";
	const routingKey = typeof routingKeyArg === "string" ? routingKeyArg : "";
	let options = data.arguments[3];
	const span = startInactiveSpan$1({
		name: `publish ${normalizeExchange$1(exchange)}`,
		op: "message",
		kind: SPAN_KIND.PRODUCER,
		attributes: {
			...getStoredConnectionAttributes(data.self),
			[ATTR_MESSAGING_DESTINATION$1]: exchange,
			[Wo]: exchange,
			[ATTR_MESSAGING_DESTINATION_KIND$2]: MESSAGING_DESTINATION_KIND_VALUE_TOPIC$2,
			[ATTR_MESSAGING_RABBITMQ_ROUTING_KEY$1]: routingKey,
			[ATTR_MESSAGING_RABBITMQ_DESTINATION_ROUTING_KEY]: routingKey,
			[Xo]: MESSAGING_OPERATION_VALUE_SEND,
			[ATTR_MESSAGING_MESSAGE_ID]: options?.messageId,
			[zo]: options?.messageId,
			[ATTR_MESSAGING_CONVERSATION_ID_LEGACY]: options?.correlationId,
			[ATTR_MESSAGING_CONVERSATION_ID$1]: options?.correlationId,
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: PUBLISHER_ORIGIN$1
		}
	});
	if (!options || typeof options !== "object") {
		options = {};
		data.arguments[3] = options;
	}
	const headers = options.headers && typeof options.headers === "object" ? options.headers : options.headers = {};
	const traceData = getTraceData$1({ span });
	if (traceData["sentry-trace"]) headers["sentry-trace"] = traceData["sentry-trace"];
	if (traceData.baggage) headers["baggage"] = traceData.baggage;
	return span;
}
function startConsumeSpan$1(queue, msg, channel) {
	return startInactiveSpan$1({
		name: `${queue} process`,
		op: "message",
		kind: SPAN_KIND.CONSUMER,
		attributes: {
			...getStoredConnectionAttributes(channel),
			[ATTR_MESSAGING_DESTINATION$1]: msg.fields?.exchange,
			[Wo]: msg.fields?.exchange,
			[ATTR_MESSAGING_DESTINATION_KIND$2]: MESSAGING_DESTINATION_KIND_VALUE_TOPIC$2,
			[ATTR_MESSAGING_RABBITMQ_ROUTING_KEY$1]: msg.fields?.routingKey,
			[ATTR_MESSAGING_RABBITMQ_DESTINATION_ROUTING_KEY]: msg.fields?.routingKey,
			[ATTR_MESSAGING_OPERATION$1]: MESSAGING_OPERATION_VALUE_PROCESS$1,
			[Xo]: MESSAGING_OPERATION_VALUE_PROCESS$1,
			[ATTR_MESSAGING_MESSAGE_ID]: msg.properties?.messageId,
			[zo]: msg.properties?.messageId,
			[ATTR_MESSAGING_CONVERSATION_ID_LEGACY]: msg.properties?.correlationId,
			[ATTR_MESSAGING_CONVERSATION_ID$1]: msg.properties?.correlationId,
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: CONSUMER_ORIGIN$2
		}
	});
}
function getStoredConnectionAttributes(channel) {
	const connection = channel?.connection;
	const stored = connection?.[CONNECTION_ATTRIBUTES$1];
	if (stored) return stored;
	const product = connection?.serverProperties?.product ?? connection?.connection?.serverProperties?.product;
	if (typeof product === "string" && product) return { [Zo]: product.toLowerCase() };
	return {};
}
function getConnectionAttributesFromServer$1(conn) {
	const product = conn.serverProperties?.product ?? conn.connection?.serverProperties?.product;
	if (typeof product === "string" && product) return { [Zo]: product.toLowerCase() };
	return {};
}
function getConnectionAttributesFromUrl$1(url) {
	const attributes = {
		[ATTR_MESSAGING_PROTOCOL_VERSION_LEGACY]: "0.9.1",
		[_l]: "0.9.1"
	};
	const resolvedUrl = url || "amqp://localhost";
	if (typeof resolvedUrl === "object") {
		const connectOptions = resolvedUrl;
		const protocol = getProtocol$1(connectOptions.protocol);
		const hostname = getHostname$1(connectOptions.hostname);
		const port = getPort$1(connectOptions.port, protocol);
		attributes[ATTR_MESSAGING_PROTOCOL$1] = protocol;
		attributes[yl] = protocol;
		attributes[au] = hostname;
		attributes[ou] = port;
		attributes[Il] = hostname;
		attributes[Ol] = port;
	} else if (typeof resolvedUrl === "string") {
		const censoredUrl = censorPassword$1(resolvedUrl);
		attributes[ATTR_MESSAGING_URL$1] = censoredUrl;
		attributes[Yu] = censoredUrl;
		try {
			const urlParts = new URL(censoredUrl);
			const protocol = getProtocol$1(urlParts.protocol);
			const hostname = getHostname$1(urlParts.hostname);
			const port = getPort$1(urlParts.port ? parseInt(urlParts.port, 10) : void 0, protocol);
			attributes[ATTR_MESSAGING_PROTOCOL$1] = protocol;
			attributes[yl] = protocol;
			attributes[au] = hostname;
			attributes[ou] = port;
			attributes[Il] = hostname;
			attributes[Ol] = port;
		} catch {}
	}
	return attributes;
}
function normalizeExchange$1(exchangeName) {
	return exchangeName !== "" ? exchangeName : "<default>";
}
function censorPassword$1(url) {
	return url.replace(/:[^:@/]*@/, ":***@");
}
function getPort$1(portFromUrl, resolvedProtocol) {
	return portFromUrl || (resolvedProtocol === "AMQP" ? 5672 : 5671);
}
function getProtocol$1(protocolFromUrl) {
	const resolvedProtocol = protocolFromUrl || "amqp";
	return (resolvedProtocol.endsWith(":") ? resolvedProtocol.substring(0, resolvedProtocol.length - 1) : resolvedProtocol).toUpperCase();
}
function getHostname$1(hostnameFromUrl) {
	return hostnameFromUrl || "localhost";
}
function getHeaderAsString$2(headers, key) {
	const value = headers?.[key];
	if (value == null) return;
	return Array.isArray(value) ? String(value[0]) : String(value);
}
var amqplibChannelIntegration = defineIntegration(_amqplibChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/anthropic.js
var INTEGRATION_NAME$31 = "Anthropic_AI";
var ORIGIN$16 = "auto.ai.orchestrion.anthropic";
var INSTRUMENTED_CHANNELS$2 = [
	{
		channel: CHANNELS.ANTHROPIC_CHAT,
		operation: "chat",
		methodPath: "messages.create",
		stream: "async-iterable"
	},
	{
		channel: CHANNELS.ANTHROPIC_MODELS,
		operation: "models",
		methodPath: "models.retrieve",
		stream: "none"
	},
	{
		channel: CHANNELS.ANTHROPIC_MESSAGES_STREAM,
		operation: "chat",
		methodPath: "messages.stream",
		stream: "message-stream"
	}
];
var subscribed$6 = false;
var _anthropicChannelIntegration = ((options = {}) => {
	return {
		name: INTEGRATION_NAME$31,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel || subscribed$6) return;
			subscribed$6 = true;
			waitForTracingChannelBinding(() => {
				for (const { channel, operation, methodPath, stream } of INSTRUMENTED_CHANNELS$2) {
					DEBUG_BUILD && debug$3.log(`[orchestrion:anthropic] subscribing to channel "${channel}"`);
					bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(channel), (data) => createGenAiSpan$2(data, operation, methodPath, options), {
						beforeSpanEnd: (span, data) => {
							addResponseAttributes(span, data.result, resolveAIRecordingOptions(options).recordOutputs);
						},
						deferSpanEnd: ({ span, data }) => wrapStreamResult$2(span, data, stream, options)
					});
				}
			});
		}
	};
});
function createGenAiSpan$2(data, operation, methodPath, options) {
	const args = data.arguments ?? [];
	if (_INTERNAL_shouldSkipAiProviderWrapping(INTEGRATION_NAME$31)) return;
	if (args[1]?.headers?.["X-Stainless-Helper-Method"] === "stream") return;
	const params = typeof args[0] === "object" && args[0] !== null ? args[0] : void 0;
	const { recordInputs } = resolveAIRecordingOptions(options);
	const enableTruncation = shouldEnableTruncation(options.enableTruncation);
	const attributes = extractRequestAttributes(args, methodPath, operation);
	const model = attributes["gen_ai.request.model"] || "unknown";
	attributes[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN] = ORIGIN$16;
	const span = startInactiveSpan$1({
		name: `${operation} ${model}`,
		op: `gen_ai.${operation}`,
		attributes
	});
	if (recordInputs && params) addPrivateRequestAttributes(span, params, enableTruncation);
	return span;
}
function isAsyncIterable$2(value) {
	return !!value && typeof value[Symbol.asyncIterator] === "function";
}
function isMessageStream(value) {
	return !!value && typeof value.on === "function";
}
function wrapStreamResult$2(span, data, stream, options) {
	const { recordOutputs } = resolveAIRecordingOptions(options);
	const result = data.result;
	if (stream === "async-iterable" && isAsyncIterable$2(result)) {
		const iterate = result[Symbol.asyncIterator].bind(result);
		const instrumented = instrumentAsyncIterableStream({ [Symbol.asyncIterator]: iterate }, span, recordOutputs);
		result[Symbol.asyncIterator] = () => instrumented;
		return true;
	}
	if (stream === "message-stream" && isMessageStream(result)) {
		instrumentMessageStream(result, span, recordOutputs);
		return true;
	}
	return false;
}
var anthropicChannelIntegration = defineIntegration(_anthropicChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/aws-sdk/constants.js
var AWS_SDK_ORIGIN = "auto.aws.orchestrion.aws_sdk";
var DB_SYSTEM_VALUE_DYNAMODB = "dynamodb";
var ATTR_MESSAGING_DESTINATION_KIND$1 = "messaging.destination_kind";
var MESSAGING_DESTINATION_KIND_VALUE_TOPIC$1 = "topic";
var GEN_AI_OPERATION_NAME_VALUE_CHAT = "chat";
var GEN_AI_SYSTEM_VALUE_AWS_BEDROCK = "aws.bedrock";
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/aws-sdk/services/bedrock-runtime.js
var textDecoder = new TextDecoder();
var BedrockRuntimeServiceExtension = class {
	requestPreSpanHook(request) {
		switch (request.commandName) {
			case "Converse": return this._requestPreSpanHookConverse(request, false);
			case "ConverseStream": return this._requestPreSpanHookConverse(request, true);
			case "InvokeModel": return this._requestPreSpanHookInvokeModel(request, false);
			case "InvokeModelWithResponseStream": return this._requestPreSpanHookInvokeModel(request, true);
		}
		return {};
	}
	responseHook(response, span) {
		const commandName = response.request.commandName;
		if (!span.isRecording()) {
			if (commandName === "ConverseStream" || commandName === "InvokeModelWithResponseStream") span.end();
			return;
		}
		switch (commandName) {
			case "Converse": return this._responseHookConverse(response, span);
			case "ConverseStream": return this._responseHookConverseStream(response, span);
			case "InvokeModel": return this._responseHookInvokeModel(response, span);
			case "InvokeModelWithResponseStream": return this._responseHookInvokeModelWithResponseStream(response, span);
		}
	}
	_requestPreSpanHookConverse(request, isStream) {
		let spanName = GEN_AI_OPERATION_NAME_VALUE_CHAT;
		const spanAttributes = {
			[ma]: GEN_AI_SYSTEM_VALUE_AWS_BEDROCK,
			[Vr]: GEN_AI_OPERATION_NAME_VALUE_CHAT
		};
		const modelId = request.commandInput.modelId;
		if (modelId) {
			spanAttributes[Zr] = modelId;
			if (spanName) spanName += ` ${modelId}`;
		}
		const inferenceConfig = request.commandInput.inferenceConfig;
		if (inferenceConfig) {
			const { maxTokens, temperature, topP, stopSequences } = inferenceConfig;
			if (maxTokens !== void 0) spanAttributes[Xr] = maxTokens;
			if (temperature !== void 0) spanAttributes[na] = temperature;
			if (topP !== void 0) spanAttributes[aa] = topP;
			if (stopSequences !== void 0) spanAttributes[ta] = stopSequences;
		}
		return {
			spanName,
			isStream,
			spanAttributes
		};
	}
	_requestPreSpanHookInvokeModel(request, isStream) {
		const spanAttributes = { [ma]: GEN_AI_SYSTEM_VALUE_AWS_BEDROCK };
		const modelId = request.commandInput?.modelId;
		if (modelId) spanAttributes[Zr] = modelId;
		if (request.commandInput?.body) {
			const requestBody = JSON.parse(request.commandInput.body);
			if (modelId.includes("amazon.titan")) {
				if (requestBody.textGenerationConfig?.temperature !== void 0) spanAttributes[na] = requestBody.textGenerationConfig.temperature;
				if (requestBody.textGenerationConfig?.topP !== void 0) spanAttributes[aa] = requestBody.textGenerationConfig.topP;
				if (requestBody.textGenerationConfig?.maxTokenCount !== void 0) spanAttributes[Xr] = requestBody.textGenerationConfig.maxTokenCount;
				if (requestBody.textGenerationConfig?.stopSequences !== void 0) spanAttributes[ta] = requestBody.textGenerationConfig.stopSequences;
			} else if (modelId.includes("amazon.nova")) {
				if (requestBody.inferenceConfig?.temperature !== void 0) spanAttributes[na] = requestBody.inferenceConfig.temperature;
				if (requestBody.inferenceConfig?.top_p !== void 0) spanAttributes[aa] = requestBody.inferenceConfig.top_p;
				if (requestBody.inferenceConfig?.max_new_tokens !== void 0) spanAttributes[Xr] = requestBody.inferenceConfig.max_new_tokens;
				if (requestBody.inferenceConfig?.stopSequences !== void 0) spanAttributes[ta] = requestBody.inferenceConfig.stopSequences;
			} else if (modelId.includes("anthropic.claude")) {
				if (requestBody.max_tokens !== void 0) spanAttributes[Xr] = requestBody.max_tokens;
				if (requestBody.temperature !== void 0) spanAttributes[na] = requestBody.temperature;
				if (requestBody.top_p !== void 0) spanAttributes[aa] = requestBody.top_p;
				if (requestBody.stop_sequences !== void 0) spanAttributes[ta] = requestBody.stop_sequences;
			} else if (modelId.includes("meta.llama")) {
				if (requestBody.max_gen_len !== void 0) spanAttributes[Xr] = requestBody.max_gen_len;
				if (requestBody.temperature !== void 0) spanAttributes[na] = requestBody.temperature;
				if (requestBody.top_p !== void 0) spanAttributes[aa] = requestBody.top_p;
			} else if (modelId.includes("cohere.command-r")) {
				if (requestBody.max_tokens !== void 0) spanAttributes[Xr] = requestBody.max_tokens;
				if (requestBody.temperature !== void 0) spanAttributes[na] = requestBody.temperature;
				if (requestBody.p !== void 0) spanAttributes[aa] = requestBody.p;
				if (requestBody.message !== void 0) spanAttributes[Ra] = Math.ceil(requestBody.message.length / 6);
				if (requestBody.stop_sequences !== void 0) spanAttributes[ta] = requestBody.stop_sequences;
			} else if (modelId.includes("cohere.command")) {
				if (requestBody.max_tokens !== void 0) spanAttributes[Xr] = requestBody.max_tokens;
				if (requestBody.temperature !== void 0) spanAttributes[na] = requestBody.temperature;
				if (requestBody.p !== void 0) spanAttributes[aa] = requestBody.p;
				if (requestBody.prompt !== void 0) spanAttributes[Ra] = Math.ceil(requestBody.prompt.length / 6);
				if (requestBody.stop_sequences !== void 0) spanAttributes[ta] = requestBody.stop_sequences;
			} else if (modelId.includes("mistral")) {
				if (requestBody.prompt !== void 0) spanAttributes[Ra] = Math.ceil(requestBody.prompt.length / 6);
				if (requestBody.max_tokens !== void 0) spanAttributes[Xr] = requestBody.max_tokens;
				if (requestBody.temperature !== void 0) spanAttributes[na] = requestBody.temperature;
				if (requestBody.top_p !== void 0) spanAttributes[aa] = requestBody.top_p;
				if (requestBody.stop !== void 0) spanAttributes[ta] = requestBody.stop;
			}
		}
		return {
			isStream,
			spanAttributes
		};
	}
	_responseHookConverse(response, span) {
		const { stopReason, usage } = response.data;
		setStopReason(span, stopReason);
		setUsage(span, usage);
	}
	_responseHookConverseStream(response, span) {
		response.data.stream = wrapConverseStreamResponse(response.data.stream, span);
	}
	_responseHookInvokeModel(response, span) {
		const currentModelId = response.request.commandInput?.modelId;
		if (response.data?.body) {
			const decodedResponseBody = textDecoder.decode(response.data.body);
			const responseBody = JSON.parse(decodedResponseBody);
			if (currentModelId.includes("amazon.titan")) {
				if (responseBody.inputTextTokenCount !== void 0) span.setAttribute(Ra, responseBody.inputTextTokenCount);
				if (responseBody.results?.[0]?.tokenCount !== void 0) span.setAttribute(Pa, responseBody.results[0].tokenCount);
				if (responseBody.results?.[0]?.completionReason !== void 0) span.setAttribute(sa, [responseBody.results[0].completionReason]);
			} else if (currentModelId.includes("amazon.nova")) {
				if (responseBody.usage !== void 0) {
					if (responseBody.usage.inputTokens !== void 0) span.setAttribute(Ra, responseBody.usage.inputTokens);
					if (responseBody.usage.outputTokens !== void 0) span.setAttribute(Pa, responseBody.usage.outputTokens);
				}
				if (responseBody.stopReason !== void 0) span.setAttribute(sa, [responseBody.stopReason]);
			} else if (currentModelId.includes("anthropic.claude")) {
				if (responseBody.usage?.input_tokens !== void 0) span.setAttribute(Ra, responseBody.usage.input_tokens);
				if (responseBody.usage?.output_tokens !== void 0) span.setAttribute(Pa, responseBody.usage.output_tokens);
				if (responseBody.stop_reason !== void 0) span.setAttribute(sa, [responseBody.stop_reason]);
			} else if (currentModelId.includes("meta.llama")) {
				if (responseBody.prompt_token_count !== void 0) span.setAttribute(Ra, responseBody.prompt_token_count);
				if (responseBody.generation_token_count !== void 0) span.setAttribute(Pa, responseBody.generation_token_count);
				if (responseBody.stop_reason !== void 0) span.setAttribute(sa, [responseBody.stop_reason]);
			} else if (currentModelId.includes("cohere.command-r")) {
				if (responseBody.text !== void 0) span.setAttribute(Pa, Math.ceil(responseBody.text.length / 6));
				if (responseBody.finish_reason !== void 0) span.setAttribute(sa, [responseBody.finish_reason]);
			} else if (currentModelId.includes("cohere.command")) {
				if (responseBody.generations?.[0]?.text !== void 0) span.setAttribute(Pa, Math.ceil(responseBody.generations[0].text.length / 6));
				if (responseBody.generations?.[0]?.finish_reason !== void 0) span.setAttribute(sa, [responseBody.generations[0].finish_reason]);
			} else if (currentModelId.includes("mistral")) {
				if (responseBody.outputs?.[0]?.text !== void 0) span.setAttribute(Pa, Math.ceil(responseBody.outputs[0].text.length / 6));
				if (responseBody.outputs?.[0]?.stop_reason !== void 0) span.setAttribute(sa, [responseBody.outputs[0].stop_reason]);
			}
		}
	}
	_responseHookInvokeModelWithResponseStream(response, span) {
		const stream = response.data?.body;
		const modelId = response.request.commandInput?.modelId;
		if (!stream || !modelId) return;
		const recordAttributes = resolveStreamRecorder(modelId);
		response.data.body = (async function* () {
			try {
				for await (const chunk of stream) {
					if (recordAttributes) {
						const parsedChunk = parseChunk(chunk?.chunk?.bytes);
						if (parsedChunk) recordAttributes(parsedChunk, span);
					}
					yield chunk;
				}
			} finally {
				span.end();
			}
		})();
	}
};
function resolveStreamRecorder(modelId) {
	if (modelId.includes("amazon.titan")) return recordTitanAttributes;
	if (modelId.includes("anthropic.claude")) return recordClaudeAttributes;
	if (modelId.includes("amazon.nova")) return recordNovaAttributes;
	if (modelId.includes("meta.llama")) return recordLlamaAttributes;
	if (modelId.includes("cohere.command-r")) return recordCohereRAttributes;
	if (modelId.includes("cohere.command")) return recordCohereAttributes;
	if (modelId.includes("mistral")) return recordMistralAttributes;
}
async function* wrapConverseStreamResponse(stream, span) {
	try {
		let usage;
		for await (const item of stream) {
			setStopReason(span, item.messageStop?.stopReason);
			usage = item.metadata?.usage;
			yield item;
		}
		setUsage(span, usage);
	} finally {
		span.end();
	}
}
function setStopReason(span, stopReason) {
	if (stopReason !== void 0) span.setAttribute(sa, [stopReason]);
}
function setUsage(span, usage) {
	if (usage) {
		const { inputTokens, outputTokens } = usage;
		if (inputTokens !== void 0) span.setAttribute(Ra, inputTokens);
		if (outputTokens !== void 0) span.setAttribute(Pa, outputTokens);
	}
}
function parseChunk(bytes) {
	if (!bytes || !(bytes instanceof Uint8Array)) return null;
	try {
		const str = Buffer.from(bytes).toString("utf-8");
		return JSON.parse(str);
	} catch (err) {
		DEBUG_BUILD && debug$3.warn("[orchestrion:aws-sdk] failed to parse streamed bedrock chunk", err);
		return null;
	}
}
function recordNovaAttributes(parsedChunk, span) {
	if (parsedChunk.metadata?.usage !== void 0) {
		if (parsedChunk.metadata?.usage.inputTokens !== void 0) span.setAttribute(Ra, parsedChunk.metadata.usage.inputTokens);
		if (parsedChunk.metadata?.usage.outputTokens !== void 0) span.setAttribute(Pa, parsedChunk.metadata.usage.outputTokens);
	}
	if (parsedChunk.messageStop?.stopReason !== void 0) span.setAttribute(sa, [parsedChunk.messageStop.stopReason]);
}
function recordClaudeAttributes(parsedChunk, span) {
	if (parsedChunk.message?.usage?.input_tokens !== void 0) span.setAttribute(Ra, parsedChunk.message.usage.input_tokens);
	if (parsedChunk.message?.usage?.output_tokens !== void 0) span.setAttribute(Pa, parsedChunk.message.usage.output_tokens);
	if (parsedChunk.delta?.stop_reason !== void 0) span.setAttribute(sa, [parsedChunk.delta.stop_reason]);
}
function recordTitanAttributes(parsedChunk, span) {
	if (parsedChunk.inputTextTokenCount !== void 0) span.setAttribute(Ra, parsedChunk.inputTextTokenCount);
	if (parsedChunk.totalOutputTextTokenCount !== void 0) span.setAttribute(Pa, parsedChunk.totalOutputTextTokenCount);
	if (parsedChunk.completionReason !== void 0) span.setAttribute(sa, [parsedChunk.completionReason]);
}
function recordLlamaAttributes(parsedChunk, span) {
	if (parsedChunk.prompt_token_count !== void 0) span.setAttribute(Ra, parsedChunk.prompt_token_count);
	if (parsedChunk.generation_token_count !== void 0) span.setAttribute(Pa, parsedChunk.generation_token_count);
	if (parsedChunk.stop_reason !== void 0) span.setAttribute(sa, [parsedChunk.stop_reason]);
}
function recordMistralAttributes(parsedChunk, span) {
	if (parsedChunk.outputs?.[0]?.text !== void 0) span.setAttribute(Pa, Math.ceil(parsedChunk.outputs[0].text.length / 6));
	if (parsedChunk.outputs?.[0]?.stop_reason !== void 0) span.setAttribute(sa, [parsedChunk.outputs[0].stop_reason]);
}
function recordCohereAttributes(parsedChunk, span) {
	if (parsedChunk.generations?.[0]?.text !== void 0) span.setAttribute(Pa, Math.ceil(parsedChunk.generations[0].text.length / 6));
	if (parsedChunk.generations?.[0]?.finish_reason !== void 0) span.setAttribute(sa, [parsedChunk.generations[0].finish_reason]);
}
function recordCohereRAttributes(parsedChunk, span) {
	if (parsedChunk.text !== void 0) span.setAttribute(Pa, Math.ceil(parsedChunk.text.length / 6));
	if (parsedChunk.finish_reason !== void 0) span.setAttribute(sa, [parsedChunk.finish_reason]);
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/aws-sdk/services/dynamodb.js
function toArray(values) {
	return Array.isArray(values) ? values : [values];
}
var DynamodbServiceExtension = class {
	requestPreSpanHook(normalizedRequest) {
		const operation = normalizedRequest.commandName;
		const tableName = normalizedRequest.commandInput?.TableName;
		const spanAttributes = {};
		spanAttributes[Kt] = DB_SYSTEM_VALUE_DYNAMODB;
		spanAttributes[Nt] = tableName;
		spanAttributes[Pt] = operation;
		if (normalizedRequest.commandInput?.TableName) spanAttributes[Ge] = [normalizedRequest.commandInput.TableName];
		else if (normalizedRequest.commandInput?.RequestItems) spanAttributes[Ge] = Object.keys(normalizedRequest.commandInput.RequestItems);
		if (operation === "CreateTable" || operation === "UpdateTable") {
			if (normalizedRequest.commandInput?.ProvisionedThroughput) {
				spanAttributes[Ce] = normalizedRequest.commandInput.ProvisionedThroughput.ReadCapacityUnits;
				spanAttributes[Pe] = normalizedRequest.commandInput.ProvisionedThroughput.WriteCapacityUnits;
			}
		}
		if (operation === "GetItem" || operation === "Scan" || operation === "Query") {
			if (normalizedRequest.commandInput?.ConsistentRead) spanAttributes[Se] = normalizedRequest.commandInput.ConsistentRead;
		}
		if (operation === "Query" || operation === "Scan") {
			if (normalizedRequest.commandInput?.ProjectionExpression) spanAttributes[Ne] = normalizedRequest.commandInput.ProjectionExpression;
		}
		if (operation === "CreateTable") {
			if (normalizedRequest.commandInput?.GlobalSecondaryIndexes) spanAttributes[Oe] = toArray(normalizedRequest.commandInput.GlobalSecondaryIndexes).map((x) => JSON.stringify(x));
			if (normalizedRequest.commandInput?.LocalSecondaryIndexes) spanAttributes[Re] = toArray(normalizedRequest.commandInput.LocalSecondaryIndexes).map((x) => JSON.stringify(x));
		}
		if (operation === "ListTables" || operation === "Query" || operation === "Scan") {
			if (normalizedRequest.commandInput?.Limit) spanAttributes[we] = normalizedRequest.commandInput.Limit;
		}
		if (operation === "ListTables") {
			if (normalizedRequest.commandInput?.ExclusiveStartTableName) spanAttributes[Ie] = normalizedRequest.commandInput.ExclusiveStartTableName;
		}
		if (operation === "Query") {
			if (normalizedRequest.commandInput?.ScanIndexForward) spanAttributes[Le] = normalizedRequest.commandInput.ScanIndexForward;
			if (normalizedRequest.commandInput?.IndexName) spanAttributes[Ae] = normalizedRequest.commandInput.IndexName;
			if (normalizedRequest.commandInput?.Select) spanAttributes[Me] = normalizedRequest.commandInput.Select;
		}
		if (operation === "Scan") {
			if (normalizedRequest.commandInput?.Segment) spanAttributes[Ue] = normalizedRequest.commandInput?.Segment;
			if (normalizedRequest.commandInput?.TotalSegments) spanAttributes[Ye] = normalizedRequest.commandInput?.TotalSegments;
			if (normalizedRequest.commandInput?.IndexName) spanAttributes[Ae] = normalizedRequest.commandInput.IndexName;
			if (normalizedRequest.commandInput?.Select) spanAttributes[Me] = normalizedRequest.commandInput.Select;
		}
		if (operation === "UpdateTable") {
			if (normalizedRequest.commandInput?.AttributeDefinitions) spanAttributes[fe] = toArray(normalizedRequest.commandInput.AttributeDefinitions).map((x) => JSON.stringify(x));
			if (normalizedRequest.commandInput?.GlobalSecondaryIndexUpdates) spanAttributes[ke] = toArray(normalizedRequest.commandInput.GlobalSecondaryIndexUpdates).map((x) => JSON.stringify(x));
		}
		return {
			spanAttributes,
			spanKind: SPAN_KIND.CLIENT,
			spanOp: "db"
		};
	}
	responseHook(response, span) {
		if (response.data?.ConsumedCapacity) span.setAttribute(Ee, toArray(response.data.ConsumedCapacity).map((x) => JSON.stringify(x)));
		if (response.data?.ItemCollectionMetrics) span.setAttribute(xe, toArray(response.data.ItemCollectionMetrics).map((x) => JSON.stringify(x)));
		if (response.data?.TableNames) span.setAttribute(qe, response.data?.TableNames.length);
		if (response.data?.Count) span.setAttribute(Te, response.data?.Count);
		if (response.data?.ScannedCount) span.setAttribute(De, response.data?.ScannedCount);
	}
};
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/aws-sdk/services/kinesis.js
var KinesisServiceExtension = class {
	requestPreSpanHook(request) {
		const streamName = request.commandInput?.StreamName;
		const spanAttributes = {};
		if (streamName) spanAttributes[Fe] = streamName;
		return {
			spanAttributes,
			spanKind: SPAN_KIND.CLIENT
		};
	}
};
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/aws-sdk/services/lambda.js
var INVOKE_COMMAND = "Invoke";
var LambdaServiceExtension = class {
	requestPreSpanHook(request) {
		const functionName = request.commandInput?.FunctionName;
		const spanAttributes = {};
		let spanName;
		if (request.commandName === INVOKE_COMMAND) {
			spanAttributes[er] = functionName;
			spanAttributes[ir] = "aws";
			spanName = `${functionName} ${INVOKE_COMMAND}`;
		}
		return {
			spanAttributes,
			spanKind: SPAN_KIND.CLIENT,
			spanName
		};
	}
	requestPostSpanHook(request, span) {
		if (request.commandName === INVOKE_COMMAND && request.commandInput) request.commandInput.ClientContext = injectLambdaPropagationContext(request.commandInput.ClientContext, span);
	}
	responseHook(response, span) {
		if (response.request.commandName === INVOKE_COMMAND) {
			span.setAttribute(Xn, response.requestId);
			if (response.request.region) span.setAttribute(tr, response.request.region);
		}
	}
};
function injectLambdaPropagationContext(clientContext, span) {
	try {
		const propagatedContext = getTraceData$1({ span });
		const parsedClientContext = clientContext ? JSON.parse(Buffer.from(clientContext, "base64").toString("utf8")) : {};
		const updatedClientContext = {
			...parsedClientContext,
			custom: {
				...parsedClientContext.custom,
				...propagatedContext
			}
		};
		const encodedClientContext = Buffer.from(JSON.stringify(updatedClientContext)).toString("base64");
		if (encodedClientContext.length > 3583) {
			DEBUG_BUILD && debug$3.warn("[orchestrion:aws-sdk] cannot set trace propagation on lambda invoke parameters due to ClientContext length limitations.");
			return clientContext;
		}
		return encodedClientContext;
	} catch (e) {
		DEBUG_BUILD && debug$3.log("[orchestrion:aws-sdk] failed to set trace propagation on lambda ClientContext", e);
		return clientContext;
	}
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/aws-sdk/services/s3.js
var S3ServiceExtension = class {
	requestPreSpanHook(request) {
		const bucketName = request.commandInput?.Bucket;
		const spanAttributes = {};
		if (bucketName) spanAttributes[ti] = bucketName;
		return {
			spanAttributes,
			spanKind: SPAN_KIND.CLIENT
		};
	}
};
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/aws-sdk/services/secretsmanager.js
var SecretsManagerServiceExtension = class {
	requestPreSpanHook(request) {
		const secretId = request.commandInput?.SecretId;
		const spanAttributes = {};
		if (typeof secretId === "string" && secretId.startsWith("arn:aws:secretsmanager:")) spanAttributes[ni] = secretId;
		return {
			spanAttributes,
			spanKind: SPAN_KIND.CLIENT
		};
	}
	responseHook(response, span) {
		const secretArn = response.data?.ARN;
		if (secretArn) span.setAttribute(ni, secretArn);
	}
};
var SENTRY_TRACE_HEADER = "sentry-trace";
var BAGGAGE_HEADER = "baggage";
var PROPAGATION_FIELDS = [SENTRY_TRACE_HEADER, BAGGAGE_HEADER];
function injectPropagationContext(attributesMap, traceData) {
	const attributes = attributesMap ?? {};
	const headerKeys = Object.keys(traceData);
	if (Object.keys(attributes).length + headerKeys.length <= 10) for (const key of headerKeys) {
		const value = traceData[key];
		if (value) attributes[key] = {
			DataType: "String",
			StringValue: value
		};
	}
	else DEBUG_BUILD && debug$3.warn("[orchestrion:aws-sdk] cannot set trace propagation on SQS/SNS message due to maximum amount of MessageAttributes");
	return attributes;
}
function extractPropagationHeaders(message) {
	const carrier = message.MessageAttributes ?? {};
	const sentryTrace = carrier[SENTRY_TRACE_HEADER]?.StringValue ?? carrier[SENTRY_TRACE_HEADER]?.Value;
	if (!sentryTrace) return;
	return {
		sentryTrace,
		baggage: carrier[BAGGAGE_HEADER]?.StringValue ?? carrier[BAGGAGE_HEADER]?.Value
	};
}
function addPropagationFieldsToAttributeNames(messageAttributeNames = []) {
	return uniq([...messageAttributeNames, ...PROPAGATION_FIELDS]);
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/aws-sdk/services/sns.js
var SnsServiceExtension = class {
	requestPreSpanHook(request) {
		let spanKind = SPAN_KIND.CLIENT;
		let spanName = `SNS ${request.commandName}`;
		const spanAttributes = { [Zo]: "aws.sns" };
		if (request.commandName === "Publish") {
			spanKind = SPAN_KIND.PRODUCER;
			spanAttributes[ATTR_MESSAGING_DESTINATION_KIND$1] = MESSAGING_DESTINATION_KIND_VALUE_TOPIC$1;
			const { TopicArn, TargetArn, PhoneNumber } = request.commandInput;
			const destinationName = extractDestinationName(TopicArn, TargetArn, PhoneNumber);
			spanAttributes[Yo] = destinationName;
			spanAttributes[Wo] = TopicArn || TargetArn || PhoneNumber || "unknown";
			spanName = `${PhoneNumber ? "phone_number" : destinationName} send`;
		}
		const topicArn = request.commandInput?.TopicArn;
		if (topicArn) spanAttributes[ri] = topicArn;
		return {
			spanAttributes,
			spanKind,
			spanName
		};
	}
	requestPostSpanHook(request, span) {
		if (request.commandName === "Publish") {
			const origMessageAttributes = request.commandInput.MessageAttributes ?? {};
			request.commandInput.MessageAttributes = injectPropagationContext(origMessageAttributes, getTraceData$1({ span }));
		}
	}
	responseHook(response, span) {
		const topicArn = response.data?.TopicArn;
		if (topicArn) span.setAttribute(ri, topicArn);
	}
};
function extractDestinationName(topicArn, targetArn, phoneNumber) {
	if (topicArn || targetArn) {
		const arn = topicArn ?? targetArn;
		try {
			return arn.substring(arn.lastIndexOf(":") + 1);
		} catch {
			return arn;
		}
	} else if (phoneNumber) return phoneNumber;
	else return "unknown";
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/aws-sdk/services/sqs.js
var SqsServiceExtension = class {
	requestPreSpanHook(request) {
		const queueUrl = extractQueueUrl(request.commandInput);
		const queueName = extractQueueNameFromUrl(queueUrl);
		let spanKind = SPAN_KIND.CLIENT;
		let spanName;
		const spanAttributes = {
			[Zo]: "aws_sqs",
			[Wo]: queueName,
			[Yu]: queueUrl
		};
		switch (request.commandName) {
			case "ReceiveMessage":
				spanKind = SPAN_KIND.CONSUMER;
				spanName = `${queueName} receive`;
				spanAttributes[Xo] = "receive";
				request.commandInput.MessageAttributeNames = addPropagationFieldsToAttributeNames(request.commandInput.MessageAttributeNames);
				break;
			case "SendMessage":
			case "SendMessageBatch":
				spanKind = SPAN_KIND.PRODUCER;
				spanName = `${queueName} send`;
		}
		return {
			spanAttributes,
			spanKind,
			spanName
		};
	}
	requestPostSpanHook(request, span) {
		switch (request.commandName) {
			case "SendMessage":
				{
					const origMessageAttributes = request.commandInput.MessageAttributes ?? {};
					request.commandInput.MessageAttributes = injectPropagationContext(origMessageAttributes, getTraceData$1({ span }));
				}
				break;
			case "SendMessageBatch": {
				const entries = request.commandInput?.Entries;
				if (Array.isArray(entries)) {
					const traceData = getTraceData$1({ span });
					entries.forEach((messageParams) => {
						messageParams.MessageAttributes = injectPropagationContext(messageParams.MessageAttributes ?? {}, traceData);
					});
				}
			}
		}
	}
	responseHook(response, span) {
		switch (response.request.commandName) {
			case "SendMessage":
				span.setAttribute(zo, response?.data?.MessageId);
				break;
			case "SendMessageBatch": break;
			case "ReceiveMessage": {
				const messages = response?.data?.Messages || [];
				span.setAttribute(Go, messages.length);
				for (const message of messages) linkReceivedMessageToProducer(span, message);
				break;
			}
		}
	}
};
function linkReceivedMessageToProducer(span, message) {
	const headers = extractPropagationHeaders(message);
	if (!headers) return;
	const { parentSpanId, traceId, sampled } = propagationContextFromHeaders(headers.sentryTrace, headers.baggage);
	if (traceId && parentSpanId) span.addLink({
		context: {
			traceId,
			spanId: parentSpanId,
			traceFlags: sampled ? 1 : 0
		},
		attributes: { [zo]: message.MessageId }
	});
}
function extractQueueUrl(commandInput) {
	return commandInput?.QueueUrl;
}
function extractQueueNameFromUrl(queueUrl) {
	if (!queueUrl) return void 0;
	const segments = queueUrl.split("/");
	if (segments.length === 0) return void 0;
	return segments[segments.length - 1];
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/aws-sdk/services/stepfunctions.js
var StepFunctionsServiceExtension = class {
	requestPreSpanHook(request) {
		const stateMachineArn = request.commandInput?.stateMachineArn;
		const activityArn = request.commandInput?.activityArn;
		const spanAttributes = {};
		if (stateMachineArn) spanAttributes[si] = stateMachineArn;
		if (activityArn) spanAttributes[ai] = activityArn;
		return {
			spanAttributes,
			spanKind: SPAN_KIND.CLIENT
		};
	}
};
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/aws-sdk/services/ServicesExtensions.js
var ServicesExtensions = class {
	constructor() {
		this._services = /* @__PURE__ */ new Map([
			["SecretsManager", new SecretsManagerServiceExtension()],
			["SFN", new StepFunctionsServiceExtension()],
			["SQS", new SqsServiceExtension()],
			["SNS", new SnsServiceExtension()],
			["DynamoDB", new DynamodbServiceExtension()],
			["Lambda", new LambdaServiceExtension()],
			["S3", new S3ServiceExtension()],
			["Kinesis", new KinesisServiceExtension()],
			["BedrockRuntime", new BedrockRuntimeServiceExtension()]
		]);
	}
	requestPreSpanHook(request) {
		const serviceExtension = this._services.get(request.serviceName);
		if (!serviceExtension) return {};
		return serviceExtension.requestPreSpanHook(request);
	}
	requestPostSpanHook(request, span) {
		this._services.get(request.serviceName)?.requestPostSpanHook?.(request, span);
	}
	responseHook(response, span) {
		this._services.get(response.request.serviceName)?.responseHook?.(response, span);
	}
};
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/aws-sdk/utils.js
function removeSuffixFromStringIfExists(str, suffixToRemove) {
	const suffixLength = suffixToRemove.length;
	return str?.slice(-suffixLength) === suffixToRemove ? str.slice(0, -suffixLength) : str;
}
function normalizeV3Request(serviceName, commandNameWithSuffix, commandInput, region) {
	return {
		serviceName: serviceName?.replace(/\s+/g, ""),
		commandName: removeSuffixFromStringIfExists(commandNameWithSuffix, "Command"),
		commandInput,
		region
	};
}
function extractAttributesFromNormalizedRequest(normalizedRequest) {
	return {
		[Ip]: "aws-api",
		[Sp]: normalizedRequest.commandName,
		[Tp]: normalizedRequest.serviceName,
		[ct]: normalizedRequest.region
	};
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/aws-sdk/index.js
var INTEGRATION_NAME$30 = "Aws";
function safe$2(fn) {
	try {
		return fn();
	} catch (error) {
		DEBUG_BUILD && debug$3.warn("[orchestrion:aws-sdk] error building span", error);
		return;
	}
}
function setMetadataAttributes(span, metadata) {
	if (!metadata) return;
	if (metadata.requestId) span.setAttribute(ii, metadata.requestId);
	if (metadata.httpStatusCode) span.setAttribute(As, metadata.httpStatusCode);
	if (metadata.extendedRequestId) span.setAttribute($e, metadata.extendedRequestId);
}
var _awsChannelIntegration = (() => {
	const servicesExtensions = new ServicesExtensions();
	return {
		name: INTEGRATION_NAME$30,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			const getSpan = (data) => safe$2(() => {
				const command = data.arguments[0];
				const commandName = command?.constructor?.name;
				if (!command || !commandName) return;
				const clientConfig = data.self?.config;
				const serviceName = clientConfig?.serviceId ?? removeSuffixFromStringIfExists(data.self?.constructor?.name || "AWS", "Client");
				if (!command.input) command.input = {};
				const normalizedRequest = normalizeV3Request(serviceName, commandName, command.input, void 0);
				const requestMetadata = servicesExtensions.requestPreSpanHook(normalizedRequest);
				const span = startInactiveSpan$1({
					name: requestMetadata.spanName ?? `${normalizedRequest.serviceName}.${normalizedRequest.commandName}`,
					kind: requestMetadata.spanKind ?? SPAN_KIND.CLIENT,
					op: requestMetadata.spanOp || "rpc",
					attributes: {
						[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: AWS_SDK_ORIGIN,
						...extractAttributesFromNormalizedRequest(normalizedRequest),
						...requestMetadata.spanAttributes
					}
				});
				data._sentryNormalizedRequest = normalizedRequest;
				data._sentryRequestMetadata = requestMetadata;
				let regionResult;
				try {
					regionResult = clientConfig?.region?.();
				} catch {}
				const regionHolder = {
					settled: false,
					promise: Promise.resolve(regionResult).then((region) => {
						if (region) {
							normalizedRequest.region = region;
							span.setAttribute(ct, region);
						}
					}).catch(() => {}).finally(() => {
						regionHolder.settled = true;
					})
				};
				data._sentryRegion = regionHolder;
				safe$2(() => servicesExtensions.requestPostSpanHook(normalizedRequest, span));
				return span;
			});
			const opts = { deferSpanEnd({ span, data, end }) {
				const normalizedRequest = data._sentryNormalizedRequest;
				const requestMetadata = data._sentryRequestMetadata;
				if (!normalizedRequest) return false;
				const failed = "error" in data;
				safe$2(() => {
					if (failed) {
						const err = data.error;
						const errMetadata = err?.$metadata;
						setMetadataAttributes(span, {
							requestId: err?.RequestId ?? errMetadata?.requestId,
							httpStatusCode: errMetadata?.httpStatusCode,
							extendedRequestId: err?.extendedRequestId ?? errMetadata?.extendedRequestId
						});
						return;
					}
					const output = data.result;
					setMetadataAttributes(span, output?.$metadata);
					const normalizedResponse = {
						data: output,
						request: normalizedRequest,
						requestId: output?.$metadata?.requestId
					};
					servicesExtensions.responseHook(normalizedResponse, span);
				});
				if (requestMetadata?.isStream && !failed) return true;
				const region = data._sentryRegion;
				if (region && !region.settled) {
					region.promise.then(() => end());
					return true;
				}
				return false;
			} };
			const awsSendChannels = [
				CHANNELS.AWS_SMITHY_CORE_SEND,
				CHANNELS.AWS_SMITHY_CLIENT_SEND,
				CHANNELS.AWS_SDK_SMITHY_CLIENT_SEND
			];
			DEBUG_BUILD && debug$3.log(`[orchestrion:aws-sdk] subscribing to channels "${awsSendChannels.join("\", \"")}"`);
			waitForTracingChannelBinding(() => {
				for (const channelName of awsSendChannels) bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(channelName), getSpan, opts);
			});
		}
	};
});
var awsChannelIntegration = defineIntegration(_awsChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/dataloader.js
var INTEGRATION_NAME$29 = "Dataloader";
var MODULE_NAME$2 = "dataloader";
var ORIGIN$15 = "auto.db.orchestrion.dataloader";
var CACHE_GET_OP = "cache.get";
var WRAPPED$1 = /* @__PURE__ */ Symbol("sentry.dataloader.wrapped");
function getSpanName$3(loader, operation) {
	const name = loader?.name;
	return name ? `${MODULE_NAME$2}.${operation} ${name}` : `${MODULE_NAME$2}.${operation}`;
}
function getCacheKey$1(keyArg) {
	if (Array.isArray(keyArg)) return keyArg.map((key) => String(key));
	return keyArg == null ? void 0 : [String(keyArg)];
}
function makeSpanOptions(loader, operation, keyArg) {
	const isCacheGet = operation === "load" || operation === "loadMany" || operation === "batch";
	return {
		name: getSpanName$3(loader, operation),
		kind: operation === "batch" ? void 0 : SPAN_KIND.CLIENT,
		op: isCacheGet ? CACHE_GET_OP : void 0,
		onlyIfParent: true,
		attributes: {
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$15,
			[Li]: isCacheGet ? getCacheKey$1(keyArg) : void 0
		}
	};
}
var _dataloaderChannelIntegration = (() => {
	return {
		name: INTEGRATION_NAME$29,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			DEBUG_BUILD && debug$3.log("[orchestrion:dataloader] subscribing to dataloader tracing channels");
			waitForTracingChannelBinding(() => {
				subscribeConstruct();
				subscribeLoad();
				subscribeSimpleOperation(CHANNELS.DATALOADER_LOAD_MANY, "loadMany");
				subscribeSimpleOperation(CHANNELS.DATALOADER_PRIME, "prime");
				subscribeSimpleOperation(CHANNELS.DATALOADER_CLEAR, "clear");
				subscribeSimpleOperation(CHANNELS.DATALOADER_CLEAR_ALL, "clearAll");
			});
		}
	};
});
function subscribeConstruct() {
	diagnosticsChannel.tracingChannel(CHANNELS.DATALOADER_CONSTRUCT).start.subscribe((message) => {
		const data = message;
		const batchLoadFn = data.arguments[0];
		if (typeof batchLoadFn !== "function" || batchLoadFn[WRAPPED$1]) return;
		const original = batchLoadFn;
		const wrapped = function(...args) {
			return startSpan$3({
				...makeSpanOptions(this, "batch", args[0]),
				links: this._batch?.spanLinks
			}, () => original.apply(this, args));
		};
		wrapped[WRAPPED$1] = true;
		data.arguments[0] = wrapped;
	});
}
function subscribeLoad() {
	const channel = diagnosticsChannel.tracingChannel(CHANNELS.DATALOADER_LOAD);
	bindTracingChannelToSpan(channel, (data) => startInactiveSpanFor(data.self, "load", data.arguments[0]), { requiresParentSpan: true });
	channel.end.subscribe((message) => {
		const data = message;
		const span = data._sentrySpan;
		const batch = data.self?._batch;
		if (span && batch && span.isRecording()) (batch.spanLinks ?? (batch.spanLinks = [])).push({ context: span.spanContext() });
	});
}
function subscribeSimpleOperation(channelName, operation) {
	bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(channelName), (data) => startInactiveSpanFor(data.self, operation, data.arguments[0]), { requiresParentSpan: true });
}
function startInactiveSpanFor(loader, operation, keyArg) {
	return startInactiveSpan$1(makeSpanOptions(loader, operation, keyArg));
}
var dataloaderChannelIntegration = defineIntegration(_dataloaderChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/generic-pool.js
var INTEGRATION_NAME$28 = "GenericPool";
var _genericPoolChannelIntegration = (() => {
	return {
		name: INTEGRATION_NAME$28,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			waitForTracingChannelBinding(() => instrumentGenericPool$1());
		}
	};
});
var genericPoolChannelIntegration = defineIntegration(_genericPoolChannelIntegration);
function instrumentGenericPool$1() {
	bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(CHANNELS.GENERIC_POOL_ACQUIRE), () => startInactiveSpan$1({
		name: "generic-pool.acquire",
		attributes: { [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.db.orchestrion.generic_pool" }
	}));
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/google-genai.js
var INTEGRATION_NAME$27 = "Google_GenAI";
var ORIGIN$14 = "auto.ai.orchestrion.google_genai";
var INSTRUMENTED_CHANNELS$1 = [
	{
		channel: CHANNELS.GOOGLE_GENAI_GENERATE_CONTENT,
		operation: "generate_content"
	},
	{
		channel: CHANNELS.GOOGLE_GENAI_EMBED_CONTENT,
		operation: "embeddings"
	},
	{
		channel: CHANNELS.GOOGLE_GENAI_CHAT,
		operation: "chat"
	}
];
var subscribed$5 = false;
var _googleGenAIChannelIntegration = ((options = {}) => {
	return {
		name: INTEGRATION_NAME$27,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel || subscribed$5) return;
			subscribed$5 = true;
			waitForTracingChannelBinding(() => {
				for (const { channel, operation } of INSTRUMENTED_CHANNELS$1) {
					DEBUG_BUILD && debug$3.log(`[orchestrion:google-genai] subscribing to channel "${channel}"`);
					bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(channel), (data) => createGenAiSpan$1(data, operation, options), {
						beforeSpanEnd: (span, data) => {
							if (operation !== "embeddings") addResponseAttributes$1(span, data.result, resolveAIRecordingOptions(options).recordOutputs);
						},
						deferSpanEnd: ({ span, data }) => wrapStreamResult$1(span, data, options)
					});
				}
			});
		}
	};
});
function createGenAiSpan$1(data, operation, options) {
	if (_INTERNAL_shouldSkipAiProviderWrapping(INTEGRATION_NAME$27)) return;
	if (operation !== "chat") {
		const activeSpan = getActiveSpan$1();
		if (activeSpan) {
			const { op, origin } = spanToJSON(activeSpan);
			if (origin === ORIGIN$14 && op === "gen_ai.chat") return;
		}
	}
	const params = (data.arguments ?? [])[0];
	const { recordInputs } = resolveAIRecordingOptions(options);
	const enableTruncation = shouldEnableTruncation(options.enableTruncation);
	const attributes = extractRequestAttributes$1(operation, params, data.self);
	const model = attributes["gen_ai.request.model"] || "unknown";
	attributes[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN] = ORIGIN$14;
	const span = startInactiveSpan$1({
		name: `${operation} ${model}`,
		op: `gen_ai.${operation}`,
		attributes
	});
	if (recordInputs && params) addPrivateRequestAttributes$1(span, params, operation, enableTruncation);
	return span;
}
function isAsyncIterable$1(value) {
	return !!value && typeof value[Symbol.asyncIterator] === "function";
}
function wrapStreamResult$1(span, data, options) {
	const result = data.result;
	if (!isAsyncIterable$1(result)) return false;
	const { recordOutputs } = resolveAIRecordingOptions(options);
	const iterate = result[Symbol.asyncIterator].bind(result);
	const instrumented = instrumentStream({ [Symbol.asyncIterator]: iterate }, span, recordOutputs ?? false);
	result[Symbol.asyncIterator] = () => instrumented;
	return true;
}
var googleGenAIChannelIntegration = defineIntegration(_googleGenAIChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/graphql/constants.js
var ORIGIN$13 = "auto.graphql.diagnostic_channel";
var SPAN_NAME_PARSE = "graphql.parse";
var SPAN_NAME_VALIDATE = "graphql.validate";
var SPAN_NAME_EXECUTE = "graphql.execute";
var SPAN_NAME_RESOLVE = "graphql.resolve";
var GRAPHQL_FIELD_NAME = "graphql.field.name";
var GRAPHQL_FIELD_PATH = "graphql.field.path";
var GRAPHQL_FIELD_TYPE = "graphql.field.type";
var GRAPHQL_PARENT_NAME = "graphql.parent.name";
var GRAPHQL_DATA_SYMBOL = /* @__PURE__ */ Symbol.for("opentelemetry.graphql_data");
var GRAPHQL_PATCHED_SYMBOL = /* @__PURE__ */ Symbol.for("opentelemetry.patched");
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/graphql/resolvers.js
function isPromise(value) {
	return typeof value?.then === "function";
}
function wrapFields(type, getConfig) {
	if (!type || type[GRAPHQL_PATCHED_SYMBOL]) return;
	type[GRAPHQL_PATCHED_SYMBOL] = true;
	const fields = type.getFields();
	Object.keys(fields).forEach((key) => {
		const field = fields[key];
		if (!field) return;
		if (field.resolve) field.resolve = wrapFieldResolver(getConfig, field.resolve);
		if (field.type) for (const unwrappedType of unwrapType(field.type)) wrapFields(unwrappedType, getConfig);
	});
}
function wrapFieldResolver(getConfig, fieldResolver, isDefaultResolver = false) {
	if (typeof fieldResolver !== "function" || fieldResolver[GRAPHQL_PATCHED_SYMBOL]) return fieldResolver;
	function wrappedFieldResolver(source, args, rawContextValue, info) {
		if (!fieldResolver) return;
		const contextValue = rawContextValue ?? {};
		if (getConfig().ignoreTrivialResolveSpans && isDefaultResolver && (isObjectLike(source) || typeof source === "function")) {
			if (typeof source[info.fieldName] !== "function") return fieldResolver.call(this, source, args, contextValue, info);
		}
		if (!contextValue[GRAPHQL_DATA_SYMBOL]) return fieldResolver.call(this, source, args, contextValue, info);
		const { field, spanAdded } = createFieldIfNotExists(contextValue, info, pathToArray(info.path));
		const span = field.span;
		return withActiveSpan$1(span, () => {
			try {
				const res = fieldResolver.call(this, source, args, contextValue, info);
				if (isPromise(res)) return res.then((r) => {
					endResolveSpan(span, spanAdded);
					return r;
				}, (err) => {
					endResolveSpan(span, spanAdded, err);
					throw err;
				});
				endResolveSpan(span, spanAdded);
				return res;
			} catch (err) {
				endResolveSpan(span, spanAdded, err);
				throw err;
			}
		});
	}
	wrappedFieldResolver[GRAPHQL_PATCHED_SYMBOL] = true;
	return wrappedFieldResolver;
}
function endResolveSpan(span, shouldEndSpan, error) {
	if (!shouldEndSpan) return;
	if (error) span.setStatus({
		code: 2,
		message: error.message
	});
	span.end();
}
function createFieldIfNotExists(contextValue, info, path) {
	const existing = getField(contextValue, path);
	if (existing) return {
		field: existing,
		spanAdded: false
	};
	const field = { span: createResolverSpan(info, path, getParentFieldSpan(contextValue, path)) };
	addField(contextValue, path, field);
	return {
		field,
		spanAdded: true
	};
}
function createResolverSpan(info, path, parentSpan) {
	const attributes = {
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$13,
		[SEMANTIC_ATTRIBUTE_SENTRY_OP]: i_,
		[GRAPHQL_FIELD_NAME]: info.fieldName,
		[GRAPHQL_FIELD_PATH]: path.join("."),
		[GRAPHQL_FIELD_TYPE]: info.returnType.toString(),
		[GRAPHQL_PARENT_NAME]: info.parentType.name
	};
	return startInactiveSpan$1({
		name: `${SPAN_NAME_RESOLVE} ${path.join(".")}`,
		attributes,
		parentSpan
	});
}
function addField(contextValue, path, field) {
	const data = contextValue[GRAPHQL_DATA_SYMBOL];
	if (data) data.fields[path.join(".")] = field;
}
function getField(contextValue, path) {
	return contextValue[GRAPHQL_DATA_SYMBOL]?.fields[path.join(".")];
}
function getParentFieldSpan(contextValue, path) {
	for (let i = path.length - 1; i > 0; i--) {
		const field = getField(contextValue, path.slice(0, i));
		if (field) return field.span;
	}
	return contextValue[GRAPHQL_DATA_SYMBOL]?.span;
}
function pathToArray(path) {
	const flattened = [];
	let curr = path;
	while (curr) {
		flattened.push(String(curr.key));
		curr = curr.prev;
	}
	return flattened.reverse();
}
function unwrapType(type) {
	if ("ofType" in type && type.ofType) return unwrapType(type.ofType);
	if (isGraphQLUnionType(type)) return type.getTypes();
	if (isGraphQLObjectType(type)) return [type];
	return [];
}
function isGraphQLUnionType(type) {
	return "getTypes" in type && typeof type.getTypes === "function";
}
function isGraphQLObjectType(type) {
	return "getFields" in type && typeof type.getFields === "function";
}
function getOperation(document, operationName) {
	const definitions = document?.definitions;
	if (!definitions || !Array.isArray(definitions)) return;
	const isOperation = (def) => !!def?.operation && [
		"query",
		"mutation",
		"subscription"
	].indexOf(def.operation) !== -1;
	if (operationName) return definitions.filter(isOperation).find((def) => operationName === def?.name?.value);
	return definitions.find(isOperation);
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/graphql/spans.js
var BASE_ATTRIBUTES = {
	[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$13,
	[SEMANTIC_ATTRIBUTE_SENTRY_OP]: i_
};
function startParseSpan() {
	return startInactiveSpan$1({
		name: SPAN_NAME_PARSE,
		attributes: { ...BASE_ATTRIBUTES }
	});
}
function startValidateSpan(documentAST) {
	return startInactiveSpan$1({
		name: SPAN_NAME_VALIDATE,
		attributes: {
			...BASE_ATTRIBUTES,
			[qa]: collectGraphqlDocument(documentAST)
		}
	});
}
function finalizeValidateSpan(span, result) {
	if (Array.isArray(result) && result.length > 0) span.setStatus({
		code: 2,
		message: "invalid_argument"
	});
}
function normalizeExecuteArgs(argsArray) {
	if (argsArray.length >= 2) return {
		schema: argsArray[0],
		document: argsArray[1],
		contextValue: argsArray[3] ?? {},
		operationName: argsArray[5],
		fieldResolver: argsArray[6],
		writeBack: (contextValue, fieldResolver) => {
			argsArray[3] = contextValue;
			argsArray[6] = fieldResolver;
		}
	};
	const obj = argsArray[0] ?? {};
	return {
		schema: obj.schema,
		document: obj.document,
		contextValue: obj.contextValue ?? {},
		operationName: obj.operationName,
		fieldResolver: obj.fieldResolver,
		writeBack: (contextValue, fieldResolver) => {
			obj.contextValue = contextValue;
			obj.fieldResolver = fieldResolver;
		}
	};
}
function startExecuteSpan(argsArray, self, config, getConfig) {
	const args = normalizeExecuteArgs(argsArray);
	const { schema, document } = args;
	let { contextValue, fieldResolver } = args;
	const alreadyInstrumented = !!contextValue[GRAPHQL_DATA_SYMBOL];
	if (!config.ignoreResolveSpans && !alreadyInstrumented) {
		const isUsingDefaultResolver = fieldResolver == null;
		const defaultFieldResolver = self?.defaultFieldResolver;
		const fieldResolverForExecute = fieldResolver ?? defaultFieldResolver;
		if (fieldResolverForExecute) fieldResolver = wrapFieldResolver(getConfig, fieldResolverForExecute, isUsingDefaultResolver);
		if (schema) {
			wrapFields(schema.getQueryType(), getConfig);
			wrapFields(schema.getMutationType(), getConfig);
		}
	}
	const operation = getOperation(document, args.operationName);
	const operationType = operation?.operation;
	const operationName = operation?.name?.value ?? args.operationName ?? void 0;
	const span = startInactiveSpan$1({
		name: getOperationSpanName(operationType, operationName || void 0, SPAN_NAME_EXECUTE),
		attributes: {
			...BASE_ATTRIBUTES,
			[Ya]: operationType,
			[Ga]: operationName || void 0,
			[qa]: collectGraphqlDocument(document)
		}
	});
	if (config.useOperationNameForRootSpan && operationType) renameRootSpanWithOperation(span, operationType, operationName || void 0);
	contextValue[GRAPHQL_DATA_SYMBOL] = {
		source: document,
		span,
		fields: {}
	};
	args.writeBack(contextValue, fieldResolver);
	return span;
}
function finalizeExecuteSpan(span, result) {
	if (hasResultErrors(result)) span.setStatus({
		code: 2,
		message: "internal_error"
	});
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/graphql/index.js
var INTEGRATION_NAME$26 = "Graphql";
function getOptionsWithDefaults(options) {
	return {
		ignoreResolveSpans: options.ignoreResolveSpans !== false,
		ignoreTrivialResolveSpans: options.ignoreTrivialResolveSpans !== false,
		useOperationNameForRootSpan: options.useOperationNameForRootSpan !== false
	};
}
function safe$1(fn) {
	try {
		return fn();
	} catch (error) {
		DEBUG_BUILD && debug$3.warn("[orchestrion:graphql] error building span", error);
		return;
	}
}
var _graphqlChannelIntegration = ((options = {}) => {
	const config = getOptionsWithDefaults(options);
	const getConfig = () => config;
	return {
		name: INTEGRATION_NAME$26,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			waitForTracingChannelBinding(() => {
				bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(CHANNELS.GRAPHQL_PARSE), () => safe$1(() => startParseSpan()));
				bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(CHANNELS.GRAPHQL_VALIDATE), (data) => safe$1(() => startValidateSpan(data.arguments[1])), { beforeSpanEnd: (span, data) => void safe$1(() => finalizeValidateSpan(span, data.result)) });
				bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(CHANNELS.GRAPHQL_EXECUTE), (data) => safe$1(() => startExecuteSpan(data.arguments, data.self, config, getConfig)), { beforeSpanEnd: (span, data) => void safe$1(() => finalizeExecuteSpan(span, data.result)) });
			});
		}
	};
});
var graphqlChannelIntegration = defineIntegration(_graphqlChannelIntegration);
var graphqlDiagnosticsChannelIntegration = (options) => {
	const orchestrion = graphqlChannelIntegration(options);
	return extendIntegration(graphqlIntegration$1(options), {
		name: INTEGRATION_NAME$26,
		setupOnce: () => orchestrion.setupOnce?.()
	});
};
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/hapi-types.js
var LIFECYCLE_EXT_POINTS = [
	"onPreAuth",
	"onCredentials",
	"onPostAuth",
	"onPreHandler",
	"onPostHandler",
	"onPreResponse",
	"onRequest"
];
var handlerPatched = /* @__PURE__ */ Symbol("hapi-handler-patched");
var HapiLayerType = {
	ROUTER: "router",
	PLUGIN: "plugin",
	EXT: "server.ext"
};
var HapiLifecycleMethodNames = new Set(LIFECYCLE_EXT_POINTS);
var AttributeNames = /* @__PURE__ */ ((AttributeNames2) => {
	AttributeNames2["HAPI_TYPE"] = "hapi.type";
	AttributeNames2["PLUGIN_NAME"] = "hapi.plugin.name";
	AttributeNames2["EXT_TYPE"] = "server.ext.type";
	return AttributeNames2;
})(AttributeNames || {});
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/hapi-utils.js
function setHttpServerSpanRouteAttribute$1(route) {
	const activeSpan = getActiveSpan$1();
	if (!activeSpan) return;
	const rootSpan = getRootSpan$1(activeSpan);
	if (!rootSpan) return;
	if (spanToJSON(rootSpan).data["sentry.op"] !== "http.server") return;
	rootSpan.setAttribute(Ts, route);
}
var isLifecycleExtType = (variableToCheck) => {
	return typeof variableToCheck === "string" && HapiLifecycleMethodNames.has(variableToCheck);
};
var isLifecycleExtEventObj = (variableToCheck) => {
	const event = variableToCheck?.type;
	return event !== void 0 && isLifecycleExtType(event);
};
var isDirectExtInput = (variableToCheck) => {
	return Array.isArray(variableToCheck) && variableToCheck.length <= 3 && isLifecycleExtType(variableToCheck[0]) && typeof variableToCheck[1] === "function";
};
var isPatchableExtMethod = (variableToCheck) => {
	return !Array.isArray(variableToCheck);
};
var getRouteMetadata = (route, pluginName) => {
	const attributes = {
		[Ts]: route.path,
		[Ka]: route.method
	};
	let name;
	if (pluginName) {
		attributes[AttributeNames.HAPI_TYPE] = HapiLayerType.PLUGIN;
		attributes[AttributeNames.PLUGIN_NAME] = pluginName;
		name = `${pluginName}: route - ${route.path}`;
	} else {
		attributes[AttributeNames.HAPI_TYPE] = HapiLayerType.ROUTER;
		name = `route - ${route.path}`;
	}
	return {
		attributes,
		name
	};
};
var getExtMetadata = (extPoint, pluginName, methodName) => {
	let baseName = `ext - ${extPoint}`;
	if (methodName && methodName !== "method") baseName = `ext - ${extPoint} - ${methodName}`;
	if (pluginName) return {
		attributes: {
			[AttributeNames.EXT_TYPE]: extPoint,
			[AttributeNames.HAPI_TYPE]: HapiLayerType.EXT,
			[AttributeNames.PLUGIN_NAME]: pluginName
		},
		name: `${pluginName}: ${baseName}`
	};
	return {
		attributes: {
			[AttributeNames.EXT_TYPE]: extPoint,
			[AttributeNames.HAPI_TYPE]: HapiLayerType.EXT
		},
		name: baseName
	};
};
function startMetadataSpan(metadata, original) {
	return startSpan$3({
		name: metadata.name,
		op: `${metadata.attributes[AttributeNames.HAPI_TYPE]}.hapi`,
		attributes: {
			...metadata.attributes,
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.orchestrion.hapi"
		}
	}, original);
}
function wrapRouteHandler(route, pluginName) {
	if (route[handlerPatched] === true) return route;
	route[handlerPatched] = true;
	const wrapHandler = (oldHandler) => {
		return function(...params) {
			if (!getActiveSpan$1()) return oldHandler.call(this, ...params);
			setHttpServerSpanRouteAttribute$1(route.path);
			return startMetadataSpan(getRouteMetadata(route, pluginName), () => oldHandler.call(this, ...params));
		};
	};
	if (typeof route.handler === "function") route.handler = wrapHandler(route.handler);
	else if (typeof route.options === "function") {
		const oldOptions = route.options;
		route.options = function(server) {
			const options = oldOptions(server);
			if (typeof options.handler === "function") options.handler = wrapHandler(options.handler);
			return options;
		};
	} else if (typeof route.options?.handler === "function") route.options.handler = wrapHandler(route.options.handler);
	return route;
}
function wrapExtMethods(method, extPoint, pluginName) {
	if (Array.isArray(method)) {
		for (let i = 0; i < method.length; i++) method[i] = wrapExtMethods(method[i], extPoint);
		return method;
	} else if (isPatchableExtMethod(method)) {
		if (method[handlerPatched] === true) return method;
		method[handlerPatched] = true;
		const newHandler = function(...params) {
			if (!getActiveSpan$1()) return method.apply(this, params);
			return startMetadataSpan(getExtMetadata(extPoint, pluginName, method.name), () => method.apply(void 0, params));
		};
		newHandler[handlerPatched] = true;
		return newHandler;
	}
	return method;
}
function wrapRouteArguments(args, pluginName) {
	const route = args[0];
	if (Array.isArray(route)) for (let i = 0; i < route.length; i++) route[i] = wrapRouteHandler(route[i], pluginName);
	else args[0] = wrapRouteHandler(route, pluginName);
}
function wrapExtArguments(args, pluginName) {
	if (Array.isArray(args[0])) {
		const eventsList = args[0];
		for (let i = 0; i < eventsList.length; i++) {
			const eventObj = eventsList[i];
			if (isLifecycleExtType(eventObj.type)) {
				const lifecycleEventObj = eventObj;
				lifecycleEventObj.method = wrapExtMethods(lifecycleEventObj.method, eventObj.type, pluginName);
				eventsList[i] = lifecycleEventObj;
			}
		}
		return;
	} else if (isDirectExtInput(args)) {
		const extInput = args;
		const method = extInput[1];
		args[1] = wrapExtMethods(method, extInput[0], pluginName);
		return;
	} else if (isLifecycleExtEventObj(args[0])) {
		const lifecycleEventObj = args[0];
		lifecycleEventObj.method = wrapExtMethods(lifecycleEventObj.method, lifecycleEventObj.type, pluginName);
	}
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/hapi.js
var INTEGRATION_NAME$25 = "Hapi";
var _hapiChannelIntegration = (() => {
	return {
		name: INTEGRATION_NAME$25,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			DEBUG_BUILD && debug$3.log(`[orchestrion:hapi] subscribing to channels "${CHANNELS.HAPI_ROUTE}" / "${CHANNELS.HAPI_EXT}"`);
			diagnosticsChannel.tracingChannel(CHANNELS.HAPI_ROUTE).subscribe({
				start(rawCtx) {
					const ctx = rawCtx;
					wrapRouteArguments(ctx.arguments, ctx.self?.realm?.plugin);
				},
				end() {},
				asyncStart() {},
				asyncEnd() {},
				error() {}
			});
			diagnosticsChannel.tracingChannel(CHANNELS.HAPI_EXT).subscribe({
				start(rawCtx) {
					const ctx = rawCtx;
					wrapExtArguments(ctx.arguments, ctx.self?.realm?.plugin);
				},
				end() {},
				asyncStart() {},
				asyncEnd() {},
				error() {}
			});
		}
	};
});
var hapiChannelIntegration = defineIntegration(_hapiChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/koa.js
var INTEGRATION_NAME$24 = "Koa";
var ORIGIN$12 = "auto.http.orchestrion.koa";
var LAYER_TYPE = {
	ROUTER: "router",
	MIDDLEWARE: "middleware"
};
var kLayerPatched = /* @__PURE__ */ Symbol("sentry.koa.layer-patched");
var subscribed$4 = false;
var _koaChannelIntegration = ((options = {}) => {
	const ignoreLayersType = options.ignoreLayersType ?? [];
	return {
		name: INTEGRATION_NAME$24,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel || subscribed$4) return;
			subscribed$4 = true;
			DEBUG_BUILD && debug$3.log(`[orchestrion:koa] subscribing to channel "${CHANNELS.KOA_USE}"`);
			diagnosticsChannel.tracingChannel(CHANNELS.KOA_USE).subscribe({
				start(rawCtx) {
					handleUse(rawCtx, ignoreLayersType);
				},
				end() {},
				asyncStart() {},
				asyncEnd() {},
				error() {}
			});
		}
	};
});
function handleUse(ctx, ignoreLayersType) {
	const middleware = ctx.arguments[0];
	if (typeof middleware === "function") ctx.arguments[0] = patchUse(middleware, ignoreLayersType);
}
function patchUse(middleware, ignoreLayersType) {
	return middleware.router ? patchRouterDispatch(middleware, ignoreLayersType) : patchLayer(middleware, false, ignoreLayersType);
}
function patchRouterDispatch(dispatchLayer, ignoreLayersType) {
	const routesStack = dispatchLayer.router?.stack ?? [];
	for (const pathLayer of routesStack) {
		const path = pathLayer.path;
		const pathStack = pathLayer.stack;
		pathStack.forEach((routedMiddleware, j) => {
			pathStack[j] = patchLayer(routedMiddleware, true, ignoreLayersType, path);
		});
	}
	return dispatchLayer;
}
function patchLayer(middlewareLayer, isRouter, ignoreLayersType, layerPath) {
	const layerType = isRouter ? LAYER_TYPE.ROUTER : LAYER_TYPE.MIDDLEWARE;
	if (middlewareLayer[kLayerPatched] === true || ignoreLayersType.includes(layerType)) return middlewareLayer;
	if (middlewareLayer.constructor.name === "GeneratorFunction" || middlewareLayer.constructor.name === "AsyncGeneratorFunction") return middlewareLayer;
	middlewareLayer[kLayerPatched] = true;
	return (context, next) => {
		if (!getActiveSpan$1()) return middlewareLayer(context, next);
		const metadata = getMiddlewareMetadata(context, middlewareLayer, isRouter, layerPath);
		if (context._matchedRoute) setHttpServerSpanRouteAttribute(context._matchedRoute.toString());
		const koaName = metadata.attributes[Vs];
		const name = typeof koaName === "string" ? koaName || "< unknown >" : metadata.name;
		return startSpan$3({
			name,
			op: `${layerType}.koa`,
			attributes: {
				...metadata.attributes,
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$12
			}
		}, () => {
			const route = metadata.attributes[Ts];
			if (getIsolationScope() === getDefaultIsolationScope()) DEBUG_BUILD && debug$3.warn("Isolation scope is default isolation scope - skipping setting transactionName");
			else if (route) {
				const method = context.request?.method?.toUpperCase() || "GET";
				getIsolationScope().setTransactionName(`${method} ${route}`);
			}
			return middlewareLayer(context, next);
		});
	};
}
function getMiddlewareMetadata(context, layer, isRouter, layerPath) {
	if (isRouter) return {
		attributes: {
			[Vs]: layerPath?.toString(),
			[Ws]: LAYER_TYPE.ROUTER,
			[Ts]: layerPath?.toString()
		},
		name: context._matchedRouteName || `router - ${layerPath}`
	};
	return {
		attributes: {
			[Vs]: layer.name || "middleware",
			[Ws]: LAYER_TYPE.MIDDLEWARE,
			[ht]: layer.name || "middleware"
		},
		name: `middleware - ${layer.name}`
	};
}
function setHttpServerSpanRouteAttribute(route) {
	const activeSpan = getActiveSpan$1();
	if (!activeSpan) return;
	const rootSpan = getRootSpan$1(activeSpan);
	if (!rootSpan) return;
	if (spanToJSON(rootSpan).data["sentry.op"] !== "http.server") return;
	rootSpan.setAttribute(Ts, route);
}
var koaChannelIntegration = defineIntegration(_koaChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/ioredis.js
var INTEGRATION_NAME$23 = "IORedis";
var ORIGIN$11 = "auto.db.orchestrion.redis";
var ATTR_DB_CONNECTION_STRING$3 = "db.connection_string";
function getConnectionOptions(self) {
	return {
		host: self?.options?.host,
		port: self?.options?.port
	};
}
function connectionAttributes(host, port) {
	return {
		[Kt]: "redis",
		[ATTR_DB_CONNECTION_STRING$3]: `redis://${host}:${port}`,
		[Il]: host,
		[Ol]: port,
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$11
	};
}
var tracedCommands = /* @__PURE__ */ new WeakSet();
function startIORedisCommandSpan(data) {
	const command = data.arguments?.[0];
	if (!command || typeof command !== "object") return;
	if (tracedCommands.has(command)) return;
	tracedCommands.add(command);
	const { host, port } = getConnectionOptions(data.self);
	const statement = defaultDbStatementSerializer(command.name, command.args ?? []);
	return startInactiveSpan$1({
		name: statement,
		op: "db",
		attributes: {
			...connectionAttributes(host, port),
			[Ht]: statement
		}
	});
}
var _ioredisChannelIntegration = ((options = {}) => {
	const responseHook = options.responseHook;
	return {
		name: INTEGRATION_NAME$23,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			DEBUG_BUILD && debug$3.log(`[orchestrion:ioredis] subscribing to "${CHANNELS.IOREDIS_COMMAND}"/"${CHANNELS.IOREDIS_CONNECT}"`);
			const commandChannel = diagnosticsChannel.tracingChannel(CHANNELS.IOREDIS_COMMAND);
			const connectChannel = diagnosticsChannel.tracingChannel(CHANNELS.IOREDIS_CONNECT);
			waitForTracingChannelBinding(() => {
				bindTracingChannelToSpan(commandChannel, startIORedisCommandSpan, {
					requiresParentSpan: true,
					beforeSpanEnd(span, data) {
						if ("error" in data || !responseHook) return;
						const command = data.arguments?.[0];
						if (command) runResponseHook$1(responseHook, span, command, data.result);
					}
				});
				bindTracingChannelToSpan(connectChannel, (data) => {
					const { host, port } = getConnectionOptions(data.self);
					return startInactiveSpan$1({
						name: "connect",
						op: "db",
						attributes: {
							...connectionAttributes(host, port),
							[Ht]: "connect"
						}
					});
				}, { requiresParentSpan: true });
			});
		}
	};
});
function runResponseHook$1(hook, span, command, result) {
	try {
		hook(span, command.name, command.args, result);
	} catch {}
}
var ioredisChannelIntegration = defineIntegration(_ioredisChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/kafkajs/semconv.js
var ATTR_MESSAGING_DESTINATION_PARTITION_ID = "messaging.destination.partition.id";
var ATTR_MESSAGING_KAFKA_MESSAGE_KEY = "messaging.kafka.message.key";
var ATTR_MESSAGING_KAFKA_MESSAGE_TOMBSTONE = "messaging.kafka.message.tombstone";
var ATTR_MESSAGING_KAFKA_OFFSET = "messaging.kafka.offset";
var MESSAGING_OPERATION_TYPE_VALUE_PROCESS = "process";
var MESSAGING_OPERATION_TYPE_VALUE_RECEIVE = "receive";
var MESSAGING_OPERATION_TYPE_VALUE_SEND = "send";
var MESSAGING_SYSTEM_VALUE_KAFKA = "kafka";
var ERROR_TYPE_VALUE_OTHER = "_OTHER";
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/kafkajs/spans.js
var PRODUCER_ORIGIN = "auto.kafkajs.orchestrion.producer";
var CONSUMER_ORIGIN$1 = "auto.kafkajs.orchestrion.consumer";
var TRACE_FLAG_SAMPLED = 1;
var TRACE_FLAG_NONE = 0;
function getHeaderAsString$1(headers, key) {
	const value = headers?.[key];
	if (value == null) return;
	return Array.isArray(value) ? value[0]?.toString() : value.toString();
}
function getLinksFromHeaders(headers) {
	const sentryTrace = getHeaderAsString$1(headers, "sentry-trace");
	if (!sentryTrace) return;
	const { traceId, parentSpanId, sampled } = propagationContextFromHeaders(sentryTrace, getHeaderAsString$1(headers, "baggage"));
	if (!parentSpanId) return;
	return [{ context: {
		traceId,
		spanId: parentSpanId,
		isRemote: true,
		traceFlags: sampled ? TRACE_FLAG_SAMPLED : TRACE_FLAG_NONE
	} }];
}
function startConsumerSpan({ topic, message, operationType, links, attributes }) {
	const operationName = operationType === "receive" ? "poll" : operationType;
	return startInactiveSpan$1({
		name: `${operationName} ${topic}`,
		op: "message",
		kind: operationType === "receive" ? SPAN_KIND.CLIENT : SPAN_KIND.CONSUMER,
		links,
		attributes: {
			...attributes,
			[Zo]: MESSAGING_SYSTEM_VALUE_KAFKA,
			[Wo]: topic,
			[Xo]: operationType,
			[Qo]: operationName,
			[ATTR_MESSAGING_KAFKA_MESSAGE_KEY]: message?.key ? String(message.key) : void 0,
			[ATTR_MESSAGING_KAFKA_MESSAGE_TOMBSTONE]: message?.key && message.value === null ? true : void 0,
			[ATTR_MESSAGING_KAFKA_OFFSET]: message?.offset,
			...message ? { [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: CONSUMER_ORIGIN$1 } : {}
		}
	});
}
function startProducerSpan(topic, message) {
	const span = startInactiveSpan$1({
		name: `send ${topic}`,
		op: "message",
		kind: SPAN_KIND.PRODUCER,
		attributes: {
			[Zo]: MESSAGING_SYSTEM_VALUE_KAFKA,
			[Wo]: topic,
			[ATTR_MESSAGING_KAFKA_MESSAGE_KEY]: message.key ? String(message.key) : void 0,
			[ATTR_MESSAGING_KAFKA_MESSAGE_TOMBSTONE]: message.key && message.value === null ? true : void 0,
			[ATTR_MESSAGING_DESTINATION_PARTITION_ID]: message.partition !== void 0 ? String(message.partition) : void 0,
			[Qo]: "send",
			[Xo]: MESSAGING_OPERATION_TYPE_VALUE_SEND,
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: PRODUCER_ORIGIN
		}
	});
	message.headers = message.headers ?? {};
	const traceData = getTraceData$1({ span });
	if (traceData["sentry-trace"]) message.headers["sentry-trace"] = traceData["sentry-trace"];
	if (traceData.baggage) message.headers["baggage"] = traceData.baggage;
	return span;
}
function applyErrorToSpans(spans, reason) {
	let errorMessage;
	let errorType = ERROR_TYPE_VALUE_OTHER;
	if (typeof reason === "string" || reason === void 0) errorMessage = reason;
	else if (typeof reason === "object" && reason !== null && Object.prototype.hasOwnProperty.call(reason, "message")) {
		errorMessage = reason.message;
		errorType = reason.constructor.name;
	}
	spans.forEach((span) => {
		span.setAttribute(Gn, errorType);
		span.setStatus({
			code: 2,
			message: errorMessage
		});
	});
}
function endSpansOnPromise(spans, promise) {
	return Promise.resolve(promise).catch((reason) => {
		applyErrorToSpans(spans, reason);
		throw reason;
	}).finally(() => {
		spans.forEach((span) => span.end());
	});
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/kafkajs/consumer.js
var consumerCallbackWrapped = /* @__PURE__ */ Symbol("sentry-kafkajs-consumer-callback-wrapped");
function isWrappedConsumerCallback(fn) {
	return typeof fn === "function" && fn[consumerCallbackWrapped] === true;
}
function wrapEachMessage(original) {
	const wrapped = function eachMessage(payload) {
		const sentryTrace = getHeaderAsString$1(payload.message.headers, "sentry-trace");
		const baggage = getHeaderAsString$1(payload.message.headers, "baggage");
		return continueTrace$1({
			sentryTrace,
			baggage
		}, () => {
			const span = startConsumerSpan({
				topic: payload.topic,
				message: payload.message,
				operationType: MESSAGING_OPERATION_TYPE_VALUE_PROCESS,
				attributes: { [ATTR_MESSAGING_DESTINATION_PARTITION_ID]: String(payload.partition) }
			});
			const promise = withActiveSpan$1(span, () => original.call(this, payload));
			return endSpansOnPromise([span], promise);
		});
	};
	wrapped[consumerCallbackWrapped] = true;
	return wrapped;
}
function wrapEachBatch(original) {
	const wrapped = function eachBatch(payload) {
		const receivingSpan = startNewTrace$1(() => startConsumerSpan({
			topic: payload.batch.topic,
			message: void 0,
			operationType: MESSAGING_OPERATION_TYPE_VALUE_RECEIVE,
			attributes: {
				[Go]: payload.batch.messages.length,
				[ATTR_MESSAGING_DESTINATION_PARTITION_ID]: String(payload.batch.partition)
			}
		}));
		return withActiveSpan$1(receivingSpan, () => {
			const spans = [receivingSpan];
			payload.batch.messages.forEach((message) => {
				spans.push(startConsumerSpan({
					topic: payload.batch.topic,
					message,
					operationType: MESSAGING_OPERATION_TYPE_VALUE_PROCESS,
					links: getLinksFromHeaders(message.headers),
					attributes: { [ATTR_MESSAGING_DESTINATION_PARTITION_ID]: String(payload.batch.partition) }
				}));
			});
			return endSpansOnPromise(spans, original.call(this, payload));
		});
	};
	wrapped[consumerCallbackWrapped] = true;
	return wrapped;
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/kafkajs/index.js
var INTEGRATION_NAME$22 = "Kafka";
function subscribeToProducer() {
	diagnosticsChannel.tracingChannel(CHANNELS.KAFKAJS_SEND_BATCH).subscribe({
		start(ctx) {
			const spans = [];
			(ctx.arguments[0]?.topicMessages ?? []).forEach((topicMessage) => {
				topicMessage.messages.forEach((message) => {
					spans.push(startProducerSpan(topicMessage.topic, message));
				});
			});
			ctx._sentrySpans = spans;
		},
		error(ctx) {
			if (ctx._sentrySpans) applyErrorToSpans(ctx._sentrySpans, ctx.error);
		},
		asyncEnd(ctx) {
			ctx._sentrySpans?.forEach((span) => span.end());
		}
	});
}
function subscribeToConsumer() {
	diagnosticsChannel.tracingChannel(CHANNELS.KAFKAJS_CONSUMER_RUN).subscribe({ start(ctx) {
		const config = ctx.arguments[0];
		if (!config || typeof config !== "object") return;
		if (typeof config.eachMessage === "function" && !isWrappedConsumerCallback(config.eachMessage)) config.eachMessage = wrapEachMessage(config.eachMessage);
		if (typeof config.eachBatch === "function" && !isWrappedConsumerCallback(config.eachBatch)) config.eachBatch = wrapEachBatch(config.eachBatch);
	} });
}
var _kafkajsChannelIntegration = (() => {
	return {
		name: INTEGRATION_NAME$22,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			DEBUG_BUILD && debug$3.log(`[orchestrion:kafkajs] subscribing to channels "${CHANNELS.KAFKAJS_SEND_BATCH}", "${CHANNELS.KAFKAJS_CONSUMER_RUN}"`);
			subscribeToProducer();
			subscribeToConsumer();
		}
	};
});
var kafkajsChannelIntegration = defineIntegration(_kafkajsChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/knex.js
var INTEGRATION_NAME$21 = "Knex";
var ORIGIN$10 = "auto.db.orchestrion.knex";
var MAX_QUERY_LENGTH = 1021;
var ATTR_DB_SQL_TABLE$2 = "db.sql.table";
var DB_SYSTEM_SQLITE = "sqlite";
var DB_SYSTEM_POSTGRESQL$1 = "postgresql";
var parentSpanSymbol = /* @__PURE__ */ Symbol("sentry.orchestrion.knex.parent-span");
var _knexChannelIntegration = (() => {
	return {
		name: INTEGRATION_NAME$21,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			DEBUG_BUILD && debug$3.log(`[orchestrion:knex] subscribing to channel "${CHANNELS.KNEX_QUERY}"`);
			waitForTracingChannelBinding(() => {
				subscribeBuilder(CHANNELS.KNEX_QUERY_BUILDER);
				subscribeBuilder(CHANNELS.KNEX_SCHEMA_BUILDER);
				subscribeBuilder(CHANNELS.KNEX_RAW);
				subscribeQuery$1();
			});
		}
	};
});
function subscribeBuilder(channelName) {
	diagnosticsChannel.tracingChannel(channelName).end.subscribe((message) => {
		const builder = message.result;
		if (!builder || typeof builder !== "object" || parentSpanSymbol in builder) return;
		const activeSpan = getActiveSpan$1();
		if (!activeSpan) return;
		Object.defineProperty(builder, parentSpanSymbol, { value: activeSpan });
	});
}
function subscribeQuery$1() {
	bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(CHANNELS.KNEX_QUERY), (data) => {
		const runner = data.self;
		const builder = runner?.builder;
		const parentSpan = builder?.[parentSpanSymbol] ?? getActiveSpan$1();
		if (!parentSpan) return;
		const query = data.arguments[0];
		const client = runner?.client;
		const connection = client?.config?.connection;
		const connectionString = connection?.connectionString;
		const table = extractTableName(builder);
		const operation = query?.method;
		const name = connection?.filename || connection?.database || extractDatabaseFromConnectionString(connectionString);
		const attributes = {
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$10,
			"knex.version": data.moduleVersion,
			[Kt]: mapSystem(client?.driverName),
			[ATTR_DB_SQL_TABLE$2]: table,
			[Pt]: operation,
			[Qt]: connection?.user,
			[Nt]: name,
			[Il]: connection?.host ?? extractHostFromConnectionString(connectionString),
			[Ol]: connection?.port ?? extractPortFromConnectionString(connectionString),
			[Dl]: connection?.filename === ":memory:" ? "inproc" : void 0,
			[Ht]: query?.sql != null ? truncate(query.sql, MAX_QUERY_LENGTH) : void 0
		};
		return startInactiveSpan$1({
			name: getName(name, operation, table) ?? "knex.query",
			kind: SPAN_KIND.CLIENT,
			op: "db",
			parentSpan,
			attributes
		});
	}, { beforeSpanEnd(span, data) {
		if ("error" in data) {
			const message = cleanErrorMessage(data);
			if (message !== void 0) span.setStatus({
				code: 2,
				message
			});
		}
	} });
}
function cleanErrorMessage(data) {
	const error = data.error;
	if (!error || typeof error !== "object" || typeof error.message !== "string") return;
	const rawMessage = error.message;
	const query = data.arguments[0];
	if (!query?.sql) return rawMessage;
	try {
		const fullQuery = getFormatter(data.self)(query.sql, query.bindings || []);
		return rawMessage.replace(`${fullQuery} - `, "");
	} catch {
		return rawMessage;
	}
}
function getFormatter(runner) {
	if (runner) {
		const client = runner.client;
		if (client) {
			if (client._formatQuery) return client._formatQuery.bind(client);
			else if (client.SqlString) return client.SqlString.format.bind(client.SqlString);
		}
		if (runner.builder?.toString) return runner.builder.toString.bind(runner.builder);
	}
	return () => "<noop formatter>";
}
function mapSystem(driverName) {
	if (driverName === "sqlite3") return DB_SYSTEM_SQLITE;
	if (driverName === "pg") return DB_SYSTEM_POSTGRESQL$1;
	return driverName;
}
function getName(db, operation, table) {
	if (operation && db) return table ? `${operation} ${db}.${table}` : `${operation} ${db}`;
	return db;
}
function extractTableName(builder) {
	const table = builder?._single?.table;
	if (table && typeof table === "object") return extractTableName(table);
	return typeof table === "string" ? table : void 0;
}
function extractDatabaseFromConnectionString(connectionString) {
	if (!connectionString) return;
	try {
		return new URL(connectionString).pathname?.replace(/^\//, "") || void 0;
	} catch {
		return;
	}
}
function extractHostFromConnectionString(connectionString) {
	if (!connectionString) return;
	try {
		return new URL(connectionString).hostname || void 0;
	} catch {
		return;
	}
}
function extractPortFromConnectionString(connectionString) {
	if (!connectionString) return;
	try {
		const port = new URL(connectionString).port;
		return port ? parseInt(port, 10) : void 0;
	} catch {
		return;
	}
}
var knexChannelIntegration = defineIntegration(_knexChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/langchain.js
var INTEGRATION_NAME$20 = LANGCHAIN_INTEGRATION_NAME;
var SKIPPED_PROVIDERS = [
	OPENAI_INTEGRATION_NAME,
	ANTHROPIC_AI_INTEGRATION_NAME,
	GOOGLE_GENAI_INTEGRATION_NAME
];
var subscribed$3 = false;
function markProvidersSkipped() {
	_INTERNAL_skipAiProviderWrapping(SKIPPED_PROVIDERS);
}
var _langChainChannelIntegration = ((options = {}) => {
	return {
		name: INTEGRATION_NAME$20,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel || subscribed$3) return;
			subscribed$3 = true;
			const sentryHandler = createLangChainCallbackHandler(options);
			const injectHandler = (message) => {
				markProvidersSkipped();
				const args = message.arguments;
				if (!Array.isArray(args)) return;
				let callOptions = args[1];
				if (!callOptions || typeof callOptions !== "object" || Array.isArray(callOptions)) {
					callOptions = {};
					args[1] = callOptions;
				}
				callOptions.callbacks = _INTERNAL_mergeLangChainCallbackHandler(callOptions.callbacks, sentryHandler);
			};
			for (const channelName of [CHANNELS.LANGCHAIN_CHAT_MODEL_INVOKE, CHANNELS.LANGCHAIN_CHAT_MODEL_STREAM]) {
				DEBUG_BUILD && debug$3.log(`[orchestrion:langchain] subscribing to channel "${channelName}"`);
				diagnosticsChannel.tracingChannel(channelName).start.subscribe(injectHandler);
			}
			waitForTracingChannelBinding(() => {
				for (const channelName of langchainEmbeddingsChannels) {
					DEBUG_BUILD && debug$3.log(`[orchestrion:langchain] subscribing to channel "${channelName}"`);
					bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(channelName), (data) => createEmbeddingsSpan(data, options));
				}
			});
		}
	};
});
function createEmbeddingsSpan(data, options) {
	markProvidersSkipped();
	const input = (data.arguments ?? [])[0];
	return startInactiveSpan$1(_INTERNAL_getLangChainEmbeddingsSpanOptions(data.self, input, options));
}
var langChainChannelIntegration = defineIntegration(_langChainChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/langgraph.js
var INTEGRATION_NAME$19 = LANGGRAPH_INTEGRATION_NAME;
var subscribed$2 = false;
var insideCreateReactAgent = false;
var _langGraphChannelIntegration = ((options = {}) => {
	return {
		name: INTEGRATION_NAME$19,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel || subscribed$2) return;
			subscribed$2 = true;
			const resolvedOptions = resolveAIRecordingOptions(options);
			const sentryHandler = createLangChainCallbackHandler(resolvedOptions);
			waitForTracingChannelBinding(() => {
				DEBUG_BUILD && debug$3.log(`[orchestrion:langgraph] subscribing to channel "${CHANNELS.LANGGRAPH_STATE_GRAPH_COMPILE}"`);
				bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(CHANNELS.LANGGRAPH_STATE_GRAPH_COMPILE), (data) => {
					if (insideCreateReactAgent) return;
					const compileOptions = getFirstArgObject(data.arguments);
					const name = typeof compileOptions?.name === "string" ? compileOptions.name : void 0;
					return startInactiveSpan$1(_INTERNAL_getLangGraphCreateAgentSpanOptions(name));
				}, { beforeSpanEnd: (_span, data) => {
					wrapCompiledGraphInvoke(data.result, getFirstArgObject(data.arguments) ?? {}, resolvedOptions, null, sentryHandler);
				} });
				DEBUG_BUILD && debug$3.log(`[orchestrion:langgraph] subscribing to channel "${CHANNELS.LANGGRAPH_CREATE_REACT_AGENT}"`);
				const reactAgentChannel = diagnosticsChannel.tracingChannel(CHANNELS.LANGGRAPH_CREATE_REACT_AGENT);
				reactAgentChannel.start.subscribe((message) => {
					insideCreateReactAgent = true;
					try {
						const { arguments: args } = message;
						const params = getFirstArgObject(args);
						if (params && Array.isArray(params.tools) && params.tools.length > 0) wrapToolsWithSpans(params.tools, resolvedOptions, extractAgentNameFromParams(args) ?? void 0);
					} catch (error) {
						DEBUG_BUILD && debug$3.error("[orchestrion:langgraph] failed to wrap createReactAgent tools", error);
					}
				});
				reactAgentChannel.end.subscribe((message) => {
					insideCreateReactAgent = false;
					const { arguments: args, result } = message;
					const agentName = extractAgentNameFromParams(args) ?? void 0;
					wrapCompiledGraphInvoke(result, agentName ? { name: agentName } : {}, resolvedOptions, extractLLMFromParams(args), sentryHandler);
				});
				reactAgentChannel.error.subscribe(() => {
					insideCreateReactAgent = false;
				});
			});
		}
	};
});
function getFirstArgObject(args) {
	const first = (args ?? [])[0];
	return typeof first === "object" && first !== null ? first : void 0;
}
function wrapCompiledGraphInvoke(graph, compileOptions, options, llm, sentryHandler) {
	if (!graph || typeof graph !== "object") return;
	const compiledGraph = graph;
	const originalInvoke = compiledGraph.invoke;
	if (typeof originalInvoke === "function") compiledGraph.invoke = instrumentCompiledGraphInvoke(originalInvoke.bind(compiledGraph), compiledGraph, compileOptions, options, llm, sentryHandler);
}
var langGraphChannelIntegration = defineIntegration(_langGraphChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/lru-memoizer.js
var INTEGRATION_NAME$18 = "LruMemoizer";
var _lruMemoizerChannelIntegration = (() => {
	return {
		name: INTEGRATION_NAME$18,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			DEBUG_BUILD && debug$3.log(`[orchestrion:lru-memoizer] subscribing to channel "${CHANNELS.LRU_MEMOIZER_LOAD}"`);
			waitForTracingChannelBinding(() => {
				bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(CHANNELS.LRU_MEMOIZER_LOAD), () => void 0);
			});
		}
	};
});
var lruMemoizerChannelIntegration = defineIntegration(_lruMemoizerChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/mongodb.js
var INTEGRATION_NAME$17 = "Mongo";
var ORIGIN$9 = "auto.db.orchestrion.mongo";
var V3_DEDICATED_COMMANDS = /* @__PURE__ */ new Set([
	"insert",
	"update",
	"delete",
	"find",
	"getMore",
	"killCursors"
]);
var _mongodbChannelIntegration = (() => {
	return {
		name: INTEGRATION_NAME$17,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			waitForTracingChannelBinding(() => {
				subscribeV4Command();
				subscribeV4Checkout();
				subscribeV3Wireprotocol();
			});
		}
	};
});
function subscribeV4Command() {
	bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(CHANNELS.MONGODB_COMMAND), (data) => {
		const args = data.arguments ?? [];
		const ns = args[0];
		const cmd = args[1];
		if (!ns || !cmd || typeof cmd !== "object" || cmd.ismaster || cmd.hello) return;
		const operation = Object.keys(cmd)[0];
		return startMongoSpan(getV4SpanAttributes$1(data.self, ns, cmd, operation, ORIGIN$9));
	}, { requiresParentSpan: true });
}
function subscribeV4Checkout() {
	bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(CHANNELS.MONGODB_CHECKOUT), () => void 0);
}
function subscribeV3Wireprotocol() {
	for (const operation of [
		"insert",
		"update",
		"remove"
	]) bindV3(operation === "insert" ? CHANNELS.MONGODB_V3_INSERT : operation === "update" ? CHANNELS.MONGODB_V3_UPDATE : CHANNELS.MONGODB_V3_REMOVE, (args) => ({
		topology: args[0],
		ns: args[1],
		command: args[2]?.[0],
		operation
	}));
	bindV3(CHANNELS.MONGODB_V3_COMMAND, (args) => {
		const command = args[2];
		const type = command ? Object.keys(command)[0] : void 0;
		if (type && V3_DEDICATED_COMMANDS.has(type)) return;
		return {
			topology: args[0],
			ns: args[1],
			command,
			operation: command ? getV3CommandOperation(command) : void 0
		};
	});
	bindV3(CHANNELS.MONGODB_V3_QUERY, (args) => ({
		topology: args[0],
		ns: args[1],
		command: args[2],
		operation: "find"
	}));
	bindV3(CHANNELS.MONGODB_V3_GET_MORE, (args) => ({
		topology: args[0],
		ns: args[1],
		command: args[2]?.cmd,
		operation: "getMore"
	}));
}
function bindV3(channelName, extract) {
	bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(channelName), (data) => {
		const args = data.arguments;
		if (!args) return;
		const info = extract(args);
		if (!info || typeof info.ns !== "string") return;
		return startMongoSpan(getV3SpanAttributes$1(info.ns, info.topology, info.command, info.operation, ORIGIN$9));
	}, { requiresParentSpan: true });
}
var mongodbChannelIntegration = defineIntegration(_mongodbChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/mongoose.js
var INTEGRATION_NAME$16 = "Mongoose";
var ORIGIN$8 = "auto.db.orchestrion.mongoose";
var STORED_PARENT_SPAN = /* @__PURE__ */ new WeakMap();
var orchestrionSubscribed = false;
var _mongooseChannelIntegration = (() => {
	return {
		name: INTEGRATION_NAME$16,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			waitForTracingChannelBinding(() => {
				subscribeMongooseDiagnosticChannels(diagnosticsChannel.tracingChannel);
				subscribeOrchestrionMongooseChannels();
			});
		}
	};
});
function subscribeOrchestrionMongooseChannels() {
	if (orchestrionSubscribed) return;
	orchestrionSubscribed = true;
	DEBUG_BUILD && debug$3.log("[orchestrion:mongoose] subscribing to injected channels");
	for (const channelName of MONGOOSE_CONTEXT_CAPTURE_CHANNELS) channel(channelName).subscribe({ start(message) {
		stashParentSpan(message.self);
	} });
	channel(CHANNELS.MONGOOSE_MODEL_AGGREGATE).subscribe({ end(message) {
		const result = message.result;
		if (result && typeof result === "object") stashParentSpan(result);
	} });
	bindExecSpan(CHANNELS.MONGOOSE_QUERY_EXEC, (self) => {
		const query = self;
		return startSpan(query.mongooseCollection, query.model?.modelName, query.op ?? "exec", STORED_PARENT_SPAN.get(self));
	});
	bindExecSpan(CHANNELS.MONGOOSE_AGGREGATE_EXEC, (self) => {
		const model = self._model;
		return startSpan(model?.collection, model?.modelName, "aggregate", STORED_PARENT_SPAN.get(self));
	});
	bindExecSpan(CHANNELS.MONGOOSE_MODEL_SAVE, (self) => {
		const ctor = self.constructor;
		return startSpan(ctor.collection, ctor.modelName, "save");
	});
	bindExecSpan(CHANNELS.MONGOOSE_MODEL_REMOVE, (self) => {
		const ctor = self.constructor;
		return startSpan(ctor.collection, ctor.modelName, "remove");
	});
	bindExecSpan(CHANNELS.MONGOOSE_MODEL_INSERT_MANY, (self) => {
		const model = self;
		return startSpan(model.collection, model.modelName, "insertMany");
	});
	bindExecSpan(CHANNELS.MONGOOSE_MODEL_BULK_WRITE, (self) => {
		const model = self;
		return startSpan(model.collection, model.modelName, "bulkWrite");
	});
}
function startSpan(collection, modelName, operation, parentSpan) {
	return startMongooseLegacySpan({
		collection,
		modelName,
		operation,
		origin: ORIGIN$8,
		parentSpan
	});
}
function channel(channelName) {
	return diagnosticsChannel.tracingChannel(channelName);
}
function bindExecSpan(channelName, getSpan) {
	bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(channelName), (data) => {
		const self = data.self;
		if (!self) return;
		return getSpan(self);
	});
}
function stashParentSpan(self) {
	const active = getActiveSpan$1();
	if (self && active) STORED_PARENT_SPAN.set(self, active);
}
var mongooseChannelIntegration = defineIntegration(_mongooseChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/mysql.js
var INTEGRATION_NAME$15 = "Mysql";
var ATTR_DB_SYSTEM$1 = "db.system";
var ATTR_DB_CONNECTION_STRING$2 = "db.connection_string";
var ATTR_DB_NAME$1 = "db.name";
var ATTR_DB_USER$1 = "db.user";
var ATTR_DB_STATEMENT$1 = "db.statement";
var ATTR_NET_PEER_NAME$1 = "net.peer.name";
var ATTR_NET_PEER_PORT$1 = "net.peer.port";
var _mysqlChannelIntegration = (() => {
	return {
		name: INTEGRATION_NAME$15,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			DEBUG_BUILD && debug$3.log(`[orchestrion:mysql] subscribing to channel "${CHANNELS.MYSQL_QUERY}"`);
			waitForTracingChannelBinding(() => {
				bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(CHANNELS.MYSQL_QUERY), (data) => {
					const sql = extractSql$2(data.arguments[0]);
					const { host, port, database, user } = getConnectionConfig(data.self);
					const portNumber = typeof port === "string" ? parseInt(port, 10) : port;
					const portIsNumber = typeof portNumber === "number" && !isNaN(portNumber);
					data._sentryCallerScope = getCurrentScope();
					return startInactiveSpan$1({
						name: sql ?? "mysql.query",
						kind: SPAN_KIND.CLIENT,
						op: "db",
						attributes: {
							[ATTR_DB_SYSTEM$1]: "mysql",
							[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.db.orchestrion.mysql",
							[ATTR_DB_CONNECTION_STRING$2]: getJDBCString(host, portIsNumber ? portNumber : void 0, database),
							...database ? { [ATTR_DB_NAME$1]: database } : {},
							...user ? { [ATTR_DB_USER$1]: user } : {},
							...sql ? { [ATTR_DB_STATEMENT$1]: sql } : {},
							...host ? { [ATTR_NET_PEER_NAME$1]: host } : {},
							...portIsNumber ? { [ATTR_NET_PEER_PORT$1]: portNumber } : {}
						}
					});
				}, { deferSpanEnd({ data, end }) {
					const result = data.result;
					if (!result || typeof result !== "object" || !hasOnMethod$1(result)) return false;
					const callerScope = data._sentryCallerScope;
					if (callerScope) bindScopeToEmitter(result, callerScope);
					result.on("error", (err) => end(err));
					result.on("end", () => end());
					return true;
				} });
			});
		}
	};
});
function hasOnMethod$1(obj) {
	return "on" in obj && typeof obj.on === "function";
}
function extractSql$2(firstArg) {
	if (typeof firstArg === "string") return firstArg;
	if (isObjectLike(firstArg) && "sql" in firstArg) {
		const sql = firstArg.sql;
		return typeof sql === "string" ? sql : void 0;
	}
}
function getConnectionConfig(connection) {
	const config = connection?.config?.connectionConfig ?? connection?.config ?? {};
	return {
		host: config.host,
		port: config.port,
		database: config.database,
		user: config.user
	};
}
function getJDBCString(host, port, database) {
	let s = `jdbc:mysql://${host || "localhost"}`;
	if (typeof port === "number") s += `:${port}`;
	if (database) s += `/${database}`;
	return s;
}
var mysqlChannelIntegration = defineIntegration(_mysqlChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/mysql2.js
var INTEGRATION_NAME$14 = "Mysql2";
var ORIGIN$7 = "auto.db.orchestrion.mysql2";
var DB_SYSTEM_VALUE_MYSQL = "mysql";
function instrumentMysql2() {
	subscribeMysql2DiagnosticChannels(diagnosticsChannel.tracingChannel);
	subscribeQueryChannel(CHANNELS.MYSQL2_QUERY);
	subscribeQueryChannel(CHANNELS.MYSQL2_EXECUTE);
}
function subscribeQueryChannel(channelName) {
	bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(channelName), (data) => {
		const statement = getQueryText(data.arguments);
		return startInactiveSpan$1({
			name: statement ?? "mysql2.query",
			kind: SPAN_KIND.CLIENT,
			attributes: {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$7,
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "db",
				[Kt]: DB_SYSTEM_VALUE_MYSQL,
				...getConnectionAttributes$1(data.self?.config),
				[Ht]: statement || void 0
			}
		});
	}, { requiresParentSpan: true });
}
function getQueryText(args) {
	return extractSql$1(args[0]);
}
function extractSql$1(firstArg) {
	if (typeof firstArg === "string") return firstArg;
	if (isObjectLike(firstArg) && "sql" in firstArg) {
		const sql = firstArg.sql;
		return typeof sql === "string" ? sql : void 0;
	}
}
function getConnectionAttributes$1(config) {
	const { host, port, database, user } = config?.connectionConfig ?? config ?? {};
	const portNumber = typeof port === "string" ? parseInt(port, 10) : port;
	const portIsNumber = typeof portNumber === "number" && !isNaN(portNumber);
	return {
		[Nt]: database || void 0,
		[Qt]: user || void 0,
		[Il]: host || void 0,
		[Ol]: portIsNumber ? portNumber : void 0
	};
}
var _mysql2ChannelIntegration = (() => {
	return {
		name: INTEGRATION_NAME$14,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			waitForTracingChannelBinding(() => {
				instrumentMysql2();
			});
		}
	};
});
var mysql2ChannelIntegration = defineIntegration(_mysql2ChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/openai.js
var INTEGRATION_NAME$13 = "OpenAI";
var ORIGIN$6 = "auto.ai.orchestrion.openai";
var INSTRUMENTED_CHANNELS = [{
	channel: CHANNELS.OPENAI_CHAT,
	operation: "chat"
}, {
	channel: CHANNELS.OPENAI_EMBEDDINGS,
	operation: "embeddings"
}];
var subscribed$1 = false;
var _openaiChannelIntegration = ((options = {}) => {
	return {
		name: INTEGRATION_NAME$13,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel || subscribed$1) return;
			subscribed$1 = true;
			waitForTracingChannelBinding(() => {
				for (const { channel, operation } of INSTRUMENTED_CHANNELS) {
					DEBUG_BUILD && debug$3.log(`[orchestrion:openai] subscribing to channel "${channel}"`);
					bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(channel), (data) => createGenAiSpan(data, operation, options), {
						beforeSpanEnd: (span, data) => {
							addResponseAttributes$2(span, data.result, resolveAIRecordingOptions(options).recordOutputs);
						},
						deferSpanEnd: ({ span, data }) => wrapStreamResult(span, data, options)
					});
				}
			});
		}
	};
});
function createGenAiSpan(data, operation, options) {
	if (_INTERNAL_shouldSkipAiProviderWrapping(INTEGRATION_NAME$13)) return;
	const args = data.arguments ?? [];
	const params = args[0];
	const { recordInputs } = resolveAIRecordingOptions(options);
	const enableTruncation = shouldEnableTruncation(options.enableTruncation);
	const attributes = extractRequestAttributes$2(args, operation);
	attributes[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN] = ORIGIN$6;
	const model = params?.model || "unknown";
	const span = startInactiveSpan$1({
		name: `${operation} ${model}`,
		op: `gen_ai.${operation}`,
		attributes
	});
	if (recordInputs && params) addRequestAttributes(span, params, operation, enableTruncation);
	return span;
}
function isAsyncIterable(value) {
	return !!value && typeof value[Symbol.asyncIterator] === "function";
}
function wrapStreamResult(span, data, options) {
	const result = data.result;
	if (!isAsyncIterable(result)) return false;
	const { recordOutputs } = resolveAIRecordingOptions(options);
	const iterate = result[Symbol.asyncIterator].bind(result);
	const instrumented = instrumentStream$1({ [Symbol.asyncIterator]: iterate }, span, recordOutputs ?? false);
	result[Symbol.asyncIterator] = () => instrumented;
	return true;
}
var openaiChannelIntegration = defineIntegration(_openaiChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/postgres.js
var INTEGRATION_NAME$12 = "Postgres";
var ORIGIN$5 = "auto.db.orchestrion.postgres";
var ATTR_DB_SYSTEM = "db.system";
var ATTR_DB_NAME = "db.name";
var ATTR_DB_CONNECTION_STRING$1 = "db.connection_string";
var ATTR_DB_USER = "db.user";
var ATTR_DB_STATEMENT = "db.statement";
var ATTR_NET_PEER_NAME = "net.peer.name";
var ATTR_NET_PEER_PORT = "net.peer.port";
var ATTR_PG_PLAN = "db.postgresql.plan";
var ATTR_PG_IDLE_TIMEOUT = "db.postgresql.idle.timeout.millis";
var ATTR_PG_MAX_CLIENT = "db.postgresql.max.client";
var DB_SYSTEM_POSTGRESQL = "postgresql";
var SPAN_QUERY_FALLBACK = "pg.query";
var SPAN_CONNECT = "pg.connect";
var SPAN_POOL_CONNECT = "pg-pool.connect";
var _postgresChannelIntegration = ((options = {}) => {
	return {
		name: INTEGRATION_NAME$12,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			waitForTracingChannelBinding(() => {
				subscribeQueryLikeChannel(CHANNELS.PG_QUERY, querySpanOptions, { deferStreamedResult: true });
				if (!options.ignoreConnectSpans) {
					subscribeQueryLikeChannel(CHANNELS.PG_CONNECT, connectSpanOptions);
					subscribeQueryLikeChannel(CHANNELS.PGPOOL_CONNECT, poolConnectSpanOptions);
				}
			});
		}
	};
});
function subscribeQueryLikeChannel(channelName, getSpanOptions, { deferStreamedResult = false } = {}) {
	DEBUG_BUILD && debug$3.log(`[orchestrion:pg] subscribing to channel "${channelName}"`);
	bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(channelName), (data) => {
		data._sentryCallerScope = getCurrentScope();
		return startInactiveSpan$1({
			...getSpanOptions(data),
			kind: SPAN_KIND.CLIENT
		});
	}, deferStreamedResult ? {
		requiresParentSpan: true,
		deferSpanEnd({ data, end }) {
			const result = data.result;
			if (!result || typeof result !== "object" || !hasOnMethod(result)) return false;
			const callerScope = data._sentryCallerScope;
			if (callerScope) bindScopeToEmitter(result, callerScope);
			result.on("error", (err) => end(err));
			result.on("end", () => end());
			return true;
		}
	} : { requiresParentSpan: true });
}
function querySpanOptions(ctx) {
	const params = ctx.self?.connectionParameters ?? {};
	const queryConfig = extractQueryConfig(ctx.arguments);
	return {
		name: queryConfig?.text ?? SPAN_QUERY_FALLBACK,
		op: "db",
		attributes: {
			...getConnectionAttributes(params),
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$5,
			[ATTR_DB_STATEMENT]: queryConfig?.text || void 0,
			[ATTR_PG_PLAN]: typeof queryConfig?.name === "string" ? queryConfig.name : void 0
		}
	};
}
function connectSpanOptions(ctx) {
	return {
		name: SPAN_CONNECT,
		op: "db",
		attributes: getConnectionAttributes(ctx.self?.connectionParameters ?? {})
	};
}
function poolConnectSpanOptions(ctx) {
	return {
		name: SPAN_POOL_CONNECT,
		op: "db",
		attributes: getPoolConnectionAttributes(ctx.self?.options ?? {})
	};
}
function hasOnMethod(obj) {
	return "on" in obj && typeof obj.on === "function";
}
function extractQueryConfig(args) {
	const arg0 = args[0];
	if (typeof arg0 === "string") return { text: arg0 };
	if (isObjectLike(arg0) && typeof arg0.text === "string") {
		const obj = arg0;
		return {
			text: obj.text,
			name: obj.name
		};
	}
}
function getConnectionAttributes(params) {
	return {
		[ATTR_DB_SYSTEM]: DB_SYSTEM_POSTGRESQL,
		[ATTR_DB_CONNECTION_STRING$1]: getConnectionString(params),
		[ATTR_DB_NAME]: params.database,
		[ATTR_DB_USER]: params.user,
		[ATTR_NET_PEER_NAME]: params.host,
		[ATTR_NET_PEER_PORT]: Number.isInteger(params.port) ? params.port : void 0
	};
}
function getPoolConnectionAttributes(opts) {
	let url;
	try {
		url = opts.connectionString ? new URL(opts.connectionString) : void 0;
	} catch {
		url = void 0;
	}
	const database = url?.pathname.slice(1) || opts.database;
	const host = url?.hostname || opts.host;
	const port = Number(url?.port) || (Number.isInteger(opts.port) ? opts.port : void 0);
	const user = url?.username || opts.user;
	return {
		[ATTR_DB_SYSTEM]: DB_SYSTEM_POSTGRESQL,
		[ATTR_DB_CONNECTION_STRING$1]: getConnectionString(opts),
		[ATTR_PG_IDLE_TIMEOUT]: opts.idleTimeoutMillis,
		[ATTR_PG_MAX_CLIENT]: opts.max,
		[ATTR_DB_NAME]: database,
		[ATTR_NET_PEER_PORT]: port,
		[ATTR_NET_PEER_NAME]: host || void 0,
		[ATTR_DB_USER]: user || void 0
	};
}
function getConnectionString(params) {
	if (params.connectionString) try {
		const url = new URL(params.connectionString);
		url.username = "";
		url.password = "";
		return url.toString();
	} catch {
		return "postgresql://localhost:5432/";
	}
	return `postgresql://${params.host || "localhost"}:${params.port || 5432}/${params.database || ""}`;
}
var postgresChannelIntegration = defineIntegration(_postgresChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/postgres-js.js
var INTEGRATION_NAME$11 = "PostgresJs";
var ORIGIN$4 = "auto.db.orchestrion.postgresjs";
var DB_RESPONSE_STATUS_CODE = "db.response.status_code";
var NOOP$2 = () => {};
var QUERY_FROM_INSTRUMENTED_SQL = /* @__PURE__ */ Symbol.for("sentry.query.from.instrumented.sql");
var QUERY_SPAN = /* @__PURE__ */ Symbol("sentryPostgresJsSpan");
var CONNECTION_ATTRS_SET = /* @__PURE__ */ Symbol("sentryPostgresJsConnectionAttrsSet");
var SPAN_ENDED = /* @__PURE__ */ Symbol("sentryPostgresJsSpanEnded");
var connectionContexts = /* @__PURE__ */ new WeakMap();
var endpointRegistry = [];
function registerEndpoint(context) {
	if (!endpointRegistry.some((e) => e.ATTR_SERVER_ADDRESS === context.ATTR_SERVER_ADDRESS && e.ATTR_SERVER_PORT === context.ATTR_SERVER_PORT && e.ATTR_DB_NAMESPACE === context.ATTR_DB_NAMESPACE)) endpointRegistry.push(context);
}
function resolveSingleEndpoint() {
	return endpointRegistry.length === 1 ? endpointRegistry[0] : void 0;
}
function recordConnectionFromChannel(message) {
	const connection = message.result;
	const options = message.arguments?.[0];
	if (!connection || typeof connection !== "object" || !options) return;
	const context = _buildConnectionContext(options);
	connectionContexts.set(connection, context);
	registerEndpoint(context);
}
function setConnectionAttributes(span, query, context) {
	const queryRecord = query;
	if (queryRecord[CONNECTION_ATTRS_SET]) return;
	queryRecord[CONNECTION_ATTRS_SET] = true;
	_setConnectionAttributes(span, context);
}
function attachConnectionAttributesFromChannel(message) {
	const connection = message.self;
	const query = message.arguments?.[0];
	if (!connection || !query) return;
	const span = query[QUERY_SPAN];
	const context = connectionContexts.get(connection);
	if (span && context) setConnectionAttributes(span, query, context);
}
function wrapQuerySettlement(data, span, sanitizedSqlQuery) {
	const query = data.self;
	if (!query) return;
	const markEnded = () => {
		data[SPAN_ENDED] = true;
	};
	const originalResolve = query.resolve;
	if (typeof originalResolve === "function") query.resolve = function(...resolveArgs) {
		markEnded();
		try {
			const command = resolveArgs[0]?.command;
			_setOperationName(span, sanitizedSqlQuery, command);
			span.end();
		} catch (e) {
			DEBUG_BUILD && debug$3.error("[orchestrion:postgresjs] error ending span in resolve:", e);
		}
		return originalResolve.apply(this, resolveArgs);
	};
	const originalReject = query.reject;
	if (typeof originalReject === "function") query.reject = function(...rejectArgs) {
		markEnded();
		try {
			const err = rejectArgs[0];
			span.setStatus({
				code: 2,
				message: err?.message || "unknown_error"
			});
			span.setAttribute(DB_RESPONSE_STATUS_CODE, err?.code || "unknown");
			span.setAttribute(Gn, err?.name || "unknown");
			_setOperationName(span, sanitizedSqlQuery);
			span.end();
		} catch (e) {
			DEBUG_BUILD && debug$3.error("[orchestrion:postgresjs] error ending span in reject:", e);
		}
		return originalReject.apply(this, rejectArgs);
	};
}
var _postgresJsChannelIntegration = ((options = {}) => {
	const { requireParentSpan, requestHook } = options;
	return {
		name: INTEGRATION_NAME$11,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			DEBUG_BUILD && debug$3.log(`[orchestrion:postgresjs] subscribing to "${CHANNELS.POSTGRESJS_HANDLE}"`);
			diagnosticsChannel.tracingChannel(CHANNELS.POSTGRESJS_CONNECTION).subscribe({
				start: NOOP$2,
				asyncStart: NOOP$2,
				asyncEnd: NOOP$2,
				error: NOOP$2,
				end: recordConnectionFromChannel
			});
			diagnosticsChannel.tracingChannel(CHANNELS.POSTGRESJS_EXECUTE).subscribe({
				end: NOOP$2,
				asyncStart: NOOP$2,
				asyncEnd: NOOP$2,
				error: NOOP$2,
				start: attachConnectionAttributesFromChannel
			});
			diagnosticsChannel.tracingChannel(CHANNELS.POSTGRESJS_CONNECT).subscribe({
				end: NOOP$2,
				asyncStart: NOOP$2,
				asyncEnd: NOOP$2,
				error: NOOP$2,
				start: attachConnectionAttributesFromChannel
			});
			waitForTracingChannelBinding(() => {
				bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(CHANNELS.POSTGRESJS_HANDLE), (data) => {
					const query = data.self;
					if (!query) return;
					if (query.executed === true || query[QUERY_FROM_INSTRUMENTED_SQL]) return;
					const fullQuery = _reconstructQuery(query.strings);
					const sanitizedSqlQuery = _sanitizeSqlQuery(fullQuery);
					const span = startInactiveSpan$1({
						name: sanitizedSqlQuery || "postgresjs.query",
						op: "db",
						kind: SPAN_KIND.CLIENT,
						attributes: {
							[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$4,
							[jt]: "postgres",
							[Gt]: sanitizedSqlQuery
						}
					});
					query[QUERY_SPAN] = span;
					const context = resolveSingleEndpoint();
					if (context) setConnectionAttributes(span, query, context);
					if (requestHook) try {
						requestHook(span, sanitizedSqlQuery, context);
					} catch (e) {
						span.setAttribute("sentry.hook.error", "requestHook failed");
						DEBUG_BUILD && debug$3.error("[orchestrion:postgresjs] error in requestHook:", e);
					}
					wrapQuerySettlement(data, span, sanitizedSqlQuery);
					return span;
				}, {
					requiresParentSpan: requireParentSpan !== false,
					deferSpanEnd({ data }) {
						if (data[SPAN_ENDED]) return true;
						if ("error" in data) return false;
						return true;
					}
				});
			});
		}
	};
});
var postgresJsChannelIntegration = defineIntegration(_postgresJsChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/tedious.js
var INTEGRATION_NAME$10 = "Tedious";
var ORIGIN$3 = "auto.db.orchestrion.tedious";
var DB_SYSTEM_VALUE_MSSQL$1 = "mssql";
var ATTR_DB_SQL_TABLE$1 = "db.sql.table";
var currentDatabaseSymbol = /* @__PURE__ */ Symbol("sentry.orchestrion.tedious.current-database");
function setDatabase$1(databaseName) {
	Object.defineProperty(this, currentDatabaseSymbol, {
		value: databaseName,
		writable: true,
		configurable: true
	});
}
function removeDatabaseListener() {
	this.removeListener("databaseChange", setDatabase$1);
}
function subscribeConnect() {
	diagnosticsChannel.tracingChannel(CHANNELS.TEDIOUS_CONNECT).start.subscribe((message) => {
		const connection = message.self;
		if (!connection) return;
		setDatabase$1.call(connection, connection.config?.options?.database);
		connection.removeListener("databaseChange", setDatabase$1);
		connection.on("databaseChange", setDatabase$1);
		connection.removeListener("end", removeDatabaseListener);
		connection.once("end", removeDatabaseListener);
	});
}
function subscribeQuery(channelName, operation) {
	diagnosticsChannel.tracingChannel(channelName).start.subscribe((message) => {
		const data = message;
		const connection = data.self;
		const request = data.arguments[0];
		if (!connection || !(request instanceof EventEmitter)) return;
		let procCount = 0;
		let statementCount = 0;
		const incrementStatementCount = () => {
			statementCount++;
		};
		const incrementProcCount = () => {
			procCount++;
		};
		const databaseName = connection[currentDatabaseSymbol];
		const sql = extractSql(request);
		const attributes = {
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$3,
			[Kt]: DB_SYSTEM_VALUE_MSSQL$1,
			[Nt]: databaseName,
			[Qt]: connection.config?.userName ?? connection.config?.authentication?.options?.userName,
			[Ht]: sql,
			[ATTR_DB_SQL_TABLE$1]: request.table,
			[Il]: connection.config?.server,
			[Ol]: connection.config?.options?.port
		};
		const span = startInactiveSpan$1({
			name: getSpanName$2(operation, databaseName, sql, request.table),
			kind: SPAN_KIND.CLIENT,
			op: "db",
			attributes
		});
		const endSpan = once$1((err) => {
			request.removeListener("done", incrementStatementCount);
			request.removeListener("doneInProc", incrementStatementCount);
			request.removeListener("doneProc", incrementProcCount);
			request.removeListener("error", endSpan);
			connection.removeListener("end", endSpan);
			span.setAttribute("tedious.procedure_count", procCount);
			span.setAttribute("tedious.statement_count", statementCount);
			if (err) span.setStatus({
				code: 2,
				message: err.message
			});
			span.end();
		});
		request.on("done", incrementStatementCount);
		request.on("doneInProc", incrementStatementCount);
		request.on("doneProc", incrementProcCount);
		request.once("error", endSpan);
		connection.on("end", endSpan);
		if (typeof request.callback === "function") {
			const originalCallback = request.callback;
			request.callback = function(...args) {
				endSpan(args[0]);
				return originalCallback.apply(this, args);
			};
		}
	});
}
function extractSql(request) {
	if (request.sqlTextOrProcedure === "sp_prepare" && request.parametersByName?.stmt?.value != null) {
		const value = request.parametersByName.stmt.value;
		return typeof value === "string" ? value : void 0;
	}
	return request.sqlTextOrProcedure;
}
function getSpanName$2(operation, db, sql, bulkLoadTable) {
	if (operation === "execBulkLoad" && bulkLoadTable && db) return `${operation} ${bulkLoadTable} ${db}`;
	if (operation === "callProcedure") return db ? `${operation} ${sql} ${db}` : `${operation} ${sql}`;
	return db ? `${operation} ${db}` : operation;
}
function once$1(fn) {
	let called = false;
	return (...args) => {
		if (called) return;
		called = true;
		fn(...args);
	};
}
var _tediousChannelIntegration = (() => {
	return {
		name: INTEGRATION_NAME$10,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			DEBUG_BUILD && debug$3.log(`[orchestrion:tedious] subscribing to channel "${CHANNELS.TEDIOUS_EXEC_SQL}"`);
			waitForTracingChannelBinding(() => {
				subscribeConnect();
				subscribeQuery(CHANNELS.TEDIOUS_EXEC_SQL, "execSql");
				subscribeQuery(CHANNELS.TEDIOUS_EXEC_SQL_BATCH, "execSqlBatch");
				subscribeQuery(CHANNELS.TEDIOUS_CALL_PROCEDURE, "callProcedure");
				subscribeQuery(CHANNELS.TEDIOUS_EXEC_BULK_LOAD, "execBulkLoad");
				subscribeQuery(CHANNELS.TEDIOUS_PREPARE, "prepare");
				subscribeQuery(CHANNELS.TEDIOUS_EXECUTE, "execute");
			});
		}
	};
});
var tediousChannelIntegration = defineIntegration(_tediousChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vercel-ai/vercel-ai-orchestrion-subscriber.js
var PATCHED = /* @__PURE__ */ Symbol("SentryVercelAiModelPatched");
var TOOL_PATCHED = /* @__PURE__ */ Symbol("SentryVercelAiToolPatched");
var callIdCounter = 0;
function nextCallId() {
	return `v6-${++callIdCounter}`;
}
var messages = /* @__PURE__ */ new WeakMap();
var operationSpans = /* @__PURE__ */ new WeakSet();
var toolCallSpans = /* @__PURE__ */ new WeakSet();
var callIdBySpan = /* @__PURE__ */ new WeakMap();
var recordingBySpan = /* @__PURE__ */ new WeakMap();
var operationErrorInfoBySpan = /* @__PURE__ */ new WeakMap();
var suppressedTelemetry = /* @__PURE__ */ new WeakSet();
var subscribed = false;
function subscribeVercelAiOrchestrionChannels(tracingChannel, options = {}) {
	if (subscribed) return;
	subscribed = true;
	try {
		bindOperation(tracingChannel, CHANNELS.VERCEL_AI_GENERATE_TEXT, buildTextMessage("generateText"), options);
		bindOperation(tracingChannel, CHANNELS.VERCEL_AI_STREAM_TEXT, buildTextMessage("streamText"), options);
		bindOperation(tracingChannel, CHANNELS.VERCEL_AI_GENERATE_OBJECT, buildTextMessage("generateObject"), options);
		bindOperation(tracingChannel, CHANNELS.VERCEL_AI_EMBED, (callOptions, telemetry) => ({
			type: "embed",
			event: {
				callId: nextCallId(),
				...modelFields(callOptions.model),
				maxRetries: callOptions.maxRetries,
				value: callOptions.value,
				...recording(telemetry)
			}
		}), options);
		bindOperation(tracingChannel, CHANNELS.VERCEL_AI_EMBED_MANY, (callOptions, telemetry) => ({
			type: "embedMany",
			event: {
				callId: nextCallId(),
				...modelFields(callOptions.model),
				maxRetries: callOptions.maxRetries,
				values: callOptions.values,
				...recording(telemetry)
			}
		}), options);
		bindOperation(tracingChannel, CHANNELS.VERCEL_AI_EXECUTE_TOOL_CALL, (callOptions, telemetry) => ({
			type: "executeTool",
			event: {
				callId: nextCallId(),
				toolCall: callOptions.toolCall,
				tools: callOptions.tools,
				...recording(telemetry)
			}
		}), options);
		subscribeResolveLanguageModel(tracingChannel, CHANNELS.VERCEL_AI_RESOLVE_LANGUAGE_MODEL, options);
	} catch {
		DEBUG_BUILD && debug$3.log("Vercel AI orchestrion channel subscription failed.");
	}
}
function bindOperation(tracingChannel, channelName, build, options) {
	const channel = tracingChannel(channelName);
	const buildOperationSpan = (data) => {
		const callOptions = isObjectLike(data.arguments[0]) ? data.arguments[0] : {};
		const telemetry = isObjectLike(callOptions.experimental_telemetry) ? callOptions.experimental_telemetry : {};
		if (telemetry.isEnabled === false && !suppressedTelemetry.has(telemetry)) return;
		const message = build(callOptions, telemetry);
		suppressNativeTelemetry(callOptions, telemetry);
		const callSiteSpan = getActiveSpan$1();
		const span = createSpanFromMessage(message, options);
		if (span) {
			messages.set(data, message);
			operationSpans.add(span);
			const isV4 = isObjectLike(callOptions.model) && callOptions.model.specificationVersion === "v1";
			operationErrorInfoBySpan.set(span, {
				callSiteSpan,
				toolErrorsBubbleToCaller: isV4
			});
			if (message.type === "executeTool") toolCallSpans.add(span);
			const callId = asString(message.event.callId);
			if (callId) callIdBySpan.set(span, callId);
			recordingBySpan.set(span, recording(telemetry));
			if (isObjectLike(callOptions.tools)) patchOperationTools(callOptions.tools, options);
			if (isV4) patchModelMethods(callOptions.model, options);
		}
		return span;
	};
	bindTracingChannelToSpan(channel, (data) => buildOperationSpan(data), {
		beforeSpanEnd: (span, data) => {
			const message = messages.get(data);
			if (!message) return;
			if ("error" in data) {
				const callSiteSpan = operationErrorInfoBySpan.get(span)?.callSiteSpan;
				if (callSiteSpan && isObjectLike(data.error)) addNonEnumerableProperty(data.error, "_sentry_active_span", callSiteSpan);
			} else {
				message.result = message.type === "executeTool" ? { output: data.result } : data.result;
				enrichSpanOnEnd(span, message, options);
			}
			if (message.type !== "streamText") clearOperationId(message);
			messages.delete(data);
		},
		deferSpanEnd: ({ data, end }) => deferStreamTextOperationEnd(data, end)
	});
}
function deferStreamTextOperationEnd(data, end) {
	if (messages.get(data)?.type !== "streamText" || "error" in data || !isStreamingResult(data.result)) return false;
	const streamResult = data.result;
	(async () => {
		try {
			const [usage, text, toolCalls, finishReason, response] = await Promise.all([
				streamResult.totalUsage ?? streamResult.usage,
				streamResult.text,
				streamResult.toolCalls,
				streamResult.finishReason,
				streamResult.response
			]);
			data.result = {
				usage,
				text,
				toolCalls,
				finishReason,
				response
			};
			end();
		} catch (error) {
			end(error);
		}
	})();
	return true;
}
function isStreamingResult(result) {
	return isObjectLike(result) && (isThenable(result.totalUsage) || isThenable(result.usage));
}
function isThenable(value) {
	return isObjectLike(value) && typeof value.then === "function";
}
function suppressNativeTelemetry(callOptions, telemetry) {
	if (telemetry.isEnabled !== true) return;
	const suppressed = {
		...telemetry,
		isEnabled: false
	};
	suppressedTelemetry.add(suppressed);
	callOptions.experimental_telemetry = suppressed;
}
function subscribeResolveLanguageModel(tracingChannel, channelName, options) {
	tracingChannel(channelName).subscribe({
		end(rawCtx) {
			const ctx = rawCtx;
			if (!isObjectLike(ctx.result)) return;
			patchModelMethods(ctx.result, options);
		},
		start() {},
		asyncStart() {},
		asyncEnd() {},
		error() {}
	});
}
function resolveModelCallParent() {
	const active = getActiveSpan$1();
	return active && operationSpans.has(active) ? active : void 0;
}
function patchModelMethods(model, options) {
	if (model[PATCHED]) return;
	model[PATCHED] = true;
	patchModelMethod(model, "doGenerate", options);
	patchModelMethod(model, "doStream", options);
}
function patchModelMethod(model, method, options) {
	const original = model[method];
	if (typeof original !== "function") return;
	model[method] = function(...args) {
		const parent = resolveModelCallParent();
		if (!parent) return Promise.resolve(original.apply(this, args));
		const callArgs = isObjectLike(args[0]) ? args[0] : {};
		const callId = callIdBySpan.get(parent);
		const message = {
			type: "languageModelCall",
			event: {
				callId,
				provider: model.provider,
				modelId: model.modelId,
				tools: callArgs.tools ?? (isObjectLike(callArgs.mode) ? callArgs.mode.tools : void 0),
				messages: callArgs.prompt,
				...recordingBySpan.get(parent)
			}
		};
		const span = withActiveSpan$1(parent, () => createSpanFromMessage(message, options));
		if (!span) return Promise.resolve(original.apply(this, args));
		const clearStreamCallId = () => {
			if (method === "doStream" && callId) clearOperationCallId(callId);
		};
		const failSpan = (error) => {
			span.setStatus({
				code: 2,
				message: error instanceof Error ? error.message : "unknown_error"
			});
			span.end();
			clearStreamCallId();
			throw error;
		};
		try {
			return Promise.resolve(original.apply(this, args)).then((value) => {
				if (method === "doStream" && isObjectLike(value) && isReadableStream(value.stream)) {
					value.stream = tapModelCallStream(value.stream, (final) => {
						message.result = {
							...value,
							...streamedResultToChannelResult(final)
						};
						enrichSpanOnEnd(span, message, options);
						span.end();
						clearStreamCallId();
					}, (error) => {
						span.setStatus({
							code: 2,
							message: error instanceof Error ? error.message : "unknown_error"
						});
						span.end();
						clearStreamCallId();
					});
					return value;
				}
				message.result = value;
				enrichSpanOnEnd(span, message, options);
				span.end();
				clearStreamCallId();
				return value;
			}, failSpan);
		} catch (error) {
			return failSpan(error);
		}
	};
}
function patchOperationTools(tools, options) {
	try {
		for (const [toolName, tool] of Object.entries(tools)) if (isObjectLike(tool)) patchToolExecute(toolName, tool, tools, options);
	} catch {
		DEBUG_BUILD && debug$3.log("Vercel AI orchestrion tool patching failed.");
	}
}
function patchToolExecute(toolName, tool, tools, options) {
	const original = tool.execute;
	if (typeof original !== "function" || tool[TOOL_PATCHED]) return;
	tool[TOOL_PATCHED] = true;
	tool.execute = function(input, ...rest) {
		const parent = resolveModelCallParent();
		if (!parent || toolCallSpans.has(parent)) return original.apply(this, [input, ...rest]);
		const callOptions = isObjectLike(rest[0]) ? rest[0] : {};
		const message = {
			type: "executeTool",
			event: {
				callId: callIdBySpan.get(parent),
				toolCall: {
					toolName,
					toolCallId: asString(callOptions.toolCallId),
					input
				},
				tools,
				...recordingBySpan.get(parent)
			}
		};
		const span = withActiveSpan$1(parent, () => createSpanFromMessage(message, options));
		if (!span) return original.apply(this, [input, ...rest]);
		const failSpan = (error) => {
			if (operationErrorInfoBySpan.get(parent)?.toolErrorsBubbleToCaller) span.setStatus({
				code: 2,
				message: error instanceof Error ? error.message : "tool_error"
			});
			else captureToolError(span, message, error);
			span.end();
			throw error;
		};
		try {
			return Promise.resolve(original.apply(this, [input, ...rest])).then((value) => {
				message.result = { output: value };
				enrichSpanOnEnd(span, message, options);
				span.end();
				return value;
			}, failSpan);
		} catch (error) {
			return failSpan(error);
		}
	};
}
function buildTextMessage(type) {
	return (options, telemetry) => ({
		type,
		event: {
			callId: nextCallId(),
			operationId: `ai.${type}`,
			functionId: asString(telemetry.functionId),
			...modelFields(options.model),
			maxRetries: options.maxRetries,
			instructions: asString(options.system),
			messages: normalizePromptMessages(options),
			...recording(telemetry)
		}
	});
}
function normalizePromptMessages(options) {
	if (Array.isArray(options.messages)) return options.messages;
	if (typeof options.prompt === "string") return [{
		role: "user",
		content: options.prompt
	}];
	return options.messages ?? options.prompt;
}
function recording(telemetry) {
	const enabledDefault = telemetry.isEnabled === true ? true : void 0;
	return {
		recordInputs: telemetry.recordInputs ?? enabledDefault,
		recordOutputs: telemetry.recordOutputs ?? enabledDefault
	};
}
function modelFields(model) {
	return {
		provider: modelField(model, "provider"),
		modelId: modelField(model, "modelId")
	};
}
function modelField(model, field) {
	return isObjectLike(model) ? asString(model[field]) : void 0;
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/vercel-ai.js
var _vercelAiChannelIntegration = ((options = {}) => {
	const parentIntegration = vercelAiIntegration(options);
	return extendIntegration(parentIntegration, {
		options,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			waitForTracingChannelBinding(() => {
				subscribeVercelAiOrchestrionChannels(diagnosticsChannel.tracingChannel, options);
			});
		}
	});
});
var vercelAiChannelIntegration = defineIntegration(_vercelAiChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/express/route.js
var layerRegisteredPaths = /* @__PURE__ */ new WeakMap();
function setLayerRegisteredPath(layer, path) {
	layerRegisteredPaths.set(layer, path);
}
function getLayerRegisteredPath(layer) {
	return layerRegisteredPaths.get(layer);
}
var requestLayerPaths = /* @__PURE__ */ new WeakMap();
function getStore(req) {
	let store = requestLayerPaths.get(req);
	if (!store) {
		store = [];
		requestLayerPaths.set(req, store);
	}
	return store;
}
function pushLayerPath(req, path) {
	getStore(req).push(path);
}
function popLayerPath(req) {
	getStore(req).pop();
}
function getLayerPath(args) {
	const firstArg = args[0];
	if (Array.isArray(firstArg)) return firstArg.map((segment) => extractLayerPathSegment(segment) ?? "").join(",");
	return extractLayerPathSegment(firstArg);
}
function extractLayerPathSegment(segment) {
	return typeof segment === "string" ? segment : segment instanceof RegExp || typeof segment === "number" ? String(segment) : void 0;
}
function getConstructedRoute(req) {
	const layersStore = getStore(req);
	let constructedRoute = "";
	for (const path of layersStore) {
		if (path === "/" || path === "/*") continue;
		constructedRoute += !constructedRoute || constructedRoute.endsWith("/") ? path : `/${path}`;
	}
	return constructedRoute.replace(/\/{2,}/g, "/");
}
function getActualMatchedRoute(req, constructedRoute) {
	const layersStore = getStore(req);
	if (layersStore.length === 0) return;
	const originalUrl = typeof req.originalUrl === "string" ? req.originalUrl : "";
	if (layersStore.every((path) => path === "/")) return originalUrl === "/" ? "/" : void 0;
	if (constructedRoute === "*") return constructedRoute;
	if (constructedRoute.includes("/") && (constructedRoute.includes(",") || constructedRoute.includes("\\") || constructedRoute.includes("*") || constructedRoute.includes("["))) return constructedRoute;
	const normalizedRoute = constructedRoute.startsWith("/") ? constructedRoute : `/${constructedRoute}`;
	return normalizedRoute.length > 0 && (originalUrl === normalizedRoute || originalUrl.startsWith(normalizedRoute) || isRoutePattern(normalizedRoute)) ? normalizedRoute : void 0;
}
function isRoutePattern(route) {
	return route.includes(":") || route.includes("*");
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/express/instrumentation.js
var ORIGIN$2 = "auto.http.express";
var ATTR_EXPRESS_NAME = "express.name";
var ATTR_EXPRESS_TYPE = "express.type";
var NOOP$1 = () => {};
var _isInstrumented = false;
function instrumentExpress(options, tracingChannel) {
	if (_isInstrumented) return;
	_isInstrumented = true;
	for (const channelName of [CHANNELS.EXPRESS_REGISTER, CHANNELS.ROUTER_REGISTER]) tracingChannel(channelName).subscribe({
		start: NOOP$1,
		asyncStart: NOOP$1,
		asyncEnd: NOOP$1,
		error: NOOP$1,
		end: captureRegisteredLayerPath
	});
	for (const channelName of [CHANNELS.EXPRESS_HANDLE, CHANNELS.ROUTER_HANDLE]) {
		DEBUG_BUILD && debug$3.log(`[orchestrion:express] subscribing to channel "${channelName}"`);
		const channel = tracingChannel(channelName);
		bindTracingChannelToSpan(channel, (data) => getSpanForLayer(data, options), { beforeSpanEnd(_span, data) {
			data._sentryCleanup?.();
		} });
		channel.subscribe({
			start: NOOP$1,
			asyncEnd: NOOP$1,
			end: NOOP$1,
			error: NOOP$1,
			asyncStart: popLayerPathForLayer
		});
	}
}
function captureRegisteredLayerPath(data) {
	const stack = data.self?.stack;
	if (!Array.isArray(stack)) return;
	const layer = stack[stack.length - 1];
	if (layer) setLayerRegisteredPath(layer, getLayerPath(data.arguments ?? []));
}
function popLayerPathForLayer(data) {
	if (!data._sentryStoredLayer) return;
	data._sentryStoredLayer = false;
	const req = data.arguments?.[0];
	if (req) popLayerPath(req);
}
function getSpanForLayer(data, options) {
	const layer = data.self;
	const args = data.arguments;
	if (!layer || !Array.isArray(args)) return;
	if (layer.handle?.length === 4) return;
	if (layer.method && !layer.route) return;
	const req = args[0];
	const res = args[1];
	if (!req) return;
	if (!getActiveSpan$1()) return;
	const type = getLayerType(layer);
	const registeredPath = getLayerRegisteredPath(layer);
	if (registeredPath != null) {
		pushLayerPath(req, registeredPath);
		data._sentryStoredLayer = true;
	}
	const constructedRoute = type === "request_handler" ? getConstructedRoute(req) : void 0;
	const matchedRoute = type === "request_handler" && constructedRoute != null ? getActualMatchedRoute(req, constructedRoute) : void 0;
	const name = type === "request_handler" ? constructedRoute || "request handler" : type === "router" ? layer.path ?? "/" : layer.name ?? "<anonymous>";
	if (matchedRoute) setHttpServerSpanRoute(matchedRoute);
	if (type === "request_handler" && constructedRoute) {
		const isolationScope = getIsolationScope();
		if (isolationScope !== getDefaultIsolationScope()) {
			const method = typeof req.method === "string" ? req.method.toUpperCase() : "GET";
			isolationScope.setTransactionName(`${method} ${constructedRoute}`);
		} else DEBUG_BUILD && debug$3.warn("[orchestrion:express] Isolation scope is still default isolation scope - skipping transaction name");
	}
	if (isLayerIgnored(name, type, options)) return;
	const span = startInactiveSpan$1({
		name,
		attributes: {
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$2,
			[SEMANTIC_ATTRIBUTE_SENTRY_OP]: `${type}.express`,
			[ATTR_EXPRESS_NAME]: name,
			[ATTR_EXPRESS_TYPE]: type,
			...matchedRoute ? { [Ts]: matchedRoute } : {}
		}
	});
	if (res && typeof res.once === "function") {
		const onFinish = () => {
			span.end();
		};
		res.once("finish", onFinish);
		data._sentryCleanup = () => res.removeListener("finish", onFinish);
	}
	return span;
}
function getLayerType(layer) {
	if (layer.name === "router") return "router";
	if (layer.name === "bound dispatch" || layer.name === "handle") return "request_handler";
	return "middleware";
}
function setHttpServerSpanRoute(route) {
	const activeSpan = getActiveSpan$1();
	const rootSpan = activeSpan && getRootSpan$1(activeSpan);
	if (!rootSpan) return;
	if (spanToJSON(rootSpan).data["sentry.op"] !== "http.server") return;
	rootSpan.setAttribute(Ts, route);
}
function isLayerIgnored(name, type, options) {
	const { ignoreLayers, ignoreLayersType } = options;
	if (Array.isArray(ignoreLayersType) && ignoreLayersType.includes(type)) return true;
	if (!Array.isArray(ignoreLayers)) return false;
	try {
		return stringMatchesSomePattern(name, ignoreLayers, true);
	} catch {
		return false;
	}
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/express/index.js
var INTEGRATION_NAME$9 = "Express";
var _expressChannelIntegration = ((options = {}) => {
	return {
		name: INTEGRATION_NAME$9,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			waitForTracingChannelBinding(() => {
				instrumentExpress(options, diagnosticsChannel.tracingChannel);
			});
		},
		getShouldHandleError() {
			return options.shouldHandleError;
		}
	};
});
var expressChannelIntegration = defineIntegration(_expressChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/firebase/firestore.js
function startFirestoreSpan$1(spanName, reference) {
	return startInactiveSpan$1({
		name: `${spanName} ${reference.path}`,
		op: "db.query",
		kind: SPAN_KIND.CLIENT,
		attributes: {
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.firebase.orchestrion.firestore",
			[Lt]: spanName,
			...buildAttributes$1(reference)
		}
	});
}
function getPortAndAddress$1(settings) {
	let address;
	let port;
	if (typeof settings.host === "string") {
		if (settings.host.startsWith("[")) {
			if (settings.host.endsWith("]")) address = settings.host.replace(/^\[|\]$/g, "");
			else if (settings.host.includes("]:")) {
				const lastColonIndex = settings.host.lastIndexOf(":");
				if (lastColonIndex !== -1) {
					address = settings.host.slice(1, lastColonIndex).replace(/^\[|\]$/g, "");
					port = settings.host.slice(lastColonIndex + 1);
				}
			}
		} else if (net.isIPv6(settings.host)) address = settings.host;
		else {
			const lastColonIndex = settings.host.lastIndexOf(":");
			if (lastColonIndex !== -1) {
				address = settings.host.slice(0, lastColonIndex);
				port = settings.host.slice(lastColonIndex + 1);
			} else address = settings.host;
		}
	}
	return {
		address,
		port: port ? parseInt(port, 10) : void 0
	};
}
function buildAttributes$1(reference) {
	const firestoreApp = reference.firestore.app;
	const firestoreOptions = firestoreApp.options;
	const settings = reference.firestore.toJSON()?.settings || {};
	const attributes = {
		[wt]: reference.path,
		[Ct]: firestoreApp.name,
		[jt]: "firebase.firestore",
		"firebase.firestore.type": reference.type,
		"firebase.firestore.options.projectId": firestoreOptions.projectId,
		"firebase.firestore.options.appId": firestoreOptions.appId,
		"firebase.firestore.options.messagingSenderId": firestoreOptions.messagingSenderId,
		"firebase.firestore.options.storageBucket": firestoreOptions.storageBucket
	};
	const { address, port } = getPortAndAddress$1(settings);
	if (address) attributes[au] = address;
	if (port) attributes[ou] = port;
	return attributes;
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/firebase/functions.js
var FUNCTIONS_ORIGIN = "auto.firebase.orchestrion.functions";
var WRAPPED = "__sentryFirebaseWrapped";
function wrapFunctionsRegistration(data, triggerType) {
	const args = data.arguments;
	if (!Array.isArray(args) || args.length === 0) return;
	const handlerIndex = typeof args[0] === "function" ? 0 : 1;
	const handler = args[handlerIndex];
	if (typeof handler !== "function" || handler[WRAPPED]) return;
	args[handlerIndex] = wrapHandler(handler, triggerType);
}
function wrapHandler(handler, triggerType) {
	const wrapped = async function(...handlerArgs) {
		const functionName = process.env.FUNCTION_TARGET || process.env.K_SERVICE || "unknown";
		const attributes = {
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: FUNCTIONS_ORIGIN,
			[nr]: functionName,
			[ar]: triggerType,
			"faas.provider": "firebase"
		};
		if (process.env.GCLOUD_PROJECT) attributes["cloud.project_id"] = process.env.GCLOUD_PROJECT;
		if (process.env.EVENTARC_CLOUD_EVENT_SOURCE) attributes["cloud.event_source"] = process.env.EVENTARC_CLOUD_EVENT_SOURCE;
		return startSpanManual$1({
			name: `firebase.function.${triggerType}`,
			op: "function.firebase",
			kind: SPAN_KIND.SERVER,
			attributes
		}, async (span) => {
			try {
				const result = await handler.apply(this, handlerArgs);
				span.end();
				return result;
			} catch (error) {
				span.setStatus({ code: 2 });
				captureException(error, { mechanism: {
					type: FUNCTIONS_ORIGIN,
					handled: false
				} });
				span.end();
				await flush(2e3);
				throw error;
			}
		});
	};
	wrapped[WRAPPED] = true;
	return wrapped;
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/firebase/instrumentation.js
var FIRESTORE_OPERATIONS = [
	{
		channel: CHANNELS.FIREBASE_FIRESTORE_ADD_DOC,
		spanName: "addDoc",
		useParent: false
	},
	{
		channel: CHANNELS.FIREBASE_FIRESTORE_GET_DOCS,
		spanName: "getDocs",
		useParent: false
	},
	{
		channel: CHANNELS.FIREBASE_FIRESTORE_SET_DOC,
		spanName: "setDoc",
		useParent: true
	},
	{
		channel: CHANNELS.FIREBASE_FIRESTORE_DELETE_DOC,
		spanName: "deleteDoc",
		useParent: true
	}
];
var FUNCTIONS_TRIGGERS = [
	{
		channel: CHANNELS.FIREBASE_FUNCTIONS_HTTP_REQUEST,
		triggerType: "http.request"
	},
	{
		channel: CHANNELS.FIREBASE_FUNCTIONS_HTTP_CALL,
		triggerType: "http.call"
	},
	{
		channel: CHANNELS.FIREBASE_FUNCTIONS_FIRESTORE_CREATED,
		triggerType: "firestore.document.created"
	},
	{
		channel: CHANNELS.FIREBASE_FUNCTIONS_FIRESTORE_UPDATED,
		triggerType: "firestore.document.updated"
	},
	{
		channel: CHANNELS.FIREBASE_FUNCTIONS_FIRESTORE_DELETED,
		triggerType: "firestore.document.deleted"
	},
	{
		channel: CHANNELS.FIREBASE_FUNCTIONS_FIRESTORE_WRITTEN,
		triggerType: "firestore.document.written"
	},
	{
		channel: CHANNELS.FIREBASE_FUNCTIONS_SCHEDULER,
		triggerType: "scheduler.scheduled"
	},
	{
		channel: CHANNELS.FIREBASE_FUNCTIONS_STORAGE_FINALIZED,
		triggerType: "storage.object.finalized"
	},
	{
		channel: CHANNELS.FIREBASE_FUNCTIONS_STORAGE_ARCHIVED,
		triggerType: "storage.object.archived"
	},
	{
		channel: CHANNELS.FIREBASE_FUNCTIONS_STORAGE_DELETED,
		triggerType: "storage.object.deleted"
	},
	{
		channel: CHANNELS.FIREBASE_FUNCTIONS_STORAGE_METADATA_UPDATED,
		triggerType: "storage.object.metadataUpdated"
	}
];
var NOOP = () => {};
function safe(fn) {
	try {
		return fn();
	} catch (error) {
		DEBUG_BUILD && debug$3.warn("[orchestrion:firebase] error handling channel event", error);
		return;
	}
}
function instrumentFirebase$1() {
	for (const { channel, spanName, useParent } of FIRESTORE_OPERATIONS) bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(channel), (data) => safe(() => {
		const reference = data.arguments[0];
		if (!reference) return;
		const spanReference = useParent ? reference.parent || reference : reference;
		return startFirestoreSpan$1(spanName, spanReference);
	}));
	for (const { channel, triggerType } of FUNCTIONS_TRIGGERS) diagnosticsChannel.tracingChannel(channel).subscribe({
		start: (data) => void safe(() => wrapFunctionsRegistration(data, triggerType)),
		end: NOOP,
		asyncStart: NOOP,
		asyncEnd: NOOP,
		error: NOOP
	});
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/firebase/index.js
var INTEGRATION_NAME$8 = "Firebase";
var _firebaseChannelIntegration = (() => {
	return {
		name: INTEGRATION_NAME$8,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			waitForTracingChannelBinding(() => {
				instrumentFirebase$1();
			});
		}
	};
});
var firebaseChannelIntegration = defineIntegration(_firebaseChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/detect.js
function isOrchestrionInjected() {
	return !!GLOBAL_OBJ.__SENTRY_ORCHESTRION__;
}
function detectOrchestrionSetup() {
	const { runtime, bundler } = GLOBAL_OBJ.__SENTRY_ORCHESTRION__ ?? {};
	if (!runtime && !bundler) {
		debug$3.warn("[Sentry] No diagnostics-channel injection detected. Channel-based integrations will not record spans. Make sure the diagnostics channels are injected via the runtime `--import` hook or a bundler plugin before the instrumented modules load.");
		return;
	}
	debug$3.log(runtime ? `[Sentry] Runtime hook registered, injected libraries=${JSON.stringify(runtime)}` : "[Sentry] Runtime hook not registered");
	debug$3.log(bundler ? `[Sentry] Bundler plugin ran, injected libraries=${JSON.stringify(bundler)}` : "[Sentry] Bundler plugin did not run");
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/integrations/tracing-channel/redis.js
var INTEGRATION_NAME$7 = "RedisChannel";
var ORIGIN$1 = "auto.db.orchestrion.redis";
var ATTR_DB_CONNECTION_STRING = "db.connection_string";
var DB_SYSTEM_VALUE_REDIS = "redis";
function endSpan(span, err) {
	if (err) span.setStatus({
		code: 2,
		message: err instanceof Error ? err.message : String(err)
	});
	span.end();
}
function runResponseHook(hook, span, command, args, result) {
	if (!hook) return;
	try {
		hook(span, command, args, result);
	} catch {}
}
function stripCommandOptions(args) {
	const first = args[0];
	if (isObjectLike(first) && Object.getOwnPropertySymbols(first).length > 0) return args.slice(1);
	return args;
}
function removeCredentialsFromConnectionString(url) {
	if (typeof url !== "string" || !url) return;
	try {
		const parsed = new URL(url);
		parsed.searchParams.delete("user_pwd");
		parsed.username = "";
		parsed.password = "";
		return parsed.href;
	} catch {
		return;
	}
}
function nodeRedisAttributes(options) {
	return {
		[Kt]: DB_SYSTEM_VALUE_REDIS,
		[Il]: options?.socket?.host,
		[Ol]: options?.socket?.port,
		[ATTR_DB_CONNECTION_STRING]: removeCredentialsFromConnectionString(options?.url),
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$1
	};
}
function startCommandSpan(commandName, commandArgs, attributes) {
	return startInactiveSpan$1({
		name: `redis-${commandName}`,
		kind: SPAN_KIND.CLIENT,
		attributes: {
			...attributes,
			[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "db",
			[Ht]: defaultDbStatementSerializer(commandName, commandArgs)
		}
	});
}
function subscribeLegacyRedisCommand(responseHook) {
	const channel = diagnosticsChannel.tracingChannel(CHANNELS.REDIS_COMMAND);
	const noop = () => {};
	channel.subscribe({
		end: noop,
		asyncStart: noop,
		asyncEnd: noop,
		start(data) {
			const command = data.arguments?.[0];
			if (!command || typeof command !== "object") return;
			const originalCallback = command.callback;
			if (typeof originalCallback !== "function") return;
			const client = data.self;
			const attributes = {
				[Kt]: DB_SYSTEM_VALUE_REDIS,
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$1
			};
			attributes[Il] = client?.connection_options?.host;
			attributes[Ol] = client?.connection_options?.port;
			if (client?.address) attributes[ATTR_DB_CONNECTION_STRING] = `redis://${client.address}`;
			const span = startCommandSpan(command.command, command.args ?? [], attributes);
			data._sentrySpan = span;
			const parentSpan = getActiveSpan$1();
			command.callback = function(err, reply) {
				if (!err) runResponseHook(responseHook, span, command.command, command.args ?? [], reply);
				endSpan(span, err);
				const args = arguments;
				return withActiveSpan$1(parentSpan ?? null, () => originalCallback.apply(this, args));
			};
		},
		error(data) {
			const span = data._sentrySpan;
			if (span) endSpan(span, data.error);
		}
	});
}
function bindNodeRedisCommandChannel(channelName, getWireArgs, responseHook) {
	bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(channelName), (data) => {
		const wireArgs = getWireArgs(data);
		if (!wireArgs?.length) return;
		const commandName = String(wireArgs[0]);
		const options = data.self?.options;
		return startCommandSpan(commandName, wireArgs.slice(1), nodeRedisAttributes(options));
	}, { beforeSpanEnd(span, data) {
		if ("error" in data || !responseHook) return;
		const wireArgs = getWireArgs(data);
		if (wireArgs?.length) runResponseHook(responseHook, span, String(wireArgs[0]), wireArgs.slice(1), data.result);
	} });
}
function getSendCommandArgs(data) {
	const args = data.arguments?.[0];
	return Array.isArray(args) ? args : void 0;
}
function getExecutorArgs(data) {
	const command = data.arguments?.[0];
	const jsArgs = data.arguments?.[1];
	if (typeof command?.transformArguments !== "function" || !Array.isArray(jsArgs)) return;
	try {
		return command.transformArguments(...stripCommandOptions(jsArgs));
	} catch {
		return;
	}
}
function bindNodeRedisConnectChannel() {
	bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(CHANNELS.NODE_REDIS_CONNECT), (data) => {
		const options = data.self?.options;
		return startInactiveSpan$1({
			name: "redis-connect",
			kind: SPAN_KIND.CLIENT,
			attributes: {
				...nodeRedisAttributes(options),
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "db"
			}
		});
	});
}
function bindNodeRedisBatchChannel(channelName, getOperation) {
	bindTracingChannelToSpan(diagnosticsChannel.tracingChannel(channelName), (data) => {
		const commands = data.arguments?.[0];
		const size = Array.isArray(commands) ? commands.length : void 0;
		const socket = data.self?.options?.socket;
		return startInactiveSpan$1({
			name: getOperation(data),
			kind: SPAN_KIND.CLIENT,
			attributes: {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$1,
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "db.redis",
				[jt]: DB_SYSTEM_VALUE_REDIS,
				...size && size > 1 ? { [Dt]: size } : {},
				...socket?.host != null ? { [au]: socket.host } : {},
				...socket?.port != null ? { [ou]: socket.port } : {}
			}
		});
	});
}
var _redisChannelIntegration = ((options = {}) => {
	const responseHook = options.responseHook;
	return {
		name: INTEGRATION_NAME$7,
		setupOnce() {
			if (!diagnosticsChannel.tracingChannel) return;
			DEBUG_BUILD && debug$3.log(`[orchestrion:redis] subscribing to "${CHANNELS.REDIS_COMMAND}" and node-redis channels`);
			subscribeLegacyRedisCommand(responseHook);
			waitForTracingChannelBinding(() => {
				bindNodeRedisCommandChannel(CHANNELS.NODE_REDIS_COMMAND, getSendCommandArgs, responseHook);
				bindNodeRedisCommandChannel(CHANNELS.NODE_REDIS_EXECUTOR, getExecutorArgs, responseHook);
				bindNodeRedisConnectChannel();
				bindNodeRedisBatchChannel(CHANNELS.NODE_REDIS_MULTI, () => "MULTI");
				bindNodeRedisBatchChannel(CHANNELS.NODE_REDIS_PIPELINE, () => "PIPELINE");
				bindNodeRedisBatchChannel(CHANNELS.NODE_REDIS_BATCH, (data) => data.arguments?.[2] !== void 0 ? "MULTI" : "PIPELINE");
			});
		}
	};
});
var redisChannelIntegration = defineIntegration(_redisChannelIntegration);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/index.js
var channelIntegrations = {
	postgresIntegration: postgresChannelIntegration,
	postgresJsIntegration: postgresJsChannelIntegration,
	mongoIntegration: mongodbChannelIntegration,
	mysqlIntegration: mysqlChannelIntegration,
	mysql2Integration: mysql2ChannelIntegration,
	genericPoolIntegration: genericPoolChannelIntegration,
	mongooseIntegration: mongooseChannelIntegration,
	lruMemoizerIntegration: lruMemoizerChannelIntegration,
	openaiIntegration: openaiChannelIntegration,
	anthropicIntegration: anthropicChannelIntegration,
	googleGenAIIntegration: googleGenAIChannelIntegration,
	langChainIntegration: langChainChannelIntegration,
	langGraphIntegration: langGraphChannelIntegration,
	vercelAiIntegration: vercelAiChannelIntegration,
	amqplibIntegration: amqplibChannelIntegration,
	hapiIntegration: hapiChannelIntegration,
	koaIntegration: koaChannelIntegration,
	expressIntegration: expressChannelIntegration,
	graphqlIntegration: graphqlDiagnosticsChannelIntegration,
	kafkajsIntegration: kafkajsChannelIntegration,
	tediousIntegration: tediousChannelIntegration,
	awsIntegration: awsChannelIntegration,
	firebaseIntegration: firebaseChannelIntegration
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/knex/index.js
var INTEGRATION_NAME$6 = "Knex";
var instrumentKnex = generateInstrumentOnce(INTEGRATION_NAME$6, () => new KnexInstrumentation());
var _knexIntegration = (() => {
	return {
		name: INTEGRATION_NAME$6,
		setupOnce() {
			if (isOrchestrionInjected()) knexChannelIntegration().setupOnce?.();
			else instrumentKnex();
		}
	};
});
var knexIntegration = defineIntegration(_knexIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/tedious/vendored/semconv.js
var ATTR_DB_SQL_TABLE = "db.sql.table";
var DB_SYSTEM_VALUE_MSSQL = "mssql";
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/tedious/vendored/utils.js
function getSpanName$1(operation, db, sql, bulkLoadTable) {
	if (operation === "execBulkLoad" && bulkLoadTable && db) return `${operation} ${bulkLoadTable} ${db}`;
	if (operation === "callProcedure") {
		if (db) return `${operation} ${sql} ${db}`;
		return `${operation} ${sql}`;
	}
	if (db) return `${operation} ${db}`;
	return `${operation}`;
}
var once = (fn) => {
	let called = false;
	return (...args) => {
		if (called) return;
		called = true;
		return fn(...args);
	};
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/tedious/vendored/instrumentation.js
var PACKAGE_NAME$3 = "@sentry/instrumentation-tedious";
var CURRENT_DATABASE = /* @__PURE__ */ Symbol("opentelemetry.instrumentation-tedious.current-database");
var PATCHED_METHODS = [
	"callProcedure",
	"execSql",
	"execSqlBatch",
	"execBulkLoad",
	"prepare",
	"execute"
];
function setDatabase(databaseName) {
	Object.defineProperty(this, CURRENT_DATABASE, {
		value: databaseName,
		writable: true
	});
}
var _TediousInstrumentation = class _TediousInstrumentation extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$3, SDK_VERSION, config);
	}
	init() {
		return [new InstrumentationNodeModuleDefinition(_TediousInstrumentation.COMPONENT, [">=1.11.0 <20"], (moduleExports) => {
			const ConnectionPrototype = moduleExports.Connection.prototype;
			for (const method of PATCHED_METHODS) {
				if (isWrapped(ConnectionPrototype[method])) this._unwrap(ConnectionPrototype, method);
				this._wrap(ConnectionPrototype, method, this._patchQuery(method));
			}
			if (isWrapped(ConnectionPrototype.connect)) this._unwrap(ConnectionPrototype, "connect");
			this._wrap(ConnectionPrototype, "connect", this._patchConnect);
			return moduleExports;
		}, (moduleExports) => {
			if (moduleExports === void 0) return;
			const ConnectionPrototype = moduleExports.Connection.prototype;
			for (const method of PATCHED_METHODS) this._unwrap(ConnectionPrototype, method);
			this._unwrap(ConnectionPrototype, "connect");
		})];
	}
	_patchConnect(original) {
		return function patchedConnect() {
			setDatabase.call(this, this.config?.options?.database);
			this.removeListener("databaseChange", setDatabase);
			this.on("databaseChange", setDatabase);
			this.once("end", () => {
				this.removeListener("databaseChange", setDatabase);
			});
			return original.apply(this, arguments);
		};
	}
	_patchQuery(operation) {
		return (originalMethod) => {
			const thisPlugin = this;
			function patchedMethod(request) {
				if (!(request instanceof EventEmitter$1)) {
					thisPlugin._diag.warn(`Unexpected invocation of patched ${operation} method. Span not recorded`);
					return originalMethod.apply(this, arguments);
				}
				let procCount = 0;
				let statementCount = 0;
				const incrementStatementCount = () => statementCount++;
				const incrementProcCount = () => procCount++;
				const databaseName = this[CURRENT_DATABASE];
				const sql = ((request2) => {
					if (request2.sqlTextOrProcedure === "sp_prepare" && request2.parametersByName?.stmt?.value) return request2.parametersByName.stmt.value;
					return request2.sqlTextOrProcedure;
				})(request);
				const attributes = {
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.db.otel.tedious",
					[Kt]: DB_SYSTEM_VALUE_MSSQL,
					[Nt]: databaseName,
					[Qt]: this.config?.userName ?? this.config?.authentication?.options?.userName,
					[Ht]: sql,
					[ATTR_DB_SQL_TABLE]: request.table,
					[Il]: this.config?.server,
					[Ol]: this.config?.options?.port
				};
				const span = startInactiveSpan$1({
					name: getSpanName$1(operation, databaseName, sql, request.table),
					kind: SPAN_KIND.CLIENT,
					attributes
				});
				const endSpan = once((err) => {
					request.removeListener("done", incrementStatementCount);
					request.removeListener("doneInProc", incrementStatementCount);
					request.removeListener("doneProc", incrementProcCount);
					request.removeListener("error", endSpan);
					this.removeListener("end", endSpan);
					span.setAttribute("tedious.procedure_count", procCount);
					span.setAttribute("tedious.statement_count", statementCount);
					if (err) span.setStatus({
						code: 2,
						message: err.message
					});
					span.end();
				});
				request.on("done", incrementStatementCount);
				request.on("doneInProc", incrementStatementCount);
				request.on("doneProc", incrementProcCount);
				request.once("error", endSpan);
				this.on("end", endSpan);
				if (typeof request.callback === "function") thisPlugin._wrap(request, "callback", thisPlugin._patchCallbackQuery(endSpan));
				else thisPlugin._diag.error("Expected request.callback to be a function");
				return withActiveSpan$1(span, () => originalMethod.apply(this, arguments));
			}
			Object.defineProperty(patchedMethod, "length", {
				value: originalMethod.length,
				writable: false
			});
			return patchedMethod;
		};
	}
	_patchCallbackQuery(endSpan) {
		return (originalCallback) => {
			return function(err, _rowCount, _rows) {
				endSpan(err);
				return originalCallback.apply(this, arguments);
			};
		};
	}
};
_TediousInstrumentation.COMPONENT = "tedious";
var TediousInstrumentation = _TediousInstrumentation;
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/tedious/index.js
var INTEGRATION_NAME$5 = "Tedious";
var instrumentTedious = generateInstrumentOnce(INTEGRATION_NAME$5, () => new TediousInstrumentation({}));
var _tediousIntegration = (() => {
	return {
		name: INTEGRATION_NAME$5,
		setupOnce() {
			instrumentTedious();
		}
	};
});
var tediousIntegration = defineIntegration(_tediousIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/genericPool/vendored/instrumentation.js
var MODULE_NAME$1 = "generic-pool";
var PACKAGE_NAME$2 = "@sentry/instrumentation-generic-pool";
var GenericPoolInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$2, SDK_VERSION, config);
		this._isDisabled = false;
	}
	init() {
		return [
			new InstrumentationNodeModuleDefinition(MODULE_NAME$1, [">=3.0.0 <4"], (moduleExports) => {
				const Pool = moduleExports.Pool;
				if (isWrapped(Pool.prototype.acquire)) this._unwrap(Pool.prototype, "acquire");
				this._wrap(Pool.prototype, "acquire", this._acquirePatcher.bind(this));
				return moduleExports;
			}, (moduleExports) => {
				const Pool = moduleExports.Pool;
				this._unwrap(Pool.prototype, "acquire");
				return moduleExports;
			}),
			new InstrumentationNodeModuleDefinition(MODULE_NAME$1, [">=2.4.0 <3"], (moduleExports) => {
				const Pool = moduleExports.Pool;
				if (isWrapped(Pool.prototype.acquire)) this._unwrap(Pool.prototype, "acquire");
				this._wrap(Pool.prototype, "acquire", this._acquireWithCallbacksPatcher.bind(this));
				return moduleExports;
			}, (moduleExports) => {
				const Pool = moduleExports.Pool;
				this._unwrap(Pool.prototype, "acquire");
				return moduleExports;
			}),
			new InstrumentationNodeModuleDefinition(MODULE_NAME$1, [">=2.0.0 <2.4"], (moduleExports) => {
				this._isDisabled = false;
				if (isWrapped(moduleExports.Pool)) this._unwrap(moduleExports, "Pool");
				this._wrap(moduleExports, "Pool", this._poolWrapper.bind(this));
				return moduleExports;
			}, (moduleExports) => {
				this._isDisabled = true;
				return moduleExports;
			})
		];
	}
	_acquirePatcher(original) {
		return function wrapped_acquire(...args) {
			return startSpan$3({
				name: "generic-pool.acquire",
				attributes: { [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.db.otel.generic_pool" }
			}, () => {
				return original.call(this, ...args);
			});
		};
	}
	_poolWrapper(original) {
		const wrap = this._wrap.bind(this);
		const acquireWithCallbacksPatcher = this._acquireWithCallbacksPatcher.bind(this);
		return function wrapped_pool(...args) {
			const pool = original.apply(this, args);
			wrap(pool, "acquire", acquireWithCallbacksPatcher);
			return pool;
		};
	}
	_acquireWithCallbacksPatcher(original) {
		const isDisabled = () => this._isDisabled;
		return function wrapped_acquire(cb, priority) {
			if (isDisabled()) return original.call(this, cb, priority);
			return startSpanManual$1({
				name: "generic-pool.acquire",
				attributes: { [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.db.otel.generic_pool" }
			}, (span) => {
				original.call(this, (err, client) => {
					if (err) span.setStatus({
						code: 2,
						message: "internal_error"
					});
					span.end();
					if (cb) cb(err, client);
				}, priority);
			});
		};
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/genericPool/index.js
var INTEGRATION_NAME$4 = "GenericPool";
var instrumentGenericPool = generateInstrumentOnce(INTEGRATION_NAME$4, () => new GenericPoolInstrumentation({}));
var _genericPoolIntegration = (() => {
	return {
		name: INTEGRATION_NAME$4,
		setupOnce() {
			instrumentGenericPool();
		}
	};
});
var genericPoolIntegration = defineIntegration(_genericPoolIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/dataloader/vendored/instrumentation.js
var MODULE_NAME = "dataloader";
var PACKAGE_NAME$1 = "@sentry/instrumentation-dataloader";
var ORIGIN = "auto.db.otel.dataloader";
function isModule(module) {
	return module[Symbol.toStringTag] === "Module";
}
function extractModuleExports(module) {
	return isModule(module) ? module.default : module;
}
function getSpanName(dataloader, operation) {
	const dataloaderName = dataloader.name;
	if (dataloaderName) return `${MODULE_NAME}.${operation} ${dataloaderName}`;
	return `${MODULE_NAME}.${operation}`;
}
function getSpanOp(operation) {
	if (operation === "load" || operation === "loadMany" || operation === "batch") return "cache.get";
}
function getCacheKey(keyArg) {
	if (Array.isArray(keyArg)) return keyArg.map((key) => String(key));
	return keyArg == null ? void 0 : [String(keyArg)];
}
var DataloaderInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$1, SDK_VERSION, config);
	}
	init() {
		return [new InstrumentationNodeModuleDefinition(MODULE_NAME, [">=2.0.0 <3"], (module) => {
			const dataloader = extractModuleExports(module);
			this._patchLoad(dataloader.prototype);
			this._patchLoadMany(dataloader.prototype);
			this._patchPrime(dataloader.prototype);
			this._patchClear(dataloader.prototype);
			this._patchClearAll(dataloader.prototype);
			return this._getPatchedConstructor(dataloader);
		}, (module) => {
			const dataloader = extractModuleExports(module);
			[
				"load",
				"loadMany",
				"prime",
				"clear",
				"clearAll"
			].forEach((method) => {
				if (isWrapped(dataloader.prototype[method])) this._unwrap(dataloader.prototype, method);
			});
		})];
	}
	_wrapBatchLoadFn(batchLoadFn) {
		const instrumentation = this;
		return function patchedBatchLoadFn(...args) {
			if (!instrumentation.isEnabled()) return batchLoadFn.call(this, ...args);
			return startSpan$3({
				name: getSpanName(this, "batch"),
				links: this._batch?.spanLinks,
				attributes: {
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN,
					[SEMANTIC_ATTRIBUTE_SENTRY_OP]: getSpanOp("batch"),
					[Li]: getCacheKey(args[0])
				},
				onlyIfParent: true
			}, () => batchLoadFn.apply(this, args));
		};
	}
	_getPatchedConstructor(constructor) {
		const instrumentation = this;
		const prototype = constructor.prototype;
		if (!instrumentation.isEnabled()) return constructor;
		function PatchedDataloader(...args) {
			if (typeof args[0] === "function") {
				if (isWrapped(args[0])) instrumentation._unwrap(args, 0);
				args[0] = instrumentation._wrapBatchLoadFn(args[0]);
			}
			return constructor.apply(this, args);
		}
		PatchedDataloader.prototype = prototype;
		return PatchedDataloader;
	}
	_patchLoad(proto) {
		if (isWrapped(proto.load)) this._unwrap(proto, "load");
		this._wrap(proto, "load", this._getPatchedLoad.bind(this));
	}
	_getPatchedLoad(original) {
		return function patchedLoad(...args) {
			return startSpan$3({
				name: getSpanName(this, "load"),
				kind: SPAN_KIND.CLIENT,
				attributes: {
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN,
					[SEMANTIC_ATTRIBUTE_SENTRY_OP]: getSpanOp("load"),
					[Li]: getCacheKey(args[0])
				},
				onlyIfParent: true
			}, (span) => {
				const result = original.call(this, ...args);
				if (this._batch && span.isRecording()) {
					if (!this._batch.spanLinks) this._batch.spanLinks = [];
					this._batch.spanLinks.push({ context: span.spanContext() });
				}
				return result;
			});
		};
	}
	_patchLoadMany(proto) {
		if (isWrapped(proto.loadMany)) this._unwrap(proto, "loadMany");
		this._wrap(proto, "loadMany", this._getPatchedLoadMany.bind(this));
	}
	_getPatchedLoadMany(original) {
		return function patchedLoadMany(...args) {
			return startSpan$3({
				name: getSpanName(this, "loadMany"),
				kind: SPAN_KIND.CLIENT,
				attributes: {
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN,
					[SEMANTIC_ATTRIBUTE_SENTRY_OP]: getSpanOp("loadMany"),
					[Li]: getCacheKey(args[0])
				},
				onlyIfParent: true
			}, () => original.call(this, ...args));
		};
	}
	_patchPrime(proto) {
		if (isWrapped(proto.prime)) this._unwrap(proto, "prime");
		this._wrap(proto, "prime", this._getPatchedPrime.bind(this));
	}
	_getPatchedPrime(original) {
		return function patchedPrime(...args) {
			return startSpan$3({
				name: getSpanName(this, "prime"),
				kind: SPAN_KIND.CLIENT,
				attributes: {
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN,
					[SEMANTIC_ATTRIBUTE_SENTRY_OP]: getSpanOp("prime")
				},
				onlyIfParent: true
			}, () => original.call(this, ...args));
		};
	}
	_patchClear(proto) {
		if (isWrapped(proto.clear)) this._unwrap(proto, "clear");
		this._wrap(proto, "clear", this._getPatchedClear.bind(this));
	}
	_getPatchedClear(original) {
		return function patchedClear(...args) {
			return startSpan$3({
				name: getSpanName(this, "clear"),
				kind: SPAN_KIND.CLIENT,
				attributes: {
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN,
					[SEMANTIC_ATTRIBUTE_SENTRY_OP]: getSpanOp("clear")
				},
				onlyIfParent: true
			}, () => original.call(this, ...args));
		};
	}
	_patchClearAll(proto) {
		if (isWrapped(proto.clearAll)) this._unwrap(proto, "clearAll");
		this._wrap(proto, "clearAll", this._getPatchedClearAll.bind(this));
	}
	_getPatchedClearAll(original) {
		return function patchedClearAll(...args) {
			return startSpan$3({
				name: getSpanName(this, "clearAll"),
				kind: SPAN_KIND.CLIENT,
				attributes: {
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN,
					[SEMANTIC_ATTRIBUTE_SENTRY_OP]: getSpanOp("clearAll")
				},
				onlyIfParent: true
			}, () => original.call(this, ...args));
		};
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/dataloader/index.js
var INTEGRATION_NAME$3 = "Dataloader";
var instrumentDataloader = generateInstrumentOnce(INTEGRATION_NAME$3, () => new DataloaderInstrumentation());
var _dataloaderIntegration = (() => {
	return {
		name: INTEGRATION_NAME$3,
		setupOnce() {
			if (isOrchestrionInjected()) dataloaderChannelIntegration().setupOnce?.();
			else instrumentDataloader();
		}
	};
});
var dataloaderIntegration = defineIntegration(_dataloaderIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/amqplib/vendored/types.js
var EndOperation = /* @__PURE__ */ ((EndOperation2) => {
	EndOperation2["AutoAck"] = "auto ack";
	EndOperation2["Ack"] = "ack";
	EndOperation2["AckAll"] = "ackAll";
	EndOperation2["Reject"] = "reject";
	EndOperation2["Nack"] = "nack";
	EndOperation2["NackAll"] = "nackAll";
	EndOperation2["ChannelClosed"] = "channel closed";
	EndOperation2["ChannelError"] = "channel error";
	EndOperation2["InstrumentationTimeout"] = "instrumentation timeout";
	return EndOperation2;
})(EndOperation || {});
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/amqplib/vendored/semconv.js
var ATTR_MESSAGING_OPERATION = "messaging.operation";
var ATTR_MESSAGING_DESTINATION = "messaging.destination";
var ATTR_MESSAGING_DESTINATION_KIND = "messaging.destination_kind";
var ATTR_MESSAGING_RABBITMQ_ROUTING_KEY = "messaging.rabbitmq.routing_key";
var ATTR_MESSAGING_PROTOCOL = "messaging.protocol";
var ATTR_MESSAGING_PROTOCOL_VERSION = "messaging.protocol_version";
var ATTR_MESSAGING_URL = "messaging.url";
var OLD_ATTR_MESSAGING_MESSAGE_ID = "messaging.message_id";
var ATTR_MESSAGING_CONVERSATION_ID = "messaging.conversation_id";
var MESSAGING_DESTINATION_KIND_VALUE_TOPIC = "topic";
var MESSAGING_OPERATION_VALUE_PROCESS = "process";
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/amqplib/vendored/utils.js
var PUBLISHER_ORIGIN = "auto.amqplib.otel.publisher";
var CONSUMER_ORIGIN = "auto.amqplib.otel.consumer";
var MESSAGE_STORED_SPAN = /* @__PURE__ */ Symbol("opentelemetry.amqplib.message.stored-span");
var CHANNEL_SPANS_NOT_ENDED = /* @__PURE__ */ Symbol("opentelemetry.amqplib.channel.spans-not-ended");
var CHANNEL_CONSUME_TIMEOUT_TIMER = /* @__PURE__ */ Symbol("opentelemetry.amqplib.channel.consumer-timeout-timer");
var CONNECTION_ATTRIBUTES = /* @__PURE__ */ Symbol("opentelemetry.amqplib.connection.attributes");
var CHANNEL_IS_CONFIRM_PUBLISHING = /* @__PURE__ */ Symbol("sentry.amqplib.channel.is-confirm-publishing");
var normalizeExchange = (exchangeName) => exchangeName !== "" ? exchangeName : "<default>";
var censorPassword = (url) => {
	return url.replace(/:[^:@/]*@/, ":***@");
};
var getPort = (portFromUrl, resolvedProtocol) => {
	return portFromUrl || (resolvedProtocol === "AMQP" ? 5672 : 5671);
};
var getProtocol = (protocolFromUrl) => {
	const resolvedProtocol = protocolFromUrl || "amqp";
	return (resolvedProtocol.endsWith(":") ? resolvedProtocol.substring(0, resolvedProtocol.length - 1) : resolvedProtocol).toUpperCase();
};
var getHostname = (hostnameFromUrl) => {
	return hostnameFromUrl || "localhost";
};
var getConnectionAttributesFromServer = (conn) => {
	const product = conn.serverProperties.product?.toLowerCase?.();
	if (product) return { [Zo]: product };
	else return {};
};
var getConnectionAttributesFromUrl = (url) => {
	const attributes = { [ATTR_MESSAGING_PROTOCOL_VERSION]: "0.9.1" };
	const resolvedUrl = url || "amqp://localhost";
	if (typeof resolvedUrl === "object") {
		const connectOptions = resolvedUrl;
		const protocol = getProtocol(connectOptions?.protocol);
		attributes[ATTR_MESSAGING_PROTOCOL] = protocol;
		attributes[Il] = getHostname(connectOptions?.hostname);
		attributes[Ol] = getPort(connectOptions.port, protocol);
	} else {
		const censoredUrl = censorPassword(resolvedUrl);
		attributes[ATTR_MESSAGING_URL] = censoredUrl;
		try {
			const urlParts = new URL(censoredUrl);
			const protocol = getProtocol(urlParts.protocol);
			attributes[ATTR_MESSAGING_PROTOCOL] = protocol;
			attributes[Il] = getHostname(urlParts.hostname);
			attributes[Ol] = getPort(urlParts.port ? parseInt(urlParts.port) : void 0, protocol);
		} catch {}
	}
	return attributes;
};
function getHeaderAsString(headers, key) {
	const value = headers?.[key];
	if (value == null) return;
	return Array.isArray(value) ? String(value[0]) : String(value);
}
function startPublishSpan(exchange, routingKey, channel, options) {
	const normalizedExchange = normalizeExchange(exchange);
	const span = startInactiveSpan$1({
		name: `publish ${normalizedExchange}`,
		kind: import_src.SpanKind.PRODUCER,
		attributes: {
			...channel.connection[CONNECTION_ATTRIBUTES],
			[ATTR_MESSAGING_DESTINATION]: exchange,
			[ATTR_MESSAGING_DESTINATION_KIND]: MESSAGING_DESTINATION_KIND_VALUE_TOPIC,
			[ATTR_MESSAGING_RABBITMQ_ROUTING_KEY]: routingKey,
			[OLD_ATTR_MESSAGING_MESSAGE_ID]: options?.messageId,
			[ATTR_MESSAGING_CONVERSATION_ID]: options?.correlationId,
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: PUBLISHER_ORIGIN
		}
	});
	const modifiedOptions = options ?? {};
	modifiedOptions.headers = modifiedOptions.headers ?? {};
	const traceData = getTraceData$1({ span });
	if (traceData["sentry-trace"]) modifiedOptions.headers["sentry-trace"] = traceData["sentry-trace"];
	if (traceData.baggage) modifiedOptions.headers["baggage"] = traceData.baggage;
	return {
		span,
		modifiedOptions
	};
}
function startConsumeSpan(queue, msg, channel) {
	return startInactiveSpan$1({
		name: `${queue} process`,
		kind: import_src.SpanKind.CONSUMER,
		attributes: {
			...channel?.connection?.[CONNECTION_ATTRIBUTES],
			[ATTR_MESSAGING_DESTINATION]: msg.fields?.exchange,
			[ATTR_MESSAGING_DESTINATION_KIND]: MESSAGING_DESTINATION_KIND_VALUE_TOPIC,
			[ATTR_MESSAGING_RABBITMQ_ROUTING_KEY]: msg.fields?.routingKey,
			[ATTR_MESSAGING_OPERATION]: MESSAGING_OPERATION_VALUE_PROCESS,
			[OLD_ATTR_MESSAGING_MESSAGE_ID]: msg?.properties.messageId,
			[ATTR_MESSAGING_CONVERSATION_ID]: msg?.properties.correlationId,
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: CONSUMER_ORIGIN
		}
	});
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/amqplib/vendored/patches.js
var CONSUME_TIMEOUT_MS = 6e4;
function endConsumerSpan(message, isRejected, operation, requeue) {
	const storedSpan = message[MESSAGE_STORED_SPAN];
	if (!storedSpan) return;
	if (isRejected !== false) storedSpan.setStatus({
		code: 2,
		message: operation !== EndOperation.ChannelClosed && operation !== EndOperation.ChannelError ? `${operation} called on message${requeue === true ? " with requeue" : requeue === false ? " without requeue" : ""}` : operation
	});
	storedSpan.end();
	message[MESSAGE_STORED_SPAN] = void 0;
}
function endAllSpansOnChannel(channel, isRejected, operation, requeue) {
	(channel[CHANNEL_SPANS_NOT_ENDED] ?? []).forEach((msgDetails) => {
		endConsumerSpan(msgDetails.msg, isRejected, operation, requeue);
	});
	channel[CHANNEL_SPANS_NOT_ENDED] = [];
}
function checkConsumeTimeoutOnChannel(channel) {
	const currentTime = timestampInSeconds();
	const spansNotEnded = channel[CHANNEL_SPANS_NOT_ENDED] ?? [];
	let i;
	for (i = 0; i < spansNotEnded.length; i++) {
		const currMessage = spansNotEnded[i];
		if ((currentTime - currMessage.timeOfConsume) * 1e3 < CONSUME_TIMEOUT_MS) break;
		endConsumerSpan(currMessage.msg, null, EndOperation.InstrumentationTimeout, true);
	}
	spansNotEnded.splice(0, i);
}
function getConnectPatch(original) {
	return function patchedConnect(url, socketOptions, openCallback) {
		return original.call(this, url, socketOptions, function(err, conn) {
			if (err == null) {
				const urlAttributes = getConnectionAttributesFromUrl(url);
				const serverAttributes = getConnectionAttributesFromServer(conn);
				conn[CONNECTION_ATTRIBUTES] = {
					...urlAttributes,
					...serverAttributes
				};
			}
			openCallback.apply(this, arguments);
		});
	};
}
function getChannelEmitPatch(original) {
	return function emit(eventName) {
		if (eventName === "close") {
			endAllSpansOnChannel(this, true, EndOperation.ChannelClosed, void 0);
			const activeTimer = this[CHANNEL_CONSUME_TIMEOUT_TIMER];
			if (activeTimer) clearInterval(activeTimer);
			this[CHANNEL_CONSUME_TIMEOUT_TIMER] = void 0;
		} else if (eventName === "error") endAllSpansOnChannel(this, true, EndOperation.ChannelError, void 0);
		return original.apply(this, arguments);
	};
}
function getAckAllPatch(isRejected, endOperation) {
	return (original) => function ackAll(requeueOrEmpty) {
		endAllSpansOnChannel(this, isRejected, endOperation, requeueOrEmpty);
		return original.apply(this, arguments);
	};
}
function getAckPatch(isRejected, endOperation) {
	return (original) => function ack(message, allUpToOrRequeue, requeue) {
		const channel = this;
		const requeueResolved = endOperation === EndOperation.Reject ? allUpToOrRequeue : requeue;
		const spansNotEnded = channel[CHANNEL_SPANS_NOT_ENDED] ?? [];
		const msgIndex = spansNotEnded.findIndex((msgDetails) => msgDetails.msg === message);
		if (msgIndex < 0) endConsumerSpan(message, isRejected, endOperation, requeueResolved);
		else if (endOperation !== EndOperation.Reject && allUpToOrRequeue) {
			for (let i = 0; i <= msgIndex; i++) endConsumerSpan(spansNotEnded[i].msg, isRejected, endOperation, requeueResolved);
			spansNotEnded.splice(0, msgIndex + 1);
		} else {
			endConsumerSpan(message, isRejected, endOperation, requeueResolved);
			spansNotEnded.splice(msgIndex, 1);
		}
		return original.apply(this, arguments);
	};
}
function getConsumePatch(original) {
	return function consume(queue, onMessage, options) {
		const channel = this;
		if (!Object.prototype.hasOwnProperty.call(channel, CHANNEL_SPANS_NOT_ENDED)) {
			const timer = setInterval(() => {
				checkConsumeTimeoutOnChannel(channel);
			}, CONSUME_TIMEOUT_MS);
			timer.unref();
			channel[CHANNEL_CONSUME_TIMEOUT_TIMER] = timer;
			channel[CHANNEL_SPANS_NOT_ENDED] = [];
		}
		const patchedOnMessage = function(msg) {
			if (!msg) return onMessage.call(this, msg);
			const headers = msg.properties.headers ?? {};
			const sentryTrace = getHeaderAsString(headers, "sentry-trace");
			const baggage = getHeaderAsString(headers, "baggage");
			continueTrace$1({
				sentryTrace,
				baggage
			}, () => {
				const span = startConsumeSpan(queue, msg, channel);
				if (!options?.noAck) {
					channel[CHANNEL_SPANS_NOT_ENDED].push({
						msg,
						timeOfConsume: timestampInSeconds()
					});
					msg[MESSAGE_STORED_SPAN] = span;
				}
				withActiveSpan$1(span, () => {
					onMessage.call(this, msg);
				});
				if (options?.noAck) span.end();
			});
		};
		const callArgs = Array.prototype.slice.call(arguments);
		callArgs[1] = patchedOnMessage;
		return original.apply(this, callArgs);
	};
}
function getConfirmedPublishPatch(original) {
	return function confirmedPublish(exchange, routingKey, content, options, callback) {
		const channel = this;
		const { span, modifiedOptions } = startPublishSpan(exchange, routingKey, channel, options);
		const patchedOnConfirm = function(err, ok) {
			try {
				withActiveSpan$1(span, () => {
					callback?.call(this, err, ok);
				});
			} finally {
				if (err) span.setStatus({
					code: 2,
					message: "message confirmation has been nack'ed"
				});
				span.end();
			}
		};
		const argumentsCopy = [...arguments];
		argumentsCopy[3] = modifiedOptions;
		argumentsCopy[4] = patchedOnConfirm;
		channel[CHANNEL_IS_CONFIRM_PUBLISHING] = true;
		try {
			return original.apply(this, argumentsCopy);
		} finally {
			channel[CHANNEL_IS_CONFIRM_PUBLISHING] = false;
		}
	};
}
function getPublishPatch(original) {
	return function publish(exchange, routingKey, content, options) {
		if (this[CHANNEL_IS_CONFIRM_PUBLISHING]) return original.apply(this, arguments);
		const { span, modifiedOptions } = startPublishSpan(exchange, routingKey, this, options);
		const argumentsCopy = [...arguments];
		argumentsCopy[3] = modifiedOptions;
		const originalRes = original.apply(this, argumentsCopy);
		span.end();
		return originalRes;
	};
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/amqplib/vendored/instrumentation.js
var PACKAGE_NAME = "@sentry/instrumentation-amqplib";
var supportedVersions$5 = [">=0.5.5 <2"];
var AmqplibInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME, SDK_VERSION, config);
	}
	init() {
		const channelModelModuleFile = new InstrumentationNodeModuleFile("amqplib/lib/channel_model.js", supportedVersions$5, this.patchChannelModel.bind(this), this.unpatchChannelModel.bind(this));
		const callbackModelModuleFile = new InstrumentationNodeModuleFile("amqplib/lib/callback_model.js", supportedVersions$5, this.patchChannelModel.bind(this), this.unpatchChannelModel.bind(this));
		const connectModuleFile = new InstrumentationNodeModuleFile("amqplib/lib/connect.js", supportedVersions$5, this.patchConnect.bind(this), this.unpatchConnect.bind(this));
		return new InstrumentationNodeModuleDefinition("amqplib", supportedVersions$5, void 0, void 0, [
			channelModelModuleFile,
			connectModuleFile,
			callbackModelModuleFile
		]);
	}
	patchConnect(moduleExports) {
		const unpatchedExports = this.unpatchConnect(moduleExports);
		if (!isWrapped(unpatchedExports.connect)) this._wrap(unpatchedExports, "connect", getConnectPatch);
		return unpatchedExports;
	}
	unpatchConnect(moduleExports) {
		if (isWrapped(moduleExports.connect)) this._unwrap(moduleExports, "connect");
		return moduleExports;
	}
	patchChannelModel(moduleExports) {
		if (!isWrapped(moduleExports.Channel.prototype.publish)) this._wrap(moduleExports.Channel.prototype, "publish", getPublishPatch);
		if (!isWrapped(moduleExports.Channel.prototype.consume)) this._wrap(moduleExports.Channel.prototype, "consume", getConsumePatch);
		if (!isWrapped(moduleExports.Channel.prototype.ack)) this._wrap(moduleExports.Channel.prototype, "ack", getAckPatch(false, EndOperation.Ack));
		if (!isWrapped(moduleExports.Channel.prototype.nack)) this._wrap(moduleExports.Channel.prototype, "nack", getAckPatch(true, EndOperation.Nack));
		if (!isWrapped(moduleExports.Channel.prototype.reject)) this._wrap(moduleExports.Channel.prototype, "reject", getAckPatch(true, EndOperation.Reject));
		if (!isWrapped(moduleExports.Channel.prototype.ackAll)) this._wrap(moduleExports.Channel.prototype, "ackAll", getAckAllPatch(false, EndOperation.AckAll));
		if (!isWrapped(moduleExports.Channel.prototype.nackAll)) this._wrap(moduleExports.Channel.prototype, "nackAll", getAckAllPatch(true, EndOperation.NackAll));
		if (!isWrapped(moduleExports.Channel.prototype.emit)) this._wrap(moduleExports.Channel.prototype, "emit", getChannelEmitPatch);
		if (!isWrapped(moduleExports.ConfirmChannel.prototype.publish)) this._wrap(moduleExports.ConfirmChannel.prototype, "publish", getConfirmedPublishPatch);
		return moduleExports;
	}
	unpatchChannelModel(moduleExports) {
		if (isWrapped(moduleExports.Channel.prototype.publish)) this._unwrap(moduleExports.Channel.prototype, "publish");
		if (isWrapped(moduleExports.Channel.prototype.consume)) this._unwrap(moduleExports.Channel.prototype, "consume");
		if (isWrapped(moduleExports.Channel.prototype.ack)) this._unwrap(moduleExports.Channel.prototype, "ack");
		if (isWrapped(moduleExports.Channel.prototype.nack)) this._unwrap(moduleExports.Channel.prototype, "nack");
		if (isWrapped(moduleExports.Channel.prototype.reject)) this._unwrap(moduleExports.Channel.prototype, "reject");
		if (isWrapped(moduleExports.Channel.prototype.ackAll)) this._unwrap(moduleExports.Channel.prototype, "ackAll");
		if (isWrapped(moduleExports.Channel.prototype.nackAll)) this._unwrap(moduleExports.Channel.prototype, "nackAll");
		if (isWrapped(moduleExports.Channel.prototype.emit)) this._unwrap(moduleExports.Channel.prototype, "emit");
		if (isWrapped(moduleExports.ConfirmChannel.prototype.publish)) this._unwrap(moduleExports.ConfirmChannel.prototype, "publish");
		return moduleExports;
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/amqplib/index.js
var INTEGRATION_NAME$2 = "Amqplib";
var instrumentAmqplib = generateInstrumentOnce(INTEGRATION_NAME$2, () => new AmqplibInstrumentation());
var _amqplibIntegration = (() => {
	return {
		name: INTEGRATION_NAME$2,
		setupOnce() {
			instrumentAmqplib();
		}
	};
});
var amqplibIntegration = defineIntegration(_amqplibIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/vercelai/constants.js
var INTEGRATION_NAME$1 = "VercelAI";
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/vercelai/instrumentation.js
var SUPPORTED_VERSIONS = [">=3.0.0 <7"];
var INSTRUMENTED_METHODS = [
	"generateText",
	"streamText",
	"generateObject",
	"streamObject",
	"embed",
	"embedMany",
	"rerank"
];
function isToolError(obj) {
	if (typeof obj !== "object" || obj === null) return false;
	const candidate = obj;
	return "type" in candidate && "error" in candidate && "toolName" in candidate && "toolCallId" in candidate && candidate.type === "tool-error" && candidate.error instanceof Error;
}
function processToolCallResults(result) {
	if (typeof result !== "object" || result === null || !("content" in result)) return;
	const resultObj = result;
	if (!Array.isArray(resultObj.content)) return;
	captureToolErrors(resultObj.content);
	cleanupToolCallSpanContexts(resultObj.content);
}
function captureToolErrors(content) {
	for (const item of content) {
		if (!isToolError(item)) continue;
		const spanContext = _INTERNAL_getSpanContextForToolCallId(item.toolCallId);
		if (spanContext) withScope((scope) => {
			scope.setContext("trace", {
				trace_id: spanContext.traceId,
				span_id: spanContext.spanId
			});
			scope.setTag("vercel.ai.tool.name", item.toolName);
			scope.setTag("vercel.ai.tool.callId", item.toolCallId);
			scope.setLevel("error");
			captureException(item.error, { mechanism: {
				type: "auto.vercelai.otel",
				handled: false
			} });
		});
		else withScope((scope) => {
			scope.setTag("vercel.ai.tool.name", item.toolName);
			scope.setTag("vercel.ai.tool.callId", item.toolCallId);
			scope.setLevel("error");
			captureException(item.error, { mechanism: {
				type: "auto.vercelai.otel",
				handled: false
			} });
		});
	}
}
function cleanupToolCallSpanContexts(content) {
	for (const item of content) if (typeof item === "object" && item !== null && "toolCallId" in item && typeof item.toolCallId === "string") _INTERNAL_cleanupToolCallSpanContext(item.toolCallId);
}
function determineRecordingSettings(integrationRecordingOptions, methodTelemetryOptions, telemetryExplicitlyEnabled, defaultInputsEnabled, defaultOutputsEnabled) {
	return {
		recordInputs: integrationRecordingOptions?.recordInputs !== void 0 ? integrationRecordingOptions.recordInputs : methodTelemetryOptions.recordInputs !== void 0 ? methodTelemetryOptions.recordInputs : telemetryExplicitlyEnabled === true ? true : defaultInputsEnabled,
		recordOutputs: integrationRecordingOptions?.recordOutputs !== void 0 ? integrationRecordingOptions.recordOutputs : methodTelemetryOptions.recordOutputs !== void 0 ? methodTelemetryOptions.recordOutputs : telemetryExplicitlyEnabled === true ? true : defaultOutputsEnabled
	};
}
var SentryVercelAiInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super("@sentry/instrumentation-vercel-ai", SDK_VERSION, config);
		this._isPatched = false;
		this._callbacks = [];
	}
	/**
	* Initializes the instrumentation by defining the modules to be patched.
	*/
	init() {
		return new InstrumentationNodeModuleDefinition("ai", SUPPORTED_VERSIONS, this._patch.bind(this));
	}
	/**
	* Call the provided callback when the module is patched.
	* If it has already been patched, the callback will be called immediately.
	*/
	callWhenPatched(callback) {
		if (this._isPatched) callback();
		else this._callbacks.push(callback);
	}
	/**
	* Patches module exports to enable Vercel AI telemetry.
	*/
	_patch(moduleExports) {
		this._isPatched = true;
		this._callbacks.forEach((callback) => callback());
		this._callbacks = [];
		const generatePatch = (originalMethod) => {
			return new Proxy(originalMethod, { apply: (target, thisArg, args) => {
				const existingExperimentalTelemetry = args[0].experimental_telemetry || {};
				const isEnabled = existingExperimentalTelemetry.isEnabled;
				const client = getClient();
				const integration = client?.getIntegrationByName(INTEGRATION_NAME$1);
				const integrationOptions = integration?.options;
				const genAI = integration ? client?.getDataCollectionOptions().genAI : void 0;
				const { recordInputs, recordOutputs } = determineRecordingSettings(integrationOptions, existingExperimentalTelemetry, isEnabled, Boolean(genAI?.inputs), Boolean(genAI?.outputs));
				args[0].experimental_telemetry = {
					...existingExperimentalTelemetry,
					isEnabled: isEnabled !== void 0 ? isEnabled : true,
					recordInputs,
					recordOutputs
				};
				return handleCallbackErrors(() => Reflect.apply(target, thisArg, args), (error) => {
					if (error && typeof error === "object") addNonEnumerableProperty(error, "_sentry_active_span", getActiveSpan$1());
				}, () => {}, (result) => {
					processToolCallResults(result);
				});
			} });
		};
		if (Object.prototype.toString.call(moduleExports) === "[object Module]") {
			for (const method of INSTRUMENTED_METHODS) if (moduleExports[method] != null) moduleExports[method] = generatePatch(moduleExports[method]);
			return moduleExports;
		} else {
			const patchedModuleExports = INSTRUMENTED_METHODS.reduce((acc, curr) => {
				if (moduleExports[curr] != null) acc[curr] = generatePatch(moduleExports[curr]);
				return acc;
			}, {});
			return {
				...moduleExports,
				...patchedModuleExports
			};
		}
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/vercelai/index.js
var instrumentVercelAi = generateInstrumentOnce(INTEGRATION_NAME$1, () => new SentryVercelAiInstrumentation({}));
function shouldForceIntegration(client) {
	return !!client.getIntegrationByName("Modules")?.getModules?.()?.ai;
}
var _vercelAIIntegration = ((options = {}) => {
	let instrumentation;
	const parentIntegration = vercelAiIntegration(options);
	return extendIntegration(parentIntegration, {
		options,
		setupOnce() {
			instrumentation = instrumentVercelAi();
		},
		afterAllSetup(client) {
			if (options.force ?? shouldForceIntegration(client)) addVercelAiProcessors(client);
			else instrumentation?.callWhenPatched(() => addVercelAiProcessors(client));
		}
	});
});
var vercelAIIntegration = defineIntegration(_vercelAIIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/openai/instrumentation.js
var supportedVersions$4 = [">=4.0.0 <8"];
var SentryOpenAiInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super("@sentry/instrumentation-openai", SDK_VERSION, config);
	}
	/**
	* Initializes the instrumentation by defining the modules to be patched.
	*/
	init() {
		return new InstrumentationNodeModuleDefinition("openai", supportedVersions$4, this._patch.bind(this));
	}
	/**
	* Core patch logic applying instrumentation to the OpenAI and AzureOpenAI client constructors.
	*/
	_patch(exports) {
		let result = exports;
		result = this._patchClient(result, "OpenAI");
		result = this._patchClient(result, "AzureOpenAI");
		return result;
	}
	/**
	* Patch logic applying instrumentation to the specified client constructor.
	*/
	_patchClient(exports, exportKey) {
		const Original = exports[exportKey];
		if (!Original) return exports;
		const config = this.getConfig();
		const WrappedOpenAI = function(...args) {
			if (_INTERNAL_shouldSkipAiProviderWrapping("OpenAI")) return Reflect.construct(Original, args);
			const instance = Reflect.construct(Original, args);
			return instrumentOpenAiClient(instance, config);
		};
		Object.setPrototypeOf(WrappedOpenAI, Original);
		Object.setPrototypeOf(WrappedOpenAI.prototype, Original.prototype);
		for (const key of Object.getOwnPropertyNames(Original)) if (![
			"length",
			"name",
			"prototype"
		].includes(key)) {
			const descriptor = Object.getOwnPropertyDescriptor(Original, key);
			if (descriptor) Object.defineProperty(WrappedOpenAI, key, descriptor);
		}
		try {
			exports[exportKey] = WrappedOpenAI;
		} catch {
			Object.defineProperty(exports, exportKey, {
				value: WrappedOpenAI,
				writable: true,
				configurable: true,
				enumerable: true
			});
		}
		if (exports.default === Original) try {
			exports.default = WrappedOpenAI;
		} catch {
			Object.defineProperty(exports, "default", {
				value: WrappedOpenAI,
				writable: true,
				configurable: true,
				enumerable: true
			});
		}
		return exports;
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/openai/index.js
var instrumentOpenAi = generateInstrumentOnce(OPENAI_INTEGRATION_NAME, (options) => new SentryOpenAiInstrumentation(options));
var _openAiIntegration = ((options = {}) => {
	return {
		name: OPENAI_INTEGRATION_NAME,
		setupOnce() {
			instrumentOpenAi(options);
		}
	};
});
var openAIIntegration = defineIntegration(_openAiIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/anthropic-ai/instrumentation.js
var supportedVersions$3 = [">=0.19.2 <1.0.0"];
var SentryAnthropicAiInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super("@sentry/instrumentation-anthropic-ai", SDK_VERSION, config);
	}
	/**
	* Initializes the instrumentation by defining the modules to be patched.
	*/
	init() {
		return new InstrumentationNodeModuleDefinition("@anthropic-ai/sdk", supportedVersions$3, this._patch.bind(this));
	}
	/**
	* Core patch logic applying instrumentation to the Anthropic AI client constructor.
	*/
	_patch(exports) {
		const Original = exports.Anthropic;
		const config = this.getConfig();
		const WrappedAnthropic = function(...args) {
			if (_INTERNAL_shouldSkipAiProviderWrapping("Anthropic_AI")) return Reflect.construct(Original, args);
			const instance = Reflect.construct(Original, args);
			return instrumentAnthropicAiClient(instance, config);
		};
		Object.setPrototypeOf(WrappedAnthropic, Original);
		Object.setPrototypeOf(WrappedAnthropic.prototype, Original.prototype);
		for (const key of Object.getOwnPropertyNames(Original)) if (![
			"length",
			"name",
			"prototype"
		].includes(key)) {
			const descriptor = Object.getOwnPropertyDescriptor(Original, key);
			if (descriptor) Object.defineProperty(WrappedAnthropic, key, descriptor);
		}
		try {
			exports.Anthropic = WrappedAnthropic;
		} catch {
			Object.defineProperty(exports, "Anthropic", {
				value: WrappedAnthropic,
				writable: true,
				configurable: true,
				enumerable: true
			});
		}
		if (exports.default === Original) try {
			exports.default = WrappedAnthropic;
		} catch {
			Object.defineProperty(exports, "default", {
				value: WrappedAnthropic,
				writable: true,
				configurable: true,
				enumerable: true
			});
		}
		return exports;
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/anthropic-ai/index.js
var instrumentAnthropicAi = generateInstrumentOnce(ANTHROPIC_AI_INTEGRATION_NAME, (options) => new SentryAnthropicAiInstrumentation(options));
var _anthropicAIIntegration = ((options = {}) => {
	return {
		name: ANTHROPIC_AI_INTEGRATION_NAME,
		options,
		setupOnce() {
			instrumentAnthropicAi(options);
		}
	};
});
var anthropicAIIntegration = defineIntegration(_anthropicAIIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/google-genai/instrumentation.js
var supportedVersions$2 = [">=0.10.0 <2"];
var SentryGoogleGenAiInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super("@sentry/instrumentation-google-genai", SDK_VERSION, config);
	}
	/**
	* Initializes the instrumentation by defining the modules to be patched.
	*/
	init() {
		return new InstrumentationNodeModuleDefinition("@google/genai", supportedVersions$2, (exports) => this._patch(exports), (exports) => exports, [new InstrumentationNodeModuleFile("@google/genai/dist/node/index.cjs", supportedVersions$2, (exports) => this._patch(exports), (exports) => exports)]);
	}
	/**
	* Core patch logic applying instrumentation to the Google GenAI client constructor.
	*/
	_patch(exports) {
		const Original = exports.GoogleGenAI;
		const config = this.getConfig();
		if (typeof Original !== "function") return exports;
		const WrappedGoogleGenAI = function(...args) {
			if (_INTERNAL_shouldSkipAiProviderWrapping("Google_GenAI")) return Reflect.construct(Original, args);
			const instance = Reflect.construct(Original, args);
			return instrumentGoogleGenAIClient(instance, config);
		};
		Object.setPrototypeOf(WrappedGoogleGenAI, Original);
		Object.setPrototypeOf(WrappedGoogleGenAI.prototype, Original.prototype);
		for (const key of Object.getOwnPropertyNames(Original)) if (![
			"length",
			"name",
			"prototype"
		].includes(key)) {
			const descriptor = Object.getOwnPropertyDescriptor(Original, key);
			if (descriptor) Object.defineProperty(WrappedGoogleGenAI, key, descriptor);
		}
		replaceExports(exports, "GoogleGenAI", WrappedGoogleGenAI);
		return exports;
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/google-genai/index.js
var instrumentGoogleGenAI = generateInstrumentOnce(GOOGLE_GENAI_INTEGRATION_NAME, (options) => new SentryGoogleGenAiInstrumentation(options));
var _googleGenAIIntegration = ((options = {}) => {
	return {
		name: GOOGLE_GENAI_INTEGRATION_NAME,
		setupOnce() {
			instrumentGoogleGenAI(options);
		}
	};
});
var googleGenAIIntegration = defineIntegration(_googleGenAIIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/langchain/instrumentation.js
var supportedVersions$1 = [">=0.1.0 <2.0.0"];
function wrapRunnableMethod(originalMethod, sentryHandler, _methodName) {
	return new Proxy(originalMethod, { apply(target, thisArg, args) {
		const optionsIndex = 1;
		let options = args[optionsIndex];
		if (!options || typeof options !== "object" || Array.isArray(options)) {
			options = {};
			args[optionsIndex] = options;
		}
		options.callbacks = _INTERNAL_mergeLangChainCallbackHandler(options.callbacks, sentryHandler);
		return Reflect.apply(target, thisArg, args);
	} });
}
var SentryLangChainInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super("@sentry/instrumentation-langchain", SDK_VERSION, config);
	}
	/**
	* Initializes the instrumentation by defining the modules to be patched.
	* We patch the BaseChatModel class methods to inject callbacks
	*
	* We hook into provider packages (@langchain/anthropic, @langchain/openai, etc.)
	* because @langchain/core is often bundled and not loaded as a separate module
	*/
	init() {
		const modules = [];
		for (const packageName of [
			"@langchain/anthropic",
			"@langchain/openai",
			"@langchain/google-genai",
			"@langchain/mistralai",
			"@langchain/google-vertexai",
			"@langchain/groq"
		]) modules.push(new InstrumentationNodeModuleDefinition(packageName, supportedVersions$1, this._patch.bind(this), (exports) => exports, [new InstrumentationNodeModuleFile(`${packageName}/dist/index.cjs`, supportedVersions$1, this._patch.bind(this), (exports) => exports)]));
		modules.push(new InstrumentationNodeModuleDefinition("langchain", supportedVersions$1, this._patch.bind(this), (exports) => exports, [new InstrumentationNodeModuleFile("langchain/dist/chat_models/universal.cjs", supportedVersions$1, this._patch.bind(this), (exports) => exports)]));
		return modules;
	}
	/**
	* Core patch logic - patches chat model and embedding methods
	* This is called when a LangChain provider package is loaded
	*/
	_patch(exports) {
		_INTERNAL_skipAiProviderWrapping([
			OPENAI_INTEGRATION_NAME,
			ANTHROPIC_AI_INTEGRATION_NAME,
			GOOGLE_GENAI_INTEGRATION_NAME
		]);
		const config = this.getConfig();
		const sentryHandler = createLangChainCallbackHandler(config);
		this._patchRunnableMethods(exports, sentryHandler);
		this._patchEmbeddingsMethods(exports, config);
		return exports;
	}
	/**
	* Patches chat model methods (invoke, stream, batch) to inject Sentry callbacks
	* Finds a chat model class from the provider package exports and patches its prototype methods
	*/
	_patchRunnableMethods(exports, sentryHandler) {
		const knownChatModelNames = [
			"ChatAnthropic",
			"ChatOpenAI",
			"ChatGoogleGenerativeAI",
			"ChatMistralAI",
			"ChatVertexAI",
			"ChatGroq",
			"ConfigurableModel"
		];
		const exportsToPatch = exports.universal_exports ?? exports;
		const chatModelClass = Object.values(exportsToPatch).find((exp) => {
			return typeof exp === "function" && knownChatModelNames.includes(exp.name);
		});
		if (!chatModelClass) return;
		const targetProto = chatModelClass.prototype;
		if (targetProto.__sentry_patched__) return;
		targetProto.__sentry_patched__ = true;
		for (const methodName of [
			"invoke",
			"stream",
			"batch"
		]) {
			const method = targetProto[methodName];
			if (typeof method === "function") targetProto[methodName] = wrapRunnableMethod(method, sentryHandler);
		}
	}
	/**
	* Patches embedding class methods (embedQuery, embedDocuments) to create Sentry spans.
	*
	* Unlike chat models which use LangChain's callback system, the Embeddings base class
	* has no callback support. We wrap the methods directly on the prototype.
	*
	* Instruments any exported class whose prototype has both embedQuery and embedDocuments as functions.
	*/
	_patchEmbeddingsMethods(exports, options) {
		const exportsToPatch = exports.universal_exports ?? exports;
		for (const exp of Object.values(exportsToPatch)) {
			if (typeof exp !== "function" || !exp.prototype) continue;
			const proto = exp.prototype;
			if (typeof proto.embedQuery !== "function" || typeof proto.embedDocuments !== "function") continue;
			if (proto.__sentry_patched__) continue;
			proto.__sentry_patched__ = true;
			instrumentLangChainEmbeddings(proto, options);
		}
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/langchain/index.js
var instrumentLangChain = generateInstrumentOnce(LANGCHAIN_INTEGRATION_NAME, (options) => new SentryLangChainInstrumentation(options));
var _langChainIntegration = ((options = {}) => {
	return {
		name: LANGCHAIN_INTEGRATION_NAME,
		setupOnce() {
			instrumentLangChain(options);
		}
	};
});
var langChainIntegration = defineIntegration(_langChainIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/langgraph/instrumentation.js
var supportedVersions = [">=0.0.0 <2.0.0"];
var SentryLangGraphInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super("@sentry/instrumentation-langgraph", SDK_VERSION, config);
	}
	/**
	* Initializes the instrumentation by defining the modules to be patched.
	*/
	init() {
		return [new InstrumentationNodeModuleDefinition("@langchain/langgraph", supportedVersions, this._patch.bind(this), (exports) => exports, [new InstrumentationNodeModuleFile(
			/**
			* In CJS, LangGraph packages re-export from dist/index.cjs files.
			* Patching only the root module sometimes misses the real implementation or
			* gets overwritten when that file is loaded. We add a file-level patch so that
			* _patch runs again on the concrete implementation
			*/
			"@langchain/langgraph/dist/index.cjs",
			supportedVersions,
			this._patch.bind(this),
			(exports) => exports
		), new InstrumentationNodeModuleFile(
			/**
			* In CJS, the prebuilt submodule re-exports from dist/prebuilt/index.cjs.
			* We add a file-level patch under the main module so that CJS require()
			* of @langchain/langgraph/prebuilt gets patched.
			*/
			"@langchain/langgraph/dist/prebuilt/index.cjs",
			supportedVersions,
			this._patch.bind(this),
			(exports) => exports
		)]), new InstrumentationNodeModuleDefinition("@langchain/langgraph/prebuilt", supportedVersions, this._patch.bind(this), (exports) => exports, [new InstrumentationNodeModuleFile(
			/**
			* In CJS, the prebuilt submodule re-exports from dist/prebuilt/index.cjs.
			* We add file-level patches so _patch runs on the concrete implementation.
			*/
			"@langchain/langgraph/dist/prebuilt/index.cjs",
			supportedVersions,
			this._patch.bind(this),
			(exports) => exports
		)])];
	}
	/**
	* Core patch logic applying instrumentation to the LangGraph module.
	*/
	_patch(exports) {
		const genAI = getClient()?.getDataCollectionOptions().genAI;
		const options = {
			...this.getConfig(),
			recordInputs: this.getConfig().recordInputs ?? genAI?.inputs ?? false,
			recordOutputs: this.getConfig().recordOutputs ?? genAI?.outputs ?? false
		};
		if (exports.StateGraph && typeof exports.StateGraph === "function") instrumentStateGraph(exports.StateGraph.prototype, options);
		if (exports.createReactAgent && typeof exports.createReactAgent === "function") {
			const originalCreateReactAgent = exports.createReactAgent;
			Object.defineProperty(exports, "createReactAgent", {
				value: instrumentCreateReactAgent(originalCreateReactAgent, options),
				writable: true,
				enumerable: true,
				configurable: true
			});
		}
		return exports;
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/langgraph/index.js
var instrumentLangGraph = generateInstrumentOnce(LANGGRAPH_INTEGRATION_NAME, (options) => new SentryLangGraphInstrumentation(options));
var _langGraphIntegration = ((options = {}) => {
	return {
		name: LANGGRAPH_INTEGRATION_NAME,
		setupOnce() {
			instrumentLangGraph(options);
		}
	};
});
var langGraphIntegration = defineIntegration(_langGraphIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/featureFlagShims/launchDarkly.js
var launchDarklyIntegrationShim = defineIntegration((_options) => {
	if (!isBrowser()) consoleSandbox(() => {
		console.warn("The launchDarklyIntegration() can only be used in the browser.");
	});
	return { name: "LaunchDarkly" };
});
function buildLaunchDarklyFlagUsedHandlerShim() {
	if (!isBrowser()) consoleSandbox(() => {
		console.warn("The buildLaunchDarklyFlagUsedHandler() can only be used in the browser.");
	});
	return {
		name: "sentry-flag-auditor",
		type: "flag-used",
		synchronous: true,
		method: () => null
	};
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/featureFlagShims/openFeature.js
var openFeatureIntegrationShim = defineIntegration((_options) => {
	if (!isBrowser()) consoleSandbox(() => {
		console.warn("The openFeatureIntegration() can only be used in the browser.");
	});
	return { name: "OpenFeature" };
});
var OpenFeatureIntegrationHookShim = class {
	/**
	*
	*/
	constructor() {
		if (!isBrowser()) consoleSandbox(() => {
			console.warn("The OpenFeatureIntegrationHook can only be used in the browser.");
		});
	}
	/**
	*
	*/
	after() {}
	/**
	*
	*/
	error() {}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/featureFlagShims/statsig.js
var statsigIntegrationShim = defineIntegration((_options) => {
	if (!isBrowser()) consoleSandbox(() => {
		console.warn("The statsigIntegration() can only be used in the browser.");
	});
	return { name: "Statsig" };
});
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/featureFlagShims/unleash.js
var unleashIntegrationShim = defineIntegration((_options) => {
	if (!isBrowser()) consoleSandbox(() => {
		console.warn("The unleashIntegration() can only be used in the browser.");
	});
	return { name: "Unleash" };
});
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/featureFlagShims/growthbook.js
var growthbookIntegrationShim = growthbookIntegration;
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/firebase/otel/patches/firestore.js
function patchFirestore(firestoreSupportedVersions, wrap, unwrap) {
	const moduleFirestoreCJS = new InstrumentationNodeModuleDefinition("@firebase/firestore", firestoreSupportedVersions, (moduleExports) => wrapMethods(moduleExports, wrap, unwrap));
	for (const file of [
		"@firebase/firestore/dist/lite/index.node.cjs.js",
		"@firebase/firestore/dist/lite/index.node.mjs.js",
		"@firebase/firestore/dist/lite/index.rn.esm2017.js",
		"@firebase/firestore/dist/lite/index.cjs.js"
	]) moduleFirestoreCJS.files.push(new InstrumentationNodeModuleFile(file, firestoreSupportedVersions, (moduleExports) => wrapMethods(moduleExports, wrap, unwrap), (moduleExports) => unwrapMethods(moduleExports, unwrap)));
	return moduleFirestoreCJS;
}
function wrapMethods(moduleExports, wrap, unwrap) {
	unwrapMethods(moduleExports, unwrap);
	wrap(moduleExports, "addDoc", patchAddDoc());
	wrap(moduleExports, "getDocs", patchGetDocs());
	wrap(moduleExports, "setDoc", patchSetDoc());
	wrap(moduleExports, "deleteDoc", patchDeleteDoc());
	return moduleExports;
}
function unwrapMethods(moduleExports, unwrap) {
	for (const method of [
		"addDoc",
		"getDocs",
		"setDoc",
		"deleteDoc"
	]) if (isWrapped(moduleExports[method])) unwrap(moduleExports, method);
	return moduleExports;
}
function patchAddDoc() {
	return function addDoc(original) {
		return function(reference, data) {
			return startFirestoreSpan("addDoc", reference, () => original(reference, data));
		};
	};
}
function patchDeleteDoc() {
	return function deleteDoc(original) {
		return function(reference) {
			return startFirestoreSpan("deleteDoc", reference.parent || reference, () => original(reference));
		};
	};
}
function patchGetDocs() {
	return function getDocs(original) {
		return function(reference) {
			return startFirestoreSpan("getDocs", reference, () => original(reference));
		};
	};
}
function patchSetDoc() {
	return function setDoc(original) {
		return function(reference, data, options) {
			return startFirestoreSpan("setDoc", reference.parent || reference, () => {
				return typeof options !== "undefined" ? original(reference, data, options) : original(reference, data);
			});
		};
	};
}
function startFirestoreSpan(spanName, reference, callback) {
	return startSpan$3({
		name: `${spanName} ${reference.path}`,
		op: "db.query",
		kind: SPAN_KIND.CLIENT,
		attributes: {
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.firebase.otel.firestore",
			[Lt]: spanName,
			...buildAttributes(reference)
		}
	}, callback);
}
function getPortAndAddress(settings) {
	let address;
	let port;
	if (typeof settings.host === "string") {
		if (settings.host.startsWith("[")) {
			if (settings.host.endsWith("]")) address = settings.host.replace(/^\[|\]$/g, "");
			else if (settings.host.includes("]:")) {
				const lastColonIndex = settings.host.lastIndexOf(":");
				if (lastColonIndex !== -1) {
					address = settings.host.slice(1, lastColonIndex).replace(/^\[|\]$/g, "");
					port = settings.host.slice(lastColonIndex + 1);
				}
			}
		} else if (net.isIPv6(settings.host)) address = settings.host;
		else {
			const lastColonIndex = settings.host.lastIndexOf(":");
			if (lastColonIndex !== -1) {
				address = settings.host.slice(0, lastColonIndex);
				port = settings.host.slice(lastColonIndex + 1);
			} else address = settings.host;
		}
	}
	return {
		address,
		port: port ? parseInt(port, 10) : void 0
	};
}
function buildAttributes(reference) {
	const firestoreApp = reference.firestore.app;
	const firestoreOptions = firestoreApp.options;
	const settings = (reference.firestore.toJSON() || {}).settings || {};
	const attributes = {
		[wt]: reference.path,
		[Ct]: firestoreApp.name,
		[jt]: "firebase.firestore",
		"firebase.firestore.type": reference.type,
		"firebase.firestore.options.projectId": firestoreOptions.projectId,
		"firebase.firestore.options.appId": firestoreOptions.appId,
		"firebase.firestore.options.messagingSenderId": firestoreOptions.messagingSenderId,
		"firebase.firestore.options.storageBucket": firestoreOptions.storageBucket
	};
	const { address, port } = getPortAndAddress(settings);
	if (address) attributes[au] = address;
	if (port) attributes[ou] = port;
	return attributes;
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/firebase/otel/patches/functions.js
function patchFunctions(functionsSupportedVersions, wrap, unwrap) {
	const moduleFunctionsCJS = new InstrumentationNodeModuleDefinition("firebase-functions", functionsSupportedVersions);
	[
		{
			name: "firebase-functions/lib/v2/providers/https.js",
			triggerType: "function"
		},
		{
			name: "firebase-functions/lib/v2/providers/firestore.js",
			triggerType: "firestore"
		},
		{
			name: "firebase-functions/lib/v2/providers/scheduler.js",
			triggerType: "scheduler"
		},
		{
			name: "firebase-functions/lib/v2/storage.js",
			triggerType: "storage"
		}
	].forEach(({ name, triggerType }) => {
		moduleFunctionsCJS.files.push(new InstrumentationNodeModuleFile(name, functionsSupportedVersions, (moduleExports) => wrapCommonFunctions(moduleExports, wrap, unwrap, triggerType), (moduleExports) => unwrapCommonFunctions(moduleExports, unwrap)));
	});
	return moduleFunctionsCJS;
}
function patchV2Functions(triggerType) {
	return function v2FunctionsWrapper(original) {
		return function(...args) {
			const handler = typeof args[0] === "function" ? args[0] : args[1];
			const documentOrOptions = typeof args[0] === "function" ? void 0 : args[0];
			if (!handler) return original.call(this, ...args);
			const wrappedHandler = async function(...handlerArgs) {
				const functionName = process.env.FUNCTION_TARGET || process.env.K_SERVICE || "unknown";
				const attributes = {
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.firebase.otel.functions",
					"faas.name": functionName,
					"faas.trigger": triggerType,
					"faas.provider": "firebase"
				};
				if (process.env.GCLOUD_PROJECT) attributes["cloud.project_id"] = process.env.GCLOUD_PROJECT;
				if (process.env.EVENTARC_CLOUD_EVENT_SOURCE) attributes["cloud.event_source"] = process.env.EVENTARC_CLOUD_EVENT_SOURCE;
				return startSpanManual$1({
					name: `firebase.function.${triggerType}`,
					op: "http.request",
					kind: SPAN_KIND.SERVER,
					attributes
				}, async (span) => {
					try {
						const result = await handler.apply(this, handlerArgs);
						span.end();
						return result;
					} catch (error) {
						span.setStatus({ code: 2 });
						captureException(error, { mechanism: {
							type: "auto.firebase.otel.functions",
							handled: false
						} });
						span.end();
						await flush(2e3);
						throw error;
					}
				});
			};
			if (documentOrOptions) return original.call(this, documentOrOptions, wrappedHandler);
			else return original.call(this, wrappedHandler);
		};
	};
}
function wrapCommonFunctions(moduleExports, wrap, unwrap, triggerType) {
	unwrapCommonFunctions(moduleExports, unwrap);
	switch (triggerType) {
		case "function":
			wrap(moduleExports, "onRequest", patchV2Functions("http.request"));
			wrap(moduleExports, "onCall", patchV2Functions("http.call"));
			break;
		case "firestore":
			wrap(moduleExports, "onDocumentCreated", patchV2Functions("firestore.document.created"));
			wrap(moduleExports, "onDocumentUpdated", patchV2Functions("firestore.document.updated"));
			wrap(moduleExports, "onDocumentDeleted", patchV2Functions("firestore.document.deleted"));
			wrap(moduleExports, "onDocumentWritten", patchV2Functions("firestore.document.written"));
			wrap(moduleExports, "onDocumentCreatedWithAuthContext", patchV2Functions("firestore.document.created"));
			wrap(moduleExports, "onDocumentUpdatedWithAuthContext", patchV2Functions("firestore.document.updated"));
			wrap(moduleExports, "onDocumentDeletedWithAuthContext", patchV2Functions("firestore.document.deleted"));
			wrap(moduleExports, "onDocumentWrittenWithAuthContext", patchV2Functions("firestore.document.written"));
			break;
		case "scheduler":
			wrap(moduleExports, "onSchedule", patchV2Functions("scheduler.scheduled"));
			break;
		case "storage":
			wrap(moduleExports, "onObjectFinalized", patchV2Functions("storage.object.finalized"));
			wrap(moduleExports, "onObjectArchived", patchV2Functions("storage.object.archived"));
			wrap(moduleExports, "onObjectDeleted", patchV2Functions("storage.object.deleted"));
			wrap(moduleExports, "onObjectMetadataUpdated", patchV2Functions("storage.object.metadataUpdated"));
	}
	return moduleExports;
}
function unwrapCommonFunctions(moduleExports, unwrap) {
	for (const method of [
		"onSchedule",
		"onRequest",
		"onCall",
		"onObjectFinalized",
		"onObjectArchived",
		"onObjectDeleted",
		"onObjectMetadataUpdated",
		"onDocumentCreated",
		"onDocumentUpdated",
		"onDocumentDeleted",
		"onDocumentWritten",
		"onDocumentCreatedWithAuthContext",
		"onDocumentUpdatedWithAuthContext",
		"onDocumentDeletedWithAuthContext",
		"onDocumentWrittenWithAuthContext"
	]) if (isWrapped(moduleExports[method])) unwrap(moduleExports, method);
	return moduleExports;
}
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/firebase/otel/firebaseInstrumentation.js
var firestoreSupportedVersions = [">=3.0.0 <5"];
var functionsSupportedVersions = [">=6.0.0 <7"];
var FirebaseInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super("@sentry/instrumentation-firebase", SDK_VERSION, config);
	}
	/**
	*
	* @protected
	*/
	init() {
		const modules = [];
		modules.push(patchFirestore(firestoreSupportedVersions, this._wrap, this._unwrap));
		modules.push(patchFunctions(functionsSupportedVersions, this._wrap, this._unwrap));
		return modules;
	}
};
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/firebase/firebase.js
var INTEGRATION_NAME = "Firebase";
var instrumentFirebase = generateInstrumentOnce(INTEGRATION_NAME, () => new FirebaseInstrumentation());
var _firebaseIntegration = (() => {
	return {
		name: INTEGRATION_NAME,
		setupOnce() {
			instrumentFirebase();
		}
	};
});
var firebaseIntegration = defineIntegration(_firebaseIntegration);
//#endregion
//#region node_modules/@sentry/node/build/esm/integrations/tracing/index.js
function getAutoPerformanceIntegrations() {
	return [
		expressIntegration(),
		fastifyIntegration(),
		graphqlIntegration(),
		honoIntegration(),
		mongoIntegration(),
		mongooseIntegration(),
		mysqlIntegration(),
		mysql2Integration(),
		redisIntegration(),
		postgresIntegration(),
		prismaIntegration(),
		hapiIntegration(),
		koaIntegration(),
		connectIntegration(),
		tediousIntegration(),
		genericPoolIntegration(),
		kafkaIntegration(),
		amqplibIntegration(),
		lruMemoizerIntegration(),
		langChainIntegration(),
		langGraphIntegration(),
		vercelAIIntegration(),
		openAIIntegration(),
		anthropicAIIntegration(),
		googleGenAIIntegration(),
		postgresJsIntegration(),
		firebaseIntegration()
	];
}
function getOpenTelemetryInstrumentationToPreload() {
	return [
		instrumentSentryHttp,
		instrumentExpress$1,
		instrumentConnect,
		instrumentFastifyV3,
		instrumentHapi,
		instrumentHono,
		instrumentKafka,
		instrumentKoa,
		instrumentLruMemoizer,
		instrumentMongo,
		instrumentMongoose,
		instrumentMysql,
		instrumentMysql2$1,
		instrumentPostgres,
		instrumentHapi,
		instrumentGraphql,
		instrumentRedis,
		instrumentTedious,
		instrumentGenericPool,
		instrumentAmqplib,
		instrumentLangChain,
		instrumentVercelAi,
		instrumentOpenAi,
		instrumentPostgresJs,
		instrumentFirebase,
		instrumentAnthropicAi,
		instrumentGoogleGenAI,
		instrumentLangGraph
	];
}
//#endregion
//#region node_modules/@sentry/node/build/esm/sdk/initOtel.js
var MAX_MAX_SPAN_WAIT_DURATION = 1e6;
var OTEL_API_GLOBAL_KEY = /* @__PURE__ */ Symbol.for("opentelemetry.js.api.1");
function registerGlobalTracerProvider(provider) {
	if (import_src.trace.setGlobalTracerProvider(provider)) return true;
	const otelGlobal = globalThis;
	const registry = otelGlobal[OTEL_API_GLOBAL_KEY];
	if (registry && !registry.trace) {
		DEBUG_BUILD$1 && debug$3.warn("Replaced a pre-existing OpenTelemetry API registry that was created by a different @opentelemetry/api version and would have blocked tracing. If you want to manage OpenTelemetry yourself, set `skipOpenTelemetrySetup: true` in `Sentry.init()`.");
		otelGlobal[OTEL_API_GLOBAL_KEY] = void 0;
		if (!import_src.trace.setGlobalTracerProvider(provider)) return false;
		const recreatedRegistry = otelGlobal[OTEL_API_GLOBAL_KEY];
		if (recreatedRegistry) {
			const { propagation: _propagation, context: _context, ...carriedOverSlots } = registry;
			otelGlobal[OTEL_API_GLOBAL_KEY] = {
				...carriedOverSlots,
				...recreatedRegistry
			};
		}
		return true;
	}
	return false;
}
function initOpenTelemetry(client, options = {}) {
	if (client.getOptions().debug) setupOpenTelemetryLogger();
	const [provider, asyncLocalStorageLookup] = setupOtel(client, options);
	client.traceProvider = provider;
	client.asyncLocalStorageLookup = asyncLocalStorageLookup;
}
function preloadOpenTelemetry(options = {}) {
	const { debug: debug$1 } = options;
	if (debug$1) debug$3.enable();
	initializeEsmLoader();
	getPreloadMethods(options.integrations).forEach((fn) => {
		fn();
		if (debug$1) debug$3.log(`[Sentry] Preloaded ${fn.id} instrumentation`);
	});
}
function getPreloadMethods(integrationNames) {
	const instruments = getOpenTelemetryInstrumentationToPreload();
	if (!integrationNames) return instruments;
	return instruments.filter((instrumentation) => {
		const id = instrumentation.id;
		return integrationNames.some((integrationName) => id === integrationName || id.startsWith(`${integrationName}.`));
	});
}
function setupOtel(client, options = {}) {
	if (!(client.getOptions().openTelemetryBasicTracerProvider || !!options.spanProcessors?.length)) return setupSentryTracerProvider(client);
	const provider = new BasicTracerProvider({
		sampler: new SentrySampler(client),
		resource: getSentryResource("node"),
		forceFlushTimeoutMillis: 500,
		spanProcessors: [new SentrySpanProcessor({
			timeout: _clampSpanProcessorTimeout(client.getOptions().maxSpanWaitDuration),
			client
		}), ...options.spanProcessors || []]
	});
	registerGlobalTracerProvider(provider);
	import_src.propagation.setGlobalPropagator(new SentryPropagator());
	const ctxManager = new SentryContextManager();
	import_src.context.setGlobalContextManager(ctxManager);
	return [provider, ctxManager.getAsyncLocalStorageLookup()];
}
function setupSentryTracerProvider(client) {
	const provider = new SentryTracerProvider({ resource: getSentryResource("node") });
	if (!registerGlobalTracerProvider(provider)) {
		DEBUG_BUILD$1 && debug$3.warn("Could not register SentryTracerProvider because another OpenTelemetry tracer provider is already registered.");
		return [void 0, void 0];
	}
	setIsSetup("SentryTracerProvider");
	import_src.propagation.setGlobalPropagator(new SentryPropagator());
	const ctxManager = new SentryContextManager();
	import_src.context.setGlobalContextManager(ctxManager);
	client.on("spanEnd", (span) => {
		applyOtelSpanData(span, { finalizeStatus: true });
	});
	if (hasSpanStreamingEnabled(client)) client.on("preprocessSpan", backfillStreamedSpanDataFromOtel);
	client.on("preprocessEvent", (event) => {
		if (event.type !== "transaction") return;
		event.contexts = {
			...event.contexts,
			otel: {
				resource: provider.resource?.attributes,
				...event.contexts?.otel
			}
		};
	});
	return [provider, ctxManager.getAsyncLocalStorageLookup()];
}
function _clampSpanProcessorTimeout(maxSpanWaitDuration) {
	if (maxSpanWaitDuration == null) return;
	if (maxSpanWaitDuration > MAX_MAX_SPAN_WAIT_DURATION) {
		DEBUG_BUILD$1 && debug$3.warn(`\`maxSpanWaitDuration\` is too high, using the maximum value of ${MAX_MAX_SPAN_WAIT_DURATION}`);
		return MAX_MAX_SPAN_WAIT_DURATION;
	} else if (maxSpanWaitDuration <= 0 || Number.isNaN(maxSpanWaitDuration)) {
		DEBUG_BUILD$1 && debug$3.warn("`maxSpanWaitDuration` must be a positive number, using default value instead.");
		return;
	}
	return maxSpanWaitDuration;
}
//#endregion
//#region node_modules/@sentry/node/build/esm/sdk/index.js
function getDefaultIntegrationsWithoutPerformance() {
	return getDefaultIntegrations$1().filter((integration) => integration.name !== "Http" && integration.name !== "NodeFetch").concat(httpIntegration(), nativeNodeFetchIntegration());
}
function getDefaultIntegrations(options) {
	return [...getDefaultIntegrationsWithoutPerformance(), ...hasSpansEnabled(options) ? getAutoPerformanceIntegrations() : []];
}
function applyDiagnosticsChannelInjectionIntegrations(integrations, options) {
	if (isDiagnosticsChannelInjectionEnabled() && hasSpansEnabled(options)) {
		const diagnosticsChannelInjection = resolveDiagnosticsChannelInjection();
		if (diagnosticsChannelInjection) {
			const replaced = new Set(diagnosticsChannelInjection.replacedOtelIntegrationNames);
			return [...integrations.filter((i) => !replaced.has(i.name)), ...diagnosticsChannelInjection.integrations];
		}
	}
	return integrations;
}
function init(options = {}) {
	return _init(options, getDefaultIntegrations);
}
function _init(options = {}, getDefaultIntegrationsImpl) {
	applySdkMetadata(options, "node");
	const diagnosticsChannelInjection = isDiagnosticsChannelInjectionEnabled() && hasSpansEnabled(options) ? resolveDiagnosticsChannelInjection() : void 0;
	if (diagnosticsChannelInjection) diagnosticsChannelInjection.register();
	let defaultIntegrations = options.defaultIntegrations ?? getDefaultIntegrationsImpl(options);
	if (diagnosticsChannelInjection && Array.isArray(defaultIntegrations) && defaultIntegrations.length > 0) {
		const replaced = new Set(diagnosticsChannelInjection.replacedOtelIntegrationNames);
		defaultIntegrations = [...defaultIntegrations.filter((integration) => !replaced.has(integration.name)), ...diagnosticsChannelInjection.integrations];
	}
	const client = init$1({
		...options,
		defaultIntegrations
	});
	if (client && !options.skipOpenTelemetrySetup) {
		initOpenTelemetry(client, { spanProcessors: options.openTelemetrySpanProcessors });
		validateOpenTelemetrySetup();
	}
	if (diagnosticsChannelInjection) diagnosticsChannelInjection.detect();
	return client;
}
function initWithoutDefaultIntegrations(options = {}) {
	return _init(options, () => []);
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/config/index.js
var SENTRY_INSTRUMENTATIONS = [
	...amqplibConfig,
	...anthropicAiConfig,
	...awsSdkConfig,
	...dataloaderConfig,
	...expressConfig,
	...firebaseConfig,
	...genericPoolConfig,
	...googleGenAiConfig,
	...graphqlConfig,
	...hapiConfig,
	...ioredisConfig,
	...kafkajsConfig,
	...knexConfig,
	...koaConfig,
	...langchainConfig,
	...langgraphConfig,
	...lruMemoizerConfig,
	...mongodbConfig,
	...mongooseConfig,
	...mysql2Config,
	...mysqlConfig,
	...nestjsConfig,
	...openaiConfig,
	...pgConfig,
	...postgresJsConfig,
	...redisConfig,
	...remixConfig,
	...tediousConfig,
	...vercelAiConfig
];
[
	...amqplibSubscribeInjection,
	...anthropicAiSubscribeInjection,
	...awsSdkSubscribeInjection,
	...dataloaderSubscribeInjection,
	...expressSubscribeInjection,
	...firebaseSubscribeInjection,
	...genericPoolSubscribeInjection,
	...googleGenAiSubscribeInjection,
	...graphqlSubscribeInjection,
	...hapiSubscribeInjection,
	...ioredisSubscribeInjection,
	...kafkajsSubscribeInjection,
	...knexSubscribeInjection,
	...koaSubscribeInjection,
	...langchainSubscribeInjection,
	...langgraphSubscribeInjection,
	...lruMemoizerSubscribeInjection,
	...mongodbSubscribeInjection,
	...mongooseSubscribeInjection,
	...mysql2SubscribeInjection,
	...mysqlSubscribeInjection,
	...nestjsSubscribeInjection,
	...openaiSubscribeInjection,
	...pgSubscribeInjection,
	...postgresJsSubscribeInjection,
	...redisSubscribeInjection,
	...remixSubscribeInjection,
	...tediousSubscribeInjection,
	...vercelAiSubscribeInjection
];
function instrumentedModuleNames(instrumentations = []) {
	return [...uniq([...SENTRY_INSTRUMENTATIONS, ...instrumentations].map((i) => i.module.name)), "@remix-run/node"];
}
instrumentedModuleNames();
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/_virtual/_commonjsHelpers.js
function getDefaultExportFromCjs(x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vendored/semifies/index.js
var semifies$1 = satisfies;
function satisfies(v, t) {
	const [version] = parse$5(v, "");
	for (const checks of compile(t)) if (checkAll(checks, version)) return true;
	return false;
}
function checkAll(checks, v) {
	for (const [ok2, t] of checks) if (!test(v, t, ok2)) return false;
	return true;
}
function match(t) {
	if (t === "latest") t = ">=0";
	return t.match(/^([^\d+]*)(\d.*)$/) || [
		null,
		"",
		"*.*.*"
	];
}
function compile(t) {
	const result = [];
	let checks = [];
	const tokens = t.trim().split(/\s+/);
	for (let i = 0; i < tokens.length; i++) {
		const t2 = tokens[i];
		if (t2 === "-") continue;
		if (t2 === "||") {
			result.push(checks);
			checks = [];
			continue;
		}
		if (/^[<>=~v^]+$/.test(t2) && i + 1 < tokens.length) {
			tokens[i + 1] = t2 + tokens[i + 1];
			continue;
		}
		const res = match(t2);
		let cmp = res[1] || "=";
		if (cmp.endsWith("v")) cmp = cmp.slice(0, -1);
		let [v, c] = parse$5(res[2], cmp);
		if (i + 2 < tokens.length && tokens[i + 1] === "-") {
			const m = match(tokens[i + 2]);
			tokens[i + 2] = "<=" + (m[2].indexOf("-") === -1 ? m[2] + ".*.*" : m[2]);
			c = ">=";
		}
		if (c[0] === "~") {
			const digs = res[2].split("-")[0].split(".").length;
			checks.push([">=", v]);
			checks.push(["<", digs === 1 ? inc(v, 0) : digs === 2 ? inc(v, 1) : inc(v, 1)]);
		} else if (c[0] === "^") {
			const digs = v[0] !== 0 ? 0 : v[1] !== 0 ? 1 : 2;
			checks.push([">=", v]);
			checks.push(["<", digs === 0 ? inc(v, 0) : digs === 1 ? inc(v, 1) : inc(v, 2)]);
		} else checks.push([c.replace("~", "").replace("^", ""), v]);
	}
	if (checks.length) result.push(checks);
	return result;
}
function inc(v, n) {
	const cpy = v.slice(0);
	if (v[n] === -1) return cpy;
	cpy[n++]++;
	for (; n < 3; n++) cpy[n] = 0;
	return cpy;
}
function num(n) {
	return n === "x" || n === "X" || n === "*" || n === "latest" ? -1 : Number(n);
}
function numOrString(s) {
	return /^\d+$/.test(s) ? Number(s) : s;
}
function ok(c, a, b) {
	return b === -1 ? c !== "<" : c === "=" ? a === b : c === ">" ? a > b : c === ">=" ? a >= b : c === "<" ? a < b : c === "<=" ? a <= b : false;
}
function parse$5(v, c) {
	v = v.split("+")[0];
	const [a, b] = v.split("-");
	const nums = a.split(".").map(num).slice(0, 3);
	const last = Math.max(nums.length - 1, 0);
	if (c === ">") {
		c = ">=";
		nums.push(0, 0, 0);
		nums[last]++;
	} else if (c === "") nums.push(0, 0, 0);
	else nums.push(-1, -1, -1);
	if (!b) return [nums.slice(0, 3), c];
	return [nums.slice(0, 3).concat(b.split(".").map(numOrString)), c];
}
function test(v, t, c) {
	if (!ok("=", v[0], t[0])) return ok(c, v[0], t[0]);
	if (!ok("=", v[1], t[1])) return ok(c, v[1], t[1]);
	if (!ok("=", v[2], t[2])) return ok(c, v[2], t[2]);
	if (v.length === 3 && t.length === 3) return ok(c, v[2], t[2]);
	if (c[0] === "<" && (t.length === 3 || v.length === 3)) return false;
	if (c[0] === ">") {
		if (v.length === 3) return true;
		if (t.length === 3) return false;
	}
	for (let i = 3; i < Math.max(v.length, t.length); i++) if (ok(c, v[i] || "", t[i] || "")) return true;
	return false;
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vendored/esquery/dist/esquery.esm.min.js
function e(e2, t2) {
	(null == t2 || t2 > e2.length) && (t2 = e2.length);
	for (var r2 = 0, n2 = Array(t2); r2 < t2; r2++) n2[r2] = e2[r2];
	return n2;
}
function t(e2, t2) {
	return (function(e3) {
		if (Array.isArray(e3)) return e3;
	})(e2) || (function(e3, t3) {
		var r2 = null == e3 ? null : "undefined" != typeof Symbol && e3[Symbol.iterator] || e3["@@iterator"];
		if (null != r2) {
			var n2, o2, a2, i2, s2 = [], u2 = true, l2 = false;
			try {
				if (a2 = (r2 = r2.call(e3)).next, 0 === t3);
				else for (; !(u2 = (n2 = a2.call(r2)).done) && (s2.push(n2.value), s2.length !== t3); u2 = true);
			} catch (e4) {
				l2 = true, o2 = e4;
			} finally {
				try {
					if (!u2 && null != r2.return && (i2 = r2.return(), Object(i2) !== i2)) return;
				} finally {
					if (l2) throw o2;
				}
			}
			return s2;
		}
	})(e2, t2) || o(e2, t2) || (function() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	})();
}
function r(t2) {
	return (function(t3) {
		if (Array.isArray(t3)) return e(t3);
	})(t2) || (function(e2) {
		if ("undefined" != typeof Symbol && null != e2[Symbol.iterator] || null != e2["@@iterator"]) return Array.from(e2);
	})(t2) || o(t2) || (function() {
		throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	})();
}
function n(e2) {
	return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
		return typeof e3;
	} : function(e3) {
		return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
	})(e2);
}
function o(t2, r2) {
	if (t2) {
		if ("string" == typeof t2) return e(t2, r2);
		var n2 = {}.toString.call(t2).slice(8, -1);
		return "Object" === n2 && t2.constructor && (n2 = t2.constructor.name), "Map" === n2 || "Set" === n2 ? Array.from(t2) : "Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2) ? e(t2, r2) : void 0;
	}
}
function a(e2, t2) {
	return e2(t2 = { exports: {} }, t2.exports), t2.exports;
}
var i = a((function(e2, t2) {
	(function e3(t3) {
		var r2, n2, o2, a2, i2, s2;
		function u2(e4) {
			var t4, r3, n3 = {};
			for (t4 in e4) e4.hasOwnProperty(t4) && (r3 = e4[t4], n3[t4] = "object" == typeof r3 && null !== r3 ? u2(r3) : r3);
			return n3;
		}
		function l2(e4, t4) {
			this.parent = e4, this.key = t4;
		}
		function c2(e4, t4, r3, n3) {
			this.node = e4, this.path = t4, this.wrap = r3, this.ref = n3;
		}
		function f2() {}
		function p2(e4) {
			return null != e4 && "object" == typeof e4 && "string" == typeof e4.type;
		}
		function h2(e4, t4) {
			return (e4 === r2.ObjectExpression || e4 === r2.ObjectPattern) && "properties" === t4;
		}
		function y2(e4, t4) {
			for (var r3 = e4.length - 1; r3 >= 0; --r3) if (e4[r3].node === t4) return true;
			return false;
		}
		function d2(e4, t4) {
			return new f2().traverse(e4, t4);
		}
		function m2(e4, t4) {
			var r3;
			return r3 = (function(e5, t5) {
				var r4, n3, o3, a3;
				for (n3 = e5.length, o3 = 0; n3;) t5(e5[a3 = o3 + (r4 = n3 >>> 1)]) ? n3 = r4 : (o3 = a3 + 1, n3 -= r4 + 1);
				return o3;
			})(t4, (function(t5) {
				return t5.range[0] > e4.range[0];
			})), e4.extendedRange = [e4.range[0], e4.range[1]], r3 !== t4.length && (e4.extendedRange[1] = t4[r3].range[0]), (r3 -= 1) >= 0 && (e4.extendedRange[0] = t4[r3].range[1]), e4;
		}
		return r2 = {
			AssignmentExpression: "AssignmentExpression",
			AssignmentPattern: "AssignmentPattern",
			ArrayExpression: "ArrayExpression",
			ArrayPattern: "ArrayPattern",
			ArrowFunctionExpression: "ArrowFunctionExpression",
			AwaitExpression: "AwaitExpression",
			BlockStatement: "BlockStatement",
			BinaryExpression: "BinaryExpression",
			BreakStatement: "BreakStatement",
			CallExpression: "CallExpression",
			CatchClause: "CatchClause",
			ChainExpression: "ChainExpression",
			ClassBody: "ClassBody",
			ClassDeclaration: "ClassDeclaration",
			ClassExpression: "ClassExpression",
			ComprehensionBlock: "ComprehensionBlock",
			ComprehensionExpression: "ComprehensionExpression",
			ConditionalExpression: "ConditionalExpression",
			ContinueStatement: "ContinueStatement",
			DebuggerStatement: "DebuggerStatement",
			DirectiveStatement: "DirectiveStatement",
			DoWhileStatement: "DoWhileStatement",
			EmptyStatement: "EmptyStatement",
			ExportAllDeclaration: "ExportAllDeclaration",
			ExportDefaultDeclaration: "ExportDefaultDeclaration",
			ExportNamedDeclaration: "ExportNamedDeclaration",
			ExportSpecifier: "ExportSpecifier",
			ExpressionStatement: "ExpressionStatement",
			ForStatement: "ForStatement",
			ForInStatement: "ForInStatement",
			ForOfStatement: "ForOfStatement",
			FunctionDeclaration: "FunctionDeclaration",
			FunctionExpression: "FunctionExpression",
			GeneratorExpression: "GeneratorExpression",
			Identifier: "Identifier",
			IfStatement: "IfStatement",
			ImportExpression: "ImportExpression",
			ImportDeclaration: "ImportDeclaration",
			ImportDefaultSpecifier: "ImportDefaultSpecifier",
			ImportNamespaceSpecifier: "ImportNamespaceSpecifier",
			ImportSpecifier: "ImportSpecifier",
			Literal: "Literal",
			LabeledStatement: "LabeledStatement",
			LogicalExpression: "LogicalExpression",
			MemberExpression: "MemberExpression",
			MetaProperty: "MetaProperty",
			MethodDefinition: "MethodDefinition",
			ModuleSpecifier: "ModuleSpecifier",
			NewExpression: "NewExpression",
			ObjectExpression: "ObjectExpression",
			ObjectPattern: "ObjectPattern",
			PrivateIdentifier: "PrivateIdentifier",
			Program: "Program",
			Property: "Property",
			PropertyDefinition: "PropertyDefinition",
			RestElement: "RestElement",
			ReturnStatement: "ReturnStatement",
			SequenceExpression: "SequenceExpression",
			SpreadElement: "SpreadElement",
			Super: "Super",
			SwitchStatement: "SwitchStatement",
			SwitchCase: "SwitchCase",
			TaggedTemplateExpression: "TaggedTemplateExpression",
			TemplateElement: "TemplateElement",
			TemplateLiteral: "TemplateLiteral",
			ThisExpression: "ThisExpression",
			ThrowStatement: "ThrowStatement",
			TryStatement: "TryStatement",
			UnaryExpression: "UnaryExpression",
			UpdateExpression: "UpdateExpression",
			VariableDeclaration: "VariableDeclaration",
			VariableDeclarator: "VariableDeclarator",
			WhileStatement: "WhileStatement",
			WithStatement: "WithStatement",
			YieldExpression: "YieldExpression"
		}, o2 = {
			AssignmentExpression: ["left", "right"],
			AssignmentPattern: ["left", "right"],
			ArrayExpression: ["elements"],
			ArrayPattern: ["elements"],
			ArrowFunctionExpression: ["params", "body"],
			AwaitExpression: ["argument"],
			BlockStatement: ["body"],
			BinaryExpression: ["left", "right"],
			BreakStatement: ["label"],
			CallExpression: ["callee", "arguments"],
			CatchClause: ["param", "body"],
			ChainExpression: ["expression"],
			ClassBody: ["body"],
			ClassDeclaration: [
				"id",
				"superClass",
				"body"
			],
			ClassExpression: [
				"id",
				"superClass",
				"body"
			],
			ComprehensionBlock: ["left", "right"],
			ComprehensionExpression: [
				"blocks",
				"filter",
				"body"
			],
			ConditionalExpression: [
				"test",
				"consequent",
				"alternate"
			],
			ContinueStatement: ["label"],
			DebuggerStatement: [],
			DirectiveStatement: [],
			DoWhileStatement: ["body", "test"],
			EmptyStatement: [],
			ExportAllDeclaration: ["source"],
			ExportDefaultDeclaration: ["declaration"],
			ExportNamedDeclaration: [
				"declaration",
				"specifiers",
				"source"
			],
			ExportSpecifier: ["exported", "local"],
			ExpressionStatement: ["expression"],
			ForStatement: [
				"init",
				"test",
				"update",
				"body"
			],
			ForInStatement: [
				"left",
				"right",
				"body"
			],
			ForOfStatement: [
				"left",
				"right",
				"body"
			],
			FunctionDeclaration: [
				"id",
				"params",
				"body"
			],
			FunctionExpression: [
				"id",
				"params",
				"body"
			],
			GeneratorExpression: [
				"blocks",
				"filter",
				"body"
			],
			Identifier: [],
			IfStatement: [
				"test",
				"consequent",
				"alternate"
			],
			ImportExpression: ["source"],
			ImportDeclaration: ["specifiers", "source"],
			ImportDefaultSpecifier: ["local"],
			ImportNamespaceSpecifier: ["local"],
			ImportSpecifier: ["imported", "local"],
			Literal: [],
			LabeledStatement: ["label", "body"],
			LogicalExpression: ["left", "right"],
			MemberExpression: ["object", "property"],
			MetaProperty: ["meta", "property"],
			MethodDefinition: ["key", "value"],
			ModuleSpecifier: [],
			NewExpression: ["callee", "arguments"],
			ObjectExpression: ["properties"],
			ObjectPattern: ["properties"],
			PrivateIdentifier: [],
			Program: ["body"],
			Property: ["key", "value"],
			PropertyDefinition: ["key", "value"],
			RestElement: ["argument"],
			ReturnStatement: ["argument"],
			SequenceExpression: ["expressions"],
			SpreadElement: ["argument"],
			Super: [],
			SwitchStatement: ["discriminant", "cases"],
			SwitchCase: ["test", "consequent"],
			TaggedTemplateExpression: ["tag", "quasi"],
			TemplateElement: [],
			TemplateLiteral: ["quasis", "expressions"],
			ThisExpression: [],
			ThrowStatement: ["argument"],
			TryStatement: [
				"block",
				"handler",
				"finalizer"
			],
			UnaryExpression: ["argument"],
			UpdateExpression: ["argument"],
			VariableDeclaration: ["declarations"],
			VariableDeclarator: ["id", "init"],
			WhileStatement: ["test", "body"],
			WithStatement: ["object", "body"],
			YieldExpression: ["argument"]
		}, n2 = {
			Break: a2 = {},
			Skip: i2 = {},
			Remove: s2 = {}
		}, l2.prototype.replace = function(e4) {
			this.parent[this.key] = e4;
		}, l2.prototype.remove = function() {
			return Array.isArray(this.parent) ? (this.parent.splice(this.key, 1), true) : (this.replace(null), false);
		}, f2.prototype.path = function() {
			var e4, t4, r3, n3, o3;
			function a3(e5, t5) {
				if (Array.isArray(t5)) for (r3 = 0, n3 = t5.length; r3 < n3; ++r3) e5.push(t5[r3]);
				else e5.push(t5);
			}
			if (!this.__current.path) return null;
			for (o3 = [], e4 = 2, t4 = this.__leavelist.length; e4 < t4; ++e4) a3(o3, this.__leavelist[e4].path);
			return a3(o3, this.__current.path), o3;
		}, f2.prototype.type = function() {
			return this.current().type || this.__current.wrap;
		}, f2.prototype.parents = function() {
			var e4, t4, r3;
			for (r3 = [], e4 = 1, t4 = this.__leavelist.length; e4 < t4; ++e4) r3.push(this.__leavelist[e4].node);
			return r3;
		}, f2.prototype.current = function() {
			return this.__current.node;
		}, f2.prototype.__execute = function(e4, t4) {
			var r3, n3;
			return n3 = void 0, r3 = this.__current, this.__current = t4, this.__state = null, e4 && (n3 = e4.call(this, t4.node, this.__leavelist[this.__leavelist.length - 1].node)), this.__current = r3, n3;
		}, f2.prototype.notify = function(e4) {
			this.__state = e4;
		}, f2.prototype.skip = function() {
			this.notify(i2);
		}, f2.prototype.break = function() {
			this.notify(a2);
		}, f2.prototype.remove = function() {
			this.notify(s2);
		}, f2.prototype.__initialize = function(e4, t4) {
			this.visitor = t4, this.root = e4, this.__worklist = [], this.__leavelist = [], this.__current = null, this.__state = null, this.__fallback = null, "iteration" === t4.fallback ? this.__fallback = Object.keys : "function" == typeof t4.fallback && (this.__fallback = t4.fallback), this.__keys = o2, t4.keys && (this.__keys = Object.assign(Object.create(this.__keys), t4.keys));
		}, f2.prototype.traverse = function(e4, t4) {
			var r3, n3, o3, s3, u3, l3, f3, d3, m3, x2, v2, g2;
			for (this.__initialize(e4, t4), g2 = {}, r3 = this.__worklist, n3 = this.__leavelist, r3.push(new c2(e4, null, null, null)), n3.push(new c2(null, null, null, null)); r3.length;) if ((o3 = r3.pop()) !== g2) {
				if (o3.node) {
					if (l3 = this.__execute(t4.enter, o3), this.__state === a2 || l3 === a2) return;
					if (r3.push(g2), n3.push(o3), this.__state === i2 || l3 === i2) continue;
					if (u3 = (s3 = o3.node).type || o3.wrap, !(x2 = this.__keys[u3])) {
						if (!this.__fallback) throw new Error("Unknown node type " + u3 + ".");
						x2 = this.__fallback(s3);
					}
					for (d3 = x2.length; (d3 -= 1) >= 0;) if (v2 = s3[f3 = x2[d3]]) {
						if (Array.isArray(v2)) {
							for (m3 = v2.length; (m3 -= 1) >= 0;) if (v2[m3] && !y2(n3, v2[m3])) {
								if (h2(u3, x2[d3])) o3 = new c2(v2[m3], [f3, m3], "Property", null);
								else {
									if (!p2(v2[m3])) continue;
									o3 = new c2(v2[m3], [f3, m3], null, null);
								}
								r3.push(o3);
							}
						} else if (p2(v2)) {
							if (y2(n3, v2)) continue;
							r3.push(new c2(v2, f3, null, null));
						}
					}
				}
			} else if (o3 = n3.pop(), l3 = this.__execute(t4.leave, o3), this.__state === a2 || l3 === a2) return;
		}, f2.prototype.replace = function(e4, t4) {
			var r3, n3, o3, u3, f3, y3, d3, m3, x2, v2, g2, A2, E;
			function b(e5) {
				var t5, n4, o4, a3;
				if (e5.ref.remove()) {
					for (n4 = e5.ref.key, a3 = e5.ref.parent, t5 = r3.length; t5--;) if ((o4 = r3[t5]).ref && o4.ref.parent === a3) {
						if (o4.ref.key < n4) break;
						--o4.ref.key;
					}
				}
			}
			for (this.__initialize(e4, t4), g2 = {}, r3 = this.__worklist, n3 = this.__leavelist, y3 = new c2(e4, null, null, new l2(A2 = { root: e4 }, "root")), r3.push(y3), n3.push(y3); r3.length;) if ((y3 = r3.pop()) !== g2) {
				if (void 0 !== (f3 = this.__execute(t4.enter, y3)) && f3 !== a2 && f3 !== i2 && f3 !== s2 && (y3.ref.replace(f3), y3.node = f3), this.__state !== s2 && f3 !== s2 || (b(y3), y3.node = null), this.__state === a2 || f3 === a2) return A2.root;
				if ((o3 = y3.node) && (r3.push(g2), n3.push(y3), this.__state !== i2 && f3 !== i2)) {
					if (u3 = o3.type || y3.wrap, !(x2 = this.__keys[u3])) {
						if (!this.__fallback) throw new Error("Unknown node type " + u3 + ".");
						x2 = this.__fallback(o3);
					}
					for (d3 = x2.length; (d3 -= 1) >= 0;) if (v2 = o3[E = x2[d3]]) if (Array.isArray(v2)) {
						for (m3 = v2.length; (m3 -= 1) >= 0;) if (v2[m3]) {
							if (h2(u3, x2[d3])) y3 = new c2(v2[m3], [E, m3], "Property", new l2(v2, m3));
							else {
								if (!p2(v2[m3])) continue;
								y3 = new c2(v2[m3], [E, m3], null, new l2(v2, m3));
							}
							r3.push(y3);
						}
					} else p2(v2) && r3.push(new c2(v2, E, null, new l2(o3, E)));
				}
			} else if (y3 = n3.pop(), void 0 !== (f3 = this.__execute(t4.leave, y3)) && f3 !== a2 && f3 !== i2 && f3 !== s2 && y3.ref.replace(f3), this.__state !== s2 && f3 !== s2 || b(y3), this.__state === a2 || f3 === a2) return A2.root;
			return A2.root;
		}, t3.Syntax = r2, t3.traverse = d2, t3.replace = function(e4, t4) {
			return new f2().replace(e4, t4);
		}, t3.attachComments = function(e4, t4, r3) {
			var o3, a3, i3, s3, l3 = [];
			if (!e4.range) throw new Error("attachComments needs range information");
			if (!r3.length) {
				if (t4.length) {
					for (i3 = 0, a3 = t4.length; i3 < a3; i3 += 1) (o3 = u2(t4[i3])).extendedRange = [0, e4.range[0]], l3.push(o3);
					e4.leadingComments = l3;
				}
				return e4;
			}
			for (i3 = 0, a3 = t4.length; i3 < a3; i3 += 1) l3.push(m2(u2(t4[i3]), r3));
			return s3 = 0, d2(e4, { enter: function(e5) {
				for (var t5; s3 < l3.length && !((t5 = l3[s3]).extendedRange[1] > e5.range[0]);) t5.extendedRange[1] === e5.range[0] ? (e5.leadingComments || (e5.leadingComments = []), e5.leadingComments.push(t5), l3.splice(s3, 1)) : s3 += 1;
				return s3 === l3.length ? n2.Break : l3[s3].extendedRange[0] > e5.range[1] ? n2.Skip : void 0;
			} }), s3 = 0, d2(e4, { leave: function(e5) {
				for (var t5; s3 < l3.length && (t5 = l3[s3], !(e5.range[1] < t5.extendedRange[0]));) e5.range[1] === t5.extendedRange[0] ? (e5.trailingComments || (e5.trailingComments = []), e5.trailingComments.push(t5), l3.splice(s3, 1)) : s3 += 1;
				return s3 === l3.length ? n2.Break : l3[s3].extendedRange[0] > e5.range[1] ? n2.Skip : void 0;
			} }), e4;
		}, t3.VisitorKeys = o2, t3.VisitorOption = n2, t3.Controller = f2, t3.cloneEnvironment = function() {
			return e3({});
		}, t3;
	})(t2);
}));
var s$1 = a((function(e2) {
	e2.exports && (e2.exports = (function() {
		function e3(t2, r2, n2, o2) {
			this.message = t2, this.expected = r2, this.found = n2, this.location = o2, this.name = "SyntaxError", "function" == typeof Error.captureStackTrace && Error.captureStackTrace(this, e3);
		}
		return (function(e4, t2) {
			function r2() {
				this.constructor = e4;
			}
			r2.prototype = t2.prototype, e4.prototype = new r2();
		})(e3, Error), e3.buildMessage = function(e4, t2) {
			var r2 = {
				literal: function(e5) {
					return "\"" + o2(e5.text) + "\"";
				},
				class: function(e5) {
					var t3, r3 = "";
					for (t3 = 0; t3 < e5.parts.length; t3++) r3 += e5.parts[t3] instanceof Array ? a2(e5.parts[t3][0]) + "-" + a2(e5.parts[t3][1]) : a2(e5.parts[t3]);
					return "[" + (e5.inverted ? "^" : "") + r3 + "]";
				},
				any: function(e5) {
					return "any character";
				},
				end: function(e5) {
					return "end of input";
				},
				other: function(e5) {
					return e5.description;
				}
			};
			function n2(e5) {
				return e5.charCodeAt(0).toString(16).toUpperCase();
			}
			function o2(e5) {
				return e5.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (function(e6) {
					return "\\x0" + n2(e6);
				})).replace(/[\x10-\x1F\x7F-\x9F]/g, (function(e6) {
					return "\\x" + n2(e6);
				}));
			}
			function a2(e5) {
				return e5.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (function(e6) {
					return "\\x0" + n2(e6);
				})).replace(/[\x10-\x1F\x7F-\x9F]/g, (function(e6) {
					return "\\x" + n2(e6);
				}));
			}
			return "Expected " + (function(e5) {
				var t3, n3, o3, a3 = new Array(e5.length);
				for (t3 = 0; t3 < e5.length; t3++) a3[t3] = (o3 = e5[t3], r2[o3.type](o3));
				if (a3.sort(), a3.length > 0) {
					for (t3 = 1, n3 = 1; t3 < a3.length; t3++) a3[t3 - 1] !== a3[t3] && (a3[n3] = a3[t3], n3++);
					a3.length = n3;
				}
				switch (a3.length) {
					case 1: return a3[0];
					case 2: return a3[0] + " or " + a3[1];
					default: return a3.slice(0, -1).join(", ") + ", or " + a3[a3.length - 1];
				}
			})(e4) + " but " + (function(e5) {
				return e5 ? "\"" + o2(e5) + "\"" : "end of input";
			})(t2) + " found.";
		}, {
			SyntaxError: e3,
			parse: function(t2, r2) {
				r2 = void 0 !== r2 ? r2 : {};
				var n2, o2, a2, i2, s2 = {}, u2 = { start: Ae }, l2 = Ae, c2 = de(" ", false), f2 = /^[^ [\],():#!=><~+.]/, p2 = me([
					" ",
					"[",
					"]",
					",",
					"(",
					")",
					":",
					"#",
					"!",
					"=",
					">",
					"<",
					"~",
					"+",
					"."
				], true, false), h2 = de(">", false), y2 = de("~", false), d2 = de("+", false), m2 = de(",", false), x2 = function(e4, t3) {
					return [e4].concat(t3.map((function(e5) {
						return e5[3];
					})));
				}, v2 = de("!", false), g2 = de("*", false), A2 = de("#", false), E = de("[", false), b = de("]", false), S = /^[><!]/, _ = me([
					">",
					"<",
					"!"
				], false, false), C = de("=", false), P = function(e4) {
					return (e4 || "") + "=";
				}, w = /^[><]/, k = me([">", "<"], false, false), D = de(".", false), I = function(e4, t3, r3) {
					return {
						type: "attribute",
						name: e4,
						operator: t3,
						value: r3
					};
				}, j = de("\"", false), T = /^[^\\"]/, F = me(["\\", "\""], true, false), R = de("\\", false), O = { type: "any" }, L = function(e4, t3) {
					return e4 + t3;
				}, M = function(e4) {
					return {
						type: "literal",
						value: (t3 = e4.join(""), t3.replace(/\\(.)/g, (function(e5, t4) {
							switch (t4) {
								case "b": return "\b";
								case "f": return "\f";
								case "n": return "\n";
								case "r": return "\r";
								case "t": return "	";
								case "v": return "\v";
								default: return t4;
							}
						})))
					};
					var t3;
				}, B = de("'", false), U = /^[^\\']/, K = me(["\\", "'"], true, false), N = /^[0-9]/, W = me([["0", "9"]], false, false), V = de("type(", false), q = /^[^ )]/, G = me([" ", ")"], true, false), z = de(")", false), H = /^[imsu]/, Y = me([
					"i",
					"m",
					"s",
					"u"
				], false, false), $ = de("/", false), J = /^[^\]\\]/, Q = me(["]", "\\"], true, false), X = /^[^\/\\[]/, Z = me([
					"/",
					"\\",
					"["
				], true, false), ee = de(":not(", false), te = de(":matches(", false), re = function(e4) {
					return {
						type: "matches",
						selectors: e4
					};
				}, ne = de(":is(", false), oe = de(":has(", false), ae = de(":first-child", false), ie = de(":last-child", false), se = de(":nth-child(", false), ue = de(":nth-last-child(", false), le = de(":", false), ce = 0, fe = [{
					line: 1,
					column: 1
				}], pe = 0, he = [], ye = {};
				if ("startRule" in r2) {
					if (!(r2.startRule in u2)) throw new Error(`Can't start parsing from rule "` + r2.startRule + "\".");
					l2 = u2[r2.startRule];
				}
				function de(e4, t3) {
					return {
						type: "literal",
						text: e4,
						ignoreCase: t3
					};
				}
				function me(e4, t3, r3) {
					return {
						type: "class",
						parts: e4,
						inverted: t3,
						ignoreCase: r3
					};
				}
				function xe(e4) {
					var r3, n3 = fe[e4];
					if (n3) return n3;
					for (r3 = e4 - 1; !fe[r3];) r3--;
					for (n3 = {
						line: (n3 = fe[r3]).line,
						column: n3.column
					}; r3 < e4;) 10 === t2.charCodeAt(r3) ? (n3.line++, n3.column = 1) : n3.column++, r3++;
					return fe[e4] = n3, n3;
				}
				function ve(e4, t3) {
					var r3 = xe(e4), n3 = xe(t3);
					return {
						start: {
							offset: e4,
							line: r3.line,
							column: r3.column
						},
						end: {
							offset: t3,
							line: n3.line,
							column: n3.column
						}
					};
				}
				function ge(e4) {
					ce < pe || (ce > pe && (pe = ce, he = []), he.push(e4));
				}
				function Ae() {
					var e4, t3, r3, n3, o3 = 36 * ce + 0, a3 = ye[o3];
					return a3 ? (ce = a3.nextPos, a3.result) : (e4 = ce, (t3 = Ee()) !== s2 && (r3 = _e()) !== s2 && Ee() !== s2 ? e4 = t3 = 1 === (n3 = r3).length ? n3[0] : {
						type: "matches",
						selectors: n3
					} : (ce = e4, e4 = s2), e4 === s2 && (e4 = ce, (t3 = Ee()) !== s2 && (t3 = void 0), e4 = t3), ye[o3] = {
						nextPos: ce,
						result: e4
					}, e4);
				}
				function Ee() {
					var e4, r3, n3 = 36 * ce + 1, o3 = ye[n3];
					if (o3) return ce = o3.nextPos, o3.result;
					for (e4 = [], 32 === t2.charCodeAt(ce) ? (r3 = " ", ce++) : (r3 = s2, ge(c2)); r3 !== s2;) e4.push(r3), 32 === t2.charCodeAt(ce) ? (r3 = " ", ce++) : (r3 = s2, ge(c2));
					return ye[n3] = {
						nextPos: ce,
						result: e4
					}, e4;
				}
				function be() {
					var e4, r3, n3, o3 = 36 * ce + 2, a3 = ye[o3];
					if (a3) return ce = a3.nextPos, a3.result;
					if (r3 = [], f2.test(t2.charAt(ce)) ? (n3 = t2.charAt(ce), ce++) : (n3 = s2, ge(p2)), n3 !== s2) for (; n3 !== s2;) r3.push(n3), f2.test(t2.charAt(ce)) ? (n3 = t2.charAt(ce), ce++) : (n3 = s2, ge(p2));
					else r3 = s2;
					return r3 !== s2 && (r3 = r3.join("")), e4 = r3, ye[o3] = {
						nextPos: ce,
						result: e4
					}, e4;
				}
				function Se() {
					var e4, r3, n3, o3 = 36 * ce + 3, a3 = ye[o3];
					return a3 ? (ce = a3.nextPos, a3.result) : (e4 = ce, (r3 = Ee()) !== s2 ? (62 === t2.charCodeAt(ce) ? (n3 = ">", ce++) : (n3 = s2, ge(h2)), n3 !== s2 && Ee() !== s2 ? e4 = r3 = "child" : (ce = e4, e4 = s2)) : (ce = e4, e4 = s2), e4 === s2 && (e4 = ce, (r3 = Ee()) !== s2 ? (126 === t2.charCodeAt(ce) ? (n3 = "~", ce++) : (n3 = s2, ge(y2)), n3 !== s2 && Ee() !== s2 ? e4 = r3 = "sibling" : (ce = e4, e4 = s2)) : (ce = e4, e4 = s2), e4 === s2 && (e4 = ce, (r3 = Ee()) !== s2 ? (43 === t2.charCodeAt(ce) ? (n3 = "+", ce++) : (n3 = s2, ge(d2)), n3 !== s2 && Ee() !== s2 ? e4 = r3 = "adjacent" : (ce = e4, e4 = s2)) : (ce = e4, e4 = s2), e4 === s2 && (e4 = ce, 32 === t2.charCodeAt(ce) ? (r3 = " ", ce++) : (r3 = s2, ge(c2)), r3 !== s2 && (n3 = Ee()) !== s2 ? e4 = r3 = "descendant" : (ce = e4, e4 = s2)))), ye[o3] = {
						nextPos: ce,
						result: e4
					}, e4);
				}
				function _e() {
					var e4, r3, n3, o3, a3, i3, u3, l3, c3 = 36 * ce + 5, f3 = ye[c3];
					if (f3) return ce = f3.nextPos, f3.result;
					if (e4 = ce, (r3 = Pe()) !== s2) {
						for (n3 = [], o3 = ce, (a3 = Ee()) !== s2 ? (44 === t2.charCodeAt(ce) ? (i3 = ",", ce++) : (i3 = s2, ge(m2)), i3 !== s2 && (u3 = Ee()) !== s2 && (l3 = Pe()) !== s2 ? o3 = a3 = [
							a3,
							i3,
							u3,
							l3
						] : (ce = o3, o3 = s2)) : (ce = o3, o3 = s2); o3 !== s2;) n3.push(o3), o3 = ce, (a3 = Ee()) !== s2 ? (44 === t2.charCodeAt(ce) ? (i3 = ",", ce++) : (i3 = s2, ge(m2)), i3 !== s2 && (u3 = Ee()) !== s2 && (l3 = Pe()) !== s2 ? o3 = a3 = [
							a3,
							i3,
							u3,
							l3
						] : (ce = o3, o3 = s2)) : (ce = o3, o3 = s2);
						n3 !== s2 ? e4 = r3 = x2(r3, n3) : (ce = e4, e4 = s2);
					} else ce = e4, e4 = s2;
					return ye[c3] = {
						nextPos: ce,
						result: e4
					}, e4;
				}
				function Ce() {
					var e4, t3, r3, n3, o3, a3 = 36 * ce + 6, i3 = ye[a3];
					return i3 ? (ce = i3.nextPos, i3.result) : (e4 = ce, (t3 = Se()) === s2 && (t3 = null), t3 !== s2 && (r3 = Pe()) !== s2 ? (o3 = r3, e4 = t3 = (n3 = t3) ? {
						type: n3,
						left: { type: "exactNode" },
						right: o3
					} : o3) : (ce = e4, e4 = s2), ye[a3] = {
						nextPos: ce,
						result: e4
					}, e4);
				}
				function Pe() {
					var e4, t3, r3, n3, o3, a3, i3, u3 = 36 * ce + 7, l3 = ye[u3];
					if (l3) return ce = l3.nextPos, l3.result;
					if (e4 = ce, (t3 = we()) !== s2) {
						for (r3 = [], n3 = ce, (o3 = Se()) !== s2 && (a3 = we()) !== s2 ? n3 = o3 = [o3, a3] : (ce = n3, n3 = s2); n3 !== s2;) r3.push(n3), n3 = ce, (o3 = Se()) !== s2 && (a3 = we()) !== s2 ? n3 = o3 = [o3, a3] : (ce = n3, n3 = s2);
						r3 !== s2 ? (i3 = t3, e4 = t3 = r3.reduce((function(e5, t4) {
							return {
								type: t4[0],
								left: e5,
								right: t4[1]
							};
						}), i3)) : (ce = e4, e4 = s2);
					} else ce = e4, e4 = s2;
					return ye[u3] = {
						nextPos: ce,
						result: e4
					}, e4;
				}
				function we() {
					var e4, r3, n3, o3, a3, i3, u3, l3 = 36 * ce + 8, c3 = ye[l3];
					if (c3) return ce = c3.nextPos, c3.result;
					if (e4 = ce, 33 === t2.charCodeAt(ce) ? (r3 = "!", ce++) : (r3 = s2, ge(v2)), r3 === s2 && (r3 = null), r3 !== s2) {
						if (n3 = [], (o3 = ke()) !== s2) for (; o3 !== s2;) n3.push(o3), o3 = ke();
						else n3 = s2;
						n3 !== s2 ? (a3 = r3, u3 = 1 === (i3 = n3).length ? i3[0] : {
							type: "compound",
							selectors: i3
						}, a3 && (u3.subject = true), e4 = r3 = u3) : (ce = e4, e4 = s2);
					} else ce = e4, e4 = s2;
					return ye[l3] = {
						nextPos: ce,
						result: e4
					}, e4;
				}
				function ke() {
					var e4, r3 = 36 * ce + 9, n3 = ye[r3];
					return n3 ? (ce = n3.nextPos, n3.result) : ((e4 = (function() {
						var e5, r4, n4 = 36 * ce + 10, o3 = ye[n4];
						return o3 ? (ce = o3.nextPos, o3.result) : (42 === t2.charCodeAt(ce) ? (r4 = "*", ce++) : (r4 = s2, ge(g2)), r4 !== s2 && (r4 = {
							type: "wildcard",
							value: r4
						}), e5 = r4, ye[n4] = {
							nextPos: ce,
							result: e5
						}, e5);
					})()) === s2 && (e4 = (function() {
						var e5, r4, n4, o3 = 36 * ce + 11, a3 = ye[o3];
						return a3 ? (ce = a3.nextPos, a3.result) : (e5 = ce, 35 === t2.charCodeAt(ce) ? (r4 = "#", ce++) : (r4 = s2, ge(A2)), r4 === s2 && (r4 = null), r4 !== s2 && (n4 = be()) !== s2 ? e5 = r4 = {
							type: "identifier",
							value: n4
						} : (ce = e5, e5 = s2), ye[o3] = {
							nextPos: ce,
							result: e5
						}, e5);
					})()) === s2 && (e4 = (function() {
						var e5, r4, n4, o3, a3 = 36 * ce + 12, i3 = ye[a3];
						return i3 ? (ce = i3.nextPos, i3.result) : (e5 = ce, 91 === t2.charCodeAt(ce) ? (r4 = "[", ce++) : (r4 = s2, ge(E)), r4 !== s2 && Ee() !== s2 && (n4 = (function() {
							var e6, r5, n5, o4, a4 = 36 * ce + 16, i4 = ye[a4];
							return i4 ? (ce = i4.nextPos, i4.result) : (e6 = ce, (r5 = De()) !== s2 && Ee() !== s2 && (n5 = (function() {
								var e7, r6, n6, o5 = 36 * ce + 14, a5 = ye[o5];
								return a5 ? (ce = a5.nextPos, a5.result) : (e7 = ce, 33 === t2.charCodeAt(ce) ? (r6 = "!", ce++) : (r6 = s2, ge(v2)), r6 === s2 && (r6 = null), r6 !== s2 ? (61 === t2.charCodeAt(ce) ? (n6 = "=", ce++) : (n6 = s2, ge(C)), n6 !== s2 ? (r6 = P(r6), e7 = r6) : (ce = e7, e7 = s2)) : (ce = e7, e7 = s2), ye[o5] = {
									nextPos: ce,
									result: e7
								}, e7);
							})()) !== s2 && Ee() !== s2 ? ((o4 = (function() {
								var e7, r6, n6, o5, a5, i5 = 36 * ce + 20, u3 = ye[i5];
								if (u3) return ce = u3.nextPos, u3.result;
								if (e7 = ce, "type(" === t2.substr(ce, 5) ? (r6 = "type(", ce += 5) : (r6 = s2, ge(V)), r6 !== s2) if (Ee() !== s2) {
									if (n6 = [], q.test(t2.charAt(ce)) ? (o5 = t2.charAt(ce), ce++) : (o5 = s2, ge(G)), o5 !== s2) for (; o5 !== s2;) n6.push(o5), q.test(t2.charAt(ce)) ? (o5 = t2.charAt(ce), ce++) : (o5 = s2, ge(G));
									else n6 = s2;
									n6 !== s2 && (o5 = Ee()) !== s2 ? (41 === t2.charCodeAt(ce) ? (a5 = ")", ce++) : (a5 = s2, ge(z)), a5 !== s2 ? (r6 = {
										type: "type",
										value: n6.join("")
									}, e7 = r6) : (ce = e7, e7 = s2)) : (ce = e7, e7 = s2);
								} else ce = e7, e7 = s2;
								else ce = e7, e7 = s2;
								return ye[i5] = {
									nextPos: ce,
									result: e7
								}, e7;
							})()) === s2 && (o4 = (function() {
								var e7, r6, n6, o5, a5, i5, u3 = 36 * ce + 22, l3 = ye[u3];
								if (l3) return ce = l3.nextPos, l3.result;
								if (e7 = ce, 47 === t2.charCodeAt(ce) ? (r6 = "/", ce++) : (r6 = s2, ge($)), r6 !== s2) {
									if (n6 = [], (o5 = Ie()) === s2 && (o5 = je()) === s2 && (o5 = Te()), o5 !== s2) for (; o5 !== s2;) n6.push(o5), (o5 = Ie()) === s2 && (o5 = je()) === s2 && (o5 = Te());
									else n6 = s2;
									n6 !== s2 ? (47 === t2.charCodeAt(ce) ? (o5 = "/", ce++) : (o5 = s2, ge($)), o5 !== s2 ? ((a5 = (function() {
										var e8, r7, n7 = 36 * ce + 21, o6 = ye[n7];
										if (o6) return ce = o6.nextPos, o6.result;
										if (e8 = [], H.test(t2.charAt(ce)) ? (r7 = t2.charAt(ce), ce++) : (r7 = s2, ge(Y)), r7 !== s2) for (; r7 !== s2;) e8.push(r7), H.test(t2.charAt(ce)) ? (r7 = t2.charAt(ce), ce++) : (r7 = s2, ge(Y));
										else e8 = s2;
										return ye[n7] = {
											nextPos: ce,
											result: e8
										}, e8;
									})()) === s2 && (a5 = null), a5 !== s2 ? (i5 = a5, r6 = {
										type: "regexp",
										value: new RegExp(n6.join(""), i5 ? i5.join("") : "")
									}, e7 = r6) : (ce = e7, e7 = s2)) : (ce = e7, e7 = s2)) : (ce = e7, e7 = s2);
								} else ce = e7, e7 = s2;
								return ye[u3] = {
									nextPos: ce,
									result: e7
								}, e7;
							})()), o4 !== s2 ? (r5 = I(r5, n5, o4), e6 = r5) : (ce = e6, e6 = s2)) : (ce = e6, e6 = s2), e6 === s2 && (e6 = ce, (r5 = De()) !== s2 && Ee() !== s2 && (n5 = (function() {
								var e7, r6, n6, o5 = 36 * ce + 13, a5 = ye[o5];
								return a5 ? (ce = a5.nextPos, a5.result) : (e7 = ce, S.test(t2.charAt(ce)) ? (r6 = t2.charAt(ce), ce++) : (r6 = s2, ge(_)), r6 === s2 && (r6 = null), r6 !== s2 ? (61 === t2.charCodeAt(ce) ? (n6 = "=", ce++) : (n6 = s2, ge(C)), n6 !== s2 ? (r6 = P(r6), e7 = r6) : (ce = e7, e7 = s2)) : (ce = e7, e7 = s2), e7 === s2 && (w.test(t2.charAt(ce)) ? (e7 = t2.charAt(ce), ce++) : (e7 = s2, ge(k))), ye[o5] = {
									nextPos: ce,
									result: e7
								}, e7);
							})()) !== s2 && Ee() !== s2 ? ((o4 = (function() {
								var e7, r6, n6, o5, a5, i5, u3 = 36 * ce + 17, l3 = ye[u3];
								if (l3) return ce = l3.nextPos, l3.result;
								if (e7 = ce, 34 === t2.charCodeAt(ce) ? (r6 = "\"", ce++) : (r6 = s2, ge(j)), r6 !== s2) {
									for (n6 = [], T.test(t2.charAt(ce)) ? (o5 = t2.charAt(ce), ce++) : (o5 = s2, ge(F)), o5 === s2 && (o5 = ce, 92 === t2.charCodeAt(ce) ? (a5 = "\\", ce++) : (a5 = s2, ge(R)), a5 !== s2 ? (t2.length > ce ? (i5 = t2.charAt(ce), ce++) : (i5 = s2, ge(O)), i5 !== s2 ? (a5 = L(a5, i5), o5 = a5) : (ce = o5, o5 = s2)) : (ce = o5, o5 = s2)); o5 !== s2;) n6.push(o5), T.test(t2.charAt(ce)) ? (o5 = t2.charAt(ce), ce++) : (o5 = s2, ge(F)), o5 === s2 && (o5 = ce, 92 === t2.charCodeAt(ce) ? (a5 = "\\", ce++) : (a5 = s2, ge(R)), a5 !== s2 ? (t2.length > ce ? (i5 = t2.charAt(ce), ce++) : (i5 = s2, ge(O)), i5 !== s2 ? (a5 = L(a5, i5), o5 = a5) : (ce = o5, o5 = s2)) : (ce = o5, o5 = s2));
									n6 !== s2 ? (34 === t2.charCodeAt(ce) ? (o5 = "\"", ce++) : (o5 = s2, ge(j)), o5 !== s2 ? (r6 = M(n6), e7 = r6) : (ce = e7, e7 = s2)) : (ce = e7, e7 = s2);
								} else ce = e7, e7 = s2;
								if (e7 === s2) if (e7 = ce, 39 === t2.charCodeAt(ce) ? (r6 = "'", ce++) : (r6 = s2, ge(B)), r6 !== s2) {
									for (n6 = [], U.test(t2.charAt(ce)) ? (o5 = t2.charAt(ce), ce++) : (o5 = s2, ge(K)), o5 === s2 && (o5 = ce, 92 === t2.charCodeAt(ce) ? (a5 = "\\", ce++) : (a5 = s2, ge(R)), a5 !== s2 ? (t2.length > ce ? (i5 = t2.charAt(ce), ce++) : (i5 = s2, ge(O)), i5 !== s2 ? (a5 = L(a5, i5), o5 = a5) : (ce = o5, o5 = s2)) : (ce = o5, o5 = s2)); o5 !== s2;) n6.push(o5), U.test(t2.charAt(ce)) ? (o5 = t2.charAt(ce), ce++) : (o5 = s2, ge(K)), o5 === s2 && (o5 = ce, 92 === t2.charCodeAt(ce) ? (a5 = "\\", ce++) : (a5 = s2, ge(R)), a5 !== s2 ? (t2.length > ce ? (i5 = t2.charAt(ce), ce++) : (i5 = s2, ge(O)), i5 !== s2 ? (a5 = L(a5, i5), o5 = a5) : (ce = o5, o5 = s2)) : (ce = o5, o5 = s2));
									n6 !== s2 ? (39 === t2.charCodeAt(ce) ? (o5 = "'", ce++) : (o5 = s2, ge(B)), o5 !== s2 ? (r6 = M(n6), e7 = r6) : (ce = e7, e7 = s2)) : (ce = e7, e7 = s2);
								} else ce = e7, e7 = s2;
								return ye[u3] = {
									nextPos: ce,
									result: e7
								}, e7;
							})()) === s2 && (o4 = (function() {
								var e7, r6, n6, o5, a5, i5, u3, l3 = 36 * ce + 18, c3 = ye[l3];
								if (c3) return ce = c3.nextPos, c3.result;
								for (e7 = ce, r6 = ce, n6 = [], N.test(t2.charAt(ce)) ? (o5 = t2.charAt(ce), ce++) : (o5 = s2, ge(W)); o5 !== s2;) n6.push(o5), N.test(t2.charAt(ce)) ? (o5 = t2.charAt(ce), ce++) : (o5 = s2, ge(W));
								if (n6 !== s2 ? (46 === t2.charCodeAt(ce) ? (o5 = ".", ce++) : (o5 = s2, ge(D)), o5 !== s2 ? r6 = n6 = [n6, o5] : (ce = r6, r6 = s2)) : (ce = r6, r6 = s2), r6 === s2 && (r6 = null), r6 !== s2) {
									if (n6 = [], N.test(t2.charAt(ce)) ? (o5 = t2.charAt(ce), ce++) : (o5 = s2, ge(W)), o5 !== s2) for (; o5 !== s2;) n6.push(o5), N.test(t2.charAt(ce)) ? (o5 = t2.charAt(ce), ce++) : (o5 = s2, ge(W));
									else n6 = s2;
									n6 !== s2 ? (i5 = n6, u3 = (a5 = r6) ? [].concat.apply([], a5).join("") : "", r6 = {
										type: "literal",
										value: parseFloat(u3 + i5.join(""))
									}, e7 = r6) : (ce = e7, e7 = s2);
								} else ce = e7, e7 = s2;
								return ye[l3] = {
									nextPos: ce,
									result: e7
								}, e7;
							})()) === s2 && (o4 = (function() {
								var e7, t3, r6 = 36 * ce + 19, n6 = ye[r6];
								return n6 ? (ce = n6.nextPos, n6.result) : ((t3 = be()) !== s2 && (t3 = {
									type: "literal",
									value: t3
								}), e7 = t3, ye[r6] = {
									nextPos: ce,
									result: e7
								}, e7);
							})()), o4 !== s2 ? (r5 = I(r5, n5, o4), e6 = r5) : (ce = e6, e6 = s2)) : (ce = e6, e6 = s2), e6 === s2 && (e6 = ce, (r5 = De()) !== s2 && (r5 = {
								type: "attribute",
								name: r5
							}), e6 = r5)), ye[a4] = {
								nextPos: ce,
								result: e6
							}, e6);
						})()) !== s2 && Ee() !== s2 ? (93 === t2.charCodeAt(ce) ? (o3 = "]", ce++) : (o3 = s2, ge(b)), o3 !== s2 ? e5 = r4 = n4 : (ce = e5, e5 = s2)) : (ce = e5, e5 = s2), ye[a3] = {
							nextPos: ce,
							result: e5
						}, e5);
					})()) === s2 && (e4 = (function() {
						var e5, r4, n4, o3, a3, i3, u3, l3, c3 = 36 * ce + 26, f3 = ye[c3];
						if (f3) return ce = f3.nextPos, f3.result;
						if (e5 = ce, 46 === t2.charCodeAt(ce) ? (r4 = ".", ce++) : (r4 = s2, ge(D)), r4 !== s2) if ((n4 = be()) !== s2) {
							for (o3 = [], a3 = ce, 46 === t2.charCodeAt(ce) ? (i3 = ".", ce++) : (i3 = s2, ge(D)), i3 !== s2 && (u3 = be()) !== s2 ? a3 = i3 = [i3, u3] : (ce = a3, a3 = s2); a3 !== s2;) o3.push(a3), a3 = ce, 46 === t2.charCodeAt(ce) ? (i3 = ".", ce++) : (i3 = s2, ge(D)), i3 !== s2 && (u3 = be()) !== s2 ? a3 = i3 = [i3, u3] : (ce = a3, a3 = s2);
							o3 !== s2 ? (l3 = n4, r4 = {
								type: "field",
								name: o3.reduce((function(e6, t3) {
									return e6 + t3[0] + t3[1];
								}), l3)
							}, e5 = r4) : (ce = e5, e5 = s2);
						} else ce = e5, e5 = s2;
						else ce = e5, e5 = s2;
						return ye[c3] = {
							nextPos: ce,
							result: e5
						}, e5;
					})()) === s2 && (e4 = (function() {
						var e5, r4, n4, o3, a3 = 36 * ce + 27, i3 = ye[a3];
						return i3 ? (ce = i3.nextPos, i3.result) : (e5 = ce, ":not(" === t2.substr(ce, 5) ? (r4 = ":not(", ce += 5) : (r4 = s2, ge(ee)), r4 !== s2 && Ee() !== s2 && (n4 = _e()) !== s2 && Ee() !== s2 ? (41 === t2.charCodeAt(ce) ? (o3 = ")", ce++) : (o3 = s2, ge(z)), o3 !== s2 ? e5 = r4 = {
							type: "not",
							selectors: n4
						} : (ce = e5, e5 = s2)) : (ce = e5, e5 = s2), ye[a3] = {
							nextPos: ce,
							result: e5
						}, e5);
					})()) === s2 && (e4 = (function() {
						var e5, r4, n4, o3, a3 = 36 * ce + 28, i3 = ye[a3];
						return i3 ? (ce = i3.nextPos, i3.result) : (e5 = ce, ":matches(" === t2.substr(ce, 9) ? (r4 = ":matches(", ce += 9) : (r4 = s2, ge(te)), r4 !== s2 && Ee() !== s2 && (n4 = _e()) !== s2 && Ee() !== s2 ? (41 === t2.charCodeAt(ce) ? (o3 = ")", ce++) : (o3 = s2, ge(z)), o3 !== s2 ? (r4 = re(n4), e5 = r4) : (ce = e5, e5 = s2)) : (ce = e5, e5 = s2), ye[a3] = {
							nextPos: ce,
							result: e5
						}, e5);
					})()) === s2 && (e4 = (function() {
						var e5, r4, n4, o3, a3 = 36 * ce + 29, i3 = ye[a3];
						return i3 ? (ce = i3.nextPos, i3.result) : (e5 = ce, ":is(" === t2.substr(ce, 4) ? (r4 = ":is(", ce += 4) : (r4 = s2, ge(ne)), r4 !== s2 && Ee() !== s2 && (n4 = _e()) !== s2 && Ee() !== s2 ? (41 === t2.charCodeAt(ce) ? (o3 = ")", ce++) : (o3 = s2, ge(z)), o3 !== s2 ? (r4 = re(n4), e5 = r4) : (ce = e5, e5 = s2)) : (ce = e5, e5 = s2), ye[a3] = {
							nextPos: ce,
							result: e5
						}, e5);
					})()) === s2 && (e4 = (function() {
						var e5, r4, n4, o3, a3 = 36 * ce + 30, i3 = ye[a3];
						return i3 ? (ce = i3.nextPos, i3.result) : (e5 = ce, ":has(" === t2.substr(ce, 5) ? (r4 = ":has(", ce += 5) : (r4 = s2, ge(oe)), r4 !== s2 && Ee() !== s2 && (n4 = (function() {
							var e6, r5, n5, o4, a4, i4, u3, l3, c3 = 36 * ce + 4, f3 = ye[c3];
							if (f3) return ce = f3.nextPos, f3.result;
							if (e6 = ce, (r5 = Ce()) !== s2) {
								for (n5 = [], o4 = ce, (a4 = Ee()) !== s2 ? (44 === t2.charCodeAt(ce) ? (i4 = ",", ce++) : (i4 = s2, ge(m2)), i4 !== s2 && (u3 = Ee()) !== s2 && (l3 = Ce()) !== s2 ? o4 = a4 = [
									a4,
									i4,
									u3,
									l3
								] : (ce = o4, o4 = s2)) : (ce = o4, o4 = s2); o4 !== s2;) n5.push(o4), o4 = ce, (a4 = Ee()) !== s2 ? (44 === t2.charCodeAt(ce) ? (i4 = ",", ce++) : (i4 = s2, ge(m2)), i4 !== s2 && (u3 = Ee()) !== s2 && (l3 = Ce()) !== s2 ? o4 = a4 = [
									a4,
									i4,
									u3,
									l3
								] : (ce = o4, o4 = s2)) : (ce = o4, o4 = s2);
								n5 !== s2 ? e6 = r5 = x2(r5, n5) : (ce = e6, e6 = s2);
							} else ce = e6, e6 = s2;
							return ye[c3] = {
								nextPos: ce,
								result: e6
							}, e6;
						})()) !== s2 && Ee() !== s2 ? (41 === t2.charCodeAt(ce) ? (o3 = ")", ce++) : (o3 = s2, ge(z)), o3 !== s2 ? e5 = r4 = {
							type: "has",
							selectors: n4
						} : (ce = e5, e5 = s2)) : (ce = e5, e5 = s2), ye[a3] = {
							nextPos: ce,
							result: e5
						}, e5);
					})()) === s2 && (e4 = (function() {
						var e5, r4, n4 = 36 * ce + 31, o3 = ye[n4];
						return o3 ? (ce = o3.nextPos, o3.result) : (":first-child" === t2.substr(ce, 12) ? (r4 = ":first-child", ce += 12) : (r4 = s2, ge(ae)), r4 !== s2 && (r4 = Fe(1)), e5 = r4, ye[n4] = {
							nextPos: ce,
							result: e5
						}, e5);
					})()) === s2 && (e4 = (function() {
						var e5, r4, n4 = 36 * ce + 32, o3 = ye[n4];
						return o3 ? (ce = o3.nextPos, o3.result) : (":last-child" === t2.substr(ce, 11) ? (r4 = ":last-child", ce += 11) : (r4 = s2, ge(ie)), r4 !== s2 && (r4 = Re(1)), e5 = r4, ye[n4] = {
							nextPos: ce,
							result: e5
						}, e5);
					})()) === s2 && (e4 = (function() {
						var e5, r4, n4, o3, a3, i3 = 36 * ce + 33, u3 = ye[i3];
						if (u3) return ce = u3.nextPos, u3.result;
						if (e5 = ce, ":nth-child(" === t2.substr(ce, 11) ? (r4 = ":nth-child(", ce += 11) : (r4 = s2, ge(se)), r4 !== s2) if (Ee() !== s2) {
							if (n4 = [], N.test(t2.charAt(ce)) ? (o3 = t2.charAt(ce), ce++) : (o3 = s2, ge(W)), o3 !== s2) for (; o3 !== s2;) n4.push(o3), N.test(t2.charAt(ce)) ? (o3 = t2.charAt(ce), ce++) : (o3 = s2, ge(W));
							else n4 = s2;
							n4 !== s2 && (o3 = Ee()) !== s2 ? (41 === t2.charCodeAt(ce) ? (a3 = ")", ce++) : (a3 = s2, ge(z)), a3 !== s2 ? (r4 = Fe(parseInt(n4.join(""), 10)), e5 = r4) : (ce = e5, e5 = s2)) : (ce = e5, e5 = s2);
						} else ce = e5, e5 = s2;
						else ce = e5, e5 = s2;
						return ye[i3] = {
							nextPos: ce,
							result: e5
						}, e5;
					})()) === s2 && (e4 = (function() {
						var e5, r4, n4, o3, a3, i3 = 36 * ce + 34, u3 = ye[i3];
						if (u3) return ce = u3.nextPos, u3.result;
						if (e5 = ce, ":nth-last-child(" === t2.substr(ce, 16) ? (r4 = ":nth-last-child(", ce += 16) : (r4 = s2, ge(ue)), r4 !== s2) if (Ee() !== s2) {
							if (n4 = [], N.test(t2.charAt(ce)) ? (o3 = t2.charAt(ce), ce++) : (o3 = s2, ge(W)), o3 !== s2) for (; o3 !== s2;) n4.push(o3), N.test(t2.charAt(ce)) ? (o3 = t2.charAt(ce), ce++) : (o3 = s2, ge(W));
							else n4 = s2;
							n4 !== s2 && (o3 = Ee()) !== s2 ? (41 === t2.charCodeAt(ce) ? (a3 = ")", ce++) : (a3 = s2, ge(z)), a3 !== s2 ? (r4 = Re(parseInt(n4.join(""), 10)), e5 = r4) : (ce = e5, e5 = s2)) : (ce = e5, e5 = s2);
						} else ce = e5, e5 = s2;
						else ce = e5, e5 = s2;
						return ye[i3] = {
							nextPos: ce,
							result: e5
						}, e5;
					})()) === s2 && (e4 = (function() {
						var e5, r4, n4, o3 = 36 * ce + 35, a3 = ye[o3];
						return a3 ? (ce = a3.nextPos, a3.result) : (e5 = ce, 58 === t2.charCodeAt(ce) ? (r4 = ":", ce++) : (r4 = s2, ge(le)), r4 !== s2 && (n4 = be()) !== s2 ? e5 = r4 = {
							type: "class",
							name: n4
						} : (ce = e5, e5 = s2), ye[o3] = {
							nextPos: ce,
							result: e5
						}, e5);
					})()), ye[r3] = {
						nextPos: ce,
						result: e4
					}, e4);
				}
				function De() {
					var e4, r3, n3, o3, a3, i3, u3, l3, c3 = 36 * ce + 15, f3 = ye[c3];
					if (f3) return ce = f3.nextPos, f3.result;
					if (e4 = ce, (r3 = be()) !== s2) {
						for (n3 = [], o3 = ce, 46 === t2.charCodeAt(ce) ? (a3 = ".", ce++) : (a3 = s2, ge(D)), a3 !== s2 && (i3 = be()) !== s2 ? o3 = a3 = [a3, i3] : (ce = o3, o3 = s2); o3 !== s2;) n3.push(o3), o3 = ce, 46 === t2.charCodeAt(ce) ? (a3 = ".", ce++) : (a3 = s2, ge(D)), a3 !== s2 && (i3 = be()) !== s2 ? o3 = a3 = [a3, i3] : (ce = o3, o3 = s2);
						n3 !== s2 ? (u3 = r3, l3 = n3, e4 = r3 = [].concat.apply([u3], l3).join("")) : (ce = e4, e4 = s2);
					} else ce = e4, e4 = s2;
					return ye[c3] = {
						nextPos: ce,
						result: e4
					}, e4;
				}
				function Ie() {
					var e4, r3, n3, o3, a3 = 36 * ce + 23, i3 = ye[a3];
					if (i3) return ce = i3.nextPos, i3.result;
					if (e4 = ce, 91 === t2.charCodeAt(ce) ? (r3 = "[", ce++) : (r3 = s2, ge(E)), r3 !== s2) {
						if (n3 = [], J.test(t2.charAt(ce)) ? (o3 = t2.charAt(ce), ce++) : (o3 = s2, ge(Q)), o3 === s2 && (o3 = je()), o3 !== s2) for (; o3 !== s2;) n3.push(o3), J.test(t2.charAt(ce)) ? (o3 = t2.charAt(ce), ce++) : (o3 = s2, ge(Q)), o3 === s2 && (o3 = je());
						else n3 = s2;
						n3 !== s2 ? (93 === t2.charCodeAt(ce) ? (o3 = "]", ce++) : (o3 = s2, ge(b)), o3 !== s2 ? e4 = r3 = "[" + n3.join("") + "]" : (ce = e4, e4 = s2)) : (ce = e4, e4 = s2);
					} else ce = e4, e4 = s2;
					return ye[a3] = {
						nextPos: ce,
						result: e4
					}, e4;
				}
				function je() {
					var e4, r3, n3, o3 = 36 * ce + 24, a3 = ye[o3];
					return a3 ? (ce = a3.nextPos, a3.result) : (e4 = ce, 92 === t2.charCodeAt(ce) ? (r3 = "\\", ce++) : (r3 = s2, ge(R)), r3 !== s2 ? (t2.length > ce ? (n3 = t2.charAt(ce), ce++) : (n3 = s2, ge(O)), n3 !== s2 ? e4 = r3 = "\\" + n3 : (ce = e4, e4 = s2)) : (ce = e4, e4 = s2), ye[o3] = {
						nextPos: ce,
						result: e4
					}, e4);
				}
				function Te() {
					var e4, r3, n3, o3 = 36 * ce + 25, a3 = ye[o3];
					if (a3) return ce = a3.nextPos, a3.result;
					if (r3 = [], X.test(t2.charAt(ce)) ? (n3 = t2.charAt(ce), ce++) : (n3 = s2, ge(Z)), n3 !== s2) for (; n3 !== s2;) r3.push(n3), X.test(t2.charAt(ce)) ? (n3 = t2.charAt(ce), ce++) : (n3 = s2, ge(Z));
					else r3 = s2;
					return r3 !== s2 && (r3 = r3.join("")), e4 = r3, ye[o3] = {
						nextPos: ce,
						result: e4
					}, e4;
				}
				function Fe(e4) {
					return {
						type: "nth-child",
						index: {
							type: "literal",
							value: e4
						}
					};
				}
				function Re(e4) {
					return {
						type: "nth-last-child",
						index: {
							type: "literal",
							value: e4
						}
					};
				}
				if ((n2 = l2()) !== s2 && ce === t2.length) return n2;
				throw n2 !== s2 && ce < t2.length && ge({ type: "end" }), o2 = he, a2 = pe < t2.length ? t2.charAt(pe) : null, i2 = pe < t2.length ? ve(pe, pe + 1) : ve(pe, pe), new e3(e3.buildMessage(o2, a2), o2, a2, i2);
			}
		};
	})());
}));
function u(e2, t2) {
	for (var r2 = 0; r2 < t2.length; ++r2) {
		if (null == e2) return e2;
		e2 = e2[t2[r2]];
	}
	return e2;
}
var l = "function" == typeof WeakMap ? /* @__PURE__ */ new WeakMap() : null;
function c(e2) {
	if (null == e2) return function() {
		return true;
	};
	if (null != l) {
		var t2 = l.get(e2);
		return t2 ?? (t2 = f(e2), l.set(e2, t2)), t2;
	}
	return f(e2);
}
function f(e2) {
	switch (e2.type) {
		case "wildcard": return function() {
			return true;
		};
		case "identifier":
			var t2 = e2.value.toLowerCase();
			return function(e3, r3, n2) {
				return t2 === e3[n2 && n2.nodeTypeKey || "type"].toLowerCase();
			};
		case "exactNode": return function(e3, t3) {
			return 0 === t3.length;
		};
		case "field":
			var r2 = e2.name.split(".");
			return function(e3, t3) {
				return (function e4(t4, r3, n2, o3) {
					for (var a3 = r3, i2 = o3; i2 < n2.length; ++i2) {
						if (null == a3) return false;
						var s3 = a3[n2[i2]];
						if (Array.isArray(s3)) {
							for (var u2 = 0; u2 < s3.length; ++u2) if (e4(t4, s3[u2], n2, i2 + 1)) return true;
							return false;
						}
						a3 = s3;
					}
					return t4 === a3;
				})(e3, t3[r2.length - 1], r2, 0);
			};
		case "matches":
			var o2 = e2.selectors.map(c);
			return function(e3, t3, r3) {
				for (var n2 = 0; n2 < o2.length; ++n2) if (o2[n2](e3, t3, r3)) return true;
				return false;
			};
		case "compound":
			var a2 = e2.selectors.map(c);
			return function(e3, t3, r3) {
				for (var n2 = 0; n2 < a2.length; ++n2) if (!a2[n2](e3, t3, r3)) return false;
				return true;
			};
		case "not":
			var s2 = e2.selectors.map(c);
			return function(e3, t3, r3) {
				for (var n2 = 0; n2 < s2.length; ++n2) if (s2[n2](e3, t3, r3)) return false;
				return true;
			};
		case "has":
			var l2 = e2.selectors.map(c);
			return function(e3, t3, r3) {
				var n2 = false, o3 = [];
				return i.traverse(e3, {
					enter: function(e4, t4) {
						null != t4 && o3.unshift(t4);
						for (var a3 = 0; a3 < l2.length; ++a3) if (l2[a3](e4, o3, r3)) return n2 = true, void this.break();
					},
					leave: function() {
						o3.shift();
					},
					keys: r3 && r3.visitorKeys,
					fallback: r3 && r3.fallback || "iteration"
				}), n2;
			};
		case "child":
			var f2 = c(e2.left), p2 = c(e2.right);
			return function(e3, t3, r3) {
				return !!(t3.length > 0 && p2(e3, t3, r3)) && f2(t3[0], t3.slice(1), r3);
			};
		case "descendant":
			var h2 = c(e2.left), x2 = c(e2.right);
			return function(e3, t3, r3) {
				if (x2(e3, t3, r3)) {
					for (var n2 = 0, o3 = t3.length; n2 < o3; ++n2) if (h2(t3[n2], t3.slice(n2 + 1), r3)) return true;
				}
				return false;
			};
		case "attribute":
			var v2 = e2.name.split(".");
			switch (e2.operator) {
				case void 0: return function(e3) {
					return null != u(e3, v2);
				};
				case "=":
					switch (e2.value.type) {
						case "regexp": return function(t3) {
							var r3 = u(t3, v2);
							return "string" == typeof r3 && e2.value.value.test(r3);
						};
						case "literal":
							var g2 = "".concat(e2.value.value);
							return function(e3) {
								return g2 === "".concat(u(e3, v2));
							};
						case "type": return function(t3) {
							return e2.value.value === n(u(t3, v2));
						};
					}
					throw new Error("Unknown selector value type: ".concat(e2.value.type));
				case "!=":
					switch (e2.value.type) {
						case "regexp": return function(t3) {
							return !e2.value.value.test(u(t3, v2));
						};
						case "literal":
							var A2 = "".concat(e2.value.value);
							return function(e3) {
								return A2 !== "".concat(u(e3, v2));
							};
						case "type": return function(t3) {
							return e2.value.value !== n(u(t3, v2));
						};
					}
					throw new Error("Unknown selector value type: ".concat(e2.value.type));
				case "<=": return function(t3) {
					return u(t3, v2) <= e2.value.value;
				};
				case "<": return function(t3) {
					return u(t3, v2) < e2.value.value;
				};
				case ">": return function(t3) {
					return u(t3, v2) > e2.value.value;
				};
				case ">=": return function(t3) {
					return u(t3, v2) >= e2.value.value;
				};
			}
			throw new Error("Unknown operator: ".concat(e2.operator));
		case "sibling":
			var E = c(e2.left), b = c(e2.right);
			return function(t3, r3, n2) {
				return b(t3, r3, n2) && y$1(t3, E, r3, "LEFT_SIDE", n2) || e2.left.subject && E(t3, r3, n2) && y$1(t3, b, r3, "RIGHT_SIDE", n2);
			};
		case "adjacent":
			var S = c(e2.left), _ = c(e2.right);
			return function(t3, r3, n2) {
				return _(t3, r3, n2) && d$1(t3, S, r3, "LEFT_SIDE", n2) || e2.right.subject && S(t3, r3, n2) && d$1(t3, _, r3, "RIGHT_SIDE", n2);
			};
		case "nth-child":
			var C = e2.index.value, P = c(e2.right);
			return function(e3, t3, r3) {
				return P(e3, t3, r3) && m$1(e3, t3, C, r3);
			};
		case "nth-last-child":
			var w = -e2.index.value, k = c(e2.right);
			return function(e3, t3, r3) {
				return k(e3, t3, r3) && m$1(e3, t3, w, r3);
			};
		case "class":
			var D = e2.name.toLowerCase();
			return function(t3, r3, n2) {
				if (n2 && n2.matchClass) return n2.matchClass(e2.name, t3, r3);
				if (n2 && n2.nodeTypeKey) return false;
				switch (D) {
					case "statement": if ("Statement" === t3.type.slice(-9)) return true;
					case "declaration": return "Declaration" === t3.type.slice(-11);
					case "pattern": if ("Pattern" === t3.type.slice(-7)) return true;
					case "expression": return "Expression" === t3.type.slice(-10) || "Literal" === t3.type.slice(-7) || "Identifier" === t3.type && (0 === r3.length || "MetaProperty" !== r3[0].type) || "MetaProperty" === t3.type;
					case "function": return "FunctionDeclaration" === t3.type || "FunctionExpression" === t3.type || "ArrowFunctionExpression" === t3.type;
				}
				throw new Error("Unknown class name: ".concat(e2.name));
			};
	}
	throw new Error("Unknown selector type: ".concat(e2.type));
}
function p(e2, t2) {
	var r2 = t2 && t2.nodeTypeKey || "type", n2 = e2[r2];
	return t2 && t2.visitorKeys && t2.visitorKeys[n2] ? t2.visitorKeys[n2] : i.VisitorKeys[n2] ? i.VisitorKeys[n2] : t2 && "function" == typeof t2.fallback ? t2.fallback(e2) : Object.keys(e2).filter((function(e3) {
		return e3 !== r2;
	}));
}
function h$1(e2, t2) {
	var r2 = t2 && t2.nodeTypeKey || "type";
	return null !== e2 && "object" === n(e2) && "string" == typeof e2[r2];
}
function y$1(e2, r2, n2, o2, a2) {
	var i2 = t(n2, 1)[0];
	if (!i2) return false;
	for (var s2 = p(i2, a2), u2 = 0; u2 < s2.length; ++u2) {
		var l2 = i2[s2[u2]];
		if (Array.isArray(l2)) {
			var c2 = l2.indexOf(e2);
			if (c2 < 0) continue;
			var f2 = void 0, y2 = void 0;
			"LEFT_SIDE" === o2 ? (f2 = 0, y2 = c2) : (f2 = c2 + 1, y2 = l2.length);
			for (var d2 = f2; d2 < y2; ++d2) if (h$1(l2[d2], a2) && r2(l2[d2], n2, a2)) return true;
		}
	}
	return false;
}
function d$1(e2, r2, n2, o2, a2) {
	var i2 = t(n2, 1)[0];
	if (!i2) return false;
	for (var s2 = p(i2, a2), u2 = 0; u2 < s2.length; ++u2) {
		var l2 = i2[s2[u2]];
		if (Array.isArray(l2)) {
			var c2 = l2.indexOf(e2);
			if (c2 < 0) continue;
			if ("LEFT_SIDE" === o2 && c2 > 0 && h$1(l2[c2 - 1], a2) && r2(l2[c2 - 1], n2, a2)) return true;
			if ("RIGHT_SIDE" === o2 && c2 < l2.length - 1 && h$1(l2[c2 + 1], a2) && r2(l2[c2 + 1], n2, a2)) return true;
		}
	}
	return false;
}
function m$1(e2, r2, n2, o2) {
	if (0 === n2) return false;
	var a2 = t(r2, 1)[0];
	if (!a2) return false;
	for (var i2 = p(a2, o2), s2 = 0; s2 < i2.length; ++s2) {
		var u2 = a2[i2[s2]];
		if (Array.isArray(u2)) {
			var l2 = n2 < 0 ? u2.length + n2 : n2 - 1;
			if (l2 >= 0 && l2 < u2.length && u2[l2] === e2) return true;
		}
	}
	return false;
}
function x(e2, t2, o2, a2) {
	if (t2) {
		var s2 = [], u2 = c(t2), l2 = (function e3(t3, o3) {
			if (null == t3 || "object" != n(t3)) return [];
			o3 ??= t3;
			for (var a3 = t3.subject ? [o3] : [], i2 = Object.keys(t3), s3 = 0; s3 < i2.length; ++s3) {
				var u3 = i2[s3], l3 = t3[u3];
				a3.push.apply(a3, r(e3(l3, "left" === u3 ? l3 : o3)));
			}
			return a3;
		})(t2).map(c);
		i.traverse(e2, {
			enter: function(e3, t3) {
				if (null != t3 && s2.unshift(t3), u2(e3, s2, a2)) if (l2.length) for (var r2 = 0, n2 = l2.length; r2 < n2; ++r2) {
					l2[r2](e3, s2, a2) && o2(e3, t3, s2);
					for (var i2 = 0, c2 = s2.length; i2 < c2; ++i2) {
						var f2 = s2.slice(i2 + 1);
						l2[r2](s2[i2], f2, a2) && o2(s2[i2], t3, f2);
					}
				}
				else o2(e3, t3, s2);
			},
			leave: function() {
				s2.shift();
			},
			keys: a2 && a2.visitorKeys,
			fallback: a2 && a2.fallback || "iteration"
		});
	}
}
function v(e2, t2, r2) {
	var n2 = [];
	return x(e2, t2, (function(e3) {
		n2.push(e3);
	}), r2), n2;
}
function g(e2) {
	return s$1.parse(e2);
}
function A(e2, t2, r2) {
	return v(e2, g(t2), r2);
}
A.parse = g, A.match = v, A.traverse = x, A.matches = function(e2, t2, r2, n2) {
	return !t2 || !!e2 && (r2 || (r2 = []), c(t2)(e2, r2, n2));
}, A.query = A;
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/_virtual/meriyah.js
var meriyah = {};
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/_virtual/astring.js
var astring = {};
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/_virtual/transforms.js
var transforms$2 = { exports: {} };
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vendored/@apm-js-collab/code-transformer/lib/transforms.js
var esquery$1 = A;
var { parse: parse$4 } = meriyah;
var tracingChannelPredicate = (node) => node.declarations?.[0]?.id?.properties?.[0]?.value?.name === "tr_ch_apm_tracingChannel";
var CHANNEL_REGEX = /[^\w]/g;
var formatChannelVariable = (channelName) => `tr_ch_apm$${channelName.replace(CHANNEL_REGEX, "_")}`;
var transforms$1 = transforms$2.exports = {
	/**
	* Injects a `tracingChannel` import/require into the program body if one is not
	* already present.
	*
	* @param {{ dcModule: string, sourceType: 'module'|'script' }} state
	* @param {import('estree').Program} node - The program root node.
	*/
	tracingChannelImport({ dcModule, moduleType }, node) {
		if (node.body.some(tracingChannelPredicate)) return;
		const options = { module: moduleType === "esm" };
		const index = node.body.findIndex((child) => child.directive === "use strict");
		const dc = moduleType === "esm" ? `import tr_ch_apm_dc from "${dcModule}"` : `const tr_ch_apm_dc = require("${dcModule}")`;
		node.body.splice(index + 1, 0, parse$4(dc, options).body[0], parse$4("const { tracingChannel: tr_ch_apm_tracingChannel } = tr_ch_apm_dc", options).body[0], parse$4(`const tr_ch_apm_hasSubscribers = ch => ch.start.hasSubscribers
      || ch.end.hasSubscribers
      || ch.asyncStart.hasSubscribers
      || ch.asyncEnd.hasSubscribers
      || ch.error.hasSubscribers`, options).body[0]);
	},
	/**
	* Injects a `tracingChannel(...)` variable declaration for the config's channel
	* into the program body, also ensuring the import is present.
	*
	* @param {{ channelName: string, module: { name: string }, dcModule: string, sourceType: 'module'|'script' }} state
	* @param {import('estree').Program} node - The program root node.
	*/
	tracingChannelDeclaration(state, node) {
		const { channelName, module: { name } } = state;
		const channelVariable = formatChannelVariable(channelName);
		if (node.body.some((child) => child.declarations?.[0]?.id?.name === channelVariable)) return;
		transforms$1.tracingChannelImport(state, node);
		const index = node.body.findIndex(tracingChannelPredicate);
		const code = `
      const ${channelVariable} = tr_ch_apm_tracingChannel("orchestrion:${name}:${channelName}")
    `;
		node.body.splice(index + 1, 0, parse$4(code).body[0]);
	},
	traceCallback: traceAny,
	tracePromise: traceAny,
	traceSync: traceAny,
	traceAuto: traceAny
};
function wrapParams(params) {
	return [...(params || []).filter((param) => param.type !== "RestElement" && param.type !== "AssignmentPattern").map((_, i) => ({
		type: "Identifier",
		name: `__apm$arg${i}`
	})), {
		type: "RestElement",
		argument: {
			type: "Identifier",
			name: "__apm$args"
		}
	}];
}
function traceAny(state, node, _parent, ancestry) {
	const program = ancestry[ancestry.length - 1];
	if (node.type === "ClassDeclaration" || node.type === "ClassExpression") traceInstanceMethod(state, node, program);
	else traceFunction(state, node, program);
}
function traceFunction(state, node, program) {
	transforms$1.tracingChannelDeclaration(state, program);
	const { functionQuery: { methodName, privateMethodName, functionName, expressionName, propertyName } } = state;
	const type = methodName === "constructor" || !methodName && !privateMethodName && !functionName && !expressionName && !propertyName ? "ArrowFunctionExpression" : node.type;
	const params = node.params;
	node.body = wrap(state, {
		type,
		params,
		body: node.body,
		async: node.async,
		expression: false,
		generator: node.generator
	}, program);
	node.params = wrapParams(params);
	node.generator = false;
	node.async = false;
	wrapSuper(state, node);
}
function traceInstanceMethod(state, node, program) {
	const { functionQuery, operator } = state;
	const { methodName } = functionQuery;
	if (!methodName) return;
	const classBody = node.body;
	if (classBody.body.some(({ key }) => key.name === methodName)) return;
	let ctor = classBody.body.find(({ kind }) => kind === "constructor");
	transforms$1.tracingChannelDeclaration(state, program);
	if (!ctor) {
		ctor = parse$4(node.superClass ? "class A extends Object { constructor (...args) { super(...args) } }" : "class A { constructor () {} }").body[0].body.body[0];
		classBody.body.unshift(ctor);
	}
	const ctorBody = parse$4(`
    const __apm$${methodName} = this["${methodName}"]
    this["${methodName}"] = function () {}
    if (typeof __apm$${methodName} === 'function') {
      Object.defineProperty(this["${methodName}"], 'length', {
        value: __apm$${methodName}.length,
        configurable: true
      })
    }
  `).body;
	const fn = ctorBody[1].expression.right;
	fn.params = [{
		type: "RestElement",
		argument: {
			type: "Identifier",
			name: "__apm$args"
		}
	}];
	fn.async = operator === "tracePromise";
	fn.body = wrap(state, {
		type: "Identifier",
		name: `__apm$${methodName}`
	}, program);
	wrapSuper(state, fn);
	ctor.value.body.body.push(...ctorBody);
}
function wrap(state, node, program) {
	const { operator, moduleVersion } = state;
	const { returnKind } = state.functionQuery;
	const iterPatch = returnKind ? generateIterPatch(state, returnKind, program) : "";
	let wrapper;
	if (operator === "traceCallback") wrapper = wrapCallback(state, node, iterPatch);
	if (operator === "tracePromise") wrapper = wrapPromise(state, node, iterPatch);
	if (operator === "traceSync") wrapper = wrapSync(state, node, iterPatch);
	if (operator === "traceAuto") wrapper = wrapAuto(state, node, iterPatch);
	const args = (node.params || []).filter((param) => param.type !== "RestElement" && param.type !== "AssignmentPattern").map((_, i) => `__apm$arg${i}`).concat("...__apm$args").join(", ");
	const block = wrapper.body[0].body;
	const common = parse$4(node.type === "ArrowFunctionExpression" ? `
    const __apm$arguments = [${args}];
    const __apm$ctx = {
      arguments: __apm$arguments,
      moduleVersion: ${JSON.stringify(moduleVersion)}
    };
    const __apm$traced = () => {
      const __apm$wrapped = () => {};
      return __apm$wrapped(...__apm$arguments);
    };
  ` : `
    const __apm$arguments = [${args}].slice(0, arguments.length);
    const __apm$ctx = {
      arguments: __apm$arguments,
      self: this,
      moduleVersion: ${JSON.stringify(moduleVersion)}
    };
    const __apm$traced = () => {
      const __apm$wrapped = () => {};
      return __apm$wrapped.apply(this, __apm$arguments);
    };
  `).body;
	block.body.unshift(...common);
	esquery$1.query(block, "[id.name=__apm$wrapped]")[0].init = node;
	return block;
}
function wrapSuper(_state, node) {
	const members = /* @__PURE__ */ new Set();
	esquery$1.traverse(node.body, esquery$1.parse("[object.type=Super]"), (node2, parent) => {
		const { name } = node2.property;
		let child;
		if (parent.callee) {
			const { expression } = parse$4(`__apm$super['${name}'].call(this)`).body[0];
			parent.callee = child = expression.callee;
			parent.arguments.unshift(...expression.arguments);
		} else parent.expression = child = parse$4(`__apm$super['${name}']`).body[0];
		child.computed = parent.callee.computed;
		child.optional = parent.callee.optional;
		members.add(name);
	});
	for (const name of members) {
		const member = parse$4(`
      class Wrapper {
        wrapper () {
          __apm$super['${name}'] = super['${name}']
        }
      }
    `).body[0].body.body[0].value.body.body[0];
		node.body.body.unshift(member);
	}
	if (members.size > 0) node.body.body.unshift(parse$4("const __apm$super = {}").body[0]);
}
function wrapAuto(state, node, iterPatch = "") {
	const cbWrapperAST = wrapCallback(state, node, iterPatch);
	const promiseWrapperAST = wrapPromise(state, node, iterPatch);
	const [getCbArg, checkHasSubscribers, defineWrappedCb, checkCbIsFunction, spliceCbArg, runStores] = cbWrapperAST.body[0].body.body;
	const fallbackToPromise = {
		type: "IfStatement",
		test: checkCbIsFunction.test,
		consequent: {
			type: "BlockStatement",
			body: promiseWrapperAST.body[0].body.body
		},
		alternate: null
	};
	cbWrapperAST.body[0].body.body = [
		getCbArg,
		fallbackToPromise,
		checkHasSubscribers,
		defineWrappedCb,
		spliceCbArg,
		runStores
	];
	return cbWrapperAST;
}
function wrapCallback(state, node, iterPatch = "") {
	const { channelName, functionQuery: { callbackIndex = -1 } } = state;
	const channelVariable = formatChannelVariable(channelName);
	return parse$4(`
    function wrapper () {
      const __apm$cb = Array.prototype.at.call(__apm$arguments, ${callbackIndex});

      if (!${channelVariable}.start.hasSubscribers) return __apm$traced();

      function __apm$wrappedCb(err, res) {
        if (err) {
          __apm$ctx.error = err;
          ${channelVariable}.error.publish(__apm$ctx);
        } else {
          __apm$ctx.result = res;
          ${iterPatch}
        }

        ${channelVariable}.asyncStart.runStores(__apm$ctx, () => {
          try {
            if (__apm$cb) {
              return __apm$cb.apply(this, arguments);
            }
          } finally {
            ${channelVariable}.asyncEnd.publish(__apm$ctx);
          }
        });
      }

      if (typeof __apm$cb !== 'function') {
        return __apm$traced();
      }
      Array.prototype.splice.call(__apm$arguments, ${callbackIndex}, 1, __apm$wrappedCb);

      return ${channelVariable}.start.runStores(__apm$ctx, () => {
        try {
          return __apm$traced();
        } catch (err) {
          __apm$ctx.error = err;
          ${channelVariable}.error.publish(__apm$ctx);
          throw err;
        } finally {
         __apm$ctx.self ??= this;
          ${channelVariable}.end.publish(__apm$ctx);
        }
      });
    }
  `);
}
function wrapPromise(state, node, iterPatch = "") {
	const { channelName } = state;
	const channelVariable = formatChannelVariable(channelName);
	return parse$4(`
    function wrapper () {
      if (!tr_ch_apm_hasSubscribers(${channelVariable})) return __apm$traced();

      return ${channelVariable}.start.runStores(__apm$ctx, () => {
        try {
          let promise = __apm$traced();
          if (typeof promise?.then !== 'function') {
            __apm$ctx.result = promise;
            ${iterPatch}
            return __apm$ctx.result;
          }
          // Mirror Node.js core diagnostics_channel behaviour: for native Promise
          // instances, chain normally (safe since there is no subclass API to
          // preserve). For Promise subclasses and other thenables, side-chain the
          // callbacks for event publishing and return the original so that any
          // subclass-specific methods (e.g. APIPromise.withResponse()) remain
          // accessible to the caller.
          if (promise instanceof Promise && promise.constructor === Promise) {
            return promise.then(
              result => {
                __apm$ctx.result = result;
                ${iterPatch}
                ${channelVariable}.asyncStart.publish(__apm$ctx);
                ${channelVariable}.asyncEnd.publish(__apm$ctx);
                return __apm$ctx.result;
              },
              err => {
                __apm$ctx.error = err;
                ${channelVariable}.error.publish(__apm$ctx);
                ${channelVariable}.asyncStart.publish(__apm$ctx);
                ${channelVariable}.asyncEnd.publish(__apm$ctx);
                throw err;
              }
            );
          }
          promise.then(
            result => {
              __apm$ctx.result = result;
              ${iterPatch}
              ${channelVariable}.asyncStart.publish(__apm$ctx);
              ${channelVariable}.asyncEnd.publish(__apm$ctx);
            },
            err => {
              __apm$ctx.error = err;
              ${channelVariable}.error.publish(__apm$ctx);
              ${channelVariable}.asyncStart.publish(__apm$ctx);
              ${channelVariable}.asyncEnd.publish(__apm$ctx);
            }
          );
          return promise;
        } catch (err) {
          __apm$ctx.error = err;
          ${channelVariable}.error.publish(__apm$ctx);
          throw err;
        } finally {
          __apm$ctx.self ??= this;
          ${channelVariable}.end.publish(__apm$ctx);
        }
      });
    }
  `);
}
function wrapSync(state, node, iterPatch = "") {
	const { channelName } = state;
	const channelVariable = formatChannelVariable(channelName);
	return parse$4(`
    function wrapper () {
      if (!tr_ch_apm_hasSubscribers(${channelVariable})) return __apm$traced();

      return ${channelVariable}.start.runStores(__apm$ctx, () => {
        try {
          __apm$ctx.result = __apm$traced();
          ${iterPatch}
        } catch (err) {
          __apm$ctx.error = err;
          ${channelVariable}.error.publish(__apm$ctx);
          throw err;
        } finally {
         __apm$ctx.self ??= this;
          ${channelVariable}.end.publish(__apm$ctx);
        }
        return __apm$ctx.result;
      });
    }
  `);
}
function declareIteratorChannel(state, program) {
	const { channelName, module: { name } } = state;
	const iterChannelVariable = formatChannelVariable(channelName + ":next");
	if (program.body.some((child) => child.declarations?.[0]?.id?.name === iterChannelVariable)) return;
	const channelVariable = formatChannelVariable(channelName);
	const index = program.body.findIndex((child) => child.declarations?.[0]?.id?.name === channelVariable);
	const code = `const ${iterChannelVariable} = tr_ch_apm_tracingChannel("orchestrion:${name}:${channelName}:next")`;
	program.body.splice(index + 1, 0, parse$4(code).body[0]);
}
function generateIterPatch(state, returnKind, program) {
	const { channelName } = state;
	const traceMethod = returnKind === "Iterator" ? "traceSync" : "tracePromise";
	const iterChannelVariable = formatChannelVariable(channelName + ":next");
	declareIteratorChannel(state, program);
	return `
    const __apm$iter = __apm$ctx.result;
    if (__apm$iter != null && typeof __apm$iter.next === 'function') {
      const __apm$patchIter = function (method) {
        const __apm$orig = __apm$iter[method];
        if (typeof __apm$orig !== 'function') return;
        __apm$iter[method] = function () {
          const __apm$iterArgs = Array.prototype.slice.call(arguments);
          if (!tr_ch_apm_hasSubscribers(${iterChannelVariable})) return __apm$orig.apply(this, __apm$iterArgs);
          __apm$ctx.method = method;
          __apm$ctx.arguments = __apm$iterArgs;
          return ${iterChannelVariable}.${traceMethod}(__apm$orig, __apm$ctx, this, ...__apm$iterArgs);
        };
      };
      __apm$patchIter('next');
      __apm$patchIter('throw');
      __apm$patchIter('return');
    }
  `;
}
var transformsExports = transforms$2.exports;
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/_virtual/source-map.js
var sourceMap = {};
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vendored/@apm-js-collab/code-transformer/lib/transformer.js
var __typeError$1 = (msg) => {
	throw TypeError(msg);
};
var __accessCheck$1 = (obj, member, msg) => member.has(obj) || __typeError$1("Cannot " + msg);
var __privateGet$1 = (obj, member, getter) => (__accessCheck$1(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$1 = (obj, member, value) => member.has(obj) ? __typeError$1("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet$1 = (obj, member, value, setter) => (__accessCheck$1(obj, member, "write to private field"), member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck$1(obj, member, "access private method"), method);
var _moduleName;
var _version;
var _filePath;
var _configs$1;
var _dcModule$1;
var _customTransforms$1;
var _Transformer_instances;
var visit_fn;
var getOperator_fn;
var collectExportAliases_fn;
var resolveExportAlias_fn;
var fromFunctionQuery_fn;
var esquery = A;
var { parse: parse$3 } = meriyah;
var { generate } = astring;
var transforms = transformsExports;
var SourceMapConsumer;
var SourceMapGenerator;
var Transformer$1 = class {
	/**
	* @param {string} moduleName - The npm package name being instrumented.
	* @param {string} version - The installed semver version string.
	* @param {string} filePath - The relative file path within the package.
	* @param {object[]} configs - Instrumentation configuration objects for this file.
	* @param {string} dcModule - The diagnostics_channel module specifier to inject.
	* @param {Record<string, Function>} [customTransforms] - Optional custom operator overrides.
	*/
	constructor(moduleName, version, filePath, configs, dcModule, customTransforms = {}) {
		__privateAdd$1(this, _Transformer_instances);
		__privateAdd$1(this, _moduleName, null);
		__privateAdd$1(this, _version, null);
		__privateAdd$1(this, _filePath, null);
		__privateAdd$1(this, _configs$1, []);
		__privateAdd$1(this, _dcModule$1, null);
		__privateAdd$1(this, _customTransforms$1, {});
		__privateSet$1(this, _moduleName, moduleName);
		__privateSet$1(this, _version, version);
		__privateSet$1(this, _filePath, filePath);
		__privateSet$1(this, _configs$1, configs);
		__privateSet$1(this, _dcModule$1, dcModule);
		__privateSet$1(this, _customTransforms$1, customTransforms);
	}
	/** No-op — freeing resources is not needed for the JavaScript implementation. */
	free() {}
	/**
	* The npm package name being instrumented.
	*
	* @returns {string}
	*/
	get moduleName() {
		return __privateGet$1(this, _moduleName);
	}
	/**
	* The relative file path within the npm package being instrumented.
	*
	* @returns {string}
	*/
	get filePath() {
		return __privateGet$1(this, _filePath);
	}
	/**
	* Instruments `code` by injecting diagnostics_channel tracing around the
	* target functions defined by this transformer's configs.
	*
	* @param {string|Buffer} code - Original JavaScript source, or a Buffer containing UTF-8 source.
	* @param {'esm'|'cjs'|'unknown'} moduleType - Whether the source is an ES module or CommonJS.
	* @param {string|object|null} [sourcemap] - Existing source map (raw string or object) to chain from.
	* @returns {{ code: string, map?: string }}
	*   The transformed source and an optional updated source map.
	* @throws {Error} If no injection points are found for any config.
	*/
	transform(code, moduleType, sourcemap) {
		if (Buffer.isBuffer(code)) code = code.toString();
		if (!code) return { code };
		let ast;
		let aliases = {};
		let injectionCount = 0;
		for (const config of __privateGet$1(this, _configs$1)) {
			const { astQuery, functionQuery = {} } = config;
			if (!ast) {
				const options = {
					loc: true,
					ranges: true,
					raw: true,
					module: moduleType === "esm"
				};
				try {
					ast = parse$3(code, options);
				} catch {
					ast = parse$3(code, {
						...options,
						module: !options.module
					});
				}
				if (moduleType === "esm") aliases = __privateMethod(this, _Transformer_instances, collectExportAliases_fn).call(this, ast);
			}
			const resolvedFunctionQuery = __privateMethod(this, _Transformer_instances, resolveExportAlias_fn).call(this, functionQuery, aliases);
			const query = astQuery || __privateMethod(this, _Transformer_instances, fromFunctionQuery_fn).call(this, resolvedFunctionQuery);
			const state = {
				...config,
				dcModule: __privateGet$1(this, _dcModule$1),
				moduleType,
				moduleVersion: __privateGet$1(this, _version),
				functionQuery: resolvedFunctionQuery
			};
			state.operator = __privateMethod(this, _Transformer_instances, getOperator_fn).call(this, state);
			esquery.traverse(ast, esquery.parse(query), (...args) => {
				injectionCount++;
				__privateMethod(this, _Transformer_instances, visit_fn).call(this, state, ...args);
			});
		}
		if (injectionCount === 0 && __privateGet$1(this, _configs$1).length > 0) {
			const names = __privateGet$1(this, _configs$1).map(({ astQuery, functionQuery = {} }) => {
				if (astQuery) return astQuery;
				const resolvedQuery = __privateMethod(this, _Transformer_instances, resolveExportAlias_fn).call(this, functionQuery, aliases);
				const queryName = (q) => q.methodName || q.privateMethodName || q.functionName || q.expressionName || "constructor";
				const originalName = queryName(functionQuery);
				const originalAlias = functionQuery.className || functionQuery.functionName || functionQuery.expressionName;
				const resolvedAlias = resolvedQuery.className || resolvedQuery.functionName || resolvedQuery.expressionName;
				if (originalAlias && originalAlias !== resolvedAlias) return `${originalAlias} (local name: ${resolvedAlias})`;
				return originalName;
			});
			throw new Error(`Failed to find injection points for: ${JSON.stringify(names)}`);
		}
		if (ast) {
			SourceMapConsumer ?? (SourceMapConsumer = sourceMap.SourceMapConsumer);
			SourceMapGenerator ?? (SourceMapGenerator = sourceMap.SourceMapGenerator);
			const file = `${__privateGet$1(this, _moduleName)}/${__privateGet$1(this, _filePath)}`;
			let generator;
			if (sourcemap) {
				const consumer = new SourceMapConsumer(sourcemap);
				consumer.file = file;
				generator = SourceMapGenerator.fromSourceMap(consumer);
			} else generator = new SourceMapGenerator({ file });
			return {
				code: generate(ast, { sourceMap: generator }),
				map: generator.toString()
			};
		}
		return { code };
	}
};
_moduleName = /* @__PURE__ */ new WeakMap();
_version = /* @__PURE__ */ new WeakMap();
_filePath = /* @__PURE__ */ new WeakMap();
_configs$1 = /* @__PURE__ */ new WeakMap();
_dcModule$1 = /* @__PURE__ */ new WeakMap();
_customTransforms$1 = /* @__PURE__ */ new WeakMap();
_Transformer_instances = /* @__PURE__ */ new WeakSet();
/**
* Visitor called for each AST node that matches a config's query.
* Handles index-based filtering and delegates to the appropriate transform.
*
* @param {object} state - Merged config + runtime state for this traversal.
* @param {...unknown} args - `(node, parent, ancestry)` from esquery traverse.
*/
visit_fn = function(state, ...args) {
	const transform = __privateGet$1(this, _customTransforms$1)[state.operator] ?? transforms[state.operator];
	const { index = 0 } = state.functionQuery;
	const [node] = args;
	const type = node.init?.type || node.type;
	if (type !== "ClassDeclaration" && type !== "ClassExpression") {
		if (node.type === "VariableDeclarator") return;
		state.functionIndex = ++state.functionIndex || 0;
		if (index !== null && index !== state.functionIndex) return;
	}
	transform(state, ...args);
};
/**
* Resolves the operator name (transform function key) for a config.
*
* If the config has an explicit `transform` name it is used directly;
* otherwise the operator is derived from the `kind` field of `functionQuery`.
*
* @param {{ transform?: string, functionQuery: { kind?: string } }} state
* @returns {string} Operator name, e.g. `'tracePromise'`.
*/
getOperator_fn = function({ transform, functionQuery: { kind } }) {
	if (transform) return transform;
	switch (kind) {
		case "Async": return "tracePromise";
		case "Auto": return "traceAuto";
		case "Callback": return "traceCallback";
		case "Sync": return "traceSync";
		default: return "traceSync";
	}
};
/**
* Collects a map of exported name → local name from `export { local as exported }`
* declarations so that instrumentation configs that reference export names can be
* resolved to local identifiers.
*
* @param {import('estree').Program} ast
* @returns {Record<string, string>} Map of exported name to local name.
*/
collectExportAliases_fn = function(ast) {
	const aliases = {};
	for (const node of ast.body) if (node.type === "ExportNamedDeclaration" && !node.source) {
		for (const spec of node.specifiers) if (spec.exported && spec.local) {
			const exportedName = spec.exported.name ?? spec.exported.value;
			const localName = spec.local.name ?? spec.local.value;
			if (exportedName && localName) aliases[exportedName] = localName;
		}
	}
	return aliases;
};
/**
* If `functionQuery.isExportAlias` is set, replaces the exported identifier in
* `functionQuery` with the corresponding local name from `aliases`.
*
* @param {object} functionQuery
* @param {Record<string, string>} aliases - Map produced by {@link #collectExportAliases}.
* @returns {object} Resolved function query (may be the original object if unchanged).
*/
resolveExportAlias_fn = function(functionQuery, aliases) {
	if (!functionQuery.isExportAlias) return functionQuery;
	const { functionName, expressionName, className } = functionQuery;
	if (functionName && aliases[functionName]) return {
		...functionQuery,
		functionName: aliases[functionName]
	};
	if (expressionName && aliases[expressionName]) return {
		...functionQuery,
		expressionName: aliases[expressionName]
	};
	if (className && aliases[className]) return {
		...functionQuery,
		className: aliases[className]
	};
	return functionQuery;
};
/**
* Builds a comma-separated esquery selector string from a `functionQuery` descriptor.
*
* Handles class methods, standalone functions, and expression assignments, producing
* multiple selector alternatives joined with `, `.
*
* @param {object} functionQuery
* @param {string} [functionQuery.className]
* @param {string} [functionQuery.methodName]
* @param {string} [functionQuery.privateMethodName]
* @param {string} [functionQuery.functionName]
* @param {string} [functionQuery.expressionName]
* @returns {string} esquery selector.
*/
fromFunctionQuery_fn = function(functionQuery) {
	const { functionName, expressionName, className, objectName, propertyName } = functionQuery;
	const type = functionQuery.privateMethodName ? "PrivateIdentifier" : "Identifier";
	const queries = [];
	let method = functionQuery.methodName || functionQuery.privateMethodName;
	if (className) {
		method ?? (method = "constructor");
		queries.push(`[id.name="${className}"]`, `[id.name="${className}"] > ClassExpression`, `[id.name="${className}"] > ClassBody > [key.name="${method}"][key.type=${type}] > [async]`, `[id.name="${className}"] > ClassExpression > ClassBody > [key.name="${method}"][key.type=${type}] > [async]`);
	} else if (method) queries.push(`ClassBody > [key.name="${method}"][key.type=${type}] > [async]`, `Property[key.name="${method}"][key.type=${type}] > [async]`);
	if (functionName) queries.push(`FunctionDeclaration[id.name="${functionName}"][async]`);
	else if (expressionName) queries.push(`FunctionExpression[id.name="${expressionName}"][async]`, `ArrowFunctionExpression[id.name="${expressionName}"][async]`, `VariableDeclarator[id.name="${expressionName}"] > FunctionExpression[async]`, `VariableDeclarator[id.name="${expressionName}"] > ArrowFunctionExpression[async]`, `AssignmentExpression[left.property.name="${expressionName}"] > FunctionExpression[async]`, `AssignmentExpression[left.property.name="${expressionName}"] > ArrowFunctionExpression[async]`, `AssignmentExpression[left.name="${expressionName}"] > FunctionExpression[async]`, `AssignmentExpression[left.name="${expressionName}"] > ArrowFunctionExpression[async]`);
	if (objectName || propertyName) {
		if (!objectName || !propertyName) throw new Error(`functionQuery: 'objectName' and 'propertyName' must be used together (got objectName=${objectName}, propertyName=${propertyName})`);
		const objectSelector = objectName === "this" ? "left.object.type=ThisExpression" : `left.object.name="${objectName}"`;
		queries.push(`AssignmentExpression[${objectSelector}][left.property.name="${propertyName}"] > [async]`);
	}
	return queries.join(", ");
};
var transformer = { Transformer: Transformer$1 };
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vendored/@apm-js-collab/code-transformer/lib/matcher.js
var __typeError = (msg) => {
	throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
var _configs;
var _dcModule;
var _transformers;
var _customTransforms;
var semifies = semifies$1;
var { Transformer } = transformer;
var InstrumentationMatcher$1 = class {
	/**
	* @param {object[]} configs - Array of instrumentation configuration objects.
	* @param {string} [dcModule] - The diagnostics_channel module specifier to inject.
	*   Defaults to `'diagnostics_channel'`.
	*/
	constructor(configs, dcModule) {
		__privateAdd(this, _configs, []);
		__privateAdd(this, _dcModule, null);
		__privateAdd(this, _transformers, {});
		__privateAdd(this, _customTransforms, {});
		__privateSet(this, _configs, configs);
		__privateSet(this, _dcModule, dcModule || "diagnostics_channel");
	}
	/** Releases all cached transformers, freeing any associated resources. */
	free() {
		__privateSet(this, _transformers, {});
	}
	/**
	* Registers a custom transform function under the given operator name.
	*
	* Custom transforms override built-in ones when an instrumentation config
	* specifies the same `transform` value.
	*
	* @param {string} name - Operator name (e.g. `'traceSync'`).
	* @param {Function} fn - Transform function `(state, node, parent, ancestry) => void`.
	*/
	addTransform(name, fn) {
		__privateGet(this, _customTransforms)[name] = fn;
	}
	/**
	* Returns a {@link Transformer} for the given module/file/version, or `undefined`
	* if no registered config matches.
	*
	* Results are cached by a `moduleName/filePath@version` key.
	*
	* @param {string} moduleName - The npm package name (e.g. `'express'`).
	* @param {string} version - The installed semver version string.
	* @param {string} filePath - The relative file path within the package.
	* @returns {import('./transformer').Transformer|undefined}
	*/
	getTransformer(moduleName, version, filePath) {
		filePath = filePath.replace(/\\/g, "/");
		const id = `${moduleName}/${filePath}@${version}`;
		if (__privateGet(this, _transformers)[id]) return __privateGet(this, _transformers)[id];
		const configs = __privateGet(this, _configs).filter(({ module: mod }) => mod.name === moduleName && (typeof mod.filePath === "string" ? mod.filePath === filePath : mod.filePath.test(filePath)) && semifies(version, mod.versionRange));
		if (configs.length === 0) return;
		__privateGet(this, _transformers)[id] = new Transformer(moduleName, version, filePath, configs, __privateGet(this, _dcModule), __privateGet(this, _customTransforms));
		return __privateGet(this, _transformers)[id];
	}
};
_configs = /* @__PURE__ */ new WeakMap();
_dcModule = /* @__PURE__ */ new WeakMap();
_transformers = /* @__PURE__ */ new WeakMap();
_customTransforms = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vendored/@apm-js-collab/code-transformer/lib/index.js
var { InstrumentationMatcher } = { InstrumentationMatcher: InstrumentationMatcher$1 };
function create$1(configs, dcModule) {
	return new InstrumentationMatcher(configs, dcModule);
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vendored/@apm-js-collab/code-transformer/index.js
var codeTransformer = { create: create$1 };
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vendored/module-details-from-path/index.js
var sep$1 = require$$0$2.sep;
var moduleDetailsFromPath = function(file) {
	var segments = file.split(sep$1);
	var index = segments.lastIndexOf("node_modules");
	if (index === -1) return;
	if (!segments[index + 1]) return;
	var scoped = segments[index + 1][0] === "@";
	var name = scoped ? segments[index + 1] + "/" + segments[index + 2] : segments[index + 1];
	var offset = scoped ? 3 : 2;
	var basedir = "";
	var lastBaseDirSegmentIndex = index + offset - 1;
	for (var i = 0; i <= lastBaseDirSegmentIndex; i++) if (i === lastBaseDirSegmentIndex) basedir += segments[i];
	else basedir += segments[i] + sep$1;
	var path = "";
	var lastSegmentIndex = segments.length - 1;
	for (var i2 = index + offset; i2 <= lastSegmentIndex; i2++) if (i2 === lastSegmentIndex) path += segments[i2];
	else path += segments[i2] + sep$1;
	return {
		name,
		basedir,
		path
	};
};
var parse$2 = /*@__PURE__*/ getDefaultExportFromCjs(moduleDetailsFromPath);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vendored/@apm-js-collab/tracing-hooks/lib/get-package-version.js
var { readFileSync: readFileSync$2 } = require$$0;
var { join: join$1 } = require$$0$2;
var packageVersions = /* @__PURE__ */ new Map();
function getPackageVersion$1(baseDir) {
	if (packageVersions.has(baseDir)) return packageVersions.get(baseDir);
	try {
		const jsonFile = readFileSync$2(join$1(baseDir, "package.json"));
		const { version } = JSON.parse(jsonFile);
		packageVersions.set(baseDir, version);
		return version;
	} catch {
		return process.version.slice(1);
	}
}
var getPackageVersion_1 = getPackageVersion$1;
var getPackageVersion$1$1 = /*@__PURE__*/ getDefaultExportFromCjs(getPackageVersion_1);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vendored/@apm-js-collab/tracing-hooks/lib/diagnostics.js
var diagnosticsHook;
function setDiagnosticsHook$1(hook) {
	diagnosticsHook = hook;
}
function emitDiagnostics$1(diag) {
	if (diagnosticsHook) diagnosticsHook(diag);
}
var diagnostics = {
	setDiagnosticsHook: setDiagnosticsHook$1,
	emitDiagnostics: emitDiagnostics$1
};
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/_virtual/node.js
var node = { exports: {} };
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vendored/has-flag/index.js
var hasFlag$1 = (flag, argv = process.argv) => {
	const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf("--");
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vendored/supports-color/index.js
var os = require$$0$1;
var tty = require$$1$1;
var hasFlag = hasFlag$1;
var { env } = process;
var forceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) forceColor = 0;
else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) forceColor = 1;
if ("FORCE_COLOR" in env) {
	if (env.FORCE_COLOR === "true") forceColor = 1;
	else if (env.FORCE_COLOR === "false") forceColor = 0;
	else forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
}
function translateLevel(level) {
	if (level === 0) return false;
	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}
function supportsColor(haveStream, streamIsTTY) {
	if (forceColor === 0) return 0;
	if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) return 3;
	if (hasFlag("color=256")) return 2;
	if (haveStream && !streamIsTTY && forceColor === void 0) return 0;
	const min = forceColor || 0;
	if (env.TERM === "dumb") return min;
	if (process.platform === "win32") {
		const osRelease = os.release().split(".");
		if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) return Number(osRelease[2]) >= 14931 ? 3 : 2;
		return 1;
	}
	if ("CI" in env) {
		if ([
			"TRAVIS",
			"CIRCLECI",
			"APPVEYOR",
			"GITLAB_CI",
			"GITHUB_ACTIONS",
			"BUILDKITE"
		].some((sign) => sign in env) || env.CI_NAME === "codeship") return 1;
		return min;
	}
	if ("TEAMCITY_VERSION" in env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	if (env.COLORTERM === "truecolor") return 3;
	if ("TERM_PROGRAM" in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
		switch (env.TERM_PROGRAM) {
			case "iTerm.app": return version >= 3 ? 3 : 2;
			case "Apple_Terminal": return 2;
		}
	}
	if (/-256(color)?$/i.test(env.TERM)) return 2;
	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) return 1;
	if ("COLORTERM" in env) return 1;
	return min;
}
function getSupportLevel(stream) {
	return translateLevel(supportsColor(stream, stream && stream.isTTY));
}
var supportsColor_1 = {
	supportsColor: getSupportLevel,
	stdout: translateLevel(supportsColor(true, tty.isatty(1))),
	stderr: translateLevel(supportsColor(true, tty.isatty(2)))
};
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vendored/ms/index.js
var s = 1e3;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
var ms = function(val, options) {
	options = options || {};
	var type = typeof val;
	if (type === "string" && val.length > 0) return parse$1(val);
	else if (type === "number" && isFinite(val)) return options.long ? fmtLong(val) : fmtShort(val);
	throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
};
function parse$1(str) {
	str = String(str);
	if (str.length > 100) return;
	var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
	if (!match) return;
	var n = parseFloat(match[1]);
	switch ((match[2] || "ms").toLowerCase()) {
		case "years":
		case "year":
		case "yrs":
		case "yr":
		case "y": return n * y;
		case "weeks":
		case "week":
		case "w": return n * w;
		case "days":
		case "day":
		case "d": return n * d;
		case "hours":
		case "hour":
		case "hrs":
		case "hr":
		case "h": return n * h;
		case "minutes":
		case "minute":
		case "mins":
		case "min":
		case "m": return n * m;
		case "seconds":
		case "second":
		case "secs":
		case "sec":
		case "s": return n * s;
		case "milliseconds":
		case "millisecond":
		case "msecs":
		case "msec":
		case "ms": return n;
		default: return;
	}
}
function fmtShort(ms) {
	var msAbs = Math.abs(ms);
	if (msAbs >= d) return Math.round(ms / d) + "d";
	if (msAbs >= h) return Math.round(ms / h) + "h";
	if (msAbs >= m) return Math.round(ms / m) + "m";
	if (msAbs >= s) return Math.round(ms / s) + "s";
	return ms + "ms";
}
function fmtLong(ms) {
	var msAbs = Math.abs(ms);
	if (msAbs >= d) return plural(ms, msAbs, d, "day");
	if (msAbs >= h) return plural(ms, msAbs, h, "hour");
	if (msAbs >= m) return plural(ms, msAbs, m, "minute");
	if (msAbs >= s) return plural(ms, msAbs, s, "second");
	return ms + " ms";
}
function plural(ms, msAbs, n, name) {
	var isPlural = msAbs >= n * 1.5;
	return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
}
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vendored/debug/src/common.js
function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = ms;
	createDebug.destroy = destroy;
	Object.keys(env).forEach((key) => {
		createDebug[key] = env[key];
	});
	createDebug.names = [];
	createDebug.skips = [];
	createDebug.formatters = {};
	function selectColor(namespace) {
		let hash = 0;
		for (let i = 0; i < namespace.length; i++) {
			hash = (hash << 5) - hash + namespace.charCodeAt(i);
			hash |= 0;
		}
		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;
		function debug(...args) {
			if (!debug.enabled) return;
			const self = debug;
			const curr = Number(/* @__PURE__ */ new Date());
			self.diff = curr - (prevTime || curr);
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;
			args[0] = createDebug.coerce(args[0]);
			if (typeof args[0] !== "string") args.unshift("%O");
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				if (match === "%%") return "%";
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === "function") {
					const val = args[index];
					match = formatter.call(self, val);
					args.splice(index, 1);
					index--;
				}
				return match;
			});
			createDebug.formatArgs.call(self, args);
			(self.log || createDebug.log).apply(self, args);
		}
		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy;
		Object.defineProperty(debug, "enabled", {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) return enableOverride;
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}
				return enabledCache;
			},
			set: (v) => {
				enableOverride = v;
			}
		});
		if (typeof createDebug.init === "function") createDebug.init(debug);
		return debug;
	}
	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;
		createDebug.names = [];
		createDebug.skips = [];
		const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
		for (const ns of split) if (ns[0] === "-") createDebug.skips.push(ns.slice(1));
		else createDebug.names.push(ns);
	}
	function matchesTemplate(search, template) {
		let searchIndex = 0;
		let templateIndex = 0;
		let starIndex = -1;
		let matchIndex = 0;
		while (searchIndex < search.length) if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
			if (template[templateIndex] === "*") {
				starIndex = templateIndex;
				matchIndex = searchIndex;
				templateIndex++;
			} else {
				searchIndex++;
				templateIndex++;
			}
		} else if (starIndex !== -1) {
			templateIndex = starIndex + 1;
			matchIndex++;
			searchIndex = matchIndex;
		} else return false;
		while (templateIndex < template.length && template[templateIndex] === "*") templateIndex++;
		return templateIndex === template.length;
	}
	function disable() {
		const namespaces = [...createDebug.names, ...createDebug.skips.map((namespace) => "-" + namespace)].join(",");
		createDebug.enable("");
		return namespaces;
	}
	function enabled(name) {
		for (const skip of createDebug.skips) if (matchesTemplate(name, skip)) return false;
		for (const ns of createDebug.names) if (matchesTemplate(name, ns)) return true;
		return false;
	}
	function coerce(val) {
		if (val instanceof Error) return val.stack || val.message;
		return val;
	}
	function destroy() {
		console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
	}
	createDebug.enable(createDebug.load());
	return createDebug;
}
var common = setup;
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vendored/debug/src/node.js
(function(module, exports) {
	const tty = require$$1$1;
	const util = require$$1;
	exports.init = init;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.destroy = util.deprecate(() => {}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
	exports.colors = [
		6,
		2,
		3,
		4,
		5,
		1
	];
	try {
		const supportsColor = supportsColor_1;
		if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	} catch (error) {}
	exports.inspectOpts = Object.keys(process.env).filter((key) => {
		return /^debug_/i.test(key);
	}).reduce((obj, key) => {
		const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});
		let val = process.env[key];
		if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
		else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
		else if (val === "null") val = null;
		else val = Number(val);
		obj[prop] = val;
		return obj;
	}, {});
	function useColors() {
		return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
	}
	function formatArgs(args) {
		const { namespace: name, useColors: useColors2 } = this;
		if (useColors2) {
			const c = this.color;
			const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
			const prefix = `  ${colorCode};1m${name} \x1B[0m`;
			args[0] = prefix + args[0].split("\n").join("\n" + prefix);
			args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
		} else args[0] = getDate() + name + " " + args[0];
	}
	function getDate() {
		if (exports.inspectOpts.hideDate) return "";
		return (/* @__PURE__ */ new Date()).toISOString() + " ";
	}
	function log(...args) {
		return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + "\n");
	}
	function save(namespaces) {
		if (namespaces) process.env.DEBUG = namespaces;
		else delete process.env.DEBUG;
	}
	function load() {
		return process.env.DEBUG;
	}
	function init(debug) {
		debug.inspectOpts = {};
		const keys = Object.keys(exports.inspectOpts);
		for (let i = 0; i < keys.length; i++) debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
	module.exports = common(exports);
	const { formatters } = module.exports;
	formatters.o = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
	};
	formatters.O = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util.inspect(v, this.inspectOpts);
	};
})(node, node.exports);
var nodeExports = node.exports;
var createDebug = /*@__PURE__*/ getDefaultExportFromCjs(nodeExports);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vendored/@apm-js-collab/tracing-hooks/index.js
var { create } = codeTransformer;
var Module = require$$1__default;
var parse = moduleDetailsFromPath;
var { pathToFileURL } = require$$3;
var getPackageVersion = getPackageVersion_1;
var { emitDiagnostics } = diagnostics;
var debug$1 = nodeExports("@apm-js-collab/tracing-hooks:module-patch");
var ModulePatch = class {
	constructor({ instrumentations = [] } = {}) {
		this.packages = new Set(instrumentations.map((i) => i.module.name));
		this.instrumentator = create(instrumentations);
		this.compile = Module.prototype._compile;
	}
	/**
	* Patches the Node.js module class method that is responsible for compiling code.
	* If a module is found that has an instrumentator, it will transform the code before compiling it
	* with tracing channel methods.
	*/
	patch() {
		const self = this;
		Module.prototype._compile = function wrappedCompile(...args) {
			const [content, filename] = args;
			const resolvedModule = parse(filename);
			if (resolvedModule && self.packages.has(resolvedModule.name)) {
				debug$1("found resolved module, checking if there is a transformer %s", filename);
				const version = getPackageVersion(resolvedModule.basedir, resolvedModule.name);
				const transformer = self.instrumentator.getTransformer(resolvedModule.name, version, resolvedModule.path);
				if (transformer) {
					debug$1("transforming file %s", filename);
					try {
						args[0] = transformer.transform(content, "cjs")?.code;
						emitDiagnostics({
							url: pathToFileURL(filename).href,
							moduleName: transformer.moduleName
						});
						if (process.env.TRACING_DUMP) dump(args[0], filename);
					} catch (error) {
						debug$1("Error transforming module %s: %o", filename, error);
						emitDiagnostics({
							url: pathToFileURL(filename).href,
							moduleName: transformer.moduleName,
							error
						});
					} finally {
						transformer.free();
					}
				}
			}
			return self.compile.apply(this, args);
		};
	}
	/**
	* Restores the original Module.prototype._compile method
	* **Note**: This is intended to be used in testing only.
	*/
	unpatch() {
		Module.prototype._compile = this.compile;
	}
};
function dump(code, filename) {
	const os = require$$0$1;
	const path = require$$0$2;
	const fs = require$$0;
	const base = process.env.TRACING_DUMP_DIR ?? os.tmpdir();
	const dirname = path.dirname(filename);
	const basename = path.basename(filename);
	const targetDir = path.join(base, dirname);
	const targetFile = path.join(targetDir, basename);
	debug$1("Dumping patched code to: %s", targetFile);
	fs.mkdirSync(targetDir, { recursive: true });
	fs.writeFileSync(targetFile, code);
}
var ModulePatch$1 = /*@__PURE__*/ getDefaultExportFromCjs(ModulePatch);
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/vendored/@apm-js-collab/tracing-hooks/hook.js
var debug = createDebug("@apm-js-collab/tracing-hooks:esm-hook");
var transformers = null;
var packages = null;
var instrumentator = null;
var emit = diagnostics.emitDiagnostics;
/**
* Creates a MessagePort that forwards diagnostics posted by the `Module.register`
* loader thread to the hook set via `setDiagnosticsHook` on this thread. Pass the
* returned port to `Module.register` in both `data.diagnosticsPort` and
* `transferList`.
*/
function createDiagnosticsPort() {
	const { port1, port2 } = new MessageChannel();
	port1.on("message", diagnostics.emitDiagnostics);
	port1.unref();
	return port2;
}
function initializeSync(data = {}) {
	const instrumentations = data?.instrumentations || [];
	instrumentator = codeTransformer.create(instrumentations);
	packages = new Set(instrumentations.map((i) => i.module.name));
	transformers = /* @__PURE__ */ new Map();
	emit = data?.diagnosticsPort ? createPortEmitter(data.diagnosticsPort) : diagnostics.emitDiagnostics;
}
function createPortEmitter(port) {
	return (diag) => {
		try {
			const error = diag.error === void 0 || diag.error instanceof Error ? diag.error : new Error(String(diag.error));
			port.postMessage({
				...diag,
				error
			});
		} catch (err) {
			debug("failed to post diagnostics for %s: %o", diag.url, err);
		}
	};
}
function resolveFromURL(url) {
	const resolvedModule = parse$2(url.url);
	if (resolvedModule && packages.has(resolvedModule.name)) {
		const version = getPackageVersion$1$1(fileURLToPath(resolvedModule.basedir));
		const transformer = instrumentator.getTransformer(resolvedModule.name, version, resolvedModule.path);
		if (transformer) transformers.set(url.url, transformer);
	}
	return url;
}
function resolveSync(specifier, context, nextResolve) {
	return resolveFromURL(nextResolve(specifier, context));
}
function loadSync(url, context, nextLoad) {
	const result = nextLoad(url, context);
	if (transformers.has(url) === false) return result;
	if (result.format === "commonjs") {
		const parsedUrl = new URL(result.responseURL ?? url);
		result.source ??= readFileSync$1(parsedUrl);
	}
	return loadResult(url, result);
}
function loadResult(url, result) {
	const code = result.source;
	if (code) {
		const transformer = transformers.get(url);
		try {
			const moduleType = result.format === "module" ? "esm" : result.format === "commonjs" ? "cjs" : "unknown";
			const source = typeof code === "string" ? code : Buffer.from(code).toString("utf8");
			result.source = transformer.transform(source, moduleType)?.code;
			result.shortCircuit = true;
			emit({
				url,
				moduleName: transformer.moduleName
			});
		} catch (err) {
			debug("Error transforming module %s: %o", url, err);
			emit({
				url,
				moduleName: transformer.moduleName,
				error: err
			});
		} finally {
			transformer.free();
		}
	}
	return result;
}
diagnostics.setDiagnosticsHook;
//#endregion
//#region node_modules/@sentry/server-utils/build/esm/orchestrion/runtime/register.js
function hasStableSyncModuleHooks(denoVersionString) {
	if (denoVersionString) {
		const { major: major2 = 0, minor: minor2 = 0 } = parseSemver(denoVersionString);
		return major2 > 2 || major2 === 2 && minor2 >= 8;
	}
	const { major = 0, minor = 0 } = parseSemver(process.versions.node ?? "0.0.0");
	return major > 25 || major === 25 && minor >= 1 || major === 24 && minor >= 13;
}
function registerDiagnosticsChannelInjection(_options) {
	if (!isMainThread && !parentPort) return;
	if (GLOBAL_OBJ?.__SENTRY_ORCHESTRION__?.runtime) return;
	const globalAny = globalThis;
	const stableSyncHooks = hasStableSyncModuleHooks(globalAny.Deno?.version?.deno);
	const mod = require$$1$2;
	diagnostics.setDiagnosticsHook(({ moduleName, error }) => {
		if (error) debug$3.warn(`[orchestrion] failed to inject diagnostics-channel into ${moduleName}:`, error);
		else {
			GLOBAL_OBJ.__SENTRY_ORCHESTRION__ = GLOBAL_OBJ.__SENTRY_ORCHESTRION__ || {};
			GLOBAL_OBJ.__SENTRY_ORCHESTRION__.runtime = GLOBAL_OBJ.__SENTRY_ORCHESTRION__.runtime || [];
			GLOBAL_OBJ.__SENTRY_ORCHESTRION__.runtime.push(moduleName);
		}
	});
	try {
		if (typeof mod.registerHooks === "function" && stableSyncHooks) {
			initializeSync({ instrumentations: SENTRY_INSTRUMENTATIONS });
			mod.registerHooks({
				resolve: resolveSync,
				load: loadSync
			});
			debug$3.log("Registered diagnostics-channel injection via Module.registerHooks()");
		} else if (typeof mod.register === "function" && !globalAny.Bun && !globalAny.Deno) {
			const diagnosticsPort = createDiagnosticsPort();
			let parentURL;
			parentURL = import.meta.url;
			mod.register("@sentry/server-utils/orchestrion/hook", {
				parentURL,
				data: {
					instrumentations: SENTRY_INSTRUMENTATIONS,
					diagnosticsPort
				},
				transferList: [diagnosticsPort]
			});
			new ModulePatch$1({ instrumentations: SENTRY_INSTRUMENTATIONS }).patch();
			debug$3.log("Registered diagnostics-channel injection via Module.register()");
		} else {
			debug$3.warn("No available Node API to register diagnostics-channel injection hooks; skipping.");
			return;
		}
	} catch (error) {
		debug$3.warn("Failed to register diagnostics-channel injection hooks; channel-based integrations will not record spans.", error);
		return;
	}
	GLOBAL_OBJ.__SENTRY_ORCHESTRION__ = GLOBAL_OBJ.__SENTRY_ORCHESTRION__ || {};
	GLOBAL_OBJ.__SENTRY_ORCHESTRION__.runtime = GLOBAL_OBJ.__SENTRY_ORCHESTRION__.runtime || [];
}
//#endregion
//#region node_modules/@sentry/node/build/esm/sdk/experimentalUseDiagnosticsChannelInjection.js
function diagnosticsChannelInjectionIntegrations() {
	return channelIntegrations;
}
function experimentalUseDiagnosticsChannelInjection(_options) {
	setDiagnosticsChannelInjectionLoader(() => {
		const integrations = Object.values(channelIntegrations).map((createIntegration) => createIntegration());
		const replacedOtelIntegrationNames = integrations.map((i) => i.name);
		return {
			integrations: [
				...integrations,
				ioredisChannelIntegration({ responseHook: cacheResponseHook }),
				redisChannelIntegration({ responseHook: cacheResponseHook })
			],
			replacedOtelIntegrationNames,
			register: () => registerDiagnosticsChannelInjection(),
			detect: detectOrchestrionSetup
		};
	});
}
//#endregion
//#region node_modules/@sentry/node/build/esm/index.js
var esm_exports = /* @__PURE__ */ __exportAll({
	NODE_VERSION: () => NODE_VERSION,
	NodeClient: () => NodeClient,
	OpenFeatureIntegrationHook: () => OpenFeatureIntegrationHookShim,
	SDK_VERSION: () => SDK_VERSION,
	SEMANTIC_ATTRIBUTE_SENTRY_OP: () => SEMANTIC_ATTRIBUTE_SENTRY_OP,
	SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN: () => SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN,
	SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE: () => SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE,
	SEMANTIC_ATTRIBUTE_SENTRY_SOURCE: () => SEMANTIC_ATTRIBUTE_SENTRY_SOURCE,
	Scope: () => Scope,
	SentryContextManager: () => SentryContextManager,
	_INTERNAL_normalizeCollectionInterval: () => _INTERNAL_normalizeCollectionInterval,
	addBreadcrumb: () => addBreadcrumb,
	addEventProcessor: () => addEventProcessor,
	addIntegration: () => addIntegration,
	amqplibIntegration: () => amqplibIntegration,
	anrIntegration: () => anrIntegration,
	anthropicAIIntegration: () => anthropicAIIntegration,
	applyDiagnosticsChannelInjectionIntegrations: () => applyDiagnosticsChannelInjectionIntegrations,
	bindScopeToEmitter: () => bindScopeToEmitter,
	buildLaunchDarklyFlagUsedHandler: () => buildLaunchDarklyFlagUsedHandlerShim,
	captureCheckIn: () => captureCheckIn,
	captureConsoleIntegration: () => captureConsoleIntegration,
	captureEvent: () => captureEvent,
	captureException: () => captureException,
	captureFeedback: () => captureFeedback,
	captureMessage: () => captureMessage,
	captureSession: () => captureSession,
	childProcessIntegration: () => childProcessIntegration,
	close: () => close,
	connectIntegration: () => connectIntegration,
	consoleIntegration: () => consoleIntegration,
	consoleLoggingIntegration: () => consoleLoggingIntegration,
	contextLinesIntegration: () => contextLinesIntegration,
	continueTrace: () => continueTrace$1,
	createConsolaReporter: () => createConsolaReporter,
	createGetModuleFromFilename: () => createGetModuleFromFilename,
	createLangChainCallbackHandler: () => createLangChainCallbackHandler,
	createSentryWinstonTransport: () => createSentryWinstonTransport,
	createTransport: () => createTransport,
	cron: () => cron,
	dataloaderIntegration: () => dataloaderIntegration,
	dedupeIntegration: () => dedupeIntegration,
	defaultStackParser: () => defaultStackParser,
	diagnosticsChannelInjectionIntegrations: () => diagnosticsChannelInjectionIntegrations,
	disableAnrDetectionForCallback: () => disableAnrDetectionForCallback,
	endSession: () => endSession,
	eventFiltersIntegration: () => eventFiltersIntegration,
	experimentalUseDiagnosticsChannelInjection: () => experimentalUseDiagnosticsChannelInjection,
	expressErrorHandler: () => expressErrorHandler,
	expressIntegration: () => expressIntegration,
	extraErrorDataIntegration: () => extraErrorDataIntegration,
	fastifyIntegration: () => fastifyIntegration,
	featureFlagsIntegration: () => featureFlagsIntegration,
	firebaseIntegration: () => firebaseIntegration,
	flush: () => flush,
	fsIntegration: () => fsIntegration,
	functionToStringIntegration: () => functionToStringIntegration,
	generateInstrumentOnce: () => generateInstrumentOnce,
	genericPoolIntegration: () => genericPoolIntegration,
	getActiveSpan: () => getActiveSpan$1,
	getAutoPerformanceIntegrations: () => getAutoPerformanceIntegrations,
	getClient: () => getClient,
	getCurrentScope: () => getCurrentScope,
	getDefaultIntegrations: () => getDefaultIntegrations,
	getDefaultIntegrationsWithoutPerformance: () => getDefaultIntegrationsWithoutPerformance,
	getGlobalScope: () => getGlobalScope,
	getIsolationScope: () => getIsolationScope,
	getRootSpan: () => getRootSpan$1,
	getSentryRelease: () => getSentryRelease,
	getSpanDescendants: () => getSpanDescendants,
	getSpanStatusFromHttpCode: () => getSpanStatusFromHttpCode,
	getTraceData: () => getTraceData$1,
	getTraceMetaTags: () => getTraceMetaTags,
	googleGenAIIntegration: () => googleGenAIIntegration,
	graphqlIntegration: () => graphqlIntegration,
	growthbookIntegration: () => growthbookIntegrationShim,
	hapiIntegration: () => hapiIntegration,
	honoIntegration: () => honoIntegration,
	httpHeadersToSpanAttributes: () => httpHeadersToSpanAttributes,
	httpIntegration: () => httpIntegration,
	httpServerIntegration: () => httpServerIntegration,
	httpServerSpansIntegration: () => httpServerSpansIntegration,
	inboundFiltersIntegration: () => inboundFiltersIntegration,
	init: () => init,
	initOpenTelemetry: () => initOpenTelemetry,
	initWithoutDefaultIntegrations: () => initWithoutDefaultIntegrations,
	instrumentAnthropicAiClient: () => instrumentAnthropicAiClient,
	instrumentGoogleGenAIClient: () => instrumentGoogleGenAIClient,
	instrumentLangChainEmbeddings: () => instrumentLangChainEmbeddings,
	instrumentLangGraph: () => instrumentLangGraph$1,
	instrumentOpenAiClient: () => instrumentOpenAiClient,
	instrumentStateGraph: () => instrumentStateGraph,
	instrumentStateGraphCompile: () => instrumentStateGraphCompile,
	instrumentSupabaseClient: () => instrumentSupabaseClient,
	isDiagnosticsChannelInjectionEnabled: () => isDiagnosticsChannelInjectionEnabled,
	isEnabled: () => isEnabled,
	isInitialized: () => isInitialized,
	kafkaIntegration: () => kafkaIntegration,
	knexIntegration: () => knexIntegration,
	koaIntegration: () => koaIntegration,
	langChainIntegration: () => langChainIntegration,
	langGraphIntegration: () => langGraphIntegration,
	lastEventId: () => lastEventId,
	launchDarklyIntegration: () => launchDarklyIntegrationShim,
	linkedErrorsIntegration: () => linkedErrorsIntegration,
	localVariablesIntegration: () => localVariablesIntegration,
	logger: () => exports_exports,
	lruMemoizerIntegration: () => lruMemoizerIntegration,
	makeNodeTransport: () => makeNodeTransport,
	metrics: () => public_api_exports,
	modulesIntegration: () => modulesIntegration,
	mongoIntegration: () => mongoIntegration,
	mongooseIntegration: () => mongooseIntegration,
	mysql2Integration: () => mysql2Integration,
	mysqlIntegration: () => mysqlIntegration,
	nativeNodeFetchIntegration: () => nativeNodeFetchIntegration,
	nodeContextIntegration: () => nodeContextIntegration,
	nodeRuntimeMetricsIntegration: () => nodeRuntimeMetricsIntegration,
	onUncaughtExceptionIntegration: () => onUncaughtExceptionIntegration,
	onUnhandledRejectionIntegration: () => onUnhandledRejectionIntegration,
	openAIIntegration: () => openAIIntegration,
	openFeatureIntegration: () => openFeatureIntegrationShim,
	parameterize: () => parameterize,
	pinoIntegration: () => pinoIntegration,
	postgresIntegration: () => postgresIntegration,
	postgresJsIntegration: () => postgresJsIntegration,
	preloadOpenTelemetry: () => preloadOpenTelemetry,
	prismaIntegration: () => prismaIntegration,
	processSessionIntegration: () => processSessionIntegration,
	profiler: () => profiler,
	redisIntegration: () => redisIntegration,
	requestDataIntegration: () => requestDataIntegration,
	rewriteFramesIntegration: () => rewriteFramesIntegration,
	setAttribute: () => setAttribute,
	setAttributes: () => setAttributes,
	setContext: () => setContext,
	setConversationId: () => setConversationId,
	setCurrentClient: () => setCurrentClient,
	setExtra: () => setExtra,
	setExtras: () => setExtras,
	setHttpStatus: () => setHttpStatus,
	setMeasurement: () => setMeasurement,
	setNodeAsyncContextStrategy: () => setNodeOpenTelemetryContextAsyncContextStrategy,
	setTag: () => setTag,
	setTags: () => setTags,
	setUser: () => setUser,
	setupConnectErrorHandler: () => setupConnectErrorHandler,
	setupExpressErrorHandler: () => setupExpressErrorHandler,
	setupFastifyErrorHandler: () => setupFastifyErrorHandler,
	setupHapiErrorHandler: () => setupHapiErrorHandler,
	setupHonoErrorHandler: () => setupHonoErrorHandler,
	setupKoaErrorHandler: () => setupKoaErrorHandler,
	spanStreamingIntegration: () => spanStreamingIntegration,
	spanToBaggageHeader: () => spanToBaggageHeader,
	spanToJSON: () => spanToJSON,
	spanToTraceHeader: () => spanToTraceHeader,
	spotlightIntegration: () => spotlightIntegration,
	startInactiveSpan: () => startInactiveSpan$1,
	startNewTrace: () => startNewTrace$1,
	startSession: () => startSession,
	startSpan: () => startSpan$3,
	startSpanManual: () => startSpanManual$1,
	statsigIntegration: () => statsigIntegrationShim,
	supabaseIntegration: () => supabaseIntegration,
	suppressTracing: () => suppressTracing$1,
	systemErrorIntegration: () => systemErrorIntegration,
	tediousIntegration: () => tediousIntegration,
	trpcMiddleware: () => trpcMiddleware,
	unleashIntegration: () => unleashIntegrationShim,
	updateSpanName: () => updateSpanName,
	validateOpenTelemetrySetup: () => validateOpenTelemetrySetup,
	vercelAIIntegration: () => vercelAIIntegration,
	winterCGHeadersToDict: () => winterCGHeadersToDict,
	withActiveSpan: () => withActiveSpan$1,
	withIsolationScope: () => withIsolationScope,
	withMonitor: () => withMonitor,
	withScope: () => withScope,
	withStreamedSpan: () => withStreamedSpan,
	wrapMcpServerWithSentry: () => wrapMcpServerWithSentry,
	zodErrorsIntegration: () => zodErrorsIntegration
});
//#endregion
export { getDefaultIntegrations as n, init as r, esm_exports as t };
