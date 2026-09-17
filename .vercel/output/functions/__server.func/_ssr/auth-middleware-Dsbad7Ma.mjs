import { t as env } from "./ssr.mjs";
import { n as DEMO_USER_COOKIE } from "./rbac-static-data-DgiM51a_.mjs";
import { o as getCookie, s as createMiddleware } from "./server-tMaTfkv1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-middleware-Dsbad7Ma.js
var requireAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
	const demoUserId = getCookie(DEMO_USER_COOKIE);
	if (!env.ENABLE_DEMO_LOGIN || !demoUserId) throw new Response("Authenticated server functions are unavailable", {
		status: 401,
		headers: { "Content-Type": "text/plain; charset=utf-8" }
	});
	return next({ context: { userId: demoUserId } });
});
//#endregion
export { requireAuth as t };
