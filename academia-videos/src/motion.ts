import { interpolate, spring } from "remotion";

/** دخول بنابض (spring) — delay بالفريمات؛ قبل البداية بيرجع 0. */
export const pop = (frame: number, fps: number, delay = 0, damping = 14) =>
  spring({ frame: Math.max(0, frame - delay), fps, config: { damping, stiffness: 120 } });

/** تلاشي الخروج بآخر `len` فريم من المشهد. */
export const fadeOut = (frame: number, duration: number, len = 10) =>
  interpolate(frame, [duration - len, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
