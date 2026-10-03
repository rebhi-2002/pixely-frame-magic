// نافذة طلب إعادة جدولة حجز (WP-S3 / S3-01 / S3-03 — العقد C-05): { booking, open, onOpenChange }.
// Student/RequestReschedule {bookingId, proposedDate, proposedStartTime, note}. الجدول الأصلي لا يتغيّر
// قبل موافقة المعلم. تعارض/عدم توفّر المعلم = رسالة الباك اند (Q-09) وبتبقى النافذة مفتوحة لاقتراح وقت آخر.
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/integrations/backend/client";
import { assertOk } from "@/integrations/backend/op-result";
import { requestReschedule, type StudentBookingDetail } from "@/integrations/backend/student";
import { useBi } from "@/lib/bi";
import type { Bi } from "@/lib/enums";
import { invalidateBookingQueries } from "@/lib/query-keys";
import {
  MAX_RESCHEDULE_NOTE_LENGTH,
  normalizeNote,
  todayLocalIso,
  validateRescheduleDraft,
  type RescheduleError,
} from "@/lib/reschedule-validation";

export interface RescheduleDialogProps {
  booking: StudentBookingDetail;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function errorText(code: RescheduleError, bi: Bi): string {
  switch (code) {
    case "date":
      return bi("اختر تاريخًا صحيحًا", "Choose a valid date");
    case "time":
      return bi("اختر وقتًا صحيحًا", "Choose a valid time");
    case "past":
      return bi("الموعد المقترح لازم يكون بالمستقبل", "The proposed time must be in the future");
    case "note":
      return bi(
        `الملاحظة طويلة (الحد ${MAX_RESCHEDULE_NOTE_LENGTH} حرفًا)`,
        `The note is too long (max ${MAX_RESCHEDULE_NOTE_LENGTH} characters)`,
      );
  }
}

export function RescheduleDialog({ booking, open, onOpenChange }: RescheduleDialogProps) {
  const bi = useBi();
  const queryClient = useQueryClient();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setDate("");
      setTime("");
      setNote("");
      setAttempted(false);
      setError(null);
    }
  }, [open]);

  const draftErrors = validateRescheduleDraft({ date, time, note });

  const submit = useMutation({
    mutationFn: async () => {
      const bookingId = booking.id;
      if (typeof bookingId !== "number") {
        throw new Error(bi("رقم الحجز غير متوفر", "The booking number is unavailable"));
      }
      const result = await requestReschedule({
        bookingId,
        proposedDate: date,
        proposedStartTime: time,
        note: normalizeNote(note),
      });
      assertOk(result, "تعذّر إرسال طلب إعادة الجدولة", "Couldn't send the reschedule request");
      return bookingId;
    },
    onSuccess: (bookingId: number) => {
      invalidateBookingQueries(queryClient, bookingId);
      toast.success(
        bi(
          "تم إرسال طلب إعادة الجدولة — بانتظار موافقة المعلم.",
          "Reschedule request sent — awaiting the teacher's approval.",
        ),
      );
      onOpenChange(false);
    },
    onError: (e: unknown) =>
      setError(
        getErrorMessage(
          e,
          bi("تعذّر إرسال طلب إعادة الجدولة", "Couldn't send the reschedule request"),
        ),
      ),
  });

  const show = (code: RescheduleError) => attempted && draftErrors.includes(code);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => (submit.isPending ? undefined : onOpenChange(next))}
    >
      <DialogContent className="text-start">
        <DialogHeader>
          <DialogTitle>{bi("طلب إعادة جدولة", "Request a reschedule")}</DialogTitle>
          <DialogDescription>
            {bi(
              "اقترح موعدًا جديدًا. يبقى موعدك الحالي كما هو حتى يوافق المعلم على الطلب.",
              "Propose a new time. Your current time stays as is until the teacher approves.",
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="rs-date">{bi("التاريخ المقترح", "Proposed date")}</Label>
            <Input
              id="rs-date"
              type="date"
              min={todayLocalIso()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              aria-invalid={show("date") || show("past") || undefined}
              disabled={submit.isPending}
            />
            {show("date") && <FieldError text={errorText("date", bi)} />}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="rs-time">{bi("الوقت المقترح", "Proposed time")}</Label>
            <Input
              id="rs-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              aria-invalid={show("time") || show("past") || undefined}
              disabled={submit.isPending}
            />
            {show("time") && <FieldError text={errorText("time", bi)} />}
          </div>
        </div>
        {show("past") && <FieldError text={errorText("past", bi)} />}

        <div className="space-y-1.5">
          <Label htmlFor="rs-note">
            {bi("ملاحظة للمعلم (اختياري)", "Note to the teacher (optional)")}
          </Label>
          <Textarea
            id="rs-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            aria-invalid={show("note") || undefined}
            disabled={submit.isPending}
          />
          {show("note") && <FieldError text={errorText("note", bi)} />}
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </p>
        )}

        <DialogFooter className="gap-2 sm:justify-start">
          <Button
            loading={submit.isPending}
            disabled={typeof booking.id !== "number"}
            onClick={() => {
              setAttempted(true);
              setError(null);
              if (draftErrors.length === 0) submit.mutate();
            }}
          >
            {bi("إرسال الطلب", "Send request")}
          </Button>
          <Button variant="outline" disabled={submit.isPending} onClick={() => onOpenChange(false)}>
            {bi("إلغاء", "Cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function FieldError({ text }: { text: string }) {
  return (
    <p role="alert" className="text-xs text-destructive">
      {text}
    </p>
  );
}
