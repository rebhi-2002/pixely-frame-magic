import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { AppPage, StatGrid, Panel, DataTable, Badge, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  deleteStudentRisk,
  listStudentRisk,
  saveStudentRisk,
} from "@/lib/supervisor-oversight.functions";
import { getSupervisionSettings } from "@/lib/supervisor-oversight.functions";
import type { StudentRiskRow, StudentRiskStatus } from "@/lib/supervisor-oversight-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";
import { authPageHead } from "@/lib/seo";

const description = "الطلاب المتعثّرون أولاً: من يحتاج تدخّلاً الآن ولماذا.";

export const Route = createFileRoute("/_authenticated/supervisor/students-overview")({
  head: () =>
    authPageHead(
      {
        title: "نظرة الطلاب | أكاديميا",
        description: "الطلاب المتعثّرون أولاً: من يحتاج تدخّلاً الآن ولماذا.",
      },
      {
        title: "Students overview | Academia",
        description: "Struggling students first: who needs intervention now, and why.",
      },
    ),
  component: PageRoute,
});

function PageRoute() {
  return (
    <Guard pageKey="supervisor_students">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = {
  studentName: "",
  gradeLabel: "",
  weakestSubject: "",
  weakestPercent: "50",
  status: "مراقبة" as StudentRiskStatus,
};

const STATUS_TONE: Record<StudentRiskStatus, "danger" | "primary" | "success"> = {
  متعثّر: "danger",
  مراقبة: "primary",
  منتظم: "success",
};

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listStudentRisk);
  const persist = useServerFn(saveStudentRisk);
  const remove = useServerFn(deleteStudentRisk);
  const fetchSettings = useServerFn(getSupervisionSettings);

  const rowsQuery = useQuery({ queryKey: ["student-risk"], queryFn: () => fetchRows() });
  const settingsQuery = useQuery({
    queryKey: ["supervision-settings"],
    queryFn: () => fetchSettings(),
  });

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<StudentRiskRow | null>(null);

  const isLoading = rowsQuery.isLoading || settingsQuery.isLoading;
  const list = useMemo(() => rowsQuery.data ?? [], [rowsQuery.data]);
  const settings = settingsQuery.data ?? { improvedThisMonth: 0 };

  const stats = useMemo(
    () => ({
      total: list.length,
      atRisk: list.filter((r) => r.status === "متعثّر").length,
      consistent: list.filter((r) => r.status === "منتظم").length,
    }),
    [list],
  );

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["student-risk"] });

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: {
          ...form,
          id: editingId ?? undefined,
          weakestPercent: Number(form.weakestPercent) || 0,
        },
      }),
    onSuccess: () => {
      invalidate();
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      invalidate();
      setPendingDelete(null);
      toast.success(bi("تم الحذف", "Deleted successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete"))),
  });

  function openDialog(row: StudentRiskRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            studentName: row.studentName,
            gradeLabel: row.gradeLabel,
            weakestSubject: row.weakestSubject,
            weakestPercent: String(row.weakestPercent),
            status: row.status,
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("نظرة الطلاب", "Students overview")}
      icon="Users"
      subtitle={bi(description, "Struggling students first: who needs intervention now, and why.")}
    >
      <StatGrid
        items={[
          { icon: "Users", label: bi("طلاب", "Students"), value: String(stats.total) },
          { icon: "AlertTriangle", label: bi("متعثّرون", "At risk"), value: String(stats.atRisk) },
          { icon: "Flame", label: bi("منتظمون", "Consistent"), value: String(stats.consistent) },
          {
            icon: "TrendingUp",
            label: bi("تحسّنوا هذا الشهر", "Improved"),
            value: String(settings.improvedThisMonth),
          },
        ]}
      />

      <Panel
        title={bi("يحتاجون تدخّلاً", "Needs intervention")}
        icon="Users"
        action={
          can("supervisor_students", "show_add_form") ? (
            <Button size="sm" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة طالب", "Add student")}
            </Button>
          ) : undefined
        }
      >
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="size-5 animate-spin text-primary" />
          </div>
        ) : list.length ? (
          <DataTable
            head={[
              bi("الطالب", "Student"),
              bi("الصف", "Grade"),
              bi("أضعف مادة", "Weakest"),
              bi("الحالة", "Status"),
              bi("", ""),
            ]}
            rows={list.map((r) => [
              r.studentName,
              r.gradeLabel,
              bi(
                `${r.weakestSubject} ${r.weakestPercent}%`,
                `${r.weakestSubject} ${r.weakestPercent}%`,
              ),
              <Badge key={r.id} tone={STATUS_TONE[r.status]}>
                {bi(
                  r.status,
                  r.status === "متعثّر"
                    ? "At risk"
                    : r.status === "مراقبة"
                      ? "Watch"
                      : "Consistent",
                )}
              </Badge>,
              <div key={`${r.id}-actions`} className="flex items-center justify-end gap-1">
                {can("supervisor_students", "edit") && (
                  <Button size="icon" variant="ghost" onClick={() => openDialog(r)}>
                    <Pencil className="size-4" />
                  </Button>
                )}
                {can("supervisor_students", "delete") && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => setPendingDelete(r)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </div>,
            ])}
          />
        ) : (
          <EmptyState
            icon="Users"
            text={bi("لا طلاب مسجّلين هون بعد.", "No students logged here yet.")}
          />
        )}
      </Panel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل طالب", "Edit student") : bi("إضافة طالب", "Add student")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="sr-name">{bi("اسم الطالب", "Student name")}</Label>
              <Input
                id="sr-name"
                value={form.studentName}
                onChange={(e) => setForm((f) => ({ ...f, studentName: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sr-grade">{bi("الصف", "Grade")}</Label>
              <Input
                id="sr-grade"
                value={form.gradeLabel}
                onChange={(e) => setForm((f) => ({ ...f, gradeLabel: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sr-subject">{bi("أضعف مادة", "Weakest subject")}</Label>
              <Input
                id="sr-subject"
                value={form.weakestSubject}
                onChange={(e) => setForm((f) => ({ ...f, weakestSubject: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sr-percent">{bi("النسبة (%)", "Score (%)")}</Label>
              <Input
                id="sr-percent"
                type="number"
                min={0}
                max={100}
                value={form.weakestPercent}
                onChange={(e) => setForm((f) => ({ ...f, weakestPercent: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>{bi("الحالة", "Status")}</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as StudentRiskStatus }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="متعثّر">{bi("متعثّر", "At risk")}</SelectItem>
                  <SelectItem value="مراقبة">{bi("مراقبة", "Watch")}</SelectItem>
                  <SelectItem value="منتظم">{bi("منتظم", "Consistent")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.studentName.trim()}
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
              {bi(
                `حذف «${pendingDelete?.studentName}»؟`,
                `Delete "${pendingDelete?.studentName}"?`,
              )}
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
    </AppPage>
  );
}
