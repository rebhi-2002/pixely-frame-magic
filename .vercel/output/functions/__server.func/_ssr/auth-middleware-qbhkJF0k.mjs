import { n as DEMO_USER_COOKIE } from "./rbac-static-data-6lJhuenE.mjs";
import { o as getCookie, s as createMiddleware } from "./server-CA7E05d5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-middleware-qbhkJF0k.js
var requireAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
	const demoUserId = getCookie(DEMO_USER_COOKIE);
	if (!demoUserId) throw new Response("Authenticated server functions are unavailable", {
		status: 401,
		headers: { "Content-Type": "text/plain; charset=utf-8" }
	});
	return next({ context: { userId: demoUserId } });
});
//#endregion
export { requireAuth as t };
