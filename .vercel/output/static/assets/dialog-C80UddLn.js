import { R as e, ht as t, vt as n } from "./rbac-static-data-Cz2qa6wH.js";
import { a as r, t as i } from "./dist-LHEW5aEh.js";
import { t as a } from "./utils-DojpP95n.js";
import { a as o } from "./dist-DIUTVkhN.js";
import { a as s, i as c, n as l, o as u, r as d, s as f, t as p } from "./dist-CJVfaj2u.js";
var m = n(t(), 1),
  h = e(),
  g = Object.defineProperty,
  _ = m.forwardRef(
    ((e, t) => g(e, `name`, { value: t, configurable: !0 }))(function (e, t) {
      return (0, h.jsx)(o.label, {
        ...e,
        ref: t,
        onMouseDown: (t) => {
          t.target.closest(`button, input, select, textarea`) ||
            (e.onMouseDown?.(t), !t.defaultPrevented && t.detail > 1 && t.preventDefault());
        },
      });
    }, `Label`),
  ),
  v = i(
    `text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`,
  ),
  y = m.forwardRef(({ className: e, ...t }, n) =>
    (0, h.jsx)(_, { ref: n, className: a(v(), e), ...t }),
  );
y.displayName = _.displayName;
var b = p,
  x = u,
  S = m.forwardRef(({ className: e, ...t }, n) =>
    (0, h.jsx)(s, {
      ref: n,
      className: a(
        `fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`,
        e,
      ),
      ...t,
    }),
  );
S.displayName = s.displayName;
var C = m.forwardRef(({ className: e, children: t, ...n }, i) =>
  (0, h.jsxs)(x, {
    children: [
      (0, h.jsx)(S, {}),
      (0, h.jsxs)(d, {
        ref: i,
        className: a(
          `fixed left-[50%] top-[50%] z-50 grid max-h-[min(90vh,720px)] w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 overflow-y-auto rounded-2xl border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95`,
          e,
        ),
        ...n,
        children: [
          t,
          (0, h.jsxs)(l, {
            className: `absolute end-4 top-4 rounded-lg opacity-70 ring-offset-background cursor-pointer transition-[background-color,opacity] hover:bg-accent hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground`,
            children: [
              (0, h.jsx)(r, { className: `h-4 w-4` }),
              (0, h.jsx)(`span`, { className: `sr-only`, children: `Close` }),
            ],
          }),
        ],
      }),
    ],
  }),
);
C.displayName = d.displayName;
var w = ({ className: e, ...t }) =>
  (0, h.jsx)(`div`, { className: a(`flex flex-col space-y-1.5 text-start`, e), ...t });
w.displayName = `DialogHeader`;
var T = ({ className: e, ...t }) =>
  (0, h.jsx)(`div`, {
    className: a(`flex flex-col-reverse gap-2 sm:flex-row sm:justify-end`, e),
    ...t,
  });
T.displayName = `DialogFooter`;
var E = m.forwardRef(({ className: e, ...t }, n) =>
  (0, h.jsx)(f, {
    ref: n,
    className: a(`text-lg font-semibold leading-none tracking-tight`, e),
    ...t,
  }),
);
E.displayName = f.displayName;
var D = m.forwardRef(({ className: e, ...t }, n) =>
  (0, h.jsx)(c, { ref: n, className: a(`text-sm text-muted-foreground`, e), ...t }),
);
D.displayName = c.displayName;
export { E as a, w as i, C as n, y as o, T as r, b as t };
