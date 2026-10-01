import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ApiError } from "@/integrations/backend/client";

export const getRouter = () => {
  
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // الافتراضي (3 محاولات) بيغرق الكونسول والشبكة لو endpoint عم يرجّع
          // خطأ ثابت (401/403/404/500 متكرر) — خصوصاً استعلامات لوحة الأدمن يلي
          // بتعمل نداءات صفحات متعددة (Course/GetAll وغيرها). 4xx (طلب غلط
          // أو صلاحية ناقصة) ما بينفع تكراره إطلاقاً؛ 5xx نجرّبه مرة وحدة إضافية
          // بس (ممكن يكون عطل عابر بالسيرفر)، مش 3 مرات.
          retry: (failureCount, error) => {
            if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
              return false;
            }
            return failureCount < 1;
          },
        },
      },
    });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  // import() ديناميكي (مش import ثابت أعلى الملف): router.tsx بيتحمّل بمسار الـSSR
  // كمان، وأي import ثابت لحزمة Sentry هون بيكسر كل صفحات الموقع (500) لو الحزمة
  // غابت عن دالة السيرفرلس — راجع src/lib/server-sentry.ts. هالتكامل للمتصفح بس.
  if (!router.isServer) {
    void import("@sentry/tanstackstart-react")
      .then((Sentry) =>
        Sentry.addIntegration(Sentry.tanstackRouterBrowserTracingIntegration(router)),
      )
      .catch(() => undefined);
  }

  return router;
};
