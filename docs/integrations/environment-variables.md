# Environment Variables

| المتغير | الاستخدام | حساس؟ | مثال |
|---|---|---:|---|
| `VITE_API_BASE_URL` | أصل API بدون `/api` | لا | `https://ziadkamalaln2842-001-site1.etempurl.com` |
| `VITE_ENABLE_DEMO_LOGIN` | تفعيل الديمو في DEV فقط | لا | `false` |
| `NITRO_PRESET` | مخرجات الاستضافة | لا | `vercel` أو `netlify` |

أي `VITE_*` يصل إلى المتصفح. لا تضع password أو token أو connection string داخله. استخدم Environment Variables في Vercel/Netlify، واحتفظ بـ`.env.example` دون أسرار.
