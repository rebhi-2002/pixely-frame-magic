import { M as e, R as t, k as n, o as r, u as i } from "./rbac-static-data-Cz2qa6wH.js";
import { a, i as o, n as s, o as c, r as l, s as u, t as d } from "./trophy-BRNoHz_s.js";
import { t as f } from "./book-open-check-BWMykzZm.js";
import { t as p } from "./chart-line-C5wyEOtC.js";
import { d as m } from "./dist-LHEW5aEh.js";
import { t as h } from "./circle-check-ydOT-ci8.js";
import { t as g } from "./circle-x-Bx80P6i_.js";
import { t as _ } from "./users-jSLIC1co.js";
import { t as v } from "./blog-posts-CxW631lu.js";
import { t as y } from "./utils-DojpP95n.js";
import { t as b } from "./reveal-Cj6tVgBd.js";
import { t as x } from "./animated-counter-BIBEqBgv.js";
import { t as S } from "./use-session-CMsGjsyr.js";
import { n as C } from "./public-layout-BGA3sCZD.js";
import { t as w } from "./session-cta-DDRdl3yw.js";
import { t as T } from "./testimonials-section-CasrGQiW.js";
var E = t(),
  D = [
    { icon: `📐`, pct: 78, tone: `bg-primary` },
    { icon: `🧪`, pct: 54, tone: `bg-info` },
    { icon: `📖`, pct: 92, tone: `bg-success` },
  ],
  O = [22, 34, 18, 40, 28, 46, 32];
function k({ session: e }) {
  let t = i(),
    n = e?.fullName?.trim().split(/\s+/)[0] || t(`سارة`, `Sarah`),
    r = n.charAt(0).toUpperCase(),
    o = t(`أهلاً ${n} 👋`, `Hi ${n} 👋`);
  return (0, E.jsxs)(`div`, {
    "aria-hidden": !0,
    className: `relative hidden select-none lg:block`,
    children: [
      (0, E.jsxs)(`div`, {
        className: `glass-surface shadow-elevation-3 relative mx-auto w-full max-w-md rounded-3xl p-4 [transform:perspective(1400px)_rotateY(-8deg)_rotateX(3deg)] transition-transform duration-700 hover:[transform:perspective(1400px)_rotateY(-3deg)_rotateX(1deg)]`,
        children: [
          (0, E.jsxs)(`div`, {
            className: `flex items-center gap-1.5 px-1 pb-3`,
            children: [
              (0, E.jsx)(`span`, { className: `size-2.5 rounded-full bg-destructive/60` }),
              (0, E.jsx)(`span`, { className: `size-2.5 rounded-full bg-primary/60` }),
              (0, E.jsx)(`span`, { className: `size-2.5 rounded-full bg-success/60` }),
              (0, E.jsx)(`span`, {
                className: `ms-3 flex-1 truncate rounded-full bg-background/70 px-3 py-1 text-[11px] text-muted-foreground`,
                children: `academia.app/dashboard`,
              }),
              (0, E.jsx)(`span`, {
                className: `shrink-0 rounded-full bg-primary/12 px-2 py-1 text-[9px] font-bold text-primary`,
                children: t(`معاينة`, `Preview`),
              }),
            ],
          }),
          (0, E.jsxs)(`div`, {
            className: `shadow-elevation-1 space-y-4 rounded-2xl bg-background p-4`,
            children: [
              (0, E.jsxs)(`div`, {
                className: `flex items-center justify-between`,
                children: [
                  (0, E.jsxs)(`div`, {
                    className: `flex items-center gap-2.5`,
                    children: [
                      (0, E.jsx)(`span`, {
                        className: `flex size-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary`,
                        children: r,
                      }),
                      (0, E.jsxs)(`div`, {
                        children: [
                          (0, E.jsx)(`p`, {
                            className: `text-xs font-bold text-foreground`,
                            children: o,
                          }),
                          (0, E.jsx)(`p`, {
                            className: `text-[10px] text-muted-foreground`,
                            children: t(
                              `جاهزة لمتابعة إنجازك اليوم`,
                              `Ready to keep your streak going`,
                            ),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, E.jsx)(`span`, {
                    className: `flex size-8 items-center justify-center rounded-full bg-secondary text-muted-foreground`,
                    children: (0, E.jsx)(u, { className: `size-4` }),
                  }),
                ],
              }),
              (0, E.jsxs)(`div`, {
                className: `grid grid-cols-3 gap-2`,
                children: [
                  (0, E.jsxs)(`div`, {
                    className: `rounded-xl bg-primary/10 p-2.5 text-center`,
                    children: [
                      (0, E.jsx)(a, { className: `mx-auto size-3.5 text-primary` }),
                      (0, E.jsx)(`p`, {
                        className: `mt-1 font-display text-sm font-bold text-foreground`,
                        children: `12`,
                      }),
                      (0, E.jsx)(`p`, {
                        className: `text-[9px] text-muted-foreground`,
                        children: t(`يوم متتالي`, `day streak`),
                      }),
                    ],
                  }),
                  (0, E.jsxs)(`div`, {
                    className: `rounded-xl bg-success/10 p-2.5 text-center`,
                    children: [
                      (0, E.jsx)(s, { className: `mx-auto size-3.5 text-success` }),
                      (0, E.jsx)(`p`, {
                        className: `mt-1 font-display text-sm font-bold text-foreground`,
                        children: `86%`,
                      }),
                      (0, E.jsx)(`p`, {
                        className: `text-[9px] text-muted-foreground`,
                        children: t(`نسبة الإنجاز`, `completion`),
                      }),
                    ],
                  }),
                  (0, E.jsxs)(`div`, {
                    className: `rounded-xl bg-info/10 p-2.5 text-center`,
                    children: [
                      (0, E.jsx)(h, { className: `mx-auto size-3.5 text-info` }),
                      (0, E.jsx)(`p`, {
                        className: `mt-1 font-display text-sm font-bold text-foreground`,
                        children: `24`,
                      }),
                      (0, E.jsx)(`p`, {
                        className: `text-[9px] text-muted-foreground`,
                        children: t(`درس مكتمل`, `lessons done`),
                      }),
                    ],
                  }),
                ],
              }),
              (0, E.jsx)(`div`, {
                className: `space-y-2.5`,
                children: D.map((e) =>
                  (0, E.jsxs)(
                    `div`,
                    {
                      className: `flex items-center gap-2.5`,
                      children: [
                        (0, E.jsx)(`span`, { className: `text-sm`, children: e.icon }),
                        (0, E.jsx)(`div`, {
                          className: `h-1.5 flex-1 overflow-hidden rounded-full bg-secondary`,
                          children: (0, E.jsx)(`div`, {
                            className: `h-full rounded-full ${e.tone}`,
                            style: { width: `${e.pct}%` },
                          }),
                        }),
                        (0, E.jsxs)(`span`, {
                          className: `w-8 text-end text-[10px] font-bold text-muted-foreground`,
                          children: [e.pct, `%`],
                        }),
                      ],
                    },
                    e.icon,
                  ),
                ),
              }),
              (0, E.jsx)(`div`, {
                className: `flex h-14 items-end justify-between gap-1.5 border-t border-border pt-3`,
                children: O.map((e, t) =>
                  (0, E.jsx)(
                    `div`,
                    {
                      className: `w-full rounded-t-sm ${t === 5 ? `bg-primary` : `bg-secondary`}`,
                      style: { height: `${e}px` },
                    },
                    t,
                  ),
                ),
              }),
            ],
          }),
        ],
      }),
      (0, E.jsxs)(`div`, {
        className: `glass-surface shadow-elevation-2 animate-float absolute -end-6 -top-6 flex items-center gap-2 rounded-2xl px-3.5 py-2.5`,
        children: [
          (0, E.jsx)(`span`, {
            className: `flex size-7 items-center justify-center rounded-full bg-success/15 text-success`,
            children: (0, E.jsx)(h, { className: `size-3.5` }),
          }),
          (0, E.jsx)(`p`, {
            className: `text-[11px] font-bold text-foreground`,
            children: t(`أنجزت 12 درس هالأسبوع`, `12 lessons done this week`),
          }),
        ],
      }),
      (0, E.jsxs)(`div`, {
        className: `glass-surface shadow-elevation-2 animate-float absolute -bottom-5 -start-8 flex items-center gap-2 rounded-2xl px-3.5 py-2.5`,
        style: { animationDelay: `1.2s` },
        children: [
          (0, E.jsx)(`span`, {
            className: `flex size-7 items-center justify-center rounded-full bg-primary/15 text-primary`,
            children: (0, E.jsx)(a, { className: `size-3.5` }),
          }),
          (0, E.jsx)(`p`, {
            className: `text-[11px] font-bold text-foreground`,
            children: t(`سلسلة 12 يوم 🔥`, `12-day streak 🔥`),
          }),
        ],
      }),
    ],
  });
}
var A = [
    { icon: f, key: `library`, span: `lg:col-span-2 lg:row-span-2`, flagship: !0 },
    { icon: c, key: `simulator`, span: `lg:col-span-2`, flagship: !1 },
    { icon: o, key: `community`, span: ``, flagship: !1 },
    { icon: p, key: `tracker`, span: ``, flagship: !1 },
    { icon: g, key: `mistakes`, span: `lg:col-span-2`, flagship: !1 },
    { icon: l, key: `review`, span: `lg:col-span-2`, flagship: !1 },
  ],
  j = [
    { prefix: ``, value: 4, suffix: ``, key: `levels` },
    { prefix: ``, value: 100, suffix: `%`, key: `rtl` },
    { prefix: ``, value: 3, suffix: ``, key: `spaces` },
  ],
  M = [
    { icon: _, key: `student` },
    { icon: f, key: `teacher` },
    { icon: p, key: `parent` },
  ],
  N = v.slice(-2).reverse();
function P() {
  let { t } = n(),
    a = i(),
    { session: o } = S(),
    s = o?.roleKey,
    c = s ? (r(s) ?? []).includes(`/courses`) : !1;
  return (0, E.jsxs)(C, {
    children: [
      (0, E.jsx)(`section`, {
        className: `surface-mesh surface-mesh-fade relative overflow-hidden border-b border-border`,
        children: (0, E.jsx)(`div`, {
          className: `relative mx-auto max-w-6xl px-5 py-20 md:py-28`,
          children: (0, E.jsxs)(`div`, {
            className: `grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]`,
            children: [
              (0, E.jsxs)(`div`, {
                children: [
                  (0, E.jsxs)(`span`, {
                    className: `glass-surface inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-primary shadow-elevation-1`,
                    children: [
                      (0, E.jsx)(d, { className: `size-4` }),
                      o ? t(`home.signedIn.welcome`, { name: o.fullName }) : t(`home.badge`),
                    ],
                  }),
                  o && s
                    ? (0, E.jsxs)(E.Fragment, {
                        children: [
                          (0, E.jsx)(`h1`, {
                            className: `mt-6 text-4xl font-bold leading-[1.25] text-foreground sm:text-5xl md:text-6xl`,
                            children: t(`home.signedIn.${s}.h1`),
                          }),
                          (0, E.jsx)(`p`, {
                            className: `mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground`,
                            children: t(`home.signedIn.${s}.sub`),
                          }),
                          (0, E.jsxs)(`div`, {
                            className: `mt-9 flex flex-wrap gap-3`,
                            children: [
                              (0, E.jsxs)(e, {
                                to: o.home,
                                className: `glow-primary hover-press inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground`,
                                children: [
                                  (0, E.jsx)(m, { className: `size-4` }),
                                  t(`home.signedIn.cta`),
                                ],
                              }),
                              c &&
                                (0, E.jsx)(e, {
                                  to: `/courses`,
                                  className: `hover-press inline-flex items-center justify-center rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground hover:bg-secondary`,
                                  children: t(`home.signedIn.browse`),
                                }),
                            ],
                          }),
                        ],
                      })
                    : (0, E.jsxs)(E.Fragment, {
                        children: [
                          (0, E.jsxs)(`h1`, {
                            className: `mt-6 text-4xl font-bold leading-[1.2] text-foreground sm:text-5xl md:text-6xl`,
                            children: [
                              t(`home.h1a`),
                              ` `,
                              (0, E.jsx)(`span`, {
                                className: `text-gradient`,
                                children: t(`home.h1b`),
                              }),
                              ` `,
                              t(`home.h1c`),
                            ],
                          }),
                          (0, E.jsx)(`p`, {
                            className: `mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground`,
                            children: t(`home.sub`),
                          }),
                          (0, E.jsxs)(`div`, {
                            className: `mt-9 flex flex-wrap gap-3`,
                            children: [
                              (0, E.jsx)(e, {
                                to: `/signup`,
                                className: `btn-shine glow-primary hover-press inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground`,
                                children: t(`home.ctaPrimary`),
                              }),
                              (0, E.jsx)(e, {
                                to: `/how-it-works`,
                                className: `hover-press inline-flex items-center justify-center rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground hover:bg-secondary`,
                                children: t(`home.ctaSecondary`),
                              }),
                            ],
                          }),
                        ],
                      }),
                  (0, E.jsx)(`div`, {
                    className: `mt-14 grid items-stretch gap-4 sm:grid-cols-3`,
                    children: j.map((e, n) =>
                      (0, E.jsx)(
                        b,
                        {
                          delay: n * 0.08,
                          className: `h-full`,
                          children: (0, E.jsxs)(`div`, {
                            className: `hover-lift shadow-elevation-1 flex h-full flex-col justify-center rounded-2xl border border-border bg-card p-5`,
                            children: [
                              (0, E.jsx)(`p`, {
                                className: `font-display text-3xl font-bold text-primary`,
                                children: (0, E.jsx)(x, {
                                  prefix: e.prefix,
                                  value: e.value,
                                  suffix: e.suffix,
                                }),
                              }),
                              (0, E.jsx)(`p`, {
                                className: `mt-1 text-sm text-muted-foreground`,
                                children: t(`home.stats.${e.key}`),
                              }),
                            ],
                          }),
                        },
                        e.key,
                      ),
                    ),
                  }),
                ],
              }),
              (0, E.jsx)(b, { delay: 0.15, y: 16, children: (0, E.jsx)(k, { session: o }) }),
            ],
          }),
        }),
      }),
      (0, E.jsxs)(`section`, {
        className: `mx-auto max-w-6xl px-5 py-20`,
        children: [
          (0, E.jsx)(`h2`, {
            className: `text-3xl font-bold text-foreground`,
            children: t(`home.featuresTitle`),
          }),
          (0, E.jsx)(`p`, {
            className: `mt-2 max-w-2xl text-muted-foreground`,
            children: t(`home.featuresSub`),
          }),
          (0, E.jsx)(`div`, {
            className: `mt-10 grid gap-4 md:grid-cols-2 lg:auto-rows-fr lg:grid-cols-4`,
            children: A.map((e, n) =>
              (0, E.jsx)(
                b,
                {
                  delay: (n % 3) * 0.08,
                  className: e.span,
                  children: (0, E.jsxs)(`article`, {
                    className: y(
                      `hover-lift shadow-elevation-1 flex h-full flex-col rounded-2xl border p-6`,
                      e.flagship
                        ? `surface-mesh border-primary/30 bg-primary/5`
                        : `border-border bg-card`,
                    ),
                    children: [
                      (0, E.jsx)(`span`, {
                        className: y(
                          `flex size-11 items-center justify-center rounded-xl`,
                          e.flagship
                            ? `bg-primary text-primary-foreground`
                            : `bg-primary/12 text-primary`,
                        ),
                        children: (0, E.jsx)(e.icon, { className: `size-5` }),
                      }),
                      (0, E.jsx)(`h3`, {
                        className: y(
                          `mt-4 font-bold text-foreground`,
                          e.flagship ? `text-lg` : `text-base`,
                        ),
                        children: t(`home.features.${e.key}.title`),
                      }),
                      (0, E.jsx)(`p`, {
                        className: `mt-2 flex-1 text-sm leading-relaxed text-muted-foreground`,
                        children: t(`home.features.${e.key}.text`),
                      }),
                    ],
                  }),
                },
                e.key,
              ),
            ),
          }),
        ],
      }),
      (0, E.jsx)(`section`, {
        className: `border-y border-border bg-card/40`,
        children: (0, E.jsx)(`div`, {
          className: `mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-3`,
          children: M.map((e) =>
            (0, E.jsxs)(
              `div`,
              {
                className: `hover-lift rounded-2xl border border-border bg-background p-6`,
                children: [
                  (0, E.jsx)(e.icon, { className: `size-6 text-success` }),
                  (0, E.jsx)(`h3`, {
                    className: `mt-3 font-bold text-foreground`,
                    children: t(`home.roles.${e.key}.t`),
                  }),
                  (0, E.jsx)(`p`, {
                    className: `mt-1.5 text-sm text-muted-foreground`,
                    children: t(`home.roles.${e.key}.d`),
                  }),
                ],
              },
              e.key,
            ),
          ),
        }),
      }),
      (0, E.jsxs)(`section`, {
        className: `mx-auto max-w-6xl px-5 py-20`,
        children: [
          (0, E.jsxs)(`div`, {
            className: `flex flex-wrap items-end justify-between gap-4`,
            children: [
              (0, E.jsxs)(`div`, {
                children: [
                  (0, E.jsx)(`h2`, {
                    className: `text-3xl font-bold text-foreground`,
                    children: t(`blog.teaserTitle`),
                  }),
                  (0, E.jsx)(`p`, {
                    className: `mt-2 max-w-xl text-muted-foreground`,
                    children: t(`blog.teaserSub`),
                  }),
                ],
              }),
              (0, E.jsx)(e, {
                to: `/blog`,
                className: `hover-press inline-flex items-center rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-bold text-foreground hover:bg-secondary`,
                children: t(`blog.teaserCta`),
              }),
            ],
          }),
          (0, E.jsx)(`div`, {
            className: `mt-8 grid gap-4 md:grid-cols-2`,
            children: N.map((t, n) =>
              (0, E.jsx)(
                b,
                {
                  delay: n * 0.08,
                  children: (0, E.jsxs)(e, {
                    to: `/blog/$slug`,
                    params: { slug: t.slug },
                    className: `hover-lift shadow-elevation-1 flex h-full flex-col rounded-2xl border border-border bg-card p-6`,
                    children: [
                      (0, E.jsx)(`span`, {
                        className: `w-fit rounded-full bg-primary/12 px-3 py-1 text-xs font-bold text-primary`,
                        children: a(t.category, t.categoryEn),
                      }),
                      (0, E.jsx)(`h3`, {
                        className: `mt-4 text-base font-bold leading-snug text-foreground`,
                        children: a(t.title, t.titleEn),
                      }),
                      (0, E.jsx)(`p`, {
                        className: `mt-2 line-clamp-2 text-sm text-muted-foreground`,
                        children: a(t.excerpt, t.excerptEn),
                      }),
                    ],
                  }),
                },
                t.slug,
              ),
            ),
          }),
        ],
      }),
      (0, E.jsxs)(`section`, {
        className: `mx-auto max-w-4xl px-5 py-20 text-center`,
        children: [
          (0, E.jsx)(`h2`, {
            className: `text-3xl font-bold text-foreground`,
            children: t(`home.ctaTitle`),
          }),
          (0, E.jsx)(`p`, { className: `mt-3 text-muted-foreground`, children: t(`home.ctaSub`) }),
          (0, E.jsx)(w, {
            to: `/signup`,
            label: t(`home.ctaButton`),
            className: `btn-shine glow-primary hover-press mt-7 inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground`,
          }),
        ],
      }),
      (0, E.jsx)(T, { className: `border-t border-border bg-card/40` }),
    ],
  });
}
export { P as component };
