import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/invite._code-Bgp27zoK.js
var $$splitComponentImporter = () => import("./invite._code-Bmm-7cKu.mjs");
var Route = createFileRoute("/invite/$code")({
	head: () => ({ meta: [
		{ title: "دعوة إلى أكاديميا" },
		{
			name: "description",
			content: "انضم إلى أكاديميا عبر رابط دعوة واحصل على مزايا البداية."
		},
		{
			property: "og:title",
			content: "دعوة إلى أكاديميا"
		},
		{
			property: "og:description",
			content: "انضم عبر رابط صديقك واحصل على شهر بريميوم تجريبي."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
