import { i as __toESM } from "../_runtime.mjs";
import { t as require_src } from "./opentelemetry__api.mjs";
import { _ as sanitizeAttributes, a as hrTime, c as isTimeInputHrTime, f as require_src$1, g as isAttributeValue, h as globalErrorHandler, i as addHrTimes, l as millisToHrTime, o as hrTimeDuration, s as isTimeInput, u as otperformance, y as isTracingSuppressed } from "./@opentelemetry/core+[...].mjs";
import { t as defaultResource } from "./opentelemetry__resources.mjs";
//#region node_modules/@opentelemetry/sdk-trace/build/esm/enums.js
var import_src = /* @__PURE__ */ __toESM(require_src());
var import_src$1 = require_src$1();
var ExceptionEventName = "exception";
//#endregion
//#region node_modules/@opentelemetry/sdk-trace/build/esm/inspect.js
/**
* Well-known symbol used by Node.js `util.inspect` (and `console.*`) to
* render an object via a custom representation. Defined as a global Symbol
* so it works without importing from `node:util`, keeping this module safe
* for browser builds (where the symbol is simply never looked up).
*/
var inspectCustom = Symbol.for("nodejs.util.inspect.custom");
/**
* Collect a Resource's settled attributes without touching the
* `attributes` getter, which emits diag.error/debug entries when async
* attribute detectors are still pending. Promise-like (unsettled)
* entries are silently skipped so logging a Span/Tracer/Provider during
* startup doesn't recurse through the diag pipeline.
*/
function settledResourceAttributes(resource) {
	const attrs = {};
	for (const [k, v] of resource.getRawAttributes()) {
		if (typeof v?.then === "function") continue;
		if (v != null) attrs[k] ??= v;
	}
	return attrs;
}
/**
* Build a class-tagged inspect representation. Returns a stub like
* `[ClassName]` once the recursion budget is exhausted, otherwise returns
* `ClassName <inspected payload>` so nested fields keep proper coloring,
* indentation, and depth handling. In environments that don't supply an
* `inspect` callback (e.g. browsers), falls back to returning the raw
* payload object.
*/
function formatInspect(className, payload, depth, options, inspect) {
	if (typeof depth === "number" && depth < 0) {
		const tag = `[${className}]`;
		return options?.stylize ? options.stylize(tag, "special") : tag;
	}
	if (typeof inspect !== "function" || !options) return payload;
	return `${className} ${inspect(payload, {
		...options,
		depth: options.depth == null ? options.depth : options.depth - 1
	})}`;
}
//#endregion
//#region node_modules/@opentelemetry/sdk-trace/build/esm/Span.js
/**
* This class represents a span.
*/
var SpanImpl = class {
	_spanContext;
	kind;
	parentSpanContext;
	attributes = {};
	links = [];
	events = [];
	startTime;
	resource;
	instrumentationScope;
	_droppedAttributesCount = 0;
	_droppedEventsCount = 0;
	_droppedLinksCount = 0;
	_attributesCount = 0;
	name;
	status = { code: import_src.SpanStatusCode.UNSET };
	endTime = [0, 0];
	_ended = false;
	_duration = [-1, -1];
	_spanProcessor;
	_spanLimits;
	_attributeValueLengthLimit;
	_recordEndMetrics;
	_performanceStartTime;
	_performanceOffset;
	_startTimeProvided;
	/**
	* Constructs a new SpanImpl instance.
	*/
	constructor(opts) {
		const now = Date.now();
		this._spanContext = opts.spanContext;
		this._performanceStartTime = otperformance.now();
		this._performanceOffset = now - (this._performanceStartTime + otperformance.timeOrigin);
		this._startTimeProvided = opts.startTime != null;
		this._spanLimits = opts.spanLimits;
		this._attributeValueLengthLimit = this._spanLimits.attributeValueLengthLimit ?? 0;
		this._spanProcessor = opts.spanProcessor;
		this.name = opts.name;
		this.parentSpanContext = opts.parentSpanContext;
		this.kind = opts.kind;
		if (opts.links) for (const link of opts.links) this.addLink(link);
		this.startTime = this._getTime(opts.startTime ?? now);
		this.resource = opts.resource;
		this.instrumentationScope = opts.scope;
		this._recordEndMetrics = opts.recordEndMetrics;
		if (opts.attributes != null) this.setAttributes(opts.attributes);
		this._spanProcessor.onStart(this, opts.context);
	}
	spanContext() {
		return this._spanContext;
	}
	setAttribute(key, value) {
		if (value == null || this._isSpanEnded()) return this;
		if (key.length === 0) {
			import_src.diag.warn(`Invalid attribute key: ${key}`);
			return this;
		}
		if (!isAttributeValue(value)) {
			import_src.diag.warn(`Invalid attribute value set for key: ${key}`);
			return this;
		}
		const { attributeCountLimit } = this._spanLimits;
		const isNewKey = !Object.prototype.hasOwnProperty.call(this.attributes, key);
		if (attributeCountLimit !== void 0 && this._attributesCount >= attributeCountLimit && isNewKey) {
			this._droppedAttributesCount++;
			return this;
		}
		this.attributes[key] = this._truncateToSize(value);
		if (isNewKey) this._attributesCount++;
		return this;
	}
	setAttributes(attributes) {
		for (const key in attributes) if (Object.prototype.hasOwnProperty.call(attributes, key)) this.setAttribute(key, attributes[key]);
		return this;
	}
	/**
	*
	* @param name Span Name
	* @param [attributesOrStartTime] Span attributes or start time
	*     if type is {@type TimeInput} and 3rd param is undefined
	* @param [timeStamp] Specified time stamp for the event
	*/
	addEvent(name, attributesOrStartTime, timeStamp) {
		if (this._isSpanEnded()) return this;
		const { eventCountLimit } = this._spanLimits;
		if (eventCountLimit === 0) {
			import_src.diag.warn("No events allowed.");
			this._droppedEventsCount++;
			return this;
		}
		if (eventCountLimit !== void 0 && this.events.length >= eventCountLimit) {
			if (this._droppedEventsCount === 0) import_src.diag.debug("Dropping extra events.");
			this.events.shift();
			this._droppedEventsCount++;
		}
		if (isTimeInput(attributesOrStartTime)) {
			if (!isTimeInput(timeStamp)) timeStamp = attributesOrStartTime;
			attributesOrStartTime = void 0;
		}
		const sanitized = sanitizeAttributes(attributesOrStartTime);
		const { attributePerEventCountLimit } = this._spanLimits;
		const attributes = {};
		let droppedAttributesCount = 0;
		let eventAttributesCount = 0;
		for (const attr in sanitized) {
			if (!Object.prototype.hasOwnProperty.call(sanitized, attr)) continue;
			const attrVal = sanitized[attr];
			if (attributePerEventCountLimit !== void 0 && eventAttributesCount >= attributePerEventCountLimit) {
				droppedAttributesCount++;
				continue;
			}
			attributes[attr] = this._truncateToSize(attrVal);
			eventAttributesCount++;
		}
		this.events.push({
			name,
			attributes,
			time: this._getTime(timeStamp),
			droppedAttributesCount
		});
		return this;
	}
	addLink(link) {
		if (this._isSpanEnded()) return this;
		const { linkCountLimit } = this._spanLimits;
		if (linkCountLimit === 0) {
			this._droppedLinksCount++;
			return this;
		}
		if (linkCountLimit !== void 0 && this.links.length >= linkCountLimit) {
			if (this._droppedLinksCount === 0) import_src.diag.debug("Dropping extra links.");
			this.links.shift();
			this._droppedLinksCount++;
		}
		const { attributePerLinkCountLimit } = this._spanLimits;
		const sanitized = sanitizeAttributes(link.attributes);
		const attributes = {};
		let droppedAttributesCount = 0;
		let linkAttributesCount = 0;
		for (const attr in sanitized) {
			if (!Object.prototype.hasOwnProperty.call(sanitized, attr)) continue;
			const attrVal = sanitized[attr];
			if (attributePerLinkCountLimit !== void 0 && linkAttributesCount >= attributePerLinkCountLimit) {
				droppedAttributesCount++;
				continue;
			}
			attributes[attr] = this._truncateToSize(attrVal);
			linkAttributesCount++;
		}
		const processedLink = { context: link.context };
		if (linkAttributesCount > 0) processedLink.attributes = attributes;
		if (droppedAttributesCount > 0) processedLink.droppedAttributesCount = droppedAttributesCount;
		this.links.push(processedLink);
		return this;
	}
	addLinks(links) {
		for (const link of links) this.addLink(link);
		return this;
	}
	setStatus(status) {
		if (this._isSpanEnded()) return this;
		if (status.code === import_src.SpanStatusCode.UNSET) return this;
		if (this.status.code === import_src.SpanStatusCode.OK) return this;
		const newStatus = { code: status.code };
		if (status.code === import_src.SpanStatusCode.ERROR) {
			if (typeof status.message === "string") newStatus.message = status.message;
			else if (status.message != null) import_src.diag.warn(`Dropping invalid status.message of type '${typeof status.message}', expected 'string'`);
		}
		this.status = newStatus;
		return this;
	}
	updateName(name) {
		if (this._isSpanEnded()) return this;
		this.name = name;
		return this;
	}
	end(endTime) {
		if (this._isSpanEnded()) {
			import_src.diag.error(`${this.name} ${this._spanContext.traceId}-${this._spanContext.spanId} - You can only call end() on a span once.`);
			return;
		}
		this.endTime = this._getTime(endTime);
		this._duration = hrTimeDuration(this.startTime, this.endTime);
		if (this._duration[0] < 0) {
			import_src.diag.warn("Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.", this.startTime, this.endTime);
			this.endTime = this.startTime.slice();
			this._duration = [0, 0];
		}
		if (this._droppedEventsCount > 0) import_src.diag.warn(`Dropped ${this._droppedEventsCount} events because eventCountLimit reached`);
		if (this._droppedLinksCount > 0) import_src.diag.warn(`Dropped ${this._droppedLinksCount} links because linkCountLimit reached`);
		if (this._spanProcessor.onEnding) this._spanProcessor.onEnding(this);
		this._recordEndMetrics?.();
		this._ended = true;
		this._spanProcessor.onEnd(this);
	}
	_getTime(inp) {
		if (typeof inp === "number" && inp <= otperformance.now()) return hrTime(inp + this._performanceOffset);
		if (typeof inp === "number") return millisToHrTime(inp);
		if (inp instanceof Date) return millisToHrTime(inp.getTime());
		if (isTimeInputHrTime(inp)) return inp;
		if (this._startTimeProvided) return millisToHrTime(Date.now());
		const msDuration = otperformance.now() - this._performanceStartTime;
		return addHrTimes(this.startTime, millisToHrTime(msDuration));
	}
	isRecording() {
		return this._ended === false;
	}
	recordException(exception, time) {
		const attributes = {};
		if (typeof exception === "string") attributes[import_src$1.ATTR_EXCEPTION_MESSAGE] = exception;
		else if (exception) {
			if (exception.code) attributes[import_src$1.ATTR_EXCEPTION_TYPE] = exception.code.toString();
			else if (exception.name) attributes[import_src$1.ATTR_EXCEPTION_TYPE] = exception.name;
			if (exception.message) attributes[import_src$1.ATTR_EXCEPTION_MESSAGE] = exception.message;
			if (exception.stack) attributes[import_src$1.ATTR_EXCEPTION_STACKTRACE] = exception.stack;
		}
		if (attributes[import_src$1.ATTR_EXCEPTION_TYPE] || attributes[import_src$1.ATTR_EXCEPTION_MESSAGE]) this.addEvent(ExceptionEventName, attributes, time);
		else import_src.diag.warn(`Failed to record an exception ${exception}`);
	}
	get duration() {
		return this._duration;
	}
	get ended() {
		return this._ended;
	}
	get droppedAttributesCount() {
		return this._droppedAttributesCount;
	}
	get droppedEventsCount() {
		return this._droppedEventsCount;
	}
	get droppedLinksCount() {
		return this._droppedLinksCount;
	}
	_isSpanEnded() {
		if (this._ended) {
			const error = /* @__PURE__ */ new Error(`Operation attempted on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`);
			import_src.diag.warn(`Cannot execute the operation on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`, error);
		}
		return this._ended;
	}
	_truncateToLimitUtil(value, limit) {
		if (value.length <= limit) return value;
		return value.substring(0, limit);
	}
	/**
	* If the given attribute value is of type string and has more characters than given {@code attributeValueLengthLimit} then
	* return string with truncated to {@code attributeValueLengthLimit} characters
	*
	* If the given attribute value is array of strings then
	* return new array of strings with each element truncated to {@code attributeValueLengthLimit} characters
	*
	* Otherwise return same Attribute {@code value}
	*
	* @param value Attribute value
	* @returns truncated attribute value if required, otherwise same value
	*/
	_truncateToSize(value) {
		const limit = this._attributeValueLengthLimit;
		if (limit <= 0) {
			import_src.diag.warn(`Attribute value limit must be positive, got ${limit}`);
			return value;
		}
		if (typeof value === "string") return this._truncateToLimitUtil(value, limit);
		if (Array.isArray(value)) return value.map((val) => typeof val === "string" ? this._truncateToLimitUtil(val, limit) : val);
		return value;
	}
	[inspectCustom](depth, options, inspect) {
		return formatInspect("SpanImpl", {
			name: this.name,
			kind: this.kind,
			spanContext: this._spanContext,
			parentSpanContext: this.parentSpanContext,
			status: this.status,
			startTime: this.startTime,
			endTime: this.endTime,
			duration: this._duration,
			ended: this._ended,
			attributes: this.attributes,
			events: this.events,
			links: this.links,
			droppedAttributesCount: this._droppedAttributesCount,
			droppedEventsCount: this._droppedEventsCount,
			droppedLinksCount: this._droppedLinksCount,
			instrumentationScope: this.instrumentationScope,
			resource: { attributes: settledResourceAttributes(this.resource) }
		}, depth, options, inspect);
	}
};
//#endregion
//#region node_modules/@opentelemetry/sdk-trace/build/esm/Sampler.js
/**
* A sampling decision that determines how a {@link Span} will be recorded
* and collected.
*/
var SamplingDecision;
(function(SamplingDecision) {
	/**
	* `Span.isRecording() === false`, span will not be recorded and all events
	* and attributes will be dropped.
	*/
	SamplingDecision[SamplingDecision["NOT_RECORD"] = 0] = "NOT_RECORD";
	/**
	* `Span.isRecording() === true`, but `Sampled` flag in {@link TraceFlags}
	* MUST NOT be set.
	*/
	SamplingDecision[SamplingDecision["RECORD"] = 1] = "RECORD";
	/**
	* `Span.isRecording() === true` AND `Sampled` flag in {@link TraceFlags}
	* MUST be set.
	*/
	SamplingDecision[SamplingDecision["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
})(SamplingDecision || (SamplingDecision = {}));
//#endregion
//#region node_modules/@opentelemetry/sdk-trace/build/esm/semconv.js
/**
* Determines whether the span has a parent span, and if so, [whether it is a remote parent](https://opentelemetry.io/docs/specs/otel/trace/api/#isremote)
*
* @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
*/
var ATTR_OTEL_SPAN_PARENT_ORIGIN = "otel.span.parent.origin";
/**
* The result value of the sampler for this span
*
* @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
*/
var ATTR_OTEL_SPAN_SAMPLING_RESULT = "otel.span.sampling_result";
/**
* The number of created spans with `recording=true` for which the end operation has not been called yet.
*
* @experimental This metric is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
*/
var METRIC_OTEL_SDK_SPAN_LIVE = "otel.sdk.span.live";
/**
* The number of created spans.
*
* @note Implementations **MUST** record this metric for all spans, even for non-recording ones.
*
* @experimental This metric is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
*/
var METRIC_OTEL_SDK_SPAN_STARTED = "otel.sdk.span.started";
//#endregion
//#region node_modules/@opentelemetry/sdk-trace/build/esm/TracerMetrics.js
/**
* Generates `otel.sdk.span.*` metrics.
* https://opentelemetry.io/docs/specs/semconv/otel/sdk-metrics/#span-metrics
*/
var TracerMetrics = class {
	startedSpans;
	liveSpans;
	constructor(meter) {
		this.startedSpans = meter.createCounter(METRIC_OTEL_SDK_SPAN_STARTED, {
			unit: "{span}",
			description: "The number of created spans."
		});
		this.liveSpans = meter.createUpDownCounter(METRIC_OTEL_SDK_SPAN_LIVE, {
			unit: "{span}",
			description: "The number of currently live spans."
		});
	}
	startSpan(parentSpanCtx, samplingDecision) {
		const samplingDecisionStr = samplingDecisionToString(samplingDecision);
		this.startedSpans.add(1, {
			[ATTR_OTEL_SPAN_PARENT_ORIGIN]: parentOrigin(parentSpanCtx),
			[ATTR_OTEL_SPAN_SAMPLING_RESULT]: samplingDecisionStr
		});
		if (samplingDecision === SamplingDecision.NOT_RECORD) return () => {};
		const liveSpanAttributes = { [ATTR_OTEL_SPAN_SAMPLING_RESULT]: samplingDecisionStr };
		this.liveSpans.add(1, liveSpanAttributes);
		return () => {
			this.liveSpans.add(-1, liveSpanAttributes);
		};
	}
};
function parentOrigin(parentSpanContext) {
	if (!parentSpanContext) return "none";
	if (parentSpanContext.isRemote) return "remote";
	return "local";
}
function samplingDecisionToString(decision) {
	switch (decision) {
		case SamplingDecision.RECORD_AND_SAMPLED: return "RECORD_AND_SAMPLE";
		case SamplingDecision.RECORD: return "RECORD_ONLY";
		case SamplingDecision.NOT_RECORD: return "DROP";
	}
}
//#endregion
//#region node_modules/@opentelemetry/sdk-trace/build/esm/version.js
var VERSION = "2.11.0";
//#endregion
//#region node_modules/@opentelemetry/sdk-trace/build/esm/Tracer.js
/**
* This class represents a basic tracer.
*/
var Tracer = class {
	_sampler;
	_spanLimits;
	_idGenerator;
	instrumentationScope;
	_resource;
	_spanProcessor;
	_tracerMetrics;
	/**
	* Constructs a new Tracer instance.
	*/
	constructor(instrumentationScope, options) {
		this.instrumentationScope = instrumentationScope;
		this._sampler = options.sampler;
		this._spanLimits = options.spanLimits;
		this._resource = options.resource;
		this._idGenerator = options.idGenerator;
		this._spanProcessor = options.spanProcessor;
		const meter = options.meterProvider.getMeter("@opentelemetry/sdk-trace", VERSION);
		this._tracerMetrics = new TracerMetrics(meter);
	}
	/**
	* Starts a new Span or returns the default NoopSpan based on the sampling
	* decision.
	*/
	startSpan(name, options = {}, context = import_src.context.active()) {
		if (options.root) context = import_src.trace.deleteSpan(context);
		const parentSpan = import_src.trace.getSpan(context);
		if (isTracingSuppressed(context)) {
			import_src.diag.debug("Instrumentation suppressed, returning Noop Span");
			return import_src.trace.wrapSpanContext(import_src.INVALID_SPAN_CONTEXT);
		}
		const parentSpanContext = parentSpan?.spanContext();
		const spanId = this._idGenerator.generateSpanId();
		let validParentSpanContext;
		let traceId;
		let traceState;
		if (!parentSpanContext || !import_src.trace.isSpanContextValid(parentSpanContext)) traceId = this._idGenerator.generateTraceId();
		else {
			traceId = parentSpanContext.traceId;
			traceState = parentSpanContext.traceState;
			validParentSpanContext = parentSpanContext;
		}
		const spanKind = options.kind ?? import_src.SpanKind.INTERNAL;
		const links = (options.links ?? []).map((link) => {
			return {
				context: link.context,
				attributes: sanitizeAttributes(link.attributes)
			};
		});
		const attributes = sanitizeAttributes(options.attributes);
		const samplingResult = this._sampler.shouldSample(context, traceId, name, spanKind, attributes, links);
		const recordEndMetrics = this._tracerMetrics.startSpan(parentSpanContext, samplingResult.decision);
		traceState = samplingResult.traceState ?? traceState;
		const traceFlags = samplingResult.decision === import_src.SamplingDecision.RECORD_AND_SAMPLED ? import_src.TraceFlags.SAMPLED : import_src.TraceFlags.NONE;
		const spanContext = {
			traceId,
			spanId,
			traceFlags,
			traceState
		};
		if (samplingResult.decision === import_src.SamplingDecision.NOT_RECORD) {
			import_src.diag.debug("Recording is off, propagating context in a non-recording span");
			return import_src.trace.wrapSpanContext(spanContext);
		}
		const initAttributes = sanitizeAttributes(Object.assign(attributes, samplingResult.attributes));
		return new SpanImpl({
			resource: this._resource,
			scope: this.instrumentationScope,
			context,
			spanContext,
			name,
			kind: spanKind,
			links,
			parentSpanContext: validParentSpanContext,
			attributes: initAttributes,
			startTime: options.startTime,
			spanProcessor: this._spanProcessor,
			spanLimits: this._spanLimits,
			recordEndMetrics
		});
	}
	startActiveSpan(name, arg2, arg3, arg4) {
		let opts;
		let ctx;
		let fn;
		if (arguments.length < 2) return;
		else if (arguments.length === 2) fn = arg2;
		else if (arguments.length === 3) {
			opts = arg2;
			fn = arg3;
		} else {
			opts = arg2;
			ctx = arg3;
			fn = arg4;
		}
		const parentContext = ctx ?? import_src.context.active();
		const span = this.startSpan(name, opts, parentContext);
		const contextWithSpanSet = import_src.trace.setSpan(parentContext, span);
		return import_src.context.with(contextWithSpanSet, fn, void 0, span);
	}
	[inspectCustom](depth, options, inspect) {
		return formatInspect("Tracer", {
			instrumentationScope: this.instrumentationScope,
			resource: { attributes: settledResourceAttributes(this._resource) },
			spanLimits: this._spanLimits
		}, depth, options, inspect);
	}
};
//#endregion
//#region node_modules/@opentelemetry/sdk-trace/build/esm/MultiSpanProcessor.js
/**
* Implementation of the {@link SpanProcessor} that simply forwards all
* received events to a list of {@link SpanProcessor}s.
*/
var MultiSpanProcessor = class {
	_spanProcessors;
	constructor(spanProcessors) {
		this._spanProcessors = spanProcessors;
	}
	forceFlush() {
		const promises = [];
		for (const spanProcessor of this._spanProcessors) promises.push(spanProcessor.forceFlush());
		return new Promise((resolve) => {
			Promise.all(promises).then(() => {
				resolve();
			}).catch((error) => {
				globalErrorHandler(error || /* @__PURE__ */ new Error("MultiSpanProcessor: forceFlush failed"));
				resolve();
			});
		});
	}
	onStart(span, context) {
		for (const spanProcessor of this._spanProcessors) spanProcessor.onStart(span, context);
	}
	onEnding(span) {
		for (const spanProcessor of this._spanProcessors) if (spanProcessor.onEnding) spanProcessor.onEnding(span);
	}
	onEnd(span) {
		for (const spanProcessor of this._spanProcessors) spanProcessor.onEnd(span);
	}
	shutdown() {
		const promises = [];
		for (const spanProcessor of this._spanProcessors) promises.push(spanProcessor.shutdown());
		return new Promise((resolve, reject) => {
			Promise.all(promises).then(() => {
				resolve();
			}, reject);
		});
	}
};
//#endregion
//#region node_modules/@opentelemetry/sdk-trace/build/esm/sampler/AlwaysOffSampler.js
/** Sampler that samples no traces. */
var AlwaysOffSampler = class {
	shouldSample() {
		return { decision: SamplingDecision.NOT_RECORD };
	}
	toString() {
		return "AlwaysOffSampler";
	}
};
//#endregion
//#region node_modules/@opentelemetry/sdk-trace/build/esm/sampler/AlwaysOnSampler.js
/** Sampler that samples all traces. */
var AlwaysOnSampler = class {
	shouldSample() {
		return { decision: SamplingDecision.RECORD_AND_SAMPLED };
	}
	toString() {
		return "AlwaysOnSampler";
	}
};
//#endregion
//#region node_modules/@opentelemetry/sdk-trace/build/esm/sampler/ParentBasedSampler.js
/**
* A composite sampler that either respects the parent span's sampling decision
* or delegates to `delegateSampler` for root spans.
*/
var ParentBasedSampler = class {
	_root;
	_remoteParentSampled;
	_remoteParentNotSampled;
	_localParentSampled;
	_localParentNotSampled;
	constructor(config) {
		this._root = config.root;
		if (!this._root) {
			globalErrorHandler(/* @__PURE__ */ new Error("ParentBasedSampler must have a root sampler configured"));
			this._root = new AlwaysOnSampler();
		}
		this._remoteParentSampled = config.remoteParentSampled ?? new AlwaysOnSampler();
		this._remoteParentNotSampled = config.remoteParentNotSampled ?? new AlwaysOffSampler();
		this._localParentSampled = config.localParentSampled ?? new AlwaysOnSampler();
		this._localParentNotSampled = config.localParentNotSampled ?? new AlwaysOffSampler();
	}
	shouldSample(context, traceId, spanName, spanKind, attributes, links) {
		const parentContext = import_src.trace.getSpanContext(context);
		if (!parentContext || !(0, import_src.isSpanContextValid)(parentContext)) return this._root.shouldSample(context, traceId, spanName, spanKind, attributes, links);
		if (parentContext.isRemote) {
			if (parentContext.traceFlags & import_src.TraceFlags.SAMPLED) return this._remoteParentSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
			return this._remoteParentNotSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
		}
		if (parentContext.traceFlags & import_src.TraceFlags.SAMPLED) return this._localParentSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
		return this._localParentNotSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
	}
	toString() {
		return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`;
	}
};
//#endregion
//#region node_modules/@opentelemetry/sdk-trace/build/esm/platform/node/RandomIdGenerator.js
var SPAN_ID_BYTES = 8;
var TRACE_ID_BYTES = 16;
var RandomIdGenerator = class {
	/**
	* Returns a random 16-byte trace ID formatted/encoded as a 32 lowercase hex
	* characters corresponding to 128 bits.
	*/
	generateTraceId = getIdGenerator(TRACE_ID_BYTES);
	/**
	* Returns a random 8-byte span ID formatted/encoded as a 16 lowercase hex
	* characters corresponding to 64 bits.
	*/
	generateSpanId = getIdGenerator(SPAN_ID_BYTES);
};
var SHARED_BUFFER = Buffer.allocUnsafe(TRACE_ID_BYTES);
function getIdGenerator(bytes) {
	return function generateId() {
		for (let i = 0; i < bytes / 4; i++) SHARED_BUFFER.writeUInt32BE(Math.random() * 2 ** 32 >>> 0, i * 4);
		for (let i = 0; i < bytes; i++) if (SHARED_BUFFER[i] > 0) break;
		else if (i === bytes - 1) SHARED_BUFFER[bytes - 1] = 1;
		return SHARED_BUFFER.toString("hex", 0, bytes);
	};
}
//#endregion
//#region node_modules/@opentelemetry/sdk-trace/build/esm/TracerProvider.js
var ForceFlushState;
(function(ForceFlushState) {
	ForceFlushState[ForceFlushState["resolved"] = 0] = "resolved";
	ForceFlushState[ForceFlushState["timeout"] = 1] = "timeout";
	ForceFlushState[ForceFlushState["error"] = 2] = "error";
	ForceFlushState[ForceFlushState["unresolved"] = 3] = "unresolved";
})(ForceFlushState || (ForceFlushState = {}));
/**
* This class represents a basic tracer provider which platform libraries can extend
*/
var TracerProvider = class {
	_resource;
	_activeSpanProcessor;
	_forceFlushTimeoutMillis;
	_tracerOptions;
	_tracers = /* @__PURE__ */ new Map();
	constructor(options = {}) {
		this._forceFlushTimeoutMillis = options.forceFlushTimeoutMillis ?? 3e4;
		this._resource = options.resource ?? defaultResource();
		const spanProcessors = options.spanProcessors ?? [];
		this._activeSpanProcessor = new MultiSpanProcessor(spanProcessors);
		this._tracerOptions = {
			resource: this._resource,
			sampler: options.sampler ?? new ParentBasedSampler({ root: new AlwaysOnSampler() }),
			spanLimits: {
				attributeCountLimit: options.spanLimits?.attributeCountLimit ?? 128,
				attributeValueLengthLimit: options.spanLimits?.attributeValueLengthLimit ?? Infinity,
				eventCountLimit: options.spanLimits?.eventCountLimit ?? 128,
				linkCountLimit: options.spanLimits?.linkCountLimit ?? 128,
				attributePerEventCountLimit: options.spanLimits?.attributePerEventCountLimit ?? 128,
				attributePerLinkCountLimit: options.spanLimits?.attributePerLinkCountLimit ?? 128
			},
			idGenerator: options.idGenerator || new RandomIdGenerator(),
			spanProcessor: this._activeSpanProcessor,
			meterProvider: options.meterProvider ?? { getMeter() {
				return (0, import_src.createNoopMeter)();
			} }
		};
	}
	getTracer(name, version, options) {
		const key = `${name}@${version || ""}:${options?.schemaUrl || ""}`;
		if (!this._tracers.has(key)) this._tracers.set(key, new Tracer({
			name,
			version,
			schemaUrl: options?.schemaUrl
		}, this._tracerOptions));
		return this._tracers.get(key);
	}
	forceFlush(options) {
		const timeout = options?.timeoutMillis ?? this._forceFlushTimeoutMillis;
		const promises = this._activeSpanProcessor["_spanProcessors"].map((spanProcessor) => {
			return new Promise((resolve) => {
				let state;
				const timeoutInterval = setTimeout(() => {
					resolve(/* @__PURE__ */ new Error(`Span processor did not completed within timeout period of ${timeout} ms`));
					state = ForceFlushState.timeout;
				}, timeout);
				spanProcessor.forceFlush().then(() => {
					clearTimeout(timeoutInterval);
					if (state !== ForceFlushState.timeout) {
						state = ForceFlushState.resolved;
						resolve(state);
					}
				}).catch((error) => {
					clearTimeout(timeoutInterval);
					state = ForceFlushState.error;
					resolve(error);
				});
			});
		});
		return new Promise((resolve, reject) => {
			Promise.all(promises).then((results) => {
				const errors = results.filter((result) => result !== ForceFlushState.resolved);
				if (errors.length > 0) reject(errors);
				else resolve();
			}).catch((error) => reject([error]));
		});
	}
	shutdown() {
		return this._activeSpanProcessor.shutdown();
	}
	[inspectCustom](depth, options, inspect) {
		const processors = this._activeSpanProcessor["_spanProcessors"];
		return formatInspect("TracerProvider", {
			resource: { attributes: settledResourceAttributes(this._resource) },
			tracers: Array.from(this._tracers.keys()),
			spanProcessors: processors.map((p) => p.constructor?.name ?? "SpanProcessor")
		}, depth, options, inspect);
	}
};
//#endregion
//#region node_modules/@opentelemetry/sdk-trace/build/esm/sampler/TraceIdRatioBasedSampler.js
/** Sampler that samples a given fraction of traces based of trace id deterministically. */
var TraceIdRatioBasedSampler = class {
	_ratio;
	_upperBound;
	constructor(ratio = 0) {
		this._ratio = this._normalize(ratio);
		this._upperBound = this._ratio === 1 ? 4294967296 : Math.floor(this._ratio * 4294967295);
	}
	shouldSample(context, traceId) {
		return { decision: (0, import_src.isValidTraceId)(traceId) && this._accumulate(traceId) < this._upperBound ? SamplingDecision.RECORD_AND_SAMPLED : SamplingDecision.NOT_RECORD };
	}
	toString() {
		return `TraceIdRatioBased{${this._ratio}}`;
	}
	_normalize(ratio) {
		if (typeof ratio !== "number" || isNaN(ratio)) return 0;
		return ratio >= 1 ? 1 : ratio <= 0 ? 0 : ratio;
	}
	_accumulate(traceId) {
		let accumulation = 0;
		for (let i = 0; i < 32; i += 8) {
			let part = 0;
			for (let j = 0; j < 8; j++) {
				const c = traceId.charCodeAt(i + j);
				const v = c < 58 ? c - 48 : c < 71 ? c - 55 : c - 87;
				part = part << 4 | v;
			}
			accumulation = (accumulation ^ part) >>> 0;
		}
		return accumulation;
	}
};
//#endregion
export { AlwaysOffSampler as a, AlwaysOnSampler as i, TracerProvider as n, SamplingDecision as o, ParentBasedSampler as r, TraceIdRatioBasedSampler as t };
