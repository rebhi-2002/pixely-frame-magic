import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

const navItems = [
  { to: "/", label: "الرئيسية" },
  { to: "/how-it-works", label: "كيف تعمل" },
  { to: "/pricing", label: "الأسعار" },
  { to: "/for-teachers", label: "للمعلمين" },
] as const;

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <GraduationCap className="size-5" />
      </span>
      <span className="font-display text-xl font-bold text-foreground">أكاديميا</span>
    </Link>
  );
}

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <BrandMark />
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-foreground" }}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/auth"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              دخول
            </Link>
            <Link
              to="/auth"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              ابدأ مجاناً
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <BrandMark />
            <p className="text-sm text-muted-foreground">
              منصة عربية تساعد طلاب الثانوية ينظّموا موادهم، يتابعوا إنجازهم، ويجهّزوا للامتحان
              الوزاري بثقة.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div className="space-y-2">
              <p className="font-bold text-foreground">المنصة</p>
              {navItems.slice(1).map((i) => (
                <Link
                  key={i.to}
                  to={i.to}
                  className="block text-muted-foreground transition-colors hover:text-foreground"
                >
                  {i.label}
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <p className="font-bold text-foreground">قانوني</p>
              <Link
                to="/privacy"
                className="block text-muted-foreground transition-colors hover:text-foreground"
              >
                سياسة الخصوصية
              </Link>
              <Link
                to="/terms"
                className="block text-muted-foreground transition-colors hover:text-foreground"
              >
                شروط الاستخدام
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} أكاديميا — جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  );
}
