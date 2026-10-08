# Academia — home page redesign (palette 14: rust + sky)

Unzip over the project root (paths are relative). 11 files:

- src/styles.css — warm tokens, band-hero/band-sun/band-sky, stripe-tri, text-highlight (2 gold strokes), scope-ink additions
- src/routes/index.tsx — whole home page (hero, journey, free-start, features, statement, roles, blog, testimonials, final CTA)
- src/components/site/hero-mockup.tsx — recoloured hero window/tabs/chips
- src/components/site/public-layout.tsx — header/footer: max-w-6xl, no role filtering of public links, ink footer
- src/components/site/testimonials-section.tsx + src/content/testimonials.ts (NEW) — compact strip; real testimonials go in the data file
- src/components/site/cookie-consent.tsx — gold icon tile, compact mobile layout
- src/lib/bi.ts — comment only
- src/i18n/locales/ar.json, en.json, ar.pages.json — new keys (roles title/browse, hl titles, trustItems, ...), Arabic plural fix for blog.readMinutes
  Not included: docs/design/design-knobs.md (still to update), package-lock.json.
  Run: npm run validate
