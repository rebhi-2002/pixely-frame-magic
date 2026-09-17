import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi, p as getErrorMessage } from "./rbac-static-data-DgiM51a_.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as LoaderCircle, A as RotateCw, At as ChevronLeft, F as Pencil, P as Plus, kt as ChevronRight, p as Trash2 } from "../_libs/lucide-react.mjs";
import { A as description$25 } from "./router-B2E04MFx.mjs";
import { n as useServerFn } from "./createSsrRpc-D3FH_hmA.mjs";
import { d as useAccess } from "./use-access-BCs0D1hx.mjs";
import { n as Guard } from "./guard-CaBAnt-a.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { i as EmptyState, l as RowList, o as Panel, t as AppPage, u as StatGrid } from "./kit-Ctaz_npe.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CE79KVEh.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-CRZk8vpy.mjs";
import { f as saveFlashcardDeck, n as deleteFlashcardDeck, s as listFlashcardDecks } from "./student-learning.functions-DB5nQVh4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flashcards-DTPduBxB.js
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
	const [studyDeck, setStudyDeck] = (0, import_react.useState)(null);
	const [studyIndex, setStudyIndex] = (0, import_react.useState)(0);
	const [flipped, setFlipped] = (0, import_react.useState)(false);
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
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save")))
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => remove({ data: { id } }),
		onSuccess: () => {
			invalidate();
			setPendingDelete(null);
			toast.success(bi("تم الحذف", "Deleted successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete")))
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
	function startStudy(row) {
		setStudyDeck(row);
		setStudyIndex(0);
		setFlipped(false);
	}
	const currentCard = studyDeck?.cards?.[studyIndex];
	function goToCard(delta) {
		if (!studyDeck?.cards) return;
		const next = studyIndex + delta;
		if (next < 0 || next >= studyDeck.cards.length) return;
		setStudyIndex(next);
		setFlipped(false);
	}
	function markMastered() {
		if (!studyDeck) return;
		const nextDue = Math.max(0, studyDeck.dueCards - 1);
		const nextMastered = studyDeck.masteredCards + 1;
		persist({ data: {
			id: studyDeck.id,
			deckName: studyDeck.deckName,
			totalCards: studyDeck.totalCards,
			dueCards: nextDue,
			masteredCards: nextMastered
		} }).then(() => {
			invalidate();
			setStudyDeck((d) => d ? {
				...d,
				dueCards: nextDue,
				masteredCards: nextMastered
			} : d);
		});
		if (studyDeck.cards && studyIndex < studyDeck.cards.length - 1) goToCard(1);
		else {
			toast.success(bi("خلّصت مراجعة هالمجموعة 🎉", "You finished reviewing this deck 🎉"));
			setStudyDeck(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("البطاقات", "Flashcards"),
		icon: "Layers",
		subtitle: bi(description$25, "A tracker for your card decks: how many cards, how many due, how many mastered."),
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
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => startStudy(r),
								children: bi("ابدأ", "Start")
							}),
							can("student_flashcards", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: () => openDialog(r),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}),
							can("student_flashcards", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => setPendingDelete(r),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})
						]
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!studyDeck,
				onOpenChange: (v) => !v && setStudyDeck(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: studyDeck?.deckName }) }),
						currentCard ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-center text-xs text-muted-foreground",
									children: bi(`بطاقة ${studyIndex + 1} من ${studyDeck?.cards?.length}`, `Card ${studyIndex + 1} of ${studyDeck?.cards?.length}`)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setFlipped((f) => !f),
									className: "flex min-h-40 w-full items-center justify-center rounded-2xl border border-border bg-card p-6 text-center shadow-elevation-2 transition-all duration-200",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "animate-in fade-in zoom-in-95 font-display text-lg font-bold text-foreground duration-200",
										children: flipped ? currentCard.back : currentCard.front
									}, flipped ? "back" : "front")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "size-3.5" }), bi("دوس على البطاقة تشوف الجواب", "Tap the card to see the answer")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											onClick: () => goToCard(-1),
											disabled: studyIndex === 0,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											onClick: markMastered,
											className: "flex-1",
											children: bi("أتقنتها ✓", "Got it ✓")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											onClick: () => goToCard(1),
											disabled: !studyDeck?.cards || studyIndex >= studyDeck.cards.length - 1,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
										})
									]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: "Layers",
							text: bi("هذي المجموعة عدّاد بس، ما إلها بطاقات فعلية بعد. جرّب «رياضيات — مشتقات» كمثال.", "This deck is a counter only — no real cards yet. Try “Math — derivatives” as an example.")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
							className: "sm:justify-start",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setStudyDeck(null),
								children: bi("إغلاق", "Close")
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
export { PageRoute as component };
