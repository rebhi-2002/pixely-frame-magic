import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { f as getErrorMessage, k as useBi } from "./rbac-static-data-Bv6QEjHq.mjs";
import {
  i as useQueryClient,
  n as useQuery,
  t as useMutation,
} from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import {
  E as Pencil,
  H as LoaderCircle,
  T as Plus,
  b as Search,
  gt as Check,
  l as Trash2,
  n as X,
} from "../_libs/lucide-react.mjs";
import { n as useServerFn } from "./createSsrRpc-Deneh4is.mjs";
import { d as useAccess } from "./use-access-BL6Bw5Ej.mjs";
import { n as Guard } from "./guard-Dpfucbbc.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import { n as Toolbar, t as PageHeader } from "./page-header-B-hD-LLI.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import {
  a as DialogTitle,
  i as DialogHeader,
  n as DialogContent,
  o as Label,
  r as DialogFooter,
  t as Dialog,
} from "./dialog-1uq10XBZ.mjs";
import {
  a as AlertDialogDescription,
  c as AlertDialogTitle,
  i as AlertDialogContent,
  n as AlertDialogAction,
  o as AlertDialogFooter,
  r as AlertDialogCancel,
  s as AlertDialogHeader,
  t as AlertDialog,
} from "./alert-dialog-OIHj-NyW.mjs";
import {
  a as SelectValue,
  i as SelectTrigger,
  n as SelectContent,
  r as SelectItem,
  t as Select,
} from "./select-CbSL31Oe.mjs";
import {
  a as listContentSubmissions,
  c as saveContentSubmission,
  n as deleteContentSubmission,
} from "./admin-moderation.functions-pPmhZBm5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.content-review-DaR6uSjJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TYPES = ["درس", "اختبار", "كورس"];
var STATUSES = ["جديد", "مراجعة ثانية", "جاهز للاعتماد", "معتمد", "مرفوض"];
var TYPE_LABEL = {
  درس: ["درس", "Lesson"],
  اختبار: ["اختبار", "Quiz"],
  كورس: ["كورس", "Course"],
};
var STATUS_LABEL = {
  جديد: ["جديد", "New"],
  "مراجعة ثانية": ["مراجعة ثانية", "Second review"],
  "جاهز للاعتماد": ["جاهز للاعتماد", "Ready to approve"],
  معتمد: ["معتمد", "Approved"],
  مرفوض: ["مرفوض", "Rejected"],
};
var STATUS_TONE = {
  جديد: "muted",
  "مراجعة ثانية": "primary",
  "جاهز للاعتماد": "primary",
  معتمد: "success",
  مرفوض: "danger",
};
var EMPTY_FORM = {
  title: "",
  teacherName: "",
  type: "درس",
  status: "جديد",
};
function ContentReviewPage() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listContentSubmissions);
  const persist = useServerFn(saveContentSubmission);
  const remove = useServerFn(deleteContentSubmission);
  const [search, setSearch] = (0, import_react.useState)("");
  const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
  const [typeFilter, setTypeFilter] = (0, import_react.useState)("all");
  const [open, setOpen] = (0, import_react.useState)(false);
  const [editingId, setEditingId] = (0, import_react.useState)(null);
  const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
  const { data: rows, isLoading } = useQuery({
    queryKey: ["content-submissions"],
    queryFn: () => fetchRows(),
  });
  const filtered = (0, import_react.useMemo)(() => {
    return (rows ?? []).filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (typeFilter !== "all" && r.type !== typeFilter) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (!`${r.title} ${r.teacherName}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [rows, statusFilter, typeFilter, search]);
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["content-submissions"] });
  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: {
          ...form,
          id: editingId ?? void 0,
        },
      }),
    onSuccess: () => {
      invalidate();
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
  });
  const statusMutation = useMutation({
    mutationFn: (vars) =>
      persist({
        data: {
          ...vars.row,
          status: vars.status,
        },
      }),
    onSuccess: () => {
      invalidate();
      toast.success(bi("تم تحديث الحالة", "Status updated"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر التحديث", "Failed to update"))),
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => remove({ data: { id } }),
    onSuccess: () => {
      invalidate();
      setPendingDelete(null);
      toast.success(bi("تم الحذف", "Deleted successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete"))),
  });
  function openDialog(row) {
    setEditingId(row?.id ?? null);
    setForm(
      row
        ? {
            title: row.title,
            teacherName: row.teacherName,
            type: row.type,
            status: row.status,
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
        title: bi("مراجعة المحتوى", "Content review"),
        icon: "FileSearch",
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "p-5",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toolbar, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "relative min-w-56 flex-1",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
                    className:
                      "pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                    placeholder: bi("بحث بالعنوان أو المعلم", "Search by title or teacher"),
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    className: "ps-9",
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
                value: typeFilter,
                onChange: setTypeFilter,
                placeholder: bi("النوع", "Type"),
                options: [
                  {
                    value: "all",
                    label: bi("كل الأنواع", "All types"),
                  },
                  ...TYPES.map((t) => ({
                    value: t,
                    label: bi(...TYPE_LABEL[t]),
                  })),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
                value: statusFilter,
                onChange: setStatusFilter,
                placeholder: bi("الحالة", "Status"),
                options: [
                  {
                    value: "all",
                    label: bi("كل الحالات", "All statuses"),
                  },
                  ...STATUSES.map((s) => ({
                    value: s,
                    label: bi(...STATUS_LABEL[s]),
                  })),
                ],
              }),
              can("admin_content_review", "show_add_form") &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                  className: "ms-auto",
                  onClick: () => openDialog(null),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
                    bi("إضافة عنصر", "Add item"),
                  ],
                }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "mt-4 overflow-x-auto rounded-2xl bg-card",
            children: isLoading
              ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                  className: "flex justify-center p-10",
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
                    className: "size-5 animate-spin text-primary",
                  }),
                })
              : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
                  className: "w-full min-w-3xl text-start text-sm",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
                        className: "border-b border-border text-xs text-muted-foreground",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
                            className: "w-14 px-4 py-3 font-semibold",
                            children: "#",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
                            className: "px-4 py-3 font-semibold",
                            children: bi("المحتوى", "Content"),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
                            className: "px-4 py-3 font-semibold",
                            children: bi("المعلم", "Teacher"),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
                            className: "px-4 py-3 font-semibold",
                            children: bi("النوع", "Type"),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
                            className: "px-4 py-3 font-semibold",
                            children: bi("الحالة", "Status"),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
                            className: "w-44 px-4 py-3 font-semibold",
                            children: bi("إجراءات", "Actions"),
                          }),
                        ],
                      }),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
                      children: [
                        filtered.map((r, i) =>
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                            "tr",
                            {
                              className: "border-b border-border/60 last:border-0",
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
                                  className: "px-4 py-3 text-muted-foreground",
                                  children: i + 1,
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
                                  className: "px-4 py-3 font-semibold text-foreground",
                                  children: r.title,
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
                                  className: "px-4 py-3 text-muted-foreground",
                                  children: r.teacherName,
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
                                  className: "px-4 py-3 text-muted-foreground",
                                  children: bi(...TYPE_LABEL[r.type]),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
                                  className: "px-4 py-3",
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                    StatusBadge,
                                    {
                                      tone: STATUS_TONE[r.status],
                                      children: bi(...STATUS_LABEL[r.status]),
                                    },
                                  ),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
                                  className: "px-4 py-3",
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                    className: "flex items-center gap-1",
                                    children: [
                                      can("admin_content_review", "edit") &&
                                        r.status !== "معتمد" &&
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                          size: "icon",
                                          variant: "ghost",
                                          title: bi("اعتماد", "Approve"),
                                          className: "text-success",
                                          onClick: () =>
                                            statusMutation.mutate({
                                              row: r,
                                              status: "معتمد",
                                            }),
                                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                            Check,
                                            { className: "size-4" },
                                          ),
                                        }),
                                      can("admin_content_review", "edit") &&
                                        r.status !== "مرفوض" &&
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                          size: "icon",
                                          variant: "ghost",
                                          title: bi("رفض", "Reject"),
                                          className: "text-destructive",
                                          onClick: () =>
                                            statusMutation.mutate({
                                              row: r,
                                              status: "مرفوض",
                                            }),
                                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
                                            className: "size-4",
                                          }),
                                        }),
                                      can("admin_content_review", "edit") &&
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                          size: "icon",
                                          variant: "ghost",
                                          title: bi("تعديل", "Edit"),
                                          onClick: () => openDialog(r),
                                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                            Pencil,
                                            { className: "size-4" },
                                          ),
                                        }),
                                      can("admin_content_review", "delete") &&
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                          size: "icon",
                                          variant: "ghost",
                                          title: bi("حذف", "Delete"),
                                          className: "text-destructive",
                                          onClick: () => setPendingDelete(r),
                                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                            Trash2,
                                            { className: "size-4" },
                                          ),
                                        }),
                                    ],
                                  }),
                                }),
                              ],
                            },
                            r.id,
                          ),
                        ),
                        !filtered.length &&
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
                              colSpan: 6,
                              className: "p-8 text-center text-muted-foreground",
                              children: bi("لا توجد نتائج مطابقة.", "No matching results."),
                            }),
                          }),
                      ],
                    }),
                  ],
                }),
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
                children: editingId ? bi("تعديل عنصر", "Edit item") : bi("إضافة عنصر", "Add item"),
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "grid gap-4 sm:grid-cols-2",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-1.5 sm:col-span-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      htmlFor: "cs-title",
                      children: bi("العنوان", "Title"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: "cs-title",
                      value: form.title,
                      onChange: (e) =>
                        setForm((f) => ({
                          ...f,
                          title: e.target.value,
                        })),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      htmlFor: "cs-teacher",
                      children: bi("المعلم", "Teacher"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: "cs-teacher",
                      value: form.teacherName,
                      onChange: (e) =>
                        setForm((f) => ({
                          ...f,
                          teacherName: e.target.value,
                        })),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      children: bi("النوع", "Type"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                      value: form.type,
                      onValueChange: (v) =>
                        setForm((f) => ({
                          ...f,
                          type: v,
                        })),
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}),
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                          children: TYPES.map((t) =>
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              SelectItem,
                              {
                                value: t,
                                children: bi(...TYPE_LABEL[t]),
                              },
                              t,
                            ),
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-1.5 sm:col-span-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      children: bi("الحالة", "Status"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                      value: form.status,
                      onValueChange: (v) =>
                        setForm((f) => ({
                          ...f,
                          status: v,
                        })),
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}),
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                          children: STATUSES.map((s) =>
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              SelectItem,
                              {
                                value: s,
                                children: bi(...STATUS_LABEL[s]),
                              },
                              s,
                            ),
                          ),
                        }),
                      ],
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
                  disabled: saveMutation.isPending,
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
        open: !!pendingDelete,
        onOpenChange: (v) => !v && setPendingDelete(null),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
          className: "text-start",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
                  children: bi(
                    `حذف «${pendingDelete?.title}»؟`,
                    `Delete "${pendingDelete?.title}"?`,
                  ),
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
                  children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone."),
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
              className: "gap-2 sm:justify-start",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
                  onClick: () => pendingDelete && deleteMutation.mutate(pendingDelete.id),
                  children: bi("حذف", "Delete"),
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
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
function FilterSelect({ value, onChange, placeholder, options }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
    value,
    onValueChange: onChange,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
        className: "w-44",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
        children: options.map((o) =>
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            SelectItem,
            {
              value: o.value,
              children: o.label,
            },
            o.value,
          ),
        ),
      }),
    ],
  });
}
function StatusBadge({ children, tone }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
    className:
      "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold " +
      (tone === "primary"
        ? "bg-primary/15 text-primary"
        : tone === "success"
          ? "bg-success/15 text-success"
          : tone === "danger"
            ? "bg-destructive/15 text-destructive"
            : "bg-muted text-muted-foreground"),
    children,
  });
}
var SplitComponent = () =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
    pageKey: "admin_content_review",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentReviewPage, {}),
  });
//#endregion
export { SplitComponent as component };
