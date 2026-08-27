import { u as getCookie } from "./createServerFn-TbS7u0_2.mjs";
import { t as createMiddleware } from "./createMiddleware-B_4t7rW1.mjs";
import "./rbac-static-data-BkN8GGlQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-middleware-DYL_GR_y.js
var requireAuth = createMiddleware({ type: "function" }).server(async ({ next }) => next({ context: { userId: getCookie("academia_demo_user") || "u-admin" } }));
//#endregion
export { requireAuth as t };
