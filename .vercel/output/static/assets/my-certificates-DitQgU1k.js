import { C as e, R as t, ht as n, j as r, u as i, vt as a } from "./rbac-static-data-Cz2qa6wH.js";
import { i as o, n as s } from "./auth-middleware-CmTSOr_x.js";
import { t as c } from "./useMutation-CfRTvAO7.js";
import { i as ee, l as te, u as l } from "./dynamic-icon-fBQNzGz-.js";
import { t as u } from "./loader-circle-DYrBHP0C.js";
import { t as d } from "./button-m-Eg43IZ.js";
import { B as f, T as p } from "./index-CUZEShOB.js";
import { n as m } from "./use-access-DbwD014U.js";
import { n as h } from "./guard-B5vrll8Q.js";
import { a as g, c as _, i as ne, l as re, t as ie } from "./kit-D226f5oO.js";
import { t as v } from "./input-DhAlVvjJ.js";
import { a as ae, i as oe, n as se, o as y, r as ce, t as b } from "./dialog-C80UddLn.js";
import {
  a as x,
  c as S,
  i as C,
  n as w,
  o as T,
  r as E,
  s as D,
  t as O,
} from "./alert-dialog-C95lx8dr.js";
import { f as k, n as A, s as j } from "./student-evaluation.functions-B7QY_1a_.js";
import { a as M, i as N, n as P, r as F, t as le } from "./select-CjwHz5Zu.js";
var I = a(n()),
  L = t();
function R() {
  return (0, L.jsx)(h, { pageKey: `student_certificates`, children: (0, L.jsx)(B, {}) });
}
var z = { courseTitle: ``, code: ``, status: `صادرة`, shareCount: `0` };
function B() {
  let t = i(),
    n = r(),
    { can: a } = m(),
    h = o(j),
    R = o(k),
    B = o(A),
    [V, H] = (0, I.useState)(!1),
    [U, W] = (0, I.useState)(null),
    [G, K] = (0, I.useState)(z),
    [q, J] = (0, I.useState)(null),
    { data: ue, isLoading: de } = s({ queryKey: [`certificates`], queryFn: () => h() }),
    Y = () => n.invalidateQueries({ queryKey: [`certificates`] }),
    X = ue ?? [],
    Z = (0, I.useMemo)(() => {
      let e = X.filter((e) => e.status === `صادرة`),
        t = X.filter((e) => e.status === `قيد الإصدار`),
        n = X.reduce((e, t) => e + t.shareCount, 0);
      return { issued: e.length, pending: t.length, shares: n };
    }, [X]),
    Q = c({
      mutationFn: () =>
        R({ data: { ...G, id: U ?? void 0, shareCount: Number(G.shareCount) || 0 } }),
      onSuccess: () => {
        (Y(), H(!1), f.success(t(`تم الحفظ`, `Saved successfully`)));
      },
      onError: (n) => f.error(e(n, t(`تعذّر الحفظ`, `Failed to save`))),
    }),
    fe = c({
      mutationFn: (e) => B({ data: { id: e } }),
      onSuccess: () => {
        (Y(), J(null), f.success(t(`تم الحذف`, `Deleted successfully`)));
      },
      onError: (n) => f.error(e(n, t(`تعذّر الحذف`, `Failed to delete`))),
    });
  function $(e) {
    (W(e?.id ?? null),
      K(
        e
          ? {
              courseTitle: e.courseTitle,
              code: e.code,
              status: e.status,
              shareCount: String(e.shareCount),
            }
          : z,
      ),
      H(!0));
  }
  return (0, L.jsxs)(ie, {
    title: t(`شهاداتي`, `My certificates`),
    icon: `Award`,
    subtitle: t(p, `Your verifiable certificates — share the link and anyone can validate it.`),
    children: [
      (0, L.jsx)(re, {
        items: [
          { icon: `Award`, label: t(`شهادات`, `Certificates`), value: String(Z.issued) },
          { icon: `ShieldCheck`, label: t(`قابلة للتحقّق`, `Verifiable`), value: String(Z.issued) },
          { icon: `Share2`, label: t(`مشاركات`, `Shares`), value: String(Z.shares) },
          { icon: `Clock`, label: t(`قيد الإصدار`, `Pending`), value: String(Z.pending) },
        ],
      }),
      (0, L.jsx)(g, {
        title: t(`شهاداتك`, `Your certificates`),
        icon: `Award`,
        action: a(`student_certificates`, `show_add_form`)
          ? (0, L.jsxs)(d, {
              size: `sm`,
              onClick: () => $(null),
              children: [
                (0, L.jsx)(te, { className: `size-4` }),
                t(`إضافة شهادة`, `Add certificate`),
              ],
            })
          : void 0,
        children: de
          ? (0, L.jsx)(`div`, {
              className: `flex justify-center py-8`,
              children: (0, L.jsx)(u, { className: `size-5 animate-spin text-primary` }),
            })
          : X.length
            ? (0, L.jsx)(_, {
                rows: X.map((e) => ({
                  title: e.courseTitle,
                  meta: e.code,
                  value: t(
                    e.status === `صادرة` ? `تحقّق` : `قيد الإصدار`,
                    e.status === `صادرة` ? `Verify` : `Pending`,
                  ),
                  tone: e.status === `صادرة` ? `success` : `muted`,
                  actions: (0, L.jsxs)(`div`, {
                    className: `flex items-center gap-1`,
                    children: [
                      a(`student_certificates`, `edit`) &&
                        (0, L.jsx)(d, {
                          size: `icon`,
                          variant: `ghost`,
                          onClick: () => $(e),
                          children: (0, L.jsx)(l, { className: `size-4` }),
                        }),
                      a(`student_certificates`, `delete`) &&
                        (0, L.jsx)(d, {
                          size: `icon`,
                          variant: `ghost`,
                          className: `text-destructive`,
                          onClick: () => J(e),
                          children: (0, L.jsx)(ee, { className: `size-4` }),
                        }),
                    ],
                  }),
                })),
              })
            : (0, L.jsx)(ne, {
                icon: `Award`,
                text: t(
                  `ولا شهادة بعد — كمّل أول كورس عشان تحصلها.`,
                  `No certificates yet — finish a course to earn one.`,
                ),
              }),
      }),
      (0, L.jsx)(b, {
        open: V,
        onOpenChange: H,
        children: (0, L.jsxs)(se, {
          className: `text-start`,
          children: [
            (0, L.jsx)(oe, {
              children: (0, L.jsx)(ae, {
                children: U
                  ? t(`تعديل شهادة`, `Edit certificate`)
                  : t(`إضافة شهادة`, `Add certificate`),
              }),
            }),
            (0, L.jsxs)(`div`, {
              className: `grid gap-4 sm:grid-cols-2`,
              children: [
                (0, L.jsxs)(`div`, {
                  className: `space-y-1.5 sm:col-span-2`,
                  children: [
                    (0, L.jsx)(y, {
                      htmlFor: `cert-title`,
                      children: t(`اسم الكورس`, `Course title`),
                    }),
                    (0, L.jsx)(v, {
                      id: `cert-title`,
                      value: G.courseTitle,
                      onChange: (e) => K((t) => ({ ...t, courseTitle: e.target.value })),
                    }),
                  ],
                }),
                (0, L.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, L.jsx)(y, { htmlFor: `cert-code`, children: t(`الرمز`, `Code`) }),
                    (0, L.jsx)(v, {
                      id: `cert-code`,
                      value: G.code,
                      onChange: (e) => K((t) => ({ ...t, code: e.target.value })),
                    }),
                  ],
                }),
                (0, L.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, L.jsx)(y, { children: t(`الحالة`, `Status`) }),
                    (0, L.jsxs)(le, {
                      value: G.status,
                      onValueChange: (e) => K((t) => ({ ...t, status: e })),
                      children: [
                        (0, L.jsx)(N, { children: (0, L.jsx)(M, {}) }),
                        (0, L.jsxs)(P, {
                          children: [
                            (0, L.jsx)(F, { value: `صادرة`, children: t(`صادرة`, `Issued`) }),
                            (0, L.jsx)(F, {
                              value: `قيد الإصدار`,
                              children: t(`قيد الإصدار`, `Pending`),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, L.jsxs)(`div`, {
                  className: `space-y-1.5 sm:col-span-2`,
                  children: [
                    (0, L.jsx)(y, {
                      htmlFor: `cert-shares`,
                      children: t(`عدد المشاركات`, `Share count`),
                    }),
                    (0, L.jsx)(v, {
                      id: `cert-shares`,
                      type: `number`,
                      min: 0,
                      value: G.shareCount,
                      onChange: (e) => K((t) => ({ ...t, shareCount: e.target.value })),
                    }),
                  ],
                }),
              ],
            }),
            (0, L.jsxs)(ce, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, L.jsx)(d, {
                  onClick: () => Q.mutate(),
                  disabled: Q.isPending || !G.courseTitle.trim(),
                  children: t(`حفظ`, `Save`),
                }),
                (0, L.jsx)(d, {
                  variant: `outline`,
                  onClick: () => H(!1),
                  children: t(`إلغاء`, `Cancel`),
                }),
              ],
            }),
          ],
        }),
      }),
      (0, L.jsx)(O, {
        open: !!q,
        onOpenChange: (e) => !e && J(null),
        children: (0, L.jsxs)(C, {
          className: `text-start`,
          children: [
            (0, L.jsxs)(D, {
              children: [
                (0, L.jsx)(S, {
                  children: t(`حذف «${q?.courseTitle}»؟`, `Delete "${q?.courseTitle}"?`),
                }),
                (0, L.jsx)(x, {
                  children: t(`لا يمكن التراجع عن هذا الإجراء.`, `This action cannot be undone.`),
                }),
              ],
            }),
            (0, L.jsxs)(T, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, L.jsx)(w, {
                  onClick: () => q && fe.mutate(q.id),
                  children: t(`حذف`, `Delete`),
                }),
                (0, L.jsx)(E, { children: t(`إلغاء`, `Cancel`) }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
export { R as component };
