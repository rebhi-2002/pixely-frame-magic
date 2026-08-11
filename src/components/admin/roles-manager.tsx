import { useState } from "react";
import {Link} from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Pencil, Settings2, Trash2, Plus } from "lucide-react";
import { PageHeader, Toolbar } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { deleteRole, listRoles, saveRole } from "@/lib/rbac.functions";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import type { RoleRow } from "@/lib/rbac-types";


export function UserTypesPage() {
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const bi = useBi();
  const fetchRoles = useServerFn(listRoles);
  const persist = useServerFn(saveRole);
  const remove = useServerFn(deleteRole);

  const [editing, setEditing] = useState<RoleRow | null>(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pendingDelete, setPendingDelete] = useState<RoleRow | null>(null);

  const { data, isLoading } = useQuery({ queryKey: ["roles"], queryFn: () => fetchRoles() });

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: { id: editing?.id, name, description: description || null },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      setOpen(false);
      toast.success("تم الحفظ بنجاح");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "تعذّر الحفظ"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      setPendingDelete(null);
      toast.success("تم الحذف");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "تعذّر الحذف"),
  });

  function openDialog(role: RoleRow | null) {
    setEditing(role);
    setName(role?.name ?? "");
    setDescription(role?.description ?? "");
    setOpen(true);
  }

  return (
    <div>
      <PageHeader title=bi("أنواع المستخدم", "User roles") icon="ShieldCheck" />

      <div className="p-5">
        {can("admin_roles", "show_add_form") && (
          <Toolbar>
            <Button onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة نوع مستخدم", "Add role")}
            </Button>
          </Toolbar>
        )}

        <div className="mt-4 overflow-hidden rounded-2xl bg-card">
          {isLoading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="size-5 animate-spin text-primary" />
            </div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="w-16 px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">{bi("الاسم", "Name")}</th>
                  <th className="px-4 py-3 font-semibold">{bi("الوصف", "Description")}</th>
                  <th className="w-40 px-4 py-3 font-semibold">{bi("إجراءات", "Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {(data ?? []).map((role, i) => (
                  <tr key={role.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">{role.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{role.description ?? "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button asChild size="icon" variant="ghost" title={bi("الصلاحيات", "Permissions")}>
                          <Link to="/role-permissions/$roleId" params={{ roleId: role.id }}>
                            <Settings2 className="size-4" />
                          </Link>
                        </Button>
                        {can("admin_roles", "edit") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("تعديل", "Edit")}
                            onClick={() => openDialog(role)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                        )}
                        {can("admin_roles", "delete") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title={bi("حذف", "Delete")}
                            className="text-destructive"
                            onClick={() => setPendingDelete(role)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {!isLoading && !(data ?? []).length && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      {bi("لا توجد أنواع مستخدمين بعد.", "No roles yet.")}
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
            <DialogTitle>{editing ? bi("تعديل نوع المستخدم", "Edit role") : bi("إضافة نوع مستخدم", "Add role")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="role-name">{bi("الاسم", "Name")}</Label>
              <Input id="role-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="role-desc">{bi("الوصف", "Description")}</Label>
              <Textarea
                id="role-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
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
        <AlertDialogContent dir="rtl" className="text-right">
          <AlertDialogHeader>
            <AlertDialogTitle>{bi(`حذف «${pendingDelete?.name}»؟`, `Delete “${pendingDelete?.name}”?`)}</AlertDialogTitle>
            <AlertDialogDescription>
              {bi("سيتم حذف النوع وكل صلاحياته. لا يمكن التراجع عن هذا الإجراء.", "The role and all of its permissions will be deleted. This cannot be undone.")}
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
