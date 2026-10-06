import React from "react";
import { Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Frame } from "./Frame";
import { Marker } from "./Marker";
import { copy, type Lang } from "./copy";
import { DESCRIPTOR, TICKER } from "./facts";
import { bodyFont, displayFont } from "./fonts";
import { fadeOut, pop } from "./motion";
import { C } from "./theme";

/**
 * "رحلتك من البحث إلى التقييم" — ريلز/ستوري 1080×1920 (~25s).
 * النص كله من قسم الرحلة بالرئيسية (home.startTitle / startSteps / cta) عبر copy.generated.json،
 * فالفيديو والموقع دايمًا بنفس الصياغة. بدون أرقام أو أسماء أو إحصاءات.
 */
export type JourneyProps = { lang: Lang; siteUrl: string };

export const JOURNEY_INTRO = 75;
export const JOURNEY_STEP = 84;
export const JOURNEY_OUTRO = 105;
export const journeyFrames = () => JOURNEY_INTRO + copy("ar").home.startSteps.length * JOURNEY_STEP + JOURNEY_OUTRO;

const COLORS = [C.blue, C.green, C.amber, C.coral, C.blue, C.green, C.amber];

const Intro: React.FC<{ lang: Lang }> = ({ lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const home = copy(lang).home;
  const words = home.startTitle.split(" ");
  const last = words.pop() as string;
  const out = fadeOut(frame, JOURNEY_INTRO, 8);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 48, padding: "0 70px", opacity: out }}>
      <div
        style={{
          alignSelf: "flex-start",
          fontFamily: bodyFont(lang),
          fontWeight: 700,
          fontSize: 38,
          color: C.ink,
          background: C.card,
          border: `6px solid ${C.ink}`,
          borderRadius: 999,
          padding: "10px 34px",
          boxShadow: `7px 7px 0 ${C.ink}`,
          transform: `scale(${pop(frame, fps, 0)})`,
          transformOrigin: lang === "ar" ? "right center" : "left center",
        }}
      >
        {home.badge}
      </div>
      <div
        style={{
          fontFamily: displayFont(lang),
          fontWeight: 800,
          fontSize: 124,
          lineHeight: 1.45,
          color: C.ink,
          opacity: pop(frame, fps, 6),
          transform: `translateY(${(1 - pop(frame, fps, 6)) * 60}px)`,
        }}
      >
        {words.join(" ")} <Marker size={124} progress={pop(frame, fps, 22)}>{last}</Marker>
      </div>
      <div style={{ fontFamily: bodyFont(lang), fontWeight: 600, fontSize: 46, lineHeight: 1.6, color: C.muted, opacity: pop(frame, fps, 30) }}>
        {home.startSub}
      </div>
    </div>
  );
};

const Step: React.FC<{ lang: Lang; index: number; total: number; title: string; text: string }> = ({ lang, index, total, title, text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dir = lang === "ar" ? 1 : -1;
  const enter = pop(frame, fps, 0);
  const textIn = pop(frame, fps, 8);
  const out = fadeOut(frame, JOURNEY_STEP, 8);
  const color = COLORS[index % COLORS.length];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 70, opacity: out }}>
      <div style={{ display: "flex", gap: 22 }}>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              border: `5px solid ${C.ink}`,
              background: i <= index ? C.ink : C.card,
            }}
          />
        ))}
      </div>
      <div
        style={{
          width: 880,
          background: C.card,
          border: `8px solid ${C.ink}`,
          borderRadius: 40,
          boxShadow: `18px 18px 0 ${C.ink}`,
          padding: "70px 60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          textAlign: "center",
          transform: `translateX(${(1 - enter) * 160 * dir}px)`,
          opacity: Math.min(1, enter * 1.5),
        }}
      >
        <div
          style={{
            width: 210,
            height: 210,
            borderRadius: 999,
            background: color,
            border: `8px solid ${C.ink}`,
            boxShadow: `10px 10px 0 ${C.ink}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: displayFont("en"),
            fontWeight: 700,
            fontSize: 120,
            color: C.ink,
            transform: `scale(${enter})`,
          }}
        >
          {index + 1}
        </div>
        <div style={{ fontFamily: displayFont(lang), fontWeight: 800, fontSize: 150, color: C.ink, lineHeight: 1.2 }}>{title}</div>
        <div
          style={{
            fontFamily: bodyFont(lang),
            fontWeight: 600,
            fontSize: 52,
            lineHeight: 1.6,
            color: C.muted,
            opacity: textIn,
            transform: `translateY(${(1 - textIn) * 30}px)`,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

const Outro: React.FC<{ lang: Lang; siteUrl: string }> = ({ lang, siteUrl }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const home = copy(lang).home;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 50, padding: "0 70px", textAlign: "center" }}>
      <div style={{ fontFamily: displayFont(lang), fontWeight: 800, fontSize: 118, lineHeight: 1.4, color: C.ink, opacity: pop(frame, fps, 0), transform: `translateY(${(1 - pop(frame, fps, 0)) * 50}px)` }}>
        {home.ctaTitle}
      </div>
      <div style={{ fontFamily: bodyFont(lang), fontWeight: 600, fontSize: 46, lineHeight: 1.6, color: C.muted, opacity: pop(frame, fps, 10) }}>{home.ctaSub}</div>
      <div
        style={{
          fontFamily: displayFont(lang),
          fontWeight: 800,
          fontSize: 76,
          color: C.ink,
          background: C.amber,
          border: `8px solid ${C.ink}`,
          borderRadius: 28,
          boxShadow: `14px 14px 0 ${C.ink}`,
          padding: "26px 80px",
          transform: `scale(${pop(frame, fps, 20)})`,
        }}
      >
        {home.ctaButton}
      </div>
      <div style={{ fontFamily: displayFont("en"), fontWeight: 500, fontSize: 44, color: C.ink, direction: "ltr", opacity: pop(frame, fps, 32) }}>{siteUrl}</div>
    </div>
  );
};

export const StudentJourney: React.FC<JourneyProps> = ({ lang, siteUrl }) => {
  const steps = copy(lang).home.startSteps;
  return (
    <Frame lang={lang} ticker={TICKER[lang]} descriptor={DESCRIPTOR[lang]}>
      <Sequence durationInFrames={JOURNEY_INTRO}>
        <Intro lang={lang} />
      </Sequence>
      {steps.map((s, i) => (
        <Sequence key={s.title} from={JOURNEY_INTRO + i * JOURNEY_STEP} durationInFrames={JOURNEY_STEP}>
          <Step lang={lang} index={i} total={steps.length} title={s.title} text={s.text} />
        </Sequence>
      ))}
      <Sequence from={JOURNEY_INTRO + steps.length * JOURNEY_STEP} durationInFrames={JOURNEY_OUTRO}>
        <Outro lang={lang} siteUrl={siteUrl} />
      </Sequence>
    </Frame>
  );
};
