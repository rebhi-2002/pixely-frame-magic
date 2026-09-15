import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { M as useBi } from "./rbac-static-data-6lJhuenE.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { X as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as Pagination, i as EmptyState, n as Badge, o as Panel, r as DataTable, u as StatGrid } from "./kit-CS2UTmaS.mjs";
import { i as getMyWallet, s as getTransactionHistory, t as WalletTransactionType } from "./wallet-BbXW_DfR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wallet-balance-panel-B6bFRc7y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function transactionTypeLabel(type, bi) {
	switch (type) {
		case WalletTransactionType.TopUp: return bi("شحن رصيد", "Top-up");
		case WalletTransactionType.Withdrawal: return bi("سحب", "Withdrawal");
		case WalletTransactionType.EnrollmentDeduction: return bi("خصم اشتراك بكورس", "Course enrollment charge");
		case WalletTransactionType.InstructorCredit: return bi("إيداع أرباح", "Earnings credit");
		default: return bi("حركة", "Transaction");
	}
}
/** لوحة عرض المحفظة — الرصيد الحالي + سجل الحركات. مشتركة بين شاشة محفظة
* الطالب وشاشة أرباح المعلّم؛ زر الإجراء (شحن/سحب) بيمرَّر من الخارج. */
function WalletBalancePanel({ actionSlot }) {
	const bi = useBi();
	const [page, setPage] = (0, import_react.useState)(0);
	const PAGE_SIZE = 10;
	const { data: wallet, isLoading: walletLoading } = useQuery({
		queryKey: ["my-wallet"],
		queryFn: getMyWallet
	});
	const { data: historyResult, isLoading: historyLoading } = useQuery({
		queryKey: ["my-wallet-history", page],
		queryFn: () => getTransactionHistory(page, PAGE_SIZE),
		placeholderData: (prev) => prev
	});
	const history = historyResult?.rows ?? [];
	const totalCount = historyResult?.totalCount ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [{
			label: bi("الرصيد الحالي", "Current balance"),
			value: walletLoading ? "…" : (wallet?.balance ?? 0).toLocaleString(),
			icon: "Wallet"
		}] }),
		actionSlot,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("سجل الحركات", "Transaction history"),
			icon: "History",
			children: historyLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
			}) : !history.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: "Wallet",
				text: bi("لا يوجد حركات بعد.", "No transactions yet.")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				caption: bi("سجل حركات المحفظة", "Wallet transaction history"),
				head: [
					bi("النوع", "Type"),
					bi("المبلغ", "Amount"),
					bi("الحالة", "Status"),
					bi("التاريخ", "Date")
				],
				rows: history.map((t) => [
					transactionTypeLabel(t.type, bi),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: t.direction === 1 ? "text-success" : "text-destructive",
						children: [t.direction === 1 ? "+" : "-", t.amount.toLocaleString()]
					}, "amount"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: statusTone(t.status),
						children: statusLabel(t.status, bi)
					}, "status"),
					new Date(t.createdOn).toLocaleDateString()
				])
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
				page,
				pageSize: PAGE_SIZE,
				totalCount,
				onPageChange: setPage,
				summary: bi(`${Math.min(page * PAGE_SIZE + 1, totalCount)}–${Math.min((page + 1) * PAGE_SIZE, totalCount)} من ${totalCount}`, `${Math.min(page * PAGE_SIZE + 1, totalCount)}–${Math.min((page + 1) * PAGE_SIZE, totalCount)} of ${totalCount}`),
				previousLabel: bi("السابق", "Previous"),
				nextLabel: bi("التالي", "Next")
			})] })
		})
	] });
}
function statusTone(status) {
	if (status === 4) return "success";
	if (status === 3) return "danger";
	if (status === 1) return "primary";
	return "muted";
}
function statusLabel(status, bi) {
	switch (status) {
		case 1: return bi("قيد المراجعة", "Pending");
		case 2: return bi("مقبول", "Accepted");
		case 3: return bi("مرفوض", "Rejected");
		case 4: return bi("مكتمل", "Completed");
		case 5: return bi("مُرتجع", "Reversed");
		default: return bi("—", "—");
	}
}
//#endregion
export { WalletBalancePanel as t };
