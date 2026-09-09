import { C as e, R as t, ht as n, j as r, u as ee, vt as i } from "./rbac-static-data-Cz2qa6wH.js";
import { i as a, n as o } from "./auth-middleware-CmTSOr_x.js";
import { t as s } from "./useMutation-CfRTvAO7.js";
import { i as c, l as te, u as l } from "./dynamic-icon-fBQNzGz-.js";
import { t as ne } from "./loader-circle-DYrBHP0C.js";
import { t as u } from "./button-m-Eg43IZ.js";
import { B as d, w as f } from "./index-CUZEShOB.js";
import { n as p } from "./use-access-DbwD014U.js";
import { n as m } from "./guard-B5vrll8Q.js";
import { a as h, c as g, i as _, l as v, t as y } from "./kit-D226f5oO.js";
import { t as b } from "./input-DhAlVvjJ.js";
import { a as re, i as ie, n as ae, o as x, r as oe, t as se } from "./dialog-C80UddLn.js";
import {
  a as ce,
  c as le,
  i as ue,
  n as S,
  o as C,
  r as w,
  s as T,
  t as E,
} from "./alert-dialog-C95lx8dr.js";
import { d as D, o as O, t as k } from "./student-learning.functions-DKypWX69.js";
import { a as A, i as j, n as M, r as N, t as P } from "./select-CjwHz5Zu.js";
var F = i(n()),
  I = t();
function L() {
  return (0, I.jsx)(m, { pageKey: `student_my_courses`, children: (0, I.jsx)(z, {}) });
}
var R = {
  courseTitle: ``,
  teacherName: ``,
  progressPercent: `0`,
  nextSessionLabel: ``,
  status: `قيد الدراسة`,
};
function z() {
  let t = ee(),
    n = r(),
    { can: i } = p(),
    m = a(O),
    L = a(D),
    z = a(k),
    [B, V] = (0, F.useState)(!1),
    [H, U] = (0, F.useState)(null),
    [W, G] = (0, F.useState)(R),
    [K, q] = (0, F.useState)(null),
    { data: J, isLoading: de } = o({ queryKey: [`enrollments`], queryFn: () => m() }),
    Y = () => n.invalidateQueries({ queryKey: [`enrollments`] }),
    X = (0, F.useMemo)(() => (J ?? []).filter((e) => e.status === `قيد الدراسة`), [J]),
    Z = (0, F.useMemo)(() => (J ?? []).filter((e) => e.status === `مكتمل`), [J]),
    fe = (0, F.useMemo)(
      () => Math.round((J ?? []).reduce((e, t) => e + t.progressPercent, 0) / 10),
      [J],
    ),
    Q = s({
      mutationFn: () =>
        L({ data: { ...W, id: H ?? void 0, progressPercent: Number(W.progressPercent) || 0 } }),
      onSuccess: () => {
        (Y(), V(!1), d.success(t(`تم الحفظ`, `Saved successfully`)));
      },
      onError: (n) => d.error(e(n, t(`تعذّر الحفظ`, `Failed to save`))),
    }),
    pe = s({
      mutationFn: (e) => z({ data: { id: e } }),
      onSuccess: () => {
        (Y(), q(null), d.success(t(`تمت الإزالة من قائمتك`, `Removed from your list`)));
      },
      onError: (n) => d.error(e(n, t(`تعذّر الحذف`, `Failed to delete`))),
    });
  function $(e) {
    (U(e?.id ?? null),
      G(
        e
          ? {
              courseTitle: e.courseTitle,
              teacherName: e.teacherName,
              progressPercent: String(e.progressPercent),
              nextSessionLabel: e.nextSessionLabel,
              status: e.status,
            }
          : R,
      ),
      V(!0));
  }
  return (0, I.jsxs)(y, {
    title: t(`كورساتي`, `My courses`),
    icon: `BookOpenCheck`,
    subtitle: t(
      f,
      `Courses you actually enrolled in — progress, next session and completion certificate.`,
    ),
    children: [
      (0, I.jsx)(v, {
        items: [
          {
            icon: `BookOpenCheck`,
            label: t(`كورسات نشطة`, `Active courses`),
            value: String(X.length),
          },
          { icon: `CheckCircle2`, label: t(`مكتملة`, `Completed`), value: String(Z.length) },
          { icon: `Timer`, label: t(`ساعات مشاهدة`, `Watch hours`), value: String(fe) },
          { icon: `Award`, label: t(`شهادات`, `Certificates`), value: String(Z.length) },
        ],
      }),
      (0, I.jsx)(h, {
        title: t(`كورساتك النشطة`, `Active courses`),
        icon: `BookOpenCheck`,
        action: i(`student_my_courses`, `show_add_form`)
          ? (0, I.jsxs)(u, {
              size: `sm`,
              onClick: () => $(null),
              children: [(0, I.jsx)(te, { className: `size-4` }), t(`إضافة كورس`, `Add course`)],
            })
          : void 0,
        children: de
          ? (0, I.jsx)(`div`, {
              className: `flex justify-center py-8`,
              children: (0, I.jsx)(ne, { className: `size-5 animate-spin text-primary` }),
            })
          : X.length
            ? (0, I.jsx)(g, {
                rows: X.map((e) => ({
                  title: e.courseTitle + (e.teacherName ? ` — ${e.teacherName}` : ``),
                  meta: e.nextSessionLabel,
                  value: `${e.progressPercent}%`,
                  tone: `primary`,
                  actions: (0, I.jsxs)(`div`, {
                    className: `flex items-center gap-1`,
                    children: [
                      i(`student_my_courses`, `edit`) &&
                        (0, I.jsx)(u, {
                          size: `icon`,
                          variant: `ghost`,
                          onClick: () => $(e),
                          children: (0, I.jsx)(l, { className: `size-4` }),
                        }),
                      i(`student_my_courses`, `delete`) &&
                        (0, I.jsx)(u, {
                          size: `icon`,
                          variant: `ghost`,
                          className: `text-destructive`,
                          onClick: () => q(e),
                          children: (0, I.jsx)(c, { className: `size-4` }),
                        }),
                    ],
                  }),
                })),
              })
            : (0, I.jsx)(_, {
                icon: `BookOpenCheck`,
                text: t(
                  `ما في كورسات نشطة — ابدأ بإضافة أول كورس لك.`,
                  `No active courses — start by adding your first one.`,
                ),
              }),
      }),
      (0, I.jsx)(h, {
        title: t(`كورسات أكملتها`, `Completed`),
        icon: `CheckCircle2`,
        children: Z.length
          ? (0, I.jsx)(g, {
              to: `/my-certificates`,
              rows: Z.map((e) => ({
                title: e.courseTitle,
                meta: e.teacherName,
                value: t(`شهادة`, `Certificate`),
                tone: `success`,
              })),
            })
          : (0, I.jsx)(_, {
              icon: `Award`,
              text: t(
                `ولا كورس مكتمل بعد — كمّل أول كورس عشان تحصل شهادتك.`,
                `No completed courses yet — finish your first one to earn a certificate.`,
              ),
            }),
      }),
      (0, I.jsx)(se, {
        open: B,
        onOpenChange: V,
        children: (0, I.jsxs)(ae, {
          className: `text-start`,
          children: [
            (0, I.jsx)(ie, {
              children: (0, I.jsx)(re, {
                children: H ? t(`تعديل كورس`, `Edit course`) : t(`إضافة كورس`, `Add course`),
              }),
            }),
            (0, I.jsxs)(`div`, {
              className: `grid gap-4 sm:grid-cols-2`,
              children: [
                (0, I.jsxs)(`div`, {
                  className: `space-y-1.5 sm:col-span-2`,
                  children: [
                    (0, I.jsx)(x, {
                      htmlFor: `enr-title`,
                      children: t(`اسم الكورس`, `Course title`),
                    }),
                    (0, I.jsx)(b, {
                      id: `enr-title`,
                      value: W.courseTitle,
                      onChange: (e) => G((t) => ({ ...t, courseTitle: e.target.value })),
                    }),
                  ],
                }),
                (0, I.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, I.jsx)(x, { htmlFor: `enr-teacher`, children: t(`المعلم`, `Teacher`) }),
                    (0, I.jsx)(b, {
                      id: `enr-teacher`,
                      value: W.teacherName,
                      onChange: (e) => G((t) => ({ ...t, teacherName: e.target.value })),
                    }),
                  ],
                }),
                (0, I.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, I.jsx)(x, {
                      htmlFor: `enr-progress`,
                      children: t(`نسبة الإنجاز (%)`, `Progress (%)`),
                    }),
                    (0, I.jsx)(b, {
                      id: `enr-progress`,
                      type: `number`,
                      min: 0,
                      max: 100,
                      value: W.progressPercent,
                      onChange: (e) => G((t) => ({ ...t, progressPercent: e.target.value })),
                    }),
                  ],
                }),
                (0, I.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, I.jsx)(x, {
                      htmlFor: `enr-next`,
                      children: t(`الحصة القادمة`, `Next session`),
                    }),
                    (0, I.jsx)(b, {
                      id: `enr-next`,
                      value: W.nextSessionLabel,
                      onChange: (e) => G((t) => ({ ...t, nextSessionLabel: e.target.value })),
                    }),
                  ],
                }),
                (0, I.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, I.jsx)(x, { children: t(`الحالة`, `Status`) }),
                    (0, I.jsxs)(P, {
                      value: W.status,
                      onValueChange: (e) => G((t) => ({ ...t, status: e })),
                      children: [
                        (0, I.jsx)(j, { children: (0, I.jsx)(A, {}) }),
                        (0, I.jsxs)(M, {
                          children: [
                            (0, I.jsx)(N, {
                              value: `قيد الدراسة`,
                              children: t(`قيد الدراسة`, `In progress`),
                            }),
                            (0, I.jsx)(N, { value: `مكتمل`, children: t(`مكتمل`, `Completed`) }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, I.jsxs)(oe, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, I.jsx)(u, {
                  onClick: () => Q.mutate(),
                  disabled: Q.isPending || !W.courseTitle.trim(),
                  children: t(`حفظ`, `Save`),
                }),
                (0, I.jsx)(u, {
                  variant: `outline`,
                  onClick: () => V(!1),
                  children: t(`إلغاء`, `Cancel`),
                }),
              ],
            }),
          ],
        }),
      }),
      (0, I.jsx)(E, {
        open: !!K,
        onOpenChange: (e) => !e && q(null),
        children: (0, I.jsxs)(ue, {
          className: `text-start`,
          children: [
            (0, I.jsxs)(T, {
              children: [
                (0, I.jsx)(le, {
                  children: t(`إزالة «${K?.courseTitle}»؟`, `Remove "${K?.courseTitle}"?`),
                }),
                (0, I.jsx)(ce, {
                  children: t(`لا يمكن التراجع عن هذا الإجراء.`, `This action cannot be undone.`),
                }),
              ],
            }),
            (0, I.jsxs)(C, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, I.jsx)(S, {
                  onClick: () => K && pe.mutate(K.id),
                  children: t(`إزالة`, `Remove`),
                }),
                (0, I.jsx)(w, { children: t(`إلغاء`, `Cancel`) }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
export { L as component };
