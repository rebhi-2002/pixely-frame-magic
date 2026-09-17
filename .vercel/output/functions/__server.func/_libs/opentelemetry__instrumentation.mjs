import { i as __toESM } from "../_runtime.mjs";
import { t as require_src } from "./opentelemetry__api.mjs";
import { t as logs } from "./opentelemetry__api-logs.mjs";
import { types } from "util";
import * as path from "path";
import { Hook } from "require-in-the-middle";
import { Hook as Hook$1 } from "import-in-the-middle";
import { readFileSync } from "fs";
//#region node_modules/@opentelemetry/instrumentation/build/esm/autoLoaderUtils.js
var import_src = /* @__PURE__ */ __toESM(require_src());
/**
* Enable instrumentations
* @param instrumentations
* @param tracerProvider
* @param meterProvider
*/
function enableInstrumentations(instrumentations, tracerProvider, meterProvider, loggerProvider) {
	for (let i = 0, j = instrumentations.length; i < j; i++) {
		const instrumentation = instrumentations[i];
		if (tracerProvider) instrumentation.setTracerProvider(tracerProvider);
		if (meterProvider) instrumentation.setMeterProvider(meterProvider);
		if (loggerProvider && instrumentation.setLoggerProvider) instrumentation.setLoggerProvider(loggerProvider);
		if (!instrumentation.getConfig().enabled) instrumentation.enable();
	}
}
/**
* Disable instrumentations
* @param instrumentations
*/
function disableInstrumentations(instrumentations) {
	instrumentations.forEach((instrumentation) => instrumentation.disable());
}
//#endregion
//#region node_modules/@opentelemetry/instrumentation/build/esm/autoLoader.js
/**
* It will register instrumentations and plugins
* @param options
* @return returns function to unload instrumentation and plugins that were
*   registered
*/
function registerInstrumentations(options) {
	const tracerProvider = options.tracerProvider || import_src.trace.getTracerProvider();
	const meterProvider = options.meterProvider || import_src.metrics.getMeterProvider();
	const loggerProvider = options.loggerProvider || logs.getLoggerProvider();
	const instrumentations = options.instrumentations?.flat() ?? [];
	enableInstrumentations(instrumentations, tracerProvider, meterProvider, loggerProvider);
	return () => {
		disableInstrumentations(instrumentations);
	};
}
//#endregion
//#region node_modules/@opentelemetry/instrumentation/build/esm/semver.js
var VERSION_REGEXP = /^(?:v)?(?<version>(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*))(?:-(?<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?<build>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
var RANGE_REGEXP = /^(?<op><|>|=|==|<=|>=|~|\^|~>)?\s*(?:v)?(?<version>(?<major>x|X|\*|0|[1-9]\d*)(?:\.(?<minor>x|X|\*|0|[1-9]\d*))?(?:\.(?<patch>x|X|\*|0|[1-9]\d*))?)(?:-(?<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?<build>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
var operatorResMap = {
	">": [1],
	">=": [0, 1],
	"=": [0],
	"<=": [-1, 0],
	"<": [-1],
	"!=": [-1, 1]
};
/**
* Checks given version whether it satisfies given range expression.
* @param version the [version](https://github.com/npm/node-semver#versions) to be checked
* @param range   the [range](https://github.com/npm/node-semver#ranges) expression for version check
* @param options options to configure semver satisfy check
*/
function satisfies(version, range, options) {
	if (!_validateVersion(version)) {
		import_src.diag.error(`Invalid version: ${version}`);
		return false;
	}
	if (!range) return true;
	range = range.replace(/([<>=~^]+)\s+/g, "$1");
	const parsedVersion = _parseVersion(version);
	if (!parsedVersion) return false;
	const allParsedRanges = [];
	const checkResult = _doSatisfies(parsedVersion, range, allParsedRanges, options);
	if (checkResult && !options?.includePrerelease) return _doPreleaseCheck(parsedVersion, allParsedRanges);
	return checkResult;
}
function _validateVersion(version) {
	return typeof version === "string" && VERSION_REGEXP.test(version);
}
function _doSatisfies(parsedVersion, range, allParsedRanges, options) {
	if (range.includes("||")) {
		const ranges = range.trim().split("||");
		for (const r of ranges) if (_checkRange(parsedVersion, r, allParsedRanges, options)) return true;
		return false;
	} else if (range.includes(" - ")) range = replaceHyphen(range, options);
	else if (range.includes(" ")) {
		const ranges = range.trim().replace(/\s{2,}/g, " ").split(" ");
		for (const r of ranges) if (!_checkRange(parsedVersion, r, allParsedRanges, options)) return false;
		return true;
	}
	return _checkRange(parsedVersion, range, allParsedRanges, options);
}
function _checkRange(parsedVersion, range, allParsedRanges, options) {
	range = _normalizeRange(range, options);
	if (range.includes(" ")) return _doSatisfies(parsedVersion, range, allParsedRanges, options);
	else {
		const parsedRange = _parseRange(range);
		allParsedRanges.push(parsedRange);
		return _satisfies(parsedVersion, parsedRange);
	}
}
function _satisfies(parsedVersion, parsedRange) {
	if (parsedRange.invalid) return false;
	if (!parsedRange.version || _isWildcard(parsedRange.version)) return true;
	let comparisonResult = _compareVersionSegments(parsedVersion.versionSegments || [], parsedRange.versionSegments || []);
	if (comparisonResult === 0) {
		const versionPrereleaseSegments = parsedVersion.prereleaseSegments || [];
		const rangePrereleaseSegments = parsedRange.prereleaseSegments || [];
		if (!versionPrereleaseSegments.length && !rangePrereleaseSegments.length) comparisonResult = 0;
		else if (!versionPrereleaseSegments.length && rangePrereleaseSegments.length) comparisonResult = 1;
		else if (versionPrereleaseSegments.length && !rangePrereleaseSegments.length) comparisonResult = -1;
		else comparisonResult = _compareVersionSegments(versionPrereleaseSegments, rangePrereleaseSegments);
	}
	return operatorResMap[parsedRange.op]?.includes(comparisonResult);
}
function _doPreleaseCheck(parsedVersion, allParsedRanges) {
	if (parsedVersion.prerelease) return allParsedRanges.some((r) => r.prerelease && r.version === parsedVersion.version);
	return true;
}
function _normalizeRange(range, options) {
	range = range.trim();
	range = replaceCaret(range, options);
	range = replaceTilde(range);
	range = replaceXRange(range, options);
	range = range.trim();
	return range;
}
function isX(id) {
	return !id || id.toLowerCase() === "x" || id === "*";
}
function _parseVersion(versionString) {
	const match = versionString.match(VERSION_REGEXP);
	if (!match) {
		import_src.diag.error(`Invalid version: ${versionString}`);
		return;
	}
	const version = match.groups.version;
	const prerelease = match.groups.prerelease;
	const build = match.groups.build;
	const versionSegments = version.split(".");
	const prereleaseSegments = prerelease?.split(".");
	return {
		op: void 0,
		version,
		versionSegments,
		versionSegmentCount: versionSegments.length,
		prerelease,
		prereleaseSegments,
		prereleaseSegmentCount: prereleaseSegments ? prereleaseSegments.length : 0,
		build
	};
}
function _parseRange(rangeString) {
	if (!rangeString) return {};
	const match = rangeString.match(RANGE_REGEXP);
	if (!match) {
		import_src.diag.error(`Invalid range: ${rangeString}`);
		return { invalid: true };
	}
	let op = match.groups.op;
	const version = match.groups.version;
	const prerelease = match.groups.prerelease;
	const build = match.groups.build;
	const versionSegments = version.split(".");
	const prereleaseSegments = prerelease?.split(".");
	if (op === "==") op = "=";
	return {
		op: op || "=",
		version,
		versionSegments,
		versionSegmentCount: versionSegments.length,
		prerelease,
		prereleaseSegments,
		prereleaseSegmentCount: prereleaseSegments ? prereleaseSegments.length : 0,
		build
	};
}
function _isWildcard(s) {
	return s === "*" || s === "x" || s === "X";
}
function _parseVersionString(v) {
	const n = parseInt(v, 10);
	return isNaN(n) ? v : n;
}
function _normalizeVersionType(a, b) {
	if (typeof a === typeof b) {
		if (typeof a === "number") return [a, b];
		else if (typeof a === "string") return [a, b];
		else throw new Error("Version segments can only be strings or numbers");
	} else return [String(a), String(b)];
}
function _compareVersionStrings(v1, v2) {
	if (_isWildcard(v1) || _isWildcard(v2)) return 0;
	const [parsedV1, parsedV2] = _normalizeVersionType(_parseVersionString(v1), _parseVersionString(v2));
	if (parsedV1 > parsedV2) return 1;
	else if (parsedV1 < parsedV2) return -1;
	return 0;
}
function _compareVersionSegments(v1, v2) {
	for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
		const res = _compareVersionStrings(v1[i] || "0", v2[i] || "0");
		if (res !== 0) return res;
	}
	return 0;
}
var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
var NUMERICIDENTIFIER = "0|[1-9]\\d*";
var NONNUMERICIDENTIFIER = `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`;
var GTLT = "((?:<|>)?=?)";
var PRERELEASEIDENTIFIER = `(?:${NUMERICIDENTIFIER}|${NONNUMERICIDENTIFIER})`;
var PRERELEASE = `(?:-(${PRERELEASEIDENTIFIER}(?:\\.${PRERELEASEIDENTIFIER})*))`;
var BUILDIDENTIFIER = `${LETTERDASHNUMBER}+`;
var BUILD = `(?:\\+(${BUILDIDENTIFIER}(?:\\.${BUILDIDENTIFIER})*))`;
var XRANGEIDENTIFIER = `${NUMERICIDENTIFIER}|x|X|\\*`;
var XRANGEPLAIN = `[v=\\s]*(${XRANGEIDENTIFIER})(?:\\.(${XRANGEIDENTIFIER})(?:\\.(${XRANGEIDENTIFIER})(?:${PRERELEASE})?${BUILD}?)?)?`;
var XRANGE = `^${GTLT}\\s*${XRANGEPLAIN}$`;
var XRANGE_REGEXP = new RegExp(XRANGE);
var HYPHENRANGE = `^\\s*(${XRANGEPLAIN})\\s+-\\s+(${XRANGEPLAIN})\\s*\$`;
var HYPHENRANGE_REGEXP = new RegExp(HYPHENRANGE);
var TILDE = `^(?:~>?)${XRANGEPLAIN}$`;
var TILDE_REGEXP = new RegExp(TILDE);
var CARET = `^(?:\\^)${XRANGEPLAIN}$`;
var CARET_REGEXP = new RegExp(CARET);
function replaceTilde(comp) {
	const r = TILDE_REGEXP;
	return comp.replace(r, (_, M, m, p, pr) => {
		let ret;
		if (isX(M)) ret = "";
		else if (isX(m)) ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
		else if (isX(p)) ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
		else if (pr) ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
		else ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
		return ret;
	});
}
function replaceCaret(comp, options) {
	const r = CARET_REGEXP;
	const z = options?.includePrerelease ? "-0" : "";
	return comp.replace(r, (_, M, m, p, pr) => {
		let ret;
		if (isX(M)) ret = "";
		else if (isX(m)) ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
		else if (isX(p)) {
			if (M === "0") ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
			else ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
		} else if (pr) {
			if (M === "0") {
				if (m === "0") ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
				else ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
			} else ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
		} else if (M === "0") {
			if (m === "0") ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
			else ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
		} else ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
		return ret;
	});
}
function replaceXRange(comp, options) {
	const r = XRANGE_REGEXP;
	return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
		const xM = isX(M);
		const xm = xM || isX(m);
		const xp = xm || isX(p);
		const anyX = xp;
		if (gtlt === "=" && anyX) gtlt = "";
		pr = options?.includePrerelease ? "-0" : "";
		if (xM) {
			if (gtlt === ">" || gtlt === "<") ret = "<0.0.0-0";
			else ret = "*";
		} else if (gtlt && anyX) {
			if (xm) m = 0;
			p = 0;
			if (gtlt === ">") {
				gtlt = ">=";
				if (xm) {
					M = +M + 1;
					m = 0;
					p = 0;
				} else {
					m = +m + 1;
					p = 0;
				}
			} else if (gtlt === "<=") {
				gtlt = "<";
				if (xm) M = +M + 1;
				else m = +m + 1;
			}
			if (gtlt === "<") pr = "-0";
			ret = `${gtlt + M}.${m}.${p}${pr}`;
		} else if (xm) ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
		else if (xp) ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
		return ret;
	});
}
function replaceHyphen(comp, options) {
	const r = HYPHENRANGE_REGEXP;
	return comp.replace(r, (_, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
		if (isX(fM)) from = "";
		else if (isX(fm)) from = `>=${fM}.0.0${options?.includePrerelease ? "-0" : ""}`;
		else if (isX(fp)) from = `>=${fM}.${fm}.0${options?.includePrerelease ? "-0" : ""}`;
		else if (fpr) from = `>=${from}`;
		else from = `>=${from}${options?.includePrerelease ? "-0" : ""}`;
		if (isX(tM)) to = "";
		else if (isX(tm)) to = `<${+tM + 1}.0.0-0`;
		else if (isX(tp)) to = `<${tM}.${+tm + 1}.0-0`;
		else if (tpr) to = `<=${tM}.${tm}.${tp}-${tpr}`;
		else if (options?.includePrerelease) to = `<${tM}.${tm}.${+tp + 1}-0`;
		else to = `<=${to}`;
		return `${from} ${to}`.trim();
	});
}
//#endregion
//#region node_modules/@opentelemetry/instrumentation/build/esm/shimmer.js
var logger = console.error.bind(console);
function defineProperty(obj, name, value) {
	const enumerable = !!obj[name] && Object.prototype.propertyIsEnumerable.call(obj, name);
	Object.defineProperty(obj, name, {
		configurable: true,
		enumerable,
		writable: true,
		value
	});
}
var wrap = (nodule, name, wrapper) => {
	if (!nodule || !nodule[name]) {
		logger("no original function " + String(name) + " to wrap");
		return;
	}
	if (!wrapper) {
		logger("no wrapper function");
		logger((/* @__PURE__ */ new Error()).stack);
		return;
	}
	const original = nodule[name];
	if (typeof original !== "function" || typeof wrapper !== "function") {
		logger("original object and wrapper must be functions");
		return;
	}
	const wrapped = wrapper(original, name);
	defineProperty(wrapped, "__original", original);
	defineProperty(wrapped, "__unwrap", () => {
		if (nodule[name] === wrapped) defineProperty(nodule, name, original);
	});
	defineProperty(wrapped, "__wrapped", true);
	defineProperty(nodule, name, wrapped);
	return wrapped;
};
var massWrap = (nodules, names, wrapper) => {
	if (!nodules) {
		logger("must provide one or more modules to patch");
		logger((/* @__PURE__ */ new Error()).stack);
		return;
	} else if (!Array.isArray(nodules)) nodules = [nodules];
	if (!(names && Array.isArray(names))) {
		logger("must provide one or more functions to wrap on modules");
		return;
	}
	nodules.forEach((nodule) => {
		names.forEach((name) => {
			wrap(nodule, name, wrapper);
		});
	});
};
var unwrap = (nodule, name) => {
	if (!nodule || !nodule[name]) {
		logger("no function to unwrap.");
		logger((/* @__PURE__ */ new Error()).stack);
		return;
	}
	const wrapped = nodule[name];
	if (!wrapped.__unwrap) logger("no original to unwrap to -- has " + String(name) + " already been unwrapped?");
	else {
		wrapped.__unwrap();
		return;
	}
};
var massUnwrap = (nodules, names) => {
	if (!nodules) {
		logger("must provide one or more modules to patch");
		logger((/* @__PURE__ */ new Error()).stack);
		return;
	} else if (!Array.isArray(nodules)) nodules = [nodules];
	if (!(names && Array.isArray(names))) {
		logger("must provide one or more functions to unwrap on modules");
		return;
	}
	nodules.forEach((nodule) => {
		names.forEach((name) => {
			unwrap(nodule, name);
		});
	});
};
function shimmer(options) {
	if (options && options.logger) {
		if (typeof options.logger !== "function") logger("new logger isn't a function, not replacing");
		else logger = options.logger;
	}
}
shimmer.wrap = wrap;
shimmer.massWrap = massWrap;
shimmer.unwrap = unwrap;
shimmer.massUnwrap = massUnwrap;
//#endregion
//#region node_modules/@opentelemetry/instrumentation/build/esm/instrumentation.js
/**
* Base abstract internal class for instrumenting node and web plugins
*/
var InstrumentationAbstract = class {
	_config = {};
	_tracer;
	_meter;
	_logger;
	_diag;
	instrumentationName;
	instrumentationVersion;
	constructor(instrumentationName, instrumentationVersion, config) {
		this.instrumentationName = instrumentationName;
		this.instrumentationVersion = instrumentationVersion;
		this.setConfig(config);
		this._diag = import_src.diag.createComponentLogger({ namespace: instrumentationName });
		this._tracer = import_src.trace.getTracer(instrumentationName, instrumentationVersion);
		this._meter = import_src.metrics.getMeter(instrumentationName, instrumentationVersion);
		this._logger = logs.getLogger(instrumentationName, instrumentationVersion);
		this._updateMetricInstruments();
	}
	_wrap = wrap;
	_unwrap = unwrap;
	_massWrap = massWrap;
	_massUnwrap = massUnwrap;
	get meter() {
		return this._meter;
	}
	/**
	* Sets MeterProvider to this plugin
	* @param meterProvider
	*/
	setMeterProvider(meterProvider) {
		this._meter = meterProvider.getMeter(this.instrumentationName, this.instrumentationVersion);
		this._updateMetricInstruments();
	}
	get logger() {
		return this._logger;
	}
	/**
	* Sets LoggerProvider to this plugin
	* @param loggerProvider
	*/
	setLoggerProvider(loggerProvider) {
		this._logger = loggerProvider.getLogger(this.instrumentationName, this.instrumentationVersion);
	}
	/**
	* @experimental
	*
	* Get module definitions defined by {@link init}.
	* This can be used for experimental compile-time instrumentation.
	*
	* @returns an array of {@link InstrumentationModuleDefinition}
	*/
	getModuleDefinitions() {
		const initResult = this.init() ?? [];
		if (!Array.isArray(initResult)) return [initResult];
		return initResult;
	}
	/**
	* Sets the new metric instruments with the current Meter.
	*/
	_updateMetricInstruments() {}
	getConfig() {
		return this._config;
	}
	/**
	* Sets InstrumentationConfig to this plugin
	* @param config
	*/
	setConfig(config) {
		this._config = {
			enabled: true,
			...config
		};
	}
	/**
	* Sets TracerProvider to this plugin
	* @param tracerProvider
	*/
	setTracerProvider(tracerProvider) {
		this._tracer = tracerProvider.getTracer(this.instrumentationName, this.instrumentationVersion);
	}
	get tracer() {
		return this._tracer;
	}
	/**
	* Execute span customization hook, if configured, and log any errors.
	* Any semantics of the trigger and info are defined by the specific instrumentation.
	* @param hookHandler The optional hook handler which the user has configured via instrumentation config
	* @param triggerName The name of the trigger for executing the hook for logging purposes
	* @param span The span to which the hook should be applied
	* @param info The info object to be passed to the hook, with useful data the hook may use
	*/
	_runSpanCustomizationHook(hookHandler, triggerName, span, info) {
		if (!hookHandler) return;
		try {
			hookHandler(span, info);
		} catch (e) {
			this._diag.error("Error running span customization hook due to exception in handler", { triggerName }, e);
		}
	}
};
/**
* Node in a `ModuleNameTrie`
*/
var ModuleNameTrieNode = class {
	hooks = [];
	children = /* @__PURE__ */ new Map();
};
/**
* Trie containing nodes that represent a part of a module name (i.e. the parts separated by forward slash)
*/
var ModuleNameTrie = class {
	_trie = new ModuleNameTrieNode();
	_counter = 0;
	/**
	* Insert a module hook into the trie
	*
	* @param {Hooked} hook Hook
	*/
	insert(hook) {
		let trieNode = this._trie;
		for (const moduleNamePart of hook.moduleName.split("/")) {
			let nextNode = trieNode.children.get(moduleNamePart);
			if (!nextNode) {
				nextNode = new ModuleNameTrieNode();
				trieNode.children.set(moduleNamePart, nextNode);
			}
			trieNode = nextNode;
		}
		trieNode.hooks.push({
			hook,
			insertedId: this._counter++
		});
	}
	/**
	* Search for matching hooks in the trie
	*
	* @param {string} moduleName Module name
	* @param {boolean} maintainInsertionOrder Whether to return the results in insertion order
	* @param {boolean} fullOnly Whether to return only full matches
	* @returns {Hooked[]} Matching hooks
	*/
	search(moduleName, { maintainInsertionOrder, fullOnly } = {}) {
		let trieNode = this._trie;
		const results = [];
		let foundFull = true;
		for (const moduleNamePart of moduleName.split("/")) {
			const nextNode = trieNode.children.get(moduleNamePart);
			if (!nextNode) {
				foundFull = false;
				break;
			}
			if (!fullOnly) results.push(...nextNode.hooks);
			trieNode = nextNode;
		}
		if (fullOnly && foundFull) results.push(...trieNode.hooks);
		if (results.length === 0) return [];
		if (results.length === 1) return [results[0].hook];
		if (maintainInsertionOrder) results.sort((a, b) => a.insertedId - b.insertedId);
		return results.map(({ hook }) => hook);
	}
};
//#endregion
//#region node_modules/@opentelemetry/instrumentation/build/esm/platform/node/RequireInTheMiddleSingleton.js
/**
* Whether Mocha is running in this process
* Inspired by https://github.com/AndreasPizsa/detect-mocha
*
* @type {boolean}
*/
var isMocha = [
	"afterEach",
	"after",
	"beforeEach",
	"before",
	"describe",
	"it"
].every((fn) => {
	return typeof global[fn] === "function";
});
/**
* Singleton class for `require-in-the-middle`
* Allows instrumentation plugins to patch modules with only a single `require` patch
* WARNING: Because this class will create its own `require-in-the-middle` (RITM) instance,
* we should minimize the number of new instances of this class.
* Multiple instances of `@opentelemetry/instrumentation` (e.g. multiple versions) in a single process
* will result in multiple instances of RITM, which will have an impact
* on the performance of instrumentation hooks being applied.
*/
var RequireInTheMiddleSingleton = class RequireInTheMiddleSingleton {
	_moduleNameTrie = new ModuleNameTrie();
	static _instance;
	constructor() {
		this._initialize();
	}
	_initialize() {
		new Hook(null, { internals: true }, (exports, name, basedir) => {
			const normalizedModuleName = normalizePathSeparators(name);
			const matches = this._moduleNameTrie.search(normalizedModuleName, {
				maintainInsertionOrder: true,
				fullOnly: basedir === void 0
			});
			for (const { onRequire } of matches) exports = onRequire(exports, name, basedir);
			return exports;
		});
	}
	/**
	* Register a hook with `require-in-the-middle`
	*
	* @param {string} moduleName Module name
	* @param {OnRequireFn} onRequire Hook function
	* @returns {Hooked} Registered hook
	*/
	register(moduleName, onRequire) {
		const hooked = {
			moduleName,
			onRequire
		};
		this._moduleNameTrie.insert(hooked);
		return hooked;
	}
	/**
	* Get the `RequireInTheMiddleSingleton` singleton
	*
	* @returns {RequireInTheMiddleSingleton} Singleton of `RequireInTheMiddleSingleton`
	*/
	static getInstance() {
		if (isMocha) return new RequireInTheMiddleSingleton();
		return this._instance = this._instance ?? new RequireInTheMiddleSingleton();
	}
};
/**
* Normalize the path separators to forward slash in a module name or path
*
* @param {string} moduleNameOrPath Module name or path
* @returns {string} Normalized module name or path
*/
function normalizePathSeparators(moduleNameOrPath) {
	return path.sep !== "/" ? moduleNameOrPath.split(path.sep).join("/") : moduleNameOrPath;
}
//#endregion
//#region node_modules/@opentelemetry/instrumentation/build/esm/utils.js
/**
* function to execute patched function and being able to catch errors
* @param execute - function to be executed
* @param onFinish - callback to run when execute finishes
*/
function safeExecuteInTheMiddle(execute, onFinish, preventThrowingError) {
	let error;
	let result;
	try {
		result = execute();
	} catch (e) {
		error = e;
	} finally {
		onFinish(error, result);
		if (error && !preventThrowingError) throw error;
		return result;
	}
}
/**
* Checks if certain function has been already wrapped
* @param func
*/
function isWrapped(func) {
	return typeof func === "function" && typeof func.__original === "function" && typeof func.__unwrap === "function" && func.__wrapped === true;
}
//#endregion
//#region node_modules/@opentelemetry/instrumentation/build/esm/platform/node/instrumentation.js
/**
* Base abstract class for instrumenting node plugins
*/
var InstrumentationBase = class extends InstrumentationAbstract {
	_modules;
	_hooks = [];
	_requireInTheMiddleSingleton = RequireInTheMiddleSingleton.getInstance();
	_enabled = false;
	constructor(instrumentationName, instrumentationVersion, config) {
		super(instrumentationName, instrumentationVersion, config);
		let modules = this.init();
		if (modules && !Array.isArray(modules)) modules = [modules];
		this._modules = modules || [];
		if (this._config.enabled) this.enable();
	}
	_wrap = (moduleExports, name, wrapper) => {
		if (isWrapped(moduleExports[name])) this._unwrap(moduleExports, name);
		if (!types.isProxy(moduleExports)) return wrap(moduleExports, name, wrapper);
		else {
			const wrapped = wrap(Object.assign({}, moduleExports), name, wrapper);
			Object.defineProperty(moduleExports, name, { value: wrapped });
			return wrapped;
		}
	};
	_unwrap = (moduleExports, name) => {
		if (!types.isProxy(moduleExports)) return unwrap(moduleExports, name);
		else return Object.defineProperty(moduleExports, name, { value: moduleExports[name] });
	};
	_massWrap = (moduleExportsArray, names, wrapper) => {
		if (!moduleExportsArray) {
			import_src.diag.error("must provide one or more modules to patch");
			return;
		} else if (!Array.isArray(moduleExportsArray)) moduleExportsArray = [moduleExportsArray];
		if (!(names && Array.isArray(names))) {
			import_src.diag.error("must provide one or more functions to wrap on modules");
			return;
		}
		moduleExportsArray.forEach((moduleExports) => {
			names.forEach((name) => {
				this._wrap(moduleExports, name, wrapper);
			});
		});
	};
	_massUnwrap = (moduleExportsArray, names) => {
		if (!moduleExportsArray) {
			import_src.diag.error("must provide one or more modules to patch");
			return;
		} else if (!Array.isArray(moduleExportsArray)) moduleExportsArray = [moduleExportsArray];
		if (!(names && Array.isArray(names))) {
			import_src.diag.error("must provide one or more functions to wrap on modules");
			return;
		}
		moduleExportsArray.forEach((moduleExports) => {
			names.forEach((name) => {
				this._unwrap(moduleExports, name);
			});
		});
	};
	_warnOnPreloadedModules() {
		const nodeRequire = globalThis.require;
		if (!nodeRequire?.resolve || !nodeRequire?.cache) return;
		this._modules.forEach((module) => {
			const { name } = module;
			try {
				const resolvedModule = nodeRequire.resolve(name);
				if (nodeRequire.cache[resolvedModule]?.loaded) this._diag.warn(`Module ${name} has been loaded before ${this.instrumentationName} so it might not work, please initialize it before requiring ${name}`);
			} catch {}
		});
	}
	_extractPackageVersion(baseDir) {
		try {
			const json = readFileSync(path.join(baseDir, "package.json"), { encoding: "utf8" });
			const version = JSON.parse(json).version;
			return typeof version === "string" ? version : void 0;
		} catch {
			import_src.diag.warn("Failed extracting version", baseDir);
		}
	}
	_onRequire(module, exports, name, baseDir) {
		if (!baseDir) {
			if (typeof module.patch === "function") {
				module.moduleExports = exports;
				if (this._enabled) {
					this._diag.debug("Applying instrumentation patch for nodejs core module on require hook", { module: module.name });
					return module.patch(exports);
				}
			}
			return exports;
		}
		const version = this._extractPackageVersion(baseDir);
		module.moduleVersion = version;
		if (module.name === name) {
			if (isSupported(module.supportedVersions, version, module.includePrerelease)) {
				if (typeof module.patch === "function") {
					module.moduleExports = exports;
					if (this._enabled) {
						this._diag.debug("Applying instrumentation patch for module on require hook", {
							module: module.name,
							version: module.moduleVersion,
							baseDir
						});
						return module.patch(exports, module.moduleVersion);
					}
				}
			}
			return exports;
		}
		const files = module.files ?? [];
		const normalizedName = path.normalize(name);
		return files.filter((f) => f.name === normalizedName && isSupported(f.supportedVersions, version, module.includePrerelease)).reduce((patchedExports, file) => {
			file.moduleExports = patchedExports;
			if (this._enabled) {
				this._diag.debug("Applying instrumentation patch for nodejs module file on require hook", {
					module: module.name,
					version: module.moduleVersion,
					fileName: file.name,
					baseDir
				});
				return file.patch(patchedExports, module.moduleVersion);
			}
			return patchedExports;
		}, exports);
	}
	enable() {
		if (this._enabled) return;
		this._enabled = true;
		if (this._hooks.length > 0) {
			for (const module of this._modules) {
				if (typeof module.patch === "function" && module.moduleExports) {
					this._diag.debug("Applying instrumentation patch for nodejs module on instrumentation enabled", {
						module: module.name,
						version: module.moduleVersion
					});
					module.patch(module.moduleExports, module.moduleVersion);
				}
				for (const file of module.files) if (file.moduleExports) {
					this._diag.debug("Applying instrumentation patch for nodejs module file on instrumentation enabled", {
						module: module.name,
						version: module.moduleVersion,
						fileName: file.name
					});
					file.patch(file.moduleExports, module.moduleVersion);
				}
			}
			return;
		}
		this._warnOnPreloadedModules();
		for (const module of this._modules) {
			const hookFn = (exports, name, baseDir) => {
				if (!baseDir && path.isAbsolute(name)) {
					const parsedPath = path.parse(name);
					name = parsedPath.name;
					baseDir = parsedPath.dir;
				}
				return this._onRequire(module, exports, name, baseDir);
			};
			const onRequire = (exports, name, baseDir) => {
				return this._onRequire(module, exports, name, baseDir);
			};
			const hook = path.isAbsolute(module.name) ? new Hook([module.name], { internals: true }, onRequire) : this._requireInTheMiddleSingleton.register(module.name, onRequire);
			this._hooks.push(hook);
			const esmHook = new Hook$1([module.name], { internals: true }, hookFn);
			this._hooks.push(esmHook);
		}
	}
	disable() {
		if (!this._enabled) return;
		this._enabled = false;
		for (const module of this._modules) {
			if (typeof module.unpatch === "function" && module.moduleExports) {
				this._diag.debug("Removing instrumentation patch for nodejs module on instrumentation disabled", {
					module: module.name,
					version: module.moduleVersion
				});
				module.unpatch(module.moduleExports, module.moduleVersion);
			}
			for (const file of module.files) if (file.moduleExports) {
				this._diag.debug("Removing instrumentation patch for nodejs module file on instrumentation disabled", {
					module: module.name,
					version: module.moduleVersion,
					fileName: file.name
				});
				file.unpatch(file.moduleExports, module.moduleVersion);
			}
		}
	}
	isEnabled() {
		return this._enabled;
	}
};
function isSupported(supportedVersions, version, includePrerelease) {
	if (typeof version === "undefined") return supportedVersions.includes("*");
	return supportedVersions.some((supportedVersion) => {
		return satisfies(version, supportedVersion, { includePrerelease });
	});
}
//#endregion
//#region node_modules/@opentelemetry/instrumentation/build/esm/instrumentationNodeModuleDefinition.js
var InstrumentationNodeModuleDefinition = class {
	files;
	name;
	supportedVersions;
	patch;
	unpatch;
	constructor(name, supportedVersions, patch, unpatch, files) {
		this.files = files || [];
		this.name = name;
		this.supportedVersions = supportedVersions;
		this.patch = patch;
		this.unpatch = unpatch;
	}
};
//#endregion
export { registerInstrumentations as a, safeExecuteInTheMiddle as i, InstrumentationBase as n, isWrapped as r, InstrumentationNodeModuleDefinition as t };
