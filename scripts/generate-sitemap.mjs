import { mkdir, writeFile } from "node:fs/promises";

const siteUrl = (process.env.VITE_SITE_URL || "https://pixely-frame-magic.vercel.app").replace(
  /\/$/,
  "",
);
const publicPaths = [
  "/",
  "/about",
  "/courses",
  "/teachers",
  "/for-teachers",
  "/for-parents",
  "/how-it-works",
  "/pricing",
  "/contact",
  "/help",
  "/privacy",
  "/terms",
  "/blog",
];
const blogSlugs = [
  "جدول-مذاكرة-يضبط-فعلاً",
  "الاستدعاء-النشط-وليش-القراءة-مش-كافية",
  "مادة-بتكرهها-كيف-تتحملها-لنهاية-السنة",
  "بنك-الأخطاء-أذكى-أداة-ما-بتستخدمها",
];
// صفحات المعلمين (/teacher/:id) مش مُدرجة هون عمدًا: معرّفاتها أرقام من الباك اند ومش قائمة ثابتة.
// (كانت هون 6 روابط وهمية بأسماء slug ما بتطابق أي معلم حقيقي — كانت بتعطي 404/"غير موجود" لمحركات البحث.)
// لما نحتاجها بالـsitemap: جلبها وقت البناء من Teacher/Search (يتطلب الباك اند شغّال وقت البناء).

function localizedUrl(pathname, lang) {
  const url = new URL(pathname, siteUrl);
  if (lang === "en") url.searchParams.set("lang", "en");
  return url.toString();
}

function alternateLinks(pathname) {
  return [
    `    <xhtml:link rel="alternate" hreflang="ar" href="${localizedUrl(pathname, "ar")}" />`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${localizedUrl(pathname, "en")}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrl(pathname, "ar")}" />`,
  ].join("\n");
}

const paths = [...publicPaths, ...blogSlugs.map((slug) => `/blog/${encodeURIComponent(slug)}`)];
const urls = [];
for (const pathname of paths) {
  for (const lang of ["ar", "en"]) {
    const loc = localizedUrl(pathname, lang);
    urls.push(`  <url>\n    <loc>${loc}</loc>\n${alternateLinks(pathname)}\n  </url>`);
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
await mkdir("public", { recursive: true });
await writeFile("public/sitemap.xml", xml, "utf8");
