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
  deleteScheduleEvent,
  listScheduleEvents,
  saveScheduleEvent,
} from "@/lib/student-social.functions";
import type { ScheduleEventRow, ScheduleEventType } from "@/lib/student-social-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";

const title = "الجدول | أكاديميا";
const description = "جدول دراسي بمكان واحد: حصص، واجبات، امتحانات، وجلسات مراجعة.";

export const Route = createFileRoute("/_authenticated/schedule")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PageRoute,
});

function PageRoute() {
  return (
    <Guard pageKey="student_schedule">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = {
  dayAr: "",
  dayEn: "",
  activityTitle: "",
  timeLabel: "",
  type: "حصة" as ScheduleEventType,
  hoursPlanned: "1",
  reminderOn: true,
  overdue: false,
};

const TYPE_TONE: Record<ScheduleEventType, "primary" | "danger" | "muted" | "success"> = {
  حصة: "success",
  مراجعة: "primary",
  امتحان: "danger",
  واجب: "muted",
};

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listScheduleEvents);
  const persist = useServerFn(saveScheduleEvent);
  const remove = useServerFn(deleteScheduleEvent);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<ScheduleEventRow | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["schedule-events"],
    queryFn: () => fetchRows(),
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["schedule-events"] });

  const list = rows ?? [];
  const stats = useMemo(
    () => ({
      count: list.length,
      reminders: list.filter((r) => r.reminderOn).length,
      overdue: list.filter((r) => r.overdue).length,
      hours: list.reduce((s, r) => s + r.hoursPlanned, 0),
    }),
    [list],
  );

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: {
          ...form,
          id: editingId ?? undefined,
          hoursPlanned: Number(form.hoursPlanned) || 0,
          dayEn: form.dayEn || form.dayAr,
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

  function openDialog(row: ScheduleEventRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            dayAr: row.dayAr,
            dayEn: row.dayEn,
            activityTitle: row.activityTitle,
            timeLabel: row.timeLabel,
            type: row.type,
            hoursPlanned: String(row.hoursPlanned),
            reminderOn: row.reminderOn,
            overdue: row.overdue,
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("الجدول", "Schedule")}
      icon="CalendarDays"
      subtitle={bi(
        description,
        "A schedule that reminds you: classes, homework, exams and review sessions.",
      )}
    >
      <StatGrid
        items={[
          {
            icon: "CalendarDays",
            label: bi("أحداث هذا الأسبوع", "This week"),
            value: String(stats.count),
          },
          {
            icon: "BellRing",
            label: bi("معلَّمة كمهمة", "Marked important"),
            value: String(stats.reminders),
          },
          { icon: "ListChecks", label: bi("مهام متأخرة", "Overdue"), value: String(stats.overdue) },
          { icon: "Timer", label: bi("ساعات مخطّطة", "Planned hours"), value: String(stats.hours) },
        ]}
      />

      <Panel
        title={bi("أسبوعك", "Your week")}
        icon="CalendarDays"
        action={
          can("student_schedule", "show_add_form") ? (
            <Button size="sm" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة حدث", "Add event")}
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
              bi("اليوم", "Day"),
              bi("النشاط", "Activity"),
              bi("الوقت", "Time"),
              bi("النوع", "Type"),
              bi("", ""),
            ]}
            rows={list.map((r) => [
              bi(r.dayAr, r.dayEn),
              r.activityTitle,
              r.timeLabel,
              <Badge key={r.id} tone={TYPE_TONE[r.type]}>
                {bi(
                  r.type,
                  r.type === "حصة"
                    ? "Class"
                    : r.type === "مراجعة"
                      ? "Review"
                      : r.type === "امتحان"
                        ? "Exam"
                        : "Homework",
                )}
              </Badge>,
              <div key={`${r.id}-actions`} className="flex items-center justify-end gap-1">
                {can("student_schedule", "edit") && (
                  <Button size="icon" variant="ghost" onClick={() => openDialog(r)}>
                    <Pencil className="size-4" />
                  </Button>
                )}
                {can("student_schedule", "delete") && (
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
            icon="CalendarDays"
            text={bi("لا أحداث هذا الأسبوع بعد.", "No events this week yet.")}
          />
        )}
      </Panel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل حدث", "Edit event") : bi("إضافة حدث", "Add event")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="sch-title">{bi("النشاط", "Activity")}</Label>
              <Input
                id="sch-title"
                value={form.activityTitle}
                onChange={(e) => setForm((f) => ({ ...f, activityTitle: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sch-day">{bi("اليوم", "Day")}</Label>
              <Input
                id="sch-day"
                value={form.dayAr}
                onChange={(e) => setForm((f) => ({ ...f, dayAr: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sch-time">{bi("الوقت", "Time")}</Label>
              <Input
                id="sch-time"
                value={form.timeLabel}
                onChange={(e) => setForm((f) => ({ ...f, timeLabel: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{bi("النوع", "Type")}</Label>
              <Select
                value={form.type}
                onValueChange={(v) => setForm((f) => ({ ...f, type: v as ScheduleEventType }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="حصة">{bi("حصة", "Class")}</SelectItem>
                  <SelectItem value="مراجعة">{bi("مراجعة", "Review")}</SelectItem>
                  <SelectItem value="امتحان">{bi("امتحان", "Exam")}</SelectItem>
                  <SelectItem value="واجب">{bi("واجب", "Homework")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sch-hours">{bi("ساعات مخطّطة", "Planned hours")}</Label>
              <Input
                id="sch-hours"
                type="number"
                min={0}
                step="0.5"
                value={form.hoursPlanned}
                onChange={(e) => setForm((f) => ({ ...f, hoursPlanned: e.target.value }))}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="sch-reminder"
                checked={form.reminderOn}
                onCheckedChange={(v) => setForm((f) => ({ ...f, reminderOn: v }))}
              />
              <Label htmlFor="sch-reminder">
                {bi(
                  "علّمها كمهمة (بدون إشعار فعلي حاليًا)",
                  "Mark as important (no live alert yet)",
                )}
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="sch-overdue"
                checked={form.overdue}
                onCheckedChange={(v) => setForm((f) => ({ ...f, overdue: v }))}
              />
              <Label htmlFor="sch-overdue">{bi("متأخر", "Overdue")}</Label>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.activityTitle.trim() || !form.dayAr.trim()}
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
                `حذف «${pendingDelete?.activityTitle}»؟`,
                `Delete "${pendingDelete?.activityTitle}"?`,
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
