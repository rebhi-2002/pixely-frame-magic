#!/usr/bin/env node
/**
 * فحص تغطية الـSEO/المشاركة — يفشل `npm run check` لو أضفت صفحة عامة ونسيت تسجّلها.
 *
 * لكل ملف بـsrc/routes (صفحة ثابتة قابلة للفهرسة) يتأكد من:
 *   1) مسجّلة بـPAGE_META_KEYS ولها meta.title + meta.description بالعربي والإنجليزي
 *      (كان هذا بالضبط سبب ظهور "terms.meta.title" كعنوان صفحة).
 *   2) مسجّلة بـOG_KEYS وبطاقتها <key>-ar.png و<key>-en.png موجودة بـpublic/og.
 *   3) موجودة بقائمة الـsitemap (scripts/generate-sitemap.mjs).
 *   وبطاقة الاحتياط default-ar/en موجودة، والمسارات الديناميكية ($id/$slug) لها معالجة بـseo.ts.
 * تحذيرات (ما بتفشل محليًا، وبتفشل لو CI=true): مقال مدونة بلا بطاقة، رابط sitemap لصفحة غير موجودة.
 * الصفحات الخاصة (NOINDEX_PATHS) مستثناة — بتاخد بطاقة الاحتياط.
 */
import { readdir, readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];
const exists = (p) => access(path.join(root, p)).then(() => true, () => false);
const read = (p) => readFile(path.join(root, p), "utf8");

/** يستخرج { "/path": "value" } من كائن TS اسمه name بملف seo.ts */
function objectLiteral(src, name) {
  const m = src.match(new RegExp(`const ${name}[^=]*=\\s*\\{([\\s\\S]*?)\\n\\};`));
  if (!m) throw new Error(`ما لقيت ${name} بـsrc/lib/seo.ts — عدّل الفحص إذا غيّرت اسمه`);
  return Object.fromEntries([...m[1].matchAll(/"(\/[^"]*)"\s*:\s*"([^"]+)"/g)].map((x) => [x[1], x[2]]));
}
function arrayLiteral(src, name) {
  const m = src.match(new RegExp(`const ${name}[^=]*=\\s*\\[([\\s\\S]*?)\\];`));
  if (!m) throw new Error(`ما لقيت ${name}`);
  return [...m[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]);
}
function merge(a, b) {
  const o = { ...a };
  for (const [k, v] of Object.entries(b)) {
    o[k] = o[k] && typeof o[k] === "object" && typeof v === "object" ? merge(o[k], v) : v;
  }
  return o;
}
const dig = (obj, key) => key.split(".").reduce((x, k) => (x == null ? x : x[k]), obj);

const seo = await read("src/lib/seo.ts");
const metaKeys = objectLiteral(seo, "PAGE_META_KEYS");
const ogKeys = objectLiteral(seo, "OG_KEYS");
const noindex = arrayLiteral(seo, "NOINDEX_PATHS");
const isNoIndex = (p) => noindex.some((n) => p === n || p.startsWith(n));

const locales = {};
for (const l of ["ar", "en"]) {
  locales[l] = merge(JSON.parse(await read(`src/i18n/locales/${l}.json`)), JSON.parse(await read(`src/i18n/locales/${l}.pages.json`)));
}

// ---- الصفحات من ملفات src/routes ----
const staticRoutes = [];
const dynamicRoutes = [];
for (const f of await readdir(path.join(root, "src/routes"), { withFileTypes: true })) {
  if (!f.isFile() || !/\.tsx?$/.test(f.name) || /\.(test|spec)\./.test(f.name)) continue;
  const name = f.name.replace(/\.tsx?$/, "");
  if (name.startsWith("_") || name === "index" && false) continue;
  if (name.includes("$")) {
    dynamicRoutes.push("/" + name.split(".").filter((x) => !x.startsWith("$")).join("/") + "/");
  } else {
    staticRoutes.push(name === "index" ? "/" : "/" + name.split(".").join("/"));
  }
}

const sitemapSrc = await read("scripts/generate-sitemap.mjs");
const sitemapPaths = arrayLiteral(sitemapSrc, "publicPaths");

for (const route of staticRoutes) {
  if (isNoIndex(route)) continue; // خاصة: بطاقة الاحتياط
  const key = metaKeys[route];
  if (!key) {
    errors.push(`${route}: غير مسجّلة بـPAGE_META_KEYS (src/lib/seo.ts) — عنوانها بيطلع "غير موجودة"`);
  } else {
    for (const l of ["ar", "en"]) {
      const meta = dig(locales[l], `${key}.meta`);
      if (!meta?.title || !meta?.description) errors.push(`${route}: ناقص ${key}.meta.title/description بترجمة ${l}`);
    }
  }
  const og = ogKeys[route];
  if (!og) errors.push(`${route}: غير مسجّلة بـOG_KEYS (src/lib/seo.ts) — بتاخد بطاقة الاحتياط بدل بطاقتها`);
  else for (const l of ["ar", "en"]) if (!(await exists(`public/og/${og}-${l}.png`))) errors.push(`${route}: ناقصة public/og/${og}-${l}.png — شغّل python3 scripts/og/generate_og.py (وأضف الصفحة لجدول PAGES)`);
  if (!sitemapPaths.includes(route)) errors.push(`${route}: غير موجودة بـpublicPaths بـscripts/generate-sitemap.mjs`);
}

for (const prefix of dynamicRoutes) {
  if (!seo.includes(`"${prefix}"`)) errors.push(`المسار الديناميكي ${prefix}* ما له معالجة بـsrc/lib/seo.ts (ميتا + بطاقة)`);
}
for (const l of ["ar", "en"]) if (!(await exists(`public/og/default-${l}.png`))) errors.push(`ناقصة بطاقة الاحتياط public/og/default-${l}.png`);

// ---- مقالات المدونة ----
const posts = (await read("src/content/blog-posts.ts")).match(/^\s{4}slug: /gm)?.length ?? 0;
for (let i = 1; i <= posts; i++) for (const l of ["ar", "en"]) if (!(await exists(`public/og/blog-${i}-${l}.png`))) warnings.push(`مقال #${i}: ناقصة public/og/blog-${i}-${l}.png (بيستعمل بطاقة المدونة مؤقتًا) — شغّل python3 scripts/og/generate_og.py`);

// ---- sitemap ----
for (const p of sitemapPaths) if (!staticRoutes.includes(p)) warnings.push(`sitemap: ${p} ما له ملف بـsrc/routes (رابط 404 لمحركات البحث؟)`);

const strict = process.env.CI === "true" || process.env.CI === "1";
for (const w of warnings) console.warn(`⚠ ${w}`);
for (const e of errors) console.error(`✗ ${e}`);
if (errors.length || (strict && warnings.length)) {
  console.error(`\nفحص الـSEO: ${errors.length} خطأ${strict ? `، ${warnings.length} تحذير (CI)` : ""}`);
  process.exit(1);
}
console.log(`✓ فحص الـSEO: ${staticRoutes.length} صفحة ثابتة، ${dynamicRoutes.length} ديناميكية — كلها مسجّلة${warnings.length ? ` (${warnings.length} تحذير)` : ""}`);
