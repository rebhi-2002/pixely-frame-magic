import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
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
import { GENDER_LABELS, type UserRow } from "@/lib/rbac-types";

export const Route = createFileRoute("/_authenticated/users")({
  head: () => ({
    meta: [
      { title: "المستخدمين | نظام الصلاحيات" },
      {
        name: "description",
        content: "قائمة المستخدمين مع فلاتر الحالة والجنس ونوع المستخدم وإدارة كاملة لبياناتهم.",
      },
      { property: "og:title", content: "المستخدمين | نظام الصلاحيات" },
      { property: "og:description", content: "إدارة المستخدمين وفلترتهم حسب الحالة والنوع." },
    ],
  }),
  component: UsersPage,
});

const EMPTY_FORM = {
  full_name: "",
  email: "",
  phone: "",
  gender: "male" as "male" | "female",
  role_id: null as string | null,
  is_active: true,
};

function UsersPage() {
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
      toast.success("تم الحفظ");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "تعذّر الحفظ"),
  });

  const statusMutation = useMutation({
    mutationFn: (vars: { id: string; is_active: boolean }) => toggleStatus({ data: vars }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("تم تحديث الحالة");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "تعذّر التحديث"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setPendingDelete(null);
      toast.success("تم الحذف");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "تعذّر الحذف"),
  });

  const resetMutation = useMutation({
    mutationFn: (id: string) =>
      resetPassword({ data: { id, redirectTo: `${window.location.origin}/auth` } }),
    onSuccess: () => toast.success("تم إرسال رابط تغيير كلمة المرور"),
    onError: (e) => toast.error(e instanceof Error ? e.message : "تعذّر الإرسال"),
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
      <PageHeader title="المستخدمين" icon="Users2" />

      <div className="p-5">
        <Toolbar>
          <div className="relative min-w-56 flex-1">
            <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="بحث بالاسم أو البريد أو الجوال"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-9"
            />
          </div>

          <FilterSelect
            value={status}
            onChange={setStatus}
            placeholder="الحالة"
            options={[
              { value: "all", label: "كل الحالات" },
              { value: "active", label: "نشط" },
              { value: "inactive", label: "غير نشط" },
            ]}
          />
          <FilterSelect
            value={gender}
            onChange={setGender}
            placeholder="الجنس"
            options={[
              { value: "all", label: "الكل" },
              { value: "male", label: "ذكر" },
              { value: "female", label: "أنثى" },
            ]}
          />
          <FilterSelect
            value={roleFilter}
            onChange={setRoleFilter}
            placeholder="نوع المستخدم"
            options={[
              { value: "all", label: "كل الأنواع" },
              ...(roles ?? []).map((r) => ({ value: r.id, label: r.name })),
            ]}
          />

          {can("users", "show_add_form") && (
            <Button className="mr-auto" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              إضافة مستخدم
            </Button>
          )}
        </Toolbar>

        <div className="mt-4 overflow-x-auto rounded-2xl bg-card">
          {isLoading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="size-5 animate-spin text-primary" />
            </div>
          ) : (
            <table className="w-full min-w-3xl text-right text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="w-14 px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">الاسم</th>
                  <th className="px-4 py-3 font-semibold">البريد</th>
                  <th className="px-4 py-3 font-semibold">الجوال</th>
                  <th className="px-4 py-3 font-semibold">الجنس</th>
                  <th className="px-4 py-3 font-semibold">النوع</th>
                  <th className="px-4 py-3 font-semibold">الحالة</th>
                  <th className="w-36 px-4 py-3 font-semibold">إجراءات</th>
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
                      {GENDER_LABELS[u.gender] ?? u.gender}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{u.role_name ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Switch
                        checked={u.is_active}
                        disabled={!can("users", "edit")}
                        onCheckedChange={(v) => statusMutation.mutate({ id: u.id, is_active: v })}
                        aria-label={`حالة ${u.full_name}`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {can("users", "edit") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title="تعديل"
                            onClick={() => openDialog(u)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                        )}
                        {can("users", "change_password") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title="إرسال رابط كلمة المرور"
                            onClick={() => resetMutation.mutate(u.id)}
                          >
                            <KeyRound className="size-4" />
                          </Button>
                        )}
                        {can("users", "delete") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title="حذف"
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
                      لا توجد نتائج مطابقة.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent dir="rtl" className="text-right">
          <DialogHeader>
            <DialogTitle>{editingId ? "تعديل مستخدم" : "إضافة مستخدم"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="u-name">الاسم الكامل</Label>
              <Input
                id="u-name"
                value={form.full_name}
                onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="u-email">البريد الإلكتروني</Label>
              <Input
                id="u-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="u-phone">رقم الجوال</Label>
              <Input
                id="u-phone"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>الجنس</Label>
              <Select
                value={form.gender}
                onValueChange={(v) => setForm((f) => ({ ...f, gender: v as "male" | "female" }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">ذكر</SelectItem>
                  <SelectItem value="female">أنثى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>نوع المستخدم</Label>
              <Select
                value={form.role_id ?? "none"}
                onValueChange={(v) => setForm((f) => ({ ...f, role_id: v === "none" ? null : v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="بدون" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">بدون</SelectItem>
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
              <Label htmlFor="u-active">الحساب نشط</Label>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
              حفظ
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!pendingDelete} onOpenChange={(v) => !v && setPendingDelete(null)}>
        <AlertDialogContent dir="rtl" className="text-right">
          <AlertDialogHeader>
            <AlertDialogTitle>حذف «{pendingDelete?.full_name}»؟</AlertDialogTitle>
            <AlertDialogDescription>لا يمكن التراجع عن هذا الإجراء.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:justify-start">
            <AlertDialogAction
              onClick={() => pendingDelete && deleteMutation.mutate(pendingDelete.id)}
            >
              حذف
            </AlertDialogAction>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
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
