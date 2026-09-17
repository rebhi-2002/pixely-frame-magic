# Environment Variables

| المتغير                         | الاستخدام                                                                  |          حساس؟ | مثال                                                |
| ------------------------------- | -------------------------------------------------------------------------- | -------------: | --------------------------------------------------- |
| `VITE_API_BASE_URL`             | أصل API بدون `/api`                                                        |             لا | `https://ziadkamalaln2842-001-site1.etempurl.com`   |
| `VITE_ENABLE_DEMO_LOGIN`        | تفعيل الديمو في DEV فقط                                                    |             لا | `false`                                             |
| `NITRO_PRESET`                  | مخرجات الاستضافة                                                           |             لا | `vercel` أو `netlify`                               |
| `VITE_SENTRY_DSN`               | تتبّع الأخطاء (اختياري — DSN المشروع مضمّن كـfallback آمن بالكود)          |             لا | `https://...@...ingest.de.sentry.io/...`            |
| `VITE_POSTHOG_KEY`              | تتبّع الاستخدام (اختياري) — **Project API Key العام**، مو مفتاح إداري سرّي |             لا | `phc_...`                                           |
| `VITE_POSTHOG_HOST`             | منطقة سيرفر PostHog                                                        |             لا | `https://eu.i.posthog.com`                          |
| `SENTRY_AUTH_TOKEN`             | رفع source maps وقت البناء فقط — بدونه البلوجن ما بينضاف إطلاقًا           | **نعم — سرّي** | لا تضعه بـ`.env` مرفوع لأي مكان عام                 |
| `SENTRY_ORG` / `SENTRY_PROJECT` | تحديد مشروع Sentry لرفع source maps                                        |             لا | `voidunemployed` / `javascript-tanstackstart-react` |

أي `VITE_*` يصل إلى المتصفح. لا تضع password أو token أو connection string داخله. استخدم Environment Variables في Vercel/Netlify، واحتفظ بـ`.env.example` دون أسرار.
