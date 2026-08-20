# نظام التصميم

المصدر الوحيد: `src/styles.css`. **ممنوع** استخدام ألوان مباشرة في المكوّنات
(`text-white` / `bg-black` / `bg-[#...]`) — استخدم التوكنز الدلالية فقط.

## الهوية

- الوضع الافتراضي: **غامق** (Ink navy) مع دعم وضع نهاري ووضع تلقائي.
- الاتجاه الافتراضي: **RTL** عربي، مع نسخة إنجليزية LTR كاملة.

## الألوان (الوضع الغامق)

| التوكن | القيمة | الاستخدام |
| --- | --- | --- |
| `--ink-950 / 900 / 800` | `#0A0F1C` / `#0D1321` / `#141B2E` | الخلفية، القوائم، البطاقات |
| `--primary` | `#F0A62E` (أمبر «إنجاز») | الأزرار الأساسية، التمييز |
| `--success` | `#17A672` (إمرالد «إتقان») | حالات النجاح/الإتمام |
| `--info` / `--tools` | `#3E8EDE` | معلومات + رأس لوحة الأدوات |
| `--destructive` | `#E4573D` | الحذف والتحذير |
| `--foreground` | `#F3F1EA` | النص الأساسي |
| `--muted-foreground` | `#A6B0C3` | نص ثانوي |
| `--chart-1..5` | أمبر/إمرالد/أزرق/كورال/بنفسجي | الرسوم البيانية |
| `--sidebar*` | مشتقّة من ink-900 | القائمة الجانبية |

مقابل كل لون دلالي يوجد `*-foreground` مضبوط ليحقّق تباين WCAG AA
(مثلاً نص غامق على الأحمر بدل الفاتح: 5.23:1).

الوضع النهاري يعيد تعريف نفس التوكنز تحت `:root[data-theme="light"]`.

## الخطوط

| الدور | عربي | إنجليزي |
| --- | --- | --- |
| العناوين `font-display` | Tajawal | Reem Kufi |
| المتن `font-sans` | Cairo | Cairo |
| تقني `font-mono` | IBM Plex Mono | IBM Plex Mono |

تُحمَّل عبر `<link>` في `src/routes/__root.tsx` (وليس `@import` داخل CSS).

## الأنصاف والحدود

`--radius: 0.875rem` مع مشتقّات `--radius-sm … --radius-4xl`
(بطاقات = `rounded-2xl`، أزرار = `rounded-xl`).

## أدوات مساعدة في styles.css

- `surface-mesh` / `surface-grid` — خلفيات الأقسام.
- `btn-shine` / `hover-press` / `glow-primary` — تفاعلات الأزرار.
- حركات الظهور عبر `src/components/ui/reveal.tsx` و`use-scroll-reveal`.

## المكوّنات المشتركة

| المكوّن | الاستخدام |
| --- | --- |
| `components/app/kit.tsx` | `AppPage`, `Panel`, `StatGrid`, `RowList`, `DataTable`, `Badge`, `Progress`, `QuickLinks`, `EmptyState` |
| `components/admin/admin-feature.tsx` | هيكل شاشات CRUD الإدارية |
| `components/admin/app-sidebar.tsx` | جانبية 3 مستويات، أقسام متعددة مفتوحة، بحث، حالة مطوية بالأيقونات |
| `components/site/public-layout.tsx` | هيدر/فوتر الموقع العام |
| `components/site/brand-logo.tsx` | الشعار (SVG 11 ديسك توب / 14 جوال) |
| `components/app/charts.tsx` | رسوم recharts ثنائية اللغة |
| `components/ui/*` | shadcn: button, input, textarea, select, checkbox, switch, dialog, alert-dialog, accordion, label, skeleton, sonner, animated-counter, reveal |

## قواعد إلزامية

1. لا ألوان صريحة في JSX — توكنز فقط.
2. كل نص جديد ثنائي اللغة (`bi()` أو مفتاح i18n).
3. المسافات والأنصاف من مقاييس Tailwind الافتراضية + توكنز المشروع.
4. الأيقونات من lucide-react فقط (نمط outline).
