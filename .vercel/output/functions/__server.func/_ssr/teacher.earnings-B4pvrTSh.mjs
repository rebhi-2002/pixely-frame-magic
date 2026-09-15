import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { M as useBi, p as getErrorMessage } from "./rbac-static-data-6lJhuenE.mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as description$5 } from "./router-ClmuBdEg.mjs";
import { n as Guard } from "./guard-X81oQi1X.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import { o as Panel, t as AppPage } from "./kit-CS2UTmaS.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { u as submitWithdrawalRequest } from "./wallet-BbXW_DfR.mjs";
import { t as WalletBalancePanel } from "./wallet-balance-panel-B6bFRc7y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.earnings-B4pvrTSh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TeacherEarningsPage() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const [amount, setAmount] = (0, import_react.useState)("");
	const [bankIBAN, setBankIBAN] = (0, import_react.useState)("");
	const [bankName, setBankName] = (0, import_react.useState)("");
	const [accountHolderName, setAccountHolderName] = (0, import_react.useState)("");
	const submit = useMutation({
		mutationFn: () => {
			const parsedAmount = Number(amount);
			if (!parsedAmount || parsedAmount <= 0) throw new Error(bi("أدخل مبلغًا صحيحًا", "Enter a valid amount"));
			if (!bankIBAN.trim() || !bankName.trim() || !accountHolderName.trim()) throw new Error(bi("عبّي كل حقول الحساب البنكي", "Fill in all bank account fields"));
			return submitWithdrawalRequest({
				amount: parsedAmount,
				bankIBAN,
				bankName,
				accountHolderName
			});
		},
		onSuccess: () => {
			toast.success(bi("تم إرسال طلب السحب — رح يتراجع من الإدارة قريبًا.", "Withdrawal request sent — the admin team will review it soon."));
			setAmount("");
			queryClient.invalidateQueries({ queryKey: ["my-wallet"] });
			queryClient.invalidateQueries({ queryKey: ["my-wallet-history"] });
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر إرسال الطلب", "Failed to submit")))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppPage, {
		title: bi("أرباحي", "My earnings"),
		icon: "Wallet",
		subtitle: description$5,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletBalancePanel, { actionSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("طلب سحب رصيد", "Submit a withdrawal request"),
				icon: "Landmark",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						submit.mutate();
					},
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "w-amount",
								children: bi("المبلغ", "Amount")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "w-amount",
								type: "number",
								min: "1",
								value: amount,
								onChange: (e) => setAmount(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "w-bank-name",
								children: bi("اسم البنك", "Bank name")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "w-bank-name",
								value: bankName,
								onChange: (e) => setBankName(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "w-iban",
								children: "IBAN"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "w-iban",
								value: bankIBAN,
								onChange: (e) => setBankIBAN(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "w-holder",
								children: bi("اسم صاحب الحساب", "Account holder name")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "w-holder",
								value: accountHolderName,
								onChange: (e) => setAccountHolderName(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: submit.isPending,
							className: "sm:col-span-2",
							children: bi("إرسال الطلب", "Submit request")
						})
					]
				})
			}) })
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
	pageKey: "teacher_earnings",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeacherEarningsPage, {})
});
//#endregion
export { SplitComponent as component };
