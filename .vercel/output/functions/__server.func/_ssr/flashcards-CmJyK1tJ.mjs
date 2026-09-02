import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { w as useBi } from "./rbac-static-data-g2eybyR5.mjs";
import { n as useServerFn } from "./createSsrRpc-wq0ICmoa.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { d as useAccess } from "./use-access-C_0mcNbc.mjs";
import { n as Guard } from "./guard-DmupFA9_.mjs";
import { E as Pencil, H as LoaderCircle, T as Plus, l as Trash2 } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-RXwCFfhv.mjs";
import { a as Panel, c as RowList, i as EmptyState, l as StatGrid, t as AppPage } from "./kit-DDkPK7fJ.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Label, r as DialogFooter, t as Dialog } from "./dialog-1uq10XBZ.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-DwQS8Syk.mjs";
import { f as saveFlashcardDeck, n as deleteFlashcardDeck, s as listFlashcardDecks } from "./student-learning.functions-DN3V6ojr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as description } from "./flashcards-DBt5JrgN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flashcards-CmJyK1tJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "student_flashcards",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var EMPTY_FORM = {
	deckName: "",
	totalCards: "0",
	dueCards: "0",
	masteredCards: "0"
};
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchRows = useServerFn(listFlashcardDecks);
	const persist = useServerFn(saveFlashcardDeck);
	const remove = useServerFn(deleteFlashcardDeck);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data: rows, isLoading } = useQuery({
		queryKey: ["flashcard-decks"],
		queryFn: () => fetchRows()
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["flashcard-decks"] });
	const stats = (0, import_react.useMemo)(() => {
		const list = rows ?? [];
		const due = list.reduce((s, r) => s + r.dueCards, 0);
		const mastered = list.reduce((s, r) => s + r.masteredCards, 0);
		const total = list.reduce((s, r) => s + r.totalCards, 0);
		return {
			due,
			mastered,
			accuracy: total > 0 ? Math.round(mastered / total * 100) : 0
		};
	}, [rows]);
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			...form,
			id: editingId ?? void 0,
			totalCards: Number(form.totalCards) || 0,
			dueCards: Number(form.dueCards) || 0,
			masteredCards: Number(form.masteredCards) || 0
		} }),
		onSuccess: () => {
			invalidate();
			setOpen(false);
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر الحفظ", "Failed to save"))
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => remove({ data: { id } }),
		onSuccess: () => {
			invalidate();
			setPendingDelete(null);
			toast.success(bi("تم الحذف", "Deleted successfully"));
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر الحذف", "Failed to delete"))
	});
	function openDialog(row) {
		setEditingId(row?.id ?? null);
		setForm(row ? {
			deckName: row.deckName,
			totalCards: String(row.totalCards),
			dueCards: String(row.dueCards),
			masteredCards: String(row.masteredCards)
		} : EMPTY_FORM);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("البطاقات", "Flashcards"),
		icon: "Layers",
		subtitle: bi(description, "Spaced repetition: each card returns exactly when you're about to forget it."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "Layers",
					label: bi("بطاقات اليوم", "Due today"),
					value: String(stats.due)
				},
				{
					icon: "CheckCircle2",
					label: bi("بطاقات مُتقنة", "Mastered"),
					value: String(stats.mastered)
				},
				{
					icon: "Percent",
					label: bi("دقّة التذكّر", "Recall accuracy"),
					value: `${stats.accuracy}%`
				},
				{
					icon: "Library",
					label: bi("عدد المجموعات", "Decks"),
					value: String(rows?.length ?? 0)
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("مجموعاتك", "Your decks"),
				icon: "Layers",
				action: can("student_flashcards", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => openDialog(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة مجموعة", "Add deck")]
				}) : void 0,
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
				}) : rows?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: rows.map((r) => ({
					title: r.deckName,
					meta: bi(`${r.totalCards} بطاقة · ${r.dueCards} مستحقة`, `${r.totalCards} cards · ${r.dueCards} due`),
					value: bi("ابدأ", "Start"),
					tone: "primary",
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [can("student_flashcards", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							onClick: () => openDialog(r),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						}), can("student_flashcards", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							className: "text-destructive",
							onClick: () => setPendingDelete(r),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					})
				})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "Layers",
					text: bi("لا مجموعات بعد.", "No decks yet.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل مجموعة", "Edit deck") : bi("إضافة مجموعة", "Add deck") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "deck-name",
										children: bi("اسم المجموعة", "Deck name")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "deck-name",
										value: form.deckName,
										onChange: (e) => setForm((f) => ({
											...f,
											deckName: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "deck-total",
										children: bi("إجمالي البطاقات", "Total cards")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "deck-total",
										type: "number",
										min: 0,
										value: form.totalCards,
										onChange: (e) => setForm((f) => ({
											...f,
											totalCards: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "deck-due",
										children: bi("مستحقة اليوم", "Due today")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "deck-due",
										type: "number",
										min: 0,
										value: form.dueCards,
										onChange: (e) => setForm((f) => ({
											...f,
											dueCards: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "deck-mastered",
										children: bi("بطاقات مُتقنة", "Mastered cards")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "deck-mastered",
										type: "number",
										min: 0,
										value: form.masteredCards,
										onChange: (e) => setForm((f) => ({
											...f,
											masteredCards: e.target.value
										}))
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => saveMutation.mutate(),
								disabled: saveMutation.isPending || !form.deckName.trim(),
								children: bi("حفظ", "Save")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setOpen(false),
								children: bi("إلغاء", "Cancel")
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!pendingDelete,
				onOpenChange: (v) => !v && setPendingDelete(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
					className: "text-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi(`حذف «${pendingDelete?.deckName}»؟`, `Delete "${pendingDelete?.deckName}"?`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							onClick: () => pendingDelete && deleteMutation.mutate(pendingDelete.id),
							children: bi("حذف", "Delete")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: bi("إلغاء", "Cancel") })]
					})]
				})
			})
		]
	});
}
//#endregion
export { PageRoute as component };
