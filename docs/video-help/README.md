# Help videos

Short videos (30 to 90 seconds, one idea each) shown to members after a child misses a question twice (flag `video-help`, off by default; `canUse(family, "videoHelp")`; owner, November 2026: members only).

## What exists
Thirty-six math videos, Grades 1 to 9, listed in `HELP_VIDEOS` (`src/lib/videoHelp.ts`): fractions as equal parts (3), multiplication as equal groups (3), division as sharing (3), tens and ones (2), making ten (1), equivalent fractions (5), tenths as decimals (4), area (5) and what percent means (6), then a second batch of thirteen: adding (1), taking away (1), skip counting (2), telling time (3), hundreds, tens and ones (3), tricks for fives and nines (4), rounding (4), comparing fractions (4), division with a remainder (5), ratios (6), order of operations (6), adding with negative numbers (7) and two-step equations (7). Each teaches what its unit's questions ask. A third batch of fourteen: teen numbers (1), adding to 100 (2), adding past ten (2), measuring with a ruler (2), adding to 1000 (3), multiplying by one digit (4), by two digits (5), hundredths (5), multiplying decimals (6), area of a triangle (6), fractions-decimals-percents (7), the Pythagorean theorem (8), squares and roots (8) and multiplying powers (9). Not yet covered: long division by the bus-stop method, mixed numbers and slope, which have no unit of their own to attach to. They were picked as the units children find hardest, by judgement, not data: there is no "missed twice" data yet. Once the `help` and `video` events have some history, pick the next ones from what children ask a grown-up about.

## How they are made
`scripts/help-videos/` makes everything from text, so a video is cheap to fix or add:
- `specs.py`: each video's narration and what is drawn on screen, step by step.
- `engine.py`: draws whiteboard frames with Pillow (Fredoka from `assets/fonts/`), times them to the narration, writes the captions (word for word the narration) and encodes with ffmpeg.
- Every frame carries the Gradelings character and wordmark in the bottom-right corner (`logo-icon.png` is `public/icon.svg` rendered; wordmark colours are `WORDMARK_COLOURS` in `src/lib/brand.ts`), and text is shrunk to stay inside a 36 px margin so nothing is cut off at the edges. Keep new elements out of the bottom-right corner.
- `build.py`: runs it. Narration is **Supertonic TTS** (owner, November 2026; voice F1), made ahead of time and baked into the file. In-app read-aloud stays Piper.
- `narration/<id>.txt`: the narration, one step per line (checked against the captions by `videoHelp.test.ts`).

```bash
python3 -m venv /tmp/st && /tmp/st/bin/pip install supertonic pillow numpy   # ffmpeg must be installed
/tmp/st/bin/python scripts/help-videos/build.py [video-id ...]               # all videos, or the ones named
```
The first run downloads the Supertonic model from Hugging Face. Output goes to `public/videos/help/<id>.mp4` and `.vtt` (about 300 KB each).

## Adding a video
1. Add it to `VIDEOS` in `scripts/help-videos/specs.py` (key `unit` is the unit key, `<grade>/<subject>/<unit id>`), and run `build.py <id>`.
2. Add its entry to `HELP_VIDEOS` in `src/lib/videoHelp.ts` (`seconds` from the file).
3. Narration names no region, money or brand (units shared by several provinces and states share the video). `npm test` checks the files, captions and wording.

## Behaviour
Hosted on our own domain, no third-party player or tracking. A native `<video>` with captions on; the file is copied to Cache Storage (`grademap-video`) when first watched, so it plays offline later (the service worker skips `/videos/`). Offline and never watched, or a failed load: the player says so and offers the text lesson. A watch is a `video` event; the parent Overview shows videos watched and how the next answer on that unit went.

## Before turning the flag on
Someone should watch each video once with sound. They are computer-voiced, drawn programmatically and have not been tried with children.
