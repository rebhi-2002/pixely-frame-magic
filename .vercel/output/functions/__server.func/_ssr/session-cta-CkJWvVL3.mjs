import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { t as useSession } from "./use-session-B52gGt5m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/session-cta-CkJWvVL3.js
var import_jsx_runtime = require_jsx_runtime();
/**
* زر دعوة لإجراء يتبدّل حسب حالة الجلسة:
* زائر → التسجيل/الدخول، مسجّل دخول → مساحته حسب الدور.
*/
function SessionCta({ to, label, className, search, signedInLabel }) {
	const { t } = useTranslation();
	const { session, isSignedIn } = useSession();
	if (isSignedIn && session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: session.home,
		className,
		children: signedInLabel ?? t("common.goToDashboard", { defaultValue: t("common.dashboard") })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		search,
		className,
		children: label
	});
}
//#endregion
export { SessionCta as t };
