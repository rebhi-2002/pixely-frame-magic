import { createFileRoute } from "@tanstack/react-router";
import {
  AppPage,
  StatGrid,
  Panel,
  RowList,
  Progress,
  DataTable,
  QuickLinks,
  Badge,
  EmptyState,
} from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";

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
  return (
    <AppPage
      title={bi("ملفي العام", "Public profile")}
      icon="UserCog"
      subtitle={bi(
        "هذا ما يراه الطلاب وأولياء الأمور: نبذتك، موادك، وشهاداتك الموثّقة.",
        "This is what students and parents see: your bio, subjects and verified credentials.",
      )}
    >
      <StatGrid
        items={[
          { icon: "BadgeCheck", label: bi("حالة التوثيق", "Verification"), value: bi("موثّق", "Verified") },
          { icon: "Eye", label: bi("زيارات الملف", "Profile views"), value: "1,860" },
          { icon: "Star", label: bi("التقييم", "Rating"), value: "4.8" },
          { icon: "Users", label: bi("طلاب", "Students"), value: "126" },
        ]}
      />
      <Panel title={bi("بيانات الملف", "Profile fields")} icon="UserCog">
        <RowList
          rows={[
            {
              title: bi("الاسم المعروض", "Display name"),
              meta: bi("أ. سامي خالد", "Mr. Sami Khaled"),
              value: bi("تعديل", "Edit"),
              tone: "primary",
            },
            {
              title: bi("النبذة", "Bio"),
              meta: bi("معلم رياضيات — 12 سنة خبرة", "Math teacher — 12 years"),
              value: bi("تعديل", "Edit"),
              tone: "primary",
            },
            {
              title: bi("المواد", "Subjects"),
              meta: bi("رياضيات · فيزياء", "Math · Physics"),
              value: bi("تعديل", "Edit"),
              tone: "primary",
            },
            {
              title: bi("الشهادات", "Credentials"),
              meta: bi("بكالوريوس رياضيات — موثّقة", "BSc Mathematics — verified"),
              value: bi("موثّقة", "Verified"),
              tone: "success",
            },
          ]}
        />
      </Panel>
    </AppPage>
  );
}
