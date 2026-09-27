---
name: frontend-design
description: Design-system-aware UI/UX implementation guidance for this project's React + Tailwind + shadcn/ui stack — design tokens, typography, spacing, component composition, and avoiding generic "default AI" layouts. Use whenever building or restyling a screen, component, or flow, and always before proposing colors/type/spacing for a new page. Complements (does not replace) docs/standards/design-tokens-policy.md, which is the source of truth for actual token values.
---

# Frontend Design

Ship screens that read as designed on purpose for Academia, not as whatever a template defaults to.
Tokens and reuse come from what's already in this repo (`docs/standards/design-tokens-policy.md`,
`src/components`) — see `references/design-reference.md` for the reasoning layer on top of them.

## 📌 Non-Negotiable Hard Rules

1. **Tokens over hardcoded values.** Colors, spacing, radii, and type scale come from
   `docs/standards/design-tokens-policy.md` and `src/styles.css`. A raw hex code or magic pixel value in
   a component is a finding in `code-review`, not a style choice.
2. **Reuse before creating.** Check `src/components` (and shadcn/ui primitives already wired via
   `components.json`) before building a new primitive. A new one-off button component next to three
   existing button variants is a shared-component-first violation per `academia-conventions`.
3. **Truth over polish.** Per `academia-conventions`, a beautifully designed screen that implies data or
   activity the backend doesn't provide is a defect, not a feature — design the honest empty/partial
   state, don't design it away.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Anchor in the existing system before drawing anything

Read `docs/standards/design-tokens-policy.md` and skim 2–3 existing screens in the same product area
for established patterns (card layout, spacing rhythm, empty states). Note the type scale and the
handful of accent colors actually in use — don't introduce a new one without reason. For a concrete
starting point (tone by product area, anti-patterns, type-pairing and accessibility checklist), read
[`references/design-reference.md`](./references/design-reference.md) — it exists so this repo doesn't
need a third-party design-intelligence skill for that first-pass reasoning.

### 2️⃣ Step 2 — Make one deliberate choice, not ten default ones

For a new screen or component, decide on purpose:
- **One typographic anchor** (what carries hierarchy: size, weight, or color — not all three at once).
- **One layout rhythm** (a spacing scale used consistently, not ad hoc `mt-3`, `mt-5`, `mt-7` scattered
  around).
- **Where the accent color earns its place** (the one or two elements that should draw the eye — not
  the whole page).

Avoid the generic AI-default tells: centered-everything hero sections, purple-to-blue gradients with no
brand basis, and icon-plus-heading cards repeated without variation when the content doesn't call for it.

### 3️⃣ Step 3 — Build with shared primitives

Compose from `src/components` and shadcn/ui primitives. If a genuinely new primitive is needed, place it
in `src/components` so the next screen reuses it instead of forking it — this is the fix strategy this
project has already committed to.

### 4️⃣ Step 4 — Check responsiveness and states

Every new UI ships with: mobile + desktop layout, loading state, empty state (real `EmptyState`/
`EmptyIllustration`, not an invented placeholder number), and error state. This is not optional polish —
untested states are exactly what `docs/testing-guidelines.md` and `code-review` expect to be covered.

## 📥 Deliverable Format

1. **Design intent:** the one typographic anchor, spacing rhythm, and accent usage chosen, in one line
   each.
2. **Components reused vs. created:** list, with a reason for anything newly created.
3. **States covered:** loading / empty / error / populated, confirmed present.
