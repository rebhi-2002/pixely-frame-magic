import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as EmptyIllustration } from "./router-D9hWsH17.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Reveal } from "./reveal-BzN_D5PG.mjs";
import { t as DynamicIcon } from "./dynamic-icon-Cf94UsPA.mjs";
import { t as PageHeader } from "./page-header-B-hD-LLI.mjs";
import { t as AnimatedCounter } from "./animated-counter-DDUyItod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kit-DhXVWrh8.js
var import_jsx_runtime = require_jsx_runtime();
/** يفصل رقم القيمة عن البادئة/اللاحقة النصية — مثال: "86%" → {prefix:"", num:86, suffix:"%"} */
function parseStatValue(value) {
  const match = value.match(/^([^\d-]*)(-?[\d.,]+)(.*)$/);
  if (!match) return null;
  const [, prefix, numRaw, suffix] = match;
  const num = Number(numRaw.replace(/,/g, ""));
  if (Number.isNaN(num)) return null;
  return {
    prefix,
    num,
    suffix,
  };
}
/** غلاف موحّد لكل صفحات المنصة بعد تسجيل الدخول (القسم 07 — الشِل). */
function AppPage({ title, icon, subtitle, actions, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "min-h-screen",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
        title,
        icon,
        actions,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "mx-auto max-w-6xl px-5 py-6",
        children: [
          subtitle &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "max-w-2xl text-sm text-muted-foreground",
              children: subtitle,
            }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "mt-5 space-y-5",
            children,
          }),
        ],
      }),
    ],
  });
}
function StatGrid({ items }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
    children: items.map((s, i) => {
      const parsed = parseStatValue(s.value);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        Reveal,
        {
          delay: i * 0.05,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className:
              "hover-lift shadow-elevation-1 h-full rounded-2xl border border-border bg-card p-4",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                className:
                  "inline-flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
                  name: s.icon,
                  className: "size-4",
                }),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                className: "mt-3 font-display text-2xl font-bold text-foreground",
                children: parsed
                  ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, {
                      prefix: parsed.prefix,
                      value: parsed.num,
                      suffix: parsed.suffix,
                    })
                  : s.value,
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                className: "mt-0.5 text-xs text-muted-foreground",
                children: s.label,
              }),
            ],
          }),
        },
        s.label,
      );
    }),
  });
}
function Panel({ title, icon, action, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
    className: "shadow-elevation-1 rounded-2xl border border-border bg-card",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
        className: "flex items-center justify-between gap-3 border-b border-border px-5 py-3.5",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
            className:
              "inline-flex items-center gap-2 font-display text-sm font-bold text-foreground",
            children: [
              icon &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
                  name: icon,
                  className: "size-4 text-primary",
                }),
              title,
            ],
          }),
          action,
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "p-5",
        children,
      }),
    ],
  });
}
function Badge({ children, tone = "muted" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
    className: cn(
      "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold",
      tone === "primary" && "bg-primary/15 text-primary",
      tone === "success" && "bg-success/15 text-success",
      tone === "danger" && "bg-destructive/15 text-destructive",
      tone === "muted" && "bg-muted text-muted-foreground",
    ),
    children,
  });
}
function RowList({ rows, to }) {
  if (rows.length === 0)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { text: "—" });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
    className: "divide-y divide-border",
    children: rows.map((r, i) => {
      const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "flex items-center justify-between gap-3 py-3",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "min-w-0",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                className: "truncate text-sm font-semibold text-foreground",
                children: r.title,
              }),
              r.meta &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "mt-0.5 truncate text-xs text-muted-foreground",
                  children: r.meta,
                }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "flex shrink-0 items-center gap-2",
            children: [
              r.value &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
                  tone: r.tone ?? "muted",
                  children: r.value,
                }),
              r.actions,
            ],
          }),
        ],
      });
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "li",
        {
          className: i === 0 ? "-mt-3" : void 0,
          children: to
            ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                to,
                className: "block rounded-xl px-2 transition-colors hover:bg-accent/40",
                children: body,
              })
            : body,
        },
        `${r.title}-${i}`,
      );
    }),
  });
}
function DataTable({ head, rows, caption }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "-mx-5 overflow-x-auto px-5",
    role: "region",
    "aria-label": caption,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
      className: "w-full min-w-[520px] text-right text-sm",
      "aria-label": caption,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
            className: "border-b border-border text-xs text-muted-foreground",
            children: head.map((h) =>
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "th",
                {
                  scope: "col",
                  className: "px-2 pb-2 font-semibold ltr:text-left rtl:text-right",
                  children: h,
                },
                h,
              ),
            ),
          }),
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
          className: "divide-y divide-border",
          children: rows.map((r, i) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "tr",
              {
                className: "transition-colors hover:bg-accent/30",
                children: r.map((c, j) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "td",
                    {
                      className: "px-2 py-3 text-foreground ltr:text-left rtl:text-right",
                      children: c,
                    },
                    j,
                  ),
                ),
              },
              i,
            ),
          ),
        }),
      ],
    }),
  });
}
function Progress({ label, value }) {
  const pct = Math.min(100, Math.max(0, value));
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "py-2",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "flex items-center justify-between text-xs",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
            className: "font-semibold text-foreground",
            children: label,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
            className: "font-mono text-muted-foreground",
            children: [value, "%"],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "mt-1.5 h-2 overflow-hidden rounded-full bg-muted",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className: cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            pct >= 70 ? "bg-success" : pct >= 40 ? "bg-primary" : "bg-destructive",
          ),
          style: { width: `${pct}%` },
        }),
      }),
    ],
  });
}
function EmptyState({ text, icon, title, description, action }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className:
      "flex min-h-40 flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-border bg-secondary/20 p-6 text-center",
    children: [
      icon
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
            className:
              "flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
              name: icon,
              className: "size-5",
            }),
          })
        : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyIllustration, {
            className: "h-20 w-auto",
          }),
      title &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
          className: "mt-1 font-display text-sm font-bold text-foreground",
          children: title,
        }),
      (description ?? text) &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
          className: "mt-1 max-w-md text-sm text-muted-foreground",
          children: description ?? text,
        }),
      action &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className: "mt-3",
          children: action,
        }),
    ],
  });
}
function QuickLinks({ items }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
    children: items.map((i) =>
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        Link,
        {
          to: i.to,
          className:
            "hover-lift flex items-center gap-3 rounded-2xl border border-border bg-card p-4 hover:border-primary/50",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
              className:
                "flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
                name: i.icon,
                className: "size-4",
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
              className: "text-sm font-semibold text-foreground",
              children: i.label,
            }),
          ],
        },
        i.to,
      ),
    ),
  });
}
//#endregion
export {
  Panel as a,
  RowList as c,
  EmptyState as i,
  StatGrid as l,
  Badge as n,
  Progress as o,
  DataTable as r,
  QuickLinks as s,
  AppPage as t,
};
