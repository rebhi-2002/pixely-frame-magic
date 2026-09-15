# 🗃️ Data Fetching, Caching, and State Management Guidelines

This document serves as the **Single Source of Truth** for how data is fetched, cached, mutated, and synchronized across our React / Next.js applications using **TanStack Query (React Query)** and clean state management principles.

> ⚠️ **ملاحظة صدق (6 سبتمبر 2026):** هذا معيار مستهدف، مش وصف للواقع الحالي. راجعنا الكود الفعلي ولقينا فجوات حقيقية:
> - `new QueryClient()` حاليًا **بدون** أي إعداد افتراضي عام (لا staleTime ولا gcTime ولا retry على المستوى العام) — كل استعلام يضبطها لحاله لو حابب، وأغلبها ما بتضبطها إطلاقًا.
> - مفاتيح الاستعلام (Query keys) حاليًا **سلاسل مسطّحة بسيطة** (مثل `["badges"]`) مش الهيكل الهرمي (factory pattern) المذكور بالقسم 2.2 — تبنّي هالنمط يحتاج refactor حقيقي مو تبديل سطر.
> - **لا يوجد Optimistic Updates** بأي مكان حاليًا — كل الطفرات (mutations) تعتمد invalidate-on-success بسيط.
> - قسم 4 كامل (Offline-First، IndexedDB، Idempotency-Key، Distributed Tracing) **غير مطبّق إطلاقًا** ومبكر جدًا على مرحلة المشروع الحالية (باك اند لسا بمراحله الأولى) — يبقى كمرجع مستقبلي بعيد، مش أولوية.
>
> **الخلاصة:** اعتبره بوصلة اتجاه لمشروع ناضج، مو Checklist لتطبيق فوري. أي تبنّي فعلي لأي بند هون يحتاج قرار وخطة منفصلة (راجع `docs/engineering-playbook.md` قسم 12).

---

## 1. Caching & State Separation Principles
To avoid performance degradation and infinite refetching loops, we strictly separate our state into three distinct layers:

1. **Server State (Managed by TanStack Query):** All data that comes from or goes to an external API database.
2. **Global Client State (Managed by Zustand/Context):** App-wide configuration, UI states (e.g., sidebar open/close, dark mode), or active session tokens.
3. **Local UI State (Managed by `useState`):** Form inputs, transient toggle states, and interactive components.

---

## 2. TanStack Query Configurations

### 2.1 Default Query Client Configuration
Every query must default to a safe cache budget to prevent server overload:
* **`staleTime`:** Default to `5 * 60 * 1000` (5 minutes) instead of `0` to prevent redundant API hits on window focus.
* **`gcTime` (formerly `cacheTime`):** Default to `30 * 60 * 1000` (30 minutes).
* **`retry`:** Default to `3` for transient failures with exponential backoff.

### 2.2 Strict Query Key Architecture
To maintain cache consistency and facilitate automatic cache invalidation, query keys must be structured hierarchically as arrays:
```typescript
// Pattern: [domain, scope, filters/parameters]
export const studentKeys = {
  all: ['students'] as const,
  lists: () => [...studentKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...studentKeys.lists(), filters] as const,
  details: () => [...studentKeys.all, 'detail'] as const,
  detail: (id: string) => [...studentKeys.details(), id] as const,
};
```

---

## 3. Mutations and Invalidation Rules

### 3.1 Server Invalidation Pattern
Whenever a mutation (POST, PUT, DELETE) successfully modifies data on the server, the corresponding query keys **MUST** be invalidated immediately to trigger a revalidation:
```typescript
const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: updateStudentProfile,
  onSuccess: (data) => {
    // Invalidate the list and detail queries
    queryClient.invalidateQueries({ queryKey: studentKeys.all });
  },
});
```

### 3.2 Optimistic Updates Guidelines
For high-interaction UI features (like liking a post, changing status, or toggling tasks), apply **Optimistic Updates** to enhance the user experience by immediately reflecting changes locally:
1. Cancel outgoing refetches for that query.
2. Snapshot the previous query state.
3. Optimistically update the cache with the new value.
4. If the mutation fails, rollback the cache to the snapshot state in `onError`.
5. Revalidate in `onSettled` to ensure absolute synchronization with the server.

---

## 4. Offline-First & Resiliency Constraints
* **Offline Fallbacks:** Use TanStack Query's `networkMode: 'offlineFirst'` for local offline support when accessing local IndexedDB cache buffers.
* **Idempotent Mutations:** All mutations must generate and send a unique `Idempotency-Key` header to the backend to prevent duplicate transaction executions on network retry.
* **Distributed Tracing Integration:** Every fetch request must automatically inject the W3C traceparent header (`traceparent`) to link frontend clicks to backend queries.
