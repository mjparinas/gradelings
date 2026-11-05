"""Builds the help videos: python3 build.py [video-id ...]. Needs `pip install supertonic` (downloads the model
on first run), Pillow, numpy and ffmpeg. Writes public/videos/<set>/<id>.mp4 (set: help, or teachers with --set teachers) + .vtt and narration/<id>.txt."""
import sys, tempfile
from pathlib import Path
from engine import ROOT, build

def main():
    from supertonic import TTS
    args = sys.argv[1:]
    # `--set teachers` builds the teacher training videos (teacher_specs.py) into public/videos/teachers/.
    group = args[args.index("--set") + 1] if "--set" in args else "help"
    if "--set" in args:
        del args[args.index("--set"):args.index("--set") + 2]
    if group == "teachers":
        from teacher_specs import VIDEOS
    else:
        from specs import VIDEOS
    want = set(args)
    out = ROOT / "public" / "videos" / group
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
