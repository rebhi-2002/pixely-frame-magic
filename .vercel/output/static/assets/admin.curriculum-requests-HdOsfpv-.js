import { C as e, R as t, ht as n, j as r, u as i, vt as a } from "./rbac-static-data-Cz2qa6wH.js";
import { i as o, n as ee } from "./auth-middleware-CmTSOr_x.js";
import { t as s } from "./useMutation-CfRTvAO7.js";
import { i as c, l, u as te } from "./dynamic-icon-fBQNzGz-.js";
import { t as ne } from "./check-CJTwoqRt.js";
import { a as re } from "./dist-LHEW5aEh.js";
import { t as ie } from "./loader-circle-DYrBHP0C.js";
import { t as u } from "./button-m-Eg43IZ.js";
import { t as d } from "./search-CKHPlqGH.js";
import { B as f } from "./index-CUZEShOB.js";
import { n as p } from "./use-access-DbwD014U.js";
import { n as m } from "./guard-B5vrll8Q.js";
import { n as h, t as g } from "./page-header-D2zc6ZVs.js";
import { t as _ } from "./input-DhAlVvjJ.js";
import { a as v, i as y, n as ae, o as b, r as oe, t as se } from "./dialog-C80UddLn.js";
import {
  a as ce,
  c as le,
  i as ue,
  n as de,
  o as fe,
  r as pe,
  s as me,
  t as he,
} from "./alert-dialog-C95lx8dr.js";
import { a as x, i as S, n as C, r as w, t as T } from "./select-CjwHz5Zu.js";
import { i as E, s as D, t as O } from "./admin-curriculum.functions-CqGzWMNg.js";
var k = a(n()),
  A = t(),
  j = [`وحدة`, `مادة`, `مجموعة`, `صف`, `كورس`],
  M = [`جديد`, `قيد الدراسة`, `جاهز للاعتماد`, `معتمد`, `مرفوض`],
  N = {
    وحدة: [`وحدة`, `Module`],
    مادة: [`مادة`, `Subject`],
    مجموعة: [`مجموعة`, `Group`],
    صف: [`صف`, `Grade`],
    كورس: [`كورس`, `Course`],
  },
  P = {
    جديد: [`جديد`, `New`],
    "قيد الدراسة": [`قيد الدراسة`, `In review`],
    "جاهز للاعتماد": [`جاهز للاعتماد`, `Ready to approve`],
    معتمد: [`معتمد`, `Approved`],
    مرفوض: [`مرفوض`, `Rejected`],
  },
  F = {
    جديد: `muted`,
    "قيد الدراسة": `primary`,
    "جاهز للاعتماد": `primary`,
    معتمد: `success`,
    مرفوض: `danger`,
  },
  I = { title: ``, requesterName: ``, entityType: `وحدة`, status: `جديد` };
function L() {
  let t = i(),
    n = r(),
    { can: a } = p(),
    m = o(E),
    L = o(D),
    z = o(O),
    [B, _e] = (0, k.useState)(``),
    [V, ve] = (0, k.useState)(`all`),
    [ye, H] = (0, k.useState)(!1),
    [U, be] = (0, k.useState)(null),
    [W, G] = (0, k.useState)(I),
    [K, q] = (0, k.useState)(null),
    { data: J, isLoading: xe } = ee({ queryKey: [`curriculum-requests`], queryFn: () => m() }),
    Y = (0, k.useMemo)(
      () =>
        (J ?? []).filter((e) => {
          if (V !== `all` && e.status !== V) return !1;
          if (B.trim()) {
            let t = B.trim().toLowerCase();
            if (!`${e.title} ${e.requesterName}`.toLowerCase().includes(t)) return !1;
          }
          return !0;
        }),
      [J, V, B],
    ),
    X = () => n.invalidateQueries({ queryKey: [`curriculum-requests`] }),
    Z = s({
      mutationFn: () => L({ data: { ...W, id: U ?? void 0 } }),
      onSuccess: () => {
        (X(), H(!1), f.success(t(`تم الحفظ`, `Saved successfully`)));
      },
      onError: (n) => f.error(e(n, t(`تعذّر الحفظ`, `Failed to save`))),
    }),
    Q = s({
      mutationFn: (e) =>
        L({
          data: {
            id: e.row.id,
            title: e.row.title,
            requesterName: e.row.requesterName,
            entityType: e.row.entityType,
            status: e.status,
          },
        }),
      onSuccess: () => {
        (X(), f.success(t(`تم تحديث الحالة`, `Status updated`)));
      },
      onError: (n) => f.error(e(n, t(`تعذّر التحديث`, `Failed to update`))),
    }),
    Se = s({
      mutationFn: (e) => z({ data: { id: e } }),
      onSuccess: () => {
        (X(), q(null), f.success(t(`تم الحذف`, `Deleted successfully`)));
      },
      onError: (n) => f.error(e(n, t(`تعذّر الحذف`, `Failed to delete`))),
    });
  function $(e) {
    (be(e?.id ?? null),
      G(
        e
          ? {
              title: e.title,
              requesterName: e.requesterName,
              entityType: e.entityType,
              status: e.status,
            }
          : I,
      ),
      H(!0));
  }
  return (0, A.jsxs)(`div`, {
    children: [
      (0, A.jsx)(g, { title: t(`طلبات المنهاج`, `Curriculum requests`), icon: `Inbox` }),
      (0, A.jsxs)(`div`, {
        className: `p-5`,
        children: [
          (0, A.jsxs)(h, {
            children: [
              (0, A.jsxs)(`div`, {
                className: `relative min-w-56 flex-1`,
                children: [
                  (0, A.jsx)(d, {
                    className: `pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground`,
                  }),
                  (0, A.jsx)(_, {
                    placeholder: t(`بحث بالعنوان أو مقدّم الطلب`, `Search by title or requester`),
                    value: B,
                    onChange: (e) => _e(e.target.value),
                    className: `ps-9`,
                  }),
                ],
              }),
              (0, A.jsx)(R, {
                value: V,
                onChange: ve,
                placeholder: t(`الحالة`, `Status`),
                options: [
                  { value: `all`, label: t(`كل الحالات`, `All statuses`) },
                  ...M.map((e) => ({ value: e, label: t(...P[e]) })),
                ],
              }),
              a(`admin_curriculum_requests`, `show_add_form`) &&
                (0, A.jsxs)(u, {
                  className: `ms-auto`,
                  onClick: () => $(null),
                  children: [(0, A.jsx)(l, { className: `size-4` }), t(`إضافة طلب`, `Add request`)],
                }),
            ],
          }),
          (0, A.jsx)(`div`, {
            className: `mt-4 overflow-x-auto rounded-2xl bg-card`,
            children: xe
              ? (0, A.jsx)(`div`, {
                  className: `flex justify-center p-10`,
                  children: (0, A.jsx)(ie, { className: `size-5 animate-spin text-primary` }),
                })
              : (0, A.jsxs)(`table`, {
                  className: `w-full min-w-3xl text-start text-sm`,
                  children: [
                    (0, A.jsx)(`thead`, {
                      children: (0, A.jsxs)(`tr`, {
                        className: `border-b border-border text-xs text-muted-foreground`,
                        children: [
                          (0, A.jsx)(`th`, {
                            className: `px-4 py-3 font-semibold`,
                            children: t(`الطلب`, `Request`),
                          }),
                          (0, A.jsx)(`th`, {
                            className: `px-4 py-3 font-semibold`,
                            children: t(`مقدّم الطلب`, `Requester`),
                          }),
                          (0, A.jsx)(`th`, {
                            className: `px-4 py-3 font-semibold`,
                            children: t(`الكيان`, `Entity`),
                          }),
                          (0, A.jsx)(`th`, {
                            className: `px-4 py-3 font-semibold`,
                            children: t(`الحالة`, `Status`),
                          }),
                          (0, A.jsx)(`th`, {
                            className: `w-44 px-4 py-3 font-semibold`,
                            children: t(`إجراءات`, `Actions`),
                          }),
                        ],
                      }),
                    }),
                    (0, A.jsxs)(`tbody`, {
                      children: [
                        Y.map((e) =>
                          (0, A.jsxs)(
                            `tr`,
                            {
                              className: `border-b border-border/60 last:border-0`,
                              children: [
                                (0, A.jsx)(`td`, {
                                  className: `px-4 py-3 font-semibold text-foreground`,
                                  children: e.title,
                                }),
                                (0, A.jsx)(`td`, {
                                  className: `px-4 py-3 text-muted-foreground`,
                                  children: e.requesterName,
                                }),
                                (0, A.jsx)(`td`, {
                                  className: `px-4 py-3 text-muted-foreground`,
                                  children: t(...N[e.entityType]),
                                }),
                                (0, A.jsx)(`td`, {
                                  className: `px-4 py-3`,
                                  children: (0, A.jsx)(ge, {
                                    tone: F[e.status],
                                    children: t(...P[e.status]),
                                  }),
                                }),
                                (0, A.jsx)(`td`, {
                                  className: `px-4 py-3`,
                                  children: (0, A.jsxs)(`div`, {
                                    className: `flex items-center gap-1`,
                                    children: [
                                      a(`admin_curriculum_requests`, `edit`) &&
                                        e.status !== `معتمد` &&
                                        (0, A.jsx)(u, {
                                          size: `icon`,
                                          variant: `ghost`,
                                          title: t(`اعتماد`, `Approve`),
                                          className: `text-success`,
                                          onClick: () => Q.mutate({ row: e, status: `معتمد` }),
                                          children: (0, A.jsx)(ne, { className: `size-4` }),
                                        }),
                                      a(`admin_curriculum_requests`, `edit`) &&
                                        e.status !== `مرفوض` &&
                                        (0, A.jsx)(u, {
                                          size: `icon`,
                                          variant: `ghost`,
                                          title: t(`رفض`, `Reject`),
                                          className: `text-destructive`,
                                          onClick: () => Q.mutate({ row: e, status: `مرفوض` }),
                                          children: (0, A.jsx)(re, { className: `size-4` }),
                                        }),
                                      a(`admin_curriculum_requests`, `edit`) &&
                                        (0, A.jsx)(u, {
                                          size: `icon`,
                                          variant: `ghost`,
                                          title: t(`تعديل`, `Edit`),
                                          onClick: () => $(e),
                                          children: (0, A.jsx)(te, { className: `size-4` }),
                                        }),
                                      a(`admin_curriculum_requests`, `delete`) &&
                                        (0, A.jsx)(u, {
                                          size: `icon`,
                                          variant: `ghost`,
                                          title: t(`حذف`, `Delete`),
                                          className: `text-destructive`,
                                          onClick: () => q(e),
                                          children: (0, A.jsx)(c, { className: `size-4` }),
                                        }),
                                    ],
                                  }),
                                }),
                              ],
                            },
                            e.id,
                          ),
                        ),
                        !Y.length &&
                          (0, A.jsx)(`tr`, {
                            children: (0, A.jsx)(`td`, {
                              colSpan: 5,
                              className: `p-8 text-center text-muted-foreground`,
                              children: t(`لا توجد نتائج مطابقة.`, `No matching results.`),
                            }),
                          }),
                      ],
                    }),
                  ],
                }),
          }),
        ],
      }),
      (0, A.jsx)(se, {
        open: ye,
        onOpenChange: H,
        children: (0, A.jsxs)(ae, {
          className: `text-start`,
          children: [
            (0, A.jsx)(y, {
              children: (0, A.jsx)(v, {
                children: U ? t(`تعديل طلب`, `Edit request`) : t(`إضافة طلب`, `Add request`),
              }),
            }),
            (0, A.jsxs)(`div`, {
              className: `grid gap-4 sm:grid-cols-2`,
              children: [
                (0, A.jsxs)(`div`, {
                  className: `space-y-1.5 sm:col-span-2`,
                  children: [
                    (0, A.jsx)(b, { htmlFor: `creq-title`, children: t(`العنوان`, `Title`) }),
                    (0, A.jsx)(_, {
                      id: `creq-title`,
                      value: W.title,
                      onChange: (e) => G((t) => ({ ...t, title: e.target.value })),
                    }),
                  ],
                }),
                (0, A.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, A.jsx)(b, {
                      htmlFor: `creq-requester`,
                      children: t(`مقدّم الطلب`, `Requester`),
                    }),
                    (0, A.jsx)(_, {
                      id: `creq-requester`,
                      value: W.requesterName,
                      onChange: (e) => G((t) => ({ ...t, requesterName: e.target.value })),
                    }),
                  ],
                }),
                (0, A.jsxs)(`div`, {
                  className: `space-y-1.5`,
                  children: [
                    (0, A.jsx)(b, { children: t(`الكيان`, `Entity`) }),
                    (0, A.jsxs)(T, {
                      value: W.entityType,
                      onValueChange: (e) => G((t) => ({ ...t, entityType: e })),
                      children: [
                        (0, A.jsx)(S, { children: (0, A.jsx)(x, {}) }),
                        (0, A.jsx)(C, {
                          children: j.map((e) =>
                            (0, A.jsx)(w, { value: e, children: t(...N[e]) }, e),
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, A.jsxs)(`div`, {
                  className: `space-y-1.5 sm:col-span-2`,
                  children: [
                    (0, A.jsx)(b, { children: t(`الحالة`, `Status`) }),
                    (0, A.jsxs)(T, {
                      value: W.status,
                      onValueChange: (e) => G((t) => ({ ...t, status: e })),
                      children: [
                        (0, A.jsx)(S, { children: (0, A.jsx)(x, {}) }),
                        (0, A.jsx)(C, {
                          children: M.map((e) =>
                            (0, A.jsx)(w, { value: e, children: t(...P[e]) }, e),
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, A.jsxs)(oe, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, A.jsx)(u, {
                  onClick: () => Z.mutate(),
                  disabled: Z.isPending,
                  children: t(`حفظ`, `Save`),
                }),
                (0, A.jsx)(u, {
                  variant: `outline`,
                  onClick: () => H(!1),
                  children: t(`إلغاء`, `Cancel`),
                }),
              ],
            }),
          ],
        }),
      }),
      (0, A.jsx)(he, {
        open: !!K,
        onOpenChange: (e) => !e && q(null),
        children: (0, A.jsxs)(ue, {
          className: `text-start`,
          children: [
            (0, A.jsxs)(me, {
              children: [
                (0, A.jsx)(le, { children: t(`حذف «${K?.title}»؟`, `Delete "${K?.title}"?`) }),
                (0, A.jsx)(ce, {
                  children: t(`لا يمكن التراجع عن هذا الإجراء.`, `This action cannot be undone.`),
                }),
              ],
            }),
            (0, A.jsxs)(fe, {
              className: `gap-2 sm:justify-start`,
              children: [
                (0, A.jsx)(de, {
                  onClick: () => K && Se.mutate(K.id),
                  children: t(`حذف`, `Delete`),
                }),
                (0, A.jsx)(pe, { children: t(`إلغاء`, `Cancel`) }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function R({ value: e, onChange: t, placeholder: n, options: r }) {
  return (0, A.jsxs)(T, {
    value: e,
    onValueChange: t,
    children: [
      (0, A.jsx)(S, { className: `w-44`, children: (0, A.jsx)(x, { placeholder: n }) }),
      (0, A.jsx)(C, {
        children: r.map((e) => (0, A.jsx)(w, { value: e.value, children: e.label }, e.value)),
      }),
    ],
  });
}
function ge({ children: e, tone: t }) {
  return (0, A.jsx)(`span`, {
    className:
      `inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ` +
      (t === `primary`
        ? `bg-primary/15 text-primary`
        : t === `success`
          ? `bg-success/15 text-success`
          : t === `danger`
            ? `bg-destructive/15 text-destructive`
            : `bg-muted text-muted-foreground`),
    children: e,
  });
}
var z = () => (0, A.jsx)(m, { pageKey: `admin_curriculum_requests`, children: (0, A.jsx)(L, {}) });
export { z as component };
