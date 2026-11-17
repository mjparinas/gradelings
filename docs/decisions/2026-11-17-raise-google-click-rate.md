# Raise the Google click rate (2026-11-17)

Melvin approved working on Search Console numbers: 84k impressions, 2.5% click rate, average position 11.5.

- Report-card pages lead with the thing people type ("{region} report card levels explained: what ... mean") and a description that promises a plain-words decode and a way to help. Each also links every grade's help-at-home guide.
- Unit pages' first title candidate says "free ... practice" (the shorter old titles remain as fallbacks for the 70-character limit), and each unit now links every other unit in its course so pages ranking low (position 15+) get internal links.
- Copy still says "Pre-K to Grade 9" and never the old name. Titles stay checked by `src/app/titles.test.ts`.

## Follow-up: worksheet pages link to their neighbours

Each printable practice sheet under `/guides/{framework}/{grade}/{subject}/worksheet/` now has a "More free printable sheets" list (screen only) linking the grade's other subjects' sheets and the same subject in the grade before and after. The worksheet pages rank in Google, so this gives them more internal links in every framework, with no content change.
