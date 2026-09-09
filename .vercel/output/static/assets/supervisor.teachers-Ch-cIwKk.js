import { C as e, R as t, ht as n, j as r, u as i, vt as a } from "./rbac-static-data-Cz2qa6wH.js";
import { i as o, n as s } from "./auth-middleware-CmTSOr_x.js";
import { t as c } from "./useMutation-CfRTvAO7.js";
import { i as ee, l as te, u as l } from "./dynamic-icon-fBQNzGz-.js";
import { t as u } from "./loader-circle-DYrBHP0C.js";
import { t as d } from "./button-m-Eg43IZ.js";
import { B as f, d as ne } from "./index-CUZEShOB.js";
import { n as p } from "./use-access-DbwD014U.js";
import { n as m } from "./guard-B5vrll8Q.js";
import { a as h, i as re, l as ie, n as ae, r as oe, t as se } from "./kit-D226f5oO.js";
import { t as g } from "./input-DhAlVvjJ.js";
import { a as ce, i as le, n as ue, o as _, r as v, t as y } from "./dialog-C80UddLn.js";
import {
  a as b,
  c as x,
  i as S,
  n as C,
  o as w,
  r as T,
  s as E,
  t as D,
} from "./alert-dialog-C95lx8dr.js";
import { a as O, i as k, n as A, r as j, t as M } from "./select-CjwHz5Zu.js";
import { c as N, d as P, r as F } from "./supervisor-oversight.functions--iJBNX8a.js";
var I = a(n()),
  L = t();
function R() {
  return (0, L.jsx)(m, { pageKey: `supervisor_teachers`, children: (0, L.jsx)(V, {}) });
}
var z = {
    teacherName: ``,
    subjectName: ``,
    studentsCount: `0`,
    responseHours: `0`,
    gradingDays: `0`,
    rating: `5`,
    status: `جيد`,
  },
  B = { ممتاز: `success`, جيد: `primary`, "تأخر تصحيح": `danger` };
function V() {
  let t = i(),
    n = r(),
    { can: a } = p(),
    m = o(N),
    R = o(P),
    V = o(F),
    [H, U] = (0, I.useState)(!1),
    [W, de] = (0, I.useState)(null),
    [G, K] = (0, I.useState)(z),
    [q, J] = (0, I.useState)(null),
    { data: fe, isLoading: pe } = s({ queryKey: [`teacher-performance`], queryFn: () => m() }),
    Y = () => n.invalidateQueries({ queryKey: [`teacher-performance`] }),
    X = fe ?? [],
    Z = (0, I.useMemo)(
      () =>
        X.length
          ? {
              active: X.length,
              avgResponse: Math.round(X.reduce((e, t) => e + t.responseHours, 0) / X.length),
              avgGrading:
                Math.round((X.reduce((e, t) => e + t.gradingDays, 0) / X.length) * 10) / 10,
              avgRating: Math.round((X.reduce((e, t) => e + t.rating, 0) / X.length) * 10) / 10,
            }
          : { active: 0, avgResponse: 0, avgGrading: 0, avgRating: 0 },
      [X],
    ),
    Q = c({
      mutationFn: () =>
        R({
          data: {
            ...G,
            id: W ?? void 0,
            studentsCount: Number(G.studentsCount) || 0,
            responseHours: Number(G.responseHours) || 0,
            gradingDays: Number(G.gradingDays) || 0,
            rating: Number(G.rating) || 0,
          },
        }),
      onSuccess: () => {
        (Y(), U(!1), f.success(t(`تم الحفظ`, `Saved successfully`)));
      },
      onError: (n) => f.error(e(n, t(`تعذّر الحفظ`, `Failed to save`))),
    }),
    me = c({
      mutationFn: (e) => V({ data: { id: e } }),
      onSuccess: () => {
        (Y(), J(null), f.success(t(`تم الحذف`, `Deleted successfully`)));
      },
      onError: (n) => f.error(e(n, t(`تعذّر الحذف`, `Failed to delete`))),
    });
  function $(e) {
    (de(e?.id ?? null),
      K(
        e
          ? {
              teacherName: e.teacherName,
              subjectName: e.subjectName,
              studentsCount: String(e.studentsCount),
              responseHours: String(e.responseHours),
              gradingDays: String(e.gradingDays),
              rating: String(e.rating),
              status: e.status,
            }
          : z,
      ),
      U(!0));
  }
  return (0, L.jsxs)(se, {
    title: t(`المعلمون`, `Teachers`),
    icon: `Presentation`,
    subtitle: t(ne, `Per-teacher performance: response time, grading speed and student mastery.`),
    children: [
      (0, L.jsx)(ie, {
        items: [
          {
            icon: `Presentation`,
            label: t(`معلمون نشطون`, `Active teachers`),
            value: String(Z.active),
          },
          {
            icon: `Clock`,
            label: t(`متوسط زمن الرد`, `Avg. response`),
            value: t(`${Z.avgResponse} س`, `${Z.avgResponse}h`),
          },
          {
            icon: `PenSquare`,
            label: t(`متوسط زمن التصحيح`, `Avg. grading`),
            value: t(`${Z.avgGrading} يوم`, `${Z.avgGrading}d`),
          },
          { icon: `Star`, label: t(`متوسط التقييم`, `Avg. rating`), value: String(Z.avgRating) },
        ],
      }),
      (0, L.jsx)(h, {
        title: t(`قائمة المعلمين`, `Teacher list`),
        icon: `Presentation`,
        action: a(`supervisor_teachers`, `show_add_form`)
          ? (0, L.jsxs)(d, {
              size: `sm`,
              onClick: () => $(null),
              children: [(0, L.jsx)(te, { className: `size-4` }), t(`إضافة معلم`, `Add teacher`)],
            })
          : void 0,
        children: pe
          ? (0, L.jsx)(`div`, {
              className: `flex justify-center py-8`,
              children: (0, L.jsx)(u, { className: `size-5 animate-spin text-primary` }),
            })
          : X.length
            ? (0, L.jsx)(oe, {
                head: [
                  t(`المعلم`, `Teacher`),
                  t(`المادة`, `Subject`),
                  t(`طلاب`, `Students`),
                  t(`الحالة`, `Status`),
                  t(``, ``),
                ],
                rows: X.map((e) => [
                  e.teacherName,
                  e.subjectName,
                  String(e.studentsCount),
                  (0, L.jsx)(
                    ae,
                    {
                      tone: B[e.status],
                      children: t(
                        e.status,
                        e.status === `ممتاز`
                          ? `Excellent`
                          : e.status === `جيد`
                            ? `Good`
                            : `Grading delay`,
                      ),
                    },
                    e.id,
                  ),
                  (0, L.jsxs)(
                    `div`,
                    {
                      className: `flex items-center justify-end gap-1`,
                      children: [
                        a(`supervisor_teachers`, `edit`) &&
                          (0, L.jsx)(d, {
                            size: `icon`,
                            variant: `ghost`,
                            onClick: () => $(e),
                            children: (0, L.jsx)(l, { className: `size-4` }),
                          }),
                        a(`supervisor_teachers`, `delete`) &&
                          (0, L.jsx)(d, {
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
            : (0, L.jsx)(re, {
                icon: `Presentation`,
                text: t(`لا معلمون بعد.`, `No teachers yet.`),
              }),
      }),
      (0, L.jsx)(y, {
        open: H,
        onOpenChange: U,
        children: (0, L.jsxs)(ue, {
          className: `text-start`,
          children: [
            (0, L.jsx)(le, {
              children: (0, L.jsx)(ce, {
                children: W ? t(`تعديل معلم`, `Edit teacher`) : t(`إضافة معلم`, `Add teacher`),
              }),
            }),
            (0, L.jsxs)(`div`, {
              className: `grid gap-4 sm:grid-cols-2`,
              children: [
                (0, L.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, L.jsx)(_, {
                      htmlFor: `tp-name`,
                      children: t(`اسم المعلم`, `Teacher name`),
                    }),
                    (0, L.jsx)(g, {
                      id: `tp-name`,
                      value: G.teacherName,
                      onChange: (e) => K((t) => ({ ...t, teacherName: e.target.value })),
                    }),
                  ],
                }),
                (0, L.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, L.jsx)(_, { htmlFor: `tp-subject`, children: t(`المادة`, `Subject`) }),
                    (0, L.jsx)(g, {
                      id: `tp-subject`,
                      value: G.subjectName,
                      onChange: (e) => K((t) => ({ ...t, subjectName: e.target.value })),
                    }),
                  ],
                }),
                (0, L.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, L.jsx)(_, {
                      htmlFor: `tp-students`,
                      children: t(`عدد الطلاب`, `Students`),
                    }),
                    (0, L.jsx)(g, {
                      id: `tp-students`,
                      type: `number`,
                      min: 0,
                      value: G.studentsCount,
                      onChange: (e) => K((t) => ({ ...t, studentsCount: e.target.value })),
                    }),
                  ],
                }),
                (0, L.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, L.jsx)(_, { children: t(`الحالة`, `Status`) }),
                    (0, L.jsxs)(M, {
                      value: G.status,
                      onValueChange: (e) => K((t) => ({ ...t, status: e })),
                      children: [
                        (0, L.jsx)(k, { children: (0, L.jsx)(O, {}) }),
                        (0, L.jsxs)(A, {
                          children: [
                            (0, L.jsx)(j, { value: `ممتاز`, children: t(`ممتاز`, `Excellent`) }),
                            (0, L.jsx)(j, { value: `جيد`, children: t(`جيد`, `Good`) }),
                            (0, L.jsx)(j, {
                              value: `تأخر تصحيح`,
                              children: t(`تأخر تصحيح`, `Grading delay`),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, L.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, L.jsx)(_, {
                      htmlFor: `tp-response`,
                      children: t(`زمن الرد (ساعات)`, `Response (hours)`),
                    }),
                    (0, L.jsx)(g, {
                      id: `tp-response`,
                      type: `number`,
                      min: 0,
                      value: G.responseHours,
                      onChange: (e) => K((t) => ({ ...t, responseHours: e.target.value })),
                    }),
                  ],
                }),
                (0, L.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, L.jsx)(_, {
                      htmlFor: `tp-grading`,
                      children: t(`زمن التصحيح (أيام)`, `Grading (days)`),
                    }),
                    (0, L.jsx)(g, {
                      id: `tp-grading`,
                      type: `number`,
                      min: 0,
                      step: `0.1`,
                      value: G.gradingDays,
                      onChange: (e) => K((t) => ({ ...t, gradingDays: e.target.value })),
                    }),
                  ],
                }),
                (0, L.jsxs)(`div`, {
                  className: `space-y-1.5 sm:col-span-2`,
                  children: [
                    (0, L.jsx)(_, {
                      htmlFor: `tp-rating`,
                      children: t(`التقييم (من 5)`, `Rating (out of 5)`),
                    }),
                    (0, L.jsx)(g, {
                      id: `tp-rating`,
                      type: `number`,
                      min: 0,
                      max: 5,
                      step: `0.1`,
                      value: G.rating,
                      onChange: (e) => K((t) => ({ ...t, rating: e.target.value })),
                    }),
                  ],
                }),
              ],
            }),
            (0, L.jsxs)(v, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, L.jsx)(d, {
                  onClick: () => Q.mutate(),
                  disabled: Q.isPending || !G.teacherName.trim(),
                  children: t(`حفظ`, `Save`),
                }),
                (0, L.jsx)(d, {
                  variant: `outline`,
                  onClick: () => U(!1),
                  children: t(`إلغاء`, `Cancel`),
                }),
              ],
            }),
          ],
        }),
      }),
      (0, L.jsx)(D, {
        open: !!q,
        onOpenChange: (e) => !e && J(null),
        children: (0, L.jsxs)(S, {
          className: `text-start`,
          children: [
            (0, L.jsxs)(E, {
              children: [
                (0, L.jsx)(x, {
                  children: t(`حذف «${q?.teacherName}»؟`, `Delete "${q?.teacherName}"?`),
                }),
                (0, L.jsx)(b, {
                  children: t(`لا يمكن التراجع عن هذا الإجراء.`, `This action cannot be undone.`),
                }),
              ],
            }),
            (0, L.jsxs)(w, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, L.jsx)(C, {
                  onClick: () => q && me.mutate(q.id),
                  children: t(`حذف`, `Delete`),
                }),
                (0, L.jsx)(T, { children: t(`إلغاء`, `Cancel`) }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
export { R as component };
