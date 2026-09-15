//#region node_modules/posthog-js/dist/module.mjs
var t = "u" > typeof window ? window : void 0;
var i = "u" > typeof globalThis ? globalThis : t;
var e = null == i ? void 0 : i.navigator;
var s = null == i ? void 0 : i.document;
var n = null == i ? void 0 : i.location;
var r = null == i ? void 0 : i.fetch;
var o = (null == i ? void 0 : i.XMLHttpRequest) && "withCredentials" in new i.XMLHttpRequest() ? i.XMLHttpRequest : void 0;
var l = null == i ? void 0 : i.AbortController;
var a = null == i ? void 0 : i.CompressionStream;
var u = null == e ? void 0 : e.userAgent;
function h() {
	return !(!t || !1 === t.navigator.onLine);
}
var d = "undefined" != typeof globalThis ? globalThis : t;
d && "undefined" == typeof self && (d.self = d), d && "undefined" == typeof File && (d.File = function() {});
var c = null != t ? t : {};
var v = "0.8.3";
var f = {
	DEBUG: !1,
	LIB_VERSION: v,
	LIB_NAME: "browser-common",
	JS_SDK_VERSION: v
};
var p = function(t) {
	return t.AnonymousId = "anonymous_id", t.DistinctId = "distinct_id", t.Props = "props", t.EnablePersonProcessing = "enable_person_processing", t.PersonMode = "person_mode", t.FeatureFlagDetails = "feature_flag_details", t.FeatureFlags = "feature_flags", t.FeatureFlagPayloads = "feature_flag_payloads", t.BootstrapFeatureFlagDetails = "bootstrap_feature_flag_details", t.BootstrapFeatureFlags = "bootstrap_feature_flags", t.BootstrapFeatureFlagPayloads = "bootstrap_feature_flag_payloads", t.OverrideFeatureFlags = "override_feature_flags", t.Queue = "queue", t.AiQueue = "ai_queue", t.AiCaptureQueue = "ai_capture_queue", t.LogsQueue = "logs_queue", t.OptedOut = "opted_out", t.SessionId = "session_id", t.SessionStartTimestamp = "session_start_timestamp", t.SessionLastTimestamp = "session_timestamp", t.PersonProperties = "person_properties", t.GroupProperties = "group_properties", t.InstalledAppBuild = "installed_app_build", t.InstalledAppVersion = "installed_app_version", t.SessionReplay = "session_replay", t.PushRegistered = "push_registered", t.SessionReplayEventTriggerActivatedSession = "session_replay_event_trigger_activated_session", t.SurveyLastSeenDate = "survey_last_seen_date", t.SurveysSeen = "surveys_seen", t.Surveys = "surveys", t.RemoteConfig = "remote_config", t.FlagsEndpointWasHit = "flags_endpoint_was_hit", t.DeviceId = "device_id", t;
}({});
var _ = function(t) {
	return t.GZipJS = "gzip-js", t.Base64 = "base64", t;
}({});
var g = [
	"$snapshot",
	"$pageview",
	"$pageleave",
	"$set",
	"survey dismissed",
	"survey sent",
	"survey shown",
	"$identify",
	"$groupidentify",
	"$create_alias",
	"$$client_ingestion_warning",
	"$web_experiment_applied",
	"$feature_enrollment_update",
	"$feature_flag_called"
];
var m = ["token"];
function b(t, i) {
	return -1 !== t.indexOf(i);
}
var y = function(t) {
	return t.trim();
};
var w = function(t) {
	return t.replace(/^\$/, "");
};
function S(t) {
	var i;
	const e = [];
	return null !== (i = JSON.stringify(t, function(t, i) {
		if ("bigint" == typeof i) return i.toString();
		if ("function" != typeof i && "symbol" != typeof i) {
			if (i instanceof Error) return {
				name: i.name,
				message: i.message,
				stack: i.stack
			};
			if (i && "object" == typeof i) {
				for (; e.length > 0 && e[e.length - 1] !== this;) e.pop();
				if (e.includes(i)) return "[Circular]";
				e.push(i);
			}
			return i;
		}
	})) && void 0 !== i ? i : "null";
}
var x = Object.prototype;
var E = x.hasOwnProperty;
var k = x.toString;
var T = Array.isArray || function(t) {
	return "[object Array]" === k.call(t);
};
var P = (t) => "function" == typeof t;
var C = (t) => t === Object(t) && !T(t);
var O = (t) => {
	if (C(t)) {
		for (const i in t) if (E.call(t, i)) return !1;
		return !0;
	}
	return !1;
};
var R = (t) => void 0 === t;
var I = (t) => "[object String]" == k.call(t);
var F = (t) => I(t) && 0 === t.trim().length;
var M = (t) => null === t;
var A = (t) => R(t) || M(t);
var D = (t) => "[object Number]" == k.call(t) && t == t;
var N = (t) => D(t) && t > 0;
var j = (t) => "[object Boolean]" === k.call(t);
var L = (t) => b(g, t);
var B = (t) => b(m, t);
function U(t) {
	return null === t || "object" != typeof t;
}
function z(t, i) {
	return {}.toString.call(t) === `[object ${i}]`;
}
function H(t) {
	switch ({}.toString.call(t)) {
		case "[object Error]":
		case "[object Exception]":
		case "[object DOMException]":
		case "[object DOMError]":
		case "[object WebAssembly.Exception]": return !0;
		default: return V(t, Error);
	}
}
function q(t) {
	return "u" > typeof Event && V(t, Event);
}
function V(t, i) {
	try {
		return t instanceof i;
	} catch (t) {
		return !1;
	}
}
var W = [
	!0,
	"true",
	1,
	"1",
	"yes"
];
var G = (t) => b(W, t);
var K = [
	!1,
	"false",
	0,
	"0",
	"no"
];
function J(t, i, e, s, n, r, o) {
	try {
		var l = t[r](o), a = l.value;
	} catch (t) {
		e(t);
		return;
	}
	l.done ? i(a) : Promise.resolve(a).then(s, n);
}
function Y(t) {
	return function() {
		var i = this, e = arguments;
		return new Promise(function(s, n) {
			var r = t.apply(i, e);
			function o(t) {
				J(r, s, n, o, l, "next", t);
			}
			function l(t) {
				J(r, s, n, o, l, "throw", t);
			}
			o(void 0);
		});
	};
}
var X = [
	"amazonbot",
	"amazonproductbot",
	"app.hypefactors.com",
	"applebot",
	"archive.org_bot",
	"awariobot",
	"backlinksextendedbot",
	"baiduspider",
	"bingbot",
	"bingpreview",
	"chrome-lighthouse",
	"dataforseobot",
	"deepscan",
	"duckduckbot",
	"facebookexternal",
	"facebookcatalog",
	"http://yandex.com/bots",
	"hubspot",
	"ia_archiver",
	"leikibot",
	"linkedinbot",
	"meta-externalagent",
	"mj12bot",
	"msnbot",
	"nessus",
	"petalbot",
	"pinterestbot",
	"prerender",
	"rogerbot",
	"screaming frog",
	"sebot-wa",
	"sitebulb",
	"slackbot",
	"slurp",
	"trendictionbot",
	"turnitin",
	"twitterbot",
	"vercel-screenshot",
	"vercelbot",
	"yahoo! slurp",
	"yandexbot",
	"zoombot",
	"bot.htm",
	"bot.php",
	"(bot;",
	"bot/",
	"crawler",
	"ahrefsbot",
	"ahrefssiteaudit",
	"semrushbot",
	"siteauditbot",
	"splitsignalbot",
	"gptbot",
	"oai-searchbot",
	"chatgpt-user",
	"perplexitybot",
	"better uptime bot",
	"sentryuptimebot",
	"uptimerobot",
	"headlesschrome",
	"cypress",
	"google-hoteladsverifier",
	"adsbot-google",
	"apis-google",
	"duplexweb-google",
	"feedfetcher-google",
	"google favicon",
	"google web preview",
	"google-read-aloud",
	"googlebot",
	"googleother",
	"google-cloudvertexbot",
	"googleweblight",
	"mediapartners-google",
	"storebot-google",
	"google-inspectiontool",
	"bytespider"
];
var Q = function(t, i = []) {
	if (!t) return !1;
	const e = t.toLowerCase();
	return X.concat(i).some((t) => {
		const i = t.toLowerCase();
		return -1 !== e.indexOf(i);
	});
};
function Z(t, i, e, s, n) {
	return i > e && (s.warn("min cannot be greater than max."), i = e), D(t) ? t > e ? (s.warn(" cannot be  greater than max: " + e + ". Using max value instead."), e) : i > t ? (s.warn(" cannot be less than min: " + i + ". Using min value instead."), i) : t : (s.warn(" must be a number. using max or fallback. max: " + e + ", fallback: " + n), Z(null != n ? n : e, i, e, s));
}
var tt = class {
	constructor(t) {
		this.C = {}, this.I = t.I, this.R = Z(t.bucketSize, 0, 100, t.$), this.A = Z(t.refillRate, 0, this.R, t.$), this.O = Z(t.refillInterval, 0, 864e5, t.$);
	}
	F(t, i) {
		const e = Math.floor((i - t.lastAccess) / this.O);
		e > 0 && (t.tokens = Math.min(t.tokens + e * this.A, this.R), t.lastAccess = t.lastAccess + e * this.O);
	}
	consumeRateLimit(t) {
		var i;
		const e = Date.now(), s = String(t);
		let n = this.C[s];
		return n ? this.F(n, e) : (n = {
			tokens: this.R,
			lastAccess: e
		}, this.C[s] = n), 0 === n.tokens || (n.tokens--, 0 === n.tokens && (null === (i = this.I) || void 0 === i || i.call(this, t)), 0 === n.tokens);
	}
	stop() {
		this.C = {};
	}
};
var it = "Mobile";
var et = "Android";
var st = "Tablet";
var nt = "Android Tablet";
var rt = "iPad";
var ot = "Apple Watch";
var lt = "Safari";
var at = "BlackBerry";
var ut = "Samsung Internet";
var ht = "Chrome";
var dt = "Chrome iOS";
var ct = "Internet Explorer";
var vt = "Internet Explorer Mobile";
var ft = "Opera";
var pt = "Microsoft Edge";
var _t = "Firefox";
var gt = "Firefox iOS";
var mt = "Nintendo";
var bt = "PlayStation";
var yt = "Xbox";
var wt = "Android Mobile";
var $t = "Mobile Safari";
var St = "Windows";
var xt = "Windows Phone";
var Et = "Nokia";
var kt = "Ouya";
var Tt = "Generic " + it.toLowerCase();
var Pt = "Generic " + st.toLowerCase();
var Ct = "Konqueror";
var Ot = "Oculus Browser";
var Rt = "Vivaldi";
var It = "Yandex";
var Ft = "Whale";
var Mt = "DuckDuckGo";
var At = "Pale Moon";
var Dt = "Waterfox";
var Nt = "Brave";
var jt = "Claude";
var Lt = "Codex";
var Bt = "ChatGPT";
var Ut = "Google Search App";
var zt = /* @__PURE__ */ new RegExp("Version/(\\d+(\\.\\d+)?)");
var Ht = /* @__PURE__ */ new RegExp("(Claude|Codex|ChatGPT)\\/(\\d+(\\.\\d+)?)");
var qt = new RegExp(yt, "i");
var Vt = /* @__PURE__ */ new RegExp("PlayStation \\w+", "i");
var Wt = /* @__PURE__ */ new RegExp("Nintendo \\w+", "i");
var Gt = /* @__PURE__ */ new RegExp("BlackBerry|PlayBook|BB10", "i");
var Kt = {
	"NT3.51": "NT 3.11",
	"NT4.0": "NT 4.0",
	"5.0": "2000",
	5.1: "XP",
	5.2: "XP",
	"6.0": "Vista",
	6.1: "7",
	6.2: "8",
	6.3: "8.1",
	6.4: "10",
	"10.0": "10"
};
var Jt = function(t, i, e, s) {
	i = i || "";
	return function(t) {
		return (null == t ? void 0 : t.brave) ? Nt : null;
	}(e) || ((null == s ? void 0 : s.detectGoogleSearchApp) && b(t, "GSA/") ? Ut : b(t, " OPR/") && b(t, "Mini") ? "Opera Mini" : b(t, " OPR/") ? ft : Gt.test(t) ? at : b(t, "IEMobile") || b(t, "WPDesktop") ? vt : b(t, "OculusBrowser") ? Ot : b(t, "SamsungBrowser") ? ut : b(t, "Edge") || b(t, "Edg/") ? pt : b(t, "Vivaldi/") ? Rt : b(t, "YaBrowser/") ? It : b(t, "Whale/") ? Ft : b(t, "DuckDuckGo/") || b(t, "Ddg/") ? Mt : b(t, "Claude/") ? jt : b(t, "Codex/") ? Lt : b(t, "ChatGPT/") ? Bt : b(t, "FBIOS") ? "Facebook Mobile" : b(t, "UCWEB") || b(t, "UCBrowser") ? "UC Browser" : b(t, "CriOS") ? dt : b(t, "CrMo") || b(t, ht) ? ht : b(t, et) && b(t, lt) ? wt : b(t, "FxiOS") ? gt : b(t.toLowerCase(), Ct.toLowerCase()) ? Ct : b(t, "Brave/") ? Nt : ((t, i) => i && b(i, "Apple") || function(t) {
		return b(t, lt) && !b(t, ht) && !b(t, et);
	}(t))(t, i) ? b(t, it) ? $t : lt : b(t, "PaleMoon/") ? At : b(t, "Waterfox/") ? Dt : b(t, _t) ? _t : b(t, "MSIE") || b(t, "Trident/") ? ct : b(t, "Gecko") ? _t : "");
};
var Yt = {
	[vt]: [/* @__PURE__ */ new RegExp("rv:(\\d+(\\.\\d+)?)")],
	[pt]: [/* @__PURE__ */ new RegExp("Edge?\\/(\\d+(\\.\\d+)?)")],
	[ht]: [/* @__PURE__ */ new RegExp("(Chrome|CrMo)\\/(\\d+(\\.\\d+)?)")],
	[dt]: [/* @__PURE__ */ new RegExp("CriOS\\/(\\d+(\\.\\d+)?)")],
	"UC Browser": [/* @__PURE__ */ new RegExp("(UCBrowser|UCWEB)\\/(\\d+(\\.\\d+)?)")],
	[lt]: [zt],
	[$t]: [zt],
	[ft]: [/* @__PURE__ */ new RegExp("(Opera|OPR)\\/(\\d+(\\.\\d+)?)")],
	[_t]: [/* @__PURE__ */ new RegExp("Firefox\\/(\\d+(\\.\\d+)?)")],
	[gt]: [/* @__PURE__ */ new RegExp("FxiOS\\/(\\d+(\\.\\d+)?)")],
	[Ct]: [/* @__PURE__ */ new RegExp("Konqueror[:/]?(\\d+(\\.\\d+)?)", "i")],
	[at]: [/* @__PURE__ */ new RegExp("BlackBerry (\\d+(\\.\\d+)?)"), zt],
	[wt]: [/* @__PURE__ */ new RegExp("android\\s(\\d+(\\.\\d+)?)", "i")],
	[ut]: [/* @__PURE__ */ new RegExp("SamsungBrowser\\/(\\d+(\\.\\d+)?)")],
	[Ot]: [/* @__PURE__ */ new RegExp("OculusBrowser\\/(\\d+(\\.\\d+)?)")],
	[Rt]: [/* @__PURE__ */ new RegExp("Vivaldi\\/(\\d+(\\.\\d+)?)")],
	[It]: [/* @__PURE__ */ new RegExp("YaBrowser\\/(\\d+(\\.\\d+)?)")],
	[Ft]: [/* @__PURE__ */ new RegExp("Whale\\/(\\d+(\\.\\d+)?)")],
	[Nt]: [/* @__PURE__ */ new RegExp("Brave\\/(\\d+(\\.\\d+)?)")],
	[jt]: [Ht],
	[Lt]: [Ht],
	[Bt]: [Ht],
	[Mt]: [/* @__PURE__ */ new RegExp("(DuckDuckGo|Ddg)\\/(\\d+(\\.\\d+)?)")],
	[At]: [/* @__PURE__ */ new RegExp("PaleMoon\\/(\\d+(\\.\\d+)?)")],
	[Dt]: [/* @__PURE__ */ new RegExp("Waterfox\\/(\\d+(\\.\\d+)?)")],
	[Ut]: [/* @__PURE__ */ new RegExp("GSA\\/(\\d+(\\.\\d+)?)")],
	[ct]: [/* @__PURE__ */ new RegExp("(rv:|MSIE )(\\d+(\\.\\d+)?)")],
	Mozilla: [/* @__PURE__ */ new RegExp("rv:(\\d+(\\.\\d+)?)")]
};
var Xt = function(t, i, e, s) {
	const r = Yt[Jt(t, i, e, s)];
	if (R(r)) return null;
	for (let i = 0; r.length > i; i++) {
		const e = t.match(r[i]);
		if (e) return parseFloat(e[e.length - 2]);
	}
	return null;
};
var Qt = [
	[/* @__PURE__ */ new RegExp("Xbox; Xbox (.*?)[);]", "i"), (t) => [yt, t && t[1] || ""]],
	[new RegExp(mt, "i"), [mt, ""]],
	[new RegExp(bt, "i"), [bt, ""]],
	[Gt, [at, ""]],
	[new RegExp(St, "i"), (t, i) => {
		if (/Phone/.test(i) || /WPDesktop/.test(i)) return [xt, ""];
		if (new RegExp(it).test(i) && !/IEMobile\b/.test(i)) return ["Windows Mobile", ""];
		const e = /Windows NT ([0-9.]+)/i.exec(i);
		if (e && e[1]) {
			let t = Kt[e[1]] || "";
			return /arm/i.test(i) && (t = "RT"), [St, t];
		}
		return [St, ""];
	}],
	[/((iPhone|iPad|iPod).*?OS (\d+)_(\d+)_?(\d+)?|iPhone)/, (t) => t && t[3] ? ["iOS", [
		t[3],
		t[4],
		t[5] || "0"
	].join(".")] : ["iOS", ""]],
	[/(watch.*\/(\d+\.\d+\.\d+)|watch os,(\d+\.\d+),)/i, (t) => {
		let i = "";
		return t && t.length >= 3 && (i = R(t[2]) ? t[3] : t[2]), ["watchOS", i];
	}],
	[/* @__PURE__ */ new RegExp("(Android (\\d+)\\.(\\d+)\\.?(\\d+)?|Android)", "i"), (t) => t && t[2] ? [et, [
		t[2],
		t[3],
		t[4] || "0"
	].join(".")] : [et, ""]],
	[/Mac OS X (\d+)[_.](\d+)[_.]?(\d+)?/i, (t) => {
		const i = ["Mac OS X", ""];
		return t && t[1] && (i[1] = [
			t[1],
			t[2],
			t[3] || "0"
		].join(".")), i;
	}],
	[/Mac/i, ["Mac OS X", ""]],
	[/CrOS/, ["Chrome OS", ""]],
	[/Linux|debian/i, ["Linux", ""]]
];
var Zt = function(t) {
	for (let i = 0; Qt.length > i; i++) {
		const [e, s] = Qt[i], n = e.exec(t), r = n && (P(s) ? s(n, t) : s);
		if (r) return r;
	}
	return ["", ""];
};
var ti = function(t) {
	return Wt.test(t) ? mt : Vt.test(t) ? bt : qt.test(t) ? yt : new RegExp(kt, "i").test(t) ? kt : (/* @__PURE__ */ new RegExp("(Windows Phone|WPDesktop)", "i")).test(t) ? xt : /iPad/.test(t) ? rt : /iPod/.test(t) ? "iPod Touch" : /iPhone/.test(t) ? "iPhone" : /(watch)(?: ?os[,/]|\d,\d\/)[\d.]+/i.test(t) ? ot : Gt.test(t) ? at : /(kobo)\s(ereader|touch)/i.test(t) ? "Kobo" : new RegExp(Et, "i").test(t) ? Et : /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i.test(t) || /(kf[a-z]+)( bui|\)).+silk\//i.test(t) ? "Kindle Fire" : /(Android|ZTE)/i.test(t) ? new RegExp(it).test(t) && !/(9138B|TB782B|Nexus [97]|pixel c|HUAWEISHT|BTV|noble nook|smart ultra 6)/i.test(t) || /pixel[\daxl ]{1,6}/i.test(t) && !/pixel c/i.test(t) || /(huaweimed-al00|tah-|APA|SM-G92|i980|zte|U304AA)/i.test(t) || /lmy47v/i.test(t) && !/QTAQZ3/i.test(t) ? et : nt : (/* @__PURE__ */ new RegExp("(pda|Mobile)", "i")).test(t) ? Tt : new RegExp(st, "i").test(t) && !(/* @__PURE__ */ new RegExp("Tablet pc", "i")).test(t) ? Pt : "";
};
var ii = function(t, i) {
	var e;
	const s = ti(t);
	return s === rt || s === nt || "Kobo" === s || "Kindle Fire" === s || s === Pt ? st : s === mt || s === yt || s === bt || s === kt ? "Console" : s === ot ? "Wearable" : s ? it : "Android" === (null == i ? void 0 : i.userAgentDataPlatform) && (null !== (e = null == i ? void 0 : i.maxTouchPoints) && void 0 !== e ? e : 0) > 0 ? 600 > Math.min(null !== (n = null == i ? void 0 : i.screenWidth) && void 0 !== n ? n : 0, null !== (r = null == i ? void 0 : i.screenHeight) && void 0 !== r ? r : 0) / (null !== (o = null == i ? void 0 : i.devicePixelRatio) && void 0 !== o ? o : 1) ? it : st : "Desktop";
	var n, r, o;
};
var ei = /\bFBAV\/(\d+(?:\.\d+)*)/i;
var si = [
	[/\bInstagram(?:[ /](\d+(?:\.\d+)*))?\b/i, "Instagram"],
	[/\bBarcelona[ /](\d+(?:\.\d+)*)?/i, "Threads"],
	[
		/\b(?:MessengerForiOS|(?:FBAN|FB_IAB)\/Orca-Android)\b/i,
		"Messenger",
		ei
	],
	[
		/\bFBAN\/EMA\b/i,
		"Facebook Lite",
		ei
	],
	[
		/\b(?:FBIOS|(?:FBAN|FB_IAB)\/(?:FB4A|FBIOS))\b/i,
		"Facebook",
		ei
	],
	[/\bLinkedInApp(?:\]?\/(\d+(?:\.\d+)*))?\b/i, "LinkedIn"],
	[/\bTwitter(?:Android| for (?:iPhone|iPad|Android))(?:\/(\d+(?:\.\d+)*))?\b/i, "Twitter"],
	[
		/\b(?:musical_ly|trill)(?:[_/](\d+\.\d+(?:\.\d+)*))?(?=\b|_)/i,
		"TikTok",
		/\bapp_version\/(\d+(?:\.\d+)*)/i
	],
	[/\b(?:MicroMessenger|WeChat)\/(\d+(?:\.\d+)*)?/i, "WeChat"],
	[/\bLine\/(\d+(?:\.\d+)*)?/i, "Line"],
	[/\bGSA\/(\d+(?:\.\d+)*)?/i, "Google"],
	[/\[Pinterest\/(?:iOS|Android)\b|\bPinterest(?: for (?:Android(?: Tablet)?|iOS))?\/(\d+(?:\.\d+)*)/i, "Pinterest"],
	[/\b(?:WA4A|WAiOS)\/(\d+(?:\.\d+)*)?/i, "WhatsApp"],
	[/\bSnapchat[ /](\d+(?:\.\d+)*)?/i, "Snapchat"],
	[/\bBing(?:Web|Sapphire)\/(\d+(?:\.\d+)*)?/i, "Bing"],
	[
		/\bNAVER\(inapp; search;/i,
		"Naver",
		/\bNAVER\(inapp; search;[^;)]*; (\d+(?:\.\d+)*)/i
	],
	[/\bKAKAOTALK[ /](\d+\.\d+(?:\.\d+)*)?/i, "KakaoTalk"]
];
var ni = "[Truncated]";
var ri = "[Unserializable]";
function oi(t) {
	let i = "";
	for (let e = 0; t.length > e; e++) {
		const s = t.charCodeAt(e);
		if (55296 > s || s > 56319) i += 56320 > s || s > 57343 ? t[e] : "�";
		else {
			const s = t.charCodeAt(e + 1);
			56320 > s || s > 57343 ? i += "�" : (i += t[e] + t[e + 1], e++);
		}
	}
	return i;
}
function li(t, i) {
	if (!i) return t;
	let e = [];
	try {
		e = Object.keys(i);
	} catch (t) {
		e = [];
	}
	for (const s of e) {
		let e;
		try {
			e = i[s];
		} catch (t) {
			e = ri;
		}
		Object.defineProperty(t, s, {
			value: e,
			enumerable: !0,
			writable: !0,
			configurable: !0
		});
	}
	return t;
}
var ai = 3e5;
var ui = class {
	record(t) {
		if ("too-large" === t.kind) return;
		if ("retry-later" !== t.kind) return void this.reset();
		if (!t.retryAfterMs) return;
		const i = this.isOpen(), e = Date.now(), s = Math.min(t.retryAfterMs, ai);
		if (!i) return this.ts = e, void (this.es = e + s);
		this.es = Math.max(this.es, Math.min(e + s, this.ts + ai));
	}
	remainingMs() {
		const t = Date.now();
		if (this.ts - 5e3 > t) return this.reset(), 0;
		const i = Math.min(ai, Math.max(0, this.es - t));
		return 0 === i && this.reset(), i;
	}
	isOpen() {
		return this.remainingMs() > 0;
	}
	reset() {
		this.es = 0, this.ts = 0;
	}
	constructor() {
		this.es = 0, this.ts = 0;
	}
};
var hi = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function di(t, i) {
	return "string" == typeof (e = t) && hi.test(e) ? t : i();
	var e;
}
function ci(t, i) {
	const e = new Error(i);
	try {
		Object.defineProperty(e, "name", {
			value: t,
			writable: !0,
			enumerable: !0,
			configurable: !0
		});
	} catch (t) {}
	return e;
}
function vi(t) {
	return t ? t.split("#")[0] : t;
}
function fi(t) {
	try {
		return t();
	} catch (t) {
		return;
	}
}
function pi(t, i) {
	const e = setTimeout(t, i);
	return null != e && e.unref && e?.unref(), e;
}
function _i(t, i, e) {
	return gi.apply(this, arguments);
}
function gi() {
	return (gi = Y(function* (t, i, e) {
		let s;
		try {
			return yield Promise.race([t, new Promise((t, n) => {
				s = pi(() => {
					try {
						e?.(), t();
					} catch (t) {
						n(t);
					}
				}, i);
			})]);
		} finally {
			clearTimeout(s);
		}
	})).apply(this, arguments);
}
var mi;
var bi;
var yi;
function wi(t) {
	const i = globalThis._posthogChunkIds;
	if (!i) return;
	const e = Object.keys(i);
	return yi && e.length === bi || (bi = e.length, yi = e.reduce((e, s) => {
		mi || (mi = {});
		const n = mi[s];
		if (n) e[n[0]] = n[1];
		else {
			const n = t(s);
			for (let t = n.length - 1; t >= 0; t--) {
				const r = n[t], o = null == r ? void 0 : r.filename, l = i[s];
				if (o && l) {
					e[o] = l, mi[s] = [o, l];
					break;
				}
			}
		}
		return e;
	}, {})), yi;
}
function $i(t) {
	return $i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
		return typeof t;
	} : function(t) {
		return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
	}, $i(t);
}
function Si(t, i, e) {
	return (i = function(t) {
		var i = function(t) {
			if ("object" != $i(t) || !t) return t;
			var i = t[Symbol.toPrimitive];
			if (void 0 !== i) {
				var e = i.call(t, "string");
				if ("object" != $i(e)) return e;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(t);
		}(t);
		return "symbol" == $i(i) ? i : i + "";
	}(i)) in t ? Object.defineProperty(t, i, {
		value: e,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : t[i] = e, t;
}
function xi(t, i) {
	var e = Object.keys(t);
	if (Object.getOwnPropertySymbols) {
		var s = Object.getOwnPropertySymbols(t);
		i && (s = s.filter(function(i) {
			return Object.getOwnPropertyDescriptor(t, i).enumerable;
		})), e.push.apply(e, s);
	}
	return e;
}
function Ei(t) {
	for (var i = 1; arguments.length > i; i++) {
		var e = null != arguments[i] ? arguments[i] : {};
		i % 2 ? xi(Object(e), !0).forEach(function(i) {
			Si(t, i, e[i]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : xi(Object(e)).forEach(function(i) {
			Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(e, i));
		});
	}
	return t;
}
var ki = class {
	constructor(t, i, e = []) {
		this.coercers = t, this.stackParser = i, this.modifiers = e;
	}
	buildFromUnknown(t, i = {}) {
		const e = i && i.mechanism || {
			handled: !0,
			type: "generic"
		}, s = this.buildCoercingContext(e, i, 0).apply(t), n = this.buildParsingContext(i), r = this.parseStacktrace(s, n);
		return {
			$exception_list: this.convertToExceptionList(r, e),
			$exception_level: "error"
		};
	}
	modifyFrames(t) {
		var i = this;
		return Y(function* () {
			for (const e of t) e.stacktrace && e.stacktrace.frames && T(e.stacktrace.frames) && (e.stacktrace.frames = yield i.applyModifiers(e.stacktrace.frames));
			return t;
		})();
	}
	coerceFallback(t) {
		var i;
		return {
			type: "Error",
			value: "Unknown error",
			stack: null === (i = t.syntheticException) || void 0 === i ? void 0 : i.stack,
			synthetic: !0
		};
	}
	parseStacktrace(t, i) {
		var e;
		let s, n;
		if (null != t.cause && (s = this.parseStacktrace(t.cause, i)), "" != t.stack && null != t.stack) try {
			n = this.applyChunkIds(this.stackParser(t.stack, t.synthetic ? i.skipFirstLines : 0), i.chunkIdMap);
		} catch (t) {}
		return Ei(Ei({}, t), {}, {
			cause: s,
			stack: n,
			errors: null === (e = t.errors) || void 0 === e ? void 0 : e.map((t) => this.parseStacktrace(t, i))
		});
	}
	applyChunkIds(t, i) {
		return t.map((t) => (t.filename && i && (t.chunk_id = i[t.filename]), t));
	}
	applyCoercers(t, i) {
		for (const e of this.coercers) if (e.match(t)) return e.coerce(t, i);
		return this.coerceFallback(i);
	}
	applyModifiers(t) {
		var i = this;
		return Y(function* () {
			let e = t;
			for (const t of i.modifiers) e = yield t(e);
			return e;
		})();
	}
	convertToExceptionList(t, i) {
		const e = [], s = (t, n, r) => {
			var o;
			const l = e.length, a = void 0 === n ? Ei(Ei({ type: "string" == typeof i.type && i.type.length > 0 ? i.type : "generic" }, "boolean" == typeof i.handled ? { handled: i.handled } : void 0 === i.handled ? { handled: !0 } : {}), {}, {
				synthetic: "boolean" == typeof i.synthetic ? i.synthetic : t.synthetic,
				exception_id: l
			}) : {
				type: "chained",
				source: r,
				synthetic: t.synthetic,
				exception_id: l,
				parent_id: n
			}, u = {
				type: t.type,
				value: t.value,
				mechanism: a
			};
			t.stack && (u.stacktrace = {
				type: "raw",
				frames: t.stack
			}), e.push(u), t.cause && s(t.cause, l, "cause");
			for (const i of null !== (o = t.errors) && void 0 !== o ? o : []) s(i, l, "member");
		};
		return s(t), e;
	}
	buildParsingContext(t) {
		var i;
		return {
			chunkIdMap: wi(this.stackParser),
			skipFirstLines: null !== (i = t.skipFirstLines) && void 0 !== i ? i : 1
		};
	}
	getAggregateErrors(t) {
		try {
			if (H(t)) {
				let e = Object.getPrototypeOf(t);
				for (let s = 0; e && 100 > s; s++) {
					var i;
					const s = null === (i = Object.getOwnPropertyDescriptor(e, "constructor")) || void 0 === i ? void 0 : i.value;
					if ("function" == typeof s && "AggregateError" === s.name) {
						const i = t.errors;
						return T(i) ? i : void 0;
					}
					e = Object.getPrototypeOf(e);
				}
			}
		} catch (t) {}
	}
	buildCoercingContext(t, i, e = 0) {
		let s = 0, n = 0, r = !1;
		const o = /* @__PURE__ */ new Set(), l = [], a = {}, u = (t, i, e = 0) => {
			const u = h(i, e), d = u.apply;
			if (u.apply = (i) => {
				l.push(t);
				try {
					return d(i);
				} finally {
					l.pop();
				}
			}, e > 4 || e > 0 && -1 !== l.indexOf(t)) return this.coerceFallback(u);
			const c = "object" == typeof t && null !== t || "function" == typeof t;
			if (0 === e && s >= 50 || c && o.has(t)) return;
			c && o.add(t), 0 === e && s++;
			const v = this.getAggregateErrors(t);
			let f, p;
			r || (r = !!v);
			try {
				if (f = this.applyCoercers(t, u), !f) throw a;
			} catch (t) {
				if (t === a) return void (0 === e && s--);
				if (!r) throw t;
				f = this.coerceFallback(u);
			}
			if (!v || s >= 50) return f;
			try {
				p = v.length;
			} catch (t) {
				return f;
			}
			if (!Number.isInteger(p) || 0 > p || p > 4294967295) return f;
			const _ = [];
			for (let t = 0; 50 > s && 1e3 > n && p > t; t++) {
				let e;
				n++;
				try {
					e = u.next(v[t]);
				} catch (t) {
					s++, e = this.coerceFallback(h(i + 1));
				}
				e && _.push(e);
			}
			return Ei(Ei({}, f), {}, { errors: _ });
		}, h = (e, s = 0) => Ei(Ei({}, i), {}, {
			syntheticException: 0 == e ? i.syntheticException : void 0,
			mechanism: 0 == e ? t : {},
			apply(t) {
				const i = u(t, e, s + 1);
				if (!i) throw a;
				return i;
			},
			next: (t) => u(t, e + 1)
		}), d = h(e);
		return Ei(Ei({}, d), {}, { apply: (t) => {
			var i;
			return null !== (i = u(t, e)) && void 0 !== i ? i : this.coerceFallback(d);
		} });
	}
};
var Ti = /^([a-z][a-z0-9.+-]+):/i;
var Pi = [
	"http",
	"https",
	"file",
	"blob",
	"app",
	"capacitor",
	"ionic",
	"webpack",
	"webpack-internal",
	"ng"
];
function Ci(t) {
	if (!t || "<anonymous>" === t) return !1;
	const i = Ti.exec(t);
	return !i || Pi.includes(i[1].toLowerCase());
}
function Oi(t, i, e, s, n) {
	const r = {
		platform: t,
		filename: i,
		function: "<anonymous>" === e ? "?" : e,
		in_app: Ci(i)
	};
	return R(s) || (r.lineno = s), R(n) || (r.colno = n), r;
}
var Ri = (t, i) => {
	const e = -1 !== t.indexOf("safari-extension"), s = -1 !== t.indexOf("safari-web-extension");
	return e || s ? [-1 !== t.indexOf("@") ? t.split("@")[0] : "?", e ? `safari-extension:${i}` : `safari-web-extension:${i}`] : [t, i];
};
var Ii = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i;
var Fi = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
var Mi = /\((\S*)(?::(\d+))(?::(\d+))\)/;
var Ai = (t, i) => {
	const e = Ii.exec(t);
	if (e) {
		const [, t, s, n] = e;
		return Oi(i, t, "?", +s, +n);
	}
	const s = Fi.exec(t);
	if (s) {
		if (s[2] && 0 === s[2].indexOf("eval")) {
			const t = Mi.exec(s[2]);
			t && (s[2] = t[1], s[3] = t[2], s[4] = t[3]);
		}
		const [t, e] = Ri(s[1] || "?", s[2]);
		return Oi(i, e, t, s[3] ? +s[3] : void 0, s[4] ? +s[4] : void 0);
	}
};
var Di = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
var Ni = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
var ji = (t, i) => {
	const e = Di.exec(t);
	if (e) {
		if (e[3] && e[3].indexOf(" > eval") > -1) {
			const t = Ni.exec(e[3]);
			t && (e[1] = e[1] || "eval", e[3] = t[1], e[4] = t[2], e[5] = "");
		}
		let t = e[3], s = e[1] || "?";
		return [s, t] = Ri(s, t), Oi(i, t, s, e[4] ? +e[4] : void 0, e[5] ? +e[5] : void 0);
	}
};
var Li = /\(error: (.*)\)/;
function Bi(t, i) {
	return t.filename === i.filename && t.function === i.function && t.module === i.module && t.lineno === i.lineno && t.colno === i.colno;
}
function Ui(t) {
	for (let i = 1; 10 >= i; i++) {
		const e = t.length - 2 * i;
		if (0 > e) break;
		let s = !0;
		for (let n = 0; i > n; n++) if (!Bi(t[e + n], t[e + i + n])) {
			s = !1;
			break;
		}
		if (s) {
			for (let s = 0; i > s; s++) t[e + s] = t[e + i + s];
			return t.length = e + i, {
				start: e,
				length: i
			};
		}
	}
}
function zi(t, i) {
	const e = i.start + i.length, s = qi(t, i);
	s && t.splice(e + s === t.length ? e : i.start, s);
}
function Hi(t, i) {
	let e = i.start;
	for (; e > 0 && Bi(t[e - 1], t[e - 1 + i.length]);) e--;
	return i.start - e;
}
function qi(t, i) {
	const e = i.start + i.length;
	let s = e;
	for (; t.length > s && Bi(t[s], t[s - i.length]);) s++;
	return s - e;
}
function Vi(t, i) {
	const e = i[0];
	let s = t.length - (e ? Hi(t, e) : 0);
	for (const e of i) s -= qi(t, e);
	return s;
}
function Wi(t, i, e) {
	for (let s = 0; t.length > s; s++) {
		const n = t[(i + s) % t.length], r = t[(e + s) % t.length];
		if (n !== r) return r > n;
	}
	return !1;
}
var Gi = class {
	match(t) {
		return this.isDOMException(t) || this.isDOMError(t);
	}
	coerce(t, i) {
		const e = I(t.stack);
		return {
			type: this.getType(t),
			value: this.getValue(t),
			stack: e ? t.stack : void 0,
			cause: t.cause ? i.next(t.cause) : void 0,
			synthetic: !1
		};
	}
	getType(t) {
		return this.isDOMError(t) ? "DOMError" : "DOMException";
	}
	getValue(t) {
		const i = t.name || (this.isDOMError(t) ? "DOMError" : "DOMException");
		return t.message ? `${i}: ${t.message}` : i;
	}
	isDOMException(t) {
		return z(t, "DOMException");
	}
	isDOMError(t) {
		return z(t, "DOMError");
	}
};
var Ki = class {
	match(t) {
		return H(t);
	}
	coerce(t, i) {
		var e;
		const s = this.getStack(t), n = void 0 === s ? null === (e = i.syntheticException) || void 0 === e ? void 0 : e.stack : void 0, r = !!n;
		return {
			type: this.getType(t),
			value: this.getMessage(t, i),
			stack: null != s ? s : n,
			cause: t.cause ? i.next(t.cause) : void 0,
			synthetic: r
		};
	}
	getType(t) {
		return t.name || t.constructor.name;
	}
	getMessage(t, i) {
		const e = t.message;
		return String(e.error && "string" == typeof e.error.message ? e.error.message : e);
	}
	getStack(t) {
		try {
			const i = t.stacktrace;
			if ("string" == typeof i && i.length > 0) return i;
			const e = t.stack;
			return "string" == typeof e && e.length > 0 ? e : void 0;
		} catch (t) {
			return;
		}
	}
};
var Ji = class {
	match(t) {
		return !!z(t, "ErrorEvent") && (null != t.error || this.ur(t));
	}
	coerce(t, i) {
		var e;
		if (null != t.error) return i.apply(t.error);
		const s = i.apply(t.message);
		return Ei(Ei({}, s), {}, {
			stack: null !== (e = this.cr(t)) && void 0 !== e ? e : s.stack,
			synthetic: !0
		});
	}
	ur(t) {
		return I(t.message) && t.message.length > 0;
	}
	cr(t) {
		var i, e;
		const s = t, n = null !== (i = s.lineno) && void 0 !== i ? i : 0, r = null !== (e = s.colno) && void 0 !== e ? e : 0;
		if (I(s.filename) && 0 !== s.filename.length && 0 !== n) return `Error\n    at ${s.filename}:${n}:${r}`;
	}
};
var Yi = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
var Xi = class {
	match(t) {
		return "string" == typeof t;
	}
	coerce(t, i) {
		var e;
		const [s, n] = this.getInfos(t);
		return {
			type: null != s ? s : "Error",
			value: null != n ? n : t,
			stack: null === (e = i.syntheticException) || void 0 === e ? void 0 : e.stack,
			synthetic: !0
		};
	}
	getInfos(t) {
		let i = "Error", e = t;
		const s = t.match(Yi);
		return s && (i = s[1], e = s[2]), [i, e];
	}
};
var Qi = [
	"fatal",
	"error",
	"warning",
	"log",
	"info",
	"debug"
];
function Zi(t, i = 40) {
	const e = Object.keys(t);
	if (e.sort(), !e.length) return "[object has no keys]";
	for (let t = e.length; t > 0; t--) {
		const s = e.slice(0, t).join(", ");
		if (i >= s.length) return t === e.length ? s : s.length > i ? `${s.slice(0, i)}...` : s;
	}
	return "";
}
var te = class {
	match(t) {
		return "object" == typeof t && null !== t;
	}
	coerce(t, i) {
		var e, s;
		const n = this.getErrorPropertyFromObject(t);
		return n ? i.apply(n) : {
			type: this.getType(t),
			value: this.getValue(t),
			stack: null !== (e = this.getStack(t)) && void 0 !== e ? e : null === (s = i.syntheticException) || void 0 === s ? void 0 : s.stack,
			level: this.isSeverityLevel(t.level) ? t.level : "error",
			synthetic: !0
		};
	}
	getType(t) {
		if (q(t)) return t.constructor.name;
		const i = "name" in t ? t.name : void 0;
		return I(i) && !F(i) ? i : "Error";
	}
	getValue(t) {
		if ("name" in t && "string" == typeof t.name) {
			let i = `'${t.name}' captured as exception`;
			return "message" in t && "string" == typeof t.message && (i += ` with message: '${t.message}'`), i;
		}
		if ("message" in t && "string" == typeof t.message) return t.message;
		const i = this.getObjectClassName(t);
		return `${i && "Object" !== i ? `'${i}'` : "Object"} captured as exception with keys: ${Zi(t)}`;
	}
	isSeverityLevel(t) {
		return I(t) && !F(t) && Qi.indexOf(t) >= 0;
	}
	getStack(t) {
		try {
			return I(t.stacktrace) && t.stacktrace.length > 0 ? t.stacktrace : I(t.stack) && t.stack.length > 0 ? t.stack : void 0;
		} catch (t) {
			return;
		}
	}
	getErrorPropertyFromObject(t) {
		for (const i in t) if ({}.hasOwnProperty.call(t, i)) {
			const e = t[i];
			if (H(e)) return e;
		}
	}
	getObjectClassName(t) {
		try {
			const i = Object.getPrototypeOf(t);
			return i ? i.constructor.name : void 0;
		} catch (t) {
			return;
		}
	}
};
var ie = class {
	match(t) {
		return q(t);
	}
	coerce(t, i) {
		var e;
		const s = t.constructor.name;
		return {
			type: s,
			value: `${s} captured as exception with keys: ${Zi(t)}`,
			stack: null === (e = i.syntheticException) || void 0 === e ? void 0 : e.stack,
			synthetic: !0
		};
	}
};
var ee = class {
	match(t) {
		return U(t);
	}
	coerce(t, i) {
		var e;
		return {
			type: "Error",
			value: `Primitive value captured as exception: ${String(t)}`,
			stack: null === (e = i.syntheticException) || void 0 === e ? void 0 : e.stack,
			synthetic: !0
		};
	}
};
var se = class {
	match(t) {
		return z(t, "PromiseRejectionEvent") || this.isCustomEventWrappingRejection(t);
	}
	isCustomEventWrappingRejection(t) {
		if (!q(t)) return !1;
		try {
			const i = t.detail;
			return null != i && "object" == typeof i && "reason" in i;
		} catch (t) {
			return !1;
		}
	}
	coerce(t, i) {
		var e;
		const s = this.getUnhandledRejectionReason(t);
		return U(s) ? {
			type: "UnhandledRejection",
			value: `Non-Error promise rejection captured with value: ${String(s)}`,
			stack: null === (e = i.syntheticException) || void 0 === e ? void 0 : e.stack,
			synthetic: !0
		} : i.apply(s);
	}
	getUnhandledRejectionReason(t) {
		try {
			if ("reason" in t) return t.reason;
			if ("detail" in t && null != t.detail && "object" == typeof t.detail && "reason" in t.detail) return t.detail.reason;
		} catch (t) {}
		return t;
	}
};
var ne = "$message";
var re = "$timestamp";
var oe = /* @__PURE__ */ new Set([ne, re]);
var le = {
	enabled: !0,
	max_bytes: 32768
};
function ae(t) {
	var i;
	return t ? {
		enabled: null !== (i = t.enabled) && void 0 !== i ? i : le.enabled,
		max_bytes: he(t.max_bytes, le.max_bytes)
	} : Ei({}, le);
}
var ue = class {
	constructor(t) {
		this.ns = [], this.ss = 0, this.Ir = ae(t);
	}
	setConfig(t) {
		this.Ir = ae(t), this.rs();
	}
	add(t) {
		const i = function(t) {
			let i;
			try {
				i = S(t);
			} catch (t) {
				return;
			}
			try {
				const t = JSON.parse(i);
				if (!C(t)) return;
				const e = t, s = e[ne], n = e[re];
				if (!I(s) || 0 === s.trim().length) return;
				if (!I(n) && !D(n)) return;
				return {
					step: e,
					json: i
				};
			} catch (t) {
				return;
			}
		}(t);
		if (!i) return;
		const e = function(t) {
			if ("u" > typeof TextEncoder) return new TextEncoder().encode(t).length;
			const i = encodeURIComponent(t);
			let e = 0;
			for (let t = 0; i.length > t; t++) "%" === i[t] ? (e += 1, t += 2) : e += 1;
			return e;
		}(i.json);
		e > this.Ir.max_bytes || (this.ns.push({
			step: i.step,
			bytes: e
		}), this.ss += e, this.rs());
	}
	getAttachable() {
		return this.ns.map((t) => t.step);
	}
	clear() {
		this.ns = [], this.ss = 0;
	}
	size() {
		return this.ns.length;
	}
	rs() {
		for (; this.ss > this.Ir.max_bytes && this.ns.length > 0;) {
			const t = this.ns.shift();
			t && (this.ss -= t.bytes);
		}
	}
};
function he(t, i) {
	if (!D(t) || 1 / 0 === t || -1 / 0 === t) return i;
	const e = Math.floor(t);
	return 0 > e ? i : e;
}
var de = (t) => {
	if ("string" != typeof t) return t;
	try {
		return JSON.parse(t);
	} catch (i) {
		return t;
	}
};
function ce(t) {
	return "string" == typeof t || t;
}
function ve(t) {
	return "string" == typeof t ? t : void 0;
}
var fe = [
	"$feature_flag",
	"$feature_flag_response",
	"$feature_flag_has_experiment",
	"$feature_flag_id",
	"$feature_flag_version",
	"$feature_flag_reason",
	"$feature_flag_request_id",
	"$feature_flag_evaluated_at",
	"$feature_flag_error",
	"locally_evaluated",
	"$groups",
	"$process_person_profile",
	"$geoip_disable",
	"$current_url",
	"$pathname",
	"$referring_domain",
	"utm_source",
	"utm_medium",
	"utm_campaign",
	"utm_content",
	"utm_term",
	"gad_source",
	"mc_cid",
	"gclid",
	"gclsrc",
	"dclid",
	"gbraid",
	"wbraid",
	"fbclid",
	"msclkid",
	"twclid",
	"li_fat_id",
	"igshid",
	"ttclid",
	"rdt_cid",
	"epik",
	"qclid",
	"sccid",
	"irclid",
	"_kx",
	"$session_id",
	"$window_id",
	"$lib",
	"$lib_version",
	"$device_id",
	"$is_server"
];
var pe = "NativeGzipValidationError";
var _e = (t) => t.length >= 2 && 31 === t[0] && 139 === t[1];
var ge = (t, i) => t === _.GZipJS || i === _.GZipJS || "gzip" === i;
var me = (t) => !(!t || "object" != typeof t) && "NotReadableError" === ("name" in t ? String(t.name) : "");
var be;
var ye = (t) => {
	throw ci(pe, `Native gzip produced invalid output: ${t}`);
};
var we = ($e = Y(function* (t, i) {
	18 > t.size && ye("too-short");
	const e = new Uint8Array(yield t.slice(0, 10).arrayBuffer());
	_e(e) && 8 === e[2] || ye("invalid-header");
	const s = new DataView(yield t.slice(t.size - 8).arrayBuffer());
	s.getUint32(0, !0) !== ((t) => {
		const i = (() => {
			if (be) return be;
			be = [];
			for (let t = 0; 256 > t; t++) {
				let i = t;
				for (let t = 0; 8 > t; t++) i = 1 & i ? 3988292384 ^ i >>> 1 : i >>> 1;
				be[t] = i >>> 0;
			}
			return be;
		})();
		let e = 4294967295;
		for (let s = 0; t.length > s; s++) e = i[255 & (e ^ t[s])] ^ e >>> 8;
		return (4294967295 ^ e) >>> 0;
	})(i) && ye("invalid-crc");
	const n = i.length >>> 0;
	s.getUint32(4, !0) !== n && ye("invalid-size");
}), function(t, i) {
	return $e.apply(this, arguments);
});
var $e;
function Se() {
	return Se = Y(function* (t, i = !0, e) {
		try {
			const i = new TextEncoder().encode(t), e = new globalThis.CompressionStream("gzip"), n = e.writable.getWriter(), r = n.write(i).then(() => n.close()).catch((s = Y(function* (t) {
				try {
					yield n.abort(t);
				} catch (t) {}
				throw t;
			}), function(t) {
				return s.apply(this, arguments);
			})), o = new Response(e.readable).blob(), [l] = yield Promise.all([o, r]);
			return yield we(l, i), l;
		} catch (t) {
			if (null == e ? void 0 : e.rethrow) throw t;
			return i && console.error("Failed to gzip compress data", t), null;
		}
		var s;
	}), Se.apply(this, arguments);
}
function xe(t, i) {
	if (null == t) return {};
	var e, s, n = function(t, i) {
		if (null == t) return {};
		var e = {};
		for (var s in t) if ({}.hasOwnProperty.call(t, s)) {
			if (i.includes(s)) continue;
			e[s] = t[s];
		}
		return e;
	}(t, i);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(t);
		for (s = 0; r.length > s; s++) i.includes(e = r[s]) || {}.propertyIsEnumerable.call(t, e) && (n[e] = t[e]);
	}
	return n;
}
var Ee = {}.propertyIsEnumerable;
function ke(t, i) {
	try {
		return Ce(t, i, {
			ancestors: /* @__PURE__ */ new WeakSet(),
			remainingNodes: 1e4
		}, 0);
	} catch (t) {
		return [];
	}
}
function Te(t, i, e, s) {
	if (0 >= e.remainingNodes) return { stringValue: ni };
	if (e.remainingNodes--, j(t)) return { boolValue: t };
	if ("bigint" == typeof t) return function(t, i) {
		const e = t.toString(), s = BigInt("9223372036854775808");
		return t >= s || -s > t ? (i?.debug(`Attribute ${e} is outside the int64 range; encoding it as a string`), { stringValue: e }) : { intValue: e };
	}(t, i);
	if ("number" == typeof t) {
		if (!Number.isFinite(t)) return { stringValue: String(t) };
		if (Number.isInteger(t)) {
			if (Number.isSafeInteger(t)) return { intValue: String(t) };
			if (typeof BigInt > "u") return { stringValue: String(t) };
			const e = BigInt(t).toString();
			return t >= 0x8000000000000000 || -0x8000000000000000 > t ? (i?.debug(`Attribute ${e} is outside the int64 range; encoding it as a string`), { stringValue: e }) : { intValue: e };
		}
		return { doubleValue: t };
	}
	if ("string" == typeof t) return { stringValue: oi(t) };
	if ("function" == typeof t) return { stringValue: "[Function]" };
	if ("symbol" == typeof t) return { stringValue: String(t) };
	if ("object" == typeof t && null !== t) {
		if (e.ancestors.has(t)) return { stringValue: "[Circular]" };
		if (s >= 20) return { stringValue: ni };
		if (t instanceof Date) {
			const i = t.getTime(), e = Number.isFinite(i) ? t.toISOString() : String(t);
			return { stringValue: "string" == typeof e ? oi(e) : String(e) };
		}
		e.ancestors.add(t);
		try {
			try {
				const n = t.toJSON;
				if ("function" == typeof n) return Te(n.call(t), i, e, s + 1);
			} catch (t) {}
			return T(t) ? { arrayValue: { values: Pe(t, i, e, s + 1) } } : { kvlistValue: { values: Ce(t, i, e, s + 1) } };
		} finally {
			e.ancestors.delete(t);
		}
	}
	return { stringValue: oi(String(t)) };
}
function Pe(t, i, e, s) {
	const n = [], r = Math.min(t.length, 1e3);
	let o = 0;
	for (; r > o && e.remainingNodes > 0; o++) try {
		const r = o in t ? t[o] : void 0;
		if (A(r)) continue;
		n.push(Te(r, i, e, s));
	} catch (t) {
		n.push({ stringValue: ri });
	}
	return t.length > o && n.push({ stringValue: ni }), n;
}
function Ce(t, i, e, s) {
	const n = [];
	for (const r in t) if (Ee.call(t, r)) {
		if (!r) {
			i?.debug("Dropping an attribute with an empty key");
			continue;
		}
		if (n.length >= 1e3 || 0 >= e.remainingNodes) {
			i?.debug("Attributes truncated: the value exceeds the OTLP encoder budget");
			break;
		}
		try {
			const o = t[r];
			if (M(o) || R(o)) continue;
			n.push({
				key: oi(r),
				value: Te(o, i, e, s)
			});
		} catch (t) {
			n.push({
				key: oi(r),
				value: { stringValue: ri }
			});
		}
	}
	return n;
}
function Oe(t, i, e) {
	return Ei(Ei(Ei(Ei({}, li({}, t.resourceAttributes)), {}, { "service.name": t.serviceName || "unknown_service" }, t.environment && { "deployment.environment": t.environment }), t.serviceVersion && { "service.version": t.serviceVersion }), {}, {
		"telemetry.sdk.name": i,
		"telemetry.sdk.version": e
	});
}
var Re = [
	"service.name",
	"deployment.environment",
	"service.version",
	"telemetry.sdk.name",
	"telemetry.sdk.version"
];
function Ie(t, i) {
	const e = li({}, t), s = {};
	for (const t of Re) ({}).hasOwnProperty.call(e, t) && (s[t] = e[t], delete e[t]);
	return [...ke(e, i), ...ke(s, i)];
}
var Fe = {
	darwin: "macOS",
	win32: "Windows",
	cygwin: "Windows",
	linux: "Linux",
	android: "Android",
	freebsd: "FreeBSD",
	openbsd: "OpenBSD",
	netbsd: "NetBSD",
	sunos: "SunOS",
	aix: "AIX",
	haiku: "Haiku",
	"Mac OS X": "macOS"
};
var Me = {
	trace: {
		text: "TRACE",
		number: 1
	},
	debug: {
		text: "DEBUG",
		number: 5
	},
	info: {
		text: "INFO",
		number: 9
	},
	warn: {
		text: "WARN",
		number: 13
	},
	error: {
		text: "ERROR",
		number: 17
	},
	fatal: {
		text: "FATAL",
		number: 21
	}
};
var Ae = Me.info;
function De(t) {
	try {
		return oi(String(t));
	} catch (t) {
		return ri;
	}
}
function Ne(t, i, e, s) {
	const { text: r, number: o } = Me[t.level || "info"] || Ae, l = function(t = Date.now()) {
		return String(t) + "000000";
	}(D(s) ? s : void 0), a = {};
	i.distinctId && (a.posthogDistinctId = i.distinctId), i.sessionId && (a.sessionId = i.sessionId), i.windowId && (a["window.id"] = i.windowId), A(i.sessionStartTimestamp) || (a.sessionStartTimestamp = String(i.sessionStartTimestamp)), A(i.lastActivityTimestamp) || (a.lastActivityTimestamp = String(i.lastActivityTimestamp)), i.currentUrl && (a["url.full"] = i.currentUrl), i.screenName && (a["screen.name"] = i.screenName), i.appState && (a["app.state"] = i.appState), i.activeFeatureFlags && i.activeFeatureFlags.length > 0 && (a.feature_flags = i.activeFeatureFlags);
	const u = Ei({}, a), h = t.attributes;
	if (h) {
		let t = [];
		try {
			t = Object.keys(h);
		} catch (i) {
			t = [];
		}
		for (const i of t) {
			let t;
			try {
				t = h[i];
			} catch (i) {
				t = ri;
			}
			Object.defineProperty(u, i, {
				value: t,
				enumerable: !0,
				writable: !0,
				configurable: !0
			});
		}
	}
	const d = {
		timeUnixNano: l,
		observedTimeUnixNano: l,
		severityNumber: o,
		severityText: r,
		body: { stringValue: De(t.body) },
		attributes: ke(u, e)
	};
	return t.trace_id && (d.traceId = t.trace_id), t.span_id && (d.spanId = t.span_id), R(t.trace_flags) || (d.flags = t.trace_flags), d;
}
function je(t, i, e) {
	return Oe(t, i, e);
}
function Le(t, i, e, s) {
	return { resourceLogs: [{
		resource: { attributes: Ie(i) },
		scopeLogs: [{
			scope: {
				name: e,
				version: s
			},
			logRecords: t
		}]
	}] };
}
var Be = class {
	constructor(t) {
		this.ls = t, this.us = 0;
	}
	get pending() {
		return !!this.hs;
	}
	arm(t) {
		this.clear(), this.us = Date.now() + t, this.hs = pi(() => {
			this.hs = void 0, this.ls();
		}, t);
	}
	armNoEarlierThan(t) {
		this.hs && Date.now() + t <= this.us || this.arm(t);
	}
	clear() {
		this.hs && (clearTimeout(this.hs), this.hs = void 0);
	}
};
function Ue() {
	return .75 + .5 * Math.random();
}
function ze(t, i, e, s) {
	const n = Math.min(Math.max(0, i - 1), 6), r = t * Math.pow(2, n);
	return Math.round((void 0 === s ? r : Math.min(r, Math.max(s, t))) * e);
}
var He = class {
	constructor(t, i, e, s, n, r = () => Promise.resolve(), o) {
		var l;
		this._instance = t, this.Ir = i, this.$ = e, this.cs = s, this.ds = n, this.vs = r, this.fs = o, this.ps = new Be(() => this.gs()), this.ys = null, this.bs = 0, this._s = 0, this.ws = new ui(), this.ks = 0, this.Ss = 1, this.xs = 0, this.Cs = 0, this.$s = !1, this.Is = i.maxBufferSize, this.Ts = Math.max(null !== (l = i.maxQueueSize) && void 0 !== l ? l : i.maxBufferSize, i.maxBufferSize), this.Ms = i.flushIntervalMs, this.Es = i.maxBatchRecordsPerPost, this.Ps = i.rateCapWindowMs, this.Rs = i.maxLogsPerInterval;
	}
	clearQueue() {
		this._s++, this._instance.setPersistedProperty(p.LogsQueue, []);
	}
	reset() {
		this.ps.clear(), this.xs = 0, this.Cs = 0, this.$s = !1, this.ks = 0, this.Ss = 1, this.ws.reset(), this.Es = this.Ir.maxBatchRecordsPerPost;
	}
	onReconnect() {
		this.ks = 0, this.Ss = 1, this.ws.isOpen() ? this.As() && this.Fs() : this.gs();
	}
	captureLog(t, i) {
		var e;
		if (this._instance.isDisabled) return;
		if (this._instance.optedOut) return;
		if (!(null == t ? void 0 : t.body)) return;
		const s = this.Os(t);
		if (null === s) return;
		if (!s.body) return void this.$.info("Log was rejected in beforeSend function");
		if (!this.Ds()) return;
		const n = { record: Ne(s, null !== (e = null == i ? void 0 : i.context) && void 0 !== e ? e : this.cs(), this.$, null == i ? void 0 : i.occurredAtMs) };
		this.ds(() => this.Ls(n));
	}
	Os(t) {
		const i = this.Ir.beforeSend;
		if (!i) return t;
		const e = T(i) ? i : [i];
		let s = t;
		for (const t of e) try {
			const i = t(s);
			if (!i) return this.$.info("Log was rejected in beforeSend function"), null;
			s = i;
		} catch (t) {
			return this.$.error("Error in beforeSend function for log:", t), null;
		}
		return s;
	}
	Ds() {
		if (void 0 === this.Rs) return !0;
		const t = Date.now(), i = t - this.xs;
		return this.Ps > i && i >= 0 || (this.xs = t, this.Cs = 0, this.$s = !1), this.Rs > this.Cs ? (this.Cs++, !0) : (this.$s || (this.$.warn(`captureLog dropping logs: exceeded ${this.Rs} logs per ${this.Ps}ms`), this.$s = !0), !1);
	}
	flush() {
		var t = this;
		return Y(function* () {
			if (!t._instance.isDisabled) return t.ys || (t.ys = t.Ns().finally(() => {
				t.ys = null;
			})), t.ys;
		})();
	}
	Ns() {
		var t = this;
		return Y(function* () {
			var i;
			t.ps.clear();
			let e = null !== (i = t._instance.getPersistedProperty(p.LogsQueue)) && void 0 !== i ? i : [];
			if (0 === e.length) return;
			const s = e.length;
			let n = 0;
			for (; e.length > 0 && s > n;) {
				var r, o;
				const i = t._s;
				t.bs = 0;
				const s = Math.min(e.length, t.Es), l = e.slice(0, s), a = Le(l.map((t) => t.record), t.qs(), null !== (r = t.fs) && void 0 !== r ? r : t._instance.getLibraryId(), t._instance.getLibraryVersion()), u = yield t._instance.js(a);
				if (t._s !== i) return;
				if ("too-large" === u.kind && l.length > 1) t.Es = Math.max(1, Math.floor(l.length / 2)), t.$.warn(`Logs batch of size ${l.length} was too large for the ingestion endpoint, reducing batch size to ${t.Es}`);
				else {
					if (t.ws.record(u), t.ps.pending && t.ps.arm(Math.max(t.Ms, t.ws.remainingMs())), "retry-later" === u.kind) throw u.error;
					if ("too-large" === u.kind ? t.$.warn("Dropping a single log record with batch size 1 — the record is larger than the server cap and cannot be split further.") : "ok" === u.kind && t.Ir.maxBatchRecordsPerPost > t.Es && (t.Es = Math.min(t.Ir.maxBatchRecordsPerPost, t.Es + 1)), yield t.Bs(l.length), e = null !== (o = t._instance.getPersistedProperty(p.LogsQueue)) && void 0 !== o ? o : [], n += l.length, "fatal" === u.kind) throw u.error;
				}
			}
		})();
	}
	Bs(t) {
		var i = this;
		return Y(function* () {
			var e;
			const s = Math.max(0, t - i.bs), n = null !== (e = i._instance.getPersistedProperty(p.LogsQueue)) && void 0 !== e ? e : [];
			i._instance.setPersistedProperty(p.LogsQueue, n.slice(s)), yield i.vs();
		})();
	}
	qs() {
		return je(this.Ir, this._instance.getLibraryId(), this._instance.getLibraryVersion());
	}
	Ls(t) {
		var i;
		if (this._instance.optedOut) return;
		const e = null !== (i = this._instance.getPersistedProperty(p.LogsQueue)) && void 0 !== i ? i : [];
		this.Ts > e.length || (e.shift(), this.bs++, this.$.info("Logs queue is full, dropping oldest record.")), e.push(t), this._instance.setPersistedProperty(p.LogsQueue, e), this.Is > e.length || this.ws.isOpen() ? this.Fs() : this.gs();
	}
	Fs() {
		this.ps.pending || this.ps.arm(Math.max(this.Ms, this.ws.remainingMs()));
	}
	Hs() {
		return Math.max(ze(this.Ms, this.ks, this.Ss, 3e4), this.ws.remainingMs());
	}
	As() {
		const t = this._instance.getPersistedProperty(p.LogsQueue);
		return !!t && t.length > 0;
	}
	shutdown(t) {
		var i = this;
		return Y(function* () {
			i.ps.clear();
			const e = i.flush().catch(() => {});
			void 0 !== t ? yield _i(e, t) : yield e;
		})();
	}
	flushWithTimeout(t) {
		var i = this;
		return Y(function* () {
			const e = i.flush();
			yield _i(e, t, () => {
				e.catch(() => {});
			});
		})();
	}
	gs() {
		this.flush().then(() => {
			this.ks = 0, this.Ss = 1;
		}, (t) => {
			this.ks++, this.Ss = Ue(), this.$.error("PostHog logs flush failed:", t);
		}).finally(() => {
			!this._instance.isDisabled && this.As() && this.ps.armNoEarlierThan(this.Hs());
		});
	}
};
var qe = [
	0,
	5,
	10,
	25,
	50,
	75,
	100,
	250,
	500,
	750,
	1e3,
	2500,
	5e3,
	7500,
	1e4
];
function Ve(t) {
	return String(t) + "000000";
}
function We(t, i, e, s) {
	let n = "";
	return s && (n = Object.keys(s).sort().map((t) => `${JSON.stringify(t)}:${JSON.stringify(s[t])}`).join(",")), `${t}\0${i}\0${null != e ? e : ""}\0${n}`;
}
var Ge = class {
	constructor(t, i, e) {
		this._instance = t, this.Ir = i, this.$ = e, this.zs = /* @__PURE__ */ new Map(), this.ps = new Be(() => this.flush().catch((t) => {
			this.$.error("Metrics flush failed:", t);
		})), this.ys = null, this.Us = !1, this.Ws = /* @__PURE__ */ new Map(), this.Vs = /* @__PURE__ */ new Set(), this.ws = new ui(), this.ks = 0, this.Ss = 1, this.Gs = 0;
	}
	count(t, i = 1, e) {
		this.Zs({
			name: t,
			type: "count",
			value: i,
			unit: null == e ? void 0 : e.unit,
			attributes: null == e ? void 0 : e.attributes
		});
	}
	gauge(t, i, e) {
		this.Zs({
			name: t,
			type: "gauge",
			value: i,
			unit: null == e ? void 0 : e.unit,
			attributes: null == e ? void 0 : e.attributes
		});
	}
	histogram(t, i, e) {
		this.Zs({
			name: t,
			type: "histogram",
			value: i,
			unit: null == e ? void 0 : e.unit,
			attributes: null == e ? void 0 : e.attributes
		});
	}
	flush() {
		var t = this;
		const i = this.ys, e = function() {
			var e = Y(function* () {
				i && (yield i.catch(() => {})), yield t.Qs();
			});
			return function() {
				return e.apply(this, arguments);
			};
		}()().finally(() => {
			this.ys === e && (this.ys = null);
		});
		return this.ys = e, e;
	}
	drainWindow() {
		if (0 === this.zs.size) return null;
		const t = this.zs;
		return this.zs = /* @__PURE__ */ new Map(), this.Us = !1, this.Ws = /* @__PURE__ */ new Map(), this.Vs = /* @__PURE__ */ new Set(), this.Js(t);
	}
	reset() {
		this.Gs++, this.ws.reset(), this.ks = 0, this.Ss = 1, this.ps.clear(), this.zs = /* @__PURE__ */ new Map(), this.ys = null, this.Us = !1, this.Ws = /* @__PURE__ */ new Map(), this.Vs = /* @__PURE__ */ new Set();
	}
	Zs(t) {
		if (this._instance.isDisabled || this._instance.optedOut) return;
		const i = this.Os(t);
		if (null === i) return;
		if (!i.name || "string" != typeof i.name) return void this.$.warn("Dropping metric with empty name");
		if ("number" != typeof i.value || !Number.isFinite(i.value)) return void this.$.warn(`Dropping metric '${i.name}': value must be a finite number`);
		if ("count" === i.type && 0 > i.value) return void this.$.warn(`Dropping count '${i.name}': counters are monotonic, value must be >= 0`);
		let e, s;
		try {
			e = i.attributes ? Ei({}, i.attributes) : void 0, s = We(i.type, i.name, i.unit, e);
		} catch (t) {
			this.$.warn(`Dropping metric '${i.name}': attributes could not be serialized`, t);
			return;
		}
		let n = this.zs.get(s);
		if (!n) {
			if (!this.Ks()) return;
			n = {
				name: i.name,
				type: i.type,
				unit: i.unit,
				attributes: e,
				windowStartMs: Date.now()
			}, this.zs.set(s, n);
		}
		const r = this.Ws.get(i.name);
		void 0 === r ? this.Ws.set(i.name, i.type) : r === i.type || this.Vs.has(i.name) || (this.Vs.add(i.name), this.$.warn(`Metric name '${i.name}' is already used as a ${r}; recording it as a ${i.type} too will blend both series in charts. Use a distinct name.`)), this.Xs(n, i.value), this.Fs();
	}
	Ks() {
		return this.Ir.maxSeriesPerFlush > this.zs.size || (this.Us || (this.Us = !0, this.$.warn(`Metric series cap reached (${this.Ir.maxSeriesPerFlush} per flush window); dropping new series until the next flush. Reduce attribute cardinality.`)), !1);
	}
	Xs(t, i) {
		switch (t.type) {
			case "count":
				var e;
				t.total = (null !== (e = t.total) && void 0 !== e ? e : 0) + i;
				break;
			case "gauge":
				t.last = i;
				break;
			case "histogram": {
				t.hist || (t.hist = {
					count: 0,
					sum: 0,
					min: i,
					max: i,
					bucketCounts: new Array(qe.length + 1).fill(0)
				});
				const e = t.hist;
				e.count += 1, e.sum += i, e.min = Math.min(e.min, i), e.max = Math.max(e.max, i), e.bucketCounts[function(t, i) {
					for (let e = 0; i.length > e; e++) if (i[e] >= t) return e;
					return i.length;
				}(i, qe)] += 1;
				break;
			}
		}
	}
	Os(t) {
		const i = this.Ir.beforeSend;
		if (!i) return t;
		const e = T(i) ? i : [i];
		let s = t;
		for (const t of e) try {
			const i = t(s);
			if (!i) return this.$.info("Metric was rejected in beforeSend function"), null;
			s = i;
		} catch (t) {
			return this.$.error("Error in beforeSend function for metric:", t), null;
		}
		return s;
	}
	Fs() {
		this.ps.pending || this.ps.arm(this.Hs());
	}
	Hs() {
		return Math.max(ze(this.Ir.flushIntervalMs, this.ks, this.Ss, 3e4), this.ws.remainingMs());
	}
	Qs() {
		var t = this;
		return Y(function* () {
			if (t.ps.clear(), 0 === t.zs.size) return;
			const i = t.zs;
			t.zs = /* @__PURE__ */ new Map(), t.Us = !1, t.Ws = /* @__PURE__ */ new Map(), t.Vs = /* @__PURE__ */ new Set();
			const e = t.Gs, s = yield t._instance.Ys(t.Js(i));
			if (e === t.Gs) switch (t.ws.record(s), "retry-later" === s.kind ? (t.ks++, t.Ss = Ue()) : (t.ks = 0, t.Ss = 1), t.ps.pending && t.ps.arm(t.Hs()), s.kind) {
				case "ok": return;
				case "retry-later":
					t.lo(i), t.ps.armNoEarlierThan(t.Hs());
					return;
				case "too-large":
					t.$.warn("Metrics batch exceeded the server size limit and was dropped");
					return;
				case "fatal":
					t.$.error("Failed to send metrics batch:", s.error);
					return;
			}
		})();
	}
	Js(t) {
		return i = this.uo(t), e = function(t, i, e) {
			return Oe(t, i, e);
		}(this.Ir, this._instance.getLibraryId(), this._instance.getLibraryVersion()), s = this._instance.getLibraryId(), n = this._instance.getLibraryVersion(), { resourceMetrics: [{
			resource: { attributes: Ie(e) },
			scopeMetrics: [{
				scope: {
					name: s,
					version: n
				},
				metrics: i
			}]
		}] };
		var i, e, s, n;
	}
	uo(t) {
		const i = Ve(Date.now()), e = /* @__PURE__ */ new Map();
		for (const o of t.values()) {
			var s;
			const t = We(o.type, o.name, o.unit, void 0);
			let l = e.get(t);
			l || (l = Ei({ name: o.name }, o.unit && { unit: o.unit }), "count" === o.type ? l.sum = {
				aggregationTemporality: 1,
				isMonotonic: !0,
				dataPoints: []
			} : "gauge" === o.type ? l.gauge = { dataPoints: [] } : l.histogram = {
				aggregationTemporality: 1,
				dataPoints: []
			}, e.set(t, l));
			const a = ke(null !== (s = o.attributes) && void 0 !== s ? s : {}, this.$), u = Ve(o.windowStartMs);
			if ("count" === o.type) {
				var n;
				const t = {
					attributes: a,
					startTimeUnixNano: u,
					timeUnixNano: i,
					asDouble: null !== (n = o.total) && void 0 !== n ? n : 0
				};
				l.sum.dataPoints.push(t);
			} else if ("gauge" === o.type) {
				var r;
				const t = {
					attributes: a,
					timeUnixNano: i,
					asDouble: null !== (r = o.last) && void 0 !== r ? r : 0
				};
				l.gauge.dataPoints.push(t);
			} else o.hist && l.histogram.dataPoints.push({
				attributes: a,
				startTimeUnixNano: u,
				timeUnixNano: i,
				count: o.hist.count,
				sum: o.hist.sum,
				min: o.hist.min,
				max: o.hist.max,
				bucketCounts: o.hist.bucketCounts,
				explicitBounds: qe
			});
		}
		return Array.from(e.values());
	}
	lo(t) {
		for (const [s, n] of t) {
			const t = this.zs.get(s);
			if (t) switch (t.windowStartMs = Math.min(t.windowStartMs, n.windowStartMs), t.type) {
				case "count":
					var i, e;
					t.total = (null !== (i = t.total) && void 0 !== i ? i : 0) + (null !== (e = n.total) && void 0 !== e ? e : 0);
					break;
				case "gauge": break;
				case "histogram": if (n.hist) if (t.hist) {
					t.hist.count += n.hist.count, t.hist.sum += n.hist.sum, t.hist.min = Math.min(t.hist.min, n.hist.min), t.hist.max = Math.max(t.hist.max, n.hist.max);
					for (let i = 0; t.hist.bucketCounts.length > i; i++) t.hist.bucketCounts[i] += n.hist.bucketCounts[i];
				} else t.hist = n.hist;
			}
			else this.Ks() && this.zs.set(s, n);
		}
	}
};
var Ke = (i, { debugEnabled: e } = {}) => {
	const s = {
		N(s, ...n) {
			t && (f.DEBUG || t.POSTHOG_DEBUG || e) && !R(t.console) && t.console && ("__rrweb_original__" in t.console[s] ? t.console[s].__rrweb_original__ : t.console[s])(i, ...n);
		},
		debug(...t) {
			s.N("debug", ...t);
		},
		info(...t) {
			s.N("log", ...t);
		},
		warn(...t) {
			s.N("warn", ...t);
		},
		error(...t) {
			s.N("error", ...t);
		},
		critical(...t) {
			console.error(i, ...t);
		},
		uninitializedWarning(t) {
			s.error(`You must initialize PostHog before calling ${t}`);
		},
		createLogger: (t, e) => Ke(`${i} ${t}`, e)
	};
	return s;
};
var Je = Ke("[PostHog.js]");
var Ye = Je.createLogger;
var Xe = Ye("[ExternalScriptsLoader]");
var Qe = (t) => {
	const i = null == s ? void 0 : s.querySelectorAll("script");
	if (i) {
		for (let e = 0; i.length > e; e++) if (i[e].src === t || i[e].getAttribute("src") === t) return i[e];
	}
};
var Ze = (t, i, e) => {
	if (t.config.disable_external_dependency_loading) return Xe.warn(`${i} was requested but loading of external scripts is disabled.`), e("Loading of external scripts is disabled");
	const n = Qe(i);
	if (n) {
		if (n.__posthog_loading_callback_fired) return e();
		const t = n.__posthog_loading_error;
		return t ? e(t) : (n.addEventListener("load", (t) => {
			n.__posthog_loading_callback_fired = !0, e(void 0, t);
		}), void n.addEventListener("error", (t) => {
			n.__posthog_loading_error = t, e(t);
		}));
	}
	const r = () => {
		if (!s) return e("document not found");
		if (Qe(i)) return Ze(t, i, e);
		let n = s.createElement("script");
		if (n.type = "text/javascript", n.crossOrigin = "anonymous", n.src = i, n.onload = (t) => {
			n.__posthog_loading_callback_fired = !0, e(void 0, t);
		}, n.onerror = (t) => {
			n.__posthog_loading_error = t, e(t);
		}, t.config.prepare_external_dependency_script && (n = t.config.prepare_external_dependency_script(n)), !n) return e("prepare_external_dependency_script returned null");
		if ("head" === t.config.external_scripts_inject_target) s.head.appendChild(n);
		else {
			const t = s.querySelectorAll("body > script");
			var r;
			t.length > 0 ? null === (r = t[0].parentNode) || void 0 === r || r.insertBefore(n, t[0]) : s.body.appendChild(n);
		}
	};
	(null == s ? void 0 : s.body) ? r() : s?.addEventListener("DOMContentLoaded", r);
};
var ts = {};
var is = (t, i) => {
	let e = `/static/${i}.js?v=${t.version}`;
	if ("toolbar" === i) {
		const t = 3e5;
		e = `${e}&t=${Math.floor(Date.now() / t) * t}`;
	}
	return t.requestRouter.endpointFor("assets", e);
};
c.__PosthogExtensions__ = c.__PosthogExtensions__ || {}, c.__PosthogExtensions__.loadExternalDependency = (t, i, e) => {
	if ("remote-config" === i) {
		Ze(t, t.requestRouter.endpointFor("assets", `/array/${t.config.token}/config.js`), e);
		return;
	}
	const s = t.config.strict_script_versioning;
	if (s) {
		const n = t.requestRouter.endpointFor("assets", `/static/${t.version}/${i}.js`), r = ts[n];
		if ("fallback" === s && r) {
			if (Qe(r)) return void Ze(t, r, e);
			delete ts[n];
		}
		Ze(t, n, "fallback" === s ? (s, r) => {
			if (s) if ("string" == typeof s) e(s);
			else {
				var o;
				const s = is(t, i);
				ts[n] = s;
				const r = Qe(n);
				null == r || null === (o = r.parentNode) || void 0 === o || o.removeChild(r), Ze(t, s, e);
			}
			else e(void 0, r);
		} : e);
		return;
	}
	Ze(t, is(t, i), e);
}, c.__PosthogExtensions__.loadSiteApp = (t, i, e) => {
	Ze(t, t.requestRouter.endpointFor("api", i), e);
}, f.DEBUG = !1, f.LIB_VERSION = "1.433.4", f.LIB_NAME = "web";
var es = f;
var ss = "$people_distinct_id";
var ns = "distinct_id";
var rs = "$device_id";
var os = "$device_model";
var ls = "__alias";
var as = "__cmpns";
var us = "$fbc";
var hs = "$fbc_persistence";
var ds = "$fbp";
var cs = "$fbp_persistence";
var vs = "__timers";
var fs = "$autocapture_disabled_server_side";
var ps = "$heatmaps_enabled_server_side";
var _s = "$exception_capture_enabled_server_side";
var gs = "$error_tracking_suppression_rules";
var ms = "$error_tracking_capture_extension_exceptions";
var bs = "$web_vitals_enabled_server_side";
var ys = "$dead_clicks_enabled_server_side";
var ws = "$product_tours_enabled_server_side";
var $s = "$logs_capture_enabled_server_side";
var Ss = "$web_vitals_allowed_metrics";
var xs = "$session_recording_remote_config";
var Es = "$session_recording_enabled_server_side";
var ks = "$replay_sample_rate";
var Ts = "$replay_override_sampling";
var Ps = "$replay_override_linked_flag";
var Cs = "$replay_override_url_trigger";
var Os = "$replay_override_event_trigger";
var Rs = "$sesid";
var Is = "$session_is_sampled";
var Fs = "$session_past_minimum_duration";
var Ms = "$session_recording_url_trigger_activated_session";
var As = "$session_recording_event_trigger_activated_session";
var Ds = "$debug_first_full_snapshot_timestamp";
var Ns = "$sess_rec_flush_size";
var js = "$enabled_feature_flags";
var Ls = "$active_feature_flags";
var Bs = "$early_access_features";
var Us = "$feature_flag_details";
var zs = "$feature_flag_payloads";
var Hs = "$feature_flag_request_id";
var qs = "$minimal_flag_called_events";
var Vs = "$override_feature_flags";
var Ws = "$override_feature_flag_payloads";
var Gs = "$stored_person_properties";
var Ks = "$stored_group_properties";
var Js = "$groups";
var Ys = "$surveys";
var Xs = "$surveys_loaded_at";
var Qs = "$surveys_activated";
var Zs = "$surveys_activated_session";
var tn = "$surveys_activated_timestamps";
var en = "ph_product_tours";
var sn = "$product_tours_activated";
var nn = "$product_tours_activated_session";
var rn = "$conversations_widget_session_id";
var on = "$conversations_ticket_id";
var ln = "$conversations_widget_state";
var an = "$conversations_user_traits";
var un = "$flag_call_reported";
var hn = "$flag_call_reported_session_id";
var dn = "$feature_flag_errors";
var cn = "$feature_flag_evaluated_at";
var vn = "$user_state";
var fn = "$client_session_props";
var pn = "$capture_rate_limit";
var _n = "$initial_campaign_params";
var gn = "$initial_referrer_info";
var mn = "$initial_person_info";
var bn = "$epp";
var yn = "$posthog_cookieless";
var wn = "$cookieless_mode";
var $n = "$sdk_debug_extensions_init_method";
var Sn = "$sdk_debug_extensions_init_time_ms";
var xn = "$sdk_debug_recording_script_not_loaded";
var En = "$sdk_debug_replay_event_trigger_status";
var kn = "$sdk_debug_replay_linked_flag_trigger_status";
var Tn = "$sdk_debug_replay_matched_recording_trigger_groups";
var Pn = "$sdk_debug_replay_pending_trigger_conditions";
var Cn = "$sdk_debug_replay_remote_trigger_matching_config";
var On = "$sdk_debug_replay_trigger_groups_count";
var Rn = "$sdk_debug_replay_url_trigger_status";
var In = "$session_recording_start_reason";
var Fn = "PostHog loadExternalDependency extension not found.";
var Mn = "anonymous";
var An = "identified";
var Dn = "identified_only";
var Nn = "visibilitychange";
var jn = "beforeunload";
var Ln = "$pageview";
var Bn = "$pageleave";
var Un = "$identify";
var zn = "$groupidentify";
function Hn(t, i) {
	T(t) && t.forEach(i);
}
function qn(t, i) {
	if (!A(t)) if (T(t)) t.forEach(i);
	else if (((t) => t instanceof FormData)(t)) t.forEach((t, e) => i(t, e));
	else for (const e in t) E.call(t, e) && i(t[e], e);
}
var Vn = function(t, ...i) {
	for (const e of i) for (const i in e) void 0 !== e[i] && (t[i] = e[i]);
	return t;
};
function Wn(t) {
	const i = Object.keys(t);
	let e = i.length;
	const s = new Array(e);
	for (; e--;) s[e] = [i[e], t[i[e]]];
	return s;
}
var Gn = function(t) {
	return function(...i) {
		try {
			return t.apply(this, i);
		} catch (t) {
			Je.critical("Implementation error. Please turn on debug mode and open a ticket on https://app.posthog.com/home#panel=support%3Asupport%3A."), Je.critical(t);
		}
	};
};
var Kn = function(t) {
	const i = {};
	return qn(t, function(t, e) {
		(I(t) && t.length > 0 || D(t)) && (i[e] = t);
	}), i;
};
function Jn(t) {
	const i = Ei({}, t);
	for (const e of [
		"name",
		"message",
		"stack",
		"cause",
		"errors"
	]) try {
		e in t && (i[e] = t[e]);
	} catch (t) {}
	return i;
}
var Yn = [
	"herokuapp.com",
	"vercel.app",
	"netlify.app"
];
function Xn(t) {
	const i = null == t ? void 0 : t.hostname;
	if (!I(i)) return !1;
	const e = i.split(".").slice(-2).join(".");
	for (const t of Yn) if (e === t) return !1;
	return !0;
}
function Qn(t, i, e, s) {
	const { capture: n = !1, passive: r = !0 } = null != s ? s : {};
	t?.addEventListener(i, e, {
		capture: n,
		passive: r
	});
}
function Zn(t) {
	return "ph_toolbar_internal" === t.name;
}
var tr = (t) => {
	if (s) {
		try {
			const i = t + "=", e = s.cookie.split(";").filter((t) => t.length);
			for (let t = 0; e.length > t; t++) {
				let s = e[t];
				for (; " " == s.charAt(0);) s = s.substring(1, s.length);
				if (0 === s.indexOf(i)) return decodeURIComponent(s.substring(i.length, s.length));
			}
		} catch (t) {}
		return null;
	}
};
Math.trunc || (Math.trunc = function(t) {
	return 0 > t ? Math.ceil(t) : Math.floor(t);
}), Number.isInteger || (Number.isInteger = function(t) {
	return D(t) && isFinite(t) && Math.floor(t) === t;
});
var ir = class t {
	constructor(t) {
		if (this.bytes = t, 16 !== t.length) throw new TypeError("not 128-bit length");
	}
	static fromFieldsV7(i, e, s, n) {
		if (!Number.isInteger(i) || !Number.isInteger(e) || !Number.isInteger(s) || !Number.isInteger(n) || 0 > i || 0 > e || 0 > s || 0 > n || i > 0xffffffffffff || e > 4095 || s > 1073741823 || n > 4294967295) throw new RangeError("invalid field value");
		const r = /* @__PURE__ */ new Uint8Array(16);
		return r[0] = i / Math.pow(2, 40), r[1] = i / Math.pow(2, 32), r[2] = i / Math.pow(2, 24), r[3] = i / Math.pow(2, 16), r[4] = i / 256, r[5] = i, r[6] = 112 | e >>> 8, r[7] = e, r[8] = 128 | s >>> 24, r[9] = s >>> 16, r[10] = s >>> 8, r[11] = s, r[12] = n >>> 24, r[13] = n >>> 16, r[14] = n >>> 8, r[15] = n, new t(r);
	}
	toString() {
		let t = "";
		for (let i = 0; this.bytes.length > i; i++) t = t + (this.bytes[i] >>> 4).toString(16) + (15 & this.bytes[i]).toString(16), 3 !== i && 5 !== i && 7 !== i && 9 !== i || (t += "-");
		if (36 !== t.length) throw new Error("Invalid UUIDv7 was generated");
		return t;
	}
	clone() {
		return new t(this.bytes.slice(0));
	}
	equals(t) {
		return 0 === this.compareTo(t);
	}
	compareTo(t) {
		for (let i = 0; 16 > i; i++) {
			const e = this.bytes[i] - t.bytes[i];
			if (0 !== e) return Math.sign(e);
		}
		return 0;
	}
};
var er = class {
	generate() {
		const t = this.generateOrAbort();
		if (!R(t)) return t;
		{
			this.Ct = 0;
			const t = this.generateOrAbort();
			if (R(t)) throw new Error("Could not generate UUID after timestamp reset");
			return t;
		}
	}
	generateOrAbort() {
		const t = (() => {
			const t = Date.now();
			return D(t) && isFinite(t) ? Math.min(Math.max(Math.floor(t), 0), 0xffffffffffff) : 0;
		})();
		if (t > this.Ct) this.Ct = t, this.Mt();
		else {
			if (this.Ct >= t + 1e4) return;
			this.It++, this.It > 4398046511103 && (this.Ct++, this.Mt());
		}
		return ir.fromFieldsV7(this.Ct, Math.trunc(this.It / Math.pow(2, 30)), this.It & Math.pow(2, 30) - 1, this.Tt.nextUint32());
	}
	Mt() {
		this.It = 1024 * this.Tt.nextUint32() + (1023 & this.Tt.nextUint32());
	}
	constructor() {
		this.Ct = 0, this.It = 0, this.Tt = new nr();
	}
};
var sr = (t) => {
	if ("u" > typeof UUIDV7_DENY_WEAK_RNG && UUIDV7_DENY_WEAK_RNG) throw new Error("no cryptographically strong RNG available");
	for (let i = 0; t.length > i; i++) t[i] = 65536 * Math.trunc(65536 * Math.random()) + Math.trunc(65536 * Math.random());
	return t;
};
t && !R(t.crypto) && crypto.getRandomValues && (sr = (t) => crypto.getRandomValues(t));
var nr = class {
	nextUint32() {
		return this.Rt.length > this.$t || (sr(this.Rt), this.$t = 0), this.Rt[this.$t++];
	}
	constructor() {
		this.Rt = /* @__PURE__ */ new Uint32Array(8), this.$t = 1 / 0;
	}
};
var rr;
var or = () => lr().toString();
var lr = () => (rr || (rr = new er())).generate();
var ar = "";
var ur = /[a-z0-9][a-z0-9-]+\.[a-z]{2,}$/i;
var hr = null;
var dr = {
	Et() {
		if (!M(hr)) return hr;
		if (hr = !1, s) try {
			const t = `__ph_cookie_support_${or()}`;
			dr.At(t, "xyz"), hr = "\"xyz\"" === tr(t), dr.Lt(t);
		} catch (t) {
			hr = !1;
		}
		return hr;
	},
	Pt(t) {
		Je.error("cookieStore error: " + t);
	},
	Ot: tr,
	Dt(t) {
		let i;
		try {
			i = JSON.parse(dr.Ot(t)) || {};
		} catch (t) {}
		return i;
	},
	At(t, i, e, n, r) {
		if (!s) return !1;
		try {
			let o = "", l = "";
			const a = function(t, i) {
				if (i) {
					let i = function(t, i = s) {
						if (ar) return ar;
						if (!i) return "";
						if (["localhost", "127.0.0.1"].includes(t)) return "";
						const e = t.split(".");
						let n = Math.min(e.length, 8);
						const r = "dmn_chk_" + or();
						for (; !ar && n--;) {
							const t = e.slice(n).join("."), s = r + "=1;domain=." + t + ";path=/";
							i.cookie = s + ";max-age=3", i.cookie.includes(r) && (i.cookie = s + ";max-age=0", ar = t);
						}
						return ar;
					}(t);
					if (!i) {
						const e = ((t) => {
							const i = t.match(ur);
							return i ? i[0] : "";
						})(t);
						e !== i && Je.info("Warning: cookie subdomain discovery mismatch", e, i), i = e;
					}
					return i ? "; domain=." + i : "";
				}
				return "";
			}(s.location.hostname, n);
			if (e) {
				const t = /* @__PURE__ */ new Date();
				t.setTime(t.getTime() + 864e5 * e), o = "; expires=" + t.toUTCString();
			}
			r && (l = "; secure");
			const u = t + "=" + encodeURIComponent(JSON.stringify(i)) + o + "; SameSite=Lax; path=/" + a + l;
			return u.length > 3686.4 && Je.warn("cookieStore warning: large cookie, len=" + u.length), s.cookie = u, !0;
		} catch (t) {
			return !1;
		}
	},
	Lt(t, i) {
		if (null == s ? void 0 : s.cookie) try {
			dr.At(t, "", -1, i);
		} catch (t) {
			return;
		}
	}
};
var cr = null;
var vr = {
	Et() {
		if (!M(cr)) return cr;
		let i = !0;
		if (R(t)) i = !1;
		else try {
			const t = "__mplssupport__";
			vr.At(t, "xyz"), "\"xyz\"" !== vr.Ot(t) && (i = !1), vr.Lt(t);
		} catch (t) {
			i = !1;
		}
		return i || Je.error("localStorage unsupported; falling back to cookie store"), cr = i, i;
	},
	Pt(t) {
		Je.error("localStorage error: " + t);
	},
	Ot(i) {
		try {
			return null == t ? void 0 : t.localStorage.getItem(i);
		} catch (t) {
			vr.Pt(t);
		}
		return null;
	},
	Dt(t) {
		try {
			return JSON.parse(vr.Ot(t)) || {};
		} catch (t) {}
		return null;
	},
	At(i, e) {
		try {
			return t?.localStorage.setItem(i, JSON.stringify(e)), !0;
		} catch (t) {
			vr.Pt(t);
		}
		return !1;
	},
	Lt(i) {
		try {
			t?.localStorage.removeItem(i);
		} catch (t) {
			vr.Pt(t);
		}
	}
};
var fr = [
	Gs,
	Ls,
	js,
	Us,
	zs,
	Hs,
	cn,
	dn,
	un
];
var pr = [
	rs,
	ns,
	Rs,
	Is,
	bn,
	mn,
	hs,
	vn
];
var _r = (t) => t + "_cpm";
var gr = [
	"__proto__",
	"constructor",
	"prototype"
];
var mr = (t) => {
	if (!C(t)) return {};
	const i = {};
	return Object.keys(t).forEach((e) => {
		-1 === gr.indexOf(e) && (i[e] = t[e]);
	}), i;
};
var br = (t, i = []) => {
	const e = {};
	return [...pr, ...i].forEach((i) => {
		const s = t[i];
		R(s) || M(s) || "" === s || (e[i] = s);
	}), e;
};
var yr = (t) => {
	let i = 5381, e = 2166136261;
	for (let s = 0; t.length > s; s++) {
		const n = t.charCodeAt(s);
		i = 33 * i ^ n, e = Math.imul(e ^ n, 16777619);
	}
	return t.length.toString(36) + "." + (i >>> 0).toString(36) + "." + (e >>> 0).toString(36);
};
var wr = (t, i) => ({
	p: i,
	f: yr(JSON.stringify(t))
});
var $r = (t, i) => {
	if (!i) return {
		properties: [],
		isValid: !1
	};
	try {
		const e = dr.Dt(_r(t)), s = (null == e ? void 0 : e.f) === yr(i) && T(e.p);
		return {
			properties: s ? e.p : [],
			isValid: s
		};
	} catch (t) {
		return {
			properties: [],
			isValid: !1
		};
	}
};
var Sr = (t, i) => i + "|" + (dr.Ot(_r(t)) || "");
var xr = {};
var Er = {
	Et: () => !0,
	Pt(t) {
		Je.error("memoryStorage error: " + t);
	},
	Ot: (t) => t in xr ? xr[t] : null,
	Dt: (t) => t in xr ? xr[t] : null,
	At: (t, i) => (xr[t] = i, !0),
	Lt(t) {
		delete xr[t];
	}
};
var kr = null;
var Tr = {
	Et() {
		if (!M(kr)) return kr;
		if (kr = !0, R(t)) kr = !1;
		else try {
			const t = "__support__";
			Tr.At(t, "xyz"), "\"xyz\"" !== Tr.Ot(t) && (kr = !1), Tr.Lt(t);
		} catch (t) {
			kr = !1;
		}
		return kr;
	},
	Pt(t) {
		Je.error("sessionStorage error: ", t);
	},
	Ot(i) {
		try {
			return null == t ? void 0 : t.sessionStorage.getItem(i);
		} catch (t) {
			Tr.Pt(t);
		}
		return null;
	},
	Dt(t) {
		try {
			return JSON.parse(Tr.Ot(t)) || null;
		} catch (t) {}
		return null;
	},
	At(i, e) {
		try {
			return t?.sessionStorage.setItem(i, JSON.stringify(e)), !0;
		} catch (t) {
			Tr.Pt(t);
		}
		return !1;
	},
	Lt(i) {
		try {
			t?.sessionStorage.removeItem(i);
		} catch (t) {
			Tr.Pt(t);
		}
	}
};
var Pr = class {
	constructor(t) {
		this._instance = t;
	}
	get Ir() {
		return this._instance.config;
	}
	get consent() {
		return this.Ao() ? 0 : this.Fo;
	}
	isOptedOut() {
		return "always" === this.Ir.cookieless_mode || this.isRejected() || -1 === this.consent && "on_reject" === this.Ir.cookieless_mode;
	}
	isOptedIn() {
		return !this.isOptedOut();
	}
	isExplicitlyOptedOut() {
		return 0 === this.consent;
	}
	isRejected() {
		return 0 === this.consent || -1 === this.consent && this.Ir.opt_out_capturing_by_default;
	}
	optInOut(t) {
		this.Oo.At(this.Do, t ? 1 : 0, this.Ir.cookie_expiration, this.Ir.cross_subdomain_cookie, this.Ir.secure_cookie);
	}
	reset() {
		this.Oo.Lt(this.Do, this.Ir.cross_subdomain_cookie);
	}
	get Do() {
		const { token: t, opt_out_capturing_cookie_prefix: i, consent_persistence_name: e } = this._instance.config;
		return e || (i ? i + t : "__ph_opt_in_out_" + t);
	}
	get Fo() {
		const t = this.Oo.Ot(this.Do);
		return G(t) ? 1 : b(K, t) ? 0 : -1;
	}
	get Oo() {
		const t = this.Ir.opt_out_capturing_persistence_type, i = "localStorage" === t ? vr : dr, e = i.Et() ? i : Er;
		if (!this.Lo || this.Lo !== e) {
			this.Lo = e;
			const i = "localStorage" === t ? dr : vr;
			i.Ot(this.Do) && (this.Lo.Ot(this.Do) || this.optInOut(G(i.Ot(this.Do))), i.Lt(this.Do, this.Ir.cross_subdomain_cookie));
		}
		return this.Lo;
	}
	Ao() {
		return !!this.Ir.respect_dnt && [
			null == e ? void 0 : e.doNotTrack,
			null == e ? void 0 : e.msDoNotTrack,
			c.doNotTrack,
			null == e ? void 0 : e.globalPrivacyControl
		].some((t) => G(t));
	}
};
function Cr(t, i) {
	var e;
	const s = null == t || null === (e = t.config) || void 0 === e ? void 0 : e.get_current_url;
	if (!P(s)) return i;
	try {
		const t = s(i);
		return I(t) && t ? t : i;
	} catch (t) {
		return Je.error("Error in get_current_url, falling back to window.location.href", t), i;
	}
}
function Or(t) {
	var i;
	return t instanceof Element && ("__POSTHOG_TOOLBAR__" === t.id || !!(null === (i = t.closest) || void 0 === i ? void 0 : i.call(t, ".toolbar-global-fade-container")));
}
function Rr(t) {
	return !!t && 1 === t.nodeType;
}
function Ir(t, i) {
	return !!t && !!t.tagName && t.tagName.toLowerCase() === i.toLowerCase();
}
function Fr(t) {
	return !!t && 3 === t.nodeType;
}
function Mr(t) {
	return !!t && 11 === t.nodeType && Rr(t.host);
}
function Ar(t) {
	return t ? y(t).split(/\s+/) : [];
}
function Dr(i, e) {
	const s = function(i) {
		var e;
		const s = null == t || null === (e = t.location) || void 0 === e ? void 0 : e.href;
		return R(s) ? void 0 : Cr(i, s);
	}(e);
	return !!(s && i && i.some((t) => s.match(t)));
}
function Nr(t) {
	let i = "";
	switch (typeof t.className) {
		case "string":
			i = t.className;
			break;
		case "object":
			i = (t.className && "baseVal" in t.className ? t.className.baseVal : null) || t.getAttribute("class") || "";
			break;
		default: i = "";
	}
	return Ar(i);
}
function jr(t) {
	return A(t) ? null : y(t).split(/(\s+)/).filter((t) => uo(t)).join("").replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255);
}
function Lr(t) {
	let i = "";
	return to(t) && !io(t) && t.childNodes && t.childNodes.length && qn(t.childNodes, function(t) {
		var e;
		Fr(t) && t.textContent && (i += null !== (e = jr(t.textContent)) && void 0 !== e ? e : "");
	}), y(i);
}
function Br(t) {
	var i;
	return R(t.target) ? t.srcElement || null : (null === (i = t.target) || void 0 === i ? void 0 : i.shadowRoot) ? t.composedPath()[0] || null : t.target || null;
}
var Ur = [
	"a",
	"button",
	"form",
	"input",
	"select",
	"textarea",
	"label"
];
function zr(t, i) {
	const e = t.matches || t.matchesSelector || t.msMatchesSelector || t.mozMatchesSelector || t.webkitMatchesSelector || t.oMatchesSelector;
	try {
		return !!e && e.call(t, i);
	} catch (t) {
		return !1;
	}
}
function Hr(t, i) {
	if (R(i)) return !0;
	for (const e of t) if (i.some((t) => zr(e, t))) return !0;
	return !1;
}
function qr(t) {
	const i = t.parentNode;
	return !(!i || !Rr(i)) && i;
}
var Vr = [".ph-no-autocapture", "[data-ph-no-autocapture]"];
var Wr = [
	"next",
	"previous",
	"prev",
	">",
	"<"
];
var Gr = [
	...Wr,
	"+",
	"-",
	"−",
	"–"
];
var Kr = (t, i) => /[a-z0-9]/i.test(i) ? t.includes(i) : t === i;
var Jr = [".ph-no-rageclick", ".ph-no-capture"];
var Yr = [
	"",
	"text",
	"search",
	"email",
	"password",
	"url",
	"tel",
	"number"
];
function Xr(i, e) {
	if (!t || Qr(i)) return !1;
	let s, n, r;
	var o, l;
	if (j(e) ? (s = !!e && Jr, n = void 0, r = !1) : (s = null !== (o = null == e ? void 0 : e.css_selector_ignorelist) && void 0 !== o ? o : Jr, n = null == e ? void 0 : e.content_ignorelist, r = null !== (l = null == e ? void 0 : e.ignore_text_selection) && void 0 !== l && l), !1 === s) return !1;
	if (r && function(t) {
		return !(!t || !Rr(t)) && (!!Ir(t, "textarea") || (Ir(t, "input") ? b(Yr, (t.getAttribute("type") || "").toLowerCase()) : function(t) {
			var i;
			if (t.isContentEditable) return !0;
			const e = null === (i = t.getAttribute) || void 0 === i ? void 0 : i.call(t, "contenteditable");
			return "true" === e || "" === e;
		}(t)));
	}(i)) return !1;
	const { targetElementList: a } = Zr(i, !1);
	return !function(t, i) {
		if (!1 === t || R(t)) return !1;
		let e;
		if (!0 === t) e = Wr;
		else {
			if (!T(t)) return !1;
			if (t.length > 10) return Je.error("[PostHog] content_ignorelist array cannot exceed 10 items. Use css_selector_ignorelist for more complex matching."), !1;
			e = t.map((t) => t.toLowerCase());
		}
		return i.some(({ safeText: t, ariaLabel: i }) => e.some((e) => Kr(t, e) || Kr(i, e)));
	}(n, a.map((t) => {
		var i;
		return {
			safeText: Lr(t).toLowerCase(),
			ariaLabel: (null === (i = t.getAttribute("aria-label")) || void 0 === i ? void 0 : i.toLowerCase().trim()) || ""
		};
	})) && !Hr(a, s);
}
var Qr = (t) => !t || Ir(t, "html") || !Rr(t);
var Zr = (i, e) => {
	if (!t || Qr(i)) return {
		parentIsUsefulElement: !1,
		targetElementList: []
	};
	let s = !1;
	const n = [i];
	let r = i;
	for (; r.parentNode && !Ir(r, "body");) {
		if (Mr(r.parentNode)) {
			n.push(r.parentNode.host), r = r.parentNode.host;
			continue;
		}
		const i = qr(r);
		if (!i) break;
		if (e || Ur.indexOf(i.tagName.toLowerCase()) > -1) s = !0;
		else try {
			const e = t.getComputedStyle(i);
			e && "pointer" === e.getPropertyValue("cursor") && (s = !0);
		} catch (t) {}
		n.push(i), r = i;
	}
	return {
		parentIsUsefulElement: s,
		targetElementList: n
	};
};
function to(t) {
	const i = /* @__PURE__ */ new Set();
	let e = 0;
	for (let s = t; s.parentNode && !Ir(s, "body"); s = s.parentNode) {
		if (e++ >= 1e3 || i.has(s)) return !1;
		i.add(s);
		const t = Nr(s);
		if (b(t, "ph-sensitive") || b(t, "ph-no-capture")) return !1;
	}
	if (b(Nr(t), "ph-include")) return !0;
	const s = t.type || "";
	if (I(s)) switch (s.toLowerCase()) {
		case "hidden":
		case "password": return !1;
	}
	const n = t.name || t.id || "";
	return !I(n) || !/^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i.test(n.replace(/[^a-zA-Z0-9]/g, ""));
}
function io(t) {
	return !!(Ir(t, "input") && ![
		"button",
		"checkbox",
		"submit",
		"reset"
	].includes(t.type) || Ir(t, "select") || Ir(t, "textarea") || "true" === t.getAttribute("contenteditable"));
}
var eo = /* @__PURE__ */ new RegExp("^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$");
var so = /(^|[^0-9A-Za-z_])([0-9][0-9 -]*[0-9])(?=$|[^0-9A-Za-z_])/g;
var no = [
	16,
	15,
	14,
	13
];
var ro = /* @__PURE__ */ new RegExp("^(\\d{3}-?\\d{2}-?\\d{4})$");
var oo = /* @__PURE__ */ new RegExp("(^|[^0-9])((?!000|666)[0-9]{3}-?(?!00)[0-9]{2}-?(?!0000)[0-9]{4})(?=$|([^0-9]))", "g");
var lo = /[0-9A-Za-z_]/;
function ao(t) {
	let i = 0, e = !1;
	for (let s = t.length - 1; s >= 0; s--) {
		let n = t.charCodeAt(s) - 48;
		e && (n *= 2, n > 9 && (n -= 9)), i += n, e = !e;
	}
	return i % 10 == 0;
}
function uo(t, i = !0) {
	if (A(t)) return !1;
	if (I(t)) {
		if (t = y(t), i ? eo.test((t || "").replace(/[- ]/g, "")) : function(t) {
			let i;
			for (so.lastIndex = 0; i = so.exec(t);) {
				const t = i[2];
				if (!t) continue;
				const e = t.replace(/[- ]/g, "");
				for (let t = 0; e.length > t; t++) for (const i of no) {
					const s = t + i;
					if (e.length >= s) {
						const i = e.slice(t, s);
						if (eo.test(i) && ao(i)) return !0;
					}
				}
			}
			return !1;
		}(t)) return !1;
		if (i ? ro.test(t) : function(t) {
			let i;
			for (oo.lastIndex = 0; i = oo.exec(t);) {
				const t = i[1], e = i[3];
				if (!(t && e && lo.test(t) && lo.test(e))) return !0;
			}
			return !1;
		}(t)) return !1;
	}
	return !0;
}
function ho(t) {
	let i = Lr(t);
	return i = `${i} ${co(t)}`.trim(), uo(i) ? i : "";
}
function co(t) {
	let i = "";
	return t && t.childNodes && t.childNodes.length && qn(t.childNodes, function(t) {
		var e;
		if (t && "span" === (null === (e = t.tagName) || void 0 === e ? void 0 : e.toLowerCase())) try {
			const e = Lr(t);
			i = `${i} ${e}`.trim(), t.childNodes && t.childNodes.length && (i = `${i} ${co(t)}`.trim());
		} catch (t) {
			Je.error("[AutoCapture]", t);
		}
	}), i;
}
function vo(t) {
	return t.replace(/"|\\"/g, "\\\"");
}
function fo(t) {
	const i = t.attr__class;
	if (i) return T(i) ? i : Ar(i);
}
var po = Ye("[Dead Clicks]");
var _o = () => !0;
var go = (t) => {
	var i;
	const e = !!(null === (i = t.instance.persistence) || void 0 === i ? void 0 : i.get_property(ys)), s = t.instance.config.capture_dead_clicks;
	return j(s) ? s : !!C(s) || e;
};
var mo = class {
	get lazyLoadedDeadClicksAutocapture() {
		return this.No;
	}
	constructor(t, i, e) {
		this.instance = t, this.isEnabled = i, this.onCapture = e, this.startIfEnabledOrStop();
	}
	onRemoteConfig(t) {
		if (!t.ok) return;
		const i = t.config;
		"captureDeadClicks" in i && (this.instance.persistence && this.instance.persistence.register({ [ys]: i.captureDeadClicks }), this.startIfEnabledOrStop());
	}
	startIfEnabledOrStop() {
		this.isEnabled(this) ? this.qo(() => {
			this.jo();
		}) : this.stop();
	}
	qo(t) {
		var i, e, s;
		(null === (i = c.__PosthogExtensions__) || void 0 === i ? void 0 : i.initDeadClicksAutocapture) ? t() : null === (e = c.__PosthogExtensions__) || void 0 === e || null === (s = e.loadExternalDependency) || void 0 === s || s.call(e, this.instance, "dead-clicks-autocapture", (i) => {
			i ? po.error("failed to load script", i) : t();
		});
	}
	jo() {
		var t;
		if (s) {
			if (!this.No && (null === (t = c.__PosthogExtensions__) || void 0 === t ? void 0 : t.initDeadClicksAutocapture)) {
				const t = C(this.instance.config.capture_dead_clicks) ? Ei({}, this.instance.config.capture_dead_clicks) : {};
				t.__onCapture = this.onCapture, this.onCapture && (t.capture_dead_swipes = !1), this.No = c.__PosthogExtensions__.initDeadClicksAutocapture(this.instance, t), this.No.start(s), po.info("starting...");
			}
		} else po.error("`document` not found. Cannot start.");
	}
	stop() {
		this.No && (this.No.stop(), this.No = void 0, po.info("stopping..."));
	}
};
var bo = Ye("[SegmentIntegration]");
function yo(t, i, e = !0) {
	const s = t.config.segment;
	if (!s) return i();
	const { analytics: n, filterProperties: r } = ((t) => P(t.register))(o = s) ? { analytics: o } : o;
	var o;
	(function(t, i, e, s) {
		const n = (i) => {
			const n = () => i.anonymousId() || or();
			t.config.get_device_id = n, s && i.id() && (t.register({
				distinct_id: i.id(),
				$device_id: n()
			}), t.persistence.set_property(vn, An)), e(s ? void 0 : i.anonymousId() || void 0);
		}, r = i.user();
		"then" in r && P(r.then) ? r.then(n) : n(r);
	})(t, n, (e) => {
		n.register(((t, i, { filterProperties: e } = {}) => {
			"undefined" != typeof Promise && Promise.resolve || bo.warn("This browser does not have Promise support, and can not use the segment integration");
			const s = (s, n) => {
				if (!n) return s;
				const r = !!i && s.event.anonymousId === i && !s.event.userId;
				r || s.event.userId || s.event.anonymousId === t.get_distinct_id() || (bo.info("No userId set, resetting PostHog"), t.reset()), r || (i = void 0), s.event.userId && s.event.userId !== t.get_distinct_id() && (bo.info("UserId set, identifying with PostHog"), t.identify(s.event.userId));
				let o = t.calculateEventProperties(n, s.event.properties);
				if (!A(e)) {
					const t = s.event.properties || {}, i = {};
					for (const e of Object.keys(o)) E.call(t, e) || (i[e] = o[e]);
					const n = ((t, i) => {
						const e = T(t) ? t : [t];
						let s = Ei({}, i);
						for (const t of e) try {
							if (s = t(s), A(s)) return null;
						} catch (t) {
							return bo.error("Error in Segment filterProperties:", t), null;
						}
						return s;
					})(e, i);
					if (A(n)) return s;
					o = n;
				}
				return s.event.properties = Object.assign({}, o, s.event.properties), s;
			};
			return {
				name: "PostHog JS",
				type: "enrichment",
				version: "1.0.0",
				isLoaded() {
					return !0;
				},
				load() {
					return Promise.resolve();
				},
				track(t) {
					return s(t, t.event.event);
				},
				page(t) {
					return s(t, Ln);
				},
				identify(t) {
					return s(t, Un);
				},
				screen(t) {
					return s(t, "$screen");
				}
			};
		})(t, e, { filterProperties: r })).then(() => {
			i();
		}, (t) => {
			bo.error("Failed to register the Segment integration", t), i();
		});
	}, e);
}
var wo = "posthog-js";
function $o(t, { organization: i, projectId: e, prefix: s, severityAllowList: n = ["error"], sendExceptionsToPostHog: r = !0 } = {}) {
	return (o) => {
		var l, a, u, h, d;
		if ("*" !== n && !n.includes(o.level) || !t.__loaded) return o;
		o.tags || (o.tags = {});
		const c = t.requestRouter.endpointFor("ui", `/project/${t.config.token}/person/${t.get_distinct_id()}`);
		o.tags["PostHog Person URL"] = c, t.sessionRecordingStarted() && (o.tags["PostHog Recording URL"] = t.get_session_replay_url({ withTimestamp: !0 }));
		const v = (null === (l = o.exception) || void 0 === l ? void 0 : l.values) || [], f = v.map((t) => Ei(Ei({}, t), {}, { stacktrace: t.stacktrace ? Ei(Ei({}, t.stacktrace), {}, {
			type: "raw",
			frames: (t.stacktrace.frames || []).map((t) => Ei(Ei({}, t), {}, { platform: "web:javascript" }))
		}) : void 0 })), p = {
			$exception_message: (null === (a = v[0]) || void 0 === a ? void 0 : a.value) || o.message,
			$exception_type: null === (u = v[0]) || void 0 === u ? void 0 : u.type,
			$exception_level: o.level,
			$exception_list: f,
			$sentry_event_id: o.event_id,
			$sentry_exception: o.exception,
			$sentry_exception_message: (null === (h = v[0]) || void 0 === h ? void 0 : h.value) || o.message,
			$sentry_exception_type: null === (d = v[0]) || void 0 === d ? void 0 : d.type,
			$sentry_tags: o.tags
		};
		var _;
		return i && e && (p.$sentry_url = (s || "https://sentry.io/organizations/") + i + "/issues/?project=" + e + "&query=" + o.event_id), r && (null === (_ = t.exceptions) || void 0 === _ || _.sendExceptionEvent(p)), o;
	};
}
var So = class {
	constructor(t, i, e, s, n, r) {
		this.name = wo, this.setupOnce = function(o) {
			o($o(t, {
				organization: i,
				projectId: e,
				prefix: s,
				severityAllowList: n,
				sendExceptionsToPostHog: null == r || r
			}));
		};
	}
};
var xo = class {
	constructor(t) {
		this.Bo = (t, i, e) => {
			e && (e.noSessionId || e.activityTimeout || e.sessionPastMaximumLength || e.crossTabAdoption) && (Je.info("[PageViewManager] Session rotated, clearing pageview state", {
				sessionId: t,
				changeReason: e
			}), this.Ho = void 0, this._instance.scrollManager.resetContext());
		}, this._instance = t, this.zo();
	}
	zo() {
		var t;
		this.Uo = null === (t = this._instance.sessionManager) || void 0 === t ? void 0 : t.onSessionId(this.Bo);
	}
	destroy() {
		var t;
		null === (t = this.Uo) || void 0 === t || t.call(this), this.Uo = void 0;
	}
	doPageView(i, e) {
		var s;
		const n = this.Wo(i, e);
		return this.Ho = {
			pathname: null !== (s = null == t ? void 0 : t.location.pathname) && void 0 !== s ? s : "",
			pageViewId: e,
			timestamp: i
		}, this._instance.scrollManager.resetContext(), n;
	}
	doPageLeave(t) {
		var i;
		return this.Wo(t, null === (i = this.Ho) || void 0 === i ? void 0 : i.pageViewId);
	}
	doEvent() {
		var t;
		return { $pageview_id: null === (t = this.Ho) || void 0 === t ? void 0 : t.pageViewId };
	}
	Wo(t, i) {
		const e = this.Ho;
		if (!e) return { $pageview_id: i };
		let s = {
			$pageview_id: i,
			$prev_pageview_id: e.pageViewId
		};
		const n = this._instance.scrollManager.getContext();
		if (n && !this._instance.config.disable_scroll_properties) {
			let { maxScrollHeight: t, lastScrollY: i, maxScrollY: e, maxContentHeight: r, lastContentY: o, maxContentY: l } = n;
			if (!(R(t) || R(i) || R(e) || R(r) || R(o) || R(l))) {
				t = Math.ceil(t), i = Math.ceil(i), e = Math.ceil(e), r = Math.ceil(r), o = Math.ceil(o), l = Math.ceil(l);
				const n = t > 1 ? Z(i / t, 0, 1, Je) : 1, a = t > 1 ? Z(e / t, 0, 1, Je) : 1, u = r > 1 ? Z(o / r, 0, 1, Je) : 1, h = r > 1 ? Z(l / r, 0, 1, Je) : 1;
				s = Vn(s, {
					$prev_pageview_last_scroll: i,
					$prev_pageview_last_scroll_percentage: n,
					$prev_pageview_max_scroll: e,
					$prev_pageview_max_scroll_percentage: a,
					$prev_pageview_last_content: o,
					$prev_pageview_last_content_percentage: u,
					$prev_pageview_max_content: l,
					$prev_pageview_max_content_percentage: h
				});
			}
		}
		return e.pathname && (s.$prev_pageview_pathname = e.pathname), e.timestamp && (s.$prev_pageview_duration = (t.getTime() - e.timestamp.getTime()) / 1e3), s;
	}
};
var Eo = ["flags", "surveys"];
var ko = {
	[ss]: { exposure: "hidden" },
	[ls]: { exposure: "hidden" },
	[as]: { exposure: "hidden" },
	[vs]: { exposure: "hidden" },
	[hs]: { exposure: "hidden" },
	[cs]: { exposure: "hidden" },
	[fs]: { exposure: "event" },
	[ps]: { exposure: "hidden" },
	[$s]: { exposure: "hidden" },
	[_s]: { exposure: "event" },
	[gs]: { exposure: "hidden" },
	[ms]: { exposure: "event" },
	[bs]: { exposure: "event" },
	[ys]: { exposure: "event" },
	[ws]: { exposure: "hidden" },
	[Ss]: { exposure: "event" },
	[xs]: { exposure: "hidden" },
	[Es]: { exposure: "hidden" },
	[Rs]: { exposure: "hidden" },
	[Is]: { exposure: "event" },
	[ks]: {
		exposure: "event",
		shouldSkipFromEventProperties: (t) => M(t)
	},
	[Fs]: { exposure: "event" },
	[Ms]: { exposure: "event" },
	[As]: { exposure: "event" },
	[Ds]: { exposure: "event" },
	[Ns]: { exposure: "hidden" },
	[js]: {
		exposure: "hidden",
		storageGroup: "flags"
	},
	[Ls]: {
		exposure: "hidden",
		storageGroup: "flags"
	},
	[Bs]: { exposure: "hidden" },
	[Us]: {
		exposure: "hidden",
		storageGroup: "flags"
	},
	[zs]: {
		exposure: "hidden",
		storageGroup: "flags"
	},
	[Hs]: {
		exposure: "hidden",
		storageGroup: "flags",
		volatile: !0
	},
	[qs]: {
		exposure: "hidden",
		storageGroup: "flags"
	},
	[Vs]: { exposure: "hidden" },
	[Ws]: { exposure: "hidden" },
	[Gs]: { exposure: "hidden" },
	[Ks]: { exposure: "hidden" },
	[Ys]: {
		exposure: "hidden",
		storageGroup: "surveys"
	},
	[Xs]: {
		exposure: "hidden",
		storageGroup: "surveys",
		volatile: !0
	},
	[Qs]: { exposure: "event" },
	[Zs]: { exposure: "hidden" },
	[tn]: { exposure: "hidden" },
	[en]: { exposure: "hidden" },
	[sn]: { exposure: "hidden" },
	[nn]: { exposure: "hidden" },
	[rn]: { exposure: "event" },
	[on]: { exposure: "event" },
	[ln]: { exposure: "event" },
	[an]: { exposure: "event" },
	[un]: { exposure: "hidden" },
	[hn]: { exposure: "hidden" },
	[Js]: { exposure: "event" },
	[dn]: { exposure: "hidden" },
	[cn]: {
		exposure: "hidden",
		storageGroup: "flags",
		volatile: !0
	},
	[vn]: { exposure: "hidden" },
	[fn]: { exposure: "hidden" },
	[pn]: { exposure: "hidden" },
	[_n]: { exposure: "hidden" },
	[gn]: { exposure: "hidden" },
	[mn]: { exposure: "hidden" },
	[bn]: { exposure: "hidden" },
	[Ts]: { exposure: "event" },
	[Ps]: { exposure: "event" },
	[Cs]: { exposure: "event" },
	[Os]: { exposure: "event" },
	[$n]: { exposure: "event" },
	[Sn]: { exposure: "event" },
	[xn]: { exposure: "event" },
	[En]: { exposure: "event" },
	[kn]: { exposure: "event" },
	[Tn]: { exposure: "event" },
	[Pn]: { exposure: "event" },
	[Cn]: { exposure: "event" },
	[On]: { exposure: "event" },
	[Rn]: { exposure: "event" },
	[In]: { exposure: "event" }
};
var To = [
	["$posthog_sr_group_event_trigger_", { exposure: "hidden" }],
	["$posthog_sr_group_url_trigger_", { exposure: "hidden" }],
	["$posthog_sr_group_sampling_", { exposure: "hidden" }]
];
var Po = (t) => {
	const i = ko[t];
	if (i) return i;
	for (const [i, e] of To) if (0 === t.indexOf(i)) return e;
};
var Co = (t, i) => {
	try {
		let e;
		return JSON.stringify(t, (t, i) => {
			var s;
			return H(i) ? (null !== (s = e) && void 0 !== s || (e = /* @__PURE__ */ new WeakMap()), e.has(i) || e.set(i, Jn(i)), e.get(i)) : "bigint" == typeof i ? i.toString() : i;
		}, i);
	} catch (i) {
		return S(t);
	}
};
var Oo = (t) => {
	const i = null == s ? void 0 : s.createElement("a");
	return R(i) ? null : (i.href = t, i);
};
var Ro = function(t, i) {
	const e = ((t.split("#")[0] || "").split(/\?(.*)/)[1] || "").replace(/^\?+/g, "").split("&");
	let s;
	for (let t = 0; e.length > t; t++) {
		const n = e[t].split("=");
		if (n[0] === i) {
			s = n;
			break;
		}
	}
	if (!T(s) || 2 > s.length) return "";
	{
		let t = s[1];
		try {
			t = decodeURIComponent(t);
		} catch (i) {
			Je.error("Skipping decoding for malformed query param: " + t);
		}
		return t.replace(/\+/g, " ");
	}
};
var Io = function(t, i, e) {
	if (!t || !i || !i.length) return t;
	const s = t.split("#"), n = s[1], r = (s[0] || "").split("?"), o = r[1], l = r[0], a = (o || "").split("&"), u = [];
	for (let t = 0; a.length > t; t++) {
		const s = a[t].split("=");
		T(s) && (i.includes(s[0]) ? u.push(s[0] + "=" + e) : u.push(a[t]));
	}
	let h = l;
	return null != o && (h += "?" + u.join("&")), null != n && (h += "#" + n), h;
};
var Fo = function(t, i) {
	const e = t.match(new RegExp(i + "=([^&]*)"));
	return e ? e[1] : null;
};
var Mo = (t, i) => t >= i && h();
var Ao = (t, i, e, s) => {
	if (0 === t) {
		if (h()) {
			const t = i + 1;
			return t === e && s(), t;
		}
		return i;
	}
	return 0;
};
var Do = [
	"gclid",
	"gclsrc",
	"dclid",
	"gbraid",
	"wbraid",
	"fbclid",
	"msclkid",
	"twclid",
	"li_fat_id",
	"igshid",
	"ttclid",
	"rdt_cid",
	"epik",
	"qclid",
	"sccid",
	"irclid",
	"_kx"
];
var No = [
	"utm_source",
	"utm_medium",
	"utm_campaign",
	"utm_content",
	"utm_term",
	"gad_source",
	"mc_cid",
	...Do
];
var jo = "<masked>";
var Lo = ["li_fat_id"];
function Bo(t, i, e) {
	if (!s) return {};
	const n = i ? [...Do, ...e || []] : [], r = Uo(Io(s.URL, n, jo), t);
	return Vn(function() {
		const t = {};
		return qn(Lo, function(i) {
			const e = tr(i);
			t[i] = e || null;
		}), t;
	}(), r);
}
function Uo(t, i) {
	const e = No.concat(i || []), s = {};
	return qn(e, function(i) {
		const e = Ro(t, i);
		s[i] = e || null;
	}), s;
}
function zo(t) {
	const i = function(t) {
		return t ? 0 === t.search("https?://(.*)google.([^/?]*)") ? "google" : 0 === t.search("https?://(.*)bing.com") ? "bing" : 0 === t.search("https?://(.*)yahoo.com") ? "yahoo" : 0 === t.search("https?://(.*)duckduckgo.com") ? "duckduckgo" : null : null;
	}(t), e = "yahoo" != i ? "q" : "p", n = {};
	if (!M(i)) {
		n.$search_engine = i;
		const t = s ? Ro(s.referrer, e) : "";
		t.length && (n.ph_keyword = t);
	}
	return n;
}
function Ho() {
	return navigator.language || navigator.userLanguage;
}
function qo() {
	const t = Ho();
	return "string" == typeof t ? t.split("-")[0] : void 0;
}
var Vo = "$direct";
function Wo() {
	return (null == s ? void 0 : s.referrer) || Vo;
}
function Go(t, i, e = !1) {
	const s = t ? [...Do, ...i || []] : [], r = e ? vi(null == n ? void 0 : n.href) : null == n ? void 0 : n.href, o = null == r ? void 0 : r.substring(0, 1e3);
	return {
		r: Wo().substring(0, 1e3),
		u: o ? Io(o, s, jo) : void 0
	};
}
function Ko(t, i = !1) {
	var e;
	const { r: s, u: n } = t, r = i ? vi(n) : n, o = {
		$referrer: s,
		$referring_domain: null == s ? void 0 : s == Vo ? Vo : null === (e = Oo(s)) || void 0 === e ? void 0 : e.host
	};
	if (r) {
		o.$current_url = r;
		const t = Oo(r);
		o.$host = null == t ? void 0 : t.host, o.$pathname = null == t ? void 0 : t.pathname;
		Vn(o, Uo(r));
	}
	if (s) Vn(o, zo(s));
	return o;
}
function Jo() {
	try {
		return Intl.DateTimeFormat().resolvedOptions().timeZone;
	} catch (t) {
		return;
	}
}
function Yo() {
	try {
		return (/* @__PURE__ */ new Date()).getTimezoneOffset();
	} catch (t) {
		return;
	}
}
var Xo = {
	flags: cn,
	surveys: Xs
};
var Qo = [
	"cookie",
	"localstorage",
	"localstorage+cookie",
	"sessionstorage",
	"memory"
];
var Zo = (t) => `${t}_cookie_identity_change_pending`;
var tl = (t) => {
	let i = "", e = 0;
	for (const s of t) {
		const t = encodeURIComponent(JSON.stringify(s).slice(1, -1)).length;
		if (e + t > 1e3) break;
		i += s, e += t;
	}
	return i;
};
var il = "main";
var el = [
	js,
	Ls,
	Us,
	zs,
	Hs,
	cn,
	qs,
	Gs
];
var sl = (t) => -1 !== el.indexOf(t);
var nl = [hs, cs];
var rl = (t) => -1 !== nl.indexOf(t);
var ol = (t, i) => {
	try {
		return JSON.stringify(t) === JSON.stringify(i);
	} catch (e) {
		return t === i;
	}
};
var ll = (t) => {
	if (!t) return {};
	const i = JSON.parse(t);
	return C(i) ? i : {};
};
var al = (t, i) => {
	qn(t, (e, s) => {
		const n = Po(s);
		n && "event" !== n.exposure || {}.hasOwnProperty.call(i, s) || delete t[s];
	});
};
var ul = class {
	constructor(i, e, s = !0) {
		if (this.Vo = {}, this.Go = !1, this.Zo = !1, this.Qo = !1, this.Jo = !1, this.Ko = !1, this.Xo = /* @__PURE__ */ new Map(), this.Yo = !1, this.tl = !1, this.el = !1, this.il = /* @__PURE__ */ new Set(), this.nl = /* @__PURE__ */ new Set(), this.Ir = i, this.sl = s, this.props = {}, this.rl = void 0, this.ol = ((t) => {
			let i = "";
			return t.token && (i = t.token.replace(/\+/g, "PL").replace(/\//g, "SL").replace(/=/g, "EQ")), t.persistence_name ? "ph_" + t.persistence_name : "ph_" + i + "_posthog";
		})(i), this.Oo = this.ll(i), this.Qo = this.al(i), this.load(), this.ul(), i.debug && Je.info("Persistence loaded", i.persistence, Ei({}, this.props)), this.update_config(i, i, e), this.save(), t) {
			const i = () => this.flush();
			Qn(t, "beforeunload", i, { capture: !1 }), Qn(t, "pagehide", i, { capture: !1 }), this.hl = (i) => {
				if (this.Go && (!i.storageArea || i.storageArea === (null == t ? void 0 : t.localStorage)) && i.key) if (i.key !== this.ol) {
					if (this.Qo) {
						const t = Eo.find((t) => i.key === this.cl(t));
						t && this.dl(i.key, t);
					}
				} else this.dl(i.key, il);
			}, Qn(t, "storage", this.hl);
		}
	}
	markCrossTabFeatureFlagChanges(t) {
		Object.entries(t).forEach(([t, i]) => {
			const e = this.Xo.get(t);
			if (!sl(t) || !0 === e) return;
			if (!0 === i) return void this.vl(t, !0);
			const s = new Set(e || []);
			i.forEach((t) => s.add(t)), s.size && this.vl(t, s);
		});
	}
	onCrossTabFeatureFlagChange(t) {
		return this.nl.add(t), () => this.nl.delete(t);
	}
	destroy() {
		this.hl && t && (t.removeEventListener("storage", this.hl), this.hl = void 0), this.nl.clear();
	}
	dl(t, i, e = !0) {
		if (this.mi) return !1;
		let s, n;
		try {
			if (n = vr.Ot(t), M(n)) {
				const t = this.fl(i);
				return t.storageValue = null, i !== il && (t.persisted = !1), !1;
			}
			s = ll(n);
		} catch (t) {
			return !1;
		}
		const r = i === il ? s : vr.Dt(this.ol);
		if (r && this.pl(r)) return !1;
		const o = this.gl(s, i, e);
		return i === il && this.Qo && !ol(this.ml().main, s) || this.yl(s, i, !0, n), o;
	}
	pl(t) {
		const i = this.props[ns], e = t[ns];
		return !R(i) && !R(e) && i !== e;
	}
	yl(t, i, e, s) {
		const n = this.fl(i);
		n.storageValue = s, i !== il && (n.persisted = e);
		try {
			n.fingerprint = this.bl(t, i);
		} catch (t) {
			n.fingerprint = void 0;
		}
	}
	gl(t, i, e) {
		let s = !1;
		return el.forEach((e) => {
			var n;
			const r = null === (n = Po(e)) || void 0 === n ? void 0 : n.storageGroup;
			if (i === il && this.Qo && r || i !== il && r !== i) return;
			const o = e in t, l = this._l(e, o ? t[e] : void 0), a = this.Xo.has(e) ? e in this.props : o;
			a === e in this.props && ol(l, this.props[e]) || (a ? this.wl(e, l, !1) : this.kl(e, !1), s = !0);
		}), s && e && this.nl.forEach((t) => t()), s;
	}
	Sl() {
		if (!this.Go) return !1;
		try {
			this.el = !1;
			const t = vr.Ot(this.ol), i = this.fl(il);
			let e, s = !1, n = !1;
			if (t !== i.storageValue) if (M(t)) i.storageValue = null;
			else {
				if (e = ll(t), this.el = !this.tl && this.pl(e), this.el) return !1;
				n = this.gl(e, il, !1), !this.Qo || ol(this.ml().main, e) ? this.yl(e, il, !0, t) : i.storageValue = t, s = !0;
			}
			return this.Qo && Eo.forEach((t) => {
				const i = vr.Ot(this.cl(t)), r = this.fl(t), o = e || {}, l = s && el.some((i) => {
					var e;
					return (null === (e = Po(i)) || void 0 === e ? void 0 : e.storageGroup) === t && i in o;
				});
				if (i === r.storageValue && !l) return;
				if (M(i)) return r.storageValue = null, r.persisted = !1, void (l && (n = this.gl(o, t, !1) || n));
				const a = ll(i);
				n = this.gl(a, t, !1) || n, this.yl(a, t, !0, i);
			}), n;
		} catch (t) {
			return !1;
		}
	}
	vl(t, i) {
		this.Xo.set(t, i);
		const e = Po(t);
		null != e && e.volatile || (this.fl((this.Qo ? null == e ? void 0 : e.storageGroup : void 0) || il).fingerprint = void 0, this.xl(t));
	}
	Cl() {
		el.forEach((t) => this.Xo.set(t, !0));
	}
	ul() {
		if (this.Go) try {
			const t = vr.Ot(this.ol), i = ll(t);
			this.fl(il).storageValue = t, el.forEach((t) => {
				var e;
				const s = this.Qo ? null === (e = Po(t)) || void 0 === e ? void 0 : e.storageGroup : void 0, n = s ? vr.Ot(this.cl(s)) : null;
				if (s) {
					const t = this.fl(s);
					t.storageValue = n, t.persisted = !M(n);
				}
				const r = s && !M(n) ? ll(n) : i;
				t in this.props ? this.$l(t, r[t], this.props[t]) : t in r && this.vl(t, !0);
			});
		} catch (t) {}
	}
	_l(t, i) {
		const e = this.Xo.get(t);
		if (!e) return i;
		if (!0 === e) return this.props[t];
		if ("$active_feature_flags" === t) {
			const s = new Set(T(i) ? i : []), n = new Set(T(this.props[t]) ? this.props[t] : []);
			return e.forEach((t) => n.has(t) ? s.add(t) : s.delete(t)), Array.from(s);
		}
		const s = C(i) ? Ei({}, i) : {}, n = C(this.props[t]) ? this.props[t] : {};
		return e.forEach((t) => {
			t in n ? s[t] = n[t] : delete s[t];
		}), s;
	}
	$l(t, i, e) {
		if (!sl(t)) return;
		const s = this.Xo.get(t);
		if (!0 === s) return;
		let n = i;
		if (this.Go) try {
			var r;
			const i = this.Qo ? null === (r = Po(t)) || void 0 === r ? void 0 : r.storageGroup : void 0, e = i ? this.cl(i) : this.ol;
			n = ll(vr.Ot(e))[t];
		} catch (t) {}
		const o = new Set(s || []);
		if ("$active_feature_flags" === t) {
			if (!R(i) && !T(i) || !R(n) && !T(n) || !T(e)) return void this.vl(t, !0);
			const s = new Set(i || []), r = new Set(n || []), l = new Set(e);
			(/* @__PURE__ */ new Set([...s, ...l])).forEach((t) => {
				s.has(t) !== l.has(t) && o.add(t);
			}), o.forEach((t) => {
				r.has(t) === l.has(t) && o.delete(t);
			});
		} else {
			if (!C(e)) return void (ol(n, e) ? this.Xo.delete(t) : this.vl(t, !0));
			{
				if (!R(i) && !C(i) || R(i) && O(e) && R(n)) return void this.vl(t, !0);
				const s = C(i) ? i : {}, r = C(n) ? n : {};
				(/* @__PURE__ */ new Set([...Object.keys(s), ...Object.keys(e)])).forEach((t) => {
					t in s == t in e && ol(s[t], e[t]) || o.add(t);
				}), o.forEach((t) => {
					t in r == t in e && ol(r[t], e[t]) && o.delete(t);
				});
			}
		}
		o.size ? this.vl(t, o) : this.Xo.delete(t);
	}
	Il() {
		var t;
		const i = null === (t = this.Ir) || void 0 === t ? void 0 : t.persistence_save_debounce_ms;
		return D(i) && i > 0 ? i : 0;
	}
	Tl(t) {
		if (this.Ir.cookieWinsOnConflict && "localstorage+cookie" === this.Ir.persistence.toLowerCase()) if (t) try {
			const i = br(t, this.Ir.cookie_persisted_properties || []), e = wr(i, this.Ir.cookie_persisted_properties || []), s = JSON.stringify(i) + "|" + JSON.stringify(e), n = dr.Ot(this.ol) || void 0;
			n && Sr(this.ol, n) === s && (this.Ml = s, this.El = n);
		} catch (t) {}
		else try {
			const t = dr.Ot(this.ol) || void 0;
			this.Ml = t ? Sr(this.ol, t) : void 0, this.El = t;
		} catch (t) {}
	}
	syncCookieProperties() {
		return this.Pl(this.Ir);
	}
	Pl(t, i = !1) {
		if (this.mi && !i || this.Ko || !t.cookieWinsOnConflict || "localstorage+cookie" !== t.persistence.toLowerCase()) return !1;
		let e;
		try {
			e = dr.Ot(this.ol) || void 0;
		} catch (t) {}
		if (!e || e === this.El) return !1;
		const s = Sr(this.ol, e);
		let n;
		try {
			n = mr(JSON.parse(e));
		} catch (t) {
			return !1;
		}
		if ((dr.Ot(this.ol) || void 0) !== e) return !1;
		this.Ml = s, this.El = e;
		const r = $r(this.ol, e), o = [...pr, ...r.properties], l = {};
		if (Object.keys(n).forEach((t) => {
			const i = n[t];
			(R(i) || M(i) || "" === i || "$user_state" === t && "anonymous" !== i && "identified" !== i) && (l[t] = !0, delete n[t]);
		}), O(n)) return !1;
		const a = "distinct_id" in n || "anonymous" === n.$user_state || "identified" === n.$user_state, u = this.props, h = u[ns], d = u[vn], c = Vn({}, u);
		[...pr, ...t.cookie_persisted_properties || []].forEach((t) => {
			if (-1 !== o.indexOf(t) && !(t in n) && !l[t] && (a || "distinct_id" !== t && "$user_state" !== t)) {
				const i = c[t];
				(r.isValid || -1 === pr.indexOf(t) || !1 !== i && 0 !== i) && delete c[t];
			}
		}), this.props = Vn(c, n), el.forEach((t) => {
			const i = t in this.props;
			t in u === i && ol(u[t], this.props[t]) || (i ? this.$l(t, u[t], this.props[t]) : this.vl(t, !0));
		}), !a || "$user_state" in n || "$user_state" in this.props || this.wl(vn, Mn);
		const v = this.props[ns], f = this.props[vn];
		return !a || v === h && f === d || (this.tl = !0, this.Jo = !0, Tr.At(Zo(this.ol), !0), this.kl(Gs), this.kl(Ls), this.kl(js), this.kl(Us), this.kl(zs), this.kl(Hs), this.kl(cn), this.kl(dn), this.kl(un), "anonymous" !== f || "identified" !== d && "anonymous" !== n.$user_state && (R(h) || v === h) || (al(this.props, n), this.kl(Ks)), "identified" === f ? this.props.$user_id = v : delete this.props.$user_id, this.kl(ls)), !0;
	}
	consumeCookieIdentityChange() {
		const t = Zo(this.ol), i = this.Jo || !!Tr.Ot(t);
		return this.Jo = !1, i && Tr.Lt(t), i;
	}
	Rl(t = !1) {
		return !(this.Ko || this.mi && !t || !this.Ir.cookieWinsOnConflict || "localstorage+cookie" !== this.Ir.persistence.toLowerCase() || (this.Ko = !0, 0));
	}
	Al() {
		this.Ko && (R(this.Fl) || (clearTimeout(this.Fl), this.Fl = void 0), delete this.Vo[il], this.Ol(!0));
	}
	Dl(t = !0) {
		if (this.Ko) try {
			t ? this.Al() : R(this.Fl) || (clearTimeout(this.Fl), this.Fl = void 0);
		} finally {
			this.Ko = !1;
		}
	}
	isDisabled() {
		return !!this.mi;
	}
	ll(i) {
		-1 === Qo.indexOf(i.persistence.toLowerCase()) && (Je.critical("Unknown persistence type " + i.persistence + "; falling back to localStorage+cookie"), i.persistence = "localStorage+cookie");
		const e = ((i = [], e = !1) => {
			const s = [...pr, ...i];
			return Ei(Ei({}, vr), {}, {
				Dt(t) {
					try {
						let n, r = {};
						try {
							n = dr.Ot(t) || void 0, r = n ? mr(JSON.parse(n)) : {};
						} catch (t) {}
						const o = JSON.parse(vr.Ot(t) || "{}");
						let l;
						if (e) {
							const e = $r(t, n), a = [...pr, ...e.properties], u = {};
							Object.keys(r).forEach((t) => {
								const i = r[t];
								M(i) || "" === i || "$user_state" === t && "anonymous" !== i && "identified" !== i || (u[t] = i);
							});
							const h = "distinct_id" in u || "anonymous" === u.$user_state || "identified" === u.$user_state;
							if (Object.keys(u).length > 0) {
								var i;
								const t = o[ns], n = null !== (i = o.$user_state) && void 0 !== i ? i : Mn;
								s.forEach((t) => {
									if (-1 !== a.indexOf(t) && !(t in r) && (h || "distinct_id" !== t && "$user_state" !== t)) {
										const i = o[t];
										(e.isValid || -1 === pr.indexOf(t) || !1 !== i && 0 !== i) && delete o[t];
									}
								}), !h || "$user_state" in r || "$user_state" in o || (o[vn] = Mn), !h || ("distinct_id" in u ? u[ns] : o[ns]) === t && ("$user_state" in u ? u[vn] : o[vn]) === n || (fr.forEach((t) => delete o[t]), "identified" === u.$user_state && "distinct_id" in u ? o.$user_id = u[ns] : delete o.$user_id, "identified" !== u.$user_state && (delete o[Js], delete o[Ks]), delete o.__alias);
							}
							l = Vn(o, u);
						} else l = Vn(r, o);
						return vr.At(t, l), l;
					} catch (t) {}
					return null;
				},
				At(t, s, n, r, o, l) {
					const a = vr.At(t, s, void 0, void 0, l);
					try {
						const u = br(s, i);
						if (Object.keys(u).length) {
							if (e) {
								const e = _r(t), h = wr(u, i);
								if (dr.At(e, h, n, r, o, l), dr.Ot(e) !== JSON.stringify(h)) {
									dr.Lt(e, r);
									const i = br(s);
									return dr.At(t, i, n, r, o, l), a;
								}
							}
							dr.At(t, u, n, r, o, l);
						}
					} catch (t) {
						vr.Pt(t);
					}
					return a;
				},
				Lt(i, e) {
					try {
						t?.localStorage.removeItem(i), dr.Lt(i, e), dr.Lt(_r(i), e);
					} catch (t) {
						vr.Pt(t);
					}
				}
			});
		})(i.cookie_persisted_properties || [], i.cookieWinsOnConflict);
		let s, n = !1, r = !1;
		const o = i.persistence.toLowerCase();
		return "localstorage" === o && vr.Et() ? (s = vr, r = !0) : "localstorage+cookie" === o && e.Et() ? (s = e, r = !0, n = !0) : "sessionstorage" === o && Tr.Et() ? s = Tr : "memory" === o ? s = Er : "cookie" === o && dr.Et() ? (s = dr, n = !0) : e.Et() ? (s = e, r = !0, n = !0) : dr.Et() ? (s = dr, n = !0) : s = Er, this.Go = r, this.Zo = n, s;
	}
	cl(t) {
		return `${this.ol}__${t}`;
	}
	al(t) {
		return this.Go && !!t.split_storage;
	}
	properties() {
		const t = {};
		return qn(this.props, (i, e) => {
			const s = Po(e);
			if (!s || "event" === s.exposure) {
				var n;
				if (null == s || null === (n = s.shouldSkipFromEventProperties) || void 0 === n ? void 0 : n.call(s, i)) return;
				t[e] = i;
			}
		}), t;
	}
	load(t = !1) {
		if (this.mi && !t) return;
		const i = this.Ir.cookieWinsOnConflict && "localstorage+cookie" === this.Ir.persistence.toLowerCase(), e = i ? vr.Dt(this.ol) : null;
		let s = {};
		if (i) try {
			s = mr(dr.Dt(this.ol)), qn(s, (t, i) => {
				(R(t) || M(t) || "" === t) && delete s[i];
			});
		} catch (t) {}
		const n = this.Oo.Dt(this.ol);
		if (n && (this.props = Vn({}, n)), this.Qo && this.Ll(), i && n) {
			var r, o;
			const t = null == e ? void 0 : e[ns], i = null !== (r = null == e ? void 0 : e.$user_state) && void 0 !== r ? r : Mn, l = n[ns], a = null !== (o = n.$user_state) && void 0 !== o ? o : Mn;
			if (l !== t || a !== i) {
				this.Jo = !0, Tr.At(Zo(this.ol), !0);
				const e = Vn({}, this.props);
				fr.forEach((t) => delete e[t]), "anonymous" !== a || "identified" !== i && "anonymous" !== s.$user_state && (R(t) || l === t) || (al(e, s), delete e[Ks]), this.props = e;
				const n = /* @__PURE__ */ new Set();
				fr.forEach((t) => {
					var i;
					const e = null === (i = Po(t)) || void 0 === i ? void 0 : i.storageGroup;
					e && n.add(e);
				}), n.forEach((t) => {
					const i = {};
					qn(this.props, (e, s) => {
						var n;
						(null === (n = Po(s)) || void 0 === n ? void 0 : n.storageGroup) === t && (i[s] = e);
					}), O(i) ? (vr.Lt(this.cl(t)), this.Vo[t] = {}) : vr.At(this.cl(t), i) && (this.Vo[t] = {
						persisted: !0,
						fingerprint: this.bl(i, t)
					});
				});
			}
		}
		Tr.Ot(Zo(this.ol)) && (this.Jo = !0);
	}
	Ll() {
		for (const t of Eo) {
			const i = vr.Dt(this.cl(t));
			if (i && !O(i)) {
				const e = this.fl(t);
				e.persisted = !0, this.Nl(t) || (e.fingerprint = this.bl(i, t)), this.ql(t, i) || Vn(this.props, i);
			}
		}
	}
	Nl(t) {
		return Object.keys(this.props).some((i) => {
			var e;
			return (null === (e = Po(i)) || void 0 === e ? void 0 : e.storageGroup) === t;
		});
	}
	ql(t, i) {
		const e = Xo[t];
		if (!e) return !1;
		const s = i[e], n = this.props[e];
		return D(s) && D(n) && n > s;
	}
	refreshKey(t) {
		var i;
		if (this.mi) return;
		if (this.il.has(t)) return;
		const e = this.Qo ? null === (i = Po(t)) || void 0 === i ? void 0 : i.storageGroup : void 0, s = e ? vr.Dt(this.cl(e)) : this.Oo.Dt(this.ol);
		if (s && t in s) this.wl(t, s[t], !1);
		else {
			if (e) {
				const i = this.Oo.Dt(this.ol);
				if (i && t in i) return void this.wl(t, i[t], !1);
			}
			this.kl(t, !1);
		}
	}
	save() {
		if (this.mi) return;
		const t = this.Il();
		t > 0 ? R(this.Fl) && (this.Fl = setTimeout(() => {
			this.Fl = void 0, this.Ol();
		}, t)) : this.Ol();
	}
	flush() {
		R(this.Fl) || (clearTimeout(this.Fl), this.Fl = void 0, this.Ol());
	}
	Ol(t = !1) {
		if (this.mi || this.Ko && !t) return;
		t || (this.syncCookieProperties(), this.Ir.cookieWinsOnConflict && "localstorage+cookie" === this.Ir.persistence.toLowerCase() || nl.forEach((t) => this.refreshKey(t)));
		const i = !t && !this.Yo;
		i || (this.el = !1);
		const e = !!i && this.Sl();
		if (this.el) return void (this.Ir.debug && Je.warn("skipping persistence write because storage belongs to a different distinct ID"));
		if (this.Qo) return this.jl(), void (e && this.nl.forEach((t) => t()));
		const s = this.Bl(this.Oo, this.ol, this.props, il);
		"written" === s && this.Tl(this.props), "failed" !== s && (this.Xo.clear(), this.tl = !1, this.il.clear()), e && this.nl.forEach((t) => t());
	}
	jl() {
		const { main: t, groups: i } = this.ml(), e = this.Bl(this.Oo, this.ol, t, il);
		"written" === e && this.Tl(t), "failed" !== e && (this.tl = !1, this.il.clear(), el.forEach((t) => {
			var i;
			null !== (i = Po(t)) && void 0 !== i && i.storageGroup || this.Xo.delete(t);
		}));
		for (const t of Eo) {
			var s;
			const e = i[t];
			if (O(e) && !(null === (s = this.Vo[t]) || void 0 === s ? void 0 : s.persisted)) {
				el.forEach((i) => {
					var e;
					(null === (e = Po(i)) || void 0 === e ? void 0 : e.storageGroup) === t && this.Xo.delete(i);
				});
				continue;
			}
			const n = this.Bl(vr, this.cl(t), e, t);
			"failed" !== n && el.forEach((i) => {
				const e = Po(i);
				(null == e ? void 0 : e.storageGroup) !== t || "written" !== n && e.volatile || this.Xo.delete(i);
			});
		}
	}
	ml() {
		const t = {}, i = {
			flags: {},
			surveys: {}
		};
		return qn(this.props, (e, s) => {
			var n;
			const r = null === (n = Po(s)) || void 0 === n ? void 0 : n.storageGroup;
			r ? i[r][s] = e : t[s] = e;
		}), {
			main: t,
			groups: i
		};
	}
	bl(t, i) {
		if (i === il) return JSON.stringify(t) + "|" + this.Hl + "|" + this.zl + "|" + this.Ul;
		const e = {};
		return qn(t, (t, i) => {
			var s;
			e[i] = (null === (s = Po(i)) || void 0 === s ? void 0 : s.volatile) ? "__volatile__" : t;
		}), JSON.stringify(e);
	}
	Bl(t, i, e, s) {
		const n = this.fl(s);
		if (s !== il && !n.dirty && !R(n.fingerprint)) return "skipped";
		let r;
		try {
			if (r = this.bl(e, s), r === n.fingerprint) return n.dirty = !1, "skipped";
		} catch (t) {
			r = void 0;
		}
		return t.At(i, e, this.Hl, this.zl, this.Ul, this.Ir.debug) ? (n.dirty = !1, s !== il && (n.persisted = !0), R(r) || (n.fingerprint = r), this.Go && (n.storageValue = vr.Ot(i)), "written") : (this.Ir.debug && Je.warn(`failed to persist storage entry "${i}"; will retry on next save`), "failed");
	}
	remove({ keepGroupEntries: t = !1 } = {}) {
		if (this.Cl(), R(this.Fl) || (clearTimeout(this.Fl), this.Fl = void 0), this.Oo.Lt(this.ol, !1), this.Oo.Lt(this.ol, !0), !t && this.sl) for (const t of Eo) vr.Lt(this.cl(t));
		t ? delete this.Vo[il] : this.Vo = {}, this.Ml = void 0, this.El = void 0;
	}
	clear() {
		this.remove(), this.props = {};
	}
	register_once(t, i, e) {
		if (C(t)) {
			this.syncCookieProperties(), R(i) && (i = "None"), this.Hl = R(e) ? this.Wl : e;
			let s = !1;
			if (qn(t, (t, e) => {
				this.props.hasOwnProperty(e) && this.props[e] !== i || (this.wl(e, t), s = !0);
			}), s) return this.save(), !0;
		}
		return !1;
	}
	register(t, i) {
		if (C(t)) {
			this.syncCookieProperties(), this.Hl = R(i) ? this.Wl : i;
			let e = !1;
			if (qn(t, (i, s) => {
				t.hasOwnProperty(s) && (this.props[s] !== i || C(i) || T(i)) && (this.wl(s, i), e = !0);
			}), e) return this.save(), !0;
		}
		return !1;
	}
	unregister(t) {
		this.syncCookieProperties();
		const i = "string" == typeof t ? [t] : t;
		let e = !1;
		for (const t of i) t in this.props && (this.kl(t), e = !0);
		e && this.save();
	}
	update_campaign_params() {
		const t = null == s ? void 0 : s.URL;
		if (t === this.rl) return;
		const i = Bo(this.Ir.custom_campaign_params, this.Ir.mask_personal_data_properties, this.Ir.custom_personal_data_properties), e = !O(Kn(i));
		return e && this.register(i), this.rl = t, e ? i : void 0;
	}
	update_search_keyword() {
		this.register(function() {
			const t = null == s ? void 0 : s.referrer;
			return t ? zo(t) : {};
		}());
	}
	update_referrer_info() {
		var t;
		this.register_once({
			$referrer: Wo(),
			$referring_domain: (null == s ? void 0 : s.referrer) && (null === (t = Oo(s.referrer)) || void 0 === t ? void 0 : t.host) || Vo
		}, void 0);
	}
	set_initial_person_info() {
		if (this.props.$initial_campaign_params || this.props.$initial_referrer_info) return;
		const t = Go(this.Ir.mask_personal_data_properties, this.Ir.custom_personal_data_properties, this.Ir.disable_capture_url_hashes);
		this.register_once({ [mn]: this.Zo ? {
			r: tl(t.r),
			u: t.u ? tl(t.u) : void 0
		} : t }, void 0);
	}
	get_initial_props() {
		const t = {};
		qn([gn, _n], (i) => {
			const e = this.props[i];
			e && qn(e, function(i, e) {
				t["$initial_" + w(e)] = i;
			});
		});
		const i = this.props[mn];
		if (i) Vn(t, function(t, i = !1) {
			const e = Ko(t, i), s = {};
			return qn(e, function(t, i) {
				s[`$initial_${w(i)}`] = t;
			}), s;
		}(i, this.Ir.disable_capture_url_hashes));
		return t;
	}
	safe_merge(t) {
		return qn(this.props, function(i, e) {
			e in t || (t[e] = i);
		}), t;
	}
	update_config(t, i, e) {
		const s = t.persistence !== i.persistence, n = !((t, i) => {
			if (t.length !== i.length) return !1;
			const e = [...t].sort(), s = [...i].sort();
			return e.every((t, i) => t === s[i]);
		})(t.cookie_persisted_properties || [], i.cookie_persisted_properties || []), r = s || n, o = t.cookieWinsOnConflict !== i.cookieWinsOnConflict, l = t.disable_persistence || !!e, a = !!this.mi && !l;
		l || this.Pl(i, a), this.Ir = t, !l && (s || n || o) && (this.Ml = void 0, this.El = void 0, this.Pl(Ei(Ei({}, t), {}, { cookie_persisted_properties: i.cookie_persisted_properties }), a));
		const u = r || o ? this.ll(t) : this.Oo;
		this.Vl();
		const h = this.al(t), d = r || h !== this.Qo, c = !l && (d || t.cross_subdomain_cookie !== this.zl || t.secure_cookie !== this.Ul) && this.Rl(a);
		this.Yo = d;
		try {
			if (this.Wl = this.Hl = t.cookie_expiration, this.set_disabled(l), this.set_cross_subdomain(t.cross_subdomain_cookie), this.set_secure(t.secure_cookie), d) {
				const t = this.props;
				this.clear(), this.Oo = u, this.Qo = h, this.props = t, this.save();
			} else o && (this.Oo = u, l || (delete this.Vo[il], this.Ol()));
		} finally {
			this.Yo = !1, c && this.Dl();
		}
	}
	Vl() {
		const t = this.props[mn];
		if (!this.Zo || !C(t) || "string" != typeof t.r) return;
		const i = tl(t.r), e = "string" == typeof t.u ? tl(t.u) : t.u;
		i === t.r && e === t.u || this.wl(mn, Ei(Ei({}, t), {}, {
			r: i,
			u: e
		}));
	}
	set_disabled(t) {
		this.mi = t, this.mi ? this.remove() : this.save();
	}
	set_cross_subdomain(t) {
		t !== this.zl && (this.zl = t, this.remove({ keepGroupEntries: !0 }), this.save());
	}
	set_secure(t) {
		t !== this.Ul && (this.Ul = t, this.remove({ keepGroupEntries: !0 }), this.save());
	}
	set_event_timer(t, i) {
		const e = this.props.__timers || {};
		e[t] = i, this.wl(vs, e), this.save();
	}
	remove_event_timer(t) {
		const i = this.props.__timers || {}, e = i[t];
		return R(e) || (delete i[t], this.wl(vs, i), this.save()), e;
	}
	get_property(t) {
		return this.props[t];
	}
	set_property(t, i) {
		this.wl(t, i), this.save();
	}
	wl(t, i, e = !0) {
		var s;
		const n = this.props[t];
		this.props[t] = i, e && ("distinct_id" !== t && "$user_state" !== t || n === i || (this.tl = !0), rl(t) && !ol(n, i) && this.il.add(t), this.$l(t, n, i), null !== (s = Po(t)) && void 0 !== s && s.volatile || this.xl(t));
	}
	kl(t, i = !0) {
		delete this.props[t], i && (sl(t) && this.vl(t, !0), rl(t) && this.il.add(t), this.xl(t));
	}
	xl(t) {
		var i;
		const e = null === (i = Po(t)) || void 0 === i ? void 0 : i.storageGroup;
		e && (this.fl(e).dirty = !0);
	}
	fl(t) {
		return this.Vo[t] || (this.Vo[t] = {});
	}
};
var hl = {
	GZipJS: "gzip-js",
	Base64: "base64"
};
var dl = {
	Activation: "events",
	Cancellation: "cancelEvents"
};
var pl = {
	Popover: "popover",
	API: "api",
	Widget: "widget",
	ExternalSurvey: "external_survey"
};
var bl = {
	SHOWN: "survey shown",
	DISMISSED: "survey dismissed",
	SENT: "survey sent",
	ABANDONED: "survey abandoned"
};
var yl = {
	SURVEY_ID: "$survey_id",
	SURVEY_NAME: "$survey_name",
	SURVEY_RESPONSE: "$survey_response",
	SURVEY_ITERATION: "$survey_iteration",
	SURVEY_ITERATION_START_DATE: "$survey_iteration_start_date",
	SURVEY_PARTIALLY_COMPLETED: "$survey_partially_completed",
	SURVEY_SUBMISSION_ID: "$survey_submission_id",
	SURVEY_QUESTIONS: "$survey_questions",
	SURVEY_COMPLETED: "$survey_completed",
	PRODUCT_TOUR_ID: "$product_tour_id",
	SURVEY_LAST_SEEN_DATE: "$survey_last_seen_date",
	SURVEY_LANGUAGE: "$survey_language"
};
var wl = {
	Popover: "popover",
	Inline: "inline"
};
function $l(t) {
	let i = !0;
	return { dispose() {
		if (i) {
			i = !1;
			const e = t();
			e && P(e.then) && e.then(void 0, () => {});
		}
	} };
}
var xl = {
	SHOWN: "product tour shown",
	DISMISSED: "product tour dismissed",
	COMPLETED: "product tour completed",
	STEP_SHOWN: "product tour step shown",
	STEP_COMPLETED: "product tour step completed",
	BUTTON_CLICKED: "product tour button clicked",
	STEP_SELECTOR_FAILED: "product tour step selector failed",
	BANNER_CONTAINER_SELECTOR_FAILED: "product tour banner container selector failed",
	BANNER_ACTION_CLICKED: "product tour banner action clicked"
};
var El = {
	TOUR_ID: "$product_tour_id",
	TOUR_NAME: "$product_tour_name",
	TOUR_ITERATION: "$product_tour_iteration",
	TOUR_RENDER_REASON: "$product_tour_render_reason",
	TOUR_STEP_ID: "$product_tour_step_id",
	TOUR_STEP_ORDER: "$product_tour_step_order",
	TOUR_STEP_TYPE: "$product_tour_step_type",
	TOUR_DISMISS_REASON: "$product_tour_dismiss_reason",
	TOUR_BUTTON_TEXT: "$product_tour_button_text",
	TOUR_BUTTON_ACTION: "$product_tour_button_action",
	TOUR_BUTTON_LINK: "$product_tour_button_link",
	TOUR_BUTTON_TOUR_ID: "$product_tour_button_tour_id",
	TOUR_STEPS_COUNT: "$product_tour_steps_count",
	TOUR_STEP_SELECTOR: "$product_tour_step_selector",
	TOUR_STEP_SELECTOR_FOUND: "$product_tour_step_selector_found",
	TOUR_STEP_ELEMENT_TAG: "$product_tour_step_element_tag",
	TOUR_STEP_ELEMENT_ID: "$product_tour_step_element_id",
	TOUR_STEP_ELEMENT_CLASSES: "$product_tour_step_element_classes",
	TOUR_STEP_ELEMENT_TEXT: "$product_tour_step_element_text",
	TOUR_ERROR: "$product_tour_error",
	TOUR_MATCHES_COUNT: "$product_tour_matches_count",
	TOUR_FAILURE_PHASE: "$product_tour_failure_phase",
	TOUR_WAITED_FOR_ELEMENT: "$product_tour_waited_for_element",
	TOUR_WAIT_DURATION_MS: "$product_tour_wait_duration_ms",
	TOUR_BANNER_SELECTOR: "$product_tour_banner_selector",
	TOUR_LINKED_SURVEY_ID: "$product_tour_linked_survey_id",
	USE_MANUAL_SELECTOR: "$use_manual_selector",
	INFERENCE_DATA_PRESENT: "$inference_data_present",
	TOUR_LAST_SEEN_DATE: "$product_tour_last_seen_date",
	TOUR_TYPE: "$product_tour_type"
};
var kl = Ye("[RateLimiter]");
var Tl = class {
	constructor(t) {
		this.serverLimits = {}, this.lastEventRateLimited = !1, this.checkForLimiting = (t) => {
			const i = t.text;
			if (i && i.length) try {
				(JSON.parse(i).quota_limited || []).forEach((t) => {
					kl.info(`${t || "events"} is quota limited.`), this.serverLimits[t] = (/* @__PURE__ */ new Date()).getTime() + 6e4;
				});
			} catch (t) {
				kl.warn(`could not rate limit - continuing. Error: "${null == t ? void 0 : t.message}"`, { text: i });
				return;
			}
		}, this.instance = t, this.lastEventRateLimited = this.clientRateLimitContext(!0).isRateLimited;
	}
	get captureEventsPerSecond() {
		var t;
		return (null === (t = this.instance.config.rate_limiting) || void 0 === t ? void 0 : t.events_per_second) || 10;
	}
	get captureEventsBurstLimit() {
		var t;
		return Math.max((null === (t = this.instance.config.rate_limiting) || void 0 === t ? void 0 : t.events_burst_limit) || 10 * this.captureEventsPerSecond, this.captureEventsPerSecond);
	}
	clientRateLimitContext(t = !1) {
		var i, e, s;
		const { captureEventsBurstLimit: n, captureEventsPerSecond: r } = this, o = (/* @__PURE__ */ new Date()).getTime(), l = null !== (i = null === (e = this.instance.persistence) || void 0 === e ? void 0 : e.get_property("$capture_rate_limit")) && void 0 !== i ? i : {
			tokens: n,
			last: o
		};
		l.tokens += (o - l.last) / 1e3 * r, l.last = o, l.tokens > n && (l.tokens = n);
		const a = 1 > l.tokens;
		if (a || t || (l.tokens = Math.max(0, l.tokens - 1)), a && !t) {
			const t = (D(l.dropped) ? l.dropped : 0) + 1;
			l.dropped = t, !this.lastEventRateLimited && this.Gl(t) && (l.dropped = 0);
		}
		return this.lastEventRateLimited = a, null === (s = this.instance.persistence) || void 0 === s || s.set_property("$capture_rate_limit", l), {
			isRateLimited: a,
			remainingTokens: l.tokens
		};
	}
	Zl(t) {
		const i = this.instance.config.property_denylist;
		return !T(i) || !i.includes(t);
	}
	Ql() {
		var t;
		if (this.Zl("$current_url") && this.Zl("$pathname") && (null == n ? void 0 : n.pathname)) return `${null !== (t = n.origin) && void 0 !== t ? t : ""}${n.pathname}`;
	}
	Gl(t) {
		var i, e;
		const { captureEventsBurstLimit: s, captureEventsPerSecond: n } = this, r = this.Ql(), o = this.Zl("$session_id") ? null === (i = (e = this.instance).get_session_id) || void 0 === i ? void 0 : i.call(e) : void 0, l = [
			`${t} event(s) dropped since the last warning`,
			r ? `triggered on ${r}` : void 0,
			o ? `session ${o}` : void 0
		].filter(Boolean).join(", ");
		return !!this.instance.capture("$$client_ingestion_warning", { $$client_ingestion_warning_message: `posthog-js client rate limited: ${l}. Config is set to ${n} events per second and ${s} events burst limit.` }, { skip_client_rate_limiting: !0 });
	}
	isServerRateLimited(t) {
		const i = this.serverLimits[t || "events"] || !1;
		return !1 !== i && (/* @__PURE__ */ new Date()).getTime() < i;
	}
};
var Pl = Ye("[RemoteConfig]");
var Cl = class {
	constructor(t) {
		this._instance = t;
	}
	get remoteConfig() {
		var t;
		return null === (t = c._POSTHOG_REMOTE_CONFIG) || void 0 === t || null === (t = t[this._instance.config.token]) || void 0 === t ? void 0 : t.config;
	}
	Jl(t) {
		var i, e, s;
		(null === (i = c.__PosthogExtensions__) || void 0 === i ? void 0 : i.loadExternalDependency) ? null === (e = c.__PosthogExtensions__) || void 0 === e || null === (s = e.loadExternalDependency) || void 0 === s || s.call(e, this._instance, "remote-config", () => t(this.remoteConfig)) : t();
	}
	Kl(t) {
		this._instance._send_request({
			method: "GET",
			url: this._instance.requestRouter.endpointFor("assets", `/array/${this._instance.config.token}/config`),
			callback: t
		});
	}
	load() {
		try {
			if (this.remoteConfig) return Pl.info("Using preloaded remote config", this.remoteConfig), void this.Xl(this.remoteConfig);
			if (this._instance.Yl()) return void Pl.warn("Remote config is disabled. Falling back to local config.");
			this.Jl((t) => {
				if (!t) return Pl.info("No config found after loading remote JS config. Falling back to JSON."), void this.Kl((t) => {
					this.Xl(t.json, t);
				});
				this.Xl(t);
			});
		} catch (t) {
			Pl.error("Error loading remote config", t), this.Xl();
		}
	}
	Xl(t, i) {
		!t && i && (0 === i.statusCode ? i.error || Pl.warn("Failed to fetch remote config from PostHog.") : Pl.error("Failed to fetch remote config from PostHog."));
		try {
			this._instance.Xl(t ? {
				ok: !0,
				config: t
			} : { ok: !1 });
		} catch (t) {
			Pl.error("Error applying remote config", t);
		}
		if (!1 !== (null == t ? void 0 : t.hasFeatureFlags) && !this._instance.config.advanced_disable_feature_flags_on_first_load) try {
			var e;
			null === (e = this._instance.featureFlags) || void 0 === e || e.ensureFlagsLoaded();
		} catch (t) {
			Pl.error("Error loading feature flags", t);
		}
	}
};
var Rl = Uint8Array;
var Il = Uint16Array;
var Fl = Uint32Array;
var Ml = new Rl([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0,
	0,
	0,
	0
]);
var Al = new Rl([
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13,
	0,
	0
]);
var Dl = new Rl([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]);
var Nl = function(t, i) {
	for (var e = new Il(31), s = 0; 31 > s; ++s) e[s] = i += 1 << t[s - 1];
	var n = new Fl(e[30]);
	for (s = 1; 30 > s; ++s) for (var r = e[s]; e[s + 1] > r; ++r) n[r] = r - e[s] << 5 | s;
	return [e, n];
};
var jl = Nl(Ml, 2);
var Ll = jl[1];
jl[0][28] = 258, Ll[258] = 28;
for (var Bl = Nl(Al, 0)[1], Ul = new Il(32768), zl = 0; 32768 > zl; ++zl) {
	var Hl = (43690 & zl) >>> 1 | (21845 & zl) << 1;
	Ul[zl] = ((65280 & (Hl = (61680 & (Hl = (52428 & Hl) >>> 2 | (13107 & Hl) << 2)) >>> 4 | (3855 & Hl) << 4)) >>> 8 | (255 & Hl) << 8) >>> 1;
}
var ql = function(t, i, e) {
	for (var s = t.length, n = 0, r = new Il(i); s > n; ++n) ++r[t[n] - 1];
	var o, l = new Il(i);
	for (n = 0; i > n; ++n) l[n] = l[n - 1] + r[n - 1] << 1;
	if (e) {
		o = new Il(1 << i);
		var a = 15 - i;
		for (n = 0; s > n; ++n) if (t[n]) for (var u = n << 4 | t[n], h = i - t[n], d = l[t[n] - 1]++ << h, c = d | (1 << h) - 1; c >= d; ++d) o[Ul[d] >>> a] = u;
	} else for (o = new Il(s), n = 0; s > n; ++n) o[n] = Ul[l[t[n] - 1]++] >>> 15 - t[n];
	return o;
};
var Vl = new Rl(288);
for (zl = 0; 144 > zl; ++zl) Vl[zl] = 8;
for (zl = 144; 256 > zl; ++zl) Vl[zl] = 9;
for (zl = 256; 280 > zl; ++zl) Vl[zl] = 7;
for (zl = 280; 288 > zl; ++zl) Vl[zl] = 8;
var Wl = new Rl(32);
for (zl = 0; 32 > zl; ++zl) Wl[zl] = 5;
var Gl = ql(Vl, 9, 0);
var Kl = ql(Wl, 5, 0);
var Jl = function(t) {
	return (t / 8 | 0) + (7 & t && 1);
};
var Yl = function(t, i, e) {
	(null == i || 0 > i) && (i = 0), (null == e || e > t.length) && (e = t.length);
	var s = new (t instanceof Il ? Il : t instanceof Fl ? Fl : Rl)(e - i);
	return s.set(t.subarray(i, e)), s;
};
var Xl = function(t, i, e) {
	var s = i / 8 | 0;
	t[s] |= e <<= 7 & i, t[s + 1] |= e >>> 8;
};
var Ql = function(t, i, e) {
	var s = i / 8 | 0;
	t[s] |= e <<= 7 & i, t[s + 1] |= e >>> 8, t[s + 2] |= e >>> 16;
};
var Zl = function(t, i) {
	for (var e = [], s = 0; t.length > s; ++s) t[s] && e.push({
		s,
		f: t[s]
	});
	var n = e.length, r = e.slice();
	if (!n) return [new Rl(0), 0];
	if (1 == n) {
		var o = new Rl(e[0].s + 1);
		return o[e[0].s] = 1, [o, 1];
	}
	e.sort(function(t, i) {
		return t.f - i.f;
	}), e.push({
		s: -1,
		f: 25001
	});
	var l = e[0], a = e[1], u = 0, h = 1, d = 2;
	for (e[0] = {
		s: -1,
		f: l.f + a.f,
		l,
		r: a
	}; h != n - 1;) l = e[e[d].f > e[u].f ? u++ : d++], a = e[u != h && e[d].f > e[u].f ? u++ : d++], e[h++] = {
		s: -1,
		f: l.f + a.f,
		l,
		r: a
	};
	var c = r[0].s;
	for (s = 1; n > s; ++s) r[s].s > c && (c = r[s].s);
	var v = new Il(c + 1), f = ta(e[h - 1], v, 0);
	if (f > i) {
		s = 0;
		var p = 0, _ = f - i, g = 1 << _;
		for (r.sort(function(t, i) {
			return v[i.s] - v[t.s] || t.f - i.f;
		}); n > s; ++s) {
			var m = r[s].s;
			if (i >= v[m]) break;
			p += g - (1 << f - v[m]), v[m] = i;
		}
		for (p >>>= _; p > 0;) {
			var b = r[s].s;
			i > v[b] ? p -= 1 << i - v[b]++ - 1 : ++s;
		}
		for (; s >= 0 && p; --s) {
			var y = r[s].s;
			v[y] == i && (--v[y], ++p);
		}
		f = i;
	}
	return [new Rl(v), f];
};
var ta = function(t, i, e) {
	return -1 == t.s ? Math.max(ta(t.l, i, e + 1), ta(t.r, i, e + 1)) : i[t.s] = e;
};
var ia = function(t) {
	for (var i = t.length; i && !t[--i];);
	for (var e = new Il(++i), s = 0, n = t[0], r = 1, o = function(t) {
		e[s++] = t;
	}, l = 1; i >= l; ++l) if (t[l] == n && l != i) ++r;
	else {
		if (!n && r > 2) {
			for (; r > 138; r -= 138) o(32754);
			r > 2 && (o(r > 10 ? r - 11 << 5 | 28690 : r - 3 << 5 | 12305), r = 0);
		} else if (r > 3) {
			for (o(n), --r; r > 6; r -= 6) o(8304);
			r > 2 && (o(r - 3 << 5 | 8208), r = 0);
		}
		for (; r--;) o(n);
		r = 1, n = t[l];
	}
	return [e.subarray(0, s), i];
};
var ea = function(t, i) {
	for (var e = 0, s = 0; i.length > s; ++s) e += t[s] * i[s];
	return e;
};
var sa = function(t, i, e) {
	var s = e.length, n = Jl(i + 2);
	t[n] = 255 & s, t[n + 1] = s >>> 8, t[n + 2] = 255 ^ t[n], t[n + 3] = 255 ^ t[n + 1];
	for (var r = 0; s > r; ++r) t[n + r + 4] = e[r];
	return 8 * (n + 4 + s);
};
var na = function(t, i, e, s, n, r, o, l, a, u, h) {
	Xl(i, h++, e), ++n[256];
	for (var d = Zl(n, 15), c = d[0], v = d[1], f = Zl(r, 15), p = f[0], _ = f[1], g = ia(c), m = g[0], b = g[1], y = ia(p), w = y[0], S = y[1], x = new Il(19), E = 0; m.length > E; ++E) x[31 & m[E]]++;
	for (E = 0; w.length > E; ++E) x[31 & w[E]]++;
	for (var k = Zl(x, 7), T = k[0], P = k[1], C = 19; C > 4 && !T[Dl[C - 1]]; --C);
	var O, R, I, F, M = u + 5 << 3, A = ea(n, Vl) + ea(r, Wl) + o, D = ea(n, c) + ea(r, p) + o + 14 + 3 * C + ea(x, T) + (2 * x[16] + 3 * x[17] + 7 * x[18]);
	if (A >= M && D >= M) return sa(i, h, t.subarray(a, a + u));
	if (Xl(i, h, 1 + (A > D)), h += 2, A > D) {
		O = ql(c, v, 0), R = c, I = ql(p, _, 0), F = p;
		var N = ql(T, P, 0);
		for (Xl(i, h, b - 257), Xl(i, h + 5, S - 1), Xl(i, h + 10, C - 4), h += 14, E = 0; C > E; ++E) Xl(i, h + 3 * E, T[Dl[E]]);
		h += 3 * C;
		for (var j = [m, w], L = 0; 2 > L; ++L) {
			var B = j[L];
			for (E = 0; B.length > E; ++E) Xl(i, h, N[U = 31 & B[E]]), h += T[U], U > 15 && (Xl(i, h, B[E] >>> 5 & 127), h += B[E] >>> 12);
		}
	} else O = Gl, R = Vl, I = Kl, F = Wl;
	for (E = 0; l > E; ++E) if (s[E] > 255) {
		var U;
		Ql(i, h, O[257 + (U = s[E] >>> 18 & 31)]), h += R[U + 257], U > 7 && (Xl(i, h, s[E] >>> 23 & 31), h += Ml[U]);
		var z = 31 & s[E];
		Ql(i, h, I[z]), h += F[z], z > 3 && (Ql(i, h, s[E] >>> 5 & 8191), h += Al[z]);
	} else Ql(i, h, O[s[E]]), h += R[s[E]];
	return Ql(i, h, O[256]), h + R[256];
};
var ra = new Fl([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]);
var oa = new Rl(0);
var la = function() {
	for (var t = new Fl(256), i = 0; 256 > i; ++i) {
		for (var e = i, s = 9; --s;) e = (1 & e && 3988292384) ^ e >>> 1;
		t[i] = e;
	}
	return t;
}();
var aa = function(t, i, e) {
	for (; e; ++i) t[i] = e, e >>>= 8;
};
function ua(t, i) {
	void 0 === i && (i = {});
	var e = function() {
		var t = 4294967295;
		return {
			p(i) {
				for (var e = t, s = 0; i.length > s; ++s) e = la[255 & e ^ i[s]] ^ e >>> 8;
				t = e;
			},
			d() {
				return 4294967295 ^ t;
			}
		};
	}(), s = t.length;
	e.p(t);
	var n, r, o, l, a, u, h = (l = 10 + ((n = i).filename && n.filename.length + 1 || 0), a = 8, function(t, i, e, s, n, r) {
		var o = t.length, l = new Rl(s + o + 5 * (1 + Math.floor(o / 7e3)) + n), a = l.subarray(s, l.length - n), u = 0;
		if (!i || 8 > o) for (var h = 0; o >= h; h += 65535) {
			var d = h + 65535;
			o > d ? u = sa(a, u, t.subarray(h, d)) : (a[h] = r, u = sa(a, u, t.subarray(h, o)));
		}
		else {
			for (var c = ra[i - 1], v = c >>> 13, f = 8191 & c, p = (1 << e) - 1, _ = new Il(32768), g = new Il(p + 1), m = Math.ceil(e / 3), b = 2 * m, y = function(i) {
				return (t[i] ^ t[i + 1] << m ^ t[i + 2] << b) & p;
			}, w = new Fl(25e3), S = new Il(288), x = new Il(32), E = 0, k = 0, T = (h = 0, 0), P = 0, C = 0; o > h; ++h) {
				var O = y(h), R = 32767 & h, I = g[O];
				if (_[R] = I, g[O] = R, h >= P) {
					var F = o - h;
					if ((E > 7e3 || T > 24576) && F > 423) {
						u = na(t, a, 0, w, S, x, k, T, C, h - C, u), T = E = k = 0, C = h;
						for (var M = 0; 286 > M; ++M) S[M] = 0;
						for (M = 0; 30 > M; ++M) x[M] = 0;
					}
					var A = 2, D = 0, N = f, j = R - I & 32767;
					if (F > 2 && O == y(h - j)) for (var L = Math.min(v, F) - 1, B = Math.min(32767, h), U = Math.min(258, F); B >= j && --N && R != I;) {
						if (t[h + A] == t[h + A - j]) {
							for (var z = 0; U > z && t[h + z] == t[h + z - j]; ++z);
							if (z > A) {
								if (A = z, D = j, z > L) break;
								var H = Math.min(j, z - 2), q = 0;
								for (M = 0; H > M; ++M) {
									var V = h - j + M + 32768 & 32767, W = V - _[V] + 32768 & 32767;
									W > q && (q = W, I = V);
								}
							}
						}
						j += (R = I) - (I = _[R]) + 32768 & 32767;
					}
					if (D) {
						w[T++] = 268435456 | Ll[A] << 18 | Bl[D];
						var G = 31 & Ll[A], K = 31 & Bl[D];
						k += Ml[G] + Al[K], ++S[257 + G], ++x[K], P = h + A, ++E;
					} else w[T++] = t[h], ++S[t[h]];
				}
			}
			u = na(t, a, r, w, S, x, k, T, C, h - C, u), r || (u = sa(a, u, oa));
		}
		return Yl(l, 0, s + Jl(u) + n);
	}(r = t, null == (o = i).level ? 6 : o.level, null == o.mem ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(r.length)))) : 12 + o.mem, l, a, !u)), d = h.length;
	return function(t, i) {
		var e = i.filename;
		if (t[0] = 31, t[1] = 139, t[2] = 8, t[8] = 2 > i.level ? 4 : 9 == i.level ? 2 : 0, t[9] = 3, 0 != i.mtime && aa(t, 4, Math.floor(new Date(i.mtime || Date.now()) / 1e3)), e) {
			t[3] = 8;
			for (var s = 0; e.length >= s; ++s) t[s + 10] = e.charCodeAt(s);
		}
	}(h, i), aa(h, d - 8, e.d()), aa(h, d - 4, s), h;
}
var ha = !!o || !!r;
var da = /* @__PURE__ */ new WeakMap();
var ca = "text/plain";
var va = 0;
var fa = !1;
var pa = (t, i) => {
	const [e, s] = t.split("#"), [n, r] = e.split("?");
	if (!r) return t;
	const o = r.split("&").filter((t) => t.split("=")[0] !== i).join("&");
	return `${n}${o ? `?${o}` : ""}${s ? `#${s}` : ""}`;
};
var _a = (t, i, e = !0) => {
	var s;
	const [n, r] = t.split("?"), o = Ei({}, i), l = null !== (s = null == r ? void 0 : r.split("&").map((t) => {
		var i;
		const [s, n] = t.split("="), r = e && null !== (i = o[s]) && void 0 !== i ? i : n;
		return delete o[s], `${s}=${r}`;
	})) && void 0 !== s ? s : [], a = function(t, i = "&") {
		let e, s;
		const n = [];
		return qn(t, function(t, i) {
			R(t) || R(i) || "undefined" === i || (e = encodeURIComponent(((t) => t instanceof File)(t) ? t.name : t.toString()), s = encodeURIComponent(i), n[n.length] = s + "=" + e);
		}), n.join(i);
	}(o);
	return a && l.push(a), l.length > 0 ? `${n}?${l.join("&")}` : n;
};
var ga = (t) => {
	if (t.ta) return t.ta;
	const { data: i, compression: e } = t;
	if (!i) return;
	if (e === hl.GZipJS) {
		const t = ua(function(t) {
			var i = t.length;
			if ("undefined" != typeof TextEncoder) return new TextEncoder().encode(t);
			for (var e = new Rl(t.length + (t.length >>> 1)), s = 0, n = function(t) {
				e[s++] = t;
			}, r = 0; i > r; ++r) {
				if (s + 5 > e.length) {
					var o = new Rl(s + 8 + (i - r << 1));
					o.set(e), e = o;
				}
				var l = t.charCodeAt(r);
				128 > l ? n(l) : 2048 > l ? (n(192 | l >>> 6), n(128 | 63 & l)) : l > 55295 && 57344 > l ? (n(240 | (l = 65536 + (1047552 & l) | 1023 & t.charCodeAt(++r)) >>> 18), n(128 | l >>> 12 & 63), n(128 | l >>> 6 & 63), n(128 | 63 & l)) : (n(224 | l >>> 12), n(128 | l >>> 6 & 63), n(128 | 63 & l));
			}
			return Yl(e, 0, s);
		}(Co(i)), { mtime: 0 });
		return {
			contentType: ca,
			body: t.buffer.slice(t.byteOffset, t.byteOffset + t.byteLength),
			estimatedSize: t.byteLength
		};
	}
	if (e === hl.Base64) {
		const e = ((t) => "data=" + encodeURIComponent("string" == typeof t ? t : Co(t)))(function(t) {
			return t ? btoa(encodeURIComponent(t).replace(/%([0-9A-F]{2})/g, (t, i) => String.fromCharCode(parseInt(i, 16)))) : t;
		}(Co(i)));
		return {
			contentType: "application/x-www-form-urlencoded",
			body: e,
			estimatedSize: new Blob([e]).size
		};
	}
	const s = Co(i);
	return {
		contentType: "application/json",
		body: s,
		estimatedSize: new Blob([s]).size
	};
};
var ma = (t) => {
	const i = () => "sendBeacon" === t.transport ? {
		url: _a(t.url, { compression: hl.Base64 }),
		encodedBody: ga(Ei(Ei({}, t), {}, {
			compression: hl.Base64,
			ta: void 0
		}))
	} : {
		url: pa(t.url, "compression"),
		encodedBody: ga(Ei(Ei({}, t), {}, {
			compression: void 0,
			ta: void 0
		}))
	};
	let e;
	try {
		e = ga(t);
	} catch (e) {
		if (ge(t.compression, Ro(t.url, "compression"))) return Je.error("Failed to gzip request body, sending uncompressed payload", e), i();
		throw e;
	}
	return e && ge(t.compression, Ro(t.url, "compression")) && !((s = e.body) instanceof ArrayBuffer ? _e(new Uint8Array(s)) : ArrayBuffer.isView(s) && _e(new Uint8Array(s.buffer, s.byteOffset, s.byteLength))) ? (fa = !0, i()) : {
		url: t.url,
		encodedBody: e
	};
	var s;
};
var ba = (t) => {
	try {
		return ma(t);
	} catch (e) {
		var i;
		Je.error(e), null === (i = t.callback) || void 0 === i || i.call(t, {
			statusCode: 0,
			error: e
		});
		return;
	}
};
var ya = function() {
	var t = Y(function* (t) {
		const i = yield function(t) {
			return Se.apply(this, arguments);
		}(Co(t.data), es.DEBUG, { rethrow: !0 });
		if (!i) return t;
		const e = yield i.arrayBuffer();
		return Ei(Ei({}, t), {}, { ta: {
			contentType: ca,
			body: e,
			estimatedSize: e.byteLength
		} });
	});
	return function(i) {
		return t.apply(this, arguments);
	};
}();
var wa = /Failed to fetch|NetworkError|Load failed/i;
var $a = (t) => "TypeError" === (null == t ? void 0 : t.name) && wa.test((null == t ? void 0 : t.message) || "");
var Sa = (t) => {
	try {
		const i = function(t, i = Date.now()) {
			if ("string" != typeof t || !t) return;
			const e = t.trim(), s = /^\d+\s*,/.test(e) ? e.slice(0, e.indexOf(",")).trim() : e;
			if (/^\d+$/.test(s)) {
				const t = 1e3 * Math.min(Number(s), 300);
				return t > 0 ? t : void 0;
			}
			if (!/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)[a-z]*[ ,]/.test(s)) return;
			const n = /^\w{3} \w{3} /.test(s) ? s + " GMT" : s, r = Date.parse(n) - i;
			return Number.isFinite(r) && r > 0 ? Math.min(r, ai) : void 0;
		}(t());
		return R(i) ? void 0 : Math.min(i, 3e4);
	} catch (t) {
		return;
	}
};
var xa = (t) => {
	const i = ba(t);
	if (!i) return;
	const e = new o();
	da.set(e, !0);
	const { url: s, encodedBody: n } = i;
	e.open(t.method || "GET", s, !0);
	const { contentType: r, body: l } = null != n ? n : {};
	qn(t.headers, function(t, i) {
		e.setRequestHeader(i, t);
	}), r && e.setRequestHeader("Content-Type", r), t.timeout && (e.timeout = t.timeout), e.onreadystatechange = () => {
		if (4 === e.readyState) {
			var i;
			const s = {
				statusCode: e.status,
				text: e.responseText
			};
			if (200 === e.status) try {
				s.json = JSON.parse(e.responseText);
			} catch (t) {}
			null === (i = t.callback) || void 0 === i || i.call(t, s, Sa(() => e.getResponseHeader("Retry-After")));
		}
	}, e.send(l);
};
var Ea = (t) => {
	const i = ba(t);
	if (!i) return;
	const { url: e, encodedBody: s } = i, { contentType: n, body: o, estimatedSize: a } = null != s ? s : {}, u = new Headers();
	qn(t.headers, function(t, i) {
		u.append(i, t);
	}), n && u.append("Content-Type", n);
	let h = null, d = !1;
	if (l) {
		const i = new l();
		h = {
			signal: i.signal,
			timeout: setTimeout(() => {
				d = !0;
				try {
					i.abort(ci("AbortError", "PostHog request timed out" + ((e = t.timeout) ? ` after ${e}ms` : "")));
				} catch (t) {
					v(t);
				}
				var e;
			}, t.timeout)
		};
	}
	let c = !1;
	const v = (i) => {
		var e;
		c || (c = !0, d && "AbortError" === (null == i ? void 0 : i.name) || $a(i) ? Je.warn(i) : Je.error(i), null === (e = t.callback) || void 0 === e || e.call(t, {
			statusCode: 0,
			error: i
		}));
	};
	let f = 0;
	const p = () => {
		va -= f, f = 0, h && clearTimeout(h.timeout);
	};
	try {
		const i = Ei({
			method: (null == t ? void 0 : t.method) || "GET",
			headers: u,
			referrerPolicy: "strict-origin",
			body: o,
			signal: null == h ? void 0 : h.signal
		}, t.fetchOptions), s = null != a ? a : R(o) ? 0 : void 0;
		i.keepalive = "POST" === i.method && !t.ea && !1 !== i.keepalive && i.body === o && !R(s) && s >= 0 && 52428.8 > va + s, i.keepalive && (f = s, va += f), r(e, i).then((i) => i.text().then((e) => {
			var s;
			if (c) return;
			const n = {
				statusCode: i.status,
				text: e
			};
			if (200 === i.status) try {
				n.json = JSON.parse(e);
			} catch (t) {
				Je.error(t);
			}
			c = !0, p(), null === (s = t.callback) || void 0 === s || s.call(t, n, Sa(() => i.headers.get("Retry-After")));
		})).catch((t) => {
			p(), v(t);
		}).finally(p);
	} catch (t) {
		p(), v(t);
	}
};
var ka = (t) => {
	try {
		var i;
		const { url: s, encodedBody: n } = ma(t), { contentType: o, body: l, estimatedSize: a } = null != n ? n : {};
		if (!l) return;
		const u = l instanceof Blob ? l : new Blob([l], { type: o });
		if (e.sendBeacon(s, u)) return;
		const h = T(t.data) ? t.data : null === (i = t.data) || void 0 === i ? void 0 : i.batch;
		if (T(h) && h.length > 1 && (null != a ? a : 0) > 16384) {
			const i = Math.ceil(h.length / 2), e = (i) => T(t.data) ? i : Ei(Ei({}, t.data), {}, { batch: i });
			ka(Ei(Ei({}, t), {}, { data: e(h.slice(0, i)) })), ka(Ei(Ei({}, t), {}, { data: e(h.slice(i)) }));
			return;
		}
		Je.warn(`Beacon of ~${null != a ? a : 0} bytes was rejected by the browser, falling back to ${r ? "fetch" : "XHR"}`), r ? Ea(Ei(Ei({}, t), {}, { ea: !0 })) : xa(t);
	} catch (t) {
		Je.warn("Beacon send failed", t);
	}
};
var Ta = (t, i, e, s) => {
	const n = "query" === s ? "POST" === i ? "sent_at" : "_" : void 0;
	return _a(e === hl.GZipJS ? pa(t, "compression") : t, Ei(Ei({}, n ? { [n]: Date.now().toString() } : {}), e === hl.GZipJS ? {} : { compression: e }));
};
var Pa = (() => {
	const t = [];
	return r && t.push({
		transport: "fetch",
		method: Ea
	}), o && t.push({
		transport: "XHR",
		method: xa
	}), null != e && e.sendBeacon && t.push({
		transport: "sendBeacon",
		method: ka
	}), t;
})();
var Ca = !ha && -1 === (null == u ? void 0 : u.indexOf("MSIE")) && -1 === (null == u ? void 0 : u.indexOf("Mozilla"));
function Oa(t, i, e) {
	var s, n, r;
	e && (i = Ei(Ei({}, i), {}, { callback: (t) => e(t) })), t.__loaded ? Ca ? t.__request_queue.push(i) : t.rateLimiter.isServerRateLimited(i.batchKey) ? i.fireCallbackOnDrop && (null === (n = i.callback) || void 0 === n || n.call(i, { statusCode: 429 })) : (i.transport = i.transport || t.config.api_transport, i.headers = Ei(Ei({}, t.config.request_headers), i.headers), i.compression = "best-available" === i.compression ? null !== (s = t.compression) && void 0 !== s ? s : i.compressionFallback : i.compression, (R(t.config.disable_beacon) ? t.config.__preview_disable_beacon : t.config.disable_beacon) && (i.disableTransport = ["sendBeacon"]), i.fetchOptions = i.fetchOptions || t.config.fetch_options, ((t, i) => {
		var e, s, n;
		const r = Ei(Ei({}, t), {}, { callback: null != i ? i : (i) => {
			var e;
			return null === (e = t.callback) || void 0 === e ? void 0 : e.call(t, i);
		} });
		r.timeout = r.timeout || 6e4;
		const o = null !== (e = r.transport) && void 0 !== e ? e : "fetch";
		"sendBeacon" === o && R(r.compression) && r.data && (r.compression = hl.Base64), "POST" === r.method && r.data && ("capture-body" === r.timestampMode ? r.data = ((t) => {
			var i, e;
			const s = (T(t) ? t : [t]).map((t) => Ei(Ei({}, t), t.timestamp instanceof Date && !isNaN(t.timestamp.getTime()) ? { timestamp: t.timestamp.toISOString() } : {})), n = s[0];
			return {
				api_key: null !== (i = null == n || null === (e = n.properties) || void 0 === e ? void 0 : e.token) && void 0 !== i ? i : null == n ? void 0 : n.token,
				batch: s,
				sent_at: (/* @__PURE__ */ new Date()).toISOString()
			};
		})(r.data) : "body" === r.timestampMode && (r.data = ((t, i = (/* @__PURE__ */ new Date()).toISOString()) => T(t) ? t.map((t) => Ei(Ei({}, t), {}, { sent_at: i })) : Ei(Ei({}, t), {}, { sent_at: i }))(r.data))), r.url = Ta(r.url, r.method, r.compression, r.timestampMode);
		const l = Pa.filter((t) => !r.disableTransport || !t.transport || !r.disableTransport.includes(t.transport)), u = null !== (s = null === (n = function(t, i) {
			for (let e = 0; t.length > e; e++) if (i(t[e])) return t[e];
		}(l, (t) => t.transport === o)) || void 0 === n ? void 0 : n.method) && void 0 !== s ? s : l[0].method;
		if (!u) throw new Error("No available transport method");
		const h = (t) => {
			try {
				u(t);
			} catch (t) {
				var i;
				$a(t) ? Je.warn(t) : Je.error(t), null === (i = r.callback) || void 0 === i || i.call(r, {
					statusCode: 0,
					error: t
				});
			}
		};
		"sendBeacon" !== o && r.data && r.compression === hl.GZipJS && a && "undefined" != typeof Promise && !fa ? ya(r).then((t) => {
			h(t);
		}).catch((i) => {
			if (me(i)) return fa = !0, void h(Ei(Ei({}, r), {}, {
				compression: void 0,
				url: Ta(t.url, t.method, void 0, t.timestampMode)
			}));
			((t) => {
				if (!t || "object" != typeof t) return !1;
				const i = "name" in t ? String(t.name) : "";
				return me(t) || i === pe;
			})(i) && (fa = !0), h(r);
		}) : u(r);
	})(i, (s, n) => {
		var r, o, l;
		t.rateLimiter.checkForLimiting(s), 400 > s.statusCode || null === (r = (o = t.config).on_request_error) || void 0 === r || r.call(o, s), e ? e(s, n) : null === (l = i.callback) || void 0 === l || l.call(i, s);
	})) : i.fireCallbackOnDrop && (null === (r = i.callback) || void 0 === r || r.call(i, { statusCode: 0 }));
}
var Ra = class {
	constructor(t, i) {
		this.ia = !0, this.na = [], this.sa = Z((null == i ? void 0 : i.flush_interval_ms) || 3e3, 250, 5e3, Je.createLogger("flush interval"), 3e3), this.ra = t;
	}
	enqueue(t) {
		this.na.push(t), this.oa || this.la();
	}
	unload() {
		this.aa();
		const t = this.na.length > 0 ? this.ua() : {}, i = Object.values(t);
		[...i.filter((t) => 0 === t.url.indexOf("/e")), ...i.filter((t) => 0 !== t.url.indexOf("/e"))].map((t) => {
			this.ha(t, "sendBeacon");
		});
	}
	enable() {
		this.ia = !1, this.la();
	}
	la() {
		this.ia || (this.oa = setTimeout(() => {
			if (this.aa(), this.na.length > 0) {
				const t = this.ua();
				for (const i in t) this.ha(t[i]);
			}
		}, this.sa));
	}
	ha(t, i) {
		try {
			this.ra(t, i);
		} catch (t) {
			Je.error(t);
		}
	}
	aa() {
		clearTimeout(this.oa), this.oa = void 0;
	}
	ua() {
		const t = {};
		return qn(this.na, (i) => {
			var e;
			const s = i, n = ((s ? s.batchKey : null) || s.url) + (s.batchGroup ? `:${s.batchGroup}` : "");
			R(t[n]) && (t[n] = Ei(Ei({}, s), {}, { data: [] })), null === (e = t[n].data) || void 0 === e || e.push(s.data);
		}), this.na = [], t;
	}
};
var Ia = ["retriesPerformedSoFar"];
var Fa = class {
	constructor(t) {
		this._instance = t, this.ca = !1, this.da = 3e3, this.na = [], this.na = [], this.va = !0, this.resume();
	}
	resume() {
		if (!R(t) && "onLine" in t.navigator) {
			if (this.va = t.navigator.onLine, this.fa) return;
			this.fa = () => {
				this.va = !0, this.pa();
			}, this.ga = () => {
				this.va = !1;
			}, Qn(t, "online", this.fa), Qn(t, "offline", this.ga);
		}
	}
	get length() {
		return this.na.length;
	}
	retriableRequest(t, i) {
		let { retriesPerformedSoFar: e } = t, s = xe(t, Ia);
		N(e) && (s.url = _a(s.url, { retry_count: e })), Oa(this._instance, i ? Ei(Ei({}, s), {}, { transport: i }) : s, (t, i) => {
			var n;
			if (200 !== t.statusCode && (400 > t.statusCode || t.statusCode >= 500)) {
				if ((0 === t.statusCode ? 3 : 10) > (null != e ? e : 0)) return void this.Ls(Ei({ retriesPerformedSoFar: e }, s), i);
				0 === t.statusCode && Je.warn(`Request failed before receiving an HTTP response; this can happen due to network issues, CORS, browser blocking, or ad blockers. Stopped retrying after ${null != e ? e : 0} retries.`);
			}
			null === (n = s.callback) || void 0 === n || n.call(s, t);
		});
	}
	Ls(t, i) {
		const e = t.retriesPerformedSoFar || 0;
		t.retriesPerformedSoFar = e + 1;
		const s = Math.max(function(t) {
			const i = 3e3 * Math.pow(2, t), e = i / 2, s = Math.min(18e5, i), n = (Math.random() - .5) * (s - e);
			return Math.ceil(s + n);
		}(e), null != i ? i : 0), n = Date.now() + s;
		this.na.push({
			retryAt: n,
			requestOptions: t
		});
		let r = `Enqueued failed request for retry in ${s}`;
		navigator.onLine || (r += " (Browser is offline)"), Je.warn(r), this.ca || (this.ca = !0, this.ma());
	}
	ma() {
		if (this.ya && clearTimeout(this.ya), 0 === this.na.length) return this.ca = !1, void (this.ya = void 0);
		this.ya = setTimeout(() => {
			this.va && this.na.length > 0 && this.pa(), this.ma();
		}, this.da);
	}
	pa() {
		const t = Date.now(), i = [], e = this.na.filter((e) => t > e.retryAt || (i.push(e), !1));
		if (this.na = i, e.length > 0) for (const { requestOptions: t } of e) this.retriableRequest(t);
	}
	unload() {
		this.ya && (clearTimeout(this.ya), this.ya = void 0), this.ca = !1, R(t) || (this.fa && (t.removeEventListener("online", this.fa), this.fa = void 0), this.ga && (t.removeEventListener("offline", this.ga), this.ga = void 0));
		for (const { requestOptions: t } of this.na) try {
			this._instance._send_request(Ei(Ei({}, t), {}, { transport: "sendBeacon" }));
		} catch (t) {
			Je.error(t);
		}
		this.na = [];
	}
};
var Ma = class {
	constructor(t) {
		this._instance = t, this.ba = () => {
			var t, i, e, s;
			this._a || (this._a = {});
			const n = this.scrollElement(), r = this.scrollY(), o = n ? Math.max(0, n.scrollHeight - n.clientHeight) : 0, l = r + ((null == n ? void 0 : n.clientHeight) || 0), a = (null == n ? void 0 : n.scrollHeight) || 0;
			this._a.lastScrollY = Math.ceil(r), this._a.maxScrollY = Math.max(r, null !== (t = this._a.maxScrollY) && void 0 !== t ? t : 0), this._a.maxScrollHeight = Math.max(o, null !== (i = this._a.maxScrollHeight) && void 0 !== i ? i : 0), this._a.lastContentY = l, this._a.maxContentY = Math.max(l, null !== (e = this._a.maxContentY) && void 0 !== e ? e : 0), this._a.maxContentHeight = Math.max(a, null !== (s = this._a.maxContentHeight) && void 0 !== s ? s : 0);
		};
	}
	get wa() {
		return this._instance.config.scroll_root_selector;
	}
	getContext() {
		return this._a;
	}
	resetContext() {
		const t = this._a;
		return this._a = void 0, setTimeout(this.ba, 0), t;
	}
	startMeasuringScrollPosition() {
		Qn(t, "scroll", this.ba, { capture: !0 }), Qn(t, "scrollend", this.ba, { capture: !0 }), Qn(t, "resize", this.ba);
	}
	scrollElement() {
		if (this.wa) {
			const e = T(this.wa) ? this.wa : [this.wa];
			for (const s of e) {
				var i;
				const e = null == t || null === (i = t.document) || void 0 === i ? void 0 : i.querySelector(s);
				if (e) return e;
			}
			return;
		}
		var e;
		return null == t || null === (e = t.document) || void 0 === e ? void 0 : e.documentElement;
	}
	ka(i) {
		var e, s;
		const n = "y" === i ? "scrollTop" : "scrollLeft";
		if (this.wa) {
			const t = this.scrollElement();
			return t && t[n] || 0;
		}
		return t ? "y" === i ? t.scrollY || t.pageYOffset || (null === (e = t.document) || void 0 === e || null === (e = e.documentElement) || void 0 === e ? void 0 : e.scrollTop) || 0 : t.scrollX || t.pageXOffset || (null === (s = t.document) || void 0 === s || null === (s = s.documentElement) || void 0 === s ? void 0 : s.scrollLeft) || 0 : 0;
	}
	scrollY() {
		return this.ka("y");
	}
	scrollX() {
		return this.ka("x");
	}
};
var Aa = (t) => Go(null == t ? void 0 : t.config.mask_personal_data_properties, null == t ? void 0 : t.config.custom_personal_data_properties, null == t ? void 0 : t.config.disable_capture_url_hashes);
var Da = class {
	constructor(t, i, e, s) {
		this.Be = (t) => {
			const i = this.Sa();
			if (i && i.sessionId === t) return;
			const e = {
				sessionId: t,
				props: this.xa(this._instance)
			};
			this.Ca.register({ [fn]: e });
		}, this._instance = t, this.$a = i, this.Ca = e, this.xa = s || Aa, this.$a.onSessionId(this.Be);
	}
	Sa() {
		return this.Ca.props[fn];
	}
	getSetOnceProps() {
		var t;
		const i = null === (t = this.Sa()) || void 0 === t ? void 0 : t.props;
		return i ? "r" in i ? Ko(i, this._instance.config.disable_capture_url_hashes) : {
			$referring_domain: i.referringDomain,
			$pathname: i.initialPathName,
			utm_source: i.utm_source,
			utm_campaign: i.utm_campaign,
			utm_medium: i.utm_medium,
			utm_content: i.utm_content,
			utm_term: i.utm_term
		} : {};
	}
	getSessionProps() {
		const t = {};
		return qn(Kn(this.getSetOnceProps()), (i, e) => {
			"$current_url" === e && (e = "url"), t[`$session_entry_${w(e)}`] = i;
		}), t;
	}
};
var Na = class {
	on(t, i) {
		return this.Ia[t] || (this.Ia[t] = []), this.Ia[t].push(i), () => {
			this.Ia[t] = this.Ia[t].filter((t) => t !== i);
		};
	}
	emit(t, i) {
		for (const e of this.Ia[t] || []) e(i);
		for (const e of this.Ia["*"] || []) e(t, i);
	}
	constructor() {
		this.Ia = {};
	}
};
var ja = Ye("[SessionId]");
var La = 864e5;
var Ba = class {
	on(t, i) {
		return this.Ta.on(t, i);
	}
	constructor(t, i, e) {
		var s;
		if (this.Ma = null, this.Ea = null, this.Pa = [], this.Ra = void 0, this.Aa = !1, this.Ta = new Na(), this.Fa = (t, i) => !(!N(t) || !N(i)) && Math.abs(t - i) > this.sessionTimeoutMs, !t.persistence) throw new Error("SessionIdManager requires a PostHogPersistence instance");
		if ("always" === t.config.cookieless_mode) throw new Error("SessionIdManager cannot be used with cookieless_mode=\"always\"");
		this.Ir = t.config, this.Ca = t.persistence, this.He = void 0, this.Xt = void 0, this._sessionStartTimestamp = null, this.Oa = void 0, this._sessionActivityTimestamp = null, this.Da = i || or, this.La = e || or;
		const n = this.Ir.persistence_name || this.Ir.token;
		if (this._sessionTimeoutMs = 1e3 * Z(this.Ir.session_idle_timeout_seconds || 1800, 60, 36e3, ja.createLogger("session_idle_timeout_seconds"), 1800), t.register({ $configured_session_timeout_ms: this._sessionTimeoutMs }), this.Na(), this.qa = "ph_" + n + "_window_id", this.ja = "ph_" + n + "_primary_window_exists", this.Ba()) {
			const t = Tr.Dt(this.qa), i = Tr.Dt(this.ja);
			t && !i ? this.He = t : Tr.Lt(this.qa), Tr.At(this.ja, !0);
		}
		null !== (s = this.Ir.bootstrap) && void 0 !== s && s.sessionID && this.setBootstrapSessionId(this.Ir.bootstrap.sessionID), this.Ha();
	}
	get sessionTimeoutMs() {
		return this._sessionTimeoutMs;
	}
	onSessionId(t) {
		return R(this.Pa) && (this.Pa = []), this.Pa.push(t), this.Xt && t(this.Xt, this.He), () => {
			this.Pa = this.Pa.filter((i) => i !== t);
		};
	}
	Ba() {
		return "memory" !== this.Ir.persistence && !this.Ca.mi && Tr.Et();
	}
	za(t) {
		t !== this.He && (this.He = t, this.Ba() && Tr.At(this.qa, t));
	}
	Ua() {
		return this.He ? this.He : this.Ba() ? Tr.Dt(this.qa) : null;
	}
	Wa(t) {
		const i = this.Ma;
		return !M(i) && !M(t) && 5e3 > Math.abs(t - i);
	}
	Va(t, i, e) {
		const s = i !== this._sessionActivityTimestamp, n = !(t !== this.Xt || e !== this._sessionStartTimestamp);
		this._sessionStartTimestamp = e, this._sessionActivityTimestamp = i, this.Xt = t, n && !s || n && this.Wa(i) || (this.Ma = i, this.Ca.register({ [Rs]: [
			i,
			t,
			e
		] }));
	}
	Ga() {
		var t;
		const i = null === (t = this.Ir) || void 0 === t ? void 0 : t.persistence_save_debounce_ms;
		return N(i) && i > 0;
	}
	Za() {
		this.Ga() ? this.Ca.refreshKey(Rs) : (this.Ca.flush(), this.Ca.load());
	}
	Qa() {
		var t;
		if (M(this._sessionActivityTimestamp) || this._sessionActivityTimestamp === this.Ma) return;
		this.Za();
		const [, i, e] = this.Ja();
		i === this.Xt && e === this._sessionStartTimestamp && (this.Ma = this._sessionActivityTimestamp, this.Ca.register({ [Rs]: [
			this._sessionActivityTimestamp,
			null !== (t = this.Xt) && void 0 !== t ? t : null,
			this._sessionStartTimestamp
		] }), this.Ca.flush());
	}
	Ka() {
		const [t] = this.Ja(), i = N(t) ? t : 0, e = N(this._sessionActivityTimestamp) ? this._sessionActivityTimestamp : 0;
		return Math.max(i, e);
	}
	Xa(t) {
		return this.Za(), this.Fa(t, this.Ka());
	}
	Ja() {
		const t = this.Ca.props[Rs];
		return T(t) && 2 === t.length && t.push(t[0]), t || [
			0,
			null,
			0
		];
	}
	resetSessionId() {
		this.Ma = null, this.Oa = void 0, clearTimeout(this.Ya), this.Ya = void 0, this.Va(null, null, null);
	}
	setBootstrapSessionId(t, i = !1) {
		const e = ((t, i = (/* @__PURE__ */ new Date()).getTime()) => {
			try {
				const e = ((t) => {
					const i = t.replace(/-/g, "");
					if (32 !== i.length) throw new Error("Not a valid UUID");
					if ("7" !== i[12]) throw new Error("Not a UUIDv7");
					return parseInt(i.substring(0, 12), 16);
				})(t);
				return e > i + 6e4 ? void ja.error("Bootstrap sessionID cannot be in the future") : e;
			} catch (t) {
				ja.error("Invalid sessionID in bootstrap", t);
				return;
			}
		})(t);
		return !R(e) && (i ? this.Oa = {
			sessionId: t,
			sessionStartTimestamp: e
		} : this.Va(t, (/* @__PURE__ */ new Date()).getTime(), e), !0);
	}
	destroy() {
		this.Aa = !0, this.Qa(), clearTimeout(this.Ya), this.Ya = void 0, this.Ra && t && (t.removeEventListener(jn, this.Ra, { capture: !1 }), this.Ra = void 0), this.Pa = [];
	}
	Ha() {
		this.Ra = () => {
			this.Qa(), this.Ba() && Tr.Lt(this.ja);
		}, Qn(t, jn, this.Ra, { capture: !1 });
	}
	checkAndGetSessionAndWindowId(t = !1, i = null, e = !1) {
		if ("always" === this.Ir.cookieless_mode) throw new Error("checkAndGetSessionAndWindowId should not be called with cookieless_mode=\"always\"");
		const s = i || (/* @__PURE__ */ new Date()).getTime(), n = this.Xt;
		if (e) this.Ea = s;
		else if (M(this.Ea) || this.Ea > s || s - this.Ea >= 1e3) {
			var r, o;
			null === (r = (o = this.Ca).syncCookieProperties) || void 0 === r || r.call(o), this.Ea = s;
		}
		let [, l, a] = this.Ja();
		const u = !R(n) && l !== n, h = this.Ka();
		let d = this.Ua();
		const c = this.Oa, v = !!c && (c.sessionStartTimestamp > s + 6e4 || s - c.sessionStartTimestamp > La), f = c ? v : N(a) && Math.abs(s - a) > La;
		let p = !1, _ = u;
		const g = !l || !!c, m = l;
		let b = !g && !t && this.Fa(s, h);
		if (b && (b = this.Xa(s), b || ja.info("cross-tab refresh kept the session alive", { sessionId: l }), [, l, a] = this.Ja()), g || b || f) {
			_ = !1;
			const t = c && !v;
			l = t ? c.sessionId : this.Da(), d = this.La(), ja.info("new session ID assigned", {
				sessionId: l,
				windowId: d,
				bootstrapped: !!t,
				changeReason: {
					noSessionId: g,
					activityTimeout: b,
					sessionPastMaximumLength: f
				}
			}), a = t ? c.sessionStartTimestamp : s, this.Oa = void 0, p = !0;
		} else d || (d = this.La(), p = !0), _ = _ || l !== m, _ && (ja.info("adopted cross-tab session id", {
			sessionId: l,
			windowId: d
		}), p = !0);
		const y = N(h) && t && !f ? h : s, w = N(a) ? a : (/* @__PURE__ */ new Date()).getTime();
		this.za(d), this.Va(l, y, w), t || this.Na();
		const S = {
			noSessionId: g,
			activityTimeout: b,
			sessionPastMaximumLength: f,
			crossTabAdoption: _
		};
		return p && this.Pa.forEach((t) => t(l, d, S)), {
			sessionId: l,
			windowId: d,
			sessionStartTimestamp: w,
			changeReason: p ? S : void 0,
			lastActivityTimestamp: h
		};
	}
	Na() {
		this.Aa || (clearTimeout(this.Ya), this.Ya = setTimeout(() => {
			if (!this.Aa) if (this.Xa((/* @__PURE__ */ new Date()).getTime())) {
				const t = this.Xt;
				this.resetSessionId(), this.Ta.emit("forcedIdleReset", { idleSessionId: t });
			} else this.Na();
		}, 1.1 * this.sessionTimeoutMs));
	}
};
var Ua = function(t, i) {
	if (!t) return !1;
	const e = t.userAgent;
	if (e && Q(e, i)) return !0;
	try {
		const e = null == t ? void 0 : t.userAgentData;
		if ((null == e ? void 0 : e.brands) && e.brands.some((t) => Q(null == t ? void 0 : t.brand, i))) return !0;
	} catch (t) {}
	return !!t.webdriver;
};
function za() {
	return (za = Y(function* () {
		const t = null == e ? void 0 : e.userAgentData;
		if (null == t ? void 0 : t.getHighEntropyValues) try {
			const i = yield t.getHighEntropyValues(["model"]), e = null == i ? void 0 : i.model;
			return I(e) && e.length > 0 ? e : void 0;
		} catch (t) {
			Je.info("Unable to resolve $device_model from userAgentData.getHighEntropyValues", t);
			return;
		}
	})).apply(this, arguments);
}
function Ha(t, i) {
	let e = `$survey_${i}/${t.id}`;
	return t.current_iteration && t.current_iteration > 0 && (e = `$survey_${i}/${t.id}/${t.current_iteration}`), e;
}
function qa(t) {
	var i;
	return !!(null === (i = t.conditions) || void 0 === i || null === (i = i.events) || void 0 === i || null === (i = i.values) || void 0 === i ? void 0 : i.length);
}
var Va = (t, i) => {
	if (!((t) => {
		try {
			new RegExp(t);
		} catch (t) {
			return !1;
		}
		return !0;
	})(i)) return !1;
	try {
		return new RegExp(i).test(t);
	} catch (t) {
		return !1;
	}
};
var Wa = (t) => t.toLowerCase();
var Ga = {
	exact: (t, i) => i.some((i) => t.some((t) => i === t)),
	is_not: (t, i) => i.every((i) => t.every((t) => i !== t)),
	regex: (t, i) => i.some((i) => t.some((t) => Va(i, t))),
	not_regex: (t, i) => i.every((i) => t.every((t) => !Va(i, t))),
	icontains: (t, i) => i.map(Wa).some((i) => t.map(Wa).some((t) => i.includes(t))),
	not_icontains: (t, i) => i.map(Wa).every((i) => t.map(Wa).every((t) => !i.includes(t))),
	gt: (t, i) => i.some((i) => {
		const e = parseFloat(i);
		return !isNaN(e) && t.some((t) => e > parseFloat(t));
	}),
	lt: (t, i) => i.some((i) => {
		const e = parseFloat(i);
		return !isNaN(e) && t.some((t) => e < parseFloat(t));
	})
};
function Ka(t, i) {
	return !t || Object.entries(t).every(([t, e]) => {
		const s = null == i ? void 0 : i[t];
		if (null == s) return !1;
		const n = Ga[e.operator];
		return !!n && n(e.values, [String(s)]);
	});
}
function Ja(t, i, e) {
	return Co({
		distinct_id: t,
		userPropertiesToSet: i,
		userPropertiesToSetOnce: e
	});
}
var Ya = "custom";
var Xa = "i.posthog.com";
var Qa = /^\/static\//;
var Za = [
	"/s/",
	"/e/",
	"/i/"
];
var tu = class {
	constructor(t) {
		this.tu = {}, this.instance = t;
	}
	get apiHost() {
		const t = this.instance.config.api_host.trim().replace(/\/$/, "");
		return "https://app.posthog.com" === t ? "https://us.i.posthog.com" : t;
	}
	get flagsApiHost() {
		const t = this.instance.config.flags_api_host;
		return t ? t.trim().replace(/\/$/, "") : this.apiHost;
	}
	get uiHost() {
		var t;
		let i = null === (t = this.instance.config.ui_host) || void 0 === t ? void 0 : t.replace(/\/$/, "");
		return i || (i = this.apiHost.replace(`.${Xa}`, ".posthog.com")), "https://app.posthog.com" === i ? "https://us.posthog.com" : i;
	}
	get region() {
		return this.tu[this.apiHost] || (this.tu[this.apiHost] = /https:\/\/(app|us|us-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? "us" : /https:\/\/(eu|eu-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? "eu" : Ya), this.tu[this.apiHost];
	}
	eu(t) {
		if (!Qa.test(t)) return;
		const i = this.instance.config.asset_host;
		return "string" == typeof i && i.trim().replace(/\/$/, "") || void 0;
	}
	iu(t) {
		const i = Oo(t);
		return i ? i.protocol + "//" + i.host + i.pathname : void 0;
	}
	nu(t, i, e) {
		if ("ui" === t) return e;
		let s = e;
		const n = this.instance.config.rewriteRequestPath;
		if (n) {
			var r;
			const t = (null === (r = Oo(e)) || void 0 === r ? void 0 : r.href) || e;
			s = n(new URL(t)).toString();
		}
		if (n && "api" === t && Za.some((t) => 0 === i.indexOf(t))) {
			const t = this.iu(s);
			if (t) {
				const i = this.apiHost;
				let e = this.su;
				(null == e ? void 0 : e.apiHost) === i && e.rewriteRequestPath === n || (e = {
					apiHost: i,
					rewriteRequestPath: n,
					urls: /* @__PURE__ */ new Set()
				}, this.su = e), e.urls.add(t);
			}
		}
		return s;
	}
	isIngestionEndpoint(t) {
		const i = this.su, e = this.iu(t);
		return (null == i ? void 0 : i.apiHost) === this.apiHost && i.rewriteRequestPath === this.instance.config.rewriteRequestPath && !!e && i.urls.has(e);
	}
	endpointFor(t, i = "") {
		if (i && (i = "/" === i[0] ? i : `/${i}`), "ui" === t) return this.nu(t, i, this.uiHost + i);
		if ("flags" === t) return this.nu(t, i, this.flagsApiHost + i);
		if ("assets" === t) {
			const e = this.eu(i);
			if (e) return this.nu(t, i, `${e}${i}`);
		}
		if (this.region === Ya) return this.nu(t, i, this.apiHost + i);
		const e = Xa + i;
		switch (t) {
			case "assets": return this.nu(t, i, `https://${this.region}-assets.${e}`);
			case "api": return this.nu(t, i, `https://${this.region}.${e}`);
		}
	}
};
var iu = Ye("[Surveys]");
var eu = (t) => {
	try {
		const i = ((t) => ((t, i) => `seenSurvey_${function(t) {
			return t.current_iteration && t.current_iteration > 0 ? `${t.id}_${t.current_iteration}` : t.id;
		}(i)}`)(0, t))(t);
		if (localStorage.getItem(i)) return;
		localStorage.setItem(i, "true");
	} catch (t) {
		iu.error("Failed to persist survey seen state", t);
	}
};
var su = [
	pl.Popover,
	pl.Widget,
	pl.API
];
var nu = {
	ignoreConditions: !1,
	ignoreDelay: !1,
	displayType: wl.Popover
};
var ru = Ye("[PostHog ExternalIntegrations]");
var ou = {
	intercom: "intercom-integration",
	crispChat: "crisp-chat-integration"
};
var lu = class {
	constructor(t) {
		this._instance = t;
	}
	qo(t, i) {
		var e, s;
		null === (e = c.__PosthogExtensions__) || void 0 === e || null === (s = e.loadExternalDependency) || void 0 === s || s.call(e, this._instance, t, (t) => {
			if (t) return ru.error("failed to load script", t);
			i();
		});
	}
	startIfEnabledOrStop() {
		var t;
		for (const [n, r] of Object.entries(null !== (t = this._instance.config.integrations) && void 0 !== t ? t : {})) {
			var i, e, s;
			r && !(null !== (i = c.__PosthogExtensions__) && void 0 !== i && null !== (i = i.integrations) && void 0 !== i && i[n]) && this.qo(ou[n], () => {
				var t;
				null === (t = c.__PosthogExtensions__) || void 0 === t || null === (t = t.integrations) || void 0 === t || null === (t = t[n]) || void 0 === t || t.start(this._instance);
			}), !r && null !== (e = c.__PosthogExtensions__) && void 0 !== e && null !== (e = e.integrations) && void 0 !== e && e[n] && (null === (s = c.__PosthogExtensions__) || void 0 === s || null === (s = s.integrations) || void 0 === s || null === (s = s[n]) || void 0 === s || s.stop());
		}
	}
};
var au = class {
	constructor(t, i) {
		this.$ = t, this.mo = i, this.ru = /* @__PURE__ */ new Map(), this.xo = !1;
	}
	add(t) {
		var i = this;
		return Y(function* () {
			if (i.xo) throw new Error("Cannot add an extension to a disposed ExtensionRuntime");
			if (i.ru.has(t.name)) throw new Error(`Browser extension "${t.name}" is already registered`);
			i.ru.set(t.name, t);
			try {
				const e = t.setup(i.mo);
				e && (yield e);
			} catch (e) {
				const s = i.ru.get(t.name) === t;
				s && i.ru.delete(t.name), i.$.error(`Failed to set up browser extension "${t.name}"`, e), s && i.ou(t);
			}
		})();
	}
	getExtension(t) {
		return this.ru.get(t);
	}
	dispose() {
		if (this.xo) return;
		this.xo = !0;
		const t = Array.from(this.ru.values()).reverse();
		this.ru.clear();
		for (const i of t) this.ou(i);
	}
	ou(t) {
		try {
			var i;
			const e = null === (i = t.dispose) || void 0 === i ? void 0 : i.call(t);
			e && P(e.then) && e.then(void 0, (i) => {
				this.$.error(`Failed to dispose browser extension "${t.name}"`, i);
			});
		} catch (i) {
			this.$.error(`Failed to dispose browser extension "${t.name}"`, i);
		}
	}
};
var uu = class {
	constructor(t) {
		this._instance = t;
	}
	initialize() {}
	get(t) {
		const i = this._instance.persistence;
		if ("string" == typeof t) return null == i ? void 0 : i.get_property(t);
		const e = {};
		for (const s of t) {
			const t = null == i ? void 0 : i.get_property(s);
			R(t) || (e[s] = t);
		}
		return e;
	}
	set(t, i) {
		var e;
		null === (e = this._instance.persistence) || void 0 === e || e.register("string" == typeof t ? { [t]: i } : t);
	}
	remove(t) {
		var i;
		null === (i = this._instance.persistence) || void 0 === i || i.unregister(t);
	}
};
var hu = "extensionsRemoteConfig";
var du = class {
	constructor(t) {
		this.instance = t, this.xo = !1, this.$ = Je, this.lu = t.au, this.kv = new uu(t), this.onEvent = (t) => $l(this.instance.on("eventCaptured", (i) => {
			try {
				t({
					event: i.event,
					properties: i.properties
				});
			} catch (t) {
				this.$.error("Browser extension event listener failed", t);
			}
		})), this.onRemoteConfig = (t) => {
			if (this.xo) return $l(() => {});
			const i = (i) => {
				try {
					t(i);
				} catch (t) {
					this.$.error("Browser extension remote config listener failed", t);
				}
			}, e = this.instance.uu.on(hu, i);
			return this.lu && i(this.lu), $l(e);
		}, this.hu = new au(Je.createLogger("[BrowserExtensions]"), this);
	}
	get logger() {
		return this.$;
	}
	get distinctId() {
		return this.instance.get_distinct_id();
	}
	get anonymousId() {
		var t;
		return null !== (t = this.instance.get_property("$device_id")) && void 0 !== t ? t : this.distinctId;
	}
	get deviceId() {
		const t = this.instance.get_property(rs);
		return "string" == typeof t ? t : void 0;
	}
	get library() {
		return {
			name: es.LIB_NAME,
			version: es.LIB_VERSION
		};
	}
	get initialPersonProperties() {
		var t, i;
		return null !== (t = null === (i = this.instance.persistence) || void 0 === i ? void 0 : i.get_initial_props()) && void 0 !== t ? t : {};
	}
	get groups() {
		return this.instance.getGroups();
	}
	get session() {
		try {
			var t, i, e, s;
			const n = null === (t = this.instance.sessionManager) || void 0 === t ? void 0 : t.checkAndGetSessionAndWindowId(!0);
			return {
				sessionId: null !== (i = null == n ? void 0 : n.sessionId) && void 0 !== i ? i : "",
				windowId: null !== (e = null == n ? void 0 : n.windowId) && void 0 !== e ? e : "",
				sessionStartTimestamp: null !== (s = null == n ? void 0 : n.sessionStartTimestamp) && void 0 !== s ? s : 0
			};
		} catch (t) {
			return {
				sessionId: "",
				windowId: "",
				sessionStartTimestamp: 0
			};
		}
	}
	get canCapture() {
		return this.instance.is_capturing();
	}
	get projectToken() {
		return this.instance.config.token;
	}
	add(t) {
		return this.hu.add(t);
	}
	getExtension(t) {
		return this.hu.getExtension(t);
	}
	capture(t, i, e) {
		var s = this;
		return Y(function* () {
			e ? s.instance.capture(t, i, {
				timestamp: e.timestamp,
				uuid: e.uuid,
				$set: e.set,
				$set_once: e.setOnce
			}) : s.instance.capture(t, i);
		})();
	}
	registerDynamicEventProperties(t) {
		return $l(this.instance.cu(t));
	}
	handleRemoteConfig(t) {
		this.xo || (this.lu = t, this.instance.uu.emit(hu, t));
	}
	sendRequest(t) {
		var i = this;
		return Y(function* (t, e = {}) {
			var s;
			const n = i.instance.requestRouter.endpointFor(null !== (s = e.target) && void 0 !== s ? s : "api", t), r = {
				method: e.method,
				url: e.query ? _a(n, e.query) : n,
				data: e.body,
				headers: e.headers,
				timeout: e.timeoutMs,
				fireCallbackOnDrop: !0,
				transport: e.transport,
				compression: e.compression,
				compressionFallback: "flags" === e.target && "best-available" === e.compression ? _.Base64 : void 0,
				timestampMode: e.sentAt
			};
			return "sendBeacon" === e.transport ? (i.instance._send_request(r), { statusCode: 202 }) : new Promise((t) => {
				r.callback = t, i.instance._send_request(r);
			});
		}).apply(this, arguments);
	}
	dispose() {
		this.xo || (this.xo = !0, this.hu.dispose());
	}
};
var cu = {};
var vu = 0;
var fu = () => {};
var pu = "Consent opt in/out is not valid with cookieless_mode=\"always\" and will be ignored";
var _u = "Surveys module not available";
var gu = "sanitize_properties is deprecated. Use before_send instead";
var mu = "Invalid value for property_denylist config: ";
var bu = /^[A-Za-z0-9_-]{1,400}$/;
var yu = /^fb\.[0-9]+\.[0-9]+\.[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)?$/;
var wu = /^fb\.[0-9]+\.[0-9]+\.[0-9]+$/;
var $u = [
	"token",
	"distinct_id",
	wn
];
var Su = "posthog";
var xu = (t) => {
	const i = {};
	return t && "unset" !== t ? ("2025-11-30" > t || (i.strictMinimumDuration = !0), "2026-05-30" > t || (i.canvasCapture = { resolutionScale: .6 }), "2026-06-25" > t || (i.streamNetworkBody = !0), "2026-08-30" > t || (i.captureJsonLd = !0), i) : i;
};
var Eu = (i) => {
	var e;
	return Ei({
		api_host: "https://us.i.posthog.com",
		flags_api_host: null,
		ui_host: null,
		asset_host: null,
		token: "",
		autocapture: !0,
		cross_subdomain_cookie: Xn(null == s ? void 0 : s.location),
		persistence: "localStorage+cookie",
		persistence_name: "",
		cookie_persisted_properties: [],
		loaded: fu,
		save_campaign_params: !0,
		custom_campaign_params: [],
		custom_blocked_useragents: [],
		save_referrer: !0,
		capture_pageleave: "if_capture_pageview",
		defaults: null != i ? i : "unset",
		__preview_deferred_init_extensions: !1,
		__preview_external_dependency_versioned_paths: !1,
		__preview_cookie_wins_on_conflict: !1,
		debug: n && I(null == n ? void 0 : n.search) && -1 !== n.search.indexOf("__posthog_debug=true") || !1,
		cookie_expiration: 365,
		upgrade: !1,
		disable_session_recording: !1,
		disable_persistence: !1,
		disable_web_experiments: !0,
		disable_surveys: !1,
		disable_surveys_automatic_display: !1,
		disable_conversations: !1,
		disable_product_tours: !1,
		disableDeviceModel: !1,
		reuseAnonymousId: !1,
		disable_external_dependency_loading: !1,
		strict_script_versioning: "fallback",
		enable_recording_console_log: void 0,
		secure_cookie: "https:" === (null == t || null === (e = t.location) || void 0 === e ? void 0 : e.protocol),
		ip: !1,
		opt_out_capturing_by_default: !1,
		opt_out_persistence_by_default: !1,
		opt_out_useragent_filter: !1,
		opt_out_capturing_persistence_type: "localStorage",
		consent_persistence_name: null,
		opt_out_capturing_cookie_prefix: null,
		opt_in_site_apps: !1,
		property_denylist: [],
		respect_dnt: !1,
		sanitize_properties: null,
		request_headers: {},
		request_batching: !0,
		properties_string_max_length: 65535,
		mask_all_element_attributes: !1,
		mask_all_text: !1,
		mask_personal_data_properties: !1,
		custom_personal_data_properties: [],
		advanced_disable_flags: !1,
		advanced_disable_decide: !1,
		advanced_disable_feature_flags: !1,
		advanced_disable_feature_flags_on_first_load: !1,
		advanced_only_evaluate_survey_feature_flags: !1,
		advanced_feature_flags_dedup_per_session: !1,
		advanced_enable_surveys: !1,
		advanced_disable_toolbar_metrics: !1,
		feature_flag_request_timeout_ms: 3e3,
		surveys_request_timeout_ms: 1e4,
		on_request_error(t) {
			Je.error("Bad HTTP status: " + t.statusCode + " " + t.text);
		},
		get_device_id: (t) => t,
		capture_performance: void 0,
		name: "posthog",
		bootstrap: {},
		disable_compression: !1,
		session_idle_timeout_seconds: 1800,
		person_profiles: Dn,
		before_send: void 0,
		get_current_url: void 0,
		request_queue_config: { flush_interval_ms: 3e3 },
		error_tracking: {},
		_onCapture: fu
	}, ((t) => ({
		rageclick: t && t >= "2026-05-30" ? {
			content_ignorelist: Gr,
			ignore_text_selection: !0
		} : !t || "2025-11-30" > t || { content_ignorelist: !0 },
		capture_pageview: !t || "2025-05-24" > t || "history_change",
		session_recording: xu(t),
		external_scripts_inject_target: t && t >= "2026-01-30" ? "head" : "body",
		internal_or_test_user_hostname: t && t >= "2026-01-30" ? /^(localhost|127\.0\.0\.1)$/ : void 0,
		persistence_save_debounce_ms: t && t >= "2026-05-30" ? 250 : 0,
		split_storage: !(!t || "2026-05-30" > t),
		detect_google_search_app: !(!t || "2026-05-30" > t),
		disable_capture_url_hashes: !(!t || "2026-06-25" > t),
		cookieWinsOnConflict: !(!t || "unset" === t || "2026-08-29" > t)
	}))(i));
};
var ku = [
	["process_person", "person_profiles"],
	["xhr_headers", "request_headers"],
	["cookie_name", "persistence_name"],
	["disable_cookie", "disable_persistence"],
	["__preview_disable_beacon", "disable_beacon"],
	["store_google", "save_campaign_params"],
	["verbose", "debug"],
	["__preview_cookie_wins_on_conflict", "cookieWinsOnConflict"]
];
var Tu = (t) => {
	const i = {};
	for (const [e, s] of ku) R(t[e]) || (i[s] = t[e]);
	const e = Vn({}, i, t), s = t.__preview_external_dependency_versioned_paths;
	return R(s) || (R(t.strict_script_versioning) && (e.strict_script_versioning = !!s), I(s) && R(t.asset_host) && (e.asset_host = s)), T(t.property_blacklist) && (R(t.property_denylist) ? e.property_denylist = t.property_blacklist : T(t.property_denylist) ? e.property_denylist = [...t.property_blacklist, ...t.property_denylist] : Je.error(mu + t.property_denylist)), e;
};
var Pu = class {
	constructor() {
		this.__forceAllowLocalhost = !1;
	}
	get du() {
		return this.__forceAllowLocalhost;
	}
	set du(t) {
		Je.error("WebPerformanceObserver is deprecated and has no impact on network capture. Use `_forceAllowLocalhostNetworkCapture` on `posthog.sessionRecording`"), this.__forceAllowLocalhost = t;
	}
};
var Cu = class i {
	vu(t) {
		if (!t) return;
		const i = this.ru.indexOf(t);
		-1 !== i && this.ru.splice(i, 1);
	}
	fu(t, i) {
		var e;
		return this.vu(t), this.ru.push(i), null === (e = i.initialize) || void 0 === e || e.call(i), i;
	}
	pu() {
		return "always" === this.config.cookieless_mode || "on_reject" === this.config.cookieless_mode && this.consent.isRejected();
	}
	gu() {
		if (this.mu) return;
		if (this.config.reuseAnonymousId) return;
		if (this.config.segment) return;
		if (this.pu()) return;
		const t = "memory" === this.config.persistence || "sessionStorage" === this.config.persistence;
		if (!t && !this.config.disable_persistence) return;
		if (this.yu) return;
		let i, e, s;
		t ? (i = `persistence is set to '${this.config.persistence}'`, e = "memory" === this.config.persistence ? "on every page load" : "for every new browser tab or window", s = "Either set persistence to 'localStorage+cookie', keep this persistence and pass a stable ID through bootstrap.distinctID, or enable reuseAnonymousId.") : (i = "persistence is disabled (disable_persistence is true)", e = "on every page load", s = "Either set disable_persistence to false, keep persistence disabled and pass a stable ID through bootstrap.distinctID, or enable reuseAnonymousId."), this.mu = !0, console.warn("[PostHog.js]", `${i} but no bootstrap.distinctID was provided. PostHog will mint a new distinct ID ${e}, so calling identify() merges a new ID onto the person each time. A person can then pass the distinct-ID limit and its events stop appearing on person pages and the session tab. ${s}`);
	}
	bu() {
		if (this.pu() || "$posthog_cookieless" !== this.get_distinct_id()) return;
		const t = this.persistence;
		if (!t) return;
		this._u() || t.load(!0);
		const i = this.get_distinct_id();
		if (!i || "$posthog_cookieless" === i) {
			const i = this.config.get_device_id(or());
			this.register({
				distinct_id: i,
				$device_id: i
			}), t.set_property(vn, Mn);
		}
		this.wu();
	}
	get decideEndpointWasHit() {
		var t, i;
		return null !== (t = null === (i = this.featureFlags) || void 0 === i ? void 0 : i.hasLoadedFlags) && void 0 !== t && t;
	}
	get flagsEndpointWasHit() {
		var t, i;
		return null !== (t = null === (i = this.featureFlags) || void 0 === i ? void 0 : i.hasLoadedFlags) && void 0 !== t && t;
	}
	constructor() {
		var t;
		this.ku = !1, this.Su = !1, this.webPerformance = new Pu(), this.xu = !1, this.version = es.LIB_VERSION, this.Cu = /* @__PURE__ */ new Set(), this.$u = "", this.uu = new Na(), this.ru = [], this.Iu = [], this.yu = !1, this.mu = !1, this._calculate_event_properties = this.calculateEventProperties.bind(this), this.config = Eu(), this.SentryIntegration = So, this.sentryIntegration = (t) => function(t, i) {
			const e = $o(t, i);
			return {
				name: wo,
				processEvent: (t) => e(t)
			};
		}(this, t), this.__request_queue = [], this.__loaded = !1, this.analyticsDefaultEndpoint = "/e/", this.Tu = !1, this.Mu = null, this.Eu = null, this.Pu = null, this.scrollManager = new Ma(this), this.pageViewManager = new xo(this), this.rateLimiter = new Tl(this), this.requestRouter = new tu(this), this.consent = new Pr(this), this.externalIntegrations = new lu(this);
		const e = null !== (t = i.__defaultExtensionClasses) && void 0 !== t ? t : {};
		this.featureFlags = e.featureFlags && new e.featureFlags(this), this.toolbar = e.toolbar && new e.toolbar(this), this.surveys = e.surveys && new e.surveys(this), this.conversations = e.conversations && new e.conversations(this), this.logs = e.logs && new e.logs(this), this.metrics = e.metrics && new e.metrics(this), this.experiments = e.experiments && new e.experiments(this), this.exceptions = e.exceptions && new e.exceptions(this), this.people = {
			set: (t, i, e) => {
				const s = I(t) ? { [t]: i } : t;
				this.setPersonProperties(s), e?.({});
			},
			set_once: (t, i, e) => {
				const s = I(t) ? { [t]: i } : t;
				this.setPersonProperties(void 0, s), e?.({});
			}
		}, this.on("eventCaptured", (t) => Je.info(`send "${null == t ? void 0 : t.event}"`, t));
	}
	init(t, e, s) {
		if (s && s !== Su) {
			var n;
			const r = null !== (n = cu[s]) && void 0 !== n ? n : new i();
			return r._init(t, e, s), cu[s] = r, cu[Su][s] = r, r;
		}
		return this._init(t, e, s);
	}
	_init(i, e = {}, s) {
		var n, r, o;
		const l = I(i) ? i.trim() : "";
		if (!l) return Je.critical("PostHog was initialized without a token. This likely indicates a misconfiguration. Please check the first argument passed to posthog.init()"), this;
		var a;
		if (this.__loaded) return l !== (null === (a = this.config) || void 0 === a ? void 0 : a.token) ? console.warn("[PostHog.js]", `You have already initialized PostHog with a different project token! Re-initializing is a no-op, so events will keep going to the project this instance was initialized with. To capture into a second project, load PostHog once, then initialize a named instance after the SDK has loaded, e.g. posthog.init('${l}', { ... }, 'project2')`) : console.warn("[PostHog.js]", "You have already initialized PostHog! Re-initializing is a no-op"), this;
		this.__loaded = !0, this.config = Eu(e.defaults), e.debug = this.Ru(e.debug), this.Au = e, this.Fu = [], e.person_profiles ? this.Eu = e.person_profiles : e.process_person && (this.Eu = e.process_person);
		const u = Eu(e.defaults), h = Tu(e), d = Vn({}, u, h, {
			name: s,
			token: l
		});
		C(u.rageclick) && C(h.rageclick) && (d.rageclick = Vn({}, u.rageclick, h.rageclick)), C(u.session_recording) && C(h.session_recording) && (d.session_recording = Vn({}, u.session_recording, h.session_recording)), this.set_config(d), this.config.on_xhr_error && Je.error("on_xhr_error is deprecated. Use on_request_error instead"), this.compression = e.disable_compression ? void 0 : hl.GZipJS;
		const c = this._u();
		if (this.persistence = new ul(this.config, c), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new ul(Ei(Ei({}, this.config), {}, { persistence: "sessionStorage" }), c, !1), this.$u = "ph_" + (this.config.persistence_name || this.config.token) + "_session_registered_properties", "memory" !== this.config.persistence && !c && Tr.Et()) {
			const t = Tr.Dt(this.$u);
			T(t) && t.forEach((t) => {
				I(t) && this.Cu.add(t);
			});
		} else Tr.Lt(this.$u);
		const v = Ei({}, this.persistence.props), f = Ei({}, this.sessionPersistence.props);
		this.register({ $initialization_time: (/* @__PURE__ */ new Date()).toISOString() }), this.Ou = new Ra((t, i) => this.Du(t, i), this.config.request_queue_config), this.Lu = new Fa(this), this.__request_queue = [];
		const p = this.pu();
		p || (this.sessionManager = new Ba(this), this.sessionPropsManager = new Da(this, this.sessionManager, this.persistence), this.sessionManager.onSessionId((t, i, e) => {
			(null != e && e.activityTimeout || null != e && e.sessionPastMaximumLength || null != e && e.crossTabAdoption) && this.Nu();
		})), this.qu(), this.config.__preview_deferred_init_extensions ? (Je.info("Deferring extension initialization to improve startup performance"), setTimeout(() => {
			this.ju(p);
		}, 0)) : (Je.info("Initializing extensions synchronously"), this.ju(p)), es.DEBUG = es.DEBUG || this.config.debug, es.DEBUG && Je.info("Starting in debug mode", {
			this: this,
			config: e,
			thisC: Ei({}, this.config),
			p: v,
			s: f
		}), this.config.identity_distinct_id && !(null !== (n = e.bootstrap) && void 0 !== n && n.distinctID) && (e.bootstrap = Ei(Ei({}, e.bootstrap), {}, {
			distinctID: this.config.identity_distinct_id,
			isIdentifiedID: !0
		}));
		const _ = null === (r = e.bootstrap) || void 0 === r ? void 0 : r.distinctID;
		if (this.yu = !!_ && !F(_), null === (o = e.bootstrap) || void 0 === o ? void 0 : o.distinctID) {
			const t = e.bootstrap.distinctID, i = this.get_distinct_id(), s = this.persistence.get_property(vn);
			if (e.bootstrap.isIdentifiedID && null != i && i !== t && "anonymous" === s) this.identify(t);
			else if (e.bootstrap.isIdentifiedID && null != i && i !== t && "identified" === s) Je.warn("Bootstrap distinctID differs from an already-identified user. The existing identity is preserved. Call reset() before reinitializing if you intend to switch users.");
			else {
				const i = this.config.get_device_id(or()), s = e.bootstrap.isIdentifiedID ? i : t;
				this.persistence.set_property(vn, e.bootstrap.isIdentifiedID ? An : Mn), this.register({
					distinct_id: t,
					$device_id: s
				});
			}
		}
		if (p) this.register_once({
			distinct_id: yn,
			$device_id: null
		}, "");
		else if (!this.get_distinct_id()) {
			const t = this.config.get_device_id(or());
			this.register_once({
				distinct_id: t,
				$device_id: t
			}, ""), this.persistence.set_property(vn, Mn);
		}
		return Qn(t, "onpagehide" in self ? "pagehide" : "unload", this._handle_unload.bind(this), { passive: !1 }), Qn(t, "pageshow", () => {
			var t;
			this.ku = !1, this.Su || null === (t = this.Lu) || void 0 === t || t.resume();
		}), e.segment ? yo(this, () => this.Bu()) : this.Bu(), P(this.config._onCapture) && this.config._onCapture !== fu && (Je.warn("onCapture is deprecated. Please use `before_send` instead"), this.on("eventCaptured", (t) => this.config._onCapture(t.event, t))), this.config.ip && Je.warn("The `ip` config option has NO EFFECT AT ALL and has been deprecated. Use a custom transformation or \"Discard IP data\" project setting instead. See https://posthog.com/tutorials/web-redact-properties#hiding-customer-ip-address for more information."), this.config.disableDeviceModel || function() {
			return za.apply(this, arguments);
		}().then((t) => {
			t && this.register({ [os]: t });
		}).catch(fu), this;
	}
	Hu(t) {
		const i = t;
		return I(i.name) && P(i.setup);
	}
	zu(t, i) {
		this.Hu(t) ? i.push(() => {
			this.Uu().add(t).catch(() => {
				var i;
				return null === (i = t.dispose) || void 0 === i ? void 0 : i.call(t);
			}).catch((i) => {
				Je.error(`Failed to dispose browser extension "${t.name}"`, i);
			});
		}) : this.ru.push(t);
	}
	qu() {
		var t, e, s;
		const n = null !== (t = null === (e = this.config.__extensionClasses) || void 0 === e ? void 0 : e.featureFlags) && void 0 !== t ? t : null === (s = i.__defaultExtensionClasses) || void 0 === s ? void 0 : s.featureFlags;
		var r, o, l;
		n && (this.featureFlags && this.featureFlags instanceof n || (null === (r = this.Wu) || void 0 === r || r.call(this), this.Wu = void 0, this.featureFlags = new n(this)), P(this.featureFlags.onReloading) && P(this.featureFlags.setup) ? this.Wu || (this.Wu = this.featureFlags.onReloading(() => {
			this.uu.emit("featureFlagsReloading", !0);
		}), this.Uu().add(this.featureFlags)) : null === (o = (l = this.featureFlags).initialize) || void 0 === o || o.call(l));
	}
	ju(t) {
		const e = performance.now(), s = Ei(Ei({}, i.__defaultExtensionClasses), this.config.__extensionClasses), n = [];
		var r, o, l, a, u, h, d;
		s.exceptions && this.ru.push(this.exceptions = null !== (r = this.exceptions) && void 0 !== r ? r : new s.exceptions(this)), s.historyAutocapture && this.ru.push(this.historyAutocapture = new s.historyAutocapture(this)), s.tracingHeaders && this.ru.push(this.tracingHeaders = new s.tracingHeaders(this)), s.siteApps && this.ru.push(this.siteApps = new s.siteApps(this)), s.sessionRecording && !t && this.ru.push(this.sessionRecording = new s.sessionRecording(this)), this.config.disable_scroll_properties || n.push(() => {
			this.scrollManager.startMeasuringScrollPosition();
		}), s.autocapture && this.zu(this.autocapture = new s.autocapture(this), n), s.surveys && this.zu(this.surveys = null !== (o = this.surveys) && void 0 !== o ? o : new s.surveys(this), n), s.logs && this.zu(this.logs = null !== (l = this.logs) && void 0 !== l ? l : new s.logs(this), n), s.metrics && this.ru.push(this.metrics = null !== (a = this.metrics) && void 0 !== a ? a : new s.metrics(this)), s.conversations && this.ru.push(this.conversations = null !== (u = this.conversations) && void 0 !== u ? u : new s.conversations(this)), s.productTours && this.ru.push(this.productTours = new s.productTours(this)), s.heatmaps && this.ru.push(this.heatmaps = new s.heatmaps(this)), s.webVitalsAutocapture && this.ru.push(this.webVitalsAutocapture = new s.webVitalsAutocapture(this)), s.exceptionObserver && this.ru.push(this.exceptionObserver = new s.exceptionObserver(this)), s.deadClicksAutocapture && this.ru.push(this.deadClicksAutocapture = new s.deadClicksAutocapture(this, go)), s.toolbar && this.ru.push(this.toolbar = null !== (h = this.toolbar) && void 0 !== h ? h : new s.toolbar(this)), s.experiments && this.ru.push(this.experiments = null !== (d = this.experiments) && void 0 !== d ? d : new s.experiments(this)), this.ru.forEach((t) => {
			t.initialize && n.push(() => {
				var i;
				null === (i = t.initialize) || void 0 === i || i.call(t);
			});
		}), n.push(() => {
			if (this.Vu) {
				const t = this.Vu;
				this.Vu = void 0, this.ru.forEach((i) => {
					var e;
					return null === (e = i.onRemoteConfig) || void 0 === e ? void 0 : e.call(i, t);
				});
			}
		}), this.Gu(n, e);
	}
	Gu(t, i) {
		for (; t.length > 0;) {
			if (this.config.__preview_deferred_init_extensions && performance.now() - i >= 30 && t.length > 0) return void setTimeout(() => {
				this.Gu(t, i);
			}, 0);
			const e = t.shift();
			if (e) try {
				e();
			} catch (t) {
				Je.error("Error initializing extension:", t);
			}
		}
		const e = Math.round(performance.now() - i);
		this.register_for_session({
			[$n]: this.config.__preview_deferred_init_extensions ? "deferred" : "synchronous",
			[Sn]: e
		}), this.config.__preview_deferred_init_extensions && Je.info(`PostHog extensions initialized (${e}ms)`);
	}
	Xl(t) {
		var i;
		if (!s || !s.body) return Je.info("document not ready yet, trying again in 500 milliseconds..."), void setTimeout(() => {
			this.Xl(t);
		}, 500);
		if (this.config.__preview_deferred_init_extensions && (this.Vu = t), this.au = t, this.compression = void 0, t.ok) {
			var e;
			const i = t.config;
			i.supportedCompression && !this.config.disable_compression && (this.compression = b(i.supportedCompression, hl.GZipJS) ? hl.GZipJS : b(i.supportedCompression, hl.Base64) ? hl.Base64 : void 0), null !== (e = i.analytics) && void 0 !== e && e.endpoint && (this.analyticsDefaultEndpoint = i.analytics.endpoint);
		}
		this.set_config({ person_profiles: this.Eu ? this.Eu : Dn }), null === (i = this.Zu) || void 0 === i || i.handleRemoteConfig(t), this.ru.forEach((i) => {
			var e;
			return null === (e = i.onRemoteConfig) || void 0 === e ? void 0 : e.call(i, t);
		});
	}
	Bu() {
		try {
			this.config.loaded(this);
		} catch (t) {
			Je.critical("`loaded` function failed", t);
		}
		if (this.Qu(), this.config.internal_or_test_user_hostname && (null == n ? void 0 : n.hostname)) {
			const t = n.hostname, i = this.config.internal_or_test_user_hostname;
			("string" == typeof i ? t === i : i.test(t)) && this.setInternalOrTestUser();
		}
		this.config.capture_pageview && setTimeout(() => {
			(this.consent.isOptedIn() || this.pu()) && this.Ju();
		}, 1), this.Ku = new Cl(this), this.Ku.load();
	}
	Qu() {
		var t;
		this.is_capturing() && this.config.request_batching && (null === (t = this.Ou) || void 0 === t || t.enable());
	}
	_dom_loaded() {
		this.is_capturing() && Hn(this.__request_queue, (t) => this.Du(t)), this.__request_queue = [], this.Qu();
	}
	_handle_unload() {
		var t, i, e, s, n, r;
		this.ku = !0, null === (t = this.surveys) || void 0 === t || null === (i = t.handlePageUnload) || void 0 === i || i.call(t), null === (e = this.metrics) || void 0 === e || e.flush("sendBeacon"), this.config.request_batching ? (this.Xu() && this.capture(Bn), null === (s = this.logs) || void 0 === s || s.flushLogs("sendBeacon"), null === (n = this.Ou) || void 0 === n || n.unload(), null === (r = this.Lu) || void 0 === r || r.unload()) : this.Xu() && this.capture(Bn, null, { transport: "sendBeacon" });
	}
	_send_request(t) {
		Oa(this, t);
	}
	Du(t, i) {
		this.Lu ? this.Lu.retriableRequest(t, i) : this._send_request(i ? Ei(Ei({}, t), {}, { transport: i }) : t);
	}
	_execute_array(t) {
		vu++;
		try {
			let i;
			const e = [], s = [], n = [];
			Hn(t, (t) => {
				if (t) if (i = t[0], T(i)) n.push(t);
				else if (P(t)) try {
					t.call(this);
				} catch (i) {
					Je.error("Error executing queued PostHog call", t, i);
				}
				else T(t) && "alias" === i ? e.push(t) : T(t) && -1 !== i.indexOf("capture") && P(this[i]) ? n.push(t) : s.push(t);
			});
			const r = function(t, i) {
				Hn(t, function(t) {
					try {
						if (T(t[0])) {
							let e = i;
							qn(t, function(t) {
								e = e[t[0]].apply(e, t.slice(1));
							});
						} else i[t[0]].apply(i, t.slice(1));
					} catch (i) {
						Je.error("Error executing queued PostHog call", t, i);
					}
				});
			};
			r(e, this), r(s, this), r(n, this);
		} finally {
			vu--;
		}
	}
	push(t) {
		if (vu > 0 && T(t) && I(t[0])) {
			const e = i.prototype[t[0]];
			P(e) && e.apply(this, t.slice(1));
			return;
		}
		this._execute_array([t]);
	}
	get Yu() {
		return {
			property: us,
			persistenceKey: hs,
			cookieName: "_fbc",
			pattern: yu,
			register: (t, i) => {
				var e;
				return null === (e = this.persistence) || void 0 === e ? void 0 : e.register({ [hs]: {
					value: t,
					delivered: i
				} });
			},
			unregister: () => {
				var t;
				return null === (t = this.persistence) || void 0 === t ? void 0 : t.unregister(hs);
			}
		};
	}
	get th() {
		return {
			property: ds,
			persistenceKey: cs,
			cookieName: "_fbp",
			pattern: wu,
			register: (t, i) => {
				var e;
				return null === (e = this.persistence) || void 0 === e ? void 0 : e.register({ [cs]: {
					value: t,
					delivered: i
				} });
			},
			unregister: () => {
				var t;
				return null === (t = this.persistence) || void 0 === t ? void 0 : t.unregister(cs);
			}
		};
	}
	eh(t) {
		var i;
		const e = null === (i = this.persistence) || void 0 === i ? void 0 : i.get_property(t.persistenceKey);
		return I(e) && t.pattern.test(e) ? {
			value: e,
			delivered: !1
		} : C(e) && I(e.value) && t.pattern.test(e.value) ? {
			value: e.value,
			delivered: !0 === e.delivered
		} : void 0;
	}
	ih(t, i, e) {
		return i === (null == e ? void 0 : e.value) ? {
			value: i,
			pending: !e.delivered
		} : (t.register(i, !1), {
			value: i,
			pending: !0
		});
	}
	nh(t) {
		if (!this.config.save_campaign_params || this.pu()) return;
		const i = tr(t.cookieName);
		return I(i) && t.pattern.test(i) ? i : void 0;
	}
	sh(t, i, e, s) {
		if (!this.persistence) return;
		const n = this.Yu;
		this.persistence.refreshKey(n.persistenceKey);
		const r = this.eh(n);
		if (s) return void n.unregister();
		if (e) return I(i) && yu.test(i) ? this.ih(n, i, r) : void n.unregister();
		const o = I(t) && bu.test(t) ? t : void 0, l = this.nh(n);
		return l && ((t, i, e) => {
			const s = t.split(".");
			if (i) return s[3] === i;
			if (!e) return !0;
			const n = e.value.split(".");
			return s[3] === n[3] || Number(s[2]) > Number(n[2]);
		})(l, o, r) ? this.ih(n, l, r) : o ? (null == r ? void 0 : r.value.split(".")[3]) === o ? {
			value: r.value,
			pending: !r.delivered
		} : this.ih(n, `fb.1.${Date.now()}.${o}`, r) : r ? {
			value: r.value,
			pending: !r.delivered
		} : void 0;
	}
	rh(t, i, e) {
		if (!this.persistence) return;
		const s = this.th;
		this.persistence.refreshKey(s.persistenceKey);
		const n = this.eh(s);
		if (e) return void s.unregister();
		if (i) return I(t) && wu.test(t) ? this.ih(s, t, n) : void s.unregister();
		const r = this.nh(s);
		return r ? this.ih(s, r, n) : n ? {
			value: n.value,
			pending: !n.delivered
		} : void 0;
	}
	oh(t, i) {
		if (!this.persistence) return;
		this.persistence.refreshKey(t.persistenceKey);
		const e = this.eh(t);
		(null == e ? void 0 : e.value) !== i || e.delivered || t.register(i, !0);
	}
	capture(t, i, e) {
		var s, n;
		if (!(this.__loaded && this.persistence && this.sessionPersistence && this.Ou)) return void Je.uninitializedWarning("posthog.capture");
		if (!this.is_capturing()) return;
		if (R(t) || !I(t)) return void Je.error("No event name provided to posthog.capture");
		this.bu();
		const r = !this.config.opt_out_useragent_filter && this._is_bot();
		if (r && !this.config.__preview_capture_bot_pageviews) return;
		const o = (null == e ? void 0 : e.skip_client_rate_limiting) ? void 0 : this.rateLimiter.clientRateLimitContext();
		if (null == o ? void 0 : o.isRateLimited) return void Je.critical("This capture call is ignored due to client rate limiting.");
		let l;
		null != i && i.$current_url && !I(null == i ? void 0 : i.$current_url) && (Je.error("Invalid `$current_url` property provided to `posthog.capture`. Input must be a string. Ignoring provided value."), null == i || delete i.$current_url), "$exception" !== t || null != e && e.ah || Je.warn("Using `posthog.capture('$exception')` is unreliable because it does not attach required metadata. Use `posthog.captureException(error)` instead, which attaches required metadata automatically."), this.sessionPersistence.update_search_keyword(), this.config.save_campaign_params && (l = this.sessionPersistence.update_campaign_params()), this.config.save_referrer && this.sessionPersistence.update_referrer_info(), (this.config.save_campaign_params || this.config.save_referrer) && this.persistence.set_initial_person_info();
		const a = /* @__PURE__ */ new Date(), u = (null == e ? void 0 : e.timestamp) || a, h = di(null == e ? void 0 : e.uuid, or);
		let d = {
			uuid: h,
			event: t,
			properties: this.calculateEventProperties(t, i || {}, u, h)
		};
		"$pageview" === t && this.config.__preview_capture_bot_pageviews && r && (d.event = "$bot_pageview", d.properties.$browser_type = "bot"), o && (d.properties.$lib_rate_limit_remaining_tokens = o.remainingTokens);
		const c = "$feature_flag_called" === t && !1 === d.properties.$feature_flag_has_experiment && !0 === this.get_property("$minimal_flag_called_events");
		null != e && e.$set && !c && (d.$set = null == e ? void 0 : e.$set);
		const v = C(null == i ? void 0 : i.$set) ? i.$set : void 0, f = T(null == i ? void 0 : i.$unset) ? i.$unset : [], p = (null == e ? void 0 : e.$unset) || [], _ = (t) => {
			var i;
			const s = !!(null == e ? void 0 : e.$set) && t in e.$set;
			return {
				hasProvided: s || !!v && t in v,
				provided: s ? null == e || null === (i = e.$set) || void 0 === i ? void 0 : i[t] : null == v ? void 0 : v[t],
				unset: -1 !== f.indexOf(t) || -1 !== p.indexOf(t)
			};
		}, g = _(us), m = _(ds), b = [{
			channel: this.Yu,
			hasProvided: g.hasProvided,
			update: this.sh(null == l ? void 0 : l.fbclid, g.provided, g.hasProvided, g.unset)
		}, {
			channel: this.th,
			hasProvided: m.hasProvided,
			update: this.rh(m.provided, m.hasProvided, m.unset)
		}];
		for (const { channel: t, hasProvided: i, update: e } of b) e && !0 === d.properties.$process_person_profile && e.pending && !i && !c && (d.$set = Ei({ [t.property]: e.value }, d.$set));
		const y = null == e ? void 0 : e.$unset;
		y && (d.$unset = y);
		const w = c ? void 0 : this.uh(null == e ? void 0 : e.$set_once, t !== zn, t === Un);
		if (w && (d.$set_once = w), null != e && e._noTruncate || (S = this.config.properties_string_max_length, d = function(t, i) {
			const e = /* @__PURE__ */ new Set();
			return function t(s, n) {
				if (s !== Object(s)) return i ? i(s) : s;
				if (e.has(s)) return;
				let r;
				if (e.add(s), T(s)) r = [], Hn(s, (i) => {
					r.push(t(i));
				});
				else {
					const i = {};
					qn(H(s) ? Jn(s) : s, (s, n) => {
						e.has(s) || (i[n] = t(s, n));
					}), r = i;
				}
				return r;
			}(t);
		}(d, (t) => I(t) ? t.slice(0, S) : t)), d.timestamp = u, R(null == e ? void 0 : e.timestamp) || (d.properties.$event_time_override_provided = !0, d.properties.$event_time_override_system_time = a), c && (d.properties = ((t, i = []) => {
			const e = {}, s = (i) => {
				void 0 !== t[i] && (e[i] = t[i]);
			};
			return fe.forEach(s), i.forEach(s), e;
		})(d.properties, $u)), t === bl.DISMISSED || t === bl.SENT) {
			const e = null == i ? void 0 : i[yl.SURVEY_ID], s = null == i ? void 0 : i[yl.SURVEY_ITERATION];
			eu({
				id: e,
				current_iteration: s
			}), d.$set = Ei(Ei({}, d.$set), {}, { [Ha({
				id: e,
				current_iteration: s
			}, t === bl.SENT ? "responded" : "dismissed")]: !0 });
		} else t === bl.SHOWN && (d.$set = Ei(Ei({}, d.$set), {}, { [yl.SURVEY_LAST_SEEN_DATE]: (/* @__PURE__ */ new Date()).toISOString() }));
		var S;
		if (t === xl.SHOWN) {
			const t = null == i ? void 0 : i[El.TOUR_TYPE];
			t && (d.$set = Ei(Ei({}, d.$set), {}, { [`${El.TOUR_LAST_SEEN_DATE}/${t}`]: (/* @__PURE__ */ new Date()).toISOString() }));
		}
		const x = Ei(Ei({}, d.properties.$set), d.$set);
		if (O(x) || this.setPersonPropertiesForFlags(x), !A(this.config.before_send)) {
			const t = this.Os(d);
			if (!t) return;
			d = t, d.uuid = di(d.uuid, or);
		}
		const E = b.filter(({ channel: t, update: i }) => {
			var e, s, n;
			const r = null !== (e = null === (s = d.$set) || void 0 === s ? void 0 : s[t.property]) && void 0 !== e ? e : C(null === (n = d.properties) || void 0 === n ? void 0 : n.$set) ? d.properties.$set[t.property] : void 0;
			return (null == i ? void 0 : i.pending) && r === i.value;
		});
		this.uu.emit("eventCaptured", d);
		const k = null !== (s = null == e ? void 0 : e._url) && void 0 !== s ? s : this.requestRouter.endpointFor("api", this.analyticsDefaultEndpoint), P = "recordings" === (null == e ? void 0 : e._batchKey) || /\/s\/(?:\?|$)/.test(k), F = Ei(Ei(Ei({
			method: "POST",
			url: k,
			data: d,
			compression: "best-available",
			timestampMode: P ? "body" : "capture-body",
			batchKey: null == e ? void 0 : e._batchKey
		}, P && (null === (n = d.properties) || void 0 === n ? void 0 : n.$session_id) ? { batchGroup: d.properties.$session_id + (d.properties.$window_id ? `-${d.properties.$window_id}` : "") } : {}), (null == e ? void 0 : e.transport) ? { transport: e.transport } : {}), E.length ? {
			fireCallbackOnDrop: !0,
			callback: (t) => {
				if (t.statusCode >= 200 && 300 > t.statusCode) for (const { channel: t, update: i } of E) this.oh(t, i.value);
			}
		} : {});
		if (!this.config.request_batching || e && !(null == e ? void 0 : e._batchKey) || (null == e ? void 0 : e.send_instantly) || E.length) {
			var M;
			let t;
			!F.transport && !F.callback && O(null !== (M = this.config.request_headers) && void 0 !== M ? M : {}) && this.ku && (t = "sendBeacon"), this.Du(F, t);
		} else this.Ou.enqueue(F);
		return d;
	}
	_addCaptureHook(t) {
		return this.on("eventCaptured", (i) => t(i.event, i));
	}
	getExtension(t) {
		var i;
		return null === (i = this.Zu) || void 0 === i ? void 0 : i.getExtension(t);
	}
	Uu() {
		var t;
		return null !== (t = this.Zu) && void 0 !== t ? t : this.Zu = new du(this);
	}
	cu(t) {
		this.Iu.push(t);
		let i = !0;
		return () => {
			if (!i) return;
			i = !1;
			const e = this.Iu.indexOf(t);
			-1 !== e && this.Iu.splice(e, 1);
		};
	}
	hh(t = !0) {
		var i, e, s;
		return !!(null === (i = this.persistence) || void 0 === i ? void 0 : i.consumeCookieIdentityChange()) && (this.Pu = null, "anonymous" === this.persistence.get_property("$user_state") && (null === (s = this.sessionPersistence) || void 0 === s || s.clear(), this.Cu.clear(), this.dh()), null === (e = this.featureFlags) || void 0 === e || e.reset(), t && this.reloadFeatureFlags(), !0);
	}
	calculateEventProperties(i, e, r, o, l) {
		if (r = r || /* @__PURE__ */ new Date(), !this.persistence || !this.sessionPersistence) return e;
		this.persistence.syncCookieProperties(), this.hh();
		const a = l ? void 0 : this.persistence.remove_event_timer(i);
		let h = Ei({}, e);
		if (h.token = this.config.token, h.$config_defaults = this.config.defaults, this.pu() && (h[wn] = !0), "$snapshot" === i) {
			const t = Ei(Ei({}, this.persistence.properties()), this.sessionPersistence.properties());
			return h.distinct_id = t.distinct_id, (!I(h.distinct_id) && !D(h.distinct_id) || F(h.distinct_id)) && Je.error("Invalid distinct_id for replay event. This indicates a bug in your implementation"), h;
		}
		const d = function(i, e, s, r = !1) {
			var o, l, a, h;
			if (!u) return {};
			const d = i ? [...Do, ...e || []] : [], [c, v] = Zt(u), [p, _] = function(t) {
				for (let i = 0; si.length > i; i++) {
					const [e, s, n] = si[i], r = t.match(e);
					if (r) {
						const i = n && t.match(n) || r;
						return [s, (null == i ? void 0 : i[1]) || ""];
					}
				}
				return ["", ""];
			}(u), g = function() {
				const t = "u" > typeof navigator ? navigator : void 0;
				return (null == t ? void 0 : t.brave) ? { brave: !0 } : {};
			}(), m = {};
			R(s) || (m.detectGoogleSearchApp = s);
			const b = {}, y = null === (o = navigator) || void 0 === o || null === (o = o.userAgentData) || void 0 === o ? void 0 : o.platform, w = null === (l = navigator) || void 0 === l ? void 0 : l.maxTouchPoints, S = null == t || null === (a = t.screen) || void 0 === a ? void 0 : a.width, x = null == t || null === (h = t.screen) || void 0 === h ? void 0 : h.height, E = null == t ? void 0 : t.devicePixelRatio;
			R(y) || (b.userAgentDataPlatform = y), R(w) || (b.maxTouchPoints = w), R(S) || (b.screenWidth = S), R(x) || (b.screenHeight = x), R(E) || (b.devicePixelRatio = E);
			const k = Vn(Kn({
				$os: c,
				$os_version: v,
				$browser: Jt(u, navigator.vendor, g, m),
				$webview_app: p,
				$webview_app_version: _,
				$device: ti(u),
				$device_type: ii(u, b),
				$timezone: Jo(),
				$timezone_offset: Yo()
			}), {
				$current_url: Io(r ? vi(null == n ? void 0 : n.href) : null == n ? void 0 : n.href, d, jo),
				$host: null == n ? void 0 : n.host,
				$pathname: null == n ? void 0 : n.pathname,
				$raw_user_agent: u.length > 1e3 ? u.substring(0, 997) + "..." : u,
				$browser_version: Xt(u, navigator.vendor, g, m),
				$browser_language: Ho(),
				$browser_language_prefix: qo(),
				$screen_height: null == t ? void 0 : t.screen.height,
				$screen_width: null == t ? void 0 : t.screen.width,
				$viewport_height: null == t ? void 0 : t.innerHeight,
				$viewport_width: null == t ? void 0 : t.innerWidth,
				$lib: f.LIB_NAME,
				$lib_version: f.LIB_VERSION,
				$insert_id: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10),
				$time: Date.now() / 1e3
			});
			return f.SDK_DIST_CHANNEL && (k.$sdk_dist_channel = f.SDK_DIST_CHANNEL), k;
		}(this.config.mask_personal_data_properties, this.config.custom_personal_data_properties, this.config.detect_google_search_app, this.config.disable_capture_url_hashes);
		if (this.sessionManager) {
			const { sessionId: t, windowId: i } = this.sessionManager.checkAndGetSessionAndWindowId(l, r.getTime(), !0);
			h.$session_id = t, h.$window_id = i;
		}
		this.sessionPropsManager && Vn(h, this.sessionPropsManager.getSessionProps());
		try {
			var c;
			this.sessionRecording && Vn(h, this.sessionRecording.sdkDebugProperties), h.$sdk_debug_retry_queue_size = null === (c = this.Lu) || void 0 === c ? void 0 : c.length;
		} catch (t) {
			h.$sdk_debug_error_capturing_properties = String(t);
		}
		let v;
		if (this.requestRouter.region === Ya && (h.$lib_custom_api_host = this.config.api_host), v = "$pageview" !== i || l ? "$pageleave" !== i || l ? this.pageViewManager.doEvent() : this.pageViewManager.doPageLeave(r) : this.pageViewManager.doPageView(r, o), h = Vn(h, v), "$pageview" === i && s && (h.title = s.title), !R(a)) {
			const t = r.getTime() - a;
			h.$duration = parseFloat((t / 1e3).toFixed(3));
		}
		u && this.config.opt_out_useragent_filter && (h.$browser_type = this._is_bot() ? "bot" : "browser");
		const p = this.persistence.properties(), _ = this.sessionPersistence.properties(), g = h.$groups, m = p.$groups;
		C(g) && !O(g) && (h.$groups = Ei(Ei({}, C(m) ? m : {}), g)), qn(["$referrer", "$referring_domain"], (t) => {
			t in p && delete _[t];
		});
		const b = {};
		if (this.Iu.length > 0) for (const t of this.Iu.slice()) try {
			Vn(b, t());
		} catch (t) {
			Je.error("Failed to produce browser extension event properties", t);
		}
		h = Vn({}, d, p, _, Ei(Ei({}, b), h)), h.$is_identified = this._isIdentified(), T(this.config.property_denylist) ? qn(this.config.property_denylist, function(t) {
			delete h[t];
		}) : Je.error(mu + this.config.property_denylist + " or property_blacklist config: " + this.config.property_blacklist);
		const y = this.config.sanitize_properties;
		y && (Je.error(gu), h = y(h, i));
		const w = this.fh();
		return h.$process_person_profile = w, w && !l && this.ph("_calculate_event_properties"), h;
	}
	uh(t, i = !0, e = !1) {
		var s;
		if (!this.persistence || !this.fh()) return t;
		if (this.xu && !e) return t;
		let o = Vn({}, this.persistence.get_initial_props(), (null === (s = this.sessionPropsManager) || void 0 === s ? void 0 : s.getSetOnceProps()) || {}, t || {});
		const l = this.config.sanitize_properties;
		return l && (Je.error(gu), o = l(o, "$set_once")), i && (this.xu = !0), O(o) ? void 0 : o;
	}
	register(t, i) {
		var e;
		null === (e = this.persistence) || void 0 === e || e.register(t, i);
	}
	register_once(t, i, e) {
		var s;
		null === (s = this.persistence) || void 0 === s || s.register_once(t, i, e);
	}
	register_for_session(t) {
		var i, e;
		null === (i = this.persistence) || void 0 === i || i.syncCookieProperties(), this.hh(), null === (e = this.sessionPersistence) || void 0 === e || e.register(t), Object.keys(t).forEach((t) => this.Cu.add(t)), this.dh();
	}
	unregister(t) {
		var i;
		null === (i = this.persistence) || void 0 === i || i.unregister(t);
	}
	unregister_for_session(t) {
		var i;
		null === (i = this.sessionPersistence) || void 0 === i || i.unregister(t), this.Cu.delete(t), this.dh();
	}
	gh(t, i) {
		this.register({ [t]: i });
	}
	Nu() {
		this.Cu.forEach((t) => {
			var i;
			null === (i = this.sessionPersistence) || void 0 === i || i.unregister(t);
		}), this.Cu.clear(), this.dh();
	}
	dh() {
		var t;
		if (!this.$u) return;
		if ("memory" === this.config.persistence || (null === (t = this.sessionPersistence) || void 0 === t ? void 0 : t.mi) || !Tr.Et()) return void Tr.Lt(this.$u);
		const i = [];
		this.Cu.forEach((t) => i.push(t)), i.length > 0 ? Tr.At(this.$u, i) : Tr.Lt(this.$u);
	}
	getFeatureFlag(t, i) {
		var e;
		return null === (e = this.featureFlags) || void 0 === e ? void 0 : e.getFeatureFlag(t, i);
	}
	getFeatureFlagPayload(t) {
		var i;
		return null === (i = this.featureFlags) || void 0 === i ? void 0 : i.getFeatureFlagPayload(t);
	}
	getFeatureFlagResult(t, i) {
		var e;
		return null === (e = this.featureFlags) || void 0 === e ? void 0 : e.getFeatureFlagResult(t, i);
	}
	getAllFeatureFlags() {
		var t, i;
		return null !== (t = null === (i = this.featureFlags) || void 0 === i ? void 0 : i.getAllFeatureFlags()) && void 0 !== t ? t : [];
	}
	isFeatureEnabled(t, i) {
		var e, s;
		return null !== (e = null === (s = this.featureFlags) || void 0 === s ? void 0 : s.isFeatureEnabled(t, i)) && void 0 !== e ? e : null == i ? void 0 : i.defaultValue;
	}
	reloadFeatureFlags() {
		var t;
		null === (t = this.featureFlags) || void 0 === t || t.reloadFeatureFlags();
	}
	updateFlags(t, i, e) {
		var s;
		null === (s = this.featureFlags) || void 0 === s || s.updateFlags(t, i, e);
	}
	updateEarlyAccessFeatureEnrollment(t, i, e) {
		var s;
		null === (s = this.featureFlags) || void 0 === s || s.updateEarlyAccessFeatureEnrollment(t, i, e);
	}
	getEarlyAccessFeatures(t, i = !1, e) {
		var s;
		return null === (s = this.featureFlags) || void 0 === s ? void 0 : s.getEarlyAccessFeatures(t, i, e);
	}
	on(t, i) {
		return this.uu.on(t, i);
	}
	onFeatureFlags(t) {
		return this.featureFlags ? this.featureFlags.onFeatureFlags(t) : (t([], {}, { errorsLoading: !0 }), () => {});
	}
	onSurveysLoaded(t) {
		return this.surveys ? this.surveys.onSurveysLoaded(t) : (t([], {
			isLoaded: !1,
			error: _u
		}), () => {});
	}
	onSessionId(t) {
		var i, e;
		return null !== (i = null === (e = this.sessionManager) || void 0 === e ? void 0 : e.onSessionId(t)) && void 0 !== i ? i : () => {};
	}
	getSurveys(t, i = !1) {
		this.surveys ? this.surveys.getSurveys(t, i) : t([], {
			isLoaded: !1,
			error: _u
		});
	}
	getActiveMatchingSurveys(t, i = !1) {
		this.surveys ? this.surveys.getActiveMatchingSurveys(t, i) : t([], {
			isLoaded: !1,
			error: _u
		});
	}
	renderSurvey(t, i) {
		var e;
		null === (e = this.surveys) || void 0 === e || e.renderSurvey(t, i);
	}
	displaySurvey(t, i = nu) {
		var e;
		null === (e = this.surveys) || void 0 === e || e.displaySurvey(t, i);
	}
	cancelPendingSurvey(t) {
		var i;
		null === (i = this.surveys) || void 0 === i || i.cancelPendingSurvey(t);
	}
	canRenderSurvey(t) {
		var i, e;
		return null !== (i = null === (e = this.surveys) || void 0 === e ? void 0 : e.canRenderSurvey(t)) && void 0 !== i ? i : {
			visible: !1,
			disabledReason: _u
		};
	}
	canRenderSurveyAsync(t, i = !1) {
		var e, s;
		return null !== (e = null === (s = this.surveys) || void 0 === s ? void 0 : s.canRenderSurveyAsync(t, i)) && void 0 !== e ? e : Promise.resolve({
			visible: !1,
			disabledReason: _u
		});
	}
	mh(t) {
		return !t || F(t) ? (Je.critical("Unique user id has not been set in posthog.identify"), !1) : "$posthog_cookieless" === t ? (Je.critical(`The string "${t}" was set in posthog.identify which indicates an error. This ID is only used as a sentinel value.`), !1) : !["distinct_id", "distinctid"].includes(t.toLowerCase()) && !["undefined", "null"].includes(t.toLowerCase()) || (Je.critical(`The string "${t}" was set in posthog.identify which indicates an error. This ID should be unique to the user and not a hardcoded string.`), !1);
	}
	identify(t, i, e) {
		if (!this.__loaded || !this.persistence) return Je.uninitializedWarning("posthog.identify");
		if (D(t) && (t = t.toString(), Je.warn("The first argument to posthog.identify was a number, but it should be a string. It has been converted to a string.")), !this.mh(t)) return;
		if (!this.ph("posthog.identify")) return;
		this.bu();
		const s = this.get_distinct_id(), n = this.persistence.syncCookieProperties() && this.get_distinct_id() !== s, r = this.hh(!1), o = this.persistence.Rl();
		let l = !1;
		try {
			const s = this.get_distinct_id();
			this.register({ $user_id: t }), this.get_property("$device_id") || this.register_once({
				$had_persisted_distinct_id: !0,
				$device_id: s
			}, ""), t !== s && t !== this.get_property("__alias") && (this.unregister(ls), this.register({ distinct_id: t }));
			const o = (this.persistence.get_property("$user_state") || "anonymous") === Mn, u = t !== s, h = !u && o;
			if (u && o) {
				var a;
				const n = this.config.reuseAnonymousId ? { distinct_id: t } : {
					distinct_id: t,
					$anon_distinct_id: s
				};
				this.persistence.set_property(vn, An), this.setPersonPropertiesForFlags({
					$set: i || {},
					$set_once: e || {}
				}, !1), this.config.cookieWinsOnConflict && this.persistence.Al(), this.capture("$identify", n, {
					$set: i || {},
					$set_once: e || {}
				}) && (this.Pu = Ja(t, i, e)), null === (a = this.featureFlags) || void 0 === a || a.setAnonymousDistinctId(this.config.reuseAnonymousId ? void 0 : s);
			} else if (h) {
				this.persistence.set_property(vn, An);
				const s = i || {}, n = e || {};
				this.setPersonPropertiesForFlags({
					$set: s,
					$set_once: n
				}, !1), this.config.cookieWinsOnConflict && this.persistence.Al(), this.capture("$set", {
					$set: s,
					$set_once: n
				}) && (this.Pu = Ja(t, i, e));
			} else (i || e) && this.setPersonProperties(i, e);
			u || n || r ? (this.reloadFeatureFlags(), this.featureFlags ? this.featureFlags.resetFlagCallReported() : this.unregister(un)) : h && (i || e) && this.reloadFeatureFlags(), l = !0;
		} finally {
			o && this.persistence.Dl(l);
		}
	}
	setPersonProperties(t, i) {
		if (!t && !i) return;
		if (!this.ph("posthog.setPersonProperties")) return;
		const e = Ja(this.get_distinct_id(), t, i);
		this.Pu !== e ? (this.setPersonPropertiesForFlags({
			$set: t || {},
			$set_once: i || {}
		}, !0), this.capture("$set", {
			$set: t || {},
			$set_once: i || {}
		}) && (this.Pu = e)) : Je.info("A duplicate setPersonProperties call was made with the same properties. It has been ignored.");
	}
	unsetPersonProperties(t) {
		var i;
		const e = (T(t) ? t : [t]).filter((t) => I(t) && t.length > 0);
		0 !== e.length && this.ph("posthog.unsetPersonProperties") && (null === (i = this.featureFlags) || void 0 === i || i.unsetPersonPropertiesForFlags(e, !0), this.capture("$set", { $unset: e }), this.Pu = null);
	}
	group(t, i, e) {
		var s;
		if (!t || !i) return void Je.error("posthog.group requires a group type and group key");
		null === (s = this.persistence) || void 0 === s || s.syncCookieProperties(), this.hh();
		const n = this.getGroups(), r = n[t] !== i;
		if (r && this.resetGroupPropertiesForFlags(t), this.register({ $groups: Ei(Ei({}, n), {}, { [t]: i }) }), (r || e) && this.fh()) {
			const s = {
				$group_type: t,
				$group_key: i
			};
			e && (s.$group_set = e), this.capture(zn, s);
		}
		e && this.setGroupPropertiesForFlags({ [t]: e }), r && !e && this.reloadFeatureFlags();
	}
	resetGroups() {
		this.register({ $groups: {} }), this.resetGroupPropertiesForFlags(), this.reloadFeatureFlags();
	}
	setPersonPropertiesForFlags(t, i = !0) {
		var e;
		null === (e = this.featureFlags) || void 0 === e || e.setPersonPropertiesForFlags(t, i);
	}
	resetPersonPropertiesForFlags(t = !0) {
		var i;
		null === (i = this.featureFlags) || void 0 === i || i.resetPersonPropertiesForFlags(t);
	}
	setGroupPropertiesForFlags(t, i = !0) {
		var e;
		this.ph("posthog.setGroupPropertiesForFlags") && (null === (e = this.featureFlags) || void 0 === e || e.setGroupPropertiesForFlags(t, i));
	}
	resetGroupPropertiesForFlags(t) {
		var i;
		null === (i = this.featureFlags) || void 0 === i || i.resetGroupPropertiesForFlags(t);
	}
	reset(t) {
		const i = j(t) ? t : null == t ? void 0 : t.resetDeviceID, e = j(t) || null == t ? void 0 : t.bootstrap;
		this.yh(i, !1, e);
	}
	yh(t, i = !1, e) {
		var s, n, r, o, l, a;
		if (Je.info("reset"), !this.__loaded) return Je.uninitializedWarning("posthog.reset");
		const u = null == e ? void 0 : e.sessionID;
		this.config.bootstrap = e || (null === (s = this.Au) || void 0 === s ? void 0 : s.bootstrap) || {}, null === (n = this.featureFlags) || void 0 === n || null === (r = n.updateConfig) || void 0 === r || r.call(n, this.config, this.Yl());
		const h = this.get_property(rs), d = this.get_property(os), c = this.get_property(xs);
		null === (o = this.sessionRecording) || void 0 === o || o.flushBeforeIdentityReset();
		const v = this.is_capturing();
		this.consent.reset(), i || !v || this.is_capturing() || console.warn("[PostHog.js]", "reset() cleared the stored consent, and capturing is now off because of `opt_out_capturing_by_default`. Call opt_in_capturing() again, and prefer calling reset() before opting in rather than after.");
		const f = null === (l = this.persistence) || void 0 === l || null === (a = l.Rl) || void 0 === a ? void 0 : a.call(l);
		let p = !1;
		try {
			var _, g, m, b, y, w, S, x, E, k, T, P, C;
			if (null === (_ = this.persistence) || void 0 === _ || _.clear(), null === (g = this.sessionPersistence) || void 0 === g || g.clear(), this.Cu.clear(), this.dh(), R(c) || null === (k = this.persistence) || void 0 === k || k.register({ $session_recording_remote_config: c }), null === (m = this.surveys) || void 0 === m || m.reset(), null === (b = this.featureFlags) || void 0 === b || b.reset(), null === (y = this.conversations) || void 0 === y || y.reset(), null === (w = this.logs) || void 0 === w || w.reset(), null === (S = this.metrics) || void 0 === S || S.reset(), null === (x = this.persistence) || void 0 === x || x.set_property("$user_state", "anonymous"), null === (E = this.sessionManager) || void 0 === E || E.resetSessionId(), this.Pu = null, "always" === this.config.cookieless_mode) this.register_once({
				distinct_id: yn,
				$device_id: null
			}, "");
			else {
				const i = this.config.get_device_id(or());
				this.register_once({
					distinct_id: i,
					$device_id: t ? i : h
				}, ""), t || R(d) || this.register({ [os]: d });
			}
			if (this.register({ $last_posthog_reset: (/* @__PURE__ */ new Date()).toISOString() }, 1), e) {
				if (e.distinctID && !this.pu() && (null === (C = this.persistence) || void 0 === C || C.set_property("$user_state", e.isIdentifiedID ? "identified" : "anonymous"), this.register({ distinct_id: e.distinctID })), null === (T = this.featureFlags) || void 0 === T || T.initialize(), !A(u) && !(null === (P = this.sessionManager) || void 0 === P ? void 0 : P.setBootstrapSessionId(u, !0))) {
					const t = Ei({}, e);
					delete t.sessionID, this.config.bootstrap = t;
				}
			}
			delete this.config.identity_distinct_id, delete this.config.identity_hash, delete this.config.identity_claims, p = !0;
		} finally {
			var O, I;
			f && (null === (O = this.persistence) || void 0 === O || null === (I = O.Dl) || void 0 === I || I.call(O, p));
		}
		this.reloadFeatureFlags();
	}
	shutdown(t) {
		var i = this;
		return Y(function* () {
			var t, e, s, n, r, o, l, a;
			if (i.__loaded) {
				i.Su = !0, i.Uu().dispose(), null === (t = i.sessionRecording) || void 0 === t || t.dispose(), null === (e = i.logs) || void 0 === e || e.flushLogs("sendBeacon"), null === (s = i.metrics) || void 0 === s || s.flush("sendBeacon"), null === (n = i.metrics) || void 0 === n || n.dispose(), null === (r = i.Ou) || void 0 === r || r.unload(), null === (o = i.Lu) || void 0 === o || o.unload();
				try {
					var u;
					null === (u = i.featureFlags) || void 0 === u || u.destroy();
				} catch (t) {
					Je.error("Error while destroying feature flags", t);
				}
				null === (l = i.persistence) || void 0 === l || l.destroy(), null === (a = i.sessionPersistence) || void 0 === a || a.destroy();
			} else Je.uninitializedWarning("posthog.shutdown");
		})();
	}
	setIdentity(t, i) {
		var e;
		delete this.config.identity_claims, this.config.identity_distinct_id = t, this.config.identity_hash = i, this.alias(t), null === (e = this.conversations) || void 0 === e || e.bh();
	}
	clearIdentity() {
		var t;
		delete this.config.identity_distinct_id, delete this.config.identity_hash, delete this.config.identity_claims, null === (t = this.conversations) || void 0 === t || t._h();
	}
	get_distinct_id() {
		return this.get_property("distinct_id");
	}
	getGroups() {
		return this.get_property("$groups") || {};
	}
	get_session_id() {
		var t, i;
		return null !== (t = null === (i = this.sessionManager) || void 0 === i ? void 0 : i.checkAndGetSessionAndWindowId(!0).sessionId) && void 0 !== t ? t : "";
	}
	get_session_replay_url(t) {
		if (!this.sessionManager) return "";
		const { sessionId: i, sessionStartTimestamp: e } = this.sessionManager.checkAndGetSessionAndWindowId(!0);
		let s = this.requestRouter.endpointFor("ui", `/project/${this.config.token}/replay/${i}`);
		if ((null == t ? void 0 : t.withTimestamp) && e) {
			var n;
			const i = null !== (n = t.timestampLookBack) && void 0 !== n ? n : 10;
			if (!e) return s;
			s += `?t=${Math.max(Math.floor(((/* @__PURE__ */ new Date()).getTime() - e) / 1e3) - i, 0)}`;
		}
		return s;
	}
	alias(t, i) {
		return t === this.get_property("$people_distinct_id") ? (Je.critical("Attempting to create alias for existing People user - aborting."), -2) : this.ph("posthog.alias") ? (R(i) && (i = this.get_distinct_id()), t !== i ? (this.gh(ls, t), this.capture("$create_alias", {
			alias: t,
			distinct_id: i
		})) : (Je.warn("alias matches current distinct_id - skipping api call."), this.identify(t), -1)) : void 0;
	}
	set_config(t) {
		const i = Ei({}, this.config);
		if (C(t)) {
			var e, s, n, r, o, l, a, u, h, d, c, v, f, p;
			Vn(this.config, Tu(t));
			const g = this._u();
			null === (e = this.persistence) || void 0 === e || e.update_config(this.config, i, g), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new ul(Ei(Ei({}, this.config), {}, { persistence: "sessionStorage" }), g, !1);
			const m = this.Ru(this.config.debug);
			var _;
			j(m) && (this.config.debug = m), j(this.config.debug) && (this.config.debug ? (es.DEBUG = !0, vr.Et() && vr.At("ph_debug", !0), Je.info("set_config", {
				config: t,
				oldConfig: i,
				newConfig: Ei({}, this.config)
			})) : (es.DEBUG = !1, vr.Et() && vr.Lt("ph_debug"))), null === (s = this.featureFlags) || void 0 === s || null === (n = s.updateConfig) || void 0 === n || n.call(s, this.config, this.Yl()), null === (r = this.exceptionObserver) || void 0 === r || r.onConfigChange(), null === (o = this.exceptions) || void 0 === o || o.onConfigChange(), null === (l = this.metrics) || void 0 === l || l.onConfigChange(), null === (a = this.sessionRecording) || void 0 === a || a.startIfEnabledOrStop(), null === (u = this.tracingHeaders) || void 0 === u || u.startIfEnabledOrStop(), null === (h = this.autocapture) || void 0 === h || h.startIfEnabled(), null === (d = this.heatmaps) || void 0 === d || d.startIfEnabled(), ("capture_pageview" in t || "disable_capture_url_hashes" in t) && (null === (_ = this.historyAutocapture) || void 0 === _ || _.startIfEnabledOrStop()), null === (c = this.exceptionObserver) || void 0 === c || c.startIfEnabledOrStop(), null === (v = this.deadClicksAutocapture) || void 0 === v || v.startIfEnabledOrStop(), null === (f = this.surveys) || void 0 === f || f.loadIfEnabled(), this.wu(), null === (p = this.externalIntegrations) || void 0 === p || p.startIfEnabledOrStop(), !i.segment && this.config.segment && this.persistence && yo(this, fu, !1);
		}
	}
	_overrideSDKInfo(t, i) {
		es.LIB_NAME = t, es.LIB_VERSION = i;
	}
	startSessionRecording(t) {
		const i = !0 === t, e = {
			sampling: i || !!(null == t ? void 0 : t.sampling),
			linked_flag: i || !!(null == t ? void 0 : t.linked_flag),
			url_trigger: i || !!(null == t ? void 0 : t.url_trigger),
			event_trigger: i || !!(null == t ? void 0 : t.event_trigger)
		};
		var s, n, r, o, l;
		Object.values(e).some(Boolean) && (null === (s = this.sessionManager) || void 0 === s || s.checkAndGetSessionAndWindowId(), e.sampling && (null === (n = this.sessionRecording) || void 0 === n || n.overrideSampling()), e.linked_flag && (null === (r = this.sessionRecording) || void 0 === r || r.overrideLinkedFlag()), e.url_trigger && (null === (o = this.sessionRecording) || void 0 === o || o.overrideTrigger("url")), e.event_trigger && (null === (l = this.sessionRecording) || void 0 === l || l.overrideTrigger("event")));
		this.set_config({ disable_session_recording: !1 });
	}
	stopSessionRecording() {
		this.set_config({ disable_session_recording: !0 });
	}
	sessionRecordingStarted() {
		var t;
		return !!(null === (t = this.sessionRecording) || void 0 === t ? void 0 : t.started);
	}
	captureException(t, i) {
		try {
			if (!this.exceptions) return;
			const e = this.exceptions.buildProperties(t, {
				handled: !0,
				syntheticException: /* @__PURE__ */ new Error("PostHog syntheticException")
			});
			return this.exceptions.sendExceptionEvent(Ei(Ei({}, e), i));
		} catch (t) {
			return;
		}
	}
	addExceptionStep(t, i) {
		var e;
		null === (e = this.exceptions) || void 0 === e || e.addExceptionStep(t, i);
	}
	captureLog(t) {
		var i;
		null === (i = this.logs) || void 0 === i || i.captureLog(t);
	}
	get logger() {
		var t, e;
		return null !== (t = null === (e = this.logs) || void 0 === e ? void 0 : e.logger) && void 0 !== t ? t : i.wh;
	}
	startExceptionAutocapture(t) {
		this.set_config({ capture_exceptions: null == t || t });
	}
	stopExceptionAutocapture() {
		this.set_config({ capture_exceptions: !1 });
	}
	loadToolbar(t) {
		var i, e;
		return null !== (i = null === (e = this.toolbar) || void 0 === e ? void 0 : e.loadToolbar(t)) && void 0 !== i && i;
	}
	get_property(t) {
		var i;
		return null === (i = this.persistence) || void 0 === i ? void 0 : i.props[t];
	}
	getSessionProperty(t) {
		var i;
		return null === (i = this.sessionPersistence) || void 0 === i ? void 0 : i.props[t];
	}
	toString() {
		var t;
		let i = null !== (t = this.config.name) && void 0 !== t ? t : Su;
		return i !== Su && (i = "posthog." + i), i;
	}
	_isIdentified() {
		var t, i;
		return "identified" === (null === (t = this.persistence) || void 0 === t ? void 0 : t.get_property("$user_state")) || "identified" === (null === (i = this.sessionPersistence) || void 0 === i ? void 0 : i.get_property("$user_state"));
	}
	fh() {
		var t, i;
		return !("never" === this.config.person_profiles || "identified_only" === this.config.person_profiles && !this._isIdentified() && O(this.getGroups()) && !(null === (t = this.persistence) || void 0 === t || null === (t = t.props) || void 0 === t ? void 0 : t.__alias) && !(null === (i = this.persistence) || void 0 === i || null === (i = i.props) || void 0 === i ? void 0 : i.$epp));
	}
	Xu() {
		return !0 === this.config.capture_pageleave || "if_capture_pageview" === this.config.capture_pageleave && !!this.config.capture_pageview;
	}
	createPersonProfile() {
		this.fh() || this.ph("posthog.createPersonProfile") && this.setPersonProperties({}, {});
	}
	setInternalOrTestUser() {
		this.ph("posthog.setInternalOrTestUser") && this.setPersonProperties({ $internal_or_test_user: !0 });
	}
	ph(t) {
		return "never" === this.config.person_profiles ? (Je.error(t + " was called, but process_person is set to \"never\". This call will be ignored."), !1) : (this.gu(), this.gh(bn, !0), !0);
	}
	_u() {
		if ("always" === this.config.cookieless_mode) return !0;
		const t = this.consent.isOptedOut();
		return this.config.disable_persistence || t && !(!this.config.opt_out_persistence_by_default && "on_reject" !== this.config.cookieless_mode);
	}
	wu() {
		var t, i;
		const e = this._u();
		var s, n, r;
		return this.is_capturing() || null === (s = this.logs) || void 0 === s || s.kh(), (null === (t = this.persistence) || void 0 === t ? void 0 : t.mi) !== e && (null === (n = this.persistence) || void 0 === n || n.set_disabled(e)), (null === (i = this.sessionPersistence) || void 0 === i ? void 0 : i.mi) !== e && (null === (r = this.sessionPersistence) || void 0 === r || r.set_disabled(e)), e && (this.Cu.clear(), this.dh()), e;
	}
	opt_in_capturing(t) {
		var e;
		if ("always" !== this.config.cookieless_mode) {
			if (this.pu()) {
				var s, n, r, o, l, a;
				null === (s = this.sessionRecording) || void 0 === s || s.dispose({ discardBufferedEvents: !0 }), this.yh(!0, !0), null === (n = this.sessionManager) || void 0 === n || n.destroy(), null === (r = this.pageViewManager) || void 0 === r || r.destroy(), this.sessionManager = new Ba(this), this.pageViewManager = new xo(this), this.persistence && (this.sessionPropsManager = new Da(this, this.sessionManager, this.persistence));
				const t = null !== (o = null === (l = this.config.__extensionClasses) || void 0 === l ? void 0 : l.sessionRecording) && void 0 !== o ? o : null === (a = i.__defaultExtensionClasses) || void 0 === a ? void 0 : a.sessionRecording;
				var u, h;
				t && (this.sessionRecording = this.fu(this.sessionRecording, new t(this)), this.au && (null === (u = this.sessionRecording) || void 0 === u || null === (h = u.onRemoteConfig) || void 0 === h || h.call(u, this.au)));
			}
			var d, c;
			this.consent.optInOut(!0), this.wu(), this.Qu(), null === (e = this.sessionRecording) || void 0 === e || e.startIfEnabledOrStop(), "on_reject" == this.config.cookieless_mode && (null === (d = this.surveys) || void 0 === d || d.loadIfEnabled()), (R(null == t ? void 0 : t.captureEventName) || null != t && t.captureEventName) && this.capture(null !== (c = null == t ? void 0 : t.captureEventName) && void 0 !== c ? c : "$opt_in", null == t ? void 0 : t.captureProperties, { send_instantly: !0 }), this.config.capture_pageview && this.Ju();
		} else Je.warn(pu);
	}
	opt_out_capturing() {
		if ("always" === this.config.cookieless_mode) return void Je.warn(pu);
		const t = "on_reject" === this.config.cookieless_mode ? this.sessionRecording : void 0;
		var i, e;
		t?.dispose({ discardBufferedEvents: !0 }), "on_reject" === this.config.cookieless_mode && this.consent.isOptedIn() && this.yh(!0, !0), this.consent.optInOut(!1), this.wu(), "on_reject" === this.config.cookieless_mode && (this.register({
			distinct_id: yn,
			$device_id: null
		}), this.vu(t), this.sessionRecording = void 0, null === (i = this.sessionManager) || void 0 === i || i.destroy(), null === (e = this.pageViewManager) || void 0 === e || e.destroy(), this.sessionManager = void 0, this.sessionPropsManager = void 0, this.config.capture_pageview && this.Ju(), this.Qu());
	}
	has_opted_in_capturing() {
		return this.consent.isOptedIn();
	}
	has_opted_out_capturing() {
		return this.consent.isOptedOut();
	}
	get_explicit_consent_status() {
		const t = this.consent.consent;
		return 1 === t ? "granted" : 0 === t ? "denied" : "pending";
	}
	is_capturing() {
		return "always" === this.config.cookieless_mode || ("on_reject" === this.config.cookieless_mode ? this.consent.isRejected() || this.consent.isOptedIn() : !this.has_opted_out_capturing());
	}
	clear_opt_in_out_capturing() {
		this.consent.reset(), this.wu();
	}
	_is_bot() {
		return e ? Ua(e, this.config.custom_blocked_useragents) : void 0;
	}
	Ju() {
		s && ("visible" === s.visibilityState ? this.Tu || (this.Tu = !0, this.capture(Ln, { title: s.title }, { send_instantly: !0 }), this.Mu && (s.removeEventListener(Nn, this.Mu), this.Mu = null)) : this.Mu || (this.Mu = this.Ju.bind(this), Qn(s, Nn, this.Mu)));
	}
	debug(i) {
		!1 === i ? (t?.console.log("You've disabled debug mode."), this.set_config({ debug: !1 })) : (t?.console.log("You're now in debug mode. All calls to PostHog will be logged in your console.\nYou can disable this with `posthog.debug(false)`."), this.set_config({ debug: !0 }));
	}
	Yl() {
		const t = this.Au || {};
		return "advanced_disable_flags" in t ? !!t.advanced_disable_flags : !1 !== this.config.advanced_disable_flags ? !!this.config.advanced_disable_flags : !0 === this.config.advanced_disable_decide ? (Je.warn("Config field 'advanced_disable_decide' is deprecated. Please use 'advanced_disable_flags' instead. The old field will be removed in a future major version."), !0) : function(t, i, e, s, n) {
			const r = i in t && !A(t[i]), o = e in t && !A(t[e]);
			return r ? t[i] : !!o && (n && n.warn(`Config field '${e}' is deprecated. Please use '${i}' instead. The old field will be removed in a future major version.`), t[e]);
		}(t, "advanced_disable_flags", "advanced_disable_decide", 0, Je);
	}
	Os(t) {
		var i;
		if (A(this.config.before_send)) return t;
		const e = Object.keys(null !== (i = t.properties) && void 0 !== i ? i : {}).filter(B), s = T(this.config.before_send) ? this.config.before_send : [this.config.before_send];
		let n = t;
		for (const i of s) try {
			if (n = i(n), A(n)) {
				const i = `Event '${t.event}' was rejected in beforeSend function`;
				return L(t.event) ? Je.warn(`${i}. This can cause unexpected behavior.`) : Je.info(i), null;
			}
			n.properties && !O(n.properties) || Je.warn(`Event '${t.event}' has no properties after beforeSend function, this is likely an error.`);
		} catch (i) {
			return Je.error(`Error in beforeSend function for event '${t.event}':`, i), null;
		}
		for (const i of e) if (n.properties && A(n.properties[i])) return Je.warn(`Event '${t.event}' had its '${i}' property removed in a beforeSend function. This property is required for ingestion, so the event will be dropped.`), null;
		return n;
	}
	getPageViewId() {
		var t;
		return null === (t = this.pageViewManager.Ho) || void 0 === t ? void 0 : t.pageViewId;
	}
	captureTraceFeedback(t, i) {
		this.capture("$ai_feedback", {
			$ai_trace_id: String(t),
			$ai_feedback_text: i
		});
	}
	captureTraceMetric(t, i, e) {
		this.capture("$ai_metric", {
			$ai_trace_id: String(t),
			$ai_metric_name: i,
			$ai_metric_value: String(e)
		});
	}
	Ru(t) {
		const i = j(t) && !t, e = vr.Et() && "true" === vr.Ot("ph_debug");
		return !i && (!!e || t);
	}
};
Cu.__defaultExtensionClasses = {}, Cu.wh = (() => {
	const t = () => {};
	return {
		trace: t,
		debug: t,
		info: t,
		warn: t,
		error: t,
		fatal: t
	};
})(), function(t, i) {
	for (let e = 0; i.length > e; e++) t.prototype[i[e]] = Gn(t.prototype[i[e]]);
}(Cu, ["identify"]);
var Ou = class {
	constructor(t) {
		this.disabled = !1 === t;
		const i = C(t) ? t : {};
		this.thresholdPx = i.threshold_px || 30, this.timeoutMs = i.timeout_ms || 1e3, this.clickCount = i.click_count || 3, this.clicks = [];
	}
	isRageClick(t, i, e) {
		if (this.disabled) return !1;
		const s = this.clicks[this.clicks.length - 1];
		if (s && Math.abs(t - s.x) + Math.abs(i - s.y) < this.thresholdPx && this.timeoutMs > e - s.timestamp) {
			if (this.clicks.push({
				x: t,
				y: i,
				timestamp: e
			}), this.clicks.length === this.clickCount) return !0;
		} else this.clicks = [{
			x: t,
			y: i,
			timestamp: e
		}];
		return !1;
	}
};
var Ru = "$copy_autocapture";
var Iu = Ye("[AutoCapture]");
function Fu(t, i) {
	return i.length > t ? i.slice(0, t) + "..." : i;
}
function Mu(t) {
	if (t.previousElementSibling) return t.previousElementSibling;
	let i = t;
	do
		i = i.previousSibling;
	while (i && !Rr(i));
	return i;
}
function Au(i, { e, maskAllElementAttributes: s, maskAllText: n, elementAttributeIgnoreList: r, elementsChainAsString: o, disableCaptureUrlHashes: l }) {
	var a, u;
	if (!Rr(i)) return { props: {} };
	const h = [i], d = /* @__PURE__ */ new Set([i]);
	let c = i;
	for (; c.parentNode && !Ir(c, "body") && 1e3 > h.length;) {
		if (Mr(c.parentNode)) {
			const t = c.parentNode.host;
			if (d.has(t)) break;
			d.add(t), h.push(t), c = t;
			continue;
		}
		if (!Rr(c.parentNode)) break;
		if (d.has(c.parentNode)) break;
		d.add(c.parentNode), h.push(c.parentNode), c = c.parentNode;
	}
	const v = "click" === e.type && "http://www.w3.org/2000/svg" === i.namespaceURI ? h.findIndex((t) => Ir(t, "button") || Ir(t, "a")) : -1;
	v > 0 && (n = n || h.slice(0, v + 1).some((t) => !to(t) || io(t)));
	const f = [], p = {};
	let _, g = !1, m = !1;
	if (qn(h, (t) => {
		const i = to(t);
		if (Ir(t, "a") && !s && !(null == r ? void 0 : r.includes("href"))) {
			const e = t.getAttribute("href");
			g = !!(i && e && uo(e)) && (l ? vi(e) : e);
		}
		b(Nr(t), "ph-no-capture") && (m = !0), f.push(function(t, i, e, s, n = !1) {
			const r = t.tagName.toLowerCase(), o = { tag_name: r };
			Ur.indexOf(r) > -1 && !e && (o.$el_text = "a" === r.toLowerCase() || "button" === r.toLowerCase() ? Fu(1024, ho(t)) : Fu(1024, Lr(t)));
			const l = Nr(t);
			i || null != s && s.includes("class") || 0 >= l.length || (o.classes = l.filter(function(t) {
				return "" !== t;
			})), qn(t.attributes, function(e) {
				var r;
				if ((!io(t) || -1 !== [
					"name",
					"id",
					"class",
					"aria-label"
				].indexOf(e.name)) && !(null == s ? void 0 : s.includes(e.name)) && !i && uo(e.value) && (!I(r = e.name) || "_ngcontent" !== r.substring(0, 10) && "_nghost" !== r.substring(0, 7))) {
					let t = e.value;
					"class" === e.name && (t = Ar(t).join(" ")), o["attr__" + e.name] = Fu(1024, "href" === e.name && n ? vi(t) : t);
				}
			});
			let a = 1, u = 1, h = t;
			for (; h = Mu(h);) a++, h.tagName === t.tagName && u++;
			return o.nth_child = a, o.nth_of_type = u, o;
		}(t, s, n, r, l)), qn(function(t) {
			if (!to(t)) return {};
			const i = {};
			return qn(t.attributes, function(t) {
				if (t.name && 0 === t.name.indexOf("data-ph-capture-attribute")) {
					const e = t.name.replace("data-ph-capture-attribute-", ""), s = t.value;
					e && s && uo(s) && (i[e] = s);
				}
			}), i;
		}(t), (t, i) => {
			({}).hasOwnProperty.call(p, i) || (p[i] = t);
		});
	}), m) return {
		props: {},
		explicitNoCapture: m
	};
	if (v > 0 && (i = h[v], f.splice(0, v)), n || (f[0].$el_text = Ir(i, "a") || Ir(i, "button") ? ho(i) : Lr(i)), g) {
		var y, w;
		f[0].attr__href = g;
		const i = null === (y = Oo(g)) || void 0 === y ? void 0 : y.host, e = null == t || null === (w = t.location) || void 0 === w ? void 0 : w.host;
		i && e && i !== e && (_ = g);
	}
	return {
		props: Vn((x = e.type, {
			$event_type: x,
			$ce_version: 1
		}), o ? {} : { $elements: f }, { $elements_chain: (S = f, T(S) ? function(t) {
			return t.map((t) => {
				var i, e;
				let s = "";
				if (t.tag_name && (s += t.tag_name), t.attr_class) {
					t.attr_class.sort();
					for (const i of t.attr_class) s += `.${i.replace(/"/g, "")}`;
				}
				const n = Ei(Ei(Ei(Ei({}, t.text ? { text: t.text } : {}), {}, {
					"nth-child": null !== (i = t.nth_child) && void 0 !== i ? i : 0,
					"nth-of-type": null !== (e = t.nth_of_type) && void 0 !== e ? e : 0
				}, t.href ? { href: t.href } : {}), t.attr_id ? { attr_id: t.attr_id } : {}), t.attributes), r = {};
				return Wn(n).sort(([t], [i]) => function(t, i) {
					return i > t ? -1 : t > i ? 1 : 0;
				}(t, i)).forEach(([t, i]) => r[vo(t.toString())] = vo(i.toString())), s += ":", s += Wn(r).map(([t, i]) => `${t}="${i}"`).join(""), s;
			}).join(";");
		}(function(t) {
			return t.map((t) => {
				var i, e;
				const s = {
					text: null === (i = t.$el_text) || void 0 === i ? void 0 : i.slice(0, 400),
					tag_name: t.tag_name,
					href: null === (e = t.attr__href) || void 0 === e ? void 0 : e.slice(0, 2048),
					attr_class: fo(t),
					attr_id: t.attr__id,
					nth_child: t.nth_child,
					nth_of_type: t.nth_of_type,
					attributes: {}
				};
				return Wn(t).filter(([t]) => 0 === t.indexOf("attr__")).forEach(([t, i]) => s.attributes[t] = i), s;
			});
		}(S)) : "") }, (null === (a = f[0]) || void 0 === a ? void 0 : a.$el_text) ? { $el_text: null === (u = f[0]) || void 0 === u ? void 0 : u.$el_text } : {}, _ && "click" === e.type ? { $external_click_url: _ } : {}, p),
		target: i
	};
	var S, x;
}
var Du = class {
	ho() {
		this.co = void 0, clearTimeout(this.do), this.do = void 0;
	}
	vo(t) {
		var i;
		if (!to(t)) return !0;
		const e = null !== (i = this.fo().css_selector_ignorelist) && void 0 !== i ? i : Vr, s = /* @__PURE__ */ new Set();
		let n = t;
		for (; n;) {
			if (s.size >= 1e3 || s.has(n)) return !0;
			s.add(n);
			const t = n, i = Nr(t);
			if (b(i, "ph-no-capture") || b(i, "ph-sensitive") || io(t) || e.some((i) => zr(t, i))) return !0;
			const r = n.parentNode;
			n = Mr(r) ? r.host : r && Rr(r) ? r : null;
		}
		return !1;
	}
	po(t) {
		if (!this.isEnabled || "pointercancel" === t.type) return void this.ho();
		if ("pointerdown" === t.type) {
			this.ho();
			const e = Br(t);
			var i;
			t.isPrimary && 0 === t.button && !t.ctrlKey && e && Rr(e) && (this.co = {
				target: e,
				excluded: this.vo(e),
				id: t.pointerId,
				x: t.clientX,
				y: t.clientY,
				released: !1,
				distinctId: null === (i = this.mo) || void 0 === i ? void 0 : i.distinctId
			});
			return;
		}
		const e = this.co;
		e && (t.pointerId !== e.id || Math.abs(t.clientX - e.x) > 5 || Math.abs(t.clientY - e.y) > 5 ? this.ho() : "pointerup" === t.type && (e.released = !0, this.do = setTimeout(() => this.ho(), 0)));
	}
	yo(t) {
		var i;
		const e = this.co;
		this.ho();
		const n = Br(t);
		if ((null == e ? void 0 : e.released) && e.target.isConnected && e.distinctId === (null === (i = this.mo) || void 0 === i ? void 0 : i.distinctId) && t.pointerId === e.id && (t.detail > 0 || "touch" === t.pointerType || "pen" === t.pointerType) && 0 === t.button && 5 >= Math.abs(t.clientX - e.x) && 5 >= Math.abs(t.clientY - e.y) && n && (Ir(n, "html") || Ir(n, "body"))) {
			var r;
			if (e.excluded) return null;
			const t = null !== (r = this.fo().css_selector_ignorelist) && void 0 !== r ? r : Vr;
			return [
				n,
				null == s ? void 0 : s.documentElement,
				null == s ? void 0 : s.body
			].some((i) => {
				if (!i) return !1;
				const e = Nr(i);
				return b(e, "ph-no-capture") || b(e, "ph-sensitive") || !to(i) || io(i) || t.some((t) => zr(i, t));
			}) ? null : e.target;
		}
	}
	constructor(t) {
		this.bo = t, this.name = "autocapture", this._o = !1, this.wo = null, this.ko = !1, this.So = !1, this.Ir = {
			enabled: !1,
			rageclick: !1,
			maskAllElementAttributes: !1,
			maskAllText: !1,
			disableCaptureUrlHashes: !1,
			remoteRequestsDisabled: !1
		}, this.xo = !1, this.bo.refresh(this.Ir), this.rageclicks = new Ou(this.Ir.rageclick), this.Co = null;
	}
	setup(t) {
		this.$o(), this.mo = t;
		const i = t.onRemoteConfig(this.onRemoteConfig.bind(this));
		this.xo ? i.dispose() : (this.Io = i, this.startIfEnabled());
	}
	dispose() {
		var t;
		this.xo || (this.xo = !0, this.mo = void 0, null === (t = this.Io) || void 0 === t || t.dispose(), this.Io = void 0, this.To());
	}
	fo() {
		return this.bo.refresh(this.Ir), this.Ir;
	}
	$o() {
		var t, i;
		return this.fo(), this.Ir.url_allowlist = null === (t = this.Ir.url_allowlist) || void 0 === t ? void 0 : t.map((t) => new RegExp(t)), this.Ir.url_ignorelist = null === (i = this.Ir.url_ignorelist) || void 0 === i ? void 0 : i.map((t) => new RegExp(t)), this.Ir;
	}
	Mo() {
		if (!this.isBrowserSupported()) return void Iu.info("Disabling Automatic Event Collection because this browser is not supported");
		if (!t || !s) return;
		const i = this.Eo = (i) => {
			i = i || (null == t ? void 0 : t.event);
			try {
				if ("blur" === i.type) return void this.ho();
				if (0 === i.type.indexOf("pointer")) return void this.po(i);
				const t = "click" === i.type ? this.yo(i) : void 0;
				if (M(t)) return;
				this.Po(i, "$autocapture", t);
			} catch (t) {
				Iu.error("Failed to capture event", t);
			}
		};
		if (Qn(t, "blur", i), Qn(s, "submit", i, { capture: !0 }), Qn(s, "change", i, { capture: !0 }), Qn(s, "click", i, { capture: !0 }), qn([
			"pointerdown",
			"pointermove",
			"pointerup",
			"pointercancel"
		], (t) => {
			Qn(s, t, i, { capture: !0 });
		}), this.fo().capture_copied_text) {
			const i = this.Ro = (i) => {
				i = i || (null == t ? void 0 : t.event);
				try {
					this.Po(i, Ru);
				} catch (t) {
					Iu.error("Failed to capture clipboard event", t);
				}
			};
			Qn(s, "copy", i, { capture: !0 }), Qn(s, "cut", i, { capture: !0 }), Qn(s, "paste", i, { capture: !0 });
		}
	}
	To() {
		this.ho(), this.Eo && (t?.removeEventListener("blur", this.Eo), qn([
			"pointerdown",
			"pointermove",
			"pointerup",
			"pointercancel"
		], (t) => {
			s?.removeEventListener(t, this.Eo, !0);
		}), s?.removeEventListener("submit", this.Eo, !0), s?.removeEventListener("change", this.Eo, !0), s?.removeEventListener("click", this.Eo, !0), this.Eo = void 0), this.Ro && (s?.removeEventListener("copy", this.Ro, !0), s?.removeEventListener("cut", this.Ro, !0), s?.removeEventListener("paste", this.Ro, !0), this.Ro = void 0), this._o = !1;
	}
	startIfEnabled() {
		this.isEnabled || this.ho(), !this.xo && this.mo && this.isEnabled && !this._o && (this.Mo(), this._o = !0);
	}
	onRemoteConfig(t) {
		if (this.xo) return;
		if (this.ko = !0, !t.ok) return void this.startIfEnabled();
		const i = t.config;
		i.elementsChainAsString && (this.So = i.elementsChainAsString);
		const e = i.autocapture_opt_out;
		var s;
		j(e) && (null === (s = this.mo) || void 0 === s || s.kv.set("$autocapture_disabled_server_side", e), this.wo = e), this.startIfEnabled();
	}
	setElementSelectors(t) {
		this.Co = t;
	}
	getElementSelectors(t, i) {
		var e;
		const n = [];
		return null === (e = this.Co) || void 0 === e || e.forEach((e) => {
			(null == s ? void 0 : s.querySelectorAll(e))?.forEach((s) => {
				t !== s && i !== s || b(n, e) || n.push(e);
			});
		}), n;
	}
	get isEnabled() {
		var t, i;
		if (this.xo) return !1;
		const e = null === (t = this.mo) || void 0 === t ? void 0 : t.kv.get(fs), s = this.wo, n = this.fo();
		if (!n.remoteRequestsDisabled && !this.ko) return !1;
		const r = n.remoteRequestsDisabled && !this.ko;
		if (M(s) && !j(e) && !r) return !1;
		const o = null !== (i = this.wo) && void 0 !== i ? i : !!e;
		return !!n.enabled && !o;
	}
	Po(i, e = "$autocapture", s) {
		if (!this.isEnabled) return void this.ho();
		let n = s || Br(i);
		Fr(n) && (n = n.parentNode || null);
		const r = this.$o();
		var o;
		"$autocapture" === e && "click" === i.type && i instanceof MouseEvent && r.rageclick && null !== (o = this.rageclicks) && void 0 !== o && o.isRageClick(i.clientX, i.clientY, i.timeStamp || (/* @__PURE__ */ new Date()).getTime()) && Xr(n, r.rageclick) && this.Po(i, "$rageclick", s);
		const l = e === Ru, a = l ? Ei(Ei({}, r), {}, { dom_event_allowlist: void 0 }) : r;
		if (n && function(i, e, s, n, r, o) {
			var l;
			if (!t || Qr(i)) return !1;
			if ((null == s ? void 0 : s.url_allowlist) && !Dr(s.url_allowlist, o)) return !1;
			if ((null == s ? void 0 : s.url_ignorelist) && Dr(s.url_ignorelist, o)) return !1;
			if (null == s ? void 0 : s.dom_event_allowlist) {
				const t = s.dom_event_allowlist;
				if (t && !t.some((t) => e.type === t)) return !1;
			}
			const { parentIsUsefulElement: a, targetElementList: u } = Zr(i, n);
			if (!function(t, i) {
				const e = null == i ? void 0 : i.element_allowlist;
				if (R(e)) return !0;
				for (const i of t) if (e.some((t) => i.tagName.toLowerCase() === t)) return !0;
				return !1;
			}(u, s)) return !1;
			if (!Hr(u, null == s ? void 0 : s.css_selector_allowlist)) return !1;
			if (Hr(u, null !== (l = null == s ? void 0 : s.css_selector_ignorelist) && void 0 !== l ? l : Vr)) return !1;
			try {
				const s = t.getComputedStyle(i);
				if (s && "pointer" === s.getPropertyValue("cursor") && "click" === e.type) return !0;
			} catch (t) {}
			const h = i.tagName.toLowerCase();
			switch (h) {
				case "html": return !1;
				case "form": return (r || ["submit"]).indexOf(e.type) >= 0;
				case "input":
				case "select":
				case "textarea": return (r || ["change", "click"]).indexOf(e.type) >= 0;
				default: return a ? (r || ["click"]).indexOf(e.type) >= 0 : (r || ["click"]).indexOf(e.type) >= 0 && (Ur.indexOf(h) > -1 || "true" === i.getAttribute("contenteditable"));
			}
		}(n, i, a, l, l ? [
			"copy",
			"cut",
			"paste"
		] : void 0, { config: { get_current_url: r.getCurrentUrl } })) {
			var u;
			const { props: s, explicitNoCapture: o, target: l } = Au(n, {
				e: i,
				maskAllElementAttributes: r.maskAllElementAttributes,
				maskAllText: r.maskAllText,
				elementAttributeIgnoreList: r.element_attribute_ignorelist,
				elementsChainAsString: this.So,
				disableCaptureUrlHashes: r.disableCaptureUrlHashes
			});
			if (o) return !1;
			const a = this.getElementSelectors(n, l);
			if (a && a.length > 0 && (s.$element_selectors = a), e === Ru) {
				const e = i.type || "clipboard";
				if ("paste" !== e) {
					var h, d;
					const i = null == t || null === (h = t.getSelection()) || void 0 === h ? void 0 : h.toString(), e = jr(i);
					if (!e) return !1;
					s.$selected_content = e, s.$clipboard_text_length = null !== (d = null == i ? void 0 : i.length) && void 0 !== d ? d : 0;
				}
				s.$copy_type = e;
			}
			return null === (u = this.mo) || void 0 === u || u.capture(e, s).catch((t) => Iu.error("Failed to capture event", t)), !0;
		}
	}
	isBrowserSupported() {
		return P(null == s ? void 0 : s.querySelectorAll);
	}
};
var Nu = class {
	constructor(t) {
		this._instance = t;
	}
	refresh(t) {
		const i = this._instance.config, e = C(i.autocapture) ? i.autocapture : void 0;
		t.enabled = !!i.autocapture, t.rageclick = i.rageclick, t.maskAllElementAttributes = i.mask_all_element_attributes, t.maskAllText = i.mask_all_text, t.disableCaptureUrlHashes = i.disable_capture_url_hashes, t.getCurrentUrl = i.get_current_url, t.remoteRequestsDisabled = this._instance.Yl(), t.url_allowlist = null == e ? void 0 : e.url_allowlist, t.url_ignorelist = null == e ? void 0 : e.url_ignorelist, t.dom_event_allowlist = null == e ? void 0 : e.dom_event_allowlist, t.element_allowlist = null == e ? void 0 : e.element_allowlist, t.css_selector_allowlist = null == e ? void 0 : e.css_selector_allowlist, t.css_selector_ignorelist = null == e ? void 0 : e.css_selector_ignorelist, t.element_attribute_ignorelist = null == e ? void 0 : e.element_attribute_ignorelist, t.capture_copied_text = null == e ? void 0 : e.capture_copied_text;
	}
};
var ju = Ye("[ExceptionAutocapture]");
var Lu = () => {};
var Bu = (t) => {
	var i;
	if (P(t)) return null !== (i = t.__posthog_layer__) && void 0 !== i ? i : t.__rrweb_layer__;
};
function Uu(t, i, e) {
	try {
		if (!(i in t)) return Lu;
		const s = { next: t[i] }, n = e(function(...t) {
			return s.next.apply(this, t);
		});
		return P(n) && (n.prototype = n.prototype || {}, Object.defineProperties(n, {
			__posthog_wrapped__: {
				enumerable: !1,
				value: !0
			},
			__posthog_layer__: {
				enumerable: !1,
				value: s
			}
		})), t[i] = n, () => {
			if (t[i] === n) return void (t[i] = s.next);
			let e = t[i], r = Bu(e);
			for (; r;) {
				if (r.next === n) return void (r.next = s.next);
				e = r.next, r = Bu(e);
			}
		};
	} catch (t) {
		return Lu;
	}
}
var zu = Ye("[TracingHeaders]");
var Hu = Ye("[Web Vitals]");
var qu = 9e5;
var Vu = [
	"CLS",
	"FCP",
	"INP",
	"LCP"
];
var Wu = ["INP", "LCP"];
var Gu = [
	"interactionTarget",
	"interactionType",
	"inputDelay",
	"processingDuration",
	"presentationDelay",
	"loadState",
	"target",
	"url",
	"timeToFirstByte",
	"resourceLoadDelay",
	"resourceLoadDuration",
	"elementRenderDelay",
	"largestShiftTarget",
	"largestShiftTime",
	"largestShiftValue",
	"firstByteToFCP"
];
var Ku = "disabled";
var Ju = "lazy_loading";
var Yu = Ye("[SessionRecording]");
var Xu = Ye("[Heatmaps]");
function Qu(t) {
	return C(t) && "clientX" in t && "clientY" in t && D(t.clientX) && D(t.clientY);
}
var Zu = Ye("[Product Tours]");
var th = (t) => {
	var i;
	return !t.config.disable_product_tours && !!(null === (i = t.persistence) || void 0 === i ? void 0 : i.get_property(ws));
};
var ih = ["$set_once", "$set"];
var eh = Ye("[SiteApps]");
var sh = "Error while initializing PostHog app with config id ";
var nh = (t, i) => (null == t ? void 0 : t.then) ? t.then(i) : i(t);
var rh = "SDK is not enabled or survey functionality is not yet loaded";
var oh = "Disabled. Not loading surveys.";
var lh = class {
	constructor(t, i) {
		this.bo = t, this.Sh = i, this.name = "surveys", this._surveyEventReceiver = null, this._surveyManager = null, this.xh = !1, this.Ch = [], this.$h = null, this.Ih = null, this.xo = !1, this.Th = /* @__PURE__ */ new Set(), this.onRemoteConfig = (t) => {
			if (this.xo) return;
			if (this.Ir.disableSurveys) return;
			if (!t.ok) return iu.warn("Remote config unavailable. Not loading surveys.");
			const i = t.config.surveys;
			if (A(i)) return iu.warn("Flags not loaded yet. Not loading surveys.");
			this.Mh = j(i) ? i : i.length > 0, iu.info(`flags response received, isSurveysEnabled: ${this.Mh}`), this.loadIfEnabled();
		};
	}
	setup(t) {
		if (!this.xo) return this.Eh = t, nh(t.kv.initialize(), () => {
			if (this.Eh !== t || this.xo) return;
			this.Eh = void 0, this.mo = t;
			const i = t.onRemoteConfig(this.onRemoteConfig);
			this.xo ? i.dispose() : (this.Io = i, this.loadIfEnabled());
		});
	}
	dispose() {
		var t, i, e, s;
		this.xo || (this.xo = !0, this.Eh = void 0, this.mo = void 0, null === (t = this.Io) || void 0 === t || t.dispose(), this.Io = void 0, null === (i = this._surveyEventReceiver) || void 0 === i || i.dispose(), this._surveyEventReceiver = null, null === (e = this._surveyManager) || void 0 === e || null === (s = e.dispose) || void 0 === s || s.call(e), this._surveyManager = null, this.Ch = [], this.$h = null, this.Th.forEach((t) => clearTimeout(t)), this.Th.clear());
	}
	get Ir() {
		return this.bo.get();
	}
	initialize() {
		this.loadIfEnabled();
	}
	reset() {
		try {
			var t;
			null === (t = this._surveyEventReceiver) || void 0 === t || t.reset(), localStorage.removeItem("lastSeenSurveyDate");
			const i = [];
			for (let t = 0; t < localStorage.length; t++) {
				const e = localStorage.key(t);
				(null != e && e.startsWith("seenSurvey_") || null != e && e.startsWith("inProgressSurvey_")) && i.push(e);
			}
			i.forEach((t) => localStorage.removeItem(t));
		} catch (t) {}
	}
	loadIfEnabled() {
		if (this.xo || !this.mo) return;
		const t = this.Ir;
		if (this._surveyManager) return;
		if (this.xh) return void iu.info("Already initializing surveys, skipping...");
		if (t.disableSurveys) return void iu.info(oh);
		if (t.cookielessMode && this.bo.isOptedOut()) return void iu.info("Not loading surveys in cookieless mode without consent.");
		const i = this.bo.getExtensions();
		if (!i) return void iu.error("PostHog Extensions not found.");
		if (R(this.Mh) && !t.advancedEnableSurveys) return;
		const e = this.Mh || t.advancedEnableSurveys;
		this.xh = !0;
		try {
			const t = i.generateSurveys;
			if (t) return this.Ph(t, e), void (this.xh = !1);
			const s = i.loadExternalDependency;
			if (!s) return this.Rh(Fn), void (this.xh = !1);
			s((t) => {
				try {
					if (this.xo) return;
					const i = this.bo.getExtensions();
					t || !(null == i ? void 0 : i.generateSurveys) ? this.Rh("Could not load surveys script", t) : this.Ph(i.generateSurveys, e);
				} finally {
					this.xh = !1;
				}
			});
		} catch (t) {
			throw this.xh = !1, this.Rh("Error initializing surveys", t), t;
		}
	}
	Ph(t, i) {
		this.xo || (this._surveyManager = t(i), this._surveyEventReceiver = this.bo.createEventReceiver(), iu.info("Surveys loaded successfully"), this.Ah({ isLoaded: !0 }));
	}
	Rh(t, i) {
		iu.error(t, i), this.Ah({
			isLoaded: !1,
			error: t
		});
	}
	onSurveysLoaded(t) {
		return this.Ch.push(t), this._surveyManager && this.Ah({ isLoaded: !0 }), () => {
			this.Ch = this.Ch.filter((i) => i !== t);
		};
	}
	getSurveys(t, i = !1) {
		var e;
		const s = null !== (e = this.mo) && void 0 !== e ? e : this.Sh;
		if (!s || this.xo) return;
		if (this.Ir.disableSurveys) return iu.info(oh), t([]);
		const n = s.kv.get(Ys);
		if (n && !i) return t(n, { isLoaded: !0 }), void (this.Fh() && this.getSurveys(() => {}, !0));
		if (this.$h) return void this.$h.then(({ surveys: i, context: e }) => {
			this.xo || t(i, e);
		}).catch((t) => iu.error("Error in survey callback", t));
		const r = this.Oh("/api/surveys/", {
			method: "GET",
			query: { token: s.projectToken },
			sentAt: "query",
			timeoutMs: this.Ir.requestTimeoutMs
		}).then((t) => {
			try {
				return this.Dh(s, t);
			} catch (t) {
				return iu.error("Error processing surveys response", t), this.Dh(s, {
					statusCode: 0,
					error: t
				});
			}
		}, (t) => this.Dh(s, {
			statusCode: 0,
			error: t
		}));
		this.$h = r;
		const o = () => {
			this.$h === r && (this.$h = null);
		};
		r.then((i) => {
			o(), this.xo || t(i.surveys, i.context);
		}, o).catch((t) => iu.error("Error in survey callback", t));
	}
	Oh(t, i) {
		const e = this.mo;
		return e ? e.sendRequest(t, i) : new Promise((t) => t({
			statusCode: 0,
			error: /* @__PURE__ */ new Error(rh)
		}));
	}
	Dh(t, i) {
		if (this.xo) return {
			surveys: [],
			context: {
				isLoaded: !1,
				error: rh
			}
		};
		const e = i.statusCode;
		if (200 !== e || !i.json) {
			const t = `Surveys API could not be loaded, status: ${e}`;
			return 0 !== e ? iu.error(t) : i.error || iu.warn(t), this.Ih = Date.now(), {
				surveys: [],
				context: {
					isLoaded: !1,
					error: t
				}
			};
		}
		this.Ih = null;
		const s = i.json.surveys || [], n = s.filter((t) => function(t) {
			return !(!t.start_date || t.end_date);
		}(t) && (qa(t) || function(t) {
			var i;
			return !!(null === (i = t.conditions) || void 0 === i || null === (i = i.actions) || void 0 === i || null === (i = i.values) || void 0 === i ? void 0 : i.length);
		}(t)));
		var r;
		return n.length > 0 && (null === (r = this._surveyEventReceiver) || void 0 === r || r.register(n)), t.kv.set({
			[Ys]: s,
			[Xs]: Date.now()
		}), {
			surveys: s,
			context: { isLoaded: !0 }
		};
	}
	Fh() {
		return this.Lh() && !this.$h && !this.Nh();
	}
	Lh() {
		var t, i;
		const e = null === (t = null !== (i = this.mo) && void 0 !== i ? i : this.Sh) || void 0 === t ? void 0 : t.kv.get(Xs);
		return D(e) && Date.now() - e > 3e5;
	}
	Nh() {
		return D(this.Ih) && 3e5 > Date.now() - this.Ih;
	}
	markSurveyAsSeen(t, i) {
		var e;
		eu({
			id: t,
			current_iteration: null !== (e = null == i ? void 0 : i.iteration) && void 0 !== e ? e : null
		});
		try {
			localStorage.setItem("lastSeenSurveyDate", (/* @__PURE__ */ new Date()).toISOString());
		} catch (t) {}
	}
	Ah(t) {
		for (const i of this.Ch) try {
			if (!t.isLoaded) return i([], t);
			this.getSurveys(i);
		} catch (t) {
			iu.error("Error in survey callback", t);
		}
	}
	getActiveMatchingSurveys(t, i = !1) {
		if (!A(this._surveyManager)) return this._surveyManager.getActiveMatchingSurveys(t, i);
		iu.warn("init was not called");
	}
	qh(t) {
		let i = null;
		return this.getSurveys((e) => {
			var s;
			i = null !== (s = e.find((i) => i.id === t)) && void 0 !== s ? s : null;
		}), i;
	}
	jh(t) {
		if (A(this._surveyManager)) return {
			eligible: !1,
			reason: rh
		};
		const i = "string" == typeof t ? this.qh(t) : t;
		return i ? this._surveyManager.checkSurveyEligibility(i) : {
			eligible: !1,
			reason: "Survey not found"
		};
	}
	Bh(t) {
		if (!this.bo.isCapturing()) return {
			eligible: !1,
			reason: "PostHog is not capturing, so a survey response cannot be recorded"
		};
		if (A(this._surveyManager)) return {
			eligible: !1,
			reason: rh
		};
		const i = "string" == typeof t ? this.qh(t) : t;
		return i ? this._surveyManager.checkSurveyRenderability(i) : {
			eligible: !1,
			reason: "Survey not found"
		};
	}
	canRenderSurvey(t) {
		if (A(this._surveyManager)) return iu.warn("init was not called"), {
			visible: !1,
			disabledReason: rh
		};
		const i = this.Bh(t);
		return {
			visible: i.eligible,
			disabledReason: i.reason
		};
	}
	canRenderSurveyAsync(t, i) {
		return A(this._surveyManager) ? (iu.warn("init was not called"), Promise.resolve({
			visible: !1,
			disabledReason: rh
		})) : new Promise((e) => {
			this.getSurveys((i) => {
				var s;
				const n = null !== (s = i.find((i) => i.id === t)) && void 0 !== s ? s : null;
				if (n) {
					const t = this.Bh(n);
					e({
						visible: t.eligible,
						disabledReason: t.reason
					});
				} else e({
					visible: !1,
					disabledReason: "Survey not found"
				});
			}, i);
		});
	}
	renderSurvey(t, i, e) {
		var n;
		if (!this.bo.isCapturing()) return;
		if (A(this._surveyManager)) return void iu.warn("init was not called");
		const r = "string" == typeof t ? this.qh(t) : t;
		if (!(null == r ? void 0 : r.id)) return void iu.warn("Survey not found");
		if (!su.includes(r.type)) return void iu.warn(`Surveys of type ${r.type} cannot be rendered in the app`);
		const o = null == s ? void 0 : s.querySelector(i);
		if (o) {
			if (null === (n = r.appearance) || void 0 === n ? void 0 : n.surveyPopupDelaySeconds) {
				iu.info(`Rendering survey ${r.id} with delay of ${r.appearance.surveyPopupDelaySeconds} seconds`);
				const t = setTimeout(() => {
					var i, s;
					this.Th.delete(t), !this.xo && this.bo.isCapturing() && (iu.info(`Rendering survey ${r.id} with delay of ${null === (i = r.appearance) || void 0 === i ? void 0 : i.surveyPopupDelaySeconds} seconds`), null === (s = this._surveyManager) || void 0 === s || s.renderSurvey(r, o, e), iu.info(`Survey ${r.id} rendered`));
				}, 1e3 * r.appearance.surveyPopupDelaySeconds);
				this.Th.add(t);
				return;
			}
			this._surveyManager.renderSurvey(r, o, e);
		} else iu.warn("Survey element not found");
	}
	displaySurvey(t, i) {
		var e;
		if (!this.bo.isCapturing()) return;
		if (A(this._surveyManager)) return void iu.warn("init was not called");
		const s = this.qh(t);
		if (!s) return void iu.warn("Survey not found");
		let n = s;
		if (null !== (e = s.appearance) && void 0 !== e && e.surveyPopupDelaySeconds && i.ignoreDelay && (n = Ei(Ei({}, s), {}, { appearance: Ei(Ei({}, s.appearance), {}, { surveyPopupDelaySeconds: 0 }) })), i.displayType !== wl.Popover && i.initialResponses && iu.warn("initialResponses is only supported for popover surveys. prefill will not be applied."), !1 === i.ignoreConditions) {
			const t = this.jh(s);
			if (!t.eligible) return void iu.warn("Survey is not eligible to be displayed: ", t.reason);
		}
		i.displayType !== wl.Inline ? this._surveyManager.handlePopoverSurvey(n, i) : this.renderSurvey(n, i.selector, i.properties);
	}
	cancelPendingSurvey(t) {
		A(this._surveyManager) ? iu.warn("init was not called") : this._surveyManager.cancelSurvey(t);
	}
	handlePageUnload() {
		var t, i;
		null === (t = this._surveyManager) || void 0 === t || null === (i = t.handlePageUnload) || void 0 === i || i.call(t);
	}
};
function ah(t, i, e) {
	if (A(t)) return !1;
	switch (e) {
		case "exact": return t === i;
		case "contains": {
			const e = i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/_/g, ".").replace(/%/g, ".*");
			return new RegExp(e, "i").test(t);
		}
		case "regex": try {
			return new RegExp(i).test(t);
		} catch (t) {
			return !1;
		}
		default: return !1;
	}
}
var uh = class {
	constructor(t) {
		this._instance = t, this.Hh = /* @__PURE__ */ new Set(), this.zh = /* @__PURE__ */ new Set(), this.Uh = new Na(), this.Wh = (t, i) => this.Vh(t, i) && this.Gh(t, i) && this.Zh(t, i) && this.Qh(t, i), this.Vh = (t, i) => !(null == i ? void 0 : i.event) || (null == t ? void 0 : t.event) === (null == i ? void 0 : i.event);
	}
	init() {
		var t, i;
		R(null === (t = this._instance) || void 0 === t ? void 0 : t._addCaptureHook) || (this.Jh = null === (i = this._instance) || void 0 === i ? void 0 : i._addCaptureHook((t, i) => {
			this.on(t, i);
		}));
	}
	dispose() {
		var t;
		null === (t = this.Jh) || void 0 === t || t.call(this), this.Jh = void 0, this.Uh = new Na();
	}
	register(t) {
		var i, e;
		if (!R(null === (i = this._instance) || void 0 === i ? void 0 : i._addCaptureHook) && (t.forEach((t) => {
			var i;
			this.Hh.add(t), null === (i = t.steps) || void 0 === i || i.forEach((t) => {
				this.zh.add((null == t ? void 0 : t.event) || "");
			});
		}), null === (e = this._instance) || void 0 === e ? void 0 : e.autocapture)) {
			const t = /* @__PURE__ */ new Set();
			this.Hh.forEach((i) => {
				var e;
				null === (e = i.steps) || void 0 === e || e.forEach((i) => {
					null != i && i.selector && t.add(i.selector);
				});
			}), this._instance.autocapture.setElementSelectors(t);
		}
	}
	replace(t) {
		this.Hh.clear(), this.zh.clear(), this.register(t);
	}
	on(t, i) {
		null != i && 0 != t.length && (this.zh.has(t) || this.zh.has(i.event)) && this.Hh.forEach((t) => {
			this.Kh(i, t) && this.Uh.emit("actionCaptured", t.name);
		});
	}
	Xh(t) {
		this.onAction("actionCaptured", (i) => t(i));
	}
	Kh(t, i) {
		if (null == (null == i ? void 0 : i.steps)) return !1;
		for (const e of i.steps) if (this.Wh(t, e)) return !0;
		return !1;
	}
	onAction(t, i) {
		return this.Uh.on(t, i);
	}
	Gh(t, i) {
		if (null == i ? void 0 : i.url) {
			var e;
			const s = null == t || null === (e = t.properties) || void 0 === e ? void 0 : e.$current_url;
			if (!s || "string" != typeof s) return !1;
			if (!ah(s, i.url, i.url_matching || "contains")) return !1;
		}
		return !0;
	}
	Zh(t, i) {
		return !!this.Yh(t, i) && !!this.tc(t, i) && !!this.ec(t, i);
	}
	Yh(t, i) {
		var e;
		if (!(null == i ? void 0 : i.href)) return !0;
		const s = this.nc(t);
		if (s.length > 0) return s.some((t) => ah(t.href, i.href, i.href_matching || "exact"));
		const n = (null == t || null === (e = t.properties) || void 0 === e ? void 0 : e.$elements_chain) || "";
		return !!n && ah(function(t) {
			const i = t.match(/(?::|")href="(.*?)"/);
			return i ? i[1] : "";
		}(n), i.href, i.href_matching || "exact");
	}
	tc(t, i) {
		var e;
		if (!(null == i ? void 0 : i.text)) return !0;
		const s = this.nc(t);
		if (s.length > 0) return s.some((t) => ah(t.text, i.text, i.text_matching || "exact") || ah(t.$el_text, i.text, i.text_matching || "exact"));
		const n = (null == t || null === (e = t.properties) || void 0 === e ? void 0 : e.$elements_chain) || "";
		return !!n && (r = function(t) {
			const i = [], e = /(?::|")text="(.*?)"/g;
			let s;
			for (; !A(s = e.exec(t));) i.includes(s[1]) || i.push(s[1]);
			return i;
		}(n), o = i.text, l = i.text_matching || "exact", r.some((t) => ah(t, o, l)));
		var r, o, l;
	}
	ec(t, i) {
		var e, s;
		if (!(null == i ? void 0 : i.selector)) return !0;
		const n = null == t || null === (e = t.properties) || void 0 === e ? void 0 : e.$element_selectors;
		if (null == n ? void 0 : n.includes(i.selector)) return !0;
		const r = (null == t || null === (s = t.properties) || void 0 === s ? void 0 : s.$elements_chain) || "";
		if (i.selector_regex && r) try {
			return new RegExp(i.selector_regex).test(r);
		} catch (t) {
			return !1;
		}
		return !1;
	}
	nc(t) {
		var i;
		return null == (null == t || null === (i = t.properties) || void 0 === i ? void 0 : i.$elements) ? [] : null == t ? void 0 : t.properties.$elements;
	}
	Qh(t, i) {
		return !(null == i ? void 0 : i.properties) || 0 === i.properties.length || Ka(i.properties.reduce((t, i) => {
			const e = T(i.value) ? i.value.map(String) : null != i.value ? [String(i.value)] : [];
			return t[i.key] = {
				values: e,
				operator: i.operator || "exact"
			}, t;
		}, {}), null == t ? void 0 : t.properties);
	}
};
var hh = class {
	constructor(t) {
		var i, e;
		this.sc = [], this._instance = t, this.rc = /* @__PURE__ */ new Map(), this.oc = /* @__PURE__ */ new Map(), this.lc = /* @__PURE__ */ new Map(), this.ac = null === (i = this._instance) || void 0 === i || null === (e = i.onSessionId) || void 0 === e ? void 0 : e.call(i, (t) => this.uc(t));
	}
	hc(t) {
		return !1;
	}
	cc() {
		return null;
	}
	dc(t) {}
	vc() {}
	fc(t, i) {
		return !!t && Ka(t.propertyFilters, null == i ? void 0 : i.properties);
	}
	gc(t, i) {
		const e = /* @__PURE__ */ new Map();
		return t.forEach((t) => {
			var s;
			null === (s = t.conditions) || void 0 === s || null === (s = s[i]) || void 0 === s || null === (s = s.values) || void 0 === s || s.forEach((i) => {
				if (null == i ? void 0 : i.name) {
					const s = e.get(i.name) || [];
					s.push(t.id), e.set(i.name, s);
				}
			});
		}), e;
	}
	mc(t, i, e) {
		const s = (e === dl.Activation ? this.rc : this.oc).get(t);
		let n = [];
		return this.yc((t) => {
			n = t.filter((t) => null == s ? void 0 : s.includes(t.id));
		}), n.filter((s) => {
			var n;
			const r = null === (n = s.conditions) || void 0 === n || null === (n = n[e]) || void 0 === n || null === (n = n.values) || void 0 === n ? void 0 : n.find((i) => i.name === t);
			return this.fc(r, i);
		});
	}
	register(t) {
		this.bc(t, !1);
	}
	replace(t) {
		this.bc(t, !0);
	}
	bc(t, i) {
		var e;
		R(null === (e = this._instance) || void 0 === e ? void 0 : e._addCaptureHook) || (this._c(t, i), this.wc(t, i));
	}
	wc(t, i) {
		const e = t.filter((t) => {
			var i;
			return null === (i = t.conditions) || void 0 === i || null === (i = i.actions) || void 0 === i || null === (i = i.values) || void 0 === i ? void 0 : i.length;
		});
		var s;
		if (i && this.lc.clear(), 0 === e.length) return void (i && (null === (s = this.kc) || void 0 === s || s.replace([])));
		this.kc || (this.kc = new uh(this._instance), this.kc.init(), this.kc.Xh((t) => this.onAction(t)));
		const n = [];
		e.forEach((t) => {
			var i;
			null === (i = t.conditions) || void 0 === i || null === (i = i.actions) || void 0 === i || i.values.forEach((i) => {
				if (n.push(i), i.name) {
					var e;
					const s = null !== (e = this.lc.get(i.name)) && void 0 !== e ? e : [];
					s.includes(t.id) || s.push(t.id), this.lc.set(i.name, s);
				}
			});
		}), i ? this.kc.replace(n) : this.kc.register(n);
	}
	Sc(t, i) {
		i.forEach((i, e) => {
			var s;
			const n = null !== (s = t.get(e)) && void 0 !== s ? s : [];
			i.forEach((t) => {
				n.includes(t) || n.push(t);
			}), t.set(e, n);
		});
	}
	_c(t, i) {
		var e, s;
		const n = t.filter((t) => {
			var i, e;
			return (null === (i = t.conditions) || void 0 === i ? void 0 : i.events) && (null === (e = t.conditions) || void 0 === e || null === (e = e.events) || void 0 === e || null === (e = e.values) || void 0 === e ? void 0 : e.length) > 0;
		}), r = t.filter((t) => {
			var i, e;
			return (null === (i = t.conditions) || void 0 === i ? void 0 : i.cancelEvents) && (null === (e = t.conditions) || void 0 === e || null === (e = e.cancelEvents) || void 0 === e || null === (e = e.values) || void 0 === e ? void 0 : e.length) > 0;
		}), o = this.gc(t, dl.Activation), l = this.gc(t, dl.Cancellation);
		i ? (this.rc = o, this.oc = l) : (this.Sc(this.rc, o), this.Sc(this.oc, l)), (0 !== n.length || 0 !== r.length) && (null !== (e = this.Jh) && void 0 !== e || (this.Jh = null === (s = this._instance) || void 0 === s ? void 0 : s._addCaptureHook((t, i) => {
			this.onEvent(t, i);
		})));
	}
	onEvent(t, i) {
		var e, s;
		const n = this.xc(), r = (null == i || null === (e = i.properties) || void 0 === e ? void 0 : e.$survey_id) || (null == i || null === (s = i.properties) || void 0 === s ? void 0 : s.$product_tour_id);
		if (r && this.getActivatedIds().includes(r)) {
			const i = this.Cc(t, r);
			if ("consume" === i) return n.info("event consumed activated item, removing it", {
				event: t,
				itemId: r
			}), void this.$c([r]);
			if ("persist" === i) return n.info("shown item promoted to persisted activation", {
				event: t,
				itemId: r
			}), this.Ic(r), void this.Tc([r]);
		}
		if (this.oc.has(t)) {
			const e = this.mc(t, i, dl.Cancellation);
			e.length > 0 && (n.info("cancel event matched, cancelling items", {
				event: t,
				itemsToCancel: e.map((t) => t.id)
			}), this.$c(e.map((t) => t.id)), e.forEach((t) => this.Mc(t.id)));
		}
		if (!this.rc.has(t)) return;
		n.info("event name matched", {
			event: t,
			eventPayload: i,
			items: this.rc.get(t)
		});
		const o = this.mc(t, i, dl.Activation);
		this.Ec(o.map((t) => t.id));
	}
	onAction(t) {
		this.lc.has(t) && this.Ec(this.lc.get(t) || []);
	}
	Ec(t) {
		var i, e;
		if (0 === t.length) return;
		const s = !!(null === (i = this._instance) || void 0 === i || null === (e = i.get_session_id) || void 0 === e ? void 0 : e.call(i)), n = [];
		for (const i of t) s && this.hc(i) ? this.Ic(i) && this.Pc(i) : n.push(i);
		n.length > 0 && (this.sc = [.../* @__PURE__ */ new Set([...this.sc, ...n])]), this.xc().info("updating activated items", { activatedItems: this.getActivatedIds() });
	}
	Ic(t) {
		this.sc = this.sc.filter((i) => i !== t);
		const i = this.Rc();
		return !i.includes(t) && (this.Ac([...i, t]), this.Fc(), !0);
	}
	$c(t) {
		const i = new Set(t);
		this.sc = this.sc.filter((t) => !i.has(t));
		const e = this.Oc(), s = e.filter((t) => !i.has(t));
		s.length !== e.length && (this.Ac(s), 0 === s.length && this.Dc()), this.Tc(t);
	}
	Lc() {
		var t;
		const i = this.cc();
		if (!i) return {};
		const e = null === (t = this._instance) || void 0 === t || null === (t = t.persistence) || void 0 === t ? void 0 : t.props[i];
		return e && "object" == typeof e ? e : {};
	}
	Pc(t) {
		if (!this.cc()) return;
		const i = this.Lc();
		this.dc(Ei(Ei({}, i), {}, { [t]: Date.now() }));
	}
	Tc(t) {
		if (!this.cc()) return;
		const i = this.Lc(), e = {};
		let s = !1;
		for (const [n, r] of Object.entries(i)) t.includes(n) ? s = !0 : e[n] = r;
		s && (O(e) ? this.vc() : this.dc(e));
	}
	Nc() {
		this.cc() && this.vc();
	}
	getActivationTimestamp(t) {
		if (!this.Rc().includes(t)) return;
		const i = this.Lc()[t];
		return D(i) ? i : void 0;
	}
	Oc() {
		var t;
		const i = this.qc();
		return (null === (t = this._instance) || void 0 === t || null === (t = t.persistence) || void 0 === t ? void 0 : t.props[i]) || [];
	}
	Rc() {
		var t, i, e;
		const s = this.Oc();
		if (0 === s.length) return [];
		const n = null === (t = this._instance) || void 0 === t || null === (t = t.persistence) || void 0 === t ? void 0 : t.props[this.jc()], r = null === (i = this._instance) || void 0 === i || null === (e = i.get_session_id) || void 0 === e ? void 0 : e.call(i);
		return r && n === r ? s : [];
	}
	Fc() {
		var t, i;
		const e = null === (t = this._instance) || void 0 === t || null === (i = t.get_session_id) || void 0 === i ? void 0 : i.call(t);
		e && this.Bc(e);
	}
	Dc() {
		this.Hc();
	}
	uc(t) {
		var i;
		const e = null === (i = this._instance) || void 0 === i || null === (i = i.persistence) || void 0 === i ? void 0 : i.props[this.jc()];
		if (e && e !== t) {
			const t = this.Oc(), i = this.Lc();
			t.length > 0 && (this.Ac([]), t.filter((t) => D(i[t])).forEach((t) => this.Mc(t))), this.Dc(), this.Nc();
		}
	}
	getActivatedIds() {
		return [.../* @__PURE__ */ new Set([...this.Rc(), ...this.sc])].filter((t) => !this.zc(t));
	}
	dispose() {
		var t, i, e;
		null === (t = this.ac) || void 0 === t || t.call(this), this.ac = void 0, null === (i = this.Jh) || void 0 === i || i.call(this), this.Jh = void 0, null === (e = this.kc) || void 0 === e || e.dispose(), this.kc = void 0;
	}
	reset() {
		this.sc = [], this.Oc().length > 0 && this.Ac([]), this.Dc(), this.Nc();
	}
	getEventToItemsMap() {
		return this.rc;
	}
	Uc() {
		return this.kc;
	}
};
var dh = class extends hh {
	constructor(t) {
		super(t);
	}
	qc() {
		return Qs;
	}
	jc() {
		return Zs;
	}
	cc() {
		return tn;
	}
	dc(t) {
		var i;
		null === (i = this._instance) || void 0 === i || null === (i = i.persistence) || void 0 === i || i.register({ $surveys_activated_timestamps: t });
	}
	vc() {
		var t;
		null === (t = this._instance) || void 0 === t || null === (t = t.persistence) || void 0 === t || t.unregister("$surveys_activated_timestamps");
	}
	hc(t) {
		var i;
		let e;
		this.yc((i) => {
			e = i.find((i) => i.id === t);
		});
		const s = null == e || null === (i = e.appearance) || void 0 === i ? void 0 : i.surveyPopupDelaySeconds;
		return D(s) && s > 0;
	}
	Wc() {
		return bl.SHOWN;
	}
	yc(t) {
		var i;
		null === (i = this._instance) || void 0 === i || i.getSurveys(t);
	}
	Mc(t) {
		var i;
		null === (i = this._instance) || void 0 === i || i.cancelPendingSurvey(t);
	}
	xc() {
		return iu;
	}
	Ac(t) {
		var i;
		null === (i = this._instance) || void 0 === i || null === (i = i.persistence) || void 0 === i || i.register({ $surveys_activated: t });
	}
	Bc(t) {
		var i;
		null === (i = this._instance) || void 0 === i || null === (i = i.persistence) || void 0 === i || i.register({ $surveys_activated_session: t });
	}
	Hc() {
		var t;
		null === (t = this._instance) || void 0 === t || null === (t = t.persistence) || void 0 === t || t.unregister("$surveys_activated_session");
	}
	zc() {
		return !1;
	}
	Cc(t, i) {
		let e;
		return this.yc((t) => {
			e = t.find((t) => t.id === i);
		}), !e || function(t) {
			var i;
			return qa(t) && !!(null === (i = t.conditions) || void 0 === i || null === (i = i.events) || void 0 === i ? void 0 : i.repeatedActivation) || "always" === t.schedule;
		}(e) ? t === bl.SHOWN ? "consume" : "ignore" : t === bl.SHOWN ? "persist" : t === bl.DISMISSED || t === bl.SENT ? "consume" : "ignore";
	}
	getSurveys() {
		return this.getActivatedIds();
	}
	getEventToSurveys() {
		return this.getEventToItemsMap();
	}
};
var ch = class {
	constructor(t) {
		this._instance = t;
	}
	initialize() {}
	get(t) {
		if ("string" == typeof t) return this._instance.get_property(t);
		const i = {};
		for (const e of t) {
			const t = this._instance.get_property(e);
			R(t) || (i[e] = t);
		}
		return i;
	}
	set(t, i) {
		this._instance.register("string" == typeof t ? { [t]: i } : t);
	}
	remove(t) {
		"string" != typeof t ? t.forEach((t) => this._instance.unregister(t)) : this._instance.unregister(t);
	}
};
var vh = class {
	constructor(t) {
		this._instance = t;
	}
	get() {
		const t = this._instance.config;
		return {
			disableSurveys: t.disable_surveys,
			cookielessMode: !!t.cookieless_mode,
			advancedEnableSurveys: t.advanced_enable_surveys,
			requestTimeoutMs: t.surveys_request_timeout_ms
		};
	}
	isOptedOut() {
		return this._instance.consent.isOptedOut();
	}
	isCapturing() {
		return this._instance.is_capturing();
	}
	getExtensions() {
		const t = null == c ? void 0 : c.__PosthogExtensions__;
		if (!t) return;
		const { generateSurveys: i, loadExternalDependency: e } = t;
		return {
			generateSurveys: i ? (t) => i(this._instance, t) : void 0,
			loadExternalDependency: e ? (t) => e(this._instance, "surveys", t) : void 0
		};
	}
	createEventReceiver() {
		return new dh(this._instance);
	}
};
var fh = (null == t ? void 0 : t.location) ? Fo(t.location.hash, "__posthog") || Fo(location.hash, "state") : null;
var ph = "_postHogToolbarParams";
var _h = Ye("[Toolbar]");
var gh = Ye("[FeatureFlags]");
var mh = class {
	constructor(t, i = !1) {
		this.Vc = !1, this.update(t, i);
	}
	update(t, i) {
		this.Gc = ((t, i) => {
			var e, s, n, r, o, l, a;
			return {
				bootstrap: {
					featureFlags: null !== (e = null === (s = t.bootstrap) || void 0 === s ? void 0 : s.featureFlags) && void 0 !== e ? e : void 0,
					featureFlagPayloads: null !== (n = null === (r = t.bootstrap) || void 0 === r ? void 0 : r.featureFlagPayloads) && void 0 !== n ? n : void 0
				},
				remoteRequestsDisabled: i,
				featureFlagsDisabled: !!t.advanced_disable_feature_flags,
				onlyEvaluateSurveyFeatureFlags: !!t.advanced_only_evaluate_survey_feature_flags,
				deduplicateCallsPerSession: !!t.advanced_feature_flags_dedup_per_session,
				cacheTtlMs: t.feature_flag_cache_ttl_ms,
				refreshIntervalMs: null !== (o = t.remote_config_refresh_interval_ms) && void 0 !== o ? o : 3e5,
				idleRefreshBackoff: R(t.remote_config_refresh_interval_ms),
				requestTimeoutMs: t.feature_flag_request_timeout_ms,
				compression: t.disable_compression ? void 0 : "best-available",
				evaluationContexts: null !== (l = null !== (a = t.evaluation_contexts) && void 0 !== a ? a : t.evaluation_environments) && void 0 !== l ? l : [],
				flagKeys: T(t.flag_keys) ? t.flag_keys : void 0
			};
		})(t, i), !t.evaluation_environments || t.evaluation_contexts || this.Vc || (gh.warn("evaluation_environments is deprecated. Use evaluation_contexts instead. evaluation_environments will be removed in a future version."), this.Vc = !0), R(t.flag_keys) || T(t.flag_keys) || gh.error("Invalid flag_keys found:", t.flag_keys, "Expected array of non-empty strings");
	}
	get() {
		return this.Gc;
	}
};
var bh = Ye("[FeatureFlags]");
var yh = Ye("[FeatureFlags]", { debugEnabled: !0 });
var wh = "\" failed. Feature flags didn't load in time.";
var $h = [
	"click",
	"keydown",
	"wheel",
	"touchstart",
	"pointerdown"
];
var Sh = "connection_error";
var xh = (t) => {
	const i = {};
	for (let e = 0; t.length > e; e++) i[t[e]] = !0;
	return i;
};
var Eh = (t) => {
	const i = {};
	for (const [e, s] of Wn(t || {})) s && (i[e] = s);
	return i;
};
var kh = (t) => H(t) && ("RangeError" === t.name && 0 === t.message.indexOf("Maximum call stack size exceeded") || "InternalError" === t.name && "too much recursion" === t.message);
var Th = Ye("[Error tracking]");
var Ph = "webkit-masked-url:";
var Ch = [{
	value: "isolatedAPI.contexts.topHostname",
	exact: !1
}, {
	value: "No response from target",
	exact: !0
}];
var Oh = [
	"chrome-extension://",
	"moz-extension://",
	"safari-extension:",
	"safari-web-extension:",
	Ph
];
var Rh = ["__firefox__", "__gCrWeb"];
var Ih = "Refusing to render web experiment since the viewer is a likely bot";
var Fh = {
	icontains: (t, i) => i.toLowerCase().indexOf(t.toLowerCase()) > -1,
	not_icontains: (t, i) => -1 === i.toLowerCase().indexOf(t.toLowerCase()),
	regex: (t, i) => Va(i, t),
	not_regex: (t, i) => !Va(i, t),
	exact: (t, i) => i === t,
	is_not: (t, i) => i !== t
};
var Mh = Ye("[Conversations]");
var Ah = "Conversations not available yet.";
function Dh(t, i) {
	var s, n, r, o, l, a, u;
	const h = null !== (s = null == t ? void 0 : t.flushIntervalMs) && void 0 !== s ? s : 3e3, d = null !== (n = null == t ? void 0 : t.maxBufferSize) && void 0 !== n ? n : 100, c = (null == i ? void 0 : i.consoleCapture) ? void 0 : null !== (r = null == t ? void 0 : t.maxLogsPerInterval) && void 0 !== r ? r : 1e3, v = R(c) ? Math.max(d, 2048) : Math.max(d, c), f = Ei(Ei({}, function() {
		let t = "", i = "";
		try {
			const s = null == e ? void 0 : e.userAgent;
			s && ([t, i] = Zt(s));
		} catch (t) {}
		return function(t, i) {
			const e = function(t) {
				if (t) return {}.hasOwnProperty.call(Fe, t) ? Fe[t] : t;
			}(t);
			return Ei(Ei({}, e ? { "os.name": e } : {}), i ? { "os.version": i } : {});
		}(t, i);
	}()), null == t ? void 0 : t.resourceAttributes);
	return {
		serviceName: null !== (o = null !== (l = null == f ? void 0 : f["service.name"]) && void 0 !== l ? l : null == t ? void 0 : t.serviceName) && void 0 !== o ? o : null == i ? void 0 : i.serviceNameDefault,
		serviceVersion: null !== (a = null == f ? void 0 : f["service.version"]) && void 0 !== a ? a : null == t ? void 0 : t.serviceVersion,
		environment: null !== (u = null == f ? void 0 : f["deployment.environment"]) && void 0 !== u ? u : null == t ? void 0 : t.environment,
		resourceAttributes: f,
		beforeSend: null == t ? void 0 : t.beforeSend,
		flushIntervalMs: h,
		maxBufferSize: d,
		maxQueueSize: v,
		maxBatchRecordsPerPost: 100,
		rateCapWindowMs: h,
		maxLogsPerInterval: c,
		backgroundFlushBudgetMs: 0,
		terminationFlushBudgetMs: 0
	};
}
var Nh = [
	"debug",
	"log",
	"warn",
	"error",
	"info"
];
var jh = (t) => {
	for (; null == t ? void 0 : t.__rrweb_original__;) t = t.__rrweb_original__;
	return t;
};
var Lh = "console";
var Bh = "__posthogHandledLogsRequestError";
var Uh = (t, i) => {
	const e = t instanceof Error ? t : new Error(i);
	return e[Bh] = !0, e;
};
var zh = (t) => !!t && "object" == typeof t && !0 === t[Bh];
var Hh = Ye("[NetworkMetrics]");
var qh = () => {
	var i;
	return (null == t || null === (i = t.performance) || void 0 === i ? void 0 : i.now) ? t.performance.now() : Date.now();
};
var Vh = (t) => t ? `${Math.floor(t / 100)}xx` : "missing";
var Wh = (t, i) => {
	var e;
	const s = String(i);
	return {
		method: String(t).toUpperCase(),
		url: (null === (e = Oo(s)) || void 0 === e ? void 0 : e.href) || s
	};
};
var Gh = (t, i, e, s, n) => {
	try {
		var r, o, l;
		const u = n();
		if (!u) return;
		const h = e || void 0, d = qh() - s, c = Oo(i.url);
		if (c && "http:" !== c.protocol && "https:" !== c.protocol) return;
		const v = {
			url: (null == c ? void 0 : c.href) || i.url,
			method: i.method
		}, f = P(u.name) ? u.name(v) : I(u.name) ? u.name : "http.client.request.duration";
		if (!f) return;
		const p = Ei({
			method: v.method,
			host: null !== (r = null == c ? void 0 : c.hostname) && void 0 !== r ? r : "",
			path: c ? (a = c.pathname, a.split("/").map((t) => ((t) => /^\d+$/.test(t) || t.length >= 8 && /^[0-9a-f-]*\d[0-9a-f-]*$/i.test(t))(t) ? ":id" : t).join("/")) : "",
			status_class: Vh(h)
		}, null === (o = u.attributes) || void 0 === o ? void 0 : o.call(u, v, {
			status: h,
			durationMs: d
		}));
		null === (l = t.metrics) || void 0 === l || l.histogram(f, d, {
			unit: "ms",
			attributes: p
		});
	} catch (t) {
		Hh.error("Failed to record network metric", t);
	}
	var a;
};
var Kh = () => {};
var Jh = (i, e) => P(null == t ? void 0 : t.fetch) ? Uu(t, "fetch", (t) => function(...s) {
	const n = qh(), r = t.apply(this, s);
	if (!e()) return r;
	try {
		var o, l, a;
		const [t, u] = s, h = Wh(null !== (o = null !== (l = null == u ? void 0 : u.method) && void 0 !== l ? l : null == t ? void 0 : t.method) && void 0 !== o ? o : "GET", null !== (a = null == t ? void 0 : t.url) && void 0 !== a ? a : t);
		return r.then((t) => (Gh(i, h, null == t ? void 0 : t.status, n, e), t), (t) => {
			throw Gh(i, h, void 0, n, e), t;
		});
	} catch (t) {
		return Hh.error("Failed to observe fetch", t), r;
	}
}) : Kh;
var Yh = (i, e) => {
	var s;
	const n = null == t || null === (s = t.XMLHttpRequest) || void 0 === s ? void 0 : s.prototype;
	if (!n) return Kh;
	const r = /* @__PURE__ */ new WeakMap(), o = Uu(n, "open", (t) => function(...i) {
		try {
			(() => da.has(this))() || r.set(this, Wh(i[0], i[1]));
		} catch (t) {
			Hh.error("Failed to observe XHR open", t);
		}
		return t.apply(this, i);
	}), l = Uu(n, "send", (t) => function(...s) {
		let n;
		try {
			const t = r.get(this);
			if (t && e()) {
				const s = qh();
				n = () => {
					this.removeEventListener("loadend", n), Gh(i, t, this.status, s, e);
				}, Qn(this, "loadend", n);
			}
		} catch (t) {
			Hh.error("Failed to observe XHR send", t);
		}
		try {
			return t.apply(this, s);
		} catch (t) {
			throw n && this.removeEventListener("loadend", n), t;
		}
	});
	return () => {
		o(), l();
	};
};
var Xh = { featureFlags: class {
	constructor(t) {
		this.name = "featureFlags", this.Zc = !1, this.featureFlagEventHandlers = [], this.$ = bh, this.Qc = {}, this.Jc = {}, this.Kc = [], this.Xc = !1, this.Yc = !1, this.td = 0, this.ed = !1, this.nd = !1, this.sd = !1, this.rd = !1, this.od = 0, this.ld = !1, this.an = () => {
			const t = this.ad();
			this.od = 0, t && this.reloadFeatureFlags();
		}, this.ud = () => {
			var t, i;
			const e = this.hd, n = null !== (t = this.dd) && void 0 !== t ? t : e;
			R(e) || R(n) || this.Ir.remoteRequestsDisabled || !s || "hidden" === s.visibilityState || Date.now() - (null !== (i = this.vd) && void 0 !== i ? i : 0) < n || (this.dd = this.ld || !this.Ir.idleRefreshBackoff ? e : Math.min(2 * n, 36e5), this.ld = !1, this.reloadFeatureFlags(), this.fd());
		}, this.pd = () => {
			this.ld && this.dd === this.hd || this.gd();
		}, this.ln = () => {
			"visible" === (null == s ? void 0 : s.visibilityState) && this.gd();
		}, "get" in t ? this.bo = t : (this._instance = t, this.md = new mh(t.config, t.Yl()), this.bo = this.md);
	}
	updateConfig(t, i) {
		var e;
		null === (e = this.md) || void 0 === e || e.update(t, i), this.mo && this.yd();
	}
	setup(t) {
		return this.Eh = t, this.$ = t.logger.createLogger("[FeatureFlags]"), nh(t.kv.initialize(), () => {
			this.Eh === t && (this.Eh = void 0, this.mo = t, this.bd(t));
		});
	}
	bd(i) {
		var e;
		if (this.mo === i) return t && Qn(t, "online", this.an), this.yd(), this._d = i.registerDynamicEventProperties(() => this.wd() ? this.Qc : this.Jc), this.kd = null === (e = this._instance) || void 0 === e || null === (e = e.persistence) || void 0 === e ? void 0 : e.onCrossTabFeatureFlagChange(() => {
			this.Sd(), this.xd(), this.Cd();
		}), this.xd(), this.initialize();
	}
	gd() {
		this.ld = !0, this.dd = this.hd, this.ud();
	}
	yd() {
		const t = this.Ir.refreshIntervalMs, i = !this.Ir.remoteRequestsDisabled && s && !R(t) && t > 0 ? t : void 0;
		this.Ir.idleRefreshBackoff || (this.dd = i), i !== this.hd && (this.$d(), R(i) || (this.hd = i, this.dd = i, this.fd(), null != s && s.addEventListener && (Qn(s, Nn, this.ln), Hn($h, (t) => {
			Qn(s, t, this.pd, { capture: !0 });
		}))));
	}
	fd() {
		R(this.hd) || (R(this.Id) || clearInterval(this.Id), this.vd = Date.now(), this.Id = setInterval(this.ud, this.hd));
	}
	$d() {
		var t;
		R(this.Id) || (clearInterval(this.Id), this.Id = void 0, null == s || null === (t = s.removeEventListener) || void 0 === t || t.call(s, "visibilitychange", this.ln), Hn($h, (t) => {
			var i;
			null == s || null === (i = s.removeEventListener) || void 0 === i || i.call(s, t, this.pd, { capture: !0 });
		})), this.hd = void 0, this.dd = void 0, this.ld = !1, this.vd = void 0;
	}
	destroy() {
		this.Td();
	}
	dispose() {
		this.Td();
	}
	Td() {
		var i, e;
		this.$d(), this.td++, this.nd = !1, this.Eh = void 0, this.mo && (this.Md(), null === (i = this._d) || void 0 === i || i.dispose(), this._d = void 0, null === (e = this.kd) || void 0 === e || e.call(this), this.kd = void 0, this.Kc = [], t?.removeEventListener("online", this.an), this.mo = void 0);
	}
	get Ir() {
		return this.bo.get();
	}
	Ed(t) {
		var i;
		return this.Pd && t in this.Pd ? this.Pd[t] : null === (i = this.mo) || void 0 === i ? void 0 : i.kv.get(t);
	}
	Sd() {
		return !!this.Pd && (this.Pd = void 0, !0);
	}
	Rd() {
		var t;
		return !R(null === (t = this.mo) || void 0 === t ? void 0 : t.kv.get("$enabled_feature_flags")) && this.Sd();
	}
	At(t) {
		this.Ad(() => {
			var i;
			return null === (i = this.mo) || void 0 === i ? void 0 : i.kv.set(t);
		});
	}
	Fd(t, i, e) {
		var s;
		if (!(null === (s = this._instance) || void 0 === s ? void 0 : s.persistence) || !t.$enabled_feature_flags) return;
		const n = this.Ed("$enabled_feature_flags") || {}, r = t.$enabled_feature_flags || {}, o = i.flags || i.featureFlags, l = i.flags ? Object.entries(i.flags).filter(([, t]) => !(null == t ? void 0 : t.failed)).map(([t]) => t) : [], a = !!i.errorsWhileComputingFlags && !!i.flags, u = a ? l : e && !T(o) ? Object.keys(o || {}) : Array.from(/* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(r)])), h = this.Ed("$feature_flag_payloads") || {}, d = t.$feature_flag_payloads || {}, c = a || e ? u : Array.from(/* @__PURE__ */ new Set([...Object.keys(h), ...Object.keys(d)])), v = !a && !e, f = !!v || u, p = !!v || c, _ = {
			[Ls]: f,
			[js]: f,
			[zs]: p
		};
		t.$feature_flag_details && (_[Us] = f);
		for (const i of [
			Hs,
			cn,
			qs
		]) R(t[i]) || (_[i] = !0);
		this._instance.persistence.markCrossTabFeatureFlagChanges(_);
	}
	Lt(t) {
		this.Ad(() => {
			var i;
			return null === (i = this.mo) || void 0 === i ? void 0 : i.kv.remove(t);
		});
	}
	Ad(t) {
		try {
			t();
		} catch (t) {
			this.$.error("Failed to update feature flag persistence", t);
		}
	}
	xd() {
		const t = {};
		for (const i of [
			Ls,
			zs,
			Hs,
			Vs
		]) {
			const e = this.Ed(i);
			R(e) || (t[i] = e);
		}
		this.Qc = t;
		const i = Ei({}, t), e = this.Ed(js);
		if (e) for (const [t, s] of Object.entries(e)) i[`$feature/${t}`] = s;
		this.Jc = i;
	}
	wd() {
		const t = this.Ir.cacheTtlMs;
		if (!t || 0 >= t) return !1;
		const i = this.Ed(cn);
		return "number" != typeof i || Date.now() - i > t;
	}
	Od() {
		return !!this.wd() && (this.rd || this.Yc || (this.rd = !0, this.$.warn("Feature flag cache is stale, triggering refresh..."), this.reloadFeatureFlags()), !0);
	}
	Dd() {
		const t = this.Ir.evaluationContexts;
		return (null == t ? void 0 : t.length) ? t.filter((t) => {
			const i = t && "string" == typeof t && t.trim().length > 0;
			return i || this.$.error("Invalid evaluation context found:", t, "Expected non-empty string"), i;
		}) : [];
	}
	Ld() {
		const t = this.Ir.flagKeys;
		if (!R(t)) return t.filter((t) => {
			const i = t && "string" == typeof t && t.trim().length > 0;
			return i || this.$.error("Invalid flag key found:", t, "Expected non-empty string"), i;
		});
	}
	initialize() {
		var t, i;
		const e = this.Ir, s = null !== (t = null === (i = e.bootstrap) || void 0 === i ? void 0 : i.featureFlags) && void 0 !== t ? t : {};
		if (Object.keys(s).length) {
			var n, r;
			const t = null !== (n = null === (r = e.bootstrap) || void 0 === r ? void 0 : r.featureFlagPayloads) && void 0 !== n ? n : {}, i = Object.keys(s).filter((t) => !R(s[t])).reduce((t, i) => (t[i] = s[i], t), {}), o = Object.keys(t).filter((t) => i[t]).reduce((i, e) => (i[e] = t[e], i), {});
			return this.Nd({
				featureFlags: i,
				featureFlagPayloads: o
			}, void 0, { persist: !1 });
		}
	}
	updateFlags(t, i, e) {
		var s, n;
		const r = (null == e ? void 0 : e.merge) && null !== (s = this.Ed("$enabled_feature_flags")) && void 0 !== s ? s : {}, o = (null == e ? void 0 : e.merge) && null !== (n = this.Ed("$feature_flag_payloads")) && void 0 !== n ? n : {}, l = Ei(Ei({}, r), t), a = Ei(Ei({}, o), i), u = {};
		for (const [t, i] of Object.entries(l)) u[t] = {
			key: t,
			enabled: ce(i),
			variant: ve(i),
			reason: void 0,
			metadata: R(null == a ? void 0 : a[t]) ? void 0 : {
				id: 0,
				version: void 0,
				description: void 0,
				payload: a[t]
			}
		};
		this.Nd({ flags: u });
	}
	get hasLoadedFlags() {
		return this.Xc;
	}
	getFlags() {
		return Object.keys(this.getFlagVariants());
	}
	getFlagsWithDetails() {
		const t = this.Ed(Us), i = this.Ed(Vs), e = this.Ed(Ws);
		if (!e && !i) return t || {};
		const s = Vn({}, t || {}), n = [.../* @__PURE__ */ new Set([...Object.keys(e || {}), ...Object.keys(i || {})])];
		for (const t of n) {
			var r;
			const n = s[t], l = null == i ? void 0 : i[t], a = R(l) ? null !== (r = null == n ? void 0 : n.enabled) && void 0 !== r && r : !!l, u = R(l) ? null == n ? void 0 : n.variant : "string" == typeof l ? l : void 0, h = null == e ? void 0 : e[t], d = Ei(Ei({}, n), {}, {
				enabled: a,
				variant: a ? null != u ? u : null == n ? void 0 : n.variant : void 0
			});
			var o;
			a !== (null == n ? void 0 : n.enabled) && (d.original_enabled = null == n ? void 0 : n.enabled), u !== (null == n ? void 0 : n.variant) && (d.original_variant = null == n ? void 0 : n.variant), h && (d.metadata = Ei(Ei({}, null == n ? void 0 : n.metadata), {}, {
				payload: h,
				original_payload: null == n || null === (o = n.metadata) || void 0 === o ? void 0 : o.payload
			})), s[t] = d;
		}
		return this.Zc || (this.$.warn(" Overriding feature flag details!", {
			flagDetails: t,
			overriddenPayloads: e,
			finalDetails: s
		}), this.Zc = !0), s;
	}
	getAllFeatureFlags() {
		const t = this.getFlagVariants(), i = this.getFlagPayloads();
		return Object.keys(t).map((e) => {
			const s = t[e];
			return {
				key: e,
				enabled: ce(s),
				variant: ve(s),
				payload: de(i[e])
			};
		});
	}
	getFlagVariants() {
		const t = this.Ed(js), i = this.Ed(Vs);
		if (!i) return t || {};
		const e = Vn({}, t || {}), s = Object.keys(i);
		for (let t = 0; s.length > t; t++) e[s[t]] = i[s[t]];
		return this.Zc || (this.$.warn(" Overriding feature flags!", {
			enabledFlags: t,
			overriddenFlags: i,
			finalFlags: e
		}), this.Zc = !0), e;
	}
	getFlagPayloads() {
		const t = this.Ed(zs), i = this.Ed(Ws);
		if (!i) return t || {};
		const e = Vn({}, t || {}), s = Object.keys(i);
		for (let t = 0; s.length > t; t++) e[s[t]] = i[s[t]];
		return this.Zc || (this.$.warn(" Overriding feature flag payloads!", {
			flagPayloads: t,
			overriddenPayloads: i,
			finalPayloads: e
		}), this.Zc = !0), e;
	}
	reloadFeatureFlags() {
		this.ed || this.Ir.featureFlagsDisabled || this.ad() || (this.Yc && (this.nd = !0), this.qd || (this.Kc.slice().forEach((t) => {
			try {
				t();
			} catch (t) {
				this.$.error("Error while running feature flags reloading callback", t);
			}
		}), this.qd = setTimeout(() => {
			this.jd();
		}, 5)));
	}
	Md() {
		clearTimeout(this.qd), this.qd = void 0;
	}
	onReloading(t) {
		return this.Kc.push(t), () => {
			this.Kc = this.Kc.filter((i) => i !== t);
		};
	}
	ensureFlagsLoaded() {
		this.Xc || this.Yc || this.qd || this.reloadFeatureFlags();
	}
	setAnonymousDistinctId(t) {
		this.$anon_distinct_id = t;
	}
	setReloadingPaused(t) {
		this.ed = t;
	}
	resetFlagCallReported() {
		this.Lt(un);
	}
	jd(t) {
		this.Md();
		const i = this.mo;
		if (!i || this.Ir.remoteRequestsDisabled || this.ad()) return;
		if (this.Yc) return void (this.nd = !0);
		const e = {
			token: i.projectToken,
			distinct_id: i.distinctId,
			groups: i.groups,
			$anon_distinct_id: this.$anon_distinct_id,
			person_properties: Ei(Ei(Ei({}, i.initialPersonProperties), this.Ed("$stored_person_properties") || {}), {}, {
				$lib: i.library.name,
				$lib_version: i.library.version
			}),
			group_properties: this.Ed(Ks),
			timezone: Jo()
		};
		R(i.deviceId) || (e.$device_id = i.deviceId), (null != t && t.disableFlags || this.Ir.featureFlagsDisabled) && (e.disable_flags = !0);
		const s = this.Dd();
		s.length && (e.evaluation_contexts = s);
		const n = this.Ld();
		R(n) || (e.flag_keys = n);
		const r = this.Ir.onlyEvaluateSurveyFeatureFlags, o = "/flags/?v=2" + (r ? "&only_evaluate_survey_feature_flags=true" : ""), l = this.td;
		this.Yc = !0;
		const a = () => {
			this.nd && (this.nd = !1, this.jd());
		}, u = (t) => {
			var i, s;
			const n = null !== (i = t.json) && void 0 !== i ? i : {}, o = 200 !== t.statusCode;
			if (this.Yc = !1, l !== this.td) return void a();
			if (this.Bd(t.statusCode), o || this.nd || (this.$anon_distinct_id = void 0), e.disable_flags && !this.nd) return;
			this.sd = !o;
			const u = [];
			t.error ? u.push(t.error instanceof Error && "AbortError" === t.error.name ? "timeout" : t.error instanceof Error ? Sh : "unknown_error") : 200 !== t.statusCode && u.push(`api_error_${t.statusCode}`), n.errorsWhileComputingFlags && u.push("errors_while_computing_flags");
			const h = !!(null === (s = n.quotaLimited) || void 0 === s ? void 0 : s.includes("feature_flags"));
			h && u.push("quota_limited"), this.At({ [dn]: u }), h ? this.$.warn("You have hit your feature flags quota limit, and will not be able to load feature flags until the quota is reset.  Please visit https://posthog.com/docs/billing/limits-alerts to learn more.") : e.disable_flags || this.Nd(n, o, { partialResponse: r }), a();
		}, h = (t) => {
			this.Yc = !1, l === this.td ? (this.At({ [dn]: [Sh] }), this.$.error("Feature flag request failed", t), this.Rd() && this.Cd(!0), a()) : a();
		};
		try {
			i.sendRequest(o, {
				target: "flags",
				method: "POST",
				body: e,
				compression: this.Ir.compression,
				sentAt: "body",
				timeoutMs: this.Ir.requestTimeoutMs
			}).then(u).catch(h);
		} catch (t) {
			h(t);
		}
	}
	ad() {
		return Mo(this.od, 3);
	}
	Bd(t) {
		this.od = Ao(t, this.od, 3, () => this.$.warn("Feature flag requests are failing before receiving an HTTP response; this can happen due to network issues, CORS, browser blocking, or ad blockers. Stopped refreshing feature flags; will try again when connectivity changes."));
	}
	getFeatureFlag(t, i = {}) {
		var e;
		if (i.fresh && !this.sd) return;
		if (!(this.Xc || this.getFlags() && this.getFlags().length > 0)) return void this.$.warn("getFeatureFlag for key \"" + t + wh);
		if (this.Od()) return;
		const s = this.getFeatureFlagResult(t, i);
		return null !== (e = null == s ? void 0 : s.variant) && void 0 !== e ? e : null == s ? void 0 : s.enabled;
	}
	getFeatureFlagDetails(t) {
		return this.getFlagsWithDetails()[t];
	}
	getFeatureFlagPayload(t) {
		const i = this.getFeatureFlagResult(t, { send_event: !1 });
		return null == i ? void 0 : i.payload;
	}
	getFeatureFlagResult(t, i = {}) {
		if (i.fresh && !this.sd) return;
		if (!(this.Xc || this.getFlags() && this.getFlags().length > 0)) return void this.$.warn("getFeatureFlagResult for key \"" + t + wh);
		if (this.Od()) return;
		const e = this.getFlagVariants(), s = t in e, n = e[t], r = this.getFlagPayloads()[t], o = String(n), l = this.Ed("$feature_flag_request_id") || void 0, a = this.Ed("$feature_flag_evaluated_at") || void 0;
		let u, h = this.Ed("$flag_call_reported") || {};
		if (this.Ir.deduplicateCallsPerSession) {
			var d;
			const t = null === (d = this.mo) || void 0 === d ? void 0 : d.session.sessionId, i = this.Ed(hn);
			t && t !== i && (h = {}, u = t);
		}
		if (i.send_event || !("send_event" in i)) if (t in h && h[t].includes(o)) u && this.At({
			[un]: h,
			[hn]: u
		});
		else {
			var c, v, f, p, _, g, m, b, y, w, S, x;
			T(h[t]) ? h[t].push(o) : h[t] = [o], this.At(Ei({ [un]: h }, u ? { [hn]: u } : {}));
			const i = this.getFeatureFlagDetails(t), e = [...null !== (c = this.Ed("$feature_flag_errors")) && void 0 !== c ? c : []];
			R(n) && e.push("flag_missing");
			const s = {
				$feature_flag: t,
				$feature_flag_response: n,
				$feature_flag_payload: null != r ? r : null,
				$feature_flag_request_id: l,
				$feature_flag_evaluated_at: a,
				$feature_flag_bootstrapped_response: null !== (v = null === (f = this.Ir.bootstrap) || void 0 === f || null === (f = f.featureFlags) || void 0 === f ? void 0 : f[t]) && void 0 !== v ? v : null,
				$feature_flag_bootstrapped_payload: null !== (p = null === (_ = this.Ir.bootstrap) || void 0 === _ || null === (_ = _.featureFlagPayloads) || void 0 === _ ? void 0 : _[t]) && void 0 !== p ? p : null,
				$used_bootstrap_value: !this.sd
			};
			R(null == i || null === (g = i.metadata) || void 0 === g ? void 0 : g.has_experiment) || (s.$feature_flag_has_experiment = i.metadata.has_experiment), R(null == i || null === (m = i.metadata) || void 0 === m ? void 0 : m.version) || (s.$feature_flag_version = i.metadata.version);
			const d = null !== (b = null == i || null === (y = i.reason) || void 0 === y ? void 0 : y.description) && void 0 !== b ? b : null == i || null === (w = i.reason) || void 0 === w ? void 0 : w.code;
			var E;
			d && (s.$feature_flag_reason = d), null != i && null !== (S = i.metadata) && void 0 !== S && S.id && (s.$feature_flag_id = i.metadata.id), R(null == i ? void 0 : i.original_variant) && R(null == i ? void 0 : i.original_enabled) || (s.$feature_flag_original_response = R(i.original_variant) ? i.original_enabled : i.original_variant), null != i && null !== (x = i.metadata) && void 0 !== x && x.original_payload && (s.$feature_flag_original_payload = null == i || null === (E = i.metadata) || void 0 === E ? void 0 : E.original_payload), e.length && (s.$feature_flag_error = e.join(",")), this.Hd(s);
		}
		else u && this.At({
			[un]: h,
			[hn]: u
		});
		return s ? {
			key: t,
			enabled: !!n,
			variant: "string" == typeof n ? n : void 0,
			payload: de(r)
		} : void 0;
	}
	Hd(t) {
		try {
			var i;
			null === (i = this.mo) || void 0 === i || i.capture("$feature_flag_called", t).catch((t) => {
				this.$.error("Failed to capture feature flag call", t);
			});
		} catch (t) {
			this.$.error("Failed to capture feature flag call", t);
		}
	}
	getRemoteConfigPayload(t, i) {
		this.zd(t, i);
	}
	zd(t, i) {
		var e = this;
		return Y(function* () {
			const s = e.mo;
			if (!s) return;
			const n = {
				distinct_id: s.distinctId,
				token: s.projectToken,
				person_properties: {
					$lib: s.library.name,
					$lib_version: s.library.version
				}
			}, r = e.Dd();
			r.length && (n.evaluation_contexts = r);
			const o = e.Ld();
			let l;
			R(o) || (n.flag_keys = o);
			try {
				var a;
				const i = null === (a = (yield s.sendRequest("/flags/?v=2", {
					target: "flags",
					method: "POST",
					body: n,
					compression: e.Ir.compression,
					sentAt: "body",
					timeoutMs: e.Ir.requestTimeoutMs
				})).json) || void 0 === a ? void 0 : a.featureFlagPayloads;
				l = (null == i ? void 0 : i[t]) || void 0;
			} catch (t) {
				e.$.error("Remote config feature flag request failed", t);
				return;
			}
			try {
				i(l);
			} catch (t) {
				e.$.error("Remote config feature flag callback failed", t);
			}
		})();
	}
	isFeatureEnabled(t, i = {}) {
		if (i.fresh && !this.sd) return i.defaultValue;
		if (!(this.Xc || this.getFlags() && this.getFlags().length > 0)) return this.$.warn("isFeatureEnabled for key \"" + t + wh), i.defaultValue;
		const e = this.getFeatureFlag(t, i);
		return R(e) ? i.defaultValue : !!e;
	}
	addFeatureFlagsHandler(t) {
		this.featureFlagEventHandlers.push(t);
	}
	removeFeatureFlagsHandler(t) {
		this.featureFlagEventHandlers = this.featureFlagEventHandlers.filter((i) => i !== t);
	}
	receivedFeatureFlags(t, i, e) {
		this.Nd(t, i, e);
	}
	Nd(t, i, e) {
		if (!this.mo) return;
		this.Xc = !0;
		const s = ((t, i = {}, e = {}, s = {}, n, r = bh) => {
			const o = ((t, i) => {
				const e = t.flags;
				if (e) {
					const i = Object.fromEntries(Object.keys(e).map((t) => {
						var i;
						return [t, null !== (i = e[t].variant) && void 0 !== i ? i : e[t].enabled];
					})), s = Object.fromEntries(Object.keys(e).filter((t) => e[t].enabled).filter((t) => {
						var i;
						return !R(null === (i = e[t].metadata) || void 0 === i ? void 0 : i.payload);
					}).map((t) => {
						var i;
						return [t, null === (i = e[t].metadata) || void 0 === i ? void 0 : i.payload];
					}));
					return Ei(Ei({}, t), {}, {
						featureFlags: i,
						featureFlagPayloads: s
					});
				}
				return t.featureFlags && i.warn("Using an older version of the feature flags endpoint. Please upgrade your PostHog server to the latest version"), t;
			})(t, r), l = o.flags, a = o.featureFlags, u = o.featureFlagPayloads;
			if (!a) return;
			const h = t.requestId, d = t.evaluatedAt;
			if (T(a)) {
				r.warn("v1 of the feature flags endpoint is deprecated. Please use the latest version.");
				const t = {};
				if (a) for (let i = 0; a.length > i; i++) t[a[i]] = !0;
				return {
					[Ls]: a,
					[js]: t,
					[qs]: !1
				};
			}
			let c = a, v = u, f = l;
			if (null == n ? void 0 : n.partialResponse) {
				const t = Object.keys(c), n = v || {};
				c = Ei(Ei({}, i), c), v = Ei(Ei({}, e), n), t.forEach((t) => {
					t in n || null == v || delete v[t];
				}), f = Ei(Ei({}, s), f);
			} else if (t.errorsWhileComputingFlags) if (l) {
				const t = new Set(Object.keys(l).filter((t) => {
					var i;
					return !(null === (i = l[t]) || void 0 === i ? void 0 : i.failed);
				}));
				c = Ei(Ei({}, i), Object.fromEntries(Object.entries(c).filter(([i]) => t.has(i))));
				const n = Object.fromEntries(Object.entries(v || {}).filter(([i]) => t.has(i)));
				v = Ei(Ei({}, e), n), t.forEach((t) => {
					t in n || null == v || delete v[t];
				}), f = Ei(Ei({}, s), Object.fromEntries(Object.entries(f || {}).filter(([i]) => t.has(i))));
			} else c = Ei(Ei({}, i), c), v = Ei(Ei({}, e), v), f = Ei(Ei({}, s), f);
			return Ei(Ei({
				[Ls]: Object.keys(Eh(c)),
				[js]: c || {},
				[zs]: v || {},
				[Us]: f || {},
				[qs]: !0 === t.minimalFlagCalledEvents
			}, h ? { [Hs]: h } : {}), d ? { [cn]: d } : {});
		})(t, this.getFlagVariants(), this.getFlagPayloads(), this.getFlagsWithDetails(), e, this.$);
		if (s) if (!1 === (null == e ? void 0 : e.persist)) {
			const t = !R(this.mo.kv.get(js));
			this.Pd = s, t || this.At(s);
		} else this.Sd(), this.Fd(s, t, !!(null == e ? void 0 : e.partialResponse)), this.At(s);
		else i && this.Rd();
		i || (this.rd = !1), this.Cd(i);
	}
	override(t, i = !1) {
		this.$.warn("override is deprecated. Please use overrideFeatureFlags instead."), this.overrideFeatureFlags({
			flags: t,
			suppressWarning: i
		});
	}
	overrideFeatureFlags(t) {
		this.Ud(t);
	}
	Ud(t) {
		if (this.mo) {
			if (!1 === t) return this.Lt([Vs, Ws]), this.Cd(), void yh.info("All overrides cleared");
			if (T(t)) return this.At({ [Vs]: xh(t) }), this.Cd(), void yh.info("Flag overrides set", { flags: t });
			if (t && "object" == typeof t && ("flags" in t || "payloads" in t)) {
				var i;
				const e = t;
				this.Zc = Boolean(null !== (i = e.suppressWarning) && void 0 !== i && i);
				const s = {}, n = e.flags, r = e.payloads;
				n && (s[Vs] = T(n) ? xh(n) : n), r && (s[Ws] = r), Object.keys(s).length && this.At(s), !1 === n && !1 === r ? this.Lt([Vs, Ws]) : !1 === n ? this.Lt(Vs) : !1 === r && this.Lt(Ws), this.Cd(), !1 === n ? yh.info("Flag overrides cleared") : n && yh.info("Flag overrides set", { flags: n }), !1 === r ? yh.info("Payload overrides cleared") : r && yh.info("Payload overrides set", { payloads: r });
				return;
			}
			if (t && "object" == typeof t) return this.At({ [Vs]: t }), this.Cd(), void yh.info("Flag overrides set", { flags: t });
			this.$.warn("Invalid overrideOptions provided to overrideFeatureFlags", { overrideOptions: t });
		} else this.$.warn("posthog.featureFlags.overrideFeatureFlags called before feature flags were ready");
	}
	onFeatureFlags(t) {
		if (this.addFeatureFlagsHandler(t), this.Xc) {
			const { flags: i, flagVariants: e } = this.Wd();
			try {
				t(i, e);
			} catch (t) {
				this.$.error("Error while running feature flags callback", t);
			}
		}
		return () => this.removeFeatureFlagsHandler(t);
	}
	updateEarlyAccessFeatureEnrollment(t, i, e) {
		var s;
		const n = (this.Ed("$early_access_features") || []).find((i) => i.flagKey === t), r = { [`$feature_enrollment/${t}`]: i }, o = {
			$feature_flag: t,
			$feature_enrollment: i,
			$set: r
		};
		n && (o.$early_access_feature_name = n.name), e && (o.$feature_enrollment_stage = e);
		const l = Ei(Ei({}, this.getFlagVariants()), {}, { [t]: i });
		null === (s = this._instance) || void 0 === s || null === (s = s.persistence) || void 0 === s || s.markCrossTabFeatureFlagChanges({
			$active_feature_flags: [t],
			$enabled_feature_flags: [t],
			$stored_person_properties: Object.keys(r)
		}), this.At({
			[Ls]: Object.keys(Eh(l)),
			[js]: l,
			[Gs]: Ei(Ei({}, this.Ed("$stored_person_properties") || {}), r)
		}), this.Cd();
		try {
			var a;
			null === (a = this.mo) || void 0 === a || a.capture("$feature_enrollment_update", o).catch((t) => {
				this.$.error("Failed to capture early access feature enrollment", t);
			});
		} catch (t) {
			this.$.error("Failed to capture early access feature enrollment", t);
		}
	}
	getEarlyAccessFeatures(t, i = !1, e) {
		const s = this.Ed(Bs);
		!s || i ? this.Vd(t, e) : t(s);
	}
	Vd(t, i) {
		var e = this;
		return Y(function* () {
			const s = e.mo;
			if (!s) return;
			const n = i ? `&${i.map((t) => `stage=${t}`).join("&")}` : "";
			let r;
			try {
				const t = yield s.sendRequest(`/api/early_access_features/?token=${s.projectToken}${n}`, {
					target: "api",
					method: "GET",
					sentAt: "query"
				});
				if (!t.json) return;
				r = t.json.earlyAccessFeatures, e.At({ [Bs]: r });
			} catch (t) {
				e.$.error("Early access feature request failed", t);
				return;
			}
			try {
				t(r);
			} catch (t) {
				e.$.error("Early access feature callback failed", t);
			}
		})();
	}
	Wd() {
		const t = this.getFlags(), i = this.getFlagVariants();
		return {
			flags: t.filter((t) => i[t]),
			flagVariants: Object.keys(i).filter((t) => i[t]).reduce((t, e) => (t[e] = i[e], t), {})
		};
	}
	Cd(t) {
		this.xd();
		const { flags: i, flagVariants: e } = this.Wd();
		this.featureFlagEventHandlers.forEach((s) => {
			try {
				s(i, e, { errorsLoading: t });
			} catch (t) {
				this.$.error("Error while running feature flags callback", t);
			}
		});
	}
	setPersonPropertiesForFlags(t, i = !0) {
		this.Gd(t, i);
	}
	Gd(t, i = !0) {
		const e = this.Ed("$stored_person_properties") || {}, s = (null == t ? void 0 : t.$set) || ((null == t ? void 0 : t.$set_once) ? {} : t), n = null == t ? void 0 : t.$set_once, r = {};
		if (n) for (const t in n) ({}).hasOwnProperty.call(n, t) && (t in e || (r[t] = n[t]));
		this.At({ [Gs]: Ei(Ei(Ei({}, e), r), s) }), i && this.reloadFeatureFlags();
	}
	unsetPersonPropertiesForFlags(t, i = !0) {
		const e = Ei({}, this.Ed("$stored_person_properties") || {});
		t.forEach((t) => {
			delete e[t];
		}), this.At({ [Gs]: e }), i && this.reloadFeatureFlags();
	}
	resetPersonPropertiesForFlags(t = !0) {
		this.Lt(Gs), t && this.reloadFeatureFlags();
	}
	setGroupPropertiesForFlags(t, i = !0) {
		const e = this.Ed("$stored_group_properties") || {}, s = Ei({}, e);
		for (const i of Object.keys(t)) s[i] = Ei(Ei({}, e[i]), t[i]);
		this.At({ [Ks]: s }), i && this.reloadFeatureFlags();
	}
	resetGroupPropertiesForFlags(t) {
		if (t) {
			const i = this.Ed("$stored_group_properties") || {};
			this.At({ [Ks]: Ei(Ei({}, i), {}, { [t]: {} }) });
		} else this.Lt(Ks);
	}
	reset() {
		this.td++, this.nd = !1, this.Qc = {}, this.Jc = {}, this.Pd = void 0, this.Xc = !1, this.ed = !1, this.sd = !1, this.$anon_distinct_id = void 0, this.Md(), this.Zc = !1, this.od = 0;
	}
} };
var Qh = { sessionRecording: class {
	get Ir() {
		return this._instance.config;
	}
	get Ca() {
		return this._instance.persistence;
	}
	get started() {
		var t;
		return !!(null === (t = this.Zd) || void 0 === t ? void 0 : t.isStarted);
	}
	get status() {
		var t, i;
		return "awaiting_config" === this.Qd || "missing_config" === this.Qd ? this.Qd : null !== (t = null === (i = this.Zd) || void 0 === i ? void 0 : i.status) && void 0 !== t ? t : this.Qd;
	}
	constructor(i) {
		if (this._instance = i, this._forceAllowLocalhostNetworkCapture = !1, this.Qd = Ku, this.Jd = void 0, this.Kd = !1, this.Xe = (() => {
			var i, e;
			if (!(null == s ? void 0 : s.visibilityState) || "visible" === s.visibilityState) return !0;
			const n = null == t || null === (i = t.performance) || void 0 === i || null === (e = i.getEntriesByType) || void 0 === e ? void 0 : e.call(i, "visibility-state");
			return !(null == n ? void 0 : n.length) || n.some((t) => "visible" === t.name);
		})(), this.ln = () => {
			var t, i;
			"visible" === (null == s ? void 0 : s.visibilityState) && (this.Xe = !0, null === (t = this.Zd) || void 0 === t || null === (i = t.setDocumentWasEverVisible) || void 0 === i || i.call(t, !0));
		}, !this._instance.sessionManager) throw Yu.error("started without valid sessionManager"), /* @__PURE__ */ new Error("[SessionRecording] started without valid sessionManager. This is a bug.");
		if ("always" === this.Ir.cookieless_mode) throw new Error("[SessionRecording] cannot be used with cookieless_mode=\"always\"");
		null != s && s.addEventListener && Qn(s, "visibilitychange", this.ln);
	}
	initialize() {
		this.startIfEnabledOrStop();
	}
	dispose({ discardBufferedEvents: t = !1 } = {}) {
		var i;
		this.Kd = !0, null == s || null === (i = s.removeEventListener) || void 0 === i || i.call(s, "visibilitychange", this.ln), t ? this.Xd(!0) : this.stopRecording();
	}
	get Yd() {
		var i;
		const e = !!(null === (i = this._instance.get_property("$session_recording_remote_config")) || void 0 === i ? void 0 : i.enabled), s = !this.Ir.disable_session_recording, n = this.Ir.disable_session_recording || this._instance.consent.isOptedOut();
		return t && e && s && !n;
	}
	startIfEnabledOrStop(t) {
		var i;
		if (this.Kd) return;
		if (this.Yd && (null === (i = this.Zd) || void 0 === i ? void 0 : i.isStarted)) return;
		const e = !R(Object.assign) && !R(Array.from);
		this.Yd && e ? (this.tv(t), Yu.info("starting")) : (this.Qd = Ku, this.stopRecording());
	}
	tv(t) {
		var i, e;
		if (this.Yd) if ("awaiting_config" !== this.Qd && "missing_config" !== this.Qd && (this.Qd = Ju), (null == c || null === (i = c.__PosthogExtensions__) || void 0 === i || null === (i = i.rrweb) || void 0 === i ? void 0 : i.record) && (null === (e = c.__PosthogExtensions__) || void 0 === e ? void 0 : e.initSessionRecording)) this.ev(t);
		else {
			var s, n;
			const i = this._instance.sessionManager;
			null === (s = c.__PosthogExtensions__) || void 0 === s || null === (n = s.loadExternalDependency) || void 0 === n || n.call(s, this._instance, this.iv, (e) => {
				if (!this.Kd && this.Yd && this._instance.sessionManager === i) return e ? (this._instance.register_for_session({ $sdk_debug_recording_script_not_loaded: !0 }), Yu.error("could not load recorder", e)) : void this.ev(t);
				this.Qd = "disabled";
			});
		}
	}
	stopRecording() {
		var t, i;
		null === (t = this.Jd) || void 0 === t || t.call(this), this.Jd = void 0, null === (i = this.Zd) || void 0 === i || i.stop();
	}
	Xd(t = !1) {
		var i, e;
		null === (i = this.Jd) || void 0 === i || i.call(this), this.Jd = void 0, null === (e = this.Zd) || void 0 === e || e.discard({ discardProducerEvents: t });
	}
	nv() {
		var t, i;
		null === (t = this.Ca) || void 0 === t || t.unregister("$session_is_sampled"), null === (i = this.Ca) || void 0 === i || i.unregister("$replay_sample_rate");
	}
	sv(t, i) {
		if (A(t)) return null;
		const e = D(t) ? t : parseFloat(t);
		return "number" != typeof (s = e) || !Number.isFinite(s) || 0 > s || s > 1 ? (Yu.warn(`${i} must be between 0 and 1. Ignoring invalid value:`, t), null) : e;
		var s;
	}
	rv(t) {
		if (this.Ca) {
			var i, e;
			const s = this.Ca, n = () => {
				var i;
				const e = !1 === t.sessionRecording ? void 0 : t.sessionRecording, n = this.sv(null === (i = this.Ir.session_recording) || void 0 === i ? void 0 : i.sampleRate, "session_recording.sampleRate"), r = this.sv(null == e ? void 0 : e.sampleRate, "remote config sampleRate"), o = null != n ? n : r;
				A(o) && this.nv();
				const l = null == e ? void 0 : e.minimumDurationMilliseconds;
				s.register({ [xs]: Ei(Ei({
					cache_timestamp: Date.now(),
					enabled: !!e
				}, e), {}, {
					networkPayloadCapture: Ei({ capturePerformance: t.capturePerformance }, null == e ? void 0 : e.networkPayloadCapture),
					canvasRecording: {
						enabled: null == e ? void 0 : e.recordCanvas,
						fps: null == e ? void 0 : e.canvasFps,
						quality: null == e ? void 0 : e.canvasQuality
					},
					sampleRate: o,
					minimumDurationMilliseconds: R(l) ? null : l,
					endpoint: null == e ? void 0 : e.endpoint,
					triggerMatchType: null == e ? void 0 : e.triggerMatchType,
					masking: null == e ? void 0 : e.masking,
					urlTriggers: null == e ? void 0 : e.urlTriggers,
					version: null == e ? void 0 : e.version,
					triggerGroups: null == e ? void 0 : e.triggerGroups
				}) });
			};
			n(), null === (i = this.Jd) || void 0 === i || i.call(this), this.Jd = null === (e = this._instance.sessionManager) || void 0 === e ? void 0 : e.onSessionId(n);
		}
	}
	onRemoteConfig(t) {
		const i = t.ok ? t.config : void 0;
		i && "sessionRecording" in i ? !1 === i.sessionRecording ? (this.rv(i), this.Xd()) : (this.rv(i), this.startIfEnabledOrStop()) : ("awaiting_config" === this.Qd && (this.Qd = "missing_config", Yu.warn("config refresh failed, recording will not start until page reload")), this.startIfEnabledOrStop());
	}
	log(t, i = "log") {
		var e;
		(null === (e = this.Zd) || void 0 === e ? void 0 : e.log) ? this.Zd.log(t, i) : Yu.warn("log called before recorder was ready");
	}
	get iv() {
		var t, i;
		const e = null === (t = this._instance) || void 0 === t || null === (t = t.persistence) || void 0 === t ? void 0 : t.get_property(xs);
		return (null == e || null === (i = e.scriptConfig) || void 0 === i ? void 0 : i.script) || "lazy-recorder";
	}
	ov() {
		const t = this._instance.get_property(xs);
		if (!t) return !1;
		let i;
		try {
			i = "object" == typeof t ? t : JSON.parse(t);
		} catch (t) {
			return Yu.warn("persisted remote config for session recording is invalid and will be ignored", t), !1;
		}
		return !A(i.cache_timestamp) && 36e5 >= Date.now() - i.cache_timestamp;
	}
	ev(t) {
		var i, e, s;
		if (!this.Kd && this.Yd && this._instance.sessionManager) {
			if (!(null === (i = c.__PosthogExtensions__) || void 0 === i ? void 0 : i.initSessionRecording)) return Yu.warn("Called on script loaded before session recording is available. This can be caused by adblockers."), void this._instance.register_for_session({ [xn]: !0 });
			var n;
			if (this.Zd || (this.Zd = null === (n = c.__PosthogExtensions__) || void 0 === n ? void 0 : n.initSessionRecording(this._instance, this.Xe), this.Zd._forceAllowLocalhostNetworkCapture = this._forceAllowLocalhostNetworkCapture), !this.ov()) {
				if ("missing_config" === this.Qd || "awaiting_config" === this.Qd) return;
				this.Qd = "awaiting_config", Yu.info("persisted remote config is stale, requesting fresh config before starting"), new Cl(this._instance).load();
				return;
			}
			this.Qd = Ju, null === (e = (s = this.Zd).setDocumentWasEverVisible) || void 0 === e || e.call(s, this.Xe), this.Zd.start(t);
		} else this.Qd = Ku;
	}
	onRRwebEmit(t) {
		var i, e;
		null === (i = this.Zd) || void 0 === i || null === (e = i.onRRwebEmit) || void 0 === e || e.call(i, t);
	}
	overrideLinkedFlag() {
		var t, i;
		this.Zd || null === (i = this.Ca) || void 0 === i || i.register({ $replay_override_linked_flag: !0 }), null === (t = this.Zd) || void 0 === t || t.overrideLinkedFlag();
	}
	overrideSampling() {
		var t, i;
		this.Zd || null === (i = this.Ca) || void 0 === i || i.register({ $replay_override_sampling: !0 }), null === (t = this.Zd) || void 0 === t || t.overrideSampling();
	}
	overrideTrigger(t) {
		var i, e;
		this.Zd || null === (e = this.Ca) || void 0 === e || e.register({ ["url" === t ? "$replay_override_url_trigger" : "$replay_override_event_trigger"]: !0 }), null === (i = this.Zd) || void 0 === i || i.overrideTrigger(t);
	}
	get sdkDebugProperties() {
		var t;
		return (null === (t = this.Zd) || void 0 === t ? void 0 : t.sdkDebugProperties) || { $recording_status: this.status };
	}
	tryAddCustomEvent(t, i) {
		var e;
		return !!(null === (e = this.Zd) || void 0 === e ? void 0 : e.tryAddCustomEvent(t, i));
	}
	flushBeforeIdentityReset() {
		var t, i;
		null === (t = this.Zd) || void 0 === t || null === (i = t.flushBeforeIdentityReset) || void 0 === i || i.call(t);
	}
} };
var Zh = {
	autocapture: class extends Du {
		constructor(t) {
			super(new Nu(t)), this.instance = t;
		}
	},
	historyAutocapture: class {
		constructor(t) {
			this._instance = t, this.lv = this.av();
		}
		initialize() {
			this.startIfEnabled();
		}
		get isEnabled() {
			const t = this.uv();
			return !!(t.path || t.search || this.hv(t));
		}
		startIfEnabled() {
			this.isEnabled && (Je.info("History API monitoring enabled, starting..."), this.monitorHistoryChanges());
		}
		startIfEnabledOrStop() {
			this.stop(), this.lv = this.av(), this.startIfEnabled();
		}
		stop() {
			this.dv && this.dv(), this.dv = void 0, this.vv && this.vv(), this.vv = void 0, Je.info("History API monitoring stopped");
		}
		monitorHistoryChanges() {
			t && t.history && (this.fv("pushState"), this.fv("replaceState"), this.pv(), this.hv() && this.gv());
		}
		fv(i) {
			var e;
			if (!t || (null === (e = t.history[i]) || void 0 === e ? void 0 : e.__posthog_wrapped__)) return;
			const s = this;
			Uu(t.history, i, (t) => function(e, n, r) {
				t.call(this, e, n, r), s.mv(i);
			});
		}
		av() {
			const i = null == t ? void 0 : t.location;
			if (null == i ? void 0 : i.pathname) return {
				pathname: i.pathname,
				search: i.search,
				hash: i.hash
			};
		}
		uv() {
			const t = this._instance.config.capture_pageview;
			return "history_change" === t ? { path: !0 } : C(t) ? t : {};
		}
		hv(t = this.uv()) {
			return !!t.hash && !this._instance.config.disable_capture_url_hashes;
		}
		yv(t) {
			const i = this.uv(), e = this.lv;
			return !(!e || !(i.path && t.pathname !== e.pathname || i.search && t.search !== e.search || this.hv(i) && t.hash !== e.hash));
		}
		mv(t) {
			try {
				const i = this.av();
				if (!i) return;
				this.yv(i) && this._instance.capture(Ln, { navigation_type: t }), this.lv = i;
			} catch (i) {
				Je.error(`Error capturing ${t} pageview`, i);
			}
		}
		pv() {
			if (this.dv) return;
			const i = () => {
				this.mv("popstate");
			};
			Qn(t, "popstate", i), this.dv = () => {
				t && t.removeEventListener("popstate", i);
			};
		}
		gv() {
			if (this.vv) return;
			const i = () => {
				this.mv("hashchange");
			};
			Qn(t, "hashchange", i), this.vv = () => {
				t && t.removeEventListener("hashchange", i);
			};
		}
	},
	heatmaps: class {
		get Ir() {
			return this.instance.config;
		}
		constructor(t) {
			var i;
			this.bv = !1, this._o = !1, this._v = null, this.instance = t, this.bv = !!(null === (i = this.instance.persistence) || void 0 === i ? void 0 : i.props[ps]), this.rageclicks = new Ou(t.config.rageclick);
		}
		initialize() {
			this.startIfEnabled();
		}
		get flushIntervalMilliseconds() {
			let t = 5e3;
			return C(this.Ir.capture_heatmaps) && this.Ir.capture_heatmaps.flush_interval_milliseconds && (t = this.Ir.capture_heatmaps.flush_interval_milliseconds), t;
		}
		get isEnabled() {
			return A(this.Ir.capture_heatmaps) ? A(this.Ir.enable_heatmaps) ? this.bv : this.Ir.enable_heatmaps : !1 !== this.Ir.capture_heatmaps;
		}
		startIfEnabled() {
			if (this.isEnabled) {
				if (this._o) return;
				Xu.info("starting..."), this.wv(), this.ln();
			} else {
				var t;
				clearInterval(null !== (t = this._v) && void 0 !== t ? t : void 0), this.Sv(), this.getAndClearBuffer();
			}
		}
		onRemoteConfig(t) {
			if (!t.ok) return;
			const i = t.config;
			if (!("heatmaps" in i)) return;
			const e = !!i.heatmaps;
			this.instance.persistence && this.instance.persistence.register({ [ps]: e }), this.bv = e, this.startIfEnabled();
		}
		getAndClearBuffer() {
			const t = this.Rt;
			return this.Rt = void 0, t;
		}
		xv(t) {
			Qu(t.originalEvent) && this.Mr(t.originalEvent, "deadclick");
		}
		ln() {
			this._v && clearInterval(this._v), this._v = "visible" === (null == s ? void 0 : s.visibilityState) ? setInterval(this.pa.bind(this), this.flushIntervalMilliseconds) : null;
		}
		wv() {
			t && s && (this.Cv = this.pa.bind(this), Qn(t, jn, this.Cv), this.$v = (i) => this.Mr(i || (null == t ? void 0 : t.event)), Qn(s, "click", this.$v, { capture: !0 }), this.Iv = (i) => this.Tv(i || (null == t ? void 0 : t.event)), Qn(s, "mousemove", this.Iv, { capture: !0 }), this.Mv = new mo(this.instance, _o, this.xv.bind(this)), this.Mv.startIfEnabledOrStop(), this.Ev = this.ln.bind(this), Qn(s, Nn, this.Ev), this._o = !0);
		}
		Sv() {
			var i;
			t && s && (this.Cv && t.removeEventListener(jn, this.Cv), this.$v && s.removeEventListener("click", this.$v, { capture: !0 }), this.Iv && s.removeEventListener("mousemove", this.Iv, { capture: !0 }), this.Ev && s.removeEventListener(Nn, this.Ev), clearTimeout(this.Pv), null === (i = this.Mv) || void 0 === i || i.stop(), this._o = !1);
		}
		Rv(i, e) {
			const s = this.instance.scrollManager.scrollY(), n = this.instance.scrollManager.scrollX(), r = this.instance.scrollManager.scrollElement(), o = function(i, e, s) {
				let n = i;
				for (; n && Rr(n) && !Ir(n, "body");) {
					if (n === s) return !1;
					let i;
					try {
						var r, o, l;
						i = null === (r = null !== (o = null === (l = n.ownerDocument) || void 0 === l ? void 0 : l.defaultView) && void 0 !== o ? o : t) || void 0 === r ? void 0 : r.getComputedStyle(n).position;
					} catch (t) {
						return !1;
					}
					if (b(e, i)) return !0;
					n = qr(n);
				}
				return !1;
			}(Br(i), ["fixed", "sticky"], r);
			return {
				x: i.clientX + (o ? 0 : n),
				y: i.clientY + (o ? 0 : s),
				target_fixed: o,
				type: e
			};
		}
		Mr(t, i = "click") {
			var e;
			if (Or(t.target) || !Qu(t)) return;
			const s = this.Rv(t, i);
			null !== (e = this.rageclicks) && void 0 !== e && e.isRageClick(t.clientX, t.clientY, (/* @__PURE__ */ new Date()).getTime()) && Xr(Br(t), this.instance.config.rageclick) && this.Zs(Ei(Ei({}, s), {}, { type: "rageclick" })), this.Zs(s);
		}
		Tv(t) {
			!Or(t.target) && Qu(t) && (clearTimeout(this.Pv), this.Pv = setTimeout(() => {
				this.Zs(this.Rv(t, "mousemove"));
			}, 500));
		}
		Zs(i) {
			if (!t) return;
			const e = this.Ir.disable_capture_url_hashes ? vi(t.location.href) : t.location.href, s = this.Ir.custom_personal_data_properties, r = Io(e, this.Ir.mask_personal_data_properties ? [...Do, ...s || []] : [], jo);
			this.Rt = this.Rt || {}, this.Rt[r] || (this.Rt[r] = []), this.Rt[r].push(i);
		}
		pa() {
			this.Rt && !O(this.Rt) && this.instance.capture("$$heatmap", { $heatmap_data: this.getAndClearBuffer() });
		}
	},
	deadClicksAutocapture: mo,
	webVitalsAutocapture: class {
		constructor(t) {
			var i;
			this._instance = t, this.bv = !1, this._o = !1, this.Rt = {
				navigationKey: void 0,
				url: void 0,
				metrics: [],
				firstMetricTimestamp: void 0
			}, this.Av = () => {
				clearTimeout(this.Fv), this.Fv = void 0, 0 !== this.Rt.metrics.length && (this._instance.capture("$web_vitals", Ei({ $current_url: this.Rt.url }, this.Rt.metrics.reduce((t, i) => Ei(Ei({}, t), {}, {
					[`$web_vitals_${i.name}_event`]: Ei({}, i),
					[`$web_vitals_${i.name}_value`]: i.value
				}), {}))), this.Rt = {
					navigationKey: void 0,
					url: void 0,
					metrics: [],
					firstMetricTimestamp: void 0
				});
			}, this.Ov = (t) => {
				var i;
				if (this.Rt = this.Rt || {
					navigationKey: void 0,
					url: void 0,
					metrics: [],
					firstMetricTimestamp: void 0
				}, A(null == t ? void 0 : t.name) || A(null == t ? void 0 : t.value)) return void Hu.error("Invalid metric received", t);
				const e = "string" == typeof t.navigationURL ? t.navigationURL : void 0, s = this.Dv(e);
				if (R(s)) return;
				const n = D(t.navigationId) || "string" == typeof t.navigationId ? `navigation:${t.navigationId}` : `url:${s}`;
				if (this.Lv && t.value >= this.Lv) return void Hu.error("Ignoring metric with value >= " + this.Lv, t);
				this.Rt.navigationKey !== n && (this.Av(), this.Fv = setTimeout(this.Av, this.flushToCaptureTimeoutMs)), R(this.Rt.navigationKey) && (this.Rt.navigationKey = n, this.Rt.url = s), this.Rt.firstMetricTimestamp = R(this.Rt.firstMetricTimestamp) ? Date.now() : this.Rt.firstMetricTimestamp;
				const r = null === (i = this._instance.sessionManager) || void 0 === i ? void 0 : i.checkAndGetSessionAndWindowId(!0), o = Ei(Ei(Ei({}, t), e ? { navigationURL: s } : {}), {}, {
					$current_url: s,
					timestamp: Date.now()
				});
				if (delete o.entries, C(t.attribution) && this.attributionMetrics.indexOf(t.name) > -1) {
					const i = {};
					for (const e of Gu) {
						const s = "url" === e && "string" == typeof t.attribution[e] ? this.Dv(t.attribution[e]) : t.attribution[e];
						R(s) || (i[e] = s);
					}
					o.attribution = i;
				} else delete o.attribution;
				R(r) || (o.$session_id = r.sessionId, o.$window_id = r.windowId), this.Rt.metrics.push(o), this.Rt.metrics.length === this.allowedMetrics.length && this.Av();
			}, this.Nv = () => {
				if (this._o) return;
				let t, i, e, s, n = !1;
				const r = c.__PosthogExtensions__, o = null == r ? void 0 : r.postHogWebVitalsCallbacksByFlavor, l = (null == o ? void 0 : o[this.qv]) || ("web-vitals" === this.qv && R(o) ? null == r ? void 0 : r.postHogWebVitalsCallbacks : void 0);
				if (!R(l)) {
					const r = l.withoutAttribution, o = this.attributionMetrics;
					n = !R(r), t = o.indexOf("LCP") > -1 ? l.onLCP : (null == r ? void 0 : r.onLCP) || l.onLCP, i = o.indexOf("CLS") > -1 ? l.onCLS : (null == r ? void 0 : r.onCLS) || l.onCLS, e = o.indexOf("FCP") > -1 ? l.onFCP : (null == r ? void 0 : r.onFCP) || l.onFCP, s = o.indexOf("INP") > -1 ? l.onINP : (null == r ? void 0 : r.onINP) || l.onINP;
				}
				if (!(t && i && e && s)) return void Hu.error("web vitals callbacks not loaded - not starting");
				const a = { reportSoftNavs: this.useSoftNavs }, u = n && this.attributionMetrics.indexOf("INP") > -1 ? Ei(Ei({}, a), {}, { includeProcessedEventEntries: !1 }) : a;
				this.allowedMetrics.indexOf("LCP") > -1 && t(this.Ov.bind(this), a), this.allowedMetrics.indexOf("CLS") > -1 && i(this.Ov.bind(this), a), this.allowedMetrics.indexOf("FCP") > -1 && e(this.Ov.bind(this), a), this.allowedMetrics.indexOf("INP") > -1 && s(this.Ov.bind(this), u), this._o = !0;
			}, this.bv = !!(null === (i = this._instance.persistence) || void 0 === i ? void 0 : i.props[bs]), this.startIfEnabled();
		}
		get jv() {
			return this._instance.config.capture_performance;
		}
		get allowedMetrics() {
			var t, i;
			const e = C(this.jv) ? null === (t = this.jv) || void 0 === t ? void 0 : t.web_vitals_allowed_metrics : void 0;
			return A(e) ? (null === (i = this._instance.persistence) || void 0 === i ? void 0 : i.props.$web_vitals_allowed_metrics) || Vu : e;
		}
		get flushToCaptureTimeoutMs() {
			return (C(this.jv) ? this.jv.web_vitals_delayed_flush_ms : void 0) || 5e3;
		}
		get attributionMetrics() {
			const t = C(this.jv) ? this.jv.web_vitals_attribution : void 0;
			return j(t) ? t ? Vu : [] : T(t) ? t : Wu;
		}
		get useAttribution() {
			return this.attributionMetrics.length > 0;
		}
		get useSoftNavs() {
			const t = C(this.jv) ? this.jv.__preview_web_vitals_soft_navs : void 0;
			return null != t && t;
		}
		get Lv() {
			const t = C(this.jv) && D(this.jv.__web_vitals_max_value) ? this.jv.__web_vitals_max_value : qu;
			return t > 0 && 6e4 >= t ? qu : t;
		}
		get isEnabled() {
			const t = null == n ? void 0 : n.protocol;
			if ("http:" !== t && "https:" !== t) return Hu.info("Web Vitals are disabled on non-http/https protocols"), !1;
			const i = C(this.jv) ? this.jv.web_vitals : j(this.jv) ? this.jv : void 0;
			return j(i) ? i : this.bv;
		}
		startIfEnabled() {
			this.isEnabled && !this._o && (Hu.info("enabled, starting..."), this.qo(this.Nv));
		}
		onRemoteConfig(t) {
			if (!t.ok) return;
			const i = t.config;
			if (!("capturePerformance" in i)) return;
			const e = C(i.capturePerformance) && !!i.capturePerformance.web_vitals, s = C(i.capturePerformance) ? i.capturePerformance.web_vitals_allowed_metrics : void 0;
			this._instance.persistence && (this._instance.persistence.register({ [bs]: e }), this._instance.persistence.register({ [Ss]: s })), this.bv = e, this.startIfEnabled();
		}
		get qv() {
			return this.useSoftNavs ? this.useAttribution ? "web-vitals-with-attribution-soft-navs" : "web-vitals-soft-navs" : this.useAttribution ? "web-vitals-with-attribution" : "web-vitals";
		}
		qo(t) {
			var i;
			const e = c.__PosthogExtensions__, s = this.qv, n = null == e ? void 0 : e.postHogWebVitalsCallbacksByFlavor;
			(null == n ? void 0 : n[s]) || "web-vitals" === s && R(n) && (null == e ? void 0 : e.postHogWebVitalsCallbacks) ? t() : null == e || null === (i = e.loadExternalDependency) || void 0 === i || i.call(e, this._instance, s, (i) => {
				i ? Hu.error("failed to load script", i) : t();
			});
		}
		Dv(i) {
			const e = i || (null == t ? void 0 : t.location.href);
			if (!e) return void Hu.error("Could not determine current URL");
			const s = this._instance.config.disable_capture_url_hashes ? vi(e) : e, n = this._instance.config.custom_personal_data_properties;
			return Io(s, this._instance.config.mask_personal_data_properties ? [...Do, ...n || []] : [], jo);
		}
	}
};
var td = {
	exceptionObserver: class {
		constructor(i) {
			var e;
			this.Nv = () => {
				var i;
				if (!t || !this.isEnabled || !(null === (i = c.__PosthogExtensions__) || void 0 === i ? void 0 : i.errorWrappingFunctions)) return;
				const e = c.__PosthogExtensions__.errorWrappingFunctions.wrapOnError, s = c.__PosthogExtensions__.errorWrappingFunctions.wrapUnhandledRejection, n = c.__PosthogExtensions__.errorWrappingFunctions.wrapConsoleError;
				try {
					!this.Bv && this.Ir.capture_unhandled_errors && (this.Bv = e(this.captureException.bind(this))), !this.Hv && this.Ir.capture_unhandled_rejections && (this.Hv = s(this.captureException.bind(this))), !this.zv && this.Ir.capture_console_errors && (this.zv = n(this.captureException.bind(this)));
				} catch (t) {
					ju.error("failed to start", t), this.Uv();
				}
			}, this._instance = i, this.Wv = !!(null === (e = this._instance.persistence) || void 0 === e ? void 0 : e.props[_s]), this.wt = new tt(Ei(Ei({}, function(t = {}) {
				var i, e, s, n;
				return {
					refillRate: null !== (i = null !== (e = t.exceptionRateLimiterRefillRate) && void 0 !== e ? e : t.__exceptionRateLimiterRefillRate) && void 0 !== i ? i : 1,
					bucketSize: null !== (s = null !== (n = t.exceptionRateLimiterBucketSize) && void 0 !== n ? n : t.__exceptionRateLimiterBucketSize) && void 0 !== s ? s : 10
				};
			}(this._instance.config.error_tracking)), {}, {
				refillInterval: 1e4,
				$: ju
			})), this.Ir = this.Vv(), this.startIfEnabledOrStop();
		}
		Vv() {
			const t = this._instance.config.capture_exceptions;
			let i = {
				capture_unhandled_errors: !1,
				capture_unhandled_rejections: !1,
				capture_console_errors: !1
			};
			return C(t) ? i = Ei(Ei({}, i), t) : (R(t) ? this.Wv : t) && (i = Ei(Ei({}, i), {}, {
				capture_unhandled_errors: !0,
				capture_unhandled_rejections: !0
			})), i;
		}
		get isEnabled() {
			return this.Ir.capture_console_errors || this.Ir.capture_unhandled_errors || this.Ir.capture_unhandled_rejections;
		}
		startIfEnabledOrStop() {
			this.isEnabled ? (ju.info("enabled"), this.Uv(), this.qo(this.Nv)) : this.Uv();
		}
		qo(t) {
			var i, e, s;
			(null === (i = c.__PosthogExtensions__) || void 0 === i ? void 0 : i.errorWrappingFunctions) ? t() : null === (e = c.__PosthogExtensions__) || void 0 === e || null === (s = e.loadExternalDependency) || void 0 === s || s.call(e, this._instance, "exception-autocapture", (i) => {
				if (i) return ju.error("failed to load script", i);
				t();
			});
		}
		Uv() {
			var t, i, e;
			null === (t = this.Bv) || void 0 === t || t.call(this), this.Bv = void 0, null === (i = this.Hv) || void 0 === i || i.call(this), this.Hv = void 0, null === (e = this.zv) || void 0 === e || e.call(this), this.zv = void 0;
		}
		onRemoteConfig(t) {
			if (!t.ok) return;
			const i = t.config;
			"autocaptureExceptions" in i && (this.Wv = !!i.autocaptureExceptions || !1, this._instance.persistence && this._instance.persistence.register({ [_s]: this.Wv }), this.Ir = this.Vv(), this.startIfEnabledOrStop());
		}
		onConfigChange() {
			this.Ir = this.Vv();
		}
		captureException(t) {
			try {
				var i, e, s;
				const n = null !== (i = null == t || null === (e = t.$exception_list) || void 0 === e || null === (e = e[0]) || void 0 === e ? void 0 : e.type) && void 0 !== i ? i : "Exception";
				if (this.wt.consumeRateLimit(n)) return void ju.info("Skipping exception capture because of client rate limiting.", { exception: n });
				null === (s = this._instance.exceptions) || void 0 === s || s.sendExceptionEvent(t);
			} catch (t) {}
		}
	},
	exceptions: class {
		constructor(t) {
			var i, e;
			this.Gv = [], this.Zv = new ki([
				new Gi(),
				new se(),
				new Ji(),
				new Ki(),
				new ie(),
				new te(),
				new Xi(),
				new ee()
			], function(t, ...i) {
				return (e, s = 0) => {
					const n = [], r = e.split("\n"), o = Math.min(r.length, s + 1e3), l = [];
					for (let e = s; o > e; e++) {
						const s = r[e];
						if (s.length > 1024) continue;
						const o = Li.test(s) ? s.replace(Li, "$1") : s;
						if (!o.match(/\S*Error: /)) {
							for (const e of i) {
								const i = e(o, t);
								if (i) {
									n.push(i);
									const t = Ui(n);
									if (t) {
										for (let i = l.length - 1; i >= 0; i--) {
											const e = l[i];
											if (t.start >= e.start + e.length) break;
											l.pop();
										}
										l.push(t);
									}
									break;
								}
							}
							if (Vi(n, l) >= 50) break;
						}
					}
					const a = [...l].sort((t, i) => i.start - t.start), u = a[a.length - 1];
					if (u) {
						const t = Hi(n, u);
						n.splice(u.start - t, t);
						for (const i of a) i.start -= t;
					}
					for (const t of a) zi(n, t);
					return l.some((t) => 0 === t.start && n.length === t.length) && function(t) {
						const i = t.map((t) => `${t.function}|${t.filename}|${t.lineno}|${t.colno}|${t.module}`);
						let e = 0;
						for (let t = 1; i.length > t; t++) Wi(i, t, e) && (e = t);
						t.push(...t.splice(0, e));
					}(n), function(t) {
						if (!t.length) return [];
						const i = Array.from(t);
						return i.reverse(), i.slice(0, 50).map((t) => {
							return Ei(Ei({}, t), {}, {
								filename: t.filename || (e = i, e[e.length - 1] || {}).filename,
								function: t.function || "?"
							});
							var e;
						});
					}(n);
				};
			}("web:javascript", Ai, ji)), this._instance = t, this.Gv = null !== (i = null === (e = this._instance.persistence) || void 0 === e ? void 0 : e.get_property("$error_tracking_suppression_rules")) && void 0 !== i ? i : [], this.Qv = ae(this.Jv()), this.Kv = new ue(this.Qv);
		}
		onConfigChange() {
			this.Qv = ae(this.Jv()), this.Kv.setConfig(this.Qv);
		}
		onRemoteConfig(t) {
			var i, e, s;
			if (!t.ok) return;
			const n = t.config;
			if (!("errorTracking" in n)) return;
			const r = null !== (i = null === (e = n.errorTracking) || void 0 === e ? void 0 : e.suppressionRules) && void 0 !== i ? i : [], o = null === (s = n.errorTracking) || void 0 === s ? void 0 : s.captureExtensionExceptions;
			this.Gv = r, this._instance.persistence && this._instance.persistence.register({
				[gs]: this.Gv,
				[ms]: o
			});
		}
		get Xv() {
			var t;
			const i = !!this._instance.get_property(ms), e = this._instance.config.error_tracking.captureExtensionExceptions;
			return null !== (t = null != e ? e : i) && void 0 !== t && t;
		}
		buildProperties(t, i) {
			return this.Zv.buildFromUnknown(t, {
				syntheticException: null == i ? void 0 : i.syntheticException,
				mechanism: { handled: null == i ? void 0 : i.handled }
			});
		}
		addExceptionStep(t, i) {
			if (this.Qv.enabled) try {
				if (!I(t) || 0 === t.trim().length) return void Th.warn("Ignoring exception step because message must be a non-empty string");
				const { sanitizedProperties: e, droppedKeys: s } = function(t) {
					if (!t) return {
						sanitizedProperties: {},
						droppedKeys: []
					};
					const i = [];
					return {
						sanitizedProperties: Object.keys(t).reduce((e, s) => oe.has(s) ? (i.push(s), e) : (e[s] = t[s], e), {}),
						droppedKeys: i
					};
				}(this.Yv(i));
				s.length > 0 && Th.warn("Ignoring reserved exception step fields", { droppedKeys: s }), this.Kv.add(Ei({
					[ne]: t,
					[re]: (/* @__PURE__ */ new Date()).toISOString()
				}, e));
			} catch (t) {
				Th.error("Failed to add exception step. Ignoring breadcrumb.", t);
			}
		}
		sendExceptionEvent(t) {
			try {
				const i = t.$exception_list;
				if (this.tf(i)) {
					if (this.ef(i)) return this.if("Exception dropped: matched a suppression rule"), void Th.info("Skipping exception capture because a suppression rule matched");
					if (!this.Xv && this.nf(i)) return this.if("Exception dropped: thrown by a browser extension"), void Th.info("Skipping exception capture because it was thrown by an extension");
					if (!this.Xv && this.sf(i)) return this.if("Exception dropped: thrown by an injected browser script"), void Th.info("Skipping exception capture because it was thrown by an injected browser script");
					if (!this._instance.config.error_tracking.__capturePostHogExceptions && this.rf(i)) return this.if("Exception dropped: thrown by the PostHog SDK"), void Th.info("Skipping exception capture because it was thrown by the PostHog SDK");
				}
				const e = this.Qv.enabled && A(t.$exception_steps) ? this.lf(t) : t, s = function() {
					const t = globalThis._posthogReleaseId;
					return "string" == typeof t && t.length > 0 ? t : void 0;
				}();
				s && (e.$release_id = s);
				try {
					const t = this._instance.capture("$exception", e, {
						_noTruncate: !0,
						_batchKey: "exceptionEvent",
						ah: !0
					});
					return t && this.Kv.clear(), t;
				} catch (t) {
					kh(t) || Th.error("Failed to capture exception event. Dropping this exception.", t), this.Kv.clear();
					return;
				}
			} catch (t) {
				kh(t) || Th.error("Failed to process exception event. Ignoring this exception.", t);
				return;
			}
		}
		lf(t) {
			try {
				const i = this.Kv.getAttachable();
				return 0 === i.length ? t : Ei(Ei({}, t), {}, { $exception_steps: i });
			} catch (i) {
				return Th.error("Failed to read buffered exception steps. Capturing exception without steps.", i), t;
			}
		}
		if(t) {
			this.Qv.enabled && this.Kv.add({
				[ne]: t,
				[re]: (/* @__PURE__ */ new Date()).toISOString()
			});
		}
		Yv(t) {
			return C(t) ? Ei({}, t) : {};
		}
		Jv() {
			var t, i;
			return null !== (t = null === (i = this._instance.config.error_tracking) || void 0 === i ? void 0 : i.exception_steps) && void 0 !== t ? t : {};
		}
		ef(t) {
			if (0 === t.length) return !1;
			try {
				const i = t.reduce((t, { type: i, value: e }) => (I(i) && i.length > 0 && t.$exception_types.push(i), I(e) && e.length > 0 && t.$exception_values.push(e), t), {
					$exception_types: [],
					$exception_values: []
				});
				return this.Gv.some((t) => {
					const e = t.values.map((t) => {
						const e = Ga[t.operator], s = i[t.key];
						if (!e || !s) return !1;
						const n = T(t.value) ? t.value : [t.value];
						return n.length > 0 && e(n, s);
					});
					return "OR" === t.type ? e.some(Boolean) : e.every(Boolean);
				});
			} catch (t) {
				return Th.warn("Failed to evaluate suppression rules. Capturing the exception.", t), !1;
			}
		}
		nf(t) {
			const i = t.flatMap((t) => {
				var i, e;
				return null !== (i = null === (e = t.stacktrace) || void 0 === e ? void 0 : e.frames) && void 0 !== i ? i : [];
			}), e = i.filter(({ filename: t }) => !!t && Oh.some((i) => t.startsWith(i)));
			return 0 !== e.length && (!e.every(({ filename: t }) => !!t && t.startsWith(Ph)) || t.some(({ type: t, value: i }) => "NoResponse" === t || I(i) && Ch.some(({ value: t, exact: e }) => e ? i === t : i.includes(t))) && !i.some(({ in_app: t, filename: i }) => t && !(null == i ? void 0 : i.startsWith(Ph))));
		}
		sf(t) {
			return t.some(({ value: t }) => I(t) && Rh.some((i) => t.includes(i)));
		}
		rf(t) {
			if (t.length > 0) {
				var i, e, s, n;
				const r = null !== (i = null === (e = t[0].stacktrace) || void 0 === e ? void 0 : e.frames) && void 0 !== i ? i : [], o = r[r.length - 1];
				return null !== (s = null == o || null === (n = o.filename) || void 0 === n ? void 0 : n.includes("posthog.com/static")) && void 0 !== s && s;
			}
			return !1;
		}
		tf(t) {
			return !A(t) && T(t);
		}
	}
};
var id = Ei({ productTours: class {
	get Ca() {
		return this._instance.persistence;
	}
	constructor(t) {
		this.af = null, this.uf = null, this._instance = t;
	}
	initialize() {
		this.loadIfEnabled();
	}
	onRemoteConfig(t) {
		if (!t.ok) return;
		const i = t.config;
		if ("productTours" in i) {
			var e, s;
			if (this.Ca && this.Ca.register({ [ws]: !!i.productTours }), !th(this._instance)) return !this.af && A(null === (e = this.Ca) || void 0 === e ? void 0 : e.props.ph_product_tours) || Zu.info("product tours disabled; stopping and clearing cached tours"), null === (s = this.af) || void 0 === s || s.stop(), this.af = null, void this.clearCache();
			this.loadIfEnabled();
		}
	}
	loadIfEnabled() {
		!this.af && th(this._instance) && this.qo(() => this.hf());
	}
	qo(t) {
		var i, e, s;
		(null === (i = c.__PosthogExtensions__) || void 0 === i ? void 0 : i.generateProductTours) ? t() : null === (e = c.__PosthogExtensions__) || void 0 === e || null === (s = e.loadExternalDependency) || void 0 === s || s.call(e, this._instance, "product-tours", (i) => {
			i ? Zu.error("Could not load product tours script", i) : t();
		});
	}
	hf() {
		var t;
		!this.af && null !== (t = c.__PosthogExtensions__) && void 0 !== t && t.generateProductTours && (this.af = c.__PosthogExtensions__.generateProductTours(this._instance, !0));
	}
	getProductTours(t, i = !1) {
		if (T(this.uf) && !i) return void t(this.uf, { isLoaded: !0 });
		const e = this.Ca;
		if (e) {
			const s = e.props[en];
			if (T(s) && !i) return this.uf = s, void t(s, { isLoaded: !0 });
		}
		this._instance._send_request({
			url: this._instance.requestRouter.endpointFor("api", `/api/product_tours/?token=${this._instance.config.token}`),
			method: "GET",
			timestampMode: "query",
			callback: (i) => {
				if (!th(this._instance)) return void t([], { isLoaded: !0 });
				const s = i.statusCode;
				if (200 !== s || !i.json) {
					const e = `Product Tours API could not be loaded, status: ${s}`;
					0 === s ? i.error || Zu.warn(e) : Zu.error(e), t([], {
						isLoaded: !1,
						error: e
					});
					return;
				}
				const n = T(i.json.product_tours) ? i.json.product_tours : [];
				this.uf = n, e && e.register({ [en]: n }), t(n, { isLoaded: !0 });
			}
		});
	}
	getActiveProductTours(t) {
		A(this.af) ? t([], {
			isLoaded: !1,
			error: "Product tours not loaded"
		}) : this.af.getActiveProductTours(t);
	}
	showProductTour(t) {
		var i;
		null === (i = this.af) || void 0 === i || i.showTourById(t);
	}
	previewTour(t) {
		this.af ? this.af.previewTour(t) : this.qo(() => {
			var i;
			this.hf(), null === (i = this.af) || void 0 === i || i.previewTour(t);
		});
	}
	dismissProductTour() {
		var t;
		null === (t = this.af) || void 0 === t || t.dismissTour("user_clicked_skip");
	}
	nextStep() {
		var t;
		null === (t = this.af) || void 0 === t || t.nextStep();
	}
	previousStep() {
		var t;
		null === (t = this.af) || void 0 === t || t.previousStep();
	}
	clearCache() {
		var t;
		this.uf = null, null === (t = this.Ca) || void 0 === t || t.unregister("ph_product_tours");
	}
	resetTour(t) {
		var i;
		null === (i = this.af) || void 0 === i || i.resetTour(t);
	}
	resetAllTours() {
		var t;
		null === (t = this.af) || void 0 === t || t.resetAllTours();
	}
	cancelPendingTour(t) {
		var i;
		null === (i = this.af) || void 0 === i || i.cancelPendingTour(t);
	}
} }, Xh);
var ed = { siteApps: class {
	constructor(t) {
		this._instance = t, this.cf = 0, this.df = [], this.apps = {};
	}
	get isEnabled() {
		return !!this._instance.config.opt_in_site_apps;
	}
	vf(t, i) {
		if (!i) return;
		const e = this.globalsForEvent(i);
		this.df.push(e), this.df.length > 1e3 && (this.df = this.df.slice(10));
	}
	get siteAppLoaders() {
		var t;
		return null === (t = c._POSTHOG_REMOTE_CONFIG) || void 0 === t || null === (t = t[this._instance.config.token]) || void 0 === t ? void 0 : t.siteApps;
	}
	initialize() {
		if (this.isEnabled) {
			const t = this._instance._addCaptureHook(this.vf.bind(this));
			this.ff = () => {
				t(), this.df = [], this.ff = void 0;
			};
		}
	}
	globalsForEvent(t) {
		var i, e, s, n, r, o, l;
		if (!t) throw new Error("Event payload is required");
		const a = {}, u = this._instance.get_property("$groups") || [], h = this._instance.get_property("$stored_group_properties") || {};
		for (const [t, i] of Object.entries(h)) a[t] = {
			id: u[t],
			type: t,
			properties: i
		};
		const { $set_once: d, $set: c } = t;
		return {
			event: Ei(Ei({}, xe(t, ih)), {}, {
				properties: Ei(Ei(Ei({}, t.properties), c ? { $set: Ei(Ei({}, null !== (i = null === (e = t.properties) || void 0 === e ? void 0 : e.$set) && void 0 !== i ? i : {}), c) } : {}), d ? { $set_once: Ei(Ei({}, null !== (s = null === (n = t.properties) || void 0 === n ? void 0 : n.$set_once) && void 0 !== s ? s : {}), d) } : {}),
				elements_chain: null !== (r = null === (o = t.properties) || void 0 === o ? void 0 : o.$elements_chain) && void 0 !== r ? r : "",
				distinct_id: null === (l = t.properties) || void 0 === l ? void 0 : l.distinct_id
			}),
			person: { properties: this._instance.get_property("$stored_person_properties") },
			groups: a
		};
	}
	pf(t) {
		var i;
		const e = null === (i = t.tagName) || void 0 === i ? void 0 : i.toLowerCase();
		if ("style" === e && this._instance.config.prepare_external_dependency_stylesheet) return this._instance.config.prepare_external_dependency_stylesheet(t) || (eh.error("prepare_external_dependency_stylesheet returned null"), null);
		if ("script" === e && this._instance.config.prepare_external_dependency_script) return this._instance.config.prepare_external_dependency_script(t) || (eh.error("prepare_external_dependency_script returned null"), null);
		return t;
	}
	gf() {
		var t, i, e, n, r, o, l, a;
		if (!this._instance.config.prepare_external_dependency_stylesheet && !this._instance.config.prepare_external_dependency_script) return () => {};
		const u = null == s ? void 0 : s.defaultView, h = null == u || null === (t = u.Node) || void 0 === t ? void 0 : t.prototype;
		if (!u || !h) return () => {};
		if (this.cf++, this.mf) return this.yf();
		const d = [], c = this, v = /* @__PURE__ */ new WeakSet(), f = (t, i, e) => {
			if (!(null == t ? void 0 : t[i])) return;
			const s = t[i];
			t[i] = e(s), d.push(() => {
				t[i] = s;
			});
		}, p = (t) => {
			if (v.has(t)) return t;
			const i = c.pf(t);
			return i && v.add(i), i;
		}, _ = (t) => t.map((t) => "string" == typeof t ? t : p(t)).filter((t) => !M(t));
		return f(h, "appendChild", (t) => function(i) {
			const e = p(i);
			return e ? t.call(this, e) : i;
		}), f(h, "insertBefore", (t) => function(i, e) {
			const s = p(i);
			return s ? t.call(this, s, e) : i;
		}), f(h, "replaceChild", (t) => function(i, e) {
			const s = p(i);
			return s ? t.call(this, s, e) : e;
		}), [
			null === (i = u.Element) || void 0 === i ? void 0 : i.prototype,
			null === (e = u.Document) || void 0 === e ? void 0 : e.prototype,
			null === (n = u.DocumentFragment) || void 0 === n ? void 0 : n.prototype
		].forEach((t) => {
			f(t, "append", (t) => function(...i) {
				return t.apply(this, _(i));
			}), f(t, "prepend", (t) => function(...i) {
				return t.apply(this, _(i));
			});
		}), [
			null === (r = u.Element) || void 0 === r ? void 0 : r.prototype,
			null === (o = u.CharacterData) || void 0 === o ? void 0 : o.prototype,
			null === (l = u.DocumentType) || void 0 === l ? void 0 : l.prototype
		].forEach((t) => {
			f(t, "before", (t) => function(...i) {
				return t.apply(this, _(i));
			}), f(t, "after", (t) => function(...i) {
				return t.apply(this, _(i));
			}), f(t, "replaceWith", (t) => function(...i) {
				const e = _(i);
				return i.length && !e.length ? void 0 : t.apply(this, e);
			});
		}), f(null === (a = u.Element) || void 0 === a ? void 0 : a.prototype, "insertAdjacentElement", (t) => function(i, e) {
			const s = p(e);
			return s ? t.call(this, i, s) : null;
		}), this.mf = () => {
			d.forEach((t) => t()), this.mf = void 0;
		}, this.yf();
	}
	yf() {
		let t = !1;
		return () => {
			var i;
			t || (t = !0, this.cf--, 0 === this.cf && (null === (i = this.mf) || void 0 === i || i.call(this)));
		};
	}
	bf(t, i = !0) {
		const e = this.gf();
		try {
			const s = t(e);
			return i && e(), s;
		} catch (t) {
			throw e(), t;
		}
	}
	setupSiteApp(t) {
		const i = this.apps[t.id], e = () => {
			var e;
			!i.errored && this.df.length && (eh.info(`Processing ${this.df.length} events for site app with id ${t.id}`), this.df.forEach((t) => this.bf(() => {
				var e;
				return null === (e = i.processEvent) || void 0 === e ? void 0 : e.call(i, t);
			})), i.processedBuffer = !0), Object.values(this.apps).every((t) => t.processedBuffer || t.errored) && (null === (e = this.ff) || void 0 === e || e.call(this));
		};
		let s = !1;
		const n = (n) => {
			i.errored = !n, i.loaded = !0, eh.info(`Site app with id ${t.id} ${n ? "loaded" : "errored"}`), s && e();
		};
		try {
			const { processEvent: e } = this.bf((i) => t.init({
				posthog: this._instance,
				callback(t) {
					i(), n(t);
				}
			}), !1);
			e && (i.processEvent = e), s = !0;
		} catch (i) {
			eh.error(sh + t.id, i), n(!1);
		}
		if (s && i.loaded) try {
			e();
		} catch (e) {
			eh.error(`Error while processing buffered events PostHog app with config id ${t.id}`, e), i.errored = !0;
		}
	}
	_f() {
		const t = this.siteAppLoaders || [];
		for (const i of t) this.apps[i.id] = {
			id: i.id,
			loaded: !1,
			errored: !1,
			processedBuffer: !1
		};
		for (const i of t) this.setupSiteApp(i);
	}
	wf(t) {
		if (0 === Object.keys(this.apps).length) return;
		const i = this.globalsForEvent(t);
		for (const e of Object.values(this.apps)) try {
			this.bf(() => {
				var t;
				return null === (t = e.processEvent) || void 0 === t ? void 0 : t.call(e, i);
			});
		} catch (i) {
			eh.error(`Error while processing event ${t.event} for site app ${e.id}`, i);
		}
	}
	onRemoteConfig(t) {
		var i, e, s;
		if (null === (i = this.siteAppLoaders) || void 0 === i ? void 0 : i.length) return this.isEnabled ? (this._f(), void this._instance.on("eventCaptured", (t) => this.wf(t))) : void eh.error("PostHog site apps are disabled. Enable the \"opt_in_site_apps\" config to proceed.");
		if (null === (e = this.ff) || void 0 === e || e.call(this), !t.ok) return;
		const n = t.config;
		if (null === (s = n.siteApps) || void 0 === s ? void 0 : s.length) if (this.isEnabled) for (const { id: t, url: i } of n.siteApps) {
			var r, o;
			c[`__$$ph_site_app_${t}`] = this._instance, null === (r = c.__PosthogExtensions__) || void 0 === r || null === (o = r.loadSiteApp) || void 0 === o || o.call(r, this._instance, i, (i) => {
				if (i) return eh.error(sh + t, i);
			});
		}
		else eh.error("PostHog site apps are disabled. Enable the \"opt_in_site_apps\" config to proceed.");
	}
} };
var sd = { tracingHeaders: class {
	constructor(t) {
		this._instance = t, this.kf = void 0, this.Sf = void 0, this.xf = void 0, this.Nv = () => {
			const t = this.Cf();
			var i, e;
			t ? (R(this.kf) && (this.kf = null === (i = c.__PosthogExtensions__) || void 0 === i || null === (i = i.tracingHeadersPatchFns) || void 0 === i ? void 0 : i._patchXHR(t, () => this._instance.get_distinct_id(), this._instance.sessionManager)), R(this.Sf) && (this.Sf = null === (e = c.__PosthogExtensions__) || void 0 === e || null === (e = e.tracingHeadersPatchFns) || void 0 === e ? void 0 : e._patchFetch(t, () => this._instance.get_distinct_id(), this._instance.sessionManager))) : this.Uv();
		};
	}
	initialize() {
		this.startIfEnabledOrStop();
	}
	qo(t) {
		var i, e, s;
		(null === (i = c.__PosthogExtensions__) || void 0 === i ? void 0 : i.tracingHeadersPatchFns) ? t() : null === (e = c.__PosthogExtensions__) || void 0 === e || null === (s = e.loadExternalDependency) || void 0 === s || s.call(e, this._instance, "tracing-headers", (i) => {
			if (i) return zu.error("failed to load script", i);
			t();
		});
	}
	$f() {
		var t, i;
		return null !== (t = null !== (i = this._instance.config.tracing_headers) && void 0 !== i ? i : this._instance.config.addTracingHeaders) && void 0 !== t ? t : this._instance.config.__add_tracing_headers;
	}
	Cf() {
		const t = this.$f();
		return T(t) ? (T(this.xf) ? this.xf.splice(0, this.xf.length, ...t) : this.xf = [...t], t.length > 0 ? this.xf : void 0) : (T(this.xf) && this.xf.splice(0), this.xf = t || void 0, this.xf);
	}
	Uv() {
		var t, i;
		null === (t = this.kf) || void 0 === t || t.call(this), null === (i = this.Sf) || void 0 === i || i.call(this), this.kf = void 0, this.Sf = void 0;
	}
	startIfEnabledOrStop() {
		this.Cf() ? this.qo(this.Nv) : this.Uv();
	}
} };
var nd = Ei({ surveys: class extends lh {
	constructor(t) {
		var i;
		super(new vh(t), (i = t, {
			get projectToken() {
				return i.config.token;
			},
			kv: new ch(i)
		})), this._instance = t;
	}
	Oh(t, i) {
		const e = i.query ? _a(t, i.query) : t;
		return new Promise((t) => {
			var s;
			this._instance._send_request({
				method: i.method,
				url: this._instance.requestRouter.endpointFor(null !== (s = i.target) && void 0 !== s ? s : "api", e),
				data: i.body,
				headers: i.headers,
				timeout: i.timeoutMs,
				fireCallbackOnDrop: !0,
				transport: i.transport,
				compression: i.compression,
				timestampMode: i.sentAt,
				callback: t
			});
		});
	}
} }, Xh);
var rd = { toolbar: class {
	constructor(t) {
		this.instance = t;
	}
	If(t) {
		c.ph_toolbar_state = t;
	}
	Tf() {
		var t;
		return null !== (t = c.ph_toolbar_state) && void 0 !== t ? t : 0;
	}
	initialize() {
		return this.maybeLoadToolbar();
	}
	maybeLoadToolbar(i = void 0, e = void 0, n = void 0) {
		var r, o;
		if (Zn(this.instance.config)) return !1;
		if (!t || !s) return !1;
		i = null !== (r = i) && void 0 !== r ? r : t.location, n = null !== (o = n) && void 0 !== o ? o : t.history;
		try {
			if (!e) {
				try {
					t.localStorage.setItem("test", "test"), t.localStorage.removeItem("test");
				} catch (t) {
					return !1;
				}
				e = null == t ? void 0 : t.localStorage;
			}
			const s = fh || Fo(i.hash, "__posthog") || Fo(i.hash, "state");
			let r;
			const o = s ? fi(() => JSON.parse(atob(decodeURIComponent(s)))) || fi(() => JSON.parse(decodeURIComponent(s))) : null;
			return o && "ph_authorize" === o.action ? (r = o, r.source = "url", r && Object.keys(r).length > 0 && (o.desiredHash ? i.hash = o.desiredHash : n ? n.replaceState(n.state, "", i.pathname + i.search) : i.hash = "")) : (r = JSON.parse(e.getItem(ph) || "{}"), r.source = "localstorage", delete r.userIntent), !(!r.token || this.instance.config.token !== r.token || (this.loadToolbar(r), 0));
		} catch (t) {
			return !1;
		}
	}
	Mf(t) {
		const i = c.ph_load_toolbar || c.ph_load_editor;
		!A(i) && P(i) ? i(t, this.instance) : _h.warn("No toolbar load function found");
	}
	loadToolbar(i) {
		const e = !!(null == s ? void 0 : s.getElementById("__POSTHOG_TOOLBAR__"));
		if (!t || e) return !1;
		const n = "custom" === this.instance.requestRouter.region && this.instance.config.advanced_disable_toolbar_metrics, r = Ei(Ei({ token: this.instance.config.token }, i), {}, { apiURL: this.instance.requestRouter.endpointFor("ui") }, n ? { instrument: !1 } : {});
		if (t.localStorage.setItem(ph, JSON.stringify(Ei(Ei({}, r), {}, { source: void 0 }))), 2 === this.Tf()) this.Mf(r);
		else if (0 === this.Tf()) {
			var o, l;
			this.If(1), null === (o = c.__PosthogExtensions__) || void 0 === o || null === (l = o.loadExternalDependency) || void 0 === l || l.call(o, this.instance, "toolbar", (t) => {
				if (t) return _h.error("[Toolbar] Failed to load", t), void this.If(0);
				this.If(2), this.Mf(r);
			}), Qn(t, "turbolinks:load", () => {
				this.If(0), this.loadToolbar(r);
			});
		}
		return !0;
	}
	Ef(t) {
		return this.loadToolbar(t);
	}
	maybeLoadEditor(t = void 0, i = void 0, e = void 0) {
		return this.maybeLoadToolbar(t, i, e);
	}
} };
var od = Ei({ experiments: class i {
	get Ir() {
		return this._instance.config;
	}
	constructor(t) {
		this._instance = t, this.getWebExperimentsAndEvaluateDisplayLogic = (t = !1) => {
			this.getWebExperiments((t) => {
				i.Pf("retrieved web experiments from the server"), this.Rf = /* @__PURE__ */ new Map(), t.forEach((t) => {
					if (t.feature_flag_key) {
						var e;
						this.Rf && (i.Pf("setting flag key ", t.feature_flag_key, " to web experiment ", t), null === (e = this.Rf) || void 0 === e || e.set(t.feature_flag_key, t));
						const s = this._instance.getFeatureFlag(t.feature_flag_key);
						I(s) && t.variants[s] && this.Af(t.name, s, t.variants[s].transforms);
					} else if (t.variants) for (const e in t.variants) {
						const s = t.variants[e];
						i.Ff(s, this._instance) && this.Af(t.name, e, s.transforms);
					}
				});
			}, t);
		}, this._instance.onFeatureFlags((t) => {
			this.onFeatureFlags(t);
		});
	}
	initialize() {}
	onFeatureFlags(t) {
		if (this._is_bot()) i.Pf(Ih);
		else if (!this.Ir.disable_web_experiments) {
			if (A(this.Rf)) return this.Rf = /* @__PURE__ */ new Map(), this.loadIfEnabled(), void this.previewWebExperiment();
			i.Pf("applying feature flags", t), t.forEach((t) => {
				var i;
				if (this.Rf && (null === (i = this.Rf) || void 0 === i ? void 0 : i.has(t))) {
					var e;
					const i = this._instance.getFeatureFlag(t), s = null === (e = this.Rf) || void 0 === e ? void 0 : e.get(t);
					i && null != s && s.variants[i] && this.Af(s.name, i, s.variants[i].transforms);
				}
			});
		}
	}
	previewWebExperiment() {
		const t = i.getWindowLocation();
		if (null == t ? void 0 : t.search) {
			const e = Ro(null == t ? void 0 : t.search, "__experiment_id"), s = Ro(null == t ? void 0 : t.search, "__experiment_variant");
			e && s && (i.Pf(`previewing web experiments ${e} && ${s}`), this.getWebExperiments((t) => {
				this.Of(parseInt(e), s, t);
			}, !1, !0));
		}
	}
	loadIfEnabled() {
		this.Ir.disable_web_experiments || this.getWebExperimentsAndEvaluateDisplayLogic();
	}
	getWebExperiments(t, i, e) {
		if (this.Ir.disable_web_experiments && !e) return t([]);
		const s = this._instance.get_property("$web_experiments");
		if (s && !i) return t(s);
		this._instance._send_request({
			url: this._instance.requestRouter.endpointFor("api", `/api/web_experiments/?token=${this.Ir.token}`),
			method: "GET",
			timestampMode: "query",
			callback: (i) => t(200 === i.statusCode && i.json && i.json.experiments || [])
		});
	}
	Of(t, e, s) {
		const n = s.filter((i) => i.id === t);
		n && n.length > 0 && (i.Pf(`Previewing web experiment [${n[0].name}] with variant [${e}]`), this.Af(n[0].name, e, n[0].variants[e].transforms));
	}
	static Ff(t, e) {
		return !A(t.conditions) && i.Df(t, e) && i.Lf(t);
	}
	static Df(t, e) {
		var s;
		if (A(t.conditions) || A(null === (s = t.conditions) || void 0 === s ? void 0 : s.url)) return !0;
		const n = i.getWindowLocation();
		if (n) {
			var r, o, l;
			const i = Cr(e, n.href);
			return !(null === (r = t.conditions) || void 0 === r ? void 0 : r.url) || Fh[null !== (o = null === (l = t.conditions) || void 0 === l ? void 0 : l.urlMatchType) && void 0 !== o ? o : "icontains"](t.conditions.url, i);
		}
		return !1;
	}
	static getWindowLocation() {
		return null == t ? void 0 : t.location;
	}
	static Lf(t) {
		var i;
		if (A(t.conditions) || A(null === (i = t.conditions) || void 0 === i ? void 0 : i.utm)) return !0;
		const e = Bo();
		if (e.utm_source) {
			var s, n, r, o, l, a, u, h;
			const i = !(null === (s = t.conditions) || void 0 === s || null === (s = s.utm) || void 0 === s ? void 0 : s.utm_campaign) || (null === (n = t.conditions) || void 0 === n || null === (n = n.utm) || void 0 === n ? void 0 : n.utm_campaign) == e.utm_campaign, d = !(null === (r = t.conditions) || void 0 === r || null === (r = r.utm) || void 0 === r ? void 0 : r.utm_source) || (null === (o = t.conditions) || void 0 === o || null === (o = o.utm) || void 0 === o ? void 0 : o.utm_source) == e.utm_source, c = !(null === (l = t.conditions) || void 0 === l || null === (l = l.utm) || void 0 === l ? void 0 : l.utm_medium) || (null === (a = t.conditions) || void 0 === a || null === (a = a.utm) || void 0 === a ? void 0 : a.utm_medium) == e.utm_medium, v = !(null === (u = t.conditions) || void 0 === u || null === (u = u.utm) || void 0 === u ? void 0 : u.utm_term) || (null === (h = t.conditions) || void 0 === h || null === (h = h.utm) || void 0 === h ? void 0 : h.utm_term) == e.utm_term;
			return i && c && v && d;
		}
		return !1;
	}
	static Pf(t, ...i) {
		Je.info(`[WebExperiments] ${t}`, i);
	}
	Af(t, e, s) {
		this._is_bot() ? i.Pf(Ih) : "control" !== e ? s.forEach((s) => {
			if (s.selector) {
				var n;
				i.Pf(`applying transform of variant ${e} for experiment ${t} `, s);
				(null === (n = document) || void 0 === n ? void 0 : n.querySelectorAll(s.selector))?.forEach((t) => {
					const i = t;
					s.html && (i.innerHTML = s.html), s.css && i.setAttribute("style", s.css);
				});
			}
		}) : i.Pf("Control variants leave the page unmodified.");
	}
	_is_bot() {
		return e && this._instance ? Ua(e, this.Ir.custom_blocked_useragents) : void 0;
	}
} }, Xh);
var ld = { conversations: class {
	constructor(t) {
		this._instance = t, this.Nf = void 0, this._conversationsManager = null, this.qf = !1, this.ne = null, this.jf = !1;
	}
	initialize() {
		this.loadIfEnabled();
	}
	onRemoteConfig(t) {
		if (this._instance.config.disable_conversations) return;
		if (this.Bf = t.ok, !t.ok) return;
		const i = t.config.conversations;
		A(i) || (j(i) ? this.Nf = i : (this.Nf = i.enabled, this.ne = i), this.loadIfEnabled());
	}
	reset() {
		var t;
		null === (t = this._conversationsManager) || void 0 === t || t.reset(), this._conversationsManager = null, this.Nf = void 0, this.ne = null, this.Bf = void 0, this.jf = !1;
	}
	loadIfEnabled() {
		if (this._conversationsManager) return;
		if (this.qf) return;
		if (this._instance.config.disable_conversations) return;
		if (Zn(this._instance.config)) return;
		if (this._instance.config.cookieless_mode && this._instance.consent.isOptedOut()) return;
		const t = null == c ? void 0 : c.__PosthogExtensions__;
		if (t && !R(this.Nf) && this.Nf) if (this.ne && this.ne.token) {
			this.qf = !0;
			try {
				const i = t.initConversations;
				if (i) return this.Hf(i), void (this.qf = !1);
				const e = t.loadExternalDependency;
				if (!e) return void this.zf(Fn);
				e(this._instance, "conversations", (i) => {
					i || !t.initConversations ? this.zf("Could not load conversations script", i) : this.Hf(t.initConversations), this.qf = !1;
				});
			} catch (t) {
				this.zf("Error initializing conversations", t), this.qf = !1;
			}
		} else Mh.error("Conversations enabled but missing token in remote config.");
	}
	Hf(t) {
		if (this.ne) try {
			this._conversationsManager = t(this.ne, this._instance), this.jf = !1, Mh.info("Conversations loaded successfully");
		} catch (t) {
			this.zf("Error completing conversations initialization", t);
		}
		else Mh.error("Cannot complete initialization: remote config is null");
	}
	zf(t, i) {
		Mh.error(t, i), this._conversationsManager = null, this.qf = !1, this.jf = !0;
	}
	show() {
		this._conversationsManager ? this._conversationsManager.show() : Mh.warn("Conversations not loaded yet.");
	}
	hide() {
		this._conversationsManager && this._conversationsManager.hide();
	}
	isAvailable() {
		return !0 === this.Nf && !M(this._conversationsManager);
	}
	getUnavailableReason() {
		return this.isAvailable() ? null : this._instance.config.disable_conversations ? "disabled_by_config" : Zn(this._instance.config) ? "disabled_for_toolbar" : this._instance.config.cookieless_mode && this._instance.consent.isOptedOut() ? "consent_opted_out" : !1 === this.Bf ? "remote_config_failed" : R(this.Nf) ? this.Bf ? "disabled_in_project" : "remote_config_pending" : this.Nf ? A(this.ne) || !this.ne.token ? "missing_token" : (null == c ? void 0 : c.__PosthogExtensions__) ? this.qf ? "initializing" : this.jf ? "load_failed" : "not_loaded" : "extensions_unavailable" : "disabled_in_project";
	}
	isVisible() {
		var t, i;
		return null !== (t = null === (i = this._conversationsManager) || void 0 === i ? void 0 : i.isVisible()) && void 0 !== t && t;
	}
	sendMessage(t, i, e) {
		var s = this;
		return Y(function* () {
			return s._conversationsManager ? s._conversationsManager.sendMessage(t, i, e) : (Mh.warn(Ah), null);
		})();
	}
	getMessages(t, i) {
		var e = this;
		return Y(function* () {
			return e._conversationsManager ? e._conversationsManager.getMessages(t, i) : (Mh.warn(Ah), null);
		})();
	}
	markAsRead(t) {
		var i = this;
		return Y(function* () {
			return i._conversationsManager ? i._conversationsManager.markAsRead(t) : (Mh.warn(Ah), null);
		})();
	}
	getTickets(t) {
		var i = this;
		return Y(function* () {
			return i._conversationsManager ? i._conversationsManager.getTickets(t) : (Mh.warn(Ah), null);
		})();
	}
	requestRestoreLink(t) {
		var i = this;
		return Y(function* () {
			return i._conversationsManager ? i._conversationsManager.requestRestoreLink(t) : (Mh.warn(Ah), null);
		})();
	}
	restoreFromToken(t) {
		var i = this;
		return Y(function* () {
			return i._conversationsManager ? i._conversationsManager.restoreFromToken(t) : (Mh.warn(Ah), null);
		})();
	}
	restoreFromUrlToken() {
		var t = this;
		return Y(function* () {
			return t._conversationsManager ? t._conversationsManager.restoreFromUrlToken() : (Mh.warn(Ah), null);
		})();
	}
	getCurrentTicketId() {
		var t, i;
		return null !== (t = null === (i = this._conversationsManager) || void 0 === i ? void 0 : i.getCurrentTicketId()) && void 0 !== t ? t : null;
	}
	getWidgetSessionId() {
		var t, i;
		return null !== (t = null === (i = this._conversationsManager) || void 0 === i ? void 0 : i.getWidgetSessionId()) && void 0 !== t ? t : null;
	}
	bh() {
		var t;
		null === (t = this._conversationsManager) || void 0 === t || t.setIdentity();
	}
	_h() {
		var t;
		null === (t = this._conversationsManager) || void 0 === t || t.clearIdentity();
	}
} };
var ad = { logs: class {
	constructor(i) {
		var e;
		this._instance = i, this.name = "logs", this.Uf = !1, this.Wf = !1, this.Vf = !1, this.$ = Ye("[logs]"), this.Gf = Ei(Ei({}, this.$), {}, { error: (...t) => {
			t.some(zh) || this.$.error(...t);
		} }), this.na = [], this.Zf = [], this.od = 0, this.xo = !1, this.Qf = [], this.Jf = [], this.Kf = !1, this.Xf = !1, this.Yf = () => {
			var t, i;
			this.xo || (this.od = 0, null === (t = this.tp) || void 0 === t || t.onReconnect(), null === (i = this.ep) || void 0 === i || i.onReconnect());
		}, this._instance && null !== (e = this._instance.config.logs) && void 0 !== e && e.captureConsoleLogs && (this.Uf = !0), t && Qn(t, "online", this.Yf);
	}
	np(t, i, e, s) {
		var n;
		const r = Dh(null === (n = this._instance) || void 0 === n || null === (n = n.config) || void 0 === n ? void 0 : n.logs, e);
		return [new He(this.sp(t, i), r, this.Gf, () => this.rp(), (t) => t(), void 0, s), r];
	}
	op() {
		var t;
		const i = null === (t = this._instance) || void 0 === t || null === (t = t.config) || void 0 === t ? void 0 : t.logs;
		var e;
		return this.tp && this.lp === i || (null === (e = this.tp) || void 0 === e || e.reset(), this.lp = i, [this.tp, this.ap] = this.np(() => this.na, (t) => {
			this.na = t;
		})), this.tp;
	}
	up() {
		var t;
		const i = null === (t = this._instance) || void 0 === t || null === (t = t.config) || void 0 === t ? void 0 : t.logs;
		var e;
		return this.ep && this.hp === i || (null === (e = this.ep) || void 0 === e || e.reset(), this.hp = i, [this.ep, this.cp] = this.np(() => this.Zf, (t) => {
			this.Zf = t;
		}, {
			serviceNameDefault: "posthog-browser-logs",
			consoleCapture: !0
		}, Lh)), this.ep;
	}
	setup(t) {
		var i;
		if (this.xo) return;
		this.mo = t, null !== (i = this._instance) && void 0 !== i && null !== (i = i.config) && void 0 !== i && null !== (i = i.logs) && void 0 !== i && i.captureConsoleLogs && (this.Uf = !0), (this.Uf || this.dp() && this.vp()) && this.fp();
		let e = !1;
		const s = t.onRemoteConfig((t) => {
			var i;
			e = t.ok && !0 === (null === (i = t.config.logs) || void 0 === i ? void 0 : i.captureConsoleLogs), this.onRemoteConfig(t);
		});
		this.xo ? s.dispose() : (this.Io = s, e || this.loadIfEnabled());
	}
	dispose() {
		var i, e, s, n;
		this.xo || (this.xo = !0, this.pp(), null === (i = this.Io) || void 0 === i || i.dispose(), this.Io = void 0, this.mo = void 0, this.Vf = !1, t?.removeEventListener("online", this.Yf), null === (e = this.gp) || void 0 === e || e.call(this), this.gp = void 0, null === (s = this.tp) || void 0 === s || s.reset(), null === (n = this.ep) || void 0 === n || n.reset());
	}
	onRemoteConfig(t) {
		var i, e;
		if (this.xo) return;
		const s = t.ok ? null === (i = t.config.logs) || void 0 === i ? void 0 : i.captureConsoleLogs : void 0;
		A(s) ? this.mp() : (null === (e = this._instance) || void 0 === e || null === (e = e.persistence) || void 0 === e || e.register({ $logs_capture_enabled_server_side: !!s }), s ? (this.Uf = !0, this.Wf || this.fp(), this.loadIfEnabled()) : this.mp());
	}
	reset() {
		var t, i, e, s;
		this.pp(), null === (t = this.tp) || void 0 === t || t.clearQueue(), this.na = [], null === (i = this.tp) || void 0 === i || i.reset(), null === (e = this.ep) || void 0 === e || e.clearQueue(), this.Zf = [], null === (s = this.ep) || void 0 === s || s.reset(), this.od = 0;
	}
	captureLog(t) {
		this.xo || this.op().captureLog(t);
	}
	captureConsoleLog(t) {
		this.xo || this.up().captureLog(t);
	}
	captureBufferedConsoleLog(t, i, e) {
		this.xo || this.up().captureLog(t, {
			context: i,
			occurredAtMs: e
		});
	}
	vp() {
		var t;
		return !!(null === (t = this._instance) || void 0 === t || null === (t = t.persistence) || void 0 === t || null === (t = t.props) || void 0 === t ? void 0 : t[$s]);
	}
	dp() {
		var t, i, e;
		return !(null === (t = this._instance) || void 0 === t || null === (i = t.Yl) || void 0 === i ? void 0 : i.call(t)) || !!(null === (e = c._POSTHOG_REMOTE_CONFIG) || void 0 === e || null === (e = e[this._instance.config.token]) || void 0 === e ? void 0 : e.config);
	}
	kh() {
		var t;
		this.pp(), null === (t = this.ep) || void 0 === t || t.clearQueue(), this.Zf = [];
	}
	mp() {
		this.Uf || this.pp();
	}
	fp() {
		var t;
		if (this.Kf || !(null == c ? void 0 : c.console)) return;
		const i = Dh(null === (t = this._instance) || void 0 === t || null === (t = t.config) || void 0 === t ? void 0 : t.logs).maxBufferSize;
		let e = !0;
		this.Jf.push(() => {
			e = !1;
		});
		for (const t of Nh) {
			let s;
			try {
				s = jh(c.console[t]);
			} catch (t) {
				continue;
			}
			s && this.Jf.push(Uu(c.console, t, (n) => {
				const r = (...s) => {
					try {
						e && this.yp(t, s, i);
					} catch (t) {}
					return n.apply(c.console, s);
				};
				return r.__rrweb_original__ = s, r;
			}));
		}
		this.Kf = !0, this.bp = setTimeout(() => {
			this.pp();
		}, 3e4);
	}
	yp(t, i, e) {
		var s;
		if (this.Kf && !this.Xf && 0 !== i.length) if (null === (s = this._instance) || void 0 === s ? void 0 : s.is_capturing()) {
			if (e > this.Qf.length) {
				this.Xf = !0;
				try {
					this.Qf.push({
						level: t,
						args: i,
						occurredAtMs: Date.now(),
						context: this.rp()
					});
				} finally {
					this.Xf = !1;
				}
			}
		} else this.pp();
	}
	pp() {
		if (this.Qf = [], this.Kf) {
			this.Kf = !1, this.bp && (clearTimeout(this.bp), this.bp = void 0);
			for (const t of this.Jf) t();
			this.Jf = [];
		}
	}
	_p() {
		const t = this.Qf;
		return this.pp(), t;
	}
	get logger() {
		return this.wp || (this.wp = {
			trace: (t, i) => this.captureLog({
				body: t,
				level: "trace",
				attributes: i
			}),
			debug: (t, i) => this.captureLog({
				body: t,
				level: "debug",
				attributes: i
			}),
			info: (t, i) => this.captureLog({
				body: t,
				level: "info",
				attributes: i
			}),
			warn: (t, i) => this.captureLog({
				body: t,
				level: "warn",
				attributes: i
			}),
			error: (t, i) => this.captureLog({
				body: t,
				level: "error",
				attributes: i
			}),
			fatal: (t, i) => this.captureLog({
				body: t,
				level: "fatal",
				attributes: i
			})
		}), this.wp;
	}
	flushLogs(t) {
		t ? this.kp(t) : (this.tp && this.tp.flush().catch((t) => this.Sp(t)), this.ep && this.ep.flush().catch((t) => this.Sp(t)));
	}
	Sp(t) {
		zh(t) || this.$.error("PostHog logs flush failed:", t);
	}
	loadIfEnabled() {
		if (this.xo || !this.Uf || this.Wf || this.Vf) return;
		const t = null == c ? void 0 : c.__PosthogExtensions__;
		if (!t) return this.$.error("PostHog Extensions not found."), void this.pp();
		const i = t.loadExternalDependency;
		if (!i) return this.$.error(Fn), void this.pp();
		this.Vf = !0;
		try {
			i(this._instance, "logs", (i) => {
				if (this.Vf = !1, this.xo || !this.Uf) return;
				const e = t.logs;
				if (i || !(null == e ? void 0 : e.initializeLogs)) this.$.error("Could not load logs script", i), this.pp();
				else {
					var s;
					const t = this._p();
					var n, r;
					this.gp = e.initializeLogs(null !== (s = this.mo) && void 0 !== s ? s : this._instance), this.Wf = !0, t.length > 0 && (null === (n = e.replayConsoleBuffer) || void 0 === n || n.call(e, null !== (r = this.mo) && void 0 !== r ? r : this._instance, t));
				}
			});
		} catch (t) {
			throw this.Vf = !1, t;
		}
	}
	sp(t, i) {
		const e = this._instance;
		return {
			get isDisabled() {
				return !1;
			},
			get optedOut() {
				return !e.is_capturing();
			},
			getPersistedProperty: (i) => i === p.LogsQueue ? t() : void 0,
			setPersistedProperty(t, e) {
				var s;
				t === p.LogsQueue && i(null !== (s = e) && void 0 !== s ? s : []);
			},
			js: (t) => this.js(t),
			getLibraryId: () => es.LIB_NAME,
			getLibraryVersion: () => es.LIB_VERSION
		};
	}
	js(t) {
		return new Promise((i) => {
			if (Mo(this.od, 3)) return void i({
				kind: "fatal",
				error: Uh(void 0, "logs endpoint is unreachable, dropping batch")
			});
			let e = !1;
			const s = (t) => {
				e || (e = !0, clearTimeout(n), i(t));
			}, n = setTimeout(() => {
				this.$.warn("Logs request timed out before receiving a response"), s({
					kind: "retry-later",
					error: Uh(void 0, "logs request timed out")
				});
			}, 9e4);
			this._instance._send_request({
				method: "POST",
				url: this.xp(),
				data: t,
				compression: "best-available",
				batchKey: "logs",
				fireCallbackOnDrop: !0,
				callback: (t) => {
					const i = t.statusCode;
					if (this.Cp(i), i >= 200 && 300 > i) s({ kind: "ok" });
					else if (413 === i) s({ kind: "too-large" });
					else if (0 !== i && 408 !== i && 429 !== i && 500 > i) s({
						kind: "fatal",
						error: /* @__PURE__ */ new Error(`logs request failed with status ${i}`)
					});
					else {
						var e;
						0 === i ? (t.error || this.$.warn("Logs request failed before receiving an HTTP response"), s({
							kind: "retry-later",
							error: Uh(t.error, "logs request failed before receiving an HTTP response")
						})) : s({
							kind: "retry-later",
							error: null !== (e = t.error) && void 0 !== e ? e : /* @__PURE__ */ new Error(`logs request failed with status ${i}`)
						});
					}
				}
			});
		});
	}
	Cp(t) {
		(0 !== t || this._instance.__loaded) && (this.od = Ao(t, this.od, 3, () => this.$.warn("Log requests are failing before receiving an HTTP response; this can happen due to network issues, CORS, browser blocking, or ad blockers. Stopped sending logs; will try again when connectivity changes.")));
	}
	kp(t) {
		this.na.length > 0 && this.$p(t, this.na, this.ap, es.LIB_NAME, (t) => {
			this.na = t;
		}), this.Zf.length > 0 && this.$p(t, this.Zf, this.cp, Lh, (t) => {
			this.Zf = t;
		});
	}
	$p(t, i, e, s, n) {
		if (0 === i.length) return;
		const r = i.map((t) => t.record);
		n([]);
		const o = Le(r, je(e, es.LIB_NAME, es.LIB_VERSION), s, es.LIB_VERSION);
		this._instance._send_request({
			method: "POST",
			url: this.xp(),
			data: o,
			compression: "best-available",
			batchKey: "logs",
			transport: t
		});
	}
	xp() {
		return this._instance.requestRouter.endpointFor("api", "/i/v1/logs") + "?token=" + encodeURIComponent(this._instance.config.token);
	}
	rp() {
		var t;
		const i = {};
		if (i.distinctId = this._instance.get_distinct_id(), this._instance.sessionManager) {
			const { sessionId: t, windowId: e, sessionStartTimestamp: s, lastActivityTimestamp: n } = this._instance.sessionManager.checkAndGetSessionAndWindowId(!0);
			i.sessionId = t, i.windowId = e, A(s) || (i.sessionStartTimestamp = s), A(n) || (i.lastActivityTimestamp = n);
		}
		if (null != c && null !== (t = c.location) && void 0 !== t && t.href && (i.currentUrl = this._instance.config.disable_capture_url_hashes ? vi(c.location.href) : c.location.href), this._instance.featureFlags) {
			const t = this._instance.featureFlags.getFlags();
			t && t.length > 0 && (i.activeFeatureFlags = t);
		}
		return i;
	}
} };
var ud = { metrics: class {
	constructor(t) {
		this._instance = t, this.$ = Ye("[metrics]"), this.xo = !1;
	}
	initialize() {
		this.onConfigChange();
	}
	onConfigChange() {
		var t;
		if (this.xo) return;
		const i = !!(null === (t = this._instance.config.metrics) || void 0 === t ? void 0 : t.network);
		i && !this.Ip ? this.Ip = ((t) => {
			let i = !0;
			const e = () => i ? ((t) => {
				var i;
				const e = null === (i = t.config.metrics) || void 0 === i ? void 0 : i.network;
				return !0 === e ? {} : e || void 0;
			})(t) : void 0, s = Jh(t, e), n = Yh(t, e);
			return () => {
				i = !1, s(), n();
			};
		})(this._instance) : !i && this.Ip && (this.Ip(), this.Ip = void 0);
	}
	op() {
		var t;
		const i = null === (t = this._instance) || void 0 === t || null === (t = t.config) || void 0 === t ? void 0 : t.metrics;
		var e;
		return this.tp && this.lp === i || (null === (e = this.tp) || void 0 === e || e.reset(), this.lp = i, this.tp = new Ge(this.sp(), function(t) {
			var i, e, s, n, r;
			const o = null == t ? void 0 : t.resourceAttributes;
			return {
				serviceName: null !== (i = null == o ? void 0 : o["service.name"]) && void 0 !== i ? i : null == t ? void 0 : t.serviceName,
				serviceVersion: null !== (e = null == o ? void 0 : o["service.version"]) && void 0 !== e ? e : null == t ? void 0 : t.serviceVersion,
				environment: null !== (s = null == o ? void 0 : o["deployment.environment"]) && void 0 !== s ? s : null == t ? void 0 : t.environment,
				resourceAttributes: o,
				beforeSend: null == t ? void 0 : t.beforeSend,
				flushIntervalMs: null !== (n = null == t ? void 0 : t.flushIntervalMs) && void 0 !== n ? n : 1e4,
				maxSeriesPerFlush: null !== (r = null == t ? void 0 : t.maxSeriesPerFlush) && void 0 !== r ? r : 1e3
			};
		}(i), this.$)), this.tp;
	}
	count(t, i = 1, e) {
		this.op().count(t, i, e);
	}
	gauge(t, i, e) {
		this.op().gauge(t, i, e);
	}
	histogram(t, i, e) {
		this.op().histogram(t, i, e);
	}
	flush(t) {
		if (!this.tp) return Promise.resolve();
		if (t) {
			const i = this.tp.drainWindow();
			return i && this.Ys(i, t), Promise.resolve();
		}
		return this.tp.flush().catch((t) => this.$.error("PostHog metrics flush failed:", t));
	}
	reset() {
		var t;
		null === (t = this.tp) || void 0 === t || t.reset();
	}
	dispose() {
		var t, i;
		this.xo = !0, null === (t = this.Ip) || void 0 === t || t.call(this), this.Ip = void 0, null === (i = this.tp) || void 0 === i || i.reset();
	}
	sp() {
		const t = this._instance, i = this;
		return {
			get isDisabled() {
				return !1;
			},
			get optedOut() {
				return !t.is_capturing();
			},
			Ys: (t) => i.Ys(t),
			getLibraryId: () => es.LIB_NAME,
			getLibraryVersion: () => es.LIB_VERSION
		};
	}
	Ys(t, i) {
		return new Promise((e) => {
			let s = !1;
			const n = (t) => {
				s || (s = !0, clearTimeout(r), e(t));
			}, r = setTimeout(() => n({
				kind: "retry-later",
				error: /* @__PURE__ */ new Error("metrics request timed out")
			}), 9e4);
			this._instance._send_request(Ei(Ei({
				method: "POST",
				url: this.Tp(),
				data: t,
				compression: "best-available",
				batchKey: "metrics"
			}, i && { transport: i }), {}, {
				fireCallbackOnDrop: !0,
				callback(t) {
					const i = t.statusCode;
					if (i >= 200 && 300 > i) n({ kind: "ok" });
					else if (413 === i) n({ kind: "too-large" });
					else if (0 !== i && 408 !== i && 429 !== i && 500 > i) n({
						kind: "fatal",
						error: /* @__PURE__ */ new Error(`metrics request failed with status ${i}`)
					});
					else {
						var e;
						n({
							kind: "retry-later",
							error: null !== (e = t.error) && void 0 !== e ? e : /* @__PURE__ */ new Error(`metrics request failed with status ${i}`)
						});
					}
				}
			}));
		});
	}
	Tp() {
		return this._instance.requestRouter.endpointFor("api", "/i/v1/metrics") + "?token=" + encodeURIComponent(this._instance.config.token);
	}
} };
Cu.__defaultExtensionClasses = Ei({}, Ei(Ei(Ei(Ei(Ei(Ei(Ei(Ei(Ei(Ei(Ei(Ei(Ei({}, Xh), Qh), Zh), td), id), ed), nd), sd), rd), od), ld), ad), ud));
var dd = function() {
	es.SDK_DIST_CHANNEL = "npm";
	const i = cu[Su] = new Cu();
	return function() {
		function i() {
			i.done || (i.done = !0, Ca = !1, qn(cu, function(t) {
				t._dom_loaded();
			}));
		}
		(null == s ? void 0 : s.addEventListener) ? "complete" === s.readyState ? i() : Qn(s, "DOMContentLoaded", i, { capture: !1 }) : t && Je.error("Browser doesn't support `document.addEventListener` so PostHog couldn't be initialized");
	}(), i;
}();
//#endregion
export { dd as t };
