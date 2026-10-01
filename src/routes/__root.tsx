import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "@/components/ui/sonner";
import {
  PreferencesProvider,
  preferencesBootScript,
} from "@/components/providers/preferences-provider";

import appCss from "../styles.css?url";
import { AUTH_EVENT } from "@/integrations/backend/auth";
import { IdleLogoutWatcher } from "@/hooks/use-idle-logout";
import { CookieConsent } from "@/components/site/cookie-consent";
import { currentUserHome } from "@/lib/session-home";
import { SeoManager } from "@/components/app/seo-manager";
import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { initAnalytics } from "@/lib/analytics";

import { FileQuestion } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";

function NotFoundComponent() {
  const { t } = useTranslation();
  const [home, setHome] = useState("/");
  useEffect(() => {
    void currentUserHome().then((next) => setHome(next ?? "/"));
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md rounded-3xl border-2 border-[var(--border-strong)] bg-card p-8 text-center shadow-[var(--shadow-brutal)]">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full border-2 border-[var(--border-strong)] bg-primary/12 text-primary">
          <FileQuestion className="size-8" />
        </span>
        <h1 className="mt-4 font-display text-6xl font-extrabold text-foreground">404</h1>
        <h2 className="mt-3 text-xl font-extrabold text-foreground">{t("errors.notFoundTitle")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("errors.notFoundText")}</p>
        <div className="mt-7">
          <a
            href={home}
            className={buttonVariants({
              variant: "default",
              className: "h-auto px-6 py-3 text-sm",
            })}
          >
            {t("errors.backHome")}
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useTranslation();
  useEffect(() => {}, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md rounded-3xl border-2 border-[var(--border-strong)] bg-card p-8 text-center shadow-[var(--shadow-brutal)]">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full border-2 border-[var(--border-strong)] bg-destructive/12 text-destructive">
          <svg viewBox="0 0 24 24" fill="none" className="size-7" aria-hidden>
            <path
              d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h1 className="mt-4 text-xl font-extrabold text-foreground">{t("errors.crashTitle")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("errors.crashText")}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={buttonVariants({
              variant: "default",
              className: "h-auto px-6 py-3 text-sm",
            })}
          >
            {t("errors.retry")}
          </button>
          <a
            href="/"
            className={buttonVariants({
              variant: "outline",
              className: "h-auto px-6 py-3 text-sm",
            })}
          >
            {t("errors.backHome")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: (ctx) => {
    const seo = createSeoHead("/", localeFromSearch(ctx.match.search));
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        ...seo.meta,
      ],
      links: [
        ...seo.links,
        // القسم PWA — يربط بيانات التثبيت (الاسم/الأيقونات/الألوان) بالصفحة
        { rel: "manifest", href: "/manifest.json" },
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Baloo+Bhaijaan+2:wght@500;600;700;800&family=Poppins:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
        },

        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "apple-touch-icon", href: "/icons/icon-192.png" },
      ],
      scripts: seo.scripts,
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-theme="dark" className="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* القسم 06 — تطبيق الثيم/اللغة المحفوظين قبل الرسم لتفادي الوميض */}
        <script dangerouslySetInnerHTML={{ __html: preferencesBootScript }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AuthSync() {
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const onAuthChanged = () => {
      router.invalidate();
      queryClient.invalidateQueries();
    };
    window.addEventListener(AUTH_EVENT, onAuthChanged);
    return () => window.removeEventListener(AUTH_EVENT, onAuthChanged);
  }, [router, queryClient]);

  return null;
}

// القسم PWA — يسجّل الـService Worker على المتصفح فقط (لا يعمل شيء أثناء SSR)
// شرط أساسي حتى يعتبر Chrome/Android الموقع "قابل للتثبيت" كتطبيق PWA/TWA.
function ServiceWorkerRegistrar() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // فشل التسجيل لا يكسر الموقع — يبقى يعمل عاديًا كموقع ويب فقط
      });
    }
  }, []);

  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PreferencesProvider>
        <SeoManager />
        <MonitoringInit />
        <AuthSync />
        <ServiceWorkerRegistrar />
        <IdleLogoutWatcher />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <CookieConsent />
        <Toaster position="top-center" richColors />
      </PreferencesProvider>
    </QueryClientProvider>
  );
}

/** تهيئة تتبّع الاستخدام (PostHog) مرة وحدة عند إقلاع التطبيق — Sentry صار
 * يتهيأ تلقائيًا عبر src/instrument.client.ts (جهة العميل) وsrc/server.ts
 * (جهة السيرفر)، ما بحتاج تهيئة يدوية هون. */
function MonitoringInit() {
  useEffect(() => {
    initAnalytics();
  }, []);
  return null;
}
