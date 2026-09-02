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
  deleteContentItem,
  listContentItems,
  saveContentItem,
} from "@/lib/teacher-teaching.functions";
import type { ContentItemRow, ContentStatus } from "@/lib/teacher-teaching-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";

const title = "المحتوى | أكاديميا";
const description = "دروسك وملفاتك: ارفع، رتّب على شجرة المنهاج، وأرسل للمراجعة قبل النشر.";

export const Route = createFileRoute("/_authenticated/teacher/content")({
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
    <Guard pageKey="teacher_content">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = {
  title: "",
  subjectName: "",
  status: "مسوّدة" as ContentStatus,
  viewsCount: "0",
};
const STATUS_TONE: Record<ContentStatus, "success" | "muted" | "primary"> = {
  منشور: "success",
  "قيد المراجعة": "muted",
  مسوّدة: "primary",
};

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listContentItems);
  const persist = useServerFn(saveContentItem);
  const remove = useServerFn(deleteContentItem);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<ContentItemRow | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["teacher-content"],
    queryFn: () => fetchRows(),
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["teacher-content"] });

  const list = rows ?? [];
  const stats = useMemo(
    () => ({
      published: list.filter((r) => r.status === "منشور").length,
      inReview: list.filter((r) => r.status === "قيد المراجعة").length,
      drafts: list.filter((r) => r.status === "مسوّدة").length,
      views: list.reduce((s, r) => s + r.viewsCount, 0),
    }),
    [list],
  );

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: { ...form, id: editingId ?? undefined, viewsCount: Number(form.viewsCount) || 0 },
      }),
    onSuccess: () => {
      invalidate();
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : bi("تعذّر الحفظ", "Failed to save")),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      invalidate();
      setPendingDelete(null);
      toast.success(bi("تم الحذف", "Deleted successfully"));
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : bi("تعذّر الحذف", "Failed to delete")),
  });

  function openDialog(row: ContentItemRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            title: row.title,
            subjectName: row.subjectName,
            status: row.status,
            viewsCount: String(row.viewsCount),
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("المحتوى", "Content")}
      icon="FileStack"
      subtitle={bi(
        description,
        "Your lessons and files: upload, place on the curriculum tree, submit for review.",
      )}
    >
      <StatGrid
        items={[
          {
            icon: "FileStack",
            label: bi("دروس منشورة", "Published"),
            value: String(stats.published),
          },
          { icon: "Clock", label: bi("قيد المراجعة", "In review"), value: String(stats.inReview) },
          { icon: "FileEdit", label: bi("مسوّدات", "Drafts"), value: String(stats.drafts) },
          {
            icon: "Eye",
            label: bi("مشاهدات الشهر", "Views this month"),
            value: String(stats.views),
          },
        ]}
      />

      <Panel
        title={bi("أحدث المحتوى", "Recent content")}
        icon="FileStack"
        action={
          can("teacher_content", "show_add_form") ? (
            <Button size="sm" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة محتوى", "Add content")}
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
              bi("العنوان", "Title"),
              bi("المادة", "Subject"),
              bi("الحالة", "Status"),
              bi("مشاهدات", "Views"),
              bi("", ""),
            ]}
            rows={list.map((r) => [
              r.title,
              r.subjectName,
              <Badge key={r.id} tone={STATUS_TONE[r.status]}>
                {bi(
                  r.status,
                  r.status === "منشور"
                    ? "Published"
                    : r.status === "قيد المراجعة"
                      ? "In review"
                      : "Draft",
                )}
              </Badge>,
              r.viewsCount > 0 ? String(r.viewsCount) : "—",
              <div key={`${r.id}-actions`} className="flex items-center justify-end gap-1">
                {can("teacher_content", "edit") && (
                  <Button size="icon" variant="ghost" onClick={() => openDialog(r)}>
                    <Pencil className="size-4" />
                  </Button>
                )}
                {can("teacher_content", "delete") && (
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
          <EmptyState icon="FileStack" text={bi("لا محتوى بعد.", "No content yet.")} />
        )}
      </Panel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId ? bi("تعديل محتوى", "Edit content") : bi("إضافة محتوى", "Add content")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="ci-title">{bi("العنوان", "Title")}</Label>
              <Input
                id="ci-title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ci-subject">{bi("المادة", "Subject")}</Label>
              <Input
                id="ci-subject"
                value={form.subjectName}
                onChange={(e) => setForm((f) => ({ ...f, subjectName: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{bi("الحالة", "Status")}</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as ContentStatus }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="مسوّدة">{bi("مسوّدة", "Draft")}</SelectItem>
                  <SelectItem value="قيد المراجعة">{bi("قيد المراجعة", "In review")}</SelectItem>
                  <SelectItem value="منشور">{bi("منشور", "Published")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="ci-views">{bi("عدد المشاهدات", "Views count")}</Label>
              <Input
                id="ci-views"
                type="number"
                min={0}
                value={form.viewsCount}
                onChange={(e) => setForm((f) => ({ ...f, viewsCount: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.title.trim()}
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
              {bi(`حذف «${pendingDelete?.title}»؟`, `Delete "${pendingDelete?.title}"?`)}
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
