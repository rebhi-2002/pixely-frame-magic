# 🧪 Testing, Quality Gates, and QA Guidelines

This document outlines the testing strategy, performance budgets, and quality gates required to ensure code correctness, scalability, and backward compatibility before deployment.

> ⚠️ **ملاحظة صدق (6 سبتمبر 2026):** معيار مستهدف. **لا يوجد أي test suite حاليًا بالمشروع** (لا Unit ولا Integration ولا E2E) — أول أولوية حقيقية قبل أي بند هون هي البدء الفعلي، مو القفز لهرم اختبار كامل. راجع `docs/engineering-playbook.md` قسم 9 (Testing & Change) وقسم 12.9.

---

## 1. The Testing Pyramid Strategy
We write tests not just to prove the code works today, but to enable changes tomorrow with total confidence.

```
       ▲
      / \
     /   \      E2E Tests (Playwright) - Focus on core critical user flows (<10% of tests)
    / E2E \
   /-------\
  /  Inte-  \   Integration Tests (React Testing Library) - Hooks, Caching, and API clients (~30% of tests)
 /  gration  \
/-------------\
/    Unit     \  Unit Tests (Vitest) - Domain/Pure logic, utilities, validation schemas (~60% of tests)
/_______________\
```

---

## 2. Testing Layers Specifications

### 2.1 Unit Testing (Domain & Schemas)
* **Framework:** Vitest + TypeScript
* **Target:** Pure functions, state stores (Zustand), and Zod validation schemas.
* **Expectation:** Test edge cases, empty states, and invalid boundary values.

### 2.2 Integration Testing (Components & Hooks)
* **Framework:** React Testing Library + MSW (Mock Service Worker)
* **Target:** Custom hooks handling TanStack Query mutations, form submissions, and UI state switches.
* **Hard Rule:** Never mock the actual hook internally; mock the API responses using MSW to preserve realistic state transitions.

### 2.3 End-to-End Testing (Critical User Flows)
* **Framework:** Playwright
* **Target:** Core business flows (e.g., User Login ➔ Course Enroll ➔ Watch Lesson ➔ Complete Task).
* **Hard Rule:** Run these tests on actual production static builds (`next build` / `vite build`) to capture real-world chunking and load behavior.

---

## 3. Quality Gates (CI/CD Gates)

Before merging any Pull Request (PR) to the primary branch, the following automated checks must execute in the CI pipeline and return **Green (Success)**:

1. **Linting & Formatting:** Ensure zero ESLint errors (`npm run lint`).
2. **TypeScript Compilation:** Strict type checking with zero errors (`tsc --noEmit`).
3. **Unit & Integration Tests:** 100% of Vitest tests must pass.
4. **Production Build:** Static compilation (`npm run build`) must succeed with zero warnings.
5. **Coverage Budget:** Ensure a minimum of **80% code coverage** on domain models and utilities.

---

## 4. Deployment & Canary Strategy
* **Feature Flags:** Wrap all high-risk changes or new features in feature flags. This decouples deployment (releasing code to servers) from actual release (making it visible to users).
* **Instant Rollback:** If the error rate on Sentry increases by more than 2% post-deployment, the CI/CD pipeline must trigger an automated rollback within 60 seconds.
