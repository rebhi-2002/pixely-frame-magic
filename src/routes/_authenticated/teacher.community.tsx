import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Check, Loader2 } from "lucide-react";
import { AppPage, StatGrid, Panel, RowList, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { Button } from "@/components/ui/button";
import { answerClassQuestion, listClassQuestions } from "@/lib/teacher-followup.functions";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";

const title = "أسئلة طلابي | أكاديميا";
const description = "أسئلة طلابك في مكان واحد، وسجّل جوابك عليها.";

export const Route = createFileRoute("/_authenticated/teacher/community")({
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
    <Guard pageKey="teacher_community">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { can } = useAccess();
  const fetchQuestions = useServerFn(listClassQuestions);
  const answer = useServerFn(answerClassQuestion);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["class-questions"],
    queryFn: () => fetchQuestions(),
  });

  const list = rows ?? [];
  const open = useMemo(() => list.filter((q) => q.status === "مفتوح"), [list]);
  const answered = useMemo(() => list.filter((q) => q.status === "إجابة معلم"), [list]);

  const answerMutation = useMutation({
    mutationFn: (id: string) => answer({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class-questions"] });
      toast.success(bi("تم تمييز إجابتك", "Your answer was marked"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر التحديث", "Failed to update"))),
  });

  return (
    <AppPage
      title={bi("أسئلة طلابي", "My students' questions")}
      icon="MessagesSquare"
      subtitle={bi(
        description,
        "Your students' questions in one place, so you can log your answer.",
      )}
    >
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <StatGrid
            items={[
              {
                icon: "MessagesSquare",
                label: bi("أسئلة مفتوحة", "Open questions"),
                value: String(open.length),
              },
              {
                icon: "CheckCheck",
                label: bi("أجبت عليها", "You answered"),
                value: String(answered.length),
              },
              { icon: "Flag", label: bi("بلاغات", "Reports"), value: "0" },
              {
                icon: "Clock",
                label: bi("متوسط زمن الرد", "Avg. response"),
                value: bi("4 س", "4 hrs"),
              },
            ]}
          />

          <Panel title={bi("بانتظار جوابك", "Awaiting your answer")} icon="MessagesSquare">
            {open.length ? (
              <RowList
                rows={open.map((q) => ({
                  title: q.questionTitle,
                  meta: bi(
                    `${q.subjectName} · ${q.answersCount} إجابات`,
                    `${q.subjectName} · ${q.answersCount} answers`,
                  ),
                  value: bi("مفتوح", "Open"),
                  tone: "primary" as const,
                  actions: can("teacher_community", "edit") ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => answerMutation.mutate(q.id)}
                      disabled={answerMutation.isPending}
                    >
                      <Check className="size-4" />
                      {bi("تمييز كمُجاب", "Mark answered")}
                    </Button>
                  ) : undefined,
                }))}
              />
            ) : (
              <EmptyState
                icon="MessagesSquare"
                text={bi("ولا سؤال بانتظارك 🎉", "No questions waiting for you 🎉")}
              />
            )}
          </Panel>

          <Panel title={bi("أجبت عليها", "You answered")} icon="CheckCheck">
            {answered.length ? (
              <RowList
                rows={answered.map((q) => ({
                  title: q.questionTitle,
                  meta: q.subjectName,
                  value: bi("إجابة معلم", "Teacher answer"),
                  tone: "success" as const,
                }))}
              />
            ) : (
              <EmptyState
                icon="CheckCheck"
                text={bi("ما جاوبت أي سؤال بعد.", "You haven't answered any question yet.")}
              />
            )}
          </Panel>
        </>
      )}
    </AppPage>
  );
}
