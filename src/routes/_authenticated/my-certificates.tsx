import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { AppPage, StatGrid, Panel, RowList, EmptyState } from "@/components/app/kit";
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
  deleteCertificate,
  listCertificates,
  saveCertificate,
} from "@/lib/student-evaluation.functions";
import type { CertificateRow, CertificateStatus } from "@/lib/student-evaluation-data";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";

const title = "شهاداتي | أكاديميا";
const description = "شهاداتك القابلة للتحقّق — شارك الرابط، وأي شخص يتأكد من صحّتها.";

export const Route = createFileRoute("/_authenticated/my-certificates")({
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
    <Guard pageKey="student_certificates">
      <Body />
    </Guard>
  );
}

const EMPTY_FORM = {
  courseTitle: "",
  code: "",
  status: "صادرة" as CertificateStatus,
  shareCount: "0",
};

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listCertificates);
  const persist = useServerFn(saveCertificate);
  const remove = useServerFn(deleteCertificate);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<CertificateRow | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["certificates"],
    queryFn: () => fetchRows(),
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["certificates"] });

  const list = rows ?? [];
  const stats = useMemo(() => {
    const issued = list.filter((r) => r.status === "صادرة");
    const pending = list.filter((r) => r.status === "قيد الإصدار");
    const shares = list.reduce((s, r) => s + r.shareCount, 0);
    return { issued: issued.length, pending: pending.length, shares };
  }, [list]);

  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: { ...form, id: editingId ?? undefined, shareCount: Number(form.shareCount) || 0 },
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

  function openDialog(row: CertificateRow | null) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            courseTitle: row.courseTitle,
            code: row.code,
            status: row.status,
            shareCount: String(row.shareCount),
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("شهاداتي", "My certificates")}
      icon="Award"
      subtitle={bi(
        description,
        "Your verifiable certificates — share the link and anyone can validate it.",
      )}
    >
      <StatGrid
        items={[
          { icon: "Award", label: bi("شهادات", "Certificates"), value: String(stats.issued) },
          {
            icon: "ShieldCheck",
            label: bi("قابلة للتحقّق", "Verifiable"),
            value: String(stats.issued),
          },
          { icon: "Share2", label: bi("مشاركات", "Shares"), value: String(stats.shares) },
          { icon: "Clock", label: bi("قيد الإصدار", "Pending"), value: String(stats.pending) },
        ]}
      />

      <Panel
        title={bi("شهاداتك", "Your certificates")}
        icon="Award"
        action={
          can("student_certificates", "show_add_form") ? (
            <Button size="sm" onClick={() => openDialog(null)}>
              <Plus className="size-4" />
              {bi("إضافة شهادة", "Add certificate")}
            </Button>
          ) : undefined
        }
      >
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="size-5 animate-spin text-primary" />
          </div>
        ) : list.length ? (
          <RowList
            rows={list.map((r) => ({
              title: r.courseTitle,
              meta: r.code,
              value: bi(
                r.status === "صادرة" ? "تحقّق" : "قيد الإصدار",
                r.status === "صادرة" ? "Verify" : "Pending",
              ),
              tone: r.status === "صادرة" ? ("success" as const) : ("muted" as const),
              actions: (
                <div className="flex items-center gap-1">
                  {can("student_certificates", "edit") && (
                    <Button size="icon" variant="ghost" onClick={() => openDialog(r)}>
                      <Pencil className="size-4" />
                    </Button>
                  )}
                  {can("student_certificates", "delete") && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => setPendingDelete(r)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
              ),
            }))}
          />
        ) : (
          <EmptyState
            icon="Award"
            text={bi(
              "ولا شهادة بعد — كمّل أول كورس عشان تحصلها.",
              "No certificates yet — finish a course to earn one.",
            )}
          />
        )}
      </Panel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>
              {editingId
                ? bi("تعديل شهادة", "Edit certificate")
                : bi("إضافة شهادة", "Add certificate")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="cert-title">{bi("اسم الكورس", "Course title")}</Label>
              <Input
                id="cert-title"
                value={form.courseTitle}
                onChange={(e) => setForm((f) => ({ ...f, courseTitle: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cert-code">{bi("الرمز", "Code")}</Label>
              <Input
                id="cert-code"
                value={form.code}
                onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>{bi("الحالة", "Status")}</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as CertificateStatus }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="صادرة">{bi("صادرة", "Issued")}</SelectItem>
                  <SelectItem value="قيد الإصدار">{bi("قيد الإصدار", "Pending")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="cert-shares">{bi("عدد المشاركات", "Share count")}</Label>
              <Input
                id="cert-shares"
                type="number"
                min={0}
                value={form.shareCount}
                onChange={(e) => setForm((f) => ({ ...f, shareCount: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.courseTitle.trim()}
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
                `حذف «${pendingDelete?.courseTitle}»؟`,
                `Delete "${pendingDelete?.courseTitle}"?`,
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
