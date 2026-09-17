//#region node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js
var NoopLogger = class {
	emit(_logRecord) {}
	enabled() {
		return false;
	}
};
var NOOP_LOGGER = new NoopLogger();
//#endregion
//#region node_modules/@opentelemetry/api-logs/build/esm/internal/global-utils.js
var GLOBAL_LOGS_API_KEY = Symbol.for("io.opentelemetry.js.api.logs");
var _global = globalThis;
/**
* Make a function which accepts a version integer and returns the instance of an API if the version
* is compatible, or a fallback version (usually NOOP) if it is not.
*
* @param requiredVersion Backwards compatibility version which is required to return the instance
* @param instance Instance which should be returned if the required version is compatible
* @param fallback Fallback instance, usually NOOP, which will be returned if the required version is not compatible
*/
function makeGetter(requiredVersion, instance, fallback) {
	return (version) => version === requiredVersion ? instance : fallback;
}
//#endregion
//#region node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js
var NoopLoggerProvider = class {
	getLogger(_name, _version, _options) {
		return new NoopLogger();
	}
};
var NOOP_LOGGER_PROVIDER = new NoopLoggerProvider();
//#endregion
//#region node_modules/@opentelemetry/api-logs/build/esm/ProxyLogger.js
var ProxyLogger = class {
	constructor(provider, name, version, options) {
		this._provider = provider;
		this.name = name;
		this.version = version;
		this.options = options;
	}
	/**
	* Emit a log record. This method should only be used by log appenders.
	*
	* @param logRecord
	*/
	emit(logRecord) {
		this._getLogger().emit(logRecord);
	}
	enabled(options) {
		return this._getLogger().enabled(options);
	}
	/**
	* Try to get a logger from the proxy logger provider.
	* If the proxy logger provider has no delegate, return a noop logger.
	*/
	_getLogger() {
		if (this._delegate) return this._delegate;
		const logger = this._provider._getDelegateLogger(this.name, this.version, this.options);
		if (!logger) return NOOP_LOGGER;
		this._delegate = logger;
		return this._delegate;
	}
};
//#endregion
//#region node_modules/@opentelemetry/api-logs/build/esm/ProxyLoggerProvider.js
var ProxyLoggerProvider = class {
	getLogger(name, version, options) {
		var _a;
		return (_a = this._getDelegateLogger(name, version, options)) !== null && _a !== void 0 ? _a : new ProxyLogger(this, name, version, options);
	}
	/**
	* Get the delegate logger provider.
	* Used by tests only.
	* @internal
	*/
	_getDelegate() {
		var _a;
		return (_a = this._delegate) !== null && _a !== void 0 ? _a : NOOP_LOGGER_PROVIDER;
	}
	/**
	* Set the delegate logger provider
	* @internal
	*/
	_setDelegate(delegate) {
		this._delegate = delegate;
	}
	/**
	* @internal
	*/
	_getDelegateLogger(name, version, options) {
		var _a;
		return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getLogger(name, version, options);
	}
};
//#endregion
//#region node_modules/@opentelemetry/api-logs/build/esm/index.js
var logs = class LogsAPI {
	constructor() {
		this._proxyLoggerProvider = new ProxyLoggerProvider();
	}
	static getInstance() {
		if (!this._instance) this._instance = new LogsAPI();
		return this._instance;
	}
	setGlobalLoggerProvider(provider) {
		if (_global[GLOBAL_LOGS_API_KEY]) return this.getLoggerProvider();
		_global[GLOBAL_LOGS_API_KEY] = makeGetter(1, provider, NOOP_LOGGER_PROVIDER);
		this._proxyLoggerProvider._setDelegate(provider);
		return provider;
	}
	/**
	* Returns the global logger provider.
	*
	* @returns LoggerProvider
	*/
	getLoggerProvider() {
		var _a, _b;
		return (_b = (_a = _global[GLOBAL_LOGS_API_KEY]) === null || _a === void 0 ? void 0 : _a.call(_global, 1)) !== null && _b !== void 0 ? _b : this._proxyLoggerProvider;
	}
	/**
	* Returns a Logger, creating one if one with the given name, version,
	* schemaUrl, and attributes is not already created.
	*
	* Getting a Logger may be expensive, especially when `attributes` are
	* provided. Reuse Logger instances where possible instead of calling
	* `getLogger()` on hot paths.
	*
	* @param name The name of the logger or instrumentation library.
	* @param version The version of the logger or instrumentation library.
	* @param options The options of the logger or instrumentation library.
	* @returns {@link Logger}
	*/
	getLogger(name, version, options) {
		return this.getLoggerProvider().getLogger(name, version, options);
	}
	/** Remove the global logger provider */
	disable() {
		delete _global[GLOBAL_LOGS_API_KEY];
		this._proxyLoggerProvider = new ProxyLoggerProvider();
	}
}.getInstance();
//#endregion
export { logs as t };
