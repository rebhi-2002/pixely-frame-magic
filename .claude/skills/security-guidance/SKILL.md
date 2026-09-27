---
name: security-guidance
description: Lightweight, always-relevant security reminders for this repo — the short version of check-security, meant to surface concerns the moment risky code is being written (a form, a server function, a localStorage call, a new env var), not just at the end-of-feature gate. Use continuously while implementing, and treat as a trigger to run the full check-security skill when something concrete turns up.
---

# Security Guidance

The reflex version of `check-security`: catch a risky pattern the moment it's written — a form, a
`localStorage` call, a new env var — instead of waiting for the end-of-feature audit to find it.

## 📌 How this differs from check-security

`check-security` is a full checklist run once a feature is otherwise done. `security-guidance` is meant
to fire *during* implementation — the moment a risky pattern appears in the code being written — and
either fix it inline or flag it for the end-of-feature pass. Don't run both as separate full audits on
the same change; use this one to reduce what the other one finds.

## 📌 Non-Negotiable Hard Rules

1. **React to the pattern, not the feature.** Trigger on sight of: a new form, a new
   `src/lib/*.functions.ts` file, `localStorage`/`sessionStorage` usage, a new `VITE_*` env var,
   `dangerouslySetInnerHTML`, a new redirect/`window.open`, or a new third-party script tag.
2. **Never wave through a pattern because "it'll get caught in check-security later."** Fix what's fixable
   immediately; the point is fewer findings downstream, not deferred findings.
3. **When genuinely unsure whether something is a real risk, escalate to `check-security` rather than
   guessing either way.**

## 🔄 Reminder Table (fire on sight)

| Pattern seen | Immediate reminder |
| --- | --- |
| New form / user input | Is it validated with Zod before use, client *and* server side? |
| New `src/lib/*.functions.ts` | Does it re-check authorization server-side, or does it trust a client-passed role/flag? |
| `localStorage`/`sessionStorage` write | Is this UX convenience only, or is something treating it as proof of identity/permission (forbidden — see `academia-conventions`)? |
| New `VITE_*` variable | Is this value safe to ship to every browser, with nothing sensitive folded in? |
| `dangerouslySetInnerHTML` | Is the input sanitized (DOMPurify or equivalent) right at this call site? |
| New redirect / `window.open` | Is the target a fixed, trusted URL, or could a user-controlled value redirect elsewhere? |
| New third-party `<script>`/embed | Is the source pinned and trusted, not a loosely-versioned CDN URL? |
| New dependency added | Has `npm run audit` been checked for it? |

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Watch while implementing

As `implement-task` (or manual edits) touch any pattern in the table above, raise the matching reminder
immediately, in place, rather than saving it for later.

### 2️⃣ Step 2 — Fix what's cheap now

Small, unambiguous fixes (add a Zod schema, swap `localStorage` role-check for a server check, sanitize
an HTML string) happen inline as part of the current diff.

### 3️⃣ Step 3 — Escalate what's not cheap or not certain

Anything that needs real investigation (auth architecture question, a dependency's actual exploitability)
gets flagged explicitly and handed to `check-security` rather than resolved on a guess.

## 📥 Deliverable Format

Inline, as it happens — a short note per triggered reminder (pattern seen → fixed inline / escalated to
check-security), not a separate end-of-task report.
