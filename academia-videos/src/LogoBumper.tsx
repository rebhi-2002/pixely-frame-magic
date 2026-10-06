import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { Lang } from "./copy";
import { DESCRIPTOR } from "./facts";
import { bodyFont, displayFont } from "./fonts";
import { fadeOut, pop } from "./motion";
import { C } from "./theme";

/** مقدّمة/خاتمة قصيرة (3s) للشعار — تنحط بأول أو آخر أي فيديو. 1080×1080. */
export const BUMPER_FRAMES = 90;
export const LogoBumper: React.FC<{ lang: Lang }> = ({ lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rtl = lang === "ar";
  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.paper,
        backgroundImage: `linear-gradient(${C.grid} 2px, transparent 2px), linear-gradient(90deg, ${C.grid} 2px, transparent 2px)`,
        backgroundSize: "54px 54px",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
        direction: rtl ? "rtl" : "ltr",
        opacity: fadeOut(frame, BUMPER_FRAMES, 10),
      }}
    >
      <Img src={staticFile("logo-mark.svg")} style={{ height: 460, width: "auto", transform: `scale(${0.6 + 0.4 * pop(frame, fps, 0, 10)})`, opacity: pop(frame, fps, 0) }} />
      <div style={{ fontFamily: displayFont(lang), fontWeight: 800, fontSize: 130, color: C.ink, opacity: pop(frame, fps, 18), transform: `translateY(${(1 - pop(frame, fps, 18)) * 40}px)` }}>
        {rtl ? "أكاديميا" : "Academia"}
      </div>
      <div style={{ fontFamily: bodyFont(lang), fontWeight: 600, fontSize: 44, color: C.muted, opacity: pop(frame, fps, 30) }}>{DESCRIPTOR[lang]}</div>
    </AbsoluteFill>
  );
};
