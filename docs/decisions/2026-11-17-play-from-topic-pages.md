# Let visitors play from topic pages (2026-11-17)

Melvin approved this from the traffic review: unit pages such as Newton's laws and the water cycle sent many app clicks but few subscribes.

**Decision:** the sample questions on a unit's public page play as a short run with no sign-up (`PracticeSession`, `TryChoices`). The app link no longer shows after every question; after 3 answered (or all of them when fewer than 3 are tap-to-answer) a card says how many were right on the first try and invites the visitor to keep going in the app on that unit, with the free-trial line from `TRIAL_DAYS`.

**Tracking:** one Vercel Web Analytics custom event, `Sample questions done`, with the page path only (no answers, no child data). No pixels. The existing "Start trial" count still measures the click that follows.

**Check next:** compare `Start trial` and Subscribe clicks per page in the admin Traffic tab against `Sample questions done`.
