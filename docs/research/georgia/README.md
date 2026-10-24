# Georgia: sources and checking record

Georgia (`us-ga`, slug `georgia`) follows the Georgia standards adopted by the Georgia State Board of Education and published by the Georgia Department of Education (GaDOE, https://www.gadoe.org/). Checked October 24, 2026.

## Sources (in `source/`)

GaDOE retired the georgiastandards.org pages in 2025 (gadoe.org/georgiastandards-sunset/) and now publishes each standards document with its codes on its own IMS CASE 1.0 server, case.georgiastandards.org. `fetch.sh` downloads one CFPackage per subject (the document, every coded item and the links between them) and records the files in `SHA256SUMS`.

| File | Document | CASE package |
| --- | --- | --- |
| `math.json` | Georgia's K-12 Mathematics Standards (adopted 2021, in schools from 2023-24) | `e9dd7229-3558-4df2-85c6-57b8938f6180` |
| `ela.json` | Georgia's K-12 English Language Arts Standards (in schools from 2025-26) | `391c3abe-c1ec-4a4a-a942-c9e152b35102` |
| `science.json` | Science, Georgia Standards of Excellence (approved June 2016, in schools from 2017-18) | `27a08dc6-416e-11e7-ba71-02bd89fdd987` |
| `social.json` | Social Studies, Georgia Standards of Excellence (K-12, last updated January 2023) | `a446e74c-463e-11e7-94f5-b49cee8b2d8c` |

`python3 -I build_outcomes.py` rebuilds `outcomes.json` from `source/`: every coded item becomes `{"idx": code, "kind": label, "content": text}` under `<grade>/<subject>`. Grade 9 lists the Algebra: Concepts and Connections and Geometry: Concepts and Connections courses, the Grade 9 English language arts standards, the high school science courses and American Government/Civics with Personal Finance and Economics. Only `idx` is checked by `src/content/georgia/contract.ts`.

## Codes

- **Mathematics (2021):** grade, big idea, standard and element: `4.NR.2.3`, `K.NR.1.1`. The big ideas are numerical reasoning (NR), patterning and algebraic reasoning (PAR), measurement and data reasoning (MDR), geometric and spatial reasoning (GSR), probabilistic reasoning (PR), functional and graphical reasoning (FGR) and data science (DSR). Grade 9 cites Algebra: Concepts and Connections (`A.FGR.2.2`) and, for polynomials, probability and geometry, Geometry: Concepts and Connections (`G.PAR.2.3`).
- **English language arts (2025-26):** grade, domain, big idea and standard: `4.T.T.1`, `2.F.P.2`, `6.L.V.2`, `K.P.CP.1`. The domains are Foundations (F), Language (L), Texts (T) and Practices (P).
- **Science (GSE 2016):** standard and element, `S4P3.c`, `SKE1.a`. Middle school is by domain: Earth science in Grade 6 (`S6E2.b`), life science in 7 (`S7L2.a`), physical science in 8 (`S8P1.c`). Grade 9 cites Biology (`SB1.a`) and Physical Science (`SPS7.a`).
- **Social studies (GSE):** grade, strand and standard: `SS4H1.a` (history), `SS4G1.b` (geography), `SS4CG2` (civics and government), `SS4E1.a` (economics). The map and globe skills (`SSMGS1` to `SSMGS12`) and information processing skills (`SSIPS1` to `SSIPS17`) are listed in every grade. Grade 9 cites American Government/Civics (`SSCG17.a`) and Personal Finance and Economics (`SSPFL5.c`).

## Placement

- Math and English language arts follow California's placement where Georgia teaches the same idea in the same grade, with Georgia's codes; units for ideas Georgia places in another grade are moved or left out.
- Science follows Georgia's own placement (stars, the sun and the moon and pushes and pulls in Grade 2; rocks, fossils, heat and Georgia's habitats in 3; light, sound, the solar system and weather in 4; electricity, magnetism, cells and microorganisms in 5).
- Social studies follows Georgia's grade themes: holidays, symbols and good citizens (K), American heroes and long ago (1), **Georgia's history, regions and Native nations (2, Georgia's own units)**, American Indian cultural regions, explorers, colonies and the three branches (3), United States history from the Revolution to Reconstruction (4), United States history from the turn of the century to today (5), Latin America, Europe and Australia (6), Africa, Southwest Asia and Southern and Eastern Asia (7), **Georgia Studies (8, all Georgia's own units)** and American Government/Civics with Personal Finance and Economics (9).
- Borrowed units that name another state's places are Georgia copies (`ga-` ids, `localCopy` in `src/content/georgia/units/copies-g*.ts`) with those questions left out; `georgia.test.ts` checks the rest name no other state outside US history and civics. Other states' Tribal units are never borrowed.

## Known gaps

`gaps.txt` lists, per grade and subject, the coded standards and elements no unit cites (standards and elements whose code appears in no Georgia unit or plan entry). The main ones:

- **English language arts:** standards that need writing, speaking, listening or reading fluency (most of the Practices domain and the handwriting and fluency standards) and many of the long grammar lists have no unit.
- **Grade 6 social studies:** Canada (`SS6G4` to `SS6G6`, `SS6H2`, `SS6CG4`, `SS6E5`) is left out by design (no unit names Canada in a US course), and most of the economics standards (`SS6E1` to `SS6E13`, governments and economic systems of each region) have only light coverage. Grade 7 economics (`SS7E1` to `SS7E10`) is the same.
- **Grade 9:** math covers Algebra: Concepts and Connections and some of Geometry; science covers Biology and Physical Science only (Chemistry, Physics, Earth Systems and Environmental Science are left out); civics leaves out the bureaucracy, foreign policy and parts of the courts, and personal finance leaves out tax forms, life after high school, insurance and consumer protection.
- **American Indian content** (Muscogee (Creek), Cherokee and the cultural regions in Grade 3) is light, in the present tense, with nothing sacred or ceremonial, and needs partner review before it grows.
