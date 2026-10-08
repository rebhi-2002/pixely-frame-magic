import React from "react";
import { AbsoluteFill, Html5Audio, interpolate, staticFile } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import type { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { whoosh } from "@remotion/sfx";
import { Img } from "remotion";
import { bodyFont, displayFont } from "../fonts";
import { C, HAS_MUSIC } from "../theme";
import { Cta, BookPay, Discover, Hook, Parents, SessionRating, Teachers, Value } from "./scenes";

/**
 * الفيلم التسويقي 16:9 (1920×1080) بالعربي — ~60 ثانية، 8 مشاهد، تأثيرات: نص متحرك، ماركر، ملصقات،
 * ختم + اهتزاز، أشعة، confetti، دفع كاميرا، وانتقالات (wipe/slide/fade) بصوت whoosh.
 * ما في تعليق صوتي حاليًا (ElevenLabs لاحقًا). النصوص كلها من الموقع (npm run sync-copy).
 */
export const FILM_FPS = 30;
const T = 14; // مدة كل انتقال بالفريمات (بتنقص من المجموع لأن المشهدين بيتداخلوا)
const SCENES = [
  { id: "hook", frames: 150, C: Hook },
  { id: "discover", frames: 270, C: Discover },
  { id: "bookpay", frames: 270, C: BookPay },
  { id: "session", frames: 240, C: SessionRating },
  { id: "teachers", frames: 300, C: Teachers },
  { id: "parents", frames: 270, C: Parents },
  { id: "value", frames: 180, C: Value },
  { id: "cta", frames: 210, C: Cta },
] as const;

export const filmFrames = () => SCENES.reduce((a, s) => a + s.frames, 0) - T * (SCENES.length - 1);

/** يضيف whoosh عند دخول المشهد التالي (نفس نمط التوثيق الرسمي لـaudio-transitions). */
function addSound<P extends Record<string, unknown>>(transition: TransitionPresentation<P>, src: string): TransitionPresentation<P> {
  const { component: Component, ...other } = transition;
  const Inner = Component as React.FC<TransitionPresentationComponentProps<P>>;
  const WithSound: React.FC<TransitionPresentationComponentProps<P>> = (p) => (
    <>
      {p.presentationDirection === "entering" ? <Html5Audio src={src} volume={0.45} /> : null}
      <Inner {...p} />
    </>
  );
  return { component: WithSound, ...other };
}

const LIN = linearTiming({ durationInFrames: T });
const SPR = springTiming({ config: { damping: 200 }, durationInFrames: T });

/** إطار الهوية الثابت فوق كل المشاهد: حد حبر + شارة الشعار. */
const Chrome: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none", direction: "rtl" }}>
    <div style={{ position: "absolute", inset: 26, border: `9px solid ${C.ink}` }} />
    <div style={{ position: "absolute", top: 48, right: 58, display: "flex", alignItems: "center", gap: 18, background: C.card, border: `7px solid ${C.ink}`, borderRadius: 999, boxShadow: `7px 7px 0 ${C.ink}`, padding: "8px 34px 8px 22px" }}>
      <Img src={staticFile("logo-mark.svg")} style={{ height: 62, width: "auto" }} />
      <span style={{ fontFamily: displayFont("ar"), fontWeight: 800, fontSize: 48, color: C.ink }}>أكاديميا</span>
    </div>
    <div style={{ position: "absolute", top: 66, left: 66, fontFamily: bodyFont("ar"), fontWeight: 700, fontSize: 30, color: C.muted }}>منصة تعليمية عربية</div>
  </AbsoluteFill>
);

export const MarketingFilm: React.FC = () => {
  const total = filmFrames();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const presentations: TransitionPresentation<any>[] = [
    addSound(wipe({ direction: "from-left" }), whoosh),
    addSound(slide({ direction: "from-left" }), whoosh),
    addSound(wipe({ direction: "from-bottom" }), whoosh),
    addSound(slide({ direction: "from-bottom" }), whoosh),
    addSound(wipe({ direction: "from-left" }), whoosh),
    addSound(slide({ direction: "from-left" }), whoosh),
    addSound(fade(), whoosh),
  ];
  // TransitionSeries ما بيقبل إلا Sequence/Transition مباشرة (بدون Fragment) → مصفوفة مسطّحة بمفاتيح.
  const children: React.ReactNode[] = [];
  SCENES.forEach((s, i) => {
    children.push(
      <TransitionSeries.Sequence key={s.id} durationInFrames={s.frames}>
        <s.C duration={s.frames} />
      </TransitionSeries.Sequence>,
    );
    if (i < SCENES.length - 1) {
      children.push(<TransitionSeries.Transition key={`${s.id}-t`} presentation={presentations[i]} timing={i % 2 ? SPR : LIN} />);
    }
  });
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <TransitionSeries>{children}</TransitionSeries>
      <Chrome />
      {HAS_MUSIC && (
        <Html5Audio
          src={staticFile("audio/music.mp3")}
          volume={(f) => interpolate(f, [0, 45, total - 90, total], [0, 0.3, 0.3, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />
      )}
    </AbsoluteFill>
  );
};
