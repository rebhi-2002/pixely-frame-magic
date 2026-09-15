import "../_runtime.mjs";
import { n as parseCookies, r as toResponse, t as H3Event } from "../_libs/h3-v2+rou3+srvx.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { A as _getRenderedMatches, B as rootRouteId, D as getStylesheetHref, E as getScriptPreloadAttrs, I as isRedirect, L as isResolvedRedirect, M as invariant, O as resolveManifestAssetLink, R as parseRedirect, V as isNotFound, a as isSsrResponse, c as stripSsrResponseBody, i as disposeSsrResponseDetached, j as executeRewriteInput, k as resolveManifestCssLink, n as bindSsrResponseToRequest, o as normalizeSsrResponse, p as RouterProvider, r as defineHandlerCallback, s as replaceSsrResponse, t as renderRouterToStream } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createMemoryHistory } from "../_libs/tanstack__history.mjs";
import { a as getOrigin, c as createSerializationAdapter, d as toCrossJSONAsync, f as toCrossJSONStream, i as getNormalizedURL, l as makeSerovalPlugin, n as mergeHeaders, o as defaultSerovalPlugins, r as attachRouterServerSsrUtils, s as createRawStreamRPCPlugin, t as waitForRequest, u as fromJSON } from "../_libs/@tanstack/router-core+[...].mjs";
import { AsyncLocalStorage } from "node:async_hooks";
//#region node_modules/.nitro/vite/services/ssr/assets/rolldown-runtime-D7D4PA-g.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/createMiddleware-B_4t7rW1.js
var createMiddleware = (options, __opts) => {
	const resolvedOptions = {
		type: "request",
		...__opts || options
	};
	const setValidator = (validator) => {
		return createMiddleware({}, Object.assign(resolvedOptions, {
			validator,
			inputValidator: validator
		}));
	};
	return {
		options: resolvedOptions,
		middleware: (middleware) => {
			return createMiddleware({}, Object.assign(resolvedOptions, { middleware }));
		},
		validator: setValidator,
		inputValidator: setValidator,
		client: (client) => {
			return createMiddleware({}, Object.assign(resolvedOptions, { client }));
		},
		server: (server) => {
			return createMiddleware({}, Object.assign(resolvedOptions, { server }));
		}
	};
};
require_react();
var import_jsx_runtime = require_jsx_runtime();
function StartServer(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouterProvider, { router: props.router });
}
var defaultStreamHandler = defineHandlerCallback(({ request, router, responseHeaders }) => renderRouterToStream({
	request,
	router,
	responseHeaders,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartServer, { router })
}));
var GLOBAL_EVENT_STORAGE_KEY = Symbol.for("tanstack-start:event-storage");
var globalObj$1 = globalThis;
if (!globalObj$1[GLOBAL_EVENT_STORAGE_KEY]) globalObj$1[GLOBAL_EVENT_STORAGE_KEY] = new AsyncLocalStorage();
var eventStorage = globalObj$1[GLOBAL_EVENT_STORAGE_KEY];
function isPromiseLike(value) {
	return typeof value.then === "function";
}
function getSetCookieValues(headers) {
	const headersWithSetCookie = headers;
	if (typeof headersWithSetCookie.getSetCookie === "function") return headersWithSetCookie.getSetCookie();
	const value = headers.get("set-cookie");
	return value ? [value] : [];
}
function mergeEventResponseHeaders(response, event) {
	if (response.ok) return;
	const eventSetCookies = getSetCookieValues(event.res.headers);
	if (eventSetCookies.length === 0) return;
	const responseSetCookies = getSetCookieValues(response.headers);
	response.headers.delete("set-cookie");
	for (const cookie of responseSetCookies) response.headers.append("set-cookie", cookie);
	for (const cookie of eventSetCookies) response.headers.append("set-cookie", cookie);
}
function attachResponseHeaders(value, event) {
	if (isPromiseLike(value)) return value.then((resolved) => {
		if (resolved instanceof Response) mergeEventResponseHeaders(resolved, event);
		return resolved;
	});
	if (value instanceof Response) mergeEventResponseHeaders(value, event);
	return value;
}
function requestHandler(handler) {
	return (request, requestOpts) => {
		let h3Event;
		try {
			h3Event = new H3Event(request);
		} catch (error) {
			if (error instanceof URIError) return new Response(null, {
				status: 400,
				statusText: "Bad Request"
			});
			throw error;
		}
		return toResponse(attachResponseHeaders(eventStorage.run({ h3Event }, () => handler(request, requestOpts)), h3Event), h3Event);
	};
}
function getH3Event() {
	const event = eventStorage.getStore();
	if (!event) throw new Error(`No StartEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
	return event.h3Event;
}
/**
* Parse the request to get HTTP Cookie header string and return an object of all cookie name-value pairs.
* @returns Object of cookie name-value pairs
* ```ts
* const cookies = getCookies()
* ```
*/
function getCookies() {
	const cookies = parseCookies(getH3Event());
	const definedCookies = Object.create(null);
	for (const [name, value] of Object.entries(cookies)) if (value !== void 0) definedCookies[name] = value;
	return definedCookies;
}
/**
* Get a cookie value by name.
* @param name Name of the cookie to get
* @returns {*} Value of the cookie (String or undefined)
* ```ts
* const authorization = getCookie('Authorization')
* ```
*/
function getCookie(name) {
	return getCookies()[name];
}
function getResponse() {
	return getH3Event().res;
}
var HEADERS = { TSS_SHELL: "X-TSS_SHELL" };
/**
* @description Returns the router manifest data that should be sent to the client.
* This includes only the assets and preloads for the current route and any
* special assets that are needed for the client. It does not include relationships
* between routes or any other data that is not needed for the client.
*
* @param matchedRoutes - In dev mode, the matched routes are used to build
* the dev styles URL for route-scoped CSS collection.
*/
async function getStartManifest(matchedRoutes) {
	const { tsrStartManifest } = await import("../_tanstack-start-manifest_v-Bmk2dijJ.mjs");
	const startManifest = tsrStartManifest();
	let routes = startManifest.routes;
	routes[rootRouteId];
	const manifestRoutes = {};
	for (const k in routes) {
		const v = routes[k];
		const result = {};
		if (v.preloads && v.preloads.length > 0) result.preloads = v.preloads;
		if (v.scripts && v.scripts.length > 0) result.scripts = v.scripts;
		if (v.css?.length) result.css = v.css;
		if (result.preloads || result.scripts || result.css) manifestRoutes[k] = result;
	}
	return {
		...startManifest.scriptFormat ? { scriptFormat: startManifest.scriptFormat } : {},
		...startManifest.inlineCss ? { inlineCss: startManifest.inlineCss } : {},
		routes: manifestRoutes
	};
}
var manifest = {
	"0056f1cd0bc28e715f0f35fa23b4e00d7d6a23a774345fe9d9f44aecda5963d4": {
		functionName: "deleteTeacherVerification_createServerFn_handler",
		importer: () => import("./admin-moderation.functions-BKBoMMGu.mjs")
	},
	"01b4b38b290ec4f0c228ccf6fa465f0271138e65c8a3a034d2e56b30c7e21592": {
		functionName: "listMockExams_createServerFn_handler",
		importer: () => import("./student-evaluation.functions-Dbh2XXzV.mjs")
	},
	"034b2c7e0457f7f9fe084fe9c10a268ed12ece6f6759483be1d0fb7626214e9e": {
		functionName: "deletePayment_createServerFn_handler",
		importer: () => import("./admin-curriculum.functions-B9LowUPI.mjs")
	},
	"046f4a6b8f538c8c0c556690c0f079e43d7ba75af1adb0d4be6f84f0895a4456": {
		functionName: "saveTeacherCourse_createServerFn_handler",
		importer: () => import("./teacher-teaching.functions-BdiGMGlg.mjs")
	},
	"05c05276ef23a695eba190af689dde57282c0e60a194dbf8ead6e37e582f10dc": {
		functionName: "listLinkedChildren_createServerFn_handler",
		importer: () => import("./account-pages.functions-CrmIIubv.mjs")
	},
	"0e9225b5d4ead44c6d2f6c3224ab114f0d9551a98bbba1412844bfcab1960886": {
		functionName: "listMissedQuestions_createServerFn_handler",
		importer: () => import("./teacher-followup.functions-Bz668PbJ.mjs")
	},
	"134b6e150577acc595975e0bb5061b772ebcf7f0dd92ea5ff0727cbeb0301c3b": {
		functionName: "saveMissedQuestion_createServerFn_handler",
		importer: () => import("./teacher-followup.functions-Bz668PbJ.mjs")
	},
	"148792d27e9017faaa166c09163fbf6ecd49743d1e5f015d613cd3c85b5bc037": {
		functionName: "getTeacherSettings_createServerFn_handler",
		importer: () => import("./account-pages.functions-CrmIIubv.mjs")
	},
	"14dfeae8f7c297e388b050fbeac55256ab956a86fd37cf51a12393eb41b8ee71": {
		functionName: "deleteCurriculumRequest_createServerFn_handler",
		importer: () => import("./admin-curriculum.functions-B9LowUPI.mjs")
	},
	"17c7cbcadacddb13cfafcc34b88860581e6f1fc69fe080f1de912d31a302243e": {
		functionName: "saveFlashcardDeck_createServerFn_handler",
		importer: () => import("./student-learning.functions-DlWRF_Ym.mjs")
	},
	"18921d0291e054a436a3fdac83fdf6ce46560a1f81db9dc3b0ba99f144c45a67": {
		functionName: "updateWeeklyStudyMinutes_createServerFn_handler",
		importer: () => import("./student-learning.functions-DlWRF_Ym.mjs")
	},
	"189774937f1fa56f68657bdb563f59a3756b357f2b51b6d6cd10ca3a7a6a4b36": {
		functionName: "saveUpcomingTask_createServerFn_handler",
		importer: () => import("./student-learning.functions-DlWRF_Ym.mjs")
	},
	"19ac1a731ad10e924c49b22feeb607cd8af07aa13ac83ce4ef255669fc29a4e6": {
		functionName: "getParentNotificationPrefs_createServerFn_handler",
		importer: () => import("./account-pages.functions-CrmIIubv.mjs")
	},
	"1aa2c603834f631d21aa55beb8f31f4cad7b25015ab0ba458e6e8037d643cfa0": {
		functionName: "savePayment_createServerFn_handler",
		importer: () => import("./admin-curriculum.functions-B9LowUPI.mjs")
	},
	"1cdea0c6b97188d8d558dc354bc6ed656352fa07c64b92fa0f699e16bdec494b": {
		functionName: "saveCommunityReport_createServerFn_handler",
		importer: () => import("./admin-moderation.functions-BKBoMMGu.mjs")
	},
	"20d2ec7f510038d4c04059c87f2181a2b6f87cb06d11bb0af0855a917f5e4456": {
		functionName: "saveStudyStats_createServerFn_handler",
		importer: () => import("./student-learning.functions-DlWRF_Ym.mjs")
	},
	"23bd70e9a43ef675e2efe1a1ca45758bd63597d04b36b2ee5e6293e0dc1ed0e7": {
		functionName: "saveLibrarySubject_createServerFn_handler",
		importer: () => import("./student-learning.functions-DlWRF_Ym.mjs")
	},
	"24b7fee05f05712113783e48c2588dd641918416675f8198d5edc201cae7e5c4": {
		functionName: "deleteCurriculumSubject_createServerFn_handler",
		importer: () => import("./admin-curriculum.functions-B9LowUPI.mjs")
	},
	"27f6a1974f6c0ce015b01a8d6a55e178f8925b1397cfb0192e0ee019fa8b6f14": {
		functionName: "deleteMistake_createServerFn_handler",
		importer: () => import("./student-evaluation.functions-Dbh2XXzV.mjs")
	},
	"28ea03d2a77b25a144e20c579c47d14356ecd05d2fc28f26d945872a790f27e2": {
		functionName: "saveEarningTransaction_createServerFn_handler",
		importer: () => import("./teacher-followup.functions-Bz668PbJ.mjs")
	},
	"294ec8e2d8f9e5df14c50f019e0209a9b06c5af393a22951f9bca7c298ede5bd": {
		functionName: "listGradingItems_createServerFn_handler",
		importer: () => import("./teacher-followup.functions-Bz668PbJ.mjs")
	},
	"2da25a012327275c20e5155f1253847d7e3a65bb7b65df80ab296575333cd8df": {
		functionName: "saveCertificate_createServerFn_handler",
		importer: () => import("./student-evaluation.functions-Dbh2XXzV.mjs")
	},
	"2dcce702ae8e9d1d5bcd639f6df6f6770645e2b85d5defa21c2cd96c75e403b9": {
		functionName: "saveCurriculumSubject_createServerFn_handler",
		importer: () => import("./admin-curriculum.functions-B9LowUPI.mjs")
	},
	"2e8a1e2d6a5ac6cc952a211df608f4bc11a0220942009d541b90c219f64ecffc": {
		functionName: "listExamAttempts_createServerFn_handler",
		importer: () => import("./student-evaluation.functions-Dbh2XXzV.mjs")
	},
	"3135a58c264c08fb1d1d2fff6121fc4cb2986b006b5e0e299ab2424173ef295d": {
		functionName: "deleteEnrollment_createServerFn_handler",
		importer: () => import("./student-learning.functions-DlWRF_Ym.mjs")
	},
	"3139661caaef153ba0d6829a4c6c31f270780dfaa05b786e2c56963a9de9151f": {
		functionName: "listUpcomingTasks_createServerFn_handler",
		importer: () => import("./student-learning.functions-DlWRF_Ym.mjs")
	},
	"32e9506416f5fbfa8f5b142681452b4cd45713ea70fbd2537897f4e955780c21": {
		functionName: "listLibrarySubjects_createServerFn_handler",
		importer: () => import("./student-learning.functions-DlWRF_Ym.mjs")
	},
	"32fa234b43f653a6f6f6fdb24dfba669ef2d49febce159afc7d77882cdaa6fdc": {
		functionName: "listSupervisionReports_createServerFn_handler",
		importer: () => import("./supervisor-oversight.functions-DyUfBK56.mjs")
	},
	"36a8e7d90d5348651f19caedef1e6f85c726796880875c08195ff27478e958f9": {
		functionName: "listPayments_createServerFn_handler",
		importer: () => import("./admin-curriculum.functions-B9LowUPI.mjs")
	},
	"38b3d03f80497ef344bccce79059c3ac32f4e613ab876e79db943f11bc22557f": {
		functionName: "deleteScheduleEvent_createServerFn_handler",
		importer: () => import("./student-social.functions-DzPcn2MX.mjs")
	},
	"3b35a01bd5c939e1ccf817ef8e2d95da72450be263e4c90b0ec119cae61c4641": {
		functionName: "getMyAccess_createServerFn_handler",
		importer: () => import("./rbac.functions-pF_Ucuh3.mjs")
	},
	"3dfb409bd1e262ce4f4c1e5f34f2c5f739a60b8a6249ace827e4bad268b89864": {
		functionName: "listReferrals_createServerFn_handler",
		importer: () => import("./student-social.functions-DzPcn2MX.mjs")
	},
	"3f055e19d59ef7ee3242d2528d082d04ec25586910b3058202e18d231eee5275": {
		functionName: "listPublicCourses_createServerFn_handler",
		importer: () => import("./public-catalog.functions-SBL1yMLE.mjs")
	},
	"3fc9e9f8f165e07fe10c0170b509dc237ac625756a32d7da9df160b884493c5e": {
		functionName: "deleteStudentRisk_createServerFn_handler",
		importer: () => import("./supervisor-oversight.functions-DyUfBK56.mjs")
	},
	"40db4029a5135df58c815915ecc3fe29d029d7f92b5585ff77118e15457393ab": {
		functionName: "markNotificationRead_createServerFn_handler",
		importer: () => import("./account-pages.functions-CrmIIubv.mjs")
	},
	"418b07ce79b342a649fe30b3140667e82a3a02c6e14dbb0b84b49c40d4953e73": {
		functionName: "deleteBadge_createServerFn_handler",
		importer: () => import("./student-evaluation.functions-Dbh2XXzV.mjs")
	},
	"43034ba5488c5d32e01aa75ef9f1e1e1ee98c15f764a228306aeec19f47a675e": {
		functionName: "answerClassQuestion_createServerFn_handler",
		importer: () => import("./teacher-followup.functions-Bz668PbJ.mjs")
	},
	"43f41e9156f8f037555e9dde5fef858265ce8ecc9d8a8e424f7ceaa811d511d9": {
		functionName: "listModules_createServerFn_handler",
		importer: () => import("./rbac.functions-pF_Ucuh3.mjs")
	},
	"47a5e496452f06b7f9c21934e87de85c2fb6dc59bf335eb3f56d9e0c9756d3fc": {
		functionName: "getChildReport_createServerFn_handler",
		importer: () => import("./supervisor-oversight.functions-DyUfBK56.mjs")
	},
	"495ccf38f1140eb71c41ce407ee56f58fecb9ba69f32c5728c285e6a5760f8d6": {
		functionName: "saveBookmark_createServerFn_handler",
		importer: () => import("./student-social.functions-DzPcn2MX.mjs")
	},
	"4d222d1419ef7c2fd01976113e58b9162cc1f2c5d3c5f1315d516f8b156eb235": {
		functionName: "listOpenClassQuestions_createServerFn_handler",
		importer: () => import("./teacher-teaching.functions-BdiGMGlg.mjs")
	},
	"4e9bd2bbcec1ebb33729ac90c0c324338f87eab653bd57c42cb9f8aeb0c7059b": {
		functionName: "listCommunityQuestions_createServerFn_handler",
		importer: () => import("./student-social.functions-DzPcn2MX.mjs")
	},
	"58caf1642e477caa9f144b44893444d4adf0e9d4e15261042d27f0da4ebcf27d": {
		functionName: "listCommunityReports_createServerFn_handler",
		importer: () => import("./admin-moderation.functions-BKBoMMGu.mjs")
	},
	"5ae6d09dddffb12804232064fd79c690cf50804e6923694cc19f09f45829d285": {
		functionName: "deleteLibrarySubject_createServerFn_handler",
		importer: () => import("./student-learning.functions-DlWRF_Ym.mjs")
	},
	"5e034e2b9bae15a26f5324baca2f4a6915697dc45ebeb982f732a1444befc849": {
		functionName: "listTeacherVerifications_createServerFn_handler",
		importer: () => import("./admin-moderation.functions-BKBoMMGu.mjs")
	},
	"617da2fce10778a130663075e1c4855b64c29e398152cf902261d45e10f33abe": {
		functionName: "listCurriculumRequests_createServerFn_handler",
		importer: () => import("./admin-curriculum.functions-B9LowUPI.mjs")
	},
	"64a40ba867066efd81962cdda0cf7c813fff4f2a9c51dfba7bfd567879f32599": {
		functionName: "updateOwnProfile_createServerFn_handler",
		importer: () => import("./rbac.functions-pF_Ucuh3.mjs")
	},
	"67db82ff34958c94d174d9ffd634e4353214393ef2c611406ffd6e1640ad5a50": {
		functionName: "listCurriculumSubjects_createServerFn_handler",
		importer: () => import("./admin-curriculum.functions-B9LowUPI.mjs")
	},
	"68a81ce4253f3fa0977094bd590deebe808b79a5ac367ce3021b1b8201e1aa71": {
		functionName: "getEarningsSettings_createServerFn_handler",
		importer: () => import("./teacher-followup.functions-Bz668PbJ.mjs")
	},
	"68aa14d1b8034aca3740719a1ab75f8f755273a3c48e773af9075eae27b70a63": {
		functionName: "deleteRole_createServerFn_handler",
		importer: () => import("./rbac.functions-pF_Ucuh3.mjs")
	},
	"695cad4d1c8a806b887eaeac011a814b9a0cca773e8f1a6d2c75e67e0e0153ac": {
		functionName: "deleteCertificate_createServerFn_handler",
		importer: () => import("./student-evaluation.functions-Dbh2XXzV.mjs")
	},
	"73b78955938e6442c81848075d1b3db3c7ad5a49357629db5d4635ee5ff4c96f": {
		functionName: "deleteCommunityReport_createServerFn_handler",
		importer: () => import("./admin-moderation.functions-BKBoMMGu.mjs")
	},
	"75b51c1700489c67a9f42d44c24d6453e0a5fd6e33142b55e64c66be139a4b1a": {
		functionName: "deleteMockExam_createServerFn_handler",
		importer: () => import("./student-evaluation.functions-Dbh2XXzV.mjs")
	},
	"76615f39a65645059581a7acd26807300338fcbc90e88a0c6b07e4c28d56e4d5": {
		functionName: "deleteSupervisionReport_createServerFn_handler",
		importer: () => import("./supervisor-oversight.functions-DyUfBK56.mjs")
	},
	"76e2fd2965f176c3f04724099a62c6fc6e1fc5d52e4e40ebcc647d1ca0a3657e": {
		functionName: "getTeacherProfile_createServerFn_handler",
		importer: () => import("./account-pages.functions-CrmIIubv.mjs")
	},
	"771723592d3a8f99cc3b54154ca1f08f067cd1830410556fb9a97d7e25e2420d": {
		functionName: "saveCourse_createServerFn_handler",
		importer: () => import("./public-catalog.functions-SBL1yMLE.mjs")
	},
	"77d41ec318e19ceaeb7e0024e1e0acff69d01e302d9ef7e8d6343b8ec41c94c4": {
		functionName: "markAllNotificationsRead_createServerFn_handler",
		importer: () => import("./account-pages.functions-CrmIIubv.mjs")
	},
	"78e4980bd89fb0abc9968fb9f4bf81cde77e8eba337fd2a23f876bc3945c31d0": {
		functionName: "addLinkedChild_createServerFn_handler",
		importer: () => import("./account-pages.functions-CrmIIubv.mjs")
	},
	"79443092956277e07f294e87b21a2dc66b35872b2a71ae0752e0d3e8b9670af7": {
		functionName: "saveRole_createServerFn_handler",
		importer: () => import("./rbac.functions-pF_Ucuh3.mjs")
	},
	"7aa0c62786e801bf45090326f7874dcf0ebf148acfccdb8ecafab77432e5ed58": {
		functionName: "deleteContentItem_createServerFn_handler",
		importer: () => import("./teacher-teaching.functions-BdiGMGlg.mjs")
	},
	"7f66dcc378b0c1dafb40cfa8380bc2b145f6c0b5ae45591233e0d87fbd6136ca": {
		functionName: "sendPasswordReset_createServerFn_handler",
		importer: () => import("./rbac.functions-pF_Ucuh3.mjs")
	},
	"8757c19909a3789cf49325ae9b1f6d5008611e71dc1e861044f89b54dcc6cc4e": {
		functionName: "listStudentRisk_createServerFn_handler",
		importer: () => import("./supervisor-oversight.functions-DyUfBK56.mjs")
	},
	"87f7c469a8296891751747f5b6e157ce2457564493c974dcf0aa78d1d8153ba8": {
		functionName: "deleteCourse_createServerFn_handler",
		importer: () => import("./public-catalog.functions-SBL1yMLE.mjs")
	},
	"880d84d5348c2f7975a29fbf73c7e06d87e01c9da62dac172b6c8f6683fc4683": {
		functionName: "listEnrollments_createServerFn_handler",
		importer: () => import("./student-learning.functions-DlWRF_Ym.mjs")
	},
	"880e3c7e8bdcd6b1b71db7ba795b6e623dfd7e47825b69a1171bbe29ed7122ad": {
		functionName: "saveContentSubmission_createServerFn_handler",
		importer: () => import("./admin-moderation.functions-BKBoMMGu.mjs")
	},
	"899775e4ba062860e513fea2e1f85524d8d12c3bfe66010216b53b01f2a4b678": {
		functionName: "saveParentNotificationPrefs_createServerFn_handler",
		importer: () => import("./account-pages.functions-CrmIIubv.mjs")
	},
	"8a092248563a0624c12b7211096bcd8cb71825e6b0b2ae926d887fb17da6b414": {
		functionName: "listFlashcardDecks_createServerFn_handler",
		importer: () => import("./student-learning.functions-DlWRF_Ym.mjs")
	},
	"8dd3b6c45a9fa119db1efc19b61bbc7d694b6a41d1131f75bc982368db282a4b": {
		functionName: "saveCurriculumRequest_createServerFn_handler",
		importer: () => import("./admin-curriculum.functions-B9LowUPI.mjs")
	},
	"8e936cc82a8469128261ab7f749877849b2d2c587d61ecf31681b696d3f60d39": {
		functionName: "listBookmarks_createServerFn_handler",
		importer: () => import("./student-social.functions-DzPcn2MX.mjs")
	},
	"8f956e8410d327174a5b573b64cfb8eb2c059f590228898ac9af3f642e4c773c": {
		functionName: "deleteUser_createServerFn_handler",
		importer: () => import("./rbac.functions-pF_Ucuh3.mjs")
	},
	"91ad62af6b8d295f62a87a904d573184825ae3464eb755c0e0aa930e4cd55e48": {
		functionName: "listBadges_createServerFn_handler",
		importer: () => import("./student-evaluation.functions-Dbh2XXzV.mjs")
	},
	"91fba1d53d7effe772a1fa2acf1f20d3554f899c639ea07320f087ddb255d93f": {
		functionName: "saveRolePermissions_createServerFn_handler",
		importer: () => import("./rbac.functions-pF_Ucuh3.mjs")
	},
	"9203fa811ec2ac027652c40c776c72cf6ce7147fcef0bb4ec8adb8b036391504": {
		functionName: "deleteGradingItem_createServerFn_handler",
		importer: () => import("./teacher-followup.functions-Bz668PbJ.mjs")
	},
	"921deed49d145b5eb4ffac69340f9a6fed4ee5ad703f1f51f2719311dc6ff74d": {
		functionName: "saveGradingItem_createServerFn_handler",
		importer: () => import("./teacher-followup.functions-Bz668PbJ.mjs")
	},
	"92f7d529f1688491c963e0c6895627bd639f6175431e448d9914e4049569ca9e": {
		functionName: "saveContentItem_createServerFn_handler",
		importer: () => import("./teacher-teaching.functions-BdiGMGlg.mjs")
	},
	"945fc542d0be400d54cc6a72f54d7338a794e0b6c7039394b943cbc5c8239271": {
		functionName: "saveBadge_createServerFn_handler",
		importer: () => import("./student-evaluation.functions-Dbh2XXzV.mjs")
	},
	"946dd497c24bf8d36254653c7f41eb3d5c7377b174d4b5fced729318b6d150b3": {
		functionName: "setModuleEnabled_createServerFn_handler",
		importer: () => import("./rbac.functions-pF_Ucuh3.mjs")
	},
	"9557ebe27b4fd4cb2c25977e801613e5afafd5dea29b2df87088ae1692668f00": {
		functionName: "listQuizItems_createServerFn_handler",
		importer: () => import("./teacher-teaching.functions-BdiGMGlg.mjs")
	},
	"95581e0065cf10e7a54a2d917eb72b35a2dfd758b6f2bb0e05bc2f80a9344ac3": {
		functionName: "deleteBookmark_createServerFn_handler",
		importer: () => import("./student-social.functions-DzPcn2MX.mjs")
	},
	"975a6af34bcd3d88da0dbc7efed6c296902ac84412a8fbe7628a1879a58ff09a": {
		functionName: "saveEnrollment_createServerFn_handler",
		importer: () => import("./student-learning.functions-DlWRF_Ym.mjs")
	},
	"99b5124ec5172fb234fdde32fd546e1e77ae8095f879c56dd8741233340e9096": {
		functionName: "getReferralLink_createServerFn_handler",
		importer: () => import("./student-social.functions-DzPcn2MX.mjs")
	},
	"9a293f22c1bb39dae946a749d672812445a9e07dd3f6db07865944bcf6a30ad0": {
		functionName: "saveUser_createServerFn_handler",
		importer: () => import("./rbac.functions-pF_Ucuh3.mjs")
	},
	"9a5b63325de13a5610393f496963c564fc79b1295b9e3bee718459ae63860e75": {
		functionName: "listCertificates_createServerFn_handler",
		importer: () => import("./student-evaluation.functions-Dbh2XXzV.mjs")
	},
	"a1f98b33e7c030a5d200f852401002e281c268dd5f6248dc4d86b09a87ff999e": {
		functionName: "saveCommunityStats_createServerFn_handler",
		importer: () => import("./student-social.functions-DzPcn2MX.mjs")
	},
	"a8e9734b27912223c1ab5ac1107a4b1a4d79b2f1c04158a6307a72ae8879c890": {
		functionName: "listTeacherCourses_createServerFn_handler",
		importer: () => import("./teacher-teaching.functions-BdiGMGlg.mjs")
	},
	"aa03dc8fb833649809fc141180e8f16874028bb0aadb8fd3c37e781f5def72bd": {
		functionName: "listUsers_createServerFn_handler",
		importer: () => import("./rbac.functions-pF_Ucuh3.mjs")
	},
	"aa0a571bc86e80be05d767f95c87a6bb94ab2cd296490445172b40de5e0d37dd": {
		functionName: "deleteFlashcardDeck_createServerFn_handler",
		importer: () => import("./student-learning.functions-DlWRF_Ym.mjs")
	},
	"aa265f9d4c077270743ab7809e89b2d6f54749945fb3c7c7f1538e3820e3503a": {
		functionName: "saveTeacherVerification_createServerFn_handler",
		importer: () => import("./admin-moderation.functions-BKBoMMGu.mjs")
	},
	"acb22b735a6fb0cbf09ef91baa2afd1036a7b029a71bc38dd10cd11057cc08ec": {
		functionName: "deleteEarningTransaction_createServerFn_handler",
		importer: () => import("./teacher-followup.functions-Bz668PbJ.mjs")
	},
	"adce39325e1c64c7b0acbdc771158a4072d80020fc7e1976b4f4d17527097faa": {
		functionName: "listWeeklyStudyLog_createServerFn_handler",
		importer: () => import("./student-learning.functions-DlWRF_Ym.mjs")
	},
	"b182f21002f6f80ec0bb69576c34e4d9c032903c4bd6e26622f6f31bac3586de": {
		functionName: "deleteQuizItem_createServerFn_handler",
		importer: () => import("./teacher-teaching.functions-BdiGMGlg.mjs")
	},
	"b39e222eb7e7167efe58df8816f712e7522f88b7d6c8092a4ef809c3428c5405": {
		functionName: "saveCommunityQuestion_createServerFn_handler",
		importer: () => import("./student-social.functions-DzPcn2MX.mjs")
	},
	"b3bed09f94cbcba2141a2d263cd5c7527032701f0230e0c4c57883f4c1b2488a": {
		functionName: "recordReportDownload_createServerFn_handler",
		importer: () => import("./supervisor-oversight.functions-DyUfBK56.mjs")
	},
	"b3e7240a64b294422dcd5dc2f87014a45ea44a13d7c9e4717eb196e88a6389d0": {
		functionName: "listRoles_createServerFn_handler",
		importer: () => import("./rbac.functions-pF_Ucuh3.mjs")
	},
	"b7cb1a3f7592e36e568f411004c7b24d00eabcea5bddd9205b79dd2345bdc404": {
		functionName: "deleteUpcomingTask_createServerFn_handler",
		importer: () => import("./student-learning.functions-DlWRF_Ym.mjs")
	},
	"b96d976207999c28e41d8af45ef68eaa7e9d2d837ff307cca736138c69ef0afe": {
		functionName: "getPermissionMatrix_createServerFn_handler",
		importer: () => import("./rbac.functions-pF_Ucuh3.mjs")
	},
	"bc19afe533630993a35b2580eb20abae8d24705044700e86ea272d7877e47af3": {
		functionName: "saveTeacherPerformance_createServerFn_handler",
		importer: () => import("./supervisor-oversight.functions-DyUfBK56.mjs")
	},
	"bce7cbd8d456443d3108ffdb7717f92294be712c707897e2f62946bf50218fb4": {
		functionName: "saveMockExam_createServerFn_handler",
		importer: () => import("./student-evaluation.functions-Dbh2XXzV.mjs")
	},
	"c0f30b4ddc2906ecbdfbd3d966737a517ff1e17a7cf74945adf1f3fb7e645555": {
		functionName: "listClassQuestions_createServerFn_handler",
		importer: () => import("./teacher-followup.functions-Bz668PbJ.mjs")
	},
	"c1e8c448e2a2a2dd953830cda84818456adf43eb74b08e3d5b2ff21dd95e5cd2": {
		functionName: "deleteExamAttempt_createServerFn_handler",
		importer: () => import("./student-evaluation.functions-Dbh2XXzV.mjs")
	},
	"c2af62d5539af6a319c9b1dcfaa62e4d7bc0222181d6d464392239a18fe74181": {
		functionName: "listScheduleEvents_createServerFn_handler",
		importer: () => import("./student-social.functions-DzPcn2MX.mjs")
	},
	"c4512e57d4bd724cf993c69271154a30b37fd0620f2700c1465af3269f8652f6": {
		functionName: "listContentItems_createServerFn_handler",
		importer: () => import("./teacher-teaching.functions-BdiGMGlg.mjs")
	},
	"c4b0431606debfd6b50d9bfaab48d0a2173b3461778937a3dcd195e0deb82bb1": {
		functionName: "listContentSubmissions_createServerFn_handler",
		importer: () => import("./admin-moderation.functions-BKBoMMGu.mjs")
	},
	"cf8f625ddf9d97c0afb59978c67330647c1b52deab9c1fb346b2165b50b175e0": {
		functionName: "saveScheduleEvent_createServerFn_handler",
		importer: () => import("./student-social.functions-DzPcn2MX.mjs")
	},
	"cfb2ddfa8d9386bfd82f655ce1a5f177b4e55544bc56f58a05b67ba87af65361": {
		functionName: "deleteReferral_createServerFn_handler",
		importer: () => import("./student-social.functions-DzPcn2MX.mjs")
	},
	"d1f564b66ffb74be362e9a8061f9a25882969ff1a6a17ffa77ceef15ae6e20fb": {
		functionName: "listMistakes_createServerFn_handler",
		importer: () => import("./student-evaluation.functions-Dbh2XXzV.mjs")
	},
	"d43a5536b8b0831eafa3dd55c91132eab5b9d8f8298ce50a947b54bff73517a5": {
		functionName: "saveStudentRisk_createServerFn_handler",
		importer: () => import("./supervisor-oversight.functions-DyUfBK56.mjs")
	},
	"d6af381603db71f94f0af681eb2954b73ea0ae1691448625d7dd532697fbd872": {
		functionName: "deleteTeacherCourse_createServerFn_handler",
		importer: () => import("./teacher-teaching.functions-BdiGMGlg.mjs")
	},
	"d6f5561f5441032e7ce521f2939173399511517937e839dfc8dcf87c24467c30": {
		functionName: "getStudyStats_createServerFn_handler",
		importer: () => import("./student-learning.functions-DlWRF_Ym.mjs")
	},
	"d80caf0f098c78aa31057f108a5036656499fffe79d5b70cadf485c32ab37432": {
		functionName: "deleteMissedQuestion_createServerFn_handler",
		importer: () => import("./teacher-followup.functions-Bz668PbJ.mjs")
	},
	"da0025f40923a6e46e5b94b752e822f06914ce3158dcb29f4e20dc0463e0c269": {
		functionName: "unlinkChild_createServerFn_handler",
		importer: () => import("./account-pages.functions-CrmIIubv.mjs")
	},
	"e33924e2a38bd9bcc7eaf8d3e4d2ba38d1dfdef19cc6a964a3cceec3db48f78f": {
		functionName: "saveTeacherProfile_createServerFn_handler",
		importer: () => import("./account-pages.functions-CrmIIubv.mjs")
	},
	"e3debcd0c409bba8621bc272b38fe4c5e8a842e602f029be951ffda3eaa9b534": {
		functionName: "deleteNotification_createServerFn_handler",
		importer: () => import("./account-pages.functions-CrmIIubv.mjs")
	},
	"e7bbd4046cfa6c30697a2be7ded045cced65d572268e72ffa5001d5567b39bb4": {
		functionName: "getCommunityStats_createServerFn_handler",
		importer: () => import("./student-social.functions-DzPcn2MX.mjs")
	},
	"e85e65d08be80a40f13d7d67fe76b58f651e36f9498cfe7896f283cab10cfe15": {
		functionName: "listEarningTransactions_createServerFn_handler",
		importer: () => import("./teacher-followup.functions-Bz668PbJ.mjs")
	},
	"ee61da048e39adc5e4bea8de9656d5b8604a79f26d6855c016c92c892ee2a5a6": {
		functionName: "saveMistake_createServerFn_handler",
		importer: () => import("./student-evaluation.functions-Dbh2XXzV.mjs")
	},
	"f027f64d8a207bbb87f4d0241e5ea4d1374ab9953b3df1434543a8900b9aed4c": {
		functionName: "listTeacherPerformance_createServerFn_handler",
		importer: () => import("./supervisor-oversight.functions-DyUfBK56.mjs")
	},
	"f107cac690a5ad32f574e49b8124e1269d8a7bd2e373ce5032c6d009b1f183e8": {
		functionName: "deleteTeacherPerformance_createServerFn_handler",
		importer: () => import("./supervisor-oversight.functions-DyUfBK56.mjs")
	},
	"f21c393b0a6b492b106d410ee123c841b15e4ce51f4061ce336ea7804d209152": {
		functionName: "listNotifications_createServerFn_handler",
		importer: () => import("./account-pages.functions-CrmIIubv.mjs")
	},
	"f5108c2b2611057eecd4b968a8af89320a3838a1182735654927c89f893a2b31": {
		functionName: "getSupervisionSettings_createServerFn_handler",
		importer: () => import("./supervisor-oversight.functions-DyUfBK56.mjs")
	},
	"f5e4b30d72e6b06c0c65f79225dac79e4526cfa3fc0be7dd27600b50f74640d6": {
		functionName: "saveQuizItem_createServerFn_handler",
		importer: () => import("./teacher-teaching.functions-BdiGMGlg.mjs")
	},
	"f6748a7e86065ac034483ceb7673364b7a224fe791e6df709d50d049ba4d701c": {
		functionName: "saveReferral_createServerFn_handler",
		importer: () => import("./student-social.functions-DzPcn2MX.mjs")
	},
	"f6b2336fa102b4ff66872a6717ffab28578d71b809bb94377cb222de03186f28": {
		functionName: "saveTeacherSettings_createServerFn_handler",
		importer: () => import("./account-pages.functions-CrmIIubv.mjs")
	},
	"f6dcac01ced5230590267980c1d93efb04e4ad7c50d9adb484968a53f393a7ed": {
		functionName: "deleteContentSubmission_createServerFn_handler",
		importer: () => import("./admin-moderation.functions-BKBoMMGu.mjs")
	},
	"fb205e7a8e34b724348b4faafceec9ce36f492599bcf26b52c047b11a927ad9b": {
		functionName: "toggleUserStatus_createServerFn_handler",
		importer: () => import("./rbac.functions-pF_Ucuh3.mjs")
	},
	"fc1bd5b6cf0de859776c2dbf0f3bba04e7206b9135934dbad8c64591417e00ee": {
		functionName: "deleteCommunityQuestion_createServerFn_handler",
		importer: () => import("./student-social.functions-DzPcn2MX.mjs")
	},
	"fd3f8856e18c0531faead66053f0abf0250c621b380502c4b7741f9db76122db": {
		functionName: "saveExamAttempt_createServerFn_handler",
		importer: () => import("./student-evaluation.functions-Dbh2XXzV.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
var TSS_FORMDATA_CONTEXT = "__TSS_CONTEXT";
var TSS_SERVER_FUNCTION = Symbol.for("TSS_SERVER_FUNCTION");
var TSS_SERVER_FUNCTION_FACTORY = Symbol.for("TSS_SERVER_FUNCTION_FACTORY");
var X_TSS_SERIALIZED = "x-tss-serialized";
var X_TSS_RAW_RESPONSE = "x-tss-raw";
/** Content-Type for multiplexed framed responses (RawStream support) */
var TSS_CONTENT_TYPE_FRAMED = "application/x-tss-framed";
/**
* Frame types for binary multiplexing protocol.
*/
var FrameType = {
	/** Seroval JSON chunk (NDJSON line) */
	JSON: 0,
	/** Raw stream data chunk */
	CHUNK: 1,
	/** Raw stream end (EOF) */
	END: 2,
	/** Raw stream error */
	ERROR: 3
};
/** Full Content-Type header value with version parameter */
var TSS_CONTENT_TYPE_FRAMED_VERSIONED = `${TSS_CONTENT_TYPE_FRAMED}; v=1`;
function isSafeKey(key) {
	return key !== "__proto__" && key !== "constructor" && key !== "prototype";
}
/**
* Merge target and source into a new null-proto object, filtering dangerous keys.
*/
function safeObjectMerge(target, source) {
	const result = Object.create(null);
	if (target) {
		for (const key of Object.keys(target)) if (isSafeKey(key)) result[key] = target[key];
	}
	if (source && typeof source === "object") {
		for (const key of Object.keys(source)) if (isSafeKey(key)) result[key] = source[key];
	}
	return result;
}
/**
* Create a null-prototype object, optionally copying from source.
*/
function createNullProtoObject(source) {
	if (!source) return Object.create(null);
	const obj = Object.create(null);
	for (const key of Object.keys(source)) if (isSafeKey(key)) obj[key] = source[key];
	return obj;
}
var GLOBAL_STORAGE_KEY = Symbol.for("tanstack-start:start-storage-context");
var globalObj = globalThis;
if (!globalObj[GLOBAL_STORAGE_KEY]) globalObj[GLOBAL_STORAGE_KEY] = new AsyncLocalStorage();
var startStorage = globalObj[GLOBAL_STORAGE_KEY];
async function runWithStartContext(context, fn) {
	return startStorage.run(context, fn);
}
function getStartContext(opts) {
	const context = startStorage.getStore();
	if (!context && opts?.throwIfNotFound !== false) throw new Error(`No Start context found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
	return context;
}
var getStartOptions = () => getStartContext().startOptions;
var getStartContextServerOnly = getStartContext;
var createServerFn = (options, __opts) => {
	const resolvedOptions = __opts || options || {};
	if (typeof resolvedOptions.method === "undefined") resolvedOptions.method = "GET";
	const setValidator = (validator) => {
		return createServerFn(void 0, {
			...resolvedOptions,
			validator,
			inputValidator: validator
		});
	};
	const res = {
		options: resolvedOptions,
		middleware: (middleware) => {
			const newMiddleware = [...resolvedOptions.middleware || []];
			middleware.map((m) => {
				if (TSS_SERVER_FUNCTION_FACTORY in m) {
					if (m.options.middleware) newMiddleware.push(...m.options.middleware);
				} else newMiddleware.push(m);
			});
			const res = createServerFn(void 0, {
				...resolvedOptions,
				middleware: newMiddleware
			});
			res[TSS_SERVER_FUNCTION_FACTORY] = true;
			return res;
		},
		validator: setValidator,
		inputValidator: setValidator,
		handler: (...args) => {
			const [extractedFn, serverFn] = args;
			const newOptions = {
				...resolvedOptions,
				extractedFn,
				serverFn
			};
			const resolvedMiddleware = [...newOptions.middleware || [], serverFnBaseToMiddleware(newOptions)];
			extractedFn.method = resolvedOptions.method;
			return Object.assign(async (opts) => {
				const result = await executeMiddleware$1(resolvedMiddleware, "client", {
					...extractedFn,
					...newOptions,
					data: opts?.data,
					headers: opts?.headers,
					signal: opts?.signal,
					fetch: opts?.fetch,
					context: createNullProtoObject()
				});
				const redirect = parseRedirect(result.error);
				if (redirect) throw redirect;
				if (result.error) throw result.error;
				return result.result;
			}, {
				...extractedFn,
				method: resolvedOptions.method,
				__executeServer: async (opts) => {
					const startContext = getStartContextServerOnly();
					const serverContextAfterGlobalMiddlewares = startContext.contextAfterGlobalMiddlewares;
					return await executeMiddleware$1(resolvedMiddleware, "server", {
						...extractedFn,
						...opts,
						serverFnMeta: extractedFn.serverFnMeta,
						context: safeObjectMerge(opts.context, serverContextAfterGlobalMiddlewares),
						request: startContext.request
					}).then((d) => ({
						result: d.result,
						error: d.error,
						context: d.sendContext
					}));
				}
			});
		}
	};
	const fun = (options) => {
		return createServerFn(void 0, {
			...resolvedOptions,
			...options
		});
	};
	return Object.assign(fun, res);
};
async function executeMiddleware$1(middlewares, env, opts) {
	let flattenedMiddlewares = flattenMiddlewares([...getStartOptions()?.functionMiddleware || [], ...middlewares]);
	if (env === "server") {
		const startContext = getStartContextServerOnly({ throwIfNotFound: false });
		if (startContext?.executedRequestMiddlewares) flattenedMiddlewares = flattenedMiddlewares.filter((m) => !startContext.executedRequestMiddlewares.has(m));
	}
	const callNextMiddleware = async (ctx) => {
		const nextMiddleware = flattenedMiddlewares.shift();
		if (!nextMiddleware) return ctx;
		try {
			let validator = "validator" in nextMiddleware.options ? nextMiddleware.options.validator : void 0;
			if (!validator && "inputValidator" in nextMiddleware.options) validator = nextMiddleware.options.inputValidator;
			if (validator && env === "server") ctx.data = await execValidator(validator, ctx.data);
			let middlewareFn = void 0;
			if (env === "client") {
				if ("client" in nextMiddleware.options) middlewareFn = nextMiddleware.options.client;
			} else if ("server" in nextMiddleware.options) middlewareFn = nextMiddleware.options.server;
			if (middlewareFn) {
				const userNext = async (userCtx = {}) => {
					const result = await callNextMiddleware({
						...ctx,
						...userCtx,
						context: safeObjectMerge(ctx.context, userCtx.context),
						sendContext: safeObjectMerge(ctx.sendContext, userCtx.sendContext),
						headers: mergeHeaders(ctx.headers, userCtx.headers),
						_callSiteFetch: ctx._callSiteFetch,
						fetch: ctx._callSiteFetch ?? userCtx.fetch ?? ctx.fetch,
						result: userCtx.result !== void 0 ? userCtx.result : userCtx instanceof Response ? userCtx : ctx.result,
						error: userCtx.error ?? ctx.error
					});
					if (result.error) throw result.error;
					return result;
				};
				const result = await middlewareFn({
					...ctx,
					next: userNext
				});
				if (isRedirect(result)) return {
					...ctx,
					error: result
				};
				if (result instanceof Response) return {
					...ctx,
					result
				};
				if (!result) throw new Error("User middleware returned undefined. You must call next() or return a result in your middlewares.");
				return result;
			}
			return callNextMiddleware(ctx);
		} catch (error) {
			return {
				...ctx,
				error
			};
		}
	};
	return callNextMiddleware({
		...opts,
		headers: opts.headers || {},
		sendContext: opts.sendContext || {},
		context: opts.context || createNullProtoObject(),
		_callSiteFetch: opts.fetch
	});
}
function flattenMiddlewares(middlewares, maxDepth = 100) {
	const seen = /* @__PURE__ */ new Set();
	const flattened = [];
	const recurse = (middleware, depth) => {
		if (depth > maxDepth) throw new Error(`Middleware nesting depth exceeded maximum of ${maxDepth}. Check for circular references.`);
		middleware.forEach((m) => {
			if (m.options.middleware) recurse(m.options.middleware, depth + 1);
			if (!seen.has(m)) {
				seen.add(m);
				flattened.push(m);
			}
		});
	};
	recurse(middlewares, 0);
	return flattened;
}
async function execValidator(validator, input) {
	if (validator == null) return {};
	if ("~standard" in validator) {
		const result = await validator["~standard"].validate(input);
		if (result.issues) throw new Error(JSON.stringify(result.issues, void 0, 2));
		return result.value;
	}
	if ("parse" in validator) return validator.parse(input);
	if (typeof validator === "function") return validator(input);
	throw new Error("Invalid validator type!");
}
function serverFnBaseToMiddleware(options) {
	return {
		"~types": void 0,
		options: {
			inputValidator: options.validator ?? options.inputValidator,
			client: async ({ next, sendContext, fetch, ...ctx }) => {
				const payload = {
					...ctx,
					context: sendContext,
					fetch
				};
				return next(await options.extractedFn?.(payload));
			},
			server: async ({ next, ...ctx }) => {
				const result = await options.serverFn?.(ctx);
				return next({
					...ctx,
					result
				});
			}
		}
	};
}
var innerCreateCsrfMiddleware = (opts = {}) => {
	return createMiddleware().server(async (ctx) => {
		const csrfCtx = ctx;
		if (opts.filter && !await opts.filter(csrfCtx)) return ctx.next();
		if (await isCsrfRequestAllowed(opts, csrfCtx)) return ctx.next();
		return getFailureResponse(opts, csrfCtx);
	});
};
var createCsrfMiddleware = innerCreateCsrfMiddleware;
async function isCsrfRequestAllowed(opts, ctx) {
	const result = await getCsrfRequestValidationResult(opts, ctx);
	return result === true || result === void 0 && opts.allowRequestsWithoutOriginCheck === true;
}
async function getCsrfRequestValidationResult(opts, ctx) {
	const fetchSite = ctx.request.headers.get("Sec-Fetch-Site");
	if (fetchSite !== null) return matchValue(opts.secFetchSite ?? "same-origin", fetchSite, ctx);
	const origin = ctx.request.headers.get("Origin");
	if (origin !== null) {
		if (opts.origin) return matchValue(opts.origin, origin, ctx);
		return origin === new URL(ctx.request.url).origin;
	}
	const referer = ctx.request.headers.get("Referer");
	if (referer === null || opts.referer === false) return;
	if (typeof opts.referer === "function") return opts.referer(referer, ctx);
	if (opts.origin) {
		const refererOrigin = getOriginFromUrl(referer);
		return refererOrigin !== void 0 && matchValue(opts.origin, refererOrigin, ctx);
	}
	return isRefererSameOrigin(referer, new URL(ctx.request.url).origin);
}
async function matchValue(matcher, value, ctx) {
	if (typeof matcher === "function") return matcher(value, ctx);
	if (Array.isArray(matcher)) return matcher.includes(value);
	return value === matcher;
}
function getOriginFromUrl(url) {
	try {
		return new URL(url).origin;
	} catch {
		return;
	}
}
function isRefererSameOrigin(referer, requestOrigin) {
	if (referer === requestOrigin) return true;
	if (!referer.startsWith(requestOrigin)) return false;
	if (referer.length === requestOrigin.length) return true;
	const code = referer.charCodeAt(requestOrigin.length);
	return code === 47 || code === 63 || code === 35;
}
async function getFailureResponse(opts, ctx) {
	if (typeof opts.failureResponse === "function") return opts.failureResponse(ctx);
	return opts.failureResponse?.clone() ?? new Response("Forbidden", { status: 403 });
}
function getDefaultSerovalPlugins() {
	return [...(getStartOptions()?.serializationAdapters)?.map(makeSerovalPlugin) ?? [], ...defaultSerovalPlugins];
}
/**
* Binary frame protocol for multiplexing JSON and raw streams over HTTP.
*
* Frame format: [type:1][streamId:4][length:4][payload:length]
* - type: 1 byte - frame type (JSON, CHUNK, END, ERROR)
* - streamId: 4 bytes big-endian uint32 - stream identifier
* - length: 4 bytes big-endian uint32 - payload length
* - payload: variable length bytes
*/
/** Cached TextEncoder for frame encoding */
var textEncoder = new TextEncoder();
/** Shared empty payload for END frames - avoids allocation per call */
var EMPTY_PAYLOAD = /* @__PURE__ */ new Uint8Array(0);
/**
* Encodes a single frame with header and payload.
*/
function encodeFrame(type, streamId, payload) {
	const frame = new Uint8Array(9 + payload.length);
	frame[0] = type;
	frame[1] = streamId >>> 24 & 255;
	frame[2] = streamId >>> 16 & 255;
	frame[3] = streamId >>> 8 & 255;
	frame[4] = streamId & 255;
	frame[5] = payload.length >>> 24 & 255;
	frame[6] = payload.length >>> 16 & 255;
	frame[7] = payload.length >>> 8 & 255;
	frame[8] = payload.length & 255;
	frame.set(payload, 9);
	return frame;
}
/**
* Encodes a JSON frame (type 0, streamId 0).
*/
function encodeJSONFrame(json) {
	return encodeFrame(FrameType.JSON, 0, textEncoder.encode(json));
}
/**
* Encodes a raw stream chunk frame.
*/
function encodeChunkFrame(streamId, chunk) {
	return encodeFrame(FrameType.CHUNK, streamId, chunk);
}
/**
* Encodes a raw stream end frame.
*/
function encodeEndFrame(streamId) {
	return encodeFrame(FrameType.END, streamId, EMPTY_PAYLOAD);
}
/**
* Encodes a raw stream error frame.
*/
function encodeErrorFrame(streamId, error) {
	const message = error instanceof Error ? error.message : String(error ?? "Unknown error");
	return encodeFrame(FrameType.ERROR, streamId, textEncoder.encode(message));
}
/**
* Creates a multiplexed ReadableStream from JSON stream and raw streams.
*
* The JSON stream emits NDJSON lines (from seroval's toCrossJSONStream).
* Raw streams are pumped concurrently, interleaved with JSON frames.
*
* Supports late stream registration for RawStreams discovered after initial
* serialization (e.g., from resolved Promises).
*
* @param jsonStream Stream of JSON strings (each string is one NDJSON line)
* @param rawStreams Map of stream IDs to raw binary streams (known at start)
* @param lateStreamSource Optional stream of late registrations for streams discovered later
*/
function createMultiplexedStream(jsonStream, rawStreams, lateStreamSource) {
	let controller;
	let cancelled = false;
	const readers = [];
	const enqueue = (frame) => {
		if (cancelled) return false;
		try {
			controller.enqueue(frame);
			return true;
		} catch {
			return false;
		}
	};
	const errorOutput = (error) => {
		if (cancelled) return;
		cancelled = true;
		try {
			controller.error(error);
		} catch {}
		for (const reader of readers) reader.cancel().catch(() => {});
	};
	async function pumpRawStream(streamId, stream) {
		const reader = stream.getReader();
		readers.push(reader);
		try {
			while (!cancelled) {
				const { done, value } = await reader.read();
				if (done) {
					enqueue(encodeEndFrame(streamId));
					return;
				}
				if (!enqueue(encodeChunkFrame(streamId, value))) return;
			}
		} catch (error) {
			enqueue(encodeErrorFrame(streamId, error));
		} finally {
			reader.releaseLock();
		}
	}
	async function pumpJSON() {
		const reader = jsonStream.getReader();
		readers.push(reader);
		try {
			while (!cancelled) {
				const { done, value } = await reader.read();
				if (done) return;
				if (!enqueue(encodeJSONFrame(value))) return;
			}
		} catch (error) {
			errorOutput(error);
			throw error;
		} finally {
			reader.releaseLock();
		}
	}
	async function pumpLateStreams() {
		if (!lateStreamSource) return [];
		const lateStreamPumps = [];
		const reader = lateStreamSource.getReader();
		readers.push(reader);
		try {
			while (!cancelled) {
				const { done, value } = await reader.read();
				if (done) break;
				lateStreamPumps.push(pumpRawStream(value.id, value.stream));
			}
		} finally {
			reader.releaseLock();
		}
		return lateStreamPumps;
	}
	return new ReadableStream({
		async start(ctrl) {
			controller = ctrl;
			const pumps = [pumpJSON()];
			for (const [streamId, stream] of rawStreams) pumps.push(pumpRawStream(streamId, stream));
			if (lateStreamSource) pumps.push(pumpLateStreams());
			try {
				const latePumps = (await Promise.all(pumps)).find(Array.isArray);
				if (latePumps && latePumps.length > 0) await Promise.all(latePumps);
				if (!cancelled) try {
					controller.close();
				} catch {}
			} catch {}
		},
		cancel() {
			cancelled = true;
			for (const reader of readers) reader.cancel().catch(() => {});
			readers.length = 0;
		}
	});
}
var serovalPlugins = void 0;
var FORM_DATA_CONTENT_TYPES = ["multipart/form-data", "application/x-www-form-urlencoded"];
var MAX_PAYLOAD_SIZE = 1e6;
var handleServerAction = async ({ request, context, serverFnId }) => {
	const methodUpper = request.method.toUpperCase();
	const url = new URL(request.url);
	const action = await getServerFnById(serverFnId, { origin: "client" });
	if (action.method && methodUpper !== action.method) return new Response(`expected ${action.method} method. Got ${methodUpper}`, {
		status: 405,
		headers: { Allow: action.method }
	});
	const isServerFn = request.headers.get("x-tsr-serverFn") === "true";
	if (!serovalPlugins) serovalPlugins = getDefaultSerovalPlugins();
	const contentType = request.headers.get("Content-Type");
	function parsePayload(payload) {
		return fromJSON(payload, { plugins: serovalPlugins });
	}
	return await (async () => {
		try {
			let res = await (async () => {
				if (FORM_DATA_CONTENT_TYPES.some((type) => contentType && contentType.includes(type))) {
					if (methodUpper === "GET") invariant();
					const formData = await request.formData();
					const serializedContext = formData.get(TSS_FORMDATA_CONTEXT);
					formData.delete(TSS_FORMDATA_CONTEXT);
					const params = {
						context,
						data: formData,
						method: methodUpper
					};
					if (typeof serializedContext === "string") try {
						const deserializedContext = fromJSON(JSON.parse(serializedContext), { plugins: serovalPlugins });
						if (typeof deserializedContext === "object" && deserializedContext) params.context = safeObjectMerge(deserializedContext, context);
					} catch (e) {}
					return await action(params);
				}
				if (methodUpper === "GET") {
					const payloadParam = url.searchParams.get("payload");
					if (payloadParam && payloadParam.length > MAX_PAYLOAD_SIZE) throw new Error("Payload too large");
					const payload = payloadParam ? parsePayload(JSON.parse(payloadParam)) : {};
					payload.context = safeObjectMerge(payload.context, context);
					payload.method = methodUpper;
					return await action(payload);
				}
				let jsonPayload;
				if (contentType?.includes("application/json")) jsonPayload = await request.json();
				const payload = jsonPayload ? parsePayload(jsonPayload) : {};
				payload.context = safeObjectMerge(payload.context, context);
				payload.method = methodUpper;
				return await action(payload);
			})();
			const unwrapped = res.result || res.error;
			if (isNotFound(res)) res = isNotFoundResponse(res);
			if (!isServerFn) return unwrapped;
			if (unwrapped instanceof Response) {
				if (isRedirect(unwrapped)) return unwrapped;
				unwrapped.headers.set(X_TSS_RAW_RESPONSE, "true");
				return unwrapped;
			}
			return serializeResult(res);
			function serializeResult(res) {
				let nonStreamingBody = void 0;
				const alsResponse = getResponse();
				if (res !== void 0) {
					const rawStreams = /* @__PURE__ */ new Map();
					let initialPhase = true;
					let lateStreamWriter;
					let lateStreamReadable = void 0;
					const pendingLateStreams = [];
					const plugins = [createRawStreamRPCPlugin((id, stream) => {
						if (initialPhase) {
							rawStreams.set(id, stream);
							return;
						}
						if (lateStreamWriter) {
							lateStreamWriter.write({
								id,
								stream
							}).catch(() => {});
							return;
						}
						pendingLateStreams.push({
							id,
							stream
						});
					}), ...serovalPlugins || []];
					let done = false;
					const callbacks = {
						onParse: (value) => {
							nonStreamingBody = value;
						},
						onDone: () => {
							done = true;
						},
						onError: (error) => {
							throw error;
						}
					};
					toCrossJSONStream(res, {
						refs: /* @__PURE__ */ new Map(),
						plugins,
						onParse(value) {
							callbacks.onParse(value);
						},
						onDone() {
							callbacks.onDone();
						},
						onError: (error) => {
							callbacks.onError(error);
						}
					});
					initialPhase = false;
					if (done && rawStreams.size === 0) return new Response(nonStreamingBody ? JSON.stringify(nonStreamingBody) : void 0, {
						status: alsResponse.status,
						statusText: alsResponse.statusText,
						headers: {
							"Content-Type": "application/json",
							[X_TSS_SERIALIZED]: "true"
						}
					});
					const { readable, writable } = new TransformStream();
					lateStreamReadable = readable;
					lateStreamWriter = writable.getWriter();
					for (const registration of pendingLateStreams) lateStreamWriter.write(registration).catch(() => {});
					pendingLateStreams.length = 0;
					const multiplexedStream = createMultiplexedStream(new ReadableStream({
						start(controller) {
							callbacks.onParse = (value) => {
								controller.enqueue(JSON.stringify(value) + "\n");
							};
							callbacks.onDone = () => {
								try {
									controller.close();
								} catch {}
								lateStreamWriter?.close().catch(() => {}).finally(() => {
									lateStreamWriter = void 0;
								});
							};
							callbacks.onError = (error) => {
								controller.error(error);
								lateStreamWriter?.abort(error).catch(() => {}).finally(() => {
									lateStreamWriter = void 0;
								});
							};
							if (nonStreamingBody !== void 0) callbacks.onParse(nonStreamingBody);
							if (done) callbacks.onDone();
						},
						cancel() {
							lateStreamWriter?.abort().catch(() => {});
							lateStreamWriter = void 0;
						}
					}), rawStreams, lateStreamReadable);
					return new Response(multiplexedStream, {
						status: alsResponse.status,
						statusText: alsResponse.statusText,
						headers: {
							"Content-Type": TSS_CONTENT_TYPE_FRAMED_VERSIONED,
							[X_TSS_SERIALIZED]: "true"
						}
					});
				}
				return new Response(void 0, {
					status: alsResponse.status,
					statusText: alsResponse.statusText
				});
			}
		} catch (error) {
			if (error instanceof Response) return error;
			if (isNotFound(error)) return isNotFoundResponse(error);
			console.info();
			console.info("Server Fn Error!");
			console.info();
			console.error(error);
			console.info();
			const serializedError = JSON.stringify(await Promise.resolve(toCrossJSONAsync(error, {
				refs: /* @__PURE__ */ new Map(),
				plugins: serovalPlugins
			})));
			const response = getResponse();
			return new Response(serializedError, {
				status: response.status ?? 500,
				statusText: response.statusText,
				headers: {
					"Content-Type": "application/json",
					[X_TSS_SERIALIZED]: "true"
				}
			});
		}
	})();
};
function isNotFoundResponse(error) {
	const { headers, ...rest } = error;
	return new Response(JSON.stringify(rest), {
		status: 404,
		headers: {
			"Content-Type": "application/json",
			...headers || {}
		}
	});
}
var LINK_PARAM_TOKEN_RE = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
var PRELOAD_AS_VALUES = /* @__PURE__ */ new Set([
	"fetch",
	"font",
	"image",
	"script",
	"style",
	"track"
]);
function buildLinkParam(name, value) {
	if (value === void 0) return name;
	if (LINK_PARAM_TOKEN_RE.test(value)) return `${name}=${value}`;
	return `${name}=${JSON.stringify(value)}`;
}
function serializeEarlyHint(hint) {
	const parts = [`<${hint.href}>`, buildLinkParam("rel", hint.rel)];
	if (hint.as) parts.push(buildLinkParam("as", hint.as));
	if (hint.crossOrigin !== void 0) parts.push(buildLinkParam("crossorigin", hint.crossOrigin || void 0));
	if (hint.type) parts.push(buildLinkParam("type", hint.type));
	if (hint.integrity) parts.push(buildLinkParam("integrity", hint.integrity));
	if (hint.referrerPolicy) parts.push(buildLinkParam("referrerpolicy", hint.referrerPolicy));
	if (hint.fetchPriority) parts.push(buildLinkParam("fetchpriority", hint.fetchPriority));
	return parts.join("; ");
}
function getStringAttr(attrs, name, fallbackName) {
	const value = attrs?.[name] ?? (fallbackName ? attrs?.[fallbackName] : void 0);
	return typeof value === "string" ? value : void 0;
}
function getPreloadAs(attrs) {
	const as = getStringAttr(attrs, "as");
	return as && PRELOAD_AS_VALUES.has(as) ? as : void 0;
}
function addEarlyHintFetchAttrs(hint, attrs) {
	const crossOrigin = getStringAttr(attrs, "crossOrigin", "crossorigin");
	const type = getStringAttr(attrs, "type");
	const integrity = getStringAttr(attrs, "integrity");
	const referrerPolicy = getStringAttr(attrs, "referrerPolicy", "referrerpolicy");
	const fetchPriority = getStringAttr(attrs, "fetchPriority", "fetchpriority");
	if (crossOrigin !== void 0) hint.crossOrigin = crossOrigin;
	if (type) hint.type = type;
	if (integrity) hint.integrity = integrity;
	if (referrerPolicy) hint.referrerPolicy = referrerPolicy;
	if (fetchPriority) hint.fetchPriority = fetchPriority;
}
function linkAttrsToEarlyHint(attrs) {
	const href = getStringAttr(attrs, "href");
	const rel = getStringAttr(attrs, "rel");
	if (!href || !rel) return void 0;
	const relTokens = rel.split(/\s+/);
	let hintRel;
	let hintAs;
	if (relTokens.includes("modulepreload")) {
		hintRel = "modulepreload";
		hintAs = "script";
	} else if (relTokens.includes("stylesheet")) {
		hintRel = "preload";
		hintAs = "style";
	} else if (relTokens.includes("preload")) {
		hintAs = getPreloadAs(attrs);
		if (!hintAs) return void 0;
		hintRel = "preload";
	} else if (relTokens.includes("preconnect")) {
		hintRel = "preconnect";
		hintAs = void 0;
	} else if (relTokens.includes("dns-prefetch")) {
		hintRel = "dns-prefetch";
		hintAs = void 0;
	}
	if (!hintRel) return void 0;
	const hint = {
		href,
		rel: hintRel
	};
	if (hintAs) hint.as = hintAs;
	addEarlyHintFetchAttrs(hint, attrs);
	return hint;
}
function collectStaticHintsFromManifest(manifest, matchedRoutes) {
	const hints = [];
	for (const route of matchedRoutes) {
		const routeManifest = manifest.routes[route.id];
		if (!routeManifest) continue;
		for (const link of routeManifest.preloads ?? []) {
			const attrs = getScriptPreloadAttrs(manifest, link);
			const hint = {
				href: attrs.href,
				rel: attrs.rel,
				as: "script"
			};
			if (attrs.crossOrigin !== void 0) hint.crossOrigin = attrs.crossOrigin;
			hints.push(hint);
		}
		for (const link of routeManifest.css ?? []) {
			const stylesheetHref = getStylesheetHref(link);
			if (manifest.inlineCss?.styles[stylesheetHref] !== void 0) continue;
			const resolvedLink = resolveManifestCssLink(link);
			const hint = {
				href: stylesheetHref,
				rel: "preload",
				as: "style"
			};
			if (resolvedLink.crossOrigin !== void 0) hint.crossOrigin = resolvedLink.crossOrigin;
			hints.push(hint);
		}
	}
	return hints;
}
function collectDynamicHintsFromMatches(matches) {
	const hints = [];
	for (const match of matches) {
		const links = match.links;
		if (!Array.isArray(links)) continue;
		for (const link of links) {
			const hint = linkAttrsToEarlyHint(link);
			if (hint) hints.push(hint);
		}
	}
	return hints;
}
function createEarlyHintsEvent(opts) {
	const nextHints = [];
	const nextLinks = [];
	for (const hint of opts.hints) {
		const link = serializeEarlyHint(hint);
		if (opts.sentLinks.has(link)) continue;
		opts.sentLinks.add(link);
		opts.sentHints.push(hint);
		nextHints.push(hint);
		nextLinks.push(link);
	}
	if (!nextHints.length && opts.phase !== "dynamic") return void 0;
	return {
		phase: opts.phase,
		hints: nextHints,
		links: nextLinks,
		allHints: opts.sentHints.slice(),
		allLinks: Array.from(opts.sentLinks)
	};
}
function createResponseLinkHeaderEntries(opts) {
	for (const hint of opts.hints) {
		const link = serializeEarlyHint(hint);
		if (opts.sentLinks.has(link)) continue;
		opts.sentLinks.add(link);
		opts.entries.push({
			phase: opts.phase,
			hint,
			link
		});
	}
}
function getResponseLinkHeaderEntries(opts) {
	if (!opts.filter) return opts.entries.map((entry) => entry.link);
	try {
		const links = [];
		for (const entry of opts.entries) if (opts.filter(entry)) links.push(entry.link);
		return links;
	} catch (err) {
		console.error("Error filtering response Link headers:", err);
		return [];
	}
}
function notifyEarlyHints(phase, event, onEarlyHints) {
	try {
		const result = onEarlyHints(event);
		if (result) Promise.resolve(result).catch((err) => {
			console.error(`Error sending ${phase} early hints:`, err);
		});
	} catch (err) {
		console.error(`Error sending ${phase} early hints:`, err);
	}
}
function getResponseLinkHeaderFilter(responseLinkHeader) {
	if (typeof responseLinkHeader !== "object") return;
	return responseLinkHeader.filter;
}
function appendResponseLinkHeaders(opts) {
	for (const link of getResponseLinkHeaderEntries(opts)) opts.responseHeaders.append("Link", link);
}
function collectResponseLinkHeaderEntries(opts) {
	for (let index = 0; index < opts.event.hints.length; index++) opts.entries.push({
		phase: opts.phase,
		hint: opts.event.hints[index],
		link: opts.event.links[index]
	});
}
function collectEarlyHintsPhase(opts) {
	const event = opts.onEarlyHints ? createEarlyHintsEvent({
		phase: opts.phase,
		hints: opts.hints,
		sentLinks: opts.sentLinks,
		sentHints: opts.sentHints
	}) : void 0;
	if (event) notifyEarlyHints(opts.phase, event, opts.onEarlyHints);
	if (!opts.responseLinkHeaderEntries) return;
	if (event) {
		collectResponseLinkHeaderEntries({
			phase: opts.phase,
			event,
			entries: opts.responseLinkHeaderEntries
		});
		return;
	}
	createResponseLinkHeaderEntries({
		phase: opts.phase,
		hints: opts.hints,
		sentLinks: opts.sentLinks,
		entries: opts.responseLinkHeaderEntries
	});
}
function createEarlyHintsCollector(opts) {
	if (!opts?.onEarlyHints && !opts?.responseLinkHeader) return;
	const sentLinks = /* @__PURE__ */ new Set();
	const sentHints = opts.onEarlyHints ? new Array() : void 0;
	const responseLinkHeaderEntries = opts.responseLinkHeader ? new Array() : void 0;
	const responseLinkHeaderFilter = getResponseLinkHeaderFilter(opts.responseLinkHeader);
	return {
		collectStatic: ({ manifest, matchedRoutes }) => {
			if (!matchedRoutes?.length) return;
			collectEarlyHintsPhase({
				phase: "static",
				hints: collectStaticHintsFromManifest(manifest, matchedRoutes),
				sentLinks,
				sentHints,
				onEarlyHints: opts.onEarlyHints,
				responseLinkHeaderEntries
			});
		},
		collectDynamic: (matches) => {
			collectEarlyHintsPhase({
				phase: "dynamic",
				hints: collectDynamicHintsFromMatches(matches),
				sentLinks,
				sentHints,
				onEarlyHints: opts.onEarlyHints,
				responseLinkHeaderEntries
			});
		},
		appendResponseHeaders: (headers) => {
			if (!responseLinkHeaderEntries?.length) return;
			appendResponseLinkHeaders({
				responseHeaders: headers,
				entries: responseLinkHeaderEntries,
				filter: responseLinkHeaderFilter
			});
		}
	};
}
function normalizeTransformAssetResult(result) {
	if (typeof result === "string") return { href: result };
	return result;
}
function escapeCssString(value) {
	return value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\n/g, "\\a ").replace(/\r/g, "\\d ").replace(/\f/g, "\\c ");
}
async function transformInlineCssTemplate(options) {
	const { strings, urls } = options.template;
	if (strings.length !== urls.length + 1) throw new Error(`TanStack Start inlineCss template for ${options.stylesheetHref} is invalid`);
	let css = strings[0];
	for (let index = 0; index < urls.length; index++) {
		const transformed = normalizeTransformAssetResult(await options.transformFn({
			kind: "css-url",
			url: urls[index],
			stylesheetHref: options.stylesheetHref
		}));
		css += escapeCssString(transformed.href) + strings[index + 1];
	}
	return css;
}
async function transformInlineCssStyles(inlineCss, transformFn) {
	const transformedStyles = {};
	const transformedEntries = await Promise.all(Object.entries(inlineCss.styles).map(async ([stylesheetHref, css]) => {
		const template = inlineCss.templates?.[stylesheetHref];
		return [stylesheetHref, template ? await transformInlineCssTemplate({
			stylesheetHref,
			template,
			transformFn
		}) : css];
	}));
	for (const [stylesheetHref, css] of transformedEntries) transformedStyles[stylesheetHref] = css;
	return {
		styles: transformedStyles,
		...inlineCss.templates ? { templates: inlineCss.templates } : {}
	};
}
function resolveTransformAssetsCrossOrigin(config, kind) {
	if (!config) return void 0;
	if (typeof config === "string") return config;
	return config[kind];
}
function isObjectShorthand(transform) {
	return "prefix" in transform;
}
function resolveTransformAssetsConfig(transform) {
	if (typeof transform === "string") {
		const prefix = transform;
		return {
			type: "transform",
			transformFn: ({ url }) => ({ href: `${prefix}${url}` }),
			cache: true
		};
	}
	if (typeof transform === "function") return {
		type: "transform",
		transformFn: transform,
		cache: true
	};
	if (isObjectShorthand(transform)) {
		const { prefix, crossOrigin } = transform;
		return {
			type: "transform",
			transformFn: ({ url, kind }) => {
				const href = `${prefix}${url}`;
				if (kind === "css-url") return { href };
				const co = resolveTransformAssetsCrossOrigin(crossOrigin, kind);
				return co ? {
					href,
					crossOrigin: co
				} : { href };
			},
			cache: true
		};
	}
	if ("createTransform" in transform && transform.createTransform) return {
		type: "createTransform",
		createTransform: transform.createTransform,
		cache: transform.cache !== false
	};
	return {
		type: "transform",
		transformFn: typeof transform.transform === "string" ? (({ url }) => ({ href: `${transform.transform}${url}` })) : transform.transform,
		cache: transform.cache !== false
	};
}
function assignManifestLink(link, next) {
	if (typeof link === "string") return next.crossOrigin ? next : next.href;
	const nextLink = {
		...link,
		href: next.href
	};
	if (next.crossOrigin) nextLink.crossOrigin = next.crossOrigin;
	else delete nextLink.crossOrigin;
	return nextLink;
}
async function transformManifestAssets(source, transformFn, _opts) {
	const manifest = structuredClone(source);
	const inlineCssEnabled = _opts?.inlineCss !== false;
	const scriptTransforms = /* @__PURE__ */ new Map();
	const transformScript = (url) => {
		const cached = scriptTransforms.get(url);
		if (cached) return cached;
		const transformed = Promise.resolve(transformFn({
			url,
			kind: "script"
		})).then(normalizeTransformAssetResult);
		scriptTransforms.set(url, transformed);
		return transformed;
	};
	if (!inlineCssEnabled) delete manifest.inlineCss;
	else if (manifest.inlineCss) manifest.inlineCss = await transformInlineCssStyles(manifest.inlineCss, transformFn);
	for (const route of Object.values(manifest.routes)) {
		if (route.preloads?.length) route.preloads = await Promise.all(route.preloads.map(async (link) => {
			const result = await transformScript(resolveManifestAssetLink(link).href);
			return assignManifestLink(link, {
				href: result.href,
				crossOrigin: result.crossOrigin
			});
		}));
		if (route.css?.length && !manifest.inlineCss) route.css = await Promise.all(route.css.map(async (link) => {
			const result = normalizeTransformAssetResult(await transformFn({
				url: resolveManifestCssLink(link).href,
				kind: "stylesheet"
			}));
			return assignManifestLink(link, {
				href: result.href,
				crossOrigin: result.crossOrigin
			});
		}));
		if (route.scripts?.length) for (const script of route.scripts) {
			const src = script.attrs?.src;
			if (typeof src !== "string") continue;
			const result = await transformScript(src);
			script.attrs = {
				...script.attrs,
				src: result.href
			};
			if (result.crossOrigin) script.attrs.crossOrigin = result.crossOrigin;
			else delete script.attrs.crossOrigin;
		}
	}
	return manifest;
}
/**
* Builds a final ServerManifest without URL transforms. Used when no
* transformAssets option is provided.
*
* Returns a new manifest object so the cached base manifest is never mutated.
*/
function buildManifest(source, opts) {
	return {
		...source.scriptFormat ? { scriptFormat: source.scriptFormat } : {},
		...opts?.inlineCss !== false && source.inlineCss ? { inlineCss: structuredClone(source.inlineCss) } : {},
		routes: { ...source.routes }
	};
}
function getStaticHandlerInlineCssDefault(handlerInlineCss) {
	if (typeof handlerInlineCss === "function") return;
	return handlerInlineCss ?? true;
}
async function resolveInlineCssForRequest(opts) {
	if (opts.requestInlineCss !== void 0) return opts.requestInlineCss;
	if (typeof opts.handlerInlineCss === "function") return await opts.handlerInlineCss({ request: opts.request });
	return opts.handlerInlineCss ?? true;
}
function createCachedBaseManifestLoader(loadBaseManifest) {
	let baseManifestPromise;
	return () => {
		if (!baseManifestPromise) baseManifestPromise = loadBaseManifest().catch((error) => {
			baseManifestPromise = void 0;
			throw error;
		});
		return baseManifestPromise;
	};
}
function createFinalManifestTransformResolver(transformAssets, opts) {
	const transformConfig = transformAssets !== void 0 ? resolveTransformAssetsConfig(transformAssets) : void 0;
	const cache = transformConfig ? transformConfig.cache : true;
	const warmup = !!transformAssets && typeof transformAssets === "object" && "warmup" in transformAssets && transformAssets.warmup === true;
	let cachedCreateTransformPromise;
	const clearCachedCreateTransform = () => {
		cachedCreateTransformPromise = void 0;
	};
	return {
		cache,
		warmup,
		clearCachedCreateTransform,
		getTransformFn: async (ctx) => {
			if (!transformConfig) return void 0;
			if (transformConfig.type !== "createTransform") return transformConfig.transformFn;
			if (!cache || !opts.cacheCreateTransform) return transformConfig.createTransform(ctx);
			if (!cachedCreateTransformPromise) cachedCreateTransformPromise = Promise.resolve(transformConfig.createTransform(ctx)).catch((error) => {
				clearCachedCreateTransform();
				throw error;
			});
			return cachedCreateTransformPromise;
		}
	};
}
function createFinalManifestResolver(opts) {
	const finalManifestCache = /* @__PURE__ */ new Map();
	const transformResolver = createFinalManifestTransformResolver(opts.transformAssets, { cacheCreateTransform: opts.cacheCreateTransform });
	const handlerDefaultInlineCss = getStaticHandlerInlineCssDefault(opts.inlineCss);
	const getRequestManifestOptions = async (requestOpts) => {
		const transformFn = await transformResolver.getTransformFn({
			warmup: false,
			request: requestOpts.request
		});
		const inlineCss = await resolveInlineCssForRequest({
			request: requestOpts.request,
			handlerInlineCss: opts.inlineCss,
			requestInlineCss: requestOpts.requestInlineCss
		});
		return {
			getBaseManifest: requestOpts.getBaseManifest,
			transformFn,
			cache: transformResolver.cache,
			inlineCss
		};
	};
	const resolveRequest = async (requestOpts, cache) => {
		return resolveFinalManifest({
			...await getRequestManifestOptions(requestOpts),
			finalManifestCache: cache
		});
	};
	return {
		warmup: ({ getBaseManifest }) => warmupFinalManifest({
			enabled: transformResolver.warmup,
			handlerDefaultInlineCss,
			cache: transformResolver.cache,
			finalManifestCache,
			getBaseManifest,
			getTransformFn: () => transformResolver.getTransformFn({ warmup: true }),
			onError: transformResolver.clearCachedCreateTransform
		}),
		resolveCached: (requestOpts) => resolveRequest(requestOpts, finalManifestCache),
		resolveUncached: (requestOpts) => resolveRequest(requestOpts, void 0)
	};
}
function getFinalManifestCacheKey(inlineCss) {
	return inlineCss ? "inline-css" : "linked-css";
}
function cacheFinalManifestPromise(cachedFinalManifestPromises, cacheKey, promise) {
	const cachedFinalManifestPromise = promise.catch((error) => {
		if (cachedFinalManifestPromises.get(cacheKey) === cachedFinalManifestPromise) cachedFinalManifestPromises.delete(cacheKey);
		throw error;
	});
	cachedFinalManifestPromises.set(cacheKey, cachedFinalManifestPromise);
	return cachedFinalManifestPromise;
}
function getOrCreateCachedFinalManifestPromise(cachedFinalManifestPromises, cacheKey, computeFinalManifest) {
	const cachedFinalManifestPromise = cachedFinalManifestPromises.get(cacheKey);
	if (cachedFinalManifestPromise) return cachedFinalManifestPromise;
	return cacheFinalManifestPromise(cachedFinalManifestPromises, cacheKey, Promise.resolve().then(computeFinalManifest));
}
async function buildFinalManifest(opts) {
	return opts.transformFn ? await transformManifestAssets(opts.base, opts.transformFn, { inlineCss: opts.inlineCss }) : buildManifest(opts.base, { inlineCss: opts.inlineCss });
}
async function resolveFinalManifest(opts) {
	const computeFinalManifest = async () => {
		return buildFinalManifest({
			base: await opts.getBaseManifest(),
			transformFn: opts.transformFn,
			inlineCss: opts.inlineCss
		});
	};
	if (opts.finalManifestCache && (!opts.transformFn || opts.cache)) return getOrCreateCachedFinalManifestPromise(opts.finalManifestCache, getFinalManifestCacheKey(opts.inlineCss), computeFinalManifest);
	return computeFinalManifest();
}
function warmupFinalManifest(opts) {
	if (!opts.enabled || opts.handlerDefaultInlineCss === void 0 || !opts.cache) return;
	const inlineCss = opts.handlerDefaultInlineCss;
	const warmupPromise = getOrCreateCachedFinalManifestPromise(opts.finalManifestCache, getFinalManifestCacheKey(inlineCss), async () => {
		const [base, transformFn] = await Promise.all([opts.getBaseManifest(), opts.getTransformFn()]);
		return buildFinalManifest({
			base,
			transformFn,
			inlineCss
		});
	});
	if (opts.onError) warmupPromise.catch(opts.onError);
	return warmupPromise;
}
var ServerFunctionSerializationAdapter = createSerializationAdapter({
	key: "$TSS/serverfn",
	test: (v) => {
		if (typeof v !== "function") return false;
		if (!(TSS_SERVER_FUNCTION in v)) return false;
		return !!v[TSS_SERVER_FUNCTION];
	},
	toSerializable: ({ serverFnMeta }) => ({ functionId: serverFnMeta.id }),
	fromSerializable: ({ functionId }) => {
		const fn = async (opts, signal) => {
			return (await (await getServerFnById(functionId, { origin: "client" }))(opts ?? {}, signal)).result;
		};
		return fn;
	}
});
function getStartResponseHeaders(opts) {
	return mergeHeaders({ "Content-Type": "text/html; charset=utf-8" }, ..._getRenderedMatches(opts.router.stores.matches.get()).map((match) => {
		return match.headers;
	}));
}
var entriesPromise;
var defaultCsrfMiddleware = createCsrfMiddleware({ filter: (ctx) => ctx.handlerType === "serverFn" });
var getCachedBaseManifest = createCachedBaseManifestLoader(() => getStartManifest());
var getProdBaseManifest = () => getCachedBaseManifest();
var getBaseManifest = getProdBaseManifest;
var createEarlyHintsForRequest = createEarlyHintsCollector;
async function loadEntries() {
	const [routerEntry, startEntry, pluginAdapters] = await Promise.all([
		import("./router-ClmuBdEg.mjs").then((n) => n.t),
		import("./start-D00gZLa7.mjs"),
		import("./empty-plugin-adapters-D9UWiqvJ.mjs")
	]);
	return {
		routerEntry,
		startEntry,
		pluginAdapters
	};
}
function getEntries() {
	if (!entriesPromise) entriesPromise = loadEntries();
	return entriesPromise;
}
var ROUTER_BASEPATH = "/";
var SERVER_FN_BASE = "/_serverFn/";
var IS_PRERENDERING = process.env.TSS_PRERENDERING === "true";
var IS_SHELL_ENV = process.env.TSS_SHELL === "true";
var IS_DEV = false;
var ERR_NO_RESPONSE = IS_DEV ? `It looks like you forgot to return a response from your server route handler. If you want to defer to the app router, make sure to have a component set in this route.` : "Internal Server Error";
var ERR_NO_DEFER = IS_DEV ? `You cannot defer to the app router if there is no component defined on this route.` : "Internal Server Error";
function throwRouteHandlerError() {
	throw new Error(ERR_NO_RESPONSE);
}
function throwIfMayNotDefer() {
	throw new Error(ERR_NO_DEFER);
}
/**
* Check if a value is a special response (Response or Redirect)
*/
function isSpecialResponse(value) {
	return value instanceof Response || isRedirect(value);
}
/**
* Normalize middleware result to context shape
*/
function handleCtxResult(result) {
	if (isSsrResponse(result) || isSpecialResponse(result)) return { response: result };
	return result;
}
function disposeLateResponse(result, signal) {
	const response = handleCtxResult(result)?.response;
	if (isSsrResponse(response) || isSpecialResponse(response)) disposeSsrResponseDetached(response, signal.reason);
}
function isSignalAborted(signal) {
	return signal.aborted;
}
/**
* Execute a middleware chain
*/
async function executeMiddleware(middlewares, ctx, signal) {
	let index = -1;
	let streamResponse;
	let retiredStreamIdentities;
	const isResponseAlias = (candidate, response) => candidate === response || candidate instanceof Response && response.body !== null && candidate.body === response.body;
	const setResponse = (response) => {
		if (isSsrResponse(response)) {
			if (response.serverSsrCleanup === "stream") streamResponse = response;
			ctx.response = response.response;
			return;
		}
		ctx.response = response;
	};
	const disposeStreamResponse = async (reason) => {
		const response = streamResponse;
		if (!response) return;
		streamResponse = void 0;
		retiredStreamIdentities ??= /* @__PURE__ */ new WeakSet();
		retiredStreamIdentities.add(response.response);
		if (response.response.body) retiredStreamIdentities.add(response.response.body);
		const currentResponse = ctx.response;
		if (isResponseAlias(currentResponse, response.response)) ctx.response = void 0;
		await response.dispose(reason);
	};
	const disposeAbandonedResult = (result) => {
		const exposed = handleCtxResult(result)?.response;
		const response = isSsrResponse(exposed) ? exposed.response : exposed;
		if (streamResponse && isResponseAlias(response, streamResponse.response)) {
			disposeStreamResponse(signal.reason).catch(console.error);
			return;
		}
		if (response instanceof Response && retiredStreamIdentities && (retiredStreamIdentities.has(response) || response.body !== null && retiredStreamIdentities.has(response.body))) return;
		disposeLateResponse(result, signal);
	};
	const getFinalResponse = async () => {
		const response = ctx.response;
		if (!response) throwRouteHandlerError();
		if (!streamResponse) return response;
		if (response === streamResponse.response) return streamResponse;
		if (streamResponse.response.body !== null && response.body === streamResponse.response.body) return {
			...streamResponse,
			response
		};
		await disposeStreamResponse("middleware response replaced");
		return response;
	};
	let nextPromise;
	function next(nextCtx) {
		const result = runNext(nextCtx);
		nextPromise = result;
		return result;
	}
	async function runNext(nextCtx) {
		if (signal.aborted) throw signal.reason;
		if (nextCtx) {
			if (nextCtx.context) ctx.context = safeObjectMerge(ctx.context, nextCtx.context);
			for (const key of Object.keys(nextCtx)) if (key === "response") setResponse(nextCtx.response);
			else if (key !== "context") ctx[key] = nextCtx[key];
		}
		index++;
		const middleware = middlewares[index];
		if (!middleware) return ctx;
		let result;
		try {
			const pending = middleware({
				...ctx,
				next
			});
			if (pending === nextPromise) {
				nextPromise = void 0;
				result = await pending;
				if (isSignalAborted(signal)) {
					disposeAbandonedResult(result);
					throw signal.reason;
				}
			} else result = await waitForRequest(pending, signal, disposeAbandonedResult);
		} catch (err) {
			if (isSignalAborted(signal)) throw signal.reason;
			if (isSpecialResponse(err)) {
				setResponse(err);
				return ctx;
			}
			throw err;
		}
		const normalized = handleCtxResult(result);
		if (normalized) {
			if (normalized.response !== void 0) setResponse(normalized.response);
			if (normalized.context) ctx.context = safeObjectMerge(ctx.context, normalized.context);
		}
		return ctx;
	}
	try {
		await runNext();
		const response = await waitForRequest(getFinalResponse(), signal, disposeAbandonedResult);
		if (signal.aborted) {
			disposeAbandonedResult(response);
			throw signal.reason;
		}
		return {
			ctx,
			response
		};
	} catch (err) {
		const disposal = disposeStreamResponse(signal.aborted ? signal.reason : err);
		if (signal.aborted) disposal.catch(console.error);
		else await disposal;
		throw err;
	}
}
/**
* Wrap a route handler as middleware
*/
function handlerToMiddleware(handler, mayDefer = false) {
	if (mayDefer) return handler;
	return async (ctx) => {
		const response = await handler({
			...ctx,
			next: throwIfMayNotDefer
		});
		if (!response) throwRouteHandlerError();
		return response;
	};
}
/**
* Creates the TanStack Start request handler.
*
* @example Backwards-compatible usage (handler callback only):
* ```ts
* export default createStartHandler(defaultStreamHandler)
* ```
*
* @example With CDN URL rewriting:
* ```ts
* export default createStartHandler({
*   handler: defaultStreamHandler,
*   transformAssets: 'https://cdn.example.com',
* })
* ```
*
* @example With per-request URL rewriting:
* ```ts
* export default createStartHandler({
*   handler: defaultStreamHandler,
*   transformAssets: {
*     transform: ({ url }) => {
*       const cdnBase = getRequest().headers.get('x-cdn-base') || ''
*       return { href: `${cdnBase}${url}` }
*     },
*     cache: false,
*   },
* })
* ```
*/
function createStartHandler(cbOrOptions) {
	const handlerOptions = typeof cbOrOptions === "function" ? {} : cbOrOptions;
	const cb = typeof cbOrOptions === "function" ? cbOrOptions : cbOrOptions.handler;
	const finalManifestResolver = createFinalManifestResolver({
		...handlerOptions,
		cacheCreateTransform: true
	});
	const resolveManifestForRequest = finalManifestResolver.resolveCached;
	finalManifestResolver.warmup({ getBaseManifest: () => getBaseManifest(void 0) });
	const startRequestResolver = async (request, requestOpts) => {
		let router = null;
		let responseOwnsCleanup = false;
		try {
			request.signal.throwIfAborted();
			const { url, handledProtocolRelativeURL } = getNormalizedURL(request.url);
			const href = url.pathname + url.search + url.hash;
			const origin = getOrigin(request);
			if (handledProtocolRelativeURL) return Response.redirect(url, 308);
			const entries = await waitForRequest(getEntries(), request.signal);
			const hasStartInstance = !!entries.startEntry.startInstance;
			const startOptions = await waitForRequest(entries.startEntry.startInstance?.getOptions(), request.signal) || {};
			const { hasPluginAdapters, pluginSerializationAdapters } = entries.pluginAdapters;
			const serializationAdapters = [
				...startOptions.serializationAdapters || [],
				...hasPluginAdapters ? pluginSerializationAdapters : [],
				ServerFunctionSerializationAdapter
			];
			const requestStartOptions = {
				...startOptions,
				requestMiddleware: hasStartInstance ? startOptions.requestMiddleware : [defaultCsrfMiddleware],
				serializationAdapters
			};
			const flattenedRequestMiddlewares = requestStartOptions.requestMiddleware ? flattenMiddlewares(requestStartOptions.requestMiddleware) : [];
			const executedRequestMiddlewares = new Set(flattenedRequestMiddlewares);
			const getRouter = async () => {
				if (router) return router;
				router = await waitForRequest(entries.routerEntry.getRouter(), request.signal);
				let isShell = IS_SHELL_ENV;
				if (IS_PRERENDERING && !isShell) isShell = request.headers.get(HEADERS.TSS_SHELL) === "true";
				const history = createMemoryHistory({ initialEntries: [href] });
				router.update({
					history,
					isShell,
					isPrerendering: IS_PRERENDERING,
					origin: router.options.origin ?? origin,
					defaultSsr: requestStartOptions.defaultSsr,
					serializationAdapters: [...requestStartOptions.serializationAdapters, ...router.options.serializationAdapters || []],
					basepath: ROUTER_BASEPATH
				});
				return router;
			};
			if (SERVER_FN_BASE && url.pathname.startsWith(SERVER_FN_BASE)) {
				const serverFnId = url.pathname.slice(SERVER_FN_BASE.length).split("/")[0];
				if (!serverFnId) throw new Error("Invalid server action param for serverFnId");
				const serverFnHandler = async ({ context }) => {
					return runWithStartContext({
						getRouter,
						startOptions: requestStartOptions,
						contextAfterGlobalMiddlewares: context,
						request,
						executedRequestMiddlewares,
						handlerType: "serverFn"
					}, () => handleServerAction({
						request,
						context: requestOpts?.context,
						serverFnId
					}));
				};
				const { response: middlewareResponse } = await executeMiddleware([...flattenedRequestMiddlewares.map((d) => d.options.server), serverFnHandler], {
					request,
					pathname: url.pathname,
					handlerType: "serverFn",
					context: createNullProtoObject(requestOpts?.context)
				}, request.signal);
				const result = await handleRedirectResponse(middlewareResponse, request, getRouter, request.signal);
				bindSsrResponseToRequest(router ?? void 0, result, request.signal);
				request.signal.throwIfAborted();
				responseOwnsCleanup = result.serverSsrCleanup === "stream";
				return result.response;
			}
			const executeRouter = async (serverContext, matchedRoutes) => {
				const acceptParts = (request.headers.get("Accept") || "*/*").split(",");
				if (!["*/*", "text/html"].some((mimeType) => acceptParts.some((part) => part.trim().startsWith(mimeType)))) return normalizeSsrResponse(Response.json({ error: "Only HTML requests are supported here" }, { status: 500 }));
				const manifest = await waitForRequest(resolveManifestForRequest({
					request,
					requestInlineCss: requestOpts?.inlineCss,
					getBaseManifest: () => getBaseManifest(matchedRoutes)
				}), request.signal);
				const earlyHints = createEarlyHintsForRequest({
					onEarlyHints: requestOpts?.onEarlyHints,
					responseLinkHeader: requestOpts?.responseLinkHeader
				});
				earlyHints?.collectStatic({
					manifest,
					matchedRoutes
				});
				const routerInstance = await getRouter();
				attachRouterServerSsrUtils({
					router: routerInstance,
					manifest,
					getRequestAssets: () => getStartContext({ throwIfNotFound: false })?.requestAssets
				});
				routerInstance.options.additionalContext = { serverContext };
				await routerInstance.load({ _signal: request.signal });
				request.signal.throwIfAborted();
				if (routerInstance._serverResult?.type === "redirect") return normalizeSsrResponse(routerInstance._serverResult.redirect);
				earlyHints?.collectDynamic(_getRenderedMatches(routerInstance.stores.matches.get()));
				const ctx = getStartContext({ throwIfNotFound: false });
				await waitForRequest(routerInstance.serverSsr.dehydrate({ requestAssets: ctx?.requestAssets }), request.signal);
				request.signal.throwIfAborted();
				const responseHeaders = getStartResponseHeaders({ router: routerInstance });
				earlyHints?.appendResponseHeaders(responseHeaders);
				request.signal.throwIfAborted();
				return normalizeSsrResponse(await waitForRequest(cb({
					request,
					router: routerInstance,
					responseHeaders
				}), request.signal, (late) => disposeLateResponse(late, request.signal)));
			};
			const requestHandlerMiddleware = async ({ context }) => {
				return runWithStartContext({
					getRouter,
					startOptions: requestStartOptions,
					contextAfterGlobalMiddlewares: context,
					request,
					executedRequestMiddlewares,
					handlerType: "router"
				}, async () => {
					try {
						return await handleServerRoutes({
							getRouter,
							request,
							url,
							executeRouter,
							context,
							executedRequestMiddlewares
						});
					} catch (err) {
						if (err instanceof Response) return err;
						throw err;
					}
				});
			};
			const { response: middlewareResponse } = await executeMiddleware([...flattenedRequestMiddlewares.map((d) => d.options.server), requestHandlerMiddleware], {
				request,
				pathname: url.pathname,
				handlerType: "router",
				context: createNullProtoObject(requestOpts?.context)
			}, request.signal);
			const response = await handleRedirectResponse(middlewareResponse, request, getRouter, request.signal);
			bindSsrResponseToRequest(router ?? void 0, response, request.signal);
			request.signal.throwIfAborted();
			responseOwnsCleanup = response.serverSsrCleanup === "stream";
			return response.response;
		} finally {
			if (router?.serverSsr && !responseOwnsCleanup) router.serverSsr.cleanup();
			router = null;
		}
	};
	return requestHandler(startRequestResolver);
}
async function handleRedirectResponse(response, request, getRouter, signal) {
	signal.throwIfAborted();
	const ssrResponse = normalizeSsrResponse(response);
	if (!isRedirect(ssrResponse.response)) return ssrResponse;
	if (isResolvedRedirect(ssrResponse.response)) {
		if (request.headers.get("x-tsr-serverFn") === "true") return waitForRequest(replaceSsrResponse(ssrResponse, Response.json({
			...ssrResponse.response.options,
			isSerializedRedirect: true
		}, { headers: ssrResponse.response.headers }), "redirect response replaced"), signal);
		return ssrResponse;
	}
	const opts = ssrResponse.response.options;
	if (opts.to && typeof opts.to === "string" && !opts.to.startsWith("/")) throw new Error(`Server side redirects must use absolute paths via the 'href' or 'to' options. The redirect() method's "to" property accepts an internal path only. Use the "href" property to provide an external URL. Received: ${JSON.stringify(opts)}`);
	if ([
		"params",
		"search",
		"hash"
	].some((d) => typeof opts[d] === "function")) throw new Error(`Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(opts).filter((d) => typeof opts[d] === "function").map((d) => `"${d}"`).join(", ")}`);
	signal.throwIfAborted();
	const router = await waitForRequest(getRouter(), signal);
	signal.throwIfAborted();
	const redirect = router.resolveRedirect(ssrResponse.response);
	if (request.headers.get("x-tsr-serverFn") === "true") return waitForRequest(replaceSsrResponse(ssrResponse, Response.json({
		...ssrResponse.response.options,
		isSerializedRedirect: true
	}, { headers: ssrResponse.response.headers }), "redirect response replaced"), signal);
	return waitForRequest(replaceSsrResponse(ssrResponse, redirect, "redirect response replaced"), signal);
}
async function handleServerRoutes({ getRouter, request, url, executeRouter, context, executedRequestMiddlewares }) {
	const router = await getRouter();
	const pathname = executeRewriteInput(router.rewrite, url).pathname;
	const [matchedRoutes, rawParams, foundRoute] = router.getMatchedRoutes(pathname);
	const isExactMatch = foundRoute && rawParams["**"] === void 0;
	const routeMiddlewares = [];
	for (const route of matchedRoutes) {
		const serverMiddleware = route.options.server?.middleware;
		if (serverMiddleware) {
			const flattened = flattenMiddlewares(serverMiddleware);
			for (const m of flattened) if (!executedRequestMiddlewares.has(m)) routeMiddlewares.push(m.options.server);
		}
	}
	const server = foundRoute?.options.server;
	let isHeadFallback = false;
	if (server?.handlers && isExactMatch) {
		const handlers = typeof server.handlers === "function" ? server.handlers({ createHandlers: (d) => d }) : server.handlers;
		const requestMethod = request.method.toUpperCase();
		const handler = requestMethod === "HEAD" ? handlers["HEAD"] ?? handlers["GET"] ?? handlers["ANY"] : handlers[requestMethod] ?? handlers["ANY"];
		isHeadFallback = requestMethod === "HEAD" && handler !== void 0 && !handlers["HEAD"];
		if (handler) {
			const mayDefer = !!foundRoute.options.component;
			if (typeof handler === "function") routeMiddlewares.push(handlerToMiddleware(handler, mayDefer));
			else {
				if (handler.middleware?.length) {
					const handlerMiddlewares = flattenMiddlewares(handler.middleware);
					for (const m of handlerMiddlewares) routeMiddlewares.push(m.options.server);
				}
				if (handler.handler) routeMiddlewares.push(handlerToMiddleware(handler.handler, mayDefer));
			}
		}
	}
	routeMiddlewares.push(((ctx) => executeRouter(ctx.context, matchedRoutes)));
	const { ctx, response } = await executeMiddleware(routeMiddlewares, {
		request,
		context,
		params: rawParams,
		pathname,
		handlerType: "router"
	}, request.signal);
	if (isHeadFallback) {
		if (!ctx.response) throwRouteHandlerError();
		return waitForRequest(stripSsrResponseBody(await handleRedirectResponse(response, request, getRouter, request.signal), "HEAD body stripped"), request.signal);
	}
	return normalizeSsrResponse(response);
}
var server_exports = /* @__PURE__ */ __exportAll({
	createServerEntry: () => createServerEntry,
	default: () => server_default
});
var fetch = createStartHandler(defaultStreamHandler);
function createServerEntry(entry) {
	return { async fetch(...args) {
		return await entry.fetch(...args);
	} };
}
var server_default = createServerEntry({ fetch });
//#endregion
export { getServerFnById as a, __exportAll as c, TSS_SERVER_FUNCTION as i, createCsrfMiddleware as n, getCookie as o, createServerFn as r, createMiddleware as s, server_exports as t };
