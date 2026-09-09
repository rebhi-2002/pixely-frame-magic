import { M as e, R as t, k as n } from "./rbac-static-data-Cz2qa6wH.js";
import { t as r } from "./check-CJTwoqRt.js";
import { t as i } from "./gift-D3yRSGbP.js";
import { y as a } from "./index-CUZEShOB.js";
import { t as o } from "./use-session-CMsGjsyr.js";
import { n as s } from "./public-layout-BGA3sCZD.js";
import { t as c } from "./session-cta-DDRdl3yw.js";
var l = t();
function u() {
  let { code: t } = a.useParams(),
    { t: u } = n(),
    { isSignedIn: d } = o(),
    f = u(`invite.perks`, { returnObjects: !0 });
  return (0, l.jsx)(s, {
    children: (0, l.jsxs)(`section`, {
      className: `mx-auto max-w-2xl px-5 py-20`,
      children: [
        (0, l.jsx)(`span`, {
          className: `flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary`,
          children: (0, l.jsx)(i, { className: `size-6` }),
        }),
        (0, l.jsx)(`h1`, {
          className: `mt-5 text-3xl font-bold text-foreground`,
          children: u(`invite.h1`),
        }),
        (0, l.jsx)(`p`, { className: `mt-3 text-muted-foreground`, children: u(`invite.sub`) }),
        (0, l.jsxs)(`div`, {
          className: `mt-7 rounded-2xl border border-border bg-card p-5`,
          children: [
            (0, l.jsx)(`p`, {
              className: `text-xs text-muted-foreground`,
              children: u(`invite.codeLabel`),
            }),
            (0, l.jsx)(`p`, {
              className: `mt-1 font-mono text-lg font-bold tracking-widest text-primary`,
              children: t,
            }),
          ],
        }),
        (0, l.jsx)(`ul`, {
          className: `mt-7 space-y-3`,
          children: f.map((e) =>
            (0, l.jsxs)(
              `li`,
              {
                className: `flex items-start gap-2.5 text-sm text-foreground`,
                children: [(0, l.jsx)(r, { className: `mt-0.5 size-4 shrink-0 text-success` }), e],
              },
              e,
            ),
          ),
        }),
        (0, l.jsxs)(`div`, {
          className: `mt-9 flex flex-wrap gap-3`,
          children: [
            (0, l.jsx)(c, {
              to: `/signup`,
              search: { invite: t },
              label: u(`invite.cta`),
              className: `glow-primary inline-flex rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90`,
            }),
            !d &&
              (0, l.jsx)(e, {
                to: `/login`,
                className: `inline-flex rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary`,
                children: u(`invite.login`),
              }),
          ],
        }),
        (0, l.jsx)(`p`, {
          className: `mt-6 text-xs text-muted-foreground`,
          children: u(`invite.disclaimer`),
        }),
      ],
    }),
  });
}
export { u as component };
