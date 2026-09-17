// تكامل المحفظة (Wallet) مع WalletController بالباك اند.
// القيم الرقمية للـ enums تطابق academia.Core.Enums.WalletEnums.cs حرفيًا —
// الباك اند ما بيسجّل JsonStringEnumConverter، فبترجع كأرقام خام بالـJSON.

import { apiClient, throwBilingual } from "./client";

export const WalletTransactionDirection = { In: 1, Out: 2 } as const;
export const WalletTransactionType = {
  TopUp: 1,
  Withdrawal: 2,
  EnrollmentDeduction: 3,
  InstructorCredit: 4,
} as const;
export const WalletTransactionStatus = {
  Pending: 1,
  Accepted: 2,
  Rejected: 3,
  Completed: 4,
  Reversed: 5,
} as const;
export const TopUpRequestStatus = { PendingVerification: 1, Completed: 2, Rejected: 3 } as const;
export const WithdrawalRequestStatus = {
  PendingApproval: 1,
  ApprovedPendingTransfer: 2,
  Completed: 3,
  Rejected: 4,
} as const;

export interface WalletDto {
  id: number;
  userId: string;
  balance: number;
}

export interface WalletTransactionDto {
  id: number;
  walletId: number;
  direction: number;
  type: number;
  amount: number;
  status: number;
  description: string | null;
  createdOn: string;
}

interface TransactionHistoryResponse {
  data?: WalletTransactionDto[] | null;
  totalCount?: number;
}

export async function getMyWallet(): Promise<WalletDto> {
  return apiClient.get<WalletDto>("/api/Wallet/MyWallet");
}

export interface TransactionHistoryResult {
  rows: WalletTransactionDto[];
  totalCount: number;
}

export async function getTransactionHistory(
  page = 0,
  pageSize = 10,
): Promise<TransactionHistoryResult> {
  const result = await apiClient.post<TransactionHistoryResponse>(
    "/api/Wallet/GetTransactionHistory",
    { searchValue: "", sortColumn: "", sortColumnDirection: "", pageSize, skip: page * pageSize },
  );
  return { rows: result.data ?? [], totalCount: result.totalCount ?? 0 };
}

/** الطالب: طلب شحن رصيد مع صورة إشعار تحويل بنكي (multipart/form-data). */
export async function submitTopUpRequest(input: {
  amount: number;
  bankReferenceNo: string;
  receiptFile: File;
}): Promise<void> {
  const formData = new FormData();
  formData.append("Amount", String(input.amount));
  formData.append("BankReferenceNo", input.bankReferenceNo);
  formData.append("ReceiptFile", input.receiptFile);

  const result = await apiClient.postForm<{ success: boolean; message?: string | null }>(
    "/api/Wallet/SubmitTopUpRequest",
    formData,
  );
  if (!result.success) {
    if (result.message) throw new Error(result.message);
    throwBilingual("تعذر إرسال طلب الشحن", "Failed to submit the top-up request");
  }
}

/** المعلم: طلب سحب أرباح إلى حسابه البنكي. */
export async function submitWithdrawalRequest(input: {
  amount: number;
  bankIBAN: string;
  bankName: string;
  accountHolderName: string;
}): Promise<void> {
  const result = await apiClient.post<{ success: boolean; message?: string | null }>(
    "/api/Wallet/SubmitWithdrawalRequest",
    input,
  );
  if (!result.success) {
    if (result.message) throw new Error(result.message);
    throwBilingual("تعذر إرسال طلب السحب", "Failed to submit the withdrawal request");
  }
}

// ==================== الأدمن/المالية ====================
// ملاحظة: الباك اند حاليًا بيرجّع StudentId/InstructorId (نص) بس بدون اسم
// المستخدم (ما فيه .Include() على Student/Instructor بالسيرفس) — لهيك ما
// فينا نعرض اسم صاحب الطلب هون، بس الـ id. لو انضاف الاسم بالباك اند لاحقًا
// منضيفه هون بدون أي تغيير على الواجهة يلي بتستهلك هالدالة.

export interface PendingTopUpRequestDto {
  id: number;
  studentId: string;
  amount: number;
  bankReferenceNo: string;
  receiptFileUrl: string;
  status: number;
  createdOn: string;
}

export interface PendingWithdrawalRequestDto {
  id: number;
  instructorId: string;
  amount: number;
  bankIBAN: string;
  bankName: string;
  accountHolderName: string;
  status: number;
  createdOn: string;
}

export async function getPendingTopUpRequests(): Promise<PendingTopUpRequestDto[]> {
  const result = await apiClient.get<PendingTopUpRequestDto[]>(
    "/api/Wallet/GetPendingTopUpRequests",
  );
  return Array.isArray(result) ? result : [];
}

export async function getPendingWithdrawalRequests(): Promise<PendingWithdrawalRequestDto[]> {
  const result = await apiClient.get<PendingWithdrawalRequestDto[]>(
    "/api/Wallet/GetPendingWithdrawalRequests",
  );
  return Array.isArray(result) ? result : [];
}

/** رابط صورة إشعار التحويل — يفتح مباشرة (GET عادي بيرجع الصورة). */
export function receiptImageUrl(fileName: string): string {
  return `${apiClient.baseUrl}/api/Wallet/GetReceiptImage?fileName=${encodeURIComponent(fileName)}`;
}

export async function verifyTopUpRequest(input: {
  requestId: number;
  approve: boolean;
  rejectionReason?: string;
}): Promise<void> {
  const result = await apiClient.post<{ success: boolean; message?: string | null }>(
    "/api/Wallet/VerifyTopUpRequest",
    input,
  );
  if (!result.success) {
    if (result.message) throw new Error(result.message);
    throwBilingual("تعذر تنفيذ الإجراء", "Failed to complete the action");
  }
}

export async function decideWithdrawalRequest(input: {
  requestId: number;
  approve: boolean;
  rejectionReason?: string;
}): Promise<void> {
  const result = await apiClient.post<{ success: boolean; message?: string | null }>(
    "/api/Wallet/DecideWithdrawalRequest",
    input,
  );
  if (!result.success) {
    if (result.message) throw new Error(result.message);
    throwBilingual("تعذر تنفيذ الإجراء", "Failed to complete the action");
  }
}

export async function completeWithdrawal(input: {
  requestId: number;
  transferReference: string;
}): Promise<void> {
  const result = await apiClient.post<{ success: boolean; message?: string | null }>(
    "/api/Wallet/CompleteWithdrawal",
    input,
  );
  if (!result.success) {
    if (result.message) throw new Error(result.message);
    throwBilingual("تعذر تأكيد التحويل", "Failed to confirm the transfer");
  }
}
