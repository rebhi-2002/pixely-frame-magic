import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import {
  A as usePreferences,
  f as getErrorMessage,
  k as useBi,
} from "./rbac-static-data-Bv6QEjHq.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import {
  B as LogOut,
  E as Pencil,
  g as ShieldCheck,
  i as UserRound,
  k as Palette,
} from "../_libs/lucide-react.mjs";
import { n as useServerFn } from "./createSsrRpc-Deneh4is.mjs";
import {
  d as useAccess,
  f as useInvalidateAccess,
  u as updateOwnProfile,
} from "./use-access-BL6Bw5Ej.mjs";
import { n as Guard } from "./guard-Dpfucbbc.mjs";
import { n as SignOutOverlay, r as useSignOut } from "./use-sign-out-B7TPwA9D.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import { t as PageHeader } from "./page-header-B-hD-LLI.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import {
  a as DialogTitle,
  i as DialogHeader,
  n as DialogContent,
  o as Label,
  r as DialogFooter,
  t as Dialog,
} from "./dialog-1uq10XBZ.mjs";
import { n as ROLE_NAME_EN } from "./rbac-types-DB3J6lDj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-_9NExS3g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var THEMES = ["light", "dark", "auto"];
var LOCALES = ["ar", "en"];
function SettingsPage() {
  const { t } = useTranslation();
  const bi = useBi();
  const invalidateAccess = useInvalidateAccess();
  const { access, can } = useAccess();
  const { signOut, pending: signingOut } = useSignOut("/login");
  const { theme, setTheme, locale, setLocale } = usePreferences();
  const updateProfile = useServerFn(updateOwnProfile);
  const [open, setOpen] = (0, import_react.useState)(false);
  const [form, setForm] = (0, import_react.useState)({
    full_name: "",
    email: "",
  });
  const saveMutation = useMutation({
    mutationFn: () => updateProfile({ data: form }),
    onSuccess: () => {
      invalidateAccess();
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
  });
  function openDialog() {
    setForm({
      full_name: access?.profile?.full_name ?? "",
      email: access?.profile?.email ?? "",
    });
    setOpen(true);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOutOverlay, { pending: signingOut }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
        title: t("settings.h1"),
        icon: "Settings",
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "mx-auto max-w-3xl px-5 py-6",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
            className: "text-sm text-muted-foreground",
            children: t("settings.sub"),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
            className: "shadow-elevation-1 mt-6 rounded-2xl border border-border bg-card p-6",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
                className: "inline-flex items-center gap-2 font-bold text-foreground",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, {
                    className: "size-4 text-primary",
                  }),
                  t("settings.langThemeTab"),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "mt-5",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: t("settings.theme"),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className: "mt-2 flex flex-wrap gap-2",
                    children: THEMES.map((value) =>
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "button",
                        {
                          type: "button",
                          onClick: () => setTheme(value),
                          className: `rounded-lg border px-3.5 py-2 text-xs font-bold transition-colors ${theme === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:text-foreground"}`,
                          children: t(`common.theme.${value}`),
                        },
                        value,
                      ),
                    ),
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "mt-6",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: t("settings.language"),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className: "mt-2 flex flex-wrap gap-2",
                    children: LOCALES.map((value) =>
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "button",
                        {
                          type: "button",
                          onClick: () => setLocale(value),
                          className: `rounded-lg border px-3.5 py-2 text-xs font-bold transition-colors ${locale === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:text-foreground"}`,
                          children: t(`common.language.${value}`),
                        },
                        value,
                      ),
                    ),
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
            className: "shadow-elevation-1 mt-4 rounded-2xl border border-border bg-card p-6",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
                    className: "inline-flex items-center gap-2 font-bold text-foreground",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {
                        className: "size-4 text-primary",
                      }),
                      t("settings.account"),
                    ],
                  }),
                  can("account_settings", "edit_profile") &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                      size: "sm",
                      variant: "outline",
                      onClick: openDialog,
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
                          className: "size-4",
                        }),
                        bi("تعديل", "Edit"),
                      ],
                    }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
                className: "mt-4 grid gap-3 text-sm sm:grid-cols-2",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
                        className: "text-xs text-muted-foreground",
                        children: t("settings.name"),
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
                        className: "font-semibold text-foreground",
                        children: access?.profile?.full_name ?? "—",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
                        className: "text-xs text-muted-foreground",
                        children: t("settings.email"),
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
                        className: "font-semibold text-foreground",
                        children: access?.profile?.email ?? "—",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
                        className: "text-xs text-muted-foreground",
                        children: t("settings.role"),
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
                        className: "font-semibold text-foreground",
                        children: access?.profile?.role_name
                          ? bi(
                              access.profile.role_name,
                              ROLE_NAME_EN[access.profile.role_name] ?? access.profile.role_name,
                            )
                          : "—",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
            className: "shadow-elevation-1 mt-4 rounded-2xl border border-border bg-card p-6",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
                className: "inline-flex items-center gap-2 font-bold text-foreground",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
                    className: "size-4 text-primary",
                  }),
                  t("settings.security"),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                className: "mt-3 text-sm text-muted-foreground",
                children: t("settings.idleNote"),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
                type: "button",
                onClick: () => void signOut(),
                className:
                  "mt-5 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }),
                  t(signingOut ? "common.signingOut" : "settings.signOut"),
                ],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
        open,
        onOpenChange: setOpen,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
          className: "text-start",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
                children: bi("تعديل بيانات الحساب", "Edit account details"),
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "grid gap-4",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      htmlFor: "acc-name",
                      children: t("settings.name"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: "acc-name",
                      value: form.full_name,
                      onChange: (e) =>
                        setForm((f) => ({
                          ...f,
                          full_name: e.target.value,
                        })),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      htmlFor: "acc-email",
                      children: t("settings.email"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: "acc-email",
                      type: "email",
                      value: form.email,
                      onChange: (e) =>
                        setForm((f) => ({
                          ...f,
                          email: e.target.value,
                        })),
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
              className: "gap-2 sm:justify-start",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  onClick: () => saveMutation.mutate(),
                  disabled: saveMutation.isPending || !form.full_name.trim(),
                  children: bi("حفظ", "Save"),
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  variant: "outline",
                  onClick: () => setOpen(false),
                  children: bi("إلغاء", "Cancel"),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
var SplitComponent = () =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
    pageKey: "account_settings",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPage, {}),
  });
//#endregion
export { SplitComponent as component };
