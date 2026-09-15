---
name: academia-conventions
description: Project conventions for the Academia frontend (pixely-frame-magic) — when to use it — before writing any content, data, or UI code in this repo. Encodes the truth-rule for mock data, naming caution for unbuilt features, the shared-component-first fix strategy, and the diff-delivery workflow established across this project's audit history.
---

# Academia frontend — project conventions

Read this before touching any file in this repo. It exists because a full audit
(see `README.md` → "حالة الصفحات" and `docs/decisions/`) found the same
mistakes recurring across many files; this skill exists so they don't recur again.

## 1. Backend reality check (always verify, don't assume)

The real backend (Academia) currently exposes **only**: Auth, User,
UserPermission, Constant, Page, Home. There is no Course, Content, Exam,
Payment, or Notification endpoint. Everything else in this frontend is a
`src/lib/*.functions.ts` server function operating on an in-memory array in
`src/lib/*-data.ts`. Before claiming "connect this to the backend" is possible,
check this list — it usually isn't yet.

## 2. The truth rule (non-negotiable)

Never let a page or a data file imply that real other people's activity
exists when it doesn't. Concretely:

- **Keep**: a user's own self-reported/editable data (their own streak,
  points, courses they enrolled in). It's transparent and editable.
- **Zero out / empty**: any array or number that implies _other real
  people's_ activity — student names, enrollment counts, ratings, financial
  transactions, "X% of your students got this wrong". If it isn't real yet,
  it must render as an honest empty state (most pages already have an
  `EmptyState`/`EmptyIllustration` for this — use it, don't invent a fake
  number instead).
- **Public marketing pages** (pre-login) may describe the target end-state
  confidently ("build forward") — this project's team made that call
  explicitly. **In-app pages** (post-login) must describe current reality:
  if a button says "Download" but only logs a counter, rename the button.
  If a toggle says "Reminder" but sends no notification, say so in the label.
- Quick self-check before adding any new copy or data: _"If the content
  were different, would I make the exact same call regardless?"_ If yes,
  it's an unexamined template — stop and look at what's actually there.

## 3. Feature naming caution

Some features were deliberately renamed to modest, honest names because the
ambitious name described a mechanism that isn't built yet (e.g. "Exam
simulator" → "My practice exams" because there's no timer or exam UI, only
a manual log). Check `src/lib/rbac-static-data.ts` comments before
"restoring" an ambitious name — it was downgraded on purpose and should only
go back up once the real mechanism ships.

## 4. `hover-lift` is a promise, not decoration

`hover-lift` (translateY + shadow) signals "this is clickable" to a user.
Only apply it to a real `<Link>`/`<button>` (or a card containing one, like
a course tile). Never apply it to a purely informational card/stat — that's
a false affordance. This was wrong in 7 places across the codebase
(including the shared `StatGrid` in `kit.tsx`, which affected all
post-login pages at once) before being fixed.

## 5. Fix shared components first

Before fixing the same issue page-by-page, check whether it lives in a
shared component: `src/components/app/kit.tsx` (all post-login pages),
`src/components/site/*` (all public pages), or `src/styles.css` (global
tokens/utilities). One fix there is worth more than the same fix repeated
20 times, and is less likely to be missed somewhere.

## 6. i18n stays in sync

Every text change ships with both `ar.json`/`ar.pages.json` and their
`en.json`/`en.pages.json` counterparts in the same change — never "later".

## 7. Delivering changes

Ship changes as a unified `git diff` (`git apply`-able), not full rewritten
files — easier to review on mobile, and verifiable with
`patch -p1 --dry-run` before handing it over. Prefer one cumulative diff per
logical phase over many tiny ones the person has to stack in order.

## 8. Before calling anything "done"

Re-read interactive code (state, animation, mutations) a second time after
writing it, specifically for behavior — balanced braces do not prove a CSS
transform or a flip animation renders correctly. Flag clearly when something
can only be verified by actually running the app (this sandbox cannot render
a browser), rather than implying visual confidence you don't have.
