# Kentucky

## Framework

- **Id and slug:** `us-ky`, `kentucky`. Pre-K and Kindergarten to Grade 9 in math, reading and writing, science and social studies (no French). It is in `FRAMEWORKS`, offered to families and in classroom mode, like the other states.
- **Pre-K:** the 26 shared Pre-K units (`src/content/grades/pk/`), each citing a benchmark of the Kentucky Early Childhood Standards for three- and four-year-olds as domain and number (`Mathematics 1.1`, `Social Studies 1.5`; `src/content/kentucky/pk.ts`), checked against `docs/research/kentucky/prek/outcomes.json` (PDF in `source/`, `fetch.sh`, `build_outcomes.py`). Practice steps only.

## Standards

- The Kentucky Academic Standards, published by the Kentucky Department of Education: mathematics (2019; `KY.4.NBT.1`, Grade 9 cites the high school codes, `KY.HS.A.12`), reading and writing (2025; `RL.4.2`, `RI.4.5`, composition `C.4.1`, language `L.4.4`, foundational skills `RF.2.3`; Grade 9 cites the 9-10 band, `RL.9-10.1`), science (2022, built on the Next Generation Science Standards; `4-PS3-2`; Kentucky places each middle school expectation in one grade and numbers it with that grade, `6-ESS2-4`, `7-PS3-1`, `8-LS4-4`, with engineering as `MS-ETS1-1`; Grade 9 cites `HS-` expectations) and social studies (2022; `4.H.CH.1`, `K.C.KGO.2`; Grade 9 cites the high school civics, economics and Kentucky government codes, `HS.C.KGO.1`, `HS.E.MA.5`).
- Citations are `"CODES · text"` (`kyc()` in `src/content/kentucky/cite.ts`), checked by `src/content/kentucky/contract.ts` against `docs/research/kentucky/outcomes.json` (1,359 standards). `fetch.sh` downloads the sources again with plain `curl` and a browser user agent; `python3 -I build_outcomes.py` rebuilds the JSON exactly, and `--check` says whether it is up to date. Record: `gradelings-research/kentucky/README.md`.

## Content

- Math, reading and writing, and science in Kindergarten to Grade 5 follow California's placement with Kentucky codes (`src/content/kentucky/plan/`). Grades 6 to 8 science follows Kentucky's own placement: Earth and space, ecosystems and particles in 6; forces, energy, waves, cells and reactions in 7; heredity, evolution, Earth's history and human impacts in 8.
- Social studies follows the 2022 grade themes: Myself and My Community (K, with community leaders and Kentucky's symbols), Impact on Community and State (1, Kentucky's government, symbols and regions), North American Interactions (2, with Kentucky's resources and laws), Global Interactions (3, with Kentucky's trade and world inventors), Migration and Settlement (4, Colonial America and colonial Kentucky), Colonization to Constitution (5, with Kentucky in the Revolution and citizenship), the Development of Civilizations (6, ancient river valleys, Greece and Rome, and their mark on Kentucky's government), the Growth and Expansion of Civilization from 600 to 1600 (7), the United States from 1600 to 1877 (8, with Kentucky's part in it and its early economy), and civics, economics and personal finance (9, with governing Kentucky).
- Kentucky-only units (`ky-` ids, `bankUnit` in `own.ts`) are in `src/content/kentucky/units/`, plus filtered `ky-` copies (`copyOf` and `localCopy` in `units/kit.ts`) of other frameworks' units with Kentucky examples. Their lessons are in `src/content/kentucky/lessons/` and attached with `withLessons` in each grade file. No unit Kentucky borrows may name another state's places (`OTHER_STATE` in `units/kit.ts`) outside the history and civics grades (4, 5, 8 and 9), and other states' Tribal units are never borrowed (`kentucky.test.ts`).
- Shawnee, Cherokee and other Native content is light, in the present tense where it describes living Nations, and has nothing sacred or ceremonial; removal and the Trail of Tears, and slavery in Kentucky, are told plainly. It needs partner review before it grows.

## Report card

- Kentucky has no statewide report-card scale (districts choose their own), so the same four practice steps as the other states. State tests are the Kentucky Summative Assessments: reading and math in grades 3 to 8 and 10, science in 4, 7 and 11, social studies in 5, 8 and 11, with four levels (Novice, Apprentice, Proficient, Distinguished). The Read to Succeed Act (2022) reading screening in Kindergarten to Grade 3 is on the report-card page and the state tests guide.

## Parent guides

- `src/content/kentucky/guides.ts`, US English: the hub, grade notes for Pre-K to Grade 9, the eight Standards for Mathematical Practice from the 2019 math standards (`/guides/kentucky/math-practices/`) and KSA (`/guides/kentucky/state-tests/`; dates point to the Department). No French guide.

## Schools

- `/privacy/` states our commitments under KRS 365.734, Kentucky's law on cloud computing services for schools (`src/content/kentucky/schools.ts`): student data used only to provide and improve the service for the school, never for advertising or advertising profiles, never sold or used for another commercial purpose, shared only with the school and the listed providers bound by contract, and these commitments confirmed to a school in writing when it asks. FERPA and COPPA apply as everywhere. Before signing with a district, confirm the written certification the statute asks for.

## Known gaps

- Reading and writing standards that need writing, speaking or fluency (most of composition and the speaking and listening work) have no unit.
- Social studies inquiry practices (`I.Q`, `I.UE`, `I.CC`) ask for projects and discussion, so they have no unit of their own.
- Grade 7 social studies (600 to 1600) and Grade 3 global interactions are covered by adopted units; several geography skills standards have no unit of their own.
- Shawnee, Cherokee and other Native content needs partner review before it grows.
