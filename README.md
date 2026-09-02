# Academia Frontend

واجهة منصة Academia التعليمية المبنية على React وTypeScript وVite وTanStack Router/Start.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

المتغير الأساسي هو `VITE_API_BASE_URL` ويجب أن يكون أصل الباك إند فقط، مثل `https://ziadkamalaln2842-001-site1.etempurl.com`.

## Commands

```bash
npm run dev
npm run lint
npm run build
```

## Documentation

ابدأ من [`docs/README.md`](docs/README.md). توثيق API وملفات Postman موجودة في [`docs/api/postman`](docs/api/postman)، وتوثيق حماية المسارات في [`docs/architecture/auth-and-route-protection.md`](docs/architecture/auth-and-route-protection.md).

## Current integration boundary

المصادقة وبعض عمليات المستخدمين والصفحات والثوابت والصلاحيات متاحة حاليًا. الكورسات والدروس والاختبارات والتسجيلات والشهادات والإشعارات تنتظر عقود API مكتملة. لا تعتبر UI guards أو localStorage حماية للخادم.
