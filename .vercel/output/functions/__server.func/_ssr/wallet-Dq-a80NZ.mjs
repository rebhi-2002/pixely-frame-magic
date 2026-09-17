import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi, p as getErrorMessage } from "./rbac-static-data-DgiM51a_.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as description$18 } from "./router-B2E04MFx.mjs";
import { n as Guard } from "./guard-CaBAnt-a.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { o as Panel, t as AppPage } from "./kit-Ctaz_npe.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { l as submitTopUpRequest } from "./wallet-CJvVivC2.mjs";
import { t as WalletBalancePanel } from "./wallet-balance-panel-Bt0Jlnsc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wallet-Dq-a80NZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WalletPage() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const [amount, setAmount] = (0, import_react.useState)("");
	const [bankReferenceNo, setBankReferenceNo] = (0, import_react.useState)("");
	const [receiptFile, setReceiptFile] = (0, import_react.useState)(null);
	const submit = useMutation({
		mutationFn: () => {
			if (!receiptFile) throw new Error(bi("أرفق صورة إشعار التحويل", "Attach the transfer receipt"));
			const parsedAmount = Number(amount);
			if (!parsedAmount || parsedAmount <= 0) throw new Error(bi("أدخل مبلغًا صحيحًا", "Enter a valid amount"));
			return submitTopUpRequest({
				amount: parsedAmount,
				bankReferenceNo,
				receiptFile
			});
		},
		onSuccess: () => {
			toast.success(bi("تم إرسال طلب الشحن — رح يتراجع من الإدارة قريبًا.", "Top-up request sent — the admin team will review it soon."));
			setAmount("");
			setBankReferenceNo("");
			setReceiptFile(null);
			queryClient.invalidateQueries({ queryKey: ["my-wallet"] });
			queryClient.invalidateQueries({ queryKey: ["my-wallet-history"] });
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر إرسال الطلب", "Failed to submit")))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppPage, {
		title: bi("محفظتي", "My wallet"),
		icon: "Wallet",
		subtitle: description$18,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletBalancePanel, { actionSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("طلب شحن رصيد", "Submit a top-up request"),
				icon: "Upload",
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
								htmlFor: "amount",
								children: bi("المبلغ", "Amount")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "amount",
								type: "number",
								min: "1",
								value: amount,
								onChange: (e) => setAmount(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "bank-ref",
								children: bi("مرجع التحويل البنكي", "Bank reference no.")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "bank-ref",
								value: bankReferenceNo,
								onChange: (e) => setBankReferenceNo(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "receipt",
								children: bi("صورة إشعار التحويل", "Transfer receipt image")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "receipt",
								type: "file",
								accept: "image/*",
								onChange: (e) => setReceiptFile(e.target.files?.[0] ?? null)
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
	pageKey: "student_wallet",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletPage, {})
});
//#endregion
export { SplitComponent as component };
