import { C as e, R as t, ht as n, j as ee, u as te, vt as r } from "./rbac-static-data-Cz2qa6wH.js";
import { i, n as a } from "./auth-middleware-CmTSOr_x.js";
import { t as o } from "./useMutation-CfRTvAO7.js";
import { i as s, l as c, u as l } from "./dynamic-icon-fBQNzGz-.js";
import { t as u } from "./loader-circle-DYrBHP0C.js";
import { t as d } from "./button-m-Eg43IZ.js";
import { B as f, k as ne } from "./index-CUZEShOB.js";
import { n as re } from "./use-access-DbwD014U.js";
import { n as p } from "./guard-B5vrll8Q.js";
import { a as m, c as ie, i as h, l as ae, n as oe, r as se, t as ce } from "./kit-D226f5oO.js";
import { t as g } from "./input-DhAlVvjJ.js";
import { a as le, i as _, n as v, o as y, r as b, t as x } from "./dialog-C80UddLn.js";
import {
  a as S,
  c as C,
  i as w,
  n as T,
  o as E,
  r as D,
  s as O,
  t as k,
} from "./alert-dialog-C95lx8dr.js";
import {
  a as ue,
  c as de,
  h as fe,
  p as pe,
  r as me,
  u as he,
} from "./student-evaluation.functions-B7QY_1a_.js";
var A = r(n()),
  j = t();
function M() {
  return (0, j.jsx)(p, { pageKey: `student_exam`, children: (0, j.jsx)(F, {}) });
}
var N = { title: ``, questionsCount: `10`, minutesLimit: `15` },
  P = { examTitle: ``, dateLabel: ``, scorePercent: `0`, minutesTaken: `0` };
function ge(e) {
  return e >= 80 ? `success` : e >= 60 ? `primary` : `danger`;
}
function F() {
  let t = te(),
    n = ee(),
    { can: r } = re(),
    p = i(he),
    M = i(fe),
    F = i(ue),
    _e = i(de),
    ve = i(pe),
    ye = i(me),
    I = a({ queryKey: [`mock-exams`], queryFn: () => p() }),
    L = a({ queryKey: [`exam-attempts`], queryFn: () => _e() }),
    [be, R] = (0, A.useState)(!1),
    [z, xe] = (0, A.useState)(null),
    [B, V] = (0, A.useState)(N),
    [H, U] = (0, A.useState)(null),
    [Se, W] = (0, A.useState)(!1),
    [G, K] = (0, A.useState)(null),
    [q, J] = (0, A.useState)(P),
    [Y, X] = (0, A.useState)(null),
    Z = L.data ?? [],
    Q = (0, A.useMemo)(() => {
      if (!Z.length) return { taken: 0, best: 0, avgMinutes: 0 };
      let e = Math.max(...Z.map((e) => e.scorePercent)),
        t = Math.round(Z.reduce((e, t) => e + t.minutesTaken, 0) / Z.length);
      return { taken: Z.length, best: e, avgMinutes: t };
    }, [Z]),
    $ = o({
      mutationFn: () =>
        M({
          data: {
            id: z ?? void 0,
            title: B.title,
            questionsCount: Number(B.questionsCount) || 1,
            minutesLimit: Number(B.minutesLimit) || 1,
          },
        }),
      onSuccess: () => {
        (n.invalidateQueries({ queryKey: [`mock-exams`] }),
          R(!1),
          f.success(t(`تم الحفظ`, `Saved successfully`)));
      },
      onError: (n) => f.error(e(n, t(`تعذّر الحفظ`, `Failed to save`))),
    }),
    Ce = o({
      mutationFn: (e) => F({ data: { id: e } }),
      onSuccess: () => {
        (n.invalidateQueries({ queryKey: [`mock-exams`] }),
          U(null),
          f.success(t(`تم الحذف`, `Deleted successfully`)));
      },
      onError: (n) => f.error(e(n, t(`تعذّر الحذف`, `Failed to delete`))),
    }),
    we = o({
      mutationFn: () =>
        ve({
          data: {
            id: G ?? void 0,
            examTitle: q.examTitle,
            dateLabel: q.dateLabel,
            scorePercent: Number(q.scorePercent) || 0,
            minutesTaken: Number(q.minutesTaken) || 0,
          },
        }),
      onSuccess: () => {
        (n.invalidateQueries({ queryKey: [`exam-attempts`] }),
          W(!1),
          f.success(t(`تم الحفظ`, `Saved successfully`)));
      },
      onError: (n) => f.error(e(n, t(`تعذّر الحفظ`, `Failed to save`))),
    }),
    Te = o({
      mutationFn: (e) => ye({ data: { id: e } }),
      onSuccess: () => {
        (n.invalidateQueries({ queryKey: [`exam-attempts`] }),
          X(null),
          f.success(t(`تم الحذف`, `Deleted successfully`)));
      },
      onError: (n) => f.error(e(n, t(`تعذّر الحذف`, `Failed to delete`))),
    });
  function Ee(e) {
    (K(null),
      J({
        examTitle: e.title,
        dateLabel: new Date().toISOString().slice(0, 10),
        scorePercent: `0`,
        minutesTaken: `0`,
      }),
      W(!0));
  }
  function De(e) {
    (xe(e?.id ?? null),
      V(
        e
          ? {
              title: e.title,
              questionsCount: String(e.questionsCount),
              minutesLimit: String(e.minutesLimit),
            }
          : N,
      ),
      R(!0));
  }
  function Oe(e) {
    (K(e?.id ?? null),
      J(
        e
          ? {
              examTitle: e.examTitle,
              dateLabel: e.dateLabel,
              scorePercent: String(e.scorePercent),
              minutesTaken: String(e.minutesTaken),
            }
          : P,
      ),
      W(!0));
  }
  return (0, j.jsxs)(ce, {
    title: t(`محاكي الامتحان`, `Exam simulator`),
    icon: `Timer`,
    subtitle: t(
      ne,
      `A timed mock exam that looks like the real paper, with analysis that exposes weak spots.`,
    ),
    children: [
      (0, j.jsx)(ae, {
        items: [
          {
            icon: `FileCheck2`,
            label: t(`امتحانات أنهيتها`, `Exams taken`),
            value: String(Q.taken),
          },
          { icon: `Percent`, label: t(`أفضل نتيجة`, `Best score`), value: `${Q.best}%` },
          {
            icon: `Timer`,
            label: t(`متوسط الوقت`, `Avg. time`),
            value: t(`${Q.avgMinutes} د`, `${Q.avgMinutes} min`),
          },
          { icon: `Target`, label: t(`الهدف`, `Target`), value: `90%` },
        ],
      }),
      (0, j.jsx)(m, {
        title: t(`امتحانات جاهزة`, `Ready mock exams`),
        icon: `FileText`,
        action: r(`student_exam`, `show_add_form`)
          ? (0, j.jsxs)(d, {
              size: `sm`,
              onClick: () => De(null),
              children: [(0, j.jsx)(c, { className: `size-4` }), t(`إضافة امتحان`, `Add exam`)],
            })
          : void 0,
        children: I.isLoading
          ? (0, j.jsx)(`div`, {
              className: `flex justify-center py-8`,
              children: (0, j.jsx)(u, { className: `size-5 animate-spin text-primary` }),
            })
          : I.data?.length
            ? (0, j.jsx)(ie, {
                rows: I.data.map((e) => ({
                  title: e.title,
                  meta: t(
                    `${e.questionsCount} سؤالاً · ${e.minutesLimit} دقيقة`,
                    `${e.questionsCount} questions · ${e.minutesLimit} min`,
                  ),
                  value: t(`ابدأ`, `Start`),
                  tone: `primary`,
                  actions: (0, j.jsxs)(`div`, {
                    className: `flex items-center gap-1`,
                    children: [
                      (0, j.jsx)(d, {
                        size: `sm`,
                        variant: `outline`,
                        onClick: () => Ee(e),
                        children: t(`ابدأ`, `Start`),
                      }),
                      r(`student_exam`, `edit`) &&
                        (0, j.jsx)(d, {
                          size: `icon`,
                          variant: `ghost`,
                          onClick: () => De(e),
                          children: (0, j.jsx)(l, { className: `size-4` }),
                        }),
                      r(`student_exam`, `delete`) &&
                        (0, j.jsx)(d, {
                          size: `icon`,
                          variant: `ghost`,
                          className: `text-destructive`,
                          onClick: () => U(e),
                          children: (0, j.jsx)(s, { className: `size-4` }),
                        }),
                    ],
                  }),
                })),
              })
            : (0, j.jsx)(h, {
                icon: `FileText`,
                text: t(`لا امتحانات جاهزة بعد.`, `No ready exams yet.`),
              }),
      }),
      (0, j.jsx)(m, {
        title: t(`نتائجك السابقة`, `Past results`),
        icon: `History`,
        action: r(`student_exam`, `show_add_form`)
          ? (0, j.jsxs)(d, {
              size: `sm`,
              variant: `outline`,
              onClick: () => Oe(null),
              children: [(0, j.jsx)(c, { className: `size-4` }), t(`تسجيل نتيجة`, `Log result`)],
            })
          : void 0,
        children: L.isLoading
          ? (0, j.jsx)(`div`, {
              className: `flex justify-center py-8`,
              children: (0, j.jsx)(u, { className: `size-5 animate-spin text-primary` }),
            })
          : Z.length
            ? (0, j.jsx)(se, {
                head: [
                  t(`الامتحان`, `Exam`),
                  t(`التاريخ`, `Date`),
                  t(`النتيجة`, `Score`),
                  t(`الوقت`, `Time`),
                  t(``, ``),
                ],
                rows: Z.map((e) => [
                  e.examTitle,
                  e.dateLabel,
                  (0, j.jsxs)(
                    oe,
                    { tone: ge(e.scorePercent), children: [e.scorePercent, `%`] },
                    e.id,
                  ),
                  t(`${e.minutesTaken} د`, `${e.minutesTaken} min`),
                  (0, j.jsxs)(
                    `div`,
                    {
                      className: `flex items-center justify-end gap-1`,
                      children: [
                        r(`student_exam`, `edit`) &&
                          (0, j.jsx)(d, {
                            size: `icon`,
                            variant: `ghost`,
                            onClick: () => Oe(e),
                            children: (0, j.jsx)(l, { className: `size-4` }),
                          }),
                        r(`student_exam`, `delete`) &&
                          (0, j.jsx)(d, {
                            size: `icon`,
                            variant: `ghost`,
                            className: `text-destructive`,
                            onClick: () => X(e),
                            children: (0, j.jsx)(s, { className: `size-4` }),
                          }),
                      ],
                    },
                    `${e.id}-actions`,
                  ),
                ]),
              })
            : (0, j.jsx)(h, {
                icon: `History`,
                text: t(`ما في نتائج مسجّلة بعد.`, `No results logged yet.`),
              }),
      }),
      (0, j.jsx)(x, {
        open: be,
        onOpenChange: R,
        children: (0, j.jsxs)(v, {
          className: `text-start`,
          children: [
            (0, j.jsx)(_, {
              children: (0, j.jsx)(le, {
                children: z ? t(`تعديل امتحان`, `Edit exam`) : t(`إضافة امتحان`, `Add exam`),
              }),
            }),
            (0, j.jsxs)(`div`, {
              className: `grid gap-4 sm:grid-cols-2`,
              children: [
                (0, j.jsxs)(`div`, {
                  className: `space-y-1.5 sm:col-span-2`,
                  children: [
                    (0, j.jsx)(y, { htmlFor: `mex-title`, children: t(`العنوان`, `Title`) }),
                    (0, j.jsx)(g, {
                      id: `mex-title`,
                      value: B.title,
                      onChange: (e) => V((t) => ({ ...t, title: e.target.value })),
                    }),
                  ],
                }),
                (0, j.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, j.jsx)(y, { htmlFor: `mex-q`, children: t(`عدد الأسئلة`, `Questions`) }),
                    (0, j.jsx)(g, {
                      id: `mex-q`,
                      type: `number`,
                      min: 1,
                      value: B.questionsCount,
                      onChange: (e) => V((t) => ({ ...t, questionsCount: e.target.value })),
                    }),
                  ],
                }),
                (0, j.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, j.jsx)(y, {
                      htmlFor: `mex-min`,
                      children: t(`المدة (دقائق)`, `Duration (min)`),
                    }),
                    (0, j.jsx)(g, {
                      id: `mex-min`,
                      type: `number`,
                      min: 1,
                      value: B.minutesLimit,
                      onChange: (e) => V((t) => ({ ...t, minutesLimit: e.target.value })),
                    }),
                  ],
                }),
              ],
            }),
            (0, j.jsxs)(b, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, j.jsx)(d, {
                  onClick: () => $.mutate(),
                  disabled: $.isPending || !B.title.trim(),
                  children: t(`حفظ`, `Save`),
                }),
                (0, j.jsx)(d, {
                  variant: `outline`,
                  onClick: () => R(!1),
                  children: t(`إلغاء`, `Cancel`),
                }),
              ],
            }),
          ],
        }),
      }),
      (0, j.jsx)(x, {
        open: Se,
        onOpenChange: W,
        children: (0, j.jsxs)(v, {
          className: `text-start`,
          children: [
            (0, j.jsx)(_, {
              children: (0, j.jsx)(le, {
                children: G ? t(`تعديل نتيجة`, `Edit result`) : t(`تسجيل نتيجة`, `Log result`),
              }),
            }),
            (0, j.jsxs)(`div`, {
              className: `grid gap-4 sm:grid-cols-2`,
              children: [
                (0, j.jsxs)(`div`, {
                  className: `space-y-1.5 sm:col-span-2`,
                  children: [
                    (0, j.jsx)(y, { htmlFor: `att-title`, children: t(`الامتحان`, `Exam`) }),
                    (0, j.jsx)(g, {
                      id: `att-title`,
                      value: q.examTitle,
                      onChange: (e) => J((t) => ({ ...t, examTitle: e.target.value })),
                    }),
                  ],
                }),
                (0, j.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, j.jsx)(y, { htmlFor: `att-date`, children: t(`التاريخ`, `Date`) }),
                    (0, j.jsx)(g, {
                      id: `att-date`,
                      value: q.dateLabel,
                      onChange: (e) => J((t) => ({ ...t, dateLabel: e.target.value })),
                    }),
                  ],
                }),
                (0, j.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, j.jsx)(y, {
                      htmlFor: `att-score`,
                      children: t(`النتيجة (%)`, `Score (%)`),
                    }),
                    (0, j.jsx)(g, {
                      id: `att-score`,
                      type: `number`,
                      min: 0,
                      max: 100,
                      value: q.scorePercent,
                      onChange: (e) => J((t) => ({ ...t, scorePercent: e.target.value })),
                    }),
                  ],
                }),
                (0, j.jsxs)(`div`, {
                  className: `space-y-1.5 sm:col-span-2`,
                  children: [
                    (0, j.jsx)(y, {
                      htmlFor: `att-minutes`,
                      children: t(`الوقت المستغرق (دقيقة)`, `Time taken (min)`),
                    }),
                    (0, j.jsx)(g, {
                      id: `att-minutes`,
                      type: `number`,
                      min: 0,
                      value: q.minutesTaken,
                      onChange: (e) => J((t) => ({ ...t, minutesTaken: e.target.value })),
                    }),
                  ],
                }),
              ],
            }),
            (0, j.jsxs)(b, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, j.jsx)(d, {
                  onClick: () => we.mutate(),
                  disabled: we.isPending || !q.examTitle.trim(),
                  children: t(`حفظ`, `Save`),
                }),
                (0, j.jsx)(d, {
                  variant: `outline`,
                  onClick: () => W(!1),
                  children: t(`إلغاء`, `Cancel`),
                }),
              ],
            }),
          ],
        }),
      }),
      (0, j.jsx)(k, {
        open: !!H,
        onOpenChange: (e) => !e && U(null),
        children: (0, j.jsxs)(w, {
          className: `text-start`,
          children: [
            (0, j.jsxs)(O, {
              children: [
                (0, j.jsx)(C, { children: t(`حذف «${H?.title}»؟`, `Delete "${H?.title}"?`) }),
                (0, j.jsx)(S, {
                  children: t(`لا يمكن التراجع عن هذا الإجراء.`, `This action cannot be undone.`),
                }),
              ],
            }),
            (0, j.jsxs)(E, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, j.jsx)(T, {
                  onClick: () => H && Ce.mutate(H.id),
                  children: t(`حذف`, `Delete`),
                }),
                (0, j.jsx)(D, { children: t(`إلغاء`, `Cancel`) }),
              ],
            }),
          ],
        }),
      }),
      (0, j.jsx)(k, {
        open: !!Y,
        onOpenChange: (e) => !e && X(null),
        children: (0, j.jsxs)(w, {
          className: `text-start`,
          children: [
            (0, j.jsxs)(O, {
              children: [
                (0, j.jsx)(C, { children: t(`حذف هذه النتيجة؟`, `Delete this result?`) }),
                (0, j.jsx)(S, {
                  children: t(`لا يمكن التراجع عن هذا الإجراء.`, `This action cannot be undone.`),
                }),
              ],
            }),
            (0, j.jsxs)(E, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, j.jsx)(T, {
                  onClick: () => Y && Te.mutate(Y.id),
                  children: t(`حذف`, `Delete`),
                }),
                (0, j.jsx)(D, { children: t(`إلغاء`, `Cancel`) }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
export { M as component };
