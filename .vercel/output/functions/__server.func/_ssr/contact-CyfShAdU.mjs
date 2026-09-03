import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { t as Reveal } from "./reveal-DrTtc6dz.mjs";
import { L as Mail, P as MessageSquareText, Y as Headset, ot as Clock, y as Send } from "../_libs/lucide-react.mjs";
import { r as PublicLayout } from "./public-layout-BWpT27BH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CyfShAdU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TOPIC_KEYS = [
	"student",
	"teacher",
	"school",
	"press",
	"other"
];
var schema = objectType({
	name: stringType().trim().min(2),
	email: stringType().trim().email(),
	topic: enumType(TOPIC_KEYS),
	message: stringType().trim().min(10)
});
function ContactPage() {
	const { t } = useTranslation();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [topic, setTopic] = (0, import_react.useState)("student");
	const [message, setMessage] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [sending, setSending] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	function handleSubmit(e) {
		e.preventDefault();
		const result = schema.safeParse({
			name,
			email,
			topic,
			message
		});
		if (!result.success) {
			const next = {};
			for (const issue of result.error.issues) {
				const field = issue.path[0];
				next[field] = t(`contact.errors.${field}`);
			}
			setErrors(next);
			return;
		}
		setErrors({});
		setSending(true);
		window.setTimeout(() => {
			setSending(false);
			setDone(true);
			toast.success(t("contact.success.title"));
		}, 600);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "surface-mesh border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-5 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareText, { className: "size-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 text-4xl font-bold text-foreground",
					children: t("contact.h1")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-lg text-muted-foreground",
					children: t("contact.sub")
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto grid max-w-5xl gap-6 px-5 py-16 lg:grid-cols-[1.3fr_0.9fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shadow-elevation-1 rounded-2xl border border-border bg-card p-6 sm:p-8",
			children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center py-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-14 items-center justify-center rounded-full bg-success/12 text-success",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 text-xl font-bold text-foreground",
						children: t("contact.success.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-sm text-sm text-muted-foreground",
						children: t("contact.success.sub")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setDone(false);
							setName("");
							setEmail("");
							setMessage("");
							setTopic("student");
						},
						className: "hover-press mt-6 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-bold text-foreground hover:bg-secondary",
						children: t("contact.success.again")
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-5",
				onSubmit: handleSubmit,
				noValidate: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "name",
								className: "mb-2 block text-sm font-semibold text-foreground",
								children: t("contact.form.name")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "name",
								value: name,
								onChange: (e) => setName(e.target.value),
								className: "h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary"
							}),
							errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-xs text-destructive",
								children: errors.name
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "email",
								className: "mb-2 block text-sm font-semibold text-foreground",
								children: t("contact.form.email")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "email",
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary"
							}),
							errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-xs text-destructive",
								children: errors.email
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "topic",
						className: "mb-2 block text-sm font-semibold text-foreground",
						children: t("contact.form.topic")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: "topic",
						value: topic,
						onChange: (e) => setTopic(e.target.value),
						className: "h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary",
						children: TOPIC_KEYS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: k,
							children: t(`contact.form.topics.${k}`)
						}, k))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "message",
							className: "mb-2 block text-sm font-semibold text-foreground",
							children: t("contact.form.message")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "message",
							rows: 5,
							value: message,
							onChange: (e) => setMessage(e.target.value),
							placeholder: t("contact.form.messagePlaceholder"),
							className: "w-full resize-none rounded-xl border border-border bg-background p-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
						}),
						errors.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-xs text-destructive",
							children: errors.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: sending,
						className: "btn-shine hover-press inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground disabled:opacity-60 sm:w-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), sending ? t("contact.form.sending") : t("contact.form.submit")]
					})
				]
			})
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			delay: .08,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shadow-elevation-1 rounded-2xl border border-border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-sm font-bold text-foreground",
								children: t("contact.sidebar.emailTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: t("contact.sidebar.emailSub")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:support@academia.app",
								className: "mt-3 inline-block text-sm font-bold text-primary hover:underline",
								dir: "ltr",
								children: "support@academia.app"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shadow-elevation-1 rounded-2xl border border-border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 items-center justify-center rounded-xl bg-success/12 text-success",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-sm font-bold text-foreground",
								children: t("contact.sidebar.responseTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: t("contact.sidebar.responseSub")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shadow-elevation-1 rounded-2xl border border-border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 items-center justify-center rounded-xl bg-info/12 text-info",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headset, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-sm font-bold text-foreground",
								children: t("contact.sidebar.helpTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: t("contact.sidebar.helpSub")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/help",
								className: "mt-3 inline-block text-sm font-bold text-primary hover:underline",
								children: t("contact.sidebar.helpCta")
							})
						]
					})
				]
			})
		})]
	})] });
}
//#endregion
export { ContactPage as component };
