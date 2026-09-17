import { A as useBi, j as usePreferences } from "./rbac-static-data-DgiM51a_.mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { Ft as CalendarDays, bt as Clock3, z as NotebookPen } from "../_libs/lucide-react.mjs";
import { X as blogPosts } from "./router-D9kxMA2z.mjs";
import { t as Reveal } from "./reveal-LUGiBW7K.mjs";
import { r as PublicLayout } from "./public-layout-CjXUP782.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-DkA1CPxI.js
var import_jsx_runtime = require_jsx_runtime();
function BlogIndex() {
	const { t } = useTranslation();
	const { locale } = usePreferences();
	const bi = useBi();
	const fmt = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "ar", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "surface-mesh border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-5 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { className: "size-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 text-4xl font-bold text-foreground",
					children: t("blog.h1")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-lg text-muted-foreground",
					children: t("blog.sub")
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-5xl px-5 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 md:grid-cols-2",
			children: blogPosts.slice().reverse().map((post, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i % 2 * .08,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/blog/$slug",
					params: { slug: post.slug },
					className: "hover-lift shadow-elevation-1 flex h-full flex-col rounded-2xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-fit rounded-full bg-primary/12 px-3 py-1 text-xs font-bold text-primary",
							children: bi(post.category, post.categoryEn)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-lg font-bold leading-snug text-foreground",
							children: bi(post.title, post.titleEn)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 flex-1 text-sm leading-relaxed text-muted-foreground",
							children: bi(post.excerpt, post.excerptEn)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-3.5" }), fmt.format(new Date(post.publishedAt))]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-3.5" }), t("blog.readMinutes", { count: post.readMinutes })]
							})]
						})
					]
				})
			}, post.slug))
		})
	})] });
}
//#endregion
export { BlogIndex as component };
