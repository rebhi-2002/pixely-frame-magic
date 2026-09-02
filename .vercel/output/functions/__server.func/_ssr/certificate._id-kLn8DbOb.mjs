import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as localeFromSearch, n as createSeoHead } from "./seo-Bab-3ZRk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/certificate._id-kLn8DbOb.js
var $$splitComponentImporter = () => import("./certificate._id-CPC31H16.mjs");
var Route = createFileRoute("/certificate/$id")({
	head: (ctx) => {
		const { params } = ctx;
		return createSeoHead(`/certificate/${encodeURIComponent(params.id)}`, localeFromSearch(ctx.match.search));
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
