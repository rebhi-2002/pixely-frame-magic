#!/usr/bin/env node
/**
 * يسحب نصوص الفيديوهات من ملفات ترجمة الموقع نفسها (../src/i18n/locales) → src/copy.generated.json
 * فما في نص مكتوب مرتين: لو غيّرت نص بالموقع شغّل `npm run sync-copy` وأعد الريندر.
 */
import { readFile, writeFile } from "node:fs/promises";

const dir = new URL("../../src/i18n/locales/", import.meta.url);
const merge = (a, b) => {
  const o = { ...a };
  for (const [k, v] of Object.entries(b)) o[k] = o[k] && typeof o[k] === "object" && typeof v === "object" && !Array.isArray(v) ? merge(o[k], v) : v;
  return o;
};
const pick = (src, paths) => {
  const out = {};
  for (const p of paths) {
    const keys = p.split(".");
    let from = src, to = out;
    keys.forEach((k, i) => {
      if (from == null) return;
      from = from[k];
      if (i === keys.length - 1) to[k] = from;
      else to = to[k] ??= {};
    });
  }
  return out;
};
const PATHS = [
  "home.badge", "home.startTitle", "home.startSub", "home.startSteps", "home.ctaTitle", "home.ctaSub", "home.ctaButton",
  "forTeachers.h1", "forTeachers.cta", "forTeachers.benefits",
  "nav.tagline",
];
const out = {};
for (const lang of ["ar", "en"]) {
  const load = async (f) => JSON.parse(await readFile(new URL(f, dir), "utf8"));
  out[lang] = pick(merge(await load(`${lang}.json`), await load(`${lang}.pages.json`)), PATHS);
}
await writeFile(new URL("../src/copy.generated.json", import.meta.url), JSON.stringify(out, null, 2) + "\n");
console.log("✓ copy.generated.json محدّث من نصوص الموقع");
