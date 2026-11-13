# Voice practice is on by default for Pre-K to Grade 1

Melvin, November 9, 2026: "auto download whisper for pre-k up to grade 1 students. And that should be auto enabled for existing users."

- Flag `voice-practice` now defaults on (the database state still wins if it was set). Per child, `ChildSettings.voice` unset follows the grade (`voiceOn`, `VOICE_GRADES` in `src/lib/model.ts`): on for Pre-K, Kindergarten and Grade 1. A parent's explicit choice, on or off, always wins, so no migration rewrites anyone's settings and existing children get it at once.
- The model (about 60 MB, `src/lib/whisper.ts`) downloads in the background (`WhisperPreload`, `autoDownloadWhisper`, flag `voice-auto-download`) once the kids' app is up and a child on the device has voice on. It holds back on mobile data, Data Saver, 2G, offline, low storage, automated browsers and class student accounts, retries every 10 minutes up to 3 times, and never runs again after a parent used "Remove the download" on that device (downloading by hand clears that).
- Unchanged: audio is understood on the device and never stored or uploaded, class student accounts never listen, and a child can always tap instead. The microphone permission is asked only when a child first answers aloud.
