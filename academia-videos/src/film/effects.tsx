import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "../theme";
import { bodyFont, displayFont } from "../fonts";
import { pop } from "../motion";

/** رقم شبه عشوائي ثابت (نفس القيمة بكل رندر) — لازم للـconfetti والاهتزاز. */
export const rnd = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const FONT = (size: number, weight = 800) => ({ fontFamily: displayFont("ar"), fontWeight: weight, fontSize: size });

/** دفع كاميرا بطيء (تقريب) طوال المشهد — يعطي إحساس سينمائي لمشاهد الواجهة. */
export const Camera: React.FC<{ children: React.ReactNode; from?: number; to?: number; duration: number; originX?: string; originY?: string }> = ({
  children,
  from = 1,
  to = 1.08,
  duration,
  originX = "50%",
  originY = "50%",
}) => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [0, duration], [from, to], clamp);
  return <div style={{ position: "absolute", inset: 0, transform: `scale(${s})`, transformOrigin: `${originX} ${originY}` }}>{children}</div>;
};

/** اهتزاز قصير (impact) يبدأ من start ويخف تدريجيًا. */
export const Shake: React.FC<{ children: React.ReactNode; start: number; length?: number; amp?: number }> = ({ children, start, length = 14, amp = 14 }) => {
  const frame = useCurrentFrame();
  const t = frame - start;
  const k = t >= 0 && t < length ? 1 - t / length : 0;
  const dx = Math.sin(frame * 12.9898) * amp * k;
  const dy = Math.cos(frame * 78.233) * amp * k;
  return <div style={{ position: "absolute", inset: 0, transform: `translate(${dx}px, ${dy}px)` }}>{children}</div>;
};

/** نص كلمة-كلمة: كل كلمة تدخل بنابض مع ميلان خفيف وظل صلب (kinetic typography). */
export const KineticText: React.FC<{ text: string; size: number; delay?: number; stagger?: number; color?: string; align?: "right" | "center" | "left"; shadow?: boolean }> = ({
  text,
  size,
  delay = 0,
  stagger = 5,
  color = C.ink,
  align = "right",
  shadow = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ ...FONT(size), color, lineHeight: 1.35, textAlign: align, display: "flex", flexWrap: "wrap", gap: `0 ${size * 0.28}px`, justifyContent: align === "center" ? "center" : align === "right" ? "flex-start" : "flex-end" }}>
      {text.split(" ").map((word, i) => {
        const p = pop(frame, fps, delay + i * stagger, 11);
        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: "inline-block",
              opacity: Math.min(1, p * 2),
              transform: `translateY(${(1 - p) * size * 0.6}px) rotate(${(1 - p) * (i % 2 ? 5 : -5)}deg) scale(${0.7 + 0.3 * p})`,
              textShadow: shadow ? `${size * 0.04}px ${size * 0.04}px 0 rgba(31,41,55,0.18)` : undefined,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

/** ماركر يمسح فوق الكلمة (clip-path) — نفس .text-highlight بالموقع. */
export const MarkerSweep: React.FC<{ children: React.ReactNode; size: number; delay?: number; color?: string }> = ({ children, size, delay = 0, color = C.amber }) => {
  const frame = useCurrentFrame();
  const sweep = interpolate(frame - delay, [0, 16], [0, 100], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) });
  return (
    <span style={{ position: "relative", display: "inline-block", padding: `0 ${size * 0.22}px` }}>
      <span
        style={{
          position: "absolute",
          inset: `${size * 0.06}px 0 ${size * 0.02}px 0`,
          background: color,
          border: `${Math.max(5, size * 0.05)}px solid ${C.ink}`,
          borderRadius: size * 0.18,
          boxShadow: `${size * 0.08}px ${size * 0.08}px 0 ${C.ink}`,
          clipPath: `inset(0 ${100 - sweep}% 0 0)`,
        }}
      />
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  );
};

/** ملصق (sticker): يقفز بنابض مع ميلان، بحد وظل صلبين. */
export const Sticker: React.FC<{ children: React.ReactNode; color?: string; rotate?: number; delay?: number; fromX?: number; fromY?: number; style?: React.CSSProperties }> = ({
  children,
  color = C.card,
  rotate = -3,
  delay = 0,
  fromX = 0,
  fromY = 80,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = pop(frame, fps, delay, 10);
  return (
    <div
      style={{
        background: color,
        border: `7px solid ${C.ink}`,
        borderRadius: 28,
        boxShadow: `12px 12px 0 ${C.ink}`,
        padding: "26px 40px",
        transform: `translate(${(1 - p) * fromX}px, ${(1 - p) * fromY}px) rotate(${rotate * p}deg) scale(${0.6 + 0.4 * p})`,
        opacity: Math.min(1, p * 2.5),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** ختم دائري كبير (✓) ينزل بقوة — يُستعمل مع Shake لإحساس الضربة. */
export const Stamp: React.FC<{ delay: number; size?: number; color?: string }> = ({ delay, size = 260, color = C.green }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = pop(frame, fps, delay, 7);
  const scale = 2.6 - 1.6 * p;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: color,
        border: `10px solid ${C.ink}`,
        boxShadow: `14px 14px 0 ${C.ink}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: Math.min(1, p * 3),
        transform: `scale(${scale}) rotate(${-12 + 12 * p}deg)`,
      }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12.5l5 5L20 6.5" />
      </svg>
    </div>
  );
};

/** أشعة دوّارة خلف عنصر (sunburst) — خفيفة، لحظات الذروة فقط. */
export const Rays: React.FC<{ color?: string; opacity?: number; cx?: string; cy?: string; speed?: number }> = ({ color = C.amber, opacity = 0.35, cx = "50%", cy = "50%", speed = 0.25 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          width: 3400,
          height: 3400,
          marginLeft: -1700,
          marginTop: -1700,
          background: `repeating-conic-gradient(${color} 0deg 8deg, transparent 8deg 16deg)`,
          opacity,
          transform: `rotate(${frame * speed}deg)`,
        }}
      />
    </div>
  );
};

/** انفجار قصاصات (confetti) من نقطة — مواضع ثابتة بالـrnd، حركة بسرعة وجاذبية. */
export const Confetti: React.FC<{ start: number; x: number; y: number; count?: number }> = ({ start, x, y, count = 70 }) => {
  const frame = useCurrentFrame();
  const t = frame - start;
  if (t < 0) return null;
  const colors = [C.amber, C.coral, C.green, C.blue, C.ink];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = Math.PI * (0.1 + 0.8 * rnd(i + 1));
        const speed = 16 + rnd(i + 101) * 26;
        const px = x + Math.cos(angle) * speed * t * (rnd(i + 201) > 0.5 ? 1 : -1);
        const py = y - Math.sin(angle) * speed * t + 0.9 * 0.5 * t * t;
        const size = 22 + rnd(i + 301) * 26;
        const shape = Math.floor(rnd(i + 401) * 3);
        const fade = interpolate(t, [55, 85], [1, 0], clamp);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: size,
              height: size,
              background: colors[i % colors.length],
              border: `4px solid ${C.ink}`,
              borderRadius: shape === 0 ? 4 : shape === 1 ? 999 : "30% 70% 60% 40%",
              opacity: fade,
              transform: `rotate(${t * (6 + rnd(i + 501) * 14)}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};

/** بطاقة واجهة (Panel) — نفس لغة بطاقات الموقع. */
export const Panel: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; color?: string }> = ({ children, style, color = C.card }) => (
  <div style={{ background: color, border: `8px solid ${C.ink}`, borderRadius: 36, boxShadow: `18px 18px 0 ${C.ink}`, ...style }}>{children}</div>
);

/** شريط هيكلي (skeleton) للنص — بدون محتوى حقيقي ولا أرقام. */
export const Skel: React.FC<{ width: number | string; height?: number; color?: string }> = ({ width, height = 22, color = "#B8B2A3" }) => (
  <div style={{ width, height, borderRadius: height, background: color }} />
);

export const Label: React.FC<{ children: React.ReactNode; size?: number; color?: string; weight?: number }> = ({ children, size = 52, color = C.ink, weight = 700 }) => (
  <span style={{ fontFamily: bodyFont("ar"), fontWeight: weight, fontSize: size, color }}>{children}</span>
);
