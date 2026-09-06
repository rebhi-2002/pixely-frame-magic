import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { _ as createFileRoute, b as useNavigate, d as useLocation, f as useRouterState, g as lazyRouteComponent, h as Outlet, l as Scripts, m as createRouter, u as HeadContent, v as createRootRouteWithContext, x as useRouter, y as Link, z as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as usePreferences, E as roleHome, S as logout, T as preferencesBootScript, _ as isAuthenticated, g as i18n_default, h as getStoredUserId, j as verifyServerSession, l as USERS, m as getStoredProfile, o as PreferencesProvider, s as ROLES, t as AUTH_EVENT, v as isDemoSession } from "./rbac-static-data-Bv6QEjHq.mjs";
import { i as useQueryClient, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { nt as Cookie } from "../_libs/lucide-react.mjs";
import { c as __exportAll } from "./server-EBKWEHZn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-posts-CGNfBsVT.js
/**
* مقالات المدونة — محتوى أصلي كتبته أكاديميا لطلاب الثانوية العامة.
* لا يعتمد على مكتبة Markdown؛ كل مقال مصفوفة "بلوكات" مطبوعة عبر BlogRenderer.
*/
var blogPosts = [
	{
		slug: "جدول-مذاكرة-يضبط-فعلاً",
		title: "جدول المذاكرة يلي بيضبط، مش يلي بيبين حلو على الورقة",
		titleEn: "A study schedule that actually holds, not one that looks good on paper",
		excerpt: "أغلب جداول المذاكرة بتنكسر باليوم التالت. المشكلة مو فيك، المشكلة إنك بتبني الجدول على الوقت المتوفر مش على طاقتك الفعلية. هيك تبني جدول تلتزم فيه.",
		excerptEn: "Most study schedules break on day three. The problem isn't you — you built the plan around available hours instead of your real energy. Here's how to build one you'll stick to.",
		category: "تنظيم الوقت",
		categoryEn: "Time management",
		readMinutes: 6,
		publishedAt: "2026-06-02",
		body: [
			{
				type: "p",
				text: "كل سنة، تقريباً كل طالب بيقعد قبل الامتحانات بأسبوعين ويرسم جدول مذاكرة مثالي: من 8 الصبح لـ8 المسا، كل مادة ساعتين، واستراحة ربع ساعة بينهم. وبعد يومين أو تلاتة، الجدول هذا بيصير ورقة منسية بالدرج. مش لأنك كسول، ولا لأنك ما عندك إرادة. المشكلة إنك بنيت الجدول على افتراض غلط: إنك آلة بتشتغل بنفس الكفاءة من الصبح للمسا."
			},
			{
				type: "p",
				text: "الحقيقة إنه تركيزك مو ثابت طول اليوم. فيه ساعات إنت فيها في قمة صفاءك الذهني، وفيه ساعات تانية بتحس فيها إنك عم تقرأ نفس السطر عشر مرات بدون ما يدخل شي. أول خطوة صح مش إنك تحط جدول، أول خطوة إنك تراقب حالك أسبوع كامل بدون أي التزام — بس لاحظ: إيمتى بتحس إنك صاحي وقادر تركز؟ إيمتى بتحس إنك تعبان حتى لو نمت منيح؟"
			},
			{
				type: "h2",
				text: "قاعدة الساعتين الأول"
			},
			{
				type: "p",
				text: "أول ساعتين من جلسة المذاكرة عندك — أي جلسة، مش بس الصبح — هي أعلى ساعتين إنتاجية. فيهم بتقدر تفهم مفهوم جديد صعب، تحل مسائل معقدة، أو تراجع مادة بتحتاج تركيز عالي زي الفيزياء أو الكيمياء. بعد الساعتين هدول، مستوى التركيز بينزل تدريجياً. فبدل ما تحط أصعب مادة آخر اليوم لما تكون خلصان طاقة، اقلبها: ابدأ بالمادة يلي بتخوّفك أكتر شي."
			},
			{
				type: "p",
				text: "هيك كمان بتتخلص من أكبر عبء نفسي بأول الجلسة، وباقي اليوم بيصير أخف لأنك خلّصت يلي كان قاعد يوجعك راسك من الصبح."
			},
			{
				type: "h2",
				text: "بلوكات مش ساعات"
			},
			{
				type: "p",
				text: "بدل ما تقول \"من 4 لـ6 كيمياء\"، فكر بـ\"بلوكات\": بلوك = 50 دقيقة مذاكرة + 10 دقايق استراحة فعلية (قوم، تمشى، اشرب مي — مش تفتح الموبايل، لأنه هذا مش استراحة، هذا بداية تشتت تاني ساعة). أربع بلوكات باليوم يعني ساعتين و40 دقيقة مذاكرة فعلية مركّزة، وهاد أكتر بكتير من ست ساعات \"مذاكرة\" نصها سرحان."
			},
			{
				type: "list",
				items: [
					"حدد عدد البلوكات الواقعي يلي تقدر تلتزم فيه يومياً — 3 إلى 5 كافية جداً",
					"خصص أول بلوك دايماً للمادة الأصعب أو يلي مأجلها",
					"بعد كل بلوكين، خذ استراحة أطول (20-30 دقيقة) مش بس 10",
					"سجّل بآخر اليوم: كم بلوك خلصت فعلياً؟ هذا الرقم الصادق، مو الجدول"
				]
			},
			{
				type: "h2",
				text: "اليوم يلي بينكسر فيه الجدول — وهذا طبيعي"
			},
			{
				type: "p",
				text: "رح يجي يوم ما بتقدر تكمل الخطة. صرت متأخر، أو صار عندك شي عائلي، أو بكل بساطة تعبان. هون أكبر غلطة بيقع فيها الطلاب: يحسّوا إنه \"خربت الخطة\" فيبطلوا يتابعوها بالكامل. الجدول الصح مش يلي ما بينكسر، هو يلي فيه مساحة لليوم يلي بينكسر. خصص يوم بالأسبوع — الجمعة مثلاً — كـ\"يوم احتياطي\" مالوش مادة محددة، بس لتعويض أي بلوك فاتك."
			},
			{
				type: "quote",
				text: "الجدول أداة تساعدك تلتزم، مش عقد لازم تنفذه حرفياً. لما تحس إنه صار عبء بدل ما يكون مساعد، هذا مؤشر إنك لازم تبسّطه أكتر، مش إنك فاشل."
			}
		]
	},
	{
		slug: "الاستدعاء-النشط-وليش-القراءة-مش-كافية",
		title: "ليش تعيد قراءة الدرس مرتين ما بيثبته، والاستدعاء النشط بيثبته",
		titleEn: "Why rereading a lesson twice doesn't stick, but active recall does",
		excerpt: "بتحس إنك فاهم وقت بتقرأ، وبتنسى وقت الامتحان؟ هاي أشهر خدعة بيلعبها دماغك عليك. في طريقة أثبتت علمياً إنها أقوى بكتير — وهي أبسط مما تتخيل.",
		excerptEn: "Rereading feels productive and teaches you almost nothing. Active recall feels hard and is what actually moves knowledge into long-term memory.",
		category: "أساليب المذاكرة",
		categoryEn: "Study methods",
		readMinutes: 7,
		publishedAt: "2026-06-18",
		body: [
			{
				type: "p",
				text: "جرّب هالتجربة البسيطة: اقرأ فقرة من كتاب الأحياء مرتين متتاليتين، بتركيز كامل. أكيد رح تحس بعدها إنك \"فاهم\" الموضوع منيح. بس سكّر الكتاب هلق وحاول تكتب يلي فهمته من ذاكرتك بس، بدون ما تشوف الصفحة. غالباً رح تلاحظ إنه يلي قدرت تسترجعه أقل بكتير من الإحساس اللي كان عندك وإنت عم تقرا."
			},
			{
				type: "p",
				text: "هاد اسمه \"وهم الطلاقة\" (Fluency Illusion). لما بتعيد قراءة نفس النص، دماغك بيتعرف على الكلمات بسرعة أكبر في كل مرة، وهاي السرعة بتحسها كـ\"فهم\". بس التعرّف على المعلومة (recognition) شي، واسترجاعها من غير مساعدة (recall) شي تاني تماماً. والامتحان بيطلب منك recall، مش recognition."
			},
			{
				type: "h2",
				text: "الاستدعاء النشط: تخلي دماغك يشتغل، مش يقرأ بس"
			},
			{
				type: "p",
				text: "الاستدعاء النشط (Active Recall) معناه إنك تجبر نفسك تطلع المعلومة من ذاكرتك بنفسك، بدل ما تعيد قراءتها. بدل ما تقرا تعريف \"التنفس الخلوي\" عشر مرات، اقرأه مرة وحدة منيح، بعدين سكّر الكتاب واسأل حالك: \"شو هو التنفس الخلوي؟ وين بصير؟ شو بينتج؟\" وحاول تجاوب بصوت عالي أو مكتوب. لو ما قدرت تجاوب كامل، رجّع افتح الكتاب — بس بعد ما جرّبت، مش قبل."
			},
			{
				type: "p",
				text: "هاي الطريقة بتحس فيها إنها أصعب من القراءة، وفعلاً هي أصعب — لأنها بتشغّل دماغك فعلياً بدل ما تخليه يمر بشكل سلبي فوق الكلمات. وبالضبط هاد الصعوبة هي يلي بتخلي المعلومة تثبت. كل مرة بتحاول تسترجع معلومة وتنجح (أو حتى تحاول وتفشل بس بعدين تشوف الجواب)، بتقوّي الرابط العصبي المسؤول عنها."
			},
			{
				type: "h2",
				text: "كيف تطبقها من غير أدوات معقدة"
			},
			{
				type: "list",
				items: [
					"بعد كل درس، اقفل الكتاب واكتب من ذاكرتك أهم 5 نقاط فيه — بدون ما تشوف",
					"حوّل كل عنوان فرعي بالدرس لسؤال، وجاوب عليه بدون رجوع للنص",
					"اشرح الدرس لشخص تاني (أو حتى لنفسك بصوت عالي) وكأنك بتعلّمه لأول مرة",
					"بعد يوم أو يومين، ارجع اسأل نفس الأسئلة من غير ما تراجع الدرس قبلها"
				]
			},
			{
				type: "h2",
				text: "ليش بنك الأخطاء بالذات أداة قوية هون"
			},
			{
				type: "p",
				text: "كل مرة بتحاول تسترجع معلومة وتغلط فيها، هاي مش فشل — هاي بالضبط اللحظة يلي فيها دماغك بيتعلم أكتر شي. المشكلة إنه أغلب الطلاب بمجرد ما يغلطوا بسؤال، بيشوفوا الجواب الصح وبيكملوا، بدون ما يسجّلوا وين غلطوا وليش. بعد أسبوعين، بيرجعوا يغلطوا بنفس النقطة بالضبط. لو كنت تسجّل كل غلطة بمكان واحد وترجعلها بعد يومين تلاتة، رح تلاحظ إنه أغلب أخطائك متكررة حول نفس 3 أو 4 مفاهيم — وهذول بالضبط يلي لازم تركّز فيهم آخر أسبوعين قبل الامتحان."
			},
			{
				type: "quote",
				text: "الشعور بالصعوبة وإنت عم تحاول تتذكر مش علامة إنك ضعيف بالمادة. هو علامة إنك عم تذاكر صح."
			}
		]
	},
	{
		slug: "مادة-بتكرهها-كيف-تتحملها-لنهاية-السنة",
		title: "مادة بتكرهها بس لازم تذاكرها؟ هيك تتحمّلها لنهاية السنة",
		titleEn: "A subject you hate but still have to study? Here's how to survive it",
		excerpt: "كل طالب عنده مادة بتحس تجاهها بحائط. مش لازم تحبها عشان تنجح فيها، بس لازم تغيّر طريقة تعاملك معها. هاي خطوات عملية جربها طلاب كتير قبلك.",
		excerptEn: "You don't need to love the subject. You need a system that gets you through it without wrecking the rest of your schedule.",
		category: "الجانب النفسي",
		categoryEn: "Mindset",
		readMinutes: 5,
		publishedAt: "2026-07-05",
		body: [
			{
				type: "p",
				text: "فيه مادة — عند كل طالب تقريباً — بمجرد ما يفتح كتابها بحس بثقل بصدره. عندك أنت هاي المادة أكيد، وممكن تكون الفيزياء، أو النحو، أو الكيمياء العضوية. المشكلة إنه هاي المادة غالباً بتتأجل يوم ورا يوم، لحد ما تصير أكبر من حجمها الحقيقي، وبتصير مصدر توتر دائم حتى وإنت مش قاعد تذاكرها."
			},
			{
				type: "h2",
				text: "الخبر الجيد: ما لازم تحبها"
			},
			{
				type: "p",
				text: "في نصيحة شائعة بتقول \"لازم تحب المادة عشان تنجح فيها\"، وهاي نصيحة مو دقيقة. في ناس نجحوا وتفوقوا بمواد ما حبوها أبداً، لأنهم غيّروا علاقتهم فيها من \"عاطفة\" لـ\"مهمة\". إنت مش لازم تحب النحو، بس تقدر تتعامل معه كنظام قواعد له منطق، وتحل فيه متل ما بتحل لغز — بدون ما تحمّله مشاعر سلبية زايدة."
			},
			{
				type: "h2",
				text: "قسّمها لأصغر ما يمكن"
			},
			{
				type: "p",
				text: "أكبر سبب لتأجيل المادة يلي بتكرهها إنك بتفكر فيها كـ\"كتلة واحدة كبيرة\": \"لازم أذاكر كيمياء\" — وهاي جملة مرعبة ومبهمة بنفس الوقت، فدماغك بيهرب منها. بدلها بمهمة صغيرة محددة جداً: \"هلق رح أفهم بس معادلة الاتزان الكيميائي، مش أكتر\". لما تكون المهمة صغيرة وواضحة، مقاومة البدء بتنخفض كتير."
			},
			{
				type: "h2",
				text: "غيّر البيئة والوقت"
			},
			{
				type: "p",
				text: "لو دايماً بتأجل نفس المادة لآخر الجلسة (أو آخر اليوم)، جرّب تقلب الترتيب لأسبوع كامل: خلّيها أول شي بتذاكره وإنت طاقتك بأعلاها، مو آخر شي وإنت خلصان. كمان جرّب تغيّر مكان مذاكرتها بالذات — لو دايماً بتذاكرها بغرفتك وبتحس بضيق، جرب تاخدها عالمطبخ أو مكان تاني بالبيت. الدماغ بيربط أحياناً مكان معين بشعور سلبي متراكم."
			},
			{
				type: "h2",
				text: "كافئ نفسك — بس بشكل ذكي"
			},
			{
				type: "p",
				text: "مش لازم تكون مكافأة كبيرة. بعد ما تخلص بلوك مذاكرة كامل بالمادة يلي بتكرهها، اسمح لحالك بـ15 دقيقة الشي يلي بتحبه فعلاً — مو الموبايل بشكل عام (لأنه هذا بيصير مصدر تشتت لباقي اليوم)، بس شي محدد ومريح: أغنية، مقطع فيديو قصير، أو حتى قهوة برة الغرفة."
			},
			{
				type: "list",
				items: [
					"حدد مهمة صغيرة جداً بدل \"أذاكر المادة كلها\"",
					"غيّر ترتيب المادة بجدولك — حطها أول شي مش آخر شي",
					"جرب مكان مذاكرة مختلف لهاي المادة بالذات",
					"كافئ نفسك مباشرة بعد كل بلوك، مش بعد \"ما أخلص كل المنهاج\""
				]
			},
			{
				type: "quote",
				text: "ما حدا رح يقولك \"شكراً إنك حبيت المادة\" بيوم النتيجة. بس رح تشكر نفسك إنك ما هربت منها."
			}
		]
	},
	{
		slug: "بنك-الأخطاء-أذكى-أداة-ما-بتستخدمها",
		title: "بنك الأخطاء: أذكى أداة مذاكرة موجودة، وأغلب الطلاب ما بيستخدموها",
		titleEn: "The mistake bank: the smartest study tool out there, and most students skip it",
		excerpt: "مو كل المراجعة نفس القيمة. مراجعة عامة بتاخد وقت وبترجع فايدة قليلة، بينما ورقة صغيرة فيها أخطاءك الفعلية بتوفرلك أسابيع من التخبيط. هيك تبنيها من الصفر.",
		excerptEn: "Every wrong answer is a precise map of what you don't know yet. Logging mistakes turns them into your highest-return revision list.",
		category: "أساليب المذاكرة",
		categoryEn: "Study methods",
		readMinutes: 6,
		publishedAt: "2026-07-22",
		body: [
			{
				type: "p",
				text: "لما تحل نموذج امتحان وتغلط بسؤال، شو بتعمل عادة؟ أغلب الطلاب بيشوفوا الجواب الصح، يقولوا \"آه صح، فاهم\"، ويكملوا للسؤال يلي بعده. وبعد أسبوعين، بيجوا يحلوا نموذج تاني، وبيغلطوا بنفس النقطة بالضبط — أحياناً حتى بنفس السؤال تقريباً. المشكلة مش إنهم ما فهموا، المشكلة إنه ما في نظام يذكّرهم بيلي غلطوا فيه قبل ما ينسوه."
			},
			{
				type: "h2",
				text: "ليش المراجعة العامة مش كافية"
			},
			{
				type: "p",
				text: "لما تراجع كل المنهاج من الأول للآخر قبل الامتحان، إنت بتضيّع وقت متساوي على أشياء بتتقنها أصلاً وأشياء بتضعف فيها فعلاً. لو عندك 10 دروس وإنت متقن 7 منهم وضعيف بـ3، مراجعة عامة بتديك نفس الوقت للـ10 كلهم. بنك الأخطاء بيقلب المعادلة: بيوريك بالضبط وين نقاط ضعفك الحقيقية، فتقدر تركّز 80% من وقتك على الـ20% يلي فعلاً بيسبّبولك مشاكل."
			},
			{
				type: "h2",
				text: "كيف تبنيه — حتى بدون أي أداة إلكترونية"
			},
			{
				type: "p",
				text: "خصص دفتر صغير أو حتى ملف بسيط. كل مرة بتغلط بسؤال — بواجب، نموذج امتحان، أو حتى أثناء المذاكرة — سجّل ثلاث معلومات بس: السؤال (أو ملخص عنه)، ليش غلطت بالضبط (نسيت القانون؟ فهمت السؤال غلط؟ غلطة حسابية؟)، والجواب الصح مع تفسير قصير."
			},
			{
				type: "p",
				text: "الجزء الأهم هو خانة \"ليش غلطت\" — لأنها بتوريك نمط. لو لاحظت إنه أغلب أخطائك بمادة معينة سببها \"فهمت السؤال غلط\" مش \"ما بعرف المعلومة\"، فهذا معناه إنك محتاج تتمرن على قراءة الأسئلة أكتر من ما تحتاج تراجع المحتوى. هاي معلومة ما رح توصلها من مراجعة عادية."
			},
			{
				type: "h2",
				text: "متى ترجع لبنك الأخطاء"
			},
			{
				type: "list",
				items: [
					"بعد 3 أيام من أول ما سجّلت الغلطة — راجعها وشوف إذا لسا بتغلط فيها",
					"أسبوع قبل الامتحان — هذا وقتك الذهبي، راجع بنك الأخطاء كامل مرتين",
					"بليلة الامتحان — بدل ما تفتح الكتاب كامل، افتح بس بنك أخطائك"
				]
			},
			{
				type: "p",
				text: "أسبوع قبل الامتحان، بدل ما تحاول \"تراجع كل شي\" وتوتر حالك، افتح بنك الأخطاء وشوف: شو الأنماط يلي تكررت؟ رح تلاحظ إنه غالباً كل أخطائك دايرة حول 4 أو 5 مفاهيم بس، مش المنهاج كله. هاي الـ4 أو 5 مفاهيم هم بالضبط شو لازم يكون آخر تركيز عندك."
			},
			{
				type: "quote",
				text: "المراجعة الذكية مش يلي بتاخد وقت أطول، هي يلي بتعرف بالضبط وين تحط وقتك."
			}
		]
	}
];
function getBlogPost(slug) {
	return blogPosts.find((p) => p.slug === slug);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/seo-DbTXblrf.js
var SITE_URL = "https://pixely-frame-magic.vercel.app".replace(/\/$/, "");
var PAGE_META_KEYS = {
	"/": "home",
	"/about": "about",
	"/courses": "courses",
	"/for-teachers": "forTeachers",
	"/how-it-works": "howItWorks",
	"/pricing": "pricing",
	"/contact": "contact",
	"/help": "help",
	"/privacy": "privacy",
	"/terms": "terms",
	"/blog": "blog",
	"/login": "authPages.login",
	"/signup": "authPages.signup",
	"/forgot-password": "authPages.forgot",
	"/reset-password": "authPages.reset",
	"/verify-email": "authPages.verify",
	"/teacher/register": "authPages.teacherRegister",
	"/invite": "invite",
	"/unsubscribe": "unsubscribe",
	"/settings": "settings"
};
var NOINDEX_PATHS = [
	"/403",
	"/login",
	"/signup",
	"/forgot-password",
	"/reset-password",
	"/verify-email",
	"/teacher/register",
	"/invite/",
	"/unsubscribe",
	"/certificate/",
	"/dashboard",
	"/admin/",
	"/teacher/dashboard",
	"/teacher/courses",
	"/teacher/quizzes",
	"/teacher/content",
	"/teacher/community",
	"/teacher/analytics",
	"/teacher/earnings",
	"/teacher/grading",
	"/teacher/settings",
	"/teacher/profile/edit",
	"/parent/",
	"/supervisor/",
	"/library",
	"/exam-simulator",
	"/mistakes-bank",
	"/my-courses",
	"/my-certificates",
	"/flashcards",
	"/bookmarks",
	"/achievements",
	"/notifications",
	"/referrals",
	"/schedule",
	"/settings",
	"/community",
	"/system-modules",
	"/role-permissions/"
];
function translateMeta(locale, key) {
	const t = i18n_default.getFixedT(locale);
	return {
		title: String(t(`${key}.meta.title`)),
		description: String(t(`${key}.meta.description`))
	};
}
function isNoIndex(pathname) {
	return NOINDEX_PATHS.some((prefix) => pathname === prefix || pathname.startsWith(prefix));
}
function localizedUrl(pathname, locale) {
	const url = new URL(pathname || "/", SITE_URL);
	if (locale === "en") url.searchParams.set("lang", "en");
	return url.toString();
}
function localeFromSearch(search) {
	if (search && typeof search === "object" && "lang" in search) {
		if (search.lang === "en") return "en";
	}
	return "ar";
}
function getSeoForPath(pathname, locale) {
	const normalizedPath = pathname || "/";
	const blogSlug = normalizedPath.startsWith("/blog/") ? decodeURIComponent(normalizedPath.slice(6)) : null;
	const post = blogSlug ? getBlogPost(blogSlug) : void 0;
	i18n_default.getFixedT(locale);
	let meta;
	let type = "website";
	let publishedTime;
	if (post) {
		meta = {
			title: `${locale === "en" ? post.titleEn : post.title} | ${locale === "en" ? "Academia Blog" : "مدونة أكاديميا"}`,
			description: locale === "en" ? post.excerptEn : post.excerpt
		};
		type = "article";
		publishedTime = post.publishedAt;
	} else if (blogSlug) meta = translateMeta(locale, "notFound");
	else if (normalizedPath.startsWith("/invite/")) meta = translateMeta(locale, "invite");
	else if (normalizedPath.startsWith("/certificate/")) meta = translateMeta(locale, "certificate");
	else if (normalizedPath.startsWith("/teacher/") && !isNoIndex(normalizedPath)) meta = translateMeta(locale, "teacherProfile");
	else meta = translateMeta(locale, PAGE_META_KEYS[normalizedPath] ?? "notFound");
	const canonical = localizedUrl(normalizedPath, locale);
	const alternate = localizedUrl(normalizedPath, locale === "ar" ? "en" : "ar");
	return {
		...meta,
		locale,
		pathname: normalizedPath,
		canonical,
		alternate,
		type,
		indexable: !isNoIndex(normalizedPath),
		image: `${SITE_URL}/og-image.svg`,
		publishedTime
	};
}
function createSeoHead(pathname, locale = "ar") {
	const payload = getSeoForPath(pathname, locale);
	const localeCode = locale === "en" ? "en_US" : "ar";
	const alternateLocale = locale === "en" ? "ar" : "en_US";
	const links = [
		{
			rel: "canonical",
			href: payload.canonical
		},
		{
			rel: "alternate",
			href: localizedUrl(payload.pathname, "ar"),
			hrefLang: "ar"
		},
		{
			rel: "alternate",
			href: localizedUrl(payload.pathname, "en"),
			hrefLang: "en"
		},
		{
			rel: "alternate",
			href: localizedUrl(payload.pathname, "ar"),
			hrefLang: "x-default"
		}
	];
	const jsonLd = payload.type === "article" ? {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: payload.title,
		description: payload.description,
		datePublished: payload.publishedTime,
		inLanguage: payload.locale,
		mainEntityOfPage: payload.canonical,
		image: payload.image,
		publisher: {
			"@type": "Organization",
			name: "Academia",
			url: SITE_URL
		}
	} : {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: payload.locale === "en" ? "Academia" : "أكاديميا",
		description: payload.description,
		url: payload.canonical,
		inLanguage: payload.locale,
		publisher: {
			"@type": "Organization",
			name: "Academia",
			url: SITE_URL,
			logo: `${SITE_URL}/og-image.svg`
		}
	};
	return {
		meta: [
			{ title: payload.title },
			{
				name: "description",
				content: payload.description
			},
			{
				name: "robots",
				content: payload.indexable ? "index, follow" : "noindex, nofollow"
			},
			{
				property: "og:type",
				content: payload.type
			},
			{
				property: "og:title",
				content: payload.title
			},
			{
				property: "og:description",
				content: payload.description
			},
			{
				property: "og:url",
				content: payload.canonical
			},
			{
				property: "og:site_name",
				content: locale === "en" ? "Academia" : "أكاديميا"
			},
			{
				property: "og:locale",
				content: localeCode
			},
			{
				property: "og:locale:alternate",
				content: alternateLocale
			},
			{
				property: "og:image",
				content: payload.image
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: payload.title
			},
			{
				name: "twitter:description",
				content: payload.description
			},
			{
				name: "twitter:image",
				content: payload.image
			},
			...payload.publishedTime ? [{
				property: "article:published_time",
				content: payload.publishedTime
			}] : []
		],
		links,
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify(jsonLd)
		}]
	};
}
function upsertMeta(attribute, key, content) {
	const selector = `meta[data-academia-seo="true"][${attribute}="${key}"]`;
	let element = document.head.querySelector(selector);
	if (!element) {
		element = document.createElement("meta");
		element.setAttribute("data-academia-seo", "true");
		element.setAttribute(attribute, key);
		document.head.appendChild(element);
	}
	element.content = content;
}
function upsertLink(rel, href, hreflang) {
	const selector = `link[data-academia-seo="true"][rel="${rel}"]${hreflang ? `[hreflang="${hreflang}"]` : ""}`;
	let element = document.head.querySelector(selector);
	if (!element) {
		element = document.createElement("link");
		element.setAttribute("data-academia-seo", "true");
		element.rel = rel;
		if (hreflang) element.hreflang = hreflang;
		document.head.appendChild(element);
	}
	element.href = href;
}
function upsertJsonLd(payload) {
	const id = "academia-seo-jsonld";
	let element = document.getElementById(id);
	if (!element) {
		element = document.createElement("script");
		element.id = id;
		element.type = "application/ld+json";
		element.setAttribute("data-academia-seo", "true");
		document.head.appendChild(element);
	}
	const data = payload.type === "article" ? {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: payload.title,
		description: payload.description,
		datePublished: payload.publishedTime,
		inLanguage: payload.locale,
		mainEntityOfPage: payload.canonical,
		image: payload.image,
		publisher: {
			"@type": "Organization",
			name: "Academia",
			url: SITE_URL
		}
	} : {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: payload.locale === "en" ? "Academia" : "أكاديميا",
		description: payload.description,
		url: payload.canonical,
		inLanguage: payload.locale
	};
	element.textContent = JSON.stringify(data);
}
function applySeo(payload) {
	if (typeof document === "undefined") return;
	document.title = payload.title;
	upsertMeta("name", "description", payload.description);
	upsertMeta("name", "robots", payload.indexable ? "index, follow" : "noindex, nofollow");
	upsertMeta("name", "theme-color", "#1E2761");
	upsertMeta("name", "application-name", "Academia");
	upsertMeta("property", "og:type", payload.type);
	upsertMeta("property", "og:title", payload.title);
	upsertMeta("property", "og:description", payload.description);
	upsertMeta("property", "og:url", payload.canonical);
	upsertMeta("property", "og:site_name", payload.locale === "en" ? "Academia" : "أكاديميا");
	upsertMeta("property", "og:locale", payload.locale === "en" ? "en_US" : "ar");
	upsertMeta("property", "og:locale:alternate", payload.locale === "en" ? "ar" : "en_US");
	upsertMeta("property", "og:image", payload.image);
	upsertMeta("name", "twitter:card", "summary_large_image");
	upsertMeta("name", "twitter:title", payload.title);
	upsertMeta("name", "twitter:description", payload.description);
	upsertMeta("name", "twitter:image", payload.image);
	if (payload.publishedTime) upsertMeta("property", "article:published_time", payload.publishedTime);
	upsertLink("canonical", payload.canonical);
	if (payload.indexable) {
		upsertLink("alternate", localizedUrl(payload.pathname, "ar"), "ar");
		upsertLink("alternate", localizedUrl(payload.pathname, "en"), "en");
		upsertLink("alternate", localizedUrl(payload.pathname, "ar"), "x-default");
	}
	upsertJsonLd(payload);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-D9hWsH17.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var styles_default = "/assets/styles-BU4u04_2.css";
var LAST_ACTIVITY_KEY = "acadimia.lastActivity";
var ACTIVITY_EVENTS = [
	"pointerdown",
	"keydown",
	"scroll",
	"touchstart",
	"visibilitychange"
];
/**
* الجلسة نفسها محفوظة (persistSession) فتبقى بعد الريلود أو إغلاق المتصفح،
* لكن الخمول أكثر من ساعتين ينهيها فوراً عند العودة أو أثناء الجلسة.
*/
function useIdleLogout() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const signingOut = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const touch = () => {
			if (document.visibilityState === "hidden") return;
			localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
		};
		const expire = async () => {
			if (signingOut.current) return;
			signingOut.current = true;
			if (!isAuthenticated()) {
				signingOut.current = false;
				return;
			}
			localStorage.removeItem(LAST_ACTIVITY_KEY);
			await logout();
			toast.warning(t("session.expired"));
			navigate({
				to: "/login",
				replace: true
			});
			signingOut.current = false;
		};
		const check = () => {
			const raw = Number(localStorage.getItem("acadimia.lastActivity") ?? 0);
			if (!raw) {
				touch();
				return;
			}
			if (Date.now() - raw > 72e5) expire();
		};
		check();
		touch();
		ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, touch, { passive: true }));
		const timer = window.setInterval(check, 6e4);
		return () => {
			ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, touch));
			window.clearInterval(timer);
		};
	}, [navigate, t]);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
	}, [pathname]);
}
function IdleLogoutWatcher() {
	useIdleLogout();
	return null;
}
var CONSENT_KEY = "acadimia.cookieConsent";
/** بانر الموافقة — يظهر أول زيارة فقط، ولا يُشغَّل أي تتبّع تحليلي قبل الموافقة. */
function CookieConsent() {
	const { t } = useTranslation();
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
	}, []);
	const decide = (value) => {
		localStorage.setItem(CONSENT_KEY, value);
		window.dispatchEvent(new CustomEvent("acadimia:cookie-consent", { detail: value }));
		setVisible(false);
	};
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-label": t("cookie.title"),
		className: "fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-[60] mx-auto max-h-[calc(100dvh-1.5rem)] max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card/95 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-lg backdrop-blur md:inset-x-6 md:bottom-6 md:pb-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 md:flex-row md:items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cookie, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold text-foreground",
						children: t("cookie.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs leading-relaxed text-muted-foreground",
						children: [
							t("cookie.text"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "font-semibold text-primary hover:underline",
								children: t("cookie.more")
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => decide("declined"),
						className: "rounded-xl border border-border px-3 py-2 text-xs font-bold text-muted-foreground transition-colors hover:text-foreground",
						children: t("cookie.decline")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => decide("accepted"),
						className: "rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90",
						children: t("cookie.accept")
					})]
				})
			]
		})
	});
}
/** رسمة ترحيبية عامة — سطح مكتب + رسم بياني صاعد. تُستخدم ببانرات لوحات التحكم. */
function WelcomeIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 200 160",
		fill: "none",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "100",
				cy: "146",
				rx: "72",
				ry: "8",
				className: "fill-foreground/5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "34",
				y: "34",
				width: "132",
				height: "88",
				rx: "12",
				className: "fill-card stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "34",
				y: "34",
				width: "132",
				height: "22",
				rx: "12",
				className: "fill-secondary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "46",
				cy: "45",
				r: "3",
				className: "fill-destructive/60"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "56",
				cy: "45",
				r: "3",
				className: "fill-primary/60"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "66",
				cy: "45",
				r: "3",
				className: "fill-success/60"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M52 100 L74 82 L94 96 L120 66 L146 78",
				className: "stroke-primary",
				strokeWidth: "4",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "146",
				cy: "78",
				r: "5",
				className: "fill-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "52",
				y: "104",
				width: "20",
				height: "10",
				rx: "3",
				className: "fill-info/25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "78",
				y: "104",
				width: "20",
				height: "10",
				rx: "3",
				className: "fill-success/25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "104",
				y: "104",
				width: "20",
				height: "10",
				rx: "3",
				className: "fill-primary/25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "164",
				cy: "30",
				r: "14",
				className: "fill-primary/15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "26",
				cy: "120",
				r: "10",
				className: "fill-success/15"
			})
		]
	});
}
/** رسمة "صندوق فاضي" — لحالات عدم وجود بيانات (EmptyState). */
function EmptyIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 160 120",
		fill: "none",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "80",
				cy: "100",
				rx: "46",
				ry: "7",
				className: "fill-foreground/5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M40 44 L80 28 L120 44 L120 84 L80 100 L40 84 Z",
				className: "fill-card stroke-border",
				strokeWidth: "2",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M40 44 L80 60 L120 44",
				className: "stroke-border",
				strokeWidth: "2",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M80 60 L80 100",
				className: "stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "80",
				cy: "60",
				r: "16",
				className: "fill-primary/12"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M73 60 L78 65 L88 54",
				className: "stroke-primary",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				fill: "none",
				opacity: "0.4"
			})
		]
	});
}
/** رسمة 404 — بوصلة ضائعة. لصفحة "غير موجود". */
function NotFoundIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 200 160",
		fill: "none",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "100",
				cy: "146",
				rx: "60",
				ry: "7",
				className: "fill-foreground/5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "100",
				cy: "80",
				r: "52",
				className: "fill-card stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "100",
				cy: "80",
				r: "38",
				className: "stroke-border",
				strokeWidth: "1.5",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M84 96 L92 68 L120 60 L108 92 Z",
				className: "fill-primary/70"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "100",
				cy: "80",
				r: "5",
				className: "fill-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "150",
				cy: "40",
				r: "10",
				className: "fill-info/20"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "42",
				cy: "112",
				r: "8",
				className: "fill-success/20"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M100 20 L100 28 M100 132 L100 140 M40 80 L48 80 M152 80 L160 80",
				className: "stroke-muted-foreground",
				strokeWidth: "2",
				strokeLinecap: "round"
			})
		]
	});
}
/** رسمة "غير مصرح" — قفل. لصفحة Forbidden. */
function ForbiddenIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 160 140",
		fill: "none",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "80",
				cy: "122",
				rx: "50",
				ry: "7",
				className: "fill-foreground/5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "46",
				y: "62",
				width: "68",
				height: "52",
				rx: "10",
				className: "fill-card stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M58 62 V46 a22 22 0 0 1 44 0 V62",
				className: "stroke-border",
				strokeWidth: "6",
				fill: "none",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "80",
				cy: "86",
				r: "8",
				className: "fill-destructive/70"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "76",
				y: "90",
				width: "8",
				height: "14",
				rx: "3",
				className: "fill-destructive/70"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "130",
				cy: "34",
				r: "9",
				className: "fill-primary/15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "28",
				cy: "100",
				r: "7",
				className: "fill-info/15"
			})
		]
	});
}
async function currentUserHome() {
	if (!isAuthenticated()) return null;
	if (!isDemoSession()) {
		const profile = getStoredProfile();
		return roleHome(profile?.roleName ?? null, profile?.roleId === 1);
	}
	const userId = getStoredUserId();
	if (!userId) return "/";
	const user = USERS.find((u) => u.id === userId);
	const role = user ? ROLES.find((r) => r.id === user.role_id) : null;
	const isAdmin = role?.name === "مدير عام";
	return roleHome(role?.name, isAdmin);
}
/** Keeps the document head aligned with the current route and selected locale. */
function SeoManager() {
	const location = useLocation();
	const { locale } = usePreferences();
	(0, import_react.useEffect)(() => {
		applySeo(getSeoForPath(location.pathname, locale));
	}, [location.pathname, locale]);
	return null;
}
function NotFoundComponent() {
	const { t } = useTranslation();
	const [home, setHome] = (0, import_react.useState)("/");
	(0, import_react.useEffect)(() => {
		currentUserHome().then((next) => setHome(next ?? "/"));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "surface-mesh flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shadow-elevation-2 max-w-md rounded-3xl border border-border bg-card p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFoundIllustration, { className: "mx-auto h-32 w-auto" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-6xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-xl font-bold text-foreground",
					children: t("errors.notFoundTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: t("errors.notFoundText")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: home,
						className: "btn-shine hover-press inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground",
						children: t("errors.backHome")
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	const { t } = useTranslation();
	(0, import_react.useEffect)(() => {}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shadow-elevation-2 max-w-md rounded-3xl border border-border bg-card p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/12 text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 24 24",
						fill: "none",
						className: "size-7",
						"aria-hidden": true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-xl font-bold text-foreground",
					children: t("errors.crashTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: t("errors.crashText")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 flex flex-wrap justify-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "hover-press inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground",
						children: t("errors.retry")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "hover-press inline-flex items-center justify-center rounded-xl border border-border bg-background px-6 py-3 text-sm font-bold text-foreground hover:bg-secondary",
						children: t("errors.backHome")
					})]
				})
			]
		})
	});
}
var Route$71 = createRootRouteWithContext()({
	head: (ctx) => {
		const seo = createSeoHead("/", localeFromSearch(ctx.match.search));
		return {
			meta: [
				{ charSet: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1"
				},
				...seo.meta
			],
			links: [
				...seo.links,
				{
					rel: "manifest",
					href: "/manifest.json"
				},
				{
					rel: "stylesheet",
					href: styles_default
				},
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com"
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossOrigin: "anonymous"
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700;800;900&family=Reem+Kufi:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
				},
				{
					rel: "icon",
					href: "/favicon.svg",
					type: "image/svg+xml"
				},
				{
					rel: "apple-touch-icon",
					href: "/icons/icon-192.png"
				}
			],
			scripts: seo.scripts
		};
	},
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ar",
		dir: "rtl",
		"data-theme": "dark",
		className: "dark",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: preferencesBootScript } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function AuthSync() {
	const router = useRouter();
	const queryClient = useQueryClient();
	(0, import_react.useEffect)(() => {
		const onAuthChanged = () => {
			router.invalidate();
			queryClient.invalidateQueries();
		};
		window.addEventListener(AUTH_EVENT, onAuthChanged);
		return () => window.removeEventListener(AUTH_EVENT, onAuthChanged);
	}, [router, queryClient]);
	return null;
}
function ServiceWorkerRegistrar() {
	(0, import_react.useEffect)(() => {
		if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
	}, []);
	return null;
}
function RootComponent() {
	const { queryClient } = Route$71.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PreferencesProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeoManager, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSync, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceWorkerRegistrar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdleLogoutWatcher, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CookieConsent, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				position: "top-center",
				richColors: true
			})
		] })
	});
}
var $$splitComponentImporter$70 = () => import("./routes-BPd73H8R.mjs");
var Route$70 = createFileRoute("/")({
	head: (ctx) => createSeoHead("/", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$70, "component")
});
var $$splitComponentImporter$69 = () => import("./403-07xUcy1j.mjs");
var Route$69 = createFileRoute("/403")({
	head: (ctx) => createSeoHead("/403", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$69, "component")
});
var $$splitComponentImporter$68 = () => import("./route-B7KxppcB.mjs");
var Route$68 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		if (!isAuthenticated() || !await verifyServerSession()) throw redirect({ to: "/login" });
		const userId = getStoredUserId();
		if (!userId) throw redirect({ to: "/login" });
		return { user: { id: userId } };
	},
	component: lazyRouteComponent($$splitComponentImporter$68, "component")
});
var $$splitComponentImporter$67 = () => import("./about-DsjhuP5z.mjs");
var Route$67 = createFileRoute("/about")({
	head: (ctx) => createSeoHead("/about", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$67, "component")
});
var $$splitComponentImporter$66 = () => import("./blog-sJqMyphi.mjs");
var Route$66 = createFileRoute("/blog")({
	head: (ctx) => createSeoHead("/blog", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$66, "component")
});
var $$splitComponentImporter$65 = () => import("./contact-CiTiKADJ.mjs");
var Route$65 = createFileRoute("/contact")({
	head: (ctx) => createSeoHead("/contact", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$65, "component")
});
var $$splitComponentImporter$64 = () => import("./courses-DuUu__F1.mjs");
var Route$64 = createFileRoute("/courses")({
	head: (ctx) => createSeoHead("/courses", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$64, "component")
});
var $$splitComponentImporter$63 = () => import("./for-teachers-Dz8o03Js.mjs");
var Route$63 = createFileRoute("/for-teachers")({
	head: (ctx) => createSeoHead("/for-teachers", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$63, "component")
});
var $$splitComponentImporter$62 = () => import("./forgot-password-C4JGVfbU.mjs");
var Route$62 = createFileRoute("/forgot-password")({
	head: (ctx) => createSeoHead("/forgot-password", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$62, "component")
});
var $$splitComponentImporter$61 = () => import("./help-BtxqpjGs.mjs");
var Route$61 = createFileRoute("/help")({
	head: (ctx) => createSeoHead("/help", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$61, "component")
});
var $$splitComponentImporter$60 = () => import("./how-it-works-ByymXPNt.mjs");
var Route$60 = createFileRoute("/how-it-works")({
	head: (ctx) => createSeoHead("/how-it-works", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$60, "component")
});
var $$splitComponentImporter$59 = () => import("./login-3aFJiL-c.mjs");
var Route$59 = createFileRoute("/login")({
	ssr: false,
	beforeLoad: async () => {
		if (await currentUserHome()) throw redirect({ to: "/" });
	},
	head: (ctx) => createSeoHead("/login", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$59, "component")
});
var $$splitComponentImporter$58 = () => import("./pricing-CRhVdc7v.mjs");
var Route$58 = createFileRoute("/pricing")({
	head: (ctx) => createSeoHead("/pricing", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$58, "component")
});
var $$splitComponentImporter$57 = () => import("./privacy-B02-1GgT.mjs");
var Route$57 = createFileRoute("/privacy")({
	head: (ctx) => createSeoHead("/privacy", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$57, "component")
});
var $$splitComponentImporter$56 = () => import("./reset-password-DPbLp-pH.mjs");
var Route$56 = createFileRoute("/reset-password")({
	ssr: false,
	head: (ctx) => createSeoHead("/reset-password", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$56, "component")
});
var $$splitComponentImporter$55 = () => import("./signup-dXaDCOv8.mjs");
var Route$55 = createFileRoute("/signup")({
	ssr: false,
	beforeLoad: async () => {
		if (await currentUserHome()) throw redirect({ to: "/" });
	},
	validateSearch: (search) => typeof search.invite === "string" ? { invite: search.invite } : {},
	head: (ctx) => createSeoHead("/signup", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$55, "component")
});
var $$splitComponentImporter$54 = () => import("./terms-CSYDK6kI.mjs");
var Route$54 = createFileRoute("/terms")({
	head: (ctx) => createSeoHead("/terms", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$54, "component")
});
var $$splitComponentImporter$53 = () => import("./unsubscribe-BbSzepwL.mjs");
var Route$53 = createFileRoute("/unsubscribe")({
	head: (ctx) => createSeoHead("/unsubscribe", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$53, "component")
});
var $$splitComponentImporter$52 = () => import("./verify-email-CEDSw8vc.mjs");
var Route$52 = createFileRoute("/verify-email")({
	ssr: false,
	validateSearch: (search) => ({ email: typeof search.email === "string" ? search.email : void 0 }),
	head: (ctx) => createSeoHead("/verify-email", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$52, "component")
});
var description$29 = "تقدّمك يُقاس بالإتقان لا بالساعات: شارات، سلاسل أيام، ونسب إتقان لكل مادة.";
var $$splitComponentImporter$51 = () => import("./achievements-Daf7c7Km.mjs");
var title$29 = "الإنجاز | أكاديميا";
var Route$51 = createFileRoute("/_authenticated/achievements")({
	head: () => ({ meta: [
		{ title: title$29 },
		{
			name: "description",
			content: description$29
		},
		{
			property: "og:title",
			content: title$29
		},
		{
			property: "og:description",
			content: description$29
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$51, "component")
});
var description$28 = "كل ما حفظته: دروس، أسئلة، ونقاشات — بمكان واحد للرجوع السريع.";
var $$splitComponentImporter$50 = () => import("./bookmarks-8qDfc7I2.mjs");
var title$28 = "المحفوظات | أكاديميا";
var Route$50 = createFileRoute("/_authenticated/bookmarks")({
	head: () => ({ meta: [
		{ title: title$28 },
		{
			name: "description",
			content: description$28
		},
		{
			property: "og:title",
			content: title$28
		},
		{
			property: "og:description",
			content: description$28
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$50, "component")
});
var description$27 = "اسأل في مجتمع المادة، وجاوب زملاءك — إجابات المعلم تُميّز تلقائياً.";
var $$splitComponentImporter$49 = () => import("./community-D_ppi7UV.mjs");
var title$27 = "مجتمع المواد | أكاديميا";
var Route$49 = createFileRoute("/_authenticated/community")({
	head: () => ({ meta: [
		{ title: title$27 },
		{
			name: "description",
			content: description$27
		},
		{
			property: "og:title",
			content: title$27
		},
		{
			property: "og:description",
			content: description$27
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$49, "component")
});
var description$26 = "كل دراستك بمكان واحد: تقدّمك اليوم، مهامك القريبة، والمواد التي تحتاج مراجعة.";
var $$splitComponentImporter$48 = () => import("./dashboard-RfSRdUCo.mjs");
var title$26 = "لوحة الطالب | أكاديميا";
var Route$48 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: title$26 },
		{
			name: "description",
			content: description$26
		},
		{
			property: "og:title",
			content: title$26
		},
		{
			property: "og:description",
			content: description$26
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$48, "component")
});
var description$25 = "امتحان تدريبي بمؤقّت وشكل ورقة حقيقية، وتحليل يكشف نقاط ضعفك قبل الامتحان الحقيقي.";
var $$splitComponentImporter$47 = () => import("./exam-simulator-DrCp58g4.mjs");
var title$25 = "محاكي الامتحان | أكاديميا";
var Route$47 = createFileRoute("/_authenticated/exam-simulator")({
	head: () => ({ meta: [
		{ title: title$25 },
		{
			name: "description",
			content: description$25
		},
		{
			property: "og:title",
			content: title$25
		},
		{
			property: "og:description",
			content: description$25
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$47, "component")
});
var description$24 = "مراجعة متباعدة (Spaced repetition): البطاقة ترجع لك في الوقت الذي تنساها فيه بالضبط.";
var $$splitComponentImporter$46 = () => import("./flashcards-DYZOQlkw.mjs");
var title$24 = "البطاقات | أكاديميا";
var Route$46 = createFileRoute("/_authenticated/flashcards")({
	head: () => ({ meta: [
		{ title: title$24 },
		{
			name: "description",
			content: description$24
		},
		{
			property: "og:title",
			content: title$24
		},
		{
			property: "og:description",
			content: description$24
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$46, "component")
});
var description$23 = "مكتبة مرتّبة: فصل ← مادة ← وحدة ← درس. لا مزيد من الملفات الضائعة في الواتساب.";
var $$splitComponentImporter$45 = () => import("./library-CuvqAniT.mjs");
var title$23 = "المكتبة | أكاديميا";
var Route$45 = createFileRoute("/_authenticated/library")({
	head: () => ({ meta: [
		{ title: title$23 },
		{
			name: "description",
			content: description$23
		},
		{
			property: "og:title",
			content: title$23
		},
		{
			property: "og:description",
			content: description$23
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$45, "component")
});
var description$22 = "كل سؤال أخطأت فيه يُحفظ هنا تلقائياً، ويُعاد عليك حتى تُتقنه.";
var $$splitComponentImporter$44 = () => import("./mistakes-bank-D0BUJ0VA.mjs");
var title$22 = "بنك الأخطاء | أكاديميا";
var Route$44 = createFileRoute("/_authenticated/mistakes-bank")({
	head: () => ({ meta: [
		{ title: title$22 },
		{
			name: "description",
			content: description$22
		},
		{
			property: "og:title",
			content: title$22
		},
		{
			property: "og:description",
			content: description$22
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$44, "component")
});
var description$21 = "شهاداتك القابلة للتحقّق — شارك الرابط، وأي شخص يتأكد من صحّتها.";
var $$splitComponentImporter$43 = () => import("./my-certificates-BqxG23xY.mjs");
var title$21 = "شهاداتي | أكاديميا";
var Route$43 = createFileRoute("/_authenticated/my-certificates")({
	head: () => ({ meta: [
		{ title: title$21 },
		{
			name: "description",
			content: description$21
		},
		{
			property: "og:title",
			content: title$21
		},
		{
			property: "og:description",
			content: description$21
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$43, "component")
});
var description$20 = "الكورسات التي اشتركت فيها فعلياً — تقدّمك، الحصة القادمة، وشهادة الإتمام.";
var $$splitComponentImporter$42 = () => import("./my-courses-YaQibDB1.mjs");
var title$20 = "كورساتي | أكاديميا";
var Route$42 = createFileRoute("/_authenticated/my-courses")({
	head: () => ({ meta: [
		{ title: title$20 },
		{
			name: "description",
			content: description$20
		},
		{
			property: "og:title",
			content: title$20
		},
		{
			property: "og:description",
			content: description$20
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$42, "component")
});
var $$splitComponentImporter$41 = () => import("./notifications-CkChrovt.mjs");
var Route$41 = createFileRoute("/_authenticated/notifications")({
	head: () => ({ meta: [
		{ title: "الإشعارات | Academia" },
		{
			name: "description",
			content: "إشعارات الحساب والمهام التعليمية."
		},
		{
			property: "og:title",
			content: "الإشعارات | Academia"
		},
		{
			property: "og:description",
			content: "إشعارات الحساب والمهام التعليمية."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$41, "component")
});
var description$19 = "ادعُ أصدقاءك برابطك الخاص، وتابع كم صديق سجّل فعلياً ومكافآتك.";
var $$splitComponentImporter$40 = () => import("./referrals-BJmuPEGS.mjs");
var title$19 = "الإحالات | أكاديميا";
var Route$40 = createFileRoute("/_authenticated/referrals")({
	head: () => ({ meta: [
		{ title: title$19 },
		{
			name: "description",
			content: description$19
		},
		{
			property: "og:title",
			content: title$19
		},
		{
			property: "og:description",
			content: description$19
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$40, "component")
});
var description$18 = "جدول دراسي يذكّرك: حصص، واجبات، امتحانات، وجلسات مراجعة.";
var $$splitComponentImporter$39 = () => import("./schedule-CfcOBtwq.mjs");
var title$18 = "الجدول | أكاديميا";
var Route$39 = createFileRoute("/_authenticated/schedule")({
	head: () => ({ meta: [
		{ title: title$18 },
		{
			name: "description",
			content: description$18
		},
		{
			property: "og:title",
			content: title$18
		},
		{
			property: "og:description",
			content: description$18
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$39, "component")
});
var $$splitComponentImporter$38 = () => import("./settings-_9NExS3g.mjs");
var Route$38 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [
		{ title: "الإعدادات | أكاديميا" },
		{
			name: "description",
			content: "اللغة، الثيم، وبيانات حسابك في أكاديميا."
		},
		{
			property: "og:title",
			content: "الإعدادات | أكاديميا"
		},
		{
			property: "og:description",
			content: "تفضيلاتك تُحفظ على جهازك وعلى حسابك معاً."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$38, "component")
});
var $$splitComponentImporter$37 = () => import("./system-modules-BvzZ0ijl.mjs");
var Route$37 = createFileRoute("/_authenticated/system-modules")({
	head: () => ({ meta: [
		{ title: "وحدات النظام | Academia" },
		{
			name: "description",
			content: "تفعيل أو تعطيل وحدات النظام على مستوى كل المستخدمين بضغطة واحدة."
		},
		{
			property: "og:title",
			content: "وحدات النظام | Academia"
		},
		{
			property: "og:description",
			content: "التحكم العام بتفعيل وحدات النظام."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$37, "component")
});
var $$splitComponentImporter$36 = () => import("./blog._slug-DJ4K3MRD.mjs");
var Route$36 = createFileRoute("/blog/$slug")({
	head: (ctx) => {
		const { params } = ctx;
		return createSeoHead(`/blog/${encodeURIComponent(params.slug)}`, localeFromSearch(ctx.match.search));
	},
	component: lazyRouteComponent($$splitComponentImporter$36, "component")
});
var $$splitComponentImporter$35 = () => import("./certificate._id-Cyo1xSam.mjs");
var Route$35 = createFileRoute("/certificate/$id")({
	head: (ctx) => {
		const { params } = ctx;
		return createSeoHead(`/certificate/${encodeURIComponent(params.id)}`, localeFromSearch(ctx.match.search));
	},
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
/** رقم صالح شكلياً: ACD-YYYY-NNNNN (سجل الشهادات الحقيقي يأتي مع مرحلة الباك-إند). */
var $$splitComponentImporter$34 = () => import("./invite._code-BZi6CR5p.mjs");
var Route$34 = createFileRoute("/invite/$code")({
	head: (ctx) => {
		const { params } = ctx;
		return createSeoHead(`/invite/${encodeURIComponent(params.code)}`, localeFromSearch(ctx.match.search));
	},
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
var $$splitComponentImporter$33 = () => import("./teacher._id-CSPqB3y2.mjs");
var Route$33 = createFileRoute("/teacher/$id")({
	head: (ctx) => {
		const { params } = ctx;
		return createSeoHead(`/teacher/${encodeURIComponent(params.id)}`, localeFromSearch(ctx.match.search));
	},
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./teacher.register-Ch77XGoX.mjs");
var Route$32 = createFileRoute("/teacher/register")({
	ssr: false,
	beforeLoad: async () => {
		if (await currentUserHome()) throw redirect({ to: "/" });
	},
	head: (ctx) => createSeoHead("/teacher/register", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./admin.backend-permissions-D_2oDt0X.mjs");
var Route$31 = createFileRoute("/_authenticated/admin/backend-permissions")({
	head: () => ({ meta: [
		{ title: "صلاحيات الباك اند | Academia" },
		{
			name: "description",
			content: "إدارة صلاحيات أنواع المستخدمين الحقيقية على Academia."
		},
		{
			property: "og:title",
			content: "صلاحيات الباك اند"
		},
		{
			property: "og:description",
			content: "إدارة صلاحيات أنواع المستخدمين الحقيقية على Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./admin.community-reports-BglRIkA9.mjs");
var Route$30 = createFileRoute("/_authenticated/admin/community-reports")({
	head: () => ({ meta: [
		{ title: "بلاغات المجتمع | Academia" },
		{
			name: "description",
			content: "إدارة بلاغات مجتمعات Academia."
		},
		{
			property: "og:title",
			content: "بلاغات المجتمع"
		},
		{
			property: "og:description",
			content: "إدارة بلاغات مجتمعات Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./admin.constants-D7tXGBWh.mjs");
var Route$29 = createFileRoute("/_authenticated/admin/constants")({
	head: () => ({ meta: [
		{ title: "الثوابت | Academia" },
		{
			name: "description",
			content: "إدارة الثوابت والتصنيفات العامة على Academia."
		},
		{
			property: "og:title",
			content: "الثوابت"
		},
		{
			property: "og:description",
			content: "إدارة الثوابت والتصنيفات العامة على Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./admin.content-review-DaR6uSjJ.mjs");
var Route$28 = createFileRoute("/_authenticated/admin/content-review")({
	head: () => ({ meta: [
		{ title: "مراجعة المحتوى | Academia" },
		{
			name: "description",
			content: "مراجعة محتوى Academia التعليمي."
		},
		{
			property: "og:title",
			content: "مراجعة المحتوى"
		},
		{
			property: "og:description",
			content: "مراجعة محتوى Academia التعليمي."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./admin.course-catalog-By96HnL2.mjs");
var Route$27 = createFileRoute("/_authenticated/admin/course-catalog")({
	head: () => ({ meta: [
		{ title: "كتالوج الكورسات العام | Academia" },
		{
			name: "description",
			content: "إدارة الكورسات المعروضة بصفحة الكورسات العامة."
		},
		{
			property: "og:title",
			content: "كتالوج الكورسات العام"
		},
		{
			property: "og:description",
			content: "إدارة الكورسات المعروضة بصفحة الكورسات العامة."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./admin.curriculum-B3onYAIR.mjs");
var Route$26 = createFileRoute("/_authenticated/admin/curriculum")({
	head: () => ({ meta: [
		{ title: "المنهاج | Academia" },
		{
			name: "description",
			content: "هيكل منهاج Academia."
		},
		{
			property: "og:title",
			content: "المنهاج"
		},
		{
			property: "og:description",
			content: "هيكل منهاج Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./admin.curriculum-requests-DlW1Sfqg.mjs");
var Route$25 = createFileRoute("/_authenticated/admin/curriculum-requests")({
	head: () => ({ meta: [
		{ title: "طلبات المنهاج | Academia" },
		{
			name: "description",
			content: "إدارة طلبات منهاج Academia."
		},
		{
			property: "og:title",
			content: "طلبات المنهاج"
		},
		{
			property: "og:description",
			content: "إدارة طلبات منهاج Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./admin.dashboard-BsMZ1tpm.mjs");
var Route$24 = createFileRoute("/_authenticated/admin/dashboard")({
	head: () => ({ meta: [
		{ title: "إدارة Academia" },
		{
			name: "description",
			content: "لوحة تشغيل منصة Academia."
		},
		{
			property: "og:title",
			content: "إدارة Academia"
		},
		{
			property: "og:description",
			content: "لوحة تشغيل منصة Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./admin.pages-DldBdYCG.mjs");
var Route$23 = createFileRoute("/_authenticated/admin/pages")({
	head: () => ({ meta: [
		{ title: "الصفحات | Academia" },
		{
			name: "description",
			content: "إدارة صفحات وقوائم النظام على Academia."
		},
		{
			property: "og:title",
			content: "الصفحات"
		},
		{
			property: "og:description",
			content: "إدارة صفحات وقوائم النظام على Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./admin.payments-DpXM_lTn.mjs");
var Route$22 = createFileRoute("/_authenticated/admin/payments")({
	head: () => ({ meta: [
		{ title: "المدفوعات | Academia" },
		{
			name: "description",
			content: "متابعة مدفوعات Academia."
		},
		{
			property: "og:title",
			content: "المدفوعات"
		},
		{
			property: "og:description",
			content: "متابعة مدفوعات Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./admin.permissions-D98WQM7c.mjs");
var title$17 = "مصفوفة الصلاحيات | Academia";
var description$17 = "اختر نوع المستخدم لتحرير شجرة صلاحياته في Academia.";
var Route$21 = createFileRoute("/_authenticated/admin/permissions")({
	head: () => ({ meta: [
		{ title: title$17 },
		{
			name: "description",
			content: description$17
		},
		{
			property: "og:title",
			content: "مصفوفة الصلاحيات"
		},
		{
			property: "og:description",
			content: description$17
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./admin.roles-CJ1sIm4r.mjs");
var Route$20 = createFileRoute("/_authenticated/admin/roles")({
	head: () => ({ meta: [
		{ title: "الأدوار والصلاحيات | Academia" },
		{
			name: "description",
			content: "إدارة أدوار وصلاحيات Academia."
		},
		{
			property: "og:title",
			content: "الأدوار والصلاحيات"
		},
		{
			property: "og:description",
			content: "إدارة أدوار وصلاحيات Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./admin.teachers-kjbg_JxR.mjs");
var Route$19 = createFileRoute("/_authenticated/admin/teachers")({
	head: () => ({ meta: [
		{ title: "توثيق المعلمين | Academia" },
		{
			name: "description",
			content: "مراجعة واعتماد طلبات المعلمين."
		},
		{
			property: "og:title",
			content: "توثيق المعلمين"
		},
		{
			property: "og:description",
			content: "مراجعة واعتماد طلبات المعلمين."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./admin.users--JGudS7A.mjs");
var Route$18 = createFileRoute("/_authenticated/admin/users")({
	head: () => ({ meta: [
		{ title: "المستخدمون | Academia" },
		{
			name: "description",
			content: "إدارة حسابات المستخدمين على Academia."
		},
		{
			property: "og:title",
			content: "المستخدمون"
		},
		{
			property: "og:description",
			content: "إدارة حسابات المستخدمين على Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var description$16 = "تقرير أسبوعي واضح: التزام، إتقان، ومواطن الضعف — بدون أرقام مضلّلة.";
var $$splitComponentImporter$17 = () => import("./parent.report-sfmzJ0EY.mjs");
var title$16 = "تقرير الابن | أكاديميا";
var Route$17 = createFileRoute("/_authenticated/parent/report")({
	head: () => ({ meta: [
		{ title: title$16 },
		{
			name: "description",
			content: description$16
		},
		{
			property: "og:title",
			content: title$16
		},
		{
			property: "og:description",
			content: description$16
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var description$15 = "الأبناء المرتبطون بحسابك، فك الربط، وتفضيلات الإشعارات والتقارير.";
var $$splitComponentImporter$16 = () => import("./parent.settings-CNCkHqz9.mjs");
var title$15 = "إعدادات ولي الأمر | أكاديميا";
var Route$16 = createFileRoute("/_authenticated/parent/settings")({
	head: () => ({ meta: [
		{ title: title$15 },
		{
			name: "description",
			content: description$15
		},
		{
			property: "og:title",
			content: title$15
		},
		{
			property: "og:description",
			content: description$15
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./role-permissions._roleId-DWRf7HTr.mjs");
var Route$15 = createFileRoute("/_authenticated/role-permissions/$roleId")({
	head: () => ({ meta: [
		{ title: "صلاحيات نوع المستخدم | نظام الصلاحيات" },
		{
			name: "description",
			content: "شجرة صلاحيات من ثلاث مستويات: الوحدة ثم الصفحة ثم أدوات العرض والإضافة والتعديل."
		},
		{
			property: "og:title",
			content: "صلاحيات نوع المستخدم"
		},
		{
			property: "og:description",
			content: "تحديد صلاحيات دقيقة لكل صفحة داخل النظام."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var description$14 = "جودة التعليم عبر المعلمين والصفوف: تنبيهات، متابعات، ومؤشرات إتقان.";
var $$splitComponentImporter$14 = () => import("./supervisor.dashboard-zz3gDjUm.mjs");
var title$14 = "لوحة الإشراف | أكاديميا";
var Route$14 = createFileRoute("/_authenticated/supervisor/dashboard")({
	head: () => ({ meta: [
		{ title: title$14 },
		{
			name: "description",
			content: description$14
		},
		{
			property: "og:title",
			content: title$14
		},
		{
			property: "og:description",
			content: description$14
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var description$13 = "تقارير دورية جاهزة للتصدير: جودة التدريس، الإتقان، والالتزام.";
var $$splitComponentImporter$13 = () => import("./supervisor.reports-wC0Y49Ef.mjs");
var title$13 = "تقارير الإشراف | أكاديميا";
var Route$13 = createFileRoute("/_authenticated/supervisor/reports")({
	head: () => ({ meta: [
		{ title: title$13 },
		{
			name: "description",
			content: description$13
		},
		{
			property: "og:title",
			content: title$13
		},
		{
			property: "og:description",
			content: description$13
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var description$12 = "الطلاب المتعثّرون أولاً: من يحتاج تدخّلاً الآن ولماذا.";
var $$splitComponentImporter$12 = () => import("./supervisor.students-overview-O--e0RTh.mjs");
var title$12 = "نظرة الطلاب | أكاديميا";
var Route$12 = createFileRoute("/_authenticated/supervisor/students-overview")({
	head: () => ({ meta: [
		{ title: title$12 },
		{
			name: "description",
			content: description$12
		},
		{
			property: "og:title",
			content: title$12
		},
		{
			property: "og:description",
			content: description$12
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var description$11 = "أداء كل معلم: سرعة الرد، زمن التصحيح، وإتقان طلابه.";
var $$splitComponentImporter$11 = () => import("./supervisor.teachers-tWbHNiHM.mjs");
var title$11 = "المعلمون | أكاديميا";
var Route$11 = createFileRoute("/_authenticated/supervisor/teachers")({
	head: () => ({ meta: [
		{ title: title$11 },
		{
			name: "description",
			content: description$11
		},
		{
			property: "og:title",
			content: title$11
		},
		{
			property: "og:description",
			content: description$11
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var description$10 = "أين يتعثّر طلابك بالضبط: أسئلة يخطئ فيها الأكثر، وإتقان كل اختبار.";
var $$splitComponentImporter$10 = () => import("./teacher.analytics-36ibZthE.mjs");
var title$10 = "التحليلات | أكاديميا";
var Route$10 = createFileRoute("/_authenticated/teacher/analytics")({
	head: () => ({ meta: [
		{ title: title$10 },
		{
			name: "description",
			content: description$10
		},
		{
			property: "og:title",
			content: title$10
		},
		{
			property: "og:description",
			content: description$10
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var description$9 = "أسئلة طلابك في مكان واحد؛ إجابتك تُميّز كـ«إجابة معلم» تلقائياً.";
var $$splitComponentImporter$9 = () => import("./teacher.community-Bs6m5_-R.mjs");
var title$9 = "مجتمع الصف | أكاديميا";
var Route$9 = createFileRoute("/_authenticated/teacher/community")({
	head: () => ({ meta: [
		{ title: title$9 },
		{
			name: "description",
			content: description$9
		},
		{
			property: "og:title",
			content: title$9
		},
		{
			property: "og:description",
			content: description$9
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var description$8 = "دروسك وملفاتك: ارفع، رتّب على شجرة المنهاج، وأرسل للمراجعة قبل النشر.";
var $$splitComponentImporter$8 = () => import("./teacher.content-sabN4ORk.mjs");
var title$8 = "المحتوى | أكاديميا";
var Route$8 = createFileRoute("/_authenticated/teacher/content")({
	head: () => ({ meta: [
		{ title: title$8 },
		{
			name: "description",
			content: description$8
		},
		{
			property: "og:title",
			content: title$8
		},
		{
			property: "og:description",
			content: description$8
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var description$7 = "كورساتك المنشورة: الأسعار، المشتركون، والحصص القادمة.";
var $$splitComponentImporter$7 = () => import("./teacher.courses-DCSO4c4M.mjs");
var title$7 = "كورساتي (معلم) | أكاديميا";
var Route$7 = createFileRoute("/_authenticated/teacher/courses")({
	head: () => ({ meta: [
		{ title: title$7 },
		{
			name: "description",
			content: description$7
		},
		{
			property: "og:title",
			content: title$7
		},
		{
			property: "og:description",
			content: description$7
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var description$6 = "صفوفك اليوم: ما يحتاج تصحيحاً، أسئلة تنتظر جوابك، وأداء طلابك.";
var $$splitComponentImporter$6 = () => import("./teacher.dashboard-CtQh47rx.mjs");
var title$6 = "لوحة المعلم | أكاديميا";
var Route$6 = createFileRoute("/_authenticated/teacher/dashboard")({
	head: () => ({ meta: [
		{ title: title$6 },
		{
			name: "description",
			content: description$6
		},
		{
			property: "og:title",
			content: title$6
		},
		{
			property: "og:description",
			content: description$6
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var description$5 = "أرباحك، عمولة المنصة، وطلبات السحب — كل شي واضح بلا مفاجآت.";
var $$splitComponentImporter$5 = () => import("./teacher.earnings-YsKSwWYm.mjs");
var title$5 = "الأرباح | أكاديميا";
var Route$5 = createFileRoute("/_authenticated/teacher/earnings")({
	head: () => ({ meta: [
		{ title: title$5 },
		{
			name: "description",
			content: description$5
		},
		{
			property: "og:title",
			content: title$5
		},
		{
			property: "og:description",
			content: description$5
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var description$4 = "قائمة التصحيح: الأسئلة المقالية والملفات المرفوعة، مع ملاحظات لكل طالب.";
var $$splitComponentImporter$4 = () => import("./teacher.grading-CnNZNnly.mjs");
var title$4 = "التصحيح | أكاديميا";
var Route$4 = createFileRoute("/_authenticated/teacher/grading")({
	head: () => ({ meta: [
		{ title: title$4 },
		{
			name: "description",
			content: description$4
		},
		{
			property: "og:title",
			content: title$4
		},
		{
			property: "og:description",
			content: description$4
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var description$3 = "بنك أسئلتك واختباراتك: اختيار متعدد، صح/خطأ، ومقالي — مع تصحيح آلي حيث ينفع.";
var $$splitComponentImporter$3 = () => import("./teacher.quizzes-Dv--ZX5J.mjs");
var title$3 = "الاختبارات | أكاديميا";
var Route$3 = createFileRoute("/_authenticated/teacher/quizzes")({
	head: () => ({ meta: [
		{ title: title$3 },
		{
			name: "description",
			content: description$3
		},
		{
			property: "og:title",
			content: title$3
		},
		{
			property: "og:description",
			content: description$3
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var description$2 = "التسعير، أوقات التوفّر، بيانات الدفع، وتفضيلات الإشعارات.";
var $$splitComponentImporter$2 = () => import("./teacher.settings-kIkgziwg.mjs");
var title$2 = "إعدادات المعلم | أكاديميا";
var Route$2 = createFileRoute("/_authenticated/teacher/settings")({
	head: () => ({ meta: [
		{ title: title$2 },
		{
			name: "description",
			content: description$2
		},
		{
			property: "og:title",
			content: title$2
		},
		{
			property: "og:description",
			content: description$2
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./library.lesson._id-DrVoXRvo.mjs");
var title$1 = "صفحة الدرس | أكاديميا";
var description$1 = "الدرس: ملف مرتّب + أسئلة تفاعلية + بطاقات مراجعة + إضافة أخطائك إلى بنك الأخطاء.";
var Route$1 = createFileRoute("/_authenticated/library/lesson/$id")({
	head: () => ({ meta: [
		{ title: title$1 },
		{
			name: "description",
			content: description$1
		},
		{
			property: "og:title",
			content: title$1
		},
		{
			property: "og:description",
			content: description$1
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var description = "هذا ما يراه الطلاب وأولياء الأمور: نبذتك، موادك، وشهاداتك الموثّقة.";
var $$splitComponentImporter = () => import("./teacher.profile.edit-8WRs9m0v.mjs");
var title = "ملفي العام | أكاديميا";
var Route = createFileRoute("/_authenticated/teacher/profile/edit")({
	head: () => ({ meta: [
		{ title },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: title
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$70.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$71
});
var R403Route = Route$69.update({
	id: "/403",
	path: "/403",
	getParentRoute: () => Route$71
});
var AuthenticatedRouteRoute = Route$68.update({
	id: "/_authenticated",
	getParentRoute: () => Route$71
});
var AboutRoute = Route$67.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$71
});
var BlogRoute = Route$66.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => Route$71
});
var ContactRoute = Route$65.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$71
});
var CoursesRoute = Route$64.update({
	id: "/courses",
	path: "/courses",
	getParentRoute: () => Route$71
});
var ForTeachersRoute = Route$63.update({
	id: "/for-teachers",
	path: "/for-teachers",
	getParentRoute: () => Route$71
});
var ForgotPasswordRoute = Route$62.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$71
});
var HelpRoute = Route$61.update({
	id: "/help",
	path: "/help",
	getParentRoute: () => Route$71
});
var HowItWorksRoute = Route$60.update({
	id: "/how-it-works",
	path: "/how-it-works",
	getParentRoute: () => Route$71
});
var LoginRoute = Route$59.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$71
});
var PricingRoute = Route$58.update({
	id: "/pricing",
	path: "/pricing",
	getParentRoute: () => Route$71
});
var PrivacyRoute = Route$57.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$71
});
var ResetPasswordRoute = Route$56.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$71
});
var SignupRoute = Route$55.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$71
});
var TermsRoute = Route$54.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$71
});
var UnsubscribeRoute = Route$53.update({
	id: "/unsubscribe",
	path: "/unsubscribe",
	getParentRoute: () => Route$71
});
var VerifyEmailRoute = Route$52.update({
	id: "/verify-email",
	path: "/verify-email",
	getParentRoute: () => Route$71
});
var AuthenticatedAchievementsRoute = Route$51.update({
	id: "/achievements",
	path: "/achievements",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedBookmarksRoute = Route$50.update({
	id: "/bookmarks",
	path: "/bookmarks",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCommunityRoute = Route$49.update({
	id: "/community",
	path: "/community",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$48.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedExamSimulatorRoute = Route$47.update({
	id: "/exam-simulator",
	path: "/exam-simulator",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFlashcardsRoute = Route$46.update({
	id: "/flashcards",
	path: "/flashcards",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLibraryRoute = Route$45.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMistakesBankRoute = Route$44.update({
	id: "/mistakes-bank",
	path: "/mistakes-bank",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMyCertificatesRoute = Route$43.update({
	id: "/my-certificates",
	path: "/my-certificates",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMyCoursesRoute = Route$42.update({
	id: "/my-courses",
	path: "/my-courses",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedNotificationsRoute = Route$41.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedReferralsRoute = Route$40.update({
	id: "/referrals",
	path: "/referrals",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedScheduleRoute = Route$39.update({
	id: "/schedule",
	path: "/schedule",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSettingsRoute = Route$38.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSystemModulesRoute = Route$37.update({
	id: "/system-modules",
	path: "/system-modules",
	getParentRoute: () => AuthenticatedRouteRoute
});
var BlogSlugRoute = Route$36.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => BlogRoute
});
var CertificateIdRoute = Route$35.update({
	id: "/certificate/$id",
	path: "/certificate/$id",
	getParentRoute: () => Route$71
});
var InviteCodeRoute = Route$34.update({
	id: "/invite/$code",
	path: "/invite/$code",
	getParentRoute: () => Route$71
});
var TeacherIdRoute = Route$33.update({
	id: "/teacher/$id",
	path: "/teacher/$id",
	getParentRoute: () => Route$71
});
var TeacherRegisterRoute = Route$32.update({
	id: "/teacher/register",
	path: "/teacher/register",
	getParentRoute: () => Route$71
});
var AuthenticatedAdminBackendPermissionsRoute = Route$31.update({
	id: "/admin/backend-permissions",
	path: "/admin/backend-permissions",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminCommunityReportsRoute = Route$30.update({
	id: "/admin/community-reports",
	path: "/admin/community-reports",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminConstantsRoute = Route$29.update({
	id: "/admin/constants",
	path: "/admin/constants",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminContentReviewRoute = Route$28.update({
	id: "/admin/content-review",
	path: "/admin/content-review",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminCourseCatalogRoute = Route$27.update({
	id: "/admin/course-catalog",
	path: "/admin/course-catalog",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminCurriculumRoute = Route$26.update({
	id: "/admin/curriculum",
	path: "/admin/curriculum",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminCurriculumRequestsRoute = Route$25.update({
	id: "/admin/curriculum-requests",
	path: "/admin/curriculum-requests",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminDashboardRoute = Route$24.update({
	id: "/admin/dashboard",
	path: "/admin/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminPagesRoute = Route$23.update({
	id: "/admin/pages",
	path: "/admin/pages",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminPaymentsRoute = Route$22.update({
	id: "/admin/payments",
	path: "/admin/payments",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminPermissionsRoute = Route$21.update({
	id: "/admin/permissions",
	path: "/admin/permissions",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminRolesRoute = Route$20.update({
	id: "/admin/roles",
	path: "/admin/roles",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminTeachersRoute = Route$19.update({
	id: "/admin/teachers",
	path: "/admin/teachers",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminUsersRoute = Route$18.update({
	id: "/admin/users",
	path: "/admin/users",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedParentReportRoute = Route$17.update({
	id: "/parent/report",
	path: "/parent/report",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedParentSettingsRoute = Route$16.update({
	id: "/parent/settings",
	path: "/parent/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRolePermissionsRoleIdRoute = Route$15.update({
	id: "/role-permissions/$roleId",
	path: "/role-permissions/$roleId",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSupervisorDashboardRoute = Route$14.update({
	id: "/supervisor/dashboard",
	path: "/supervisor/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSupervisorReportsRoute = Route$13.update({
	id: "/supervisor/reports",
	path: "/supervisor/reports",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSupervisorStudentsOverviewRoute = Route$12.update({
	id: "/supervisor/students-overview",
	path: "/supervisor/students-overview",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSupervisorTeachersRoute = Route$11.update({
	id: "/supervisor/teachers",
	path: "/supervisor/teachers",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherAnalyticsRoute = Route$10.update({
	id: "/teacher/analytics",
	path: "/teacher/analytics",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherCommunityRoute = Route$9.update({
	id: "/teacher/community",
	path: "/teacher/community",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherContentRoute = Route$8.update({
	id: "/teacher/content",
	path: "/teacher/content",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherCoursesRoute = Route$7.update({
	id: "/teacher/courses",
	path: "/teacher/courses",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherDashboardRoute = Route$6.update({
	id: "/teacher/dashboard",
	path: "/teacher/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherEarningsRoute = Route$5.update({
	id: "/teacher/earnings",
	path: "/teacher/earnings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherGradingRoute = Route$4.update({
	id: "/teacher/grading",
	path: "/teacher/grading",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherQuizzesRoute = Route$3.update({
	id: "/teacher/quizzes",
	path: "/teacher/quizzes",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherSettingsRoute = Route$2.update({
	id: "/teacher/settings",
	path: "/teacher/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLibraryLessonIdRoute = Route$1.update({
	id: "/lesson/$id",
	path: "/lesson/$id",
	getParentRoute: () => AuthenticatedLibraryRoute
});
var AuthenticatedTeacherProfileEditRoute = Route.update({
	id: "/teacher/profile/edit",
	path: "/teacher/profile/edit",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLibraryRouteChildren = { AuthenticatedLibraryLessonIdRoute };
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAchievementsRoute,
	AuthenticatedBookmarksRoute,
	AuthenticatedCommunityRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedExamSimulatorRoute,
	AuthenticatedFlashcardsRoute,
	AuthenticatedLibraryRoute: AuthenticatedLibraryRoute._addFileChildren(AuthenticatedLibraryRouteChildren),
	AuthenticatedMistakesBankRoute,
	AuthenticatedMyCertificatesRoute,
	AuthenticatedMyCoursesRoute,
	AuthenticatedNotificationsRoute,
	AuthenticatedReferralsRoute,
	AuthenticatedScheduleRoute,
	AuthenticatedSettingsRoute,
	AuthenticatedSystemModulesRoute,
	AuthenticatedAdminBackendPermissionsRoute,
	AuthenticatedAdminCommunityReportsRoute,
	AuthenticatedAdminConstantsRoute,
	AuthenticatedAdminContentReviewRoute,
	AuthenticatedAdminCourseCatalogRoute,
	AuthenticatedAdminCurriculumRoute,
	AuthenticatedAdminCurriculumRequestsRoute,
	AuthenticatedAdminDashboardRoute,
	AuthenticatedAdminPagesRoute,
	AuthenticatedAdminPaymentsRoute,
	AuthenticatedAdminPermissionsRoute,
	AuthenticatedAdminRolesRoute,
	AuthenticatedAdminTeachersRoute,
	AuthenticatedAdminUsersRoute,
	AuthenticatedParentReportRoute,
	AuthenticatedParentSettingsRoute,
	AuthenticatedRolePermissionsRoleIdRoute,
	AuthenticatedSupervisorDashboardRoute,
	AuthenticatedSupervisorReportsRoute,
	AuthenticatedSupervisorStudentsOverviewRoute,
	AuthenticatedSupervisorTeachersRoute,
	AuthenticatedTeacherAnalyticsRoute,
	AuthenticatedTeacherCommunityRoute,
	AuthenticatedTeacherContentRoute,
	AuthenticatedTeacherCoursesRoute,
	AuthenticatedTeacherDashboardRoute,
	AuthenticatedTeacherEarningsRoute,
	AuthenticatedTeacherGradingRoute,
	AuthenticatedTeacherQuizzesRoute,
	AuthenticatedTeacherSettingsRoute,
	AuthenticatedTeacherProfileEditRoute
};
var AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
var BlogRouteChildren = { BlogSlugRoute };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
	R403Route,
	AboutRoute,
	BlogRoute: BlogRoute._addFileChildren(BlogRouteChildren),
	ContactRoute,
	CoursesRoute,
	ForTeachersRoute,
	ForgotPasswordRoute,
	HelpRoute,
	HowItWorksRoute,
	LoginRoute,
	PricingRoute,
	PrivacyRoute,
	ResetPasswordRoute,
	SignupRoute,
	TermsRoute,
	UnsubscribeRoute,
	VerifyEmailRoute,
	CertificateIdRoute,
	InviteCodeRoute,
	TeacherIdRoute,
	TeacherRegisterRoute
};
var routeTree = Route$71._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { description$25 as A, blogPosts as B, description$18 as C, description$22 as D, description$21 as E, Route$52 as F, currentUserHome as I, EmptyIllustration as L, description$27 as M, description$28 as N, description$23 as O, description$29 as P, ForbiddenIllustration as R, Route$36 as S, description$20 as T, getBlogPost as V, description$15 as _, description$4 as a, Route$34 as b, description$7 as c, description$10 as d, description$11 as f, Route$15 as g, description$14 as h, description$3 as i, description$26 as j, description$24 as k, description$8 as l, description$13 as m, description as n, description$5 as o, description$12 as p, description$2 as r, description$6 as s, router_exports as t, description$9 as u, description$16 as v, description$19 as w, Route$35 as x, Route$33 as y, WelcomeIllustration as z };
