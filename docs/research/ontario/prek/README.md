# Ontario Junior Kindergarten research record

**Source:** *The Kindergarten Curriculum* (2026), Ontario Ministry of Education, read from the curriculum site's content
API (see `../README.md`). Ontario Kindergarten is one two-year program: Junior Kindergarten (Pre-K in the app, shown as
"Junior Kindergarten") and Kindergarten work on the same expectations. So Junior Kindergarten units cite the same
specific expectations as Kindergarten units, for example `A6.4` (subitize quantities to 5).

## Files

- `fetch.sh` refreshes `../source/` and `../expectations.json` with the parent folder's scripts, then rebuilds here.
- `build_outcomes.py` reads the `k/all` expectations from `../expectations.json` and writes `outcomes.json`
  (`{"pk/<subject>": [{idx, text}]}`), listing each specific expectation under the subjects that may cite it.
  `src/content/ontario/contract.ts` checks every Junior Kindergarten citation against it.
