import os
HERE = os.path.dirname(os.path.abspath(__file__))
import sys, time, subprocess, math
import numpy as np, cv2
from PIL import Image
sys.path.insert(0, HERE)
import scenes as S
from engine import *

def build_chrome():
    def fn(p, d, img):
        p.rect((26, 26, W - 26, H - 26), None, r=0, w=9, sh=0, shadow=False)
        h = 96; lg = S.LOGO.resize((int(S.LOGO.width * 62 / S.LOGO.height), 62), Image.LANCZOS)
        f = g.font("ar", 48, display=True); tw_ = int(g.tw("أكاديميا", f, "ar")); pw = lg.width + tw_ + 22 + 56 + 24
        x1 = W - 58; x0 = x1 - pw
        p.rect((x0, 48, x1, 48 + h), g.PAPER_CARD, r=h // 2, w=7, sh=7)
        img.alpha_composite(lg.resize((lg.width * K, lg.height * K), Image.LANCZOS), (int((x1 - 36 - lg.width) * K), int((48 + (h - 62) / 2) * K)))
        p.text((x1 - 36 - lg.width - 18, 48 + h / 2 + 2), "أكاديميا", f, anchor="rm", lang="ar")
        p.text((66, 78), "منصة تعليمية عربية", g.font("ar", 30, bold=False), fill=g.MUTED, anchor="lm", lang="ar")
    return sprite(W, H, fn)

CHROME = build_chrome(); CH_A = CHROME[..., 3:4]; CH_RGB = CHROME[..., :3]

def scene_frame(idx, local, buf):
    name, frames, fn = S.SCENES[idx]
    ctx = Ctx(buf); fn(ctx, local, frames)

def render_frame(gf, bufA, bufB):
    st, tr = S.STARTS, S.T
    cur = max(i for i in range(len(S.SCENES)) if st[i] <= gf)
    if cur >= 1 and gf < st[cur] + tr:
        a_idx = cur - 1; p = (gf - st[cur] + 1) / (tr + 1)
        scene_frame(a_idx, gf - st[a_idx], bufA); scene_frame(cur, gf - st[cur], bufB)
        kind, direction, spring_t = S.TRANS[a_idx]
        out = transition(bufA, bufB, kind, direction, ease_out(p) if spring_t else p)
    else:
        scene_frame(cur, gf - st[cur], bufB); out = bufB
    out = out * (1 - CH_A) + CH_RGB
    return np.clip(out * 255 + 0.5, 0, 255).astype(np.uint8)[..., ::-1]

def main(start=0, end=None, out="/home/claude/film/out.mp4", preview=None):
    end = S.TOTAL if end is None else end
    bufA = np.zeros((H, W, 3), np.float32); bufB = np.zeros((H, W, 3), np.float32)
    if preview:
        for gf in preview:
            cv2.imwrite(os.path.join(HERE, f"pv_{gf}.png"), render_frame(gf, bufA, bufB)); print("wrote", gf)
        return
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", "30", "-i", "-",
           "-i", os.path.join(HERE, "audio.wav"), "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p", "-profile:v", "high", "-level", "4.2",
           "-af", "acompressor=threshold=0.08:ratio=3.5:attack=5:release=120:makeup=3,loudnorm=I=-15:TP=-2:LRA=9,aresample=48000,alimiter=limit=0.708:level=disabled:attack=2:release=40", "-ar", "48000", "-c:a", "aac", "-b:a", "192k", "-t", f"{S.TOTAL / 30:.3f}", "-movflags", "+faststart", out]
    pr = subprocess.Popen(cmd, stdin=subprocess.PIPE); t0 = time.time()
    for gf in range(start, end):
        pr.stdin.write(render_frame(gf, bufA, bufB).tobytes())
        if gf % 60 == 0: print(f"frame {gf}/{end}  {time.time() - t0:.0f}s", flush=True)
    pr.stdin.close(); pr.wait(); print("DONE", out, f"{time.time() - t0:.0f}s", flush=True)

def chunk(start, end):
    """يرندر مقطعًا (فيديو فقط، جودة عالية) — الصوت والدمج بالنهاية. بيسمح بتقسيم الشغل على جلسات قصيرة."""
    bufA = np.zeros((H, W, 3), np.float32); bufB = np.zeros((H, W, 3), np.float32)
    out = os.path.join(HERE, "chunks", f"c_{start:05d}.mp4")
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", "30", "-i", "-",
           "-c:v", "libx264", "-preset", "medium", "-crf", "14", "-pix_fmt", "yuv420p", "-profile:v", "high", "-level", "4.2",
           "-x264-params", "keyint=30:min-keyint=30:scenecut=0", out]
    pr = subprocess.Popen(cmd, stdin=subprocess.PIPE); t0 = time.time()
    for gf in range(start, min(end, S.TOTAL)):
        pr.stdin.write(render_frame(gf, bufA, bufB).tobytes())
        if (gf - start) % 100 == 0: print(f"frame {gf}  {time.time() - t0:.0f}s", flush=True)
    pr.stdin.close(); pr.wait(); print("chunk done", out, f"{time.time() - t0:.0f}s", flush=True)

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "preview": main(preview=[int(x) for x in sys.argv[2:]])
    elif len(sys.argv) > 1 and sys.argv[1] == "chunk": chunk(int(sys.argv[2]), int(sys.argv[3]))
    else: main()
