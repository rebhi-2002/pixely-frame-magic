import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AppPage, Panel, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { updateMyTeacherProfile, type TeacherProfileInput } from "@/integrations/backend/teachers";
import { useBi } from "@/lib/bi";
import { authPageHead } from "@/lib/seo";

const description = "هذا ما يراه الطلاب: نبذتك، خبرتك، وأسعارك بدليل المعلمين.";

export const Route = createFileRoute("/_authenticated/teacher/profile/edit")({
  head: () =>
    authPageHead(
      { title: "تعديل ملفي | أكاديميا", description },
      {
        title: "Edit my profile | Academia",
        description: "What students see: your bio, experience, and prices.",
      },
    ),
  component: () => (
    <Guard pageKey="teacher_profile_edit">
      <Body />
    </Guard>
  ),
});

const EMPTY: TeacherProfileInput = {
  bio: "",
  qualifications: "",
  experienceYears: 0,
  serviceArea: "",
  languages: "",
  supportsOnline: true,
  supportsInPerson: false,
  hourlyPriceOnline: undefined,
  hourlyPriceInPerson: undefined,
  isPublicForDiscovery: false,
  subjectIds: [],
  gradeIds: [],
};

function Body() {
  const bi = useBi();
  const [form, setForm] = useState<TeacherProfileInput>(EMPTY);
  const [notLinked, setNotLinked] = useState(false);

  const save = useMutation({
    mutationFn: () => updateMyTeacherProfile(form),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(bi("تم حفظ ملفك المهني", "Your professional profile was saved"));
        setNotLinked(false);
      } else {
        setNotLinked(true);
      }
    },
    onError: () => toast.error(bi("تعذّر الحفظ، حاول مجدداً", "Failed to save, please try again")),
  });

  if (notLinked) {
    return (
      <AppPage title={bi("تعديل ملفي", "Edit my profile")} icon="UserCog">
        <EmptyState
          icon="UserX"
          title={bi(
            "حسابك لسا مش مربوط بملف معلم بالباك اند",
            "Your account isn't linked to a teacher record on the backend yet",
          )}
          description={bi(
            "هاي مو مشكلة بالبيانات يلي كتبتها — الباك اند حالياً ما بينشئ ملف معلم تلقائياً عند التسجيل. تواصل مع الدعم الفني لربط حسابك، وبترجع تقدر تحفظ.",
            "This isn't about what you typed — the backend doesn't auto-create a teacher record on registration yet. Contact support to link your account, then you'll be able to save.",
          )}
        />
        <div className="mt-4">
          <Button variant="outline" onClick={() => setNotLinked(false)}>
            {bi("رجوع للنموذج", "Back to the form")}
          </Button>
        </div>
      </AppPage>
    );
  }

  return (
    <AppPage
      title={bi("تعديل ملفي", "Edit my profile")}
      icon="UserCog"
      subtitle={bi(description, "What students see: your bio, experience, and prices.")}
    >
      <Panel title={bi("نبذة عني", "About me")} icon="FileText">
        <div className="space-y-4">
          <div>
            <Label>{bi("نبذة تعريفية", "Bio")}</Label>
            <Textarea
              value={form.bio ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              rows={4}
            />
          </div>
          <div>
            <Label>{bi("المؤهلات العلمية", "Qualifications")}</Label>
            <Textarea
              value={form.qualifications ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, qualifications: e.target.value }))}
              rows={2}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>{bi("سنوات الخبرة", "Years of experience")}</Label>
              <Input
                type="number"
                min={0}
                max={60}
                value={form.experienceYears}
                onChange={(e) =>
                  setForm((f) => ({ ...f, experienceYears: Number(e.target.value) }))
                }
              />
            </div>
            <div>
              <Label>{bi("منطقة الخدمة", "Service area")}</Label>
              <Input
                value={form.serviceArea ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, serviceArea: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <Label>{bi("اللغات", "Languages")}</Label>
            <Input
              value={form.languages ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, languages: e.target.value }))}
              placeholder={bi("مثال: العربية، الإنجليزية", "e.g. Arabic, English")}
            />
          </div>
        </div>
      </Panel>

      <Panel title={bi("طريقة التدريس والأسعار", "Teaching mode & pricing")} icon="Wallet">
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-border p-3">
            <div>
              <p className="text-sm font-semibold">{bi("أونلاين", "Online")}</p>
            </div>
            <Switch
              checked={form.supportsOnline}
              onCheckedChange={(v) => setForm((f) => ({ ...f, supportsOnline: v }))}
            />
          </div>
          {form.supportsOnline && (
            <div>
              <Label>{bi("سعر الساعة أونلاين", "Hourly price (online)")}</Label>
              <Input
                type="number"
                value={form.hourlyPriceOnline ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    hourlyPriceOnline: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
              />
            </div>
          )}
          <div className="flex items-center justify-between rounded-xl border border-border p-3">
            <p className="text-sm font-semibold">{bi("حضورياً", "In-person")}</p>
            <Switch
              checked={form.supportsInPerson}
              onCheckedChange={(v) => setForm((f) => ({ ...f, supportsInPerson: v }))}
            />
          </div>
          {form.supportsInPerson && (
            <div>
              <Label>{bi("سعر الساعة حضورياً", "Hourly price (in-person)")}</Label>
              <Input
                type="number"
                value={form.hourlyPriceInPerson ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    hourlyPriceInPerson: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
              />
            </div>
          )}
          <div className="flex items-center justify-between rounded-xl border border-border p-3">
            <div>
              <p className="text-sm font-semibold">
                {bi("إظهار ملفي بدليل المعلمين", "Show my profile in the directory")}
              </p>
              <p className="text-xs text-muted-foreground">
                {bi(
                  "لازم يكون مفعّل حتى يقدر الطلاب يلاقوك بالبحث.",
                  "Must be on for students to find you in search.",
                )}
              </p>
            </div>
            <Switch
              checked={form.isPublicForDiscovery}
              onCheckedChange={(v) => setForm((f) => ({ ...f, isPublicForDiscovery: v }))}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {bi(
              "⚠️ اختيار المواد والصفوف لسا مش متاح — الباك اند ما عنده بيانات مواد/صفوف حقيقية بعد.",
              "⚠️ Choosing subjects and grades isn't available yet — the backend has no real subject/grade data yet.",
            )}
          </p>
        </div>
      </Panel>

      <div className="flex justify-end">
        <Button onClick={() => save.mutate()} disabled={save.isPending}>
          {save.isPending ? bi("جارٍ الحفظ…", "Saving…") : bi("حفظ التغييرات", "Save changes")}
        </Button>
      </div>
    </AppPage>
  );
}
