# Oklahoma

## Framework

- **Id and slug:** `us-ok`, `oklahoma`. Pre-K and Kindergarten to Grade 9 in math, English language arts, science and social studies (no French). In `FRAMEWORKS`, offered to families and in classroom mode, like the other states.
- **Pre-K:** the 26 shared Pre-K units (`src/content/grades/pk/`), cited by the pre-kindergarten standards of the Oklahoma Academic Standards by their own codes (`PK.N.2.2`, `PK.S.3`); they have no social and emotional strand, so feelings cites respect for others (`PK.1.2`) (`src/content/oklahoma/pk.ts`), checked against `docs/research/oklahoma/prek/outcomes.json` (sources in `source/`, `fetch.sh`, `build_outcomes.py`). Practice steps only.

## Standards

- The Oklahoma Academic Standards (State Board of Education, published by the Oklahoma State Department of Education): math (2022; `4.N.2.2`; Grade 8 is Pre-Algebra, `PA.A.2.3`, and Grade 9 Algebra 1, `A1.F.1.2`), English language arts (2021; `4.3.R.5`, `K.2.PA.3`), science (2026; `4.PS3.2`, engineering by band `G35.ETS1.2`; Grade 9 cites Physical Science, `PS.PS1.1`, and Biology, `B.LS1.1`) and social studies (2026; `3.C.2.4`; Grade 9 cites Oklahoma History and Government, `OKH.C.4.5`, and United States Government, `USG.C.3.3`).
- Citations are `"CODES · text"` (`oks()` in `src/content/oklahoma/cite.ts`), checked by `contract.ts` against `docs/research/oklahoma/outcomes.json` (sources in `source/`, downloaded by `fetch.sh`; rebuild with `python3 -I build_outcomes.py`; record: `docs/research/oklahoma/README.md`).

## Content

- Math and English language arts use the shared BC, California and Washington units with Oklahoma codes (`src/content/oklahoma/plan/`). Science keeps the NGSS grades to Grade 5 and Oklahoma's own middle school placement, copying units from whichever grade teaches the topic (each grade file's `POOL`).
- Social studies follows the 2026 standards: the world around me (K), our nation's symbols, maps and economy (1), government, Tribal governments and the continents (2), **Oklahoma studies (3, Oklahoma's own units)**, United States geography and early history (4), the colonies to Jefferson (5), the Western Hemisphere (6), the Eastern Hemisphere (7), United States history from 1754 to 1877 (8), and **Oklahoma History and Government (9, Oklahoma's own units)** with United States Government.
- Oklahoma-only units (`ok-` ids, `bankUnit` in `own.ts`, `timelineUnit` in `units/kit.ts`) are in `src/content/oklahoma/units/`, plus filtered `ok-` copies (`localCopy` and `copyOf` in `units/copies-g*.ts` and `units/social-g9.ts`) of other states' units with Oklahoma examples. Their lessons are in `src/content/oklahoma/lessons/`, attached with `withLessons` in each grade file, together with the lessons of units adopted from another grade.
- No unit Oklahoma uses may name another state's places (`OTHER_STATE` in `units/kit.ts`) outside United States geography and history, and other states' Tribal units are never borrowed (`oklahoma.test.ts`).
- Tribal nations' content is light, in the present tense, about living nations with their own governments, with nothing sacred or ceremonial; removal, allotment, segregation and the Tulsa Race Massacre are told plainly.

## Report card

- No statewide scale for Kindergarten to Grade 8; districts choose their report cards, so the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding). State tests are OSTP (English language arts and math in grades 3 to 8, science in grades 5 and 8), and the Strong Readers Act's reading screening covers kindergarten to 3rd grade.

## Parent guides

- `src/content/oklahoma/guides.ts`, US English: the hub, grade notes for Pre-K to Grade 9, the seven Mathematical Actions and Processes (`/guides/oklahoma/math-actions/`; Oklahoma has no statewide SEL standards for students) and OSTP (`/guides/oklahoma/state-tests/`; dates point to the Department). No French guide.

## Schools

- `/privacy/` (`src/content/oklahoma/schools.ts`) states our commitments under the Student Data Accessibility, Transparency and Accountability Act (70 O.S. section 3-168) and FERPA: no targeted advertising, no profile beyond the school's purposes, no sale or rental, sharing only with the school and contractually bound providers, reasonable security, and deletion when the school asks. COPPA applies as everywhere. Before signing with a district, ask which data agreement it uses.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit; some social studies objectives have no unit (listed in `docs/research/oklahoma/README.md`); Tribal nations' content needs partner review before it grows; the math standards' review begins in January 2027, so recheck the codes then.
