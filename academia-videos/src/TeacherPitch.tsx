import React from "react";
import { Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Frame } from "./Frame";
import { Marker } from "./Marker";
import { copy, type Lang } from "./copy";
import { DESCRIPTOR } from "./facts";
import { bodyFont, displayFont } from "./fonts";
import { fadeOut, pop } from "./motion";
import { C } from "./theme";

/**
 * "علّم بأوقاتك" — فيديو لاستقطاب المعلمين 1080×1920 (~20s). النص من صفحة /for-teachers
 * (forTeachers.h1 / benefits / cta). الترتيب: ظهور بالدليل ← ملف مهني ← أوقات توفّر ← أرباح ومحفظة.
 */
export type TeacherProps = { lang: Lang; siteUrl: string };

export const TEACHER_INTRO = 90;
export const TEACHER_ITEM = 105;
export const TEACHER_OUTRO = 105;
const ORDER = ["verified", "upload", "analytics", "income"] as const;
export const teacherFrames = () => TEACHER_INTRO + ORDER.length * TEACHER_ITEM + TEACHER_OUTRO;
const COLORS = [C.green, C.blue, C.amber, C.coral];

const TICKER_T: Record<Lang, string[]> = {
  ar: ["ظهور بالدليل", "عمولة واضحة مسبقًا", "سحب لحسابك البنكي"],
  en: ["Directory visibility", "Commission known upfront", "Bank withdrawals"],
};

const Intro: React.FC<{ lang: Lang }> = ({ lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = copy(lang).forTeachers.h1.split(" ");
  const tail = words.splice(-2).join(" ");
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 70px", opacity: fadeOut(frame, TEACHER_INTRO, 8) }}>
      <div
        style={{
          fontFamily: displayFont(lang),
          fontWeight: 800,
          fontSize: 132,
          lineHeight: 1.5,
          color: C.ink,
          opacity: pop(frame, fps, 0),
          transform: `translateY(${(1 - pop(frame, fps, 0)) * 60}px)`,
        }}
      >
        {words.join(" ")} <Marker size={132} progress={pop(frame, fps, 20)}>{tail}</Marker>
      </div>
    </div>
  );
};

const Benefit: React.FC<{ lang: Lang; index: number; title: string; text: string }> = ({ lang, index, title, text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dir = lang === "ar" ? 1 : -1;
  const enter = pop(frame, fps, 0);
  const textIn = pop(frame, fps, 8);
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", opacity: fadeOut(frame, TEACHER_ITEM, 8) }}>
      <div
        style={{
          width: 880,
          background: COLORS[index % COLORS.length],
          border: `8px solid ${C.ink}`,
          borderRadius: 40,
          boxShadow: `18px 18px 0 ${C.ink}`,
          padding: "64px 60px",
          display: "flex",
          flexDirection: "column",
          gap: 34,
          transform: `translateX(${(1 - enter) * 160 * dir}px)`,
          opacity: Math.min(1, enter * 1.5),
        }}
      >
        <div style={{ fontFamily: displayFont("en"), fontWeight: 700, fontSize: 96, color: C.ink, lineHeight: 1 }}>{`0${index + 1}`}</div>
        <div style={{ fontFamily: displayFont(lang), fontWeight: 800, fontSize: 118, color: C.ink, lineHeight: 1.25 }}>{title}</div>
        <div style={{ fontFamily: bodyFont(lang), fontWeight: 600, fontSize: 48, lineHeight: 1.6, color: C.ink, opacity: textIn, transform: `translateY(${(1 - textIn) * 26}px)` }}>
          {text}
        </div>
      </div>
    </div>
  );
};

const Outro: React.FC<{ lang: Lang; siteUrl: string }> = ({ lang, siteUrl }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 56 }}>
      <div
        style={{
          fontFamily: displayFont(lang),
          fontWeight: 800,
          fontSize: 100,
          color: C.ink,
          background: C.amber,
          border: `8px solid ${C.ink}`,
          borderRadius: 28,
          boxShadow: `14px 14px 0 ${C.ink}`,
          padding: "28px 80px",
          transform: `scale(${pop(frame, fps, 0)})`,
        }}
      >
        {copy(lang).forTeachers.cta}
      </div>
      <div style={{ fontFamily: displayFont("en"), fontWeight: 500, fontSize: 44, color: C.ink, direction: "ltr", opacity: pop(frame, fps, 14) }}>{`${siteUrl}/for-teachers`}</div>
    </div>
  );
};

export const TeacherPitch: React.FC<TeacherProps> = ({ lang, siteUrl }) => {
  const benefits = copy(lang).forTeachers.benefits;
  return (
    <Frame lang={lang} ticker={TICKER_T[lang]} descriptor={DESCRIPTOR[lang]}>
      <Sequence durationInFrames={TEACHER_INTRO}>
        <Intro lang={lang} />
      </Sequence>
      {ORDER.map((key, i) => (
        <Sequence key={key} from={TEACHER_INTRO + i * TEACHER_ITEM} durationInFrames={TEACHER_ITEM}>
          <Benefit lang={lang} index={i} title={benefits[key].t} text={benefits[key].d} />
        </Sequence>
      ))}
      <Sequence from={TEACHER_INTRO + ORDER.length * TEACHER_ITEM} durationInFrames={TEACHER_OUTRO}>
        <Outro lang={lang} siteUrl={siteUrl} />
      </Sequence>
    </Frame>
  );
};
