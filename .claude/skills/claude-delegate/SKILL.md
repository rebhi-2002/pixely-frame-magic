---
name: claude-delegate
description: Dispatch one bounded ticket (from to-tickets) to a separate, headless Claude Code session via the `claude` CLI, review the resulting diff yourself, and land the commit — you never let the sub-session commit. Use when implement-task or a fleet lane routes a ticket to Claude specifically, or the user says "use $claude-delegate", "خلي كلود جلسة تانية تعمل هاد الجزء".
---

# Claude Delegate

One lane in the fleet: hand a self-contained ticket to a fresh, headless `claude` session, get a clean
diff back, and keep review and commit here — never in the sub-session.

## 📌 Non-Negotiable Hard Rules

1. **The sub-session gets a self-contained brief, nothing else.** It has no access to this
   conversation's history — the ticket (from `to-tickets`) must carry every constraint it needs
   (files, types, security/truth-rule constraints, test assertions).
2. **The sub-session never commits.** Dispatch under `acceptEdits`/plan-appropriate permission mode with
   commit tools withheld or ignored; committing is this session's job, after review, via
   `commit-commands`.
3. **Always review the actual diff before landing it** — run `code-review` and `check-security` on the
   sub-session's output exactly as you would on your own.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Write the brief

Take one ticket from `to-tickets`'s output as-is — it's already self-contained by construction. If
dispatching ad hoc without a formal ticket, write an equivalent brief: exact files, dependencies, test
assertions, constraints.

### 2️⃣ Step 2 — Dispatch headlessly

```bash
claude -p "$(cat brief.md)" --permission-mode acceptEdits
# or, for a read-only exploration first:
claude -p "$(cat brief.md)" --permission-mode plan
```

Capture stdout/the session's final report; note the session id if resuming later matters.

### 3️⃣ Step 3 — Review the diff yourself

```bash
git diff --stat   # confirm touched files match the brief's file list, nothing extra
```

Run `code-review` then `check-security` against this diff exactly as for locally-written code — a diff
from a delegated session gets no less scrutiny.

### 4️⃣ Step 4 — Land or send back

If clean: hand to `commit-commands`. If it needs another pass, write a short delta brief (what's wrong,
what to change) and resume:

```bash
claude -p "$(cat delta-brief.md)" --resume-last --permission-mode acceptEdits
```

## 📥 Deliverable Format

1. **Brief dispatched** (path or inline).
2. **Diff summary:** files touched, matched against the brief's file list.
3. **Review result:** `code-review`/`check-security` verdict on the delegated diff.
4. **Outcome:** landed via `commit-commands`, or sent back with a delta brief.
