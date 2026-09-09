import { n as DEMO_USER_COOKIE } from "./rbac-static-data-JRz-nJtL.mjs";
import { o as getCookie, s as createMiddleware } from "./server-W5G339kS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-middleware-DGfc1vT7.js
var requireAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
	getCookie(DEMO_USER_COOKIE);
	throw new Response("Authenticated server functions are unavailable", {
		status: 401,
		headers: { "Content-Type": "text/plain; charset=utf-8" }
	});
});
//#endregion
export { requireAuth as t };
