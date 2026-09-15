import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { PageHeader, Toolbar } from "@/components/admin/page-header";
import { Pagination } from "@/components/app/kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  deleteBackendUser,
  listBackendUsers,
  loadBackendUserOptions,
  saveBackendUser,
  updateBackendUserStatus,
} from "@/integrations/backend/admin-users";
import { getErrorMessage } from "@/integrations/backend/client";
import { useAccess } from "@/hooks/use-access";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type { UserRow } from "@/lib/rbac-types";
import { useBi } from "@/lib/bi";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";

const EMPTY_FORM = {
  full_name: "",
  email: "",
  phone: "",
  gender: "male" as "male" | "female",
  gender_id: null as number | null,
  role_id: null as string | null,
  is_active: true,
  password: "",
  confirmPassword: "",
};

export function UsersPage() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const [status, setStatus] = useState("all");
  const [gender, setGender] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 20;

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<UserRow | null>(null);

  const { data: options } = useQuery({
    queryKey: ["backend-user-options"],
    queryFn: loadBackendUserOptions,
    staleTime: 5 * 60_000,
    retry: false,
  });
  const hasFilters =
    Boolean(search.trim()) || status !== "all" || gender !== "all" || roleFilter !== "all";
  const roles = (options?.roles ?? []).map((role) => ({
    id: String(role.id),
    name: role.name,
  }));
  const genders = options?.genders ?? [];

  // فلترة/بحث حقيقي من الباك اند (لا نجيب كل المستخدمين ونفلتر بالمتصفح —
  // الباك اند أصلاً بيدعم هالمعاملات كلها، وكان مهدور بـpageSize:1000 ثابت
  // قبل هالتعديل. راجع full-project-report.md قسم "جداول أدمن" للتفاصيل).
  const {
    data: usersResult,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", { search: debouncedSearch, status, gender, roleFilter, page }],
    queryFn: () =>
      listBackendUsers({
        searchValue: debouncedSearch.trim(),
        userTypeId: roleFilter === "all" ? null : Number(roleFilter),
        genderId: gender === "all" ? null : Number(gender),
        isActiveSearch: status === "all" ? null : status === "active",
        pageSize: PAGE_SIZE,
        skip: page * PAGE_SIZE,
      }),
    placeholderData: (prev) => prev,
  });
  const users = usersResult?.rows ?? [];
  const totalCount = usersResult?.totalCount ?? 0;

  function resetToFirstPage<T>(setter: (v: T) => void) {
    return (value: T) => {
      setter(value);
      setPage(0);
    };
  }

  // تحقق حقيقي قبل الإرسال — كان معدوم بالكامل (يعتمد فقط على رفض
  // الباك اند + رسالة خطأ عامة). راجع full-project-report.md للسياق
  // (نفس النمط المستخدم أصلاً بـsignup.tsx/teacher.register.tsx).
  function validateUserForm(): string | null {
    if (!form.full_name.trim()) return bi("الاسم الكامل مطلوب", "Full name is required");
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      return bi("البريد الإلكتروني غير صالح", "Enter a valid email address");
    }
    if (!form.phone.trim()) return bi("رقم الجوال مطلوب", "Phone number is required");
    if (form.gender_id == null) return bi("الجنس مطلوب", "Gender is required");
    if (!editingId) {
      if (form.password.length < 6) {
        return bi("كلمة المرور 6 أحرف على الأقل", "Password must be at least 6 characters");
      }
      if (form.password !== form.confirmPassword) {
        return bi("كلمتا المرور غير متطابقتين", "Passwords don't match");
      }
    }
    return null;
  }

  const saveMutation = useMutation({
    mutationFn: () => saveBackendUser({ ...form, id: editingId ?? undefined }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
  });

  const statusMutation = useMutation({
    mutationFn: (vars: { id: string; is_active: boolean }) =>
      updateBackendUserStatus(vars.id, vars.is_active),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(bi("تم تحديث الحالة", "Status updated"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر التحديث", "Failed to update"))),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBackendUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setPendingDelete(null);
      toast.success(bi("تم الحذف", "Deleted successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete"))),
  });

  function openDialog(user: UserRow | null) {
    setEditingId(user?.id ?? null);
    setForm(
      user
        ? {
            full_name: user.full_name,
            email: user.email ?? "",
            phone: user.phone ?? "",
            gender: (user.gender as "male" | "female") ?? "male",
            gender_id: user.gender_id ?? null,
            role_id: user.role_id,
            is_active: user.is_active,
            password: "",
            confirmPassword: "",
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <div>
      <PageHeader title={bi("المستخدمين", "Users")} icon="Users2" />

      <div className="p-5">
        <Toolbar>
          <div className="relative min-w-56 flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={bi("بحث بالاسم أو البريد أو الجوال", "Search by name, email, or phone")}
              value={search}
              onChange={(e) => resetToFirstPage(setSearch)(e.target.value)}
              className="ps-9"
            />
          </div>

          <FilterSelect
            value={status}
            onChange={resetToFirstPage(setStatus)}
            placeholder={bi("الحالة", "Status")}
            options={[
              { value: "all", label: bi("كل الحالات", "All statuses") },
              { value: "active", label: bi("نشط", "Active") },
              { value: "inactive", label: bi("غير نشط", "Inactive") },
            ]}
          />
          <FilterSelect
            value={gender}
            onChange={resetToFirstPage(setGender)}
            placeholder={bi("الجنس", "Gender")}
            options={[
              { value: "all", label: bi("الكل", "All") },
              ...genders.map((g) => ({ value: String(g.id), label: g.name })),
            ]}
          />
          <FilterSelect
            value={roleFilter}
            onChange={resetToFirstPage(setRoleFilter)}
            placeholder={bi("نوع المستخدم", "User type")}
            options={[
              { value: "all", label: bi("كل الأنواع", "All types") },
              ...(roles ?? []).map((r) => ({ value: r.id, label: r.name })),
            ]}
          />

          {can("admin_users", "show_add_form") && (
            <Button className="ms-auto" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة مستخدم", "Add user")}
            </Button>
          )}
        </Toolbar>
        <div
          className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground"
          aria-live="polite"
        >
          <span>
            {bi(`${totalCount} نتيجة`, `${totalCount} result${totalCount === 1 ? "" : "s"}`)}
          </span>
          {hasFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch("");
                setStatus("all");
                setGender("all");
                setRoleFilter("all");
                setPage(0);
              }}
            >
              {bi("مسح الفلاتر", "Clear filters")}
            </Button>
          )}
        </div>

        <div
          className="mt-4 overflow-x-auto rounded-2xl bg-card"
          role="region"
          aria-label={bi("قائمة المستخدمين", "Users list")}
        >
          {isLoading ? (
            <LoadingState label={bi("عم نحمّل المستخدمين…", "Loading users…")} />
          ) : isError ? (
            <ErrorState
              title={bi("تعذّر تحميل المستخدمين", "Couldn't load users")}
              action={
                <RetryButton
                  label={bi("إعادة المحاولة", "Try again")}
                  onClick={() => void queryClient.invalidateQueries({ queryKey: ["users"] })}
                />
              }
            />
          ) : (
            <table className="w-full min-w-[900px] text-start text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="w-14 px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">{bi("الاسم", "Name")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("البريد", "Email")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("الجوال", "Phone")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("الجنس", "Gender")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("النوع", "Type")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("الحالة", "Status")}</th>
                  <th className="w-36 px-4 py-3 font-semibold">{bi("إجراءات", "Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">{u.full_name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{u.email ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{u.phone ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {u.gender === "male"
                        ? bi("ذكر", "Male")
                        : u.gender === "female"
                          ? bi("أنثى", "Female")
                          : (u.gender ?? "—")}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{u.role_name ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Switch
                        checked={u.is_active}
                        disabled={!can("admin_users", "edit")}
                        onCheckedChange={(v) => statusMutation.mutate({ id: u.id, is_active: v })}
                        aria-label={bi(`حالة ${u.full_name}`, `Status for ${u.full_name}`)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {can("admin_users", "edit") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("تعديل", "Edit")}
                            onClick={() => openDialog(u)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                        )}
                        {can("admin_users", "delete") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("حذف", "Delete")}
                            className="text-destructive"
                            onClick={() => setPendingDelete(u)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {!users.length && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-muted-foreground">
                      {hasFilters
                        ? bi(
                            "لا توجد نتائج مطابقة للفلاتر الحالية.",
                            "No users match the current filters.",
                          )
                        : bi("لا يوجد مستخدمون بعد.", "No users yet.")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <Pagination
          page={page}
          pageSize={PAGE_SIZE}
          totalCount={totalCount}
          onPageChange={setPage}
          summary={bi(
            `${Math.min(page * PAGE_SIZE + 1, totalCount)}–${Math.min((page + 1) * PAGE_SIZE, totalCount)} من ${totalCount}`,
            `${Math.min(page * PAGE_SIZE + 1, totalCount)}–${Math.min((page + 1) * PAGE_SIZE, totalCount)} of ${totalCount}`,
          )}
          previousLabel={bi("السابق", "Previous")}
          nextLabel={bi("التالي", "Next")}
        />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل مستخدم", "Edit user") : bi("إضافة مستخدم", "Add user")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="u-name">{bi("الاسم الكامل", "Full name")}</Label>
              <Input
                id="u-name"
                value={form.full_name}
                onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="u-email">{bi("البريد الإلكتروني", "Email address")}</Label>
              <Input
                id="u-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="u-phone">{bi("رقم الجوال", "Phone number")}</Label>
              <Input
                id="u-phone"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{bi("الجنس", "Gender")}</Label>
              <Select
                value={form.gender_id == null ? "none" : String(form.gender_id)}
                onValueChange={(value) => {
                  const gender = genders.find((item) => String(item.id) === value);
                  setForm((f) => ({
                    ...f,
                    gender_id: gender?.id ?? null,
                    gender: gender?.name.includes("أنثى") ? "female" : "male",
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={bi("اختر الجنس", "Select gender")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none" disabled>
                    {bi("اختر الجنس", "Select gender")}
                  </SelectItem>
                  {genders.map((gender) => (
                    <SelectItem key={gender.id} value={String(gender.id)}>
                      {gender.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {!editingId && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="u-password">{bi("كلمة المرور", "Password")}</Label>
                  <Input
                    id="u-password"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="u-confirm-password">
                    {bi("تأكيد كلمة المرور", "Confirm password")}
                  </Label>
                  <Input
                    id="u-confirm-password"
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                  />
                </div>
              </>
            )}
            <div className="space-y-1.5">
              <Label>{bi("نوع المستخدم", "User type")}</Label>
              <Select
                value={form.role_id ?? "none"}
                onValueChange={(v) => setForm((f) => ({ ...f, role_id: v === "none" ? null : v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={bi("بدون", "None")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{bi("بدون", "None")}</SelectItem>
                  {(roles ?? []).map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3 sm:col-span-2">
              <Switch
                checked={form.is_active}
                onCheckedChange={(v) => setForm((f) => ({ ...f, is_active: v }))}
                id="u-active"
              />
              <Label htmlFor="u-active">{bi("الحساب نشط", "Account active")}</Label>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => {
                const error = validateUserForm();
                if (error) {
                  toast.error(error);
                  return;
                }
                saveMutation.mutate();
              }}
              loading={saveMutation.isPending}
            >
              {bi("حفظ", "Save")}
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {bi("إلغاء", "Cancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!pendingDelete} onOpenChange={(v) => !v && setPendingDelete(null)}>
        <AlertDialogContent className="text-start">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {bi(`حذف «${pendingDelete?.full_name}»؟`, `Delete "${pendingDelete?.full_name}"?`)}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:justify-start">
            <AlertDialogAction
              onClick={() => pendingDelete && deleteMutation.mutate(pendingDelete.id)}
            >
              {bi("حذف", "Delete")}
            </AlertDialogAction>
            <AlertDialogCancel>{bi("إلغاء", "Cancel")}</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
