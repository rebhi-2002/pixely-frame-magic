import { M as e, R as t, ht as n, k as r, u as i, vt as a } from "./rbac-static-data-Cz2qa6wH.js";
import { b as o, h as s, n as c } from "./dynamic-icon-fBQNzGz-.js";
import { t as l } from "./check-CJTwoqRt.js";
import { t as u } from "./button-m-Eg43IZ.js";
import { t as d } from "./users-jSLIC1co.js";
import "./index-CUZEShOB.js";
import { n as f } from "./feedback-states-BVu9vOA0.js";
import { n as p, r as m } from "./types-BaQ7EMJK.js";
import { n as h } from "./auth-shell-DzmMbYa2.js";
var g = a(n()),
  _ = t();
p({ fullName: m().trim().min(2), email: m().trim().email(), password: m().min(6) });
function v() {
  let { t } = r(),
    n = i(),
    [a, l] = (0, g.useState)(null),
    [p, m] = (0, g.useState)(!1),
    [v, b] = (0, g.useState)(``),
    [x, S] = (0, g.useState)(``),
    [C, w] = (0, g.useState)(``);
  return a
    ? (0, _.jsxs)(h, {
        icon:
          a === `student`
            ? (0, _.jsx)(s, { className: `size-5` })
            : (0, _.jsx)(d, { className: `size-5` }),
        title: t(`authPages.signup.h1`),
        subtitle: `${t(`authPages.signup.chosen`)}: ${t(`authPages.signup.roles.${a}.t`)}`,
        children: [
          (0, _.jsxs)(`button`, {
            type: `button`,
            onClick: () => l(null),
            className: `mb-5 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground`,
            children: [
              (0, _.jsx)(o, { className: `size-3.5 rtl:rotate-180` }),
              t(`authPages.signup.change`),
            ],
          }),
          (0, _.jsx)(f, {
            title: n(`التسجيل قيد التجهيز`, `Sign-up is being prepared`),
            description: n(
              `تسجيل الدخول يعمل حاليًا. سنفعّل إنشاء الحسابات بعد اكتمال مسار التسجيل في الباك إند.`,
              `Sign-in is available now. Account creation will open when the backend registration flow is ready.`,
            ),
            action: (0, _.jsx)(u, {
              asChild: !0,
              variant: `outline`,
              children: (0, _.jsx)(e, {
                to: `/login`,
                children: n(`الذهاب لتسجيل الدخول`, `Go to sign in`),
              }),
            }),
          }),
          (0, _.jsxs)(`div`, {
            className: `mt-6 space-y-1.5 text-center text-xs text-muted-foreground`,
            children: [
              (0, _.jsxs)(`p`, {
                children: [
                  t(`authPages.signup.teacherHint`),
                  ` `,
                  (0, _.jsx)(e, {
                    to: `/teacher/register`,
                    className: `font-bold text-primary hover:underline`,
                    children: t(`authPages.signup.teacherLink`),
                  }),
                ],
              }),
              (0, _.jsxs)(`p`, {
                children: [
                  t(`authPages.signup.haveAccount`),
                  ` `,
                  (0, _.jsx)(e, {
                    to: `/login`,
                    className: `font-bold text-primary hover:underline`,
                    children: t(`authPages.signup.loginLink`),
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    : (0, _.jsxs)(h, {
        title: t(`authPages.signup.h1`),
        subtitle: t(`authPages.signup.sub`),
        wide: !0,
        children: [
          (0, _.jsxs)(`div`, {
            className: `grid gap-3`,
            children: [
              (0, _.jsx)(y, {
                icon: (0, _.jsx)(s, { className: `size-5` }),
                title: t(`authPages.signup.roles.student.t`),
                text: t(`authPages.signup.roles.student.d`),
                onClick: () => l(`student`),
              }),
              (0, _.jsx)(y, {
                icon: (0, _.jsx)(d, { className: `size-5` }),
                title: t(`authPages.signup.roles.parent.t`),
                text: t(`authPages.signup.roles.parent.d`),
                onClick: () => l(`parent`),
              }),
              (0, _.jsxs)(e, {
                to: `/teacher/register`,
                className: `flex items-start gap-3 rounded-2xl border border-border bg-background p-4 text-start transition-colors hover:border-primary/50`,
                children: [
                  (0, _.jsx)(`span`, {
                    className: `flex size-10 shrink-0 items-center justify-center rounded-xl bg-info/12 text-info`,
                    children: (0, _.jsx)(c, { className: `size-5` }),
                  }),
                  (0, _.jsxs)(`span`, {
                    className: `min-w-0`,
                    children: [
                      (0, _.jsx)(`span`, {
                        className: `block font-bold text-foreground`,
                        children: t(`authPages.signup.roles.teacher.t`),
                      }),
                      (0, _.jsx)(`span`, {
                        className: `mt-1 block text-sm text-muted-foreground`,
                        children: t(`authPages.signup.roles.teacher.d`),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, _.jsxs)(`p`, {
            className: `mt-6 text-center text-xs text-muted-foreground`,
            children: [
              t(`authPages.signup.haveAccount`),
              ` `,
              (0, _.jsx)(e, {
                to: `/login`,
                className: `font-bold text-primary hover:underline`,
                children: t(`authPages.signup.loginLink`),
              }),
            ],
          }),
        ],
      });
}
function y({ icon: e, title: t, text: n, onClick: r }) {
  return (0, _.jsxs)(`button`, {
    type: `button`,
    onClick: r,
    className: `group flex items-start gap-3 rounded-2xl border border-border bg-background p-4 text-start transition-colors hover:border-primary/50`,
    children: [
      (0, _.jsx)(`span`, {
        className: `flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary`,
        children: e,
      }),
      (0, _.jsxs)(`span`, {
        className: `min-w-0 flex-1`,
        children: [
          (0, _.jsx)(`span`, { className: `block font-bold text-foreground`, children: t }),
          (0, _.jsx)(`span`, {
            className: `mt-1 block text-sm text-muted-foreground`,
            children: n,
          }),
        ],
      }),
      (0, _.jsx)(l, {
        className: `mt-1 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100`,
      }),
    ],
  });
}
export { v as component };
