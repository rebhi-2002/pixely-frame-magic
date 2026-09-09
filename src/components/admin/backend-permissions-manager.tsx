import { useEffect, useMemo, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BACKEND_USER_TYPES,
  listGrantedPageIds,
  saveGrantedPageIds,
} from "@/integrations/backend/admin-permissions";
import { listBackendPages } from "@/integrations/backend/admin-pages";
import { getErrorMessage } from "@/integrations/backend/client";
import { useBi } from "@/lib/bi";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";

export function BackendPermissionsPage() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const [userTypeId, setUserTypeId] = useState<number>(BACKEND_USER_TYPES[0].id);
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const {
    data: pages,
    isLoading: pagesLoading,
    isError: pagesError,
  } = useQuery({ queryKey: ["backend-pages"], queryFn: listBackendPages });

  const {
    data: granted,
    isLoading: grantedLoading,
    isError: grantedError,
  } = useQuery({
    queryKey: ["backend-permissions", userTypeId],
    queryFn: () => listGrantedPageIds(userTypeId),
  });

  // كل ما نبدّل نوع المستخدم، نعيد ضبط الاختيارات على القيم المحفوظة فعليًا
  // له بالباك اند — بدون هيك ممكن نضل شايفين اختيارات النوع السابق بالغلط.
  useEffect(() => {
    setChecked(new Set(granted ?? []));
  }, [granted]);

  const grouped = useMemo(() => {
    const groups = new Map<string, typeof pages>();
    for (const p of pages ?? []) {
      const key = p.module_name ?? bi("بدون وحدة", "No module");
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(p);
    }
    return groups;
  }, [pages, bi]);

  const saveMutation = useMutation({
    mutationFn: () => saveGrantedPageIds(userTypeId, Array.from(checked)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["backend-permissions", userTypeId] });
      toast.success(bi("تم حفظ الصلاحيات", "Permissions saved"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
  });

  function toggle(pageId: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(pageId)) next.delete(pageId);
      else next.add(pageId);
      return next;
    });
  }

  const isLoading = pagesLoading || grantedLoading;
  const isError = pagesError || grantedError;

  return (
    <div className="pb-24">
      <PageHeader
        icon="ShieldCheck"
        title={bi("صلاحيات أنواع المستخدمين (الباك اند)", "User type permissions (backend)")}
      />

      <div className="px-4 py-5 md:px-6">
        <p className="mb-4 text-sm text-muted-foreground">
          {bi(
            "الباك اند حاليًا فيه نوعين مستخدم ثابتين فقط (بدون إمكانية إضافة نوع جديد). حدد أي صفحات يقدر هذا النوع يوصلها.",
            "The backend currently has only two fixed user types (no way to add more). Choose which pages this type can access.",
          )}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {BACKEND_USER_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setUserTypeId(t.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                userTypeId === t.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50"
              }`}
            >
              {bi(t.name, t.name_en)}
            </button>
          ))}
        </div>

        {isLoading ? (
          <LoadingState
            label={bi("عم نحمّل الصفحات والصلاحيات…", "Loading pages and permissions…")}
          />
        ) : isError ? (
          <ErrorState
            title={bi("تعذّر تحميل البيانات", "Couldn't load data")}
            action={
              <RetryButton
                label={bi("إعادة المحاولة", "Try again")}
                onClick={() => {
                  void queryClient.invalidateQueries({ queryKey: ["backend-pages"] });
                  void queryClient.invalidateQueries({
                    queryKey: ["backend-permissions", userTypeId],
                  });
                }}
              />
            }
          />
        ) : (
          <div className="space-y-4">
            {Array.from(grouped.entries()).map(([moduleName, list]) => (
              <div key={moduleName} className="rounded-2xl border border-border bg-card p-4">
                <p className="mb-3 font-display text-sm font-bold text-foreground">{moduleName}</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {(list ?? []).map((p) => (
                    <label
                      key={p.id}
                      className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-muted/50"
                    >
                      <Checkbox checked={checked.has(p.id)} onCheckedChange={() => toggle(p.id)} />
                      <span className="text-foreground">{p.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            {!grouped.size && (
              <p className="p-8 text-center text-muted-foreground">
                {bi("لا توجد صفحات بعد.", "No pages yet.")}
              </p>
            )}
          </div>
        )}

        <div className="mt-6">
          <Button onClick={() => saveMutation.mutate()} loading={saveMutation.isPending}>
            <Save className="size-4" />
            {bi("حفظ الصلاحيات", "Save permissions")}
          </Button>
        </div>
      </div>
    </div>
  );
}
