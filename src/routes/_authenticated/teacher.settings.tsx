import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/lib/notify";
import { Plus, Trash2 } from "lucide-react";
import { AppPage, Panel, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  setMyTeacherAvailability,
  type AvailabilitySlotInput,
} from "@/integrations/backend/teachers";
import { useBi } from "@/lib/bi";
import { authPageHead } from "@/lib/seo";

const description = "الأوقات الأسبوعية اللي بتقدر تستقبل فيها حجوزات.";

export const Route = createFileRoute("/_authenticated/teacher/settings")({
  head: () =>
    authPageHead(
      { title: "الإعدادات | أكاديميا", description },
      {
        title: "Settings | Academia",
        description: "The weekly hours you're available for bookings.",
      },
    ),
  component: () => (
    <Guard pageKey="teacher_settings">
      <Body />
    </Guard>
  ),
});

const DAYS_AR = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const DAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Body() {
  const bi = useBi();
  const [slots, setSlots] = useState<AvailabilitySlotInput[]>([]);
  const [notLinked, setNotLinked] = useState(false);

  const save = useMutation({
    mutationFn: () => setMyTeacherAvailability(slots),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(bi("تم حفظ جدول التوفّر", "Availability schedule saved"));
        setNotLinked(false);
      } else {
        setNotLinked(true);
      }
    },
    onError: () => toast.error(bi("تعذّر الحفظ، حاول مجدداً", "Failed to save, please try again")),
  });

  const addSlot = () =>
    setSlots((s) => [
      ...s,
      {
        dayOfWeek: 0,
        startTime: "09:00:00",
        endTime: "10:00:00",
        teachingMode: 2,
        effectiveFrom: null,
        effectiveTo: null,
      },
    ]);
  const removeSlot = (i: number) => setSlots((s) => s.filter((_, idx) => idx !== i));
  const updateSlot = (i: number, patch: Partial<AvailabilitySlotInput>) =>
    setSlots((s) => s.map((slot, idx) => (idx === i ? { ...slot, ...patch } : slot)));
  const todayIso = () => new Date().toISOString().slice(0, 10);

  if (notLinked) {
    return (
      <AppPage title={bi("الإعدادات", "Settings")} icon="Settings">
        <EmptyState
          icon="UserX"
          title={bi(
            "حسابك لسا مش مربوط بملف معلم بالباك اند",
            "Your account isn't linked to a teacher record yet",
          )}
          description={bi(
            "نفس القيد بصفحة تعديل الملف — الباك اند ما بينشئ ملف معلم تلقائياً عند التسجيل حالياً. تواصل مع الدعم لربط حسابك.",
            "Same limitation as the profile page — the backend doesn't auto-create a teacher record on registration yet. Contact support to get your account linked.",
          )}
        />
        <div className="mt-4">
          <Button variant="outline" onClick={() => setNotLinked(false)}>
            {bi("رجوع", "Back")}
          </Button>
        </div>
      </AppPage>
    );
  }

  return (
    <AppPage
      title={bi("الإعدادات", "Settings")}
      icon="Settings"
      subtitle={bi(description, description)}
    >
      <Panel
        title={bi("جدول التوفّر الأسبوعي", "Weekly availability")}
        icon="CalendarClock"
        action={
          <Button size="sm" variant="outline" onClick={addSlot}>
            <Plus className="size-4" />
            {bi("إضافة وقت", "Add slot")}
          </Button>
        }
      >
        {slots.length ? (
          <div className="space-y-3">
            {slots.map((slot, i) => {
              const hasRange = slot.effectiveFrom != null || slot.effectiveTo != null;
              return (
                <div key={i} className="space-y-2 rounded-xl border border-border p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Select
                      value={String(slot.dayOfWeek)}
                      onValueChange={(v) => updateSlot(i, { dayOfWeek: Number(v) })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DAYS_AR.map((d, idx) => (
                          <SelectItem key={idx} value={String(idx)}>
                            {bi(d, DAYS_EN[idx])}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="time"
                      value={slot.startTime.slice(0, 5)}
                      onChange={(e) => updateSlot(i, { startTime: `${e.target.value}:00` })}
                      className="w-28"
                    />
                    <span className="text-muted-foreground">—</span>
                    <Input
                      type="time"
                      value={slot.endTime.slice(0, 5)}
                      onChange={(e) => updateSlot(i, { endTime: `${e.target.value}:00` })}
                      className="w-28"
                    />
                    <Select
                      value={String(slot.teachingMode)}
                      onValueChange={(v) => updateSlot(i, { teachingMode: Number(v) as 1 | 2 })}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">{bi("أونلاين", "Online")}</SelectItem>
                        <SelectItem value="1">{bi("حضوري", "In-person")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => removeSlot(i)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>

                  {hasRange ? (
                    <div className="flex flex-wrap items-center gap-2 ps-1">
                      <span className="text-xs text-muted-foreground">
                        {bi("سارٍ من", "Valid from")}
                      </span>
                      <Input
                        type="date"
                        value={slot.effectiveFrom?.slice(0, 10) ?? ""}
                        onChange={(e) => updateSlot(i, { effectiveFrom: e.target.value || null })}
                        className="w-40"
                      />
                      <span className="text-xs text-muted-foreground">{bi("لحد", "until")}</span>
                      <Input
                        type="date"
                        value={slot.effectiveTo?.slice(0, 10) ?? ""}
                        onChange={(e) => updateSlot(i, { effectiveTo: e.target.value || null })}
                        className="w-40"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs text-muted-foreground"
                        onClick={() => updateSlot(i, { effectiveFrom: null, effectiveTo: null })}
                      >
                        {bi("إلغاء الفترة (دائم)", "Clear (always valid)")}
                      </Button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="ps-1 text-xs font-semibold text-primary hover:underline"
                      onClick={() =>
                        updateSlot(i, { effectiveFrom: todayIso(), effectiveTo: null })
                      }
                    >
                      {bi(
                        "+ تحديد فترة صلاحية (اختياري)",
                        "+ Set a valid-through date range (optional)",
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon="CalendarClock"
            text={bi("ما ضفت أوقات توفّر بعد.", "You haven't added any availability slots yet.")}
          />
        )}
      </Panel>

      <div className="flex justify-end">
        <Button onClick={() => save.mutate()} disabled={save.isPending}>
          {save.isPending ? bi("جارٍ الحفظ…", "Saving…") : bi("حفظ الجدول", "Save schedule")}
        </Button>
      </div>
    </AppPage>
  );
}
