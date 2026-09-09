import { C as e, R as t, ht as n, j as r, u as i, vt as a } from "./rbac-static-data-Cz2qa6wH.js";
import { i as o, n as s } from "./auth-middleware-CmTSOr_x.js";
import { t as c } from "./useMutation-CfRTvAO7.js";
import { i as ee, l as te, u as l } from "./dynamic-icon-fBQNzGz-.js";
import { t as u } from "./loader-circle-DYrBHP0C.js";
import { t as d } from "./button-m-Eg43IZ.js";
import { B as f, M as p } from "./index-CUZEShOB.js";
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
import { a as k, i as A, n as j, r as M, t as N } from "./select-CjwHz5Zu.js";
import { d as P, s as F, t as le } from "./student-social.functions-CblOF1su.js";
var I = a(n()),
  L = t();
function R() {
  return (0, L.jsx)(h, { pageKey: `student_bookmarks`, children: (0, L.jsx)(V, {}) });
}
var z = { itemTitle: ``, subjectName: ``, type: `درس` },
  B = { درس: `primary`, سؤال: `muted`, نقاش: `success` };
function V() {
  let t = i(),
    n = r(),
    { can: a } = m(),
    h = o(F),
    R = o(P),
    V = o(le),
    [H, U] = (0, I.useState)(!1),
    [W, ue] = (0, I.useState)(null),
    [G, K] = (0, I.useState)(z),
    [q, J] = (0, I.useState)(null),
    { data: de, isLoading: fe } = s({ queryKey: [`bookmarks`], queryFn: () => h() }),
    Y = () => n.invalidateQueries({ queryKey: [`bookmarks`] }),
    X = de ?? [],
    Z = (0, I.useMemo)(
      () => ({
        total: X.length,
        lessons: X.filter((e) => e.type === `درس`).length,
        questions: X.filter((e) => e.type === `سؤال`).length,
        threads: X.filter((e) => e.type === `نقاش`).length,
      }),
      [X],
    ),
    Q = c({
      mutationFn: () => R({ data: { ...G, id: W ?? void 0 } }),
      onSuccess: () => {
        (Y(), U(!1), f.success(t(`تم الحفظ`, `Saved successfully`)));
      },
      onError: (n) => f.error(e(n, t(`تعذّر الحفظ`, `Failed to save`))),
    }),
    pe = c({
      mutationFn: (e) => V({ data: { id: e } }),
      onSuccess: () => {
        (Y(), J(null), f.success(t(`تمت الإزالة`, `Removed`)));
      },
      onError: (n) => f.error(e(n, t(`تعذّر الحذف`, `Failed to delete`))),
    });
  function $(e) {
    (ue(e?.id ?? null),
      K(e ? { itemTitle: e.itemTitle, subjectName: e.subjectName, type: e.type } : z),
      U(!0));
  }
  return (0, L.jsxs)(ie, {
    title: t(`المحفوظات`, `Bookmarks`),
    icon: `Bookmark`,
    subtitle: t(
      p,
      `Everything you saved: lessons, questions and threads — in one quick-access place.`,
    ),
    children: [
      (0, L.jsx)(re, {
        items: [
          { icon: `Bookmark`, label: t(`عناصر محفوظة`, `Saved items`), value: String(Z.total) },
          { icon: `FileText`, label: t(`دروس`, `Lessons`), value: String(Z.lessons) },
          { icon: `HelpCircle`, label: t(`أسئلة`, `Questions`), value: String(Z.questions) },
          { icon: `MessagesSquare`, label: t(`نقاشات`, `Threads`), value: String(Z.threads) },
        ],
      }),
      (0, L.jsx)(g, {
        title: t(`محفوظاتك`, `Your bookmarks`),
        icon: `Bookmark`,
        action: a(`student_bookmarks`, `show_add_form`)
          ? (0, L.jsxs)(d, {
              size: `sm`,
              onClick: () => $(null),
              children: [(0, L.jsx)(te, { className: `size-4` }), t(`إضافة عنصر`, `Add item`)],
            })
          : void 0,
        children: fe
          ? (0, L.jsx)(`div`, {
              className: `flex justify-center py-8`,
              children: (0, L.jsx)(u, { className: `size-5 animate-spin text-primary` }),
            })
          : X.length
            ? (0, L.jsx)(_, {
                rows: X.map((e) => ({
                  title: e.itemTitle,
                  meta: e.subjectName,
                  value: t(
                    e.type,
                    e.type === `درس` ? `Lesson` : e.type === `سؤال` ? `Question` : `Thread`,
                  ),
                  tone: B[e.type],
                  actions: (0, L.jsxs)(`div`, {
                    className: `flex items-center gap-1`,
                    children: [
                      a(`student_bookmarks`, `edit`) &&
                        (0, L.jsx)(d, {
                          size: `icon`,
                          variant: `ghost`,
                          onClick: () => $(e),
                          children: (0, L.jsx)(l, { className: `size-4` }),
                        }),
                      a(`student_bookmarks`, `delete`) &&
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
            : (0, L.jsx)(ne, { icon: `Bookmark`, text: t(`لا محفوظات بعد.`, `No bookmarks yet.`) }),
      }),
      (0, L.jsx)(b, {
        open: H,
        onOpenChange: U,
        children: (0, L.jsxs)(se, {
          className: `text-start`,
          children: [
            (0, L.jsx)(oe, {
              children: (0, L.jsx)(ae, {
                children: W ? t(`تعديل عنصر`, `Edit item`) : t(`إضافة عنصر`, `Add item`),
              }),
            }),
            (0, L.jsxs)(`div`, {
              className: `grid gap-4 sm:grid-cols-2`,
              children: [
                (0, L.jsxs)(`div`, {
                  className: `space-y-1.5 sm:col-span-2`,
                  children: [
                    (0, L.jsx)(y, { htmlFor: `bm-title`, children: t(`العنوان`, `Title`) }),
                    (0, L.jsx)(v, {
                      id: `bm-title`,
                      value: G.itemTitle,
                      onChange: (e) => K((t) => ({ ...t, itemTitle: e.target.value })),
                    }),
                  ],
                }),
                (0, L.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, L.jsx)(y, { htmlFor: `bm-subject`, children: t(`المادة`, `Subject`) }),
                    (0, L.jsx)(v, {
                      id: `bm-subject`,
                      value: G.subjectName,
                      onChange: (e) => K((t) => ({ ...t, subjectName: e.target.value })),
                    }),
                  ],
                }),
                (0, L.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, L.jsx)(y, { children: t(`النوع`, `Type`) }),
                    (0, L.jsxs)(N, {
                      value: G.type,
                      onValueChange: (e) => K((t) => ({ ...t, type: e })),
                      children: [
                        (0, L.jsx)(A, { children: (0, L.jsx)(k, {}) }),
                        (0, L.jsxs)(j, {
                          children: [
                            (0, L.jsx)(M, { value: `درس`, children: t(`درس`, `Lesson`) }),
                            (0, L.jsx)(M, { value: `سؤال`, children: t(`سؤال`, `Question`) }),
                            (0, L.jsx)(M, { value: `نقاش`, children: t(`نقاش`, `Thread`) }),
                          ],
                        }),
                      ],
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
                  disabled: Q.isPending || !G.itemTitle.trim(),
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
      (0, L.jsx)(O, {
        open: !!q,
        onOpenChange: (e) => !e && J(null),
        children: (0, L.jsxs)(C, {
          className: `text-start`,
          children: [
            (0, L.jsxs)(D, {
              children: [
                (0, L.jsx)(S, {
                  children: t(`إزالة «${q?.itemTitle}»؟`, `Remove "${q?.itemTitle}"?`),
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
                  onClick: () => q && pe.mutate(q.id),
                  children: t(`إزالة`, `Remove`),
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
