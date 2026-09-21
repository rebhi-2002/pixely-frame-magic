import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Check, Pencil, Plus, Trash2 } from "lucide-react";
import { AppPage, StatGrid, Panel, DataTable, Badge, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  deleteGradingItem,
  listGradingItems,
  saveGradingItem,
} from "@/lib/teacher-followup.functions";
import type { GradingItemRow } from "@/lib/teacher-followup-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";
import { authPageHead } from "@/lib/seo";
import { LoadingState } from "@/components/app/feedback-states";

const description = "قائمة التصحيح: الأسئلة المقالية والملفات المرفوعة، مع ملاحظات لكل طالب.";

export const Route = createFileRoute("/_authenticated/teacher/grading")({
  head: () =>
    authPageHead(
      {
        title: "التصحيح | أكاديميا",
        description: "قائمة التصحيح: الأسئلة المقالية والملفات المرفوعة، مع ملاحظات لكل طالب.",
      },
      {
        title: "Grading | Academia",
        description:
          "Your grading queue: essay questions and uploaded files, with notes for each student.",
      },
    ),
  component: PageRoute,
});

function PageRoute() {
  return (
    <Guard pageKey="teacher_grading">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = {
  studentName: "",
  itemTitle: "",
  submittedLabel: "",
  status: "بانتظار" as GradingItemRow["status"],
  overdue: false,
};

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listGradingItems);
  const persist = useServerFn(saveGradingItem);
  const remove = useServerFn(deleteGradingItem);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<GradingItemRow | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["grading-items"],
    queryFn: () => fetchRows(),
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["grading-items"] });

  const list = useMemo(() => rows ?? [], [rows]);
  const stats = useMemo(
    () => ({
      pending: list.filter((r) => r.status === "بانتظار").length,
      graded: list.filter((r) => r.status === "مُصحّح").length,
      overdue: list.filter((r) => r.overdue).length,
    }),
    [list],
  );

  const saveMutation = useMutation({
    mutationFn: () => persist({ data: { ...form, id: editingId ?? undefined } }),
    onSuccess: () => {
      invalidate();
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
  });

  const gradeMutation = useMutation({
    mutationFn: (row: GradingItemRow) =>
      persist({ data: { ...row, status: "مُصحّح", overdue: false } }),
    onSuccess: () => {
      invalidate();
      toast.success(bi("تم التصحيح", "Marked as graded"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر التحديث", "Failed to update"))),
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

  function openDialog(row: GradingItemRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            studentName: row.studentName,
            itemTitle: row.itemTitle,
            submittedLabel: row.submittedLabel,
            status: row.status,
            overdue: row.overdue,
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("التصحيح", "Grading")}
      icon="PenSquare"
      subtitle={bi(
        description,
        "The grading queue: essay answers and uploaded files, with per-student feedback.",
      )}
    >
      <StatGrid
        items={[
          {
            icon: "PenSquare",
            label: bi("بانتظار التصحيح", "Pending"),
            value: String(stats.pending),
          },
          { icon: "CheckCheck", label: bi("مُصحّحة", "Graded"), value: String(stats.graded) },
          {
            icon: "Clock",
            label: bi("متوسط وقت التصحيح", "Avg. time"),
            value: bi("3.4 د", "3.4 min"),
          },
          { icon: "AlertTriangle", label: bi("متأخّرة", "Overdue"), value: String(stats.overdue) },
        ]}
      />

      <Panel
        title={bi("طابور التصحيح", "Grading queue")}
        icon="PenSquare"
        action={
          can("teacher_grading", "show_add_form") ? (
            <Button size="sm" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة عنصر", "Add item")}
            </Button>
          ) : undefined
        }
      >
        {isLoading ? (
          <LoadingState
            label={bi("جارٍ التحميل…", "Loading…")}
            className="border-none bg-transparent"
          />
        ) : list.length ? (
          <DataTable
            head={[
              bi("الطالب", "Student"),
              bi("العمل", "Item"),
              bi("أُرسل", "Submitted"),
              bi("الحالة", "Status"),
              bi("", ""),
            ]}
            rows={list.map((r) => [
              r.studentName,
              r.itemTitle,
              r.submittedLabel,
              <Badge
                key={r.id}
                tone={r.status === "مُصحّح" ? "success" : r.overdue ? "danger" : "primary"}
              >
                {bi(r.status, r.status === "مُصحّح" ? "Graded" : "Pending")}
              </Badge>,
              <div key={`${r.id}-actions`} className="flex items-center justify-end gap-1">
                {can("teacher_grading", "edit") && r.status !== "مُصحّح" && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-success"
                    onClick={() => gradeMutation.mutate(r)}
                  >
                    <Check className="size-4" />
                  </Button>
                )}
                {can("teacher_grading", "edit") && (
                  <Button size="icon" variant="ghost" onClick={() => openDialog(r)}>
                    <Pencil className="size-4" />
                  </Button>
                )}
                {can("teacher_grading", "delete") && (
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
          <EmptyState icon="PenSquare" text={bi("الطابور فاضي 🎉", "Queue is empty 🎉")} />
        )}
      </Panel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل عنصر", "Edit item") : bi("إضافة عنصر", "Add item")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="gr-student">{bi("الطالب", "Student")}</Label>
              <Input
                id="gr-student"
                value={form.studentName}
                onChange={(e) => setForm((f) => ({ ...f, studentName: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gr-item">{bi("العمل", "Item")}</Label>
              <Input
                id="gr-item"
                value={form.itemTitle}
                onChange={(e) => setForm((f) => ({ ...f, itemTitle: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="gr-submitted">{bi("تاريخ الإرسال", "Submitted")}</Label>
              <Input
                id="gr-submitted"
                value={form.submittedLabel}
                onChange={(e) => setForm((f) => ({ ...f, submittedLabel: e.target.value }))}
              />
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <Switch
                id="gr-overdue"
                checked={form.overdue}
                onCheckedChange={(v) => setForm((f) => ({ ...f, overdue: v }))}
              />
              <Label htmlFor="gr-overdue">{bi("متأخّر", "Overdue")}</Label>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={
                saveMutation.isPending || !form.studentName.trim() || !form.itemTitle.trim()
              }
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
            <AlertDialogTitle>{bi("حذف هذا العنصر؟", "Delete this item?")}</AlertDialogTitle>
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
