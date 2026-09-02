# Deployment and Release

في Vercel استخدم `NITRO_PRESET=vercel`، وفي Netlify استخدم `NITRO_PRESET=netlify` وفق إعداد المشروع. عرّف `VITE_API_BASE_URL` في بيئة الاستضافة، وتأكد أن origin الفرونت موجود في CORS وأن cookie تعمل عبر HTTPS.

قبل الإصدار: نظافة Git، lint، build، عدم وجود secrets، smoke test للصفحة العامة وLogin وLogout وauthenticated route. كل إصدار مرتبط بـcommit، ويمكن الرجوع إلى آخر إصدار مستقر.
