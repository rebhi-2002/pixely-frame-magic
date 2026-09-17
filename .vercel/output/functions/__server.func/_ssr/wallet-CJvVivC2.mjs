import { O as throwBilingual, d as apiClient } from "./rbac-static-data-DgiM51a_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wallet-CJvVivC2.js
var WalletTransactionType = {
	TopUp: 1,
	Withdrawal: 2,
	EnrollmentDeduction: 3,
	InstructorCredit: 4
};
async function getMyWallet() {
	return apiClient.get("/api/Wallet/MyWallet");
}
async function getTransactionHistory(page = 0, pageSize = 10) {
	const result = await apiClient.post("/api/Wallet/GetTransactionHistory", {
		searchValue: "",
		sortColumn: "",
		sortColumnDirection: "",
		pageSize,
		skip: page * pageSize
	});
	return {
		rows: result.data ?? [],
		totalCount: result.totalCount ?? 0
	};
}
/** الطالب: طلب شحن رصيد مع صورة إشعار تحويل بنكي (multipart/form-data). */
async function submitTopUpRequest(input) {
	const formData = new FormData();
	formData.append("Amount", String(input.amount));
	formData.append("BankReferenceNo", input.bankReferenceNo);
	formData.append("ReceiptFile", input.receiptFile);
	const result = await apiClient.postForm("/api/Wallet/SubmitTopUpRequest", formData);
	if (!result.success) {
		if (result.message) throw new Error(result.message);
		throwBilingual("تعذر إرسال طلب الشحن", "Failed to submit the top-up request");
	}
}
/** المعلم: طلب سحب أرباح إلى حسابه البنكي. */
async function submitWithdrawalRequest(input) {
	const result = await apiClient.post("/api/Wallet/SubmitWithdrawalRequest", input);
	if (!result.success) {
		if (result.message) throw new Error(result.message);
		throwBilingual("تعذر إرسال طلب السحب", "Failed to submit the withdrawal request");
	}
}
async function getPendingTopUpRequests() {
	const result = await apiClient.get("/api/Wallet/GetPendingTopUpRequests");
	return Array.isArray(result) ? result : [];
}
async function getPendingWithdrawalRequests() {
	const result = await apiClient.get("/api/Wallet/GetPendingWithdrawalRequests");
	return Array.isArray(result) ? result : [];
}
/** رابط صورة إشعار التحويل — يفتح مباشرة (GET عادي بيرجع الصورة). */
function receiptImageUrl(fileName) {
	return `${apiClient.baseUrl}/api/Wallet/GetReceiptImage?fileName=${encodeURIComponent(fileName)}`;
}
async function verifyTopUpRequest(input) {
	const result = await apiClient.post("/api/Wallet/VerifyTopUpRequest", input);
	if (!result.success) {
		if (result.message) throw new Error(result.message);
		throwBilingual("تعذر تنفيذ الإجراء", "Failed to complete the action");
	}
}
async function decideWithdrawalRequest(input) {
	const result = await apiClient.post("/api/Wallet/DecideWithdrawalRequest", input);
	if (!result.success) {
		if (result.message) throw new Error(result.message);
		throwBilingual("تعذر تنفيذ الإجراء", "Failed to complete the action");
	}
}
async function completeWithdrawal(input) {
	const result = await apiClient.post("/api/Wallet/CompleteWithdrawal", input);
	if (!result.success) {
		if (result.message) throw new Error(result.message);
		throwBilingual("تعذر تأكيد التحويل", "Failed to confirm the transfer");
	}
}
//#endregion
export { getPendingTopUpRequests as a, receiptImageUrl as c, verifyTopUpRequest as d, getMyWallet as i, submitTopUpRequest as l, completeWithdrawal as n, getPendingWithdrawalRequests as o, decideWithdrawalRequest as r, getTransactionHistory as s, WalletTransactionType as t, submitWithdrawalRequest as u };
