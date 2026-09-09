import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { f as getErrorMessage, k as useBi } from "./rbac-static-data-JRz-nJtL.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { M as Pencil, Y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { r as description$2 } from "./router-B49B_5De.mjs";
import { n as useServerFn } from "./createSsrRpc-C7KQUoXf.mjs";
import { d as useAccess } from "./use-access-Cx_9PD_P.mjs";
import { n as Guard } from "./guard-DJBJLisT.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import { a as Panel, c as RowList, l as StatGrid, s as QuickLinks, t as AppPage } from "./kit-BNtAyy6W.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Label, r as DialogFooter, t as Dialog } from "./dialog-1uq10XBZ.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { a as getTeacherSettings, f as saveTeacherSettings } from "./account-pages.functions-DZOv_W-G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.settings-vLEnP0UH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_settings",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchSettings = useServerFn(getTeacherSettings);
	const persist = useServerFn(saveTeacherSettings);
	const { data: settings, isLoading } = useQuery({
		queryKey: ["teacher-settings"],
		queryFn: () => fetchSettings()
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		privateSessionPrice: "0",
		availabilityLabel: "",
		payoutMethodLabel: "",
		notifyNewQuestion: true
	});
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			...form,
			privateSessionPrice: Number(form.privateSessionPrice) || 0
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["teacher-settings"] });
			setOpen(false);
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save")))
	});
	function openDialog() {
		if (!settings) return;
		setForm({
			privateSessionPrice: String(settings.privateSessionPrice),
			availabilityLabel: settings.availabilityLabel,
			payoutMethodLabel: settings.payoutMethodLabel,
			notifyNewQuestion: settings.notifyNewQuestion
		});
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("إعدادات المعلم", "Teacher settings"),
		icon: "Settings",
		subtitle: bi(description$2, "Pricing, availability, payout details and notification preferences."),
		children: [isLoading || !settings ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "BadgePercent",
					label: bi("سعر الحصة الخاصة", "Private session"),
					value: bi(`${settings.privateSessionPrice} ₪`, `${settings.privateSessionPrice} ILS`)
				},
				{
					icon: "CalendarClock",
					label: bi("أوقات التوفّر", "Availability"),
					value: settings.availabilityLabel
				},
				{
					icon: "Banknote",
					label: bi("طريقة السحب", "Payout method"),
					value: settings.payoutMethodLabel
				},
				{
					icon: "BellRing",
					label: bi("إشعار سؤال جديد", "New question alert"),
					value: bi(settings.notifyNewQuestion ? "مفعّل" : "متوقّف", settings.notifyNewQuestion ? "On" : "Off")
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("الإعدادات", "Settings"),
				icon: "Settings",
				action: can("teacher_settings", "edit") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: openDialog,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), bi("تعديل", "Edit")]
				}) : void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [
					{
						title: bi("سعر الحصة الخاصة", "Private session price"),
						meta: bi(`${settings.privateSessionPrice} ₪ / ساعة`, `${settings.privateSessionPrice} ILS / hour`),
						tone: "primary"
					},
					{
						title: bi("أوقات التوفّر", "Availability"),
						meta: settings.availabilityLabel,
						tone: "primary"
					},
					{
						title: bi("بيانات الحوالة", "Bank details"),
						meta: settings.payoutMethodLabel,
						tone: "primary"
					},
					{
						title: bi("إشعار سؤال جديد", "New question alert"),
						meta: bi("فوري", "Instant"),
						value: bi(settings.notifyNewQuestion ? "مفعّل" : "متوقّف", settings.notifyNewQuestion ? "On" : "Off"),
						tone: settings.notifyNewQuestion ? "success" : "muted"
					}
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("روابط سريعة", "Quick links"),
				icon: "Settings",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLinks, { items: [
					{
						to: "/teacher/profile/edit",
						label: bi("ملفي العام", "Public profile"),
						icon: "UserCog"
					},
					{
						to: "/teacher/earnings",
						label: bi("الأرباح", "Earnings"),
						icon: "Wallet"
					},
					{
						to: "/settings",
						label: bi("اللغة والثيم", "Language & theme"),
						icon: "Palette"
					}
				] })
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "text-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: bi("تعديل الإعدادات", "Edit settings") }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "ts-price",
									children: bi("سعر الحصة الخاصة (₪)", "Private session (ILS)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "ts-price",
									type: "number",
									min: 0,
									value: form.privateSessionPrice,
									onChange: (e) => setForm((f) => ({
										...f,
										privateSessionPrice: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "ts-payout",
									children: bi("طريقة السحب", "Payout method")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "ts-payout",
									value: form.payoutMethodLabel,
									onChange: (e) => setForm((f) => ({
										...f,
										payoutMethodLabel: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "ts-availability",
									children: bi("أوقات التوفّر", "Availability")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "ts-availability",
									value: form.availabilityLabel,
									onChange: (e) => setForm((f) => ({
										...f,
										availabilityLabel: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									id: "ts-notify",
									checked: form.notifyNewQuestion,
									onCheckedChange: (v) => setForm((f) => ({
										...f,
										notifyNewQuestion: v
									}))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "ts-notify",
									children: bi("تنبيه فوري بسؤال جديد", "Instant new-question alert")
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => saveMutation.mutate(),
							disabled: saveMutation.isPending,
							children: bi("حفظ", "Save")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setOpen(false),
							children: bi("إلغاء", "Cancel")
						})]
					})
				]
			})
		})]
	});
}
//#endregion
export { PageRoute as component };
