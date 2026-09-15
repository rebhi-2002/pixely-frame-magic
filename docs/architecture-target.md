# 🏛️ Frontend System Architecture Specification (`docs/architecture.md`)

This document serves as the absolute architectural blueprint for the project. The AI Assistant and developers MUST strictly adhere to the layers, boundaries, and standards defined herein.

> ⚠️ **ملاحظة صدق (6 سبتمبر 2026):** هذا هيكل مستهدف (Clean Architecture كاملة بطبقات Domain/UseCase/Presenter)، **مش بنية مشروعنا الفعلية حاليًا**. البنية الحقيقية أبسط ومباشرة: `src/routes` → `src/components` → `src/hooks` → `src/lib/*.functions.ts` (راجع `docs/architecture/frontend.md` للوصف الدقيق للواقع). اعتبر هذا الملف مرجع اتجاه لو قرر الفريق التبني لاحقًا، مش وصف لما هو موجود.

---

## 1. Directory Structure & Layer Mapping

The codebase is organized following **Clean Architecture** principles adapted for modern reactive frontends (React / Next.js / Vite). This structure enforces a strict unidirectional dependency flow: 
`Presentation -> Controller/Presenter -> Domain/Use Case -> Data/Infrastructure`.

```
src/
├── api/                  # HTTP Clients, API definitions, and Fetchers [Data/Infra]
├── components/           # UI Elements & Layouts [Presentation]
│   ├── ui/               # Pure, dumb, reusable primitive elements (e.g., Shadcn, Radix)
│   └── templates/        # Page layout wrappers and visual structures
├── domain/               # Domain Models, Zod Validation Schemas, Business Logic [Domain]
├── hooks/                # Component Controllers, Event Handlers, UI State [Controller]
├── pages/                # Route entry points, orchestrating views and hooks [Presentation]
├── providers/            # Context Providers (Theme, QueryClient, Auth) [Infra]
├── utils/                # Pure helper functions, formatters [Domain/Infra]
└── main.tsx              # Application bootstrapper
```

---

## 2. Core Architectural Layers

### 🛡️ A. Domain Layer (`src/domain/`)
* **Responsibility:** Contains the pure, framework-agnostic "business truth" of the application.
* **Content:** Entity interfaces, TypeScript types, math/logic utilities, and Zod validation schemas.
* **Strict Rule:** This layer MUST NOT import anything from React, TanStack Query, or UI libraries. It consists of pure TypeScript/JavaScript.

```typescript
// Example: src/domain/student.ts
import { z } from 'zod';

export const StudentSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  progressPercentage: z.number().min(0).max(100),
  joinedAt: z.string().datetime(),
});

export type Student = z.infer<typeof StudentSchema>;
```

### 🔌 B. Data & Infrastructure Layer (`src/api/`)
* **Responsibility:** Handles all data persistence, external communication, and browser API integrations.
* **Content:** Axios/Fetch clients, local storage managers, and trace propagation configs.
* **Strict Rule:** This layer implements OpenTelemetry/Distributed Tracing rules. Every outward HTTP request MUST carry trace correlation context headers (`traceparent`) to connect client actions with database queries.

```typescript
// Example: src/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inject W3C Trace Context automatically for backend correlation
apiClient.interceptors.request.use((config) => {
  const currentTraceId = window.__CURRENT_TRACE_ID__ || generateTraceId(); 
  const currentSpanId = generateSpanId();
  // Format: 00-traceId-spanId-flags (01 = sampled)
  config.headers['traceparent'] = `00-${currentTraceId}-${currentSpanId}-01`;
  return config;
});
```

### ⚙️ C. Controller / Hook Layer (`src/hooks/`)
* **Responsibility:** Orchestrates business operations and server state. Acts as the presenter/controller between data and view.
* **Content:** Custom hooks utilizing **TanStack Query** (`useQuery`, `useMutation`), managing local state transitions, and calling validation schemas.
* **Strict Rule (Query Keys):** To prevent cache fragmentation, Query Keys MUST follow a strictly typed hierarchical dictionary pattern.

```typescript
// Example: src/hooks/use-students.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { StudentSchema, type Student } from '../domain/student';

// Centralized Query Key Dictionary
export const studentKeys = {
  all: ['students'] as const,
  lists: () => [...studentKeys.all, 'list'] as const,
  detail: (id: string) => [...studentKeys.all, 'detail', id] as const,
};

export function useStudents() {
  return useQuery({
    queryKey: studentKeys.lists(),
    queryFn: async () => {
      const { data } = await apiClient.get('/students');
      return StudentSchema.array().parse(data); // Runtime validation at boundaries
    },
    staleTime: 5 * 60 * 1000, // 5 minutes default stale time
  });
}
```

### 🎨 D. Presentation Layer (`src/components/`)
* **Responsibility:** Renders data and captures user events.
* **Content:** Tailwind-styled React components, visual micro-interactions, skeleton loaders, and error boundaries.
* **Strict Rule:** UI Views MUST be "dumb" and silent. They are forbidden from directly calling `apiClient` or executing business logic. They receive state and trigger callbacks provided by controllers/custom hooks.

```tsx
// Example: src/components/views/student-list-view.tsx
import React from 'react';
import { useStudents } from '../../hooks/use-students';
import { Alert, AlertDescription } from '../ui/alert';

export const StudentListView: React.FC = () => {
  const { data: students, isLoading, error } = useStudents();

  if (isLoading) return <div className="animate-pulse space-y-4">...</div>;
  if (error) return <Alert variant="destructive"><AlertDescription>Failed to load.</AlertDescription></Alert>;

  return (
    <ul className="divide-y divide-border">
      {students?.map(student => (
        <li key={student.id} className="py-4 flex justify-between items-center text-foreground">
          <span>{student.name}</span>
          <span className="text-muted-foreground">{student.progressPercentage}%</span>
        </li>
      ))}
    </ul>
  );
};
```

---

## 3. General Architecture Guardrails
1. **Never write hardcoded magic constants** or URLs inside components. All configurations must live in `.env` and be typecast.
2. **Never import UI packages or Tailwind styles directly in Domain files.** Keep domain files pure TypeScript.
3. **Handle Errors At Boundaries:** Wrap pages in React Error Boundaries and support graceful degradation (e.g., fallback view if a secondary widget fails to fetch).
4. **Offline Resilience:** Design state caching to handle temporary connection dropouts gracefully using TanStack Query Offline configurations.
