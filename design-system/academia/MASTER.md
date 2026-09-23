# Academia Design System

## Direction
Calm editorial Swiss-modern education product. Content leads; surfaces support hierarchy. Prefer warm paper, ink navy, and one achievement accent. Avoid glassmorphism, decorative gradients, mascot-like marks, excessive pills, and unmotivated motion.

## Tokens
- Canvas: paper `#F7F5F0`, dark ink `#0B1220`
- Text: ink `#182230`, dark paper `#F4F1EA`
- Primary: achievement amber `#A96808` light / `#F2B544` dark
- Success: mastery green `#137A58` light / `#28B883` dark
- Info: study blue `#28649B`
- Destructive: coral `#B94331`
- Borders are quiet, never the only grouping cue.

## Typography
Cairo for body and Tajawal for Arabic display headings; Reem Kufi only where the English wordmark needs character. Use readable measure (45–75ch), explicit line-height, and let Arabic labels wrap naturally.

## Layout
Use a 12-column max-width shell, 24px minimum mobile gutter, 32–48px section rhythm, and a clear hero → proof → workflow → features → roles → content → CTA argument. Prefer flex/grid flow over absolute positioning. Reserve media aspect ratios.

## Components
Buttons and controls are minimum 44px tall. One primary action per section. Cards use restrained 12–16px radii, low elevation, and meaningful grouping. Icon-only controls require an accessible label. Use Lucide interface icons; no emoji or hand-drawn SVG UI icons.

## Motion and accessibility
Use short opacity/color/transform transitions for interactive feedback only. Respect `prefers-reduced-motion`. Maintain visible `:focus-visible`, WCAG AA contrast, semantic landmarks, keyboard order, and RTL/LTR parity.

## Anti-patterns
No random bento walls, noisy mesh backgrounds, glow as hierarchy, hover-lift on static information, tiny touch targets, low-contrast muted copy, or decorative assets that compete with the learning task.

## Delivery checklist
Test 375/411/768/1024/1440, both themes and directions; verify no horizontal scroll, menu focus, labels, image alt text, long Arabic wrapping, loading/error/empty states, and session-aware actions.

See `pages/home.md`, `pages/app.md`, and `pages/admin.md` for surface-specific rules.
