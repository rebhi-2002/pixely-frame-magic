import { R as e } from "./rbac-static-data-Cz2qa6wH.js";
import { _ as t, c as n, t as r } from "./dynamic-icon-fBQNzGz-.js";
import { t as i } from "./loader-circle-DYrBHP0C.js";
import { t as a } from "./button-m-Eg43IZ.js";
import { t as o } from "./utils-DojpP95n.js";
var s = e();
function c({ label: e = `جارٍ التحميل…`, className: t }) {
  return (0, s.jsxs)(`div`, {
    role: `status`,
    "aria-live": `polite`,
    className: o(
      `flex min-h-40 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card/60 p-6 text-center`,
      t,
    ),
    children: [
      (0, s.jsx)(i, { "aria-hidden": `true`, className: `size-6 animate-spin text-primary` }),
      (0, s.jsx)(`span`, { className: `text-sm text-muted-foreground`, children: e }),
    ],
  });
}
function l({
  title: e = `تعذّر تحميل المحتوى`,
  description: n = `حدثت مشكلة مؤقتة. حاول مرة أخرى.`,
  action: r,
  className: i,
}) {
  return (0, s.jsxs)(`div`, {
    role: `alert`,
    className: o(
      `flex min-h-40 flex-col items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center`,
      i,
    ),
    children: [
      (0, s.jsx)(`span`, {
        className: `flex size-11 items-center justify-center rounded-full bg-destructive/12 text-destructive`,
        children: (0, s.jsx)(t, { "aria-hidden": `true`, className: `size-5` }),
      }),
      (0, s.jsx)(`h2`, {
        className: `font-display text-sm font-bold text-foreground`,
        children: e,
      }),
      (0, s.jsx)(`p`, { className: `max-w-md text-sm text-muted-foreground`, children: n }),
      r,
    ],
  });
}
function u({ label: e = `حاول مرة أخرى`, onClick: t, loading: r = !1 }) {
  return (0, s.jsxs)(a, {
    type: `button`,
    variant: `outline`,
    size: `sm`,
    onClick: t,
    loading: r,
    children: [!r && (0, s.jsx)(n, { "aria-hidden": `true`, className: `size-4` }), e],
  });
}
function d({ title: e, description: t, icon: n = `Sparkles`, action: i, className: a }) {
  return (0, s.jsxs)(`div`, {
    className: o(
      `flex min-h-40 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-secondary/20 p-6 text-center`,
      a,
    ),
    children: [
      (0, s.jsx)(`span`, {
        className: `flex size-11 items-center justify-center rounded-full bg-primary/12 text-primary`,
        children: (0, s.jsx)(r, { name: n, className: `size-5` }),
      }),
      (0, s.jsx)(`h2`, {
        className: `font-display text-sm font-bold text-foreground`,
        children: e,
      }),
      (0, s.jsx)(`p`, { className: `max-w-md text-sm text-muted-foreground`, children: t }),
      i,
    ],
  });
}
export { u as i, d as n, c as r, l as t };
