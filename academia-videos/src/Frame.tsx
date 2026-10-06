import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C } from "./theme";
import { bodyFont, displayFont } from "./fonts";
import type { Lang } from "./copy";

/**
 * إطار الهوية المشترك لكل الفيديوهات (نفس منطق بطاقات المشاركة):
 * شبكة الصفحة ← بطاقة سادة بحد وظل صلبين ← هيدر (الشعار + الوصف) ← شريط حقائق سفلي.
 * children = منطقة المحتوى بين الهيدر والشريط.
 */
export const Frame: React.FC<{ lang: Lang; ticker: string[]; descriptor: string; children: React.ReactNode }> = ({
  lang,
  ticker,
  descriptor,
  children,
}) => {
  const rtl = lang === "ar";
  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.paper,
        backgroundImage: `linear-gradient(${C.grid} 2px, transparent 2px), linear-gradient(90deg, ${C.grid} 2px, transparent 2px)`,
        backgroundSize: "54px 54px",
        direction: rtl ? "rtl" : "ltr",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 48,
          background: C.card,
          border: `8px solid ${C.ink}`,
          boxShadow: `18px 18px 0 ${C.ink}`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 150,
            flexShrink: 0,
            background: C.paper2,
            borderBottom: `8px solid ${C.ink}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 44px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <Img src={staticFile("logo-mark.svg")} style={{ height: 96, width: "auto" }} />
            <span style={{ fontFamily: displayFont(lang), fontWeight: 800, fontSize: 64, color: C.ink }}>
              {rtl ? "أكاديميا" : "Academia"}
            </span>
          </div>
          <span style={{ fontFamily: bodyFont(lang), fontWeight: 600, fontSize: 28, color: C.muted }}>{descriptor}</span>
        </div>

        <div style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column" }}>{children}</div>

        <div
          style={{
            height: 120,
            flexShrink: 0,
            background: C.ink,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 44px",
            fontFamily: bodyFont(lang),
            fontWeight: 700,
            fontSize: 28,
            color: C.amber,
          }}
        >
          {ticker.map((t, i) => (
            <React.Fragment key={t}>
              {i > 0 && <span style={{ color: C.card, fontSize: 26 }}>★</span>}
              <span>{t}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
