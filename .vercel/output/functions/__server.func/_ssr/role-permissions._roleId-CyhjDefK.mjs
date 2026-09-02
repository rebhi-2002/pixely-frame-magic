import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/role-permissions._roleId-CyhjDefK.js
var $$splitComponentImporter = () => import("./role-permissions._roleId-B3k8hBXE.mjs");
var Route = createFileRoute("/_authenticated/role-permissions/$roleId")({
	head: () => ({ meta: [
		{ title: "صلاحيات نوع المستخدم | نظام الصلاحيات" },
		{
			name: "description",
			content: "شجرة صلاحيات من ثلاث مستويات: الوحدة ثم الصفحة ثم أدوات العرض والإضافة والتعديل."
		},
		{
			property: "og:title",
			content: "صلاحيات نوع المستخدم"
		},
		{
			property: "og:description",
			content: "تحديد صلاحيات دقيقة لكل صفحة داخل النظام."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
