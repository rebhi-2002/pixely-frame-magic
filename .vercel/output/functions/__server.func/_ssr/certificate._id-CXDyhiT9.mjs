import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as localeFromSearch, n as createSeoHead } from "./seo-DnbZCAZc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/certificate._id-CXDyhiT9.js
var $$splitComponentImporter = () => import("./certificate._id-CfxeIXyg.mjs");
var Route = createFileRoute("/certificate/$id")({
	head: (ctx) => {
		const { params } = ctx;
		return createSeoHead(`/certificate/${encodeURIComponent(params.id)}`, localeFromSearch(ctx.match.search));
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
