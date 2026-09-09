import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { k as useBi } from "./rbac-static-data-Bv6QEjHq.mjs";
import "../_libs/sonner.mjs";
import {
  Tt as ArrowLeft,
  X as GraduationCap,
  gt as Check,
  i as UserRound,
  r as Users,
} from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import { n as FeatureStatus } from "./feedback-states-CtpAlO82.mjs";
import { n as AuthShell } from "./auth-shell-B7r5y7wC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-dXaDCOv8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
objectType({
  fullName: stringType().trim().min(2),
  email: stringType().trim().email(),
  password: stringType().min(6),
});
function SignupPage() {
  const { t } = useTranslation();
  const bi = useBi();
  const [role, setRole] = (0, import_react.useState)(null);
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [fullName, setFullName] = (0, import_react.useState)("");
  const [email, setEmail] = (0, import_react.useState)("");
  const [password, setPassword] = (0, import_react.useState)("");
  if (!role)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, {
      title: t("authPages.signup.h1"),
      subtitle: t("authPages.signup.sub"),
      wide: true,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "grid gap-3",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleCard, {
              icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {
                className: "size-5",
              }),
              title: t("authPages.signup.roles.student.t"),
              text: t("authPages.signup.roles.student.d"),
              onClick: () => setRole("student"),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleCard, {
              icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5" }),
              title: t("authPages.signup.roles.parent.t"),
              text: t("authPages.signup.roles.parent.d"),
              onClick: () => setRole("parent"),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
              to: "/teacher/register",
              className:
                "flex items-start gap-3 rounded-2xl border border-border bg-background p-4 text-start transition-colors hover:border-primary/50",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className:
                    "flex size-10 shrink-0 items-center justify-center rounded-xl bg-info/12 text-info",
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {
                    className: "size-5",
                  }),
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                  className: "min-w-0",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: "block font-bold text-foreground",
                      children: t("authPages.signup.roles.teacher.t"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: "mt-1 block text-sm text-muted-foreground",
                      children: t("authPages.signup.roles.teacher.d"),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
          className: "mt-6 text-center text-xs text-muted-foreground",
          children: [
            t("authPages.signup.haveAccount"),
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
              to: "/login",
              className: "font-bold text-primary hover:underline",
              children: t("authPages.signup.loginLink"),
            }),
          ],
        }),
      ],
    });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, {
    icon:
      role === "student"
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-5" })
        : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5" }),
    title: t("authPages.signup.h1"),
    subtitle: `${t("authPages.signup.chosen")}: ${t(`authPages.signup.roles.${role}.t`)}`,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
        type: "button",
        onClick: () => setRole(null),
        className:
          "mb-5 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
            className: "size-3.5 rtl:rotate-180",
          }),
          t("authPages.signup.change"),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureStatus, {
        title: bi("التسجيل قيد التجهيز", "Sign-up is being prepared"),
        description: bi(
          "تسجيل الدخول يعمل حاليًا. سنفعّل إنشاء الحسابات بعد اكتمال مسار التسجيل في الباك إند.",
          "Sign-in is available now. Account creation will open when the backend registration flow is ready.",
        ),
        action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
          asChild: true,
          variant: "outline",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
            to: "/login",
            children: bi("الذهاب لتسجيل الدخول", "Go to sign in"),
          }),
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "mt-6 space-y-1.5 text-center text-xs text-muted-foreground",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
            children: [
              t("authPages.signup.teacherHint"),
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                to: "/teacher/register",
                className: "font-bold text-primary hover:underline",
                children: t("authPages.signup.teacherLink"),
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
            children: [
              t("authPages.signup.haveAccount"),
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                to: "/login",
                className: "font-bold text-primary hover:underline",
                children: t("authPages.signup.loginLink"),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function RoleCard({ icon, title, text, onClick }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
    type: "button",
    onClick,
    className:
      "group flex items-start gap-3 rounded-2xl border border-border bg-background p-4 text-start transition-colors hover:border-primary/50",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
        className:
          "flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary",
        children: icon,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
        className: "min-w-0 flex-1",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
            className: "block font-bold text-foreground",
            children: title,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
            className: "mt-1 block text-sm text-muted-foreground",
            children: text,
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
        className:
          "mt-1 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100",
      }),
    ],
  });
}
//#endregion
export { SignupPage as component };
