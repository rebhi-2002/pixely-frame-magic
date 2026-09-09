import { R as e, k as t } from "./rbac-static-data-Cz2qa6wH.js";
import { n } from "./public-layout-BGA3sCZD.js";
var r = e();
function i() {
  let { t: e } = t(),
    i = e(`privacy.sections`, { returnObjects: !0 });
  return (0, r.jsx)(n, {
    children: (0, r.jsxs)(`section`, {
      className: `mx-auto max-w-3xl px-5 py-16`,
      children: [
        (0, r.jsx)(`h1`, {
          className: `text-4xl font-bold text-foreground`,
          children: e(`privacy.h1`),
        }),
        (0, r.jsx)(`p`, { className: `mt-3 text-muted-foreground`, children: e(`privacy.intro`) }),
        (0, r.jsx)(`div`, {
          className: `mt-10 space-y-5`,
          children: i.map((e) =>
            (0, r.jsxs)(
              `section`,
              {
                className: `rounded-2xl border border-border bg-card p-6`,
                children: [
                  (0, r.jsx)(`h2`, {
                    className: `text-lg font-bold text-foreground`,
                    children: e.t,
                  }),
                  (0, r.jsx)(`p`, {
                    className: `mt-2 text-sm leading-relaxed text-muted-foreground`,
                    children: e.d,
                  }),
                ],
              },
              e.t,
            ),
          ),
        }),
      ],
    }),
  });
}
export { i as component };
