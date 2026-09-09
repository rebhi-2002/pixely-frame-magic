import { M as e, R as t, ht as n, k as r, vt as i } from "./rbac-static-data-Cz2qa6wH.js";
import { t as a } from "./useNavigate-D8IP3eLF.js";
import { t as o } from "./shield-check-BIFwMH54.js";
import { B as s } from "./index-CUZEShOB.js";
import { n as c, t as l } from "./auth-shell-DzmMbYa2.js";
var u = i(n()),
  d = t();
function f() {
  let { t } = r();
  a();
  let [n, i] = (0, u.useState)(null),
    [f, p] = (0, u.useState)(``),
    [m, h] = (0, u.useState)(``),
    [g, _] = (0, u.useState)(!1);
  (0, u.useEffect)(() => {
    i(!1);
  }, []);
  async function v(e) {
    if ((e.preventDefault(), f.length < 6)) {
      s.error(t(`authPages.signup.passwordHint`));
      return;
    }
    if (f !== m) {
      s.error(t(`authPages.reset.mismatch`));
      return;
    }
    (_(!0),
      _(!1),
      s.error(`إعادة تعيين كلمة المرور غير متاحة حالياً — قيد الربط مع الباك اند الجديد.`));
  }
  return (0, d.jsx)(c, {
    icon: (0, d.jsx)(o, { className: `size-5` }),
    title: t(`authPages.reset.h1`),
    subtitle: t(n === !1 ? `authPages.reset.invalid` : `authPages.reset.sub`),
    children:
      n === !1
        ? (0, d.jsx)(e, {
            to: `/forgot-password`,
            className: `inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90`,
            children: t(`authPages.reset.requestNew`),
          })
        : (0, d.jsxs)(`form`, {
            onSubmit: v,
            className: `space-y-4`,
            children: [
              (0, d.jsx)(l, {
                id: `password`,
                label: t(`authPages.reset.password`),
                type: `password`,
                value: f,
                onChange: p,
                autoComplete: `new-password`,
              }),
              (0, d.jsx)(l, {
                id: `confirm`,
                label: t(`authPages.reset.confirm`),
                type: `password`,
                value: m,
                onChange: h,
                autoComplete: `new-password`,
              }),
              (0, d.jsx)(`button`, {
                type: `submit`,
                disabled: g || n === null,
                className: `w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60`,
                children: t(g ? `common.loading` : `authPages.reset.submit`),
              }),
            ],
          }),
  });
}
export { f as component };
