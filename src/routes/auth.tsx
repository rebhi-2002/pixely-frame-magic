import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول | لوحة التحكم" },
      { name: "description", content: "تسجيل الدخول أو إنشاء حساب للوصول إلى لوحة التحكم الإدارية." },
      { property: "og:title", content: "تسجيل الدخول | لوحة التحكم" },
      { property: "og:description", content: "الوصول إلى لوحة التحكم الإدارية بصلاحيات ديناميكية." },
    ],
  }),
  component: AuthPage,
});

const schema = z.object({
  email: z.string().trim().email("بريد إلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور 6 أحرف على الأقل"),
});

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  async function handleSubmit(mode: "signin" | "signup") {
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword(parsed.data);
        if (error) throw error;
        toast.success("تم تسجيل الدخول");
      } else {
        const { error } = await supabase.auth.signUp({
          ...parsed.data,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName || undefined },
          },
        });
        if (error) throw error;
        toast.success("تم إنشاء الحساب");
      }
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر إتمام العملية");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setLoading(false);
      toast.error("تعذّر تسجيل الدخول عبر Google");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-7 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="size-5" />
          </span>
          <div>
            <h1 className="text-lg font-bold text-foreground">لوحة التحكم الإدارية</h1>
            <p className="text-xs text-muted-foreground">سجّل الدخول للمتابعة</p>
          </div>
        </div>

        <Tabs defaultValue="signin">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">تسجيل الدخول</TabsTrigger>
            <TabsTrigger value="signup">حساب جديد</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="mt-5 space-y-4">
            <Field id="email" label="البريد الإلكتروني" value={email} onChange={setEmail} type="email" />
            <Field
              id="password"
              label="كلمة المرور"
              value={password}
              onChange={setPassword}
              type="password"
            />
            <Button className="w-full" disabled={loading} onClick={() => handleSubmit("signin")}>
              {loading ? "جارٍ..." : "دخول"}
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="mt-5 space-y-4">
            <Field id="name" label="الاسم الكامل" value={fullName} onChange={setFullName} />
            <Field
              id="email2"
              label="البريد الإلكتروني"
              value={email}
              onChange={setEmail}
              type="email"
            />
            <Field
              id="password2"
              label="كلمة المرور"
              value={password}
              onChange={setPassword}
              type="password"
            />
            <Button className="w-full" disabled={loading} onClick={() => handleSubmit("signup")}>
              {loading ? "جارٍ..." : "إنشاء الحساب"}
            </Button>
            <p className="text-xs text-muted-foreground">
              أول حساب يتم إنشاؤه يحصل على صلاحيات مدير النظام.
            </p>
          </TabsContent>
        </Tabs>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">أو</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <Button variant="outline" className="w-full" disabled={loading} onClick={handleGoogle}>
          المتابعة باستخدام Google
        </Button>

        <Link to="/" className="mt-5 block text-center text-xs text-muted-foreground hover:text-foreground">
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
