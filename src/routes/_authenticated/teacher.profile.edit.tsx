import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Pencil } from "lucide-react";
import { AppPage, StatGrid, Panel, RowList } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getTeacherProfile, saveTeacherProfile } from "@/lib/account-pages.functions";
import { listTeacherCourses } from "@/lib/teacher-teaching.functions";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";

const title = "ملفي العام | أكاديميا";
const description = "هذا ما يراه الطلاب وأولياء الأمور: نبذتك، موادك، وشهاداتك الموثّقة.";

export const Route = createFileRoute("/_authenticated/teacher/profile/edit")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PageRoute,
});

function PageRoute() {
  return (
    <Guard pageKey="teacher_profile_edit">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchProfile = useServerFn(getTeacherProfile);
  const persist = useServerFn(saveTeacherProfile);
  const fetchCourses = useServerFn(listTeacherCourses);

  const profileQuery = useQuery({ queryKey: ["teacher-profile"], queryFn: () => fetchProfile() });
  const coursesQuery = useQuery({ queryKey: ["teacher-courses"], queryFn: () => fetchCourses() });

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ displayName: "", bio: "", subjectsLabel: "" });

  const isLoading = profileQuery.isLoading || coursesQuery.isLoading;
  const profile = profileQuery.data;
  const students = (coursesQuery.data ?? []).reduce((s, c) => s + c.enrolledCount, 0);

  const saveMutation = useMutation({
    mutationFn: () => persist({ data: form }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-profile"] });
      setOpen(false);
      toast.success(bi("تم الحفظ", "Saved successfully"));
    },
    onError: (e) =>
      toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save"))),
  });

  function openDialog() {
    if (!profile) return;
    setForm({
      displayName: profile.displayName,
      bio: profile.bio,
      subjectsLabel: profile.subjectsLabel,
    });
    setOpen(true);
  }

  return (
    <AppPage
      title={bi("ملفي العام", "Public profile")}
      icon="UserCog"
      subtitle={bi(
        description,
        "This is what students and parents see: your bio, subjects and verified credentials.",
      )}
    >
      {isLoading || !profile ? (
        <div className="flex justify-center py-10">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <StatGrid
            items={[
              {
                icon: "BadgeCheck",
                label: bi("حالة التوثيق", "Verification"),
                value: bi("موثّق", "Verified"),
              },
              {
                icon: "Eye",
                label: bi("زيارات الملف", "Profile views"),
                value: String(profile.profileViews),
              },
              { icon: "Star", label: bi("التقييم", "Rating"), value: String(profile.rating) },
              { icon: "Users", label: bi("طلاب", "Students"), value: String(students) },
            ]}
          />
          <Panel
            title={bi("بيانات الملف", "Profile fields")}
            icon="UserCog"
            action={
              can("teacher_profile_edit", "edit_profile") ? (
                <Button size="sm" variant="outline" onClick={openDialog}>
                  <Pencil className="size-4" />
                  {bi("تعديل", "Edit")}
                </Button>
              ) : undefined
            }
          >
            <RowList
              rows={[
                {
                  title: bi("الاسم المعروض", "Display name"),
                  meta: profile.displayName,
                  tone: "primary",
                },
                { title: bi("النبذة", "Bio"), meta: profile.bio, tone: "primary" },
                { title: bi("المواد", "Subjects"), meta: profile.subjectsLabel, tone: "primary" },
                {
                  title: bi("الشهادات", "Credentials"),
                  meta: bi("بكالوريوس رياضيات — موثّقة", "BSc Mathematics — verified"),
                  value: bi("موثّقة", "Verified"),
                  tone: "success",
                },
              ]}
            />
          </Panel>
        </>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-start">
          <DialogHeader>
            <DialogTitle>{bi("تعديل بيانات الملف", "Edit profile fields")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="tp-name">{bi("الاسم المعروض", "Display name")}</Label>
              <Input
                id="tp-name"
                value={form.displayName}
                onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tp-bio">{bi("النبذة", "Bio")}</Label>
              <Textarea
                id="tp-bio"
                value={form.bio}
                onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tp-subjects">{bi("المواد", "Subjects")}</Label>
              <Input
                id="tp-subjects"
                value={form.subjectsLabel}
                onChange={(e) => setForm((f) => ({ ...f, subjectsLabel: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !form.displayName.trim()}
            >
              {bi("حفظ", "Save")}
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {bi("إلغاء", "Cancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppPage>
  );
}
