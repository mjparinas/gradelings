"""Builds the help videos: python3 build.py [video-id ...]. Needs `pip install supertonic` (downloads the model
on first run), Pillow, numpy and ffmpeg. Writes public/videos/help/<id>.mp4 + .vtt and narration/<id>.txt."""
import sys, tempfile
from pathlib import Path
from engine import ROOT, build
from specs import VIDEOS

def main():
    from supertonic import TTS
    want = set(sys.argv[1:])
    out = ROOT / "public" / "videos" / "help"
    nar = Path(__file__).parent / "narration"
    out.mkdir(parents=True, exist_ok=True); nar.mkdir(exist_ok=True)
    tts = TTS(auto_download=True)
    style = tts.get_voice_style(voice_name="F1")
    with tempfile.TemporaryDirectory() as tmp:
        for v in VIDEOS:
            if want and v["id"] not in want: continue
            secs = build(v, out, tts, style, Path(tmp))
            (nar / f"{v['id']}.txt").write_text("\n".join(s["say"] for s in v["steps"]) + "\n", encoding="utf-8")
            print(f"{v['id']}: {secs}s -> {(out / (v['id'] + '.mp4')).stat().st_size // 1024} KB")

if __name__ == "__main__":
    main()
