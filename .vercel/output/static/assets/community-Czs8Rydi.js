import { C as e, R as t, ht as n, j as r, u as i, vt as a } from "./rbac-static-data-Cz2qa6wH.js";
import { i as o, n as s } from "./auth-middleware-CmTSOr_x.js";
import { t as c } from "./useMutation-CfRTvAO7.js";
import { i as ee, l as te, u as ne } from "./dynamic-icon-fBQNzGz-.js";
import { t as l } from "./loader-circle-DYrBHP0C.js";
import { t as u } from "./button-m-Eg43IZ.js";
import { B as d, j as f } from "./index-CUZEShOB.js";
import { n as p } from "./use-access-DbwD014U.js";
import { n as m } from "./guard-B5vrll8Q.js";
import { a as h, c as re, i as ie, l as ae, t as oe } from "./kit-D226f5oO.js";
import { t as g } from "./input-DhAlVvjJ.js";
import { a as se, i as ce, n as le, o as _, r as ue, t as de } from "./dialog-C80UddLn.js";
import {
  a as fe,
  c as pe,
  i as v,
  n as y,
  o as b,
  r as x,
  s as S,
  t as C,
} from "./alert-dialog-C95lx8dr.js";
import { a as w, i as T, n as E, r as D, t as O } from "./select-CjwHz5Zu.js";
import { a as k, c as A, f as j, n as M } from "./student-social.functions-CblOF1su.js";
var N = a(n()),
  P = t();
function F() {
  return (0, P.jsx)(m, { pageKey: `student_community`, children: (0, P.jsx)(R, {}) });
}
var I = { questionTitle: ``, subjectName: ``, answersCount: `0`, status: `مفتوح` },
  L = { "إجابة معلم": `success`, مفتوح: `primary`, مُغلق: `muted` };
function R() {
  let t = i(),
    n = r(),
    { can: a } = p(),
    m = o(A),
    F = o(j),
    R = o(M),
    z = o(k),
    B = s({ queryKey: [`community-questions`], queryFn: () => m() }),
    V = s({ queryKey: [`community-stats`], queryFn: () => z() }),
    [me, H] = (0, N.useState)(!1),
    [U, he] = (0, N.useState)(null),
    [W, G] = (0, N.useState)(I),
    [K, q] = (0, N.useState)(null),
    J = B.data ?? [],
    Y = V.data ?? { memberCount: 0, reputation: 0 },
    ge = J.filter((e) => e.status === `إجابة معلم`).length,
    _e = B.isLoading || V.isLoading,
    X = () => n.invalidateQueries({ queryKey: [`community-questions`] }),
    Z = c({
      mutationFn: () =>
        F({ data: { ...W, id: U ?? void 0, answersCount: Number(W.answersCount) || 0 } }),
      onSuccess: () => {
        (X(), H(!1), d.success(t(`تم النشر`, `Posted successfully`)));
      },
      onError: (n) => d.error(e(n, t(`تعذّر الحفظ`, `Failed to save`))),
    }),
    Q = c({
      mutationFn: (e) => R({ data: { id: e } }),
      onSuccess: () => {
        (X(), q(null), d.success(t(`تم الحذف`, `Deleted successfully`)));
      },
      onError: (n) => d.error(e(n, t(`تعذّر الحذف`, `Failed to delete`))),
    });
  function $(e) {
    (he(e?.id ?? null),
      G(
        e
          ? {
              questionTitle: e.questionTitle,
              subjectName: e.subjectName,
              answersCount: String(e.answersCount),
              status: e.status,
            }
          : I,
      ),
      H(!0));
  }
  return (0, P.jsxs)(oe, {
    title: t(`مجتمع المواد`, `Subject community`),
    icon: `MessagesSquare`,
    subtitle: t(
      f,
      `Ask in your subject community and answer classmates — teacher answers are highlighted.`,
    ),
    children: [
      _e
        ? (0, P.jsx)(`div`, {
            className: `flex justify-center py-10`,
            children: (0, P.jsx)(l, { className: `size-6 animate-spin text-primary` }),
          })
        : (0, P.jsxs)(P.Fragment, {
            children: [
              (0, P.jsx)(ae, {
                items: [
                  {
                    icon: `MessagesSquare`,
                    label: t(`أسئلة`, `Questions`),
                    value: String(J.length),
                  },
                  {
                    icon: `CheckCheck`,
                    label: t(`إجابات معلم`, `Teacher answers`),
                    value: String(ge),
                  },
                  {
                    icon: `Users`,
                    label: t(`أعضاء مادّتك`, `Members`),
                    value: String(Y.memberCount),
                  },
                  {
                    icon: `Star`,
                    label: t(`سمعتك`, `Your reputation`),
                    value: String(Y.reputation),
                  },
                ],
              }),
              (0, P.jsx)(h, {
                title: t(`أحدث الأسئلة`, `Latest questions`),
                icon: `MessagesSquare`,
                action: a(`student_community`, `show_add_form`)
                  ? (0, P.jsxs)(u, {
                      size: `sm`,
                      onClick: () => $(null),
                      children: [
                        (0, P.jsx)(te, { className: `size-4` }),
                        t(`اسأل سؤالاً`, `Ask a question`),
                      ],
                    })
                  : void 0,
                children: J.length
                  ? (0, P.jsx)(re, {
                      rows: J.map((e) => ({
                        title: e.questionTitle,
                        meta: t(
                          `${e.subjectName} · ${e.answersCount} إجابات`,
                          `${e.subjectName} · ${e.answersCount} answers`,
                        ),
                        value: t(
                          e.status,
                          e.status === `إجابة معلم`
                            ? `Teacher answer`
                            : e.status === `مفتوح`
                              ? `Open`
                              : `Closed`,
                        ),
                        tone: L[e.status],
                        actions: (0, P.jsxs)(`div`, {
                          className: `flex items-center gap-1`,
                          children: [
                            a(`student_community`, `edit`) &&
                              (0, P.jsx)(u, {
                                size: `icon`,
                                variant: `ghost`,
                                onClick: () => $(e),
                                children: (0, P.jsx)(ne, { className: `size-4` }),
                              }),
                            a(`student_community`, `delete`) &&
                              (0, P.jsx)(u, {
                                size: `icon`,
                                variant: `ghost`,
                                className: `text-destructive`,
                                onClick: () => q(e),
                                children: (0, P.jsx)(ee, { className: `size-4` }),
                              }),
                          ],
                        }),
                      })),
                    })
                  : (0, P.jsx)(ie, {
                      icon: `MessagesSquare`,
                      text: t(
                        `لا أسئلة بعد — كن أول من يسأل.`,
                        `No questions yet — be the first to ask.`,
                      ),
                    }),
              }),
            ],
          }),
      (0, P.jsx)(de, {
        open: me,
        onOpenChange: H,
        children: (0, P.jsxs)(le, {
          className: `text-start`,
          children: [
            (0, P.jsx)(ce, {
              children: (0, P.jsx)(se, {
                children: U ? t(`تعديل سؤال`, `Edit question`) : t(`اسأل سؤالاً`, `Ask a question`),
              }),
            }),
            (0, P.jsxs)(`div`, {
              className: `grid gap-4 sm:grid-cols-2`,
              children: [
                (0, P.jsxs)(`div`, {
                  className: `space-y-1.5 sm:col-span-2`,
                  children: [
                    (0, P.jsx)(_, { htmlFor: `cq-title`, children: t(`سؤالك`, `Your question`) }),
                    (0, P.jsx)(g, {
                      id: `cq-title`,
                      value: W.questionTitle,
                      onChange: (e) => G((t) => ({ ...t, questionTitle: e.target.value })),
                    }),
                  ],
                }),
                (0, P.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, P.jsx)(_, { htmlFor: `cq-subject`, children: t(`المادة`, `Subject`) }),
                    (0, P.jsx)(g, {
                      id: `cq-subject`,
                      value: W.subjectName,
                      onChange: (e) => G((t) => ({ ...t, subjectName: e.target.value })),
                    }),
                  ],
                }),
                U &&
                  (0, P.jsxs)(`div`, {
                    className: `space-y-1.5`,
                    children: [
                      (0, P.jsx)(_, { children: t(`الحالة`, `Status`) }),
                      (0, P.jsxs)(O, {
                        value: W.status,
                        onValueChange: (e) => G((t) => ({ ...t, status: e })),
                        children: [
                          (0, P.jsx)(T, { children: (0, P.jsx)(w, {}) }),
                          (0, P.jsxs)(E, {
                            children: [
                              (0, P.jsx)(D, { value: `مفتوح`, children: t(`مفتوح`, `Open`) }),
                              (0, P.jsx)(D, {
                                value: `إجابة معلم`,
                                children: t(`إجابة معلم`, `Teacher answered`),
                              }),
                              (0, P.jsx)(D, { value: `مُغلق`, children: t(`مُغلق`, `Closed`) }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
              ],
            }),
            (0, P.jsxs)(ue, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, P.jsx)(u, {
                  onClick: () => Z.mutate(),
                  disabled: Z.isPending || !W.questionTitle.trim(),
                  children: t(`نشر`, `Post`),
                }),
                (0, P.jsx)(u, {
                  variant: `outline`,
                  onClick: () => H(!1),
                  children: t(`إلغاء`, `Cancel`),
                }),
              ],
            }),
          ],
        }),
      }),
      (0, P.jsx)(C, {
        open: !!K,
        onOpenChange: (e) => !e && q(null),
        children: (0, P.jsxs)(v, {
          className: `text-start`,
          children: [
            (0, P.jsxs)(S, {
              children: [
                (0, P.jsx)(pe, { children: t(`حذف هذا السؤال؟`, `Delete this question?`) }),
                (0, P.jsx)(fe, {
                  children: t(`لا يمكن التراجع عن هذا الإجراء.`, `This action cannot be undone.`),
                }),
              ],
            }),
            (0, P.jsxs)(b, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, P.jsx)(y, { onClick: () => K && Q.mutate(K.id), children: t(`حذف`, `Delete`) }),
                (0, P.jsx)(x, { children: t(`إلغاء`, `Cancel`) }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
export { F as component };
