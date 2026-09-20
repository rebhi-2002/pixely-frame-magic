//#region node_modules/.nitro/vite/services/ssr/assets/student-evaluation-data-CRUqfFWZ.js
var MOCK_EXAMS = [
	{
		id: "mex-1",
		title: "رياضيات — نموذج وزاري كامل",
		questionsCount: 40,
		minutesLimit: 60
	},
	{
		id: "mex-2",
		title: "فيزياء — الوحدات 1-3",
		questionsCount: 25,
		minutesLimit: 35
	},
	{
		id: "mex-3",
		title: "كيمياء — امتحان سريع",
		questionsCount: 10,
		minutesLimit: 12
	}
];
/** فاضية عمداً — راجع الملاحظة أعلى الملف. تُملأ فعليًا لما يبدأ طلاب
*  حقيقيون يحلّوا امتحانات فعلاً (عبر saveExamAttempt بـ
*  student-evaluation.functions.ts)، مش بصفوف بذرة. */
var EXAM_ATTEMPTS = [];
/** فاضية عمداً — راجع الملاحظة أعلى الملف. */
var MISTAKES = [];
/** فاضية عمداً — راجع الملاحظة أعلى الملف. لسا مافي آلية حقيقية "تمنح"
*  الشارة تلقائيًا (لا يوجد Achievements/Badges endpoint بالباك اند بعد،
*  راجع docs/api/frontend-integration-status.md)، فأي شارة "مفتوحة" حاليًا
*  بتنضاف يدويًا (صفحة /achievements، خلف صلاحية student_achievements) —
*  قرار مين بالضبط يقدر يمنحها (أدمن/معلم فقط، مش الطالب لنفسه) قرار
*  منتج منفصل لسا ما اتحسم، راجعه قبل ما تفتح الصلاحية لأي دور. */
var BADGES = [];
/** فاضية عمداً — نفس ملاحظة BADGES فوق بالضبط، وأهم: صفحة /certificate
*  العامة بتتحقق من صحة رقم الشهادة اعتمادًا على وجوده بهاي القائمة —
*  فأي صف هون بصير "شهادة صالحة" فعليًا بصفحة التحقق العامة. لا تضف صف
*  هون إلا لشهادة صدرت فعلاً. */
var CERTIFICATES = [];
function nextEvalId(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
//#endregion
export { MOCK_EXAMS as a, MISTAKES as i, CERTIFICATES as n, nextEvalId as o, EXAM_ATTEMPTS as r, BADGES as t };
