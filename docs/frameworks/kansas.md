# Kansas

## Framework

- **Id and slug:** `us-ks`, `kansas`. Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: Kansas has no statewide French standards the app follows). Offered to families and in classroom mode.

## Standards

- Adopted by the Kansas State Board of Education: math (the Kansas Mathematics Standards, 2017, reviewed 2024; the 2017 codes, `4.NBT.1`; Grade 9 cites the high school standards with dots, `A.SSE.1`, `F.LQE.1`), English language arts (2023; `RL.4.2`, `W.5.10`; no Language strand; Grade 9 cites the 9-10 band, `RI.9-10.2`), science (the NGSS, 2013; `4-PS3-2`, middle school `MS-LS1-1` in any of Grades 6 to 8, high school `HS-LS2-6` in Grade 9) and history, government and social studies (2020; benchmarks `1.1` to `5.4`, the same in every grade, limited in Kindergarten to Grade 3 to the standards each grade teaches).
- Citations are `"CODES · text"` (`kss()` in `src/content/kansas/cite.ts`), checked by `src/content/kansas/contract.ts` against `docs/research/kansas/outcomes.json`. Sources are in `gradelings-research/kansas/source/`; `fetch.sh` downloads them again and `python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly. Record: `gradelings-research/kansas/README.md`.

## Content

- **Math, English language arts and science** follow Michigan's placement (and so California's), moved to Kansas's codes (`src/content/kansas/plan/`). Units Kansas teaches in another grade are left out (Grade 4 angle measure, Grade 8 systems of equations, Grade 5 patterns, Grade 9 number sets). Science units built around California places are `ks-` copies with Kansas examples (the tallgrass prairie and Flint Hills, Cheyenne Bottoms, mosasaurs and Monument Rocks chalk, tornado safety and Greensburg, wind farms, oil, gas and salt, the Ogallala Aquifer, the 2024 eclipse); borrowed units that name another state's places are filtered `ks-` copies (`localCopy`, `units/copies-g*.ts`).
- **Social studies** follows each grade's theme: a sense of self with the flag and Kansas's symbols (K); the role of individuals and local government (1); societies then and now with symbols, difference makers, journeys and trading (2); local and national communities with the people who moved to Kansas, and money and voting (3); **Kansas and the regions of the U.S.** (4: the land, first peoples, Bleeding Kansas and statehood, how Kansas grew, Kansans who stood up for fairness, governing Kansas, a timeline and the five regions, all Kansas's own units); U.S. history to 1789 with the Eastern Woodland peoples and explorers in Kansas (5); the ancient world (6); global geography and a Kansas History unit (7, because schools teach one or the other); U.S. history 1789 to 1898 with Kansas and the nation and the new nation (8); and Government of the United States with governing Kansas, personal finance and economics (9).
- Kansas-only units (`ks-` ids, `bankUnit` in `own.ts`) are in `src/content/kansas/units/`, each with a lesson in `src/content/kansas/lessons/`. No borrowed unit may name another state's places (`OTHER_STATE` in `units/kit.ts`) outside United States history and civics, and other states' Tribal units are never borrowed (`kansas.test.ts`).
- **Native content:** the Kansa (Kaw), Osage, Wichita and Pawnee, the nations moved to Kansas under Indian removal, and the four nations with reservations in Kansas today (the Prairie Band Potawatomi Nation, the Kickapoo Tribe in Kansas, the Iowa Tribe of Kansas and Nebraska, and the Sac and Fox Nation of Missouri in Kansas and Nebraska) are named in the present tense as living nations with their own governments; removal and broken treaties are told plainly and briefly; nothing sacred or ceremonial. Light, and needs partner review before it grows.

## Report card

- Kansas has no statewide report card; each district chooses its own, so the app uses the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding).
- State tests: the Kansas Assessment Program (KAP) in English language arts and math (grades 3 to 8 and 10) and science (grades 5, 8 and 11), reported as scale scores from 400 to 700 in four levels (Levels 3 and 4 meet expectations; cut scores 510 and 540 on every test; a new scale since 2025). Social studies has classroom-based assessments in grades 4, 7 and once in high school. The Kansas Report Card website reports on schools. The Blueprint for Literacy (2024) is on the report card page.

## Parent guides

- `src/content/kansas/guides.ts`, US English: the hub, grade notes for Kindergarten to Grade 9, the eight Standards for Mathematical Practice (`/guides/kansas/math-practices/`) and state tests (`/guides/kansas/state-tests/`; dates point to KSDE). No French guide.

## Schools

- **Kansas.** `/privacy/` (`src/content/kansas/schools.ts`) states our commitments under the Kansas Student Data Privacy Act (K.S.A. 72-6312 to 72-6320): saying what we collect and how it is used, a data-sharing agreement with the school setting out purpose, scope and duration, using student information only for those purposes, following its access, use and security rules, no sale or advertising, contracts that bind our service providers to the same rules, no biometric data or reading of a student's physical or emotional state (72-6315), no surveys about personal attitudes, values or beliefs (72-6316), telling the school at once about a breach so families can be told immediately (72-6318), and deleting student information when no longer needed, when the agreement ends or within 30 days when the school asks. The Act asks for destruction to NIST SP 800-88; confirm with the school that our deletion meets its agreement before signing. FERPA and COPPA apply as everywhere.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit.
- Grade 9 science covers the high school life science, physical science and Earth science topics that other states' units teach; not every high school performance expectation is cited.
- Native content is light and needs partner review before it grows.
- Grade 7 practises both global geography and Kansas history, since districts choose one; high school World Civilizations and U.S. History are not taught in Grade 9.
- Math units for skills Kansas teaches in a different grade from the Common Core were left out rather than moved; Grade 8 has no systems-of-equations unit and Grade 4 no angle measure unit.
