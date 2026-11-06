"""Builds screen-recorded help videos: python3 screens.py <screens/spec.json> [video-id ...]
Narration (Supertonic) is made first so each step lasts at least as long as its line, then record-screens.mjs
records the real parent area (demo child only), then audio, captions and the Gradelings logo are put together
with ffmpeg. Needs the dev or production server running (BASE, default http://localhost:3000)."""
import json, subprocess, sys, tempfile, wave
from pathlib import Path
import numpy as np
from engine import ROOT, make_logo, vtt_time, cues

HERE = Path(__file__).parent
OUT_W, OUT_H = 960, 540

def main():
    from supertonic import TTS
    spec_path = Path(sys.argv[1]).resolve(); want = set(sys.argv[2:])
    spec = json.loads(spec_path.read_text())
    out = ROOT / "public" / "videos" / "parents"; nar = HERE / "narration"
    out.mkdir(parents=True, exist_ok=True); nar.mkdir(exist_ok=True)
    tts = TTS(auto_download=True); style = tts.get_voice_style(voice_name="F1"); sr = tts.sample_rate
    for v in spec["videos"]:
        if want and v["id"] not in want: continue
        with tempfile.TemporaryDirectory() as t:
            tmp = Path(t)
            waves = []
            for s in v["steps"]:
                w, _ = tts.synthesize(s["say"], voice_style=style, lang="en", speed=0.95)
                waves.append(np.asarray(w, dtype=np.float32).reshape(-1))
            gap = 0.6
            (tmp / "d.json").write_text(json.dumps([len(w) / sr + gap for w in waves]))
            subprocess.run(["node", str(HERE / "record-screens.mjs"), str(spec_path), v["id"], str(tmp / "d.json"), str(tmp / "r.json"), str(tmp / "r.webm")], check=True, cwd=HERE)
            r = json.loads((tmp / "r.json").read_text()); starts = r["starts"]
            lead = 0.3
            total = starts[-1] + len(waves[-1]) / sr + 1.0
            audio = np.zeros(int(sr * (total + lead)), dtype=np.float32)
            for st, w in zip(starts, waves):
                i = int(sr * (st + lead)); audio[i:i + len(w)] = w
            with wave.open(str(tmp / "a.wav"), "wb") as f:
                f.setnchannels(1); f.setsampwidth(2); f.setframerate(sr)
                f.writeframes((np.clip(audio, -1, 1) * 32767).astype(np.int16).tobytes())
            from PIL import Image, ImageDraw
            lg = make_logo(); pill = Image.new("RGBA", (lg.width + 24, lg.height + 14), (0, 0, 0, 0))
            ImageDraw.Draw(pill).rounded_rectangle([0, 0, pill.width - 1, pill.height - 1], radius=16, fill=(255, 250, 240, 235))
            pill.alpha_composite(lg, (12, 7)); pill.save(tmp / "logo.png")
            mp4 = out / f"{v['id']}.mp4"
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{max(0, r['trim'] - lead):.2f}", "-i", str(tmp / "r.webm"), "-i", str(tmp / "a.wav"), "-i", str(tmp / "logo.png"),
                "-filter_complex", f"[0:v]fps=15,scale={OUT_W}:{OUT_H}[b];[b][2:v]overlay=W-w-10:H-h-8[o]", "-map", "[o]", "-map", "1:a",
                "-c:v", "libx264", "-preset", "medium", "-crf", "30", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "64k", "-t", f"{total + lead:.2f}", "-movflags", "+faststart", str(mp4)], check=True)
            vtt = ["WEBVTT", ""]
            for st, w, s in zip(starts, waves, v["steps"]):
                for c0, c1, text in cues(s["say"], st + lead, st + lead + len(w) / sr):
                    vtt += [f"{vtt_time(c0)} --> {vtt_time(c1)}", text, ""]
            (out / f"{v['id']}.vtt").write_text("\n".join(vtt), encoding="utf-8")
            (nar / f"{v['id']}.txt").write_text("\n".join(s["say"] for s in v["steps"]) + "\n", encoding="utf-8")
            print(f"{v['id']}: {total + lead:.1f}s, {mp4.stat().st_size // 1024} KB")

if __name__ == "__main__":
    main()
