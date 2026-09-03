import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as localeFromSearch, n as createSeoHead } from "./seo-DnbZCAZc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher._id-DlJn1AfD.js
var $$splitComponentImporter = () => import("./teacher._id-BRlkbCDQ.mjs");
var Route = createFileRoute("/teacher/$id")({
	head: (ctx) => {
		const { params } = ctx;
		return createSeoHead(`/teacher/${encodeURIComponent(params.id)}`, localeFromSearch(ctx.match.search));
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
