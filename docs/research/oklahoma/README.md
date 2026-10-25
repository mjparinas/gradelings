# Oklahoma: sources and checking record

Oklahoma (`us-ok`, slug `oklahoma`) follows the Oklahoma Academic Standards, adopted by the State Board of Education and published by the Oklahoma State Department of Education at https://oklahoma.gov/education/services/standards-learning/oklahoma-academic-standards.html. Checked October 25, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again with plain `curl` (oklahoma.gov allows scripted downloads; the 2020 science standards come from the Department's Google Drive link) and writes a `pdftotext -layout` copy of each PDF. `SHA256SUMS` records the files as committed.

| File | Document |
| --- | --- |
| `math-2022.pdf` | Oklahoma Academic Standards for Mathematics (February 2022, in classrooms from fall 2023), pre-kindergarten to high school |
| `ela-2021.pdf` | Oklahoma Academic Standards for English Language Arts (2021) |
| `science-2026.pdf` | Oklahoma Academic Standards for Science (2026 edition, January 2026) |
| `science-2020.pdf` | Oklahoma Academic Standards for Science (2020), for reference: the 2026 edition keeps its codes |
| `social-2026.pdf` | Oklahoma Academic Standards for Social Studies (approved March 26, 2026, after the 2025 standards were set aside) |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,568 standards and objectives): each code becomes `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`. High school courses are listed under Grade 9, and the science engineering standards, printed once per grade band, under each grade of the band. Only `idx` is checked by `src/content/oklahoma/contract.ts`. The text extract drops two objectives (`3.GM.1.1` and `USG.C.2.1`), which no unit cites.

## Codes

- **Mathematics:** grade, strand, standard and objective, `K.N.1.1`, `4.GM.2.3`, `7.A.3.2`. Grade 8 is Pre-Algebra, `PA.A.2.3`, and Grade 9 is Algebra 1, `A1.F.1.2`.
- **English language arts:** grade, standard, strand and objective, `4.3.R.5`, `K.2.PA.3`, `1.2.PWS.1`; a few are printed without an objective number, `2.2.PA`, `4.7.R`.
- **Science:** grade, disciplinary core idea and number, `4.PS3.2`, `6.ESS2.4`. Engineering standards are cited by grade band, `K2.ETS1.1`, `G35.ETS1.2`, `MS.ETS1.3`, `HS.ETS1.1`. Grade 9 cites Physical Science, `PS.PS1.1`, and Biology, `B.LS1.1`.
- **Social studies:** grade, strand, standard and objective, `K.C.1.1`, `3.C.2.4`, `8.C.12.4` (the `P` strand, the practices, is not cited). Grade 9 cites Oklahoma History and Government, `OKH.C.4.5`, and United States Government, `USG.C.3.3`.

## Placement

- Math and English language arts keep the Common Core's grades for most topics, so units come from the shared BC, California and Washington units with Oklahoma codes (`src/content/oklahoma/plan/`). Integer addition and subtraction is in Grade 6 in Oklahoma; Grade 8 is Pre-Algebra and Grade 9 Algebra 1.
- Science: Kindergarten to Grade 5 keep the NGSS grades. Oklahoma places middle school itself: Earth's surface and history, weather, climate, cells, body systems and thermal energy in 6; atoms, reactions, energy, ecosystems and resources in 7; forces, waves, space, growth, heredity and natural selection in 8; Physical Science and Biology in 9. Borrowed units that name another state's places are filtered `ok-` copies with Oklahoma examples (`localCopy`, `units/copies-g*.ts`).
- Social studies follows the 2026 standards: the world around me (K); our nation's government, symbols, maps and economy (1); government principles, Tribal governments, notable Americans, the continents and supply and demand (2); **Oklahoma studies (3, Oklahoma's own units)**; United States geography, American Indian cultures before exploration, the explorers and a market economy (4); the colonies to the presidencies of Washington, Adams and Jefferson (5); the Western Hemisphere (6); the Eastern Hemisphere (7); United States history from 1754 to 1877 (8); **Oklahoma History and Government (9, Oklahoma's own units)** with United States Government.

## Guides

- **Mathematical Actions and Processes** (`/guides/oklahoma/math-actions/`): the seven MAPs printed on page 8 of the 2022 math standards. Oklahoma has no statewide SEL standards for students, so this is the competencies page.
- **State tests** (`/guides/oklahoma/state-tests/`): OSTP in English language arts and math in grades 3 to 8 and science in grades 5 and 8, in the last four weeks of each district's calendar (HB 4359, 2026), four performance levels (Below Basic, Basic, Proficient, Advanced), the 11th grade college- and career-readiness test with science and US history, and reading screening under the Strong Readers Act (strengthened by SB 1778, 2026). Dates change each year, so the guide points to the Department. https://oklahoma.gov/education/services/assessments.html

## Privacy

`/privacy/` and `src/content/oklahoma/schools.ts` state our commitments under the Student Data Accessibility, Transparency and Accountability Act (70 O.S. section 3-168) and FERPA: use only to provide the service to the school, no targeted advertising, no profile beyond the school's purposes, no sale or rental, sharing only with the school and contractually bound providers, reasonable security, and deletion when the school asks.

## Known gaps

- English language arts standards that need writing, speaking or fluency have no unit, as in the other states.
- Social studies practices (the `P` strand) have no unit, and some content objectives are not cited by any unit yet: K.C.1.6, K.C.2.3, K.C.3.6, K.C.4.3; 1.C.2.2, 1.C.2.5 to 1.C.2.7, 1.C.3.2 to 1.C.3.4, 1.C.3.8 to 1.C.3.10, 1.C.4.1, 1.C.4.2, 1.C.4.8; 2.C.2.3, 2.C.2.5 to 2.C.2.7, 2.C.3.2, 2.C.3.6 to 2.C.3.9, 2.C.4.3, 2.C.4.7 to 2.C.4.9; 4.C.1.2 (American Indian citizenship), 4.C.2.4, 4.C.4.2, 4.C.4.3; 5.C.1.3, 5.C.1.4, 5.C.1.6, 5.C.1.8 to 5.C.1.10, 5.C.2.5, 5.C.5.4, 5.C.6.4, 5.C.6.5; 6.C.1.3, 6.C.1.4, 6.C.2.4, 6.C.3.4, 6.C.4.1 to 6.C.4.6, 6.C.6.4, 6.C.7.4 to 6.C.7.6; 7.C.1.2, 7.C.2.4, 7.C.3.4, 7.C.5.2, 7.C.6.2, 7.C.6.4, 7.C.7.3, 7.C.7.6, 7.C.8.1, 7.C.8.3, 7.C.8.5 to 7.C.8.7; 8.C.4.3, 8.C.4.4, 8.C.5.2, 8.C.6.2, 8.C.7.3, 8.C.7.5, 8.C.8.1 to 8.C.8.3, 8.C.13.5; OKH.C.6.2, OKH.C.6.5, OKH.C.7.1, OKH.C.7.4 (federal Indian policy), OKH.C.8.2; USG.C.1.5, USG.C.2.2, USG.C.3.2, USG.C.3.6, USG.C.4.3, USG.C.6.2, USG.C.6.3, USG.C.6.5, USG.C.6.7, USG.C.7.1, USG.C.7.2, USG.C.8.1. Grade 3 cites every content objective.
- Tribal nations' content in Grades 3 and 9 is light, in the present tense, with nothing sacred or ceremonial; it needs review with Tribal partners before it grows.
- The math standards' review begins in January 2027; recheck the codes when new standards are adopted.
