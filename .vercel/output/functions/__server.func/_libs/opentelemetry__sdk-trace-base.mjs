import { i as __toESM } from "../_runtime.mjs";
import { t as require_src } from "./opentelemetry__api.mjs";
import { m as getStringFromEnv, p as getNumberFromEnv, t as merge } from "./@opentelemetry/core+[...].mjs";
import { a as AlwaysOffSampler, i as AlwaysOnSampler, n as TracerProvider, r as ParentBasedSampler, t as TraceIdRatioBasedSampler } from "./opentelemetry__sdk-trace.mjs";
//#region node_modules/@opentelemetry/sdk-trace-base/build/esm/config.js
var import_src = /* @__PURE__ */ __toESM(require_src());
var TracesSamplerValues;
(function(TracesSamplerValues) {
	TracesSamplerValues["AlwaysOff"] = "always_off";
	TracesSamplerValues["AlwaysOn"] = "always_on";
	TracesSamplerValues["ParentBasedAlwaysOff"] = "parentbased_always_off";
	TracesSamplerValues["ParentBasedAlwaysOn"] = "parentbased_always_on";
	TracesSamplerValues["ParentBasedTraceIdRatio"] = "parentbased_traceidratio";
	TracesSamplerValues["TraceIdRatio"] = "traceidratio";
})(TracesSamplerValues || (TracesSamplerValues = {}));
var DEFAULT_RATIO = 1;
/**
* Load default configuration. For fields with primitive values, any user-provided
* value will override the corresponding default value. For fields with
* non-primitive values (like `spanLimits`), the user-provided value will be
* used to extend the default value.
*/
function loadDefaultConfig() {
	return {
		sampler: buildSamplerFromEnv(),
		forceFlushTimeoutMillis: 3e4,
		generalLimits: {
			attributeValueLengthLimit: getNumberFromEnv("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? Infinity,
			attributeCountLimit: getNumberFromEnv("OTEL_ATTRIBUTE_COUNT_LIMIT") ?? 128
		},
		spanLimits: {
			attributeValueLengthLimit: getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? Infinity,
			attributeCountLimit: getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT") ?? 128,
			linkCountLimit: getNumberFromEnv("OTEL_SPAN_LINK_COUNT_LIMIT") ?? 128,
			eventCountLimit: getNumberFromEnv("OTEL_SPAN_EVENT_COUNT_LIMIT") ?? 128,
			attributePerEventCountLimit: getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT") ?? 128,
			attributePerLinkCountLimit: getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT") ?? 128
		}
	};
}
/**
* Based on environment, builds a sampler, complies with specification.
*/
function buildSamplerFromEnv() {
	const sampler = getStringFromEnv("OTEL_TRACES_SAMPLER") ?? TracesSamplerValues.ParentBasedAlwaysOn;
	switch (sampler) {
		case TracesSamplerValues.AlwaysOn: return new AlwaysOnSampler();
		case TracesSamplerValues.AlwaysOff: return new AlwaysOffSampler();
		case TracesSamplerValues.ParentBasedAlwaysOn: return new ParentBasedSampler({ root: new AlwaysOnSampler() });
		case TracesSamplerValues.ParentBasedAlwaysOff: return new ParentBasedSampler({ root: new AlwaysOffSampler() });
		case TracesSamplerValues.TraceIdRatio: return new TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv());
		case TracesSamplerValues.ParentBasedTraceIdRatio: return new ParentBasedSampler({ root: new TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv()) });
		default:
			import_src.diag.error(`OTEL_TRACES_SAMPLER value "${sampler}" invalid, defaulting to "${TracesSamplerValues.ParentBasedAlwaysOn}".`);
			return new ParentBasedSampler({ root: new AlwaysOnSampler() });
	}
}
function getSamplerProbabilityFromEnv() {
	const probability = getNumberFromEnv("OTEL_TRACES_SAMPLER_ARG");
	if (probability == null) {
		import_src.diag.error(`OTEL_TRACES_SAMPLER_ARG is blank, defaulting to ${DEFAULT_RATIO}.`);
		return DEFAULT_RATIO;
	}
	if (probability < 0 || probability > 1) {
		import_src.diag.error(`OTEL_TRACES_SAMPLER_ARG=${probability} was given, but it is out of range ([0..1]), defaulting to ${DEFAULT_RATIO}.`);
		return DEFAULT_RATIO;
	}
	return probability;
}
/**
* When general limits are provided and model specific limits are not,
* configures the model specific limits by using the values from the general ones.
* @param userConfig User provided tracer configuration
*/
function reconfigureLimits(userConfig) {
	const spanLimits = Object.assign({}, userConfig.spanLimits);
	/**
	* Reassign span attribute count limit to use first non null value defined by user or use default value
	*/
	spanLimits.attributeCountLimit = userConfig.spanLimits?.attributeCountLimit ?? userConfig.generalLimits?.attributeCountLimit ?? getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT") ?? getNumberFromEnv("OTEL_ATTRIBUTE_COUNT_LIMIT") ?? 128;
	/**
	* Reassign span attribute value length limit to use first non null value defined by user or use default value
	*/
	spanLimits.attributeValueLengthLimit = userConfig.spanLimits?.attributeValueLengthLimit ?? userConfig.generalLimits?.attributeValueLengthLimit ?? getNumberFromEnv("OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? getNumberFromEnv("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? Infinity;
	return Object.assign({}, userConfig, { spanLimits });
}
//#endregion
//#region node_modules/@opentelemetry/sdk-trace-base/build/esm/BasicTracerProvider-shim.js
/**
* A TracerProvider implementation that reads configuration defaults from
* OTEL_* environment variables per
* https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/
*/
var BasicTracerProvider = class extends TracerProvider {
	constructor(config = {}) {
		const mergedConfig = merge({}, loadDefaultConfig(), reconfigureLimits(config));
		delete mergedConfig.generalLimits;
		super(mergedConfig);
	}
};
//#endregion
export { BasicTracerProvider as t };
