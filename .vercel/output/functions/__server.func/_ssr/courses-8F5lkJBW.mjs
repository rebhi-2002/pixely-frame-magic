import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi } from "./rbac-static-data-DgiM51a_.mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { D as Search, K as MapPin, Lt as BookOpen, M as Radio, Tt as CirclePlay, b as Sparkles, i as Users, r as Wallet, y as Star, yt as Clock } from "../_libs/lucide-react.mjs";
import { n as useServerFn } from "./createSsrRpc-D3FH_hmA.mjs";
import { t as useSession } from "./use-session-7xGRcQj8.mjs";
import { t as PhotoAvatar } from "./photo-avatar-FiwFco56.mjs";
import { r as PublicLayout } from "./public-layout-ygP3iwqr.mjs";
import { a as teacherPhotoPath, r as courseCoverPath, t as COURSE_FORMAT_LABELS } from "./public-catalog-data-CsZRwh7H.mjs";
import { n as listPublicCourses } from "./public-catalog.functions-B_miJQke.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses-8F5lkJBW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FORMAT_ICONS = {
	live_online: Radio,
	onsite: MapPin,
	recorded: CirclePlay
};
var SUBJECT_ACCENTS = [
	"bg-primary",
	"bg-success",
	"bg-info",
	"bg-destructive/70",
	"bg-secondary-foreground/60"
];
function subjectAccent(subject) {
	let hash = 0;
	for (let i = 0; i < subject.length; i++) hash = hash * 31 + subject.charCodeAt(i) >>> 0;
	return SUBJECT_ACCENTS[hash % SUBJECT_ACCENTS.length];
}
/**
* غلاف الكورس: يحاول عرض صورة حقيقية، ولو غير موجودة بعد يظهر تدرّج لوني
* حسب المادة + أول حرف من عنوانها — بديل صادق (مش placeholder عام بلا معنى)
* لحد ما تتوفر صور غلاف حقيقية بنفس المسار (courseCoverPath).
*/
function CourseCover({ src, subject, accent }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	if (failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `flex h-28 w-full items-center justify-center ${accent}/15`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `font-display text-3xl font-bold opacity-40 ${accent.replace("bg-", "text-")}`,
			children: subject.charAt(0)
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "",
		"aria-hidden": true,
		onError: () => setFailed(true),
		className: "h-28 w-full object-cover"
	});
}
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
	const [level, setLevel] = (0, import_react.useState)("__all");
	const items = (0, import_react.useMemo)(() => rows ?? [], [rows]);
	const subjects = (0, import_react.useMemo)(() => Array.from(new Set(items.map((i) => bi(...i.subject)))), [items, bi]);
	const levels = (0, import_react.useMemo)(() => Array.from(new Set(items.map((i) => bi(...i.level)))), [items, bi]);
	const filtered = items.filter((i) => {
		const q = query.trim();
		const title = bi(...i.title);
		const teacher = bi(...i.teacher);
		const subjectLabel = bi(...i.subject);
		const levelLabel = bi(...i.level);
		return (!q || title.includes(q) || teacher.includes(q)) && (subject === "__all" || subjectLabel === subject) && (level === "__all" || levelLabel === level);
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
				}),
				levels.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-muted-foreground",
						children: t("courses.branchLabel")
					}), ["__all", ...levels].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setLevel(l),
						className: `hover-press rounded-lg border px-3 py-1.5 text-xs font-bold ${level === l ? "border-primary bg-primary/12 text-primary" : "border-border bg-card text-muted-foreground hover:text-foreground"}`,
						children: l === "__all" ? t("courses.all") : l
					}, l))]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-6xl px-5 py-14",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
			"aria-busy": "true",
			children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "animate-pulse overflow-hidden rounded-2xl border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-28 w-full bg-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-16 rounded bg-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-12 rounded bg-secondary" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-4/5 rounded bg-secondary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-full rounded bg-secondary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-2/3 rounded bg-secondary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-7 rounded-full bg-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-24 rounded bg-secondary" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-full rounded-xl bg-secondary" })
					]
				})]
			}, i))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "panel-swap",
			children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-lg flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							"aria-hidden": "true",
							className: "size-6"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-bold text-foreground",
						children: t("courses.emptyCatalogTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: t("courses.emptyCatalogBody")
					})
				]
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground",
				children: t("courses.empty")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "hover-lift shadow-elevation-1 flex flex-col overflow-hidden rounded-2xl border border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCover, {
						src: courseCoverPath(c.id),
						subject: bi(...c.subject),
						accent: subjectAccent(bi(...c.subject))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col p-6",
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex items-center",
								children: (() => {
									const FormatIcon = FORMAT_ICONS[c.format];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1 text-[11px] font-bold text-secondary-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormatIcon, { className: "size-3.5" }), bi(...COURSE_FORMAT_LABELS[c.format])]
									});
								})()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 text-base font-bold text-foreground",
								children: bi(...c.title)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
								children: bi(...c.description)
							}),
							c.tags && c.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-1.5",
								children: c.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground",
									children: bi(...tag)
								}, bi(...tag)))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center gap-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoAvatar, {
										src: teacherPhotoPath(c.teacherId),
										className: "size-7",
										iconClassName: "size-3.5"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/teacher/$id",
										params: { id: c.teacherId },
										className: "text-sm font-semibold text-primary hover:underline",
										children: bi(...c.teacher)
									}),
									typeof c.rating === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ms-auto inline-flex items-center gap-1 text-xs font-bold text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-primary text-primary" }), c.rating.toFixed(1)]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }),
											c.lessons,
											" ",
											t("courses.lessons")
										]
									}),
									typeof c.durationHours === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }),
											c.durationHours,
											" ",
											t("courses.hours")
										]
									}),
									typeof c.studentsCount === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }), c.studentsCount]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4 text-primary" }), c.price === 0 ? t("courses.free") : `${c.price} JOD`]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: isSignedIn ? "/my-courses" : "/signup",
								className: "hover-press mt-5 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90",
								children: t(isSignedIn ? "courses.open" : "courses.enroll")
							})
						]
					})]
				}, c.id))
			})
		}, `${subject}-${level}-${filtered.length}`)
	})] });
}
//#endregion
export { CoursesPage as component };
