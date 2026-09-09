import { M as e, R as t, ht as n, k as r, vt as i } from "./rbac-static-data-Cz2qa6wH.js";
import { a, i as o, n as s, r as c, t as l } from "./send-D5yIegyH.js";
import { B as u } from "./index-CUZEShOB.js";
import { t as d } from "./reveal-Cj6tVgBd.js";
import { n as f } from "./public-layout-BGA3sCZD.js";
import { n as p, r as m, t as h } from "./types-BaQ7EMJK.js";
var g = i(n()),
  _ = t(),
  v = [`student`, `teacher`, `school`, `press`, `other`],
  y = p({
    name: m().trim().min(2),
    email: m().trim().email(),
    topic: h(v),
    message: m().trim().min(10),
  });
function b() {
  let { t } = r(),
    [n, i] = (0, g.useState)(``),
    [p, m] = (0, g.useState)(``),
    [h, b] = (0, g.useState)(`student`),
    [x, S] = (0, g.useState)(``),
    [C, w] = (0, g.useState)({}),
    [T, E] = (0, g.useState)(!1),
    [D, O] = (0, g.useState)(!1);
  function k(e) {
    e.preventDefault();
    let r = y.safeParse({ name: n, email: p, topic: h, message: x });
    if (!r.success) {
      let e = {};
      for (let n of r.error.issues) {
        let r = n.path[0];
        e[r] = t(`contact.errors.${r}`);
      }
      w(e);
      return;
    }
    (w({}),
      E(!0),
      window.setTimeout(() => {
        (E(!1), O(!0), u.success(t(`contact.success.title`)));
      }, 600));
  }
  return (0, _.jsxs)(f, {
    children: [
      (0, _.jsx)(`section`, {
        className: `surface-mesh border-b border-border`,
        children: (0, _.jsxs)(`div`, {
          className: `mx-auto max-w-5xl px-5 py-16`,
          children: [
            (0, _.jsx)(`span`, {
              className: `flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary`,
              children: (0, _.jsx)(s, { className: `size-6` }),
            }),
            (0, _.jsx)(`h1`, {
              className: `mt-5 text-4xl font-bold text-foreground`,
              children: t(`contact.h1`),
            }),
            (0, _.jsx)(`p`, {
              className: `mt-3 max-w-xl text-lg text-muted-foreground`,
              children: t(`contact.sub`),
            }),
          ],
        }),
      }),
      (0, _.jsxs)(`section`, {
        className: `mx-auto grid max-w-5xl gap-6 px-5 py-16 lg:grid-cols-[1.3fr_0.9fr]`,
        children: [
          (0, _.jsx)(d, {
            children: (0, _.jsx)(`div`, {
              className: `shadow-elevation-1 rounded-2xl border border-border bg-card p-6 sm:p-8`,
              children: D
                ? (0, _.jsxs)(`div`, {
                    className: `flex flex-col items-center py-10 text-center`,
                    children: [
                      (0, _.jsx)(`span`, {
                        className: `flex size-14 items-center justify-center rounded-full bg-success/12 text-success`,
                        children: (0, _.jsx)(l, { className: `size-6` }),
                      }),
                      (0, _.jsx)(`h2`, {
                        className: `mt-5 text-xl font-bold text-foreground`,
                        children: t(`contact.success.title`),
                      }),
                      (0, _.jsx)(`p`, {
                        className: `mt-2 max-w-sm text-sm text-muted-foreground`,
                        children: t(`contact.success.sub`),
                      }),
                      (0, _.jsx)(`button`, {
                        type: `button`,
                        onClick: () => {
                          (O(!1), i(``), m(``), S(``), b(`student`));
                        },
                        className: `hover-press mt-6 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-bold text-foreground hover:bg-secondary`,
                        children: t(`contact.success.again`),
                      }),
                    ],
                  })
                : (0, _.jsxs)(`form`, {
                    className: `space-y-5`,
                    onSubmit: k,
                    noValidate: !0,
                    children: [
                      (0, _.jsxs)(`div`, {
                        className: `grid gap-5 sm:grid-cols-2`,
                        children: [
                          (0, _.jsxs)(`div`, {
                            children: [
                              (0, _.jsx)(`label`, {
                                htmlFor: `name`,
                                className: `mb-2 block text-sm font-semibold text-foreground`,
                                children: t(`contact.form.name`),
                              }),
                              (0, _.jsx)(`input`, {
                                id: `name`,
                                value: n,
                                onChange: (e) => i(e.target.value),
                                className: `h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary`,
                              }),
                              C.name &&
                                (0, _.jsx)(`p`, {
                                  className: `mt-1.5 text-xs text-destructive`,
                                  children: C.name,
                                }),
                            ],
                          }),
                          (0, _.jsxs)(`div`, {
                            children: [
                              (0, _.jsx)(`label`, {
                                htmlFor: `email`,
                                className: `mb-2 block text-sm font-semibold text-foreground`,
                                children: t(`contact.form.email`),
                              }),
                              (0, _.jsx)(`input`, {
                                id: `email`,
                                type: `email`,
                                value: p,
                                onChange: (e) => m(e.target.value),
                                className: `h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary`,
                              }),
                              C.email &&
                                (0, _.jsx)(`p`, {
                                  className: `mt-1.5 text-xs text-destructive`,
                                  children: C.email,
                                }),
                            ],
                          }),
                        ],
                      }),
                      (0, _.jsxs)(`div`, {
                        children: [
                          (0, _.jsx)(`label`, {
                            htmlFor: `topic`,
                            className: `mb-2 block text-sm font-semibold text-foreground`,
                            children: t(`contact.form.topic`),
                          }),
                          (0, _.jsx)(`select`, {
                            id: `topic`,
                            value: h,
                            onChange: (e) => b(e.target.value),
                            className: `h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary`,
                            children: v.map((e) =>
                              (0, _.jsx)(
                                `option`,
                                { value: e, children: t(`contact.form.topics.${e}`) },
                                e,
                              ),
                            ),
                          }),
                        ],
                      }),
                      (0, _.jsxs)(`div`, {
                        children: [
                          (0, _.jsx)(`label`, {
                            htmlFor: `message`,
                            className: `mb-2 block text-sm font-semibold text-foreground`,
                            children: t(`contact.form.message`),
                          }),
                          (0, _.jsx)(`textarea`, {
                            id: `message`,
                            rows: 5,
                            value: x,
                            onChange: (e) => S(e.target.value),
                            placeholder: t(`contact.form.messagePlaceholder`),
                            className: `w-full resize-none rounded-xl border border-border bg-background p-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary`,
                          }),
                          C.message &&
                            (0, _.jsx)(`p`, {
                              className: `mt-1.5 text-xs text-destructive`,
                              children: C.message,
                            }),
                        ],
                      }),
                      (0, _.jsxs)(`button`, {
                        type: `submit`,
                        disabled: T,
                        className: `btn-shine hover-press inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground disabled:opacity-60 sm:w-auto`,
                        children: [
                          (0, _.jsx)(l, { className: `size-4` }),
                          t(T ? `contact.form.sending` : `contact.form.submit`),
                        ],
                      }),
                    ],
                  }),
            }),
          }),
          (0, _.jsx)(d, {
            delay: 0.08,
            children: (0, _.jsxs)(`div`, {
              className: `space-y-4`,
              children: [
                (0, _.jsxs)(`div`, {
                  className: `shadow-elevation-1 rounded-2xl border border-border bg-card p-6`,
                  children: [
                    (0, _.jsx)(`span`, {
                      className: `flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary`,
                      children: (0, _.jsx)(c, { className: `size-5` }),
                    }),
                    (0, _.jsx)(`h2`, {
                      className: `mt-3 text-sm font-bold text-foreground`,
                      children: t(`contact.sidebar.emailTitle`),
                    }),
                    (0, _.jsx)(`p`, {
                      className: `mt-1 text-xs text-muted-foreground`,
                      children: t(`contact.sidebar.emailSub`),
                    }),
                    (0, _.jsx)(`a`, {
                      href: `mailto:support@academia.app`,
                      className: `mt-3 inline-block text-sm font-bold text-primary hover:underline`,
                      dir: `ltr`,
                      children: `support@academia.app`,
                    }),
                  ],
                }),
                (0, _.jsxs)(`div`, {
                  className: `shadow-elevation-1 rounded-2xl border border-border bg-card p-6`,
                  children: [
                    (0, _.jsx)(`span`, {
                      className: `flex size-10 items-center justify-center rounded-xl bg-success/12 text-success`,
                      children: (0, _.jsx)(a, { className: `size-5` }),
                    }),
                    (0, _.jsx)(`h2`, {
                      className: `mt-3 text-sm font-bold text-foreground`,
                      children: t(`contact.sidebar.responseTitle`),
                    }),
                    (0, _.jsx)(`p`, {
                      className: `mt-1 text-xs text-muted-foreground`,
                      children: t(`contact.sidebar.responseSub`),
                    }),
                  ],
                }),
                (0, _.jsxs)(`div`, {
                  className: `shadow-elevation-1 rounded-2xl border border-border bg-card p-6`,
                  children: [
                    (0, _.jsx)(`span`, {
                      className: `flex size-10 items-center justify-center rounded-xl bg-info/12 text-info`,
                      children: (0, _.jsx)(o, { className: `size-5` }),
                    }),
                    (0, _.jsx)(`h2`, {
                      className: `mt-3 text-sm font-bold text-foreground`,
                      children: t(`contact.sidebar.helpTitle`),
                    }),
                    (0, _.jsx)(`p`, {
                      className: `mt-1 text-xs text-muted-foreground`,
                      children: t(`contact.sidebar.helpSub`),
                    }),
                    (0, _.jsx)(e, {
                      to: `/help`,
                      className: `mt-3 inline-block text-sm font-bold text-primary hover:underline`,
                      children: t(`contact.sidebar.helpCta`),
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
export { b as component };
