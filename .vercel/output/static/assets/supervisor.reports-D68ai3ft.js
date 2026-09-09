import { C as e, R as t, j as n, u as r } from "./rbac-static-data-Cz2qa6wH.js";
import { i, n as a } from "./auth-middleware-CmTSOr_x.js";
import { t as o } from "./useMutation-CfRTvAO7.js";
import { g as s, i as c } from "./dynamic-icon-fBQNzGz-.js";
import { t as l } from "./loader-circle-DYrBHP0C.js";
import { t as u } from "./button-m-Eg43IZ.js";
import { B as d, p as f } from "./index-CUZEShOB.js";
import { n as p } from "./use-access-DbwD014U.js";
import { n as m } from "./guard-B5vrll8Q.js";
import { a as h, c as g, i as _, l as v, t as y } from "./kit-D226f5oO.js";
import { a as b, l as x, n as S, s as C } from "./supervisor-oversight.functions--iJBNX8a.js";
var w = t();
function T() {
  return (0, w.jsx)(m, { pageKey: `supervisor_reports`, children: (0, w.jsx)(E, {}) });
}
function E() {
  let t = r(),
    m = n(),
    { can: T } = p(),
    E = i(C),
    D = i(x),
    O = i(S),
    k = i(b),
    A = a({ queryKey: [`supervision-reports`], queryFn: () => E() }),
    j = a({ queryKey: [`supervision-settings`], queryFn: () => k() }),
    M = A.isLoading || j.isLoading,
    N = A.data ?? [],
    P = j.data ?? { reportFrequencyLabel: `—`, dataAnonymised: !0 },
    F = N.reduce((e, t) => e + t.downloadsCount, 0),
    I = () => m.invalidateQueries({ queryKey: [`supervision-reports`] }),
    L = o({
      mutationFn: (e) => D({ data: { id: e } }),
      onSuccess: () => {
        (I(), d.success(t(`تم تسجيل التنزيل`, `Download recorded`)));
      },
      onError: (n) => d.error(e(n, t(`تعذّر التنزيل`, `Failed to download`))),
    }),
    R = o({
      mutationFn: (e) => O({ data: { id: e } }),
      onSuccess: () => {
        (I(), d.success(t(`تم الحذف`, `Deleted successfully`)));
      },
      onError: (n) => d.error(e(n, t(`تعذّر الحذف`, `Failed to delete`))),
    });
  return (0, w.jsx)(y, {
    title: t(`تقارير الإشراف`, `Supervision reports`),
    icon: `FileBarChart`,
    subtitle: t(f, `Periodic exportable reports: teaching quality, mastery and consistency.`),
    children: M
      ? (0, w.jsx)(`div`, {
          className: `flex justify-center py-10`,
          children: (0, w.jsx)(l, { className: `size-6 animate-spin text-primary` }),
        })
      : (0, w.jsxs)(w.Fragment, {
          children: [
            (0, w.jsx)(v, {
              items: [
                {
                  icon: `FileBarChart`,
                  label: t(`تقارير جاهزة`, `Ready reports`),
                  value: String(N.length),
                },
                {
                  icon: `CalendarDays`,
                  label: t(`دورية`, `Frequency`),
                  value: P.reportFrequencyLabel,
                },
                { icon: `Download`, label: t(`تنزيلات`, `Downloads`), value: String(F) },
                {
                  icon: `ShieldCheck`,
                  label: t(`بيانات مجهولة الهوية`, `Anonymised`),
                  value: t(P.dataAnonymised ? `نعم` : `لا`, P.dataAnonymised ? `Yes` : `No`),
                },
              ],
            }),
            (0, w.jsx)(h, {
              title: t(`التقارير`, `Reports`),
              icon: `FileBarChart`,
              children: N.length
                ? (0, w.jsx)(g, {
                    rows: N.map((e) => ({
                      title: e.title,
                      meta: t(
                        `${e.formatLabel} · ${e.downloadsCount} تنزيل`,
                        `${e.formatLabel} · ${e.downloadsCount} downloads`,
                      ),
                      tone: `primary`,
                      actions: (0, w.jsxs)(`div`, {
                        className: `flex items-center gap-1`,
                        children: [
                          T(`supervisor_reports`, `edit`) &&
                            (0, w.jsxs)(u, {
                              size: `sm`,
                              variant: `outline`,
                              onClick: () => L.mutate(e.id),
                              children: [
                                (0, w.jsx)(s, { className: `size-4` }),
                                t(`تنزيل`, `Download`),
                              ],
                            }),
                          T(`supervisor_reports`, `delete`) &&
                            (0, w.jsx)(u, {
                              size: `icon`,
                              variant: `ghost`,
                              className: `text-destructive`,
                              onClick: () => R.mutate(e.id),
                              children: (0, w.jsx)(c, { className: `size-4` }),
                            }),
                        ],
                      }),
                    })),
                  })
                : (0, w.jsx)(_, {
                    icon: `FileBarChart`,
                    text: t(`لا تقارير جاهزة بعد.`, `No reports ready yet.`),
                  }),
            }),
          ],
        }),
  });
}
export { T as component };
