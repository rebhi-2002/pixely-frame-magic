import { useMemo, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { KeyRound, Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { PageHeader, Toolbar } from "@/components/admin/page-header";
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
  deleteUser,
  listRoles,
  listUsers,
  saveUser,
  sendPasswordReset,
  toggleUserStatus,
} from "@/lib/rbac.functions";
import { useAccess } from "@/hooks/use-access";
import type { UserRow } from "@/lib/rbac-types";
import { useBi } from "@/lib/bi";

const EMPTY_FORM = {
  full_name: "",
  email: "",
  phone: "",
  gender: "male" as "male" | "female",
  role_id: null as string | null,
  is_active: true,
};

export function UsersPage() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchUsers = useServerFn(listUsers);
  const fetchRoles = useServerFn(listRoles);
  const persist = useServerFn(saveUser);
  const toggleStatus = useServerFn(toggleUserStatus);
  const remove = useServerFn(deleteUser);
  const resetPassword = useServerFn(sendPasswordReset);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [gender, setGender] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<UserRow | null>(null);

  const { data: users, isLoading } = useQuery({ queryKey: ["users"], queryFn: () => fetchUsers() });
  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: () => fetchRoles(),
    retry: false,
  });

  const filtered = useMemo(() => {
    return (users ?? []).filter((u) => {
      if (status !== "all" && u.is_active !== (status === "active")) return false;
      if (gender !== "all" && u.gender !== gender) return false;
      if (roleFilter !== "all" && u.role_id !== roleFilter) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const hay = `${u.full_name} ${u.email ?? ""} ${u.phone ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [users, status, gender, roleFilter, search]);

  const saveMutation = useMutation({
    mutationFn: () => persist({ data: { ...form, id: editingId ?? undefined } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : bi("تعذّر الحفظ", "Failed to save")),
  });

  const statusMutation = useMutation({
    mutationFn: (vars: { id: string; is_active: boolean }) => toggleStatus({ data: vars }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(bi("تم تحديث الحالة", "Status updated"));
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : bi("تعذّر التحديث", "Failed to update")),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setPendingDelete(null);
      toast.success(bi("تم الحذف", "Deleted successfully"));
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : bi("تعذّر الحذف", "Failed to delete")),
  });

  const resetMutation = useMutation({
    mutationFn: (id: string) =>
      resetPassword({ data: { id, redirectTo: `${window.location.origin}/auth` } }),
    onSuccess: () => toast.success(bi("تم إرسال رابط تغيير كلمة المرور", "Reset link sent")),
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : bi("تعذّر الإرسال", "Failed to send")),
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
            role_id: user.role_id,
            is_active: user.is_active,
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
              onChange={(e) => setSearch(e.target.value)}
              className="ps-9"
            />
          </div>

          <FilterSelect
            value={status}
            onChange={setStatus}
            placeholder={bi("الحالة", "Status")}
            options={[
              { value: "all", label: bi("كل الحالات", "All statuses") },
              { value: "active", label: bi("نشط", "Active") },
              { value: "inactive", label: bi("غير نشط", "Inactive") },
            ]}
          />
          <FilterSelect
            value={gender}
            onChange={setGender}
            placeholder={bi("الجنس", "Gender")}
            options={[
              { value: "all", label: bi("الكل", "All") },
              { value: "male", label: bi("ذكر", "Male") },
              { value: "female", label: bi("أنثى", "Female") },
            ]}
          />
          <FilterSelect
            value={roleFilter}
            onChange={setRoleFilter}
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

        <div className="mt-4 overflow-x-auto rounded-2xl bg-card">
          {isLoading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="size-5 animate-spin text-primary" />
            </div>
          ) : (
            <table className="w-full min-w-3xl text-start text-sm">
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
                {filtered.map((u, i) => (
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
                        {can("admin_users", "change_password") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("إرسال رابط كلمة المرور", "Send password reset link")}
                            onClick={() => resetMutation.mutate(u.id)}
                          >
                            <KeyRound className="size-4" />
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
                {!filtered.length && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-muted-foreground">
                      {bi("لا توجد نتائج مطابقة.", "No matching results.")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
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
                value={form.gender}
                onValueChange={(v) => setForm((f) => ({ ...f, gender: v as "male" | "female" }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{bi("ذكر", "Male")}</SelectItem>
                  <SelectItem value="female">{bi("أنثى", "Female")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
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
