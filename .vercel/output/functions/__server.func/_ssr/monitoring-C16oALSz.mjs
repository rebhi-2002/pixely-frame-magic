import { a as setUser } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/monitoring-C16oALSz.js
/** يربط خطأ بمعلومات إضافية (زي المستخدم الحالي) عند توفرها — اختياري. */
function setMonitoringUser(user) {
	setUser(user ? {
		id: user.id,
		email: user.email ?? void 0
	} : null);
}
//#endregion
export { setMonitoringUser as t };
