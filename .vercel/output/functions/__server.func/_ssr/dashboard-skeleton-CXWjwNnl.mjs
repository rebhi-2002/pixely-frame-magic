import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-skeleton-CXWjwNnl.js
var import_jsx_runtime = require_jsx_runtime();
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: cn("animate-pulse rounded-md bg-primary/10", className),
    ...props,
  });
}
/**
 * DashboardSkeleton — هيكل تحميل يحاكي بنية AppPage (هيدر + StatGrid + Panel)
 * لمنع "قفزة" الـ layout ولإعطاء إحساس تحميل احترافي بدل شاشة فاضية أو سبينر معزول.
 */
function DashboardSkeleton() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "min-h-screen animate-pulse",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
        className: "flex items-center gap-3 border-b border-border bg-card px-5 py-4",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
            className: "size-10 rounded-xl bg-secondary",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
            className: "h-5 w-40 rounded-lg bg-secondary",
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "mx-auto max-w-6xl space-y-5 px-5 py-6",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
            className: "h-4 w-72 rounded-lg bg-secondary",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
            children: Array.from({ length: 4 }).map((_, i) =>
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "div",
                {
                  className: "rounded-2xl border border-border bg-card p-4",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
                      className: "size-9 rounded-xl bg-secondary",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
                      className: "mt-3 h-6 w-14 rounded-lg bg-secondary",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
                      className: "mt-2 h-3 w-20 rounded bg-secondary",
                    }),
                  ],
                },
                i,
              ),
            ),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "rounded-2xl border border-border bg-card",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className: "border-b border-border px-5 py-3.5",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
                  className: "h-4 w-32 rounded bg-secondary",
                }),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "space-y-3 p-5",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
                    className: "h-4 w-full rounded bg-secondary",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
                    className: "h-4 w-5/6 rounded bg-secondary",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
                    className: "h-4 w-2/3 rounded bg-secondary",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
//#endregion
export { DashboardSkeleton as t };
