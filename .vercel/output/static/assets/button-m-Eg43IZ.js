import { R as e, ht as t, vt as n } from "./rbac-static-data-Cz2qa6wH.js";
import { t as r } from "./createLucideIcon-TgbgTcVv.js";
import { n as i, t as a } from "./dist-LHEW5aEh.js";
import { t as o } from "./loader-circle-DYrBHP0C.js";
import { t as s } from "./utils-DojpP95n.js";
var c = r(`log-in`, [
    [`path`, { d: `m10 17 5-5-5-5`, key: `1bsop3` }],
    [`path`, { d: `M15 12H3`, key: `6jk70r` }],
    [`path`, { d: `M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4`, key: `u53s6r` }],
  ]),
  l = n(t()),
  u = e(),
  d = a(
    `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold cursor-pointer transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,
    {
      variants: {
        variant: {
          default: `btn-shine bg-primary text-primary-foreground shadow-elevation-2 hover:-translate-y-0.5 hover:shadow-elevation-3`,
          destructive: `bg-destructive text-destructive-foreground shadow-elevation-1 hover:bg-destructive/90 hover:-translate-y-0.5`,
          outline: `border border-border bg-card/60 shadow-elevation-1 hover:bg-secondary hover:border-primary/40`,
          secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/70`,
          soft: `bg-primary/12 text-primary hover:bg-primary/18`,
          ghost: `hover:bg-accent hover:text-accent-foreground`,
          link: `text-primary underline-offset-4 hover:underline font-semibold`,
        },
        size: {
          default: `h-10 px-5 py-2`,
          sm: `h-8 rounded-lg px-3.5 text-xs`,
          lg: `h-12 px-7 text-[0.95rem]`,
          xl: `h-14 px-8 text-base rounded-2xl`,
          icon: `h-10 w-10 shrink-0`,
        },
      },
      defaultVariants: { variant: `default`, size: `default` },
    },
  ),
  f = l.forwardRef(
    (
      {
        className: e,
        variant: t,
        size: n,
        asChild: r = !1,
        loading: a = !1,
        disabled: c,
        children: l,
        ...f
      },
      p,
    ) =>
      (0, u.jsx)(r ? i : `button`, {
        className: s(d({ variant: t, size: n, className: e })),
        ref: p,
        "aria-busy": a || void 0,
        disabled: c || a,
        ...f,
        children: r
          ? l
          : (0, u.jsxs)(u.Fragment, {
              children: [
                a && (0, u.jsx)(o, { "aria-hidden": `true`, className: `size-4 animate-spin` }),
                l,
              ],
            }),
      }),
  );
f.displayName = `Button`;
export { d as n, c as r, f as t };
