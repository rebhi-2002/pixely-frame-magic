import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { T as ServerCog, gt as Compass, h as Target, rt as Languages, st as HeartHandshake, vt as CodeXml } from "../_libs/lucide-react.mjs";
import { t as Reveal } from "./reveal-LUGiBW7K.mjs";
import { t as useSession } from "./use-session-7xGRcQj8.mjs";
import { t as PhotoAvatar } from "./photo-avatar-FiwFco56.mjs";
import { r as PublicLayout } from "./public-layout-ygP3iwqr.mjs";
import { t as SessionCta } from "./session-cta-B2HMxTdB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-DMCAaj7G.js
var import_jsx_runtime = require_jsx_runtime();
var valueIcons = [
	Compass,
	HeartHandshake,
	Languages,
	Target
];
var teamMembers = [
	{
		photo: "/team/frontend.jpg",
		icon: CodeXml
	},
	{
		photo: "/team/backend-1.jpg",
		icon: ServerCog
	},
	{
		photo: "/team/backend-2.jpg",
		icon: ServerCog
	}
];
function AboutPage() {
	const { t } = useTranslation();
	const { isSignedIn } = useSession();
	const values = t("about.values", { returnObjects: true });
	const team = t("about.team", { returnObjects: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "surface-mesh border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-4xl px-5 py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl font-bold leading-[1.25] text-foreground md:text-5xl",
					children: t("about.h1")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-lg leading-relaxed text-muted-foreground",
					children: t("about.sub")
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-4xl px-5 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold text-foreground",
					children: t("about.missionTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 leading-relaxed text-muted-foreground",
					children: t("about.mission")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-4 md:grid-cols-2",
					children: values.map((v, i) => {
						const Icon = valueIcons[i % valueIcons.length];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i * .06,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "shadow-elevation-1 h-full rounded-2xl border border-border bg-card p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-4 font-bold text-foreground",
										children: v.t
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm leading-relaxed text-muted-foreground",
										children: v.d
									})
								]
							})
						}, v.t);
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-card/40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-4xl px-5 py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold text-foreground",
						children: t("about.teamTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: t("about.teamSub")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-4 md:grid-cols-3",
						children: team.map((m, i) => {
							const member = teamMembers[i % teamMembers.length];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: i * .06,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "shadow-elevation-1 flex h-full items-start gap-4 rounded-2xl border border-border bg-background p-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoAvatar, {
										src: member.photo,
										icon: member.icon,
										className: "size-14"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-bold text-foreground",
											children: m.n
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold text-primary",
											children: m.t
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1.5 text-sm text-muted-foreground",
											children: m.d
										})
									] })]
								})
							}, member.photo);
						})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl px-5 py-20 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-bold text-foreground",
					children: t("about.ctaTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: t("about.ctaSub")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionCta, {
						to: "/signup",
						label: t("about.ctaPrimary"),
						className: "btn-shine glow-primary hover-press inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground"
					}), !isSignedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/teacher/register",
						className: "hover-press inline-flex items-center justify-center rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground hover:bg-secondary",
						children: t("about.ctaSecondary")
					})]
				})
			]
		})
	] });
}
//#endregion
export { AboutPage as component };
