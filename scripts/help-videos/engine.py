"""Renders a help video from a spec: narration by Supertonic TTS, whiteboard-style frames drawn with Pillow,
encoded with ffmpeg. See README.md. Usage: python build.py [video-id ...]"""
import math, subprocess, wave
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont

W, H, FPS = 960, 540, 15
ROOT = Path(__file__).resolve().parents[2]
FONTS = ROOT / "assets" / "fonts"
BG, INK, PALE, GRID = (255, 250, 240), (15, 23, 42), (226, 232, 240), (148, 163, 184)
BLUE, PINK, GREEN, ORANGE = (79, 142, 247), (233, 85, 154), (37, 180, 126), (255, 150, 54)
_fonts = {}


def font(kind, size):
    key = (kind, size)
    if key not in _fonts:
        _fonts[key] = ImageFont.truetype(str(FONTS / ("fredoka-700.woff" if kind == "f" else "andika-400.woff")), size)
    return _fonts[key]


def ease(x):
    x = max(0.0, min(1.0, x))
    return x * x * (3 - 2 * x)


# ---- elements: each draws onto an RGBA layer; q (0..1) animates counts for shapes that grow ----
def e_text(d, el, q):
    d.text((el["x"], el["y"]), el["s"], font=font(el.get("font", "f"), el.get("size", 40)), fill=el.get("color", INK), anchor=el.get("anchor", "mm"))


def e_frac(d, el, q):
    x, y, size, col = el["x"], el["y"], el.get("size", 56), el.get("color", INK)
    f = font("f", size)
    d.text((x, y - size * 0.62), str(el["top"]), font=f, fill=col, anchor="mm")
    wid = max(d.textlength(str(el["top"]), font=f), d.textlength(str(el["bottom"]), font=f)) + 14
    d.line([(x - wid / 2, y), (x + wid / 2, y)], fill=col, width=max(3, size // 12))
    d.text((x, y + size * 0.62), str(el["bottom"]), font=f, fill=col, anchor="mm")


def e_pie(d, el, q):
    cx, cy, r, n, shade = el["cx"], el["cy"], el["r"], el["n"], el.get("shade", 0)
    col = el.get("color", BLUE)
    shown = el.get("frm", 0) + (shade - el.get("frm", 0)) * (q if el.get("animate") else 1)
    box = [cx - r, cy - r, cx + r, cy + r]
    d.ellipse(box, fill=PALE if n > 1 else (255, 255, 255), outline=INK, width=4)
    for i in range(n):
        a0, a1 = -90 + 360 * i / n, -90 + 360 * (i + 1) / n
        frac = max(0.0, min(1.0, shown - i))
        if frac > 0:
            d.pieslice(box, a0, a0 + (a1 - a0) * frac, fill=col)
    if n > 1:
        for i in range(n):
            a = math.radians(-90 + 360 * i / n)
            d.line([(cx, cy), (cx + r * math.cos(a), cy + r * math.sin(a))], fill=INK, width=4)
    d.ellipse(box, outline=INK, width=4)


def e_bar(d, el, q):
    x, y, w, h, n, shade = el["x"], el["y"], el["w"], el["h"], el["n"], el.get("shade", 0)
    shown = el.get("frm", 0) + (shade - el.get("frm", 0)) * (q if el.get("animate") else 1)
    for i in range(n):
        frac = max(0.0, min(1.0, shown - i))
        x0, x1 = x + w * i / n, x + w * (i + 1) / n
        d.rectangle([x0, y, x1, y + h], fill=PALE, outline=INK, width=4)
        if frac > 0:
            d.rectangle([x0, y, x0 + (x1 - x0) * frac, y + h], fill=el.get("color", BLUE), outline=INK, width=4)


def e_grid(d, el, q):
    x, y, rows, cols, cell, gap = el["x"], el["y"], el["rows"], el["cols"], el["cell"], el.get("gap", 4)
    filled = int(round(el.get("filled", 0) * (q if el.get("animate") else 1)))
    for i in range(rows * cols):
        r, c = divmod(i, cols)
        x0, y0 = x + c * (cell + gap), y + r * (cell + gap)
        d.rectangle([x0, y0, x0 + cell, y0 + cell], fill=el.get("color", BLUE) if i < filled else (255, 255, 255), outline=INK, width=3)


def e_groups(d, el, q):
    """n boxes side by side, each holding `per` dots."""
    x, y, n, per, r = el["x"], el["y"], el["n"], el["per"], el.get("r", 14)
    cols = el.get("cols", 2)
    rows = math.ceil(per / cols)
    bw, bh = cols * (2 * r + 8) + 16, rows * (2 * r + 8) + 16
    total = n * per
    shown = int(round(total * (q if el.get("animate") else 1))) if el.get("deal") else total
    for g in range(n):
        gx = x + g * (bw + 30) - (n * bw + (n - 1) * 30) / 2
        d.rounded_rectangle([gx, y, gx + bw, y + bh], radius=18, fill=(255, 255, 255), outline=INK, width=4)
        for k in range(per):
            idx = (k * n + g) if el.get("deal") else g * per + k
            if idx >= shown and el.get("deal"):
                continue
            rr, cc = divmod(k, cols)
            cx, cy = gx + 16 + r + 4 + cc * (2 * r + 8), y + 16 + r + 4 + rr * (2 * r + 8)
            d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=el.get("color", ORANGE), outline=INK, width=3)


def e_blocks(d, el, q):
    x, y, tens, ones = el["x"], el["y"], el.get("tens", 0), el.get("ones", 0)
    for t in range(tens):
        tx = x + t * 46
        d.rectangle([tx, y, tx + 34, y + 200], fill=BLUE, outline=INK, width=3)
        for s in range(1, 10):
            d.line([(tx, y + s * 20), (tx + 34, y + s * 20)], fill=INK, width=2)
    ox = x + tens * 46 + 30
    for o in range(ones):
        oy = y + 200 - (o + 1) * 40
        d.rectangle([ox, oy + 4, ox + 34, oy + 38], fill=ORANGE, outline=INK, width=3)


def e_line(d, el, q):
    d.line(el["pts"], fill=el.get("color", INK), width=el.get("width", 5))
    if el.get("arrow"):
        (x0, y0), (x1, y1) = el["pts"][-2], el["pts"][-1]
        a = math.atan2(y1 - y0, x1 - x0)
        for s in (-1, 1):
            d.line([(x1, y1), (x1 - 18 * math.cos(a + s * 0.5), y1 - 18 * math.sin(a + s * 0.5))], fill=el.get("color", INK), width=el.get("width", 5))


def e_rect(d, el, q):
    d.rectangle(el["box"], fill=el.get("fill"), outline=el.get("color", INK), width=el.get("width", 4))


def e_numberline(d, el, q):
    x, y, w, lo, hi, step = el["x"], el["y"], el["w"], el["lo"], el["hi"], el["step"]
    d.line([(x, y), (x + w, y)], fill=INK, width=5)
    n = int(round((hi - lo) / step))
    for i in range(n + 1):
        px = x + w * i / n
        d.line([(px, y - 14), (px, y + 14)], fill=INK, width=4)
        v = lo + i * step
        d.text((px, y + 40), el.get("fmt", "{:g}").format(round(v, 6)), font=font("f", 28), fill=INK, anchor="mm")
    for val, col, label in el.get("marks", []):
        px = x + w * (val - lo) / (hi - lo)
        d.ellipse([px - 16, y - 16, px + 16, y + 16], fill=col, outline=INK, width=4)
        d.text((px, y - 50), label, font=font("f", 34), fill=col, anchor="mm")


DRAW = {"text": e_text, "frac": e_frac, "pie": e_pie, "bar": e_bar, "grid": e_grid, "groups": e_groups, "blocks": e_blocks, "line": e_line, "rect": e_rect, "numberline": e_numberline}


def frame(spec_title, els, p):
    img = Image.new("RGBA", (W, H), BG + (255,))
    d = ImageDraw.Draw(img)
    d.text((W / 2, 46), spec_title, font=font("f", 40), fill=BLUE, anchor="mm")
    d.line([(60, 82), (W - 60, 82)], fill=PALE, width=4)
    for el in els:
        at = el.get("at", 0)
        if p < at:
            continue
        q = ease((p - at) / 0.3)
        alpha = 1.0 if at == 0 else ease((p - at) / 0.1)
        if alpha >= 1.0:
            DRAW[el["t"]](d, el, 1.0 if at == 0 and not el.get("animate") else q)
        else:
            layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            DRAW[el["t"]](ImageDraw.Draw(layer), el, q)
            layer.putalpha(layer.getchannel("A").point(lambda v: int(v * alpha)))
            img = Image.alpha_composite(img, layer)
            d = ImageDraw.Draw(img)
    return img.convert("RGB")


def vtt_time(s):
    return f"{int(s // 60):02d}:{s % 60:06.3f}"


def cues(text, start, end):
    """Splits a long sentence into caption cues of at most ~80 characters, timed by length."""
    parts, cur = [], ""
    for w in text.split():
        if cur and len(cur) + len(w) + 1 > 80 and cur[-1] in ".,;:!?":
            parts.append(cur); cur = w
        else:
            cur = (cur + " " + w).strip()
    parts.append(cur)
    total = sum(len(p) for p in parts)
    out, t = [], start
    for p in parts:
        dur = (end - start) * len(p) / total
        out.append((t, t + dur, p)); t += dur
    return out


def build(video, out_dir, tts, style, tmp):
    title, steps = video["title"], video["steps"]
    sr = tts.sample_rate
    lead, gap = 0.5, 0.45
    audio = [np.zeros(int(sr * lead), dtype=np.float32)]
    timings, t = [], lead
    for s in steps:
        wav, dur = tts.synthesize(s["say"], voice_style=style, lang="en", speed=0.95)
        wav = np.asarray(wav, dtype=np.float32).reshape(-1)
        timings.append((t, t + len(wav) / sr))
        audio += [wav, np.zeros(int(sr * gap), dtype=np.float32)]
        t += len(wav) / sr + gap
    pcm = (np.clip(np.concatenate(audio), -1, 1) * 32767).astype(np.int16)
    wav_path = tmp / f"{video['id']}.wav"
    with wave.open(str(wav_path), "wb") as f:
        f.setnchannels(1); f.setsampwidth(2); f.setframerate(sr); f.writeframes(pcm.tobytes())
    total = t
    mp4 = out_dir / f"{video['id']}.mp4"
    proc = subprocess.Popen(
        ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-i", str(wav_path),
         "-c:v", "libx264", "-preset", "medium", "-crf", "30", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "64k", "-shortest", "-movflags", "+faststart", str(mp4)],
        stdin=subprocess.PIPE)
    nframes = int(math.ceil(total * FPS))
    for i in range(nframes):
        ts = i / FPS
        idx = 0
        for k, (a, b) in enumerate(timings):
            if ts >= a - gap / 2: idx = k
        a, b = timings[idx]
        p = max(0.0, min(1.0, (ts - a) / max(0.1, b - a)))
        proc.stdin.write(frame(title, steps[idx]["els"], p).tobytes())
    proc.stdin.close(); proc.wait()
    vtt = ["WEBVTT", ""]
    for (a, b), s in zip(timings, steps):
        for c0, c1, text in cues(s["say"], a, b):
            vtt += [f"{vtt_time(c0)} --> {vtt_time(c1)}", text, ""]
    (out_dir / f"{video['id']}.vtt").write_text("\n".join(vtt), encoding="utf-8")
    return round(total, 1)
