# Frontend Testing Strategy

**محدَّث 14 سبتمبر 2026:** Vitest (unit/integration) وPlaywright (E2E) مُعتمَدان فعليًا (`npm test` / `npm run test:e2e`)، مربوطان بـCI. التغطية الحالية **محدودة جدًا** — تيست وحدة واحد حقيقي (`src/lib/bi.test.ts`، بيقفل باگ role-mapping حرج) وتيست E2E دخان واحد (صفحة الدخول). هدف Vitest config: `jsdom` + React Testing Library، مُستثنى عن `vite.config.ts` الرئيسي عمدًا (بلوجن TanStack Start مش مصمَّم لبيئة اختبار).

يجب اختبار Login/Logout والـroute guard وحالات 401، إدارة المستخدمين، loading/error/empty، mobile menu، وRTL/LTR — **لسا معظمها بدون تغطية فعلية**، هالبند يستاهل جولة مخصصة.

لا تثبت نسبة coverage — ابدأ بتغطية كاملة للـauth/API utilities وsmoke coverage للمسارات الحرجة (تسجيل دخول/تسجيل/محفظة)، ثم ارفع الحد تدريجيًا.
