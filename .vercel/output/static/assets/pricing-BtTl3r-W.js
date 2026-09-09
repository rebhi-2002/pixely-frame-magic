import { R as e, k as t } from "./rbac-static-data-Cz2qa6wH.js";
import { t as n } from "./check-CJTwoqRt.js";
import { n as r, t as i } from "./sparkles-Ch3KOMVW.js";
import { t as a } from "./reveal-Cj6tVgBd.js";
import { n as o } from "./public-layout-BGA3sCZD.js";
import { t as s } from "./session-cta-DDRdl3yw.js";
import { t as c } from "./faq-section-D-eiy1K0.js";
var l = e();
function u() {
  let { t: e } = t(),
    i = e(`pricing.compare.groups`, { returnObjects: !0 });
  return (0, l.jsx)(`section`, {
    className: `border-t border-border`,
    children: (0, l.jsxs)(`div`, {
      className: `mx-auto max-w-3xl px-5 py-16`,
      children: [
        (0, l.jsx)(a, {
          children: (0, l.jsxs)(`div`, {
            className: `text-center`,
            children: [
              (0, l.jsx)(`h2`, {
                className: `text-2xl font-bold text-foreground sm:text-3xl`,
                children: e(`pricing.compare.title`),
              }),
              (0, l.jsx)(`p`, {
                className: `mt-2 text-muted-foreground`,
                children: e(`pricing.compare.sub`),
              }),
            ],
          }),
        }),
        (0, l.jsx)(a, {
          delay: 0.08,
          children: (0, l.jsxs)(`div`, {
            className: `shadow-elevation-1 mt-9 overflow-hidden rounded-2xl border border-border bg-card`,
            children: [
              (0, l.jsxs)(`div`, {
                className: `grid grid-cols-[1fr_5rem_5rem] items-center gap-2 border-b border-border bg-card/60 px-5 py-3 sm:grid-cols-[1fr_7rem_7rem]`,
                children: [
                  (0, l.jsxs)(`span`, {
                    className: `text-xs font-bold text-muted-foreground`,
                    children: [e(`pricing.compare.colFree`), ` / `, e(`pricing.compare.colPlus`)],
                  }),
                  (0, l.jsx)(`span`, {
                    className: `text-center text-xs font-bold text-muted-foreground`,
                    children: e(`pricing.compare.colFree`),
                  }),
                  (0, l.jsx)(`span`, {
                    className: `text-center text-xs font-bold text-primary`,
                    children: e(`pricing.compare.colPlus`),
                  }),
                ],
              }),
              i.map((e) =>
                (0, l.jsxs)(
                  `div`,
                  {
                    children: [
                      (0, l.jsx)(`p`, {
                        className: `bg-secondary/40 px-5 py-2 text-xs font-bold text-foreground`,
                        children: e.t,
                      }),
                      e.rows.map((e) =>
                        (0, l.jsxs)(
                          `div`,
                          {
                            className: `grid grid-cols-[1fr_5rem_5rem] items-center gap-2 border-t border-border px-5 py-3 sm:grid-cols-[1fr_7rem_7rem]`,
                            children: [
                              (0, l.jsx)(`span`, {
                                className: `text-sm text-foreground`,
                                children: e.l,
                              }),
                              (0, l.jsx)(`span`, {
                                className: `flex justify-center`,
                                children: e.free
                                  ? (0, l.jsx)(n, { className: `size-4 text-success` })
                                  : (0, l.jsx)(r, { className: `size-4 text-muted-foreground/40` }),
                              }),
                              (0, l.jsx)(`span`, {
                                className: `flex justify-center`,
                                children: e.plus
                                  ? (0, l.jsx)(n, { className: `size-4 text-primary` })
                                  : (0, l.jsx)(r, { className: `size-4 text-muted-foreground/40` }),
                              }),
                            ],
                          },
                          e.l,
                        ),
                      ),
                    ],
                  },
                  e.t,
                ),
              ),
            ],
          }),
        }),
      ],
    }),
  });
}
var d = [
  { key: `free`, highlight: !1 },
  { key: `plus`, highlight: !0 },
];
function f() {
  let { t: e } = t();
  return (0, l.jsxs)(o, {
    children: [
      (0, l.jsx)(`section`, {
        className: `surface-mesh border-b border-border`,
        children: (0, l.jsxs)(`div`, {
          className: `mx-auto max-w-4xl px-5 py-16 text-center`,
          children: [
            (0, l.jsx)(`h1`, {
              className: `text-4xl font-bold text-foreground`,
              children: e(`pricing.h1`),
            }),
            (0, l.jsx)(`p`, {
              className: `mt-4 text-lg text-muted-foreground`,
              children: e(`pricing.sub`),
            }),
          ],
        }),
      }),
      (0, l.jsx)(`section`, {
        className: `mx-auto grid max-w-4xl gap-5 px-5 py-16 md:grid-cols-2`,
        children: d.map((t, r) => {
          let o = e(`pricing.${t.key}.features`, { returnObjects: !0 });
          return (0, l.jsx)(
            a,
            {
              delay: r * 0.08,
              children: (0, l.jsxs)(`div`, {
                className: `shadow-elevation-2 flex h-full flex-col rounded-2xl border p-7 ${t.highlight ? `glow-primary border-primary/50 bg-card` : `border-border bg-card/60`}`,
                children: [
                  t.highlight &&
                    (0, l.jsxs)(`span`, {
                      className: `mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary`,
                      children: [(0, l.jsx)(i, { className: `size-3.5` }), e(`pricing.plus.badge`)],
                    }),
                  (0, l.jsx)(`h2`, {
                    className: `text-xl font-bold text-foreground`,
                    children: e(`pricing.${t.key}.name`),
                  }),
                  (0, l.jsxs)(`p`, {
                    className: `mt-3 flex items-baseline gap-2`,
                    children: [
                      (0, l.jsx)(`span`, {
                        className: `font-display text-4xl font-bold text-foreground`,
                        children: e(`pricing.${t.key}.price`),
                      }),
                      (0, l.jsxs)(`span`, {
                        className: `text-sm text-muted-foreground`,
                        children: [e(`pricing.currency`), ` / `, e(`pricing.${t.key}.note`)],
                      }),
                    ],
                  }),
                  (0, l.jsx)(`ul`, {
                    className: `mt-6 flex-1 space-y-3`,
                    children: o.map((e) =>
                      (0, l.jsxs)(
                        `li`,
                        {
                          className: `flex items-start gap-2.5 text-sm text-muted-foreground`,
                          children: [
                            (0, l.jsx)(n, { className: `mt-0.5 size-4 shrink-0 text-success` }),
                            (0, l.jsx)(`span`, { children: e }),
                          ],
                        },
                        e,
                      ),
                    ),
                  }),
                  (0, l.jsx)(s, {
                    to: `/signup`,
                    label: e(`pricing.${t.key}.cta`),
                    className: `hover-press mt-7 inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-bold ${t.highlight ? `btn-shine bg-primary text-primary-foreground` : `border border-border bg-background text-foreground hover:bg-secondary`}`,
                  }),
                ],
              }),
            },
            t.key,
          );
        }),
      }),
      (0, l.jsx)(a, {
        children: (0, l.jsx)(`p`, {
          className: `mx-auto -mt-8 max-w-4xl px-5 pb-4 text-center text-xs text-muted-foreground`,
          children: e(`pricing.note`),
        }),
      }),
      (0, l.jsx)(u, {}),
      (0, l.jsx)(c, { i18nKey: `pricing.faq`, className: `border-t border-border bg-card/40` }),
    ],
  });
}
export { f as component };
