# Help videos

Short videos (30 to 90 seconds, one idea each) shown to members after a child misses a question twice (flag `video-help`, off by default; `canUse(family, "videoHelp")`).

## Status
`public/videos/help/sample-fractions.*` is a **placeholder** (a silent coloured clip with two caption lines) wired to Grade 3 math "fractions" so the feature can be tried. It must be replaced before the flag goes on for anyone.

## Narration
Owner's decision (November 2026): narration is made with **Supertonic TTS**, rendered ahead of time and baked into each file. This does not touch in-app read-aloud, which stays on Piper. Write the narration as `<id>.txt` beside the video, one caption cue per sentence, and keep the captions (`<id>.vtt`) word for word the same as the narration.

## Adding a video
1. Put `<id>.mp4` (H.264 + AAC, 640x360 or larger, under 3 MB) and `<id>.vtt` in `public/videos/help/`.
2. Add an entry to `HELP_VIDEOS` in `src/lib/videoHelp.ts` (key: the unit key, `<grade>/<subject>/<unit id>`; units shared by several provinces share the video, so it must name no region or money).
3. `npm test` (videoHelp.test.ts checks the files exist and the captions parse).

## Behaviour
Hosted on our own domain, no third-party player or tracking. Played in a native `<video>` with captions on; the file is copied to Cache Storage (`grademap-video`) when first watched, so it plays offline later. Offline and never watched, or a failed load: the player says so and offers the text lesson ("Show me another way"). The watch is logged as a `video` event; the parent Overview shows videos watched and how the next answer on that unit went.
