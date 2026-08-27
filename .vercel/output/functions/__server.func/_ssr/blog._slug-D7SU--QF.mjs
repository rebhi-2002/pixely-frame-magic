import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getBlogPost } from "./blog-posts-CGNfBsVT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog._slug-D7SU--QF.js
var $$splitComponentImporter = () => import("./blog._slug-DAuz9ide.mjs");
var Route = createFileRoute("/blog/$slug")({
	head: ({ params }) => {
		const post = getBlogPost(params.slug);
		const title = post ? `${post.title} | مدونة أكاديميا` : "مقال غير موجود | أكاديميا";
		const description = post?.excerpt ?? "لم نتمكن من إيجاد هذا المقال.";
		return { meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:type",
				content: "article"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
