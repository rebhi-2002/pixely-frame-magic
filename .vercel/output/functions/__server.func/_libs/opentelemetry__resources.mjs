import { i as __toESM } from "../_runtime.mjs";
import { t as require_src } from "./opentelemetry__api.mjs";
import { d as SDK_INFO, f as require_src$1 } from "./@opentelemetry/core+[...].mjs";
//#region node_modules/@opentelemetry/resources/build/esm/default-service-name.js
var import_src = /* @__PURE__ */ __toESM(require_src());
var import_src$1 = require_src$1();
var serviceName;
/**
* Returns the default service name for OpenTelemetry resources.
* In Node.js environments, returns "unknown_service:<process.argv0>".
* In browser/edge environments, returns "unknown_service".
*/
function defaultServiceName() {
	if (serviceName === void 0) try {
		const argv0 = globalThis.process.argv0;
		serviceName = argv0 ? `unknown_service:${argv0}` : "unknown_service";
	} catch {
		serviceName = "unknown_service";
	}
	return serviceName;
}
//#endregion
//#region node_modules/@opentelemetry/resources/build/esm/utils.js
var isPromiseLike = (val) => {
	return val !== null && typeof val === "object" && typeof val.then === "function";
};
//#endregion
//#region node_modules/@opentelemetry/resources/build/esm/ResourceImpl.js
var ResourceImpl = class ResourceImpl {
	_rawAttributes;
	_asyncAttributesPending = false;
	_schemaUrl;
	_memoizedAttributes;
	static FromAttributeList(attributes, options) {
		const res = new ResourceImpl({}, options);
		res._rawAttributes = guardedRawAttributes(attributes);
		res._asyncAttributesPending = attributes.filter(([_, val]) => isPromiseLike(val)).length > 0;
		return res;
	}
	constructor(resource, options) {
		const attributes = resource.attributes ?? {};
		this._rawAttributes = Object.entries(attributes).map(([k, v]) => {
			if (isPromiseLike(v)) this._asyncAttributesPending = true;
			return [k, v];
		});
		this._rawAttributes = guardedRawAttributes(this._rawAttributes);
		this._schemaUrl = validateSchemaUrl(options?.schemaUrl);
	}
	get asyncAttributesPending() {
		return this._asyncAttributesPending;
	}
	async waitForAsyncAttributes() {
		if (!this.asyncAttributesPending) return;
		for (let i = 0; i < this._rawAttributes.length; i++) {
			const [k, v] = this._rawAttributes[i];
			this._rawAttributes[i] = [k, isPromiseLike(v) ? await v : v];
		}
		this._asyncAttributesPending = false;
	}
	get attributes() {
		if (this.asyncAttributesPending) import_src.diag.error("Accessing resource attributes before async attributes settled");
		if (this._memoizedAttributes) return this._memoizedAttributes;
		const attrs = {};
		for (const [k, v] of this._rawAttributes) {
			if (isPromiseLike(v)) {
				import_src.diag.debug(`Unsettled resource attribute ${k} skipped`);
				continue;
			}
			if (v != null) attrs[k] ??= v;
		}
		if (!this._asyncAttributesPending) this._memoizedAttributes = attrs;
		return attrs;
	}
	getRawAttributes() {
		return this._rawAttributes;
	}
	get schemaUrl() {
		return this._schemaUrl;
	}
	merge(resource) {
		if (resource == null) return this;
		const mergedSchemaUrl = mergeSchemaUrl(this, resource);
		const mergedOptions = mergedSchemaUrl ? { schemaUrl: mergedSchemaUrl } : void 0;
		return ResourceImpl.FromAttributeList([...resource.getRawAttributes(), ...this.getRawAttributes()], mergedOptions);
	}
};
function resourceFromAttributes(attributes, options) {
	return ResourceImpl.FromAttributeList(Object.entries(attributes), options);
}
function defaultResource() {
	return resourceFromAttributes({
		[import_src$1.ATTR_SERVICE_NAME]: defaultServiceName(),
		[import_src$1.ATTR_TELEMETRY_SDK_LANGUAGE]: SDK_INFO[import_src$1.ATTR_TELEMETRY_SDK_LANGUAGE],
		[import_src$1.ATTR_TELEMETRY_SDK_NAME]: SDK_INFO[import_src$1.ATTR_TELEMETRY_SDK_NAME],
		[import_src$1.ATTR_TELEMETRY_SDK_VERSION]: SDK_INFO[import_src$1.ATTR_TELEMETRY_SDK_VERSION]
	});
}
function guardedRawAttributes(attributes) {
	return attributes.map(([k, v]) => {
		if (isPromiseLike(v)) return [k, v.catch((err) => {
			import_src.diag.debug("promise rejection for resource attribute: %s - %s", k, err);
		})];
		return [k, v];
	});
}
function validateSchemaUrl(schemaUrl) {
	if (typeof schemaUrl === "string" || schemaUrl === void 0) return schemaUrl;
	import_src.diag.warn("Schema URL must be string or undefined, got %s. Schema URL will be ignored.", schemaUrl);
}
function mergeSchemaUrl(old, updating) {
	const oldSchemaUrl = old?.schemaUrl;
	const updatingSchemaUrl = updating?.schemaUrl;
	const isOldEmpty = oldSchemaUrl === void 0 || oldSchemaUrl === "";
	const isUpdatingEmpty = updatingSchemaUrl === void 0 || updatingSchemaUrl === "";
	if (isOldEmpty) return updatingSchemaUrl;
	if (isUpdatingEmpty) return oldSchemaUrl;
	if (oldSchemaUrl === updatingSchemaUrl) return oldSchemaUrl;
	import_src.diag.warn("Schema URL merge conflict: old resource has \"%s\", updating resource has \"%s\". Resulting resource will have undefined Schema URL.", oldSchemaUrl, updatingSchemaUrl);
}
//#endregion
export { defaultResource as t };
