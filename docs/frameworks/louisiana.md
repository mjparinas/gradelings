# Louisiana

## Framework

- **Id and slug:** `us-la`, `louisiana`. Kindergarten to Grade 9 in math, English language arts, science and social studies (no French: Louisiana has French immersion schools, but no statewide French standards the app follows yet). Offered to families and in classroom mode.

## Standards

- The Louisiana Student Standards, adopted by the Board of Elementary and Secondary Education (BESE): math (2016; `4.NBT.A.1`, with the cluster letter; Grade 9 is Algebra I, `A1: A-SSE.A.1`), English language arts (2026; `RL.4.2`, `L.2.1c`; Grade 9 cites the 9-10 band, `RI.9-10.2`), science (2017; `4-PS3-2`, with the grade in middle school codes, `6-MS-PS1-1`; Grade 9 cites Biology, `HS-LS1-1`, and Physical Science, `HS-PS1-1`) and social studies (2022, updated July 2026; `K.5`, `6.10`; Grade 9 cites High School Civics, `C.9`).
- Citations are `"CODES · text"` (`las()` in `src/content/louisiana/cite.ts`), checked by `src/content/louisiana/contract.ts` against `docs/research/louisiana/outcomes.json`. Sources are in `docs/research/louisiana/source/`; `fetch.sh` downloads them again (plain `curl` works) and `python3 -I build_outcomes.py` rebuilds `outcomes.json` exactly. Record: `docs/research/louisiana/README.md`.

## Content

- **Math and English language arts** follow Michigan's (Common Core) placement with Louisiana codes (`src/content/louisiana/plan/`).
- **Science** follows Louisiana's own grade placement: Louisiana has no engineering (ETS) standards and teaches middle school by grade (space in 6, weather, climate and biodiversity in 7, Earth's history, surface and resources in 8). Units come from whichever grade teaches the topic; borrowed units that name another state's places are `la-` copies with Louisiana examples (hurricanes, levees, the delta, wetlands, oil and gas; `localCopy`, `units/copies-g*.ts`).
- **Social studies** follows the 2022 standards: self, community, Louisiana's traditions and land (K); **a year about Louisiana** (1: symbols, cultures, government, regions and resources, mostly Louisiana's own units); the founding, landmarks and the three branches (2); the American story, from famous Americans and inventions to the Louisiana Purchase, the economy and geography (3); the ancient world with Poverty Point (4); the Middle Ages to exploration (5); United States history to 1791 with French and Spanish Louisiana (6); to 1877 with statehood, the Battle of New Orleans and Louisiana in the Civil War and Reconstruction (7); to 2008 with Louisiana in the 1900s, civil rights in Louisiana and Hurricanes Katrina and Rita (8); and Civics with Louisiana's government (9).
- Louisiana-only units (`la-` ids, `bankUnit` in `own.ts`) are in `src/content/louisiana/units/`, each with a lesson in `src/content/louisiana/lessons/`. No borrowed unit may name another state's places (`OTHER_STATE` in `units/kit.ts`) outside United States history and civics, and other states' Tribal units are never borrowed (`louisiana.test.ts`). Own units say "the Gulf" rather than naming it.
- **Native content:** the Chitimacha Tribe of Louisiana, the Coushatta Tribe of Louisiana, the Jena Band of Choctaw Indians and the Tunica-Biloxi Tribe are named in the present tense as self-governing nations; Poverty Point is told from archaeology, with nothing ceremonial. Light, and needs partner review before it grows. Slavery, the Code Noir, the German Coast uprising and Reconstruction-era violence (Colfax) are told plainly.

## Report card

- Louisiana has no statewide report card. Act 428 of 2024 (R.S. 17:184) sets one ten-point letter scale for every public school that uses letter grades, so the app uses the same four practice steps as the other states (Beginning, Approaching, Meeting, Exceeding).
- State tests are LEAP 2025: English language arts, math, science and social studies in grades 3 to 8, and English I and II, Algebra I, Geometry, Biology, Civics and U.S. History in high school, reported in five levels (Unsatisfactory to Advanced). The early literacy law (Act 422 of 2023, R.S. 17:24.11) and its 3rd grade retention rule are on the LEAP guide and the report card page.

## Parent guides

- `src/content/louisiana/guides.ts`, US English: the hub, grade notes for Kindergarten to Grade 9, the eight Standards for Mathematical Practice (`/guides/louisiana/math-practices/`; Louisiana has no statewide SEL standards for students) and LEAP 2025 (`/guides/louisiana/leap-tests/`; dates point to the Department). No French guide.

## Schools

- **Louisiana.** `/privacy/` (`src/content/louisiana/schools.ts`) states our commitments under Louisiana's student privacy law, R.S. 17:3914: no sale, sharing or processing of student data for advertising, marketing or other commercial purposes (Subsection J), no predictive modeling to limit a student's opportunities and access only as the school's contract allows (Subsection F(2)), reasonable security, and deletion when the school asks or closes its class. Subsection F(3) asks school contracts to cover access rules, privacy and security audits, breach procedures, retention and disposal at the end of the contract; confirm the district's contract covers these before signing. FERPA and COPPA apply as everywhere.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit.
- Grade 9 science is Biology and Physical Science topics only; environmental science, chemistry and physics courses aren't cited.
- Native content is light and needs partner review before it grows.
- Louisiana's French immersion programs follow their own curricula; no French subject is offered for Louisiana yet.
- The 2026 English language arts standards reach classrooms over the next school years, and the social studies standards were updated in July 2026; recheck both when the Department publishes new editions.
