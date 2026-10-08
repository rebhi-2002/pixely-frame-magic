import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Sequence } from "remotion";
import { Html5Audio } from "remotion";
import { whip } from "@remotion/sfx";
import { copy } from "../copy";
import { bodyFont, displayFont } from "../fonts";
import { pop } from "../motion";
import { C, SITE_URL } from "../theme";
import { Camera, Confetti, KineticText, Label, MarkerSweep, Panel, Rays, Shake, Skel, Stamp, Sticker } from "./effects";

const c = copy("ar");
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const D = displayFont("ar");
const steps = c.home.startSteps; // بحث، مقارنة، اختيار، حجز، دفع، حضور، تقييم
const fill = (bg: string): React.CSSProperties => ({ background: bg, direction: "rtl" });
const NUM: React.CSSProperties = { fontFamily: displayFont("en"), fontWeight: 700 };

/** مؤثر صوتي من @remotion/sfx (روابط CDN — بيحتاج إنترنت وقت الرندر). */
const Sfx: React.FC<{ src: string; at: number; volume?: number }> = ({ src, at, volume = 0.6 }) => (
  <Sequence from={at} durationInFrames={45}>
    <Html5Audio src={src} volume={volume} />
  </Sequence>
);

/** بطاقة خطوة: رقم + عنوان + نص — تدخل من الجانب. */
const StepCard: React.FC<{ index: number; delay: number; color: string; rotate?: number }> = ({ index, delay, color, rotate = -2 }) => {
  const s = steps[index];
  return (
    <Sticker color={color} delay={delay} rotate={rotate} fromX={-300} fromY={0} style={{ display: "flex", alignItems: "center", gap: 34, padding: "26px 40px", width: 820 }}>
      <div style={{ ...NUM, fontSize: 96, width: 120, height: 120, borderRadius: 999, background: C.card, border: `7px solid ${C.ink}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.ink, flexShrink: 0 }}>
        {index + 1}
      </div>
      <div>
        <div style={{ fontFamily: D, fontWeight: 800, fontSize: 88, color: C.ink, lineHeight: 1.1 }}>{s.title}</div>
        <div style={{ fontFamily: bodyFont("ar"), fontWeight: 600, fontSize: 40, color: C.ink, lineHeight: 1.45, opacity: 0.85 }}>{s.text}</div>
      </div>
    </Sticker>
  );
};

/** 1) الافتتاح — الشعار + عنوان الرئيسية. */
export const Hook: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = pop(frame, fps, 6, 9);
  return (
    <AbsoluteFill style={fill(C.paper)}>
      <Sfx src={whip} at={0} />
      <Rays opacity={0.22} cx="22%" cy="50%" />
      <Camera duration={duration} from={1} to={1.05}>
        <div style={{ position: "absolute", left: 150, top: 230, transform: `scale(${0.5 + 0.5 * logo}) rotate(${(1 - logo) * -12}deg)`, opacity: logo }}>
          <Img src={staticFile("logo-mark.svg")} style={{ height: 560, width: "auto" }} />
        </div>
        <div style={{ position: "absolute", right: 130, top: 230, width: 1000 }}>
          <KineticText text={c.home.h1a} size={150} delay={4} />
          <div style={{ marginTop: 26, fontFamily: D, fontWeight: 800, fontSize: 150, color: C.ink, lineHeight: 1.35 }}>
            <MarkerSweep size={150} delay={26}>{c.home.h1b}</MarkerSweep>
          </div>
          <div style={{ marginTop: 26 }}>
            <KineticText text={c.home.h1c} size={96} delay={44} shadow={false} color={C.muted} />
          </div>
        </div>
      </Camera>
    </AbsoluteFill>
  );
};

/** 2) البحث ← المقارنة ← الاختيار — دليل المعلمين مع تظليل متتابع. */
export const Discover: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const caret = Math.floor(frame / 15) % 2 === 0;
  return (
    <AbsoluteFill style={fill(C.blue)}>
      <Camera duration={duration} from={1} to={1.06} originX="25%">
        {/* واجهة الدليل (يسار) */}
        <div style={{ position: "absolute", left: 120, top: 170, width: 780 }}>
          <Panel style={{ padding: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, background: C.paper2, border: `6px solid ${C.ink}`, borderRadius: 999, padding: "20px 34px" }}>
              <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.6" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
              <Skel width={300} height={20} />
              <div style={{ width: 5, height: 44, background: C.ink, opacity: caret ? 1 : 0 }} />
            </div>
            {[0, 1, 2].map((i) => {
              const on = interpolate(frame, [70 + i * 60, 78 + i * 60], [0, 1], clamp);
              return (
                <div key={i} style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 26, borderRadius: 28, border: `6px solid ${C.ink}`, padding: "22px 28px", background: on > 0.5 ? C.amber : C.card, transform: `translateX(${on * -14}px)` }}>
                  <div style={{ width: 92, height: 92, borderRadius: 999, background: [C.green, C.coral, C.blue][i], border: `6px solid ${C.ink}` }} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                    <Skel width="70%" height={22} color="#8f8a7c" />
                    <Skel width="45%" height={18} />
                  </div>
                  <Label size={34}>{i === 1 ? "أونلاين" : "وجاهي"}</Label>
                </div>
              );
            })}
          </Panel>
        </div>
        {/* الخطوات (يمين) */}
        <div style={{ position: "absolute", right: 110, top: 150, display: "flex", flexDirection: "column", gap: 34 }}>
          <StepCard index={0} delay={12} color={C.amber} />
          <StepCard index={1} delay={72} color={C.card} rotate={2} />
          <StepCard index={2} delay={132} color={C.green} />
        </div>
      </Camera>
    </AbsoluteFill>
  );
};

/** 3) الحجز ← الدفع — محفظة بشريط رصيد ينمو وختم ✓. */
export const BookPay: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const grow = interpolate(frame, [60, 120], [0.05, 1], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) });
  return (
    <AbsoluteFill style={fill(C.amber)}>
      <Rays color={C.card} opacity={0.18} cx="30%" cy="50%" />
      <Shake start={150} amp={16}>
        <Camera duration={duration} from={1} to={1.05} originX="30%">
          <div style={{ position: "absolute", left: 150, top: 190, width: 740 }}>
            <Panel style={{ padding: 44 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                <div style={{ width: 120, height: 120, borderRadius: 30, background: C.amber, border: `7px solid ${C.ink}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h14a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V7zm0 0l11-3v3" /><circle cx="16.5" cy="13.5" r="1.4" fill={C.ink} /></svg>
                </div>
                <Label size={64}>{steps[4].title}</Label>
              </div>
              <div style={{ marginTop: 40, height: 56, borderRadius: 999, background: C.paper2, border: `6px solid ${C.ink}`, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "100%", background: C.green, transformOrigin: "right center", transform: `scaleX(${grow})` }} />
              </div>
              {[0, 1].map((i) => (
                <div key={i} style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 22, opacity: interpolate(frame, [90 + i * 20, 106 + i * 20], [0, 1], clamp) }}>
                  <div style={{ width: 44, height: 44, borderRadius: 999, background: C.blue, border: `5px solid ${C.ink}` }} />
                  <Skel width={i ? 300 : 400} height={20} />
                </div>
              ))}
            </Panel>
          </div>
          <div style={{ position: "absolute", left: 600, top: 130 }}>
            <Stamp delay={150} />
          </div>
          <div style={{ position: "absolute", right: 110, top: 230, display: "flex", flexDirection: "column", gap: 44 }}>
            <StepCard index={3} delay={10} color={C.card} />
            <StepCard index={4} delay={70} color={C.blue} rotate={2} />
          </div>
        </Camera>
      </Shake>
    </AbsoluteFill>
  );
};

/** 4) الحضور ← التقييم — رابط اجتماع ونجوم تقفز. */
export const SessionRating: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={fill(C.green)}>
      <Camera duration={duration} from={1} to={1.06} originX="28%">
        <div style={{ position: "absolute", left: 130, top: 170, width: 780 }}>
          <Panel style={{ padding: 44 }}>
            <div style={{ display: "flex", gap: 16 }}>
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} style={{ flex: 1, height: 70, borderRadius: 16, background: i === 3 ? C.amber : C.paper2, border: `5px solid ${C.ink}` }} />
              ))}
            </div>
            <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 24, background: C.blue, border: `7px solid ${C.ink}`, borderRadius: 999, padding: "20px 40px", width: "fit-content", transform: `scale(${0.8 + 0.2 * pop(frame, fps, 30, 9)})` }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="12" height="12" rx="2" /><path d="M15 10l6-3v10l-6-3z" /></svg>
              <Label size={46}>رابط الاجتماع</Label>
            </div>
            <div style={{ marginTop: 50, display: "flex", justifyContent: "center", gap: 18 }}>
              {Array.from({ length: 5 }).map((_, i) => {
                const p = pop(frame, fps, 110 + i * 8, 7);
                return (
                  <svg key={i} width="110" height="110" viewBox="0 0 24 24" style={{ transform: `scale(${p}) rotate(${(1 - p) * 40}deg)` }}>
                    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8L12 2.5z" fill={C.amber} stroke={C.ink} strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                );
              })}
            </div>
          </Panel>
        </div>
        <div style={{ position: "absolute", right: 110, top: 230, display: "flex", flexDirection: "column", gap: 44 }}>
          <StepCard index={5} delay={10} color={C.card} />
          <StepCard index={6} delay={90} color={C.amber} rotate={2} />
        </div>
      </Camera>
    </AbsoluteFill>
  );
};

/** 5) المعلّم — عنوان صفحة /for-teachers + 4 مزايا تطير من اتجاهات مختلفة. */
export const Teachers: React.FC<{ duration: number }> = ({ duration }) => {
  const ft = c.forTeachers;
  const items = [
    { k: "verified", color: C.green, fx: 700, fy: -200, r: -3 },
    { k: "upload", color: C.blue, fx: -700, fy: -200, r: 3 },
    { k: "analytics", color: C.card, fx: 700, fy: 200, r: 2.5 },
    { k: "income", color: C.coral, fx: -700, fy: 200, r: -2.5 },
  ] as const;
  return (
    <AbsoluteFill style={fill(C.paper2)}>
      <Camera duration={duration} from={1} to={1.04}>
        <div style={{ position: "absolute", right: 130, left: 130, top: 90 }}>
          <KineticText text={ft.h1} size={104} delay={2} />
        </div>
        <div style={{ position: "absolute", left: 130, right: 130, top: 330, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {items.map((it, i) => {
            const b = ft.benefits[it.k];
            return (
              <Sticker key={it.k} color={it.color} delay={34 + i * 34} fromX={it.fx} fromY={it.fy} rotate={it.r} style={{ padding: "30px 40px" }}>
                <div style={{ fontFamily: D, fontWeight: 800, fontSize: 70, color: C.ink, lineHeight: 1.2 }}>{b.t}</div>
                <div style={{ marginTop: 10, fontFamily: bodyFont("ar"), fontWeight: 600, fontSize: 36, color: C.ink, lineHeight: 1.5, opacity: 0.85 }}>{b.d}</div>
              </Sticker>
            );
          })}
        </div>
      </Camera>
    </AbsoluteFill>
  );
};

/** 6) ولي الأمر — حضور ونتائج (ميزة شغّالة حسب قرار المنتج). */
export const Parents: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const role = c.home.roles.parent;
  return (
    <AbsoluteFill style={fill(C.card)}>
      <Rays color={C.green} opacity={0.2} cx="75%" cy="50%" speed={-0.2} />
      <Camera duration={duration} from={1} to={1.05} originX="30%">
        <div style={{ position: "absolute", right: 130, top: 220, width: 800 }}>
          <KineticText text={role.t} size={190} delay={4} />
          <div style={{ marginTop: 20 }}>
            <KineticText text={role.d} size={64} delay={20} shadow={false} color={C.muted} />
          </div>
        </div>
        <div style={{ position: "absolute", left: 130, top: 150, width: 860 }}>
          <Panel color={C.paper2} style={{ padding: 44 }}>
            <Label size={44}>حضور</Label>
            <div style={{ marginTop: 20, display: "flex", gap: 14 }}>
              {Array.from({ length: 10 }).map((_, i) => {
                const p = pop(frame, fps, 24 + i * 5, 12);
                return <div key={i} style={{ flex: 1, height: 74, borderRadius: 16, border: `5px solid ${C.ink}`, background: i === 6 ? C.coral : C.green, transform: `scaleY(${p})`, transformOrigin: "bottom" }} />;
              })}
            </div>
            <div style={{ marginTop: 44 }}><Label size={44}>نتائج الامتحانات</Label></div>
            <div style={{ marginTop: 20, display: "flex", alignItems: "flex-end", gap: 22, height: 300 }}>
              {[0.45, 0.7, 0.55, 0.9, 0.78].map((h, i) => {
                const p = pop(frame, fps, 70 + i * 8, 13);
                return <div key={i} style={{ flex: 1, height: 300 * h * p, borderRadius: 16, border: `5px solid ${C.ink}`, background: i % 2 ? C.amber : C.blue }} />;
              })}
            </div>
          </Panel>
        </div>
      </Camera>
    </AbsoluteFill>
  );
};

/** 7) القيمة — "الوضوح قبل الكمّية" مع أشعة. */
export const Value: React.FC<{ duration: number }> = ({ duration }) => {
  const st = c.home.statement;
  return (
    <AbsoluteFill style={fill(C.amber)}>
      <Rays color={C.card} opacity={0.3} speed={0.35} />
      <Camera duration={duration} from={1} to={1.07}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 50, padding: "0 160px", textAlign: "center" }}>
          <div style={{ fontFamily: D, fontWeight: 800, fontSize: 190, color: C.ink, lineHeight: 1.3 }}>
            <MarkerSweep size={190} color={C.card} delay={6}>{st.title}</MarkerSweep>
          </div>
          <KineticText text={st.sub} size={66} delay={34} align="center" shadow={false} />
        </AbsoluteFill>
      </Camera>
    </AbsoluteFill>
  );
};

/** 8) الدعوة — عنوان + زر + رابط + confetti. */
export const Cta: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const btn = pop(frame, fps, 22, 9);
  const pulse = 1 + 0.03 * Math.sin(Math.max(0, frame - 50) / 5);
  return (
    <AbsoluteFill style={fill(C.paper)}>
      <Rays opacity={0.2} cy="55%" />
      <Camera duration={duration} from={1} to={1.04}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 44, textAlign: "center", padding: "0 200px" }}>
          <Img src={staticFile("logo-mark.svg")} style={{ height: 230, width: "auto", transform: `scale(${pop(frame, fps, 0, 9)})` }} />
          <KineticText text={c.home.ctaTitle} size={130} delay={6} align="center" />
          <div
            style={{ fontFamily: D, fontWeight: 800, fontSize: 96, color: C.ink, background: C.amber, border: `9px solid ${C.ink}`, borderRadius: 34, boxShadow: `16px 16px 0 ${C.ink}`, padding: "26px 110px", transform: `scale(${(0.5 + 0.5 * btn) * pulse})`, opacity: Math.min(1, btn * 2) }}
          >
            {c.home.ctaButton}
          </div>
          <div style={{ fontFamily: displayFont("en"), fontWeight: 500, fontSize: 52, color: C.ink, direction: "ltr", opacity: pop(frame, fps, 44) }}>{SITE_URL}</div>
        </AbsoluteFill>
      </Camera>
      <Confetti start={26} x={960} y={760} />
    </AbsoluteFill>
  );
};
