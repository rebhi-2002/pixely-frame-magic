import { loadFont as loadBaloo } from "@remotion/google-fonts/BalooBhaijaan2";
import { loadFont as loadCairo } from "@remotion/google-fonts/Cairo";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import type { Lang } from "./copy";

// نفس خطوط الموقع. Chromium بيشكّل العربي صح (عكس مولّد Pillow اللي كان بخط بديل).
const baloo = loadBaloo("normal", { weights: ["700", "800"], subsets: ["arabic", "latin"] });
const cairo = loadCairo("normal", { weights: ["600", "700"], subsets: ["arabic", "latin"] });
const poppins = loadPoppins("normal", { weights: ["500", "700"], subsets: ["latin"] });

export const displayFont = (lang: Lang) => (lang === "ar" ? baloo.fontFamily : poppins.fontFamily);
export const bodyFont = (lang: Lang) => (lang === "ar" ? cairo.fontFamily : poppins.fontFamily);
