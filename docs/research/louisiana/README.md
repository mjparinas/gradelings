# Louisiana: sources and checking record

Louisiana (`us-la`, slug `louisiana`) follows the Louisiana Student Standards, adopted by the Board of Elementary and Secondary Education (BESE) and published by the Louisiana Department of Education at https://doe.louisiana.gov/school-system-leaders/academic-strategy/louisiana-student-standards. Checked October 25, 2026.

## Sources (in `source/`)

`fetch.sh` downloads every file below again (doe.louisiana.gov and legis.la.gov answer plain `curl`) and writes a `pdftotext -layout` copy of each PDF, and a text copy of the privacy law's web page. `SHA256SUMS` records the files as committed.

| File | Document |
| --- | --- |
| `math-2016.pdf` | K-12 Louisiana Student Standards for Mathematics (2016), with the Standards for Mathematical Practice |
| `ela-2026.pdf` | 2026 K-12 Louisiana Student Standards for English Language Arts |
| `science-k.pdf` to `science-8.pdf` | K-12 Louisiana Student Standards for Science (2017), one file per grade, from the Department's zip |
| `science-life.pdf`, `science-physical.pdf` | The high school Life Science (Biology) and Physical Science courses from the same zip |
| `social-2022.pdf` | K-12 Louisiana Student Standards for Social Studies (2022), the edition updated July 10, 2026 |
| `leap-parent-guide.pdf` | The Department's Parent Guide to the LEAP 2025 Tests (revised March 2025) |
| `act428-2024.pdf` | Act 428 of 2024 (R.S. 17:184), the uniform ten-point grading scale |
| `act422-2023.pdf` | Act 422 of 2023 (House Bill 12, R.S. 17:24.11), the early literacy and 3rd grade promotion law |
| `rs17-3914.html` | R.S. 17:3914, student information and privacy, from the Legislature's site |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/` exactly (1,450 standards): each standard becomes `{"idx": code, "kind": "standard", "content": text}` under `<grade>/<subject>`. High school courses are listed under Grade 9. Only `idx` is checked by `src/content/louisiana/contract.ts`.

## Codes

- **Mathematics:** the grade, domain, cluster letter and number, `K.CC.A.2`, `4.NBT.A.1`, `8.F.B.4`. Grade 9 is Algebra I, `A1: A-SSE.A.1`, `A1: A-REI.B.4`.
- **English language arts:** strand, grade and number, `RL.4.2`, `RI.5.3`, `RF.2.3`, `L.2.1c`. Grade 9 cites the Grades 9-10 band, `RL.9-10.2`.
- **Science:** the performance expectation printed at the top of each page, `K-PS2-1`, `4-PS3-2`; middle school codes carry their grade, `6-MS-PS1-1`, `8-MS-ESS1-4`. Grade 9 cites Biology (`HS-LS1-1`) and Physical Science (`HS-PS1-1`). The Kindergarten file prints `K-LS-1-1`; it is read as `K-LS1-1`.
- **Social studies:** the grade and number, `K.5`, `6.10`, `8.17`. Grade 9 cites High School Civics, `C.9`.

## Placement

- Math and English language arts follow Michigan's placement (both states use Common Core codes), mapped to Louisiana's codes.
- Science follows Louisiana's grade placement, which differs from the other NGSS states in middle school: atoms, forces, energy, waves, cells, ecosystems and space in 6; reactions, heat, body systems, photosynthesis, heredity, biodiversity, weather and climate in 7; materials and thermal energy, genes, fossils and natural selection, and Earth's history, surface, resources and hazards in 8. Louisiana has no engineering (ETS) standards. Borrowed units that name another state's places are filtered `la-` copies with Louisiana examples (`localCopy`, `units/copies-g*.ts`).
- Social studies follows the 2022 standards grade by grade (see `docs/frameworks/louisiana.md`). Louisiana's own units cover what no other framework teaches: its traditions (K), a year about Louisiana (1), national founders, landmarks and branches (2), the American story, economy and geography (3), Poverty Point (4), French and Spanish Louisiana (6), statehood, reform and the road to war, and the Civil War and Reconstruction in Louisiana (7), Louisiana in the 1900s and civil rights to Katrina (8), and Louisiana's government (9).

## Guides

- **Mathematical Practices** (`/guides/louisiana/math-practices/`): the eight Standards for Mathematical Practice printed in the 2016 math standards. Louisiana has no statewide SEL standards for students, so this is the competencies page, as for Tennessee.
- **LEAP 2025** (`/guides/louisiana/leap-tests/`): grades 3 to 8 in four subjects, the seven high school course tests, the five achievement levels and the 3rd grade literacy law (Act 422 of 2023). Dates change each year, so the guide points to the Department. Source: `source/leap-parent-guide.pdf`.

## Privacy

`/privacy/` states our commitments under R.S. 17:3914 (Subsections F and J); see `docs/frameworks/louisiana.md`.

## Known gaps

English language arts standards that need writing, speaking or fluency have no unit; Native content is light and needs partner review; no French subject for Louisiana's immersion programs yet.
