---
name: coderabbit
description: Run CodeRabbit (external, free code-review tool) as an independent second opinion on a diff — context-aware for vulnerabilities, logic errors, and edge cases — after writing or modifying code, before committing, and alongside (not instead of) this repo's own code-review/check-security/review-task skills. Use when the user says "run coderabbit", "get a second review", or wants an outside validator before opening a PR.
---

# CodeRabbit Second Opinion

`code-review` and `review-task` both run on models briefed on this project's own conventions.
CodeRabbit is useful precisely because it isn't — an outside check, for the same reason `review-task`'s
debate pass uses a second model to avoid one model's blind spots.

## 📌 Non-Negotiable Hard Rules

1. **Complement, never replace, the repo's own gates.** CodeRabbit's findings feed into the same
   P0/P1/P2 triage as `check-security`/`code-review`/`review-task` — they don't skip it, and a clean
   CodeRabbit run doesn't mean `check-security` can be skipped.
2. **Verify before fixing.** Like `review-task`'s debate step, don't apply a suggested fix blind — confirm
   it's a real issue in this codebase's context before changing code on its say-so.
3. **Never send secrets or `.env` contents to any external tool.** Confirm the CLI is scoped to the diff
   or a temp export, not the actual `.env`/`.env.production` files.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Confirm availability

CodeRabbit CLI is a separate install (`coderabbit` on PATH) authenticated the same way a person would
authenticate it themselves. If it isn't installed or authenticated, say so plainly and fall back to
`code-review` — don't fabricate a CodeRabbit result.

### 2️⃣ Step 2 — Run it against the diff

```bash
coderabbit review --plain   # or the current CLI's equivalent diff-review flag
```

Scope it to the working diff, not the whole repository, unless a full sweep was explicitly requested.

### 3️⃣ Step 3 — Triage findings into this repo's severity scale

Map CodeRabbit's own labels onto the shared P0/P1/P2 vocabulary used across this project's skills so a
developer reading the report doesn't have to learn a second severity system:

- Security/vulnerability findings → P0.
- Logic errors and likely-wrong edge case handling → P1.
- Style/minor suggestions → P2.

### 4️⃣ Step 4 — Reconcile with in-house review

Cross-check CodeRabbit's findings against what `code-review`/`check-security` already flagged:
- **Both flagged it:** high-confidence, fix first.
- **Only CodeRabbit flagged it:** investigate before dismissing — this is the whole point of a second
  opinion.
- **Only the in-house pass flagged it:** keep it; CodeRabbit not flagging something isn't clearance.

## 📥 Deliverable Format

1. **Run status:** executed / unavailable (with reason).
2. **Findings table:** P0/P1/P2, source (CodeRabbit-only, in-house-only, or both).
3. **Reconciled verdict:** what changes before this diff moves to `review-task`.
