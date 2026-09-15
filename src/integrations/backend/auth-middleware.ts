// Temporary guard for server functions backed by static demo data.
// The browser cookie is intentionally not treated as a production identity:
// it is client-controlled and therefore cannot authorize access to real data.
// Replace this middleware with server-side ASP.NET Identity propagation when
// the frontend starts invoking these functions against authenticated backend data.

import { createMiddleware } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { DEMO_USER_COOKIE } from "./auth";

export const requireAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
  const demoUserId = getCookie(DEMO_USER_COOKIE);
  const demoAllowed = import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEMO_LOGIN === "true";

  // Static server functions are available only when demo mode is explicitly
  // enabled (local dev, or VITE_ENABLE_DEMO_LOGIN="true" on a preview
  // deployment). Never fall back to an admin identity and never use this
  // cookie as a production authorization boundary.
  if (!demoAllowed || !demoUserId) {
    throw new Response("Authenticated server functions are unavailable", {
      status: 401,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return next({ context: { userId: demoUserId } });
});
