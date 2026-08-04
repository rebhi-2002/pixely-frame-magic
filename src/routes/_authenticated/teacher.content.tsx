import { createFileRoute } from "@tanstack/react-router";
import { AppPage, StatGrid, Panel, RowList, Progress, DataTable, QuickLinks, Badge, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";

const title = "المحتوى | أكاديميا";
const description = "دروسك وملفاتك: ارفع، رتّب على شجرة المنهاج، وأرسل للمراجعة قبل النشر.";

export const Route = createFileRoute("/_authenticated/teacher/content")({
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
    <Guard pageKey="teacher_content">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("المحتوى", "Content")}
      icon="FileStack"
      subtitle={bi("دروسك وملفاتك: ارفع، رتّب على شجرة المنهاج، وأرسل للمراجعة قبل النشر.", "Your lessons and files: upload, place on the curriculum tree, submit for review.")}
    >
      <StatGrid
        items={[
          { icon: "FileStack", label: bi("دروس منشورة", "Published"), value: "42" },
          { icon: "Clock", label: bi("قيد المراجعة", "In review"), value: "5" },
          { icon: "FileEdit", label: bi("مسوّدات", "Drafts"), value: "8" },
          { icon: "Eye", label: bi("مشاهدات الشهر", "Views this month"), value: "3,140" },
        ]}
      />
      <Panel title={bi("أحدث المحتوى", "Recent content")} icon="FileStack">
        <DataTable
          head={[bi("العنوان", "Title"), bi("المادة", "Subject"), bi("الحالة", "Status"), bi("مشاهدات", "Views")]}
          rows={[
            [bi("الدوال — شرح كامل", "Functions — full lesson"), bi("رياضيات", "Math"), <Badge tone="muted">{bi("قيد المراجعة", "In review")}</Badge>, "—"],
            [bi("قوانين نيوتن", "Newton's laws"), bi("فيزياء", "Physics"), <Badge tone="success">{bi("منشور", "Published")}</Badge>, "1,204"],
            [bi("ورقة تدريب المشتقات", "Derivatives worksheet"), bi("رياضيات", "Math"), <Badge tone="primary">{bi("مسوّدة", "Draft")}</Badge>, "—"],
          ]}
        />
      </Panel>
    </AppPage>
  );
}
