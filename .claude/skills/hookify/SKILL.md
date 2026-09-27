---
name: hookify
description: Create and wire up Claude Code hooks (PreToolUse, PostToolUse, etc.) in .claude/settings.json to mechanically prevent or catch unwanted agent behavior in this repo — e.g. blocking edits to .env or routeTree.gen.ts, blocking a raw `git commit` that skips commit-commands' gate check, or auto-running typecheck after edits. Use when the user asks to "add a hook", "hookify" a rule, or wants something enforced automatically rather than relying on the agent remembering an instruction.
---

# Hookify

Some rules shouldn't depend on an agent remembering them from a SKILL.md. When one keeps getting
missed, the fix isn't a stronger sentence — it's a hook in `.claude/settings.json` that makes the
violation structurally impossible.

## 📌 Non-Negotiable Hard Rules

1. **Hooks are for mechanical, checkable conditions only** — a blocked file path, a forbidden command
   pattern, a missing gate before commit. Don't try to hookify judgment calls (design taste, "is this
   good code") — that stays with `code-review`/`review-task`.
2. **A hook must fail loud, never silently.** If a `PreToolUse` hook blocks an action, it must explain
   why in its output so the agent (and the developer) understand the block, not just see a bare failure.
3. **Never hook around a rule instead of fixing the rule.** If a skill's instruction is being routinely
   ignored, first check whether the instruction itself is unclear before reaching for a hook to force it.
4. **Show the hook config before writing it.** `.claude/settings.json` changes affect every future
   session in this repo — get explicit confirmation before writing, same bar as `commit-commands`
   confirming before an actual `git commit`.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Identify the mechanical rule

Turn the request into a concrete condition: which tool call, matching what pattern, should be blocked or
trigger an action. Examples already implied by this repo's own rules:

- Block any `Edit`/`Write` targeting `.env`, `.env.production`, or `src/routeTree.gen.ts` (generated —
  per `typescript-lsp`, never hand-edited).
- Block a `Bash` call containing `git commit` unless `commit-commands`' gate check has just run.
- After any `Edit`/`Write` under `src/`, auto-run `npm run typecheck` and surface failures immediately.

### 2️⃣ Step 2 — Write the hook

Hooks live under a `hooks` key in `.claude/settings.json` (or `.claude/settings.local.json` for a
personal, non-shared version), keyed by event (`PreToolUse`, `PostToolUse`, etc.) and a `matcher` for
the tool name. Keep the hook script itself small and dependency-free — a short shell/node script that
reads the tool-call JSON on stdin and exits non-zero (with a stderr message) to block.

### 3️⃣ Step 3 — Test it deliberately

Trigger the exact condition on purpose (e.g. attempt an edit to `routeTree.gen.ts`) and confirm the hook
blocks it with a clear message, then confirm it does _not_ block unrelated, legitimate calls
(no false positives on normal `src/` edits).

### 4️⃣ Step 4 — Document it where the rule already lives

If the hooked rule was previously stated in a skill (e.g. "never hand-edit `routeTree.gen.ts`" in
`typescript-lsp`), add a one-line note there that it's now hook-enforced, so the two don't drift apart
silently — same principle as `claude-md-management`'s overlap check.

## 📥 Deliverable Format

1. **Rule hookified:** the exact condition, in plain language.
2. **Hook config:** the `.claude/settings.json` diff, shown before writing.
3. **Test result:** blocked case confirmed, false-positive check confirmed clean.
