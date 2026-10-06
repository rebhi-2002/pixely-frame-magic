import React from "react";
import { C } from "./theme";

/** نفس تمييز .text-highlight بالموقع: كتلة أمبر بحد وظل صلبين. progress 0→1 بيكبّر الكتلة. */
export const Marker: React.FC<{ children: React.ReactNode; size: number; progress?: number }> = ({ children, size, progress = 1 }) => (
  <span
    style={{
      display: "inline-block",
      background: C.amber,
      border: `${Math.max(4, size * 0.06)}px solid ${C.ink}`,
      borderRadius: size * 0.2,
      boxShadow: `${size * 0.09}px ${size * 0.09}px 0 ${C.ink}`,
      padding: `0 ${size * 0.22}px`,
      transform: `scale(${0.9 + 0.1 * progress})`,
      opacity: progress,
    }}
  >
    {children}
  </span>
);
