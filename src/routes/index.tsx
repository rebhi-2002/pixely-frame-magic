import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, ToggleRight, Users2, LayoutList } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "نظام لوحة التحكم بالصلاحيات | RBAC" },
      {
        name: "description",
        content:
          "لوحة تحكم إدارية عربية بصلاحيات ديناميكية: وحدات نظام، شجرة صلاحيات، أنواع مستخدمين وإدارة مستخدمين.",
      },
      { property: "og:title", content: "نظام لوحة التحكم بالصلاحيات | RBAC" },
      {
        property: "og:description",
        content: "لوحة تحكم إدارية عربية بصلاحيات ديناميكية: وحدات نظام، شجرة صلاحيات، أنواع مستخدمين وإدارة مستخدمين.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: ToggleRight,
    title: "وحدات النظام",
    text: "تفعيل أو تعطيل أي وحدة على مستوى النظام بالكامل بضغطة واحدة.",
  },
  {
    icon: ShieldCheck,
    title: "شجرة الصلاحيات",
    text: "صلاحيات دقيقة لكل صفحة: عرض، إضافة، تعديل، حذف — كل واحدة مستقلة.",
  },
  {
    icon: Users2,
    title: "أنواع المستخدمين",
    text: "لكل نوع مستخدم شجرة صلاحيات مستقلة تُحدّد ما يراه وما ينفّذه.",
  },
  {
    icon: LayoutList,
    title: "قائمة ديناميكية",
    text: "القائمة الجانبية تُبنى من صلاحيات المستخدم — غير المصرّح به لا يُبنى أصلاً.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          <ShieldCheck className="size-4" />
          RBAC — نظام صلاحيات ديناميكي
        </span>
        <h1 className="mt-6 text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
          لوحة تحكم إدارية بصلاحيات، عربية بالكامل
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          طبقتا تحكم متداخلتان: تفعيل الوحدة على مستوى النظام، وصلاحيات نوع المستخدم. العنصر لا يظهر
          إلا لو الطبقتان «نعم» بنفس الوقت — والتحقق يتم على السيرفر أيضاً.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/auth"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            الدخول إلى اللوحة
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-accent"
          >
            لوحة المعلومات
          </Link>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="size-5" />
              </span>
              <h2 className="mt-4 text-base font-bold text-foreground">{f.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
