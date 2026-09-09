import {
  C as e,
  M as t,
  R as n,
  a as r,
  c as i,
  ht as a,
  k as o,
  p as s,
  u as c,
  v as l,
  vt as u,
  y as d,
} from "./rbac-static-data-Cz2qa6wH.js";
import { t as f } from "./useNavigate-D8IP3eLF.js";
import { r as p, t as m } from "./button-m-Eg43IZ.js";
import { B as h } from "./index-CUZEShOB.js";
import { n as g, r as _ } from "./types-BaQ7EMJK.js";
import { n as v, t as y } from "./auth-shell-DzmMbYa2.js";
var b = u(a()),
  x = n(),
  S = r.filter((e) => e.id !== `u-admin`),
  C = g({ email: _().trim().email(), password: _().min(6) });
function w() {
  let { t: n } = o(),
    a = c(),
    u = f(),
    [g, _] = (0, b.useState)(!1),
    [w, T] = (0, b.useState)(``),
    [E, D] = (0, b.useState)(``),
    [O, k] = (0, b.useState)({}),
    [A, j] = (0, b.useState)(null);
  function M(e) {
    let t = r.find((t) => t.id === e);
    (d(e),
      h.success(n(`authPages.login.success`)),
      u({ href: i(t?.role_name, t?.role_id === `r-admin`), replace: !0 }));
  }
  async function N(t) {
    (t.preventDefault(), k({}), j(null));
    let r = C.safeParse({ email: w, password: E });
    if (!r.success) {
      let e = {};
      for (let t of r.error.issues) {
        let n = t.path[0];
        (n === `email` || n === `password`) && !e[n] && (e[n] = t.message);
      }
      (k(e), h.error(a(`راجع الحقول المظللة`, `Check the highlighted fields`)));
      return;
    }
    _(!0);
    try {
      await l(r.data.email, r.data.password);
      let e = s();
      (h.success(n(`authPages.login.success`)),
        u({ href: i(e?.roleName ?? null, e?.roleId === 1), replace: !0 }));
    } catch (t) {
      let n = e(t, a(`تعذّر تسجيل الدخول`, `Sign in failed`));
      j(n);
    } finally {
      _(!1);
    }
  }
  return (0, x.jsxs)(v, {
    icon: (0, x.jsx)(p, { className: `size-5` }),
    title: n(`authPages.login.h1`),
    subtitle: n(`authPages.login.sub`),
    children: [
      (0, x.jsxs)(`form`, {
        onSubmit: N,
        className: `space-y-4`,
        children: [
          (0, x.jsx)(y, {
            id: `email`,
            label: n(`authPages.login.email`),
            type: `email`,
            value: w,
            onChange: T,
            autoComplete: `email`,
            error: O.email,
          }),
          (0, x.jsx)(y, {
            id: `password`,
            label: n(`authPages.login.password`),
            type: `password`,
            value: E,
            onChange: D,
            autoComplete: `current-password`,
            error: O.password,
          }),
          (0, x.jsx)(`div`, {
            className: `flex justify-end`,
            children: (0, x.jsx)(t, {
              to: `/forgot-password`,
              className: `text-xs font-semibold text-primary hover:underline`,
              children: n(`authPages.login.forgot`),
            }),
          }),
          A &&
            (0, x.jsx)(`div`, {
              role: `alert`,
              className: `rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm font-semibold text-destructive`,
              children: A,
            }),
          (0, x.jsx)(m, {
            type: `submit`,
            loading: g,
            className: `w-full`,
            children: n(`authPages.login.submit`),
          }),
        ],
      }),
      (0, x.jsxs)(`div`, {
        className: `mt-6 rounded-2xl border border-dashed border-border bg-secondary/40 p-3`,
        children: [
          (0, x.jsx)(`p`, {
            className: `mb-2 text-center text-xs font-bold text-muted-foreground`,
            children: a(
              `دخول سريع للتجربة (محلي بالكامل — مؤقت)`,
              `Quick test login (fully local — temporary)`,
            ),
          }),
          (0, x.jsxs)(`div`, {
            className: `flex flex-wrap justify-center gap-2`,
            children: [
              (0, x.jsx)(`button`, {
                type: `button`,
                disabled: g,
                onClick: () => M(`u-admin`),
                className: `rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:border-primary/60 hover:text-primary disabled:opacity-60`,
                children: a(`أدمن`, `Admin`),
              }),
              S.map((e) =>
                (0, x.jsx)(
                  `button`,
                  {
                    type: `button`,
                    disabled: g,
                    onClick: () => M(e.id),
                    className: `rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:border-primary/60 hover:text-primary disabled:opacity-60`,
                    children: e.role_name,
                  },
                  e.id,
                ),
              ),
            ],
          }),
        ],
      }),
      (0, x.jsxs)(`div`, {
        className: `mt-6 space-y-1.5 text-center text-xs text-muted-foreground`,
        children: [
          (0, x.jsxs)(`p`, {
            children: [
              n(`authPages.login.noAccount`),
              ` `,
              (0, x.jsx)(t, {
                to: `/signup`,
                className: `font-bold text-primary hover:underline`,
                children: n(`authPages.login.signupLink`),
              }),
            ],
          }),
          (0, x.jsxs)(`p`, {
            children: [
              n(`authPages.login.teacherHint`),
              ` `,
              (0, x.jsx)(t, {
                to: `/teacher/register`,
                className: `font-bold text-primary hover:underline`,
                children: n(`authPages.login.teacherLink`),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
export { w as component };
