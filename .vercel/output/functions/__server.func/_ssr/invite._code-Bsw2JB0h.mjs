import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as localeFromSearch, n as createSeoHead } from "./seo-DnbZCAZc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/invite._code-Bsw2JB0h.js
var $$splitComponentImporter = () => import("./invite._code-Bu6-oIHz.mjs");
var Route = createFileRoute("/invite/$code")({
	head: (ctx) => {
		const { params } = ctx;
		return createSeoHead(`/invite/${encodeURIComponent(params.code)}`, localeFromSearch(ctx.match.search));
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
