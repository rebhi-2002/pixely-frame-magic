import { R as e, u as t } from "./rbac-static-data-Cz2qa6wH.js";
import { i as n, n as r } from "./auth-middleware-CmTSOr_x.js";
import { t as i } from "./loader-circle-DYrBHP0C.js";
import { c as a, s as o } from "./use-access-DbwD014U.js";
import { n as s } from "./guard-B5vrll8Q.js";
import { a as c, l, n as u, r as d, t as f } from "./kit-D226f5oO.js";
import { a as p, i as m, o as h } from "./admin-moderation.functions-CoUERKIG.js";
import { a as g, i as _, o as v } from "./admin-curriculum.functions-CqGzWMNg.js";
import { i as y, n as b, t as x } from "./charts-DvBRew8l.js";
var S = e();
function C() {
  let e = t(),
    s = n(h),
    C = n(p),
    w = n(m),
    T = n(v),
    E = n(g),
    D = n(_),
    O = n(a),
    k = n(o),
    A = r({ queryKey: [`teacher-verifications`], queryFn: () => s() }),
    j = r({ queryKey: [`content-submissions`], queryFn: () => C() }),
    M = r({ queryKey: [`community-reports`], queryFn: () => w() }),
    N = r({ queryKey: [`payments`], queryFn: () => T() }),
    P = r({ queryKey: [`curriculum-subjects`], queryFn: () => E() }),
    F = r({ queryKey: [`curriculum-requests`], queryFn: () => D() }),
    I = r({ queryKey: [`rbac-users`], queryFn: () => O() }),
    L = r({ queryKey: [`rbac-roles`], queryFn: () => k() });
  if ([A, j, M, N, P, F, I, L].some((e) => e.isLoading))
    return (0, S.jsx)(f, {
      title: e(`لوحة إدارة Academia`, `Academia admin dashboard`),
      icon: `LayoutDashboard`,
      children: (0, S.jsx)(`div`, {
        className: `flex justify-center py-16`,
        children: (0, S.jsx)(i, { className: `size-6 animate-spin text-primary` }),
      }),
    });
  let R = A.data ?? [],
    z = j.data ?? [],
    B = M.data ?? [],
    V = N.data ?? [],
    H = P.data ?? [],
    U = F.data ?? [],
    W = I.data ?? [],
    G = L.data ?? [],
    K = R.filter((e) => e.status === `مكتمل`).length,
    q = H.reduce((e, t) => e + t.coursesCount, 0),
    J = B.filter((e) => e.status === `مفتوح`).length,
    Y = [],
    X = R.filter((e) => e.status === `قيد المراجعة`).length;
  X > 0 &&
    Y.push({
      title: [`مراجعة ${X} طلب توثيق`, `Review ${X} verification requests`],
      area: [`المعلمون`, `Teachers`],
      tone: `primary`,
    });
  let Z = z.filter((e) => e.status === `جديد`).length;
  (Z > 0 &&
    Y.push({
      title: [`مراجعة ${Z} محتوى جديد`, `Review ${Z} new content items`],
      area: [`المحتوى`, `Content`],
      tone: `muted`,
    }),
    J > 0 &&
      Y.push({
        title: [`تدقيق ${J} بلاغ مجتمع مفتوح`, `Triage ${J} open community reports`],
        area: [`الأمان`, `Safety`],
        tone: `danger`,
      }));
  let Q = U.filter((e) => e.status === `قيد الدراسة` || e.status === `جاهز للاعتماد`).length;
  Q > 0 &&
    Y.push({
      title: [`${Q} طلب منهاج بانتظار القرار`, `${Q} curriculum requests awaiting decision`],
      area: [`المنهاج`, `Curriculum`],
      tone: `primary`,
    });
  let $ = V.filter((e) => e.status === `قيد المعالجة`).length;
  $ > 0 &&
    Y.push({
      title: [`${$} دفعة قيد المعالجة`, `${$} payments processing`],
      area: [`المدفوعات`, `Payments`],
      tone: `muted`,
    });
  let ee = G.map((e) => ({ label: e.name, value: W.filter((t) => t.role_id === e.id).length })),
    te = [`ناجحة`, `قيد المعالجة`, `مستردة`, `فاشلة`].map((e) => ({
      labelAr: e,
      labelEn:
        e === `ناجحة`
          ? `Successful`
          : e === `قيد المعالجة`
            ? `Processing`
            : e === `مستردة`
              ? `Refunded`
              : `Failed`,
      value: V.filter((t) => t.status === e).length,
    }));
  return (0, S.jsxs)(f, {
    title: e(`لوحة إدارة Academia`, `Academia admin dashboard`),
    icon: `LayoutDashboard`,
    subtitle: e(
      `مؤشرات تشغيل المنصة والمراجعات التي تحتاج قراراً — كل رقم محسوب من بيانات حقيقية.`,
      `Platform operations and reviews requiring a decision — every number is computed from real data.`,
    ),
    children: [
      (0, S.jsx)(y, {
        subtitle: [`مؤشرات تشغيل المنصة اليوم.`, `Today's platform operations at a glance.`],
      }),
      (0, S.jsx)(l, {
        items: [
          { icon: `Users`, label: e(`المستخدمون`, `Users`), value: String(W.length) },
          {
            icon: `Presentation`,
            label: e(`المعلمون الموثقون`, `Verified teachers`),
            value: String(K),
          },
          {
            icon: `BookOpenCheck`,
            label: e(`الكورسات بالمنهاج`, `Courses in curriculum`),
            value: String(q),
          },
          { icon: `Flag`, label: e(`بلاغات مفتوحة`, `Open reports`), value: String(J) },
        ],
      }),
      (0, S.jsx)(c, {
        title: e(`مهام بانتظار القرار`, `Tasks awaiting a decision`),
        icon: `ListChecks`,
        children: Y.length
          ? (0, S.jsx)(d, {
              head: [e(`المهمة`, `Task`), e(`القسم`, `Area`), e(`الحالة`, `Status`)],
              rows: Y.map((t) => [
                e(...t.title),
                e(...t.area),
                (0, S.jsx)(
                  u,
                  { tone: t.tone, children: e(`بانتظار القرار`, `Pending`) },
                  t.title[0],
                ),
              ]),
            })
          : (0, S.jsx)(`p`, {
              className: `py-6 text-center text-sm text-muted-foreground`,
              children: e(
                `لا توجد مهام بانتظار القرار حالياً 🎉`,
                `No tasks awaiting a decision right now 🎉`,
              ),
            }),
      }),
      (0, S.jsxs)(`div`, {
        className: `grid gap-5 lg:grid-cols-2`,
        children: [
          (0, S.jsx)(c, {
            title: e(`المستخدمون حسب الدور`, `Users by role`),
            icon: `Users`,
            children: (0, S.jsx)(x, { data: ee }),
          }),
          (0, S.jsx)(c, {
            title: e(`المدفوعات حسب الحالة`, `Payments by status`),
            icon: `Wallet`,
            children: (0, S.jsx)(b, {
              data: te.map((t) => ({ label: e(t.labelAr, t.labelEn), value: t.value })),
            }),
          }),
        ],
      }),
    ],
  });
}
var w = () => (0, S.jsx)(s, { pageKey: `admin_dashboard`, children: (0, S.jsx)(C, {}) });
export { w as component };
