import { C as e, R as t, ht as n, j as ee, u as te, vt as r } from "./rbac-static-data-Cz2qa6wH.js";
import { i, n as a } from "./auth-middleware-CmTSOr_x.js";
import { t as o } from "./useMutation-CfRTvAO7.js";
import { i as ne, l as s, u as c } from "./dynamic-icon-fBQNzGz-.js";
import { t as re } from "./loader-circle-DYrBHP0C.js";
import { t as l } from "./button-m-Eg43IZ.js";
import { B as u, a as ie } from "./index-CUZEShOB.js";
import { n as ae } from "./use-access-DbwD014U.js";
import { n as d } from "./guard-B5vrll8Q.js";
import { a as oe, i as f, l as p, n as m, r as h, t as g } from "./kit-D226f5oO.js";
import { t as _ } from "./input-DhAlVvjJ.js";
import { a as se, i as v, n as ce, o as y, r as le, t as ue } from "./dialog-C80UddLn.js";
import {
  a as de,
  c as fe,
  i as b,
  n as x,
  o as S,
  r as C,
  s as w,
  t as T,
} from "./alert-dialog-C95lx8dr.js";
import { a as E, i as D, n as O, r as k, t as A } from "./select-CjwHz5Zu.js";
import { a as j, n as M, s as N, u as P } from "./teacher-followup.functions-CXAWCRrQ.js";
var F = r(n()),
  I = t();
function L() {
  return (0, I.jsx)(d, { pageKey: `teacher_earnings`, children: (0, I.jsx)(z, {}) });
}
var R = { dateLabel: ``, description: ``, amount: `0`, status: `قيد التنفيذ` };
function z() {
  let t = te(),
    n = ee(),
    { can: r } = ae(),
    d = i(N),
    L = i(P),
    z = i(M),
    B = i(j),
    V = a({ queryKey: [`earning-transactions`], queryFn: () => d() }),
    H = a({ queryKey: [`earnings-settings`], queryFn: () => B() }),
    [pe, U] = (0, F.useState)(!1),
    [W, me] = (0, F.useState)(null),
    [G, K] = (0, F.useState)(R),
    [q, J] = (0, F.useState)(null),
    he = V.isLoading || H.isLoading,
    Y = V.data ?? [],
    ge = H.data ?? { platformFeePercent: 15 },
    X = (0, F.useMemo)(
      () => ({
        available: Y.filter((e) => e.status === `مؤكد`).reduce((e, t) => e + t.amount, 0),
        pending: Y.filter((e) => e.status === `قيد التنفيذ` && e.amount > 0).reduce(
          (e, t) => e + t.amount,
          0,
        ),
        paidOut: Math.abs(
          Y.filter((e) => e.amount < 0 && e.status === `مؤكد`).reduce((e, t) => e + t.amount, 0),
        ),
      }),
      [Y],
    ),
    Z = () => n.invalidateQueries({ queryKey: [`earning-transactions`] }),
    Q = o({
      mutationFn: () => L({ data: { ...G, id: W ?? void 0, amount: Number(G.amount) || 0 } }),
      onSuccess: () => {
        (Z(), U(!1), u.success(t(`تم الحفظ`, `Saved successfully`)));
      },
      onError: (n) => u.error(e(n, t(`تعذّر الحفظ`, `Failed to save`))),
    }),
    _e = o({
      mutationFn: (e) => z({ data: { id: e } }),
      onSuccess: () => {
        (Z(), J(null), u.success(t(`تم الحذف`, `Deleted successfully`)));
      },
      onError: (n) => u.error(e(n, t(`تعذّر الحذف`, `Failed to delete`))),
    });
  function $(e) {
    (me(e?.id ?? null),
      K(
        e
          ? {
              dateLabel: e.dateLabel,
              description: e.description,
              amount: String(e.amount),
              status: e.status,
            }
          : R,
      ),
      U(!0));
  }
  return (0, I.jsxs)(g, {
    title: t(`الأرباح`, `Earnings`),
    icon: `Wallet`,
    subtitle: t(ie, `Your earnings, platform fee and payout requests — all transparent.`),
    children: [
      he
        ? (0, I.jsx)(`div`, {
            className: `flex justify-center py-10`,
            children: (0, I.jsx)(re, { className: `size-6 animate-spin text-primary` }),
          })
        : (0, I.jsxs)(I.Fragment, {
            children: [
              (0, I.jsx)(p, {
                items: [
                  {
                    icon: `Wallet`,
                    label: t(`الرصيد المتاح`, `Available`),
                    value: t(`${X.available} ₪`, `${X.available} ILS`),
                  },
                  {
                    icon: `Hourglass`,
                    label: t(`قيد التسوية`, `Pending`),
                    value: t(`${X.pending} ₪`, `${X.pending} ILS`),
                  },
                  {
                    icon: `BadgePercent`,
                    label: t(`عمولة المنصة`, `Platform fee`),
                    value: `${ge.platformFeePercent}%`,
                  },
                  {
                    icon: `Banknote`,
                    label: t(`إجمالي مسحوب`, `Total paid out`),
                    value: t(`${X.paidOut} ₪`, `${X.paidOut} ILS`),
                  },
                ],
              }),
              (0, I.jsx)(oe, {
                title: t(`آخر الحركات`, `Recent transactions`),
                icon: `Receipt`,
                action: r(`teacher_earnings`, `show_add_form`)
                  ? (0, I.jsxs)(l, {
                      size: `sm`,
                      onClick: () => $(null),
                      children: [
                        (0, I.jsx)(s, { className: `size-4` }),
                        t(`إضافة حركة`, `Add transaction`),
                      ],
                    })
                  : void 0,
                children: Y.length
                  ? (0, I.jsx)(h, {
                      head: [
                        t(`التاريخ`, `Date`),
                        t(`الوصف`, `Description`),
                        t(`المبلغ`, `Amount`),
                        t(`الحالة`, `Status`),
                        t(``, ``),
                      ],
                      rows: Y.map((e) => [
                        e.dateLabel,
                        e.description,
                        (0, I.jsx)(
                          `span`,
                          {
                            className: e.amount >= 0 ? `text-success` : `text-destructive`,
                            children: t(
                              `${e.amount >= 0 ? `+` : ``}${e.amount} ₪`,
                              `${e.amount >= 0 ? `+` : ``}${e.amount} ILS`,
                            ),
                          },
                          `${e.id}-amt`,
                        ),
                        (0, I.jsx)(
                          m,
                          {
                            tone: e.status === `مؤكد` ? `success` : `primary`,
                            children: t(e.status, e.status === `مؤكد` ? `Cleared` : `Processing`),
                          },
                          e.id,
                        ),
                        (0, I.jsxs)(
                          `div`,
                          {
                            className: `flex items-center justify-end gap-1`,
                            children: [
                              r(`teacher_earnings`, `edit`) &&
                                (0, I.jsx)(l, {
                                  size: `icon`,
                                  variant: `ghost`,
                                  onClick: () => $(e),
                                  children: (0, I.jsx)(c, { className: `size-4` }),
                                }),
                              r(`teacher_earnings`, `delete`) &&
                                (0, I.jsx)(l, {
                                  size: `icon`,
                                  variant: `ghost`,
                                  className: `text-destructive`,
                                  onClick: () => J(e),
                                  children: (0, I.jsx)(ne, { className: `size-4` }),
                                }),
                            ],
                          },
                          `${e.id}-actions`,
                        ),
                      ]),
                    })
                  : (0, I.jsx)(f, {
                      icon: `Receipt`,
                      text: t(`لا حركات بعد.`, `No transactions yet.`),
                    }),
              }),
            ],
          }),
      (0, I.jsx)(ue, {
        open: pe,
        onOpenChange: U,
        children: (0, I.jsxs)(ce, {
          className: `text-start`,
          children: [
            (0, I.jsx)(v, {
              children: (0, I.jsx)(se, {
                children: W
                  ? t(`تعديل حركة`, `Edit transaction`)
                  : t(`إضافة حركة`, `Add transaction`),
              }),
            }),
            (0, I.jsxs)(`div`, {
              className: `grid gap-4 sm:grid-cols-2`,
              children: [
                (0, I.jsxs)(`div`, {
                  className: `space-y-1.5 sm:col-span-2`,
                  children: [
                    (0, I.jsx)(y, { htmlFor: `et-desc`, children: t(`الوصف`, `Description`) }),
                    (0, I.jsx)(_, {
                      id: `et-desc`,
                      value: G.description,
                      onChange: (e) => K((t) => ({ ...t, description: e.target.value })),
                    }),
                  ],
                }),
                (0, I.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, I.jsx)(y, { htmlFor: `et-date`, children: t(`التاريخ`, `Date`) }),
                    (0, I.jsx)(_, {
                      id: `et-date`,
                      value: G.dateLabel,
                      onChange: (e) => K((t) => ({ ...t, dateLabel: e.target.value })),
                    }),
                  ],
                }),
                (0, I.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, I.jsx)(y, {
                      htmlFor: `et-amount`,
                      children: t(`المبلغ (سالب للسحب)`, `Amount (negative for payout)`),
                    }),
                    (0, I.jsx)(_, {
                      id: `et-amount`,
                      type: `number`,
                      value: G.amount,
                      onChange: (e) => K((t) => ({ ...t, amount: e.target.value })),
                    }),
                  ],
                }),
                (0, I.jsxs)(`div`, {
                  className: `space-y-1.5 sm:col-span-2`,
                  children: [
                    (0, I.jsx)(y, { children: t(`الحالة`, `Status`) }),
                    (0, I.jsxs)(A, {
                      value: G.status,
                      onValueChange: (e) => K((t) => ({ ...t, status: e })),
                      children: [
                        (0, I.jsx)(D, { children: (0, I.jsx)(E, {}) }),
                        (0, I.jsxs)(O, {
                          children: [
                            (0, I.jsx)(k, {
                              value: `قيد التنفيذ`,
                              children: t(`قيد التنفيذ`, `Processing`),
                            }),
                            (0, I.jsx)(k, { value: `مؤكد`, children: t(`مؤكد`, `Cleared`) }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, I.jsxs)(le, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, I.jsx)(l, {
                  onClick: () => Q.mutate(),
                  disabled: Q.isPending || !G.description.trim(),
                  children: t(`حفظ`, `Save`),
                }),
                (0, I.jsx)(l, {
                  variant: `outline`,
                  onClick: () => U(!1),
                  children: t(`إلغاء`, `Cancel`),
                }),
              ],
            }),
          ],
        }),
      }),
      (0, I.jsx)(T, {
        open: !!q,
        onOpenChange: (e) => !e && J(null),
        children: (0, I.jsxs)(b, {
          className: `text-start`,
          children: [
            (0, I.jsxs)(w, {
              children: [
                (0, I.jsx)(fe, { children: t(`حذف هذه الحركة؟`, `Delete this transaction?`) }),
                (0, I.jsx)(de, {
                  children: t(`لا يمكن التراجع عن هذا الإجراء.`, `This action cannot be undone.`),
                }),
              ],
            }),
            (0, I.jsxs)(S, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, I.jsx)(x, {
                  onClick: () => q && _e.mutate(q.id),
                  children: t(`حذف`, `Delete`),
                }),
                (0, I.jsx)(C, { children: t(`إلغاء`, `Cancel`) }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
export { L as component };
