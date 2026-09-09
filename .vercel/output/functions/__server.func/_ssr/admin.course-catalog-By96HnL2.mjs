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
  l as Trash2,
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
  n as listPublicCourses,
  r as saveCourse,
  t as deleteCourse,
} from "./public-catalog.functions-C_2i7XaW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.course-catalog-By96HnL2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY_FORM = {
  titleAr: "",
  titleEn: "",
  teacherAr: "",
  teacherEn: "",
  teacherId: "",
  subjectAr: "",
  subjectEn: "",
  levelAr: "",
  levelEn: "",
  lessons: "0",
  price: "0",
};
function CourseCatalogPage() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchRows = useServerFn(listPublicCourses);
  const persist = useServerFn(saveCourse);
  const remove = useServerFn(deleteCourse);
  const [search, setSearch] = (0, import_react.useState)("");
  const [open, setOpen] = (0, import_react.useState)(false);
  const [editingId, setEditingId] = (0, import_react.useState)(null);
  const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
  const { data: rows, isLoading } = useQuery({
    queryKey: ["public-courses"],
    queryFn: () => fetchRows(),
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["public-courses"] });
  const filtered = (0, import_react.useMemo)(() => {
    return (rows ?? []).filter((r) => {
      if (!search.trim()) return true;
      const q = search.trim().toLowerCase();
      return `${r.title[0]} ${r.title[1]} ${r.teacher[0]} ${r.teacher[1]}`
        .toLowerCase()
        .includes(q);
    });
  }, [rows, search]);
  const saveMutation = useMutation({
    mutationFn: () =>
      persist({
        data: {
          ...form,
          id: editingId ?? void 0,
          lessons: Number(form.lessons) || 0,
          price: Number(form.price) || 0,
        },
      }),
    onSuccess: () => {
      invalidate();
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
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
            titleAr: row.title[0],
            titleEn: row.title[1],
            teacherAr: row.teacher[0],
            teacherEn: row.teacher[1],
            teacherId: row.teacherId,
            subjectAr: row.subject[0],
            subjectEn: row.subject[1],
            levelAr: row.level[0],
            levelEn: row.level[1],
            lessons: String(row.lessons),
            price: String(row.price),
          }
        : EMPTY_FORM,
    );
    setOpen(true);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
        title: bi("كتالوج الكورسات العام", "Public course catalog"),
        icon: "Store",
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
              can("admin_course_catalog", "show_add_form") &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                  className: "ms-auto",
                  onClick: () => openDialog(null),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
                    bi("إضافة كورس", "Add course"),
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
                            className: "px-4 py-3 font-semibold",
                            children: bi("الكورس", "Course"),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
                            className: "px-4 py-3 font-semibold",
                            children: bi("المعلم", "Teacher"),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
                            className: "px-4 py-3 font-semibold",
                            children: bi("المادة", "Subject"),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
                            className: "px-4 py-3 font-semibold",
                            children: bi("السعر", "Price"),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
                            className: "w-28 px-4 py-3 font-semibold",
                            children: bi("إجراءات", "Actions"),
                          }),
                        ],
                      }),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
                      children: [
                        filtered.map((r) =>
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                            "tr",
                            {
                              className: "border-b border-border/60 last:border-0",
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
                                  className: "px-4 py-3 font-semibold text-foreground",
                                  children: bi(...r.title),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
                                  className: "px-4 py-3 text-muted-foreground",
                                  children: bi(...r.teacher),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
                                  className: "px-4 py-3 text-muted-foreground",
                                  children: bi(...r.subject),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
                                  className: "px-4 py-3 text-muted-foreground",
                                  children: r.price === 0 ? bi("مجاني", "Free") : `${r.price} JOD`,
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
                                  className: "px-4 py-3",
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                    className: "flex items-center gap-1",
                                    children: [
                                      can("admin_course_catalog", "edit") &&
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                          size: "icon",
                                          variant: "ghost",
                                          onClick: () => openDialog(r),
                                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                            Pencil,
                                            { className: "size-4" },
                                          ),
                                        }),
                                      can("admin_course_catalog", "delete") &&
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                          size: "icon",
                                          variant: "ghost",
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
                              colSpan: 5,
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
          className: "max-h-[85vh] overflow-y-auto text-start",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
                children: editingId
                  ? bi("تعديل كورس", "Edit course")
                  : bi("إضافة كورس", "Add course"),
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "grid gap-4 sm:grid-cols-2",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      htmlFor: "crs-title-ar",
                      children: bi("العنوان (عربي)", "Title (Arabic)"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: "crs-title-ar",
                      value: form.titleAr,
                      onChange: (e) =>
                        setForm((f) => ({
                          ...f,
                          titleAr: e.target.value,
                        })),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      htmlFor: "crs-title-en",
                      children: bi("العنوان (إنجليزي)", "Title (English)"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: "crs-title-en",
                      value: form.titleEn,
                      onChange: (e) =>
                        setForm((f) => ({
                          ...f,
                          titleEn: e.target.value,
                        })),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      htmlFor: "crs-teacher-ar",
                      children: bi("المعلم (عربي)", "Teacher (Arabic)"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: "crs-teacher-ar",
                      value: form.teacherAr,
                      onChange: (e) =>
                        setForm((f) => ({
                          ...f,
                          teacherAr: e.target.value,
                        })),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      htmlFor: "crs-teacher-en",
                      children: bi("المعلم (إنجليزي)", "Teacher (English)"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: "crs-teacher-en",
                      value: form.teacherEn,
                      onChange: (e) =>
                        setForm((f) => ({
                          ...f,
                          teacherEn: e.target.value,
                        })),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-1.5 sm:col-span-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      htmlFor: "crs-teacher-id",
                      children: bi("معرّف صفحة المعلم", "Teacher page ID"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: "crs-teacher-id",
                      value: form.teacherId,
                      onChange: (e) =>
                        setForm((f) => ({
                          ...f,
                          teacherId: e.target.value,
                        })),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      htmlFor: "crs-subject-ar",
                      children: bi("المادة (عربي)", "Subject (Arabic)"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: "crs-subject-ar",
                      value: form.subjectAr,
                      onChange: (e) =>
                        setForm((f) => ({
                          ...f,
                          subjectAr: e.target.value,
                        })),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      htmlFor: "crs-subject-en",
                      children: bi("المادة (إنجليزي)", "Subject (English)"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: "crs-subject-en",
                      value: form.subjectEn,
                      onChange: (e) =>
                        setForm((f) => ({
                          ...f,
                          subjectEn: e.target.value,
                        })),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      htmlFor: "crs-level-ar",
                      children: bi("المستوى (عربي)", "Level (Arabic)"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: "crs-level-ar",
                      value: form.levelAr,
                      onChange: (e) =>
                        setForm((f) => ({
                          ...f,
                          levelAr: e.target.value,
                        })),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      htmlFor: "crs-level-en",
                      children: bi("المستوى (إنجليزي)", "Level (English)"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: "crs-level-en",
                      value: form.levelEn,
                      onChange: (e) =>
                        setForm((f) => ({
                          ...f,
                          levelEn: e.target.value,
                        })),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      htmlFor: "crs-lessons",
                      children: bi("عدد الدروس", "Lessons count"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: "crs-lessons",
                      type: "number",
                      min: 0,
                      value: form.lessons,
                      onChange: (e) =>
                        setForm((f) => ({
                          ...f,
                          lessons: e.target.value,
                        })),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      htmlFor: "crs-price",
                      children: bi("السعر (0 = مجاني)", "Price (0 = free)"),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: "crs-price",
                      type: "number",
                      min: 0,
                      value: form.price,
                      onChange: (e) =>
                        setForm((f) => ({
                          ...f,
                          price: e.target.value,
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
                  disabled: saveMutation.isPending || !form.titleAr.trim() || !form.titleEn.trim(),
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
                    `حذف «${pendingDelete?.title[0]}»؟`,
                    `Delete "${pendingDelete?.title[1]}"?`,
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
var SplitComponent = () =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
    pageKey: "admin_course_catalog",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCatalogPage, {}),
  });
//#endregion
export { SplitComponent as component };
