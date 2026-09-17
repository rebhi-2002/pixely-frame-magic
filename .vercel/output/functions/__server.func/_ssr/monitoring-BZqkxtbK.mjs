import { r as index_server_exports } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/monitoring-BZqkxtbK.js
/** يربط خطأ بمعلومات إضافية (زي المستخدم الحالي) عند توفرها — اختياري. */
function setMonitoringUser(user) {
	index_server_exports.setUser(user ? {
		id: user.id,
		email: user.email ?? void 0
	} : null);
}
//#endregion
export { setMonitoringUser as t };
