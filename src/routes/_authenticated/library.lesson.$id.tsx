import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
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
import { cn } from "@/lib/utils";

const title = "صفحة الدرس (معاينة تصميم) | أكاديميا";
const description = "معاينة تصميم لشكل صفحة الدرس المستقبلية — لسا مش موصولة بمحتوى حقيقي.";

export const Route = createFileRoute("/_authenticated/library/lesson/$id")({
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
    <Guard pageKey="student_library">
      <Body />
    </Guard>
  );
}

// أسئلة مثال تفاعلية فعلية (تُجاب محليًا بالمتصفح، بدون حفظ خلف الكواليس) —
// لتجربة "دوس وشوف صح/غلط فورًا" الحقيقية، بانتظار محتوى دروس حقيقي بالباك اند.
const SAMPLE_QUESTIONS = [
  {
    q: ["ما ناتج مشتقة x²؟", "What is the derivative of x²?"] as [string, string],
    options: [
      ["x", "x"],
      ["2x", "2x"],
      ["x²", "x²"],
      ["2", "2"],
    ] as [string, string][],
    correct: 1,
  },
  {
    q: [
      "أي مما يلي يمثّل قانون نيوتن الثاني؟",
      "Which of these is Newton's second law?",
    ] as [string, string],
    options: [
      ["F = m × a", "F = m × a"],
      ["E = m × c²", "E = m × c²"],
      ["V = I × R", "V = I × R"],
      ["P = m × v", "P = m × v"],
    ] as [string, string][],
    correct: 0,
  },
];

function Body() {
  const bi = useBi();
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const score = Object.entries(answers).filter(
    ([qi, choice]) => SAMPLE_QUESTIONS[Number(qi)].correct === choice,
  ).length;
  return (
    <AppPage
      title={bi("صفحة الدرس", "Lesson page")}
      icon="FileText"
      subtitle={bi(
        "معاينة تصميم لشكل صفحة الدرس المستقبلية — المحتوى والأزرار هون توضيحية ولسا مش موصولة بمحتوى حقيقي.",
        "A design preview of the upcoming lesson page — content and buttons here are illustrative and not wired to real content yet.",
      )}
      actions={
        <span className="inline-flex items-center rounded-full bg-info/12 px-3 py-1 text-xs font-bold text-info">
          {bi("معاينة تصميم", "Design preview")}
        </span>
      }
    >
      <StatGrid
        items={[
          { icon: "Clock", label: bi("مدة الدرس", "Duration"), value: bi("18 د", "18 min") },
          { icon: "ListChecks", label: bi("أسئلة", "Questions"), value: "10" },
          { icon: "Layers", label: bi("بطاقات", "Flashcards"), value: "12" },
          { icon: "Target", label: bi("نتيجتك", "Your score"), value: "80%" },
        ]}
      />
      <Panel title={bi("محتوى الدرس", "Lesson content")} icon="FileStack">
        <RowList
          rows={[
            {
              title: bi("شرح مكتوب + ملخص", "Written explanation + summary"),
              meta: bi("PDF · 4 صفحات", "PDF · 4 pages"),
              value: bi("فتح", "Open"),
              tone: "primary",
            },
            {
              title: bi("فيديو الشرح", "Explainer video"),
              meta: bi("12 دقيقة", "12 minutes"),
              value: bi("مشاهدة", "Watch"),
              tone: "primary",
            },
            {
              title: bi("ورقة تدريب", "Practice sheet"),
              meta: bi("8 أسئلة", "8 questions"),
              value: bi("تحميل", "Download"),
              tone: "muted",
            },
          ]}
        />
      </Panel>
      <Panel
        title={bi("جرّب سؤالين فعليين", "Try two real questions")}
        icon="HelpCircle"
        action={
          <Badge tone={score === SAMPLE_QUESTIONS.length ? "success" : "muted"}>
            {bi(`${score}/${SAMPLE_QUESTIONS.length}`, `${score}/${SAMPLE_QUESTIONS.length}`)}
          </Badge>
        }
      >
        <div className="space-y-5">
          {SAMPLE_QUESTIONS.map((item, qi) => {
            const chosen = answers[qi];
            return (
              <div key={qi}>
                <p className="text-sm font-bold text-foreground">
                  {qi + 1}. {bi(...item.q)}
                </p>
                <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                  {item.options.map((opt, oi) => {
                    const isChosen = chosen === oi;
                    const isCorrect = item.correct === oi;
                    const revealed = chosen !== undefined;
                    return (
                      <button
                        key={oi}
                        type="button"
                        disabled={revealed}
                        onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                        className={cn(
                          "flex items-center justify-between rounded-xl border px-4 py-2.5 text-start text-sm transition-colors",
                          !revealed && "border-border bg-card hover:border-primary/50",
                          revealed && isCorrect && "border-success bg-success/10 text-success",
                          revealed &&
                            isChosen &&
                            !isCorrect &&
                            "border-destructive bg-destructive/10 text-destructive",
                          revealed &&
                            !isChosen &&
                            !isCorrect &&
                            "border-border bg-card opacity-50",
                        )}
                      >
                        {bi(...opt)}
                        {revealed && isCorrect && <Check className="size-4" />}
                        {revealed && isChosen && !isCorrect && <X className="size-4" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <p className="text-xs text-muted-foreground">
            {bi(
              "هاي أسئلة مثال بتُجاب بالمتصفح بس، بدون حفظ — لتجربة شكل الإجابة الفورية الحقيقي.",
              "These are example questions answered locally in the browser only, not saved — to try the real instant-feedback experience.",
            )}
          </p>
        </div>
      </Panel>
    </AppPage>
  );
}
