import { C as e, R as t, ht as n, j as r, u as i, vt as a } from "./rbac-static-data-Cz2qa6wH.js";
import { i as o, n as s } from "./auth-middleware-CmTSOr_x.js";
import { t as c } from "./useMutation-CfRTvAO7.js";
import { i as ee, l, u } from "./dynamic-icon-fBQNzGz-.js";
import { t as te } from "./check-CJTwoqRt.js";
import { t as d } from "./loader-circle-DYrBHP0C.js";
import { t as f } from "./button-m-Eg43IZ.js";
import { B as p, i as m } from "./index-CUZEShOB.js";
import { n as h } from "./use-access-DbwD014U.js";
import { n as g } from "./guard-B5vrll8Q.js";
import { a as _, i as v, l as ne, n as re, r as ie, t as ae } from "./kit-D226f5oO.js";
import { t as y } from "./input-DhAlVvjJ.js";
import { a as oe, i as se, n as b, o as x, r as S, t as C } from "./dialog-C80UddLn.js";
import { t as w } from "./switch-CqLwSyxI.js";
import {
  a as T,
  c as E,
  i as D,
  n as O,
  o as k,
  r as A,
  s as j,
  t as M,
} from "./alert-dialog-C95lx8dr.js";
import { c as N, d as P, r as F } from "./teacher-followup.functions-CXAWCRrQ.js";
var I = a(n()),
  L = t();
function R() {
  return (0, L.jsx)(g, { pageKey: `teacher_grading`, children: (0, L.jsx)(B, {}) });
}
var z = { studentName: ``, itemTitle: ``, submittedLabel: ``, status: `بانتظار`, overdue: !1 };
function B() {
  let t = i(),
    n = r(),
    { can: a } = h(),
    g = o(N),
    R = o(P),
    B = o(F),
    [V, H] = (0, I.useState)(!1),
    [U, W] = (0, I.useState)(null),
    [G, K] = (0, I.useState)(z),
    [q, J] = (0, I.useState)(null),
    { data: ce, isLoading: le } = s({ queryKey: [`grading-items`], queryFn: () => g() }),
    Y = () => n.invalidateQueries({ queryKey: [`grading-items`] }),
    X = ce ?? [],
    Z = (0, I.useMemo)(
      () => ({
        pending: X.filter((e) => e.status === `بانتظار`).length,
        graded: X.filter((e) => e.status === `مُصحّح`).length,
        overdue: X.filter((e) => e.overdue).length,
      }),
      [X],
    ),
    Q = c({
      mutationFn: () => R({ data: { ...G, id: U ?? void 0 } }),
      onSuccess: () => {
        (Y(), H(!1), p.success(t(`تم الحفظ`, `Saved successfully`)));
      },
      onError: (n) => p.error(e(n, t(`تعذّر الحفظ`, `Failed to save`))),
    }),
    ue = c({
      mutationFn: (e) => R({ data: { ...e, status: `مُصحّح`, overdue: !1 } }),
      onSuccess: () => {
        (Y(), p.success(t(`تم التصحيح`, `Marked as graded`)));
      },
      onError: (n) => p.error(e(n, t(`تعذّر التحديث`, `Failed to update`))),
    }),
    de = c({
      mutationFn: (e) => B({ data: { id: e } }),
      onSuccess: () => {
        (Y(), J(null), p.success(t(`تم الحذف`, `Deleted successfully`)));
      },
      onError: (n) => p.error(e(n, t(`تعذّر الحذف`, `Failed to delete`))),
    });
  function $(e) {
    (W(e?.id ?? null),
      K(
        e
          ? {
              studentName: e.studentName,
              itemTitle: e.itemTitle,
              submittedLabel: e.submittedLabel,
              status: e.status,
              overdue: e.overdue,
            }
          : z,
      ),
      H(!0));
  }
  return (0, L.jsxs)(ae, {
    title: t(`التصحيح`, `Grading`),
    icon: `PenSquare`,
    subtitle: t(
      m,
      `The grading queue: essay answers and uploaded files, with per-student feedback.`,
    ),
    children: [
      (0, L.jsx)(ne, {
        items: [
          { icon: `PenSquare`, label: t(`بانتظار التصحيح`, `Pending`), value: String(Z.pending) },
          { icon: `CheckCheck`, label: t(`مُصحّحة`, `Graded`), value: String(Z.graded) },
          {
            icon: `Clock`,
            label: t(`متوسط وقت التصحيح`, `Avg. time`),
            value: t(`3.4 د`, `3.4 min`),
          },
          { icon: `AlertTriangle`, label: t(`متأخّرة`, `Overdue`), value: String(Z.overdue) },
        ],
      }),
      (0, L.jsx)(_, {
        title: t(`طابور التصحيح`, `Grading queue`),
        icon: `PenSquare`,
        action: a(`teacher_grading`, `show_add_form`)
          ? (0, L.jsxs)(f, {
              size: `sm`,
              onClick: () => $(null),
              children: [(0, L.jsx)(l, { className: `size-4` }), t(`إضافة عنصر`, `Add item`)],
            })
          : void 0,
        children: le
          ? (0, L.jsx)(`div`, {
              className: `flex justify-center py-8`,
              children: (0, L.jsx)(d, { className: `size-5 animate-spin text-primary` }),
            })
          : X.length
            ? (0, L.jsx)(ie, {
                head: [
                  t(`الطالب`, `Student`),
                  t(`العمل`, `Item`),
                  t(`أُرسل`, `Submitted`),
                  t(`الحالة`, `Status`),
                  t(``, ``),
                ],
                rows: X.map((e) => [
                  e.studentName,
                  e.itemTitle,
                  e.submittedLabel,
                  (0, L.jsx)(
                    re,
                    {
                      tone: e.status === `مُصحّح` ? `success` : e.overdue ? `danger` : `primary`,
                      children: t(e.status, e.status === `مُصحّح` ? `Graded` : `Pending`),
                    },
                    e.id,
                  ),
                  (0, L.jsxs)(
                    `div`,
                    {
                      className: `flex items-center justify-end gap-1`,
                      children: [
                        a(`teacher_grading`, `edit`) &&
                          e.status !== `مُصحّح` &&
                          (0, L.jsx)(f, {
                            size: `icon`,
                            variant: `ghost`,
                            className: `text-success`,
                            onClick: () => ue.mutate(e),
                            children: (0, L.jsx)(te, { className: `size-4` }),
                          }),
                        a(`teacher_grading`, `edit`) &&
                          (0, L.jsx)(f, {
                            size: `icon`,
                            variant: `ghost`,
                            onClick: () => $(e),
                            children: (0, L.jsx)(u, { className: `size-4` }),
                          }),
                        a(`teacher_grading`, `delete`) &&
                          (0, L.jsx)(f, {
                            size: `icon`,
                            variant: `ghost`,
                            className: `text-destructive`,
                            onClick: () => J(e),
                            children: (0, L.jsx)(ee, { className: `size-4` }),
                          }),
                      ],
                    },
                    `${e.id}-actions`,
                  ),
                ]),
              })
            : (0, L.jsx)(v, { icon: `PenSquare`, text: t(`الطابور فاضي 🎉`, `Queue is empty 🎉`) }),
      }),
      (0, L.jsx)(C, {
        open: V,
        onOpenChange: H,
        children: (0, L.jsxs)(b, {
          className: `text-start`,
          children: [
            (0, L.jsx)(se, {
              children: (0, L.jsx)(oe, {
                children: U ? t(`تعديل عنصر`, `Edit item`) : t(`إضافة عنصر`, `Add item`),
              }),
            }),
            (0, L.jsxs)(`div`, {
              className: `grid gap-4 sm:grid-cols-2`,
              children: [
                (0, L.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, L.jsx)(x, { htmlFor: `gr-student`, children: t(`الطالب`, `Student`) }),
                    (0, L.jsx)(y, {
                      id: `gr-student`,
                      value: G.studentName,
                      onChange: (e) => K((t) => ({ ...t, studentName: e.target.value })),
                    }),
                  ],
                }),
                (0, L.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, L.jsx)(x, { htmlFor: `gr-item`, children: t(`العمل`, `Item`) }),
                    (0, L.jsx)(y, {
                      id: `gr-item`,
                      value: G.itemTitle,
                      onChange: (e) => K((t) => ({ ...t, itemTitle: e.target.value })),
                    }),
                  ],
                }),
                (0, L.jsxs)(`div`, {
                  className: `space-y-1.5 sm:col-span-2`,
                  children: [
                    (0, L.jsx)(x, {
                      htmlFor: `gr-submitted`,
                      children: t(`تاريخ الإرسال`, `Submitted`),
                    }),
                    (0, L.jsx)(y, {
                      id: `gr-submitted`,
                      value: G.submittedLabel,
                      onChange: (e) => K((t) => ({ ...t, submittedLabel: e.target.value })),
                    }),
                  ],
                }),
                (0, L.jsxs)(`div`, {
                  className: `flex items-center gap-2 sm:col-span-2`,
                  children: [
                    (0, L.jsx)(w, {
                      id: `gr-overdue`,
                      checked: G.overdue,
                      onCheckedChange: (e) => K((t) => ({ ...t, overdue: e })),
                    }),
                    (0, L.jsx)(x, { htmlFor: `gr-overdue`, children: t(`متأخّر`, `Overdue`) }),
                  ],
                }),
              ],
            }),
            (0, L.jsxs)(S, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, L.jsx)(f, {
                  onClick: () => Q.mutate(),
                  disabled: Q.isPending || !G.studentName.trim() || !G.itemTitle.trim(),
                  children: t(`حفظ`, `Save`),
                }),
                (0, L.jsx)(f, {
                  variant: `outline`,
                  onClick: () => H(!1),
                  children: t(`إلغاء`, `Cancel`),
                }),
              ],
            }),
          ],
        }),
      }),
      (0, L.jsx)(M, {
        open: !!q,
        onOpenChange: (e) => !e && J(null),
        children: (0, L.jsxs)(D, {
          className: `text-start`,
          children: [
            (0, L.jsxs)(j, {
              children: [
                (0, L.jsx)(E, { children: t(`حذف هذا العنصر؟`, `Delete this item?`) }),
                (0, L.jsx)(T, {
                  children: t(`لا يمكن التراجع عن هذا الإجراء.`, `This action cannot be undone.`),
                }),
              ],
            }),
            (0, L.jsxs)(k, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, L.jsx)(O, {
                  onClick: () => q && de.mutate(q.id),
                  children: t(`حذف`, `Delete`),
                }),
                (0, L.jsx)(A, { children: t(`إلغاء`, `Cancel`) }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
export { R as component };
