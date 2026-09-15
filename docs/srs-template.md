# 📋 Software Requirements Specification (SRS) & Feature Planning Template

Use this template to frame the problem and document requirements for **every single feature** before writing code. This template ensures we think like a Product Engineer ("Basil Mode") and prevents "Engineering Waste".

---

## 1. Problem Framing (أركان صياغة المشكلة الأربعة)

### 1.1 The Problem (المشكلة)
* *Describe the core pain point we are solving. Why does this problem exist and why does it deserve a solution?*
* **Example:** "Students lose track of their progress across multiple courses, leading to high drop-out rates."

### 1.2 The User (المستخدم المستهدف)
* *Who is the user? What is their context, goals, and what value does this feature deliver to them?*
* **Example:** "A self-paced learner who balances study with a full-time job."

### 1.3 Success Criteria (معايير النجاح)
* *How will we measure success commercially (business impact) and technically (performance/reliability)?*
* **Business Metric:** "Increase 30-day course completion rates by 15%."
* **Technical Metric:** "Page load time (LCP) remains under 1.5s; Client-side crash rate under 0.1%."

### 1.4 Constraints (القيود)
* *What are the technical, financial, temporal, or visual constraints?*
* **Example:** "Must work seamlessly offline (low connectivity); must respect the centralized design tokens and load in under 200ms."

---

## 2. Technical Architecture & Clean Layers

### 2.1 Interface & Component Boundaries
* *Define the views, controllers (custom hooks), and domains involved.*
* `View Layer` ➔ `Custom Hook (Controller)` ➔ `Use Case / Domain` ➔ `API Client`

### 2.2 Data Model Schema (Access Patterns)
* *What is the structure of the data? What are the write/read access patterns?*
* **Schema Definition (Zod Validation):**
```typescript
const studentProgressSchema = zod.object({
  studentId: zod.string().uuid(),
  courseId: zod.string().uuid(),
  completedLessons: zod.array(zod.string().uuid()),
  lastAccessedAt: zod.string().datetime(),
});
```

### 2.3 Local & Server Caching Strategy
* *Where does the state live? What are the TanStack Query keys?*
* **Query Key:** `['students', studentId, 'progress', courseId]`

---

## 3. Reliability & Edge Cases (ماذا لو فشل؟)

| Scenario / Failure Mode | Expected UX Behavior | Technical Mitigation Strategy |
|-------------------------|----------------------|-------------------------------|
| API request timeout     | Show offline banner, load from local storage | Set 5000ms timeout, fall back to offline IndexedDB cache |
| Duplicate Form Submit   | Disable submit button, show loading spinner | Generate and submit `Idempotency-Key` with the request |
| Server throws 500       | Show user-friendly error with retry button | Implement exponential backoff retry (TanStack Query) |

---

## 4. Security & Compliance Checklist (OWASP-aligned)
* [ ] Inputs validated using Zod (No Raw Client HTML Allowed - prevent DOM-based XSS).
* [ ] Sensitive tokens handled via secure `HttpOnly` Cookies (No LocalStorage storage).
* [ ] Least Privilege access controls validated on the client route boundaries.
