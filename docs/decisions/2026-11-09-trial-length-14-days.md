# Free trial is 14 days (Melvin, November 9, 2026)

The free trial is 14 days with everything on and no card, down from 30. It is set once, as `TRIAL_DAYS` in `src/lib/plan.ts`.

**Why:** most competitors give families no trial (IXL, Prodigy) and only Reading Eggs is confirmed at 30 days (`gradelings-research/competitors.md`). The first 2 units of every course stay free forever, so 30 days was a lot to give away. Melvin wants to stay competitive and treat families more delightfully, not give the product away.

**How to apply:** never write the trial length in copy or code; read `TRIAL_DAYS`. Nudge timings derive from it in `plan.ts` (`TRIAL_RECAP_DAYS_LEFT`, `TRIAL_NOTICE_DAYS`, `TRIAL_FINAL_STRETCH_DAYS`). Families that signed up earlier keep their stored end date. Worth judging against the retention and trial-to-paid tables in the admin panel.
