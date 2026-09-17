import i18n, { type Locale } from "@/i18n";
import { getBlogPost } from "@/content/blog-posts";
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
  "/for-teachers": "forTeachers",
  "/for-parents": "forParents",
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
  "/settings": "settings",
};

const NOINDEX_PATHS = [
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
  "/role-permissions/",
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
  } else if (normalizedPath.startsWith("/invite/")) {
    meta = translateMeta(locale, "invite");
  } else if (normalizedPath.startsWith("/certificate/")) {
    meta = translateMeta(locale, "certificate");
  } else if (normalizedPath.startsWith("/teacher/") && !isNoIndex(normalizedPath)) {
    meta = translateMeta(locale, "teacherProfile");
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
    image: `${SITE_URL}/og-image.svg`,
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
            logo: `${SITE_URL}/og-image.svg`,
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
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: payload.title },
      { name: "twitter:description", content: payload.description },
      { name: "twitter:image", content: payload.image },
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
