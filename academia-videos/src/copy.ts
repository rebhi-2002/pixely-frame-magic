import generated from "./copy.generated.json";

export type Lang = "ar" | "en";
/** نصوص الموقع الحقيقية (مولّدة بـnpm run sync-copy). */
export const copy = (lang: Lang) => generated[lang];
