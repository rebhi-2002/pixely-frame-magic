import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as useBi } from "./rbac-static-data-6lJhuenE.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { Lt as BadgeCheck, Nt as BookOpen, X as LoaderCircle, i as Users, v as Star } from "../_libs/lucide-react.mjs";
import { y as Route$34 } from "./router-ClmuBdEg.mjs";
import { n as useServerFn } from "./createSsrRpc-ByxigA6S.mjs";
import { r as PublicLayout } from "./public-layout-CNwOdO2W.mjs";
import { t as SessionCta } from "./session-cta-BYAujFtT.mjs";
import { n as listPublicCourses } from "./public-catalog.functions-tha1WOUk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher._id-avlYkUUo.js
var import_jsx_runtime = require_jsx_runtime();
function TeacherProfilePage() {
	const { id } = Route$34.useParams();
	const { t } = useTranslation();
	const bi = useBi();
	const fetchCourses = useServerFn(listPublicCourses);
	const { data: rows, isLoading } = useQuery({
		queryKey: ["public-courses"],
		queryFn: () => fetchCourses()
	});
	const courses = (rows ?? []).filter((c) => c.teacherId === id);
	const reviews = t("teacherProfile.reviews", { returnObjects: true });
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
	}) });
	if (courses.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-5 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold text-foreground",
			children: t("teacherProfile.notFound")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/courses",
			className: "mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground",
			children: t("nav.courses")
		})]
	}) });
	const teacher = bi(...courses[0].teacher);
	const lessons = courses.reduce((sum, c) => sum + c.lessons, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "surface-grid border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-5 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-16 items-center justify-center rounded-2xl bg-primary/15 font-display text-2xl font-bold text-primary",
					children: teacher.slice(2, 4)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold text-foreground",
					children: teacher
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-success",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-4" }), t("teacherProfile.verified")]
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
						value: "1,240",
						label: t("teacherProfile.students")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }),
						value: String(courses.length),
						label: t("teacherProfile.courses")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4" }),
						value: "4.8",
						label: t("teacherProfile.rating")
					})
				]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-5xl px-5 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold text-foreground",
				children: t("teacherProfile.aboutTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 leading-relaxed text-muted-foreground",
				children: t("teacherProfile.about")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-12 text-xl font-bold text-foreground",
				children: t("teacherProfile.coursesTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					lessons,
					" ",
					t("courses.lessons")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 md:grid-cols-2",
				children: courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-lg bg-primary/12 px-2.5 py-1 text-xs font-bold text-primary",
							children: bi(...c.subject)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-bold text-foreground",
							children: bi(...c.title)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1.5 text-sm text-muted-foreground",
							children: [
								c.lessons,
								" ",
								t("courses.lessons"),
								" —",
								" ",
								c.price === 0 ? t("courses.free") : `${c.price} JOD`
							]
						})
					]
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-12 text-xl font-bold text-foreground",
				children: t("teacherProfile.reviewsTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 md:grid-cols-2",
				children: reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
					className: "rounded-2xl border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-foreground",
						children: r.d
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
						className: "mt-3 text-xs text-muted-foreground",
						children: r.n
					})]
				}, r.n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionCta, {
					to: "/signup",
					label: t("teacherProfile.cta"),
					className: "glow-primary inline-flex rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
				})
			})
		]
	})] });
}
function Stat({ icon, value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex items-center gap-1.5 text-muted-foreground",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display mt-1 text-2xl font-bold text-primary",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: label
			})
		]
	});
}
//#endregion
export { TeacherProfilePage as component };
