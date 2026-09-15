import * as Sentry from "@sentry/tanstackstart-react";
//#region node_modules/.nitro/vite/services/ssr/assets/monitoring-CM_o1ZBz.js
/** يربط خطأ بمعلومات إضافية (زي المستخدم الحالي) عند توفرها — اختياري. */
function setMonitoringUser(user) {
	Sentry.setUser(user ? {
		id: user.id,
		email: user.email ?? void 0
	} : null);
}
//#endregion
export { setMonitoringUser as t };
