import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as useBi } from "./rbac-static-data-C-KJ3jWh.mjs";
import { n as useServerFn } from "./createSsrRpc-DYGk39x2.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as useSession } from "./use-session-DwviR2QR.mjs";
import { H as LoaderCircle, b as Search, bt as BookOpen, p as Star } from "../_libs/lucide-react.mjs";
import { r as PublicLayout } from "./public-layout-BWpT27BH.mjs";
import { n as listPublicCourses } from "./public-catalog.functions-LU6vz9fz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses-D7cJJE3P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CoursesPage() {
	const { t } = useTranslation();
	const bi = useBi();
	const { isSignedIn } = useSession();
	const fetchCourses = useServerFn(listPublicCourses);
	const { data: rows, isLoading } = useQuery({
		queryKey: ["public-courses"],
		queryFn: () => fetchCourses()
	});
	const [query, setQuery] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)("__all");
	const items = rows ?? [];
	const subjects = (0, import_react.useMemo)(() => Array.from(new Set(items.map((i) => bi(...i.subject)))), [items, bi]);
	const filtered = items.filter((i) => {
		const q = query.trim();
		const title = bi(...i.title);
		const teacher = bi(...i.teacher);
		const subjectLabel = bi(...i.subject);
		return (!q || title.includes(q) || teacher.includes(q)) && (subject === "__all" || subjectLabel === subject);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "surface-grid border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl font-bold text-foreground md:text-5xl",
					children: t("courses.h1")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl text-lg text-muted-foreground",
					children: t("courses.sub")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-col gap-3 md:flex-row md:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: t("courses.searchPlaceholder"),
							"aria-label": t("courses.searchPlaceholder"),
							className: "h-11 w-full rounded-xl border border-border bg-card ps-9 pe-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: ["__all", ...subjects].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSubject(s),
							className: `hover-press rounded-lg border px-3 py-2 text-xs font-bold ${subject === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"}`,
							children: s === "__all" ? t("courses.all") : s
						}, s))
					})]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-6xl px-5 py-14",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "panel-swap",
			children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground",
				children: t("courses.empty")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "hover-lift flex flex-col rounded-2xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-lg bg-primary/12 px-2.5 py-1 text-xs font-bold text-primary",
								children: bi(...c.subject)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: bi(...c.level)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-base font-bold text-foreground",
							children: bi(...c.title)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1.5 text-sm text-muted-foreground",
							children: [
								t("courses.byTeacher"),
								":",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/teacher/$id",
									params: { id: c.teacherId },
									className: "font-semibold text-primary hover:underline",
									children: bi(...c.teacher)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-4 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }),
									c.lessons,
									" ",
									t("courses.lessons")
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 text-primary" }), c.price === 0 ? t("courses.free") : `${c.price} JOD`]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: isSignedIn ? "/my-courses" : "/signup",
							className: "hover-press mt-5 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90",
							children: t(isSignedIn ? "courses.open" : "courses.enroll")
						})
					]
				}, c.id))
			})
		}, `${subject}-${filtered.length}`)
	})] });
}
//#endregion
export { CoursesPage as component };
