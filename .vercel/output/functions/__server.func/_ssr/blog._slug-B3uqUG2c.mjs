import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as localeFromSearch, n as createSeoHead } from "./seo-Bab-3ZRk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog._slug-B3uqUG2c.js
var $$splitComponentImporter = () => import("./blog._slug-DGfFYiVE.mjs");
var Route = createFileRoute("/blog/$slug")({
	head: (ctx) => {
		const { params } = ctx;
		return createSeoHead(`/blog/${encodeURIComponent(params.slug)}`, localeFromSearch(ctx.match.search));
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
