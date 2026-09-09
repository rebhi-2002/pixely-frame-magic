import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { k as useBi, u as allowedPublicPaths } from "./rbac-static-data-JRz-nJtL.mjs";
import { At as BookOpenCheck, Ot as Bot, Tt as ChartLine, Z as LayoutDashboard, at as Flame, d as Trophy, f as TrendingUp, gt as CircleX, i as Users, jt as Bell, m as Timer, vt as CircleCheck, z as MessagesSquare } from "../_libs/lucide-react.mjs";
import { G as ReviewSessionIllustration, H as MistakeBankIllustration, V as LibraryTreeIllustration, q as blogPosts, z as ExamSimIllustration } from "./router-B49B_5De.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Reveal } from "./reveal-BzN_D5PG.mjs";
import { t as useSession } from "./use-session-CGKQvJwa.mjs";
import { r as PublicLayout } from "./public-layout-D95ocArm.mjs";
import { t as SessionCta } from "./session-cta-IyCqmSwP.mjs";
import { t as AnimatedCounter } from "./animated-counter-DDUyItod.mjs";
import { t as TestimonialsSection } from "./testimonials-section-D7klOPg6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CIwqFMVk.js
var import_jsx_runtime = require_jsx_runtime();
var subjects = [
	{
		icon: "📐",
		pct: 78,
		tone: "bg-primary"
	},
	{
		icon: "🧪",
		pct: 54,
		tone: "bg-info"
	},
	{
		icon: "📖",
		pct: 92,
		tone: "bg-success"
	}
];
/** ارتفاعات ثابتة (px) لأعمدة النشاط الأسبوعي — تصميمية بحتة، لا تمثّل بيانات حقيقية */
var weekBars = [
	22,
	34,
	18,
	40,
	28,
	46,
	32
];
/**
* HeroMockup — معاينة بصرية حقيقية للوحة تحكم الطالب، مبنية بالكامل من عناصر
* الواجهة (لا صورة/سكرين‌شوت). تُستخدم في الـ Hero لإعطاء إحساس "منتج حقيقي"
* بدل نص فاضٍ.
*
* الاسم/الحرف الأول شخصي (من جلسة المستخدم الحقيقية) بعد تسجيل الدخول؛ الأرقام
* والإحصائيات تبقى توضيحية (demo) لعدم وجود مصدر بيانات تحليلية حقيقي بعد —
* تُستبدل لاحقاً بأرقام حقيقية بمجرد ربط الباك إند بهالمكوّن.
*/
function HeroMockup({ session }) {
	const bi = useBi();
	const displayName = session?.fullName?.trim().split(/\s+/)[0] || bi("سارة", "Sarah");
	const initial = displayName.charAt(0).toUpperCase();
	const greeting = bi(`أهلاً ${displayName} 👋`, `Hi ${displayName} 👋`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": true,
		className: "relative hidden select-none lg:block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-surface shadow-elevation-3 relative mx-auto w-full max-w-md rounded-3xl p-4 [transform:perspective(1400px)_rotateY(-8deg)_rotateX(3deg)] transition-transform duration-700 hover:[transform:perspective(1400px)_rotateY(-3deg)_rotateX(1deg)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 px-1 pb-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-destructive/60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-primary/60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-success/60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ms-3 flex-1 truncate rounded-full bg-background/70 px-3 py-1 text-[11px] text-muted-foreground",
							children: "academia.app/dashboard"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 rounded-full bg-primary/12 px-2 py-1 text-[9px] font-bold text-primary",
							children: bi("معاينة", "Preview")
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shadow-elevation-1 space-y-4 rounded-2xl bg-background p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary",
									children: initial
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-foreground",
									children: greeting
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: bi("جاهزة لمتابعة إنجازك اليوم", "Ready to keep your streak going")
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-8 items-center justify-center rounded-full bg-secondary text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-primary/10 p-2.5 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "mx-auto size-3.5 text-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-display text-sm font-bold text-foreground",
											children: "12"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[9px] text-muted-foreground",
											children: bi("يوم متتالي", "day streak")
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-success/10 p-2.5 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "mx-auto size-3.5 text-success" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-display text-sm font-bold text-foreground",
											children: "86%"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[9px] text-muted-foreground",
											children: bi("نسبة الإنجاز", "completion")
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-info/10 p-2.5 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto size-3.5 text-info" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-display text-sm font-bold text-foreground",
											children: "24"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[9px] text-muted-foreground",
											children: bi("درس مكتمل", "lessons done")
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2.5",
							children: subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm",
										children: s.icon
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1.5 flex-1 overflow-hidden rounded-full bg-secondary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `h-full rounded-full ${s.tone}`,
											style: { width: `${s.pct}%` }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "w-8 text-end text-[10px] font-bold text-muted-foreground",
										children: [s.pct, "%"]
									})
								]
							}, s.icon))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-14 items-end justify-between gap-1.5 border-t border-border pt-3",
							children: weekBars.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `w-full rounded-t-sm ${i === 5 ? "bg-primary" : "bg-secondary"}`,
								style: { height: `${h}px` }
							}, i))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-surface shadow-elevation-2 animate-float absolute -end-6 -top-6 flex items-center gap-2 rounded-2xl px-3.5 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-7 items-center justify-center rounded-full bg-success/15 text-success",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-bold text-foreground",
					children: bi("أنجزت 12 درس هالأسبوع", "12 lessons done this week")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-surface shadow-elevation-2 animate-float absolute -bottom-5 -start-8 flex items-center gap-2 rounded-2xl px-3.5 py-2.5",
				style: { animationDelay: "1.2s" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-7 items-center justify-center rounded-full bg-primary/15 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-3.5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-bold text-foreground",
					children: bi("سلسلة 12 يوم 🔥", "12-day streak 🔥")
				})]
			})
		]
	});
}
var features = [
	{
		icon: BookOpenCheck,
		key: "library",
		span: "lg:col-span-2 lg:row-span-2",
		flagship: true,
		Illustration: LibraryTreeIllustration
	},
	{
		icon: Bot,
		key: "simulator",
		span: "lg:col-span-2",
		flagship: false,
		Illustration: ExamSimIllustration
	},
	{
		icon: MessagesSquare,
		key: "community",
		span: "",
		flagship: false,
		Illustration: null
	},
	{
		icon: ChartLine,
		key: "tracker",
		span: "",
		flagship: false,
		Illustration: null
	},
	{
		icon: CircleX,
		key: "mistakes",
		span: "lg:col-span-2",
		flagship: false,
		Illustration: MistakeBankIllustration
	},
	{
		icon: Timer,
		key: "review",
		span: "lg:col-span-2",
		flagship: false,
		Illustration: ReviewSessionIllustration
	}
];
var stats = [
	{
		prefix: "",
		value: 4,
		suffix: "",
		key: "levels"
	},
	{
		prefix: "",
		value: 100,
		suffix: "%",
		key: "rtl"
	},
	{
		prefix: "",
		value: 3,
		suffix: "",
		key: "spaces"
	}
];
var roles = [
	{
		icon: Users,
		key: "student"
	},
	{
		icon: BookOpenCheck,
		key: "teacher"
	},
	{
		icon: ChartLine,
		key: "parent"
	}
];
var latestPosts = blogPosts.slice(-2).reverse();
function Landing() {
	const { t } = useTranslation();
	const bi = useBi();
	const { session } = useSession();
	const role = session?.roleKey;
	const canBrowseCourses = role ? (allowedPublicPaths(role) ?? []).includes("/courses") : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "surface-mesh surface-mesh-fade relative overflow-hidden border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto max-w-6xl px-5 py-20 md:py-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "glass-surface inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-primary shadow-elevation-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4" }), session ? t("home.signedIn.welcome", { name: session.fullName }) : t("home.badge")]
						}),
						session && role ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-6 text-4xl font-bold leading-[1.25] text-foreground sm:text-5xl md:text-6xl",
								children: t(`home.signedIn.${role}.h1`)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground",
								children: t(`home.signedIn.${role}.sub`)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-9 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: session.home,
									className: "glow-primary hover-press inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "size-4" }), t("home.signedIn.cta")]
								}), canBrowseCourses && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/courses",
									className: "hover-press inline-flex items-center justify-center rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground hover:bg-secondary",
									children: t("home.signedIn.browse")
								})]
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-6 text-4xl font-bold leading-[1.2] text-foreground sm:text-5xl md:text-6xl",
								children: [
									t("home.h1a"),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gradient",
										children: t("home.h1b")
									}),
									" ",
									t("home.h1c")
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground",
								children: t("home.sub")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-9 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/signup",
									className: "btn-shine glow-primary hover-press inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground",
									children: t("home.ctaPrimary")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/how-it-works",
									className: "hover-press inline-flex items-center justify-center rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground hover:bg-secondary",
									children: t("home.ctaSecondary")
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-14 grid items-stretch gap-4 sm:grid-cols-3",
							children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: i * .08,
								className: "h-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "shadow-elevation-1 flex h-full flex-col justify-center rounded-2xl border border-border bg-card p-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-3xl font-bold text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, {
											prefix: s.prefix,
											value: s.value,
											suffix: s.suffix
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: t(`home.stats.${s.key}`)
									})]
								})
							}, s.key))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .15,
						y: 16,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroMockup, { session })
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-bold text-foreground",
					children: t("home.featuresTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-muted-foreground",
					children: t("home.featuresSub")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-4 md:grid-cols-2 lg:auto-rows-fr lg:grid-cols-4",
					children: features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i % 3 * .08,
						className: f.span,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: cn("shadow-elevation-1 flex h-full flex-col rounded-2xl border p-6", f.flagship ? "surface-mesh border-primary/30 bg-primary/5" : "border-border bg-card"),
							children: [
								f.Illustration ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.Illustration, { className: cn("w-full", f.flagship ? "h-32" : "h-20") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("flex size-11 items-center justify-center rounded-xl", f.flagship ? "bg-primary text-primary-foreground" : "bg-primary/12 text-primary"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: cn("font-bold text-foreground", f.Illustration ? "mt-3" : "mt-4", f.flagship ? "text-lg" : "text-base"),
									children: t(`home.features.${f.key}.title`)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 flex-1 text-sm leading-relaxed text-muted-foreground",
									children: t(`home.features.${f.key}.text`)
								})
							]
						})
					}, f.key))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-card/40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-3",
				children: roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-background p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.icon, { className: "size-6 text-success" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-bold text-foreground",
							children: t(`home.roles.${r.key}.t`)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm text-muted-foreground",
							children: t(`home.roles.${r.key}.d`)
						})
					]
				}, r.key))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-bold text-foreground",
					children: t("blog.teaserTitle")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-muted-foreground",
					children: t("blog.teaserSub")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/blog",
					className: "hover-press inline-flex items-center rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-bold text-foreground hover:bg-secondary",
					children: t("blog.teaserCta")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-2",
				children: latestPosts.map((post, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * .08,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/blog/$slug",
						params: { slug: post.slug },
						className: "hover-lift shadow-elevation-1 flex h-full flex-col rounded-2xl border border-border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-fit rounded-full bg-primary/12 px-3 py-1 text-xs font-bold text-primary",
								children: bi(post.category, post.categoryEn)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-base font-bold leading-snug text-foreground",
								children: bi(post.title, post.titleEn)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 line-clamp-2 text-sm text-muted-foreground",
								children: bi(post.excerpt, post.excerptEn)
							})
						]
					})
				}, post.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-4xl px-5 py-20 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-bold text-foreground",
					children: t("home.ctaTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: t("home.ctaSub")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionCta, {
					to: "/signup",
					label: t("home.ctaButton"),
					className: "btn-shine glow-primary hover-press mt-7 inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestimonialsSection, { className: "border-t border-border bg-card/40" })
	] });
}
//#endregion
export { Landing as component };
