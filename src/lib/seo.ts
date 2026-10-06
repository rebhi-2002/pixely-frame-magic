import i18n, { type Locale } from "@/i18n";
import { blogPosts, getBlogPost } from "@/content/blog-posts";
import ogManifest from "./og-manifest.json";
import { env } from "@/lib/env";

export const SITE_URL = env.SITE_URL;

export type SeoPayload = {
  title: string;
  description: string;
  locale: Locale;
  pathname: string;
  canonical: string;
  alternate: string;
  type: "website" | "article";
  indexable: boolean;
  image: string;
  publishedTime?: string;
};

const PAGE_META_KEYS: Record<string, string> = {
  "/": "home",
  "/about": "about",
  "/courses": "courses",
  "/teachers": "teachersDirectory",
  "/for-teachers": "forTeachers",
  "/for-parents": "forParents",
  "/how-it-works": "howItWorks",
  "/contact": "contact",
  "/help": "help",
  "/privacy": "privacy",
  "/terms": "terms",
  "/blog": "blog",
  "/login": "authPages.login",
  "/signup": "authPages.signup",
  "/teacher/register": "authPages.teacherRegister",
  "/settings": "settings",
};

/** مفتاح صورة المشاركة لكل مسار — الملفات بـ public/og/<key>-<ar|en>.png (يولّدها
 *  scripts/og/generate_og.py). صفحة خاصة (noindex) انشارت → بطاقة الرئيسية؛ مسار مجهول → "غير موجودة". */
const OG_KEYS: Record<string, string> = {
  "/": "home",
  "/about": "about",
  "/courses": "courses",
  "/teachers": "teachers",
  "/for-teachers": "for-teachers",
  "/for-parents": "for-parents",
  "/how-it-works": "how-it-works",
  "/contact": "contact",
  "/help": "help",
  "/privacy": "privacy",
  "/terms": "terms",
  "/blog": "blog",
  "/login": "login",
  "/signup": "signup",
  "/teacher/register": "teacher-register",
};

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
/** لون شريط المتصفح بالموبايل/PWA = خلفية الثيم الفاتح الافتراضي (#F7F1E4): أريح للعين.
 *  بعد التحميل بيتبدّل تلقائيًا مع الثيم عبر PreferencesProvider (غامق/أزرق → #D0E0FB). */
export const BRAND_THEME_COLOR = "#F7F1E4";

/** المفاتيح اللي لها بطاقة فعلية (ar + en) — يكتبها scripts/og/generate_og.py. */
const OG_AVAILABLE = new Set<string>(ogManifest.keys);

/** يرجع المفتاح لو بطاقته موجودة، وإلا بطاقة الاحتياط — فما في صورة مكسورة أبدًا. */
function ogKeyOr(key: string, fallback: string): string {
  if (OG_AVAILABLE.has(key)) return key;
  return OG_AVAILABLE.has(fallback) ? fallback : "default";
}

function ogImageFor(pathname: string, locale: Locale, blogIndex: number): string {
  let key: string;
  if (blogIndex >= 0) key = ogKeyOr(`blog-${blogIndex + 1}`, "blog"); // مقال جديد بلا بطاقة → بطاقة المدونة
  else if (pathname.startsWith("/blog/")) key = "not-found";
  else if (pathname.startsWith("/teacher/") && !isNoIndex(pathname)) key = "teacher";
  else if (pathname.startsWith("/course/") && !isNoIndex(pathname)) key = "course";
  else if (OG_KEYS[pathname]) key = OG_KEYS[pathname];
  // صفحة مسجّلة بالميتا بدون بطاقة، أو خاصة (noindex) → بطاقة الاحتياط.
  // مسار مجهول تمامًا = صفحة 404 فعليًا (ميتاه "غير موجودة") → بطاقة 404 المطابقة لعنوانه.
  else if (PAGE_META_KEYS[pathname] || isNoIndex(pathname)) key = "default";
  else key = "not-found";
  return `${SITE_URL}/og/${ogKeyOr(key, "default")}-${locale}.png`;
}

const NOINDEX_PATHS = [
  "/403",
  "/login",
  "/signup",
  "/teacher/register",
  "/dashboard",
  "/admin/",
  "/teacher/dashboard",
  "/teacher/courses",
  "/teacher/earnings",
  "/teacher/settings",
  "/teacher/profile/edit",
  "/parent/",
  "/my-courses",
  "/notifications",
  "/schedule",
  "/settings",
];

function translateMeta(locale: Locale, key: string): { title: string; description: string } {
  const t = i18n.getFixedT(locale);
  return {
    title: String(t(`${key}.meta.title`)),
    description: String(t(`${key}.meta.description`)),
  };
}

function isNoIndex(pathname: string) {
  return NOINDEX_PATHS.some((prefix) => pathname === prefix || pathname.startsWith(prefix));
}

function localizedUrl(pathname: string, locale: Locale) {
  const url = new URL(pathname || "/", SITE_URL);
  if (locale === "en") url.searchParams.set("lang", "en");
  return url.toString();
}

export function localeFromSearch(search: unknown): Locale {
  if (search && typeof search === "object" && "lang" in search) {
    const value = (search as { lang?: unknown }).lang;
    if (value === "en") return "en";
  }
  return "ar";
}

export function getSeoForPath(pathname: string, locale: Locale): SeoPayload {
  const normalizedPath = pathname || "/";
  const blogSlug = normalizedPath.startsWith("/blog/")
    ? decodeURIComponent(normalizedPath.slice("/blog/".length))
    : null;
  const post = blogSlug ? getBlogPost(blogSlug) : undefined;
  const t = i18n.getFixedT(locale);

  let meta: { title: string; description: string };
  let type: SeoPayload["type"] = "website";
  let publishedTime: string | undefined;

  if (post) {
    meta = {
      title: `${locale === "en" ? post.titleEn : post.title} | ${locale === "en" ? "Academia Blog" : "مدونة أكاديميا"}`,
      description: locale === "en" ? post.excerptEn : post.excerpt,
    };
    type = "article";
    publishedTime = post.publishedAt;
  } else if (blogSlug) {
    meta = translateMeta(locale, "notFound");
  } else if (normalizedPath.startsWith("/teacher/") && !isNoIndex(normalizedPath)) {
    meta = translateMeta(locale, "teacherProfile");
  } else if (normalizedPath.startsWith("/course/") && !isNoIndex(normalizedPath)) {
    meta = translateMeta(locale, "courseDetail");
  } else {
    const key = PAGE_META_KEYS[normalizedPath] ?? "notFound";
    meta = translateMeta(locale, key);
  }

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
    image: ogImageFor(normalizedPath, locale, post ? blogPosts.indexOf(post) : -1),
    publishedTime,
  };
}

export function createSeoHead(pathname: string, locale: Locale = "ar") {
  const payload = getSeoForPath(pathname, locale);
  const localeCode = locale === "en" ? "en_US" : "ar";
  const alternateLocale = locale === "en" ? "ar" : "en_US";
  const links = [
    { rel: "canonical", href: payload.canonical },
    { rel: "alternate", href: localizedUrl(payload.pathname, "ar"), hrefLang: "ar" },
    { rel: "alternate", href: localizedUrl(payload.pathname, "en"), hrefLang: "en" },
    { rel: "alternate", href: localizedUrl(payload.pathname, "ar"), hrefLang: "x-default" },
  ];
  const jsonLd =
    payload.type === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: payload.title,
          description: payload.description,
          datePublished: payload.publishedTime,
          inLanguage: payload.locale,
          mainEntityOfPage: payload.canonical,
          image: payload.image,
          publisher: { "@type": "Organization", name: "Academia", url: SITE_URL },
        }
      : {
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
            logo: `${SITE_URL}/icons/icon-512.png`,
          },
        };

  return {
    meta: [
      { title: payload.title },
      { name: "description", content: payload.description },
      { name: "robots", content: payload.indexable ? "index, follow" : "noindex, nofollow" },
      { property: "og:type", content: payload.type },
      { property: "og:title", content: payload.title },
      { property: "og:description", content: payload.description },
      { property: "og:url", content: payload.canonical },
      { property: "og:site_name", content: locale === "en" ? "Academia" : "أكاديميا" },
      { property: "og:locale", content: localeCode },
      { property: "og:locale:alternate", content: alternateLocale },
      { property: "og:image", content: payload.image },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: String(OG_IMAGE_SIZE.width) },
      { property: "og:image:height", content: String(OG_IMAGE_SIZE.height) },
      { property: "og:image:alt", content: payload.title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: payload.title },
      { name: "twitter:description", content: payload.description },
      { name: "twitter:image", content: payload.image },
      { name: "twitter:image:alt", content: payload.title },
      { name: "theme-color", content: BRAND_THEME_COLOR },
      ...(payload.publishedTime
        ? [{ property: "article:published_time", content: payload.publishedTime }]
        : []),
    ],
    links,
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  };
}

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  const selector = `meta[data-academia-seo="true"][${attribute}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("data-academia-seo", "true");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = `link[data-academia-seo="true"][rel="${rel}"]${hreflang ? `[hreflang="${hreflang}"]` : ""}`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("data-academia-seo", "true");
    element.rel = rel;
    if (hreflang) element.hreflang = hreflang;
    document.head.appendChild(element);
  }
  element.href = href;
}

function upsertJsonLd(payload: SeoPayload) {
  const id = "academia-seo-jsonld";
  let element = document.getElementById(id) as HTMLScriptElement | null;
  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    element.setAttribute("data-academia-seo", "true");
    document.head.appendChild(element);
  }

  const data =
    payload.type === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: payload.title,
          description: payload.description,
          datePublished: payload.publishedTime,
          inLanguage: payload.locale,
          mainEntityOfPage: payload.canonical,
          image: payload.image,
          publisher: { "@type": "Organization", name: "Academia", url: SITE_URL },
        }
      : {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: payload.locale === "en" ? "Academia" : "أكاديميا",
          description: payload.description,
          url: payload.canonical,
          inLanguage: payload.locale,
        };

  element.textContent = JSON.stringify(data);
}

export function applySeo(payload: SeoPayload) {
  if (typeof document === "undefined") return;

  document.title = payload.title;
  upsertMeta("name", "description", payload.description);
  upsertMeta("name", "robots", payload.indexable ? "index, follow" : "noindex, nofollow");
  upsertMeta("name", "application-name", "Academia");
  upsertMeta("property", "og:type", payload.type);
  upsertMeta("property", "og:title", payload.title);
  upsertMeta("property", "og:description", payload.description);
  upsertMeta("property", "og:url", payload.canonical);
  upsertMeta("property", "og:site_name", payload.locale === "en" ? "Academia" : "أكاديميا");
  upsertMeta("property", "og:locale", payload.locale === "en" ? "en_US" : "ar");
  upsertMeta("property", "og:locale:alternate", payload.locale === "en" ? "ar" : "en_US");
  upsertMeta("property", "og:image", payload.image);
  upsertMeta("property", "og:image:type", "image/png");
  upsertMeta("property", "og:image:width", String(OG_IMAGE_SIZE.width));
  upsertMeta("property", "og:image:height", String(OG_IMAGE_SIZE.height));
  upsertMeta("property", "og:image:alt", payload.title);
  upsertMeta("name", "twitter:image:alt", payload.title);
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", payload.title);
  upsertMeta("name", "twitter:description", payload.description);
  upsertMeta("name", "twitter:image", payload.image);
  if (payload.publishedTime)
    upsertMeta("property", "article:published_time", payload.publishedTime);

  upsertLink("canonical", payload.canonical);
  if (payload.indexable) {
    upsertLink("alternate", localizedUrl(payload.pathname, "ar"), "ar");
    upsertLink("alternate", localizedUrl(payload.pathname, "en"), "en");
    upsertLink("alternate", localizedUrl(payload.pathname, "ar"), "x-default");
  }
  upsertJsonLd(payload);
}

/**
 * عنوان/وصف `<head>` لصفحات لوحة التحكم (بعد تسجيل الدخول) — كلها
 * `noindex` أصلاً (راجع NOINDEX_PATHS فوق)، فما بتحتاج آلية createSeoHead
 * الكاملة (canonical/hreflang/JSON-LD مالها معنى لصفحة غير مفهرسة). بس
 * لازم عنوان تبويب المتصفح (<title>) يتبدّل مع اللغة زي باقي محتوى
 * الصفحة — قبل هالدالة (2026-09-18) كان ثابت عربي دائمًا بكل صفحات لوحة
 * التحكم (~63 ملف)، بغض النظر عن اللغة المختارة فعليًا.
 *
 * `i18n.language` هون (مش hook زي useTranslation) لأنه head() بتيجي من
 * TanStack Router خارج شجرة الكومبوننت — نفس أسلوب translateMeta فوق.
 */
export function authPageHead(ar: { title: string; description: string }, en = ar) {
  const isEn = i18n.language === "en";
  const { title, description } = isEn ? en : ar;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  };
}
