---
name: typescript-lsp
description: Use TypeScript's own compiler/language-service tools (tsc --noEmit, ts-morph-style symbol lookups, "go to definition"-equivalent greps) instead of guessing types, imports, or call sites in this TanStack Start + React + TypeScript codebase. Trigger before renaming or removing an exported symbol, before trusting an inferred type, when import paths or generics feel uncertain, or whenever the user asks to check types, find usages, or trace a type through the app.
---

# TypeScript Language Intelligence

If `tsc` or a real usage search would answer a question about a type or a symbol, ask it — don't
infer a type from a variable name, and don't rename an exported symbol without finding every caller
first.

## 📌 Non-Negotiable Hard Rules

1. **Never guess a type you can check.** If `tsc` or the editor's hover would answer it, run it —
   don't infer a prop or return type from the variable name alone.
2. **Never rename or delete an exported symbol without finding every reference first.** A partial rename
   is a build break waiting to happen; this project's `validate` script (`typecheck` + `lint` +
   `format:check` + `test`) will catch it late and expensively otherwise.
3. **Trust `tsc --noEmit` over "it looks right."** If the compiler disagrees with your read of the code,
   the compiler is right until proven otherwise.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Whole-project type check

```bash
npm run typecheck   # tsc --noEmit, uses this repo's tsconfig.json
```

Run this before and after any non-trivial change touching shared types, hooks, or `src/lib/*`.

### 2️⃣ Step 2 — Find every usage before touching a symbol

Before renaming, changing the signature of, or deleting an exported function/type/component:

```bash
grep -rn "SymbolName" src/ --include="*.ts" --include="*.tsx"
```

Then open each hit and confirm it's a real usage, not a comment or unrelated shadowing name. For deep
call graphs (a hook used across many routes), also check `src/routeTree.gen.ts` — it's generated, so
never hand-edit it, but it's the fastest way to see which routes pull in a given loader/component.

### 3️⃣ Step 3 — Resolve import and generic ambiguity

When an import path, a generic constraint, or an inferred return type is unclear:

- Read the actual `.d.ts`/source of the imported symbol rather than assuming from the package name.
- For TanStack Query/Router generics specifically, trace the type through the hook's return, not the
  call site — the call site's inference can be misleadingly narrow or wide.
- If a type only resolves correctly with an explicit annotation, add it and leave a short comment on
  why (future readers, and future agents, shouldn't have to re-derive it).

### 4️⃣ Step 4 — Verify before declaring done

Re-run `npm run typecheck`. A change isn't finished if `tsc --noEmit` isn't clean — hand off any
remaining type errors explicitly rather than describing the task as complete.

## 📥 Deliverable Format

1. **Symbols touched:** exported names changed/removed, and the usage count found for each.
2. **Typecheck result:** pass/fail, with the exact `tsc` output for any remaining error.
3. **Notes:** any type annotation added purely for clarity, and why.
