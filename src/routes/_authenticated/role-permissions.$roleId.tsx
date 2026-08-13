import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ChevronDown, Loader2, Save } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { DynamicIcon } from "@/components/admin/dynamic-icon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getPermissionMatrix, saveRolePermissions } from "@/lib/rbac.functions";
import { ACCESS_QUERY_KEY } from "@/hooks/use-access";
import type { PermissionMatrix, TreePage } from "@/lib/rbac-types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/role-permissions/$roleId")({
  head: () => ({
    meta: [
      { title: "صلاحيات نوع المستخدم | نظام الصلاحيات" },
      {
        name: "description",
        content: "شجرة صلاحيات من ثلاث مستويات: الوحدة ثم الصفحة ثم أدوات العرض والإضافة والتعديل.",
      },
      { property: "og:title", content: "صلاحيات نوع المستخدم" },
      { property: "og:description", content: "تحديد صلاحيات دقيقة لكل صفحة داخل النظام." },
    ],
  }),
  component: RolePermissionsPage,
});

function collectPages(pages: TreePage[]): TreePage[] {
  return pages.flatMap((p) => [p, ...collectPages(p.children)]);
}

function RolePermissionsPage() {
  const { roleId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchMatrix = useServerFn(getPermissionMatrix);
  const persist = useServerFn(saveRolePermissions);

  const [granted, setGranted] = useState<Set<string>>(new Set());
  const [openModules, setOpenModules] = useState<Set<string>>(new Set());

  const { data, isLoading } = useQuery<PermissionMatrix>({
    queryKey: ["permission-matrix", roleId],
    queryFn: () => fetchMatrix({ data: { roleId } }),
  });

  useEffect(() => {
    if (data) {
      setGranted(new Set(data.granted));
      setOpenModules(new Set(data.modules.map((m) => m.id)));
    }
  }, [data]);

  const allPages = useMemo(
    () => (data ? data.modules.flatMap((m) => collectPages(m.pages)) : []),
    [data],
  );

  const saveMutation = useMutation({
    mutationFn: () => persist({ data: { roleId, granted: Array.from(granted) } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permission-matrix", roleId] });
      queryClient.invalidateQueries({ queryKey: ACCESS_QUERY_KEY });
      toast.success("تم حفظ الصلاحيات");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "تعذّر الحفظ"),
  });

  const keys = data?.permissionKeys ?? [];

  function toggle(entry: string, on: boolean) {
    setGranted((prev) => {
      const next = new Set(prev);
      if (on) next.add(entry);
      else next.delete(entry);
      return next;
    });
  }

  function togglePage(page: TreePage, on: boolean) {
    const pages = [page, ...collectPages(page.children)];
    setGranted((prev) => {
      const next = new Set(prev);
      for (const p of pages) {
        for (const k of keys) {
          const entry = `${p.id}:${k.key}`;
          if (on) next.add(entry);
          else next.delete(entry);
        }
      }
      return next;
    });
  }

  function toggleModule(moduleId: string, on: boolean) {
    const mod = data?.modules.find((m) => m.id === moduleId);
    if (!mod) return;
    for (const p of mod.pages) togglePage(p, on);
  }

  function pageState(page: TreePage): "all" | "some" | "none" {
    const pages = [page, ...collectPages(page.children)];
    let on = 0;
    let total = 0;
    for (const p of pages)
      for (const k of keys) {
        total++;
        if (granted.has(`${p.id}:${k.key}`)) on++;
      }
    if (!on) return "none";
    return on === total ? "all" : "some";
  }

  if (isLoading || !data) {
    return (
      <div>
        <PageHeader title="الصلاحيات" icon="ShieldCheck" />
        <div className="flex justify-center p-16">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <PageHeader
        title={`صلاحيات: ${data.roleName}`}
        icon="ShieldCheck"
        onBack={() => navigate({ to: "/user-types" })}
      />

      <div className="space-y-3 p-5">
        <p className="text-sm text-muted-foreground">
          تحديد الوحدة يفعّل كل صفحاتها وأدواتها، ويمكنك بعدها إلغاء أي أداة بشكل مستقل. الحفظ لا
          يتم إلا بالضغط على زر الحفظ بالأسفل.
        </p>

        {data.modules.map((mod) => {
          const isOpen = openModules.has(mod.id);
          const modPages = mod.pages.flatMap((p) => [p, ...collectPages(p.children)]);
          const modOn = modPages.some((p) => keys.some((k) => granted.has(`${p.id}:${k.key}`)));
          const modAll =
            modPages.length > 0 &&
            modPages.every((p) => keys.every((k) => granted.has(`${p.id}:${k.key}`)));

          return (
            <div
              key={mod.id}
              className="shadow-elevation-1 overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Checkbox
                  checked={modAll ? true : modOn ? "indeterminate" : false}
                  onCheckedChange={(v) => toggleModule(mod.id, v === true)}
                  aria-label={mod.name}
                />
                <button
                  type="button"
                  className="flex flex-1 items-center gap-2 text-right"
                  onClick={() =>
                    setOpenModules((prev) => {
                      const next = new Set(prev);
                      if (next.has(mod.id)) next.delete(mod.id);
                      else next.add(mod.id);
                      return next;
                    })
                  }
                >
                  <DynamicIcon name={mod.icon} className="size-4 text-primary" />
                  <span className="text-sm font-bold text-foreground">{mod.name}</span>
                  {!mod.enabled && (
                    <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      الوحدة معطّلة بالنظام
                    </span>
                  )}
                  <ChevronDown
                    className={cn(
                      "mr-auto size-4 text-muted-foreground transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
              </div>

              {isOpen && (
                <div className="divide-y divide-border/60">
                  {mod.pages.map((page) => (
                    <PageRow
                      key={page.id}
                      page={page}
                      depth={0}
                      keys={keys}
                      granted={granted}
                      onToggleEntry={toggle}
                      onTogglePage={togglePage}
                      pageState={pageState}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 p-4 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            {granted.size} صلاحية محددة عبر {allPages.length} صفحة
          </span>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setGranted(new Set(data.granted))}>
              تراجع
            </Button>
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
              <Save className="size-4" />
              {saveMutation.isPending ? "جارٍ الحفظ..." : "حفظ الصلاحيات"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageRow({
  page,
  depth,
  keys,
  granted,
  onToggleEntry,
  onTogglePage,
  pageState,
}: {
  page: TreePage;
  depth: number;
  keys: { key: string; label: string }[];
  granted: Set<string>;
  onToggleEntry: (entry: string, on: boolean) => void;
  onTogglePage: (page: TreePage, on: boolean) => void;
  pageState: (page: TreePage) => "all" | "some" | "none";
}) {
  const state = pageState(page);
  return (
    <>
      <div className="px-4 py-3" style={{ paddingRight: 16 + depth * 24 }}>
        <div className="flex items-center gap-3">
          <Checkbox
            checked={state === "all" ? true : state === "some" ? "indeterminate" : false}
            onCheckedChange={(v) => onTogglePage(page, v === true)}
            aria-label={page.name}
          />
          <DynamicIcon name={page.icon} className="size-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">{page.name}</span>
        </div>

        <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-2 pr-8">
          {keys.map((k) => {
            const entry = `${page.id}:${k.key}`;
            return (
              <label key={k.key} className="flex cursor-pointer items-center gap-2 text-xs">
                <Checkbox
                  checked={granted.has(entry)}
                  onCheckedChange={(v) => onToggleEntry(entry, v === true)}
                />
                <span className="text-muted-foreground">{k.label}</span>
              </label>
            );
          })}
        </div>
      </div>
      {page.children.map((child) => (
        <PageRow
          key={child.id}
          page={child}
          depth={depth + 1}
          keys={keys}
          granted={granted}
          onToggleEntry={onToggleEntry}
          onTogglePage={onTogglePage}
          pageState={pageState}
        />
      ))}
    </>
  );
}
