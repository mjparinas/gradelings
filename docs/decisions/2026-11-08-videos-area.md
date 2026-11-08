# Videos area for rewatching help videos

Melvin, November 8, 2026: whenever a student views a help video, keep track of what was unlocked, and give them a Videos area that shows the watched videos and the ones waiting to be unlocked, so they can rewatch them.

- Unlocked is derived from the child's `video` events (never stored), so it merges across devices and survives sync like everything else.
- Rewatching from the Videos area logs nothing, so the parent Overview's watched count and the after-video answer stats stay honest.
- Same flag (`video-help`) and members-only rule as the help videos themselves.
