export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  /** العنوان بالإنجليزية — يُستخدم في نسخة EN من الموقع. */
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  category: string;
  categoryEn: string;
  readMinutes: number;
  publishedAt: string; // YYYY-MM-DD
  body: BlogBlock[];
  /** نص المقال بالإنجليزية (ترجمة بالمعنى، لا حرفية) — يُستخدم في نسخة EN. */
  bodyEn: BlogBlock[];
};

/**
 * مقالات المدونة — محتوى أصلي كتبته أكاديميا لطلاب الثانوية العامة.
 * لا يعتمد على مكتبة Markdown؛ كل مقال مصفوفة "بلوكات" مطبوعة عبر BlogRenderer.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "study-schedule-that-holds",
    title: "جدول المذاكرة الذي يصمد، لا الذي يبدو جميلاً على الورق",
    titleEn: "A study schedule that actually holds, not one that looks good on paper",
    excerpt:
      "تنهار أغلب جداول المذاكرة في اليوم الثالث. المشكلة ليست فيك، بل في أنك تبني الجدول على الوقت المتاح لا على طاقتك الفعلية. إليك كيف تبني جدولاً تلتزم به.",
    excerptEn:
      "Most study schedules break on day three. The problem isn't you — you built the plan around available hours instead of your real energy. Here's how to build one you'll stick to.",
    category: "تنظيم الوقت",
    categoryEn: "Time management",
    readMinutes: 6,
    publishedAt: "2026-06-02",
    body: [
      {
        type: "p",
        text: "كل سنة، يجلس تقريباً كل طالب قبل الامتحانات بأسبوعين ويرسم جدول مذاكرة مثالياً: من الثامنة صباحاً حتى الثامنة مساءً، لكل مادة ساعتان، وبينها استراحة ربع ساعة. وبعد يومين أو ثلاثة يتحول هذا الجدول إلى ورقة منسية في الدرج. ليس لأنك كسول، ولا لأنك بلا إرادة. المشكلة أنك بنيت الجدول على افتراض خاطئ: أنك آلة تعمل بالكفاءة نفسها من الصباح حتى المساء.",
      },
      {
        type: "p",
        text: "الحقيقة أن تركيزك ليس ثابتاً طوال اليوم. هناك ساعات تكون فيها في قمة صفائك الذهني، وأخرى تقرأ فيها السطر نفسه عشر مرات دون أن يدخل شيء. فالخطوة الأولى الصحيحة ليست وضع جدول، بل أن تراقب نفسك أسبوعاً كاملاً دون أي التزام، وتلاحظ: متى تشعر بأنك يقظ وقادر على التركيز؟ ومتى تشعر بالتعب حتى لو نمت جيداً؟",
      },
      { type: "h2", text: "قاعدة الساعتين الأوليين" },
      {
        type: "p",
        text: "أول ساعتين من جلسة المذاكرة — أي جلسة، لا الصباحية فقط — هما الأعلى إنتاجية. فيهما تستطيع أن تفهم مفهوماً جديداً صعباً، أو تحل مسائل معقدة، أو تراجع مادة تحتاج إلى تركيز عالٍ كالفيزياء والكيمياء. وبعد الساعتين ينخفض التركيز تدريجياً. فبدل أن تضع أصعب مادة في آخر اليوم حين تكون طاقتك قد نفدت، اعكس الترتيب: ابدأ بالمادة التي تخيفك أكثر.",
      },
      {
        type: "p",
        text: "وهكذا تتخلص أيضاً من أكبر عبء نفسي في بداية الجلسة، ويصبح بقية اليوم أخف لأنك أنجزت ما كان يثقل رأسك منذ الصباح.",
      },
      { type: "h2", text: "بلوكات لا ساعات" },
      {
        type: "p",
        text: 'بدل أن تقول "من الرابعة إلى السادسة كيمياء"، فكّر بـ"بلوكات": البلوك = 50 دقيقة مذاكرة + 10 دقائق استراحة حقيقية (قم، امشِ، اشرب ماء — لا تفتح الهاتف، فهذه ليست استراحة بل بداية تشتّت يستغرق ساعة أخرى). أربعة بلوكات في اليوم تعني ساعتين و40 دقيقة من المذاكرة الفعلية المركّزة، وهذا أكثر بكثير من ست ساعات "مذاكرة" نصفها شرود.',
      },
      {
        type: "list",
        items: [
          "حدّد عدد البلوكات الواقعي الذي تستطيع الالتزام به يومياً — من 3 إلى 5 تكفي تماماً",
          "خصّص البلوك الأول دائماً للمادة الأصعب أو التي تؤجّلها",
          "بعد كل بلوكين، خذ استراحة أطول (20-30 دقيقة) لا 10 دقائق فقط",
          "سجّل في آخر اليوم: كم بلوكاً أنهيت فعلاً؟ هذا هو الرقم الصادق، لا الجدول",
        ],
      },
      { type: "h2", text: "اليوم الذي ينكسر فيه الجدول — وهذا طبيعي" },
      {
        type: "p",
        text: 'سيأتي يوم لا تستطيع فيه متابعة الخطة. تأخرت، أو طرأ أمر عائلي، أو أنت ببساطة متعب. هنا يقع الطلاب في أكبر أخطائهم: يشعرون أن "الخطة فسدت" فيتركونها بالكامل. الجدول الصحيح ليس الذي لا ينكسر، بل الذي فيه مساحة لليوم الذي ينكسر فيه. خصّص يوماً في الأسبوع — الجمعة مثلاً — "يوماً احتياطياً" بلا مادة محددة، لتعويض أي بلوك فاتك.',
      },
      {
        type: "quote",
        text: "الجدول أداة تساعدك على الالتزام، لا عقد يجب أن تنفّذه حرفياً. حين تشعر أنه صار عبئاً بدل أن يكون عوناً، فهذا مؤشر على أنك تحتاج إلى تبسيطه، لا على أنك فاشل.",
      },
    ],
    bodyEn: [
      {
        type: "p",
        text: "Every year, nearly every student sits down a couple of weeks before exams and draws up the perfect study schedule: 8 a.m. to 8 p.m., two hours per subject, a fifteen-minute break in between. Two or three days later, that schedule is a forgotten sheet of paper at the bottom of a drawer. Not because you're lazy, and not because you lack willpower. The problem is that you built it on a wrong assumption: that you're a machine that runs at the same efficiency from morning to night.",
      },
      {
        type: "p",
        text: "The truth is your focus isn't constant through the day. There are hours when your mind is at its sharpest, and others when you read the same line ten times and nothing sinks in. So the first right step isn't making a schedule. It's watching yourself for a full week with no commitments: when do you feel alert and able to concentrate? When do you feel drained even after a good night's sleep?",
      },
      {
        type: "h2",
        text: "The two-hour rule",
      },
      {
        type: "p",
        text: "The first two hours of any study session — not just the morning ones — are your most productive. That's when you can grasp a hard new concept, work through complex problems, or review material that needs real concentration, like physics or chemistry. After those two hours, your focus slowly fades. So instead of leaving the hardest subject for the end of the day, when you're running on empty, flip it: start with the subject you dread most.",
      },
      {
        type: "p",
        text: "You also get the biggest mental weight off your shoulders at the start of the session, and the rest of the day feels lighter because the thing that's been nagging at you since morning is already done.",
      },
      {
        type: "h2",
        text: "Blocks, not hours",
      },
      {
        type: "p",
        text: 'Instead of saying "4 to 6, chemistry," think in blocks: one block is 50 minutes of study plus a real 10-minute break (stand up, walk around, drink some water — and no phone, because that\'s not a break, that\'s the start of another hour of distraction). Four blocks a day gives you two hours and 40 minutes of truly focused study, which is far more than six hours of "studying" where half the time you\'re zoning out.',
      },
      {
        type: "list",
        items: [
          "Pick a realistic number of blocks you can stick to every day — 3 to 5 is plenty",
          "Always give the first block to your hardest subject, or the one you've been putting off",
          "After every two blocks, take a longer break (20–30 minutes), not just 10",
          "At the end of the day, write down how many blocks you actually finished. That's your honest number — not the schedule",
        ],
      },
      {
        type: "h2",
        text: "The day your schedule breaks — and that's normal",
      },
      {
        type: "p",
        text: "There will be a day you can't keep up with the plan. You ran late, something came up with family, or you're simply exhausted. This is where students make their biggest mistake: they feel the plan is ruined and drop it completely. A good schedule isn't one that never breaks. It's one with room for the day it does. Set aside one day a week — Friday, say — as a \"buffer day\" with no fixed subject, just to catch up on any block you missed.",
      },
      {
        type: "quote",
        text: "A schedule is a tool to help you stay consistent, not a contract to follow to the letter. When it starts to feel like a burden instead of a help, that's a sign you need to simplify it — not that you're failing.",
      },
    ],
  },
  {
    slug: "active-recall-vs-rereading",
    title: "لماذا لا تثبّت إعادة قراءة الدرس مرتين المعلومة، بينما يثبّتها الاستدعاء النشط",
    titleEn: "Why rereading a lesson twice doesn't stick, but active recall does",
    excerpt:
      "تشعر أنك تفهم وأنت تقرأ، ثم تنسى وقت الامتحان؟ هذه أشهر خدعة يمارسها دماغك عليك. وهناك طريقة أثبتت علمياً أنها أقوى بكثير — وهي أبسط مما تتخيل.",
    excerptEn:
      "Rereading feels productive and teaches you almost nothing. Active recall feels hard and is what actually moves knowledge into long-term memory.",
    category: "أساليب المذاكرة",
    categoryEn: "Study methods",
    readMinutes: 7,
    publishedAt: "2026-06-18",
    body: [
      {
        type: "p",
        text: 'جرّب هذه التجربة البسيطة: اقرأ فقرة من كتاب الأحياء مرتين متتاليتين بتركيز كامل. من المؤكد أنك ستشعر بعدها أنك "فاهم" الموضوع جيداً. لكن أغلق الكتاب الآن وحاول أن تكتب ما فهمته من ذاكرتك فقط، دون أن تنظر إلى الصفحة. غالباً ستلاحظ أن ما استطعت استرجاعه أقل بكثير من الإحساس الذي كان عندك وأنت تقرأ.',
      },
      {
        type: "p",
        text: 'هذا ما يسمى "وهم الطلاقة" (Fluency Illusion). حين تعيد قراءة النص نفسه يتعرّف دماغك على الكلمات أسرع في كل مرة، وتشعر بهذه السرعة على أنها "فهم". لكن التعرّف على المعلومة (recognition) شيء، واسترجاعها دون مساعدة (recall) شيء آخر تماماً. والامتحان يطلب منك recall، لا recognition.',
      },
      { type: "h2", text: "الاستدعاء النشط: دع دماغك يعمل، لا يقرأ فقط" },
      {
        type: "p",
        text: 'الاستدعاء النشط (Active Recall) يعني أن تُجبر نفسك على إخراج المعلومة من ذاكرتك بدل إعادة قراءتها. فبدل أن تقرأ تعريف "التنفس الخلوي" عشر مرات، اقرأه مرة واحدة جيداً، ثم أغلق الكتاب واسأل نفسك: "ما هو التنفس الخلوي؟ أين يحدث؟ ماذا ينتج؟" وحاول أن تجيب بصوت عالٍ أو كتابةً. وإن لم تستطع الإجابة كاملة، افتح الكتاب من جديد — لكن بعد المحاولة، لا قبلها.',
      },
      {
        type: "p",
        text: "تشعر بهذه الطريقة أنها أصعب من القراءة، وهي فعلاً أصعب — لأنها تشغّل دماغك فعلياً بدل أن تتركه يمرّ سلبياً فوق الكلمات. وهذه الصعوبة بالذات هي ما يجعل المعلومة تثبت. وفي كل مرة تحاول فيها استرجاع معلومة وتنجح (أو حتى تحاول وتفشل ثم ترى الجواب)، تقوّي الرابط العصبي المسؤول عنها.",
      },
      { type: "h2", text: "كيف تطبّقها دون أدوات معقدة" },
      {
        type: "list",
        items: [
          "بعد كل درس، أغلق الكتاب واكتب من ذاكرتك أهم 5 نقاط فيه — دون النظر",
          "حوّل كل عنوان فرعي في الدرس إلى سؤال، وأجب عنه دون العودة إلى النص",
          "اشرح الدرس لشخص آخر (أو حتى لنفسك بصوت عالٍ) كأنك تعلّمه لأول مرة",
          "بعد يوم أو يومين، عُد واسأل الأسئلة نفسها دون مراجعة الدرس قبلها",
        ],
      },
      { type: "h2", text: "لماذا بنك الأخطاء أداة قوية هنا بالذات" },
      {
        type: "p",
        text: "في كل مرة تحاول فيها استرجاع معلومة وتخطئ، فهذا ليس فشلاً — بل هي اللحظة التي يتعلم فيها دماغك أكثر من أي وقت. المشكلة أن أغلب الطلاب بمجرد أن يخطئوا في سؤال، ينظرون إلى الجواب الصحيح ويكملون، دون أن يسجّلوا أين أخطأوا ولماذا. وبعد أسبوعين يخطئون في النقطة نفسها بالضبط. أما لو سجّلت كل خطأ في مكان واحد وعدت إليه بعد يومين أو ثلاثة، فسترى أن أغلب أخطائك تتكرر حول المفاهيم نفسها، وهي 3 أو 4 مفاهيم — وهذه بالضبط ما يجب أن تركّز عليه في آخر أسبوعين قبل الامتحان.",
      },
      {
        type: "quote",
        text: "الشعور بالصعوبة وأنت تحاول التذكّر ليس علامة على ضعفك في المادة. إنه علامة على أنك تذاكر بالطريقة الصحيحة.",
      },
    ],
    bodyEn: [
      {
        type: "p",
        text: "Try this simple experiment: read a paragraph from your biology book twice in a row, with full focus. You'll almost certainly feel you understand it well. Now close the book and try to write down what you understood from memory alone, without looking at the page. Most likely you'll find you can recall far less than the confidence you felt while reading.",
      },
      {
        type: "p",
        text: 'This is called the "fluency illusion." When you reread the same text, your brain recognizes the words faster each time, and that speed feels like understanding. But recognizing information and recalling it without help are two completely different things — and the exam asks you to recall, not to recognize.',
      },
      {
        type: "h2",
        text: "Active recall: make your brain work, not just read",
      },
      {
        type: "p",
        text: 'Active recall means forcing yourself to pull information out of your memory instead of rereading it. Rather than reading the definition of "cellular respiration" ten times, read it once, properly, then close the book and ask yourself: "What is cellular respiration? Where does it happen? What does it produce?" Answer out loud or on paper. If you can\'t answer fully, open the book again — but only after you\'ve tried, not before.',
      },
      {
        type: "p",
        text: "It feels harder than reading, and it is harder — because it makes your brain actually work instead of drifting passively over the words. That difficulty is exactly what makes the information stick. Every time you try to retrieve something and succeed (or even try and fail, then check the answer), you strengthen the neural connection behind it.",
      },
      {
        type: "h2",
        text: "How to do it without any fancy tools",
      },
      {
        type: "list",
        items: [
          "After each lesson, close the book and write the 5 most important points from memory — no peeking",
          "Turn every subheading in the lesson into a question and answer it without looking at the text",
          "Explain the lesson to someone else (or even to yourself, out loud) as if you were teaching it for the first time",
          "A day or two later, ask yourself the same questions again without reviewing the lesson first",
        ],
      },
      {
        type: "h2",
        text: "Why a mistake bank is especially powerful here",
      },
      {
        type: "p",
        text: "Every time you try to recall something and get it wrong, that isn't failure — it's exactly the moment your brain learns the most. The problem is that most students, as soon as they get a question wrong, look at the right answer and move on, without noting where they went wrong and why. Two weeks later they make the exact same mistake again. If you logged every mistake in one place and came back to it two or three days later, you'd notice most of your errors cluster around the same 3 or 4 concepts — and those are exactly what you should focus on in the last two weeks before the exam.",
      },
      {
        type: "quote",
        text: "Struggling to remember is not a sign you're weak at the subject. It's a sign you're studying the right way.",
      },
    ],
  },
  {
    slug: "studying-a-subject-you-hate",
    title: "مادة تكرهها لكن لا بد أن تذاكرها؟ إليك كيف تتحمّلها حتى نهاية السنة",
    titleEn: "A subject you hate but still have to study? Here's how to survive it",
    excerpt:
      "لكل طالب مادة يشعر تجاهها وكأنه أمام جدار. لا يلزم أن تحبها لتنجح فيها، لكن يلزم أن تغيّر طريقة تعاملك معها. إليك خطوات عملية جرّبها طلاب كثيرون قبلك.",
    excerptEn:
      "You don't need to love the subject. You need a system that gets you through it without wrecking the rest of your schedule.",
    category: "الجانب النفسي",
    categoryEn: "Mindset",
    readMinutes: 5,
    publishedAt: "2026-07-05",
    body: [
      {
        type: "p",
        text: "هناك مادة — عند كل طالب تقريباً — يشعر بثقل في صدره بمجرد أن يفتح كتابها. وأنت بالتأكيد لديك هذه المادة، وقد تكون الفيزياء أو النحو أو الكيمياء العضوية. المشكلة أن هذه المادة غالباً ما تُؤجَّل يوماً بعد يوم حتى تصبح أكبر من حجمها الحقيقي، وتتحول إلى مصدر توتر دائم حتى وأنت لا تذاكرها.",
      },
      { type: "h2", text: "الخبر الجيد: لا يلزم أن تحبها" },
      {
        type: "p",
        text: 'هناك نصيحة شائعة تقول "يجب أن تحب المادة لتنجح فيها"، وهي نصيحة غير دقيقة. نجح كثيرون وتفوّقوا في مواد لم يحبوها أبداً، لأنهم غيّروا علاقتهم بها من "عاطفة" إلى "مهمة". لا يلزمك أن تحب النحو، لكن تستطيع أن تتعامل معه كنظام قواعد له منطقه، وتحلّ فيه كما تحلّ لغزاً — دون أن تحمّله مشاعر سلبية زائدة.',
      },
      { type: "h2", text: "قسّمها إلى أصغر ما يمكن" },
      {
        type: "p",
        text: 'أكبر سبب لتأجيل المادة التي تكرهها أنك تفكر فيها كـ"كتلة واحدة كبيرة": "يجب أن أذاكر الكيمياء" — وهذه جملة مخيفة ومبهمة في آن واحد، فيهرب دماغك منها. استبدل بها مهمة صغيرة محددة جداً: "الآن سأفهم فقط معادلة الاتزان الكيميائي، لا أكثر". حين تكون المهمة صغيرة وواضحة، تنخفض مقاومة البدء كثيراً.',
      },
      { type: "h2", text: "غيّر البيئة والوقت" },
      {
        type: "p",
        text: "إن كنت تؤجّل المادة نفسها دائماً إلى آخر الجلسة (أو آخر اليوم)، فجرّب أن تقلب الترتيب لأسبوع كامل: اجعلها أول ما تذاكره وطاقتك في أعلى مستوياتها، لا آخر ما تذاكره وقد نفدت طاقتك. وجرّب كذلك أن تغيّر مكان مذاكرتها تحديداً — فإن كنت تذاكرها دائماً في غرفتك وتشعر بضيق، فخذها إلى المطبخ أو إلى مكان آخر في البيت. أحياناً يربط الدماغ مكاناً معيّناً بشعور سلبي متراكم.",
      },
      { type: "h2", text: "كافئ نفسك — بذكاء" },
      {
        type: "p",
        text: "لا يلزم أن تكون المكافأة كبيرة. بعد أن تنهي بلوك مذاكرة كاملاً في المادة التي تكرهها، اسمح لنفسك بـ15 دقيقة مع ما تحبه فعلاً — ليس الهاتف عموماً (لأنه يصبح مصدر تشتيت لبقية اليوم)، بل شيئاً محدداً ومريحاً: أغنية، أو مقطع فيديو قصير، أو حتى قهوة خارج الغرفة.",
      },
      {
        type: "list",
        items: [
          'حدّد مهمة صغيرة جداً بدل "أذاكر المادة كلها"',
          "غيّر ترتيب المادة في جدولك — اجعلها أول شيء لا آخر شيء",
          "جرّب مكان مذاكرة مختلفاً لهذه المادة تحديداً",
          'كافئ نفسك مباشرة بعد كل بلوك، لا بعد "أن أنهي المنهاج كله"',
        ],
      },
      {
        type: "quote",
        text: 'لن يقول لك أحد "شكراً لأنك أحببت المادة" يوم النتيجة. لكنك ستشكر نفسك لأنك لم تهرب منها.',
      },
    ],
    bodyEn: [
      {
        type: "p",
        text: "There's a subject — for almost every student — that makes your chest tighten the moment you open the book. You have one, I'm sure: maybe physics, maybe grammar, maybe organic chemistry. The trouble is that this subject gets pushed back day after day until it looms far larger than it really is, and becomes a constant source of stress even when you're not studying it.",
      },
      {
        type: "h2",
        text: "The good news: you don't have to like it",
      },
      {
        type: "p",
        text: "A common piece of advice says \"you have to love a subject to succeed in it,\" and that's not accurate. Plenty of people have passed and even excelled in subjects they never liked, because they changed their relationship with the subject from an emotion into a task. You don't have to love Arabic grammar, but you can treat it as a system of rules with its own logic and work through it like a puzzle — without loading it with extra negative feelings.",
      },
      {
        type: "h2",
        text: "Break it down as small as you can",
      },
      {
        type: "p",
        text: 'The biggest reason you put off a subject you hate is that you think of it as one huge block: "I have to study chemistry" — a scary and vague sentence at the same time, so your brain runs from it. Replace it with a small, very specific task: "Right now I\'ll just understand the chemical equilibrium equation, nothing more." When the task is small and clear, the resistance to starting drops a lot.',
      },
      {
        type: "h2",
        text: "Change the setting and the timing",
      },
      {
        type: "p",
        text: "If you always leave the same subject for the end of the session (or the end of the day), try flipping the order for a full week: make it the first thing you study, while your energy is at its highest, not the last thing when you're spent. Try changing where you study it, too — if you always study it in your room and feel boxed in, take it to the kitchen or somewhere else in the house. The brain sometimes ties a particular place to a build-up of negative feeling.",
      },
      {
        type: "h2",
        text: "Reward yourself — smartly",
      },
      {
        type: "p",
        text: "It doesn't have to be a big reward. After finishing a full study block on the subject you hate, give yourself 15 minutes of something you genuinely enjoy — not the phone in general (that turns into a distraction for the rest of the day), but something specific and relaxing: a song, a short video, or even a coffee outside your room.",
      },
      {
        type: "list",
        items: [
          'Pick one very small task instead of "study the whole subject"',
          "Change where the subject sits in your schedule — first, not last",
          "Try a different study spot for this subject in particular",
          'Reward yourself right after each block, not after "I finish the whole syllabus"',
        ],
      },
      {
        type: "quote",
        text: 'Nobody will say "thanks for liking the subject" on results day. But you\'ll thank yourself for not running away from it.',
      },
    ],
  },
  {
    slug: "mistake-bank",
    title: "بنك الأخطاء: أذكى أداة مذاكرة موجودة، وأغلب الطلاب لا يستخدمونها",
    titleEn: "The mistake bank: the smartest study tool out there, and most students skip it",
    excerpt:
      "ليست كل مراجعة بالقيمة نفسها. المراجعة العامة تأخذ وقتاً وتعطي فائدة قليلة، بينما ورقة صغيرة فيها أخطاؤك الفعلية توفّر عليك أسابيع من التخبّط. إليك كيف تبنيها من الصفر.",
    excerptEn:
      "Every wrong answer is a precise map of what you don't know yet. Logging mistakes turns them into your highest-return revision list.",
    category: "أساليب المذاكرة",
    categoryEn: "Study methods",
    readMinutes: 6,
    publishedAt: "2026-07-22",
    body: [
      {
        type: "p",
        text: 'حين تحلّ نموذج امتحان وتخطئ في سؤال، ماذا تفعل عادةً؟ أغلب الطلاب ينظرون إلى الجواب الصحيح، ويقولون "آه صحيح، فهمت"، ويكملون إلى السؤال التالي. وبعد أسبوعين يحلّون نموذجاً آخر، ويخطئون في النقطة نفسها بالضبط — أحياناً في السؤال نفسه تقريباً. المشكلة ليست أنهم لم يفهموا، بل أنه لا يوجد نظام يذكّرهم بما أخطأوا فيه قبل أن ينسوه.',
      },
      { type: "h2", text: "لماذا المراجعة العامة لا تكفي" },
      {
        type: "p",
        text: "حين تراجع المنهاج كله من أوله إلى آخره قبل الامتحان، فأنت تصرف وقتاً متساوياً على أشياء تتقنها أصلاً وأشياء أنت ضعيف فيها فعلاً. فلو كان عندك 10 دروس وأنت متقن 7 منها وضعيف في 3، فالمراجعة العامة تعطي الدروس العشرة الوقت نفسه. أما بنك الأخطاء فيقلب المعادلة: يُريك بالضبط أين نقاط ضعفك الحقيقية، فتركّز 80% من وقتك على الـ20% التي تسبّب لك المشاكل فعلاً.",
      },
      { type: "h2", text: "كيف تبنيه — حتى دون أي أداة إلكترونية" },
      {
        type: "p",
        text: "خصّص دفتراً صغيراً أو حتى ملفاً بسيطاً. في كل مرة تخطئ في سؤال — في واجب، أو نموذج امتحان، أو أثناء المذاكرة — سجّل ثلاث معلومات فقط: السؤال (أو ملخصاً عنه)، ولماذا أخطأت بالضبط (نسيت القانون؟ فهمت السؤال خطأً؟ خطأ حسابي؟)، والجواب الصحيح مع تفسير قصير.",
      },
      {
        type: "p",
        text: 'الجزء الأهم هو خانة "لماذا أخطأت" — لأنها تُريك النمط. فإن لاحظت أن أغلب أخطائك في مادة معينة سببها "فهمت السؤال خطأً" لا "لا أعرف المعلومة"، فهذا يعني أنك تحتاج إلى التدرّب على قراءة الأسئلة أكثر مما تحتاج إلى مراجعة المحتوى. وهذه معلومة لن تصل إليها من مراجعة عادية.',
      },
      { type: "h2", text: "متى تعود إلى بنك الأخطاء" },
      {
        type: "list",
        items: [
          "بعد 3 أيام من تسجيل الخطأ لأول مرة — راجعه وانظر هل ما زلت تخطئ فيه",
          "قبل الامتحان بأسبوع — هذا وقتك الذهبي، راجع بنك الأخطاء كاملاً مرتين",
          "في ليلة الامتحان — بدل أن تفتح الكتاب كاملاً، افتح بنك أخطائك فقط",
        ],
      },
      {
        type: "p",
        text: 'قبل الامتحان بأسبوع، بدل أن تحاول "مراجعة كل شيء" وتُرهق نفسك، افتح بنك الأخطاء وانظر: ما الأنماط التي تكررت؟ ستلاحظ غالباً أن كل أخطائك تدور حول 4 أو 5 مفاهيم فقط، لا المنهاج كله. هذه المفاهيم الأربعة أو الخمسة هي بالضبط ما يجب أن يكون تركيزك الأخير.',
      },
      {
        type: "quote",
        text: "المراجعة الذكية ليست التي تأخذ وقتاً أطول، بل التي تعرف بالضبط أين تضع وقتك.",
      },
    ],
    bodyEn: [
      {
        type: "p",
        text: "When you work through a practice exam and get a question wrong, what do you usually do? Most students look at the right answer, say \"oh right, got it,\" and move on to the next question. Two weeks later they sit another practice exam and slip on exactly the same point — sometimes on almost the same question. The problem isn't that they didn't understand. The problem is that there's no system to remind them what they got wrong before they forget it.",
      },
      {
        type: "h2",
        text: "Why general revision isn't enough",
      },
      {
        type: "p",
        text: "When you go through the whole syllabus from start to finish before the exam, you spend equal time on things you've already mastered and things you're genuinely weak at. If you have 10 lessons and you've mastered 7 but are weak on 3, general revision gives all 10 the same time. A mistake bank flips the equation: it shows you exactly where your real weak spots are, so you can put 80% of your time into the 20% that actually causes you trouble.",
      },
      {
        type: "h2",
        text: "How to build one — even with no digital tools",
      },
      {
        type: "p",
        text: "Set aside a small notebook or even a simple file. Every time you get a question wrong — in homework, a practice exam, or even while studying — log just three things: the question (or a summary of it), exactly why you got it wrong (forgot the formula? misread the question? arithmetic slip?), and the right answer with a short explanation.",
      },
      {
        type: "p",
        text: "The most important part is the \"why I got it wrong\" column, because it shows you a pattern. If you notice most of your mistakes in a particular subject come from misreading the question rather than not knowing the material, it means you need to practice reading questions more than you need to review content. That's something you'd never find out from ordinary revision.",
      },
      {
        type: "h2",
        text: "When to go back to your mistake bank",
      },
      {
        type: "list",
        items: [
          "Three days after you first logged a mistake — review it and see if you still get it wrong",
          "A week before the exam — this is your golden time, go through the whole mistake bank twice",
          "The night before the exam — instead of opening the entire book, open only your mistake bank",
        ],
      },
      {
        type: "p",
        text: 'A week before the exam, instead of trying to "review everything" and stressing yourself out, open your mistake bank and look: what patterns keep repeating? You\'ll probably find nearly all your mistakes revolve around just 4 or 5 concepts, not the whole syllabus. Those 4 or 5 concepts are exactly what should get your final focus.',
      },
      {
        type: "quote",
        text: "Smart revision isn't the kind that takes longer. It's the kind that knows exactly where to put your time.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
