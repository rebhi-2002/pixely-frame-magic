# Design reference — local, no external skill required

Read this from `frontend-design` when a new screen/component needs a concrete style decision. This
exists so the project doesn't need to install a third-party design-intelligence skill (e.g.
`ui-ux-pro-max`) just to get a starting palette or type pairing — the actual source of truth for token
*values* stays `docs/standards/design-tokens-policy.md`; this file is the reasoning layer on top of it.

## 1. How to pick a look, in order

1. Open `docs/standards/design-tokens-policy.md` — get the real color/spacing/radius tokens already
   defined. Never invent a new hex value if a token covers the case.
2. Open 2 existing screens in the same product area (e.g. two dashboard pages, or two auth pages) and
   note: which type size carries headings, how much whitespace separates sections, which single accent
   color is used for the primary action.
3. Only then decide anything new — and keep it inside the token set from step 1.

## 2. Anti-patterns to actively avoid (checked in `code-review`)

- Centered-hero-with-gradient-blob as the default for every new marketing section.
- A purple-to-blue gradient with no basis in the actual brand palette.
- Icon-in-a-circle + heading + one line of text, repeated 3-4 times, when the content underneath isn't
  actually parallel/symmetric.
- A new shadow/blur/radius value that doesn't match any existing token, "because it looked nicer."
- Decorative animation on first load that delays the user from doing the actual task.

## 3. Industry-tone quick reference

Use this only to sanity-check tone, not to pick literal colors (colors still come from the tokens file):

| Product area in this app | Tone that fits | Tone that would clash |
| --- | --- | --- |
| Auth / login / signup | Calm, low-friction, minimal color | Playful gradients, heavy motion |
| Student dashboard / progress | Encouraging, warm accents on real achievements only | Loud/urgent colors on numbers that aren't real yet (see truth rule) |
| Admin / internal tools | Dense, functional, high information density | Marketing-style whitespace, big illustrations |
| Public marketing pages | Confident, can describe the target end-state | — |

## 4. Type pairing guidance (apply only via the existing token type scale)

- One typeface family for headings, one (can be the same) for body — don't introduce a third for
  "accents" unless the tokens file already defines one.
- Hierarchy comes from **one** lever at a time per screen: size *or* weight *or* color — stacking all
  three on every heading reads as noisy, not confident.

## 5. Accessibility checklist (always, not optional polish)

- Text contrast meets WCAG AA against its actual background (check the token's real rendered color, not
  the token name).
- Every interactive element reachable and operable by keyboard; visible focus state uses an existing
  token, not a browser default that clashes with the design.
- Every meaningful image/icon has an accessible name; decorative ones are marked so.
- Motion respects `prefers-reduced-motion`.

## 6. If a real design-intelligence tool is wanted later

A tool like `ui-ux-pro-max` (community skill, CLI + scripts + a large style/palette database) can go
further than this file — but it ships executable code and assets, not just instructions. Before adding
it to this repo, run `check-security` / `hookify`-style review on its scripts first, the same as any
other third-party dependency. Until then, this file plus the tokens policy is the supported path.
