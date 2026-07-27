import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { DynamicIcon } from "@/components/admin/dynamic-icon";
import { Switch } from "@/components/ui/switch";
import { listModules, setModuleEnabled } from "@/lib/rbac.functions";
import { ACCESS_QUERY_KEY, useAccess } from "@/hooks/use-access";

export const Route = createFileRoute("/_authenticated/system-modules")({
  head: () => ({
    meta: [
      { title: "وحدات النظام | نظام الصلاحيات" },
      {
        name: "description",
        content: "تفعيل أو تعطيل وحدات النظام على مستوى كل المستخدمين بضغطة واحدة.",
      },
      { property: "og:title", content: "وحدات النظام | نظام الصلاحيات" },
      { property: "og:description", content: "التحكم العام بتفعيل وحدات النظام." },
    ],
  }),
  component: SystemModulesPage,
});

function SystemModulesPage() {
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchModules = useServerFn(listModules);
  const toggle = useServerFn(setModuleEnabled);

  const { data, isLoading } = useQuery({
    queryKey: ["modules"],
    queryFn: () => fetchModules(),
  });

  const mutation = useMutation({
    mutationFn: (vars: { id: string; enabled: boolean }) => toggle({ data: vars }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
      queryClient.invalidateQueries({ queryKey: ACCESS_QUERY_KEY });
      toast.success("تم حفظ حالة الوحدة");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "تعذّر الحفظ"),
  });

  const editable = can("system_modules", "edit");

  return (
    <div>
      <PageHeader title="وحدات النظام" icon="ToggleRight" />

      <div className="p-5">
        <p className="mb-4 text-sm text-muted-foreground">
          كل صف يمثّل وحدة نظام كاملة. تعطيل الوحدة يُخفيها فوراً من القائمة الجانبية لكل
          المستخدمين مهما كانت صلاحياتهم الفردية.
        </p>

        <div className="overflow-hidden rounded-2xl bg-card">
          {isLoading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="size-5 animate-spin text-primary" />
            </div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="w-16 px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">الاسم</th>
                  <th className="w-32 px-4 py-3 font-semibold">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {(data ?? []).map((m, i) => (
                  <tr key={m.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2 font-semibold text-foreground">
                        <DynamicIcon name={m.icon} className="size-4 text-muted-foreground" />
                        {m.name}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Switch
                        checked={m.enabled}
                        disabled={!editable || mutation.isPending}
                        onCheckedChange={(checked) => mutation.mutate({ id: m.id, enabled: checked })}
                        aria-label={`تفعيل ${m.name}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
