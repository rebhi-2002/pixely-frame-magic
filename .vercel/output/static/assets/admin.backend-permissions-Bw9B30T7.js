import {
  C as e,
  R as t,
  S as n,
  ht as r,
  j as i,
  u as a,
  vt as o,
} from "./rbac-static-data-Cz2qa6wH.js";
import { n as s } from "./auth-middleware-CmTSOr_x.js";
import { t as c } from "./useMutation-CfRTvAO7.js";
import { o as l } from "./dynamic-icon-fBQNzGz-.js";
import { t as u } from "./button-m-Eg43IZ.js";
import { B as d } from "./index-CUZEShOB.js";
import { n as f } from "./guard-B5vrll8Q.js";
import { t as p } from "./page-header-D2zc6ZVs.js";
import { t as m } from "./checkbox-gvW9yAjb.js";
import { n as h } from "./admin-pages-BIVJhJqV.js";
import { i as g, r as _, t as v } from "./feedback-states-BVu9vOA0.js";
var y = o(r()),
  b = [
    { id: 1, name: `مدير النظام`, name_en: `System Admin` },
    { id: 2, name: `مستخدم`, name_en: `User` },
  ];
async function x(e) {
  let t = await n.post(`/api/UserPermission/GetUserTypePermissions?userTypeId=${e}`);
  return Array.isArray(t)
    ? t.map((e) => (typeof e == `number` ? e : e?.pageId)).filter((e) => typeof e == `number`)
    : [];
}
async function S(e, t) {
  await n.post(
    `/api/UserPermission/SavePermissions?userTypeId=${e}`,
    t.map((t) => ({ id: 0, userTypeId: e, pageId: t })),
  );
}
var C = t();
function w() {
  let t = a(),
    n = i(),
    [r, o] = (0, y.useState)(b[0].id),
    [f, w] = (0, y.useState)(new Set()),
    { data: T, isLoading: E, isError: D } = s({ queryKey: [`backend-pages`], queryFn: h }),
    {
      data: O,
      isLoading: k,
      isError: A,
    } = s({ queryKey: [`backend-permissions`, r], queryFn: () => x(r) });
  (0, y.useEffect)(() => {
    w(new Set(O ?? []));
  }, [O]);
  let j = (0, y.useMemo)(() => {
      let e = new Map();
      for (let n of T ?? []) {
        let r = n.module_name ?? t(`بدون وحدة`, `No module`);
        (e.has(r) || e.set(r, []), e.get(r).push(n));
      }
      return e;
    }, [T, t]),
    M = c({
      mutationFn: () => S(r, Array.from(f)),
      onSuccess: () => {
        (n.invalidateQueries({ queryKey: [`backend-permissions`, r] }),
          d.success(t(`تم حفظ الصلاحيات`, `Permissions saved`)));
      },
      onError: (n) => d.error(e(n, t(`تعذّر الحفظ`, `Failed to save`))),
    });
  function N(e) {
    w((t) => {
      let n = new Set(t);
      return (n.has(e) ? n.delete(e) : n.add(e), n);
    });
  }
  let P = E || k,
    F = D || A;
  return (0, C.jsxs)(`div`, {
    className: `pb-24`,
    children: [
      (0, C.jsx)(p, {
        icon: `ShieldCheck`,
        title: t(`صلاحيات أنواع المستخدمين (الباك اند)`, `User type permissions (backend)`),
      }),
      (0, C.jsxs)(`div`, {
        className: `px-4 py-5 md:px-6`,
        children: [
          (0, C.jsx)(`p`, {
            className: `mb-4 text-sm text-muted-foreground`,
            children: t(
              `الباك اند حاليًا فيه نوعين مستخدم ثابتين فقط (بدون إمكانية إضافة نوع جديد). حدد أي صفحات يقدر هذا النوع يوصلها.`,
              `The backend currently has only two fixed user types (no way to add more). Choose which pages this type can access.`,
            ),
          }),
          (0, C.jsx)(`div`, {
            className: `mb-5 flex flex-wrap gap-2`,
            children: b.map((e) =>
              (0, C.jsx)(
                `button`,
                {
                  type: `button`,
                  onClick: () => o(e.id),
                  className: `rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${r === e.id ? `border-primary bg-primary text-primary-foreground` : `border-border bg-card text-muted-foreground hover:border-primary/50`}`,
                  children: t(e.name, e.name_en),
                },
                e.id,
              ),
            ),
          }),
          P
            ? (0, C.jsx)(_, {
                label: t(`عم نحمّل الصفحات والصلاحيات…`, `Loading pages and permissions…`),
              })
            : F
              ? (0, C.jsx)(v, {
                  title: t(`تعذّر تحميل البيانات`, `Couldn't load data`),
                  action: (0, C.jsx)(g, {
                    label: t(`إعادة المحاولة`, `Try again`),
                    onClick: () => {
                      (n.invalidateQueries({ queryKey: [`backend-pages`] }),
                        n.invalidateQueries({ queryKey: [`backend-permissions`, r] }));
                    },
                  }),
                })
              : (0, C.jsxs)(`div`, {
                  className: `space-y-4`,
                  children: [
                    Array.from(j.entries()).map(([e, t]) =>
                      (0, C.jsxs)(
                        `div`,
                        {
                          className: `rounded-2xl border border-border bg-card p-4`,
                          children: [
                            (0, C.jsx)(`p`, {
                              className: `mb-3 font-display text-sm font-bold text-foreground`,
                              children: e,
                            }),
                            (0, C.jsx)(`div`, {
                              className: `grid gap-2 sm:grid-cols-2 lg:grid-cols-3`,
                              children: (t ?? []).map((e) =>
                                (0, C.jsxs)(
                                  `label`,
                                  {
                                    className: `flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-muted/50`,
                                    children: [
                                      (0, C.jsx)(m, {
                                        checked: f.has(e.id),
                                        onCheckedChange: () => N(e.id),
                                      }),
                                      (0, C.jsx)(`span`, {
                                        className: `text-foreground`,
                                        children: e.name,
                                      }),
                                    ],
                                  },
                                  e.id,
                                ),
                              ),
                            }),
                          ],
                        },
                        e,
                      ),
                    ),
                    !j.size &&
                      (0, C.jsx)(`p`, {
                        className: `p-8 text-center text-muted-foreground`,
                        children: t(`لا توجد صفحات بعد.`, `No pages yet.`),
                      }),
                  ],
                }),
          (0, C.jsx)(`div`, {
            className: `mt-6`,
            children: (0, C.jsxs)(u, {
              onClick: () => M.mutate(),
              loading: M.isPending,
              children: [
                (0, C.jsx)(l, { className: `size-4` }),
                t(`حفظ الصلاحيات`, `Save permissions`),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
var T = () => (0, C.jsx)(f, { pageKey: `admin_backend_permissions`, children: (0, C.jsx)(w, {}) });
export { T as component };
