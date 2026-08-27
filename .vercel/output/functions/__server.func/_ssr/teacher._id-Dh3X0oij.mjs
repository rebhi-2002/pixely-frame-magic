import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher._id-Dh3X0oij.js
var $$splitComponentImporter = () => import("./teacher._id-CHpg0k1g.mjs");
var Route = createFileRoute("/teacher/$id")({
	head: () => ({ meta: [
		{ title: "ملف المعلّم | أكاديميا" },
		{
			name: "description",
			content: "تعرّف على المعلّم، كورساته، وتقييمات طلابه على أكاديميا."
		},
		{
			property: "og:title",
			content: "ملف المعلّم | أكاديميا"
		},
		{
			property: "og:description",
			content: "كورسات المعلّم وآراء طلابه على منصة أكاديميا."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
