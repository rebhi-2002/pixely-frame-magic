import { i as __toESM, n as __exportAll$1 } from "../_runtime.mjs";
import { t as require_src } from "../_libs/opentelemetry__api.mjs";
import { b as suppressTracing, d as SDK_INFO, n as RPCType, r as setRPCMetadata, v as W3CBaggagePropagator, y as isTracingSuppressed } from "../_libs/@opentelemetry/core+[...].mjs";
import { a as registerInstrumentations, i as safeExecuteInTheMiddle, n as InstrumentationBase, r as isWrapped, t as InstrumentationNodeModuleDefinition } from "../_libs/opentelemetry__instrumentation.mjs";
import { o as SamplingDecision } from "../_libs/opentelemetry__sdk-trace.mjs";
import { t as BasicTracerProvider } from "../_libs/opentelemetry__sdk-trace-base.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { createRequire } from "node:module";
import * as http from "node:http";
import { Readable } from "node:stream";
import * as https from "node:https";
import * as diagnosticsChannel from "node:diagnostics_channel";
import { subscribe, unsubscribe } from "node:diagnostics_channel";
import { EventEmitter, errorMonitor } from "node:events";
import { normalize } from "path";
import * as diagch from "diagnostics_channel";
import { URL as URL$1 } from "url";
import { AsyncLocalStorage } from "node:async_hooks";
import { execFile } from "node:child_process";
import { createReadStream, readFile, readFileSync, readdir } from "node:fs";
import * as os from "node:os";
import { join, posix, sep } from "node:path";
import * as util from "node:util";
import { promisify } from "node:util";
import { createInterface } from "node:readline";
import { Worker } from "node:worker_threads";
import { isMainThread, threadId } from "worker_threads";
import { createGzip } from "node:zlib";
import * as net from "node:net";
import * as tls from "node:tls";
import * as moduleModule from "module";
import { EventEmitter as EventEmitter$1 } from "events";
//#region node_modules/.nitro/vite/services/ssr/index.js
var ssr_exports = /* @__PURE__ */ __exportAll$1({
	a: () => setUser,
	c: () => updateSpanName,
	d: () => __exportAll,
	default: () => server_default,
	i: () => captureException,
	l: () => SEMANTIC_ATTRIBUTE_SENTRY_SOURCE,
	n: () => renderErrorPage,
	o: () => getActiveSpan$1,
	r: () => addIntegration,
	s: () => spanToJSON,
	t: () => env,
	u: () => addNonEnumerableProperty
});
var import_src = /* @__PURE__ */ __toESM(require_src());
var __defProp = Object.defineProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __require = /* #__PURE__ */ (() => createRequire(import.meta.url))();
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
var DEBUG_BUILD$4 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
var GLOBAL_OBJ = globalThis;
var SDK_VERSION = "10.74.0";
function getMainCarrier() {
	getSentryCarrier(GLOBAL_OBJ);
	return GLOBAL_OBJ;
}
function getSentryCarrier(carrier) {
	const __SENTRY__ = carrier.__SENTRY__ = carrier.__SENTRY__ || {};
	__SENTRY__.version = __SENTRY__.version || "10.74.0";
	return __SENTRY__[SDK_VERSION] = __SENTRY__["10.74.0"] || {};
}
function getGlobalSingleton(name, creator, obj = GLOBAL_OBJ) {
	const __SENTRY__ = obj.__SENTRY__ = obj.__SENTRY__ || {};
	const carrier = __SENTRY__[SDK_VERSION] = __SENTRY__["10.74.0"] || {};
	return carrier[name] || (carrier[name] = creator());
}
var CONSOLE_LEVELS = [
	"debug",
	"info",
	"warn",
	"error",
	"log",
	"assert",
	"trace"
];
var PREFIX = "Sentry Logger ";
var originalConsoleMethods = {};
function consoleSandbox(callback) {
	if (!("console" in GLOBAL_OBJ)) return callback();
	const console = GLOBAL_OBJ.console;
	const wrappedFuncs = {};
	const wrappedLevels = Object.keys(originalConsoleMethods);
	wrappedLevels.forEach((level) => {
		const originalConsoleMethod = originalConsoleMethods[level];
		wrappedFuncs[level] = console[level];
		console[level] = originalConsoleMethod;
	});
	try {
		return callback();
	} finally {
		wrappedLevels.forEach((level) => {
			console[level] = wrappedFuncs[level];
		});
	}
}
function enable() {
	_getLoggerSettings().enabled = true;
}
function disable() {
	_getLoggerSettings().enabled = false;
}
function isEnabled$1() {
	return _getLoggerSettings().enabled;
}
function log$1(...args) {
	_maybeLog("log", ...args);
}
function warn(...args) {
	_maybeLog("warn", ...args);
}
function error(...args) {
	_maybeLog("error", ...args);
}
function _maybeLog(level, ...args) {
	if (!DEBUG_BUILD$4) return;
	if (isEnabled$1()) consoleSandbox(() => {
		GLOBAL_OBJ.console[level](`${PREFIX}[${level}]:`, ...args);
	});
}
function _getLoggerSettings() {
	if (!DEBUG_BUILD$4) return { enabled: false };
	return getGlobalSingleton("loggerSettings", () => ({ enabled: false }));
}
var debug = {
	/** Enable logging. */
	enable,
	/** Disable logging. */
	disable,
	/** Check if logging is enabled. */
	isEnabled: isEnabled$1,
	/** Log a message. */
	log: log$1,
	/** Log a warning. */
	warn,
	/** Log an error. */
	error
};
var STACKTRACE_FRAME_LIMIT = 50;
var WEBPACK_ERROR_REGEXP = /\(error: (.*)\)/;
var STRIP_FRAME_REGEXP = /captureMessage|captureException/;
function createStackParser(...parsers) {
	const sortedParsers = parsers.sort((a, b) => a[0] - b[0]).map((p) => p[1]);
	return (stack, skipFirstLines = 0, framesToPop = 0) => {
		const frames = [];
		const lines = stack.split("\n");
		for (let i = skipFirstLines; i < lines.length; i++) {
			let line = lines[i];
			if (line.length > 1024) line = line.slice(0, 1024);
			const cleanedLine = WEBPACK_ERROR_REGEXP.test(line) ? line.replace(WEBPACK_ERROR_REGEXP, "$1") : line;
			if (cleanedLine.includes("Error: ")) continue;
			for (const parser of sortedParsers) {
				const frame = parser(cleanedLine);
				if (frame) {
					frames.push(frame);
					break;
				}
			}
			if (frames.length >= STACKTRACE_FRAME_LIMIT + framesToPop) break;
		}
		return stripSentryFramesAndReverse(frames.slice(framesToPop));
	};
}
function stackParserFromStackParserOptions(stackParser) {
	if (Array.isArray(stackParser)) return createStackParser(...stackParser);
	return stackParser;
}
function stripSentryFramesAndReverse(stack) {
	if (!stack.length) return [];
	const localStack = Array.from(stack);
	if (/sentryWrapped/.test(getLastStackFrame(localStack).function || "")) localStack.pop();
	localStack.reverse();
	if (STRIP_FRAME_REGEXP.test(getLastStackFrame(localStack).function || "")) {
		localStack.pop();
		if (STRIP_FRAME_REGEXP.test(getLastStackFrame(localStack).function || "")) localStack.pop();
	}
	return localStack.slice(0, STACKTRACE_FRAME_LIMIT).map((frame) => ({
		...frame,
		filename: frame.filename || getLastStackFrame(localStack).filename,
		function: frame.function || "?"
	}));
}
function getLastStackFrame(arr) {
	return arr[arr.length - 1] || {};
}
var defaultFunctionName = "<anonymous>";
function getFunctionName(fn) {
	try {
		if (!fn || typeof fn !== "function") return defaultFunctionName;
		return fn.name || defaultFunctionName;
	} catch {
		return defaultFunctionName;
	}
}
function normalizeStackTracePath(path) {
	let filename = path?.startsWith("file://") ? path.slice(7) : path;
	if (filename?.match(/\/[A-Z]:/)) filename = filename.slice(1);
	return filename;
}
var handlers = {};
var instrumented = {};
function addHandler(type, handler) {
	handlers[type] = handlers[type] || [];
	handlers[type].push(handler);
	return () => {
		const typeHandlers = handlers[type];
		if (typeHandlers) {
			const index = typeHandlers.indexOf(handler);
			if (index !== -1) typeHandlers.splice(index, 1);
		}
	};
}
function maybeInstrument(type, instrumentFn) {
	if (!instrumented[type]) {
		instrumented[type] = true;
		try {
			instrumentFn();
		} catch (e) {
			DEBUG_BUILD$4 && debug.error(`Error while instrumenting ${type}`, e);
		}
	}
}
function triggerHandlers(type, data) {
	const typeHandlers = type && handlers[type];
	if (!typeHandlers) return;
	for (const handler of typeHandlers) try {
		handler(data);
	} catch (e) {
		DEBUG_BUILD$4 && debug.error(`Error while triggering instrumentation handler.
Type: ${type}
Name: ${getFunctionName(handler)}
Error:`, e);
	}
}
var objectToString = Object.prototype.toString;
function isError(wat) {
	switch (objectToString.call(wat)) {
		case "[object Error]":
		case "[object Exception]":
		case "[object DOMException]":
		case "[object WebAssembly.Exception]": return true;
		default: return isInstanceOf(wat, Error);
	}
}
function isBuiltin$1(wat, className) {
	return objectToString.call(wat) === `[object ${className}]`;
}
function isErrorEvent$2(wat) {
	return isBuiltin$1(wat, "ErrorEvent");
}
function isString(wat) {
	return isBuiltin$1(wat, "String");
}
function isParameterizedString(wat) {
	return typeof wat === "object" && wat !== null && "__sentry_template_string__" in wat && "__sentry_template_values__" in wat;
}
function isPrimitive(wat) {
	return wat === null || isParameterizedString(wat) || typeof wat !== "object" && typeof wat !== "function";
}
function isPlainObject(wat) {
	return isBuiltin$1(wat, "Object");
}
function isObjectLike(wat) {
	return typeof wat === "object" && wat !== null;
}
function isEvent(wat) {
	return typeof Event !== "undefined" && isInstanceOf(wat, Event);
}
function isRegExp(wat) {
	return isBuiltin$1(wat, "RegExp");
}
function isThenable(wat) {
	return Boolean(wat?.then && typeof wat.then === "function");
}
function isInstanceOf(wat, base) {
	try {
		return wat instanceof base;
	} catch {
		return false;
	}
}
function fill(source, name, replacementFactory) {
	if (!(name in source)) return;
	const original = source[name];
	if (typeof original !== "function") return;
	const wrapped = replacementFactory(original);
	if (typeof wrapped === "function") markFunctionWrapped(wrapped, original);
	try {
		source[name] = wrapped;
	} catch {
		DEBUG_BUILD$4 && debug.log(`Failed to replace method "${name}" in object`, source);
	}
}
function addNonEnumerableProperty(obj, name, value) {
	try {
		Object.defineProperty(obj, name, {
			value,
			writable: true,
			configurable: true
		});
	} catch {
		DEBUG_BUILD$4 && debug.log(`Failed to add non-enumerable property "${String(name)}" to object`, obj);
	}
}
function markFunctionWrapped(wrapped, original) {
	try {
		wrapped.prototype = original.prototype = original.prototype || {};
		addNonEnumerableProperty(wrapped, "__sentry_original__", original);
	} catch {}
}
function wrapMethod(obj, field, wrapped, enumerable = true) {
	const original = obj[field];
	if (typeof original !== "function") throw new Error(`Cannot wrap method: ${field} is not a function`);
	if (getOriginalFunction(original)) throw new Error(`Attempting to wrap method ${field} multiple times`);
	markFunctionWrapped(wrapped, original);
	Object.defineProperty(obj, field, {
		writable: true,
		configurable: true,
		enumerable,
		value: wrapped
	});
}
function getOriginalFunction(func) {
	return func.__sentry_original__;
}
function convertToPlainObject(value) {
	if (isError(value)) return {
		message: value.message,
		name: value.name,
		stack: value.stack,
		...getOwnProperties(value)
	};
	if (isEvent(value)) {
		const { type, target, currentTarget, detail } = value;
		return {
			type,
			target,
			currentTarget,
			...detail ? { detail } : {},
			...getOwnProperties(value)
		};
	}
	return value;
}
function getOwnProperties(obj) {
	if (isObjectLike(obj)) return Object.fromEntries(Object.entries(obj));
	return {};
}
function extractExceptionKeysForMessage(exception) {
	const keys = Object.keys(convertToPlainObject(exception));
	keys.sort();
	return !keys[0] ? "[object has no keys]" : keys.join(", ");
}
var RESOLVED_RUNNER;
function withRandomSafeContext(cb) {
	if (RESOLVED_RUNNER !== void 0) return RESOLVED_RUNNER ? RESOLVED_RUNNER(cb) : cb();
	const sym = /* @__PURE__ */ Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__");
	const globalWithSymbol = GLOBAL_OBJ;
	if (sym in globalWithSymbol && typeof globalWithSymbol[sym] === "function") {
		RESOLVED_RUNNER = globalWithSymbol[sym];
		return RESOLVED_RUNNER(cb);
	}
	RESOLVED_RUNNER = null;
	return cb();
}
function safeMathRandom() {
	return withRandomSafeContext(() => Math.random());
}
function safeDateNow() {
	return withRandomSafeContext(() => Date.now());
}
var SENTRY_SKIP_NORMALIZATION = /* @__PURE__ */ Symbol.for("sentry.skipNormalization");
var SENTRY_OVERRIDE_NORMALIZATION_DEPTH = /* @__PURE__ */ Symbol.for("sentry.overrideNormalizationDepth");
function hasSkipNormalizationHint(value) {
	return Boolean(value[SENTRY_SKIP_NORMALIZATION]);
}
function getNormalizationDepthOverrideHint(value) {
	const v = value[SENTRY_OVERRIDE_NORMALIZATION_DEPTH];
	return typeof v === "number" ? v : void 0;
}
function normalize$1(input, depth = 100, maxProperties = Infinity) {
	try {
		return visit("", input, depth, maxProperties);
	} catch (err) {
		return { ERROR: `**non-serializable** (${err})` };
	}
}
function normalizeToSize(object, depth = 3, maxSize = 102400) {
	const normalized = normalize$1(object, depth);
	if (jsonSize(normalized) > maxSize) return normalizeToSize(object, depth - 1, maxSize);
	return normalized;
}
function visit(key, value, depth = Infinity, maxProperties = Infinity, memo = memoBuilder()) {
	const [memoize, unmemoize] = memo;
	if (value == null || ["boolean", "string"].includes(typeof value) || typeof value === "number" && Number.isFinite(value)) return value;
	const stringified = stringifyValue(key, value);
	if (!stringified.startsWith("[object ")) return stringified;
	if (hasSkipNormalizationHint(value)) return value;
	const overrideDepth = getNormalizationDepthOverrideHint(value);
	const remainingDepth = overrideDepth !== void 0 ? overrideDepth : depth;
	if (remainingDepth === 0) return stringified.replace("object ", "");
	if (memoize(value)) return "[Circular ~]";
	const valueWithToJSON = value;
	if (valueWithToJSON && typeof valueWithToJSON.toJSON === "function") try {
		return visit("", valueWithToJSON.toJSON(), remainingDepth - 1, maxProperties, memo);
	} catch {}
	const normalized = Array.isArray(value) ? [] : {};
	let numAdded = 0;
	const visitable = convertToPlainObject(value);
	for (const visitKey in visitable) {
		if (!Object.prototype.hasOwnProperty.call(visitable, visitKey)) continue;
		if (numAdded >= maxProperties) {
			normalized[visitKey] = "[MaxProperties ~]";
			break;
		}
		const visitValue = visitable[visitKey];
		normalized[visitKey] = visit(visitKey, visitValue, remainingDepth - 1, maxProperties, memo);
		numAdded++;
	}
	unmemoize(value);
	return normalized;
}
function stringifyValue(key, value) {
	try {
		if (typeof global !== "undefined" && value === global) return "[Global]";
		if (typeof value === "number" && !Number.isFinite(value)) return `[${value}]`;
		if (typeof value === "function") return `[Function: ${getFunctionName(value)}]`;
		if (typeof value === "symbol") return `[${String(value)}]`;
		if (typeof value === "bigint") return `[BigInt: ${String(value)}]`;
		return `[object ${getConstructorName(value)}]`;
	} catch (err) {
		return `**non-serializable** (${err})`;
	}
}
function getConstructorName(value) {
	const prototype = Object.getPrototypeOf(value);
	return prototype?.constructor ? prototype.constructor.name : "null prototype";
}
function utf8Length(value) {
	return ~-encodeURI(value).split(/%..|./).length;
}
function jsonSize(value) {
	return utf8Length(JSON.stringify(value));
}
function memoBuilder() {
	const inner = /* @__PURE__ */ new WeakSet();
	function memoize(obj) {
		if (inner.has(obj)) return true;
		inner.add(obj);
		return false;
	}
	function unmemoize(obj) {
		inner.delete(obj);
	}
	return [memoize, unmemoize];
}
function stringify(value, fallback = "[unserializable]") {
	if (typeof value === "string") return value;
	try {
		return JSON.stringify(value);
	} catch {
		return typeof fallback === "function" ? fallback(value) : fallback;
	}
}
function truncate(str, max = 0) {
	if (typeof str !== "string" || max === 0) return str;
	return str.length <= max ? str : `${str.slice(0, max)}...`;
}
function snipLine(line, colno) {
	let newLine = line;
	const lineLength = newLine.length;
	if (lineLength <= 150) return newLine;
	if (colno > lineLength) colno = lineLength;
	let start = Math.max(colno - 60, 0);
	if (start < 5) start = 0;
	let end = Math.min(start + 140, lineLength);
	if (end > lineLength - 5) end = lineLength;
	if (end === lineLength) start = Math.max(end - 140, 0);
	newLine = newLine.slice(start, end);
	if (start > 0) newLine = `'{snip} ${newLine}`;
	if (end < lineLength) newLine += " {snip}";
	return newLine;
}
function safeJoin(input, delimiter) {
	if (!Array.isArray(input)) return "";
	const output = [];
	for (let i = 0; i < input.length; i++) {
		const value = input[i];
		if (isPrimitive(value)) output.push(String(value));
		else if (value instanceof Error) output.push(value.message ? `${value.name}: ${value.message}` : value.name);
		else output.push(stringifyValue(void 0, value));
	}
	return output.join(delimiter);
}
function isMatchingPattern(value, pattern, requireExactStringMatch = false) {
	if (!isString(value)) return false;
	if (isRegExp(pattern)) return pattern.test(value);
	if (isString(pattern)) return requireExactStringMatch ? value === pattern : value.includes(pattern);
	if (typeof pattern === "function") return pattern(value);
	return false;
}
function stringMatchesSomePattern(testString, patterns = [], requireExactStringMatch = false) {
	for (const pattern of patterns) if (isMatchingPattern(testString, pattern, requireExactStringMatch)) return true;
	return false;
}
function getCrypto() {
	const gbl = GLOBAL_OBJ;
	return gbl.crypto || gbl.msCrypto;
}
var emptyUuid;
function getRandomByte() {
	return safeMathRandom() * 16;
}
function uuid4(crypto = getCrypto()) {
	try {
		if (crypto?.randomUUID) return withRandomSafeContext(() => crypto.randomUUID()).replace(/-/g, "");
	} catch {}
	if (!emptyUuid) emptyUuid = "10000000100040008000100000000000";
	return emptyUuid.replace(/[018]/g, (c) => (c ^ (getRandomByte() & 15) >> c / 4).toString(16));
}
function getFirstException(event) {
	return event.exception?.values?.[0];
}
function getEventDescription(event) {
	const { message, event_id: eventId } = event;
	if (message) return message;
	const firstException = getFirstException(event);
	if (firstException) {
		if (firstException.type && firstException.value) return `${firstException.type}: ${firstException.value}`;
		return firstException.type || firstException.value || eventId || "<unknown>";
	}
	return eventId || "<unknown>";
}
function addExceptionTypeValue(event, value, type) {
	const exception = event.exception = event.exception || {};
	const values = exception.values = exception.values || [];
	const firstException = values[0] = values[0] || {};
	if (!firstException.value) firstException.value = value || "";
	if (!firstException.type) firstException.type = type || "Error";
}
function addExceptionMechanism(event, newMechanism) {
	const firstException = getFirstException(event);
	if (!firstException) return;
	const defaultMechanism = {
		type: "generic",
		handled: true
	};
	const currentMechanism = firstException.mechanism;
	firstException.mechanism = {
		...defaultMechanism,
		...currentMechanism,
		...newMechanism
	};
	if (newMechanism && "data" in newMechanism) {
		const mergedData = {
			...currentMechanism?.data,
			...newMechanism.data
		};
		firstException.mechanism.data = mergedData;
	}
}
var SEMVER_REGEXP = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
function _parseInt(input) {
	return parseInt(input || "", 10);
}
function parseSemver(input) {
	const match = input.match(SEMVER_REGEXP) || [];
	const major = _parseInt(match[1]);
	const minor = _parseInt(match[2]);
	const patch = _parseInt(match[3]);
	return {
		buildmetadata: match[5],
		major: isNaN(major) ? void 0 : major,
		minor: isNaN(minor) ? void 0 : minor,
		patch: isNaN(patch) ? void 0 : patch,
		prerelease: match[4]
	};
}
function checkOrSetAlreadyCaught(exception) {
	if (isAlreadyCaptured(exception)) return true;
	try {
		addNonEnumerableProperty(exception, "__sentry_captured__", true);
	} catch {}
	return false;
}
function isAlreadyCaptured(exception) {
	try {
		return exception.__sentry_captured__;
	} catch {}
}
var ONE_SECOND_IN_MS = 1e3;
function dateTimestampInSeconds() {
	return safeDateNow() / ONE_SECOND_IN_MS;
}
function createUnixTimestampInSecondsFunc() {
	const { performance } = GLOBAL_OBJ;
	if (!performance?.now || !performance.timeOrigin) return dateTimestampInSeconds;
	const timeOrigin = performance.timeOrigin;
	return () => {
		return (timeOrigin + withRandomSafeContext(() => performance.now())) / ONE_SECOND_IN_MS;
	};
}
var _cachedTimestampInSeconds;
function timestampInSeconds() {
	return (_cachedTimestampInSeconds ?? (_cachedTimestampInSeconds = createUnixTimestampInSecondsFunc()))();
}
function makeSession(context) {
	const startingTime = timestampInSeconds();
	const session = {
		sid: uuid4(),
		init: true,
		timestamp: startingTime,
		started: startingTime,
		duration: 0,
		status: "ok",
		errors: 0,
		ignoreDuration: false,
		toJSON: () => sessionToJSON(session)
	};
	if (context) updateSession(session, context);
	return session;
}
function updateSession(session, context = {}) {
	if (context.user) {
		if (!session.ipAddress && context.user.ip_address) session.ipAddress = context.user.ip_address;
		if (!session.did && !context.did) session.did = context.user.id || context.user.email || context.user.username;
	}
	session.timestamp = context.timestamp || timestampInSeconds();
	if (context.abnormal_mechanism) session.abnormal_mechanism = context.abnormal_mechanism;
	if (context.ignoreDuration) session.ignoreDuration = context.ignoreDuration;
	if (context.sid) session.sid = context.sid.length === 32 ? context.sid : uuid4();
	if (context.init !== void 0) session.init = context.init;
	if (!session.did && context.did) session.did = `${context.did}`;
	if (typeof context.started === "number") session.started = context.started;
	if (session.ignoreDuration) session.duration = void 0;
	else if (typeof context.duration === "number") session.duration = context.duration;
	else {
		const duration = session.timestamp - session.started;
		session.duration = duration >= 0 ? duration : 0;
	}
	if (context.release) session.release = context.release;
	if (context.environment) session.environment = context.environment;
	if (!session.ipAddress && context.ipAddress) session.ipAddress = context.ipAddress;
	if (!session.userAgent && context.userAgent) session.userAgent = context.userAgent;
	if (typeof context.errors === "number") session.errors = context.errors;
	if (context.status) session.status = context.status;
}
function closeSession(session, status) {
	let context = {};
	if (status) context = { status };
	else if (session.status === "ok") context = { status: "exited" };
	updateSession(session, context);
}
function sessionToJSON(session) {
	return {
		sid: `${session.sid}`,
		init: session.init,
		started: (/* @__PURE__ */ new Date(session.started * 1e3)).toISOString(),
		timestamp: (/* @__PURE__ */ new Date(session.timestamp * 1e3)).toISOString(),
		status: session.status,
		errors: session.errors,
		did: typeof session.did === "number" || typeof session.did === "string" ? `${session.did}` : void 0,
		duration: session.duration,
		abnormal_mechanism: session.abnormal_mechanism,
		attrs: {
			release: session.release,
			environment: session.environment,
			ip_address: session.ipAddress,
			user_agent: session.userAgent
		}
	};
}
function merge(initialObj, mergeObj, levels = 2) {
	if (!mergeObj || typeof mergeObj !== "object" || levels <= 0) return mergeObj;
	if (initialObj && Object.keys(mergeObj).length === 0) return initialObj;
	const output = { ...initialObj };
	for (const key in mergeObj) if (Object.prototype.hasOwnProperty.call(mergeObj, key)) output[key] = merge(output[key], mergeObj[key], levels - 1);
	return output;
}
function generateTraceId() {
	return uuid4();
}
function generateSpanId() {
	return uuid4().substring(16);
}
function makeWeakRef(value) {
	try {
		const WeakRefImpl = GLOBAL_OBJ.WeakRef;
		if (typeof WeakRefImpl === "function") return new WeakRefImpl(value);
	} catch {}
	return value;
}
function derefWeakRef(ref) {
	if (!ref) return;
	if (typeof ref === "object" && "deref" in ref && typeof ref.deref === "function") try {
		return ref.deref();
	} catch {
		return;
	}
	return ref;
}
var SCOPE_SPAN_FIELD = "_sentrySpan";
function _setSpanForScope(scope, span) {
	if (span) addNonEnumerableProperty(scope, SCOPE_SPAN_FIELD, makeWeakRef(span));
	else delete scope[SCOPE_SPAN_FIELD];
}
function _getSpanForScope(scope) {
	return derefWeakRef(scope[SCOPE_SPAN_FIELD]);
}
var DEFAULT_MAX_BREADCRUMBS = 100;
var Scope = class Scope {
	constructor() {
		this._notifyingListeners = false;
		this._scopeListeners = [];
		this._eventProcessors = [];
		this._breadcrumbs = [];
		this._attachments = [];
		this._user = {};
		this._tags = {};
		this._attributes = {};
		this._extra = {};
		this._contexts = {};
		this._sdkProcessingMetadata = {};
		this._propagationContext = {
			traceId: generateTraceId(),
			sampleRand: safeMathRandom()
		};
	}
	/**
	* Clone all data from this scope into a new scope.
	*/
	clone() {
		const newScope = new Scope();
		newScope._breadcrumbs = [...this._breadcrumbs];
		newScope._tags = { ...this._tags };
		newScope._attributes = { ...this._attributes };
		newScope._extra = { ...this._extra };
		newScope._contexts = { ...this._contexts };
		if (this._contexts.flags) newScope._contexts.flags = { values: [...this._contexts.flags.values] };
		newScope._user = this._user;
		newScope._level = this._level;
		newScope._session = this._session;
		newScope._transactionName = this._transactionName;
		newScope._fingerprint = this._fingerprint;
		newScope._eventProcessors = [...this._eventProcessors];
		newScope._attachments = [...this._attachments];
		newScope._sdkProcessingMetadata = { ...this._sdkProcessingMetadata };
		newScope._propagationContext = { ...this._propagationContext };
		newScope._client = this._client;
		newScope._lastEventId = this._lastEventId;
		newScope._conversationId = this._conversationId;
		_setSpanForScope(newScope, _getSpanForScope(this));
		return newScope;
	}
	/**
	* Update the client assigned to this scope.
	* Note that not every scope will have a client assigned - isolation scopes & the global scope will generally not have a client,
	* as well as manually created scopes.
	*/
	setClient(client) {
		this._client = client;
	}
	/**
	* Set the ID of the last captured error event.
	* This is generally only captured on the isolation scope.
	*/
	setLastEventId(lastEventId) {
		this._lastEventId = lastEventId;
	}
	/**
	* Get the client assigned to this scope.
	*/
	getClient() {
		return this._client;
	}
	/**
	* Get the ID of the last captured error event.
	* This is generally only available on the isolation scope.
	*/
	lastEventId() {
		return this._lastEventId;
	}
	/**
	* @inheritDoc
	*/
	addScopeListener(callback) {
		this._scopeListeners.push(callback);
	}
	/**
	* Add an event processor that will be called before an event is sent.
	*/
	addEventProcessor(callback) {
		this._eventProcessors.push(callback);
		return this;
	}
	/**
	* Set the user for this scope.
	* Set to `null` to unset the user.
	*/
	setUser(user) {
		this._user = user || {
			email: void 0,
			id: void 0,
			ip_address: void 0,
			username: void 0
		};
		if (this._session) updateSession(this._session, { user });
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Get the user from this scope.
	*/
	getUser() {
		return this._user;
	}
	/**
	* Set the conversation ID for this scope.
	* Set to `null` to unset the conversation ID.
	*/
	setConversationId(conversationId) {
		this._conversationId = conversationId || void 0;
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Set an object that will be merged into existing tags on the scope,
	* and will be sent as tags data with the event.
	*/
	setTags(tags) {
		this._tags = {
			...this._tags,
			...tags
		};
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Set a single tag that will be sent as tags data with the event.
	*/
	setTag(key, value) {
		return this.setTags({ [key]: value });
	}
	/**
	* Sets attributes onto the scope.
	*
	* These attributes are applied to logs, metrics and streamed spans.
	*
	* Supported attribute value types are `string`, `number`, `boolean`, `string[]`, `number[]` and `boolean[]`.
	*
	* @param newAttributes - The attributes to set on the scope, as key-value pairs.
	*
	* @example
	* ```typescript
	* scope.setAttributes({
	*   is_admin: true,
	*   payment_selection: 'credit_card',
	*   render_duration: 150,
	* });
	* ```
	*/
	setAttributes(newAttributes) {
		this._attributes = {
			...this._attributes,
			...newAttributes
		};
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Sets an attribute onto the scope.
	*
	* These attributes are applied to logs, metrics and streamed spans.
	*
	* Supported attribute value types are `string`, `number`, `boolean`, `string[]`, `number[]` and `boolean[]`.
	*
	* @param key - The attribute key.
	* @param value - The attribute value.
	*
	* @example
	* ```typescript
	* scope.setAttribute('is_admin', true);
	* scope.setAttribute('render_duration', 150);
	* ```
	*/
	setAttribute(key, value) {
		return this.setAttributes({ [key]: value });
	}
	/**
	* Removes the attribute with the given key from the scope.
	*
	* @param key - The attribute key.
	*
	* @example
	* ```typescript
	* scope.removeAttribute('is_admin');
	* ```
	*/
	removeAttribute(key) {
		if (key in this._attributes) {
			delete this._attributes[key];
			this._notifyScopeListeners();
		}
		return this;
	}
	/**
	* Set an object that will be merged into existing extra on the scope,
	* and will be sent as extra data with the event.
	*/
	setExtras(extras) {
		this._extra = {
			...this._extra,
			...extras
		};
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Set a single key:value extra entry that will be sent as extra data with the event.
	*/
	setExtra(key, extra) {
		this._extra = {
			...this._extra,
			[key]: extra
		};
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Sets the fingerprint on the scope to send with the events.
	* @param {string[]} fingerprint Fingerprint to group events in Sentry.
	*/
	setFingerprint(fingerprint) {
		this._fingerprint = fingerprint;
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Sets the level on the scope for future events.
	*/
	setLevel(level) {
		this._level = level;
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Sets the transaction name on the scope so that the name of e.g. taken server route or
	* the page location is attached to future events.
	*
	* IMPORTANT: Calling this function does NOT change the name of the currently active
	* root span. If you want to change the name of the active root span, use
	* `Sentry.updateSpanName(rootSpan, 'new name')` instead.
	*
	* By default, the SDK updates the scope's transaction name automatically on sensible
	* occasions, such as a page navigation or when handling a new request on the server.
	*/
	setTransactionName(name) {
		this._transactionName = name;
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Sets context data with the given name.
	* Data passed as context will be normalized. You can also pass `null` to unset the context.
	* Note that context data will not be merged - calling `setContext` will overwrite an existing context with the same key.
	*/
	setContext(key, context) {
		if (context === null) delete this._contexts[key];
		else this._contexts[key] = context;
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Set the session for the scope.
	*/
	setSession(session) {
		if (!session) delete this._session;
		else this._session = session;
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Get the session from the scope.
	*/
	getSession() {
		return this._session;
	}
	/**
	* Updates the scope with provided data. Can work in three variations:
	* - plain object containing updatable attributes
	* - Scope instance that'll extract the attributes from
	* - callback function that'll receive the current scope as an argument and allow for modifications
	*/
	update(captureContext) {
		if (!captureContext) return this;
		const scopeToMerge = typeof captureContext === "function" ? captureContext(this) : captureContext;
		const { tags, attributes, extra, user, contexts, level, fingerprint = [], propagationContext, conversationId } = (scopeToMerge instanceof Scope ? scopeToMerge.getScopeData() : isPlainObject(scopeToMerge) ? captureContext : void 0) || {};
		this._tags = {
			...this._tags,
			...tags
		};
		this._attributes = {
			...this._attributes,
			...attributes
		};
		this._extra = {
			...this._extra,
			...extra
		};
		this._contexts = {
			...this._contexts,
			...contexts
		};
		if (user && Object.keys(user).length) this._user = user;
		if (level) this._level = level;
		if (fingerprint.length) this._fingerprint = fingerprint;
		if (propagationContext) this._propagationContext = propagationContext;
		if (conversationId) this._conversationId = conversationId;
		return this;
	}
	/**
	* Clears the current scope and resets its properties.
	* Note: The client will not be cleared.
	*
	* @deprecated This method will be removed in v11. To reset scope state, re-initialize the SDK or run
	* your code in a fresh scope via `withScope` instead.
	*/
	clear() {
		this._breadcrumbs = [];
		this._tags = {};
		this._attributes = {};
		this._extra = {};
		this._user = {};
		this._contexts = {};
		this._level = void 0;
		this._transactionName = void 0;
		this._fingerprint = void 0;
		this._session = void 0;
		this._conversationId = void 0;
		_setSpanForScope(this, void 0);
		this._attachments = [];
		this.setPropagationContext({
			traceId: generateTraceId(),
			sampleRand: safeMathRandom()
		});
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Adds a breadcrumb to the scope.
	* By default, the last 100 breadcrumbs are kept.
	*/
	addBreadcrumb(breadcrumb, maxBreadcrumbs) {
		const maxCrumbs = typeof maxBreadcrumbs === "number" ? maxBreadcrumbs : DEFAULT_MAX_BREADCRUMBS;
		if (maxCrumbs <= 0) return this;
		const mergedBreadcrumb = {
			timestamp: dateTimestampInSeconds(),
			...breadcrumb,
			message: breadcrumb.message ? truncate(breadcrumb.message, 2048) : breadcrumb.message
		};
		this._breadcrumbs.push(mergedBreadcrumb);
		if (this._breadcrumbs.length > maxCrumbs) {
			this._breadcrumbs = this._breadcrumbs.slice(-maxCrumbs);
			this._client?.recordDroppedEvent("buffer_overflow", "log_item");
		}
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Get the last breadcrumb of the scope.
	*/
	getLastBreadcrumb() {
		return this._breadcrumbs[this._breadcrumbs.length - 1];
	}
	/**
	* Clear all breadcrumbs from the scope.
	*/
	clearBreadcrumbs() {
		this._breadcrumbs = [];
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Add an attachment to the scope.
	*/
	addAttachment(attachment) {
		this._attachments.push(attachment);
		return this;
	}
	/**
	* Clear all attachments from the scope.
	*/
	clearAttachments() {
		this._attachments = [];
		return this;
	}
	/**
	* Get the data of this scope, which should be applied to an event during processing.
	*/
	getScopeData() {
		return {
			breadcrumbs: this._breadcrumbs,
			attachments: this._attachments,
			contexts: this._contexts,
			tags: this._tags,
			attributes: this._attributes,
			extra: this._extra,
			user: this._user,
			level: this._level,
			fingerprint: this._fingerprint || [],
			eventProcessors: this._eventProcessors,
			propagationContext: this._propagationContext,
			sdkProcessingMetadata: this._sdkProcessingMetadata,
			transactionName: this._transactionName,
			span: _getSpanForScope(this),
			conversationId: this._conversationId
		};
	}
	/**
	* Add data which will be accessible during event processing but won't get sent to Sentry.
	*/
	setSDKProcessingMetadata(newData) {
		this._sdkProcessingMetadata = merge(this._sdkProcessingMetadata, newData, 2);
		return this;
	}
	/**
	* Add propagation context to the scope, used for distributed tracing
	*/
	setPropagationContext(context) {
		this._propagationContext = context;
		return this;
	}
	/**
	* Get propagation context from the scope, used for distributed tracing
	*/
	getPropagationContext() {
		return this._propagationContext;
	}
	/**
	* Capture an exception for this scope.
	*
	* @returns {string} The id of the captured Sentry event.
	*/
	captureException(exception, hint) {
		const eventId = hint?.event_id || uuid4();
		if (!this._client) {
			DEBUG_BUILD$4 && debug.warn("No client configured on scope - will not capture exception!");
			return eventId;
		}
		const syntheticException = /* @__PURE__ */ new Error("Sentry syntheticException");
		this._client.captureException(exception, {
			originalException: exception,
			syntheticException,
			...hint,
			event_id: eventId
		}, this);
		return eventId;
	}
	/**
	* Capture a message for this scope.
	*
	* @returns {string} The id of the captured message.
	*/
	captureMessage(message, level, hint) {
		const eventId = hint?.event_id || uuid4();
		if (!this._client) {
			DEBUG_BUILD$4 && debug.warn("No client configured on scope - will not capture message!");
			return eventId;
		}
		const syntheticException = hint?.syntheticException ?? new Error(message);
		this._client.captureMessage(message, level, {
			originalException: message,
			syntheticException,
			...hint,
			event_id: eventId
		}, this);
		return eventId;
	}
	/**
	* Capture a Sentry event for this scope.
	*
	* @returns {string} The id of the captured event.
	*/
	captureEvent(event, hint) {
		const eventId = event.event_id || hint?.event_id || uuid4();
		if (!this._client) {
			DEBUG_BUILD$4 && debug.warn("No client configured on scope - will not capture event!");
			return eventId;
		}
		this._client.captureEvent(event, {
			...hint,
			event_id: eventId
		}, this);
		return eventId;
	}
	/**
	* This will be called on every set call.
	*/
	_notifyScopeListeners() {
		if (!this._notifyingListeners) {
			this._notifyingListeners = true;
			this._scopeListeners.forEach((callback) => {
				callback(this);
			});
			this._notifyingListeners = false;
		}
	}
};
function getDefaultCurrentScope() {
	return getGlobalSingleton("defaultCurrentScope", () => new Scope());
}
function getDefaultIsolationScope() {
	return getGlobalSingleton("defaultIsolationScope", () => new Scope());
}
var isActualPromise = (p) => p instanceof Promise && !p[kChainedCopy];
var kChainedCopy = /* @__PURE__ */ Symbol("chained PromiseLike");
var chainAndCopyPromiseLike = (original, onSuccess, onError) => {
	const chained = original.then((value) => {
		onSuccess(value);
		return value;
	}, (err) => {
		onError(err);
		throw err;
	});
	return isActualPromise(chained) && isActualPromise(original) ? chained : copyProps(original, chained);
};
var copyProps = (original, chained) => {
	if (!chained) return original;
	let mutated = false;
	for (const key in original) {
		if (key in chained) continue;
		mutated = true;
		const value = original[key];
		if (typeof value === "function") Object.defineProperty(chained, key, {
			value: (...args) => value.apply(original, args),
			enumerable: true,
			configurable: true,
			writable: true
		});
		else chained[key] = value;
	}
	if (mutated) Object.assign(chained, { [kChainedCopy]: true });
	return chained;
};
var AsyncContextStack = class {
	constructor(scope, isolationScope) {
		let assignedScope;
		if (!scope) assignedScope = new Scope();
		else assignedScope = scope;
		let assignedIsolationScope;
		if (!isolationScope) assignedIsolationScope = new Scope();
		else assignedIsolationScope = isolationScope;
		this._stack = [{ scope: assignedScope }];
		this._isolationScope = assignedIsolationScope;
	}
	/**
	* Fork a scope for the stack.
	*/
	withScope(callback) {
		const scope = this._pushScope();
		let maybePromiseResult;
		try {
			maybePromiseResult = callback(scope);
		} catch (e) {
			this._popScope();
			throw e;
		}
		if (isThenable(maybePromiseResult)) return chainAndCopyPromiseLike(maybePromiseResult, () => this._popScope(), () => this._popScope());
		this._popScope();
		return maybePromiseResult;
	}
	/**
	* Get the client of the stack.
	*/
	getClient() {
		return this.getStackTop().client;
	}
	/**
	* Returns the scope of the top stack.
	*/
	getScope() {
		return this.getStackTop().scope;
	}
	/**
	* Get the isolation scope for the stack.
	*/
	getIsolationScope() {
		return this._isolationScope;
	}
	/**
	* Returns the topmost scope layer in the order domain > local > process.
	*/
	getStackTop() {
		return this._stack[this._stack.length - 1];
	}
	/**
	* Push a scope to the stack.
	*/
	_pushScope() {
		const scope = this.getScope().clone();
		this._stack.push({
			client: this.getClient(),
			scope
		});
		return scope;
	}
	/**
	* Pop a scope from the stack.
	*/
	_popScope() {
		if (this._stack.length <= 1) return false;
		return !!this._stack.pop();
	}
};
function getAsyncContextStack() {
	const sentry = getSentryCarrier(getMainCarrier());
	return sentry.stack = sentry.stack || new AsyncContextStack(getDefaultCurrentScope(), getDefaultIsolationScope());
}
function withScope$1(callback) {
	return getAsyncContextStack().withScope(callback);
}
function withSetScope(scope, callback) {
	const stack = getAsyncContextStack();
	return stack.withScope(() => {
		stack.getStackTop().scope = scope;
		return callback(scope);
	});
}
function withIsolationScope$1(callback) {
	return getAsyncContextStack().withScope(() => {
		return callback(getAsyncContextStack().getIsolationScope());
	});
}
function getStackAsyncContextStrategy() {
	return {
		withIsolationScope: withIsolationScope$1,
		withScope: withScope$1,
		withSetScope,
		withSetIsolationScope: (_isolationScope, callback) => {
			return withIsolationScope$1(callback);
		},
		getCurrentScope: () => getAsyncContextStack().getScope(),
		getIsolationScope: () => getAsyncContextStack().getIsolationScope()
	};
}
function setAsyncContextStrategy(strategy) {
	const sentry = getSentryCarrier(getMainCarrier());
	sentry.acs = strategy;
}
function getAsyncContextStrategy(carrier) {
	const sentry = getSentryCarrier(carrier);
	if (sentry.acs) return sentry.acs;
	return getStackAsyncContextStrategy();
}
function isAttributeObject(maybeObj) {
	return typeof maybeObj === "object" && maybeObj != null && !Array.isArray(maybeObj) && Object.keys(maybeObj).includes("value");
}
function attributeValueToTypedAttributeValue(rawValue, useFallback) {
	const { value, unit } = isAttributeObject(rawValue) ? rawValue : {
		value: rawValue,
		unit: void 0
	};
	const attributeValue = getTypedAttributeValue(value);
	const checkedUnit = unit && typeof unit === "string" ? { unit } : {};
	if (attributeValue) return {
		...attributeValue,
		...checkedUnit
	};
	if (!useFallback || useFallback === "skip-undefined" && value === void 0) return;
	let stringValue = "";
	try {
		stringValue = JSON.stringify(value) ?? "";
	} catch {}
	return {
		value: stringValue,
		type: "string",
		...checkedUnit
	};
}
function serializeAttributes(attributes, fallback = false) {
	const serializedAttributes = {};
	for (const [key, value] of Object.entries(attributes ?? {})) {
		const typedValue = attributeValueToTypedAttributeValue(value, fallback);
		if (typedValue) serializedAttributes[key] = typedValue;
	}
	return serializedAttributes;
}
function estimateTypedAttributesSizeInBytes(attributes) {
	if (!attributes) return 0;
	let weight = 0;
	for (const [key, attr] of Object.entries(attributes)) {
		weight += key.length * 2;
		weight += attr.type.length * 2;
		weight += (attr.unit?.length ?? 0) * 2;
		const val = attr.value;
		if (Array.isArray(val)) weight += estimatePrimitiveSizeInBytes$1(val[0]) * val.length;
		else if (isPrimitive(val)) weight += estimatePrimitiveSizeInBytes$1(val);
		else weight += 100;
	}
	return weight;
}
function estimatePrimitiveSizeInBytes$1(value) {
	if (typeof value === "string") return value.length * 2;
	else if (typeof value === "boolean") return 4;
	else if (typeof value === "number") return 8;
	return 0;
}
function getTypedAttributeValue(value) {
	if (Array.isArray(value)) return {
		value,
		type: "array"
	};
	const primitiveType = typeof value === "string" ? "string" : typeof value === "boolean" ? "boolean" : typeof value === "number" && !Number.isNaN(value) ? Number.isInteger(value) ? "integer" : "double" : null;
	if (primitiveType) return {
		value,
		type: primitiveType
	};
}
function hasExternalPropagationContext() {
	return false;
}
function getCurrentScope() {
	return getAsyncContextStrategy(getMainCarrier()).getCurrentScope();
}
function getIsolationScope() {
	return getAsyncContextStrategy(getMainCarrier()).getIsolationScope();
}
function getGlobalScope() {
	return getGlobalSingleton("globalScope", () => new Scope());
}
function withScope(...rest) {
	const acs = getAsyncContextStrategy(getMainCarrier());
	if (rest.length === 2) {
		const [scope, callback] = rest;
		if (!scope) return acs.withScope(callback);
		return acs.withSetScope(scope, callback);
	}
	return acs.withScope(rest[0]);
}
function withIsolationScope(...rest) {
	const acs = getAsyncContextStrategy(getMainCarrier());
	if (rest.length === 2) {
		const [isolationScope, callback] = rest;
		if (!isolationScope) return acs.withIsolationScope(callback);
		return acs.withSetIsolationScope(isolationScope, callback);
	}
	return acs.withIsolationScope(rest[0]);
}
function getClient() {
	return getCurrentScope().getClient();
}
function getTraceContextFromScope(scope) {
	const { traceId, parentSpanId, propagationSpanId } = scope.getPropagationContext();
	const traceContext = {
		trace_id: traceId,
		span_id: propagationSpanId || generateSpanId()
	};
	if (parentSpanId) traceContext.parent_span_id = parentSpanId;
	return traceContext;
}
var SEMANTIC_ATTRIBUTE_SENTRY_SOURCE = "sentry.source";
var SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE = "sentry.sample_rate";
var SEMANTIC_ATTRIBUTE_SENTRY_OP = "sentry.op";
var SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN = "sentry.origin";
var SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT = "sentry.measurement_unit";
var SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE = "sentry.measurement_value";
var SEMANTIC_ATTRIBUTE_SENTRY_RELEASE = "sentry.release";
var SEMANTIC_ATTRIBUTE_SENTRY_ENVIRONMENT = "sentry.environment";
var SEMANTIC_ATTRIBUTE_SENTRY_SDK_INTEGRATIONS = "sentry.sdk.integrations";
var SEMANTIC_ATTRIBUTE_USER_ID = "user.id";
var SEMANTIC_ATTRIBUTE_USER_EMAIL = "user.email";
var SEMANTIC_ATTRIBUTE_USER_IP_ADDRESS = "user.ip_address";
var SEMANTIC_ATTRIBUTE_USER_USERNAME = "user.name";
var SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME = "sentry.custom_span_name";
var SEMANTIC_ATTRIBUTE_PROFILE_ID = "sentry.profile_id";
var SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME = "sentry.exclusive_time";
var SEMANTIC_ATTRIBUTE_CACHE_HIT = "cache.hit";
var SEMANTIC_ATTRIBUTE_CACHE_KEY = "cache.key";
var SEMANTIC_ATTRIBUTE_CACHE_ITEM_SIZE = "cache.item_size";
var SEMANTIC_ATTRIBUTE_HTTP_REQUEST_METHOD = "http.request.method";
var GEN_AI_CONVERSATION_ID_ATTRIBUTE$1 = "gen_ai.conversation.id";
function getSpanStatusFromHttpCode(httpStatus) {
	if (httpStatus < 400 && httpStatus >= 100) return { code: 1 };
	if (httpStatus >= 400 && httpStatus < 500) switch (httpStatus) {
		case 401: return {
			code: 2,
			message: "unauthenticated"
		};
		case 403: return {
			code: 2,
			message: "permission_denied"
		};
		case 404: return {
			code: 2,
			message: "not_found"
		};
		case 409: return {
			code: 2,
			message: "already_exists"
		};
		case 413: return {
			code: 2,
			message: "failed_precondition"
		};
		case 429: return {
			code: 2,
			message: "resource_exhausted"
		};
		case 499: return {
			code: 2,
			message: "cancelled"
		};
		default: return {
			code: 2,
			message: "invalid_argument"
		};
	}
	if (httpStatus >= 500 && httpStatus < 600) switch (httpStatus) {
		case 501: return {
			code: 2,
			message: "unimplemented"
		};
		case 503: return {
			code: 2,
			message: "unavailable"
		};
		case 504: return {
			code: 2,
			message: "deadline_exceeded"
		};
		default: return {
			code: 2,
			message: "internal_error"
		};
	}
	return {
		code: 2,
		message: "internal_error"
	};
}
var SCOPE_ON_START_SPAN_FIELD = "_sentryScope";
var ISOLATION_SCOPE_ON_START_SPAN_FIELD = "_sentryIsolationScope";
var OTEL_SOURCE_INFERENCE_SPAN_FIELD = /* @__PURE__ */ Symbol.for("sentry.otelSourceInference");
var OTEL_SOURCE_EXPLICITLY_SET_SPAN_FIELD = /* @__PURE__ */ Symbol.for("sentry.otelSourceExplicitlySet");
var TRACER_PROVIDER_SPAN_FIELD = /* @__PURE__ */ Symbol.for("sentry.tracerProviderSpan");
function setCapturedScopesOnSpan(span, scope, isolationScope) {
	if (span) {
		addNonEnumerableProperty(span, ISOLATION_SCOPE_ON_START_SPAN_FIELD, makeWeakRef(isolationScope));
		addNonEnumerableProperty(span, SCOPE_ON_START_SPAN_FIELD, scope);
	}
}
function getCapturedScopesOnSpan(span) {
	const spanWithScopes = span;
	return {
		scope: spanWithScopes[SCOPE_ON_START_SPAN_FIELD],
		isolationScope: derefWeakRef(spanWithScopes[ISOLATION_SCOPE_ON_START_SPAN_FIELD])
	};
}
function markSpanForOtelSourceInference(span) {
	addNonEnumerableProperty(span, OTEL_SOURCE_INFERENCE_SPAN_FIELD, true);
}
function spanShouldInferOtelSource(span) {
	return span[OTEL_SOURCE_INFERENCE_SPAN_FIELD] === true;
}
function markSpanSourceAsExplicit(span) {
	addNonEnumerableProperty(span, OTEL_SOURCE_EXPLICITLY_SET_SPAN_FIELD, true);
}
function spanSourceWasExplicitlySet(span) {
	return span[OTEL_SOURCE_EXPLICITLY_SET_SPAN_FIELD] === true;
}
function markSpanAsTracerProviderSpan(span) {
	addNonEnumerableProperty(span, TRACER_PROVIDER_SPAN_FIELD, true);
}
function spanIsTracerProviderSpan(span) {
	return span[TRACER_PROVIDER_SPAN_FIELD] === true;
}
var SENTRY_BAGGAGE_KEY_PREFIX = "sentry-";
function baggageHeaderToDynamicSamplingContext(baggageHeader) {
	const baggageObject = parseBaggageHeader(baggageHeader);
	if (!baggageObject) return;
	const dynamicSamplingContext = Object.entries(baggageObject).reduce((acc, [key, value]) => {
		if (key.startsWith("sentry-")) {
			const nonPrefixedKey = key.slice(7);
			acc[nonPrefixedKey] = value;
		}
		return acc;
	}, {});
	if (Object.keys(dynamicSamplingContext).length > 0) return dynamicSamplingContext;
	else return;
}
function dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext) {
	if (!dynamicSamplingContext) return;
	return objectToBaggageHeader(Object.entries(dynamicSamplingContext).reduce((acc, [dscKey, dscValue]) => {
		if (dscValue) acc[`${SENTRY_BAGGAGE_KEY_PREFIX}${dscKey}`] = dscValue;
		return acc;
	}, {}));
}
function parseBaggageHeader(baggageHeader) {
	if (!baggageHeader || !isString(baggageHeader) && !Array.isArray(baggageHeader)) return;
	if (Array.isArray(baggageHeader)) return baggageHeader.reduce((acc, curr) => {
		const currBaggageObject = baggageHeaderToObject(curr);
		Object.entries(currBaggageObject).forEach(([key, value]) => {
			acc[key] = value;
		});
		return acc;
	}, {});
	return baggageHeaderToObject(baggageHeader);
}
function baggageHeaderToObject(baggageHeader) {
	return baggageHeader.split(",").map((baggageEntry) => {
		const eqIdx = baggageEntry.indexOf("=");
		if (eqIdx === -1) return [];
		return [baggageEntry.slice(0, eqIdx), baggageEntry.slice(eqIdx + 1)].map((keyOrValue) => {
			try {
				return decodeURIComponent(keyOrValue.trim());
			} catch {
				return;
			}
		});
	}).reduce((acc, [key, value]) => {
		if (key && value) acc[key] = value;
		return acc;
	}, {});
}
function objectToBaggageHeader(object) {
	if (Object.keys(object).length === 0) return;
	return Object.entries(object).reduce((baggageHeader, [objectKey, objectValue], currentIndex) => {
		const baggageEntry = `${encodeURIComponent(objectKey)}=${encodeURIComponent(objectValue)}`;
		const newBaggageHeader = currentIndex === 0 ? baggageEntry : `${baggageHeader},${baggageEntry}`;
		if (newBaggageHeader.length > 8192) {
			DEBUG_BUILD$4 && debug.warn(`Not adding key: ${objectKey} with val: ${objectValue} to baggage header due to exceeding baggage size limits.`);
			return baggageHeader;
		} else return newBaggageHeader;
	}, "");
}
function mergeBaggageHeaders(existing, incoming) {
	if (!existing) return incoming;
	const existingEntries = parseBaggageHeader(existing);
	const incomingEntries = parseBaggageHeader(incoming);
	if (!incomingEntries) return existing;
	const merged = {};
	let hasNewSentryEntries = false;
	const newSentryEntries = {};
	const newNonSentryEntries = {};
	for (const [key, value] of Object.entries(incomingEntries)) if (key.startsWith("sentry-")) {
		newSentryEntries[key] = value;
		hasNewSentryEntries = true;
	} else newNonSentryEntries[key] = value;
	if (existingEntries) {
		for (const [key, value] of Object.entries(existingEntries)) if (!hasNewSentryEntries || !key.startsWith("sentry-")) merged[key] = value;
	}
	if (hasNewSentryEntries) Object.assign(merged, newSentryEntries);
	for (const [key, value] of Object.entries(newNonSentryEntries)) merged[key] ?? (merged[key] = value);
	return objectToBaggageHeader(merged);
}
var ORG_ID_REGEX = /^o(\d+)\./;
var DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;
function isValidProtocol(protocol) {
	return protocol === "http" || protocol === "https";
}
function dsnToString(dsn, withPassword = false) {
	const { host, path, pass, port, projectId, protocol, publicKey } = dsn;
	return `${protocol}://${publicKey}${withPassword && pass ? `:${pass}` : ""}@${host}${port ? `:${port}` : ""}/${path ? `${path}/` : path}${projectId}`;
}
function dsnFromString(str) {
	const match = DSN_REGEX.exec(str);
	if (!match) {
		consoleSandbox(() => {
			console.error(`Invalid Sentry Dsn: ${str}`);
		});
		return;
	}
	const [protocol, publicKey, pass = "", host = "", port = "", lastPath = ""] = match.slice(1);
	let path = "";
	let projectId = lastPath;
	const split = projectId.split("/");
	if (split.length > 1) {
		path = split.slice(0, -1).join("/");
		projectId = split.pop();
	}
	if (projectId) {
		const projectMatch = projectId.match(/^\d+/);
		if (projectMatch) projectId = projectMatch[0];
	}
	return dsnFromComponents({
		host,
		pass,
		path,
		projectId,
		port,
		protocol,
		publicKey
	});
}
function dsnFromComponents(components) {
	return {
		protocol: components.protocol,
		publicKey: components.publicKey || "",
		pass: components.pass || "",
		host: components.host,
		port: components.port || "",
		path: components.path || "",
		projectId: components.projectId
	};
}
function validateDsn(dsn) {
	if (!DEBUG_BUILD$4) return true;
	const { port, projectId, protocol } = dsn;
	if ([
		"protocol",
		"publicKey",
		"host",
		"projectId"
	].find((component) => {
		if (!dsn[component]) {
			debug.error(`Invalid Sentry Dsn: ${component} missing`);
			return true;
		}
		return false;
	})) return false;
	if (!projectId.match(/^\d+$/)) {
		debug.error(`Invalid Sentry Dsn: Invalid projectId ${projectId}`);
		return false;
	}
	if (!isValidProtocol(protocol)) {
		debug.error(`Invalid Sentry Dsn: Invalid protocol ${protocol}`);
		return false;
	}
	if (port && isNaN(parseInt(port, 10))) {
		debug.error(`Invalid Sentry Dsn: Invalid port ${port}`);
		return false;
	}
	return true;
}
function extractOrgIdFromDsnHost(host) {
	return host.match(ORG_ID_REGEX)?.[1];
}
function extractOrgIdFromClient(client) {
	const options = client.getOptions();
	const { host } = client.getDsn() || {};
	let org_id;
	if (options.orgId) org_id = String(options.orgId);
	else if (host) org_id = extractOrgIdFromDsnHost(host);
	return org_id;
}
function makeDsn(from) {
	const components = typeof from === "string" ? dsnFromString(from) : dsnFromComponents(from);
	if (!components || !validateDsn(components)) return;
	return components;
}
function parseSampleRate(sampleRate) {
	if (typeof sampleRate === "boolean") return Number(sampleRate);
	const rate = typeof sampleRate === "string" ? parseFloat(sampleRate) : sampleRate;
	if (typeof rate !== "number" || isNaN(rate) || rate < 0 || rate > 1) return;
	return rate;
}
var TRACEPARENT_REGEXP = /* @__PURE__ */ new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");
function extractTraceparentData(traceparent) {
	if (!traceparent) return;
	const matches = traceparent.match(TRACEPARENT_REGEXP);
	if (!matches) return;
	let parentSampled;
	if (matches[3] === "1") parentSampled = true;
	else if (matches[3] === "0") parentSampled = false;
	return {
		traceId: matches[1],
		parentSampled,
		parentSpanId: matches[2]
	};
}
function isContinuingTrace(propagationContext) {
	return !!propagationContext.parentSpanId || !!propagationContext.dsc;
}
function propagationContextFromHeaders(sentryTrace, baggage) {
	const traceparentData = extractTraceparentData(sentryTrace);
	const dynamicSamplingContext = baggageHeaderToDynamicSamplingContext(baggage);
	if (!traceparentData?.traceId) return {
		traceId: generateTraceId(),
		sampleRand: safeMathRandom()
	};
	const sampleRand = getSampleRandFromTraceparentAndDsc(traceparentData, dynamicSamplingContext);
	if (dynamicSamplingContext) dynamicSamplingContext.sample_rand = sampleRand.toString();
	const { traceId, parentSpanId, parentSampled } = traceparentData;
	return {
		traceId,
		parentSpanId,
		sampled: parentSampled,
		dsc: dynamicSamplingContext || {},
		sampleRand
	};
}
function generateSentryTraceHeader(traceId = generateTraceId(), spanId = generateSpanId(), sampled) {
	let sampledString = "";
	if (sampled !== void 0) sampledString = sampled ? "-1" : "-0";
	return `${traceId}-${spanId}${sampledString}`;
}
function generateTraceparentHeader(traceId = generateTraceId(), spanId = generateSpanId(), sampled) {
	return `00-${traceId}-${spanId}-${sampled ? "01" : "00"}`;
}
function getSampleRandFromTraceparentAndDsc(traceparentData, dsc) {
	const parsedSampleRand = parseSampleRate(dsc?.sample_rand);
	if (parsedSampleRand !== void 0) return parsedSampleRand;
	const parsedSampleRate = parseSampleRate(dsc?.sample_rate);
	if (parsedSampleRate && traceparentData?.parentSampled !== void 0) return traceparentData.parentSampled ? safeMathRandom() * parsedSampleRate : parsedSampleRate + safeMathRandom() * (1 - parsedSampleRate);
	else return safeMathRandom();
}
function shouldContinueTrace(client, baggageOrgId) {
	const clientOrgId = extractOrgIdFromClient(client);
	if (baggageOrgId && clientOrgId && baggageOrgId !== clientOrgId) {
		debug.log(`Won't continue trace because org IDs don't match (incoming baggage: ${baggageOrgId}, SDK options: ${clientOrgId})`);
		return false;
	}
	if (client.getOptions().strictTraceContinuation || false) {
		if (baggageOrgId && !clientOrgId || !baggageOrgId && clientOrgId) {
			debug.log(`Starting a new trace because strict trace continuation is enabled but one org ID is missing (incoming baggage: ${baggageOrgId}, Sentry client: ${clientOrgId})`);
			return false;
		}
	}
	return true;
}
var hasShownSpanDropWarning = false;
function spanToTransactionTraceContext(span) {
	const { spanId: span_id, traceId: trace_id } = span.spanContext();
	const { data, op, parent_span_id, status, origin, links } = spanToJSON(span);
	return {
		parent_span_id,
		span_id,
		trace_id,
		data,
		op,
		status,
		origin,
		links
	};
}
function spanToTraceContext(span) {
	const { spanId, traceId: trace_id, isRemote } = span.spanContext();
	const parent_span_id = isRemote ? spanId : spanToJSON(span).parent_span_id;
	const scope = getCapturedScopesOnSpan(span).scope;
	return {
		parent_span_id,
		span_id: isRemote ? scope?.getPropagationContext().propagationSpanId || generateSpanId() : spanId,
		trace_id
	};
}
function spanToTraceHeader(span) {
	const { traceId, spanId } = span.spanContext();
	return generateSentryTraceHeader(traceId, spanId, spanIsSampled(span));
}
function spanToTraceparentHeader(span) {
	const { traceId, spanId } = span.spanContext();
	return generateTraceparentHeader(traceId, spanId, spanIsSampled(span));
}
function convertSpanLinksForEnvelope(links) {
	if (links && links.length > 0) return links.map(({ context: { spanId, traceId, traceFlags, ...restContext }, attributes }) => ({
		span_id: spanId,
		trace_id: traceId,
		sampled: traceFlags === 1,
		attributes,
		...restContext
	}));
	else return;
}
function getStreamedSpanLinks(links) {
	if (links?.length) return links.map(({ context: { spanId, traceId, traceFlags }, attributes }) => ({
		span_id: spanId,
		trace_id: traceId,
		sampled: traceFlags === 1,
		attributes
	}));
	else return;
}
function spanTimeInputToSeconds(input) {
	if (typeof input === "number") return ensureTimestampInSeconds(input);
	if (Array.isArray(input)) return input[0] + input[1] / 1e9;
	if (input instanceof Date) return ensureTimestampInSeconds(input.getTime());
	return timestampInSeconds();
}
function ensureTimestampInSeconds(timestamp) {
	return timestamp > 9999999999 ? timestamp / 1e3 : timestamp;
}
function spanToJSON(span) {
	if (spanIsSentrySpan(span)) return span.getSpanJSON();
	const { spanId: span_id, traceId: trace_id } = span.spanContext();
	if (spanIsOpenTelemetrySdkTraceBaseSpan(span)) {
		const { attributes, startTime, name, endTime, status, links } = span;
		return {
			span_id,
			trace_id,
			data: attributes,
			description: name,
			parent_span_id: getOtelParentSpanId(span),
			start_timestamp: spanTimeInputToSeconds(startTime),
			timestamp: spanTimeInputToSeconds(endTime) || void 0,
			status: getStatusMessage(status),
			op: attributes[SEMANTIC_ATTRIBUTE_SENTRY_OP],
			origin: attributes[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN],
			links: convertSpanLinksForEnvelope(links)
		};
	}
	return {
		span_id,
		trace_id,
		start_timestamp: 0,
		data: {}
	};
}
function spanToStreamedSpanJSON(span) {
	if (spanIsSentrySpan(span)) return span.getStreamedSpanJSON();
	const { spanId: span_id, traceId: trace_id } = span.spanContext();
	if (spanIsOpenTelemetrySdkTraceBaseSpan(span)) {
		const { attributes, startTime, name, endTime, status, links } = span;
		return {
			name,
			span_id,
			trace_id,
			parent_span_id: getOtelParentSpanId(span),
			start_timestamp: spanTimeInputToSeconds(startTime),
			end_timestamp: spanTimeInputToSeconds(endTime),
			is_segment: span === INTERNAL_getSegmentSpan(span),
			status: getSimpleStatus(status),
			attributes: addStatusMessageAttribute(attributes, status),
			links: getStreamedSpanLinks(links)
		};
	}
	return {
		span_id,
		trace_id,
		start_timestamp: 0,
		name: "",
		end_timestamp: 0,
		status: "ok",
		is_segment: span === INTERNAL_getSegmentSpan(span)
	};
}
function getOtelParentSpanId(span) {
	return "parentSpanId" in span ? span.parentSpanId : "parentSpanContext" in span ? span.parentSpanContext?.spanId : void 0;
}
function streamedSpanJsonToSerializedSpan(spanJson) {
	return {
		...spanJson,
		attributes: serializeAttributes(spanJson.attributes),
		links: spanJson.links?.map((link) => ({
			...link,
			attributes: serializeAttributes(link.attributes)
		}))
	};
}
function spanIsOpenTelemetrySdkTraceBaseSpan(span) {
	const castSpan = span;
	return !!castSpan.attributes && !!castSpan.startTime && !!castSpan.name && !!castSpan.endTime && !!castSpan.status;
}
function spanIsSentrySpan(span) {
	return typeof span.getSpanJSON === "function";
}
function spanIsSampled(span) {
	const { traceFlags } = span.spanContext();
	return traceFlags === 1;
}
function getStatusMessage(status) {
	if (!status || status.code === 0) return;
	if (status.code === 1) return "ok";
	return status.message || "internal_error";
}
function getSimpleStatus(status) {
	return !status || status.code === 1 || status.code === 0 || status.message === "cancelled" ? "ok" : "error";
}
function addStatusMessageAttribute(attributes, status) {
	const statusMessage = getSimpleStatus(status) === "error" ? status?.message : void 0;
	return {
		...statusMessage && { ["sentry.status.message"]: statusMessage },
		...attributes
	};
}
var CHILD_SPANS_FIELD = "_sentryChildSpans";
var ROOT_SPAN_FIELD = "_sentryRootSpan";
function addChildSpanToSpan(span, childSpan) {
	const rootSpan = span[ROOT_SPAN_FIELD] || span;
	addNonEnumerableProperty(childSpan, ROOT_SPAN_FIELD, rootSpan);
	if (!spanIsSampled(span)) return;
	if (!span.isRecording() && !rootSpan.isRecording()) return;
	if (span[CHILD_SPANS_FIELD]) span[CHILD_SPANS_FIELD].add(childSpan);
	else addNonEnumerableProperty(span, CHILD_SPANS_FIELD, /* @__PURE__ */ new Set([childSpan]));
}
function getSpanDescendants(span) {
	const resultSet = /* @__PURE__ */ new Set();
	function addSpanChildren(span2) {
		if (resultSet.has(span2)) return;
		else if (spanIsSampled(span2)) {
			resultSet.add(span2);
			const childSpans = span2[CHILD_SPANS_FIELD] ? Array.from(span2[CHILD_SPANS_FIELD]) : [];
			for (const childSpan of childSpans) addSpanChildren(childSpan);
		}
	}
	addSpanChildren(span);
	return Array.from(resultSet);
}
var getRootSpan$1 = INTERNAL_getSegmentSpan;
function INTERNAL_getSegmentSpan(span) {
	return span[ROOT_SPAN_FIELD] || span;
}
function getActiveSpan$1() {
	const acs = getAsyncContextStrategy(getMainCarrier());
	if (acs.getActiveSpan) return acs.getActiveSpan();
	return _getSpanForScope(getCurrentScope());
}
function showSpanDropWarning() {
	if (!hasShownSpanDropWarning) {
		consoleSandbox(() => {
			console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.");
		});
		hasShownSpanDropWarning = true;
	}
}
function updateSpanName(span, name) {
	span.updateName(name);
	span.setAttributes({
		[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "custom",
		[SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME]: name
	});
}
function hasSpansEnabled(maybeOptions) {
	if (typeof __SENTRY_TRACING__ === "boolean" && !__SENTRY_TRACING__) return false;
	const options = maybeOptions || getClient()?.getOptions();
	return !!options && (options.tracesSampleRate != null || !!options.tracesSampler);
}
function logIgnoredSpan(droppedSpan) {
	debug.log(`Ignoring span ${droppedSpan.op} - ${droppedSpan.description} because it matches \`ignoreSpans\`.`);
}
function shouldIgnoreSpan$1(span, ignoreSpans) {
	if (!ignoreSpans?.length) return false;
	for (const pattern of ignoreSpans) {
		if (isStringOrRegExp(pattern)) {
			if (span.description && isMatchingPattern(span.description, pattern)) {
				DEBUG_BUILD$4 && logIgnoredSpan(span);
				return true;
			}
			continue;
		}
		const hasAttributes = !!pattern.attributes && Object.keys(pattern.attributes).length > 0;
		if (!pattern.name && !pattern.op && !hasAttributes) continue;
		const nameMatches = pattern.name ? span.description && isMatchingPattern(span.description, pattern.name) : true;
		const opMatches = pattern.op ? span.op && isMatchingPattern(span.op, pattern.op) : true;
		const attrsMatch = pattern.attributes ? Object.entries(pattern.attributes).every(([key, valuePattern]) => _matchesAttributeValue(span.attributes?.[key], valuePattern)) : true;
		if (nameMatches && opMatches && attrsMatch) {
			DEBUG_BUILD$4 && logIgnoredSpan(span);
			return true;
		}
	}
	return false;
}
function _matchesAttributeValue(actual, pat) {
	if (typeof actual === "string" && (typeof pat === "string" || pat instanceof RegExp)) return isMatchingPattern(actual, pat);
	if (Array.isArray(actual) && Array.isArray(pat)) return actual.length === pat.length && actual.every((v, i) => v === pat[i]);
	return actual === pat;
}
function reparentChildSpans(spans, dropSpan) {
	const droppedSpanParentId = dropSpan.parent_span_id;
	const droppedSpanId = dropSpan.span_id;
	if (!droppedSpanParentId) return;
	for (const span of spans) if (span.parent_span_id === droppedSpanId) span.parent_span_id = droppedSpanParentId;
}
function isStringOrRegExp(value) {
	return typeof value === "string" || value instanceof RegExp;
}
var NON_RECORDING_SPAN_FIELD = /* @__PURE__ */ Symbol.for("sentry.nonRecordingSpan");
var SentryNonRecordingSpan = class {
	constructor(spanContext = {}) {
		this._traceId = spanContext.traceId || generateTraceId();
		this._spanId = spanContext.spanId || generateSpanId();
		this.dropReason = spanContext.dropReason;
		addNonEnumerableProperty(this, NON_RECORDING_SPAN_FIELD, true);
	}
	/** @inheritdoc */
	spanContext() {
		return {
			spanId: this._spanId,
			traceId: this._traceId,
			traceFlags: 0
		};
	}
	/** @inheritdoc */
	end(_timestamp) {}
	/** @inheritdoc */
	setAttribute(_key, _value) {
		return this;
	}
	/** @inheritdoc */
	setAttributes(_values) {
		return this;
	}
	/** @inheritdoc */
	setStatus(_status) {
		return this;
	}
	/** @inheritdoc */
	updateName(_name) {
		return this;
	}
	/** @inheritdoc */
	isRecording() {
		return false;
	}
	/** @inheritdoc */
	addEvent(_name, _attributesOrStartTime, _startTime) {
		return this;
	}
	/** @inheritDoc */
	addLink(_link) {
		return this;
	}
	/** @inheritDoc */
	addLinks(_links) {
		return this;
	}
	/**
	* This should generally not be used,
	* but we need it for being compliant with the OTEL Span interface.
	*
	* @hidden
	* @internal
	*/
	recordException(_exception, _time) {}
};
function spanIsNonRecordingSpan(span) {
	return !!span && span[NON_RECORDING_SPAN_FIELD] === true;
}
var DEFAULT_ENVIRONMENT = "production";
var FROZEN_DSC_FIELD = "_frozenDsc";
function freezeDscOnSpan(span, dsc) {
	addNonEnumerableProperty(span, FROZEN_DSC_FIELD, dsc);
}
function getDynamicSamplingContextFromClient(trace_id, client) {
	const options = client.getOptions();
	const { publicKey: public_key } = client.getDsn() || {};
	const dsc = {
		environment: options.environment || "production",
		release: options.release,
		public_key,
		trace_id,
		org_id: extractOrgIdFromClient(client)
	};
	client.emit("createDsc", dsc);
	return dsc;
}
function getDynamicSamplingContextFromScope(client, scope) {
	const propagationContext = scope.getPropagationContext();
	return propagationContext.dsc || getDynamicSamplingContextFromClient(propagationContext.traceId, client);
}
function getDynamicSamplingContextFromSpan(span) {
	const client = getClient();
	if (!client) return {};
	const rootSpan = getRootSpan$1(span);
	const rootSpanJson = spanToJSON(rootSpan);
	const rootSpanAttributes = rootSpanJson.data;
	const traceState = rootSpan.spanContext().traceState;
	const rootSpanSampleRate = traceState?.get("sentry.sample_rate") ?? rootSpanAttributes["sentry.sample_rate"] ?? rootSpanAttributes["sentry.previous_trace_sample_rate"];
	function applyLocalSampleRateToDsc(dsc2) {
		if (typeof rootSpanSampleRate === "number" || typeof rootSpanSampleRate === "string") dsc2.sample_rate = `${rootSpanSampleRate}`;
		return dsc2;
	}
	const frozenDsc = rootSpan[FROZEN_DSC_FIELD];
	if (frozenDsc) return applyLocalSampleRateToDsc(frozenDsc);
	const isNonRecordingRoot = spanIsNonRecordingSpan(rootSpan);
	const isIgnoredRoot = isNonRecordingRoot && rootSpan.dropReason === "ignored";
	if (isNonRecordingRoot && (!hasSpansEnabled(client.getOptions()) || isIgnoredRoot)) {
		const capturedScope = getCapturedScopesOnSpan(rootSpan).scope;
		if (capturedScope) {
			const dsc2 = { ...getDynamicSamplingContextFromScope(client, capturedScope) };
			if (isIgnoredRoot) dsc2.sampled = "false";
			return applyLocalSampleRateToDsc(dsc2);
		}
	}
	const traceStateDsc = traceState?.get("sentry.dsc");
	const dscOnTraceState = traceStateDsc && baggageHeaderToDynamicSamplingContext(traceStateDsc);
	if (dscOnTraceState) return applyLocalSampleRateToDsc(dscOnTraceState);
	const dsc = getDynamicSamplingContextFromClient(span.spanContext().traceId, client);
	const source = rootSpanAttributes["sentry.source"] ?? rootSpanAttributes["sentry.segment.name.source"];
	const name = rootSpanJson.description;
	if (source !== "url" && name) dsc.transaction = name;
	if (hasSpansEnabled()) {
		dsc.sampled = String(spanIsSampled(rootSpan));
		dsc.sample_rand = traceState?.get("sentry.sample_rand") ?? getCapturedScopesOnSpan(rootSpan).scope?.getPropagationContext().sampleRand.toString();
	}
	applyLocalSampleRateToDsc(dsc);
	client.emit("createDsc", dsc, rootSpan);
	return dsc;
}
function isStreamedBeforeSendSpanCallback(callback) {
	return !!callback && typeof callback === "function" && "_streamed" in callback && !!callback._streamed;
}
function createEnvelope(headers, items = []) {
	return [headers, items];
}
function addItemToEnvelope(envelope, newItem) {
	const [headers, items] = envelope;
	return [headers, [...items, newItem]];
}
function forEachEnvelopeItem(envelope, callback) {
	const envelopeItems = envelope[1];
	for (const envelopeItem of envelopeItems) {
		const envelopeItemType = envelopeItem[0].type;
		if (callback(envelopeItem, envelopeItemType)) return true;
	}
	return false;
}
function envelopeContainsItemType(envelope, types) {
	return forEachEnvelopeItem(envelope, (_, type) => types.includes(type));
}
function encodeUTF8(input) {
	const carrier = getSentryCarrier(GLOBAL_OBJ);
	return carrier.encodePolyfill ? carrier.encodePolyfill(input) : new TextEncoder().encode(input);
}
function serializeEnvelope(envelope) {
	const [envHeaders, items] = envelope;
	let parts = JSON.stringify(envHeaders);
	function append(next) {
		if (typeof parts === "string") parts = typeof next === "string" ? parts + next : [encodeUTF8(parts), next];
		else parts.push(typeof next === "string" ? encodeUTF8(next) : next);
	}
	for (const item of items) {
		const [itemHeaders, payload] = item;
		append(`
${JSON.stringify(itemHeaders)}
`);
		if (typeof payload === "string" || payload instanceof Uint8Array) append(payload);
		else {
			let stringifiedPayload;
			try {
				stringifiedPayload = JSON.stringify(payload);
			} catch {
				stringifiedPayload = JSON.stringify(normalize$1(payload));
			}
			append(stringifiedPayload);
		}
	}
	return typeof parts === "string" ? parts : concatBuffers(parts);
}
function concatBuffers(buffers) {
	const totalLength = buffers.reduce((acc, buf) => acc + buf.length, 0);
	const merged = new Uint8Array(totalLength);
	let offset = 0;
	for (const buffer of buffers) {
		merged.set(buffer, offset);
		offset += buffer.length;
	}
	return merged;
}
function createSpanEnvelopeItem(spanJson) {
	return [{ type: "span" }, spanJson];
}
function createAttachmentEnvelopeItem(attachment) {
	const buffer = typeof attachment.data === "string" ? encodeUTF8(attachment.data) : attachment.data;
	return [{
		type: "attachment",
		length: buffer.length,
		filename: attachment.filename,
		content_type: attachment.contentType,
		attachment_type: attachment.attachmentType
	}, buffer];
}
var DATA_CATEGORY_OVERRIDES = {
	sessions: "session",
	event: "error",
	client_report: "internal",
	user_report: "default",
	profile_chunk: "profile",
	replay_event: "replay",
	replay_recording: "replay",
	check_in: "monitor",
	raw_security: "security",
	log: "log_item",
	trace_metric: "metric"
};
function _isOverriddenType(type) {
	return type in DATA_CATEGORY_OVERRIDES;
}
function envelopeItemTypeToDataCategory(type) {
	return _isOverriddenType(type) ? DATA_CATEGORY_OVERRIDES[type] : type;
}
function getSdkMetadataForEnvelopeHeader(metadataOrEvent) {
	if (!metadataOrEvent?.sdk) return;
	const { name, version } = metadataOrEvent.sdk;
	return {
		name,
		version
	};
}
function createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn) {
	const dynamicSamplingContext = event.sdkProcessingMetadata?.dynamicSamplingContext;
	return {
		event_id: event.event_id,
		sent_at: new Date(safeDateNow()).toISOString(),
		...sdkInfo && { sdk: sdkInfo },
		...!!tunnel && dsn && { dsn: dsnToString(dsn) },
		...dynamicSamplingContext && { trace: dynamicSamplingContext }
	};
}
function _enhanceEventWithSdkInfo(event, newSdkInfo) {
	if (!newSdkInfo) return event;
	const eventSdkInfo = event.sdk || {};
	event.sdk = {
		...eventSdkInfo,
		name: eventSdkInfo.name || newSdkInfo.name,
		version: eventSdkInfo.version || newSdkInfo.version,
		integrations: [...event.sdk?.integrations || [], ...newSdkInfo.integrations || []],
		packages: [...event.sdk?.packages || [], ...newSdkInfo.packages || []],
		settings: event.sdk?.settings || newSdkInfo.settings ? {
			...event.sdk?.settings,
			...newSdkInfo.settings
		} : void 0
	};
	return event;
}
function createSessionEnvelope(session, dsn, metadata, tunnel) {
	const sdkInfo = getSdkMetadataForEnvelopeHeader(metadata);
	return createEnvelope({
		sent_at: new Date(safeDateNow()).toISOString(),
		...sdkInfo && { sdk: sdkInfo },
		...!!tunnel && dsn && { dsn: dsnToString(dsn) }
	}, ["aggregates" in session ? [{ type: "sessions" }, session] : [{ type: "session" }, session.toJSON()]]);
}
function createEventEnvelope(event, dsn, metadata, tunnel) {
	const sdkInfo = getSdkMetadataForEnvelopeHeader(metadata);
	const eventType = event.type && event.type !== "replay_event" ? event.type : "event";
	_enhanceEventWithSdkInfo(event, metadata?.sdk);
	const envelopeHeaders = createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn);
	delete event.sdkProcessingMetadata;
	return createEnvelope(envelopeHeaders, [[{ type: eventType }, event]]);
}
function createSpanEnvelope(spans, client) {
	function dscHasRequiredProps(dsc2) {
		return !!dsc2.trace_id && !!dsc2.public_key;
	}
	const dsc = getDynamicSamplingContextFromSpan(spans[0]);
	const dsn = client?.getDsn();
	const tunnel = client?.getOptions().tunnel;
	const headers = {
		sent_at: new Date(safeDateNow()).toISOString(),
		...dscHasRequiredProps(dsc) && { trace: dsc },
		...!!tunnel && dsn && { dsn: dsnToString(dsn) }
	};
	const { beforeSendSpan, ignoreSpans } = client?.getOptions() || {};
	const filteredSpans = ignoreSpans?.length ? spans.filter((span) => {
		const json = spanToJSON(span);
		return !shouldIgnoreSpan$1({
			description: json.description,
			op: json.op,
			attributes: json.data
		}, ignoreSpans);
	}) : spans;
	const droppedSpans = spans.length - filteredSpans.length;
	if (droppedSpans) client?.recordDroppedEvent("before_send", "span", droppedSpans);
	const convertToSpanJSON = beforeSendSpan ? (span) => {
		const spanJson = spanToJSON(span);
		const processedSpan = !isStreamedBeforeSendSpanCallback(beforeSendSpan) ? beforeSendSpan(spanJson) : spanJson;
		if (!processedSpan) {
			showSpanDropWarning();
			return spanJson;
		}
		return processedSpan;
	} : spanToJSON;
	const items = [];
	for (const span of filteredSpans) {
		const spanJson = convertToSpanJSON(span);
		if (spanJson) items.push(createSpanEnvelopeItem(spanJson));
	}
	return createEnvelope(headers, items);
}
function logSpanStart(span) {
	if (!DEBUG_BUILD$4) return;
	const { description = "< unknown name >", op = "< unknown op >", parent_span_id: parentSpanId } = spanToJSON(span);
	const { spanId } = span.spanContext();
	const sampled = spanIsSampled(span);
	const rootSpan = getRootSpan$1(span);
	const isRootSpan = rootSpan === span;
	const header = `[Tracing] Starting ${sampled ? "sampled" : "unsampled"} ${isRootSpan ? "root " : ""}span`;
	const infoParts = [
		`op: ${op}`,
		`name: ${description}`,
		`ID: ${spanId}`
	];
	if (parentSpanId) infoParts.push(`parent ID: ${parentSpanId}`);
	if (!isRootSpan) {
		const { op: op2, description: description2 } = spanToJSON(rootSpan);
		infoParts.push(`root ID: ${rootSpan.spanContext().spanId}`);
		if (op2) infoParts.push(`root op: ${op2}`);
		if (description2) infoParts.push(`root description: ${description2}`);
	}
	debug.log(`${header}
  ${infoParts.join("\n  ")}`);
}
function logSpanEnd(span) {
	if (!DEBUG_BUILD$4) return;
	const { description = "< unknown name >", op = "< unknown op >" } = spanToJSON(span);
	const { spanId } = span.spanContext();
	const msg = `[Tracing] Finishing "${op}" ${getRootSpan$1(span) === span ? "root " : ""}span "${description}" with ID ${spanId}`;
	debug.log(msg);
}
function timedEventsToMeasurements(events) {
	if (!events || events.length === 0) return;
	const measurements = {};
	events.forEach((event) => {
		const attributes = event.attributes || {};
		const unit = attributes[SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT];
		const value = attributes[SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE];
		if (typeof unit === "string" && typeof value === "number") measurements[event.name] = {
			value,
			unit
		};
	});
	return measurements;
}
function setSegmentSpanCaptureStrategy(strategy) {
	getSentryCarrier(getMainCarrier()).segmentSpanCaptureStrategy = strategy;
}
function getSegmentSpanCaptureStrategy() {
	return getSentryCarrier(getMainCarrier()).segmentSpanCaptureStrategy;
}
function hasSpanStreamingEnabled(client) {
	return client.getOptions().traceLifecycle === "stream";
}
var MAX_SPAN_COUNT$1 = 1e3;
var SentrySpan = class {
	/**
	* You should never call the constructor manually, always use `Sentry.startSpan()`
	* or other span methods.
	* @internal
	* @hideconstructor
	* @hidden
	*/
	constructor(spanContext = {}) {
		this._traceId = spanContext.traceId || generateTraceId();
		this._spanId = spanContext.spanId || generateSpanId();
		this._startTime = spanContext.startTimestamp || timestampInSeconds();
		this._links = spanContext.links;
		this._attributes = {};
		this.setAttributes({
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "manual",
			[SEMANTIC_ATTRIBUTE_SENTRY_OP]: spanContext.op,
			...spanContext.attributes
		});
		this._name = spanContext.name;
		if (spanContext.parentSpanId) this._parentSpanId = spanContext.parentSpanId;
		if ("sampled" in spanContext) this._sampled = spanContext.sampled;
		if (spanContext.endTimestamp) this._endTime = spanContext.endTimestamp;
		this._events = [];
		this._isStandaloneSpan = spanContext.isStandalone;
		if (this._endTime) this._onSpanEnded();
	}
	/** @inheritDoc */
	addLink(link) {
		if (this._frozen) return this;
		if (this._links) this._links.push(link);
		else this._links = [link];
		return this;
	}
	/** @inheritDoc */
	addLinks(links) {
		if (this._frozen) return this;
		if (this._links) this._links.push(...links);
		else this._links = links;
		return this;
	}
	/**
	* This should generally not be used,
	* but it is needed for being compliant with the OTEL Span interface.
	*
	* @hidden
	* @internal
	*/
	recordException(_exception, _time) {}
	/** @inheritdoc */
	spanContext() {
		const { _spanId: spanId, _traceId: traceId, _sampled: sampled } = this;
		return {
			spanId,
			traceId,
			traceFlags: sampled ? 1 : 0
		};
	}
	/** @inheritdoc */
	setAttribute(key, value) {
		if (this._frozen) return this;
		if (value === void 0) delete this._attributes[key];
		else this._attributes[key] = value;
		if (key === "sentry.source" && value !== void 0 && spanShouldInferOtelSource(this)) markSpanSourceAsExplicit(this);
		return this;
	}
	/** @inheritdoc */
	setAttributes(attributes) {
		Object.keys(attributes).forEach((key) => this.setAttribute(key, attributes[key]));
		return this;
	}
	/**
	* This should generally not be used,
	* but we need it for browser tracing where we want to adjust the start time afterwards.
	* USE THIS WITH CAUTION!
	*
	* @hidden
	* @internal
	*/
	updateStartTime(timeInput) {
		if (this._frozen) return;
		this._startTime = spanTimeInputToSeconds(timeInput);
	}
	/**
	* @inheritDoc
	*/
	setStatus(value) {
		if (this._frozen) return this;
		this._status = value;
		return this;
	}
	/**
	* @inheritDoc
	*/
	updateName(name) {
		if (this._frozen) return this;
		this._name = name;
		if (!spanShouldInferOtelSource(this)) this.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, "custom");
		return this;
	}
	/** @inheritdoc */
	end(endTimestamp) {
		if (this._endTime) {
			this._frozen = spanIsTracerProviderSpan(this);
			return;
		}
		this._endTime = spanTimeInputToSeconds(endTimestamp);
		logSpanEnd(this);
		this._onSpanEnded();
		this._frozen = spanIsTracerProviderSpan(this);
	}
	/**
	* Get JSON representation of this span.
	*
	* @hidden
	* @internal This method is purely for internal purposes and should not be used outside
	* of SDK code. If you need to get a JSON representation of a span,
	* use `spanToJSON(span)` instead.
	*/
	getSpanJSON() {
		return {
			data: this._attributes,
			description: this._name,
			op: this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_OP],
			parent_span_id: this._parentSpanId,
			span_id: this._spanId,
			start_timestamp: this._startTime,
			status: getStatusMessage(this._status),
			timestamp: this._endTime,
			trace_id: this._traceId,
			origin: this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN],
			profile_id: this._attributes[SEMANTIC_ATTRIBUTE_PROFILE_ID],
			exclusive_time: this._attributes[SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME],
			measurements: timedEventsToMeasurements(this._events),
			is_segment: this._isStandaloneSpan && getRootSpan$1(this) === this || void 0,
			segment_id: this._isStandaloneSpan ? getRootSpan$1(this).spanContext().spanId : void 0,
			links: convertSpanLinksForEnvelope(this._links)
		};
	}
	/**
	* Get {@link StreamedSpanJSON} representation of this span.
	*
	* @hidden
	* @internal This method is purely for internal purposes and should not be used outside
	* of SDK code. If you need to get a JSON representation of a span,
	* use `spanToStreamedSpanJSON(span)` instead.
	*/
	getStreamedSpanJSON() {
		return {
			name: this._name ?? "",
			span_id: this._spanId,
			trace_id: this._traceId,
			parent_span_id: this._parentSpanId,
			start_timestamp: this._startTime,
			end_timestamp: this._endTime ?? this._startTime,
			is_segment: this._isStandaloneSpan || this === getRootSpan$1(this),
			status: getSimpleStatus(this._status),
			attributes: addStatusMessageAttribute(this._attributes, this._status),
			links: getStreamedSpanLinks(this._links)
		};
	}
	/** @inheritdoc */
	isRecording() {
		return !this._endTime && !!this._sampled;
	}
	/**
	* @inheritdoc
	*/
	addEvent(name, attributesOrStartTime, startTime) {
		if (this._frozen) return this;
		DEBUG_BUILD$4 && debug.log("[Tracing] Adding an event to span:", name);
		const time = isSpanTimeInput(attributesOrStartTime) ? attributesOrStartTime : startTime || timestampInSeconds();
		const attributes = isSpanTimeInput(attributesOrStartTime) ? {} : attributesOrStartTime || {};
		const event = {
			name,
			time: spanTimeInputToSeconds(time),
			attributes
		};
		this._events.push(event);
		return this;
	}
	/**
	* This method should generally not be used,
	* but for now we need a way to publicly check if the `_isStandaloneSpan` flag is set.
	* USE THIS WITH CAUTION!
	* @internal
	* @hidden
	* @experimental
	*/
	isStandaloneSpan() {
		return !!this._isStandaloneSpan;
	}
	/** Emit `spanEnd` when the span is ended. */
	_onSpanEnded() {
		const client = getClient();
		if (client) {
			client.emit("spanEnd", this);
			if (!this._isStandaloneSpan) client.emit("afterSpanEnd", this);
		}
		const rootSpan = getRootSpan$1(this);
		const isSegmentSpan = this._isStandaloneSpan || this === rootSpan;
		if (this._isStandaloneSpan) {
			if (this._sampled) sendSpanEnvelope(createSpanEnvelope([this], client));
			else {
				DEBUG_BUILD$4 && debug.log("[Tracing] Discarding standalone span because its trace was not chosen to be sampled.");
				if (client) client.recordDroppedEvent("sample_rate", "span");
			}
			return;
		}
		if (!isSegmentSpan) {
			const strategy2 = getSegmentSpanCaptureStrategy();
			if (strategy2) {
				const scope2 = getCapturedScopesOnSpan(this).scope || getCurrentScope();
				strategy2.onChildSpanEnded(this, rootSpan, (options) => this._convertSpanToTransaction(options), scope2);
			}
			return;
		}
		if (client && hasSpanStreamingEnabled(client)) {
			client.emit("afterSegmentSpanEnd", this);
			return;
		}
		const scope = getCapturedScopesOnSpan(this).scope || getCurrentScope();
		const strategy = getSegmentSpanCaptureStrategy();
		if (strategy) strategy.onSegmentSpanEnded((options) => this._convertSpanToTransaction(options), scope);
		else {
			const transactionEvent = this._convertSpanToTransaction();
			if (transactionEvent) scope.captureEvent(transactionEvent);
		}
	}
	/**
	* Finish the transaction & prepare the event to send to Sentry.
	*/
	_convertSpanToTransaction(options = {}) {
		if (!isFullFinishedSpan(spanToJSON(this))) return;
		if (!this._name) {
			DEBUG_BUILD$4 && debug.warn("Transaction has no name, falling back to `<unlabeled transaction>`.");
			this._name = "<unlabeled transaction>";
		}
		const { scope: capturedSpanScope, isolationScope: capturedSpanIsolationScope } = getCapturedScopesOnSpan(this);
		const normalizedRequest = capturedSpanScope?.getScopeData().sdkProcessingMetadata?.normalizedRequest;
		if (this._sampled !== true) return;
		options.onSpanCaptured?.(this);
		const spans = [];
		for (const descendant of getSpanDescendants(this)) {
			if (descendant === this || isStandaloneSpan(descendant) || options.isSpanAlreadyCaptured?.(descendant)) continue;
			const spanJSON = spanToJSON(descendant);
			if (!isFullFinishedSpan(spanJSON)) continue;
			options.onSpanCaptured?.(descendant);
			spans.push(spanJSON);
		}
		const source = this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
		delete this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
		let hasGenAiSpans = false;
		spans.forEach((span) => {
			delete span.data[SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
			if (span.op?.startsWith("gen_ai.")) hasGenAiSpans = true;
		});
		const transaction = {
			contexts: { trace: spanToTransactionTraceContext(this) },
			spans: spans.length > MAX_SPAN_COUNT$1 ? spans.sort((a, b) => a.start_timestamp - b.start_timestamp).slice(0, MAX_SPAN_COUNT$1) : spans,
			start_timestamp: this._startTime,
			timestamp: this._endTime,
			transaction: this._name,
			type: "transaction",
			sdkProcessingMetadata: {
				capturedSpanScope,
				capturedSpanIsolationScope,
				dynamicSamplingContext: getDynamicSamplingContextFromSpan(this),
				hasGenAiSpans
			},
			request: normalizedRequest,
			...source && { transaction_info: { source } }
		};
		const measurements = timedEventsToMeasurements(this._events);
		if (measurements && Object.keys(measurements).length) {
			DEBUG_BUILD$4 && debug.log("[Measurements] Adding measurements to transaction event", JSON.stringify(measurements, void 0, 2));
			transaction.measurements = measurements;
		}
		return transaction;
	}
};
function isSpanTimeInput(value) {
	return value && typeof value === "number" || value instanceof Date || Array.isArray(value);
}
function isFullFinishedSpan(input) {
	return !!input.start_timestamp && !!input.timestamp && !!input.span_id && !!input.trace_id;
}
function isStandaloneSpan(span) {
	return span instanceof SentrySpan && span.isStandaloneSpan();
}
function sendSpanEnvelope(envelope) {
	const client = getClient();
	if (!client) return;
	const spanItems = envelope[1];
	if (!spanItems || spanItems.length === 0) {
		client.recordDroppedEvent("before_send", "span");
		return;
	}
	client.sendEnvelope(envelope);
}
function handleCallbackErrors(fn, onError, onFinally = () => {}, onSuccess = () => {}) {
	let maybePromiseResult;
	try {
		maybePromiseResult = fn();
	} catch (e) {
		onError(e);
		onFinally();
		throw e;
	}
	return maybeHandlePromiseRejection(maybePromiseResult, onError, onFinally, onSuccess);
}
function maybeHandlePromiseRejection(value, onError, onFinally, onSuccess) {
	if (isThenable(value)) return chainAndCopyPromiseLike(value, (result) => {
		onFinally();
		onSuccess(result);
	}, (err) => {
		onError(err);
		onFinally();
	});
	onFinally();
	onSuccess(value);
	return value;
}
function sampleSpan(options, samplingContext, sampleRand) {
	if (!hasSpansEnabled(options)) return [false];
	let localSampleRateWasApplied = void 0;
	let sampleRate;
	if (typeof options.tracesSampler === "function") {
		sampleRate = options.tracesSampler({
			...samplingContext,
			inheritOrSampleWith: (fallbackSampleRate) => {
				if (typeof samplingContext.parentSampleRate === "number") return samplingContext.parentSampleRate;
				if (typeof samplingContext.parentSampled === "boolean") return Number(samplingContext.parentSampled);
				return fallbackSampleRate;
			}
		});
		localSampleRateWasApplied = true;
	} else if (samplingContext.parentSampled !== void 0) sampleRate = samplingContext.parentSampled;
	else if (typeof options.tracesSampleRate !== "undefined") {
		sampleRate = options.tracesSampleRate;
		localSampleRateWasApplied = true;
	}
	const parsedSampleRate = parseSampleRate(sampleRate);
	if (parsedSampleRate === void 0) {
		DEBUG_BUILD$4 && debug.warn(`[Tracing] Discarding root span because of invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(sampleRate)} of type ${JSON.stringify(typeof sampleRate)}.`);
		return [false];
	}
	if (!parsedSampleRate) {
		DEBUG_BUILD$4 && debug.log(`[Tracing] Discarding transaction because ${typeof options.tracesSampler === "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`);
		return [
			false,
			parsedSampleRate,
			localSampleRateWasApplied
		];
	}
	const shouldSample = sampleRand < parsedSampleRate;
	if (!shouldSample) DEBUG_BUILD$4 && debug.log(`[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(sampleRate)})`);
	return [
		shouldSample,
		parsedSampleRate,
		localSampleRateWasApplied
	];
}
var SUPPRESS_TRACING_KEY = "__SENTRY_SUPPRESS_TRACING__";
function startSpan$2(options, callback) {
	const acs = getAcs();
	if (acs.startSpan) return acs.startSpan(options, callback);
	const spanArguments = parseSentrySpanArguments(options);
	const { forceTransaction, parentSpan: customParentSpan, scope: customScope } = options;
	const customForkedScope = customScope?.clone();
	return withScope(customForkedScope, () => {
		return getActiveSpanWrapper$1(customParentSpan)(() => {
			const scope = getCurrentScope();
			const parentSpan = getParentSpan(scope, customParentSpan);
			const client = getClient();
			const activeSpan = options.onlyIfParent && !parentSpan ? startMissingRequiredParentSpan(scope, client) : createChildOrRootSpan({
				parentSpan,
				spanArguments,
				forceTransaction,
				scope
			});
			if (!spanIsIgnored(activeSpan) || !parentSpan) _setSpanForScope(scope, activeSpan);
			return handleCallbackErrors(() => callback(activeSpan), () => {
				const { status } = spanToJSON(activeSpan);
				if (activeSpan.isRecording() && (!status || status === "ok")) activeSpan.setStatus({
					code: 2,
					message: "internal_error"
				});
			}, () => {
				activeSpan.end();
			});
		});
	});
}
function startSpanManual$1(options, callback) {
	const acs = getAcs();
	if (acs.startSpanManual) return acs.startSpanManual(options, callback);
	const spanArguments = parseSentrySpanArguments(options);
	const { forceTransaction, parentSpan: customParentSpan, scope: customScope } = options;
	const customForkedScope = customScope?.clone();
	return withScope(customForkedScope, () => {
		return getActiveSpanWrapper$1(customParentSpan)(() => {
			const scope = getCurrentScope();
			const parentSpan = getParentSpan(scope, customParentSpan);
			const activeSpan = options.onlyIfParent && !parentSpan ? startMissingRequiredParentSpan(scope, getClient()) : createChildOrRootSpan({
				parentSpan,
				spanArguments,
				forceTransaction,
				scope
			});
			if (!spanIsIgnored(activeSpan) || !parentSpan) _setSpanForScope(scope, activeSpan);
			return handleCallbackErrors(() => callback(activeSpan, () => activeSpan.end()), () => {
				const { status } = spanToJSON(activeSpan);
				if (activeSpan.isRecording() && (!status || status === "ok")) activeSpan.setStatus({
					code: 2,
					message: "internal_error"
				});
			});
		});
	});
}
function startInactiveSpan$1(options) {
	const acs = getAcs();
	if (acs.startInactiveSpan) return acs.startInactiveSpan(options);
	return _startInactiveSpanImpl(options);
}
function _INTERNAL_startInactiveSpan(options) {
	return _startInactiveSpanImpl(options);
}
function _startInactiveSpanImpl(options) {
	const spanArguments = parseSentrySpanArguments(options);
	const { forceTransaction, parentSpan: customParentSpan } = options;
	return (options.scope ? (callback) => withScope(options.scope, callback) : customParentSpan !== void 0 ? (callback) => withActiveSpan$1(customParentSpan, callback) : (callback) => callback())(() => {
		const scope = getCurrentScope();
		const parentSpan = getParentSpan(scope, customParentSpan);
		const client = getClient();
		if (options.onlyIfParent && !parentSpan) return startMissingRequiredParentSpan(scope, client);
		return createChildOrRootSpan({
			parentSpan,
			spanArguments,
			forceTransaction,
			scope
		});
	});
}
var continueTrace$1 = (options, callback) => {
	const acs = getAsyncContextStrategy(getMainCarrier());
	if (acs.continueTrace) return acs.continueTrace(options, callback);
	const { sentryTrace, baggage } = options;
	const client = getClient();
	const incomingDsc = baggageHeaderToDynamicSamplingContext(baggage);
	if (client && !shouldContinueTrace(client, incomingDsc?.org_id)) return startNewTrace$1(callback);
	return withScope((scope) => {
		const propagationContext = propagationContextFromHeaders(sentryTrace, baggage);
		scope.setPropagationContext(propagationContext);
		_setSpanForScope(scope, void 0);
		return callback();
	});
};
function withActiveSpan$1(span, callback) {
	const acs = getAcs();
	if (acs.withActiveSpan) return acs.withActiveSpan(span, callback);
	return withScope((scope) => {
		_setSpanForScope(scope, span || void 0);
		return callback(scope);
	});
}
function suppressTracing$2(callback) {
	const acs = getAcs();
	if (acs.suppressTracing) return acs.suppressTracing(callback);
	return withScope((scope) => {
		scope.setSDKProcessingMetadata({ [SUPPRESS_TRACING_KEY]: true });
		const res = callback();
		scope.setSDKProcessingMetadata({ [SUPPRESS_TRACING_KEY]: void 0 });
		return res;
	});
}
function isTracingSuppressed$2(scope = getCurrentScope()) {
	const acs = getAcs();
	if (acs.isTracingSuppressed) return acs.isTracingSuppressed(scope);
	return scope.getScopeData().sdkProcessingMetadata[SUPPRESS_TRACING_KEY] === true;
}
function startNewTrace$1(callback) {
	const acs = getAcs();
	if (acs.startNewTrace) return acs.startNewTrace(callback);
	return withScope((scope) => {
		scope.setPropagationContext({
			traceId: generateTraceId(),
			sampleRand: safeMathRandom()
		});
		DEBUG_BUILD$4 && debug.log(`Starting a new trace with id ${scope.getPropagationContext().traceId}`);
		return withActiveSpan$1(null, callback);
	});
}
function startMissingRequiredParentSpan(scope, client) {
	client?.recordDroppedEvent("no_parent_span", "span");
	const span = new SentryNonRecordingSpan({ traceId: scope.getPropagationContext().traceId });
	setCapturedScopesOnSpan(span, scope, getIsolationScope());
	return span;
}
function createChildOrRootSpan({ parentSpan, spanArguments, forceTransaction, scope }) {
	const isolationScope = getIsolationScope();
	if (!hasSpansEnabled()) {
		const scopePropagationContext = scope.getPropagationContext();
		const span2 = new SentryNonRecordingSpan({ traceId: parentSpan ? parentSpan.spanContext().traceId : scopePropagationContext.traceId });
		if (parentSpan && !forceTransaction) addChildSpanToSpan(parentSpan, span2);
		setCapturedScopesOnSpan(span2, scope, isolationScope);
		return span2;
	}
	const client = getClient();
	if (_shouldIgnoreStreamedSpan(client, spanArguments)) {
		if (!isTracingSuppressed$2(scope)) client?.recordDroppedEvent("ignored", "span");
		const ignoredSpan = new SentryNonRecordingSpan({
			dropReason: "ignored",
			traceId: parentSpan?.spanContext().traceId ?? scope.getPropagationContext().traceId
		});
		if (parentSpan && !forceTransaction) addChildSpanToSpan(parentSpan, ignoredSpan);
		setCapturedScopesOnSpan(ignoredSpan, scope, isolationScope);
		return ignoredSpan;
	}
	let span;
	if (parentSpan && !forceTransaction) {
		span = _startChildSpan(parentSpan, scope, spanArguments, isolationScope);
		addChildSpanToSpan(parentSpan, span);
	} else if (parentSpan) {
		const dsc = getDynamicSamplingContextFromSpan(parentSpan);
		const { traceId, spanId: parentSpanId } = parentSpan.spanContext();
		const parentSampled = spanIsSampled(parentSpan);
		span = _startRootSpan({
			traceId,
			parentSpanId,
			...spanArguments
		}, scope, isolationScope, parentSampled);
		freezeDscOnSpan(span, dsc);
	} else {
		const { traceId, dsc, parentSpanId, sampled: parentSampled } = scope.getPropagationContext();
		span = _startRootSpan({
			traceId,
			parentSpanId,
			...spanArguments
		}, scope, isolationScope, parentSampled);
		if (dsc) freezeDscOnSpan(span, dsc);
	}
	logSpanStart(span);
	return span;
}
function parseSentrySpanArguments(options) {
	const initialCtx = {
		isStandalone: (options.experimental || {}).standalone,
		...options
	};
	if (options.startTime) {
		const ctx = { ...initialCtx };
		ctx.startTimestamp = spanTimeInputToSeconds(options.startTime);
		delete ctx.startTime;
		return ctx;
	}
	return initialCtx;
}
function getAcs() {
	return getAsyncContextStrategy(getMainCarrier());
}
function _startRootSpan(spanArguments, scope, isolationScope, parentSampled) {
	const client = getClient();
	const options = client?.getOptions() || {};
	const { name = "" } = spanArguments;
	const mutableSpanSamplingData = {
		spanAttributes: { ...spanArguments.attributes },
		spanName: name,
		parentSampled
	};
	client?.emit("beforeSampling", mutableSpanSamplingData, { decision: false });
	const finalParentSampled = mutableSpanSamplingData.parentSampled ?? parentSampled;
	const finalAttributes = mutableSpanSamplingData.spanAttributes;
	const currentPropagationContext = scope.getPropagationContext();
	const _isTracingSuppressed = isTracingSuppressed$2(scope);
	const [sampled, sampleRate, localSampleRateWasApplied] = _isTracingSuppressed ? [false] : sampleSpan(options, {
		name,
		parentSampled: finalParentSampled,
		attributes: finalAttributes,
		normalizedRequest: isolationScope.getScopeData().sdkProcessingMetadata.normalizedRequest,
		parentSampleRate: parseSampleRate(currentPropagationContext.dsc?.sample_rate)
	}, currentPropagationContext.sampleRand);
	const rootSpan = new SentrySpan({
		...spanArguments,
		attributes: {
			[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "custom",
			[SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE]: sampleRate !== void 0 && localSampleRateWasApplied ? sampleRate : void 0,
			...finalAttributes
		},
		sampled
	});
	if (!sampled && client && !_isTracingSuppressed) {
		DEBUG_BUILD$4 && debug.log("[Tracing] Discarding root span because its trace was not chosen to be sampled.");
		client.recordDroppedEvent("sample_rate", hasSpanStreamingEnabled(client) ? "span" : "transaction");
	}
	setCapturedScopesOnSpan(rootSpan, scope, isolationScope);
	if (client) client.emit("spanStart", rootSpan);
	return rootSpan;
}
function _startChildSpan(parentSpan, scope, spanArguments, isolationScope) {
	const { spanId, traceId } = parentSpan.spanContext();
	const _isTracingSuppressed = isTracingSuppressed$2(scope);
	const sampled = _isTracingSuppressed ? false : spanIsSampled(parentSpan);
	const childSpan = sampled ? new SentrySpan({
		...spanArguments,
		parentSpanId: spanId,
		traceId,
		sampled
	}) : new SentryNonRecordingSpan({ traceId });
	addChildSpanToSpan(parentSpan, childSpan);
	setCapturedScopesOnSpan(childSpan, scope, isolationScope);
	const client = getClient();
	if (!client) return childSpan;
	if (hasSpanStreamingEnabled(client) && spanIsNonRecordingSpan(childSpan)) {
		if (spanIsNonRecordingSpan(parentSpan) && parentSpan.dropReason) {
			childSpan.dropReason = parentSpan.dropReason;
			client.recordDroppedEvent(parentSpan.dropReason, "span");
		} else if (!_isTracingSuppressed) {
			childSpan.dropReason = "sample_rate";
			client.recordDroppedEvent("sample_rate", "span");
		}
	}
	client.emit("spanStart", childSpan);
	if (spanArguments.endTimestamp) {
		client.emit("spanEnd", childSpan);
		client.emit("afterSpanEnd", childSpan);
	}
	return childSpan;
}
function getParentSpan(scope, customParentSpan) {
	if (customParentSpan) return customParentSpan;
	if (customParentSpan === null) return;
	const span = _getSpanForScope(scope);
	if (!span) return;
	const client = getClient();
	if ((client ? client.getOptions() : {}).parentSpanIsAlwaysRootSpan) return getRootSpan$1(span);
	return span;
}
function getActiveSpanWrapper$1(parentSpan) {
	return parentSpan !== void 0 ? (callback) => {
		return withActiveSpan$1(parentSpan, callback);
	} : (callback) => callback();
}
function _shouldIgnoreStreamedSpan(client, spanArguments) {
	const ignoreSpans = client?.getOptions().ignoreSpans;
	if (!client || !hasSpanStreamingEnabled(client) || !ignoreSpans?.length) return false;
	return shouldIgnoreSpan$1({
		description: spanArguments.name || "",
		op: spanArguments.attributes?.["sentry.op"] || spanArguments.op,
		attributes: spanArguments.attributes
	}, ignoreSpans);
}
function spanIsIgnored(span) {
	return spanIsNonRecordingSpan(span) && span.dropReason === "ignored";
}
function debounce(func, wait, options) {
	let callbackReturnValue;
	let timerId;
	let maxTimerId;
	const maxWait = options?.maxWait ? Math.max(options.maxWait, wait) : 0;
	const setTimeoutImpl = options?.setTimeoutImpl || setTimeout;
	function invokeFunc() {
		cancelTimers();
		callbackReturnValue = func();
		return callbackReturnValue;
	}
	function cancelTimers() {
		timerId !== void 0 && clearTimeout(timerId);
		maxTimerId !== void 0 && clearTimeout(maxTimerId);
		timerId = maxTimerId = void 0;
	}
	function flush() {
		if (timerId !== void 0 || maxTimerId !== void 0) return invokeFunc();
		return callbackReturnValue;
	}
	function debounced() {
		if (timerId) clearTimeout(timerId);
		timerId = setTimeoutImpl(invokeFunc, wait);
		if (maxWait && maxTimerId === void 0) maxTimerId = setTimeoutImpl(invokeFunc, maxWait);
		return callbackReturnValue;
	}
	debounced.cancel = cancelTimers;
	debounced.flush = flush;
	return debounced;
}
var CAPTURED_SPANS = /* @__PURE__ */ new WeakSet();
var isSpanAlreadyCaptured = (span) => CAPTURED_SPANS.has(span);
var markSpanCaptured = (span) => {
	CAPTURED_SPANS.add(span);
};
var CLIENT_QUEUES = /* @__PURE__ */ new WeakMap();
function _INTERNAL_setDeferSegmentSpanCapture(client) {
	if (!getSegmentSpanCaptureStrategy()) setSegmentSpanCaptureStrategy(deferredSegmentSpanCaptureStrategy);
	if (CLIENT_QUEUES.has(client)) return;
	const pendingCaptures = /* @__PURE__ */ new Set();
	const debouncedDrain = debounce(() => {
		const captures = [...pendingCaptures];
		pendingCaptures.clear();
		for (const capture of captures) capture();
	}, 1, { maxWait: 100 });
	client.on("flush", () => {
		debouncedDrain.flush();
	});
	CLIENT_QUEUES.set(client, (capture) => {
		pendingCaptures.add(capture);
		debouncedDrain();
	});
}
var deferredSegmentSpanCaptureStrategy = {
	onSegmentSpanEnded(convert, scope) {
		const client = scope.getClient();
		const enqueue = client && CLIENT_QUEUES.get(client);
		if (!enqueue) {
			const transactionEvent = convert();
			if (transactionEvent) client?.captureEvent(transactionEvent);
			return;
		}
		enqueue(() => {
			const transactionEvent = convert({
				isSpanAlreadyCaptured,
				onSpanCaptured: markSpanCaptured
			});
			if (transactionEvent) client.captureEvent(transactionEvent);
		});
	},
	onChildSpanEnded(span, rootSpan, convert, scope) {
		if (CAPTURED_SPANS.has(span) || !CAPTURED_SPANS.has(rootSpan)) return;
		const client = scope.getClient();
		const enqueue = client && CLIENT_QUEUES.get(client);
		const captureOrphan = () => {
			const transactionEvent = convert({
				isSpanAlreadyCaptured,
				onSpanCaptured: markSpanCaptured
			});
			if (transactionEvent?.contexts?.trace?.data) transactionEvent.contexts.trace.data["sentry.parent_span_already_sent"] = true;
			if (transactionEvent) client?.captureEvent(transactionEvent);
		};
		if (enqueue) enqueue(captureOrphan);
		else captureOrphan();
	}
};
var ADD_LISTENER_METHODS$1 = [
	"addListener",
	"on",
	"once",
	"prependListener",
	"prependOnceListener",
	"addEventListener"
];
var REMOVE_LISTENER_METHODS = [
	"removeListener",
	"off",
	"removeEventListener"
];
var SCOPE_BOUND_LISTENERS = /* @__PURE__ */ Symbol("SentryScopeBoundListeners");
var registeringWrapper;
function isReentrantWrapperRegistration(listener) {
	return registeringWrapper !== void 0 && (listener === registeringWrapper || listener.listener === registeringWrapper);
}
function bindScopeToEmitter(emitter, scope = getCurrentScope()) {
	const ee = emitter;
	if (getPatchMap(ee)) return emitter;
	createPatchMap(ee);
	for (const methodName of ADD_LISTENER_METHODS$1) {
		if (typeof ee[methodName] !== "function") continue;
		ee[methodName] = patchAddListener(ee, ee[methodName], scope);
	}
	for (const methodName of REMOVE_LISTENER_METHODS) {
		if (typeof ee[methodName] !== "function") continue;
		ee[methodName] = patchRemoveListener(ee, ee[methodName]);
	}
	if (typeof ee.removeAllListeners === "function") ee.removeAllListeners = patchRemoveAllListeners(ee, ee.removeAllListeners);
	return emitter;
}
function bindListenerToScope(listener, scope) {
	return function(...args) {
		return withScope(scope, () => listener.apply(this, args));
	};
}
function isBoundListener(listener) {
	return typeof listener === "function";
}
function patchAddListener(ee, original, scope) {
	return function(...args) {
		const event = args[0];
		const listener = args[1];
		const rest = args.slice(2);
		if (!isBoundListener(listener) || isReentrantWrapperRegistration(listener)) return original.apply(this, args);
		const map = getPatchMap(ee) || createPatchMap(ee);
		let listeners = map.get(event);
		if (!listeners) {
			listeners = /* @__PURE__ */ new WeakMap();
			map.set(event, listeners);
		}
		let boundListener = listeners.get(listener);
		if (!boundListener) {
			boundListener = bindListenerToScope(listener, scope);
			listeners.set(listener, boundListener);
		}
		const previous = registeringWrapper;
		registeringWrapper = boundListener;
		try {
			return original.call(this, event, boundListener, ...rest);
		} finally {
			registeringWrapper = previous;
		}
	};
}
function patchRemoveListener(ee, original) {
	return function(...args) {
		const event = args[0];
		const listener = args[1];
		const rest = args.slice(2);
		const boundListener = isBoundListener(listener) ? getPatchMap(ee)?.get(event)?.get(listener) : void 0;
		if (!boundListener) return original.apply(this, args);
		return original.call(this, event, boundListener, ...rest);
	};
}
function patchRemoveAllListeners(ee, original) {
	return function(...args) {
		const map = getPatchMap(ee);
		if (map) {
			if (args.length === 0) createPatchMap(ee);
			else {
				const event = args[0];
				map.delete(event);
			}
		}
		return original.apply(this, args);
	};
}
function createPatchMap(ee) {
	const map = /* @__PURE__ */ new Map();
	ee[SCOPE_BOUND_LISTENERS] = map;
	return map;
}
function getPatchMap(ee) {
	return ee[SCOPE_BOUND_LISTENERS];
}
function applyScopeDataToEvent(event, data) {
	const { fingerprint, span, breadcrumbs, sdkProcessingMetadata } = data;
	applyDataToEvent(event, data);
	if (span) applySpanToEvent(event, span);
	applyFingerprintToEvent(event, fingerprint);
	applyBreadcrumbsToEvent(event, breadcrumbs);
	applySdkMetadataToEvent(event, sdkProcessingMetadata);
}
function mergeScopeData(data, mergeData) {
	const { extra, tags, attributes, user, contexts, level, sdkProcessingMetadata, breadcrumbs, fingerprint, eventProcessors, attachments, propagationContext, transactionName, span } = mergeData;
	mergeAndOverwriteScopeData(data, "extra", extra);
	mergeAndOverwriteScopeData(data, "tags", tags);
	mergeAndOverwriteScopeData(data, "attributes", attributes);
	mergeAndOverwriteScopeData(data, "user", user);
	mergeAndOverwriteScopeData(data, "contexts", contexts);
	data.sdkProcessingMetadata = merge(data.sdkProcessingMetadata, sdkProcessingMetadata, 2);
	if (level) data.level = level;
	if (transactionName) data.transactionName = transactionName;
	if (span) data.span = span;
	if (breadcrumbs.length) data.breadcrumbs = [...data.breadcrumbs, ...breadcrumbs];
	if (fingerprint.length) data.fingerprint = [...data.fingerprint, ...fingerprint];
	if (eventProcessors.length) data.eventProcessors = [...data.eventProcessors, ...eventProcessors];
	if (attachments.length) data.attachments = [...data.attachments, ...attachments];
	data.propagationContext = {
		...data.propagationContext,
		...propagationContext
	};
}
function mergeAndOverwriteScopeData(data, prop, mergeVal) {
	data[prop] = merge(data[prop], mergeVal, 1);
}
function getCombinedScopeData(isolationScope, currentScope) {
	const scopeData = getGlobalScope().getScopeData();
	isolationScope && mergeScopeData(scopeData, isolationScope.getScopeData());
	currentScope && mergeScopeData(scopeData, currentScope.getScopeData());
	return scopeData;
}
function applyDataToEvent(event, data) {
	const { extra, tags, user, contexts, level, transactionName } = data;
	if (Object.keys(extra).length) event.extra = {
		...extra,
		...event.extra
	};
	if (Object.keys(tags).length) event.tags = {
		...tags,
		...event.tags
	};
	if (Object.keys(user).length) event.user = {
		...user,
		...event.user
	};
	if (Object.keys(contexts).length) event.contexts = {
		...contexts,
		...event.contexts
	};
	if (level) event.level = level;
	if (transactionName && event.type !== "transaction") event.transaction = transactionName;
}
function applyBreadcrumbsToEvent(event, breadcrumbs) {
	const mergedBreadcrumbs = [...event.breadcrumbs || [], ...breadcrumbs];
	event.breadcrumbs = mergedBreadcrumbs.length ? mergedBreadcrumbs : void 0;
}
function applySdkMetadataToEvent(event, sdkProcessingMetadata) {
	event.sdkProcessingMetadata = {
		...event.sdkProcessingMetadata,
		...sdkProcessingMetadata
	};
}
function applySpanToEvent(event, span) {
	event.contexts = {
		trace: spanToTraceContext(span),
		...event.contexts
	};
	event.sdkProcessingMetadata = {
		dynamicSamplingContext: getDynamicSamplingContextFromSpan(span),
		...event.sdkProcessingMetadata
	};
	const transactionName = spanToJSON(getRootSpan$1(span)).description;
	if (transactionName && !event.transaction && event.type === "transaction") event.transaction = transactionName;
}
function applyFingerprintToEvent(event, fingerprint) {
	event.fingerprint = event.fingerprint ? Array.isArray(event.fingerprint) ? event.fingerprint : [event.fingerprint] : [];
	if (fingerprint) event.fingerprint = event.fingerprint.concat(fingerprint);
	if (!event.fingerprint.length) delete event.fingerprint;
}
function scopeContextsToSpanAttributes(contexts) {
	const attrs = {};
	const { response, profile, cloud_resource, culture, state } = contexts;
	if (response) {
		if (response.status_code != null) attrs["http.response.status_code"] = response.status_code;
		if (response.body_size != null) attrs["http.response.body.size"] = response.body_size;
	}
	if (profile) {
		if (profile.profile_id) attrs["sentry.profile_id"] = profile.profile_id;
		if (profile.profiler_id) attrs["sentry.profiler_id"] = profile.profiler_id;
	}
	if (cloud_resource) {
		for (const [key, value] of Object.entries(cloud_resource)) if (value != null) attrs[key] = value;
	}
	if (culture) {
		if (culture.locale) attrs["culture.locale"] = culture.locale;
		if (culture.timezone) attrs["culture.timezone"] = culture.timezone;
	}
	if (state?.state && typeof state.state.type === "string") attrs["state.type"] = state.state.type;
	const angular = contexts["angular"];
	if (angular) {
		const version = angular["version"];
		if (typeof version === "string" || typeof version === "number") attrs["angular.version"] = version;
	}
	const react = contexts["react"];
	if (react) {
		const version = react["version"];
		if (typeof version === "string" || typeof version === "number") attrs["react.version"] = version;
	}
	return attrs;
}
var ht = "code.function.name";
var wt = "db.collection.name";
var Nt = "db.name";
var Ct = "db.namespace";
var Dt = "db.operation.batch.size";
var Lt = "db.operation.name";
var Gt = "db.query.text";
var Ht = "db.statement";
var Kt = "db.system";
var jt = "db.system.name";
var Qt = "db.user";
var Gn = "error.type";
var ar = "faas.trigger";
var qr = "gen_ai.embeddings.input";
var Gr = "gen_ai.function_id";
var Yr = "gen_ai.input.messages";
var Vr = "gen_ai.operation.name";
var Fr = "gen_ai.output.messages";
var jr = "gen_ai.request.available_tools";
var Zr = "gen_ai.request.model";
var sa = "gen_ai.response.finish_reasons";
var oa = "gen_ai.response.id";
var la = "gen_ai.response.model";
var pa = "gen_ai.response.streaming";
var ma = "gen_ai.system";
var Ea = "gen_ai.tool.input";
var Ia = "gen_ai.tool.name";
var Oa = "gen_ai.tool.output";
var ka = "gen_ai.tool.type";
var Ra = "gen_ai.usage.input_tokens";
var Pa = "gen_ai.usage.output_tokens";
var Ma = "gen_ai.usage.total_tokens";
var qa = "graphql.document";
var Ga = "graphql.operation.name";
var Ya = "graphql.operation.type";
var Wa = "http.client_ip";
var Ba = "http.flavor";
var za = "http.host";
var Ka = "http.method";
var ns = "http.request.method";
var Ss = "http.response.status_code";
var Ts = "http.route";
var Is = "http.scheme";
var As = "http.status_code";
var xs = "http.target";
var ws = "http.url";
var Rs = "http.user_agent";
var Go = "messaging.batch.message_count";
var Wo = "messaging.destination.name";
var Qo = "messaging.operation.name";
var Xo = "messaging.operation.type";
var Zo = "messaging.system";
var dl = "network.peer.address";
var ml = "network.peer.port";
var fl = "net.host.ip";
var Sl = "net.host.name";
var El = "net.host.port";
var Tl = "net.peer.ip";
var Il = "net.peer.name";
var Ol = "net.peer.port";
var Dl = "net.transport";
var fp = "rpc.grpc.status_code";
var tc = "sentry.graphql.operation";
var rc = "sentry.http.prefetch";
var Ec = "sentry.origin";
var Nc = "sentry.sdk.name";
var Cc = "sentry.sdk.version";
var Pc = "sentry.segment.id";
var Lc = "sentry.segment.name";
var Kc = "sentry.trace_lifecycle";
var au = "server.address";
var ou = "server.port";
var lu = "service.name";
var pu = "service.version";
var Yu = "url.full";
var Vu = "url.path";
var Hu = "url.query";
var Ku = "url.scheme";
var Qu = "user_agent.original";
function captureSpan(span, client) {
	const spanJSON = spanToStreamedSpanJSON(span);
	const segmentSpan = INTERNAL_getSegmentSpan(span);
	const serializedSegmentSpan = spanToStreamedSpanJSON(segmentSpan);
	const { isolationScope: spanIsolationScope, scope: spanScope } = getCapturedScopesOnSpan(span);
	const finalScopeData = getCombinedScopeData(spanIsolationScope, spanScope);
	applyCommonSpanAttributes(spanJSON, serializedSegmentSpan, client, finalScopeData);
	const spanKind = span.kind;
	client.emit("preprocessSpan", spanJSON, { spanKind });
	if (spanJSON.is_segment) {
		applyScopeToSegmentSpan(spanJSON, finalScopeData);
		applySdkMetadataToSegmentSpan(spanJSON, client);
		client.emit("processSegmentSpan", spanJSON);
	}
	client.emit("processSpan", spanJSON);
	const { beforeSendSpan } = client.getOptions();
	const processedSpan = beforeSendSpan && isStreamedBeforeSendSpanCallback(beforeSendSpan) ? applyBeforeSendSpanCallback(spanJSON, beforeSendSpan) : spanJSON;
	const spanNameSource = processedSpan.attributes?.[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
	if (spanJSON.is_segment && spanNameSource) safeSetSpanJSONAttributes(processedSpan, { ["sentry.segment.name.source"]: spanNameSource });
	return {
		...streamedSpanJsonToSerializedSpan(processedSpan),
		_segmentSpan: segmentSpan
	};
}
function applyScopeToSegmentSpan(segmentSpanJSON, scopeData) {
	safeSetSpanJSONAttributes(segmentSpanJSON, scopeContextsToSpanAttributes(scopeData.contexts));
}
function safeSetSpanJSONAttributes(spanJSON, newAttributes) {
	const originalAttributes = spanJSON.attributes ?? (spanJSON.attributes = {});
	Object.entries(newAttributes).forEach(([key, value]) => {
		if (value != null && !(key in originalAttributes)) originalAttributes[key] = value;
	});
}
function applySdkMetadataToSegmentSpan(segmentSpanJSON, client) {
	const integrationNames = client.getIntegrationNames();
	if (!integrationNames.length) return;
	safeSetSpanJSONAttributes(segmentSpanJSON, { [SEMANTIC_ATTRIBUTE_SENTRY_SDK_INTEGRATIONS]: integrationNames });
}
function applyCommonSpanAttributes(spanJSON, serializedSegmentSpan, client, scopeData) {
	const sdk = client.getSdkMetadata();
	const { release, environment } = client.getOptions();
	safeSetSpanJSONAttributes(spanJSON, {
		[Kc]: "stream",
		[Lc]: serializedSegmentSpan.name,
		[Pc]: serializedSegmentSpan.span_id,
		[Nc]: sdk?.sdk?.name,
		[Cc]: sdk?.sdk?.version,
		[SEMANTIC_ATTRIBUTE_SENTRY_RELEASE]: release,
		[SEMANTIC_ATTRIBUTE_SENTRY_ENVIRONMENT]: environment || "production",
		[SEMANTIC_ATTRIBUTE_USER_ID]: scopeData.user?.id,
		[SEMANTIC_ATTRIBUTE_USER_EMAIL]: scopeData.user?.email,
		[SEMANTIC_ATTRIBUTE_USER_IP_ADDRESS]: scopeData.user?.ip_address,
		[SEMANTIC_ATTRIBUTE_USER_USERNAME]: scopeData.user?.username,
		...scopeData.attributes
	});
}
function applyBeforeSendSpanCallback(span, beforeSendSpan) {
	const modifedSpan = beforeSendSpan(span);
	if (!modifedSpan) {
		showSpanDropWarning();
		return span;
	}
	return modifedSpan;
}
var STATE_PENDING = 0;
var STATE_RESOLVED = 1;
var STATE_REJECTED = 2;
function resolvedSyncPromise(value) {
	return new SyncPromise((resolve) => {
		resolve(value);
	});
}
function rejectedSyncPromise(reason) {
	return new SyncPromise((_, reject) => {
		reject(reason);
	});
}
var SyncPromise = class SyncPromise {
	constructor(executor) {
		this._state = STATE_PENDING;
		this._handlers = [];
		this._runExecutor(executor);
	}
	/** @inheritdoc */
	then(onfulfilled, onrejected) {
		return new SyncPromise((resolve, reject) => {
			this._handlers.push([
				false,
				(result) => {
					if (!onfulfilled) resolve(result);
					else try {
						resolve(onfulfilled(result));
					} catch (e) {
						reject(e);
					}
				},
				(reason) => {
					if (!onrejected) reject(reason);
					else try {
						resolve(onrejected(reason));
					} catch (e) {
						reject(e);
					}
				}
			]);
			this._executeHandlers();
		});
	}
	/** @inheritdoc */
	catch(onrejected) {
		return this.then((val) => val, onrejected);
	}
	/** @inheritdoc */
	finally(onfinally) {
		return new SyncPromise((resolve, reject) => {
			let val;
			let isRejected;
			return this.then((value) => {
				isRejected = false;
				val = value;
				if (onfinally) onfinally();
			}, (reason) => {
				isRejected = true;
				val = reason;
				if (onfinally) onfinally();
			}).then(() => {
				if (isRejected) {
					reject(val);
					return;
				}
				resolve(val);
			});
		});
	}
	/** Excute the resolve/reject handlers. */
	_executeHandlers() {
		if (this._state === STATE_PENDING) return;
		const cachedHandlers = this._handlers.slice();
		this._handlers = [];
		cachedHandlers.forEach((handler) => {
			if (handler[0]) return;
			if (this._state === STATE_RESOLVED) handler[1](this._value);
			if (this._state === STATE_REJECTED) handler[2](this._value);
			handler[0] = true;
		});
	}
	/** Run the executor for the SyncPromise. */
	_runExecutor(executor) {
		const setResult = (state, value) => {
			if (this._state !== STATE_PENDING) return;
			if (isThenable(value)) {
				value.then(resolve, reject);
				return;
			}
			this._state = state;
			this._value = value;
			this._executeHandlers();
		};
		const resolve = (value) => {
			setResult(STATE_RESOLVED, value);
		};
		const reject = (reason) => {
			setResult(STATE_REJECTED, reason);
		};
		try {
			executor(resolve, reject);
		} catch (e) {
			reject(e);
		}
	}
};
function notifyEventProcessors(processors, event, hint, index = 0) {
	try {
		const result = _notifyEventProcessors(event, hint, processors, index);
		return isThenable(result) ? result : resolvedSyncPromise(result);
	} catch (error) {
		return rejectedSyncPromise(error);
	}
}
function _notifyEventProcessors(event, hint, processors, index) {
	const processor = processors[index];
	if (!event || !processor) return event;
	const result = processor({ ...event }, hint);
	DEBUG_BUILD$4 && result === null && debug.log(`Event processor "${processor.id || "?"}" dropped event`);
	if (isThenable(result)) return result.then((final) => _notifyEventProcessors(final, hint, processors, index + 1));
	return _notifyEventProcessors(result, hint, processors, index + 1);
}
var parsedStackResults;
var lastSentryKeysCount;
var lastNativeKeysCount;
var cachedFilenameDebugIds;
function getFilenameToDebugIdMap(stackParser) {
	const sentryDebugIdMap = GLOBAL_OBJ._sentryDebugIds;
	const nativeDebugIdMap = GLOBAL_OBJ._debugIds;
	if (!sentryDebugIdMap && !nativeDebugIdMap) return {};
	const sentryDebugIdKeys = sentryDebugIdMap ? Object.keys(sentryDebugIdMap) : [];
	const nativeDebugIdKeys = nativeDebugIdMap ? Object.keys(nativeDebugIdMap) : [];
	if (cachedFilenameDebugIds && sentryDebugIdKeys.length === lastSentryKeysCount && nativeDebugIdKeys.length === lastNativeKeysCount) return cachedFilenameDebugIds;
	lastSentryKeysCount = sentryDebugIdKeys.length;
	lastNativeKeysCount = nativeDebugIdKeys.length;
	cachedFilenameDebugIds = {};
	if (!parsedStackResults) parsedStackResults = {};
	const processDebugIds = (debugIdKeys, debugIdMap) => {
		for (const key of debugIdKeys) {
			const debugId = debugIdMap[key];
			const result = parsedStackResults?.[key];
			if (result && cachedFilenameDebugIds && debugId) {
				cachedFilenameDebugIds[result[0]] = debugId;
				if (parsedStackResults) parsedStackResults[key] = [result[0], debugId];
			} else if (debugId) {
				const parsedStack = stackParser(key);
				for (let i = parsedStack.length - 1; i >= 0; i--) {
					const filename = parsedStack[i]?.filename;
					if (filename && cachedFilenameDebugIds && parsedStackResults) {
						cachedFilenameDebugIds[filename] = debugId;
						parsedStackResults[key] = [filename, debugId];
						break;
					}
				}
			}
		}
	};
	if (sentryDebugIdMap) processDebugIds(sentryDebugIdKeys, sentryDebugIdMap);
	if (nativeDebugIdMap) processDebugIds(nativeDebugIdKeys, nativeDebugIdMap);
	return cachedFilenameDebugIds;
}
function prepareEvent(options, event, hint, scope, client, isolationScope) {
	const { normalizeDepth = 3, normalizeMaxBreadth = 1e3 } = options;
	const prepared = {
		...event,
		event_id: event.event_id || hint.event_id || uuid4(),
		timestamp: event.timestamp || dateTimestampInSeconds()
	};
	const integrations = hint.integrations || options.integrations.map((i) => i.name);
	applyClientOptions(prepared, options);
	applyIntegrationsMetadata(prepared, integrations);
	if (client) client.emit("applyFrameMetadata", event);
	if (event.type === void 0) applyDebugIds(prepared, options.stackParser);
	const finalScope = getFinalScope(scope, hint.captureContext);
	if (hint.mechanism) addExceptionMechanism(prepared, hint.mechanism);
	const clientEventProcessors = client ? client.getEventProcessors() : [];
	const data = getCombinedScopeData(isolationScope, finalScope);
	const attachments = [...hint.attachments || [], ...data.attachments];
	if (attachments.length) hint.attachments = attachments;
	applyScopeDataToEvent(prepared, data);
	const eventProcessors = [...clientEventProcessors, ...data.eventProcessors];
	return (hint.data && hint.data.__sentry__ === true ? resolvedSyncPromise(prepared) : notifyEventProcessors(eventProcessors, prepared, hint)).then((evt) => {
		if (evt) applyDebugMeta(evt);
		if (typeof normalizeDepth === "number" && normalizeDepth > 0) return normalizeEvent(evt, normalizeDepth, normalizeMaxBreadth);
		return evt;
	});
}
function applyClientOptions(event, options) {
	const { environment, release, dist, maxValueLength } = options;
	event.environment = event.environment || environment || "production";
	if (!event.release && release) event.release = release;
	if (!event.dist && dist) event.dist = dist;
	const request = event.request;
	if (request?.url && maxValueLength) request.url = truncate(request.url, maxValueLength);
	if (maxValueLength) event.exception?.values?.forEach((exception) => {
		if (exception.value) exception.value = truncate(exception.value, maxValueLength);
	});
}
function applyDebugIds(event, stackParser) {
	const filenameDebugIdMap = getFilenameToDebugIdMap(stackParser);
	event.exception?.values?.forEach((exception) => {
		exception.stacktrace?.frames?.forEach((frame) => {
			if (frame.filename) frame.debug_id = filenameDebugIdMap[frame.filename];
		});
	});
}
function applyDebugMeta(event) {
	const filenameDebugIdMap = {};
	event.exception?.values?.forEach((exception) => {
		exception.stacktrace?.frames?.forEach((frame) => {
			if (frame.debug_id) {
				if (frame.abs_path) filenameDebugIdMap[frame.abs_path] = frame.debug_id;
				else if (frame.filename) filenameDebugIdMap[frame.filename] = frame.debug_id;
				delete frame.debug_id;
			}
		});
	});
	if (Object.keys(filenameDebugIdMap).length === 0) return;
	event.debug_meta = event.debug_meta || {};
	event.debug_meta.images = event.debug_meta.images || [];
	const images = event.debug_meta.images;
	Object.entries(filenameDebugIdMap).forEach(([filename, debug_id]) => {
		images.push({
			type: "sourcemap",
			code_file: filename,
			debug_id
		});
	});
}
function applyIntegrationsMetadata(event, integrationNames) {
	if (integrationNames.length > 0) {
		event.sdk = event.sdk || {};
		event.sdk.integrations = [...event.sdk.integrations || [], ...integrationNames];
	}
}
function normalizeEvent(event, depth, maxBreadth) {
	if (!event) return null;
	const normalized = {
		...event,
		...event.breadcrumbs && { breadcrumbs: event.breadcrumbs.map((b) => ({
			...b,
			...b.data && { data: normalize$1(b.data, depth, maxBreadth) }
		})) },
		...event.user && { user: normalize$1(event.user, depth, maxBreadth) },
		...event.contexts && { contexts: normalize$1(event.contexts, depth, maxBreadth) },
		...event.extra && { extra: normalize$1(event.extra, depth, maxBreadth) }
	};
	if (event.contexts?.trace && normalized.contexts) {
		normalized.contexts.trace = event.contexts.trace;
		if (event.contexts.trace.data) normalized.contexts.trace.data = normalize$1(event.contexts.trace.data, depth, maxBreadth);
	}
	if (event.spans) normalized.spans = event.spans.map((span) => {
		return {
			...span,
			...span.data && { data: normalize$1(span.data, depth, maxBreadth) }
		};
	});
	if (event.contexts?.flags && normalized.contexts) normalized.contexts.flags = normalize$1(event.contexts.flags, 3, maxBreadth);
	return normalized;
}
function getFinalScope(scope, captureContext) {
	if (!captureContext) return scope;
	const finalScope = scope ? scope.clone() : new Scope();
	finalScope.update(captureContext);
	return finalScope;
}
function parseEventHintOrCaptureContext(hint) {
	if (!hint) return;
	if (hintIsScopeOrFunction(hint)) return { captureContext: hint };
	if (hintIsScopeContext(hint)) return { captureContext: hint };
	return hint;
}
function hintIsScopeOrFunction(hint) {
	return hint instanceof Scope || typeof hint === "function";
}
var captureContextKeys = [
	"user",
	"level",
	"extra",
	"contexts",
	"tags",
	"fingerprint",
	"propagationContext"
];
function hintIsScopeContext(hint) {
	return Object.keys(hint).some((key) => captureContextKeys.includes(key));
}
function captureException(exception, hint) {
	return getCurrentScope().captureException(exception, parseEventHintOrCaptureContext(hint));
}
function captureEvent(event, hint) {
	return getCurrentScope().captureEvent(event, hint);
}
function setUser(user) {
	getIsolationScope().setUser(user);
}
async function flush(timeout) {
	const client = getClient();
	if (client) return client.flush(timeout);
	DEBUG_BUILD$4 && debug.warn("Cannot flush events. No client defined.");
	return Promise.resolve(false);
}
function isEnabled() {
	const client = getClient();
	return client?.getOptions().enabled !== false && !!client?.getTransport();
}
function startSession(context) {
	const isolationScope = getIsolationScope();
	const { user } = getCombinedScopeData(isolationScope, getCurrentScope());
	const { userAgent } = GLOBAL_OBJ.navigator || {};
	const session = makeSession({
		user,
		...userAgent && { userAgent },
		...context
	});
	const currentSession = isolationScope.getSession();
	if (currentSession?.status === "ok") updateSession(currentSession, { status: "exited" });
	endSession();
	isolationScope.setSession(session);
	return session;
}
function endSession() {
	const isolationScope = getIsolationScope();
	const session = getCurrentScope().getSession() || isolationScope.getSession();
	if (session) closeSession(session);
	_sendSessionUpdate();
	isolationScope.setSession();
}
function _sendSessionUpdate() {
	const isolationScope = getIsolationScope();
	const client = getClient();
	const session = isolationScope.getSession();
	if (session && client) client.captureSession(session);
}
function safeUnref(timer) {
	if (typeof timer === "object" && typeof timer.unref === "function") timer.unref();
	return timer;
}
function waitForTracingChannelBinding(callback, retries = 1) {
	if (getAsyncContextStrategy(getMainCarrier()).getTracingChannelBinding?.()) {
		callback();
		return;
	}
	if (!retries) return;
	safeUnref(setTimeout(() => {
		waitForTracingChannelBinding(callback, retries - 1);
	}, 1));
}
function getBaseApiEndpoint(dsn) {
	const protocol = dsn.protocol ? `${dsn.protocol}:` : "";
	const port = dsn.port ? `:${dsn.port}` : "";
	return `${protocol}//${dsn.host}${port}${dsn.path ? `/${dsn.path}` : ""}/api/`;
}
function _getIngestEndpoint(dsn) {
	return `${getBaseApiEndpoint(dsn)}${dsn.projectId}/envelope/`;
}
function _encodedAuth(dsn, sdkInfo) {
	const params = { sentry_version: "7" };
	if (dsn.publicKey) params.sentry_key = dsn.publicKey;
	if (sdkInfo) params.sentry_client = `${sdkInfo.name}/${sdkInfo.version}`;
	return new URLSearchParams(params).toString();
}
function getEnvelopeEndpointWithUrlEncodedAuth(dsn, tunnel, sdkInfo) {
	return tunnel ? tunnel : `${_getIngestEndpoint(dsn)}?${_encodedAuth(dsn, sdkInfo)}`;
}
var installedIntegrations = [];
function filterDuplicates(integrations) {
	const integrationsByName = {};
	integrations.forEach((currentInstance) => {
		const { name } = currentInstance;
		const existingInstance = integrationsByName[name];
		if (existingInstance && !existingInstance.isDefaultInstance && currentInstance.isDefaultInstance) return;
		integrationsByName[name] = currentInstance;
	});
	return Object.values(integrationsByName);
}
function getIntegrationsToSetup(options) {
	const defaultIntegrations = options.defaultIntegrations || [];
	const userIntegrations = options.integrations;
	defaultIntegrations.forEach((integration) => {
		integration.isDefaultInstance = true;
	});
	let integrations;
	if (Array.isArray(userIntegrations)) integrations = [...defaultIntegrations, ...userIntegrations];
	else if (typeof userIntegrations === "function") {
		const resolvedUserIntegrations = userIntegrations(defaultIntegrations);
		integrations = Array.isArray(resolvedUserIntegrations) ? resolvedUserIntegrations : [resolvedUserIntegrations];
	} else integrations = defaultIntegrations;
	return filterDuplicates(integrations);
}
function setupIntegrations(client, integrations) {
	const integrationIndex = {};
	integrations.forEach((integration) => {
		if (integration?.beforeSetup) integration.beforeSetup(client);
	});
	integrations.forEach((integration) => {
		if (integration) setupIntegration(client, integration, integrationIndex);
	});
	return integrationIndex;
}
function afterSetupIntegrations(client, integrations) {
	for (const integration of integrations) if (integration?.afterAllSetup) integration.afterAllSetup(client);
}
function setupIntegration(client, integration, integrationIndex) {
	if (integrationIndex[integration.name]) {
		DEBUG_BUILD$4 && debug.log(`Integration skipped because it was already installed: ${integration.name}`);
		return;
	}
	integrationIndex[integration.name] = integration;
	if (!installedIntegrations.includes(integration.name) && typeof integration.setupOnce === "function") {
		integration.setupOnce();
		installedIntegrations.push(integration.name);
	}
	if (integration.setup && typeof integration.setup === "function") integration.setup(client);
	if (typeof integration.preprocessEvent === "function") {
		const callback = integration.preprocessEvent.bind(integration);
		client.on("preprocessEvent", (event, hint) => callback(event, hint, client));
	}
	if (typeof integration.processEvent === "function") {
		const callback = integration.processEvent.bind(integration);
		const processor = Object.assign((event, hint) => callback(event, hint, client), { id: integration.name });
		client.addEventProcessor(processor);
	}
	["processSpan", "processSegmentSpan"].forEach((hook) => {
		const callback = integration[hook];
		if (typeof callback === "function") client.on(hook, (span) => callback.call(integration, span, client));
	});
	DEBUG_BUILD$4 && debug.log(`Integration installed: ${integration.name}`);
}
function addIntegration(integration) {
	const client = getClient();
	if (!client) {
		DEBUG_BUILD$4 && debug.warn(`Cannot add integration "${integration.name}" because no SDK Client is available.`);
		return;
	}
	client.addIntegration(integration);
}
function defineIntegration(fn) {
	return fn;
}
function extendIntegration(integration, extendedIntegration) {
	const wrappedIntegration = {
		...integration,
		...extendedIntegration
	};
	for (const key in extendedIntegration) {
		const baseValue = integration[key];
		const extendedValue = extendedIntegration[key];
		if (typeof baseValue === "function" && typeof extendedValue === "function") wrappedIntegration[key] = new Proxy(baseValue, { apply: (target, thisArg, args) => {
			Reflect.apply(target, thisArg, args);
			return Reflect.apply(extendedValue, thisArg, args);
		} });
	}
	return wrappedIntegration;
}
function _getTraceInfoFromScope(client, scope) {
	if (!scope) return [void 0, void 0];
	return withScope(scope, () => {
		const span = getActiveSpan$1();
		const traceContext = span ? spanToTraceContext(span) : getTraceContextFromScope(scope);
		return [span ? getDynamicSamplingContextFromSpan(span) : getDynamicSamplingContextFromScope(client, scope), traceContext];
	});
}
function isBrowserBundle() {
	return typeof __SENTRY_BROWSER_BUNDLE__ !== "undefined" && !!__SENTRY_BROWSER_BUNDLE__;
}
/*! __SENTRY_SDK_SOURCE__ */
function isNodeEnv() {
	return !isBrowserBundle() && Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
}
function isBrowser() {
	return typeof window !== "undefined" && (!isNodeEnv() || isElectronNodeRenderer());
}
function isElectronNodeRenderer() {
	return GLOBAL_OBJ.process?.type === "renderer";
}
function createLogContainerEnvelopeItem(items, inferUserData) {
	const inferSetting = inferUserData ? "auto" : "never";
	return [{
		type: "log",
		item_count: items.length,
		content_type: "application/vnd.sentry.items.log+json"
	}, {
		version: 2,
		...isBrowser() && { ingest_settings: {
			infer_ip: inferSetting,
			infer_user_agent: inferSetting
		} },
		items
	}];
}
function createLogEnvelope(logs, metadata, tunnel, dsn, inferUserData) {
	const headers = {};
	if (metadata?.sdk) headers.sdk = {
		name: metadata.sdk.name,
		version: metadata.sdk.version
	};
	if (!!tunnel && !!dsn) headers.dsn = dsnToString(dsn);
	return createEnvelope(headers, [createLogContainerEnvelopeItem(logs, inferUserData)]);
}
function _INTERNAL_flushLogsBuffer(client, maybeLogBuffer) {
	const logBuffer = maybeLogBuffer ?? _INTERNAL_getLogBuffer(client) ?? [];
	if (logBuffer.length === 0) return;
	const clientOptions = client.getOptions();
	const envelope = createLogEnvelope(logBuffer, clientOptions._metadata, clientOptions.tunnel, client.getDsn(), client.getDataCollectionOptions().userInfo);
	_getBufferMap$1().set(client, []);
	client.emit("flushLogs");
	client.sendEnvelope(envelope);
}
function _INTERNAL_getLogBuffer(client) {
	return _getBufferMap$1().get(client);
}
function _getBufferMap$1() {
	return getGlobalSingleton("clientToLogBufferMap", () => /* @__PURE__ */ new WeakMap());
}
function createMetricContainerEnvelopeItem(items, inferUserData) {
	const inferSetting = inferUserData ? "auto" : "never";
	return [{
		type: "trace_metric",
		item_count: items.length,
		content_type: "application/vnd.sentry.items.trace-metric+json"
	}, {
		version: 2,
		...isBrowser() && { ingest_settings: {
			infer_ip: inferSetting,
			infer_user_agent: inferSetting
		} },
		items
	}];
}
function createMetricEnvelope(metrics, metadata, tunnel, dsn, inferUserData) {
	const headers = {};
	if (metadata?.sdk) headers.sdk = {
		name: metadata.sdk.name,
		version: metadata.sdk.version
	};
	if (!!tunnel && !!dsn) headers.dsn = dsnToString(dsn);
	return createEnvelope(headers, [createMetricContainerEnvelopeItem(metrics, inferUserData)]);
}
function _INTERNAL_flushMetricsBuffer(client, maybeMetricBuffer) {
	const metricBuffer = maybeMetricBuffer ?? _INTERNAL_getMetricBuffer(client) ?? [];
	if (metricBuffer.length === 0) return;
	const clientOptions = client.getOptions();
	const envelope = createMetricEnvelope(metricBuffer, clientOptions._metadata, clientOptions.tunnel, client.getDsn(), client.getDataCollectionOptions().userInfo);
	_getBufferMap().set(client, []);
	client.emit("flushMetrics");
	client.sendEnvelope(envelope);
}
function _INTERNAL_getMetricBuffer(client) {
	return _getBufferMap().get(client);
}
function _getBufferMap() {
	return getGlobalSingleton("clientToMetricBufferMap", () => /* @__PURE__ */ new WeakMap());
}
function spanJsonToSerializedStreamedSpan(span) {
	return streamedSpanJsonToSerializedSpan({
		trace_id: span.trace_id,
		span_id: span.span_id,
		parent_span_id: span.parent_span_id,
		name: span.description || "",
		start_timestamp: span.start_timestamp,
		end_timestamp: span.timestamp || span.start_timestamp,
		status: !span.status || span.status === "ok" || span.status === "cancelled" ? "ok" : "error",
		is_segment: false,
		attributes: { ...span.data },
		links: span.links
	});
}
function extractGenAiSpansFromEvent(event, client) {
	if (event.type !== "transaction" || !event.spans?.length || !event.sdkProcessingMetadata?.hasGenAiSpans || client.getOptions().streamGenAiSpans === false || hasSpanStreamingEnabled(client)) return;
	const genAiSpans = [];
	const remainingSpans = [];
	for (const span of event.spans) if (span.op?.startsWith("gen_ai.")) genAiSpans.push(spanJsonToSerializedStreamedSpan(span));
	else remainingSpans.push(span);
	if (genAiSpans.length === 0) return;
	event.spans = remainingSpans;
	const inferSetting = client.getDataCollectionOptions().userInfo ? "auto" : "never";
	return [{
		type: "span",
		item_count: genAiSpans.length,
		content_type: "application/vnd.sentry.items.span.v2+json"
	}, {
		version: 2,
		...isBrowser() && { ingest_settings: {
			infer_ip: inferSetting,
			infer_user_agent: inferSetting
		} },
		items: genAiSpans
	}];
}
var SENTRY_BUFFER_FULL_ERROR = /* @__PURE__ */ Symbol.for("SentryBufferFullError");
function makePromiseBuffer(limit = 100) {
	const buffer = /* @__PURE__ */ new Set();
	function isReady() {
		return buffer.size < limit;
	}
	function remove(task) {
		buffer.delete(task);
	}
	function add(taskProducer) {
		if (!isReady()) return rejectedSyncPromise(SENTRY_BUFFER_FULL_ERROR);
		const task = taskProducer();
		buffer.add(task);
		task.then(() => remove(task), () => remove(task));
		return task;
	}
	function drain(timeout) {
		if (!buffer.size) return resolvedSyncPromise(true);
		const drainPromise = Promise.allSettled(Array.from(buffer)).then(() => true);
		if (!timeout) return drainPromise;
		const promises = [drainPromise, new Promise((resolve) => safeUnref(setTimeout(() => resolve(false), timeout)))];
		return Promise.race(promises);
	}
	return {
		get $() {
			return Array.from(buffer);
		},
		add,
		drain
	};
}
var DEFAULT_RETRY_AFTER = 6e4;
function parseRetryAfterHeader(header, now = safeDateNow()) {
	const headerDelay = parseInt(`${header}`, 10);
	if (!isNaN(headerDelay)) return headerDelay * 1e3;
	const headerDate = Date.parse(`${header}`);
	if (!isNaN(headerDate)) return headerDate - now;
	return DEFAULT_RETRY_AFTER;
}
function disabledUntil(limits, dataCategory) {
	return limits[dataCategory] || limits.all || 0;
}
function isRateLimited(limits, dataCategory, now = safeDateNow()) {
	return disabledUntil(limits, dataCategory) > now;
}
function updateRateLimits(limits, { statusCode, headers }, now = safeDateNow()) {
	const updatedRateLimits = { ...limits };
	const rateLimitHeader = headers?.["x-sentry-rate-limits"];
	const retryAfterHeader = headers?.["retry-after"];
	if (rateLimitHeader) for (const limit of rateLimitHeader.trim().split(",")) {
		const [retryAfter, categories, , , namespaces] = limit.split(":", 5);
		const headerDelay = parseInt(retryAfter, 10);
		const delay = (!isNaN(headerDelay) ? headerDelay : 60) * 1e3;
		if (!categories) updatedRateLimits.all = now + delay;
		else for (const category of categories.split(";")) if (category === "metric_bucket") {
			if (!namespaces || namespaces.split(";").includes("custom")) updatedRateLimits[category] = now + delay;
		} else updatedRateLimits[category] = now + delay;
	}
	else if (retryAfterHeader) updatedRateLimits.all = now + parseRetryAfterHeader(retryAfterHeader, now);
	else if (statusCode === 429) updatedRateLimits.all = now + 6e4;
	return updatedRateLimits;
}
function createTransport(options, makeRequest, buffer = makePromiseBuffer(options.bufferSize || 64)) {
	let rateLimits = {};
	const flush = (timeout) => buffer.drain(timeout);
	function send(envelope) {
		const filteredEnvelopeItems = [];
		forEachEnvelopeItem(envelope, (item, type) => {
			const dataCategory = envelopeItemTypeToDataCategory(type);
			if (isRateLimited(rateLimits, dataCategory)) options.recordDroppedEvent("ratelimit_backoff", dataCategory);
			else filteredEnvelopeItems.push(item);
		});
		if (filteredEnvelopeItems.length === 0) return Promise.resolve({});
		const filteredEnvelope = createEnvelope(envelope[0], filteredEnvelopeItems);
		const recordEnvelopeLoss = (reason) => {
			if (envelopeContainsItemType(filteredEnvelope, ["client_report"])) {
				DEBUG_BUILD$4 && debug.warn(`Dropping client report. Will not send outcomes (reason: ${reason}).`);
				return;
			}
			forEachEnvelopeItem(filteredEnvelope, (item, type) => {
				options.recordDroppedEvent(reason, envelopeItemTypeToDataCategory(type));
			});
		};
		const requestTask = () => makeRequest({ body: serializeEnvelope(filteredEnvelope) }).then((response) => {
			if (response.statusCode === 413) {
				DEBUG_BUILD$4 && debug.error("Sentry responded with status code 413. Envelope was discarded due to exceeding size limits.");
				recordEnvelopeLoss("send_error");
				return response;
			}
			if (DEBUG_BUILD$4 && response.statusCode !== void 0 && (response.statusCode < 200 || response.statusCode >= 300)) debug.warn(`Sentry responded with status code ${response.statusCode} to sent event.`);
			rateLimits = updateRateLimits(rateLimits, response);
			return response;
		}, (error) => {
			recordEnvelopeLoss("network_error");
			DEBUG_BUILD$4 && debug.error("Encountered error running transport request:", error);
			throw error;
		});
		return buffer.add(requestTask).then((result) => result, (error) => {
			if (error === SENTRY_BUFFER_FULL_ERROR) {
				DEBUG_BUILD$4 && debug.error("Skipped sending event because buffer is full.");
				recordEnvelopeLoss("queue_overflow");
				return Promise.resolve({});
			} else throw error;
		});
	}
	return {
		send,
		flush
	};
}
function createClientReportEnvelope(discarded_events, dsn, timestamp) {
	const clientReportItem = [{ type: "client_report" }, {
		timestamp: timestamp || dateTimestampInSeconds(),
		discarded_events
	}];
	return createEnvelope(dsn ? { dsn } : {}, [clientReportItem]);
}
function getPossibleEventMessages(event) {
	const possibleMessages = [];
	if (event.message) possibleMessages.push(event.message);
	try {
		const lastException = event.exception.values[event.exception.values.length - 1];
		if (lastException?.value) {
			possibleMessages.push(lastException.value);
			if (lastException.type) possibleMessages.push(`${lastException.type}: ${lastException.value}`);
		}
	} catch {}
	return possibleMessages;
}
function convertTransactionEventToSpanJson(event) {
	const { trace_id, parent_span_id, span_id, status, origin, data, op } = event.contexts?.trace ?? {};
	return {
		data: data ?? {},
		description: event.transaction,
		op,
		parent_span_id,
		span_id: span_id ?? "",
		start_timestamp: event.start_timestamp ?? 0,
		status,
		timestamp: event.timestamp,
		trace_id: trace_id ?? "",
		origin,
		profile_id: data?.[SEMANTIC_ATTRIBUTE_PROFILE_ID],
		exclusive_time: data?.[SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME],
		measurements: event.measurements,
		is_segment: true
	};
}
function convertSpanJsonToTransactionEvent(span) {
	return {
		type: "transaction",
		timestamp: span.timestamp,
		start_timestamp: span.start_timestamp,
		transaction: span.description,
		contexts: { trace: {
			trace_id: span.trace_id,
			span_id: span.span_id,
			parent_span_id: span.parent_span_id,
			op: span.op,
			status: span.status,
			origin: span.origin,
			data: {
				...span.data,
				...span.profile_id && { ["sentry.profile_id"]: span.profile_id },
				...span.exclusive_time && { ["sentry.exclusive_time"]: span.exclusive_time }
			}
		} },
		measurements: span.measurements
	};
}
var FILTERED_VALUE = "[Filtered]";
var PII_HEADER_SNIPPETS = [
	"forwarded",
	"-ip",
	"remote-",
	"via",
	"-user"
];
var SENSITIVE_KEY_SNIPPETS = [
	"auth",
	"token",
	"secret",
	"session",
	"password",
	"passwd",
	"pwd",
	"key",
	"jwt",
	"bearer",
	"sso",
	"saml",
	"csrf",
	"xsrf",
	"credentials",
	"sid",
	"identity",
	"set-cookie",
	"cookie"
];
var SENSITIVE_COOKIE_NAME_SNIPPETS = [
	".sid",
	"sessid",
	"remember",
	"oidc",
	"pkce",
	"nonce",
	"__secure-",
	"__host-",
	"awsalb",
	"awselb",
	"akamai",
	"__stripe",
	"cognito",
	"firebase",
	"supabase",
	"sb-",
	"mfa",
	"2fa"
];
function defaultPiiToCollectionOptions(sendDefaultPii) {
	return sendDefaultPii === true ? {
		userInfo: true,
		cookies: true,
		httpHeaders: {
			request: true,
			response: true
		},
		httpBodies: [
			"incomingRequest",
			"outgoingRequest",
			"incomingResponse",
			"outgoingResponse"
		],
		urlQueryParams: true,
		graphQL: {
			document: true,
			variables: true
		},
		genAI: {
			inputs: true,
			outputs: true
		},
		databaseQueryData: true,
		stackFrameVariables: true,
		frameContextLines: 7
	} : {
		userInfo: false,
		cookies: { deny: PII_HEADER_SNIPPETS },
		httpHeaders: {
			request: { deny: PII_HEADER_SNIPPETS },
			response: { deny: PII_HEADER_SNIPPETS }
		},
		httpBodies: [],
		urlQueryParams: { deny: PII_HEADER_SNIPPETS },
		graphQL: {
			document: true,
			variables: true
		},
		genAI: {
			inputs: false,
			outputs: false
		},
		databaseQueryData: false,
		stackFrameVariables: true,
		frameContextLines: 7
	};
}
var DEFAULTS = {
	userInfo: true,
	cookies: true,
	httpHeaders: {
		request: true,
		response: true
	},
	httpBodies: [
		"incomingRequest",
		"outgoingRequest",
		"incomingResponse",
		"outgoingResponse"
	],
	urlQueryParams: true,
	graphQL: {
		document: true,
		variables: true
	},
	genAI: {
		inputs: true,
		outputs: true
	},
	databaseQueryData: true,
	stackFrameVariables: true,
	frameContextLines: 5
};
function resolveDataCollectionOptions(options) {
	const base = options.dataCollection != null ? DEFAULTS : defaultPiiToCollectionOptions(options.sendDefaultPii);
	const dc = options.dataCollection ?? {};
	return {
		userInfo: dc.userInfo ?? base.userInfo,
		cookies: dc.cookies ?? base.cookies,
		httpHeaders: {
			request: dc.httpHeaders?.request ?? base.httpHeaders.request,
			response: dc.httpHeaders?.response ?? base.httpHeaders.response
		},
		httpBodies: dc.httpBodies ?? base.httpBodies,
		urlQueryParams: dc.urlQueryParams ?? dc.queryParams ?? base.urlQueryParams,
		graphQL: {
			document: dc.graphQL?.document ?? base.graphQL.document,
			variables: dc.graphQL?.variables ?? base.graphQL.variables
		},
		genAI: {
			inputs: dc.genAI?.inputs ?? base.genAI.inputs,
			outputs: dc.genAI?.outputs ?? base.genAI.outputs
		},
		databaseQueryData: dc.databaseQueryData ?? base.databaseQueryData,
		stackFrameVariables: dc.stackFrameVariables ?? base.stackFrameVariables,
		frameContextLines: dc.frameContextLines ?? base.frameContextLines
	};
}
var ALREADY_SEEN_ERROR = "Not capturing exception because it's already been captured.";
var MISSING_RELEASE_FOR_SESSION_ERROR = "Discarded session because of missing or non-string release";
var INTERNAL_ERROR_SYMBOL = /* @__PURE__ */ Symbol.for("SentryInternalError");
var DO_NOT_SEND_EVENT_SYMBOL = /* @__PURE__ */ Symbol.for("SentryDoNotSendEventError");
var DEFAULT_FLUSH_INTERVAL = 5e3;
function _makeInternalError(message) {
	return {
		message,
		[INTERNAL_ERROR_SYMBOL]: true
	};
}
function _makeDoNotSendEventError(message) {
	return {
		message,
		[DO_NOT_SEND_EVENT_SYMBOL]: true
	};
}
function _isInternalError(error) {
	return isObjectLike(error) && INTERNAL_ERROR_SYMBOL in error;
}
function _isDoNotSendEventError(error) {
	return isObjectLike(error) && DO_NOT_SEND_EVENT_SYMBOL in error;
}
function setupWeightBasedFlushing(client, afterCaptureHook, flushHook, estimateSizeFn, flushFn) {
	let weight = 0;
	let flushTimeout;
	let isTimerActive = false;
	client.on(flushHook, () => {
		weight = 0;
		clearTimeout(flushTimeout);
		isTimerActive = false;
	});
	client.on(afterCaptureHook, (item) => {
		weight += estimateSizeFn(item);
		if (weight >= 8e5) flushFn(client);
		else if (!isTimerActive) {
			const flushInterval = client.getOptions()._flushInterval ?? DEFAULT_FLUSH_INTERVAL;
			if (flushInterval > 0) {
				isTimerActive = true;
				flushTimeout = safeUnref(setTimeout(() => {
					flushFn(client);
				}, flushInterval));
			}
		}
	});
	client.on("flush", () => {
		flushFn(client);
	});
}
var Client = class {
	/**
	* Initializes this client instance.
	*
	* @param options Options for the client.
	*/
	constructor(options) {
		this._options = options;
		this._integrations = {};
		this._numProcessing = 0;
		this._outcomes = {};
		this._hooks = {};
		this._eventProcessors = [];
		this._promiseBuffer = makePromiseBuffer(options.transportOptions?.bufferSize ?? 64);
		this._dataCollection = resolveDataCollectionOptions(options);
		if (options.dsn) this._dsn = makeDsn(options.dsn);
		else DEBUG_BUILD$4 && debug.warn("No DSN provided, client will not send events.");
		if (this._dsn) {
			const url = getEnvelopeEndpointWithUrlEncodedAuth(this._dsn, options.tunnel, options._metadata ? options._metadata.sdk : void 0);
			this._transport = options.transport({
				tunnel: this._options.tunnel,
				recordDroppedEvent: this.recordDroppedEvent.bind(this),
				...options.transportOptions,
				url
			});
		}
		this._options.enableLogs = this._options.enableLogs ?? this._options._experiments?.enableLogs ?? true;
		if (this._options.enableLogs) setupWeightBasedFlushing(this, "afterCaptureLog", "flushLogs", estimateLogSizeInBytes, _INTERNAL_flushLogsBuffer);
		if (this._options.enableMetrics ?? this._options._experiments?.enableMetrics ?? true) setupWeightBasedFlushing(this, "afterCaptureMetric", "flushMetrics", estimateMetricSizeInBytes, _INTERNAL_flushMetricsBuffer);
	}
	/**
	* Captures an exception event and sends it to Sentry.
	*
	* Unlike `captureException` exported from every SDK, this method requires that you pass it the current scope.
	*/
	captureException(exception, hint, scope) {
		const eventId = uuid4();
		if (checkOrSetAlreadyCaught(exception)) {
			DEBUG_BUILD$4 && debug.log(ALREADY_SEEN_ERROR);
			return eventId;
		}
		const hintWithEventId = {
			event_id: eventId,
			...hint
		};
		this._process(() => this.eventFromException(exception, hintWithEventId).then((event) => this._captureEvent(event, hintWithEventId, scope)).then((res) => res), "error");
		return hintWithEventId.event_id;
	}
	/**
	* Captures a message event and sends it to Sentry.
	*
	* Unlike `captureMessage` exported from every SDK, this method requires that you pass it the current scope.
	*/
	captureMessage(message, level, hint, currentScope) {
		const hintWithEventId = {
			event_id: uuid4(),
			...hint
		};
		const eventMessage = isParameterizedString(message) ? message : String(message);
		const isMessage = isPrimitive(message);
		const promisedEvent = isMessage ? this.eventFromMessage(eventMessage, level, hintWithEventId) : this.eventFromException(message, hintWithEventId);
		this._process(() => promisedEvent.then((event) => this._captureEvent(event, hintWithEventId, currentScope)), isMessage ? "unknown" : "error");
		return hintWithEventId.event_id;
	}
	/**
	* Captures a manually created event and sends it to Sentry.
	*
	* Unlike `captureEvent` exported from every SDK, this method requires that you pass it the current scope.
	*/
	captureEvent(event, hint, currentScope) {
		const eventId = uuid4();
		if (hint?.originalException && checkOrSetAlreadyCaught(hint.originalException)) {
			DEBUG_BUILD$4 && debug.log(ALREADY_SEEN_ERROR);
			return eventId;
		}
		const hintWithEventId = {
			event_id: eventId,
			...hint
		};
		const sdkProcessingMetadata = event.sdkProcessingMetadata || {};
		const capturedSpanScope = sdkProcessingMetadata.capturedSpanScope;
		const capturedSpanIsolationScope = sdkProcessingMetadata.capturedSpanIsolationScope;
		const dataCategory = getDataCategoryByType(event.type);
		this._process(() => this._captureEvent(event, hintWithEventId, capturedSpanScope || currentScope, capturedSpanIsolationScope), dataCategory);
		return hintWithEventId.event_id;
	}
	/**
	* Captures a session.
	*/
	captureSession(session) {
		this.sendSession(session);
		updateSession(session, { init: false });
	}
	/**
	* Get the current Dsn.
	*/
	getDsn() {
		return this._dsn;
	}
	/**
	* Get the current options.
	*/
	getOptions() {
		return this._options;
	}
	/**
	* Get the resolved data collection configuration.
	*/
	getDataCollectionOptions() {
		return this._dataCollection;
	}
	/**
	* Get the SDK metadata.
	* @see SdkMetadata
	*/
	getSdkMetadata() {
		return this._options._metadata;
	}
	/**
	* Returns the transport that is used by the client.
	* Please note that the transport gets lazy initialized so it will only be there once the first event has been sent.
	*/
	getTransport() {
		return this._transport;
	}
	/**
	* Wait for all events to be sent or the timeout to expire, whichever comes first.
	*
	* @param timeout Maximum time in ms the client should wait for events to be flushed. Omitting this parameter will
	*   cause the client to wait until all events are sent before resolving the promise.
	* @returns A promise that will resolve with `true` if all events are sent before the timeout, or `false` if there are
	* still events in the queue when the timeout is reached.
	*/
	async flush(timeout) {
		const transport = this._transport;
		this.emit("flush");
		if (!transport) return true;
		const clientFinished = await this._isClientDoneProcessing(timeout);
		const transportFlushed = await transport.flush(timeout);
		return clientFinished && transportFlushed;
	}
	/**
	* Flush the event queue and set the client to `enabled = false`. See {@link Client.flush}.
	*
	* @param {number} timeout Maximum time in ms the client should wait before shutting down. Omitting this parameter will cause
	*   the client to wait until all events are sent before disabling itself.
	* @returns {Promise<boolean>} A promise which resolves to `true` if the flush completes successfully before the timeout, or `false` if
	* it doesn't.
	*/
	async close(timeout) {
		const result = await this.flush(timeout);
		this.getOptions().enabled = false;
		this.emit("close");
		return result;
	}
	/**
	* Get all installed event processors.
	*/
	getEventProcessors() {
		return this._eventProcessors;
	}
	/**
	* Adds an event processor that applies to any event processed by this client.
	*/
	addEventProcessor(eventProcessor) {
		this._eventProcessors.push(eventProcessor);
	}
	/**
	* Initialize this client.
	* Call this after the client was set on a scope.
	*/
	init() {
		if (this._isEnabled() || this._options.integrations.some(({ name }) => name.startsWith("Spotlight"))) this._setupIntegrations();
	}
	/**
	* Gets an installed integration by its name.
	*
	* @returns {Integration|undefined} The installed integration or `undefined` if no integration with that `name` was installed.
	*/
	getIntegrationByName(integrationName) {
		return this._integrations[integrationName];
	}
	/**
	* Returns the names of all installed integrations.
	*/
	getIntegrationNames() {
		return Object.keys(this._integrations);
	}
	/**
	* Add an integration to the client.
	* This can be used to e.g. lazy load integrations.
	* In most cases, this should not be necessary,
	* and you're better off just passing the integrations via `integrations: []` at initialization time.
	* However, if you find the need to conditionally load & add an integration, you can use `addIntegration` to do so.
	*/
	addIntegration(integration) {
		const isAlreadyInstalled = this._integrations[integration.name];
		if (!isAlreadyInstalled && integration.beforeSetup) integration.beforeSetup(this);
		setupIntegration(this, integration, this._integrations);
		if (!isAlreadyInstalled) afterSetupIntegrations(this, [integration]);
	}
	/**
	* Send a fully prepared event to Sentry.
	*/
	sendEvent(event, hint = {}) {
		this.emit("beforeSendEvent", event, hint);
		const genAiSpanItem = extractGenAiSpansFromEvent(event, this);
		let env = createEventEnvelope(event, this._dsn, this._options._metadata, this._options.tunnel);
		for (const attachment of hint.attachments || []) env = addItemToEnvelope(env, createAttachmentEnvelopeItem(attachment));
		if (genAiSpanItem) env = addItemToEnvelope(env, genAiSpanItem);
		this.sendEnvelope(env).then((sendResponse) => this.emit("afterSendEvent", event, sendResponse));
	}
	/**
	* Send a session or session aggregrates to Sentry.
	*/
	sendSession(session) {
		const { release: clientReleaseOption, environment: clientEnvironmentOption = DEFAULT_ENVIRONMENT } = this._options;
		if ("aggregates" in session) {
			const sessionAttrs = session.attrs || {};
			if (!sessionAttrs.release && !clientReleaseOption) {
				DEBUG_BUILD$4 && debug.warn(MISSING_RELEASE_FOR_SESSION_ERROR);
				return;
			}
			sessionAttrs.release = sessionAttrs.release || clientReleaseOption;
			sessionAttrs.environment = sessionAttrs.environment || clientEnvironmentOption;
			session.attrs = sessionAttrs;
		} else {
			if (!session.release && !clientReleaseOption) {
				DEBUG_BUILD$4 && debug.warn(MISSING_RELEASE_FOR_SESSION_ERROR);
				return;
			}
			session.release = session.release || clientReleaseOption;
			session.environment = session.environment || clientEnvironmentOption;
		}
		this.emit("beforeSendSession", session);
		const env = createSessionEnvelope(session, this._dsn, this._options._metadata, this._options.tunnel);
		this.sendEnvelope(env);
	}
	/**
	* Record on the client that an event got dropped (ie, an event that will not be sent to Sentry).
	*/
	recordDroppedEvent(reason, category, count = 1) {
		if (this._options.sendClientReports) {
			const key = `${reason}:${category}`;
			DEBUG_BUILD$4 && debug.log(`Recording outcome: "${key}"${count > 1 ? ` (${count} times)` : ""}`);
			this._outcomes[key] = (this._outcomes[key] || 0) + count;
		}
	}
	/**
	* Register a hook on this client.
	*/
	on(hook, callback) {
		const hookCallbacks = this._hooks[hook] = this._hooks[hook] || /* @__PURE__ */ new Set();
		const uniqueCallback = (...args) => callback(...args);
		hookCallbacks.add(uniqueCallback);
		return () => {
			hookCallbacks.delete(uniqueCallback);
		};
	}
	/**
	* Emit a hook that was previously registered via `on()`.
	*/
	emit(hook, ...rest) {
		const callbacks = this._hooks[hook];
		if (callbacks) callbacks.forEach((callback) => callback(...rest));
	}
	/**
	* Send an envelope to Sentry.
	*/
	async sendEnvelope(envelope) {
		this.emit("beforeEnvelope", envelope);
		if (this._isEnabled() && this._transport) try {
			return await this._transport.send(envelope);
		} catch (reason) {
			DEBUG_BUILD$4 && debug.error("Error while sending envelope:", reason);
			return {};
		}
		DEBUG_BUILD$4 && debug.error("Transport disabled");
		return {};
	}
	/**
	* Register a cleanup function to be called when the client is disposed.
	* This is useful for integrations that need to clean up global state.
	*
	* NOTE: This is a no-op in the base `Client` class. Subclasses like `ServerRuntimeClient`
	* override this method to actually register and execute cleanup callbacks.
	*/
	registerCleanup(callback) {}
	/**
	* Disposes of the client and releases all resources.
	*
	* Subclasses should override this method to clean up their own resources, including invoking
	* any callbacks registered via {@link Client.registerCleanup}. The base implementation is a
	* no-op and does NOT execute registered cleanup callbacks.
	*
	* After calling dispose(), the client should not be used anymore.
	*/
	dispose() {}
	/** Setup integrations for this client. */
	_setupIntegrations() {
		const { integrations } = this._options;
		this._integrations = setupIntegrations(this, integrations);
		afterSetupIntegrations(this, integrations);
	}
	/** Updates existing session based on the provided event */
	_updateSessionFromEvent(session, event) {
		let crashed = event.level === "fatal";
		let errored = false;
		const exceptions = event.exception?.values;
		if (exceptions) {
			errored = true;
			crashed = false;
			for (const ex of exceptions) if (ex.mechanism?.handled === false) {
				crashed = true;
				break;
			}
		}
		const sessionNonTerminal = session.status === "ok";
		if (sessionNonTerminal && session.errors === 0 || sessionNonTerminal && crashed) {
			updateSession(session, {
				...crashed && { status: "crashed" },
				errors: session.errors || Number(errored || crashed)
			});
			this.captureSession(session);
		}
	}
	/**
	* Determine if the client is finished processing. Returns a promise because it will wait `timeout` ms before saying
	* "no" (resolving to `false`) in order to give the client a chance to potentially finish first.
	*
	* @param timeout The time, in ms, after which to resolve to `false` if the client is still busy. Passing `0` (or not
	* passing anything) will make the promise wait as long as it takes for processing to finish before resolving to
	* `true`.
	* @returns A promise which will resolve to `true` if processing is already done or finishes before the timeout, and
	* `false` otherwise
	*/
	async _isClientDoneProcessing(timeout) {
		let ticked = 0;
		while (!timeout || ticked < timeout) {
			await new Promise((resolve) => setTimeout(resolve, 1));
			if (!this._numProcessing) return true;
			ticked++;
		}
		return false;
	}
	/** Determines whether this SDK is enabled and a transport is present. */
	_isEnabled() {
		return this.getOptions().enabled !== false && this._transport !== void 0;
	}
	/**
	* Adds common information to events.
	*
	* The information includes release and environment from `options`,
	* breadcrumbs and context (extra, tags and user) from the scope.
	*
	* Information that is already present in the event is never overwritten. For
	* nested objects, such as the context, keys are merged.
	*
	* @param event The original event.
	* @param hint May contain additional information about the original exception.
	* @param currentScope A scope containing event metadata.
	* @returns A new event with more information.
	*/
	_prepareEvent(event, hint, currentScope, isolationScope) {
		const options = this.getOptions();
		const integrations = this.getIntegrationNames();
		if (!hint.integrations && integrations.length) hint.integrations = integrations;
		this.emit("preprocessEvent", event, hint);
		if (!event.type) isolationScope.setLastEventId(event.event_id || hint.event_id);
		return prepareEvent(options, event, hint, currentScope, this, isolationScope).then((evt) => {
			if (evt === null) return evt;
			this.emit("postprocessEvent", evt, hint);
			evt.contexts = {
				trace: {
					...evt.contexts?.trace,
					...getTraceContextFromScope(currentScope)
				},
				...evt.contexts
			};
			evt.sdkProcessingMetadata = {
				dynamicSamplingContext: getDynamicSamplingContextFromScope(this, currentScope),
				...evt.sdkProcessingMetadata
			};
			return evt;
		});
	}
	/**
	* Processes the event and logs an error in case of rejection
	* @param event
	* @param hint
	* @param scope
	*/
	_captureEvent(event, hint = {}, currentScope = getCurrentScope(), isolationScope = getIsolationScope()) {
		if (DEBUG_BUILD$4 && isErrorEvent$1(event)) debug.log(`Captured error event \`${getPossibleEventMessages(event)[0] || "<unknown>"}\``);
		return this._processEvent(event, hint, currentScope, isolationScope).then((finalEvent) => {
			return finalEvent.event_id;
		}, (reason) => {
			if (DEBUG_BUILD$4) {
				if (_isDoNotSendEventError(reason)) debug.log(reason.message);
				else if (_isInternalError(reason)) debug.warn(reason.message);
				else debug.warn(reason);
			}
		});
	}
	/**
	* Processes an event (either error or message) and sends it to Sentry.
	*
	* This also adds breadcrumbs and context information to the event. However,
	* platform specific meta data (such as the User's IP address) must be added
	* by the SDK implementor.
	*
	*
	* @param event The event to send to Sentry.
	* @param hint May contain additional information about the original exception.
	* @param currentScope A scope containing event metadata.
	* @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
	*/
	_processEvent(event, hint, currentScope, isolationScope) {
		const options = this.getOptions();
		const { sampleRate } = options;
		const isTransaction = isTransactionEvent(event);
		const isError = isErrorEvent$1(event);
		const beforeSendLabel = `before send for type \`${event.type || "error"}\``;
		const parsedSampleRate = typeof sampleRate === "undefined" ? void 0 : parseSampleRate(sampleRate);
		const dataCategory = getDataCategoryByType(event.type);
		return this._prepareEvent(event, hint, currentScope, isolationScope).then((prepared) => {
			if (prepared === null) {
				this.recordDroppedEvent("event_processor", dataCategory);
				throw _makeDoNotSendEventError("An event processor returned `null`, will not send event.");
			}
			if (hint.data?.__sentry__ === true) return prepared;
			return _validateBeforeSendResult(processBeforeSend(this, options, prepared, hint), beforeSendLabel);
		}).then((processedEvent) => {
			if (processedEvent === null) {
				this.recordDroppedEvent("before_send", dataCategory);
				if (isTransaction) {
					const spanCount = 1 + (event.spans || []).length;
					this.recordDroppedEvent("before_send", "span", spanCount);
				}
				throw _makeDoNotSendEventError(`${beforeSendLabel} returned \`null\`, will not send event.`);
			}
			const session = currentScope.getSession() || isolationScope.getSession();
			if (isError && session) this._updateSessionFromEvent(session, processedEvent);
			if (isError && typeof parsedSampleRate === "number" && safeMathRandom() > parsedSampleRate) {
				this.recordDroppedEvent("sample_rate", "error");
				throw _makeDoNotSendEventError(`Discarding event because it's not included in the random sample (sampling rate = ${sampleRate})`);
			}
			if (isTransaction) {
				const droppedSpanCount = (processedEvent.sdkProcessingMetadata?.spanCountBeforeProcessing || 0) - (processedEvent.spans ? processedEvent.spans.length : 0);
				if (droppedSpanCount > 0) this.recordDroppedEvent("before_send", "span", droppedSpanCount);
			}
			const transactionInfo = processedEvent.transaction_info;
			if (isTransaction && transactionInfo && processedEvent.transaction !== event.transaction) {
				const source = "custom";
				processedEvent.transaction_info = {
					...transactionInfo,
					source
				};
			}
			this.sendEvent(processedEvent, hint);
			return processedEvent;
		}).then(null, (reason) => {
			if (_isDoNotSendEventError(reason) || _isInternalError(reason)) throw reason;
			this.captureException(reason, {
				mechanism: {
					handled: false,
					type: "internal"
				},
				data: { __sentry__: true },
				originalException: reason
			});
			throw _makeInternalError(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${reason}`);
		});
	}
	/**
	* Occupies the client with processing and event
	*/
	_process(taskProducer, dataCategory) {
		this._numProcessing++;
		this._promiseBuffer.add(taskProducer).then((value) => {
			this._numProcessing--;
			return value;
		}, (reason) => {
			this._numProcessing--;
			if (reason === SENTRY_BUFFER_FULL_ERROR) this.recordDroppedEvent("queue_overflow", dataCategory);
			return reason;
		});
	}
	/**
	* Clears outcomes on this client and returns them.
	*/
	_clearOutcomes() {
		const outcomes = this._outcomes;
		this._outcomes = {};
		return Object.entries(outcomes).map(([key, quantity]) => {
			const [reason, category] = key.split(":");
			return {
				reason,
				category,
				quantity
			};
		});
	}
	/**
	* Sends client reports as an envelope.
	*/
	_flushOutcomes() {
		DEBUG_BUILD$4 && debug.log("Flushing outcomes...");
		const outcomes = this._clearOutcomes();
		if (outcomes.length === 0) {
			DEBUG_BUILD$4 && debug.log("No outcomes to send");
			return;
		}
		if (!this._dsn) {
			DEBUG_BUILD$4 && debug.log("No dsn provided, will not send outcomes");
			return;
		}
		DEBUG_BUILD$4 && debug.log("Sending outcomes:", outcomes);
		const envelope = createClientReportEnvelope(outcomes, this._options.tunnel && dsnToString(this._dsn));
		this.sendEnvelope(envelope);
	}
};
function getDataCategoryByType(type) {
	return type === "replay_event" ? "replay" : type || "error";
}
function _validateBeforeSendResult(beforeSendResult, beforeSendLabel) {
	const invalidValueError = `${beforeSendLabel} must return \`null\` or a valid event.`;
	if (isThenable(beforeSendResult)) return beforeSendResult.then((event) => {
		if (!isPlainObject(event) && event !== null) throw _makeInternalError(invalidValueError);
		return event;
	}, (e) => {
		throw _makeInternalError(`${beforeSendLabel} rejected with ${e}`);
	});
	else if (!isPlainObject(beforeSendResult) && beforeSendResult !== null) throw _makeInternalError(invalidValueError);
	return beforeSendResult;
}
function processBeforeSend(client, options, event, hint) {
	const { beforeSend, beforeSendTransaction, ignoreSpans } = options;
	const beforeSendSpan = !isStreamedBeforeSendSpanCallback(options.beforeSendSpan) && options.beforeSendSpan;
	let processedEvent = event;
	if (isErrorEvent$1(processedEvent) && beforeSend) return beforeSend(processedEvent, hint);
	if (isTransactionEvent(processedEvent)) {
		if (beforeSendSpan || ignoreSpans) {
			const rootSpanJson = convertTransactionEventToSpanJson(processedEvent);
			if (ignoreSpans?.length && shouldIgnoreSpan$1({
				description: rootSpanJson.description,
				op: rootSpanJson.op,
				attributes: rootSpanJson.data
			}, ignoreSpans)) return null;
			if (beforeSendSpan) {
				const processedRootSpanJson = beforeSendSpan(rootSpanJson);
				if (!processedRootSpanJson) showSpanDropWarning();
				else processedEvent = merge(event, convertSpanJsonToTransactionEvent(processedRootSpanJson));
			}
			if (processedEvent.spans) {
				const processedSpans = [];
				const initialSpans = processedEvent.spans;
				for (const span of initialSpans) {
					if (ignoreSpans?.length && shouldIgnoreSpan$1({
						description: span.description,
						op: span.op,
						attributes: span.data
					}, ignoreSpans)) {
						reparentChildSpans(initialSpans, span);
						continue;
					}
					if (beforeSendSpan) {
						const processedSpan = beforeSendSpan(span);
						if (!processedSpan) {
							showSpanDropWarning();
							processedSpans.push(span);
						} else processedSpans.push(processedSpan);
					} else processedSpans.push(span);
				}
				const droppedSpans = processedEvent.spans.length - processedSpans.length;
				if (droppedSpans) client.recordDroppedEvent("before_send", "span", droppedSpans);
				processedEvent.spans = processedSpans;
			}
		}
		if (beforeSendTransaction) {
			if (processedEvent.spans) {
				const spanCountBefore = processedEvent.spans.length;
				processedEvent.sdkProcessingMetadata = {
					...event.sdkProcessingMetadata,
					spanCountBeforeProcessing: spanCountBefore
				};
			}
			return beforeSendTransaction(processedEvent, hint);
		}
	}
	return processedEvent;
}
function isErrorEvent$1(event) {
	return event.type === void 0;
}
function isTransactionEvent(event) {
	return event.type === "transaction";
}
function estimateMetricSizeInBytes(metric) {
	let weight = 0;
	if (metric.name) weight += metric.name.length * 2;
	weight += 8;
	return weight + estimateAttributesSizeInBytes(metric.attributes);
}
function estimateLogSizeInBytes(log) {
	let weight = 0;
	if (log.message) weight += log.message.length * 2;
	return weight + estimateAttributesSizeInBytes(log.attributes);
}
function estimateAttributesSizeInBytes(attributes) {
	if (!attributes) return 0;
	let weight = 0;
	Object.values(attributes).forEach((value) => {
		if (Array.isArray(value)) weight += value.length * estimatePrimitiveSizeInBytes(value[0]);
		else if (isPrimitive(value)) weight += estimatePrimitiveSizeInBytes(value);
		else weight += 100;
	});
	return weight;
}
function estimatePrimitiveSizeInBytes(value) {
	if (typeof value === "string") return value.length * 2;
	else if (typeof value === "number") return 8;
	else if (typeof value === "boolean") return 4;
	return 0;
}
var SKIPPED_AI_PROVIDERS = /* @__PURE__ */ new Set();
function _INTERNAL_skipAiProviderWrapping(modules) {
	modules.forEach((module) => {
		SKIPPED_AI_PROVIDERS.add(module);
		DEBUG_BUILD$4 && debug.log(`AI provider "${module}" wrapping will be skipped`);
	});
}
function _INTERNAL_shouldSkipAiProviderWrapping(module) {
	return SKIPPED_AI_PROVIDERS.has(module);
}
function _INTERNAL_clearAiProviderSkips() {
	SKIPPED_AI_PROVIDERS.clear();
	DEBUG_BUILD$4 && debug.log("Cleared AI provider skip registrations");
}
function isSensitiveKey(lower, denySnippets) {
	return denySnippets.some((snippet) => lower.includes(snippet));
}
function filterKeyValueData(data, behavior, additionalDenyTerms) {
	if (behavior === false) return {};
	const denySnippets = additionalDenyTerms != null ? [...SENSITIVE_KEY_SNIPPETS, ...additionalDenyTerms] : SENSITIVE_KEY_SNIPPETS;
	const result = {};
	if (behavior === true) {
		for (const key of Object.keys(data)) result[key] = isSensitiveKey(key.toLowerCase(), denySnippets) ? FILTERED_VALUE : data[key];
		return result;
	}
	if ("deny" in behavior) {
		const lowerTerms2 = behavior.deny.map((t) => t.toLowerCase());
		for (const key of Object.keys(data)) {
			const lower = key.toLowerCase();
			result[key] = isSensitiveKey(lower, denySnippets) || lowerTerms2.some((term) => lower.includes(term)) ? FILTERED_VALUE : data[key];
		}
		return result;
	}
	const lowerTerms = behavior.allow.map((t) => t.toLowerCase());
	for (const key of Object.keys(data)) {
		const lower = key.toLowerCase();
		if (isSensitiveKey(lower, denySnippets)) result[key] = FILTERED_VALUE;
		else result[key] = lowerTerms.some((term) => lower.includes(term)) ? data[key] : FILTERED_VALUE;
	}
	return result;
}
function parseCookie(str) {
	const obj = {};
	let index = 0;
	while (index < str.length) {
		const eqIdx = str.indexOf("=", index);
		if (eqIdx === -1) break;
		let endIdx = str.indexOf(";", index);
		if (endIdx === -1) endIdx = str.length;
		else if (endIdx < eqIdx) {
			index = str.lastIndexOf(";", eqIdx - 1) + 1;
			continue;
		}
		const key = str.slice(index, eqIdx).trim();
		if (void 0 === obj[key]) {
			let val = str.slice(eqIdx + 1, endIdx).trim();
			if (val.charCodeAt(0) === 34) val = val.slice(1, -1);
			try {
				obj[key] = val.indexOf("%") !== -1 ? decodeURIComponent(val) : val;
			} catch {
				obj[key] = val;
			}
		}
		index = endIdx + 1;
	}
	return obj;
}
var FALSY_ENV_VALUES = /* @__PURE__ */ new Set([
	"false",
	"f",
	"n",
	"no",
	"off",
	"0"
]);
var TRUTHY_ENV_VALUES = /* @__PURE__ */ new Set([
	"true",
	"t",
	"y",
	"yes",
	"on",
	"1"
]);
function envToBool(value, options) {
	const normalized = String(value).toLowerCase();
	if (FALSY_ENV_VALUES.has(normalized)) return false;
	if (TRUTHY_ENV_VALUES.has(normalized)) return true;
	return options?.strict ? null : Boolean(value);
}
function createCheckInEnvelope(checkIn, dynamicSamplingContext, metadata, tunnel, dsn) {
	const headers = { sent_at: new Date(safeDateNow()).toISOString() };
	if (metadata?.sdk) headers.sdk = {
		name: metadata.sdk.name,
		version: metadata.sdk.version
	};
	if (!!tunnel && !!dsn) headers.dsn = dsnToString(dsn);
	if (dynamicSamplingContext) headers.trace = dynamicSamplingContext;
	return createEnvelope(headers, [createCheckInEnvelopeItem(checkIn)]);
}
function createCheckInEnvelopeItem(checkIn) {
	return [{ type: "check_in" }, checkIn];
}
var DEFAULT_BASE_URL = "thismessage:/";
function isURLObjectRelative(url) {
	return "isRelative" in url;
}
function parseStringToURLObject(url, urlBase) {
	const isRelative = url.indexOf("://") <= 0 && url.indexOf("//") !== 0;
	const base = urlBase ?? (isRelative ? DEFAULT_BASE_URL : void 0);
	try {
		if ("canParse" in URL && !URL.canParse(url, base)) return;
		const fullUrlObject = new URL(url, base);
		if (isRelative) return {
			isRelative,
			pathname: fullUrlObject.pathname,
			search: fullUrlObject.search,
			hash: fullUrlObject.hash
		};
		return fullUrlObject;
	} catch {}
}
function getSanitizedUrlStringFromUrlObject(url) {
	if (isURLObjectRelative(url)) return url.pathname;
	const newUrl = new URL(url);
	newUrl.search = "";
	newUrl.hash = "";
	if (["80", "443"].includes(newUrl.port)) newUrl.port = "";
	if (newUrl.password) newUrl.password = "%filtered%";
	if (newUrl.username) newUrl.username = "%filtered%";
	return newUrl.toString();
}
function getHttpSpanNameFromUrlObject(urlObject, kind, request, routeName) {
	return `${request?.method?.toUpperCase() ?? "GET"} ${routeName ? routeName : urlObject ? kind === "client" ? getSanitizedUrlStringFromUrlObject(urlObject) : urlObject.pathname : "/"}`;
}
function getHttpSpanDetailsFromUrlObject(urlObject, kind, spanOrigin, request, routeName) {
	const attributes = {
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: spanOrigin,
		[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url"
	};
	if (routeName) {
		attributes[kind === "server" ? "http.route" : "url.template"] = routeName;
		attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] = "route";
	}
	if (request?.method) attributes[SEMANTIC_ATTRIBUTE_HTTP_REQUEST_METHOD] = request.method.toUpperCase();
	if (urlObject) {
		if (urlObject.search) attributes["url.query"] = urlObject.search;
		if (urlObject.hash) attributes["url.fragment"] = urlObject.hash;
		if (urlObject.pathname) {
			attributes["url.path"] = urlObject.pathname;
			if (urlObject.pathname === "/") attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] = "route";
		}
		if (!isURLObjectRelative(urlObject)) {
			attributes[Yu] = urlObject.href;
			if (urlObject.port) attributes["url.port"] = urlObject.port;
			if (urlObject.protocol) attributes["url.scheme"] = urlObject.protocol;
			if (urlObject.hostname) attributes[kind === "server" ? "server.address" : "url.domain"] = urlObject.hostname;
		}
	}
	return [getHttpSpanNameFromUrlObject(urlObject, kind, request, routeName), attributes];
}
function parseUrl(url) {
	if (!url) return {};
	const match = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
	if (!match) return {};
	const query = match[6] || "";
	const fragment = match[8] || "";
	return {
		host: match[4],
		path: match[5],
		protocol: match[2],
		search: query,
		hash: fragment,
		relative: match[5] + query + fragment
	};
}
function stripUrlQueryAndFragment(urlPath) {
	return urlPath.split(/[?#]/, 1)[0];
}
function getSanitizedUrlString(url) {
	const { protocol, host, path } = url;
	const filteredHost = host?.replace(/^.*@/, "[filtered]:[filtered]@").replace(/(:80)$/, "").replace(/(:443)$/, "") || "";
	return `${protocol ? `${protocol}://` : ""}${filteredHost}${path}`;
}
function stripDataUrlContent(url, includeDataPrefix = true) {
	if (url.startsWith("data:")) {
		const match = url.match(/^data:([^;,]+)/);
		const mimeType = match ? match[1] : "text/plain";
		const isBase64 = url.includes(";base64,");
		const dataStart = url.indexOf(",");
		let dataPrefix = "";
		if (includeDataPrefix && dataStart !== -1) {
			const data = url.slice(dataStart + 1);
			dataPrefix = data.length > 10 ? `${data.slice(0, 10)}... [truncated]` : data;
		}
		return `data:${mimeType}${isBase64 ? ",base64" : ""}${dataPrefix ? `,${dataPrefix}` : ""}`;
	}
	return url;
}
function applySdkMetadata(options, name, names = [name], source = "npm") {
	const sdk = (options._metadata = options._metadata || {}).sdk = options._metadata.sdk || {};
	if (!sdk.name) {
		sdk.name = `sentry.javascript.${name}`;
		sdk.packages = names.map((name2) => ({
			name: `${source}:@sentry/${name2}`,
			version: SDK_VERSION
		}));
		sdk.version = SDK_VERSION;
	}
}
function getTraceData$1(options = {}) {
	const client = options.client || getClient();
	if (!isEnabled() || !client) return {};
	const acs = getAsyncContextStrategy(getMainCarrier());
	if (acs.getTraceData) return acs.getTraceData(options);
	const scope = options.scope || getCurrentScope();
	const span = options.span || getActiveSpan$1();
	const isTwpPlaceholder = spanIsNonRecordingSpan(span) && !hasSpansEnabled(client.getOptions());
	if (!span && hasExternalPropagationContext()) return {};
	const sentryTrace = span && !isTwpPlaceholder ? spanToTraceHeader(span) : scopeToTraceHeader(scope);
	const baggage = dynamicSamplingContextToSentryBaggageHeader(span ? getDynamicSamplingContextFromSpan(span) : getDynamicSamplingContextFromScope(client, scope));
	if (!TRACEPARENT_REGEXP.test(sentryTrace)) {
		debug.warn("Invalid sentry-trace data. Cannot generate trace data");
		return {};
	}
	const traceData = {
		"sentry-trace": sentryTrace,
		baggage
	};
	if (options.propagateTraceparent) traceData.traceparent = span && !isTwpPlaceholder ? spanToTraceparentHeader(span) : scopeToTraceparentHeader(scope);
	return traceData;
}
function scopeToTraceHeader(scope) {
	const { traceId, sampled, propagationSpanId } = scope.getPropagationContext();
	return generateSentryTraceHeader(traceId, propagationSpanId, sampled);
}
function scopeToTraceparentHeader(scope) {
	const { traceId, sampled, propagationSpanId } = scope.getPropagationContext();
	return generateTraceparentHeader(traceId, propagationSpanId, sampled);
}
var NOT_PROPAGATED_MESSAGE = "[Tracing] Not injecting trace data for url because it does not match tracePropagationTargets:";
function shouldPropagateTraceForUrl(url, tracePropagationTargets, decisionMap) {
	if (typeof url !== "string" || !tracePropagationTargets) return true;
	const cachedDecision = decisionMap?.get(url);
	if (cachedDecision !== void 0) {
		DEBUG_BUILD$4 && !cachedDecision && debug.log(NOT_PROPAGATED_MESSAGE, url);
		return cachedDecision;
	}
	const decision = stringMatchesSomePattern(url, tracePropagationTargets);
	decisionMap?.set(url, decision);
	DEBUG_BUILD$4 && !decision && debug.log(NOT_PROPAGATED_MESSAGE, url);
	return decision;
}
var MAX_BODY_BYTE_LENGTH = 1048576;
function getMaxBodyByteLength(maxRequestBodySize) {
	if (maxRequestBodySize === "small") return 1e3;
	if (maxRequestBodySize === "medium") return 1e4;
	return MAX_BODY_BYTE_LENGTH;
}
function headersToDict(reqHeaders) {
	const headers = /* @__PURE__ */ Object.create(null);
	try {
		Object.entries(reqHeaders).forEach(([key, value]) => {
			if (typeof value === "string") headers[key] = value;
			else if (typeof value === "number") headers[key] = String(value);
		});
	} catch {}
	return headers;
}
function httpRequestToRequestData(request) {
	const headers = request.headers || {};
	const host = (typeof headers["x-forwarded-host"] === "string" ? headers["x-forwarded-host"] : void 0) || (typeof headers.host === "string" ? headers.host : void 0);
	const protocol = (typeof headers["x-forwarded-proto"] === "string" ? headers["x-forwarded-proto"] : void 0) || request.protocol || (request.socket?.encrypted ? "https" : "http");
	const url = request.url || "";
	const absoluteUrl = getAbsoluteUrl$2({
		url,
		host,
		protocol
	});
	const data = request.body || void 0;
	const cookies = request.cookies;
	return {
		url: absoluteUrl,
		method: request.method,
		query_string: extractQueryParamsFromUrl(url),
		headers: headersToDict(headers),
		cookies,
		data
	};
}
function getAbsoluteUrl$2({ url, protocol, host }) {
	if (url?.startsWith("http")) return url;
	if (url && host) return `${protocol}://${host}${url}`;
}
function httpHeadersToSpanAttributes(headers, dataCollection = false, lifecycle = "request") {
	const resolvedDataCollection = typeof dataCollection === "boolean" ? defaultPiiToCollectionOptions(dataCollection) : dataCollection;
	const headerBehavior = lifecycle === "request" ? resolvedDataCollection.httpHeaders.request : resolvedDataCollection.httpHeaders.response;
	const cookieBehavior = resolvedDataCollection.cookies;
	const prefix = `http.${lifecycle}.header.`;
	const spanAttributes = {};
	try {
		const regularHeaders = {};
		for (const [key, value] of Object.entries(headers)) {
			if (value == null) continue;
			const lowerKey = key.toLowerCase();
			if (lowerKey === "cookie" || lowerKey === "set-cookie") {
				if (cookieBehavior === false) continue;
				if (typeof value === "string" && value !== "") {
					const filtered = filterKeyValueData(parseCookieHeader(value, lowerKey === "set-cookie"), cookieBehavior, SENSITIVE_COOKIE_NAME_SNIPPETS);
					for (const [cookieKey, cookieValue] of Object.entries(filtered)) spanAttributes[`${prefix}${normalizeAttributeKey(lowerKey)}.${normalizeAttributeKey(cookieKey)}`] = cookieValue;
				} else spanAttributes[`${prefix}${normalizeAttributeKey(lowerKey)}`] = FILTERED_VALUE;
			} else {
				if (headerBehavior === false) continue;
				if (Array.isArray(value)) regularHeaders[lowerKey] = value.map((v) => v != null ? String(v) : v).join(";");
				else if (typeof value === "string") regularHeaders[lowerKey] = value;
			}
		}
		if (headerBehavior !== false) {
			const filtered = filterKeyValueData(regularHeaders, headerBehavior);
			for (const [headerKey, headerValue] of Object.entries(filtered)) spanAttributes[`${prefix}${normalizeAttributeKey(headerKey)}`] = headerValue;
		}
	} catch {}
	return spanAttributes;
}
function normalizeAttributeKey(key) {
	return key.replace(/-/g, "_");
}
function parseCookieHeader(value, isSetCookie) {
	const semicolonIndex = value.indexOf(";");
	const cookieString = isSetCookie && semicolonIndex !== -1 ? value.substring(0, semicolonIndex) : value;
	const cookies = isSetCookie ? [cookieString] : cookieString.split("; ");
	const result = {};
	for (const cookie of cookies) {
		const equalSignIndex = cookie.indexOf("=");
		const cookieKey = (equalSignIndex !== -1 ? cookie.substring(0, equalSignIndex) : cookie).toLowerCase();
		result[cookieKey] = equalSignIndex !== -1 ? cookie.substring(equalSignIndex + 1) : "";
	}
	return result;
}
function extractQueryParamsFromUrl(url) {
	if (!url) return;
	try {
		const queryParams = new URL(url, "http://s.io").search.slice(1);
		return queryParams.length ? queryParams : void 0;
	} catch {
		return;
	}
}
var SPAN_KIND = {
	INTERNAL: 0,
	SERVER: 1,
	CLIENT: 2,
	PRODUCER: 3,
	CONSUMER: 4
};
var SPAN_KIND_NAME = {
	[SPAN_KIND.INTERNAL]: "INTERNAL",
	[SPAN_KIND.SERVER]: "SERVER",
	[SPAN_KIND.CLIENT]: "CLIENT",
	[SPAN_KIND.PRODUCER]: "PRODUCER",
	[SPAN_KIND.CONSUMER]: "CONSUMER"
};
function spanKindToName(kind) {
	return SPAN_KIND_NAME[kind];
}
var DEFAULT_BREADCRUMBS = 100;
function addBreadcrumb(breadcrumb, hint) {
	const client = getClient();
	const isolationScope = getIsolationScope();
	if (!client) return;
	const { beforeBreadcrumb = null, maxBreadcrumbs = DEFAULT_BREADCRUMBS } = client.getOptions();
	if (maxBreadcrumbs <= 0) return;
	const mergedBreadcrumb = {
		timestamp: dateTimestampInSeconds(),
		...breadcrumb
	};
	const finalBreadcrumb = beforeBreadcrumb ? consoleSandbox(() => beforeBreadcrumb(mergedBreadcrumb, hint)) : mergedBreadcrumb;
	if (finalBreadcrumb === null) return;
	if (client.emit) client.emit("beforeAddBreadcrumb", finalBreadcrumb, hint);
	isolationScope.addBreadcrumb(finalBreadcrumb, maxBreadcrumbs);
}
var INTEGRATION_NAME$43 = "FunctionToString";
var SETUP_CLIENTS = /* @__PURE__ */ new WeakMap();
var _functionToStringIntegration = (() => {
	return {
		name: INTEGRATION_NAME$43,
		setupOnce() {
			const originalFunctionToString = Function.prototype.toString;
			try {
				Function.prototype.toString = function(...args) {
					const originalFunction = getOriginalFunction(this);
					let unwrappedFunction;
					try {
						if (SETUP_CLIENTS.has(getClient()) && originalFunction !== void 0) unwrappedFunction = originalFunction;
					} catch {}
					return originalFunctionToString.apply(unwrappedFunction ?? this, args);
				};
			} catch {}
		},
		setup(client) {
			SETUP_CLIENTS.set(client, true);
		}
	};
});
var functionToStringIntegration = defineIntegration(_functionToStringIntegration);
var DEFAULT_IGNORE_ERRORS = [
	/^Script error\.?$/,
	/^Javascript error: Script error\.? on line 0$/,
	/^ResizeObserver loop completed with undelivered notifications.$/,
	/^Cannot redefine property: googletag$/,
	/^Can't find variable: gmo$/,
	/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,
	/can't redefine non-configurable property "solana"/,
	/vv\(\)\.getRestrictions is not a function/,
	/Can't find variable: _AutofillCallbackHandler/,
	/Object Not Found Matching Id:\d+, MethodName:simulateEvent/,
	/Java exception was raised during method invocation$/,
	/Java object is gone$/
];
var INTEGRATION_NAME$42 = "EventFilters";
var eventFiltersIntegration = defineIntegration((options = {}) => {
	let mergedOptions;
	return {
		name: INTEGRATION_NAME$42,
		setup(client) {
			mergedOptions = _mergeOptions(options, client.getOptions());
		},
		processEvent(event, _hint, client) {
			if (!mergedOptions) mergedOptions = _mergeOptions(options, client.getOptions());
			return _shouldDropEvent(event, mergedOptions) ? null : event;
		}
	};
});
var inboundFiltersIntegration = defineIntegration(((options = {}) => {
	return {
		...eventFiltersIntegration(options),
		name: "InboundFilters"
	};
}));
function _mergeOptions(internalOptions = {}, clientOptions = {}) {
	return {
		allowUrls: [...internalOptions.allowUrls || [], ...clientOptions.allowUrls || []],
		denyUrls: [...internalOptions.denyUrls || [], ...clientOptions.denyUrls || []],
		ignoreErrors: [
			...internalOptions.ignoreErrors || [],
			...clientOptions.ignoreErrors || [],
			...internalOptions.disableErrorDefaults ? [] : DEFAULT_IGNORE_ERRORS
		],
		ignoreTransactions: [...internalOptions.ignoreTransactions || [], ...clientOptions.ignoreTransactions || []]
	};
}
function _shouldDropEvent(event, options) {
	if (!event.type) {
		if (_isIgnoredError(event, options.ignoreErrors)) {
			DEBUG_BUILD$4 && debug.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${getEventDescription(event)}`);
			return true;
		}
		if (_isUselessError(event)) {
			DEBUG_BUILD$4 && debug.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${getEventDescription(event)}`);
			return true;
		}
		if (_isDeniedUrl(event, options.denyUrls)) {
			DEBUG_BUILD$4 && debug.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${getEventDescription(event)}.
Url: ${_getEventFilterUrl(event)}`);
			return true;
		}
		if (!_isAllowedUrl(event, options.allowUrls)) {
			DEBUG_BUILD$4 && debug.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${getEventDescription(event)}.
Url: ${_getEventFilterUrl(event)}`);
			return true;
		}
	} else if (event.type === "transaction") {
		if (_isIgnoredTransaction(event, options.ignoreTransactions)) {
			DEBUG_BUILD$4 && debug.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${getEventDescription(event)}`);
			return true;
		}
	}
	return false;
}
function _isIgnoredError(event, ignoreErrors) {
	if (!ignoreErrors?.length) return false;
	return getPossibleEventMessages(event).some((message) => stringMatchesSomePattern(message, ignoreErrors));
}
function _isIgnoredTransaction(event, ignoreTransactions) {
	if (!ignoreTransactions?.length) return false;
	const name = event.transaction;
	return name ? stringMatchesSomePattern(name, ignoreTransactions) : false;
}
function _isDeniedUrl(event, denyUrls) {
	if (!denyUrls?.length) return false;
	const url = _getEventFilterUrl(event);
	return !url ? false : stringMatchesSomePattern(url, denyUrls);
}
function _isAllowedUrl(event, allowUrls) {
	if (!allowUrls?.length) return true;
	const url = _getEventFilterUrl(event);
	return !url ? true : stringMatchesSomePattern(url, allowUrls);
}
function _getLastValidUrl(frames = []) {
	for (let i = frames.length - 1; i >= 0; i--) {
		const frame = frames[i];
		if (frame && frame.filename !== "<anonymous>" && frame.filename !== "[native code]") return frame.filename || null;
	}
	return null;
}
function _getEventFilterUrl(event) {
	try {
		const frames = [...event.exception?.values ?? []].reverse().find((value) => value.mechanism?.parent_id === void 0 && value.stacktrace?.frames?.length)?.stacktrace?.frames;
		return frames ? _getLastValidUrl(frames) : null;
	} catch {
		DEBUG_BUILD$4 && debug.error(`Cannot extract url for event ${getEventDescription(event)}`);
		return null;
	}
}
function _isUselessError(event) {
	if (!event.exception?.values?.length) return false;
	return !event.message && !event.exception.values.some((value) => value.stacktrace || value.type && value.type !== "Error" || value.value);
}
function applyAggregateErrorsToEvent(exceptionFromErrorImplementation, parser, key, limit, event, hint) {
	if (!event.exception?.values || !hint || !isError(hint.originalException)) return;
	const originalException = event.exception.values.length > 0 ? event.exception.values[event.exception.values.length - 1] : void 0;
	if (originalException) event.exception.values = aggregateExceptionsFromError(exceptionFromErrorImplementation, parser, limit, hint.originalException, key, event.exception.values, originalException, 0);
}
function aggregateExceptionsFromError(exceptionFromErrorImplementation, parser, limit, error, key, prevExceptions, exception, exceptionId) {
	if (prevExceptions.length >= limit + 1) return prevExceptions;
	let newExceptions = [...prevExceptions];
	if (isError(error[key])) {
		applyExceptionGroupFieldsForParentException(exception, exceptionId, error);
		const newException = exceptionFromErrorImplementation(parser, error[key]);
		const newExceptionId = newExceptions.length;
		applyExceptionGroupFieldsForChildException(newException, key, newExceptionId, exceptionId);
		newExceptions = aggregateExceptionsFromError(exceptionFromErrorImplementation, parser, limit, error[key], key, [newException, ...newExceptions], newException, newExceptionId);
	}
	if (isExceptionGroup(error)) error.errors.forEach((childError, i) => {
		if (isError(childError)) {
			applyExceptionGroupFieldsForParentException(exception, exceptionId, error);
			const newException = exceptionFromErrorImplementation(parser, childError);
			const newExceptionId = newExceptions.length;
			applyExceptionGroupFieldsForChildException(newException, `errors[${i}]`, newExceptionId, exceptionId);
			newExceptions = aggregateExceptionsFromError(exceptionFromErrorImplementation, parser, limit, childError, key, [newException, ...newExceptions], newException, newExceptionId);
		}
	});
	return newExceptions;
}
function isExceptionGroup(error) {
	return Array.isArray(error.errors);
}
function applyExceptionGroupFieldsForParentException(exception, exceptionId, error) {
	exception.mechanism = {
		handled: true,
		type: "auto.core.linked_errors",
		...isExceptionGroup(error) && { is_exception_group: true },
		...exception.mechanism,
		exception_id: exceptionId
	};
}
function applyExceptionGroupFieldsForChildException(exception, source, exceptionId, parentId) {
	exception.mechanism = {
		handled: true,
		...exception.mechanism,
		type: "chained",
		source,
		exception_id: exceptionId,
		parent_id: parentId
	};
}
function parseStackFrames(stackParser, error) {
	return stackParser(error.stack || "", 1);
}
function hasSentryFetchUrlHost(error) {
	return isError(error) && "__sentry_fetch_url_host__" in error && typeof error.__sentry_fetch_url_host__ === "string";
}
function _enhanceErrorWithSentryInfo(error) {
	if (hasSentryFetchUrlHost(error)) return `${error.message} (${error.__sentry_fetch_url_host__})`;
	return error.message;
}
function exceptionFromError(stackParser, error) {
	const exception = {
		type: error.name || error.constructor.name,
		value: _enhanceErrorWithSentryInfo(error)
	};
	const frames = parseStackFrames(stackParser, error);
	if (frames.length) exception.stacktrace = { frames };
	return exception;
}
function getErrorPropertyFromObject(obj) {
	for (const prop in obj) if (Object.prototype.hasOwnProperty.call(obj, prop)) {
		const value = obj[prop];
		if (isError(value)) return value;
	}
}
function getMessageForObject(exception) {
	if ("name" in exception && typeof exception.name === "string") {
		let message = `'${exception.name}' captured as exception`;
		if ("message" in exception && typeof exception.message === "string") message += ` with message '${exception.message}'`;
		return message;
	} else if ("message" in exception && typeof exception.message === "string") return exception.message;
	const keys = extractExceptionKeysForMessage(exception);
	if (isErrorEvent$2(exception)) return `Event \`ErrorEvent\` captured as exception with message \`${exception.message}\``;
	const className = getObjectClassName(exception);
	return `${className && className !== "Object" ? `'${className}'` : "Object"} captured as exception with keys: ${keys}`;
}
function getObjectClassName(obj) {
	try {
		const prototype = Object.getPrototypeOf(obj);
		return prototype ? prototype.constructor.name : void 0;
	} catch {}
}
function getException(client, mechanism, exception, hint) {
	if (isError(exception)) return [exception, void 0];
	mechanism.synthetic = true;
	if (isPlainObject(exception)) {
		const normalizeDepth = client?.getOptions().normalizeDepth;
		const extras = { ["__serialized__"]: normalizeToSize(exception, normalizeDepth) };
		const errorFromProp = getErrorPropertyFromObject(exception);
		if (errorFromProp) return [errorFromProp, extras];
		const message = getMessageForObject(exception);
		const ex2 = hint?.syntheticException || new Error(message);
		ex2.message = message;
		return [ex2, extras];
	}
	const ex = hint?.syntheticException || new Error(exception);
	ex.message = `${exception}`;
	return [ex, void 0];
}
function eventFromUnknownInput(client, stackParser, exception, hint) {
	const mechanism = hint?.data && hint.data.mechanism || {
		handled: true,
		type: "generic"
	};
	const [ex, extras] = getException(client, mechanism, exception, hint);
	const event = { exception: { values: [exceptionFromError(stackParser, ex)] } };
	if (extras) event.extra = extras;
	addExceptionTypeValue(event, void 0, void 0);
	addExceptionMechanism(event, mechanism);
	return {
		...event,
		event_id: hint?.event_id
	};
}
function eventFromMessage(stackParser, message, level = "info", hint, attachStacktrace) {
	const event = {
		event_id: hint?.event_id,
		level
	};
	if (attachStacktrace && hint?.syntheticException) {
		const frames = parseStackFrames(stackParser, hint.syntheticException);
		if (frames.length) {
			event.exception = { values: [{
				value: message,
				stacktrace: { frames }
			}] };
			addExceptionMechanism(event, { synthetic: true });
		}
	}
	if (isParameterizedString(message)) {
		const { __sentry_template_string__, __sentry_template_values__ } = message;
		event.logentry = {
			message: __sentry_template_string__,
			params: __sentry_template_values__
		};
		return event;
	}
	event.message = message;
	return event;
}
var DEFAULT_KEY = "cause";
var DEFAULT_LIMIT = 5;
var INTEGRATION_NAME$41 = "LinkedErrors";
var _linkedErrorsIntegration = ((options = {}) => {
	const limit = options.limit || DEFAULT_LIMIT;
	const key = options.key || DEFAULT_KEY;
	return {
		name: INTEGRATION_NAME$41,
		preprocessEvent(event, hint, client) {
			applyAggregateErrorsToEvent(exceptionFromError, client.getOptions().stackParser, key, limit, event, hint);
		}
	};
});
var linkedErrorsIntegration = defineIntegration(_linkedErrorsIntegration);
var ipHeaderNames = [
	"X-Client-IP",
	"X-Forwarded-For",
	"Fly-Client-IP",
	"CF-Connecting-IP",
	"Fastly-Client-Ip",
	"True-Client-Ip",
	"X-Real-IP",
	"X-Cluster-Client-IP",
	"X-Forwarded",
	"Forwarded-For",
	"Forwarded",
	"X-Vercel-Forwarded-For"
];
function getClientIPAddress(headers) {
	const lowerCaseHeaders = {};
	for (const key of Object.keys(headers)) lowerCaseHeaders[key.toLowerCase()] = headers[key];
	return ipHeaderNames.map((headerName) => {
		const rawValue = lowerCaseHeaders[headerName.toLowerCase()];
		const value = Array.isArray(rawValue) ? rawValue.join(";") : rawValue;
		if (headerName === "Forwarded") return parseForwardedHeader(value);
		return value?.split(",").map((v) => v.trim());
	}).reduce((acc, val) => {
		if (!val) return acc;
		return acc.concat(val);
	}, []).find((ip) => ip !== null && isIP(ip)) || null;
}
function parseForwardedHeader(value) {
	if (!value) return null;
	for (const part of value.split(";")) if (part.startsWith("for=")) return part.slice(4);
	return null;
}
function isIP(str) {
	return /(?:^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$)|(?:^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$)/.test(str);
}
var INTEGRATION_NAME$40 = "RequestData";
var _requestDataIntegration = ((options = {}) => {
	function resolveIncludeAndDataCollection(client) {
		const dc = client.getDataCollectionOptions();
		const dataCollection = {
			...dc,
			...options.include?.cookies === true && dc.cookies === false && { cookies: true },
			...options.include?.headers === true && dc.httpHeaders.request === false && { httpHeaders: {
				...dc.httpHeaders,
				request: true
			} }
		};
		return {
			dataCollection,
			include: {
				cookies: dataCollection.cookies !== false,
				data: true,
				headers: dataCollection.httpHeaders.request !== false,
				ip: dataCollection.userInfo,
				query_string: dataCollection.urlQueryParams !== false,
				url: true,
				...options.include
			}
		};
	}
	return {
		name: INTEGRATION_NAME$40,
		processEvent(event, _hint, client) {
			const { sdkProcessingMetadata = {} } = event;
			const { normalizedRequest, ipAddress } = sdkProcessingMetadata;
			const { include } = resolveIncludeAndDataCollection(client);
			if (normalizedRequest) addNormalizedRequestDataToEvent(event, normalizedRequest, { ipAddress }, include);
			return event;
		},
		processSegmentSpan(span, client) {
			const { sdkProcessingMetadata = {} } = getIsolationScope().getScopeData();
			const { normalizedRequest, ipAddress } = sdkProcessingMetadata;
			if (!normalizedRequest) return;
			const { include, dataCollection } = resolveIncludeAndDataCollection(client);
			addNormalizedRequestDataToSpan(span, normalizedRequest, ipAddress, include, dataCollection);
		}
	};
});
var requestDataIntegration = defineIntegration(_requestDataIntegration);
function addNormalizedRequestDataToEvent(event, req, additionalData, include) {
	event.request = {
		...event.request,
		...extractNormalizedRequestData(req, include)
	};
	if (include.ip) {
		const ip = req.headers && getClientIPAddress(req.headers) || additionalData.ipAddress;
		if (ip) event.user = {
			...event.user,
			ip_address: ip
		};
	}
}
function addNormalizedRequestDataToSpan(span, normalizedRequest, ipAddress, include, dataCollection) {
	const requestData = extractNormalizedRequestData(normalizedRequest, include);
	const attributes = {};
	if (requestData.url) attributes[Yu] = requestData.url;
	if (requestData.method) attributes["http.request.method"] = requestData.method;
	if (requestData.query_string) attributes[Hu] = normalizeQueryString(requestData.query_string);
	safeSetSpanJSONAttributes(span, attributes);
	if (requestData.cookies && Object.keys(requestData.cookies).length > 0) safeSetSpanJSONAttributes(span, httpHeadersToSpanAttributes({ cookie: Object.entries(requestData.cookies).map(([name, value]) => `${name}=${value}`).join("; ") }, dataCollection, "request"));
	if (requestData.headers) safeSetSpanJSONAttributes(span, httpHeadersToSpanAttributes(requestData.headers, dataCollection, "request"));
	if (requestData.data != null) {
		const serialized = typeof requestData.data === "string" ? requestData.data : JSON.stringify(requestData.data);
		if (serialized) safeSetSpanJSONAttributes(span, { "http.request.body.data": serialized });
	}
	if (include.ip) {
		const ip = normalizedRequest.headers && getClientIPAddress(normalizedRequest.headers) || ipAddress || void 0;
		if (ip) safeSetSpanJSONAttributes(span, { [SEMANTIC_ATTRIBUTE_USER_IP_ADDRESS]: ip });
	}
}
function extractNormalizedRequestData(normalizedRequest, include) {
	const requestData = {};
	const headers = { ...normalizedRequest.headers };
	if (include.headers) {
		requestData.headers = headers;
		if (!include.cookies) delete headers.cookie;
		if (!include.ip) {
			const ipHeaderNamesLower = new Set(ipHeaderNames.map((name) => name.toLowerCase()));
			for (const key of Object.keys(headers)) if (ipHeaderNamesLower.has(key.toLowerCase())) delete headers[key];
		}
	}
	requestData.method = normalizedRequest.method;
	if (include.url) requestData.url = normalizedRequest.url;
	if (include.cookies) requestData.cookies = normalizedRequest.cookies || (headers?.cookie ? parseCookie(headers.cookie) : void 0) || {};
	if (include.query_string) requestData.query_string = normalizedRequest.query_string;
	if (include.data) requestData.data = normalizedRequest.data;
	return requestData;
}
function normalizeQueryString(queryString) {
	if (typeof queryString === "string") return queryString || void 0;
	return (Array.isArray(queryString) ? queryString : Object.entries(queryString)).map(([key, value]) => `${key}=${value}`).join("&") || void 0;
}
var _filter = /* @__PURE__ */ new Set([]);
function addConsoleInstrumentationHandler(handler) {
	const type = "console";
	const removeHandler = addHandler(type, handler);
	maybeInstrument(type, instrumentConsole);
	return removeHandler;
}
function addConsoleInstrumentationFilter(filter) {
	for (const f of filter) _filter.add(f);
	return () => {
		for (const f of filter) _filter.delete(f);
	};
}
var instrumentedLevels = /* @__PURE__ */ new Set();
function instrumentConsole() {
	if (!("console" in GLOBAL_OBJ)) return;
	CONSOLE_LEVELS.forEach(function(level) {
		if (instrumentedLevels.has(level) || !(level in GLOBAL_OBJ.console)) return;
		instrumentedLevels.add(level);
		fill(GLOBAL_OBJ.console, level, function(originalConsoleMethod) {
			originalConsoleMethods[level] = originalConsoleMethod;
			return function(...args) {
				const firstArg = args[0];
				const log = originalConsoleMethods[level];
				const isFiltered = _filter.size && typeof firstArg === "string" && stringMatchesSomePattern(firstArg, _filter);
				if (!isFiltered) triggerHandlers("console", {
					args,
					level
				});
				if (!isFiltered || DEBUG_BUILD$4 && debug.isEnabled()) log?.apply(GLOBAL_OBJ.console, args);
			};
		});
	});
}
function severityLevelFromString(level) {
	return level === "warn" ? "warning" : [
		"fatal",
		"error",
		"warning",
		"log",
		"info",
		"debug"
	].includes(level) ? level : "log";
}
var splitPathRe = /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;
function splitPath(filename) {
	const truncated = filename.length > 1024 ? `<truncated>${filename.slice(-1024)}` : filename;
	const parts = splitPathRe.exec(truncated);
	return parts ? parts.slice(1) : [];
}
function dirname(path) {
	const result = splitPath(path);
	const root = result[0] || "";
	let dir = result[1];
	if (!root && !dir) return ".";
	if (dir) dir = dir.slice(0, dir.length - 1);
	return root + dir;
}
var INTEGRATION_NAME$39 = "Console";
var consoleIntegration$1 = defineIntegration((options = {}) => {
	const levels = new Set(options.levels || CONSOLE_LEVELS);
	return {
		name: INTEGRATION_NAME$39,
		setup(client) {
			const unsubscribe = addConsoleInstrumentationHandler(({ args, level }) => {
				if (getClient() !== client || !levels.has(level)) return;
				addConsoleBreadcrumb(level, args);
			});
			client.registerCleanup(unsubscribe);
			if (options.filter) {
				const unsubscribe2 = addConsoleInstrumentationFilter(options.filter);
				client.registerCleanup(unsubscribe2);
			}
		}
	};
});
function addConsoleBreadcrumb(level, args) {
	const breadcrumb = {
		category: "console",
		data: {
			arguments: args,
			logger: "console"
		},
		level: severityLevelFromString(level),
		message: formatConsoleArgs(args)
	};
	if (level === "assert") {
		if (args[0] === false) {
			const assertionArgs = args.slice(1);
			breadcrumb.message = assertionArgs.length > 0 ? `Assertion failed: ${formatConsoleArgs(assertionArgs)}` : "Assertion failed";
			breadcrumb.data.arguments = assertionArgs;
		} else return;
	}
	addBreadcrumb(breadcrumb, {
		input: args,
		level
	});
}
function formatConsoleArgs(values) {
	return "util" in GLOBAL_OBJ && typeof GLOBAL_OBJ.util.format === "function" ? GLOBAL_OBJ.util.format(...values) : safeJoin(values, " ");
}
var INTEGRATION_NAME$38 = "ConversationId";
var _conversationIdIntegration = (() => {
	return {
		name: INTEGRATION_NAME$38,
		setup(client) {
			client.on("spanStart", (span) => {
				const scopeData = getCurrentScope().getScopeData();
				const isolationScopeData = getIsolationScope().getScopeData();
				const conversationId = scopeData.conversationId || isolationScopeData.conversationId;
				if (conversationId) {
					const { op, data: attributes, description: name } = spanToJSON(span);
					if (!op?.startsWith("gen_ai.") && !attributes["ai.operationId"] && !name?.startsWith("ai.")) return;
					span.setAttribute(GEN_AI_CONVERSATION_ID_ATTRIBUTE$1, conversationId);
				}
			});
		}
	};
});
var conversationIdIntegration = defineIntegration(_conversationIdIntegration);
var GEN_AI_PROMPT_ATTRIBUTE = "gen_ai.prompt";
var GEN_AI_SYSTEM_ATTRIBUTE = "gen_ai.system";
var GEN_AI_REQUEST_MODEL_ATTRIBUTE = "gen_ai.request.model";
var GEN_AI_REQUEST_STREAM_ATTRIBUTE = "gen_ai.request.stream";
var GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE = "gen_ai.request.temperature";
var GEN_AI_REQUEST_MAX_TOKENS_ATTRIBUTE = "gen_ai.request.max_tokens";
var GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE = "gen_ai.request.frequency_penalty";
var GEN_AI_REQUEST_PRESENCE_PENALTY_ATTRIBUTE = "gen_ai.request.presence_penalty";
var GEN_AI_REQUEST_TOP_P_ATTRIBUTE = "gen_ai.request.top_p";
var GEN_AI_REQUEST_TOP_K_ATTRIBUTE = "gen_ai.request.top_k";
var GEN_AI_REQUEST_ENCODING_FORMAT_ATTRIBUTE = "gen_ai.request.encoding_format";
var GEN_AI_REQUEST_DIMENSIONS_ATTRIBUTE = "gen_ai.request.dimensions";
var GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE = "gen_ai.response.finish_reasons";
var GEN_AI_RESPONSE_MODEL_ATTRIBUTE = "gen_ai.response.model";
var GEN_AI_RESPONSE_ID_ATTRIBUTE = "gen_ai.response.id";
var GEN_AI_RESPONSE_STOP_REASON_ATTRIBUTE = "gen_ai.response.stop_reason";
var GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE = "gen_ai.usage.input_tokens";
var GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE = "gen_ai.usage.output_tokens";
var GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE = "gen_ai.usage.total_tokens";
var GEN_AI_OPERATION_NAME_ATTRIBUTE = "gen_ai.operation.name";
var GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE = "sentry.sdk_meta.gen_ai.input.messages.original_length";
var GEN_AI_INPUT_MESSAGES_ATTRIBUTE = "gen_ai.input.messages";
var GEN_AI_OUTPUT_MESSAGES_ATTRIBUTE = "gen_ai.output.messages";
var GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE = "gen_ai.system_instructions";
var GEN_AI_RESPONSE_TEXT_ATTRIBUTE = "gen_ai.response.text";
var GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE = "gen_ai.request.available_tools";
var GEN_AI_RESPONSE_STREAMING_ATTRIBUTE = "gen_ai.response.streaming";
var GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE = "gen_ai.response.tool_calls";
var GEN_AI_AGENT_NAME_ATTRIBUTE = "gen_ai.agent.name";
var GEN_AI_PIPELINE_NAME_ATTRIBUTE = "gen_ai.pipeline.name";
var GEN_AI_CONVERSATION_ID_ATTRIBUTE = "gen_ai.conversation.id";
var GEN_AI_USAGE_CACHE_CREATION_INPUT_TOKENS_ATTRIBUTE = "gen_ai.usage.cache_creation_input_tokens";
var GEN_AI_USAGE_CACHE_READ_INPUT_TOKENS_ATTRIBUTE = "gen_ai.usage.cache_read_input_tokens";
var GEN_AI_USAGE_INPUT_TOKENS_CACHE_WRITE_ATTRIBUTE = "gen_ai.usage.input_tokens.cache_write";
var GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE = "gen_ai.usage.input_tokens.cached";
var GEN_AI_INVOKE_AGENT_OPERATION_ATTRIBUTE = "gen_ai.invoke_agent";
var GEN_AI_EMBEDDINGS_INPUT_ATTRIBUTE = "gen_ai.embeddings.input";
var GEN_AI_EMBEDDINGS_OPERATION_ATTRIBUTE = "gen_ai.embeddings";
var GEN_AI_EXECUTE_TOOL_OPERATION_ATTRIBUTE = "gen_ai.execute_tool";
var GEN_AI_TOOL_NAME_ATTRIBUTE = "gen_ai.tool.name";
var GEN_AI_TOOL_CALL_ID_ATTRIBUTE$1 = "gen_ai.tool.call.id";
var GEN_AI_TOOL_TYPE_ATTRIBUTE = "gen_ai.tool.type";
var GEN_AI_TOOL_INPUT_ATTRIBUTE = "gen_ai.tool.input";
var GEN_AI_TOOL_OUTPUT_ATTRIBUTE = "gen_ai.tool.output";
var GEN_AI_TOOL_DESCRIPTION_ATTRIBUTE$1 = "gen_ai.tool.description";
function isContentMedia(part) {
	if (!part || typeof part !== "object") return false;
	return isContentMediaSource(part) || hasInlineData(part) || hasImageUrl(part) || hasInputAudio(part) || hasFileData(part) || hasMediaTypeData(part) || hasVercelFileData(part) || hasVercelImageData(part) || hasBlobOrBase64Type(part) || hasB64Json(part) || hasImageGenerationResult(part) || hasDataUri(part);
}
function hasImageUrl(part) {
	if (!("image_url" in part)) return false;
	if (typeof part.image_url === "string") return part.image_url.startsWith("data:");
	return hasNestedImageUrl(part);
}
function hasNestedImageUrl(part) {
	return "image_url" in part && !!part.image_url && typeof part.image_url === "object" && "url" in part.image_url && typeof part.image_url.url === "string" && part.image_url.url.startsWith("data:");
}
function isContentMediaSource(part) {
	return "type" in part && typeof part.type === "string" && "source" in part && isContentMedia(part.source);
}
function hasInlineData(part) {
	return "inlineData" in part && !!part.inlineData && typeof part.inlineData === "object" && "data" in part.inlineData && typeof part.inlineData.data === "string";
}
function hasInputAudio(part) {
	return "type" in part && part.type === "input_audio" && "input_audio" in part && !!part.input_audio && typeof part.input_audio === "object" && "data" in part.input_audio && typeof part.input_audio.data === "string";
}
function hasFileData(part) {
	return "type" in part && part.type === "file" && "file" in part && !!part.file && typeof part.file === "object" && "file_data" in part.file && typeof part.file.file_data === "string";
}
function hasMediaTypeData(part) {
	return "media_type" in part && typeof part.media_type === "string" && "data" in part;
}
function hasVercelFileData(part) {
	return "type" in part && part.type === "file" && "mediaType" in part && typeof part.mediaType === "string" && "data" in part && typeof part.data === "string" && !part.data.startsWith("http://") && !part.data.startsWith("https://");
}
function hasVercelImageData(part) {
	return "type" in part && part.type === "image" && "image" in part && typeof part.image === "string" && !part.image.startsWith("http://") && !part.image.startsWith("https://");
}
function hasBlobOrBase64Type(part) {
	return "type" in part && (part.type === "blob" || part.type === "base64");
}
function hasB64Json(part) {
	return "b64_json" in part;
}
function hasImageGenerationResult(part) {
	return "type" in part && "result" in part && part.type === "image_generation";
}
function hasDataUri(part) {
	return "uri" in part && typeof part.uri === "string" && part.uri.startsWith("data:");
}
var REMOVED_STRING = "[Blob substitute]";
var MEDIA_FIELDS = [
	"image_url",
	"data",
	"content",
	"b64_json",
	"result",
	"uri",
	"image"
];
function stripInlineMediaFromSingleMessage(part) {
	const strip = { ...part };
	if (isContentMedia(strip.source)) strip.source = stripInlineMediaFromSingleMessage(strip.source);
	if (hasInlineData(part)) strip.inlineData = {
		...part.inlineData,
		data: REMOVED_STRING
	};
	if (hasNestedImageUrl(part)) strip.image_url = {
		...part.image_url,
		url: REMOVED_STRING
	};
	if (hasInputAudio(part)) strip.input_audio = {
		...part.input_audio,
		data: REMOVED_STRING
	};
	if (hasFileData(part)) strip.file = {
		...part.file,
		file_data: REMOVED_STRING
	};
	for (const field of MEDIA_FIELDS) if (typeof strip[field] === "string") strip[field] = REMOVED_STRING;
	return strip;
}
var DEFAULT_GEN_AI_MESSAGES_BYTE_LIMIT = 2e4;
var utf8Bytes = (text) => {
	return new TextEncoder().encode(text).length;
};
var jsonBytes = (value) => {
	return utf8Bytes(JSON.stringify(value));
};
function truncateTextByBytes(text, maxBytes) {
	if (utf8Bytes(text) <= maxBytes) return text;
	let low = 0;
	let high = text.length;
	let bestFit = "";
	while (low <= high) {
		const mid = Math.floor((low + high) / 2);
		const candidate = text.slice(0, mid);
		if (utf8Bytes(candidate) <= maxBytes) {
			bestFit = candidate;
			low = mid + 1;
		} else high = mid - 1;
	}
	return bestFit;
}
function getItemText(item) {
	if (typeof item === "string") return item;
	if ("text" in item && typeof item.text === "string") return item.text;
	return "";
}
function withItemText(item, text) {
	if (typeof item === "string") return text;
	return {
		...item,
		text
	};
}
function isContentMessage(message) {
	return message !== null && typeof message === "object" && "content" in message && typeof message.content === "string";
}
function isContentArrayMessage(message) {
	return message !== null && typeof message === "object" && "content" in message && Array.isArray(message.content);
}
function isPartsMessage(message) {
	return message !== null && typeof message === "object" && "parts" in message && Array.isArray(message.parts) && message.parts.length > 0;
}
function truncateContentMessage(message, maxBytes) {
	const availableForContent = maxBytes - jsonBytes({
		...message,
		content: ""
	});
	if (availableForContent <= 0) return [];
	const truncatedContent = truncateTextByBytes(message.content, availableForContent);
	return [{
		...message,
		content: truncatedContent
	}];
}
function getArrayItems(message) {
	if ("parts" in message && Array.isArray(message.parts)) return {
		key: "parts",
		items: message.parts
	};
	if ("content" in message && Array.isArray(message.content)) return {
		key: "content",
		items: message.content
	};
	return {
		key: null,
		items: []
	};
}
function truncateArrayMessage(message, maxBytes) {
	const { key, items } = getArrayItems(message);
	if (key === null || items.length === 0) return [];
	const emptyItems = items.map((item) => withItemText(item, ""));
	let remainingBytes = maxBytes - jsonBytes({
		...message,
		[key]: emptyItems
	});
	if (remainingBytes <= 0) return [];
	const includedItems = [];
	for (const item of items) {
		const text = getItemText(item);
		const textSize = utf8Bytes(text);
		if (textSize <= remainingBytes) {
			includedItems.push(item);
			remainingBytes -= textSize;
		} else if (includedItems.length === 0) {
			const truncated = truncateTextByBytes(text, remainingBytes);
			if (truncated) includedItems.push(withItemText(item, truncated));
			break;
		} else break;
	}
	if (includedItems.length <= 0) return [];
	else return [{
		...message,
		[key]: includedItems
	}];
}
function truncateSingleMessage(message, maxBytes) {
	if (!message) return [];
	if (typeof message === "string") {
		const truncated = truncateTextByBytes(message, maxBytes);
		return truncated ? [truncated] : [];
	}
	if (typeof message !== "object") return [];
	if (isContentMessage(message)) return truncateContentMessage(message, maxBytes);
	if (isContentArrayMessage(message) || isPartsMessage(message)) return truncateArrayMessage(message, maxBytes);
	return [];
}
function stripInlineMediaFromMessages(messages) {
	return messages.map((message) => {
		let newMessage = void 0;
		if (!!message && typeof message === "object") {
			if (isContentArrayMessage(message)) newMessage = {
				...message,
				content: stripInlineMediaFromMessages(message.content)
			};
			else if ("content" in message && isContentMedia(message.content)) newMessage = {
				...message,
				content: stripInlineMediaFromSingleMessage(message.content)
			};
			if (isPartsMessage(message)) newMessage = {
				...newMessage ?? message,
				parts: stripInlineMediaFromMessages(message.parts)
			};
			if (isContentMedia(newMessage)) newMessage = stripInlineMediaFromSingleMessage(newMessage);
			else if (isContentMedia(message)) newMessage = stripInlineMediaFromSingleMessage(message);
		}
		return newMessage ?? message;
	});
}
function truncateMessagesByBytes(messages, maxBytes) {
	if (!Array.isArray(messages) || messages.length === 0) return messages;
	const effectiveMaxBytes = maxBytes - 2;
	const lastMessage = messages[messages.length - 1];
	const stripped = stripInlineMediaFromMessages([lastMessage]);
	const strippedMessage = stripped[0];
	if (jsonBytes(strippedMessage) <= effectiveMaxBytes) return stripped;
	return truncateSingleMessage(strippedMessage, effectiveMaxBytes);
}
function truncateGenAiMessages(messages) {
	return truncateMessagesByBytes(messages, DEFAULT_GEN_AI_MESSAGES_BYTE_LIMIT);
}
function truncateGenAiStringInput(input) {
	return truncateTextByBytes(input, DEFAULT_GEN_AI_MESSAGES_BYTE_LIMIT);
}
function resolveAIRecordingOptions(options) {
	const genAI = getClient()?.getDataCollectionOptions().genAI;
	return {
		...options,
		recordInputs: options?.recordInputs ?? genAI?.inputs ?? false,
		recordOutputs: options?.recordOutputs ?? genAI?.outputs ?? false
	};
}
function shouldEnableTruncation(enableTruncation) {
	if (enableTruncation !== void 0) return enableTruncation;
	const client = getClient();
	if (!client) return true;
	return !hasSpanStreamingEnabled(client) && client.getOptions().streamGenAiSpans === false;
}
function buildMethodPath(currentPath, prop) {
	return currentPath ? `${currentPath}.${prop}` : prop;
}
function setTokenUsageAttributes(span, promptTokens, completionTokens, cachedInputTokens, cachedOutputTokens) {
	if (promptTokens !== void 0) span.setAttributes({ [GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE]: promptTokens });
	if (completionTokens !== void 0) span.setAttributes({ [GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE]: completionTokens });
	if (promptTokens !== void 0 || completionTokens !== void 0 || cachedInputTokens !== void 0 || cachedOutputTokens !== void 0) {
		const totalTokens = (promptTokens ?? 0) + (completionTokens ?? 0) + (cachedInputTokens ?? 0) + (cachedOutputTokens ?? 0);
		span.setAttributes({ [GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE]: totalTokens });
	}
}
function endStreamSpan(span, state, recordOutputs) {
	if (!span.isRecording()) return;
	const attrs = { [GEN_AI_RESPONSE_STREAMING_ATTRIBUTE]: true };
	if (state.responseId) attrs[GEN_AI_RESPONSE_ID_ATTRIBUTE] = state.responseId;
	if (state.responseModel) attrs[GEN_AI_RESPONSE_MODEL_ATTRIBUTE] = state.responseModel;
	if (state.promptTokens !== void 0) attrs[GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE] = state.promptTokens;
	if (state.completionTokens !== void 0) attrs[GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE] = state.completionTokens;
	if (state.totalTokens !== void 0) attrs[GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE] = state.totalTokens;
	else if (state.promptTokens !== void 0 || state.completionTokens !== void 0 || state.cacheCreationInputTokens !== void 0 || state.cacheReadInputTokens !== void 0) attrs[GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE] = (state.promptTokens ?? 0) + (state.completionTokens ?? 0) + (state.cacheCreationInputTokens ?? 0) + (state.cacheReadInputTokens ?? 0);
	if (state.finishReasons.length) attrs[GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE] = JSON.stringify(state.finishReasons);
	if (recordOutputs && state.responseTexts.length) attrs[GEN_AI_RESPONSE_TEXT_ATTRIBUTE] = state.responseTexts.join("");
	if (recordOutputs && state.toolCalls.length) attrs[GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE] = JSON.stringify(state.toolCalls);
	span.setAttributes(attrs);
	span.end();
}
function getTruncatedJsonString(value) {
	if (typeof value === "string") return truncateGenAiStringInput(value);
	try {
		return JSON.stringify(Array.isArray(value) ? truncateGenAiMessages(value) : value);
	} catch {
		return "[unserializable]";
	}
}
function extractSystemInstructions(messages) {
	if (!Array.isArray(messages)) return {
		systemInstructions: void 0,
		filteredMessages: messages
	};
	const systemMessageIndex = messages.findIndex((msg) => msg && typeof msg === "object" && "role" in msg && msg.role === "system");
	if (systemMessageIndex === -1) return {
		systemInstructions: void 0,
		filteredMessages: messages
	};
	const systemMessage = messages[systemMessageIndex];
	const systemContent = typeof systemMessage.content === "string" ? systemMessage.content : systemMessage.content !== void 0 ? JSON.stringify(systemMessage.content) : void 0;
	if (!systemContent) return {
		systemInstructions: void 0,
		filteredMessages: messages
	};
	return {
		systemInstructions: JSON.stringify([{
			type: "text",
			content: systemContent
		}]),
		filteredMessages: [...messages.slice(0, systemMessageIndex), ...messages.slice(systemMessageIndex + 1)]
	};
}
async function createWithResponseWrapper(originalWithResponse, instrumentedPromise) {
	const [instrumentedResult, originalWrapper] = await Promise.all([instrumentedPromise, originalWithResponse]);
	if (originalWrapper && typeof originalWrapper === "object" && "data" in originalWrapper) return {
		...originalWrapper,
		data: instrumentedResult
	};
	return instrumentedResult;
}
function wrapPromiseWithMethods(originalPromiseLike, instrumentedPromise) {
	if (!isThenable(originalPromiseLike)) return instrumentedPromise;
	return new Proxy(originalPromiseLike, { get(target, prop) {
		const source = prop in Promise.prototype || prop === Symbol.toStringTag ? instrumentedPromise : target;
		const value = Reflect.get(source, prop);
		if (prop === "withResponse" && typeof value === "function") return function wrappedWithResponse() {
			return createWithResponseWrapper(value.call(target), instrumentedPromise);
		};
		return typeof value === "function" ? value.bind(source) : value;
	} });
}
var WORKERS_AI_INTEGRATION_NAME$1 = "WorkersAI";
var toolCallSpanContextMap = /* @__PURE__ */ new Map();
var toolDescriptionMap = /* @__PURE__ */ new Map();
var SPAN_TO_OPERATION_NAME = /* @__PURE__ */ new Map([
	["ai.generateText", "invoke_agent"],
	["ai.streamText", "invoke_agent"],
	["ai.generateObject", "invoke_agent"],
	["ai.streamObject", "invoke_agent"],
	["ai.generateText.doGenerate", "generate_content"],
	["ai.streamText.doStream", "generate_content"],
	["ai.generateObject.doGenerate", "generate_content"],
	["ai.streamObject.doStream", "generate_content"],
	["ai.embed.doEmbed", "embeddings"],
	["ai.embedMany.doEmbed", "embeddings"],
	["ai.rerank.doRerank", "rerank"],
	["ai.toolCall", "execute_tool"]
]);
var OPERATION_NAME_ATTRIBUTE = "operation.name";
var AI_OPERATION_ID_ATTRIBUTE = "ai.operationId";
var AI_PROMPT_ATTRIBUTE = "ai.prompt";
var AI_SCHEMA_ATTRIBUTE = "ai.schema";
var AI_RESPONSE_OBJECT_ATTRIBUTE = "ai.response.object";
var AI_VALUES_ATTRIBUTE = "ai.values";
var AI_RESPONSE_TEXT_ATTRIBUTE = "ai.response.text";
var AI_RESPONSE_TOOL_CALLS_ATTRIBUTE = "ai.response.toolCalls";
var AI_RESPONSE_FINISH_REASON_ATTRIBUTE = "ai.response.finishReason";
var AI_PROMPT_MESSAGES_ATTRIBUTE = "ai.prompt.messages";
var AI_PROMPT_TOOLS_ATTRIBUTE = "ai.prompt.tools";
var AI_MODEL_ID_ATTRIBUTE = "ai.model.id";
var AI_RESPONSE_PROVIDER_METADATA_ATTRIBUTE = "ai.response.providerMetadata";
var AI_USAGE_CACHED_INPUT_TOKENS_ATTRIBUTE = "ai.usage.cachedInputTokens";
var AI_TELEMETRY_FUNCTION_ID_ATTRIBUTE = "ai.telemetry.functionId";
var AI_USAGE_COMPLETION_TOKENS_ATTRIBUTE = "ai.usage.completionTokens";
var AI_USAGE_PROMPT_TOKENS_ATTRIBUTE = "ai.usage.promptTokens";
var AI_USAGE_TOKENS_ATTRIBUTE = "ai.usage.tokens";
var AI_TOOL_CALL_NAME_ATTRIBUTE = "ai.toolCall.name";
var AI_TOOL_CALL_ID_ATTRIBUTE = "ai.toolCall.id";
var AI_TOOL_CALL_ARGS_ATTRIBUTE = "ai.toolCall.args";
var AI_TOOL_CALL_RESULT_ATTRIBUTE = "ai.toolCall.result";
function accumulateTokensForParent(span, tokenAccumulator) {
	const parentSpanId = span.parent_span_id;
	if (!parentSpanId) return;
	const inputTokens = span.data[GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE];
	const outputTokens = span.data[GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE];
	if (typeof inputTokens === "number" || typeof outputTokens === "number") {
		const existing = tokenAccumulator.get(parentSpanId) || {
			inputTokens: 0,
			outputTokens: 0
		};
		if (typeof inputTokens === "number") existing.inputTokens += inputTokens;
		if (typeof outputTokens === "number") existing.outputTokens += outputTokens;
		tokenAccumulator.set(parentSpanId, existing);
	}
}
function applyAccumulatedTokens(spanOrTrace, tokenAccumulator) {
	const accumulated = tokenAccumulator.get(spanOrTrace.span_id);
	if (!accumulated || !spanOrTrace.data) return;
	if (accumulated.inputTokens > 0) spanOrTrace.data[GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE] = accumulated.inputTokens;
	if (accumulated.outputTokens > 0) spanOrTrace.data[GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE] = accumulated.outputTokens;
	if (accumulated.inputTokens > 0 || accumulated.outputTokens > 0) spanOrTrace.data["gen_ai.usage.total_tokens"] = accumulated.inputTokens + accumulated.outputTokens;
}
function buildToolDescriptionMap(spans) {
	const toolDescriptions = /* @__PURE__ */ new Map();
	for (const span of spans) {
		const availableTools = span.data[GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE];
		if (typeof availableTools !== "string") continue;
		try {
			const tools = JSON.parse(availableTools);
			for (const tool of tools) if (tool.name && tool.description && !toolDescriptions.has(tool.name)) toolDescriptions.set(tool.name, tool.description);
		} catch {}
	}
	return toolDescriptions;
}
function applyToolDescriptionsAndTokens(spans, tokenAccumulator) {
	const toolDescriptions = buildToolDescriptionMap(spans);
	for (const span of spans) {
		if (span.op === "gen_ai.execute_tool") {
			const toolName = span.data[GEN_AI_TOOL_NAME_ATTRIBUTE];
			if (typeof toolName === "string") {
				const description = toolDescriptions.get(toolName);
				if (description) span.data[GEN_AI_TOOL_DESCRIPTION_ATTRIBUTE$1] = description;
			}
		}
		if (span.op === "gen_ai.invoke_agent") applyAccumulatedTokens(span, tokenAccumulator);
	}
}
function _INTERNAL_getSpanContextForToolCallId(toolCallId) {
	return toolCallSpanContextMap.get(toolCallId);
}
function _INTERNAL_cleanupToolCallSpanContext(toolCallId) {
	toolCallSpanContextMap.delete(toolCallId);
}
function convertAvailableToolsToJsonString(tools) {
	const toolObjects = tools.map((tool) => {
		if (typeof tool === "string") try {
			return JSON.parse(tool);
		} catch {
			return tool;
		}
		return tool;
	});
	return JSON.stringify(toolObjects);
}
function filterMessagesArray(input) {
	return input.filter((m) => !!m && typeof m === "object" && "role" in m && "content" in m);
}
function convertUserInputToMessagesFormat(userInput) {
	try {
		const p = JSON.parse(userInput);
		if (!!p && typeof p === "object") {
			let { messages } = p;
			const { prompt, system } = p;
			const result = [];
			if (typeof system === "string") result.push({
				role: "system",
				content: system
			});
			if (typeof messages === "string") try {
				messages = JSON.parse(messages);
			} catch {}
			if (Array.isArray(messages)) {
				result.push(...filterMessagesArray(messages));
				return result;
			}
			if (Array.isArray(prompt)) {
				result.push(...filterMessagesArray(prompt));
				return result;
			}
			if (typeof prompt === "string") result.push({
				role: "user",
				content: prompt
			});
			if (result.length > 0) return result;
		}
	} catch {}
	return [];
}
function requestMessagesFromPrompt(span, attributes, enableTruncation) {
	if (typeof attributes["ai.prompt"] === "string" && !attributes["gen_ai.input.messages"] && !attributes["ai.prompt.messages"]) {
		const userInput = attributes[AI_PROMPT_ATTRIBUTE];
		const messages = convertUserInputToMessagesFormat(userInput);
		if (messages.length) {
			const { systemInstructions, filteredMessages } = extractSystemInstructions(messages);
			if (systemInstructions) span.setAttribute(GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE, systemInstructions);
			const filteredLength = Array.isArray(filteredMessages) ? filteredMessages.length : 0;
			const messagesJson = enableTruncation ? getTruncatedJsonString(filteredMessages) : stringify(filteredMessages);
			span.setAttributes({
				[AI_PROMPT_ATTRIBUTE]: messagesJson,
				[GEN_AI_INPUT_MESSAGES_ATTRIBUTE]: messagesJson,
				[GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE]: filteredLength
			});
		}
	} else if (typeof attributes["ai.prompt.messages"] === "string") {
		const originalMessagesJson = attributes[AI_PROMPT_MESSAGES_ATTRIBUTE];
		try {
			const messages = JSON.parse(originalMessagesJson);
			if (Array.isArray(messages)) {
				const { systemInstructions, filteredMessages } = extractSystemInstructions(messages);
				if (systemInstructions) span.setAttribute(GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE, systemInstructions);
				const filteredLength = Array.isArray(filteredMessages) ? filteredMessages.length : 0;
				const messagesJson = !enableTruncation && filteredMessages === messages ? originalMessagesJson : enableTruncation ? getTruncatedJsonString(filteredMessages) : stringify(filteredMessages);
				span.setAttributes({
					[AI_PROMPT_MESSAGES_ATTRIBUTE]: messagesJson,
					[GEN_AI_INPUT_MESSAGES_ATTRIBUTE]: messagesJson,
					[GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE]: filteredLength
				});
			}
		} catch {}
	}
}
function onVercelAiSpanStart(span) {
	const { data: attributes, description: name } = spanToJSON(span);
	if (!name) return;
	if (attributes["ai.toolCall.name"] && attributes["ai.toolCall.id"] && name === "ai.toolCall") {
		processToolCallSpan(span, attributes);
		return;
	}
	if (!attributes["ai.operationId"] && !name.startsWith("ai.")) return;
	if (SPAN_TO_OPERATION_NAME.get(name) === "generate_content") _INTERNAL_skipAiProviderWrapping([WORKERS_AI_INTEGRATION_NAME$1]);
	const integration = getClient()?.getIntegrationByName("VercelAI");
	processGenerateSpan(span, name, attributes, shouldEnableTruncation(integration?.options?.enableTruncation));
}
function vercelAiEventProcessor(event) {
	if (event.type === "transaction" && event.spans) {
		const tokenAccumulator = /* @__PURE__ */ new Map();
		for (const span of event.spans) {
			processEndedVercelAiSpan(span);
			accumulateTokensForParent(span, tokenAccumulator);
		}
		applyToolDescriptionsAndTokens(event.spans, tokenAccumulator);
		const trace = event.contexts?.trace;
		if (trace?.op === "gen_ai.invoke_agent") applyAccumulatedTokens(trace, tokenAccumulator);
	}
	return event;
}
function normalizeFinishReason$1(finishReason) {
	if (typeof finishReason !== "string") return "stop";
	switch (finishReason) {
		case "tool-calls": return "tool_call";
		case "stop":
		case "length":
		case "content_filter":
		case "error": return finishReason;
		default: return finishReason;
	}
}
function buildOutputMessages$1(attributes) {
	const responseText = attributes[AI_RESPONSE_TEXT_ATTRIBUTE];
	const responseToolCalls = attributes[AI_RESPONSE_TOOL_CALLS_ATTRIBUTE];
	const finishReason = attributes[AI_RESPONSE_FINISH_REASON_ATTRIBUTE];
	if (responseText == null && responseToolCalls == null) return;
	const parts = [];
	if (typeof responseText === "string" && responseText.length > 0) parts.push({
		type: "text",
		content: responseText
	});
	if (responseToolCalls != null) try {
		const toolCalls = typeof responseToolCalls === "string" ? JSON.parse(responseToolCalls) : responseToolCalls;
		if (Array.isArray(toolCalls)) {
			for (const toolCall of toolCalls) {
				const args = toolCall.input ?? toolCall.args;
				parts.push({
					type: "tool_call",
					id: toolCall.toolCallId,
					name: toolCall.toolName,
					arguments: typeof args === "string" ? args : JSON.stringify(args ?? {})
				});
			}
			delete attributes[AI_RESPONSE_TOOL_CALLS_ATTRIBUTE];
		}
	} catch {}
	if (parts.length > 0) {
		const outputMessage = {
			role: "assistant",
			parts,
			finish_reason: normalizeFinishReason$1(finishReason)
		};
		attributes[GEN_AI_OUTPUT_MESSAGES_ATTRIBUTE] = JSON.stringify([outputMessage]);
		delete attributes[AI_RESPONSE_TEXT_ATTRIBUTE];
	}
}
function processVercelAiSpanAttributes(attributes) {
	renameAttributeKey(attributes, AI_USAGE_COMPLETION_TOKENS_ATTRIBUTE, GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE);
	renameAttributeKey(attributes, AI_USAGE_PROMPT_TOKENS_ATTRIBUTE, GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE);
	renameAttributeKey(attributes, AI_USAGE_CACHED_INPUT_TOKENS_ATTRIBUTE, GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE);
	renameAttributeKey(attributes, "ai.usage.inputTokens", GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE);
	renameAttributeKey(attributes, "ai.usage.outputTokens", GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE);
	renameAttributeKey(attributes, AI_USAGE_TOKENS_ATTRIBUTE, GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE);
	renameAttributeKey(attributes, "ai.response.avgOutputTokensPerSecond", "ai.response.avgCompletionTokensPerSecond");
	if (!Object.keys(attributes).some((key) => key.startsWith("ai.usage.inputTokenDetails.")) && typeof attributes["gen_ai.usage.input_tokens"] === "number" && typeof attributes["gen_ai.usage.input_tokens.cached"] === "number") attributes[GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE] = attributes[GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE] + attributes[GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE];
	if (typeof attributes["gen_ai.usage.input_tokens"] === "number") attributes[GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE] = (typeof attributes["gen_ai.usage.output_tokens"] === "number" ? attributes[GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE] : 0) + attributes[GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE];
	if (attributes["ai.prompt.tools"] && Array.isArray(attributes["ai.prompt.tools"])) attributes[AI_PROMPT_TOOLS_ATTRIBUTE] = convertAvailableToolsToJsonString(attributes[AI_PROMPT_TOOLS_ATTRIBUTE]);
	if (attributes["operation.name"]) {
		const rawOperationName = attributes["ai.operationId"] ? attributes[AI_OPERATION_ID_ATTRIBUTE] : attributes[OPERATION_NAME_ATTRIBUTE];
		attributes[GEN_AI_OPERATION_NAME_ATTRIBUTE] = SPAN_TO_OPERATION_NAME.get(rawOperationName) ?? rawOperationName;
		delete attributes[OPERATION_NAME_ATTRIBUTE];
	}
	renameAttributeKey(attributes, AI_PROMPT_MESSAGES_ATTRIBUTE, GEN_AI_INPUT_MESSAGES_ATTRIBUTE);
	buildOutputMessages$1(attributes);
	renameAttributeKey(attributes, AI_RESPONSE_OBJECT_ATTRIBUTE, "gen_ai.response.object");
	renameAttributeKey(attributes, AI_PROMPT_TOOLS_ATTRIBUTE, "gen_ai.request.available_tools");
	renameAttributeKey(attributes, AI_TOOL_CALL_ARGS_ATTRIBUTE, GEN_AI_TOOL_INPUT_ATTRIBUTE);
	renameAttributeKey(attributes, AI_TOOL_CALL_RESULT_ATTRIBUTE, GEN_AI_TOOL_OUTPUT_ATTRIBUTE);
	renameAttributeKey(attributes, AI_SCHEMA_ATTRIBUTE, "gen_ai.request.schema");
	renameAttributeKey(attributes, AI_MODEL_ID_ATTRIBUTE, GEN_AI_REQUEST_MODEL_ATTRIBUTE);
	if (Array.isArray(attributes["ai.values"])) {
		const parsed = attributes[AI_VALUES_ATTRIBUTE].map((v) => {
			try {
				return JSON.parse(v);
			} catch {
				return v;
			}
		});
		attributes[GEN_AI_EMBEDDINGS_INPUT_ATTRIBUTE] = parsed.length === 1 ? parsed[0] : JSON.stringify(parsed);
	}
	addProviderMetadataToAttributes(attributes);
	for (const key of Object.keys(attributes)) {
		if (Array.isArray(attributes[key])) attributes[key] = JSON.stringify(attributes[key]);
		if (key.startsWith("ai.")) renameAttributeKey(attributes, key, `vercel.${key}`);
	}
}
function processEndedVercelAiSpan(span) {
	const { data: attributes, origin } = span;
	if (origin !== "auto.vercelai.otel") return;
	if (span.status && span.status !== "ok") span.status = "internal_error";
	processVercelAiSpanAttributes(attributes);
}
function processVercelAiStreamedSpan(span) {
	const attributes = span.attributes;
	if (attributes?.["sentry.origin"] !== "auto.vercelai.otel") return;
	processVercelAiSpanAttributes(attributes);
	if (attributes["sentry.op"] === "gen_ai.execute_tool" && span.parent_span_id) {
		const descriptions = toolDescriptionMap.get(span.parent_span_id);
		if (descriptions) {
			const toolName = attributes[GEN_AI_TOOL_NAME_ATTRIBUTE];
			if (typeof toolName === "string") {
				const desc = descriptions.get(toolName);
				if (desc) attributes[GEN_AI_TOOL_DESCRIPTION_ATTRIBUTE$1] = desc;
			}
		}
	}
	toolDescriptionMap.delete(span.span_id);
}
function renameAttributeKey(attributes, oldKey, newKey) {
	if (attributes[oldKey] != null) {
		attributes[newKey] = attributes[oldKey];
		delete attributes[oldKey];
	}
}
function processToolCallSpan(span, attributes) {
	span.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN, "auto.vercelai.otel");
	span.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_OP, "gen_ai.execute_tool");
	span.setAttribute(GEN_AI_OPERATION_NAME_ATTRIBUTE, "execute_tool");
	renameAttributeKey(attributes, AI_TOOL_CALL_NAME_ATTRIBUTE, GEN_AI_TOOL_NAME_ATTRIBUTE);
	renameAttributeKey(attributes, AI_TOOL_CALL_ID_ATTRIBUTE, GEN_AI_TOOL_CALL_ID_ATTRIBUTE$1);
	const toolCallId = attributes[GEN_AI_TOOL_CALL_ID_ATTRIBUTE$1];
	if (typeof toolCallId === "string") toolCallSpanContextMap.set(toolCallId, span.spanContext());
	if (!attributes["gen_ai.tool.type"]) span.setAttribute(GEN_AI_TOOL_TYPE_ATTRIBUTE, "function");
	const toolName = attributes[GEN_AI_TOOL_NAME_ATTRIBUTE];
	if (toolName) span.updateName(`execute_tool ${toolName}`);
}
function processGenerateSpan(span, name, attributes, enableTruncation) {
	span.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN, "auto.vercelai.otel");
	const nameWthoutAi = name.replace("ai.", "");
	span.setAttribute("ai.pipeline.name", nameWthoutAi);
	span.updateName(nameWthoutAi);
	const functionId = attributes[AI_TELEMETRY_FUNCTION_ID_ATTRIBUTE];
	if (functionId && typeof functionId === "string") span.setAttribute("gen_ai.function_id", functionId);
	requestMessagesFromPrompt(span, attributes, enableTruncation);
	if (attributes["ai.model.id"] && !attributes["gen_ai.response.model"]) span.setAttribute(GEN_AI_RESPONSE_MODEL_ATTRIBUTE, attributes[AI_MODEL_ID_ATTRIBUTE]);
	span.setAttribute("ai.streaming", name.includes("stream"));
	const operationName = SPAN_TO_OPERATION_NAME.get(name);
	if (operationName) span.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_OP, `gen_ai.${operationName}`);
	else if (name.startsWith("ai.stream")) span.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_OP, "ai.run");
	if (operationName === "invoke_agent") {
		if (functionId && typeof functionId === "string") span.updateName(`invoke_agent ${functionId}`);
		else span.updateName("invoke_agent");
		return;
	}
	const modelId = attributes[AI_MODEL_ID_ATTRIBUTE];
	if (modelId && operationName) span.updateName(`${operationName} ${modelId}`);
	const client = getClient();
	if (client && hasSpanStreamingEnabled(client) && attributes["ai.prompt.tools"] && Array.isArray(attributes["ai.prompt.tools"])) {
		const descriptions = /* @__PURE__ */ new Map();
		for (const toolStr of attributes[AI_PROMPT_TOOLS_ATTRIBUTE]) try {
			const parsed = typeof toolStr === "string" ? JSON.parse(toolStr) : toolStr;
			if (parsed?.name && parsed?.description) descriptions.set(parsed.name, parsed.description);
		} catch {}
		if (descriptions.size > 0) {
			const parentSpanId = spanToJSON(span).parent_span_id;
			if (parentSpanId) toolDescriptionMap.set(parentSpanId, descriptions);
		}
	}
}
var CLIENTS_WITH_VERCEL_AI_PROCESSORS = /* @__PURE__ */ new WeakSet();
function addVercelAiProcessors(client) {
	if (CLIENTS_WITH_VERCEL_AI_PROCESSORS.has(client)) return;
	CLIENTS_WITH_VERCEL_AI_PROCESSORS.add(client);
	client.on("spanStart", onVercelAiSpanStart);
	client.addEventProcessor(Object.assign(vercelAiEventProcessor, { id: "VercelAiEventProcessor" }));
	client.on("processSpan", (span) => {
		processVercelAiStreamedSpan(span);
	});
}
function getProviderMetadataAttributes(providerMetadata) {
	const attributes = {};
	if (!providerMetadata || typeof providerMetadata !== "object") return attributes;
	const metadata = providerMetadata;
	const openaiMetadata = metadata.openai ?? metadata.azure;
	if (openaiMetadata) {
		setAttributeIfDefined(attributes, GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE, openaiMetadata.cachedPromptTokens);
		setAttributeIfDefined(attributes, "gen_ai.usage.output_tokens.reasoning", openaiMetadata.reasoningTokens);
		setAttributeIfDefined(attributes, "gen_ai.usage.output_tokens.prediction_accepted", openaiMetadata.acceptedPredictionTokens);
		setAttributeIfDefined(attributes, "gen_ai.usage.output_tokens.prediction_rejected", openaiMetadata.rejectedPredictionTokens);
		setAttributeIfDefined(attributes, GEN_AI_CONVERSATION_ID_ATTRIBUTE, openaiMetadata.responseId);
	}
	if (metadata.anthropic) {
		setAttributeIfDefined(attributes, GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE, metadata.anthropic.usage?.cache_read_input_tokens ?? metadata.anthropic.cacheReadInputTokens);
		setAttributeIfDefined(attributes, GEN_AI_USAGE_INPUT_TOKENS_CACHE_WRITE_ATTRIBUTE, metadata.anthropic.usage?.cache_creation_input_tokens ?? metadata.anthropic.cacheCreationInputTokens);
	}
	if (metadata.bedrock?.usage) {
		setAttributeIfDefined(attributes, GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE, metadata.bedrock.usage.cacheReadInputTokens);
		setAttributeIfDefined(attributes, GEN_AI_USAGE_INPUT_TOKENS_CACHE_WRITE_ATTRIBUTE, metadata.bedrock.usage.cacheWriteInputTokens);
	}
	if (metadata.deepseek) {
		setAttributeIfDefined(attributes, GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE, metadata.deepseek.promptCacheHitTokens);
		setAttributeIfDefined(attributes, "gen_ai.usage.input_tokens.cache_miss", metadata.deepseek.promptCacheMissTokens);
	}
	const googleUsage = (metadata.google ?? metadata.vertex)?.usageMetadata;
	if (googleUsage && typeof googleUsage.thoughtsTokenCount === "number" && googleUsage.thoughtsTokenCount > 0) {
		attributes[GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE] = (googleUsage.candidatesTokenCount ?? 0) + googleUsage.thoughtsTokenCount;
		setAttributeIfDefined(attributes, GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE, googleUsage.totalTokenCount);
		setAttributeIfDefined(attributes, "gen_ai.usage.reasoning.output_tokens", googleUsage.thoughtsTokenCount);
	}
	return attributes;
}
var LAST_STEP_ONLY_USAGE_KEYS = /* @__PURE__ */ new Set([
	GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE,
	GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE,
	"gen_ai.usage.reasoning.output_tokens"
]);
function addProviderMetadataToAttributes(attributes) {
	const providerMetadata = attributes[AI_RESPONSE_PROVIDER_METADATA_ATTRIBUTE];
	if (!providerMetadata) return;
	const lastStepOnly = attributes[GEN_AI_OPERATION_NAME_ATTRIBUTE] === "invoke_agent";
	try {
		const derived = getProviderMetadataAttributes(JSON.parse(providerMetadata));
		for (const [key, value] of Object.entries(derived)) {
			if (key === "gen_ai.conversation.id" && attributes[key]) continue;
			if (lastStepOnly && LAST_STEP_ONLY_USAGE_KEYS.has(key)) continue;
			attributes[key] = value;
		}
	} catch {}
}
function setAttributeIfDefined(attributes, key, value) {
	if (value != null) attributes[key] = value;
}
var OPENAI_INTEGRATION_NAME = "OpenAI";
var OPENAI_METHOD_REGISTRY = {
	"responses.create": { operation: "chat" },
	"chat.completions.create": { operation: "chat" },
	"embeddings.create": { operation: "embeddings" },
	"conversations.create": { operation: "chat" }
};
var RESPONSE_EVENT_TYPES = [
	"response.created",
	"response.in_progress",
	"response.failed",
	"response.completed",
	"response.incomplete",
	"response.queued",
	"response.output_text.delta",
	...[
		"response.output_item.added",
		"response.function_call_arguments.delta",
		"response.function_call_arguments.done",
		"response.output_item.done"
	]
];
function isResponsesApiStreamEvent(event) {
	return event !== null && typeof event === "object" && "type" in event && typeof event.type === "string" && event.type.startsWith("response.");
}
function isChatCompletionChunk(event) {
	return event !== null && typeof event === "object" && "object" in event && event.object === "chat.completion.chunk";
}
function addResponseAttributes$2(span, result, recordOutputs) {
	if (!result || typeof result !== "object") return;
	const response = result;
	const attrs = {};
	if (typeof response.id === "string") attrs[GEN_AI_RESPONSE_ID_ATTRIBUTE] = response.id;
	if (typeof response.model === "string") attrs[GEN_AI_RESPONSE_MODEL_ATTRIBUTE] = response.model;
	if (response.object === "conversation" && typeof response.id === "string") attrs[GEN_AI_CONVERSATION_ID_ATTRIBUTE] = response.id;
	if (response.usage && typeof response.usage === "object") {
		const usage = response.usage;
		const inputTokens = usage.prompt_tokens ?? usage.input_tokens;
		if (typeof inputTokens === "number") attrs[GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE] = inputTokens;
		const outputTokens = usage.completion_tokens ?? usage.output_tokens;
		if (typeof outputTokens === "number") attrs[GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE] = outputTokens;
		if (typeof usage.total_tokens === "number") attrs[GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE] = usage.total_tokens;
	}
	if (Array.isArray(response.choices)) {
		const choices = response.choices;
		const finishReasons = choices.map((choice) => choice.finish_reason).filter((reason) => typeof reason === "string");
		if (finishReasons.length > 0) attrs[GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE] = JSON.stringify(finishReasons);
		if (recordOutputs) {
			const responseTexts = choices.map((choice) => {
				return choice.message?.content || "";
			});
			attrs[GEN_AI_RESPONSE_TEXT_ATTRIBUTE] = JSON.stringify(responseTexts);
			const toolCalls = choices.map((choice) => {
				return choice.message?.tool_calls;
			}).filter((calls) => Array.isArray(calls) && calls.length > 0).flat();
			if (toolCalls.length > 0) attrs[GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE] = JSON.stringify(toolCalls);
		}
	}
	if (typeof response.status === "string") {
		if (!attrs["gen_ai.response.finish_reasons"]) attrs[GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE] = JSON.stringify([response.status]);
	}
	if (recordOutputs) {
		if (typeof response.output_text === "string" && !attrs["gen_ai.response.text"]) attrs[GEN_AI_RESPONSE_TEXT_ATTRIBUTE] = response.output_text;
		if (Array.isArray(response.output) && response.output.length > 0 && !attrs["gen_ai.response.tool_calls"]) {
			const functionCalls = response.output.filter((item) => item?.type === "function_call");
			if (functionCalls.length > 0) attrs[GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE] = JSON.stringify(functionCalls);
		}
	}
	span.setAttributes(attrs);
}
function extractConversationId(params) {
	if ("conversation" in params && typeof params.conversation === "string") return params.conversation;
	if ("previous_response_id" in params && typeof params.previous_response_id === "string") return params.previous_response_id;
}
function extractRequestParameters(params) {
	const attributes = { [GEN_AI_REQUEST_MODEL_ATTRIBUTE]: params.model ?? "unknown" };
	if ("temperature" in params) attributes[GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE] = params.temperature;
	if ("top_p" in params) attributes[GEN_AI_REQUEST_TOP_P_ATTRIBUTE] = params.top_p;
	if ("frequency_penalty" in params) attributes[GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE] = params.frequency_penalty;
	if ("presence_penalty" in params) attributes[GEN_AI_REQUEST_PRESENCE_PENALTY_ATTRIBUTE] = params.presence_penalty;
	if ("stream" in params) attributes[GEN_AI_REQUEST_STREAM_ATTRIBUTE] = params.stream;
	if ("encoding_format" in params) attributes[GEN_AI_REQUEST_ENCODING_FORMAT_ATTRIBUTE] = params.encoding_format;
	if ("dimensions" in params) attributes[GEN_AI_REQUEST_DIMENSIONS_ATTRIBUTE] = params.dimensions;
	const conversationId = extractConversationId(params);
	if (conversationId) attributes[GEN_AI_CONVERSATION_ID_ATTRIBUTE] = conversationId;
	return attributes;
}
function processChatCompletionToolCalls(toolCalls, state) {
	for (const toolCall of toolCalls) {
		const index = toolCall.index;
		if (index === void 0 || !toolCall.function) continue;
		if (!(index in state.chatCompletionToolCalls)) state.chatCompletionToolCalls[index] = {
			...toolCall,
			function: {
				name: toolCall.function.name,
				arguments: toolCall.function.arguments || ""
			}
		};
		else {
			const existingToolCall = state.chatCompletionToolCalls[index];
			if (toolCall.function.arguments && existingToolCall?.function) existingToolCall.function.arguments += toolCall.function.arguments;
		}
	}
}
function processChatCompletionChunk(chunk, state, recordOutputs) {
	state.responseId = chunk.id ?? state.responseId;
	state.responseModel = chunk.model ?? state.responseModel;
	if (chunk.usage) {
		state.promptTokens = chunk.usage.prompt_tokens;
		state.completionTokens = chunk.usage.completion_tokens;
		state.totalTokens = chunk.usage.total_tokens;
	}
	for (const choice of chunk.choices ?? []) {
		if (recordOutputs) {
			if (choice.delta?.content) state.responseTexts.push(choice.delta.content);
			if (choice.delta?.tool_calls) processChatCompletionToolCalls(choice.delta.tool_calls, state);
		}
		if (choice.finish_reason) state.finishReasons.push(choice.finish_reason);
	}
}
function processResponsesApiEvent(streamEvent, state, recordOutputs, span) {
	if (!(streamEvent && typeof streamEvent === "object")) {
		state.eventTypes.push("unknown:non-object");
		return;
	}
	if (streamEvent instanceof Error) {
		span.setStatus({
			code: 2,
			message: "internal_error"
		});
		captureException(streamEvent, { mechanism: {
			handled: false,
			type: "auto.ai.openai.stream-response"
		} });
		return;
	}
	if (!("type" in streamEvent)) return;
	const event = streamEvent;
	if (!RESPONSE_EVENT_TYPES.includes(event.type)) {
		state.eventTypes.push(event.type);
		return;
	}
	if (recordOutputs) {
		if (event.type === "response.output_item.done" && "item" in event) state.responsesApiToolCalls.push(event.item);
		if (event.type === "response.output_text.delta" && "delta" in event && event.delta) {
			state.responseTexts.push(event.delta);
			return;
		}
	}
	if ("response" in event) {
		const { response } = event;
		state.responseId = response.id ?? state.responseId;
		state.responseModel = response.model ?? state.responseModel;
		if (response.usage) {
			state.promptTokens = response.usage.input_tokens;
			state.completionTokens = response.usage.output_tokens;
			state.totalTokens = response.usage.total_tokens;
		}
		if (response.status) state.finishReasons.push(response.status);
		if (recordOutputs && response.output_text) state.responseTexts.push(response.output_text);
	}
}
async function* instrumentStream$1(stream, span, recordOutputs) {
	const state = {
		eventTypes: [],
		responseTexts: [],
		finishReasons: [],
		responseId: "",
		responseModel: "",
		promptTokens: void 0,
		completionTokens: void 0,
		totalTokens: void 0,
		chatCompletionToolCalls: {},
		responsesApiToolCalls: []
	};
	try {
		for await (const event of stream) {
			if (isChatCompletionChunk(event)) processChatCompletionChunk(event, state, recordOutputs);
			else if (isResponsesApiStreamEvent(event)) processResponsesApiEvent(event, state, recordOutputs, span);
			yield event;
		}
	} finally {
		const allToolCalls = [...Object.values(state.chatCompletionToolCalls), ...state.responsesApiToolCalls];
		endStreamSpan(span, {
			...state,
			toolCalls: allToolCalls
		}, recordOutputs);
	}
}
function extractAvailableTools(params) {
	const tools = Array.isArray(params.tools) ? params.tools : [];
	const webSearchOptions = params.web_search_options && typeof params.web_search_options === "object" ? [{
		type: "web_search_options",
		...params.web_search_options
	}] : [];
	const availableTools = [...tools, ...webSearchOptions];
	if (availableTools.length === 0) return;
	try {
		return JSON.stringify(availableTools);
	} catch (error) {
		DEBUG_BUILD$4 && debug.error("Failed to serialize OpenAI tools:", error);
		return;
	}
}
function extractRequestAttributes$2(args, operationName) {
	const attributes = {
		[GEN_AI_SYSTEM_ATTRIBUTE]: "openai",
		[GEN_AI_OPERATION_NAME_ATTRIBUTE]: operationName,
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ai.openai"
	};
	if (args.length > 0 && typeof args[0] === "object" && args[0] !== null) {
		const params = args[0];
		const availableTools = extractAvailableTools(params);
		if (availableTools) attributes[GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE] = availableTools;
		Object.assign(attributes, extractRequestParameters(params));
	} else attributes[GEN_AI_REQUEST_MODEL_ATTRIBUTE] = "unknown";
	return attributes;
}
function addRequestAttributes(span, params, operationName, enableTruncation) {
	if (operationName === "embeddings" && "input" in params) {
		const input = params.input;
		if (input == null) return;
		if (typeof input === "string" && input.length === 0) return;
		if (Array.isArray(input) && input.length === 0) return;
		span.setAttribute(GEN_AI_EMBEDDINGS_INPUT_ATTRIBUTE, typeof input === "string" ? input : JSON.stringify(input));
		return;
	}
	const src = "input" in params ? params.input : "messages" in params ? params.messages : void 0;
	if (!src) return;
	if (Array.isArray(src) && src.length === 0) return;
	const { systemInstructions, filteredMessages } = extractSystemInstructions(src);
	if (systemInstructions) span.setAttribute(GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE, systemInstructions);
	span.setAttribute(GEN_AI_INPUT_MESSAGES_ATTRIBUTE, enableTruncation ? getTruncatedJsonString(filteredMessages) : stringify(filteredMessages));
	if (Array.isArray(filteredMessages)) span.setAttribute(GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE, filteredMessages.length);
	else span.setAttribute(GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE, 1);
}
function instrumentMethod$2(originalMethod, methodPath, instrumentedMethod, context, options) {
	return function instrumentedCall(...args) {
		const operationName = instrumentedMethod.operation || "unknown";
		const requestAttributes = extractRequestAttributes$2(args, operationName);
		const model = requestAttributes["gen_ai.request.model"] || "unknown";
		const params = args[0];
		const isStreamRequested = params && typeof params === "object" && params.stream === true;
		const spanConfig = {
			name: `${operationName} ${model}`,
			op: `gen_ai.${operationName}`,
			attributes: requestAttributes
		};
		if (isStreamRequested) {
			let originalResult2;
			const instrumentedPromise2 = startSpanManual$1(spanConfig, (span) => {
				originalResult2 = originalMethod.apply(context, args);
				if (options.recordInputs && params) addRequestAttributes(span, params, operationName, shouldEnableTruncation(options.enableTruncation));
				return (async () => {
					try {
						return instrumentStream$1(await originalResult2, span, options.recordOutputs ?? false);
					} catch (error) {
						span.setStatus({
							code: 2,
							message: "internal_error"
						});
						span.end();
						throw error;
					}
				})();
			});
			return wrapPromiseWithMethods(originalResult2, instrumentedPromise2);
		}
		let originalResult;
		const instrumentedPromise = startSpan$2(spanConfig, (span) => {
			originalResult = originalMethod.apply(context, args);
			if (options.recordInputs && params) addRequestAttributes(span, params, operationName, shouldEnableTruncation(options.enableTruncation));
			return originalResult.then((result) => {
				addResponseAttributes$2(span, result, options.recordOutputs);
				return result;
			});
		});
		return wrapPromiseWithMethods(originalResult, instrumentedPromise);
	};
}
function createDeepProxy$1(target, currentPath = "", options) {
	return new Proxy(target, { get(obj, prop) {
		const value = obj[prop];
		const methodPath = buildMethodPath(currentPath, String(prop));
		const instrumentedMethod = OPENAI_METHOD_REGISTRY[methodPath];
		if (typeof value === "function" && instrumentedMethod) return instrumentMethod$2(value, methodPath, instrumentedMethod, obj, options);
		if (typeof value === "function") return value.bind(obj);
		if (value && typeof value === "object") return createDeepProxy$1(value, methodPath, options);
		return value;
	} });
}
function instrumentOpenAiClient(client, options) {
	return createDeepProxy$1(client, "", resolveAIRecordingOptions(options));
}
var ANTHROPIC_AI_INTEGRATION_NAME = "Anthropic_AI";
var ANTHROPIC_METHOD_REGISTRY = {
	"messages.create": { operation: "chat" },
	"messages.stream": {
		operation: "chat",
		streaming: true
	},
	"messages.countTokens": { operation: "chat" },
	"models.get": { operation: "models" },
	"completions.create": { operation: "chat" },
	"models.retrieve": { operation: "models" },
	"beta.messages.create": { operation: "chat" }
};
function setMessagesAttribute(span, messages, enableTruncation) {
	if (Array.isArray(messages) && messages.length === 0) return;
	const { systemInstructions, filteredMessages } = extractSystemInstructions(messages);
	if (systemInstructions) span.setAttributes({ [GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE]: systemInstructions });
	const filteredLength = Array.isArray(filteredMessages) ? filteredMessages.length : 1;
	span.setAttributes({
		[GEN_AI_INPUT_MESSAGES_ATTRIBUTE]: enableTruncation ? getTruncatedJsonString(filteredMessages) : stringify(filteredMessages),
		[GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE]: filteredLength
	});
}
var ANTHROPIC_ERROR_TYPE_TO_SPAN_STATUS = {
	invalid_request_error: "invalid_argument",
	authentication_error: "unauthenticated",
	permission_error: "permission_denied",
	not_found_error: "not_found",
	request_too_large: "failed_precondition",
	rate_limit_error: "resource_exhausted",
	api_error: "internal_error",
	overloaded_error: "unavailable"
};
function mapAnthropicErrorToStatusMessage(errorType) {
	if (!errorType) return "internal_error";
	return ANTHROPIC_ERROR_TYPE_TO_SPAN_STATUS[errorType] || "internal_error";
}
function handleResponseError(span, response) {
	if (response.error) {
		span.setStatus({
			code: 2,
			message: mapAnthropicErrorToStatusMessage(response.error.type)
		});
		captureException(response.error, { mechanism: {
			handled: false,
			type: "auto.ai.anthropic.anthropic_error"
		} });
	}
}
function messagesFromParams(params) {
	const { system, messages, input } = params;
	const systemMessages = typeof system === "string" ? [{
		role: "system",
		content: params.system
	}] : [];
	const userMessages = (Array.isArray(input) ? input : input != null ? [input] : void 0) ?? (Array.isArray(messages) ? messages : messages != null ? [messages] : []);
	return [...systemMessages, ...userMessages];
}
function isErrorEvent(event, span) {
	if ("type" in event && typeof event.type === "string") {
		if (event.type === "error") {
			span.setStatus({
				code: 2,
				message: mapAnthropicErrorToStatusMessage(event.error?.type)
			});
			return true;
		}
	}
	return false;
}
function handleMessageMetadata(event, state) {
	if (event.type === "message_delta") {
		if (event.usage && typeof event.usage.output_tokens === "number") state.completionTokens = event.usage.output_tokens;
		if (event.delta?.stop_reason) state.finishReasons.push(event.delta.stop_reason);
	}
	if (event.message) {
		const message = event.message;
		if (message.id) state.responseId = message.id;
		if (message.model) state.responseModel = message.model;
		if (message.usage) {
			if (typeof message.usage.input_tokens === "number") state.promptTokens = message.usage.input_tokens;
			if (typeof message.usage.cache_creation_input_tokens === "number") state.cacheCreationInputTokens = message.usage.cache_creation_input_tokens;
			if (typeof message.usage.cache_read_input_tokens === "number") state.cacheReadInputTokens = message.usage.cache_read_input_tokens;
		}
	}
}
function handleContentBlockStart(event, state) {
	if (event.type !== "content_block_start" || typeof event.index !== "number" || !event.content_block) return;
	if (event.content_block.type === "tool_use" || event.content_block.type === "server_tool_use") state.activeToolBlocks[event.index] = {
		id: event.content_block.id,
		name: event.content_block.name,
		inputJsonParts: []
	};
}
function handleContentBlockDelta(event, state, recordOutputs) {
	if (event.type !== "content_block_delta" || !event.delta) return;
	if (typeof event.index === "number" && "partial_json" in event.delta && typeof event.delta.partial_json === "string") {
		const active = state.activeToolBlocks[event.index];
		if (active) active.inputJsonParts.push(event.delta.partial_json);
	}
	if (recordOutputs && typeof event.delta.text === "string") state.responseTexts.push(event.delta.text);
}
function handleContentBlockStop(event, state) {
	if (event.type !== "content_block_stop" || typeof event.index !== "number") return;
	const active = state.activeToolBlocks[event.index];
	if (!active) return;
	const raw = active.inputJsonParts.join("");
	let parsedInput;
	try {
		parsedInput = raw ? JSON.parse(raw) : {};
	} catch {
		parsedInput = { __unparsed: raw };
	}
	state.toolCalls.push({
		type: "tool_use",
		id: active.id,
		name: active.name,
		input: parsedInput
	});
	delete state.activeToolBlocks[event.index];
}
function processEvent(event, state, recordOutputs, span) {
	if (!(event && typeof event === "object")) return;
	if (isErrorEvent(event, span)) return;
	handleMessageMetadata(event, state);
	handleContentBlockStart(event, state);
	handleContentBlockDelta(event, state, recordOutputs);
	handleContentBlockStop(event, state);
}
async function* instrumentAsyncIterableStream(stream, span, recordOutputs) {
	const state = {
		responseTexts: [],
		finishReasons: [],
		responseId: "",
		responseModel: "",
		promptTokens: void 0,
		completionTokens: void 0,
		cacheCreationInputTokens: void 0,
		cacheReadInputTokens: void 0,
		toolCalls: [],
		activeToolBlocks: {}
	};
	try {
		for await (const event of stream) {
			processEvent(event, state, recordOutputs, span);
			yield event;
		}
	} finally {
		endStreamSpan(span, state, recordOutputs);
	}
}
function instrumentMessageStream(stream, span, recordOutputs) {
	const state = {
		responseTexts: [],
		finishReasons: [],
		responseId: "",
		responseModel: "",
		promptTokens: void 0,
		completionTokens: void 0,
		cacheCreationInputTokens: void 0,
		cacheReadInputTokens: void 0,
		toolCalls: [],
		activeToolBlocks: {}
	};
	stream.on("streamEvent", (event) => {
		processEvent(event, state, recordOutputs, span);
	});
	stream.on("message", () => {
		endStreamSpan(span, state, recordOutputs);
	});
	stream.on("error", (error) => {
		captureException(error, { mechanism: {
			handled: false,
			type: "auto.ai.anthropic.stream_error"
		} });
		if (span.isRecording()) {
			span.setStatus({
				code: 2,
				message: "internal_error"
			});
			span.end();
		}
	});
	return stream;
}
var suppressDelegatedCreate = false;
var INSTRUMENTED_METHODS$1 = /* @__PURE__ */ new WeakSet();
function extractRequestAttributes$1(args, methodPath, operationName) {
	const attributes = {
		[GEN_AI_SYSTEM_ATTRIBUTE]: "anthropic",
		[GEN_AI_OPERATION_NAME_ATTRIBUTE]: operationName,
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ai.anthropic"
	};
	if (args.length > 0 && typeof args[0] === "object" && args[0] !== null) {
		const params = args[0];
		if (params.tools && Array.isArray(params.tools)) attributes[GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE] = JSON.stringify(params.tools);
		attributes[GEN_AI_REQUEST_MODEL_ATTRIBUTE] = params.model ?? "unknown";
		if ("temperature" in params) attributes[GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE] = params.temperature;
		if ("top_p" in params) attributes[GEN_AI_REQUEST_TOP_P_ATTRIBUTE] = params.top_p;
		if ("stream" in params) attributes[GEN_AI_REQUEST_STREAM_ATTRIBUTE] = params.stream;
		if ("top_k" in params) attributes[GEN_AI_REQUEST_TOP_K_ATTRIBUTE] = params.top_k;
		if ("frequency_penalty" in params) attributes[GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE] = params.frequency_penalty;
		if ("max_tokens" in params) attributes[GEN_AI_REQUEST_MAX_TOKENS_ATTRIBUTE] = params.max_tokens;
	} else if (methodPath === "models.retrieve" || methodPath === "models.get") attributes[GEN_AI_REQUEST_MODEL_ATTRIBUTE] = args[0];
	else attributes[GEN_AI_REQUEST_MODEL_ATTRIBUTE] = "unknown";
	return attributes;
}
function addPrivateRequestAttributes$1(span, params, enableTruncation) {
	setMessagesAttribute(span, messagesFromParams(params), enableTruncation);
	if ("prompt" in params) span.setAttributes({ [GEN_AI_PROMPT_ATTRIBUTE]: JSON.stringify(params.prompt) });
}
function addContentAttributes(span, response) {
	if ("content" in response) {
		if (Array.isArray(response.content)) {
			span.setAttributes({ [GEN_AI_RESPONSE_TEXT_ATTRIBUTE]: response.content.map((item) => item.text).filter((text) => !!text).join("") });
			const toolCalls = [];
			for (const item of response.content) if (item.type === "tool_use" || item.type === "server_tool_use") toolCalls.push(item);
			if (toolCalls.length > 0) span.setAttributes({ [GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE]: JSON.stringify(toolCalls) });
		}
	}
	if ("completion" in response) span.setAttributes({ [GEN_AI_RESPONSE_TEXT_ATTRIBUTE]: response.completion });
	if ("input_tokens" in response) span.setAttributes({ [GEN_AI_RESPONSE_TEXT_ATTRIBUTE]: JSON.stringify(response.input_tokens) });
}
function addMetadataAttributes(span, response) {
	if ("id" in response && "model" in response) {
		span.setAttributes({
			[GEN_AI_RESPONSE_ID_ATTRIBUTE]: response.id,
			[GEN_AI_RESPONSE_MODEL_ATTRIBUTE]: response.model
		});
		if ("usage" in response && response.usage) setTokenUsageAttributes(span, response.usage.input_tokens, response.usage.output_tokens, response.usage.cache_creation_input_tokens, response.usage.cache_read_input_tokens);
	}
}
function addResponseAttributes$1(span, response, recordOutputs) {
	if (!response || typeof response !== "object") return;
	if ("type" in response && response.type === "error") {
		handleResponseError(span, response);
		return;
	}
	if (recordOutputs) addContentAttributes(span, response);
	addMetadataAttributes(span, response);
}
function handleStreamingError(error, span) {
	if (span.isRecording()) {
		span.setStatus({
			code: 2,
			message: "internal_error"
		});
		span.end();
	}
	throw error;
}
function handleStreamingRequest(target, invocationThis, args, requestAttributes, operationName, methodPath, params, options, isStreamRequested, isStreamingMethod) {
	const spanConfig = {
		name: `${operationName} ${requestAttributes["gen_ai.request.model"] ?? "unknown"}`,
		op: `gen_ai.${operationName}`,
		attributes: requestAttributes
	};
	if (isStreamRequested && !isStreamingMethod) {
		let originalResult;
		const instrumentedPromise = startSpanManual$1(spanConfig, (span) => {
			originalResult = target.apply(invocationThis, args);
			if (options.recordInputs && params) addPrivateRequestAttributes$1(span, params, shouldEnableTruncation(options.enableTruncation));
			return (async () => {
				try {
					return instrumentAsyncIterableStream(await originalResult, span, options.recordOutputs ?? false);
				} catch (error) {
					return handleStreamingError(error, span);
				}
			})();
		});
		return wrapPromiseWithMethods(originalResult, instrumentedPromise);
	} else return startSpanManual$1(spanConfig, (span) => {
		try {
			if (options.recordInputs && params) addPrivateRequestAttributes$1(span, params, shouldEnableTruncation(options.enableTruncation));
			suppressDelegatedCreate = true;
			const messageStream = target.apply(invocationThis, args);
			suppressDelegatedCreate = false;
			return instrumentMessageStream(messageStream, span, options.recordOutputs ?? false);
		} catch (error) {
			suppressDelegatedCreate = false;
			return handleStreamingError(error, span);
		}
	});
}
function instrumentMethod$1(originalMethod, methodPath, instrumentedMethod, context, options) {
	return new Proxy(originalMethod, { apply(target, thisArg, args) {
		const invocationThis = thisArg !== void 0 ? thisArg : context;
		const isStreamingMethod = instrumentedMethod.streaming === true;
		if (!isStreamingMethod && suppressDelegatedCreate) return target.apply(invocationThis, args);
		const operationName = instrumentedMethod.operation || "unknown";
		const requestAttributes = extractRequestAttributes$1(args, methodPath, operationName);
		const model = requestAttributes["gen_ai.request.model"] ?? "unknown";
		const params = typeof args[0] === "object" ? args[0] : void 0;
		const isStreamRequested = Boolean(params?.stream);
		if (isStreamRequested || isStreamingMethod) return handleStreamingRequest(target, invocationThis, args, requestAttributes, operationName, methodPath, params, options, isStreamRequested, isStreamingMethod);
		let originalResult;
		const instrumentedPromise = startSpan$2({
			name: `${operationName} ${model}`,
			op: `gen_ai.${operationName}`,
			attributes: requestAttributes
		}, (span) => {
			originalResult = target.apply(invocationThis, args);
			if (options.recordInputs && params) addPrivateRequestAttributes$1(span, params, shouldEnableTruncation(options.enableTruncation));
			return originalResult.then((result) => {
				addResponseAttributes$1(span, result, options.recordOutputs);
				return result;
			});
		});
		return wrapPromiseWithMethods(originalResult, instrumentedPromise);
	} });
}
function instrumentClientInPlace(client, options) {
	for (const methodPath of Object.keys(ANTHROPIC_METHOD_REGISTRY)) {
		const segments = methodPath.split(".");
		const methodName = segments.pop();
		let owner = client;
		for (const segment of segments) owner = owner?.[segment];
		if (!owner || typeof owner[methodName] !== "function") continue;
		const originalMethod = owner[methodName];
		if (INSTRUMENTED_METHODS$1.has(originalMethod)) continue;
		const instrumented = instrumentMethod$1(originalMethod, methodPath, ANTHROPIC_METHOD_REGISTRY[methodPath], owner, options);
		INSTRUMENTED_METHODS$1.add(instrumented);
		owner[methodName] = instrumented;
	}
	return client;
}
function instrumentAnthropicAiClient(anthropicAiClient, options) {
	return instrumentClientInPlace(anthropicAiClient, resolveAIRecordingOptions(options));
}
var GOOGLE_GENAI_INTEGRATION_NAME = "Google_GenAI";
var GOOGLE_GENAI_METHOD_REGISTRY = {
	"models.generateContent": { operation: "generate_content" },
	"models.generateContentStream": {
		operation: "generate_content",
		streaming: true
	},
	"models.embedContent": { operation: "embeddings" },
	"chats.create": { proxyResultPath: "chat" },
	"chat.sendMessage": { operation: "chat" },
	"chat.sendMessageStream": {
		operation: "chat",
		streaming: true
	}
};
var GOOGLE_GENAI_SYSTEM_NAME = "google_genai";
function isErrorChunk(chunk, span) {
	const feedback = chunk?.promptFeedback;
	if (feedback?.blockReason) {
		const message = feedback.blockReasonMessage ?? feedback.blockReason;
		span.setStatus({
			code: 2,
			message: "internal_error"
		});
		captureException(`Content blocked: ${message}`, { mechanism: {
			handled: false,
			type: "auto.ai.google_genai"
		} });
		return true;
	}
	return false;
}
function handleResponseMetadata(chunk, state) {
	if (typeof chunk.responseId === "string") state.responseId = chunk.responseId;
	if (typeof chunk.modelVersion === "string") state.responseModel = chunk.modelVersion;
	const usage = chunk.usageMetadata;
	if (usage) {
		if (typeof usage.promptTokenCount === "number") state.promptTokens = usage.promptTokenCount;
		if (typeof usage.candidatesTokenCount === "number") state.completionTokens = usage.candidatesTokenCount;
		if (typeof usage.totalTokenCount === "number") state.totalTokens = usage.totalTokenCount;
	}
}
function handleCandidateContent(chunk, state, recordOutputs) {
	if (Array.isArray(chunk.functionCalls)) state.toolCalls.push(...chunk.functionCalls);
	for (const candidate of chunk.candidates ?? []) {
		if (candidate?.finishReason && !state.finishReasons.includes(candidate.finishReason)) state.finishReasons.push(candidate.finishReason);
		for (const part of candidate?.content?.parts ?? []) {
			if (recordOutputs && part.text) state.responseTexts.push(part.text);
			if (part.functionCall) state.toolCalls.push({
				type: "function",
				id: part.functionCall.id,
				name: part.functionCall.name,
				arguments: part.functionCall.args
			});
		}
	}
}
function processChunk(chunk, state, recordOutputs, span) {
	if (!chunk || isErrorChunk(chunk, span)) return;
	handleResponseMetadata(chunk, state);
	handleCandidateContent(chunk, state, recordOutputs);
}
async function* instrumentStream(stream, span, recordOutputs) {
	const state = {
		responseTexts: [],
		finishReasons: [],
		toolCalls: []
	};
	try {
		for await (const chunk of stream) {
			processChunk(chunk, state, recordOutputs, span);
			yield chunk;
		}
	} finally {
		endStreamSpan(span, state, recordOutputs);
	}
}
function contentUnionToMessages(content, role = "user") {
	if (typeof content === "string") return [{
		role,
		content
	}];
	if (Array.isArray(content)) return content.flatMap((content2) => contentUnionToMessages(content2, role));
	if (typeof content !== "object" || !content) return [];
	if ("role" in content && typeof content.role === "string") return [content];
	if ("parts" in content) return [{
		...content,
		role
	}];
	return [{
		role,
		content
	}];
}
function extractModel(params, context) {
	if ("model" in params && typeof params.model === "string") return params.model;
	if (context && typeof context === "object") {
		const contextObj = context;
		if ("model" in contextObj && typeof contextObj.model === "string") return contextObj.model;
		if ("modelVersion" in contextObj && typeof contextObj.modelVersion === "string") return contextObj.modelVersion;
	}
	return "unknown";
}
function extractConfigAttributes(config) {
	const attributes = {};
	if ("temperature" in config && typeof config.temperature === "number") attributes[GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE] = config.temperature;
	if ("topP" in config && typeof config.topP === "number") attributes[GEN_AI_REQUEST_TOP_P_ATTRIBUTE] = config.topP;
	if ("topK" in config && typeof config.topK === "number") attributes[GEN_AI_REQUEST_TOP_K_ATTRIBUTE] = config.topK;
	if ("maxOutputTokens" in config && typeof config.maxOutputTokens === "number") attributes[GEN_AI_REQUEST_MAX_TOKENS_ATTRIBUTE] = config.maxOutputTokens;
	if ("frequencyPenalty" in config && typeof config.frequencyPenalty === "number") attributes[GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE] = config.frequencyPenalty;
	if ("presencePenalty" in config && typeof config.presencePenalty === "number") attributes[GEN_AI_REQUEST_PRESENCE_PENALTY_ATTRIBUTE] = config.presencePenalty;
	return attributes;
}
function extractRequestAttributes(operationName, params, context) {
	const attributes = {
		[GEN_AI_SYSTEM_ATTRIBUTE]: GOOGLE_GENAI_SYSTEM_NAME,
		[GEN_AI_OPERATION_NAME_ATTRIBUTE]: operationName,
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ai.google_genai"
	};
	if (params) {
		attributes[GEN_AI_REQUEST_MODEL_ATTRIBUTE] = extractModel(params, context);
		if ("config" in params && typeof params.config === "object" && params.config) {
			const config = params.config;
			Object.assign(attributes, extractConfigAttributes(config));
			if ("tools" in config && Array.isArray(config.tools)) {
				const functionDeclarations = config.tools.flatMap((tool) => tool.functionDeclarations);
				attributes[GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE] = JSON.stringify(functionDeclarations);
			}
		}
	} else attributes[GEN_AI_REQUEST_MODEL_ATTRIBUTE] = extractModel({}, context);
	return attributes;
}
function addPrivateRequestAttributes(span, params, operationName, enableTruncation) {
	if (operationName === "embeddings") {
		const contents = params.contents;
		if (contents != null) span.setAttribute(GEN_AI_EMBEDDINGS_INPUT_ATTRIBUTE, typeof contents === "string" ? contents : JSON.stringify(contents));
		return;
	}
	const messages = [];
	if ("config" in params && params.config && typeof params.config === "object" && "systemInstruction" in params.config && params.config.systemInstruction) messages.push(...contentUnionToMessages(params.config.systemInstruction, "system"));
	if ("history" in params) messages.push(...contentUnionToMessages(params.history, "user"));
	if ("contents" in params) messages.push(...contentUnionToMessages(params.contents, "user"));
	if ("message" in params) messages.push(...contentUnionToMessages(params.message, "user"));
	if (Array.isArray(messages) && messages.length) {
		const { systemInstructions, filteredMessages } = extractSystemInstructions(messages);
		if (systemInstructions) span.setAttribute(GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE, systemInstructions);
		const filteredLength = Array.isArray(filteredMessages) ? filteredMessages.length : 0;
		span.setAttributes({
			[GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE]: filteredLength,
			[GEN_AI_INPUT_MESSAGES_ATTRIBUTE]: enableTruncation ? getTruncatedJsonString(filteredMessages) : stringify(filteredMessages)
		});
	}
}
function addResponseAttributes(span, response, recordOutputs) {
	if (!response || typeof response !== "object") return;
	if (response.modelVersion) span.setAttribute(GEN_AI_RESPONSE_MODEL_ATTRIBUTE, response.modelVersion);
	if (response.usageMetadata && typeof response.usageMetadata === "object") {
		const usage = response.usageMetadata;
		if (typeof usage.promptTokenCount === "number") span.setAttributes({ [GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE]: usage.promptTokenCount });
		if (typeof usage.candidatesTokenCount === "number") span.setAttributes({ [GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE]: usage.candidatesTokenCount });
		if (typeof usage.totalTokenCount === "number") span.setAttributes({ [GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE]: usage.totalTokenCount });
	}
	if (recordOutputs && Array.isArray(response.candidates) && response.candidates.length > 0) {
		const responseTexts = response.candidates.map((candidate) => {
			if (candidate.content?.parts && Array.isArray(candidate.content.parts)) return candidate.content.parts.map((part) => typeof part.text === "string" ? part.text : "").filter((text) => text.length > 0).join("");
			return "";
		}).filter((text) => text.length > 0);
		if (responseTexts.length > 0) span.setAttributes({ [GEN_AI_RESPONSE_TEXT_ATTRIBUTE]: responseTexts.join("") });
	}
	if (recordOutputs && response.functionCalls) {
		const functionCalls = response.functionCalls;
		if (Array.isArray(functionCalls) && functionCalls.length > 0) span.setAttributes({ [GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE]: JSON.stringify(functionCalls) });
	}
}
function instrumentMethod(originalMethod, methodPath, instrumentedMethod, context, options) {
	const isEmbeddings = instrumentedMethod.operation === "embeddings";
	return new Proxy(originalMethod, { apply(target, _, args) {
		const operationName = instrumentedMethod.operation || "unknown";
		const params = args[0];
		const requestAttributes = extractRequestAttributes(operationName, params, context);
		const model = requestAttributes["gen_ai.request.model"] ?? "unknown";
		if (instrumentedMethod.streaming) return startSpanManual$1({
			name: `${operationName} ${model}`,
			op: `gen_ai.${operationName}`,
			attributes: requestAttributes
		}, async (span) => {
			try {
				if (options.recordInputs && params) addPrivateRequestAttributes(span, params, operationName, shouldEnableTruncation(options.enableTruncation));
				return instrumentStream(await target.apply(context, args), span, Boolean(options.recordOutputs));
			} catch (error) {
				span.setStatus({
					code: 2,
					message: "internal_error"
				});
				span.end();
				throw error;
			}
		});
		return startSpan$2({
			name: `${operationName} ${model}`,
			op: `gen_ai.${operationName}`,
			attributes: requestAttributes
		}, (span) => {
			if (options.recordInputs && params) addPrivateRequestAttributes(span, params, operationName, shouldEnableTruncation(options.enableTruncation));
			return handleCallbackErrors(() => target.apply(context, args), () => {}, () => {}, (result) => {
				if (!isEmbeddings) addResponseAttributes(span, result, options.recordOutputs);
			});
		});
	} });
}
function createDeepProxy(target, currentPath = "", options) {
	return new Proxy(target, { get: (t, prop, receiver) => {
		const value = Reflect.get(t, prop, receiver);
		const methodPath = buildMethodPath(currentPath, String(prop));
		const instrumentedMethod = GOOGLE_GENAI_METHOD_REGISTRY[methodPath];
		if (typeof value === "function" && instrumentedMethod) {
			const wrappedMethod = instrumentedMethod.operation ? instrumentMethod(value, methodPath, instrumentedMethod, t, options) : value.bind(t);
			if (!instrumentedMethod.proxyResultPath) return wrappedMethod;
			return function(...args) {
				const result = wrappedMethod(...args);
				if (result && typeof result === "object") return createDeepProxy(result, instrumentedMethod.proxyResultPath, options);
				return result;
			};
		}
		if (typeof value === "function") return value.bind(t);
		if (value && typeof value === "object") return createDeepProxy(value, methodPath, options);
		return value;
	} });
}
function instrumentGoogleGenAIClient(client, options) {
	return createDeepProxy(client, "", resolveAIRecordingOptions(options));
}
var LANGCHAIN_INTEGRATION_NAME = "LangChain";
var LANGCHAIN_ORIGIN = "auto.ai.langchain";
var ROLE_MAP = {
	human: "user",
	ai: "assistant",
	assistant: "assistant",
	system: "system",
	function: "function",
	tool: "tool"
};
var setIfDefined = (target, key, value) => {
	if (value != null) target[key] = value;
};
var setNumberIfDefined = (target, key, value) => {
	const n = Number(value);
	if (!Number.isNaN(n)) target[key] = n;
};
function normalizeContent(v) {
	if (Array.isArray(v)) try {
		const stripped = v.map((part) => part && typeof part === "object" && isContentMedia(part) ? stripInlineMediaFromSingleMessage(part) : part);
		return JSON.stringify(stripped);
	} catch {
		return String(v);
	}
	return stringify(v, String);
}
function normalizeMessageRole(role) {
	const normalized = role.toLowerCase();
	return ROLE_MAP[normalized] ?? normalized;
}
function normalizeRoleNameFromCtor(name) {
	if (name.includes("System")) return "system";
	if (name.includes("Human")) return "user";
	if (name.includes("AI") || name.includes("Assistant")) return "assistant";
	if (name.includes("Function")) return "function";
	if (name.includes("Tool")) return "tool";
	return "user";
}
function getInvocationParams(tags) {
	if (!tags || Array.isArray(tags)) return void 0;
	return tags.invocation_params;
}
function normalizeLangChainMessages(messages) {
	return messages.map((message) => {
		const maybeGetType = message._getType;
		if (typeof maybeGetType === "function") return {
			role: normalizeMessageRole(maybeGetType.call(message)),
			content: normalizeContent(message.content)
		};
		if (message.lc === 1 && message.kwargs) {
			const id = message.id;
			const messageType = Array.isArray(id) && id.length > 0 ? id[id.length - 1] : "";
			return {
				role: normalizeMessageRole(typeof messageType === "string" ? normalizeRoleNameFromCtor(messageType) : "user"),
				content: normalizeContent(message.kwargs?.content)
			};
		}
		if (message.type) return {
			role: normalizeMessageRole(String(message.type).toLowerCase()),
			content: normalizeContent(message.content)
		};
		if (message.role) return {
			role: normalizeMessageRole(String(message.role)),
			content: normalizeContent(message.content)
		};
		const ctor = message.constructor?.name;
		if (ctor && ctor !== "Object") return {
			role: normalizeMessageRole(normalizeRoleNameFromCtor(ctor)),
			content: normalizeContent(message.content)
		};
		return {
			role: "user",
			content: normalizeContent(message.content)
		};
	});
}
function extractCommonRequestAttributes(serialized, invocationParams, langSmithMetadata) {
	const attrs = {};
	const kwargs = "kwargs" in serialized ? serialized.kwargs : void 0;
	setNumberIfDefined(attrs, GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE, invocationParams?.temperature ?? langSmithMetadata?.ls_temperature ?? kwargs?.temperature);
	setNumberIfDefined(attrs, GEN_AI_REQUEST_MAX_TOKENS_ATTRIBUTE, invocationParams?.max_tokens ?? langSmithMetadata?.ls_max_tokens ?? kwargs?.max_tokens);
	setNumberIfDefined(attrs, GEN_AI_REQUEST_TOP_P_ATTRIBUTE, invocationParams?.top_p ?? kwargs?.top_p);
	const frequencyPenalty = invocationParams?.frequency_penalty;
	setNumberIfDefined(attrs, GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE, frequencyPenalty);
	const presencePenalty = invocationParams?.presence_penalty;
	setNumberIfDefined(attrs, GEN_AI_REQUEST_PRESENCE_PENALTY_ATTRIBUTE, presencePenalty);
	if (invocationParams && "stream" in invocationParams) setIfDefined(attrs, GEN_AI_REQUEST_STREAM_ATTRIBUTE, Boolean(invocationParams.stream));
	return attrs;
}
function baseRequestAttributes(system, modelName, serialized, invocationParams, langSmithMetadata) {
	return {
		[GEN_AI_SYSTEM_ATTRIBUTE]: stringify(system ?? "langchain", String),
		[GEN_AI_OPERATION_NAME_ATTRIBUTE]: "chat",
		[GEN_AI_REQUEST_MODEL_ATTRIBUTE]: stringify(modelName, String),
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: LANGCHAIN_ORIGIN,
		...extractCommonRequestAttributes(serialized, invocationParams, langSmithMetadata)
	};
}
function extractLLMRequestAttributes(llm, prompts, recordInputs, enableTruncation, invocationParams, langSmithMetadata) {
	const system = langSmithMetadata?.ls_provider;
	const attrs = baseRequestAttributes(system, invocationParams?.model ?? langSmithMetadata?.ls_model_name ?? "unknown", llm, invocationParams, langSmithMetadata);
	if (recordInputs && Array.isArray(prompts) && prompts.length > 0) {
		setIfDefined(attrs, GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE, prompts.length);
		const messages = prompts.map((p) => ({
			role: "user",
			content: p
		}));
		setIfDefined(attrs, GEN_AI_INPUT_MESSAGES_ATTRIBUTE, enableTruncation ? getTruncatedJsonString(messages) : stringify(messages));
	}
	return attrs;
}
function extractChatModelRequestAttributes(llm, langChainMessages, recordInputs, enableTruncation, invocationParams, langSmithMetadata) {
	const attrs = baseRequestAttributes(langSmithMetadata?.ls_provider ?? llm.id?.[2], invocationParams?.model ?? langSmithMetadata?.ls_model_name ?? "unknown", llm, invocationParams, langSmithMetadata);
	if (recordInputs && Array.isArray(langChainMessages) && langChainMessages.length > 0) {
		const { systemInstructions, filteredMessages } = extractSystemInstructions(normalizeLangChainMessages(langChainMessages.flat()));
		if (systemInstructions) setIfDefined(attrs, GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE, systemInstructions);
		setIfDefined(attrs, GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE, Array.isArray(filteredMessages) ? filteredMessages.length : 0);
		setIfDefined(attrs, GEN_AI_INPUT_MESSAGES_ATTRIBUTE, enableTruncation ? getTruncatedJsonString(filteredMessages) : stringify(filteredMessages));
	}
	return attrs;
}
function addToolCallsAttributes(generations, attrs) {
	const toolCalls = [];
	const flatGenerations = generations.flat();
	for (const gen of flatGenerations) {
		const msgToolCalls = gen.message?.tool_calls;
		if (Array.isArray(msgToolCalls) && msgToolCalls.length > 0) toolCalls.push(...msgToolCalls);
		else {
			const content = gen.message?.content;
			if (Array.isArray(content)) for (const item of content) {
				const t = item;
				if (t.type === "tool_use") toolCalls.push(t);
			}
		}
	}
	if (toolCalls.length > 0) setIfDefined(attrs, GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE, stringify(toolCalls, String));
}
function addTokenUsageAttributes(llmOutput, attrs) {
	if (!llmOutput) return;
	const tokenUsage = llmOutput.tokenUsage;
	const anthropicUsage = llmOutput.usage;
	if (tokenUsage) {
		setNumberIfDefined(attrs, GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE, tokenUsage.promptTokens);
		setNumberIfDefined(attrs, GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE, tokenUsage.completionTokens);
		setNumberIfDefined(attrs, GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE, tokenUsage.totalTokens);
	} else if (anthropicUsage) {
		setNumberIfDefined(attrs, GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE, anthropicUsage.input_tokens);
		setNumberIfDefined(attrs, GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE, anthropicUsage.output_tokens);
		const input = Number(anthropicUsage.input_tokens);
		const output = Number(anthropicUsage.output_tokens);
		const total = (Number.isNaN(input) ? 0 : input) + (Number.isNaN(output) ? 0 : output);
		if (total > 0) setNumberIfDefined(attrs, GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE, total);
		if (anthropicUsage.cache_creation_input_tokens !== void 0) setNumberIfDefined(attrs, GEN_AI_USAGE_CACHE_CREATION_INPUT_TOKENS_ATTRIBUTE, anthropicUsage.cache_creation_input_tokens);
		if (anthropicUsage.cache_read_input_tokens !== void 0) setNumberIfDefined(attrs, GEN_AI_USAGE_CACHE_READ_INPUT_TOKENS_ATTRIBUTE, anthropicUsage.cache_read_input_tokens);
	}
}
function extractLlmResponseAttributes(llmResult, recordOutputs) {
	if (!llmResult) return;
	const attrs = {};
	if (Array.isArray(llmResult.generations)) {
		const finishReasons = llmResult.generations.flat().map((g) => {
			if (g.generationInfo?.finish_reason) return g.generationInfo.finish_reason;
			if (g.generation_info?.finish_reason) return g.generation_info.finish_reason;
			return null;
		}).filter((r) => typeof r === "string");
		if (finishReasons.length > 0) setIfDefined(attrs, GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE, stringify(finishReasons, String));
		addToolCallsAttributes(llmResult.generations, attrs);
		if (recordOutputs) {
			const texts = llmResult.generations.flat().map((gen) => gen.text ?? gen.message?.content).filter((t) => typeof t === "string");
			if (texts.length > 0) setIfDefined(attrs, GEN_AI_RESPONSE_TEXT_ATTRIBUTE, stringify(texts, String));
		}
	}
	addTokenUsageAttributes(llmResult.llmOutput, attrs);
	const llmOutput = llmResult.llmOutput;
	const v1Message = (llmResult.generations?.[0]?.[0])?.message;
	const modelName = llmOutput?.model_name ?? llmOutput?.model ?? v1Message?.response_metadata?.model_name;
	if (modelName) setIfDefined(attrs, GEN_AI_RESPONSE_MODEL_ATTRIBUTE, modelName);
	const responseId = llmOutput?.id ?? v1Message?.id;
	if (responseId) setIfDefined(attrs, GEN_AI_RESPONSE_ID_ATTRIBUTE, responseId);
	const stopReason = llmOutput?.stop_reason ?? v1Message?.response_metadata?.finish_reason;
	if (stopReason) setIfDefined(attrs, GEN_AI_RESPONSE_STOP_REASON_ATTRIBUTE, stringify(stopReason, String));
	return attrs;
}
function getAgentNameFromMetadata(metadata) {
	const attrs = {};
	const agentName = metadata?.lc_agent_name;
	if (typeof agentName === "string") attrs[GEN_AI_AGENT_NAME_ATTRIBUTE] = agentName;
	return attrs;
}
function extractToolDefinitions(extraParams) {
	const tools = extraParams?.invocation_params?.tools ?? extraParams?.options?.tools;
	if (!Array.isArray(tools) || tools.length === 0) return void 0;
	const toolDefs = tools.map((tool) => {
		const fn = tool.function;
		return {
			type: "function",
			name: tool.name ?? fn?.name ?? "",
			description: tool.description ?? fn?.description
		};
	});
	return JSON.stringify(toolDefs);
}
function isCallbackManager(value) {
	if (!value || typeof value !== "object") return false;
	const candidate = value;
	return typeof candidate.addHandler === "function" && typeof candidate.copy === "function";
}
function isSentryHandler(handler) {
	return typeof handler === "object" && handler?.name === "SentryCallbackHandler";
}
function containsSentryHandler(handlers) {
	return handlers.some(isSentryHandler);
}
function _INTERNAL_mergeLangChainCallbackHandler(existing, sentryHandler) {
	if (!existing) return [sentryHandler];
	if (isCallbackManager(existing)) {
		if (containsSentryHandler(existing.handlers ?? [])) return existing;
		const copied = existing.copy();
		copied.addHandler(sentryHandler, true);
		return copied;
	}
	const handlers = Array.isArray(existing) ? existing : [existing];
	if (containsSentryHandler(handlers)) return existing;
	return [...handlers, sentryHandler];
}
function createLangChainCallbackHandler(options = {}) {
	const { recordInputs, recordOutputs } = resolveAIRecordingOptions(options);
	const enableTruncation = shouldEnableTruncation(options.enableTruncation);
	const spanMap = /* @__PURE__ */ new Map();
	const exitSpan = (runId) => {
		const span = spanMap.get(runId);
		if (span?.isRecording()) {
			span.end();
			spanMap.delete(runId);
		}
	};
	const handler = {
		lc_serializable: false,
		lc_namespace: [
			"langchain_core",
			"callbacks",
			"sentry"
		],
		lc_secrets: void 0,
		lc_attributes: void 0,
		lc_aliases: void 0,
		lc_serializable_keys: void 0,
		lc_id: [
			"langchain_core",
			"callbacks",
			"sentry"
		],
		lc_kwargs: {},
		name: "SentryCallbackHandler",
		ignoreLLM: false,
		ignoreChain: false,
		ignoreAgent: false,
		ignoreRetriever: false,
		ignoreCustomEvent: false,
		raiseError: false,
		awaitHandlers: true,
		handleLLMStart(llm, prompts, runId, _parentRunId, _extraParams, tags, metadata, _runName) {
			const invocationParams = getInvocationParams(tags);
			const attributes = extractLLMRequestAttributes(llm, prompts, recordInputs, enableTruncation, invocationParams, metadata);
			const modelName = attributes[GEN_AI_REQUEST_MODEL_ATTRIBUTE];
			const operationName = attributes[GEN_AI_OPERATION_NAME_ATTRIBUTE];
			startSpanManual$1({
				name: `${operationName} ${modelName}`,
				op: "gen_ai.chat",
				attributes: {
					...getAgentNameFromMetadata(metadata),
					...attributes,
					[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "gen_ai.chat"
				}
			}, (span) => {
				spanMap.set(runId, span);
				return span;
			});
		},
		handleChatModelStart(llm, messages, runId, _parentRunId, extraParams, tags, metadata, _runName) {
			const invocationParams = getInvocationParams(tags);
			const attributes = extractChatModelRequestAttributes(llm, messages, recordInputs, enableTruncation, invocationParams, metadata);
			const toolDefsJson = extractToolDefinitions(extraParams);
			if (toolDefsJson) attributes[GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE] = toolDefsJson;
			const modelName = attributes[GEN_AI_REQUEST_MODEL_ATTRIBUTE];
			const operationName = attributes[GEN_AI_OPERATION_NAME_ATTRIBUTE];
			startSpanManual$1({
				name: `${operationName} ${modelName}`,
				op: "gen_ai.chat",
				attributes: {
					...getAgentNameFromMetadata(metadata),
					...attributes,
					[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "gen_ai.chat"
				}
			}, (span) => {
				spanMap.set(runId, span);
				return span;
			});
		},
		handleLLMEnd(output, runId, _parentRunId, _tags, _extraParams) {
			const span = spanMap.get(runId);
			if (span?.isRecording()) {
				const attributes = extractLlmResponseAttributes(output, recordOutputs);
				if (attributes) span.setAttributes(attributes);
				exitSpan(runId);
			}
		},
		handleLLMError(_error, runId) {
			const span = spanMap.get(runId);
			if (span?.isRecording()) {
				span.setStatus({
					code: 2,
					message: "internal_error"
				});
				exitSpan(runId);
			}
		},
		handleChainStart(chain, inputs, runId, _parentRunId, _tags, metadata, _runType, runName) {
			if (metadata?.__sentry_langgraph__) return;
			const chainName = runName || chain.name || "unknown_chain";
			const attributes = {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ai.langchain",
				"langchain.chain.name": chainName
			};
			if (recordInputs) attributes["langchain.chain.inputs"] = JSON.stringify(inputs);
			startSpanManual$1({
				name: `chain ${chainName}`,
				op: "gen_ai.invoke_agent",
				attributes: {
					...attributes,
					[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "gen_ai.invoke_agent"
				}
			}, (span) => {
				spanMap.set(runId, span);
				return span;
			});
		},
		handleChainEnd(outputs, runId) {
			const span = spanMap.get(runId);
			if (span?.isRecording()) {
				if (recordOutputs) span.setAttributes({ "langchain.chain.outputs": JSON.stringify(outputs) });
				exitSpan(runId);
			}
		},
		handleChainError(_error, runId) {
			const span = spanMap.get(runId);
			if (span?.isRecording()) {
				span.setStatus({
					code: 2,
					message: "internal_error"
				});
				exitSpan(runId);
			}
		},
		handleToolStart(tool, input, runId, _parentRunId, _tags, metadata, runName) {
			if (metadata?.__sentry_langgraph__) return;
			const toolName = runName || tool.name || "unknown_tool";
			const attributes = {
				...getAgentNameFromMetadata(metadata),
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: LANGCHAIN_ORIGIN,
				[GEN_AI_OPERATION_NAME_ATTRIBUTE]: "execute_tool",
				[GEN_AI_TOOL_NAME_ATTRIBUTE]: toolName
			};
			if (recordInputs) attributes[GEN_AI_TOOL_INPUT_ATTRIBUTE] = input;
			startSpanManual$1({
				name: `execute_tool ${toolName}`,
				op: "gen_ai.execute_tool",
				attributes: {
					...attributes,
					[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "gen_ai.execute_tool"
				}
			}, (span) => {
				spanMap.set(runId, span);
				return span;
			});
		},
		handleToolEnd(output, runId) {
			const span = spanMap.get(runId);
			if (span?.isRecording()) {
				if (recordOutputs) {
					const outputObj = output;
					const content = outputObj && typeof outputObj === "object" && "content" in outputObj ? outputObj.content : output;
					span.setAttributes({ [GEN_AI_TOOL_OUTPUT_ATTRIBUTE]: typeof content === "string" ? content : JSON.stringify(content) });
				}
				exitSpan(runId);
			}
		},
		handleToolError(_error, runId) {
			const span = spanMap.get(runId);
			if (span?.isRecording()) {
				span.setStatus({
					code: 2,
					message: "internal_error"
				});
				exitSpan(runId);
			}
		},
		copy() {
			return handler;
		},
		toJSON() {
			return {
				lc: 1,
				type: "not_implemented",
				id: handler.lc_id
			};
		},
		toJSONNotImplemented() {
			return {
				lc: 1,
				type: "not_implemented",
				id: handler.lc_id
			};
		}
	};
	return handler;
}
function inferSystemFromInstance(instance) {
	const name = instance.constructor?.name ?? "";
	if (name.includes("OpenAI")) return "openai";
	if (name.includes("Google")) return "google_genai";
	if (name.includes("Mistral")) return "mistralai";
	if (name.includes("Vertex")) return "google_vertexai";
	if (name.includes("Bedrock")) return "aws_bedrock";
	if (name.includes("Ollama")) return "ollama";
	if (name.includes("Cloudflare")) return "cloudflare";
	if (name.includes("Cohere")) return "cohere";
	return "langchain";
}
function extractEmbeddingAttributes(instance) {
	const embeddingsInstance = instance ?? {};
	const attributes = {
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: LANGCHAIN_ORIGIN,
		[SEMANTIC_ATTRIBUTE_SENTRY_OP]: GEN_AI_EMBEDDINGS_OPERATION_ATTRIBUTE,
		[GEN_AI_OPERATION_NAME_ATTRIBUTE]: "embeddings",
		[GEN_AI_REQUEST_MODEL_ATTRIBUTE]: embeddingsInstance.model ?? "unknown"
	};
	attributes[GEN_AI_SYSTEM_ATTRIBUTE] = inferSystemFromInstance(embeddingsInstance);
	if ("dimensions" in embeddingsInstance) attributes[GEN_AI_REQUEST_DIMENSIONS_ATTRIBUTE] = embeddingsInstance.dimensions;
	if ("encodingFormat" in embeddingsInstance) attributes[GEN_AI_REQUEST_ENCODING_FORMAT_ATTRIBUTE] = embeddingsInstance.encodingFormat;
	return attributes;
}
function _INTERNAL_getLangChainEmbeddingsSpanOptions(instance, input, options = {}) {
	const { recordInputs } = resolveAIRecordingOptions(options);
	const attributes = extractEmbeddingAttributes(instance);
	const modelName = attributes["gen_ai.request.model"] || "unknown";
	if (recordInputs && input != null) attributes[GEN_AI_EMBEDDINGS_INPUT_ATTRIBUTE] = typeof input === "string" ? input : JSON.stringify(input);
	return {
		name: `embeddings ${modelName}`,
		op: GEN_AI_EMBEDDINGS_OPERATION_ATTRIBUTE,
		attributes
	};
}
function instrumentEmbeddingMethod(originalMethod, options = {}) {
	return new Proxy(originalMethod, { apply(target, thisArg, args) {
		return startSpan$2(_INTERNAL_getLangChainEmbeddingsSpanOptions(thisArg, args[0], options), () => {
			return Reflect.apply(target, thisArg, args);
		});
	} });
}
function instrumentLangChainEmbeddings(instance, options) {
	const embeddingsInstance = instance;
	if (typeof embeddingsInstance.embedQuery === "function") embeddingsInstance.embedQuery = instrumentEmbeddingMethod(embeddingsInstance.embedQuery, options);
	if (typeof embeddingsInstance.embedDocuments === "function") embeddingsInstance.embedDocuments = instrumentEmbeddingMethod(embeddingsInstance.embedDocuments, options);
	return instance;
}
var LANGGRAPH_INTEGRATION_NAME = "LangGraph";
var LANGGRAPH_ORIGIN = "auto.ai.langgraph";
function extractLLMFromParams(args) {
	const arg = args[0];
	if (typeof arg !== "object" || !arg || !("llm" in arg) || !arg.llm || typeof arg.llm !== "object") return null;
	const llm = arg.llm;
	if (typeof llm.modelName !== "string" && typeof llm.model !== "string") return null;
	return llm;
}
function extractAgentNameFromParams(args) {
	const arg = args[0];
	if (typeof arg === "object" && !!arg && "name" in arg && typeof arg.name === "string") return arg.name;
	return null;
}
function wrapToolsWithSpans(tools, options, agentName) {
	const SENTRY_WRAPPED = "__sentry_tool_wrapped__";
	for (const tool of tools) {
		if (!tool || typeof tool !== "object") continue;
		const t = tool;
		const originalInvoke = t.invoke;
		if (typeof originalInvoke !== "function" || Object.prototype.hasOwnProperty.call(t, SENTRY_WRAPPED)) continue;
		const toolName = typeof t.name === "string" ? t.name : "unknown_tool";
		const toolDescription = typeof t.description === "string" ? t.description : void 0;
		t.invoke = new Proxy(originalInvoke, { apply(target, thisArg, args) {
			const spanAttributes = {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: LANGGRAPH_ORIGIN,
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: GEN_AI_EXECUTE_TOOL_OPERATION_ATTRIBUTE,
				[GEN_AI_OPERATION_NAME_ATTRIBUTE]: "execute_tool",
				[GEN_AI_TOOL_NAME_ATTRIBUTE]: toolName,
				[GEN_AI_TOOL_TYPE_ATTRIBUTE]: "function"
			};
			const callAgentName = args[1]?.metadata?.lc_agent_name ?? agentName;
			if (typeof callAgentName === "string") spanAttributes[GEN_AI_AGENT_NAME_ATTRIBUTE] = callAgentName;
			if (toolDescription) spanAttributes[GEN_AI_TOOL_DESCRIPTION_ATTRIBUTE$1] = toolDescription;
			const input = args[0];
			if (typeof input === "object" && !!input) {
				if ("id" in input && typeof input.id === "string") spanAttributes[GEN_AI_TOOL_CALL_ID_ATTRIBUTE$1] = input.id;
				if (options.recordInputs) {
					const toolArgs = "args" in input && typeof input.args === "object" ? input.args : input;
					try {
						spanAttributes[GEN_AI_TOOL_INPUT_ATTRIBUTE] = JSON.stringify(toolArgs);
					} catch {}
				}
			}
			return startSpan$2({
				op: GEN_AI_EXECUTE_TOOL_OPERATION_ATTRIBUTE,
				name: `execute_tool ${toolName}`,
				attributes: spanAttributes
			}, async (span) => {
				try {
					const result = await Reflect.apply(target, thisArg, args);
					if (options.recordOutputs) try {
						const resultObj = result;
						const content = resultObj && typeof resultObj === "object" && "content" in resultObj ? resultObj.content : result;
						span.setAttribute(GEN_AI_TOOL_OUTPUT_ATTRIBUTE, typeof content === "string" ? content : JSON.stringify(content));
					} catch {}
					return result;
				} catch (error) {
					span.setStatus({
						code: 2,
						message: "internal_error"
					});
					throw error;
				}
			});
		} });
		Object.defineProperty(t, SENTRY_WRAPPED, {
			value: true,
			enumerable: false
		});
	}
	return tools;
}
function extractToolCalls(messages) {
	if (!messages || messages.length === 0) return null;
	const toolCalls = [];
	for (const message of messages) if (message && typeof message === "object") {
		const msgToolCalls = message.tool_calls;
		if (msgToolCalls && Array.isArray(msgToolCalls)) toolCalls.push(...msgToolCalls);
	}
	return toolCalls.length > 0 ? toolCalls : null;
}
function extractTokenUsageFromMessage(message) {
	const msg = message;
	let inputTokens = 0;
	let outputTokens = 0;
	let totalTokens = 0;
	if (msg.usage_metadata && typeof msg.usage_metadata === "object") {
		const usage = msg.usage_metadata;
		if (typeof usage.input_tokens === "number") inputTokens = usage.input_tokens;
		if (typeof usage.output_tokens === "number") outputTokens = usage.output_tokens;
		if (typeof usage.total_tokens === "number") totalTokens = usage.total_tokens;
		return {
			inputTokens,
			outputTokens,
			totalTokens
		};
	}
	if (msg.response_metadata && typeof msg.response_metadata === "object") {
		const metadata = msg.response_metadata;
		if (metadata.tokenUsage && typeof metadata.tokenUsage === "object") {
			const tokenUsage = metadata.tokenUsage;
			if (typeof tokenUsage.promptTokens === "number") inputTokens = tokenUsage.promptTokens;
			if (typeof tokenUsage.completionTokens === "number") outputTokens = tokenUsage.completionTokens;
			if (typeof tokenUsage.totalTokens === "number") totalTokens = tokenUsage.totalTokens;
		}
	}
	return {
		inputTokens,
		outputTokens,
		totalTokens
	};
}
function extractModelMetadata(span, message) {
	const msg = message;
	if (msg.response_metadata && typeof msg.response_metadata === "object") {
		const metadata = msg.response_metadata;
		if (metadata.model_name && typeof metadata.model_name === "string") span.setAttribute(GEN_AI_RESPONSE_MODEL_ATTRIBUTE, metadata.model_name);
		if (metadata.finish_reason && typeof metadata.finish_reason === "string") span.setAttribute(GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE, [metadata.finish_reason]);
	}
}
function extractToolsFromCompiledGraph(compiledGraph) {
	if (!compiledGraph.builder?.nodes?.tools?.runnable?.tools) return null;
	const tools = compiledGraph.builder?.nodes?.tools?.runnable?.tools;
	if (!tools || !Array.isArray(tools) || tools.length === 0) return null;
	return tools.map((tool) => ({
		name: tool.lc_kwargs?.name,
		description: tool.lc_kwargs?.description,
		schema: tool.lc_kwargs?.schema
	}));
}
function setResponseAttributes(span, inputMessages, result) {
	const outputMessages = result?.messages;
	if (!outputMessages || !Array.isArray(outputMessages)) return;
	const inputCount = inputMessages?.length ?? 0;
	const newMessages = outputMessages.length > inputCount ? outputMessages.slice(inputCount) : [];
	if (newMessages.length === 0) return;
	const toolCalls = extractToolCalls(newMessages);
	if (toolCalls) span.setAttribute(GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE, JSON.stringify(toolCalls));
	const normalizedNewMessages = normalizeLangChainMessages(newMessages);
	span.setAttribute(GEN_AI_RESPONSE_TEXT_ATTRIBUTE, JSON.stringify(normalizedNewMessages));
	let totalInputTokens = 0;
	let totalOutputTokens = 0;
	let totalTokens = 0;
	for (const message of newMessages) {
		const tokens = extractTokenUsageFromMessage(message);
		totalInputTokens += tokens.inputTokens;
		totalOutputTokens += tokens.outputTokens;
		totalTokens += tokens.totalTokens;
		extractModelMetadata(span, message);
	}
	if (totalInputTokens > 0) span.setAttribute(GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE, totalInputTokens);
	if (totalOutputTokens > 0) span.setAttribute(GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE, totalOutputTokens);
	if (totalTokens > 0) span.setAttribute(GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE, totalTokens);
}
var _insideCreateReactAgent = false;
var SENTRY_PATCHED = "__sentry_patched__";
function _INTERNAL_getLangGraphCreateAgentSpanOptions(agentName) {
	const attributes = {
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: LANGGRAPH_ORIGIN,
		[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "gen_ai.create_agent",
		[GEN_AI_OPERATION_NAME_ATTRIBUTE]: "create_agent"
	};
	if (agentName) attributes[GEN_AI_AGENT_NAME_ATTRIBUTE] = agentName;
	return {
		op: "gen_ai.create_agent",
		name: agentName ? `create_agent ${agentName}` : "create_agent",
		attributes
	};
}
function instrumentStateGraphCompile(originalCompile, options) {
	if (Object.prototype.hasOwnProperty.call(originalCompile, SENTRY_PATCHED)) return originalCompile;
	const sentryHandler = createLangChainCallbackHandler(options);
	const wrapped = new Proxy(originalCompile, { apply(target, thisArg, args) {
		if (_insideCreateReactAgent) return Reflect.apply(target, thisArg, args);
		return startSpan$2(_INTERNAL_getLangGraphCreateAgentSpanOptions(), (span) => {
			try {
				const compiledGraph = Reflect.apply(target, thisArg, args);
				const compileOptions = args.length > 0 ? args[0] : {};
				if (compileOptions?.name && typeof compileOptions.name === "string") {
					span.setAttribute(GEN_AI_AGENT_NAME_ATTRIBUTE, compileOptions.name);
					span.updateName(`create_agent ${compileOptions.name}`);
				}
				const originalInvoke = compiledGraph.invoke;
				if (originalInvoke && typeof originalInvoke === "function") compiledGraph.invoke = instrumentCompiledGraphInvoke(originalInvoke.bind(compiledGraph), compiledGraph, compileOptions, options, void 0, sentryHandler);
				return compiledGraph;
			} catch (error) {
				span.setStatus({
					code: 2,
					message: "internal_error"
				});
				throw error;
			}
		});
	} });
	Object.defineProperty(wrapped, SENTRY_PATCHED, {
		value: true,
		enumerable: false
	});
	return wrapped;
}
function instrumentCompiledGraphInvoke(originalInvoke, graphInstance, compileOptions, options, llm, sentryCallbackHandler) {
	return new Proxy(originalInvoke, { apply(target, thisArg, args) {
		const modelName = llm?.modelName ?? llm?.model;
		return startSpan$2({
			op: "gen_ai.invoke_agent",
			name: "invoke_agent",
			attributes: {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: LANGGRAPH_ORIGIN,
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: GEN_AI_INVOKE_AGENT_OPERATION_ATTRIBUTE,
				[GEN_AI_OPERATION_NAME_ATTRIBUTE]: "invoke_agent"
			}
		}, async (span) => {
			try {
				const graphName = compileOptions?.name;
				if (graphName && typeof graphName === "string") {
					span.setAttribute(GEN_AI_PIPELINE_NAME_ATTRIBUTE, graphName);
					span.setAttribute(GEN_AI_AGENT_NAME_ATTRIBUTE, graphName);
					span.updateName(`invoke_agent ${graphName}`);
				}
				if (modelName) span.setAttribute(GEN_AI_REQUEST_MODEL_ATTRIBUTE, modelName);
				const threadId = ((args.length > 1 ? args[1] : void 0)?.configurable)?.thread_id;
				if (threadId && typeof threadId === "string") span.setAttribute(GEN_AI_CONVERSATION_ID_ATTRIBUTE, threadId);
				if (sentryCallbackHandler) {
					const invokeConfig = args[1] ?? {};
					args[1] = invokeConfig;
					invokeConfig.metadata = {
						...invokeConfig.metadata ?? {},
						__sentry_langgraph__: true,
						...typeof graphName === "string" ? { lc_agent_name: graphName } : {}
					};
					invokeConfig.callbacks = _INTERNAL_mergeLangChainCallbackHandler(invokeConfig.callbacks, sentryCallbackHandler);
				}
				const tools = extractToolsFromCompiledGraph(graphInstance);
				if (tools) span.setAttribute(GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE, JSON.stringify(tools));
				const recordInputs = options.recordInputs;
				const recordOutputs = options.recordOutputs;
				const inputMessages = args.length > 0 ? args[0]?.messages ?? [] : [];
				if (inputMessages && recordInputs) {
					const { systemInstructions, filteredMessages } = extractSystemInstructions(normalizeLangChainMessages(inputMessages));
					if (systemInstructions) span.setAttribute(GEN_AI_SYSTEM_INSTRUCTIONS_ATTRIBUTE, systemInstructions);
					const enableTruncation = shouldEnableTruncation(options.enableTruncation);
					const filteredLength = Array.isArray(filteredMessages) ? filteredMessages.length : 0;
					span.setAttributes({
						[GEN_AI_INPUT_MESSAGES_ATTRIBUTE]: enableTruncation ? getTruncatedJsonString(filteredMessages) : stringify(filteredMessages),
						[GEN_AI_INPUT_MESSAGES_ORIGINAL_LENGTH_ATTRIBUTE]: filteredLength
					});
				}
				const result = await Reflect.apply(target, thisArg, args);
				if (recordOutputs) setResponseAttributes(span, inputMessages ?? null, result);
				return result;
			} catch (error) {
				span.setStatus({
					code: 2,
					message: "internal_error"
				});
				throw error;
			}
		});
	} });
}
function instrumentCreateReactAgent(originalCreateReactAgent, options) {
	if (Object.prototype.hasOwnProperty.call(originalCreateReactAgent, SENTRY_PATCHED)) return originalCreateReactAgent;
	const resolvedOptions = resolveAIRecordingOptions(options);
	const sentryHandler = createLangChainCallbackHandler(resolvedOptions);
	const wrapped = new Proxy(originalCreateReactAgent, { apply(target, thisArg, args) {
		const llm = extractLLMFromParams(args);
		const agentName = extractAgentNameFromParams(args);
		const params = args[0];
		if (params && Array.isArray(params.tools) && params.tools.length > 0) wrapToolsWithSpans(params.tools, resolvedOptions, agentName ?? void 0);
		_insideCreateReactAgent = true;
		let compiledGraph;
		try {
			compiledGraph = Reflect.apply(target, thisArg, args);
		} finally {
			_insideCreateReactAgent = false;
		}
		const originalInvoke = compiledGraph.invoke;
		if (originalInvoke && typeof originalInvoke === "function") {
			const compileOptions = {};
			if (agentName) compileOptions.name = agentName;
			compiledGraph.invoke = instrumentCompiledGraphInvoke(originalInvoke.bind(compiledGraph), compiledGraph, compileOptions, resolvedOptions, llm, sentryHandler);
		}
		return compiledGraph;
	} });
	Object.defineProperty(wrapped, SENTRY_PATCHED, {
		value: true,
		enumerable: false
	});
	return wrapped;
}
function instrumentStateGraph(stateGraph, options) {
	stateGraph.compile = instrumentStateGraphCompile(stateGraph.compile, resolveAIRecordingOptions(options));
	return stateGraph;
}
function createStreamedSpanEnvelope(serializedSpans, dsc, client) {
	const options = client.getOptions();
	const dsn = client.getDsn();
	const tunnel = options.tunnel;
	const sdk = getSdkMetadataForEnvelopeHeader(options._metadata);
	const headers = {
		sent_at: new Date(safeDateNow()).toISOString(),
		...dscHasRequiredProps(dsc) && { trace: dsc },
		...sdk && { sdk },
		...!!tunnel && dsn && { dsn: dsnToString(dsn) }
	};
	const inferSetting = client.getDataCollectionOptions().userInfo ? "auto" : "never";
	return createEnvelope(headers, [[{
		type: "span",
		item_count: serializedSpans.length,
		content_type: "application/vnd.sentry.items.span.v2+json"
	}, {
		version: 2,
		...isBrowser() && { ingest_settings: {
			infer_ip: inferSetting,
			infer_user_agent: inferSetting
		} },
		items: serializedSpans
	}]]);
}
function dscHasRequiredProps(dsc) {
	return !!dsc.trace_id && !!dsc.public_key;
}
function estimateSerializedSpanSizeInBytes(span) {
	let weight = 156;
	weight += span.name.length * 2;
	weight += estimateTypedAttributesSizeInBytes(span.attributes);
	if (span.links && span.links.length > 0) {
		const attributes = span.links[0]?.attributes;
		const linkWeight = 100 + (attributes ? estimateTypedAttributesSizeInBytes(attributes) : 0);
		weight += linkWeight * span.links.length;
	}
	return weight;
}
var MAX_SPANS_PER_ENVELOPE = 1e3;
var MAX_TRACE_WEIGHT_IN_BYTES = 5e6;
var SpanBuffer = class {
	constructor(client, options) {
		this._traceBuckets = /* @__PURE__ */ new Map();
		this._client = client;
		const { maxSpanLimit, flushInterval, maxTraceWeightInBytes } = options ?? {};
		this._maxSpanLimit = maxSpanLimit && maxSpanLimit > 0 && maxSpanLimit <= MAX_SPANS_PER_ENVELOPE ? maxSpanLimit : MAX_SPANS_PER_ENVELOPE;
		this._flushInterval = flushInterval && flushInterval > 0 ? flushInterval : 5e3;
		this._maxTraceWeight = maxTraceWeightInBytes && maxTraceWeightInBytes > 0 ? maxTraceWeightInBytes : MAX_TRACE_WEIGHT_IN_BYTES;
		this._client.on("flush", () => {
			this.drain();
		});
		this._client.on("close", () => {
			this._traceBuckets.forEach((bucket) => {
				clearTimeout(bucket.timeout);
			});
			this._traceBuckets.clear();
		});
	}
	/**
	* Add a span to the buffer.
	*/
	add(spanJSON) {
		const traceId = spanJSON.trace_id;
		let bucket = this._traceBuckets.get(traceId);
		if (!bucket) {
			bucket = {
				spans: /* @__PURE__ */ new Set(),
				size: 0,
				timeout: safeUnref(setTimeout(() => {
					this.flush(traceId);
				}, this._flushInterval))
			};
			this._traceBuckets.set(traceId, bucket);
		}
		bucket.spans.add(spanJSON);
		bucket.size += estimateSerializedSpanSizeInBytes(spanJSON);
		if (bucket.spans.size >= this._maxSpanLimit || bucket.size >= this._maxTraceWeight) this.flush(traceId);
	}
	/**
	* Drain and flush all buffered traces.
	*/
	drain() {
		if (!this._traceBuckets.size) return;
		DEBUG_BUILD$4 && debug.log(`Flushing span tree map with ${this._traceBuckets.size} traces`);
		this._traceBuckets.forEach((_, traceId) => {
			this.flush(traceId);
		});
	}
	/**
	* Flush spans of a specific trace.
	* In contrast to {@link SpanBuffer.drain}, this method does not flush all traces, but only the one with the given traceId.
	*/
	flush(traceId) {
		const bucket = this._traceBuckets.get(traceId);
		if (!bucket) return;
		if (!bucket.spans.size) {
			this._removeTrace(traceId);
			return;
		}
		const spans = Array.from(bucket.spans);
		const segmentSpan = spans[0]?._segmentSpan;
		if (!segmentSpan) {
			DEBUG_BUILD$4 && debug.warn("No segment span reference found on span JSON, cannot compute DSC");
			this._removeTrace(traceId);
			return;
		}
		const dsc = getDynamicSamplingContextFromSpan(segmentSpan);
		const cleanedSpans = spans.map((spanJSON) => {
			const { _segmentSpan, ...cleanSpanJSON } = spanJSON;
			return cleanSpanJSON;
		});
		const envelope = createStreamedSpanEnvelope(cleanedSpans, dsc, this._client);
		DEBUG_BUILD$4 && debug.log(`Sending span envelope for trace ${traceId} with ${cleanedSpans.length} spans`);
		this._client.sendEnvelope(envelope).then(null, (reason) => {
			DEBUG_BUILD$4 && debug.error("Error while sending streamed span envelope:", reason);
		});
		this._removeTrace(traceId);
	}
	_removeTrace(traceId) {
		const bucket = this._traceBuckets.get(traceId);
		if (bucket) clearTimeout(bucket.timeout);
		this._traceBuckets.delete(traceId);
	}
};
var spanStreamingIntegration = defineIntegration(() => {
	return {
		name: "SpanStreaming",
		setup(client) {
			const initialMessage = "SpanStreaming integration requires";
			const fallbackMsg = "Falling back to static trace lifecycle.";
			const clientOptions = client.getOptions();
			if (!hasSpanStreamingEnabled(client)) {
				clientOptions.traceLifecycle = "static";
				DEBUG_BUILD$4 && debug.warn(`${initialMessage} \`traceLifecycle\` to be set to "stream"! ${fallbackMsg}`);
				return;
			}
			const beforeSendSpan = clientOptions.beforeSendSpan;
			if (beforeSendSpan && !isStreamedBeforeSendSpanCallback(beforeSendSpan)) {
				clientOptions.traceLifecycle = "static";
				DEBUG_BUILD$4 && debug.warn(`${initialMessage} a beforeSendSpan callback using \`withStreamedSpan\`! ${fallbackMsg}`);
				return;
			}
			const buffer = new SpanBuffer(client);
			client.on("afterSpanEnd", (span) => {
				if (!spanIsSampled(span)) return;
				buffer.add(captureSpan(span, client));
			});
		}
	};
});
function getBreadcrumbLogLevelFromHttpStatusCode(statusCode) {
	if (statusCode === void 0) return;
	else if (statusCode >= 400 && statusCode < 500) return "warning";
	else if (statusCode >= 500) return "error";
	else return;
}
function replaceExports(exports, exportName, wrappedConstructor) {
	const original = exports[exportName];
	if (typeof original !== "function") return;
	try {
		exports[exportName] = wrappedConstructor;
	} catch {
		Object.defineProperty(exports, exportName, {
			value: wrappedConstructor,
			writable: true,
			configurable: true,
			enumerable: true
		});
	}
	if (exports.default === original) try {
		exports.default = wrappedConstructor;
	} catch {
		Object.defineProperty(exports, "default", {
			value: wrappedConstructor,
			writable: true,
			configurable: true,
			enumerable: true
		});
	}
}
var LRUMap = class {
	constructor(_maxSize) {
		this._maxSize = _maxSize;
		this._cache = /* @__PURE__ */ new Map();
	}
	/** Get the current size of the cache */
	get size() {
		return this._cache.size;
	}
	/** Get an entry or undefined if it was not in the cache. Re-inserts to update the recently used order */
	get(key) {
		const value = this._cache.get(key);
		if (value === void 0) return;
		this._cache.delete(key);
		this._cache.set(key, value);
		return value;
	}
	/** Insert an entry and evict an older entry if we've reached maxSize */
	set(key, value) {
		if (this._cache.size >= this._maxSize) {
			const nextKey = this._cache.keys().next().value;
			this._cache.delete(nextKey);
		}
		this._cache.set(key, value);
	}
	/** Remove an entry and return the entry if it was in the cache */
	remove(key) {
		const value = this._cache.get(key);
		if (value) this._cache.delete(key);
		return value;
	}
	/** Clear all entries */
	clear() {
		this._cache.clear();
	}
	/** Get all the keys */
	keys() {
		return Array.from(this._cache.keys());
	}
	/** Get all the values */
	values() {
		const values = [];
		this._cache.forEach((value) => values.push(value));
		return values;
	}
};
function addUserAgentToTransportHeaders(options) {
	const sdkMetadata = options._metadata?.sdk;
	const sdkUserAgent = sdkMetadata?.name && sdkMetadata?.version ? `${sdkMetadata?.name}/${sdkMetadata?.version}` : void 0;
	options.transportOptions = {
		...options.transportOptions,
		headers: {
			...sdkUserAgent && { "user-agent": sdkUserAgent },
			...options.transportOptions?.headers
		}
	};
}
var ServerRuntimeClient = class extends Client {
	/**
	* Creates a new Edge SDK instance.
	* @param options Configuration options for this SDK.
	*/
	constructor(options) {
		addUserAgentToTransportHeaders(options);
		if (options.traceLifecycle === "stream" && !options.integrations.some((i) => i.name === "SpanStreaming")) options.integrations.push(spanStreamingIntegration());
		super(options);
		this._disposeCallbacks = [];
		this._setUpMetricsProcessing();
	}
	/**
	* @inheritDoc
	*/
	eventFromException(exception, hint) {
		const event = eventFromUnknownInput(this, this._options.stackParser, exception, hint);
		event.level = "error";
		return resolvedSyncPromise(event);
	}
	/**
	* @inheritDoc
	*/
	eventFromMessage(message, level = "info", hint) {
		return resolvedSyncPromise(eventFromMessage(this._options.stackParser, message, level, hint, this._options.attachStacktrace));
	}
	/**
	* @inheritDoc
	*/
	captureException(exception, hint, scope) {
		setCurrentRequestSessionErroredOrCrashed(hint);
		return super.captureException(exception, hint, scope);
	}
	/**
	* @inheritDoc
	*/
	captureEvent(event, hint, scope) {
		if (!event.type && event.exception?.values && event.exception.values.length > 0) setCurrentRequestSessionErroredOrCrashed(hint);
		return super.captureEvent(event, hint, scope);
	}
	/**
	* Create a cron monitor check in and send it to Sentry.
	*
	* @param checkIn An object that describes a check in.
	* @param upsertMonitorConfig An optional object that describes a monitor config. Use this if you want
	* to create a monitor automatically when sending a check in.
	*/
	captureCheckIn(checkIn, monitorConfig, scope) {
		const id = "checkInId" in checkIn && checkIn.checkInId ? checkIn.checkInId : uuid4();
		if (!this._isEnabled()) {
			DEBUG_BUILD$4 && debug.warn("SDK not enabled, will not capture check-in.");
			return id;
		}
		const { release, environment, tunnel } = this.getOptions();
		const serializedCheckIn = {
			check_in_id: id,
			monitor_slug: checkIn.monitorSlug,
			status: checkIn.status,
			release,
			environment
		};
		if ("duration" in checkIn) serializedCheckIn.duration = checkIn.duration;
		if (monitorConfig) serializedCheckIn.monitor_config = {
			schedule: monitorConfig.schedule,
			checkin_margin: monitorConfig.checkinMargin,
			max_runtime: monitorConfig.maxRuntime,
			timezone: monitorConfig.timezone,
			failure_issue_threshold: monitorConfig.failureIssueThreshold,
			recovery_threshold: monitorConfig.recoveryThreshold
		};
		const [dynamicSamplingContext, traceContext] = _getTraceInfoFromScope(this, scope);
		if (traceContext) serializedCheckIn.contexts = { trace: traceContext };
		const envelope = createCheckInEnvelope(serializedCheckIn, dynamicSamplingContext, this.getSdkMetadata(), tunnel, this.getDsn());
		DEBUG_BUILD$4 && debug.log("Sending checkin:", checkIn.monitorSlug, checkIn.status);
		this.sendEnvelope(envelope);
		return id;
	}
	/**
	* @inheritDoc
	*/
	registerCleanup(callback) {
		this._disposeCallbacks.push(callback);
	}
	/**
	* Disposes of the client and releases all resources.
	*
	* This method clears all internal state to allow the client to be garbage collected.
	* It clears hooks, event processors, integrations, transport, and other internal references.
	*
	* Call this method after flushing to allow the client to be garbage collected.
	* After calling dispose(), the client should not be used anymore.
	*
	* Subclasses should override this method to clean up their own resources and call `super.dispose()`.
	*/
	dispose() {
		DEBUG_BUILD$4 && debug.log("Disposing client...");
		for (const callback of this._disposeCallbacks) try {
			callback();
		} catch {}
		this._disposeCallbacks.length = 0;
		for (const hookName of Object.keys(this._hooks)) this._hooks[hookName]?.clear();
		this._hooks = {};
		this._eventProcessors.length = 0;
		this._integrations = {};
		this._outcomes = {};
		this._transport = void 0;
		this._promiseBuffer = makePromiseBuffer(64);
	}
	/**
	* @inheritDoc
	*/
	_prepareEvent(event, hint, currentScope, isolationScope) {
		if (this._options.platform) event.platform = event.platform || this._options.platform;
		if (this._options.runtime) event.contexts = {
			...event.contexts,
			runtime: event.contexts?.runtime || this._options.runtime
		};
		if (this._options.serverName) event.server_name = event.server_name || this._options.serverName;
		return super._prepareEvent(event, hint, currentScope, isolationScope);
	}
	/**
	* Process a server-side metric before it is captured.
	*/
	_setUpMetricsProcessing() {
		this.on("processMetric", (metric) => {
			if (this._options.serverName) metric.attributes = {
				"server.address": this._options.serverName,
				...metric.attributes
			};
		});
	}
};
function setCurrentRequestSessionErroredOrCrashed(eventHint) {
	const requestSession = getIsolationScope().getScopeData().sdkProcessingMetadata.requestSession;
	if (requestSession) {
		const isHandledException = eventHint?.mechanism?.handled ?? true;
		if (isHandledException && requestSession.status !== "crashed") requestSession.status = "errored";
		else if (!isHandledException) requestSession.status = "crashed";
	}
}
function filenameIsInApp(filename, isNative = false) {
	return !(isNative || filename && !filename.startsWith("/") && !filename.match(/^[A-Z]:/) && !filename.startsWith(".") && !filename.match(/^[a-zA-Z]([a-zA-Z0-9.\-+])*:\/\//)) && filename !== void 0 && !filename.includes("node_modules/");
}
function node(getModule) {
	const FILENAME_MATCH = /^\s*[-]{4,}$/;
	const FULL_MATCH = /at (?:async )?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/;
	const DATA_URI_MATCH = /at (?:async )?(.+?) \(data:(.*?),/;
	return (line) => {
		const dataUriMatch = line.match(DATA_URI_MATCH);
		if (dataUriMatch) return {
			filename: `<data:${dataUriMatch[2]}>`,
			function: dataUriMatch[1]
		};
		const lineMatch = line.match(FULL_MATCH);
		if (lineMatch) {
			let object;
			let method;
			let functionName;
			let typeName;
			let methodName;
			if (lineMatch[1]) {
				functionName = lineMatch[1];
				let methodStart = functionName.lastIndexOf(".");
				if (functionName[methodStart - 1] === ".") methodStart--;
				if (methodStart > 0) {
					object = functionName.slice(0, methodStart);
					method = functionName.slice(methodStart + 1);
					const objectEnd = object.indexOf(".Module");
					if (objectEnd > 0) {
						functionName = functionName.slice(objectEnd + 1);
						object = object.slice(0, objectEnd);
					}
				}
				typeName = void 0;
			}
			if (method) {
				typeName = object;
				methodName = method;
			}
			if (method === "<anonymous>") {
				methodName = void 0;
				functionName = void 0;
			}
			if (functionName === void 0) {
				methodName = methodName || "?";
				functionName = typeName ? `${typeName}.${methodName}` : methodName;
			}
			let filename = normalizeStackTracePath(lineMatch[2]);
			const isNative = lineMatch[5] === "native";
			if (!filename && lineMatch[5] && !isNative) filename = lineMatch[5];
			const maybeDecodedFilename = filename ? _safeDecodeURI(filename) : void 0;
			return {
				filename: maybeDecodedFilename ?? filename,
				module: maybeDecodedFilename && getModule?.(maybeDecodedFilename),
				function: functionName,
				lineno: _parseIntOrUndefined(lineMatch[3]),
				colno: _parseIntOrUndefined(lineMatch[4]),
				in_app: filenameIsInApp(filename || "", isNative)
			};
		}
		if (line.match(FILENAME_MATCH)) return { filename: line };
	};
}
function nodeStackLineParser(getModule) {
	return [90, node(getModule)];
}
function _parseIntOrUndefined(input) {
	return parseInt(input || "", 10) || void 0;
}
function _safeDecodeURI(filename) {
	try {
		return decodeURI(filename);
	} catch {
		return;
	}
}
var requestLayerStore = /* @__PURE__ */ new WeakMap();
var storeLayer = (req, layer) => {
	const store = requestLayerStore.get(req);
	if (!store) requestLayerStore.set(req, [layer]);
	else store.push(layer);
};
var getStoredLayers = (req) => {
	let store = requestLayerStore.get(req);
	if (!store) {
		store = [];
		requestLayerStore.set(req, store);
	}
	return store;
};
var ATTR_EXPRESS_NAME = "express.name";
var ATTR_HTTP_ROUTE = "http.route";
var ATTR_EXPRESS_TYPE = "express.type";
var ExpressLayerType_ROUTER = "router";
var ExpressLayerType_MIDDLEWARE = "middleware";
var ExpressLayerType_REQUEST_HANDLER = "request_handler";
var asErrorAndMessage = (error) => error instanceof Error ? [error, error.message] : [String(error), String(error)];
function isRoutePattern(route) {
	return route.includes(":") || route.includes("*");
}
var getLayerMetadata = (route, layer, layerPath) => {
	if (layer.name === "router") {
		const maybeRouterPath = getRouterPath("", layer);
		const extractedRouterPath = maybeRouterPath ? maybeRouterPath : layerPath || route || "/";
		return {
			attributes: {
				[ATTR_EXPRESS_NAME]: extractedRouterPath,
				[ATTR_EXPRESS_TYPE]: ExpressLayerType_ROUTER
			},
			name: `router - ${extractedRouterPath}`
		};
	} else if (layer.name === "bound dispatch" || layer.name === "handle") return {
		attributes: {
			[ATTR_EXPRESS_NAME]: (route || layerPath) ?? "request handler",
			[ATTR_EXPRESS_TYPE]: ExpressLayerType_REQUEST_HANDLER
		},
		name: `request handler${layer.path ? ` - ${route || layerPath}` : ""}`
	};
	else return {
		attributes: {
			[ATTR_EXPRESS_NAME]: layer.name,
			[ATTR_EXPRESS_TYPE]: ExpressLayerType_MIDDLEWARE
		},
		name: `middleware - ${layer.name}`
	};
};
var getRouterPath = (path, layer) => {
	const stackLayer = Array.isArray(layer.handle?.stack) ? layer.handle?.stack?.[0] : void 0;
	if (stackLayer?.route?.path) return `${path}${stackLayer.route.path}`;
	if (stackLayer && Array.isArray(stackLayer?.handle?.stack)) return getRouterPath(path, stackLayer);
	return path;
};
var isLayerIgnored$1 = (name, type, config) => {
	if (Array.isArray(config?.ignoreLayersType) && config?.ignoreLayersType?.includes(type)) return true;
	if (!Array.isArray(config?.ignoreLayers)) return false;
	try {
		return stringMatchesSomePattern(name, config.ignoreLayers, true);
	} catch {}
	return false;
};
function getActualMatchedRoute(req, constructedRoute) {
	const layersStore = getStoredLayers(req);
	if (layersStore.length === 0) return;
	if (layersStore.every((path) => path === "/")) return req.originalUrl === "/" ? "/" : void 0;
	if (constructedRoute === "*") return constructedRoute;
	if (constructedRoute.includes("/") && (constructedRoute.includes(",") || constructedRoute.includes("\\") || constructedRoute.includes("*") || constructedRoute.includes("["))) return constructedRoute;
	const normalizedRoute = constructedRoute.startsWith("/") ? constructedRoute : `/${constructedRoute}`;
	return normalizedRoute.length > 0 && (req.originalUrl === normalizedRoute || req.originalUrl.startsWith(normalizedRoute) || isRoutePattern(normalizedRoute)) ? normalizedRoute : void 0;
}
function getConstructedRoute(req) {
	const layersStore = getStoredLayers(req);
	let constructedRoute = "";
	for (const path of layersStore) {
		if (path === "/" || path === "/*") continue;
		constructedRoute += !constructedRoute || constructedRoute.endsWith("/") ? path : `/${path}`;
	}
	return constructedRoute.replace(/\/{2,}/g, "/");
}
var getLayerPath = (args) => {
	const firstArg = args[0];
	if (Array.isArray(firstArg)) return firstArg.map((arg) => extractLayerPathSegment(arg) || "").join(",");
	return extractLayerPathSegment(firstArg);
};
var extractLayerPathSegment = (arg) => typeof arg === "string" ? arg : arg instanceof RegExp || typeof arg === "number" ? String(arg) : void 0;
var isExpressWithRouterPrototype = (express) => isExpressRouterPrototype(express?.Router?.prototype);
var isExpressRouterPrototype = (routerProto) => (typeof routerProto === "object" || typeof routerProto === "function") && !!routerProto && "route" in routerProto && typeof routerProto.route === "function";
var isExpressWithoutRouterPrototype = (express) => isExpressRouterPrototype(express.Router) && !isExpressWithRouterPrototype(express);
function setSDKProcessingMetadata(request) {
	if (!(getIsolationScope()?.getScopeData()?.sdkProcessingMetadata)?.normalizedRequest) {
		const normalizedRequest = httpRequestToRequestData(request);
		getIsolationScope().setSDKProcessingMetadata({ normalizedRequest });
	}
}
function patchLayer(getOptions, maybeLayer, layerPath) {
	if (!maybeLayer?.handle) return;
	const layer = maybeLayer;
	const layerHandleOriginal = layer.handle;
	if (getOriginalFunction(layerHandleOriginal)) return;
	if (layerHandleOriginal.length === 4) return;
	function layerHandlePatched(req, res, ...otherArgs) {
		const options = getOptions();
		setSDKProcessingMetadata(req);
		const parentSpan = getActiveSpan$1();
		if (!parentSpan) return layerHandleOriginal.apply(this, [
			req,
			res,
			...otherArgs
		]);
		if (layerPath) storeLayer(req, layerPath);
		const storedLayers = getStoredLayers(req);
		const isLayerPathStored = !!layerPath;
		const constructedRoute = getConstructedRoute(req);
		const actualMatchedRoute = getActualMatchedRoute(req, constructedRoute);
		options.onRouteResolved?.(actualMatchedRoute);
		const metadata = getLayerMetadata(constructedRoute, layer, layerPath);
		const name = metadata.attributes[ATTR_EXPRESS_NAME];
		const type = metadata.attributes[ATTR_EXPRESS_TYPE];
		const attributes = Object.assign(metadata.attributes, {
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.express",
			[SEMANTIC_ATTRIBUTE_SENTRY_OP]: `${type}.express`
		});
		if (actualMatchedRoute) attributes[ATTR_HTTP_ROUTE] = actualMatchedRoute;
		if (isLayerIgnored$1(metadata.attributes["express.name"], type, options)) {
			if (isLayerPathStored) storedLayers.pop();
			return layerHandleOriginal.apply(this, [
				req,
				res,
				...otherArgs
			]);
		}
		const currentScope = getIsolationScope();
		if (currentScope !== getDefaultIsolationScope()) {
			if (type === "request_handler") {
				const method = req.method ? req.method.toUpperCase() : "GET";
				currentScope.setTransactionName(`${method} ${constructedRoute}`);
			}
		} else DEBUG_BUILD$4 && debug.warn("Isolation scope is still default isolation scope - skipping setting transactionName");
		return startSpanManual$1({
			name,
			attributes
		}, (span) => {
			let spanHasEnded = false;
			if (metadata.attributes["express.type"] === "router") {
				span.end();
				spanHasEnded = true;
			}
			const onResponseFinish = () => {
				if (!spanHasEnded) {
					spanHasEnded = true;
					span.end();
				}
			};
			for (let i = 0; i < otherArgs.length; i++) {
				const callback = otherArgs[i];
				if (typeof callback !== "function") continue;
				otherArgs[i] = function(...args) {
					const maybeError = args[0];
					const isError = !!maybeError && maybeError !== "route" && maybeError !== "router";
					if (!spanHasEnded && isError) {
						const [_, message] = asErrorAndMessage(maybeError);
						span.setStatus({
							code: 2,
							message
						});
					}
					if (!spanHasEnded) {
						spanHasEnded = true;
						res.removeListener("finish", onResponseFinish);
						span.end();
					}
					if (!(req.route && isError) && isLayerPathStored) storedLayers.pop();
					return withActiveSpan$1(parentSpan, () => callback.apply(this, args));
				};
				break;
			}
			try {
				return layerHandleOriginal.apply(this, [
					req,
					res,
					...otherArgs
				]);
			} catch (anyError) {
				const [_, message] = asErrorAndMessage(anyError);
				span.setStatus({
					code: 2,
					message
				});
				throw anyError;
			} finally {
				if (!spanHasEnded) res.once("finish", onResponseFinish);
			}
		});
	}
	for (const key in layerHandleOriginal) {
		if (key in layerHandlePatched) continue;
		Object.defineProperty(layerHandlePatched, key, {
			get() {
				return layerHandleOriginal[key];
			},
			set(value) {
				layerHandleOriginal[key] = value;
			}
		});
	}
	markFunctionWrapped(layerHandlePatched, layerHandleOriginal);
	Object.defineProperty(layer, "handle", {
		enumerable: true,
		configurable: true,
		writable: true,
		value: layerHandlePatched
	});
}
function getDefaultExport(moduleExport) {
	return !!moduleExport && typeof moduleExport === "object" && "default" in moduleExport && moduleExport.default || moduleExport;
}
function isLegacyOptions(options) {
	return !!options.express;
}
var didLegacyDeprecationWarning = false;
function deprecationWarning() {
	if (!didLegacyDeprecationWarning) {
		didLegacyDeprecationWarning = true;
		DEBUG_BUILD$4 && debug.warn("[Express] `patchExpressModule(options)` is deprecated. Use `patchExpressModule(moduleExports, getOptions)` instead.");
	}
}
function patchExpressModule(optionsOrExports, maybeGetOptions) {
	let getOptions;
	let moduleExports;
	if (!maybeGetOptions && isLegacyOptions(optionsOrExports)) {
		const { express: express2, ...options } = optionsOrExports;
		moduleExports = express2;
		getOptions = () => options;
		deprecationWarning();
	} else if (typeof maybeGetOptions !== "function") throw new TypeError("`patchExpressModule(moduleExports, getOptions)` requires a `getOptions` callback");
	else {
		getOptions = maybeGetOptions;
		moduleExports = optionsOrExports;
	}
	const express = getDefaultExport(moduleExports);
	const routerProto = isExpressWithRouterPrototype(express) ? express.Router.prototype : isExpressWithoutRouterPrototype(express) ? express.Router : void 0;
	if (!routerProto) throw new TypeError("no valid Express route function to instrument");
	const originalRouteMethod = routerProto.route;
	try {
		wrapMethod(routerProto, "route", function routeTrace(...args) {
			const route = originalRouteMethod.apply(this, args);
			const layer = this.stack[this.stack.length - 1];
			patchLayer(getOptions, layer, getLayerPath(args));
			return route;
		});
	} catch (e) {
		DEBUG_BUILD$4 && debug.error("Failed to patch express route method:", e);
	}
	const originalRouterUse = routerProto.use;
	try {
		wrapMethod(routerProto, "use", function useTrace(...args) {
			const route = originalRouterUse.apply(this, args);
			const layer = this.stack[this.stack.length - 1];
			if (!layer) return route;
			patchLayer(getOptions, layer, getLayerPath(args));
			return route;
		});
	} catch (e) {
		DEBUG_BUILD$4 && debug.error("Failed to patch express use method:", e);
	}
	const { application } = express;
	const originalApplicationUse = application.use;
	try {
		wrapMethod(application, "use", function appUseTrace(...args) {
			const route = originalApplicationUse.apply(this, args);
			const router = isExpressWithRouterPrototype(express) ? this.router : this._router;
			if (router) {
				const layer = router.stack[router.stack.length - 1];
				if (layer) patchLayer(getOptions, layer, getLayerPath(args));
			}
			return route;
		});
	} catch (e) {
		DEBUG_BUILD$4 && debug.error("Failed to patch express application.use method:", e);
	}
	return express;
}
var SQL_OPERATION_REGEX$1 = /^(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)/i;
var CONNECTION_CONTEXT_SYMBOL = /* @__PURE__ */ Symbol("sentryPostgresConnectionContext");
var INSTRUMENTED_MARKER = /* @__PURE__ */ Symbol.for("sentry.instrumented.postgresjs");
var QUERY_FROM_INSTRUMENTED_SQL$1 = /* @__PURE__ */ Symbol.for("sentry.query.from.instrumented.sql");
function instrumentPostgresJsSql(sql, options) {
	if (!sql || typeof sql !== "function") {
		DEBUG_BUILD$4 && debug.warn("instrumentPostgresJsSql: provided value is not a valid postgres.js sql instance");
		return sql;
	}
	return _instrumentSqlInstance(sql, {
		requireParentSpan: true,
		...options
	});
}
function _instrumentSqlInstance(sql, options, parentConnectionContext) {
	if (sql[INSTRUMENTED_MARKER]) return sql;
	const proxiedSql = new Proxy(sql, {
		apply(target, thisArg, argumentsList) {
			const query = Reflect.apply(target, thisArg, argumentsList);
			if (isObjectLike(query) && "handle" in query) _wrapSingleQueryHandle(query, proxiedSql, options);
			return query;
		},
		get(target, prop) {
			const original = target[prop];
			if (typeof prop !== "string" || typeof original !== "function") return original;
			if (prop === "unsafe" || prop === "file") return _wrapQueryMethod(original, target, proxiedSql, options);
			if (prop === "begin" || prop === "reserve") return _wrapCallbackMethod(original, target, proxiedSql, options);
			return original;
		}
	});
	if (parentConnectionContext) proxiedSql[CONNECTION_CONTEXT_SYMBOL] = parentConnectionContext;
	else _attachConnectionContext(sql, proxiedSql);
	sql[INSTRUMENTED_MARKER] = true;
	proxiedSql[INSTRUMENTED_MARKER] = true;
	return proxiedSql;
}
function _wrapQueryMethod(original, target, proxiedSql, options) {
	return function(...args) {
		const query = Reflect.apply(original, target, args);
		if (isObjectLike(query) && "handle" in query) _wrapSingleQueryHandle(query, proxiedSql, options);
		return query;
	};
}
function _wrapCallbackMethod(original, target, parentSqlInstance, options) {
	return function(...args) {
		const parentContext = parentSqlInstance[CONNECTION_CONTEXT_SYMBOL];
		if (!(typeof args[args.length - 1] === "function")) {
			const result = Reflect.apply(original, target, args);
			if (result && typeof result.then === "function") return result.then((sqlInstance) => {
				return _instrumentSqlInstance(sqlInstance, options, parentContext);
			});
			return result;
		}
		const callback = args.length === 1 ? args[0] : args[1];
		const wrappedCallback = function(sqlInstance) {
			const instrumentedSql = _instrumentSqlInstance(sqlInstance, options, parentContext);
			return callback(instrumentedSql);
		};
		const newArgs = args.length === 1 ? [wrappedCallback] : [args[0], wrappedCallback];
		return Reflect.apply(original, target, newArgs);
	};
}
function _wrapSingleQueryHandle(query, sqlInstance, options) {
	if (query.handle?.__sentryWrapped) return;
	query[QUERY_FROM_INSTRUMENTED_SQL$1] = true;
	const originalHandle = query.handle;
	const wrappedHandle = async function(...args) {
		if (this.executed || !_shouldCreateSpans(options)) return originalHandle.apply(this, args);
		const sanitizedSqlQuery = _sanitizeSqlQuery(_reconstructQuery(query.strings));
		return startSpanManual$1({
			name: sanitizedSqlQuery || "postgresjs.query",
			op: "db"
		}, (span) => {
			span.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN, "auto.db.postgresjs");
			span.setAttributes({
				"db.system.name": "postgres",
				"db.query.text": sanitizedSqlQuery
			});
			const connectionContext = sqlInstance ? sqlInstance[CONNECTION_CONTEXT_SYMBOL] : void 0;
			_setConnectionAttributes(span, connectionContext);
			if (options.requestHook) try {
				options.requestHook(span, sanitizedSqlQuery, connectionContext);
			} catch (e) {
				span.setAttribute("sentry.hook.error", "requestHook failed");
				DEBUG_BUILD$4 && debug.error("Error in requestHook for PostgresJs instrumentation:", e);
			}
			const queryWithCallbacks = this;
			queryWithCallbacks.resolve = new Proxy(queryWithCallbacks.resolve, { apply: (resolveTarget, resolveThisArg, resolveArgs) => {
				try {
					_setOperationName(span, sanitizedSqlQuery, resolveArgs?.[0]?.command);
					span.end();
				} catch (e) {
					DEBUG_BUILD$4 && debug.error("Error ending span in resolve callback:", e);
				}
				return Reflect.apply(resolveTarget, resolveThisArg, resolveArgs);
			} });
			queryWithCallbacks.reject = new Proxy(queryWithCallbacks.reject, { apply: (rejectTarget, rejectThisArg, rejectArgs) => {
				try {
					span.setStatus({
						code: 2,
						message: rejectArgs?.[0]?.message || "unknown_error"
					});
					span.setAttribute("db.response.status_code", rejectArgs?.[0]?.code || "unknown");
					span.setAttribute("error.type", rejectArgs?.[0]?.name || "unknown");
					_setOperationName(span, sanitizedSqlQuery);
					span.end();
				} catch (e) {
					DEBUG_BUILD$4 && debug.error("Error ending span in reject callback:", e);
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
	wrappedHandle.__sentryWrapped = true;
	query.handle = wrappedHandle;
}
function _shouldCreateSpans(options) {
	return getActiveSpan$1() !== void 0 || !options.requireParentSpan;
}
function _reconstructQuery(strings) {
	if (!strings?.length) return;
	if (strings.length === 1) return strings[0] || void 0;
	return strings.reduce((acc, str, i) => i === 0 ? str : `${acc}$${i}${str}`, "");
}
var integerLiteralRE;
function _sanitizeSqlQuery(sqlQuery) {
	if (!sqlQuery) return "Unknown SQL Query";
	if (!integerLiteralRE) integerLiteralRE = /* @__PURE__ */ new RegExp("(?<!\\$)-?\\b\\d+\\b", "g");
	return sqlQuery.replace(/--.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/;\s*$/, "").replace(/\s+/g, " ").trim().replace(/\bX'[0-9A-Fa-f]*'/gi, "?").replace(/\bB'[01]*'/gi, "?").replace(/'(?:[^']|'')*'/g, "?").replace(/\b0x[0-9A-Fa-f]+/gi, "?").replace(/\b(?:TRUE|FALSE)\b/gi, "?").replace(/-?\b\d+\.?\d*[eE][+-]?\d+\b/g, "?").replace(/-?\b\d+\.\d+\b/g, "?").replace(/-?\.\d+\b/g, "?").replace(integerLiteralRE, "?").replace(/\bIN\b\s*\(\s*\?(?:\s*,\s*\?)*\s*\)/gi, "IN (?)").replace(/\bIN\b\s*\(\s*\$\d+(?:\s*,\s*\$\d+)*\s*\)/gi, "IN ($?)");
}
function _setConnectionAttributes(span, connectionContext) {
	if (!connectionContext) return;
	if (connectionContext.ATTR_DB_NAMESPACE) span.setAttribute("db.namespace", connectionContext.ATTR_DB_NAMESPACE);
	if (connectionContext.ATTR_SERVER_ADDRESS) span.setAttribute("server.address", connectionContext.ATTR_SERVER_ADDRESS);
	if (connectionContext.ATTR_SERVER_PORT !== void 0) {
		const portNumber = parseInt(connectionContext.ATTR_SERVER_PORT, 10);
		if (!isNaN(portNumber)) span.setAttribute("server.port", portNumber);
	}
}
function _setOperationName(span, sanitizedQuery, command) {
	if (command) {
		span.setAttribute("db.operation.name", command);
		return;
	}
	const operationMatch = sanitizedQuery?.match(SQL_OPERATION_REGEX$1);
	if (operationMatch?.[1]) span.setAttribute("db.operation.name", operationMatch[1].toUpperCase());
}
function _buildConnectionContext(options) {
	const host = options.host?.[0] || "localhost";
	const port = options.port?.[0] || 5432;
	return {
		ATTR_DB_NAMESPACE: typeof options.database === "string" && options.database !== "" ? options.database : void 0,
		ATTR_SERVER_ADDRESS: host,
		ATTR_SERVER_PORT: String(port)
	};
}
function _attachConnectionContext(sql, proxiedSql) {
	const sqlInstance = sql;
	if (!sqlInstance.options || typeof sqlInstance.options !== "object") return;
	proxiedSql[CONNECTION_CONTEXT_SYMBOL] = _buildConnectionContext(sqlInstance.options);
}
var HTTP_ON_CLIENT_REQUEST = "http.client.request.created";
var HTTP_ON_SERVER_REQUEST = "http.server.request.start";
function getRequestOptions(request) {
	const hostWithPort = request.host || "";
	const portInHost = /^(.*):(\d+)$/.exec(hostWithPort);
	const hostname = portInHost ? portInHost[1] : hostWithPort;
	const port = request.port ?? (portInHost ? Number(portInHost[2]) : void 0);
	return {
		method: request.method,
		port,
		protocol: request.protocol,
		host: request.host,
		hostname,
		path: request.path,
		headers: request.getHeaders()
	};
}
function getRequestUrl(requestOptions) {
	try {
		return String(getRequestUrlObject(requestOptions));
	} catch {
		return "";
	}
}
function getRequestUrlObject(requestOptions) {
	const protocol = requestOptions.protocol || "http:";
	const hostname = requestOptions.headers?.host && String(requestOptions.headers?.host) || requestOptions.hostname || requestOptions.host || "";
	const port = !requestOptions.port || requestOptions.port === 80 || requestOptions.port === 443 || /^(.*):(\d+)$/.test(hostname) ? "" : `:${requestOptions.port}`;
	const path = requestOptions.path ? requestOptions.path : "/";
	const base = `${protocol}//${hostname}${port}`;
	return new URL(path.startsWith("//") ? `${base}${path}` : path, base);
}
function getRequestUrlFromClientRequest(request) {
	return String(getRequestUrl(getRequestOptions(request)));
}
function addOutgoingRequestBreadcrumb(request, response) {
	const parsedUrl = parseUrl(getRequestUrlFromClientRequest(request));
	const statusCode = response?.statusCode;
	const level = getBreadcrumbLogLevelFromHttpStatusCode(statusCode);
	addBreadcrumb({
		category: "http",
		data: {
			status_code: statusCode,
			url: getSanitizedUrlString(parsedUrl),
			"http.method": request.method || "GET",
			...parsedUrl.search ? { "http.query": parsedUrl.search } : {},
			...parsedUrl.hash ? { "http.fragment": parsedUrl.hash } : {}
		},
		type: "http",
		level
	}, {
		event: "response",
		request,
		response
	});
}
function getOutgoingRequestSpanData(request) {
	const url = getRequestUrlFromClientRequest(request);
	const [name, attributes] = getHttpSpanDetailsFromUrlObject(parseStringToURLObject(url), "client", "auto.http.client", request);
	const userAgent = request.getHeader("user-agent");
	return {
		name,
		attributes: {
			[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "http.client",
			"otel.kind": "CLIENT",
			"http.url": url,
			"http.method": request.method,
			"http.target": request.path || "/",
			"net.peer.name": request.host,
			"http.host": request.getHeader("host"),
			...userAgent ? { "user_agent.original": userAgent } : {},
			...attributes
		},
		onlyIfParent: true
	};
}
function setIncomingResponseSpanData(response, span) {
	const { statusCode, statusMessage, httpVersion, socket } = response;
	const transport = httpVersion?.toUpperCase() !== "QUIC" ? "ip_tcp" : "ip_udp";
	span.setAttributes({
		"http.response.status_code": statusCode,
		"network.protocol.version": httpVersion,
		"http.flavor": httpVersion,
		"network.transport": transport,
		"net.transport": transport,
		"http.status_text": statusMessage?.toUpperCase(),
		"http.status_code": statusCode,
		...getResponseContentLengthAttributes(response),
		...getSocketAttrs(socket)
	});
}
function getSocketAttrs(socket) {
	if (!socket) return {};
	const { remoteAddress, remotePort } = socket;
	return {
		"network.peer.address": remoteAddress,
		"network.peer.port": remotePort,
		"net.peer.ip": remoteAddress,
		"net.peer.port": remotePort
	};
}
function getResponseContentLengthAttributes(response) {
	const { headers } = response;
	const contentLengthHeader = headers["content-length"];
	const length = contentLengthHeader ? parseInt(String(contentLengthHeader), 10) : -1;
	const encoding = headers["content-encoding"];
	return length >= 0 ? encoding && encoding !== "identity" ? { "http.response_content_length": length } : { "http.response_content_length_uncompressed": length } : {};
}
function injectTracePropagationHeaders(request, propagationDecisionMap) {
	const url = getRequestUrlFromClientRequest(request);
	const { tracePropagationTargets, propagateTraceparent } = getClient()?.getOptions() ?? {};
	if (!shouldPropagateTraceForUrl(url, tracePropagationTargets, propagationDecisionMap)) return;
	if (!!request.getHeader("sentry-trace")) return;
	const traceData = getTraceData$1({ propagateTraceparent });
	if (!traceData) return;
	const { "sentry-trace": sentryTrace, baggage, traceparent } = traceData;
	if (sentryTrace) try {
		request.setHeader("sentry-trace", sentryTrace);
		DEBUG_BUILD$4 && debug.log("@sentry/instrumentation-http", "Added sentry-trace header");
	} catch (e) {
		DEBUG_BUILD$4 && debug.error("@sentry/instrumentation-http", "Failed to set sentry-trace header:", isError(e) ? e.message : "Unknown error");
	}
	if (traceparent && !request.getHeader("traceparent")) try {
		request.setHeader("traceparent", traceparent);
		DEBUG_BUILD$4 && debug.log("@sentry/instrumentation-http", "Added traceparent header");
	} catch (e) {
		DEBUG_BUILD$4 && debug.error("@sentry/instrumentation-http", "Failed to set traceparent header:", isError(e) ? e.message : "Unknown error");
	}
	if (baggage) {
		const merged = mergeBaggageHeaders(request.getHeader("baggage"), baggage);
		if (merged) try {
			request.setHeader("baggage", merged);
			DEBUG_BUILD$4 && debug.log("@sentry/instrumentation-http", "Added baggage header");
		} catch (e) {
			DEBUG_BUILD$4 && debug.error("@sentry/instrumentation-http", "Failed to set baggage header:", isError(e) ? e.message : "Unknown error");
		}
	}
}
var isOtelWrapped = (fn) => typeof fn.__unwrap === "function";
var warning = "Double-wrapped http.client detected. Either disable spans in Sentry.httpIntegration, or disable the OpenTelemetry HTTP instrumentation. See: https://docs.sentry.io/platforms/javascript/guides/express/opentelemetry/custom-setup/#custom-http-instrumentation";
var didDoubleWrapWarning = false;
var doubleWrapWarning = DEBUG_BUILD$4 ? (http) => {
	if (!didDoubleWrapWarning) {
		if (isOtelWrapped(http.request) || isOtelWrapped(http.get)) {
			didDoubleWrapWarning = true;
			debug.warn(warning);
		}
	}
} : () => {};
function getHttpClientSubscriptions(options) {
	const propagationDecisionMap = new LRUMap(100);
	const getConfig = () => getClient()?.getOptions();
	const onHttpClientRequestCreated = (data) => {
		if (getCurrentScope().getScopeData().sdkProcessingMetadata["__SENTRY_SUPPRESS_TRACING__"] === true) return;
		const clientOptions = getConfig();
		const { errorMonitor = "error", spans: createSpans = clientOptions ? hasSpansEnabled(clientOptions) : true, propagateTrace = false, breadcrumbs = true, http, https, suppressOtelWarning = false } = options;
		const { request } = data;
		if (options.ignoreOutgoingRequests?.(getRequestUrlFromClientRequest(request), request)) return;
		let addedBreadcrumbs = false;
		function addBreadcrumbs(request2, response) {
			if (!addedBreadcrumbs) {
				addedBreadcrumbs = true;
				addOutgoingRequestBreadcrumb(request2, response);
			}
		}
		function breadcrumbsOnly(request2) {
			request2.on(errorMonitor, () => addBreadcrumbs(request2, void 0));
			request2.prependListener("response", (response) => {
				if (request2.listenerCount("response") <= 1) response.resume();
				response.on("end", () => addBreadcrumbs(request2, response));
				response.on(errorMonitor, () => addBreadcrumbs(request2, response));
			});
		}
		if (!createSpans) {
			if (breadcrumbs) breadcrumbsOnly(request);
			if (propagateTrace) injectTracePropagationHeaders(request, propagationDecisionMap);
			return;
		}
		if (!suppressOtelWarning) {
			if (http) doubleWrapWarning(http);
			if (https) doubleWrapWarning(https);
		}
		const span = startInactiveSpan$1(getOutgoingRequestSpanData(request));
		options.outgoingRequestHook?.(span, request);
		if (propagateTrace) {
			if (span.isRecording()) withActiveSpan$1(span, () => {
				injectTracePropagationHeaders(request, propagationDecisionMap);
			});
			else injectTracePropagationHeaders(request, propagationDecisionMap);
		}
		let spanEnded = false;
		function endSpan(status) {
			if (!spanEnded) {
				spanEnded = true;
				span.setStatus(status);
				span.end();
			}
		}
		const requestOnClose = () => endSpan({ code: 0 });
		request.on("close", requestOnClose);
		request.on(errorMonitor, (error) => {
			DEBUG_BUILD$4 && debug.log("@sentry/instrumentation-http", "outgoingRequest on request error()", error);
			if (breadcrumbs) addBreadcrumbs(request, void 0);
			endSpan({ code: 2 });
		});
		request.prependListener("response", (response) => {
			request.removeListener("close", requestOnClose);
			if (request.listenerCount("response") <= 1) response.resume();
			setIncomingResponseSpanData(response, span);
			bindScopeToEmitter(response);
			options.outgoingResponseHook?.(span, response);
			let finished = false;
			function finishWithResponse(error) {
				if (!finished) {
					finished = true;
					if (error) DEBUG_BUILD$4 && debug.log("@sentry/instrumentation-http", "outgoingRequest on response error()", error);
					if (breadcrumbs) addBreadcrumbs(request, response);
					const aborted = response.aborted && !response.complete;
					const status = error || typeof response.statusCode !== "number" || aborted ? { code: 2 } : getSpanStatusFromHttpCode(response.statusCode);
					options.applyCustomAttributesOnSpan?.(span, request, response);
					endSpan(status);
				}
			}
			response.on("end", () => finishWithResponse());
			response.on(errorMonitor, finishWithResponse);
		});
	};
	return { [HTTP_ON_CLIENT_REQUEST]: onHttpClientRequestCreated };
}
var onHttpClientRequestCreated;
function patchClientRequest(httpModule, options) {
	const proto = httpModule.ClientRequest?.prototype;
	if (typeof proto?._storeHeader !== "function") return;
	onHttpClientRequestCreated = getHttpClientSubscriptions({
		...options,
		http: httpModule
	})[HTTP_ON_CLIENT_REQUEST];
	if (getOriginalFunction(proto._storeHeader)) return;
	const originalStoreHeader = proto._storeHeader;
	wrapMethod(proto, "_storeHeader", function patchedStoreHeader(...args) {
		try {
			onHttpClientRequestCreated({ request: this }, HTTP_ON_CLIENT_REQUEST);
		} catch {}
		return originalStoreHeader.apply(this, args);
	});
}
function patchModule(httpModuleExport, options = {}) {
	patchClientRequest(getDefaultExport(httpModuleExport), options);
	return httpModuleExport;
}
var patchHttpModuleClient = (httpModuleExport, options = {}) => patchModule(httpModuleExport, options);
function patchRequestToCaptureBody(req, isolationScope, maxIncomingRequestBodySize, integrationName) {
	let bodyByteLength = 0;
	const chunks = [];
	DEBUG_BUILD$4 && debug.log(integrationName, "Patching request.on");
	const callbackMap = /* @__PURE__ */ new WeakMap();
	const maxBodySize = getMaxBodyByteLength(maxIncomingRequestBodySize);
	try {
		req.on = req.addListener = new Proxy(req.on, { apply: (target, thisArg, args) => {
			const [event, listener, ...restArgs] = args;
			if (event === "data") {
				DEBUG_BUILD$4 && debug.log(integrationName, `Handling request.on("data") with maximum body size of ${maxBodySize}b`);
				const callback = new Proxy(listener, { apply: (target2, thisArg2, args2) => {
					try {
						const chunk = args2[0];
						const bufferifiedChunk = Buffer.from(chunk);
						if (bodyByteLength < maxBodySize) {
							chunks.push(bufferifiedChunk);
							bodyByteLength += bufferifiedChunk.byteLength;
						} else if (DEBUG_BUILD$4) debug.log(integrationName, `Dropping request body chunk because maximum body length of ${maxBodySize}b is exceeded.`);
					} catch (_err) {
						DEBUG_BUILD$4 && debug.error(integrationName, "Encountered error while storing body chunk.");
					}
					return Reflect.apply(target2, thisArg2, args2);
				} });
				callbackMap.set(listener, callback);
				return Reflect.apply(target, thisArg, [
					event,
					callback,
					...restArgs
				]);
			}
			return Reflect.apply(target, thisArg, args);
		} });
		req.off = req.removeListener = new Proxy(req.off, { apply: (target, thisArg, args) => {
			const [, listener] = args;
			const callback = callbackMap.get(listener);
			if (callback) {
				callbackMap.delete(listener);
				const modifiedArgs = args.slice();
				modifiedArgs[1] = callback;
				return Reflect.apply(target, thisArg, modifiedArgs);
			}
			return Reflect.apply(target, thisArg, args);
		} });
		req.on("end", () => {
			try {
				const body = Buffer.concat(chunks).toString("utf-8");
				if (body) {
					const truncatedBody = Buffer.byteLength(body, "utf-8") > maxBodySize ? `${Buffer.from(body).subarray(0, maxBodySize - 3).toString("utf-8")}...` : body;
					isolationScope.setSDKProcessingMetadata({ normalizedRequest: { data: truncatedBody } });
				}
			} catch (error) {
				if (DEBUG_BUILD$4) debug.error(integrationName, "Error building captured request body", error);
			}
		});
	} catch (error) {
		if (DEBUG_BUILD$4) debug.error(integrationName, "Error patching request to capture body", error);
	}
}
var clientToRequestSessionAggregatesMap = /* @__PURE__ */ new WeakMap();
function recordRequestSession(client, { requestIsolationScope, response, sessionFlushingDelayMS }) {
	requestIsolationScope.setSDKProcessingMetadata({ requestSession: { status: "ok" } });
	response.once("close", () => {
		const requestSession = requestIsolationScope.getScopeData().sdkProcessingMetadata.requestSession;
		if (client && requestSession) {
			DEBUG_BUILD$4 && debug.log(`Recorded request session with status: ${requestSession.status}`);
			const roundedDate = new Date(safeDateNow());
			roundedDate.setSeconds(0, 0);
			const dateBucketKey = roundedDate.toISOString();
			const existingClientAggregate = clientToRequestSessionAggregatesMap.get(client);
			const bucket = existingClientAggregate?.[dateBucketKey] || {
				exited: 0,
				crashed: 0,
				errored: 0
			};
			bucket[{
				ok: "exited",
				crashed: "crashed",
				errored: "errored"
			}[requestSession.status]]++;
			if (existingClientAggregate) existingClientAggregate[dateBucketKey] = bucket;
			else {
				DEBUG_BUILD$4 && debug.log("Opened new request session aggregate.");
				const newClientAggregate = { [dateBucketKey]: bucket };
				clientToRequestSessionAggregatesMap.set(client, newClientAggregate);
				const flushPendingClientAggregates = () => {
					clearTimeout(timeout);
					unregisterClientFlushHook();
					clientToRequestSessionAggregatesMap.delete(client);
					const aggregatePayload = Object.entries(newClientAggregate).map(([timestamp, value]) => ({
						started: timestamp,
						exited: value.exited,
						errored: value.errored,
						crashed: value.crashed
					}));
					client.sendSession({ aggregates: aggregatePayload });
				};
				const unregisterClientFlushHook = client.on("flush", () => {
					DEBUG_BUILD$4 && debug.log("Sending request session aggregate due to client flush");
					flushPendingClientAggregates();
				});
				const timeout = setTimeout(() => {
					DEBUG_BUILD$4 && debug.log("Sending request session aggregate due to flushing schedule");
					flushPendingClientAggregates();
				}, sessionFlushingDelayMS);
				safeUnref(timeout);
			}
		}
	});
}
var INTEGRATION_NAME$37 = "Http.Server";
var SPANS_INTEGRATION_NAME = "Http.SentryServerSpans";
var lastSentryEmitMap = /* @__PURE__ */ new WeakMap();
var kRequestMark = /* @__PURE__ */ Symbol.for("sentry_http_server_instrumented");
function markRequest(request) {
	return !request[kRequestMark] && (request[kRequestMark] = true);
}
function instrumentServer(options, server) {
	const currentEmit = server.emit;
	if (currentEmit === lastSentryEmitMap.get(server)) return;
	const newEmit = new Proxy(currentEmit, { apply(target, thisArg, args) {
		const [event, ...data] = args;
		if (event !== "request") return target.apply(thisArg, args);
		const client = getClient();
		const [request, response] = data;
		if (!client || !markRequest(request)) return target.apply(thisArg, args);
		DEBUG_BUILD$4 && debug.log(INTEGRATION_NAME$37, "Handling incoming request");
		const isolationScope = getIsolationScope().clone();
		isolationScope.setClient(client);
		const ipAddress = request.socket?.remoteAddress;
		const url = request.url || "/";
		const normalizedRequest = httpRequestToRequestData(request);
		const { maxRequestBodySize = "medium", ignoreRequestBody, sessions = true, sessionFlushingDelayMS = 6e4 } = options;
		if (maxRequestBodySize !== "none" && !ignoreRequestBody?.(url, request)) patchRequestToCaptureBody(request, isolationScope, maxRequestBodySize, INTEGRATION_NAME$37);
		isolationScope.setSDKProcessingMetadata({
			normalizedRequest,
			ipAddress
		});
		const bestEffortTransactionName = `${(request.method || "GET").toUpperCase()} ${stripUrlQueryAndFragment(url)}`;
		isolationScope.setTransactionName(bestEffortTransactionName);
		if (sessions) recordRequestSession(client, {
			requestIsolationScope: isolationScope,
			response,
			sessionFlushingDelayMS: sessionFlushingDelayMS ?? 6e4
		});
		return withIsolationScope(isolationScope, () => {
			const sentryTrace = normalizedRequest.headers?.["sentry-trace"];
			const baggage = normalizedRequest.headers?.["baggage"];
			const sentryTraceValue = Array.isArray(sentryTrace) ? sentryTrace[0] : sentryTrace;
			return continueTrace$1({
				sentryTrace: sentryTraceValue,
				baggage: Array.isArray(baggage) ? baggage[0] : baggage
			}, () => {
				const propagationContext = getCurrentScope().getPropagationContext();
				propagationContext.propagationSpanId = generateSpanId();
				if (!sentryTraceValue) {
					propagationContext.traceId = generateTraceId();
					propagationContext.sampleRand = safeMathRandom();
				}
				response.once("close", () => {
					isolationScope.setContext("response", { status_code: response.statusCode });
				});
				const wrap = options.wrapServerEmitRequest;
				let emitResult = false;
				if (wrap) wrap(request, response, normalizedRequest, () => {
					emitResult = target.apply(thisArg, args);
				});
				else emitResult = target.apply(thisArg, args);
				return emitResult;
			});
		});
	} });
	lastSentryEmitMap.set(server, newEmit);
	server.emit = newEmit;
}
function getHttpServerSubscriptions(options) {
	const userWrap = options.wrapServerEmitRequest;
	const spanWrap = buildServerSpanWrap(options);
	const effectiveOptions = {
		...options,
		wrapServerEmitRequest(request, response, normalizedRequest, next) {
			const clientOptions = getClient()?.getOptions();
			if (options.spans ?? (clientOptions ? hasSpansEnabled(clientOptions) : false)) spanWrap(request, response, normalizedRequest, next);
			else if (userWrap) userWrap(request, response, normalizedRequest, next);
			else next();
		}
	};
	const onHttpServerRequest = (data) => {
		const { server } = data;
		instrumentServer(effectiveOptions, server);
	};
	return { [HTTP_ON_SERVER_REQUEST]: onHttpServerRequest };
}
function buildServerSpanWrap(options) {
	const { wrapServerEmitRequest: userWrap, ignoreIncomingRequests, ignoreStaticAssets = true, onSpanCreated, errorMonitor = "error", onSpanEnd } = options;
	return (request, response, normalizedRequest, next) => {
		if (typeof __SENTRY_TRACING__ !== "undefined" && !__SENTRY_TRACING__) return next();
		return userWrap ? userWrap(request, response, normalizedRequest, createSpan) : createSpan();
		function createSpan() {
			const client = getIsolationScope().getClient();
			if (!client) return next();
			if (shouldIgnoreSpansForIncomingRequest$1(request, {
				ignoreStaticAssets,
				ignoreIncomingRequests
			})) {
				DEBUG_BUILD$4 && debug.log(SPANS_INTEGRATION_NAME, "Skipping span creation for incoming request", request.url);
				return next();
			}
			const fullUrl = normalizedRequest.url || request.url || "/";
			const urlObj = parseStringToURLObject(fullUrl);
			const httpTargetWithoutQueryFragment = urlObj ? urlObj.pathname : stripUrlQueryAndFragment(fullUrl);
			const method = (request.method || "GET").toUpperCase();
			const name = `${method} ${httpTargetWithoutQueryFragment}`;
			const headers = request.headers;
			const userAgent = headers["user-agent"];
			const ips = headers["x-forwarded-for"];
			const httpVersion = request.httpVersion;
			const host = headers.host;
			const hostname = host?.replace(/^(.*)(:[0-9]{1,5})/, "$1") || "localhost";
			const scheme = fullUrl.startsWith("https") ? "https" : "http";
			const { socket } = request;
			const { localAddress, localPort, remoteAddress, remotePort } = socket ?? {};
			return startSpanManual$1({
				name,
				kind: SPAN_KIND.SERVER,
				attributes: {
					[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "http.server",
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.server",
					[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url",
					"http.route": httpTargetWithoutQueryFragment,
					"otel.kind": "SERVER",
					"net.host.ip": localAddress,
					"net.host.port": localPort,
					"net.peer.ip": remoteAddress,
					"net.peer.port": remotePort,
					"sentry.http.prefetch": isKnownPrefetchRequest$1(request) || void 0,
					[Yu]: urlObj && !isURLObjectRelative(urlObj) ? urlObj.href : void 0,
					[Vu]: urlObj?.pathname ?? httpTargetWithoutQueryFragment,
					[ws]: fullUrl,
					"http.method": method,
					"http.target": urlObj ? `${urlObj.pathname}${urlObj.search}` : httpTargetWithoutQueryFragment,
					"http.host": host,
					"net.host.name": hostname,
					"http.client_ip": typeof ips === "string" ? ips.split(",")[0] : void 0,
					"http.user_agent": userAgent,
					"http.scheme": scheme,
					"http.flavor": httpVersion,
					"net.transport": httpVersion?.toUpperCase() === "QUIC" ? "ip_udp" : "ip_tcp",
					...getRequestContentLengthAttribute$1(request),
					...httpHeadersToSpanAttributes(normalizedRequest.headers || {}, client.getDataCollectionOptions())
				}
			}, (span) => {
				onSpanCreated?.(span, request, response);
				let isEnded = false;
				function endSpan(status) {
					if (isEnded) return;
					isEnded = true;
					span.setAttributes({
						"http.status_text": response.statusMessage?.toUpperCase(),
						"http.response.status_code": response.statusCode,
						"http.status_code": response.statusCode,
						...httpHeadersToSpanAttributes(headersToDict(response.headers), client?.getDataCollectionOptions() ?? false, "response")
					});
					span.setStatus(status);
					onSpanEnd?.(span, request, response);
					span.end();
				}
				response.once("close", () => {
					endSpan(getSpanStatusFromHttpCode(response.statusCode));
				});
				response.once(errorMonitor, () => {
					const httpStatus = getSpanStatusFromHttpCode(response.statusCode);
					endSpan(httpStatus.code === 2 ? httpStatus : { code: 2 });
				});
				next();
			});
		}
	};
}
function shouldIgnoreSpansForIncomingRequest$1(request, { ignoreStaticAssets, ignoreIncomingRequests }) {
	const urlPath = request.url;
	const method = request.method?.toUpperCase();
	if (method === "OPTIONS" || method === "HEAD" || !urlPath) return true;
	if (ignoreStaticAssets && method === "GET" && isStaticAssetRequest$1(urlPath)) return true;
	if (ignoreIncomingRequests?.(urlPath, request)) return true;
	return false;
}
function isStaticAssetRequest$1(urlPath) {
	const path = stripUrlQueryAndFragment(urlPath);
	if (path.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2|ttf|eot|webp|avif)$/)) return true;
	if (path.match(/^\/(robots\.txt|sitemap\.xml|manifest\.json|browserconfig\.xml)$/)) return true;
	return false;
}
function isKnownPrefetchRequest$1(req) {
	return req.headers["next-router-prefetch"] === "1";
}
function getRequestContentLengthAttribute$1(request) {
	const { headers } = request;
	const contentLengthHeader = headers["content-length"];
	const length = contentLengthHeader ? parseInt(String(contentLengthHeader), 10) : -1;
	const encoding = headers["content-encoding"];
	return length >= 0 ? encoding && encoding !== "identity" ? { "http.request_content_length": length } : { "http.request_content_length_uncompressed": length } : {};
}
var DEBUG_BUILD$3 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
var HTTP_SERVER_INSTRUMENTED_KEY = (0, import_src.createContextKey)("sentry_http_server_instrumented");
var INTEGRATION_NAME$36 = "Http.Server";
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
		name: INTEGRATION_NAME$36,
		setupOnce() {
			const { [HTTP_ON_SERVER_REQUEST]: onHttpServerRequestStart } = getHttpServerSubscriptions(_options);
			subscribe(HTTP_ON_SERVER_REQUEST, onHttpServerRequestStart);
		},
		afterAllSetup(client) {
			if (DEBUG_BUILD$3 && client.getIntegrationByName("Http")) debug.warn("It seems that you have manually added `httpServerIntegration` while `httpIntegration` is also present. Make sure to remove `httpServerIntegration` when adding `httpIntegration`.");
		}
	};
});
var httpServerIntegration = _httpServerIntegration;
var INTEGRATION_NAME$35 = "Http.ServerSpans";
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
		name: INTEGRATION_NAME$35,
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
						DEBUG_BUILD$3 && debug.log(INTEGRATION_NAME$35, "Skipping span creation for incoming request", request.url);
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
					const span = startInactiveSpan$1({
						name: `${method} ${httpTargetWithoutQueryFragment}`,
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
						DEBUG_BUILD$3 && debug.log("Dropping transaction due to status code", statusCode);
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
			if (client.getIntegrationByName("Http")) debug.warn("It seems that you have manually added `httpServerSpansIntegration` while `httpIntegration` is also present. Make sure to remove `httpIntegration` when adding `httpServerSpansIntegration`.");
			if (!client.getIntegrationByName("Http.Server")) debug.error("It seems that you have manually added `httpServerSpansIntegration` without adding `httpServerIntegration`. This is a requiement for spans to be created - please add the `httpServerIntegration` integration.");
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
	if (isTracingSuppressed$2()) return true;
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
	if (rpcMetadata?.type === RPCType.HTTP && rpcMetadata.route !== void 0) newAttributes[Ts] = rpcMetadata.route;
	return newAttributes;
}
function shouldFilterStatusCode(statusCode, dropForStatusCodes) {
	return dropForStatusCodes.some((code) => {
		if (typeof code === "number") return code === statusCode;
		const [min, max] = code;
		return statusCode >= min && statusCode <= max;
	});
}
var NODE_VERSION = parseSemver(process.versions.node);
var NODE_MAJOR = NODE_VERSION.major;
var NODE_MINOR = NODE_VERSION.minor;
var FULLY_SUPPORTS_HTTP_DIAGNOSTICS_CHANNEL = NODE_VERSION.major === 22 && NODE_VERSION.minor >= 12 || NODE_VERSION.major === 23 && NODE_VERSION.minor >= 2 || NODE_VERSION.major >= 24;
function instrumentHttpOutgoingRequests(instrumentationOptions = {}) {
	const { outgoingRequestApplyCustomAttributes: applyCustomAttributesOnSpan, ...options } = instrumentationOptions;
	const patchOptions = {
		propagateTrace: options.propagateTraceInOutgoingRequests ?? true,
		applyCustomAttributesOnSpan,
		...options,
		spans: options.createSpansForOutgoingRequests !== false && (options.spans ?? true),
		ignoreOutgoingRequests(url, request) {
			return isTracingSuppressed$2() || !!options.ignoreOutgoingRequests?.(url, getRequestOptions(request));
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
var INTEGRATION_NAME$34 = "Http";
Object.assign(instrumentHttpOutgoingRequests, { id: `${INTEGRATION_NAME$34}.sentry` });
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
		name: INTEGRATION_NAME$34,
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
var SENTRY_TRACE_HEADER$1 = "sentry-trace";
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
	_deduplicateArrayHeader(requestHeaders, SENTRY_TRACE_HEADER$1);
	_deduplicateArrayHeader(requestHeaders, SENTRY_BAGGAGE_HEADER$1);
	if (propagateTraceparent) _deduplicateArrayHeader(requestHeaders, W3C_TRACEPARENT_HEADER);
	if (!(_findExistingHeaderIndex(requestHeaders, SENTRY_TRACE_HEADER$1) !== -1)) {
		if (sentryTrace) requestHeaders.push(SENTRY_TRACE_HEADER$1, sentryTrace);
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
		debug.warn(`Failed to convert string request header to array header: ${header}`);
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
		const parsedUrl = parseUrl(getAbsoluteUrl$1(request.origin, request.path));
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
	const ignoredByCallback = safeExecute(() => !!config.ignoreOutgoingRequests?.(url), (e) => e && DEBUG_BUILD$3 && debug.error("caught ignoreOutgoingRequests error: ", e));
	const ignoreForBreadcrumbs = isTracingSuppressed$2() || !!ignoredByCallback;
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
		DEBUG_BUILD$3 && debug.warn("could not determine url.full:", err);
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
	if (userAgentValues) attributes[Qu] = Array.isArray(userAgentValues) ? userAgentValues[userAgentValues.length - 1] : userAgentValues;
	const client = getClient();
	const span = startInactiveSpan$1({
		name: requestMethod === "_OTHER" ? "HTTP" : requestMethod,
		kind: SPAN_KIND.CLIENT,
		attributes,
		onlyIfParent: !client || !hasSpanStreamingEnabled(client)
	});
	safeExecute(() => config.requestHook?.(span, request), (e) => e && DEBUG_BUILD$3 && debug.error("caught requestHook error: ", e));
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
	}), (e) => e && DEBUG_BUILD$3 && debug.error("caught responseHook error: ", e));
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
var _nativeNodeFetchIntegration$1 = ((options = {}) => {
	return {
		name: "NodeFetch",
		setupOnce() {
			instrumentUndici(options);
		}
	};
});
var nativeNodeFetchIntegration$1 = defineIntegration(_nativeNodeFetchIntegration$1);
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
var SENTRY_TRACE_HEADER = "sentry-trace";
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
		if (isTracingSuppressed(context2)) {
			DEBUG_BUILD$2 && debug.log("[Tracing] Not injecting trace data for url because tracing is suppressed.");
			return;
		}
		const activeSpan = import_src.trace.getSpan(context2);
		const url = activeSpan && getCurrentURL(activeSpan);
		const { tracePropagationTargets, propagateTraceparent } = getClient()?.getOptions() || {};
		if (!shouldPropagateTraceForUrl(url, tracePropagationTargets, this._urlMatchesTargetsMap)) {
			DEBUG_BUILD$2 && debug.log("[Tracing] Not injecting trace data for url because it does not match tracePropagationTargets:", url);
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
			setter.set(carrier, SENTRY_TRACE_HEADER, generateSentryTraceHeader(traceId, spanId, sampled));
			if (propagateTraceparent) setter.set(carrier, "traceparent", generateTraceparentHeader(traceId, spanId, sampled));
		}
		super.inject(import_src.propagation.setBaggage(context2, baggage), carrier, setter);
	}
	/**
	* @inheritDoc
	*/
	extract(context2, carrier, getter) {
		const maybeSentryTraceHeader = getter.get(carrier, SENTRY_TRACE_HEADER);
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
			SENTRY_TRACE_HEADER,
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
		return carrier[SENTRY_TRACE_HEADER];
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
		const ctx = missingRequiredParent ? suppressTracing(activeCtx) : activeCtx;
		if (missingRequiredParent) getClient()?.recordDroppedEvent("no_parent_span", "span");
		const spanOptions = getSpanOptions(options);
		if (!hasSpansEnabled()) {
			const suppressedCtx = isTracingSuppressed(ctx) ? ctx : suppressTracing(ctx);
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
function startSpan$1(options, callback) {
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
		let ctx = missingRequiredParent ? suppressTracing(activeCtx) : activeCtx;
		if (missingRequiredParent) getClient()?.recordDroppedEvent("no_parent_span", "span");
		const spanOptions = getSpanOptions(options);
		if (!hasSpansEnabled()) ctx = isTracingSuppressed(ctx) ? ctx : suppressTracing(ctx);
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
	const traceState = makeTraceState({
		dsc: getDynamicSamplingContextFromSpan(getRootSpan$1(parentSpan)),
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
function suppressTracing$1(callback) {
	const ctx = suppressTracing(import_src.context.active());
	return import_src.context.with(ctx, callback);
}
function isTracingSuppressed$1(scope) {
	const ctx = scope ? getContextFromScope(scope) : import_src.context.active();
	return ctx ? isTracingSuppressed(ctx) : false;
}
function setupEventContextTrace(client) {
	client.on("preprocessEvent", (event) => {
		const span = getActiveSpan();
		if (!span || event.type === "transaction") return;
		event.contexts = {
			trace: spanToTraceContext(span),
			...event.contexts
		};
		event.sdkProcessingMetadata = {
			dynamicSamplingContext: getDynamicSamplingContextFromSpan(getRootSpan$1(span)),
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
			if (droppedSpanCount > 0) DEBUG_BUILD$2 && debug.log(`SpanExporter dropped ${droppedSpanCount} spans because they were pending for more than ${this._finishedSpanBucketSize} seconds.`);
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
		DEBUG_BUILD$2 && debug.log(`SpanExporter exported ${sentSpanCount} spans, ${remainingOpenSpanCount} spans are waiting for their parent spans to finish`);
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
	const traceContext = {
		parent_span_id: getParentSpanId(span),
		span_id,
		trace_id,
		data: attributes,
		origin,
		op,
		status: getStatusMessage(mapStatus(span)),
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
			DEBUG_BUILD$2 && debug.log(`[Tracing] Not sampling span because HTTP method is '${method}' for ${spanName}`);
			return wrapSamplingDecision({
				decision: SamplingDecision.NOT_RECORD,
				context,
				spanAttributes,
				sampleRand,
				downstreamTraceSampleRate: 0
			});
		}
		if (!sampled && parentSampled === void 0) {
			DEBUG_BUILD$2 && debug.log("[Tracing] Discarding root span because its trace was not chosen to be sampled.");
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
			DEBUG_BUILD$2 && debug.log(`[Tracing] Inheriting remote parent's sampled decision for ${spanName}: ${parentSampled2}`);
			return parentSampled2;
		}
		const parentSampled = getSamplingDecision(parentContext);
		DEBUG_BUILD$2 && debug.log(`[Tracing] Inheriting parent's sampled decision for ${spanName}: ${parentSampled}`);
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
		if (isTracingSuppressed(parentContext)) return this._createNonRecordingSpan(parentSpan);
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
		startSpan: startSpan$1,
		startSpanManual,
		startInactiveSpan,
		getActiveSpan,
		suppressTracing: suppressTracing$1,
		isTracingSuppressed: isTracingSuppressed$1,
		getTraceData,
		continueTrace,
		startNewTrace,
		withActiveSpan,
		getTracingChannelBinding: options?.getTracingChannelBinding
	});
}
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
var SentryContextManager = SentryAsyncLocalStorageContextManager;
function setupOpenTelemetryLogger() {
	import_src.diag.disable();
	import_src.diag.setLogger({
		error: debug.error,
		warn: debug.warn,
		info: debug.log,
		debug: debug.log,
		verbose: debug.log
	}, import_src.DiagLogLevel.DEBUG);
}
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
var INTEGRATION_NAME$33 = "ChildProcess";
var childProcessIntegration = defineIntegration((options = {}) => {
	return {
		name: INTEGRATION_NAME$33,
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
var readFileAsync = promisify(readFile);
var readDirAsync = promisify(readdir);
var INTEGRATION_NAME$32 = "Context";
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
		name: INTEGRATION_NAME$32,
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
	if (contexts.device?.free_memory) contexts.device.free_memory = os.freemem();
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
	if (deviceContext?.free_memory != null) attrs["device.free_memory"] = os.freemem();
	return attrs;
}
async function getOsContext() {
	const platformId = os.platform();
	switch (platformId) {
		case "darwin": return getDarwinInfo();
		case "linux": return getLinuxInfo();
		default: return {
			name: PLATFORM_NAMES[platformId] || platformId,
			version: os.release()
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
		uptime = os.uptime();
	} catch {}
	if (typeof uptime === "number") device.boot_time = (/* @__PURE__ */ new Date(Date.now() - uptime * 1e3)).toISOString();
	device.arch = os.arch();
	if (deviceOpt === true || deviceOpt.memory) {
		device.memory_size = os.totalmem();
		device.free_memory = os.freemem();
	}
	if (deviceOpt === true || deviceOpt.cpu) {
		const cpuInfo = os.cpus();
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
		kernel_version: os.release(),
		name: "Mac OS X",
		version: `10.${Number(os.release().split(".")[0]) - 4}`
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
		kernel_version: os.release(),
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
var LRU_FILE_CONTENTS_CACHE = new LRUMap(10);
var LRU_FILE_CONTENTS_FS_READ_FAILED = new LRUMap(20);
var DEFAULT_LINES_OF_CONTEXT = 7;
var INTEGRATION_NAME$31 = "ContextLines";
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
			DEBUG_BUILD$3 && debug.error(`Failed to read file: ${path}. Error: ${e}`);
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
		DEBUG_BUILD$3 && debug.log("Failed to read one or more source files and resolve context lines");
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
		DEBUG_BUILD$3 && debug.error("Cannot resolve context for frame with no lineno or file contents");
		return;
	}
	frame.pre_context = [];
	for (let i = makeRangeStart(lineno, contextLines); i < lineno; i++) {
		const line = contents[i];
		if (line === void 0) {
			clearLineContext(frame);
			DEBUG_BUILD$3 && debug.error(`Could not find line ${i} in file ${frame.filename}`);
			return;
		}
		frame.pre_context.push(line);
	}
	if (contents[lineno] === void 0) {
		clearLineContext(frame);
		DEBUG_BUILD$3 && debug.error(`Could not find line ${lineno} in file ${frame.filename}`);
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
		name: INTEGRATION_NAME$31,
		processEvent(event, _hint, client) {
			return addSourceContext(event, options.frameContextLines ?? client?.getDataCollectionOptions().frameContextLines ?? DEFAULT_LINES_OF_CONTEXT);
		}
	};
});
var contextLinesIntegration = defineIntegration(_contextLinesIntegration);
var cachedDebuggerEnabled;
async function isDebuggerEnabled() {
	if (cachedDebuggerEnabled === void 0) try {
		cachedDebuggerEnabled = !!(await import("node:inspector")).url();
	} catch {
		cachedDebuggerEnabled = false;
	}
	return cachedDebuggerEnabled;
}
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
var base64WorkerScript = "LyohIEBzZW50cnkvbm9kZS1jb3JlIDEwLjc0LjAgKGNlNTAwOWEpIHwgaHR0cHM6Ly9naXRodWIuY29tL2dldHNlbnRyeS9zZW50cnktamF2YXNjcmlwdCAqLwppbXBvcnR7U2Vzc2lvbiBhcyBlfWZyb20ibm9kZTppbnNwZWN0b3IvcHJvbWlzZXMiO2ltcG9ydHt3b3JrZXJEYXRhIGFzIHR9ZnJvbSJub2RlOndvcmtlcl90aHJlYWRzIjtjb25zdCBuPWdsb2JhbFRoaXMsaT17fTtjb25zdCBvPSJfX1NFTlRSWV9FUlJPUl9MT0NBTF9WQVJJQUJMRVNfXyI7Y29uc3QgYT10O2Z1bmN0aW9uIHMoLi4uZSl7YS5kZWJ1ZyYmZnVuY3Rpb24oZSl7aWYoISgiY29uc29sZSJpbiBuKSlyZXR1cm4gZSgpO2NvbnN0IHQ9bi5jb25zb2xlLG89e30sYT1PYmplY3Qua2V5cyhpKTthLmZvckVhY2goZT0+e2NvbnN0IG49aVtlXTtvW2VdPXRbZV0sdFtlXT1ufSk7dHJ5e3JldHVybiBlKCl9ZmluYWxseXthLmZvckVhY2goZT0+e3RbZV09b1tlXX0pfX0oKCk9PmNvbnNvbGUubG9nKCJbTG9jYWxWYXJpYWJsZXMgV29ya2VyXSIsLi4uZSkpfWFzeW5jIGZ1bmN0aW9uIGMoZSx0LG4saSl7Y29uc3Qgbz1hd2FpdCBlLnBvc3QoIlJ1bnRpbWUuZ2V0UHJvcGVydGllcyIse29iamVjdElkOnQsb3duUHJvcGVydGllczohMH0pO2lbbl09by5yZXN1bHQuZmlsdGVyKGU9PiJsZW5ndGgiIT09ZS5uYW1lJiYhaXNOYU4ocGFyc2VJbnQoZS5uYW1lLDEwKSkpLnNvcnQoKGUsdCk9PnBhcnNlSW50KGUubmFtZSwxMCktcGFyc2VJbnQodC5uYW1lLDEwKSkubWFwKGU9PmUudmFsdWU/LnZhbHVlKX1hc3luYyBmdW5jdGlvbiByKGUsdCxuLGkpe2NvbnN0IG89YXdhaXQgZS5wb3N0KCJSdW50aW1lLmdldFByb3BlcnRpZXMiLHtvYmplY3RJZDp0LG93blByb3BlcnRpZXM6ITB9KTtpW25dPW8ucmVzdWx0Lm1hcChlPT5bZS5uYW1lLGUudmFsdWU/LnZhbHVlXSkucmVkdWNlKChlLFt0LG5dKT0+KGVbdF09bixlKSx7fSl9ZnVuY3Rpb24gdShlLHQpe2UudmFsdWUmJigidmFsdWUiaW4gZS52YWx1ZT92b2lkIDA9PT1lLnZhbHVlLnZhbHVlfHxudWxsPT09ZS52YWx1ZS52YWx1ZT90W2UubmFtZV09YDwke2UudmFsdWUudmFsdWV9PmA6dFtlLm5hbWVdPWUudmFsdWUudmFsdWU6ImRlc2NyaXB0aW9uImluIGUudmFsdWUmJiJmdW5jdGlvbiIhPT1lLnZhbHVlLnR5cGU/dFtlLm5hbWVdPWA8JHtlLnZhbHVlLmRlc2NyaXB0aW9ufT5gOiJ1bmRlZmluZWQiPT09ZS52YWx1ZS50eXBlJiYodFtlLm5hbWVdPSI8dW5kZWZpbmVkPiIpKX1hc3luYyBmdW5jdGlvbiBsKGUsdCl7Y29uc3Qgbj1hd2FpdCBlLnBvc3QoIlJ1bnRpbWUuZ2V0UHJvcGVydGllcyIse29iamVjdElkOnQsb3duUHJvcGVydGllczohMH0pLGk9e307Zm9yKGNvbnN0IHQgb2Ygbi5yZXN1bHQpaWYodC52YWx1ZT8ub2JqZWN0SWQmJiJBcnJheSI9PT10LnZhbHVlLmNsYXNzTmFtZSl7Y29uc3Qgbj10LnZhbHVlLm9iamVjdElkO2F3YWl0IGMoZSxuLHQubmFtZSxpKX1lbHNlIGlmKHQudmFsdWU/Lm9iamVjdElkJiYiT2JqZWN0Ij09PXQudmFsdWUuY2xhc3NOYW1lKXtjb25zdCBuPXQudmFsdWUub2JqZWN0SWQ7YXdhaXQgcihlLG4sdC5uYW1lLGkpfWVsc2UgdC52YWx1ZSYmdSh0LGkpO3JldHVybiBpfWxldCBmOyhhc3luYyBmdW5jdGlvbigpe2NvbnN0IHQ9bmV3IGU7dC5jb25uZWN0VG9NYWluVGhyZWFkKCkscygiQ29ubmVjdGVkIHRvIG1haW4gdGhyZWFkIik7bGV0IG49ITE7dC5vbigiRGVidWdnZXIucmVzdW1lZCIsKCk9PntuPSExfSksdC5vbigiRGVidWdnZXIucGF1c2VkIixlPT57bj0hMCxhc3luYyBmdW5jdGlvbihlLHtyZWFzb246dCxkYXRhOntvYmplY3RJZDpufSxjYWxsRnJhbWVzOml9KXtpZigiZXhjZXB0aW9uIiE9PXQmJiJwcm9taXNlUmVqZWN0aW9uIiE9PXQpcmV0dXJuO2lmKGY/LigpLG51bGw9PW4pcmV0dXJuO2NvbnN0IGE9W107Zm9yKGxldCB0PTA7dDxpLmxlbmd0aDt0Kyspe2NvbnN0e3Njb3BlQ2hhaW46bixmdW5jdGlvbk5hbWU6byx0aGlzOnN9PWlbdF0sYz1uLmZpbmQoZT0+ImxvY2FsIj09PWUudHlwZSkscj0iZ2xvYmFsIiE9PXMuY2xhc3NOYW1lJiZzLmNsYXNzTmFtZT9gJHtzLmNsYXNzTmFtZX0uJHtvfWA6bztpZih2b2lkIDA9PT1jPy5vYmplY3Qub2JqZWN0SWQpYVt0XT17ZnVuY3Rpb246cn07ZWxzZXtjb25zdCBuPWF3YWl0IGwoZSxjLm9iamVjdC5vYmplY3RJZCk7YVt0XT17ZnVuY3Rpb246cix2YXJzOm59fX1hd2FpdCBlLnBvc3QoIlJ1bnRpbWUuY2FsbEZ1bmN0aW9uT24iLHtmdW5jdGlvbkRlY2xhcmF0aW9uOmBmdW5jdGlvbigpIHsgdGhpcy4ke299ID0gdGhpcy4ke299IHx8ICR7SlNPTi5zdHJpbmdpZnkoYSl9OyB9YCxzaWxlbnQ6ITAsb2JqZWN0SWQ6bn0pLGF3YWl0IGUucG9zdCgiUnVudGltZS5yZWxlYXNlT2JqZWN0Iix7b2JqZWN0SWQ6bn0pfSh0LGUucGFyYW1zKS50aGVuKGFzeW5jKCk9PntuJiZhd2FpdCB0LnBvc3QoIkRlYnVnZ2VyLnJlc3VtZSIpfSxhc3luYyBlPT57biYmYXdhaXQgdC5wb3N0KCJEZWJ1Z2dlci5yZXN1bWUiKX0pfSksYXdhaXQgdC5wb3N0KCJEZWJ1Z2dlci5lbmFibGUiKTtjb25zdCBpPSExIT09YS5jYXB0dXJlQWxsRXhjZXB0aW9ucztpZihhd2FpdCB0LnBvc3QoIkRlYnVnZ2VyLnNldFBhdXNlT25FeGNlcHRpb25zIix7c3RhdGU6aT8iYWxsIjoidW5jYXVnaHQifSksaSl7Y29uc3QgZT1hLm1heEV4Y2VwdGlvbnNQZXJTZWNvbmR8fDUwO2Y9ZnVuY3Rpb24oZSx0LG4pe2xldCBpPTAsbz01LGE9MDtyZXR1cm4gc2V0SW50ZXJ2YWwoKCk9PnswPT09YT9pPmUmJihvKj0yLG4obyksbz44NjQwMCYmKG89ODY0MDApLGE9byk6KGEtPTEsMD09PWEmJnQoKSksaT0wfSwxZTMpLnVucmVmKCksKCk9PntpKz0xfX0oZSxhc3luYygpPT57cygiUmF0ZS1saW1pdCBsaWZ0ZWQuIiksYXdhaXQgdC5wb3N0KCJEZWJ1Z2dlci5zZXRQYXVzZU9uRXhjZXB0aW9ucyIse3N0YXRlOiJhbGwifSl9LGFzeW5jIGU9PntzKGBSYXRlLWxpbWl0IGV4Y2VlZGVkLiBEaXNhYmxpbmcgY2FwdHVyaW5nIG9mIGNhdWdodCBleGNlcHRpb25zIGZvciAke2V9IHNlY29uZHMuYCksYXdhaXQgdC5wb3N0KCJEZWJ1Z2dlci5zZXRQYXVzZU9uRXhjZXB0aW9ucyIse3N0YXRlOiJ1bmNhdWdodCJ9KX0pfX0pKCkuY2F0Y2goZT0+e3MoIkZhaWxlZCB0byBzdGFydCBkZWJ1Z2dlciIsZSl9KSxzZXRJbnRlcnZhbCgoKT0+e30sMWU0KTs=";
function log(...args) {
	debug.log("[LocalVariables]", ...args);
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
		worker.once("error", (err) => {
			log("Worker error", err);
		});
		worker.once("exit", (code) => {
			log("Worker exit", code);
		});
		worker.unref();
	}
	return {
		name: "LocalVariablesAsync",
		async setup(client) {
			if (!client.getOptions().includeLocalVariables) return;
			if (await isDebuggerEnabled()) {
				debug.warn("Local variables capture has been disabled because the debugger was already enabled");
				return;
			}
			const options = {
				...integrationOptions,
				debug: debug.isEnabled()
			};
			startInspector().then(() => {
				try {
					startWorker(options);
				} catch (e) {
					debug.error("Failed to start worker", e);
				}
			}, (e) => {
				debug.error("Failed to start inspector", e);
			});
		},
		processEvent(event, hint) {
			return addLocalVariablesToEvent(event, hint);
		}
	};
}));
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
var INTEGRATION_NAME$30 = "LocalVariables";
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
			debug.log("The `LocalVariables` integration is only supported on Node >= v18.");
			return;
		}
		if (await isDebuggerEnabled()) {
			debug.warn("Local variables capture has been disabled because the debugger was already enabled");
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
				debug.log("Local variables rate-limit lifted.");
				session.setPauseOnExceptions(true);
			}, (seconds) => {
				debug.log(`Local variables rate-limit exceeded. Disabling capturing of caught exceptions for ${seconds} seconds.`);
				session.setPauseOnExceptions(false);
			});
			shouldProcessEvent = true;
		} catch (error) {
			debug.log("The `LocalVariables` integration failed to start.", error);
		}
	}
	return {
		name: INTEGRATION_NAME$30,
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
var localVariablesIntegration = (options = {}) => {
	return NODE_VERSION.major < 19 ? localVariablesSyncIntegration(options) : localVariablesAsyncIntegration(options);
};
var moduleCache;
var INTEGRATION_NAME$29 = "Modules";
function getServerModules() {
	if (typeof __SENTRY_SERVER_MODULES__ !== "undefined") return __SENTRY_SERVER_MODULES__;
	return GLOBAL_OBJ.__SENTRY_SERVER_MODULES__ ?? {};
}
var _modulesIntegration = (() => {
	return {
		name: INTEGRATION_NAME$29,
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
		return JSON.parse(readFileSync(filePath, "utf8"));
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
var DEFAULT_SHUTDOWN_TIMEOUT = 2e3;
function logAndExitProcess(error) {
	consoleSandbox(() => {
		console.error(error);
	});
	const client = getClient();
	if (client === void 0) {
		DEBUG_BUILD$3 && debug.warn("No NodeClient was defined, we are exiting the process now.");
		global.process.exit(1);
		return;
	}
	const options = client.getOptions();
	const timeout = options?.shutdownTimeout && options.shutdownTimeout > 0 ? options.shutdownTimeout : DEFAULT_SHUTDOWN_TIMEOUT;
	client.close(timeout).then((result) => {
		if (!result) DEBUG_BUILD$3 && debug.warn("We reached the timeout for emptying the request buffer, still exiting now!");
		global.process.exit(1);
	}, (error2) => {
		DEBUG_BUILD$3 && debug.error(error2);
	});
}
var INTEGRATION_NAME$28 = "OnUncaughtException";
var onUncaughtExceptionIntegration = defineIntegration((options = {}) => {
	const optionsWithDefaults = {
		exitEvenIfOtherHandlersAreRegistered: false,
		...options
	};
	return {
		name: INTEGRATION_NAME$28,
		setup(client) {
			if (!isMainThread) return;
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
				DEBUG_BUILD$3 && debug.warn("uncaught exception after calling fatal error shutdown callback - this is bad! forcing shutdown");
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
var INTEGRATION_NAME$27 = "OnUnhandledRejection";
var DEFAULT_IGNORES = [{ name: "AI_NoOutputGeneratedError" }, { name: "AbortError" }];
var _onUnhandledRejectionIntegration = ((options = {}) => {
	const opts = {
		mode: options.mode ?? "warn",
		ignore: [...DEFAULT_IGNORES, ...options.ignore ?? []]
	};
	return {
		name: INTEGRATION_NAME$27,
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
var INTEGRATION_NAME$26 = "ProcessSession";
var processSessionIntegration = defineIntegration(() => {
	return {
		name: INTEGRATION_NAME$26,
		setupOnce() {
			startSession();
			process.on("beforeExit", () => {
				if (getIsolationScope().getSession()?.status === "ok") endSession();
			});
		}
	};
});
var INTEGRATION_NAME$25 = "Spotlight";
var _spotlightIntegration = ((options = {}) => {
	const _options = { sidecarUrl: options.sidecarUrl || "http://localhost:8969/stream" };
	return {
		name: INTEGRATION_NAME$25,
		setup(client) {
			try {
				debug.warn("[Spotlight] It seems you're not in dev mode. Do you really want to have Spotlight enabled?");
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
			debug.warn("[Spotlight] Disabled Sentry -> Spotlight integration due to too many failed requests");
			return;
		}
		const serializedEnvelope = serializeEnvelope(envelope);
		suppressTracing$2(() => {
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
				debug.warn("[Spotlight] Failed to send envelope to Spotlight Sidecar");
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
		debug.warn(`[Spotlight] Invalid sidecar URL: ${url}`);
		return;
	}
}
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
var INTEGRATION_NAME$24 = "NodeSystemError";
function isSystemError(error) {
	if (!(error instanceof Error)) return false;
	if (!("errno" in error) || typeof error.errno !== "number") return false;
	if (typeof util.getSystemErrorMap !== "function") return false;
	return util.getSystemErrorMap().has(error.errno);
}
var systemErrorIntegration = defineIntegration((options = {}) => {
	return {
		name: INTEGRATION_NAME$24,
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
function debugLog$1(...args) {
	debug.log("[https-proxy-agent:parse-proxy-response]", ...args);
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
function debugLog(...args) {
	debug.log("[https-proxy-agent]", ...args);
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
	return createTransport(options, createRequestExecutor(options, options.httpModule ?? nativeHttpModule, agent));
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
			suppressTracing$2(() => {
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
function getSpotlightConfig(optionsSpotlight) {
	if (optionsSpotlight === false) return false;
	if (typeof optionsSpotlight === "string") return optionsSpotlight;
	const envBool = envToBool(process.env.SENTRY_SPOTLIGHT, { strict: true });
	const envUrl = envBool === null && process.env.SENTRY_SPOTLIGHT ? process.env.SENTRY_SPOTLIGHT : void 0;
	return optionsSpotlight === true ? envUrl ?? true : envBool ?? envUrl;
}
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
function getSentryRelease(fallback) {
	if (process.env.SENTRY_RELEASE) return process.env.SENTRY_RELEASE;
	if (GLOBAL_OBJ.SENTRY_RELEASE?.id) return GLOBAL_OBJ.SENTRY_RELEASE.id;
	const possibleReleaseNameOfGitProvider = process.env["GITHUB_SHA"] || process.env["CI_MERGE_REQUEST_SOURCE_BRANCH_SHA"] || process.env["CI_BUILD_REF"] || process.env["CI_COMMIT_SHA"] || process.env["BITBUCKET_COMMIT"];
	const possibleReleaseNameOfCiProvidersWithSpecificEnvVar = process.env["APPVEYOR_PULL_REQUEST_HEAD_COMMIT"] || process.env["APPVEYOR_REPO_COMMIT"] || process.env["CODEBUILD_RESOLVED_SOURCE_VERSION"] || process.env["AWS_COMMIT_ID"] || process.env["BUILD_SOURCEVERSION"] || process.env["GIT_CLONE_COMMIT_HASH"] || process.env["BUDDY_EXECUTION_REVISION"] || process.env["BUILDKITE_COMMIT"] || process.env["CIRCLE_SHA1"] || process.env["CIRRUS_CHANGE_IN_REPO"] || process.env["CF_REVISION"] || process.env["CM_COMMIT"] || process.env["CF_PAGES_COMMIT_SHA"] || process.env["DRONE_COMMIT_SHA"] || process.env["FC_GIT_COMMIT_SHA"] || process.env["HEROKU_TEST_RUN_COMMIT_VERSION"] || process.env["HEROKU_BUILD_COMMIT"] || process.env["HEROKU_SLUG_COMMIT"] || process.env["RAILWAY_GIT_COMMIT_SHA"] || process.env["RENDER_GIT_COMMIT"] || process.env["SEMAPHORE_GIT_SHA"] || process.env["TRAVIS_PULL_REQUEST_SHA"] || process.env["VERCEL_GIT_COMMIT_SHA"] || process.env["VERCEL_GITHUB_COMMIT_SHA"] || process.env["VERCEL_GITLAB_COMMIT_SHA"] || process.env["VERCEL_BITBUCKET_COMMIT_SHA"] || process.env["ZEIT_GITHUB_COMMIT_SHA"] || process.env["ZEIT_GITLAB_COMMIT_SHA"] || process.env["ZEIT_BITBUCKET_COMMIT_SHA"];
	const possibleReleaseNameOfCiProvidersWithGenericEnvVar = process.env["CI_COMMIT_ID"] || process.env["SOURCE_COMMIT"] || process.env["SOURCE_VERSION"] || process.env["GIT_COMMIT"] || process.env["COMMIT_REF"] || process.env["BUILD_VCS_NUMBER"] || process.env["CI_COMMIT_SHA"];
	return possibleReleaseNameOfGitProvider || possibleReleaseNameOfCiProvidersWithSpecificEnvVar || possibleReleaseNameOfCiProvidersWithGenericEnvVar || fallback;
}
var defaultStackParser = createStackParser(nodeStackLineParser(createGetModuleFromFilename()));
var DEFAULT_CLIENT_REPORT_FLUSH_INTERVAL_MS = 6e4;
var NodeClient = class extends ServerRuntimeClient {
	constructor(options) {
		const serverName = options.includeServerName === false ? void 0 : options.serverName || global.process.env.SENTRY_NAME || os.hostname();
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
		debug.log(`Initializing Sentry: process: ${process.pid}, thread: ${isMainThread ? "main" : `worker-${threadId}`}.`);
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
				DEBUG_BUILD$3 && debug.log("Flushing client reports based on interval.");
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
var require_register = /* @__PURE__ */ __commonJSMin(((exports) => {
	var importHooks = [];
	var binders = /* @__PURE__ */ new WeakMap();
	var legacySetters;
	var legacyGetters;
	var legacyProxyHandler;
	var specifiers = /* @__PURE__ */ new Map();
	var toHook = [];
	/**
	* @param {object} source The module namespace.
	* @param {string | symbol} name The export name.
	*/
	function readExport(source, name) {
		if (name === "module.exports" && !Object.hasOwn(source, name)) return source.default;
		return source[name];
	}
	/**
	* @param {object} target The proxy target.
	* @param {string | symbol} name The export name.
	* @param {unknown} value The replacement value.
	*/
	function setExport(target, name, value) {
		return binders.get(target).write(name, value);
	}
	/**
	* @param {object} target The proxy target.
	* @param {string | symbol} name The export name.
	* @param {PropertyDescriptor} descriptor The replacement descriptor.
	*/
	function defineExport(target, name, descriptor) {
		if (!("value" in descriptor)) throw new Error("Getters/setters are not supported for exports property descriptors.");
		return setExport(target, name, descriptor.value);
	}
	var proxyHandler = {
		defineProperty: defineExport,
		set: setExport
	};
	/**
	* @param {object} target The proxy target.
	* @param {string | symbol} name The export name.
	* @param {unknown} value The replacement value.
	*/
	function setLegacyExport(target, name, value) {
		const setter = legacySetters.get(target)?.[name];
		return typeof setter === "function" ? setter(value) : true;
	}
	/**
	* @param {object} target The proxy target.
	* @param {string | symbol} name The export name.
	*/
	function getLegacyExport(target, name) {
		if (name === Symbol.toStringTag) return "Module";
		const getter = legacyGetters.get(target)[name];
		if (typeof getter === "function") return getter();
	}
	/**
	* @param {object} target The proxy target.
	* @param {string | symbol} name The export name.
	* @param {PropertyDescriptor} descriptor The replacement descriptor.
	*/
	function defineLegacyExport(target, name, descriptor) {
		if (!("value" in descriptor)) throw new Error("Getters/setters are not supported for exports property descriptors.");
		return setLegacyExport(target, name, descriptor.value);
	}
	/**
	* @param {string} name The wrapped module URL.
	* @param {object} namespace The wrapper's module namespace.
	* @param {object} set The wrapper's export setters.
	* @param {object} get The wrapper's export getters.
	* @param {string} specifier The original import specifier.
	*/
	function registerLegacy(name, namespace, set, get, specifier) {
		legacySetters ??= /* @__PURE__ */ new WeakMap();
		legacyGetters ??= /* @__PURE__ */ new WeakMap();
		legacyProxyHandler ??= {
			defineProperty: defineLegacyExport,
			get: getLegacyExport,
			set: setLegacyExport
		};
		specifiers.set(name, specifier);
		legacySetters.set(namespace, set);
		legacyGetters.set(namespace, get);
		const proxy = new Proxy(namespace, legacyProxyHandler);
		importHooks.forEach((hook) => hook(name, proxy, specifier));
		toHook.push([
			name,
			proxy,
			specifier
		]);
	}
	/**
	* @param {string} name The wrapped module URL.
	* @param {ModuleBinder | object} binder The wrapper's binding state or legacy namespace.
	* @param {string | object} specifier The original import specifier or legacy setters.
	* @param {object} [get] The legacy export getters.
	* @param {string} [legacySpecifier] The legacy original import specifier.
	*/
	function register(name, binder, specifier, get, legacySpecifier) {
		if (arguments.length === 5) {
			registerLegacy(name, binder, specifier, get, legacySpecifier);
			return;
		}
		const { namespace } = binder;
		specifiers.set(name, specifier);
		binders.set(namespace, binder);
		const proxy = new Proxy(namespace, proxyHandler);
		importHooks.forEach((hook) => hook(name, proxy, specifier));
		toHook.push([
			name,
			proxy,
			specifier
		]);
	}
	var RETRY_DELAYS = [
		0,
		10,
		50
	];
	/**
	* Per-wrapped-module state a generated wrapper builds once to expose its exports
	* through iitm's proxy. Each wrapper supplies one indexed writer for all local
	* bindings; the constructor seeds them from the real module, and `flush`
	* resolves any export that was undefined (circular import) once it becomes available.
	*
	* This is the boilerplate the wrapper used to inline in full per module. Hoisting
	* it here compiles the retry and proxy bookkeeping once instead of once per
	* wrapped module.
	*/
	var ModuleBinder = class {
		namespace = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
		#set = Object.create(null);
		#write;
		#overridden;
		#pending;
		/**
		* @param {object} source The wrapped module namespace.
		* @param {string[]} [keys] Export names in wrapper-binding order.
		* @param {(index: number, value: unknown) => void} [write] Assigns a wrapper binding by index.
		* @param {object[]} [sources] Alternate namespaces for star-collision bindings.
		*/
		constructor(source, keys, write, sources) {
			this.#write = write;
			if (keys !== void 0) for (let index = 0; index < keys.length; index++) this.#bind(keys[index], index, sources?.[index] ?? source);
		}
		/**
		* Seeds `key` from `source` and installs its proxy accessors. A value that is
		* undefined or throws `ReferenceError` (temporal dead zone during a circular
		* import) is deferred to `flush`; any other throw propagates.
		*
		* @param {string} key The export name.
		* @param {number} index The wrapper binding index.
		* @param {object} source The binding's source namespace.
		* @returns {void}
		*/
		#bind(key, index, source) {
			let value;
			try {
				value = readExport(source, key);
				this.#write(index, value);
				this.namespace[key] = value;
			} catch (error) {
				if (!(error instanceof ReferenceError)) throw error;
			}
			if (value === void 0) (this.#pending ??= []).push(this.#makeUpdater(key, index, source));
			this.#set[key] = index;
		}
		/**
		* @param {string | symbol} key The export name.
		* @param {unknown} value The replacement value.
		* @returns {boolean}
		*/
		write(key, value) {
			const index = this.#set[key];
			if (index !== void 0) {
				this.#write(index, value);
				if (this.#pending !== void 0) {
					this.#overridden ??= Object.create(null);
					this.#overridden[key] = true;
				}
				this.namespace[key] = value;
			}
			return true;
		}
		/**
		* @param {string} key The export name to update.
		* @param {number} index The wrapper binding index.
		* @param {object} source The real module namespace.
		* @returns {() => boolean} Updater returning whether the value is now settled.
		*/
		#makeUpdater(key, index, source) {
			return () => {
				if (this.#overridden?.[key] === true) return true;
				try {
					const value = readExport(source, key);
					if (value !== void 0) {
						this.#write(index, value);
						this.namespace[key] = value;
						return true;
					}
					return false;
				} catch (error) {
					if (error instanceof ReferenceError) return false;
					/* c8 ignore next */
					throw error;
				}
			};
		}
		#flushOnce() {
			const pending = this.#pending;
			if (pending === void 0) return;
			let next;
			for (const updater of pending) if (updater() !== true) (next ??= []).push(updater);
			this.#pending = next;
		}
		/**
		* Resolves exports deferred by `bind` (undefined or TDZ at wrapper-eval time).
		* Retries on a microtask, then at `RETRY_DELAYS`, giving up afterwards to avoid
		* unbounded retries. A no-op when nothing was deferred.
		*
		* @returns {void}
		*/
		flush() {
			if (this.#pending === void 0) return;
			queueMicrotask(() => {
				this.#flushOnce();
				this.#scheduleRetry(0);
			});
		}
		/**
		* @param {number} attempt Index into `RETRY_DELAYS` for the next retry.
		* @returns {void}
		*/
		#scheduleRetry(attempt) {
			if (this.#pending === void 0) return;
			if (attempt >= RETRY_DELAYS.length) {
				this.#pending = void 0;
				return;
			}
			const timer = setTimeout(() => {
				this.#flushOnce();
				this.#scheduleRetry(attempt + 1);
			}, RETRY_DELAYS[attempt]);
			if (timer && typeof timer.unref === "function") timer.unref();
		}
	};
	exports.register = register;
	exports.ModuleBinder = ModuleBinder;
	exports.importHooks = importHooks;
	exports.specifiers = specifiers;
	exports.toHook = toHook;
}));
var require_import_in_the_middle = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var path = __require("path");
	var moduleDetailsFromPath = __require("module-details-from-path");
	var { fileURLToPath } = __require("url");
	var { MessageChannel } = __require("worker_threads");
	var { isBuiltin } = __require("module");
	if (!isBuiltin) isBuiltin = () => true;
	var { importHooks, specifiers, toHook } = require_register();
	/**
	* Checks turbopack specifiers separately (for Next.js 16+).
	*
	* If turbopack is used, specifiers will have an additional hash appended to the end.
	* Something like "ai" might become "ai-5e7181a616786b24". This only happens in Next.js 16+.
	* Just checking if the baseDir ends with this new specifier won't match, as the baseDir still has the plain package.
	*
	* This logic isolates a new check for checking the actual name in the case turbopack is being used.
	*
	* @param specifier {string}
	* @param baseDir {string}
	*/
	function isTurbopackSpecifier(specifier, baseDir) {
		if (!(process.env.TURBOPACK ?? process.argv.includes("--turbo"))) return false;
		const specifierWithoutTurbopackHash = specifier.slice(0, specifier.lastIndexOf("-"));
		return baseDir.endsWith(specifierWithoutTurbopackHash);
	}
	function addHook(hook) {
		importHooks.push(hook);
		toHook.forEach(([name, namespace, specifier]) => hook(name, namespace, specifier));
	}
	function removeHook(hook) {
		const index = importHooks.indexOf(hook);
		if (index > -1) importHooks.splice(index, 1);
	}
	function callHookFn(hookFn, namespace, name, baseDir) {
		const newDefault = hookFn(namespace, name, baseDir);
		if (newDefault && newDefault !== namespace) {
			if ("default" in namespace) namespace.default = newDefault;
		}
	}
	var sendModulesToLoader;
	/**
	* EXPERIMENTAL
	* This feature is experimental and may change in minor versions.
	* **NOTE** This feature is incompatible with the {internals: true} Hook option.
	*
	* Creates a message channel with a port that can be used to add hooks to the
	* list of exclusively included modules.
	*
	* This can be used to only wrap modules that are Hook'ed, however modules need
	* to be hooked before they are imported.
	*
	* ```ts
	* import { register } from 'module'
	* import { Hook, createAddHookMessageChannel } from 'import-in-the-middle'
	*
	* const { registerOptions, waitForAllMessagesAcknowledged } = createAddHookMessageChannel()
	*
	* register('import-in-the-middle/hook.mjs', import.meta.url, registerOptions)
	*
	* Hook(['fs'], (exported, name, baseDir) => {
	*   // Instrument the fs module
	* })
	*
	* // Ensure that the loader has acknowledged all the modules
	* // before we allow execution to continue
	* await waitForAllMessagesAcknowledged()
	* ```
	*/
	function createAddHookMessageChannel() {
		const { port1, port2 } = new MessageChannel();
		let pendingAckCount = 0;
		let resolveFn;
		sendModulesToLoader = (modules) => {
			pendingAckCount++;
			port1.postMessage(modules);
		};
		port1.on("message", () => {
			pendingAckCount--;
			if (resolveFn && pendingAckCount <= 0) resolveFn();
		}).unref();
		function waitForAllMessagesAcknowledged() {
			const timer = setInterval(() => {}, 1e3);
			const promise = new Promise((resolve) => {
				resolveFn = resolve;
			}).then(() => {
				clearInterval(timer);
			});
			if (pendingAckCount === 0) resolveFn();
			return promise;
		}
		const addHookMessagePort = port2;
		return {
			registerOptions: {
				data: {
					addHookMessagePort,
					include: []
				},
				transferList: [addHookMessagePort]
			},
			addHookMessagePort,
			waitForAllMessagesAcknowledged
		};
	}
	function Hook(modules, options, hookFn) {
		if (this instanceof Hook === false) return new Hook(modules, options, hookFn);
		if (typeof modules === "function") {
			hookFn = modules;
			modules = null;
			options = null;
		} else if (typeof options === "function") {
			hookFn = options;
			options = null;
		}
		const internals = options ? options.internals === true : false;
		if (sendModulesToLoader && Array.isArray(modules)) sendModulesToLoader(modules);
		this._iitmHook = (name, namespace, specifier) => {
			const loadUrl = name;
			const isNodeUrl = loadUrl.startsWith("node:");
			let filePath, baseDir;
			if (isNodeUrl) {
				const unprefixed = name.slice(5);
				if (isBuiltin(unprefixed)) name = unprefixed;
			} else if (loadUrl.startsWith("file://")) {
				const stackTraceLimit = Error.stackTraceLimit;
				Error.stackTraceLimit = 0;
				try {
					filePath = fileURLToPath(name);
					name = filePath;
				} catch (e) {}
				Error.stackTraceLimit = stackTraceLimit;
				if (filePath) {
					const details = moduleDetailsFromPath(filePath);
					if (details) {
						name = details.name;
						baseDir = details.basedir;
					}
				}
			}
			if (modules) {
				for (const matchArg of modules) if (filePath && matchArg === filePath) callHookFn(hookFn, namespace, filePath, void 0);
				else if (matchArg === name) {
					if (!baseDir) callHookFn(hookFn, namespace, name, baseDir);
					else if (baseDir.endsWith(specifiers.get(loadUrl)) || isTurbopackSpecifier(specifiers.get(loadUrl), baseDir)) callHookFn(hookFn, namespace, name, baseDir);
					else if (internals) {
						const internalPath = name + path.sep + path.relative(baseDir, filePath);
						callHookFn(hookFn, namespace, internalPath, baseDir);
					}
				} else if (matchArg === specifier) callHookFn(hookFn, namespace, specifier, baseDir);
			} else callHookFn(hookFn, namespace, name, baseDir);
		};
		addHook(this._iitmHook);
	}
	Hook.prototype.unhook = function() {
		removeHook(this._iitmHook);
	};
	module.exports = Hook;
	module.exports.Hook = Hook;
	module.exports.addHook = addHook;
	module.exports.removeHook = removeHook;
	module.exports.createAddHookMessageChannel = createAddHookMessageChannel;
}));
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
var import_import_in_the_middle = require_import_in_the_middle();
function initializeEsmLoader() {
	if (!supportsEsmLoaderHooks()) return;
	if (!GLOBAL_OBJ._sentryEsmLoaderHookRegistered) {
		GLOBAL_OBJ._sentryEsmLoaderHookRegistered = true;
		try {
			const { addHookMessagePort } = (0, import_import_in_the_middle.createAddHookMessageChannel)();
			moduleModule.register("import-in-the-middle/hook.mjs", import.meta.url, {
				data: {
					addHookMessagePort,
					include: []
				},
				transferList: [addHookMessagePort]
			});
		} catch (error) {
			debug.warn("Failed to register 'import-in-the-middle' hook", error);
		}
	}
}
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
function init$2(options = {}) {
	return _init$1(options, getDefaultIntegrations$1);
}
function _init$1(_options = {}, getDefaultIntegrationsImpl) {
	const options = getClientOptions(_options, getDefaultIntegrationsImpl);
	if (options.debug === true) {
		if (DEBUG_BUILD$3) debug.enable();
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
	debug.log(`SDK initialized from ESM`);
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
	for (const k of required) if (!setup.includes(k)) debug.error(`You have to set up the ${k}. Without this, the OpenTelemetry & Sentry integration will not work properly.`);
	if (!hasSentryTracerProvider && !setup.includes("SentrySampler")) debug.warn("You have to set up the SentrySampler. Without this, the OpenTelemetry & Sentry integration may still work, but sample rates set for the Sentry SDK will not be respected. If you use a custom sampler, make sure to use `wrapSamplingDecision`.");
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
	const resolvedIntegrations = getIntegrationsToSetup({
		defaultIntegrations: options.defaultIntegrations ?? getDefaultIntegrationsImpl(mergedOptions),
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
function addOriginToSpan(span, origin) {
	span.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN, origin);
}
var INTEGRATION_NAME$23 = "Http";
Object.assign(instrumentHttpOutgoingRequests, { id: `${INTEGRATION_NAME$23}.sentry` });
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
		name: INTEGRATION_NAME$23,
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
var DEBUG_BUILD$1 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
function setHttpServerSpanRouteAttribute(route) {
	const activeSpan = getActiveSpan$1();
	if (!activeSpan) return;
	const rootSpan = getRootSpan$1(activeSpan);
	if (!rootSpan) return;
	if (spanToJSON(rootSpan).data["sentry.op"] !== "http.server") return;
	rootSpan.setAttribute("http.route", route);
}
var INTEGRATION_NAME$22 = "Express";
var SUPPORTED_VERSIONS$4 = [">=4.0.0 <6"];
var instrumentExpress = generateInstrumentOnce(INTEGRATION_NAME$22, (options) => new ExpressInstrumentation(options));
var ExpressInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super("sentry-express", SDK_VERSION, config);
	}
	init() {
		return new InstrumentationNodeModuleDefinition("express", SUPPORTED_VERSIONS$4, (express) => {
			try {
				patchExpressModule(express, () => ({
					...this.getConfig(),
					onRouteResolved(route) {
						if (route) setHttpServerSpanRouteAttribute(route);
					}
				}));
			} catch (e) {
				DEBUG_BUILD$1 && debug.error("Failed to patch express module:", e);
			}
			return express;
		}, (express) => express);
	}
};
var _expressIntegration = ((options) => {
	return {
		name: INTEGRATION_NAME$22,
		setupOnce() {
			instrumentExpress(options);
		},
		getShouldHandleError() {
			return options?.shouldHandleError;
		}
	};
});
var expressIntegration = defineIntegration(_expressIntegration);
var AttributeNames$6 = /* @__PURE__ */ ((AttributeNames2) => {
	AttributeNames2["FASTIFY_NAME"] = "fastify.name";
	AttributeNames2["FASTIFY_TYPE"] = "fastify.type";
	AttributeNames2["HOOK_NAME"] = "hook.name";
	AttributeNames2["PLUGIN_NAME"] = "plugin.name";
	return AttributeNames2;
})(AttributeNames$6 || {});
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
var spanRequestSymbol = /* @__PURE__ */ Symbol("opentelemetry.instrumentation.fastify.request_active_span");
function startSpan(reply, tracer, spanName, spanAttributes = {}) {
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
function endSpan$4(reply, err) {
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
		if (isPromise$1(result)) result.then((res) => onFinish(void 0, res), (err) => onFinish(err));
	} catch (e) {
		error = e;
	} finally {
		if (!isPromise$1(result)) {
			onFinish(error, result);
			if (error && true) throw error;
		}
		return result;
	}
}
function isPromise$1(val) {
	return typeof val === "object" && val && typeof Object.getOwnPropertyDescriptor(val, "then")?.value === "function" || false;
}
var PACKAGE_NAME$18 = "@sentry/instrumentation-fastify-v3";
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
		super(PACKAGE_NAME$18, SDK_VERSION, config);
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
			if (routeName) setHttpServerSpanRouteAttribute(routeName);
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
			const span = startSpan(reply, instrumentation.tracer, spanName, {
				[AttributeNames$6.FASTIFY_TYPE]: FastifyTypes.MIDDLEWARE,
				[AttributeNames$6.PLUGIN_NAME]: pluginName,
				[AttributeNames$6.HOOK_NAME]: hookName
			});
			const origDone = syncFunctionWithDone && args[args.length - 1];
			if (origDone) args[args.length - 1] = function(...doneArgs) {
				endSpan$4(reply);
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
					if (!syncFunctionWithDone) endSpan$4(reply);
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
					endSpan$4(this, err);
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
				[AttributeNames$6.PLUGIN_NAME]: this.pluginName,
				[AttributeNames$6.FASTIFY_TYPE]: FastifyTypes.REQUEST_HANDLER,
				[Ts]: anyRequest.routeOptions ? anyRequest.routeOptions.url : request.routerPath
			};
			if (handlerName) spanAttributes[AttributeNames$6.FASTIFY_NAME] = handlerName;
			const span = startSpan(reply, instrumentation.tracer, spanName, spanAttributes);
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
var b = "execute_tool";
var k = "invoke_agent";
var i_ = "graphql";
var DEBUG_BUILD = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
var NOOP = () => {};
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
		start: NOOP,
		asyncStart: NOOP,
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
		DEBUG_BUILD && debug.log("[TracingChannel] Could not access async context binding.");
		return {
			channel,
			unbind: NOOP
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
var GRAPHQL_DC_CHANNEL_PARSE = "graphql:parse";
var GRAPHQL_DC_CHANNEL_VALIDATE = "graphql:validate";
var GRAPHQL_DC_CHANNEL_EXECUTE = "graphql:execute";
var GRAPHQL_DC_CHANNEL_SUBSCRIBE = "graphql:subscribe";
var GRAPHQL_DC_CHANNEL_RESOLVE = "graphql:resolve";
var ORIGIN$13 = "auto.graphql.diagnostic_channel";
var SPAN_NAME_PARSE = "graphql.parse";
var SPAN_NAME_VALIDATE = "graphql.validate";
var SPAN_NAME_EXECUTE = "graphql.execute";
var SPAN_NAME_SUBSCRIBE = "graphql.subscribe";
var SPAN_NAME_RESOLVE = "graphql.resolve";
var GRAPHQL_FIELD_NAME = "graphql.field.name";
var GRAPHQL_FIELD_PATH = "graphql.field.path";
var GRAPHQL_FIELD_TYPE = "graphql.field.type";
var GRAPHQL_PARENT_NAME = "graphql.parent.name";
function subscribeGraphqlDiagnosticChannels(tracingChannel, options = {}) {
	const ignoreResolveSpans = options.ignoreResolveSpans !== false;
	const ignoreTrivialResolveSpans = options.ignoreTrivialResolveSpans !== false;
	const useOperationNameForRootSpan = options.useOperationNameForRootSpan !== false;
	setupParseChannel(tracingChannel);
	setupValidateChannel(tracingChannel);
	setupOperationChannel(tracingChannel, GRAPHQL_DC_CHANNEL_EXECUTE, SPAN_NAME_EXECUTE, useOperationNameForRootSpan);
	setupOperationChannel(tracingChannel, GRAPHQL_DC_CHANNEL_SUBSCRIBE, SPAN_NAME_SUBSCRIBE, useOperationNameForRootSpan);
	if (!ignoreResolveSpans) setupResolveChannel(tracingChannel, ignoreTrivialResolveSpans);
}
function setupParseChannel(tracingChannel) {
	bindTracingChannelToSpan(tracingChannel(GRAPHQL_DC_CHANNEL_PARSE), () => startInactiveSpan$1({
		name: SPAN_NAME_PARSE,
		attributes: {
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$13,
			[SEMANTIC_ATTRIBUTE_SENTRY_OP]: i_
		}
	}));
}
function setupValidateChannel(tracingChannel) {
	bindTracingChannelToSpan(tracingChannel(GRAPHQL_DC_CHANNEL_VALIDATE), (data) => {
		return startInactiveSpan$1({
			name: SPAN_NAME_VALIDATE,
			attributes: {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$13,
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
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$13,
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
			name: `${SPAN_NAME_RESOLVE} ${data.fieldPath}`,
			attributes: {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$13,
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: i_,
				[GRAPHQL_FIELD_NAME]: data.fieldName,
				[GRAPHQL_FIELD_PATH]: data.fieldPath,
				[GRAPHQL_FIELD_TYPE]: data.fieldType,
				[GRAPHQL_PARENT_NAME]: data.parentType
			}
		});
	});
}
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
var MONGOOSE_DC_CHANNEL_QUERY = "mongoose:query";
var MONGOOSE_DC_CHANNEL_AGGREGATE = "mongoose:aggregate";
var MONGOOSE_DC_CHANNEL_MODEL_SAVE = "mongoose:model:save";
var MONGOOSE_DC_CHANNEL_MODEL_INSERT_MANY = "mongoose:model:insertMany";
var MONGOOSE_DC_CHANNEL_MODEL_BULK_WRITE = "mongoose:model:bulkWrite";
var MONGOOSE_DC_CHANNEL_CURSOR_NEXT = "mongoose:cursor:next";
var ORIGIN$12 = "auto.db.mongoose.diagnostic_channel";
var DB_SYSTEM_NAME_VALUE_MONGODB = "mongodb";
var MAX_REDACTION_DEPTH = 10;
var subscribed = false;
function subscribeMongooseDiagnosticChannels(tracingChannel) {
	if (subscribed) return;
	subscribed = true;
	try {
		setupChannel(tracingChannel, MONGOOSE_DC_CHANNEL_QUERY);
		setupChannel(tracingChannel, MONGOOSE_DC_CHANNEL_AGGREGATE);
		setupChannel(tracingChannel, MONGOOSE_DC_CHANNEL_MODEL_SAVE);
		setupChannel(tracingChannel, MONGOOSE_DC_CHANNEL_MODEL_INSERT_MANY);
		setupChannel(tracingChannel, MONGOOSE_DC_CHANNEL_MODEL_BULK_WRITE);
		setupChannel(tracingChannel, MONGOOSE_DC_CHANNEL_CURSOR_NEXT);
	} catch {
		DEBUG_BUILD && debug.log("Mongoose node:diagnostics_channel subscription failed.");
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
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$12,
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
var ATTR_DB_SYSTEM$1 = "db.system";
var ATTR_DB_NAME$1 = "db.name";
var ATTR_DB_OPERATION$1 = "db.operation";
var ATTR_DB_STATEMENT = "db.statement";
var ATTR_DB_MONGODB_COLLECTION$1 = "db.mongodb.collection";
var ATTR_DB_CONNECTION_STRING$4 = "db.connection_string";
var ATTR_NET_PEER_NAME$1 = "net.peer.name";
var ATTR_NET_PEER_PORT$1 = "net.peer.port";
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
		[ATTR_DB_SYSTEM$1]: DB_SYSTEM_VALUE_MONGODB,
		[ATTR_DB_NAME$1]: dbName,
		[ATTR_DB_MONGODB_COLLECTION$1]: dbCollection,
		[ATTR_DB_OPERATION$1]: operation,
		[ATTR_DB_CONNECTION_STRING$4]: `mongodb://${host}:${port}/${dbName}`
	};
	if (host && port) {
		attributes[ATTR_NET_PEER_NAME$1] = host;
		const portNumber = parseInt(port, 10);
		if (!isNaN(portNumber)) attributes[ATTR_NET_PEER_PORT$1] = portNumber;
	}
	if (commandObj) try {
		attributes[ATTR_DB_STATEMENT] = serializeDbStatement(commandObj);
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
var MYSQL2_DC_CHANNEL_QUERY = "mysql2:query";
var MYSQL2_DC_CHANNEL_EXECUTE = "mysql2:execute";
var MYSQL2_DC_CHANNEL_CONNECT = "mysql2:connect";
var MYSQL2_DC_CHANNEL_POOL_CONNECT = "mysql2:pool:connect";
var ORIGIN$11 = "auto.db.mysql2.diagnostic_channel";
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
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$11,
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
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$11,
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "db",
				[jt]: DB_SYSTEM_NAME_VALUE_MYSQL,
				[Ct]: data.database || void 0,
				[au]: data.serverAddress,
				[ou]: data.serverPort
			}
		});
	}, { requiresParentSpan: true });
}
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
var majorVersion = "7";
var GLOBAL_INSTRUMENTATION_KEY = "PRISMA_INSTRUMENTATION";
var GLOBAL_VERSIONED_INSTRUMENTATION_KEY = `V${majorVersion}_PRISMA_INSTRUMENTATION`;
var globalThisWithPrismaInstrumentation = globalThis;
function setGlobalTracingHelper(helper) {
	const globalValue = { helper };
	globalThisWithPrismaInstrumentation[GLOBAL_VERSIONED_INSTRUMENTATION_KEY] = globalValue;
	globalThisWithPrismaInstrumentation[GLOBAL_INSTRUMENTATION_KEY] = globalValue;
}
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
			DEBUG_BUILD && debug.log(`[Prisma] Dropping ${overflow} unresolved v5 engine span(s) whose parent was never registered.`);
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
			return endSpan$3(span, () => callback(span, parentSpan));
		}
		return startSpanManual$1(spanOptions, (span) => {
			registerPrismaSpan(span.spanContext().spanId, span);
			return endSpan$3(span, () => callback(span, parentSpan));
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
function endSpan$3(span, run) {
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
var INTEGRATION_NAME$21 = "Prisma";
function instrumentPrisma(options) {
	setGlobalTracingHelper(new ActiveTracingHelper({ ignoreSpanTypes: options?.instrumentationConfig?.ignoreSpanTypes ?? [] }));
}
var _prismaIntegration = ((options) => {
	return {
		name: INTEGRATION_NAME$21,
		setupOnce() {
			instrumentPrisma(options);
		}
	};
});
var prismaIntegration = defineIntegration(_prismaIntegration);
var REDIS_DC_CHANNEL_COMMAND = "node-redis:command";
var REDIS_DC_CHANNEL_BATCH = "node-redis:batch";
var REDIS_DC_CHANNEL_CONNECT = "node-redis:connect";
var IOREDIS_DC_CHANNEL_COMMAND = "ioredis:command";
var IOREDIS_DC_CHANNEL_CONNECT = "ioredis:connect";
var ORIGIN$10 = "auto.db.redis.diagnostic_channel";
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
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$10,
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "db.redis",
				[jt]: DB_SYSTEM_NAME_VALUE_REDIS,
				[Gt]: statement,
				...data.serverAddress != null ? { [au]: data.serverAddress } : {},
				...data.serverPort != null ? { [ou]: data.serverPort } : {}
			}
		});
	}, { beforeSpanEnd(span, data) {
		if ("error" in data) return;
		runResponseHook$1(responseHook, span, data.command, getCommandArgs(data), data.result);
	} });
}
function setupBatchChannel(tracingChannel, channelName, getOperationName) {
	bindTracingChannelToSpan(tracingChannel(channelName), (data) => {
		return startInactiveSpan$1({
			name: getOperationName(data),
			attributes: {
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$10,
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
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$10,
				[SEMANTIC_ATTRIBUTE_SENTRY_OP]: "db.redis.connect",
				[jt]: DB_SYSTEM_NAME_VALUE_REDIS,
				...data.serverAddress != null ? { [au]: data.serverAddress } : {},
				...data.serverPort != null ? { [ou]: data.serverPort } : {}
			}
		});
	});
}
function runResponseHook$1(hook, span, command, args, result) {
	if (!hook) return;
	try {
		hook(span, command, args, result);
	} catch {}
}
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
var AI_SDK_TELEMETRY_TRACING_CHANNEL = "ai:telemetry";
var ORIGIN$9 = "auto.vercelai.channel";
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
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$9,
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
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$9,
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
	if ("gen_ai.conversation.id" in providerAttributes && spanToJSON(span).data["gen_ai.conversation.id"]) delete providerAttributes[GEN_AI_CONVERSATION_ID_ATTRIBUTE$1];
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
var PACKAGE_NAME$17 = "@sentry/instrumentation-fastify";
var SUPPORTED_VERSIONS$3 = ">=3.21.0 <6";
var ORIGIN$8 = "auto.http.otel.fastify";
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
pluginSymbols[/* @__PURE__ */ Symbol.for("fastify.display-name")] = PACKAGE_NAME$17;
pluginSymbols[/* @__PURE__ */ Symbol.for("plugin-meta")] = {
	fastify: SUPPORTED_VERSIONS$3,
	name: PACKAGE_NAME$17
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
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$8,
		[ATTRIBUTE_FASTIFY_ROOT]: PACKAGE_NAME$17,
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
		return startSpan$2({
			name: op ? stripFastifyPrefix(spanAttributes[ATTRIBUTE_HOOK_NAME]) : `${hookName} - ${handlerName}`,
			op,
			attributes: {
				...spanAttributes,
				[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$8
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
var _isInstrumented = false;
var instrumentFastify = Object.assign(function instrumentFastify2() {
	if (_isInstrumented) return;
	_isInstrumented = true;
	diagnosticsChannel.subscribe("fastify.initialization", (message) => {
		const fastifyInstance = message.fastify;
		fastifyInstance?.register(fastifyOtelPlugin).after((err) => {
			if (err) DEBUG_BUILD && debug.error("Failed to setup Fastify instrumentation", err);
			else if (fastifyInstance) instrumentOnRequest(fastifyInstance);
		});
	});
}, { id: "Fastify.v5" });
var INTEGRATION_NAME$20 = "Fastify";
function defaultShouldHandleError(_error, _request, reply) {
	const statusCode = reply.statusCode;
	return statusCode >= 500 || statusCode <= 299;
}
function getFastifyIntegration() {
	return getClient()?.getIntegrationByName(INTEGRATION_NAME$20);
}
function subscribeToFastifyErrorChannel() {
	diagnosticsChannel.subscribe("tracing:fastify.request.handler:error", (message) => {
		const { error, request, reply } = message;
		handleFastifyError.call(handleFastifyError, error, request, reply, "diagnostics-channel");
	});
}
function handleFastifyError(error, request, reply, handlerOrigin) {
	const shouldHandleError = getFastifyIntegration()?.getShouldHandleError() || defaultShouldHandleError;
	if (handlerOrigin === "diagnostics-channel") this.diagnosticsChannelExists = true;
	if (this.diagnosticsChannelExists && handlerOrigin === "onError-hook") {
		DEBUG_BUILD && debug.warn("Fastify error handler was already registered via diagnostics channel.", "You can safely remove `setupFastifyErrorHandler` call and set `shouldHandleError` on the integration options.");
		return;
	}
	if (shouldHandleError(error, request, reply)) captureException(error, { mechanism: {
		handled: false,
		type: "auto.function.fastify"
	} });
}
var _fastifyIntegration$1 = (({ shouldHandleError } = {}) => {
	let _shouldHandleError;
	return {
		name: INTEGRATION_NAME$20,
		setupOnce() {
			_shouldHandleError = shouldHandleError || defaultShouldHandleError;
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
var ATTR_DB_MONGODB_COLLECTION = "db.mongodb.collection";
var ATTR_DB_NAME = "db.name";
var ATTR_DB_USER = "db.user";
var ATTR_NET_PEER_NAME = "net.peer.name";
var ATTR_NET_PEER_PORT = "net.peer.port";
var ATTR_DB_OPERATION = "db.operation";
var ATTR_DB_SYSTEM = "db.system";
function startMongooseLegacySpan({ collection, modelName, operation, origin, parentSpan }) {
	const attributes = {
		[ATTR_DB_MONGODB_COLLECTION]: collection?.name,
		[ATTR_DB_NAME]: collection?.conn?.name,
		[ATTR_DB_USER]: collection?.conn?.user,
		[ATTR_NET_PEER_NAME]: collection?.conn?.host,
		[ATTR_NET_PEER_PORT]: collection?.conn?.port,
		[ATTR_DB_OPERATION]: operation,
		[ATTR_DB_SYSTEM]: "mongoose",
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
var instrumentFastifyV3 = generateInstrumentOnce(`Fastify.v3`, () => new FastifyInstrumentationV3());
var _fastifyIntegration = ((options) => {
	return extendIntegration(fastifyIntegration$1(options), { setupOnce() {
		instrumentFastifyV3();
	} });
});
var fastifyIntegration = defineIntegration((options = {}) => _fastifyIntegration(options));
var InstrumentationNodeModuleFile = class {
	constructor(name, supportedVersions, patch, unpatch) {
		this.name = normalize(name);
		this.supportedVersions = supportedVersions;
		this.patch = patch;
		this.unpatch = unpatch;
	}
};
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
var AttributeNames$5 = /* @__PURE__ */ ((AttributeNames2) => {
	AttributeNames2["SOURCE"] = "graphql.source";
	AttributeNames2["FIELD_NAME"] = "graphql.field.name";
	AttributeNames2["FIELD_PATH"] = "graphql.field.path";
	AttributeNames2["FIELD_TYPE"] = "graphql.field.type";
	AttributeNames2["PARENT_NAME"] = "graphql.parent.name";
	AttributeNames2["OPERATION_TYPE"] = "graphql.operation.type";
	AttributeNames2["OPERATION_NAME"] = "graphql.operation.name";
	return AttributeNames2;
})(AttributeNames$5 || {});
var OTEL_PATCHED_SYMBOL = /* @__PURE__ */ Symbol.for("opentelemetry.patched");
var OTEL_GRAPHQL_DATA_SYMBOL = /* @__PURE__ */ Symbol.for("opentelemetry.graphql_data");
var OPERATION_NOT_SUPPORTED = "Operation$operationName$not supported";
var OPERATION_VALUES = Object.values(AllowedOperationTypes);
var isPromise = (value) => {
	return typeof value?.then === "function";
};
function addSpanSource(span, loc, start, end) {
	if (getClient()?.getDataCollectionOptions().graphQL.document === true) {
		const source = getSourceFromLocation(loc, start, end);
		span.setAttribute(AttributeNames$5.SOURCE, source);
	}
}
function createFieldIfNotExists(contextValue, info, path) {
	let field = getField(contextValue, path);
	if (field) return {
		field,
		spanAdded: false
	};
	field = { span: createResolverSpan(contextValue, info, path, getParentFieldSpan(contextValue, path)) };
	addField(contextValue, path, field);
	return {
		field,
		spanAdded: true
	};
}
function createResolverSpan(contextValue, info, path, parentSpan) {
	const attributes = {
		[AttributeNames$5.FIELD_NAME]: info.fieldName,
		[AttributeNames$5.FIELD_PATH]: path.join("."),
		[AttributeNames$5.FIELD_TYPE]: info.returnType.toString(),
		[AttributeNames$5.PARENT_NAME]: info.parentType.name
	};
	const span = startInactiveSpan$1({
		name: `${SpanNames$1.RESOLVE} ${attributes[AttributeNames$5.FIELD_PATH]}`,
		attributes,
		parentSpan
	});
	const document = contextValue[OTEL_GRAPHQL_DATA_SYMBOL].source;
	const fieldNode = info.fieldNodes.find((fieldNode2) => fieldNode2.kind === "Field");
	if (fieldNode) addSpanSource(span, document.loc, fieldNode.loc?.start, fieldNode.loc?.end);
	return span;
}
function endSpan$2(span, error) {
	if (error) span.setStatus({
		code: 2,
		message: error.message
	});
	span.end();
}
function getOperation(document, operationName) {
	if (!document || !Array.isArray(document.definitions)) return;
	if (operationName) return document.definitions.filter((definition) => OPERATION_VALUES.indexOf(definition?.operation) !== -1).find((definition) => operationName === definition?.name?.value);
	else return document.definitions.find((definition) => OPERATION_VALUES.indexOf(definition?.operation) !== -1);
}
function addField(contextValue, path, field) {
	return contextValue[OTEL_GRAPHQL_DATA_SYMBOL].fields[path.join(".")] = field;
}
function getField(contextValue, path) {
	return contextValue[OTEL_GRAPHQL_DATA_SYMBOL].fields[path.join(".")];
}
function getParentFieldSpan(contextValue, path) {
	for (let i = path.length - 1; i > 0; i--) {
		const field = getField(contextValue, path.slice(0, i));
		if (field) return field.span;
	}
	return getRootSpan(contextValue);
}
function getRootSpan(contextValue) {
	return contextValue[OTEL_GRAPHQL_DATA_SYMBOL].span;
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
function wrapFields(type, getConfig) {
	if (!type || type[OTEL_PATCHED_SYMBOL]) return;
	const fields = type.getFields();
	type[OTEL_PATCHED_SYMBOL] = true;
	Object.keys(fields).forEach((key) => {
		const field = fields[key];
		if (!field) return;
		if (field.resolve) field.resolve = wrapFieldResolver(getConfig, field.resolve);
		if (field.type) {
			const unwrappedTypes = unwrapType(field.type);
			for (const unwrappedType of unwrappedTypes) wrapFields(unwrappedType, getConfig);
		}
	});
}
function unwrapType(type) {
	if ("ofType" in type) return unwrapType(type.ofType);
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
function wrapFieldResolver(getConfig, fieldResolver, isDefaultResolver = false) {
	if (wrappedFieldResolver[OTEL_PATCHED_SYMBOL] || typeof fieldResolver !== "function") return fieldResolver;
	function wrappedFieldResolver(source, args, contextValue, info) {
		if (!fieldResolver) return;
		if (getConfig().ignoreTrivialResolveSpans && isDefaultResolver && (isObjectLike(source) || typeof source === "function")) {
			if (typeof source[info.fieldName] !== "function") return fieldResolver.call(this, source, args, contextValue, info);
		}
		if (!contextValue[OTEL_GRAPHQL_DATA_SYMBOL]) return fieldResolver.call(this, source, args, contextValue, info);
		const { field, spanAdded } = createFieldIfNotExists(contextValue, info, pathToArray(info?.path));
		const span = field.span;
		const shouldEndSpan = spanAdded;
		return withActiveSpan$1(span, () => {
			try {
				const res = fieldResolver.call(this, source, args, contextValue, info);
				if (isPromise(res)) return res.then((r) => {
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
var PACKAGE_NAME$16 = "@sentry/instrumentation-graphql";
var ORIGIN$7 = "auto.graphql.otel.graphql";
var DEFAULT_CONFIG = { ignoreResolveSpans: false };
var supportedVersions$7 = [">=14.0.0 <17"];
var GraphQLInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$16, SDK_VERSION, {
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
				const operation = getOperation(processedArgs.document, processedArgs.operationName);
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
			endSpan$2(span, err);
			return;
		}
		if (isPromise(result)) result.then((resultData) => {
			this._updateSpanFromResult(span, resultData);
			endSpan$2(span);
		}, (error) => {
			endSpan$2(span, error);
		});
		else {
			this._updateSpanFromResult(span, result);
			endSpan$2(span);
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
		const operationType = attributes[AttributeNames$5.OPERATION_TYPE];
		const operationName = attributes[AttributeNames$5.OPERATION_NAME];
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
					if (!getOperation(result)) span.updateName(SpanNames$1.SCHEMA_PARSE);
					else if (result.loc) addSpanSource(span, result.loc);
				}
				endSpan$2(span, err);
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
				endSpan$2(span, err);
			});
		});
	}
	_createExecuteSpan(operation, processedArgs) {
		const span = startInactiveSpan$1({
			name: SpanNames$1.EXECUTE,
			attributes: { [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$7 }
		});
		if (operation) {
			const { operation: operationType, name: nameNode } = operation;
			span.setAttribute(AttributeNames$5.OPERATION_TYPE, operationType);
			const operationName = nameNode?.value;
			if (operationName) {
				span.setAttribute(AttributeNames$5.OPERATION_NAME, operationName);
				span.updateName(`${operationType} ${operationName}`);
			} else span.updateName(operationType);
		} else {
			let operationName = " ";
			if (processedArgs.operationName) operationName = ` "${processedArgs.operationName}" `;
			operationName = OPERATION_NOT_SUPPORTED.replace("$operationName$", operationName);
			span.setAttribute(AttributeNames$5.OPERATION_NAME, operationName);
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
		fieldResolver = wrapFieldResolver(() => this.getConfig(), fieldResolver ?? defaultFieldResolved, fieldResolver == null);
		if (schema) {
			wrapFields(schema.getQueryType(), () => this.getConfig());
			wrapFields(schema.getMutationType(), () => this.getConfig());
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
var INTEGRATION_NAME$18 = "Graphql";
var instrumentGraphql = generateInstrumentOnce(INTEGRATION_NAME$18, GraphQLInstrumentation, (_options) => getOptionsWithDefaults(_options));
var _graphqlIntegration = ((options = {}) => {
	return extendIntegration(graphqlIntegration$1(getOptionsWithDefaults(options)), {
		name: INTEGRATION_NAME$18,
		setupOnce() {
			instrumentGraphql(getOptionsWithDefaults(options));
		}
	});
});
var graphqlIntegration = defineIntegration(_graphqlIntegration);
function getOptionsWithDefaults(options) {
	return {
		ignoreResolveSpans: true,
		ignoreTrivialResolveSpans: true,
		useOperationNameForRootSpan: true,
		...options
	};
}
var ATTR_MESSAGING_DESTINATION_PARTITION_ID = "messaging.destination.partition.id";
var ATTR_MESSAGING_KAFKA_MESSAGE_KEY = "messaging.kafka.message.key";
var ATTR_MESSAGING_KAFKA_MESSAGE_TOMBSTONE = "messaging.kafka.message.tombstone";
var ATTR_MESSAGING_KAFKA_OFFSET = "messaging.kafka.offset";
var MESSAGING_OPERATION_TYPE_VALUE_PROCESS = "process";
var MESSAGING_OPERATION_TYPE_VALUE_RECEIVE = "receive";
var MESSAGING_OPERATION_TYPE_VALUE_SEND = "send";
var MESSAGING_SYSTEM_VALUE_KAFKA = "kafka";
var ERROR_TYPE_VALUE_OTHER = "_OTHER";
var PRODUCER_ORIGIN = "auto.kafkajs.otel.producer";
var CONSUMER_ORIGIN$1 = "auto.kafkajs.otel.consumer";
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
		traceFlags: sampled ? import_src.TraceFlags.SAMPLED : import_src.TraceFlags.NONE
	} }];
}
function startConsumerSpan({ topic, message, operationType, links, attributes }) {
	const operationName = operationType === "receive" ? "poll" : operationType;
	return startInactiveSpan$1({
		name: `${operationName} ${topic}`,
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
function endSpansOnPromise(spans, sendPromise) {
	return Promise.resolve(sendPromise).catch((reason) => {
		let errorMessage;
		let errorType = ERROR_TYPE_VALUE_OTHER;
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
var PACKAGE_NAME$15 = "@sentry/instrumentation-kafkajs";
var KafkaJsInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$15, SDK_VERSION, config);
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
				return continueTrace$1({
					sentryTrace: getHeaderAsString$1(payload.message.headers, "sentry-trace"),
					baggage: getHeaderAsString$1(payload.message.headers, "baggage")
				}, () => {
					const span = startConsumerSpan({
						topic: payload.topic,
						message: payload.message,
						operationType: MESSAGING_OPERATION_TYPE_VALUE_PROCESS,
						attributes: { [ATTR_MESSAGING_DESTINATION_PARTITION_ID]: String(payload.partition) }
					});
					const eachMessagePromise = withActiveSpan$1(span, () => {
						return original.apply(this, args);
					});
					return endSpansOnPromise([span], eachMessagePromise);
				});
			};
		};
	}
	_getConsumerEachBatchPatch() {
		return (original) => {
			return function eachBatch(...args) {
				const payload = args[0];
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
					return endSpansOnPromise(spans, original.apply(this, args));
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
						return endSpansOnPromise([transactionSpan], originCommitPromise);
					};
					const originalAbort = transaction2.abort;
					transaction2.abort = function abort(...args2) {
						const originAbortPromise = originalAbort.apply(this, args2);
						return endSpansOnPromise([transactionSpan], originAbortPromise);
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
						spans.push(startProducerSpan(topicMessage.topic, message));
					});
				});
				return endSpansOnPromise(spans, original.apply(this, args));
			};
		};
	}
	_getSendPatch() {
		return (original) => {
			return function send(...args) {
				const record = args[0];
				return endSpansOnPromise(record.messages.map((message) => {
					return startProducerSpan(record.topic, message);
				}), original.apply(this, args));
			};
		};
	}
};
var INTEGRATION_NAME$17 = "Kafka";
var instrumentKafka = generateInstrumentOnce(INTEGRATION_NAME$17, () => new KafkaJsInstrumentation());
var _kafkaIntegration = (() => {
	return {
		name: INTEGRATION_NAME$17,
		setupOnce() {
			instrumentKafka();
		}
	};
});
var kafkaIntegration = defineIntegration(_kafkaIntegration);
var PACKAGE_NAME$14 = "@sentry/instrumentation-lru-memoizer";
var LruMemoizerInstrumentation = class extends InstrumentationBase {
	constructor() {
		super(PACKAGE_NAME$14, SDK_VERSION, {});
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
var INTEGRATION_NAME$16 = "LruMemoizer";
var instrumentLruMemoizer = generateInstrumentOnce(INTEGRATION_NAME$16, () => new LruMemoizerInstrumentation());
var _lruMemoizerIntegration = (() => {
	return {
		name: INTEGRATION_NAME$16,
		setupOnce() {
			instrumentLruMemoizer();
		}
	};
});
var lruMemoizerIntegration = defineIntegration(_lruMemoizerIntegration);
var ORIGIN$6 = "auto.db.otel.mongo";
function getV4SpanAttributes(connectionCtx, ns, command, operation) {
	return getV4SpanAttributes$1(connectionCtx, ns, command, operation, ORIGIN$6);
}
function getV3SpanAttributes(ns, topology, command, operation) {
	return getV3SpanAttributes$1(ns, topology, command, operation, ORIGIN$6);
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
var PACKAGE_NAME$13 = "@sentry/instrumentation-mongodb";
var MongoDBInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$13, SDK_VERSION, config);
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
var INTEGRATION_NAME$15 = "Mongo";
var instrumentMongo = generateInstrumentOnce(INTEGRATION_NAME$15, () => new MongoDBInstrumentation());
var _mongoIntegration = (() => {
	return {
		name: INTEGRATION_NAME$15,
		setupOnce() {
			instrumentMongo();
		}
	};
});
var mongoIntegration = defineIntegration(_mongoIntegration);
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
var PACKAGE_NAME$12 = "@sentry/instrumentation-mongoose";
var ORIGIN$5 = "auto.db.otel.mongoose";
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
		super(PACKAGE_NAME$12, SDK_VERSION, config);
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
					origin: ORIGIN$5,
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
					origin: ORIGIN$5,
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
					origin: ORIGIN$5
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
					origin: ORIGIN$5
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
					origin: ORIGIN$5
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
var INTEGRATION_NAME$14 = "Mongoose";
var instrumentMongoose = generateInstrumentOnce(INTEGRATION_NAME$14, () => new MongooseInstrumentation());
var _mongooseIntegration = (() => {
	return extendIntegration(mongooseIntegration$1(), {
		name: INTEGRATION_NAME$14,
		setupOnce() {
			instrumentMongoose();
		}
	});
});
var mongooseIntegration = defineIntegration(_mongooseIntegration);
var ATTR_DB_CONNECTION_STRING$3 = "db.connection_string";
var DB_SYSTEM_VALUE_MYSQL$1 = "mysql";
function getConfig$1(config) {
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
function getDbQueryText(query) {
	if (typeof query === "string") return query;
	else return query.sql;
}
function getSpanName$2(query) {
	const rawQuery = typeof query === "object" ? query.sql : query;
	const firstSpace = rawQuery?.indexOf(" ");
	if (typeof firstSpace === "number" && firstSpace !== -1) return rawQuery?.substring(0, firstSpace);
	return rawQuery;
}
var PACKAGE_NAME$11 = "@sentry/instrumentation-mysql";
var ORIGIN$4 = "auto.db.otel.mysql";
var MySQLInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$11, SDK_VERSION, config);
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
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$4,
					[Kt]: DB_SYSTEM_VALUE_MYSQL$1,
					[ATTR_DB_CONNECTION_STRING$3]: getJDBCString$1(host, port, database),
					[Nt]: database,
					[Qt]: user,
					[Ht]: getDbQueryText(query),
					[Il]: host
				};
				if (!isNaN(portNumber)) attributes[Ol] = portNumber;
				const span = startInactiveSpan$1({
					name: getSpanName$2(query),
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
var INTEGRATION_NAME$13 = "Mysql";
var instrumentMysql = generateInstrumentOnce(INTEGRATION_NAME$13, () => new MySQLInstrumentation({}));
var _mysqlIntegration = (() => {
	return {
		name: INTEGRATION_NAME$13,
		setupOnce() {
			instrumentMysql();
		}
	};
});
var mysqlIntegration = defineIntegration(_mysqlIntegration);
var ATTR_DB_CONNECTION_STRING$2 = "db.connection_string";
var DB_SYSTEM_VALUE_MYSQL = "mysql";
function getConnectionAttributes(config) {
	const { host, port, database, user } = getConfig(config);
	const attrs = {
		[ATTR_DB_CONNECTION_STRING$2]: getJDBCString(host, port, database),
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
function getJDBCString(host, port, database) {
	let jdbcString = `jdbc:mysql://${host || "localhost"}`;
	if (typeof port === "number") jdbcString += `:${port}`;
	if (typeof database === "string") jdbcString += `/${database}`;
	return jdbcString;
}
function getQueryText(query, format, values) {
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
function getSpanName$1(query) {
	const rawQuery = typeof query === "object" ? query.sql : query;
	const firstSpace = rawQuery?.indexOf(" ");
	if (typeof firstSpace === "number" && firstSpace !== -1) return rawQuery?.substring(0, firstSpace);
	return rawQuery;
}
var once$1 = (fn) => {
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
var PACKAGE_NAME$10 = "@sentry/instrumentation-mysql2";
var ORIGIN$3 = "auto.db.otel.mysql2";
var supportedVersions$6 = [">=1.4.2 <3.20.0"];
var MySQL2Instrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$10, SDK_VERSION, config);
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
					...getConnectionAttributes(this.config),
					[Kt]: DB_SYSTEM_VALUE_MYSQL,
					[Ht]: getQueryText(query, format, values),
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$3
				};
				const span = startInactiveSpan$1({
					name: getSpanName$1(query),
					kind: SPAN_KIND.CLIENT,
					attributes
				});
				const endSpan = once$1((err) => {
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
var INTEGRATION_NAME$12 = "Mysql2";
var instrumentMysql2 = generateInstrumentOnce(INTEGRATION_NAME$12, () => new MySQL2Instrumentation());
var _mysql2Integration = (() => {
	return extendIntegration(mysql2Integration$1(), {
		name: INTEGRATION_NAME$12,
		setupOnce() {
			instrumentMysql2();
		}
	});
});
var mysql2Integration = defineIntegration(_mysql2Integration);
function isDiagnosticsChannelInjectionEnabled() {
	return false;
}
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
var ATTR_DB_CONNECTION_STRING$1 = "db.connection_string";
var DB_SYSTEM_VALUE_REDIS = "redis";
var PACKAGE_NAME$9 = "@sentry/instrumentation-ioredis";
var ORIGIN$2 = "auto.db.otel.redis";
var SUPPORTED_VERSIONS$2 = [">=2.0.0 <5.11.0"];
function endSpan$1(span, err) {
	if (err) span.setStatus({
		code: 2,
		message: err.message
	});
	span.end();
}
var IORedisInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$9, SDK_VERSION, config);
	}
	init() {
		return [new InstrumentationNodeModuleDefinition("ioredis", SUPPORTED_VERSIONS$2, (module) => {
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
					[Kt]: DB_SYSTEM_VALUE_REDIS,
					[Ht]: defaultDbStatementSerializer(cmd.name, cmd.args),
					[ATTR_DB_CONNECTION_STRING$1]: `redis://${host}:${port}`,
					[Il]: host,
					[Ol]: port,
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$2
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
						endSpan$1(span, null);
						origResolve(response);
					};
					const origReject = cmd.reject;
					cmd.reject = function(err) {
						endSpan$1(span, err);
						origReject(err);
					};
					return result;
				} catch (error) {
					endSpan$1(span, error);
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
					[Kt]: DB_SYSTEM_VALUE_REDIS,
					[Ht]: "connect",
					[ATTR_DB_CONNECTION_STRING$1]: `redis://${host}:${port}`,
					[Il]: host,
					[Ol]: port,
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$2
				};
				const span = startInactiveSpan$1({
					name: "connect",
					kind: SPAN_KIND.CLIENT,
					attributes
				});
				try {
					const result = original.apply(this, args);
					if (result instanceof Promise) return result.then((value) => {
						endSpan$1(span, null);
						return value;
					}, (error) => {
						endSpan$1(span, error);
						return Promise.reject(error);
					});
					endSpan$1(span, null);
					return result;
				} catch (error) {
					endSpan$1(span, error);
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
var PACKAGE_NAME$8 = "@sentry/instrumentation-redis";
var ORIGIN$1 = "auto.db.otel.redis";
var OTEL_OPEN_SPANS = /* @__PURE__ */ Symbol("opentelemetry.instrumentation.redis.open_spans");
var MULTI_COMMAND_OPTIONS = /* @__PURE__ */ Symbol("opentelemetry.instrumentation.redis.multi_command_options");
function endSpan(span, err) {
	if (err) span.setStatus({
		code: 2,
		message: err.message
	});
	span.end();
}
function runResponseHook(responseHook, span, commandName, commandArgs, response) {
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
		DEBUG_BUILD$1 && debug.error("failed to sanitize redis connection url", err);
	}
}
function getClientAttributes(options) {
	return {
		[Kt]: DB_SYSTEM_VALUE_REDIS,
		[Il]: options?.socket?.host,
		[Ol]: options?.socket?.port,
		[ATTR_DB_CONNECTION_STRING$1]: removeCredentialsFromDBConnectionStringAttribute(options?.url),
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$1
	};
}
var _RedisInstrumentationV2_V3 = class _RedisInstrumentationV2_V3 extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$8, SDK_VERSION, config);
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
					[Kt]: DB_SYSTEM_VALUE_REDIS,
					[Ht]: defaultDbStatementSerializer(cmd.command, cmd.args),
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN$1
				};
				if (this.connection_options) {
					attributes[Il] = this.connection_options.host;
					attributes[Ol] = this.connection_options.port;
				}
				if (this.address) attributes[ATTR_DB_CONNECTION_STRING$1] = `redis://${this.address}`;
				const span = startInactiveSpan$1({
					name: `${_RedisInstrumentationV2_V3.COMPONENT}-${cmd.command}`,
					kind: SPAN_KIND.CLIENT,
					attributes
				});
				const originalCallback = arguments[0].callback;
				if (originalCallback) {
					const parentSpan = getActiveSpan$1();
					arguments[0].callback = function callback(err, reply) {
						runResponseHook(instrumentation.getConfig().responseHook, span, cmd.command, cmd.args, reply);
						endSpan(span, err);
						return withActiveSpan$1(parentSpan ?? null, () => originalCallback.apply(this, arguments));
					};
				}
				try {
					return original.apply(this, arguments);
				} catch (rethrow) {
					endSpan(span, rethrow);
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
		super(PACKAGE_NAME$8, SDK_VERSION, config);
	}
	init() {
		return [this._getInstrumentationNodeModuleDefinition("@redis/client"), this._getInstrumentationNodeModuleDefinition("@node-redis/client")];
	}
	_getInstrumentationNodeModuleDefinition(basePackageName) {
		const commanderModuleFile = new InstrumentationNodeModuleFile(`${basePackageName}/dist/lib/commander.js`, ["^1.0.0"], (moduleExports, moduleVersion) => {
			const transformCommandArguments = moduleExports.transformCommandArguments;
			if (!transformCommandArguments) {
				DEBUG_BUILD$1 && debug.error("internal instrumentation error, missing transformCommandArguments function");
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
					DEBUG_BUILD$1 && debug.error("non-promise result when patching exec/execAsPipeline");
					return execRes;
				}
				return execRes.then((redisRes) => {
					const openSpans = this[OTEL_OPEN_SPANS];
					plugin._endSpansWithRedisReplies(openSpans, redisRes);
					return redisRes;
				}).catch((err) => {
					const openSpans = this[OTEL_OPEN_SPANS];
					if (!openSpans) DEBUG_BUILD$1 && debug.error("cannot find open spans to end for multi/pipeline");
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
					endSpan(span, error);
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
			DEBUG_BUILD$1 && debug.error("cannot find open spans to end for redis multi/pipeline");
			return;
		}
		if (replies.length !== openSpans.length) {
			DEBUG_BUILD$1 && debug.error("number of multi command spans does not match response from redis");
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
		if (!error) runResponseHook(this.getConfig().responseHook, span, commandName, commandArgs, response);
		endSpan(span, error);
	}
};
_RedisInstrumentationV4_V5.COMPONENT = "redis";
var RedisInstrumentationV4_V5 = _RedisInstrumentationV4_V5;
var RedisInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$8, SDK_VERSION, config);
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
var INTEGRATION_NAME$11 = "Redis";
var instrumentIORedis = generateInstrumentOnce(`${INTEGRATION_NAME$11}.IORedis`, () => {
	return new IORedisInstrumentation({ responseHook: cacheResponseHook });
});
var instrumentRedisModule = generateInstrumentOnce(`${INTEGRATION_NAME$11}.Redis`, () => {
	return new RedisInstrumentation({ responseHook: cacheResponseHook });
});
var instrumentRedis = Object.assign(() => {
	if (!isDiagnosticsChannelInjectionEnabled() || !diagnosticsChannel.tracingChannel) {
		instrumentIORedis();
		instrumentRedisModule();
	}
}, { id: INTEGRATION_NAME$11 });
var _redisIntegration = ((options = {}) => {
	return extendIntegration(redisIntegration$1({ responseHook: cacheResponseHook }), {
		name: INTEGRATION_NAME$11,
		setupOnce() {
			setRedisOptions(options);
			instrumentRedis();
		}
	});
});
var redisIntegration = defineIntegration(_redisIntegration);
var SpanNames = /* @__PURE__ */ ((SpanNames2) => {
	SpanNames2["QUERY_PREFIX"] = "pg.query";
	SpanNames2["CONNECT"] = "pg.connect";
	SpanNames2["POOL_CONNECT"] = "pg-pool.connect";
	return SpanNames2;
})(SpanNames || {});
var AttributeNames$4 = /* @__PURE__ */ ((AttributeNames2) => {
	AttributeNames2["PG_PLAN"] = "db.postgresql.plan";
	AttributeNames2["IDLE_TIMEOUT_MILLIS"] = "db.postgresql.idle.timeout.millis";
	AttributeNames2["MAX_CLIENT"] = "db.postgresql.max.client";
	return AttributeNames2;
})(AttributeNames$4 || {});
var ATTR_DB_CONNECTION_STRING = "db.connection_string";
var DB_SYSTEM_VALUE_POSTGRESQL = "postgresql";
var ORIGIN = "auto.db.otel.postgres";
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
function getConnectionString(params) {
	if ("connectionString" in params && params.connectionString) return parseAndMaskConnectionString(params.connectionString);
	return `postgresql://${params.host || "localhost"}:${params.port || 5432}/${params.database || ""}`;
}
function getPort$1(port) {
	if (Number.isInteger(port)) return port;
}
function getSemanticAttributesFromConnection(params) {
	return {
		[Kt]: DB_SYSTEM_VALUE_POSTGRESQL,
		[Nt]: params.database,
		[ATTR_DB_CONNECTION_STRING]: getConnectionString(params),
		[Qt]: params.user,
		[Il]: params.host,
		[Ol]: getPort$1(params.port)
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
		[AttributeNames$4.IDLE_TIMEOUT_MILLIS]: params.idleTimeoutMillis,
		[AttributeNames$4.MAX_CLIENT]: params.maxClient,
		[Kt]: DB_SYSTEM_VALUE_POSTGRESQL,
		[Nt]: url?.pathname.slice(1) ?? params.database,
		[ATTR_DB_CONNECTION_STRING]: getConnectionString(params),
		[Il]: url?.hostname ?? params.host,
		[Ol]: Number(url?.port) || getPort$1(params.port),
		[Qt]: url?.username ?? params.user
	};
}
function shouldSkipInstrumentation() {
	return getActiveSpan$1() === void 0;
}
function handleConfigQuery(queryConfig) {
	const { connectionParameters } = this;
	const dbName = connectionParameters.database;
	const span = startInactiveSpan$1({
		name: getQuerySpanName(dbName, queryConfig),
		kind: SPAN_KIND.CLIENT,
		attributes: {
			...getSemanticAttributesFromConnection(connectionParameters),
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: ORIGIN
		}
	});
	if (!queryConfig) return span;
	if (queryConfig.text) span.setAttribute(Ht, queryConfig.text);
	if (typeof queryConfig.name === "string") span.setAttribute(AttributeNames$4.PG_PLAN, queryConfig.name);
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
var PACKAGE_NAME$7 = "@sentry/instrumentation-pg";
function extractModuleExports(module) {
	return module[Symbol.toStringTag] === "Module" ? module.default : module;
}
function bindCallbackToSpan(parentSpan, callback) {
	return function(...args) {
		return withActiveSpan$1(parentSpan, () => callback.apply(this, args));
	};
}
var PgInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$7, SDK_VERSION, config);
	}
	init() {
		const SUPPORTED_PG_VERSIONS = [">=8.0.3 <9"];
		const SUPPORTED_PG_POOL_VERSIONS = [">=2.0.0 <4"];
		const modulePgNativeClient = new InstrumentationNodeModuleFile("pg/lib/native/client.js", SUPPORTED_PG_VERSIONS, this._patchPgClient.bind(this), this._unpatchPgClient.bind(this));
		const modulePgClient = new InstrumentationNodeModuleFile("pg/lib/client.js", SUPPORTED_PG_VERSIONS, this._patchPgClient.bind(this), this._unpatchPgClient.bind(this));
		return [new InstrumentationNodeModuleDefinition("pg", SUPPORTED_PG_VERSIONS, (module) => {
			const moduleExports = extractModuleExports(module);
			this._patchPgClient(moduleExports.Client);
			return module;
		}, (module) => {
			const moduleExports = extractModuleExports(module);
			this._unpatchPgClient(moduleExports.Client);
			return module;
		}, [modulePgClient, modulePgNativeClient]), new InstrumentationNodeModuleDefinition("pg-pool", SUPPORTED_PG_POOL_VERSIONS, (module) => {
			const moduleExports = extractModuleExports(module);
			if (isWrapped(moduleExports.prototype.connect)) this._unwrap(moduleExports.prototype, "connect");
			this._wrap(moduleExports.prototype, "connect", this._getPoolConnectPatch());
			return moduleExports;
		}, (module) => {
			const moduleExports = extractModuleExports(module);
			if (isWrapped(moduleExports.prototype.connect)) this._unwrap(moduleExports.prototype, "connect");
		})];
	}
	_patchPgClient(module) {
		if (!module) return;
		const moduleExports = extractModuleExports(module);
		if (isWrapped(moduleExports.prototype.query)) this._unwrap(moduleExports.prototype, "query");
		if (isWrapped(moduleExports.prototype.connect)) this._unwrap(moduleExports.prototype, "connect");
		this._wrap(moduleExports.prototype, "query", this._getClientQueryPatch());
		this._wrap(moduleExports.prototype, "connect", this._getClientConnectPatch());
		return module;
	}
	_unpatchPgClient(module) {
		const moduleExports = extractModuleExports(module);
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
var INTEGRATION_NAME$10 = "Postgres";
var instrumentPostgres = generateInstrumentOnce(INTEGRATION_NAME$10, PgInstrumentation, (options) => ({ ignoreConnectSpans: options?.ignoreConnectSpans ?? false }));
var _postgresIntegration = ((options) => {
	return {
		name: INTEGRATION_NAME$10,
		setupOnce() {
			instrumentPostgres(options);
		}
	};
});
var postgresIntegration = defineIntegration(_postgresIntegration);
var INTEGRATION_NAME$9 = "PostgresJs";
var SUPPORTED_VERSIONS$1 = [">=3.0.0 <4"];
var ATTR_DB_RESPONSE_STATUS_CODE = "db.response.status_code";
var SQL_OPERATION_REGEX = /^(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)/i;
var QUERY_FROM_INSTRUMENTED_SQL = /* @__PURE__ */ Symbol.for("sentry.query.from.instrumented.sql");
var instrumentPostgresJs = generateInstrumentOnce(INTEGRATION_NAME$9, (options) => new PostgresJsInstrumentation({
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
		const module = new InstrumentationNodeModuleDefinition("postgres", SUPPORTED_VERSIONS$1, (exports) => {
			try {
				return this._patchPostgres(exports);
			} catch (e) {
				DEBUG_BUILD$1 && debug.error("Failed to patch postgres module:", e);
				return exports;
			}
		}, (exports) => exports);
		[
			"src",
			"cf/src",
			"cjs/src"
		].forEach((path) => {
			module.files.push(new InstrumentationNodeModuleFile(`postgres/${path}/query.js`, SUPPORTED_VERSIONS$1, this._patchQueryPrototype.bind(this), this._unpatchQueryPrototype.bind(this)));
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
			DEBUG_BUILD$1 && debug.warn("postgres module does not export a function. Skipping instrumentation.");
			return exports;
		}
		const self = this;
		const WrappedPostgres = function(...args) {
			const sql = Reflect.construct(Original, args);
			if (!sql || typeof sql !== "function") {
				DEBUG_BUILD$1 && debug.warn("postgres() did not return a valid instance");
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
			if (this.executed || this[QUERY_FROM_INSTRUMENTED_SQL]) return originalHandle.apply(this, args);
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
						DEBUG_BUILD$1 && debug.error(`Error in requestHook for ${INTEGRATION_NAME$9} integration:`, e);
					}
				}, true);
				const originalResolve = this.resolve;
				this.resolve = new Proxy(originalResolve, { apply: (resolveTarget, resolveThisArg, resolveArgs) => {
					try {
						self._setOperationName(span, sanitizedSqlQuery, resolveArgs?.[0]?.command);
						span.end();
					} catch (e) {
						DEBUG_BUILD$1 && debug.error("Error ending span in resolve callback:", e);
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
						DEBUG_BUILD$1 && debug.error("Error ending span in reject callback:", e);
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
		name: INTEGRATION_NAME$9,
		setupOnce() {
			instrumentPostgresJs(options);
		}
	};
});
var postgresJsIntegration = defineIntegration(_postgresJsIntegration);
var AttributeNames$3 = /* @__PURE__ */ ((AttributeNames2) => {
	AttributeNames2["HAPI_TYPE"] = "hapi.type";
	AttributeNames2["PLUGIN_NAME"] = "hapi.plugin.name";
	AttributeNames2["EXT_TYPE"] = "server.ext.type";
	return AttributeNames2;
})(AttributeNames$3 || {});
var HapiComponentName = "@hapi/hapi";
var handlerPatched = /* @__PURE__ */ Symbol("hapi-handler-patched");
var HapiLayerType = {
	ROUTER: "router",
	PLUGIN: "plugin",
	EXT: "server.ext"
};
var HapiLifecycleMethodNames = /* @__PURE__ */ new Set([
	"onPreAuth",
	"onCredentials",
	"onPostAuth",
	"onPreHandler",
	"onPostHandler",
	"onPreResponse",
	"onRequest"
]);
function getPluginName(plugin) {
	if (plugin.name) return plugin.name;
	else return plugin.pkg.name;
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
		attributes[AttributeNames$3.HAPI_TYPE] = HapiLayerType.PLUGIN;
		attributes[AttributeNames$3.PLUGIN_NAME] = pluginName;
		name = `${pluginName}: route - ${route.path}`;
	} else {
		attributes[AttributeNames$3.HAPI_TYPE] = HapiLayerType.ROUTER;
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
			[AttributeNames$3.EXT_TYPE]: extPoint,
			[AttributeNames$3.HAPI_TYPE]: HapiLayerType.EXT,
			[AttributeNames$3.PLUGIN_NAME]: pluginName
		},
		name: `${pluginName}: ${baseName}`
	};
	return {
		attributes: {
			[AttributeNames$3.EXT_TYPE]: extPoint,
			[AttributeNames$3.HAPI_TYPE]: HapiLayerType.EXT
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
var PACKAGE_NAME$6 = "@sentry/instrumentation-hapi";
var HapiInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$6, SDK_VERSION, config);
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
					if (isLifecycleExtType(eventObj.type)) {
						const lifecycleEventObj = eventObj;
						lifecycleEventObj.method = instrumentation._wrapExtMethods(lifecycleEventObj.method, eventObj.type, pluginName);
						eventsList[i] = lifecycleEventObj;
					}
				}
				return original.apply(this, args);
			} else if (isDirectExtInput(args)) {
				const extInput = args;
				const method = extInput[1];
				const handler = instrumentation._wrapExtMethods(method, extInput[0], pluginName);
				return original.apply(this, [
					extInput[0],
					handler,
					extInput[2]
				]);
			} else if (isLifecycleExtEventObj(args[0])) {
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
		} else if (isPatchableExtMethod(method)) {
			if (method[handlerPatched] === true) return method;
			method[handlerPatched] = true;
			const newHandler = function(...params) {
				if (import_src.trace.getSpan(import_src.context.active()) === void 0) return method.apply(this, params);
				const metadata = getExtMetadata(extPoint, pluginName, method.name);
				return startSpan$2({
					name: metadata.name,
					op: `${metadata.attributes[AttributeNames$3.HAPI_TYPE]}.hapi`,
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
		if (route[handlerPatched] === true) return route;
		route[handlerPatched] = true;
		const wrapHandler = (oldHandler) => {
			return function(...params) {
				if (import_src.trace.getSpan(import_src.context.active()) === void 0) return oldHandler.call(this, ...params);
				setHttpServerSpanRouteAttribute(route.path);
				const metadata = getRouteMetadata(route, pluginName);
				return startSpan$2({
					name: metadata.name,
					op: `${metadata.attributes[AttributeNames$3.HAPI_TYPE]}.hapi`,
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
var INTEGRATION_NAME$8 = "Hapi";
var instrumentHapi = generateInstrumentOnce(INTEGRATION_NAME$8, () => new HapiInstrumentation());
var _hapiIntegration = (() => {
	return {
		name: INTEGRATION_NAME$8,
		setupOnce() {
			instrumentHapi();
		}
	};
});
var hapiIntegration = defineIntegration(_hapiIntegration);
var AttributeNames$2 = {
	HONO_TYPE: "hono.type",
	HONO_NAME: "hono.name"
};
var HonoTypes = {
	MIDDLEWARE: "middleware",
	REQUEST_HANDLER: "request_handler"
};
var PACKAGE_NAME$5 = "@sentry/instrumentation-hono";
var PACKAGE_VERSION = "0.0.1";
var HonoInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$5, PACKAGE_VERSION, config);
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
					if (isThenable(result)) return result.then((result2) => {
						const type = instrumentation._determineHandlerType(result2);
						span.setAttributes({
							[AttributeNames$2.HONO_TYPE]: type,
							[AttributeNames$2.HONO_NAME]: type === HonoTypes.REQUEST_HANDLER ? path : handler.name || "anonymous"
						});
						instrumentation.getConfig().responseHook?.(span);
						return result2;
					});
					else {
						const type = instrumentation._determineHandlerType(result);
						span.setAttributes({
							[AttributeNames$2.HONO_TYPE]: type,
							[AttributeNames$2.HONO_NAME]: type === HonoTypes.REQUEST_HANDLER ? path : handler.name || "anonymous"
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
			if (isThenable(result)) result.then(() => onSuccess(), (error) => onFailure(error));
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
var INTEGRATION_NAME$7 = "Hono";
function addHonoSpanAttributes(span) {
	const attributes = spanToJSON(span).data;
	const type = attributes[AttributeNames$2.HONO_TYPE];
	if (attributes["sentry.op"] || !type) return;
	span.setAttributes({
		[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.otel.hono",
		[SEMANTIC_ATTRIBUTE_SENTRY_OP]: `${type}.hono`
	});
	const name = attributes[AttributeNames$2.HONO_NAME];
	if (typeof name === "string") span.updateName(name);
	if (getIsolationScope() === getDefaultIsolationScope()) {
		DEBUG_BUILD$1 && debug.warn("Isolation scope is default isolation scope - skipping setting transactionName");
		return;
	}
	const route = attributes[Ts];
	const method = attributes[ns];
	if (typeof route === "string" && typeof method === "string") getIsolationScope().setTransactionName(`${method} ${route}`);
}
var instrumentHono = generateInstrumentOnce(INTEGRATION_NAME$7, () => new HonoInstrumentation({ responseHook: (span) => {
	addHonoSpanAttributes(span);
} }));
var _honoIntegration = (() => {
	return {
		name: INTEGRATION_NAME$7,
		setupOnce() {
			instrumentHono();
		}
	};
});
var honoIntegration = defineIntegration(_honoIntegration);
var KoaLayerType = /* @__PURE__ */ ((KoaLayerType2) => {
	KoaLayerType2["ROUTER"] = "router";
	KoaLayerType2["MIDDLEWARE"] = "middleware";
	return KoaLayerType2;
})(KoaLayerType || {});
var AttributeNames$1 = /* @__PURE__ */ ((AttributeNames2) => {
	AttributeNames2["KOA_TYPE"] = "koa.type";
	AttributeNames2["KOA_NAME"] = "koa.name";
	return AttributeNames2;
})(AttributeNames$1 || {});
var getMiddlewareMetadata = (context, layer, isRouter, layerPath) => {
	if (isRouter) return {
		attributes: {
			[AttributeNames$1.KOA_NAME]: layerPath?.toString(),
			[AttributeNames$1.KOA_TYPE]: KoaLayerType.ROUTER,
			[Ts]: layerPath?.toString()
		},
		name: context._matchedRouteName || `router - ${layerPath}`
	};
	else return {
		attributes: {
			[AttributeNames$1.KOA_NAME]: layer.name ?? "middleware",
			[AttributeNames$1.KOA_TYPE]: KoaLayerType.MIDDLEWARE,
			[ht]: layer.name ?? "middleware"
		},
		name: `middleware - ${layer.name}`
	};
};
var isLayerIgnored = (type, config) => {
	return !!(Array.isArray(config?.ignoreLayersType) && config?.ignoreLayersType?.includes(type));
};
var kLayerPatched = /* @__PURE__ */ Symbol("koa-layer-patched");
var PACKAGE_NAME$4 = "@sentry/instrumentation-koa";
var KoaInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$4, SDK_VERSION, config);
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
		if (middlewareLayer[kLayerPatched] === true || isLayerIgnored(layerType, this.getConfig())) return middlewareLayer;
		if (middlewareLayer.constructor.name === "GeneratorFunction" || middlewareLayer.constructor.name === "AsyncGeneratorFunction") return middlewareLayer;
		middlewareLayer[kLayerPatched] = true;
		return (context, next) => {
			if (import_src.trace.getSpan(import_src.context.active()) === void 0) return middlewareLayer(context, next);
			const metadata = getMiddlewareMetadata(context, middlewareLayer, isRouter, layerPath);
			if (context._matchedRoute) setHttpServerSpanRouteAttribute(context._matchedRoute.toString());
			const koaName = metadata.attributes[AttributeNames$1.KOA_NAME];
			return startSpan$2({
				name: typeof koaName === "string" ? koaName || "< unknown >" : metadata.name,
				op: `${layerType}.koa`,
				attributes: {
					...metadata.attributes,
					[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.otel.koa"
				}
			}, () => {
				const route = metadata.attributes[Ts];
				if (getIsolationScope() === getDefaultIsolationScope()) DEBUG_BUILD$1 && debug.warn("Isolation scope is default isolation scope - skipping setting transactionName");
				else if (route) {
					const method = context.request?.method?.toUpperCase() || "GET";
					getIsolationScope().setTransactionName(`${method} ${route}`);
				}
				return middlewareLayer(context, next);
			});
		};
	}
};
var INTEGRATION_NAME$6 = "Koa";
var instrumentKoa = generateInstrumentOnce(INTEGRATION_NAME$6, KoaInstrumentation, (options = {}) => {
	return { ignoreLayersType: options.ignoreLayersType };
});
var _koaIntegration = ((options = {}) => {
	return {
		name: INTEGRATION_NAME$6,
		setupOnce() {
			instrumentKoa(options);
		}
	};
});
var koaIntegration = defineIntegration(_koaIntegration);
var AttributeNames = /* @__PURE__ */ ((AttributeNames2) => {
	AttributeNames2["CONNECT_TYPE"] = "connect.type";
	AttributeNames2["CONNECT_NAME"] = "connect.name";
	return AttributeNames2;
})(AttributeNames || {});
var ConnectTypes = /* @__PURE__ */ ((ConnectTypes2) => {
	ConnectTypes2["MIDDLEWARE"] = "middleware";
	ConnectTypes2["REQUEST_HANDLER"] = "request_handler";
	return ConnectTypes2;
})(ConnectTypes || {});
var _LAYERS_STORE_PROPERTY = /* @__PURE__ */ Symbol("opentelemetry.instrumentation-connect.request-route-stack");
var addNewStackLayer = (request) => {
	if (Array.isArray(request[_LAYERS_STORE_PROPERTY]) === false) Object.defineProperty(request, _LAYERS_STORE_PROPERTY, {
		enumerable: false,
		value: []
	});
	request[_LAYERS_STORE_PROPERTY].push("/");
	const stackLength = request[_LAYERS_STORE_PROPERTY].length;
	return () => {
		if (stackLength === request[_LAYERS_STORE_PROPERTY].length) request[_LAYERS_STORE_PROPERTY].pop();
		else DEBUG_BUILD$1 && debug.warn("Connect: Trying to pop the stack multiple time");
	};
};
var replaceCurrentStackRoute = (request, newRoute) => {
	if (newRoute) request[_LAYERS_STORE_PROPERTY].splice(-1, 1, newRoute);
};
var generateRoute = (request) => {
	return request[_LAYERS_STORE_PROPERTY].reduce((acc, sub) => acc.replace(/\/+$/, "") + sub);
};
var PACKAGE_NAME$3 = "@sentry/instrumentation-connect";
var ANONYMOUS_NAME = "anonymous";
var ConnectInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$3, SDK_VERSION, config);
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
				[AttributeNames.CONNECT_TYPE]: connectType,
				[AttributeNames.CONNECT_NAME]: connectName
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
			if (routeName) setHttpServerSpanRouteAttribute(generateRoute(req));
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
var INTEGRATION_NAME$5 = "Connect";
var instrumentConnect = generateInstrumentOnce(INTEGRATION_NAME$5, () => new ConnectInstrumentation());
var _connectIntegration = (() => {
	return {
		name: INTEGRATION_NAME$5,
		setupOnce() {
			instrumentConnect();
		}
	};
});
var connectIntegration = defineIntegration(_connectIntegration);
var ATTR_DB_SQL_TABLE = "db.sql.table";
var DB_SYSTEM_VALUE_MSSQL = "mssql";
function getSpanName(operation, db, sql, bulkLoadTable) {
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
var PACKAGE_NAME$2 = "@sentry/instrumentation-tedious";
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
		super(PACKAGE_NAME$2, SDK_VERSION, config);
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
					name: getSpanName(operation, databaseName, sql, request.table),
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
var INTEGRATION_NAME$4 = "Tedious";
var instrumentTedious = generateInstrumentOnce(INTEGRATION_NAME$4, () => new TediousInstrumentation({}));
var _tediousIntegration = (() => {
	return {
		name: INTEGRATION_NAME$4,
		setupOnce() {
			instrumentTedious();
		}
	};
});
var tediousIntegration = defineIntegration(_tediousIntegration);
var MODULE_NAME = "generic-pool";
var PACKAGE_NAME$1 = "@sentry/instrumentation-generic-pool";
var GenericPoolInstrumentation = class extends InstrumentationBase {
	constructor(config = {}) {
		super(PACKAGE_NAME$1, SDK_VERSION, config);
		this._isDisabled = false;
	}
	init() {
		return [
			new InstrumentationNodeModuleDefinition(MODULE_NAME, [">=3.0.0 <4"], (moduleExports) => {
				const Pool = moduleExports.Pool;
				if (isWrapped(Pool.prototype.acquire)) this._unwrap(Pool.prototype, "acquire");
				this._wrap(Pool.prototype, "acquire", this._acquirePatcher.bind(this));
				return moduleExports;
			}, (moduleExports) => {
				const Pool = moduleExports.Pool;
				this._unwrap(Pool.prototype, "acquire");
				return moduleExports;
			}),
			new InstrumentationNodeModuleDefinition(MODULE_NAME, [">=2.4.0 <3"], (moduleExports) => {
				const Pool = moduleExports.Pool;
				if (isWrapped(Pool.prototype.acquire)) this._unwrap(Pool.prototype, "acquire");
				this._wrap(Pool.prototype, "acquire", this._acquireWithCallbacksPatcher.bind(this));
				return moduleExports;
			}, (moduleExports) => {
				const Pool = moduleExports.Pool;
				this._unwrap(Pool.prototype, "acquire");
				return moduleExports;
			}),
			new InstrumentationNodeModuleDefinition(MODULE_NAME, [">=2.0.0 <2.4"], (moduleExports) => {
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
			return startSpan$2({
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
var INTEGRATION_NAME$3 = "GenericPool";
var instrumentGenericPool = generateInstrumentOnce(INTEGRATION_NAME$3, () => new GenericPoolInstrumentation({}));
var _genericPoolIntegration = (() => {
	return {
		name: INTEGRATION_NAME$3,
		setupOnce() {
			instrumentGenericPool();
		}
	};
});
var genericPoolIntegration = defineIntegration(_genericPoolIntegration);
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
	const span = startInactiveSpan$1({
		name: `publish ${normalizeExchange(exchange)}`,
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
			continueTrace$1({
				sentryTrace: getHeaderAsString(headers, "sentry-trace"),
				baggage: getHeaderAsString(headers, "baggage")
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
var INTEGRATION_NAME$1 = "VercelAI";
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
var instrumentVercelAi = generateInstrumentOnce(INTEGRATION_NAME$1, () => new SentryVercelAiInstrumentation({}));
function shouldForceIntegration(client) {
	return !!client.getIntegrationByName("Modules")?.getModules?.()?.ai;
}
var _vercelAIIntegration = ((options = {}) => {
	let instrumentation;
	return extendIntegration(vercelAiIntegration(options), {
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
			return instrumentOpenAiClient(Reflect.construct(Original, args), config);
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
			return instrumentAnthropicAiClient(Reflect.construct(Original, args), config);
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
			return instrumentGoogleGenAIClient(Reflect.construct(Original, args), config);
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
	return startSpan$2({
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
var MAX_MAX_SPAN_WAIT_DURATION = 1e6;
var OTEL_API_GLOBAL_KEY = /* @__PURE__ */ Symbol.for("opentelemetry.js.api.1");
function registerGlobalTracerProvider(provider) {
	if (import_src.trace.setGlobalTracerProvider(provider)) return true;
	const otelGlobal = globalThis;
	const registry = otelGlobal[OTEL_API_GLOBAL_KEY];
	if (registry && !registry.trace) {
		DEBUG_BUILD$1 && debug.warn("Replaced a pre-existing OpenTelemetry API registry that was created by a different @opentelemetry/api version and would have blocked tracing. If you want to manage OpenTelemetry yourself, set `skipOpenTelemetrySetup: true` in `Sentry.init()`.");
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
		DEBUG_BUILD$1 && debug.warn("Could not register SentryTracerProvider because another OpenTelemetry tracer provider is already registered.");
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
		DEBUG_BUILD$1 && debug.warn(`\`maxSpanWaitDuration\` is too high, using the maximum value of ${MAX_MAX_SPAN_WAIT_DURATION}`);
		return MAX_MAX_SPAN_WAIT_DURATION;
	} else if (maxSpanWaitDuration <= 0 || Number.isNaN(maxSpanWaitDuration)) {
		DEBUG_BUILD$1 && debug.warn("`maxSpanWaitDuration` must be a positive number, using default value instead.");
		return;
	}
	return maxSpanWaitDuration;
}
function getDefaultIntegrationsWithoutPerformance() {
	return getDefaultIntegrations$1().filter((integration) => integration.name !== "Http" && integration.name !== "NodeFetch").concat(httpIntegration(), nativeNodeFetchIntegration());
}
function getDefaultIntegrations(options) {
	return [...getDefaultIntegrationsWithoutPerformance(), ...hasSpansEnabled(options) ? getAutoPerformanceIntegrations() : []];
}
function init$1(options = {}) {
	return _init(options, getDefaultIntegrations);
}
function _init(options = {}, getDefaultIntegrationsImpl) {
	applySdkMetadata(options, "node");
	const diagnosticsChannelInjection = isDiagnosticsChannelInjectionEnabled() && hasSpansEnabled(options) ? void 0 : void 0;
	if (diagnosticsChannelInjection) diagnosticsChannelInjection.register();
	let defaultIntegrations = options.defaultIntegrations ?? getDefaultIntegrationsImpl(options);
	if (diagnosticsChannelInjection && Array.isArray(defaultIntegrations) && defaultIntegrations.length > 0) {
		const replaced = new Set(diagnosticsChannelInjection.replacedOtelIntegrationNames);
		defaultIntegrations = [...defaultIntegrations.filter((integration) => !replaced.has(integration.name)), ...diagnosticsChannelInjection.integrations];
	}
	const client = init$2({
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
function init(options) {
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
	return init$1(sentryOptions);
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
init({
	dsn: env.SENTRY_DSN,
	environment: env.MODE,
	tracesSampleRate: .2
});
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-tMaTfkv1.mjs").then((n) => n.t).then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!isH3SwallowedErrorBody(body)) return response;
	const swallowed = consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`);
	console.error(swallowed);
	captureException(swallowed);
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
		captureException(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { setUser as a, updateSpanName as c, __exportAll as d, server_default as default, ssr_exports as f, captureException as i, SEMANTIC_ATTRIBUTE_SENTRY_SOURCE as l, renderErrorPage as n, getActiveSpan$1 as o, addIntegration as r, spanToJSON as s, env as t, addNonEnumerableProperty as u };
