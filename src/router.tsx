import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

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
