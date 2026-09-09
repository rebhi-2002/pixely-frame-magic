import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { k as useBi } from "./rbac-static-data-JRz-nJtL.mjs";
import { At as BookOpenCheck, Tt as ChartLine, gt as CircleX, ot as Eye, st as EyeOff } from "../_libs/lucide-react.mjs";
import { K as WelcomeIllustration } from "./router-B49B_5De.mjs";
import { n as PreferenceToggles, t as BrandMark } from "./public-layout-D95ocArm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-shell-Dshw2uh0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sidePoints = [
	{
		icon: BookOpenCheck,
		ar: "مكتبة ذكية منظّمة حسب المنهاج",
		en: "A smart library organized by curriculum"
	},
	{
		icon: ChartLine,
		ar: "متابعة تقدّم يومية بدون تعقيد",
		en: "Simple daily progress tracking"
	},
	{
		icon: CircleX,
		ar: "بنك أخطاء يذكّرك بنقاط ضعفك",
		en: "A mistake bank that flags your weak spots"
	}
];
/** غلاف موحّد لكل صفحات المصادقة (هوية أكاديميا: سطح داكن + شبكة خفيفة). */
function AuthShell({ icon, title, subtitle, children, wide = false }) {
	const { t } = useTranslation();
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-mesh flex min-h-screen flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreferenceToggles, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex flex-1 items-center justify-center px-4 py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden lg:block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WelcomeIllustration, { className: "h-40 w-auto" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-6 max-w-sm text-2xl font-bold leading-snug text-foreground",
								children: bi("كل أدوات التنظيم والتحضير بمكان واحد", "Every study and exam-prep tool, in one place")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-6 space-y-4",
								children: sidePoints.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted-foreground",
										children: bi(p.ar, p.en)
									})]
								}, p.ar))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `shadow-elevation-2 mx-auto w-full rounded-2xl border border-border bg-card p-6 sm:p-8 ${wide ? "max-w-md sm:max-w-2xl lg:max-w-none" : "max-w-md lg:max-w-md"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 flex items-start gap-3",
							children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary",
								children: icon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-xl font-bold text-foreground",
									children: title
								}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: subtitle
								})]
							})]
						}), children]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "px-5 py-6 text-center text-xs text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "hover:text-foreground",
					children: t("errors.backHome")
				})
			})
		]
	});
}
function AuthField({ id, label, value, onChange, type = "text", placeholder, autoComplete, hint, error }) {
	const bi = useBi();
	const [visible, setVisible] = (0, import_react.useState)(false);
	const isPassword = type === "password";
	const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: id,
				className: "block text-sm font-semibold text-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id,
					type: isPassword && visible ? "text" : type,
					value,
					placeholder,
					autoComplete,
					onChange: (e) => onChange(e.target.value),
					"aria-invalid": error ? true : void 0,
					"aria-describedby": describedBy,
					className: "h-10 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20"
				}), isPassword && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": bi("إظهار كلمة المرور", "Show password"),
					title: bi("إظهار كلمة المرور", "Show password"),
					onClick: () => setVisible((current) => !current),
					className: "absolute end-2 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none",
					children: visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {
						"aria-hidden": "true",
						className: "size-4"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
						"aria-hidden": "true",
						className: "size-4"
					})
				})]
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: `${id}-hint`,
				className: "text-xs text-muted-foreground",
				children: hint
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: `${id}-error`,
				role: "alert",
				className: "text-xs font-semibold text-destructive",
				children: error
			})
		]
	});
}
//#endregion
export { AuthShell as n, AuthField as t };
