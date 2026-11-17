# Math Facts: quick recall and spaced review

Melvin, November 17, 2026 (idea borrowed from a review of Math Builders; "do 1, 2, 3").

- A math fact is **automatic** (quick recall) when it is known and its last two right answers were each within a pace for its operation (`FACT_PACE_MS`: adding 5 s, taking away 6 s, times 6 s, dividing 7 s; the answer event's `ms`). It is worked out from events, never stored. Answers over a minute or with no time never count as quick.
- **No visible timer by default.** Speed is measured quietly; Calm mode and the timer settings are unchanged. Chart cells for quick facts get their own look ("Quick" in the legend), and parents see "N with quick recall" in Reports and the weekly email.
- **Spaced review** per fact: a review box (0 to 6) goes up on a quick right answer, stays on a slow right one and resets on a miss, and sets the next due day (0, 1, 2, 4, 8, 16, 32 days). Facts known but slow keep coming until quick; automatic facts come back mostly when due.
- "Known" keeps its old rule (two first-try rights), so trophies and existing reports don't change.
- Practice, not a report-card mark.
