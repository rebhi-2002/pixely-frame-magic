//#region node_modules/.nitro/vite/services/ssr/assets/public-catalog-data-BAVu8ehh.js
/** مسار صورة المعلم — حسب teacherId، ثابت الاسم عشان تحط الصورة الحقيقية
*  لاحقاً بنفس الاسم بدون أي تعديل كود (نفس مبدأ صور الفريق). */
function teacherPhotoPath(teacherId) {
	return `/team/teachers/${teacherId}.jpg`;
}
/** مسار غلاف الكورس — حسب id الكورس، بنفس مبدأ صورة المعلم (fallback تلقائي
*  لتدرّج لوني + أيقونة المادة لو الملف غير موجود بعد). */
function courseCoverPath(courseId) {
	return `/courses/covers/${courseId}.jpg`;
}
var PUBLIC_COURSES = [
	{
		id: "math-tawjihi",
		title: ["الرياضيات — تفاضل وتكامل", "Mathematics — Calculus"],
		description: ["شرح تفصيلي لوحدتي التفاضل والتكامل بأسلوب مبسّط مع حل أسئلة وزارية سابقة.", "Detailed coverage of differentiation and integration with past exam questions."],
		teacher: ["أ. سامي خليل", "Sami Khalil"],
		teacherId: "sami-khalil",
		subject: ["رياضيات", "Math"],
		level: ["توجيهي علمي", "Science track"],
		lessons: 42,
		price: 35
	},
	{
		id: "physics-mechanics",
		title: ["الفيزياء — الميكانيكا الكاملة", "Physics — Full mechanics"],
		description: ["الحركة والقوى والطاقة خطوة بخطوة، مع أمثلة محلولة على كل قانون.", "Motion, forces and energy step by step, with worked examples for every law."],
		teacher: ["أ. رنا حدّاد", "Rana Haddad"],
		teacherId: "rana-haddad",
		subject: ["فيزياء", "Physics"],
		level: ["توجيهي علمي", "Science track"],
		lessons: 36,
		price: 30
	},
	{
		id: "arabic-grammar",
		title: ["اللغة العربية — النحو والبلاغة", "Arabic — Grammar & rhetoric"],
		description: ["قواعد النحو الأساسية وفنون البلاغة بأمثلة من نصوص المنهج مباشرة.", "Core grammar rules and rhetoric with examples straight from the curriculum."],
		teacher: ["أ. مها زيدان", "Maha Zeidan"],
		teacherId: "maha-zeidan",
		subject: ["عربي", "Arabic"],
		level: ["توجيهي عام", "General track"],
		lessons: 28,
		price: 0
	},
	{
		id: "english-exam",
		title: ["الإنجليزية — تحضير الامتحان", "English — Exam preparation"],
		description: ["مراجعة شاملة للقواعد والقراءة والكتابة بصيغة امتحان التوجيهي بالضبط.", "Full grammar, reading and writing review in the exact Tawjihi exam format."],
		teacher: ["أ. لؤي درويش", "Luay Darwish"],
		teacherId: "luay-darwish",
		subject: ["إنجليزي", "English"],
		level: ["توجيهي عام", "General track"],
		lessons: 24,
		price: 25
	},
	{
		id: "chem-organic",
		title: ["الكيمياء العضوية من الصفر", "Organic chemistry from zero"],
		description: ["بناء المفاهيم من الصفر: التركيب، التفاعلات، وتسمية المركبات العضوية.", "Concepts built from zero: structure, reactions, and naming organic compounds."],
		teacher: ["أ. نور عابد", "Noor Abed"],
		teacherId: "noor-abed",
		subject: ["كيمياء", "Chemistry"],
		level: ["توجيهي علمي", "Science track"],
		lessons: 31,
		price: 28
	},
	{
		id: "islamic-studies",
		title: ["التربية الإسلامية — مراجعة شاملة", "Islamic studies — Full review"],
		description: ["مراجعة مكثّفة لكل وحدات المنهج مع بنك أسئلة على كل درس.", "An intensive review of every curriculum unit with a question bank per lesson."],
		teacher: ["أ. عمر الشريف", "Omar Sharif"],
		teacherId: "omar-sharif",
		subject: ["إسلامية", "Islamic"],
		level: ["توجيهي عام", "General track"],
		lessons: 18,
		price: 0
	}
];
function nextCatalogId(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
//#endregion
export { teacherPhotoPath as i, courseCoverPath as n, nextCatalogId as r, PUBLIC_COURSES as t };
