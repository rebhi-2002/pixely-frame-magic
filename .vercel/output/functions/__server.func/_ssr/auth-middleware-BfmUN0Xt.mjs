import { t as env } from "./env-FodiAD7N.mjs";
import { o as getCookie, s as createMiddleware } from "./server-CAmRZeTC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-middleware-BfmUN0Xt.js
var DEMO_USER_COOKIE = "academia_demo_user";
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
