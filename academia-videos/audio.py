"""صوت الفيلم: مؤثرات + موسيقى خلفية — كلها مولّدة برمجيًا (أصلية 100%، بلا ترخيص خارجي)."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
import numpy as np
from scipy import signal
from scipy.io import wavfile
import scenes as S

SR = 44100
rng = np.random.default_rng(7)
def sos_filter(x, kind, fc, order=2):
    wn = [c / (SR / 2) for c in fc] if isinstance(fc, (list, tuple)) else fc / (SR / 2)
    return signal.sosfilt(signal.butter(order, wn, btype=kind, output="sos"), x)
def tarr(d): return np.arange(int(SR * d)) / SR
def noise(d): return rng.standard_normal(int(SR * d)).astype(np.float64)
def expenv(d, k=8.0): t = tarr(d); return np.exp(-k * t / d)
def stereo(x, pan=0.0): return np.stack([x * (1 - max(0, pan)), x * (1 + min(0, pan))], 1)

def whoosh(d=0.55):
    x = np.linspace(0, 1, int(SR * d)); n = noise(d)
    lo, mid, hi = sos_filter(n, "low", 350), sos_filter(n, "low", 1800), sos_filter(n, "low", 7000)
    sig = lo * (1 - x) ** 2 + mid * (np.sin(np.pi * x) ** 2) + hi * x ** 2
    sig *= np.sin(np.pi * x) ** 1.4; out = np.stack([sig * (1 - 0.6 * x), sig * (0.4 + 0.6 * x)], 1); return out * 1.6
def whip(d=0.3):
    t = tarr(d); ch = np.sin(2 * np.pi * np.cumsum(2600 * np.exp(-9 * t) + 300) / SR) * expenv(d, 9)
    n = sos_filter(noise(d), "high", 2500) * expenv(d, 11); return stereo((ch * 0.6 + n * 0.8) * 0.9)
def pop(freq=520, d=0.14, vol=0.8):
    t = tarr(d); f = freq * (1 + 0.7 * (1 - np.exp(-30 * t))); s = np.sin(2 * np.pi * np.cumsum(f) / SR) * expenv(d, 7); s[:40] *= np.linspace(0, 1, 40)
    return stereo(s * vol * 0.8)
def thud(d=0.7):
    t = tarr(d); f = 38 + 85 * np.exp(-14 * t); s = np.sin(2 * np.pi * np.cumsum(f) / SR) * expenv(d, 5)
    c = sos_filter(noise(0.12), "low", 900) * expenv(0.12, 12); s[:len(c)] += c * 0.9; return stereo(s * 1.1)
def ding(freq, d=0.7, vol=0.5):
    t = tarr(d); s = (np.sin(2 * np.pi * freq * t) + 0.35 * np.sin(2 * np.pi * freq * 2.76 * t) + 0.2 * np.sin(2 * np.pi * freq * 5.4 * t)) * expenv(d, 6)
    return stereo(s * vol * 0.6)
def swish(d=0.28):
    x = np.linspace(0, 1, int(SR * d)); s = sos_filter(noise(d), "band", [2500, 9000]) * np.sin(np.pi * x) ** 1.2; return stereo(s * 0.9)
def rise(d=0.9):
    x = np.linspace(0, 1, int(SR * d)); t = tarr(d); s = sos_filter(noise(d), "band", [500, 5000]) * x ** 2 * 0.7 + np.sin(2 * np.pi * np.cumsum(180 + 900 * x ** 2) / SR) * x ** 2 * 0.25
    return stereo(s * np.minimum(1, (1 - x) * 12 + 0.0) * 0.8)
def tick(vol=0.35):
    d = 0.04; return stereo(sos_filter(noise(d), "band", [1500, 5000]) * expenv(d, 14) * vol)
def burst(d=0.9):
    n = sos_filter(noise(0.4), "low", 4000) * expenv(0.4, 9); t = tarr(0.4); b = np.sin(2 * np.pi * np.cumsum(260 * np.exp(-8 * t) + 60) / SR) * expenv(0.4, 6)
    out = np.zeros((int(SR * d), 2)); body = stereo(n * 0.8 + b * 0.7); out[:len(body)] += body
    for i in range(14):
        st = int(SR * (0.03 + rng.random() * 0.45)); f = 1800 + rng.random() * 4200; dd = 0.12; tt = tarr(dd); sp = np.sin(2 * np.pi * f * tt) * expenv(dd, 8) * 0.25
        out[st:st + len(sp)] += stereo(sp, rng.uniform(-0.8, 0.8))
    return out

def place(buf, snd, t, gain=1.0):
    i = int(t * SR)
    if i < 0 or i >= len(buf): return
    n = min(len(snd), len(buf) - i); buf[i:i + n] += snd[:n] * gain

def build_events():
    ev = []; st = S.STARTS; fps = 30
    at = lambda sc, f: (st[sc] + f) / fps
    ev.append(("whip", 0.02, 0.9)); ev.append(("swish", at(0, 26), 0.7))
    for k, d in enumerate([4, 9, 14, 19]): ev.append(("tick", at(0, d), 0.6))
    for i, d in enumerate([12, 72, 132]): ev.append(("pop", at(1, d), 0.8)); ev.append(("tick", at(1, 70 + i * 60), 0.5))
    ev += [("rise", at(2, 40), 0.7), ("pop", at(2, 10), 0.8), ("pop", at(2, 70), 0.8), ("thud", at(2, 150), 1.0), ("tick", at(2, 90), 0.5), ("tick", at(2, 110), 0.5)]
    ev += [("pop", at(3, 10), 0.8), ("pop", at(3, 30), 0.7), ("pop", at(3, 90), 0.8)]
    for i, fr in enumerate([523.25, 659.25, 783.99, 1046.5, 1318.5]): ev.append(("ding", at(3, 110 + i * 8), 0.9, fr))
    for i in range(4): ev.append(("pop", at(4, 34 + i * 34), 0.8))
    for i in range(10): ev.append(("tick", at(5, 24 + i * 5), 0.35))
    for i in range(5): ev.append(("tick", at(5, 70 + i * 8), 0.5))
    ev += [("swish", at(6, 6), 0.8), ("thud", at(6, 6), 0.7), ("pop", at(7, 22), 0.9), ("burst", at(7, 26), 1.0), ("ding", at(7, 40), 0.7, 1046.5)]
    for i in range(1, len(S.SCENES)): ev.append(("whoosh", st[i] / fps - 0.05, 0.85))
    return ev

def music(total):
    n = int(total * SR); bpm = 108; beat = 60 / bpm; sixt = beat / 4
    chords = [(130.81, [261.63, 329.63, 392.0]), (98.0, [196.0, 246.94, 392.0]), (110.0, [220.0, 261.63, 329.63]), (87.31, [174.61, 220.0, 261.63])]
    bass = np.zeros(n); pad = np.zeros(n); arp = np.zeros((n, 2)); drums = np.zeros((n, 2)); kick_env = np.zeros(n)
    saw = lambda f, d: 2 * ((f * tarr(d)) % 1) - 1
    nbars = int(total / (beat * 4)) + 1
    for bar in range(nbars):
        t0 = bar * beat * 4; root, tones = chords[bar % 4]
        i0 = int(t0 * SR); dur = beat * 4; m = min(int(dur * SR), n - i0)
        if m <= 0: break
        tt = tarr(dur)[:m]; env = np.minimum(1, tt / 0.5) * np.minimum(1, (dur - tt) / 0.3)
        for f in tones: pad[i0:i0 + m] += saw(f, dur)[:m] * env * 0.05
        for k in range(8):  # باص 8ths
            ti = int((t0 + k * beat / 2) * SR); d = 0.24; bnote = root * (2 if k % 4 == 3 else 1); w = saw(bnote, d) * expenv(d, 5); mm = min(len(w), n - ti)
            if mm > 0: bass[ti:ti + mm] += w[:mm] * 0.32
        for k in range(16):  # أربيج 16ths (يدخل بعد المقدمة)
            ts = t0 + k * sixt
            if ts < 3.0: continue
            f = tones[[0, 1, 2, 1][k % 4]] * (2 if (k // 4) % 2 else 1); ti = int(ts * SR); d = 0.16; tt2 = tarr(d)
            w = (np.sign(np.sin(2 * np.pi * f * tt2)) * 0.5 + np.sin(2 * np.pi * f * tt2) * 0.5) * expenv(d, 7); mm = min(len(w), n - ti)
            if mm > 0: arp[ti:ti + mm] += stereo(w[:mm] * 0.07, -0.5 if k % 2 else 0.5)
        if t0 >= 4.2:   # درامز
            for b in range(4):
                tb = t0 + b * beat; ti = int(tb * SR); d = 0.2; tt3 = tarr(d)
                kk = np.sin(2 * np.pi * np.cumsum(150 * np.exp(-22 * tt3) + 45) / SR) * expenv(d, 9); mm = min(len(kk), n - ti)
                if mm > 0: drums[ti:ti + mm] += stereo(kk[:mm] * 0.9); kick_env[ti:ti + mm] = np.maximum(kick_env[ti:ti + mm], expenv(d, 5)[:mm])
                if b in (1, 3) and t0 >= 8.5:
                    cl = sos_filter(noise(0.14), "band", [1200, 4000]) * expenv(0.14, 10); mm = min(len(cl), n - ti)
                    if mm > 0: drums[ti:ti + mm] += stereo(cl[:mm] * 0.5)
                for hh in range(2):
                    th = int((tb + hh * beat / 2) * SR); hat = sos_filter(noise(0.05), "high", 7000) * expenv(0.05, 12) * (0.22 if hh == 0 else 0.3); mm = min(len(hat), n - th)
                    if mm > 0: drums[th:th + mm] += stereo(hat[:mm])
    bass = sos_filter(bass, "low", 650); pad = sos_filter(pad, "low", 1400)
    duck = 1 - 0.55 * kick_env
    m = np.stack([bass, bass], 1) * duck[:, None] + np.stack([pad, pad], 1) * duck[:, None] + arp * duck[:, None] * 0.9 + drums
    t = np.arange(n) / SR; m *= np.minimum(1, t / 0.8)[:, None] * np.minimum(1, (total - t) / 3.0)[:, None]
    return m * 0.75

def build(total, path=os.path.join(HERE, "audio.wav")):
    mus = music(total); sfx = np.zeros_like(mus)
    snd = dict(whoosh=whoosh, whip=whip, pop=pop, thud=thud, swish=swish, rise=rise, tick=tick, burst=burst, ding=ding)
    for e in build_events():
        kind, t, gain = e[0], e[1], e[2]
        s = ding(e[3]) if kind == "ding" else snd[kind]()
        place(sfx, s, t, gain)
    mix = mus * 0.5 + sfx * 0.9
    mix = np.tanh(mix * 1.2) / np.tanh(1.2); mix *= 0.89 / max(1e-6, np.abs(mix).max())
    wavfile.write(path, SR, (mix * 32767).astype(np.int16)); return path

if __name__ == "__main__":
    total = S.TOTAL / 30 + 0.2; p = build(total); print("wrote", p, round(total, 2), "s")
