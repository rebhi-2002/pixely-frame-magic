---
name: check-security
description: Standing security-review checklist for the Academia frontend (pixely-frame-magic). Run this before considering any new feature, route, form, server function, or dependency change "done" — after implement-task, before code-review/review-task, and always before finalize-task. Also use whenever the user says "check security", "security review", "فحص أمان", or "راجع الحماية". Encodes fixed checks for input handling, auth/authorization, secrets, XSS/CSRF, and dependency risk so the agent never re-derives them from scratch.
---

# Check Security

The idea that started this whole set: instead of retyping "now check it's secure" after every
feature, run this. It exists to make security review not depend on anyone remembering to ask for it —
treat any unresolved item below as blocking, the same way `review-task`'s P0 findings are blocking.

## 📌 When to run this

- Immediately after `implement-task` finishes a feature, before it is considered done.
- Before `code-review` / `review-task` look at the diff — fix what you can find yourself first.
- Before `finalize-task` runs release gates.
- Any time the user asks to "check security" / "فحص الأمان" / "راجع الحماية" on a diff, a file, or the whole app.
- Whenever a change touches: forms, route loaders/actions, server functions (`src/lib/*.functions.ts`),
  auth/session code, `localStorage`/`sessionStorage`, `dangerouslySetInnerHTML`, file uploads, redirects,
  or third-party scripts.

## 📌 Non-Negotiable Hard Rules

1. **The backend is the only real security boundary.** Per `SECURITY.md` and
   `docs/security/frontend-route-protection.md`, client-side route guards are UX only. Never describe a
   frontend check (a hook, a redirect, a hidden nav item) as "secured" — it must be paired with real
   server-side authorization (`[Authorize]`, permission checks) or the finding is P0.
2. **No secrets in client code.** `VITE_*` env vars ship to the browser bundle by design — flag any
   `VITE_*` variable, hardcoded key, token, or connection string that looks like it should stay server-side.
   Check `.env`, `.env.production`, `.env.example` are consistent and that `.env` is gitignored.
3. **No fake trust signals.** `academia_demo_user` or any `localStorage`/`sessionStorage` value must never
   be treated as proof of identity or permission — this is an explicit project rule, not a general OWASP one.
4. **Zero Hardcoded Secrets, Zero Raw HTML Injection.** Ban `dangerouslySetInnerHTML` unless the input is
   passed through a sanitizer (DOMPurify or equivalent) directly at the point of use.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Scope the pass

Diff-only by default (`git diff` against the base branch). If asked for a full sweep, walk
`src/routes`, `src/lib/*.functions.ts`, `src/hooks`, and `src/integrations`.

### 2️⃣ Step 2 — Run the fixed checklist against the scope

**Input handling**
- Every server function and form validates input with Zod (or equivalent) before use — not just on the
  client.
- No `dangerouslySetInnerHTML`, `eval`, `new Function`, or template-built HTML without sanitization.
- File/URL inputs are validated for type and size before use; no unchecked `window.open`/redirect with
  a user-controlled URL (open-redirect risk).

**Authentication & authorization**
- Every new route or action that should require a session actually checks one server-side, not just via
  a client-side `<ProtectedRoute>` wrapper.
- Role/permission checks match `docs/architecture/auth-and-route-protection.md`; no client-only
  role gating.
- No session/JWT/PII stored in plain `localStorage`; cookies (if used) are `HttpOnly, Secure,
  SameSite=Strict` server-side.

**Secrets & configuration**
- No API keys, tokens, or connection strings committed anywhere, including `Shared/` and docs.
- Every new `VITE_*` variable is genuinely public; anything sensitive goes through a server function
  instead.
- `.env.example` stays in sync with real env vars, with placeholder values only.

**XSS / CSRF / injection**
- Third-party scripts and iframes are from trusted, pinned sources only.
- Outbound requests that mutate state use the project's existing CSRF/session pattern rather than a bare
  fetch with credentials.
- User-supplied strings rendered as text, never concatenated into HTML or SQL-like query strings.

**Data exposure (project-specific truth rule)**
- Per `academia-conventions`: no page renders another real user's data (counts, names, ratings) that
  the current backend doesn't actually provide — that's a trust/security issue here, not just a content one.

**Dependencies**
- New dependencies are checked against `npm audit` (`npm run audit`); flag any high/critical advisory.
- No new dependency duplicates functionality already in the project (extra attack surface for no reason).

### 3️⃣ Step 3 — Score and report

Use the same severity vocabulary as `review-task` so findings compose cleanly:

- **P0 (blocking):** real exploitable gap — missing server-side auth, leaked secret, unsanitized HTML,
  fake trust signal treated as real.
- **P1 (blocking):** missing validation, weak session handling, dependency with a known high/critical CVE.
- **P2 (non-blocking):** hardening opportunities (rate limiting, stricter CSP, defense in depth).

### 4️⃣ Step 4 — Fix or hand off

If invoked standalone, fix P0/P1 findings directly and re-run the checklist. If invoked as a gate before
`review-task`, leave findings as a report for the reviewer instead of silently patching — don't hide
what would have been a review finding.

## 📥 Deliverable Format

1. **Checklist Result Table:** each checklist section above with ✅ / ⚠️ / ❌.
2. **Findings:** P0/P1/P2 list, each with file:line and the concrete trigger (not just "looks risky").
3. **Verdict:** `Clear` or `Blocked` — and if blocked, exactly what must change before proceeding.
