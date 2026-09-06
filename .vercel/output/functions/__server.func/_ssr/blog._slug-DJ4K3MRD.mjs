import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as usePreferences, k as useBi } from "./rbac-static-data-Bv6QEjHq.mjs";
import { st as Clock3, vt as CalendarDays, wt as ArrowRight } from "../_libs/lucide-react.mjs";
import { B as blogPosts, S as Route$36, V as getBlogPost } from "./router-D9hWsH17.mjs";
import { t as Reveal } from "./reveal-BzN_D5PG.mjs";
import { r as PublicLayout } from "./public-layout-CgDhl5-6.mjs";
import { t as SessionCta } from "./session-cta-DgmXqet9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog._slug-DJ4K3MRD.js
var import_jsx_runtime = require_jsx_runtime();
/** BlogRenderer — يطبع بلوكات المقال (فقرة/عنوان/قائمة/اقتباس) بتنسيق قراءة مريح. */
function BlogRenderer({ blocks }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-5",
		children: blocks.map((block, i) => {
			if (block.type === "h2") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "pt-2 text-xl font-bold text-foreground",
				children: block.text
			}, i);
			if (block.type === "list") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2 ps-1",
				children: block.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2.5 text-[15px] leading-[1.9] text-foreground/90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
				}, item))
			}, i);
			if (block.type === "quote") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
				className: "border-primary rounded-e-xl border-s-4 bg-primary/6 px-5 py-4 text-[15px] font-semibold leading-[1.9] text-foreground",
				children: block.text
			}, i);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[15px] leading-[1.9] text-foreground/90",
				children: block.text
			}, i);
		})
	});
}
function BlogPostPage() {
	const { slug } = Route$36.useParams();
	const { t } = useTranslation();
	const bi = useBi();
	const { locale } = usePreferences();
	const post = getBlogPost(slug);
	if (!post) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-2xl px-5 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: t("blog.notFound")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: t("blog.notFoundSub")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/blog",
				className: "hover-press mt-7 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground",
				children: t("blog.backToBlog")
			})
		]
	}) });
	const fmt = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "ar", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl px-5 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/blog",
				className: "inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 rtl:rotate-180" }), t("blog.backToBlog")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-6 inline-block w-fit rounded-full bg-primary/12 px-3 py-1 text-xs font-bold text-primary",
					children: bi(post.category, post.categoryEn)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-3xl font-bold leading-[1.35] text-foreground sm:text-4xl",
					children: bi(post.title, post.titleEn)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-3.5" }), fmt.format(new Date(post.publishedAt))]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-3.5" }), t("blog.readMinutes", { count: post.readMinutes })]
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .08,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogRenderer, { blocks: post.body })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shadow-elevation-1 mt-12 rounded-2xl border border-border bg-card/60 p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold text-foreground",
							children: t("blog.ctaTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm text-muted-foreground",
							children: t("blog.ctaSub")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionCta, {
							to: "/signup",
							label: t("blog.ctaButton"),
							className: "btn-shine hover-press mt-5 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
						})
					]
				})
			}),
			others.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold text-foreground",
					children: t("blog.moreTitle")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2",
					children: others.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/blog/$slug",
						params: { slug: o.slug },
						className: "hover-lift shadow-elevation-1 rounded-2xl border border-border bg-card p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold leading-snug text-foreground",
							children: bi(o.title, o.titleEn)
						})
					}, o.slug))
				})]
			})
		]
	}) });
}
//#endregion
export { BlogPostPage as component };
