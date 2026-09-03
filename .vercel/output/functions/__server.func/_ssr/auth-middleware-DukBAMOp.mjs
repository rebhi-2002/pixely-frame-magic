import { n as DEMO_USER_COOKIE } from "./rbac-static-data-C-KJ3jWh.mjs";
import { u as getCookie } from "./createServerFn-TbS7u0_2.mjs";
import { t as createMiddleware } from "./createMiddleware-B_4t7rW1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-middleware-DukBAMOp.js
var requireAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
	getCookie(DEMO_USER_COOKIE);
	throw new Response("Authenticated server functions are unavailable", {
		status: 401,
		headers: { "Content-Type": "text/plain; charset=utf-8" }
	});
});
//#endregion
export { requireAuth as t };
