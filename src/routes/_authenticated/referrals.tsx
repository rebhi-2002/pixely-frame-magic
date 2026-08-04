import { createFileRoute } from "@tanstack/react-router";
import { AppPage, StatGrid, Panel, RowList, Progress, DataTable, QuickLinks, Badge, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";

const title = "الإحالات | أكاديميا";
const description = "ادعُ أصدقاءك برابطك الخاص، وتابع كم صديق سجّل فعلياً ومكافآتك.";

export const Route = createFileRoute("/_authenticated/referrals")({
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
    <Guard pageKey="student_referrals">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("الإحالات", "Referrals")}
      icon="Gift"
      subtitle={bi("ادعُ أصدقاءك برابطك الخاص، وتابع كم صديق سجّل فعلياً ومكافآتك.", "Invite friends with your own link, and track who joined and what you earned.")}
    >
      <StatGrid
        items={[
          { icon: "Link", label: bi("رابطك", "Your link"), value: "acadimia/r/AH12" },
          { icon: "UserPlus", label: bi("دعوات مُرسلة", "Invites sent"), value: "9" },
          { icon: "CheckCircle2", label: bi("سجّلوا فعلياً", "Joined"), value: "4" },
          { icon: "Gift", label: bi("مكافآتك", "Rewards"), value: "2 شهور" },
        ]}
      />
      <Panel title={bi("من دعوتهم", "People you invited")} icon="Users">
        <RowList to="/invite/AH12"
          rows={[
            { title: bi("لؤي ع.", "Loai A."), meta: bi("سجّل 2026/07/12", "Joined 2026/07/12"), value: bi("مكافأة", "Rewarded"), tone: "success" },
            { title: bi("سما ح.", "Sama H."), meta: bi("سجّل 2026/07/03", "Joined 2026/07/03"), value: bi("مكافأة", "Rewarded"), tone: "success" },
            { title: bi("يزن م.", "Yazan M."), meta: bi("الدعوة مفتوحة", "Invite pending"), value: bi("معلّق", "Pending"), tone: "muted" },
          ]}
        />
      </Panel>
    </AppPage>
  );
}
