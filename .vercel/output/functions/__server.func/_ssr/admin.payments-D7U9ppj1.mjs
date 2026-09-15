import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { M as useBi, p as getErrorMessage } from "./rbac-static-data-6lJhuenE.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Ot as Check, X as LoaderCircle, n as X, nt as Image } from "../_libs/lucide-react.mjs";
import { n as Guard } from "./guard-X81oQi1X.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import { t as PageHeader } from "./page-header-BDwvM2RF.mjs";
import { i as EmptyState } from "./kit-CS2UTmaS.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CE79KVEh.mjs";
import { a as getPendingTopUpRequests, c as receiptImageUrl, d as verifyTopUpRequest, n as completeWithdrawal, o as getPendingWithdrawalRequests, r as decideWithdrawalRequest } from "./wallet-BbXW_DfR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.payments-D7U9ppj1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WalletRequestsPage() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: bi("طلبات المحفظة", "Wallet requests"),
			icon: "Wallet"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-8 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopUpSection, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithdrawalSection, {})]
		})]
	});
}
function TopUpSection() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const [reviewing, setReviewing] = (0, import_react.useState)(null);
	const [rejectionReason, setRejectionReason] = (0, import_react.useState)("");
	const { data: rows, isLoading } = useQuery({
		queryKey: ["wallet-pending-topups"],
		queryFn: getPendingTopUpRequests
	});
	const decide = useMutation({
		mutationFn: (input) => verifyTopUpRequest(input),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wallet-pending-topups"] });
			setReviewing(null);
			setRejectionReason("");
			toast.success(bi("تم تنفيذ الإجراء", "Done"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر تنفيذ الإجراء", "Action failed")))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-display text-base font-bold text-foreground",
			children: bi("طلبات شحن رصيد معلّقة (طلاب)", "Pending top-up requests (students)")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-2xl bg-card",
			role: "region",
			"aria-label": bi("طلبات شحن الرصيد", "Top-up requests"),
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center p-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
			}) : !rows?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: "Wallet",
				text: bi("لا توجد طلبات شحن معلّقة حاليًا.", "No pending top-up requests right now.")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-3xl text-start text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-semibold",
							children: bi("الطالب", "Student")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-semibold",
							children: bi("المبلغ", "Amount")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-semibold",
							children: bi("مرجع البنك", "Bank ref.")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-semibold",
							children: bi("الإشعار", "Receipt")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-40 px-4 py-3 font-semibold",
							children: bi("إجراءات", "Actions")
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border/60 last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-mono text-xs text-muted-foreground",
							children: r.studentId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-semibold text-foreground",
							children: r.amount.toLocaleString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted-foreground",
							children: r.bankReferenceNo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: receiptImageUrl(r.receiptFileUrl),
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex items-center gap-1 text-primary hover:underline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-4" }), bi("عرض", "View")]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									title: bi("قبول", "Approve"),
									className: "text-success",
									disabled: decide.isPending,
									onClick: () => decide.mutate({
										requestId: r.id,
										approve: true
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									title: bi("رفض", "Reject"),
									className: "text-destructive",
									disabled: decide.isPending,
									onClick: () => setReviewing(r),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
								})]
							})
						})
					]
				}, r.id)) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!reviewing,
			onOpenChange: (v) => !v && setReviewing(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "text-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: bi("سبب الرفض", "Rejection reason") }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "reject-reason",
							children: bi("السبب (اختياري)", "Reason (optional)")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "reject-reason",
							value: rejectionReason,
							onChange: (e) => setRejectionReason(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							disabled: decide.isPending,
							onClick: () => reviewing && decide.mutate({
								requestId: reviewing.id,
								approve: false,
								rejectionReason: rejectionReason || void 0
							}),
							children: bi("تأكيد الرفض", "Confirm rejection")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setReviewing(null),
							children: bi("إلغاء", "Cancel")
						})]
					})
				]
			})
		})
	] });
}
function WithdrawalSection() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const [reviewing, setReviewing] = (0, import_react.useState)(null);
	const [rejectionReason, setRejectionReason] = (0, import_react.useState)("");
	const [completing, setCompleting] = (0, import_react.useState)(null);
	const [transferReference, setTransferReference] = (0, import_react.useState)("");
	const { data: rows, isLoading } = useQuery({
		queryKey: ["wallet-pending-withdrawals"],
		queryFn: getPendingWithdrawalRequests
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["wallet-pending-withdrawals"] });
	const decide = useMutation({
		mutationFn: (input) => decideWithdrawalRequest(input),
		onSuccess: () => {
			invalidate();
			setReviewing(null);
			setRejectionReason("");
			toast.success(bi("تم تنفيذ الإجراء", "Done"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر تنفيذ الإجراء", "Action failed")))
	});
	const complete = useMutation({
		mutationFn: (input) => completeWithdrawal(input),
		onSuccess: () => {
			invalidate();
			setCompleting(null);
			setTransferReference("");
			toast.success(bi("تم تأكيد التحويل وخصم الرصيد", "Transfer confirmed and balance debited"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر تأكيد التحويل", "Failed to confirm")))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-display text-base font-bold text-foreground",
			children: bi("طلبات سحب أرباح معلّقة (معلّمون)", "Pending withdrawal requests (teachers)")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-2xl bg-card",
			role: "region",
			"aria-label": bi("طلبات السحب", "Withdrawal requests"),
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center p-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
			}) : !rows?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: "Wallet",
				text: bi("لا توجد طلبات سحب معلّقة حاليًا.", "No pending withdrawal requests right now.")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-3xl text-start text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-semibold",
							children: bi("المعلّم", "Teacher")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-semibold",
							children: bi("المبلغ", "Amount")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-semibold",
							children: bi("البنك", "Bank")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-semibold",
							children: bi("IBAN", "IBAN")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-52 px-4 py-3 font-semibold",
							children: bi("إجراءات", "Actions")
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border/60 last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-mono text-xs text-muted-foreground",
							children: r.instructorId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-semibold text-foreground",
							children: r.amount.toLocaleString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-4 py-3 text-muted-foreground",
							children: [
								r.bankName,
								" — ",
								r.accountHolderName
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-mono text-xs text-muted-foreground",
							children: r.bankIBAN
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "ghost",
										className: "text-success",
										disabled: decide.isPending,
										onClick: () => decide.mutate({
											requestId: r.id,
											approve: true
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), bi("موافقة", "Approve")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "ghost",
										className: "text-destructive",
										disabled: decide.isPending,
										onClick: () => setReviewing(r),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), bi("رفض", "Reject")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => setCompleting(r),
										children: bi("تأكيد التحويل", "Confirm transfer")
									})
								]
							})
						})
					]
				}, r.id)) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!reviewing,
			onOpenChange: (v) => !v && setReviewing(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "text-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: bi("سبب الرفض", "Rejection reason") }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "wd-reject-reason",
							children: bi("السبب (اختياري)", "Reason (optional)")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "wd-reject-reason",
							value: rejectionReason,
							onChange: (e) => setRejectionReason(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							disabled: decide.isPending,
							onClick: () => reviewing && decide.mutate({
								requestId: reviewing.id,
								approve: false,
								rejectionReason: rejectionReason || void 0
							}),
							children: bi("تأكيد الرفض", "Confirm rejection")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setReviewing(null),
							children: bi("إلغاء", "Cancel")
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!completing,
			onOpenChange: (v) => !v && setCompleting(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "text-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: bi("تأكيد إتمام التحويل البنكي", "Confirm the bank transfer") }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: bi("استخدم هالخيار بس بعد ما توافق على الطلب وتحوّل المبلغ فعليًا من حساب المنصة البنكي.", "Use this only after approving the request and actually transferring the amount from the platform's bank account.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "transfer-ref",
							children: bi("مرجع التحويل البنكي", "Transfer reference")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "transfer-ref",
							value: transferReference,
							onChange: (e) => setTransferReference(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: complete.isPending || !transferReference.trim(),
							onClick: () => completing && complete.mutate({
								requestId: completing.id,
								transferReference
							}),
							children: bi("تأكيد", "Confirm")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setCompleting(null),
							children: bi("إلغاء", "Cancel")
						})]
					})
				]
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
	pageKey: "admin_payments",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletRequestsPage, {})
});
//#endregion
export { SplitComponent as component };
