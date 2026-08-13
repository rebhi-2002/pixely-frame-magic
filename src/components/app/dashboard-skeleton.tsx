import { Skeleton } from "@/components/ui/skeleton";

/**
 * DashboardSkeleton — هيكل تحميل يحاكي بنية AppPage (هيدر + StatGrid + Panel)
 * لمنع "قفزة" الـ layout ولإعطاء إحساس تحميل احترافي بدل شاشة فاضية أو سبينر معزول.
 */
export function DashboardSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      <header className="flex items-center gap-3 border-b border-border bg-card px-5 py-4">
        <Skeleton className="size-10 rounded-xl bg-secondary" />
        <Skeleton className="h-5 w-40 rounded-lg bg-secondary" />
      </header>

      <div className="mx-auto max-w-6xl space-y-5 px-5 py-6">
        <Skeleton className="h-4 w-72 rounded-lg bg-secondary" />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-4">
              <Skeleton className="size-9 rounded-xl bg-secondary" />
              <Skeleton className="mt-3 h-6 w-14 rounded-lg bg-secondary" />
              <Skeleton className="mt-2 h-3 w-20 rounded bg-secondary" />
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card">
          <div className="border-b border-border px-5 py-3.5">
            <Skeleton className="h-4 w-32 rounded bg-secondary" />
          </div>
          <div className="space-y-3 p-5">
            <Skeleton className="h-4 w-full rounded bg-secondary" />
            <Skeleton className="h-4 w-5/6 rounded bg-secondary" />
            <Skeleton className="h-4 w-2/3 rounded bg-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
}
